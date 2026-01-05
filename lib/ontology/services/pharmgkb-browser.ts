/**
 * PHARMGKB BROWSER SERVICE
 * ========================
 *
 * Service for browsing and searching PharmGKB pharmacogenomics data.
 * Includes local cache of core pharmacogenes and gene-drug pairs,
 * with optional API integration for extended searches.
 *
 * @see https://api.pharmgkb.org
 */

import type {
  Pharmacogene,
  PharmacogeneMini,
  GeneDrugPair,
  ClinicalAnnotation,
  DosingGuideline,
  PhenotypeGuidance,
  StarAllele,
  PharmgkbSearchParams,
  PharmgkbSearchResponse,
  PharmgkbSearchResult,
  DrugInteractionResult,
  MetabolizerPhenotype,
  CpicLevel,
  RecommendationStrength,
} from '../types/pharmgkb';

import {
  CORE_PHARMACOGENES,
  COMMON_GENE_DRUG_PAIRS,
} from '../types/pharmgkb';

// =============================================================================
// CONFIGURATION
// =============================================================================

export interface PharmgkbConfig {
  /** PharmGKB API base URL */
  apiUrl: string;

  /** Request timeout in ms */
  timeout: number;

  /** Enable API calls (false = local cache only) */
  enableApi: boolean;

  /** Rate limit (requests per second) */
  rateLimit: number;
}

const DEFAULT_CONFIG: PharmgkbConfig = {
  apiUrl: 'https://api.pharmgkb.org/v1',
  timeout: 10000,
  enableApi: false, // Default to local cache only
  rateLimit: 2,
};

// =============================================================================
// LOCAL DATA CACHE
// =============================================================================

/**
 * Extended pharmacogene data with full details
 */
