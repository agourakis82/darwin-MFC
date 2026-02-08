/**
 * SUPABASE PROGRESS SERVICE
 * ==========================
 *
 * Service layer for progress tracking, XP, badges, and learning with build-safe null checks.
 * Falls back gracefully when Supabase is not configured.
 */

import { supabase, isSupabaseConfigured } from '../client';
import type { SupabaseClient } from '../client';
import type { Database, Json } from '../types';

type ProgressRow = Database['public']['Tables']['user_progress']['Row'];
type XPRow = Database['public']['Tables']['user_xp']['Row'];
type BadgeRow = Database['public']['Tables']['badges']['Row'];
type UserBadgeRow = Database['public']['Tables']['user_badges']['Row'];
type LearningRow = Database['public']['Tables']['learning_progress']['Row'];
type QuizAttemptRow = Database['public']['Tables']['quiz_attempts']['Row'];
type XPTransactionRow = Database['public']['Tables']['xp_transactions']['Row'];

type EntityType = ProgressRow['entity_type'];

export interface ProgressUpdate {
  entityType: EntityType;
  entityId: string;
  progress?: number;
  completed?: boolean;
  timeSpentSeconds?: number;
  metadata?: Record<string, unknown>;
}

export interface UserStats {
  totalProgress: number;
  completedItems: number;
  favorites: number;
  notes: number;
  xp: number;
  level: number;
  streak: number;
  badges: number;
}

/**
 * Get authenticated client + userId, or null if unavailable
 */
async function getAuthClient(): Promise<{ client: SupabaseClient; userId: string } | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.id) return null;
    return { client: supabase, userId: session.user.id };
  } catch {
    return null;
  }
}

/**
 * Get a non-null Supabase client (for operations that don't need auth)
 */
function getClient(): SupabaseClient | null {
  if (!isSupabaseConfigured || !supabase) return null;
  return supabase;
}

// ==============================================
// PROGRESS TRACKING
// ==============================================

/**
 * Update user progress for any entity
 */
export async function updateProgressInSupabase(
  update: ProgressUpdate
): Promise<{ data: ProgressRow | null; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: null, error: 'Not authenticated' };

  try {
    const { data, error } = await auth.client
      .from('user_progress')
      .upsert({
        user_id: auth.userId,
        entity_type: update.entityType,
        entity_id: update.entityId,
        progress: update.progress,
        completed: update.completed,
        completed_at: update.completed ? new Date().toISOString() : null,
        last_accessed_at: new Date().toISOString(),
        time_spent_seconds: update.timeSpentSeconds,
        metadata: (update.metadata ?? {}) as Json,
      })
      .select()
      .single();

    return { data, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to update progress' };
  }
}

/**
 * Get user progress for a specific entity
 */
export async function getProgressFromSupabase(
  entityType: EntityType,
  entityId: string
): Promise<{ data: ProgressRow | null; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: null, error: null };

  try {
    const { data, error } = await auth.client
      .from('user_progress')
      .select('*')
      .eq('user_id', auth.userId)
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .single();

    return { data, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to fetch progress' };
  }
}

/**
 * Get all progress for the current user
 */
export async function getAllProgressFromSupabase(
  entityType?: EntityType
): Promise<{ data: ProgressRow[]; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: [], error: null };

  try {
    let query = auth.client
      .from('user_progress')
      .select('*')
      .eq('user_id', auth.userId);

    if (entityType) {
      query = query.eq('entity_type', entityType);
    }

    const { data, error } = await query.order('last_accessed_at', { ascending: false });

    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to fetch progress' };
  }
}

/**
 * Get completed items count by type
 */
export async function getCompletedCountFromSupabase(
  entityType: EntityType
): Promise<number> {
  const auth = await getAuthClient();
  if (!auth) return 0;

  try {
    const { count } = await auth.client
      .from('user_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', auth.userId)
      .eq('entity_type', entityType)
      .eq('completed', true);

    return count ?? 0;
  } catch {
    return 0;
  }
}

// ==============================================
// XP & GAMIFICATION
// ==============================================

/**
 * Get user XP and level
 */
export async function getUserXPFromSupabase(): Promise<{ data: XPRow | null; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: null, error: null };

  try {
    const { data, error } = await auth.client
      .from('user_xp')
      .select('*')
      .eq('user_id', auth.userId)
      .single();

    return { data, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to fetch XP' };
  }
}

/**
 * Award XP to the current user
 */
