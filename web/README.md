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

The endpoint validates on the server, bounds the actual request body to 8 KB, checks same-origin requests, keeps a honeypot and uses a Workers rate-limit binding (five attempts per IP per minute, approximate and per Cloudflare location). It saves the enquiry, context and notification queue row in an atomic D1 batch. A per-form UUID makes retries idempotent. JavaScript errors keep entered values in place; a no-JavaScript HTML fallback allows correction. An apparent success is returned for honeypot submissions without writing data. Resend notification processing and retries are described below. No booking system or WhatsApp link is configured.

The automated tests use isolated, in-memory SQLite behind a D1-shaped transaction adapter. They verify query execution, rollback, deduplication, validation and safeguards. This is not a claim that hosted D1 or email delivery has been exercised. Run runtime QA against isolated local D1 for a full valid submission. Hosted checks should use GET/invalid submissions only, avoiding unwanted customer records.

## Measurement

Current-page UTM source, medium, campaign, content and term labels plus an external referrer hostname can accompany a submitted enquiry. Only allowlisted, bounded labels are saved. No cookies, localStorage, sessionStorage, full referrer URLs, advertising click IDs or external analytics scripts are used. Do not place personal data in campaign labels.

Package CTAs preselect the form's optional coaching option. Browser CustomEvents `ab:package-interest` and `ab:consultation-submitted` expose only the package enum for future consent-aware integration; there is no analytics listener or reporting service. The submission event follows server-confirmed persistence. Server logs record `enquiry_saved` with the package enum only on a new insert. No names, emails, goals, free text or request body are logged. Invocation logging is disabled.

For useful commercial reporting, review enquiries by source/package and maintain `enquiries.status` manually as conversations progress (for example `new`, `contacted`, `consulted`, `client`). Do not equate enquiry count with acquired paying clients. Add no analytics or advertising tags without an explicit account and consent decision.

## Before switching the public domain

1. Owner review of the creative direction, service copy, actual availability and the privacy notice. Confirm a specific enquiry-retention/review schedule, lawful bases, processor arrangements and any applicable registration obligations. The current notice describes retention criteria; it does not invent an agreed number of months. Ensure the manual enquiry-review process is workable.
2. Validate the deployed build, form errors, mobile experience and a clearly labelled end-to-end test enquiry with permission. Delete any disposable test records only with appropriate authorisation. Add a verified business number if WhatsApp is wanted.
3. Audit legacy Webflow URLs and define redirects. Domain connection and root/www DNS changes need explicit approval. Preserve all iCloud Mail MX/SPF/DKIM, Google verification and unrelated records.
4. The shared Worker uses `INDEXABLE=true`. Production indexing requires both `INDEXABLE=true` and the exact `https://aidanbrotherhood.com` origin. Only then are canonical URLs and the sitemap emitted and the robots block removed. The preview remains noindex even if the flag is set accidentally. Social cards use the serving origin.
5. Check production canonical host, redirects, social-card URL, structured data and the enquiry endpoint after the approved cutover. There is no custom-domain route in this configuration.

## Service facts

PT Introduction: £99 one-off, two 60-minute sessions, assessment, technique coaching and practical starting plan. Weekly Coaching: £180/four-week block, four sessions, programme, nutrition guidance and weekly review. Complete Coaching: £320/four-week block, eight sessions, programme, nutrition coaching and weekly accountability/reviews. Optional 12-week pathway: three independent £320 blocks, £960 total, no requirement to commit to or pay for all three upfront. The free consultation is separate from the paid Introduction. JD Gyms membership is required and purchased separately; AB is independent of JD Gyms.

## Production launch / 2 November 2026

Production apex and www use Custom Domain mappings to the existing Worker. The Worker redirects www with HTTP 308 preserving path and query. INDEXABLE=true allows indexing only on the apex; workers.dev stays noindex. Root/www Webflow CNAME originals are in launch-rollback.json. No Apple or unrelated records are changed. Isolated sender DNS under notify.aidanbrotherhood.com authenticates Resend; no receiving service is configured there.

Notifications: each new enquiry atomically creates a durable enquiry_notifications row. After saving, waitUntil attempts delivery through Resend using a domain-restricted Cloudflare secret. A five-minute cron reconciles pending rows. Email failure does not change successful lead storage. Provider acceptance is recorded separately from delivery; check the provider's delivery event by provider_id. No provider body or personal fields are logged. Open/click tracking is disabled. Reply-To is the prospect's email; notifications go only to hello@aidanbrotherhood.com.

Operational review: query enquiry_notifications for state='pending', attempts>=6, or created_at older than 23 hours. Automatic processing stops after six attempts or 23 hours, within Resend's 24-hour idempotency window. Fix the sender/credential/provider fault first. For a recent failure, reset attempts=0,next_attempt=unixepoch() on the exact row to retry at the next cron. For rows older than 23 hours, reconcile the provider reference/idempotency history before any manual email or new send to prevent duplicates; do not delete the lead. Accepted rows can still bounce: inspect Resend delivery events and reconcile with D1. A failed email is never a failed enquiry. The existing phone column is optional and validated; email remains required.

Rollback website routing: remove only the two Worker Custom Domain mappings, then recreate the two DNS-only CNAMEs from launch-rollback.json (apex and www, target proxy-ssl.webflow.com, ttl=1, proxied=false). Do not change mail records, sending subdomain records or any D1 data. For an application-only fault use the previous Worker version recorded in the file, preserving current routing; note that the old version has no notification processing and production noindex, so restoring routing to Webflow is preferable for a prolonged incident. Remove custom-domain entries from Wrangler configuration before a later deployment if intentionally rolling routing back.
