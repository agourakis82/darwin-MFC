/**
 * PharmGKB Client for Pharmacogenetics Integration
 * State of the Art Implementation
 */

// ============================================================================
// TYPES
// ============================================================================

export interface PharmGKBVariant {
  variantId: string;
  gene: string;
  variant: string;
  clinicalAnnotation: ClinicalAnnotation;
  drugInteractions: DrugInteraction[];
  dosingGuidelines: DosingGuideline[];
}

export interface ClinicalAnnotation {
  level: '1A' | '1B' | '2A' | '2B' | '3' | '4';
  phenotype: string;
  significance: string;
  evidence: string;
  recommendation?: string;
}

export interface DrugInteraction {
  drug1Id: string;
  drug1Name: string;
  drug2Id: string;
  drug2Name: string;
  severity: 'contraindicated' | 'major' | 'moderate' | 'minor';
  mechanism: string;
  recommendation: string;
  evidenceLevel: string;
}

export interface DosingGuideline {
  drug: string;
  drugId: string;
  gene: string;
  phenotype: string;
  recommendation: string;
  alternativeDrugs: string[];
  evidenceLevel: string;
}

export interface PharmGKBDisease {
  diseaseId: string;
  diseaseName: string;
  relatedGenes: string[];
  relatedDrugs: string[];
}

export interface PharmGKBGene {
  geneId: string;
  geneName: string;
  variants: PharmGKBVariant[];
  relatedDrugs: string[];
}

// ============================================================================
// PHARMGKB CLIENT
// ============================================================================

export class PharmGKBClient {
  private apiKey: string;
  private baseUrl = 'https://api.pharmgkb.org/v1';
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheDuration = 3600000; // 1 hour in ms

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.PHARMGKB_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('PharmGKB API key not provided. Some features may be limited.');
    }
  }

  // ==========================================================================
  // API METHODS
  // ==========================================================================

  /**
   * Get variant information
   */
  async getVariantInfo(variantId: string): Promise<PharmGKBVariant> {
    const cacheKey = `variant:${variantId}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached as PharmGKBVariant;
    }

    const response = await this.fetchWithAuth(`/variant/${variantId}`);
    const data = await response.json();

    this.setToCache(cacheKey, data);
    return data;
  }

  /**
   * Get drug dosing guidelines
   */
  async getDrugGuidelines(drugId: string): Promise<DosingGuideline[]> {
    const cacheKey = `guidelines:${drugId}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached as DosingGuideline[];
    }

    const response = await this.fetchWithAuth(`/drug/${drugId}/guidelines`);
    const data = await response.json();

    this.setToCache(cacheKey, data);
    return data;
  }

  /**
   * Get drugs associated with a gene
   */
  async getGeneDrugs(gene: string): Promise<PharmGKBDisease[]> {
    const cacheKey = `gene-drugs:${gene}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached as PharmGKBDisease[];
    }

    const response = await this.fetchWithAuth(`/gene/${gene}/drugs`);
    const data = await response.json();

    this.setToCache(cacheKey, data);
    return data;
  }

  /**
   * Get gene information
   */
  async getGeneInfo(geneId: string): Promise<PharmGKBGene> {
    const cacheKey = `gene:${geneId}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached as PharmGKBGene;
    }

    const response = await this.fetchWithAuth(`/gene/${geneId}`);
    const data = await response.json();

    this.setToCache(cacheKey, data);
    return data;
  }

  /**
   * Get clinical annotations for a variant
   */
  async getClinicalAnnotation(variantId: string): Promise<ClinicalAnnotation> {
    const cacheKey = `annotation:${variantId}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached as ClinicalAnnotation;
    }

    const response = await this.fetchWithAuth(`/variant/${variantId}/annotation`);
    const data = await response.json();

    this.setToCache(cacheKey, data);
    return data;
  }

  /**
   * Get drug interactions
   */
  async getDrugInteractions(drugId: string): Promise<DrugInteraction[]> {
    const cacheKey = `interactions:${drugId}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached as DrugInteraction[];
    }

    const response = await this.fetchWithAuth(`/drug/${drugId}/interactions`);
    const data = await response.json();

    this.setToCache(cacheKey, data);
    return data;
  }

  /**
   * Search for drugs
   */
  async searchDrugs(query: string): Promise<any[]> {
    const cacheKey = `search-drugs:${query}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached as any[];
    }

    const response = await this.fetchWithAuth(`/search/drugs?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    this.setToCache(cacheKey, data);
    return data;
  }

  /**
   * Search for genes
   */
  async searchGenes(query: string): Promise<any[]> {
    const cacheKey = `search-genes:${query}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached as any[];
    }

    const response = await this.fetchWithAuth(`/search/genes?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    this.setToCache(cacheKey, data);
    return data;
  }

  // ==========================================================================
  // BATCH OPERATIONS
  // ==========================================================================

  /**
   * Get guidelines for multiple drugs
   */
  async getBulkDrugGuidelines(drugIds: string[]): Promise<Map<string, DosingGuideline[]>> {
    const results = new Map<string, DosingGuideline[]>();
    
    await Promise.all(
      drugIds.map(async (drugId) => {
        try {
          const guidelines = await this.getDrugGuidelines(drugId);
          results.set(drugId, guidelines);
        } catch (error) {
          console.error(`Failed to get guidelines for drug ${drugId}:`, error);
        }
      })
    );

    return results;
  }

  /**
   * Get variant information for multiple variants
   */
  async getBulkVariantInfo(variantIds: string[]): Promise<Map<string, PharmGKBVariant>> {
    const results = new Map<string, PharmGKBVariant>();
    
    await Promise.all(
      variantIds.map(async (variantId) => {
        try {
          const variant = await this.getVariantInfo(variantId);
          results.set(variantId, variant);
        } catch (error) {
          console.error(`Failed to get variant info for ${variantId}:`, error);
        }
      })
    );

    return results;
  }

  // ==========================================================================
  // PRIVATE METHODS
  // ==========================================================================

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    return fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...(options.headers as Record<string, string>)
      }
    });
  }

  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    
    if (!cached) {
      return null;
    }

    const isExpired = Date.now() - cached.timestamp > this.cacheDuration;
    
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  private setToCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });

    // Clean old cache entries periodically
    if (this.cache.size > 1000) {
      this.cleanCache();
    }
  }

  private cleanCache(): void {
    const now = Date.now();
    
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.cacheDuration) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

