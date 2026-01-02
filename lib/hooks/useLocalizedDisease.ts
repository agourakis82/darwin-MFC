/**
 * LOCALIZED DISEASE HOOK - DARWIN-MFC
 * ====================================
 *
 * React hook for getting disease content in the current locale.
 * Merges translated content with the original Portuguese data.
 *
 * Usage:
 *   const { disease, isLoading } = useLocalizedDisease('diabetes-mellitus-2');
 *   const { diseases, isLoading } = useLocalizedDiseases(['diabetes-mellitus-2', 'hipertensao']);
 */

'use client';

import { useLocale } from 'next-intl';
import { useMemo, useState, useEffect } from 'react';
import { Doenca, CategoriaDoenca } from '@/lib/types/doenca';
import { getDoencaById } from '@/lib/data/doencas/index';
import {
  DiseaseTranslation,
  SupportedLocale,
  isValidLocale,
} from '@/lib/data/translations/diseases/schema';

// =============================================================================
// TYPES
// =============================================================================

export interface LocalizedDoenca extends Partial<Doenca> {
  /** Whether this content is translated or original Portuguese */
  _isTranslated: boolean;
  /** The locale of the current content */
  _locale: string;
}

export interface UseLocalizedDiseaseResult {
  disease: LocalizedDoenca | null;
  isLoading: boolean;
  error: Error | null;
}

export interface UseLocalizedDiseasesResult {
  diseases: LocalizedDoenca[];
  isLoading: boolean;
  error: Error | null;
}

// =============================================================================
// TRANSLATION CACHE
// =============================================================================

// In-memory cache for loaded translations
const translationCache: Map<string, Map<string, DiseaseTranslation>> = new Map();

// Cache for loaded translation files
const loadedFiles: Set<string> = new Set();

/**
 * Dynamically load translation file for a locale and category
 */
async function loadTranslationFile(
  locale: SupportedLocale,
  category: string
): Promise<DiseaseTranslation[]> {
  const cacheKey = `${locale}/${category}`;

  if (loadedFiles.has(cacheKey)) {
    return []; // Already loaded
  }

  try {
    // Dynamic import of translation file
    // Files are expected at: lib/data/translations/diseases/{locale}/{category}.json
    const module = await import(
      `@/lib/data/translations/diseases/${locale}/${category}.json`
    );

    const translations = module.diseases || module.default?.diseases || [];

    // Add to cache
    if (!translationCache.has(locale)) {
      translationCache.set(locale, new Map());
    }

    const localeCache = translationCache.get(locale)!;
    for (const translation of translations) {
      localeCache.set(translation.id, translation);
    }

    loadedFiles.add(cacheKey);
    return translations;
  } catch {
    // Translation file doesn't exist yet - this is expected before translations are generated
    loadedFiles.add(cacheKey); // Mark as "loaded" to avoid repeated attempts
    return [];
  }
}

/**
 * Get cached translation for a disease
 */
function getCachedTranslation(
  locale: SupportedLocale,
  diseaseId: string
): DiseaseTranslation | null {
  const localeCache = translationCache.get(locale);
  if (!localeCache) return null;
  return localeCache.get(diseaseId) || null;
}

// =============================================================================
// MERGE FUNCTION
// =============================================================================

/**
 * Merge a translation with the original Portuguese disease data.
 * Translated fields override the original, non-translatable fields are kept.
 */
