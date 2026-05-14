// ─── CHECK 12 — Auth Guard Audit ─────────────────────────────────────────────
import * as path from "path";
import { getAllFiles, readFile, relPath, addIssue, fileExists } from "../../utils.js";
import type { AuditConfig, CheckResult } from "../../types.js";

export function check12_authGuards(config: AuditConfig): CheckResult {
  const label = "Auth Guard Audit";
  let count = 0;

  if (!config.stack.hasTrpc) {
    return { check: 12, label, passed: true, count: 0, skipped: true, skipReason: "tRPC not detected" };
  }

  // Sensitive procedure name patterns that should NEVER be on publicProcedure
  const SENSITIVE_PATTERNS = [
    /delete/i, /remove/i, /destroy/i,
    /update/i, /edit/i, /modify/i,
    /admin/i, /manage/i,
    /listAll/i, /getAll/i, /export/i,
    /approve/i, /reject/i,
    /billing/i, /invoice/i,
    /secret/i,
    /upload/i,
  ];

  const SAFE_NAMES = new Set([
    "login", "register", "signup", "forgotPassword", "resetPassword",
    "verifyEmail", "health", "ping", "status", "publicInfo",
    "getPublicData", "listPublic", "demo", "webhook",
    "loginWithPassword", "loginWithOAuth", "loginWithToken", "loginWithMagicLink",
    "logout", "refreshToken", "exchangeToken", "oauthCallback",
    "create", "submit", "contact", "enquiry", "subscribe",
    "list", "get", "fetch", "search", "find", "lookup",
    "getConfig", "getSettings", "getFeatures", "getPricing",
    "stripeWebhook", "xeroWebhook", "paymentCallback",
  ]);

  const publicProcName = "publicProcedure";

  // Scan the main routers file AND all individual router files in server/routers/
  const filesToScan: string[] = [];

  if (config.paths.routersFile && fileExists(config.paths.routersFile)) {
    filesToScan.push(config.paths.routersFile);
  }

  // Also scan all .ts files in server/routers/ directory (sub-routers)
  const routersDir = path.join(config.paths.serverSrc, "routers");
  if (fileExists(routersDir)) {
    const routerFiles = getAllFiles(routersDir, [".ts", ".js"]);
    for (const f of routerFiles) {
      if (!filesToScan.includes(f)) filesToScan.push(f);
    }
  }

  if (filesToScan.length === 0) {
    return { check: 12, label, passed: true, count: 0, skipped: true, skipReason: "No tRPC router files found" };
  }

  for (const file of filesToScan) {
    const src = readFile(file);
    const lines = src.split("\n");
    const rel = relPath(file, config.paths.rootDir);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      const publicProcRe = new RegExp(`(\\w+)\\s*:\\s*${publicProcName}\\s*\\.`);
      const match = publicProcRe.exec(line);
      if (!match) continue;

      const procedureName = match[1];
      if (SAFE_NAMES.has(procedureName)) continue;

      const isSensitive = SENSITIVE_PATTERNS.some(re => re.test(procedureName));
      if (isSensitive) {
        addIssue("CRITICAL", 12, rel, lineNum,
          `"${procedureName}" is exposed via ${publicProcName} — this is a sensitive operation that should require authentication. Change to protectedProcedure or adminProcedure.`,
          config);
        count++;
      }
    }
  }

  return { check: 12, label, passed: count === 0, count };
}
