import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

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

  // Load and merge messages from multiple files
  const commonMessages = (await import(`../messages/${locale}/common.json`)).default;
  
  // Load optional message files (with fallback to empty object if not found)
  let diseasesMessages = {};
  try {
    diseasesMessages = (await import(`../messages/${locale}/diseases.json`)).default;
  } catch (e) {
    // File doesn't exist yet, use empty object
  }
  
  return {
    locale,
    messages: {
      ...commonMessages,
      diseases: diseasesMessages,
    },
  };
});

