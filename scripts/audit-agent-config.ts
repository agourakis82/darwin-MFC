import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

type OutputFormat = 'json' | 'summary';

interface ModeInfo {
  slug: string;
  groups: string[];
  claimHits: number;
}

interface RuleDirectory {
  slug: string;
  path: string;
  files: number;
  tracked: boolean;
}

const root = process.cwd();

const expectedClinicalModes = [
  'repository-quality-guardian',
  'medical-content-architect',
  'polyglot-medical-translator',
  'citation-sentinel',
  'critical-analysis-generator',
  'ontology-integrator',
  'protocol-flowchart-builder',
  'clinical-cases-generator',
  'medical-calculators-builder',
];

const promotionalPatterns = [
  /state-of-the-art/i,
  /\bSOTA\b/,
  /revolucion/i,
  /perfeito/i,
  /seamless/i,
  /blockchain/i,
  /VR\/AR/i,
  /LGPD\/GDPR/i,
  /Nature\/Cell/i,
  /\bQ1\b/i,
];

function run(command: string): string {
  return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trimEnd();
}

function safeRun(command: string): string {
  try {
    return run(command);
  } catch {
    return '';
  }
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

function extractModes(source: string): ModeInfo[] {
  const blocks = source
    .split(/\n(?=\s+- slug: )/)
    .filter((block) => block.includes('slug:'));

  return blocks.map((block) => {
    const slug = block.match(/slug:\s*([^\n]+)/)?.[1]?.trim() || 'unknown';
    const groupsBlock = block.match(/\n\s+groups:\n([\s\S]*?)(?:\n\s+\w|$)/)?.[1] || '';
    const groups = [...groupsBlock.matchAll(/\n\s+-\s+([a-z-]+)/g)].map((match) => match[1]);
    const claimHits = promotionalPatterns.reduce((count, pattern) => count + (pattern.test(block) ? 1 : 0), 0);

    return { slug, groups, claimHits };
  });
}

function listRuleDirectories(): RuleDirectory[] {
  const rooPath = path.join(root, '.roo');
  if (!fs.existsSync(rooPath)) return [];

  const trackedFiles = new Set(safeRun('git ls-files .roo').split('\n').filter(Boolean).map(normalize));

  return fs
    .readdirSync(rooPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('rules-'))
    .map((entry) => {
      const dir = normalize(path.join('.roo', entry.name));
      const files = fs
        .readdirSync(path.join(root, dir), { withFileTypes: true })
        .filter((child) => child.isFile()).length;
      const slug = entry.name.slice('rules-'.length);
      const tracked = [...trackedFiles].some((file) => file.startsWith(`${dir}/`));

      return { slug, path: dir, files, tracked };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

function getChangedAgentFiles(): string[] {
  const status = safeRun('git status --porcelain -uall');
  if (!status.trim()) return [];

  return status
    .split('\n')
    .map((line) => line.slice(3))
    .map((file) => (file.includes(' -> ') ? file.split(' -> ').at(-1)! : file))
    .map(normalize)
    .filter((file) => file === '.roomodes' || file.startsWith('.roo/') || file === 'AGENTS.md')
    .sort();
}

function countLines(source: string): number {
  return source ? source.split('\n').length : 0;
}

const format = parseArgs(process.argv.slice(2));
const currentRoomodes = fs.existsSync(path.join(root, '.roomodes'))
  ? fs.readFileSync(path.join(root, '.roomodes'), 'utf8')
  : '';
const headRoomodes = safeRun('git show HEAD:.roomodes');

const currentModes = extractModes(currentRoomodes);
const headModes = extractModes(headRoomodes);
const currentSlugs = new Set(currentModes.map((mode) => mode.slug));
const headSlugs = new Set(headModes.map((mode) => mode.slug));
const ruleDirectories = listRuleDirectories();

const removedModes = [...headSlugs].filter((slug) => !currentSlugs.has(slug)).sort();
const addedModes = [...currentSlugs].filter((slug) => !headSlugs.has(slug)).sort();
const expectedClinicalModesMissing = expectedClinicalModes.filter((slug) => !currentSlugs.has(slug));
const ruleDirsWithoutCurrentMode = ruleDirectories
  .filter((dir) => !currentSlugs.has(dir.slug))
  .map((dir) => dir.slug);
const currentModesWithoutRuleDir = currentModes
  .filter((mode) => !ruleDirectories.some((dir) => dir.slug === mode.slug))
  .map((mode) => mode.slug);
const stageCurrentRoomodes =
  removedModes.length === 0 &&
  expectedClinicalModesMissing.length === 0 &&
  ruleDirsWithoutCurrentMode.length === 0 &&
  currentModesWithoutRuleDir.length === 0;
const recommendationRationale = stageCurrentRoomodes
  ? [
      'The current .roomodes preserves all HEAD clinical and quality modes.',
      'The new modes are additive and have corresponding .roo rule directories.',
      'Education/SOTA is isolated as an incubator mode rather than replacing the clinical-app workflow.',
    ]
  : [
      'The current .roomodes removes the repository quality, citation, ontology, translation, content, protocol, case or calculator modes from HEAD.',
      'Some .roo rule directories are disconnected from current modes, or some current modes have no rule directory.',
      'Do not stage agent config until the clinical workflow coverage is restored or the removal is explicitly justified.',
    ];

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    changedFiles: getChangedAgentFiles().length,
    headModes: headModes.length,
    currentModes: currentModes.length,
    removedModes: removedModes.length,
    addedModes: addedModes.length,
    expectedClinicalModesMissing: expectedClinicalModesMissing.length,
    ruleDirectories: ruleDirectories.length,
    ruleDirsWithoutCurrentMode: ruleDirsWithoutCurrentMode.length,
    currentModesWithoutRuleDir: currentModesWithoutRuleDir.length,
    currentPromotionalClaimHits: currentModes.reduce((sum, mode) => sum + mode.claimHits, 0),
    headRoomodesLines: countLines(headRoomodes),
    currentRoomodesLines: countLines(currentRoomodes),
  },
  modes: {
    head: headModes,
    current: currentModes,
    removed: removedModes,
    added: addedModes,
    expectedClinicalModesMissing,
  },
  ruleDirectories,
  consistency: {
    ruleDirsWithoutCurrentMode,
    currentModesWithoutRuleDir,
    mcpMemoryServerConfigured: fs
      .readFileSync(path.join(root, '.roo/mcp.json'), 'utf8')
      .includes('@modelcontextprotocol/server-memory'),
  },
  changedFiles: getChangedAgentFiles(),
  recommendation: {
    stagingCut: 'Agent config / Roo workflow',
    stageCurrentRoomodes,
    rationale: recommendationRationale,
  },
};

if (format === 'summary') {
  console.log(`changed files: ${report.summary.changedFiles}`);
  console.log(`HEAD modes: ${report.summary.headModes}`);
  console.log(`current modes: ${report.summary.currentModes}`);
  console.log(`removed modes: ${report.summary.removedModes}`);
  console.log(`added modes: ${report.summary.addedModes}`);
  console.log(`expected clinical modes missing: ${report.summary.expectedClinicalModesMissing}`);
  console.log(`rule directories: ${report.summary.ruleDirectories}`);
  console.log(`rule dirs without current mode: ${report.summary.ruleDirsWithoutCurrentMode}`);
  console.log(`current modes without rule dir: ${report.summary.currentModesWithoutRuleDir}`);
  console.log(`current promotional claim hits: ${report.summary.currentPromotionalClaimHits}`);
  console.log(`HEAD .roomodes lines: ${report.summary.headRoomodesLines}`);
  console.log(`current .roomodes lines: ${report.summary.currentRoomodesLines}`);
  console.log(`stage current .roomodes: ${report.recommendation.stageCurrentRoomodes}`);
  console.log(`removed mode slugs: ${removedModes.join(', ') || 'none'}`);
} else {
  console.log(JSON.stringify(report, null, 2));
}
