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
import "../fat-loss.css";

const goals = [
  {
    number: "01",
    title: "Lose body fat.",
    description: "Work towards sustainable fat loss with an approach to nutrition and physical activity that fits your circumstances.",
  },
  {
    number: "02",
    title: "Build muscle and strength.",
    description: "Develop muscular fitness through structured resistance training, appropriate progression and consistent practice.",
  },
  {
    number: "03",
    title: "Find consistency.",
    description: "Move away from repeatedly starting over. Build the understanding, skills and habits that make regular training more manageable.",
  },
] as const;

const steps = [
  {
    number: "01",
    title: "Assess.",
    subtitle: "Understand where you're starting.",
    paragraphs: [
      "We begin with a free, 30-minute consultation at JD Gyms Renfrew. We'll discuss your goals, training experience, current routine and what you'd like to change.",
      "We'll also review your exercise readiness and, where appropriate, use structured movement screening to understand how you perform selected movements.",
      "As coaching begins, we can establish relevant starting measurements and performance indicators suited to your goals and preferences. The purpose isn't to find everything you're doing wrong. It's to make informed decisions about where to begin.",
    ],
  },
  {
    number: "02",
    title: "Develop.",
    subtitle: "Build a programme with purpose.",
    paragraphs: [
      "Your training will focus on the qualities that matter to your goals, with resistance training, appropriate progression and individualised exercise selection.",
      "With ongoing Coaching or Coaching+, you'll also receive a personalised programme for your independent training, alongside practical nutrition guidance.",
      "We'll work towards a manageable approach to energy intake, adequate protein, balanced meals and daily habits that support your progress. The programme should challenge you appropriately while remaining realistic about your experience, capabilities and available time.",
    ],
  },
  {
    number: "03",
    title: "Progress.",
    subtitle: "Measure what matters. Adjust what doesn't work.",
    paragraphs: [
      "Progress isn't always linear, and it shouldn't be judged by a single weigh-in or workout.",
      "Depending on your goals, we might review longer-term weight trends, relevant body measurements, exercise performance, strength development and how consistently you're managing your programme.",
      "With ongoing coaching, weekly check-ins and progress reviews help us understand what's working and where adjustments may be useful. As your body, confidence and priorities change, your programme can change with them.",
    ],
  },
] as const;

const questions = [
  {
    question: "Do I need to count calories to lose body fat?",
    answer: <p>Not necessarily. Fat loss requires an energy deficit, but calorie tracking is only one way to help manage it. Some people find tracking useful because it gives them a clearer understanding of their intake. Others prefer working on meal structure, food choices and portion sizes. We'll consider your circumstances and preferences rather than assuming one method works for everyone.</p>,
  },
  {
    question: "Can I lose body fat and build muscle at the same time?",
    answer: <p>It can be possible, particularly for people who are new to resistance training or returning after a break. However, the extent to which you can build muscle while losing fat depends on factors including training experience, energy intake, recovery and individual circumstances. During a fat-loss phase, preserving muscle, improving strength and training consistently are worthwhile priorities, whether or not muscle gain occurs at the same time.</p>,
  },
  {
    question: "Will I need to follow a strict diet or give up my favourite foods?",
    answer: <p>No blanket food bans are part of my approach. We'll focus on understanding energy intake, eating a nutritious and balanced diet, getting adequate protein and making changes you can realistically maintain. That can still include foods you enjoy. The overall pattern of your eating matters more than trying to make every individual meal perfect.</p>,
  },
  {
    question: "Is strength training important if my main goal is weight loss?",
    answer: <p>Yes. Resistance training can help maintain muscle during weight loss while improving strength and muscular fitness. Nutrition plays a central role in creating the energy deficit needed for fat loss. Strength training helps support the quality of the physical changes you're working towards. We'll also consider general physical activity and cardiovascular fitness as part of your wider programme.</p>,
  },
  {
    question: "What if I'm a complete beginner?",
    answer: <p>You don't need any previous gym experience to get started. We'll begin with your current capabilities and build from there, spending time on exercise technique, appropriate training loads and helping you become comfortable in the gym. You won't be expected to arrive knowing how to use the equipment. <a href="/personal-training-for-beginners">Learn about personal training for beginners</a>.</p>,
  },
  {
    question: "What if I have limited mobility or an exercise causes discomfort?",
    answer: <p>Your starting point and individual circumstances are part of the assessment process. We can consider suitable exercise variations, appropriate loading and alternatives where necessary. Movement screening may form part of this process, but it doesn't diagnose medical conditions or predict injuries. If you have an injury, unexplained pain or a medical concern, it may be appropriate to seek assessment or advice from a qualified healthcare professional before progressing.</p>,
  },
  {
    question: "How quickly will I see results?",
    answer: <p>Progress varies between individuals. Your starting point, nutritional intake, activity levels, training, recovery and consistency can all influence the rate of change. Rather than promising a particular amount of weight loss within a fixed period, we'll establish sensible ways to monitor your progress and review how you're responding.</p>,
  },
  {
    question: "What nutrition support is included?",
    answer: <p>Coaching and Coaching+ include practical nutrition guidance as part of your ongoing support. This can involve discussing food choices, energy intake, protein, meal structure, relevant habits and how your nutrition supports your goals. It isn't a medical nutrition service or a substitute for advice from a registered dietitian or another appropriately qualified healthcare professional.</p>,
  },
  {
    question: "Do I need a JD Gyms membership?",
    answer: <p>A valid JD Gyms membership is required for paid one-to-one coaching and is purchased separately. If you'd like to attend a free consultation but aren't currently a member, <a href="mailto:hello@aidanbrotherhood.com">contact me before booking</a> so gym access can be confirmed.</p>,
  },
] as const;

