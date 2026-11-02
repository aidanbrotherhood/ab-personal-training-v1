import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { build } from "esbuild";
import { randomUUID } from "node:crypto";

const bundle = await build({
  entryPoints: ["workers/enquiry.ts"],
  tsconfig: "tsconfig.json",
  bundle: true,
  write: false,
  platform: "neutral",
  format: "esm",
  target: "es2022",
});
const { handleEnquiry } = await import(
  `data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`
);
const url = "https://preview.example/api/enquiry";
const valid = () => ({
  name: "Test Enquiry",
  email: "qa@example.invalid",
  membership: "yes",
  goal: "strength",
  package_interest: "weekly",
  availability: "Weekday evenings",
  consent: "yes",
  request_id: randomUUID(),
  attribution: "{}",
});
function fixture({ limited = false, broken = false } = {}) {
  const db = new DatabaseSync(":memory:");
  db.exec(readFileSync("migrations/0001_enquiry_context.sql", "utf8"));
  db.exec(readFileSync("migrations/0002_notifications.sql", "utf8"));
  const env = {
    ENQUIRY_LIMITER: { limit: async () => ({ success: !limited }) },
    ENQUIRIES: {
      prepare(sql) {
        return {
          bind(...args) {
            return { sql, args };
          },
        };
      },
      async batch(statements) {
        db.exec("BEGIN");
        try {
          const results = statements.map((s, i) => {
            if (broken && i === 1)
              throw new Error("simulated database failure");
            const info = db.prepare(s.sql).run(...s.args);
            return { success: true, meta: { changes: info.changes } };
          });
          db.exec("COMMIT");
          return results;
        } catch (error) {
          db.exec("ROLLBACK");
          throw error;
        }
      },
    },
  };
  return { env, db };
}
function request(fields = valid(), headers = {}, accept = "application/json") {
  return new Request(url, {
    method: "POST",
    headers: { Origin: "https://preview.example", Accept: accept, ...headers },
    body: new URLSearchParams(fields),
  });
}

test("persists an enquiry and its context atomically, with no phone or click identifiers", async () => {
  const { env, db } = fixture();
  const fields = valid();
  fields.attribution = JSON.stringify({
    utm_source: "instagram",
    utm_campaign: "renfrew-launch",
    gclid: "secret-click-id",
    email: "private@example.invalid",
    referrer: "www.google.com",
  });
  const response = await handleEnquiry(request(fields), env);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  const row = db
    .prepare(
      "SELECT * FROM enquiries JOIN enquiry_details ON enquiries.id = enquiry_details.enquiry_id",
    )
    .get();
  assert.equal(row.email, fields.email);
  assert.equal(row.phone, null);
  assert.equal(row.package_interest, "weekly");
  assert.equal(row.goal, "strength");
  assert.equal(row.notice_version, "2026-11-02");
  assert.equal(row.contact_acknowledged, 1);
  assert.deepEqual(JSON.parse(row.attribution), {
    utm_source: "instagram",
    utm_campaign: "renfrew-launch",
    referrer: "www.google.com",
  });
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  db.close();
});
test("a retry creates only one enquiry and never overwrites the first submission", async () => {
  const { env, db } = fixture();
  const fields = valid();
  await handleEnquiry(request(fields), env);
  fields.name = "Changed Name";
  assert.equal((await handleEnquiry(request(fields), env)).status, 200);
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM enquiries").get().n, 1);
  assert.equal(
    db.prepare("SELECT name FROM enquiries").get().name,
    "Test Enquiry",
  );
  db.close();
});
test("failure in the context insert rolls back the enquiry and gives a useful error", async () => {
  const { env, db } = fixture({ broken: true });
  const response = await handleEnquiry(request(), env);
  assert.equal(response.status, 503);
  assert.match((await response.json()).message, /hello@aidanbrotherhood.com/);
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM enquiries").get().n, 0);
  db.close();
});
test("validates required fields and all client-controlled enum values on the server", async () => {
  const { env, db } = fixture();
  const response = await handleEnquiry(
    request({
      ...valid(),
      name: "x",
      email: "invalid",
      membership: "fake",
      goal: "fake",
      package_interest: "fake",
      consent: "",
    }),
    env,
  );
  assert.equal(response.status, 422);
  assert.equal(Object.keys((await response.json()).errors).length, 6);
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM enquiries").get().n, 0);
  db.close();
});
test("blocks cross-origin and malformed-origin requests", async () => {
  const { env, db } = fixture();
  for (const origin of [
    "https://evil.example",
    "null",
    "not-a-url",
    "http://preview.example",
  ])
    assert.equal(
      (await handleEnquiry(request(valid(), { Origin: origin }), env)).status,
      403,
    );
  assert.equal(
    (
      await handleEnquiry(
        request(valid(), { "Sec-Fetch-Site": "cross-site" }),
        env,
      )
    ).status,
    403,
  );
  db.close();
});
test("rate-limited requests are not saved and include Retry-After", async () => {
  const { env, db } = fixture({ limited: true });
  const response = await handleEnquiry(request(), env);
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "60");
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM enquiries").get().n, 0);
  db.close();
});
test("honeypot returns generic success without storing data", async () => {
  const { env, db } = fixture();
  assert.equal(
    (await handleEnquiry(request({ ...valid(), website: "spam" }), env)).status,
    200,
  );
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM enquiries").get().n, 0);
  db.close();
});
test("bounds actual bytes even without a Content-Length header", async () => {
  const { env, db } = fixture();
  const response = await handleEnquiry(
    request({ ...valid(), availability: "a".repeat(9000) }),
    env,
  );
  assert.equal(response.status, 413);
  db.close();
});
test("rejects unsafe methods and content types", async () => {
  const { env, db } = fixture();
  const get = await handleEnquiry(new Request(url), env);
  assert.equal(get.status, 405);
  assert.equal(get.headers.get("Allow"), "POST");
  assert.equal(
    (await handleEnquiry(new Request(url, { method: "POST", body: "{}" }), env))
      .status,
    415,
  );
  db.close();
});
test("rejects oversized fields and invalid request identifiers", async () => {
  const { env, db } = fixture();
  const response = await handleEnquiry(
    request({
      ...valid(),
      availability: "a".repeat(301),
      request_id: "<script>",
    }),
    env,
  );
  assert.equal(response.status, 422);
  assert.deepEqual(Object.keys((await response.json()).errors).sort(), [
    "availability",
    "request_id",
  ]);
  db.close();
});
test("invalid attribution does not lose a valid enquiry; PII-like campaign labels are dropped", async () => {
  const { env, db } = fixture();
  const fields = valid();
  fields.attribution = JSON.stringify({
    utm_source: "person@example.invalid",
    utm_medium: "07700123456",
    utm_campaign: "local-launch",
    referrer: "https://evil.example/path?email=x",
  });
  assert.equal((await handleEnquiry(request(fields), env)).status, 200);
  assert.deepEqual(
    JSON.parse(
      db.prepare("SELECT attribution FROM enquiry_details").get().attribution,
    ),
    { utm_campaign: "local-launch" },
  );
  fields.request_id = randomUUID();
  fields.attribution = "{invalid";
  assert.equal((await handleEnquiry(request(fields), env)).status, 200);
  db.close();
});
test("HTML fallback preserves escaped field values and lets visitors correct errors without JavaScript", async () => {
  const { env, db } = fixture();
  const response = await handleEnquiry(
    request(
      { ...valid(), name: "<script>alert(1)</script>", email: "invalid" },
      {},
      "text/html",
    ),
    env,
  );
  assert.equal(response.status, 422);
  const html = await response.text();
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /action="\/api\/enquiry"/);
  assert.match(html, /value="invalid"/);
  db.close();
});
test("HTML success is based on a stored submission, without a spoofable query parameter", async () => {
  const { env, db } = fixture();
  const fields = valid();
  fields.request_id = "";
  const response = await handleEnquiry(request(fields, {}, "text/html"), env);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Your enquiry has been saved/);
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM enquiries").get().n, 1);
  db.close();
});

