/**
 * MEDICATION TRANSLATIONS INDEX - DARWIN-MFC
 * ===========================================
 *
 * Central registry and loader for medication translations.
 * Provides utilities for loading, caching, and accessing translations.
 */

import { ClasseTerapeutica } from '@/lib/types/medicamento';
import {
  MedicationTranslation,
  ClassTranslationFile,
  MedicationLocaleIndex,
  SupportedLocale,
  SUPPORTED_LOCALES,
} from './schema';
import { SCHEMA_VERSION } from '../diseases/schema';

// =============================================================================
// TRANSLATION REGISTRY
// =============================================================================

/**
 * In-memory registry of all loaded translations
 * Structure: Map<locale, Map<medicationId, MedicationTranslation>>
 */
const translationRegistry: Map<
  SupportedLocale,
  Map<string, MedicationTranslation>
> = new Map();

/**
 * Track which therapeutic class files have been loaded
 */
const loadedClasses: Map<SupportedLocale, Set<ClasseTerapeutica>> = new Map();

// Initialize registry for each locale
for (const locale of SUPPORTED_LOCALES) {
  translationRegistry.set(locale, new Map());
  loadedClasses.set(locale, new Set());
}

// =============================================================================
// LOADER FUNCTIONS
// =============================================================================

/**
 * Load a therapeutic class translation file for a specific locale
 */
export async function loadClassTranslations(
  locale: SupportedLocale,
  therapeuticClass: ClasseTerapeutica
): Promise<MedicationTranslation[]> {
  // Check if already loaded
  if (loadedClasses.get(locale)?.has(therapeuticClass)) {
    return Array.from(translationRegistry.get(locale)?.values() || []).filter(
      (t) => t.classeTerapeutica === therapeuticClass
    );
  }

  try {
    // Dynamic import of the translation file
    const module = await import(`./${locale}/${therapeuticClass}.json`);
    const file: ClassTranslationFile = module.default || module;

    if (!file.medications || !Array.isArray(file.medications)) {
      console.warn(
        `Invalid translation file for ${locale}/${therapeuticClass}`
      );
      return [];
    }

    // Register translations
    const localeRegistry = translationRegistry.get(locale)!;
    for (const translation of file.medications) {
      localeRegistry.set(translation.id, translation);
    }

    // Mark class as loaded
    loadedClasses.get(locale)!.add(therapeuticClass);

    return file.medications;
  } catch (error) {
    // File doesn't exist yet - this is expected before translations are generated
    console.debug(
      `Translation file not found: ${locale}/${therapeuticClass}.json`
    );
    loadedClasses.get(locale)!.add(therapeuticClass); // Mark as "loaded" to avoid repeated attempts
    return [];
  }
}

/**
 * Load all therapeutic class translations for a locale
 */
export async function loadAllTranslations(
  locale: SupportedLocale
): Promise<MedicationTranslation[]> {
  // Get all therapeutic classes dynamically
  const classes: ClasseTerapeutica[] = [
    'anti_hipertensivo',
    'anticoagulante',
    'antiagregante',
    'hipolipemiante',
    'cardiotonico',
    'diuretico',
    'antidiabetico',
    'hormonio_tireoide',
    'hormonio',
    'antidepressivo',
    'ansiolitico',
    'antipsicotico',
    'anticonvulsivante',
    'antiepileptico',
    'estabilizador_humor',
    'antiparkinsoniano',
    'antidemencia',
    'analgesico',
    'anti_inflamatorio',
    'aine',
    'relaxante_muscular',
    'antigotoso',
    'antibiotico',
    'antifungico',
    'antiviral',
    'antiparasitario',
    'broncodilatador',
    'corticoide_inalatorio',
    'corticoide_nasal',
    'antileucotrienico',
    'mucolitico',
    'antitussigeno',
    'descongestionante',
    'gastrointestinal',
    'inibidor_bomba_protonica',
    'antiemetico',
    'antiacido',
    'protetor_gastrico',
    'laxante',
    'antidiarreico',
    'antiespamodico',
    'enzima_digestiva',
    'anti_inflamatorio_intestinal',
    'anti_histaminico',
    'corticoide',
    'corticosteroide',
    'indutor_ovulacao',
    'contraceptivo',
    'imunossupressor',
    'anti_osteoporose',
    'vitamina',
    'suplemento',
    'vitamina_mineral',
    'psicoestimulante',
    'tratamento_dependencia',
    'hipnotico',
    'antiobesidade',
    'antitireoidiano',
    'antiacneico',
    'outros',
  ];

  const results = await Promise.all(
    classes.map((cls) => loadClassTranslations(locale, cls))
  );

  return results.flat();
}

