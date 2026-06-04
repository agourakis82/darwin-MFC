import { execSync } from 'node:child_process';

type OutputFormat = 'json' | 'summary' | 'paths' | 'commands';

interface GitChange {
  status: string;
  file: string;
}

const corte1RequiredPaths = [
  '.gitignore',
  'eslint.config.mjs',
  'middleware.ts',
  'next.config.ts',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'lib/hosting/static-security.ts',
  'scripts/plan-corte1-staging.ts',
  'scripts/audit-repo-state.ts',
  'scripts/audit-content-expansions.ts',
  'scripts/audit-ecg-module.ts',
  'scripts/audit-education-incubator.ts',
  'scripts/audit-agent-config.ts',
  'scripts/audit-security-dependencies.ts',
  'scripts/audit-primary-surface.ts',
  'docs/REPO_AUDIT_2026-06-03.md',
  'docs/CORTE1_STAGING_PATHSPEC_2026-06-03.md',
  'docs/STAGING_MANIFEST_2026-06-03.md',
  'docs/STATIC_EXPORT_SECURITY.md',
  'docs/PRIMARY_SURFACE_AUDIT_2026-06-03.md',
  'docs/CONTENT_EXPANSION_AUDIT_2026-06-03.md',
  'docs/ECG_MODULE_AUDIT_2026-06-03.md',
  'docs/EDUCATION_INCUBATOR_AUDIT_2026-06-03.md',
  'docs/SECURITY_DEPENDENCY_AUDIT_2026-06-03.md',
  'docs/AGENT_CONFIG_AUDIT_2026-06-03.md',
  'CLAUDE.md',
  'AGENTS.md',
];

const optionalCorte1Fixes = [
  'messages/ar/common.json',
  'messages/ar/learning.json',
  'messages/el/common.json',
  'messages/el/learning.json',
  'messages/en/common.json',
  'messages/en/learning.json',
  'messages/es/common.json',
  'messages/es/learning.json',
  'messages/fr/common.json',
  'messages/fr/learning.json',
  'messages/hi/common.json',
  'messages/hi/learning.json',
  'messages/pt/common.json',
  'messages/pt/learning.json',
  'messages/ru/common.json',
  'messages/ru/learning.json',
  'messages/zh/common.json',
  'messages/zh/learning.json',
  'app/[locale]/learn/paths/[pathId]/LearningPathClient.tsx',
  'app/[locale]/learn/progress/page.tsx',
  'app/[locale]/outros/page.tsx',
  'app/[locale]/preventive-dashboard/page.tsx',
  'app/components/Learning/PathCard.tsx',
  'app/components/Learning/ProgressBar.tsx',
  'app/components/Navigation/MobileBottomNav.tsx',
  'lib/search/advancedSearch.ts',
  'lib/search/searchIndex.ts',
  'lib/utils/recommendations.ts',
];

const explicitExclusionPrefixes = [
  '.roo/',
  'incubator/content-expansion/',
  'app/[locale]/calculadoras/',
  'app/[locale]/learn/diagnosis/',
  'incubator/education-sota/',
  'app/components/ECG/',
  'app/components/SOTA/',
  'lib/api/sota-',
  'lib/calculators/',
  'lib/clinical-intelligence/',
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
  'docs/CONTENT-CREATION-STRATEGY-SOTA.md',
  'docs/CLINICAL_INTELLIGENCE_AUDIT_2026-06-03.md',
  'docs/CORTE2_CLINICAL_INTELLIGENCE_PATHSPEC_2026-06-03.md',
  'docs/CORTE3_AGENT_CONFIG_PATHSPEC_2026-06-03.md',
  'docs/CORTE4_ECG_PATHSPEC_2026-06-03.md',
  'docs/CORTE5_EDUCATION_INCUBATOR_QUARANTINE_2026-06-03.md',
  'docs/CORTE6_CONTENT_EXPANSION_QUARANTINE_2026-06-03.md',
  'docs/CORTE7_SECURITY_DEPENDENCIES_2026-06-03.md',
  'docs/CORTE8_DOCS_STRATEGY_QUARANTINE_2026-06-03.md',
  'docs/DOCS_STRATEGY_AUDIT_2026-06-03.md',
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
  'lib/design-system/UIUX-INNOVATION-GOALS.md',
  'qti-ims-global-main.png',
  'scripts/audit-clinical-intelligence.ts',
  'scripts/audit-docs-strategy.ts',
  'scripts/plan-corte2-staging.ts',
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
const changedPaths = new Set(changes.map((change) => change.file));
const requiredChanged = corte1RequiredPaths.filter((file) => changedPaths.has(file));
const optionalChanged = optionalCorte1Fixes.filter((file) => changedPaths.has(file));
const candidatePaths = [...requiredChanged, ...optionalChanged].sort();
const excludedChanged = changes
  .map((change) => change.file)
  .filter((file) => isExcluded(file))
  .sort();
const uncoveredChanged = changes
  .map((change) => change.file)
  .filter((file) => !candidatePaths.includes(file) && !isExcluded(file))
  .sort();
const requiredMissingFromWorktree = corte1RequiredPaths.filter((file) => !changedPaths.has(file));
const staged = run('git diff --cached --name-only');

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    changedFiles: changes.length,
    candidatePaths: candidatePaths.length,
    requiredChanged: requiredChanged.length,
    optionalChanged: optionalChanged.length,
    excludedChanged: excludedChanged.length,
    uncoveredChanged: uncoveredChanged.length,
    requiredMissingFromWorktree: requiredMissingFromWorktree.length,
    indexAlreadyStaged: staged ? staged.split('\n').filter(Boolean).length : 0,
  },
  candidatePaths,
  requiredChanged,
  optionalChanged,
  excludedChanged,
  uncoveredChanged,
  requiredMissingFromWorktree,
  commands: {
    review: 'npm run --silent plan:corte1 -- --format=summary',
    stage: candidatePaths.length
      ? `git add -- ${candidatePaths.map(shellQuote).join(' ')}`
      : 'git add --',
    unstageAll: 'git restore --staged .',
    diffCached: 'git diff --cached --stat && git diff --cached --check',
  },
  recommendation: {
    safeToStageAsCorte1: uncoveredChanged.length === 0 && requiredChanged.length > 0,
    note: 'This script does not stage files. It only prints the current Corte 1 staging plan.',
  },
};

if (format === 'summary') {
  console.log(`changed files: ${report.summary.changedFiles}`);
  console.log(`candidate paths: ${report.summary.candidatePaths}`);
  console.log(`required changed: ${report.summary.requiredChanged}`);
  console.log(`optional changed: ${report.summary.optionalChanged}`);
  console.log(`excluded changed: ${report.summary.excludedChanged}`);
  console.log(`uncovered changed: ${report.summary.uncoveredChanged}`);
  console.log(`required missing from worktree: ${report.summary.requiredMissingFromWorktree}`);
  console.log(`index already staged: ${report.summary.indexAlreadyStaged}`);
  console.log(`safe to stage as Corte 1: ${report.recommendation.safeToStageAsCorte1}`);
  if (uncoveredChanged.length) {
    console.log('uncovered paths:');
    for (const file of uncoveredChanged) console.log(`  ${file}`);
  }
} else if (format === 'paths') {
  for (const file of candidatePaths) console.log(file);
} else if (format === 'commands') {
  console.log(report.commands.stage);
  console.log(report.commands.diffCached);
} else {
  console.log(JSON.stringify(report, null, 2));
}
