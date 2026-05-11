#!/usr/bin/env python3
"""Verify static site entry and linked paths exist (stdlib only). Run from repo root."""

from __future__ import annotations

import sys
from pathlib import Path

REQUIRED = [
    "index.html",
    "site/index.html",
    "site/assets/site.css",
    "site/assets/app.js",
    "levels/00-first-click/demo/index.html",
    "levels/00-first-click/practice/starter/START_HERE.html",
    "levels/00-first-click/practice/package.zip",
    "levels/01-python-cli/demo/index.html",
    "levels/01-python-cli/practice/starter/START_HERE.html",
    "levels/01-python-cli/practice/package.zip",
    "levels/02-editor-and-files/demo/index.html",
    "levels/02-editor-and-files/practice/starter/START_HERE.html",
    "levels/02-editor-and-files/practice/package.zip",
    "levels/03-html-css-js/demo/index.html",
    "levels/03-html-css-js/practice/starter/START_HERE.html",
    "levels/03-html-css-js/practice/package.zip",
]


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    missing = [p for p in REQUIRED if not (root / p).is_file()]
    if missing:
        print("Missing files:", file=sys.stderr)
        for p in missing:
            print(f"  - {p}", file=sys.stderr)
        return 1
    print("[OK] site links check passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
