/**
 * FHIR (Fast Healthcare Interoperability Resources) Support
 * Conversores para recursos FHIR R4
 * 
 * @see https://www.hl7.org/fhir/
 */

// Types
export * from './types';

// Condition (Doenças)
export * from './condition';

// Medication (Medicamentos)
export * from './medication';

/**
 * Versão FHIR suportada
 */
export const FHIR_VERSION = 'R4' as const;

/**
 * Base URL para recursos FHIR
 */
export const FHIR_BASE_URL = 'http://darwin-mfc.org/fhir' as const;

