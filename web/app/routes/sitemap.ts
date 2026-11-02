import type { Route } from "./+types/sitemap";
import { envContext } from "../lib/context";

/** Only production publishes canonical, indexable URLs. */
export function loader({ request, context }: Route.LoaderArgs) {
  const origin = new URL(request.url).origin;
  const env = context.get(envContext);
  const production = origin === "https://aidanbrotherhood.com" && String(env.INDEXABLE) === "true";
  if (!production) {
    return new Response("Not found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const urls = [
    "https://aidanbrotherhood.com/",
    "https://aidanbrotherhood.com/personal-training-renfrew",
  ];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${url}</loc></url>`),
    '</urlset>',
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
