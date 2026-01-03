/**
 * DARWIN-MFC LOINC TYPES
 * ======================
 *
 * Type definitions for LOINC (Logical Observation Identifiers Names and Codes)
 * integration including:
 * - Laboratory tests
 * - Clinical observations
 * - Document types
 * - Survey instruments
 * - Panels and groups
 */

import type {
  OntologyIdentifier,
  Concept,
  ConceptRelationship,
  SemanticType,
} from './ontology';

// =============================================================================
// LOINC CORE STRUCTURE
// =============================================================================

/**
 * LOINC code status
 */
export type LoincStatus =
  | 'ACTIVE'       // Active code
  | 'TRIAL'        // Trial/experimental
  | 'DISCOURAGED'  // Use discouraged, prefer replacement
  | 'DEPRECATED';  // Deprecated, should not be used

/**
 * LOINC class categories
 */
export type LoincClass =
  // Laboratory Classes
  | 'CHEM'         // Chemistry
  | 'HEM/BC'       // Hematology/Blood Cell Count
  | 'COAG'         // Coagulation
  | 'UA'           // Urinalysis
  | 'MICRO'        // Microbiology
  | 'SERO'         // Serology
  | 'DRUG/TOX'     // Drug/Toxicology
  | 'ALLERGY'      // Allergy
  | 'ABXBACT'      // Antibiotic susceptibility
  | 'BLDBK'        // Blood Bank
  | 'CELLMARK'     // Cell Markers
  | 'CYTO'         // Cytology
  | 'H&P.HX'       // History
  | 'H&P.PX'       // Physical Exam
  | 'MOLPATH'      // Molecular Pathology
  | 'PATH'         // Surgical Pathology
  | 'PANEL.CHEM'   // Chemistry Panels
  | 'PANEL.HEM'    // Hematology Panels
  | 'PANEL.UA'     // Urinalysis Panels

  // Clinical Classes
  | 'PULM'         // Pulmonary
  | 'CARD'         // Cardiology
  | 'OBGYN'        // OB/GYN
  | 'RAD'          // Radiology
  | 'VITALS'       // Vital Signs
  | 'EKG'          // EKG/ECG

  // Document/Survey Classes
  | 'DOC.ONTOLOGY' // Document Ontology
  | 'SURVEY'       // Survey Instruments
  | 'ATTACH'       // Attachments

  // Other
  | 'MISC'         // Miscellaneous
  | 'CLIN';        // Clinical

/**
 * LOINC property types (type of measurement)
 */
export type LoincProperty =
  // Concentration
  | 'MCnc'     // Mass Concentration (e.g., mg/dL)
  | 'SCnc'     // Substance Concentration (e.g., mmol/L)
  | 'ACnc'     // Arbitrary Concentration
  | 'CCnc'     // Catalytic Concentration

  // Count/Number
  | 'NCnc'     // Number Concentration (e.g., cells/µL)
  | 'Num'      // Number
  | 'NFr'      // Number Fraction (ratio)

  // Mass/Substance
  | 'Mass'     // Mass (e.g., g)
  | 'SRat'     // Substance Rate (e.g., mmol/min)
  | 'MRat'     // Mass Rate (e.g., mg/hr)
  | 'CRat'     // Catalytic Rate

  // Rate
  | 'NRat'     // Number Rate (e.g., beats/min)
  | 'Ratio'    // Ratio (e.g., kg/m2)

  // Other
  | 'Prid'     // Presence or Identity (qualitative)
  | 'Type'     // Type (e.g., blood type)
  | 'Titr'     // Titer
  | 'Time'     // Time (e.g., clotting time)
  | 'Temp'     // Temperature
  | 'Len'      // Length
  | 'Vel'      // Velocity
  | 'Pres'     // Pressure
  | 'Vol'      // Volume
  | 'ArVRat'   // Volume Rate (e.g., mL/min)
  | 'Morph'    // Morphology
  | 'Nar'      // Narrative
  | 'ID'       // Identifier
  | 'Imp'      // Impression
  | 'Find';    // Finding

/**
 * LOINC time aspect
 */
