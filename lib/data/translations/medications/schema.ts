/**
 * MEDICATION TRANSLATION SCHEMA - DARWIN-MFC
 * ==========================================
 *
 * TypeScript interfaces for medication translations.
 * These schemas define the structure of translation overlay files
 * that are merged with the original Portuguese medication data.
 *
 * IMPORTANT: Drug names (nomeGenerico) should use INN
 * (International Nonproprietary Names) for consistency.
 *
 * Supported locales: en, es, fr, ru, ar, zh, el, hi
 * (pt is the source language, not translated)
 */

import { ClasseTerapeutica, GravidadeInteracao } from '@/lib/types/medicamento';

// =============================================================================
// SHARED TYPES (re-export from disease schema)
// =============================================================================

export type { SupportedLocale, TranslationMeta } from '../diseases/schema';
export { SUPPORTED_LOCALES, SCHEMA_VERSION } from '../diseases/schema';

import { SupportedLocale } from '../diseases/schema';

// =============================================================================
// POSOLOGY TRANSLATION
// =============================================================================

export interface PosologiaTranslation {
  indicacao: string;
  adultos: {
    dose: string;
    frequencia: string;
    doseMaxima?: string;
    observacoes?: string;
  };
  pediatrico?: {
    dose: string;
    frequencia: string;
    idadeMinima?: string;
    doseMaxima?: string;
    observacoes?: string;
  };
  idosos?: {
    dose: string;
    observacoes?: string;
  };
}

// =============================================================================
// RENAL DOSE ADJUSTMENT TRANSLATION
// =============================================================================

export interface AjusteDoseRenalTranslation {
  tfg: string; // Keep as-is (numeric range)
  ajuste: string;
  observacao?: string;
}

// =============================================================================
// DRUG INTERACTION TRANSLATION
// =============================================================================

export interface InteracaoTranslation {
  medicamento: string; // INN name (may be translated or kept)
  gravidade: GravidadeInteracao; // Enum - not translated
  efeito: string;
  mecanismo?: string;
  conduta: string;
}

// =============================================================================
// PRESENTATION TRANSLATION
// =============================================================================

export interface ApresentacaoTranslation {
  forma: string; // Pharmaceutical form name
  concentracao: string; // Keep as-is (numeric)
  quantidade?: string;
  disponivelSUS: boolean; // Keep as-is
}

// =============================================================================
// ADVERSE EFFECTS TRANSLATION
// =============================================================================

export interface EfeitosAdversosTranslation {
  comuns: string[];
  graves?: string[];
}

// =============================================================================
// BREASTFEEDING TRANSLATION
// =============================================================================

export interface AmamentacaoTranslation {
  compativel: boolean; // Keep as-is
  observacao: string;
}

// =============================================================================
// SPECIAL CONSIDERATIONS TRANSLATION
// =============================================================================

export interface ConsideracoesEspeciaisTranslation {
  idosos?: string;
  hepatopatas?: string;
  pediatrico?: string;
}

// =============================================================================
// MAIN MEDICATION TRANSLATION INTERFACE
// =============================================================================

export interface MedicationTranslation {
  /** Medication ID (matches the original Medicamento.id) */
  id: string;

  /**
   * Generic name - use INN (International Nonproprietary Name)
   * Note: For most medications, INN is universal and may not need translation.
   * However, some languages have official translations of INN names.
   */
  nomeGenerico: string;

  /** Therapeutic class (not translated, enum value) */
  classeTerapeutica: ClasseTerapeutica;

  /** Translated presentations */
  apresentacoes: ApresentacaoTranslation[];

  /** Translated approved indications */
  indicacoes: string[];

  /** Translated mechanism of action */
  mecanismoAcao: string;

  /** Translated dosage instructions per indication */
  posologias: PosologiaTranslation[];

  /** Translated absolute contraindications */
  contraindicacoes: string[];

  /** Translated precautions and warnings */
  precaucoes?: string[];

  /** Translated adverse effects */
  efeitosAdversos: EfeitosAdversosTranslation;

  /** Translated drug interactions */
  interacoes: InteracaoTranslation[];

  /** Translated renal dose adjustments */
  ajusteDoseRenal?: AjusteDoseRenalTranslation[];

  /** Breastfeeding safety (translated observation) */
  amamentacao: AmamentacaoTranslation;

  /** Translated special considerations */
  consideracoesEspeciais?: ConsideracoesEspeciaisTranslation;

  /** Translated monitoring requirements */
  monitorizacao?: string[];

  /** Translated patient counseling points */
  orientacoesPaciente?: string[];

  /** Translated tags for search */
  tags?: string[];

