// ─── CHECK 42 — Security Middleware Presence ─────────────────────────────────
// Verifies that every Express server applies the industry-standard security
// middleware stack: helmet (HTTP headers), express-rate-limit (DDoS / brute
// force), and hpp (HTTP parameter pollution).  Missing any of these is a
// direct attack surface on a public-facing API.
import { getAllFiles, readFile, relPath, addIssue } from "../../utils.js";
import type { AuditConfig, CheckResult } from "../../types.js";

export function check42_securityMiddleware(config: AuditConfig): CheckResult {
  const label = "Security Middleware Presence";
  let count = 0;

  if (!config.stack.hasExpress) {
    return { check: 42, label, passed: true, count: 0, skipped: true, skipReason: "Express not detected" };
  }

  const serverFiles = getAllFiles(config.paths.serverSrc, [".ts", ".js"]);

  // Combine all server source into one blob for global presence checks
  // (middleware might be in a separate file from the main index)
  const allServerSrc = serverFiles.map(f => readFile(f)).join("\n");

  // Locate the main server entry file for line-level reporting
  const mainEntryFile = serverFiles.find(f =>
    /index\.(ts|js)$/.test(f) || /server\.(ts|js)$/.test(f) || /app\.(ts|js)$/.test(f)
  ) ?? serverFiles[0];
  const relEntry = mainEntryFile ? relPath(mainEntryFile, config.paths.rootDir) : "server";

  // ── helmet ────────────────────────────────────────────────────────────────
  const hasHelmet = /\bhelmet\b/.test(allServerSrc) && /app\.use\s*\(\s*helmet/.test(allServerSrc);
  if (!hasHelmet) {
    addIssue("CRITICAL", 42, relEntry, 0,
      `helmet is not applied — HTTP security headers (X-Content-Type-Options, X-Frame-Options, HSTS, CSP, etc.) are missing. Install helmet and add \`app.use(helmet())\` before all routes.`,
      config);
    count++;
  }

  // ── express-rate-limit ────────────────────────────────────────────────────
  const hasRateLimit = /rateLimit\b/.test(allServerSrc) || /express-rate-limit/.test(allServerSrc);
  if (!hasRateLimit) {
    addIssue("CRITICAL", 42, relEntry, 0,
      `express-rate-limit is not configured — API endpoints are unprotected against brute-force and DDoS attacks. Install express-rate-limit and apply a global limiter plus a stricter one on auth routes.`,
      config);
    count++;
  }

  // ── hpp ───────────────────────────────────────────────────────────────────
  const hasHpp = /\bhpp\b/.test(allServerSrc) && /app\.use\s*\(\s*hpp/.test(allServerSrc);
  if (!hasHpp) {
    addIssue("WARNING", 42, relEntry, 0,
      `hpp (HTTP parameter pollution) middleware is not applied. Install hpp and add \`app.use(hpp())\` to prevent attackers from injecting duplicate query parameters.`,
      config);
    count++;
  }

  return { check: 42, label, passed: count === 0, count };
}
