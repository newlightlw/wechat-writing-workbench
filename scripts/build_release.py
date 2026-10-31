#!/usr/bin/env python3
"""Validate and package only the reviewed, checksum-listed source files."""
from pathlib import Path
import hashlib
import json
import subprocess
import sys
import zipfile

root = Path(__file__).resolve().parents[1]
subprocess.run([sys.executable, str(root/'scripts/validate.py')], check=True)
version = (root/'VERSION').read_text().strip()
name = f'wechat-writing-workbench-{version}'
out = root/'dist'
out.mkdir(exist_ok=True)
archive = out / f'{name}.zip'
listed = json.loads((root/'checksums.json').read_text())
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as z:
    for rel in sorted([*listed, 'checksums.json']):
        z.write(root/rel, f'{name}/{rel}')
digest = hashlib.sha256(archive.read_bytes()).hexdigest()
(out/f'{name}.sha256').write_text(f'{digest}  {archive.name}\n')
print(f'Built {archive.name}: {len(listed)+1} files; SHA-256 {digest}')
