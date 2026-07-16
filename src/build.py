#!/usr/bin/env python3
"""
Build script for the Bruce Greenhalgh site.

Assembles each page in src/pages/*.html (head metadata comments + <main> content)
with the shared partials (src/partials/head.html, header.html, footer.html) into
final, self-contained HTML files in the site root — the same files that get
uploaded to GitHub.

Usage: python build.py
Run this after editing anything in src/partials/ or src/pages/.
"""
import glob
import os
import re

SRC_DIR = os.path.dirname(os.path.abspath(__file__))
SITE_DIR = os.path.dirname(SRC_DIR)

with open(f"{SRC_DIR}/partials/head.html", encoding="utf-8") as f:
    HEAD_TEMPLATE = f.read()
with open(f"{SRC_DIR}/partials/header.html", encoding="utf-8") as f:
    HEADER = f.read()
with open(f"{SRC_DIR}/partials/footer.html", encoding="utf-8") as f:
    FOOTER = f.read()


def build_page(path):
    with open(path, encoding="utf-8") as f:
        content = f.read()

    title_m = re.search(r'<!--\s*title:\s*(.*?)\s*-->', content)
    desc_m = re.search(r'<!--\s*description:\s*(.*?)\s*-->', content)
    title = title_m.group(1) if title_m else os.path.basename(path)
    description_tag = f'<meta name="description" content="{desc_m.group(1)}">\n' if desc_m else ""

    # strip the metadata comment lines, keep the rest (the page body)
    body = re.sub(r'<!--\s*(title|description):.*?-->\n?', '', content).strip()

    head = HEAD_TEMPLATE.replace("{{TITLE}}", title).replace("{{DESCRIPTION}}", description_tag)

    return f"{head}\n{HEADER}\n{body}\n\n{FOOTER}"


def main():
    pages = sorted(glob.glob(f"{SRC_DIR}/pages/*.html"))
    for page_path in pages:
        name = os.path.basename(page_path)
        output = build_page(page_path)
        out_path = f"{SITE_DIR}/{name}"
        with open(out_path, "w", encoding="utf-8", newline="\n") as f:
            f.write(output)
        print(f"built {name}")


if __name__ == "__main__":
    main()
