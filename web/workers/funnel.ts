import { packageIds } from "../app/lib/offers";

const acceptedEvents = new Set([
  "coaching_fit_started", "coaching_fit_completed", "coaching_fit_reset",
  "consultation_cta_clicked", "booking_destination_viewed",
  "booking_calendar_viewed", "booking_time_selected",
  "booking_completed_client_signal", "contact_fallback_clicked",
]);
type FunnelEnv = Env & {
  FUNNEL_LIMITER?: { limit(args: { key: string }): Promise<{ success: boolean }> };
};

function reply(status: number, ok: boolean) {
  return Response.json({ ok }, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
      ...(status === 429 ? { "Retry-After": "60" } : {}),
    },
  });
}

/** Bounded JSON parsing prevents oversized bodies even without Content-Length. */
async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  if (!request.body) return null;
  const reader = request.body.getReader();
  const buffers: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 1200) { await reader.cancel(); return null; }
      buffers.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const buffer of buffers) {
    bytes.set(buffer, offset);
    offset += buffer.length;
  }
  try {
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed as Record<string, unknown> : null;
  } catch { return null; }
}

/**
 * First-party aggregate conversion recording.
 * No names, emails, IP addresses, user agents, raw URLs or Coaching Fit answers.
 * The optional booking_hash is the SHA-256 of a Calendly invitee URI,
 * not the URI itself; it deduplicates client-reported booking events.
 */
export async function handleFunnelEvent(request: Request, env: FunnelEnv): Promise<Response> {
  if (request.method !== "POST") return reply(405, false);
  const contentType = request.headers.get("Content-Type") || "";
  if (!/^application\/json(?:;|$)/i.test(contentType)) return reply(415, false);
  if (Number(request.headers.get("Content-Length") || "0") > 1200) return reply(413, false);
  try {
    const origin = request.headers.get("Origin");
    if (!origin || new URL(origin).origin !== new URL(request.url).origin ||
        request.headers.get("Sec-Fetch-Site") === "cross-site")
      return reply(403, false);
  } catch { return reply(403, false); }

  const payload = await readBody(request);
  if (!payload) return reply(400, false);
  const allowedFields = new Set(["event", "page", "placement", "packageId", "fromFit", "bookingHash"]);
  if (Object.keys(payload).some((key) => !allowedFields.has(key))) return reply(422, false);
  const { event, page, placement, packageId, fromFit, bookingHash } = payload;
  if (typeof event !== "string" || !acceptedEvents.has(event) ||
      typeof page !== "string" || !/^\/[a-z0-9/_-]{0,96}$/.test(page) ||
      typeof placement !== "string" || !/^[a-z0-9_-]{1,72}$/.test(placement) ||
      (packageId !== undefined && (typeof packageId !== "string" || !packageIds.includes(packageId))) ||
      (fromFit !== undefined && typeof fromFit !== "boolean") ||
      (bookingHash !== undefined &&
        (event !== "booking_completed_client_signal" ||
         typeof bookingHash !== "string" || !/^[a-f0-9]{64}$/.test(bookingHash))))
    return reply(422, false);

  if (!env.FUNNEL_LIMITER) return reply(503, false);
  try {
    const limit = await env.FUNNEL_LIMITER.limit({
      key: request.headers.get("CF-Connecting-IP") || "unknown",
    });
    if (!limit.success) return reply(429, false);
    await env.ENQUIRIES.prepare(
      "INSERT OR IGNORE INTO funnel_events (event_id,event_type,page,placement,package_id,from_coaching_fit,booking_hash) VALUES (?,?,?,?,?,?,?)",
    ).bind(
      crypto.randomUUID(),
      event, page, placement,
      typeof packageId === "string" ? packageId : null,
      fromFit === true ? 1 : 0,
      typeof bookingHash === "string" ? bookingHash : null,
    ).run();
    return reply(200, true);
  } catch {
    console.error(JSON.stringify({ event: "funnel_record_failed" }));
    return reply(503, false);
  }
}
