/**
 * FHIR IMPORTER - DARWIN-MFC
 * ==========================
 *
 * Utilitários para importar dados FHIR R4 para Darwin-MFC.
 * Suporta importação de bundles e recursos individuais.
 */

import {
  FHIRBundle,
  FHIRResource,
  FHIRCondition,
  FHIRMedication,
  FHIRMedicationRequest,
  FHIRObservation,
  FHIRPatient,
  FHIRAnyResource,
  isValidFHIRResource,
} from './types';

import {
  DarwinDoenca,
  DarwinMedicamento,
  DarwinPaciente,
  DarwinPrescricao,
  DarwinResultadoExame,
  mapFHIRConditionToDoenca,
  mapFHIRMedicationToMedicamento,
  mapFHIRObservationToResultadoExame,
  mapFHIRPatientToPaciente,
} from './mappers';

// ============================================================================
// TYPES
// ============================================================================

export interface ImportOptions {
  /** Validar recursos antes de importar */
  validate?: boolean;
  /** Ignorar recursos inválidos */
  skipInvalid?: boolean;
  /** Mesclar com dados existentes */
  mergeExisting?: boolean;
  /** ID base para recursos sem ID */
  baseId?: string;
  /** Filtrar por tipos de recurso */
  resourceTypes?: string[];
}

export interface ImportResult {
  success: boolean;
  data?: {
    pacientes?: Partial<DarwinPaciente>[];
    doencas?: Partial<DarwinDoenca>[];
    medicamentos?: Partial<DarwinMedicamento>[];
    prescricoes?: Partial<DarwinPrescricao>[];
    exames?: Partial<DarwinResultadoExame>[];
  };
  errors?: ImportError[];
  warnings?: string[];
  stats?: {
    totalProcessed: number;
    successful: number;
    failed: number;
    skipped: number;
    byType: Record<string, number>;
    importedAt: string;
  };
}

export interface ImportError {
  resourceType?: string;
  resourceId?: string;
  index?: number;
  message: string;
  originalError?: string;
}

export interface ParsedResource {
  type: string;
  resource: FHIRAnyResource;
  valid: boolean;
  errors?: string[];
}

// ============================================================================
// PARSING
// ============================================================================

/**
 * Parse JSON FHIR
 */
