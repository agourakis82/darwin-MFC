/**
 * Protocol list loading skeleton
 * Matches the ProtocolosPage layout with header, search, category pills, and protocol cards
 */

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500/50 to-indigo-600/50 rounded-2xl animate-pulse" />
          <div>
            <div className="h-9 w-64 bg-neutral-200 dark:bg-neutral-700 rounded-lg mb-2 animate-pulse" />
            <div className="h-5 w-48 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
          </div>
        </div>

        {/* Search & Filters Skeleton */}
        <div className="mb-8 space-y-4">
          {/* Search skeleton */}
          <div className="w-full h-14 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl animate-pulse" />

          {/* Category Pills skeleton */}
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div
                key={i}
                className="w-28 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Results Count skeleton */}
        <div className="h-4 w-36 bg-neutral-100 dark:bg-neutral-800 rounded mb-6 animate-pulse" />

        {/* Protocol Cards Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-700"
            >
              {/* Gradient header skeleton */}
              <div className="h-2 bg-gradient-to-r from-neutral-300 to-neutral-400 dark:from-neutral-600 dark:to-neutral-700 animate-pulse" />

              <div className="p-6">
                {/* Title skeleton */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="h-6 w-48 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
                  <div className="w-5 h-5 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
                </div>

                {/* Subtitle skeleton */}
                <div className="h-4 w-40 bg-neutral-100 dark:bg-neutral-800 rounded mb-4 animate-pulse" />

                {/* Description skeleton */}
                <div className="h-4 w-full bg-neutral-100 dark:bg-neutral-800 rounded mb-1 animate-pulse" />
                <div className="h-4 w-3/4 bg-neutral-100 dark:bg-neutral-800 rounded mb-4 animate-pulse" />

                {/* Meta skeleton */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-24 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse" />
                  <div className="w-20 h-4 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse" />
                </div>

                {/* Tags skeleton */}
                <div className="flex flex-wrap gap-1.5">
                  {[1, 2, 3, 4].map((j) => (
                    <div
                      key={j}
                      className="w-16 h-6 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box Skeleton */}
        <div className="mt-12 p-6 bg-neutral-100 dark:bg-neutral-900/50 rounded-2xl border border-neutral-200 dark:border-neutral-700">
          <div className="h-6 w-48 bg-neutral-200 dark:bg-neutral-700 rounded mb-3 animate-pulse" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
