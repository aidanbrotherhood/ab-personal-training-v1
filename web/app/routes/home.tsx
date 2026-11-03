import {
  Arrow,
  ConsultationCTA,
  ConsultationLink,
  PageShell,
} from "../components/site";
import { PricingSection } from "../components/pricing-section";

export default function Home() {
  return (
    <PageShell>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-layout">
          <div className="hero-main">
            <p className="eyebrow">
              <span className="eyebrow-line" aria-hidden="true" /> Personal
              training at JD Gyms Renfrew
            </p>
            <h1 id="hero-title">
              Get stronger.
              <br />
              <span>Stop guessing.</span>
            </h1>
            <p className="hero-lead">
              I’m Aidan. I help people build strength, lose body fat and feel
              more confident in the gym. One-to-one coaching. A plan that makes
              sense for you.
            </p>
            <div className="hero-actions">
              <ConsultationLink
                className="btn btn-primary btn-large"
                placement="hero"
              >
                Book your free consultation
              </ConsultationLink>
              <a className="hero-secondary" href="/pricing">
                Explore coaching <Arrow />
              </a>
            </div>
            <p className="hero-footnote">
              Free · 30 minutes · Face to face · No obligation
            </p>
          </div>
          <figure className="hero-photo">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1080&q=82"
              srcSet="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=540&q=78 540w, https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1080&q=82 1080w"
              sizes="(max-width: 800px) 100vw, 42vw"
              alt="Strength-training equipment in an illustrative gym"
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
          <p>
            <strong>01 /</strong> One-to-one coaching
          </p>
          <p>
            <strong>02 /</strong> Training and nutrition guidance
          </p>
          <p>
            <strong>03 /</strong> Independent at JD Gyms Renfrew
          </p>
        </div>
      </section>

      <section className="section-pad" id="approach">
        <div className="container editorial-split">
          <div>
            <p className="eyebrow">A clear purpose</p>
            <h2>
              More direction.
              <br />
              <span>Less guesswork.</span>
            </h2>
          </div>
          <div className="prose-copy">
            <p>
              It’s frustrating to put the effort in and still wonder if you’re
              doing the right things. Good coaching starts with where you are,
              what you want to change and the time you actually have.
            </p>
            <p>
              We’ll practise the movements, build a structured programme and
              review what’s working. The aim is to make your training easier to
              understand and your next step clearer.
            </p>
            <p>
              My approach is about more than an exercise plan. It’s about
              developing strength, confidence and physical capability that
              serve the life you want to live.
            </p>
            <div className="movement-home-links">
              <a className="inline-link" href="/about/approach">
                Read my coaching philosophy <Arrow />
              </a>
              <a className="inline-link" href="/personal-training-renfrew">
                How personal training works in Renfrew <Arrow />
              </a>
              <a className="inline-link" href="/movement-assessment">
                Your free movement assessment <Arrow />
              </a>
            </div>
          </div>
        </div>
        <div className="container pathway-grid">
          <a href="/personal-training-for-beginners">
            <span>01 / STARTING OUT</span>
            <h3>New to the gym?</h3>
            <p>
              Understand your first step, without needing to know all the
              answers.
            </p>
            <span className="pathway-link">Start here ↗</span>
          </a>
          <a href="/strength-training-renfrew">
            <span>02 / BUILDING STRENGTH</span>
            <h3>Train with purpose.</h3>
            <p>
              Technique, a progressive plan and support with what to do next.
            </p>
            <span className="pathway-link">Explore strength coaching ↗</span>
          </a>
          <a href="/pricing#fat-loss">
            <span>03 / CHANGING HABITS</span>
            <h3>Make it sustainable.</h3>
            <p>Training and practical nutrition guidance that fit real life.</p>
            <span className="pathway-link">Explore fat-loss support ↗</span>
          </a>
        </div>
      </section>

      <PricingSection variant="home" />

      <section className="section-pad" id="about">
        <div className="container about-layout">
          <div className="about-display">
            <span>THE PERSON BEHIND THE COACHING</span>
            <p>
              Aidan
              <br />
              Brotherhood<span className="about-period">.</span>
            </p>
            <div className="about-display-bottom">
              <span>Personal trainer</span>
              <span>Renfrew, Scotland</span>
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">Meet your trainer</p>
            <h2>
              Confidence with me.
              <br />
              <em>And without me.</em>
            </h2>
            <p>
              I want you to understand your training, not just follow
              instructions. We’ll focus on the work that’s useful for you, make
              sure you know why you’re doing it and build from there.
            </p>
            <p>
              AB Personal Training is my independent coaching business, based at
              JD Gyms Renfrew.
            </p>
            <a href="/about" className="inline-link">
              About Me <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="home-location">
        <div className="container editorial-split">
          <div>
            <p className="eyebrow">One place to train</p>
            <h2>
              JD Gyms.
              <br />
              Renfrew.
            </h2>
          </div>
          <div className="prose-copy">
            <p>
              All sessions take place at JD Gyms Renfrew, Renfrew Retail Park,
              PA4 9EN. Paid coaching requires a gym membership, purchased
              separately.
            </p>
            <p>
              Not a member? Contact me before booking your consultation so gym
              access can be confirmed.
            </p>
            <a
              className="inline-link"
              href="/personal-training-renfrew#location"
            >
              Location and gym access <Arrow />
            </a>
          </div>
        </div>
      </section>
      <div id="consultation">
        <ConsultationCTA title="Come in. Let’s make a plan." />
      </div>
    </PageShell>
  );
}
