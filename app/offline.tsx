/**
 * Offline Fallback Page
 * Displayed when network is unavailable
 */

import { WifiOff, RefreshCw, Home } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
            <div className="relative bg-white dark:bg-neutral-800 rounded-full p-6 shadow-lg">
              <WifiOff className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            You're Offline
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            It looks like you've lost your internet connection. Don't worry, you can still access cached content and your data will sync when you're back online.
          </p>
        </div>

        {/* Cached Content Info */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-left">
          <h2 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            What you can do:
          </h2>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>✓ Review previously viewed diseases and medications</li>
            <li>✓ Continue studying with flashcards</li>
            <li>✓ Check your gamification progress</li>
            <li>✓ Read cached articles and guidelines</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Connection
          </button>

          <a
            href="/"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-neutral-100 font-medium rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </a>
        </div>

        {/* Footer Message */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-700">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Your learning progress is automatically saved. Once you're back online, everything will sync seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
}
