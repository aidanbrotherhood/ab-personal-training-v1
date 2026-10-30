# AB Personal Training — React Router landing-page preview

This is the new AB Personal Training site built with React Router v8, TypeScript and Cloudflare Workers. Source code lives in `web/` on branch `ab-react-router-landing`, separate from the previous Astro site on `main`.

## Run and verify

```bash
cd web
npm install
npm run cf-typegen
npm run typecheck
npm run build
npm run dev
```

## Deployment

Use Cloudflare Workers Builds, root directory `web/`, build command `npm run build`, deploy command `npx wrangler deploy`, or deploy using authenticated Wrangler. Worker target: `ab-personal-training-preview`.

Do **not** switch aidanbrotherhood.com until preview QA is complete. The live Webflow and email DNS records remain unchanged.

## Base offer

- PT Introduction £99 one-off: two 60-minute sessions.
- Weekly Coaching £180 per four-week block: four sessions, programme and regular support.
- Complete Coaching £320 per four-week block: eight sessions, programme, practical nutrition coaching and check-ins.
- Optional twelve-week pathway: three independent £320 blocks (£960 total), without 12-week commitment.
- Free PT consultation: separate from the £99 package.
- Independent delivery at JD Gyms Renfrew; gym membership required.

## Before paid traffic

Consultation CTA currently opens an email request, not a calendar. Configure and test booking and confirmation before launching ads. Add a real portrait, verified professional details, final privacy/terms, analytics consent, and audit legacy URL redirects. Site is intentionally noindex during preview.
