# Google Analytics setup — 3 November 2026

## Current state

The GA4 account and web stream are created under the existing Google account `hello@aidanbrotherhood.com`. The owner approved the UK Analytics Terms of Service and Data Processing Terms in this chat before acceptance. The owner separately approved two-month user retention with the activity reset disabled.

- Analytics account: `AB Personal Training`, ID `414524283`.
- Property: `aidanbrotherhood.com`, ID `562058108`.
- Web stream: `AB Personal Training website`, ID `16264920429`, URL `https://aidanbrotherhood.com`.
- Measurement ID: `G-NY57FTV5MZ`.
- Saved property details: United Kingdom reporting location/timezone, GBP, Beauty & Fitness, 1–10 employees, lead-generation and website-traffic objectives.
- All four optional account data-sharing options were off in the creation form; the dashboard confirms benchmarking off. Optional marketing email preferences were saved off.
- Enhanced Measurement was verified on after stream creation, then explicitly turned off and confirmed in the saved stream. This implementation owns pageviews and excludes automatic form/link/search/scroll measurement.
- Google signals and user-provided-data collection remain off (their settings show “Turn on”). No Ads links or remarketing setup were added.
- Event retention: two months. User retention: two months, activity-based reset off; saved in the property after owner approval.

The real ID is configured only in `web/wrangler.jsonc` under `env.production.vars.GA_MEASUREMENT_ID`. Staging has no real Analytics ID. Production has not been deployed or promoted by this work. GA receipt remains unverified until the approved production installation is exercised.

## Implementation and validation

The feature is reconciled with production source `349629d4a01293427fe7278e102c5111bb7acb11`, preserving the current navigation, grouped footer and newer published pages. Tests use canonical `/pricing`; existing strength, movement-assessment and approach CTA placements are included.

- Type generation, TypeScript and 33 unit tests passed with the real production binding configured.
- Staging and production builds each passed 14 compiled-Worker tests; both environment artifact guards passed. Existing legacy Astro base-config and experimental SQLite warnings remain.
- Local browser QA used synthetic ID `G-TEST12345` and staging flags, with no real Google collection. Desktop banner measured at 1707 × 960 CSS pixels; narrow layout measured at 391 × 844, with no horizontal overflow. Equal accept/reject controls fit inside the viewport.
- Rejection hides the banner; footer settings reopens it; acceptance survives reload; withdrawing consent reloads and remembers rejection. No Google script appeared on the local origin before consent, after acceptance or after withdrawal. Local/preview origin gates remain active.
- Unit tests cover consent expiry, malformed/future consent, personal/unknown payload rejection, preview-host blocking, sanitized manual pageviews, duplicate suppression, withdrawal and cookie deletion. These mock the vendor queue and do not establish Google receipt.
- Provider baseline verified separate staging D1, false index/notification flags, no secret, no cron and no domains. Production retains its D1, Resend secret name, true flags, domains and five-minute cron. Production baseline version is `1ad72e3e-263f-4ea6-842b-58ccf78be7b0`.

## Data and consent behaviour

- Basic consent mode: no Google script or collection before analytics acceptance. Advertising consent stays denied.
- Page locations exclude query strings/fragments; referrers are reduced to origins. This initial integration does not attribute UTM campaigns or advertising click IDs.
- Only published page paths, known events, known placements and package IDs are forwarded. No personal booking/enquiry payloads are forwarded.
- `booking_completed_client_signal` is diagnostic only; it is never a confirmed booking, attendance or sale. Real bookings require provider reconciliation.
- Consent lasts six months. Footer settings permits withdrawal; withdrawal disables collection, clears Analytics cookies and reloads to remove vendor code.
- Calendly remains separate and has its own privacy choices. No real booking or enquiry is submitted for QA.

## Release gates

1. Merge feature PR #25 into `develop`; verify the exact staging SHA and Cloudflare build/version.
2. Check staging routes, noindex, empty real Analytics binding, no Google tag, disabled calendar, separate D1 and no notifications/secrets/cron/domains.
3. Open a `develop` → `main` promotion PR with staging SHA and evidence. Obtain explicit production promotion approval under root AGENTS.md after staging review; merge normally only after that approval.
4. After promotion, verify the active production SHA/version and correct binding, consent banner, no Google requests/cookies before acceptance or after rejection, one sanitized pageview per page and allowlisted CTA collection after consent, withdrawal and GA4 Realtime receipt. Do not create a real booking.
5. Record actual live evidence here. Build and local checks alone do not certify installation or Google receipt.

## References

- [Google Analytics setup](https://support.google.com/analytics/answer/9304153)
- [Basic consent mode](https://developers.google.com/tag-platform/security/concepts/consent-mode)
- [Manual pageviews and duplicate prevention](https://developers.google.com/analytics/devguides/collection/ga4/views)
- [Enhanced Measurement controls](https://support.google.com/analytics/answer/9216061)
