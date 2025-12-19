/**
 * i18n Hooks
 * Custom hooks for internationalization
 */

'use client';

import { useTranslations as useNextIntlTranslations } from 'next-intl';
import type { AbstractIntlMessages } from 'next-intl';

/**
 * Custom useTranslation hook
 */
export function useTranslation(namespace?: string) {
  const t = useNextIntlTranslations(namespace);
  return t;
}

