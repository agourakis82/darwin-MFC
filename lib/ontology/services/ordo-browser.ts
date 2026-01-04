/**
 * DARWIN-MFC ORDO BROWSER SERVICE
 * ================================
 *
 * Service for searching and retrieving ORDO (Orphanet Rare Disease Ontology) concepts.
 * Uses the EBI OLS4 API and local data for common diseases.
 */

import type {
  OrdoConcept,
  OrdoConceptMini,
  OrdoSearchParams,
  OrdoSearchResult,
  OrdoSearchResponse,
  OrdoStatus,
  OrdoDiseaseType,
  OrdoGeneAssociation,
  OrdoCrossReference,
} from '../types/ordo';

// =============================================================================
// CONFIGURATION
// =============================================================================

const OLS4_API_BASE = 'https://www.ebi.ac.uk/ols4/api';
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

/**
 * ORDO API configuration
 */
interface OrdoConfig {
  apiBase: string;
  cacheEnabled: boolean;
  cacheTTL: number;
}

const defaultConfig: OrdoConfig = {
  apiBase: OLS4_API_BASE,
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
// ORDO BROWSER CLASS
// =============================================================================

export class OrdoBrowser {
  private config: OrdoConfig;

  constructor(config: Partial<OrdoConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * Search ORDO concepts
   */
  async search(params: OrdoSearchParams): Promise<OrdoSearchResponse> {
    const startTime = Date.now();

    // Build cache key
    const cacheKey = `search:${JSON.stringify(params)}`;

    // Check cache
    if (this.config.cacheEnabled) {
      const cached = getCached<OrdoSearchResponse>(cacheKey, this.config.cacheTTL);
      if (cached) return cached;
    }

    // First, search local data for common diseases
    const localResults = this.searchLocalConcepts(params);

    // If we have enough local results or query is for a specific code, return local
    if (localResults.length >= (params.limit || 20) || this.isSpecificCodeQuery(params.query)) {
      const response: OrdoSearchResponse = {
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

    // Try OLS4 API for broader searches
    try {
      const apiResults = await this.searchOlsApi(params);

      // Merge with local results, deduplicate
      const mergedResults = this.mergeResults(localResults, apiResults);

      const response: OrdoSearchResponse = {
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
      const response: OrdoSearchResponse = {
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
   * Get ORDO concept by ORPHAcode
   */
  async getConcept(orphaCode: string): Promise<OrdoConcept | null> {
    // Normalize code
    const normalizedCode = orphaCode.replace(/^(ORPHA:|Orphanet_|ORDO:)/i, '');
    const cacheKey = `concept:${normalizedCode}`;

    if (this.config.cacheEnabled) {
      const cached = getCached<OrdoConcept>(cacheKey, this.config.cacheTTL);
      if (cached) return cached;
    }

    // Check local data first
    const localConcept = this.getLocalConcept(normalizedCode);
    if (localConcept) {
      if (this.config.cacheEnabled) {
        setCache(cacheKey, localConcept, this.config.cacheTTL);
      }
      return localConcept;
    }

    // Try OLS4 API
    try {
      const concept = await this.fetchConceptFromApi(normalizedCode);
      if (concept && this.config.cacheEnabled) {
        setCache(cacheKey, concept, this.config.cacheTTL);
      }
      return concept;
    } catch {
      return null;
    }
  }

  /**
   * Get child concepts
   */
  async getChildren(orphaCode: string): Promise<OrdoConceptMini[]> {
    const normalizedCode = orphaCode.replace(/^(ORPHA:|Orphanet_|ORDO:)/i, '');
    const cacheKey = `children:${normalizedCode}`;

    if (this.config.cacheEnabled) {
      const cached = getCached<OrdoConceptMini[]>(cacheKey, this.config.cacheTTL);
      if (cached) return cached;
    }

    try {
      const url = `${this.config.apiBase}/ontologies/ordo/terms/http%3A%2F%2Fwww.orpha.net%2FORDO%2FOrphanet_${normalizedCode}/children`;
      const response = await fetch(url);

      if (!response.ok) return [];

      const data = await response.json();
      const children = this.parseOlsTerms(data);

      if (this.config.cacheEnabled) {
        setCache(cacheKey, children, this.config.cacheTTL);
      }

      return children;
    } catch {
      return [];
    }
  }

  /**
   * Get parent concepts
   */
  async getParents(orphaCode: string): Promise<OrdoConceptMini[]> {
    const normalizedCode = orphaCode.replace(/^(ORPHA:|Orphanet_|ORDO:)/i, '');
    const cacheKey = `parents:${normalizedCode}`;

    if (this.config.cacheEnabled) {
      const cached = getCached<OrdoConceptMini[]>(cacheKey, this.config.cacheTTL);
      if (cached) return cached;
    }

    try {
      const url = `${this.config.apiBase}/ontologies/ordo/terms/http%3A%2F%2Fwww.orpha.net%2FORDO%2FOrphanet_${normalizedCode}/parents`;
      const response = await fetch(url);

      if (!response.ok) return [];

      const data = await response.json();
      const parents = this.parseOlsTerms(data);

      if (this.config.cacheEnabled) {
        setCache(cacheKey, parents, this.config.cacheTTL);
      }

      return parents;
    } catch {
      return [];
    }
  }

  /**
   * Validate ORPHAcode
   */
  async validateCode(orphaCode: string): Promise<boolean> {
    const concept = await this.getConcept(orphaCode);
    return concept !== null && concept.status === 'active';
  }

  // ===========================================================================
  // PRIVATE METHODS
  // ===========================================================================

  private isSpecificCodeQuery(query: string): boolean {
    // Check if query looks like an ORPHAcode
    return /^(ORPHA:?|Orphanet_|ORDO:?)?\d{1,6}$/i.test(query.trim());
  }

  private searchLocalConcepts(params: OrdoSearchParams): OrdoSearchResult[] {
    const query = params.query.toLowerCase().trim();
    const results: OrdoSearchResult[] = [];

    for (const concept of LOCAL_ORDO_CONCEPTS) {
      // Filter by status
      if (!params.includeObsolete && concept.status === 'obsolete') {
        continue;
      }

      // Filter by disease type
      if (params.diseaseType) {
        const types = Array.isArray(params.diseaseType) ? params.diseaseType : [params.diseaseType];
        if (concept.diseaseType && !types.includes(concept.diseaseType as OrdoDiseaseType)) {
          continue;
        }
      }

      // Calculate match score
      let score = 0;
      let matchedOn: 'label' | 'code' | 'synonym' | 'definition' = 'label';

      // Code match (highest priority)
      if (concept.orphaCode === query || concept.orphaCode.startsWith(query)) {
        score = 100;
        matchedOn = 'code';
      }
      // Exact label match
      else if (concept.label.toLowerCase() === query) {
        score = 95;
        matchedOn = 'label';
      }
      // Label contains query
      else if (concept.label.toLowerCase().includes(query)) {
        score = 80;
        matchedOn = 'label';
      }
      // Synonym match
      else if (concept.synonyms?.some(s => s.toLowerCase().includes(query))) {
        score = 70;
        matchedOn = 'synonym';
      }
      // Definition match
      else if (concept.definition?.toLowerCase().includes(query)) {
        score = 50;
        matchedOn = 'definition';
      }
      // No match
      else {
        continue;
      }

      results.push({
        concept: {
          orphaCode: concept.orphaCode,
          label: concept.label,
          definition: concept.definition,
          diseaseType: concept.diseaseType,
          status: concept.status,
          synonymCount: concept.synonyms?.length || 0,
        },
        score,
        matchedOn,
      });
    }

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    return results;
  }

  private getLocalConcept(orphaCode: string): OrdoConcept | null {
    return LOCAL_ORDO_CONCEPTS.find(c => c.orphaCode === orphaCode) || null;
  }

  private async searchOlsApi(params: OrdoSearchParams): Promise<OrdoSearchResult[]> {
    const url = new URL(`${this.config.apiBase}/search`);
    url.searchParams.set('q', params.query);
    url.searchParams.set('ontology', 'ordo');
    url.searchParams.set('rows', String(params.limit || 25));
    url.searchParams.set('start', String(params.offset || 0));

    if (!params.includeObsolete) {
      url.searchParams.set('obsoletes', 'false');
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`OLS API error: ${response.status}`);
    }

    const data = await response.json();
    return this.parseOlsSearchResults(data);
  }

  private async fetchConceptFromApi(orphaCode: string): Promise<OrdoConcept | null> {
    const iri = encodeURIComponent(`http://www.orpha.net/ORDO/Orphanet_${orphaCode}`);
    const url = `${this.config.apiBase}/ontologies/ordo/terms/${iri}`;

    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return this.parseOlsConcept(data);
  }

  private parseOlsSearchResults(data: Record<string, unknown>): OrdoSearchResult[] {
    const results: OrdoSearchResult[] = [];

    const response = data.response as { docs?: Array<Record<string, unknown>> } | undefined;
    if (!response?.docs) return results;

    for (const doc of response.docs) {
      const iri = doc.iri as string;
      const label = doc.label as string;
      const description = doc.description as string[] | undefined;
      const isObsolete = doc.is_obsolete as boolean;

      // Extract ORPHAcode from IRI
      const codeMatch = iri?.match(/Orphanet_(\d+)/);
      if (!codeMatch) continue;

      results.push({
        concept: {
          orphaCode: codeMatch[1],
          label: label || 'Unknown',
          definition: description?.[0],
          status: isObsolete ? 'obsolete' : 'active',
        },
        score: 80,
        matchedOn: 'label',
      });
    }

    return results;
  }

  private parseOlsConcept(data: Record<string, unknown>): OrdoConcept | null {
    const iri = data.iri as string;
    const label = data.label as string;
    const description = data.description as string[] | undefined;
    const synonyms = data.synonyms as string[] | undefined;
    const isObsolete = data.is_obsolete as boolean;

    // Extract ORPHAcode from IRI
    const codeMatch = iri?.match(/Orphanet_(\d+)/);
    if (!codeMatch) return null;

    return {
      orphaCode: codeMatch[1],
      iri: iri,
      label: label || 'Unknown',
      definition: description?.[0],
      synonyms: synonyms,
      status: isObsolete ? 'obsolete' : 'active',
    };
  }

  private parseOlsTerms(data: Record<string, unknown>): OrdoConceptMini[] {
    const results: OrdoConceptMini[] = [];

    const embedded = data._embedded as { terms?: Array<Record<string, unknown>> } | undefined;
    if (!embedded?.terms) return results;

    for (const term of embedded.terms) {
      const iri = term.iri as string;
      const label = term.label as string;
      const description = term.description as string[] | undefined;
      const isObsolete = term.is_obsolete as boolean;

      const codeMatch = iri?.match(/Orphanet_(\d+)/);
      if (!codeMatch) continue;

      results.push({
        orphaCode: codeMatch[1],
        label: label || 'Unknown',
        definition: description?.[0],
        status: isObsolete ? 'obsolete' : 'active',
      });
    }

    return results;
  }

  private mergeResults(
    local: OrdoSearchResult[],
    api: OrdoSearchResult[]
  ): OrdoSearchResult[] {
    const seen = new Set(local.map(r => r.concept.orphaCode));
    const merged = [...local];

    for (const result of api) {
      if (!seen.has(result.concept.orphaCode)) {
        merged.push(result);
        seen.add(result.concept.orphaCode);
      }
    }

    return merged.sort((a, b) => b.score - a.score);
  }
}

// =============================================================================
// LOCAL ORDO DATA (Common Rare Diseases)
// =============================================================================

const LOCAL_ORDO_CONCEPTS: OrdoConcept[] = [
  // ===== METABOLIC DISEASES =====
  {
    orphaCode: '716',
    iri: 'http://www.orpha.net/ORDO/Orphanet_716',
    label: 'Phenylketonuria',
    definition: 'A rare inborn error of amino acid metabolism characterized by elevated blood phenylalanine levels due to deficient phenylalanine hydroxylase enzyme activity.',
    synonyms: ['PKU', 'Phenylalanine hydroxylase deficiency'],
    diseaseType: 'Disease',
    status: 'active',
    inheritance: ['Autosomal recessive'],
    ageOfOnset: ['Neonatal'],
    prevalence: { prevalenceClass: '1-5/10000' },
    icd10Codes: ['E70.0'],
    genes: [
      {
        geneSymbol: 'PAH',
        geneName: 'Phenylalanine hydroxylase',
        hgncId: 'HGNC:8582',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },
  {
    orphaCode: '586',
    iri: 'http://www.orpha.net/ORDO/Orphanet_586',
    label: 'Cystic fibrosis',
    definition: 'A life-threatening genetic disorder affecting multiple organ systems, primarily the lungs and digestive system, caused by mutations in the CFTR gene.',
    synonyms: ['CF', 'Mucoviscidosis'],
    diseaseType: 'Disease',
    status: 'active',
    inheritance: ['Autosomal recessive'],
    ageOfOnset: ['Neonatal', 'Infancy'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['E84'],
    genes: [
      {
        geneSymbol: 'CFTR',
        geneName: 'CF transmembrane conductance regulator',
        hgncId: 'HGNC:1884',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },
  {
    orphaCode: '355',
    iri: 'http://www.orpha.net/ORDO/Orphanet_355',
    label: 'Gaucher disease',
    definition: 'A lysosomal storage disorder caused by deficiency of glucocerebrosidase, leading to accumulation of glucocerebroside in macrophages.',
    synonyms: ['Gaucher syndrome', 'Glucosylceramidase deficiency'],
    diseaseType: 'Disease',
    status: 'active',
    inheritance: ['Autosomal recessive'],
    ageOfOnset: ['All ages'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['E75.2'],
    genes: [
      {
        geneSymbol: 'GBA',
        geneName: 'Glucosylceramidase beta',
        hgncId: 'HGNC:4177',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },
  {
    orphaCode: '324',
    iri: 'http://www.orpha.net/ORDO/Orphanet_324',
    label: 'Fabry disease',
    definition: 'An X-linked lysosomal storage disorder caused by deficiency of alpha-galactosidase A, leading to progressive accumulation of globotriaosylceramide.',
    synonyms: ['Anderson-Fabry disease', 'Alpha-galactosidase A deficiency'],
    diseaseType: 'Disease',
    status: 'active',
    inheritance: ['X-linked recessive'],
    ageOfOnset: ['Childhood', 'Adolescent'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['E75.2'],
    genes: [
      {
        geneSymbol: 'GLA',
        geneName: 'Galactosidase alpha',
        hgncId: 'HGNC:4296',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },
  {
    orphaCode: '365',
    iri: 'http://www.orpha.net/ORDO/Orphanet_365',
    label: 'Pompe disease',
    definition: 'A glycogen storage disease caused by deficiency of acid alpha-glucosidase, leading to accumulation of glycogen in lysosomes, primarily affecting muscle tissue.',
    synonyms: ['Glycogen storage disease type II', 'Acid maltase deficiency', 'GAA deficiency'],
    diseaseType: 'Disease',
    status: 'active',
    inheritance: ['Autosomal recessive'],
    ageOfOnset: ['All ages'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['E74.0'],
    genes: [
      {
        geneSymbol: 'GAA',
        geneName: 'Glucosidase alpha, acid',
        hgncId: 'HGNC:4065',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },

  // ===== NEUROMUSCULAR DISEASES =====
  {
    orphaCode: '98896',
    iri: 'http://www.orpha.net/ORDO/Orphanet_98896',
    label: 'Duchenne muscular dystrophy',
    definition: 'A severe, progressive muscle-wasting disease caused by mutations in the DMD gene, affecting primarily males.',
    synonyms: ['DMD', 'Duchenne muscular dystrophy'],
    diseaseType: 'Disease',
    status: 'active',
    inheritance: ['X-linked recessive'],
    ageOfOnset: ['Childhood'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['G71.0'],
    genes: [
      {
        geneSymbol: 'DMD',
        geneName: 'Dystrophin',
        hgncId: 'HGNC:2928',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },
  {
    orphaCode: '70',
    iri: 'http://www.orpha.net/ORDO/Orphanet_70',
    label: 'Spinal muscular atrophy',
    definition: 'A group of inherited neuromuscular disorders characterized by degeneration of motor neurons in the spinal cord, leading to progressive muscle weakness and atrophy.',
    synonyms: ['SMA', 'Proximal spinal muscular atrophy'],
    diseaseType: 'Group of disorders',
    status: 'active',
    inheritance: ['Autosomal recessive'],
    ageOfOnset: ['All ages'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['G12.0', 'G12.1'],
    genes: [
      {
        geneSymbol: 'SMN1',
        geneName: 'Survival of motor neuron 1',
        hgncId: 'HGNC:11117',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },
  {
    orphaCode: '803',
    iri: 'http://www.orpha.net/ORDO/Orphanet_803',
    label: 'Amyotrophic lateral sclerosis',
    definition: 'A progressive neurodegenerative disease affecting motor neurons, leading to muscle weakness, atrophy, and eventually respiratory failure.',
    synonyms: ['ALS', 'Lou Gehrig disease', 'Motor neuron disease'],
    diseaseType: 'Disease',
    status: 'active',
    inheritance: ['Autosomal dominant', 'Autosomal recessive', 'Multigenic/multifactorial'],
    ageOfOnset: ['Adult'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['G12.2'],
    genes: [
      {
        geneSymbol: 'SOD1',
        geneName: 'Superoxide dismutase 1',
        hgncId: 'HGNC:11179',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
      {
        geneSymbol: 'C9orf72',
        geneName: 'C9orf72-SMCR8 complex subunit',
        hgncId: 'HGNC:28337',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },
  {
    orphaCode: '399',
    iri: 'http://www.orpha.net/ORDO/Orphanet_399',
    label: 'Huntington disease',
    definition: 'A progressive neurodegenerative disorder characterized by chorea, psychiatric symptoms, and cognitive decline, caused by CAG repeat expansion in the HTT gene.',
    synonyms: ['Huntington chorea', 'HD'],
    diseaseType: 'Disease',
    status: 'active',
    inheritance: ['Autosomal dominant'],
    ageOfOnset: ['Adult'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['G10'],
    genes: [
      {
        geneSymbol: 'HTT',
        geneName: 'Huntingtin',
        hgncId: 'HGNC:4851',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },

  // ===== HEMATOLOGICAL DISEASES =====
  {
    orphaCode: '232',
    iri: 'http://www.orpha.net/ORDO/Orphanet_232',
    label: 'Sickle cell disease',
    definition: 'A group of inherited blood disorders characterized by abnormal hemoglobin causing red blood cells to become rigid and sickle-shaped.',
    synonyms: ['Sickle cell anemia', 'Drepanocytosis', 'HbS disease'],
    diseaseType: 'Group of disorders',
    status: 'active',
    inheritance: ['Autosomal recessive'],
    ageOfOnset: ['Infancy'],
    prevalence: { prevalenceClass: '1-5/10000' },
    icd10Codes: ['D57'],
    genes: [
      {
        geneSymbol: 'HBB',
        geneName: 'Hemoglobin subunit beta',
        hgncId: 'HGNC:4827',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },
  {
    orphaCode: '169',
    iri: 'http://www.orpha.net/ORDO/Orphanet_169',
    label: 'Hemophilia A',
    definition: 'An X-linked bleeding disorder caused by deficiency of coagulation factor VIII.',
    synonyms: ['Factor VIII deficiency', 'Classic hemophilia'],
    diseaseType: 'Disease',
    status: 'active',
    inheritance: ['X-linked recessive'],
    ageOfOnset: ['Neonatal', 'Infancy'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['D66'],
    genes: [
      {
        geneSymbol: 'F8',
        geneName: 'Coagulation factor VIII',
        hgncId: 'HGNC:3546',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },
  {
    orphaCode: '98878',
    iri: 'http://www.orpha.net/ORDO/Orphanet_98878',
    label: 'Hemophilia B',
    definition: 'An X-linked bleeding disorder caused by deficiency of coagulation factor IX.',
    synonyms: ['Factor IX deficiency', 'Christmas disease'],
    diseaseType: 'Disease',
    status: 'active',
    inheritance: ['X-linked recessive'],
    ageOfOnset: ['Neonatal', 'Infancy'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['D67'],
    genes: [
      {
        geneSymbol: 'F9',
        geneName: 'Coagulation factor IX',
        hgncId: 'HGNC:3551',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },
  {
    orphaCode: '848',
    iri: 'http://www.orpha.net/ORDO/Orphanet_848',
    label: 'Beta-thalassemia major',
    definition: 'A severe form of beta-thalassemia characterized by severely reduced or absent beta-globin chain synthesis, requiring regular blood transfusions.',
    synonyms: ['Thalassemia major', 'Cooley anemia', 'Mediterranean anemia'],
    diseaseType: 'Clinical subtype',
    status: 'active',
    inheritance: ['Autosomal recessive'],
    ageOfOnset: ['Infancy'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['D56.1'],
    genes: [
      {
        geneSymbol: 'HBB',
        geneName: 'Hemoglobin subunit beta',
        hgncId: 'HGNC:4827',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },

  // ===== CONNECTIVE TISSUE DISORDERS =====
  {
    orphaCode: '558',
    iri: 'http://www.orpha.net/ORDO/Orphanet_558',
    label: 'Marfan syndrome',
    definition: 'A hereditary connective tissue disorder affecting the skeletal, cardiovascular, and ocular systems, caused by mutations in the FBN1 gene.',
    synonyms: ['MFS'],
    diseaseType: 'Disease',
    status: 'active',
    inheritance: ['Autosomal dominant'],
    ageOfOnset: ['All ages'],
    prevalence: { prevalenceClass: '1-5/10000' },
    icd10Codes: ['Q87.4'],
    genes: [
      {
        geneSymbol: 'FBN1',
        geneName: 'Fibrillin 1',
        hgncId: 'HGNC:3603',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },
  {
    orphaCode: '98249',
    iri: 'http://www.orpha.net/ORDO/Orphanet_98249',
    label: 'Ehlers-Danlos syndrome',
    definition: 'A group of inherited connective tissue disorders characterized by joint hypermobility, skin hyperextensibility, and tissue fragility.',
    synonyms: ['EDS'],
    diseaseType: 'Group of disorders',
    status: 'active',
    inheritance: ['Autosomal dominant', 'Autosomal recessive'],
    ageOfOnset: ['All ages'],
    prevalence: { prevalenceClass: '1-5/10000' },
    icd10Codes: ['Q79.6'],
  },
  {
    orphaCode: '666',
    iri: 'http://www.orpha.net/ORDO/Orphanet_666',
    label: 'Osteogenesis imperfecta',
    definition: 'A group of genetic disorders characterized by bones that break easily, often with minimal or no apparent cause.',
    synonyms: ['OI', 'Brittle bone disease'],
    diseaseType: 'Group of disorders',
    status: 'active',
    inheritance: ['Autosomal dominant', 'Autosomal recessive'],
    ageOfOnset: ['All ages'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['Q78.0'],
    genes: [
      {
        geneSymbol: 'COL1A1',
        geneName: 'Collagen type I alpha 1 chain',
        hgncId: 'HGNC:2197',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
      {
        geneSymbol: 'COL1A2',
        geneName: 'Collagen type I alpha 2 chain',
        hgncId: 'HGNC:2198',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },

  // ===== NEURODEVELOPMENTAL SYNDROMES =====
  {
    orphaCode: '739',
    iri: 'http://www.orpha.net/ORDO/Orphanet_739',
    label: 'Prader-Willi syndrome',
    definition: 'A complex genetic disorder characterized by hypotonia in infancy, hyperphagia leading to obesity, developmental delay, and behavioral problems.',
    synonyms: ['PWS'],
    diseaseType: 'Malformation syndrome',
    status: 'active',
    inheritance: ['Not applicable'],
    ageOfOnset: ['Neonatal'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['Q87.1'],
  },
  {
    orphaCode: '72',
    iri: 'http://www.orpha.net/ORDO/Orphanet_72',
    label: 'Angelman syndrome',
    definition: 'A neurodevelopmental disorder characterized by severe intellectual disability, absent speech, ataxia, seizures, and a happy demeanor.',
    synonyms: ['AS', 'Happy puppet syndrome'],
    diseaseType: 'Malformation syndrome',
    status: 'active',
    inheritance: ['Not applicable'],
    ageOfOnset: ['Infancy'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['Q93.5'],
    genes: [
      {
        geneSymbol: 'UBE3A',
        geneName: 'Ubiquitin protein ligase E3A',
        hgncId: 'HGNC:12496',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },
  {
    orphaCode: '904',
    iri: 'http://www.orpha.net/ORDO/Orphanet_904',
    label: 'Williams syndrome',
    definition: 'A multisystem developmental disorder characterized by distinctive facial features, cardiovascular abnormalities, intellectual disability, and unique personality traits.',
    synonyms: ['Williams-Beuren syndrome', 'WBS'],
    diseaseType: 'Malformation syndrome',
    status: 'active',
    inheritance: ['Autosomal dominant'],
    ageOfOnset: ['Antenatal', 'Neonatal'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['Q93.8'],
  },
  {
    orphaCode: '778',
    iri: 'http://www.orpha.net/ORDO/Orphanet_778',
    label: 'Rett syndrome',
    definition: 'A progressive neurodevelopmental disorder affecting primarily females, characterized by normal early development followed by regression with loss of purposeful hand skills and spoken language.',
    synonyms: ['RTT'],
    diseaseType: 'Disease',
    status: 'active',
    inheritance: ['X-linked dominant'],
    ageOfOnset: ['Infancy', 'Childhood'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['F84.2'],
    genes: [
      {
        geneSymbol: 'MECP2',
        geneName: 'Methyl-CpG binding protein 2',
        hgncId: 'HGNC:6990',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },
  {
    orphaCode: '908',
    iri: 'http://www.orpha.net/ORDO/Orphanet_908',
    label: 'Fragile X syndrome',
    definition: 'The most common inherited cause of intellectual disability, caused by CGG repeat expansion in the FMR1 gene.',
    synonyms: ['FXS', 'Martin-Bell syndrome', 'FRAXA syndrome'],
    diseaseType: 'Disease',
    status: 'active',
    inheritance: ['X-linked dominant'],
    ageOfOnset: ['Infancy', 'Childhood'],
    prevalence: { prevalenceClass: '1-5/10000' },
    icd10Codes: ['Q99.2'],
    genes: [
      {
        geneSymbol: 'FMR1',
        geneName: 'Fragile X messenger ribonucleoprotein 1',
        hgncId: 'HGNC:3775',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },

  // ===== IMMUNOLOGICAL DISEASES =====
  {
    orphaCode: '183660',
    iri: 'http://www.orpha.net/ORDO/Orphanet_183660',
    label: 'Severe combined immunodeficiency',
    definition: 'A group of rare primary immunodeficiencies characterized by severely impaired T-cell development and function.',
    synonyms: ['SCID', 'Bubble boy disease'],
    diseaseType: 'Group of disorders',
    status: 'active',
    inheritance: ['Autosomal recessive', 'X-linked recessive'],
    ageOfOnset: ['Neonatal', 'Infancy'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['D81.0', 'D81.1', 'D81.2'],
  },
  {
    orphaCode: '379',
    iri: 'http://www.orpha.net/ORDO/Orphanet_379',
    label: 'Chronic granulomatous disease',
    definition: 'A primary immunodeficiency characterized by recurrent life-threatening bacterial and fungal infections due to defective phagocyte NADPH oxidase.',
    synonyms: ['CGD'],
    diseaseType: 'Disease',
    status: 'active',
    inheritance: ['X-linked recessive', 'Autosomal recessive'],
    ageOfOnset: ['Infancy', 'Childhood'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['D71'],
    genes: [
      {
        geneSymbol: 'CYBB',
        geneName: 'Cytochrome b-245 beta chain',
        hgncId: 'HGNC:2578',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },

  // ===== RARE DIABETES =====
  {
    orphaCode: '101952',
    iri: 'http://www.orpha.net/ORDO/Orphanet_101952',
    label: 'Rare diabetes mellitus',
    definition: 'A group of rare forms of diabetes mellitus that differ from common type 1 and type 2 diabetes in etiology, presentation, or treatment.',
    synonyms: ['Rare DM'],
    diseaseType: 'Group of disorders',
    status: 'active',
    ageOfOnset: ['All ages'],
    icd10Codes: ['E13'],
  },
  {
    orphaCode: '224',
    iri: 'http://www.orpha.net/ORDO/Orphanet_224',
    label: 'Neonatal diabetes mellitus',
    definition: 'A rare form of diabetes diagnosed within the first 6 months of life, characterized by hyperglycemia, failure to thrive, and sometimes dehydration and ketoacidosis.',
    synonyms: ['NDM', 'Diabetes mellitus of the newborn'],
    diseaseType: 'Disease',
    status: 'active',
    inheritance: ['Autosomal dominant', 'Autosomal recessive'],
    ageOfOnset: ['Neonatal'],
    prevalence: { prevalenceClass: '1-9/100000' },
    icd10Codes: ['P70.2'],
    genes: [
      {
        geneSymbol: 'KCNJ11',
        geneName: 'Potassium inwardly rectifying channel subfamily J member 11',
        hgncId: 'HGNC:6257',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
      {
        geneSymbol: 'ABCC8',
        geneName: 'ATP binding cassette subfamily C member 8',
        hgncId: 'HGNC:59',
        associationType: 'Disease-causing germline mutation(s) in',
        associationStatus: 'Assessed',
      },
    ],
  },
];

// =============================================================================
// SINGLETON INSTANCE
// =============================================================================

let browserInstance: OrdoBrowser | null = null;

/**
 * Get the default ORDO browser instance
 */
export function getOrdoBrowser(): OrdoBrowser {
  if (!browserInstance) {
    browserInstance = new OrdoBrowser();
  }
  return browserInstance;
}

/**
 * Create a new ORDO browser with custom config
 */
export function createOrdoBrowser(config?: Partial<OrdoConfig>): OrdoBrowser {
  return new OrdoBrowser(config);
}

export default OrdoBrowser;
