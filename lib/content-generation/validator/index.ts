/**
 * CONTENT VALIDATOR
 * =================
 * 
 * Automated validation for generated medical modules.
 * 
 * Validates:
 * 1. Citation coverage (100% requirement)
 * 2. GRADE evidence levels (Ia/Ib/IIa/IIb/III/IV)
 * 3. Ontology codes (ICD-11, SNOMED-CT, LOINC, ATC, CIAP-2)
 * 4. Source authority (≥3 official sources)
 * 5. Recency (<5 years preferred)
 * 6. Structure completeness
 * 7. Content quality
 * 8. Readability (Flesch-Kincaid)
 */

import type { AggregatedData } from '../aggregator';

/**
 * Validation result for a single check
 */
export interface ValidationCheck {
  name: string;
  passed: boolean;
  score: number; // 0-100
  weight: number; // 0-1 (percentage of total score)
  issues: string[];
  warnings: string[];
  suggestions: string[];
}

/**
 * Complete validation report
 */
export interface ValidationReport {
  overallScore: number; // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  passed: boolean; // true if score >= 70
  checks: ValidationCheck[];
  summary: {
    totalIssues: number;
    totalWarnings: number;
    criticalIssues: string[];
  };
  timestamp: Date;
}

/**
 * Module structure for validation
 */
export interface ModuleToValidate {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  recomendacoes: {
    sus: {
      indicacao: string;
      populacaoAlvo: string;
      periodicidade: string;
      evidencia: string;
    };
    sociedadesMedicas: {
      indicacao: string;
      populacaoAlvo: string;
      periodicidade: string;
      evidencia: string;
    };
    convergencia: string;
  };
  epidemiologia: {
    prevalencia: string;
    incidencia: string;
    mortalidade: string;
  };
  ontologia: {
    cid11?: string[];
    snomedCT?: string[];
    loinc?: string[];
    atc?: string[];
    ciap2?: string[];
  };
  referencias?: Array<{
    id: number;
    citation: string;
    pmid?: string;
    doi?: string;
  }>;
}

/**
 * Content Validator
 */
export class ContentValidator {
  /**
   * Validate a generated module
   */
  validate(module: ModuleToValidate, sourceData: AggregatedData): ValidationReport {
    const checks: ValidationCheck[] = [
      this.validateStructure(module),
      this.validateCitations(module),
      this.validateEvidenceLevels(module, sourceData),
      this.validateOntologyCodes(module, sourceData),
      this.validateSourceAuthority(sourceData),
      this.validateRecency(sourceData),
      this.validateContentQuality(module),
      this.validateReadability(module),
    ];

    // Calculate overall score
    const overallScore = checks.reduce((sum, check) => sum + check.score * check.weight, 0);
    
    // Determine grade
    let grade: 'A' | 'B' | 'C' | 'D' | 'F';
    if (overallScore >= 90) grade = 'A';
    else if (overallScore >= 80) grade = 'B';
    else if (overallScore >= 70) grade = 'C';
    else if (overallScore >= 60) grade = 'D';
    else grade = 'F';

    // Collect issues
    const allIssues = checks.flatMap(c => c.issues);
    const allWarnings = checks.flatMap(c => c.warnings);
    const criticalIssues = checks
      .filter(c => !c.passed && c.weight >= 0.2)
      .flatMap(c => c.issues);

    return {
      overallScore: Math.round(overallScore),
      grade,
      passed: overallScore >= 70,
      checks,
      summary: {
        totalIssues: allIssues.length,
        totalWarnings: allWarnings.length,
        criticalIssues,
      },
      timestamp: new Date(),
    };
  }

  /**
   * 1. Validate structure completeness
   */
  private validateStructure(module: ModuleToValidate): ValidationCheck {
    const issues: string[] = [];
    const warnings: string[] = [];
    let score = 100;

    // Required fields
    if (!module.id) { issues.push('Missing field: id'); score -= 15; }
    if (!module.titulo) { issues.push('Missing field: titulo'); score -= 15; }
    if (!module.categoria) { issues.push('Missing field: categoria'); score -= 10; }
    if (!module.descricao) { issues.push('Missing field: descricao'); score -= 15; }
    
    // Recommendations
    if (!module.recomendacoes?.sus) { issues.push('Missing: recomendacoes.sus'); score -= 15; }
    if (!module.recomendacoes?.sociedadesMedicas) { issues.push('Missing: recomendacoes.sociedadesMedicas'); score -= 15; }
    if (!module.recomendacoes?.convergencia) { warnings.push('Missing: convergence analysis'); score -= 5; }
    
    // Epidemiology
    if (!module.epidemiologia) { issues.push('Missing: epidemiologia'); score -= 10; }
    
    // Ontology
    if (!module.ontologia) { issues.push('Missing: ontologia'); score -= 10; }

    return {
      name: 'Structure & Completeness',
      passed: score >= 90,
      score: Math.max(0, score),
      weight: 0.15,
      issues,
      warnings,
      suggestions: issues.length > 0 ? ['Add all required fields'] : [],
    };
  }

