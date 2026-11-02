import type { MetaFunction } from "react-router";
import { Arrow, Brand, Footer } from "../components/site";
import { plans } from "../lib/offers";

const pageUrl = "https://aidanbrotherhood.com/personal-training-renfrew";
const gymUrl = "https://www.jdgyms.co.uk/gym/renfrew/";

export const meta: MetaFunction = () => [
  { title: "Personal Trainer Renfrew | 1:1 Coaching at JD Gyms | Aidan Brotherhood" },
  {
    name: "description",
    content:
      "Looking for a personal trainer in Renfrew? Train one-to-one with Aidan Brotherhood at JD Gyms Renfrew. Strength, fitness, nutrition guidance and a free 30-minute consultation.",
  },
  { property: "og:title", content: "Personal Trainer in Renfrew | Aidan Brotherhood" },
  {
    property: "og:description",
    content:
      "Independent one-to-one personal training at JD Gyms Renfrew. See coaching options, prices and what to expect, then book a free consultation.",
  },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
];

const questions = [
  {
    q: "How much does a personal trainer cost in Renfrew?",
    a: "My one-to-one coaching starts at £99 for two 60-minute introduction sessions. Four-week coaching blocks are £180 for four sessions or £320 for eight sessions. JD Gyms membership is separate. We'll discuss what's appropriate during your free consultation.",
  },
  {
    q: "Where are your personal training sessions held?",
    a: "I coach in person at JD Gyms Renfrew, Renfrew Retail Park, Renfrew, PA4 9EN. I'm an independent personal trainer, not an official JD Gyms training programme.",
  },
  {
    q: "Do I need a JD Gyms membership?",
    a: "Yes, a valid JD Gyms membership is required for paid training sessions and isn't included in my coaching prices. If you aren't a member, email me before booking your consultation so I can confirm visitor access arrangements.",
  },
  {
    q: "Can you help if I've never used a gym before?",
    a: "Yes. We can start with the equipment and exercises that feel manageable, spend time on technique and build your confidence gradually. You don't need previous training experience to have a consultation.",
  },
  {
    q: "Can personal training help with fat loss?",
    a: "I can help you build a realistic strength and activity routine, alongside practical nutrition habits that support your goals. We won't rely on extreme dieting or promise a particular rate of weight loss.",
  },
  {
    q: "What happens during the free consultation?",
    a: "It's a 30-minute in-person meeting. We'll discuss your goals, training history and schedule, and, where appropriate, look at a few basic movements. I'll explain how I would approach your training and you can decide whether you want to work together.",
  },
  {
    q: "Do you offer personal training to people from Paisley or the surrounding area?",
    a: "Yes. My sessions take place in Renfrew and are also suitable for people travelling from Paisley, Erskine, Clydebank or nearby areas who can get to JD Gyms Renfrew for their appointments.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://aidanbrotherhood.com/" },
        { "@type": "ListItem", position: 2, name: "Personal training in Renfrew", item: pageUrl },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://aidanbrotherhood.com/#aidan",
      name: "Aidan Brotherhood",
      jobTitle: "Personal trainer",
      url: "https://aidanbrotherhood.com/",
      email: "hello@aidanbrotherhood.com",
      sameAs: ["https://www.instagram.com/aidanbrotherhood.pt/"],
    },
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "One-to-one personal training in Renfrew",
      serviceType: "Personal training",
      description:
        "Independent in-person strength and fitness coaching, exercise programming, nutrition guidance and progress reviews at JD Gyms Renfrew.",
      provider: { "@id": "https://aidanbrotherhood.com/#aidan" },
      areaServed: { "@type": "Place", name: "Renfrew, Scotland" },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceLocation: {
          "@type": "Place",
          name: "JD Gyms Renfrew",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Renfrew Retail Park",
            addressLocality: "Renfrew",
            postalCode: "PA4 9EN",
            addressCountry: "GB",
          },
        },
      },
      offers: plans.map((plan) => ({
        "@type": "Offer",
        price: Number(plan.price.replace("£", "")),
        priceCurrency: "GBP",
        name: plan.title,
        description:
          plan.id === "introduction"
            ? "Two 60-minute coaching sessions, one-off package; gym membership separate"
            : `${plan.sessions} 60-minute one-to-one sessions in a four-week coaching block; gym membership separate`,
        url: "https://aidanbrotherhood.com/#coaching",
      })),
    },
    {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: "Personal Trainer in Renfrew | Aidan Brotherhood",
      description: "Independent one-to-one personal training at JD Gyms Renfrew.",
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      mainEntity: { "@id": `${pageUrl}#service` },
      inLanguage: "en-GB",
    },
  ],
};

