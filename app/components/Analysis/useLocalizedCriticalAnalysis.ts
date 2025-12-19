/**
 * Hook para obter análises críticas localizadas
 */

import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import { getAnaliseCriticaDoencaLocalizada, getAnaliseCriticaMedicamentoLocalizada } from '@/lib/data/analise-critica-medica';
import type { DiseaseCriticalAnalysis, MedicationCriticalAnalysis } from '@/lib/types/analysis-medical';
import type { Locale } from '@/i18n/config';

/**
 * Hook para obter análise crítica de doença localizada
 */
export function useLocalizedDiseaseCriticalAnalysis(diseaseId: string): DiseaseCriticalAnalysis | undefined {
  const locale = useLocale() as Locale;
  
  return useMemo(() => {
    return getAnaliseCriticaDoencaLocalizada(diseaseId, locale);
  }, [diseaseId, locale]);
}

/**
 * Hook para obter análise crítica de medicamento localizada
 */
export function useLocalizedMedicationCriticalAnalysis(medicationId: string): MedicationCriticalAnalysis | undefined {
  const locale = useLocale() as Locale;
  
  return useMemo(() => {
    return getAnaliseCriticaMedicamentoLocalizada(medicationId, locale);
  }, [medicationId, locale]);
}

