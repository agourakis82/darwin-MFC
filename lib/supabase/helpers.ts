/**
 * SUPABASE HELPER FUNCTIONS
 * ==========================
 *
 * Common database operations for Darwin-MFC
 * Type-safe wrappers around Supabase queries
 */

import { supabase } from './client';
import type { Database } from './types';

type Tables = Database['public']['Tables'];

// ==============================================
// PROGRESS TRACKING
// ==============================================

export interface ProgressUpdate {
  entityType: 'disease' | 'medication' | 'protocol' | 'case' | 'calculator' | 'learning_path' | 'module';
  entityId: string;
  progress?: number;
  completed?: boolean;
  timeSpentSeconds?: number;
  metadata?: Record<string, any>;
}

/**
 * Update user progress for any entity
 */
export async function updateProgress(userId: string, update: ProgressUpdate) {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      entity_type: update.entityType,
      entity_id: update.entityId,
      progress: update.progress,
      completed: update.completed,
      completed_at: update.completed ? new Date().toISOString() : null,
      last_accessed_at: new Date().toISOString(),
      time_spent_seconds: update.timeSpentSeconds,
      metadata: update.metadata || {},
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Get user progress for an entity
 */
export async function getProgress(
  userId: string,
  entityType: string,
  entityId: string
) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .single();

  return { data, error };
}

/**
 * Get all progress for a user
 */
export async function getAllProgress(userId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .order('last_accessed_at', { ascending: false });

  return { data, error };
}

/**
 * Get completed items count by type
 */
export async function getCompletedCount(userId: string, entityType: string) {
  const { count, error } = await supabase
    .from('user_progress')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('entity_type', entityType)
    .eq('completed', true);

  return { count: count || 0, error };
}

// ==============================================
// FAVORITES
// ==============================================

/**
 * Add item to favorites
 */
