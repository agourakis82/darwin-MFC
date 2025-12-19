/**
 * Utility functions for evidence level classification
 */

import type { EvidenceLevel, StudyType } from '../types/evidence';

/**
 * Map study type to evidence level
 * Based on Oxford Centre for Evidence-Based Medicine
 */
export function getEvidenceLevelFromStudyType(studyType: StudyType): EvidenceLevel {
  switch (studyType) {
    case 'MetaAnalysis':
    case 'SystematicReview':
      return 'Ia'; // Systematic review of RCTs
    case 'RCT':
      return 'Ib'; // Individual RCT
    case 'Cohort':
      return 'IIa'; // Systematic review of cohort studies
    case 'CaseControl':
      return 'IIb'; // Individual case-control study
    case 'CaseSeries':
    case 'CaseReport':
      return 'III'; // Case series
    case 'ExpertOpinion':
    case 'Guideline':
    case 'Consensus':
    case 'Observational':
    case 'CrossSectional':
    default:
      return 'IV'; // Expert opinion
  }
}

/**
 * Get evidence level label
 */
export function getEvidenceLevelLabel(level: EvidenceLevel): string {
  const labels: Record<EvidenceLevel, string> = {
    Ia: 'Ia - Revisão sistemática de ECRs',
    Ib: 'Ib - Ensaio clínico randomizado individual',
    IIa: 'IIa - Revisão sistemática de estudos de coorte',
    IIb: 'IIb - Estudo caso-controle individual',
    III: 'III - Séries de casos',
    IV: 'IV - Opinião de especialista',
  };
  return labels[level];
}

/**
 * Get evidence level description
 */
export function getEvidenceLevelDescription(level: EvidenceLevel): string {
  const descriptions: Record<EvidenceLevel, string> = {
    Ia: 'Evidência mais forte: revisão sistemática de múltiplos ensaios clínicos randomizados bem conduzidos',
    Ib: 'Evidência forte: ensaio clínico randomizado individual bem conduzido',
    IIa: 'Evidência moderada: revisão sistemática de estudos de coorte bem conduzidos',
    IIb: 'Evidência moderada-fraca: estudo caso-controle individual bem conduzido',
    III: 'Evidência fraca: séries de casos, estudos descritivos',
    IV: 'Evidência muito fraca: opinião de especialista, consenso, diretrizes baseadas em opinião',
  };
  return descriptions[level];
}

/**
 * Get evidence level color for UI
 */
export function getEvidenceLevelColor(level: EvidenceLevel): string {
  const colors: Record<EvidenceLevel, string> = {
    Ia: 'bg-green-600', // Strongest evidence - green
    Ib: 'bg-green-500',
    IIa: 'bg-blue-500', // Moderate evidence - blue
    IIb: 'bg-blue-400',
    III: 'bg-yellow-500', // Weak evidence - yellow
    IV: 'bg-gray-500', // Very weak evidence - gray
  };
  return colors[level];
}

/**
 * Get evidence level badge text (abbreviated)
 */
export function getEvidenceLevelBadge(level: EvidenceLevel): string {
  return level;
}

/**
 * Calculate quality score from components
 */
export interface QualityComponents {
  methodology: number; // 0-3
  sampleSize: number; // 0-2
  followUp: number; // 0-2
  bias: number; // 0-2 (inverted: higher = less bias)
  applicability: number; // 0-1
}

export function calculateQualityScore(components: QualityComponents): number {
  const total =
    components.methodology +
    components.sampleSize +
    components.followUp +
    components.bias +
    components.applicability;
  
  // Normalize to 0-10 scale (max total is 10)
  return Math.round((total / 10) * 10 * 10) / 10;
}

/**
 * Classify study type from reference metadata
 */
export function inferStudyTypeFromReference(reference: {
  type: string;
  title?: string;
  journal?: string;
}): StudyType | undefined {
  const titleLower = (reference.title || '').toLowerCase();
  const journalLower = (reference.journal || '').toLowerCase();

  // Check title for keywords
  if (titleLower.includes('meta-analysis') || titleLower.includes('meta-análise')) {
    return 'MetaAnalysis';
  }
  if (titleLower.includes('systematic review') || titleLower.includes('revisão sistemática')) {
    return 'SystematicReview';
  }
  if (titleLower.includes('randomized') || titleLower.includes('randomizado')) {
    return 'RCT';
  }
  if (titleLower.includes('cohort') || titleLower.includes('coorte')) {
    return 'Cohort';
  }
  if (titleLower.includes('case-control') || titleLower.includes('caso-controle')) {
    return 'CaseControl';
  }
  if (titleLower.includes('case series') || titleLower.includes('série de casos')) {
    return 'CaseSeries';
  }
  if (titleLower.includes('case report') || titleLower.includes('relato de caso')) {
    return 'CaseReport';
  }

  // Check reference type
  if (reference.type === 'diretriz') {
    return 'Guideline';
  }

  return undefined;
}

