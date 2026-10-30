import { createRequestHandler, RouterContextProvider } from "react-router";

const handler = createRequestHandler(() => import("virtual:react-router/server-build"), import.meta.env.MODE);

type ABEnv = { ENQUIRIES: D1Database };
const MAX_BYTES = 8000;

async function enquiry(request: Request, env: ABEnv): Promise<Response> {
  const origin = request.headers.get("Origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return new Response("Invalid origin", { status: 403 });
  if (Number(request.headers.get("Content-Length") || 0) > MAX_BYTES) return new Response("Request too large", { status: 413 });
  const data = await request.formData().catch(() => null);
  if (!data) return new Response("Invalid form", { status: 400 });
  const value = (key: string) => String(data.get(key) ?? "").trim();
  if (value("website")) return Response.redirect(new URL("/?enquiry=received#consultation", request.url), 303);
  const name = value("name"), email = value("email"), phone = value("phone");
  const membership = value("membership"), availability = value("availability"), consent = value("consent");
  if (name.length < 2 || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 || phone.length > 40 || availability.length > 300 ||
    !["yes","joining","no"].includes(membership) || consent !== "yes") {
    return new Response("Please go back and check the required fields.", { status: 400 });
  }
  const id = crypto.randomUUID();
  try {
    await env.ENQUIRIES.prepare(
      "INSERT INTO enquiries (id, created_at, name, email, phone, membership, availability, source, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new')"
    ).bind(id, new Date().toISOString(), name, email, phone || null, membership, availability || null, "website").run();
  } catch (error) {
    console.error(JSON.stringify({ event: "enquiry_insert_failed", id, message: error instanceof Error ? error.name : "unknown" }));
    return new Response("We couldn't save your enquiry. Please email aidanbrotherhood@gmail.com instead.", { status: 503 });
  }
  return Response.redirect(new URL("/?enquiry=received#consultation", request.url), 303);
}

export default {
  fetch(request: Request, env: ABEnv) {
    const url = new URL(request.url);
    if (url.pathname === "/api/enquiry") {
      return request.method === "POST" ? enquiry(request, env) : new Response("Method not allowed", { status: 405 });
    }
    return handler(request, new RouterContextProvider());
  },
} satisfies ExportedHandler<ABEnv>;
