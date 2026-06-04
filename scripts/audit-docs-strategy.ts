import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

type OutputFormat = 'json' | 'summary';

interface ClaimHit {
  file: string;
  line: number;
  text: string;
  pattern: string;
}

const root = process.cwd();

const strategyDocPredicates = [
  (file: string) => file.startsWith('docs/') &&
    /SOTA|STRATEGY|QUESTOES|UIUX|OVER/i.test(file) &&
    !/AUDIT|CORTE/i.test(file),
  (file: string) => file.startsWith('incubator/education-sota/docs/strategy/'),
  (file: string) => file === 'lib/design-system/UIUX-INNOVATION-GOALS.md',
  (file: string) => file === 'incubator/education-sota/lib/design-system/UIUX-INNOVATION-GOALS.md',
];

const claimPatterns = [
  /state-of-the-art/i,
  /\bSOTA\b/,
  /OVER SOTA/i,
  /revolucion/i,
  /mais avancad[ao]/i,
  /mais avançad[ao]/i,
  /lider mundial/i,
  /líder mundial/i,
  /futuro da educa/i,
  /GPT-?4/i,
  /GPT-?5/i,
  /Claude-?4/i,
  /blockchain/i,
  /VR\/AR/i,
  /\bVR\b/i,
  /\bAR\b/i,
  /federated learning/i,
  /aprendizado federado/i,
  /LGPD\/GDPR/i,
  /conformidade.*total/i,
  /valida[cç][aã]o m[eé]dica autom[aá]tica/i,
  /R\$ ?\d/i,
  /ARR/i,
];

function run(command: string): string {
  return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trimEnd();
}

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

function listMarkdownFiles(directory: string): string[] {
  const absolute = path.join(root, directory);
  if (!fs.existsSync(absolute)) return [];

  return fs
    .readdirSync(absolute, { withFileTypes: true })
    .flatMap((entry) => {
      const child = normalize(path.join(directory, entry.name));
      if (entry.isDirectory()) return listMarkdownFiles(child);
      return child.endsWith('.md') ? [child] : [];
    })
    .sort();
}

function changedFiles(): string[] {
  const status = run('git status --porcelain -uall');
  if (!status.trim()) return [];

  return status
    .split('\n')
    .map((line) => line.slice(3))
    .map((file) => (file.includes(' -> ') ? file.split(' -> ').at(-1)! : file))
    .map(normalize)
    .filter((file) => strategyDocPredicates.some((predicate) => predicate(file)))
    .sort();
}

function collectClaimHits(files: string[]): ClaimHit[] {
  return files.flatMap((file) => {
    const absolute = path.join(root, file);
    if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) return [];

    return fs
      .readFileSync(absolute, 'utf8')
      .split('\n')
      .flatMap((line, index) =>
        claimPatterns
          .filter((pattern) => pattern.test(line))
          .map((pattern) => ({
            file,
            line: index + 1,
            text: line.trim().slice(0, 220),
            pattern: pattern.source,
          }))
      );
  });
}

const format = parseArgs(process.argv.slice(2));
const allStrategyDocs = [
  ...new Set([
    ...listMarkdownFiles('docs'),
    ...listMarkdownFiles('incubator/education-sota/docs/strategy'),
    'lib/design-system/UIUX-INNOVATION-GOALS.md',
    'incubator/education-sota/lib/design-system/UIUX-INNOVATION-GOALS.md',
  ].filter((file) => strategyDocPredicates.some((predicate) => predicate(file)))),
].sort();
const changedStrategyDocs = changedFiles();
const claimHits = collectClaimHits(allStrategyDocs);
const changedClaimHits = collectClaimHits(changedStrategyDocs);

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    strategyDocs: allStrategyDocs.length,
    changedStrategyDocs: changedStrategyDocs.length,
    claimHits: claimHits.length,
    changedClaimHits: changedClaimHits.length,
    stageablePrimaryProductDocs: 0,
  },
  allStrategyDocs,
  changedStrategyDocs,
  claims: claimHits.slice(0, 120),
  changedClaims: changedClaimHits.slice(0, 120),
  recommendation: {
    stagingCut: 'Corte 8 - Docs Strategy Quarantine',
    promoteToPrimaryClinicalDocs: false,
    rationale: [
      'Several strategy docs are education/SOTA or marketing-roadmap documents, not current clinical product docs.',
      'They contain unvalidated claims about 2025, SOTA, VR/AR, blockchain, LLMs, revenue, and world-leading positioning.',
      'The current product frame is Darwin-MFC as a clinical medical app, with Clinical Intelligence 2026 separated from education incubator docs.',
    ],
  },
};

if (format === 'summary') {
  console.log(`strategy docs: ${report.summary.strategyDocs}`);
  console.log(`changed strategy docs: ${report.summary.changedStrategyDocs}`);
  console.log(`claim hits: ${report.summary.claimHits}`);
  console.log(`changed claim hits: ${report.summary.changedClaimHits}`);
  console.log(`stageable primary product docs: ${report.summary.stageablePrimaryProductDocs}`);
  console.log(`promote to primary clinical docs: ${report.recommendation.promoteToPrimaryClinicalDocs}`);
} else {
  console.log(JSON.stringify(report, null, 2));
}
