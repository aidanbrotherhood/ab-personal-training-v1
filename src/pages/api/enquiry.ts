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
import { createCoachingEnquiryInAttio } from "../../lib/attio";
import { subscribeToButtondown } from "../../lib/buttondown";
import { coachingEnquirySchema } from "../../lib/validation";

export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const payload = await parseRequestBody(request);

    if (hasTriggeredHoneypot(payload)) {
      return jsonResponse({ ok: false, message: genericErrorMessage }, 400);
    }

    const data = validatePayload(coachingEnquirySchema, payload);

    if (isFormStubMode()) {
      console.info("[form stub] coaching enquiry", sanitiseForLog("coaching", data));

      return jsonResponse({
        ok: true,
        message: "Thanks — I’ve got this. I’ll get back to you soon.",
        ...(import.meta.env.DEV ? { devMessage: "Stub mode: validated but not sent to integrations." } : {}),
      });
    }

    const result = await createCoachingEnquiryInAttio(data);

    if (result.ok) {
      console.info("[attio] coaching enquiry", {
        ...sanitiseForLog("coaching", data),
        personStatus: result.personStatus,
        listEntryStatus: result.listEntryStatus,
        mappedFieldCount: result.mappedFieldCount,
        missingRecommendedMappings: result.missingRecommendedMappings,
        skippedPersonFields: result.skippedPersonFields,
      });

      if (data.newsletterOptIn) {
        const newsletterResult = await subscribeToButtondown({
          email: data.email,
          firstName: data.firstName,
          website: "",
          sourcePage: data.sourcePage,
          utmSource: data.utmSource,
          utmMedium: data.utmMedium,
          utmCampaign: data.utmCampaign,
          utmTerm: data.utmTerm,
          utmContent: data.utmContent,
        });

        if (newsletterResult.ok) {
          console.info("[buttondown] coaching newsletter opt-in", {
            ...sanitiseForLog("newsletter", {
              email: data.email,
              firstName: data.firstName,
              sourcePage: data.sourcePage,
              utmSource: data.utmSource,
              utmMedium: data.utmMedium,
              utmCampaign: data.utmCampaign,
            }),
            outcome: newsletterResult.outcome,
            buttondownStatus: newsletterResult.buttondownStatus,
            metadataUpdateStatus: newsletterResult.metadataUpdateStatus,
          });
        } else {
          const logMethod = newsletterResult.reason === "missing_api_key" ? console.info : console.warn;

          logMethod("[buttondown] coaching newsletter opt-in skipped", {
            ...sanitiseForLog("newsletter", {
              email: data.email,
              firstName: data.firstName,
              sourcePage: data.sourcePage,
              utmSource: data.utmSource,
              utmMedium: data.utmMedium,
              utmCampaign: data.utmCampaign,
            }),
            reason: newsletterResult.reason,
            buttondownStatus: newsletterResult.buttondownStatus,
            retryAfter: newsletterResult.retryAfter,
            diagnosticCode: newsletterResult.diagnosticCode,
          });
        }
      }

      return jsonResponse({
        ok: true,
        message: "Thanks — I’ve got this. I’ll get back to you soon.",
      });
    }

    console.warn("[attio] coaching enquiry failed", {
      ...sanitiseForLog("coaching", data),
      reason: result.reason,
      step: result.step,
      attioStatus: result.attioStatus,
      retryAfter: result.retryAfter,
      diagnosticCode: result.diagnosticCode,
      missingConfig: result.missingConfig,
    });

    if (result.reason === "missing_config" || result.reason === "auth") {
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
