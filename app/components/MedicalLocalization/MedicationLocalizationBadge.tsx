/**
 * Medication Localization Badge
 * =============================
 * 
 * Componente que exibe informações de localização médica para medicamentos,
 * incluindo nomes comerciais locais e disponibilidade no sistema público.
 */

'use client';

import { useLocale } from 'next-intl';
import { getMedicationLocalization, getLocalizedGenericName, getLocalizedCommercialNames, isAvailableInPublicSystem } from '@/lib/i18n/medication-mappings';
import { getMedicalLocalization } from '@/lib/i18n/medical-localization';
import { useState } from 'react';
import { Info, CheckCircle2, XCircle } from 'lucide-react';

interface MedicationLocalizationBadgeProps {
  medicationId: string;
  showFullInfo?: boolean;
}

export function MedicationLocalizationBadge({
  medicationId,
  showFullInfo = false,
}: MedicationLocalizationBadgeProps) {
  const locale = useLocale() as 'pt' | 'en' | 'es' | 'fr' | 'ru' | 'ar' | 'zh' | 'el';
  const localization = getMedicationLocalization(medicationId, locale);
  const medicalConfig = getMedicalLocalization(locale);
  
  if (!localization) {
    return null;
  }
  
  const availableInPublic = isAvailableInPublicSystem(medicationId, locale);
  const commercialNames = getLocalizedCommercialNames(medicationId, locale);
  
  if (showFullInfo) {
    return (
      <div className="space-y-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-green-900 dark:text-green-100">
            Informações Locais ({medicalConfig.countryName})
          </span>
        </div>
        <div className="space-y-1 text-xs text-green-800 dark:text-green-200">
          <div>
            <span className="font-medium">Nome Genérico:</span> {localization.genericName}
          </div>
          {commercialNames.length > 0 && (
            <div>
              <span className="font-medium">Nomes Comerciais:</span> {commercialNames.join(', ')}
            </div>
          )}
          {localization.nationalCode && (
            <div>
              <span className="font-medium">Código Nacional:</span> {localization.nationalCode}
            </div>
          )}
          <div className="flex items-center gap-1">
            {availableInPublic ? (
              <>
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span>Disponível no {localization.publicSystemName}</span>
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3 text-red-600" />
                <span>Não disponível no sistema público</span>
              </>
            )}
          </div>
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
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
        availableInPublic 
          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700' 
          : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600'
      } cursor-help`}>
        {availableInPublic ? (
          <CheckCircle2 className="h-3 w-3" />
        ) : (
          <XCircle className="h-3 w-3" />
        )}
        {localization.genericName}
      </span>
      {showTooltip && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 max-w-sm">
          <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-xl p-3">
            <div className="space-y-1 text-xs">
              <div className="font-medium text-neutral-900 dark:text-neutral-100">{medicalConfig.countryName}</div>
              <div className="text-neutral-700 dark:text-neutral-300">
                <span className="font-medium">Genérico:</span> {localization.genericName}
              </div>
              {commercialNames.length > 0 && (
                <div className="text-neutral-700 dark:text-neutral-300">
                  <span className="font-medium">Comerciais:</span> {commercialNames.slice(0, 3).join(', ')}
                  {commercialNames.length > 3 && ` +${commercialNames.length - 3} mais`}
                </div>
              )}
              {localization.nationalCode && (
                <div className="text-neutral-700 dark:text-neutral-300">
                  <span className="font-medium">Código:</span> {localization.nationalCode}
                </div>
              )}
              <div className={availableInPublic ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                {availableInPublic ? (
                  <>✓ Disponível no {localization.publicSystemName}</>
                ) : (
                  <>✗ Não disponível no sistema público</>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </span>
  );
}

