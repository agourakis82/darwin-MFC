import { execSync } from 'node:child_process';

type OutputFormat = 'json' | 'summary' | 'paths' | 'commands';

const candidatePaths = [
  'app/components/ECG/ClinicalSupport/ECGReferralGuide.tsx',
  'docs/CORTE4_ECG_PATHSPEC_2026-06-03.md',
  'docs/ECG_MODULE_AUDIT_2026-06-03.md',
  'lib/data/ecg/clinical-support/interpretation-checklist.ts',
  'lib/data/ecg/clinical-support/protocols-by-setting.ts',
  'lib/data/ecg/clinical-support/red-flags.ts',
  'lib/data/ecg/clinical-support/referral-criteria.ts',
  'lib/data/ecg/clinical-support/triage-algorithms.ts',
  'lib/data/ecg/index.ts',
  'lib/data/ecg/patterns/arritmias-supraventriculares.ts',
  'lib/data/ecg/patterns/arritmias-ventriculares.ts',
  'lib/data/ecg/patterns/bloqueios-conducao.ts',
  'lib/data/ecg/patterns/isquemia-infarto.ts',
  'lib/data/ecg/patterns/ritmos-normais.ts',
  'lib/services/ecg-clinical-support.ts',
  'lib/types/ecg.ts',
  'scripts/audit-ecg-module.ts',
  'scripts/plan-corte4-ecg.ts',
];

const explicitExclusionPrefixes = [
  'app/[locale]/learn/diagnosis/',
  'incubator/education-sota/',
  'app/components/SOTA/',
  'lib/api/sota-',
  'incubator/content-expansion/doencas/expansao-800/',
  'incubator/content-expansion/medicamentos/expansao-1000/',
  'lib/hooks/useSotaWebSocket.ts',
  'lib/medical-education',
  'lib/simple-question-system.ts',
  'lib/store/sotaStore.ts',
  'lib/types/medical-residency.ts',
  'lib/types/sota.ts',
  'medical-education-sota/',
  'public/demo-data.json',
  'public/demo-questoes-medicas.html',
  'scripts/dados-exemplo-questoes',
  'scripts/demo-gerador-questoes',
  'scripts/simple-question-generator',
];

const explicitExclusionPaths = [
  'github-qti-medical-search.png',
  'qti-ims-global-main.png',
  'docs/CONTENT-CREATION-STRATEGY-SOTA.md',
  'docs/EXECUTIVE-STRATEGY-SUMMARY.md',
  'docs/MEDICAL-EDUCATION-SOTA-SYSTEM.md',
  'docs/ONTOLOGIAS-QUESTOES-MEDICAS.md',
  'docs/SIMPLE-CONTENT-STRATEGY.md',
  'docs/SIMPLIFIED-CONTENT-STRATEGY.md',
  'docs/SISTEMA-QUESTOES-MEDICAS-PROTOTIPO.md',
  'docs/SOTA-CALCULATORS-IMPLEMENTATION-SUMMARY.md',
  'docs/SOTA-MEDICAL-CALCULATORS-PLAN-2025.md',
  'docs/SOTA-MEDICAL-CALCULATORS-PLAN.md',
  'docs/UIUX-SOTA-ANALYSIS.md',
  'docs/UIUX-SOTA-METRICS.md',
  'lib/calculators/calculators/sota-calculators-index.ts',
  'lib/design-system/UIUX-INNOVATION-GOALS.md',
];

interface GitChange {
  status: string;
  file: string;
}

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

function isExcluded(file: string): boolean {
  return explicitExclusionPaths.includes(file) ||
    explicitExclusionPrefixes.some((prefix) => file.startsWith(prefix));
}

function isECGDomain(file: string): boolean {
  return file.startsWith('app/components/ECG/') ||
    file.startsWith('lib/data/ecg/') ||
    file.startsWith('lib/services/ecg') ||
    file === 'lib/types/ecg.ts' ||
    file === 'scripts/audit-ecg-module.ts' ||
    file === 'scripts/plan-corte4-ecg.ts' ||
    file === 'docs/ECG_MODULE_AUDIT_2026-06-03.md' ||
    file === 'docs/CORTE4_ECG_PATHSPEC_2026-06-03.md';
}

function shellQuote(path: string): string {
  return `'${path.replaceAll("'", "'\\''")}'`;
}

const format = parseArgs(process.argv.slice(2));
const changes = parseStatus(run('git status --porcelain -uall'));
const changedPaths = new Set(changes.map((change) => change.file));
const paths = candidatePaths.filter((file) => changedPaths.has(file)).sort();
const ecgChanges = changes.map((change) => change.file).filter(isECGDomain).sort();
const uncoveredECGChanges = ecgChanges
  .filter((file) => !candidatePaths.includes(file) && !isExcluded(file))
  .sort();
const staged = run('git diff --cached --name-only');

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    ecgChanges: ecgChanges.length,
    candidatePaths: paths.length,
    uncoveredECGChanges: uncoveredECGChanges.length,
    indexAlreadyStaged: staged ? staged.split('\n').filter(Boolean).length : 0,
  },
  candidatePaths: paths,
  uncoveredECGChanges,
  safeToStage: uncoveredECGChanges.length === 0,
};

if (format === 'json') {
  console.log(JSON.stringify(report, null, 2));
} else if (format === 'summary') {
  console.log(`ecg changes: ${report.summary.ecgChanges}`);
  console.log(`candidate paths: ${report.summary.candidatePaths}`);
  console.log(`uncovered ecg changes: ${report.summary.uncoveredECGChanges}`);
  console.log(`index already staged: ${report.summary.indexAlreadyStaged}`);
  console.log(`safe to stage as Corte 4: ${report.safeToStage}`);
} else if (format === 'paths') {
  console.log(paths.join('\n'));
} else {
  console.log(`git add -- ${paths.map(shellQuote).join(' ')}`);
}

if (!report.safeToStage && format !== 'json') {
  process.exitCode = 1;
}
