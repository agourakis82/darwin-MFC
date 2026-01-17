'use client';

/**
 * LOCALE SYNC COMPONENT
 * =====================
 *
 * Synchronizes the next-intl locale with the Zustand appStore.
 * This ensures consistency between URL-based locale (routing)
 * and the persisted locale in localStorage.
 *
 * Usage: Place this component in the [locale] layout.
 */

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useAppStore } from '@/lib/store/appStore';
import type { Locale } from '@/i18n/config';

export function LocaleSync() {
  const routeLocale = useLocale() as Locale;
  const storeLocale = useAppStore((state) => state.locale);
  const setLocale = useAppStore((state) => state.setLocale);

  useEffect(() => {
    // Sync route locale to store if different
    if (routeLocale && routeLocale !== storeLocale) {
      setLocale(routeLocale);
    }
  }, [routeLocale, storeLocale, setLocale]);

  // This component renders nothing
  return null;
}

export default LocaleSync;