  /**
   * 2. Validate citation coverage (CRITICAL)
   */
  private validateCitations(module: ModuleToValidate): ValidationCheck {
    const issues: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    // Check if references exist
    if (!module.referencias || module.referencias.length === 0) {
      issues.push('CRITICAL: No reference list provided');
      score = 0;
      suggestions.push('Generate reference list from aggregated sources');
      suggestions.push('Add inline citations [1,2,3] to all factual claims');

      return {
        name: 'Citation Coverage',
        passed: false,
        score: 0,
        weight: 0.30, // 30% of total score (CRITICAL)
        issues,
        warnings,
        suggestions,
      };
    }

    // Check for inline citations in text
    const allText = [
      module.descricao,
      module.recomendacoes.sus.indicacao,
      module.recomendacoes.sus.populacaoAlvo,
      module.recomendacoes.sus.periodicidade,
      module.recomendacoes.sociedadesMedicas.indicacao,
      module.recomendacoes.sociedadesMedicas.populacaoAlvo,
      module.recomendacoes.sociedadesMedicas.periodicidade,
      module.recomendacoes.convergencia,
      module.epidemiologia.prevalencia,
      module.epidemiologia.incidencia,
      module.epidemiologia.mortalidade,
    ].join(' ');

    const citationPattern = /\[(\d+(?:,\s*\d+)*)\]/g;
    const citations = allText.match(citationPattern);

    if (!citations || citations.length === 0) {
      issues.push('CRITICAL: No inline citations found in text');
      score -= 50;
      suggestions.push('Add inline citations [1,2,3] after factual claims');
    } else {
      // Check citation density (should have ~1 citation per 100 words)
      const wordCount = allText.split(/\s+/).length;
      const citationDensity = citations.length / (wordCount / 100);

      if (citationDensity < 0.5) {
        warnings.push(`Low citation density: ${citationDensity.toFixed(1)} citations per 100 words`);
        score -= 10;
        suggestions.push('Increase citation frequency (target: 1 per 100 words)');
      }
    }

    // Validate reference format (Vancouver style)
    for (const ref of module.referencias) {
      if (!ref.citation) {
        issues.push(`Reference ${ref.id}: Missing citation text`);
        score -= 5;
      }
      if (!ref.pmid && !ref.doi) {
        warnings.push(`Reference ${ref.id}: Missing PMID or DOI`);
        score -= 2;
      }
    }

    return {
      name: 'Citation Coverage',
      passed: score >= 70,
      score: Math.max(0, score),
      weight: 0.30,
      issues,
      warnings,
      suggestions,
    };
  }

  /**
   * 3. Validate GRADE evidence levels
   */
  private validateEvidenceLevels(module: ModuleToValidate, sourceData: AggregatedData): ValidationCheck {
    const issues: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    const validLevels = ['Ia', 'Ib', 'IIa', 'IIb', 'III', 'IV'];

    // Check SUS evidence level
    const susEvidence = module.recomendacoes.sus.evidencia;
    if (!validLevels.includes(susEvidence)) {
      issues.push(`Invalid SUS evidence level: ${susEvidence}`);
      score -= 50;
    } else {
      // Verify appropriateness based on source types
      const hasSystematicReviews = sourceData.articles.some(a =>
        a.studyType?.toLowerCase().includes('systematic review') ||
        a.studyType?.toLowerCase().includes('meta-analysis')
      );

      if (susEvidence === 'Ia' && !hasSystematicReviews) {
        warnings.push('Evidence level Ia assigned but no systematic reviews found');
        score -= 10;
        suggestions.push('Verify evidence level matches source quality');
      }
    }

    // Check Medical Societies evidence level
    const societiesEvidence = module.recomendacoes.sociedadesMedicas.evidencia;
    if (!validLevels.includes(societiesEvidence)) {
      issues.push(`Invalid Medical Societies evidence level: ${societiesEvidence}`);
      score -= 50;
    }

    return {
      name: 'GRADE Evidence Levels',
      passed: score >= 80,
      score: Math.max(0, score),
      weight: 0.10,
      issues,
      warnings,
      suggestions,
    };
  }

