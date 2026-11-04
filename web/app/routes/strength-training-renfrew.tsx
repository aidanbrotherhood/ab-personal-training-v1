import {
  Arrow,
  Breadcrumb,
  ConsultationCTA,
  ConsultationLink,
  FAQs,
  LocationNote,
  PageShell,
} from "../components/site";
import { PricingSection } from "../components/pricing-section";
import "../strength-training.css";

const situations = [
  {
    number: "01",
    title: "New to lifting?",
    description: "Learn your way around the weights area, practise fundamental movement patterns and develop the confidence to train independently.",
  },
  {
    number: "02",
    title: "Training, but not progressing?",
    description: "Review what's working, identify what could change and bring more structure to exercise selection, progression and recovery.",
  },
  {
    number: "03",
    title: "Want to build muscle?",
    description: "Work towards muscular development with resistance training suited to your experience, priorities and available time.",
  },
  {
    number: "04",
    title: "Strength for everyday life?",
    description: "Develop useful physical capabilities, whether that's handling everyday demands or staying active and independent as you get older.",
  },
] as const;

const stages = [
  {
    number: "01",
    title: "Understand your starting point.",
    paragraphs: [
      "We begin by discussing your goals, training history, routine and current experience. Where relevant, we'll look at how you perform key movements and establish useful strength or performance baselines as training begins.",
      "The objective isn't to find everything you're doing wrong. It's to understand what would help you move forward.",
    ],
  },
  {
    number: "02",
    title: "Develop your technique.",
    paragraphs: [
      "Strength is built through effort, but learning how to perform exercises confidently matters too. During coached sessions, we'll work on appropriate exercise selection, controlled execution and understanding what effective training feels like.",
      "I want you to understand what you're doing and why you're doing it.",
    ],
  },
  {
    number: "03",
    title: "Follow a programme with purpose.",
    paragraphs: [
      "With ongoing Coaching or Coaching+, you'll have a personalised training programme built around your goals and circumstances. That means considered exercise selection, appropriate training volume, progressive resistance and room to adapt when needed.",
      "Every exercise should have a reason for being there. The work you do independently should contribute to the same overall goal.",
    ],
  },
  {
    number: "04",
    title: "Measure and refine.",
    paragraphs: [
      "We'll use relevant training records to understand how you're progressing. That might include the weights you lift, repetitions completed, movement competency or other measures suited to your goals.",
      "With ongoing coaching, weekly check-ins and progress reviews help us interpret that information and make adjustments. Progress isn't always linear; the aim is to make informed decisions.",
    ],
  },
] as const;

