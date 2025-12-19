/**
 * i18n Configuration
 * Internationalization setup for 7 languages
 */

export const locales = ['pt', 'en', 'es', 'fr', 'ru', 'ar', 'zh', 'el'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'pt';

export const localeNames: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  ru: 'Русский',
  ar: 'العربية',
  zh: '中文',
  el: 'Ελληνικά',
};

export const localeFlags: Record<Locale, string> = {
  pt: '🇧🇷',
  en: '🇬🇧',
  es: '🇪🇸',
  fr: '🇫🇷',
  ru: '🇷🇺',
  ar: '🇸🇦',
  zh: '🇨🇳',
  el: '🇬🇷',
};

/**
 * RTL languages
 */
export const rtlLocales: Locale[] = ['ar'];

/**
 * Check if locale is RTL
 */
export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

/**
 * Get locale from browser or default
 */
export function getLocaleFromHeaders(headers: Headers): Locale {
  const acceptLanguage = headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = 'q=1'] = lang.trim().split(';');
      const quality = parseFloat(q.replace('q=', ''));
      return { code: code.toLowerCase().split('-')[0], quality };
    })
    .sort((a, b) => b.quality - a.quality);

  // Find first matching locale
  for (const lang of languages) {
    if (locales.includes(lang.code as Locale)) {
      return lang.code as Locale;
    }
  }

  return defaultLocale;
}

