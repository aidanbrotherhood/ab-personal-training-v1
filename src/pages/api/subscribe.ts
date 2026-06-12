import {
  genericErrorMessage,
  hasTriggeredHoneypot,
  isFormStubMode,
  jsonResponse,
  parseRequestBody,
  sanitiseForLog,
  unavailableMessage,
  validatePayload,
  validationErrorResponse,
} from "../../lib/form-api";
import { subscribeToButtondown } from "../../lib/buttondown";
import { newsletterSignupSchema } from "../../lib/validation";

export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const payload = await parseRequestBody(request);

    if (hasTriggeredHoneypot(payload)) {
      return jsonResponse({ ok: false, message: genericErrorMessage }, 400);
    }

    const data = validatePayload(newsletterSignupSchema, payload);

    if (isFormStubMode()) {
      console.info("[form stub] newsletter signup", sanitiseForLog("newsletter", data));

      return jsonResponse({
        ok: true,
        message: "Thanks — you’re on the list.",
        ...(import.meta.env.DEV ? { devMessage: "Stub mode: validated but not sent to integrations." } : {}),
      });
    }

    const result = await subscribeToButtondown(data);

    if (result.ok) {
      console.info("[buttondown] newsletter signup", {
        ...sanitiseForLog("newsletter", data),
        outcome: result.outcome,
        buttondownStatus: result.buttondownStatus,
        metadataUpdateStatus: result.metadataUpdateStatus,
      });

      return jsonResponse({
        ok: true,
        message: "Thanks — you’re on the list.",
      });
    }

    console.warn("[buttondown] newsletter signup failed", {
      ...sanitiseForLog("newsletter", data),
      reason: result.reason,
      buttondownStatus: result.buttondownStatus,
      retryAfter: result.retryAfter,
      diagnosticCode: result.diagnosticCode,
    });

    if (result.reason === "missing_api_key" || result.reason === "auth") {
      return jsonResponse({ ok: false, message: unavailableMessage }, 503);
    }

    if (result.reason === "rate_limited") {
      return jsonResponse({ ok: false, message: genericErrorMessage }, 429);
    }

    if (result.reason === "validation") {
      return jsonResponse({ ok: false, message: genericErrorMessage }, 400);
    }

    return jsonResponse({ ok: false, message: genericErrorMessage }, 503);
  } catch (error) {
    return validationErrorResponse(error);
  }
}

export function ALL() {
  return jsonResponse({ ok: false, message: "Method not allowed." }, 405);
}
