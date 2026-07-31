'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { usePSStore } from '@/lib/store/psStore';
import { locales } from '@/i18n/config';

export default function ModePersistenceGate() {
  const router = useRouter();
  const pathname = usePathname();
  const mode = usePSStore((state) => state.mode);
  const setMode = usePSStore((state) => state.setMode);

  useEffect(() => {
    if (!pathname) return;

    const normalized = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
    const parts = normalized.split('/').filter(Boolean);
    const hasLocale = parts[0] && locales.includes(parts[0] as (typeof locales)[number]);

    // The product root is always the Brazilian APS entry point, even when a
    // previous session last used the emergency module.
    if (normalized === '/' || (hasLocale && parts.length === 1)) {
      if (mode === 'ps') setMode('aps');
      return;
    }

    if (mode !== 'ps') return;

    const isPsPath = hasLocale
      ? parts[1] === 'ps'
      : parts[0] === 'ps';

    if (isPsPath) return;

    if (hasLocale) {
      router.replace(`/${parts[0]}/ps`);
      return;
    }

    if (normalized === '/' || parts.length === 0) {
      router.replace('/ps');
      return;
    }

    router.replace('/ps');
  }, [mode, pathname, router, setMode]);

  return null;
}
