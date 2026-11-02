import { Arrow } from "./site";

export const CONSULTATION_BOOKING_URL =
  "https://calendly.com/hello-aidanbrotherhood/free-personal-training-consultation";

type BookingPanelProps = {
  open: boolean;
  onOpen: () => void;
  onEnquiry: () => void;
};

export function BookingPanel({
  open,
  onOpen,
  onEnquiry,
}: BookingPanelProps) {
  return (
    <div className="booking-panel">
      <p className="booking-eyebrow">Free initial appointment</p>
      <h3>Meet Aidan at JD Gyms Renfrew.</h3>
      <p className="booking-intro">
        Choose a 30-minute time to discuss your goals, your training so far and
        what you&apos;d like to improve. Where appropriate, we can look at a
        few basic movements together. No obligation to sign up.
      </p>
      <ul className="booking-facts" aria-label="Consultation details">
        <li>30 minutes</li>
        <li>In person</li>
        <li>Free</li>
      </ul>
      <button
        className="btn btn-primary booking-trigger"
        type="button"
        onClick={onOpen}
        aria-expanded={open}
        aria-controls="calendly-booking"
      >
        {open ? "Choose your time below" : "See available appointments"}
        <Arrow />
      </button>
      {open && (
        <div id="calendly-booking" className="booking-embed">
          <iframe
            title="Book a free personal training consultation with Aidan"
            src={CONSULTATION_BOOKING_URL}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}
      <p className="booking-external">
        {open ? "Calendar not displaying?" : "Prefer to open the calendar directly?"}{" "}
        <a
          href={CONSULTATION_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Calendly <Arrow />
        </a>
      </p>
      <div className="booking-alternative">
        <p>Can&apos;t find a time that suits you, or have a question first?</p>
        <a href="#enquiry" onClick={onEnquiry} className="inline-link">
          Send a quick enquiry <Arrow />
        </a>
      </div>
      <p className="booking-privacy">
        The booking calendar is provided by Calendly and only loads here when
        you select it. See our <a href="/privacy">privacy notice</a> for details.
      </p>
    </div>
  );
}
