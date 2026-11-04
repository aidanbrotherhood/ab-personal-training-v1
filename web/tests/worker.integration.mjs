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
    /priority|changefreq|lastmod|workers\.dev|\/terms|\/strength-training<|\/fat-loss-coaching</,
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
    "http://www.aidanbrotherhood.com/pricing/?source=a%20b&n=2",
    "http://aidanbrotherhood.com/pricing/?source=a%20b&n=2",
    "https://www.aidanbrotherhood.com/pricing/?source=a%20b&n=2",
    "https://aidanbrotherhood.com/pricing/?source=a%20b&n=2",
  ]) {
    const response = await worker.fetch(new Request(url), env, ctx);
    assert.equal(response.status, 308);
    assert.equal(
      response.headers.get("Location"),
      `${origin}/pricing?source=a%20b&n=2`,
    );
  }
});


test("legacy pricing and approach URLs return single-hop 301s, retaining query parameters", async () => {
  for (const [oldPath, destination] of [
    ["/coaching", "/pricing"],
    ["/my-approach", "/about/approach"],
  ]) {
    for (const host of [
      "http://www.aidanbrotherhood.com",
      "https://www.aidanbrotherhood.com",
      origin,
    ]) {
      const response = await worker.fetch(
        new Request(host + oldPath + "/?utm_source=shared&campaign=launch"),
        env,
        ctx,
      );
      assert.equal(response.status, 301, host + oldPath);
      assert.equal(
        response.headers.get("Location"),
        origin + destination + "?utm_source=shared&campaign=launch",
      );
    }
    const final = await request(destination);
    assert.equal(final.status, 200);
    const html = await final.text();
    assert.ok(html.includes('<link rel="canonical" href="' + origin + destination + '"'));
  }
});

test("header, dropdown, mobile menu and grouped footer resolve to canonical destinations", async () => {
  const html = await (await request("/")).text();
  for (const path of [
    "/personal-training-renfrew",
    "/strength-training-renfrew",
    "/personal-training-for-beginners",
    "/movement-assessment",
    "/pricing",
    "/about",
    "/about/approach",
    "/consultation",
  ]) assert.ok(links(html).includes(path), path);
  assert.match(html, /aria-controls="nav-panel-training"/);
  assert.match(html, /aria-controls="nav-panel-about"/);
  assert.equal((html.match(/aria-expanded="false"/g) || []).length >= 2, true);
  assert.match(html, /class="nav-popover"[^>]*hidden=""/);
  assert.match(html, /class="nav-popover-link"/);
  assert.match(html, /mobile-menu-icon--hamburger/);
  assert.match(html, /mobile-nav-chevron/);
  assert.match(html, /mobile-nav-group/);
  assert.match(html, /footer-nav-group/);
  const approachHtml = await (await request("/about/approach")).text();
  assert.match(approachHtml, /<a href="\/about">About<\/a>/);
  const graph = JSON.parse(approachHtml.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])["@graph"];
  const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
  assert.deepEqual(breadcrumb.itemListElement.map((item) => item.item), [origin + "/", origin + "/about", origin + "/about/approach"]);
  assert.doesNotMatch(html, /href="\/coaching(?:[\/#?"])/);
  assert.doesNotMatch(html, /href="\/my-approach(?:[\/#?"])/);
});

test("About Me navigation and text contrast stay consistent with the page design", async () => {
  const response = await request("/about");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /about-me-page/);
  assert.match(html, /about-me-introduction/);
  assert.match(html, /about-me-details/);
  assert.match(html, /About Me/);
  assert.match(html, /<title>About Me \| Aidan Brotherhood \| AB Personal Training<\/title>/);
  assert.match(html, /href="\/about\/approach"/);
  assert.doesNotMatch(html, /Meet Aidan/);
  for (const page of ["/", "/personal-training-for-beginners", "/consultation"]) {
    const other = await (await request(page)).text();
    assert.ok(other.includes("About Me"), page);
    assert.doesNotMatch(other, /Meet Aidan/);
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
      /href="\/(terms|strength-training|fat-loss-coaching|personal-training-paisley)(?=["#?])"/,
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
  const response = await request("/about/approach");
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
  for (const path of ["/consultation", "/pricing", "/movement-assessment"])
    assert.ok(links(html).includes(path), path);
  assert.match(html, /images\.unsplash\.com/);
  assert.doesNotMatch(html, /<iframe|href="https:\/\/calendly\.com/);
  const home = await (await request("/")).text();
  assert.ok(links(home).includes("/about/approach"));
  const about = await (await request("/about")).text();
  assert.ok(links(about).includes("/about/approach"));
});


test("strength training local page is crawlable, relevant, linked and commercially consistent", async () => {
  const path = "/strength-training-renfrew";
  const response = await request(path);
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const text of [
    "Strength &amp; muscle-building",
    "JD Gyms Renfrew",
    "Building strength.",
    "Building muscle.",
    "Paisley",
    "Erskine",
    "Clydebank",
    "£99",
    "£180",
    "£320",
  ])
    assert.ok(html.includes(text), text);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(html, /<meta name="robots" content="index, follow"/);
  assert.ok(html.includes('<link rel="canonical" href="' + origin + path + '"'));
  assert.match(html, /photo-1722925541142-5db2668ca492/);
  assert.match(html, /strength-location-panel/);
  assert.match(html, /Your training base/);
  assert.match(html, /offer-card--featured/);
  assert.match(html, /offer-compare-table/);
  assert.match(html, /srcSet="[^"]*600w/);
  for (const link of [
    "/consultation",
    "/pricing",
    "/about/approach",
    "/movement-assessment",
    "/personal-training-renfrew#location",
  ])
    assert.ok(links(html).includes(link), link);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])["@graph"];
  const service = graph.find((item) => item["@type"] === "Service" && item["@id"] === origin + path + "#strength-coaching");
  assert.ok(service, "strength-focused Service structured data");
  assert.equal(service.provider["@id"], origin + "/#business");
  assert.deepEqual(service.offers.map((offer) => offer.price), [99, 180, 320]);
  const breadcrumbs = graph.find((item) => item["@type"] === "BreadcrumbList");
  assert.deepEqual(breadcrumbs.itemListElement.map((item) => item.item), [
    origin + "/", origin + "/personal-training-renfrew", origin + path
  ]);
  for (const source of ["/", "/pricing", "/personal-training-renfrew", "/personal-training-for-beginners"]) {
    const sourceHtml = await (await request(source)).text();
    assert.ok(links(sourceHtml).includes(path), source + " must link to strength service");
  }
});

