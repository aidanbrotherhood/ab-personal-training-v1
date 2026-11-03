import {
  Arrow,
  Breadcrumb,
  ConsultationLink,
  PageShell,
} from "../components/site";
import "../my-approach.css";

const principles = [
  {
    number: "01",
    title: "Evidence before assumption.",
    paragraphs: [
      "I believe in understanding why we do what we do.",
      "Training decisions should be informed by the best available research, meaningful performance data and your individual response to exercise. That means measuring what matters, evaluating what’s working and being willing to change course when the evidence suggests a better approach.",
      "But science isn’t a collection of rigid rules, and more data doesn’t automatically mean better coaching. The value lies in using evidence intelligently, interpreting it in context and applying it to the person in front of me.",
    ],
    close: "Understand the evidence. Observe the individual. Make informed decisions.",
  },
  {
    number: "02",
    title: "Continuous improvement, without the pursuit of perfection.",
    paragraphs: [
      "I believe that much of what we’re capable of is developed through practice.",
      "A little more strength. A movement that becomes easier. Greater confidence with an unfamiliar exercise. A habit maintained for another week. Individually, these changes may seem small. Over time, they can become significant.",
      "But improvement isn’t always linear. There will be difficult weeks, setbacks, changing priorities and periods when maintaining progress is an achievement in itself.",
      "I don’t believe good training means constantly pushing harder, ignoring fatigue or chasing a personal best every session. It means pursuing meaningful improvement with consistency, patience and the judgement to know when to challenge yourself and when to adapt.",
    ],
    close: "Progress is a practice, not a destination.",
  },
  {
    number: "03",
    title: "Train the individual, not the average.",
    paragraphs: [
      "Two people can have the same goal and need very different programmes. They may differ in experience, physical capabilities, preferences, schedules, confidence and response to training.",
      "A programme that looks excellent on paper means very little if it doesn’t work for the person expected to follow it.",
      "That’s why I want to understand more than your goals. I want to understand where you’re starting, how your body responds to training, what challenges you face and what you genuinely enjoy.",
      "Your programme should be guided by sound principles, but shaped around your circumstances.",
    ],
    close: "The science informs the approach. The individual determines its application.",
  },
  {
    number: "04",
    title: "Build for the long term.",
    paragraphs: [
      "I don’t see physical fitness as something we should pursue for a few months and then abandon.",
      "Strength, cardiovascular fitness, mobility and physical independence matter throughout our lives. Our goals will change. Our circumstances will change. The way we train may need to change with them.",
      "But the underlying purpose remains: developing and maintaining the physical capabilities that help us live well.",
      "That means taking progression seriously while also respecting recovery, appropriate training loads and the demands of life outside the gym.",
      "I’m interested in helping you achieve your immediate goals without losing sight of your long-term health and well-being.",
    ],
    close: "Train for what matters today. Build for the life ahead.",
  },
] as const;

const goals = [
  {
    number: "01",
    title: "Strength and muscular development",
    description:
      "Build strength and muscle through structured resistance training, technique development and progressive overload.",
  },
  {
    number: "02",
    title: "Fat loss and body composition",
    description:
      "Combine appropriate exercise with practical nutrition guidance and sustainable habits that support your goals.",
  },
  {
    number: "03",
    title: "Sport and physical performance",
    description:
      "Develop the physical qualities relevant to your sport, experience and performance demands.",
  },
  {
    number: "04",
    title: "Movement and physical confidence",
    description:
      "Develop exercise competency, strength and confidence in movements that are relevant to you.",
  },
  {
    number: "05",
    title: "Long-term health and capability",
    description:
      "Build and maintain strength, fitness and physical capacity to support an active, independent life.",
  },
] as const;