export type LoincTimeAspect =
  | 'Pt'       // Point in time
  | '1H'       // 1 hour
  | '2H'       // 2 hours
  | '24H'      // 24 hours
  | '12H'      // 12 hours
  | '8H'       // 8 hours
  | '72H'      // 72 hours
  | 'XXX'      // Unspecified
  | 'Tot'      // Duration of procedure
  | 'Random'   // Random
  | 'Pre'      // Pre-procedure
  | 'Post'     // Post-procedure
  | 'Peak'     // Peak
  | 'Trough';  // Trough

/**
 * LOINC system (specimen type)
 */
export type LoincSystem =
  // Blood
  | 'Bld'          // Blood
  | 'Ser/Plas'     // Serum or Plasma
  | 'Ser'          // Serum
  | 'Plas'         // Plasma
  | 'BldC'         // Blood Capillary
  | 'BldA'         // Blood Arterial
  | 'BldV'         // Blood Venous
  | 'RBC'          // Red Blood Cells
  | 'WBC'          // White Blood Cells
  | 'PPP'          // Platelet Poor Plasma
  | 'PRP'          // Platelet Rich Plasma

  // Urine
  | 'Urine'        // Urine
  | 'Urine sed'    // Urine Sediment
  | 'UrineC'       // Urine Clean Catch

  // CSF
  | 'CSF'          // Cerebrospinal Fluid

  // Body Fluids
  | 'Body fld'     // Body Fluid
  | 'Pericard fld' // Pericardial Fluid
  | 'Periton fld'  // Peritoneal Fluid
  | 'Plr fld'      // Pleural Fluid
  | 'Synv fld'     // Synovial Fluid
  | 'Amnio fld'    // Amniotic Fluid

  // Respiratory
  | 'Sputum'       // Sputum
  | 'Throat'       // Throat
  | 'Nose'         // Nose
  | 'NP'           // Nasopharyngeal

  // GI
  | 'Stool'        // Stool

  // Other
  | 'Tiss'         // Tissue
  | 'Hair'         // Hair
  | 'Sweat'        // Sweat
  | 'Saliva'       // Saliva
  | 'XXX'          // Unspecified
  | '^Patient';    // Patient (for vitals, etc.)

/**
 * LOINC scale type
 */
export type LoincScale =
  | 'Qn'       // Quantitative
  | 'Ord'      // Ordinal
  | 'OrdQn'    // Ordinal or Quantitative
  | 'Nom'      // Nominal
  | 'Nar'      // Narrative
  | 'Multi'    // Multi-valued
  | 'Doc'      // Document
  | 'Set'      // Set
  | 'Ratio';   // Ratio

/**
 * Method type (optional 6th axis)
 */
export type LoincMethodType = string; // Free text, many possibilities

// =============================================================================
// LOINC CONCEPT
// =============================================================================

/**
 * Full LOINC concept representation
 */
export interface LoincConcept {
  /** LOINC code (e.g., "2345-7") */
  loincNum: string;

  /** Component - what is being measured */
  component: string;

  /** Property - type of measurement */
  property: LoincProperty;

  /** Time aspect */
  timeAspect: LoincTimeAspect;

  /** System - specimen type */
  system: LoincSystem;

  /** Scale type */
  scale: LoincScale;

  /** Method (optional) */
  method?: string;

  /** LOINC class */
  class: LoincClass;

  /** Long common name */
  longCommonName: string;

  /** Short name */
  shortName: string;

  /** Display name */
  displayName?: string;

  /** Consumer name (patient-friendly) */
  consumerName?: string;

  /** Status */
  status: LoincStatus;

  /** Version first released */
  versionFirstReleased?: string;

  /** Version last changed */
  versionLastChanged?: string;

  /** Related names and synonyms */
  relatedNames?: string[];

  /** External copyright (if any) */
  externalCopyright?: string;

  /** Order/Observation flag */
  orderObs?: 'Order' | 'Observation' | 'Both';

  /** Units of measure (example) */
  exampleUnits?: string;

  /** UCUM units */
  exampleUcumUnits?: string;

  /** Rank for search ordering */
  rank?: number;

  /** Part mappings */
  parts?: LoincPart[];

  /** Panel/member relationships */
  panelMembers?: LoincPanelMember[];

  /** Translations */
  translations?: Record<string, LoincTranslation>;