function mergeTranslation(
  original: Partial<Doenca>,
  translation: DiseaseTranslation | null,
  locale: string
): LocalizedDoenca {
  if (!translation) {
    return {
      ...original,
      _isTranslated: false,
      _locale: 'pt',
    };
  }

  // Deep merge quickView
  const mergedQuickView = original.quickView
    ? {
        ...original.quickView,
        definicao: translation.quickView.definicao,
        criteriosDiagnosticos: translation.quickView.criteriosDiagnosticos,
        tratamentoPrimeiraLinha: translation.quickView.tratamentoPrimeiraLinha,
        redFlags: translation.quickView.redFlags,
        metasTerapeuticas: translation.quickView.metasTerapeuticas,
        examesIniciais: translation.quickView.examesIniciais,
        classificacaoRisco: translation.quickView.classificacaoRisco?.map(
          (r, i) => ({
            ...original.quickView!.classificacaoRisco?.[i],
            ...r,
          })
        ),
      }
    : undefined;

  // Deep merge fullContent
  const mergedFullContent = original.fullContent
    ? {
        epidemiologia: {
          ...original.fullContent.epidemiologia,
          ...translation.fullContent.epidemiologia,
          citations: original.fullContent.epidemiologia.citations, // Keep original citations
        },
        fisiopatologia: translation.fullContent.fisiopatologia
          ? {
              ...original.fullContent.fisiopatologia,
              texto: translation.fullContent.fisiopatologia.texto,
              citations: original.fullContent.fisiopatologia?.citations ?? [],
            }
          : original.fullContent.fisiopatologia,
        quadroClinico: {
          ...original.fullContent.quadroClinico,
          ...translation.fullContent.quadroClinico,
          citations: original.fullContent.quadroClinico.citations,
        },
        diagnostico: {
          ...original.fullContent.diagnostico,
          ...translation.fullContent.diagnostico,
          citations: original.fullContent.diagnostico.citations,
        },
        tratamento: {
          objetivos: translation.fullContent.tratamento.objetivos,
          naoFarmacologico: {
            medidas: translation.fullContent.tratamento.naoFarmacologico.medidas,
            citations: original.fullContent.tratamento.naoFarmacologico.citations,
          },
          farmacologico: {
            primeiraLinha:
              translation.fullContent.tratamento.farmacologico.primeiraLinha.map(
                (t, i) => {
                  const orig = original.fullContent!.tratamento.farmacologico.primeiraLinha[i];
                  return {
                    ...orig,
                    classe: t.classe,
                    posologia: t.posologia,
                    observacoes: t.observacoes,
                    medicamentos: orig?.medicamentos ?? [],
                  };
                }
              ),
            segundaLinha:
              translation.fullContent.tratamento.farmacologico.segundaLinha?.map(
                (t, i) => {
                  const orig = original.fullContent!.tratamento.farmacologico.segundaLinha?.[i];
                  return {
                    ...orig,
                    classe: t.classe,
                    posologia: t.posologia,
                    observacoes: t.observacoes,
                    medicamentos: orig?.medicamentos ?? [],
                  };
                }
              ),
            situacoesEspeciais:
              translation.fullContent.tratamento.farmacologico.situacoesEspeciais,
            citations: original.fullContent.tratamento.farmacologico.citations,
          },
          duracao: translation.fullContent.tratamento.duracao,
        },
        acompanhamento: {
          ...original.fullContent.acompanhamento,
          ...translation.fullContent.acompanhamento,
          citations: original.fullContent.acompanhamento.citations,
        },
        prevencao: translation.fullContent.prevencao
          ? {
              ...translation.fullContent.prevencao,
              citations: original.fullContent.prevencao?.citations ?? [],
            }
          : original.fullContent.prevencao,
        populacoesEspeciais: translation.fullContent.populacoesEspeciais,
      }
    : undefined;

  return {
    ...original,
    titulo: translation.titulo,
    sinonimos: translation.sinonimos,
    subcategoria: translation.subcategoria,
    quickView: mergedQuickView,
    fullContent: mergedFullContent,
    tags: translation.tags,
    _isTranslated: true,
    _locale: locale,
  };
}

// =============================================================================
// HOOKS
// =============================================================================

/**
 * Hook to get a single localized disease by ID
 */
export function useLocalizedDisease(diseaseId: string): UseLocalizedDiseaseResult {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [translation, setTranslation] = useState<DiseaseTranslation | null>(null);

  // Get original disease data
  const original = useMemo(() => getDoencaById(diseaseId), [diseaseId]);

  // Load translation for current locale
  useEffect(() => {
    if (!original || locale === 'pt') {
      setIsLoading(false);
      return;
    }

    if (!isValidLocale(locale)) {
      setIsLoading(false);
      return;
    }

    const loadTranslation = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Check cache first
        let cached = getCachedTranslation(locale as SupportedLocale, diseaseId);

        if (!cached && original.categoria) {
          // Load the translation file for this category
          await loadTranslationFile(locale as SupportedLocale, original.categoria);
          cached = getCachedTranslation(locale as SupportedLocale, diseaseId);
        }

        setTranslation(cached);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load translation'));
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslation();
  }, [diseaseId, locale, original]);

  // Merge translation with original
  const disease = useMemo(() => {
    if (!original) return null;

    if (locale === 'pt') {
      return {
        ...original,
        _isTranslated: false,
        _locale: 'pt',
      } as LocalizedDoenca;
    }

    return mergeTranslation(original, translation, locale);
  }, [original, translation, locale]);

  return { disease, isLoading, error };
}

