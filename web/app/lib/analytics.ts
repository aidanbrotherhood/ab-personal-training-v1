import { getPublicPage } from "./public-pages";
import { packageIds } from "./offers";
import { SITE_ORIGIN } from "./seo";

export const CONSENT_KEY = "ab-analytics-consent-v1";
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export type AnalyticsChoice = "accepted" | "rejected";
type AnalyticsWindow = Window & {
  [key: `ga-disable-${string}`]: boolean;
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};
const eventNames = new Set([
  "consultation_cta_clicked", "booking_destination_viewed",
  "booking_calendar_viewed", "booking_time_selected",
  "booking_completed_client_signal", "contact_fallback_clicked",
  "coaching_fit_started", "coaching_fit_completed", "coaching_fit_reset",
]);
const placements = new Set([
  "content", "header", "footer", "closing", "hero", "renfrew_hero",
  "about_hero", "beginners_hero", "beginners_consultation", "coaching_hero",
  "pricing_home", "pricing_renfrew", "pricing_coaching", "page", "calendar",
  "direct_calendar", "email", "calendar_fit",
  "pricing_decision_aid", "pricing_decision_aid_result",
  "strength_hero", "strength_packages", "movement_hero", "movement_process",
  "movement_faq", "approach_hero", "approach_closing",
]);

export function validMeasurementId(value: unknown): value is string {
  return typeof value === "string" && /^G-[A-Z0-9]{5,20}$/.test(value);
}

export function readConsent(now = Date.now()): AnalyticsChoice | null {
  try {
    const saved = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
    return saved && ["accepted", "rejected"].includes(saved.choice) &&
      typeof saved.at === "number" && saved.at <= now &&
      now - saved.at < CONSENT_MAX_AGE ? saved.choice : null;
  } catch { return null; }
}

export function saveConsent(choice: AnalyticsChoice) {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, at: Date.now() })); }
  catch { /* A blocked store means the choice applies only to this page. */ }
}

/** Copy only known values. Never forward Calendly payloads or user input. */
export function analyticsEvent(detail: unknown) {
  if (!detail || typeof detail !== "object") return null;
  const d = detail as Record<string, unknown>;
  if (typeof d.event !== "string" || !eventNames.has(d.event) ||
      typeof d.page !== "string" || !getPublicPage(d.page) ||
      typeof d.placement !== "string" || !placements.has(d.placement)) return null;
  return {
    name: d.event,
    params: {
      page_location: `${SITE_ORIGIN}${d.page}`,
      placement: d.placement,
      ...(typeof d.package === "string" && packageIds.includes(d.package)
        ? { package_id: d.package } : {}),
    },
  };
}

/** Basic consent mode: no Google script, requests or queued events before opt-in. */
export function startAnalytics(id: string, enabled: boolean) {
  if (!enabled || !validMeasurementId(id) || window.location.origin !== SITE_ORIGIN)
    return null;
  const w = window as unknown as AnalyticsWindow;
  w[`ga-disable-${id}`] = false;
  w.dataLayer ||= [];
  // gtag expects an arguments object in dataLayer, rather than a plain array.
  w.gtag = function () { w.dataLayer!.push(arguments); };
  w.gtag("consent", "default", {
    analytics_storage: "denied", ad_storage: "denied",
    ad_user_data: "denied", ad_personalization: "denied",
  });
  w.gtag("consent", "update", { analytics_storage: "granted" });
  w.gtag("js", new Date());
  let referrer = "";
  try { referrer = document.referrer ? new URL(document.referrer).origin : ""; }
  catch { /* Ignore malformed referrers. */ }
  w.gtag("config", id, {
    send_page_view: false,
    page_location: `${SITE_ORIGIN}${getPublicPage(window.location.pathname)?.path || "/"}`,
    page_referrer: referrer,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: CONSENT_MAX_AGE / 1000,
    cookie_update: false,
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
  let previousPage: string | null = null;
  return {
    page(path: string) {
      if (!getPublicPage(path) || previousPage === path) return;
      const location = `${SITE_ORIGIN}${path}`;
      w.gtag!("set", { page_location: location, page_referrer: previousPage ? `${SITE_ORIGIN}${previousPage}` : referrer });
      w.gtag!("event", "page_view", { page_location: location, page_title: getPublicPage(path)!.title });
      previousPage = path;
    },
    event(detail: unknown) {
      const event = analyticsEvent(detail);
      if (event) w.gtag!("event", event.name, event.params);
    },
    stop() {
      // Disable collection immediately, including already loaded Google code.
      w[`ga-disable-${id}`] = true;
      w.dataLayer!.length = 0;
      w.gtag = () => {};
      script.remove();
    },
  };
}

export function clearAnalyticsCookies() {
  const names = document.cookie.split(";").map(c => c.trim().split("=")[0]);
  for (const name of names.filter(n => n === "_ga" || n.startsWith("_ga_"))) {
    for (const domain of ["", "; Domain=aidanbrotherhood.com", "; Domain=.aidanbrotherhood.com"]) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax; Secure`;
    }
  }
}
