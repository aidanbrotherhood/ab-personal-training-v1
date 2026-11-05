import "../qualifications.css";
import { Breadcrumb, ConsultationLink, PageShell } from "../components/site";

const professionalQualifications = [
  {
    level: "Level 3",
    name: "Diploma in Personal Training",
    qualification: "Transcend Level 3 Diploma in Personal Training",
    awarded: "19 March 2026",
    provider: "Future Fit Training",
    awardingBody: "Transcend Awards",
    qualificationNumber: "603/4215/8",
    description:
      "The main qualification behind my work as a personal trainer. It covers assessing individual needs, coaching exercise technique, developing and adapting training programmes, and supporting changes in lifestyle and behaviour.",
  },
  {
    level: "Level 2",
    name: "Certificate in Gym Instructing",
    qualification: "Transcend Level 2 Certificate in Gym Instructing",
    awarded: "22 January 2026",
    provider: "Future Fit Training",
    awardingBody: "Transcend Awards",
    qualificationNumber: "603/4213/4",
    description:
      "The foundations of gym-based instruction, including exercise supervision, movement and anatomical systems, helping people learn technique, and supporting healthy, sustainable training habits.",
  },
] as const;

export default function Qualifications() {
  return (
    <PageShell className="qualifications-page">
      <div className="qualifications-hero">
        <Breadcrumb label="Qualifications" parent={{ href: "/about", label: "About" }} />
        <div className="container qualifications-hero-inner">
          <p className="eyebrow">Aidan Brotherhood · Personal Trainer</p>
          <h1>Qualifications &amp; training</h1>
          <p className="qualifications-lead">
            The professional qualifications I've earned, the additional training
            I've completed, and the areas where I'm continuing to learn.
          </p>
        </div>
      </div>

      <div className="container qualifications-content">
        <section className="qualifications-section" aria-labelledby="qualifications-professional">
          <div className="qualifications-section-intro">
            <span className="qualifications-index">01 / Professional qualifications</span>
            <h2 id="qualifications-professional">The foundation of my coaching.</h2>
            <p>
              I trained through Future Fit Training and hold these regulated
              qualifications awarded by Transcend Awards. Together, they cover
              the core knowledge and practical skills required for one-to-one
              personal training.
            </p>
          </div>
          <div className="qualifications-records">
            {professionalQualifications.map((item) => (
              <article key={item.qualification} className="qualifications-record">
                <div className="qualifications-record-top">
                  <span className="qualifications-level">{item.level}</span>
                  <span className="qualifications-date">{item.awarded}</span>
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <dl className="qualifications-details">
                  <div><dt>Official award</dt><dd>{item.qualification}</dd></div>
                  <div><dt>Training provider</dt><dd>{item.provider}</dd></div>
                  <div><dt>Awarding organisation</dt><dd>{item.awardingBody}</dd></div>
                  <div><dt>Qualification number</dt><dd>{item.qualificationNumber}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="qualifications-section" aria-labelledby="qualifications-additional">
          <div className="qualifications-section-intro">
            <span className="qualifications-index">02 / Additional training</span>
            <h2 id="qualifications-additional">Knowledge beyond the gym floor.</h2>
            <p>
              My training also covers nutrition and first aid, both relevant
              to working responsibly with clients.
            </p>
          </div>
          <div className="qualifications-records">
            <article className="qualifications-record">
              <div className="qualifications-record-top">
                <span className="qualifications-level">Nutrition</span>
                <span className="qualifications-date">March 2026</span>
              </div>
              <h3>Level 3 Nutrition and Weight Management</h3>
              <p>
                Completed through Future Fit Training. The course supports the
                practical, general nutrition guidance I give around training,
                weight management and everyday habits. It is a course-completion
                certificate, not registration as a dietitian or nutritionist.
              </p>
              <dl className="qualifications-details">
                <div><dt>Training provider</dt><dd>Future Fit Training</dd></div>
                <div><dt>Certificate</dt><dd>Course completion, issued March 2026</dd></div>
              </dl>
            </article>
            <article className="qualifications-record">
              <div className="qualifications-record-top">
                <span className="qualifications-level">First aid</span>
                <span className="qualifications-date">Valid until 19 June 2029</span>
              </div>
              <h3>Emergency First Aid at Work</h3>
              <p>
                Completed with Stewart First Aid. This training provides a
                foundation in responding to emergencies in the workplace.
              </p>
              <dl className="qualifications-details">
                <div><dt>Training provider</dt><dd>Stewart First Aid</dd></div>
                <div><dt>Completed</dt><dd>19 June 2026</dd></div>
              </dl>
            </article>
          </div>
        </section>

        <section className="qualifications-section qualifications-development" aria-labelledby="qualifications-development">
          <div className="qualifications-section-intro">
            <span className="qualifications-index">03 / Continued development</span>
            <h2 id="qualifications-development">Still learning.</h2>
          </div>
          <div className="qualifications-development-copy">
            <p>
              A qualification is an important starting point, but it doesn't
              mean every coaching decision is settled. I want to keep building
              my knowledge, question my assumptions and improve how I apply
              what I learn to the person in front of me.
            </p>
            <div className="qualifications-next">
              <span className="qualifications-next-label">Further study · Not yet completed</span>
              <h3>Strength and conditioning</h3>
              <p>
                I've enrolled in further strength and conditioning training
                through Future Fit, but haven't completed the qualification.
                I won't list it among my achieved credentials until I have.
              </p>
            </div>
            <p className="qualifications-approach-link">
              For more on how this translates into actual coaching,{" "}
              <a href="/about/approach">read my approach <span aria-hidden="true">↗</span></a>.
            </p>
          </div>
        </section>

        <section className="qualifications-closing" aria-labelledby="qualifications-closing-title">
          <div>
            <p className="eyebrow">Starting out</p>
            <h2 id="qualifications-closing-title">Have a question about working together?</h2>
            <p>
              We can discuss your goals and whether one-to-one coaching
              is the right fit in a free, 30-minute consultation at JD Gyms Renfrew.
            </p>
          </div>
          <ConsultationLink className="btn btn-primary" placement="qualifications_bottom">
            Book a free consultation
          </ConsultationLink>
        </section>
      </div>
    </PageShell>
  );
}
