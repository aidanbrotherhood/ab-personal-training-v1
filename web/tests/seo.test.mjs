import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { build } from "esbuild";

async function source(path) {
  const result = await build({
    entryPoints: [path],
    tsconfig: "tsconfig.json",
    bundle: true,
    write: false,
    format: "esm",
    platform: "neutral",
    target: "es2022",
  });
  return import(
    `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`
  );
}
const { publicPages, getPublicPage } = await source("app/lib/public-pages.ts");
const { canonicalRedirect, isIndexableProduction, legacyPageDestination, xmlEscape } =
  await source("app/lib/seo.ts");
const { structuredData } = await source("app/lib/structured-data.ts");
const { calendlySignal, trustedCalendlySignal } = await source(
  "app/lib/measurement.ts",
);

test("fat-loss dark panels keep readable headings and avoid duplicate pricing styles", () => {
  const stylesheet = readFileSync("app/fat-loss.css", "utf8");
  assert.ok(stylesheet.includes(".fat-loss-page .closing-cta h2 { color:#fff; }"));
  assert.ok(stylesheet.includes(".fat-loss-page .fat-beyond h2 { color:#fff; }"));
  assert.ok(!stylesheet.includes(".fat-loss-page h2 { color:var(--fat-ink); }"));
  assert.ok(!stylesheet.includes("fat-pricing-intro"));
});

