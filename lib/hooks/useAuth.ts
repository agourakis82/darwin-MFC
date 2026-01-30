/**
 * AUTHENTICATION HOOK
 * ====================
 * 
 * React hook for authentication state and operations
 * Provides easy access to auth functions throughout the app
 */

'use client';

import { useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import {
  supabase,
  isSupabaseConfigured,
  signUp,
  signIn,
  signInWithOAuth,
  signOut,
  getSession,
  getUser,
  getUserProfile,
  updateUserProfile,
  isAuthenticated,
} from '@/lib/supabase';
import type { SignUpData, SignInData } from '@/lib/supabase/auth';

export interface AuthState {
  user: User | null;
  session: Session | null;
  profile: any | null;
  loading: boolean;
  error: Error | null;
}

export interface UseAuthReturn extends AuthState {
  // Auth operations
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
  
  // Profile operations
  updateProfile: (updates: any) => Promise<void>;
  refreshProfile: () => Promise<void>;
  
  // Utilities
  isAuthenticated: boolean;
}

/**
 * Authentication hook
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, signIn, signOut, isAuthenticated } = useAuth();
 *   
 *   if (isAuthenticated) {
 *     return <div>Welcome {user?.email}!</div>;
 *   }
 *   
 *   return <button onClick={() => signIn({ email, password })}>Sign In</button>;
 * }
 * ```
 */
export function useAuth(): UseAuthReturn {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    profile: null,
    loading: true,
    error: null,
  });

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        // Get current session
        const session = await getSession();

        if (mounted) {
          setState(prev => ({
            ...prev,
            session,
            user: session?.user ?? null,
            loading: false,
          }));

          // Load profile if authenticated
          if (session?.user) {
            loadProfile(session.user.id);
          }
        }
      } catch (error) {
        if (mounted) {
          setState(prev => ({
            ...prev,
            error: error as Error,
            loading: false,
          }));
        }
      }
    }

    initAuth();

    // Skip auth listener if Supabase is not configured
    if (!isSupabaseConfigured || !supabase) {
      setState(prev => ({ ...prev, loading: false }));
      return () => { mounted = false; };
    }

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          setState(prev => ({
            ...prev,
            session,
            user: session?.user ?? null,
            loading: false,
          }));

          // Load profile on sign in
          if (event === 'SIGNED_IN' && session?.user) {
            loadProfile(session.user.id);
          }

          // Clear profile on sign out
          if (event === 'SIGNED_OUT') {
            setState(prev => ({ ...prev, profile: null }));
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Load user profile
  async function loadProfile(userId: string) {
    try {
      const profile = await getUserProfile(userId);
      setState(prev => ({ ...prev, profile }));
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  }

  // Auth operations
  const authOperations = {
    signUp: async (data: SignUpData) => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        await signUp(data);
      } catch (error) {
        setState(prev => ({ ...prev, error: error as Error }));
        throw error;
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    },

    signIn: async (data: SignInData) => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        await signIn(data);
      } catch (error) {
        setState(prev => ({ ...prev, error: error as Error }));
        throw error;
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    },

    signInWithGoogle: async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        await signInWithOAuth('google');
      } catch (error) {
        setState(prev => ({ ...prev, error: error as Error }));
        throw error;
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    },

    signInWithGithub: async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        await signInWithOAuth('github');
      } catch (error) {
        setState(prev => ({ ...prev, error: error as Error }));
        throw error;
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    },

    signOut: async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        await signOut();
      } catch (error) {
        setState(prev => ({ ...prev, error: error as Error }));
        throw error;
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    },

    updateProfile: async (updates: any) => {
      if (!state.user) throw new Error('Not authenticated');

      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const updatedProfile = await updateUserProfile(state.user.id, updates);
        setState(prev => ({ ...prev, profile: updatedProfile }));
      } catch (error) {
        setState(prev => ({ ...prev, error: error as Error }));
        throw error;
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    },

    refreshProfile: async () => {
      if (!state.user) return;
      await loadProfile(state.user.id);
    },
  };

  return {
    ...state,
    ...authOperations,
    isAuthenticated: !!state.user,
  };
}

