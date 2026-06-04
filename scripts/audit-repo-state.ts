import { execSync } from 'node:child_process';
import path from 'node:path';

type ChangeKind = 'modified' | 'added' | 'deleted' | 'renamed' | 'copied' | 'untracked' | 'other';

interface ClassifiedChange {
  status: string;
  file: string;
  kind: ChangeKind;
  domain: string;
}

interface CliOptions {
  domain?: string;
  format: 'json' | 'summary' | 'list' | 'paths';
}

const domainRules: Array<[domain: string, predicate: (file: string) => boolean]> = [
  ['clinical-intelligence-calculators', (file) =>
    file.startsWith('lib/clinical-intelligence/') ||
    file === 'lib/calculators/clinical-intelligence.ts' ||
    file.startsWith('lib/calculators/') ||
    file.startsWith('app/[locale]/calculadoras/')],
  ['education-sota-incubator', (file) =>
    file.startsWith('medical-education-sota/') ||
    file.startsWith('incubator/education-sota/') ||
    file.startsWith('lib/medical-education/') ||
    file.startsWith('lib/medical-education-sota/') ||
    file.startsWith('app/[locale]/learn/diagnosis/') ||
    file.startsWith('app/components/SOTA/') ||
    file.startsWith('lib/api/sota-') ||
    file === 'lib/simple-question-system.ts' ||
    file === 'lib/store/sotaStore.ts' ||
    file === 'lib/hooks/useSotaWebSocket.ts' ||
    file === 'lib/types/sota.ts' ||
    file === 'lib/types/medical-residency.ts' ||
    file.startsWith('scripts/dados-exemplo-questoes') ||
    file.startsWith('scripts/demo-gerador-questoes') ||
    file.startsWith('scripts/simple-question-generator') ||
    file === 'public/demo-data.json' ||
    file === 'public/demo-questoes-medicas.html' ||
    file === 'github-qti-medical-search.png' ||
    file === 'qti-ims-global-main.png'],
  ['ecg-clinical-module', (file) =>
    file.startsWith('lib/data/ecg/') ||
    file === 'lib/types/ecg.ts' ||
    file === 'lib/services/ecg-clinical-support.ts' ||
    file.startsWith('app/components/ECG/')],
  ['primary-surface-audit', (file) =>
    file === 'app/[locale]/outros/page.tsx' ||
    file === 'app/[locale]/preventive-dashboard/page.tsx' ||
    file === 'scripts/audit-primary-surface.ts' ||
    file === 'docs/PRIMARY_SURFACE_AUDIT_2026-06-03.md'],
  ['content-expansion', (file) =>
    file.startsWith('incubator/content-expansion/doencas/expansao-800/') ||
    file.startsWith('incubator/content-expansion/medicamentos/expansao-1000/')],
  ['i18n', (file) => file.startsWith('messages/') || file.startsWith('i18n/')],
  ['agent-config', (file) => file === '.roomodes' || file.startsWith('.roo/') || file === 'AGENTS.md'],
  ['docs-strategy', (file) => file.startsWith('docs/') || file.endsWith('.md')],
  ['tooling-config', (file) =>
    file.startsWith('lib/hosting/') ||
    [
      '.gitignore',
      'package.json',
      'package-lock.json',
      'tsconfig.json',
      'eslint.config.mjs',
      'next.config.ts',
      'middleware.ts',
    ].includes(file)],
  ['search-recommendations', (file) =>
    file.startsWith('lib/search/') || file === 'lib/utils/recommendations.ts'],
  ['learning-ui', (file) =>
    file.startsWith('app/[locale]/learn/') ||
    file.startsWith('app/components/Learning/') ||
    file === 'app/components/Navigation/MobileBottomNav.tsx'],
  ['scripts', (file) => file.startsWith('scripts/')],
  ['public-assets', (file) => file.startsWith('public/') || /\.(png|jpg|jpeg|gif|webp|svg|html|json)$/i.test(file)],
];

