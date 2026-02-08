'use client';

import { SkeletonTable, SkeletonLine } from '@/lib/design-system/animations/loading';
import { PageContainer } from '@/app/components/Layout/Containers';

export default function Loading() {
  return (
    <div className="min-h-screen bg-paper-white dark:bg-carbon-950">
      <PageContainer className="py-12">
        {/* Header skeleton */}
        <div className="mb-12 border-b border-carbon-200 dark:border-carbon-800 pb-8">
          <div className="flex items-baseline gap-4 mb-2">
            <SkeletonLine width="280px" height="2.5rem" />
            <SkeletonLine width="120px" height="0.75rem" />
          </div>
          <SkeletonLine width="50%" height="1.125rem" />
        </div>

        {/* Toolbar skeleton */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SkeletonLine height="3rem" className="flex-1 rounded-lg" />
          <SkeletonLine width="160px" height="3rem" className="rounded-lg" />
        </div>

        {/* Therapeutic class tabs skeleton */}
        <div className="mb-12 flex gap-px overflow-hidden rounded-lg">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonLine key={i} width="110px" height="3.5rem" className="rounded-none" />
          ))}
        </div>

        {/* Compound ledger skeleton */}
        <div className="bg-white dark:bg-carbon-900 border border-carbon-200 dark:border-carbon-800 rounded-lg p-6">
          <SkeletonTable rows={10} columns={5} hasHeader />
        </div>
      </PageContainer>
    </div>
  );
}
