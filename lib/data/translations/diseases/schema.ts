/**
 * DISEASE TRANSLATION SCHEMA - DARWIN-MFC
 * ========================================
 *
 * TypeScript interfaces for disease translations.
 * These schemas define the structure of translation overlay files
 * that are merged with the original Portuguese disease data.
 *
 * Supported locales: en, es, fr, ru, ar, zh, el, hi
 * (pt is the source language, not translated)
 */

import { CategoriaDoenca } from '@/lib/types/doenca';

// =============================================================================
// TRANSLATION METADATA
// =============================================================================

export interface TranslationMeta {
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
}

export type SupportedLocale = 'en' | 'es' | 'fr' | 'ru' | 'ar' | 'zh' | 'el' | 'hi';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi'];

// =============================================================================
// QUICK VIEW TRANSLATION
// =============================================================================

export interface QuickViewTranslation {
  /** Translated definition (2-3 lines) */
  definicao: string;

  /** Translated diagnostic criteria */
  criteriosDiagnosticos: string[];

  /** Translated risk classification */
  classificacaoRisco?: RiscoInfoTranslation[];

  /** Translated first-line treatment */
  tratamentoPrimeiraLinha: {
    naoFarmacologico: string[];
    farmacologico: string[];
  };

  /** Translated red flags */
  redFlags: string[];

  /** Translated therapeutic goals */
  metasTerapeuticas?: string[];

  /** Translated initial exams */
  examesIniciais?: string[];
}

export interface RiscoInfoTranslation {
  nivel: 'baixo' | 'moderado' | 'alto' | 'muito_alto';
  criterios: string[];
  conduta: string;
}

// =============================================================================
// FULL CONTENT TRANSLATION
// =============================================================================

export interface FullContentTranslation {
  /** Epidemiology section */
  epidemiologia: {
    prevalencia?: string;
    incidencia?: string;
    mortalidade?: string;
    faixaEtaria?: string;
    fatoresRisco: string[];
  };

  /** Pathophysiology section */
  fisiopatologia?: {
    texto: string;
  };

  /** Clinical presentation */
  quadroClinico: {
    sintomasPrincipais: string[];
    sinaisExameFisico: string[];
    formasClinicas?: string[];
  };

  /** Diagnosis section */
  diagnostico: {
    criterios: string[];
    diagnosticoDiferencial: string[];
    examesLaboratoriais?: string[];
    examesImagem?: string[];
    outrosExames?: string[];
  };

  /** Treatment section */
  tratamento: {
    objetivos: string[];
    naoFarmacologico: {
      medidas: string[];
    };
    farmacologico: {
      primeiraLinha: TratamentoFarmacologicoTranslation[];
      segundaLinha?: TratamentoFarmacologicoTranslation[];
      situacoesEspeciais?: {
        situacao: string;
        conduta: string;
      }[];
    };
    duracao?: string;
  };

  /** Follow-up section */
  acompanhamento: {
    frequenciaConsultas: string;
    examesControle?: string[];
    metasTerapeuticas: string[];
    criteriosEncaminhamento: string[];
  };

  /** Prevention section */
  prevencao?: {
    primaria: string[];
    secundaria: string[];
  };

  /** Special populations */
  populacoesEspeciais?: {
    idosos?: string;
    gestantes?: string;
    criancas?: string;
    drc?: string;
    hepatopatas?: string;
  };
}

export interface TratamentoFarmacologicoTranslation {
  classe: string;
  medicamentos: string[]; // Drug names kept as-is (INN)
  posologia?: string;
  observacoes?: string;
}

// =============================================================================
// MAIN DISEASE TRANSLATION INTERFACE
// =============================================================================

export interface DiseaseTranslation {
  /** Disease ID (matches the original Doenca.id) */
  id: string;

  /** Translated title */
  titulo: string;

  /** Translated synonyms for search */
  sinonimos?: string[];

  /** Category (not translated, used for file organization) */
  categoria: CategoriaDoenca;

  /** Translated subcategory name */
  subcategoria?: string;

  /** Translated QuickView content */
  quickView: QuickViewTranslation;

  /** Translated full content */
  fullContent: FullContentTranslation;

  /** Translated tags for search */
  tags?: string[];

  /** Translation metadata */
  _meta: TranslationMeta;
}

// =============================================================================
// CATEGORY TRANSLATION FILE STRUCTURE
// =============================================================================

/**
 * Structure of a category translation file (e.g., en/cardiovascular.json)
 */
export interface CategoryTranslationFile {
  /** Locale code */
  locale: SupportedLocale;

  /** Category identifier */
  category: CategoriaDoenca;

  /** File generation timestamp */
  generatedAt: string;

  /** Total diseases in this file */
  count: number;

  /** Array of disease translations */
  diseases: DiseaseTranslation[];
}

// =============================================================================
// TRANSLATION INDEX STRUCTURE
// =============================================================================

/**
 * Master index for a locale's translations
 */
export interface LocaleTranslationIndex {
  locale: SupportedLocale;

  /** Last update timestamp */
  lastUpdated: string;

  /** Statistics per category */
  categories: {
    [K in CategoriaDoenca]?: {
      file: string;
      count: number;
      lastUpdated: string;
    };
  };

  /** Total translated diseases */
  totalDiseases: number;

  /** Overall completion percentage */
  completionPercentage: number;
}

// =============================================================================
// TYPE GUARDS
// =============================================================================

export function isDiseaseTranslation(obj: unknown): obj is DiseaseTranslation {
  if (typeof obj !== 'object' || obj === null) return false;
  const t = obj as DiseaseTranslation;
  return (
    typeof t.id === 'string' &&
    typeof t.titulo === 'string' &&
    typeof t.categoria === 'string' &&
    typeof t.quickView === 'object' &&
    typeof t.fullContent === 'object' &&
    typeof t._meta === 'object'
  );
}

export function isValidLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const SCHEMA_VERSION = '1.0.0';

/**
 * Fields that should NOT be translated (codes, identifiers, etc.)
 */
export const NON_TRANSLATABLE_FIELDS = [
  'id',
  'doid',
  'snomedCT',
  'meshId',
  'umlsCui',
  'ordoId',
  'ciap2',
  'cid10',
  'cid11',
  'hpo',
  'loinc',
  'ordo',
  'categoria', // enum values
  'protocolos', // IDs
  'medicamentos', // IDs
  'calculadoras', // IDs
  'rastreamentos', // IDs
  'lastUpdate',
  'citations', // reference IDs
] as const;

/**
 * Fields where drug names should be kept in INN format
 * (International Nonproprietary Names)
 */
export const INN_DRUG_NAME_FIELDS = [
  'tratamentoPrimeiraLinha.farmacologico',
  'tratamento.farmacologico.primeiraLinha.medicamentos',
  'tratamento.farmacologico.segundaLinha.medicamentos',
] as const;
