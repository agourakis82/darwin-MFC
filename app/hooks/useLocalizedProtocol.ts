/**
 * Hook para obter protocolo localizado
 */

'use client';

import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import { adaptProtocol } from '@/lib/i18n/protocol-localization';
import type { Protocolo } from '@/lib/types/protocolo';
import type { Locale } from '@/i18n/config';

/**
 * Hook para adaptar protocolo ao locale atual
 */
export function useLocalizedProtocol(protocol: Protocolo): Protocolo {
  const locale = useLocale() as Locale;
  
  return useMemo(() => {
    return adaptProtocol(protocol, locale);
  }, [protocol, locale]);
}