  /** Answer list (for ordinal/nominal) */
  answerList?: LoincAnswerList;
}

/**
 * Minimal LOINC concept for search results
 */
export interface LoincConceptMini {
  loincNum: string;
  longCommonName: string;
  shortName: string;
  component: string;
  system: string;
  class: string;
  status: LoincStatus;
  rank?: number;
}

// =============================================================================
// LOINC PARTS (Building Blocks)
// =============================================================================

/**
 * LOINC part types
 */
export type LoincPartType =
  | 'COMPONENT'
  | 'PROPERTY'
  | 'TIME'
  | 'SYSTEM'
  | 'SCALE'
  | 'METHOD'
  | 'CLASS'
  | 'SUPER_SYSTEM'
  | 'DOCUMENT_KIND'
  | 'DOCUMENT_SUBJECT_MATTER'
  | 'DOCUMENT_ROLE'
  | 'DOCUMENT_SETTING'
  | 'DOCUMENT_TYPE_OF_SERVICE'
  | 'RAD_ANATOMIC_LOCATION'
  | 'RAD_MODALITY'
  | 'RAD_TIMING';

/**
 * LOINC part (reusable concept fragment)
 */
export interface LoincPart {
  partNumber: string;
  partTypeName: LoincPartType;
  partName: string;
  partDisplayName?: string;
  status: LoincStatus;
  snomedConceptId?: string;
}

// =============================================================================
// LOINC PANELS
// =============================================================================

/**
 * Panel member relationship
 */
export interface LoincPanelMember {
  parentLoincNum: string;
  loincNum: string;
  longCommonName: string;
  required?: boolean;
  cardinality?: string;
  displayOrder?: number;
}

/**
 * LOINC panel (group of related tests)
 */
export interface LoincPanel {
  loincNum: string;
  longCommonName: string;
  shortName: string;
  members: LoincPanelMember[];
  panelType?: 'ORDER' | 'OBSERVATION' | 'BOTH';
}

// =============================================================================
// LOINC ANSWER LISTS
// =============================================================================

/**
 * Answer for ordinal/nominal LOINC codes
 */
export interface LoincAnswer {
  answerCode: string;
  displayText: string;
  score?: number;
  sequenceNumber: number;
}

/**
 * Answer list for a LOINC code
 */
export interface LoincAnswerList {
  answerListId: string;
  answerListName: string;
  answerListType: 'NORMATIVE' | 'PREFERRED' | 'EXAMPLE';
  answers: LoincAnswer[];
}

// =============================================================================
// LOINC TRANSLATIONS
// =============================================================================

/**
 * LOINC translation
 */
export interface LoincTranslation {
  languageCode: string;
  longCommonName: string;
  shortName?: string;
  component?: string;
  system?: string;
  consumerName?: string;
}

// =============================================================================
// LOINC GROUPS (Semantic Groups)
// =============================================================================

/**
 * LOINC group types
 */
export type LoincGroupType =
  | 'PARENT'     // High-level group
  | 'COMPONENT'  // Component-based group
  | 'DOCUMENT'   // Document type group
  | 'RADLEX'     // RadLex mapping group
  | 'SPECIES';   // Species-specific group

/**
 * LOINC group
 */
export interface LoincGroup {
  groupId: string;
  parentGroupId?: string;
  type: LoincGroupType;
  name: string;
  description?: string;
  loincCodes: string[];
}

// =============================================================================
// LOINC HIERARCHY
// =============================================================================

/**
 * LOINC hierarchy node
 */
export interface LoincHierarchyNode {
  code: string;
  name: string;
  level: number;
  parent?: string;
  children: string[];
  isLeaf: boolean;
  conceptCount: number;
}

/**
 * Multi-axial hierarchy
 */
export interface LoincMultiAxialHierarchy {
  components: LoincHierarchyNode[];
  systems: LoincHierarchyNode[];
  classes: LoincHierarchyNode[];
  methods: LoincHierarchyNode[];
}

// =============================================================================
// LOINC SEARCH
// =============================================================================

/**
 * LOINC search parameters
 */
export interface LoincSearchParams {
  /** Search query */
  query: string;

  /** Filter by class */
  class?: LoincClass | LoincClass[];

