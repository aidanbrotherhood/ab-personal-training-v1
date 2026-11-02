import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
const target = process.argv[2];
const expected = {
  staging: {
    name: "ab-personal-training-staging",
    db: "7af4c995-22ad-4ecd-9359-eec163d27e45",
  },
  production: {
    name: "ab-personal-training-preview",
    db: "720c34f0-0a11-4518-9695-142c2635c708",
  },
}[target];
if (!expected) throw Error("An explicit deployment target is required");
const config = JSON.parse(readFileSync("build/server/wrangler.json", "utf8"));
if (
  config.name !== expected.name ||
  config.d1_databases?.length !== 1 ||
  config.d1_databases[0].database_id !== expected.db
)
  throw Error("Built Worker or database does not match deployment target");
if (
  target === "staging" &&
  (config.routes?.length ||
    config.triggers?.crons?.length ||
    config.vars?.NOTIFICATIONS_ENABLED !== "false" ||
    config.vars?.INDEXABLE !== "false")
)
  throw Error("Unsafe staging artifact");
if (
  target === "production" &&
  (config.vars?.NOTIFICATIONS_ENABLED !== "true" ||
    config.vars?.INDEXABLE !== "true" ||
    !config.triggers?.crons?.includes("*/5 * * * *"))
)
  throw Error("Incomplete production configuration");
console.log(
  JSON.stringify({
    target,
    worker: config.name,
    commit: spawnSync("git", ["rev-parse", "HEAD"], {
      encoding: "utf8",
    }).stdout.trim(),
  }),
);
if (process.argv.includes("--check")) process.exit(0);
const result = spawnSync("npx", ["wrangler", "deploy"], { stdio: "inherit" });
process.exit(result.status ?? 1);
