// ─── CHECK 44 — Credentials/Secrets in HTTP Responses ────────────────────────
// Returning password hashes, plaintext passwords, or raw secrets in HTTP
// responses is a data breach waiting to happen.  This check specifically targets
// res.json() / res.send() calls that include password or secret fields directly
// in the response payload — not DB writes, Zod schemas, or bcrypt operations.
import { getAllFiles, readFile, relPath, addIssue } from "../../utils.js";
import type { AuditConfig, CheckResult } from "../../types.js";

export function check44_credentialsInResponses(config: AuditConfig): CheckResult {
  const label = "Credentials/Secrets in HTTP Responses";
  let count = 0;

  const serverFiles = getAllFiles(config.paths.serverSrc, [".ts", ".js"]);

  for (const file of serverFiles) {
    const rel = relPath(file, config.paths.rootDir);
    const src = readFile(file);
    const lines = src.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      const trimmed = line.trim();

      // Skip comments
      if (trimmed.startsWith("//") || trimmed.startsWith("*")) continue;

      // Only look at lines that are writing an HTTP response
      const isResJson  = /res\.(json|send)\s*\(/.test(line);
      const isResWrite = /res\.(json|send)\s*\(\s*\{/.test(line);
      if (!isResJson && !isResWrite) continue;

      // Look at this line + next 8 lines for the response body content
      const responseContext = lines.slice(i, Math.min(lines.length, i + 8)).join("\n");

      // Skip if this is a Stripe webhook, error response, or simple status
      if (/received|verified|success\s*:\s*true/.test(responseContext) &&
          !/password|hash|secret|credential/i.test(responseContext)) continue;

      // Skip if near bcrypt, DB writes — these handle credentials safely
      const surroundingContext = lines.slice(Math.max(0, i - 3), Math.min(lines.length, i + 10)).join("\n");
      if (/bcrypt|\.hash\s*\(|\.set\s*\(|\.values\s*\(|await\s+db\.|INSERT|UPDATE/i.test(surroundingContext)) continue;

      // Check if the response body contains plaintext credential fields
      const CREDENTIAL_IN_RESPONSE = [
        // Explicit password or hash field in response object
        /["'`]?(password|plaintext|cleartext)["'`]?\s*:/i,
        // credentials block being returned
        /credentials\s*:\s*\{/i,
      ];

      const hasLeak = CREDENTIAL_IN_RESPONSE.some(re => re.test(responseContext));
      if (hasLeak) {
        addIssue("CRITICAL", 44, rel, lineNum,
          `Potential plaintext credential leak in HTTP response — password or credentials field detected inside res.json(). Strip sensitive fields before sending responses.`,
          config);
        count++;
      }
    }
  }

  return { check: 44, label, passed: count === 0, count };
}
