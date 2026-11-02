import { useEffect, useRef, useState } from "react";
import { useRouteLoaderData } from "react-router";
import type { loader as rootLoader } from "../root";
import { CONSULTATION_URL, EMAIL_URL } from "../lib/seo";
import { trustedCalendlySignal, signal } from "../lib/measurement";
export { CONSULTATION_URL } from "../lib/seo";

export function ConsultationCalendar() {
  const root = useRouteLoaderData<typeof rootLoader>("root");
  const live = root?.bookingEnabled === true;
  const frame = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    signal("booking_destination_viewed", "/consultation", "page");
    if (!live) return;
    const seen = new Set<string>();
    const onMessage = (event: MessageEvent) => {
      const name = trustedCalendlySignal(event, frame.current?.contentWindow);
      if (name && !seen.has(name)) {
        seen.add(name);
        signal(name, "/consultation", "calendar");
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [live]);
  if (!live)
    return (
      <div
        className="calendar-shell calendar-preview"
        aria-label="Consultation calendar preview"
      >
        <div className="calendar-topbar">
          <span>Free · 30 minutes · In person</span>
        </div>
        <div className="calendar-preview-body">
          <span className="preview-label">Staging preview</span>
          <h2>Your consultation starts here.</h2>
          <p>
            Live appointment booking is disabled in this preview. No calendar is
            connected and no appointment notifications can be sent.
          </p>
          <div className="calendar-preview-steps" aria-label="Booking steps">
            <div>
              <span>01</span>
              <strong>Choose a date</strong>
            </div>
            <div>
              <span>02</span>
              <strong>Choose a time</strong>
            </div>
            <div>
              <span>03</span>
              <strong>Confirm your details</strong>
            </div>
          </div>
          <p className="preview-footnote">
            On the live website, you’ll choose an available appointment with
            Aidan through Calendly.
          </p>
        </div>
      </div>
    );
  const embedUrl = `${CONSULTATION_URL}?hide_event_type_details=1&embed_domain=aidanbrotherhood.com&embed_type=Inline`;
  return (
    <>
      <div className="booking-alternatives">
        <a
          href={CONSULTATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            signal(
              "contact_fallback_clicked",
              "/consultation",
              "direct_calendar",
            )
          }
        >
          Open Calendly in a new tab ↗
        </a>
        <a
          href={EMAIL_URL}
          onClick={() =>
            signal("contact_fallback_clicked", "/consultation", "email")
          }
        >
          Email Aidan instead ↗
        </a>
      </div>
      <div className="calendar-shell">
        <div className="calendar-topbar">
          <span>Choose your free consultation time</span>
          <span className="calendar-location">JD Gyms Renfrew</span>
        </div>
        {!loaded && (
          <p className="calendar-loading" role="status">
            Loading the booking calendar. You can also use the direct booking
            link above.
          </p>
        )}
        <iframe
          ref={frame}
          className="consultation-calendar-frame"
          title="Select a date and time for your free consultation with Aidan"
          src={embedUrl}
          onLoad={() => setLoaded(true)}
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <p className="calendar-fallback">
          Calendar not displaying or no suitable time?{" "}
          <a href={EMAIL_URL}>Email Aidan</a>, or{" "}
          <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
            open Calendly in a new tab ↗
          </a>
          .
        </p>
      </div>
      <p className="booking-privacy-note">
        Calendly provides this calendar and handles your booking. Please don’t
        include medical or sensitive information. See the{" "}
        <a href="/privacy">privacy notice</a>.
      </p>
    </>
  );
}
