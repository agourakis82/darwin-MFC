/**
 * Darwin MFC Mobile - Auth Context
 * Authentication state backed by Supabase Auth + SecureStore persistence
 */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        if (!isSupabaseConfigured || !supabase) {
          if (!mounted) return;
          setSession(null);
          setUser(null);
          setIsLoading(false);
          return;
        }

        const { data: { session: initial } } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(initial ?? null);
        setUser(initial?.user ?? null);
        setIsLoading(false);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Failed to initialize auth');
        setIsLoading(false);
      }
    }

    init();

    if (!isSupabaseConfigured || !supabase) {
      return () => { mounted = false; };
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession ?? null);
      setUser(nextSession?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Supabase is not configured (missing EXPO_PUBLIC_SUPABASE_URL/ANON_KEY).');
      }

      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw new Error(authError.message);
    } catch (error) {
      console.error('Sign in failed:', error);
      setError(error instanceof Error ? error.message : 'Sign in failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      if (!email || !password || !name) {
        throw new Error('Email, password, and name are required');
      }
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Supabase is not configured (missing EXPO_PUBLIC_SUPABASE_URL/ANON_KEY).');
      }

      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (authError) throw new Error(authError.message);
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      if (!isSupabaseConfigured || !supabase) {
        setSession(null);
        setUser(null);
        return;
      }

      const { error: authError } = await supabase.auth.signOut();
      if (authError) throw new Error(authError.message);
    } catch (error) {
      console.error('Sign out failed:', error);
      setError(error instanceof Error ? error.message : 'Sign out failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = useMemo(() => ({
    user,
    session,
    isLoading,
    error,
    signIn,
    signOut,
    register,
  }), [user, session, isLoading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
