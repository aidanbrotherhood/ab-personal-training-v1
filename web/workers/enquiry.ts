import { processNotifications } from "./notifications";
import { campaignKeys, safeCampaignLabel } from "../app/lib/attribution";
import { packageIds } from "../app/lib/offers";

const MAX_BYTES = 8000;
const NOTICE_VERSION = "2026-11-02";
type EnquiryEnv = Pick<Env, "ENQUIRIES" | "ENQUIRY_LIMITER">;
type Fields = Record<string, string>;
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );

function result(
  request: Request,
  status: number,
  message: string,
  errors: Fields = {},
  values: Fields = {},
) {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow",
    "Referrer-Policy": "no-referrer",
  });
  if (status === 429) headers.set("Retry-After", "60");
  if (request.headers.get("Accept")?.includes("application/json"))
    return Response.json(
      { ok: status === 200, message, errors },
      { status, headers },
    );
  headers.set("Content-Type", "text/html; charset=utf-8");
  headers.set(
    "Content-Security-Policy",
    "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
  );
  const select = (key: string, label: string, options: [string, string][]) =>
    `<label>${label}<select name="${key}" required>${options.map(([id, text]) => `<option value="${id}"${values[key] === id ? " selected" : ""}>${text}</option>`).join("")}</select></label>`;
  const form =
    status === 200
      ? ""
      : `<form action="/api/enquiry" method="post"><label>Your name<input name="name" required minlength="2" maxlength="120" autocomplete="name" value="${escape(values.name || "")}"></label><label>Email address<input type="email" name="email" required maxlength="254" autocomplete="email" value="${escape(values.email || "")}"></label>${select(
          "membership",
          "JD Gyms Renfrew membership",
          [
            ["yes", "I’m already a member"],
            ["joining", "I’m happy to join"],
            ["no", "I’d like to discuss this"],
          ],
        )}${select("goal", "Training goal (optional)", [
          ["unsure", "Let’s talk it through"],
          ["fat-loss", "Losing body fat"],
          ["strength", "Strength or muscle"],
          ["confidence", "Gym confidence and consistency"],
        ])}${select("package_interest", "Coaching option (optional)", [
          ["unsure", "I’m not sure yet"],
          ["introduction", "PT Introduction — £99 one-off"],
          ["weekly", "Weekly Coaching — £180 / four weeks"],
          ["complete", "Complete Coaching — £320 / four weeks"],
        ])}<label>Usual days or times (optional)<input name="availability" maxlength="300" value="${escape(values.availability || "")}"></label><input type="hidden" name="request_id" value="${escape(values.request_id || crypto.randomUUID())}"><input type="hidden" name="attribution" value="${escape(values.attribution || "{}")}"><div class="trap" aria-hidden="true"><label>Leave empty<input name="website" tabindex="-1" autocomplete="off"></label></div><label class="check"><input type="checkbox" name="consent" value="yes" required> Please contact me about my enquiry. I’ve read the <a href="/privacy">privacy notice</a>.</label><button>Request a free consultation</button></form>`;
  return new Response(
    `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${status === 200 ? "Enquiry received" : "Check your enquiry"} | AB Personal Training</title><style>body{font:16px/1.6 system-ui,sans-serif;color:#25272b;max-width:620px;margin:60px auto;padding:0 24px}h1{font-size:42px;letter-spacing:-.04em;line-height:1.1}a{color:#075fd8}label{display:block;margin:20px 0}input,select{display:block;box-sizing:border-box;width:100%;font:inherit;padding:10px;border:1px solid #9ba5b5;border-radius:4px;margin-top:8px}button{background:#075fd8;color:white;border:0;padding:16px 20px;font:inherit;border-radius:5px;cursor:pointer}.check input{display:inline;width:auto}.trap{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}:focus-visible{outline:3px solid #075fd8;outline-offset:4px}</style></head><body><a href="/">AB Personal Training</a><main><h1>${status === 200 ? "Thanks for getting in touch." : "Let’s check your request."}</h1><p>${escape(message)}</p>${
      Object.values(errors).length
        ? `<ul>${Object.values(errors)
            .map((e) => `<li>${escape(e)}</li>`)
            .join("")}</ul>`
        : ""
    }${form}<p>${status === 200 ? "You haven’t booked a session or committed to a package. " : ""}You can also email <a href="mailto:hello@aidanbrotherhood.com">hello@aidanbrotherhood.com</a>.</p><a href="/">Back to the website →</a></main></body></html>`,
    { status, headers },
  );
}

