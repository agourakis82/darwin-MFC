/**
 * DARWIN-MFC LOINC BROWSER SERVICE
 * =================================
 *
 * Service for searching and retrieving LOINC codes.
 * Uses the LOINC FHIR API and local data for common codes.
 */

import type {
  LoincConcept,
  LoincConceptMini,
  LoincSearchParams,
  LoincSearchResult,
  LoincSearchResponse,
  LoincClass,
  LoincStatus,
  LoincPanel,
  LoincPanelMember,
} from '../types/loinc';

// =============================================================================
// CONFIGURATION
// =============================================================================

const LOINC_FHIR_BASE = 'https://fhir.loinc.org';
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

/**
 * LOINC API configuration
 */
interface LoincConfig {
  apiBase: string;
  username?: string;
  password?: string;
  cacheEnabled: boolean;
  cacheTTL: number;
}

const defaultConfig: LoincConfig = {
  apiBase: LOINC_FHIR_BASE,
  cacheEnabled: true,
  cacheTTL: CACHE_TTL_MS,
};

// =============================================================================
// CACHE
// =============================================================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

function getCached<T>(key: string, ttl: number): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

function setCache<T>(key: string, data: T, ttl: number): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    expiresAt: Date.now() + ttl,
  });
}

// =============================================================================
// LOINC BROWSER CLASS
// =============================================================================

export class LoincBrowser {
  private config: LoincConfig;

