'use client';

/**
 * OFFLINE INDICATOR COMPONENT - DARWIN-MFC
 * =========================================
 *
 * Displays a small banner when the user is offline.
 * Automatically detects online/offline status using
 * navigator.onLine and 'online'/'offline' events.
 *
 * Features:
 * - Real-time online/offline detection
 * - Smooth animations for state transitions
 * - Auto-dismissing "Back online" notification
 * - Accessible with proper ARIA attributes
 * - Dark mode compatible styling
 *
 * @example
 * ```tsx
 * import OfflineIndicator from '@/app/components/Layout/OfflineIndicator';
 *
 * function App() {
 *   return (
 *     <>
 *       <OfflineIndicator />
 *       {children}
 *     </>
 *   );
 * }
 * ```
 */

import { useState, useEffect, useCallback } from 'react';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

type ConnectionStatus = 'online' | 'offline' | 'reconnected';

interface OfflineIndicatorProps {
  /** Position of the indicator on screen */
  position?: 'top' | 'bottom';
  /** Duration to show the "reconnected" message (ms) */
  reconnectedDuration?: number;
  /** Custom class name for the container */
  className?: string;
  /** Whether to show the indicator (can be controlled externally) */
  show?: boolean;
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function OfflineIndicator({
  position = 'bottom',
  reconnectedDuration = 3000,
  className = '',
  show,
}: OfflineIndicatorProps) {
  // Track connection status
  const [status, setStatus] = useState<ConnectionStatus>('online');

  // Track if component is mounted (for SSR safety)
  const [isMounted, setIsMounted] = useState(false);

  /**
   * Handle going online
   */
  const handleOnline = useCallback(() => {
    setStatus('reconnected');

    // After showing "reconnected" message, go back to online
    const timeout = setTimeout(() => {
      setStatus('online');
    }, reconnectedDuration);

    return () => clearTimeout(timeout);
  }, [reconnectedDuration]);

  /**
   * Handle going offline
   */
  const handleOffline = useCallback(() => {
    setStatus('offline');
  }, []);

  /**
   * Initialize status and set up event listeners
   */
  useEffect(() => {
    // Mark as mounted (SSR safety)
    setIsMounted(true);

    // Check if window is available (SSR safety)
    if (typeof window === 'undefined') {
      return;
    }

    // Set initial status based on navigator.onLine
    setStatus(navigator.onLine ? 'online' : 'offline');

    // Add event listeners for online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOnline, handleOffline]);

  // Don't render anything during SSR
  if (!isMounted) {
    return null;
  }

  // If externally controlled and hidden, return null
  if (show === false) {
    return null;
  }

  // Don't show anything when online (and not showing reconnected message)
  if (status === 'online' && show !== true) {
    return null;
  }

  // Determine position classes
  const positionClasses = position === 'top'
    ? 'top-4'
    : 'bottom-4';

  return (
    <div
      className={`
        fixed left-1/2 -translate-x-1/2 z-50
        ${positionClasses}
        ${className}
      `}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {status === 'offline' && (
        <div
          className="
            flex items-center gap-2
            px-4 py-2
            bg-amber-600 dark:bg-amber-700
            text-white
            rounded-full
            shadow-lg
            animate-slide-up
          "
        >
          {/* Offline Icon */}
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3"
            />
          </svg>
          <span className="text-sm font-medium whitespace-nowrap">
            Offline - Using cached data
          </span>
        </div>
      )}

      {status === 'reconnected' && (
        <div
          className="
            flex items-center gap-2
            px-4 py-2
            bg-emerald-600 dark:bg-emerald-700
            text-white
            rounded-full
            shadow-lg
            animate-slide-up
          "
        >
          {/* Online Icon */}
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
            />
          </svg>
          <span className="text-sm font-medium whitespace-nowrap">
            Back online
          </span>
        </div>
      )}

      {/* Inline styles for animations (Tailwind-compatible) */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }

        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// =============================================================================
// HOOK FOR PROGRAMMATIC ACCESS
// =============================================================================

/**
 * Hook to track online/offline status.
 *
 * @returns Object with isOnline boolean and status string
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isOnline, status } = useOnlineStatus();
 *
 *   if (!isOnline) {
 *     return <p>You are offline</p>;
 *   }
 *
 *   return <p>Online</p>;
 * }
 * ```
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [status, setStatus] = useState<ConnectionStatus>('online');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Set initial status
    setIsOnline(navigator.onLine);
    setStatus(navigator.onLine ? 'online' : 'offline');

    const handleOnline = () => {
      setIsOnline(true);
      setStatus('reconnected');
      setTimeout(() => setStatus('online'), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, status };
}
