import {
  Arrow,
  Breadcrumb,
  ConsultationCTA,
  ConsultationLink,
  FAQs,
  PageShell,
} from "../components/site";
import { EMAIL_URL } from "../lib/seo";
import "../movement-assessment.css";

const movementTests = [
  {
    name: "Deep Squat",
    description:
      "A full-body movement involving the hips, knees, ankles, trunk and shoulders.",
  },
  {
    name: "Hurdle Step",
    description:
      "A stepping task that challenges balance, coordination and control while standing on one leg.",
  },
  {
    name: "In-Line Lunge",
    description:
      "A split-stance movement that explores how you control your body in a narrower position.",
  },
  {
    name: "Shoulder Mobility",
    description:
      "A standardised movement used to observe how your shoulders move through the required positions.",
  },
  {
    name: "Active Straight-Leg Raise",
    description:
      "A controlled leg-raising task performed while maintaining a prescribed position.",
  },
  {
    name: "Trunk Stability Push-Up",
    description:
      "A pushing task that challenges your ability to maintain trunk control during movement.",
  },
  {
    name: "Rotary Stability",
    description:
      "A coordinated movement task involving control through the trunk and limbs.",
  },
] as const;

const visitSteps = [
  {
    title: "Understand your goals",
    time: "Around 5–7 minutes",
    detail:
      "We’ll review your exercise-readiness questionnaire and discuss your goals, training history, current activity and anything else that matters to your training.",
  },
  {
    title: "Assess how you move",
    time: "Around 10–13 minutes",
    detail:
      "Where appropriate, we’ll work through the seven Functional Movement Screen tasks. I’ll explain each movement, observe how you perform it and record your starting point.",
  },
  {
    title: "Understand your results",
    time: "Around 5 minutes",
    detail:
      "We’ll discuss the movements you performed comfortably and anything that might benefit from more coaching or further assessment.",
  },
  {
    title: "Establish your next steps",
    time: "Around 5 minutes",
    detail:
      "We’ll connect the observations with your goals and discuss how training could begin. You can ask questions and decide whether coaching is right for you.",
  },
] as const;

const coachingElements = [
  ["Progressive strength", "Structured resistance training, appropriate exercise selection and gradual increases in challenge."],
  ["Movement development", "Clear instruction, technique practice and exercise variations suited to your starting point."],
  ["Relevant mobility", "Mobility work when it supports a movement, an exercise or a goal that matters to you."],
  ["Individual progression", "A programme that changes with your performance, preferences and response to training."],
  ["Meaningful progress", "Tracking strength, exercise performance and relevant movement measures—not appearance alone."],
] as const;

