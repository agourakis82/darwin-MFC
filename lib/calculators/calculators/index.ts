/**
 * DARWIN-MFC CLINICAL CALCULATORS INDEX
 * ======================================
 *
 * Central export point for all clinical calculators.
 * Import and register all calculators here.
 */

import { calculatorRegistry } from '../registry';
import type { ClinicalCalculator } from '../types';
import { isCalculatorVisible } from '../clinical-intelligence';

// =============================================================================
// CRITICAL CARE CALCULATORS
// =============================================================================

import { qsofa } from './qsofa';
import { sofa } from './sofa';
import { news2 } from './news2';
import { gcs } from './gcs';
import { apache2 } from './apache2';

// =============================================================================
// CARDIOLOGY CALCULATORS
// =============================================================================

import { cha2ds2vasc } from './cha2ds2-vasc';
import { heartScore } from './heart-score';
import { timiStemi } from './timi-stemi';
import { hasBled } from './has-bled';
import { framingham } from './framingham';
import { ascvd } from './ascvd';

// =============================================================================
// PULMONOLOGY CALCULATORS
// =============================================================================

import { wellsPE } from './wells-pe';
import { curb65 } from './curb65';
import { pesi } from './pesi';

// =============================================================================
// HEPATOLOGY CALCULATORS
// =============================================================================

import { meldNa } from './meld-na';
import { childPugh } from './child-pugh';

// =============================================================================
// PSYCHIATRY CALCULATORS
// =============================================================================

import { phq9 } from './phq9';
import { gad7 } from './gad7';

// =============================================================================
// HEMATOLOGY CALCULATORS
// =============================================================================

import { fourTsHit } from './4ts-hit';

// =============================================================================
// INFECTIOUS DISEASE CALCULATORS
// =============================================================================

import { centor } from './centor';

// =============================================================================
// ORTHOPEDICS CALCULATORS
// =============================================================================

import { ottawaAnkle } from './ottawa-ankle';

// =============================================================================
// PEDIATRICS CALCULATORS
// =============================================================================

import { apgar } from './apgar';

// =============================================================================
// OBSTETRICS CALCULATORS
// =============================================================================

import { bishop } from './bishop';

// =============================================================================
// ANESTHESIA CALCULATORS
// =============================================================================

import { apfel } from './apfel';

// =============================================================================
// NEUROLOGY CALCULATORS
// =============================================================================

import { mmse } from './mmse';

// =============================================================================
// CLINICAL INTELLIGENCE 2026 CALCULATORS
// =============================================================================

import { sotaMetabolicRiskCalculator } from './sota-metabolic-risk-2025';
import { aiPoweredSepsisScore2025 } from './ai-powered-sepsis-score-2025';
import { precisionFrailtyIndex2025 } from './precision-frailty-index-2025';
import { preventScore2025 } from './prevent-score-2025';
import { genomicMultiomicRisk } from './genomic-multiomic-risk';
import { cancerRiskPrediction2025 } from './cancer-risk-prediction-2025';
import { pharmacogenomicsPrecision } from './pharmacogenomics-precision';
import { strokeTemporalEvolution } from './stroke-temporal-evolution';

// =============================================================================
// ALL CALCULATORS
// =============================================================================

export const allCalculators: ClinicalCalculator[] = [
  // Critical Care
  qsofa,
  sofa,
  news2,
  gcs,
  apache2,
  // Cardiology
  cha2ds2vasc,
  heartScore,
  timiStemi,
  hasBled,
  framingham,
  ascvd,
  // Pulmonology
  wellsPE,
  curb65,
  pesi,
  // Hepatology
  meldNa,
  childPugh,
  // Psychiatry
  phq9,
  gad7,
  // Hematology
  fourTsHit,
  // Infectious Disease
  centor,
  // Orthopedics
  ottawaAnkle,
  // Pediatrics
  apgar,
  // Obstetrics
  bishop,
  // Anesthesia
  apfel,
  // Neurology
  mmse,
  // Clinical Intelligence 2026 calculators
  sotaMetabolicRiskCalculator,
  aiPoweredSepsisScore2025,
  precisionFrailtyIndex2025,
  preventScore2025,
  genomicMultiomicRisk,
  cancerRiskPrediction2025,
  pharmacogenomicsPrecision,
  strokeTemporalEvolution,
];

