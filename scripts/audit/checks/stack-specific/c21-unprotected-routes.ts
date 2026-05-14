// ─── CHECK 21 — Unprotected Sensitive Express Routes ─────────────────────────
import { getAllFiles, readFile, relPath, addIssue } from "../../utils.js";
import type { AuditConfig, CheckResult } from "../../types.js";

export function check21_unprotectedRoutes(config: AuditConfig): CheckResult {
  const label = "Unprotected Sensitive Express Routes";
  let count = 0;

  const { paths, patterns } = config;
  const serverFiles = getAllFiles(paths.serverSrc, [".ts", ".js"]);

  // Routes where missing auth is a CRITICAL security hole (attacker can trigger
  // destructive or privileged actions without any credentials)
  const CRITICAL_ROUTE_PATTERNS = [
    /\/admin/i,
    /\/notify/i,     // notification triggers — could be abused for spam/phishing
    /\/ai\b/i,       // AI endpoints — expensive, should be gated
    /\/seed/i,       // database seeding — destructive
    /\/reset/i,      // data reset — destructive
    /\/migrate/i,    // schema migrations — destructive
    /\/impersonate/i,
    /\/sudo/i,
  ];

  // Routes that are sensitive but only warrant a WARNING (common to have
  // token-secured webhooks or partially-public CRUD)
  const WARNING_ROUTE_PATTERNS = [
    /\/delete/i, /\/remove/i,
    /\/update/i, /\/edit/i, /\/create/i,
    /\/upload/i, /\/import/i, /\/export/i,
    /\/users/i, /\/clients/i,
    /\/billing/i, /\/payment/i, /\/invoice/i,
    /\/webhook/i,
  ];

  // Auth middleware patterns — any of these in the next 10 lines of a route means it's protected
  const AUTH_PATTERNS = [
    ...(patterns.authProcedures || []).map(name => new RegExp(`\\b${name}\\b`)),
    /authenticateRequest/,
    /verifyToken/,
    /requireAuth/,
    /isAuthenticated/,
    /checkAuth/,
    /authMiddleware/,
    /bearerAuth/,
    /jwtAuth/,
    /sdk\.authenticateRequest/,
    /passport\.authenticate/,
    /session\s*\(/,
    // Webhook signature verification (intentionally public but cryptographically secured)
    /constructEvent/,
    /verifyXeroWebhookSignature/,
    /webhooks\.constructEvent/,
    /stripe-signature/,
    /x-xero-signature/,
    /webhook.*signature/i,
    /signature.*webhook/i,
    /HMAC/,
    /hmac/,
  ];

  for (const file of serverFiles) {
    const rel = relPath(file, paths.rootDir);
    const src = readFile(file);
    const lines = src.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      const routeRe = /(?:app|router)\.(get|post|put|delete|patch)\s*\(\s*["'`]([^"'`]+)["'`]/;
      const routeMatch = routeRe.exec(line);
      if (!routeMatch) continue;

      const method = routeMatch[1].toUpperCase();
      const routePath = routeMatch[2];

      const isCritical = CRITICAL_ROUTE_PATTERNS.some(re => re.test(routePath));
      const isWarning = !isCritical && WARNING_ROUTE_PATTERNS.some(re => re.test(routePath));

      if (!isCritical && !isWarning) continue;

      // Look at this line + next 10 lines for auth middleware
      const context = lines.slice(i, Math.min(i + 10, lines.length)).join("\n");
      const hasAuth = AUTH_PATTERNS.some(re => re.test(context));

      if (!hasAuth) {
        const severity = isCritical ? "CRITICAL" : "WARNING";
        addIssue(severity, 21, rel, lineNum,
          `${method} ${routePath} — sensitive route has no auth middleware. Add authentication before the handler.`,
          config);
        count++;
      }
    }
  }

  return { check: 21, label, passed: count === 0, count };
}
