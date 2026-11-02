import type { Route } from "./+types/robots";
import { envContext } from "../lib/context";
import { isIndexableProduction, SITE_ORIGIN } from "../lib/seo";

export function loader({ request, context }: Route.LoaderArgs) {
  const env = context.get(envContext);
  const production = isIndexableProduction(request, env);

  const content = production
    ? [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
      ].join("\n")
    : ["User-agent: *", "Disallow: /"].join("\n");

  return new Response(content + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
