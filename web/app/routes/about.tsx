import {
  Arrow,
  ConsultationCTA,
  ConsultationLink,
  PageIntro,
  PageShell,
} from "../components/site";

export default function About() {
  return (
    <PageShell>
      <PageIntro
        label="Meet Aidan"
        eyebrow="Aidan Brotherhood · Personal trainer in Renfrew"
        title={
          <>
            Your training.
            <br />A person in your corner.
          </>
        }
      >
        <p>
          I’m Aidan, the coach behind AB Personal Training. I work one-to-one
          with people at JD Gyms Renfrew, helping them build strength, improve
          body composition and feel more confident in the gym.
        </p>
        <div className="hero-actions">
          <ConsultationLink placement="about_hero" />
        </div>
      </PageIntro>
      <section className="section-pad">
        <div className="container about-layout">
          <div className="about-display">
            <span>AB PERSONAL TRAINING</span>
            <p>
              Aidan
              <br />
              Brotherhood<span className="about-period">.</span>
            </p>
            <div className="about-display-bottom">
              <span>Independent coach</span>
              <span>JD Gyms Renfrew</span>
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">The way I see it</p>
            <h2>
              Training should
              <br />
              <em>make sense to you.</em>
            </h2>
            <p>
              There’s a lot of noise around fitness. Different diets, endless
              exercise variations and advice that changes every time you open
              your phone.
            </p>
            <p>
              My approach is to make it simpler. We’ll focus on the work that’s
              useful for you, make sure you understand it and build from there.
              I’ll be there to coach you, answer questions and keep the plan
              moving.
            </p>
            <p>
              I want you to feel confident training with me and without me. That
              starts with understanding where you are and what you want to
              achieve.
            </p>
            <a href="/my-approach" className="inline-link" style={{ marginTop: 26 }}>
              Read my approach <Arrow />
            </a>
          </div>
        </div>
      </section>
      <section className="approach-section section-pad">
        <div className="container">
          <p className="eyebrow">What that means in practice</p>
          <h2>
            Understand.
            <br />
            <span>Practise. Review.</span>
          </h2>
          <div className="principles-grid">
            <article className="principle">
              <span className="principle-number">01</span>
              <h3>Start with your life.</h3>
              <p>
                Your experience, goals and available time matter. The plan
                should reflect what you can realistically work with.
              </p>
            </article>
            <article className="principle">
              <span className="principle-number">02</span>
              <h3>Learn the work.</h3>
              <p>
                We spend time on technique and understanding your programme, so
                training has a clear purpose.
              </p>
            </article>
            <article className="principle">
              <span className="principle-number">03</span>
              <h3>Keep paying attention.</h3>
              <p>
                With ongoing coaching, weekly check-ins and progress reviews
                help us see what’s working and when to adjust.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container editorial-split">
          <div>
            <p className="eyebrow">A clear relationship</p>
            <h2>
              My coaching.
              <br />
              <span>Your next step.</span>
            </h2>
          </div>
          <div className="prose-copy">
            <p>
              AB Personal Training is my independent business. All paid coaching
              takes place at JD Gyms Renfrew and requires a separate gym
              membership.
            </p>
            <p>
              Practical nutrition guidance is part of ongoing coaching. It isn’t
              a substitute for clinical dietetic or medical care.
            </p>
            <p>
              The free consultation gives us a chance to meet, talk about your
              goals and see whether working together feels right. There’s no
              obligation to sign up.
            </p>
            <div className="text-link-row">
              <a href="/coaching">
                Coaching & prices <Arrow />
              </a>
              <a href="/personal-training-renfrew#location">
                Where we train <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>
      <ConsultationCTA title="Come and have a conversation." />
    </PageShell>
  );
}
