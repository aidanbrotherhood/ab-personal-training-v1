import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import {
  clearAnalyticsCookies, CONSENT_KEY, readConsent, saveConsent, startAnalytics,
  validMeasurementId, type AnalyticsChoice,
} from "../lib/analytics";

export function AnalyticsConsent({ id, enabled }: { id: string; enabled: boolean }) {
  const { pathname } = useLocation();
  const [choice, setChoice] = useState<AnalyticsChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const client = useRef<ReturnType<typeof startAnalytics>>(null);
  const currentPath = useRef(pathname);
  currentPath.current = pathname;
  const configured = validMeasurementId(id);

  useEffect(() => {
    setChoice(readConsent());
    setReady(true);
    const settings = () => setOpen(true);
    const syncConsent = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null) {
        client.current?.stop();
        // Reload also removes vendor timers if consent changes in another tab.
        window.location.reload();
      }
    };
    window.addEventListener("ab:cookie-settings", settings);
    window.addEventListener("storage", syncConsent);
    return () => {
      window.removeEventListener("ab:cookie-settings", settings);
      window.removeEventListener("storage", syncConsent);
    };
  }, []);

  useEffect(() => {
    if (choice !== "accepted" || !configured) return;
    const analytics = startAnalytics(id, enabled);
    client.current = analytics;
    analytics?.page(currentPath.current);
    const measurement = (e: Event) => analytics?.event((e as CustomEvent).detail);
    window.addEventListener("ab:measurement", measurement);
    return () => {
      window.removeEventListener("ab:measurement", measurement);
      analytics?.stop();
      client.current = null;
    };
  }, [choice, configured, id, enabled]);

  useEffect(() => { client.current?.page(pathname); }, [pathname]);

  function choose(value: AnalyticsChoice) {
    const withdrawing = value === "rejected" && choice === "accepted";
    if (value === "rejected") {
      client.current?.stop();
      clearAnalyticsCookies();
    }
    saveConsent(value);
    if (withdrawing) {
      // Remove loaded vendor code and its timers as well as disabling collection.
      window.location.reload();
      return;
    }
    setChoice(value);
    setOpen(false);
  }

  if (!configured || !ready || (choice && !open)) return null;
  return (
    <section className="analytics-choice" aria-label="Analytics cookie choices">
      <div>
        <h2>Help improve this website</h2>
        <p>With your permission, Google Analytics uses cookies to help us understand
          which pages and consultation links are useful. You can use the site
          without accepting and change your choice in the footer. <a href="/privacy">Privacy notice</a>.</p>
      </div>
      <div className="analytics-choice-actions">
        <button type="button" onClick={() => choose("rejected")}>Reject analytics</button>
        <button type="button" onClick={() => choose("accepted")}>Accept analytics</button>
        {choice && <button type="button" onClick={() => setOpen(false)}>Close</button>}
      </div>
    </section>
  );
}