export default function FatLossCoachingRenfrew() {
  return (
    <PageShell className="fat-loss-page">
      <section className="fat-hero" aria-labelledby="fat-title">
        <Breadcrumb label="Fat Loss & Body Composition" parent={{ href: "/personal-training-renfrew", label: "Personal Training" }} />
        <div className="container fat-hero-grid">
          <div className="fat-hero-content">
            <p className="eyebrow">Fat loss &amp; body composition coaching · JD Gyms Renfrew</p>
            <h1 id="fat-title">Lose body fat. <span>Build strength.</span> Make progress that lasts.</h1>
            <p className="fat-lead">Whether you want to lose weight, build muscle or improve your overall body composition, you deserve a plan that makes sense for you.</p>
            <p>I'm Aidan Brotherhood, an independent personal trainer at JD Gyms Renfrew. I combine one-to-one strength training, practical nutrition guidance and ongoing support to help you work towards your goals — without extreme diets or unnecessarily complicated routines.</p>
            <div className="fat-hero-actions">
              <ConsultationLink className="btn btn-primary btn-large" placement="fat_loss_hero">Book Your Free Consultation</ConsultationLink>
              <a href="#coaching" className="fat-text-link">Explore Coaching &amp; Prices <Arrow /></a>
            </div>
            <p className="fat-small-note">Free · 30 minutes · In person at JD Gyms Renfrew · No obligation</p>
          </div>
          <figure className="fat-hero-figure">
            <img
              src="https://images.unsplash.com/photo-1758875568722-72961c05d5dd?auto=format&fit=crop&w=1100&q=84"
              srcSet="https://images.unsplash.com/photo-1758875568722-72961c05d5dd?auto=format&fit=crop&w=550&q=80 550w, https://images.unsplash.com/photo-1758875568722-72961c05d5dd?auto=format&fit=crop&w=1100&q=84 1100w"
              sizes="(max-width: 860px) 100vw, 43vw"
              width="900"
              height="1125"
              alt="Illustrative photograph of a trainer demonstrating barbell setup beside a client; not Aidan or JD Gyms Renfrew"
              fetchPriority="high"
              decoding="async"
            />
            <figcaption>TRAINING / NUTRITION / PROGRESS <small>Illustrative coaching photograph, not Aidan or JD Gyms Renfrew</small></figcaption>
          </figure>
        </div>
      </section>

      <section className="section-pad fat-goals" id="your-goals" aria-labelledby="fat-goals-heading">
        <div className="container">
          <div className="fat-heading-grid">
            <div>
              <p className="eyebrow">A starting point that matters to you</p>
              <h2 id="fat-goals-heading">Change your body. <span>Build your confidence.</span></h2>
            </div>
            <div className="fat-heading-copy">
              <p>There's nothing wrong with wanting to look different. You might want to lose body fat, develop more muscle, feel more comfortable in your clothes or regain confidence after time away from training.</p>
              <p>Those are all valid reasons to start. The important part is finding an approach that helps you make progress without demanding that the rest of your life revolves around it.</p>
            </div>
          </div>
          <div className="fat-goals-grid">
            {goals.map((goal) => (
              <article key={goal.number}>
                <span className="fat-index">{goal.number} / YOUR GOALS</span>
                <h3>{goal.title}</h3>
                <p>{goal.description}</p>
              </article>
            ))}
          </div>
          <p className="fat-closing-line">You don't have to choose between changing how you look and becoming more physically capable. Good coaching can make room for both.</p>
        </div>
      </section>

      <section className="section-pad fat-foundations" id="the-approach" aria-labelledby="fat-foundations-heading">
        <div className="container">
          <div className="fat-foundations-intro">
            <p className="eyebrow">A considered approach to body composition</p>
            <h2 id="fat-foundations-heading">More than <span>losing weight.</span></h2>
            <div className="fat-foundations-intro-copy">
              <p>Losing weight and improving body composition aren't necessarily the same thing. If your goal is to lose body fat, what happens to your muscle mass, strength and physical fitness matters too.</p>
              <p>That's why my approach combines practical nutrition, purposeful strength training and habits you can maintain. Not a collection of quick fixes. A process built around you.</p>
            </div>
          </div>
          <div className="fat-feature-grid fat-feature-first">
            <div className="fat-feature-copy">
              <p className="fat-index">01 / NUTRITION</p>
              <h3>Eat well. <span>Understand why.</span></h3>
              <p>Fat loss requires an energy deficit: over time, your body needs to expend more energy than you consume.</p>
              <p>But eating fewer calories doesn't necessarily mean eating a smaller volume of food or following an overly restrictive diet.</p>
              <p>Meals built around protein, vegetables, fruit, fibre-rich carbohydrates and other nutritious foods can help you manage your energy intake while keeping meals satisfying.</p>
              <p>I take a whole-food-first approach, without categorising every food as good or bad. You should be able to enjoy meals with family, eat out occasionally and make food choices that work in the real world.</p>
              <p>With ongoing coaching, we'll explore your existing habits, identify useful changes and develop a nutritional approach suited to your goals and preferences.</p>
              <strong>The aim isn't to make food complicated. It's to help you understand it well enough to make informed decisions.</strong>
            </div>
            <figure className="fat-feature-photo">
              <img
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=82"
                alt="Illustrative photograph of an assortment of nutritious ingredients and food"
                width="800" height="940" loading="lazy" decoding="async"
              />
              <figcaption>Everyday nutrition, not restrictive rules. <small>Illustrative photograph</small></figcaption>
            </figure>
          </div>
          <div className="fat-feature-grid fat-feature-reversed">
            <figure className="fat-feature-photo">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=82"
                alt="Illustrative photograph of resistance-training equipment in a gym"
                width="800" height="940" loading="lazy" decoding="async"
              />
              <figcaption>Strength and muscular fitness are worth developing. <small>Illustrative photograph, not JD Gyms Renfrew</small></figcaption>
            </figure>
            <div className="fat-feature-copy">
              <p className="fat-index">02 / TRAINING</p>
              <h3>Build strength. <span>Develop muscle.</span></h3>
              <p>Exercise can contribute to fat loss, but the purpose of your training shouldn't simply be to burn as many calories as possible.</p>
              <p>Resistance training helps develop strength and muscular fitness. During weight loss, it can also help preserve muscle, supporting a more favourable change in body composition.</p>
              <p>Your programme will be built around your goals, experience and current capabilities. We'll focus on appropriate exercise selection, effective technique and progressive training that becomes more challenging as you adapt.</p>
              <p>Where appropriate, movement screening and practical exercise assessments help establish a starting point. We'll also consider how exercises feel, how you perform them and how you respond to training.</p>
              <p>Not every exercise is right for every person at every stage. The aim is to find effective ways to train, progress appropriately and build confidence.</p>
              <strong>Your sessions should do more than leave you tired. They should help you become stronger and more capable.</strong>
              <a className="inline-link" href="/strength-training-renfrew">Explore strength &amp; muscle-building coaching <Arrow /></a>
            </div>
          </div>
          <div className="fat-consistency">
            <div><p className="fat-index">03 / CONSISTENCY</p><h3>Make progress <span>work with your life.</span></h3></div>
            <div className="fat-consistency-copy">
              <p>The best programme on paper means very little if it doesn't work with your actual circumstances. Your job, family, available time, sleep, preferences and previous experiences all influence what you can realistically maintain.</p>
              <p>We'll consider the wider picture, including regular physical activity, recovery and the habits that support your training and nutrition.</p>
              <p>You won't need to get everything right every day. The goal is to build enough consistency to make meaningful progress, recognise when something isn't working and know how to adapt.</p>
              <strong>Progress doesn't require perfection. It requires an approach you can return to and build on.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad fat-process" id="how-it-works" aria-labelledby="fat-process-heading">
        <div className="container">
          <div className="fat-heading-grid">
            <div><p className="eyebrow">How we work together</p><h2 id="fat-process-heading">Assess. Develop. <span>Progress.</span></h2></div>
            <div className="fat-heading-copy">
              <p>Your coaching should change as you do. I use a structured approach to understand your starting point, develop an appropriate programme and review how you're responding to it.</p>
            </div>
          </div>
          <div className="fat-steps">
            {steps.map((step) => (
              <article key={step.number} className="fat-step">
                <div className="fat-step-title"><span className="fat-index">{step.number} / COACHING PROCESS</span><h3>{step.title}</h3><strong>{step.subtitle}</strong></div>
                <div className="fat-step-content">{step.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
              </article>
            ))}
          </div>
          <div className="fat-process-foot">
            <p>The goal is meaningful progress, supported by informed decisions — not simply following the same plan indefinitely.</p>
            <ConsultationLink placement="fat_loss_process">Book Your Free Consultation</ConsultationLink>
          </div>
        </div>
      </section>

      <section className="section-pad fat-beyond">
        <div className="container fat-beyond-grid">
          <div><p className="eyebrow">The bigger picture</p><h2>The result matters. <span>So does what you build along the way.</span></h2></div>
          <div className="fat-beyond-copy">
            <p>If you want to lose weight, we'll take that goal seriously.</p>
            <p>But I also want you to become stronger, more confident in the gym and better equipped to look after your fitness beyond our sessions together.</p>
            <p>The number on the scales can be a useful measure. It just isn't the only one.</p>
            <p>Lifting a weight that once felt difficult. Feeling more comfortable using gym equipment. Understanding your food choices. Establishing a routine you can continue. These are worthwhile forms of progress too.</p>
            <p>As your goals change, your training can evolve with them. A period focused on fat loss might lead into building muscle, improving strength or maintaining the progress you've made.</p>
            <p>I don't believe personal training should be about making you permanently dependent on a coach. It should help you develop the knowledge, capability and confidence to take greater ownership of your fitness.</p>
            <blockquote>Pursue the result. <span>Build for the long term.</span></blockquote>
            <a className="inline-link" href="/about/approach">Read more about my approach <Arrow /></a>
          </div>
        </div>
      </section>

      <PricingSection variant="fatLoss" />

      <section className="section-pad fat-coach">
        <div className="container fat-coach-grid">
          <div className="fat-coach-mark" aria-label="AB Personal Training — Aidan Brotherhood">
            <span>AB PERSONAL TRAINING</span>
            <strong>Aidan<br />Brotherhood<span>.</span></strong>
            <small>Independent coach / JD Gyms Renfrew</small>
          </div>
          <div className="fat-coach-copy">
            <p className="eyebrow">Aidan Brotherhood · AB Personal Training</p>
            <h2>Coaching that puts <span>the individual first.</span></h2>
            <p>I'm Aidan, the personal trainer behind AB Personal Training.</p>
            <p>I hold a Level 3 personal training qualification and a Level 2 nutrition qualification, and provide independent one-to-one coaching at JD Gyms Renfrew.</p>
            <p>My approach is evidence-informed, practical and centred on the individual. I believe in understanding why we do what we do, measuring progress where it's useful and being willing to adjust the plan when something isn't working.</p>
            <p>Whether you're entering the gym for the first time or looking to bring more structure to your existing routine, my role is to help you train with purpose and understand the process. Not just what to do, but why we're doing it.</p>
            <a href="/about" className="inline-link">Learn more about me <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="section-pad fat-location" id="location" aria-labelledby="fat-location-title">
        <div className="container fat-location-grid">
          <div className="fat-location-copy">
            <p className="eyebrow">Personal training in Renfrew</p>
            <h2 id="fat-location-title">Your training base.<span> JD Gyms Renfrew.</span></h2>
            <p>
              All one-to-one body composition and fat-loss coaching sessions take
              place at JD Gyms Renfrew in Renfrew Retail Park, PA4 9EN.
            </p>
            <p>
              I operate independently within the gym, helping people from
              Renfrew, Paisley, Erskine, Clydebank and the surrounding area
              work towards their goals with a clear, individualised plan.
            </p>
            <a href="/personal-training-renfrew#location" className="inline-link">
              Training location and gym access <Arrow />
            </a>
          </div>
          <aside className="fat-location-panel" aria-label="JD Gyms Renfrew address and access">
            <p className="fat-venue-eyebrow">THE TRAINING VENUE <span>01 / 01</span></p>
            <LocationNote />
          </aside>
        </div>
      </section>

      <section className="section-pad faq-section fat-faq" aria-labelledby="fat-faq-heading">
        <div className="container fat-faq-grid">
          <div><p className="eyebrow">Good to know</p><h2 id="fat-faq-heading">Questions <span>worth asking.</span></h2><p>Clear answers before you choose a personal trainer.</p></div>
          <FAQs items={questions} />
        </div>
      </section>

      <ConsultationCTA title="You don't need a perfect starting point. Just somewhere to begin." />
    </PageShell>
  );
}