const PHARMACOGENE_DETAILS: Record<string, Pharmacogene> = {
  'CYP2D6': {
    pharmgkbId: 'PA128',
    symbol: 'CYP2D6',
    hgncId: 'HGNC:2625',
    name: 'Cytochrome P450 Family 2 Subfamily D Member 6',
    description: 'This gene encodes a member of the cytochrome P450 superfamily of enzymes. CYP2D6 is responsible for the metabolism of many drugs including antidepressants, antipsychotics, opioids, tamoxifen, and beta-blockers. Genetic variations in CYP2D6 result in ultrarapid, normal, intermediate, or poor metabolizer phenotypes.',
    chromosome: '22q13.2',
    drugCount: 150,
    variantCount: 130,
    hasCpicGuideline: true,
    cpicLevel: 'A',
    crossReferences: [
      { source: 'HGNC', id: '2625' },
      { source: 'NCBI', id: '1565' },
      { source: 'Ensembl', id: 'ENSG00000100197' },
    ],
  },
  'CYP2C19': {
    pharmgkbId: 'PA124',
    symbol: 'CYP2C19',
    hgncId: 'HGNC:2621',
    name: 'Cytochrome P450 Family 2 Subfamily C Member 19',
    description: 'CYP2C19 encodes a cytochrome P450 enzyme involved in the metabolism of many clinically important drugs including proton pump inhibitors, clopidogrel, antidepressants (SSRIs), and antifungals. Poor metabolizers have increased risk of adverse effects with some drugs while ultrarapid metabolizers may have reduced efficacy.',
    chromosome: '10q23.33',
    drugCount: 100,
    variantCount: 35,
    hasCpicGuideline: true,
    cpicLevel: 'A',
    crossReferences: [
      { source: 'HGNC', id: '2621' },
      { source: 'NCBI', id: '1557' },
      { source: 'Ensembl', id: 'ENSG00000165841' },
    ],
  },
  'CYP2C9': {
    pharmgkbId: 'PA126',
    symbol: 'CYP2C9',
    hgncId: 'HGNC:2623',
    name: 'Cytochrome P450 Family 2 Subfamily C Member 9',
    description: 'CYP2C9 metabolizes approximately 15% of clinically used drugs, including warfarin, phenytoin, and NSAIDs. Individuals with reduced CYP2C9 activity may require lower doses of warfarin to achieve therapeutic anticoagulation and are at increased risk of bleeding complications.',
    chromosome: '10q23.33',
    drugCount: 80,
    variantCount: 60,
    hasCpicGuideline: true,
    cpicLevel: 'A',
    crossReferences: [
      { source: 'HGNC', id: '2623' },
      { source: 'NCBI', id: '1559' },
      { source: 'Ensembl', id: 'ENSG00000138109' },
    ],
  },
  'DPYD': {
    pharmgkbId: 'PA145',
    symbol: 'DPYD',
    hgncId: 'HGNC:3012',
    name: 'Dihydropyrimidine Dehydrogenase',
    description: 'DPYD encodes the rate-limiting enzyme in pyrimidine catabolism. It is critical for the metabolism of fluoropyrimidine drugs (5-fluorouracil, capecitabine). Patients with DPYD deficiency are at high risk of severe, potentially fatal toxicity from standard doses of fluoropyrimidines.',
    chromosome: '1p21.3',
    drugCount: 5,
    variantCount: 200,
    hasCpicGuideline: true,
    cpicLevel: 'A',
    crossReferences: [
      { source: 'HGNC', id: '3012' },
      { source: 'NCBI', id: '1806' },
      { source: 'Ensembl', id: 'ENSG00000188641' },
    ],
  },
  'TPMT': {
    pharmgkbId: 'PA356',
    symbol: 'TPMT',
    hgncId: 'HGNC:12014',
    name: 'Thiopurine S-Methyltransferase',
    description: 'TPMT catalyzes the S-methylation of thiopurine drugs (azathioprine, mercaptopurine, thioguanine). Individuals with low TPMT activity are at high risk of severe myelosuppression from standard doses. Dose reduction or alternative therapy is recommended for intermediate and poor metabolizers.',
    chromosome: '6p22.3',
    drugCount: 4,
    variantCount: 40,
    hasCpicGuideline: true,
    cpicLevel: 'A',
    crossReferences: [
      { source: 'HGNC', id: '12014' },
      { source: 'NCBI', id: '7172' },
      { source: 'Ensembl', id: 'ENSG00000137364' },
    ],
  },
  'SLCO1B1': {
    pharmgkbId: 'PA166153895',
    symbol: 'SLCO1B1',
    hgncId: 'HGNC:10959',
    name: 'Solute Carrier Organic Anion Transporter Family Member 1B1',
    description: 'SLCO1B1 encodes a hepatic uptake transporter important for statin disposition. The c.521T>C variant (rs4149056) is associated with increased risk of simvastatin-induced myopathy. Patients with this variant may benefit from lower simvastatin doses or alternative statins.',
    chromosome: '12p12.2',
    drugCount: 25,
    variantCount: 20,
    hasCpicGuideline: true,
    cpicLevel: 'A',
    crossReferences: [
      { source: 'HGNC', id: '10959' },
      { source: 'NCBI', id: '10599' },
      { source: 'Ensembl', id: 'ENSG00000134538' },
    ],
  },
  'VKORC1': {
    pharmgkbId: 'PA37182',
    symbol: 'VKORC1',
    hgncId: 'HGNC:23663',
    name: 'Vitamin K Epoxide Reductase Complex Subunit 1',
    description: 'VKORC1 is the target of warfarin. Genetic variants affect warfarin sensitivity, with some individuals requiring substantially lower or higher doses. VKORC1 genotyping, combined with CYP2C9, can help predict optimal warfarin dosing.',
    chromosome: '16p11.2',
    drugCount: 3,
    variantCount: 15,
    hasCpicGuideline: true,
    cpicLevel: 'A',
    crossReferences: [
      { source: 'HGNC', id: '23663' },
      { source: 'NCBI', id: '79001' },
      { source: 'Ensembl', id: 'ENSG00000167397' },
    ],
  },
  'UGT1A1': {
    pharmgkbId: 'PA420',
    symbol: 'UGT1A1',
    hgncId: 'HGNC:12530',
    name: 'UDP Glucuronosyltransferase Family 1 Member A1',
    description: 'UGT1A1 is responsible for bilirubin glucuronidation and metabolism of several drugs including irinotecan and atazanavir. The UGT1A1*28 allele is associated with Gilbert syndrome and increased toxicity from irinotecan.',
    chromosome: '2q37.1',
    drugCount: 15,
    variantCount: 25,
    hasCpicGuideline: true,
    cpicLevel: 'A',
    crossReferences: [
      { source: 'HGNC', id: '12530' },
      { source: 'NCBI', id: '54658' },
      { source: 'Ensembl', id: 'ENSG00000241635' },
    ],
  },
  'HLA-B': {
    pharmgkbId: 'PA267',
    symbol: 'HLA-B',
    hgncId: 'HGNC:4932',
    name: 'Major Histocompatibility Complex, Class I, B',
    description: 'HLA-B alleles are associated with severe drug hypersensitivity reactions. HLA-B*57:01 is strongly associated with abacavir hypersensitivity. HLA-B*15:02 is associated with Stevens-Johnson syndrome from carbamazepine in Asian populations.',
    chromosome: '6p21.33',
    drugCount: 10,
    variantCount: 8000,
    hasCpicGuideline: true,
    cpicLevel: 'A',
    crossReferences: [
      { source: 'HGNC', id: '4932' },
      { source: 'NCBI', id: '3106' },
      { source: 'Ensembl', id: 'ENSG00000234745' },
    ],
  },
  'G6PD': {
    pharmgkbId: 'PA27093',
    symbol: 'G6PD',
    hgncId: 'HGNC:4057',
    name: 'Glucose-6-Phosphate Dehydrogenase',
    description: 'G6PD deficiency is the most common enzyme deficiency worldwide. Affected individuals are at risk of hemolytic anemia when exposed to certain drugs (primaquine, rasburicase, dapsone), foods (fava beans), or infections.',
    chromosome: 'Xq28',
    drugCount: 20,
    variantCount: 200,
    hasCpicGuideline: true,
    cpicLevel: 'A',
    crossReferences: [
      { source: 'HGNC', id: '4057' },
      { source: 'NCBI', id: '2539' },
      { source: 'Ensembl', id: 'ENSG00000160211' },
    ],
  },
  'CYP3A5': {
    pharmgkbId: 'PA130',
    symbol: 'CYP3A5',
    hgncId: 'HGNC:2638',
    name: 'Cytochrome P450 Family 3 Subfamily A Member 5',
    description: 'CYP3A5 metabolizes many drugs including tacrolimus. The CYP3A5*3 allele results in a non-functional enzyme. Individuals who express CYP3A5 (CYP3A5*1 carriers) may require higher tacrolimus doses to achieve therapeutic levels.',
    chromosome: '7q22.1',
    drugCount: 30,
    variantCount: 15,
    hasCpicGuideline: true,
    cpicLevel: 'A',
    crossReferences: [
      { source: 'HGNC', id: '2638' },
      { source: 'NCBI', id: '1577' },
      { source: 'Ensembl', id: 'ENSG00000106258' },
    ],
  },
  'NUDT15': {
    pharmgkbId: 'PA134963845',
    symbol: 'NUDT15',
    hgncId: 'HGNC:23063',
    name: 'Nudix Hydrolase 15',
    description: 'NUDT15 variants affect thiopurine metabolism, particularly in Asian populations. Individuals with NUDT15 deficiency have increased risk of severe thiopurine-induced myelosuppression and require dose reduction.',
    chromosome: '13q14.2',
    drugCount: 3,
    variantCount: 10,
    hasCpicGuideline: true,
    cpicLevel: 'A',
    crossReferences: [
      { source: 'HGNC', id: '23063' },
      { source: 'NCBI', id: '55190' },
      { source: 'Ensembl', id: 'ENSG00000136159' },
    ],
  },
};

