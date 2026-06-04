import {
  allCalculators,
  canCalculateClinically,
  getCalculatorClinicalDisclaimer,
  getClinicalIntelligenceCalculators,
  getVisibleCalculatorIds,
} from '../lib/calculators';

type OutputFormat = 'json' | 'summary';

interface AuditIssue {
  severity: 'error' | 'warning';
  id: string;
  message: string;
}

function parseFormat(args: string[]): OutputFormat {
  const formatArg = args.find((arg) => arg.startsWith('--format='));
  if (!formatArg) return 'summary';

  const format = formatArg.slice('--format='.length);
  if (format === 'json' || format === 'summary') return format;

  throw new Error(`Unsupported format: ${format}`);
}

const format = parseFormat(process.argv.slice(2));
const visibleIds = new Set(getVisibleCalculatorIds());
const clinicalIntelligence = getClinicalIntelligenceCalculators();
const visibleClinicalIntelligence = clinicalIntelligence.filter((calculator) =>
  visibleIds.has(calculator.id)
);
const hiddenClinicalIntelligence = clinicalIntelligence.filter((calculator) =>
  !visibleIds.has(calculator.id)
);
const issues: AuditIssue[] = [];

for (const calculator of clinicalIntelligence) {
  if (calculator.versionYear !== 2026) {
    issues.push({
      severity: 'error',
      id: calculator.id,
      message: 'Clinical intelligence calculator must declare versionYear: 2026.',
    });
  }

  if (!calculator.evidenceLevel) {
    issues.push({
      severity: 'error',
      id: calculator.id,
      message: 'Clinical intelligence calculator must declare evidenceLevel.',
    });
  }

  if (!calculator.clinicalUse) {
    issues.push({
      severity: 'error',
      id: calculator.id,
      message: 'Clinical intelligence calculator must declare clinicalUse.',
    });
  }

  if (!calculator.disclaimer && !getCalculatorClinicalDisclaimer(calculator)) {
    issues.push({
      severity: 'error',
      id: calculator.id,
      message: 'Clinical intelligence calculator must have a disclaimer fallback.',
    });
  }

  if (calculator.evidenceLevel === 'prototype' && visibleIds.has(calculator.id)) {
    issues.push({
      severity: 'error',
      id: calculator.id,
      message: 'Prototype calculators must not be exposed in the hub or SSG params.',
    });
  }

  if (calculator.evidenceLevel === 'prototype' && canCalculateClinically(calculator)) {
    issues.push({
      severity: 'error',
      id: calculator.id,
      message: 'Prototype calculators must not calculate clinically.',
    });
  }

  if (calculator.requiresBackend && canCalculateClinically(calculator)) {
    issues.push({
      severity: 'error',
      id: calculator.id,
      message: 'Backend-dependent calculators must not calculate when the clinical backend is unavailable.',
    });
  }

  if (calculator.evidenceLevel === 'validated' && !calculator.validationStudy) {
    issues.push({
      severity: 'warning',
      id: calculator.id,
      message: 'Validated calculators should reference a validation study.',
    });
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    totalCalculators: allCalculators.length,
    clinicalIntelligenceCount: clinicalIntelligence.length,
    visibleClinicalIntelligenceCount: visibleClinicalIntelligence.length,
    hiddenClinicalIntelligenceCount: hiddenClinicalIntelligence.length,
    visiblePrototypeCount: clinicalIntelligence.filter(
      (calculator) => calculator.evidenceLevel === 'prototype' && visibleIds.has(calculator.id)
    ).length,
    backendCalculableWithoutConfigCount: clinicalIntelligence.filter(
      (calculator) => calculator.requiresBackend && canCalculateClinically(calculator)
    ).length,
    errors: issues.filter((issue) => issue.severity === 'error').length,
    warnings: issues.filter((issue) => issue.severity === 'warning').length,
  },
  visibleClinicalIntelligence: visibleClinicalIntelligence.map((calculator) => ({
    id: calculator.id,
    evidenceLevel: calculator.evidenceLevel,
    clinicalUse: calculator.clinicalUse,
    requiresBackend: calculator.requiresBackend ?? false,
    canCalculate: canCalculateClinically(calculator),
  })),
  hiddenClinicalIntelligence: hiddenClinicalIntelligence.map((calculator) => ({
    id: calculator.id,
    evidenceLevel: calculator.evidenceLevel,
    clinicalUse: calculator.clinicalUse,
    requiresBackend: calculator.requiresBackend ?? false,
    canCalculate: canCalculateClinically(calculator),
  })),
  issues,
};

if (format === 'json') {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`clinical intelligence calculators: ${report.summary.clinicalIntelligenceCount}`);
  console.log(`visible: ${report.summary.visibleClinicalIntelligenceCount}`);
  console.log(`hidden: ${report.summary.hiddenClinicalIntelligenceCount}`);
  console.log(`visible prototypes: ${report.summary.visiblePrototypeCount}`);
  console.log(`backend calculable without config: ${report.summary.backendCalculableWithoutConfigCount}`);
  console.log(`errors: ${report.summary.errors}`);
  console.log(`warnings: ${report.summary.warnings}`);

  for (const issue of issues) {
    console.log(`${issue.severity.toUpperCase()} [${issue.id}] ${issue.message}`);
  }
}

if (report.summary.errors > 0) {
  process.exitCode = 1;
}
