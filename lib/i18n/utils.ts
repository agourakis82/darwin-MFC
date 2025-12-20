/**
 * i18n Utilities
 * Helper functions for internationalization
 */

import { isRTL } from '@/i18n/config';
import type { Locale } from '@/i18n/config';

/**
 * Get direction for locale (ltr or rtl)
 */
export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}

/**
 * Format locale for HTML lang attribute
 */
export function formatLocaleForHTML(locale: Locale): string {
  const localeMap: Record<Locale, string> = {
    pt: 'pt-BR',
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR',
    ru: 'ru-RU',
    ar: 'ar-SA',
    zh: 'zh-CN',
    el: 'el-GR',
    hi: 'hi-IN',
  };
  return localeMap[locale] || locale;
}