/**
 * Sample star alleles for major genes
 */
const STAR_ALLELES: Record<string, StarAllele[]> = {
  'CYP2D6': [
    { name: '*1', geneSymbol: 'CYP2D6', function: 'Normal Function', activityScore: 1, isReference: true },
    { name: '*2', geneSymbol: 'CYP2D6', function: 'Normal Function', activityScore: 1 },
    { name: '*3', geneSymbol: 'CYP2D6', function: 'No Function', activityScore: 0, definingVariants: ['rs35742686'] },
    { name: '*4', geneSymbol: 'CYP2D6', function: 'No Function', activityScore: 0, definingVariants: ['rs3892097'] },
    { name: '*5', geneSymbol: 'CYP2D6', function: 'No Function', activityScore: 0, clinicalSignificance: 'Gene deletion' },
    { name: '*6', geneSymbol: 'CYP2D6', function: 'No Function', activityScore: 0, definingVariants: ['rs5030655'] },
    { name: '*9', geneSymbol: 'CYP2D6', function: 'Decreased Function', activityScore: 0.5, definingVariants: ['rs5030656'] },
    { name: '*10', geneSymbol: 'CYP2D6', function: 'Decreased Function', activityScore: 0.25, definingVariants: ['rs1065852'] },
    { name: '*17', geneSymbol: 'CYP2D6', function: 'Decreased Function', activityScore: 0.5, definingVariants: ['rs28371706'] },
    { name: '*29', geneSymbol: 'CYP2D6', function: 'Decreased Function', activityScore: 0.5 },
    { name: '*41', geneSymbol: 'CYP2D6', function: 'Decreased Function', activityScore: 0.5, definingVariants: ['rs28371725'] },
  ],
  'CYP2C19': [
    { name: '*1', geneSymbol: 'CYP2C19', function: 'Normal Function', activityScore: 1, isReference: true },
    { name: '*2', geneSymbol: 'CYP2C19', function: 'No Function', activityScore: 0, definingVariants: ['rs4244285'] },
    { name: '*3', geneSymbol: 'CYP2C19', function: 'No Function', activityScore: 0, definingVariants: ['rs4986893'] },
    { name: '*17', geneSymbol: 'CYP2C19', function: 'Increased Function', activityScore: 1.5, definingVariants: ['rs12248560'] },
  ],
  'CYP2C9': [
    { name: '*1', geneSymbol: 'CYP2C9', function: 'Normal Function', activityScore: 1, isReference: true },
    { name: '*2', geneSymbol: 'CYP2C9', function: 'Decreased Function', activityScore: 0.5, definingVariants: ['rs1799853'] },
    { name: '*3', geneSymbol: 'CYP2C9', function: 'Decreased Function', activityScore: 0.5, definingVariants: ['rs1057910'] },
    { name: '*5', geneSymbol: 'CYP2C9', function: 'Decreased Function', activityScore: 0.5 },
    { name: '*6', geneSymbol: 'CYP2C9', function: 'No Function', activityScore: 0 },
    { name: '*8', geneSymbol: 'CYP2C9', function: 'Decreased Function', activityScore: 0.5 },
    { name: '*11', geneSymbol: 'CYP2C9', function: 'Decreased Function', activityScore: 0.5 },
  ],
  'TPMT': [
    { name: '*1', geneSymbol: 'TPMT', function: 'Normal Function', isReference: true },
    { name: '*2', geneSymbol: 'TPMT', function: 'No Function', definingVariants: ['rs1800462'] },
    { name: '*3A', geneSymbol: 'TPMT', function: 'No Function', definingVariants: ['rs1800460', 'rs1142345'] },
    { name: '*3B', geneSymbol: 'TPMT', function: 'No Function', definingVariants: ['rs1800460'] },
    { name: '*3C', geneSymbol: 'TPMT', function: 'No Function', definingVariants: ['rs1142345'] },
    { name: '*4', geneSymbol: 'TPMT', function: 'No Function' },
  ],
  'DPYD': [
    { name: '*1', geneSymbol: 'DPYD', function: 'Normal Function', activityScore: 1, isReference: true },
    { name: '*2A', geneSymbol: 'DPYD', function: 'No Function', activityScore: 0, definingVariants: ['rs3918290'], clinicalSignificance: 'IVS14+1G>A splice variant' },
    { name: '*13', geneSymbol: 'DPYD', function: 'No Function', activityScore: 0, definingVariants: ['rs55886062'] },
    { name: 'c.2846A>T', geneSymbol: 'DPYD', function: 'Decreased Function', activityScore: 0.5, definingVariants: ['rs67376798'] },
    { name: 'c.1129-5923C>G', geneSymbol: 'DPYD', function: 'Decreased Function', activityScore: 0.5, definingVariants: ['rs75017182'], clinicalSignificance: 'HapB3' },
  ],
};