  /** Filter by system/specimen */
  system?: LoincSystem | LoincSystem[];

  /** Filter by property */
  property?: LoincProperty | LoincProperty[];

  /** Filter by scale */
  scale?: LoincScale | LoincScale[];

  /** Filter by status */
  status?: LoincStatus[];

  /** Include panels */
  includePanels?: boolean;

  /** Order/Observation filter */
  orderObs?: 'Order' | 'Observation' | 'Both';

  /** Language for results */
  language?: string;

  /** Maximum results */
  limit?: number;

  /** Pagination offset */
  offset?: number;

  /** Include deprecated codes */
  includeDeprecated?: boolean;
}

/**
 * LOINC search result
 */
export interface LoincSearchResult {
  concept: LoincConceptMini;
  score: number;
  matchedOn: 'name' | 'code' | 'synonym' | 'component';
  highlight?: string;
}

/**
 * LOINC search response
 */
export interface LoincSearchResponse {
  results: LoincSearchResult[];
  total: number;
  offset: number;
  limit: number;
  query: string;
  executionTimeMs: number;
  facets?: LoincSearchFacets;
}

/**
 * Search facets for filtering
 */
export interface LoincSearchFacets {
  classes: Array<{ value: LoincClass; count: number }>;
  systems: Array<{ value: string; count: number }>;
  scales: Array<{ value: LoincScale; count: number }>;
  status: Array<{ value: LoincStatus; count: number }>;
}

// =============================================================================
// COMMON LOINC CODES (Pre-defined)
// =============================================================================

/**
 * Common chemistry panel codes
 */
export const LOINC_CHEMISTRY = {
  // Glucose
  GLUCOSE_FASTING: '1558-6',
  GLUCOSE_RANDOM: '2345-7',
  GLUCOSE_2H_POST: '1521-4',
  HBA1C: '4548-4',
  HBA1C_IFCC: '59261-8',

  // Lipids
  CHOLESTEROL_TOTAL: '2093-3',
  HDL: '2085-9',
  LDL_CALC: '13457-7',
  LDL_DIRECT: '18262-6',
  TRIGLYCERIDES: '2571-8',
  VLDL: '13458-5',

  // Renal
  CREATININE_SERUM: '2160-0',
  BUN: '3094-0',
  GFR_MDRD: '33914-3',
  GFR_CKD_EPI: '62238-1',
  URIC_ACID: '3084-1',
  CYSTATIN_C: '33863-2',

  // Electrolytes
  SODIUM: '2951-2',
  POTASSIUM: '2823-3',
  CHLORIDE: '2075-0',
  CO2_TOTAL: '2028-9',
  MAGNESIUM: '2601-3',
  CALCIUM_TOTAL: '17861-6',
  CALCIUM_IONIZED: '1994-3',
  PHOSPHORUS: '2777-1',

  // Liver
  AST: '1920-8',
  ALT: '1742-6',
  ALP: '6768-6',
  GGT: '2324-2',
  BILIRUBIN_TOTAL: '1975-2',
  BILIRUBIN_DIRECT: '1968-7',
  ALBUMIN: '1751-7',
  PROTEIN_TOTAL: '2885-2',

  // Cardiac
  TROPONIN_T: '6598-7',
  TROPONIN_I: '10839-9',
  TROPONIN_T_HS: '67151-1',
  BNP: '30934-4',
  NT_PROBNP: '33762-6',
  CK_MB: '13969-1',
  CK_TOTAL: '2157-6',

  // Thyroid
  TSH: '3016-3',
  T4_FREE: '3024-7',
  T3_FREE: '3051-0',
  T4_TOTAL: '3026-2',
  T3_TOTAL: '3053-6',

  // Inflammatory
  CRP: '1988-5',
  CRP_HS: '30522-7',
  ESR: '4537-7',
  PROCALCITONIN: '33959-8',
  FERRITIN: '2276-4',

  // Iron
  IRON: '2498-4',
  TIBC: '2500-7',
  TRANSFERRIN: '3034-6',
  TRANSFERRIN_SAT: '2502-3',

  // Vitamins
  VITAMIN_D_25OH: '1989-3',
  VITAMIN_B12: '2132-9',
  FOLATE: '2284-8',
} as const;

/**
 * Common hematology codes
 */
