import { z } from "zod";

export const mainInterestOptions = [
  "1:1 PT/coaching",
  "Athletic rebuild",
  "Strength and conditioning",
  "Body composition",
  "Tennis coaching",
  "Youth athlete development",
  "General question",
  "Future facility/community interest",
] as const;

export const preferredContactMethodOptions = [
  "Email",
  "Phone",
  "Instagram/DM",
  "No preference",
] as const;

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const trimmedString = (maxLength: number) =>
  z
    .string()
    .trim()
    .min(1, "This field is required.")
    .max(maxLength, `Please keep this under ${maxLength} characters.`);

const optionalTrimmedString = (maxLength: number) =>
  z.preprocess(
    emptyToUndefined,
    z.string().trim().max(maxLength, `Please keep this under ${maxLength} characters.`).optional(),
  );

const checkboxBoolean = z.preprocess(
  (value) => value === true || value === "true" || value === "on" || value === "1",
  z.boolean(),
);

const optionalCheckboxBoolean = z.preprocess(
  (value) => value === true || value === "true" || value === "on" || value === "1",
  z.boolean(),
);

const honeypot = z.preprocess((value) => (typeof value === "string" ? value.trim() : ""), z.literal(""));

const attributionFields = {
  sourcePage: optionalTrimmedString(2048),
  utmSource: optionalTrimmedString(200),
  utmMedium: optionalTrimmedString(200),
  utmCampaign: optionalTrimmedString(200),
  utmTerm: optionalTrimmedString(200),
  utmContent: optionalTrimmedString(200),
};

export const newsletterSignupSchema = z
  .object({
    email: z.string().trim().email("Please enter a valid email address.").max(254),
    firstName: optionalTrimmedString(80),
    website: honeypot,
    ...attributionFields,
  })
  .strict();

export const coachingEnquirySchema = z
  .object({
    firstName: trimmedString(80),
    lastName: optionalTrimmedString(80),
    email: z.string().trim().email("Please enter a valid email address.").max(254),
    phone: optionalTrimmedString(40),
    location: optionalTrimmedString(120),
    mainInterest: z.enum(mainInterestOptions, { message: "Please choose the closest option." }),
    preferredContactMethod: z.preprocess(
      emptyToUndefined,
      z.enum(preferredContactMethodOptions).optional(),
    ),
    referralSource: optionalTrimmedString(200),
    socialHandle: optionalTrimmedString(120),
    newsletterOptIn: optionalCheckboxBoolean.default(false),
    message: trimmedString(3000),
    consentToContact: checkboxBoolean.refine((value) => value === true, {
      message: "Please confirm that Aidan can contact you about this enquiry.",
    }),
    website: honeypot,
    ...attributionFields,
  })
  .strict();

export type NewsletterSignupInput = z.infer<typeof newsletterSignupSchema>;
export type CoachingEnquiryInput = z.infer<typeof coachingEnquirySchema>;
