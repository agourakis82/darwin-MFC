'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { usePSStore } from '@/lib/store/psStore';
import { locales } from '@/i18n/config';

export default function ModePersistenceGate() {
  const router = useRouter();
  const pathname = usePathname();
  const mode = usePSStore((state) => state.mode);

  useEffect(() => {
    if (mode !== 'ps' || !pathname) return;

    const normalized = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
    const parts = normalized.split('/').filter(Boolean);
    const hasLocale = parts[0] && locales.includes(parts[0] as (typeof locales)[number]);
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
  }, [mode, pathname, router]);

  return null;
}
