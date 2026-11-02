# Implementation verification — 2 November 2026

The core website was merged to develop through [PR #15](https://github.com/aidanbrotherhood/ab-personal-training-v1/pull/15). Cloudflare built and deployed develop **`c7191ab57bdfefdc53580ae60590c696f0a2239e`**, build `ead2aa4d-d1ec-4115-b485-d1f91977e677`, Worker version `61bc06f4-8648-442c-9e64-c908d90b1117`.

Staging: https://ab-personal-training-staging.aidanbrotherhood.workers.dev

This evidence records that deployment. A following feature PR preserves the legacy enquiry fallback's stricter Referrer-Policy and sources its previously stale package labels from shared offer data. It also uses the existing primary blue token for the header/home hero CTA: white text contrast improves from 4.01:1 to 5.77:1. It changes no page layout, booking gate, database schema or notification processing. That PR reruns TypeScript, all tests and both builds. The final deployment SHA/version and post-fix hosted checks are recorded in the unmerged develop-to-main production promotion PR; do not treat this earlier SHA as the later deployment.

## Automated validation

- Cloudflare type generation and TypeScript pass.
- 26 unit/regression tests pass, including all 17 existing enquiry/notification safeguard tests, offer ID/price tests, published-manifest, redirect, indexing, connected-entity and provider-message trust tests.
- Both environment builds each pass seven tests against the **real compiled Worker**. Tests cover full sitemap/robots routing, production canonical redirects, every published SSR page/H1/metadata, internal routes/fragments, pricing, environment indexability/booking gates and genuine retired/unknown 404s. The follow-up also asserts the retained enquiry fallback's shared package labels and no-referrer response.
- Both compiled deployment-target checks pass. Bare deployment safeguards, Wrangler environments, offer definitions, notification processing and migrations remain intact.
- Both GitHub environment-validation jobs passed for PR #15.
- No dependency or lockfile change. System fonts and one existing responsive illustrative image; no added third-party script, animation framework, analytics vendor or custom booking engine. The stylesheet build is approximately 14 KB gzip. No Lighthouse/Core Web Vitals field score is claimed.
- Known non-blocking tooling warnings: root legacy Astro tsconfig is absent from the active app's installed dependencies; Node SQLite reports experimental status. Expected 404 tests log React Router “No route matches URL” diagnostics. All relevant checks exit successfully.

## Hosted HTTP and rendered evidence

[http-checks.json](http-checks.json) records seven successful HTML responses, 198 internal href/fragment checks and 14 successful assets, blocked staging robots, 404/no-store sitemap, genuine deferred/retired/unknown 404s and API GET 405. All staged HTML is noindex with no canonical, live calendar iframe or live Calendly anchor. Googlebot and OAI-SearchBot **user-agent string** GETs returned 200/noindex. This is not verification from genuine crawler IP ranges; production robots permission and indexing responses were tested through the compiled Worker, not released to production.

Additional read-only checks against the unchanged production site returned 200 for robots (wildcard Allow and existing sitemap) and 200/index-follow for both Googlebot and OAI-SearchBot user-agent home requests. The original production page title remained in place. These checks establish request-level access only, not genuine crawler-IP verification or indexing of the new pages.

[rendered-matrix.json](rendered-matrix.json) records **42 hosted page/viewport checks** after each page's load event. Measured CSS dimensions, independently read from `innerWidth`/`innerHeight`:

| Actual viewport | Pages | Result |
| --- | --- | --- |
| 320 × 900 | All seven | Pass |
| 375 × 900 | All seven | Pass |
| 390 × 900 | All seven | Pass |
| 768 × 900 | All seven | Pass |
| 1024 × 900 | All seven | Pass |
| 1440 × 900 | All seven | Pass |

No document-wide horizontal overflow, broken images, duplicate H1s, incorrect commercial CTA destinations or live booking controls were found. The comparison table intentionally scrolls within its own labelled focusable region. An initial pre-load DOM sample caught unstyled image dimensions; the check was corrected to await actual load and the full matrix rerun. No hidden CSS overflow patch was used to mask a layout defect.

Rendered interaction checks:

- Native mobile menu opens with Enter, exposes six useful destinations and closes with Escape, restoring focus to summary. The focused control's visible outline is pale blue on navy.
- The pricing comparison region is keyboard focusable with a visible outline. ArrowRight moved its local scroll position from 0 to 40px at 390px while the document stayed within the viewport.
- Starter/Coaching/Coaching+ prices and visually distinct surfaces were inspected on the rendered coaching page. The original offer style rules are unchanged; Coaching remains the blue recommended option and Coaching+ uses the premium navy gradient.
- The 320px consultation preview starts at approximately 587px down the viewport after the brief introduction and non-member instruction. It contains no live calendar or scheduling action. Email alternatives remain ordinary links; none were sent during QA.
- Legacy home fragments are present and every internal fragment resolves in actual SSR HTML.
- With JavaScript blocked by `Content-Security-Policy: script-src 'none'` through the loopback-only read-only proxy, the final staging artifact's native menu, coaching navigation, SSR content/prices and consultation/email links work. Measured proxy viewport: 468 × 1080, with no document overflow. This additionally verifies native behaviour; it is not physical-device certification.

Screenshots: [desktop pricing](pricing-1440.jpg), [mobile consultation](consultation-320.jpg). These are real hosted staging renders, not mockups.

## Isolated enquiry and provider checks

[provider-isolation.json](provider-isolation.json) is a read-only Cloudflare API snapshot: staging uses only the staging D1 UUID, INDEXABLE=false, NOTIFICATIONS_ENABLED=false, no secrets, no scheduled triggers and no custom domains. Production's existing bindings, secret name, cron and two custom domains remain unchanged. Its version is still **`4b65e9f8-1854-408d-9e49-cf060dd11e73`**, matching the pre-work baseline.

[synthetic-enquiry.json](synthetic-enquiry.json) records a clearly labelled synthetic staging enquiry and retry. Both returned success. A parameterised D1 SELECT limited to that UUID verified exactly one enquiry/context/notification tuple, package `weekly`, notification `disabled`, zero attempts and no provider ID. The synthetic audit row is retained. No production POST, customer-data query, email send, booking or appointment notification was performed.

## Explicit limits and remaining release work

Staging deliberately cannot validate live Calendly date/time/details, provider cookies, appointment confirmation, availability or notifications. Production HTML is covered in compiled-Worker tests; perform the real provider UI check only after separately approved production release, without submitting a genuine booking unless authorised. Provider confirmation, attendance and paid clients are not measured by browser clicks or iframe loads.

No genuine Googlebot/OpenAI-IP test, Search Console inspection under the correct account, authenticated Maps/Business Profile eligibility check, external Rich Results Test, field CWV report or physical iOS/Android device test was completed. Exact post-launch account-dependent tasks and owner evidence gates are in [owner-evidence-and-release-requirements.md](../owner-evidence-and-release-requirements.md). None is presented as passed or a guarantee of discovery/rankings.
