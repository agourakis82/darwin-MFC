/**
 * DARWIN-MFC AUTH UTILITIES
 * =========================
 *
 * Authentication utilities with offline-first support.
 * Uses Keycloak OAuth2 for online auth with 7-day offline tokens.
 *
 * Features:
 * - OAuth2 authentication flow
 * - Secure token storage in IndexedDB
 * - 7-day offline validity
 * - Pseudonymous accounts support
 * - Session management
 */

import { api, setAccessToken, ApiRequestError } from './client';
import { ENDPOINTS } from './endpoints';
import { authTokensDB, userProfileDB, syncQueueDB } from '../db/indexedDB';
import type { UserProfile } from '../db/schemas';

// =============================================================================
// TYPES
// =============================================================================

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email?: string;
  password: string;
  locale: string;
  countryCode?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: UserProfile;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  isOffline: boolean;
  offlineValidUntil: Date | null;
}

// =============================================================================
// AUTH FUNCTIONS
// =============================================================================

/**
 * Login with username and password
 */
export async function login(credentials: LoginCredentials): Promise<UserProfile> {
  try {
    const response = await api.post<AuthResponse>(
      ENDPOINTS.auth.login,
      credentials,
      { requiresAuth: false }
    );

    const { accessToken, refreshToken, expiresAt, user } = response.data;

    // Calculate offline validity (7 days from now)
    const offlineValidUntil = new Date();
    offlineValidUntil.setDate(offlineValidUntil.getDate() + 7);

    // Store tokens
    await authTokensDB.save({
      accessToken,
      refreshToken,
      expiresAt,
      offlineValidUntil: offlineValidUntil.toISOString(),
      userId: user.id,
    });

    // Store user profile
    await userProfileDB.save(user);

    // Set access token in client
    setAccessToken(accessToken);

    return user;
  } catch (error) {
    if (error instanceof ApiRequestError) {
      if (error.status === 401) {
        throw new AuthError('Invalid username or password', 'INVALID_CREDENTIALS');
      }
      if (error.status === 403) {
        throw new AuthError('Account is disabled', 'ACCOUNT_DISABLED');
      }
    }
    throw error;
  }
}

/**
 * Register new account
 */
export async function register(data: RegisterData): Promise<UserProfile> {
  try {
    const response = await api.post<AuthResponse>(
      ENDPOINTS.auth.register,
      data,
      { requiresAuth: false }
    );

    const { accessToken, refreshToken, expiresAt, user } = response.data;

    // Calculate offline validity (7 days from now)
    const offlineValidUntil = new Date();
    offlineValidUntil.setDate(offlineValidUntil.getDate() + 7);

    // Store tokens
    await authTokensDB.save({
      accessToken,
      refreshToken,
      expiresAt,
      offlineValidUntil: offlineValidUntil.toISOString(),
      userId: user.id,
    });

    // Store user profile
    await userProfileDB.save(user);

    // Set access token in client
    setAccessToken(accessToken);

    return user;
  } catch (error) {
    if (error instanceof ApiRequestError) {
      if (error.status === 409) {
        throw new AuthError('Username already taken', 'USERNAME_EXISTS');
      }
      if (error.status === 400) {
        throw new AuthError('Invalid registration data', 'INVALID_DATA');
      }
    }
    throw error;
  }
}

/**
 * Logout and clear session
 */
export async function logout(): Promise<void> {
  try {
    // Try to logout on server (best effort)
    await api.post(ENDPOINTS.auth.logout, {}, { requiresAuth: true })
      .catch(() => {}); // Ignore errors
  } finally {
    // Always clear local state
    await authTokensDB.clear();
    setAccessToken(null);
  }
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  const tokens = await authTokensDB.get();
  if (!tokens) return null;

  // First, try to get from local storage
  const localUser = await userProfileDB.get(tokens.userId);

  // If online, refresh from server
  if (navigator.onLine) {
    try {
      const response = await api.get<UserProfile>(ENDPOINTS.auth.me);
      await userProfileDB.save(response.data);
      return response.data;
    } catch (error) {
      // If server fails, return local user if available
      if (localUser) return localUser;
      throw error;
    }
  }

  // Offline - check if tokens are still valid
  if (localUser && await authTokensDB.isValid()) {
    return localUser;
  }

  return null;
}

/**
 * Check if user is authenticated (works offline)
 */
