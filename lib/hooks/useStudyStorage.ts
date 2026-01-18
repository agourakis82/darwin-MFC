/**
 * DARWIN-MFC Study Storage Hook
 * =============================
 *
 * React hook for accessing IndexedDB study storage.
 * Handles initialization, loading states, and error management.
 * Safe for SSR contexts - operations are no-ops on the server.
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  clearAllData,
  deletePreference,
  deleteStudyCard,
  exportData,
  getCardsByType,
  getDueCards,
  getPreference,
  getQuizHistory,
  getQuizHistoryByQuizId,
  getSessions,
  getSessionsByDateRange,
  getStorageStats,
  getStudyCardById,
  getStudyCards,
  importData,
  initDatabase,
  isUsingFallback,
  QuizResult,
  savePreference,
  saveQuizResult,
  saveSession,
  saveStudyCard,
  saveStudyCards,
  StorageError,
  StorageErrorCode,
  StudyCard,
  StudySession,
} from '../storage/indexed-db';

// =============================================================================
// TYPES
// =============================================================================

export interface UseStudyStorageState {
  /** Whether the storage is being initialized */
  isLoading: boolean;
  /** Whether the storage has been initialized successfully */
  isReady: boolean;
  /** Current error, if any */
  error: StorageError | null;
  /** Whether we're using fallback localStorage storage */
  isUsingFallback: boolean;
}

export interface UseStudyStorageReturn extends UseStudyStorageState {
  // Card operations
  /** Save a study card (create or update) */
  saveCard: (card: StudyCard) => Promise<void>;
  /** Save multiple study cards in a single transaction */
  saveCards: (cards: StudyCard[]) => Promise<void>;
  /** Get all study cards */
  getCards: () => Promise<StudyCard[]>;
  /** Get a single card by ID */
  getCardById: (id: string) => Promise<StudyCard | undefined>;
  /** Delete a study card */
  deleteCard: (id: string) => Promise<void>;
  /** Get cards due for review */
  getDueCards: (date?: Date) => Promise<StudyCard[]>;
  /** Get cards by type */
  getCardsByType: (type: StudyCard['type']) => Promise<StudyCard[]>;

  // Session operations
  /** Save a study session */
  saveSession: (session: StudySession) => Promise<void>;
  /** Get study sessions, optionally limited */
  getSessions: (limit?: number) => Promise<StudySession[]>;
  /** Get sessions within a date range */
  getSessionsByDateRange: (startDate: Date, endDate: Date) => Promise<StudySession[]>;

  // Quiz operations
  /** Save a quiz result */
  saveQuizResult: (result: QuizResult) => Promise<void>;
  /** Get quiz history, optionally limited */
  getQuizHistory: (limit?: number) => Promise<QuizResult[]>;
  /** Get quiz history for a specific quiz */
  getQuizHistoryByQuizId: (quizId: string) => Promise<QuizResult[]>;

  // Preference operations
  /** Save a user preference */
  savePreference: <T>(key: string, value: T) => Promise<void>;
  /** Get a user preference */
  getPreference: <T>(key: string) => Promise<T | undefined>;
  /** Delete a user preference */
  deletePreference: (key: string) => Promise<void>;

  // Data management
  /** Clear all data from storage */
  clearAllData: () => Promise<void>;
  /** Export all data as JSON string */
  exportData: () => Promise<string>;
  /** Import data from JSON string */
  importData: (json: string) => Promise<void>;
  /** Get storage statistics */
  getStorageStats: () => Promise<{
    cardCount: number;
    sessionCount: number;
    quizCount: number;
    dueCardCount: number;
    isUsingFallback: boolean;
    estimatedSize?: number;
  }>;

  // Utility
  /** Retry initialization after an error */
  retry: () => Promise<void>;
  /** Clear the current error */
  clearError: () => void;
}

// =============================================================================
// HOOK IMPLEMENTATION
// =============================================================================

/**
 * React hook for accessing study storage (IndexedDB with localStorage fallback)
 *
 * @example
 * ```tsx
 * function StudyComponent() {
 *   const { isLoading, isReady, error, saveCard, getCards, getDueCards } = useStudyStorage();
 *
 *   useEffect(() => {
 *     if (isReady) {
 *       getDueCards().then(cards => {
 *         console.log('Due for review:', cards.length);
 *       });
 *     }
 *   }, [isReady, getDueCards]);
 *
 *   if (isLoading) return <Loading />;
 *   if (error) return <Error message={error.message} />;
 *
 *   return <StudyUI />;
 * }
 * ```
 */
