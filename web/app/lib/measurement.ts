import { packageIds } from "./offers";

export type MeasurementEvent =
  | "consultation_cta_clicked"
  | "booking_destination_viewed"
  | "booking_calendar_viewed"
  | "booking_time_selected"
  | "booking_completed_client_signal"
  | "contact_fallback_clicked"
  | "coaching_fit_started"
  | "coaching_fit_completed"
  | "coaching_fit_reset";
export type FunnelMetadata = { fromFit?: boolean; bookingHash?: string };

/** A tiny first-party endpoint receives anonymous event categories, never questionnaire responses. */
function deliverEvent(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);
  if (body.length > 1200) return;
  try {
    const blob = new Blob([body], { type: "application/json" });
    if (typeof navigator !== "undefined" && navigator.sendBeacon?.("/api/funnel-event", blob))
      return;
    void fetch("/api/funnel-event", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {/* Measurement failures never block navigation or booking. */});
  } catch { /* Graceful degradation when browser measurement is unavailable. */ }
}

/** Public anonymous signal. Do not add names, emails, budgets or other individual answers. */
export function signal(
  event: MeasurementEvent,
  page: string,
  placement: string,
  offer?: string,
  meta?: FunnelMetadata,
) {
  if (typeof window === "undefined") return;
  const packageId = offer && packageIds.includes(offer) ? offer : undefined;
  window.dispatchEvent(new CustomEvent("ab:measurement", {
    detail: { event, page, placement, ...(packageId ? { package: packageId } : {}) },
  }));
  deliverEvent({
    event, page, placement,
    ...(packageId ? { packageId } : {}),
    ...(meta?.fromFit ? { fromFit: true } : {}),
    ...(event === "booking_completed_client_signal" && meta?.bookingHash
      ? { bookingHash: meta.bookingHash } : {}),
  });
}

/** Hash a Calendly invitee reference for duplicate prevention, never upload the raw URI. */
export async function hashCalendlyInvitee(data: unknown): Promise<string | undefined> {
  if (!data || typeof data !== "object" || !("payload" in data)) return;
  const payload = data.payload;
  if (!payload || typeof payload !== "object" || !("invitee" in payload)) return;
  const invitee = payload.invitee;
  if (!invitee || typeof invitee !== "object" || !("uri" in invitee)) return;
  const uri = invitee.uri;
  if (typeof uri !== "string" ||
      !/^https:\/\/api\.calendly\.com\/scheduled_events\/[a-f0-9-]+\/invitees\/[a-f0-9-]+$/i.test(uri))
    return;
  if (!crypto?.subtle) return;
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(uri));
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function calendlySignal(data: unknown): MeasurementEvent | null {
  if (!data || typeof data !== "object" || !("event" in data)) return null;
  switch (data.event) {
    case "calendly.event_type_viewed":
      return "booking_calendar_viewed";
    case "calendly.date_and_time_selected":
      return "booking_time_selected";
    case "calendly.event_scheduled":
      return "booking_completed_client_signal";
    default:
      return null;
  }
}

export function trustedCalendlySignal(
  event: { origin: string; source: unknown; data: unknown },
  frameWindow: unknown,
): MeasurementEvent | null {
  if (
    !frameWindow ||
    event.origin !== "https://calendly.com" ||
    event.source !== frameWindow
  )
    return null;
  return calendlySignal(event.data);
}
