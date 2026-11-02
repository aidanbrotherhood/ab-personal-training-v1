import { createRequestHandler, RouterContextProvider } from "react-router";
import { envContext } from "../app/lib/context";
import { processNotifications } from "./notifications";
import { handleEnquiry } from "./enquiry";

const handler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.hostname === "www.aidanbrotherhood.com") {
      url.hostname = "aidanbrotherhood.com";
      url.protocol = "https:";
      return Response.redirect(url.toString(), 308);
    }
    if (url.pathname === "/api/enquiry")
      return handleEnquiry(request, env, ctx);
    const indexable =
      String(env.INDEXABLE) === "true" &&
      url.origin === "https://aidanbrotherhood.com";
    if (url.pathname === "/robots.txt")
      return new Response(
        indexable
          ? "User-agent: *\nAllow: /\nSitemap: https://aidanbrotherhood.com/sitemap.xml\n"
          : "User-agent: *\nDisallow: /\n",
        { headers: { "Content-Type": "text/plain; charset=utf-8" } },
      );
    if (url.pathname === "/sitemap.xml" && indexable)
      return new Response(
        '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://aidanbrotherhood.com/</loc></url><url><loc>https://aidanbrotherhood.com/privacy</loc></url></urlset>',
        { headers: { "Content-Type": "application/xml; charset=utf-8" } },
      );
    const context = new RouterContextProvider();
    context.set(envContext, env);
    const response = await handler(request, context);
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=()",
    );
    response.headers.set("X-Frame-Options", "DENY");
    if (!indexable) response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  },
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(processNotifications(env));
  },
} satisfies ExportedHandler<Env>;
