/**
 * DARWIN-MFC CLINICAL CALCULATORS MODULE
 * =======================================
 *
 * Comprehensive clinical calculator system with 25+ validated tools
 * for clinical decision support across multiple specialties.
 */

// Types
export * from './types';

// Formulas and utilities
export * from './formulas';

// Registry
export { calculatorRegistry, registerCalculators, getCalculatorOrThrow } from './registry';

// All calculators
export {
  allCalculators,
  initializeCalculators,
  calculatorsById,
  getCalculator,
  getCalculatorIds,
  getCalculatorsByCategory,
  // Individual calculators
  qsofa,
  sofa,
  news2,
  gcs,
  cha2ds2vasc,
  heartScore,
  wellsPE,
} from './calculators';

// Default export
export { default as calculators } from './calculators';
