'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import ClinicalAppShell from '@/app/components/Layout/ClinicalAppShell';

export default function PSRouteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const segments = pathname.split('?')[0].split('/').filter(Boolean);
  const isPsRoute = segments[0] === 'ps' || segments[1] === 'ps';

  if (isPsRoute) {
    return <div className="min-h-screen bg-slate-950 text-white">{children}</div>;
  }

  return <ClinicalAppShell>{children}</ClinicalAppShell>;
}
