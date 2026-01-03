/**
 * DARWIN-MFC CLINICAL CALCULATOR TYPES
 * =====================================
 *
 * Type definitions for the clinical calculator system.
 * Supports various input types, validations, and score interpretations.
 */

// =============================================================================
// CALCULATOR CATEGORIES
// =============================================================================

export type CalculatorCategory =
  | 'critical-care'
  | 'cardiology'
  | 'pulmonology'
  | 'hepatology'
  | 'nephrology'
  | 'neurology'
  | 'psychiatry'
  | 'infectious-disease'
  | 'hematology'
  | 'emergency'
  | 'obstetrics'
  | 'pediatrics'
  | 'orthopedics'
  | 'anesthesia'
  | 'general';

export const categoryLabels: Record<CalculatorCategory, string> = {
  'critical-care': 'Critical Care',
  cardiology: 'Cardiology',
  pulmonology: 'Pulmonology',
  hepatology: 'Hepatology',
  nephrology: 'Nephrology',
  neurology: 'Neurology',
  psychiatry: 'Psychiatry',
  'infectious-disease': 'Infectious Disease',
  hematology: 'Hematology',
  emergency: 'Emergency Medicine',
  obstetrics: 'Obstetrics',
  pediatrics: 'Pediatrics',
  orthopedics: 'Orthopedics',
  anesthesia: 'Anesthesia',
  general: 'General',
};

export const categoryIcons: Record<CalculatorCategory, string> = {
  'critical-care': '🏥',
  cardiology: '❤️',
  pulmonology: '🫁',
  hepatology: '🫀',
  nephrology: '🫘',
  neurology: '🧠',
  psychiatry: '🧠',
  'infectious-disease': '🦠',
  hematology: '🩸',
  emergency: '🚑',
  obstetrics: '🤰',
  pediatrics: '👶',
  orthopedics: '🦴',
  anesthesia: '💉',
  general: '📊',
};

// =============================================================================
// INPUT TYPES
// =============================================================================

export type InputType =
  | 'number'
  | 'integer'
  | 'select'
  | 'boolean'
  | 'radio'
  | 'range'
  | 'age'
  | 'weight'
  | 'height'
  | 'bmi'
  | 'blood-pressure'
  | 'temperature'
  | 'heart-rate'
  | 'respiratory-rate'
  | 'oxygen-saturation'
  | 'gcs'
  | 'date';

export interface SelectOption {
  value: number;
  label: string;
  description?: string;
}

export interface InputValidation {
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  pattern?: string;
  customValidator?: (value: number) => boolean;
  errorMessage?: string;
}

export interface CalculatorInput {
  /** Unique identifier for this input */
  id: string;

  /** Display label */
  label: string;

  /** Localization key for label */
  labelKey?: string;

  /** Input type */
  type: InputType;

  /** Options for select/radio inputs */
  options?: SelectOption[];

  /** Default value */
  defaultValue?: number;

  /** Unit of measurement */
  unit?: string;

  /** Help text / description */
  description?: string;

  /** Localization key for description */
  descriptionKey?: string;

  /** Validation rules */
  validation?: InputValidation;

  /** Whether this input is required */
  required: boolean;

  /** Group this input belongs to (for multi-section forms) */
  group?: string;

  /** Conditional display based on other inputs */
  showWhen?: {
    inputId: string;
    operator: '==' | '!=' | '>' | '<' | '>=' | '<=';
    value: number;
  };

  /** Weight/multiplier for scoring (if applicable) */
  weight?: number;
}

// =============================================================================
// RISK LEVELS
// =============================================================================

export type RiskLevel =
  | 'very-low'
  | 'low'
  | 'low-moderate'
  | 'moderate'
  | 'moderate-high'
  | 'high'
  | 'very-high'
  | 'critical';

export const riskLevelConfig: Record<RiskLevel, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  'very-low': {
    label: 'Very Low',
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
  },
  low: {
    label: 'Low',
    color: 'text-green-700 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/50',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  'low-moderate': {
    label: 'Low-Moderate',
    color: 'text-lime-700 dark:text-lime-400',
    bgColor: 'bg-lime-50 dark:bg-lime-950/50',
    borderColor: 'border-lime-200 dark:border-lime-800',
  },
  moderate: {
    label: 'Moderate',
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/50',
    borderColor: 'border-amber-200 dark:border-amber-800',
  },
  'moderate-high': {
    label: 'Moderate-High',
    color: 'text-orange-700 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/50',
    borderColor: 'border-orange-200 dark:border-orange-800',
  },
  high: {
    label: 'High',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/50',
    borderColor: 'border-red-200 dark:border-red-800',
  },
  'very-high': {
    label: 'Very High',
    color: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-100 dark:bg-red-900/50',
    borderColor: 'border-red-300 dark:border-red-700',
  },
  critical: {
    label: 'Critical',
    color: 'text-red-900 dark:text-red-200',
    bgColor: 'bg-red-200 dark:bg-red-800/50',
    borderColor: 'border-red-400 dark:border-red-600',
  },
};

