#!/usr/bin/env python3
"""Sessionize sessions export (.xlsx, accepted or all) -> app/_data/sessions.json
and public/images/speakers/<slug>.jpg.

    scripts/sessions.py "~/Downloads/nidc-2026 accepted sessions - exported 2026-09-03.xlsx"

Only the public fields come out. Emails and the CFP questionnaire (travel,
training, sponsor talk...) stay in the spreadsheet. Room and start time are
carried through once Sessionize has them, so the timetable can pick them up.
Photos already on disk are kept, so a hand-replaced one survives a re-run.
"""
import json
import re
import subprocess
import sys
import urllib.request
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "app/_data/sessions.json"
PICS = ROOT / "public/images/speakers"
PIC_PX = 200  # drawn at 56px; 200 covers 3x screens


def sheet(z, name, strings):
    """Rows as {header: value}. Empty cells are absent from the XML, so cells
    are keyed by column letter and matched to the header row that way."""
    rows = []
    for r in ET.fromstring(z.read(name)).iter(NS + "row"):
        cells = {}
        for c in r.findall(NS + "c"):
            v = c.find(NS + "v")
            val = "" if v is None else strings[int(v.text)] if c.get("t") == "s" else v.text
            col = re.match(r"[A-Z]+", c.get("r")).group()
            # _x000D_ is Excel's escape for the \r of a Windows line ending
            cells[col] = val.replace("_x000D_", "").strip()
        rows.append(cells)
    head, body = rows[0], rows[1:]
    return [{head[k]: v for k, v in r.items() if k in head} for r in body]


# ponytail: a line ending mid-sentence was wrapped by hand, so it rejoins its
# paragraph; a line ending in punctuation, or one starting a list item, keeps
# its break. Real Markdown would need a renderer.
def unwrap(text):
    return re.sub(r"(?<=[^\n.!?:])\n(?![\n\-*•\d])", " ", text)


# Which chip on the site a session sits under, guessed from its Sessionize
# categories for a new session. A chip already in sessions.json wins, so a
# hand edit there survives a re-run.
CHIPS = [
    ("Security", "Security"),
    ("GenAI", "AI"),
    ("UI/UX", "Design"),
    ("Product", "Product"),
    ("Data", "Data"),
    ("Non-Technical", "Career"),
    ("Coding", "Engineering"),
    ("DevOps", "Engineering"),
    ("Cloud", "Engineering"),
    ("Web", "Engineering"),
    ("Tools", "Engineering"),
    ("Testing", "Engineering"),
    ("Frameworks", "Engineering"),
    ("Hardware/IoT", "Engineering"),
    ("Open Source", "Engineering"),
    ("Quantum", "Engineering"),
]


def chip(topics):
    return next((c for t, c in CHIPS if t in topics), "Wildcard")


def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def photo(url, name):
    dest = PICS / f"{slug(name)}.jpg"
    if dest.exists():
        return dest.name
    raw, _ = urllib.request.urlretrieve(url)
    # macOS only. Elsewhere, drop the resize: the originals are 400x400.
    subprocess.run(
        ["sips", "-Z", str(PIC_PX), "-s", "format", "jpeg", "-s", "formatOptions", "normal", raw, "--out", dest],
        check=True, capture_output=True,
    )
    return dest.name


# Accepted in Sessionize but not running. Skipped here so a re-run stays clean.
DROPPED = {
    "1291183",  # The Fun Side of Advanced TypeScript
}


def main(xlsx):
    z = zipfile.ZipFile(xlsx)
    strings = [
        "".join(t.text or "" for t in si.iter(NS + "t"))
        for si in ET.fromstring(z.read("xl/sharedStrings.xml"))
    ]
    sessions = [
        s for s in sheet(z, "xl/worksheets/sheet1.xml", strings)
        if s["Status"] == "Accepted" and s["Session Id"] not in DROPPED
    ]
    wanted = {i.strip() for s in sessions for i in s["Speaker Ids"].split(",")}
    speakers = sheet(z, "xl/worksheets/sheet2.xml", strings)

    kept = {s["id"]: s.get("chip") for s in json.loads(OUT.read_text())} if OUT.exists() else {}
    PICS.mkdir(parents=True, exist_ok=True)
    people = {}
    for p in speakers:
        if p["Speaker Id"] not in wanted:
            continue
        name = f"{p['FirstName']} {p['LastName']}"
        people[p["Speaker Id"]] = {
            "name": name,
            "tagline": p["TagLine"],
            "bio": unwrap(p["Bio"]),
            "photo": photo(p["Profile Picture"], name),
        }

    out = []
    for s in sessions:
        kind, mins = re.match(r"(\w+).*?(\d+)", s["Session format"]).groups()
        topics = [t.strip() for t in s["How would you categorise your talk?"].split(",")]
        item = {
            "id": s["Session Id"],
            "title": s["Title"],
            "description": unwrap(s["Description"]),
            "format": "Talk" if kind == "Standard" else kind,
            "minutes": int(mins),
            "level": s["Session level"].split(" /")[0],
            "topics": topics,
            "chip": kept.get(s["Session Id"]) or chip(topics),
            "speakers": [people[i.strip()] for i in s["Speaker Ids"].split(",")],
        }
        if s.get("Room"):
            item["room"] = s["Room"]
        if s.get("Scheduled At"):
            item["start"] = s["Scheduled At"]
        out.append(item)
    out.sort(key=lambda s: s["title"].lower())

    OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n")
    print(f"{len(out)} sessions, {len(people)} speakers -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main(Path(sys.argv[1]).expanduser())
