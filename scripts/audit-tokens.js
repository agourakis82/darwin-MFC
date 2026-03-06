#!/usr/bin/env node
/**
 * Token Audit (Top Tier Gate)
 * ==========================
 *
 * Fails if forbidden Tailwind palette classes are found in directories that should
 * be semantically token-driven. This avoids silent theme drift.
 */

const fs = require('node:fs');
const path = require('node:path');
const glob = require('glob');

const TARGET_GLOBS = [
  'app/components/Community/**/*.{ts,tsx,css}',
  // literal "[locale]" in path
  'app/\\[locale\\]/community/**/*.{ts,tsx,css}',
  'lib/design-system/primitives/**/*.{ts,tsx,css}',
  'lib/design-system/components/navigation/**/*.{ts,tsx,css}',
];

const IGNORE_GLOBS = [
  '**/*.d.ts',
  '**/*.stories.*',
  '**/*.test.*',
  '**/*.spec.*',
  '**/*.map',
];

const FORBIDDEN = [
  'gray',
  'slate',
  'zinc',
  'neutral',
  'stone',
  'blue',
  'green',
  'red',
  'purple',
  'amber',
  'yellow',
  'orange',
  'cyan',
  'teal',
  'emerald',
  'lime',
  'indigo',
  'violet',
  'fuchsia',
  'pink',
  'sky',
  'rose',
];

const forbiddenRe = new RegExp(
  String.raw`\b(?:bg|text|border|ring|from|via|to|fill|stroke)-(?:${FORBIDDEN.join('|')})-(?:\\d{1,3})\b`,
  'g',
);

/**
 * @typedef {{file:string,line:number,match:string}} Violation
 */

function auditFile(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const lines = raw.split(/\r?\n/);
  const out = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    forbiddenRe.lastIndex = 0;
    let m;
    while ((m = forbiddenRe.exec(line)) !== null) {
      out.push({ file, line: i + 1, match: m[0] });
    }
  }

  return out;
}

async function main() {
  const files = glob.sync(TARGET_GLOBS, {
    nodir: true,
    ignore: IGNORE_GLOBS,
  });

  const violations = [];

  for (const file of files) {
    violations.push(...auditFile(file));
  }

  if (violations.length === 0) {
    console.log(`Token audit: OK (${files.length} files)`);
    return;
  }

  const byFile = new Map();
  for (const v of violations) {
    const rel = path.relative(process.cwd(), v.file);
    if (!byFile.has(rel)) byFile.set(rel, []);
    byFile.get(rel).push(v);
  }

  console.error(`Token audit: FAILED (${violations.length} violations)`);
  for (const [file, list] of byFile.entries()) {
    console.error(`\n${file}`);
    for (const v of list.slice(0, 40)) {
      console.error(`  ${v.line}: ${v.match}`);
    }
    if (list.length > 40) {
      console.error(`  … and ${list.length - 40} more`);
    }
  }

  process.exit(1);
}

main().catch((err) => {
  console.error('Token audit: ERROR');
  console.error(err);
  process.exit(1);
});
