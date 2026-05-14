#!/usr/bin/env python3
"""
Post-build script for Aesthetic Avenue.

When rollupOptions.input points to main.tsx directly (not index.html),
Vite outputs the compiled JS/CSS as separate asset files but does NOT
automatically inject them into index.html. This script:
  1. Finds the compiled JS and CSS files in dist/public/assets/
  2. Injects <script> and <link> tags into dist/public/index.html
  3. Removes the stray <script type="module" src="/src/main.tsx"> dev tag
"""
import os
import re
import glob
import sys

DIST_DIR = os.path.join(os.path.dirname(__file__), '..', 'dist', 'public')
INDEX_HTML = os.path.join(DIST_DIR, 'index.html')
ASSETS_DIR = os.path.join(DIST_DIR, 'assets')

# Find compiled JS and CSS files
js_files = glob.glob(os.path.join(ASSETS_DIR, 'main-*.js'))
css_files = glob.glob(os.path.join(ASSETS_DIR, 'main-*.css'))

if not js_files:
    print("ERROR: No compiled JS file found in dist/public/assets/", file=sys.stderr)
    sys.exit(1)

js_file = os.path.basename(js_files[0])
css_file = os.path.basename(css_files[0]) if css_files else None

print(f"Found JS: {js_file}")
if css_file:
    print(f"Found CSS: {css_file}")

# If index.html doesn't exist in dist (because rollupOptions.input is main.tsx),
# copy it from client/index.html
if not os.path.exists(INDEX_HTML):
    SRC_HTML = os.path.join(os.path.dirname(__file__), '..', 'client', 'index.html')
    import shutil
    shutil.copy(SRC_HTML, INDEX_HTML)
    print(f"Copied client/index.html to dist/public/index.html")

# Read the index.html
with open(INDEX_HTML, 'r', encoding='utf-8') as f:
    html = f.read()

# Remove stray /src/main.tsx script tag (any attribute order)
html = re.sub(
    r'<script[^>]*src=["\'][^"\']*\/src\/[^"\']+\.(tsx?|jsx?)[^"\']*["\'][^>]*>\s*<\/script>',
    '',
    html
)

# Build injection tags
css_tag = f'<link rel="stylesheet" crossorigin href="/assets/{css_file}">' if css_file else ''
js_tag = f'<script type="module" crossorigin src="/assets/{js_file}"></script>'

# Inject before </body>
inject = f'\n    {css_tag}\n    {js_tag}\n  '
html = html.replace('</body>', f'{inject}</body>')

# Write back
with open(INDEX_HTML, 'w', encoding='utf-8') as f:
    f.write(html)

print("postbuild.py: Injected JS/CSS assets into index.html successfully.")

# Verify
with open(INDEX_HTML, 'r') as f:
    result = f.read()
if js_file in result:
    print(f"Verified: {js_file} is referenced in index.html")
else:
    print("ERROR: JS file not found in index.html after injection!", file=sys.stderr)
    sys.exit(1)

if '/src/main.tsx' in result:
    print("WARNING: Stray /src/main.tsx tag still present!")
else:
    print("Verified: No stray /src/main.tsx tag.")