test("optional phone persists and durable notification is queued", async () => {
  const { env, db } = fixture();
  const fields = { ...valid(), phone: "+44 7700 900123" };
  assert.equal((await handleEnquiry(request(fields), env)).status, 200);
  assert.equal(
    db.prepare("SELECT phone FROM enquiries").get().phone,
    fields.phone,
  );
  assert.equal(
    db.prepare("SELECT state FROM enquiry_notifications").get().state,
    "pending",
  );
  db.close();
});
test("notification failure preserves queued enquiry; acceptance records provider reference", async () => {
  const compiled = await build({
    entryPoints: ["workers/notifications.ts"],
    tsconfig: "tsconfig.json",
    bundle: true,
    write: false,
    format: "esm",
    platform: "neutral",
  });
  const { processNotifications } = await import(
    `data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString("base64")}`
  );
  const { env, db } = fixture();
  await handleEnquiry(request(), env);
  env.RESEND_API_KEY = "test-only";
  env.ENQUIRIES.prepare = (sql) => {
    const stmt = {
      args: [],
      bind(...args) {
        this.args = args;
        return this;
      },
      async run() {
        return { meta: { changes: db.prepare(sql).run(...this.args).changes } };
      },
      async all() {
        return { results: db.prepare(sql).all(...this.args) };
      },
    };
    return stmt;
  };
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response("{}", { status: 503 });
    await processNotifications(env);
    assert.equal(
      db.prepare("SELECT state FROM enquiry_notifications").get().state,
      "pending",
    );
    assert.equal(db.prepare("SELECT count(*) AS n FROM enquiries").get().n, 1);
    db.exec("UPDATE enquiry_notifications SET next_attempt=0");
    globalThis.fetch = async () => Response.json({ id: "test-provider-id" });
    await processNotifications(env);
    assert.equal(
      db.prepare("SELECT provider_id FROM enquiry_notifications").get()
        .provider_id,
      "test-provider-id",
    );
    assert.equal(
      db.prepare("SELECT state FROM enquiry_notifications").get().state,
      "accepted",
    );
  } finally {
    globalThis.fetch = original;
    db.close();
  }
});
