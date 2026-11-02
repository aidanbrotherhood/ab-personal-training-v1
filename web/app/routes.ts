import { type RouteConfig, index, route } from "@react-router/dev/routes";
export default [
  index("routes/home.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("personal-training-renfrew", "routes/personal-training-renfrew.tsx"),
] satisfies RouteConfig;
