import type { Route } from "./+types/sitemap";
import { envContext } from "../lib/context";
import { publicPages } from "../lib/public-pages";
import { isIndexableProduction, SITE_ORIGIN, xmlEscape } from "../lib/seo";

/** Only production publishes canonical, indexable URLs. */
export function loader({ request, context }: Route.LoaderArgs) {
  const env = context.get(envContext);
  const production = isIndexableProduction(request, env);
  if (!production) {
    return new Response("Not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  const urls = publicPages.map((page) => `${SITE_ORIGIN}${page.path}`);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${xmlEscape(url)}</loc></url>`),
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
