/**
 * REACT HOOKS FOR PROGRESS TRACKING
 * ===================================
 *
 * Custom hooks for user progress, XP, badges, and learning.
 * Falls back gracefully when Supabase is not configured.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import {
  updateProgressInSupabase,
  getProgressFromSupabase,
  getAllProgressFromSupabase,
  getCompletedCountFromSupabase,
  getUserXPFromSupabase,
  awardXPInSupabase,
  getXPHistoryFromSupabase,
  updateStreakInSupabase,
  getUserBadgesFromSupabase,
  getAllBadgesFromSupabase,
  updateLearningProgressInSupabase,
  recordQuizAttemptInSupabase,
  getLearningProgressFromSupabase,
  getUserStatsFromSupabase,
  type ProgressUpdate,
  type UserStats,
} from '@/lib/supabase/services/progress';
import type { Database } from '@/lib/supabase/types';

type ProgressRow = Database['public']['Tables']['user_progress']['Row'];
type XPRow = Database['public']['Tables']['user_xp']['Row'];
type BadgeRow = Database['public']['Tables']['badges']['Row'];
type UserBadgeRow = Database['public']['Tables']['user_badges']['Row'];
type LearningRow = Database['public']['Tables']['learning_progress']['Row'];
type XPTransactionRow = Database['public']['Tables']['xp_transactions']['Row'];

// Simple in-memory cache
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data as T;
  }
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

function invalidateCache(prefix: string): void {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key);
    }
  }
}

// ==============================================
// PROGRESS HOOKS
// ==============================================

/**
 * Hook for tracking progress on a specific entity.
 */
