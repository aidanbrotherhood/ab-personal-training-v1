# Owner evidence, measurement and release requirements

Implementation decision record, 2 November 2026. Read alongside the original specification and the owner's implementation instruction. This document is internal; it is not commercial terms or a published website page.

## Publication decisions

Seven completed routes are published: `/`, `/personal-training-renfrew`, `/coaching`, `/about`, `/personal-training-for-beginners`, `/consultation`, `/privacy`.

The P2 beginner page passes its limited content gate: it distinguishes the actual free consultation from paid Starter, describes only existing package support and consultation information, and states the current non-member contact instruction. It does not claim a specific first-session routine, meeting point, assessment protocol or progression method. No qualifications or client outcomes were added to fill gaps.

Strength and fat-loss support are substantial sections of `/coaching`. Standalone goal and neighbouring-city pages remain absent, unlinked and outside sitemap/schema. The home slogan is preserved as its H1 under the owner's creative override. About uses the verified identity and existing approach, without a fictional biography or placeholder portrait. No content, redirect or configuration change concerns `practice.aidanbrotherhood.com`.

## Genuine owner decisions before publishing final terms

`/terms` has no route, navigation link, schema entity or sitemap entry. Obtain explicit decisions and an appropriate legal review where needed before publishing:

- Payment methods, payment due date and when a four-week block begins.
- Whether/how blocks renew, how clients agree to another block and how prices may change. Do not imply automatic renewal.
- Notice needed to cancel/reschedule a paid session, late arrival and non-attendance handling, and coach cancellation.
- Refunds, unused sessions, block/session expiry, pauses and exceptions; include applicable statutory consumer rights.
- Any minimum age, eligibility or onboarding conditions actually used, and the contracting/trader details required for the actual service.
- Which policy applies to a free consultation versus paid coaching. Existing Calendly change/cancel links are not a published paid-session policy.

These decisions block final terms, not the completed website/staging release. Existing approved facts remain visible: Starter £99 one-off / two sessions; Coaching £180 / four weeks / four sessions; Coaching+ £320 / four weeks / eight sessions; separate gym membership; no 12-week minimum; free consultation with no purchase obligation.

Keep the non-member instruction unchanged until the owner and venue approve a reliable access procedure. An exact meeting point or reception instruction should only be added when confirmed. No gym opening hours, parking promise or travel time has been invented.

## Evidence that would strengthen later content (not release blockers)

- Authentic current portrait of Aidan and permissioned photographs of the actual training venue/coaching. Obtain venue and identifiable-person permission. The current home image is existing illustrative stock, labelled as such; no fake portrait, client or transformation imagery.
- Exact qualification title, awarding body, date/current status and evidence if credentials are to be published. No qualification is currently claimed.
- Owner-approved personal story and genuinely used coaching examples or processes. No invented years, client numbers, specialisms or medical/rehabilitation expertise.
- Authentic testimonials/case studies with publication permission and accurate context if later available. No reviews or review schema are fabricated now.
- Confirm any owner-selected retention/review schedule and privacy arrangements before changing the existing notice. No new tracking or processor has been introduced by this implementation.

## Measurement: what counts

| Stage | Current foundation | Authoritative evidence / future work |
| --- | --- | --- |
| Consultation CTA click | Ephemeral `consultation_cta_clicked`, page, placement, optional package ID | Intent signal only; not a lead/booking. No reporting sink currently installed. |
| Booking destination visit | Hydrated `booking_destination_viewed` | Page view only; no unique-person attribution, sessions or persistent identifiers. |
| Calendly engagement | Exact-origin/frame messages: calendar viewed / time selected | Engagement only; iframe load is not a booking. Direct-tab bookings cannot be observed by this code. |
| Client completion signal | `booking_completed_client_signal`, no provider payload | Diagnostic only. It can be missing/repeated and must not drive a confirmed-booking counter. |
| Provider-confirmed booking | No new integration | Reconcile actual Calendly scheduled/cancelled records using authorised account access/export. Deduplicate by provider booking ID; exclude owner tests, cancellations/reschedules and duplicate invites according to an agreed definition. |
| Attendance | No fabricated automation | Owner records attended/no-show/cancelled against the appointment. |
| Paying client | No checkout or revenue automation | Genuine paid coaching record reconciled by owner, separate from attendance/interest. |

No cookies, localStorage, sessionStorage, advertising IDs, full referrers, provider payloads, names/emails or medical details are emitted by the new measurement module. No analytics vendor, webhook, provider token or new D1 flow was added. Browser events cease at navigation and are not historical reporting. The dormant enquiry system's server-confirmed persistence remains distinct from Calendly appointments.

Before adding reporting: agree necessary questions, consent/lawful-basis and retention decisions; choose an explicitly justified reporting method; review vendor/processor terms; minimise data; exclude staging/owner tests; document deduplication and cancellation semantics. Provider webhooks/API need separate permission, authenticated server verification, secret management and privacy review. Do not repurpose a client-side signal as provider proof.

## Search Console and discovery after approved production launch

Search Console already exists under the owner's account. Lack of access in the audit account is not a build blocker. With the correct property/account:

1. Submit/refresh `https://aidanbrotherhood.com/sitemap.xml`; confirm the seven intended published URLs are discovered and not blocked. Never submit staging.
2. Inspect `/`, the Renfrew page, coaching, about, beginner and consultation URLs. Check rendered crawlable content, last crawl, indexing reason and Google-selected canonical versus declared self-canonical.
3. Review Pages indexing, HTTPS/canonical duplicates, Crawl Stats, Security Issues, Manual Actions and any historical removals. Check the evidence's old `/writing`, newsletter and post URLs; keep genuine retired content 404/410 unless a genuinely equivalent replacement is identified. Do not redirect all old URLs home.
4. Inspect legacy inbound links/traffic for useful equivalents and monitor real query/page data. Correct retained public profiles/directory links when authorised. Do not change `practice.aidanbrotherhood.com`.
5. Assess Google Business Profile eligibility/ownership under Google's shared-venue/practitioner rules with venue permission and real business evidence. Do not imply website schema establishes eligibility; do not create duplicate AB/Aidan profiles or fictitious locations.
6. Review Googlebot and OAI-SearchBot access from actual available server/bot-policy evidence. A request using a crawler user-agent proves only that request, not genuine crawler-IP access. Robots permission, valid schema and indexing do not guarantee Search/Maps/AI placement.
7. Review suitable consultations, attendance and paid clients after 8–12 weeks, alongside actual queries and referral evidence. Publish more pages only for distinct visitor value, not a word-count or keyword-volume target.

## Separate production release gate

The develop-to-main PR must remain unmerged until explicit current-task production approval. Verify its diff and reviewed staging SHA; merge normally so the existing production build guard can validate it. Do not deploy a staging artifact to production.

After that separately authorised merge, verify Cloudflare main commit/version, production bindings/secret names/cron/domains and canonical HTTP/www/slash behaviour. Confirm XML includes exactly the published manifest, robots permits discovery and no production page is accidentally noindex. Validate JSON-LD with the external tools where available. The compiled-Worker tests prove the intended production response, not an already-deployed production change.

Check the real Calendly iframe and direct/email alternatives at narrow widths through date/time/details, its cookie choices, keyboard behaviour and cancellation links. Do not complete a genuine booking without explicit authorisation. The disabled staging preview deliberately cannot certify the provider UI or appointment notifications. Keep the existing live event destination and scheduling setup.
