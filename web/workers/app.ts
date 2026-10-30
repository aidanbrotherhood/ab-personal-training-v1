import { createRequestHandler, RouterContextProvider } from "react-router";
const handler = createRequestHandler(() => import("virtual:react-router/server-build"), import.meta.env.MODE);
export default {
  fetch(request: Request) {
    // In v8 the request context must be a RouterContextProvider.
    return handler(request, new RouterContextProvider());
  },
} satisfies ExportedHandler;
