#!/usr/bin/env python3
"""Record source checksums after reviewing changes."""
from validate import ROOT, files
import hashlib
import json
p = ROOT / 'checksums.json'
sums = {str(f.relative_to(ROOT)):hashlib.sha256(f.read_bytes()).hexdigest() for f in files() if f != p}
p.write_text(json.dumps(sums, ensure_ascii=False, indent=2) + '\n')
print(f'Recorded {len(sums)} file checksums')
