import fs from 'node:fs';
import path from 'node:path';

type OutputFormat = 'json' | 'summary';

interface ClaimHit {
  file: string;
  line: number;
  text: string;
  pattern: string;
  exposure: 'visible' | 'internal';
}

const root = process.cwd();

const scanRoots = ['app', 'messages', 'lib'];
const allowedExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.css']);
const excludedPrefixes = [
  'incubator/',
  'docs/',
  'scripts/',
  'lib/calculators/',
  'lib/data/ecg/',
  'lib/emergency/',
  'lib/data/regions/',
];

const claimPatterns = [
  /\bSOTA\b/i,
  /state-of-the-art/i,
  /state of the art/i,
  /\bLMS\b/i,
  /educa[cç][aã]o m[eé]dica/i,
  /medical education/i,
  /learn\/diagnosis/i,
  /demo-darwin-token/i,
  /revolucion/i,
  /mais avan[cç]ad[ao] do mundo/i,
  /world[- ]?leading/i,
];

function parseArgs(args: string[]): OutputFormat {
  const formatArg = args.find((arg) => arg.startsWith('--format='));
  if (!formatArg) return 'json';

  const format = formatArg.slice('--format='.length);
  if (format === 'json' || format === 'summary') return format;
  throw new Error(`Unsupported format: ${format}`);
}

function normalize(file: string): string {
  return file.split(path.sep).join('/');
}

function shouldScan(file: string): boolean {
  const normalized = normalize(file);
  if (excludedPrefixes.some((prefix) => normalized.startsWith(prefix))) return false;
  return allowedExtensions.has(path.extname(normalized));
}

function walk(directory: string): string[] {
  const absolute = path.join(root, directory);
  if (!fs.existsSync(absolute)) return [];

  return fs
    .readdirSync(absolute, { withFileTypes: true })
    .flatMap((entry) => {
      const child = normalize(path.join(directory, entry.name));
      if (entry.isDirectory()) return walk(child);
      return shouldScan(child) ? [child] : [];
    });
}

function isCommentLike(line: string): boolean {
  const trimmed = line.trim();
  return (
    trimmed.startsWith('//') ||
    trimmed.startsWith('*') ||
    trimmed.startsWith('/*') ||
    trimmed.startsWith('*/') ||
    trimmed.startsWith('import ') ||
    trimmed.startsWith('export ') ||
    trimmed.startsWith('const ') ||
    trimmed.startsWith('type ') ||
    trimmed.startsWith('interface ')
  );
}

function exposureFor(file: string, line: string): ClaimHit['exposure'] {
  if (file.startsWith('messages/')) return 'visible';
  if (file.startsWith('app/') && !isCommentLike(line)) return 'visible';
  return 'internal';
}

function collectClaimHits(files: string[]): ClaimHit[] {
  return files.flatMap((file) => {
    const absolute = path.join(root, file);
    const source = fs.readFileSync(absolute, 'utf8');

    return source.split('\n').flatMap((line, index) =>
      claimPatterns
        .filter((pattern) => pattern.test(line))
        .map((pattern) => ({
          file,
          line: index + 1,
          text: line.trim().slice(0, 220),
          pattern: pattern.source,
          exposure: exposureFor(file, line),
        }))
    );
  });
}

function countByPrefix(hits: ClaimHit[]): Record<string, number> {
  const groups: Record<string, number> = {};
  for (const hit of hits) {
    const group = hit.file.split('/').slice(0, 3).join('/');
    groups[group] = (groups[group] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(groups).sort((a, b) => b[1] - a[1]));
}

const format = parseArgs(process.argv.slice(2));
const files = scanRoots.flatMap(walk).sort();
const claims = collectClaimHits(files);
const visibleClaims = claims.filter((hit) => hit.exposure === 'visible');
const internalClaims = claims.filter((hit) => hit.exposure === 'internal');
const appRouterDiagnosisRoutePresent = fs.existsSync(path.join(root, 'app/[locale]/learn/diagnosis'));
const commonMessagesSotaNamespaces = fs
  .readdirSync(path.join(root, 'messages'))
  .filter((locale) => {
    const file = path.join(root, 'messages', locale, 'common.json');
    if (!fs.existsSync(file)) return false;
    return Boolean(JSON.parse(fs.readFileSync(file, 'utf8')).sota);
  });
const primarySurfaceReady =
  visibleClaims.length === 0 &&
  !appRouterDiagnosisRoutePresent &&
  commonMessagesSotaNamespaces.length === 0;

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    scannedFiles: files.length,
    claimHits: claims.length,
    visibleClaimHits: visibleClaims.length,
    internalClaimHits: internalClaims.length,
    appRouterDiagnosisRoutePresent,
    commonMessagesSotaNamespaces,
  },
  visibleClaims,
  internalClaimGroups: countByPrefix(internalClaims),
  internalClaims: internalClaims.slice(0, 120),
  recommendation: {
    primarySurfaceReady,
    remainingInternalWork:
      'Residual internal SOTA/revolutionary wording remains in legacy lib/ai, lib/i18n, design-system, and imported expansion filenames. Treat as a future rename/quarantine pass, not as visible product copy.',
  },
};

if (format === 'summary') {
  console.log(`scanned files: ${report.summary.scannedFiles}`);
  console.log(`claim hits: ${report.summary.claimHits}`);
  console.log(`visible claim hits: ${report.summary.visibleClaimHits}`);
  console.log(`internal claim hits: ${report.summary.internalClaimHits}`);
  console.log(`app router diagnosis route present: ${report.summary.appRouterDiagnosisRoutePresent}`);
  console.log(`common messages sota namespaces: ${report.summary.commonMessagesSotaNamespaces.length}`);
  console.log(`primary surface ready: ${report.recommendation.primarySurfaceReady}`);
} else {
  console.log(JSON.stringify(report, null, 2));
}
