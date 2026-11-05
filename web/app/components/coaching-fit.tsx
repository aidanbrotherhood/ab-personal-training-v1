import { useState } from "react";
import { ConsultationLink } from "./site";
import { plans } from "../lib/offers";
import { signal } from "../lib/measurement";
import { saveFitHandoff } from "../lib/fit-handoff";
import {
  emptyFitAnswers,
  fitSteps,
  recommendCoaching,
  type FitAnswers,
  type FitStep,
} from "../lib/coaching-fit";
import "../coaching-fit.css";

type Option = { value: string; title: string; description: string };
type Question = {
  eyebrow: string;
  title: string;
  context: string;
  options: readonly Option[];
};

const questions: Record<FitStep, Question> = {
  support: {
    eyebrow: "What would be useful?",
    title: "What are you hoping to get from a trainer?",
    context: "Start with the support you want, not the result you want to achieve. Your goals shape the training programme; they don't determine how many sessions you must buy.",
    options: [
      { value: "introduction", title: "A starting point", description: "A couple of sessions to build confidence, refine technique and leave with a plan." },
      { value: "ongoing", title: "Guidance over time", description: "A structured programme, regular coaching, feedback and accountability." },
      { value: "unsure", title: "I'm still working that out", description: "I have an idea of my goals, but not which sort of support would help." },
    ],
  },
  independence: {
    eyebrow: "Between appointments",
    title: "How do you feel about training on your own?",
    context: "Some clients enjoy following a plan independently; others prefer more time being coached. Neither is better — it's about what's sustainable for you.",
    options: [
      { value: "comfortable", title: "Comfortable training independently", description: "With a clear plan, I'd be happy to train between coached sessions." },
      { value: "some-support", title: "I'd like some guidance", description: "I can train alone, but I'd value regular technique checks and accountability." },
      { value: "hands-on", title: "I'd prefer most training to be coached", description: "For now, I feel more comfortable with somebody guiding me in person." },
      { value: "unsure", title: "I haven't decided yet", description: "I'd like to understand the options before choosing." },
    ],
  },
  frequency: {
    eyebrow: "Time together",
    title: "How often would you like to see your trainer?",
    context: "This is about supervised appointments, not your total weekly exercise. Training independently can still be part of a programme.",
    options: [
      { value: "once", title: "Once each week", description: "A regular coached appointment, with training to do on my own where appropriate." },
      { value: "twice", title: "Twice each week", description: "More supervised time to work on technique, consistency and progression." },
      { value: "unsure", title: "I'm not sure yet", description: "I'd prefer to discuss what I can realistically manage." },
    ],
  },
  budget: {
    eyebrow: "Cost and commitment",
    title: "Which level of spending feels comfortable?",
    context: "Choose what works for you. There's no benefit in stretching your budget for more sessions. Ongoing prices are per 28-day block — not per calendar month.",
    options: [
      { value: "one-off", title: "£99 as a one-off", description: "I'm comfortable considering a short introduction, but not ongoing payments right now." },
      { value: "weekly", title: "£180 per four weeks", description: "Ongoing coaching at this price is realistic for me." },
      { value: "twice-weekly", title: "Up to £320 per four weeks", description: "I could consider either of the ongoing options." },
      { value: "none", title: "None of these feels comfortable", description: "I don't want to commit to these prices at present." },
      { value: "unsure", title: "I'd rather talk about cost first", description: "I'd like to understand the full commitment before deciding." },
    ],
  },
  access: {
    eyebrow: "Where we train",
    title: "Would JD Gyms Renfrew work for you?",
    context: "All paid coaching takes place at JD Gyms Renfrew. A valid gym membership is required and purchased separately; you don't need to buy a package to attend a free consultation.",
    options: [
      { value: "member", title: "I'm already a member", description: "I can attend JD Gyms Renfrew." },
      { value: "can-join", title: "I could arrange membership", description: "The location works for me, but I'd need to join before paid sessions." },
      { value: "confirm", title: "I'd need to confirm access", description: "I'm not a member yet, or have questions about getting into the gym." },
      { value: "cannot", title: "I can't train at that location", description: "I wouldn't be able to attend regular sessions at JD Gyms Renfrew." },
    ],
  },
};

const stepTitles: Record<FitStep, string> = {
  support: "Support",
  independence: "Independence",
  frequency: "Frequency",
  budget: "Budget",
  access: "Location",
};

function selectedTitle(key: FitStep, answers: FitAnswers) {
  return questions[key].options.find((option) => option.value === answers[key])?.title;
}

