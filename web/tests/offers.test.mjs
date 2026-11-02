import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { build } from "esbuild";

// Exercise the real TypeScript source without duplicating the package definitions.
const bundled = await build({
  entryPoints: ["app/lib/offers.ts"],
  bundle: true,
  write: false,
  platform: "neutral",
  format: "esm",
  target: "es2022",
});
const { plans, packageIds, getPerSessionRate } = await import(
  `data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString("base64")}`
);

test("canonical public offer names and prices do not drift", () => {
  assert.deepEqual(plans.map(p => p.title), ["Starter", "Coaching", "Coaching+"]);
  assert.deepEqual(plans.map(p => p.price), ["£99", "£180", "£320"]);
  assert.deepEqual(plans.map(p => p.sessions), [2, 4, 8]);
  assert.deepEqual(plans.map(p => p.id), ["introduction", "weekly", "complete"]);
  assert.deepEqual(packageIds, ["unsure", "introduction", "weekly", "complete"]);
  assert.deepEqual(plans.map(getPerSessionRate), ["£49.50", "£45", "£40"]);
});

test("introductory Starter remains distinct from ongoing coaching", () => {
  assert.match(plans[0].period, /One-off/);
  for (const plan of plans.slice(1)) {
    assert.match(plan.period, /four-week/);
    assert.ok(plan.features.some(f => /programme/.test(f)));
    assert.ok(plan.features.some(f => /nutrition/.test(f)));
    assert.ok(plan.features.some(f => /review/.test(f)));
  }
  assert.ok(!plans[0].features.some(f => /weekly check-in|nutrition/.test(f)));
});

test("both public pricing surfaces reuse the shared component and no legacy names remain", () => {
  const homepage = readFileSync("app/routes/home.tsx", "utf8");
  const renfrew = readFileSync("app/routes/personal-training-renfrew.tsx", "utf8");
  const comparison = readFileSync("app/components/pricing-section.tsx", "utf8");
  assert.match(homepage, /<PricingSection variant="home" \/>/);
  assert.match(renfrew, /<PricingSection variant="renfrew" \/>/);
  assert.match(comparison, /plans\.map/);
  assert.match(comparison, /getPerSessionRate/);
  for (const file of [homepage, renfrew, comparison]) {
    assert.doesNotMatch(file, /PT Introduction|Weekly Coaching|Complete Coaching/);
  }
});
