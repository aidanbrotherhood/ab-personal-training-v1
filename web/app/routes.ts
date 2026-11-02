import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { publicPages } from "./lib/public-pages";
export default [
  ...publicPages.map((page) =>
    page.path === "/" ? index(page.file) : route(page.path.slice(1), page.file),
  ),
  route("sitemap.xml", "routes/sitemap.ts"),
  route("robots.txt", "routes/robots.ts"),
] satisfies RouteConfig;
