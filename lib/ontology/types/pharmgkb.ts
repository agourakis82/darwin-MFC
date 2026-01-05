/**
 * PHARMGKB TYPE DEFINITIONS
 * =========================
 *
 * Type definitions for PharmGKB pharmacogenomics data.
 * Supports gene-drug interactions, clinical annotations, and dosing guidelines.
 *
 * Key concepts:
 * - Pharmacogenes: Genes that affect drug metabolism/response
 * - Star alleles: Named variants (e.g., CYP2D6*1, *2, *4)
 * - Phenotypes: Metabolizer status (PM, IM, NM, UM)
 * - CPIC guidelines: Clinical dosing recommendations
 *
 * @see https://www.pharmgkb.org
 * @see https://cpicpgx.org
 */

import type {
  OntologyIdentifier,
  OntologySystem,
  Concept,
  ConceptRelationship,
  SemanticType,
} from './ontology';

// =============================================================================
// ENUMS AND CONSTANTS
// =============================================================================

/**
 * Metabolizer phenotype categories
 * Based on CPIC standardized phenotype classifications
 */
export type MetabolizerPhenotype =
  | 'Ultrarapid Metabolizer'
  | 'Rapid Metabolizer'
  | 'Normal Metabolizer'
  | 'Intermediate Metabolizer'
  | 'Poor Metabolizer'
  | 'Indeterminate';

/**
 * Abbreviated phenotype codes
 */
export type PhenotypeCode = 'UM' | 'RM' | 'NM' | 'IM' | 'PM' | 'IND';

/**
 * CPIC evidence levels for gene-drug pairs
 * A = Highest evidence, D = Lowest
 */
export type CpicLevel = 'A' | 'A/B' | 'B' | 'B/C' | 'C' | 'C/D' | 'D';

/**
 * Clinical annotation level of evidence
 */
export type EvidenceLevel = '1A' | '1B' | '2A' | '2B' | '3' | '4';

/**
 * Allele function status
 */
export type AlleleFunction =
  | 'Increased Function'
  | 'Normal Function'
  | 'Decreased Function'
  | 'No Function'
  | 'Uncertain Function'
  | 'Unknown Function';

/**
 * Drug-gene interaction type
 */
export type InteractionType =
  | 'Dosing'
  | 'Efficacy'
  | 'Toxicity/ADR'
  | 'Metabolism/PK'
  | 'Other';

/**
 * Recommendation strength
 */
export type RecommendationStrength = 'Strong' | 'Moderate' | 'Optional';

// =============================================================================
// CORE INTERFACES
// =============================================================================

/**
 * Pharmacogene definition
 */
export interface Pharmacogene {
  /** PharmGKB accession ID (e.g., "PA128") */
  pharmgkbId: string;

  /** HGNC gene symbol (e.g., "CYP2D6") */
  symbol: string;

  /** HGNC gene ID */
  hgncId?: string;

  /** Full gene name */
  name: string;

  /** Gene description/function */
  description?: string;

  /** Chromosome location */
  chromosome?: string;

  /** Associated drugs count */
  drugCount?: number;

  /** Associated variants count */
  variantCount?: number;

  /** Has CPIC guideline */
  hasCpicGuideline: boolean;

  /** CPIC level for this gene */
  cpicLevel?: CpicLevel;

  /** Cross-references */
  crossReferences?: PharmgkbCrossReference[];
}

/**
 * Minimal pharmacogene representation for lists/search
 */
export interface PharmacogeneMini {
  pharmgkbId: string;
  symbol: string;
  name: string;
  hasCpicGuideline: boolean;
  cpicLevel?: CpicLevel;
}

/**
 * Star allele definition
 */
export interface StarAllele {
  /** Allele name (e.g., "*1", "*2", "*4") */
  name: string;

  /** Gene symbol this allele belongs to */
  geneSymbol: string;

  /** Allele function */
  function: AlleleFunction;

  /** Activity score (for genes that use activity scoring) */
  activityScore?: number;

