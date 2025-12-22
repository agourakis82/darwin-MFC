/**
 * DARWIN-MFC API CLIENT
 * =====================
 *
 * Offline-first API client with automatic retry, queue management,
 * and seamless online/offline switching.
 *
 * Features:
 * - Automatic token refresh
 * - Request queuing when offline
 * - Retry with exponential backoff
 * - Request/response interceptors
 * - Compression support
 * - Timeout handling
 */

import { API_URL, buildUrl } from './endpoints';
import { authTokensDB, syncQueueDB } from '../db/indexedDB';

// =============================================================================
// TYPES
// =============================================================================

export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string>;
  timeout?: number;
  retry?: boolean;
  retryCount?: number;
  requiresAuth?: boolean;
  offlineQueue?: boolean;
  signal?: AbortSignal;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  headers: Headers;
  ok: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
  hasMore: boolean;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const DEFAULT_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;
const RETRY_DELAYS = [1000, 2000, 4000]; // Exponential backoff

// =============================================================================
// ONLINE/OFFLINE STATUS
// =============================================================================

let isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    isOnline = true;
    processSyncQueue();
  });

  window.addEventListener('offline', () => {
    isOnline = false;
  });
}

export function getOnlineStatus(): boolean {
  return isOnline;
}

// =============================================================================
// TOKEN MANAGEMENT
// =============================================================================

let accessToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;

/**
 * Set access token (call after login)
 */
export function setAccessToken(token: string | null): void {
  accessToken = token;
}

/**
 * Get current access token
 */
export async function getAccessToken(): Promise<string | null> {
  if (accessToken) return accessToken;

  // Try to get from IndexedDB
  const tokens = await authTokensDB.get();
  if (tokens && !await authTokensDB.isExpired()) {
    accessToken = tokens.accessToken;
    return accessToken;
  }

  return null;
}

/**
 * Refresh access token
 */
async function refreshAccessToken(): Promise<string | null> {
  // Prevent multiple simultaneous refresh attempts
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const tokens = await authTokensDB.get();
      if (!tokens?.refreshToken) return null;

      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: tokens.refreshToken }),
      });

      if (!response.ok) {
        await authTokensDB.clear();
        accessToken = null;
        return null;
      }

      const data = await response.json();

      // Calculate offline validity (7 days from now)
      const offlineValidUntil = new Date();
      offlineValidUntil.setDate(offlineValidUntil.getDate() + 7);

      await authTokensDB.save({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt,
        offlineValidUntil: offlineValidUntil.toISOString(),
        userId: tokens.userId,
      });

      accessToken = data.accessToken;
      return accessToken;
    } catch (error) {
      console.error('[API] Token refresh failed:', error);
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// =============================================================================
// CORE REQUEST FUNCTION
// =============================================================================

/**
 * Make an API request
 */
export async function apiRequest<T = unknown>(
  endpoint: string,
  config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    headers = {},
    body,
    params,
    timeout = DEFAULT_TIMEOUT,
    retry = true,
    retryCount = 0,
    requiresAuth = true,
    offlineQueue = false,
    signal,
  } = config;

  // Build URL
  const url = buildUrl(endpoint, params);

  // Check if we're offline
  if (!isOnline) {
    if (offlineQueue && method !== 'GET') {
      // Queue for later sync
      await queueRequest(endpoint, config);
      throw new OfflineError('Request queued for offline sync');
    }
    throw new OfflineError('No internet connection');
  }

  // Build headers
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate',
    ...headers,
  };

  // Add auth token if required
  if (requiresAuth) {
    const token = await getAccessToken();
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  // Combine signals if provided
  const combinedSignal = signal
    ? anySignal([signal, controller.signal])
    : controller.signal;

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
      signal: combinedSignal,
    });

    clearTimeout(timeoutId);

    // Handle 401 - try to refresh token
    if (response.status === 401 && requiresAuth && retryCount < 1) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        return apiRequest<T>(endpoint, {
          ...config,
          retryCount: retryCount + 1,
        });
      }
    }

    // Parse response
    let data: T;
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text() as unknown as T;
    }

    if (!response.ok) {
      throw new ApiRequestError(
        (data as ApiError).message || 'Request failed',
        response.status,
        (data as ApiError).code,
        (data as ApiError).details
      );
    }

    return {
      data,
      status: response.status,
      headers: response.headers,
      ok: true,
    };
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle abort
    if (error instanceof Error && error.name === 'AbortError') {
      throw new TimeoutError('Request timed out');
    }

    // Handle network errors with retry
    if (error instanceof TypeError && retry && retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAYS[retryCount] || RETRY_DELAYS[RETRY_DELAYS.length - 1];
      await sleep(delay);
      return apiRequest<T>(endpoint, {
        ...config,
        retryCount: retryCount + 1,
      });
    }

    throw error;
  }
}

