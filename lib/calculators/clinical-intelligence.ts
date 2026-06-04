import type {
  CalculatorClinicalUse,
  CalculatorEvidenceLevel,
  ClinicalCalculator,
} from './types';
import { isClinicalIntelligenceAvailable } from '@/lib/clinical-intelligence/config';

export const evidenceLevelLabels: Record<CalculatorEvidenceLevel, string> = {
  validated: 'Validated',
  experimental: 'Experimental',
  prototype: 'Prototype',
};

export const evidenceLevelStyles: Record<CalculatorEvidenceLevel, string> = {
  validated:
    'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  experimental:
    'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  prototype:
    'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
};

export const clinicalUseLabels: Record<CalculatorClinicalUse, string> = {
  screening: 'Screening',
  risk_stratification: 'Risk stratification',
  triage: 'Triage',
  treatment_support: 'Treatment support',
  research_only: 'Research only',
};

export function getCalculatorEvidenceLevel(
  calculator: ClinicalCalculator
): CalculatorEvidenceLevel {
  if (calculator.evidenceLevel) return calculator.evidenceLevel;
  return calculator.validationStudy ? 'validated' : 'experimental';
}

export function isCalculatorVisible(calculator: ClinicalCalculator): boolean {
  return getCalculatorEvidenceLevel(calculator) !== 'prototype';
}

export function canCalculateClinically(calculator: ClinicalCalculator): boolean {
  if (getCalculatorEvidenceLevel(calculator) === 'prototype') return false;
  return !calculator.requiresBackend || isClinicalIntelligenceAvailable();
}

export function getCalculatorClinicalDisclaimer(calculator: ClinicalCalculator): string {
  if (calculator.disclaimer) return calculator.disclaimer;

  if (getCalculatorEvidenceLevel(calculator) === 'prototype') {
    return 'Prototype only. Do not use for clinical decision-making until reviewed and validated.';
  }

  if (calculator.requiresBackend) {
    return 'This calculator requires the Darwin-MFC clinical intelligence backend. Do not infer a result when the service is unavailable.';
  }

  return 'Clinical decision support only. Does not replace medical judgment, guideline review, or patient-specific assessment.';
}
