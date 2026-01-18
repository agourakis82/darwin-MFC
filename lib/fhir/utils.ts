/**
 * Utilitários para FHIR R4
 * Funções auxiliares para trabalhar com recursos FHIR
 */

import type {
  FHIRResource,
  FHIRBundle,
  FHIRCoding,
  FHIRCodeableConcept,
  FHIRQuantity,
  FHIRPeriod,
  FHIRReference,
} from './types';
import { FHIR_CODE_SYSTEMS } from './types';

/**
 * Cria um recurso FHIR genérico com metadados
 */
export function createFHIRResource(
  resourceType: string,
  id?: string,
  meta?: { versionId?: string; lastUpdated?: string; profile?: string[] }
): FHIRResource {
  const resource: FHIRResource = {
    resourceType,
    id: id || `${resourceType.toLowerCase()}-${Date.now()}`,
  };

  if (meta) {
    resource.meta = meta;
  }

  return resource;
}

/**
 * Gera um ID único FHIR
 */
export function generateFHIRId(resourceType: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `${resourceType.toLowerCase()}-${timestamp}-${random}`;
}

/**
 * Cria uma referência FHIR
 */
export function createFHIRReference(
  resourceType: string,
  id: string,
  display?: string
): FHIRReference {
  return {
    reference: `${resourceType}/${id}`,
    display: display || `${resourceType}/${id}`,
  };
}

/**
 * Extrai ID de uma referência FHIR
 */
export function extractIdFromReference(reference?: string): string | undefined {
  if (!reference) return undefined;
  const parts = reference.split('/');
  return parts.length > 1 ? parts[1] : undefined;
}

/**
 * Extrai tipo de recurso de uma referência FHIR
 */
export function extractResourceTypeFromReference(reference?: string): string | undefined {
  if (!reference) return undefined;
  const parts = reference.split('/');
  return parts.length > 0 ? parts[0] : undefined;
}

/**
 * Cria um CodeableConcept
 */
export function createCodeableConcept(
  code: string,
  display?: string,
  system?: string,
  additionalCodings?: FHIRCoding[]
): FHIRCodeableConcept {
  const codings: FHIRCoding[] = [
    {
      system: system || FHIR_CODE_SYSTEMS.SNOMED_CT,
      code,
      display: display || code,
    },
  ];

  if (additionalCodings) {
    codings.push(...additionalCodings);
  }

  return {
    coding: codings,
    text: display || code,
  };
}

/**
 * Cria uma Quantidade
 */
export function createQuantity(
  value: number,
  code: string,
  system?: string,
  unit?: string
): FHIRQuantity {
  return {
    value,
    code,
    system: system || 'http://unitsofmeasure.org',
    unit: unit || code,
  };
}

/**
 * Cria um Período
 */
export function createPeriod(
  start?: string | Date,
  end?: string | Date
): FHIRPeriod {
  const period: FHIRPeriod = {};

  if (start) {
    period.start = start instanceof Date ? start.toISOString() : start;
  }

  if (end) {
    period.end = end instanceof Date ? end.toISOString() : end;
  }

  return period;
}

/**
 * Valida um recurso FHIR
 */
export function validateFHIRResource(resource: FHIRResource): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!resource.resourceType) {
    errors.push('resourceType é obrigatório');
  }

  if (!resource.id) {
    errors.push('id é obrigatório');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Converte um recurso FHIR para JSON
 */
export function fhirToJSON(resource: FHIRResource, pretty: boolean = true): string {
  return JSON.stringify(resource, null, pretty ? 2 : 0);
}

/**
 * Converte JSON para recurso FHIR
 */
export function jsonToFHIR(json: string): FHIRResource {
  return JSON.parse(json) as FHIRResource;
}

/**
 * Mescla dois recursos FHIR
 */
export function mergeFHIRResources(
  source: FHIRResource,
  target: FHIRResource,
  overwrite: boolean = false
): FHIRResource {
  if (source.resourceType !== target.resourceType) {
    throw new Error(
      `Não é possível mesclar recursos de tipos diferentes: ${source.resourceType} vs ${target.resourceType}`
    );
  }

  if (overwrite) {
    return { ...target, ...source };
  } else {
    return { ...source, ...target };
  }
}

/**
 * Clona um recurso FHIR
 */
export function cloneFHIRResource<T extends FHIRResource>(resource: T): T {
  return JSON.parse(JSON.stringify(resource)) as T;
}

/**
 * Formata uma data FHIR (ISO 8601)
 */
export function formatFHIRDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Formata uma data/hora FHIR (ISO 8601)
 */
export function formatFHIRDateTime(date: Date): string {
  return date.toISOString();
}

/**
 * Calcula a idade em anos baseado em uma data de nascimento
 */
export function calculateAge(birthDate: string): number {
  const today = new Date();
  const born = new Date(birthDate);
  let age = today.getFullYear() - born.getFullYear();
  const monthDiff = today.getMonth() - born.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < born.getDate())) {
    age--;
  }

  return age;
}

/**
 * Obtém código de um CodeableConcept
 */
export function getCodeFromCodeableConcept(
  concept?: FHIRCodeableConcept,
  system?: string
): string | undefined {
  if (!concept?.coding) return undefined;

  if (system) {
    const coding = concept.coding.find((c) => c.system === system);
    return coding?.code;
  }

  return concept.coding[0]?.code;
}

/**
 * Obtém display de um CodeableConcept
 */
