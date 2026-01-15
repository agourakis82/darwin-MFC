/**
 * DARWIN-MFC FHIR R4 INTEROPERABILITY LAYER
 * ==========================================
 *
 * Complete FHIR R4 support for Darwin-MFC including:
 * - Type definitions for all major FHIR resources
 * - Bi-directional mappers (Darwin ↔ FHIR)
 * - Bundle creation and management
 * - Export to FHIR JSON/NDJSON
 * - Import from FHIR bundles
 * - RNDS (Brazil) profile support
 *
 * @see https://www.hl7.org/fhir/
 * @see https://rnds.saude.gov.br/
 */

// ============================================================================
// TYPES
// ============================================================================

export {
  // Base types
  type FHIRResource,
  type FHIRCoding,
  type FHIRCodeableConcept,
  type FHIRReference,
  type FHIRPeriod,
  type FHIRQuantity,
  type FHIRRatio,
  type FHIRHumanName,
  type FHIRAddress,
  type FHIRContactPoint,
  type FHIRIdentifier,
  type FHIRAnnotation,
  type FHIRRange,
  type FHIRTiming,
  type FHIRDosage,

  // Resources
  type FHIRPatient,
  type FHIRCondition,
  type FHIRMedication,
  type FHIRMedicationStatement,
  type FHIRMedicationRequest,
  type FHIRObservation,
  type FHIRCarePlan,
  type FHIRDiagnosticReport,
  type FHIRProcedure,
  type FHIRBundle,

  // Union types
  type FHIRAnyResource,
  type FHIRResourceType,

  // Constants
  FHIR_CODE_SYSTEMS,
  type FHIRCodeSystemUrl,

  // Helper functions
  createFHIRCoding,
  createFHIRCodeableConcept,
  createFHIRReference,
  createFHIRQuantity,
  createFHIRIdentifier,
  isValidFHIRResource,
  extractCodes,
  findCodeBySystem,
} from './types';

// ============================================================================
// MAPPERS
// ============================================================================

export {
  // Darwin types
  type DarwinDoenca,
  type DarwinMedicamento,
  type DarwinExame,
  type DarwinPaciente,
  type DarwinPrescricao,
  type DarwinResultadoExame,

  // Darwin → FHIR
  mapDoencaToFHIRCondition,
  mapMedicamentoToFHIRMedication,
  mapPrescricaoToFHIRMedicationRequest,
  mapResultadoExameToFHIRObservation,
  mapPacienteToFHIRPatient,

  // FHIR → Darwin
  mapFHIRConditionToDoenca,
  mapFHIRMedicationToMedicamento,
  mapFHIRObservationToResultadoExame,
  mapFHIRPatientToPaciente,
} from './mappers';

// ============================================================================
// EXPORTER
// ============================================================================

export {
  // Types
  type ExportOptions,
  type BundleOptions,
  type ExportResult,

  // Bundle functions
  createEmptyBundle,
  addResourceToBundle,
  createTransactionBundle,

  // Export functions
  exportDoencasToFHIR,
  exportPrescricoesToFHIR,
  exportExamesToFHIR,
  exportPacientesToFHIR,
  exportPacienteCompletoToFHIR,

  // Download utilities
  generateDownloadData,
  createDownloadBlob,

  // Validation
  validateBundle,

  // RNDS (Brazil)
  prepareForRNDS,
} from './exporter';

// ============================================================================
// IMPORTER
// ============================================================================

export {
  // Types
  type ImportOptions,
  type ImportResult,
  type ImportError,
  type ParsedResource,

  // Parsing
  parseFHIRJson,
  parseFHIRNdjson,
  extractResourcesFromBundle,
  classifyResources,

  // Import functions
  importFHIRBundle,
  importSingleResource,
  importFromString,
  importFromFile,

  // Validation
  validateResource,
  validateResources,
} from './importer';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * FHIR version supported by Darwin-MFC
 */
export const FHIR_VERSION = 'R4' as const;

