# Private Deployment Guide

Use this guide for Phase 5A private Vercel deployment testing with real Buttondown and Attio credentials.

This is not a public-launch checklist. The site is technically ready for private integration testing, but public launch still needs final credentials, real content, privacy/terms/legal copy, and a human QA pass.

## Vercel Readiness Audit

No extra `vercel.json` is required for the current V1.

The repo already has the pieces Vercel needs:

- `astro.config.mjs` uses `output: "server"` and `adapter: vercel()`.
- `src/pages/api/subscribe.ts` and `src/pages/api/enquiry.ts` export `POST` handlers and `prerender = false`, so they run as server-rendered API routes.
- `package.json` pins `"node": "24.x"` in `engines`.
- `.nvmrc` pins local Node to `24`.
- Static pages and posts routes opt into `prerender = true`.
- RSS and sitemap use `SITE_URL` through Astro `site`, falling back to `https://example.com` only so local builds do not fail.

Official references checked during this audit:

- Astro documents [`@astrojs/vercel`](https://docs.astro.build/en/guides/integrations-guide/vercel/) as the adapter for on-demand rendered routes on Vercel.
- Vercel documents [Astro SSR/API routes](https://vercel.com/docs/frameworks/frontend/astro) as Vercel Functions when the Vercel adapter is enabled.
- Vercel documents [Node `24.x`](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) as available and configurable through `package.json` `engines.node`.

## Safety Rules

- Never commit real API keys or secrets.
- Keep local `.env`, `.env.local`, and other real env files untracked.
- Do not prefix any variables in this project with `PUBLIC_`; these values are intended for server-side code only.
- Use `FORM_STUB_MODE=true` only for local/dev stub testing.
- Do not use `FORM_STUB_MODE=true` on a public production deployment because it creates fake success and loses real leads.
- For private live integration testing, set `FORM_STUB_MODE=false`.

## Step 1: Run Local Checks With Node 24

From the repo root:

```bash
nvm use
npm install
npm run check
npm run build
```

If `nvm` is unavailable, run `node -v` and confirm the current shell is using Node 24 before trusting the result.

Optional local stub check:

```bash
cp .env.local.example .env.local
npm run dev
```

Open `http://localhost:4321` and submit only test data.

## Step 2: Push Repo To GitHub

Before pushing:

- Confirm `.env`, `.env.local`, `.vercel`, `dist`, `.astro`, and `node_modules` are not staged.
- Confirm `.env.example` and `.env.local.example` contain placeholders only.
- Push the repo to the GitHub repository you want Vercel to import.

## Step 3: Create Or Import Vercel Project

In Vercel:

- Import the GitHub repo.
- Use the Astro framework preset if Vercel detects it.
- Keep the default install command unless you have a reason to change it.
- Use `npm run build` as the build command.
- Do not add a `vercel.json` unless a later requirement appears.
- Keep the deployment private/unshared while testing.
- Do not attach the final public domain until the real integration tests and public-launch blockers are resolved.

## Step 4: Set Environment Variables

Set these in Vercel Project Settings for the environment you are testing, usually Preview first.

### Required For Private Buttondown Test

```env
FORM_STUB_MODE=false
BUTTONDOWN_API_KEY=
SITE_URL=
```

Use the full private deployment URL or intended canonical URL for `SITE_URL`, for example:

```env
SITE_URL=https://your-private-preview.vercel.app
```

### Required For Private Attio Enquiry Test

```env
FORM_STUB_MODE=false
ATTIO_API_KEY=
ATTIO_COACHING_ENQUIRIES_LIST=
SITE_URL=
```

The route only requires `ATTIO_API_KEY` and `ATTIO_COACHING_ENQUIRIES_LIST` to create/update the Person and assert the list entry. To verify real field capture, also map at least:

```env
ATTIO_FIELD_STAGE=
ATTIO_FIELD_SUBMITTED_AT=
ATTIO_FIELD_MAIN_INTEREST=
ATTIO_FIELD_MESSAGE=
ATTIO_FIELD_CONSENT_TO_CONTACT=
```

### Optional Variables

```env
BUTTONDOWN_API_BASE_URL=
BUTTONDOWN_API_VERSION=
ATTIO_API_BASE_URL=
ATTIO_FIELD_LOCATION=
ATTIO_FIELD_PREFERRED_CONTACT_METHOD=
ATTIO_FIELD_PRIMARY_GOAL=
ATTIO_FIELD_SERVICE_PREFERENCE=
ATTIO_FIELD_CURRENT_TRAINING_LEVEL=
ATTIO_FIELD_GYM_CONFIDENCE=
ATTIO_FIELD_CURRENT_ROUTINE=
ATTIO_FIELD_BIGGEST_BARRIER=
ATTIO_FIELD_PREFERRED_COACHING_FORMAT=
ATTIO_FIELD_AVAILABILITY=
ATTIO_FIELD_START_TIMELINE=
ATTIO_FIELD_REFERRAL_SOURCE=
ATTIO_FIELD_SOCIAL_HANDLE=
ATTIO_FIELD_NEWSLETTER_OPT_IN=
ATTIO_FIELD_SOURCE_PAGE=
ATTIO_FIELD_UTM_SOURCE=
ATTIO_FIELD_UTM_MEDIUM=
ATTIO_FIELD_UTM_CAMPAIGN=
ATTIO_FIELD_UTM_TERM=
ATTIO_FIELD_UTM_CONTENT=
ATTIO_FIELD_STATUS_NOTES=
```

### Never Use `PUBLIC_`

Do not create `PUBLIC_BUTTONDOWN_API_KEY`, `PUBLIC_ATTIO_API_KEY`, or public-prefixed copies of any provider, CRM, field mapping, or stub-mode variable.

`SITE_URL` is not a secret, but this project reads it server-side through Astro config, so keep the plain `SITE_URL` name.

### If Keys Are Missing

- Missing `BUTTONDOWN_API_KEY` with `FORM_STUB_MODE=false`: `/api/subscribe` returns `503` with the safe unavailable message.
- Missing `ATTIO_API_KEY` or `ATTIO_COACHING_ENQUIRIES_LIST` with `FORM_STUB_MODE=false`: `/api/enquiry` returns `503` with the safe unavailable message.
- Missing Buttondown config during coaching newsletter opt-in: Attio can still succeed, the enquiry still succeeds, and the server logs a sanitised opt-in skip.
- `FORM_STUB_MODE=true`: forms validate and return success without sending anything. This is local/dev only.

## Step 5: Deploy Preview Or Private Deployment

Trigger a Vercel deployment after setting env vars.

After deploy:

- Open the deployment URL.
- Confirm `/`, `/posts`, `/coaching`, `/about`, `/contact`, `/privacy`, `/terms`, and `/rss.xml` load.
- Confirm `/writing` redirects or safely resolves to `/posts`.
- Confirm the deployment URL and `SITE_URL` match the URL you expect in RSS/sitemap output.
- Confirm forms are not tested with real client data.

## Step 6: Test Newsletter Form With Buttondown

Use a fresh test email you control.

- Open the homepage or `/posts` with test UTMs, e.g. `?utm_source=private-test&utm_medium=manual&utm_campaign=buttondown`.
- Submit the newsletter form with a valid fresh test email.
- Confirm the page shows `Thanks — you’re on the list.`
- Confirm the subscriber appears in Buttondown.
- Confirm metadata/source/UTMs are present if Buttondown shows them.
- Submit the same email again.
- Confirm duplicate handling is safe and does not forcibly resubscribe an unsubscribed person.
- Submit an invalid email and confirm validation fails.
- If practical, send a manual honeypot request with `website=bot` and confirm Buttondown is not called.
- Confirm no coaching enquiry message, phone, health, injury, medical, medication, or mental-health data appears in Buttondown.

## Step 7: Test Get Started Form With Attio

Before testing:

- Create/configure the Attio API key with `record_permission:read-write`, `object_configuration:read`, `list_entry:read-write`, and `list_configuration:read`.
- Create or identify the Coaching Enquiries list.
- Configure `ATTIO_COACHING_ENQUIRIES_LIST`.
- Configure the recommended field mappings listed in Step 4.

Then:

- Open `/contact` with test UTMs, e.g. `?utm_source=private-test&utm_medium=manual&utm_campaign=attio`.
- Submit a realistic Get Started enquiry with a test email.
- Confirm the page shows `Thanks — I’ve got this. I’ll review your answers and get back to you soon.`
- Confirm Attio created or updated the Person by email.
- Confirm Attio created/asserted the Coaching Enquiries list entry.
- Confirm the stage is `New enquiry` if `ATTIO_FIELD_STAGE` is configured.
- Confirm message, source page, UTMs, and qualification summary are captured according to configured fields.
- If detailed qualification fields are not mapped, confirm `ATTIO_FIELD_MESSAGE` or `ATTIO_FIELD_STATUS_NOTES` contains the fallback qualification summary when either field is configured.
- Submit the same email again and inspect whether Attio updates/asserts the existing list entry safely.
- Submit with optional fields omitted and confirm the enquiry still succeeds.
- Confirm no medical, injury-history, medication, diagnosis, mental-health, or PAR-Q style data is intentionally collected or routed.

## Step 8: Test Coaching Newsletter Opt-In

With both Attio and Buttondown configured:

- Submit a coaching enquiry with newsletter opt-in checked.
- Confirm Attio succeeds first.
- Confirm Buttondown receives only newsletter-safe data: email, first name, last name, source page, and UTMs.
- Confirm Buttondown does not receive the coaching message, qualification answers, phone, location, referral source, social handle, or health/medical details.
- Temporarily remove `BUTTONDOWN_API_KEY` in a private test environment and redeploy.
- Submit another opt-in enquiry.
- Confirm Attio still succeeds and the public response is still the enquiry success message.
- Confirm Vercel logs show only a sanitised Buttondown opt-in skip/failure.

## Step 9: Inspect Logs If Something Fails

In Vercel deployment logs and function logs, check for:

- HTTP status from Buttondown or Attio.
- `reason`, `step`, `diagnosticCode`, and `retryAfter` fields.
- Missing Attio config names, if present.
- Sanitised payload metadata only.

Logs should not contain real API keys, full enquiry messages, or full email addresses.

## Step 10: Roll Back Or Safely Disable Forms

If something breaks, do not enable stub mode on a public deployment.

Safer options:

- Roll back to the last known-good Vercel deployment.
- Remove `BUTTONDOWN_API_KEY` and redeploy to make newsletter signup unavailable instead of fake-successful.
- Remove `ATTIO_API_KEY` or `ATTIO_COACHING_ENQUIRIES_LIST` and redeploy to make coaching enquiry unavailable instead of fake-successful.
- If the deployment is public, add or keep a direct contact route visible before disabling provider keys so visitors have a real way to reach Aidan.
- Keep test data labelled, then delete or archive it in Buttondown and Attio when testing is complete.

The safe unavailable message is:

```text
This form is not available yet. Please contact Aidan directly for now.
```

## Public-Launch Blockers

Resolve these before public launch:

- Finalise privacy and terms pages.
- Review coaching/about/posts copy with the private test audience and refine where needed.
- Confirm final `SITE_URL`.
- Confirm real Buttondown and Attio credentials in the production environment.
- Confirm Attio list fields and stage options match the website values.
- Re-run `npm run check` and `npm run build`.
- Complete `docs/pre-production-checklist.md`.
