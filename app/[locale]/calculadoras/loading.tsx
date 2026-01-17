/**
 * Calculator grid loading skeleton
 * Matches the CalculadorasHubClient layout with header, stats, search, filters, and calculator cards
 */

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header Skeleton */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0071E3]/50 to-[#5E5CE6]/50 rounded-2xl animate-pulse" />
          <div>
            <div className="h-12 w-80 bg-neutral-200 dark:bg-neutral-700 rounded-lg mb-2 animate-pulse" />
            <div className="h-5 w-64 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
          </div>
        </div>

        {/* Disclaimer skeleton */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="w-5 h-5 bg-amber-300 dark:bg-amber-700 rounded animate-pulse flex-shrink-0" />
          <div className="flex-1">
            <div className="h-4 w-full bg-amber-200 dark:bg-amber-800/50 rounded mb-1 animate-pulse" />
            <div className="h-4 w-3/4 bg-amber-200 dark:bg-amber-800/50 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700"
          >
            <div className="w-16 h-8 bg-neutral-200 dark:bg-neutral-700 rounded mb-1 animate-pulse" />
            <div className="w-24 h-4 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Search and filters Skeleton */}
      <div className="space-y-4 mb-8">
        {/* Search bar skeleton */}
        <div className="w-full h-14 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl animate-pulse" />

        {/* Filters row skeleton */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category filters skeleton */}
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="w-28 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-xl animate-pulse"
              />
            ))}
          </div>

          {/* View mode skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg animate-pulse" />
            <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Section header skeleton */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 bg-[#0071E3]/50 rounded animate-pulse" />
        <div className="h-6 w-40 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
        <div className="h-4 w-8 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
      </div>

      {/* Calculator Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-700"
          >
            {/* Gradient header skeleton */}
            <div className="h-1.5 bg-gradient-to-r from-neutral-300 to-neutral-400 dark:from-neutral-600 dark:to-neutral-700 animate-pulse" />

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                {/* Icon skeleton */}
                <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl animate-pulse" />
                {/* Star skeleton */}
                <div className="w-8 h-8 bg-neutral-100 dark:bg-neutral-800 rounded-full animate-pulse" />
              </div>

              {/* Title skeleton */}
              <div className="h-6 w-24 bg-neutral-200 dark:bg-neutral-700 rounded mt-4 animate-pulse" />

              {/* Subtitle skeleton */}
              <div className="h-4 w-40 bg-neutral-100 dark:bg-neutral-800 rounded mt-2 animate-pulse" />

              {/* Description skeleton */}
              <div className="h-4 w-full bg-neutral-100 dark:bg-neutral-800 rounded mt-3 mb-1 animate-pulse" />
              <div className="h-4 w-3/4 bg-neutral-100 dark:bg-neutral-800 rounded mb-4 animate-pulse" />

              {/* Tags skeleton */}
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <div className="w-20 h-5 bg-neutral-100 dark:bg-neutral-800 rounded-full animate-pulse" />
                <div className="w-16 h-4 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
                <div className="w-16 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full animate-pulse" />
              </div>

              {/* Button skeleton */}
              <div className="w-full h-10 bg-[#0071E3]/30 rounded-xl animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Legacy link skeleton */}
      <div className="mt-12 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-6 w-64 bg-neutral-200 dark:bg-neutral-700 rounded mb-2 animate-pulse" />
            <div className="h-4 w-80 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
          </div>
          <div className="w-40 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
