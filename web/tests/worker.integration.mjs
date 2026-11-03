// Run against the real compiled Worker after either environment build. No network or provider calls.
import { test } from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import worker from "../build/server/index.js";

const result = await build({
  entryPoints: ["app/lib/public-pages.ts"],
  tsconfig: "tsconfig.json",
  bundle: true,
  write: false,
  platform: "neutral",
  format: "esm",
  target: "es2022",
});
const { publicPages } = await import(
  `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`
);
const origin = "https://aidanbrotherhood.com";
const env = { INDEXABLE: "true", NOTIFICATIONS_ENABLED: "false" };
const ctx = {
  waitUntil() {
    throw Error("Unexpected background work in read-only page tests");
  },
};
const request = (path, bindings = env, base = origin) =>
  worker.fetch(new Request(`${base}${path}`), bindings, ctx);
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"');
function links(html) {
  return [...html.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>/g)].map((m) =>
    decode(m[1]),
  );
}

test("full Worker routing serves the production resource sitemap and robots from the route loaders", async () => {
  const response = await request("/sitemap.xml");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("Content-Type"), /application\/xml/);
  assert.equal(response.headers.get("X-Content-Type-Options"), "nosniff");
  assert.equal(response.headers.get("Cache-Control"), "public, max-age=600");
  const xml = await response.text();
  assert.deepEqual(
    [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]),
    publicPages.map((p) => `${origin}${p.path}`),
  );
  assert.doesNotMatch(
    xml,
    /priority|changefreq|lastmod|workers\.dev|\/terms|\/strength-training|\/fat-loss-coaching/,
  );
  const robots = await request("/robots.txt");
  assert.equal(
    await robots.text(),
    `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
  );
  assert.equal(robots.headers.get("X-Content-Type-Options"), "nosniff");
});

test("full Worker redirects scheme, www and known HTML slashes together, preserving path/query", async () => {
  for (const url of [
    "http://www.aidanbrotherhood.com/coaching/?source=a%20b&n=2",
    "http://aidanbrotherhood.com/coaching/?source=a%20b&n=2",
    "https://www.aidanbrotherhood.com/coaching/?source=a%20b&n=2",
    "https://aidanbrotherhood.com/coaching/?source=a%20b&n=2",
  ]) {
    const response = await worker.fetch(new Request(url), env, ctx);
    assert.equal(response.status, 308);
    assert.equal(
      response.headers.get("Location"),
      `${origin}/coaching?source=a%20b&n=2`,
    );
  }
});

test("all production pages have complete SSR metadata, one H1 and direct consultation links", async () => {
  const documents = new Map();
  for (const page of publicPages) {
    const response = await request(`${page.path}?utm_source=qa`);
    assert.equal(response.status, 200, page.path);
    const html = await response.text();
    documents.set(page.path, html);
    assert.equal((html.match(/<title>/g) || []).length, 1, page.path);
    assert.ok(
      html.includes(`<title>${page.title.replace(/&/g, "&amp;")}</title>`),
      page.path,
    );
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, page.path);
    const heading = decode(
      html
        .match(/<h1[^>]*>(.*?)<\/h1>/s)[1]
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    );
    assert.equal(heading, page.h1, page.path);
    assert.match(html, /<meta name="description" content="[^"]{80,}"/);
    assert.match(html, /<meta name="robots" content="index, follow"/);
    assert.ok(
      html.includes(`<link rel="canonical" href="${origin}${page.path}"`),
    );
    assert.match(html, /application\/ld\+json/);
    assert.ok(links(html).includes("/consultation"), page.path);
    assert.doesNotMatch(
      html,
      /href="\/(terms|strength-training|fat-loss-coaching|personal-training-paisley)"/,
    );
    const graph = html.match(
      /<script type="application\/ld\+json">(.*?)<\/script>/s,
    );
    assert.ok(JSON.parse(graph[1])["@graph"].length >= 5);
  }
  // Check every existing same-origin route and fragment in the actual SSR output.
  for (const [path, html] of documents)
    for (const href of links(html)) {
      const url = new URL(href, `${origin}${path}`);
      if (url.origin !== origin) continue;
      const target = documents.get(url.pathname);
      assert.ok(target, `${path} -> ${href}`);
      if (url.hash)
        assert.ok(
          target.includes(`id="${url.hash.slice(1)}"`),
          `${path} -> ${href}`,
        );
    }
});


test("movement assessment landing page explains FMS and uses the existing consultation booking flow", async () => {
  const response = await request("/movement-assessment");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Functional Movement Screen/);
  for (const movement of [
    "Deep Squat",
    "Hurdle Step",
    "In-Line Lunge",
    "Shoulder Mobility",
    "Active Straight-Leg Raise",
    "Trunk Stability Push-Up",
    "Rotary Stability",
  ])
    assert.ok(html.includes(movement), movement);
  assert.match(html, /images\.unsplash\.com/);
  assert.ok(links(html).includes("/consultation"));
  assert.doesNotMatch(html, /<iframe|href="https:\/\/calendly\.com/);
  assert.match(html, /not a medical diagnosis/i);
});


test("my approach explains the philosophy, links to assessment and coaching, and uses existing booking", async () => {
  const response = await request("/my-approach");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const phrase of [
    "Become more capable.",
    "Live more fully.",
    "Training is the means.",
    "Evidence before assumption.",
    "Continuous improvement",
    "Train the individual",
    "Build for the long term",
    "Functional Movement Screen",
    "Assess",
    "Develop",
    "Progress",
  ])
    assert.ok(html.includes(phrase), phrase);
  for (const path of ["/consultation", "/coaching", "/movement-assessment"])
    assert.ok(links(html).includes(path), path);
  assert.match(html, /images\.unsplash\.com/);
  assert.doesNotMatch(html, /<iframe|href="https:\/\/calendly\.com/);
  const home = await (await request("/")).text();
  assert.ok(links(home).includes("/my-approach"));
  const about = await (await request("/about")).text();
  assert.ok(links(about).includes("/my-approach"));
});

test("all three pricing surfaces show the approved packages, hierarchy, exact prices and CTA destination", async () => {
  for (const path of ["/", "/personal-training-renfrew", "/coaching"]) {
    const html = await (await request(path)).text();
    for (const value of [
      "Starter",
      "Coaching",
      "Coaching+",
      "£99",
      "£180",
      "£320",
      "Per four-week block",
      "One-off payment",
      "offer-card--introduction",
      "offer-card--featured",
      "offer-card--complete",
    ])
      assert.ok(html.includes(value), `${path}: ${value}`);
    assert.match(html, /Recommended for consistency/);
    assert.equal(
      (html.match(/class="offer-compare-table"/g) || []).length,
      path === "/coaching" ? 1 : 0,
    );
    assert.doesNotMatch(html, /href="\/?#consultation"/);
    for (const match of html.matchAll(
      /<a\s[^>]*data-consultation-cta="true"[^>]*>/g,
    ))
      assert.match(match[0], /href="\/consultation"/);
  }
  const home = await (await request("/")).text();
  for (const id of ["approach", "about", "coaching", "consultation"])
    assert.ok(home.includes(`id="${id}"`));
});

test("staging remains noindex and has no live calendar, even if the production flag is accidentally supplied", async () => {
  for (const [base, bindings] of [
    ["https://ab-personal-training-staging.aidanbrotherhood.workers.dev", env],
    ["https://ab-personal-training-preview.aidanbrotherhood.workers.dev", env],
    [origin, { ...env, INDEXABLE: "false" }],
  ]) {
    for (const page of publicPages) {
      const response = await request(page.path, bindings, base);
      const html = await response.text();
      assert.equal(response.headers.get("X-Robots-Tag"), "noindex, nofollow");
      assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
      assert.doesNotMatch(
        html,
        /rel="canonical"|<iframe|href="https:\/\/calendly\.com/,
      );
      if (page.key === "consultation")
        assert.match(html, /Live appointment booking is disabled/);
    }
    const sitemap = await request("/sitemap.xml", bindings, base);
    assert.equal(sitemap.status, 404);
    assert.equal(sitemap.headers.get("Cache-Control"), "no-store");
    assert.equal(
      await (await request("/robots.txt", bindings, base)).text(),
      "User-agent: *\nDisallow: /\n",
    );
  }
});

test("production booking HTML retains the existing destination and visible alternatives above the iframe", async () => {
  const html = await (await request("/consultation")).text();
  const direct = html.indexOf(
    'href="https://calendly.com/hello-aidanbrotherhood/free-personal-training-consultation"',
  );
  assert.ok(direct > 0 && direct < html.indexOf("<iframe"));
  assert.match(html, /hide_event_type_details=1/);
  assert.ok(
    html.indexOf("Contact Aidan before booking") < html.indexOf("<iframe"),
  );
  assert.ok(html.includes('href="mailto:hello@aidanbrotherhood.com"'));
  assert.doesNotMatch(
    html,
    /assets\.calendly\.com.*widget\.js|googletagmanager|facebook\.net/,
  );
});

test("retired, deferred and unknown paths remain genuine noindex 404s without canonicals", async () => {
  for (const path of [
    "/terms",
    "/writing",
    "/posts/old-post",
    "/sign-up-to-my-newsletter",
    "/strength-training",
    "/fat-loss-coaching",
    "/personal-training-paisley",
    "/not-a-page/",
    "/api/enquiry/",
  ]) {
    const response = await request(path);
    assert.equal(response.status, 404, path);
    assert.equal(response.headers.get("X-Robots-Tag"), "noindex, nofollow");
    const html = await response.text();
    assert.doesNotMatch(html, /rel="canonical"/);
    assert.match(html, /Page Not Found/);
  }
  const api = await request("/api/enquiry");
  assert.equal(api.status, 405);
  assert.equal(api.headers.get("Allow"), "POST");
  assert.equal(api.headers.get("X-Robots-Tag"), "noindex, nofollow");
  assert.equal(api.headers.get("Referrer-Policy"), "no-referrer");
  const fallback = await api.text();
  for (const label of [
    "Starter — £99 one-off",
    "Coaching — £180 / four weeks",
    "Coaching+ — £320 / four weeks",
  ])
    assert.ok(fallback.includes(label));
  assert.doesNotMatch(
    fallback,
    /PT Introduction|Weekly Coaching|Complete Coaching/,
  );
});
