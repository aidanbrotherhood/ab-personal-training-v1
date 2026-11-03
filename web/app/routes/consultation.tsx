import { ConsultationCalendar } from "../components/consultation-calendar";
import { Arrow, Breadcrumb, PageShell } from "../components/site";
import { EMAIL_URL } from "../lib/seo";

export default function Consultation() {
  return (
    <PageShell className="consultation-page">
      <Breadcrumb label="Free consultation" />
      <section className="consultation-opening">
        <div className="container">
          <p className="eyebrow">Free · 30 minutes · In person</p>
          <h1>
            Let’s meet.
            <br />
            <span>Find your starting point.</span>
          </h1>
          <p className="consultation-lead">
            A conversation with Aidan at JD Gyms Renfrew.
            <br className="desktop-break" /> Your goals, your questions, a
            clearer next step. No purchase obligation.
          </p>
          <div className="access-instruction">
            <strong>Not a JD Gyms member?</strong>{" "}
            <a href={EMAIL_URL}>Contact Aidan before booking</a> so gym access
            can be confirmed.
          </div>
          <div className="consultation-layout">
            <div className="booking-primary">
              <ConsultationCalendar />
            </div>
            <aside className="consultation-aside">
              <p className="eyebrow">Before your visit</p>
              <h2>
                A little time
                <br />
                to talk it through.
              </h2>
              <ol>
                <li>
                  <strong>Tell me where you’re starting.</strong>
                  <p>
                    We’ll discuss your goals, training experience and what a
                    normal week looks like.
                  </p>
                </li>
                <li>
                  <strong>Ask what you need to ask.</strong>
                  <p>
                    Find out how coaching could fit. Where appropriate and
                    you’re comfortable, we can use structured movement screening
                    to understand your starting point.{" "}
                    <a href="/movement-assessment">Learn about the movement assessment</a>.
                  </p>
                </li>
                <li>
                  <strong>Decide on your next step.</strong>
                  <p>
                    You don’t have to choose or buy a package at the
                    consultation.
                  </p>
                </li>
              </ol>
              <div className="consultation-venue">
                <strong>JD Gyms Renfrew</strong>
                <address>
                  Renfrew Retail Park
                  <br />
                  Renfrew, PA4 9EN
                </address>
                <a href="/personal-training-renfrew#location">
                  Location and access <Arrow />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section className="consultation-help">
        <div className="container editorial-split">
          <div>
            <h2>
              Need a little more
              <br />
              <span>information first?</span>
            </h2>
          </div>
          <div className="prose-copy">
            <p>
              Wear comfortable clothing and trainers if you’d like to try a few
              movements. Please don’t include medical or sensitive information
              in the booking form.
            </p>
            <p>
              Calendly handles booking confirmations and provides appointment
              change and cancellation links. There’s no payment at this stage.
            </p>
            <div className="text-link-row">
              <a href="/coaching">Coaching & prices ↗</a>
              <a href="/about">Meet Aidan ↗</a>
              <a href={EMAIL_URL}>Email a question ↗</a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
