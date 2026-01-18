/**
 * FHIR Bundle Builder
 *
 * Utilities para construir Bundles FHIR R4 com múltiplos recursos
 * Suporta diferentes tipos de bundle: collection, searchset, batch, transaction
 *
 * @see https://www.hl7.org/fhir/bundle.html
 */

import type { FHIRBundle, FHIRResource } from '../types';

/**
 * Tipo de Bundle FHIR
 */
export type BundleType =
  | 'document'
  | 'message'
  | 'transaction'
  | 'transaction-response'
  | 'batch'
  | 'batch-response'
  | 'history'
  | 'searchset'
  | 'collection';

/**
 * Opções para criação de Bundle
 */
export interface BundleBuilderOptions {
  /** ID único do bundle */
  id?: string;

  /** Tipo de bundle (padrão: collection) */
  type?: BundleType;

  /** Links relacionados */
  links?: Array<{
    relation: string;
    url: string;
  }>;

  /** Metadados do bundle */
  meta?: {
    versionId?: string;
    lastUpdated?: string;
  };
}

/**
 * Opções para entrada de bundle
 */
export interface BundleEntryOptions {
  /** URL completa do recurso */
  fullUrl?: string;

  /** Links da entrada */
  links?: Array<{
    relation: string;
    url: string;
  }>;

  /** Modo de busca (match, include, outcome) */
  searchMode?: 'match' | 'include' | 'outcome';

  /** Score de relevância da busca (0-1) */
  searchScore?: number;

  /** Detalhes da requisição (para transaction) */
  request?: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
  };

  /** Detalhes da resposta (para transaction-response) */
  response?: {
    status: string;
    location?: string;
    etag?: string;
    lastModified?: string;
  };
}

/**
 * Builder fluente para construir Bundles FHIR
 *
 * Exemplo:
 * ```typescript
 * const bundle = new BundleBuilder()
 *   .setType('transaction')
 *   .addResource(condition, { method: 'POST', url: 'Condition' })
 *   .addResource(medication, { method: 'POST', url: 'Medication' })
 *   .build();
 * ```
 */
export class BundleBuilder {
  private id: string;
  private type: BundleType = 'collection';
  private resources: FHIRResource[] = [];
  private entries: FHIRBundle['entry'] = [];
  private links: Array<{ relation: string; url: string }> = [];
  private meta?: {
    versionId?: string;
    lastUpdated?: string;
  };

  constructor(options: BundleBuilderOptions = {}) {
    this.id = options.id || generateId('bundle');
    this.type = options.type || 'collection';
    this.links = options.links || [];
    this.meta = options.meta;
  }

  /**
   * Define o tipo de bundle
   */
  setType(type: BundleType): this {
    this.type = type;
    return this;
  }

  /**
   * Define o ID do bundle
   */
  setId(id: string): this {
    this.id = id;
    return this;
  }

  /**
   * Adiciona um recurso FHIR ao bundle
   *
   * @param resource Recurso a adicionar
   * @param entryOptions Opções da entrada do bundle
   * @returns this para encadeamento
   */
  addResource(
    resource: FHIRResource,
    entryOptions: BundleEntryOptions = {}
  ): this {
    this.resources.push(resource);

    // Gera fullUrl padrão se não especificado
    const fullUrl =
      entryOptions.fullUrl ||
      `urn:uuid:${resource.id || generateId(resource.resourceType)}`;

    const entry: NonNullable<FHIRBundle['entry']>[0] = {
      fullUrl,
      resource,
      link: entryOptions.links,
      search: entryOptions.searchMode
        ? {
            mode: entryOptions.searchMode,
            score: entryOptions.searchScore,
          }
        : undefined,
      request: entryOptions.request,
      response: entryOptions.response,
    };

    if (this.entries) {
      this.entries.push(entry);
    } else {
      this.entries = [entry];
    }
    return this;
  }

  /**
   * Adiciona múltiplos recursos ao bundle
   *
   * @param resources Array de recursos
   * @param entryOptions Opções aplicadas a todos os recursos
   * @returns this para encadeamento
   */
  addResources(
    resources: FHIRResource[],
    entryOptions?: BundleEntryOptions
  ): this {
    resources.forEach((resource) => this.addResource(resource, entryOptions));
    return this;
  }

