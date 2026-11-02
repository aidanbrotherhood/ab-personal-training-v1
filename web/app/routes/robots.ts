import type { Route } from "./+types/robots";
import { envContext } from "../lib/context";

export function loader({ request, context }: Route.LoaderArgs) {
  const origin = new URL(request.url).origin;
  const env = context.get(envContext);
  const production = origin === "https://aidanbrotherhood.com" && String(env.INDEXABLE) === "true";

  const content = production
    ? [
        "User-agent: *",
        "Allow: /",
        "",
        "Sitemap: https://aidanbrotherhood.com/sitemap.xml",
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
