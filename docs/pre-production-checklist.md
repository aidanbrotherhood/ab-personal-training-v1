# Pre-Production Checklist

Use this before and during a private deployment with real Buttondown and Attio credentials.

Do not use real client data for testing. Use labelled test addresses and test enquiries only.

## Local Baseline

- Use Node 24: `nvm use`.
- If `nvm` is unavailable, run `node -v` and confirm Node 24.
- Install dependencies: `npm install`.
- Run checks: `npm run check`.
- Run build: `npm run build`.
- Start local dev in stub mode: `FORM_STUB_MODE=true npm run dev`.
- Open `http://localhost:4321`.
- Confirm `/`, `/posts`, `/coaching`, `/about`, `/contact`, `/privacy`, and `/terms` render.
- Confirm `/writing` redirects or safely resolves to `/posts`.

## Vercel Readiness

- Confirm `astro.config.mjs` uses `output: "server"` and `adapter: vercel()`.
- Confirm `src/pages/api/subscribe.ts` exports `POST`, `ALL`, and `prerender = false`.
- Confirm `src/pages/api/enquiry.ts` exports `POST`, `ALL`, and `prerender = false`.
- Confirm `.nvmrc` contains `24`.
- Confirm `package.json` contains `"engines": { "node": "24.x" }`.
- Confirm no extra `vercel.json` is present or required.
- Confirm there are no hardcoded `localhost` or `127.0.0.1` URLs in production code.
- Confirm `SITE_URL` is set to the intended private deployment URL before testing RSS/sitemap.

## Environment Variables

Set these in Vercel for private Buttondown testing:

```env
FORM_STUB_MODE=false
BUTTONDOWN_API_KEY=
SITE_URL=
```

Set these in Vercel for private Attio enquiry testing:

```env
FORM_STUB_MODE=false
ATTIO_API_KEY=
ATTIO_COACHING_ENQUIRIES_LIST=
SITE_URL=
```

The Attio route only requires `ATTIO_API_KEY` and `ATTIO_COACHING_ENQUIRIES_LIST` to create/update the Person and assert the list entry. To verify expected list field capture, map at least:

```env
ATTIO_FIELD_STAGE=
ATTIO_FIELD_SUBMITTED_AT=
ATTIO_FIELD_MAIN_INTEREST=
ATTIO_FIELD_MESSAGE=
ATTIO_FIELD_CONSENT_TO_CONTACT=
```

Optional:

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

Rules:

- Never prefix `BUTTONDOWN_API_KEY`, `ATTIO_API_KEY`, provider URLs, CRM IDs, field mappings, or `FORM_STUB_MODE` with `PUBLIC_`.
- `SITE_URL` is not secret, but keep the plain `SITE_URL` name because Astro config reads it server-side.
- Never commit real secrets.
- Keep local `.env` and `.env.local` untracked.
- Use `FORM_STUB_MODE=true` only for local/dev stub testing.
- Do not use `FORM_STUB_MODE=true` for public production because it creates fake success and loses leads.

## Stub-Mode Forms

With `FORM_STUB_MODE=true` locally:

- Submit newsletter with a valid test email.
- Confirm success: `Thanks — you’re on the list.`
- Submit newsletter with an invalid email.
- Confirm a friendly validation error.
- Submit the Get Started form on `/contact` with required fields.
- Confirm success: `Thanks — I’ve got this. I’ll review your answers and get back to you soon.`
- Submit Get Started with missing required fields.
- Confirm friendly validation errors.
- Confirm server logs contain sanitised data only.
- Confirm no data is sent to Buttondown or Attio.

## Missing-Config Safety

With `FORM_STUB_MODE=false` and no provider keys:

- Submit newsletter.
- Confirm `503` or the visible unavailable message.
- Submit Get Started enquiry.
- Confirm `503` or the visible unavailable message.
- Confirm neither route returns a success message.
- Confirm server logs do not include secrets, full email addresses, or full enquiry messages.

Safe unavailable message:

```text
This form is not available yet. Please contact Aidan directly for now.
```

## Honeypot Checks

Use a manual request tool such as `curl` and include `website=bot`.

- POST `/api/subscribe` with a valid email and filled `website`.
- Confirm Buttondown is not called.
- POST `/api/enquiry` with valid required fields and filled `website`.
- Confirm Attio and Buttondown are not called.
- Confirm both responses are safe/friendly errors.

## UTM And Source Capture

- Open `http://localhost:4321/contact?utm_source=private-test&utm_medium=manual&utm_campaign=preprod&utm_term=forms&utm_content=checklist`.
- Submit a stub Get Started enquiry.
- Confirm hidden attribution appears in sanitised server logs.
- Navigate to another page in the same session.
- Submit newsletter.
- Confirm stored UTM fields are retained where expected.

## RSS And Sitemap

