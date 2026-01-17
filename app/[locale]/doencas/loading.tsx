/**
 * Disease list loading skeleton
 * Matches the DoencasPage layout with search, filters, and card grid
 */

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-9 w-64 bg-neutral-200 dark:bg-neutral-700 rounded-lg mb-2 animate-pulse" />
        <div className="h-5 w-48 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
      </div>

      {/* Search + Filter Row Skeleton */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <div className="w-full h-12 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl animate-pulse" />
        </div>
        <div className="w-24 h-12 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl animate-pulse" />
      </div>

      {/* Results Count Skeleton */}
      <div className="h-4 w-32 bg-neutral-100 dark:bg-neutral-800 rounded mb-4 animate-pulse" />

      {/* Disease Cards Grid Skeleton */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700"
          >
            <div className="flex items-start gap-3">
              {/* Icon skeleton */}
              <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-600 rounded-lg flex-shrink-0 animate-pulse" />

              <div className="flex-1 min-w-0">
                {/* Title skeleton */}
                <div className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2 animate-pulse" />

                {/* Description skeleton */}
                <div className="h-4 w-full bg-neutral-100 dark:bg-neutral-800 rounded mb-1 animate-pulse" />
                <div className="h-4 w-2/3 bg-neutral-100 dark:bg-neutral-800 rounded mb-3 animate-pulse" />

                {/* Tags skeleton */}
                <div className="flex gap-1 mb-2">
                  <div className="h-5 w-12 bg-blue-50 dark:bg-blue-900/20 rounded animate-pulse" />
                  <div className="h-5 w-16 bg-blue-50 dark:bg-blue-900/20 rounded animate-pulse" />
                </div>

                {/* Code badges skeleton */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="h-5 w-12 bg-neutral-100 dark:bg-neutral-700 rounded animate-pulse" />
                    <div className="h-5 w-14 bg-neutral-100 dark:bg-neutral-700 rounded animate-pulse" />
                  </div>
                  <div className="w-4 h-4 bg-neutral-200 dark:bg-neutral-600 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
