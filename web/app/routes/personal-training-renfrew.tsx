import type { MetaFunction } from "react-router";
import { Arrow, Brand, Footer } from "../components/site";

export const meta: MetaFunction = () => [
  { title: "Personal Training in Renfrew | AB Personal Training" },
  { name: "description", content: "One-to-one personal training at JD Gyms Renfrew with Aidan Brotherhood. Strength training, fitness, practical nutrition guidance and coaching tailored to your life. Book a free 30-minute consultation." },
  { property: "og:title", content: "Personal Training in Renfrew | Aidan Brotherhood" },
  { property: "og:description", content: "Independent personal training based at JD Gyms Renfrew. Build strength and confidence with a plan that makes sense." },
];

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
          <a className="nav-cta" href="/#consultation">Book a free consultation <Arrow /></a>
        </div>
      </header>
      <main id="main">
        <nav className="container service-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Personal training in Renfrew</span></nav>
        <section className="service-hero">
          <div className="container service-hero-layout">
            <div>
              <p className="eyebrow">ONE-TO-ONE COACHING · RENFREW</p>
              <h1>Personal training in Renfrew that makes sense for you.</h1>
              <p>I'm Aidan Brotherhood, an independent personal trainer coaching at JD Gyms Renfrew. Whether you're starting out or feel like your training has stalled, I'll help you build strength, confidence and a clear direction.</p>
              <a href="/#consultation" className="btn btn-primary btn-large">Book your free 30-minute consultation <Arrow /></a>
            </div>
            <div className="service-key-facts">
              <p>WHERE WE TRAIN</p>
              <h2>JD Gyms Renfrew</h2>
              <address>Renfrew Retail Park<br/>Renfrew PA4 9EN</address>
              <hr/>
              <p>INDEPENDENT COACHING</p>
              <span>One-to-one training, personalised programming and practical nutrition support. Gym membership is separate from the coaching price.</span>
            </div>
          </div>
        </section>
        <section className="service-content section-pad">
          <div className="container service-content-grid">
            <div className="service-main">
              <p className="eyebrow">HOW WE'LL WORK</p>
              <h2>Make your time in the gym count.</h2>
              <p>If you're not sure what to do when you arrive at the gym, it can be difficult to build momentum. If you're already training regularly, it's just as easy to get stuck repeating the same workouts without understanding what needs to change.</p>
              <p>We start with your goals, training experience, schedule and what you feel comfortable doing. From there, I build a plan you can follow, coach you through the movements and adjust it when your progress tells us we should.</p>
              <h3>What your coaching can cover</h3>
              <ul>
                <li><strong>Strength training:</strong> developing technique and progressively increasing what you can do.</li>
                <li><strong>Fitness and body composition:</strong> creating a manageable routine and supporting your wider goals.</li>
                <li><strong>Training confidence:</strong> feeling more comfortable using equipment and working independently.</li>
                <li><strong>Nutrition:</strong> practical habits that fit your lifestyle, not a restrictive one-size-fits-all diet.</li>
                <li><strong>Progress reviews:</strong> checking how you're responding and changing your plan when needed.</li>
              </ul>
              <h3>How the first meeting works</h3>
              <p>Book a free 30-minute consultation and we'll meet at the gym. We'll talk through what you'd like to achieve, your background and anything that's held you back. If suitable, we'll try a few simple movements to help me understand your starting point. You'll have the chance to ask about the packages and decide whether coaching is right for you.</p>
              <a className="btn btn-primary" href="/#consultation">See available consultation times <Arrow /></a>
            </div>
            <aside className="service-side">
              <h3>What you need to know</h3>
              <dl>
                <div><dt>Location</dt><dd>JD Gyms Renfrew, Renfrew Retail Park, PA4 9EN</dd></div>
                <div><dt>Sessions</dt><dd>One-to-one, in person, by appointment</dd></div>
                <div><dt>Getting started</dt><dd>Free 30-minute introductory consultation</dd></div>
                <div><dt>Membership</dt><dd>Paid training requires a separate JD Gyms membership</dd></div>
                <div><dt>Non-members</dt><dd>Please contact me before booking so I can confirm access arrangements</dd></div>
              </dl>
              <a className="inline-link" href="mailto:hello@aidanbrotherhood.com">Ask me a question <Arrow /></a>
            </aside>
          </div>
        </section>
        <section className="service-cta section-pad">
          <div className="container">
            <p className="eyebrow">NEXT STEP</p>
            <h2>Come in and let's work out where to start.</h2>
            <p>Your first consultation is free. No obligation to buy coaching.</p>
            <a className="btn btn-primary btn-large" href="/#consultation">Book a free consultation <Arrow /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
