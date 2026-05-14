// ─── CHECK 11 — Required Env Var Coverage ────────────────────────────────────
import * as path from "path";
import { getAllFiles, readFile, relPath, addIssue, fileExists } from "../../utils.js";
import type { AuditConfig, CheckResult } from "../../types.js";

// Env var names that suggest the value is a secret — hardcoded fallbacks for
// these are a CRITICAL security risk.  Display values, ports, and URLs are
// intentionally excluded: a default email address or port number is never
// a security problem.
const SECRET_NAME_PATTERN = /SECRET|KEY|TOKEN|PASSWORD|HASH|PASS|WEBHOOK|SIGNING|PRIVATE|CREDENTIAL|API_KEY/i;

export function check11_envCoverage(config: AuditConfig): CheckResult {
  const label = "Required Env Var Coverage";
  let count = 0;

  const { paths, patterns } = config;

  // ── Step 1: Collect all env vars referenced in the codebase ──────────────
  const referencedEnvVars = new Set<string>();

  const serverFiles = getAllFiles(paths.serverSrc, [".ts", ".js", ".mjs"]);
  for (const file of serverFiles) {
    const src = readFile(file);
    const processEnvRe = /process\.env\.([A-Z][A-Z0-9_]+)/g;
    let m: RegExpExecArray | null;
    while ((m = processEnvRe.exec(src)) !== null) {
      referencedEnvVars.add(m[1]);
    }
  }

  const clientFiles = getAllFiles(paths.clientSrc, [".ts", ".tsx", ".js", ".jsx"]);
  for (const file of clientFiles) {
    const src = readFile(file);

    const viteEnvRe = /import\.meta\.env\.([A-Z][A-Z0-9_]+)/g;
    let m: RegExpExecArray | null;
    while ((m = viteEnvRe.exec(src)) !== null) {
      referencedEnvVars.add(m[1]);
    }

    const nextEnvRe = /process\.env\.(NEXT_PUBLIC_[A-Z0-9_]+)/g;
    while ((m = nextEnvRe.exec(src)) !== null) {
      referencedEnvVars.add(m[1]);
    }
  }

  // ── Step 2: Collect env vars that are properly declared/validated ─────────
  const declaredEnvVars = new Set<string>();

  if (paths.envFile && fileExists(paths.envFile)) {
    const envSrc = readFile(paths.envFile);
    let m: RegExpExecArray | null;

    const declaredRe = /([A-Z][A-Z0-9_]+)\s*:/g;
    while ((m = declaredRe.exec(envSrc)) !== null) {
      declaredEnvVars.add(m[1]);
    }

    const requireEnvRe = /requireEnv\s*\(\s*["'`]([A-Z][A-Z0-9_]+)["'`]/g;
    while ((m = requireEnvRe.exec(envSrc)) !== null) {
      declaredEnvVars.add(m[1]);
    }

    const processEnvDirectRe = /process\.env(?:\.([A-Z][A-Z0-9_]+)|\[\s*["'`]([A-Z][A-Z0-9_]+)["'`]\s*\])/g;
    while ((m = processEnvDirectRe.exec(envSrc)) !== null) {
      const varName = m[1] || m[2];
      if (varName) declaredEnvVars.add(varName);
    }
  }

  const envExamplePath = path.join(paths.rootDir, ".env.example");
  if (fileExists(envExamplePath)) {
    const envExample = readFile(envExamplePath);
    for (const line of envExample.split("\n")) {
      const match = line.match(/^([A-Z][A-Z0-9_]+)\s*=/);
      if (match) declaredEnvVars.add(match[1]);
    }
  }

  const envPath = path.join(paths.rootDir, ".env");
  if (fileExists(envPath)) {
    const envContent = readFile(envPath);
    for (const line of envContent.split("\n")) {
      const match = line.match(/^([A-Z][A-Z0-9_]+)\s*=/);
      if (match) declaredEnvVars.add(match[1]);
    }
  }

  // ── Step 3: Check for hardcoded secret fallbacks ──────────────────────────
  // Only flag as CRITICAL when the variable name suggests it holds a secret.
  // Port numbers, display names, and email addresses with defaults are safe.
  // Note: \|\| and \?\? are escaped to match literal || and ?? operators.
  if (paths.envFile && fileExists(paths.envFile)) {
    const envSrc = readFile(paths.envFile);
    const lines = envSrc.split("\n");

    const hardcodedFallbackRe = /process\.env\.([A-Z][A-Z0-9_]+)\s*(?:\|\||\?\?)\s*["'`]([^"'`]{2,})["'`]/g;
    let m: RegExpExecArray | null;
    while ((m = hardcodedFallbackRe.exec(envSrc)) !== null) {
      const varName = m[1];
      const fallbackValue = m[2];
      const lineNum = envSrc.slice(0, m.index).split("\n").length;
      const line = lines[lineNum - 1]?.trim() || "";

      // Skip comments
      if (line.startsWith("//") || line.startsWith("*")) continue;

      // Only flag if the variable name looks like a secret
      if (!SECRET_NAME_PATTERN.test(varName)) continue;

      // Skip if the fallback looks like a safe display value:
      // email addresses, plain words, URLs, or port-like numbers
      if (/^[\w\s.@-]+$/.test(fallbackValue) && !fallbackValue.includes("_") && fallbackValue.length < 30) continue;
      if (/^\d{1,5}$/.test(fallbackValue)) continue; // port numbers
      if (fallbackValue.startsWith("http")) continue;  // URLs

      addIssue("CRITICAL", 11, relPath(paths.envFile, paths.rootDir), lineNum,
        `${varName} has a hardcoded fallback "${fallbackValue.slice(0, 20)}..." — if the env var is missing the server will run with a known secret. Remove the fallback; the startup validation will throw instead.`,
        config);
      count++;
    }

    // Empty-string fallback — WARNING for secret vars, INFO for others
    const emptyFallbackRe = /process\.env\.([A-Z][A-Z0-9_]+)\s*(?:\|\||\?\?)\s*["'`]{2}/g;
    while ((m = emptyFallbackRe.exec(envSrc)) !== null) {
      const varName = m[1];
      const lineNum = envSrc.slice(0, m.index).split("\n").length;
      const line = lines[lineNum - 1]?.trim() || "";
      if (line.startsWith("//") || line.startsWith("*")) continue;
      if (!SECRET_NAME_PATTERN.test(varName)) continue; // Only warn on secret vars

      addIssue("WARNING", 11, relPath(paths.envFile, paths.rootDir), lineNum,
        `${varName} has an empty-string fallback — will silently produce an empty value if missing in production. Consider adding it to the startup validation list.`,
        config);
      count++;
    }
  }

  // ── Step 4: Check required env vars are declared ──────────────────────────
  for (const requiredVar of patterns.requiredEnvVars) {
    if (!declaredEnvVars.has(requiredVar)) {
      addIssue("CRITICAL", 11, ".env.example", 0,
        `Required env var ${requiredVar} is not declared in .env.example or env.ts — deployment will fail silently`,
        config);
      count++;
    }
  }

  // ── Step 5: Check startup validation exists ───────────────────────────────
  if (paths.envFile && fileExists(paths.envFile)) {
    const envSrc = readFile(paths.envFile);
    const hasStartupValidation =
      /for\s*\(.*REQUIRED/.test(envSrc) ||
      /requireEnv\s*\(/.test(envSrc) ||
      /z\.string\(\)/.test(envSrc) ||
      /createEnv\s*\(/.test(envSrc) ||
      /throw new Error.*Missing.*env/i.test(envSrc);

    if (!hasStartupValidation) {
      addIssue("WARNING", 11, relPath(paths.envFile, paths.rootDir), 0,
        `env.ts has no startup validation — add a REQUIRED_VARS loop so the server throws on boot if a critical var is missing, rather than silently failing at runtime.`,
        config);
      count++;
    }
  }

  // ── Step 6: Flag referenced vars not in any declaration ──────────────────
  const COMMON_SYSTEM_VARS = new Set([
    "NODE_ENV", "PORT", "HOST", "PATH", "HOME", "USER", "PWD",
    "CI", "GITHUB_ACTIONS", "VERCEL", "RAILWAY_ENVIRONMENT",
    "npm_package_version", "npm_lifecycle_event",
  ]);

  for (const varName of referencedEnvVars) {
    if (COMMON_SYSTEM_VARS.has(varName)) continue;
    if (declaredEnvVars.has(varName)) continue;

    addIssue("WARNING", 11, "env", 0,
      `Env var ${varName} is referenced in code but not declared in .env.example or env.ts — may be missing from deployment`,
      config);
    count++;
  }

  return { check: 11, label, passed: count === 0, count };
}
