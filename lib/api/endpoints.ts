/**
 * DARWIN-MFC API ENDPOINTS
 * ========================
 *
 * Centralized API endpoint definitions for backend communication.
 * Connects to PHP/PostgreSQL backend hosted on Locaweb.
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

// Backend URL - configured via environment variable
// Production: https://agourakis.med.br/api or http://agourakis1.hospedagemdesites.ws/api
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090';

// API version prefix (empty for PHP backend, which uses /api directly)
export const API_VERSION = '';

// Full base URL
export const API_URL = `${API_BASE_URL}${API_VERSION}`;

// =============================================================================
// ENDPOINT DEFINITIONS
// =============================================================================

export const ENDPOINTS = {
  // =========================================================================
  // AUTH ENDPOINTS (JWT-based)
  // =========================================================================
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
    updateProfile: '/auth/profile',
    deleteAccount: '/auth/delete',
  },

  // =========================================================================
  // USER ENDPOINTS
  // =========================================================================
  usuario: {
    profile: '/usuario/profile',
    notas: '/usuario/notas',
    favoritos: '/usuario/favoritos',
  },

  // =========================================================================
  // MEDICATIONS ENDPOINTS
  // =========================================================================
  medicamentos: {
    list: '/medicamentos',
    get: (id: string) => `/medicamentos/${id}`,
  },

  // =========================================================================
  // DISEASES ENDPOINTS
  // =========================================================================
  doencas: {
    list: '/doencas',
    get: (id: string) => `/doencas/${id}`,
  },

  // =========================================================================
  // PROTOCOLS ENDPOINTS
  // =========================================================================
  protocolos: {
    list: '/protocolos',
    get: (id: string) => `/protocolos/${id}`,
  },

  // =========================================================================
  // DRUG INTERACTIONS ENDPOINTS
  // =========================================================================
  interacoes: {
    check: '/interacoes',
    forMedication: (medId: string) => `/interacoes?med=${medId}`,
    checkPair: (med1: string, med2: string) => `/interacoes?med1=${med1}&med2=${med2}`,
  },

  // =========================================================================
  // SEARCH ENDPOINTS
  // =========================================================================
  search: {
    global: '/search',
  },

  // =========================================================================
  // SYNC ENDPOINTS
  // =========================================================================
  sync: {
    push: '/sync/push',
    pull: '/sync/pull',
    status: '/sync/status',
    resolve: '/sync/resolve',
    conflicts: '/sync/conflicts',
  },

  // =========================================================================
  // FAVORITES & NOTES (standalone endpoints)
  // =========================================================================
  favorites: {
    list: '/usuario/favoritos',
    sync: '/usuario/favoritos/sync',
    add: '/usuario/favoritos',
    remove: (id: string) => `/usuario/favoritos/${id}`,
  },
  notes: {
    list: '/usuario/notas',
    sync: '/usuario/notas/sync',
    add: '/usuario/notas',
    update: (id: string) => `/usuario/notas/${id}`,
    remove: (id: string) => `/usuario/notas/${id}`,
  },

  // =========================================================================
  // HEALTH CHECK
  // =========================================================================
  health: '/health',
} as const;

// =============================================================================
// HELPER TYPES
// =============================================================================

export type EndpointKey = keyof typeof ENDPOINTS;

// =============================================================================
// URL BUILDERS
// =============================================================================

/**
 * Build full URL for an endpoint
 */
export function buildUrl(path: string, params?: Record<string, string>): string {
  let url = `${API_URL}${path}`;

  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  return url;
}

/**
 * Build paginated URL
 */
export function buildPaginatedUrl(
  path: string,
  page: number = 1,
  limit: number = 20,
  params?: Record<string, string>
): string {
  return buildUrl(path, {
    page: page.toString(),
    limit: limit.toString(),
    ...params,
  });
}
