// ─── CHECK 37 — tRPC Procedures Missing Zod Input Validation ─────────────────
// API procedures that accept user input without Zod validation are vulnerable
// to malformed data, injection attacks, and runtime crashes.
import { getAllFiles, readFile, relPath, addIssue } from "../../utils.js";
import type { AuditConfig, CheckResult } from "../../types.js";

// Procedure names that legitimately take no input — never flag these.
const NO_INPUT_PROCEDURES = /\b(logout|signout|logOut|signOut|me|health|ping|status|whoami|disconnect|refresh|heartbeat)\s*:/i;

export function check37_missingZodInput(config: AuditConfig): CheckResult {
  const label = "tRPC Procedures Missing Zod Input Validation";
  let count = 0;

  if (!config.stack.hasTrpc) {
    return { check: 37, label, passed: true, count: 0, skipped: true, skipReason: "tRPC not detected" };
  }

  const serverFiles = getAllFiles(config.paths.serverSrc, [".ts"]);

  for (const file of serverFiles) {
    const rel = relPath(file, config.paths.rootDir);
    const src = readFile(file);
    const lines = src.split("\n");

    // Find .mutation() and .query() procedure definitions
    const procedureRe = /\.(mutation|query)\s*\(\s*(?:async\s*)?\(/g;
    let m: RegExpExecArray | null;

    while ((m = procedureRe.exec(src)) !== null) {
      const lineNum = src.slice(0, m.index).split("\n").length;
      const line = lines[lineNum - 1]?.trim() || "";
      if (line.startsWith("//") || line.startsWith("*")) continue;

      // Look backwards for .input( chained before this .mutation/.query
      // Use a generous 4000-char window to handle large multi-line Zod schemas
      const preceding = src.slice(Math.max(0, m.index - 4000), m.index);
      const hasInput = /\.input\s*\(/.test(preceding);

      if (!hasInput) {
        // Check if this procedure name is in the known no-input list
        // Look back up to 200 chars for the procedure key name
        const nameContext = src.slice(Math.max(0, m.index - 200), m.index);
        if (NO_INPUT_PROCEDURES.test(nameContext)) continue;

        // Check if the handler function actually references \`input\`
        // If the handler is ({ ctx }) without input, it genuinely needs no input schema
        const handlerContext = src.slice(m.index, m.index + 600);
        const handlerUsesInput = /\binput\b/.test(handlerContext);
        if (!handlerUsesInput) continue;

        // For mutations specifically, input validation is critical
        if (m[1] === "mutation") {
          addIssue("CRITICAL", 37, rel, lineNum,
            `.mutation() has no .input(z.object(...)) — accepts unvalidated user data, vulnerable to malformed input`,
            config);
          count++;
        } else if (m[1] === "query") {
          // For queries with params, also flag
          if (/\binput\b|\bparams\b|\bwhere\b/.test(handlerContext)) {
            addIssue("WARNING", 37, rel, lineNum,
              `.query() uses input parameters but has no .input(z.object(...)) validation`,
              config);
            count++;
          }
        }
      }
    }
  }

  return { check: 37, label, passed: count === 0, count };
}
