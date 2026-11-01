import { useState } from "react";
import type { MetaFunction } from "react-router";
import { Brand, Arrow, Footer } from "../components/site";
import { ConsultationForm } from "../components/consultation-form";
import { plans, type PackageId } from "../lib/offers";

export const meta: MetaFunction = () => [
  { title: "Personal Training in Renfrew | Aidan Brotherhood" },
  {
    name: "description",
    content:
      "Lose body fat, build strength and feel more confident in the gym. Independent personal training with Aidan Brotherhood at JD Gyms Renfrew. Request a free consultation.",
  },
  {
    property: "og:title",
    content: "Less guesswork. More from your training. | AB Personal Training",
  },
  {
    property: "og:description",
    content:
      "One-to-one coaching at JD Gyms Renfrew. A clear programme, practical nutrition guidance and someone to help you put it into practice.",
  },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
];

const faqs = [
  [
    "Do I need to be fit before I start?",
    "No. You can be completely new to the gym, returning after a break or already training. We’ll start with what you can do now and build from there.",
  ],
  [
    "Do I need a JD Gyms membership?",
    "Yes. All coached sessions take place at JD Gyms Renfrew. You’ll need a valid gym membership, purchased separately. AB Personal Training is an independent service, not an official JD Gyms programme.",
  ],
  [
    "What happens in the free consultation?",
    "We’ll talk about your goals, your training experience and when you can train. You can ask questions and discuss the coaching options. It’s a conversation, with no obligation to book paid sessions.",
  ],
  [
    "What if I have limited time or availability?",
    "Tell me which days and times usually work for you. We’ll discuss what’s realistic and check session availability before you decide on coaching. A consultation request doesn’t reserve a session time.",
  ],
  [
    "What support is included between sessions?",
    "Weekly and Complete Coaching include a personalised training programme, practical nutrition guidance and weekly progress reviews. We’ll use those reviews to discuss what’s working and make appropriate adjustments. The one-off Introduction includes a practical starting plan.",
  ],
  [
    "Do I have to commit to 12 weeks?",
    "No. Weekly and Complete Coaching are purchased in four-week blocks. The optional 12-week pathway is three Complete Coaching blocks at £320 each (£960 in total). You don’t have to pay £960 upfront or commit to all three.",
  ],
  [
    "Is the £99 Introduction the same as the free consultation?",
    "They’re separate. The consultation is a free introductory conversation. The £99 PT Introduction is a paid package of two 60-minute one-to-one training sessions, an assessment, technique coaching and a practical starting plan.",
  ],
];

