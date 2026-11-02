# AB Personal Training deployment boundaries

The active React Router app is `/web`. Root Astro files are legacy and retained for history; do not deploy them.

- Work on feature branches or `develop`. Pushes to `develop` deploy ONLY staging.
- `main` is production. Never push, merge or deploy to main without explicit user approval for production promotion in the current task.
- Open a develop-to-main PR after staging validation. Record the staging SHA and test evidence; merge only after explicit production approval.
- `ab-react-router-landing` is retired and has no automatic deployment trigger. Do not use it for new work.
- Bare build targets staging. Bare npm deploy intentionally fails. Use explicit build/deploy scripts in web/README.md.
- Never give staging the production D1 ID, Resend secret, production domains, or retry cron.
- Production Worker is still named ab-personal-training-preview. It is the live business system. Preserve its domains, D1, secrets, queue and cron.
