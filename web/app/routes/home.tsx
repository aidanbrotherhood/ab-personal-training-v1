import type { MetaFunction } from "react-router";
import { Brand, Arrow, Footer } from "../components/site";
import { ConsultationCalendar } from "../components/consultation-calendar";
import { plans } from "../lib/offers";

export const meta: MetaFunction = () => [
  { title: "Personal Training in Renfrew | Aidan Brotherhood" },
  {
    name: "description",
    content:
      "Personal training at JD Gyms Renfrew with Aidan Brotherhood. Get stronger, lose body fat and feel more confident with one-to-one coaching built around you. Book a free 30-minute consultation.",
  },
  { property: "og:title", content: "Aidan Brotherhood | Personal Training in Renfrew" },
  {
    property: "og:description",
    content: "Get stronger. Know what you're doing. One-to-one coaching at JD Gyms Renfrew.",
  },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
];

const faqs = [
  {
    question: "I'm new to the gym. Is this for me?",
    answer:
      "Absolutely. You don't need to get fitter before you start. We'll work out a sensible starting point and build your confidence as you go.",
  },
  {
    question: "What happens at the free consultation?",
    answer:
      "We'll spend 30 minutes together at JD Gyms Renfrew. I'll ask about your goals, what you've tried before and what a normal week looks like. If appropriate, we'll go through a few basic movements so I can see how you move and coach you through them. You can ask me anything. There's no obligation to sign up.",
  },
  {
    question: "Do I need to be a JD Gyms member?",
    answer:
      "You'll need a valid JD Gyms membership for paid training sessions, which is separate from the coaching price. If you're not a member yet, contact me before booking so I can confirm the access arrangements for your consultation.",
  },
  {
    question: "Do I need to commit to 12 weeks?",
    answer:
      "No. Weekly Coaching and Complete Coaching are bought in four-week blocks. We can plan for longer-term progress, but you decide whether to continue each block.",
  },
  {
    question: "Is the £99 Introduction different from the free consultation?",
    answer:
      "Yes. The consultation is a free, 30-minute meeting to find out whether we'd work well together. The £99 PT Introduction is a paid option with two full one-to-one training sessions and a practical starting plan.",
  },
  {
    question: "What if my schedule changes every week?",
    answer:
      "We can talk through what your week normally looks like and what you can realistically commit to. If the available consultation times don't suit, email me and we'll see what we can arrange.",
  },
];

const planCopy: Record<string, { kicker: string; lead: string; note: string }> = {
  introduction: {
    kicker: "Find your feet",
    lead: "A practical way to get started without a recurring commitment.",
    note: "£49.50 per session",
  },
  weekly: {
    kicker: "Build consistency",
    lead: "A regular session, a plan for the days between, and someone keeping you on track.",
    note: "£45 per session",
  },
  complete: {
    kicker: "More hands-on coaching",
    lead: "Two sessions a week for people who want more time working on technique and progress together.",
    note: "£40 per session",
  },
};