export default function Home() {
  const [interest, setInterest] = useState<PackageId>("unsure");
  function choosePackage(id: PackageId) {
    setInterest(id);
    window.dispatchEvent(
      new CustomEvent("ab:package-interest", { detail: { package: id } }),
    );
  }
  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#approach">The approach</a>
            <a href="#about">Meet Aidan</a>
            <a href="#coaching">Coaching & pricing</a>
          </nav>
          <a className="nav-cta" href="#consultation">
            Let’s talk <Arrow />
          </a>
        </div>
      </header>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "AB Personal Training",
              description:
                "Independent one-to-one personal training at JD Gyms Renfrew.",
              email: "hello@aidanbrotherhood.com",
              areaServed: { "@type": "Place", name: "Renfrew, Scotland" },
              founder: { "@type": "Person", name: "Aidan Brotherhood" },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Personal training",
                itemListElement: plans.map((plan) => ({
                  "@type": "Offer",
                  priceCurrency: "GBP",
                  price: plan.price.slice(1),
                  description:
                    plan.id === "introduction"
                      ? "One-off payment"
                      : "Per four-week block",
                  itemOffered: { "@type": "Service", name: plan.title },
                })),
              },
            }),
          }}
        />
        <section className="hero" aria-labelledby="hero-title">
          <div className="container">
            <p className="hero-location">
              Independent personal training <span aria-hidden="true">/</span> JD
              Gyms Renfrew
            </p>
            <h1 id="hero-title">
              Less guesswork.
              <br />
              <span>More from your training.</span>
            </h1>
            <div className="hero-bottom">
              <div className="hero-actions">
                <a href="#consultation" className="btn btn-primary">
                  Request a free consultation <Arrow />
                </a>
                <p>A conversation with Aidan. No obligation.</p>
              </div>
              <p className="hero-description">
                Lose body fat. Build strength. Feel more confident in the gym.
                With a clear programme, practical nutrition guidance and someone
                to help you put it into practice.
              </p>
            </div>
            <a href="#approach" className="hero-scroll">
              A little more direction <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section
          className="recognition section-pad"
          id="approach"
          aria-labelledby="recognition-title"
        >
          <div className="container recognition-grid">
            <p className="section-label">Sound familiar?</p>
            <div>
              <h2 id="recognition-title">
                You’re making the effort.
                <br />
                <span>But is it adding up?</span>
              </h2>
              <div className="recognition-copy">
                <p>
                  You get to the gym, do what feels right and hope it’s enough.
                  Or you’ve got a programme, but you’re not sure when to push
                  harder, change something or stay the course.
                </p>
                <p>
                  Then there’s food, a busy week and the difficulty of starting
                  again after a missed session.
                </p>
                <p className="recognition-conclusion">
                  Coaching gives those decisions some structure.
                  <br />
                  <strong>So you can get on with the work.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="method-section section-pad"
          aria-labelledby="method-title"
        >
          <div className="container">
            <div className="method-heading">
              <p className="section-label">The thinking behind the training</p>
              <h2 id="method-title">
                Know what to do.
                <br />
                <span>Understand why.</span>
              </h2>
              <p>
                Good coaching connects what you do in a session with what you’re
                trying to achieve over time. Here’s what that looks like in
                practice.
              </p>
            </div>
            <div className="method-body">
              <div className="method-row">
                <h3>Train with a reason.</h3>
                <div>
                  <p>
                    Work from a programme matched to your goals, experience and
                    available time. Learn how to perform the movements, how much
                    work to do and how to judge the effort.
                  </p>
                  <p className="method-note">
                    A clear plan for coached sessions and independent training.
                  </p>
                </div>
              </div>
              <div className="method-row">
                <h3>Fuel the work.</h3>
                <div>
                  <p>
                    Make sense of nutrition in the context of your goals. Focus
                    on practical changes to the way you eat, rather than a set
                    of rules that makes everyday life harder.
                  </p>
                  <p className="method-note">
                    Manageable habits, with room for food you enjoy.
                  </p>
                </div>
              </div>
              <div className="method-row">
                <h3>Review. Then adjust.</h3>
                <div>
                  <p>
                    Record your repetitions, the load and how the work feels. In
                    weekly reviews, we’ll use that information to decide when to
                    add repetitions, increase the weight or keep practising at
                    the same level.
                  </p>
                  <p className="method-note">
                    Decisions based on your progress, rather than a new routine
                    every week.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="coaching-loop"
              role="group"
              aria-label="How ongoing coaching develops"
            >
              <p>
                Progress is a process.
                <br />
                <span>We keep coming back to it.</span>
              </p>
              <ol>
                <li>
                  <strong>Plan</strong>
                  <span>Know the next step</span>
                </li>
                <li>
                  <strong>Train</strong>
                  <span>Put it into practice</span>
                </li>
                <li>
                  <strong>Review</strong>
                  <span>Learn from the work</span>
                </li>
                <li>
                  <strong>Adjust</strong>
                  <span>Make the next step count</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section
          className="about-section section-pad"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="container about-grid">
            <div className="about-identity">
              <p className="section-label">Your coach</p>
              <h2 id="about-title">
                Aidan
                <br />
                Brotherhood<span>.</span>
              </h2>
              <p>
                Independent personal trainer
                <br />
                JD Gyms Renfrew, Scotland
              </p>
              <img src="/ab-mark.svg" alt="" width="70" height="50" />
            </div>
            <div className="about-content">
              <p className="about-lead">
                I want you to understand
                <br />
                your training, not just follow it.
              </p>
              <p>
                My approach is straightforward: get to know where you’re
                starting, build a plan around your circumstances and help you
                put it into practice.
              </p>
              <p>
                That means explaining the purpose behind an exercise, helping
                you feel more confident with your technique and making sensible
                adjustments when life gets busy.
              </p>
              <p>
                You don’t need to know your way around every piece of equipment.
                You just need a starting point and a willingness to learn. We’ll
                work from there.
              </p>
              <a href="#consultation" className="inline-link">
                Let’s talk about your goals <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section
          className="coaching-section section-pad"
          id="coaching"
          aria-labelledby="coaching-title"
        >
          <div className="container">
            <div className="offers-heading">
              <p className="section-label">Working together</p>
              <h2 id="coaching-title">Choose your starting point.</h2>
              <p>
                Try two sessions or build a regular coaching rhythm.
                <br />
                We can discuss what fits before you decide.
              </p>
            </div>
            <div className="offers">
              {plans.map((plan) => (
                <article
                  className={
                    "offer" + (plan.id === "complete" ? " offer-complete" : "")
                  }
                  key={plan.id}
                >
                  <div className="offer-name">
                    <h3>{plan.title}</h3>
                    <p>{plan.description}</p>
                  </div>
                  <div className="offer-detail">
                    <p className="offer-sessions">
                      <strong>{plan.sessions} × 60-minute sessions</strong>
                      <span>{plan.frequency}</span>
                    </p>
                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="offer-action">
                    <p className="offer-price">
                      <strong>{plan.price}</strong>
                      <span>
                        {plan.id === "introduction"
                          ? "one-off payment"
                          : "per four-week block"}
                      </span>
                    </p>
                    <a
                      href="#consultation"
                      onClick={() => choosePackage(plan.id)}
                      className="inline-link"
                      aria-label={"Ask about " + plan.title}
                    >
                      Ask about this option <Arrow />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <div className="pathway-note">
              <h3>Thinking longer term?</h3>
              <p>
                The optional 12-week pathway is three Complete Coaching blocks:{" "}
                <strong>£320 per four-week block, £960 in total.</strong> Pay by
                the block, with no obligation to buy all three.
              </p>
            </div>
            <p className="membership-note">
              All coached sessions take place at JD Gyms Renfrew. A valid gym
              membership is required and isn’t included in these prices.
            </p>
          </div>
        </section>

        <section
          className="getting-started section-pad"
          aria-labelledby="steps-title"
        >
          <div className="container steps-layout">
            <div>
              <p className="section-label">From here to your first session</p>
              <h2 id="steps-title">
                Let’s work out
                <br />
                <span>what works for you.</span>
              </h2>
            </div>
            <ol className="steps">
              <li>
                <h3>Make an introduction.</h3>
                <p>
                  Request a free consultation. I’ll reply by email to arrange a
                  time to talk.
                </p>
              </li>
              <li>
                <h3>Talk it through.</h3>
                <p>
                  Discuss your goals, experience and availability. Ask questions
                  and explore the options, with no obligation to buy.
                </p>
              </li>
              <li>
                <h3>Choose your coaching.</h3>
                <p>
                  Agree an appropriate starting point and check session
                  availability before you book.
                </p>
              </li>
              <li>
                <h3>Put the plan to work.</h3>
                <p>
                  Begin training, learn as you go and review your progress
                  together.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section
          className="faq-section section-pad"
          aria-labelledby="faq-title"
        >
          <div className="container faq-grid">
            <div>
              <p className="section-label">A little clarity</p>
              <h2 id="faq-title">
                Before
                <br />
                <span>you begin.</span>
              </h2>
              <p className="faq-aside">
                Something else on your mind?
                <br />
                <a href="mailto:hello@aidanbrotherhood.com">
                  Email Aidan <Arrow />
                </a>
              </p>
            </div>
            <div className="faq-items">
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className="consult-section section-pad"
          id="consultation"
          aria-labelledby="consultation-title"
        >
          <div className="container consult-grid">
            <div className="consult-copy">
              <p className="section-label">Your next step</p>
              <h2 id="consultation-title">
                You don’t need
                <br />
                all the answers.
                <br />
                <span>Let’s start here.</span>
              </h2>
              <p>
                Tell me a little about where you are. We’ll talk about what you
                want to achieve, what’s getting in the way and whether coaching
                would help.
              </p>
              <p className="consult-promise">
                A free conversation.
                <br />
                No obligation to buy a package.
              </p>
              <div className="consult-email">
                <span>Prefer to email?</span>
                <a href="mailto:hello@aidanbrotherhood.com">
                  hello@aidanbrotherhood.com <Arrow />
                </a>
              </div>
            </div>
            <ConsultationForm
              interest={interest}
              onInterestChange={setInterest}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
