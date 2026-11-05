/** Published pages only. Routing, metadata and the XML sitemap share this registry. */
export const publicPages = [
  {
    key: "home",
    path: "/",
    file: "routes/home.tsx",
    title: "AB Personal Training | Aidan Brotherhood, Renfrew",
    description:
      "One-to-one personal training with Aidan Brotherhood at JD Gyms Renfrew. Explore coaching and prices, then book a free 30-minute consultation.",
    h1: "Get stronger. Stop guessing.",
  },
  {
    key: "renfrew",
    path: "/personal-training-renfrew",
    file: "routes/personal-training-renfrew.tsx",
    title: "Personal Trainer Renfrew | AB Personal Training",
    description:
      "Train one-to-one with Aidan Brotherhood at JD Gyms Renfrew, PA4 9EN. See prices, gym access details and how to book a free consultation.",
    h1: "Personal training at JD Gyms Renfrew.",
  },
  {
    key: "strength",
    path: "/strength-training-renfrew",
    file: "routes/strength-training-renfrew.tsx",
    title: "Strength Training Renfrew | AB Personal Training",
    description:
      "Build strength and muscle with one-to-one personal training at JD Gyms Renfrew. Personalised programming, technique coaching and a clear plan for progress.",
    h1: "Strength & muscle-building personal training in Renfrew.",
  },
  {
    key: "fatLoss",
    path: "/fat-loss-coaching-renfrew",
    file: "routes/fat-loss-coaching-renfrew.tsx",
    title: "Weight Loss Personal Trainer Renfrew | AB Personal Training",
    description:
      "Lose body fat, build strength and improve body composition with one-to-one personal training at JD Gyms Renfrew. Practical nutrition guidance and structured coaching.",
    h1: "Lose body fat. Build strength. Make progress that lasts.",
  },
  {
    key: "coaching",
    path: "/pricing",
    file: "routes/coaching.tsx",
    title: "Personal Training Prices | AB Personal Training",
    description:
      "Compare Starter at £99, Coaching at £180 and Coaching+ at £320. See sessions and support included at JD Gyms Renfrew. Gym membership is separate.",
    h1: "The right support. A clear way forward.",
  },
  {
    key: "faq",
    path: "/faq",
    file: "routes/faq.tsx",
    title: "Personal Training FAQs in Renfrew | AB Personal Training",
    description:
      "Answers to common questions about one-to-one personal training with Aidan Brotherhood at JD Gyms Renfrew, including prices, membership, consultations and coaching.",
    h1: "Frequently asked questions",
  },
  {
    key: "about",
    path: "/about",
    file: "routes/about.tsx",
    title: "What I Was Trying to Prove | Aidan Brotherhood",
    description:
      "A personal essay by Aidan Brotherhood on tennis, entrepreneurship, the pursuit of recognition, and finding meaning in contribution and coaching at JD Gyms Renfrew.",
    h1: "What I Was Trying to Prove",
  },
  {
    key: "beginners",
    path: "/personal-training-for-beginners",
    file: "routes/beginners.tsx",
    title: "Beginner Personal Training Renfrew | AB Personal Training",
    description:
      "New to the gym? Learn what starting one-to-one training with Aidan at JD Gyms Renfrew involves and how the free consultation differs from Starter.",
    h1: "You don’t have to know where to start.",
  },
  {
    key: "approach",
    path: "/about/approach",
    file: "routes/my-approach.tsx",
    title: "My Approach | Personal Training Philosophy | AB PT",
    description:
      "Discover Aidan Brotherhood’s approach to personal training in Renfrew: evidence-informed coaching, continuous improvement, strength and lifelong capability.",
    h1: "Become more capable. Live more fully.",
  },
  {
    key: "qualifications",
    path: "/about/qualifications",
    file: "routes/qualifications.tsx",
    title: "Personal Trainer Qualifications | Aidan Brotherhood",
    description:
      "Explore Aidan Brotherhood's Level 3 Personal Training Diploma, Level 2 Gym Instructing Certificate, Level 3 nutrition training and current first-aid qualification.",
    h1: "Qualifications & training",
  },
  {
    key: "movement",
    path: "/movement-assessment",
    file: "routes/movement-assessment.tsx",
    title: "Free Movement Assessment Renfrew | AB Personal Training",
    description:
      "Book a free 30-minute movement assessment with AB Personal Training at JD Gyms Renfrew. Learn about FMS, your starting point and how coaching works.",
    h1: "Before we build your programme, let’s understand how you move.",
  },
  {
    key: "consultation",
    path: "/consultation",
    file: "routes/consultation.tsx",
    title: "Free PT Consultation in Renfrew | AB Personal Training",
    description:
      "Book a free 30-minute consultation with Aidan Brotherhood at JD Gyms Renfrew. Discuss your goals, ask questions and explore coaching with no obligation.",
    h1: "Let’s meet. Find your starting point.",
  },
  {
    key: "privacy",
    path: "/privacy",
    file: "routes/privacy.tsx",
    title: "Privacy Notice | AB Personal Training",
    description:
      "How AB Personal Training handles consultation bookings, enquiries and website information, including Calendly and contact details for privacy requests.",
    h1: "Privacy notice for AB Personal Training",
  },
] as const;

export type PageKey = (typeof publicPages)[number]["key"];
export function getPublicPage(pathname: string) {
  return publicPages.find((page) => page.path === pathname);
}
