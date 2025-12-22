/**
 * DARWIN-MFC USER STORE
 * =====================
 *
 * Zustand store for user authentication and profile state.
 * Separate from appStore to keep concerns isolated.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile } from '../db/schemas';
import {
  login,
  logout,
  register,
  getCurrentUser,
  updateProfile,
  restoreSession,
  checkOfflineAuth,
  type LoginCredentials,
  type RegisterData,
  AuthError,
} from '../api/auth';
import { initDB } from '../db/indexedDB';
import { initSync } from './syncStore';

// =============================================================================
// TYPES
// =============================================================================

export interface UserState {
  // User data
  user: UserProfile | null;
  isAuthenticated: boolean;

  // Loading states
  isLoading: boolean;
  isInitialized: boolean;

  // Offline state
  isOffline: boolean;
  offlineValidUntil: Date | null;
  daysRemainingOffline: number;

  // Error
  error: string | null;
}

export interface UserActions {
  // Auth actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;

  // Profile actions
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;

  // Session management
  initialize: () => Promise<void>;
  refreshUser: () => Promise<void>;

  // Status
  setOnlineStatus: (isOnline: boolean) => void;
  clearError: () => void;
}

// =============================================================================
// INITIAL STATE
// =============================================================================

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  isOffline: typeof navigator !== 'undefined' ? !navigator.onLine : false,
  offlineValidUntil: null,
  daysRemainingOffline: 0,
  error: null,
};

// =============================================================================
// STORE
// =============================================================================

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // =========================================================================
      // AUTH ACTIONS
      // =========================================================================

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        try {
          const user = await login(credentials);

          // Check offline validity
          const offlineAuth = await checkOfflineAuth();

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            offlineValidUntil: offlineAuth.expiresAt,
            daysRemainingOffline: offlineAuth.daysRemaining,
          });

          // Initialize sync after login
          await initSync();
        } catch (error) {
          const message = error instanceof AuthError
            ? error.message
            : 'Login failed. Please try again.';

          set({
            isLoading: false,
            error: message,
          });

          throw error;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });

        try {
          const user = await register(data);

          // Check offline validity
          const offlineAuth = await checkOfflineAuth();

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            offlineValidUntil: offlineAuth.expiresAt,
            daysRemainingOffline: offlineAuth.daysRemaining,
          });

          // Initialize sync after registration
          await initSync();
        } catch (error) {
          const message = error instanceof AuthError
            ? error.message
            : 'Registration failed. Please try again.';

          set({
            isLoading: false,
            error: message,
          });

          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });

        try {
          await logout();
        } finally {
          set({
            ...initialState,
            isInitialized: true,
            isOffline: !navigator.onLine,
          });
        }
      },

      // =========================================================================
      // PROFILE ACTIONS
      // =========================================================================

      updateProfile: async (updates: Partial<UserProfile>) => {
        const { user } = get();
        if (!user) throw new Error('Not authenticated');

        set({ isLoading: true, error: null });

        try {
          const updatedUser = await updateProfile(updates);

          set({
            user: updatedUser,
            isLoading: false,
          });
        } catch (error) {
          const message = error instanceof Error
            ? error.message
            : 'Failed to update profile';

          set({
            isLoading: false,
            error: message,
          });

          throw error;
        }
      },

      // =========================================================================
      // SESSION MANAGEMENT
      // =========================================================================

      initialize: async () => {
        if (get().isInitialized) return;

        set({ isLoading: true });

        try {
          // Initialize IndexedDB
          await initDB();

          // Restore session
          const user = await restoreSession();

          if (user) {
            // Check offline validity
            const offlineAuth = await checkOfflineAuth();

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              isInitialized: true,
              offlineValidUntil: offlineAuth.expiresAt,
              daysRemainingOffline: offlineAuth.daysRemaining,
            });

            // Initialize sync
            await initSync();
          } else {
            set({
              isLoading: false,
              isInitialized: true,
            });
          }
        } catch (error) {
          console.error('[UserStore] Initialization failed:', error);
          set({
            isLoading: false,
            isInitialized: true,
            error: 'Failed to restore session',
          });
        }
      },

      refreshUser: async () => {
        try {
          const user = await getCurrentUser();
          if (user) {
            const offlineAuth = await checkOfflineAuth();

            set({
              user,
              offlineValidUntil: offlineAuth.expiresAt,
              daysRemainingOffline: offlineAuth.daysRemaining,
            });
          }
        } catch (error) {
          console.error('[UserStore] Failed to refresh user:', error);
        }
      },

      // =========================================================================
      // STATUS
      // =========================================================================

      setOnlineStatus: (isOnline: boolean) => {
        set({ isOffline: !isOnline });

        // Refresh user when coming back online
        if (isOnline && get().isAuthenticated) {
          get().refreshUser();
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'darwin-mfc-user',
      partialize: (state) => ({
        // Only persist minimal state
        // Full user data is in IndexedDB
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// =============================================================================
// ONLINE/OFFLINE LISTENER
// =============================================================================

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    useUserStore.getState().setOnlineStatus(true);
  });

  window.addEventListener('offline', () => {
    useUserStore.getState().setOnlineStatus(false);
  });
}

// =============================================================================
// SELECTORS
// =============================================================================

export const selectUser = (state: UserState) => state.user;
export const selectIsAuthenticated = (state: UserState) => state.isAuthenticated;
export const selectIsLoading = (state: UserState) => state.isLoading;
export const selectIsOffline = (state: UserState) => state.isOffline;
export const selectOfflineStatus = (state: UserState) => ({
  isOffline: state.isOffline,
  validUntil: state.offlineValidUntil,
  daysRemaining: state.daysRemainingOffline,
});
