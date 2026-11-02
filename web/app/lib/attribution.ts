export const campaignKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
// Accept campaign labels only. Do not store click identifiers or full referrer URLs.
export function safeCampaignLabel(value: string): string {
  return value.length <= 80 &&
    /^[a-zA-Z0-9 _.-]+$/.test(value) &&
    !/\d{7}/.test(value)
    ? value.trim()
    : "";
}
export function readAttribution(
  url: string,
  referrer = "",
): Record<string, string> {
  const params = new URL(url).searchParams;
  const result: Record<string, string> = {};
  for (const key of campaignKeys) {
    const value = safeCampaignLabel(params.get(key) || "");
    if (value) result[key] = value;
  }
  if (referrer) {
    try {
      const source = new URL(referrer);
      if (source.hostname !== new URL(url).hostname)
        result.referrer = source.hostname.slice(0, 253);
    } catch {
      /* Ignore invalid referrers. */
    }
  }
  return result;
}
