'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/app/components/Layout/Header';
import Sidebar from '@/app/components/Layout/Sidebar';
import Footer from '@/app/components/Layout/Footer';
import { MobileNavigation } from '@/lib/design-system/components/navigation/MobileNavigation';

export default function PSRouteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const segments = pathname.split('?')[0].split('/').filter(Boolean);
  const isPsRoute = segments[0] === 'ps' || segments[1] === 'ps';

  if (isPsRoute) {
    return <div className="min-h-screen bg-slate-950 text-white">{children}</div>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-1">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-x-hidden"
          role="main"
          aria-label="Conteúdo principal"
        >
          {children}
        </main>
      </div>
      <Footer />
      <MobileNavigation />
    </>
  );
}
