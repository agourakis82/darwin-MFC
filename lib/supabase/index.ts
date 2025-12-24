/**
 * SUPABASE LIBRARY EXPORTS
 * =========================
 *
 * Centralized exports for Supabase functionality
 */

// Client
export { supabase, createServerSupabaseClient } from './client';
export type { SupabaseClient } from './client';

// Types
export type { Database, Json } from './types';

// Authentication
export {
  signUp,
  signIn,
  signInWithOAuth,
  signOut,
  getSession,
  getUser,
  refreshSession,
  resetPassword,
  updatePassword,
  resendEmailVerification,
  onAuthStateChange,
  getUserProfile,
  updateUserProfile,
  getUserPreferences,
  updateUserPreferences,
  isAuthenticated,
  requireAuth,
  hasRole,
} from './auth';

export type { AuthResponse, SignUpData, SignInData } from './auth';

// Helper functions
export {
  updateProgress,
  getProgress,
  getAllProgress,
  getCompletedCount,
  addFavorite,
  removeFavorite,
  isFavorite,
  getFavorites,
  createNote,
  updateNote,
  deleteNote,
  getNotesForEntity,
  getAllNotes,
  getUserXP,
  awardXP,
  getXPHistory,
  updateStreak,
  getUserBadges,
  awardBadge,
  getAllBadges,
  updateLearningProgress,
  recordQuizAttempt,
  getLearningProgress,
  logActivity,
  getUserStats,
} from './helpers';

export type { ProgressUpdate } from './helpers';
