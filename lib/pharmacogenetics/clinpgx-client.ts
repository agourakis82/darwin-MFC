/**
 * ClinPGx Client for Darwin-MFC
 * Supports both API access and data downloads
 * 
 * ClinPGx (formerly PharmGKB) provides pharmacogenetic data through:
 * 1. REST API (requires API key)
 * 2. Data downloads (free, no API key required)
 */

export interface ClinPGxVariant {
  id: string;
  name: string;
  geneSymbol: string;
  clinicalSignificance: string;
  alleleFrequency?: number;
  rsid?: string;
}

export interface ClinPGxGuideline {
  id: string;
  name: string;
  drugName: string;
  geneSymbol: string;
  recommendation: string;
  evidenceLevel: string;
  guidelineText?: string;
}

export interface ClinPGxDrug {
  id: string;
  name: string;
  atcCode?: string;
  rxnormId?: string;
  description?: string;
}

export interface ClinPGxGene {
  id: string;
  name: string;
  hgncId: string;
  description?: string;
}

export interface ClinPGxOptions {
  apiKey?: string;
  apiUrl?: string;
  cacheTTL?: number;
  useDownloads?: boolean; // Use data downloads instead of API
  dataPath?: string; // Path to downloaded ClinPGx data
}

export class ClinPGxClient {
  private apiKey: string | undefined;
  private apiUrl: string;
  private cache: Map<string, { data: any; timestamp: number }>;
  private cacheTTL: number;
  private useDownloads: boolean;
  private dataPath: string;

  constructor(options: ClinPGxOptions = {}) {
    this.apiKey = options.apiKey;
    this.apiUrl = options.apiUrl || 'https://api.pharmgkb.org/v1';
    this.cache = new Map();
    this.cacheTTL = options.cacheTTL || 3600000; // 1 hour default
    this.useDownloads = options.useDownloads || false;
    this.dataPath = options.dataPath || './data/clinpgx';
  }

  /**
   * Get variant information
   * Uses API if available, otherwise reads from downloaded data
   */
  async getVariantInfo(variantId: string): Promise<ClinPGxVariant> {
    const cacheKey = `variant:${variantId}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    let data: ClinPGxVariant;

    if (this.useDownloads) {
      data = await this.getVariantFromDownloads(variantId);
    } else {
      data = await this.getVariantFromAPI(variantId);
    }

    this.setCache(cacheKey, data);
    return data;
  }

  /**
   * Get drug guidelines
   * Uses API if available, otherwise reads from downloaded data
   */
  async getDrugGuidelines(drugId: string): Promise<ClinPGxGuideline[]> {
    const cacheKey = `guidelines:${drugId}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    let data: ClinPGxGuideline[];

    if (this.useDownloads) {
      data = await this.getGuidelinesFromDownloads(drugId);
    } else {
      data = await this.getGuidelinesFromAPI(drugId);
    }

    this.setCache(cacheKey, data);
    return data;
  }

  /**
   * Get drugs for a specific gene
   * Uses API if available, otherwise reads from downloaded data
   */
  async getGeneDrugs(geneSymbol: string): Promise<ClinPGxDrug[]> {
    const cacheKey = `geneDrugs:${geneSymbol}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    let data: ClinPGxDrug[];

    if (this.useDownloads) {
      data = await this.getGeneDrugsFromDownloads(geneSymbol);
    } else {
      data = await this.getGeneDrugsFromAPI(geneSymbol);
    }

    this.setCache(cacheKey, data);
    return data;
  }

  /**
   * Get gene information
   */
  async getGeneInfo(geneSymbol: string): Promise<ClinPGxGene> {
    const cacheKey = `gene:${geneSymbol}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    let data: ClinPGxGene;

    if (this.useDownloads) {
      data = await this.getGeneFromDownloads(geneSymbol);
    } else {
      data = await this.getGeneFromAPI(geneSymbol);
    }

    this.setCache(cacheKey, data);
    return data;
  }