test("fat loss local landing page is complete, indexable, linked and consistent with shared coaching offers", async () => {
  const path = "/fat-loss-coaching-renfrew";
  const response = await request(path);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(html, /Lose body fat/);
  assert.match(html, /Build strength/);
  assert.match(html, /Assess/);
  assert.match(html, /Develop/);
  assert.match(html, /Progress/);
  assert.match(html, /calorie|energy deficit/i);
  assert.match(html, /fat-foundations-intro/);
  assert.match(html, /fat-foundations-intro-copy/);
  assert.match(html, /A considered approach to body composition/);
  assert.match(html, /More than/);
  assert.doesNotMatch(html, /class="fat-heading-grid"><div><p class="eyebrow">A considered approach to body composition/);
  assert.match(html, /JD Gyms Renfrew/);
  assert.match(html, /photo-1758875568722-72961c05d5dd/);
  assert.doesNotMatch(html, /photo-1722925541142-5db2668ca492/);
  assert.match(html, /fat-location-panel/);
  assert.match(html, /Your training base/);
  assert.match(html, /offer-section--fatLoss/);
  assert.match(html, /fat-loss-prices-title/);
  assert.match(html, /offer-card--featured/);
  assert.match(html, /offer-card-benefits/);
  assert.match(html, /offer-compare-table/);
  assert.equal(html.split("The support you need. A plan that makes sense.").length - 1, 1);
  assert.doesNotMatch(html, /fat-pricing-intro/);
  assert.match(html, /closing-cta section-pad/);
  assert.match(html, /perfect starting point/);
  assert.match(html, /<meta name="robots" content="index, follow"/);
  assert.ok(html.includes('<link rel="canonical" href="' + origin + path + '"'));
  for (const label of ["£99", "£180", "£320", "Starter", "Coaching+"]) assert.ok(html.includes(label), label);
  for (const link of ["/consultation", "/pricing", "/about", "/about/approach", "/strength-training-renfrew", "/personal-training-renfrew#location"])
    assert.ok(links(html).includes(link), link);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])["@graph"];
  const service = graph.find((node) => node["@type"] === "Service" && node["@id"] === origin + path + "#fat-loss-coaching");
  assert.ok(service, "fat-loss-focused Service node");
  assert.equal(service.provider["@id"], origin + "/#business");
  assert.deepEqual(service.offers.map((offer) => offer.price), [99, 180, 320]);
  const breadcrumbs = graph.find((node) => node["@type"] === "BreadcrumbList");
  assert.deepEqual(breadcrumbs.itemListElement.map((item) => item.item), [
    origin + "/", origin + "/personal-training-renfrew", origin + path
  ]);
  for (const source of ["/", "/pricing", "/personal-training-renfrew", "/strength-training-renfrew"]) {
    const sourceHtml = await (await request(source)).text();
    assert.ok(links(sourceHtml).includes(path), source + " must link to fat-loss coaching");
  }
});

test("all three pricing surfaces show the approved packages, hierarchy, exact prices and CTA destination", async () => {
  for (const path of ["/", "/personal-training-renfrew", "/pricing"]) {
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
      path === "/pricing" ? 1 : 0,
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

test("configured Analytics has a settings control but never a server-rendered Google tag", async () => {
  const configured = { ...env, GA_MEASUREMENT_ID: "G-TEST12345" };
  for (const base of [origin, "https://ab-personal-training-staging.aidanbrotherhood.workers.dev"]) {
    const html = await (await request("/pricing?email=private", configured, base)).text();
    assert.match(html, /Cookie settings/);
    assert.doesNotMatch(html, /<script[^>]*src="https:\/\/www\.googletagmanager\.com/);
  }
  const disabled = await (await request("/pricing")).text();
  assert.doesNotMatch(disabled, /Cookie settings/);
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