  /** Defining variants (rsIDs) */
  definingVariants?: string[];

  /** Is this the reference/wild-type allele */
  isReference?: boolean;

  /** Clinical significance notes */
  clinicalSignificance?: string;

  /** Frequency data by population */
  frequencies?: AlleleFrequency[];
}

/**
 * Allele frequency in a population
 */
export interface AlleleFrequency {
  population: string;
  frequency: number;
  sampleSize?: number;
}

/**
 * Diplotype (two allele combination)
 */
export interface Diplotype {
  /** Gene symbol */
  geneSymbol: string;

  /** Allele 1 */
  allele1: string;

  /** Allele 2 */
  allele2: string;

  /** Resulting phenotype */
  phenotype: MetabolizerPhenotype;

  /** Activity score (sum of allele scores) */
  activityScore?: number;

  /** Example drugs affected */
  exampleDrugs?: string[];
}

/**
 * Gene-drug pair with clinical annotation
 */
export interface GeneDrugPair {
  /** PharmGKB gene accession */
  geneId: string;

  /** Gene symbol */
  geneSymbol: string;

  /** PharmGKB drug accession */
  drugId: string;

  /** Drug name */
  drugName: string;

  /** RxNorm CUI if available */
  rxnormId?: string;

  /** CPIC level for this pair */
  cpicLevel: CpicLevel;

  /** Has dosing guideline */
  hasGuideline: boolean;

  /** Guideline URL if available */
  guidelineUrl?: string;

  /** FDA label annotation */
  fdaLabelAnnotation?: boolean;

  /** Primary interaction type */
  interactionType: InteractionType;

  /** Level of evidence */
  evidenceLevel?: EvidenceLevel;
}

/**
 * Clinical annotation with dosing recommendation
 */
export interface ClinicalAnnotation {
  /** Unique annotation ID */
  id: string;

  /** Gene-drug pair */
  geneDrugPair: GeneDrugPair;

  /** Phenotypes this applies to */
  phenotypes: MetabolizerPhenotype[];

  /** Clinical recommendation text */
  recommendation: string;

  /** Recommendation strength */
  strength: RecommendationStrength;

  /** Dosing implications */
  implications?: string;

  /** Classification (e.g., "Dosing", "Efficacy") */
  classification?: string;

  /** Source guideline (CPIC, DPWG, etc.) */
  source: 'CPIC' | 'DPWG' | 'CPNDS' | 'FDA' | 'Other';

  /** Publication reference */
  references?: string[];
}

/**
 * Dosing guideline summary
 */
export interface DosingGuideline {
  /** Gene symbol */
  geneSymbol: string;

  /** Drug name */
  drugName: string;

  /** Summary by phenotype */
  phenotypeGuidance: PhenotypeGuidance[];

  /** Guideline source */
  source: 'CPIC' | 'DPWG' | 'CPNDS';

  /** Publication date */
  publicationDate?: string;

  /** Last updated */
  lastUpdated?: string;

  /** PMID */
  pmid?: string;

  /** DOI */
  doi?: string;
}

/**
 * Guidance for a specific phenotype
 */
export interface PhenotypeGuidance {
  phenotype: MetabolizerPhenotype;
  recommendation: string;
  implications: string;
  dosageAdjustment?: string;
  alternativeDrug?: string;
  strength: RecommendationStrength;
}

/**
 * Cross-reference to external database
 */
export interface PharmgkbCrossReference {
  source: 'HGNC' | 'NCBI' | 'Ensembl' | 'UniProt' | 'RxNorm' | 'DrugBank' | 'OMIM';
  id: string;
  url?: string;
}

// =============================================================================
// SEARCH AND RESPONSE TYPES
// =============================================================================

/**
 * Search parameters for pharmacogenes
 */
export interface PharmgkbSearchParams {
  /** Search query */
  query: string;

  /** Filter by CPIC level */
  cpicLevel?: CpicLevel | CpicLevel[];

