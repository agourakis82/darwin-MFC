/**
 * FHIR EXPORTER - DARWIN-MFC
 * ==========================
 *
 * Utilitários para exportar dados Darwin-MFC em formato FHIR R4.
 * Suporta exportação individual e em bundle.
 */

import {
  FHIRBundle,
  FHIRResource,
  FHIRCondition,
  FHIRMedicationRequest,
  FHIRObservation,
  FHIRPatient,
  FHIRAnyResource,
} from './types';

import {
  DarwinDoenca,
  DarwinMedicamento,
  DarwinPaciente,
  DarwinPrescricao,
  DarwinResultadoExame,
  mapDoencaToFHIRCondition,
  mapMedicamentoToFHIRMedication,
  mapPrescricaoToFHIRMedicationRequest,
  mapResultadoExameToFHIRObservation,
  mapPacienteToFHIRPatient,
} from './mappers';

// ============================================================================
// TYPES
// ============================================================================

export interface ExportOptions {
  /** Formato de saída */
  format?: 'json' | 'ndjson';
  /** Incluir meta informações */
  includeMeta?: boolean;
  /** Versão do perfil FHIR */
  profileVersion?: string;
  /** Gerar UUIDs para recursos sem ID */
  generateIds?: boolean;
  /** Timestamp da exportação */
  timestamp?: string;
}

export interface BundleOptions extends ExportOptions {
  /** Tipo do bundle */
  bundleType?: FHIRBundle['type'];
  /** ID do bundle */
  bundleId?: string;
  /** Base URL para referências */
  baseUrl?: string;
}

export interface ExportResult {
  success: boolean;
  data?: string;
  bundle?: FHIRBundle;
  resources?: FHIRAnyResource[];
  errors?: string[];
  stats?: {
    totalResources: number;
    byType: Record<string, number>;
    exportedAt: string;
  };
}

// ============================================================================
// BUNDLE CREATION
// ============================================================================

/**
 * Cria um FHIR Bundle vazio
 */
export function createEmptyBundle(options: BundleOptions = {}): FHIRBundle {
  const now = new Date().toISOString();

  return {
    resourceType: 'Bundle',
    id: options.bundleId || generateUUID(),
    meta: {
      lastUpdated: options.timestamp || now,
    },
    type: options.bundleType || 'collection',
    timestamp: options.timestamp || now,
    entry: [],
  };
}

/**
 * Adiciona um recurso ao bundle
 */
export function addResourceToBundle(
  bundle: FHIRBundle,
  resource: FHIRAnyResource,
  baseUrl?: string
): FHIRBundle {
  const fullUrl = baseUrl
    ? `${baseUrl}/${resource.resourceType}/${resource.id}`
    : `urn:uuid:${resource.id || generateUUID()}`;

  bundle.entry = bundle.entry || [];
  bundle.entry.push({
    fullUrl,
    resource: resource as FHIRResource,
  });

  bundle.total = bundle.entry.length;

  return bundle;
}

/**
 * Cria um bundle de transação
 */
export function createTransactionBundle(
  resources: FHIRAnyResource[],
  options: BundleOptions = {}
): FHIRBundle {
  const bundle = createEmptyBundle({
    ...options,
    bundleType: 'transaction',
  });

  for (const resource of resources) {
    bundle.entry = bundle.entry || [];
    bundle.entry.push({
      fullUrl: `urn:uuid:${resource.id || generateUUID()}`,
      resource: resource as FHIRResource,
      request: {
        method: 'POST',
        url: resource.resourceType,
      },
    });
  }

  bundle.total = bundle.entry?.length || 0;

  return bundle;
}

// ============================================================================
// EXPORT FUNCTIONS
// ============================================================================

/**
 * Exporta uma lista de doenças para FHIR
 */