export async function awardXPInSupabase(
  amount: number,
  reason: string,
  entityType?: string,
  entityId?: string
): Promise<{ error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { error: 'Not authenticated' };

  try {
    // Use raw SQL RPC call - type-safe approach
    const { error } = await auth.client.rpc('award_xp' as never, {
      p_user_id: auth.userId,
      p_amount: amount,
      p_reason: reason,
      p_entity_type: entityType,
      p_entity_id: entityId,
    } as never);

    return { error: (error as { message?: string } | null)?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to award XP' };
  }
}

/**
 * Get XP transaction history
 */
export async function getXPHistoryFromSupabase(
  limit = 50
): Promise<{ data: XPTransactionRow[]; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: [], error: null };

  try {
    const { data, error } = await auth.client
      .from('xp_transactions')
      .select('*')
      .eq('user_id', auth.userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to fetch XP history' };
  }
}

/**
 * Update user streak
 */
export async function updateStreakInSupabase(): Promise<{ error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { error: 'Not authenticated' };

  try {
    const { error } = await auth.client.rpc('update_user_streak' as never, {
      p_user_id: auth.userId,
    } as never);

    return { error: (error as { message?: string } | null)?.message ?? null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to update streak' };
  }
}

// ==============================================
// BADGES
// ==============================================

/**
 * Get badges earned by the current user
 */
export async function getUserBadgesFromSupabase(): Promise<{
  data: (UserBadgeRow & { badges: BadgeRow | null })[];
  error: string | null;
}> {
  const auth = await getAuthClient();
  if (!auth) return { data: [], error: null };

  try {
    const { data, error } = await auth.client
      .from('user_badges')
      .select('*, badges(*)')
      .eq('user_id', auth.userId)
      .order('earned_at', { ascending: false });

    return {
      data: (data ?? []) as (UserBadgeRow & { badges: BadgeRow | null })[],
      error: error?.message ?? null,
    };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to fetch badges' };
  }
}

/**
 * Get all available badges
 */
export async function getAllBadgesFromSupabase(): Promise<{
  data: BadgeRow[];
  error: string | null;
}> {
  const client = getClient();
  if (!client) return { data: [], error: null };

  try {
    const { data, error } = await client
      .from('badges')
      .select('*')
      .order('category', { ascending: true });

    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to fetch badges' };
  }
}

// ==============================================
// LEARNING PROGRESS
// ==============================================

/**
 * Update learning path progress
 */
export async function updateLearningProgressInSupabase(
  pathId: string,
  moduleId: string,
  updates: {
    score?: number;
    completed?: boolean;
    timeSpentSeconds?: number;
  }
): Promise<{ data: LearningRow | null; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: null, error: 'Not authenticated' };

  try {
    const { data, error } = await auth.client
      .from('learning_progress')
      .upsert({
        user_id: auth.userId,
        path_id: pathId,
        module_id: moduleId,
        score: updates.score,
        completed: updates.completed,
        completed_at: updates.completed ? new Date().toISOString() : null,
        time_spent_seconds: updates.timeSpentSeconds,
      })
      .select()
      .single();

    return { data, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to update learning progress' };
  }
}

/**
 * Record a quiz attempt
 */
export async function recordQuizAttemptInSupabase(
  quizId: string,
  score: number,
  answers: Record<string, unknown>,
  moduleId?: string,
  timeTakenSeconds?: number
): Promise<{ data: QuizAttemptRow | null; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: null, error: 'Not authenticated' };

  try {
    const passed = score >= 70;
    const { data, error } = await auth.client
      .from('quiz_attempts')
      .insert({
        user_id: auth.userId,
        quiz_id: quizId,
        module_id: moduleId,
        score,
        answers: answers as Json,
        time_taken_seconds: timeTakenSeconds,
        passed,
      })
      .select()
      .single();

    return { data, error: error?.message ?? null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to record quiz attempt' };
  }
}

/**
 * Get learning path progress
 */
export async function getLearningProgressFromSupabase(
  pathId: string
): Promise<{ data: LearningRow[]; error: string | null }> {
  const auth = await getAuthClient();
  if (!auth) return { data: [], error: null };

  try {
    const { data, error } = await auth.client
      .from('learning_progress')
      .select('*')
      .eq('user_id', auth.userId)
      .eq('path_id', pathId)
      .order('created_at', { ascending: true });

    return { data: data ?? [], error: error?.message ?? null };
  } catch (err) {
    return { data: [], error: err instanceof Error ? err.message : 'Failed to fetch learning progress' };
  }
}

// ==============================================
// COMBINED STATS
// ==============================================

/**
 * Get comprehensive user statistics
 */
export async function getUserStatsFromSupabase(): Promise<UserStats> {
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

  const auth = await getAuthClient();
  if (!auth) return defaultStats;

  try {
    const [progressResult, favoritesResult, notesResult, xpResult, badgesResult] =
      await Promise.all([
        auth.client
          .from('user_progress')
          .select('completed')
          .eq('user_id', auth.userId),
        auth.client
          .from('favorites')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', auth.userId),
        auth.client
          .from('notes')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', auth.userId),
        auth.client
          .from('user_xp')
          .select('*')
          .eq('user_id', auth.userId)
          .single(),
        auth.client
          .from('user_badges')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', auth.userId),
      ]);

    const progressData = progressResult.data ?? [];
    const completedCount = progressData.filter((p) => p.completed).length;

    return {
      totalProgress: progressData.length,
      completedItems: completedCount,
      favorites: favoritesResult.count ?? 0,
      notes: notesResult.count ?? 0,
      xp: xpResult.data?.total_xp ?? 0,
      level: xpResult.data?.level ?? 1,
      streak: xpResult.data?.current_streak ?? 0,
      badges: badgesResult.count ?? 0,
    };
  } catch {
    return defaultStats;
  }
}
