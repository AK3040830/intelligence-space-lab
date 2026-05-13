#!/usr/bin/env python3
"""Build level-00–04 practice package zips (stdlib only)."""

import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

PACKAGES = [
    (
        ROOT / "levels/00-first-click/practice/starter",
        "level-00-first-click-starter",
        ROOT / "levels/00-first-click/practice/package.zip",
    ),
    (
        ROOT / "levels/01-python-cli/practice/starter",
        "level-01-python-cli-starter",
        ROOT / "levels/01-python-cli/practice/package.zip",
    ),
    (
        ROOT / "levels/02-editor-and-files/practice/starter",
        "level-02-editor-and-files-starter",
        ROOT / "levels/02-editor-and-files/practice/package.zip",
    ),
    (
        ROOT / "levels/03-html-css-js/practice/starter",
        "level-03-html-css-js-starter",
        ROOT / "levels/03-html-css-js/practice/package.zip",
    ),
    (
        ROOT / "levels/04-python-basics/practice/starter",
        "level-04-python-basics-starter",
        ROOT / "levels/04-python-basics/practice/package.zip",
    ),
]


def zip_starter(source: Path, arc_prefix: str, out_zip: Path) -> None:
    if not source.is_dir():
        raise SystemExit(f"Missing source directory: {source}")
    out_zip.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(out_zip, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for path in source.rglob("*"):
            if path.is_file():
                rel = path.relative_to(source)
                arcname = f"{arc_prefix}/{rel.as_posix()}"
                zf.write(path, arcname)
    size = out_zip.stat().st_size
    print(f"OK: {out_zip} ({size} bytes)")


def main() -> None:
    for source, prefix, out in PACKAGES:
        zip_starter(source, prefix, out)
    print("Done: built practice package(s).")


if __name__ == "__main__":
    main()
