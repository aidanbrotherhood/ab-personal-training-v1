/**
 * A transparent package-fit aid, not a training assessment.
 * This logic intentionally does not infer exercise needs, health status,
 * or affordability from a visitor's goals, age or gym experience.
 */
export type SupportNeed = "introduction" | "ongoing" | "unsure";
export type Independence = "comfortable" | "some-support" | "hands-on" | "unsure";
export type Frequency = "once" | "twice" | "unsure";
export type Budget = "one-off" | "weekly" | "twice-weekly" | "none" | "unsure";
export type Access = "member" | "can-join" | "confirm" | "cannot";

export type FitAnswers = {
  support: SupportNeed | null;
  independence: Independence | null;
  frequency: Frequency | null;
  budget: Budget | null;
  access: Access | null;
};

export type FitStep = keyof FitAnswers;
export type FitDecision = {
  kind: "match" | "discuss" | "not-fit";
  packageId: "introduction" | "weekly" | "complete" | null;
  heading: string;
  reasoning: string;
  consideration: string;
  nextStep: string;
};

export const emptyFitAnswers: FitAnswers = {
  support: null,
  independence: null,
  frequency: null,
  budget: null,
  access: null,
};

const introductorySteps: FitStep[] = [
  "support", "independence", "budget", "access",
];
const ongoingSteps: FitStep[] = [
  "support", "independence", "frequency", "budget", "access",
];

export function fitSteps(answers: FitAnswers): FitStep[] {
  return answers.support === "introduction" ? introductorySteps : ongoingSteps;
}

export function fitComplete(answers: FitAnswers): boolean {
  return fitSteps(answers).every((step) => answers[step] !== null);
}

