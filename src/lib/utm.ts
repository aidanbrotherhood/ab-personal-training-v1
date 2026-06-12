const utmFields = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_term: "utmTerm",
  utm_content: "utmContent",
} as const;

type UtmFieldName = (typeof utmFields)[keyof typeof utmFields];
type StoredUtmValues = Partial<Record<UtmFieldName, string>>;

const storageKey = "ab_source_attribution";

function readStoredUtmValues(): StoredUtmValues {
  try {
    return JSON.parse(window.sessionStorage.getItem(storageKey) ?? "{}") as StoredUtmValues;
  } catch {
    return {};
  }
}

function writeStoredUtmValues(values: StoredUtmValues) {
  try {
    window.sessionStorage.setItem(storageKey, JSON.stringify(values));
  } catch {
    // Session storage may be unavailable; hidden fields still get current-page values.
  }
}

export function captureUtmValues() {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const existingValues = readStoredUtmValues();
  const nextValues: StoredUtmValues = { ...existingValues };

  for (const [queryName, fieldName] of Object.entries(utmFields)) {
    const value = params.get(queryName);
    if (value) nextValues[fieldName as UtmFieldName] = value;
  }

  writeStoredUtmValues(nextValues);
  return nextValues;
}

export function populateAttributionFields(root: ParentNode = document) {
  if (typeof window === "undefined") return;

  const values = captureUtmValues();
  const sourcePage = `${window.location.pathname}${window.location.search}`;

  root.querySelectorAll<HTMLInputElement>('input[name="sourcePage"]').forEach((input) => {
    input.value = sourcePage;
  });

  Object.values(utmFields).forEach((fieldName) => {
    root.querySelectorAll<HTMLInputElement>(`input[name="${fieldName}"]`).forEach((input) => {
      input.value = values[fieldName] ?? "";
    });
  });
}
