/**
 * FHIR (Fast Healthcare Interoperability Resources) Support
 * Conversores para recursos FHIR R4
 *
 * @see https://www.hl7.org/fhir/
 */

// Types
export * from './types';

// Builders
export * from './patient';
export * from './observation';
export * from './encounter';
export * from './bundle';

// Converters
export * from './condition';
export * from './medication';

// Utilities
export * from './utils';

/**
 * Versão FHIR suportada
 */
export const FHIR_VERSION = 'R4' as const;

/**
 * Base URL para recursos FHIR
 */
export const FHIR_BASE_URL = 'http://darwin-mfc.org/fhir' as const;

