import type { FitAnswers, FitDecision } from "./coaching-fit";

const KEY = "ab:coaching-fit-booking-v1";
const TTL_MS = 30 * 60 * 1000;

export type FitHandoff = {
  version: 1;
  savedAt: number;
  answers: FitAnswers;
  recommendation: FitDecision["packageId"];
  outcome: FitDecision["kind"];
};

const labels = {
  support: { introduction: "A short introduction", ongoing: "Ongoing coaching", unsure: "Undecided" },
  independence: { comfortable: "Comfortable independently", "some-support": "Some guidance", "hands-on": "Mostly hands-on", unsure: "Undecided" },
  frequency: { once: "Once a week", twice: "Twice a week", unsure: "Undecided" },
  budget: { "one-off": "£99 one-off", weekly: "£180/four weeks", "twice-weekly": "Up to £320/four weeks", none: "None suitable", unsure: "To discuss" },
  access: { member: "JD Gyms member", "can-join": "Can join JD Gyms", confirm: "Needs access confirmed", cannot: "Cannot attend" },
} as const;
const packages = { introduction: "Starter", weekly: "Coaching", complete: "Coaching+", none: "Discuss options" } as const;

/** Session-only handoff initiated by the visitor's consultation click. */
export function saveFitHandoff(answers: FitAnswers, decision: FitDecision): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify({
      version: 1, savedAt: Date.now(), answers,
      recommendation: decision.packageId, outcome: decision.kind,
    } satisfies FitHandoff));
  } catch { /* Booking remains available if session storage is blocked. */ }
}

export function clearFitHandoff(): void {
  if (typeof window === "undefined") return;
  try { window.sessionStorage.removeItem(KEY); } catch { /* no-op */ }
}

export function readFitHandoff(): FitHandoff | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const item: unknown = JSON.parse(raw);
    if (!item || typeof item !== "object") return null;
    const h = item as Partial<FitHandoff>;
    if (h.version !== 1 || !h.savedAt || Date.now() - h.savedAt > TTL_MS || h.savedAt > Date.now() + 1000) {
      clearFitHandoff(); return null;
    }
    if (!h.answers || typeof h.answers !== "object" || !h.outcome) return null;
    for (const key of Object.keys(labels) as (keyof FitAnswers)[]) {
      const value = h.answers[key];
      if (value !== null && typeof value !== "string") return null;
      if (value && !(value in labels[key])) return null;
    }
    if (!["match","discuss","not-fit"].includes(h.outcome)) return null;
    if (h.recommendation !== null && !["introduction","weekly","complete"].includes(h.recommendation ?? "")) return null;
    return h as FitHandoff;
  } catch { clearFitHandoff(); return null; }
}

export function fitContextRows(handoff: FitHandoff): { label: string; value: string }[] {
  const a = handoff.answers;
  const rows: { label: string; value: string }[] = [
    { label: "Coaching Fit result", value: packages[handoff.recommendation || "none"] },
    { label: "Support wanted", value: labels.support[a.support || "unsure"] },
    { label: "Training independently", value: labels.independence[a.independence || "unsure"] },
  ];
  if (a.support !== "introduction")
    rows.push({ label: "Coached frequency", value: labels.frequency[a.frequency || "unsure"] });
  rows.push(
    { label: "Budget preference", value: labels.budget[a.budget || "unsure"] },
    { label: "Gym access", value: labels.access[a.access || "confirm"] },
  );
  return rows;
}

/** Only sent to Calendly after explicit opt-in; never put in a URL or analytics. */
export function calendlyFitSummary(handoff: FitHandoff): string {
  return [
    "Coaching Fit (shared by the person booking):",
    ...fitContextRows(handoff).map(({ label, value }) => `${label}: ${value}`),
  ].join("\n");
}
