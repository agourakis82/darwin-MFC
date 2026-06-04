import { execSync } from 'node:child_process';

type OutputFormat = 'json' | 'summary' | 'paths' | 'commands';

interface GitChange {
  status: string;
  file: string;
}

const corte2RequiredPaths = [
  'app/[locale]/calculadoras/CalculadorasHubClient.tsx',
  'app/[locale]/calculadoras/[id]/CalculatorDetailClient.tsx',
  'app/[locale]/calculadoras/[id]/page.tsx',
  'lib/calculators/calculators/index.ts',
  'lib/calculators/index.ts',
  'lib/calculators/types.ts',
  'lib/calculators/clinical-intelligence.ts',
  'lib/clinical-intelligence/config.ts',
  'scripts/audit-clinical-intelligence.ts',
  'scripts/plan-corte2-staging.ts',
  'docs/CLINICAL_INTELLIGENCE_AUDIT_2026-06-03.md',
  'docs/CORTE2_CLINICAL_INTELLIGENCE_PATHSPEC_2026-06-03.md',
];

const clinicalCalculatorFiles = [
  'lib/calculators/calculators/ai-powered-sepsis-score-2025.ts',
  'lib/calculators/calculators/cancer-risk-prediction-2025.ts',
  'lib/calculators/calculators/genomic-multiomic-risk.ts',
  'lib/calculators/calculators/pharmacogenomics-precision.ts',
  'lib/calculators/calculators/precision-frailty-index-2025.ts',
  'lib/calculators/calculators/prevent-score-2025.ts',
  'lib/calculators/calculators/sota-metabolic-risk-2025.ts',
  'lib/calculators/calculators/stroke-temporal-evolution.ts',
];

