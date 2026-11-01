# AB Personal Training / React Router preview

The active application is `/web` on `ab-react-router-landing`. The root Astro application is legacy. Hosting stays on the existing `ab-personal-training-preview` Cloudflare Worker with its existing `ENQUIRIES` D1 binding.

## Delivery and checks

Cloudflare Workers Builds is connected to this branch with root `/web`, build `npm install --no-audit --no-fund && npm run build`, deploy `npx wrangler deploy`. GitHub Actions separately generates types, checks TypeScript, tests the enquiry safeguards and builds. A passing commit is not proof of deployment: inspect the Cloudflare build and verify the served page.

In a temporary development environment with Node 24.4+:

```sh
npm ci --no-audit --no-fund
npm run cf-typegen
npm run typecheck
npm test
npm run build
```

The repository's pinned Vite plugin and Wrangler bundle development runtimes older than the existing 2026-10-30 compatibility date. Builds and types work; for runtime QA use an up-to-date Wrangler installed in a separate temporary tools directory against `build/server/wrangler.json`. Do not lower the deployed compatibility date to make local development work. No user-operated local server or manual file transfer is needed.

## Enquiries

`POST /api/enquiry` remains the endpoint. `enquiries` keeps its original schema and records. The additive migration `migrations/0001_enquiry_context.sql` creates `enquiry_details` for a broad goal, selected package, campaign labels and acknowledged notice version. Apply it to the named D1 database **before** deploying code that writes context. The migration is idempotent and does not delete data.

The endpoint validates on the server, bounds the actual request body to 8 KB, checks same-origin requests, keeps a honeypot and uses a Workers rate-limit binding (five attempts per IP per minute, approximate and per Cloudflare location). It saves both rows in an atomic D1 batch. A per-form UUID makes retries idempotent. JavaScript errors keep entered values in place; a no-JavaScript HTML fallback allows correction. An apparent success is returned for honeypot submissions without writing data. No email provider, outbound notifications, booking system or WhatsApp link is configured. Aidan must review stored enquiries manually.

The automated tests use isolated, in-memory SQLite behind a D1-shaped transaction adapter. They verify query execution, rollback, deduplication, validation and safeguards. This is not a claim that hosted D1 or email delivery has been exercised. Run runtime QA against isolated local D1 for a full valid submission. Hosted checks should use GET/invalid submissions only, avoiding unwanted customer records.

## Measurement

Current-page UTM source, medium, campaign, content and term labels plus an external referrer hostname can accompany a submitted enquiry. Only allowlisted, bounded labels are saved. No cookies, localStorage, sessionStorage, full referrer URLs, advertising click IDs or external analytics scripts are used. Do not place personal data in campaign labels.

Package CTAs preselect the form's optional coaching option. Browser CustomEvents `ab:package-interest` and `ab:consultation-submitted` expose only the package enum for future consent-aware integration; there is no analytics listener or reporting service. The submission event follows server-confirmed persistence. Server logs record `enquiry_saved` with the package enum only on a new insert. No names, emails, goals, free text or request body are logged. Invocation logging is disabled.

For useful commercial reporting, review enquiries by source/package and maintain `enquiries.status` manually as conversations progress (for example `new`, `contacted`, `consulted`, `client`). Do not equate enquiry count with acquired paying clients. Add no analytics or advertising tags without an explicit account and consent decision.

## Before switching the public domain

1. Owner review of the creative direction, service copy, actual availability and the privacy notice. Confirm a specific enquiry-retention/review schedule, lawful bases, processor arrangements and any applicable registration obligations. The current notice describes retention criteria; it does not invent an agreed number of months. Ensure the manual enquiry-review process is workable.
2. Validate the deployed build, form errors, mobile experience and a clearly labelled end-to-end test enquiry with permission. Delete any disposable test records only with appropriate authorisation. Add a verified business number if WhatsApp is wanted.
3. Audit legacy Webflow URLs and define redirects. Domain connection and root/www DNS changes need explicit approval. Preserve all iCloud Mail MX/SPF/DKIM, Google verification and unrelated records.
4. Keep `INDEXABLE=false` on the preview. Production indexing requires both `INDEXABLE=true` and the exact `https://aidanbrotherhood.com` origin. Only then are canonical URLs and the sitemap emitted and the robots block removed. The preview remains noindex even if the flag is set accidentally. Social cards use the serving origin.
5. Check production canonical host, redirects, social-card URL, structured data and the enquiry endpoint after the approved cutover. There is no custom-domain route in this configuration.

## Service facts

PT Introduction: £99 one-off, two 60-minute sessions, assessment, technique coaching and practical starting plan. Weekly Coaching: £180/four-week block, four sessions, programme, nutrition guidance and weekly review. Complete Coaching: £320/four-week block, eight sessions, programme, nutrition coaching and weekly accountability/reviews. Optional 12-week pathway: three independent £320 blocks, £960 total, no requirement to commit to or pay for all three upfront. The free consultation is separate from the paid Introduction. JD Gyms membership is required and purchased separately; AB is independent of JD Gyms.
