import { locales } from '@/i18n/config';
import { setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/app/components/ui/Skeleton';

// Code splitting: lazy load the heavy client component
const DoencasClient = dynamic(() => import('./DoencasClient'), {
  loading: () => <DoencasSkeleton />,
});

// Loading skeleton for better UX during code splitting
function DoencasSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>
        {/* Search/filter skeleton */}
        <div className="mb-6 flex gap-4">
          <Skeleton className="h-12 flex-1 max-w-md" />
          <Skeleton className="h-12 w-32" />
        </div>
        {/* Category cards skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-4 w-1/2 mb-2" />
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

export default async function DoencasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DoencasClient />;
}