  /**
   * Search for drugs by name
   */
  async searchDrugs(query: string): Promise<ClinPGxDrug[]> {
    const cacheKey = `searchDrugs:${query}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    let data: ClinPGxDrug[];

    if (this.useDownloads) {
      data = await this.searchDrugsFromDownloads(query);
    } else {
      data = await this.searchDrugsFromAPI(query);
    }

    this.setCache(cacheKey, data);
    return data;
  }

  // API Methods (require API key)
  // ===============================

  private async getVariantFromAPI(variantId: string): Promise<ClinPGxVariant> {
    if (!this.apiKey) {
      throw new Error('API key required for API access. Set useDownloads: true or provide apiKey.');
    }

    const response = await fetch(`${this.apiUrl}/data/variant/${variantId}`, {
      headers: {
        'Authorization': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`ClinPGx API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      geneSymbol: data.geneSymbol,
      clinicalSignificance: data.clinicalSignificance,
      alleleFrequency: data.alleleFrequency,
      rsid: data.rsid,
    };
  }

  private async getGuidelinesFromAPI(drugId: string): Promise<ClinPGxGuideline[]> {
    if (!this.apiKey) {
      throw new Error('API key required for API access. Set useDownloads: true or provide apiKey.');
    }

    const response = await fetch(`${this.apiUrl}/data/drug/${drugId}/guidelines`, {
      headers: {
        'Authorization': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`ClinPGx API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.map((g: any) => ({
      id: g.id,
      name: g.name,
      drugName: g.drugName,
      geneSymbol: g.geneSymbol,
      recommendation: g.recommendation,
      evidenceLevel: g.evidenceLevel,
      guidelineText: g.guidelineText,
    }));
  }

  private async getGeneDrugsFromAPI(geneSymbol: string): Promise<ClinPGxDrug[]> {
    if (!this.apiKey) {
      throw new Error('API key required for API access. Set useDownloads: true or provide apiKey.');
    }

    const response = await fetch(`${this.apiUrl}/data/gene/${geneSymbol}/drugs`, {
      headers: {
        'Authorization': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`ClinPGx API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.map((d: any) => ({
      id: d.id,
      name: d.name,
      atcCode: d.atcCode,
      rxnormId: d.rxnormId,
      description: d.description,
    }));
  }

  private async getGeneFromAPI(geneSymbol: string): Promise<ClinPGxGene> {
    if (!this.apiKey) {
      throw new Error('API key required for API access. Set useDownloads: true or provide apiKey.');
    }

    const response = await fetch(`${this.apiUrl}/data/gene/${geneSymbol}`, {
      headers: {
        'Authorization': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`ClinPGx API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      hgncId: data.hgncId,
      description: data.description,
    };
  }

  private async searchDrugsFromAPI(query: string): Promise<ClinPGxDrug[]> {
    if (!this.apiKey) {
      throw new Error('API key required for API access. Set useDownloads: true or provide apiKey.');
    }

    const response = await fetch(`${this.apiUrl}/data/drug/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`ClinPGx API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.map((d: any) => ({
      id: d.id,
      name: d.name,
      atcCode: d.atcCode,
      rxnormId: d.rxnormId,
      description: d.description,
    }));
  }

  // Download Methods (no API key required)
  // ======================================

  private async getVariantFromDownloads(variantId: string): Promise<ClinPGxVariant> {
    // This would read from downloaded variantAnnotations.zip
    // For now, return a placeholder
    throw new Error('Variant downloads not yet implemented. Please use API access.');
  }

  private async getGuidelinesFromDownloads(drugId: string): Promise<ClinPGxGuideline[]> {
    // This would read from downloaded guidelineAnnotations.json.zip
    // For now, return a placeholder
    throw new Error('Guideline downloads not yet implemented. Please use API access.');
  }

  private async getGeneDrugsFromDownloads(geneSymbol: string): Promise<ClinPGxDrug[]> {
    // This would read from downloaded relationships.zip
    // For now, return a placeholder
    throw new Error('Gene drugs downloads not yet implemented. Please use API access.');
  }

  private async getGeneFromDownloads(geneSymbol: string): Promise<ClinPGxGene> {
    // This would read from downloaded genes.zip
    // For now, return a placeholder
    throw new Error('Gene downloads not yet implemented. Please use API access.');
  }

  private async searchDrugsFromDownloads(query: string): Promise<ClinPGxDrug[]> {
    // This would read from downloaded drugs.zip
    // For now, return a placeholder
    throw new Error('Drug search downloads not yet implemented. Please use API access.');
  }

  // Cache Methods
  // =============

  private getFromCache(key: string): any {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > this.cacheTTL) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; hits: number; misses: number } {
    return {
      size: this.cache.size,
      hits: 0, // TODO: Implement hit tracking
      misses: 0, // TODO: Implement miss tracking
    };
  }
}

export default ClinPGxClient;
