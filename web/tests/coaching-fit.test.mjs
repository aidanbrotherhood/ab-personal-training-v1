import { test } from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";

const bundle = await build({
  entryPoints: ["app/lib/coaching-fit.ts"],
  tsconfig: "tsconfig.json",
  platform: "neutral",
  format: "esm",
  target: "es2022",
  bundle: true,
  write: false,
});
const { emptyFitAnswers, fitSteps, fitComplete, recommendCoaching } = await import(
  `data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`
);
const filled = (overrides = {}) => ({
  support: "ongoing",
  independence: "some-support",
  frequency: "once",
  budget: "weekly",
  access: "member",
  ...overrides,
});
const outcome = (overrides = {}) => recommendCoaching(filled(overrides));

test("adaptive introduction path omits unnecessary frequency question", () => {
  const intro = filled({ support: "introduction", frequency: null });
  assert.deepEqual(fitSteps(intro), ["support", "independence", "budget", "access"]);
  assert.equal(fitComplete(intro), true);
  assert.equal(fitComplete(emptyFitAnswers), false);
  assert.equal(recommendCoaching(emptyFitAnswers), null);
  assert.equal(fitComplete(filled({ access: null })), false);
  assert.deepEqual(fitSteps(filled()), [
    "support", "independence", "frequency", "budget", "access",
  ]);
});

test("introduction matches Starter but never pretends it includes continuing support", () => {
  for (const budget of ["one-off", "weekly", "twice-weekly"]) {
    const d = outcome({ support: "introduction", frequency: null, budget, independence: "comfortable" });
    assert.equal(d.kind, "match");
    assert.equal(d.packageId, "introduction");
    assert.match(d.consideration, /doesn't include ongoing programming/);
  }
  assert.equal(outcome({ support: "introduction", independence: "hands-on", frequency: null }).packageId, null);
});

test("ongoing support follows actual coached frequency rather than high budget", () => {
  const weekly = outcome({ budget: "twice-weekly", frequency: "once" });
  assert.equal(weekly.packageId, "weekly");
  assert.equal(weekly.kind, "match");
  const twice = outcome({ budget: "twice-weekly", frequency: "twice" });
  assert.equal(twice.packageId, "complete");
  assert.equal(twice.kind, "match");
});

test("a 180-pound budget never upsells a twice-weekly preference", () => {
  for (const independence of ["comfortable", "some-support", "hands-on", "unsure"]) {
    const d = outcome({ budget: "weekly", frequency: "twice", independence });
    assert.equal(d.kind, "discuss");
    assert.equal(d.packageId, null);
    assert.match(d.consideration, /£320/);
  }
});

test("one-off budget is not presented as continuing coaching", () => {
  const d = outcome({ support: "ongoing", budget: "one-off" });
  assert.equal(d.kind, "discuss");
  assert.equal(d.packageId, null);
  assert.match(d.reasoning, /not an ongoing programme/);
});

test("independence and uncertainty receive a human discussion, not a forced package", () => {
  for (const overrides of [
    { frequency: "once", independence: "hands-on" },
    { frequency: "unsure" },
    { support: "unsure" },
    { support: "introduction", budget: "unsure" },
  ]) {
    assert.equal(outcome(overrides).kind, "discuss");
    assert.equal(outcome(overrides).packageId, null);
  }
});

test("access and budget constraints override package fit", () => {
  for (const support of ["introduction", "ongoing", "unsure"]) {
    const unavailable = outcome({ support, access: "cannot" });
    assert.equal(unavailable.kind, "not-fit");
    assert.equal(unavailable.packageId, null);
    const unconfirmed = outcome({ support, access: "confirm" });
    assert.equal(unconfirmed.kind, "discuss");
    assert.equal(unconfirmed.packageId, null);
    const unaffordable = outcome({ support, budget: "none" });
    assert.equal(unaffordable.kind, "not-fit");
    assert.equal(unaffordable.packageId, null);
  }
});

test("all recommended package IDs map to the canonical three offers", () => {
  const ids = new Set(["introduction", "weekly", "complete"]);
  for (const support of ["introduction", "ongoing", "unsure"]) {
    for (const budget of ["one-off", "weekly", "twice-weekly", "none", "unsure"]) {
      for (const frequency of ["once", "twice", "unsure"]) {
        for (const independence of ["comfortable", "some-support", "hands-on", "unsure"]) {
          for (const access of ["member", "can-join", "confirm", "cannot"]) {
            const result = outcome({ support, budget, frequency, independence, access });
            assert.ok(result);
            assert.ok(["match", "discuss", "not-fit"].includes(result.kind));
            assert.equal(result.kind === "match", result.packageId !== null);
            if (result.packageId) assert.ok(ids.has(result.packageId));
            assert.ok(result.reasoning.length > 50);
            assert.ok(result.consideration.length > 40);
          }
        }
      }
    }
  }
});
