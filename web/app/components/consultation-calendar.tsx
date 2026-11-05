import { useEffect, useRef, useState } from "react";
import { useRouteLoaderData } from "react-router";
import type { loader as rootLoader } from "../root";
import { CONSULTATION_URL, EMAIL_URL } from "../lib/seo";
import { trustedCalendlySignal, signal, hashCalendlyInvitee } from "../lib/measurement";
import {
  readFitHandoff, clearFitHandoff, fitContextRows, calendlyFitSummary,
  type FitHandoff,
} from "../lib/fit-handoff";
import "../consultation-handoff.css";
export { CONSULTATION_URL } from "../lib/seo";

type CalendlyWidget = {
  initInlineWidget(args: {
    url: string;
    parentElement: HTMLElement;
    prefill: { customAnswers: { a1: string } };
  }): void;
};

const EMBED_URL = `${CONSULTATION_URL}?hide_event_type_details=1&embed_domain=aidanbrotherhood.com&embed_type=Inline`;

/**
 * Calendly's one existing optional custom text field is a1.
 * Confirm the field mapping before adding/reordering Calendly questions.
 */
export function ConsultationCalendar() {
  const root = useRouteLoaderData<typeof rootLoader>("root");
  const live = root?.bookingEnabled === true;
  const frame = useRef<HTMLIFrameElement>(null);
  const widgetContainer = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [handoff, setHandoff] = useState<FitHandoff | null>(null);
  const [mode, setMode] = useState<"standard" | "review" | "shared">("standard");
  const [share, setShare] = useState(false);
  const [widgetError, setWidgetError] = useState(false);

  useEffect(() => {
    const item = readFitHandoff();
    if (item) {
      setHandoff(item);
      setMode("review");
    }
    signal("booking_destination_viewed", "/consultation", "page", item?.recommendation || "unsure", {
      fromFit: !!item,
    });
  }, []);

  useEffect(() => {
    if (!live || mode !== "shared" || !handoff || !widgetContainer.current) return;
    const parent = widgetContainer.current;
    let cancelled = false;
    const init = () => {
      if (cancelled) return;
      const Calendly = (window as Window & { Calendly?: CalendlyWidget }).Calendly;
      if (!Calendly) { setWidgetError(true); return; }
      try {
        Calendly.initInlineWidget({
          url: `${CONSULTATION_URL}?hide_event_type_details=1`,
          parentElement: parent,
          prefill: { customAnswers: { a1: calendlyFitSummary(handoff) } },
        });
        // The advanced widget creates and manages its own iframe.
        // Do not leave the loading message indefinitely in this mode.
        setLoaded(true);
      } catch { setWidgetError(true); }
    };
    if ((window as Window & { Calendly?: CalendlyWidget }).Calendly) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.setAttribute("data-calendly-booking", "true");
      script.addEventListener("load", init, { once: true });
      script.addEventListener("error", () => { if (!cancelled) setWidgetError(true); }, { once: true });
      document.body.appendChild(script);
    }
    return () => {
      cancelled = true;
      parent.replaceChildren();
    };
  }, [mode, live, handoff]);

  useEffect(() => {
    if (!live) return;
    const seen = new Set<string>();
    const onMessage = (event: MessageEvent) => {
      const frameWindow = frame.current?.contentWindow ||
        widgetContainer.current?.querySelector("iframe")?.contentWindow;
      const name = trustedCalendlySignal(event, frameWindow);
      if (!name || seen.has(name)) return;
      seen.add(name);
      const fromFit = handoff !== null;
      const offer = handoff?.recommendation || "unsure";
      if (name === "booking_completed_client_signal") {
        void hashCalendlyInvitee(event.data)
          .then((bookingHash) => {
            signal(name, "/consultation", fromFit ? "calendar_fit" : "calendar", offer, { fromFit, bookingHash });
            clearFitHandoff();
          })
          .catch(() => {
            signal(name, "/consultation", fromFit ? "calendar_fit" : "calendar", offer, { fromFit });
            clearFitHandoff();
          });
      } else {
        signal(name, "/consultation", fromFit ? "calendar_fit" : "calendar", offer, { fromFit });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [live, handoff, mode]);

  const preview = (
    <div className="calendar-shell calendar-preview" aria-label="Consultation calendar preview">
      <div className="calendar-topbar"><span>Free · 30 minutes · In person</span></div>
      <div className="calendar-preview-body">
        <span className="preview-label">Staging preview</span>
        <h2>Your consultation starts here.</h2>
        <p>Live appointment booking is disabled in this preview. No calendar is connected and no appointment notifications can be sent.</p>
        <div className="calendar-preview-steps" aria-label="Booking steps">
          <div><span>01</span><strong>Choose a date</strong></div>
          <div><span>02</span><strong>Choose a time</strong></div>
          <div><span>03</span><strong>Confirm your details</strong></div>
        </div>
        <p className="preview-footnote">On the live website, you’ll choose an available appointment with Aidan through Calendly.</p>
      </div>
    </div>
  );

  return (
    <>
      {live && (
        <div className="booking-alternatives">
          <a
            href={CONSULTATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => signal("contact_fallback_clicked", "/consultation", "direct_calendar", handoff?.recommendation || "unsure", { fromFit: !!handoff })}
          >Open Calendly in a new tab ↗</a>
          <a href={EMAIL_URL} onClick={() => signal("contact_fallback_clicked", "/consultation", "email", handoff?.recommendation || "unsure", { fromFit: !!handoff })}>Email Aidan instead ↗</a>
          {handoff && <p className="booking-handoff-direct-note">The separate Calendly link won't pre-fill your Coaching Fit answers.</p>}
        </div>
      )}

      {mode === "review" && handoff && (
        <section className="booking-fit-review" aria-labelledby="booking-fit-review-title">
          <p className="booking-fit-eyebrow">From your Coaching Fit</p>
          <h2 id="booking-fit-review-title">Bring your starting point with you.</h2>
          <p className="booking-fit-intro">
            You can share these preferences with me when you book, so we don't have
            to start from scratch. Sharing is optional and doesn't commit you to a package.
          </p>
          <dl className="booking-fit-summary">
            {fitContextRows(handoff).map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt><dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          <label className="booking-fit-choice">
            <input type="checkbox" checked={share} onChange={(event) => setShare(event.target.checked)} />
            <span><strong>Include my Coaching Fit answers in the booking</strong>
            <small>If selected, this summary will be pre-filled into Calendly's optional preparation question. You can edit it before confirming. Read the <a href="/privacy">privacy notice</a>.</small></span>
          </label>
          <div className="booking-fit-actions">
            <button type="button" className="btn btn-primary" onClick={() => { setLoaded(false); setMode(share && live ? "shared" : "standard"); }}>
              Continue to available times <span aria-hidden="true">→</span>
            </button>
            <button type="button" className="booking-fit-discard" onClick={() => { clearFitHandoff(); setHandoff(null); setMode("standard"); }}>
              Discard these answers
            </button>
          </div>
          <p className="booking-fit-footnote">Your answers are held temporarily in this browser tab for the booking journey. They aren't included in analytics events or the page URL.</p>
        </section>
      )}

      {mode !== "review" && (!live ? preview : (
        <div className="calendar-shell">
          <div className="calendar-topbar">
            <span>Choose your free consultation time</span>
            <span className="calendar-location">JD Gyms Renfrew</span>
          </div>
          {mode === "shared" && handoff && (
            <p className="booking-fit-shared">Your Coaching Fit summary will be pre-filled into Calendly's optional preparation field. You can edit or remove it before confirming your booking.</p>
          )}
          {!loaded && !widgetError && (
            <p className="calendar-loading" role="status">Loading the booking calendar. You can also use the direct booking link above.</p>
          )}
          {mode === "shared" && !widgetError ? (
            <div ref={widgetContainer} className="consultation-calendar-frame booking-advanced-embed" aria-label="Select a consultation time" />
          ) : mode === "shared" && widgetError ? (
            <div className="booking-fit-error" role="alert">
              <strong>The pre-filled calendar couldn't load.</strong>
              <p>You can use the direct Calendly link above, but the summary won't transfer automatically. Your answers will remain available here if you return.</p>
              <button type="button" className="btn btn-outline" onClick={() => { setWidgetError(false); setMode("standard"); }}>Open normal booking calendar</button>
            </div>
          ) : (
            <iframe
              ref={frame}
              className="consultation-calendar-frame"
              title="Select a date and time for your free consultation with Aidan"
              src={EMBED_URL}
              onLoad={() => setLoaded(true)}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )}
          <p className="calendar-fallback">
            Calendar not displaying or no suitable time? <a href={EMAIL_URL}>Email Aidan</a>, or{" "}
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">open Calendly in a new tab ↗</a>.
          </p>
        </div>
      ))}

      <p className="booking-privacy-note">
        Calendly provides this calendar and handles your booking. Please don’t
        include medical or sensitive information. See the{" "}
        <a href="/privacy">privacy notice</a>.
      </p>
    </>
  );
}
