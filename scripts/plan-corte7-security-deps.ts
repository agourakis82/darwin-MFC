import { execSync } from 'node:child_process';

type OutputFormat = 'json' | 'summary' | 'paths' | 'commands';

interface GitChange {
  status: string;
  file: string;
}

const documentationPaths = [
  'docs/SECURITY_DEPENDENCY_AUDIT_2026-06-03.md',
  'docs/CORTE7_SECURITY_DEPENDENCIES_2026-06-03.md',
  'package.json',
  'scripts/audit-security-dependencies.ts',
  'scripts/plan-corte7-security-deps.ts',
];

const dependencyManifestPaths = [
  'package.json',
  'package-lock.json',
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
const documentationCandidates = changedPaths
  .filter((file) => documentationPaths.includes(file))
  .sort();
const changedDependencyManifests = changedPaths
  .filter((file) => dependencyManifestPaths.includes(file))
  .sort();
const staged = run('git diff --cached --name-only');

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    documentationCandidates: documentationCandidates.length,
    changedDependencyManifests: changedDependencyManifests.length,
    stageableDependencyUpgradePaths: 0,
    indexAlreadyStaged: staged ? staged.split('\n').filter(Boolean).length : 0,
  },
  documentationCandidates,
  changedDependencyManifests,
  stageableDependencyUpgradePaths: [] as string[],
  safeToRunAuditFixAutomatically: false,
  safeToStageSecurityPlanDocs: documentationCandidates.length > 0,
  rationale: [
    'The current critical jspdf fix is semver-major and touches client-side PDF export behavior.',
    'Next and next-intl upgrades need full static-export and i18n gates.',
    'Security remediation should be a dedicated dependency-upgrade cut, not mixed into repo triage staging.',
  ],
};

if (format === 'json') {
  console.log(JSON.stringify(report, null, 2));
} else if (format === 'summary') {
  console.log(`documentation candidates: ${report.summary.documentationCandidates}`);
  console.log(`changed dependency manifests: ${report.summary.changedDependencyManifests}`);
  console.log(`stageable dependency upgrade paths: ${report.summary.stageableDependencyUpgradePaths}`);
  console.log(`index already staged: ${report.summary.indexAlreadyStaged}`);
  console.log(`safe to run audit fix automatically: ${report.safeToRunAuditFixAutomatically}`);
  console.log(`safe to stage security plan docs: ${report.safeToStageSecurityPlanDocs}`);
} else if (format === 'paths') {
  console.log(documentationCandidates.join('\n'));
} else {
  console.log(`git add -- ${documentationCandidates.map(shellQuote).join(' ')}`);
}
