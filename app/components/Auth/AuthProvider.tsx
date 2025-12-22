'use client';

/**
 * AUTH PROVIDER COMPONENT
 * =======================
 *
 * Provides authentication context and session management.
 * Initializes auth state on app load and handles session restoration.
 */

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useUserStore } from '@/lib/store/userStore';
import type { UserProfile } from '@/lib/db/schemas';

// =============================================================================
// TYPES
// =============================================================================

interface AuthContextValue {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  isOffline: boolean;
  offlineValidUntil: Date | null;
  daysRemainingOffline: number;
  error: string | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  register: (data: {
    username: string;
    email?: string;
    password: string;
    locale: string;
    countryCode?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// =============================================================================
// CONTEXT
// =============================================================================

const AuthContext = createContext<AuthContextValue | null>(null);

// =============================================================================
// PROVIDER
// =============================================================================

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    isOffline,
    offlineValidUntil,
    daysRemainingOffline,
    error,
    login,
    register,
    logout,
    initialize,
    clearError,
  } = useUserStore();

  // Initialize on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  const value: AuthContextValue = {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    isOffline,
    offlineValidUntil,
    daysRemainingOffline,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// =============================================================================
// HOOK
// =============================================================================

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
