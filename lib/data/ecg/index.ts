/**
 * ECG MODULE CONSOLIDATION - DARWIN-MFC
 * ======================================
 *
 * Central export file for the ECG interpretation module.
 * Consolidates all ECG patterns, clinical support tools, and helper functions.
 *
 * This module provides:
 * - ECG patterns (normal rhythms, arrhythmias, conduction blocks, ischemia)
 * - Clinical decision support (triage algorithms, red flags, referral criteria)
 * - Interpretation checklists and protocols
 * - Helper functions for pattern lookup and search
 *
 * @module lib/data/ecg
 * @version 1.0.0
 * @lastUpdate 2025-01
 */

// =============================================================================
// PATTERN EXPORTS
// =============================================================================

// Normal rhythms and physiological variants
export {
  ritmosNormais,
  getRitmoById,
  getRitmosByCategoria,
  getRitmosByTag,
  getRedFlagsUrgentes,
  searchRitmos,
  type CategoriaECG,
  type RegularidadeRitmo,
  type MorfologiaOndaP,
  type CaracteristicasQRS,
  type CaracteristicasECG as CaracteristicasECGNormal,
  type RedFlag,
  type ECGCitation,
  type PadraoRitmoECG,
} from './patterns/ritmos-normais';

// Supraventricular arrhythmias
export {
  arritmiasSupra,
  type UrgenciaECG,
  type CaracteristicasECG as CaracteristicasECGSupra,
  type PadraoArritmiaSupraventricular,
} from './patterns/arritmias-supraventriculares';

// Ventricular arrhythmias
export {
  arritmiasVentriculares,
  type NivelUrgencia as NivelUrgenciaVentricular,
  type CaracteristicasECGVentricular,
  type PadraoArritmiaVentricular,
} from './patterns/arritmias-ventriculares';

// Conduction blocks
export {
  bloqueiosConducao,
  getBloqueioById,
  getBloqueiosBySubcategoria,
  getBloqueiosByUrgencia,
  getBloqueiosComIndicacaoMarcapasso,
  isEmergencia as isBloqueioEmergencia,
  isUrgente as isBloqueioUrgente,
  type NivelUrgencia as NivelUrgenciaBloqueio,
  type CategoriaBloqueio,
  type CaracteristicasBloqueioECG,
  type FatorRisco,
  type ECGPattern as ECGPatternBloqueio,
} from './patterns/bloqueios-conducao';

// Ischemia and infarction patterns
export {
  isquemiaInfarto,
  getPatternById as getIsquemiaPatternById,
  getPatternsByTerritorio,
  getPatternsByUrgencia as getIsquemiaByUrgencia,
  getPatternsByArteria,
  getPadroesEmergencia,
  getPatternsByTag as getIsquemiaByTag,
  searchPatterns as searchIsquemiaPatterns,
  type NivelUrgencia as NivelUrgenciaIsquemia,
  type TerritorioMiocardico,
  type ArteriaCoronariaRelacionada,
  type CategoriaECG as CategoriaECGIsquemia,
  type CaracteristicasClinicas,
  type CriteriosECG,
  type TratamentoAgudo,
  type CriteriosEncaminhamento,
  type ECGPattern as ECGPatternIsquemia,
} from './patterns/isquemia-infarto';

// =============================================================================
// CLINICAL SUPPORT EXPORTS
// =============================================================================

// Triage algorithms
export {
  ecgTriageAlgorithm,
  stemiRecognitionAlgorithm,
  arrhythmiaTriageAlgorithm,
  qtAssessmentAlgorithm,
  ischemiaVsNormalSTAlgorithm,
  bradyTachyAlgorithm,
  isECGNormalDecisionTree,
  needsImmediateCardiologyDecisionTree,
  canWaitOutpatientDecisionTree,
  emergencyDepartmentECGProtocol,
  icuECGProtocol,
  wardECGProtocol,
  primaryCareECGProtocol,
  allTriageAlgorithms,
  allDecisionTrees,
  allContextProtocols,
  getTriageAlgorithmById,
  getDecisionTreeById,
  getContextProtocolBySetting,
  getTriageStep,
  navigateDecisionTree,
  type ECGTriageClassification,
  type UrgencyLevel as TriageUrgencyLevel,
  type ConfidenceLevel,
  type ClinicalSetting as TriageClinicalSetting,
  type TriageOption,
  type TriageStep,
  type TriageResult,
  type TriageAlgorithm,
  type DecisionTree,
  type DecisionNode as TriageDecisionNode,
  type DecisionOutcome as TriageDecisionOutcome,
  type ContextProtocol,
  type TriagePriority,
} from './clinical-support/triage-algorithms';