export function recommendCoaching(answers: FitAnswers): FitDecision | null {
  if (!fitComplete(answers)) return null;

  // A valid JD Gyms membership is required for paid sessions.
  if (answers.access === "cannot") {
    return {
      kind: "not-fit",
      packageId: null,
      heading: "In-person coaching may not be the right fit.",
      reasoning: "All paid one-to-one sessions take place at JD Gyms Renfrew, and a separate gym membership is required. I don't currently provide sessions at other gyms or at clients' homes.",
      consideration: "I wouldn't suggest paying for a package you may not be able to use.",
      nextStep: "If your circumstances change, you're welcome to get in touch or arrange a free consultation.",
    };
  }
  if (answers.access === "confirm") {
    return {
      kind: "discuss",
      packageId: null,
      heading: "Let's clarify gym access first.",
      reasoning: "You haven't confirmed whether you can attend JD Gyms Renfrew. There's little point recommending paid coaching until the location and membership arrangements work for you.",
      consideration: "Paid-session gym membership is purchased separately. Non-member access for the free consultation must also be arranged beforehand.",
      nextStep: "Contact me before booking so we can confirm access and then talk about coaching.",
    };
  }
  if (answers.budget === "none") {
    return {
      kind: "not-fit",
      packageId: null,
      heading: "There's no need to stretch your budget.",
      reasoning: "None of the current paid packages is comfortably within the budget you've indicated. I don't want to recommend a purchase that doesn't suit your circumstances.",
      consideration: "Starter is £99 one-off; ongoing coaching is £180 or £320 for each four-week block. Gym membership is extra.",
      nextStep: "The free consultation remains available if you'd like to discuss your options without purchasing anything.",
    };
  }
  if (answers.support === "unsure") {
    return {
      kind: "discuss",
      packageId: null,
      heading: "It makes sense to talk before choosing.",
      reasoning: "You haven't decided whether you want a short introduction or regular support. That's the key difference between Starter and the two ongoing packages.",
      consideration: "Starter doesn't include ongoing programming, nutrition guidance or weekly reviews. Coaching and Coaching+ do.",
      nextStep: "We can discuss the level of support that suits you during a free consultation. No package decision is required.",
    };
  }
  if (answers.support === "introduction") {
    if (answers.independence === "hands-on") {
      return {
        kind: "discuss",
        packageId: null,
        heading: "Let's make sure a short introduction is enough.",
        reasoning: "You'd like an initial introduction, but you also prefer substantial hands-on guidance. Starter includes two coached sessions and a starting plan, not ongoing supervision or weekly check-ins.",
        consideration: "Depending on your routine, a continuing package could be more useful. I wouldn't automatically recommend the more expensive option.",
        nextStep: "A free consultation can help us establish whether Starter would genuinely meet your needs.",
      };
    }
    if (answers.budget === "unsure") {
      return {
        kind: "discuss",
        packageId: null,
        heading: "Starter could be worth exploring.",
        reasoning: "Your preference is for an introduction rather than an ongoing programme. Starter provides two coached sessions, technique support and a practical starting plan.",
        consideration: "It's a £99 one-off payment, plus separate gym membership. You've indicated you'd like to think about the cost before deciding.",
        nextStep: "We can discuss the cost and whether that short introduction is right for you, without any obligation.",
      };
    }
    return {
      kind: "match",
      packageId: "introduction",
      heading: "Starter looks like a sensible first step.",
      reasoning: "You've said you want a short introduction rather than regular coaching. Starter gives you two full sessions to work on technique and leave with a practical starting plan.",
      consideration: "Starter doesn't include ongoing programming, nutrition guidance or weekly reviews. If you later want regular support, we can discuss that separately.",
      nextStep: "Book a free consultation first. You don't need to purchase Starter to meet me.",
    };
  }
  // Support is ongoing below. Budget and coaching frequency can conflict.
  if (answers.budget === "one-off") {
    return {
      kind: "discuss",
      packageId: null,
      heading: "Your preferred support and budget don't quite align.",
      reasoning: "You've said you want ongoing coaching, but the budget you've indicated is a one-off £99 purchase. Starter is a short introduction, not an ongoing programme.",
      consideration: "Coaching is £180 and Coaching+ is £320 per four-week block; gym membership is additional.",
      nextStep: "We can talk through what would be useful without treating Starter as a substitute for weekly coaching.",
    };
  }
  if (answers.frequency === "unsure") {
    return {
      kind: "discuss",
      packageId: null,
      heading: "Let's decide how much coached time is useful.",
      reasoning: "You want ongoing support but haven't settled on whether you'd prefer one or two in-person sessions each week. Both ongoing packages include personalised programming and weekly reviews.",
      consideration: "Coaching includes four coached sessions per four weeks (£180). Coaching+ includes eight (£320).",
      nextStep: "A consultation can help clarify which frequency works for your schedule, goals and budget.",
    };
  }
  if (answers.frequency === "twice" && answers.budget !== "twice-weekly") {
    return {
      kind: "discuss",
      packageId: null,
      heading: "There's a trade-off to work through.",
      reasoning: "You'd like twice-weekly in-person coaching, while the budget you've indicated fits one coached session per week. Coaching provides one coached session weekly plus a programme for independent training.",
      consideration: "Coaching+ would provide two supervised sessions weekly, but costs £320 per four-week block. I wouldn't recommend exceeding a stated budget.",
      nextStep: "Let's discuss whether one coached session with independent training is appropriate, or whether it's better to wait.",
    };
  }
  if (answers.frequency === "once") {
    if (answers.independence === "hands-on") {
      return {
        kind: "discuss",
        packageId: null,
        heading: "Let's make sure weekly coaching gives enough support.",
        reasoning: "You've chosen one coached session a week but would prefer most training to be hands-on. Coaching includes an independent programme, so it's worth discussing how comfortable you'd feel between sessions.",
        consideration: "Coaching+ has more supervised time, but it isn't automatically the better choice and costs more.",
        nextStep: "We can discuss how your week would work before recommending a commitment.",
      };
    }
    return {
      kind: "match",
      packageId: "weekly",
      heading: "Coaching looks like the right level to explore.",
      reasoning: "You're looking for ongoing guidance with one coached session each week. Coaching also includes an individualised programme, practical nutrition guidance and weekly reviews between sessions.",
      consideration: "It includes four supervised sessions per four-week block, not two coached sessions each week. More supervised time is available through Coaching+ if you decide you want it.",
      nextStep: "Start with a free consultation and we'll check that this arrangement fits your schedule and needs.",
    };
  }
  return {
    kind: "match",
    packageId: "complete",
    heading: "Coaching+ looks like the stronger fit.",
    reasoning: "You'd like ongoing coaching with two supervised sessions each week, and you've indicated that the four-week price fits your budget. Coaching+ includes eight coached sessions, programming and regular reviews.",
    consideration: "It costs £320 per four weeks rather than £180 for Coaching. If you decide one supervised session per week is enough, Coaching remains a perfectly valid choice.",
    nextStep: "Book a free consultation first; there's no requirement to decide or pay before we meet.",
  };
}
