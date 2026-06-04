import { execSync } from 'node:child_process';

type OutputFormat = 'json' | 'summary' | 'paths' | 'commands';

interface GitChange {
  status: string;
  file: string;
}

const candidatePrefixes = [
  '.roo/rules-conversation-master/',
  '.roo/rules-medical-education-sota/',
];

const candidatePaths = [
  '.roomodes',
  'docs/AGENT_CONFIG_AUDIT_2026-06-03.md',
  'docs/CORTE3_AGENT_CONFIG_PATHSPEC_2026-06-03.md',
  'scripts/audit-agent-config.ts',
  'scripts/plan-corte3-agent-config.ts',
];

const explicitExclusionPrefixes = [
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

function isCandidate(file: string): boolean {
  return candidatePaths.includes(file) ||
    candidatePrefixes.some((prefix) => file.startsWith(prefix));
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
const agentChanges = changes
  .map((change) => change.file)
  .filter((file) => file === '.roomodes' || file.startsWith('.roo/') || file === 'AGENTS.md' ||
    file === 'docs/AGENT_CONFIG_AUDIT_2026-06-03.md' ||
    file === 'docs/CORTE3_AGENT_CONFIG_PATHSPEC_2026-06-03.md' ||
    file === 'scripts/audit-agent-config.ts' ||
    file === 'scripts/plan-corte3-agent-config.ts');
const paths = changes
  .map((change) => change.file)
  .filter(isCandidate)
  .sort();
const uncoveredAgentChanges = agentChanges
  .filter((file) => !isCandidate(file) && !isExcluded(file) && file !== 'AGENTS.md')
  .sort();
const staged = run('git diff --cached --name-only');

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    agentChanges: agentChanges.length,
    candidatePaths: paths.length,
    uncoveredAgentChanges: uncoveredAgentChanges.length,
    indexAlreadyStaged: staged ? staged.split('\n').filter(Boolean).length : 0,
  },
  candidatePaths: paths,
  uncoveredAgentChanges,
  safeToStage: uncoveredAgentChanges.length === 0,
};

if (format === 'json') {
  console.log(JSON.stringify(report, null, 2));
} else if (format === 'summary') {
  console.log(`agent changes: ${report.summary.agentChanges}`);
  console.log(`candidate paths: ${report.summary.candidatePaths}`);
  console.log(`uncovered agent changes: ${report.summary.uncoveredAgentChanges}`);
  console.log(`index already staged: ${report.summary.indexAlreadyStaged}`);
  console.log(`safe to stage as Corte 3: ${report.safeToStage}`);
} else if (format === 'paths') {
  console.log(paths.join('\n'));
} else {
  console.log(`git add -- ${paths.map(shellQuote).join(' ')}`);
}

if (!report.safeToStage && format !== 'json') {
  process.exitCode = 1;
}