export function useProgress(entityType: ProgressRow['entity_type'], entityId: string) {
  const [data, setData] = useState<ProgressRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured || !entityId) {
      setLoading(false);
      return;
    }

    const cacheKey = `progress:${entityType}:${entityId}`;
    const cached = getCached<ProgressRow>(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await getProgressFromSupabase(entityType, entityId);
      if (result.error) {
        // PGRST116 means no row found, not an actual error
        if (!result.error.includes('PGRST116')) {
          setError(new Error(result.error));
        }
      } else {
        setData(result.data);
        if (result.data) {
          setCache(cacheKey, result.data);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch progress'));
    } finally {
      setLoading(false);
    }
  }, [entityType, entityId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for getting all user progress, optionally filtered by entity type.
 */
export function useAllProgress(entityType?: ProgressRow['entity_type']) {
  const [data, setData] = useState<ProgressRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const cacheKey = `progress:all:${entityType ?? 'all'}`;
    const cached = getCached<ProgressRow[]>(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await getAllProgressFromSupabase(entityType);
      if (result.error) {
        setError(new Error(result.error));
      } else {
        setData(result.data);
        setCache(cacheKey, result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch progress'));
    } finally {
      setLoading(false);
    }
  }, [entityType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for updating progress.
 */
export function useUpdateProgress() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = useCallback(async (progressUpdate: ProgressUpdate) => {
    if (!isSupabaseConfigured) {
      return { data: null, error: 'Supabase not configured' };
    }

    try {
      setLoading(true);
      setError(null);
      const result = await updateProgressInSupabase(progressUpdate);
      if (result.error) {
        setError(new Error(result.error));
      }
      invalidateCache('progress:');
      return result;
    } catch (err) {
      const e = err instanceof Error ? err : new Error('Failed to update progress');
      setError(e);
      return { data: null, error: e.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
}

// ==============================================
// XP HOOKS
// ==============================================

/**
 * Hook for user XP and level.
 */
export function useUserXP() {
  const [data, setData] = useState<XPRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const cacheKey = 'xp:current';
    const cached = getCached<XPRow>(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await getUserXPFromSupabase();
      if (result.error) {
        if (!result.error.includes('PGRST116')) {
          setError(new Error(result.error));
        }
      } else {
        setData(result.data);
        if (result.data) {
          setCache(cacheKey, result.data);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch XP'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for awarding XP.
 */
export function useAwardXP() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const award = useCallback(
    async (amount: number, reason: string, entityType?: string, entityId?: string) => {
      if (!isSupabaseConfigured) {
        return { error: 'Supabase not configured' };
      }

      try {
        setLoading(true);
        setError(null);
        const result = await awardXPInSupabase(amount, reason, entityType, entityId);
        if (result.error) {
          setError(new Error(result.error));
        }
        invalidateCache('xp:');
        return result;
      } catch (err) {
        const e = err instanceof Error ? err : new Error('Failed to award XP');
        setError(e);
        return { error: e.message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { award, loading, error };
}

/**
 * Hook for XP transaction history.
 */
export function useXPHistory(limit = 50) {
  const [data, setData] = useState<XPTransactionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const cacheKey = `xp:history:${limit}`;
    const cached = getCached<XPTransactionRow[]>(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await getXPHistoryFromSupabase(limit);
      if (result.error) {
        setError(new Error(result.error));
      } else {
        setData(result.data);
        setCache(cacheKey, result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch XP history'));
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// ==============================================
// BADGES HOOKS
// ==============================================

/**
 * Hook for user's earned badges.
 */
export function useUserBadges() {
  const [data, setData] = useState<(UserBadgeRow & { badges: BadgeRow | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const cacheKey = 'badges:user';
    const cached = getCached<(UserBadgeRow & { badges: BadgeRow | null })[]>(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await getUserBadgesFromSupabase();
      if (result.error) {
        setError(new Error(result.error));
      } else {
        setData(result.data);
        setCache(cacheKey, result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch badges'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for all available badges.
 */
export function useAllBadges() {
  const [data, setData] = useState<BadgeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const cacheKey = 'badges:all';
    const cached = getCached<BadgeRow[]>(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await getAllBadgesFromSupabase();
      if (result.error) {
        setError(new Error(result.error));
      } else {
        setData(result.data);
        setCache(cacheKey, result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch badges'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// ==============================================
// LEARNING HOOKS
// ==============================================

/**
 * Hook for learning path progress.
 */
export function useLearningProgress(pathId: string) {
  const [data, setData] = useState<LearningRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured || !pathId) {
      setLoading(false);
      return;
    }

    const cacheKey = `learning:${pathId}`;
    const cached = getCached<LearningRow[]>(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await getLearningProgressFromSupabase(pathId);
      if (result.error) {
        setError(new Error(result.error));
      } else {
        setData(result.data);
        setCache(cacheKey, result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch learning progress'));
    } finally {
      setLoading(false);
    }
  }, [pathId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for updating learning progress.
 */
export function useUpdateLearningProgress() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = useCallback(
    async (
      pathId: string,
      moduleId: string,
      updates: { score?: number; completed?: boolean; timeSpentSeconds?: number }
    ) => {
      if (!isSupabaseConfigured) {
        return { data: null, error: 'Supabase not configured' };
      }

      try {
        setLoading(true);
        setError(null);
        const result = await updateLearningProgressInSupabase(pathId, moduleId, updates);
        if (result.error) {
          setError(new Error(result.error));
        }
        invalidateCache('learning:');
        return result;
      } catch (err) {
        const e = err instanceof Error ? err : new Error('Failed to update learning progress');
        setError(e);
        return { data: null, error: e.message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { update, loading, error };
}

/**
 * Hook for recording quiz attempts.
 */
export function useRecordQuizAttempt() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const record = useCallback(
    async (
      quizId: string,
      score: number,
      answers: Record<string, unknown>,
      moduleId?: string,
      timeTakenSeconds?: number
    ) => {
      if (!isSupabaseConfigured) {
        return { data: null, error: 'Supabase not configured' };
      }

      try {
        setLoading(true);
        setError(null);
        const result = await recordQuizAttemptInSupabase(
          quizId,
          score,
          answers,
          moduleId,
          timeTakenSeconds
        );
        if (result.error) {
          setError(new Error(result.error));
        }
        invalidateCache('learning:');
        return result;
      } catch (err) {
        const e = err instanceof Error ? err : new Error('Failed to record quiz attempt');
        setError(e);
        return { data: null, error: e.message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { record, loading, error };
}

// ==============================================
// COMBINED STATS
// ==============================================

/**
 * Hook for comprehensive user statistics.
 */
export function useUserStats() {
  const defaultStats: UserStats = {
    totalProgress: 0,
    completedItems: 0,
    favorites: 0,
    notes: 0,
    xp: 0,
    level: 1,
    streak: 0,
    badges: 0,
  };

  const [data, setData] = useState<UserStats>(defaultStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const cacheKey = 'stats:user';
    const cached = getCached<UserStats>(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const stats = await getUserStatsFromSupabase();
      setData(stats);
      setCache(cacheKey, stats);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch stats'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