const explicitExclusionPrefixes = [
  '.roo/',
  'app/[locale]/learn/diagnosis/',
  'incubator/education-sota/',
  'app/components/ECG/',
  'app/components/SOTA/',
  'lib/api/sota-',
  'incubator/content-expansion/doencas/expansao-800/',
  'lib/data/ecg/',
  'incubator/content-expansion/medicamentos/expansao-1000/',
  'lib/hooks/useSotaWebSocket.ts',
  'lib/medical-education',
  'lib/simple-question-system.ts',
  'lib/services/',
  'lib/store/sotaStore.ts',
  'lib/types/ecg.ts',
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
  '.roomodes',
  'github-qti-medical-search.png',
  'qti-ims-global-main.png',
  'docs/AGENT_CONFIG_AUDIT_2026-06-03.md',
  'docs/CONTENT-CREATION-STRATEGY-SOTA.md',
  'docs/CONTENT_EXPANSION_AUDIT_2026-06-03.md',
  'docs/CORTE1_STAGING_PATHSPEC_2026-06-03.md',
  'docs/CORTE3_AGENT_CONFIG_PATHSPEC_2026-06-03.md',
  'docs/CORTE4_ECG_PATHSPEC_2026-06-03.md',
  'docs/CORTE5_EDUCATION_INCUBATOR_QUARANTINE_2026-06-03.md',
  'docs/CORTE6_CONTENT_EXPANSION_QUARANTINE_2026-06-03.md',
  'docs/CORTE7_SECURITY_DEPENDENCIES_2026-06-03.md',
  'docs/CORTE8_DOCS_STRATEGY_QUARANTINE_2026-06-03.md',
  'docs/DOCS_STRATEGY_AUDIT_2026-06-03.md',
  'docs/ECG_MODULE_AUDIT_2026-06-03.md',
  'docs/EDUCATION_INCUBATOR_AUDIT_2026-06-03.md',
  'docs/EXECUTIVE-STRATEGY-SUMMARY.md',
  'docs/MEDICAL-EDUCATION-SOTA-SYSTEM.md',
  'docs/ONTOLOGIAS-QUESTOES-MEDICAS.md',
  'docs/SIMPLE-CONTENT-STRATEGY.md',
  'docs/SIMPLIFIED-CONTENT-STRATEGY.md',
  'docs/SISTEMA-QUESTOES-MEDICAS-PROTOTIPO.md',
  'docs/SOTA-CALCULATORS-IMPLEMENTATION-SUMMARY.md',
  'docs/SOTA-MEDICAL-CALCULATORS-PLAN-2025.md',
  'docs/SOTA-MEDICAL-CALCULATORS-PLAN.md',
  'docs/REPO_AUDIT_2026-06-03.md',
  'docs/STAGING_MANIFEST_2026-06-03.md',
  'docs/UIUX-SOTA-ANALYSIS.md',
  'docs/UIUX-SOTA-METRICS.md',
  'lib/calculators/calculators/sota-calculators-index.ts',
  'lib/design-system/UIUX-INNOVATION-GOALS.md',
  'package.json',
  'scripts/audit-agent-config.ts',
  'scripts/audit-content-expansions.ts',
  'scripts/audit-docs-strategy.ts',
  'scripts/audit-ecg-module.ts',
  'scripts/audit-education-incubator.ts',
  'scripts/audit-repo-state.ts',
  'scripts/audit-security-dependencies.ts',
  'scripts/plan-corte1-staging.ts',
  'scripts/plan-corte3-agent-config.ts',
  'scripts/plan-corte4-ecg.ts',
  'scripts/plan-corte5-education-incubator.ts',
  'scripts/plan-corte6-content-expansion.ts',
  'scripts/plan-corte7-security-deps.ts',
  'scripts/plan-corte8-docs-strategy.ts',
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

function isExcluded(file: string): boolean {
  return explicitExclusionPaths.includes(file) ||
    explicitExclusionPrefixes.some((prefix) => file.startsWith(prefix));
}

function shellQuote(path: string): string {
  return `'${path.replaceAll("'", "'\\''")}'`;
}

const format = parseArgs(process.argv.slice(2));
const changes = parseStatus(run('git status --porcelain -uall'));
const worktreeChanges = changes.filter((change) =>
  change.status.startsWith('??') || change.status[1] !== ' '
);
const changedPaths = new Set(changes.map((change) => change.file));
const requiredChanged = corte2RequiredPaths.filter((file) => changedPaths.has(file));
const calculatorChanged = clinicalCalculatorFiles.filter((file) => changedPaths.has(file));
const candidatePaths = [...requiredChanged, ...calculatorChanged].sort();
const excludedChanged = changes
  .map((change) => change.file)
  .filter((file) => isExcluded(file))
  .sort();
const uncoveredChanged = worktreeChanges
  .map((change) => change.file)
  .filter((file) => !candidatePaths.includes(file) && !isExcluded(file))
  .sort();
const requiredMissingFromWorktree = corte2RequiredPaths.filter((file) => !changedPaths.has(file));
const staged = run('git diff --cached --name-only');

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    changedFiles: changes.length,
    candidatePaths: candidatePaths.length,
    requiredChanged: requiredChanged.length,
    calculatorChanged: calculatorChanged.length,
    excludedChanged: excludedChanged.length,
    uncoveredChanged: uncoveredChanged.length,
    requiredMissingFromWorktree: requiredMissingFromWorktree.length,
    indexAlreadyStaged: staged ? staged.split('\n').filter(Boolean).length : 0,
  },
  candidatePaths,
  requiredChanged,
  calculatorChanged,
  excludedChanged,
  uncoveredChanged,
  requiredMissingFromWorktree,
  safeToStage:
    requiredMissingFromWorktree.length === 0 &&
    uncoveredChanged.every((file) => file === 'SESSION.md'),
};

if (format === 'json') {
  console.log(JSON.stringify(report, null, 2));
} else if (format === 'summary') {
  console.log(`changed files: ${report.summary.changedFiles}`);
  console.log(`candidate paths: ${report.summary.candidatePaths}`);
  console.log(`required changed: ${report.summary.requiredChanged}`);
  console.log(`calculator changed: ${report.summary.calculatorChanged}`);
  console.log(`excluded changed: ${report.summary.excludedChanged}`);
  console.log(`uncovered changed: ${report.summary.uncoveredChanged}`);
  console.log(`required missing from worktree: ${report.summary.requiredMissingFromWorktree}`);
  console.log(`index already staged: ${report.summary.indexAlreadyStaged}`);
  console.log(`safe to stage as Corte 2: ${report.safeToStage}`);
} else if (format === 'paths') {
  console.log(candidatePaths.join('\n'));
} else {
  console.log(`git add -- ${candidatePaths.map(shellQuote).join(' ')}`);
}

if (!report.safeToStage && format !== 'json') {
  process.exitCode = 1;
}
