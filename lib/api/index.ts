/**
 * DARWIN-MFC API MODULE
 * =====================
 *
 * Exports all API utilities, types, and backend client.
 */

// =============================================================================
// EXISTING API (Static Data)
// =============================================================================

// Types
export * from './types';

// Diseases API
export * from './diseases';

// Medications API
export * from './medications';

// Re-export types para conveniência
export type { Doenca } from '@/lib/types/doenca';
export type { Medicamento, Interacao } from '@/lib/types/medicamento';

/**
 * Configuração da API (Static)
 */
export const API_CONFIG = {
  version: '1.0.0',
  baseURL: '/api',
  defaultPageSize: 20,
  maxPageSize: 100,
} as const;

// =============================================================================
// BACKEND API CLIENT (Phase 1+)
// =============================================================================

// API Client
export {
  api,
  apiRequest,
  setAccessToken,
  getAccessToken,
  getOnlineStatus,
  processSyncQueue,
  checkApiHealth,
  ApiRequestError,
  OfflineError,
  TimeoutError,
} from './client';

export type {
  ApiRequestConfig,
  ApiResponse,
  ApiError,
  PaginatedResponse,
} from './client';

// Endpoints
export {
  API_BASE_URL,
  API_VERSION,
  API_URL,
  ENDPOINTS,
  buildUrl,
  buildPaginatedUrl,
} from './endpoints';

// Auth
export {
  login,
  logout,
  register,
  getCurrentUser,
  isAuthenticated,
  getAuthState,
  updateProfile,
  deleteAccount,
  checkOfflineAuth,
  extendOfflineValidity,
  restoreSession,
  subscribeToOnlineStatus,
  AuthError,
} from './auth';

export type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  AuthState,
} from './auth';

