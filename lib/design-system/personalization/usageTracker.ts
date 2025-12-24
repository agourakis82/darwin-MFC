/**
 * USAGE TRACKER
 * ==============
 *
 * Automatic usage tracking utilities and hooks
 * Privacy-first analytics with 100% local storage
 *
 * Features:
 * - Page view tracking
 * - Click event tracking
 * - Time spent tracking
 * - Search query tracking
 * - Session management
 * - Automatic pattern detection
 */

import { useEffect, useRef, useCallback } from 'react';
import { useUserPreferences } from './userPreferencesStore';

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================

const SESSION_STORAGE_KEY = 'darwin-mfc-session';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

interface Session {
  id: string;
  startTime: number;
  lastActivityTime: number;
  pageViews: number;
}

class SessionManager {
  private session: Session | null = null;

  constructor() {
    this.loadSession();
  }

  private loadSession(): void {
    if (typeof window === 'undefined') return;

    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        const session: Session = JSON.parse(stored);
        const now = Date.now();

        // Check if session is still valid
        if (now - session.lastActivityTime < SESSION_TIMEOUT) {
          this.session = session;
        } else {
          this.startNewSession();
        }
      } else {
        this.startNewSession();
      }
    } catch (error) {
      console.error('Failed to load session:', error);
      this.startNewSession();
    }
  }

  private saveSession(): void {
    if (typeof window === 'undefined' || !this.session) return;

    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(this.session));
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  }

  startNewSession(): void {
    this.session = {
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      startTime: Date.now(),
      lastActivityTime: Date.now(),
      pageViews: 0,
    };
    this.saveSession();
  }

  updateActivity(): void {
    if (!this.session) {
      this.startNewSession();
      return;
    }

    this.session.lastActivityTime = Date.now();
    this.saveSession();
  }

  incrementPageViews(): void {
    if (!this.session) {
      this.startNewSession();
    }

    if (this.session) {
      this.session.pageViews += 1;
      this.updateActivity();
    }
  }

  getSessionDuration(): number {
    if (!this.session) return 0;
    return Math.floor((Date.now() - this.session.startTime) / 1000 / 60); // minutes
  }

  getSessionId(): string | null {
    return this.session?.id || null;
  }
}

const sessionManager = new SessionManager();

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Track page view and time spent on page
 */
export function usePageTracking(
  category: string,
  itemId: string,
  itemTitle?: string,
  metadata?: Record<string, any>
) {
  const trackInteraction = useUserPreferences((state) => state.trackInteraction);
  const updateContentPreference = useUserPreferences(
    (state) => state.updateContentPreference
  );
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Track page view
    trackInteraction({
      type: 'view',
      category,
      itemId,
      itemTitle,
      metadata,
    });

    updateContentPreference(category, true);

    // Update session
    sessionManager.incrementPageViews();

    // Track time spent on unmount
    return () => {
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (timeSpent > 3) {
        // Only track if spent more than 3 seconds
        updateContentPreference(category, false, timeSpent);
      }
    };
  }, [category, itemId, itemTitle, trackInteraction, updateContentPreference, metadata]);
}

/**
 * Track click events
 */
export function useClickTracking() {
  const trackInteraction = useUserPreferences((state) => state.trackInteraction);

  return useCallback(
    (
      category: string,
      itemId: string,
      itemTitle?: string,
      metadata?: Record<string, any>
    ) => {
      trackInteraction({
        type: 'click',
        category,
        itemId,
        itemTitle,
        metadata,
      });

      sessionManager.updateActivity();
    },
    [trackInteraction]
  );
}

/**
 * Track search queries
 */
export function useSearchTracking() {
  const trackInteraction = useUserPreferences((state) => state.trackInteraction);

  return useCallback(
    (query: string, category: string, resultsCount?: number) => {
      trackInteraction({
        type: 'search',
        category,
        itemId: query,
        itemTitle: query,
        metadata: {
          resultsCount,
        },
      });

      sessionManager.updateActivity();
    },
    [trackInteraction]
  );
}

/**
 * Track favorite actions
 */
