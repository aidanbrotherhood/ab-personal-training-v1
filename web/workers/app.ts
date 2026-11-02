import { createRequestHandler, RouterContextProvider } from "react-router";
import { envContext } from "../app/lib/context";
import { processNotifications } from "./notifications";
import { handleEnquiry } from "./enquiry";
import { canonicalRedirect, isIndexableProduction } from "../app/lib/seo";

const handler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const redirect = canonicalRedirect(request);
    if (redirect) return Response.redirect(redirect, 308);
    const indexable = isIndexableProduction(request, env);
    const context = new RouterContextProvider();
    context.set(envContext, env);
    const response =
      url.pathname === "/api/enquiry"
        ? await handleEnquiry(request, env, ctx)
        : await handler(request, context);
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=()",
    );
    response.headers.set("X-Frame-Options", "DENY");
    if (!indexable || response.status >= 400 || url.pathname === "/api/enquiry")
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  },
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(processNotifications(env));
  },
} satisfies ExportedHandler<Env>;
