/**
 * DARWIN-MFC SOTA API CLIENT
 * ==========================
 *
 * Client for communicating with the Medical-Education-SOTA backend.
 * Handles authentication, requests, and response transformation.
 */

import {
  SOTA_API_URL,
  SOTA_ENABLED,
  SOTA_ENDPOINTS,
  buildSotaUrl,
} from './sota-endpoints';

import {
  SOTAAuthToken,
  SOTAStudentProfile,
  SOTAKnowledgeState,
  SOTAKnowledgeGapAnalysis,
  SOTAAdaptiveLearningPath,
  SOTALearningSession,
  SOTAPerformanceData,
  SOTADiagnosticRequest,
  SOTADiagnosticResponse,
  SOTALearningPathRequest,
  SOTALearningPathResponse,
  SOTASessionRequest,
  SOTASessionResponse,
  SOTAPredictiveInsights,
  LearningConstraints,
} from '../types/sota';

// =============================================================================
// TYPES
// =============================================================================

interface SOTARequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string>;
  timeout?: number;
  requiresAuth?: boolean;
}

interface SOTAResponse<T = unknown> {
  success: boolean;
  data: T;
  error?: string;
  metadata?: Record<string, unknown>;
}

// =============================================================================
// ERROR CLASSES
// =============================================================================

export class SOTAApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'SOTAApiError';
  }
}

export class SOTAConnectionError extends Error {
  constructor(message: string = 'Unable to connect to SOTA backend') {
    super(message);
    this.name = 'SOTAConnectionError';
  }
}

export class SOTAAuthError extends Error {
  constructor(message: string = 'SOTA authentication failed') {
    super(message);
    this.name = 'SOTAAuthError';
  }
}

// =============================================================================
// SOTA API CLIENT CLASS
// =============================================================================

class SOTAApiClient {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenExpiresAt: number = 0;
  private refreshPromise: Promise<boolean> | null = null;

  // ===========================================================================
  // CONFIGURATION
  // ===========================================================================

  /**
   * Check if SOTA integration is enabled
   */
  isEnabled(): boolean {
    return SOTA_ENABLED;
  }

  /**
   * Set authentication tokens
   */
  setTokens(tokens: SOTAAuthToken): void {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
    this.tokenExpiresAt = Date.now() + tokens.expiresIn * 1000;
  }

