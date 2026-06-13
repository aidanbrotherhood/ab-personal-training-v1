import { getCollection, type CollectionEntry } from "astro:content";

export type WritingPost = CollectionEntry<"writing">;

const postDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function sortWritingByDate(posts: WritingPost[]) {
  return [...posts].sort(
    (left, right) => right.data.publishedDate.valueOf() - left.data.publishedDate.valueOf(),
  );
}

export async function getPublishedWriting() {
  const posts = await getCollection("writing", ({ data }) => data.status === "published");

  return sortWritingByDate(posts);
}

export async function getFeaturedWriting(limit?: number) {
  const featuredPosts = (await getPublishedWriting()).filter((post) => post.data.featured);

  return typeof limit === "number" ? featuredPosts.slice(0, limit) : featuredPosts;
}

export async function getHomepageWriting(limit = 3) {
  const posts = await getPublishedWriting();
  const featuredPosts = posts.filter((post) => post.data.featured);
  const selectedPosts = featuredPosts.length >= limit ? featuredPosts : posts;

  return selectedPosts.slice(0, limit);
}

export function getWritingSlug(post: WritingPost) {
  return post.data.slug ?? post.id;
}

export function getWritingPath(post: WritingPost) {
  return `/posts/${getWritingSlug(post)}`;
}

export function getPostSummary(post: WritingPost) {
  return post.data.excerpt ?? post.data.description;
}

export function formatPostDate(date: Date) {
  return postDateFormatter.format(date);
}
