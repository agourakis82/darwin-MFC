/**
 * KNOWLEDGE GRAPH TYPES - DARWIN-MFC
 * ===================================
 *
 * Neo4j-compatible knowledge graph type definitions for medical ontologies.
 * Designed for future migration to Neo4j graph database.
 *
 * Ontology Standards Supported:
 * - DOID (Disease Ontology)
 * - ICD-10/ICD-11 (International Classification of Diseases)
 * - SNOMED-CT (Systematized Nomenclature of Medicine)
 * - ATC (Anatomical Therapeutic Chemical Classification)
 * - LOINC (Logical Observation Identifiers Names and Codes)
 * - CIAP-2 (International Classification of Primary Care)
 * - HPO (Human Phenotype Ontology)
 * - ORDO (Orphanet Rare Disease Ontology)
 * - RxNorm (Normalized names for medications)
 * - MeSH (Medical Subject Headings)
 */

// =============================================================================
// NODE TYPES
// =============================================================================

/**
 * All possible node types in the knowledge graph
 */
export type KGNodeType =
  | 'Disease'
  | 'Symptom'
  | 'Medication'
  | 'Examination'
  | 'Pathway'
  | 'Gene'
  | 'Protocol'
  | 'Organ'
  | 'BodySystem'
  | 'RiskFactor'
  | 'Complication';

/**
 * Base interface for all nodes
 */
export interface KGNodeBase {
  /** Unique identifier in format type:id */
  id: string;
  /** Node type for Neo4j label */
  type: KGNodeType;
  /** Human-readable label */
  label: string;
  /** Alternative names/synonyms for search */
  synonyms?: string[];
  /** ISO 639-1 language code */
  language?: string;
  /** Timestamp of last update */
  updatedAt?: string;
  /** Source of the data */
  source?: string;
}

/**
 * Disease node with comprehensive ontology mappings
 */
export interface DiseaseNode extends KGNodeBase {
  type: 'Disease';
  ontologies: {
    /** Disease Ontology ID (e.g., "DOID:9351") */
    doid?: string;
    /** ICD-10 codes */
    icd10: string[];
    /** ICD-11 codes */
    icd11?: string[];
    /** SNOMED-CT Concept ID */
    snomedCT?: string;
    /** MeSH ID */
    meshId?: string;
    /** UMLS CUI */
    umlsCui?: string;
    /** CIAP-2 codes (primary care) */
    ciap2?: string[];
    /** ORDO codes (for rare diseases) */
    ordo?: string[];
    /** Human Phenotype Ontology codes */
    hpo?: string[];
  };
  /** Disease category */
  category: string;
  /** Severity level if applicable */
  severity?: 'mild' | 'moderate' | 'severe' | 'critical';
  /** Is this a chronic condition? */
  chronic?: boolean;
  /** Epidemiology data */
  epidemiology?: {
    prevalence?: string;
    incidence?: string;
    mortalityRate?: string;
    ageGroups?: string[];
  };
}

/**
 * Symptom node
 */
export interface SymptomNode extends KGNodeBase {
  type: 'Symptom';
  ontologies: {
    /** SNOMED-CT code for symptom */
    snomedCT?: string;
    /** HPO code */
    hpo?: string;
    /** MeSH ID */
    meshId?: string;
  };
  /** Body location/system affected */
  bodyLocation?: string;
  /** Typical duration */
  duration?: 'acute' | 'subacute' | 'chronic';
  /** How specific is this symptom for diagnosis */
  specificity?: 'pathognomonic' | 'highly_specific' | 'moderately_specific' | 'nonspecific';
}

/**
 * Medication node with drug ontology mappings
 */
export interface MedicationNode extends KGNodeBase {
  type: 'Medication';
  /** Generic drug name */
  genericName: string;
  /** Brand names */
  brandNames?: string[];
  ontologies: {
    /** ATC code (Anatomical Therapeutic Chemical) */
    atcCode?: string;
    /** RxNorm CUI */
    rxNormCui?: string;
    /** SNOMED-CT code */
    snomedCT?: string;
    /** DrugBank ID */
    drugBankId?: string;
    /** CAS Registry Number */
    casNumber?: string;
  };
  /** Therapeutic class */
  therapeuticClass: string;
  /** Mechanism of action */
  mechanismOfAction?: string;
  /** Available in Brazil's essential medicines list (RENAME) */
  rename?: boolean;
  /** Pregnancy category */
  pregnancyCategory?: 'A' | 'B' | 'C' | 'D' | 'X' | 'N';
  /** Pharmacogenomic markers */
  pharmacogenomics?: {
    gene: string;
    variant?: string;
    phenotype?: string;
    implications?: string;
  }[];
}

/**
 * Examination/Lab test node
 */