// =============================================================================
// SCORE INTERPRETATION
// =============================================================================

export interface ScoreInterpretation {
  /** Calculated score */
  score: number;

  /** Score as formatted string (e.g., "7.5%") */
  scoreDisplay?: string;

  /** Risk category name */
  category: string;

  /** Risk level for styling */
  risk: RiskLevel;

  /** Mortality rate if applicable */
  mortality?: string;

  /** Morbidity rate if applicable */
  morbidity?: string;

  /** Clinical recommendation */
  recommendation: string;

  /** Immediate action required */
  action?: string;

  /** Additional context or notes */
  notes?: string[];

  /** Score range for this interpretation (min-max) */
  range?: {
    min: number;
    max: number;
  };
}

export interface InterpretationRange {
  min: number;
  max: number;
  interpretation: Omit<ScoreInterpretation, 'score' | 'scoreDisplay'>;
}

// =============================================================================
// CITATIONS
// =============================================================================

export interface CalculatorCitation {
  /** Authors (e.g., "Singer M, Deutschman CS, et al.") */
  authors: string;

  /** Article title */
  title: string;

  /** Journal name */
  journal: string;

  /** Publication year */
  year: number;

  /** Volume and pages */
  volume?: string;

  /** DOI */
  doi?: string;

  /** PubMed ID */
  pmid?: string;

  /** URL */
  url?: string;
}

// =============================================================================
// MAIN CALCULATOR INTERFACE
// =============================================================================

export interface ClinicalCalculator {
  /** Unique calculator ID (kebab-case) */
  id: string;

  /** Full name */
  name: string;

  /** Abbreviation (e.g., "qSOFA", "HEART") */
  abbreviation: string;

  /** Category */
  category: CalculatorCategory;

  /** Brief description */
  description: string;

  /** Detailed explanation of what the calculator does */
  purpose?: string;

  /** When to use this calculator */
  indications?: string[];

  /** When NOT to use this calculator */
  contraindications?: string[];

  /** Calculator inputs */
  inputs: CalculatorInput[];

  /** Calculate the score from input values */
  calculate: (inputs: Record<string, number>) => number;

  /** Interpret the calculated score */
  interpret: (score: number, inputs?: Record<string, number>) => ScoreInterpretation;

  /** All interpretation ranges (for display) */
  interpretationRanges?: InterpretationRange[];

  /** Primary citation(s) */
  citations: CalculatorCitation[];

  /** Validation study reference */
  validationStudy?: string;

  /** Important notes or caveats */
  notes?: string[];

  /** Related calculators */
  relatedCalculators?: string[];

  /** SNOMED-CT concept IDs for semantic linking */
  snomedConcepts?: string[];

  /** Version of the calculator */
  version?: string;

  /** Last updated date */
  lastUpdated?: string;
}

// =============================================================================
// CALCULATOR RESULT
// =============================================================================

export interface CalculatorResult {
  /** Calculator ID */
  calculatorId: string;

  /** Input values used */
  inputs: Record<string, number>;

  /** Calculated score */
  score: number;

  /** Score interpretation */
  interpretation: ScoreInterpretation;

  /** Timestamp */
  timestamp: Date;

  /** Any warnings or notes */
  warnings?: string[];
}

// =============================================================================
// CALCULATOR HISTORY
// =============================================================================

export interface CalculatorHistoryEntry extends CalculatorResult {
  /** Unique entry ID */
  id: string;

  /** Optional patient identifier (local only) */
  patientId?: string;

  /** Optional notes */
  notes?: string;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type CalculatorInputValues = Record<string, number>;

export type CalculatorValidationErrors = Record<string, string>;

export interface CalculatorState {
  values: CalculatorInputValues;
  errors: CalculatorValidationErrors;
  isValid: boolean;
  isDirty: boolean;
}

// =============================================================================
// CALCULATOR METADATA (for listings)
// =============================================================================

export interface CalculatorMetadata {
  id: string;
  name: string;
  abbreviation: string;
  category: CalculatorCategory;
  description: string;
  inputCount: number;
  hasValidationStudy: boolean;
}

/**
 * Extract metadata from a calculator definition
 */
export function extractMetadata(calculator: ClinicalCalculator): CalculatorMetadata {
  return {
    id: calculator.id,
    name: calculator.name,
    abbreviation: calculator.abbreviation,
    category: calculator.category,
    description: calculator.description,
    inputCount: calculator.inputs.length,
    hasValidationStudy: !!calculator.validationStudy,
  };
}
