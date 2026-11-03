# AB Personal Training: SEO, AI discovery, content architecture and consultation specification

**Audit date:** 2 November 2026, Europe/London. **Status:** specification only; website implementation and deployment are not authorised by this document.

**Business outcome:** acquire suitable local one-to-one personal training clients through free consultation bookings, attended consultations and paid coaching. Page count, impressions and AI mentions are supporting indicators.

## 1. Recommendation and scope

Build six useful commercial pages initially: `/`, `/personal-training-renfrew`, `/coaching`, `/about`, `/personal-training-for-beginners` and `/consultation`. Retain `/privacy` and add an owner-approved `/terms` page. Keep strength and fat-loss coaching as substantial sections of `/coaching` initially. Specifications for the two proposed standalone goal pages are included below, but they are conditional, not launch requirements.

The immediate priorities are the missing local URL in the served sitemap, consistent business identity, an accessible mobile navigation, a shorter path to booking, accurate gym-access information, and a reliable way to distinguish booked consultations from clicks. Google Business Profile eligibility and verification are at least as important as new website content for the Maps objective.

Retain the existing restrained visual direction, React Router SSR, Cloudflare Workers, offer system, contact details and independent relationship with JD Gyms. This is an information architecture and conversion improvement, not a redesign. Do not add generic articles, location variants, artificial authority claims, testimonials, programme outcomes or fabricated images of Aidan or clients.

### What was audited

- Read root [`AGENTS.md`](../../AGENTS.md) and [`web/ENVIRONMENTS.md`](../../web/ENVIRONMENTS.md) before repository work. The workspace was initially empty; cloned the specified repository and created a local documentation branch. No remote push, build, migration, merge or deployment was performed.
- Inspected `develop` at `9ce82e7d8a5e8c97f6565041f36a09b1e793e7ae` and fetched `main` at `ee45c4ff1a7f7910907a0fef1c4ea07b280c66f9`. Their tracked file contents were identical at audit time. This is source comparison, not verification of Cloudflare's deployed commit metadata.
- Inspected every registered React Router route, Worker routing, metadata, JSON-LD, shared navigation, pricing, booking components, enquiry attribution, deployment guards and environment configuration. Root Astro content was inspected as legacy evidence only.
- Made 34 read-only public URL checks, including production pages, unserved proposed/legacy routes, crawler resources, host variants, staging and the observed `practice` subdomain. Machine-readable evidence: [`http-audit-2026-11-02.json`](http-audit-2026-11-02.json), collected at 21:28 UTC. A further header check at 21:30 UTC confirmed the HTTP and www behaviour below.
- Checked all 28 distinct same-host links per page across the three live HTML pages, including fragment targets, with no failures. Five shared logo/favicon/social-card assets returned 200 with appropriate content types. Evidence: [`link-asset-audit-2026-11-02.json`](link-asset-audit-2026-11-02.json), collected at 21:41 UTC.
- Inspected the live mobile consultation journey through date selection, time selection and the final details form. No name/email was entered and **Schedule Event was not pressed**. No production enquiry, booking, notification or calendar event was created.
- Used live Google results and web search, opened competitor sites and reviewed official guidance. Google browser results were personalised UK results; they are a dated sample, not a rank tracker or a controlled Renfrew geo-grid.

### Evidence limits

The signed-in Google account could not access the Search Console domain property: the UI displayed “Oops, you don't have access to this property.” This does not establish whether another account owns it. Index coverage, Google-selected canonicals, query impressions/clicks, manual actions, security issues and historical traffic are therefore unverified. Google Business Profile ownership, eligibility evidence and performance were not authenticated. No keyword volumes, ranking positions, conversion rates, Core Web Vitals field measurements or backlink counts are claimed.

The browser reported an actual content viewport of approximately **377px**, with no document-wide horizontal overflow on the checked home view. Requested 390px/320px overrides did not produce independently verified distinct rendered widths, so this is one mobile-width inspection, not certification of those breakpoints or physical iOS/Android devices. Broader responsive and performance testing belongs to implementation QA.

A later link-check request using the default Python user-agent returned 403; repeating the bounded check with the same explicit audit user-agent used for the original crawl succeeded. The source of that rejection was not established. Googlebot/OAI-SearchBot user-agent checks also returned 200, but these observations do not certify access from genuine crawler IPs or rule out a hosting/bot-policy issue.

## 2. Existing route and technical audit

The active route list in `web/app/routes.ts` contains three HTML pages and two resource routes. The Worker additionally handles `/api/enquiry`, www redirection and duplicate crawler resources.

| Public route | Live response and current metadata | Assessment and action |
| --- | --- | --- |
| `/` | 200; title `Aidan Brotherhood \| Personal Training at JD Gyms Renfrew`; descriptive meta description; H1 `Get stronger. Stop guessing.`; index/follow; self-canonical | Clear offer and booking CTA, but brand/entity naming differs from the brief. The H1 lacks service/location context and the page repeats much of the local page. Give the home page a brand overview role and retain the current slogan as supporting copy. |
| `/personal-training-renfrew` | 200; title `Personal Trainer Renfrew \| 1:1 Coaching at JD Gyms \| Aidan Brotherhood`; unique description; H1 `Personal trainer in Renfrew.`; index/follow; self-canonical | Strongest existing local service page. Address, independence and membership distinction are explicit. It is internally linked but missing from the sitemap actually served. Reduce overlap with home and make this the location/visit decision page. |
| `/privacy` | 200; title `Privacy notice \| AB Personal Training`; unique description and H1; index/follow; self-canonical | Retain. Update to match the final booking/fallback/measurement behaviour. It describes an enquiry form that is not mounted on the live pages and contains inconsistent wording about when Calendly loads. |
| `/robots.txt` | 200 text/plain; wildcard `Allow: /`; advertises apex sitemap | Public production crawl access is permitted. The Worker response shadows a second implementation in `routes/robots.ts`. Consolidate both. |
| `/sitemap.xml` | 200 application/xml; **only `/` and `/privacy`** | Worker interception bypasses the route loader containing `/` and `/personal-training-renfrew`. P1 discovery defect, not proof of deindexing. |
| `/api/enquiry` | GET returns 405 and noindex; POST handler exists | Operational endpoint, not a landing page. Preserve validation, rate limiting, idempotency, durable storage and notification safeguards. No production POST was made. |
| Unmatched URL | Genuine HTTP 404; noindex/nofollow; no canonical; generic recovery content; no title | Correct status behaviour. Add a helpful error title and links to the local page/consultation, retaining 404. Do not convert unknown URLs into home-page 200 responses. |

Current home and local descriptions, internal hrefs and response headers are preserved in the evidence file. Both commercial pages include OG title/description, `og:type=website`, Twitter large-image card and global OG image/locale. Root has `lang=en-GB`, viewport, favicon, canonical and `og:url`; canonicals correctly drop campaign query strings on the tested home request. Global `og:site_name`, image alt text, accessible brand link and copyright use **Aidan Brotherhood Personal Training**, while `/privacy` identifies the trader as **Aidan Brotherhood trading as AB Personal Training**.

### Host, URL and indexing findings

- **HTTP apex does not redirect:** `http://aidanbrotherhood.com/` and a header request to the local route return 200, noindex, without an HTTPS canonical. HTTPS should be the permanent destination. Preserve paths and queries when redirecting; no DNS or mail changes are needed for the proposed application-level correction.
- **www is correct on the tested URL:** HTTP 308 points to the HTTPS apex with path and query intact. Preserve this behaviour and test combined scheme/host/slash variants for unnecessary chains.
- **Trailing-slash duplication:** `/personal-training-renfrew/` returns 200 and a separate self-canonical ending in `/`. Standardise non-root HTML URLs without a trailing slash and permanently redirect aliases. Do not canonicalise both forms to themselves.
- **Staging is excluded on observed public responses:** home 200 with meta and header noindex/nofollow and no canonical; robots disallows all; sitemap is 404/no-store with noindex. Production's `workers.dev` alias also returned noindex and no canonical. Preserve the explicit flag **and exact HTTPS apex origin** test.
- Existing Worker early returns for robots/sitemap bypass the common response-header code. A single response-finalisation path should preserve security headers and environment controls across resources, normal routes and errors without changing API semantics.
- Source is SSR (`ssr: true`); public service content, prices, metadata and JSON-LD were present in fetched HTML. Keep core content and navigation available before hydration. A third-party booking iframe is a conversion tool, not the source of indexable business information.

### Navigation and internal links

The home header links to `#approach`, `#about`, `#coaching`, the local route and `#consultation`. Local-page header/CTAs send users back to home anchors. The footer supplies both commercial routes, privacy, email, Instagram and WhatsApp. All existing internal HTML-page targets resolve; the local page is not orphaned. Its section jump links expose audience, process, prices, location and FAQs. Privacy has a home link but no shared navigation.

