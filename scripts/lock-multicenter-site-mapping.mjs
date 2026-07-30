import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lockSiteMapping } from './lib/multicenter-site-mapping.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const valueAfter = flag => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : null;
};
const inputArgument = valueAfter('--input');
const outputArgument = valueAfter('--output');
const lockedAt = valueAfter('--locked-at') || new Date().toISOString().slice(0, 10);
const synthetic = args.includes('--synthetic');

if (!inputArgument || !outputArgument) {
  throw new Error('Usage: --input <draft.json> --output <locked.json> [--locked-at YYYY-MM-DD] [--synthetic]');
}

const inputPath = resolve(inputArgument);
const outputPath = resolve(outputArgument);
const outputRelativeToRoot = relative(root, outputPath);
const outputInsideRepository = !outputRelativeToRoot.startsWith('..') && outputRelativeToRoot !== '';
if (outputInsideRepository && !synthetic) {
  throw new Error('Real locked site mappings must remain outside the repository. Use an external output path.');
}

const evidence = JSON.parse(readFileSync(resolve(root, 'clinical/sounio/evidence-bundle.json'), 'utf8'));
const mapping = JSON.parse(readFileSync(inputPath, 'utf8'));
if (synthetic) mapping.siteKind = 'synthetic-fixture';
const locked = lockSiteMapping(mapping, {
  lockedAt,
  allowSynthetic: synthetic,
  featureIds: evidence.features.map(feature => feature.id),
});

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(locked, null, 2)}\n`, { flag: 'wx' });
console.log(JSON.stringify({
  schemaVersion: locked.schemaVersion,
  siteCode: locked.siteCode,
  siteHash: locked.siteHash,
  mappingSha256: locked.approval.mappingSha256,
  lockedAt: locked.approval.lockedAt,
  reviewDueAt: locked.approval.reviewDueAt,
  outputPath,
}, null, 2));
console.log('MULTICENTER_SITE_MAPPING_LOCKED');
