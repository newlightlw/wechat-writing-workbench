#!/usr/bin/env python3
"""Install this bundle into a selected host without overwriting existing skills."""
import argparse
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--target', choices=['codex', 'claude'], required=True)
    parser.add_argument('--dest', type=Path, help='Override destination (useful for an isolated trial)')
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()
    dest = args.dest or Path.home() / ('.codex' if args.target == 'codex' else '.claude') / 'skills'
    skipped = 0
    for skill in sorted((ROOT / 'skills').iterdir()):
        if not (skill / 'SKILL.md').is_file():
            continue
        target = dest / skill.name
        if target.exists() or target.is_symlink():
            print(f'SKIP existing: {skill.name}')
            skipped += 1
            continue
        if not args.dry_run:
            dest.mkdir(parents=True, exist_ok=True)
            shutil.copytree(skill, target)
        print(f'{"PLAN" if args.dry_run else "INSTALLED"}: {skill.name}')
    if skipped:
        print(f'{skipped} existing directories were left untouched. Check versions before using mixed bundles.')
    print('Start a new host session and check skill discovery; this command does not change host settings.')

if __name__ == '__main__':
    main()