export function useStudyStorage(): UseStudyStorageReturn {
  const [state, setState] = useState<UseStudyStorageState>({
    isLoading: true,
    isReady: false,
    error: null,
    isUsingFallback: false,
  });

  const initAttemptedRef = useRef(false);
  const mountedRef = useRef(true);

  // Safe state setter that checks if component is mounted
  const safeSetState = useCallback((newState: Partial<UseStudyStorageState>) => {
    if (mountedRef.current) {
      setState((prev) => ({ ...prev, ...newState }));
    }
  }, []);

  // Initialize storage
  const initialize = useCallback(async () => {
    // Skip initialization on server
    if (typeof window === 'undefined') {
      safeSetState({ isLoading: false, isReady: false });
      return;
    }

    safeSetState({ isLoading: true, error: null });

    try {
      await initDatabase();
      safeSetState({
        isLoading: false,
        isReady: true,
        error: null,
        isUsingFallback: isUsingFallback(),
      });
    } catch (e) {
      // If IndexedDB is not supported, we fall back to localStorage
      // This is not a fatal error - we can still use the storage
      if (e instanceof StorageError && e.code === 'NOT_SUPPORTED') {
        safeSetState({
          isLoading: false,
          isReady: true, // Still ready with fallback
          error: null,
          isUsingFallback: true,
        });
      } else {
        safeSetState({
          isLoading: false,
          isReady: false,
          error:
            e instanceof StorageError
              ? e
              : new StorageError(
                  e instanceof Error ? e.message : 'Unknown error',
                  'INIT_FAILED',
                  e
                ),
          isUsingFallback: isUsingFallback(),
        });
      }
    }
  }, [safeSetState]);

  // Initialize on mount
  useEffect(() => {
    mountedRef.current = true;

    if (!initAttemptedRef.current) {
      initAttemptedRef.current = true;
      initialize();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [initialize]);

  // Wrap async operations with error handling
  const wrapOperation = useCallback(
    <T>(operation: () => Promise<T>): Promise<T> => {
      return operation().catch((e) => {
        const error =
          e instanceof StorageError
            ? e
            : new StorageError(
                e instanceof Error ? e.message : 'Operation failed',
                'TRANSACTION_FAILED',
                e
              );

        // Update state with error but don't throw - let caller handle
        safeSetState({ error });
        throw error;
      });
    },
    [safeSetState]
  );

  // Card operations
  const saveCardOp = useCallback(
    (card: StudyCard) => wrapOperation(() => saveStudyCard(card)),
    [wrapOperation]
  );

  const saveCardsOp = useCallback(
    (cards: StudyCard[]) => wrapOperation(() => saveStudyCards(cards)),
    [wrapOperation]
  );

  const getCardsOp = useCallback(
    () => wrapOperation(() => getStudyCards()),
    [wrapOperation]
  );

  const getCardByIdOp = useCallback(
    (id: string) => wrapOperation(() => getStudyCardById(id)),
    [wrapOperation]
  );

  const deleteCardOp = useCallback(
    (id: string) => wrapOperation(() => deleteStudyCard(id)),
    [wrapOperation]
  );

  const getDueCardsOp = useCallback(
    (date?: Date) => wrapOperation(() => getDueCards(date)),
    [wrapOperation]
  );

  const getCardsByTypeOp = useCallback(
    (type: StudyCard['type']) => wrapOperation(() => getCardsByType(type)),
    [wrapOperation]
  );

  // Session operations
  const saveSessionOp = useCallback(
    (session: StudySession) => wrapOperation(() => saveSession(session)),
    [wrapOperation]
  );

  const getSessionsOp = useCallback(
    (limit?: number) => wrapOperation(() => getSessions(limit)),
    [wrapOperation]
  );

  const getSessionsByDateRangeOp = useCallback(
    (startDate: Date, endDate: Date) =>
      wrapOperation(() => getSessionsByDateRange(startDate, endDate)),
    [wrapOperation]
  );

  // Quiz operations
  const saveQuizResultOp = useCallback(
    (result: QuizResult) => wrapOperation(() => saveQuizResult(result)),
    [wrapOperation]
  );

  const getQuizHistoryOp = useCallback(
    (limit?: number) => wrapOperation(() => getQuizHistory(limit)),
    [wrapOperation]
  );

  const getQuizHistoryByQuizIdOp = useCallback(
    (quizId: string) => wrapOperation(() => getQuizHistoryByQuizId(quizId)),
    [wrapOperation]
  );

  // Preference operations
  const savePreferenceOp = useCallback(
    <T>(key: string, value: T) => wrapOperation(() => savePreference(key, value)),
    [wrapOperation]
  );

  const getPreferenceOp = useCallback(
    <T>(key: string) => wrapOperation(() => getPreference<T>(key)),
    [wrapOperation]
  );

  const deletePreferenceOp = useCallback(
    (key: string) => wrapOperation(() => deletePreference(key)),
    [wrapOperation]
  );

  // Data management
  const clearAllDataOp = useCallback(
    () => wrapOperation(() => clearAllData()),
    [wrapOperation]
  );

  const exportDataOp = useCallback(
    () => wrapOperation(() => exportData()),
    [wrapOperation]
  );

  const importDataOp = useCallback(
    (json: string) => wrapOperation(() => importData(json)),
    [wrapOperation]
  );

  const getStorageStatsOp = useCallback(
    () => wrapOperation(() => getStorageStats()),
    [wrapOperation]
  );

  // Utility functions
  const retry = useCallback(async () => {
    initAttemptedRef.current = false;
    await initialize();
  }, [initialize]);

  const clearError = useCallback(() => {
    safeSetState({ error: null });
  }, [safeSetState]);

  return {
    // State
    isLoading: state.isLoading,
    isReady: state.isReady,
    error: state.error,
    isUsingFallback: state.isUsingFallback,

    // Card operations
    saveCard: saveCardOp,
    saveCards: saveCardsOp,
    getCards: getCardsOp,
    getCardById: getCardByIdOp,
    deleteCard: deleteCardOp,
    getDueCards: getDueCardsOp,
    getCardsByType: getCardsByTypeOp,

    // Session operations
    saveSession: saveSessionOp,
    getSessions: getSessionsOp,
    getSessionsByDateRange: getSessionsByDateRangeOp,

    // Quiz operations
    saveQuizResult: saveQuizResultOp,
    getQuizHistory: getQuizHistoryOp,
    getQuizHistoryByQuizId: getQuizHistoryByQuizIdOp,

    // Preference operations
    savePreference: savePreferenceOp,
    getPreference: getPreferenceOp,
    deletePreference: deletePreferenceOp,

    // Data management
    clearAllData: clearAllDataOp,
    exportData: exportDataOp,
    importData: importDataOp,
    getStorageStats: getStorageStatsOp,

    // Utility
    retry,
    clearError,
  };
}

// =============================================================================
// ADDITIONAL HOOKS
// =============================================================================

/**
 * Hook for tracking due cards count
 * Useful for showing notifications or badges
 */
export function useDueCardsCount(): {
  count: number;
  isLoading: boolean;
  error: StorageError | null;
  refresh: () => Promise<void>;
} {
  const { isReady, getDueCards, error } = useStudyStorage();
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const mountedRef = useRef(true);

  const refresh = useCallback(async () => {
    if (!isReady) return;

    setIsLoading(true);
    try {
      const cards = await getDueCards();
      if (mountedRef.current) {
        setCount(cards.length);
      }
    } catch {
      // Error is handled by useStudyStorage
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [isReady, getDueCards]);

  useEffect(() => {
    mountedRef.current = true;
    if (isReady) {
      refresh();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [isReady, refresh]);

  return { count, isLoading, error, refresh };
}

/**
 * Hook for tracking storage statistics
 */
export function useStorageStats(): {
  stats: {
    cardCount: number;
    sessionCount: number;
    quizCount: number;
    dueCardCount: number;
    isUsingFallback: boolean;
    estimatedSize?: number;
  } | null;
  isLoading: boolean;
  error: StorageError | null;
  refresh: () => Promise<void>;
} {
  const { isReady, getStorageStats, error } = useStudyStorage();
  const [stats, setStats] = useState<{
    cardCount: number;
    sessionCount: number;
    quizCount: number;
    dueCardCount: number;
    isUsingFallback: boolean;
    estimatedSize?: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mountedRef = useRef(true);

  const refresh = useCallback(async () => {
    if (!isReady) return;

    setIsLoading(true);
    try {
      const data = await getStorageStats();
      if (mountedRef.current) {
        setStats(data);
      }
    } catch {
      // Error is handled by useStudyStorage
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [isReady, getStorageStats]);

  useEffect(() => {
    mountedRef.current = true;
    if (isReady) {
      refresh();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [isReady, refresh]);

  return { stats, isLoading, error, refresh };
}

/**
 * Hook for managing a single study card
 */
export function useStudyCard(cardId: string | undefined): {
  card: StudyCard | null;
  isLoading: boolean;
  error: StorageError | null;
  save: (card: StudyCard) => Promise<void>;
  remove: () => Promise<void>;
  refresh: () => Promise<void>;
} {
  const { isReady, getCardById, saveCard, deleteCard, error } = useStudyStorage();
  const [card, setCard] = useState<StudyCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mountedRef = useRef(true);

  const refresh = useCallback(async () => {
    if (!isReady || !cardId) {
      setCard(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const data = await getCardById(cardId);
      if (mountedRef.current) {
        setCard(data || null);
      }
    } catch {
      // Error is handled by useStudyStorage
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [isReady, cardId, getCardById]);

  const save = useCallback(
    async (cardData: StudyCard) => {
      await saveCard(cardData);
      if (mountedRef.current) {
        setCard(cardData);
      }
    },
    [saveCard]
  );

  const remove = useCallback(async () => {
    if (!cardId) return;
    await deleteCard(cardId);
    if (mountedRef.current) {
      setCard(null);
    }
  }, [cardId, deleteCard]);

  useEffect(() => {
    mountedRef.current = true;
    refresh();
    return () => {
      mountedRef.current = false;
    };
  }, [refresh]);

  return { card, isLoading, error, save, remove, refresh };
}

export default useStudyStorage;
