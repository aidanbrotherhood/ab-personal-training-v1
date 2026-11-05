import "../faq.css";
import { Breadcrumb, ConsultationLink, PageShell } from "../components/site";
import { EMAIL_URL } from "../lib/seo";

type FAQ = { question: string; answer: string; link?: { href: string; label: string } };
type FAQGroup = { id: string; title: string; lead: string; items: FAQ[] };

/** Client-facing information: keep package and policy claims aligned with the published offer. */
const groups: FAQGroup[] = [
  {
    "id": "getting-started",
    "title": "Getting started",
    "lead": "Your first visit and what to expect.",
    "items": [
      {
        "question": "Do I need previous gym experience?",
        "answer": "No. You don't need to know your way around the gym or get fitter before starting. We'll begin with your goals and experience, then adapt the exercises and pace to you.",
        "link": {
          "href": "/personal-training-for-beginners",
          "label": "Starting out in the gym"
        }
      },
      {
        "question": "What happens at the free consultation?",
        "answer": "It's a 30-minute appointment at JD Gyms Renfrew. We'll discuss your goals, training history and routine. You can ask questions, and we may look at some basic movements where appropriate and you're comfortable.",
        "link": {
          "href": "/consultation",
          "label": "What to expect"
        }
      },
      {
        "question": "Is the consultation really free?",
        "answer": "Yes. There's no charge and no obligation to purchase a package afterwards.",
        "link": {
          "href": "/consultation",
          "label": "Book a free consultation"
        }
      },
      {
        "question": "Will I have a full workout during the consultation?",
        "answer": "No. The consultation is mainly a conversation and an opportunity to understand your starting point. It may involve movement screening, but it isn't a full personal training session.",
        "link": {
          "href": "/movement-assessment",
          "label": "About the movement assessment"
        }
      },
      {
        "question": "What's the difference between the consultation and Starter?",
        "answer": "The consultation is a free 30-minute introduction. Starter costs £99 and provides two paid, 60-minute sessions, technique coaching, a training needs assessment and a practical starting plan. Starter isn't a free trial.",
        "link": {
          "href": "/pricing",
          "label": "Compare coaching options"
        }
      }
    ]
  },
  {
    "id": "coaching",
    "title": "Coaching and training",
    "lead": "How sessions, programmes and progress work.",
    "items": [
      {
        "question": "What happens in a personal training session?",
        "answer": "Each 60-minute one-to-one session focuses on exercises selected for your goals, with technique coaching, appropriate adjustments and gradual progression. The exact work depends on you, not a fixed workout everyone follows.",
        "link": {
          "href": "/personal-training-renfrew",
          "label": "Personal training in Renfrew"
        }
      },
      {
        "question": "How often should I see a personal trainer?",
        "answer": "That depends on your goals, experience, available time and independent training. Coaching includes one session each week, while Coaching+ includes two. Starter is a one-off two-session introduction.",
        "link": {
          "href": "/pricing",
          "label": "See session options"
        }
      },
      {
        "question": "Will I receive a programme for training on my own?",
        "answer": "Coaching and Coaching+ both include personalised programming for training between appointments. Starter includes a practical starting plan, but not ongoing programming or weekly reviews.",
        "link": {
          "href": "/pricing",
          "label": "What's included"
        }
      },
      {
        "question": "Can you help with strength, muscle or fat loss?",
        "answer": "Yes. Training can focus on strength, muscle-building and improving body composition, with exercise selection and progression based on your starting point. I won't promise a particular transformation or a guaranteed rate of weight loss.",
        "link": {
          "href": "/strength-training-renfrew",
          "label": "Strength training"
        }
      },
      {
        "question": "Do you provide nutrition guidance?",
        "answer": "Coaching and Coaching+ include practical guidance on nutrition habits that support your goals. This isn't medical nutrition treatment or an alternative to personalised advice from a qualified dietitian or healthcare professional.",
        "link": {
          "href": "/fat-loss-coaching-renfrew",
          "label": "Fat loss coaching"
        }
      },
      {
        "question": "How do you measure progress?",
        "answer": "We'll choose measures relevant to you, such as strength, exercise performance, consistency and confidence. Movement tasks can be revisited when useful, but a screen alone cannot diagnose conditions or predict injuries.",
        "link": {
          "href": "/movement-assessment",
          "label": "Movement assessment"
        }
      },
      {
        "question": "Can I train with pain or an injury?",
        "answer": "It depends on your circumstances. Please raise relevant symptoms before training. Exercises may need adapting and, where appropriate, you should first seek assessment from a qualified healthcare professional. Personal training isn't injury diagnosis or treatment."
      }
    ]
  },
  {
    "id": "prices",
    "title": "Prices and packages",
    "lead": "What each option costs and includes.",
    "items": [
      {
        "question": "How much does personal training cost?",
        "answer": "Starter costs £99 for two 60-minute sessions, one-off. Coaching costs £180 for four sessions in a four-week block. Coaching+ costs £320 for eight sessions in a four-week block. JD Gyms membership is separate.",
        "link": {
          "href": "/pricing",
          "label": "Full pricing details"
        }
      },
      {
        "question": "What's the difference between Starter, Coaching and Coaching+?",
        "answer": "Starter is an introduction with technique coaching and a starting plan. Coaching adds weekly sessions, personalised programming, practical nutrition guidance and weekly reviews. Coaching+ provides the same ongoing support with two coached sessions each week.",
        "link": {
          "href": "/pricing",
          "label": "Compare packages"
        }
      },
      {
        "question": "Is four-week pricing the same as monthly pricing?",
        "answer": "No. Four weeks means 28 days, which isn't the same as a calendar month. Both ongoing packages are priced per four-week block.",
        "link": {
          "href": "/pricing",
          "label": "Coaching prices"
        }
      },
      {
        "question": "Do I have to commit to 12 weeks?",
        "answer": "No. There's no compulsory 12-week commitment. Starter is a one-off package; Coaching and Coaching+ are offered in four-week blocks.",
        "link": {
          "href": "/pricing",
          "label": "Choose a package"
        }
      },
      {
        "question": "How and when do I pay?",
        "answer": "The consultation is free. Before purchasing paid coaching, I'll confirm the payment arrangements and applicable terms with you. Please ask if you'd like to clarify anything first.",
        "link": {
          "href": "mailto:hello@aidanbrotherhood.com",
          "label": "Ask about payment arrangements"
        }
      }
    ]
  },
  {
    "id": "location",
    "title": "Location and gym access",
    "lead": "Where to find me and how gym entry works.",
    "items": [
      {
        "question": "Where do sessions take place?",
        "answer": "All one-to-one sessions take place at JD Gyms Renfrew, Renfrew Retail Park, Renfrew, PA4 9EN. I don't currently travel to clients' homes for training.",
        "link": {
          "href": "/personal-training-renfrew#location",
          "label": "Directions and location"
        }
      },
      {
        "question": "Do I need a JD Gyms membership?",
        "answer": "Yes, for paid personal training. You need a valid JD Gyms membership, purchased separately from your AB Personal Training coaching package.",
        "link": {
          "href": "/personal-training-renfrew#location",
          "label": "Gym access details"
        }
      },
      {
        "question": "Can I attend a consultation without being a member?",
        "answer": "Please contact me before booking if you're not a JD Gyms member, so that we can confirm suitable access arrangements. Entry isn't automatically included with the consultation.",
        "link": {
          "href": "mailto:hello@aidanbrotherhood.com",
          "label": "Ask about access"
        }
      },
      {
        "question": "Is AB Personal Training part of JD Gyms?",
        "answer": "AB Personal Training is my independent coaching business, not an official JD Gyms programme. Sessions take place at JD Gyms Renfrew, subject to its membership and access requirements.",
        "link": {
          "href": "/about",
          "label": "About me"
        }
      }
    ]
  },
  {
    "id": "booking",
    "title": "Booking and practical details",
    "lead": "Arranging and managing appointments.",
    "items": [
      {
        "question": "How do I book a first appointment?",
        "answer": "Choose a slot for the free 30-minute consultation on the website. You'll be asked for your contact details and primary fitness goal. Booking the consultation doesn't purchase coaching.",
        "link": {
          "href": "/consultation",
          "label": "Book your consultation"
        }
      },
      {
        "question": "What should I wear or bring?",
        "answer": "Comfortable clothing and trainers are ideal, particularly if you'd like to try some simple movements. No special equipment is required, and you're welcome to bring questions.",
        "link": {
          "href": "/consultation",
          "label": "Before your visit"
        }
      },
      {
        "question": "What if I need to cancel or rearrange a session?",
        "answer": "The free consultation confirmation includes Calendly links for changing or cancelling that booking. Paid-session cancellation and rescheduling arrangements should be confirmed with me before you purchase a package.",
        "link": {
          "href": "mailto:hello@aidanbrotherhood.com",
          "label": "Clarify paid-session arrangements"
        }
      },
      {
        "question": "What if no consultation times suit me?",
        "answer": "Email me to discuss what else may be possible. Sessions depend on my availability; the gym's opening hours aren't a promise that I'm available to coach.",
        "link": {
          "href": "mailto:hello@aidanbrotherhood.com",
          "label": "Ask about availability"
        }
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <PageShell className="faq-page">
      <div className="faq-page-hero">
        <Breadcrumb label="FAQs" />
        <div className="container faq-page-hero-inner">
          <div>
            <p className="eyebrow">AB Personal Training · Renfrew</p>
            <h1>Frequently asked questions</h1>
            <p className="faq-page-lead">
              Straightforward answers about getting started, coaching, prices
              and training at JD Gyms Renfrew.
            </p>
          </div>
          <p className="faq-page-hero-note">
            Something specific on your mind?{" "}
            <a href={EMAIL_URL}>Ask me a question ↗</a>
          </p>
        </div>
      </div>

      <div className="container faq-page-content">
        <nav className="faq-page-jump" aria-label="FAQ categories">
          <span className="faq-page-jump-label">On this page</span>
          <div className="faq-page-jump-links">
            {groups.map(({ id, title }) => (
              <a key={id} href={`#${id}`}>{title}</a>
            ))}
          </div>
        </nav>

        <div className="faq-page-sections">
          {groups.map((group, groupIndex) => (
            <section
              key={group.id}
              className="faq-page-section"
              id={group.id}
              aria-labelledby={`${group.id}-title`}
            >
              <div className="faq-page-section-heading">
                <span className="faq-page-section-count">
                  {String(groupIndex + 1).padStart(2, "0")} / 05
                </span>
                <h2 id={`${group.id}-title`}>{group.title}</h2>
                <p>{group.lead}</p>
              </div>
              <div className="faq-page-questions">
                {group.items.map(({ question, answer, link }) => (
                  <details className="faq-page-question" key={question}>
                    <summary>
                      <span>{question}</span>
                      <span className="faq-page-toggle" aria-hidden="true" />
                    </summary>
                    <div className="faq-page-answer">
                      <p>{answer}</p>
                      {link && (
                        <a href={link.href} className="faq-page-answer-link">
                          {link.label} <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="faq-page-help" aria-labelledby="faq-page-help-title">
          <div>
            <p className="eyebrow">Anything else?</p>
            <h2 id="faq-page-help-title">Still have a question?</h2>
            <p>
              If there’s something I haven’t covered, I’m happy to talk it through
              before you decide whether to start coaching.
            </p>
          </div>
          <div className="faq-page-help-actions">
            <ConsultationLink className="btn btn-primary" placement="faq_bottom">
              Book a free consultation
            </ConsultationLink>
            <a href={EMAIL_URL} className="faq-page-help-email">Email me instead ↗</a>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