/**
 * Sample dosing guidelines
 */
const DOSING_GUIDELINES: DosingGuideline[] = [
  {
    geneSymbol: 'CYP2D6',
    drugName: 'codeine',
    source: 'CPIC',
    pmid: '24458010',
    phenotypeGuidance: [
      {
        phenotype: 'Ultrarapid Metabolizer',
        recommendation: 'Avoid codeine use due to potential for serious toxicity',
        implications: 'Increased morphine formation leading to higher risk of toxicity',
        alternativeDrug: 'Non-tramadol/non-codeine analgesic',
        strength: 'Strong',
      },
      {
        phenotype: 'Normal Metabolizer',
        recommendation: 'Use label-recommended age or weight-specific dosing',
        implications: 'Normal morphine formation',
        strength: 'Strong',
      },
      {
        phenotype: 'Intermediate Metabolizer',
        recommendation: 'Use label-recommended age or weight-specific dosing; monitor for efficacy',
        implications: 'Reduced morphine formation',
        strength: 'Moderate',
      },
      {
        phenotype: 'Poor Metabolizer',
        recommendation: 'Avoid codeine use due to lack of efficacy',
        implications: 'Greatly reduced morphine formation',
        alternativeDrug: 'Non-tramadol/non-codeine analgesic',
        strength: 'Strong',
      },
    ],
  },
  {
    geneSymbol: 'CYP2C19',
    drugName: 'clopidogrel',
    source: 'CPIC',
    pmid: '23698643',
    phenotypeGuidance: [
      {
        phenotype: 'Ultrarapid Metabolizer',
        recommendation: 'Use label-recommended dosage and target',
        implications: 'Increased active metabolite formation; normal response expected',
        strength: 'Strong',
      },
      {
        phenotype: 'Normal Metabolizer',
        recommendation: 'Use label-recommended dosage and target',
        implications: 'Normal clopidogrel metabolism and response',
        strength: 'Strong',
      },
      {
        phenotype: 'Intermediate Metabolizer',
        recommendation: 'Consider alternative antiplatelet therapy (prasugrel, ticagrelor)',
        implications: 'Reduced active metabolite formation; reduced platelet inhibition',
        alternativeDrug: 'Prasugrel or ticagrelor if not contraindicated',
        strength: 'Moderate',
      },
      {
        phenotype: 'Poor Metabolizer',
        recommendation: 'Use alternative antiplatelet therapy',
        implications: 'Significantly reduced active metabolite; poor response to clopidogrel',
        alternativeDrug: 'Prasugrel or ticagrelor',
        strength: 'Strong',
      },
    ],
  },
  {
    geneSymbol: 'DPYD',
    drugName: 'fluorouracil',
    source: 'CPIC',
    pmid: '29152729',
    phenotypeGuidance: [
      {
        phenotype: 'Normal Metabolizer',
        recommendation: 'Use label-recommended dosage',
        implications: 'Normal DPD activity and normal risk for toxicity',
        strength: 'Strong',
      },
      {
        phenotype: 'Intermediate Metabolizer',
        recommendation: 'Reduce starting dose by 50%',
        implications: 'Decreased DPD activity; increased risk for severe toxicity',
        dosageAdjustment: '50% dose reduction',
        strength: 'Strong',
      },
      {
        phenotype: 'Poor Metabolizer',
        recommendation: 'Avoid use of 5-fluorouracil or 5-FU prodrugs',
        implications: 'Complete DPD deficiency; high risk of fatal toxicity',
        alternativeDrug: 'Alternative non-fluoropyrimidine regimen',
        strength: 'Strong',
      },
    ],
  },
  {
    geneSymbol: 'TPMT',
    drugName: 'azathioprine',
    source: 'CPIC',
    pmid: '23422873',
    phenotypeGuidance: [
      {
        phenotype: 'Normal Metabolizer',
        recommendation: 'Start with normal starting dose',
        implications: 'Normal TPMT activity',
        strength: 'Strong',
      },
      {
        phenotype: 'Intermediate Metabolizer',
        recommendation: 'Start with reduced doses (30-70% of normal)',
        implications: 'Moderate risk of myelosuppression',
        dosageAdjustment: 'Reduce dose to 30-70% of standard',
        strength: 'Strong',
      },
      {
        phenotype: 'Poor Metabolizer',
        recommendation: 'Consider alternative agent or drastically reduce dose (10-fold)',
        implications: 'High risk of severe myelosuppression',
        dosageAdjustment: 'Reduce dose by 10-fold if used, with frequent monitoring',
        alternativeDrug: 'Alternative immunosuppressant',
        strength: 'Strong',
      },
    ],
  },
];

