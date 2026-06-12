# Aidan Brotherhood Coaching

V1 website foundation for Aidan Brotherhood: a calm, minimal Astro site for coaching, health, and writing.

The site is intentionally simple and file-based for now. There is no auth, database, payments, booking system, analytics provider, CMS, client dashboard, or payment/booking logic.

## Status

- Technically ready for private Vercel deployment testing with real Buttondown and Attio credentials.
- Not ready for public launch until real credentials, final content, and privacy/terms/legal copy are tested and replaced.
- Stub mode is local/dev only; do not use it for public production forms.

## Deployment Docs

- `docs/private-deployment.md`: private Vercel deployment and live integration test guide.
- `docs/pre-production-checklist.md`: QA checklist for forms, RSS/sitemap, and safe fallback behaviour.
- `docs/attio-setup.md`: Attio API key, list, stage, and field-mapping setup.

## Run Locally

```bash
npm install
npm run dev
```

Astro usually serves the site at `http://localhost:4321`.

Useful commands:

```bash
npm run check
npm run build
npm run preview
```

Use Node 24 for local and Vercel parity. The project includes `.nvmrc` and `package.json` engines for this because Vercel Serverless Functions use Node 24 for this site.

## Environment

RSS and sitemap generation need a site URL.

For local stub testing, copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

For deployment planning, use `.env.example` as the Vercel environment variable checklist.

`SITE_URL` currently falls back to `https://example.com` as a placeholder. Replace it with the private deployment URL for private testing and the real production URL before launch so RSS links and `sitemap-index.xml` are correct.

`FORM_STUB_MODE=true` makes the newsletter and coaching forms validate successfully and log a sanitised payload to the server console. This is useful for local testing only.

Do not deploy public forms with `FORM_STUB_MODE=true`; that creates fake success and loses leads.

Newsletter signup can send validated subscribers to Buttondown when `FORM_STUB_MODE` is not `true` and `BUTTONDOWN_API_KEY` is configured. If Buttondown is not configured, `/api/subscribe` returns a safe unavailable response so newsletter leads are not silently dropped.

Coaching enquiry can send validated submissions to Attio when `FORM_STUB_MODE` is not `true`, `ATTIO_API_KEY` is configured, and `ATTIO_COACHING_ENQUIRIES_LIST` points at the correct Attio list. If Attio is not configured, `/api/enquiry` returns a safe unavailable response so leads are not silently dropped.

Environment variables:

- `SITE_URL`: required before production so RSS and sitemap URLs are correct.
- `FORM_STUB_MODE`: set to `false` for private live integration tests; set to `true` only for local/dev stub testing without external calls.
- `BUTTONDOWN_API_KEY`: required for production newsletter signup.
- `BUTTONDOWN_API_BASE_URL`: optional; defaults to `https://api.buttondown.com/v1`.
- `BUTTONDOWN_API_VERSION`: optional; when empty, Buttondown uses the API key pinned/default version.
- `ATTIO_API_KEY`: required for production coaching enquiries.
- `ATTIO_API_BASE_URL`: optional; defaults to `https://api.attio.com/v2`.
- `ATTIO_COACHING_ENQUIRIES_LIST`: required Attio list slug or UUID.
- `ATTIO_FIELD_*`: optional Coaching Enquiries list field mappings.

Never commit real API keys or secrets. Do not prefix any provider key, provider URL, CRM/list/field mapping, `FORM_STUB_MODE`, or `SITE_URL` variable with `PUBLIC_`; this project reads them server-side.

## Project Structure

```text
src/
  components/
    cards/
    forms/
    layout/
    sections/
    seo/
  content/
    writing/
  layouts/
  lib/
  pages/
  styles/
```

- `src/content/writing/` stores Markdown/MDX writing entries.
- `src/content.config.ts` defines the Astro 6 content collection schema.
- `src/lib/writing.ts` contains small helpers for published posts, featured posts, dates, slugs, and post paths.
- `src/pages/writing.astro` renders the public archive.
- `src/pages/writing/[slug].astro` generates individual published posts.
- `src/pages/rss.xml.ts` generates `/rss.xml` from published writing only.
- `src/layouts/PostLayout.astro` renders article pages with metadata, tags, MDX content, and a newsletter form.
- `src/components/forms/` contains reusable newsletter and coaching enquiry forms.
- `src/pages/api/subscribe.ts` validates newsletter submissions and sends to Buttondown only when configured.
- `src/pages/api/enquiry.ts` validates coaching submissions and sends to Attio only when configured.
- `src/lib/attio.ts` contains the server-only Attio coaching enquiry helper.
- `src/lib/buttondown.ts` contains the server-only Buttondown subscriber helper.
- `src/lib/validation.ts` defines Zod schemas for form validation.
- `src/lib/utm.ts` captures source page and UTM parameters into hidden form fields.
- `docs/attio-setup.md` explains the required Attio list and field setup.
- `docs/pre-production-checklist.md` contains the private deployment QA checklist.
- `docs/private-deployment.md` explains private Vercel deployment, env vars, real Buttondown/Attio testing, and safe rollback.

