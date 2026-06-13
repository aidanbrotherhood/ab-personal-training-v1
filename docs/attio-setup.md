# Attio Setup

Phase 4B makes `/api/enquiry` production-operational when Attio is configured.

This integration does not create Attio lists, attributes, stages, or custom objects automatically. Create the CRM shape manually in Attio, then map the relevant list fields with environment variables.

For private deployment steps and Vercel environment variable setup, use `docs/private-deployment.md`.

## Required API Access

Create an Attio API key for the workspace and give it these scopes:

- `record_permission:read-write`
- `object_configuration:read`
- `list_entry:read-write`
- `list_configuration:read`

Set:

```env
ATTIO_API_KEY=
ATTIO_COACHING_ENQUIRIES_LIST=
```

Never commit the API key, and never create a `PUBLIC_ATTIO_API_KEY`.

`ATTIO_API_BASE_URL` can normally stay empty. The code defaults to `https://api.attio.com/v2`.

## Coaching Enquiries List

Create a list called:

```text
Coaching Enquiries
```

Use the Attio list slug or UUID as:

```env
ATTIO_COACHING_ENQUIRIES_LIST=
```

Attio’s list-entry endpoint accepts a list UUID or slug. If you are unsure, use the UUID from the list URL or Attio developer/API settings.

## Suggested Stages

Create a status/stage field for the list with these stages:

- New enquiry
- Replied / contacted
- Consult offered
- Consult booked
- Consult completed
- Trial/session booked
- Converted
- Nurture
- Lost / not now

Map it with:

```env
ATTIO_FIELD_STAGE=
```

The integration writes `New enquiry`. If the stage title does not exist in Attio, Attio will reject the request rather than create the stage automatically.

## Suggested Fields

Create list fields for the enquiry-specific data you want to retain:

- Stage: status
- Submitted at: timestamp
- Main interest: select or text
- Message: long text/text
- Primary goal: text
- Service preference: select or text
- Current training level: select or text
- Gym confidence: select or text
- Current routine: select or text
- Biggest barrier: select or text
- Preferred coaching format: select or text
- Availability: select or text
- Start timeline: select or text
- Location: text
- Preferred contact method: select or text
- Referral source: text
- Social handle: text
- Newsletter opt-in: checkbox
- Source page: text
- UTM source: text
- UTM medium: text
- UTM campaign: text
- UTM term: text
- UTM content: text
- Consent to contact: checkbox
- Status notes: long text/text, optional fallback summary

Map each field with its Attio attribute slug or attribute ID:

```env
ATTIO_FIELD_STAGE=
ATTIO_FIELD_SUBMITTED_AT=
ATTIO_FIELD_MAIN_INTEREST=
ATTIO_FIELD_MESSAGE=
ATTIO_FIELD_PRIMARY_GOAL=
ATTIO_FIELD_SERVICE_PREFERENCE=
ATTIO_FIELD_CURRENT_TRAINING_LEVEL=
ATTIO_FIELD_GYM_CONFIDENCE=
ATTIO_FIELD_CURRENT_ROUTINE=
ATTIO_FIELD_BIGGEST_BARRIER=
ATTIO_FIELD_PREFERRED_COACHING_FORMAT=
ATTIO_FIELD_AVAILABILITY=
ATTIO_FIELD_START_TIMELINE=
ATTIO_FIELD_LOCATION=
ATTIO_FIELD_PREFERRED_CONTACT_METHOD=
ATTIO_FIELD_REFERRAL_SOURCE=
ATTIO_FIELD_SOCIAL_HANDLE=
ATTIO_FIELD_NEWSLETTER_OPT_IN=
ATTIO_FIELD_SOURCE_PAGE=
ATTIO_FIELD_UTM_SOURCE=
ATTIO_FIELD_UTM_MEDIUM=
ATTIO_FIELD_UTM_CAMPAIGN=
ATTIO_FIELD_UTM_TERM=
ATTIO_FIELD_UTM_CONTENT=
ATTIO_FIELD_CONSENT_TO_CONTACT=
ATTIO_FIELD_STATUS_NOTES=
```

If a field mapping is blank, that field is not sent to Attio. The code still creates or updates the Person and asserts the list entry when the minimum required config is present.

For a private live test that proves field capture, map at least:

- `ATTIO_FIELD_STAGE`
- `ATTIO_FIELD_SUBMITTED_AT`
- `ATTIO_FIELD_MAIN_INTEREST`
- `ATTIO_FIELD_MESSAGE`
- `ATTIO_FIELD_CONSENT_TO_CONTACT`

For a production-ready coaching flow, also map any optional fields you genuinely want to inspect, such as source page, UTMs, newsletter opt-in, qualification fields, and status notes.

Qualification fallback summary:

- The Get Started form posts to the existing `/api/enquiry` route with `enquiryType=qualification`.
- `ATTIO_FIELD_MESSAGE`, when configured, receives the user's free-text answer plus a compact summary of qualification fields.
- `ATTIO_FIELD_STATUS_NOTES`, when configured, also includes the qualification summary.
- The detailed `ATTIO_FIELD_PRIMARY_GOAL`, `ATTIO_FIELD_SERVICE_PREFERENCE`, `ATTIO_FIELD_CURRENT_TRAINING_LEVEL`, `ATTIO_FIELD_GYM_CONFIDENCE`, `ATTIO_FIELD_CURRENT_ROUTINE`, `ATTIO_FIELD_BIGGEST_BARRIER`, `ATTIO_FIELD_PREFERRED_COACHING_FORMAT`, `ATTIO_FIELD_AVAILABILITY`, and `ATTIO_FIELD_START_TIMELINE` mappings are optional. Leaving them blank does not fail the enquiry.

If you choose select/status fields, create Attio options that exactly match the website form values. The stage value written by the integration is `New enquiry`.

## What The Integration Does

When `/api/enquiry` receives a valid non-stub submission:

1. Upserts a Person in Attio using `email_addresses` as the matching attribute.
2. Writes safe person-level values: name, email, and phone only when the phone number is already in E.164 format.
3. Asserts a list entry in the configured Coaching Enquiries list for that Person.
4. Writes configured list-entry fields only.
5. Returns success only after Attio succeeds.

If the same Person enquires again, Attio’s list-entry assert endpoint updates the existing list entry for that parent record. If multiple entries already exist for the same parent record, Attio can return a multiple-match error.

If `ATTIO_API_KEY` or `ATTIO_COACHING_ENQUIRIES_LIST` is missing while `FORM_STUB_MODE=false`, `/api/enquiry` returns the safe unavailable message instead of pretending the lead was captured.

## Newsletter Opt-In

If `newsletterOptIn` is checked and Attio succeeds, `/api/enquiry` can also call Buttondown.

Buttondown receives only newsletter-safe fields:

- email
- first name
- last name
- source page
- UTM fields

Buttondown does not receive:

- coaching enquiry message
- qualification form answers
- phone number
- location
- main interest
- referral source
- social handle
- medical, injury, medication, or mental health information

If Buttondown is missing or fails after Attio succeeds, the enquiry still succeeds and the server logs a sanitised warning.

## Sensitive Data Warning

Do not use the public enquiry or Get Started qualification form as a health record, PAR-Q, medical screening, injury intake, medication history, diagnosis intake, or mental health intake.

The forms warn users not to include detailed medical information. Keep that warning visible. Any appropriate screening should happen separately after coaching fit is established.

Do not create Attio fields intended to store detailed medical, injury, medication, mental health, or PAR-Q data from this public form.
