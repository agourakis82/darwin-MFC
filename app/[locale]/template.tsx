'use client';

import { PageTransitionTemplate } from '@/lib/design-system/animations/page-transitions';

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransitionTemplate variant="fadeUp">{children}</PageTransitionTemplate>;
}
