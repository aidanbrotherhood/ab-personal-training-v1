export async function processNotifications(env: Env) {
  if (!env.RESEND_API_KEY) return;
  const rows = await env.ENQUIRIES.prepare(
    `SELECT n.enquiry_id, e.name, e.email, e.phone, d.goal, d.package_interest FROM enquiry_notifications n JOIN enquiries e ON e.id=n.enquiry_id JOIN enquiry_details d ON d.enquiry_id=e.id WHERE n.state='pending' AND n.attempts<6 AND n.next_attempt<=unixepoch() AND n.created_at>unixepoch()-82800 LIMIT 10`,
  ).all<{
    enquiry_id: string;
    name: string;
    email: string;
    phone: string | null;
    goal: string;
    package_interest: string;
  }>();
  for (const row of rows.results) {
    const lock = await env.ENQUIRIES.prepare(
      "UPDATE enquiry_notifications SET next_attempt=unixepoch()+300, attempts=attempts+1 WHERE enquiry_id=? AND state='pending' AND next_attempt<=unixepoch()",
    )
      .bind(row.enquiry_id)
      .run();
    if (!lock.meta.changes) continue;
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `ab-enquiry-${row.enquiry_id}`,
        },
        body: JSON.stringify({
          from: "AB Personal Training <enquiries@notify.aidanbrotherhood.com>",
          to: ["hello@aidanbrotherhood.com"],
          reply_to: row.email,
          subject: "New AB Personal Training consultation enquiry",
          text: `A consultation enquiry has been saved.\n\nName: ${row.name}\nEmail: ${row.email}\nPhone: ${row.phone || "Not supplied"}\nInterest: ${row.package_interest}\nGoal: ${row.goal}\n\nReply to this email to contact the prospect.\nReference: ${row.enquiry_id}`,
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error("Notification rejected");
      const result = (await response.json()) as { id?: string };
      if (!result.id) throw new Error("Missing provider reference");
      await env.ENQUIRIES.prepare(
        "UPDATE enquiry_notifications SET state='accepted', provider_id=?, updated_at=unixepoch() WHERE enquiry_id=?",
      )
        .bind(result.id, row.enquiry_id)
        .run();
      console.info(JSON.stringify({ event: "notification_accepted" }));
    } catch {
      console.error(JSON.stringify({ event: "notification_attempt_failed" }));
      // Never log the provider body or personal information. The durable row remains retryable.
    }
  }
}
