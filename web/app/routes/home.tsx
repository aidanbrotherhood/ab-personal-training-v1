import { useSearchParams, type MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
  { title: "Personal Training in Renfrew | AB Personal Training" },
  { name: "description", content: "One-to-one personal training at JD Gyms Renfrew. Build strength, lose body fat and find consistency with coaching that fits real life. Packages from £99." },
  { name: "robots", content: "noindex, nofollow" },
];



const plans = [
  {
    label: "01 / GET STARTED",
    title: "PT Introduction",
    price: "£99",
    cadence: "one-off",
    description: "For people who want to experience one-to-one coaching before committing to regular sessions.",
    detail: "2 × 60-minute sessions",
    features: ["Training needs assessment", "Technique coaching", "A practical plan to get started", "No ongoing commitment"],
  },
  {
    label: "02 / BUILD CONSISTENCY",
    title: "Weekly Coaching",
    price: "£180",
    cadence: "every four weeks",
    description: "A structured plan and regular support while you train independently between sessions.",
    detail: "4 × 60-minute sessions",
    features: ["One coached session each week", "Personalised training programme", "Practical nutrition guidance", "Weekly check-in and progress review"],
  },
  {
    label: "03 / MAKE THE CHANGE",
    title: "Complete Coaching",
    price: "£320",
    cadence: "every four weeks",
    description: "Closer support for people serious about improving their physique, strength and consistency.",
    detail: "8 × 60-minute sessions",
    features: ["Two coached sessions each week", "Personalised training programme", "Practical nutrition coaching", "Weekly accountability and progress review"],
    featured: true,
  },
];

const stages = [
  { number: "01", title: "We understand where you're starting.", text: "We discuss your goals, training history, schedule and what has made consistency difficult before." },
  { number: "02", title: "We build a plan around your actual life.", text: "You get structured strength training and practical support with nutrition, not a routine you'll abandon in week two." },
  { number: "03", title: "We coach, measure and adjust.", text: "We review your training, habits and progress and make the changes needed to keep moving forward." },
];

const faqs = [
  ["Do I need a JD Gyms membership?", "Yes. Sessions take place at JD Gyms Renfrew and require an active membership, which is separate from your coaching fee."],
  ["Do I have to pay £960 for 12 weeks upfront?", "No. Complete Coaching is £320 for each four-week block. The 12-week pathway is three consecutive blocks, but there is no obligation to purchase all three."],
  ["Is the £99 Introduction a free consultation?", "No. The free PT consultation is an initial conversation. The £99 Introduction includes two paid, one-to-one coaching sessions."],
  ["Do I have to be fit before I start?", "No. We'll adapt the starting point to your experience, goals and capabilities. You don't need a perfect routine to begin."],
  ["What if my goal is fat loss?", "We can combine progressive strength training with practical nutrition guidance, sustainable habits and regular reviews. Individual outcomes vary."],
];

function Arrow() {
  return <span aria-hidden="true" className="arrow-icon">↗</span>;
}

function Brand() {
  return <a className="brand" href="#top" aria-label="AB Personal Training, back to top">AB<span>.</span><small>PERSONAL TRAINING</small></a>;
}