export async function addFavorite(
  userId: string,
  entityType: 'disease' | 'medication' | 'protocol' | 'case' | 'calculator' | 'article',
  entityId: string,
  notes?: string,
  tags?: string[]
) {
  const { data, error } = await supabase
    .from('favorites')
    .insert({
      user_id: userId,
      entity_type: entityType,
      entity_id: entityId,
      notes,
      tags,
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Remove from favorites
 */
export async function removeFavorite(userId: string, entityType: string, entityId: string) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('entity_type', entityType)
    .eq('entity_id', entityId);

  return { error };
}

/**
 * Check if item is favorited
 */
export async function isFavorite(userId: string, entityType: string, entityId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .single();

  return { isFavorite: !!data, error };
}

/**
 * Get all favorites for a user
 */
export async function getFavorites(userId: string, entityType?: string) {
  let query = supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId);

  if (entityType) {
    query = query.eq('entity_type', entityType);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  return { data, error };
}

// ==============================================
// NOTES
// ==============================================

/**
 * Create a note
 */
export async function createNote(
  userId: string,
  content: string,
  options?: {
    entityType?: 'disease' | 'medication' | 'protocol' | 'case' | 'patient' | 'general';
    entityId?: string;
    title?: string;
    tags?: string[];
    isPrivate?: boolean;
  }
) {
  const { data, error } = await supabase
    .from('notes')
    .insert({
      user_id: userId,
      entity_type: options?.entityType || 'general',
      entity_id: options?.entityId,
      title: options?.title,
      content,
      tags: options?.tags,
      is_private: options?.isPrivate ?? true,
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Update a note
 */
export async function updateNote(
  noteId: string,
  updates: {
    title?: string;
    content?: string;
    tags?: string[];
    isPrivate?: boolean;
  }
) {
  const { data, error } = await supabase
    .from('notes')
    .update({
      title: updates.title,
      content: updates.content,
      tags: updates.tags,
      is_private: updates.isPrivate,
    })
    .eq('id', noteId)
    .select()
    .single();

  return { data, error };
}

/**
 * Delete a note
 */
export async function deleteNote(noteId: string) {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', noteId);

  return { error };
}

/**
 * Get notes for an entity
 */
export async function getNotesForEntity(
  userId: string,
  entityType: string,
  entityId: string
) {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .order('created_at', { ascending: false });

  return { data, error };
}

/**
 * Get all notes for a user
 */
export async function getAllNotes(userId: string) {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  return { data, error };
}

// ==============================================
// XP & GAMIFICATION
// ==============================================

/**
 * Get user XP and level
 */
export async function getUserXP(userId: string) {
  const { data, error } = await supabase
    .from('user_xp')
    .select('*')
    .eq('user_id', userId)
    .single();

  return { data, error };
}

/**
 * Award XP to user
 */
export async function awardXP(
  userId: string,
  amount: number,
  reason: string,
  entityType?: string,
  entityId?: string
) {
  const { error } = await supabase.rpc('award_xp', {
    p_user_id: userId,
    p_amount: amount,
    p_reason: reason,
    p_entity_type: entityType,
    p_entity_id: entityId,
  });

  return { error };
}

/**
 * Get XP transaction history
 */
export async function getXPHistory(userId: string, limit = 50) {
  const { data, error } = await supabase
    .from('xp_transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  return { data, error };
}

/**
 * Update user streak
 */
export async function updateStreak(userId: string) {
  const { error } = await supabase.rpc('update_user_streak', {
    p_user_id: userId,
  });

  return { error };
}

/**
 * Get user badges
 */
export async function getUserBadges(userId: string) {
  const { data, error } = await supabase
    .from('user_badges')
    .select('*, badges(*)')
    .eq('user_id', userId)
    .order('earned_at', { ascending: false });

  return { data, error };
}

/**
 * Award badge to user
 */
export async function awardBadge(
  userId: string,
  badgeId: string,
  metadata?: Record<string, any>
) {
  const { data, error } = await supabase
    .from('user_badges')
    .insert({
      user_id: userId,
      badge_id: badgeId,
      metadata: metadata || {},
    })
    .select('*, badges(*)')
    .single();

  return { data, error };
}

/**
 * Get all available badges
 */
export async function getAllBadges() {
  const { data, error } = await supabase
    .from('badges')
    .select('*')
    .order('category', { ascending: true });

  return { data, error };
}

// ==============================================
// LEARNING PROGRESS
// ==============================================

/**
 * Update learning path progress
 */
export async function updateLearningProgress(
  userId: string,
  pathId: string,
  moduleId: string,
  updates: {
    score?: number;
    completed?: boolean;
    timeSpentSeconds?: number;
  }
) {
  const { data, error } = await supabase
    .from('learning_progress')
    .upsert({
      user_id: userId,
      path_id: pathId,
      module_id: moduleId,
      score: updates.score,
      completed: updates.completed,
      completed_at: updates.completed ? new Date().toISOString() : null,
      time_spent_seconds: updates.timeSpentSeconds,
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Record quiz attempt
 */
export async function recordQuizAttempt(
  userId: string,
  quizId: string,
  score: number,
  answers: Record<string, any>,
  moduleId?: string,
  timeTakenSeconds?: number
) {
  const passed = score >= 70; // 70% passing threshold

  const { data, error } = await supabase
    .from('quiz_attempts')
    .insert({
      user_id: userId,
      quiz_id: quizId,
      module_id: moduleId,
      score,
      answers,
      time_taken_seconds: timeTakenSeconds,
      passed,
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Get learning path progress
 */
export async function getLearningProgress(userId: string, pathId: string) {
  const { data, error } = await supabase
    .from('learning_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('path_id', pathId)
    .order('created_at', { ascending: true });

  return { data, error };
}

// ==============================================
// ANALYTICS
// ==============================================

/**
 * Log user activity
 */
export async function logActivity(
  userId: string,
  action: string,
  entityType?: string,
  entityId?: string,
  metadata?: Record<string, any>
) {
  const { error } = await supabase
    .from('activity_log')
    .insert({
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      metadata: metadata || {},
    });

  return { error };
}

/**
 * Get user statistics
 */
export async function getUserStats(userId: string) {
  // Get various counts in parallel
  const [
    progressResult,
    favoritesResult,
    notesResult,
    xpResult,
    badgesResult,
  ] = await Promise.all([
    getAllProgress(userId),
    getFavorites(userId),
    getAllNotes(userId),
    getUserXP(userId),
    getUserBadges(userId),
  ]);

  const completedCount = progressResult.data?.filter(p => p.completed).length || 0;

  return {
    totalProgress: progressResult.data?.length || 0,
    completedItems: completedCount,
    favorites: favoritesResult.data?.length || 0,
    notes: notesResult.data?.length || 0,
    xp: xpResult.data?.total_xp || 0,
    level: xpResult.data?.level || 1,
    streak: xpResult.data?.current_streak || 0,
    badges: badgesResult.data?.length || 0,
  };
}