async function boundedForm(request: Request): Promise<FormData | null> {
  if (!request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        throw new RangeError("Request too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.length;
  }
  return new Response(body, {
    headers: { "Content-Type": request.headers.get("Content-Type") || "" },
  })
    .formData()
    .catch(() => null);
}

export async function handleEnquiry(
  request: Request,
  env: EnquiryEnv,
  context?: Pick<ExecutionContext, "waitUntil">,
): Promise<Response> {
  const fail = (
    status: number,
    message: string,
    errors?: Fields,
    values?: Fields,
  ) => result(request, status, message, errors, values);
  if (request.method !== "POST") {
    const response = fail(
      405,
      "Please use the consultation form to send an enquiry.",
    );
    response.headers.set("Allow", "POST");
    return response;
  }
  const origin = request.headers.get("Origin");
  try {
    if (
      (origin && new URL(origin).origin !== new URL(request.url).origin) ||
      request.headers.get("Sec-Fetch-Site") === "cross-site"
    )
      return fail(
        403,
        "Please send your request from the AB Personal Training website.",
      );
  } catch {
    return fail(403, "The request origin could not be verified.");
  }
  if (
    !/^(application\/x-www-form-urlencoded|multipart\/form-data)(;|$)/i.test(
      request.headers.get("Content-Type") || "",
    )
  )
    return fail(415, "Please use the consultation form to send an enquiry.");
  if (Number(request.headers.get("Content-Length") || 0) > MAX_BYTES)
    return fail(
      413,
      "That request is too large. Please keep the availability field brief.",
    );
  try {
    const limited = await env.ENQUIRY_LIMITER.limit({
      key: request.headers.get("CF-Connecting-IP") || "unknown",
    });
    if (!limited.success)
      return fail(
        429,
        "There have been several requests recently. Please wait a minute before trying again.",
      );
  } catch {
    return fail(
      503,
      "The enquiry service is temporarily unavailable. Please email hello@aidanbrotherhood.com.",
    );
  }
  let data: FormData | null;
  try {
    data = await boundedForm(request);
  } catch (error) {
    return fail(
      error instanceof RangeError ? 413 : 400,
      "We couldn’t read that request. Please check your details and try again.",
    );
  }
  if (!data)
    return fail(400, "We couldn’t read that request. Please try again.");
  const values: Fields = {};
  for (const key of [
    "name",
    "email",
    "membership",
    "goal",
    "availability",
    "package_interest",
    "request_id",
    "attribution",
    "phone",
    "consent",
    "website",
  ]) {
    const entry = data.get(key);
    values[key] = typeof entry === "string" ? entry.trim() : "";
  }
  if (values.website)
    return result(request, 200, "Your request has been received.");
  const errors: Fields = {};
  if (
    values.phone.length > 40 ||
    (values.phone && !/^[+0-9 ()-]{6,40}$/.test(values.phone))
  )
    errors.phone = "Enter a valid phone number, or leave it empty.";
  if (
    values.name.length < 2 ||
    values.name.length > 120 ||
    /[\r\n\x00-\x1f]/.test(values.name)
  )
    errors.name = "Enter your name (2–120 characters).";
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ||
    values.email.length > 254
  )
    errors.email = "Enter a valid email address.";
  if (!["yes", "joining", "no"].includes(values.membership))
    errors.membership = "Choose a JD Gyms membership option.";
  values.goal ||= "unsure";
  values.package_interest ||= "unsure";
  if (!["unsure", "fat-loss", "strength", "confidence"].includes(values.goal))
    errors.goal = "Choose one of the training goals.";
  if (!packageIds.includes(values.package_interest))
    errors.package_interest = "Choose one of the coaching options.";
  if (values.availability.length > 300)
    errors.availability = "Keep availability to 300 characters or fewer.";
  if (values.consent !== "yes")
    errors.consent =
      "Please confirm we can contact you about your enquiry and that you’ve read the privacy notice.";
  if (
    values.request_id &&
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      values.request_id,
    )
  )
    errors.request_id = "Please refresh the page before sending your request.";
  if (Object.keys(errors).length)
    return fail(
      422,
      "Please check the details below. Your enquiry hasn’t been saved yet.",
      errors,
      values,
    );
  const attribution: Fields = {};
  try {
    const raw: unknown = JSON.parse(values.attribution || "{}");
    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      const labels = raw as Record<string, unknown>;
      for (const key of campaignKeys)
        if (typeof labels[key] === "string") {
          const value = safeCampaignLabel(labels[key]);
          if (value) attribution[key] = value;
        }
      if (
        typeof labels.referrer === "string" &&
        /^[a-z0-9.-]{1,253}$/i.test(labels.referrer)
      )
        attribution.referrer = labels.referrer;
    }
  } catch {
    /* Attribution must never prevent a valid enquiry. */
  }
  const id = values.request_id || crypto.randomUUID();
  try {
    // D1 batch is atomic. The request UUID makes retries safe without overwriting an enquiry.
    const saved = await env.ENQUIRIES.batch([
      env.ENQUIRIES.prepare(
        "INSERT OR IGNORE INTO enquiries (id, created_at, name, email, phone, membership, availability, source, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'website', 'new')",
      ).bind(
        id,
        new Date().toISOString(),
        values.name,
        values.email,
        values.phone || null,
        values.membership,
        values.availability || null,
      ),
      env.ENQUIRIES.prepare(
        "INSERT OR IGNORE INTO enquiry_details (enquiry_id, goal, package_interest, attribution, notice_version, contact_acknowledged) VALUES (?, ?, ?, ?, ?, 1)",
      ).bind(
        id,
        values.goal,
        values.package_interest,
        JSON.stringify(attribution),
        NOTICE_VERSION,
      ),
      env.ENQUIRIES.prepare(
        "INSERT OR IGNORE INTO enquiry_notifications (enquiry_id) VALUES (?)",
      ).bind(id),
    ]);
    if (saved[0].meta.changes > 0)
      console.info(
        JSON.stringify({
          event: "enquiry_saved",
          package: values.package_interest,
        }),
      );
  } catch {
    console.error(JSON.stringify({ event: "enquiry_insert_failed" }));
    return fail(
      503,
      "We couldn’t save your enquiry. Your details are still here. Please try again or email hello@aidanbrotherhood.com.",
      {},
      values,
    );
  }
  if (context)
    context.waitUntil(
      processNotifications(env as Env).catch(() =>
        console.error(
          JSON.stringify({ event: "notification_processing_failed" }),
        ),
      ),
    );
  return result(
    request,
    200,
    "Your enquiry has been saved. Aidan will reply by email to arrange your free consultation.",
  );
}
