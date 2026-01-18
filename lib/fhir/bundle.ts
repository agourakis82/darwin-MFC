/**
 * FHIR Bundle Resource Builder
 * Construtor fluente para criar bundles FHIR R4 (Collections)
 * @see https://www.hl7.org/fhir/bundle.html
 */

import type { FHIRBundle, FHIRResource } from './types';

/**
 * Builder fluente para bundles FHIR
 */
export class BundleBuilder {
  private bundle: FHIRBundle;

  constructor(
    id?: string,
    type: 'document' | 'message' | 'transaction' | 'transaction-response' | 'batch' | 'batch-response' | 'history' | 'searchset' | 'collection' = 'collection'
  ) {
    this.bundle = {
      resourceType: 'Bundle',
      id: id || `bundle-${Date.now()}`,
      type,
      entry: [],
    };
  }

  /**
   * Define tipo do bundle
   */
  setType(
    type: 'document' | 'message' | 'transaction' | 'transaction-response' | 'batch' | 'batch-response' | 'history' | 'searchset' | 'collection'
  ): this {
    this.bundle.type = type;
    return this;
  }

  /**
   * Define tipo como document
   */
  setTypeDocument(): this {
    return this.setType('document');
  }

  /**
   * Define tipo como transaction
   */
  setTypeTransaction(): this {
    return this.setType('transaction');
  }

  /**
   * Define tipo como batch
   */
  setTypeBatch(): this {
    return this.setType('batch');
  }

  /**
   * Define tipo como collection (padrão)
   */
  setTypeCollection(): this {
    return this.setType('collection');
  }

  /**
   * Define tipo como searchset
   */
  setTypeSearchSet(): this {
    return this.setType('searchset');
  }

  /**
   * Adiciona recurso simples ao bundle
   */
  addResource(
    resource: FHIRResource,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  ): this {
    if (!this.bundle.entry) {
      this.bundle.entry = [];
    }

    const entry: any = {
      fullUrl: `${resource.resourceType}/${resource.id}`,
      resource,
    };

    if (method) {
      entry.request = {
        method,
        url: `${resource.resourceType}/${resource.id}`,
      };
    }

    this.bundle.entry.push(entry);
    this.updateTotal();

    return this;
  }

  /**
   * Adiciona múltiplos recursos
   */
  addResources(resources: FHIRResource[]): this {
    resources.forEach((resource) => {
      this.addResource(resource);
    });
    return this;
  }

  /**
   * Adiciona entrada de bundle personalizada
   */
  addEntry(
    entryObj: {
      resource: FHIRResource;
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
      fullUrl?: string;
      search?: {
        mode?: 'match' | 'include' | 'outcome';
        score?: number;
      };
      response?: {
        status: string;
        location?: string;
        etag?: string;
        lastModified?: string;
      };
    }
  ): this {
    if (!this.bundle.entry) {
      this.bundle.entry = [];
    }

    const entry: any = {
      fullUrl: entryObj.fullUrl || `${entryObj.resource.resourceType}/${entryObj.resource.id}`,
      resource: entryObj.resource,
    };

    if (entryObj.method) {
      entry.request = {
        method: entryObj.method,
        url: `${entryObj.resource.resourceType}/${entryObj.resource.id}`,
      };
    }

    if (entryObj.search) {
      entry.search = entryObj.search;
    }

    if (entryObj.response) {
      entry.response = entryObj.response;
    }

    this.bundle.entry.push(entry);
    this.updateTotal();

    return this;
  }

  /**
   * Adiciona link do bundle
   */
  addLink(relation: string, url: string): this {
    if (!this.bundle.link) {
      this.bundle.link = [];
    }

    this.bundle.link.push({
      relation,
      url,
    });

    return this;
  }

  /**
   * Adiciona link 'self'
   */
  addSelfLink(url: string): this {
    return this.addLink('self', url);
  }

  /**
   * Adiciona link 'next'
   */
  addNextLink(url: string): this {
    return this.addLink('next', url);
  }