export interface ExaminationNode extends KGNodeBase {
  type: 'Examination';
  ontologies: {
    /** LOINC code */
    loinc?: string;
    /** SNOMED-CT code */
    snomedCT?: string;
  };
  /** Type of examination */
  examType: 'laboratory' | 'imaging' | 'physical' | 'functional' | 'pathology';
  /** Sample type for lab tests */
  sampleType?: string;
  /** Reference range if applicable */
  referenceRange?: {
    low?: number;
    high?: number;
    unit?: string;
  };
  /** Typical turnaround time */
  turnaroundTime?: string;
}

/**
 * Pathophysiology pathway node
 */
export interface PathwayNode extends KGNodeBase {
  type: 'Pathway';
  ontologies: {
    /** KEGG pathway ID */
    kegg?: string;
    /** Reactome pathway ID */
    reactome?: string;
    /** Gene Ontology biological process */
    goBiologicalProcess?: string;
  };
  /** Type of pathway */
  pathwayType: 'metabolic' | 'signaling' | 'immune' | 'inflammatory' | 'genetic' | 'other';
  /** Key molecules involved */
  keyMolecules?: string[];
}

/**
 * Gene node for pharmacogenomics
 */
export interface GeneNode extends KGNodeBase {
  type: 'Gene';
  ontologies: {
    /** HGNC gene symbol */
    hgncSymbol: string;
    /** Entrez Gene ID */
    entrezId?: string;
    /** Ensembl ID */
    ensemblId?: string;
  };
  /** Chromosome location */
  chromosome?: string;
  /** Gene function summary */
  function?: string;
}

/**
 * Body organ node
 */
export interface OrganNode extends KGNodeBase {
  type: 'Organ';
  ontologies: {
    /** UBERON anatomical entity ID */
    uberon?: string;
    /** FMA (Foundational Model of Anatomy) ID */
    fma?: string;
  };
  /** Parent body system */
  bodySystem: string;
}

/**
 * Body system node
 */
export interface BodySystemNode extends KGNodeBase {
  type: 'BodySystem';
  ontologies: {
    /** UBERON ID */
    uberon?: string;
  };
}

/**
 * Risk factor node
 */
export interface RiskFactorNode extends KGNodeBase {
  type: 'RiskFactor';
  /** Type of risk factor */
  riskType: 'modifiable' | 'non_modifiable' | 'genetic' | 'environmental' | 'behavioral';
  /** Relative risk if known */
  relativeRisk?: number;
}

/**
 * Complication node
 */
export interface ComplicationNode extends KGNodeBase {
  type: 'Complication';
  /** Severity of complication */
  severity: 'minor' | 'major' | 'life_threatening';
  /** Is it reversible? */
  reversible?: boolean;
  /** Time frame for development */
  timeFrame?: 'immediate' | 'early' | 'late' | 'chronic';
}

/**
 * Union type of all node types
 */
export type KGNode =
  | DiseaseNode
  | SymptomNode
  | MedicationNode
  | ExaminationNode
  | PathwayNode
  | GeneNode
  | OrganNode
  | BodySystemNode
  | RiskFactorNode
  | ComplicationNode;

// =============================================================================
// EDGE TYPES
// =============================================================================

/**
 * All possible relationship types in the knowledge graph
 */
export type KGEdgeType =
  // Disease relationships
  | 'CAUSES'               // Disease -> Symptom
  | 'MANIFESTS_AS'        // Disease -> Symptom (with probability)
  | 'DIAGNOSED_BY'        // Disease -> Examination
  | 'AFFECTS'             // Disease -> Organ/BodySystem
  | 'PROGRESSES_TO'       // Disease -> Disease (complications)
  | 'COMORBID_WITH'       // Disease -> Disease
  | 'HAS_RISK_FACTOR'     // Disease -> RiskFactor
  | 'HAS_COMPLICATION'    // Disease -> Complication
  // Treatment relationships
  | 'TREATS'              // Medication -> Disease
  | 'FIRST_LINE_FOR'      // Medication -> Disease (primary treatment)
  | 'SECOND_LINE_FOR'     // Medication -> Disease (alternative)
  | 'ADJUNCT_FOR'         // Medication -> Disease (supplementary)
  | 'PREVENTS'            // Medication -> Disease
  // Contraindication relationships
  | 'CONTRAINDICATED_IN'  // Medication -> Disease/Condition
  | 'CAUTION_IN'          // Medication -> Disease/Condition
  | 'INTERACTS_WITH'      // Medication -> Medication
  // Examination relationships
  | 'INDICATES'           // Examination result -> Disease
  | 'MONITORS'            // Examination -> Disease (for follow-up)
  | 'SCREENS_FOR'         // Examination -> Disease (screening)
  // Pathway relationships
  | 'INVOLVES_PATHWAY'    // Disease -> Pathway
  | 'TARGETS_PATHWAY'     // Medication -> Pathway
  | 'DISRUPTS_PATHWAY'    // Disease -> Pathway
  // Gene relationships
  | 'METABOLIZED_BY'      // Medication -> Gene (pharmacogenomics)
  | 'ASSOCIATED_GENE'     // Disease -> Gene
  | 'VARIANT_AFFECTS'     // Gene -> Medication (PGx)
  // Anatomical relationships
  | 'PART_OF'             // Organ -> BodySystem
  | 'LOCALIZED_TO'        // Disease/Symptom -> Organ
  // General
  | 'RELATED_TO';         // Generic relationship

