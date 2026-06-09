#!/usr/bin/env python3
"""Inline dist HTML, CSS, JS, and image assets into a single HTML file.
Also replaces {{TEMPLATE_VARS}} from config.ts in the built index.html.
"""
import base64
import json
import re
from pathlib import Path

DIST = Path(__file__).parent / "dist"
OUTPUT = DIST / "index-inline.html"

def read_config_values() -> dict:
    """Extract key values from src/config.ts for template replacement."""
    config_path = Path(__file__).parent / "src" / "config.ts"
    if not config_path.exists():
        return {}
    text = config_path.read_text(encoding="utf-8")
    vals = {}
    # Simple regex extraction for string values
    patterns = {
        'SITE_TITLE': r"siteTitle:\s*'([^']*)'",
        'SEO_DESCRIPTION': r"seoDescription:\s*'([^']*)'",
        'SEO_KEYWORDS': r"seoKeywords:\s*'([^']*)'",
        'AUTHOR': r"name:\s*'([^']*)'",
        'SEO_URL': r"seoUrl:\s*'([^']*)'",
        'OG_IMAGE': r"seoOgImage:\s*'([^']*)'",
    }
    for key, pat in patterns.items():
        m = re.search(pat, text)
        if m:
            vals[key] = m.group(1)
    return vals

def replace_templates(html: str, vals: dict) -> str:
    """Replace {{KEY}} placeholders with config values."""
    for key, val in vals.items():
        placeholder = '{{' + key + '}}'
        if placeholder in html:
            html = html.replace(placeholder, val)
            print(f"  replaced template: {placeholder} → {val[:50]}...")
    return html

def inline_file(html: str) -> str:
    # 1) inline CSS
    for m in re.finditer(r'<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>', html):
        href = m.group(1)
        css_path = DIST / href.lstrip("/")
        if css_path.exists():
            css_content = css_path.read_text(encoding="utf-8")
            html = html.replace(m.group(0), f"<style>{css_content}</style>")
            print(f"  inlined CSS: {href} ({len(css_content)} bytes)")

    # 2) inline JS (module scripts)
    for m in re.finditer(r'<script[^>]+type="module"[^>]+src="([^"]+)"[^>]*>\s*</script>', html):
        src = m.group(1)
        js_path = DIST / src.lstrip("/")
        if js_path.exists():
            js_content = js_path.read_text(encoding="utf-8")
            html = html.replace(m.group(0), f"<script type=\"module\">{js_content}</script>")
            print(f"  inlined JS: {src} ({len(js_content)} bytes)")

    # 3) inline images
    image_exts = r"(?:jpg|jpeg|png|webp|gif|svg)"
    found_paths = set()
    for m in re.finditer(rf'url\([\'"]?([^\'")]+?\.{image_exts})[\'"]?\)', html, re.IGNORECASE):
        found_paths.add(m.group(1))
    for m in re.finditer(rf'src=[\'"]([^\'"]+?\.{image_exts})[\'"]', html, re.IGNORECASE):
        found_paths.add(m.group(1))
    for m in re.finditer(rf'[\'"`]([^\'"`]+?\.{image_exts})[\'"`]', html, re.IGNORECASE):
        found_paths.add(m.group(1))

    for ref in found_paths:
        if ref.startswith("data:") or ref.startswith("http"):
            continue
        img_path = DIST / ref.lstrip("/")
        if not img_path.exists():
            print(f"  ⚠ image not found: {ref}")
            continue
        ext = img_path.suffix.lower().lstrip(".")
        mime = {"jpg": "jpeg", "jpeg": "jpeg", "png": "png", "webp": "webp", "gif": "gif", "svg": "svg+xml"}.get(ext, ext)
        b64 = base64.b64encode(img_path.read_bytes()).decode()
        data_url = f"data:image/{mime};base64,{b64}"
        replaced = False
        for q in ["'", '"', '`']:
            if f"{q}{ref}{q}" in html:
                html = html.replace(f"{q}{ref}{q}", f"{q}{data_url}{q}")
                replaced = True
        if not replaced and f"url({ref})" in html:
            html = html.replace(f"url({ref})", f"url({data_url})")
            replaced = True
        if not replaced:
            for q in ["'", '"']:
                if f"url({q}{ref}{q})" in html:
                    html = html.replace(f"url({q}{ref}{q})", f"url({q}{data_url}{q})")
                    replaced = True
        if replaced:
            print(f"  inlined image: {ref} ({len(b64)} b64 chars)")
        else:
            print(f"  ⚠ could not replace ref: {ref}")

    return html

def main():
    if not (DIST / "index.html").exists():
        print("ERROR: dist/index.html not found. Run `npm run build` first.")
        return
    html = (DIST / "index.html").read_text(encoding="utf-8")
    print(f"original index.html: {len(html)} bytes")

    # Template replacement
    vals = read_config_values()
    if vals:
        html = replace_templates(html, vals)
        # 同时更新 dist/index.html，让 vite preview 也显示正确标题
        (DIST / "index.html").write_text(html, encoding="utf-8")
        print("  updated dist/index.html with template values")

    # Inline assets
    html = inline_file(html)

    OUTPUT.write_text(html, encoding="utf-8")
    print(f"\n[OK] wrote {OUTPUT} ({len(html)} bytes)")

if __name__ == "__main__":
    main()