  /** Only genes with guidelines */
  hasGuideline?: boolean;

  /** Maximum results */
  limit?: number;

  /** Offset for pagination */
  offset?: number;
}

/**
 * Search result item
 */
export interface PharmgkbSearchResult {
  gene: PharmacogeneMini;
  matchScore: number;
  matchedOn: 'symbol' | 'name' | 'synonym';
}

/**
 * Search response
 */
export interface PharmgkbSearchResponse {
  results: PharmgkbSearchResult[];
  total: number;
  query: string;
}

/**
 * Gene-drug interaction search result
 */
export interface DrugInteractionResult {
  drug: {
    id: string;
    name: string;
    rxnormId?: string;
  };
  interactions: GeneDrugPair[];
}

// =============================================================================
// PRE-DEFINED DATA
// =============================================================================

/**
 * Core pharmacogenes with CPIC guidelines
 * These are the most clinically relevant genes
 */
export const CORE_PHARMACOGENES: PharmacogeneMini[] = [
  {
    pharmgkbId: 'PA128',
    symbol: 'CYP2D6',
    name: 'Cytochrome P450 Family 2 Subfamily D Member 6',
    hasCpicGuideline: true,
    cpicLevel: 'A',
  },
  {
    pharmgkbId: 'PA124',
    symbol: 'CYP2C19',
    name: 'Cytochrome P450 Family 2 Subfamily C Member 19',
    hasCpicGuideline: true,
    cpicLevel: 'A',
  },
  {
    pharmgkbId: 'PA126',
    symbol: 'CYP2C9',
    name: 'Cytochrome P450 Family 2 Subfamily C Member 9',
    hasCpicGuideline: true,
    cpicLevel: 'A',
  },
  {
    pharmgkbId: 'PA130',
    symbol: 'CYP3A5',
    name: 'Cytochrome P450 Family 3 Subfamily A Member 5',
    hasCpicGuideline: true,
    cpicLevel: 'A',
  },
  {
    pharmgkbId: 'PA145',
    symbol: 'DPYD',
    name: 'Dihydropyrimidine Dehydrogenase',
    hasCpicGuideline: true,
    cpicLevel: 'A',
  },
  {
    pharmgkbId: 'PA356',
    symbol: 'TPMT',
    name: 'Thiopurine S-Methyltransferase',
    hasCpicGuideline: true,
    cpicLevel: 'A',
  },
  {
    pharmgkbId: 'PA420',
    symbol: 'NUDT15',
    name: 'Nudix Hydrolase 15',
    hasCpicGuideline: true,
    cpicLevel: 'A',
  },
  {
    pharmgkbId: 'PA166153895',
    symbol: 'SLCO1B1',
    name: 'Solute Carrier Organic Anion Transporter Family Member 1B1',
    hasCpicGuideline: true,
    cpicLevel: 'A',
  },
  {
    pharmgkbId: 'PA37182',
    symbol: 'VKORC1',
    name: 'Vitamin K Epoxide Reductase Complex Subunit 1',
    hasCpicGuideline: true,
    cpicLevel: 'A',
  },
  {
    pharmgkbId: 'PA420',
    symbol: 'UGT1A1',
    name: 'UDP Glucuronosyltransferase Family 1 Member A1',
    hasCpicGuideline: true,
    cpicLevel: 'A',
  },
  {
    pharmgkbId: 'PA134',
    symbol: 'CYP4F2',
    name: 'Cytochrome P450 Family 4 Subfamily F Member 2',
    hasCpicGuideline: true,
    cpicLevel: 'A',
  },
  {
    pharmgkbId: 'PA27093',
    symbol: 'G6PD',
    name: 'Glucose-6-Phosphate Dehydrogenase',
    hasCpicGuideline: true,
    cpicLevel: 'A',
  },
  {
    pharmgkbId: 'PA267',
    symbol: 'HLA-B',
    name: 'Major Histocompatibility Complex, Class I, B',
    hasCpicGuideline: true,
    cpicLevel: 'A',
  },
  {
    pharmgkbId: 'PA35056',
    symbol: 'HLA-A',
    name: 'Major Histocompatibility Complex, Class I, A',
    hasCpicGuideline: true,
    cpicLevel: 'A',
  },
  {
    pharmgkbId: 'PA30679',
    symbol: 'IFNL3',
    name: 'Interferon Lambda 3',
    hasCpicGuideline: true,
    cpicLevel: 'B',
  },
  {
    pharmgkbId: 'PA129',
    symbol: 'CYP2B6',
    name: 'Cytochrome P450 Family 2 Subfamily B Member 6',
    hasCpicGuideline: true,
    cpicLevel: 'A',
  },
  {
    pharmgkbId: 'PA131',
    symbol: 'CYP3A4',
    name: 'Cytochrome P450 Family 3 Subfamily A Member 4',
    hasCpicGuideline: true,
    cpicLevel: 'B',
  },
  {
    pharmgkbId: 'PA359',
    symbol: 'MT-RNR1',
    name: 'Mitochondrially Encoded 12S RRNA',
    hasCpicGuideline: true,
    cpicLevel: 'A',
  },
];

