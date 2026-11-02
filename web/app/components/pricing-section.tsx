import { Arrow } from "./site";
import { getPerSessionRate, plans } from "../lib/offers";

type PricingSectionProps = {
  variant: "home" | "renfrew";
};

const differences = [
  { label: "60-minute one-to-one sessions", values: ["2, one-off", "4 per four weeks", "8 per four weeks"] },
  { label: "Initial training plan / assessment", values: ["Included", "Included", "Included"] },
  { label: "Ongoing personalised programming", values: ["Not included", "Included", "Included"] },
  { label: "Practical nutrition guidance", values: ["Not included", "Included", "Included"] },
  { label: "Weekly check-in and progress review", values: ["Not included", "Included", "Included"] },
  { label: "In-person coaching frequency", values: ["Introductory sessions", "Once weekly", "Twice weekly"] },
] as const;

/** Identical products, disclosures and decision hierarchy on all public pricing surfaces. */
export function PricingSection({ variant }: PricingSectionProps) {
  const isRenfrew = variant === "renfrew";
  const sectionId = isRenfrew ? "prices" : "coaching";
  const headingId = isRenfrew ? "prices-title" : "coaching-title";
  const consultationUrl = isRenfrew ? "/#consultation" : "#consultation";

  return (
    <section
      id={sectionId}
      className={`offer-section offer-section--${variant} section-pad`}
      aria-labelledby={headingId}
    >
      <div className="container">
        <div className="offer-heading">
          <div>
            <p className="offer-eyebrow">{isRenfrew ? "PERSONAL TRAINING PRICES · RENFREW" : "WORK WITH ME"}</p>
            <h2 id={headingId}>The right support makes all the difference.</h2>
          </div>
          <div className="offer-introduction">
            <p>
              A good programme is only part of the picture. It’s knowing what to do,
              understanding why you’re doing it, and having someone help you keep moving forward.
            </p>
            <p className="offer-introduction-note">
              Start with a free 30-minute consultation. Then choose the level of coaching that fits.
            </p>
          </div>
        </div>

        <div className="offer-grid" aria-label="Personal training packages">
          {plans.map((plan) => {
            const featured = plan.id === "weekly";
            return (
              <article
                key={plan.id}
                className={`offer-card offer-card--${plan.id}${featured ? " offer-card--featured" : ""}`}
                aria-labelledby={`offer-${variant}-${plan.id}`}
              >
                <div className="offer-card-topline">
                  <span className="offer-card-eyebrow">{plan.eyebrow}</span>
                  {featured && <span className="offer-card-recommendation">Recommended for consistency</span>}
                </div>
                <div className="offer-card-identity">
                  <h3 id={`offer-${variant}-${plan.id}`}>{plan.title}</h3>
                  <p className="offer-card-tagline">{plan.tagline}</p>
                </div>
                <p className="offer-card-description">{plan.description}</p>
                <div className="offer-card-financial">
                  <p className="offer-card-amount">{plan.price}</p>
                  <p className="offer-card-period">{plan.period}</p>
                </div>
                <div className="offer-card-session">
                  <strong>{plan.sessions} × 60-minute one-to-one sessions</strong>
                  <span>{plan.frequency}</span>
                </div>
                <div className="offer-card-benefits">
                  <p className="offer-card-benefits-title">What you get</p>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <span className="offer-check" aria-hidden="true">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer-card-bottom">
                  <p className="offer-card-best-for">{plan.bestFor}</p>
                  <a
                    href={consultationUrl}
                    className={`btn offer-card-cta${featured ? " btn-primary" : " btn-outline"}`}
                    data-offer-id={plan.id}
                    data-offer-name={plan.title}
                  >
                    Book a free consultation <Arrow />
                  </a>
                  <p className="offer-card-cta-note">Free · 30 minutes · No obligation</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="offer-bridge" aria-label="Choosing the right level of coaching">
          <div className="offer-bridge-label">
            <span className="offer-bridge-number">01 / 03</span>
            <span>MORE THAN A SESSION</span>
          </div>
          <h3>Starter helps you begin. <span>Coaching gives you a plan to keep going.</span></h3>
          <p>
            With ongoing Coaching, you’re not just buying an appointment. You have a personalised
            programme for the days you train independently, practical nutrition guidance and regular
            progress reviews. Coaching+ adds a second coached session each week.
          </p>
        </div>

        <div className="offer-compare" aria-labelledby={`offer-compare-${variant}`}>
          <div className="offer-compare-header">
            <div>
              <p className="offer-compare-eyebrow">AT A GLANCE</p>
              <h3 id={`offer-compare-${variant}`}>See what changes between plans.</h3>
            </div>
            <p>Same evidence-informed approach. Different levels of ongoing support.</p>
          </div>
          <div className="offer-compare-scroll" role="region" aria-label="Coaching package feature comparison" tabIndex={0}>
            <table className="offer-compare-table">
              <thead>
                <tr>
                  <th scope="col">Included support</th>
                  {plans.map((plan) => (
                    <th key={plan.id} scope="col" className={plan.id === "weekly" ? "offer-compare-featured" : ""}>{plan.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {differences.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.values.map((value, index) => (
                      <td key={index} className={index === 1 ? "offer-compare-featured" : ""}>
                        <span className={value === "Not included" ? "offer-compare-unavailable" : ""}>{value}</span>
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="offer-compare-rate-row">
                  <th scope="row">Effective rate per coached session</th>
                  {plans.map((plan) => (
                    <td key={plan.id} className={plan.id === "weekly" ? "offer-compare-featured" : ""}>
                      {getPerSessionRate(plan)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="offer-compare-scroll-note">On smaller screens, swipe across to compare all plans.</p>
        </div>

        <div className="offer-terms">
          <p><strong>Free consultation first.</strong> A 30-minute conversation, not a training package. Starter is a separate £99 purchase for two full sessions.</p>
          <p><strong>Clear, four-week pricing.</strong> Coaching and Coaching+ are sold in four-week blocks, not calendar months. Thirteen four-week periods make 52 weeks; no 12-week minimum is required.</p>
          <p><strong>Gym access is separate.</strong> All paid coaching takes place at JD Gyms Renfrew and requires a valid JD Gyms membership, purchased separately. AB Personal Training is an independent service.</p>
        </div>
      </div>
    </section>
  );
}