  /** Translation metadata */
  _meta: MedicationTranslationMeta;
}

// =============================================================================
// MEDICATION-SPECIFIC METADATA
// =============================================================================

export interface MedicationTranslationMeta {
  /** ISO timestamp when translation was generated */
  translatedAt: string;

  /** AI model used for translation */
  model: string;

  /** Schema version for migration tracking */
  schemaVersion: string;

  /** Approximate word count of translated content */
  wordCount: number;

  /** Source language (always 'pt') */
  sourceLocale: 'pt';

  /** Target locale */
  targetLocale: SupportedLocale;

  /** ATC code for cross-reference validation */
  atcCode?: string;

  /** Whether INN name was verified against WHO database */
  innVerified?: boolean;
}

// =============================================================================
// THERAPEUTIC CLASS TRANSLATION FILE STRUCTURE
// =============================================================================

/**
 * Structure of a therapeutic class translation file
 * (e.g., en/anti-hipertensivo.json)
 */
export interface ClassTranslationFile {
  /** Locale code */
  locale: SupportedLocale;

  /** Therapeutic class identifier */
  class: ClasseTerapeutica;

  /** Translated class label */
  classLabel: string;

  /** File generation timestamp */
  generatedAt: string;

  /** Total medications in this file */
  count: number;

  /** Array of medication translations */
  medications: MedicationTranslation[];
}

// =============================================================================
// TRANSLATION INDEX STRUCTURE
// =============================================================================

/**
 * Master index for a locale's medication translations
 */
export interface MedicationLocaleIndex {
  locale: SupportedLocale;

  /** Last update timestamp */
  lastUpdated: string;

  /** Statistics per therapeutic class */
  classes: {
    [K in ClasseTerapeutica]?: {
      file: string;
      count: number;
      lastUpdated: string;
    };
  };

  /** Total translated medications */
  totalMedications: number;

  /** Overall completion percentage */
  completionPercentage: number;

  /** Number of INN-verified drug names */
  innVerifiedCount: number;
}

// =============================================================================
// TYPE GUARDS
// =============================================================================

export function isMedicationTranslation(obj: unknown): obj is MedicationTranslation {
  if (typeof obj !== 'object' || obj === null) return false;
  const t = obj as MedicationTranslation;
  return (
    typeof t.id === 'string' &&
    typeof t.nomeGenerico === 'string' &&
    typeof t.classeTerapeutica === 'string' &&
    typeof t.mecanismoAcao === 'string' &&
    Array.isArray(t.indicacoes) &&
    Array.isArray(t.contraindicacoes) &&
    typeof t._meta === 'object'
  );
}

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Fields that should NOT be translated (codes, identifiers, numeric values)
 */
export const NON_TRANSLATABLE_MEDICATION_FIELDS = [
  'id',
  'atcCode',
  'rxNormCui',
  'drugBankId',
  'snomedCT',
  'loinc',
  'pharmgkb',
  'anvisaRegistro',
  'casNumber',
  'dcbCode',
  'classeTerapeutica', // enum
  'subclasse', // enum
  'rename', // boolean
  'gestacao', // enum (A, B, C, D, X, N)
  'doencasRelacionadas', // IDs
  'calculadoras', // IDs
  'citations', // reference IDs
  'lastUpdate',
] as const;

/**
 * Fields where drug names should be kept in INN format
 * or carefully translated using WHO-approved translations
 */
export const INN_FIELDS = [
  'nomeGenerico',
  'interacoes.medicamento',
] as const;

/**
 * Numeric fields that should remain unchanged
 */
export const NUMERIC_FIELDS = [
  'apresentacoes.concentracao',
  'apresentacoes.quantidade',
  'ajusteDoseRenal.tfg',
  'posologias.adultos.dose',
  'posologias.pediatrico.dose',
] as const;

// =============================================================================
// INN (International Nonproprietary Names) HELPERS
// =============================================================================

/**
 * Languages that have official WHO translations for INN names.
 * For these languages, we may use the translated INN.
 * Other languages should use the English INN.
 */
export const LANGUAGES_WITH_INN_TRANSLATIONS: SupportedLocale[] = [
  'es', // Spanish - official WHO language
  'fr', // French - official WHO language
  'ru', // Russian - official WHO language
  'ar', // Arabic - official WHO language
  'zh', // Chinese - official WHO language
];

/**
 * Whether to use translated INN names for a given locale.
 * Returns true only for official WHO languages.
 */
export function shouldUseTranslatedINN(locale: SupportedLocale): boolean {
  return LANGUAGES_WITH_INN_TRANSLATIONS.includes(locale);
}