  /**
   * Adiciona link 'previous'
   */
  addPreviousLink(url: string): this {
    return this.addLink('previous', url);
  }

  /**
   * Remove recurso pelo índice
   */
  removeResource(index: number): this {
    if (this.bundle.entry && index >= 0 && index < this.bundle.entry.length) {
      this.bundle.entry.splice(index, 1);
      this.updateTotal();
    }
    return this;
  }

  /**
   * Limpa todos os recursos
   */
  clear(): this {
    this.bundle.entry = [];
    this.bundle.total = 0;
    return this;
  }

  /**
   * Retorna quantidade de recursos
   */
  getCount(): number {
    return this.bundle.entry?.length || 0;
  }

  /**
   * Filtra recursos por tipo
   */
  getResourcesByType(resourceType: string): FHIRResource[] {
    if (!this.bundle.entry) {
      return [];
    }
    return this.bundle.entry
      .filter((entry) => entry.resource?.resourceType === resourceType)
      .map((entry) => entry.resource!)
      .filter((resource): resource is FHIRResource => resource !== undefined);
  }

  /**
   * Retorna primeiro recurso de um tipo
   */
  getFirstResourceByType(resourceType: string): FHIRResource | undefined {
    if (!this.bundle.entry) {
      return undefined;
    }
    const entry = this.bundle.entry.find((entry) => entry.resource?.resourceType === resourceType);
    return entry?.resource;
  }

  /**
   * Atualiza o total
   */
  private updateTotal(): void {
    this.bundle.total = this.bundle.entry?.length || 0;
  }

  /**
   * Adiciona meta (versionId, lastUpdated, etc.)
   */
  addMeta(meta: { versionId?: string; lastUpdated?: string; profile?: string[] }): this {
    if (!this.bundle.meta) {
      this.bundle.meta = {};
    }
    this.bundle.meta = { ...this.bundle.meta, ...meta };
    return this;
  }

  /**
   * Retorna o bundle FHIR
   */
  build(): FHIRBundle {
    return this.bundle;
  }

  /**
   * Retorna o bundle FHIR como JSON
   */
  toJSON(): string {
    return JSON.stringify(this.bundle, null, 2);
  }

  /**
   * Retorna cópia do bundle
   */
  clone(): BundleBuilder {
    const builder = new BundleBuilder(this.bundle.id, this.bundle.type);
    builder.bundle = JSON.parse(JSON.stringify(this.bundle));
    return builder;
  }
}

/**
 * Cria um novo builder de bundle
 */
export function createBundle(
  id?: string,
  type?: 'document' | 'message' | 'transaction' | 'transaction-response' | 'batch' | 'batch-response' | 'history' | 'searchset' | 'collection'
): BundleBuilder {
  return new BundleBuilder(id, type);
}

/**
 * Cria um bundle de transação
 */
export function createTransactionBundle(id?: string): BundleBuilder {
  return new BundleBuilder(id, 'transaction');
}

/**
 * Cria um bundle de busca (searchset)
 */
export function createSearchSetBundle(id?: string): BundleBuilder {
  return new BundleBuilder(id, 'searchset');
}

/**
 * Cria um bundle de coleção (collection)
 */
export function createCollectionBundle(id?: string): BundleBuilder {
  return new BundleBuilder(id, 'collection');
}

/**
 * Exemplo de uso:
 *
 * const bundle = createCollectionBundle('clinical-data-bundle')
 *   .addResource(patientResource)
 *   .addResource(encounterResource)
 *   .addResource(observationResource)
 *   .addResource(conditionResource)
 *   .addSelfLink('http://darwin-mfc.org/bundles/clinical-data-bundle')
 *   .addMeta({
 *     lastUpdated: new Date().toISOString(),
 *   })
 *   .build();
 *
 * // Busca recursos específicos
 * const patients = bundle.getResourcesByType('Patient');
 * const observations = bundle.getResourcesByType('Observation');
 */