  constructor(config: Partial<LoincConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * Search LOINC codes
   */
  async search(params: LoincSearchParams): Promise<LoincSearchResponse> {
    const startTime = Date.now();

    // Build cache key
    const cacheKey = `search:${JSON.stringify(params)}`;

    // Check cache
    if (this.config.cacheEnabled) {
      const cached = getCached<LoincSearchResponse>(cacheKey, this.config.cacheTTL);
      if (cached) return cached;
    }

    // First, search local data for common codes
    const localResults = this.searchLocalCodes(params);

    // If we have enough local results or query is for a specific code, return local
    if (localResults.length >= (params.limit || 20) || this.isSpecificCodeQuery(params.query)) {
      const response: LoincSearchResponse = {
        results: localResults.slice(0, params.limit || 20),
        total: localResults.length,
        offset: params.offset || 0,
        limit: params.limit || 20,
        query: params.query,
        executionTimeMs: Date.now() - startTime,
      };

      if (this.config.cacheEnabled) {
        setCache(cacheKey, response, this.config.cacheTTL);
      }

      return response;
    }

    // Try FHIR API for broader searches
    try {
      const apiResults = await this.searchFhirApi(params);

      // Merge with local results, deduplicate
      const mergedResults = this.mergeResults(localResults, apiResults);

      const response: LoincSearchResponse = {
        results: mergedResults.slice(params.offset || 0, (params.offset || 0) + (params.limit || 20)),
        total: mergedResults.length,
        offset: params.offset || 0,
        limit: params.limit || 20,
        query: params.query,
        executionTimeMs: Date.now() - startTime,
      };

      if (this.config.cacheEnabled) {
        setCache(cacheKey, response, this.config.cacheTTL);
      }

      return response;
    } catch {
      // If API fails, return local results only
      const response: LoincSearchResponse = {
        results: localResults.slice(0, params.limit || 20),
        total: localResults.length,
        offset: params.offset || 0,
        limit: params.limit || 20,
        query: params.query,
        executionTimeMs: Date.now() - startTime,
      };

      return response;
    }
  }

  /**
   * Get LOINC concept by code
   */
  async getConcept(loincNum: string): Promise<LoincConcept | null> {
    const cacheKey = `concept:${loincNum}`;

    if (this.config.cacheEnabled) {
      const cached = getCached<LoincConcept>(cacheKey, this.config.cacheTTL);
      if (cached) return cached;
    }

    // Check local data first
    const localConcept = this.getLocalConcept(loincNum);
    if (localConcept) {
      if (this.config.cacheEnabled) {
        setCache(cacheKey, localConcept, this.config.cacheTTL);
      }
      return localConcept;
    }

    // Try FHIR API
    try {
      const concept = await this.fetchConceptFromApi(loincNum);
      if (concept && this.config.cacheEnabled) {
        setCache(cacheKey, concept, this.config.cacheTTL);
      }
      return concept;
    } catch {
      return null;
    }
  }

  /**
   * Get panel members
   */
  async getPanelMembers(panelLoincNum: string): Promise<LoincPanelMember[]> {
    const cacheKey = `panel:${panelLoincNum}`;

    if (this.config.cacheEnabled) {
      const cached = getCached<LoincPanelMember[]>(cacheKey, this.config.cacheTTL);
      if (cached) return cached;
    }

    // Check local panels
    const localPanel = LOCAL_PANELS[panelLoincNum];
    if (localPanel) {
      if (this.config.cacheEnabled) {
        setCache(cacheKey, localPanel.members, this.config.cacheTTL);
      }
      return localPanel.members;
    }

    return [];
  }

  /**
   * Get codes by class
   */
  async getByClass(loincClass: LoincClass, limit = 50): Promise<LoincConceptMini[]> {
    const results = await this.search({
      query: '',
      class: loincClass,
      limit,
    });

    return results.results.map(r => r.concept);
  }

  /**
   * Validate LOINC code
   */
  async validateCode(loincNum: string): Promise<boolean> {
    const concept = await this.getConcept(loincNum);
    return concept !== null && concept.status === 'ACTIVE';
  }

  // ===========================================================================
  // PRIVATE METHODS
  // ===========================================================================

  private isSpecificCodeQuery(query: string): boolean {
    // Check if query looks like a LOINC code (digits with hyphen)
    return /^\d{1,7}(-\d)?$/.test(query.trim());
  }

  private searchLocalCodes(params: LoincSearchParams): LoincSearchResult[] {
    const query = params.query.toLowerCase().trim();
    const results: LoincSearchResult[] = [];

    for (const concept of LOCAL_LOINC_CODES) {
      // Filter by status
      if (params.status && !params.status.includes(concept.status)) {
        continue;
      }

      // Filter by class
      if (params.class) {
        const classes = Array.isArray(params.class) ? params.class : [params.class];
        if (!classes.includes(concept.class as LoincClass)) {
          continue;
        }
      }

      // Calculate match score
      let score = 0;
      let matchedOn: 'name' | 'code' | 'synonym' | 'component' = 'name';

      // Code match (highest priority)
      if (concept.loincNum === query || concept.loincNum.startsWith(query)) {
        score = 100;
        matchedOn = 'code';
      }
      // Exact name match
      else if (concept.longCommonName.toLowerCase() === query) {
        score = 95;
        matchedOn = 'name';
      }
      // Component match
      else if (concept.component.toLowerCase().includes(query)) {
        score = 80;
        matchedOn = 'component';
      }
      // Name contains query
      else if (concept.longCommonName.toLowerCase().includes(query)) {
        score = 70;
        matchedOn = 'name';
      }
      // Short name match
      else if (concept.shortName.toLowerCase().includes(query)) {
        score = 60;
        matchedOn = 'synonym';
      }
      // No match
      else {
        continue;
      }

      results.push({
        concept: {
          loincNum: concept.loincNum,
          longCommonName: concept.longCommonName,
          shortName: concept.shortName,
          component: concept.component,
          system: concept.system,
          class: concept.class,
          status: concept.status,
          rank: concept.rank,
        },
        score,
        matchedOn,
      });
    }

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    return results;
  }

  private getLocalConcept(loincNum: string): LoincConcept | null {
    return LOCAL_LOINC_CODES.find(c => c.loincNum === loincNum) || null;
  }

  private async searchFhirApi(params: LoincSearchParams): Promise<LoincSearchResult[]> {
    const url = new URL(`${this.config.apiBase}/CodeSystem/$lookup`);

    // FHIR parameters
    const fhirParams = new URLSearchParams({
      system: 'http://loinc.org',
      code: params.query,
    });

    const response = await fetch(`${url}?${fhirParams}`, {
      headers: {
        'Accept': 'application/fhir+json',
      },
    });

    if (!response.ok) {
      throw new Error(`LOINC API error: ${response.status}`);
    }

    const data = await response.json();

    // Parse FHIR response into our format
    return this.parseFhirSearchResults(data);
  }

  private async fetchConceptFromApi(loincNum: string): Promise<LoincConcept | null> {
    const url = `${this.config.apiBase}/CodeSystem/$lookup?system=http://loinc.org&code=${loincNum}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/fhir+json',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return this.parseFhirConcept(data);
  }

  private parseFhirSearchResults(data: Record<string, unknown>): LoincSearchResult[] {
    // Parse FHIR Bundle/Parameters response
    const results: LoincSearchResult[] = [];

    // FHIR response structure varies, handle common cases
    if (data.parameter && Array.isArray(data.parameter)) {
      const params = data.parameter as Array<{ name: string; valueString?: string }>;

      const display = params.find(p => p.name === 'display')?.valueString;
      const code = params.find(p => p.name === 'code')?.valueString;

      if (code && display) {
        results.push({
          concept: {
            loincNum: code,
            longCommonName: display,
            shortName: display,
            component: display.split(' ')[0] || '',
            system: 'Ser/Plas',
            class: 'CHEM',
            status: 'ACTIVE',
          },
          score: 80,
          matchedOn: 'name',
        });
      }
    }

    return results;
  }

  private parseFhirConcept(data: Record<string, unknown>): LoincConcept | null {
    if (!data.parameter) return null;

    const params = (data.parameter as Array<{ name: string; valueString?: string }>);
    const getValue = (name: string) => params.find(p => p.name === name)?.valueString;

    const code = getValue('code');
    const display = getValue('display');

    if (!code || !display) return null;

    return {
      loincNum: code,
      component: display.split(':')[0]?.trim() || display,
      property: 'MCnc',
      timeAspect: 'Pt',
      system: 'Ser/Plas',
      scale: 'Qn',
      class: 'CHEM',
      longCommonName: display,
      shortName: display,
      status: 'ACTIVE',
    };
  }

  private mergeResults(
    local: LoincSearchResult[],
    api: LoincSearchResult[]
  ): LoincSearchResult[] {
    const seen = new Set(local.map(r => r.concept.loincNum));
    const merged = [...local];

    for (const result of api) {
      if (!seen.has(result.concept.loincNum)) {
        merged.push(result);
        seen.add(result.concept.loincNum);
      }
    }

    return merged.sort((a, b) => b.score - a.score);
  }
}

// =============================================================================
// LOCAL LOINC DATA (Common Laboratory Codes)
// =============================================================================

const LOCAL_LOINC_CODES: LoincConcept[] = [
  // ===== CHEMISTRY - Glucose =====
  {
    loincNum: '2345-7',
    component: 'Glucose',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Glucose [Mass/volume] in Serum or Plasma',
    shortName: 'Glucose SerPl-mCnc',
    consumerName: 'Blood sugar',
    status: 'ACTIVE',
    exampleUnits: 'mg/dL',
    exampleUcumUnits: 'mg/dL',
    rank: 1,
  },
  {
    loincNum: '1558-6',
    component: 'Glucose^fasting',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Fasting glucose [Mass/volume] in Serum or Plasma',
    shortName: 'Glucose p fast SerPl-mCnc',
    consumerName: 'Fasting blood sugar',
    status: 'ACTIVE',
    exampleUnits: 'mg/dL',
    rank: 2,
  },
  {
    loincNum: '4548-4',
    component: 'Hemoglobin A1c/Hemoglobin.total',
    property: 'NFr',
    timeAspect: 'Pt',
    system: 'Bld',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Hemoglobin A1c/Hemoglobin.total in Blood',
    shortName: 'Hgb A1c MFr Bld',
    consumerName: 'HbA1c',
    status: 'ACTIVE',
    exampleUnits: '%',
    rank: 3,
  },

  // ===== CHEMISTRY - Lipids =====
  {
    loincNum: '2093-3',
    component: 'Cholesterol',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Cholesterol [Mass/volume] in Serum or Plasma',
    shortName: 'Cholest SerPl-mCnc',
    consumerName: 'Total cholesterol',
    status: 'ACTIVE',
    exampleUnits: 'mg/dL',
    rank: 4,
  },
  {
    loincNum: '2085-9',
    component: 'Cholesterol in HDL',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Cholesterol in HDL [Mass/volume] in Serum or Plasma',
    shortName: 'HDL Chol SerPl-mCnc',
    consumerName: 'HDL cholesterol',
    status: 'ACTIVE',
    exampleUnits: 'mg/dL',
    rank: 5,
  },
  {
    loincNum: '13457-7',
    component: 'Cholesterol in LDL',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    method: 'Calculated',
    class: 'CHEM',
    longCommonName: 'Cholesterol in LDL [Mass/volume] in Serum or Plasma by calculation',
    shortName: 'LDL Chol Calc SerPl-mCnc',
    consumerName: 'LDL cholesterol (calculated)',
    status: 'ACTIVE',
    exampleUnits: 'mg/dL',
    rank: 6,
  },
  {
    loincNum: '2571-8',
    component: 'Triglyceride',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Triglyceride [Mass/volume] in Serum or Plasma',
    shortName: 'Trigl SerPl-mCnc',
    consumerName: 'Triglycerides',
    status: 'ACTIVE',
    exampleUnits: 'mg/dL',
    rank: 7,
  },

  // ===== CHEMISTRY - Renal =====
  {
    loincNum: '2160-0',
    component: 'Creatinine',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Creatinine [Mass/volume] in Serum or Plasma',
    shortName: 'Creat SerPl-mCnc',
    consumerName: 'Creatinine',
    status: 'ACTIVE',
    exampleUnits: 'mg/dL',
    rank: 8,
  },
  {
    loincNum: '3094-0',
    component: 'Urea nitrogen',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Urea nitrogen [Mass/volume] in Serum or Plasma',
    shortName: 'BUN SerPl-mCnc',
    consumerName: 'BUN',
    status: 'ACTIVE',
    exampleUnits: 'mg/dL',
    rank: 9,
  },
  {
    loincNum: '62238-1',
    component: 'Glomerular filtration rate/1.73 sq M.predicted',
    property: 'ArVRat',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    method: 'CKD-EPI',
    class: 'CHEM',
    longCommonName: 'Glomerular filtration rate/1.73 sq M.predicted [Volume Rate/Area] in Serum, Plasma or Blood by Creatinine-based formula (CKD-EPI)',
    shortName: 'GFR CKD-EPI SerPlBld-ArVRat',
    consumerName: 'eGFR (CKD-EPI)',
    status: 'ACTIVE',
    exampleUnits: 'mL/min/1.73m2',
    rank: 10,
  },

  // ===== CHEMISTRY - Electrolytes =====
  {
    loincNum: '2951-2',
    component: 'Sodium',
    property: 'SCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Sodium [Moles/volume] in Serum or Plasma',
    shortName: 'Sodium SerPl-sCnc',
    consumerName: 'Sodium',
    status: 'ACTIVE',
    exampleUnits: 'mmol/L',
    rank: 11,
  },
  {
    loincNum: '2823-3',
    component: 'Potassium',
    property: 'SCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Potassium [Moles/volume] in Serum or Plasma',
    shortName: 'Potassium SerPl-sCnc',
    consumerName: 'Potassium',
    status: 'ACTIVE',
    exampleUnits: 'mmol/L',
    rank: 12,
  },
  {
    loincNum: '2075-0',
    component: 'Chloride',
    property: 'SCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Chloride [Moles/volume] in Serum or Plasma',
    shortName: 'Chloride SerPl-sCnc',
    consumerName: 'Chloride',
    status: 'ACTIVE',
    exampleUnits: 'mmol/L',
    rank: 13,
  },
  {
    loincNum: '2028-9',
    component: 'Carbon dioxide, total',
    property: 'SCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Carbon dioxide, total [Moles/volume] in Serum or Plasma',
    shortName: 'CO2 SerPl-sCnc',
    consumerName: 'CO2 (bicarbonate)',
    status: 'ACTIVE',
    exampleUnits: 'mmol/L',
    rank: 14,
  },

  // ===== CHEMISTRY - Liver =====
  {
    loincNum: '1920-8',
    component: 'Aspartate aminotransferase',
    property: 'CCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Aspartate aminotransferase [Enzymatic activity/volume] in Serum or Plasma',
    shortName: 'AST SerPl-cCnc',
    consumerName: 'AST (SGOT)',
    status: 'ACTIVE',
    exampleUnits: 'U/L',
    rank: 15,
  },
  {
    loincNum: '1742-6',
    component: 'Alanine aminotransferase',
    property: 'CCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Alanine aminotransferase [Enzymatic activity/volume] in Serum or Plasma',
    shortName: 'ALT SerPl-cCnc',
    consumerName: 'ALT (SGPT)',
    status: 'ACTIVE',
    exampleUnits: 'U/L',
    rank: 16,
  },
  {
    loincNum: '1975-2',
    component: 'Bilirubin.total',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Bilirubin.total [Mass/volume] in Serum or Plasma',
    shortName: 'Bilirub SerPl-mCnc',
    consumerName: 'Bilirubin (total)',
    status: 'ACTIVE',
    exampleUnits: 'mg/dL',
    rank: 17,
  },
  {
    loincNum: '1751-7',
    component: 'Albumin',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Albumin [Mass/volume] in Serum or Plasma',
    shortName: 'Albumin SerPl-mCnc',
    consumerName: 'Albumin',
    status: 'ACTIVE',
    exampleUnits: 'g/dL',
    rank: 18,
  },

  // ===== CHEMISTRY - Cardiac =====
  {
    loincNum: '67151-1',
    component: 'Troponin T.cardiac',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    method: 'High sensitivity',
    class: 'CHEM',
    longCommonName: 'Troponin T.cardiac [Mass/volume] in Serum or Plasma by High sensitivity method',
    shortName: 'cTnT HS SerPl-mCnc',
    consumerName: 'Troponin T (high sensitivity)',
    status: 'ACTIVE',
    exampleUnits: 'ng/L',
    rank: 19,
  },
  {
    loincNum: '33762-6',
    component: 'Natriuretic peptide.B prohormone N-Terminal',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Natriuretic peptide.B prohormone N-Terminal [Mass/volume] in Serum or Plasma',
    shortName: 'NT-proBNP SerPl-mCnc',
    consumerName: 'NT-proBNP',
    status: 'ACTIVE',
    exampleUnits: 'pg/mL',
    rank: 20,
  },

  // ===== CHEMISTRY - Thyroid =====
  {
    loincNum: '3016-3',
    component: 'Thyrotropin',
    property: 'ACnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Thyrotropin [Units/volume] in Serum or Plasma',
    shortName: 'TSH SerPl-aCnc',
    consumerName: 'TSH',
    status: 'ACTIVE',
    exampleUnits: 'mIU/L',
    rank: 21,
  },
  {
    loincNum: '3024-7',
    component: 'Thyroxine (T4) free',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    class: 'CHEM',
    longCommonName: 'Thyroxine (T4) free [Mass/volume] in Serum or Plasma',
    shortName: 'T4 Free SerPl-mCnc',
    consumerName: 'Free T4',
    status: 'ACTIVE',
    exampleUnits: 'ng/dL',
    rank: 22,
  },

  // ===== CHEMISTRY - Inflammatory =====
  {
    loincNum: '30522-7',
    component: 'C reactive protein',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    method: 'High sensitivity',
    class: 'CHEM',
    longCommonName: 'C reactive protein [Mass/volume] in Serum or Plasma by High sensitivity method',
    shortName: 'CRP HS SerPl-mCnc',
    consumerName: 'CRP (high sensitivity)',
    status: 'ACTIVE',
    exampleUnits: 'mg/L',
    rank: 23,
  },

  // ===== HEMATOLOGY - CBC =====
  {
    loincNum: '6690-2',
    component: 'Leukocytes',
    property: 'NCnc',
    timeAspect: 'Pt',
    system: 'Bld',
    scale: 'Qn',
    class: 'HEM/BC',
    longCommonName: 'Leukocytes [#/volume] in Blood by Automated count',
    shortName: 'WBC # Bld Auto',
    consumerName: 'White blood cell count',
    status: 'ACTIVE',
    exampleUnits: '10*3/uL',
    rank: 24,
  },
  {
    loincNum: '789-8',
    component: 'Erythrocytes',
    property: 'NCnc',
    timeAspect: 'Pt',
    system: 'Bld',
    scale: 'Qn',
    class: 'HEM/BC',
    longCommonName: 'Erythrocytes [#/volume] in Blood by Automated count',
    shortName: 'RBC # Bld Auto',
    consumerName: 'Red blood cell count',
    status: 'ACTIVE',
    exampleUnits: '10*6/uL',
    rank: 25,
  },
  {
    loincNum: '718-7',
    component: 'Hemoglobin',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'Bld',
    scale: 'Qn',
    class: 'HEM/BC',
    longCommonName: 'Hemoglobin [Mass/volume] in Blood',
    shortName: 'Hgb Bld-mCnc',
    consumerName: 'Hemoglobin',
    status: 'ACTIVE',
    exampleUnits: 'g/dL',
    rank: 26,
  },
  {
    loincNum: '4544-3',
    component: 'Hematocrit',
    property: 'NFr',
    timeAspect: 'Pt',
    system: 'Bld',
    scale: 'Qn',
    class: 'HEM/BC',
    longCommonName: 'Hematocrit [Volume Fraction] of Blood by Automated count',
    shortName: 'Hct VFr Bld Auto',
    consumerName: 'Hematocrit',
    status: 'ACTIVE',
    exampleUnits: '%',
    rank: 27,
  },
  {
    loincNum: '777-3',
    component: 'Platelets',
    property: 'NCnc',
    timeAspect: 'Pt',
    system: 'Bld',
    scale: 'Qn',
    class: 'HEM/BC',
    longCommonName: 'Platelets [#/volume] in Blood by Automated count',
    shortName: 'Platelet # Bld Auto',
    consumerName: 'Platelet count',
    status: 'ACTIVE',
    exampleUnits: '10*3/uL',
    rank: 28,
  },

  // ===== COAGULATION =====
  {
    loincNum: '5902-2',
    component: 'Prothrombin time',
    property: 'Time',
    timeAspect: 'Pt',
    system: 'PPP',
    scale: 'Qn',
    class: 'COAG',
    longCommonName: 'Prothrombin time (PT) in Platelet poor plasma by Coagulation assay',
    shortName: 'PT PPP',
    consumerName: 'PT',
    status: 'ACTIVE',
    exampleUnits: 's',
    rank: 29,
  },
  {
    loincNum: '6301-6',
    component: 'INR',
    property: 'NFr',
    timeAspect: 'Pt',
    system: 'Bld',
    scale: 'Qn',
    class: 'COAG',
    longCommonName: 'INR in Blood by Coagulation assay',
    shortName: 'INR Bld Coag',
    consumerName: 'INR',
    status: 'ACTIVE',
    exampleUnits: '{INR}',
    rank: 30,
  },
  {
    loincNum: '3173-2',
    component: 'aPTT',
    property: 'Time',
    timeAspect: 'Pt',
    system: 'PPP',
    scale: 'Qn',
    class: 'COAG',
    longCommonName: 'Activated partial thromboplastin time (aPTT) in Platelet poor plasma by Coagulation assay',
    shortName: 'aPTT PPP',
    consumerName: 'aPTT',
    status: 'ACTIVE',
    exampleUnits: 's',
    rank: 31,
  },
  {
    loincNum: '48065-7',
    component: 'Fibrin D-dimer FEU',
    property: 'MCnc',
    timeAspect: 'Pt',
    system: 'PPP',
    scale: 'Qn',
    class: 'COAG',
    longCommonName: 'Fibrin D-dimer FEU [Mass/volume] in Platelet poor plasma',
    shortName: 'D-Dimer FEU PPP-mCnc',
    consumerName: 'D-dimer',
    status: 'ACTIVE',
    exampleUnits: 'ng/mL FEU',
    rank: 32,
  },

  // ===== VITALS =====
  {
    loincNum: '8867-4',
    component: 'Heart rate',
    property: 'NRat',
    timeAspect: 'Pt',
    system: '^Patient',
    scale: 'Qn',
    class: 'VITALS',
    longCommonName: 'Heart rate',
    shortName: 'Heart rate',
    consumerName: 'Heart rate',
    status: 'ACTIVE',
    exampleUnits: '/min',
    rank: 33,
  },
  {
    loincNum: '8480-6',
    component: 'Systolic blood pressure',
    property: 'Pres',
    timeAspect: 'Pt',
    system: '^Patient',
    scale: 'Qn',
    class: 'VITALS',
    longCommonName: 'Systolic blood pressure',
    shortName: 'BP sys',
    consumerName: 'Blood pressure (systolic)',
    status: 'ACTIVE',
    exampleUnits: 'mm[Hg]',
    rank: 34,
  },
  {
    loincNum: '8462-4',
    component: 'Diastolic blood pressure',
    property: 'Pres',
    timeAspect: 'Pt',
    system: '^Patient',
    scale: 'Qn',
    class: 'VITALS',
    longCommonName: 'Diastolic blood pressure',
    shortName: 'BP dias',
    consumerName: 'Blood pressure (diastolic)',
    status: 'ACTIVE',
    exampleUnits: 'mm[Hg]',
    rank: 35,
  },
  {
    loincNum: '8310-5',
    component: 'Body temperature',
    property: 'Temp',
    timeAspect: 'Pt',
    system: '^Patient',
    scale: 'Qn',
    class: 'VITALS',
    longCommonName: 'Body temperature',
    shortName: 'Temp',
    consumerName: 'Temperature',
    status: 'ACTIVE',
    exampleUnits: 'Cel',
    rank: 36,
  },
  {
    loincNum: '9279-1',
    component: 'Respiratory rate',
    property: 'NRat',
    timeAspect: 'Pt',
    system: '^Patient',
    scale: 'Qn',
    class: 'VITALS',
    longCommonName: 'Respiratory rate',
    shortName: 'Resp rate',
    consumerName: 'Respiratory rate',
    status: 'ACTIVE',
    exampleUnits: '/min',
    rank: 37,
  },
  {
    loincNum: '59408-5',
    component: 'Oxygen saturation in Arterial blood by Pulse oximetry',
    property: 'NFr',
    timeAspect: 'Pt',
    system: 'BldA',
    scale: 'Qn',
    class: 'VITALS',
    longCommonName: 'Oxygen saturation in Arterial blood by Pulse oximetry',
    shortName: 'SaO2 % BldA PulseOx',
    consumerName: 'Oxygen saturation (SpO2)',
    status: 'ACTIVE',
    exampleUnits: '%',
    rank: 38,
  },
  {
    loincNum: '29463-7',
    component: 'Body weight',
    property: 'Mass',
    timeAspect: 'Pt',
    system: '^Patient',
    scale: 'Qn',
    class: 'VITALS',
    longCommonName: 'Body weight',
    shortName: 'Weight',
    consumerName: 'Weight',
    status: 'ACTIVE',
    exampleUnits: 'kg',
    rank: 39,
  },
  {
    loincNum: '8302-2',
    component: 'Body height',
    property: 'Len',
    timeAspect: 'Pt',
    system: '^Patient',
    scale: 'Qn',
    class: 'VITALS',
    longCommonName: 'Body height',
    shortName: 'Height',
    consumerName: 'Height',
    status: 'ACTIVE',
    exampleUnits: 'cm',
    rank: 40,
  },
  {
    loincNum: '39156-5',
    component: 'Body mass index',
    property: 'Ratio',
    timeAspect: 'Pt',
    system: '^Patient',
    scale: 'Qn',
    class: 'VITALS',
    longCommonName: 'Body mass index (BMI) [Ratio]',
    shortName: 'BMI',
    consumerName: 'BMI',
    status: 'ACTIVE',
    exampleUnits: 'kg/m2',
    rank: 41,
  },
];

// =============================================================================
// LOCAL PANELS
// =============================================================================

const LOCAL_PANELS: Record<string, LoincPanel> = {
  '24320-4': {
    loincNum: '24320-4',
    longCommonName: 'Basic Metabolic Panel',
    shortName: 'BMP',
    panelType: 'ORDER',
    members: [
      { parentLoincNum: '24320-4', loincNum: '2345-7', longCommonName: 'Glucose', required: true, displayOrder: 1 },
      { parentLoincNum: '24320-4', loincNum: '3094-0', longCommonName: 'BUN', required: true, displayOrder: 2 },
      { parentLoincNum: '24320-4', loincNum: '2160-0', longCommonName: 'Creatinine', required: true, displayOrder: 3 },
      { parentLoincNum: '24320-4', loincNum: '2951-2', longCommonName: 'Sodium', required: true, displayOrder: 4 },
      { parentLoincNum: '24320-4', loincNum: '2823-3', longCommonName: 'Potassium', required: true, displayOrder: 5 },
      { parentLoincNum: '24320-4', loincNum: '2075-0', longCommonName: 'Chloride', required: true, displayOrder: 6 },
      { parentLoincNum: '24320-4', loincNum: '2028-9', longCommonName: 'CO2', required: true, displayOrder: 7 },
      { parentLoincNum: '24320-4', loincNum: '17861-6', longCommonName: 'Calcium', required: true, displayOrder: 8 },
    ],
  },
  '24331-1': {
    loincNum: '24331-1',
    longCommonName: 'Lipid Panel',
    shortName: 'Lipid Panel',
    panelType: 'ORDER',
    members: [
      { parentLoincNum: '24331-1', loincNum: '2093-3', longCommonName: 'Cholesterol Total', required: true, displayOrder: 1 },
      { parentLoincNum: '24331-1', loincNum: '2571-8', longCommonName: 'Triglycerides', required: true, displayOrder: 2 },
      { parentLoincNum: '24331-1', loincNum: '2085-9', longCommonName: 'HDL Cholesterol', required: true, displayOrder: 3 },
      { parentLoincNum: '24331-1', loincNum: '13457-7', longCommonName: 'LDL Cholesterol (calculated)', required: true, displayOrder: 4 },
    ],
  },
  '57021-8': {
    loincNum: '57021-8',
    longCommonName: 'CBC W Auto Differential panel - Blood',
    shortName: 'CBC w/ Diff',
    panelType: 'ORDER',
    members: [
      { parentLoincNum: '57021-8', loincNum: '6690-2', longCommonName: 'WBC', required: true, displayOrder: 1 },
      { parentLoincNum: '57021-8', loincNum: '789-8', longCommonName: 'RBC', required: true, displayOrder: 2 },
      { parentLoincNum: '57021-8', loincNum: '718-7', longCommonName: 'Hemoglobin', required: true, displayOrder: 3 },
      { parentLoincNum: '57021-8', loincNum: '4544-3', longCommonName: 'Hematocrit', required: true, displayOrder: 4 },
      { parentLoincNum: '57021-8', loincNum: '787-2', longCommonName: 'MCV', required: true, displayOrder: 5 },
      { parentLoincNum: '57021-8', loincNum: '785-6', longCommonName: 'MCH', required: true, displayOrder: 6 },
      { parentLoincNum: '57021-8', loincNum: '786-4', longCommonName: 'MCHC', required: true, displayOrder: 7 },
      { parentLoincNum: '57021-8', loincNum: '788-0', longCommonName: 'RDW', required: true, displayOrder: 8 },
      { parentLoincNum: '57021-8', loincNum: '777-3', longCommonName: 'Platelets', required: true, displayOrder: 9 },
      { parentLoincNum: '57021-8', loincNum: '770-8', longCommonName: 'Neutrophils %', required: true, displayOrder: 10 },
      { parentLoincNum: '57021-8', loincNum: '736-9', longCommonName: 'Lymphocytes %', required: true, displayOrder: 11 },
      { parentLoincNum: '57021-8', loincNum: '5905-5', longCommonName: 'Monocytes %', required: true, displayOrder: 12 },
      { parentLoincNum: '57021-8', loincNum: '713-8', longCommonName: 'Eosinophils %', required: true, displayOrder: 13 },
      { parentLoincNum: '57021-8', loincNum: '706-2', longCommonName: 'Basophils %', required: true, displayOrder: 14 },
    ],
  },
};

// =============================================================================
// SINGLETON INSTANCE
// =============================================================================

let browserInstance: LoincBrowser | null = null;

/**
 * Get the default LOINC browser instance
 */
export function getLoincBrowser(): LoincBrowser {
  if (!browserInstance) {
    browserInstance = new LoincBrowser();
  }
  return browserInstance;
}

/**
 * Create a new LOINC browser with custom config
 */
export function createLoincBrowser(config?: Partial<LoincConfig>): LoincBrowser {
  return new LoincBrowser(config);
}

export default LoincBrowser;
