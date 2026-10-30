import { useSearchParams, type MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
  { title: "Personal Training in Renfrew | AB Personal Training" },
  { name: "description", content: "Personal training in Renfrew that fits your life. One-to-one strength coaching, practical nutrition support and accountability at JD Gyms Renfrew. Intro from £99." },
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
  return <a className="brand" href="#top" aria-label="AB Personal Training — homepage"><img src="/ab-logo.svg" alt="Aidan Brotherhood Personal Training" width="310" height="62" /></a>;
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
          <a className="nav-cta" href="#consultation">Free consultation <Arrow /></a>
        </div>
      </header>

      <main>
        <section className="hero section-pad">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="status-dot" /> PERSONAL TRAINING · JD GYMS RENFREW</div>
              <h1>Get back in shape.<br /><em>With a plan that fits your life.</em></h1>
              <p className="hero-description">Personal coaching to help you lose body fat, build strength and make progress you can sustain. Expert guidance in the gym, clear direction outside it, and a plan that works around your life.</p>
              <div className="hero-actions">
                <a href="#consultation" className="btn btn-primary">Request a free consultation <Arrow /></a>
                <a href="#coaching" className="text-link">View coaching options <span aria-hidden="true">↓</span></a>
              </div>
              <p className="hero-footnote">No pressure to sign up. A clear conversation about your goals and what support would help.</p>
            </div>
            <div className="hero-visual" aria-label="Three foundations of AB personal training">
              <div className="visual-orbit visual-orbit-one" aria-hidden="true" />
              <div className="visual-orbit visual-orbit-two" aria-hidden="true" />
              <div className="visual-top"><span>THE AB APPROACH</span><span>RENFREW · SCOTLAND</span></div>
              <div className="visual-core">
                <img className="visual-monogram" src="/ab-mark.svg" alt="" width="112" height="80" />
                <p>Real progress is built<br />one good week at a time.</p>
              </div>
              <div className="visual-bottom">
                <div><span className="mini-number">01</span><span>STRENGTH<br />TRAINING</span></div>
                <div><span className="mini-number">02</span><span>PRACTICAL<br />NUTRITION</span></div>
                <div><span className="mini-number">03</span><span>CONSISTENT<br />SUPPORT</span></div>
              </div>
            </div>
          </div>
          <div className="container hero-baseline"><span>PRIVATE 1:1 COACHING</span><span>PERSONALISED PROGRAMMING</span><span>REAL-WORLD ACCOUNTABILITY</span></div>
        </section>

        <section className="problem section-pad" id="approach">
          <div className="container split-heading">
            <div><span className="section-tag">/ THE DIFFERENCE</span><h2>A plan is a start.<br /><em>Support makes it stick.</em></h2></div>
            <div className="problem-copy">
              <p>You can put the work in and still wonder if you're getting anywhere. What should you train? How much does nutrition matter? What happens when your schedule falls apart?</p>
              <p>You shouldn't have to figure every part of that out alone. We'll make your next steps clear, track what matters, and adjust the plan as your life changes.</p>
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
            <div className="section-head-row"><div><span className="section-tag">/ HOW WE WORK TOGETHER</span><h2>The right support.<br /><em>On your terms.</em></h2></div><p>Start with two sessions or choose regular coaching. Every option is clear about what's included and what you'll pay.</p></div>
            <div className="pricing-grid">
              {plans.map((plan) => <article key={plan.title} className={"plan-card " + (plan.featured ? "featured" : "")}>
                <div className="plan-upper">
                  <div className="plan-label">{plan.label}</div>
                  {plan.featured && <span className="recommended">MORE 1:1 SUPPORT</span>}
                  <h3>{plan.title}</h3>
                  <p>{plan.description}</p>
                </div>
                <div className="plan-price"><strong>{plan.price}</strong><span>{plan.cadence}</span></div>
                <div className="plan-detail">{plan.detail}</div>
                <ul>{plan.features.map(feature => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul>
                <a href="#consultation" className={"btn " + (plan.featured ? "btn-primary" : "btn-outline")}>Ask about this option <Arrow /></a>
              </article>)}
            </div>
            <div className="pathway-note"><div><strong>Want a 12-week coaching pathway?</strong><p>Complete Coaching can form a 12-week pathway of three four-week blocks (£960 in total). Pay for each block separately; no requirement to commit to all 12 weeks.</p></div><span>12 WEEKS / YOUR PACE</span></div>
          </div>
        </section>

        <section className="steps-section section-pad">
          <div className="container"><span className="section-tag">/ THE PROCESS</span><h2>Your first steps.<br /><em>No guesswork.</em></h2>
            <div className="steps-grid">{stages.map(stage => <article key={stage.number}><span>{stage.number}</span><h3>{stage.title}</h3><p>{stage.text}</p></article>)}</div>
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="container about-grid">
            <div className="about-visual"><div className="portrait-mark">AB<span>.</span></div><div className="portrait-caption">AIDAN BROTHERHOOD<br /><span>YOUR COACH / RENFREW</span></div></div>
            <div className="about-content"><span className="section-tag">/ YOUR COACH</span><h2>A real coach.<br /><em>A plan built for you.</em></h2><p>I'm Aidan, an independent personal trainer working from JD Gyms Renfrew.</p><p>My approach is straightforward: understand what you want to achieve, build training around your circumstances, and work with you consistently. I'll explain the why behind the work, not just count your reps.</p><p className="about-note">A personal photograph and verified qualification details are being prepared for the website.</p><a className="inline-link" href="#consultation">Let's talk about your goals <Arrow /></a></div>
          </div>
        </section>

        <section className="faq-section section-pad" id="faq"><div className="container faq-grid">
          <div><span className="section-tag">/ GOOD TO KNOW</span><h2>Questions before<br /><em>getting started?</em></h2></div>
          <div className="faq-items">{faqs.map(([question,answer])=><details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </div></section>

        <section className="consult-section section-pad" id="consultation">
          <div className="container consult-grid">
            <div><span className="section-tag light-tag">/ START HERE</span><h2>Ready for a<br /><em>better approach?</em></h2><p>Start with a free, straightforward conversation. Tell me what you'd like to change and I'll help you understand which kind of coaching, if any, makes sense.</p><div className="consult-details"><span>✓ No obligation to buy a package</span><span>✓ Independent coaching at JD Gyms Renfrew</span><span>✓ Clear next steps, no hard sell</span></div></div>
            <div className="contact-panel"><div className="panel-kicker">YOUR FIRST STEP</div><h3>Free PT consultation</h3>{received && <p className="form-success" role="status">Your enquiry has been received. I'll be in touch to arrange a consultation.</p>}<p>A straightforward introduction to your goals, your current routine and what you'd like help with.</p><form className="enquiry-form" action="/api/enquiry" method="post">
              <label htmlFor="enquiry-name">Your name <span>*</span></label><input id="enquiry-name" name="name" required minLength={2} maxLength={120} autoComplete="name" />
              <label htmlFor="enquiry-email">Email address <span>*</span></label><input id="enquiry-email" type="email" name="email" required autoComplete="email" />
              <label htmlFor="enquiry-phone">Phone number (optional)</label><input id="enquiry-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" />
              <label htmlFor="enquiry-member">JD Gyms Renfrew membership <span>*</span></label><select id="enquiry-member" name="membership" required defaultValue=""><option value="" disabled>Select an option</option><option value="yes">I'm already a member</option><option value="joining">I'm willing to join</option><option value="no">I'm not a member</option></select>
              <label htmlFor="enquiry-time">Preferred days / times (optional)</label><input id="enquiry-time" name="availability" maxLength={300} placeholder="e.g. Weekday evenings" />
              <div className="honeypot" aria-hidden="true"><label htmlFor="enquiry-website">Website</label><input id="enquiry-website" name="website" tabIndex={-1} autoComplete="off" /></div>
              <label className="consent-check"><input type="checkbox" name="consent" value="yes" required /><span>I agree to be contacted about my PT enquiry. See the <a href="/privacy">privacy notice</a>.</span></label>
              <button type="submit" className="btn btn-primary btn-full">Request my free consultation <Arrow /></button>
            </form><p className="booking-note">Request only — not an instant booking. I'll reply to arrange a suitable time. No sensitive medical information, please.</p></div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-grid"><div><Brand /><p>Independent one-to-one coaching at JD Gyms Renfrew. Membership is required and purchased separately. AB is not an official JD Gyms programme.</p></div><div className="footer-links"><a href="#coaching">Coaching</a><a href="#consultation">Consultation</a><a href="/privacy">Privacy</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} AB Personal Training</span><span>RENFREW, SCOTLAND</span></div></footer>
    </div>
  );
}
