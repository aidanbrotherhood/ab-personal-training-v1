import {
  Arrow,
  ConsultationCTA,
  ConsultationLink,
  FAQs,
  LocationNote,
  PageIntro,
  PageShell,
} from "../components/site";
import { plans } from "../lib/offers";
const starter = plans[0];

export default function Beginners() {
  return (
    <PageShell>
      <PageIntro
        label="New to the gym"
        eyebrow="Personal training for beginners · Renfrew"
        title={
          <>
            You don’t have to know
            <br />
            where to start.
          </>
        }
      >
        <p>
          You don’t need previous gym experience to have a consultation. We’ll
          talk about where you are, what you’d like to do and the support that
          could help you take a first step.
        </p>
        <div className="hero-actions">
          <ConsultationLink placement="beginners_hero" />
        </div>
      </PageIntro>
      <section className="section-pad">
        <div className="container editorial-split">
          <div>
            <p className="eyebrow">Two different first steps</p>
            <h2>
              A conversation first.
              <br />
              <span>Training when you’re ready.</span>
            </h2>
          </div>
          <div className="prose-copy">
            <p>
              The free consultation and the paid Starter package serve different
              purposes. You don’t need to buy Starter or choose an ongoing
              package to come and talk.
            </p>
          </div>
        </div>
        <div className="container beginner-options">
          <article>
            <p className="eyebrow">Meet first</p>
            <h3>Free consultation</h3>
            <p className="beginner-price">
              £0 <span>/ 30 minutes</span>
            </p>
            <p>
              An in-person introduction at JD Gyms Renfrew. Discuss your goals,
              training experience and routine, and ask your questions. Where
              appropriate and you’re comfortable, we may look at a few basic
              movements.
            </p>
            <p className="small-note">
              No purchase obligation. No paid training package is booked at this
              stage.
            </p>
            <ConsultationLink placement="beginners_consultation" />
          </article>
          <article>
            <p className="eyebrow">A short introduction to training</p>
            <h3>{starter.title}</h3>
            <p className="beginner-price">
              {starter.price} <span>/ one-off</span>
            </p>
            <p>
              {starter.sessions} × 60-minute one-to-one sessions, with a
              training needs assessment, hands-on technique coaching and a
              practical starting plan.
            </p>
            <p className="small-note">
              For getting started without ongoing coaching. JD Gyms membership
              is required and purchased separately.
            </p>
            <a
              className="inline-link"
              href="/pricing#offer-coaching-introduction"
            >
              Explore Starter <Arrow />
            </a>
          </article>
        </div>
      </section>
      <section className="support-section section-pad">
        <div className="container editorial-split">
          <div>
            <p className="eyebrow">Support as you learn</p>
            <h2>
              Ask questions.
              <br />
              <span>Build confidence.</span>
            </h2>
          </div>
          <div className="prose-copy">
            <p>
              One-to-one coaching gives you time to work on technique and
              understand what you’re doing. Your starting point matters more
              than already knowing the equipment or exercises.
            </p>
            <p>
              Starter provides an introduction and a practical starting plan. If
              you want continuing support, Coaching includes four sessions per
              four weeks, personalised programming, practical nutrition guidance
              and weekly check-ins. Coaching+ adds a second coached session each
              week.
            </p>
            <p>
              We’ll discuss the level of support that fits your goals and the
              time you have. You don’t have to decide before meeting.
            </p>
            <a href="/pricing" className="inline-link">
              Compare coaching and prices <Arrow />
            </a>
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container editorial-split">
          <div>
            <p className="eyebrow">Before your first visit</p>
            <h2>
              Know the place.
              <br />
              <span>Check the access.</span>
            </h2>
            <div className="prose-copy">
              <p>
                Both the consultation and paid training take place at JD Gyms
                Renfrew. If you’re not a member, contact Aidan before booking so
                access can be confirmed.
              </p>
              <p>
                Wear comfortable clothing and trainers if you’d like to try a
                few movements at the consultation. For questions about entry or
                your visit, ask Aidan beforehand rather than guessing.
              </p>
              <a href="/about" className="inline-link">
                About Me <Arrow />
              </a>
            </div>
          </div>
          <LocationNote />
        </div>
      </section>
      <section className="faq-section section-pad">
        <div className="container faq-layout">
          <div className="faq-intro">
            <p className="eyebrow">Starting out</p>
            <h2>
              A few things
              <br />
              you might ask.
            </h2>
          </div>
          <FAQs
            items={[
              {
                question: "Do I need to get fitter before I start?",
                answer: (
                  <p>
                    No. You can have a consultation at your current starting
                    point. We’ll discuss your experience and goals, then work
                    out a sensible next step.
                  </p>
                ),
              },
              {
                question: "Is Starter a free trial?",
                answer: (
                  <p>
                    No. Starter is a £99 purchase for two 60-minute sessions.
                    The consultation is a separate free, 30-minute introduction
                    with no purchase obligation.
                  </p>
                ),
              },
              {
                question: "Will I be training in a group?",
                answer: (
                  <p>
                    No. AB Personal Training provides one-to-one coaching.
                    Sessions take place in JD Gyms Renfrew, a commercial gym,
                    rather than a private studio or a group class.
                  </p>
                ),
              },
              {
                question: "Can I ask a question before choosing a time?",
                answer: (
                  <p>
                    Of course.{" "}
                    <a href="mailto:hello@aidanbrotherhood.com">Email Aidan</a>.
                    You can ask about the consultation, gym access or the
                    support available without committing to coaching.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>
      <ConsultationCTA title="Start with where you are." />
    </PageShell>
  );
}
