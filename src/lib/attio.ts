import type { CoachingEnquiryInput } from "./validation";
import { assertServerOnly, getServerEnv } from "./server-env";

const DEFAULT_ATTIO_API_BASE_URL = "https://api.attio.com/v2";
const PEOPLE_OBJECT = "people";

assertServerOnly("Attio integration");

type AttioFailureReason =
  | "missing_config"
  | "validation"
  | "auth"
  | "rate_limited"
  | "server"
  | "network"
  | "invalid_response"
  | "unknown";

type AttioStep = "person_upsert" | "list_entry_upsert";

export type AttioEnquiryResult =
  | {
      ok: true;
      personRecordId: string;
      personStatus: number;
      listEntryStatus: number;
      mappedFieldCount: number;
      missingRecommendedMappings: string[];
      skippedPersonFields: string[];
    }
  | {
      ok: false;
      reason: AttioFailureReason;
      step?: AttioStep;
      attioStatus?: number;
      retryAfter?: string | null;
      diagnosticCode?: string;
      missingConfig?: string[];
    };

type AttioRequestResult =
  | {
      ok: true;
      response: Response;
      body: unknown;
    }
  | {
      ok: false;
      reason: "network";
    };

type ListFieldMapping = {
  envName: string;
  value: string | boolean | undefined;
  recommended?: boolean;
};

function getAttioApiBaseUrl() {
  const configuredBaseUrl = getServerEnv("ATTIO_API_BASE_URL")?.trim();
  return (configuredBaseUrl || DEFAULT_ATTIO_API_BASE_URL).replace(/\/+$/, "");
}

function getCoachingEnquiriesList() {
  return (
    getServerEnv("ATTIO_COACHING_ENQUIRIES_LIST")?.trim() ||
    getServerEnv("ATTIO_COACHING_ENQUIRIES_LIST_ID")?.trim()
  );
}

function getAttioHeaders(apiKey: string) {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
}

async function parseAttioResponse(response: Response) {
  const responseText = await response.text();

  if (!responseText) {
    return undefined;
  }

  try {
    return JSON.parse(responseText) as unknown;
  } catch {
    return responseText;
  }
}

async function attioRequest(
  method: "PUT",
  path: string,
  payload: unknown,
  apiKey: string,
): Promise<AttioRequestResult> {
  try {
    const response = await fetch(`${getAttioApiBaseUrl()}${path}`, {
      method,
      headers: getAttioHeaders(apiKey),
      body: JSON.stringify(payload),
    });

    return {
      ok: true,
      response,
      body: await parseAttioResponse(response),
    };
  } catch {
    return {
      ok: false,
      reason: "network",
    };
  }
}

function extractDiagnosticCode(body: unknown): string | undefined {
  if (!body || typeof body !== "object") return undefined;

  const record = body as Record<string, unknown>;

  if (typeof record.code === "string") {
    return record.code;
  }

  if (typeof record.type === "string") {
    return record.type;
  }

  const errors = record.errors;

  if (Array.isArray(errors)) {
    const firstCodedError = errors.find(
      (error): error is { code: string } =>
        Boolean(error) &&
        typeof error === "object" &&
        typeof (error as Record<string, unknown>).code === "string",
    );

    return firstCodedError?.code;
  }

  return undefined;
}

function mapAttioFailure(response: Response, body: unknown, step: AttioStep): AttioEnquiryResult {
  if (response.status === 401 || response.status === 403) {
    return {
      ok: false,
      reason: "auth",
      step,
      attioStatus: response.status,
      diagnosticCode: extractDiagnosticCode(body),
    };
  }

  if (response.status === 429) {
    return {
      ok: false,
      reason: "rate_limited",
      step,
      attioStatus: response.status,
      retryAfter: response.headers.get("retry-after"),
      diagnosticCode: extractDiagnosticCode(body),
    };
  }

  if (response.status >= 500) {
    return {
      ok: false,
      reason: "server",
      step,
      attioStatus: response.status,
      diagnosticCode: extractDiagnosticCode(body),
    };
  }

  if (response.status >= 400) {
    return {
      ok: false,
      reason: "validation",
      step,
      attioStatus: response.status,
      diagnosticCode: extractDiagnosticCode(body),
    };
  }

  return {
    ok: false,
    reason: "unknown",
    step,
    attioStatus: response.status,
    diagnosticCode: extractDiagnosticCode(body),
  };
}

