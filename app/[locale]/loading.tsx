/**
 * Main locale loading skeleton
 * Displays while the home page content is loading
 */

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-blue-900 mb-16">
        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge skeleton */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-6">
              <div className="w-4 h-4 bg-white/30 rounded animate-pulse" />
              <div className="w-32 h-4 bg-white/30 rounded animate-pulse" />
            </div>

            {/* Title skeleton */}
            <div className="h-16 sm:h-20 bg-white/20 rounded-lg mb-6 animate-pulse" />

            {/* Subtitle skeleton */}
            <div className="h-8 bg-white/15 rounded-lg max-w-2xl mx-auto mb-8 animate-pulse" />

            {/* Buttons skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="w-48 h-14 bg-white/30 rounded-xl animate-pulse" />
              <div className="w-48 h-14 bg-white/10 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section Skeleton */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-neutral-100 dark:bg-neutral-800/50 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-neutral-300 dark:bg-neutral-600 rounded-xl animate-pulse" />
                <div className="flex-1">
                  <div className="w-16 h-8 bg-neutral-300 dark:bg-neutral-600 rounded animate-pulse mb-2" />
                  <div className="w-24 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
                </div>
              </div>
              <div className="w-full h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="container mx-auto px-4 mb-16">
        <div className="w-48 h-8 bg-neutral-200 dark:bg-neutral-700 rounded mb-6 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="w-12 h-12 bg-neutral-300 dark:bg-neutral-600 rounded-xl mx-auto mb-4 animate-pulse" />
              <div className="w-24 h-4 bg-neutral-200 dark:bg-neutral-700 rounded mx-auto animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