/**
 * Hook to get multiple localized diseases by IDs
 */
export function useLocalizedDiseases(
  diseaseIds: string[]
): UseLocalizedDiseasesResult {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [translations, setTranslations] = useState<Map<string, DiseaseTranslation>>(
    new Map()
  );

  // Get original diseases
  const originals = useMemo(
    () =>
      diseaseIds
        .map((id) => getDoencaById(id))
        .filter((d): d is Partial<Doenca> => d !== undefined),
    [diseaseIds]
  );

  // Load translations for all diseases
  useEffect(() => {
    if (locale === 'pt' || !isValidLocale(locale)) {
      setIsLoading(false);
      return;
    }

    const loadTranslations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get unique categories
        const categories = new Set(
          originals.map((d) => d.categoria).filter((c): c is CategoriaDoenca => !!c)
        );

        // Load all category files
        await Promise.all(
          Array.from(categories).map((category) =>
            loadTranslationFile(locale as SupportedLocale, category)
          )
        );

        // Get all translations from cache
        const loadedTranslations = new Map<string, DiseaseTranslation>();
        for (const id of diseaseIds) {
          const translation = getCachedTranslation(locale as SupportedLocale, id);
          if (translation) {
            loadedTranslations.set(id, translation);
          }
        }

        setTranslations(loadedTranslations);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load translations'));
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [diseaseIds, locale, originals]);

  // Merge translations with originals
  const diseases = useMemo(() => {
    if (locale === 'pt') {
      return originals.map((d) => ({
        ...d,
        _isTranslated: false,
        _locale: 'pt',
      })) as LocalizedDoenca[];
    }

    return originals.map((original) => {
      const translation = translations.get(original.id || '');
      return mergeTranslation(original, translation || null, locale);
    });
  }, [originals, translations, locale]);

  return { diseases, isLoading, error };
}

/**
 * Hook to get all localized diseases for a category
 */
export function useLocalizedDiseasesByCategory(
  category: string
): UseLocalizedDiseasesResult {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Get original diseases for category
  const originals = useMemo(() => {
    // Import dynamically to avoid circular deps
    const { filterByCategoria } = require('@/lib/data/doencas/index');
    return filterByCategoria(category) as Partial<Doenca>[];
  }, [category]);

  // Get disease IDs
  const diseaseIds = useMemo(
    () => originals.map((d) => d.id).filter((id): id is string => !!id),
    [originals]
  );

  // Use the bulk hook
  const result = useLocalizedDiseases(diseaseIds);

  // Combine loading states
  useEffect(() => {
    setIsLoading(result.isLoading);
    setError(result.error);
  }, [result.isLoading, result.error]);

  return {
    diseases: result.diseases,
    isLoading,
    error,
  };
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Preload translations for a set of categories
 * Call this early to avoid loading delays
 */
export async function preloadDiseaseTranslations(
  locale: SupportedLocale,
  categories: string[]
): Promise<void> {
  if (!isValidLocale(locale)) return;

  await Promise.all(
    categories.map((category) => loadTranslationFile(locale, category))
  );
}

/**
 * Clear the translation cache
 * Useful for testing or when translations are updated
 */
export function clearDiseaseTranslationCache(): void {
  translationCache.clear();
  loadedFiles.clear();
}

/**
 * Get translation coverage stats for a locale
 */
export function getDiseaseTranslationStats(locale: SupportedLocale): {
  cachedCount: number;
  loadedCategories: string[];
} {
  const localeCache = translationCache.get(locale);
  const loadedCategories = Array.from(loadedFiles)
    .filter((key) => key.startsWith(`${locale}/`))
    .map((key) => key.replace(`${locale}/`, ''));

  return {
    cachedCount: localeCache?.size || 0,
    loadedCategories,
  };
}
