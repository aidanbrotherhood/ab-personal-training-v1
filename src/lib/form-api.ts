import { ZodError, type ZodType } from "zod";
import { assertServerOnly, getServerEnv } from "./server-env";

assertServerOnly("Form API helpers");

export type FormKind = "newsletter" | "coaching";

export const unavailableMessage = "This form is not available yet. Please contact Aidan directly for now.";
export const genericErrorMessage = "Something went wrong. Please try again.";

export async function parseRequestBody(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return request.json();
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}

export function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
}

export function isFormStubMode() {
  return getServerEnv("FORM_STUB_MODE") === "true";
}

export function hasTriggeredHoneypot(payload: unknown) {
  if (!payload || typeof payload !== "object") return false;
  const value = (payload as Record<string, unknown>).website;
  return typeof value === "string" && value.trim().length > 0;
}

export function validatePayload<T>(schema: ZodType<T>, payload: unknown) {
  return schema.parse(payload);
}

export function validationErrorResponse(error: unknown) {
  if (error instanceof ZodError) {
    return jsonResponse(
      {
        ok: false,
        message: "Please check the form and try again.",
        errors: error.flatten().fieldErrors,
      },
      400,
    );
  }

  return jsonResponse({ ok: false, message: genericErrorMessage }, 400);
}

function maskEmail(email?: string) {
  if (!email || !email.includes("@")) return undefined;
  const [name, domain] = email.split("@");
  return `${name.slice(0, 1)}***@${domain}`;
}

export function sanitiseForLog(kind: FormKind, payload: Record<string, unknown>) {
  const shared = {
    kind,
    email: maskEmail(typeof payload.email === "string" ? payload.email : undefined),
    sourcePage: payload.sourcePage,
    utmSource: payload.utmSource,
    utmMedium: payload.utmMedium,
    utmCampaign: payload.utmCampaign,
  };

  if (kind === "newsletter") {
    return {
      ...shared,
      firstNameProvided: Boolean(payload.firstName),
      lastNameProvided: Boolean(payload.lastName),
    };
  }

  return {
    ...shared,
    enquiryType: payload.enquiryType,
    firstNameProvided: Boolean(payload.firstName),
    phoneProvided: Boolean(payload.phone),
    socialHandleProvided: Boolean(payload.socialHandle),
    mainInterest: payload.mainInterest,
    preferredContactMethod: payload.preferredContactMethod,
    newsletterOptIn: payload.newsletterOptIn,
    qualificationFieldsProvided: [
      payload.primaryGoal,
      payload.servicePreference,
      payload.currentTrainingLevel,
      payload.gymConfidence,
      payload.currentRoutine,
      payload.biggestBarrier,
      payload.preferredCoachingFormat,
      payload.availability,
      payload.startTimeline,
    ].filter(Boolean).length,
    messageLength: typeof payload.message === "string" ? payload.message.length : undefined,
  };
}
