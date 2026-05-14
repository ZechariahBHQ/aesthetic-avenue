#!/usr/bin/env python3
"""
Post-build validation for Aesthetic Avenue.

The production build must use `client/index.html` as the Vite HTML entry so Vite
can process the root template, inject compiled assets, and replace supported HTML
environment variables correctly. This script intentionally does not inject assets
manually; it only performs defensive cleanup and verifies the generated HTML is
safe to publish.
"""
import os
import re
import sys

DIST_DIR = os.path.join(os.path.dirname(__file__), "..", "dist", "public")
INDEX_HTML = os.path.join(DIST_DIR, "index.html")

if not os.path.exists(INDEX_HTML):
    print("ERROR: dist/public/index.html was not generated. Check Vite HTML entry configuration.", file=sys.stderr)
    sys.exit(1)

with open(INDEX_HTML, "r", encoding="utf-8") as f:
    html = f.read()

original_html = html

# Remove any unresolved Vite HTML placeholders defensively. These previously
# caused a blank page when analytics placeholders remained in the published HTML.
html = re.sub(
    r"<script[^>]*%VITE_[^%]+%[^>]*>\s*</script>",
    "",
    html,
    flags=re.IGNORECASE | re.DOTALL,
)
html = re.sub(
    r"<link[^>]*%VITE_[^%]+%[^>]*>",
    "",
    html,
    flags=re.IGNORECASE | re.DOTALL,
)

if html != original_html:
    with open(INDEX_HTML, "w", encoding="utf-8") as f:
        f.write(html)
    print("postbuild.py: Removed unresolved VITE placeholder tags.")

checks = [
    ("/src/main.tsx" not in html, "raw /src/main.tsx entry must not be present in production HTML"),
    ("%VITE_" not in html, "unresolved %VITE_*% placeholders must not be present in production HTML"),
    (re.search(r'<script[^>]+type=["\']module["\'][^>]+src=["\']/assets/[^"\']+\.js["\']', html) is not None,
     "built module script from /assets/*.js must be referenced"),
]

failed = [message for ok, message in checks if not ok]
if failed:
    for message in failed:
        print(f"ERROR: {message}", file=sys.stderr)
    sys.exit(1)

print("postbuild.py: Production HTML validated successfully.")
