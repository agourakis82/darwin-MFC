import { execSync } from 'node:child_process';

type OutputFormat = 'json' | 'summary' | 'paths' | 'commands';

interface GitChange {
  status: string;
  file: string;
}

const incubatorPrefixes = [
  'app/[locale]/learn/diagnosis/',
  'incubator/education-sota/',
  'app/components/SOTA/',
  'lib/api/sota-',
  'lib/hooks/useSotaWebSocket.ts',
  'lib/medical-education/',
  'lib/medical-education-sota/',
  'lib/store/sotaStore.ts',
  'lib/types/sota.ts',
  'lib/types/medical-residency.ts',
  'medical-education-sota/',
  'scripts/dados-exemplo-questoes',
  'scripts/demo-gerador-questoes',
  'scripts/simple-question-generator',
];

const incubatorPaths = [
  'github-qti-medical-search.png',
  'qti-ims-global-main.png',
  'lib/simple-question-system.ts',
  'public/demo-data.json',
  'public/demo-questoes-medicas.html',
];

const documentationPaths = [
  'docs/CORTE5_EDUCATION_INCUBATOR_QUARANTINE_2026-06-03.md',
  'docs/EDUCATION_INCUBATOR_AUDIT_2026-06-03.md',
  'package.json',
  'scripts/audit-education-incubator.ts',
  'scripts/plan-corte5-education-incubator.ts',
];

const quarantinePrefixes = [
  'incubator/education-sota/',
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

function isIncubator(file: string): boolean {
  return incubatorPaths.includes(file) ||
    incubatorPrefixes.some((prefix) => file.startsWith(prefix));
}

function shellQuote(path: string): string {
  return `'${path.replaceAll("'", "'\\''")}'`;
}

const format = parseArgs(process.argv.slice(2));
const changes = parseStatus(run('git status --porcelain -uall'));
const changedIncubatorPaths = changes.map((change) => change.file).filter(isIncubator).sort();
const documentationCandidates = changes
  .map((change) => change.file)
  .filter((file) => documentationPaths.includes(file))
  .sort();
const quarantineCandidates = changes
  .map((change) => change.file)
  .filter((file) => quarantinePrefixes.some((prefix) => file.startsWith(prefix)))
  .sort();
const staged = run('git diff --cached --name-only');

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    changedIncubatorPaths: changedIncubatorPaths.length,
    documentationCandidates: documentationCandidates.length,
    quarantineCandidates: quarantineCandidates.length,
    stageableClinicalPaths: 0,
    indexAlreadyStaged: staged ? staged.split('\n').filter(Boolean).length : 0,
  },
  changedIncubatorPaths,
  documentationCandidates,
  quarantineCandidates,
  stageableClinicalPaths: [] as string[],
  safeToPromoteToClinicalApp: false,
  safeToStageQuarantineDocs: documentationCandidates.length > 0,
  rationale: [
    'This surface is education/adaptive-learning, not clinical calculator functionality.',
    'It still has demo token behavior, promotional SOTA claims, and split API/WebSocket origins.',
    'The diagnosis route is archived under incubator/education-sota so it does not participate in App Router static export.',
    'The clinical 2026 path must keep backend-dependent tools unavailable without real backend configuration.',
  ],
};

if (format === 'json') {
  console.log(JSON.stringify(report, null, 2));
} else if (format === 'summary') {
  console.log(`changed incubator paths: ${report.summary.changedIncubatorPaths}`);
  console.log(`documentation candidates: ${report.summary.documentationCandidates}`);
  console.log(`quarantine candidates: ${report.summary.quarantineCandidates}`);
  console.log(`stageable clinical paths: ${report.summary.stageableClinicalPaths}`);
  console.log(`index already staged: ${report.summary.indexAlreadyStaged}`);
  console.log(`safe to promote to clinical app: ${report.safeToPromoteToClinicalApp}`);
  console.log(`safe to stage quarantine docs: ${report.safeToStageQuarantineDocs}`);
  console.log('static export contamination risk: false');
} else if (format === 'paths') {
  console.log(documentationCandidates.join('\n'));
} else {
  console.log(`git add -- ${documentationCandidates.map(shellQuote).join(' ')}`);
}
