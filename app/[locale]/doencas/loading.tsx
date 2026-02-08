'use client';

import { SkeletonTable, SkeletonLine } from '@/lib/design-system/animations/loading';
import { PageContainer } from '@/app/components/Layout/Containers';

export default function Loading() {
  return (
    <div className="min-h-screen bg-paper-white dark:bg-carbon-950">
      <PageContainer className="py-12">
        {/* Header skeleton */}
        <div className="mb-12 border-b border-carbon-200 dark:border-carbon-800 pb-8">
          <SkeletonLine width="40%" height="2.5rem" className="mb-3" />
          <SkeletonLine width="60%" height="1rem" />
        </div>

        {/* Toolbar skeleton */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SkeletonLine height="3rem" className="flex-1 rounded-lg" />
          <SkeletonLine width="140px" height="3rem" className="rounded-lg" />
        </div>

        {/* Tab bar skeleton */}
        <div className="mb-12 flex gap-px">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonLine key={i} width="120px" height="3.25rem" className="rounded-none first:rounded-l-lg last:rounded-r-lg" />
          ))}
        </div>

        {/* Table skeleton */}
        <div className="bg-white dark:bg-carbon-900 border border-carbon-200 dark:border-carbon-800 rounded-lg p-6">
          <SkeletonTable rows={8} columns={5} hasHeader />
        </div>
      </PageContainer>
    </div>
  );
}
