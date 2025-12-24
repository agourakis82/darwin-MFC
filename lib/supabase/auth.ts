/**
 * SUPABASE AUTHENTICATION HELPERS
 * ================================
 *
 * Helper functions for authentication operations
 * Provides type-safe wrappers around Supabase auth
 */

import { supabase } from './client';
import type { User, Session, AuthError } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

export interface SignUpData {
  email: string;
  password: string;
  name?: string;
  specialty?: string;
  country?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// ==============================================
// SIGN UP
// ==============================================

/**
 * Sign up a new user with email and password
 */
export async function signUp(data: SignUpData): Promise<AuthResponse> {
  const { email, password, name, specialty, country } = data;

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        specialty,
        country,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  return {
    user: authData.user,
    session: authData.session,
    error,
  };
}

// ==============================================
// SIGN IN
// ==============================================

/**
 * Sign in with email and password
 */
export async function signIn(data: SignInData): Promise<AuthResponse> {
  const { email, password } = data;

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    user: authData.user,
    session: authData.session,
    error,
  };
}

/**
 * Sign in with OAuth provider
 */
export async function signInWithOAuth(provider: 'google' | 'github') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  return { data, error };
}

// ==============================================
// SIGN OUT
// ==============================================

/**
 * Sign out the current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// ==============================================
// SESSION MANAGEMENT
// ==============================================

/**
 * Get the current user session
 */
export async function getSession(): Promise<Session | null> {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

/**
 * Get the current user
 */
export async function getUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Refresh the current session
 */
export async function refreshSession(): Promise<Session | null> {
  const { data: { session }, error } = await supabase.auth.refreshSession();
  if (error) {
    console.error('Error refreshing session:', error);
    return null;
  }
  return session;
}

// ==============================================
// PASSWORD MANAGEMENT
// ==============================================

/**
 * Send password reset email
 */
export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  return { data, error };
}

/**
 * Update user password
 */
export async function updatePassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  return { data, error };
}

// ==============================================
// EMAIL VERIFICATION
// ==============================================

/**
 * Resend email verification
 */
export async function resendEmailVerification(email: string) {
  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  return { data, error };
}

// ==============================================
// AUTH STATE LISTENER
// ==============================================

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(
  callback: (event: string, session: Session | null) => void
) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}

// ==============================================
// USER PROFILE MANAGEMENT
// ==============================================

/**
 * Get user profile from public.users table
 */
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  return { data, error };
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: {
    name?: string;
    specialty?: string;
    country?: string;
    institution?: string;
    avatar_url?: string;
    bio?: string;
  }
) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  return { data, error };
}

/**
 * Get user preferences
 */
export async function getUserPreferences(userId: string) {
  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();

  return { data, error };
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(
  userId: string,
  preferences: {
    theme?: 'light' | 'dark';
    language?: 'pt' | 'en' | 'es' | 'fr' | 'ru' | 'ar' | 'zh' | 'el' | 'hi';
    content_mode?: 'descriptive' | 'critical_analysis';
    notifications_enabled?: boolean;
    email_notifications?: boolean;
  }
) {
  const { data, error } = await supabase
    .from('user_preferences')
    .upsert({
      user_id: userId,
      ...preferences,
    })
    .select()
    .single();

  return { data, error };
}

// ==============================================
// AUTH GUARDS
// ==============================================

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

/**
 * Require authentication (throw if not authenticated)
 */
export async function requireAuth(): Promise<User> {
  const user = await getUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

/**
 * Check if user has a specific role
 */
export async function hasRole(
  role: 'user' | 'verified' | 'moderator' | 'admin'
): Promise<boolean> {
  const user = await getUser();
  if (!user) return false;

  const { data: profile } = await getUserProfile(user.id);
  return profile?.role === role;
}