// Red flags
export {
  ecgRedFlags,
  emergenciasRedFlags,
  urgentesRedFlags,
  alertaRedFlags,
  allRedFlagIds,
  urgencyLabels,
  categoryColors,
  getRedFlagsByUrgency,
  getRedFlagsByCategory,
  isRedFlag,
  getRedFlagById,
  getActionForRedFlag,
  searchRedFlags,
  getRedFlagStats,
  type ECGRedFlagCategoria,
  type UrgencyLevel as RedFlagUrgencyLevel,
  type ECGRedFlag,
} from './clinical-support/red-flags';

// Referral criteria
export {
  emergencyReferrals,
  urgentReferrals,
  routineReferrals,
  noReferralNeeded,
  contextSpecificReferrals,
  allReferralCriteria as referralCriteriaAll,
  shouldRefer,
  getReferralPriority,
  getPreReferralWorkup,
  getReferralCriteriaById,
  getReferralCriteriaByCategory,
  getReferralCriteriaByDestination,
  searchReferralCriteriaByTag,
  getContextSpecificGuidance,
  generateActionSummary,
  type CategoriaUrgencia,
  type EspecialidadeDestino,
  type ECGReferralCriteria,
  type ReferralRecommendation,
  type ContextSpecificReferral,
} from './clinical-support/referral-criteria';

// Interpretation checklist
export {
  ecgInterpretationChecklist,
  rateCalculationMethods,
  axisQuadrants,
  getChecklistByStep,
  getRedFlagsFromChecklist,
  getAllRedFlagsFlat,
  generateChecklistReport,
  getChecklistItem,
  getNormalValuesByStep,
  getQuickTipsByStep,
  searchChecklist,
  getAxisInterpretation,
  calculateQTcBazett,
  calculateQTcFridericia,
  assessQTc,
  getChecklistStats,
  type ChecklistItem,
  type ChecklistStep,
  type ChecklistResponse,
  type ChecklistReport,
  type RateCalculationMethod,
  type AxisQuadrant,
} from './clinical-support/interpretation-checklist';

// Protocols by clinical setting
export {
  protocolsBySetting,
  getProtocolBySetting,
  getTriageCriteria,
  shouldReferFromSetting,
  getCommonMistakes,
  getQuickChecklist,
  getDecisionFlowchart,
  getPriorities,
  getReferralScenarios,
  getQualityMetrics,
  searchProtocols,
  type ClinicalSetting as ProtocolClinicalSetting,
  type UrgencyLevel as ProtocolUrgencyLevel,
  type ReferralDestination,
  type Priority,
  type TriageCriteria as ProtocolTriageCriteria,
  type ReferralScenario,
  type CommonMistake,
  type DecisionNode as ProtocolDecisionNode,
  type DecisionOutcome as ProtocolDecisionOutcome,
  type ClinicalSettingProtocol,
} from './clinical-support/protocols-by-setting';

// =============================================================================
// CONSOLIDATED ARRAYS
// =============================================================================

import { ritmosNormais } from './patterns/ritmos-normais';
import { arritmiasSupra } from './patterns/arritmias-supraventriculares';
import { arritmiasVentriculares } from './patterns/arritmias-ventriculares';
import { bloqueiosConducao } from './patterns/bloqueios-conducao';
import { isquemiaInfarto } from './patterns/isquemia-infarto';
import { ecgRedFlags } from './clinical-support/red-flags';
import { allReferralCriteria as referralCriteriaAll } from './clinical-support/referral-criteria';

/**
 * All ECG patterns combined from all categories
 * Includes: normal rhythms, supraventricular arrhythmias, ventricular arrhythmias,
 * conduction blocks, and ischemia/infarction patterns
 */
export const allECGPatterns = [
  ...ritmosNormais,
  ...arritmiasSupra,
  ...arritmiasVentriculares,
  ...bloqueiosConducao,
  ...isquemiaInfarto,
] as const;

