import { getPublicPage } from "./public-pages";

export const SITE_ORIGIN = "https://aidanbrotherhood.com";
export const BUSINESS_NAME = "AB Personal Training";
export const CONSULTATION_PATH = "/consultation";
export const CONSULTATION_URL =
  "https://calendly.com/hello-aidanbrotherhood/free-personal-training-consultation";
export const BUSINESS_EMAIL = "hello@aidanbrotherhood.com";
export const EMAIL_URL = `mailto:${BUSINESS_EMAIL}`;
export const GYM_URL = "https://www.jdgyms.co.uk/gym/renfrew/";
export const DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=JD%20Gyms%20Renfrew%20PA4%209EN";

/** Fail closed on every preview host, even when the production flag is supplied. */
export function isIndexableProduction(
  request: Request,
  env: { INDEXABLE?: unknown },
) {
  return (
    String(env.INDEXABLE) === "true" &&
    new URL(request.url).origin === SITE_ORIGIN
  );
}

/** Redirect only the real production domains, never previews or unrelated hosts. */
export function canonicalRedirect(request: Request): string | null {
  const url = new URL(request.url);
  if (
    !["aidanbrotherhood.com", "www.aidanbrotherhood.com"].includes(url.hostname)
  )
    return null;
  const before = url.href;
  url.protocol = "https:";
  url.hostname = "aidanbrotherhood.com";
  url.port = "";
  const trimmed = url.pathname.replace(/\/+$/, "") || "/";
  if (getPublicPage(trimmed)) url.pathname = trimmed;
  return url.href === before ? null : url.href;
}

export function xmlEscape(value: string) {
  return value.replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]!,
  );
}