// =============================================================================
// ACCESS FUNCTIONS
// =============================================================================

/**
 * Get a specific medication translation
 */
export function getTranslation(
  locale: SupportedLocale,
  medicationId: string
): MedicationTranslation | undefined {
  return translationRegistry.get(locale)?.get(medicationId);
}

/**
 * Get all loaded translations for a locale
 */
export function getAllTranslations(
  locale: SupportedLocale
): MedicationTranslation[] {
  return Array.from(translationRegistry.get(locale)?.values() || []);
}

/**
 * Get translations for a specific therapeutic class
 */
export function getTranslationsByClass(
  locale: SupportedLocale,
  therapeuticClass: ClasseTerapeutica
): MedicationTranslation[] {
  return getAllTranslations(locale).filter(
    (t) => t.classeTerapeutica === therapeuticClass
  );
}

/**
 * Check if a translation exists
 */
export function hasTranslation(
  locale: SupportedLocale,
  medicationId: string
): boolean {
  return translationRegistry.get(locale)?.has(medicationId) || false;
}

// =============================================================================
// STATISTICS
// =============================================================================

/**
 * Get translation statistics for a locale
 */
export function getLocaleStats(
  locale: SupportedLocale
): MedicationLocaleIndex {
  const translations = getAllTranslations(locale);
  const classes = loadedClasses.get(locale) || new Set();

  const classStats: MedicationLocaleIndex['classes'] = {};
  for (const therapeuticClass of classes) {
    const classTranslations = translations.filter(
      (t) => t.classeTerapeutica === therapeuticClass
    );
    if (classTranslations.length > 0) {
      classStats[therapeuticClass] = {
        file: `${therapeuticClass}.json`,
        count: classTranslations.length,
        lastUpdated:
          classTranslations[0]?._meta?.translatedAt || 'unknown',
      };
    }
  }

  // Count INN-verified medications
  const innVerifiedCount = translations.filter(
    (t) => t._meta?.innVerified
  ).length;

  return {
    locale,
    lastUpdated: new Date().toISOString(),
    classes: classStats,
    totalMedications: translations.length,
    completionPercentage: 0, // Would need total medication count to calculate
    innVerifiedCount,
  };
}

/**
 * Get overall translation statistics
 */
export function getOverallStats(): {
  schemaVersion: string;
  locales: { [K in SupportedLocale]?: MedicationLocaleIndex };
} {
  const locales: { [K in SupportedLocale]?: MedicationLocaleIndex } = {};

  for (const locale of SUPPORTED_LOCALES) {
    const stats = getLocaleStats(locale);
    if (stats.totalMedications > 0) {
      locales[locale] = stats;
    }
  }

  return {
    schemaVersion: SCHEMA_VERSION,
    locales,
  };
}

// =============================================================================
// CACHE MANAGEMENT
// =============================================================================

/**
 * Clear all cached translations
 */
export function clearCache(): void {
  for (const locale of SUPPORTED_LOCALES) {
    translationRegistry.get(locale)?.clear();
    loadedClasses.get(locale)?.clear();
  }
}

/**
 * Clear cache for a specific locale
 */
export function clearLocaleCache(locale: SupportedLocale): void {
  translationRegistry.get(locale)?.clear();
  loadedClasses.get(locale)?.clear();
}

// =============================================================================
// EXPORTS
// =============================================================================

export * from './schema';