At `max-width:1100px`, `.desktop-nav` is hidden and no replacement menu is provided; mobile users see the brand and booking CTA, with other navigation largely relegated to the footer. This is an important weakness once there are multiple pages. Existing skip links, headings, native FAQ disclosures and crawlable anchors are useful foundations.

### Structured data audit

- Home emits `ProfessionalService`, alternate business name, email, Renfrew area, founder and an offer catalogue from shared offer data. It lacks a stable business `@id`, business URL/address and an explicit connection to the `Person` used on the local page.
- Local page emits `BreadcrumbList`, `Person` (`/#aidan`), `Service`, a service-location `Place`/address, offers and `WebPage`. Prices match the three visible packages. Provider currently references the person rather than an identified AB business.
- There is no review/rating fabrication. Keep it that way. There is no FAQ markup requirement. Schema.org marks the general `ProfessionalService` type as deprecated; replace it with a truthful `LocalBusiness` entity rather than representing AB as the gym. [Schema.org: ProfessionalService](https://schema.org/ProfessionalService).
- Valid JSON-LD does not establish rich-result eligibility, business verification or rankings. An external Rich Results Test was not completed in this audit.

## 3. Sitemap conflict: long-term source of truth

**Keep `web/app/routes/sitemap.ts` as the sole HTTP publisher of the sitemap**, backed by one shared, typed public-page manifest. Remove the sitemap early return from `web/workers/app.ts`. Do the equivalent consolidation for robots, retaining `web/app/routes/robots.ts` as its sole publisher. There is no benefit in keeping two independent lists or fixing only the hidden route list.

Proposed responsibilities:

| Location | Responsibility |
| --- | --- |
| `web/app/lib/public-pages.ts` (new) | Explicit canonical HTML paths, page key, indexability, sitemap inclusion, optional genuine content modification date. Only published pages are listed. |
| `web/app/lib/seo.ts` (new) | Shared exact-origin/flag predicate, canonical path handling and business/site constants; used by root, resource loaders and Worker response controls. |
| `web/app/routes/sitemap.ts` | Serialise the published canonical manifest as XML on indexable production only; 404/no-store elsewhere. XML-escape values. |
| `web/app/routes/robots.ts` | Production crawl policy and sitemap location; staging/other hosts remain disallowed. |
| `web/workers/app.ts` | Scheme/host/path normalisation, enquiry routing, context, headers and scheduled notification handling. No independent sitemap or robots content. |
| `web/app/routes.ts` | Router registration, with a verification check that sitemap paths map to real published page routes. |

Use one exact predicate: `INDEXABLE === "true"` **and** request origin `https://aidanbrotherhood.com`. A bare build must never infer production from `NODE_ENV` or the build tool's production optimisation mode. Do not weaken staging exclusions to make a sitemap preview visible. Test the production response locally against the compiled production artifact with an apex-host request, then verify it on the real apex only after a separately approved production promotion.

At initial launch the XML contains the eight published HTML paths in section 6. No fragment, query, API, 404, redirect, staging, `workers.dev` or deferred goal URL belongs in it. Omit `priority` and `changefreq`; the priorities in this document are work priorities. Add `lastmod` only when meaningful content actually changes, not at each build or request. Google's sitemap guidance supports canonical URL inclusion and accurate modification dates. [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## 4. Legacy footprint and remediation

### Observed footprint

| Evidence | What it establishes | Recommended treatment |
| --- | --- | --- |
| Google browser `site:aidanbrotherhood.com` surfaced `practice.aidanbrotherhood.com/`, `/posts/it-shows`, `/posts/start-here-1` | A live, discoverable secondary publishing identity. All three return 200 with self-canonicals and no observed noindex. Main site did not appear in this sample. | Owner decides the subdomain's purpose. Default recommendation is to retain useful personal writing separately, identify it as Aidan's writing and link clearly to AB's local service page. Do not duplicate the business home page or invent a second PT location. |
| Google browser `site:aidanbrotherhood.com -site:practice.aidanbrotherhood.com` returned no documents; web search also found no apex results | Limited public discovery in these samples; **not proof of zero indexed apex URLs or a penalty** | Obtain Search Console access and inspect the exact production URLs, submitted sitemap, discovered/crawled status, selected canonical, manual actions and security issues. |
| [Skillshare profile](https://www.skillshare.com/pt/profile/Aidan-B/356303519) links to `/sign-up-to-my-newsletter`; Webflow course pages repeat that historical link | A real unrelated historical inbound URL, not a hypothetical redirect target | The old newsletter path now returns 404. Keep 404/410 if retired; redirect only if a genuinely equivalent newsletter exists. Do not funnel newsletter intent to PT booking. Owner may update their editable profile link. |
| [Historical LinkedIn NVIDIA article](https://www.linkedin.com/pulse/what-does-future-nvidia-look-like-aidan-brotherhood-ku3ae) links to the domain root | Old non-fitness associations exist externally | No removal/disavow action is justified by this alone. Update editable current business bios; preserve honest personal history. |
| Root Astro has `/about`, `/coaching`, `/contact`, `/writing`, `/posts`, `/terms`, RSS and article templates | Legacy source is still in the repository, not proof that these were indexed | Active deployment must remain `/web`. Tested corresponding apex paths returned real 404s. Do not accidentally restore the Astro site or all its routes. |

The `practice` root describes personal training and strength/conditioning while its indexed snippets describe daily fitness notes. This is adjacent content, not evidence of malicious or unrelated spam. Distinguish it from old Webflow/software/newsletter associations. It can confuse the intended business identity without being an automatic SEO penalty.

### URL disposition ledger

| URL/group | Observed state | Planned action |
| --- | --- | --- |
| `/about`, `/coaching` | Currently 404 | New pages at these same paths replace the 404 once ready; check historical intent in Search Console before launch. |
| `/contact` | 404 | Once `/consultation` is live, a permanent redirect is appropriate **if** historical contact intent is confirmed as this coaching business. Otherwise retain 404 until a mapping is justified. |
| `/terms` | 404; old Astro file is explicitly a private draft | Publish new owner-approved service/website terms; do not copy the draft as final terms. |
| `/writing`, `/posts`, `/rss.xml`, `/writing/physical-capability`, apex `/posts/it-shows` | Tested apex paths return 404 | Retain real 404s unless a specific equivalent survives. Do not bulk-redirect old article trees to home. |
| `/sign-up-to-my-newsletter` | 404; externally linked | Retain 404/410 unless an equivalent newsletter destination is confirmed. |
| `practice` home and the two observed post URLs | 200, indexable, self-canonical | Keep as a clearly separate writing property by default. If retired, export and map genuinely equivalent posts before URL-specific redirects; non-equivalent retired pages use 404/410. Changes require owner decision and access to that platform. |
| Unknown old URLs | Not inventoried completely | Use Search Console page/link exports and authorised request-log samples to extend a ledger of old URL, former purpose, traffic/links if known, destination and disposition. Mark unknowns, rather than inventing mappings. |

Do not use robots blocking as a removal mechanism or canonical tags to conceal retired unrelated pages. Temporary Search Console removals are not a replacement for persistent 404/410/noindex responses. Google's guidance distinguishes redirect, error and successful responses. [HTTP status codes](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes).

## 5. Search intent, competitors and discovery guidance

### Observed search evidence

Searches were performed on 2 November 2026. Browser Google results were personalised UK results with a Clydebank context; exact local-pack order and ratings can change. The following are observed appearances, **not claimed ranking positions**. Review language and competitor claims are their own, not independently verified credentials or proof that any tactic caused visibility.

| Query/sample | Observed results | Implication for AB |
| --- | --- | --- |
| Google `personal trainer Renfrew` | Local businesses included Titanium High Performance, DDP Evolution Fitness Centre and CG Fitness and Coaching. Web results included Tracy Ann Wishart, Fleming Fitness's Renfrew page, David Lloyd, directories and JD Gyms. Related suggestions included prices, reviews, private, female and near-me variants. People Also Ask focused on PT/session cost. | Lead with location, coach, exact offer cost, gym membership distinction and a clear first step. Do not target “female trainer” or “private gym” when those do not describe the service. |
| Google `personal training Paisley` | Local businesses included Strength & Fitness Paisley, CG Fitness and Coaching and Next Century Fitness. Web results included Personal Training Paisley, PureGym trainer listings, Paisley Personal Training, G1 and Abbey Mill. Questions included cost and whether PT is worth paying for. | Visitors compare different training settings and levels of support. AB must state that appointments are in Renfrew. A Paisley heading alone would not supply distinct value. |
| Web `personal trainer Clydebank` | Sanctuary Fitness appeared and its live site was opened. | There are genuinely local alternatives across the river. Being nearby is not grounds for claiming AB is based there. |
| Web Erskine searches | Mix of Scottish directories/venues and irrelevant Australian results. Scottish results included an Erskine-based coach listing and OneRen's venue. | Geographic ambiguity makes raw web results weak demand evidence. No separate city page is supported by this sample. |
| Beginner / strength / fat-loss queries with Renfrew | Results were mixed, including Canadian Renfrew matches; competitor pages describe beginners, confidence, strength and fat-loss support. | These are plausible commercial concerns. No exact-match volume or standalone-page demand is established. Treat the mapping below as a testable intent hypothesis. |

### Competitor pages inspected

| Competitor | Observed proposition/experience | Useful lesson; limit |
| --- | --- | --- |
| [CG Fitness and Coaching](https://www.cgfitnessandcoaching.com/) | Identifiable coach, clear PureGym Paisley address, enquiry action and coach/session photography | Specific person and setting help visitors judge fit. Do not borrow its experience claims. |
| [Strength & Fitness Paisley](https://www.personaltrainingpaisley.co.uk/) | Private setting, small-group model, beginner reassurance, process and free consultation | Explain the training environment and who the format suits. AB is one-to-one in a commercial gym; copy must reflect that difference. |
| [Paisley Personal Training](https://paisleypersonaltraining.com/) | Named coach, consultation, specific support explanation, qualifications and personal story | Explain actual between-session support and supply verified owner evidence; their qualifications/results do not establish Aidan's. |
| [Fleming Fitness Renfrew page](https://fleming-fitness.co.uk/personal-trainer-renfrew/) | Dedicated local page, broad goals, consultation links, repeated superlatives and several H1s | A real local result, but not a template to copy. AB can be clearer about price, place and coach without unsupported “leading/best” language. |
| [Tracy Ann Wishart](https://tracyannwishart.co.uk/) | Explicit female-coach/private-gym proposition and several service paths | Differentiate accurately; do not pretend to meet every search preference. |
| [Sanctuary Fitness](https://clydebankpt.com/) | Named coach, address, map links, goal paths, pricing and direct contact | Arrival information and a human route to booking matter. Do not replicate its claims, scarcity, reviews or large content footprint. |
| Titanium High Performance | Appeared in Google's Renfrew local results; [its own about-page search result](https://www.titaniumhighperformance.com/about) describes in-person PT at JD Gyms Renfrew | Same-venue competition is relevant. Full root-page retrieval failed in the web tool, so no complete site/CRO assessment is claimed. |

### Current official guidance translated into requirements

1. **Search:** meet crawl/index requirements, use useful language in titles/headings and maintain crawlable links. New pages must answer a real visitor decision. Eligibility never guarantees indexing or ranking. [Google Search Essentials](https://developers.google.com/search/docs/essentials).
2. **AI Overviews and AI Mode:** Google's newer AI optimisation guide favours distinctive, first-hand useful content and ordinary SEO foundations. No special AI schema, mass fan-out pages or `llms.txt` project is required. Use actual service facts, evidence, readable text and relevant imagery. [Google AI optimisation guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
3. **Current AI controls/reporting:** check the site's **Search generative AI** setting in Search Console, including inherited settings. The current help page says the control rolled out worldwide on 31 August 2026 and defaults to inclusion. Check it rather than assuming the account state. The dedicated AI report concerns **impressions**; absence may mean insufficient impressions. Older AI-features documentation still describes aggregated Web reporting, so use the newer linked help pages for available controls/reporting. [AI inclusion control](https://support.google.com/webmasters/answer/16908024), [AI performance report](https://support.google.com/webmasters/answer/16984139).
4. **Maps/local:** relevance, distance and prominence matter. Accurate profile details, legitimate verification, real photos and genuine reviews are practical work; adding city pages does not change the business's physical distance from a searcher. [Google local ranking guidance](https://support.google.com/business/answer/7091).
5. **Business representation:** use the real-world business name, correct address/category and one eligible business profile. Confirm gym-location eligibility, direct contact during stated hours and applicable practitioner/shared-location rules. Do not create AB and Aidan duplicates or add locations where training is not delivered. [Google Business Profile guidelines](https://support.google.com/business/answer/3038177).
6. **Structured data:** describe visible, truthful facts and validate supported types. No invented ratings, hidden credentials, misleading locations or self-serving review stars. Rich-result display is not assured. [Structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [local business guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business).
7. **Spam:** city variants that funnel to one usable page can be doorway abuse. Scaled content produced to manipulate search or AI responses is also excluded from this plan. Existing competitor pages are not policy approval. [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies).
8. **OpenAI:** `OAI-SearchBot` controls automated ChatGPT search discovery; `GPTBot` concerns model-training crawling and is independent. Current wildcard production robots permits search crawling. Keep OAI-SearchBot accessible in robots and hosting controls; using its user-agent string returned 200 here, but that is not verification from its published IP ranges. ChatGPT-User is a separate user-triggered fetcher, not the search opt-in control. [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots).
9. **FAQ presentation:** retain useful visible FAQs for visitors. Google's current documentation changelog records retirement of the FAQ rich-result feature in May 2026 and removal of its documentation in June. Do not promise FAQ rich results or add FAQ markup as a launch task. [Google documentation updates](https://developers.google.com/search/updates).

### Local expansion decision

Do **not** launch `/personal-training-paisley`, `/personal-training-erskine`, `/personal-training-clydebank` or neighbourhood variants. All sessions occur at the same Renfrew gym. A town-name swap, the same packages and another booking CTA would provide little additional value.

The Renfrew page may contain one honest “Travelling from nearby areas” section: state where training actually happens, link to an accurate map and encourage checking that the journey works. No guessed travel times, invented client stories from each town or implication of mobile/home training.

Reconsider a new geography page only with observed relevant enquiries/search data, material and maintained visitor-specific information that belongs on its own page, an honest location statement, and a review showing it is useful without merely sending users to Renfrew. None currently passes that test. A new real training location would require a separate business and operational decision.

## 6. Final initial sitemap and intent ownership

**P1:** foundation/consultation launch. **P2:** useful audience-specific depth once owner detail is supplied. **Conditional:** unpublished until its content gate passes. Priorities do not represent predicted search traffic.

| Path | Priority/status | Purpose and primary query family | Intent boundary / conversion |
| --- | --- | --- | --- |
| `/` | P1, existing; XML yes | AB Personal Training; Aidan Brotherhood personal trainer. Brand introduction and service overview. | Explain business/coach/location and guide to the right next page; book consultation. Local wording is natural, but `/personal-training-renfrew` owns the detailed generic local-service answer. |
| `/personal-training-renfrew` | P1, existing; XML yes | Personal trainer Renfrew; personal training Renfrew; PT at JD Gyms Renfrew; local PT cost. | Service/location choice and visit logistics. Concise pricing summary links to `/coaching`; no duplicate full coaching manual. |
| `/coaching` | P1, new; XML yes | Personal training prices Renfrew; PT packages; one-to-one coaching cost; support comparison. | All three packages, realistic support, beginner/strength/fat-loss pathways, between-session expectations and buying terms. Consultation first, not checkout. |
| `/about` | P1, new; XML yes | Aidan Brotherhood personal trainer; who runs AB Personal Training. | Human credibility, verified experience/qualifications and coaching judgement; no invented authority. |
| `/personal-training-for-beginners` | P2, new; XML yes when ready | Personal training for beginners Renfrew; new to gym; beginner PT; gym confidence. | First-session confidence, what happens and practical preparation. A service-fit page, not a generic beginner workout guide. |
| `/consultation` | P1, new; XML yes | Free personal training consultation Renfrew; book PT consultation; AB consultation. | Standalone booking destination; free, 30 minutes, in person, no purchase obligation. |
| `/privacy` | P1, retained; XML yes | Privacy notice / data-use lookup | Trust/legal information; no commercial keyword targeting. |
| `/terms` | P1, new subject to owner approval; XML yes when final | Coaching terms / cancellation and payment-policy lookup | Actual service terms, membership distinction and policies; no draft legal promises. |

These eight are the intended initial published sitemap. If beginner evidence or terms are not ready, do not publish placeholders or list them in XML. Launch the ready pages first, explicitly recording the smaller actual sitemap.

| Conditional path | Initial destination for its topic | Separate-page gate |
| --- | --- | --- |
| `/strength-training` | `/coaching#strength` | Owner-approved example of assessment, technique decisions, progression and review; genuinely different strength-service questions and a reason to choose this pathway. It must stand alone without reciting the package page. |
| `/fat-loss-coaching` | `/coaching#fat-loss` | Owner-approved explanation of the actual training/nutrition/check-in process, boundaries, progress review and appropriate expectations; distinct visitor questions. No transformation promises or medical claims. |

Do not create redirects from these currently unused conditional paths just to reserve them. Do not link to them until published. Initial links go directly to the relevant coaching sections. Review commercial enquiries and Search Console evidence after 8–12 weeks of operation; page release depends on usefulness and evidence, not a traffic threshold invented now.

### Supporting query mapping

- “How much is a personal trainer?” → `/coaching`, with a short answer and price summary on the local page. State **£99 one-off / £180 or £320 per four weeks**, session counts and separate gym membership. Do not call four-week blocks monthly subscriptions.
- “Do I need gym membership?” / “Where do we meet?” → `/personal-training-renfrew#location`, reinforced before booking.
- “Never used a gym / what should I wear?” → beginner page; link to consultation and exact venue guidance.
- “Build strength / learn weights / fat loss support” → coaching sections initially. These are inferred service-fit topics, not measured keyword-volume findings.
- “Best / reviews / qualifications” → truthful about-page evidence and a verified external review profile if available. Do not make “best in Renfrew” a claim.
- “Online PT / home visits / private studio / female PT / rehabilitation / other cities” → do not target as services AB provides. Clarify the actual one-to-one gym setting where relevant.

## 7. Page briefs: H1, metadata and section outlines

Metadata below is proposed final copy. Use a single descriptive H1 per page, natural language, consistent AB branding, and matching OG title/description. Titles/descriptions are editable snippets, not guarantees of how Google displays them. Preserve self-canonical URLs for distinct pages; never canonicalise all commercial pages to home. No minimum word count or keyword-density target applies.

### `/` — brand and service overview

- **H1:** One-to-one personal training with Aidan Brotherhood
- **SEO title:** AB Personal Training | Aidan Brotherhood, Renfrew
- **Description:** One-to-one personal training with Aidan Brotherhood at JD Gyms Renfrew. Explore coaching and prices, then book a free 30-minute consultation.
- **Primary action:** Book a free consultation → `/consultation`.
- **Sections:** (1) AB brand, coach, gym and proposition; retain “Get stronger. Stop guessing.” as supporting copy. (2) Who coaching can help: starting out, building strength, changing body composition; link to relevant detail. (3) Short explanation of the coaching approach. (4) Compact package summary with exact periods/session counts and link to full comparison. (5) Meet Aidan preview linking to `/about`. (6) Renfrew training location, independence and separate membership. (7) Consultation process summary, direct booking link and human contact fallback.
- **Unique value/evidence:** real coach and venue introduction. Reduce duplicated pricing/comparison/FAQ length rather than adding another long section stack.

### `/personal-training-renfrew` — local service and arrival decision

- **H1:** Personal training at JD Gyms Renfrew
- **SEO title:** Personal Trainer Renfrew | AB Personal Training
- **Description:** Train one-to-one with Aidan Brotherhood at JD Gyms Renfrew, PA4 9EN. See prices, gym access details and how to book a free consultation.
- **Primary action:** Book a free consultation → `/consultation`.
- **Sections:** (1) Local service, named coach and full venue/address. (2) Who the one-to-one format suits, including beginner link. (3) How sessions work, with a brief owner-approved session example. (4) Package summary and `/coaching` link. (5) Location: map/directions link, how to find the meeting point, verified entry/accessibility/parking information, appointment-only coaching hours. (6) Separate membership and independent business explanation. (7) Travelling from nearby areas, without alternate location claims. (8) Local FAQs: cost, membership, non-member consultation access, session duration and next step. (9) Consultation CTA.
- **Unique value/evidence:** venue arrival photos and practical logistics that home/coaching do not repeat in full. Use the [official JD Gyms location page](https://www.jdgyms.co.uk/gym/renfrew/) for the gym's own details; confirm changing information before reproducing it. Do not copy gym opening hours as Aidan's availability or hard-code promotional membership prices.

### `/coaching` — offer comparison and goal pathways

- **H1:** Personal training coaching and prices
- **SEO title:** Personal Training Prices & Coaching | AB Personal Training
- **Description:** Compare Starter at £99, Coaching at £180 and Coaching+ at £320. See sessions and support included at JD Gyms Renfrew. Gym membership is separate.
- **Primary action:** Book a free consultation → `/consultation`; optional package context uses stable IDs, not a new purchase flow.
- **Sections:** (1) What support means and consultation-first process. (2) Starter: £99 once, two 60-minute sessions, assessment/technique/practical starting plan. (3) Coaching: £180/four weeks, four sessions, programming, practical nutrition guidance, weekly check-ins. (4) Coaching+: £320/four weeks, eight sessions and more hands-on support. (5) Accessible feature comparison and who each option fits. (6) `#strength`: technique, progression and review in Aidan's actual practice. (7) `#fat-loss`: training, realistic habits and review; no clinical nutrition service or promised rate. (8) Independent training between appointments, contact/check-in boundaries. (9) Membership, block/payment/cancellation terms and link to final `/terms`. (10) Focused FAQs and consultation CTA.
- **Unique value/evidence:** retain `web/app/lib/offers.ts` as the package-data authority; preserve IDs `introduction`, `weekly`, `complete`, `unsure`. Do not introduce old display names or a compulsory 12-week plan. Per-session equivalents may remain secondary: £49.50, £45, £40; support is the main comparison.

### `/about` — identify and assess the coach

- **H1:** Meet Aidan Brotherhood, your personal trainer
- **SEO title:** Meet Aidan Brotherhood | AB Personal Training
- **Description:** Meet Aidan Brotherhood, the coach behind AB Personal Training at JD Gyms Renfrew. Learn how he approaches strength, confidence and consistent training.
- **Primary action:** Book a free consultation → `/consultation`.
- **Sections:** (1) Name, business and current venue. (2) Personal training background and motivation in Aidan's own words. (3) How he makes coaching decisions, with one concrete example. (4) Verified qualifications/awarding bodies and relevant current professional status only when supplied. (5) What he can help with and the scope of practical nutrition guidance. (6) What a client can expect from communication and reviews. (7) Real portrait, links to coaching/location and invitation to meet.
- **Evidence gate:** obtain the final biography and any qualification evidence. The owner's existing writing is a style reference, not independent verification of credentials, competitive history, years in practice or results. If no qualification text is verified, omit that section rather than inserting a vague “fully qualified” claim.

### `/personal-training-for-beginners` — make the first visit understandable

- **H1:** Personal training for beginners in Renfrew
- **SEO title:** Beginner Personal Training Renfrew | AB Personal Training
- **Description:** New to the gym? Learn what starting one-to-one training with Aidan at JD Gyms Renfrew involves, what to bring and how the free consultation works.
- **Primary action:** Book a free consultation → `/consultation`.
- **Sections:** (1) Who this is for, without pressure to “get fit first.” (2) Consultation versus paid Starter: free 30 minutes versus £99/two full sessions. (3) First paid-session walkthrough approved by Aidan: check-in, familiarisation, movement practice and a manageable next step; actual content is individual. (4) How equipment/technique are introduced and how support changes as confidence develops. (5) What to bring, meeting point and gym-access instructions. (6) Options for support after the first sessions, linking to `/coaching`. (7) Beginner-specific FAQs and ways to ask a question. (8) Consultation CTA.
- **Evidence gate:** one actual session/process example, specific practical instructions and ideally genuine coach/venue images. This page should answer first-visit uncertainty substantially better than the local page, not paraphrase it.

### `/consultation` — complete a booking

- **H1:** Book your free personal training consultation
- **SEO title:** Free PT Consultation in Renfrew | AB Personal Training
- **Description:** Book a free 30-minute consultation with Aidan Brotherhood at JD Gyms Renfrew. Discuss your goals, ask questions and explore coaching with no obligation.
- **Primary action:** Choose a consultation time; calendar and direct external booking alternative.
- **Sections:** (1) Free / 30 minutes / in person / JD Gyms Renfrew. (2) Gym-access instruction **before** date selection, with clear non-member contact path until access is confirmed. (3) Calendar near the top, plus a visible external booking link before the iframe. (4) Three short expectations and what to wear/bring. (5) No suitable time? Email/WhatsApp route, with owner-approved response expectations only. (6) Privacy and change/cancel information. (7) Secondary links to coach, location and package details for visitors who need them.
- **Unique value:** conversion destination rather than another service essay. Explain that no paid package is purchased during booking. Show current availability from the provider; no fabricated countdowns or slot counts.

### `/privacy` — align disclosure with the delivered flow

- **H1:** Privacy notice for AB Personal Training
- **SEO title:** Privacy Notice | AB Personal Training
- **Description:** How AB Personal Training handles consultation bookings, enquiries and website information, including Calendly and contact details for privacy requests.
- **Sections:** trader/controller and contact; booking data and Calendly/connected calendar; fallback enquiries if mounted; purposes; processors/transfers; actual retention/review practice; cookies/embed loading and any approved measurement; rights/contact/complaints; meaningful update date.
- **Requirement:** accurately state when the iframe loads and which systems receive bookings. Do not claim Calendly bookings enter the D1 enquiry database. Remove obsolete package-preselection/form wording unless the final fallback actually uses it. Owner confirms the operational retention process; this audit does not certify legal compliance.

### `/terms` — approved service policies

- **H1:** Personal training terms and booking policies
- **SEO title:** Coaching Terms & Booking Policies | AB Personal Training
- **Description:** Read AB Personal Training's coaching and booking terms, including four-week blocks, separate gym membership and policies for changing appointments.
- **Sections:** operator/scope/contact; free consultation and no purchase obligation; Starter versus four-week packages; session entitlement and scheduling; payment/renewal/unused-session rules; cancellation/rescheduling/no-show/refund arrangements; separate gym membership and independence; appropriate screening and scope of guidance; complaints; effective date.
- **Evidence gate:** policies require Aidan's decisions and appropriate review. Do not invent cancellation windows, automatic renewal, expiry dates, guarantees, waivers or statutory-right exclusions. The legacy Astro draft is not a launch-ready agreement.

### Conditional `/strength-training` — unpublished initial brief

- **H1:** One-to-one strength training in Renfrew
- **SEO title:** Strength Training in Renfrew | AB Personal Training
- **Description:** Build strength with one-to-one coaching from Aidan at JD Gyms Renfrew. Explore technique, programming and progress reviews, starting with a free consultation.
- **Sections:** strength-related starting points; owner-approved assessment example; technique coaching in an actual movement; how progression decisions are made; independent sessions and review; relevant package link; realistic FAQs; location/consultation.
- **Gate:** a concrete demonstration/process account and distinct service-fit content. No unsupported athlete-specialist, rehabilitation or performance-result claims. Until ready, serve the topic at `/coaching#strength`.

### Conditional `/fat-loss-coaching` — unpublished initial brief

- **H1:** Fat-loss coaching through personal training in Renfrew
- **SEO title:** Fat-Loss Coaching in Renfrew | AB Personal Training
- **Description:** Explore personal training and practical nutrition guidance with Aidan at JD Gyms Renfrew. Discuss your goals at a free consultation, with no promised rate of loss.
- **Sections:** appropriate goals and service fit; training's role; practical non-clinical nutrition support actually provided; weekly review example; realistic/non-linear progress and individual differences; coaching options; boundaries and questions; location/consultation.
- **Gate:** owner-approved process details and appropriate evidence for any substantive health/nutrition statements. Do not add prescriptive diets, medical treatment, guaranteed kilogram/time claims or unsourced transformation stories. Until ready, serve the topic at `/coaching#fat-loss`.

### Utility/error content

Robots and XML sitemap are resource responses; they do not have H1s or SEO descriptions. `/api/enquiry` remains noindex. A 404 should have title `Page Not Found | AB Personal Training`, H1 `We couldn't find that page`, a short explanation, and links to home, local training and consultation. It retains HTTP 404 and is excluded from XML. Do not publish a standalone indexable thank-you page: use confirmation UI or a noindex `/consultation/thanks` only if required by a verified provider flow. Visiting such a URL alone never counts as a booking.

## 8. Navigation and internal-link architecture

### Site-wide navigation

Desktop: AB home link; **Training in Renfrew** → local page; **Coaching & prices** → coaching; **New to the gym?** → beginner page when published; **Meet Aidan** → about; prominent **Book a free consultation** → consultation. Use an accessible compact menu at smaller widths instead of simply removing links. Menu control needs a visible label, `aria-expanded`, keyboard operation and sensible focus/escape behaviour. Links must remain real anchors.

Footer: all published commercial pages, privacy, approved terms, full training venue/address, business email, current Instagram and verified business WhatsApp. Clearly distinguish business and coach. Privacy/terms get the same usable navigation. Breadcrumbs on interior pages follow actual hierarchy: Home → Coaching, Home → Training in Renfrew, etc.; conditional goal pages may use Home → Coaching → Strength training when actually published.

### Contextual link rules

| Source | Required helpful destinations |
| --- | --- |
| Home | Local venue/service, coaching comparison, about, beginner route and consultation |
| Local service | Coaching prices, beginner route, about, consultation and verified directions |
| Coaching | Beginner page, local access details, about, terms and consultation; goal links initially point to its own sections |
| Beginner page | Starter section of coaching, venue arrival/access, about and consultation |
| About | Coaching, local venue and consultation |
| Consultation | Location/access, privacy, change/cancel information and direct booking/contact fallbacks |
| Conditional goal pages | Coaching options, about, local venue and consultation, with context-specific anchors |

No orphan pages, footer-only service discovery, site-wide keyword blocks or lists of nearby towns. Anchor text should describe the destination naturally. Keep distinct pages self-canonical; overlapping phrases alone are not grounds for a canonical merge.

Preserve legacy home fragments `#approach`, `#about`, `#coaching`, `#consultation` as useful short sections or forwarding links during the transition. Fragments are not sent to the server, so an HTTP redirect rule cannot selectively redirect `/#consultation`. Update every new CTA to `/consultation`, keep old bookmarks functional and avoid two permanently duplicated full booking experiences.

## 9. Consultation funnel and mobile CRO

### Current experience and friction

The active home page renders `ConsultationCalendar`; `BookingPanel` and `ConsultationForm` exist in source but are not mounted by either commercial route. All main booking actions go to the calendar near the bottom of home. The local page requires a cross-page jump. The shared full pricing cards/comparison on both pages make the mobile pages lengthy. The home document measured approximately 13,044 CSS pixels high at the observed narrow viewport; that is a layout observation, not a conversion or speed metric.

Calendly loaded after the booking section came into view. Its introduction repeats the host-page explanation; the observed mobile view showed introduction content before the date grid. Available dates were visible in the current week and a date/time/details flow was reachable. Later November dates and next-month navigation were unavailable in this snapshot. That can reflect a deliberate rolling booking window; do not call it a bug or change capacity without owner confirmation.

The final form requires **name and email**, allows guests and an optional general preparation message. No payment was requested. The broad optional text field may invite sensitive detail despite the event description asking users not to enter it. The embed displayed its own optional-cookie banner. The external booking fallback sits below an 850px-tall mobile iframe; it should be available before a blank/blocked embed has to be traversed. Static iframe heights can cause inner/outer scrolling or clipping on later steps; test actual behaviour before claiming a failure.

Non-members are told on the site to contact Aidan before booking; the Calendly description says access arrangements will be confirmed before the visit. Resolve that process mismatch. The primary business distinction—paid sessions need a separate membership—is clear, but the practical free-visit instruction should be equally clear.

### Intended journey

1. Search/Maps/ChatGPT or a shared link → a page that matches the visitor's decision.
2. Visitor sees coach, location, format, applicable price and membership distinction without hunting.
3. **Book a free consultation** → `/consultation`, with no package selection requirement.
4. Visitor sees free/30-minute/in-person facts and access instructions, then selects an available date/time.
5. Calendly collects minimum booking details and confirms the appointment; actual confirmation remains provider-owned.
6. Confirmation gives date/time/timezone/location, meeting instructions and provider change/cancel links. Attendance and client conversion are tracked separately afterwards.

Keep the current provider rather than building a custom scheduler. On `/consultation`, give the calendar visual priority, avoid a large decorative hero and retain direct booking and contact alternatives. Use explicit “Choose a time” copy at the calendar step. Retain one consistent primary action; email and WhatsApp serve visitors with access or availability questions, not competing full funnels.

Until a confirmed non-member process exists, place **“Not a JD Gyms member? Contact Aidan before booking so access can be confirmed.”** above the calendar with working contact links. Do not promise free visitor access, a day pass or that membership is unnecessary. Once Aidan confirms a workable process, align both website and Calendly wording; add only a simple membership question if it is operationally necessary.

Recommend replacing the broad Calendly preparation prompt with an optional narrow goals/experience prompt and an adjacent “Please don't include medical or sensitive information” instruction, if provider configuration supports it. Do not add a long qualification questionnaire before booking. Health screening belongs in the appropriate private onboarding process.

### Calendar resilience and presentation

- Show a direct Calendly link and email alternative before the iframe. Mark new-window behaviour in accessible copy.
- Provide a concise loading state and useful failure fallback. Frame-load success does not prove that usable appointments rendered; do not claim slot availability from a load event.
- Use the provider's documented sizing/event mechanism if needed; constrain accepted messages to the exact current Calendly origin and iframe source, validate data shape and bound heights. Do not trust any message with a `calendly` prefix.
- Preserve the provider's own cookie controls and review the actual embed/optional-tracking behaviour. Do not silently suppress them to reduce friction. Update privacy copy to the final loading behaviour.
- Use a lightweight persistent header CTA and accessible mobile menu; test that they do not cover headings, input focus or provider controls. No exit popup or forced account signup.
- Keep the service facts and fallbacks usable with blocked third-party scripts, cookies rejected, slow networks and JavaScript disabled. An iframe-only promise is insufficient.

Calendly documents parent-window events, including date/time selection, scheduling and page-height changes. These can support interface feedback and diagnostic funnel measurement, subject to source validation. [Calendly embed events](https://developer.calendly.com/api-docs/overview/embedding/notifying-the-parent-window).

## 10. Conversion measurement specification

### What counts

**Primary acquisition outcome:** a new paid client following a consultation. **Primary website conversion:** a genuine consultation appointment recorded by Calendly (or manually confirmed by Aidan through a contact fallback). A booking CTA, iframe load, details view, D1 enquiry or a visit to a thank-you URL is not a booked consultation. Notification acceptance/delivery is not client acquisition.

Source currently has bounded attribution support and a custom event in the unmounted enquiry form, but no analytics listener/reporting service and no Calendly message handler or booking webhook route. Calendly bookings bypass the D1 enquiry database. Existing README measurement/form claims are partly historical and need correction with implementation.

### Initial measurement: minimal and operational

Start with a private booking/outcome ledger reconciled to Calendly, without adding an advertising pixel or buying analytics software. Record only the data needed for follow-up and attribution. Keep identifiable contact records private and publish only aggregate reporting; never commit them to Git.

Suggested operational fields: internal lead ID; provider booking/invitee ID where relevant; created date; consultation date/time; status (`booked`, `cancelled`, `rescheduled`, `attended`, `no_show`, `client`); broad source (`google_organic`, `google_business_profile`, `chatgpt`, `instagram`, `referral`, `other`, `unknown`); source evidence (`provider_utm`, `self_reported`, `referrer`, `unknown`); initial page/variant if known; chosen paid package; first paid amount/date if confirmed. No health information is needed for attribution. Avoid duplicating contact information across an analytics system and the provider.

Use an optional “How did you hear about AB Personal Training?” question or a consultation-time question to cover cross-device/direct/fallback bookings. Self-reported sources remain self-reported, not deterministic attribution. Keep `unknown` rather than forcing a guess. Adding this booking question is a proposed provider configuration change, not something done in this audit.

### Diagnostic events for a later approved measurement layer

| Event | Trigger / source | Meaning and permitted properties |
| --- | --- | --- |
| `consultation_cta_clicked` | Real primary-action click | Intent only; canonical page key and placement enum; optional stable package ID. |
| `booking_destination_viewed` | Consultation page reached | Page view, not calendar success. |
| `booking_calendar_viewed` | Verified provider event-type view, or explicitly labelled local visibility signal | Record which signal was used; never infer confirmed availability. |
| `booking_time_selected` | Valid provider message | Funnel step only; no chosen date/time or personal fields in analytics. |
| `booking_completed_client_signal` | Valid provider scheduled message | Diagnostic client-side signal; reconcile to provider record. Deduplicate within the page session; do not trust as server authority. |
| `consultation_booked` | Provider record verified manually, via authorised read-only sync, or authenticated webhook | Authoritative booking count, deduplicated by provider identifier. External Calendly bookings must also be included. |
| `consultation_cancelled` / `consultation_rescheduled` | Provider record/reconciliation | Net active appointments and booking chains; rescheduling is not an extra new lead. |
| `contact_fallback_clicked` | Email/WhatsApp/direct Calendly click | Channel/placement enum only; no claim that an enquiry was sent or appointment booked. |
| `enquiry_saved` | Confirmed new D1 write if fallback form is later mounted | Enquiry only, not booking; preserve idempotency and separate notification state. |
| `consultation_attended` / `client_started` | Aidan's verified operational update | Actual attendance and paid-client conversion; not browser inference. |

No name, email, phone, free-text goals, health details, appointment payloads, full referrer URLs, ad click identifiers or raw provider URLs should enter analytics events, URLs or application logs. A provider identifier used for private deduplication must not be forwarded to advertising platforms. Use the existing campaign-label constraints; do not treat a regex allowlist as permission to put personal information in UTMs. Prefer static controlled campaign values.

### Booking authority and optional automation

Manual reconciliation is sufficient for the initial stage. If provider plan/access supports it and volume warrants automation, add a separately scoped authenticated Calendly webhook integration for `invitee.created` and `invitee.canceled`. Verify signatures over raw bytes, enforce replay tolerance, filter the specific consultation event type, deduplicate delivery retries, handle out-of-order cancellation/rescheduling and store only necessary operational fields. Use additive, environment-specific storage; do not overload the existing enquiry/Resend queue or fabricate D1 enquiries for bookings. Reconcile provider state after processing failures.

No webhook, secret, subscription, CRM or paid plan is provisioned by this specification. Capability/plan availability must be checked before implementation. Calendly documents the booking/cancellation events and signature/replay protection. [Webhook subscriptions](https://developer.calendly.com/docs/api-guides/receive-data-from-scheduled-events-in-real-time-with-webhook-subscriptions), [webhook signatures](https://developer.calendly.com/api-docs/overview/webhooks/webhook-signatures).

### Source handling and reporting

- Google Business Profile website link should point to the local service page with static labels such as `utm_source=google&utm_medium=organic&utm_campaign=business_profile`. The appointment link points to `/consultation` with `utm_content=appointment`. Do not make unapproved external profile edits during website work.
- Preserve approved current-page campaign labels into the Calendly link/embed using documented provider tracking parameters, verified in a test event's record. Do not assume the existing D1 form attribution covers Calendly. Maintain allowed source labels across internal navigation in the least intrusive way; if query propagation is used, canonicals remain clean and no tracking storage is introduced silently.
- Referrer host may indicate ChatGPT, but missing referrer data does not prove no AI influence. Report observed referrals and self-report separately. Never label all direct traffic as AI.
- Search Console: submit the actual production sitemap; inspect indexing and UK mobile/local-query performance; distinguish brand from non-brand. Check the current AI inclusion setting and AI impressions report after access is resolved. Do not promise query-level AI attribution or AI booking attribution that the reports do not provide.
- Weekly: report unique new consultations, cancellations/reschedules, attended consultations, new paid clients, confirmed first-block revenue, source evidence and unknown-source count. Evaluate bottlenecks by source and device only when there is sufficient data.
- Metrics: attendance rate = attended / consultations whose scheduled time has passed, with cancelled appointments reported separately; consultation-to-client rate = new paid clients / attended consultations in a defined follow-up cohort. If reliable unique website-session measurement is later approved, website booking rate = verified site-attributed new bookings / eligible sessions for the same cohort; otherwise state that denominator is unavailable.
- Establish a baseline over the first four weeks of reliable measurement; review commercial results after 8–12 weeks. Do not promise a booking-volume target without capacity, baseline or budget. At low volume, prioritise observed usability issues and enquiry quality over underpowered A/B testing.

## 11. Business identity, Maps and structured data

### Canonical entity facts

| Field | Required representation |
| --- | --- |
| Business brand | **AB Personal Training** |
| Operator / coach | **Aidan Brotherhood**; privacy/legal text may say “Aidan Brotherhood trading as AB Personal Training” |
| Service | Independent one-to-one, in-person personal training |
| Sole training venue | **JD Gyms Renfrew, Renfrew Retail Park, Renfrew, PA4 9EN, United Kingdom** |
| Relationship to venue | Independent business operating at the gym; not owned by JD Gyms and not an official JD programme |
| Membership | Required for paid sessions; separate purchase. Free consultation access follows the owner-confirmed process. |
| Website | `https://aidanbrotherhood.com` |
| Public business email | `hello@aidanbrotherhood.com` |
| Social/contact | Existing Instagram `aidanbrotherhood.pt` and public WhatsApp link; owner confirms continued business use before profile/schema propagation |
| Hours | Aidan's actual appointment availability, not the gym's 24-hour opening schedule |

Update visible header/footer identity, accessible brand label, OG site name, page titles where appropriate, social-card branding, structured data and relevant current external bios consistently. Preserve the business's domain; a domain rename is not recommended. The coach's personal name remains prominent on the site and booking page.

### Google Business Profile workstream

First inspect whether an AB/Aidan profile already exists and who controls it; absence from a sampled local pack does not establish absence of a profile. Before creating anything, confirm eligibility for this independently operated business inside JD Gyms, the right to use the address, real-world identification/signage, direct contact and staffed appointment availability under Google's rules. Do not use a service-area profile as a workaround when the business does not travel to customers.

If eligible, claim/verify one accurate profile, use the real-world AB business name and the most appropriate available personal-trainer category, correct address, real contact information and accurate appointment hours. Use website/booking links with the source labels above; list the actual packages and membership distinction where the product permits. Do not rename the gym listing, add keyword stuffing to the business name or create separate profiles for each goal/town/person alias. If policy treats this as an individual practitioner listing, follow the applicable naming rules after confirming the setup; do not infer eligibility from a competitor's listing.

Ask real clients for honest reviews without incentives or filtering requests only to happy clients. Reply appropriately and add genuine owner/venue images with permission. Pursue a relevant JD trainer directory/profile link if the gym offers one, plus a small number of accurate legitimate local listings. Do not buy mentions, manufacture reviews, mass-submit directories or invent qualifications to gain directory eligibility. Apple Business Connect/Bing Places can be assessed after the core entity is settled; they do not require extra website landing pages. [Google review guidance](https://support.google.com/business/answer/3474122). If an eligible profile is located inside another business, review Google's supported address/location-description options rather than inventing a separate unit. [Business address guidance](https://support.google.com/business/answer/2853879).

### JSON-LD implementation contract

Build one shared graph from verified site/business facts:

- `WebSite` on home: stable `/#website`, name `AB Personal Training`, canonical URL and publisher business reference. This supports consistent site naming, without promising a displayed name. [Google site-name guidance](https://developers.google.com/search/docs/appearance/site-names).
- `LocalBusiness`: stable `/#business`, name AB Personal Training, URL, business email, founder reference and accurate venue address. Use `location`/a separate `Place` reference for JD Gyms Renfrew so it is clear where coaching is delivered; never identify AB as `ExerciseGym` or make JD a parent company. Use the existing real logo; add a real owner/venue image only when rights are confirmed. Add telephone/hours/map coordinates only when verified. The address represents the truthful operating venue, not ownership of the gym; GBP eligibility is a separate check.
- `Person`: preserve `/#aidan`, name Aidan Brotherhood, job title personal trainer, `/about` URL and connection to `/#business`. Include verified relevant `sameAs` profiles only. Do not turn course/software/newsletter profiles into claims of PT qualification.
- `Service`: local one-to-one training, provider `/#business`, location JD Place and Renfrew service area. No list of fictional service locations. Goal services may be described only on published pages that visibly explain them.
- `Offer` / `OfferCatalog`: derive names, GBP prices, session counts and block descriptions from `offers.ts`; link to `/coaching` or its package sections. Starter is a one-off; Coaching/Coaching+ are four-week blocks. Never express them as calendar-month prices or implied automatically recurring subscriptions.
- `WebPage`/`AboutPage` and `BreadcrumbList` on applicable pages, with canonical page URLs and visible breadcrumb names. Consultation remains a web page describing the appointment; do not fabricate dated `Event` instances or a booking action that has not been integrated.

Reuse stable IDs rather than emitting disconnected business identities on each page. Ensure all referenced nodes are defined in the graph supplied on that page where needed. Never emit `aggregateRating`, review stars, awards, `hasCredential`, client numbers, opening hours or images without matching approved visible evidence. No FAQ rich-result work, medical practitioner types or ranking claims. Validate JSON syntax, Schema.org semantics and Google-supported feature requirements separately.

## 12. Technical implementation backlog

| ID / priority | Change and files | Acceptance outcome |
| --- | --- | --- |
| T1 / P1 | Consolidate crawler resources in `workers/app.ts`, `routes/sitemap.ts`, `routes/robots.ts`; add shared manifest/predicate | One served sitemap source; all actual published canonical pages included; unchanged staging exclusions. |
| T2 / P1 | Normalise HTTP, www and HTML trailing slashes before routing, using explicit production-domain checks | Known HTTP/www/slash variants permanently redirect to one HTTPS apex URL with path/query preserved; no asset/API damage or open redirects. |
| T3 / P1 | Make metadata/canonicals page-aware in `root.tsx` and page modules | One title, description, canonical and H1 on each indexable page; clean query-free canonical; no indexing/canonical on staging, errors or utilities. Current successful 404 behaviour preserved. |
| T4 / P1 | Add actual pages to `routes.ts`; refactor reusable navigation/footer and page metadata | Real SSR routes, consistent mobile menu and entity name; contextual links and working fragments; no placeholder routes. |
| T5 / P1 | Add `/consultation`, share provider URL/config and update CTAs | All service CTAs reach one booking destination; visible direct/contact fallback; privacy and access wording match provider. |
| T6 / P1 | Consolidate schema and business constants; retain canonical offer data | Shared connected business/person/site graph; precise visible offer facts; no stale business or package names. |
| T7 / P1 | Preserve/enforce environment gating for third-party booking and future telemetry | Staging cannot create live bookings or send real-recipient notifications; testing uses synthetic fixtures or a separately isolated test provider setup. |
| T8 / P2 | Image delivery in `home.tsx`, local/new pages and public assets | Real rights-cleared media where available; appropriate dimensions, responsive `srcset`/`sizes`, compressed modern formats, meaningful truthful alt text; lazy-load below-fold images, prioritise only actual above-fold media. |
| T9 / P2 | Measure page experience before and after | Run mobile lab tests and use field data if available; investigate LCP/INP/CLS and third-party costs. Do not call lab scores real-user Core Web Vitals. Avoid unnecessary image/embed loading. |
| T10 / P1 | Correct historical `web/README.md` sections | Current route/booking/offer/environment facts replace contradictory old branch, deploy, no-WhatsApp and form-measurement instructions; retain safety requirements. |
| T11 / P1 | Legacy URL ledger and chosen exact redirects only | Every redirect has a justified equivalent; genuine removed/unknown URLs stay 404/410; no blanket home redirect. |
| T12 / P1 | Verified measurement baseline; optional later provider integration | Booking/attendance/client counts reconciled; enquiry and click counts remain distinct; no unapproved analytics tags or tracking storage. |

T2 must be scoped to `aidanbrotherhood.com` and `www.aidanbrotherhood.com`. Do not redirect staging or `workers.dev` into production or weaken the exact-host indexability condition. Combine normalisation when practical to avoid chained redirects. For path aliases, canonicalise recognised HTML routes only; do not strip trailing slashes indiscriminately from API/asset/unknown paths. Preserve incoming query values through redirects, but exclude them from canonical tags.

The current wildcard robots rule is sufficient to permit OAI-SearchBot; an extra allow-group is optional and unnecessary unless a broader crawler policy requires it. If owner training-crawl preferences later change, treat GPTBot separately while preserving search access. Review verified crawler access in hosting/WAF logs rather than allowlisting anyone claiming a bot user agent. No firewall weakening is authorised here.

## 13. Owner-supplied evidence and decisions

### Content/media inputs

| Input | Needed for | Publish rule |
| --- | --- | --- |
| Final biography and specific qualifications, awarding body, dates/status and evidence of any current registrations | About / entity credibility | Publish only exact verified claims; no assumptions from the job title or gym contract. |
| Real portrait of Aidan, permission to use venue images, arrival/meeting-point photographs | Home / about / local / consultation | Label and describe the actual subject; avoid unrelated bystanders, client exposure or copyrighted venue media without rights. |
| Actual beginner session outline and one coaching decision example | Beginner / coaching / about | Owner approves what is typical versus individually determined; no fabricated case study. |
| Practical details of programming, weekly check-ins, nutrition scope and support boundaries | Coaching / conditional goal pages | Promise only support Aidan can deliver; don't invent an app, unlimited messaging or response SLA. |
| Consultation access for non-members, meeting point, genuine coaching availability, verified parking/accessibility instructions | Local / consultation / Calendly / GBP | Align all destinations; no invented free entry, travel times or 24-hour coaching availability. |
| Payment/block/cancellation/rescheduling/no-show/unused-session/refund policies | Terms / coaching | Owner decisions and appropriate review before publishing final contractual wording. |
| Genuine reviews/results and consent/provenance, if any | Optional credibility additions | Not required to launch. No fake testimonials or manufactured before/after images; no guaranteed or typical outcomes inferred from a single story. |

Existing Unsplash imagery is labelled illustrative on the checked commercial pages. Keep those labels while any such imagery remains; it is not proof of Aidan, his clients or the actual gym. Do not generate an AI portrait/client session to fill evidence gaps. The best initial replacements are a real coach portrait and useful venue arrival/coaching photographs, not decorative stock expansion.

### Decisions that genuinely need the owner

1. **Search Console access:** identify the owning account or verify the domain; this audit's signed-in account had no access. Supply access through the normal account UI, not credentials in chat. Review indexing and AI inclusion after access is available.
2. **Gym/Maps representation:** confirm permission and real-world evidence to represent AB at this address, actual contact hours and the non-member consultation-access process. This is needed before final GBP setup and definitive arrival copy.
3. **Personal publishing:** keep `practice.aidanbrotherhood.com` as a distinct writing property (recommended default), or plan a deliberate retirement/migration. It cannot safely be treated as an abandoned staging site based on its name.
4. **Service policies/evidence:** supply the real biography/credentials, typical session/support details and final commercial policies. Missing optional photos/reviews are not permission to fabricate them.

No owner decision is needed on choosing a sitemap publisher, canonical style, mobile navigation, the exact published offer facts supplied in the assignment or declining duplicate town pages. Use the recommendations above. A paid provider upgrade, new analytics account or production promotion would be a separate decision when concrete and necessary; none is requested now.

## 14. QA and acceptance criteria

### Content, architecture and commercial truth

- [ ] Published route list matches the agreed sitemap; each page has a distinct decision/purpose and no placeholders.
- [ ] All titles, descriptions and H1s are unique; headings identify service/coach/location where appropriate without keyword repetition.
- [ ] AB is the business brand; Aidan is the coach; training venue/address and independence are consistent in text, metadata, accessible labels, schema, social card and Calendly.
- [ ] Starter £99/two 60-minute sessions, Coaching £180/four sessions per four weeks and Coaching+ £320/eight sessions per four weeks match shared data everywhere. Separate gym membership and free consultation distinction remain prominent.
- [ ] No guaranteed outcomes, invented client history/qualifications/reviews, private-studio claim, alternate training locations or automatic-renewal terms appear.
- [ ] Owner has approved evidence-dependent copy, access instructions and contractual policies. Deferred pages are not linked or in XML.
- [ ] Every commercial page is reachable from navigation/contextual links and has a working consultation CTA. Old useful home fragments still resolve.

### Crawl/index/status behaviour

- [ ] Test the **full compiled Worker fetch path**, not only a direct unit call to the sitemap loader. On production-mode apex requests, XML contains exactly the published manifest with no omitted local page.
- [ ] Resource content types/XML syntax correct; listed URLs are 200, canonical and indexable. No redirected, noindex, query, fragment, API, unknown or unpublished URLs.
- [ ] One crawler-resource implementation per URL; common headers applied appropriately. XML modification dates, if present, reflect actual content changes.
- [ ] HTTP/www/known trailing-slash aliases permanently redirect to HTTPS apex, retaining path/query and avoiding unnecessary chains. Production-only normalisation does not affect staging/API/assets.
- [ ] UTMs do not create new canonicals. Each distinct commercial page self-canonicalises; no blanket home canonical.
- [ ] Unknown/retired paths return genuine 404/410 with helpful content and no canonical. No accidental soft 404 or 200 app fallback.
- [ ] Production indexability requires exact HTTPS apex and explicit flag. Staging and production `workers.dev` remain noindex with no canonical; staging robots disallows and sitemap returns 404/no-store.
- [ ] Server HTML without JavaScript contains meaningful copy, headings, prices, real links, metadata and valid JSON-LD. No hydration-only service information.
- [ ] Check Googlebot/OAI crawler access and no challenge/block under real hosting policy. User-agent-only 200 tests are recorded as limited checks.

### Mobile, accessibility and booking

- [ ] Review 320, 375/390, 768, 1024 and 1440px plus representative physical/mobile browsers; record actual rendered dimensions, not only requested overrides.
- [ ] No document-wide horizontal overflow. Comparison can scroll locally with an obvious cue and usable keyboard access; key offer facts remain readable without swiping.
- [ ] Mobile menu, skip link, focus order, visible focus, contrast, FAQ controls and headings work with keyboard/screen reader. Menus/headers do not obscure content or booking inputs.
- [ ] Calendar flows through date, time, details and confirmation on mobile/desktop without clipped controls or scroll traps. External link, no-availability and blocked-embed fallbacks remain visible and useful.
- [ ] Free duration/place/timezone and non-member access instructions precede booking. Confirm provider and website copy match.
- [ ] Reject optional cookies, block third-party scripts, test slow load and test no-JavaScript fallbacks. Do not assume successful iframe load proves booking usability.
- [ ] On an isolated test provider setup only: verify confirmation/change/cancel/reschedule behaviour and any connected calendar/notification effects. No live appointment is created by an automated staging test.
- [ ] Existing enquiry endpoint's security/idempotency and disabled-notification behaviour remain covered even if the form is not visible. Any restored fallback form retains server validation, accessible errors and saved-versus-booked wording.

### Measurement, performance and safety

- [ ] CTA, calendar view, client scheduled signal, provider booking, enquiry, attendance and paid client are separate. Duplicate browser messages/webhook deliveries/reschedules do not inflate new leads.
- [ ] Confirm static UTM values reach an isolated provider test record; unknown source stays unknown. External-booking completion is reconciled, not inferred from an outbound click.
- [ ] No private booking payloads or personal/health data in analytics, URLs, logs, snapshots or Git. Privacy accurately describes the deployed mechanisms and systems.
- [ ] Run relevant existing enquiry/offer tests plus meaningful integration tests for sitemap routing, host/index gates, canonical aliases and provider-message validation if implemented.
- [ ] Capture mobile lab performance before/after and field data where available. Target good real-user CWV where measurable (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at the 75th percentile); absence of field data is recorded, not passed by assumption. Recheck current guidance when implementation begins. [Google Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals).
- [ ] No secrets, production D1, real customer data, schedules, production domains, production email recipients or live booking side effects in staging.

After any future approved production release, use Search Console URL Inspection/Rich Results Test for representative published pages, submit the correct sitemap and record selected canonicals as they become available. Technical tests passing is not proof Google has indexed the site, ranked it or shown it in AI responses.

## 15. Implementation order and staging deployment plan

This is a future plan. **Do not run it as part of this documentation assignment.** Follow `AGENTS.md` and `web/ENVIRONMENTS.md` if either evolves.

### Phase A — owner evidence and reversible code work

1. Record current branch/SHA, dirty state and worktrees; preserve concurrent work. Re-read safeguards. Use an isolated feature branch based on the current intended staging code. Do not work on `main` or the retired `ab-react-router-landing` branch.
2. Capture current production deployment version/SHA and Cloudflare trigger state read-only. Assert production Worker `ab-personal-training-preview`, branch `main`; staging Worker `ab-personal-training-staging`, branch `develop`; builds rooted at `/web`. Do not infer these from URL health alone.
3. Resolve the owner inputs for booking access, final policies and content evidence. Implement shared SEO facts, sitemap/robots consolidation, host/canonical normalisation, navigation and `/consultation` first. Keep ready pages focused; add beginner content only when it passes its evidence gate.
4. Add page metadata/route manifest/schema and scoped legacy redirects. Keep offers data and existing enquiry/notification system intact. Correct stale operational documentation.

### Phase B — local checks and staging artifact

Use `/web` and the repository-supported Node/runtime versions. Typical validation sequence:

```sh
npm ci --no-audit --no-fund
npm run cf-typegen
npm run typecheck
npm test
npm run build
node scripts/deploy.mjs staging --check
```

These commands are proposed, not executed during the audit. Run a separate production-artifact build/check in clean CI for canonical/resource behaviour:

```sh
npm run build:production
node scripts/deploy.mjs production --check
```

`--check` validates and exits; it must not deploy. Do not reuse that production build directory for development or staging publication. CI should build each environment cleanly. Do not lower the compatibility date to force a local runtime to work. Existing GitHub Actions validate both artifacts and do not publish.

### Phase C — staging publication after implementation is authorised

1. Review the implementation PR into `develop`; Cloudflare Workers Builds is the sole publisher. Its staging pipeline uses `npm run build` followed by **`npm run deploy:staging`**. Do not use bare `npm run deploy`, direct generic Wrangler deploy commands or production build output.
2. Before publication, verify compiled Worker/D1 identity and preserve `INDEXABLE=false`, `NOTIFICATIONS_ENABLED=false`, no custom domains, no cron and no production secrets. Staging D1 is `ab-pt-enquiries-staging` / `7af4c995-22ad-4ecd-9359-eec163d27e45`; production D1 `720c34f0-0a11-4518-9695-142c2635c708` must never be used there.
3. **Isolate booking side effects as well as D1/email.** Current source hard-codes the same Calendly destination for all environments. For implementation staging, gate the embed/direct booking link and any future webhook to safe fixtures or a separate test setup with no real-recipient notifications/calendar effects. A staging noindex flag does not make a real Calendly booking safe. Never copy live bookings into staging.
4. Verify the intended `develop` SHA in Cloudflare's build/deployment metadata, staging URL and public HTML/assets. Check noindex, no canonical, robots disallow and sitemap 404; use local production-artifact tests for production-only XML/canonicals.
5. Exercise synthetic enquiry/measurement fixtures against isolated staging only. If staging D1 is used, verify disabled notification state, zero attempts and no provider reference. Use provider test fixtures for booking events; never submit the live Calendly event as a staging test.
6. Record screenshots with actual viewport/device details, status/canonical matrix, schema validation, test results and known limitations. Confirm production version/SHA and live service did not change during staging work.

### Production release gate — separate future action

Once staging is accepted, a develop-to-main PR can describe the exact reviewed staging SHA and evidence. **Do not merge or deploy production without explicit owner approval in that task.** Preserve normal two-parent merge promotion and the deploy wrapper's target/merge checks. The branch API reported `protected:false` during this audit; the owner should enforce required PRs/checks and blocked force pushes in GitHub before relying on branch controls. No branch settings were changed here.

Future release verification must inspect Cloudflare's deployed source SHA/version, public apex/redirects, indexability, sitemap, schema, booking destination and unchanged production D1/secrets/cron. No DNS/mail change is proposed. For a fault, preserve enquiries/booking records, revert the approved code through review or use a verified prior Worker version on the same production Worker; never reset customer data or point staging at production to recover service.

## 16. Completion boundary for this assignment

Delivered audit findings, proposed final page briefs, intent/internal-link mapping, measurement contract, technical backlog, evidence requirements, acceptance criteria and a staging-only implementation plan. Repository additions are documentation/evidence only. Nothing in this document certifies indexing, future conversion performance, business-profile eligibility, qualifications, legal sufficiency, live provider delivery or guaranteed Google/AI rankings.