/**
 * Common gene-drug pairs with high clinical relevance
 */
export const COMMON_GENE_DRUG_PAIRS: GeneDrugPair[] = [
  // CYP2D6
  {
    geneId: 'PA128',
    geneSymbol: 'CYP2D6',
    drugId: 'PA448385',
    drugName: 'codeine',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Metabolism/PK',
    evidenceLevel: '1A',
  },
  {
    geneId: 'PA128',
    geneSymbol: 'CYP2D6',
    drugId: 'PA451089',
    drugName: 'tramadol',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Metabolism/PK',
    evidenceLevel: '1A',
  },
  {
    geneId: 'PA128',
    geneSymbol: 'CYP2D6',
    drugId: 'PA10402',
    drugName: 'ondansetron',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Efficacy',
    evidenceLevel: '1A',
  },
  {
    geneId: 'PA128',
    geneSymbol: 'CYP2D6',
    drugId: 'PA450626',
    drugName: 'tamoxifen',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Efficacy',
    evidenceLevel: '1A',
  },
  // CYP2C19
  {
    geneId: 'PA124',
    geneSymbol: 'CYP2C19',
    drugId: 'PA449053',
    drugName: 'clopidogrel',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Efficacy',
    evidenceLevel: '1A',
  },
  {
    geneId: 'PA124',
    geneSymbol: 'CYP2C19',
    drugId: 'PA450774',
    drugName: 'omeprazole',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Dosing',
    evidenceLevel: '1A',
  },
  {
    geneId: 'PA124',
    geneSymbol: 'CYP2C19',
    drugId: 'PA449726',
    drugName: 'escitalopram',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Dosing',
    evidenceLevel: '1A',
  },
  {
    geneId: 'PA124',
    geneSymbol: 'CYP2C19',
    drugId: 'PA449015',
    drugName: 'citalopram',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Dosing',
    evidenceLevel: '1A',
  },
  {
    geneId: 'PA124',
    geneSymbol: 'CYP2C19',
    drugId: 'PA450998',
    drugName: 'sertraline',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Dosing',
    evidenceLevel: '1A',
  },
  {
    geneId: 'PA124',
    geneSymbol: 'CYP2C19',
    drugId: 'PA451341',
    drugName: 'voriconazole',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Dosing',
    evidenceLevel: '1A',
  },
  // CYP2C9
  {
    geneId: 'PA126',
    geneSymbol: 'CYP2C9',
    drugId: 'PA451906',
    drugName: 'warfarin',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Dosing',
    evidenceLevel: '1A',
  },
  {
    geneId: 'PA126',
    geneSymbol: 'CYP2C9',
    drugId: 'PA450416',
    drugName: 'phenytoin',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Dosing',
    evidenceLevel: '1A',
  },
  {
    geneId: 'PA126',
    geneSymbol: 'CYP2C9',
    drugId: 'PA449283',
    drugName: 'celecoxib',
    cpicLevel: 'B',
    hasGuideline: true,
    interactionType: 'Dosing',
    evidenceLevel: '2A',
  },
  // DPYD
  {
    geneId: 'PA145',
    geneSymbol: 'DPYD',
    drugId: 'PA128406',
    drugName: 'fluorouracil',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Toxicity/ADR',
    evidenceLevel: '1A',
  },
  {
    geneId: 'PA145',
    geneSymbol: 'DPYD',
    drugId: 'PA449023',
    drugName: 'capecitabine',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Toxicity/ADR',
    evidenceLevel: '1A',
  },
  // TPMT/NUDT15
  {
    geneId: 'PA356',
    geneSymbol: 'TPMT',
    drugId: 'PA448515',
    drugName: 'azathioprine',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Toxicity/ADR',
    evidenceLevel: '1A',
  },
  {
    geneId: 'PA356',
    geneSymbol: 'TPMT',
    drugId: 'PA450379',
    drugName: 'mercaptopurine',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Toxicity/ADR',
    evidenceLevel: '1A',
  },
  {
    geneId: 'PA356',
    geneSymbol: 'TPMT',
    drugId: 'PA451085',
    drugName: 'thioguanine',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Toxicity/ADR',
    evidenceLevel: '1A',
  },
  // SLCO1B1
  {
    geneId: 'PA166153895',
    geneSymbol: 'SLCO1B1',
    drugId: 'PA451363',
    drugName: 'simvastatin',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Toxicity/ADR',
    evidenceLevel: '1A',
  },
  // VKORC1
  {
    geneId: 'PA37182',
    geneSymbol: 'VKORC1',
    drugId: 'PA451906',
    drugName: 'warfarin',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Dosing',
    evidenceLevel: '1A',
  },
  // HLA-B
  {
    geneId: 'PA267',
    geneSymbol: 'HLA-B',
    drugId: 'PA448061',
    drugName: 'abacavir',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Toxicity/ADR',
    evidenceLevel: '1A',
  },
  {
    geneId: 'PA267',
    geneSymbol: 'HLA-B',
    drugId: 'PA448785',
    drugName: 'carbamazepine',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Toxicity/ADR',
    evidenceLevel: '1A',
  },
  {
    geneId: 'PA267',
    geneSymbol: 'HLA-B',
    drugId: 'PA450704',
    drugName: 'allopurinol',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Toxicity/ADR',
    evidenceLevel: '1A',
  },
  // UGT1A1
  {
    geneId: 'PA420',
    geneSymbol: 'UGT1A1',
    drugId: 'PA450085',
    drugName: 'irinotecan',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Toxicity/ADR',
    evidenceLevel: '1A',
  },
  {
    geneId: 'PA420',
    geneSymbol: 'UGT1A1',
    drugId: 'PA448263',
    drugName: 'atazanavir',
    cpicLevel: 'A',
    hasGuideline: true,
    interactionType: 'Toxicity/ADR',
    evidenceLevel: '1A',
  },
];

