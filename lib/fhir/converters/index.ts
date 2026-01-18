/**
 * FHIR Converters
 *
 * Converters e builders para transformar Darwin-MFC data structures
 * para recursos FHIR R4 (Fast Healthcare Interoperability Resources)
 *
 * @see https://www.hl7.org/fhir/
 */

// Condition Converter (Doenças)
export type { DoencaToConditionOptions } from './condition-converter';
export {
  doencaToCondition,
  conditionToDoenca,
  createConditionBundle,
} from './condition-converter';

// Medication Converter (Medicamentos)
export type {
  MedicamentoToMedicationOptions,
  MedicamentoToMedicationStatementOptions,
} from './medication-converter';
export {
  medicamentoToMedication,
  medicamentoToMedicationStatement,
  medicationToMedicamento,
  createMedicationBundle,
  createMedicationStatementBundle,
} from './medication-converter';

// Bundle Builder
export type { BundleType, BundleBuilderOptions, BundleEntryOptions } from './bundle-builder';
export {
  BundleBuilder,
  createCollectionBundle,
  createSearchSetBundle,
  createTransactionBundle,
  createTransactionResponseBundle,
  createHistoryBundle,
  validateBundle,
  bundleToJsonLd,
  extractResourcesFromBundle,
  filterResourcesByType,
} from './bundle-builder';

/**
 * Version da implementação de converters FHIR
 */
export const CONVERTERS_VERSION = '1.0.0' as const;