export function exportDoencasToFHIR(
  doencas: DarwinDoenca[],
  options: BundleOptions = {}
): ExportResult {
  try {
    const conditions = doencas.map((d) => mapDoencaToFHIRCondition(d));
    const bundle = createEmptyBundle(options);

    for (const condition of conditions) {
      addResourceToBundle(bundle, condition as FHIRAnyResource, options.baseUrl);
    }

    return {
      success: true,
      bundle,
      resources: conditions as FHIRAnyResource[],
      data: formatOutput(bundle, options.format),
      stats: {
        totalResources: conditions.length,
        byType: { Condition: conditions.length },
        exportedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    return {
      success: false,
      errors: [error instanceof Error ? error.message : 'Erro desconhecido'],
    };
  }
}

/**
 * Exporta prescrições para FHIR
 */
export function exportPrescricoesToFHIR(
  prescricoes: DarwinPrescricao[],
  options: BundleOptions = {}
): ExportResult {
  try {
    const medicationRequests = prescricoes.map((p) => mapPrescricaoToFHIRMedicationRequest(p));
    const bundle = createEmptyBundle(options);

    for (const request of medicationRequests) {
      addResourceToBundle(bundle, request as FHIRAnyResource, options.baseUrl);
    }

    return {
      success: true,
      bundle,
      resources: medicationRequests as FHIRAnyResource[],
      data: formatOutput(bundle, options.format),
      stats: {
        totalResources: medicationRequests.length,
        byType: { MedicationRequest: medicationRequests.length },
        exportedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    return {
      success: false,
      errors: [error instanceof Error ? error.message : 'Erro desconhecido'],
    };
  }
}

/**
 * Exporta resultados de exames para FHIR
 */
export function exportExamesToFHIR(
  resultados: DarwinResultadoExame[],
  options: BundleOptions = {}
): ExportResult {
  try {
    const observations = resultados.map((r) => mapResultadoExameToFHIRObservation(r));
    const bundle = createEmptyBundle(options);

    for (const observation of observations) {
      addResourceToBundle(bundle, observation as FHIRAnyResource, options.baseUrl);
    }

    return {
      success: true,
      bundle,
      resources: observations as FHIRAnyResource[],
      data: formatOutput(bundle, options.format),
      stats: {
        totalResources: observations.length,
        byType: { Observation: observations.length },
        exportedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    return {
      success: false,
      errors: [error instanceof Error ? error.message : 'Erro desconhecido'],
    };
  }
}

/**
 * Exporta pacientes para FHIR
 */
export function exportPacientesToFHIR(
  pacientes: DarwinPaciente[],
  options: BundleOptions = {}
): ExportResult {
  try {
    const patients = pacientes.map((p) => mapPacienteToFHIRPatient(p));
    const bundle = createEmptyBundle(options);

    for (const patient of patients) {
      addResourceToBundle(bundle, patient as FHIRAnyResource, options.baseUrl);
    }

    return {
      success: true,
      bundle,
      resources: patients as FHIRAnyResource[],
      data: formatOutput(bundle, options.format),
      stats: {
        totalResources: patients.length,
        byType: { Patient: patients.length },
        exportedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    return {
      success: false,
      errors: [error instanceof Error ? error.message : 'Erro desconhecido'],
    };
  }
}

/**
 * Exporta um paciente completo (com condições, prescrições e exames)
 */
export function exportPacienteCompletoToFHIR(
  paciente: DarwinPaciente,
  prescricoes: DarwinPrescricao[] = [],
  resultados: DarwinResultadoExame[] = [],
  options: BundleOptions = {}
): ExportResult {
  try {
    const errors: string[] = [];
    const resources: FHIRAnyResource[] = [];
    const byType: Record<string, number> = {};

    // Paciente
    const patient = mapPacienteToFHIRPatient(paciente);
    resources.push(patient as FHIRAnyResource);
    byType.Patient = 1;

    // Condições
    if (paciente.condicoes) {
      for (const doenca of paciente.condicoes) {
        const condition = mapDoencaToFHIRCondition(doenca, `Patient/${paciente.id}`);
        resources.push(condition as FHIRAnyResource);
        byType.Condition = (byType.Condition || 0) + 1;
      }
    }

    // Prescrições
    for (const prescricao of prescricoes.filter((p) => p.pacienteId === paciente.id)) {
      const medRequest = mapPrescricaoToFHIRMedicationRequest(prescricao);
      resources.push(medRequest as FHIRAnyResource);
      byType.MedicationRequest = (byType.MedicationRequest || 0) + 1;
    }

    // Exames
    for (const resultado of resultados.filter((r) => r.pacienteId === paciente.id)) {
      const observation = mapResultadoExameToFHIRObservation(resultado);
      resources.push(observation as FHIRAnyResource);
      byType.Observation = (byType.Observation || 0) + 1;
    }

    // Criar bundle
    const bundle = createEmptyBundle({
      ...options,
      bundleType: 'document',
    });

    for (const resource of resources) {
      addResourceToBundle(bundle, resource, options.baseUrl);
    }

    return {
      success: errors.length === 0,
      bundle,
      resources,
      data: formatOutput(bundle, options.format),
      errors: errors.length > 0 ? errors : undefined,
      stats: {
        totalResources: resources.length,
        byType,
        exportedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    return {
      success: false,
      errors: [error instanceof Error ? error.message : 'Erro desconhecido'],
    };
  }
}

// ============================================================================
// DOWNLOAD UTILITIES
// ============================================================================

/**
 * Gera dados para download como arquivo
 */
export function generateDownloadData(result: ExportResult): {
  content: string;
  filename: string;
  mimeType: string;
} {
  if (!result.success || !result.bundle) {
    throw new Error('Export result is not valid');
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const resourceType = result.stats?.byType
    ? Object.keys(result.stats.byType)[0] || 'bundle'
    : 'bundle';

  return {
    content: result.data || JSON.stringify(result.bundle, null, 2),
    filename: `darwin-fhir-${resourceType.toLowerCase()}-${timestamp}.json`,
    mimeType: 'application/fhir+json',
  };
}

/**
 * Cria blob para download no navegador
 */
export function createDownloadBlob(result: ExportResult): Blob {
  const { content, mimeType } = generateDownloadData(result);
  return new Blob([content], { type: mimeType });
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Valida um bundle FHIR
 */
export function validateBundle(bundle: FHIRBundle): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Verificar tipo
  if (bundle.resourceType !== 'Bundle') {
    errors.push('resourceType deve ser "Bundle"');
  }

  // Verificar tipo do bundle
  const validTypes = [
    'document',
    'message',
    'transaction',
    'transaction-response',
    'batch',
    'batch-response',
    'history',
    'searchset',
    'collection',
  ];
  if (!validTypes.includes(bundle.type)) {
    errors.push(`Tipo de bundle inválido: ${bundle.type}`);
  }

  // Verificar entradas
  if (bundle.entry) {
    for (let i = 0; i < bundle.entry.length; i++) {
      const entry = bundle.entry[i];

      if (!entry.resource) {
        warnings.push(`Entry ${i} não possui resource`);
      } else if (!entry.resource.resourceType) {
        errors.push(`Entry ${i} resource não possui resourceType`);
      }

      // Para transaction bundles, verificar request
      if (bundle.type === 'transaction' && !entry.request) {
        errors.push(`Entry ${i} em transaction bundle deve ter request`);
      }
    }
  }

  // Avisos
  if (!bundle.id) {
    warnings.push('Bundle não possui ID');
  }

  if (!bundle.timestamp && !bundle.meta?.lastUpdated) {
    warnings.push('Bundle não possui timestamp');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Gera UUID v4
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Formata saída conforme formato especificado
 */
function formatOutput(bundle: FHIRBundle, format?: 'json' | 'ndjson'): string {
  if (format === 'ndjson') {
    // NDJSON: cada recurso em uma linha
    const lines = bundle.entry?.map((e) => JSON.stringify(e.resource)) || [];
    return lines.join('\n');
  }

  // JSON padrão
  return JSON.stringify(bundle, null, 2);
}

// ============================================================================
// RNDS (Rede Nacional de Dados em Saúde) - Brasil
// ============================================================================

/**
 * Prepara bundle para envio à RNDS
 */
export function prepareForRNDS(bundle: FHIRBundle): FHIRBundle {
  // Adicionar perfis brasileiros
  if (bundle.meta) {
    bundle.meta.profile = bundle.meta.profile || [];
    if (!bundle.meta.profile.includes('http://rnds.saude.gov.br/fhir/r4/StructureDefinition/BRBundle')) {
      bundle.meta.profile.push('http://rnds.saude.gov.br/fhir/r4/StructureDefinition/BRBundle');
    }
  }

  // Processar cada entrada
  if (bundle.entry) {
    for (const entry of bundle.entry) {
      if (entry.resource) {
        // Adicionar perfis brasileiros específicos por tipo
        const brProfiles: Record<string, string> = {
          Patient: 'http://rnds.saude.gov.br/fhir/r4/StructureDefinition/BRIndividuo',
          Condition: 'http://rnds.saude.gov.br/fhir/r4/StructureDefinition/BRDiagnostico',
          Observation: 'http://rnds.saude.gov.br/fhir/r4/StructureDefinition/BRObservacao',
          MedicationRequest: 'http://rnds.saude.gov.br/fhir/r4/StructureDefinition/BRPrescricaoMedicamento',
        };

        const resourceType = entry.resource.resourceType;
        if (brProfiles[resourceType]) {
          entry.resource.meta = entry.resource.meta || {};
          entry.resource.meta.profile = entry.resource.meta.profile || [];
          if (!entry.resource.meta.profile.includes(brProfiles[resourceType])) {
            entry.resource.meta.profile.push(brProfiles[resourceType]);
          }
        }
      }
    }
  }

  return bundle;
}