/**
 * No lead-gating, health questions, free-text fields or answer persistence.
 * A package-fit recommendation is not an exercise or medical assessment.
 */
export function CoachingFit() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<FitAnswers>(emptyFitAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const steps = fitSteps(answers);
  const activeStep = steps[Math.min(stepIndex, steps.length - 1)];
  const question = questions[activeStep];
  const chosen = answers[activeStep];
  const decision = showResult ? recommendCoaching(answers) : null;
  const matchingPlan = decision?.packageId
    ? plans.find((plan) => plan.id === decision.packageId)
    : null;

  function start() {
    setStarted(true);
    setStepIndex(0);
    setShowResult(false);
    signal("coaching_fit_started", "/pricing", "pricing_decision_aid");
  }

  function select(key: FitStep, value: string) {
    setAnswers((current) => ({
      ...current,
      [key]: value,
      ...(key === "support" ? { frequency: null } : {}),
    }) as FitAnswers);
  }

  function next() {
    if (chosen === null) return;
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      const result = recommendCoaching(answers);
      if (!result) return;
      setShowResult(true);
      signal("coaching_fit_completed", "/pricing", "pricing_decision_aid", result.packageId || "unsure");
    }
  }

  function back() {
    if (showResult) {
      setShowResult(false);
      setStepIndex(steps.length - 1);
    } else if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    } else {
      setStarted(false);
    }
  }

  function reset() {
    setAnswers(emptyFitAnswers);
    setStarted(false);
    setShowResult(false);
    setStepIndex(0);
    signal("coaching_fit_reset", "/pricing", "pricing_decision_aid");
  }

  return (
    <section className="fit-section" id="find-your-fit" aria-labelledby="fit-title">
      <div className="fit-shell">
        {!started ? (
          <div className="fit-welcome">
            <div className="fit-welcome-copy">
              <p className="fit-kicker"><span className="fit-kicker-rule" /> A clearer way to choose</p>
              <h3 id="fit-title">Not sure which level of <em>support</em> suits you?</h3>
              <p className="fit-welcome-lead">
                The prices are straightforward. Choosing how much support you
                need can be harder. This short decision guide helps you work
                through the trade-offs before we meet.
              </p>
              <div className="fit-welcome-actions">
                <button type="button" className="fit-start-button" onClick={start}>
                  Find your coaching fit <span aria-hidden="true">↗</span>
                </button>
                <a className="fit-text-link" href="#offer-compare-coaching">
                  Compare the packages <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="fit-privacy-note">No email required. No personal details collected. No obligation.</p>
            </div>
            <div className="fit-welcome-visual" aria-hidden="true">
              <div className="fit-visual-eyebrow">The decision, made clearer</div>
              <div className="fit-visual-row"><span>01</span><strong>The kind of help you want</strong><i /></div>
              <div className="fit-visual-row"><span>02</span><strong>Time and independence</strong><i /></div>
              <div className="fit-visual-row"><span>03</span><strong>Budget and gym access</strong><i /></div>
              <div className="fit-visual-conclusion">
                <span>Your starting point</span>
                <strong>A recommendation you can understand.</strong>
              </div>
            </div>
          </div>
        ) : (
          <div className="fit-experience">
            <aside className="fit-rail" aria-label="Your progress">
              <p className="fit-rail-eyebrow">YOUR DECISION GUIDE</p>
              <h3 id="fit-title">A little more clarity.</h3>
              <p>Each answer helps explain which type of support might fit. You can go back and change anything.</p>
              <ol className="fit-progress-list">
                {steps.map((key, index) => (
                  <li key={key} className={showResult || index < stepIndex ? "is-done" : index === stepIndex ? "is-current" : ""}>
                    <span className="fit-progress-number">{index + 1}</span>
                    <span>{stepTitles[key]}</span>
                    {(showResult || index < stepIndex) && <span className="fit-progress-check" aria-hidden="true">✓</span>}
                  </li>
                ))}
                <li className={showResult ? "is-current fit-progress-result" : "fit-progress-result"}>
                  <span className="fit-progress-number">✓</span><span>Your result</span>
                </li>
              </ol>
              <p className="fit-rail-footnote">This is a guide to the packages, not a fitness assessment or a substitute for a conversation.</p>
            </aside>
            <div className="fit-main">
              {!showResult ? (
                <div className="fit-question-panel" key={activeStep}>
                  <div className="fit-main-topline">
                    <span>{question.eyebrow}</span>
                    <span>{String(stepIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
                  </div>
                  <div
                    className="fit-progress-bar"
                    role="progressbar"
                    aria-label="Question progress"
                    aria-valuemin={0}
                    aria-valuemax={steps.length}
                    aria-valuenow={stepIndex + 1}
                  >
                    <span style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }} />
                  </div>
                  <h4 id="fit-question-title">{question.title}</h4>
                  <p className="fit-question-context">{question.context}</p>
                  <div className="fit-options" role="radiogroup" aria-labelledby="fit-question-title">
                    {question.options.map((option) => (
                      <label
                        key={option.value}
                        className={`fit-option${chosen === option.value ? " is-selected" : ""}`}
                      >
                        <input
                          type="radio"
                          name={`fit-${activeStep}`}
                          value={option.value}
                          checked={chosen === option.value}
                          onChange={() => select(activeStep, option.value)}
                        />
                        <span className="fit-option-dot" aria-hidden="true" />
                        <span className="fit-option-copy">
                          <strong>{option.title}</strong>
                          <span>{option.description}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className="fit-controls">
                    <button type="button" onClick={back} className="fit-back-button">
                      <span aria-hidden="true">←</span> {stepIndex === 0 ? "Back to pricing" : "Previous"}
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="fit-next-button"
                      disabled={chosen === null}
                    >
                      {stepIndex === steps.length - 1 ? "See your recommendation" : "Continue"}
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                  <p className="fit-step-help">You can change your answers at any point.</p>
                </div>
              ) : decision ? (
                <div className="fit-result" aria-live="polite">
                  <div className="fit-main-topline">
                    <span>Your personalised comparison</span>
                    <span>COMPLETE</span>
                  </div>
                  <span className="fit-result-kicker">
                    {decision.kind === "match" ? "AN OPTION THAT FITS YOUR PREFERENCES" : "A SENSIBLE NEXT STEP"}
                  </span>
                  <h4>{decision.heading}</h4>
                  {matchingPlan && (
                    <div className="fit-plan-bar">
                      <div>
                        <span className="fit-plan-label">An option to explore</span>
                        <strong>{matchingPlan.title}</strong>
                        <span>{matchingPlan.frequency}</span>
                      </div>
                      <div className="fit-plan-price">
                        <strong>{matchingPlan.price}</strong>
                        <span>{matchingPlan.period}</span>
                      </div>
                    </div>
                  )}
                  <div className="fit-result-explanation">
                    <div><span className="fit-result-index">01</span><p>{decision.reasoning}</p></div>
                    <div><span className="fit-result-index">02</span><p><strong>Worth considering.</strong> {decision.consideration}</p></div>
                    <div><span className="fit-result-index">03</span><p><strong>What happens next.</strong> {decision.nextStep}</p></div>
                  </div>
                  <div className="fit-result-answers">
                    <p>Your preferences</p>
                    <ul>
                      {steps.map((step) => (
                        <li key={step}><span>{stepTitles[step]}</span><strong>{selectedTitle(step, answers)}</strong></li>
                      ))}
                    </ul>
                  </div>
                  <div className="fit-result-actions">
                    {answers.access === "confirm" || answers.access === "cannot" ? (
                      <a className="fit-next-button" href="mailto:hello@aidanbrotherhood.com?subject=Question%20about%20training%20at%20JD%20Gyms%20Renfrew">
                        Ask about gym access <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <ConsultationLink
                        className="fit-next-button"
                        placement="pricing_decision_aid_result"
                        offer={decision.packageId || "unsure"}
                        onBeforeNavigate={() => saveFitHandoff(answers, decision)}
                      >
                        Book a free consultation
                      </ConsultationLink>
                    )}
                    <button type="button" className="fit-back-button" onClick={back}>
                      <span aria-hidden="true">←</span> Review answers
                    </button>
                  </div>
                  <p className="fit-result-note">Free consultation · 30 minutes · In person · No obligation to purchase. A JD Gyms membership is purchased separately for paid sessions.</p>
                  <div className="fit-alternatives">
                    <p>All three packages remain available to compare</p>
                    <div className="fit-alternatives-grid">
                      {plans.map((plan) => (
                        <a href={`#offer-coaching-${plan.id}`} key={plan.id} className={decision.packageId === plan.id ? "is-highlighted" : ""}>
                          <span>{plan.title}</span>
                          <strong>{plan.price}</strong>
                          <small>{plan.period}</small>
                          <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </div>
                    <button type="button" className="fit-reset-button" onClick={reset}>
                      Start again with different answers <span aria-hidden="true">↻</span>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