export function parseFHIRJson(input: string): FHIRAnyResource | FHIRBundle | null {
  try {
    const parsed = JSON.parse(input);

    if (!isValidFHIRResource(parsed)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

/**
 * Parse NDJSON (newline-delimited JSON)
 */
export function parseFHIRNdjson(input: string): FHIRAnyResource[] {
  const lines = input.split('\n').filter((line) => line.trim().length > 0);
  const resources: FHIRAnyResource[] = [];

  for (const line of lines) {
    try {
      const parsed = JSON.parse(line);
      if (isValidFHIRResource(parsed)) {
        resources.push(parsed);
      }
    } catch {
      // Ignorar linhas inválidas
    }
  }

  return resources;
}

/**
 * Extrai recursos de um bundle
 */
export function extractResourcesFromBundle(bundle: FHIRBundle): FHIRAnyResource[] {
  if (!bundle.entry) return [];

  return bundle.entry
    .filter((entry) => entry.resource && isValidFHIRResource(entry.resource))
    .map((entry) => entry.resource as FHIRAnyResource);
}

/**
 * Classifica recursos por tipo
 */
export function classifyResources(resources: FHIRAnyResource[]): Record<string, FHIRAnyResource[]> {
  const classified: Record<string, FHIRAnyResource[]> = {};

  for (const resource of resources) {
    const type = resource.resourceType;
    if (!classified[type]) {
      classified[type] = [];
    }
    classified[type].push(resource);
  }

  return classified;
}

// ============================================================================
// IMPORT FUNCTIONS
// ============================================================================

/**
 * Importa um bundle FHIR completo
 */
export function importFHIRBundle(
  bundle: FHIRBundle,
  options: ImportOptions = {}
): ImportResult {
  const errors: ImportError[] = [];
  const warnings: string[] = [];
  const stats = {
    totalProcessed: 0,
    successful: 0,
    failed: 0,
    skipped: 0,
    byType: {} as Record<string, number>,
    importedAt: new Date().toISOString(),
  };

  const data: ImportResult['data'] = {
    pacientes: [],
    doencas: [],
    medicamentos: [],
    prescricoes: [],
    exames: [],
  };

  // Validar bundle
  if (bundle.resourceType !== 'Bundle') {
    return {
      success: false,
      errors: [{ message: 'Input is not a valid FHIR Bundle' }],
    };
  }

  // Extrair recursos
  const resources = extractResourcesFromBundle(bundle);
  stats.totalProcessed = resources.length;

  // Filtrar por tipo se especificado
  const filteredResources = options.resourceTypes
    ? resources.filter((r) => options.resourceTypes!.includes(r.resourceType))
    : resources;

  if (filteredResources.length < resources.length) {
    stats.skipped = resources.length - filteredResources.length;
    warnings.push(
      `${stats.skipped} recursos ignorados por filtro de tipo`
    );
  }

  // Processar cada recurso
  for (let i = 0; i < filteredResources.length; i++) {
    const resource = filteredResources[i];

    try {
      const result = importSingleResource(resource, options);

      if (result.success && result.data) {
        // Adicionar aos dados correspondentes
        if (result.data.paciente) data.pacientes!.push(result.data.paciente);
        if (result.data.doenca) data.doencas!.push(result.data.doenca);
        if (result.data.medicamento) data.medicamentos!.push(result.data.medicamento);
        if (result.data.exame) data.exames!.push(result.data.exame);

        stats.successful++;
        stats.byType[resource.resourceType] = (stats.byType[resource.resourceType] || 0) + 1;
      } else if (result.error) {
        if (options.skipInvalid) {
          stats.skipped++;
          warnings.push(result.error);
        } else {
          stats.failed++;
          errors.push({
            resourceType: resource.resourceType,
            resourceId: resource.id,
            index: i,
            message: result.error,
          });
        }
      }
    } catch (error) {
      stats.failed++;
      errors.push({
        resourceType: resource.resourceType,
        resourceId: resource.id,
        index: i,
        message: 'Erro ao processar recurso',
        originalError: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return {
    success: errors.length === 0,
    data,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined,
    stats,
  };
}

/**
 * Importa um recurso FHIR individual
 */
export function importSingleResource(
  resource: FHIRAnyResource,
  options: ImportOptions = {}
): {
  success: boolean;
  data?: {
    paciente?: Partial<DarwinPaciente>;
    doenca?: Partial<DarwinDoenca>;
    medicamento?: Partial<DarwinMedicamento>;
    prescricao?: Partial<DarwinPrescricao>;
    exame?: Partial<DarwinResultadoExame>;
  };
  error?: string;
} {
  // Validar
  if (options.validate && !isValidFHIRResource(resource)) {
    return { success: false, error: 'Recurso FHIR inválido' };
  }

  switch (resource.resourceType) {
    case 'Patient':
      return {
        success: true,
        data: { paciente: mapFHIRPatientToPaciente(resource as FHIRPatient) },
      };

    case 'Condition':
      return {
        success: true,
        data: { doenca: mapFHIRConditionToDoenca(resource as FHIRCondition) },
      };

    case 'Medication':
      return {
        success: true,
        data: { medicamento: mapFHIRMedicationToMedicamento(resource as FHIRMedication) },
      };

    case 'Observation':
      return {
        success: true,
        data: { exame: mapFHIRObservationToResultadoExame(resource as FHIRObservation) },
      };

    case 'MedicationRequest':
      // MedicationRequest precisa de mais contexto para converter em prescrição completa
      return {
        success: true,
        data: {
          prescricao: {
            id: resource.id,
            // Outros campos precisam ser preenchidos com dados adicionais
          },
        },
      };

    default:
      return {
        success: false,
        error: `Tipo de recurso não suportado: ${resource.resourceType}`,
      };
  }
}

/**
 * Importa de string (JSON ou NDJSON)
 */
export function importFromString(
  input: string,
  options: ImportOptions = {}
): ImportResult {
  // Tentar como JSON primeiro
  const jsonResult = parseFHIRJson(input);

  if (jsonResult) {
    if (jsonResult.resourceType === 'Bundle') {
      return importFHIRBundle(jsonResult as FHIRBundle, options);
    } else {
      // Recurso individual
      const singleResult = importSingleResource(jsonResult, options);
      return {
        success: singleResult.success,
        data: singleResult.data ? {
          pacientes: singleResult.data.paciente ? [singleResult.data.paciente] : [],
          doencas: singleResult.data.doenca ? [singleResult.data.doenca] : [],
          medicamentos: singleResult.data.medicamento ? [singleResult.data.medicamento] : [],
          prescricoes: singleResult.data.prescricao ? [singleResult.data.prescricao] : [],
          exames: singleResult.data.exame ? [singleResult.data.exame] : [],
        } : undefined,
        errors: singleResult.error ? [{ message: singleResult.error }] : undefined,
        stats: {
          totalProcessed: 1,
          successful: singleResult.success ? 1 : 0,
          failed: singleResult.success ? 0 : 1,
          skipped: 0,
          byType: singleResult.success ? { [jsonResult.resourceType]: 1 } : {},
          importedAt: new Date().toISOString(),
        },
      };
    }
  }

  // Tentar como NDJSON
  const ndjsonResources = parseFHIRNdjson(input);

  if (ndjsonResources.length > 0) {
    // Criar bundle artificial para processar
    const artificialBundle: FHIRBundle = {
      resourceType: 'Bundle',
      type: 'collection',
      entry: ndjsonResources.map((resource) => ({
        resource: resource as FHIRResource,
      })),
    };

    return importFHIRBundle(artificialBundle, options);
  }

  return {
    success: false,
    errors: [{ message: 'Não foi possível parsear o input como FHIR JSON ou NDJSON' }],
    stats: {
      totalProcessed: 0,
      successful: 0,
      failed: 0,
      skipped: 0,
      byType: {},
      importedAt: new Date().toISOString(),
    },
  };
}

/**
 * Importa de arquivo
 */
export async function importFromFile(file: File, options: ImportOptions = {}): Promise<ImportResult> {
  try {
    const content = await file.text();
    return importFromString(content, options);
  } catch (error) {
    return {
      success: false,
      errors: [
        {
          message: 'Erro ao ler arquivo',
          originalError: error instanceof Error ? error.message : String(error),
        },
      ],
    };
  }
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Valida um recurso FHIR
 */
export function validateResource(resource: unknown): {
  valid: boolean;
  resourceType?: string;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Verificar se é objeto
  if (!resource || typeof resource !== 'object') {
    return { valid: false, errors: ['Input não é um objeto válido'], warnings };
  }

  const r = resource as Record<string, unknown>;

  // Verificar resourceType
  if (typeof r.resourceType !== 'string' || r.resourceType.length === 0) {
    errors.push('resourceType é obrigatório');
    return { valid: false, errors, warnings };
  }

  const resourceType = r.resourceType;

  // Verificações específicas por tipo
  switch (resourceType) {
    case 'Patient':
      // Paciente deve ter pelo menos um nome ou identificador
      if (!r.name && !r.identifier) {
        warnings.push('Patient deve ter name ou identifier');
      }
      break;

    case 'Condition':
      // Condition deve ter code
      if (!r.code) {
        warnings.push('Condition deve ter code');
      }
      break;

    case 'Observation':
      // Observation deve ter code e status
      if (!r.code) {
        errors.push('Observation deve ter code');
      }
      if (!r.status) {
        errors.push('Observation deve ter status');
      }
      break;

    case 'MedicationRequest':
      // MedicationRequest deve ter status, intent, subject
      if (!r.status) {
        errors.push('MedicationRequest deve ter status');
      }
      if (!r.intent) {
        errors.push('MedicationRequest deve ter intent');
      }
      if (!r.subject) {
        errors.push('MedicationRequest deve ter subject');
      }
      break;

    case 'Bundle':
      // Bundle deve ter type
      if (!r.type) {
        errors.push('Bundle deve ter type');
      }
      break;
  }

  // Avisos gerais
  if (!r.id) {
    warnings.push('Recurso não possui id');
  }

  if (!r.meta) {
    warnings.push('Recurso não possui meta');
  }

  return {
    valid: errors.length === 0,
    resourceType,
    errors,
    warnings,
  };
}

/**
 * Valida múltiplos recursos
 */
export function validateResources(resources: unknown[]): {
  valid: boolean;
  results: Array<{
    index: number;
    valid: boolean;
    resourceType?: string;
    errors: string[];
    warnings: string[];
  }>;
  summary: {
    total: number;
    valid: number;
    invalid: number;
    byType: Record<string, { valid: number; invalid: number }>;
  };
} {
  const results = resources.map((resource, index) => ({
    index,
    ...validateResource(resource),
  }));

  const summary = {
    total: resources.length,
    valid: results.filter((r) => r.valid).length,
    invalid: results.filter((r) => !r.valid).length,
    byType: {} as Record<string, { valid: number; invalid: number }>,
  };

  // Calcular por tipo
  for (const result of results) {
    if (result.resourceType) {
      if (!summary.byType[result.resourceType]) {
        summary.byType[result.resourceType] = { valid: 0, invalid: 0 };
      }
      if (result.valid) {
        summary.byType[result.resourceType].valid++;
      } else {
        summary.byType[result.resourceType].invalid++;
      }
    }
  }

  return {
    valid: summary.invalid === 0,
    results,
    summary,
  };
}

// FHIRMedication is imported from ./types