export async function isAuthenticated(): Promise<boolean> {
  const tokens = await authTokensDB.get();
  if (!tokens) return false;

  // Check if offline tokens are still valid
  return authTokensDB.isValid();
}

/**
 * Get current auth state
 */
export async function getAuthState(): Promise<AuthState> {
  const tokens = await authTokensDB.get();

  if (!tokens) {
    return {
      isAuthenticated: false,
      isLoading: false,
      user: null,
      isOffline: !navigator.onLine,
      offlineValidUntil: null,
    };
  }

  const user = await userProfileDB.get(tokens.userId);
  const isValid = await authTokensDB.isValid();

  return {
    isAuthenticated: isValid,
    isLoading: false,
    user: user || null,
    isOffline: !navigator.onLine,
    offlineValidUntil: isValid ? new Date(tokens.offlineValidUntil) : null,
  };
}

/**
 * Update user profile
 */
export async function updateProfile(
  updates: Partial<Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<UserProfile> {
  const response = await api.patch<UserProfile>(ENDPOINTS.auth.updateProfile, updates);
  await userProfileDB.save(response.data);
  return response.data;
}

/**
 * Delete account
 */
export async function deleteAccount(): Promise<void> {
  const tokens = await authTokensDB.get();
  if (!tokens) throw new AuthError('Not authenticated', 'NOT_AUTHENTICATED');

  await api.delete(ENDPOINTS.auth.deleteAccount);

  // Clear all local data
  await authTokensDB.clear();
  await userProfileDB.delete(tokens.userId);
  await syncQueueDB.clearCompleted();

  setAccessToken(null);
}

// =============================================================================
// OFFLINE AUTH
// =============================================================================

/**
 * Check offline authentication validity
 */
export async function checkOfflineAuth(): Promise<{
  isValid: boolean;
  daysRemaining: number;
  expiresAt: Date | null;
}> {
  const tokens = await authTokensDB.get();

  if (!tokens) {
    return { isValid: false, daysRemaining: 0, expiresAt: null };
  }

  const now = new Date();
  const expiresAt = new Date(tokens.offlineValidUntil);
  const isValid = now < expiresAt;
  const daysRemaining = isValid
    ? Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return { isValid, daysRemaining, expiresAt };
}

/**
 * Extend offline validity (call when back online)
 */
export async function extendOfflineValidity(): Promise<void> {
  const tokens = await authTokensDB.get();
  if (!tokens) return;

  const offlineValidUntil = new Date();
  offlineValidUntil.setDate(offlineValidUntil.getDate() + 7);

  await authTokensDB.save({
    ...tokens,
    offlineValidUntil: offlineValidUntil.toISOString(),
  });
}

// =============================================================================
// SESSION MANAGEMENT
// =============================================================================

/**
 * Restore session on app start
 */
export async function restoreSession(): Promise<UserProfile | null> {
  try {
    const tokens = await authTokensDB.get();
    if (!tokens) return null;

    // Set token in client
    setAccessToken(tokens.accessToken);

    // Check if we're online and should refresh
    if (navigator.onLine) {
      const isExpired = await authTokensDB.isExpired();
      if (isExpired) {
        // Token expired, need to refresh
        const response = await api.post<AuthResponse>(
          ENDPOINTS.auth.refresh,
          { refreshToken: tokens.refreshToken },
          { requiresAuth: false }
        );

        const { accessToken, refreshToken, expiresAt, user } = response.data;

        // Extend offline validity
        const offlineValidUntil = new Date();
        offlineValidUntil.setDate(offlineValidUntil.getDate() + 7);

        await authTokensDB.save({
          accessToken,
          refreshToken,
          expiresAt,
          offlineValidUntil: offlineValidUntil.toISOString(),
          userId: user.id,
        });

        await userProfileDB.save(user);
        setAccessToken(accessToken);

        return user;
      }
    }

    // Return cached user
    return getCurrentUser();
  } catch (error) {
    console.error('[Auth] Failed to restore session:', error);
    // If refresh fails, check if we can use offline
    if (!navigator.onLine && await authTokensDB.isValid()) {
      return getCurrentUser();
    }
    // Otherwise, clear and return null
    await logout();
    return null;
  }
}

// =============================================================================
// ERROR CLASS
// =============================================================================

export class AuthError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

// =============================================================================
// HOOKS HELPERS (for React)
// =============================================================================

/**
 * Subscribe to online/offline events
 */
export function subscribeToOnlineStatus(callback: (isOnline: boolean) => void): () => void {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}
