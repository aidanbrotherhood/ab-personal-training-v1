export const primaryServiceCategory = "Personal trainer";

export const serviceGroupIds = [
  "start-here",
  "in-person-coaching",
  "strength-conditioning",
  "body-composition-nutrition",
  "remote-hybrid-support",
] as const;

export type ServiceGroupId = (typeof serviceGroupIds)[number];

export type ServiceGroup = {
  id: ServiceGroupId;
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  price: string;
  group: ServiceGroupId;
  whoItIsFor: string[];
  helpsWith: string[];
  approach: string;
  notThis?: string;
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "start-here",
    title: "Start here",
    description: "Useful first steps if you are new, returning to training, or working out what support fits.",
  },
  {
    id: "in-person-coaching",
    title: "In-person coaching",
    description: "One-to-one sessions for structured training, better technique, and steadier progress.",
  },
  {
    id: "strength-conditioning",
    title: "Strength and conditioning",
    description: "Coaching for strength, fitness, movement quality, and general physical capability.",
  },
  {
    id: "body-composition-nutrition",
    title: "Body composition and nutrition",
    description: "Practical support for fat loss, muscle retention, nutrition habits, and realistic tracking.",
  },
  {
    id: "remote-hybrid-support",
    title: "Remote and hybrid support",
    description: "Coaching structure and accountability when you want support beyond regular in-person sessions.",
  },
];