## Adding A Writing Post

Create a new `.md` or `.mdx` file in `src/content/writing/`.

Example:

```md
---
title: Example post title
slug: example-post-title
description: A short summary used in archives, SEO, and RSS.
excerpt: Optional shorter archive teaser.
publishedDate: 2026-06-12
status: draft
featured: false
tags:
  - training
  - health
category: Notes
sendAsNewsletter: false
---

Write the post here.
```

Required frontmatter:

- `title`
- `description`
- `publishedDate`

Recommended frontmatter:

- `status`: use `draft` while working, `published` when public.
- `slug`: optional, but recommended for clean stable URLs.
- `tags`: defaults to an empty list.
- `featured`: defaults to `false`.

Optional publishing/SEO fields:

- `excerpt`
- `updatedDate`
- `category`
- `coverImage`
- `seoTitle`
- `seoDescription`
- `newsletterSubject`
- `newsletterPreviewText`
- `sendAsNewsletter`
- `buttondownDraftId`
- `canonicalUrl`

## Drafts And Published Posts

- Posts with `status: draft` are not rendered publicly.
- Drafts are excluded from `/writing`, individual static routes, `/rss.xml`, and sitemap output.
- Posts with `status: published` are sorted newest first by `publishedDate`.

## Featured Posts

- Set `featured: true` to show a post in the featured section on `/writing`.
- The homepage shows up to three featured published posts.
- If fewer than three featured posts exist, the homepage falls back to the latest published posts.

## RSS And Sitemap

- `/rss.xml` is generated from published writing only.
- The Astro sitemap integration is enabled and uses `SITE_URL`.
- Keep `SITE_URL=https://example.com` only for local scaffolding; change it before production.

## Forms

The frontend forms are deliberately small and progressive:

- Newsletter signup posts to `/api/subscribe`.
- Coaching enquiry posts to `/api/enquiry`.
- Both routes accept form data or JSON.
- Both routes validate with Zod.
- Both routes reject honeypot submissions.
- Both routes capture `sourcePage` and UTM fields.
- Neither route sends data to email, analytics, or a database.
- `/api/enquiry` sends to Attio only after validation and only when configured.
- `/api/enquiry` calls Buttondown for `newsletterOptIn` only after Attio succeeds.

The coaching enquiry form intentionally does not collect medical, injury, medication, mental health, or PAR-Q style data. Any relevant screening should happen separately after coaching is deemed appropriate.

### Attio Coaching Enquiry Integration

When `FORM_STUB_MODE` is not `true`, `/api/enquiry` requires:

```env
ATTIO_API_KEY=
ATTIO_COACHING_ENQUIRIES_LIST=
```

The Attio API key needs these scopes:

- `record_permission:read-write`
- `object_configuration:read`
- `list_entry:read-write`
- `list_configuration:read`

The route:

- upserts a Person using `email_addresses` as the matching attribute;
- writes safe person-level values: name, email, and E.164 phone numbers only;
- asserts a Coaching Enquiries list entry for that Person;
- writes only configured list-entry fields from `ATTIO_FIELD_*` env vars;
- returns success only after Attio succeeds.

Recommended setup is in `docs/attio-setup.md`.

Run the private deployment guide in `docs/private-deployment.md` and the checklist in `docs/pre-production-checklist.md` before testing real credentials.

Data sent to Attio:

- name and email;
- phone only if supplied in E.164 format, such as `+447777777777`;
- configured list fields for main interest, message, location, contact preference, referral source, social handle, newsletter opt-in, source page, UTMs, consent, stage, submitted time, and optional status notes.

Data intentionally not collected or structured:

- detailed medical information;
- injury histories;
- medication information;
- mental health information;
- PAR-Q or screening data.

If `ATTIO_API_KEY` or `ATTIO_COACHING_ENQUIRIES_LIST` is missing in non-stub mode, `/api/enquiry` returns:

```text
This form is not available yet. Please contact Aidan directly for now.
```

### Buttondown Newsletter Integration

When `FORM_STUB_MODE` is not `true` and `BUTTONDOWN_API_KEY` is present, `/api/subscribe` sends newsletter signups to Buttondown.

Data sent to Buttondown:

- `email_address`
- subscriber `metadata`: `first_name`, `source`, `source_page`, UTM fields, and `signup_origin`
- top-level `utm_source`, `utm_medium`, and `utm_campaign` when present

Data intentionally not sent:

- coaching enquiry messages
- phone numbers
- health, injury, medical, medication, or mental health information
- anything from the coaching enquiry form

Duplicate subscribers:

