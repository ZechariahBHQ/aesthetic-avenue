// ─── CHECK 43 — localStorage Auth/PII Storage ────────────────────────────────
// Storing user objects, JWTs, or session data in localStorage is an XSS risk:
// any injected script can exfiltrate the entire object.  Auth tokens must live
// in httpOnly cookies; user data that must persist should be minimal (just an
// ID or display name — never the full user record or anything sensitive).
import { getAllFiles, readFile, relPath, addIssue } from "../../utils.js";
import type { AuditConfig, CheckResult } from "../../types.js";

export function check43_localStorageAuth(config: AuditConfig): CheckResult {
  const label = "localStorage Auth/PII Storage";
  let count = 0;

  const allDirs = config.paths.allSourceDirs;

  // Keys that strongly suggest auth/sensitive data being persisted
  const SENSITIVE_KEY_PATTERNS = [
    /user[-_]?info/i,
    /user[-_]?data/i,
    /auth[-_]?token/i,
    /access[-_]?token/i,
    /refresh[-_]?token/i,
    /session/i,
    /jwt/i,
    /credential/i,
    /password/i,
    /secret/i,
    /runtime[-_]?user/i,
    /manus[-_]?.*user/i,
  ];

  for (const dir of allDirs) {
    const files = getAllFiles(dir, [".ts", ".tsx", ".js", ".jsx"]);

    for (const file of files) {
      const rel = relPath(file, config.paths.rootDir);
      const src = readFile(file);
      const lines = src.split("\n");

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineNum = i + 1;

        // Match: localStorage.setItem("key", ...) — single or double quotes
        const setItemRe = /localStorage\.setItem\s*\(\s*["'`]([^"'`]+)["'`]/g;
        let m: RegExpExecArray | null;
        while ((m = setItemRe.exec(line)) !== null) {
          const key = m[1];
          const isSensitive = SENSITIVE_KEY_PATTERNS.some(re => re.test(key));
          if (isSensitive) {
            addIssue("CRITICAL", 43, rel, lineNum,
              `localStorage.setItem("${key}", ...) — sensitive auth/user data stored in localStorage is exposed to XSS attacks. Use httpOnly cookies for tokens and avoid persisting full user objects client-side.`,
              config);
            count++;
          }
        }
      }
    }
  }

  return { check: 43, label, passed: count === 0, count };
}
