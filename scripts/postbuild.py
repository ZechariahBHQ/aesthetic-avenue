#!/usr/bin/env python3
"""
Post-build script: strips the stray <script type="module" src="/src/main.tsx"></script>
tag that the Manus runtime plugin leaves in the built index.html.
"""
import re
import sys
import os

html_path = os.path.join(os.path.dirname(__file__), '..', 'dist', 'public', 'index.html')

if not os.path.exists(html_path):
    print(f"ERROR: {html_path} not found", file=sys.stderr)
    sys.exit(1)

html = open(html_path, 'r', encoding='utf-8').read()
before = len(html)

# Remove any <script> tag pointing to /src/*.tsx or /src/*.ts
cleaned = re.sub(r'<script[^>]*\bsrc="/src/[^"]+\.(tsx?|jsx?)"[^>]*>\s*</script>', '', html)

open(html_path, 'w', encoding='utf-8').write(cleaned)

removed = before - len(cleaned)
if removed > 0:
    print(f"postbuild: removed stray script tag ({removed} chars stripped)")
else:
    print("postbuild: no stray script tags found")
