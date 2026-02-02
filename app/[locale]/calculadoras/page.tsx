/**
 * DARWIN-MFC CLINICAL CALCULATORS HUB
 * ====================================
 *
 * Main entry point for the clinical calculator suite.
 * Features evidence-based clinical decision support tools.
 */

import { locales } from '@/i18n/config';
import { setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/app/components/ui/Skeleton';

// Code splitting: lazy load the heavy client component
const CalculadorasHubClient = dynamic(() => import('./CalculadorasHubClient'), {
  loading: () => <CalculadorasSkeleton />,
});

// Loading skeleton for better UX during code splitting
function CalculadorasSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header skeleton */}
        <div className="mb-8 text-center">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        {/* Search skeleton */}
        <div className="mb-8 max-w-md mx-auto">
          <Skeleton className="h-12 w-full" />
        </div>
        {/* Calculator cards skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <Skeleton className="h-8 w-8 mb-4" />
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic_config = 'force-static';
export const dynamicParams = false;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CalculadorasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CalculadorasHubClient />;
}