function extractRecordId(body: unknown) {
  if (!body || typeof body !== "object") return undefined;

  const data = (body as Record<string, unknown>).data;
  if (!data || typeof data !== "object") return undefined;

  const id = (data as Record<string, unknown>).id;
  if (!id || typeof id !== "object") return undefined;

  const recordId = (id as Record<string, unknown>).record_id;
  return typeof recordId === "string" ? recordId : undefined;
}

function isLikelyE164Phone(value?: string) {
  if (!value) return false;
  return /^\+[1-9]\d{7,14}$/.test(value.replace(/\s+/g, ""));
}

function getFullName(input: CoachingEnquiryInput) {
  return [input.firstName, input.lastName].filter(Boolean).join(" ");
}

function buildPersonValues(input: CoachingEnquiryInput) {
  const values: Record<string, unknown> = {
    name: [
      {
        first_name: input.firstName,
        last_name: input.lastName ?? "",
        full_name: getFullName(input),
      },
    ],
    email_addresses: [input.email],
  };

  const skippedPersonFields: string[] = [];

  if (input.phone) {
    if (isLikelyE164Phone(input.phone)) {
      values.phone_numbers = [input.phone.replace(/\s+/g, "")];
    } else {
      skippedPersonFields.push("phone");
    }
  }

  return {
    values,
    skippedPersonFields,
  };
}