/**
 * FHIR R4 specification version
 */
export const FHIR_SPEC_VERSION = '4.0.1' as const;

/**
 * Base URL for Darwin-MFC FHIR resources
 */
export const DARWIN_FHIR_BASE_URL = 'http://darwin-mfc.org/fhir' as const;

/**
 * RNDS (Brazil) base URL
 */
export const RNDS_BASE_URL = 'http://rnds.saude.gov.br/fhir/r4' as const;

/**
 * Supported FHIR resource types
 */
export const SUPPORTED_RESOURCE_TYPES = [
  'Patient',
  'Condition',
  'Medication',
  'MedicationStatement',
  'MedicationRequest',
  'Observation',
  'CarePlan',
  'DiagnosticReport',
  'Procedure',
  'Bundle',
] as const;

export type SupportedResourceType = typeof SUPPORTED_RESOURCE_TYPES[number];

/**
 * Check if a resource type is supported
 */
export function isSupportedResourceType(type: string): type is SupportedResourceType {
  return SUPPORTED_RESOURCE_TYPES.includes(type as SupportedResourceType);
}

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

/**
 * Quick export: Converts any Darwin data to FHIR bundle
 */
export function quickExportToFHIR(
  data: {
    pacientes?: DarwinPaciente[];
    doencas?: DarwinDoenca[];
    prescricoes?: DarwinPrescricao[];
    exames?: DarwinResultadoExame[];
  },
  options: BundleOptions = {}
): ExportResult {
  const { createEmptyBundle, addResourceToBundle } = require('./exporter');
  const {
    mapPacienteToFHIRPatient,
    mapDoencaToFHIRCondition,
    mapPrescricaoToFHIRMedicationRequest,
    mapResultadoExameToFHIRObservation,
  } = require('./mappers');

  const bundle = createEmptyBundle(options);
  const byType: Record<string, number> = {};
  let totalResources = 0;

  // Pacientes
  if (data.pacientes) {
    for (const paciente of data.pacientes) {
      const resource = mapPacienteToFHIRPatient(paciente);
      addResourceToBundle(bundle, resource, options.baseUrl);
      byType.Patient = (byType.Patient || 0) + 1;
      totalResources++;
    }
  }

  // Doenças
  if (data.doencas) {
    for (const doenca of data.doencas) {
      const resource = mapDoencaToFHIRCondition(doenca);
      addResourceToBundle(bundle, resource, options.baseUrl);
      byType.Condition = (byType.Condition || 0) + 1;
      totalResources++;
    }
  }

  // Prescrições
  if (data.prescricoes) {
    for (const prescricao of data.prescricoes) {
      const resource = mapPrescricaoToFHIRMedicationRequest(prescricao);
      addResourceToBundle(bundle, resource, options.baseUrl);
      byType.MedicationRequest = (byType.MedicationRequest || 0) + 1;
      totalResources++;
    }
  }

  // Exames
  if (data.exames) {
    for (const exame of data.exames) {
      const resource = mapResultadoExameToFHIRObservation(exame);
      addResourceToBundle(bundle, resource, options.baseUrl);
      byType.Observation = (byType.Observation || 0) + 1;
      totalResources++;
    }
  }

  return {
    success: true,
    bundle,
    data: JSON.stringify(bundle, null, 2),
    stats: {
      totalResources,
      byType,
      exportedAt: new Date().toISOString(),
    },
  };
}

/**
 * Quick import: Parses FHIR input and returns Darwin data
 */
export function quickImportFromFHIR(input: string): ImportResult {
  const { importFromString } = require('./importer');
  return importFromString(input, { validate: true, skipInvalid: true });
}

// Re-export types from mappers and exporter for convenience
import type { DarwinDoenca, DarwinMedicamento, DarwinPaciente, DarwinPrescricao, DarwinResultadoExame } from './mappers';
import type { BundleOptions, ExportResult } from './exporter';
import type { ImportResult } from './importer';