export default function Home() {
  const [searchParams] = useSearchParams();
  const received = searchParams.get("enquiry") === "received";
  return (
    <div id="top">
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#approach">The approach</a>
            <a href="#coaching">Coaching</a>
            <a href="#about">About</a>
          </nav>
          <a className="nav-cta" href="#consultation">Book a consultation <Arrow /></a>
        </div>
      </header>

      <main>
        <section className="hero section-pad">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="status-dot" /> INDEPENDENT PT · JD GYMS RENFREW</div>
              <h1>Get back in shape. <em>Stay that way.</em></h1>
              <p className="hero-description">One-to-one training for busy people who want to lose body fat, build strength and feel good in their bodies again. A plan that fits your life, and coaching that keeps you moving.</p>
              <div className="hero-actions">
                <a href="#consultation" className="btn btn-lime">Book a free PT consultation <Arrow /></a>
                <a href="#coaching" className="text-link">Explore coaching <span aria-hidden="true">↓</span></a>
              </div>
              <p className="hero-footnote">No pressure. No unrealistic promises. Just a clear conversation about your goals.</p>
            </div>
            <div className="hero-visual" aria-label="The coaching process: training, nutrition and accountability">
              <div className="visual-watermark">AB<span>/</span></div>
              <div className="visual-top"><span>BUILT FOR REAL LIFE</span><span>RENFREW · SCOTLAND</span></div>
              <div className="visual-content"><span className="visual-kicker">THE METHOD</span><strong>TRAIN.<br />FUEL.<br /><i>PROGRESS.</i></strong></div>
              <div className="visual-bottom">
                <div><span className="mini-number">01</span><span>TRAINING<br />WITH DIRECTION</span></div>
                <div><span className="mini-number">02</span><span>NUTRITION<br />THAT FITS</span></div>
                <div><span className="mini-number">03</span><span>PROGRESS<br />YOU CAN TRACK</span></div>
              </div>
            </div>
          </div>
          <div className="container hero-baseline"><span>PRIVATE 1:1 COACHING</span><span>PERSONALISED PROGRAMMING</span><span>REAL-WORLD ACCOUNTABILITY</span></div>
        </section>

        <section className="problem section-pad" id="approach">
          <div className="container split-heading">
            <div><span className="section-tag">/ THE DIFFERENCE</span><h2>More than a session.<br /><em>A better way forward.</em></h2></div>
            <div className="problem-copy">
              <p>Most people don't need another list of exercises. They need to know what to focus on, how to make it work around a busy week, and what to change when progress stalls.</p>
              <p>That's what we're building together: a sustainable approach to training, nutrition and consistency that makes sense outside the gym too.</p>
              <a href="#coaching" className="inline-link">See how coaching works <Arrow /></a>
            </div>
          </div>
          <div className="container outcome-grid">
            <article><span className="outcome-index">01 / TRAIN</span><h3>Strength with purpose.</h3><p>Coached sessions and a programme designed around your experience and goals, not random workouts.</p></article>
            <article><span className="outcome-index">02 / EAT</span><h3>Nutrition for real life.</h3><p>Practical guidance for body composition without perfectionism or extreme restrictions.</p></article>
            <article><span className="outcome-index">03 / CONTINUE</span><h3>Consistency that lasts.</h3><p>Regular check-ins and honest progress reviews so you can keep showing up when life gets busy.</p></article>
          </div>
        </section>

        <section className="program-section section-pad" id="coaching">
          <div className="container">
            <div className="section-head-row"><div><span className="section-tag">/ HOW WE WORK TOGETHER</span><h2>Choose your level<br /><em>of support.</em></h2></div><p>The same grounded coaching philosophy, with a level of support that suits your goals and your schedule.</p></div>
            <div className="pricing-grid">
              {plans.map((plan) => <article key={plan.title} className={"plan-card " + (plan.featured ? "featured" : "")}>
                <div className="plan-upper">
                  <div className="plan-label">{plan.label}</div>
                  {plan.featured && <span className="recommended">MOST SUPPORT</span>}
                  <h3>{plan.title}</h3>
                  <p>{plan.description}</p>
                </div>
                <div className="plan-price"><strong>{plan.price}</strong><span>{plan.cadence}</span></div>
                <div className="plan-detail">{plan.detail}</div>
                <ul>{plan.features.map(feature => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul>
                <a href="#consultation" className={"btn " + (plan.featured ? "btn-lime" : "btn-outline")}>Discuss this option <Arrow /></a>
              </article>)}
            </div>
            <div className="pathway-note"><div><strong>Looking for a longer-term change?</strong><p>Complete Coaching can form a 12-week pathway of three four-week blocks (£960 in total). Pay for each block separately; no requirement to commit to all 12 weeks.</p></div><span>12 WEEKS / YOUR PACE</span></div>
          </div>
        </section>

        <section className="steps-section section-pad">
          <div className="container"><span className="section-tag">/ THE PROCESS</span><h2>Simple to start.<br /><em>Built to make progress.</em></h2>
            <div className="steps-grid">{stages.map(stage => <article key={stage.number}><span>{stage.number}</span><h3>{stage.title}</h3><p>{stage.text}</p></article>)}</div>
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="container about-grid">
            <div className="about-visual"><div className="portrait-mark">AB<span>.</span></div><div className="portrait-caption">AIDAN BROTHERHOOD<br /><span>YOUR COACH / RENFREW</span></div></div>
            <div className="about-content"><span className="section-tag">/ YOUR COACH</span><h2>Personal coaching.<br /><em>Not a generic plan.</em></h2><p>I'm Aidan, an independent personal trainer working from JD Gyms Renfrew.</p><p>I believe good coaching should be clear, realistic and genuinely useful. We'll take your goals seriously, build a plan around your lifestyle and focus on the work that will make the biggest difference.</p><p className="about-note">A real photograph and verified qualifications will be added before the public launch.</p><a className="inline-link" href="#consultation">Let's talk about your goals <Arrow /></a></div>
          </div>
        </section>

        <section className="faq-section section-pad" id="faq"><div className="container faq-grid">
          <div><span className="section-tag">/ GOOD TO KNOW</span><h2>Questions before<br /><em>getting started?</em></h2></div>
          <div className="faq-items">{faqs.map(([question,answer])=><details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </div></section>

        <section className="consult-section section-pad" id="consultation">
          <div className="container consult-grid">
            <div><span className="section-tag light-tag">/ START HERE</span><h2>Ready to make<br /><em>a change?</em></h2><p>Start with a free PT consultation. Tell me what you're working towards and we'll see whether one-to-one coaching is the right fit.</p><div className="consult-details"><span>✓ No obligation to buy a package</span><span>✓ Independent coaching at JD Gyms Renfrew</span><span>✓ Clear next steps, no hard sell</span></div></div>
            <div className="contact-panel"><div className="panel-kicker">YOUR FIRST STEP</div><h3>Free PT consultation</h3>{received && <p className="form-success" role="status">Your enquiry has been received. I'll be in touch to arrange a consultation.</p>}<p>A straightforward introduction to your goals, your current routine and what you'd like help with.</p><form className="enquiry-form" action="/api/enquiry" method="post">
              <label htmlFor="enquiry-name">Your name <span>*</span></label><input id="enquiry-name" name="name" required minLength={2} maxLength={120} autoComplete="name" />
              <label htmlFor="enquiry-email">Email address <span>*</span></label><input id="enquiry-email" type="email" name="email" required autoComplete="email" />
              <label htmlFor="enquiry-phone">Phone number (optional)</label><input id="enquiry-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" />
              <label htmlFor="enquiry-member">JD Gyms Renfrew membership <span>*</span></label><select id="enquiry-member" name="membership" required defaultValue=""><option value="" disabled>Select an option</option><option value="yes">I'm already a member</option><option value="joining">I'm willing to join</option><option value="no">I'm not a member</option></select>
              <label htmlFor="enquiry-time">Preferred days / times (optional)</label><input id="enquiry-time" name="availability" maxLength={300} placeholder="e.g. Weekday evenings" />
              <div className="honeypot" aria-hidden="true"><label htmlFor="enquiry-website">Website</label><input id="enquiry-website" name="website" tabIndex={-1} autoComplete="off" /></div>
              <label className="consent-check"><input type="checkbox" name="consent" value="yes" required /><span>I agree to be contacted about my PT enquiry. See the <a href="/privacy">privacy notice</a>.</span></label>
              <button type="submit" className="btn btn-lime btn-full">Request my free consultation <Arrow /></button>
            </form><p className="booking-note">This sends a consultation request, not an instant booking. I'll reply to arrange a suitable time. Please don't include sensitive medical information.</p></div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-grid"><div><Brand /><p>Independent one-to-one coaching at JD Gyms Renfrew. Membership is required and purchased separately. AB is not an official JD Gyms programme.</p></div><div className="footer-links"><a href="#coaching">Coaching</a><a href="#consultation">Consultation</a><a href="/privacy">Privacy</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} AB Personal Training</span><span>RENFREW, SCOTLAND</span></div></footer>
    </div>
  );
}