let pharmgkbClientInstance: PharmGKBClient | null = null;

export function getPharmGKBClient(): PharmGKBClient {
  if (!pharmgkbClientInstance) {
    pharmgkbClientInstance = new PharmGKBClient();
  }
  return pharmgkbClientInstance;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get severity level from PharmGKB level
 */
export function getSeverityLevel(level: string): 'critical' | 'warning' | 'info' {
  if (['1A', '1B'].includes(level)) {
    return 'critical';
  }
  if (['2A', '2B'].includes(level)) {
    return 'warning';
  }
  return 'info';
}

/**
 * Check if alert should be shown based on level
 */
export function shouldShowAlert(level: string): boolean {
  return ['1A', '1B', '2A'].includes(level);
}

/**
 * Get phenotype from genotype (simplified mapping)
 */
export function getPhenotypeFromGenotype(gene: string, genotype: string): string {
  // This is a simplified mapping - in production, use PharmGKB API
  const phenotypeMap: Record<string, Record<string, string>> = {
    'CYP2D6': {
      '*1/*1': 'Normal Metabolizer',
      '*1/*4': 'Intermediate Metabolizer',
      '*4/*4': 'Poor Metabolizer',
      '*1xN': 'Ultrarapid Metabolizer'
    },
    'CYP2C19': {
      '*1/*1': 'Normal Metabolizer',
      '*1/*2': 'Intermediate Metabolizer',
      '*2/*2': 'Poor Metabolizer',
      '*17': 'Ultrarapid Metabolizer'
    },
    'TPMT': {
      '*1/*1': 'Normal Activity',
      '*1/*3A': 'Intermediate Activity',
      '*3A/*3A': 'Low Activity'
    },
    'DPYD': {
      '*1/*1': 'Normal Activity',
      '*2A/*2A': 'Intermediate Activity',
      '*2A/*13': 'Low Activity'
    }
  };

  return phenotypeMap[gene]?.[genotype] || 'Unknown';
}

/**
 * Get relevant genes for a drug class
 */
export function getRelevantGenesForDrugClass(drugClass: string): string[] {
  const geneMap: Record<string, string[]> = {
    'ssri': ['CYP2D6', 'CYP2C19', 'SERT1A'],
    'opioid': ['CYP2D6', 'CYP3A4', 'OPRM1'],
    'anticoagulant': ['CYP2C9', 'VKORC1', 'CYP4F2'],
    'antidepressant': ['CYP2D6', 'CYP2C19', 'CYP3A4'],
    'antipsychotic': ['CYP2D6', 'CYP3A4', 'DRD2'],
    'statin': ['SLCO1B1', 'CYP3A4', 'ABCG2'],
    'beta-blocker': ['CYP2D6', 'ADRB1'],
    'ace-inhibitor': ['CYP3A5', 'ACE'],
    'antihypertensive': ['CYP2D6', 'CYP2C9', 'AGTR1']
  };

  return geneMap[drugClass.toLowerCase()] || [];
}