  /**
   * Adiciona um link relacionado ao bundle
   */
  addLink(relation: string, url: string): this {
    this.links.push({ relation, url });
    return this;
  }

  /**
   * Define metadados do bundle
   */
  setMeta(meta: { versionId?: string; lastUpdated?: string }): this {
    this.meta = meta;
    return this;
  }

  /**
   * Constrói e retorna o FHIRBundle
   */
  build(): FHIRBundle {
    const bundle: FHIRBundle = {
      resourceType: 'Bundle',
      id: this.id,
      type: this.type,
      total: this.resources.length,
      entry: this.entries && this.entries.length > 0 ? this.entries : undefined,
      link: this.links.length > 0 ? this.links : undefined,
    };

    if (this.meta) {
      bundle.meta = this.meta;
    }

    return bundle;
  }

  /**
   * Retorna o número de recursos no bundle
   */
  getSize(): number {
    return this.resources.length;
  }

  /**
   * Limpa o builder para reutilização
   */
  clear(): this {
    this.resources = [];
    this.entries = [];
    this.links = [];
    return this;
  }
}

/**
 * Cria um bundle de coleção com múltiplos recursos
 *
 * @param resources Array de recursos FHIR
 * @param options Opções do builder
 * @returns FHIRBundle do tipo collection
 */
export function createCollectionBundle(
  resources: FHIRResource[],
  options: BundleBuilderOptions = {}
): FHIRBundle {
  return new BundleBuilder({
    ...options,
    type: 'collection',
  })
    .addResources(resources)
    .build();
}

/**
 * Cria um bundle de busca (searchset)
 *
 * @param resources Array de recursos encontrados
 * @param total Total de recursos encontrados (pode ser > resources.length para paginação)
 * @param options Opções do builder
 * @returns FHIRBundle do tipo searchset
 */
export function createSearchSetBundle(
  resources: FHIRResource[],
  total: number = resources.length,
  options: BundleBuilderOptions = {}
): FHIRBundle {
  const bundle = new BundleBuilder({
    ...options,
    type: 'searchset',
  }).build();

  bundle.total = total;

  // Adiciona recursos com score de busca
  bundle.entry = resources.map((resource, index) => ({
    fullUrl: `urn:uuid:${resource.id || generateId(resource.resourceType)}`,
    resource,
    search: {
      mode: 'match',
      score: 1 - index * 0.1, // Scores decrescentes para primeira melhor correspondência
    },
  }));

  return bundle;
}

/**
 * Cria um bundle de transação
 *
 * Exemplo:
 * ```typescript
 * const bundle = createTransactionBundle([
 *   {
 *     resource: condition,
 *     request: { method: 'POST', url: 'Condition' }
 *   },
 *   {
 *     resource: medication,
 *     request: { method: 'PUT', url: `Medication/${medication.id}` }
 *   }
 * ]);
 * ```
 *
 * @param entries Array de entradas com recursos e requisições
 * @param options Opções do builder
 * @returns FHIRBundle do tipo transaction
 */
export function createTransactionBundle(
  entries: Array<{
    resource: FHIRResource;
    request: {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
      url: string;
    };
  }>,
  options: BundleBuilderOptions = {}
): FHIRBundle {
  const bundle = new BundleBuilder({
    ...options,
    type: 'transaction',
  }).build();

  bundle.entry = entries.map((entry) => ({
    fullUrl: `urn:uuid:${entry.resource.id || generateId(entry.resource.resourceType)}`,
    resource: entry.resource,
    request: entry.request,
  }));

  bundle.total = entries.length;
  return bundle;
}

/**
 * Cria um bundle de resposta de transação
 *
 * @param resources Array de recursos
 * @param responses Array de respostas (status, location, etc)
 * @param options Opções do builder
 * @returns FHIRBundle do tipo transaction-response
 */
