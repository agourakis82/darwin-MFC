import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

type OutputFormat = 'json' | 'summary';
type Severity = 'info' | 'low' | 'moderate' | 'high' | 'critical';

interface AuditAdvisory {
  source?: number;
  name: string;
  dependency: string;
  title: string;
  url: string;
  severity: Severity;
  range: string;
  cwe?: string[];
  cvss?: {
    score?: number;
    vectorString?: string | null;
  };
}

interface AuditVulnerability {
  name: string;
  severity: Severity;
  isDirect: boolean;
  via: Array<string | AuditAdvisory>;
  effects: string[];
  range: string;
  nodes: string[];
  fixAvailable: boolean | {
    name: string;
    version: string;
    isSemVerMajor: boolean;
  };
}

interface NpmAuditReport {
  vulnerabilities: Record<string, AuditVulnerability>;
  metadata: {
    vulnerabilities: Record<Severity | 'total', number>;
    dependencies: Record<string, number>;
  };
}

const root = process.cwd();

const runtimeSurfaceHints: Record<string, string[]> = {
  jspdf: ['lib/export/pdf.ts'],
  dompurify: ['app/[locale]/learn/paths/[pathId]/modules/[moduleId]/ModulePlayerClient.tsx'],
  'next-intl': ['i18n/routing.ts', 'i18n/request.ts', 'app/[locale]/layout.tsx'],
  next: ['next.config.ts', 'app/layout.tsx', 'app/[locale]/layout.tsx'],
  postcss: ['postcss.config.mjs', 'app/globals.css'],
  ws: ['incubator/education-sota/lib/api/sota-websocket.ts', 'incubator/education-sota/packages/medical-education-sota/backend/package.json'],
  picomatch: ['eslint.config.mjs', 'package-lock.json'],
  minimatch: ['package-lock.json'],
  'brace-expansion': ['package-lock.json'],
  'styled-components': ['package-lock.json'],
};

function runAudit(): NpmAuditReport {
  try {
    return JSON.parse(execSync('npm audit --json', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }));
  } catch (error) {
    const output = (error as { stdout?: string }).stdout;
    if (!output) throw error;
    return JSON.parse(output);
  }
}

function parseArgs(args: string[]): OutputFormat {
  const formatArg = args.find((arg) => arg.startsWith('--format='));
  if (!formatArg) return 'json';

  const format = formatArg.slice('--format='.length);
  if (format === 'json' || format === 'summary') return format;
  throw new Error(`Unsupported format: ${format}`);
}

function readPackageJson(): {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
} {
  return JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
}

function lockVersion(name: string): string | null {
  const lock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json'), 'utf8')) as {
    packages?: Record<string, { version?: string }>;
  };
  return lock.packages?.[`node_modules/${name}`]?.version || null;
}

function collectAdvisories(vulnerability: AuditVulnerability): AuditAdvisory[] {
  return vulnerability.via.filter((item): item is AuditAdvisory => typeof item !== 'string');
}

function highestSeverityScore(severity: Severity): number {
  return {
    info: 0,
    low: 1,
    moderate: 2,
    high: 3,
    critical: 4,
  }[severity];
}

function classifyFix(vulnerability: AuditVulnerability): string {
  if (!vulnerability.fixAvailable) return 'no_fix_available';
  if (vulnerability.fixAvailable === true) return 'available';
  return vulnerability.fixAvailable.isSemVerMajor ? 'semver_major' : 'semver_compatible';
}

function classifyRisk(name: string, vulnerability: AuditVulnerability): string {
  if (name === 'jspdf') return 'export_pdf_runtime';
  if (name === 'dompurify') return 'xss_sanitization_runtime';
  if (name === 'next') return 'framework_runtime_static_export';
  if (name === 'next-intl') return 'i18n_routing_runtime';
  if (vulnerability.isDirect) return 'direct_dependency';
  return 'transitive_or_tooling_dependency';
}