export function useFavoriteTracking() {
  const trackInteraction = useUserPreferences((state) => state.trackInteraction);
  const updateContentPreference = useUserPreferences(
    (state) => state.updateContentPreference
  );

  return useCallback(
    (
      category: string,
      itemId: string,
      itemTitle?: string,
      favorited?: boolean
    ) => {
      trackInteraction({
        type: 'favorite',
        category,
        itemId,
        itemTitle,
        metadata: {
          favorited,
        },
      });

      // Boost content preference score significantly for favorites
      if (favorited) {
        updateContentPreference(category, true, 60); // Simulate 60s time spent
      }

      sessionManager.updateActivity();
    },
    [trackInteraction, updateContentPreference]
  );
}

/**
 * Track navigation events
 */
export function useNavigationTracking() {
  const trackInteraction = useUserPreferences((state) => state.trackInteraction);

  return useCallback(
    (
      category: string,
      itemId: string,
      itemTitle?: string,
      url?: string
    ) => {
      trackInteraction({
        type: 'navigate',
        category,
        itemId,
        itemTitle,
        metadata: {
          url,
        },
      });

      sessionManager.updateActivity();
    },
    [trackInteraction]
  );
}

/**
 * Track note creation
 */
export function useNoteTracking() {
  const trackInteraction = useUserPreferences((state) => state.trackInteraction);
  const updateContentPreference = useUserPreferences(
    (state) => state.updateContentPreference
  );

  return useCallback(
    (
      category: string,
      itemId: string,
      itemTitle?: string,
      noteLength?: number
    ) => {
      trackInteraction({
        type: 'note',
        category,
        itemId,
        itemTitle,
        metadata: {
          noteLength,
        },
      });

      // Boost content preference for items with notes
      updateContentPreference(category, true, 45);

      sessionManager.updateActivity();
    },
    [trackInteraction, updateContentPreference]
  );
}

/**
 * Update usage patterns periodically
 */
export function usePatternUpdater(intervalMinutes: number = 5) {
  const updateUsagePattern = useUserPreferences((state) => state.updateUsagePattern);
  const learningEnabled = useUserPreferences((state) => state.learningEnabled);

  useEffect(() => {
    if (!learningEnabled) return;

    const interval = setInterval(() => {
      updateUsagePattern();
    }, intervalMinutes * 60 * 1000);

    return () => clearInterval(interval);
  }, [updateUsagePattern, learningEnabled, intervalMinutes]);
}

/**
 * Session duration tracker
 */
export function useSessionDuration(): number {
  const [duration, setDuration] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDuration(sessionManager.getSessionDuration());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return duration;
}

// ============================================================================
// ANALYTICS HELPERS
// ============================================================================

export function getSessionId(): string | null {
  return sessionManager.getSessionId();
}

export function getSessionDuration(): number {
  return sessionManager.getSessionDuration();
}

export function startNewSession(): void {
  sessionManager.startNewSession();
}

// ============================================================================
// DEBOUNCE HELPER FOR TRACKING
// ============================================================================

export function debounceTracking<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 300
): T {
  let timeoutId: NodeJS.Timeout;

  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ============================================================================
// BATCH TRACKING (For performance)
// ============================================================================

class BatchTracker {
  private queue: Array<() => void> = [];
  private flushInterval: NodeJS.Timeout | null = null;
  private readonly BATCH_SIZE = 10;
  private readonly FLUSH_INTERVAL = 5000; // 5 seconds

  constructor() {
    this.startFlushing();
  }

  add(trackFn: () => void): void {
    this.queue.push(trackFn);

    if (this.queue.length >= this.BATCH_SIZE) {
      this.flush();
    }
  }

  flush(): void {
    if (this.queue.length === 0) return;

    const batch = [...this.queue];
    this.queue = [];

    // Execute all tracking functions
    batch.forEach((fn) => {
      try {
        fn();
      } catch (error) {
        console.error('Tracking error:', error);
      }
    });
  }

  private startFlushing(): void {
    this.flushInterval = setInterval(() => {
      this.flush();
    }, this.FLUSH_INTERVAL);
  }

  destroy(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    this.flush();
  }
}

export const batchTracker = new BatchTracker();

// Clean up on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    batchTracker.flush();
  });
}

import React from 'react';