export const LOINC_HEMATOLOGY = {
  // CBC
  WBC: '6690-2',
  RBC: '789-8',
  HEMOGLOBIN: '718-7',
  HEMATOCRIT: '4544-3',
  MCV: '787-2',
  MCH: '785-6',
  MCHC: '786-4',
  RDW: '788-0',
  PLATELETS: '777-3',
  MPV: '32623-1',

  // Differential
  NEUTROPHILS_PCT: '770-8',
  NEUTROPHILS_ABS: '751-8',
  LYMPHOCYTES_PCT: '736-9',
  LYMPHOCYTES_ABS: '731-0',
  MONOCYTES_PCT: '5905-5',
  MONOCYTES_ABS: '742-7',
  EOSINOPHILS_PCT: '713-8',
  EOSINOPHILS_ABS: '711-2',
  BASOPHILS_PCT: '706-2',
  BASOPHILS_ABS: '704-7',

  // Coagulation
  PT: '5902-2',
  INR: '6301-6',
  PTT: '3173-2',
  FIBRINOGEN: '3255-7',
  D_DIMER: '48065-7',

  // Reticulocytes
  RETICULOCYTES_PCT: '4679-7',
  RETICULOCYTES_ABS: '14196-0',
} as const;

/**
 * Common urinalysis codes
 */
export const LOINC_URINALYSIS = {
  COLOR: '5778-6',
  CLARITY: '5767-9',
  SPECIFIC_GRAVITY: '5811-5',
  PH: '5803-2',
  PROTEIN: '5804-0',
  GLUCOSE: '5792-7',
  KETONES: '5797-6',
  BLOOD: '5794-3',
  BILIRUBIN: '5770-3',
  UROBILINOGEN: '5818-0',
  NITRITE: '5802-4',
  LEUKOCYTE_ESTERASE: '5799-2',
  WBC_MICRO: '5821-4',
  RBC_MICRO: '5808-7',
  BACTERIA: '5769-5',
  CASTS: '5807-9',
  CRYSTALS: '5782-8',
  EPITHELIAL_CELLS: '5787-7',
  ALBUMIN_CREAT_RATIO: '9318-7',
  PROTEIN_CREAT_RATIO: '2890-2',
} as const;

/**
 * Common microbiology codes
 */
export const LOINC_MICROBIOLOGY = {
  CULTURE_BLOOD: '600-7',
  CULTURE_URINE: '630-4',
  CULTURE_WOUND: '6463-4',
  CULTURE_STOOL: '625-4',
  CULTURE_THROAT: '626-2',
  CULTURE_CSF: '606-4',
  CULTURE_SPUTUM: '624-7',
  GRAM_STAIN: '664-3',
  AFB_SMEAR: '11545-1',
  AFB_CULTURE: '543-9',
} as const;

/**
 * Common vital signs codes
 */
export const LOINC_VITALS = {
  HEART_RATE: '8867-4',
  RESPIRATORY_RATE: '9279-1',
  BLOOD_PRESSURE_SYSTOLIC: '8480-6',
  BLOOD_PRESSURE_DIASTOLIC: '8462-4',
  BLOOD_PRESSURE_MEAN: '8478-0',
  TEMPERATURE_BODY: '8310-5',
  OXYGEN_SATURATION: '2708-6',
  OXYGEN_SATURATION_PULSE: '59408-5',
  WEIGHT: '29463-7',
  HEIGHT: '8302-2',
  BMI: '39156-5',
  HEAD_CIRCUMFERENCE: '9843-4',
  WAIST_CIRCUMFERENCE: '8280-0',
  PAIN_SCORE: '72514-3',
} as const;

/**
 * Common panels
 */
export const LOINC_PANELS = {
  BMP: '24320-4',        // Basic Metabolic Panel
  CMP: '24323-8',        // Comprehensive Metabolic Panel
  CBC_W_DIFF: '57021-8', // CBC with Differential
  CBC_WO_DIFF: '58410-2', // CBC without Differential
  LIPID_PANEL: '24331-1', // Lipid Panel
  HEPATIC_PANEL: '24325-3', // Hepatic Function Panel
  THYROID_PANEL: '24348-5', // Thyroid Panel
  URINALYSIS_COMPLETE: '24356-8', // Complete Urinalysis
  COAGULATION_PANEL: '24323-8', // Coagulation Panel
} as const;

