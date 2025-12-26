/**
 * DISEASE TRANSLATIONS INDEX - DARWIN-MFC
 * ========================================
 *
 * Central registry and loader for disease translations.
 * Provides utilities for loading, caching, and accessing translations.
 */

import { CategoriaDoenca } from '@/lib/types/doenca';
import {
  DiseaseTranslation,
  CategoryTranslationFile,
  LocaleTranslationIndex,
  SupportedLocale,
  SUPPORTED_LOCALES,
  SCHEMA_VERSION,
} from './schema';

// =============================================================================
// TRANSLATION REGISTRY
// =============================================================================

/**
 * In-memory registry of all loaded translations
 * Structure: Map<locale, Map<diseaseId, DiseaseTranslation>>
 */
const translationRegistry: Map<
  SupportedLocale,
  Map<string, DiseaseTranslation>
> = new Map();

/**
 * Track which category files have been loaded
 */
const loadedCategories: Map<SupportedLocale, Set<CategoriaDoenca>> = new Map();

// Initialize registry for each locale
for (const locale of SUPPORTED_LOCALES) {
  translationRegistry.set(locale, new Map());
  loadedCategories.set(locale, new Set());
}

// =============================================================================
// LOADER FUNCTIONS
// =============================================================================

/**
 * Load a category translation file for a specific locale
 */
export async function loadCategoryTranslations(
  locale: SupportedLocale,
  category: CategoriaDoenca
): Promise<DiseaseTranslation[]> {
  // Check if already loaded
  if (loadedCategories.get(locale)?.has(category)) {
    return Array.from(translationRegistry.get(locale)?.values() || []).filter(
      (t) => t.categoria === category
    );
  }

  try {
    // Dynamic import of the translation file
    const module = await import(`./${locale}/${category}.json`);
    const file: CategoryTranslationFile = module.default || module;

    if (!file.diseases || !Array.isArray(file.diseases)) {
      console.warn(`Invalid translation file for ${locale}/${category}`);
      return [];
    }

    // Register translations
    const localeRegistry = translationRegistry.get(locale)!;
    for (const translation of file.diseases) {
      localeRegistry.set(translation.id, translation);
    }

    // Mark category as loaded
    loadedCategories.get(locale)!.add(category);

    return file.diseases;
  } catch (error) {
    // File doesn't exist yet - this is expected before translations are generated
    console.debug(`Translation file not found: ${locale}/${category}.json`);
    loadedCategories.get(locale)!.add(category); // Mark as "loaded" to avoid repeated attempts
    return [];
  }
}

/**
 * Load all category translations for a locale
 */
export async function loadAllTranslations(
  locale: SupportedLocale
): Promise<DiseaseTranslation[]> {
  const categories: CategoriaDoenca[] = [
    'cardiovascular',
    'metabolico',
    'respiratorio',
    'musculoesqueletico',
    'saude_mental',
    'infecciosas',
    'dermatologico',
    'gastrointestinal',
    'neurologico',
    'endocrino',
    'hematologico',
    'urologico',
    'ginecologico',
    'pediatrico',
    'geriatrico',
    'outros',
  ];

  const results = await Promise.all(
    categories.map((cat) => loadCategoryTranslations(locale, cat))
  );

  return results.flat();
}

// =============================================================================
// ACCESS FUNCTIONS
// =============================================================================

/**
 * Get a specific disease translation
 */
export function getTranslation(
  locale: SupportedLocale,
  diseaseId: string
): DiseaseTranslation | undefined {
  return translationRegistry.get(locale)?.get(diseaseId);
}

/**
 * Get all loaded translations for a locale
 */
export function getAllTranslations(
  locale: SupportedLocale
): DiseaseTranslation[] {
  return Array.from(translationRegistry.get(locale)?.values() || []);
}

/**
 * Get translations for a specific category
 */
export function getTranslationsByCategory(
  locale: SupportedLocale,
  category: CategoriaDoenca
): DiseaseTranslation[] {
  return getAllTranslations(locale).filter((t) => t.categoria === category);
}

/**
 * Check if a translation exists
 */
export function hasTranslation(
  locale: SupportedLocale,
  diseaseId: string
): boolean {
  return translationRegistry.get(locale)?.has(diseaseId) || false;
}

// =============================================================================
// STATISTICS
// =============================================================================

/**
 * Get translation statistics for a locale
 */
export function getLocaleStats(locale: SupportedLocale): LocaleTranslationIndex {
  const translations = getAllTranslations(locale);
  const categories = loadedCategories.get(locale) || new Set();

  const categoryStats: LocaleTranslationIndex['categories'] = {};
  for (const category of categories) {
    const categoryTranslations = translations.filter(
      (t) => t.categoria === category
    );
    if (categoryTranslations.length > 0) {
      categoryStats[category] = {
        file: `${category}.json`,
        count: categoryTranslations.length,
        lastUpdated:
          categoryTranslations[0]?._meta?.translatedAt || 'unknown',
      };
    }
  }

  return {
    locale,
    lastUpdated: new Date().toISOString(),
    categories: categoryStats,
    totalDiseases: translations.length,
    completionPercentage: 0, // Would need total disease count to calculate
  };
}

/**
 * Get overall translation statistics
 */
export function getOverallStats(): {
  schemaVersion: string;
  locales: { [K in SupportedLocale]?: LocaleTranslationIndex };
} {
  const locales: { [K in SupportedLocale]?: LocaleTranslationIndex } = {};

  for (const locale of SUPPORTED_LOCALES) {
    const stats = getLocaleStats(locale);
    if (stats.totalDiseases > 0) {
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
    loadedCategories.get(locale)?.clear();
  }
}

/**
 * Clear cache for a specific locale
 */
export function clearLocaleCache(locale: SupportedLocale): void {
  translationRegistry.get(locale)?.clear();
  loadedCategories.get(locale)?.clear();
}

// =============================================================================
// EXPORTS
// =============================================================================

export * from './schema';
