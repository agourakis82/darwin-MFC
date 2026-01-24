/**
 * Validate Translations - 6-Stage Validation Pipeline
 *
 * Validates translated medical content through multiple quality gates:
 * 1. Structure: JSON integrity, field count match
 * 2. Completeness: No empty fields, no untranslated text
 * 3. Citations: Preserve [1,2,3] markers exactly
 * 4. Ontologies: Medical codes unchanged (zero tolerance)
 * 5. Terminology: Check against medical glossaries
 * 6. RTL: Arabic-specific bidi checks
 */

import fs from 'fs/promises';
import path from 'path';

interface ValidationResult {
  itemId: string;
  locale: string;
  contentType: 'medication' | 'disease' | 'clinical_case' | 'flashcard' | 'quiz';
  valid: boolean;
  score: number; // 0-100
  issues: ValidationIssue[];
  warnings: string[];
  metadata: {
    structureValid: boolean;
    completeValid: boolean;
    citationsValid: boolean;
    ontologyValid: boolean;
    terminologyScore: number;
    rtlValid: boolean;
  };
}

interface ValidationIssue {
  stage: 'structure' | 'completeness' | 'citations' | 'ontology' | 'terminology' | 'rtl';
  severity: 'error' | 'warning';
  message: string;
  field?: string;
  value?: any;
}

class TranslationValidator {
  private glossary: Record<string, any> = {};
  private sourceData: Record<string, any> = {};

  constructor() {}

  /**
   * Load medical glossaries for terminology validation
   */
  async loadGlossaries(): Promise<void> {
    try {
      const glossaryPath = path.join(
        process.cwd(),
        'lib/content-generation/glossaries/medical-terms.json'
      );
      const glossaryContent = await fs.readFile(glossaryPath, 'utf-8');
      this.glossary = JSON.parse(glossaryContent);
      console.log('✓ Loaded medical glossary');
    } catch (error) {
      console.warn('⚠️  Could not load glossary:', error);
      this.glossary = { glossary: {} };
    }
  }

