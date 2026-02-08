'use client';

import { SkeletonCard, SkeletonLine } from '@/lib/design-system/animations/loading';
import { PageContainer } from '@/app/components/Layout/Containers';

export default function Loading() {
  return (
    <div className="min-h-screen bg-phosphate dark:bg-carbon-900">
      <PageContainer className="py-8">
        {/* Header skeleton */}
        <div className="flex items-center gap-4 mb-8">
          <SkeletonLine width="4rem" height="4rem" className="rounded-2xl" />
          <div className="space-y-2">
            <SkeletonLine width="260px" height="1.875rem" />
            <SkeletonLine width="180px" height="1rem" />
          </div>
        </div>

        {/* Search skeleton */}
        <div className="mb-8 space-y-4">
          <SkeletonLine height="3.5rem" className="rounded-2xl" />
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <SkeletonLine key={i} width={`${80 + Math.random() * 60}px`} height="2.25rem" className="rounded-xl" />
            ))}
          </div>
        </div>

        {/* Results count */}
        <SkeletonLine width="140px" height="0.875rem" className="mb-6" />

        {/* Protocol cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} hasImage={false} textLines={4} className="rounded-2xl" />
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
