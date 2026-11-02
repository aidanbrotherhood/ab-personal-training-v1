// Local read-only proxy for rendered SSR QA with scripts actually blocked by CSP.
// Start the staging artifact on 8787 first. This never targets a remote service.
import { createServer } from "node:http";
const upstream = "http://127.0.0.1:8787";
createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405);
    res.end();
    return;
  }
  try {
    const path = new URL(req.url, upstream);
    if (path.origin !== upstream) {
      res.writeHead(400);
      res.end();
      return;
    }
    const response = await fetch(path, {
      method: req.method,
      redirect: "manual",
    });
    const headers = Object.fromEntries(response.headers);
    delete headers["content-encoding"];
    delete headers["transfer-encoding"];
    delete headers["content-length"];
    headers["content-security-policy"] = "script-src 'none'; object-src 'none'";
    headers["cache-control"] = "no-store";
    res.writeHead(response.status, headers);
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch {
    res.writeHead(502);
    res.end("Start the local staging artifact on port 8787 first.");
  }
}).listen(8788, "127.0.0.1", () =>
  console.log(
    "No-JavaScript QA: http://127.0.0.1:8788 (read-only, script-src none)",
  ),
);
