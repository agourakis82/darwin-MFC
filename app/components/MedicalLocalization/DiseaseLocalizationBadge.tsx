/**
 * Disease Localization Badge
 * ============================
 * 
 * Componente que exibe informações de localização médica para doenças,
 * incluindo códigos específicos do país e práticas clínicas locais.
 */

'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { getLocalizedDiseaseInfo } from '@/lib/i18n/disease-localization';
import { getMedicalLocalization } from '@/lib/i18n/medical-localization';
import { Info } from 'lucide-react';

interface DiseaseLocalizationBadgeProps {
  diseaseId: string;
  showFullInfo?: boolean;
}

export function DiseaseLocalizationBadge({
  diseaseId,
  showFullInfo = false,
}: DiseaseLocalizationBadgeProps) {
  const locale = useLocale() as 'pt' | 'en' | 'es' | 'fr' | 'ru' | 'ar' | 'zh' | 'el';
  const localizedInfo = getLocalizedDiseaseInfo(diseaseId, locale);
  const medicalConfig = getMedicalLocalization(locale);
  
  if (!localizedInfo.primaryCode) {
    return null;
  }
  
  if (showFullInfo) {
    return (
      <div className="space-y-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
            Informações Locais ({medicalConfig.countryName})
          </span>
        </div>
        <div className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
          <div>
            <span className="font-medium">Código:</span> {localizedInfo.primaryCode} ({localizedInfo.classificationSystem})
          </div>
          {localizedInfo.clinicalPractices && localizedInfo.clinicalPractices.length > 0 && (
            <div>
              <span className="font-medium">Diretrizes:</span>{' '}
              {localizedInfo.clinicalPractices.map((p, i) => (
                <span key={i}>
                  {p.title} ({p.organization}, {p.year})
                  {i < localizedInfo.clinicalPractices!.length - 1 && ', '}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <span 
      className="relative inline-flex items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="inline-block px-2 py-1 text-xs rounded-full border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 cursor-help">
        {localizedInfo.classificationSystem}: {localizedInfo.primaryCode}
      </span>
      {showTooltip && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 max-w-sm">
          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-xl p-3">
            <div className="space-y-1 text-xs">
              <div className="font-medium text-neutral-900 dark:text-neutral-100">{medicalConfig.countryName}</div>
              <div className="text-neutral-700 dark:text-neutral-300">
                <span className="font-medium">Código:</span> {localizedInfo.primaryCode} ({localizedInfo.classificationSystem})
              </div>
              {localizedInfo.clinicalPractices && localizedInfo.clinicalPractices.length > 0 && (
                <div className="text-neutral-700 dark:text-neutral-300">
                  <span className="font-medium">Diretrizes:</span>{' '}
                  {localizedInfo.clinicalPractices[0].title} ({localizedInfo.clinicalPractices[0].organization})
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </span>
  );
}