/**
 * Interaction severity for drug interactions
 */
export type InteractionSeverity = 'mild' | 'moderate' | 'severe' | 'contraindicated';

/**
 * Evidence level for relationships
 */
export type EvidenceLevel =
  | 'systematic_review'    // Level I
  | 'randomized_trial'     // Level II
  | 'cohort_study'        // Level III
  | 'case_control'        // Level IV
  | 'case_series'         // Level V
  | 'expert_opinion'      // Level VI
  | 'guideline'           // Clinical guideline
  | 'unknown';

/**
 * Base interface for all edges
 */
export interface KGEdgeBase {
  /** Unique edge identifier */
  id: string;
  /** Source node ID */
  source: string;
  /** Target node ID */
  target: string;
  /** Relationship type */
  type: KGEdgeType;
  /** Relationship strength/weight (0-1) */
  weight?: number;
  /** Human-readable label */
  label?: string;
  /** Evidence level for this relationship */
  evidenceLevel?: EvidenceLevel;
  /** Citation/reference for this relationship */
  citation?: string;
  /** Additional notes */
  notes?: string;
  /** Data source */
  source_db?: string;
}

/**
 * Edge for symptom relationships
 */
export interface SymptomEdge extends KGEdgeBase {
  type: 'CAUSES' | 'MANIFESTS_AS';
  properties: {
    /** How common is this symptom in the disease */
    frequency?: 'always' | 'very_common' | 'common' | 'occasional' | 'rare';
    /** Percentage of patients with this symptom */
    percentage?: number;
    /** Is this a presenting symptom? */
    presenting?: boolean;
    /** Timing in disease course */
    timing?: 'early' | 'middle' | 'late' | 'variable';
  };
}

/**
 * Edge for treatment relationships
 */
export interface TreatmentEdge extends KGEdgeBase {
  type: 'TREATS' | 'FIRST_LINE_FOR' | 'SECOND_LINE_FOR' | 'ADJUNCT_FOR' | 'PREVENTS';
  properties: {
    /** Indication */
    indication?: string;
    /** Typical dosage */
    dosage?: string;
    /** Treatment duration */
    duration?: string;
    /** Efficacy measure */
    efficacy?: string;
    /** Number needed to treat */
    nnt?: number;
  };
}

/**
 * Edge for drug interactions
 */
export interface InteractionEdge extends KGEdgeBase {
  type: 'INTERACTS_WITH';
  properties: {
    /** Severity of interaction */
    severity: InteractionSeverity;
    /** Mechanism of interaction */
    mechanism?: string;
    /** Clinical effect */
    effect: string;
    /** Recommended action */
    recommendation: string;
    /** Is the interaction bidirectional? */
    bidirectional?: boolean;
  };
}

/**
 * Edge for contraindications
 */
export interface ContraindicationEdge extends KGEdgeBase {
  type: 'CONTRAINDICATED_IN' | 'CAUTION_IN';
  properties: {
    /** Reason for contraindication */
    reason: string;
    /** Is it absolute or relative? */
    absolute: boolean;
    /** Alternative if contraindicated */
    alternative?: string;
  };
}

/**
 * Edge for diagnostic relationships
 */
export interface DiagnosticEdge extends KGEdgeBase {
  type: 'INDICATES' | 'MONITORS' | 'SCREENS_FOR' | 'DIAGNOSED_BY';
  properties: {
    /** Sensitivity of the test */
    sensitivity?: number;
    /** Specificity of the test */
    specificity?: number;
    /** Positive predictive value */
    ppv?: number;
    /** Negative predictive value */
    npv?: number;
    /** Expected findings */
    expectedFindings?: string;
    /** Threshold values */
    threshold?: string;
  };
}

/**
 * Edge for disease progression
 */
export interface ProgressionEdge extends KGEdgeBase {
  type: 'PROGRESSES_TO' | 'HAS_COMPLICATION';
  properties: {
    /** Time to progression */
    timeframe?: string;
    /** Probability of progression */
    probability?: number;
    /** Risk factors that increase progression */
    riskFactors?: string[];
    /** Is it preventable? */
    preventable?: boolean;
  };
}

/**
 * Edge for comorbidity
 */
