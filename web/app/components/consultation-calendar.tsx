export const CONSULTATION_URL =
  "https://calendly.com/hello-aidanbrotherhood/free-personal-training-consultation";

/**
 * Full-width, inline scheduling, loaded lazily when the booking section enters
 * the viewport. No duplicate enquiry form and no custom calendar API.
 */
export function ConsultationCalendar() {
  return (
    <div className="calendar-shell">
      <div className="calendar-topbar">
        <span className="calendar-live" aria-hidden="true" />
        <span>Free · 30 minutes · In person</span>
        <span className="calendar-location">JD Gyms Renfrew</span>
      </div>
      <iframe
        className="consultation-calendar-frame"
        title="Select a date and time for your free consultation with Aidan"
        src={CONSULTATION_URL}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <p className="calendar-fallback">
        Having trouble seeing the calendar?{" "}
        <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
          Open booking in a new tab ↗
        </a>
      </p>
    </div>
  );
}
