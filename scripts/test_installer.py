#!/usr/bin/env python3
"""Exercise dry-run and no-overwrite behavior in an isolated destination."""
from pathlib import Path
import subprocess
import sys
import tempfile
root = Path(__file__).resolve().parents[1]
with tempfile.TemporaryDirectory() as t:
    dest = Path(t)/'skills'
    cmd = [sys.executable,str(root/'scripts/install_skills.py'),'--target','codex','--dest',str(dest)]
    subprocess.run(cmd+['--dry-run'],check=True,stdout=subprocess.DEVNULL)
    assert not dest.exists(), 'dry-run changed filesystem'
    subprocess.run(cmd,check=True,stdout=subprocess.DEVNULL)
    assert len(list(dest.glob('*/SKILL.md'))) == len(list((root/'skills').glob('*/SKILL.md')))
    sentinel=dest/'think-tank/SKILL.md'
    sentinel.write_text('user edited content')
    subprocess.run(cmd,check=True,stdout=subprocess.DEVNULL)
    assert sentinel.read_text() == 'user edited content', 'existing user file was overwritten'
print('PASS: installer dry-run, full bundle copy, existing-file preservation')