function classifyRecommendation(name: string, vulnerability: AuditVulnerability): string {
  if (name === 'jspdf') return 'upgrade_in_security_cut_with_pdf_export_regression_tests';
  if (name === 'next') return 'upgrade_next_in_security_cut_then_run_typecheck_lint_verify_build_and_static_export_smoke';
  if (name === 'dompurify') return 'upgrade_direct_dependency_and_smoke_sanitized_learning_module_render';
  if (name === 'next-intl') return 'upgrade_direct_dependency_and_smoke_locale_routing_static_export';
  if (vulnerability.isDirect) return 'upgrade_direct_dependency_after checking peer compatibility';
  return 'refresh_lockfile_or parent_dependency_after direct upgrades';
}

const format = parseArgs(process.argv.slice(2));
const audit = runAudit();
const packageJson = readPackageJson();

const vulnerabilities = Object.values(audit.vulnerabilities)
  .map((vulnerability) => {
    const manifestRange = packageJson.dependencies?.[vulnerability.name] ||
      packageJson.devDependencies?.[vulnerability.name] ||
      null;
    const advisories = collectAdvisories(vulnerability);

    return {
      name: vulnerability.name,
      severity: vulnerability.severity,
      direct: vulnerability.isDirect,
      currentVersion: lockVersion(vulnerability.name),
      manifestRange,
      vulnerableRange: vulnerability.range,
      nodeCount: vulnerability.nodes.length,
      advisoryCount: advisories.length,
      advisories: advisories.map((advisory) => ({
        title: advisory.title,
        severity: advisory.severity,
        range: advisory.range,
        url: advisory.url,
        cwe: advisory.cwe || [],
        cvssScore: advisory.cvss?.score ?? null,
      })),
      fix: classifyFix(vulnerability),
      fixVersion: typeof vulnerability.fixAvailable === 'object' ? vulnerability.fixAvailable.version : null,
      riskClass: classifyRisk(vulnerability.name, vulnerability),
      runtimeSurfaceHints: runtimeSurfaceHints[vulnerability.name] || [],
      recommendation: classifyRecommendation(vulnerability.name, vulnerability),
    };
  })
  .sort((a, b) => {
    const severityDiff = highestSeverityScore(b.severity) - highestSeverityScore(a.severity);
    if (severityDiff) return severityDiff;
    return Number(b.direct) - Number(a.direct) || a.name.localeCompare(b.name);
  });

const directRuntime = vulnerabilities.filter((item) => item.direct);
const semverMajorFixes = vulnerabilities.filter((item) => item.fix === 'semver_major');

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    ...audit.metadata.vulnerabilities,
    vulnerablePackages: vulnerabilities.length,
    directPackages: directRuntime.length,
    semverMajorFixes: semverMajorFixes.length,
    productionDependencies: audit.metadata.dependencies.prod,
    devDependencies: audit.metadata.dependencies.dev,
  },
  vulnerabilities,
  gatesBeforeSecurityCommit: [
    'npm run type-check',
    'npm run lint',
    'npm run verify',
    'npm run build',
    'PDF export smoke test after jspdf upgrade',
    'Locale routing/static export smoke test after next and next-intl upgrades',
    'Sanitized learning-module render smoke test after dompurify upgrade',
  ],
  recommendation: {
    stagingCut: 'Corte 7 - Segurança De Dependencias',
    runAuditFixAutomatically: false,
    rationale: [
      'jspdf requires a semver-major upgrade and is used by client-side PDF export code.',
      'next and next-intl affect routing/static export and should be upgraded with full app gates.',
      'DOMPurify is direct runtime sanitization code and should be upgraded with XSS-sensitive render smoke tests.',
    ],
  },
};

if (format === 'summary') {
  console.log(`total vulnerabilities: ${report.summary.total}`);
  console.log(`critical: ${report.summary.critical}`);
  console.log(`high: ${report.summary.high}`);
  console.log(`moderate: ${report.summary.moderate}`);
  console.log(`direct packages: ${report.summary.directPackages}`);
  console.log(`semver-major fixes: ${report.summary.semverMajorFixes}`);
  console.log(`run audit fix automatically: ${report.recommendation.runAuditFixAutomatically}`);
  for (const item of vulnerabilities) {
    const fix = item.fixVersion ? `${item.fix} -> ${item.fixVersion}` : item.fix;
    console.log(`${item.severity.padEnd(8)} ${item.name.padEnd(18)} direct=${String(item.direct).padEnd(5)} current=${item.currentVersion || 'unknown'} fix=${fix}`);
  }
} else {
  console.log(JSON.stringify(report, null, 2));
}
