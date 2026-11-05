import { test, after } from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";

const result = await build({
  entryPoints: ["app/lib/fit-handoff.ts"],
  tsconfig: "tsconfig.json", platform: "neutral", format: "esm",
  target: "es2022", bundle: true, write: false,
});
const mod = await import(
  `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`
);
const {
  saveFitHandoff, readFitHandoff, clearFitHandoff,
  fitContextRows, calendlyFitSummary,
} = mod;

const storage = new Map();
globalThis.window = {
  sessionStorage: {
    getItem: (key) => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key),
  },
};
after(() => { delete globalThis.window; });
const sample = {
  support: "ongoing", independence: "some-support",
  frequency: "twice", budget: "weekly", access: "member",
};
const recommendation = { kind: "discuss", packageId: null };
test("handoff starts only after explicit booking navigation and can be discarded", () => {
  assert.equal(readFitHandoff(), null);
  saveFitHandoff(sample, recommendation);
  const h = readFitHandoff();
  assert.ok(h);
  assert.equal(h.answers.budget, "weekly");
  assert.equal(h.recommendation, null);
  assert.equal(h.outcome, "discuss");
  clearFitHandoff();
  assert.equal(readFitHandoff(), null);
});

test("handoff summary shows actual preferences and doesn't invent a package", () => {
  saveFitHandoff(sample, recommendation);
  const h = readFitHandoff();
  const rows = fitContextRows(h);
  assert.equal(rows.length, 6);
  assert.equal(rows[0].value, "Discuss options");
  assert.ok(rows.find((x) => x.label === "Budget preference" && x.value.includes("£180")));
  const text = calendlyFitSummary(h);
  assert.match(text, /shared by the person booking/);
  assert.match(text, /Twice a week/);
  assert.match(text, /£180\/four weeks/);
  assert.doesNotMatch(text, /https?:\/\/|email address|medical history|cookie/i);
  clearFitHandoff();
});

test("introductory recommendations omit coached frequency", () => {
  saveFitHandoff(
    { ...sample, support: "introduction", frequency: null, budget: "one-off" },
    { kind: "match", packageId: "introduction" },
  );
  const rows = fitContextRows(readFitHandoff());
  assert.equal(rows[0].value, "Starter");
  assert.ok(!rows.some(x=>x.label==="Coached frequency"));
  assert.match(calendlyFitSummary(readFitHandoff()), /£99 one-off/);
  clearFitHandoff();
});

test("stale and tampered session state cannot be shared", () => {
  const key = "ab:coaching-fit-booking-v1";
  storage.set(key, JSON.stringify({
    version: 1, savedAt: Date.now() - 31 * 60 * 1000,
    answers: sample, recommendation: "weekly", outcome: "match",
  }));
  assert.equal(readFitHandoff(), null);
  storage.set(key, JSON.stringify({
    version: 1, savedAt: Date.now(),
    answers: { ...sample, budget: "<script>" },
    recommendation: "weekly", outcome: "match",
  }));
  assert.equal(readFitHandoff(), null);
  assert.equal(storage.has(key), true);
  clearFitHandoff();
});
