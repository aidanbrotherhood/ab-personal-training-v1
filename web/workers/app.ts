import { createRequestHandler, RouterContextProvider } from "react-router";
import { envContext } from "../app/lib/context";
import { processNotifications } from "./notifications";
import { handleEnquiry } from "./enquiry";
import { handleFunnelEvent } from "./funnel";
import { canonicalRedirect, isIndexableProduction, legacyPageDestination } from "../app/lib/seo";

const handler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const redirect = canonicalRedirect(request);
    if (redirect)
      return Response.redirect(
        redirect,
        legacyPageDestination(url.pathname) ? 301 : 308,
      );
    const indexable = isIndexableProduction(request, env);
    const context = new RouterContextProvider();
    context.set(envContext, env);
    const response =
      url.pathname === "/api/enquiry"
        ? await handleEnquiry(request, env, ctx)
        : url.pathname === "/api/funnel-event"
          ? await handleFunnelEvent(request, env)
          : await handler(request, context);
    response.headers.set("X-Content-Type-Options", "nosniff");
    if (!response.headers.has("Referrer-Policy"))
      response.headers.set(
        "Referrer-Policy",
        "strict-origin-when-cross-origin",
      );
    response.headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=()",
    );
    response.headers.set("X-Frame-Options", "DENY");
    if (!indexable || response.status >= 400 || url.pathname.startsWith("/api/"))
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  },
  async scheduled(event, env, ctx) {
    ctx.waitUntil(processNotifications(env));
    // Retain aggregate funnel events for no more than 12 months.
    // Run only once daily within the existing five-minute cron schedule.
    const scheduled = new Date(event.scheduledTime);
    if (scheduled.getUTCHours() === 2 && scheduled.getUTCMinutes() === 0) {
      ctx.waitUntil(
        env.ENQUIRIES.prepare(
          "DELETE FROM funnel_events WHERE created_at < datetime('now', '-365 days')",
        ).run().catch(() => {
          console.error(JSON.stringify({ event: "funnel_retention_cleanup_failed" }));
        }),
      );
    }
  },
} satisfies ExportedHandler<Env>;
