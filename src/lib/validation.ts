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

export const enquiryTypeOptions = ["standard", "qualification"] as const;

export const servicePreferenceOptions = [
  "Initial PT Consultation",
  "Personal Training",
  "Strength Training",
  "Strength & Conditioning",
  "Beginner Gym Confidence",
  "Weight Loss Personal Training",
  "Body Composition Coaching",
  "Nutrition Support",
  "Hybrid Personal Training",
  "Online Personal Training",
  "Not sure yet",
] as const;

export const currentTrainingLevelOptions = [
  "Complete beginner",
  "Returning after time away",
  "Training inconsistently",
  "Training regularly but stuck",
  "Sport/performance background",
] as const;

export const gymConfidenceOptions = ["Very low", "Low", "Okay", "Good", "High"] as const;

export const currentRoutineOptions = [
  "Not training currently",
  "1–2 days/week",
  "3–4 days/week",
  "5+ days/week",
  "Sport-based training",
] as const;

export const biggestBarrierOptions = [
  "Not knowing what to do",
  "Confidence",
  "Consistency",
  "Time",
  "Nutrition",
  "Motivation/accountability",
  "Pain/injury concern",
  "Other",
] as const;

export const preferredCoachingFormatOptions = ["In-person", "Online", "Hybrid", "Not sure"] as const;

export const availabilityOptions = [
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Weekends",
  "Flexible",
] as const;

export const startTimelineOptions = [
  "As soon as possible",
  "In the next 2–4 weeks",
  "In the next few months",
  "Just exploring",
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

const optionalEnum = <T extends readonly [string, ...string[]]>(options: T) =>
  z.preprocess(emptyToUndefined, z.enum(options).optional());

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
    firstName: trimmedString(80),
    lastName: trimmedString(80),
    website: honeypot,
    ...attributionFields,
  })
  .strict();

export const coachingEnquirySchema = z
  .object({
    enquiryType: z.preprocess(
      (value) => emptyToUndefined(value) ?? "standard",
      z.enum(enquiryTypeOptions),
    ),
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
    primaryGoal: optionalTrimmedString(240),
    servicePreference: optionalEnum(servicePreferenceOptions),
    currentTrainingLevel: optionalEnum(currentTrainingLevelOptions),
    gymConfidence: optionalEnum(gymConfidenceOptions),
    currentRoutine: optionalEnum(currentRoutineOptions),
    biggestBarrier: optionalEnum(biggestBarrierOptions),
    preferredCoachingFormat: optionalEnum(preferredCoachingFormatOptions),
    availability: optionalEnum(availabilityOptions),
    startTimeline: optionalEnum(startTimelineOptions),
    message: trimmedString(3000),
    consentToContact: checkboxBoolean.refine((value) => value === true, {
      message: "Please confirm that Aidan can contact you about this enquiry.",
    }),
    website: honeypot,
    ...attributionFields,
  })
  .strict()
  .superRefine((data, context) => {
    if (data.enquiryType !== "qualification") {
      return;
    }

    const requiredQualificationFields = [
      ["primaryGoal", "Please share your primary goal."],
      ["currentTrainingLevel", "Please choose the closest option."],
      ["gymConfidence", "Please choose the closest option."],
      ["currentRoutine", "Please choose the closest option."],
      ["biggestBarrier", "Please choose the closest option."],
      ["preferredCoachingFormat", "Please choose the closest option."],
      ["startTimeline", "Please choose the closest option."],
    ] as const;

    for (const [field, message] of requiredQualificationFields) {
      if (!data[field]) {
        context.addIssue({
          code: "custom",
          path: [field],
          message,
        });
      }
    }
  });

export type NewsletterSignupInput = z.infer<typeof newsletterSignupSchema>;
export type CoachingEnquiryInput = z.infer<typeof coachingEnquirySchema>;