// =============================================================================
// PHARMGKB BROWSER CLASS
// =============================================================================

/**
 * PharmGKB Browser for pharmacogenomics data
 */
export class PharmgkbBrowser {
  private config: PharmgkbConfig;
  private lastRequestTime: number = 0;

  constructor(config: Partial<PharmgkbConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Search for pharmacogenes
   */
  async search(params: PharmgkbSearchParams): Promise<PharmgkbSearchResponse> {
    const { query, cpicLevel, hasGuideline, limit = 20, offset = 0 } = params;
    const normalizedQuery = query.toLowerCase().trim();

    if (!normalizedQuery || normalizedQuery.length < 2) {
      return { results: [], total: 0, query };
    }

    // Search local cache
    let results = this.searchLocalCache(normalizedQuery);

    // Filter by CPIC level
    if (cpicLevel) {
      const levels = Array.isArray(cpicLevel) ? cpicLevel : [cpicLevel];
      results = results.filter(r => r.gene.cpicLevel && levels.includes(r.gene.cpicLevel));
    }

    // Filter by guideline
    if (hasGuideline !== undefined) {
      results = results.filter(r => r.gene.hasCpicGuideline === hasGuideline);
    }

    // Sort by match score
    results.sort((a, b) => b.matchScore - a.matchScore);

    const total = results.length;
    const paginatedResults = results.slice(offset, offset + limit);

    return {
      results: paginatedResults,
      total,
      query,
    };
  }

  /**
   * Search local cache for genes
   */
  private searchLocalCache(query: string): PharmgkbSearchResult[] {
    const results: PharmgkbSearchResult[] = [];

    for (const gene of CORE_PHARMACOGENES) {
      let matchScore = 0;
      let matchedOn: 'symbol' | 'name' | 'synonym' = 'symbol';

      // Exact symbol match
      if (gene.symbol.toLowerCase() === query) {
        matchScore = 100;
        matchedOn = 'symbol';
      }
      // Symbol starts with query
      else if (gene.symbol.toLowerCase().startsWith(query)) {
        matchScore = 80;
        matchedOn = 'symbol';
      }
      // Symbol contains query
      else if (gene.symbol.toLowerCase().includes(query)) {
        matchScore = 60;
        matchedOn = 'symbol';
      }
      // Name contains query
      else if (gene.name.toLowerCase().includes(query)) {
        matchScore = 40;
        matchedOn = 'name';
      }

      if (matchScore > 0) {
        results.push({ gene, matchScore, matchedOn });
      }
    }

    return results;
  }

  /**
   * Get full pharmacogene details
   */
  async getGene(symbol: string): Promise<Pharmacogene | null> {
    const upperSymbol = symbol.toUpperCase();

    // Check local cache
    if (PHARMACOGENE_DETAILS[upperSymbol]) {
      return PHARMACOGENE_DETAILS[upperSymbol];
    }

    // Find in core list
    const mini = CORE_PHARMACOGENES.find(g => g.symbol.toUpperCase() === upperSymbol);
    if (mini) {
      return {
        ...mini,
        description: `Pharmacogene ${mini.symbol} with ${mini.hasCpicGuideline ? '' : 'no '}CPIC guideline`,
      };
    }

    return null;
  }

  /**
   * Get star alleles for a gene
   */
  async getStarAlleles(geneSymbol: string): Promise<StarAllele[]> {
    const upperSymbol = geneSymbol.toUpperCase();
    return STAR_ALLELES[upperSymbol] || [];
  }

  /**
   * Get gene-drug pairs for a gene
   */
  async getGeneDrugPairs(geneSymbol: string): Promise<GeneDrugPair[]> {
    const upperSymbol = geneSymbol.toUpperCase();
    return COMMON_GENE_DRUG_PAIRS.filter(pair =>
      pair.geneSymbol.toUpperCase() === upperSymbol
    );
  }

  /**
   * Search for drug interactions by drug name
   */
  async searchDrugInteractions(drugName: string): Promise<DrugInteractionResult | null> {
    const normalizedName = drugName.toLowerCase().trim();

    const interactions = COMMON_GENE_DRUG_PAIRS.filter(pair =>
      pair.drugName.toLowerCase().includes(normalizedName)
    );

    if (interactions.length === 0) {
      return null;
    }

    const firstMatch = interactions[0];
    return {
      drug: {
        id: firstMatch.drugId,
        name: firstMatch.drugName,
        rxnormId: firstMatch.rxnormId,
      },
      interactions,
    };
  }

  /**
   * Get dosing guideline for gene-drug pair
   */
  async getDosingGuideline(geneSymbol: string, drugName: string): Promise<DosingGuideline | null> {
    const upperSymbol = geneSymbol.toUpperCase();
    const normalizedDrug = drugName.toLowerCase().trim();

    return DOSING_GUIDELINES.find(g =>
      g.geneSymbol.toUpperCase() === upperSymbol &&
      g.drugName.toLowerCase() === normalizedDrug
    ) || null;
  }

  /**
   * Get all dosing guidelines for a gene
   */
  async getGeneGuidelines(geneSymbol: string): Promise<DosingGuideline[]> {
    const upperSymbol = geneSymbol.toUpperCase();
    return DOSING_GUIDELINES.filter(g =>
      g.geneSymbol.toUpperCase() === upperSymbol
    );
  }

  /**
   * Get phenotype-specific recommendation
   */
  async getRecommendation(
    geneSymbol: string,
    drugName: string,
    phenotype: MetabolizerPhenotype
  ): Promise<PhenotypeGuidance | null> {
    const guideline = await this.getDosingGuideline(geneSymbol, drugName);
    if (!guideline) return null;

    return guideline.phenotypeGuidance.find(g => g.phenotype === phenotype) || null;
  }

  /**
   * Validate gene symbol
   */
  async validateGene(symbol: string): Promise<boolean> {
    const gene = await this.getGene(symbol);
    return gene !== null;
  }

  /**
   * Get all core pharmacogenes
   */
  getAllGenes(): PharmacogeneMini[] {
    return [...CORE_PHARMACOGENES];
  }

  /**
   * Get all gene-drug pairs
   */
  getAllGeneDrugPairs(): GeneDrugPair[] {
    return [...COMMON_GENE_DRUG_PAIRS];
  }

  /**
   * Get genes by CPIC level
   */
  getGenesByCpicLevel(level: CpicLevel): PharmacogeneMini[] {
    return CORE_PHARMACOGENES.filter(g => g.cpicLevel === level);
  }
}

// =============================================================================
// SINGLETON INSTANCE
// =============================================================================

let browserInstance: PharmgkbBrowser | null = null;

/**
 * Get singleton PharmGKB browser instance
 */
export function getPharmgkbBrowser(): PharmgkbBrowser {
  if (!browserInstance) {
    browserInstance = new PharmgkbBrowser();
  }
  return browserInstance;
}

/**
 * Create new PharmGKB browser with custom config
 */
export function createPharmgkbBrowser(config?: Partial<PharmgkbConfig>): PharmgkbBrowser {
  return new PharmgkbBrowser(config);
}