export default function StrengthTrainingRenfrew() {
  return (
    <PageShell className="strength-page">
      <section className="strength-hero" aria-labelledby="strength-title">
        <Breadcrumb
          label="Strength & Muscle"
          parent={{ href: "/personal-training-renfrew", label: "Personal Training" }}
        />
        <div className="container strength-hero-grid">
          <div className="strength-hero-copy">
            <p className="eyebrow">One-to-one strength coaching · JD Gyms Renfrew</p>
            <h1 id="strength-title">
              Strength &amp; muscle-building{" "}
              <span>personal training in Renfrew.</span>
            </h1>
            <p className="strength-lead">Get stronger. Build muscle. Train with purpose.</p>
            <p>
              Whether you're new to lifting or have been training for years
              without the progress you want, a clear plan can make a difference.
            </p>
            <p>
              I'm Aidan Brotherhood. I provide one-to-one strength and
              muscle-building coaching at JD Gyms Renfrew, helping you develop
              technique, train with confidence and work towards meaningful,
              measurable progress.
            </p>
            <p>
              No needlessly complicated routines or constantly changing exercises
              for the sake of variety. Just considered, individualised coaching
              built around your goals, experience and circumstances.
            </p>
            <div className="strength-hero-actions">
              <ConsultationLink className="btn btn-primary btn-large" placement="strength_hero">
                Book your free consultation
              </ConsultationLink>
              <a className="strength-understated-link" href="#who-its-for">
                Explore the coaching <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="strength-hero-note">Free 30-minute consultation · No obligation</p>
          </div>
          <figure className="strength-hero-visual">
            <img
              src="https://images.unsplash.com/photo-1722925541142-5db2668ca492?auto=format&fit=crop&w=1050&q=82"
              srcSet="https://images.unsplash.com/photo-1722925541142-5db2668ca492?auto=format&fit=crop&w=600&q=80 600w, https://images.unsplash.com/photo-1722925541142-5db2668ca492?auto=format&fit=crop&w=1050&q=82 1050w"
              sizes="(max-width: 900px) 100vw, 43vw"
              width="850"
              height="1050"
              alt="Illustrative close-up of an athlete holding a barbell during strength training, not JD Gyms Renfrew"
              decoding="async"
              fetchPriority="high"
            />
            <figcaption>
              <span>Strength / Technique / Progress</span>
              <small>Illustrative photography · not JD Gyms Renfrew</small>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section-pad strength-audience" id="who-its-for">
        <div className="container strength-section-heading">
          <div>
            <p className="eyebrow">Your starting point</p>
            <h2>Wherever you're starting, <span>there's a way forward.</span></h2>
          </div>
          <p>
            Strength training doesn't require you to arrive strong, experienced
            or confident. And if you've been lifting for years, it doesn't mean
            you've already reached your potential.
          </p>
        </div>
        <div className="container strength-audience-grid">
          {situations.map((item) => (
            <article key={item.number}>
              <span className="strength-index">{item.number} / YOUR GOALS</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <p className="container strength-section-close">
          You don't have to fit into one category. We'll establish what matters
          to you and build from there.
        </p>
      </section>

      <section className="section-pad strength-process" id="how-it-works">
        <div className="container strength-section-heading">
          <div>
            <p className="eyebrow">The work behind the progress</p>
            <h2>A better programme starts <span>with understanding.</span></h2>
          </div>
          <p>
            There isn't one perfect exercise or programme for everyone.
            Good coaching involves selecting the right work, performing it
            well, making appropriate progress and learning from the results.
          </p>
        </div>
        <div className="container strength-process-grid">
          {stages.map((stage) => (
            <article key={stage.number} className="strength-process-stage">
              <span className="strength-index">{stage.number} / COACHING</span>
              <h3>{stage.title}</h3>
              {stage.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </article>
          ))}
        </div>
        <div className="container strength-process-link">
          <a href="/movement-assessment" className="inline-link">
            Explore the movement assessment <Arrow />
          </a>
          <a href="/fat-loss-coaching-renfrew" className="inline-link">
            Fat loss &amp; body composition coaching <Arrow />
          </a>
        </div>
      </section>

      <section className="section-pad strength-distinction" id="strength-and-muscle">
        <div className="container strength-section-heading">
          <div>
            <p className="eyebrow">Two related goals</p>
            <h2>Stronger. More muscular. <span>Or both.</span></h2>
          </div>
          <p>
            Building strength and developing muscle are closely related.
            But your training priorities may differ depending on what you're
            trying to achieve.
          </p>
        </div>
        <div className="container strength-distinction-grid">
          <article>
            <p className="strength-side-label">01 / PERFORMANCE</p>
            <h3>Building strength.</h3>
            <p>
              If you want to become stronger, we can focus on your ability to
              perform relevant exercises and progressively handle greater
              resistance. This might involve practising squats, presses, rows,
              hinges and other movements selected for your needs.
            </p>
            <p>
              We'll consider technique, loading, progression and recovery.
              The goal is meaningful strength development, not simply adding
              weight to the bar at every opportunity.
            </p>
          </article>
          <article>
            <p className="strength-side-label">02 / DEVELOPMENT</p>
            <h3>Building muscle.</h3>
            <p>
              If muscular development is your priority, we'll focus on providing
              an appropriate training stimulus across the muscles you want to
              develop. Exercise selection, training volume, effort and recovery
              all matter.
            </p>
            <p>
              With ongoing coaching, practical nutrition guidance is also
              included. The programme should be challenging enough to encourage
              adaptation while remaining realistic for your experience and life.
            </p>
          </article>
        </div>
        <div className="container strength-distinction-footer">
          <strong>You don't have to choose one at the expense of the other.</strong>
          <p>For many people, strength and muscle can be developed together within a well-structured programme.</p>
        </div>
      </section>

      <section className="section-pad strength-philosophy">
        <div className="container strength-philosophy-grid">
          <div>
            <p className="eyebrow">Strength for more than the gym</p>
            <h2>What you build here <span>should matter out there.</span></h2>
          </div>
          <div className="strength-philosophy-copy">
            <p>
              It's rewarding to lift more weight, see changes in your physique
              or reach a goal that once felt out of reach. But I believe the
              value of strength extends further.
            </p>
            <p>
              Being stronger can support everyday physical demands. Becoming
              more competent in the gym can help you approach unfamiliar
              challenges with greater confidence. Maintaining muscle and
              physical capacity is also an important part of staying active
              as we get older.
            </p>
            <p>
              I don't see strength training as a short-term project or an
              endless pursuit of personal records. I see it as an opportunity
              to develop physical capability through consistent, intelligent
              practice. Your ambitions may change; your training can change
              with them.
            </p>
            <blockquote>
              The purpose of getting stronger isn't simply to lift more.
              It's to become more capable of living.
            </blockquote>
            <a className="inline-link" href="/about/approach">
              Read My Approach <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="section-pad strength-location" id="location" aria-labelledby="strength-location-title">
        <div className="container strength-location-layout">
          <div className="strength-location-copy">
            <p className="eyebrow">Personal training in Renfrew</p>
            <h2 id="strength-location-title">Your training base.<span> JD Gyms Renfrew.</span></h2>
            <p>
              Strength and muscle-building coaching takes place at JD Gyms Renfrew
              in Renfrew Retail Park. I work independently within the gym,
              offering focused one-to-one sessions and a structured approach
              to training.
            </p>
            <p>
              Whether you're coming from Renfrew, Paisley, Erskine, Clydebank or
              the surrounding area, this is where we train together.
            </p>
            <a className="inline-link" href="/personal-training-renfrew#location">
              See gym location and access details <Arrow />
            </a>
          </div>
          <aside className="strength-location-panel" aria-label="Where to train and gym access">
            <p className="strength-venue-eyebrow">THE TRAINING VENUE <span>01 / 01</span></p>
            <LocationNote />
          </aside>
        </div>
      </section>

      <PricingSection variant="strength" />

      <section className="section-pad strength-faq">
        <div className="container strength-faq-grid">
          <div>
            <p className="eyebrow">Good to know</p>
            <h2>Questions before <span>you start.</span></h2>
          </div>
          <FAQs
            items={[
              {
                question: "Can I start strength training if I've never lifted weights?",
                answer: (
                  <p>
                    Yes. You don't need lifting experience to begin. We'll
                    choose exercises and starting loads suited to your ability,
                    and spend time developing technique and confidence.{" "}
                    <a href="/personal-training-for-beginners">Read about starting in the gym</a>.
                  </p>
                ),
              },
              {
                question: "Can a personal trainer help me build muscle?",
                answer: (
                  <p>
                    Yes. Resistance training, appropriate progression, recovery
                    and nutrition all contribute to muscular development. The
                    support available depends on the coaching package you choose.
                  </p>
                ),
              },
              {
                question: "How often should I train to get stronger?",
                answer: (
                  <p>
                    That depends on your experience, goals and routine. As a
                    general health recommendation, the NHS advises adults to do
                    muscle-strengthening activities on at least two days a week.
                    Those don't all need to be personal training sessions; ongoing
                    Coaching can include independent workouts alongside our sessions.{" "}
                    <a href="https://www.nhs.uk/live-well/exercise/physical-activity-guidelines-for-adults-aged-19-to-64/" target="_blank" rel="noopener noreferrer">
                      NHS physical activity guidance <Arrow />
                    </a>
                  </p>
                ),
              },
              {
                question: "Do I have to choose between strength and muscle growth?",
                answer: (
                  <p>
                    No. Both can be pursued in the same programme. We'll adjust
                    the emphasis depending on your goals and how you respond.
                  </p>
                ),
              },
              {
                question: "Do I need a JD Gyms membership?",
                answer: (
                  <p>
                    Yes, for paid coaching. Membership is purchased separately.
                    If you aren't a member yet, contact me before the free
                    consultation so access can be confirmed.
                  </p>
                ),
              },
              {
                question: "What happens during the free consultation?",
                answer: (
                  <p>
                    We'll discuss your goals, experience and starting point.
                    Where appropriate, we may explore a few movements. It's a
                    free 30-minute introduction, not one of your paid training
                    sessions, and there's no obligation to buy a package.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>

      <ConsultationCTA title="Let's build something worth progressing." />
    </PageShell>
  );
}