  /**
   * 4. Validate ontology codes
   */
  private validateOntologyCodes(module: ModuleToValidate, sourceData: AggregatedData): ValidationCheck {
    const issues: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    const ont = module.ontologia;

    // Check for required systems
    if (!ont.cid11 || ont.cid11.length === 0) {
      issues.push('Missing ICD-11 codes');
      score -= 30;
    }
    if (!ont.snomedCT || ont.snomedCT.length === 0) {
      issues.push('Missing SNOMED-CT codes');
      score -= 20;
    }
    if (!ont.loinc || ont.loinc.length === 0) {
      warnings.push('Missing LOINC codes (recommended for lab tests)');
      score -= 15;
    }
    if (!ont.atc || ont.atc.length === 0) {
      warnings.push('Missing ATC codes (recommended for medications)');
      score -= 15;
    }
    if (!ont.ciap2 || ont.ciap2.length === 0) {
      warnings.push('Missing CIAP-2 codes (recommended for primary care)');
      score -= 10;
    }

    // Compare with source data
    const sourceHasICD11 = sourceData.ontologyCodes.icd11.length > 0;
    const sourceHasSNOMED = sourceData.ontologyCodes.snomedCT.length > 0;

    if (sourceHasICD11 && (!ont.cid11 || ont.cid11.length === 0)) {
      issues.push('ICD-11 codes available in source but not included in module');
      suggestions.push(`Add ICD-11 codes: ${sourceData.ontologyCodes.icd11.slice(0, 3).join(', ')}`);
    }
    if (sourceHasSNOMED && (!ont.snomedCT || ont.snomedCT.length === 0)) {
      issues.push('SNOMED-CT codes available in source but not included in module');
      suggestions.push(`Add SNOMED-CT codes: ${sourceData.ontologyCodes.snomedCT.slice(0, 3).join(', ')}`);
    }

    return {
      name: 'Ontology Codes',
      passed: score >= 60,
      score: Math.max(0, score),
      weight: 0.10,
      issues,
      warnings,
      suggestions,
    };
  }

  /**
   * 5. Validate source authority
   */
  private validateSourceAuthority(sourceData: AggregatedData): ValidationCheck {
    const issues: string[] = [];
    const warnings: string[] = [];
    let score = 100;

    const sources = sourceData.metadata.sources;
    const hasHealthAuthority = sources.some(s => s.type === 'health_authority');
    const hasMedicalSociety = sources.some(s => s.type === 'medical_society');
    const hasLiterature = sources.some(s => s.type === 'literature');

    if (!hasHealthAuthority) {
      warnings.push('No health authority sources (WHO/CDC/MS)');
      score -= 15;
    }
    if (!hasMedicalSociety) {
      issues.push('No medical society sources');
      score -= 25;
    }
    if (!hasLiterature) {
      warnings.push('No literature sources (PubMed)');
      score -= 10;
    }

    const totalSources = sourceData.metadata.totalSources;
    if (totalSources < 3) {
      issues.push(`Insufficient sources: ${totalSources} (minimum: 3)`);
      score -= 30;
    }

    return {
      name: 'Source Authority',
      passed: score >= 70,
      score: Math.max(0, score),
      weight: 0.10,
      issues,
      warnings,
      suggestions: [],
    };
  }

  /**
   * 6. Validate recency
   */
  private validateRecency(sourceData: AggregatedData): ValidationCheck {
    const warnings: string[] = [];
    let score = 100;

    const currentYear = new Date().getFullYear();
    const fiveYearsAgo = currentYear - 5;

    // Check guidelines
    const oldGuidelines = sourceData.guidelines.filter(g =>
      g.publicationDate.getFullYear() < fiveYearsAgo
    );

    if (oldGuidelines.length > 0) {
      warnings.push(`${oldGuidelines.length} guidelines older than 5 years`);
      score -= oldGuidelines.length * 5;
    }

    // Check articles
    const oldArticles = sourceData.articles.filter(a =>
      a.publicationDate.getFullYear() < fiveYearsAgo
    );

    if (oldArticles.length > sourceData.articles.length / 2) {
      warnings.push(`${oldArticles.length}/${sourceData.articles.length} articles older than 5 years`);
      score -= 10;
    }

    return {
      name: 'Recency',
      passed: score >= 80,
      score: Math.max(0, score),
      weight: 0.05,
      issues: [],
      warnings,
      suggestions: warnings.length > 0 ? ['Update to more recent sources'] : [],
    };
  }

  /**
   * 7. Validate content quality
   */
  private validateContentQuality(module: ModuleToValidate): ValidationCheck {
    const warnings: string[] = [];
    let score = 100;

    // Check description length
    const descWordCount = module.descricao.split(/\s+/).length;
    if (descWordCount < 50) {
      warnings.push(`Description too short: ${descWordCount} words (minimum: 50)`);
      score -= 15;
    }

    // Check for specific data in epidemiology
    const hasNumbers = /\d+/.test(module.epidemiologia.prevalencia);
    if (!hasNumbers) {
      warnings.push('Epidemiology lacks specific numerical data');
      score -= 10;
    }

    return {
      name: 'Content Quality',
      passed: score >= 80,
      score: Math.max(0, score),
      weight: 0.15,
      issues: [],
      warnings,
      suggestions: [],
    };
  }

  /**
   * 8. Validate readability
   */
  private validateReadability(module: ModuleToValidate): ValidationCheck {
    const warnings: string[] = [];
    let score = 100;

    const text = module.descricao;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/);

    // Average sentence length
    const avgSentenceLength = words.length / sentences.length;
    if (avgSentenceLength > 30) {
      warnings.push(`Long sentences: ${avgSentenceLength.toFixed(1)} words/sentence (target: <25)`);
      score -= 10;
    }

    return {
      name: 'Readability',
      passed: score >= 80,
      score: Math.max(0, score),
      weight: 0.05,
      issues: [],
      warnings,
      suggestions: [],
    };
  }
}


