# Deployment environments

| Environment | Branch | Worker | D1 | Notifications | Indexing |
| --- | --- | --- | --- | --- | --- |
| Production | main | ab-personal-training-preview | ab-pt-enquiries / 720c34f0-0a11-4518-9695-142c2635c708 | Existing Resend secret and */5 cron | Apex only |
| Staging | develop | ab-personal-training-staging | ab-pt-enquiries-staging / 7af4c995-22ad-4ecd-9359-eec163d27e45 | Disabled flag, no secret, no cron | Always noindex |

Production: https://aidanbrotherhood.com. Staging: https://ab-personal-training-staging.aidanbrotherhood.workers.dev. The old workers.dev URL belongs to production, not staging. The retired ab-react-router-landing branch no longer deploys.

Cloudflare Workers Builds is the sole publisher. Both triggers use root /web and run install, type generation, TypeScript, tests and build before deploying. Staging uses `npm run build` then `npm run deploy:staging`. Production uses `npm run build:production` then `npm run deploy:production`. The Vite plugin selects the production environment at BUILD time with CLOUDFLARE_ENV=production, not a deploy-time --env flag. The deploy wrapper verifies the compiled Worker name, D1 ID, flags, routes and crons before invoking Wrangler. Bare `npm run deploy` fails; a default build/Wrangler deployment targets staging. Do not reuse a production build directory for development.

GitHub Actions validates both environment artifacts on pushes and PRs to main/develop. It never deploys. Cloudflare does its own blocking validation as well; no competing GitHub deployment workflow exists.

## Promotion

1. Implement on a feature branch; validate, then merge into develop.
2. Wait for the develop SHA's Cloudflare staging build. Check its URL, noindex, form persistence, and disabled notification row. Confirm production's version did not change.
3. Open a develop -> main PR, recording the reviewed staging SHA and checks. Obtain explicit user production approval. Do not bundle unrelated visual changes into an infrastructure promotion.
4. Merge the PR normally (no force push). The main push triggers production's blocking checks/build/deploy. Verify Cloudflare's commit metadata, Worker version and the public domain, canonical, D1/secret/cron bindings.
5. Merge main back into develop as needed so future promotion PRs have a clear history. Feature code can stay on develop until approved; do not merge it into main merely to synchronise branches.

The connected GitHub App cannot administer branch protections. The PR/approval process is auditable but direct pushes to main are not server-enforced by this integration. The owner should enable required PRs, required `validate (staging)` and `validate (production)` checks, and block force pushes in GitHub branch rules. Codex instructions in root AGENTS.md prohibit unapproved production changes. Repository default branch stays main.

## Data and notifications

Apply web/migrations/*.sql only to the intended environment using its explicit D1 UUID. Never copy production customer data or secrets to staging. Staging creates notification rows with state=disabled; the notification processor returns before database/network work unless NOTIFICATIONS_ENABLED=true. This is independent of whether a secret accidentally exists. Staging has no scheduled triggers and no production domain mappings.

## Rollback

Before migration production commit was 1f53edb6c96415af4d0bb123c8964060d30bd381, Worker version 04de59aa-f9c3-468f-8772-3f57293eda74, trigger ce412dbd-cc88-4335-bd1a-8e315a80a0fc on ab-react-router-landing, build `npm install --no-audit --no-fund && npm run build`, deploy `npx wrangler deploy`. The live domain mappings are unchanged.

For a code incident, deploy the last known-good version to the SAME production Worker through Cloudflare version rollback, preserving all bindings/secrets and cron. Prefer reverting the approved main change in a new PR and letting the main pipeline deploy. Never roll back customer data or reset queue records. Keep staging separate.

For a pipeline incident, leave the current healthy production version serving; repair the main-only trigger. Do not reconnect the retired development branch automatically. Emergency reversion to its prior trigger configuration requires explicit production approval and a verified known-good SHA. No DNS rollback is needed for this environment split.

Cloudflare build details show source branch/SHA, command, result and version. Inspect Workers deployments for the current version; a green GitHub check alone is not deployment proof.
