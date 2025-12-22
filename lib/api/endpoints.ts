/**
 * DARWIN-MFC API ENDPOINTS
 * ========================
 *
 * Centralized API endpoint definitions for backend communication.
 * These will connect to the self-hosted PocketBase backend.
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

// Backend URL - will be configured via environment variable
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090';

// API version prefix
export const API_VERSION = '/api/v1';

// Full base URL with version
export const API_URL = `${API_BASE_URL}${API_VERSION}`;

// =============================================================================
// ENDPOINT DEFINITIONS
// =============================================================================

export const ENDPOINTS = {
  // =========================================================================
  // AUTH ENDPOINTS (Keycloak OAuth2)
  // =========================================================================
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    register: '/auth/register',
    me: '/auth/me',
    updateProfile: '/auth/profile',
    deleteAccount: '/auth/delete',
  },

  // =========================================================================
  // USER ENDPOINTS
  // =========================================================================
  users: {
    list: '/users',
    get: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    mentors: '/users/mentors',
    search: '/users/search',
  },

  // =========================================================================
  // LEARNING PROGRESS ENDPOINTS
  // =========================================================================
  progress: {
    list: '/progress',
    get: (learningPathId: string) => `/progress/${learningPathId}`,
    update: (learningPathId: string, moduleId: string) =>
      `/progress/${learningPathId}/modules/${moduleId}`,
    complete: (learningPathId: string, moduleId: string) =>
      `/progress/${learningPathId}/modules/${moduleId}/complete`,
    certificate: (learningPathId: string) => `/progress/${learningPathId}/certificate`,
  },

  // =========================================================================
  // FAVORITES ENDPOINTS
  // =========================================================================
  favorites: {
    list: '/favorites',
    add: '/favorites',
    remove: (itemType: string, itemId: string) => `/favorites/${itemType}/${itemId}`,
    sync: '/favorites/sync',
  },

  // =========================================================================
  // NOTES ENDPOINTS
  // =========================================================================
  notes: {
    list: '/notes',
    get: (itemType: string, itemId: string) => `/notes/${itemType}/${itemId}`,
    save: '/notes',
    delete: (itemType: string, itemId: string) => `/notes/${itemType}/${itemId}`,
    sync: '/notes/sync',
  },

  // =========================================================================
  // FORUM ENDPOINTS
  // =========================================================================
  forum: {
    categories: '/forum/categories',
    posts: {
      list: '/forum/posts',
      get: (postId: string) => `/forum/posts/${postId}`,
      create: '/forum/posts',
      update: (postId: string) => `/forum/posts/${postId}`,
      delete: (postId: string) => `/forum/posts/${postId}`,
      replies: (postId: string) => `/forum/posts/${postId}/replies`,
    },
    replies: {
      create: (postId: string) => `/forum/posts/${postId}/replies`,
      update: (postId: string, replyId: string) => `/forum/posts/${postId}/replies/${replyId}`,
      delete: (postId: string, replyId: string) => `/forum/posts/${postId}/replies/${replyId}`,
    },
  },

  // =========================================================================
  // CLINICAL CASES ENDPOINTS
  // =========================================================================
  cases: {
    list: '/cases',
    get: (caseId: string) => `/cases/${caseId}`,
    create: '/cases',
    update: (caseId: string) => `/cases/${caseId}`,
    delete: (caseId: string) => `/cases/${caseId}`,
    submit: (caseId: string) => `/cases/${caseId}/submit`,
    review: (caseId: string) => `/cases/${caseId}/review`,
    comments: (caseId: string) => `/cases/${caseId}/comments`,
  },

  // =========================================================================
  // MENTORSHIP ENDPOINTS
  // =========================================================================
  mentorship: {
    list: '/mentorship',
    request: '/mentorship/request',
    accept: (mentorshipId: string) => `/mentorship/${mentorshipId}/accept`,
    decline: (mentorshipId: string) => `/mentorship/${mentorshipId}/decline`,
    end: (mentorshipId: string) => `/mentorship/${mentorshipId}/end`,
    messages: (mentorshipId: string) => `/mentorship/${mentorshipId}/messages`,
  },

  // =========================================================================
  // SYNC ENDPOINTS
  // =========================================================================
  sync: {
    push: '/sync/push',
    pull: '/sync/pull',
    status: '/sync/status',
    resolve: '/sync/resolve',
  },

  // =========================================================================
  // CONTENT ENDPOINTS (for dynamic content updates)
  // =========================================================================
  content: {
    diseases: '/content/diseases',
    medications: '/content/medications',
    protocols: '/content/protocols',
    calculators: '/content/calculators',
    updates: '/content/updates',
    version: '/content/version',
  },

  // =========================================================================
  // SEARCH ENDPOINTS
  // =========================================================================
  search: {
    global: '/search',
    diseases: '/search/diseases',
    medications: '/search/medications',
    forum: '/search/forum',
    cases: '/search/cases',
  },

  // =========================================================================
  // ANALYTICS ENDPOINTS (privacy-respecting)
  // =========================================================================
  analytics: {
    event: '/analytics/event',
    heartbeat: '/analytics/heartbeat',
  },
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