  /**
   * Clear authentication tokens
   */
  clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.tokenExpiresAt = 0;
  }

  /**
   * Check if authenticated
   */
  isAuthenticated(): boolean {
    return !!this.accessToken && Date.now() < this.tokenExpiresAt;
  }

  // ===========================================================================
  // CORE REQUEST METHOD
  // ===========================================================================

  private async request<T>(
    endpoint: string,
    config: SOTARequestConfig = {}
  ): Promise<SOTAResponse<T>> {
    if (!this.isEnabled()) {
      throw new SOTAConnectionError('SOTA integration is disabled');
    }

    const {
      method = 'GET',
      headers = {},
      body,
      params,
      timeout = 30000,
      requiresAuth = true,
    } = config;

    // Ensure authentication if required
    if (requiresAuth && !this.isAuthenticated()) {
      if (this.refreshToken) {
        const refreshed = await this.refreshAccessToken();
        if (!refreshed) {
          throw new SOTAAuthError('Token refresh failed');
        }
      } else {
        throw new SOTAAuthError('Not authenticated');
      }
    }

    // Build URL
    const url = buildSotaUrl(endpoint, params);

    // Build headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers,
    };

    if (requiresAuth && this.accessToken) {
      requestHeaders['Authorization'] = `Bearer ${this.accessToken}`;
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle 401 - try to refresh token
      if (response.status === 401 && requiresAuth && this.refreshToken) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          // Retry request with new token
          return this.request<T>(endpoint, config);
        }
        throw new SOTAAuthError('Authentication expired');
      }

      const responseData = await response.json();

      if (!response.ok) {
        throw new SOTAApiError(
          responseData.error || 'Request failed',
          response.status,
          responseData.code
        );
      }

      return responseData as SOTAResponse<T>;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        throw new SOTAConnectionError('Request timed out');
      }

      if (error instanceof SOTAApiError || error instanceof SOTAAuthError) {
        throw error;
      }

      throw new SOTAConnectionError('Network error');
    }
  }

  // ===========================================================================
  // TOKEN REFRESH
  // ===========================================================================

  private async refreshAccessToken(): Promise<boolean> {
    // Prevent multiple simultaneous refresh attempts
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const response = await fetch(buildSotaUrl(SOTA_ENDPOINTS.auth.refresh), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: this.refreshToken }),
        });

        if (!response.ok) {
          this.clearTokens();
          return false;
        }

        const data = await response.json();
        this.setTokens(data.data);
        return true;
      } catch {
        this.clearTokens();
        return false;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  // ===========================================================================
  // AUTHENTICATION
  // ===========================================================================

  /**
   * Exchange Darwin-MFC token for SOTA token
   */
  async authenticate(darwinToken: string): Promise<SOTAAuthToken> {
    const response = await this.request<SOTAAuthToken>(
      SOTA_ENDPOINTS.auth.exchange,
      {
        method: 'POST',
        body: { darwinToken },
        requiresAuth: false,
      }
    );

    this.setTokens(response.data);
    return response.data;
  }

  /**
   * Validate current token
   */
  async validateToken(): Promise<boolean> {
    try {
      await this.request(SOTA_ENDPOINTS.auth.validate);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Logout and clear tokens
   */
  async logout(): Promise<void> {
    try {
      await this.request(SOTA_ENDPOINTS.auth.logout, { method: 'POST' });
    } finally {
      this.clearTokens();
    }
  }

  // ===========================================================================
  // HEALTH CHECK
  // ===========================================================================

  /**
   * Check SOTA backend health
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(buildSotaUrl(SOTA_ENDPOINTS.health.check), {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  // ===========================================================================
  // STUDENT PROFILE
  // ===========================================================================

  /**
   * Initialize student profile in SOTA
   */
  async initializeStudent(profile: Partial<SOTAStudentProfile>): Promise<SOTAStudentProfile> {
    const response = await this.request<SOTAStudentProfile>(
      SOTA_ENDPOINTS.student.initialize,
      {
        method: 'POST',
        body: profile,
      }
    );
    return response.data;
  }

  /**
   * Get current student profile
   */
  async getStudentProfile(): Promise<SOTAStudentProfile> {
    const response = await this.request<SOTAStudentProfile>(
      SOTA_ENDPOINTS.student.profile
    );
    return response.data;
  }

  /**
   * Update student profile
   */
  async updateStudentProfile(updates: Partial<SOTAStudentProfile>): Promise<SOTAStudentProfile> {
    const response = await this.request<SOTAStudentProfile>(
      SOTA_ENDPOINTS.student.update,
      {
        method: 'PATCH',
        body: updates,
      }
    );
    return response.data;
  }

  /**
   * Get student knowledge states
   */
  async getKnowledgeStates(): Promise<SOTAKnowledgeState[]> {
    const response = await this.request<SOTAKnowledgeState[]>(
      SOTA_ENDPOINTS.student.knowledgeStates
    );
    return response.data;
  }

  // ===========================================================================
  // KNOWLEDGE DIAGNOSTIC
  // ===========================================================================

  /**
   * Run full knowledge gap diagnosis
   */
  async diagnoseKnowledgeGaps(
    request: SOTADiagnosticRequest
  ): Promise<SOTAKnowledgeGapAnalysis> {
    const response = await this.request<SOTADiagnosticResponse>(
      SOTA_ENDPOINTS.diagnostic.diagnose,
      {
        method: 'POST',
        body: request,
        timeout: 60000, // Allow longer timeout for AI analysis
      }
    );
    return response.data.data;
  }

  /**
   * Get diagnostic history
   */
  async getDiagnosticHistory(): Promise<SOTAKnowledgeGapAnalysis[]> {
    const response = await this.request<SOTAKnowledgeGapAnalysis[]>(
      SOTA_ENDPOINTS.diagnostic.history
    );
    return response.data;
  }

  /**
   * Get AI recommendations
   */
  async getRecommendations(): Promise<string[]> {
    const response = await this.request<{ recommendations: string[] }>(
      SOTA_ENDPOINTS.diagnostic.recommendations
    );
    return response.data.recommendations;
  }

  // ===========================================================================
  // ADAPTIVE LEARNING PATH
  // ===========================================================================

  /**
   * Generate AI-powered adaptive learning path
   */
  async generateLearningPath(
    knowledgeGaps: SOTAKnowledgeGapAnalysis,
    constraints: LearningConstraints
  ): Promise<SOTAAdaptiveLearningPath> {
    const response = await this.request<SOTALearningPathResponse>(
      SOTA_ENDPOINTS.learning.generatePath,
      {
        method: 'POST',
        body: { knowledgeGaps, constraints },
        timeout: 60000,
      }
    );
    return response.data.data;
  }

  /**
   * Get current learning path
   */
  async getCurrentLearningPath(): Promise<SOTAAdaptiveLearningPath | null> {
    try {
      const response = await this.request<SOTAAdaptiveLearningPath>(
        SOTA_ENDPOINTS.learning.currentPath
      );
      return response.data;
    } catch (error) {
      if (error instanceof SOTAApiError && error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Update learning path based on progress
   */
  async updateLearningPath(
    pathId: string,
    performanceData: SOTAPerformanceData[]
  ): Promise<SOTAAdaptiveLearningPath> {
    const response = await this.request<SOTAAdaptiveLearningPath>(
      SOTA_ENDPOINTS.learning.updatePath,
      {
        method: 'POST',
        body: { pathId, performanceData },
      }
    );
    return response.data;
  }

  /**
   * Complete a module in the learning path
   */
  async completeModule(pathId: string, moduleId: string, score: number): Promise<void> {
    await this.request(
      SOTA_ENDPOINTS.learning.completeModule(pathId, moduleId),
      {
        method: 'POST',
        body: { score },
      }
    );
  }

  /**
   * Request difficulty adjustment for learning path
   */
  async adjustDifficulty(pathId: string, direction: 'easier' | 'harder'): Promise<void> {
    await this.request(
      SOTA_ENDPOINTS.learning.adjustDifficulty(pathId),
      {
        method: 'POST',
        body: { direction },
      }
    );
  }

  // ===========================================================================
  // LEARNING SESSIONS
  // ===========================================================================

  /**
   * Start a learning session
   */
  async startSession(request: SOTASessionRequest): Promise<SOTALearningSession> {
    const response = await this.request<SOTASessionResponse>(
      SOTA_ENDPOINTS.session.start,
      {
        method: 'POST',
        body: request,
      }
    );
    return response.data.data;
  }

  /**
   * End a learning session
   */
  async endSession(sessionId: string): Promise<SOTALearningSession> {
    const response = await this.request<SOTALearningSession>(
      SOTA_ENDPOINTS.session.end(sessionId),
      { method: 'POST' }
    );
    return response.data;
  }

  /**
   * Process session data (for analytics)
   */
  async processSession(sessionData: {
    sessionId: string;
    performanceData: SOTAPerformanceData[];
    engagementMetrics?: Record<string, number>;
  }): Promise<void> {
    await this.request(
      SOTA_ENDPOINTS.session.process,
      {
        method: 'POST',
        body: sessionData,
      }
    );
  }

  /**
   * Get current active session
   */
  async getCurrentSession(): Promise<SOTALearningSession | null> {
    try {
      const response = await this.request<SOTALearningSession>(
        SOTA_ENDPOINTS.session.current
      );
      return response.data;
    } catch (error) {
      if (error instanceof SOTAApiError && error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Get session history
   */
  async getSessionHistory(limit: number = 20): Promise<SOTALearningSession[]> {
    const response = await this.request<SOTALearningSession[]>(
      SOTA_ENDPOINTS.session.history,
      { params: { limit: limit.toString() } }
    );
    return response.data;
  }

  // ===========================================================================
  // ANALYTICS & PREDICTIONS
  // ===========================================================================

  /**
   * Get analytics overview
   */
  async getAnalyticsOverview(): Promise<{
    totalStudyTime: number;
    averageAccuracy: number;
    streak: number;
    topicsCompleted: number;
    predictedExamScore: number;
  }> {
    const response = await this.request<{
      totalStudyTime: number;
      averageAccuracy: number;
      streak: number;
      topicsCompleted: number;
      predictedExamScore: number;
    }>(SOTA_ENDPOINTS.analytics.overview);
    return response.data;
  }

  /**
   * Get performance predictions
   */
  async getPredictions(): Promise<SOTAPredictiveInsights> {
    const response = await this.request<SOTAPredictiveInsights>(
      SOTA_ENDPOINTS.analytics.predictions
    );
    return response.data;
  }

  /**
   * Get engagement metrics
   */
  async getEngagementMetrics(): Promise<{
    dailyActiveMinutes: number[];
    weeklyProgress: number[];
    engagementScore: number;
  }> {
    const response = await this.request<{
      dailyActiveMinutes: number[];
      weeklyProgress: number[];
      engagementScore: number;
    }>(SOTA_ENDPOINTS.analytics.engagement);
    return response.data;
  }

  // ===========================================================================
  // SPACED REPETITION
  // ===========================================================================

  /**
   * Get today's spaced repetition schedule
   */
  async getSpacedRepetitionSchedule(): Promise<{
    dueToday: number;
    items: Array<{ id: string; topic: string; priority: number }>;
  }> {
    const response = await this.request<{
      dueToday: number;
      items: Array<{ id: string; topic: string; priority: number }>;
    }>(SOTA_ENDPOINTS.spacedRepetition.schedule);
    return response.data;
  }

  /**
   * Record spaced repetition response
   */
  async recordSpacedRepetitionResponse(
    itemId: string,
    quality: 0 | 1 | 2 | 3 | 4 | 5
  ): Promise<void> {
    await this.request(
      SOTA_ENDPOINTS.spacedRepetition.recordResponse,
      {
        method: 'POST',
        body: { itemId, quality },
      }
    );
  }

  // ===========================================================================
  // CONTENT GENERATION
  // ===========================================================================

  /**
   * Generate clinical case using LLM
   */
  async generateClinicalCase(topic: string, difficulty: number): Promise<{
    case: {
      presentation: string;
      history: string;
      examination: string;
      questions: Array<{
        question: string;
        options: string[];
        correctIndex: number;
        explanation: string;
      }>;
    };
  }> {
    const response = await this.request<{
      case: {
        presentation: string;
        history: string;
        examination: string;
        questions: Array<{
          question: string;
          options: string[];
          correctIndex: number;
          explanation: string;
        }>;
      };
    }>(SOTA_ENDPOINTS.content.generateCase, {
      method: 'POST',
      body: { topic, difficulty },
      timeout: 60000,
    });
    return response.data;
  }

  /**
   * Generate practice questions using LLM
   */
  async generateQuestions(
    topic: string,
    count: number,
    difficulty: number
  ): Promise<Array<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>> {
    const response = await this.request<Array<{
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    }>>(SOTA_ENDPOINTS.content.generateQuestions, {
      method: 'POST',
      body: { topic, count, difficulty },
      timeout: 60000,
    });
    return response.data;
  }
}

// =============================================================================
// SINGLETON INSTANCE
// =============================================================================

export const sotaApi = new SOTAApiClient();

// =============================================================================
// CONVENIENCE EXPORTS
// =============================================================================

export { SOTAApiClient };