test("published registry contains only complete, approved pages with unique metadata", () => {
  assert.deepEqual(
    publicPages.map((p) => p.path),
    [
      "/",
      "/personal-training-renfrew",
      "/strength-training-renfrew",
      "/fat-loss-coaching-renfrew",
      "/pricing",
      "/about",
      "/personal-training-for-beginners",
      "/about/approach",
      "/movement-assessment",
      "/consultation",
      "/privacy",
    ],
  );
  for (const field of ["key", "path", "title", "description", "h1"])
    assert.equal(
      new Set(publicPages.map((p) => p[field])).size,
      publicPages.length,
      field,
    );
  for (const page of publicPages) {
    assert.ok(
      page.title.length > 20 &&
        page.description.length > 80 &&
        page.h1.length > 15,
    );
    assert.ok(existsSync(`app/${page.file}`));
  }
  for (const path of [
    "/terms",
    "/strength-training",
    "/fat-loss-coaching",
    "/personal-training-paisley",
    "/contact",
    "/practice",
  ])
    assert.equal(getPublicPage(path), undefined);
});
test("About essay has its own legible, content-first editorial design", () => {
  const stylesheet = readFileSync("app/about-me.css", "utf8");
  for (const expected of [
    ".about-journal-page .journal-masthead h1",
    ".about-journal-page .journal-masthead-meta",
    ".about-journal-page .journal-article p",
    ".about-journal-page .journal-chapter + .journal-chapter",
    ".about-journal-page .journal-afterword",
    "@media (max-width: 680px)",
  ]) assert.ok(stylesheet.includes(expected), expected);
  assert.ok(!stylesheet.includes("about-display"));
  assert.ok(!stylesheet.includes("principles-grid"));
  assert.ok(!stylesheet.includes("journal-break"));
  assert.ok(!stylesheet.includes("border-bottom: 1px solid var(--journal-rule)"));
  assert.ok(!stylesheet.includes("border-top: 1px solid #d8e3f0"));
  const luminance = (hex) => {
    const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    const linear = rgb.map((c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  };
  const contrast = (foreground, background) => {
    const a = luminance(foreground);
    const b = luminance(background);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  };
  assert.ok(stylesheet.includes("--journal-paper: #f7f9fc;"));
  assert.ok(stylesheet.includes("--journal-ink: #182a3c;"));
  assert.ok(stylesheet.includes("--journal-text: #344a60;"));
  assert.ok(stylesheet.includes("background: #eaf1fa;"));
  assert.ok(!/Iowan|Baskerville|Palatino|Georgia|Times New Roman/.test(stylesheet));
  assert.ok(contrast("#344a60", "#f7f9fc") >= 7);
  assert.ok(contrast("#50677d", "#f7f9fc") >= 4.5);
  assert.ok(contrast("#075fd8", "#eaf1fa") >= 4.5);
});

test("canonical normalisation preserves queries and scopes aliases to recognised HTML pages", () => {
  for (const page of publicPages) {
    const path = page.path === "/" ? "/" : `${page.path}/`;
    assert.equal(
      canonicalRedirect(
        new Request(`http://www.aidanbrotherhood.com${path}?a=one%20two&b=3`),
      ),
      `https://aidanbrotherhood.com${page.path}?a=one%20two&b=3`,
    );
    assert.equal(
      canonicalRedirect(
        new Request(`https://aidanbrotherhood.com${page.path}`),
      ),
      null,
    );
  }
  for (const path of ["/retired/", "/api/enquiry/", "/logo.svg/", "/terms/"])
    assert.equal(
      canonicalRedirect(new Request(`https://aidanbrotherhood.com${path}`)),
      null,
    );
  for (const host of [
    "staging.invalid",
    "practice.aidanbrotherhood.com",
    "aidanbrotherhood.com.evil.invalid",
  ])
    assert.equal(
      canonicalRedirect(new Request(`http://${host}/pricing/`)),
      null,
    );
});

test("legacy public paths move directly to the canonical published URLs", () => {
  for (const [oldPath, newPath] of [
    ["/coaching", "/pricing"],
    ["/my-approach", "/about/approach"],
  ]) {
    assert.equal(legacyPageDestination(oldPath), newPath);
    assert.equal(legacyPageDestination(oldPath + "/"), newPath);
    assert.equal(getPublicPage(oldPath), undefined);
    assert.ok(getPublicPage(newPath));
    for (const host of ["https://aidanbrotherhood.com", "http://www.aidanbrotherhood.com"])
      assert.equal(
        canonicalRedirect(new Request(host + oldPath + "/?utm_source=old-link")),
        "https://aidanbrotherhood.com" + newPath + "?utm_source=old-link",
      );
    assert.equal(
      canonicalRedirect(new Request("https://preview.invalid" + oldPath)),
      null,
    );
  }
  for (const path of ["/pricing", "/about/approach", "/api/enquiry", "/"])
    assert.equal(legacyPageDestination(path), null);
});

test("indexing requires the explicit flag and the exact HTTPS apex origin", () => {
  for (const flag of [undefined, false, "false", "TRUE", "1"])
    assert.equal(
      isIndexableProduction(new Request("https://aidanbrotherhood.com/"), {
        INDEXABLE: flag,
      }),
      false,
    );
  for (const host of [
    "http://aidanbrotherhood.com",
    "https://www.aidanbrotherhood.com",
    "https://ab-personal-training-staging.aidanbrotherhood.workers.dev",
    "https://ab-personal-training-preview.aidanbrotherhood.workers.dev",
    "https://aidanbrotherhood.com:444",
  ])
    assert.equal(
      isIndexableProduction(new Request(host), { INDEXABLE: "true" }),
      false,
    );
  assert.equal(
    isIndexableProduction(
      new Request("https://aidanbrotherhood.com/pricing"),
      { INDEXABLE: "true" },
    ),
    true,
  );
  assert.equal(xmlEscape("a&<b>\"c'"), "a&amp;&lt;b&gt;&quot;c&apos;");
});
test("connected entity graph describes the business and venue separately without invented authority", () => {
  for (const page of publicPages) {
    const data = structuredData(page.path);
    const graph = data["@graph"];
    const business = graph.find(
      (n) => n["@id"] === "https://aidanbrotherhood.com/#business",
    );
    assert.equal(business.name, "AB Personal Training");
    assert.equal(business["@type"], "LocalBusiness");
    assert.equal(business.address.postalCode, "PA4 9EN");
    assert.equal(
      graph.find((n) => n["@id"] === business.location["@id"]).name,
      "JD Gyms Renfrew",
    );
    const text = JSON.stringify(data);
    assert.doesNotMatch(
      text,
      /ProfessionalService|ExerciseGym|aggregateRating|hasCredential|openingHours|award|parentOrganization/,
    );
    for (const offer of graph.find((n) => n["@type"] === "Service")?.offers ||
      [])
      assert.ok(
        offer.url.startsWith(
          "https://aidanbrotherhood.com/pricing#offer-coaching-",
        ),
      );
  }
  assert.equal(structuredData("/terms"), null);
});
test("only known provider engagement messages map to diagnostic signals, never confirmed bookings", () => {
  assert.equal(
    calendlySignal({
      event: "calendly.event_scheduled",
      payload: { email: "must-not-be-forwarded@example.invalid" },
    }),
    "booking_completed_client_signal",
  );
  assert.equal(
    calendlySignal({ event: "calendly.date_and_time_selected" }),
    "booking_time_selected",
  );
  assert.equal(
    calendlySignal({ event: "calendly.event_type_viewed" }),
    "booking_calendar_viewed",
  );
  for (const value of [
    null,
    false,
    "calendly.event_scheduled",
    {},
    { event: "consultation_booked" },
    { event: "calendly.something_else" },
  ])
    assert.equal(calendlySignal(value), null);
  const measurement = readFileSync("app/lib/measurement.ts", "utf8");
  assert.doesNotMatch(
    measurement,
    /localStorage|sessionStorage|fetch\(|sendBeacon|document\.cookie/,
  );
});

test("provider signals require both the exact origin and the active iframe window", () => {
  const frame = {};
  const event = {
    origin: "https://calendly.com",
    source: frame,
    data: { event: "calendly.event_scheduled" },
  };
  assert.equal(
    trustedCalendlySignal(event, frame),
    "booking_completed_client_signal",
  );
  for (const origin of [
    "https://evil.invalid",
    "https://calendly.com.evil.invalid",
    "http://calendly.com",
    "null",
  ])
    assert.equal(trustedCalendlySignal({ ...event, origin }, frame), null);
  assert.equal(trustedCalendlySignal({ ...event, source: {} }, frame), null);
  assert.equal(trustedCalendlySignal({ ...event, source: null }, null), null);
});
