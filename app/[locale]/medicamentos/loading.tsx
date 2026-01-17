/**
 * Medication list loading skeleton
 * Matches the MedicamentosPage layout with header, search, filters, and card grid
 */

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header Skeleton */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/50 to-teal-600/50 rounded-2xl animate-pulse" />
          <div>
            <div className="h-12 w-72 bg-neutral-200 dark:bg-neutral-700 rounded-lg mb-2 animate-pulse" />
            <div className="h-5 w-48 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
          </div>
        </div>

        {/* Info box skeleton */}
        <div className="rounded-2xl p-5 border border-emerald-500/30 bg-neutral-100 dark:bg-neutral-800/50">
          <div className="h-5 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
        </div>
      </div>

      {/* Search Bar Skeleton */}
      <div className="mb-6">
        <div className="w-full h-14 bg-white/50 dark:bg-neutral-800/50 border border-neutral-300/50 dark:border-neutral-600/50 rounded-xl animate-pulse" />
      </div>

      {/* Filters Skeleton */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="w-32 h-10 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl animate-pulse" />
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="w-28 h-10 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Medication Cards Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 bg-white/80 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                {/* Drug name skeleton */}
                <div className="h-6 w-40 bg-neutral-200 dark:bg-neutral-700 rounded mb-2 animate-pulse" />
                {/* Commercial names skeleton */}
                <div className="h-4 w-32 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
              </div>
              <div className="w-16 h-6 bg-emerald-500/20 rounded-full animate-pulse" />
            </div>

            {/* Badges skeleton */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="w-20 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse" />
              <div className="w-16 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse" />
            </div>

            {/* Indications skeleton */}
            <div className="h-4 w-full bg-neutral-100 dark:bg-neutral-800 rounded mb-1 animate-pulse" />
            <div className="h-4 w-3/4 bg-neutral-100 dark:bg-neutral-800 rounded mb-4 animate-pulse" />

            {/* Quick info skeleton */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-4 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
              <div className="w-20 h-4 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
              <div className="w-4 h-4 bg-neutral-200 dark:bg-neutral-700 rounded ml-auto animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Section Skeleton */}
      <div className="mt-16">
        <div className="h-7 w-56 bg-neutral-200 dark:bg-neutral-700 rounded mb-6 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-xl p-4 text-center bg-neutral-100 dark:bg-neutral-800/50"
            >
              <div className="w-8 h-8 bg-neutral-300 dark:bg-neutral-600 rounded mx-auto mb-2 animate-pulse" />
              <div className="w-8 h-6 bg-neutral-200 dark:bg-neutral-700 rounded mx-auto mb-1 animate-pulse" />
              <div className="w-16 h-3 bg-neutral-200 dark:bg-neutral-700 rounded mx-auto animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