// =============================================================================
// REGISTER ALL CALCULATORS
// =============================================================================

/**
 * Initialize the calculator registry with all calculators.
 * This should be called once at app startup.
 */
export function initializeCalculators(): void {
  for (const calculator of allCalculators) {
    calculatorRegistry.register(calculator);
  }
}

// Auto-register on import
initializeCalculators();

// =============================================================================
// NAMED EXPORTS
// =============================================================================

// Critical Care
export { qsofa } from './qsofa';
export { sofa } from './sofa';
export { news2 } from './news2';
export { gcs } from './gcs';
export { apache2 } from './apache2';

// Cardiology
export { cha2ds2vasc } from './cha2ds2-vasc';
export { heartScore } from './heart-score';
export { timiStemi } from './timi-stemi';
export { hasBled } from './has-bled';
export { framingham } from './framingham';
export { ascvd } from './ascvd';

// Pulmonology
export { wellsPE } from './wells-pe';
export { curb65 } from './curb65';
export { pesi } from './pesi';

// Hepatology
export { meldNa } from './meld-na';
export { childPugh } from './child-pugh';

// Psychiatry
export { phq9 } from './phq9';
export { gad7 } from './gad7';

// Hematology
export { fourTsHit } from './4ts-hit';

// Infectious Disease
export { centor } from './centor';

// Orthopedics
export { ottawaAnkle } from './ottawa-ankle';

// Pediatrics
export { apgar } from './apgar';

// Obstetrics
export { bishop } from './bishop';

// Anesthesia
export { apfel } from './apfel';

// Neurology
export { mmse } from './mmse';

// Clinical Intelligence 2026 calculators
export { sotaMetabolicRiskCalculator } from './sota-metabolic-risk-2025';
export { aiPoweredSepsisScore2025 } from './ai-powered-sepsis-score-2025';
export { precisionFrailtyIndex2025 } from './precision-frailty-index-2025';
export { preventScore2025 } from './prevent-score-2025';
export { genomicMultiomicRisk } from './genomic-multiomic-risk';
export { cancerRiskPrediction2025 } from './cancer-risk-prediction-2025';
export { pharmacogenomicsPrecision } from './pharmacogenomics-precision';
export { strokeTemporalEvolution } from './stroke-temporal-evolution';

// =============================================================================
// CALCULATOR BY ID MAP
// =============================================================================

export const calculatorsById: Record<string, ClinicalCalculator> = allCalculators.reduce(
  (acc, calc) => {
    acc[calc.id] = calc;
    return acc;
  },
  {} as Record<string, ClinicalCalculator>
);

// =============================================================================
// CONVENIENCE GETTERS
// =============================================================================

/**
 * Get a calculator by ID
 */
export function getCalculator(id: string): ClinicalCalculator | undefined {
  return calculatorsById[id];
}

/**
 * Get all calculator IDs
 */
export function getCalculatorIds(): string[] {
  return allCalculators.map((c) => c.id);
}

/**
 * Get calculator IDs exposed in the clinical UI/SSG.
 */
export function getVisibleCalculatorIds(): string[] {
  return allCalculators.filter(isCalculatorVisible).map((c) => c.id);
}

/**
 * Get calculators by category
 */
export function getCalculatorsByCategory(
  category: string
): ClinicalCalculator[] {
  return allCalculators.filter((c) => c.category === category);
}

/**
 * Get Clinical Intelligence 2026 calculators only
 */
export function getClinicalIntelligenceCalculators(): ClinicalCalculator[] {
  return allCalculators.filter((c) => c.versionYear === 2026);
}

/**
 * Backward-compatible alias for older imports.
 *
 * @deprecated Use getClinicalIntelligenceCalculators.
 */
export const getSOTACalculators = getClinicalIntelligenceCalculators;

/**
 * Get calculators by clinical evidence maturity.
 */
export function getCalculatorsByEvidenceLevel(
  evidenceLevel: NonNullable<ClinicalCalculator['evidenceLevel']>
): ClinicalCalculator[] {
  return allCalculators.filter((c) => c.evidenceLevel === evidenceLevel);
}

export default allCalculators;
