# Google Analytics setup — 3 November 2026

Status: website integration prepared on `feature/google-analytics-consent`.
No Analytics account, property, stream or measurement ID has been created or verified.
Google browser access is unavailable while the owner's Mac is locked and browser access is disabled.
The owner confirmed that the Google account `hello@aidanbrotherhood.com` already exists; reuse it.
Production has not been changed by this work.

## Preparation checks

- TypeScript: passed.
- Unit tests: 31 passed, including consent expiry, unknown/personal payload rejection, preview-host blocking, sanitized pageviews, duplicate suppression, withdrawal and cookie deletion. These mock the browser/vendor queue and do not contact Google.
- Staging and production builds plus their artifact safety checks: passed. Compiled Worker routing tests also pass.
- React checklist: effects clean up listeners/vendor collection, server rendering has no Google tag, controls use native buttons and visible focus styles, accept/reject receive equal visual treatment.
- Existing legacy Astro base-config and experimental SQLite warnings remain. The first staging build could not write Wrangler's log outside the sandbox; build/tests succeeded. The production build used a temporary log path.
- Browser layout/network checks and GA4 receipt verification remain pending. No staging deployment or production promotion has been performed for this feature.

## Account and stream setup

1. Sign in at https://analytics.google.com using the existing business Google account. Inspect existing Analytics accounts/properties first to avoid duplicates.
2. If needed, create the Analytics account `AB Personal Training` and property `aidanbrotherhood.com`, with United Kingdom, Europe/London reporting timezone, GBP currency, and lead-generation objectives. Do not opt into optional data sharing, Google signals or advertising personalisation. The owner must approve the actual Analytics terms/data-processing agreement before acceptance.
3. Create or reuse the web stream for `https://aidanbrotherhood.com`. Disable Enhanced Measurement entirely. The site manually controls pageviews and allowlisted events. Automatic form, outbound-link, search, scroll and history measurement is outside the implementation and must remain off.
4. Use the minimum available event-data retention (normally two months); check the actual setting. Add no Ads links or remarketing audiences. Do not mark `booking_completed_client_signal` as a confirmed lead, booking, attendance or sale.
5. Record account/property/stream IDs and the real `G-…` measurement ID here after verification. Do not invent a placeholder production ID.

## Configuration and release

- Set the real public measurement ID in `web/wrangler.jsonc` only under `env.production.vars.GA_MEASUREMENT_ID`. Keep staging empty. The code reads this optional runtime binding and also requires the production flag and exact apex origin before loading Google.
- Consent gating follows Google's [basic consent mode](https://developers.google.com/tag-platform/security/concepts/consent-mode): no Google tag or network collection before acceptance. Advertising consent stays denied.
- Page locations exclude all query strings/fragments. Referrers are reduced to origins. Consequently this initial integration intentionally does not attribute UTM campaigns or advertising click IDs.
- Only published page paths, known event names, known placements and package IDs are forwarded. Personal booking/enquiry data is never forwarded. The existing Calendly iframe remains separate and has its own privacy choices.
- Privacy copy and browser consent UI are included in the feature branch. Confirm both against the actual property settings before release.
- Run TypeScript, unit tests and both environment builds/guards. Validate the banner at mobile/desktop widths, accept/reject, footer settings, withdrawal, cross-tab changes and returning consent.
- Merge into develop through a feature PR. Verify staging's deployed SHA, no Google requests even with synthetic opt-in, noindex, and existing environment isolation. Use synthetic test IDs only in local tests. Do not send staging traffic to the production property.
- Open a develop-to-main promotion PR with the staging SHA and evidence. Obtain explicit production promotion approval under root AGENTS.md before merging normally.
- After production promotion, test no Google requests/cookies before consent and after rejection. With consent, verify one sanitized page_view per page in the network and GA4 Realtime/DebugView. Verify an allowlisted CTA event and withdrawal; do not complete a real booking. Local mocks do not prove Google received events.

## References

- [Google Analytics setup](https://support.google.com/analytics/answer/9304153)
- [Manual pageviews and duplicate prevention](https://developers.google.com/analytics/devguides/collection/ga4/views)
- [Enhanced measurement controls](https://support.google.com/analytics/answer/9216061)
