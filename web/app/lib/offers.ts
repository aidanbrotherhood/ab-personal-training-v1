export const plans = [
  {
    id: "introduction",
    title: "PT Introduction",
    price: "£99",
    sessions: 2,
    frequency: "No ongoing commitment",
    description:
      "Get comfortable with coaching and leave with a practical starting point.",
    features: [
      "Training needs assessment",
      "One-to-one technique coaching",
      "A practical starting plan",
    ],
  },
  {
    id: "weekly",
    title: "Weekly Coaching",
    price: "£180",
    sessions: 4,
    frequency: "Approximately one session per week",
    description:
      "Regular coaching, with direction for the training you do between sessions.",
    features: [
      "Personalised training programme",
      "Practical nutrition guidance",
      "Weekly check-in and progress review",
    ],
  },
  {
    id: "complete",
    title: "Complete Coaching",
    price: "£320",
    sessions: 8,
    frequency: "Approximately two sessions per week",
    description:
      "More time working together on your training, technique and consistency.",
    features: [
      "Personalised training programme",
      "Practical nutrition coaching",
      "Weekly accountability and progress reviews",
    ],
  },
] as const;
export type PackageId = (typeof plans)[number]["id"] | "unsure";
export const packageIds: readonly string[] = [
  "unsure",
  ...plans.map((plan) => plan.id),
];