export interface ComorbidityEdge extends KGEdgeBase {
  type: 'COMORBID_WITH';
  properties: {
    /** Frequency of co-occurrence */
    frequency?: number;
    /** Shared pathophysiology */
    sharedMechanism?: string;
    /** Does one increase risk of other? */
    causal?: boolean;
  };
}

/**
 * Edge for pharmacogenomics
 */
export interface PharmacogenomicsEdge extends KGEdgeBase {
  type: 'METABOLIZED_BY' | 'VARIANT_AFFECTS';
  properties: {
    /** Gene variant */
    variant?: string;
    /** Phenotype */
    phenotype?: 'poor_metabolizer' | 'intermediate_metabolizer' | 'extensive_metabolizer' | 'ultra_rapid_metabolizer';
    /** Clinical implications */
    implications?: string;
    /** Dosage recommendation */
    dosageRecommendation?: string;
  };
}

/**
 * Generic edge for other relationships
 */
export interface GenericEdge extends KGEdgeBase {
  type: KGEdgeType;
  properties?: Record<string, unknown>;
}

/**
 * Union type of all edge types
 */
export type KGEdge =
  | SymptomEdge
  | TreatmentEdge
  | InteractionEdge
  | ContraindicationEdge
  | DiagnosticEdge
  | ProgressionEdge
  | ComorbidityEdge
  | PharmacogenomicsEdge
  | GenericEdge;

// =============================================================================
// GRAPH STRUCTURES
// =============================================================================

/**
 * The complete knowledge graph
 */
export interface KnowledgeGraph {
  /** All nodes in the graph */
  nodes: Map<string, KGNode>;
  /** All edges in the graph (keyed by edge ID) */
  edges: Map<string, KGEdge>;
  /** Adjacency list for efficient traversal (node ID -> outgoing edge IDs) */
  adjacencyList: Map<string, Set<string>>;
  /** Reverse adjacency list (node ID -> incoming edge IDs) */
  reverseAdjacencyList: Map<string, Set<string>>;
  /** Graph metadata */
  metadata: {
    version: string;
    createdAt: string;
    updatedAt: string;
    nodeCount: number;
    edgeCount: number;
    sources: string[];
  };
}

/**
 * Query result structure
 */
export interface QueryResult {
  nodes: KGNode[];
  edges: KGEdge[];
  paths?: GraphPath[];
  metadata?: {
    queryTime: number;
    resultCount: number;
  };
}

/**
 * Path between nodes
 */
export interface GraphPath {
  /** Ordered list of nodes in the path */
  nodes: KGNode[];
  /** Ordered list of edges in the path */
  edges: KGEdge[];
  /** Number of hops */
  length: number;
  /** Total weight of the path */
  totalWeight: number;
  /** Path description */
  description?: string;
}

/**
 * Subgraph (subset of the full graph)
 */
export interface Subgraph {
  nodes: KGNode[];
  edges: KGEdge[];
  centerNode?: KGNode;
  depth?: number;
}

// =============================================================================
// CYPHER EXPORT TYPES (for Neo4j compatibility)
// =============================================================================

/**
 * Cypher statement
 */
export interface CypherStatement {
  query: string;
  parameters?: Record<string, unknown>;
}

/**
 * Cypher export configuration
 */
export interface CypherExportConfig {
  /** Include indexes */
  includeIndexes?: boolean;
  /** Include constraints */
  includeConstraints?: boolean;
  /** Batch size for node creation */
  batchSize?: number;
  /** Database name (for Neo4j 4.0+) */
  database?: string;
}

/**
 * Full Cypher export result
 */
export interface CypherExport {
  /** Schema statements (indexes, constraints) */
  schema: CypherStatement[];
  /** Node creation statements */
  nodes: CypherStatement[];
  /** Edge creation statements */
  edges: CypherStatement[];
  /** Full script as string */
  script: string;
}

// =============================================================================
// HELPER TYPES
// =============================================================================

/**
 * Node creation input (without auto-generated fields)
 */
export type CreateNodeInput<T extends KGNode> = Omit<T, 'id'> & { id?: string };

/**
 * Edge creation input
 */
export type CreateEdgeInput<T extends KGEdge> = Omit<T, 'id'> & { id?: string };

/**
 * Search filter options
 */
export interface SearchFilters {
  nodeTypes?: KGNodeType[];
  edgeTypes?: KGEdgeType[];
  categories?: string[];
  ontologyCodes?: {
    type: 'doid' | 'icd10' | 'snomedCT' | 'atc' | 'loinc' | 'ciap2';
    code: string;
  }[];
  textSearch?: string;
  limit?: number;
  offset?: number;
}

/**
 * Graph statistics
 */
export interface GraphStats {
  totalNodes: number;
  totalEdges: number;
  nodesByType: Record<KGNodeType, number>;
  edgesByType: Record<KGEdgeType, number>;
  avgDegree: number;
  density: number;
  connectedComponents: number;
}