/**
 * All red flags from the red flags module
 */
export const allRedFlags = ecgRedFlags;

/**
 * All referral criteria combined
 */
export const allReferralCriteria = referralCriteriaAll;

// =============================================================================
// MODULE STATISTICS
// =============================================================================

/**
 * ECG module statistics and metadata
 */
export const ecgModuleStats = {
  /** Module version */
  version: '1.0.0',

  /** Last update date */
  lastUpdate: '2025-01-17',

  /** Pattern counts by category */
  patternCounts: {
    ritmosNormais: ritmosNormais.length,
    arritmiasSupra: arritmiasSupra.length,
    arritmiasVentriculares: arritmiasVentriculares.length,
    bloqueiosConducao: bloqueiosConducao.length,
    isquemiaInfarto: isquemiaInfarto.length,
    total:
      ritmosNormais.length +
      arritmiasSupra.length +
      arritmiasVentriculares.length +
      bloqueiosConducao.length +
      isquemiaInfarto.length,
  },

  /** Total red flags count */
  totalRedFlags: ecgRedFlags.length,

  /** Total referral criteria count */
  totalReferralCriteria: allReferralCriteria.length,

  /** Module description */
  description:
    'Comprehensive ECG interpretation module for non-cardiologist physicians. ' +
    'Includes pattern recognition, clinical decision support, triage algorithms, ' +
    'and referral guidelines based on AHA/ACC/ESC/SBC guidelines.',

  /** Primary references */
  references: [
    'AHA/ACC/HRS Guidelines for ECG Interpretation 2024',
    'ESC Guidelines for Acute Coronary Syndromes 2023',
    'ESC Guidelines on Cardiac Pacing 2021',
    'Sociedade Brasileira de Cardiologia 2024',
    "Braunwald's Heart Disease, 12th Edition",
    "Goldberger's Clinical Electrocardiography, 10th Edition",
  ],
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Find any ECG pattern by its ID across all pattern categories
 * @param id - The pattern ID to search for
 * @returns The matching pattern or undefined if not found
 */
export function getPatternById(id: string): (typeof allECGPatterns)[number] | undefined {
  // Search in normal rhythms
  const ritmoNormal = ritmosNormais.find((p) => p.id === id);
  if (ritmoNormal) return ritmoNormal;

  // Search in supraventricular arrhythmias
  const supraventricular = arritmiasSupra.find((p) => p.id === id);
  if (supraventricular) return supraventricular;

  // Search in ventricular arrhythmias
  const ventricular = arritmiasVentriculares.find((p) => p.id === id);
  if (ventricular) return ventricular;

  // Search in conduction blocks
  const bloqueio = bloqueiosConducao.find((p) => p.id === id);
  if (bloqueio) return bloqueio;

  // Search in ischemia/infarction
  const isquemia = isquemiaInfarto.find((p) => p.id === id);
  if (isquemia) return isquemia;

  return undefined;
}

/**
 * Pattern category type for filtering
 */
export type PatternCategory =
  | 'ritmos_normais'
  | 'arritmias_supraventriculares'
  | 'arritmias_ventriculares'
  | 'bloqueios_conducao'
  | 'isquemia_infarto';

/**
 * Get all patterns from a specific category
 * @param category - The category to filter by
 * @returns Array of patterns from the specified category
 */
export function getPatternsByCategory(category: PatternCategory): (typeof allECGPatterns)[number][] {
  switch (category) {
    case 'ritmos_normais':
      return [...ritmosNormais];
    case 'arritmias_supraventriculares':
      return [...arritmiasSupra];
    case 'arritmias_ventriculares':
      return [...arritmiasVentriculares];
    case 'bloqueios_conducao':
      return [...bloqueiosConducao];
    case 'isquemia_infarto':
      return [...isquemiaInfarto];
    default:
      return [];
  }
}

/**
 * Search across all ECG patterns by query string
 * Searches in: name, international name, description, tags, and criteria
 * @param query - The search query
 * @returns Array of matching patterns from all categories
 */
export function searchPatterns(query: string): (typeof allECGPatterns)[number][] {
  const lowerQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const results: (typeof allECGPatterns)[number][] = [];

  // Helper function to check if a pattern matches the query
  const matchesQuery = (pattern: (typeof allECGPatterns)[number]): boolean => {
    const searchableFields: string[] = [];

    // Add common fields
    if ('nome' in pattern) searchableFields.push(pattern.nome);
    if ('nomeInternacional' in pattern) searchableFields.push(pattern.nomeInternacional);
    if ('descricao' in pattern) searchableFields.push(pattern.descricao);
    if ('tags' in pattern && Array.isArray(pattern.tags)) searchableFields.push(...pattern.tags);
    if ('criterios' in pattern && Array.isArray(pattern.criterios)) searchableFields.push(...pattern.criterios);

    // Check if any field matches the query
    return searchableFields.some((field) =>
      field
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(lowerQuery)
    );
  };

  // Search all pattern arrays
  for (const pattern of allECGPatterns) {
    if (matchesQuery(pattern)) {
      results.push(pattern);
    }
  }

  return results;
}

/**
 * Get all patterns with urgency level 1 (emergency)
 * These are patterns that require immediate action
 * @returns Array of emergency patterns
 */
export function getEmergencyPatterns(): (typeof allECGPatterns)[number][] {
  const emergencyPatterns: (typeof allECGPatterns)[number][] = [];

  // Check ventricular arrhythmias (uses nivelUrgencia)
  for (const pattern of arritmiasVentriculares) {
    if ('nivelUrgencia' in pattern && pattern.nivelUrgencia === 1) {
      emergencyPatterns.push(pattern);
    }
  }

  // Check conduction blocks (uses urgencia)
  for (const pattern of bloqueiosConducao) {
    if ('urgencia' in pattern && pattern.urgencia === 1) {
      emergencyPatterns.push(pattern);
    }
  }

  // Check ischemia/infarction patterns (uses urgencia)
  for (const pattern of isquemiaInfarto) {
    if ('urgencia' in pattern && pattern.urgencia === 1) {
      emergencyPatterns.push(pattern);
    }
  }

  // Check supraventricular arrhythmias (uses urgencia with string type)
  for (const pattern of arritmiasSupra) {
    if ('urgencia' in pattern && pattern.urgencia === 'emergencia') {
      emergencyPatterns.push(pattern);
    }
  }

  return emergencyPatterns;
}

/**
 * Get a summary of all patterns with their categories and urgency levels
 * Useful for creating an overview or index
 */
export function getPatternsSummary(): Array<{
  id: string;
  nome: string;
  category: PatternCategory;
  urgency?: number | string;
}> {
  const summary: Array<{
    id: string;
    nome: string;
    category: PatternCategory;
    urgency?: number | string;
  }> = [];

  // Normal rhythms
  for (const pattern of ritmosNormais) {
    summary.push({
      id: pattern.id,
      nome: pattern.nome,
      category: 'ritmos_normais',
    });
  }

  // Supraventricular arrhythmias
  for (const pattern of arritmiasSupra) {
    summary.push({
      id: pattern.id,
      nome: pattern.nome,
      category: 'arritmias_supraventriculares',
      urgency: pattern.urgencia,
    });
  }

  // Ventricular arrhythmias
  for (const pattern of arritmiasVentriculares) {
    summary.push({
      id: pattern.id,
      nome: pattern.nome,
      category: 'arritmias_ventriculares',
      urgency: pattern.nivelUrgencia,
    });
  }

  // Conduction blocks
  for (const pattern of bloqueiosConducao) {
    summary.push({
      id: pattern.id,
      nome: pattern.nome,
      category: 'bloqueios_conducao',
      urgency: pattern.urgencia,
    });
  }

  // Ischemia/infarction
  for (const pattern of isquemiaInfarto) {
    summary.push({
      id: pattern.id,
      nome: pattern.nome,
      category: 'isquemia_infarto',
      urgency: pattern.urgencia,
    });
  }

  return summary;
}

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export default {
  // Pattern arrays
  allECGPatterns,
  ritmosNormais,
  arritmiasSupra,
  arritmiasVentriculares,
  bloqueiosConducao,
  isquemiaInfarto,

  // Clinical support
  allRedFlags,
  allReferralCriteria,

  // Statistics
  ecgModuleStats,

  // Helper functions
  getPatternById,
  getPatternsByCategory,
  searchPatterns,
  getEmergencyPatterns,
  getPatternsSummary,
};