/**
 * Phenotype mapping for display
 */
export const PHENOTYPE_DISPLAY: Record<MetabolizerPhenotype, { code: PhenotypeCode; color: string; description: string }> = {
  'Ultrarapid Metabolizer': {
    code: 'UM',
    color: 'red',
    description: 'Increased enzyme activity; may need higher doses or alternative drug',
  },
  'Rapid Metabolizer': {
    code: 'RM',
    color: 'orange',
    description: 'Slightly increased enzyme activity',
  },
  'Normal Metabolizer': {
    code: 'NM',
    color: 'green',
    description: 'Normal enzyme activity; standard dosing appropriate',
  },
  'Intermediate Metabolizer': {
    code: 'IM',
    color: 'yellow',
    description: 'Decreased enzyme activity; may need reduced dose',
  },
  'Poor Metabolizer': {
    code: 'PM',
    color: 'purple',
    description: 'Minimal or no enzyme activity; may need alternative drug or significant dose reduction',
  },
  'Indeterminate': {
    code: 'IND',
    color: 'gray',
    description: 'Unable to determine phenotype from available data',
  },
};

/**
 * CPIC level descriptions
 */
export const CPIC_LEVEL_INFO: Record<CpicLevel, { description: string; actionRequired: boolean }> = {
  'A': {
    description: 'Strong evidence; prescribing action recommended',
    actionRequired: true,
  },
  'A/B': {
    description: 'Strong to moderate evidence',
    actionRequired: true,
  },
  'B': {
    description: 'Moderate evidence; prescribing action recommended',
    actionRequired: true,
  },
  'B/C': {
    description: 'Moderate to weak evidence',
    actionRequired: false,
  },
  'C': {
    description: 'Weak evidence; action may be considered',
    actionRequired: false,
  },
  'C/D': {
    description: 'Weak to minimal evidence',
    actionRequired: false,
  },
  'D': {
    description: 'Minimal evidence; no action needed',
    actionRequired: false,
  },
};

