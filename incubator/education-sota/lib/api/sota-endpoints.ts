/**
 * DARWIN-MFC SOTA API ENDPOINTS
 * =============================
 *
 * Endpoint definitions for the Medical-Education-SOTA backend.
 * These connect to the SOTA microservices for AI-powered learning features.
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

// SOTA Backend URL - configured via environment variable
export const SOTA_API_BASE_URL = process.env.NEXT_PUBLIC_SOTA_API_URL || 'http://localhost:8000';

// SOTA WebSocket URL
export const SOTA_WS_URL = process.env.NEXT_PUBLIC_SOTA_WS_URL || 'ws://localhost:8002';

// API version prefix
export const SOTA_API_VERSION = '/api/v1';

// Full base URL with version
export const SOTA_API_URL = `${SOTA_API_BASE_URL}${SOTA_API_VERSION}`;

// Feature flag - enable/disable SOTA integration
export const SOTA_ENABLED = process.env.NEXT_PUBLIC_SOTA_ENABLED === 'true';

// =============================================================================
// ENDPOINT DEFINITIONS
// =============================================================================

export const SOTA_ENDPOINTS = {
  // =========================================================================
  // HEALTH & STATUS
  // =========================================================================
  health: {
    check: '/health',
    status: '/health/status',
    ready: '/health/ready',
  },

  // =========================================================================
  // AUTH ENDPOINTS (Token Exchange)
  // =========================================================================
  auth: {
    exchange: '/auth/exchange', // Exchange Darwin token for SOTA token
    refresh: '/auth/refresh',
    validate: '/auth/validate',
    logout: '/auth/logout',
  },

  // =========================================================================
  // STUDENT PROFILE
  // =========================================================================
  student: {
    initialize: '/student/initialize',
    profile: '/student/profile',
    update: '/student/profile',
    preferences: '/student/preferences',
    knowledgeStates: '/student/knowledge-states',
    syncProgress: '/student/sync-progress',
  },

  // =========================================================================
  // KNOWLEDGE DIAGNOSTIC
  // =========================================================================
  diagnostic: {
    diagnose: '/diagnostic/diagnose',
    analyze: '/diagnostic/analyze',
    gaps: '/diagnostic/gaps',
    strengths: '/diagnostic/strengths',
    recommendations: '/diagnostic/recommendations',
    history: '/diagnostic/history',
  },

  // =========================================================================
  // ADAPTIVE LEARNING PATH
  // =========================================================================
  learning: {
    generatePath: '/learning-path/generate',
    currentPath: '/learning-path/current',
    updatePath: '/learning-path/update',
    modules: (pathId: string) => `/learning-path/${pathId}/modules`,
    moduleProgress: (pathId: string, moduleId: string) =>
      `/learning-path/${pathId}/modules/${moduleId}/progress`,
    completeModule: (pathId: string, moduleId: string) =>
      `/learning-path/${pathId}/modules/${moduleId}/complete`,
    adjustDifficulty: (pathId: string) => `/learning-path/${pathId}/adjust-difficulty`,
  },

  // =========================================================================
  // LEARNING SESSIONS
  // =========================================================================
  session: {
    start: '/session/start',
    end: (sessionId: string) => `/session/${sessionId}/end`,
    pause: (sessionId: string) => `/session/${sessionId}/pause`,
    resume: (sessionId: string) => `/session/${sessionId}/resume`,
    process: '/session/process',
    analytics: (sessionId: string) => `/session/${sessionId}/analytics`,
    current: '/session/current',
    history: '/session/history',
  },

  // =========================================================================
  // CONTENT GENERATION (LLM-powered)
  // =========================================================================
  content: {
    generateCase: '/content/case',
    generateQuestions: '/content/questions',
    generateExplanation: '/content/explanation',
    validate: '/content/validate',
    enrich: '/content/enrich',
  },

  // =========================================================================
  // ANALYTICS & PREDICTIONS
  // =========================================================================
  analytics: {
    overview: '/analytics/overview',
    progress: '/analytics/progress',
    performance: '/analytics/performance',
    predictions: '/analytics/predictions',
    retention: '/analytics/retention',
    engagement: '/analytics/engagement',
    trends: '/analytics/trends',
    export: '/analytics/export',
  },

  // =========================================================================
  // SPACED REPETITION
  // =========================================================================
  spacedRepetition: {
    schedule: '/spaced-repetition/schedule',
    review: '/spaced-repetition/review',
    recordResponse: '/spaced-repetition/response',
    dueTodayCount: '/spaced-repetition/due-today',
    stats: '/spaced-repetition/stats',
  },

  // =========================================================================
  // ASSESSMENTS
  // =========================================================================
  assessment: {
    list: '/assessment',
    get: (assessmentId: string) => `/assessment/${assessmentId}`,
    start: (assessmentId: string) => `/assessment/${assessmentId}/start`,
    submit: (assessmentId: string) => `/assessment/${assessmentId}/submit`,
    results: (assessmentId: string) => `/assessment/${assessmentId}/results`,
    adaptive: '/assessment/adaptive',
  },

  // =========================================================================
  // LMS INTEGRATION
  // =========================================================================
  lms: {
    sync: '/lms/sync',
    importProgress: '/lms/import-progress',
    exportCredentials: '/lms/export-credentials',
    webhooks: '/lms/webhooks',
  },
} as const;

// =============================================================================
// URL BUILDERS
// =============================================================================

/**
 * Build full SOTA URL for an endpoint
 */
export function buildSotaUrl(path: string, params?: Record<string, string>): string {
  let url = `${SOTA_API_URL}${path}`;

  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  return url;
}

/**
 * Build WebSocket URL with token
 */
export function buildWebSocketUrl(token: string): string {
  return `${SOTA_WS_URL}?token=${encodeURIComponent(token)}`;
}

// =============================================================================
// TYPE HELPERS
// =============================================================================

export type SotaEndpointKey = keyof typeof SOTA_ENDPOINTS;