// =============================================================================
// CONVENIENCE METHODS
// =============================================================================

export const api = {
  get: <T = unknown>(endpoint: string, config?: Omit<ApiRequestConfig, 'method'>) =>
    apiRequest<T>(endpoint, { ...config, method: 'GET' }),

  post: <T = unknown>(endpoint: string, body?: unknown, config?: Omit<ApiRequestConfig, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...config, method: 'POST', body }),

  put: <T = unknown>(endpoint: string, body?: unknown, config?: Omit<ApiRequestConfig, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...config, method: 'PUT', body }),

  patch: <T = unknown>(endpoint: string, body?: unknown, config?: Omit<ApiRequestConfig, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...config, method: 'PATCH', body }),

  delete: <T = unknown>(endpoint: string, config?: Omit<ApiRequestConfig, 'method'>) =>
    apiRequest<T>(endpoint, { ...config, method: 'DELETE' }),
};

// =============================================================================
// OFFLINE QUEUE
// =============================================================================

/**
 * Queue a request for later sync
 */
async function queueRequest(endpoint: string, config: ApiRequestConfig): Promise<void> {
  const tokens = await authTokensDB.get();

  await syncQueueDB.add({
    userId: tokens?.userId || 'anonymous',
    operation: config.method === 'DELETE' ? 'delete' : config.method === 'POST' ? 'create' : 'update',
    store: endpoint.split('/')[1] || 'unknown',
    recordId: endpoint,
    payload: {
      endpoint,
      method: config.method,
      body: config.body,
      params: config.params,
    },
  });
}

/**
 * Process queued requests when back online
 */
export async function processSyncQueue(): Promise<void> {
  if (!isOnline) return;

  const pending = await syncQueueDB.getPending();
  console.log(`[API] Processing ${pending.length} queued requests`);

  for (const operation of pending) {
    try {
      await syncQueueDB.markInProgress(operation.id);

      const { endpoint, method, body, params } = operation.payload as {
        endpoint: string;
        method: string;
        body?: unknown;
        params?: Record<string, string>;
      };

      await apiRequest(endpoint, {
        method: method as ApiRequestConfig['method'],
        body,
        params,
        offlineQueue: false, // Don't re-queue
      });

      await syncQueueDB.markCompleted(operation.id);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      await syncQueueDB.markFailed(operation.id, message);
    }
  }
}

// =============================================================================
// ERROR CLASSES
// =============================================================================

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

export class OfflineError extends Error {
  constructor(message: string = 'No internet connection') {
    super(message);
    this.name = 'OfflineError';
  }
}

export class TimeoutError extends Error {
  constructor(message: string = 'Request timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Combine multiple abort signals
 */
function anySignal(signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();

  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort();
      return controller.signal;
    }
    signal.addEventListener('abort', () => controller.abort(), { once: true });
  }

  return controller.signal;
}

// =============================================================================
// HEALTH CHECK
// =============================================================================

/**
 * Check API health
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    return response.ok;
  } catch {
    return false;
  }
}