- The route first tries to create a Buttondown subscriber.
- If Buttondown reports the subscriber already exists, the helper attempts a metadata-only `PATCH` to `/v1/subscribers/{email}`.
- It does not set subscriber `type`, does not bypass double opt-in, and does not forcibly resubscribe unsubscribed people.
- If the duplicate metadata update cannot be completed, the route still treats the existing subscriber as a safe success.

If `BUTTONDOWN_API_KEY` is missing in non-stub mode, `/api/subscribe` returns:

```text
This form is not available yet. Please contact Aidan directly for now.
```

### Test Newsletter Locally

Create `.env.local`:

```bash
cp .env.local.example .env.local
```

Make sure it includes:

```bash
FORM_STUB_MODE=true
```

Run:

```bash
npm run dev
```

Open `http://localhost:4321/?utm_source=local-test&utm_medium=manual&utm_campaign=forms` and submit the newsletter form with a valid email. You should see:

```text
Thanks — you’re on the list.
```

The dev server logs a sanitised stub payload. No data is sent anywhere.

### Test Newsletter With Buttondown

Use a real Buttondown API key only in local `.env.local` or private Vercel environment variables:

```bash
FORM_STUB_MODE=false
BUTTONDOWN_API_KEY=your_real_key_here
```

`BUTTONDOWN_API_BASE_URL` and `BUTTONDOWN_API_VERSION` can usually be left empty. Submit the newsletter form with a test email you control. On success, the form should show:

```text
Thanks — you’re on the list.
```

If the email already exists in Buttondown, the route attempts to update only subscriber metadata and returns the same success message.

When the coaching enquiry form has `newsletterOptIn` checked, Buttondown is called only after Attio succeeds. If Buttondown is not configured or fails, the enquiry still succeeds and the server logs a sanitised warning.

### Test Coaching Locally

Open `http://localhost:4321/coaching?utm_source=local-test&utm_medium=manual&utm_campaign=forms` and submit the coaching form with required fields completed. You should see:

```text
Thanks — I’ve got this. I’ll get back to you soon.
```

To test validation, submit an invalid email or omit required fields. To test safe production behaviour, set `FORM_STUB_MODE=false` or remove it without Attio config and submit again; the API will return:

```text
This form is not available yet. Please contact Aidan directly for now.
```

### Test Coaching With Attio

Follow `docs/attio-setup.md`, then set:

```bash
FORM_STUB_MODE=false
ATTIO_API_KEY=your_real_key_here
ATTIO_COACHING_ENQUIRIES_LIST=your_list_slug_or_id
```

Add `ATTIO_FIELD_*` mappings for the list fields you want to persist. For private live field-capture testing, map at least:

- `ATTIO_FIELD_STAGE`
- `ATTIO_FIELD_SUBMITTED_AT`
- `ATTIO_FIELD_MAIN_INTEREST`
- `ATTIO_FIELD_MESSAGE`
- `ATTIO_FIELD_CONSENT_TO_CONTACT`

Submit the coaching form with a test enquiry. On success, the form should show:

```text
Thanks — I’ve got this. I’ll get back to you soon.
```

## Implemented

- Astro + TypeScript + Tailwind foundation.
- MDX and Astro Content Collections.
- Production-quality file-based writing schema.
- Writing archive with featured posts, empty state, post cards, tags, and newest-first sorting.
- Individual post layout with dates, tags, MDX content, SEO metadata, canonical support, and newsletter form.
- Homepage writing hook that pulls from real content.
- RSS feed and sitemap generation.
- Newsletter signup and coaching enquiry frontend forms.
- Zod validation, honeypot checks, UTM/source capture, and safe stub API routes.
- Buttondown subscriber integration for `/api/subscribe` when configured.
- Attio Person/list-entry integration for `/api/enquiry` when configured.
- Vercel adapter for serverless Astro API routes.
- Private deployment guide and integration QA checklists.

## Intentionally Deferred

- Keystatic or any publishing UI.
- Authentication, dashboard, client portal, database, or custom backend.
- Stripe, Cal.com, payments, booking, and email notifications.
- Analytics such as Plausible.
- Newsletter draft publishing scripts.
- Medical/PAR-Q screening or health-record storage.
- Final brand copy, legal text, privacy language, and terms.

## Dependency Audit Notes

- `npm audit --omit=dev` currently reports high-severity advisories through the Astro/Vercel dependency chain.
- The suggested `npm audit fix --force` path would apply breaking dependency changes, so it has not been applied.
- Revisit this before public launch and prefer official non-breaking Astro/Vercel updates when available.

## Later TODOs

- Add final writing and delete placeholder seed posts.
- Replace legal placeholder pages before collecting personal data.
- Decide whether Keystatic should manage writing frontmatter and MDX.
- Configure real Attio list fields before production launch.
- Test real Attio and Buttondown keys in a private deployment before public launch.
- Complete `docs/pre-production-checklist.md` before any public deployment.
- Add email notification handling only if there is a clear operational need.
