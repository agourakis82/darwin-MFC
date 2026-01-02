/**
 * LOCALIZED MEDICATION HOOK - DARWIN-MFC
 * =======================================
 *
 * React hook for getting medication content in the current locale.
 * Merges translated content with the original Portuguese data.
 *
 * Usage:
 *   const { medication, isLoading } = useLocalizedMedication('losartana');
 *   const { medications, isLoading } = useLocalizedMedications(['losartana', 'metformina']);
 */

'use client';

import { useLocale } from 'next-intl';
import { useMemo, useState, useEffect } from 'react';
import { Medicamento, ClasseTerapeutica } from '@/lib/types/medicamento';
import {
  MedicationTranslation,
  SupportedLocale,
  SUPPORTED_LOCALES,
} from '@/lib/data/translations/medications/schema';

// =============================================================================
// TYPES
// =============================================================================

export interface LocalizedMedicamento extends Partial<Medicamento> {
  /** Whether this content is translated or original Portuguese */
  _isTranslated: boolean;
  /** The locale of the current content */
  _locale: string;
}

export interface UseLocalizedMedicationResult {
  medication: LocalizedMedicamento | null;
  isLoading: boolean;
  error: Error | null;
}

export interface UseLocalizedMedicationsResult {
  medications: LocalizedMedicamento[];
  isLoading: boolean;
  error: Error | null;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function isValidLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

// =============================================================================
// TRANSLATION CACHE
// =============================================================================

// In-memory cache for loaded translations
const translationCache: Map<string, Map<string, MedicationTranslation>> = new Map();

// Cache for loaded translation files
const loadedFiles: Set<string> = new Set();

/**
 * Dynamically load translation file for a locale and therapeutic class
 */
async function loadTranslationFile(
  locale: SupportedLocale,
  therapeuticClass: string
): Promise<MedicationTranslation[]> {
  const cacheKey = `${locale}/${therapeuticClass}`;

  if (loadedFiles.has(cacheKey)) {
    return []; // Already loaded
  }

  try {
    // Dynamic import of translation file
    // Files are expected at: lib/data/translations/medications/{locale}/{class}.json
    const module = await import(
      `@/lib/data/translations/medications/${locale}/${therapeuticClass}.json`
    );

    const translations = module.medications || module.default?.medications || [];

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
 * Get cached translation for a medication
 */
function getCachedTranslation(
  locale: SupportedLocale,
  medicationId: string
): MedicationTranslation | null {
  const localeCache = translationCache.get(locale);
  if (!localeCache) return null;
  return localeCache.get(medicationId) || null;
}

// =============================================================================
// GET MEDICATION FUNCTION
// =============================================================================

/**
 * Get medication by ID from the consolidated list
 * This is a helper to avoid circular imports
 */
async function getMedicamentoById(id: string): Promise<Partial<Medicamento> | undefined> {
  try {
    const { getMedicamentoById: getMed } = await import('@/lib/data/medicamentos/index');
    return getMed(id);
  } catch {
    return undefined;
  }
}

/**
 * Get medications by IDs from the consolidated list
 */
async function getMedicamentosByIds(ids: string[]): Promise<Medicamento[]> {
  try {
    const { getMedicamentoById: getMed } = await import('@/lib/data/medicamentos/index');
    return ids
      .map((id) => getMed(id))
      .filter((m): m is Medicamento => m !== undefined);
  } catch {
    return [];
  }
}

// =============================================================================
// MERGE FUNCTION
// =============================================================================

/**
 * Merge a translation with the original Portuguese medication data.
 * Translated fields override the original, non-translatable fields are kept.
 */
function mergeTranslation(
  original: Partial<Medicamento>,
  translation: MedicationTranslation | null,
  locale: string
): LocalizedMedicamento {
  if (!translation) {
    return {
      ...original,
      _isTranslated: false,
      _locale: 'pt',
    };
  }

  // Keep apresentacoes from original (forma is an enum, concentracao/quantidade are measurements)
  // No translation needed for this field
  const mergedApresentacoes = original.apresentacoes;

  // Merge posologias
  const mergedPosologias = original.posologias?.map((pos, i) => {
    const translatedPos = translation.posologias?.[i];
    if (!translatedPos) return pos;

    return {
      ...pos,
      indicacao: translatedPos.indicacao,
      adultos: {
        ...pos.adultos,
        dose: translatedPos.adultos.dose,
        frequencia: translatedPos.adultos.frequencia,
        doseMaxima: translatedPos.adultos.doseMaxima,
        observacoes: translatedPos.adultos.observacoes,
      },
      pediatrico: translatedPos.pediatrico
        ? {
            ...pos.pediatrico,
            dose: translatedPos.pediatrico.dose,
            frequencia: translatedPos.pediatrico.frequencia,
            idadeMinima: translatedPos.pediatrico.idadeMinima,
            doseMaxima: translatedPos.pediatrico.doseMaxima,
            observacoes: translatedPos.pediatrico.observacoes,
          }
        : pos.pediatrico,
      idosos: translatedPos.idosos
        ? {
            ...pos.idosos,
            dose: translatedPos.idosos.dose,
            observacoes: translatedPos.idosos.observacoes,
          }
        : pos.idosos,
    };
  });

  // Merge interacoes (keep medicamento as INN, gravidade; translate efeito, mecanismo, conduta)
  const mergedInteracoes = original.interacoes?.map((int, i) => {
    const translatedInt = translation.interacoes?.[i];
    if (!translatedInt) return int;

    return {
      ...int,
      efeito: translatedInt.efeito,
      mecanismo: translatedInt.mecanismo,
      conduta: translatedInt.conduta,
    };
  });

  // Merge ajusteDoseRenal (keep tfg; translate ajuste, observacao)
  const mergedAjusteDoseRenal = original.ajusteDoseRenal?.map((adj, i) => {
    const translatedAdj = translation.ajusteDoseRenal?.[i];
    if (!translatedAdj) return adj;

    return {
      ...adj,
      ajuste: translatedAdj.ajuste,
      observacao: translatedAdj.observacao,
    };
  });

  return {
    ...original,
    // Translated fields
    nomeGenerico: translation.nomeGenerico,
    apresentacoes: mergedApresentacoes,
    indicacoes: translation.indicacoes,
    mecanismoAcao: translation.mecanismoAcao,
    posologias: mergedPosologias,
    contraindicacoes: translation.contraindicacoes,
    precaucoes: translation.precaucoes,
    efeitosAdversos: translation.efeitosAdversos,
    interacoes: mergedInteracoes,
    ajusteDoseRenal: mergedAjusteDoseRenal,
    amamentacao: {
      compativel: original.amamentacao?.compativel || false,
      observacao: translation.amamentacao.observacao,
    },
    consideracoesEspeciais: translation.consideracoesEspeciais,
    monitorizacao: translation.monitorizacao,
    orientacoesPaciente: translation.orientacoesPaciente,
    tags: translation.tags,
    // Metadata
    _isTranslated: true,
    _locale: locale,
  };
}

// =============================================================================
// HOOKS
// =============================================================================

/**
 * Hook to get a single localized medication by ID
 */
export function useLocalizedMedication(
  medicationId: string
): UseLocalizedMedicationResult {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [original, setOriginal] = useState<Partial<Medicamento> | null>(null);
  const [translation, setTranslation] = useState<MedicationTranslation | null>(
    null
  );

  // Load original medication data
  useEffect(() => {
    getMedicamentoById(medicationId).then((med) => {
      setOriginal(med || null);
    });
  }, [medicationId]);

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
        let cached = getCachedTranslation(
          locale as SupportedLocale,
          medicationId
        );

        if (!cached && original.classeTerapeutica) {
          // Load the translation file for this therapeutic class
          await loadTranslationFile(
            locale as SupportedLocale,
            original.classeTerapeutica
          );
          cached = getCachedTranslation(
            locale as SupportedLocale,
            medicationId
          );
        }

        setTranslation(cached);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to load translation')
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslation();
  }, [medicationId, locale, original]);

  // Merge translation with original
  const medication = useMemo(() => {
    if (!original) return null;

    if (locale === 'pt') {
      return {
        ...original,
        _isTranslated: false,
        _locale: 'pt',
      } as LocalizedMedicamento;
    }

    return mergeTranslation(original, translation, locale);
  }, [original, translation, locale]);

  return { medication, isLoading, error };
}

/**
 * Hook to get multiple localized medications by IDs
 */
export function useLocalizedMedications(
  medicationIds: string[]
): UseLocalizedMedicationsResult {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [originals, setOriginals] = useState<Partial<Medicamento>[]>([]);
  const [translations, setTranslations] = useState<
    Map<string, MedicationTranslation>
  >(new Map());

  // Load original medications
  useEffect(() => {
    getMedicamentosByIds(medicationIds).then(setOriginals);
  }, [medicationIds]);

  // Load translations for all medications
  useEffect(() => {
    if (locale === 'pt' || !isValidLocale(locale)) {
      setIsLoading(false);
      return;
    }

    const loadTranslations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get unique therapeutic classes
        const classes = new Set(
          originals
            .map((m) => m.classeTerapeutica)
            .filter((c): c is ClasseTerapeutica => !!c)
        );

        // Load all class files
        await Promise.all(
          Array.from(classes).map((cls) =>
            loadTranslationFile(locale as SupportedLocale, cls)
          )
        );

        // Get all translations from cache
        const loadedTranslations = new Map<string, MedicationTranslation>();
        for (const id of medicationIds) {
          const translation = getCachedTranslation(
            locale as SupportedLocale,
            id
          );
          if (translation) {
            loadedTranslations.set(id, translation);
          }
        }

        setTranslations(loadedTranslations);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to load translations')
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [medicationIds, locale, originals]);

  // Merge translations with originals
  const medications = useMemo(() => {
    if (locale === 'pt') {
      return originals.map((m) => ({
        ...m,
        _isTranslated: false,
        _locale: 'pt',
      })) as LocalizedMedicamento[];
    }

    return originals.map((original) => {
      const translation = translations.get(original.id || '');
      return mergeTranslation(original, translation || null, locale);
    });
  }, [originals, translations, locale]);

  return { medications, isLoading, error };
}

/**
 * Hook to get all localized medications for a therapeutic class
 */
export function useLocalizedMedicationsByClass(
  therapeuticClass: string
): UseLocalizedMedicationsResult {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [medicationIds, setMedicationIds] = useState<string[]>([]);

  // Load medication IDs for the class
  useEffect(() => {
    const loadIds = async () => {
      try {
        const { getMedicamentosByClasse } = await import('@/lib/data/medicamentos/index');
        const meds = getMedicamentosByClasse(therapeuticClass) as Partial<Medicamento>[];
        setMedicationIds(
          meds.map((m) => m.id).filter((id): id is string => !!id)
        );
      } catch {
        setMedicationIds([]);
      }
    };
    loadIds();
  }, [therapeuticClass]);

  // Use the bulk hook
  const result = useLocalizedMedications(medicationIds);

  // Combine loading states
  useEffect(() => {
    setIsLoading(result.isLoading);
    setError(result.error);
  }, [result.isLoading, result.error]);

  return {
    medications: result.medications,
    isLoading,
    error,
  };
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Preload translations for a set of therapeutic classes
 * Call this early to avoid loading delays
 */
export async function preloadMedicationTranslations(
  locale: SupportedLocale,
  therapeuticClasses: string[]
): Promise<void> {
  if (!isValidLocale(locale)) return;

  await Promise.all(
    therapeuticClasses.map((cls) => loadTranslationFile(locale, cls))
  );
}

/**
 * Clear the translation cache
 * Useful for testing or when translations are updated
 */
export function clearMedicationTranslationCache(): void {
  translationCache.clear();
  loadedFiles.clear();
}

/**
 * Get translation coverage stats for a locale
 */
export function getMedicationTranslationStats(locale: SupportedLocale): {
  cachedCount: number;
  loadedClasses: string[];
} {
  const localeCache = translationCache.get(locale);
  const loadedClasses = Array.from(loadedFiles)
    .filter((key) => key.startsWith(`${locale}/`))
    .map((key) => key.replace(`${locale}/`, ''));

  return {
    cachedCount: localeCache?.size || 0,
    loadedClasses,
  };
}
