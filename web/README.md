# AB Personal Training

The active React Router SSR application is `/web`. Root Astro files are legacy. Deployment boundaries and provider identities are authoritative in [ENVIRONMENTS.md](ENVIRONMENTS.md) and [../AGENTS.md](../AGENTS.md).

- `develop` publishes **only staging**, `ab-personal-training-staging`.
- `main` publishes production, **`ab-personal-training-preview`**. Its historical name does not make it a preview system.
- Production promotion requires a normally merged develop-to-main PR and explicit approval in the current task. Never use the retired landing branch.
- Bare `npm run deploy` intentionally fails. Do not alter guards, bindings, secrets, domains or cron to make a deployment pass.

## Validation and builds

Run from `/web`, with Node 24.4+:

```sh
npm ci --no-audit --no-fund
npm run cf-typegen
npm run typecheck
npm test
npm run build
node scripts/deploy.mjs staging --check
npm run build:production
node scripts/deploy.mjs production --check
```

Both builds run `test:built` against the actual compiled Worker, including its SSR router, resource routes and environment gates. Unit tests separately exercise the enquiry system using isolated in-memory SQLite. Tests make no provider bookings or notification calls. The production **check** validates an artifact; it does not deploy it.

Cloudflare Workers Builds is the sole publisher. Both triggers install, generate types, typecheck and test before building/deploying. `npm run build` targets staging; `npm run build:production` explicitly selects production at build time. Their deploy commands are `npm run deploy:staging` and `npm run deploy:production`, respectively. GitHub Actions validates both artifacts and never publishes. Consult ENVIRONMENTS.md for the complete promotion procedure.

The pinned local development runtimes predate the existing 2026-10-30 compatibility date. For local rendered QA, use a current Wrangler installed in a temporary tools directory against `build/server/wrangler.json`. Do not lower the compatibility date. Rebuild staging before serving a local staging preview; do not reuse the production artifact for development.

For no-JavaScript QA, start the local staging artifact on 8787, then `node scripts/qa-nojs.mjs`. Its loopback-only GET/HEAD proxy on 8788 sets `script-src 'none'`. It never submits forms or targets a remote provider. Responsive QA must record measured CSS `innerWidth`/`innerHeight`, not just the requested override.

## Public content and discovery

[../docs/seo/implementation-specification-2026-11-02.md](../docs/seo/implementation-specification-2026-11-02.md) and its evidence are the original audit. The subsequent owner instruction limits publication to complete approved pages and preserves the creative proposition/pricing hierarchy. Delivery decisions and QA are recorded alongside that document.

- `app/lib/public-pages.ts` is the **published** HTML page registry. Routing, canonical paths, metadata and sitemap use it. Never add an unpublished draft.
- React Router resource routes `app/routes/sitemap.ts` and `robots.ts` alone publish crawler responses. The Worker must not intercept them with a second list.
- Production indexing requires `INDEXABLE=true` **and** the exact HTTPS apex origin. Every staging/Workers alias is noindex, has no canonical or entity graph, blocks robots and returns 404/no-store for XML sitemap.
- `app/lib/seo.ts` upgrades production HTTP/www and trims recognised HTML trailing slashes, preserving path/query. Unknown/retired paths remain genuine 404s. `practice.aidanbrotherhood.com` is outside these rules.
- `app/lib/structured-data.ts` connects AB's business, Aidan, the separate JD Gyms venue, pages, breadcrumbs and service offers. No ratings, invented credentials, gym ownership or Business Profile eligibility claims.
- `app/lib/offers.ts` owns all product names, stable IDs, prices and deliverables. `PricingSection` preserves Starter / recommended blue Coaching / premium navy Coaching+. Home/local show all actual prices; `/coaching` adds the full comparison. Four-week blocks are not calendar months.
- `/terms` is unpublished pending actual owner policies. No standalone goal or neighbouring-city pages exist. See the owner requirements document before adding them.

## Consultation and staging safety