  /**
   * Stage 1: Structure Validation
   * - JSON integrity
   * - Field count match
   * - Required fields present
   */
  private validateStructure(
    translation: any,
    source: any,
    contentType: string
  ): { valid: boolean; issues: ValidationIssue[] } {
    const issues: ValidationIssue[] = [];

    // Check if translation is valid JSON object
    if (typeof translation !== 'object' || translation === null) {
      issues.push({
        stage: 'structure',
        severity: 'error',
        message: `Translation is not a valid object (type: ${typeof translation})`
      });
      return { valid: false, issues };
    }

    // Check if translation has expected structure
    if (!source || typeof source !== 'object') {
      issues.push({
        stage: 'structure',
        severity: 'error',
        message: 'Source is not a valid object'
      });
      return { valid: false, issues };
    }

    // Check field count (allow +/- 5% variance for edge cases)
    const sourceKeys = Object.keys(source);
    const translationKeys = Object.keys(translation);
    const variance = Math.abs(sourceKeys.length - translationKeys.length) / sourceKeys.length;

    if (variance > 0.05) {
      issues.push({
        stage: 'structure',
        severity: 'error',
        message: `Field count mismatch: source=${sourceKeys.length}, translation=${translationKeys.length}`,
        value: { sourceCount: sourceKeys.length, translationCount: translationKeys.length }
      });
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  /**
   * Stage 2: Completeness Validation
   * - No empty fields
   * - No untranslated text (similarity check)
   * - All required fields present
   */
  private validateCompleteness(
    translation: any,
    source: any,
    locale: string
  ): { valid: boolean; issues: ValidationIssue[] } {
    const issues: ValidationIssue[] = [];

    for (const [key, value] of Object.entries(translation)) {
      if (typeof value === 'string') {
        // Check for empty strings
        if (value.trim() === '') {
          issues.push({
            stage: 'completeness',
            severity: 'error',
            message: `Empty field: ${key}`,
            field: key,
            value
          });
          continue;
        }

        // Check for very short translations (likely untranslated)
        if (value.length < 3) {
          issues.push({
            stage: 'completeness',
            severity: 'warning',
            message: `Suspiciously short translation: ${key}`,
            field: key,
            value
          });
        }

        // Check for untranslated Portuguese (similarity check)
        const sourceValue = source[key];
        if (sourceValue && typeof sourceValue === 'string' && locale !== 'pt') {
          const similarity = this.calculateSimilarity(value, sourceValue);
          if (similarity > 0.9) {
            issues.push({
              stage: 'completeness',
              severity: 'error',
              message: `Likely untranslated (${(similarity * 100).toFixed(1)}% similarity to Portuguese): ${key}`,
              field: key,
              value
            });
          }
        }
      }
    }

    return {
      valid: issues.filter((i) => i.severity === 'error').length === 0,
      issues
    };
  }

  /**
   * Stage 3: Citation Preservation
   * - [1,2,3] markers preserved exactly
   * - Citation count matches
   */
  private validateCitations(
    translation: any,
    source: any
  ): { valid: boolean; issues: ValidationIssue[] } {
    const issues: ValidationIssue[] = [];
    const citationRegex = /\[\d+(,\s*\d+)*\]/g;

    for (const [key, translationValue] of Object.entries(translation)) {
      if (typeof translationValue === 'string') {
        const sourceValue = source[key];
        if (sourceValue && typeof sourceValue === 'string') {
          const sourceCitations = sourceValue.match(citationRegex) || [];
          const translatedCitations = (translationValue as string).match(citationRegex) || [];

          if (!this.arraysEqual(sourceCitations, translatedCitations)) {
            issues.push({
              stage: 'citations',
              severity: 'error',
              message: `Citation markers not preserved: ${key}`,
              field: key,
              value: {
                expected: sourceCitations,
                found: translatedCitations
              }
            });
          }
        }
      }
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  /**
   * Stage 4: Ontology Integrity
   * - Medical codes NEVER translated (zero tolerance)
   * - atcCode, cid10, cid11, snomedCT, loinc unchanged
   */
  private validateOntologies(
    translation: any,
    source: any
  ): { valid: boolean; issues: ValidationIssue[] } {
    const issues: ValidationIssue[] = [];
    const ontologyFields = [
      'id',
      'atcCode',
      'snomedCT',
      'rxNormCui',
      'anvisaRegistro',
      'cid10',
      'cid11',
      'loincCodes',
      'icd10',
      'ciap2',
      'citations',
      'references'
    ];

    for (const ontologyField of ontologyFields) {
      if (translation[ontologyField] !== source[ontologyField]) {
        issues.push({
          stage: 'ontology',
          severity: 'error',
          message: `Ontology code changed (ZERO TOLERANCE): ${ontologyField}`,
          field: ontologyField,
          value: {
            expected: source[ontologyField],
            found: translation[ontologyField]
          }
        });
      }
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  /**
   * Stage 5: Medical Terminology Validation
   * - Check against glossaries
   * - Flag unknown medical terms
   */
  private validateTerminology(
    translation: any,
    locale: string
  ): { valid: boolean; issues: ValidationIssue[]; score: number } {
    const issues: ValidationIssue[] = [];
    const glossaryTerms = this.glossary.glossary || {};

    let validTerms = 0;
    let totalTerms = 0;

    for (const [key, value] of Object.entries(translation)) {
      if (typeof value === 'string' && key !== 'id') {
        // Check if field contains medical terms from glossary
        const words = value.toLowerCase().split(/\s+/);
        for (const word of words) {
          if (word.length > 4) { // Skip short words
            totalTerms++;
            // Simplified check - in production would use fuzzy matching
            if (this.isMedicalTerm(word, glossaryTerms, locale)) {
              validTerms++;
            }
          }
        }
      }
    }

    const score = totalTerms > 0 ? (validTerms / totalTerms) * 100 : 100;

    if (score < 70 && totalTerms > 10) {
      issues.push({
        stage: 'terminology',
        severity: 'warning',
        message: `Low medical terminology score: ${score.toFixed(1)}%`,
        value: { validTerms, totalTerms }
      });
    }

    return {
      valid: score >= 60,
      issues,
      score
    };
  }

  /**
   * Stage 6: RTL Support (Arabic)
   * - Bidi isolation for Latin text
   * - Proper character mixing
   */
  private validateRTL(translation: any, locale: string): { valid: boolean; issues: ValidationIssue[] } {
    const issues: ValidationIssue[] = [];

    if (locale !== 'ar') {
      return { valid: true, issues };
    }

    // Check for proper RTL content
    for (const [key, value] of Object.entries(translation)) {
      if (typeof value === 'string') {
        const arabicCount = (value.match(/[\u0600-\u06FF]/g) || []).length;
        const latinCount = (value.match(/[a-zA-Z0-9]/g) || []).length;

        // Arabic medical text should have >80% Arabic characters
        const totalChars = arabicCount + latinCount;
        if (totalChars > 10 && arabicCount / totalChars < 0.8) {
          issues.push({
            stage: 'rtl',
            severity: 'warning',
            message: `Low Arabic character ratio in RTL text: ${key}`,
            field: key,
            value: {
              arabicRatio: (arabicCount / totalChars * 100).toFixed(1) + '%'
            }
          });
        }

        // Check for proper isolation of numbers/codes (should use bidi isolation)
        if (latinCount > 0 && !value.includes('\u2067') && !value.includes('\u202E')) {
          // Only warn if there are important codes mixed
          if (/[A-Z]{2,}|[0-9]{3,}/.test(value)) {
            issues.push({
              stage: 'rtl',
              severity: 'warning',
              message: `Consider bidi isolation for codes in: ${key}`,
              field: key
            });
          }
        }
      }
    }

    return {
      valid: issues.filter((i) => i.severity === 'error').length === 0,
      issues
    };
  }

  /**
   * Main validation orchestrator
   */
  async validate(
    translation: any,
    source: any,
    itemId: string,
    locale: string,
    contentType: 'medication' | 'disease' | 'clinical_case' | 'flashcard' | 'quiz'
  ): Promise<ValidationResult> {
    const issues: ValidationIssue[] = [];
    const warnings: string[] = [];

    // Stage 1: Structure
    const structureResult = this.validateStructure(translation, source, contentType);
    if (!structureResult.valid) {
      issues.push(...structureResult.issues);
    }

    // Stage 2: Completeness
    const completenessResult = this.validateCompleteness(translation, source, locale);
    issues.push(...completenessResult.issues);

    // Stage 3: Citations
    const citationsResult = this.validateCitations(translation, source);
    issues.push(...citationsResult.issues);

    // Stage 4: Ontologies
    const ontologyResult = this.validateOntologies(translation, source);
    issues.push(...ontologyResult.issues);

    // Stage 5: Terminology
    const terminologyResult = this.validateTerminology(translation, locale);
    issues.push(...terminologyResult.issues);

    // Stage 6: RTL
    const rtlResult = this.validateRTL(translation, locale);
    issues.push(...rtlResult.issues);

    // Calculate overall score (100 = no errors, weighted by stage importance)
    const errorCount = issues.filter((i) => i.severity === 'error').length;
    const warningCount = issues.filter((i) => i.severity === 'warning').length;
    const score = Math.max(0, 100 - errorCount * 5 - warningCount * 2 + terminologyResult.score / 10);

    return {
      itemId,
      locale,
      contentType,
      valid: score >= 80 && ontologyResult.valid && structureResult.valid,
      score: Math.min(100, score),
      issues,
      warnings,
      metadata: {
        structureValid: structureResult.valid,
        completeValid: completenessResult.valid,
        citationsValid: citationsResult.valid,
        ontologyValid: ontologyResult.valid,
        terminologyScore: terminologyResult.score,
        rtlValid: rtlResult.valid
      }
    };
  }

  /**
   * Helper: Calculate string similarity (Levenshtein distance)
   */
  private calculateSimilarity(a: string, b: string): number {
    const shorter = a.length < b.length ? a : b;
    const longer = a.length < b.length ? b : a;

    if (longer.length === 0) return 1.0;

    const editDistance = this.levenshteinDistance(shorter, longer);
    return 1 - editDistance / longer.length;
  }

  private levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = Array(a.length + 1)
      .fill(null)
      .map(() => Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    return matrix[a.length][b.length];
  }

  private arraysEqual(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((val, idx) => val === b[idx]);
  }

  private isMedicalTerm(word: string, glossaryTerms: Record<string, any>, locale: string): boolean {
    // Check if word exists in glossary for this locale
    for (const termKey in glossaryTerms) {
      const termData = glossaryTerms[termKey];
      if (termData && termData[locale]) {
        const translatedTerm = (termData[locale] as string).toLowerCase();
        if (translatedTerm.includes(word) || word === translatedTerm.split(' ')[0]) {
          return true;
        }
      }
    }
    return false;
  }
}

/**
 * Generate validation report
 */
async function generateValidationReport(
  results: ValidationResult[],
  outputPath: string
): Promise<void> {
  const report = {
    timestamp: new Date().toISOString(),
    totalItems: results.length,
    validItems: results.filter((r) => r.valid).length,
    averageScore: (results.reduce((sum, r) => sum + r.score, 0) / results.length).toFixed(1),
    byContentType: {
      medication: {
        total: results.filter((r) => r.contentType === 'medication').length,
        valid: results.filter((r) => r.contentType === 'medication' && r.valid).length
      },
      disease: {
        total: results.filter((r) => r.contentType === 'disease').length,
        valid: results.filter((r) => r.contentType === 'disease' && r.valid).length
      },
      clinical_case: {
        total: results.filter((r) => r.contentType === 'clinical_case').length,
        valid: results.filter((r) => r.contentType === 'clinical_case' && r.valid).length
      },
      flashcard: {
        total: results.filter((r) => r.contentType === 'flashcard').length,
        valid: results.filter((r) => r.contentType === 'flashcard' && r.valid).length
      },
      quiz: {
        total: results.filter((r) => r.contentType === 'quiz').length,
        valid: results.filter((r) => r.contentType === 'quiz' && r.valid).length
      }
    },
    issues: {
      critical: results.filter((r) => r.issues.some((i) => i.severity === 'error')).length,
      warnings: results.filter((r) => r.issues.some((i) => i.severity === 'warning')).length
    },
    details: results
  };

  await fs.writeFile(outputPath, JSON.stringify(report, null, 2));
  console.log(`✓ Validation report saved to ${outputPath}`);
}

// CLI execution
if (require.main === module) {
  (async () => {
    console.log('🔍 Initializing translation validator...');
    const validator = new TranslationValidator();
    await validator.loadGlossaries();

    // Example validation (would be called from orchestrator)
    console.log('✓ Validator ready for use');
    console.log('Usage: import { TranslationValidator } from "./validate-translations"');
  })().catch(console.error);
}

export { TranslationValidator, ValidationResult, ValidationIssue };
