import type { NewsletterSignupInput } from "./validation";
import { assertServerOnly, getServerEnv } from "./server-env";

const DEFAULT_BUTTONDOWN_API_BASE_URL = "https://api.buttondown.com/v1";

assertServerOnly("Buttondown integration");

type ButtondownFailureReason =
  | "missing_api_key"
  | "validation"
  | "auth"
  | "rate_limited"
  | "server"
  | "network"
  | "unknown";

type ButtondownSuccessOutcome = "created" | "metadata_updated" | "already_subscribed";

export type ButtondownSubscribeResult =
  | {
      ok: true;
      outcome: ButtondownSuccessOutcome;
      buttondownStatus: number;
      metadataUpdateStatus?: number;
    }
  | {
      ok: false;
      reason: ButtondownFailureReason;
      buttondownStatus?: number;
      retryAfter?: string | null;
      diagnosticCode?: string;
    };

type ButtondownRequestResult =
  | {
      ok: true;
      response: Response;
      body: unknown;
    }
  | {
      ok: false;
      reason: "network";
    };

type ButtondownSubscriberPayload = {
  email_address: string;
  metadata: Record<string, string>;
  utm_campaign?: string;
  utm_medium?: string;
  utm_source?: string;
};

function getButtondownApiBaseUrl() {
  const configuredBaseUrl = getServerEnv("BUTTONDOWN_API_BASE_URL")?.trim();
  return (configuredBaseUrl || DEFAULT_BUTTONDOWN_API_BASE_URL).replace(/\/+$/, "");
}

function addMetadataValue(metadata: Record<string, string>, key: string, value?: string) {
  const trimmedValue = value?.trim();

  if (trimmedValue) {
    metadata[key] = trimmedValue;
  }
}

function buildSubscriberMetadata(input: NewsletterSignupInput) {
  const metadata: Record<string, string> = {
    source: "website",
    signup_origin: "newsletter_form",
  };

  addMetadataValue(metadata, "first_name", input.firstName);
  addMetadataValue(metadata, "source_page", input.sourcePage);
  addMetadataValue(metadata, "utm_source", input.utmSource);
  addMetadataValue(metadata, "utm_medium", input.utmMedium);
  addMetadataValue(metadata, "utm_campaign", input.utmCampaign);
  addMetadataValue(metadata, "utm_term", input.utmTerm);
  addMetadataValue(metadata, "utm_content", input.utmContent);

  return metadata;
}

function buildSubscriberPayload(input: NewsletterSignupInput): ButtondownSubscriberPayload {
  const payload: ButtondownSubscriberPayload = {
    email_address: input.email,
    metadata: buildSubscriberMetadata(input),
  };

  if (input.utmCampaign) payload.utm_campaign = input.utmCampaign;
  if (input.utmMedium) payload.utm_medium = input.utmMedium;
  if (input.utmSource) payload.utm_source = input.utmSource;

  return payload;
}

function getButtondownHeaders(apiKey: string) {
  const headers: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Token ${apiKey}`,
    "Content-Type": "application/json",
  };
  const apiVersion = getServerEnv("BUTTONDOWN_API_VERSION")?.trim();

  if (apiVersion) {
    headers["X-API-Version"] = apiVersion;
  }

  return headers;
}

async function parseButtondownResponse(response: Response) {
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

async function buttondownRequest(
  method: "POST" | "PATCH",
  path: string,
  payload: unknown,
  apiKey: string,
): Promise<ButtondownRequestResult> {
  try {
    const response = await fetch(`${getButtondownApiBaseUrl()}${path}`, {
      method,
      headers: getButtondownHeaders(apiKey),
      body: JSON.stringify(payload),
    });

    return {
      ok: true,
      response,
      body: await parseButtondownResponse(response),
    };
  } catch {
    return {
      ok: false,
      reason: "network",
    };
  }
}

function bodyToSearchText(body: unknown): string {
  if (typeof body === "string") return body.toLowerCase();

  try {
    return JSON.stringify(body).toLowerCase();
  } catch {
    return "";
  }
}

function extractDiagnosticCode(body: unknown): string | undefined {
  if (!body || typeof body !== "object") return undefined;

  const record = body as Record<string, unknown>;
  const directCode = record.code;

  if (typeof directCode === "string") {
    return directCode;
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

function isDuplicateSubscriberError(status: number, body: unknown) {
  if (status !== 400 && status !== 409) return false;

  const searchText = bodyToSearchText(body);

  return (
    searchText.includes("email_already_exists") ||
    searchText.includes("subscriber_already_exists") ||
    searchText.includes("duplicate") ||
    (searchText.includes("already") &&
      (searchText.includes("exist") || searchText.includes("subscribed")))
  );
}

function mapButtondownFailure(response: Response, body: unknown): ButtondownSubscribeResult {
  if (response.status === 401 || response.status === 403) {
    return {
      ok: false,
      reason: "auth",
      buttondownStatus: response.status,
      diagnosticCode: extractDiagnosticCode(body),
    };
  }

  if (response.status === 429) {
    return {
      ok: false,
      reason: "rate_limited",
      buttondownStatus: response.status,
      retryAfter: response.headers.get("retry-after"),
      diagnosticCode: extractDiagnosticCode(body),
    };
  }

  if (response.status >= 500) {
    return {
      ok: false,
      reason: "server",
      buttondownStatus: response.status,
      diagnosticCode: extractDiagnosticCode(body),
    };
  }

  if (response.status >= 400) {
    return {
      ok: false,
      reason: "validation",
      buttondownStatus: response.status,
      diagnosticCode: extractDiagnosticCode(body),
    };
  }

  return {
    ok: false,
    reason: "unknown",
    buttondownStatus: response.status,
    diagnosticCode: extractDiagnosticCode(body),
  };
}

async function updateExistingSubscriberMetadata(input: NewsletterSignupInput, apiKey: string) {
  return buttondownRequest(
    "PATCH",
    `/subscribers/${encodeURIComponent(input.email)}`,
    {
      metadata: buildSubscriberMetadata(input),
    },
    apiKey,
  );
}

export async function subscribeToButtondown(
  input: NewsletterSignupInput,
): Promise<ButtondownSubscribeResult> {
  const apiKey = getServerEnv("BUTTONDOWN_API_KEY")?.trim();

  if (!apiKey) {
    return {
      ok: false,
      reason: "missing_api_key",
    };
  }

  const createResult = await buttondownRequest("POST", "/subscribers", buildSubscriberPayload(input), apiKey);

  if (!createResult.ok) {
    return {
      ok: false,
      reason: "network",
    };
  }

  if (createResult.response.ok) {
    return {
      ok: true,
      outcome: "created",
      buttondownStatus: createResult.response.status,
    };
  }

  if (!isDuplicateSubscriberError(createResult.response.status, createResult.body)) {
    return mapButtondownFailure(createResult.response, createResult.body);
  }

  const updateResult = await updateExistingSubscriberMetadata(input, apiKey);

  if (!updateResult.ok) {
    return {
      ok: true,
      outcome: "already_subscribed",
      buttondownStatus: createResult.response.status,
    };
  }

  if (updateResult.response.ok) {
    return {
      ok: true,
      outcome: "metadata_updated",
      buttondownStatus: createResult.response.status,
      metadataUpdateStatus: updateResult.response.status,
    };
  }

  return {
    ok: true,
    outcome: "already_subscribed",
    buttondownStatus: createResult.response.status,
    metadataUpdateStatus: updateResult.response.status,
  };
}