export default function Home() {
  return (
    <div id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand variant="symbol" />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#approach">The approach</a>
            <a href="#about">Meet Aidan</a>
            <a href="#coaching">Coaching & prices</a>
            <a href="/personal-training-renfrew">Training in Renfrew</a>
          </nav>
          <a className="nav-cta" href="#consultation">
            <span className="cta-full">Book a free consultation</span><span className="cta-short">Book free</span> <Arrow />
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
              name: "Aidan Brotherhood Personal Training",
              alternateName: "AB Personal Training",
              description: "Independent one-to-one personal training at JD Gyms Renfrew.",
              email: "hello@aidanbrotherhood.com",
              areaServed: { "@type": "Place", name: "Renfrew, Scotland" },
              founder: { "@type": "Person", name: "Aidan Brotherhood" },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Personal training packages",
                itemListElement: plans.map((plan) => ({
                  "@type": "Offer",
                  priceCurrency: "GBP",
                  price: plan.price.slice(1),
                  description:
                    plan.id === "introduction"
                      ? "One-off two-session package"
                      : "Four-week coaching block",
                  itemOffered: { "@type": "Service", name: plan.title },
                })),
              },
            }),
          }}
        />

        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-layout">
            <div className="hero-main">
              <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" /> Personal training at JD Gyms Renfrew</p>
              <h1 id="hero-title">Get stronger.<br /><span>Stop guessing.</span></h1>
              <p className="hero-lead">
                I’m Aidan. I help people build strength, lose body fat and feel
                more confident in the gym. We’ll start with where you are, make
                a plan that fits your life and work out how to keep moving forward.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary btn-large" href="#consultation">
                  Book your free consultation <Arrow />
                </a>
                <a className="hero-secondary" href="#approach">
                  See how I coach <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="hero-footnote">30 minutes, face to face. No sales pitch or obligation.</p>
            </div>
            <figure className="hero-photo">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1080&q=82"
                alt="Atmospheric photograph of strength-training equipment"
                width="750"
                height="860"
                decoding="async"
                fetchPriority="high"
              />
              <figcaption>
                <span>Strength / Technique / Progress</span>
                <small>Illustrative gym imagery — not JD Gyms Renfrew</small>
              </figcaption>
            </figure>
          </div>
          <div className="container hero-proof" aria-label="Coaching at a glance">
            <p><strong>01 /</strong> One-to-one coaching</p>
            <p><strong>02 /</strong> Training and nutrition guidance</p>
            <p><strong>03 /</strong> Based at JD Gyms Renfrew</p>
          </div>
        </section>

        <section className="approach-section section-pad" id="approach" aria-labelledby="approach-title">
          <div className="container">
            <div className="section-heading approach-heading">
              <p className="eyebrow">THE APPROACH</p>
              <div>
                <h2 id="approach-title">Putting the effort in matters.<br /><span>Knowing where to put it matters too.</span></h2>
                <p className="section-intro">
                  It’s frustrating to train consistently and still wonder if
                  you’re doing the right things. You don’t need a completely
                  new workout every week. You need a plan that makes sense,
                  someone to help you get the most from it, and a way to tell
                  whether you’re making progress.
                </p>
              </div>
            </div>
            <div className="principles-grid">
              <article className="principle">
                <span className="principle-number">01</span>
                <h3>Start with you.</h3>
                <p>We look at your experience, goals and the time you actually have. The programme should work around your life, not the other way round.</p>
              </article>
              <article className="principle">
                <span className="principle-number">02</span>
                <h3>Get the basics right.</h3>
                <p>We practise the movements, build strength progressively and make nutrition less complicated. You’ll know what you’re working on and why.</p>
              </article>
              <article className="principle">
                <span className="principle-number">03</span>
                <h3>Know when to change.</h3>
                <p>We keep track of what matters. When something is working, we build on it. When it isn’t, we adjust the plan rather than guess.</p>
              </article>
            </div>
          </div>
          <div className="container">
            <div className="method-visual">
              <div className="method-visual-media">
                <img
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=78"
                  alt="Athlete practising strength training with free weights"
                  width="1200"
                  height="640"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="method-visual-copy">
                <span className="eyebrow">PROGRESS IS A PROCESS</span>
                <h3>Train with intent. Not just intensity.</h3>
                <p>We’ll use your training sessions to practise good technique, build useful strength and make informed adjustments — not chase exhaustion for its own sake.</p>
                <a href="/personal-training-renfrew" className="inline-link">Explore personal training in Renfrew <Arrow /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section section-pad" id="about" aria-labelledby="about-title">
          <div className="container about-layout">
            <div className="about-display">
              <span>THE PERSON BEHIND THE COACHING</span>
              <p>Aidan<br />Brotherhood<span className="about-period">.</span></p>
              <div className="about-display-bottom">
                <span>Personal trainer</span>
                <span>Renfrew, Scotland</span>
              </div>
            </div>
            <div className="about-copy">
              <p className="eyebrow">MEET YOUR TRAINER</p>
              <h2 id="about-title">I want you to feel confident training — <em>with me and without me.</em></h2>
              <p>There’s a lot of noise around fitness. Different diets, endless exercise variations, and advice that changes every time you open your phone.</p>
              <p>My approach is to make it simpler. We’ll focus on the work that’s useful for you, make sure you understand it, and build from there. I’ll be there to coach you, answer questions and keep the plan moving.</p>
              <p>You don’t have to know where to start. That’s what we’ll work out together.</p>
              <a href="#consultation" className="inline-link">Come in for a free consultation <Arrow /></a>
            </div>
          </div>
        </section>

        <section className="pricing-section section-pad" id="coaching" aria-labelledby="coaching-title">
          <div className="container">
            <div className="pricing-heading">
              <div>
                <p className="eyebrow">WORKING TOGETHER</p>
                <h2 id="coaching-title">Choose your starting point.</h2>
              </div>
              <p>Different levels of support, the same approach: proper coaching and a plan that works for you. We can decide what fits during your free consultation.</p>
            </div>
            <div className="pricing-grid">
              {plans.map((plan) => {
                const details = planCopy[plan.id];
                return (
                  <article key={plan.id} className={"pricing-card" + (plan.id === "weekly" ? " pricing-card-featured" : "")}>
                    <div className="pricing-card-top">
                      <p className="pricing-kicker">{details.kicker}</p>
                      {plan.id === "weekly" && <span className="pricing-tag">A balanced place to start</span>}
                      <h3>{plan.title}</h3>
                      <p className="pricing-lead">{details.lead}</p>
                    </div>
                    <div className="pricing-amount">
                      <strong>{plan.price}</strong>
                      <span>{plan.id === "introduction" ? "one-off" : "per 4 weeks"}</span>
                    </div>
                    <div className="pricing-sessions">
                      <strong>{plan.sessions} × 60-minute one-to-one sessions</strong>
                      <span>{details.note}</span>
                    </div>
                    <ul className="pricing-features">
                      {plan.features.map((feature) => (
                        <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>
                      ))}
                    </ul>
                    <a className={"btn pricing-cta" + (plan.id === "weekly" ? " btn-primary" : " btn-outline")} href="#consultation">
                      Discuss this option <Arrow />
                    </a>
                  </article>
                );
              })}
            </div>
            <div className="pricing-footer">
              <p><strong>Nothing to commit to yet.</strong> The first consultation is free. We’ll talk about your goals and which option, if any, makes sense.</p>
              <p>Sessions take place at JD Gyms Renfrew. A valid membership is required for paid coaching and is purchased separately. AB Personal Training is independent of JD Gyms.</p>
            </div>
          </div>
        </section>

        <section className="consultation-value section-pad" aria-labelledby="consult-value-title">
          <div className="container consult-value-layout">
            <div>
              <p className="eyebrow">BEFORE YOU COMMIT</p>
              <h2 id="consult-value-title">Let’s meet first.<br /><span>On me.</span></h2>
              <p>This isn’t a sales call. It’s 30 minutes in the gym to find out where you’re starting and what might help.</p>
              <a href="#consultation" className="btn btn-primary">Find a consultation time <Arrow /></a>
            </div>
            <ol className="consult-value-steps">
              <li><span>01</span><div><strong>Tell me what you're working towards.</strong><p>We’ll talk through your goals, previous training and what’s been getting in the way.</p></div></li>
              <li><span>02</span><div><strong>Try a few things out.</strong><p>If it’s appropriate and you’re comfortable, we’ll look at some basic movements, technique and starting strength.</p></div></li>
              <li><span>03</span><div><strong>Leave with a clearer next step.</strong><p>I’ll explain how I’d approach your training. You can decide whether working together feels right.</p></div></li>
            </ol>
          </div>
        </section>

        <section className="faq-section section-pad" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <div className="faq-intro">
              <p className="eyebrow">GOOD TO KNOW</p>
              <h2 id="faq-title">A few things you might be wondering.</h2>
              <p>If I haven't covered something, just ask.</p>
              <a className="btn btn-outline" href="mailto:hello@aidanbrotherhood.com?subject=Personal%20training%20enquiry">
                Email Aidan <Arrow />
              </a>
            </div>
            <div className="faq-items">
              {faqs.map((faq) => (
                <details key={faq.question} className="faq-item">
                  <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="booking-section section-pad" id="consultation" aria-labelledby="booking-title">
          <div className="container">
            <div className="booking-heading">
              <p className="eyebrow">YOUR FIRST STEP</p>
              <h2 id="booking-title">Come in. Let’s make a plan.</h2>
              <p>Pick a time below for your free, 30-minute consultation at JD Gyms Renfrew. No payment, no commitment, no pressure.</p>
            </div>
            <ConsultationCalendar />
            <div className="booking-footer">
              <p>Nothing suitable showing? <a href="mailto:hello@aidanbrotherhood.com?subject=Consultation%20availability">Email me and we’ll find another time <Arrow /></a></p>
              <p>Not a JD Gyms member? Contact me first so I can confirm access for your visit.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
