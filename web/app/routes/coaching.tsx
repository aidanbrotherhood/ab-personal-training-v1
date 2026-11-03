import {
  Arrow,
  ConsultationCTA,
  ConsultationLink,
  FAQs,
  PageIntro,
  PageShell,
} from "../components/site";
import { PricingSection } from "../components/pricing-section";

export default function Coaching() {
  return (
    <PageShell>
      <PageIntro
        label="Coaching & prices"
        eyebrow="Personal training coaching and prices"
        title={
          <>
            The right support.
            <br />A clear way forward.
          </>
        }
      >
        <p>
          From finding your feet to building a consistent routine. Choose the
          level of one-to-one coaching that fits your starting point, goals and
          time.
        </p>
        <div className="hero-actions">
          <ConsultationLink placement="coaching_hero" />
          <a className="intro-secondary" href="#coaching">
            Compare the packages ↓
          </a>
        </div>
      </PageIntro>
      <PricingSection variant="coaching" />
      <section className="section-pad coaching-pathways">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">A plan with a purpose</p>
            <h2>
              What are you
              <br />
              <span>working towards?</span>
            </h2>
            <p className="section-intro">
              The packages describe how much support you receive. The training
              itself starts with you.
            </p>
          </div>
          <div className="goal-grid">
            <article id="strength" className="goal-card">
              <span className="goal-number">01 / STRENGTH</span>
              <h3>
                Get stronger.
                <br />
                Understand the work.
              </h3>
              <p>
                Strength coaching brings together movement practice, a
                structured programme and a way to review your progress. Rather
                than changing everything each week, we build on what’s working.
              </p>
              <dl>
                <div>
                  <dt>During coached sessions</dt>
                  <dd>
                    Time to practise technique, ask questions and work through
                    the training with Aidan.
                  </dd>
                </div>
                <div>
                  <dt>Between appointments</dt>
                  <dd>
                    Coaching and Coaching+ include a personalised programme for
                    your independent training.
                  </dd>
                </div>
                <div>
                  <dt>As you progress</dt>
                  <dd>
                    Weekly check-ins and progress reviews help us decide what to
                    build on and what to adjust.
                  </dd>
                </div>
              </dl>
              <p>
                New to lifting? You don’t need to arrive knowing the exercises.{" "}
                <a href="/personal-training-for-beginners">
                  Read about starting out
                </a>
                .
              </p>
            </article>
            <article id="fat-loss" className="goal-card goal-card--navy">
              <span className="goal-number">02 / FAT-LOSS SUPPORT</span>
              <h3>
                Useful habits.
                <br />A routine you can keep.
              </h3>
              <p>
                If losing body fat is a goal, we’ll discuss how training and
                practical nutrition habits can fit into your life. The focus is
                on a routine you can work with, rather than an extreme
                short-term approach.
              </p>
              <dl>
                <div>
                  <dt>Training with structure</dt>
                  <dd>
                    One-to-one sessions and, with ongoing coaching, a plan for
                    the days you train independently.
                  </dd>
                </div>
                <div>
                  <dt>Practical nutrition guidance</dt>
                  <dd>
                    Support with day-to-day habits is included in Coaching and
                    Coaching+. It isn’t a clinical dietetic or medical service.
                  </dd>
                </div>
                <div>
                  <dt>Regular review</dt>
                  <dd>
                    Weekly check-ins give us a chance to discuss consistency,
                    feedback and relevant progress, then adjust the plan.
                  </dd>
                </div>
              </dl>
              <p>
                Progress differs from person to person. There’s no promised
                weight-loss rate or transformation deadline.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="support-section section-pad">
        <div className="container editorial-split">
          <div>
            <p className="eyebrow">The work between sessions</p>
            <h2>
              Your plan
              <br />
              <span>comes with you.</span>
            </h2>
          </div>
          <div className="prose-copy">
            <p>
              With Coaching, the four coached sessions are part of a wider plan.
              Personalised programming gives your independent training a
              purpose, while practical nutrition guidance and weekly check-ins
              keep the conversation going.
            </p>
            <p>
              Coaching+ includes the same ongoing support, with eight coached
              sessions per four-week block for more hands-on technique work and
              time together.
            </p>
            <p>
              Starter is a shorter introduction: two full sessions, a training
              needs assessment, technique coaching and a practical starting
              plan. It doesn’t include ongoing programming, nutrition guidance
              or weekly reviews.
            </p>
            <a href="/about" className="inline-link">
              The person behind your coaching <Arrow />
            </a>
          </div>
        </div>
      </section>
      <section className="faq-section section-pad">
        <div className="container faq-layout">
          <div className="faq-intro">
            <p className="eyebrow">Choosing your support</p>
            <h2>
              Clear answers.
              <br />
              No pressure.
            </h2>
          </div>
          <FAQs
            items={[
              {
                question:
                  "Do I need to choose a package before the consultation?",
                answer: (
                  <p>
                    No. Start with the free 30-minute consultation. We can
                    discuss your goals and the level of support that would make
                    sense before you decide.
                  </p>
                ),
              },
              {
                question: "Is four-week pricing the same as monthly pricing?",
                answer: (
                  <p>
                    No. Coaching is £180 and Coaching+ is £320 per four-week
                    block. Four weeks is 28 days, not a calendar month. There is
                    no compulsory 12-week commitment.
                  </p>
                ),
              },
              {
                question: "Why is Coaching the recommended option?",
                answer: (
                  <p>
                    It combines a coached session each week with programming,
                    practical nutrition guidance and weekly reviews. It’s the
                    ongoing option for structure and consistency; Coaching+ adds
                    a second coached session each week.
                  </p>
                ),
              },
              {
                question: "Are there other costs to consider?",
                answer: (
                  <p>
                    Paid sessions require a valid JD Gyms membership, purchased
                    separately. AB Personal Training is independent of JD Gyms.{" "}
                    <a href="/personal-training-renfrew#location">
                      See the location and access details
                    </a>
                    .
                  </p>
                ),
              },
              {
                question:
                  "What if I have a question about payments or changing sessions?",
                answer: (
                  <p>
                    Please discuss your circumstances and the applicable
                    arrangements with Aidan before buying coaching.{" "}
                    <a href="mailto:hello@aidanbrotherhood.com">
                      Email your question
                    </a>
                    . Booking a free consultation doesn’t purchase a package.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>
      <ConsultationCTA title="Find the support that fits you." />
    </PageShell>
  );
}