export default function MovementAssessment() {
  return (
    <PageShell className="movement-page">
      <section className="movement-hero" aria-labelledby="movement-title">
        <Breadcrumb label="Free movement assessment" />
        <div className="container movement-hero-grid">
          <div className="movement-hero-copy">
            <p className="eyebrow">Free movement assessment · Renfrew</p>
            <h1 id="movement-title">
              Before we build your programme, <span>let’s understand how you move.</span>
            </h1>
            <p className="movement-hero-lead">
              Your goals are important. So is your starting point.
            </p>
            <p className="movement-hero-body">
              Whether you want to lose body fat, build muscle, get stronger or
              simply feel more capable, effective training begins with
              understanding the individual. Your free consultation combines a
              conversation about your goals and experience with structured
              movement screening where appropriate.
            </p>
            <div className="movement-hero-actions">
              <ConsultationLink className="btn btn-primary btn-large" placement="movement_hero">
                Book your free assessment
              </ConsultationLink>
              <a className="movement-quiet-link" href="#how-it-works">
                See how it works <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="movement-hero-footnote">
              30 minutes · JD Gyms Renfrew · No obligation to buy coaching
            </p>
          </div>
          <figure className="movement-hero-photo">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=82"
              srcSet="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=540&q=78 540w, https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=82 1000w"
              sizes="(max-width: 900px) 100vw, 39vw"
              alt="Illustrative photograph of strength training in a gym"
              width="800"
              height="1000"
              decoding="async"
              fetchPriority="high"
            />
            <figcaption>
              <span>UNDERSTAND / DEVELOP / PROGRESS</span>
              <small>Illustrative training photography — not JD Gyms Renfrew</small>
            </figcaption>
          </figure>
        </div>
        <div className="container movement-proof-strip" aria-label="Assessment at a glance">
          <span><strong>01 /</strong> Understand your starting point</span>
          <span><strong>02 /</strong> Train with greater purpose</span>
          <span><strong>03 /</strong> Revisit your progress</span>
        </div>
      </section>

      <section className="section-pad movement-philosophy">
        <div className="container editorial-split">
          <div>
            <p className="eyebrow">A considered first step</p>
            <h2>Better training starts with <span>better understanding.</span></h2>
          </div>
          <div className="prose-copy">
            <p>
              Two people can share exactly the same goal and need very different
              starting programmes. One might have years of training experience;
              another might be entering a gym for the first time.
            </p>
            <p>
              A generic programme can’t account for those differences. Before
              deciding on exercises, sets or repetitions, we take time to
              understand your experience, your capabilities and what you want to achieve.
            </p>
            <p>
              It’s not about finding things wrong with you. It’s about giving
              your training an informed starting point.
            </p>
          </div>
        </div>
        <div className="container movement-value-grid">
          <article><span>01</span><h3>Understand your starting point.</h3><p>Look beyond your goals and explore how you currently perform fundamental movements.</p></article>
          <article><span>02</span><h3>Train with greater purpose.</h3><p>Use the assessment, your history and your goals to help guide exercise selection and progression.</p></article>
          <article><span>03</span><h3>Measure meaningful progress.</h3><p>Establish a movement baseline that can be revisited alongside strength, fitness and performance.</p></article>
        </div>
      </section>

      <section className="section-pad movement-method" id="functional-movement-screen">
        <div className="container movement-method-grid">
          <div className="movement-method-copy">
            <p className="eyebrow">A structured approach to movement</p>
            <h2>What is the <span>Functional Movement Screen?</span></h2>
            <p>
              The Functional Movement Screen (FMS) is an established assessment
              system built around seven standardised movement tasks.
            </p>
            <p>
              Instead of testing how much weight you lift or how fast you run,
              it looks at how you perform specific movement tasks involving
              different positions and patterns of control.
            </p>
            <p>
              Each task follows a consistent procedure. That allows us to record
              how you perform it today and revisit the same task later.
            </p>
            <p>
              FMS is one part of the picture. It doesn’t replace health and
              training history, strength testing or other relevant fitness assessments.
            </p>
            <a className="inline-link" href="https://www.functionalmovement.com/system/fms" target="_blank" rel="noopener noreferrer">
              About the FMS methodology <Arrow />
            </a>
          </div>
          <figure className="movement-method-figure">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=82"
              alt="Illustrative strength-training equipment in a gym"
              width="800"
              height="980"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Movement is part of training. The assessment helps us decide where to begin. <small>Illustrative training photograph, not an FMS demonstration.</small></figcaption>
          </figure>
        </div>
      </section>

      <section className="section-pad movement-tests" id="seven-movements">
        <div className="container">
          <div className="movement-tests-heading">
            <div><p className="eyebrow">The seven movement tasks</p><h2>Seven movements. <span>A clearer starting point.</span></h2></div>
            <p>
              FMS uses prescribed movements to observe how you perform particular
              tasks. These are not a competition or a measure of your worth in
              the gym—just information to help us understand where you’re starting.
            </p>
          </div>
          <ol className="movement-test-grid">
            {movementTests.map((test, index) => (
              <li key={test.name}>
                <span className="movement-test-number">{String(index + 1).padStart(2, "0")} / 07</span>
                <h3>{test.name}</h3>
                <p>{test.description}</p>
              </li>
            ))}
          </ol>
          <div className="movement-tests-note">
            <strong>It’s not a pass or fail.</strong>
            <p>
              You don’t need to be strong, flexible or experienced. We review
              exercise readiness first and adapt or omit movement testing when
              discomfort, health considerations or other circumstances make it inappropriate.
              A movement screen cannot diagnose the cause of pain or predict injuries.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad movement-visit" id="how-it-works">
        <div className="container movement-visit-header">
          <div><p className="eyebrow">What to expect</p><h2>Your first <span>30 minutes.</span></h2></div>
          <p>
            A conversation, a structured look at your starting point where
            appropriate, and a clearer idea of how to begin. No pressure to purchase.
          </p>
        </div>
        <div className="container">
          <ol className="movement-visit-steps">
            {visitSteps.map((step, index) => (
              <li key={step.title}>
                <span className="movement-step-number">{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{step.title}</h3><span className="movement-step-time">{step.time}</span></div>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
          <p className="movement-visit-note">
            Timings are indicative. More detailed screening or individual needs
            may change what we cover. If a physical screen isn’t appropriate,
            we can still discuss your goals and next steps.
          </p>
          <div className="movement-centred-cta">
            <ConsultationLink placement="movement_process">Book your free consultation</ConsultationLink>
          </div>
        </div>
      </section>

      <section className="section-pad movement-next">
        <div className="container editorial-split">
          <div><p className="eyebrow">Where the value lies</p><h2>An assessment is only useful if it <span>informs what happens next.</span></h2></div>
          <div className="prose-copy">
            <p>
              The purpose isn’t simply to produce a score. It’s to support
              practical coaching decisions.
            </p>
            <p>
              If you’re new to strength training, we might introduce manageable
              exercise variations, develop your technique and build the challenge
              gradually. If you already train regularly, we can explore tasks
              that warrant a closer look alongside your existing strengths.
            </p>
            <p>
              The aim is a programme built around your goals, capacity and
              experience—not an off-the-shelf routine.
            </p>
          </div>
        </div>
        <div className="container movement-coaching-grid">
          {coachingElements.map(([title, detail]) => (
            <article key={title}><h3>{title}</h3><p>{detail}</p></article>
          ))}
        </div>
      </section>

      <section className="section-pad movement-progress">
        <div className="container movement-progress-grid">
          <div>
            <p className="eyebrow">A baseline worth revisiting</p>
            <h2>Your starting point shouldn’t be <span>your finishing point.</span></h2>
            <p>
              As your coaching progresses, we can revisit relevant movement
              tasks under consistent conditions—often around every 8–12 weeks,
              when useful for your programme.
            </p>
            <p>
              But progress goes beyond a movement-screening score. We also look
              at your strength, training performance, confidence, consistency and
              the outcomes that matter to you.
            </p>
          </div>
          <div className="movement-progress-panel" aria-label="Illustrative assessment-to-progress pathway">
            <p className="eyebrow">The coaching cycle</p>
            <ol>
              <li><span>01</span><div><strong>Establish a baseline</strong><p>Goals, movement observations and training history.</p></div></li>
              <li><span>02</span><div><strong>Build your programme</strong><p>Practice, progressive training and individual support.</p></div></li>
              <li><span>03</span><div><strong>Review what changed</strong><p>Repeat relevant assessments and measure training progress.</p></div></li>
            </ol>
            <small>Illustrative process, not measured client results.</small>
          </div>
        </div>
      </section>

      <section className="section-pad movement-coach">
        <div className="container editorial-split">
          <div>
            <p className="eyebrow">Your coach</p>
            <h2>Personal training with a <span>considered approach.</span></h2>
          </div>
          <div className="prose-copy">
            <p>
              I’m Aidan Brotherhood, and I provide independent one-to-one
              coaching at JD Gyms Renfrew.
            </p>
            <p>
              My approach combines structured resistance training,
              evidence-informed coaching and individual attention. I want you
              to understand why you’re training a certain way—not just follow instructions.
            </p>
            <p>
              The initial assessment reflects that philosophy: understand where
              you’re starting, discuss what you want to achieve and establish a
              practical direction together.
            </p>
            <a href="/pricing" className="inline-link">Explore coaching & prices <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="section-pad faq-section movement-faq">
        <div className="container faq-layout">
          <div className="faq-intro">
            <p className="eyebrow">Good to know</p>
            <h2>Questions before <span>we meet?</span></h2>
            <p>The free assessment is a starting point, not a requirement to be fit or experienced.</p>
            <ConsultationLink placement="movement_faq">Book your free assessment</ConsultationLink>
          </div>
          <FAQs items={[
            { question: "Is the movement assessment really free?", answer: <p>Yes. The 30-minute consultation is free, with no obligation to buy a coaching package.</p> },
            { question: "Do I need to be fit or experienced?", answer: <p>No. It’s for people at different starting points, including complete beginners. We review exercise readiness before deciding what movement testing is appropriate.</p> },
            { question: "Is FMS a strength test?", answer: <p>No. FMS observes your performance on seven specific movement tasks. Strength and other aspects of physical fitness are assessed separately as appropriate.</p> },
            { question: "Can the assessment tell me what causes back, knee or shoulder pain?", answer: <p>No. A movement screen is not a medical diagnosis and cannot establish the underlying cause of pain. Tell me about relevant symptoms so we can discuss suitable next steps or whether a healthcare assessment would be appropriate.</p> },
            { question: "Do I get a training programme afterwards?", answer: <p>We’ll discuss your starting point and potential priorities during the free consultation. A detailed, individualised programme is developed as part of paid coaching.</p> },
            { question: "How often would I be reassessed?", answer: <p>Relevant movements may be revisited approximately every 8–12 weeks where useful. We also track strength, exercise performance and progress towards your goals.</p> },
            { question: "What should I wear?", answer: <p>Comfortable clothing that allows you to move freely and suitable trainers. We’ll confirm any additional details before you visit.</p> },
            { question: "Where does the consultation happen?", answer: <p>At JD Gyms Renfrew, Renfrew Retail Park, Renfrew, PA4 9EN. Paid coaching requires a separate gym membership. If you’re not a member, <a href={EMAIL_URL}>contact me before booking</a> so access can be confirmed.</p> },
            { question: "What if I decide not to buy coaching?", answer: <p>That’s absolutely fine. The consultation is an opportunity to learn about your starting point and the support available, without any obligation to continue.</p> },
          ]} />
        </div>
      </section>
      <ConsultationCTA title="Know your starting point. Train with direction." />
    </PageShell>
  );
}