export default function MyApproach() {
  return (
    <PageShell className="approach-page">
      <section className="approach-hero" aria-labelledby="approach-title">
        <Breadcrumb label="My Approach" parent={{ href: "/about", label: "About" }} />
        <div className="container approach-hero-grid">
          <div className="approach-hero-copy">
            <p className="eyebrow">My approach · AB Personal Training</p>
            <h1 id="approach-title">
              Become more capable.
              <br />
              <span>Live more fully.</span>
            </h1>
            <p className="approach-hero-lead">
              I believe physical training should be about more than changing how we look.
            </p>
            <p>
              It’s about developing strength, improving our health, discovering
              what we’re capable of and building the physical foundations for a
              fuller life.
            </p>
            <p>
              Whether your goal is to build muscle, lose body fat, improve
              sporting performance or remain strong and independent as you age,
              I believe the same principle applies: <strong>your training should
              help you become more capable of living the life you want to live.</strong>
            </p>
            <p>
              At AB Personal Training, that belief shapes everything from how
              we establish your starting point to how we measure progress.
            </p>
            <div className="approach-hero-actions">
              <ConsultationLink className="btn btn-primary btn-large" placement="approach_hero">
                Book your free consultation
              </ConsultationLink>
              <a className="approach-text-link" href="#purpose">
                Discover the philosophy <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="approach-caption">Evidence-informed coaching · JD Gyms Renfrew</p>
          </div>
          <figure className="approach-hero-image">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1050&q=82"
              srcSet="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=570&q=78 570w, https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1050&q=82 1050w"
              sizes="(max-width: 920px) 100vw, 40vw"
              width="850"
              height="1080"
              fetchPriority="high"
              decoding="async"
              alt="Illustrative image of deliberate strength training in a gym"
            />
            <figcaption>
              <span>STRENGTH / PURPOSE / LONGEVITY</span>
              <small>Illustrative fitness imagery — not AB client photography</small>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section-pad approach-purpose" id="purpose">
        <div className="container approach-purpose-grid">
          <div className="approach-sticky-heading">
            <p className="eyebrow">More than exercise</p>
            <h2>Training is the means. <span>Life is the purpose.</span></h2>
          </div>
          <div className="approach-reading">
            <p>Strength has value beyond the weight on a barbell.</p>
            <p>
              It’s being able to lift something heavy without hesitation. It’s
              having the fitness to enjoy an active day without feeling exhausted.
              It’s performing better in the sport you love. It’s maintaining the
              physical independence to keep doing the things that matter as you get older.
            </p>
            <p>
              And sometimes, it’s the quiet confidence that comes from achieving
              something you once believed was beyond you.
            </p>
            <p>I believe these are some of the most meaningful reasons to train.</p>
            <p>
              There’s nothing wrong with wanting to look better. Building muscle,
              reducing body fat and improving your physique are worthwhile goals,
              and I take them seriously.
            </p>
            <p>
              But I don’t believe our physical development should end at
              appearance. I want training to help you build a body that is not
              only stronger or fitter, but more capable, resilient and prepared
              for the demands of your life.
            </p>
          </div>
        </div>
        <div className="container">
          <blockquote className="approach-quote">
            <span aria-hidden="true">“</span>
            <p>The purpose of training isn’t simply to become better at training. It’s to become more capable of living.</p>
          </blockquote>
        </div>
      </section>

      <section className="section-pad approach-principles" id="principles">
        <div className="container approach-section-intro">
          <div>
            <p className="eyebrow">What guides my coaching</p>
            <h2>Principles, <span>not shortcuts.</span></h2>
          </div>
          <p>
            There is no single programme, exercise or training philosophy that
            works equally well for everyone. Good coaching requires an
            understanding of the science, an appreciation of the individual and
            the judgement to bring those things together. Four principles guide my approach.
          </p>
        </div>
        <div className="container approach-principle-grid">
          {principles.map((principle) => (
            <article className="approach-principle" key={principle.number}>
              <span className="approach-index">{principle.number} / THE PRINCIPLES</span>
              <h3>{principle.title}</h3>
              <div className="approach-principle-text">
                {principle.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <p className="approach-principle-end">{principle.close}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad approach-body-mind" id="body-and-mind">
        <div className="container approach-human-grid">
          <div className="approach-human-copy">
            <p className="eyebrow">Discover what you’re capable of</p>
            <h2>The physical challenge can become <span>something more.</span></h2>
            <p>
              Some of the most valuable changes that come from training aren’t
              measured in kilograms or repetitions.
            </p>
            <p>
              There’s something powerful about learning to do something you
              couldn’t do before: your first proper push-up, lifting a weight
              you once found intimidating, completing a difficult workout or
              becoming comfortable in a gym that previously felt unfamiliar.
            </p>
            <p>
              These experiences can change how you see yourself. Not because
              physical strength guarantees mental strength, or because every
              challenge needs to be overcome through willpower, but because
              learning, practising and succeeding at difficult things can
              develop confidence and a greater sense of personal capability.
            </p>
            <p>
              I believe the relationship between our physical and psychological
              well-being is an important part of training. Exercise can be an
              opportunity to challenge ourselves, build confidence, develop
              self-trust and experience what sustained effort makes possible.
            </p>
            <p>
              As a coach, I want to create an environment where you’re
              appropriately challenged, supported when things are difficult
              and encouraged to recognise your progress.
            </p>
            <p>
              The aim isn’t to make you dependent on someone telling you what
              to do. It’s to help you become more knowledgeable, more confident
              and increasingly capable of making decisions about your own training.
            </p>
            <p className="approach-human-emphasis">
              Sometimes the most meaningful thing you build in the gym is a
              different understanding of what you’re capable of.
            </p>
          </div>
          <figure className="approach-human-image">
            <img
              src="https://images.unsplash.com/photo-1758875569399-99a7d80ace43?auto=format&fit=crop&w=1050&q=82"
              alt="Illustrative personal trainer and client discussing a training plan in a gym"
              width="1050"
              height="900"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Good coaching is a conversation, not just a programme. <small>Illustrative photograph — not Aidan or an AB client</small></figcaption>
          </figure>
        </div>
      </section>

      <section className="section-pad approach-process" id="how-i-coach">
        <div className="container approach-section-intro">
          <div>
            <p className="eyebrow">How I coach</p>
            <h2>Understand where you are. <span>Build what matters. Measure what improves.</span></h2>
          </div>
          <p>
            A philosophy only means something if it changes how we work. My
            coaching follows a straightforward process built around
            understanding the individual, developing relevant physical
            capabilities and learning from the results.
          </p>
        </div>
        <div className="container approach-process-grid">
          <article>
            <span className="approach-index">01 / ASSESS</span>
            <h3>Understand your starting point.</h3>
            <p>
              Before prescribing training, I want to understand the person
              I’m working with. That begins with your goals, training history,
              lifestyle and exercise readiness.
            </p>
            <p>
              Where appropriate, we can also use structured movement screening,
              including the Functional Movement Screen (FMS), to observe how you
              perform specific movement tasks. As coaching begins, we’ll
              establish additional strength, fitness or performance baselines
              relevant to your goals.
            </p>
            <p>
              The purpose isn’t to find faults or compare you with somebody
              else. It’s to develop a clearer picture of where you’re starting
              and use that information to inform what comes next.
            </p>
            <a className="inline-link" href="/movement-assessment">
              Explore the movement assessment <Arrow />
            </a>
          </article>
          <article>
            <span className="approach-index">02 / DEVELOP</span>
            <h3>Train with purpose.</h3>
            <p>
              Once we understand your starting point, we build a programme
              around your goals.
            </p>
            <p>
              For some, that means developing strength and muscle. For others,
              improving cardiovascular fitness, learning movement skills or
              preparing for the demands of a particular sport. Often, it means
              working towards several of these outcomes together.
            </p>
            <p>
              I use established training principles to guide exercise selection,
              technique development, progression and recovery. The programme
              should challenge you, but it should also be realistic,
              understandable and appropriate to your capabilities.
            </p>
            <p>
              The aim is not simply to complete sessions. It’s to develop
              meaningful physical qualities over time.
            </p>
          </article>
          <article>
            <span className="approach-index">03 / PROGRESS</span>
            <h3>Learn, measure and refine.</h3>
            <p>Training shouldn’t be guesswork.</p>
            <p>
              Throughout your coaching, we’ll look at how you’re performing,
              how you’re responding and whether the programme is moving you
              towards your goals.
            </p>
            <p>
              That might mean tracking the weight you lift, the repetitions you
              complete, improvements in fitness or relevant body-composition
              measures. We can also revisit selected movement assessments and
              discuss changes in confidence, consistency and everyday physical capability.
            </p>
            <p>
              Not everything that matters can be captured by a number. But where
              we can measure progress meaningfully, I believe we should.
            </p>
            <p>
              We’ll use that information to identify what’s working, recognise
              what needs attention and refine your training.
            </p>
          </article>
        </div>
        <div className="container approach-process-footer">
          <p>Assessment informs training. Training creates adaptation. Progress helps determine what comes next.</p>
          <a href="/pricing" className="inline-link">Explore coaching &amp; prices <Arrow /></a>
        </div>
      </section>

      <section className="section-pad approach-goals" id="your-goals">
        <div className="container approach-section-intro">
          <div>
            <p className="eyebrow">Individual ambition. Shared principles.</p>
            <h2>Different goals. <span>The same commitment to good coaching.</span></h2>
          </div>
          <div className="approach-goal-intro">
            <p>
              There’s no single definition of what it means to be fit. For one
              person, success might mean gaining muscle and becoming
              significantly stronger. For another, it might mean losing body
              fat while developing sustainable habits.
            </p>
            <p>
              An athlete might want to improve performance in their chosen
              sport. Someone else may simply want to feel more comfortable,
              confident and capable in everyday life.
            </p>
            <p>
              These goals require different priorities. My role is to understand
              what matters to you and apply appropriate training principles
              to help you pursue it.
            </p>
          </div>
        </div>
        <div className="container approach-goal-grid">
          {goals.map((goal) => (
            <article key={goal.number}>
              <span className="approach-index">{goal.number} / YOUR GOALS</span>
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
            </article>
          ))}
        </div>
        <div className="container approach-goals-close">
          <p>
            You don’t need to fit into one category. And your goals don’t need
            to stay the same forever.
          </p>
          <p>
            The commitment is to meet you where you are, understand what
            you’re working towards and help you make meaningful progress.
          </p>
        </div>
      </section>

      <section className="section-pad approach-longview" id="long-view">
        <div className="container approach-longview-grid">
          <div>
            <p className="eyebrow">A lifetime of development</p>
            <h2>Progress isn’t a straight line. <span>And it doesn’t have an expiry date.</span></h2>
          </div>
          <div className="approach-longview-copy">
            <p>
              We often think about fitness in short blocks of time. The next
              eight weeks. The next transformation. The next personal best.
            </p>
            <p>
              Short-term goals can be motivating, and they have their place.
              But I believe the more important question is what we can build
              and maintain over years and decades.
            </p>
            <ul className="approach-questions">
              <li>Can you become stronger while developing confidence in how you move?</li>
              <li>Can you improve your fitness in a way that fits your life?</li>
              <li>Can you establish habits that remain useful as your circumstances change?</li>
              <li>Can your training evolve with you, rather than becoming something you have to leave behind?</li>
            </ul>
            <p>
              I want progress to be measurable, but I also want it to be
              meaningful. Sometimes success is lifting more weight. Sometimes
              it’s returning to consistent training after a difficult period.
              Sometimes it’s maintaining strength while life becomes more
              demanding. And sometimes it’s discovering that something you
              once found challenging has become part of everyday life.
            </p>
            <p>A good programme should be capable of adapting to all of those realities.</p>
          </div>
        </div>
        <div className="container">
          <p className="approach-longview-statement">
            The objective is not endless improvement at any cost. It’s the lifelong
            development and preservation of what matters to you.
          </p>
        </div>
      </section>

      <section className="section-pad approach-invitation" id="start">
        <div className="container approach-invitation-grid">
          <div>
            <p className="eyebrow">Your starting point</p>
            <h2>You may be capable of <span>more than you think.</span></h2>
          </div>
          <div className="approach-invitation-copy">
            <p>You don’t need to arrive with everything figured out.</p>
            <p>
              You don’t need to be fit already, know your way around a gym or
              have a perfectly defined goal. You only need somewhere to begin.
            </p>
            <p>
              My role is to help you understand that starting point, develop a
              plan grounded in sound training principles and support you as you
              work towards something meaningful.
            </p>
            <p>
              Whether you’re chasing a personal best, changing your body
              composition or simply wanting to feel stronger and healthier,
              I’d be glad to help.
            </p>
            <h3>Let’s start with a conversation.</h3>
            <p>
              Book a free 30-minute consultation at JD Gyms Renfrew to discuss
              your goals, your training experience and what working together could look like.
            </p>
            <ConsultationLink className="btn btn-primary btn-large" placement="approach_closing">
              Book your free consultation
            </ConsultationLink>
            <p className="approach-footnote">Free · 30 minutes · In person · No obligation</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