export default function PersonalTrainingRenfrew() {
  return (
    <div id="top" className="service-page">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand variant="symbol" />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="/">Home</a>
            <a href="/#approach">How I coach</a>
            <a href="/#coaching">Coaching & prices</a>
          </nav>
          <a className="nav-cta" href="/#consultation">
            <span className="cta-full">Book a free consultation</span><span className="cta-short">Book free</span> <Arrow />
          </a>
        </div>
      </header>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <section className="service-hero" aria-labelledby="service-title">
          <nav className="container service-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Personal training in Renfrew</span>
          </nav>
          <div className="container service-hero-layout">
            <div>
              <p className="eyebrow">INDEPENDENT 1:1 COACHING · RENFREW</p>
              <h1 id="service-title">Personal trainer in Renfrew.</h1>
              <p>
                I’m Aidan Brotherhood. I provide one-to-one personal training at JD Gyms Renfrew,
                helping people get stronger, improve their fitness, lose body fat and feel more
                confident in the gym — with a plan that fits around real life.
              </p>
              <div className="service-hero-actions">
                <a href="/#consultation" className="btn btn-primary btn-large">
                  Book a free consultation <Arrow />
                </a>
                <a href="#prices" className="service-hero-secondary">
                  See coaching prices <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="service-disclaimer">Free 30-minute meeting · In person · No obligation</p>
            </div>
            <aside className="service-key-facts" aria-label="Training location and service details">
              <p>WHERE WE TRAIN</p>
              <h2>JD Gyms Renfrew</h2>
              <address>Renfrew Retail Park<br />Renfrew, PA4 9EN</address>
              <hr />
              <p>YOUR COACH</p>
              <span>Aidan Brotherhood — independent personal training, by appointment.</span>
              <a href={gymUrl} className="service-location-link" target="_blank" rel="noopener noreferrer">
                View the gym’s official location information <Arrow />
              </a>
              <span className="service-location-note">Coaching is independent of JD Gyms. A separate gym membership is required for paid sessions.</span>
            </aside>
          </div>
        </section>

        <div className="service-jump-wrap">
          <nav className="container service-jump" aria-label="On this page">
            <a href="#who-its-for">Who it's for</a>
            <a href="#approach">How coaching works</a>
            <a href="#prices">Prices</a>
            <a href="#location">Location</a>
            <a href="#questions">FAQs</a>
          </nav>
        </div>

        <section className="service-content section-pad" id="who-its-for" aria-labelledby="who-title">
          <div className="container service-content-grid">
            <div className="service-main">
              <p className="eyebrow">PERSONAL TRAINING THAT STARTS WITH YOU</p>
              <h2 id="who-title">Get more out of the time you spend training.</h2>
              <p>
                If you're new to the gym, the amount of equipment and conflicting advice can be
                overwhelming. If you've been training for a while, you might be working hard but
                not seeing the progress you'd hoped for. Both are good reasons to seek some direction.
              </p>
              <p>
                As your personal trainer in Renfrew, my job is to help you understand what you're
                doing and why. We'll work on the movements, habits and training decisions that make
                sense for <em>your</em> starting point rather than relying on a generic workout.
              </p>
              <h3>What would you like to work on?</h3>
              <ul className="service-goals">
                <li><strong>Build strength:</strong> improve exercise technique and progress through a structured programme.</li>
                <li><strong>Lose body fat:</strong> combine practical training with nutrition habits that are realistic to maintain.</li>
                <li><strong>Feel confident in the gym:</strong> learn how to use equipment and train with more independence.</li>
                <li><strong>Improve overall fitness:</strong> develop consistency, movement quality and a routine you can stick with.</li>
                <li><strong>Get past a plateau:</strong> review what you're currently doing and make purposeful adjustments.</li>
              </ul>
            </div>
            <aside className="service-side">
              <p className="eyebrow">AT A GLANCE</p>
              <h3>One-to-one personal training</h3>
              <dl>
                <div><dt>Coach</dt><dd>Aidan Brotherhood</dd></div>
                <div><dt>Where</dt><dd>JD Gyms Renfrew, PA4 9EN</dd></div>
                <div><dt>How</dt><dd>In-person sessions by appointment</dd></div>
                <div><dt>Session duration</dt><dd>60 minutes for paid PT sessions</dd></div>
                <div><dt>First step</dt><dd>Free 30-minute consultation</dd></div>
                <div><dt>Membership</dt><dd>JD Gyms membership is an additional cost</dd></div>
              </dl>
              <a className="inline-link" href="/#consultation">Find a consultation time <Arrow /></a>
            </aside>
          </div>
        </section>

        <section className="service-process section-pad" id="approach" aria-labelledby="process-title">
          <div className="container">
            <div className="service-section-heading">
              <p className="eyebrow">HOW COACHING WORKS</p>
              <h2 id="process-title">A clear plan. Proper coaching. Progress you can follow.</h2>
              <p>I don't think you need endless exercise variation to make progress. You need a starting point, a sensible programme and a way to review what's working.</p>
            </div>
            <div className="service-process-grid">
              <article><span>01</span><h3>Understand your starting point</h3><p>We look at your goals, training history, experience with different movements and how many days you can realistically train.</p></article>
              <article><span>02</span><h3>Build and practise the plan</h3><p>We'll work on technique, make movements feel more comfortable and build a routine you understand, including what to do between our sessions.</p></article>
              <article><span>03</span><h3>Review and adapt</h3><p>We can use exercise performance, consistency, feedback and relevant body-composition measures to judge progress and adjust when needed.</p></article>
            </div>
            <p className="service-process-note">Nutrition guidance focuses on practical day-to-day habits. It isn't a substitute for clinical dietetic or medical care.</p>
          </div>
        </section>

        <section className="service-pricing section-pad" id="prices" aria-labelledby="prices-title">
          <div className="container">
            <div className="service-section-heading">
              <p className="eyebrow">PERSONAL TRAINER PRICES · RENFREW</p>
              <h2 id="prices-title">Choose how much support you want.</h2>
              <p>All three options are built around one-to-one coaching at JD Gyms Renfrew. We can decide which makes sense after the free consultation.</p>
            </div>
            <div className="service-pricing-grid">
              {plans.map((plan) => (
                <article key={plan.id} className={"service-price-card" + (plan.id === "weekly" ? " service-price-featured" : "")}>
                  {plan.id === "weekly" && <span className="service-price-tag">A balanced starting point</span>}
                  <h3>{plan.title}</h3>
                  <p className="service-price-amount">{plan.price}</p>
                  <p className="service-price-period">{plan.id === "introduction" ? "One-off package" : "Per four-week block"}</p>
                  <p className="service-price-sessions">{plan.sessions} × 60-minute sessions</p>
                  <ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  <a href="/#consultation" className={plan.id === "weekly" ? "btn btn-primary" : "btn btn-outline"}>
                    Discuss this option <Arrow />
                  </a>
                </article>
              ))}
            </div>
            <p className="service-pricing-note">Gym membership is not included in these prices. The free 30-minute consultation is separate from the paid PT Introduction package.</p>
          </div>
        </section>

        <section className="service-location-section section-pad" id="location" aria-labelledby="location-title">
          <div className="container service-location-grid">
            <div>
              <p className="eyebrow">PERSONAL TRAINING AT JD GYMS RENFREW</p>
              <h2 id="location-title">Train in Renfrew, with a coach who knows your plan.</h2>
              <p>Sessions take place at <strong>JD Gyms Renfrew, Renfrew Retail Park, Renfrew, PA4 9EN</strong>. This is where we'll meet for your in-person coaching appointments.</p>
              <p>If you're coming from Paisley, Erskine, Clydebank or another nearby area, you're welcome to enquire — just make sure the location works for your regular training routine.</p>
              <p>You will need a valid JD Gyms membership for paid coaching. I operate my own independent PT business, so training packages and gym membership are purchased separately.</p>
              <p>If you are not yet a member, contact me before booking a consultation so I can confirm the access arrangements. I don't want you to turn up and discover there is an unexpected entry requirement.</p>
              <div className="service-location-actions">
                <a href="/#consultation" className="btn btn-primary">Book a free consultation <Arrow /></a>
                <a href={gymUrl} target="_blank" rel="noopener noreferrer" className="inline-link">JD Gyms Renfrew's official page <Arrow /></a>
              </div>
            </div>
            <div className="service-location-card">
              <span>TRAINING LOCATION</span>
              <h3>JD Gyms<br />Renfrew</h3>
              <address>Renfrew Retail Park<br />Renfrew<br />PA4 9EN</address>
              <div className="service-location-card-bottom">
                <p>Independent one-to-one coaching with Aidan Brotherhood.</p>
                <a href="mailto:hello@aidanbrotherhood.com?subject=Renfrew%20personal%20training%20enquiry">Email Aidan <Arrow /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="service-faq section-pad" id="questions" aria-labelledby="faq-title">
          <div className="container service-faq-layout">
            <div>
              <p className="eyebrow">COMMON QUESTIONS</p>
              <h2 id="faq-title">Before you get started.</h2>
              <p>Answers to the questions people usually have when looking for personal training in Renfrew.</p>
            </div>
            <div className="faq-items">
              {questions.map(({ q, a }) => (
                <details key={q} className="faq-item">
                  <summary>{q}<span aria-hidden="true">+</span></summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="service-cta section-pad" aria-labelledby="service-cta-title">
          <div className="container">
            <p className="eyebrow">YOUR FIRST STEP</p>
            <h2 id="service-cta-title">Let's talk about what you want to achieve.</h2>
            <p>Book a free 30-minute consultation at JD Gyms Renfrew, or email me if you can't find a suitable time.</p>
            <div className="service-cta-actions">
              <a href="/#consultation" className="btn btn-primary btn-large">See available times <Arrow /></a>
              <a href="mailto:hello@aidanbrotherhood.com?subject=Personal%20training%20in%20Renfrew" className="inline-link">Email Aidan <Arrow /></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
