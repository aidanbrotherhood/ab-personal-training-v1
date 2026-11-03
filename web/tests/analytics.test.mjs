import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";

const result = await build({ entryPoints: ["app/lib/analytics.ts"], bundle: true,
  write: false, format: "esm", platform: "neutral", target: "es2022", tsconfig: "tsconfig.json" });
const analytics = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`);
afterEach(() => {
  delete globalThis.window;
  delete globalThis.document;
  delete globalThis.localStorage;
});

test("consent fails closed for absent, malformed, expired, future and blocked storage", () => {
  const now = Date.now();
  for (const saved of [null, "broken", JSON.stringify({choice:"accepted",at:now-analytics.CONSENT_MAX_AGE}),
    JSON.stringify({choice:"accepted",at:now+1000}), JSON.stringify({choice:"yes",at:now})]) {
    globalThis.localStorage = {getItem: () => saved};
    assert.equal(analytics.readConsent(now), null);
  }
  globalThis.localStorage = {getItem() { throw Error("blocked"); }};
  assert.equal(analytics.readConsent(now), null);
  for (const choice of ["accepted", "rejected"]) {
    globalThis.localStorage = {getItem: () => JSON.stringify({choice,at:now})};
    assert.equal(analytics.readConsent(now), choice);
  }
});

test("only known measurement values pass; extra personal fields are discarded", () => {
  const event = analytics.analyticsEvent({event:"consultation_cta_clicked",page:"/coaching",
    placement:"pricing_coaching",package:"weekly",email:"secret@example.com",payload:{name:"Private"}});
  assert.ok(event);
  assert.equal(event.params.package_id, "weekly");
  assert.doesNotMatch(JSON.stringify(event), /secret|Private|email|payload/);
  for (const detail of [null, {event:"email",page:"/",placement:"hero"},
    {event:"consultation_cta_clicked",page:"/?email=private",placement:"hero"},
    {event:"consultation_cta_clicked",page:"/",placement:"private@example.com"}])
    assert.equal(analytics.analyticsEvent(detail), null);
});

function browser(origin = "https://aidanbrotherhood.com") {
  const scripts = [];
  globalThis.window = {location:{origin,pathname:"/coaching",search:"?email=secret@example.com",hash:"#private"}};
  globalThis.document = {referrer:"https://example.com/private?email=secret@example.com",
    createElement: () => ({remove(){this.removed=true;}}), head:{appendChild:s=>scripts.push(s)}};
  return scripts;
}

test("every preview host, disabled flag and invalid ID blocks the Google script", () => {
  for (const origin of ["https://ab-personal-training-staging.aidanbrotherhood.workers.dev",
    "https://ab-personal-training-preview.aidanbrotherhood.workers.dev", "http://aidanbrotherhood.com", "http://localhost:8787"]) {
    const scripts = browser(origin);
    assert.equal(analytics.startAnalytics("G-TEST12345", true), null);
    assert.equal(scripts.length, 0);
    assert.equal(window.dataLayer, undefined);
  }
  const scripts = browser();
  assert.equal(analytics.startAnalytics("G-TEST12345", false), null);
  assert.equal(analytics.startAnalytics("<script>", true), null);
  assert.equal(scripts.length, 0);
});

test("accepted production sends one view per path without query data; withdrawal disables queued and future collection", () => {
  const scripts = browser();
  const client = analytics.startAnalytics("G-TEST12345", true);
  assert.equal(scripts.length, 1);
  const commands = () => window.dataLayer.map(args => Array.from(args));
  assert.equal(commands()[0][0], "consent");
  assert.equal(commands()[0][2].analytics_storage, "denied");
  assert.equal(commands()[1][2].analytics_storage, "granted");
  assert.equal(commands().find(c=>c[0]==="config")[2].send_page_view, false);
  client.page("/coaching");
  client.page("/coaching");
  client.page("/consultation");
  client.page("/not-public");
  assert.equal(commands().filter(c=>c[1]==="page_view").length, 2);
  client.event({event:"booking_time_selected",page:"/consultation",placement:"calendar",email:"secret@example.com"});
  assert.doesNotMatch(JSON.stringify(commands()), /secret|private|email=/);
  assert.match(JSON.stringify(commands()), /https:\/\/example.com/);
  client.stop();
  assert.equal(window["ga-disable-G-TEST12345"], true);
  assert.equal(window.dataLayer.length, 0);
  client.event({event:"booking_time_selected",page:"/consultation",placement:"calendar"});
  assert.equal(window.dataLayer.length, 0);
  assert.equal(scripts[0].removed, true);
});

test("withdrawal clears only Analytics cookies at host and domain scopes", () => {
  const writes = [];
  globalThis.document = {get cookie(){return "_ga=1; _ga_TEST=2; necessary=keep";},set cookie(v){writes.push(v);}};
  analytics.clearAnalyticsCookies();
  assert.equal(writes.length, 6);
  assert.ok(writes.every(v=>v.includes("Max-Age=0")));
  assert.ok(writes.every(v=>!v.includes("necessary")));
});