// =============================================================================
// CONVERSION FUNCTIONS
// =============================================================================

/**
 * Map PharmGKB gene to unified ontology Concept
 */
export function toUnifiedConcept(gene: Pharmacogene | PharmacogeneMini): Concept {
  const isFull = 'description' in gene;
  const fullGene = gene as Pharmacogene;

  // Build relationships
  const relationships: ConceptRelationship[] = [];

  // Add cross-references as relationships
  if (isFull && fullGene.crossReferences) {
    for (const xref of fullGene.crossReferences) {
      const targetSystem = mapCrossRefToOntology(xref.source);
      if (targetSystem) {
        relationships.push({
          type: 'same-as',
          targetId: xref.id,
          targetDisplay: `${xref.source}:${xref.id}`,
          targetSystem,
          source: 'asserted',
        });
      }
    }
  }

  // Build primary identifier
  const identifier: OntologyIdentifier = {
    system: 'pharmgkb',
    code: gene.pharmgkbId,
    display: gene.symbol,
  };

  // Build equivalent identifiers
  const equivalentIdentifiers: OntologyIdentifier[] = [];

  // Add HGNC if available
  if (isFull && fullGene.hgncId) {
    equivalentIdentifiers.push({
      system: 'hgnc' as OntologySystem,
      code: fullGene.hgncId,
      display: gene.symbol,
    });
  }

  return {
    id: gene.pharmgkbId,
    identifier,
    equivalentIdentifiers,
    preferredTerm: gene.symbol,
    labels: { en: gene.name },
    synonyms: [],
    definition: isFull ? fullGene.description : undefined,
    relationships,
    semanticType: 'substance', // Genes as substances/entities
    status: 'active',
  };
}

/**
 * Map cross-reference source to OntologySystem
 */
function mapCrossRefToOntology(source: PharmgkbCrossReference['source']): OntologySystem | undefined {
  switch (source) {
    case 'RxNorm':
      return 'rxnorm';
    case 'DrugBank':
      return 'drugbank';
    default:
      return undefined;
  }
}

/**
 * Get phenotype code from full name
 */
export function getPhenotypeCode(phenotype: MetabolizerPhenotype): PhenotypeCode {
  return PHENOTYPE_DISPLAY[phenotype].code;
}

/**
 * Get full phenotype name from code
 */
export function getPhenotypeName(code: PhenotypeCode): MetabolizerPhenotype {
  const entry = Object.entries(PHENOTYPE_DISPLAY).find(([_, v]) => v.code === code);
  return entry ? (entry[0] as MetabolizerPhenotype) : 'Indeterminate';
}

/**
 * Check if CPIC level requires clinical action
 */
export function requiresClinicalAction(level: CpicLevel): boolean {
  return CPIC_LEVEL_INFO[level].actionRequired;
}
