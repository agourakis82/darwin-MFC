import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

/**
 * User profile from public.users table
 */
export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  specialty: string | null;
  country: string | null;
  institution: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: 'user' | 'verified' | 'moderator' | 'admin';
  level: number;
  xp: number;
  streak_days: number;
  created_at: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isInitialized: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  isInitialized: false,

  // Actions
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setProfile: (profile) => set({ profile }),
  setLoading: (isLoading) => set({ isLoading }),

  /**
   * Initialize auth state from Supabase session
   * Should be called once on app startup
   */
  initialize: async () => {
    if (get().isInitialized) return;

    // Skip if Supabase is not configured (static build)
    if (!isSupabaseConfigured || !supabase) {
      set({ isInitialized: true, isLoading: false });
      return;
    }

    try {
      set({ isLoading: true });

      // Get current session
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        set({ user: session.user, session });

        // Fetch user profile
        // @ts-ignore - Supabase types not fully configured yet
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          set({ profile: profile as UserProfile });
        }
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        set({ session, user: session?.user ?? null });

        if (event === 'SIGNED_IN' && session?.user) {
          // Fetch profile on sign in
          // @ts-ignore - Supabase types not fully configured yet
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            set({ profile: profile as UserProfile });
          }
        } else if (event === 'SIGNED_OUT') {
          set({ profile: null });
        }
      });

      set({ isInitialized: true });
    } catch (error) {
      console.error('Failed to initialize auth:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Sign out and clear all auth state
   */
  signOut: async () => {
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
      set({ user: null, session: null, profile: null });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  },

  /**
   * Refresh user profile from database
   */
  refreshProfile: async () => {
    const { user } = get();
    if (!user) return;

    // Skip if Supabase is not configured
    if (!isSupabaseConfigured || !supabase) return;

    try {
      // @ts-ignore - Supabase types not fully configured yet
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        set({ profile: profile as UserProfile });
      }
    } catch (error) {
      console.error('Failed to refresh profile:', error);
    }
  },
}));

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated(): boolean {
  return useAuthStore((state) => state.user !== null);
}

/**
 * Hook to get current user
 */
export function useCurrentUser(): User | null {
  return useAuthStore((state) => state.user);
}

/**
 * Hook to get user profile
 */
export function useUserProfile(): UserProfile | null {
  return useAuthStore((state) => state.profile);
}
