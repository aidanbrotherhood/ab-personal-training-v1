import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPostSummary, getPublishedWriting, getWritingPath } from "../lib/writing";

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = await getPublishedWriting();

  return rss({
    title: "Aidan Brotherhood Posts",
    description: "Published posts from Aidan Brotherhood.",
    site: context.site ?? "https://example.com",
    items: posts.map((post) => ({
      title: post.data.title,
      description: getPostSummary(post),
      link: getWritingPath(post),
      pubDate: post.data.publishedDate,
      categories: post.data.tags,
    })),
    customData: "<language>en-gb</language>",
  });
}
