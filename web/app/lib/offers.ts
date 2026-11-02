/**
 * Canonical public offer data. Preserve stable ids for enquiries, analytics attributes,
 * and future payment integrations even when display names change.
 */
export const plans = [
  {
    id: "introduction",
    title: "Starter",
    price: "£99",
    sessions: 2,
    frequency: "Two 60-minute sessions",
    period: "One-off payment",
    eyebrow: "A SHORT INTRODUCTION",
    tagline: "Find your feet.",
    description:
      "Two sessions to work on the basics, get comfortable with technique and leave with a clear starting point.",
    bestFor: "For getting started without ongoing coaching.",
    features: [
      "Training needs assessment",
      "Hands-on technique coaching",
      "A practical starting plan",
    ],
  },
  {
    id: "weekly",
    title: "Coaching",
    price: "£180",
    sessions: 4,
    frequency: "One 60-minute session each week",
    period: "Per four-week block",
    eyebrow: "ONGOING COACHING",
    tagline: "Build consistency. Keep progressing.",
    description:
      "A coached session each week, with a personalised plan for the training you do between appointments.",
    bestFor: "For people who want structure, guidance and regular accountability.",
    features: [
      "Four one-to-one coached sessions",
      "Personalised training programme",
      "Practical nutrition guidance",
      "Weekly check-in and progress review",
    ],
  },
  {
    id: "complete",
    title: "Coaching+",
    price: "£320",
    sessions: 8,
    frequency: "Two 60-minute sessions each week",
    period: "Per four-week block",
    eyebrow: "MORE HANDS-ON SUPPORT",
    tagline: "More time together. More guidance.",
    description:
      "Everything in Coaching, with a second coached session each week for more technique work and in-person support.",
    bestFor: "For people who want twice-weekly hands-on coaching.",
    features: [
      "Eight one-to-one coached sessions",
      "Personalised training programme",
      "Practical nutrition guidance",
      "Weekly check-in and progress review",
    ],
  },
] as const;

export type PackageId = (typeof plans)[number]["id"] | "unsure";
export const packageIds: readonly string[] = [
  "unsure",
  ...plans.map((plan) => plan.id),
];

/** A comparison aid, not the primary value proposition. */
export function getPerSessionRate(plan: Pick<(typeof plans)[number], "price" | "sessions">): string {
  const rate = Number(plan.price.replace("£", "")) / plan.sessions;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: Number.isInteger(rate) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(rate);
}