// =============================================================================
// CONVERSION UTILITIES
// =============================================================================

/**
 * Convert LOINC concept to unified Concept type
 */
export function toUnifiedConcept(loinc: LoincConcept): Concept {
  const identifier: OntologyIdentifier = {
    system: 'loinc',
    code: loinc.loincNum,
    display: loinc.longCommonName,
  };

  const synonyms = [
    loinc.shortName,
    loinc.consumerName,
    ...(loinc.relatedNames || []),
  ].filter((s): s is string => !!s && s !== loinc.longCommonName);

  const semanticType = mapLoincClassToSemanticType(loinc.class);

  const relationships: ConceptRelationship[] = [];

  // Add panel relationships
  if (loinc.panelMembers) {
    for (const member of loinc.panelMembers) {
      relationships.push({
        type: 'part-of',
        targetId: member.loincNum,
        targetDisplay: member.longCommonName,
        targetSystem: 'loinc',
        source: 'asserted',
      });
    }
  }

  return {
    id: `loinc:${loinc.loincNum}`,
    identifier,
    equivalentIdentifiers: [],
    preferredTerm: loinc.longCommonName,
    labels: {
      en: loinc.longCommonName,
      'en-short': loinc.shortName,
      ...(loinc.consumerName ? { 'en-consumer': loinc.consumerName } : {}),
    },
    synonyms,
    definition: undefined,
    relationships,
    semanticType,
    status: loinc.status === 'ACTIVE' ? 'active' :
      loinc.status === 'DEPRECATED' ? 'deprecated' : 'inactive',
    lastModified: loinc.versionLastChanged,
  };
}

/**
 * Map LOINC class to semantic type
 */
function mapLoincClassToSemanticType(loincClass: LoincClass): SemanticType {
  const classMap: Record<string, SemanticType> = {
    'CHEM': 'observable',
    'HEM/BC': 'observable',
    'COAG': 'observable',
    'UA': 'observable',
    'MICRO': 'observable',
    'SERO': 'observable',
    'DRUG/TOX': 'observable',
    'ALLERGY': 'observable',
    'ABXBACT': 'observable',
    'BLDBK': 'observable',
    'CELLMARK': 'observable',
    'CYTO': 'observable',
    'H&P.HX': 'finding',
    'H&P.PX': 'finding',
    'MOLPATH': 'observable',
    'PATH': 'observable',
    'PANEL.CHEM': 'observable',
    'PANEL.HEM': 'observable',
    'PANEL.UA': 'observable',
    'PULM': 'observable',
    'CARD': 'observable',
    'OBGYN': 'observable',
    'RAD': 'observable',
    'VITALS': 'observable',
    'EKG': 'observable',
    'DOC.ONTOLOGY': 'record',
    'SURVEY': 'observable',
    'ATTACH': 'record',
    'MISC': 'observable',
    'CLIN': 'finding',
  };

  return classMap[loincClass] || 'observable';
}

/**
 * Format LOINC code with check digit
 */
export function formatLoincCode(code: string): string {
  // LOINC codes are already formatted with check digit (e.g., "2345-7")
  return code;
}

/**
 * Validate LOINC code format
 */
export function isValidLoincFormat(code: string): boolean {
  // LOINC format: 1-7 digits, hyphen, check digit
  return /^\d{1,7}-\d$/.test(code);
}

/**
 * Calculate LOINC check digit (Mod 10)
 */
export function calculateLoincCheckDigit(codeWithoutCheck: string): number {
  const digits = codeWithoutCheck.split('').map(Number);
  let sum = 0;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];
    if ((digits.length - i) % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  return (10 - (sum % 10)) % 10;
}

// =============================================================================
// EXPORTS
// =============================================================================

export default {
  LOINC_CHEMISTRY,
  LOINC_HEMATOLOGY,
  LOINC_URINALYSIS,
  LOINC_MICROBIOLOGY,
  LOINC_VITALS,
  LOINC_PANELS,
  toUnifiedConcept,
  formatLoincCode,
  isValidLoincFormat,
  calculateLoincCheckDigit,
};
