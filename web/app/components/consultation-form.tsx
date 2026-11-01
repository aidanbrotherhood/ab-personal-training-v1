import { useEffect, useRef, useState, type FormEvent } from "react";
import { Arrow } from "./site";
import { plans, type PackageId } from "../lib/offers";
import { readAttribution } from "../lib/attribution";

type Result = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
};
export function ConsultationForm({
  interest,
  onInterestChange,
}: {
  interest: PackageId;
  onInterestChange: (value: PackageId) => void;
}) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [requestId, setRequestId] = useState("");
  const [attribution, setAttribution] = useState("{}");
  const feedback = useRef<HTMLDivElement>(null);
  const sending = useRef(false);
  useEffect(() => {
    setRequestId(crypto.randomUUID());
    setAttribution(
      JSON.stringify(readAttribution(window.location.href, document.referrer)),
    );
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    const form = event.currentTarget;
    setState("sending");
    setErrors({});
    setMessage("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
        signal: AbortSignal.timeout(20000),
      });
      const result = (await response.json()) as Result;
      if (!response.ok || !result.ok) {
        setErrors(result.errors || {});
        setMessage(
          result.message || "Please check your details and try again.",
        );
        setState("error");
      } else {
        setState("success");
        window.dispatchEvent(
          new CustomEvent("ab:consultation-submitted", {
            detail: { package: interest },
          }),
        );
      }
    } catch {
      setMessage(
        "We couldn’t confirm your request. Please try again, or email hello@aidanbrotherhood.com. Retrying this form won’t create a second enquiry.",
      );
      setState("error");
    } finally {
      sending.current = false;
    }
    window.setTimeout(() => feedback.current?.focus(), 0);
  }
  const invalid = (field: string) => ({
    "aria-invalid": errors[field] ? (true as const) : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });
  const error = (field: string) =>
    errors[field] && (
      <span id={`${field}-error`} className="field-error">
        {errors[field]}
      </span>
    );
  return (
    <div className="contact-panel">
      <h3>Request a free consultation</h3>
      <p className="panel-intro">
        I’ll reply by email to arrange a time to talk.
      </p>
      {state === "success" ? (
        <div
          className="form-success"
          ref={feedback}
          tabIndex={-1}
          role="status"
        >
          <span className="success-mark" aria-hidden="true">
            ✓
          </span>
          <h4>Thanks for getting in touch.</h4>
          <p>
            Your enquiry has been saved. I’ll reply by email to arrange your
            free consultation.
          </p>
          <p>You haven’t booked a session or committed to a package.</p>
          <a href="mailto:hello@aidanbrotherhood.com">
            hello@aidanbrotherhood.com <Arrow />
          </a>
        </div>
      ) : (
        <form
          className="enquiry-form"
          action="/api/enquiry"
          method="post"
          onSubmit={submit}
          aria-busy={state === "sending"}
        >
          {state === "error" && (
            <div
              className="form-error"
              ref={feedback}
              role="alert"
              tabIndex={-1}
            >
              <strong>Please check your request.</strong>
              <p>{message}</p>
              <a href="mailto:hello@aidanbrotherhood.com">
                Email Aidan instead <Arrow />
              </a>
            </div>
          )}
          <div className="field">
            <label htmlFor="enquiry-name">Your name</label>
            <input
              id="enquiry-name"
              name="name"
              required
              minLength={2}
              maxLength={120}
              autoComplete="name"
              {...invalid("name")}
            />
            {error("name")}
          </div>
          <div className="field">
            <label htmlFor="enquiry-email">Email address</label>
            <input
              id="enquiry-email"
              type="email"
              name="email"
              required
              maxLength={254}
              autoComplete="email"
              {...invalid("email")}
            />
            {error("email")}
          </div>
          <div className="field">
            <label htmlFor="enquiry-goal">
              What would you like to work on? <span>Optional</span>
            </label>
            <select
              id="enquiry-goal"
              name="goal"
              defaultValue="unsure"
              {...invalid("goal")}
            >
              <option value="unsure">Let’s talk it through</option>
              <option value="fat-loss">Losing body fat</option>
              <option value="strength">Building strength or muscle</option>
              <option value="confidence">Gym confidence and consistency</option>
            </select>
            {error("goal")}
          </div>
          <div className="field">
            <label htmlFor="enquiry-member">JD Gyms Renfrew membership</label>
            <select
              id="enquiry-member"
              name="membership"
              required
              defaultValue=""
              {...invalid("membership")}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="yes">I’m already a member</option>
              <option value="joining">I’m happy to join</option>
              <option value="no">I’d like to discuss this</option>
            </select>
            {error("membership")}
          </div>
          <div className="field">
            <label htmlFor="enquiry-package">
              Coaching option <span>Optional</span>
            </label>
            <select
              id="enquiry-package"
              name="package_interest"
              value={interest}
              onChange={(event) =>
                onInterestChange(event.target.value as PackageId)
              }
              {...invalid("package_interest")}
            >
              <option value="unsure">I’m not sure yet</option>
              {plans.map((plan) => (
                <option value={plan.id} key={plan.id}>
                  {plan.title} — {plan.price}
                  {plan.id === "introduction" ? " one-off" : " / four weeks"}
                </option>
              ))}
            </select>
            {error("package_interest")}
          </div>
          <div className="field">
            <label htmlFor="enquiry-availability">
              Usual days or times <span>Optional</span>
            </label>
            <input
              id="enquiry-availability"
              name="availability"
              maxLength={300}
              placeholder="e.g. Weekday evenings"
              {...invalid("availability")}
            />
            {error("availability")}
          </div>
          <input type="hidden" name="request_id" value={requestId} />
          <input type="hidden" name="attribution" value={attribution} />
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="enquiry-website">Leave this field empty</label>
            <input
              id="enquiry-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <label className="consent-check">
            <input
              type="checkbox"
              name="consent"
              value="yes"
              required
              {...invalid("consent")}
            />
            <span>
              Please contact me about my enquiry. I’ve read the{" "}
              <a href="/privacy">privacy notice</a>.
            </span>
          </label>
          {error("consent")}
          <button
            type="submit"
            disabled={state === "sending"}
            className="btn btn-primary btn-full"
          >
            {state === "sending"
              ? "Sending your request…"
              : "Request a free consultation"}
            <Arrow />
          </button>
          <p className="booking-note">
            This is an enquiry, not an instant booking. Please don’t include
            medical or sensitive personal information.
          </p>
        </form>
      )}
    </div>
  );
}
