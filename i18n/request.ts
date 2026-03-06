import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    value != null &&
    typeof value === 'object' &&
    !Array.isArray(value)
  );
}

function deepMerge(
  base: Record<string, unknown>,
  patch: Record<string, unknown>
): Record<string, unknown> {
  for (const [key, patchValue] of Object.entries(patch)) {
    const baseValue = base[key];
    if (isPlainObject(baseValue) && isPlainObject(patchValue)) {
      base[key] = deepMerge({ ...baseValue }, patchValue);
      continue;
    }
    base[key] = patchValue;
  }
  return base;
}

async function loadJson(locale: string, file: string): Promise<Record<string, unknown>> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const mod = await import(`../messages/${locale}/${file}.json`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return (mod.default ?? {}) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  // For static export, requestLocale should come from the route params
  // If it's not available, fall back to default locale
  let locale: string = routing.defaultLocale;
  
  try {
    const requestedLocale = await requestLocale;
    if (requestedLocale && routing.locales.includes(requestedLocale as any)) {
      locale = requestedLocale;
    }
  } catch (error) {
    // If requestLocale fails (e.g., in static export), use default
    locale = routing.defaultLocale;
  }

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Base-locale fallback (TOP TIER): ensure missing keys never break static export.
  // Merge order: base (default locale) first, then the current locale overrides it.
  const fallbackLocale =
    // Prefer English as a "completeness baseline" for missing keys across locales.
    // Default locale is pt, but pt translations are not guaranteed to be complete.
    (routing.locales as readonly string[]).includes('en') ? 'en' : routing.defaultLocale;

  const messageFiles = [
    'common',
    'learning',
    'community',
    'clinical-cases',
    'auth',
    'regional',
  ];

  const [
    baseCommon,
    baseLearning,
    baseCommunity,
    baseClinicalCases,
    baseAuth,
    baseRegional,
  ] = await Promise.all(messageFiles.map((f) => loadJson(fallbackLocale, f)));

  const [
    localeCommon,
    localeLearning,
    localeCommunity,
    localeClinicalCases,
    localeAuth,
    localeRegional,
  ] = locale === fallbackLocale
    ? [baseCommon, baseLearning, baseCommunity, baseClinicalCases, baseAuth, baseRegional]
    : await Promise.all(messageFiles.map((f) => loadJson(locale, f)));

  const mergedMessages = deepMerge(
    deepMerge(
      deepMerge(
        deepMerge(
          deepMerge(
            deepMerge({}, baseCommon),
            baseLearning
          ),
          baseCommunity
        ),
        baseClinicalCases
      ),
      baseAuth
    ),
    baseRegional
  );

  deepMerge(mergedMessages, localeCommon);
  deepMerge(mergedMessages, localeLearning);
  deepMerge(mergedMessages, localeCommunity);
  deepMerge(mergedMessages, localeClinicalCases);
  deepMerge(mergedMessages, localeAuth);
  deepMerge(mergedMessages, localeRegional);

  const baseDiseases = await loadJson(fallbackLocale, 'diseases');
  const localeDiseases = locale === fallbackLocale ? baseDiseases : await loadJson(locale, 'diseases');

  const baseAi = await loadJson(fallbackLocale, 'ai');
  const localeAi = locale === fallbackLocale ? baseAi : await loadJson(locale, 'ai');

  const baseAccessibility = await loadJson(fallbackLocale, 'accessibility');
  const localeAccessibility = locale === fallbackLocale ? baseAccessibility : await loadJson(locale, 'accessibility');

  return {
    locale,
    messages: {
      ...mergedMessages,
      diseases: deepMerge(deepMerge({}, baseDiseases), localeDiseases),
      ai: deepMerge(deepMerge({}, baseAi), localeAi),
      accessibility: deepMerge(deepMerge({}, baseAccessibility), localeAccessibility),
    },
    // Keep static export resilient when translations are incomplete.
    // Missing keys should not break the build; show a safe fallback instead.
    onError(error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const code = (error as any)?.code;
      if (code === 'MISSING_MESSAGE') return;
      // eslint-disable-next-line no-console
      console.error(error);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getMessageFallback({ namespace, key }: any) {
      return namespace ? `${namespace}.${key}` : key;
    },
  };
});
