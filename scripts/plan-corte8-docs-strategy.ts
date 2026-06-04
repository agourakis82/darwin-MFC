import { execSync } from 'node:child_process';

type OutputFormat = 'json' | 'summary' | 'paths' | 'commands';

interface GitChange {
  status: string;
  file: string;
}

const strategyDocPaths = [
  'incubator/education-sota/docs/strategy/CONTENT-CREATION-STRATEGY-SOTA.md',
  'incubator/education-sota/docs/strategy/EXECUTIVE-STRATEGY-SUMMARY.md',
  'incubator/education-sota/docs/strategy/MEDICAL-EDUCATION-SOTA-SYSTEM.md',
  'incubator/education-sota/docs/strategy/ONTOLOGIAS-QUESTOES-MEDICAS.md',
  'docs/OVER_SOTA_MEDICAL_LOCALIZATION.md',
  'incubator/education-sota/docs/strategy/SIMPLE-CONTENT-STRATEGY.md',
  'incubator/education-sota/docs/strategy/SIMPLIFIED-CONTENT-STRATEGY.md',
  'incubator/education-sota/docs/strategy/SISTEMA-QUESTOES-MEDICAS-PROTOTIPO.md',
  'incubator/education-sota/docs/strategy/SOTA-CALCULATORS-IMPLEMENTATION-SUMMARY.md',
  'incubator/education-sota/docs/strategy/SOTA-MEDICAL-CALCULATORS-PLAN-2025.md',
  'incubator/education-sota/docs/strategy/SOTA-MEDICAL-CALCULATORS-PLAN.md',
  'incubator/education-sota/docs/strategy/UIUX-SOTA-ANALYSIS.md',
  'incubator/education-sota/docs/strategy/UIUX-SOTA-METRICS.md',
  'incubator/education-sota/lib/design-system/UIUX-INNOVATION-GOALS.md',
];

const documentationPaths = [
  'docs/DOCS_STRATEGY_AUDIT_2026-06-03.md',
  'docs/CORTE8_DOCS_STRATEGY_QUARANTINE_2026-06-03.md',
  'package.json',
  'scripts/audit-docs-strategy.ts',
  'scripts/plan-corte8-docs-strategy.ts',
];

const quarantinePrefixes = [
  'incubator/education-sota/docs/strategy/',
  'incubator/education-sota/lib/design-system/',
  'incubator/education-sota/lib/calculators/',
];

function run(command: string): string {
  return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trimEnd();
}

function parseArgs(args: string[]): OutputFormat {
  const formatArg = args.find((arg) => arg.startsWith('--format='));
  if (!formatArg) return 'json';

  const format = formatArg.slice('--format='.length);
  if (format === 'json' || format === 'summary' || format === 'paths' || format === 'commands') {
    return format;
  }

  throw new Error(`Unsupported format: ${format}`);
}

function parseStatus(output: string): GitChange[] {
  if (!output.trim()) return [];

  return output.split('\n').map((line) => {
    const status = line.slice(0, 2);
    const rawFile = line.slice(3);
    const file = rawFile.includes(' -> ') ? rawFile.split(' -> ').at(-1)! : rawFile;
    return { status, file };
  });
}

function shellQuote(path: string): string {
  return `'${path.replaceAll("'", "'\\''")}'`;
}

const format = parseArgs(process.argv.slice(2));
const changes = parseStatus(run('git status --porcelain -uall'));
const changedPaths = changes.map((change) => change.file);
const changedStrategyDocs = changedPaths.filter((file) => strategyDocPaths.includes(file)).sort();
const documentationCandidates = changedPaths
  .filter((file) => documentationPaths.includes(file))
  .sort();
const quarantineCandidates = changedPaths
  .filter((file) => quarantinePrefixes.some((prefix) => file.startsWith(prefix)))
  .sort();
const staged = run('git diff --cached --name-only');

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    changedStrategyDocs: changedStrategyDocs.length,
    documentationCandidates: documentationCandidates.length,
    quarantineCandidates: quarantineCandidates.length,
    stageablePrimaryProductDocs: 0,
    indexAlreadyStaged: staged ? staged.split('\n').filter(Boolean).length : 0,
  },
  changedStrategyDocs,
  documentationCandidates,
  quarantineCandidates,
  stageablePrimaryProductDocs: [] as string[],
  safeToPromoteToPrimaryClinicalDocs: false,
  safeToStageQuarantineDocs: documentationCandidates.length > 0,
  rationale: [
    'Legacy strategy docs contain education/SOTA and marketing claims that conflict with the current clinical app framing.',
    'Calculator docs using 2025/SOTA language have been superseded by the Clinical Intelligence 2026 audit.',
    'These docs need rewrite or archival before becoming primary product documentation.',
  ],
};

if (format === 'json') {
  console.log(JSON.stringify(report, null, 2));
} else if (format === 'summary') {
  console.log(`changed strategy docs: ${report.summary.changedStrategyDocs}`);
  console.log(`documentation candidates: ${report.summary.documentationCandidates}`);
  console.log(`quarantine candidates: ${report.summary.quarantineCandidates}`);
  console.log(`stageable primary product docs: ${report.summary.stageablePrimaryProductDocs}`);
  console.log(`index already staged: ${report.summary.indexAlreadyStaged}`);
  console.log(`safe to promote to primary clinical docs: ${report.safeToPromoteToPrimaryClinicalDocs}`);
  console.log(`safe to stage quarantine docs: ${report.safeToStageQuarantineDocs}`);
} else if (format === 'paths') {
  console.log(documentationCandidates.join('\n'));
} else {
  console.log(`git add -- ${documentationCandidates.map(shellQuote).join(' ')}`);
}
