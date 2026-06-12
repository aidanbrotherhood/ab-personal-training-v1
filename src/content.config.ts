import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const requiredText = z.string().trim().min(1);
const optionalText = z.string().trim().min(1).optional();

const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: z
    .object({
      title: requiredText,
      slug: z
        .string()
        .trim()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens.")
        .optional(),
      description: requiredText,
      excerpt: optionalText,
      publishedDate: z.date(),
      updatedDate: z.date().optional(),
      status: z.enum(["draft", "published"]).default("draft"),
      featured: z.boolean().default(false),
      tags: z.array(requiredText).default([]),
      category: optionalText,
      coverImage: optionalText,
      seoTitle: optionalText,
      seoDescription: optionalText,
      newsletterSubject: optionalText,
      newsletterPreviewText: optionalText,
      sendAsNewsletter: z.boolean().default(false),
      buttondownDraftId: optionalText,
      canonicalUrl: z.string().trim().url().optional(),
    })
    .strict(),
});

export const collections = { writing };
