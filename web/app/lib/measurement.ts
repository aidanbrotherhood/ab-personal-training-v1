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
/** Ephemeral integration points only: no storage, network, vendor or personal payloads. */
export function signal(
  event: MeasurementEvent,
  page: string,
  placement: string,
  offer?: string,
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("ab:measurement", {
      detail: {
        event,
        page,
        placement,
        ...(offer && packageIds.includes(offer) ? { package: offer } : {}),
      },
    }),
  );
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