`/consultation` is the canonical destination of commercial CTAs. Old home `#approach`, `#about`, `#coaching` and `#consultation` fragments remain useful. Production retains the existing Calendly event URL; no custom booking backend was introduced.

The calendar is enabled only by the same strict production origin/flag gate. Staging renders an explicit, disabled preview **without an iframe or a live Calendly anchor**, even if INDEXABLE is mistakenly true. There is no test Calendly provider configured, so live date/time selection cannot be safely exercised on staging. Email links remain available as ordinary explicit user actions; QA does not send them.

Production shows direct Calendly and email alternatives before the iframe, plus the current instruction for non-members to contact Aidan before booking. Calendar event-type details are hidden to reduce duplicate introductory content. The provider's scheduling window, account, questions, notifications and connected calendar are unchanged. After separately approved production promotion, check the actual iframe/date/time/details flow without completing a genuine booking unless specifically authorised.

## Measurement

`app/lib/measurement.ts` dispatches ephemeral `ab:measurement` browser CustomEvents with an allowlisted event, pathname, placement and optional stable package ID. The optional GA4 listener sends only allowlisted values, after analytics consent and only on the exact production origin. It is disabled until a real `GA_MEASUREMENT_ID` is configured. No events are buffered before consent. Destination views are hydrated browser views, not unique people. Hard navigation does not carry package/source attribution into the provider.

GA4 activation and remaining setup are tracked in [../docs/google-analytics-setup.md](../docs/google-analytics-setup.md). The Analytics account, property and web stream have been created under the business Google account; the real measurement ID is configured for the production environment, pending the staging-first release. Google receipt remains unverified until production activation. With no configured measurement ID, no Google tag or consent banner loads. Staging must retain an empty ID. Browser consent choices last six months, with equal accept/reject controls and a footer settings button; withdrawal disables collection, clears Analytics cookies and reloads to remove vendor code. GA4 Enhanced Measurement must be disabled before activation: this implementation owns pageviews and deliberately excludes automatic form/link/search collection and raw URLs.

Events distinguish CTA clicks, destination views, Calendly calendar/time engagement and contact fallbacks. The optional `booking_completed_client_signal` is diagnostic only, **never a confirmed booking**. Provider messages require the exact Calendly origin and active iframe window; payloads and personal details are not forwarded. Bookings require provider reconciliation, attendance requires owner confirmation, and paying clients require a genuine commercial record. See the measurement and release checklist for future configuration requirements.

## Existing enquiries and notifications

`POST /api/enquiry` is retained although the legacy form is not mounted on the current public pages. Existing enquiry records and migrations are untouched. Server validation, same-origin checks, actual 8 KB body limit, honeypot, rate limit, idempotent UUID and atomic enquiry/context/notification batch remain intact. Optional phone is validated; email is required. No names, emails, free text or request bodies are logged.

Staging uses only `ab-pt-enquiries-staging` (`7af4c995-22ad-4ecd-9359-eec163d27e45`), disabled notifications, no secrets, no custom domains and no schedules. A staging enquiry creates a notification row with `state=disabled`; processing exits before external calls. Use synthetic data only.

Production retains `ab-pt-enquiries` (`720c34f0-0a11-4518-9695-142c2635c708`), its existing Resend secret and five-minute reconciliation cron. A saved enquiry is durable even when email fails. Provider acceptance differs from delivery. Tracking is disabled. Notifications go only to the existing business inbox; Reply-To is the prospect.

Operational review: inspect pending notification rows with six attempts or older than 23 hours. Processing stops at those limits within Resend's idempotency window. Fix the provider fault first. Reconcile older rows against provider references before any manual retry/send; never delete the lead or assume acceptance proves delivery. Website work does not authorise production record mutation or notification changes.

Apply migrations only to an explicitly identified environment UUID. No schema migration is required for this implementation. Provider rollback/promotion instructions remain in ENVIRONMENTS.md; preserve bindings, secrets, cron and customer data. Historical launch routing evidence remains in `launch-rollback.json`.