function run(command: string): string {
  return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trimEnd();
}

function classifyStatus(status: string): ChangeKind {
  if (status === '??') return 'untracked';
  if (status.includes('D')) return 'deleted';
  if (status.includes('R')) return 'renamed';
  if (status.includes('C')) return 'copied';
  if (status.includes('A')) return 'added';
  if (status.includes('M')) return 'modified';
  return 'other';
}

function classifyDomain(file: string): string {
  const normalized = file.split(path.sep).join('/');
  const match = domainRules.find(([, predicate]) => predicate(normalized));
  return match?.[0] || 'other';
}

function parsePorcelain(output: string): ClassifiedChange[] {
  if (!output.trim()) return [];

  return output.split('\n').map((line) => {
    const status = line.slice(0, 2);
    const rawFile = line.slice(3);
    const file = rawFile.includes(' -> ') ? rawFile.split(' -> ').at(-1)! : rawFile;

    return {
      status,
      file,
      kind: classifyStatus(status),
      domain: classifyDomain(file),
    };
  });
}

function countBy<T extends string>(items: ClassifiedChange[], key: (item: ClassifiedChange) => T): Record<T, number> {
  return items.reduce(
    (acc, item) => {
      const value = key(item);
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    },
    {} as Record<T, number>
  );
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = { format: 'json' };

  for (const arg of args) {
    if (arg.startsWith('--domain=')) {
      options.domain = arg.slice('--domain='.length);
    } else if (arg.startsWith('--format=')) {
      const format = arg.slice('--format='.length);
      if (format === 'json' || format === 'summary' || format === 'list' || format === 'paths') {
        options.format = format;
      } else {
        throw new Error(`Unsupported format: ${format}`);
      }
    }
  }

  return options;
}

function printSummary(report: typeof fullReport): void {
  console.log(`branch: ${report.branch}`);
  console.log(`changed files: ${report.totals.changedFiles}`);
  console.log('by kind:');
  for (const [kind, count] of Object.entries(report.totals.byKind).sort()) {
    console.log(`  ${kind}: ${count}`);
  }
  console.log('by domain:');
  for (const domain of report.domains.toSorted((a, b) => b.count - a.count)) {
    console.log(`  ${domain.domain}: ${domain.count}`);
  }
}

const branch = run('git branch --show-current') || '(detached)';
const changes = parsePorcelain(run('git status --porcelain -uall'));
const byDomain = countBy(changes, (item) => item.domain);
const byKind = countBy(changes, (item) => item.kind);

const fullReport = {
  generatedAt: new Date().toISOString(),
  branch,
  totals: {
    changedFiles: changes.length,
    byKind,
    byDomain,
  },
  domains: Object.keys(byDomain)
    .sort()
    .map((domain) => ({
      domain,
      count: byDomain[domain],
      files: changes.filter((item) => item.domain === domain).map((item) => `${item.status} ${item.file}`),
    })),
};

const options = parseArgs(process.argv.slice(2));
const report = options.domain
  ? {
      ...fullReport,
      totals: {
        ...fullReport.totals,
        changedFiles: changes.filter((item) => item.domain === options.domain).length,
      },
      domains: fullReport.domains.filter((domain) => domain.domain === options.domain),
    }
  : fullReport;

if (options.format === 'summary') {
  printSummary(report);
} else if (options.format === 'list') {
  for (const domain of report.domains.toSorted((a, b) => a.domain.localeCompare(b.domain))) {
    for (const file of domain.files) {
      console.log(file);
    }
  }
} else if (options.format === 'paths') {
  for (const domain of report.domains.toSorted((a, b) => a.domain.localeCompare(b.domain))) {
    for (const file of domain.files) {
      console.log(file.slice(3));
    }
  }
} else {
  console.log(JSON.stringify(report, null, 2));
}
