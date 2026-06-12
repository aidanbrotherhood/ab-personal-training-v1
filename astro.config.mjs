import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

export default defineConfig({
  site: env.SITE_URL ?? "https://example.com",
  output: "server",
  adapter: vercel(),
  integrations: [mdx(), sitemap()],
});
