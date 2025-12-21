#!/usr/bin/env npx tsx
/**
 * QUALITY MONITORING SCRIPT - DARWIN-MFC
 * ========================================
 *
 * Automated quality checks for medical content, translations, and data integrity.
 * Generates reports on content coverage, citation completeness, and translation quality.
 *
 * Usage:
 *   npx tsx scripts/quality-monitor.ts                    # Full quality report
 *   npx tsx scripts/quality-monitor.ts --check citations  # Check citation coverage
 *   npx tsx scripts/quality-monitor.ts --check diseases   # Check disease data completeness
 *   npx tsx scripts/quality-monitor.ts --check meds       # Check medication data
 *   npx tsx scripts/quality-monitor.ts --check i18n       # Check translation coverage
 *   npx tsx scripts/quality-monitor.ts --json             # Output as JSON
 *
 * Part of Sprint 5: Automation-First Development
 */

import * as fs from 'fs/promises';
import * as path from 'path';

// =============================================================================
// TYPES
// =============================================================================

interface QualityReport {
  timestamp: string;
  summary: {
    totalChecks: number;
    passed: number;
    warnings: number;
    errors: number;
    score: number;
  };
  diseases: DiseaseReport;
  medications: MedicationReport;
  citations: CitationReport;
  translations: TranslationReport;
  calculators: CalculatorReport;
}

interface DiseaseReport {
  total: number;
  complete: number;
  incomplete: number;
  missingFields: Array<{ id: string; fields: string[] }>;
  missingOntology: Array<{ id: string; missing: string[] }>;
  missingCitations: string[];
}

interface MedicationReport {
  total: number;
  complete: number;
  incomplete: number;
  missingFields: Array<{ id: string; fields: string[] }>;
  missingInteractions: string[];
  missingDosing: string[];
}

interface CitationReport {
  totalCitations: number;
  withDOI: number;
  withPMID: number;
  orphanedCitations: string[];
  duplicateCitations: string[];
  yearDistribution: Record<string, number>;
}

interface TranslationReport {
  locales: Record<string, LocaleReport>;
  coverageByFile: Record<string, Record<string, number>>;
}

interface LocaleReport {
  totalKeys: number;
  translatedKeys: number;
  emptyKeys: number;
  coverage: number;
}

interface CalculatorReport {
  total: number;
  withValidation: number;
  withReferences: number;
  withUnits: number;
}

// =============================================================================
// DATA LOADING
// =============================================================================

async function loadModule(modulePath: string): Promise<unknown> {
  try {
    const fullPath = path.resolve(process.cwd(), modulePath);
    return await import(fullPath);
  } catch (error) {
    console.error(`Failed to load ${modulePath}:`, error);
    return null;
  }
}

async function loadJSONFile(filePath: string): Promise<Record<string, unknown> | null> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

async function getFilesInDir(dir: string, extension: string): Promise<string[]> {
  try {
    const files = await fs.readdir(dir);
    return files.filter(f => f.endsWith(extension)).map(f => path.join(dir, f));
  } catch {
    return [];
  }
}

// =============================================================================
// DISEASE QUALITY CHECK
// =============================================================================

const REQUIRED_DISEASE_FIELDS = [
  'id',
  'titulo',
  'categoria',
  'cid10',
  'definicao',
  'quadroClinico',
  'diagnostico',
  'tratamento',
];

const ONTOLOGY_FIELDS = ['cid10', 'ciap2', 'doid', 'snomedCT', 'meshId'];

