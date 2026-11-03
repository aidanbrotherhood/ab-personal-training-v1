import {
  Arrow,
  ConsultationCTA,
  ConsultationLink,
  FAQs,
  LocationNote,
  PageIntro,
  PageShell,
} from "../components/site";
import { PricingSection } from "../components/pricing-section";
import { GYM_URL } from "../lib/seo";

export default function Renfrew() {
  return (
    <PageShell>
      <PageIntro
        label="Training in Renfrew"
        eyebrow="Independent one-to-one coaching · PA4 9EN"
        title={
          <>
            Personal training
            <br />
            at JD Gyms Renfrew.
          </>
        }
      >
        <p>
          I’m Aidan Brotherhood. I coach people one-to-one at JD Gyms Renfrew,
          helping them build strength, improve fitness and train with more
          confidence.
        </p>
        <div className="hero-actions">
          <ConsultationLink placement="renfrew_hero" />
          <a className="intro-secondary" href="#prices">
            See the prices ↓
          </a>
        </div>
      </PageIntro>
      <section className="section-pad">
        <div className="container editorial-split">
          <div>
            <p className="eyebrow">The way we work</p>
            <h2>
              A starting point.
              <br />
              <span>A plan to build on.</span>
            </h2>
          </div>
          <div className="prose-copy">
            <p>
              Whether you’re new to the gym or feeling stuck with your current
              routine, we start by understanding your goals, experience and
              available time.
            </p>
            <p>
              Paid sessions last 60 minutes. We work on technique and a
              programme that makes sense for your starting point. Ongoing
              Coaching adds a personalised plan, practical nutrition guidance
              and a weekly check-in and progress review.
            </p>
            <div className="text-link-row">
              <a href="/personal-training-for-beginners">
                New to the gym? Start here ↗
              </a>
              <a href="/about">Meet your coach ↗</a>
            </div>
          </div>
        </div>
      </section>
      <PricingSection variant="renfrew" />
      <section className="section-pad" id="location">
        <div className="container editorial-split">
          <div>
            <p className="eyebrow">Your training location</p>
            <h2>
              One coach.
              <br />
              <span>One Renfrew base.</span>
            </h2>
            <div className="prose-copy">
              <p>
                AB Personal Training operates independently within JD Gyms
                Renfrew. Coaching packages and gym membership are purchased
                separately.
              </p>
              <p>
                If you travel from Paisley, Erskine, Clydebank or another nearby
                area, all your appointments will still be here in Renfrew. Check
                that the journey works for your regular training.
              </p>
              <p>
                Use the directions link to find the gym. If you’re unsure about
                entry or your visit, contact me before booking.
              </p>
              <a
                className="inline-link"
                href={GYM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                JD Gyms Renfrew’s official page <Arrow />
              </a>
            </div>
          </div>
          <LocationNote />
        </div>
      </section>
      <section className="faq-section section-pad">
        <div className="container faq-layout">
          <div className="faq-intro">
            <p className="eyebrow">Good to know</p>
            <h2>
              Before you
              <br />
              get started.
            </h2>
          </div>
          <FAQs
            items={[
              {
                question: "Do I need to be a JD Gyms member?",
                answer: (
                  <p>
                    Yes, for paid coaching. A valid membership is required and
                    isn’t included in coaching prices. If you aren’t a member
                    yet, contact Aidan before booking the free consultation so
                    access can be confirmed.
                  </p>
                ),
              },
              {
                question: "Is the consultation a training session?",
                answer: (
                  <p>
                    It’s a free, 30-minute introduction. We discuss your goals,
                    training experience and routine. Where appropriate and
                    you’re comfortable, we may look at a few basic movements.
                    It’s separate from the paid Starter package.
                  </p>
                ),
              },
              {
                question: "Can I work on strength or fat loss?",
                answer: (
                  <p>
                    Coaching can focus on your training goals, with practical
                    nutrition guidance in ongoing packages.{" "}
                    <a href="/pricing">
                      See the support and packages available
                    </a>
                    . We don’t promise a particular rate of progress or weight
                    loss.
                  </p>
                ),
              },
              {
                question: "What if I can’t find a consultation time?",
                answer: (
                  <p>
                    Email{" "}
                    <a href="mailto:hello@aidanbrotherhood.com">
                      hello@aidanbrotherhood.com
                    </a>{" "}
                    to discuss availability. Training is arranged with Aidan;
                    the gym’s opening hours aren’t a promise of coaching
                    availability.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>
      <ConsultationCTA />
    </PageShell>
  );
}
