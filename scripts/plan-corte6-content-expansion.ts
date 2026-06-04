import { execSync } from 'node:child_process';

type OutputFormat = 'json' | 'summary' | 'paths' | 'commands';

interface GitChange {
  status: string;
  file: string;
}

const expansionPrefixes = [
  'incubator/content-expansion/doencas/expansao-800/',
  'incubator/content-expansion/medicamentos/expansao-1000/',
];

const documentationPaths = [
  'docs/CONTENT_EXPANSION_AUDIT_2026-06-03.md',
  'docs/CORTE6_CONTENT_EXPANSION_QUARANTINE_2026-06-03.md',
  'scripts/audit-content-expansions.ts',
  'scripts/plan-corte6-content-expansion.ts',
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

function isExpansion(file: string): boolean {
  return expansionPrefixes.some((prefix) => file.startsWith(prefix));
}

function shellQuote(path: string): string {
  return `'${path.replaceAll("'", "'\\''")}'`;
}

const format = parseArgs(process.argv.slice(2));
const changes = parseStatus(run('git status --porcelain -uall'));
const changedExpansionPaths = changes.map((change) => change.file).filter(isExpansion).sort();
const documentationCandidates = changes
  .map((change) => change.file)
  .filter((file) => documentationPaths.includes(file))
  .sort();
const staged = run('git diff --cached --name-only');

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    changedExpansionPaths: changedExpansionPaths.length,
    documentationCandidates: documentationCandidates.length,
    stageableClinicalDataPaths: 0,
    indexAlreadyStaged: staged ? staged.split('\n').filter(Boolean).length : 0,
  },
  changedExpansionPaths,
  documentationCandidates,
  stageableClinicalDataPaths: [] as string[],
  safeToPromoteToMainIndexes: false,
  safeToStageQuarantineDocs: documentationCandidates.length > 0,
  rationale: [
    'The expansion data has duplicate ids and overlaps with the consolidated clinical indexes.',
    'Disease expansion still has required-field gaps.',
    'Medication expansion currently has no detectable per-item citations.',
  ],
};

if (format === 'json') {
  console.log(JSON.stringify(report, null, 2));
} else if (format === 'summary') {
  console.log(`changed expansion paths: ${report.summary.changedExpansionPaths}`);
  console.log(`documentation candidates: ${report.summary.documentationCandidates}`);
  console.log(`stageable clinical data paths: ${report.summary.stageableClinicalDataPaths}`);
  console.log(`index already staged: ${report.summary.indexAlreadyStaged}`);
  console.log(`safe to promote to main indexes: ${report.safeToPromoteToMainIndexes}`);
  console.log(`safe to stage quarantine docs: ${report.safeToStageQuarantineDocs}`);
} else if (format === 'paths') {
  console.log(documentationCandidates.join('\n'));
} else {
  console.log(`git add -- ${documentationCandidates.map(shellQuote).join(' ')}`);
}