async function checkDiseases(): Promise<DiseaseReport> {
  const report: DiseaseReport = {
    total: 0,
    complete: 0,
    incomplete: 0,
    missingFields: [],
    missingOntology: [],
    missingCitations: [],
  };

  // Load disease files
  const diseaseDir = path.join(process.cwd(), 'lib/data/doencas');
  const files = await getFilesInDir(diseaseDir, '.ts');

  for (const file of files) {
    if (file.includes('index.ts')) continue;

    try {
      const content = await fs.readFile(file, 'utf-8');

      // Simple extraction of disease objects
      const diseaseMatches = content.matchAll(/export\s+const\s+(\w+)\s*:\s*Doenca\s*=\s*\{/g);

      for (const match of diseaseMatches) {
        report.total++;

        // Extract the disease object (simplified check)
        const startIdx = content.indexOf('{', match.index);
        let braceCount = 1;
        let endIdx = startIdx + 1;

        while (braceCount > 0 && endIdx < content.length) {
          if (content[endIdx] === '{') braceCount++;
          if (content[endIdx] === '}') braceCount--;
          endIdx++;
        }

        const diseaseStr = content.substring(startIdx, endIdx);

        // Check for required fields
        const missingRequired: string[] = [];
        for (const field of REQUIRED_DISEASE_FIELDS) {
          if (!diseaseStr.includes(`${field}:`)) {
            missingRequired.push(field);
          }
        }

        // Check for ontology fields
        const missingOntology: string[] = [];
        for (const field of ONTOLOGY_FIELDS) {
          if (!diseaseStr.includes(`${field}:`)) {
            missingOntology.push(field);
          }
        }

        const id = match[1];

        if (missingRequired.length === 0) {
          report.complete++;
        } else {
          report.incomplete++;
          report.missingFields.push({ id, fields: missingRequired });
        }

        if (missingOntology.length > 2) {
          report.missingOntology.push({ id, missing: missingOntology });
        }

        // Check for citations
        if (!diseaseStr.includes('citacoesInline') && !diseaseStr.includes('referencias')) {
          report.missingCitations.push(id);
        }
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  return report;
}

// =============================================================================
// MEDICATION QUALITY CHECK
// =============================================================================

const REQUIRED_MED_FIELDS = [
  'id',
  'nome',
  'classe',
  'mecanismo',
  'apresentacoes',
  'posologia',
  'contraindicacoes',
  'efeitosAdversos',
];

async function checkMedications(): Promise<MedicationReport> {
  const report: MedicationReport = {
    total: 0,
    complete: 0,
    incomplete: 0,
    missingFields: [],
    missingInteractions: [],
    missingDosing: [],
  };

  const medDir = path.join(process.cwd(), 'lib/data/medicamentos');
  const files = await getFilesInDir(medDir, '.ts');

  for (const file of files) {
    if (file.includes('index.ts')) continue;

    try {
      const content = await fs.readFile(file, 'utf-8');

      // Simple extraction of medication objects
      const medMatches = content.matchAll(/export\s+const\s+(\w+)\s*:\s*Medicamento\s*=\s*\{/g);

      for (const match of medMatches) {
        report.total++;
        const startIdx = content.indexOf('{', match.index);
        let braceCount = 1;
        let endIdx = startIdx + 1;

        while (braceCount > 0 && endIdx < content.length) {
          if (content[endIdx] === '{') braceCount++;
          if (content[endIdx] === '}') braceCount--;
          endIdx++;
        }

        const medStr = content.substring(startIdx, endIdx);
        const id = match[1];

        const missingRequired: string[] = [];
        for (const field of REQUIRED_MED_FIELDS) {
          if (!medStr.includes(`${field}:`)) {
            missingRequired.push(field);
          }
        }

        if (missingRequired.length === 0) {
          report.complete++;
        } else {
          report.incomplete++;
          report.missingFields.push({ id, fields: missingRequired });
        }

        if (!medStr.includes('interacoes')) {
          report.missingInteractions.push(id);
        }

        if (!medStr.includes('ajusteRenal') && !medStr.includes('pediatrica')) {
          report.missingDosing.push(id);
        }
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  return report;
}

// =============================================================================
// CITATION QUALITY CHECK
// =============================================================================

async function checkCitations(): Promise<CitationReport> {
  const report: CitationReport = {
    totalCitations: 0,
    withDOI: 0,
    withPMID: 0,
    orphanedCitations: [],
    duplicateCitations: [],
    yearDistribution: {},
  };

  const referencesFile = path.join(process.cwd(), 'lib/data/references.ts');

  try {
    const content = await fs.readFile(referencesFile, 'utf-8');

    // Count citations with DOI
    const doiMatches = content.match(/doi:\s*['"][^'"]+['"]/g) || [];
    report.withDOI = doiMatches.length;

    // Count citations with PMID
    const pmidMatches = content.match(/pmid:\s*['"]?\d+['"]?/g) || [];
    report.withPMID = pmidMatches.length;

    // Extract years
    const yearMatches = content.match(/year:\s*['"]?(\d{4})['"]?/g) || [];
    for (const match of yearMatches) {
      const year = match.match(/(\d{4})/)?.[1];
      if (year) {
        report.yearDistribution[year] = (report.yearDistribution[year] || 0) + 1;
        report.totalCitations++;
      }
    }

    // Check for duplicate titles
    const titleMatches = content.match(/title:\s*['"]([^'"]+)['"]/g) || [];
    const titles = titleMatches.map(t => t.replace(/title:\s*['"]/, '').replace(/['"]$/, ''));
    const seen = new Set<string>();
    for (const title of titles) {
      const normalized = title.toLowerCase().trim();
      if (seen.has(normalized)) {
        report.duplicateCitations.push(title);
      } else {
        seen.add(normalized);
      }
    }
  } catch (error) {
    console.error('Error checking citations:', error);
  }

  return report;
}

// =============================================================================
// TRANSLATION QUALITY CHECK
// =============================================================================

const SUPPORTED_LOCALES = ['pt', 'en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi'];

function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
    } else if (typeof value === 'string') {
      result[newKey] = value;
    }
  }

  return result;
}

async function checkTranslations(): Promise<TranslationReport> {
  const report: TranslationReport = {
    locales: {},
    coverageByFile: {},
  };

  const messagesDir = path.join(process.cwd(), 'messages');
  const sourceLocale = 'pt';
  const sourceDir = path.join(messagesDir, sourceLocale);

  // Get all source files
  const sourceFiles = await getFilesInDir(sourceDir, '.json');

  for (const sourceFile of sourceFiles) {
    const filename = path.basename(sourceFile);
    const sourceContent = await loadJSONFile(sourceFile);
    if (!sourceContent) continue;

    const sourceFlat = flattenObject(sourceContent);
    const sourceKeyCount = Object.keys(sourceFlat).length;

    report.coverageByFile[filename] = {};
    report.coverageByFile[filename][sourceLocale] = 100;

    for (const locale of SUPPORTED_LOCALES) {
      if (locale === sourceLocale) continue;

      const targetFile = path.join(messagesDir, locale, filename);
      const targetContent = await loadJSONFile(targetFile);

      if (!targetContent) {
        if (!report.locales[locale]) {
          report.locales[locale] = {
            totalKeys: 0,
            translatedKeys: 0,
            emptyKeys: 0,
            coverage: 0,
          };
        }
        report.coverageByFile[filename][locale] = 0;
        continue;
      }

      const targetFlat = flattenObject(targetContent);
      const translatedCount = Object.keys(targetFlat).filter(k =>
        sourceFlat[k] && targetFlat[k] && targetFlat[k].trim() !== ''
      ).length;
      const emptyCount = Object.values(targetFlat).filter(v => !v || v.trim() === '').length;

      if (!report.locales[locale]) {
        report.locales[locale] = {
          totalKeys: 0,
          translatedKeys: 0,
          emptyKeys: 0,
          coverage: 0,
        };
      }

      report.locales[locale].totalKeys += sourceKeyCount;
      report.locales[locale].translatedKeys += translatedCount;
      report.locales[locale].emptyKeys += emptyCount;

      const coverage = sourceKeyCount > 0 ? Math.round((translatedCount / sourceKeyCount) * 100) : 0;
      report.coverageByFile[filename][locale] = coverage;
    }
  }

  // Calculate overall coverage
  for (const locale of Object.keys(report.locales)) {
    const loc = report.locales[locale];
    loc.coverage = loc.totalKeys > 0 ? Math.round((loc.translatedKeys / loc.totalKeys) * 100) : 0;
  }

  return report;
}

// =============================================================================
// CALCULATOR QUALITY CHECK
// =============================================================================

async function checkCalculators(): Promise<CalculatorReport> {
  const report: CalculatorReport = {
    total: 0,
    withValidation: 0,
    withReferences: 0,
    withUnits: 0,
  };

  const calculatorsFile = path.join(process.cwd(), 'lib/utils/calculators.ts');

  try {
    const content = await fs.readFile(calculatorsFile, 'utf-8');

    // Count calculator definitions
    const calcMatches = content.match(/export\s+(function|const)\s+calc\w+/g) || [];
    report.total = calcMatches.length;

    // Check for validation patterns
    const validationMatches = content.match(/(if\s*\(|throw\s+new\s+Error|isNaN|!= null)/g) || [];
    report.withValidation = Math.min(report.total, Math.floor(validationMatches.length / 2));

    // Check for reference comments
    const refMatches = content.match(/(\/\/\s*Reference:|@see|Source:|Formula:)/gi) || [];
    report.withReferences = Math.min(report.total, refMatches.length);

    // Check for unit handling
    const unitMatches = content.match(/(kg|cm|mmHg|mg\/dL|mmol\/L|mL\/min)/g) || [];
    report.withUnits = unitMatches.length > 0 ? report.total : 0;
  } catch (error) {
    console.error('Error checking calculators:', error);
  }

  return report;
}

// =============================================================================
// REPORT GENERATION
// =============================================================================

function calculateScore(report: QualityReport): number {
  let score = 100;

  // Diseases (30% weight)
  const diseaseScore = report.diseases.total > 0
    ? (report.diseases.complete / report.diseases.total) * 100
    : 0;
  score -= (100 - diseaseScore) * 0.3;

  // Medications (25% weight)
  const medScore = report.medications.total > 0
    ? (report.medications.complete / report.medications.total) * 100
    : 0;
  score -= (100 - medScore) * 0.25;

  // Citations (20% weight)
  const citationScore = report.citations.totalCitations > 0
    ? ((report.citations.withDOI + report.citations.withPMID) /
       (report.citations.totalCitations * 2)) * 100
    : 0;
  score -= (100 - citationScore) * 0.2;

  // Translations (25% weight)
  const locales = Object.values(report.translations.locales);
  const avgTranslation = locales.length > 0
    ? locales.reduce((sum, l) => sum + l.coverage, 0) / locales.length
    : 0;
  score -= (100 - avgTranslation) * 0.25;

  return Math.max(0, Math.round(score));
}

function printReport(report: QualityReport, asJson: boolean) {
  if (asJson) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log('\n' + '='.repeat(60));
  console.log('DARWIN-MFC QUALITY REPORT');
  console.log('='.repeat(60));
  console.log(`Generated: ${report.timestamp}`);
  console.log(`Overall Score: ${report.summary.score}/100`);
  console.log();

  // Summary
  console.log('SUMMARY');
  console.log('-'.repeat(40));
  console.log(`Total Checks: ${report.summary.totalChecks}`);
  console.log(`Passed: ${report.summary.passed}`);
  console.log(`Warnings: ${report.summary.warnings}`);
  console.log(`Errors: ${report.summary.errors}`);
  console.log();

  // Diseases
  console.log('DISEASES');
  console.log('-'.repeat(40));
  console.log(`Total: ${report.diseases.total}`);
  console.log(`Complete: ${report.diseases.complete} (${Math.round(report.diseases.complete / Math.max(1, report.diseases.total) * 100)}%)`);
  if (report.diseases.missingFields.length > 0) {
    console.log(`Incomplete: ${report.diseases.incomplete}`);
    console.log('  Missing fields in:');
    report.diseases.missingFields.slice(0, 5).forEach(d =>
      console.log(`    - ${d.id}: ${d.fields.join(', ')}`)
    );
    if (report.diseases.missingFields.length > 5) {
      console.log(`    ... and ${report.diseases.missingFields.length - 5} more`);
    }
  }
  if (report.diseases.missingCitations.length > 0) {
    console.log(`Missing citations: ${report.diseases.missingCitations.length}`);
  }
  console.log();

  // Medications
  console.log('MEDICATIONS');
  console.log('-'.repeat(40));
  console.log(`Total: ${report.medications.total}`);
  console.log(`Complete: ${report.medications.complete} (${Math.round(report.medications.complete / Math.max(1, report.medications.total) * 100)}%)`);
  if (report.medications.missingInteractions.length > 0) {
    console.log(`Missing interactions: ${report.medications.missingInteractions.length}`);
  }
  console.log();

  // Citations
  console.log('CITATIONS');
  console.log('-'.repeat(40));
  console.log(`Total: ${report.citations.totalCitations}`);
  console.log(`With DOI: ${report.citations.withDOI} (${Math.round(report.citations.withDOI / Math.max(1, report.citations.totalCitations) * 100)}%)`);
  console.log(`With PMID: ${report.citations.withPMID} (${Math.round(report.citations.withPMID / Math.max(1, report.citations.totalCitations) * 100)}%)`);
  if (report.citations.duplicateCitations.length > 0) {
    console.log(`Duplicates found: ${report.citations.duplicateCitations.length}`);
  }
  console.log();

  // Translations
  console.log('TRANSLATIONS');
  console.log('-'.repeat(40));
  const locales = Object.entries(report.translations.locales);
  for (const [locale, data] of locales) {
    const bar = '█'.repeat(Math.floor(data.coverage / 10)) + '░'.repeat(10 - Math.floor(data.coverage / 10));
    console.log(`${locale.padEnd(3)} ${bar} ${data.coverage}%`);
  }
  console.log();

  // Calculators
  console.log('CALCULATORS');
  console.log('-'.repeat(40));
  console.log(`Total: ${report.calculators.total}`);
  console.log(`With validation: ${report.calculators.withValidation}`);
  console.log(`With references: ${report.calculators.withReferences}`);
  console.log();

  console.log('='.repeat(60));
}

// =============================================================================
// CLI
// =============================================================================

function printUsage() {
  console.log(`
Darwin-MFC Quality Monitor

Usage:
  npx tsx scripts/quality-monitor.ts [options]

Options:
  --check <type>   Run specific check: diseases, meds, citations, i18n, calc
  --json           Output as JSON
  --help           Show this help

Examples:
  npx tsx scripts/quality-monitor.ts              # Full quality report
  npx tsx scripts/quality-monitor.ts --check i18n # Check translations only
  npx tsx scripts/quality-monitor.ts --json       # Output as JSON for CI
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  const asJson = args.includes('--json');
  const checkArg = args.includes('--check')
    ? args[args.indexOf('--check') + 1]
    : null;

  console.log('\nDarwin-MFC Quality Monitor\n');
  console.log('Running quality checks...\n');

  const report: QualityReport = {
    timestamp: new Date().toISOString(),
    summary: {
      totalChecks: 0,
      passed: 0,
      warnings: 0,
      errors: 0,
      score: 0,
    },
    diseases: {
      total: 0,
      complete: 0,
      incomplete: 0,
      missingFields: [],
      missingOntology: [],
      missingCitations: [],
    },
    medications: {
      total: 0,
      complete: 0,
      incomplete: 0,
      missingFields: [],
      missingInteractions: [],
      missingDosing: [],
    },
    citations: {
      totalCitations: 0,
      withDOI: 0,
      withPMID: 0,
      orphanedCitations: [],
      duplicateCitations: [],
      yearDistribution: {},
    },
    translations: {
      locales: {},
      coverageByFile: {},
    },
    calculators: {
      total: 0,
      withValidation: 0,
      withReferences: 0,
      withUnits: 0,
    },
  };

  // Run checks based on arguments
  if (!checkArg || checkArg === 'diseases') {
    console.log('Checking diseases...');
    report.diseases = await checkDiseases();
    report.summary.totalChecks += report.diseases.total;
    report.summary.passed += report.diseases.complete;
    report.summary.warnings += report.diseases.missingOntology.length;
    report.summary.errors += report.diseases.missingFields.length;
  }

  if (!checkArg || checkArg === 'meds') {
    console.log('Checking medications...');
    report.medications = await checkMedications();
    report.summary.totalChecks += report.medications.total;
    report.summary.passed += report.medications.complete;
    report.summary.warnings += report.medications.missingInteractions.length;
    report.summary.errors += report.medications.missingFields.length;
  }

  if (!checkArg || checkArg === 'citations') {
    console.log('Checking citations...');
    report.citations = await checkCitations();
    report.summary.totalChecks += report.citations.totalCitations;
    report.summary.passed += report.citations.withDOI + report.citations.withPMID;
    report.summary.warnings += report.citations.duplicateCitations.length;
  }

  if (!checkArg || checkArg === 'i18n') {
    console.log('Checking translations...');
    report.translations = await checkTranslations();
    const localeCount = Object.keys(report.translations.locales).length;
    report.summary.totalChecks += localeCount;
    for (const locale of Object.values(report.translations.locales)) {
      if (locale.coverage >= 90) report.summary.passed++;
      else if (locale.coverage >= 70) report.summary.warnings++;
      else report.summary.errors++;
    }
  }

  if (!checkArg || checkArg === 'calc') {
    console.log('Checking calculators...');
    report.calculators = await checkCalculators();
    report.summary.totalChecks += report.calculators.total;
    report.summary.passed += report.calculators.withValidation;
  }

  // Calculate overall score
  report.summary.score = calculateScore(report);

  // Print report
  printReport(report, asJson);

  // Exit with error code if score is below threshold
  if (report.summary.errors > 0 && report.summary.score < 70) {
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