export const services: Service[] = [
  {
    slug: "initial-pt-consultation",
    title: "Initial PT Consultation",
    description:
      "A 30 minute consultation to discuss your goals, current health, training history, confidence level, schedule and whether personal training is the right fit.",
    price: "Free",
    group: "start-here",
    whoItIsFor: [
      "You want to talk through your goals before committing to coaching.",
      "You are unsure whether in-person, hybrid, or online support is the right fit.",
      "You want a practical first conversation without pressure.",
    ],
    helpsWith: [
      "Clarifying your training goals and current constraints.",
      "Understanding what kind of support would be useful.",
      "Deciding on sensible next steps.",
    ],
    approach:
      "This is a short, practical conversation. It is not a medical screening or a full programme design session; it is there to establish fit and direction.",
    notThis:
      "It is not a sales script, medical intake, or promise that coaching is automatically the right next step.",
  },
  {
    slug: "personal-training",
    title: "Personal Training",
    description:
      "One-to-one personal training for adults who want structured coaching, better gym confidence and consistent progress with strength, fitness, body composition and long-term health.",
    price: "From £40",
    group: "in-person-coaching",
    whoItIsFor: [
      "You want regular one-to-one coaching in the gym.",
      "You prefer clear structure over guessing what to do each session.",
      "You want support that is serious but not intimidating.",
    ],
    helpsWith: [
      "Building confidence with exercises and equipment.",
      "Improving strength, fitness, and consistency.",
      "Creating a repeatable training rhythm.",
    ],
    approach:
      "Sessions focus on technique, appropriate progression, and habits you can repeat. The goal is useful training that fits your life and can compound over time.",
    notThis:
      "It is not random workouts, punishment sessions, or a plan built around exhausting you for the sake of it.",
  },
  {
    slug: "strength-training",
    title: "Strength Training",
    description:
      "Coaching focused on building strength safely and progressively through better technique, structured programming and measurable progress in the gym.",
    price: "From £40",
    group: "strength-conditioning",
    whoItIsFor: [
      "You want to get stronger with a clear plan.",
      "You want help learning or refining key lifts.",
      "You like measurable progress but want sensible pacing.",
    ],
    helpsWith: [
      "Exercise technique and gym confidence.",
      "Progressive programming around your current level.",
      "Tracking strength without turning training into a test every session.",
    ],
    approach:
      "Strength work is built around suitable movements, consistent practice, and manageable progression. The emphasis is on quality, repeatability, and evidence-informed basics.",
    notThis:
      "It is not maxing out every week or chasing numbers before technique, recovery, and consistency are in place.",
  },
  {
    slug: "strength-and-conditioning",
    title: "Strength & Conditioning",
    description:
      "Coaching that combines strength training, conditioning, movement quality and fitness to help you become stronger, fitter and more physically capable.",
    price: "From £40",
    group: "strength-conditioning",
    whoItIsFor: [
      "You want to feel more capable across strength and fitness.",
      "You want conditioning that supports your training rather than overwhelms it.",
      "You are rebuilding general athletic capacity.",
    ],
    helpsWith: [
      "Strength, conditioning, and movement quality.",
      "More rounded physical preparedness.",
      "Training that balances effort, recovery, and progression.",
    ],
    approach:
      "Coaching blends strength work with conditioning and movement practice. The balance depends on your goals, schedule, and current starting point.",
    notThis:
      "It is not a hard-conditioning-only approach or a promise to turn general training into elite sport preparation.",
  },
  {
    slug: "beginner-gym-confidence",
    title: "Beginner Gym Confidence",
    description:
      "Support for beginners or returning gym users who want to learn how to train properly, use equipment confidently and build a repeatable gym routine.",
    price: "From £40",
    group: "start-here",
    whoItIsFor: [
      "You are new to the gym or returning after time away.",
      "You feel unsure around equipment, exercises, or programme structure.",
      "You want coaching that explains things clearly without talking down to you.",
    ],
    helpsWith: [
      "Learning how to use gym equipment safely and confidently.",
      "Building a simple routine you can repeat.",
      "Reducing uncertainty around what to do in the gym.",
    ],
    approach:
      "The focus is on clear instruction, repeatable basics, and enough context to help you train independently with more confidence.",
    notThis:
      "It is not about making you feel foolish for what you do not know yet.",
  },
  {
    slug: "weight-loss-personal-training",
    title: "Weight Loss Personal Training",
    description:
      "Monthly support for sustainable weight loss using personal training, nutrition habits, accountability and realistic progress tracking. No extreme diets or quick fixes.",
    price: "From £120",
    group: "body-composition-nutrition",
    whoItIsFor: [
      "You want fat loss support without extreme dieting.",
      "You need structure, accountability, and realistic expectations.",
      "You want training and nutrition habits to work together.",
    ],
    helpsWith: [
      "Training consistency and activity habits.",
      "Nutrition structure and calorie awareness.",
      "Tracking progress without relying on quick fixes.",
    ],
    approach:
      "Support is built around sustainable habits, practical nutrition, and strength-focused training. Progress is reviewed calmly and adjusted when needed.",
    notThis:
      "It is not a crash diet, weigh-in pressure campaign, or extreme transformation challenge.",
  },
  {
    slug: "body-composition-coaching",
    title: "Body Composition Coaching",
    description:
      "Monthly coaching for fat loss, muscle retention and improved body composition through structured training, nutrition habits, consistency and progress tracking.",
    price: "From £120",
    group: "body-composition-nutrition",
    whoItIsFor: [
      "You want to change body composition while keeping training performance in view.",
      "You want a plan that accounts for food, training, recovery, and consistency.",
      "You prefer practical tracking over dramatic promises.",
    ],
    helpsWith: [
      "Fat loss and muscle retention habits.",
      "Structured training and nutrition consistency.",
      "Regular reviews of progress and adherence.",
    ],
    approach:
      "Coaching combines strength training, nutrition habits, and progress review. The work is steady, measurable, and adjusted to your real schedule.",
    notThis:
      "It is not physique-competition prep or a promise that body composition change happens on a fixed deadline.",
  },
  {
    slug: "nutrition-support",
    title: "Nutrition Support",
    description:
      "Practical nutrition coaching focused on protein, meal structure, calorie awareness, habits and consistency to support training, body composition and long-term health.",
    price: "From £80",
    group: "body-composition-nutrition",
    whoItIsFor: [
      "You want practical nutrition support without a rigid meal plan.",
      "You are training but unsure how to support it with food.",
      "You want habits that can survive normal life.",
    ],
    helpsWith: [
      "Protein, meal structure, and calorie awareness.",
      "Consistency around meals and routines.",
      "Nutrition habits that support training and body composition goals.",
    ],
    approach:
      "The work focuses on simple levers, clear trade-offs, and repeatable habits. It is coaching support, not medical nutrition therapy.",
    notThis:
      "It is not a clinical dietetic service, diagnosis-led nutrition plan, or rigid meal-plan system.",
  },
  {
    slug: "hybrid-personal-training",
    title: "Hybrid Personal Training",
    description:
      "Monthly coaching that combines in-person personal training, online check-ins, training structure and accountability for support inside and outside the gym.",
    price: "From £160",
    group: "remote-hybrid-support",
    whoItIsFor: [
      "You want in-person coaching plus support between sessions.",
      "You train independently some of the time but need structure.",
      "You value accountability, check-ins, and programme direction.",
    ],
    helpsWith: [
      "Keeping training consistent between sessions.",
      "Using check-ins to adjust the plan.",
      "Combining gym coaching with remote support.",
    ],
    approach:
      "Hybrid coaching pairs practical in-person work with remote structure and review. It is useful when the work between sessions matters as much as the session itself.",
    notThis:
      "It is not an app-only programme with no human review, and it is not a substitute for appropriate health screening.",
  },
  {
    slug: "online-personal-training",
    title: "Online Personal Training",
    description:
      "Remote coaching with training structure, progress reviews, habit tracking and accountability for people who want support without regular in-person sessions.",
    price: "From £80",
    group: "remote-hybrid-support",
    whoItIsFor: [
      "You want coaching support without regular in-person sessions.",
      "You have access to a gym or training setup and want structure.",
      "You are comfortable communicating through check-ins and progress reviews.",
    ],
    helpsWith: [
      "Training plans and progression.",
      "Accountability and habit tracking.",
      "Adjustments based on progress, equipment, and schedule.",
    ],
    approach:
      "Online support focuses on clear programming, regular feedback, and practical adjustments. It works best when you can train independently but want guidance and accountability.",
    notThis:
      "It is not a generic PDF plan or instant automated advice with no context.",
  },
];

export function getServicesByGroup(groupId: ServiceGroupId) {
  return services.filter((service) => service.group === groupId);
}

export function getServiceBySlug(slug: string | undefined) {
  return services.find((service) => service.slug === slug);
}
