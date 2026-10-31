#!/usr/bin/env python3
"""Check bundled paths, skill metadata, privacy patterns and recorded file hashes."""
from pathlib import Path
import re
import json
import hashlib
import sys
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED = {'.git', 'node_modules', '__pycache__', 'dist', 'output'}

def files():
    return sorted(p for p in ROOT.rglob('*') if p.is_file() and not any(x in EXCLUDED for x in p.relative_to(ROOT).parts))

def main():
    errors = []
    paths = files()
    patterns = [re.compile(r'/(?:Users|home)/[^/\s]+/'), re.compile(r'gh[pousr]_[A-Za-z0-9]{20,}'),
                re.compile(r'-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----'),
                re.compile(r'\bsk-[A-Za-z0-9]{24,}'), re.compile(r'\bAKIA[0-9A-Z]{16}\b')]
    for p in paths:
        rel = str(p.relative_to(ROOT))
        if p.suffix.lower() in {'.png','.jpg','.jpeg','.zip'}:
            errors.append(f'Unexpected binary in source: {rel}')
            continue
        try:
            s = p.read_text()
        except UnicodeDecodeError:
            errors.append(f'Unexpected non-text file: {rel}')
            continue
        if any(pattern.search(s) for pattern in patterns):
            errors.append(f'Possible private path or credential in {rel}; inspect locally (value withheld)')
        if p.name == 'SKILL.md':
            m = re.match(r'^---\n(.*?)\n---', s, re.S)
            if not m:
                errors.append(f'Missing frontmatter: {rel}')
            else:
                name = re.search(r'^name:\s*([a-z0-9-]+)\s*$',m[1],re.M)
                if not name or name[1] != p.parent.name:
                    errors.append(f'Skill name mismatch: {rel}')
                if not re.search(r'^description:\s*\S', m[1], re.M):
                    errors.append(f'Missing skill description: {rel}')
        if p.suffix == '.md':
            # Code examples contain placeholders; links outside fences must resolve.
            prose = re.sub(r'```.*?```', '', s, flags=re.S)
            for dest in re.findall(r'\]\(([^)]+)\)', prose):
                dest = dest.strip().strip('<>').split('#',1)[0]
                if not dest or re.match(r'^[a-zA-Z]+:',dest):
                    continue
                target = (p.parent / unquote(dest)).resolve()
                if not target.exists():
                    errors.append(f'Broken local link in {rel}: {dest}')
    inventory = json.loads((ROOT / 'manifest.json').read_text())
    for row in inventory['stages']:
        if not (ROOT/'skills'/row['skill']/'SKILL.md').exists():
            errors.append(f'Missing stage skill: {row["skill"]}')
    for advisor in inventory['advisors']:
        if not (ROOT/'skills'/advisor/'SKILL.md').exists():
            errors.append(f'Missing advisor: {advisor}')
    sums = ROOT / 'checksums.json'
    if not sums.exists():
        errors.append('Missing checksums.json')
    else:
        recorded = json.loads(sums.read_text())
        actual = {str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in paths if p != sums}
        if recorded != actual:
            errors.append('File checksums differ; regenerate checksums.json after reviewing changes')
    if errors:
        for err in errors:
            print('FAIL:', err)
        return 1
    print(f'PASS: {len(paths)} source files, {len(list((ROOT/"skills").glob("*/SKILL.md")))} skills, '
          f'{len(inventory["stages"])} steps, {len(inventory["advisors"])} advisors; links, privacy patterns and hashes checked.')
    print('Pattern checks are bounded checks, not a guarantee of absence of private information.')
    return 0

if __name__ == '__main__':
    sys.exit(main())