export function createTransactionResponseBundle(
  resources: FHIRResource[],
  responses: Array<{
    status: string;
    location?: string;
    etag?: string;
    lastModified?: string;
  }>,
  options: BundleBuilderOptions = {}
): FHIRBundle {
  const bundle = new BundleBuilder({
    ...options,
    type: 'transaction-response',
  }).build();

  bundle.entry = resources.map((resource, index) => ({
    fullUrl: `urn:uuid:${resource.id || generateId(resource.resourceType)}`,
    resource,
    response: responses[index] || { status: '200' },
  }));

  bundle.total = resources.length;
  return bundle;
}

/**
 * Cria um bundle de histórico
 *
 * @param resources Array de versões do recurso (do mais antigo ao mais novo)
 * @param resourceType Tipo de recurso no histórico
 * @param options Opções do builder
 * @returns FHIRBundle do tipo history
 */
export function createHistoryBundle(
  resources: FHIRResource[],
  resourceType: string,
  options: BundleBuilderOptions = {}
): FHIRBundle {
  const bundle = new BundleBuilder({
    ...options,
    type: 'history',
  }).build();

  bundle.entry = resources.map((resource) => ({
    fullUrl: `urn:uuid:${resource.id || generateId(resourceType)}`,
    resource,
    request: {
      method: 'GET',
      url: `${resourceType}/${resource.id}/_history/${resource.meta?.versionId || '1'}`,
    },
  }));

  bundle.total = resources.length;
  return bundle;
}

/**
 * Valida um bundle FHIR
 *
 * @param bundle Bundle a validar
 * @returns Array de erros encontrados (vazio se válido)
 */
export function validateBundle(bundle: FHIRBundle): string[] {
  const errors: string[] = [];

  // Validações básicas
  if (!bundle.resourceType || bundle.resourceType !== 'Bundle') {
    errors.push('Bundle deve ter resourceType = "Bundle"');
  }

  if (!bundle.type) {
    errors.push('Bundle deve ter um tipo definido');
  }

  // Validações específicas por tipo
  if (bundle.type === 'transaction' && bundle.entry) {
    bundle.entry.forEach((entry, index) => {
      if (!entry.request) {
        errors.push(`Entrada ${index} de transaction deve ter um request`);
      }
    });
  }

  if ((bundle.type === 'searchset' || bundle.type === 'history') && bundle.entry) {
    bundle.entry.forEach((entry, index) => {
      if (!entry.resource) {
        errors.push(`Entrada ${index} de ${bundle.type} deve ter um resource`);
      }
    });
  }

  // Valida recursos contidos
  if (bundle.entry) {
    bundle.entry.forEach((entry, index) => {
      if (entry.resource && !entry.resource.resourceType) {
        errors.push(`Recurso na entrada ${index} não tem resourceType`);
      }
    });
  }

  return errors;
}

/**
 * Converte bundle em formato JSON-LD para processamento RDF
 *
 * @param bundle Bundle FHIR a converter
 * @returns String JSON-LD
 */
export function bundleToJsonLd(bundle: FHIRBundle): string {
  const jsonLd = {
    '@context': 'http://www.hl7.org/fhir/jsonld',
    '@type': bundle.type,
    id: bundle.id,
    total: bundle.total,
    entry: bundle.entry?.map((entry) => ({
      '@type': 'BundleEntry',
      fullUrl: entry.fullUrl,
      resource: entry.resource,
    })),
  };

  return JSON.stringify(jsonLd, null, 2);
}

/**
 * Função auxiliar: gerar ID único
 */
function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Extrai todos os recursos de um bundle
 *
 * @param bundle Bundle FHIR
 * @returns Array de recursos contidos
 */
export function extractResourcesFromBundle(bundle: FHIRBundle): FHIRResource[] {
  if (!bundle.entry) return [];
  return bundle.entry
    .filter((entry) => entry.resource)
    .map((entry) => entry.resource!);
}

/**
 * Filtra recursos do bundle por tipo
 *
 * @param bundle Bundle FHIR
 * @param resourceType Tipo de recurso a filtrar
 * @returns Array de recursos do tipo especificado
 */
export function filterResourcesByType<T extends FHIRResource>(
  bundle: FHIRBundle,
  resourceType: string
): T[] {
  return extractResourcesFromBundle(bundle).filter(
    (resource) => resource.resourceType === resourceType
  ) as T[];
}