export function getDisplayFromCodeableConcept(concept?: FHIRCodeableConcept): string | undefined {
  if (concept?.text) return concept.text;
  if (concept?.coding?.[0]?.display) return concept.coding[0].display;
  return concept?.coding?.[0]?.code;
}

/**
 * Procura recurso em bundle pelo ID
 */
export function findResourceInBundle(
  bundle: FHIRBundle,
  resourceType: string,
  id: string
): FHIRResource | undefined {
  if (!bundle.entry) return undefined;

  return bundle.entry
    .filter((entry) => entry.resource?.resourceType === resourceType && entry.resource?.id === id)
    .map((entry) => entry.resource)
    .find((resource): resource is FHIRResource => resource !== undefined);
}

/**
 * Filtra recursos de um bundle por tipo
 */
export function filterBundleByResourceType(
  bundle: FHIRBundle,
  resourceType: string
): FHIRResource[] {
  if (!bundle.entry) return [];

  return bundle.entry
    .filter((entry) => entry.resource?.resourceType === resourceType)
    .map((entry) => entry.resource)
    .filter((resource): resource is FHIRResource => resource !== undefined);
}

/**
 * Converte um bundle para mapa de recursos
 */
export function bundleToResourceMap(bundle: FHIRBundle): Map<string, FHIRResource> {
  const map = new Map<string, FHIRResource>();

  if (bundle.entry) {
    bundle.entry.forEach((entry) => {
      if (entry.resource?.id) {
        const key = `${entry.resource.resourceType}/${entry.resource.id}`;
        map.set(key, entry.resource);
      }
    });
  }

  return map;
}

/**
 * Formata uma quantidade para display
 */
export function formatQuantity(quantity?: FHIRQuantity): string {
  if (!quantity) return '';

  const value = quantity.value ?? '';
  const unit = quantity.unit || quantity.code || '';

  return `${value} ${unit}`.trim();
}

/**
 * Formata um período para display
 */
export function formatPeriod(period?: FHIRPeriod): string {
  if (!period) return '';

  const start = period.start ? new Date(period.start).toLocaleDateString('pt-BR') : '';
  const end = period.end ? new Date(period.end).toLocaleDateString('pt-BR') : '';

  if (start && end) {
    return `${start} até ${end}`;
  } else if (start) {
    return `A partir de ${start}`;
  } else if (end) {
    return `Até ${end}`;
  }

  return '';
}

/**
 * Verifica se um recurso está ativo
 */
export function isResourceActive(resource: FHIRResource): boolean {
  const activeResources = ['Patient', 'Practitioner', 'Organization'];
  if (activeResources.includes(resource.resourceType)) {
    return (resource as any).active !== false;
  }
  return true;
}

/**
 * Obtém a data de última atualização
 */
export function getLastUpdated(resource: FHIRResource): Date | undefined {
  if (resource.meta?.lastUpdated) {
    return new Date(resource.meta.lastUpdated);
  }
  return undefined;
}

/**
 * Define a data de última atualização
 */
export function setLastUpdated(resource: FHIRResource, date?: Date): FHIRResource {
  if (!resource.meta) {
    resource.meta = {};
  }
  resource.meta.lastUpdated = (date || new Date()).toISOString();
  return resource;
}

/**
 * Obtém a versão do recurso
 */
export function getVersionId(resource: FHIRResource): string | undefined {
  return resource.meta?.versionId;
}

/**
 * Define a versão do recurso
 */
export function setVersionId(resource: FHIRResource, version: string): FHIRResource {
  if (!resource.meta) {
    resource.meta = {};
  }
  resource.meta.versionId = version;
  return resource;
}

/**
 * Incrementa a versão do recurso
 */
export function incrementVersion(resource: FHIRResource): FHIRResource {
  if (!resource.meta) {
    resource.meta = {};
  }

  const currentVersion = parseInt(resource.meta.versionId || '0', 10);
  resource.meta.versionId = String(currentVersion + 1);
  return resource;
}

/**
 * Comparador para ordenar recursos FHIR por data de última atualização
 */
export function compareByLastUpdated(a: FHIRResource, b: FHIRResource): number {
  const dateA = a.meta?.lastUpdated ? new Date(a.meta.lastUpdated).getTime() : 0;
  const dateB = b.meta?.lastUpdated ? new Date(b.meta.lastUpdated).getTime() : 0;
  return dateB - dateA; // Mais recente primeiro
}

/**
 * Cria um sumário de um recurso FHIR
 */
export function createFHIRResourceSummary(resource: FHIRResource): {
  resourceType: string;
  id?: string;
  display: string;
  lastUpdated?: string;
} {
  let display = resource.resourceType;

  switch (resource.resourceType) {
    case 'Patient': {
      const patient = resource as any;
      if (patient.name?.[0]?.text) {
        display = patient.name[0].text;
      }
      break;
    }
    case 'Observation': {
      const obs = resource as any;
      display = obs.code?.text || obs.code?.coding?.[0]?.display || 'Observation';
      break;
    }
    case 'Condition': {
      const cond = resource as any;
      display = cond.code?.text || cond.code?.coding?.[0]?.display || 'Condition';
      break;
    }
    case 'Medication': {
      const med = resource as any;
      display = med.code?.text || med.code?.coding?.[0]?.display || 'Medication';
      break;
    }
    case 'Encounter': {
      const enc = resource as any;
      display = enc.type?.[0]?.text || enc.type?.[0]?.coding?.[0]?.display || 'Encounter';
      break;
    }
  }

  return {
    resourceType: resource.resourceType,
    id: resource.id,
    display,
    lastUpdated: resource.meta?.lastUpdated,
  };
}