function buildStatusNotes(input: CoachingEnquiryInput) {
  return [
    "Coaching enquiry submitted from the website.",
    `Enquiry type: ${input.enquiryType}`,
    `Main interest: ${input.mainInterest}`,
    `Message: ${input.message}`,
    buildQualificationSummary(input),
    input.location ? `Location: ${input.location}` : undefined,
    input.preferredContactMethod ? `Preferred contact: ${input.preferredContactMethod}` : undefined,
    input.referralSource ? `Referral source: ${input.referralSource}` : undefined,
    input.socialHandle ? `Social handle: ${input.socialHandle}` : undefined,
    input.newsletterOptIn ? "Newsletter opt-in: yes" : "Newsletter opt-in: no",
    input.sourcePage ? `Source page: ${input.sourcePage}` : undefined,
    input.utmSource ? `UTM source: ${input.utmSource}` : undefined,
    input.utmMedium ? `UTM medium: ${input.utmMedium}` : undefined,
    input.utmCampaign ? `UTM campaign: ${input.utmCampaign}` : undefined,
    input.utmTerm ? `UTM term: ${input.utmTerm}` : undefined,
    input.utmContent ? `UTM content: ${input.utmContent}` : undefined,
    `Consent to contact: ${input.consentToContact ? "yes" : "no"}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildQualificationSummary(input: CoachingEnquiryInput) {
  const details = [
    input.primaryGoal ? `Primary goal: ${input.primaryGoal}` : undefined,
    input.servicePreference ? `Service preference: ${input.servicePreference}` : undefined,
    input.currentTrainingLevel ? `Current training level: ${input.currentTrainingLevel}` : undefined,
    input.gymConfidence ? `Gym confidence: ${input.gymConfidence}` : undefined,
    input.currentRoutine ? `Current routine: ${input.currentRoutine}` : undefined,
    input.biggestBarrier ? `Biggest barrier: ${input.biggestBarrier}` : undefined,
    input.preferredCoachingFormat ? `Preferred coaching format: ${input.preferredCoachingFormat}` : undefined,
    input.availability ? `Availability: ${input.availability}` : undefined,
    input.startTimeline ? `Start timeline: ${input.startTimeline}` : undefined,
  ].filter(Boolean);

  if (details.length === 0) {
    return undefined;
  }

  return ["Qualification details:", ...details].join("\n");
}

function buildMessageField(input: CoachingEnquiryInput) {
  const qualificationSummary = buildQualificationSummary(input);

  return [input.message, qualificationSummary].filter(Boolean).join("\n\n");
}

function getFieldMappings(input: CoachingEnquiryInput): ListFieldMapping[] {
  return [
    {
      envName: "ATTIO_FIELD_STAGE",
      value: "New enquiry",
      recommended: true,
    },
    {
      envName: "ATTIO_FIELD_SUBMITTED_AT",
      value: new Date().toISOString(),
      recommended: true,
    },
    {
      envName: "ATTIO_FIELD_MAIN_INTEREST",
      value: input.mainInterest,
      recommended: true,
    },
    {
      envName: "ATTIO_FIELD_MESSAGE",
      value: buildMessageField(input),
      recommended: true,
    },
    {
      envName: "ATTIO_FIELD_PRIMARY_GOAL",
      value: input.primaryGoal,
    },
    {
      envName: "ATTIO_FIELD_SERVICE_PREFERENCE",
      value: input.servicePreference,
    },
    {
      envName: "ATTIO_FIELD_CURRENT_TRAINING_LEVEL",
      value: input.currentTrainingLevel,
    },
    {
      envName: "ATTIO_FIELD_GYM_CONFIDENCE",
      value: input.gymConfidence,
    },
    {
      envName: "ATTIO_FIELD_CURRENT_ROUTINE",
      value: input.currentRoutine,
    },
    {
      envName: "ATTIO_FIELD_BIGGEST_BARRIER",
      value: input.biggestBarrier,
    },
    {
      envName: "ATTIO_FIELD_PREFERRED_COACHING_FORMAT",
      value: input.preferredCoachingFormat,
    },
    {
      envName: "ATTIO_FIELD_AVAILABILITY",
      value: input.availability,
    },
    {
      envName: "ATTIO_FIELD_START_TIMELINE",
      value: input.startTimeline,
    },
    {
      envName: "ATTIO_FIELD_LOCATION",
      value: input.location,
    },
    {
      envName: "ATTIO_FIELD_PREFERRED_CONTACT_METHOD",
      value: input.preferredContactMethod,
    },
    {
      envName: "ATTIO_FIELD_REFERRAL_SOURCE",
      value: input.referralSource,
    },
    {
      envName: "ATTIO_FIELD_SOCIAL_HANDLE",
      value: input.socialHandle,
    },
    {
      envName: "ATTIO_FIELD_NEWSLETTER_OPT_IN",
      value: input.newsletterOptIn,
    },
    {
      envName: "ATTIO_FIELD_SOURCE_PAGE",
      value: input.sourcePage,
    },
    {
      envName: "ATTIO_FIELD_UTM_SOURCE",
      value: input.utmSource,
    },
    {
      envName: "ATTIO_FIELD_UTM_MEDIUM",
      value: input.utmMedium,
    },
    {
      envName: "ATTIO_FIELD_UTM_CAMPAIGN",
      value: input.utmCampaign,
    },
    {
      envName: "ATTIO_FIELD_UTM_TERM",
      value: input.utmTerm,
    },
    {
      envName: "ATTIO_FIELD_UTM_CONTENT",
      value: input.utmContent,
    },
    {
      envName: "ATTIO_FIELD_CONSENT_TO_CONTACT",
      value: input.consentToContact,
      recommended: true,
    },
    {
      envName: "ATTIO_FIELD_STATUS_NOTES",
      value: buildStatusNotes(input),
    },
  ];
}

function addEntryValue(entryValues: Record<string, string | boolean>, attribute: string, value: string | boolean) {
  if (typeof value === "string") {
    const trimmedValue = value.trim();

    if (trimmedValue) {
      entryValues[attribute] = trimmedValue;
    }

    return;
  }

  entryValues[attribute] = value;
}

function buildListEntryValues(input: CoachingEnquiryInput) {
  const entryValues: Record<string, string | boolean> = {};
  const missingRecommendedMappings: string[] = [];

  for (const mapping of getFieldMappings(input)) {
    const field = getServerEnv(mapping.envName)?.trim();

    if (!field) {
      if (mapping.recommended) {
        missingRecommendedMappings.push(mapping.envName);
      }

      continue;
    }

    if (mapping.value !== undefined) {
      addEntryValue(entryValues, field, mapping.value);
    }
  }

  return {
    entryValues,
    missingRecommendedMappings,
  };
}

async function upsertPerson(input: CoachingEnquiryInput, apiKey: string) {
  const { values, skippedPersonFields } = buildPersonValues(input);
  const response = await attioRequest(
    "PUT",
    "/objects/people/records?matching_attribute=email_addresses",
    {
      data: {
        values,
      },
    },
    apiKey,
  );

  return {
    response,
    skippedPersonFields,
  };
}

async function upsertListEntry(
  input: CoachingEnquiryInput,
  apiKey: string,
  list: string,
  personRecordId: string,
) {
  const { entryValues, missingRecommendedMappings } = buildListEntryValues(input);

  const response = await attioRequest(
    "PUT",
    `/lists/${encodeURIComponent(list)}/entries`,
    {
      data: {
        parent_object: PEOPLE_OBJECT,
        parent_record_id: personRecordId,
        entry_values: entryValues,
      },
    },
    apiKey,
  );

  return {
    response,
    mappedFieldCount: Object.keys(entryValues).length,
    missingRecommendedMappings,
  };
}

export async function createCoachingEnquiryInAttio(
  input: CoachingEnquiryInput,
): Promise<AttioEnquiryResult> {
  const apiKey = getServerEnv("ATTIO_API_KEY")?.trim();
  const list = getCoachingEnquiriesList();
  const missingConfig = [
    !apiKey ? "ATTIO_API_KEY" : undefined,
    !list ? "ATTIO_COACHING_ENQUIRIES_LIST" : undefined,
  ].filter((value): value is string => Boolean(value));

  if (missingConfig.length > 0 || !apiKey || !list) {
    return {
      ok: false,
      reason: "missing_config",
      missingConfig,
    };
  }

  const personResult = await upsertPerson(input, apiKey);

  if (!personResult.response.ok) {
    return {
      ok: false,
      reason: "network",
      step: "person_upsert",
    };
  }

  if (!personResult.response.response.ok) {
    return mapAttioFailure(personResult.response.response, personResult.response.body, "person_upsert");
  }

  const personRecordId = extractRecordId(personResult.response.body);

  if (!personRecordId) {
    return {
      ok: false,
      reason: "invalid_response",
      step: "person_upsert",
      attioStatus: personResult.response.response.status,
      diagnosticCode: extractDiagnosticCode(personResult.response.body),
    };
  }

  const listEntryResult = await upsertListEntry(input, apiKey, list, personRecordId);

  if (!listEntryResult.response.ok) {
    return {
      ok: false,
      reason: "network",
      step: "list_entry_upsert",
    };
  }

  if (!listEntryResult.response.response.ok) {
    return mapAttioFailure(
      listEntryResult.response.response,
      listEntryResult.response.body,
      "list_entry_upsert",
    );
  }

  return {
    ok: true,
    personRecordId,
    personStatus: personResult.response.response.status,
    listEntryStatus: listEntryResult.response.response.status,
    mappedFieldCount: listEntryResult.mappedFieldCount,
    missingRecommendedMappings: listEntryResult.missingRecommendedMappings,
    skippedPersonFields: personResult.skippedPersonFields,
  };
}