- Confirm `/rss.xml` includes published posts only.
- Confirm sitemap output uses the configured `SITE_URL`.
- Confirm `https://example.com` appears only when `SITE_URL` is missing or placeholder.
- Treat placeholder RSS/sitemap URLs as safe for local builds but a public-launch blocker.

## Buttondown Real-Key Test

Use a real Buttondown API key only in local/private environments.

Required:

```env
FORM_STUB_MODE=false
BUTTONDOWN_API_KEY=
SITE_URL=
```

Optional:

```env
BUTTONDOWN_API_BASE_URL=
BUTTONDOWN_API_VERSION=
```

Checklist:

- Submit newsletter with a fresh test email you control.
- Confirm the form shows `Thanks — you’re on the list.`
- Confirm Buttondown has the subscriber.
- Confirm metadata/source/UTMs are present if supported: `first_name`, `last_name`, `source`, `source_page`, UTM fields, and `signup_origin`.
- Submit the same email again.
- Confirm duplicate handling returns success and does not forcibly resubscribe an unsubscribed person.
- Submit an invalid email and confirm validation fails before Buttondown is called.
- Test honeypot if possible by submitting `website=bot` manually.
- Confirm no coaching enquiry message, phone, health, injury, medical, medication, or mental-health data is sent to Buttondown.

## Attio Real-Key Test

Follow `docs/attio-setup.md` first.

Create/configure an Attio API key with these scopes:

- `record_permission:read-write`
- `object_configuration:read`
- `list_entry:read-write`
- `list_configuration:read`

Required:

```env
FORM_STUB_MODE=false
ATTIO_API_KEY=
ATTIO_COACHING_ENQUIRIES_LIST=
SITE_URL=
```

Recommended field mappings for the private test:

```env
ATTIO_FIELD_STAGE=
ATTIO_FIELD_SUBMITTED_AT=
ATTIO_FIELD_MAIN_INTEREST=
ATTIO_FIELD_MESSAGE=
ATTIO_FIELD_CONSENT_TO_CONTACT=
```

Checklist:

- Create or identify the Coaching Enquiries list.
- Configure required list field mappings for the values you want to inspect.
- Submit Get Started with a test email.
- Confirm the form shows `Thanks — I’ve got this. I’ll review your answers and get back to you soon.`
- Confirm Attio created or updated a Person by email.
- Confirm Attio created/asserted the Coaching Enquiries list entry.
- Confirm stage is `New enquiry` if `ATTIO_FIELD_STAGE` is configured.
- Confirm message, source page, UTMs, and qualification summary are captured according to configured fields.
- If detailed qualification mappings are blank, confirm the qualification summary is present in `ATTIO_FIELD_MESSAGE` or `ATTIO_FIELD_STATUS_NOTES` when either field is configured.
- Submit the same email again and inspect whether Attio updates/asserts the list entry safely.
- Test missing optional fields and confirm the enquiry still succeeds.
- Confirm no detailed medical information, injury history, medication information, diagnosis, mental-health information, or PAR-Q style data is intentionally collected or routed.

## Enquiry Newsletter Opt-In Test

With Attio configured and Buttondown configured:

- Submit Get Started with `newsletterOptIn` checked.
- Confirm Attio succeeds.
- Confirm Buttondown receives only newsletter-safe fields: email, first name, last name, source page, and UTMs.
- Confirm Buttondown does not receive the coaching message, qualification answers, phone, location, referral source, or social handle.
- Temporarily remove `BUTTONDOWN_API_KEY` in a private test environment and redeploy.
- Submit another opt-in enquiry.
- Confirm Attio still succeeds.
- Confirm the public response is still enquiry success.
- Confirm server logs show only a sanitised Buttondown opt-in skip/failure.

## Posts And Drafts

- Confirm `/posts` shows published posts only.
- Confirm `/writing` redirects or safely resolves to `/posts`.
- Confirm at least one individual published post route works.
- Confirm `src/content/writing/draft-example.mdx` does not render publicly.
- Confirm draft posts are absent from `/rss.xml` and sitemap output.

## Safe Disable / Rollback

To safely disable real form handling:

- Remove `BUTTONDOWN_API_KEY` and redeploy to make `/api/subscribe` return the unavailable message in non-stub production.
- Remove `ATTIO_API_KEY` or `ATTIO_COACHING_ENQUIRIES_LIST` and redeploy to make `/api/enquiry` return the unavailable message in non-stub production.
- If the deployment is public, keep or add a visible direct contact path before disabling provider keys so leads are not stranded.
- Roll back the deployment in Vercel if provider calls fail unexpectedly.
- Do not use `FORM_STUB_MODE=true` as a public fallback.

## Final Human Check

- Read the Get Started form warning out loud.
- Confirm the form still does not ask for detailed medical information.
- Confirm privacy and terms drafts are acceptable for the private test audience only.
- Confirm starter posts and service copy are ready for the intended review audience.
- Confirm any test data created in Buttondown or Attio is labelled or removed after testing.
