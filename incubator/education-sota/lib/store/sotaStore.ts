/**
 * DARWIN-MFC SOTA STORE
 * =====================
 *
 * Zustand store for SOTA integration state management.
 * Handles student profile, knowledge gaps, learning paths, and real-time updates.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { sotaApi, SOTAConnectionError, SOTAAuthError } from '../api/sota-client';
import { sotaWebSocket } from '../api/sota-websocket';
import {
  SOTAStudentProfile,
  SOTAKnowledgeState,
  SOTAKnowledgeGapAnalysis,
  SOTAAdaptiveLearningPath,
  SOTALearningSession,
  SOTAAdaptiveFeedback,
  SOTAProgressUpdate,
  SOTAPredictiveInsights,
  SOTAConnectionStatus,
  SOTAAuthToken,
  LearningConstraints,
  SOTASessionType,
  SOTAIntegrationState,
  SOTAIntegrationActions,
} from '../types/sota';
import {
  transformSOTAKnowledgeStatesToNodes,
  transformSOTAGapAnalysisForDisplay,
  transformSOTAPathForDisplay,
} from '../api/sota-transformers';

// =============================================================================
// STORE INTERFACE
// =============================================================================

interface SOTAStore extends SOTAIntegrationState, SOTAIntegrationActions {
  // Additional UI state
  diagnosticInProgress: boolean;
  pathGenerationInProgress: boolean;
  sessionInProgress: boolean;
}

// =============================================================================
// INITIAL STATE
// =============================================================================

const initialState: SOTAIntegrationState & {
  diagnosticInProgress: boolean;
  pathGenerationInProgress: boolean;
  sessionInProgress: boolean;
} = {
  connectionStatus: {
    isConnected: false,
    isWebSocketConnected: false,
    lastApiCall: null,
    lastWebSocketMessage: null,
    error: null,
    latency: null,
  },
  authContext: {
    isAuthenticated: false,
    token: null,
    studentProfile: null,
    lastSync: null,
  },
  studentProfile: null,
  knowledgeStates: [],
  knowledgeGapAnalysis: null,
  lastDiagnosticDate: null,
  adaptiveLearningPath: null,
  currentSession: null,
  realtimeFeedback: [],
  pendingSync: false,
  isLoading: false,
  error: null,
  diagnosticInProgress: false,
  pathGenerationInProgress: false,
  sessionInProgress: false,
};

// =============================================================================
// STORE IMPLEMENTATION
// =============================================================================

export const useSotaStore = create<SOTAStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // =========================================================================
      // AUTHENTICATION
      // =========================================================================

      authenticate: async (darwinToken: string): Promise<boolean> => {
        set({ isLoading: true, error: null });

        try {
          // Check SOTA health first
          const isHealthy = await sotaApi.checkHealth();
          if (!isHealthy) {
            throw new SOTAConnectionError('SOTA backend is not available');
          }

          // Exchange Darwin token for SOTA token
          const sotaToken = await sotaApi.authenticate(darwinToken);

          set({
            authContext: {
              isAuthenticated: true,
              token: sotaToken,
              studentProfile: null,
              lastSync: new Date().toISOString(),
            },
            connectionStatus: {
              ...get().connectionStatus,
              isConnected: true,
              error: null,
            },
            isLoading: false,
          });

          // Initialize student profile
          await get().initializeStudent();

          return true;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
          set({
            isLoading: false,
            error: errorMessage,
            connectionStatus: {
              ...get().connectionStatus,
              isConnected: false,
              error: errorMessage,
            },
          });
          return false;
        }
      },

      logout: (): void => {
        sotaApi.logout().catch(() => {}); // Best effort logout
        sotaWebSocket.disconnect();

        set({
          ...initialState,
        });
      },

      // =========================================================================
      // STUDENT PROFILE
      // =========================================================================

      initializeStudent: async (): Promise<void> => {
        set({ isLoading: true, error: null });

        try {
          // Get or create student profile
          let profile: SOTAStudentProfile;

          try {
            profile = await sotaApi.getStudentProfile();
          } catch (error) {
            // Profile doesn't exist, create it
            if (error instanceof Error && error.message.includes('404')) {
              profile = await sotaApi.initializeStudent({});
            } else {
              throw error;
            }
          }

          // Get knowledge states
          const knowledgeStates = await sotaApi.getKnowledgeStates();

          set({
            studentProfile: profile,
            knowledgeStates,
            authContext: {
              ...get().authContext,
              studentProfile: profile,
            },
            isLoading: false,
          });

          // Connect WebSocket for real-time updates
          get().connectWebSocket();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to initialize student';
          set({
            isLoading: false,
            error: errorMessage,
          });
        }
      },

      syncStudentProfile: async (): Promise<void> => {
        set({ pendingSync: true });

        try {
          const profile = await sotaApi.getStudentProfile();
          const knowledgeStates = await sotaApi.getKnowledgeStates();

          set({
            studentProfile: profile,
            knowledgeStates,
            authContext: {
              ...get().authContext,
              studentProfile: profile,
              lastSync: new Date().toISOString(),
            },
            pendingSync: false,
          });
        } catch (error) {
          set({ pendingSync: false });
          throw error;
        }
      },

      // =========================================================================
      // KNOWLEDGE DIAGNOSTIC
      // =========================================================================

      runDiagnosis: async (): Promise<SOTAKnowledgeGapAnalysis> => {
        const { studentProfile, knowledgeStates } = get();

        if (!studentProfile) {
          throw new Error('Student profile not initialized');
        }

        set({ diagnosticInProgress: true, error: null });

        try {
          const analysis = await sotaApi.diagnoseKnowledgeGaps({
            studentProfile,
            performanceData: [], // Will be populated from local data
            knowledgeStates,
          });

          set({
            knowledgeGapAnalysis: analysis,
            lastDiagnosticDate: new Date().toISOString(),
            diagnosticInProgress: false,
          });

          return analysis;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Diagnosis failed';
          set({
            diagnosticInProgress: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      refreshDiagnosis: async (): Promise<void> => {
        await get().runDiagnosis();
      },

      // =========================================================================
      // ADAPTIVE LEARNING PATH
      // =========================================================================

      generateAdaptivePath: async (
        constraints: LearningConstraints
      ): Promise<SOTAAdaptiveLearningPath> => {
        const { knowledgeGapAnalysis } = get();

        if (!knowledgeGapAnalysis) {
          // Run diagnosis first if not available
          await get().runDiagnosis();
        }

        set({ pathGenerationInProgress: true, error: null });

        try {
          const path = await sotaApi.generateLearningPath(
            get().knowledgeGapAnalysis!,
            constraints
          );

          set({
            adaptiveLearningPath: path,
            pathGenerationInProgress: false,
          });

          return path;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Path generation failed';
          set({
            pathGenerationInProgress: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      // =========================================================================
      // LEARNING SESSIONS
      // =========================================================================

      startSession: async (request: {
        sessionType: SOTASessionType;
        moduleId?: string;
        contentId?: string;
      }): Promise<SOTALearningSession> => {
        set({ sessionInProgress: true, error: null });

        try {
          const { studentProfile } = get();
          if (!studentProfile) {
            throw new Error('Student profile not initialized');
          }

          const session = await sotaApi.startSession({
            studentId: studentProfile.id,
            ...request,
          });

          set({
            currentSession: session,
            sessionInProgress: true,
          });

          // Notify WebSocket
          sotaWebSocket.startSession({
            sessionType: request.sessionType,
            moduleId: request.moduleId,
            contentId: request.contentId,
          });

          return session;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to start session';
          set({
            sessionInProgress: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      endSession: async (sessionId: string): Promise<void> => {
        try {
          await sotaApi.endSession(sessionId);
          sotaWebSocket.endSession(sessionId);

          set({
            currentSession: null,
            sessionInProgress: false,
          });

          // Sync profile after session
          await get().syncStudentProfile();
        } catch (error) {
          set({ sessionInProgress: false });
          throw error;
        }
      },

      recordProgress: (progress: SOTAProgressUpdate): void => {
        // Send to WebSocket for real-time processing
        sotaWebSocket.sendProgress(progress);
      },

      // =========================================================================
      // REAL-TIME (WEBSOCKET)
      // =========================================================================

      connectWebSocket: (): void => {
        const { authContext } = get();
        if (!authContext.token) {
          console.warn('[SOTA Store] Cannot connect WebSocket: No token');
          return;
        }

        sotaWebSocket.connect(authContext.token.accessToken);

        // Set up event handlers
        sotaWebSocket.onConnect(() => {
          set({
            connectionStatus: {
              ...get().connectionStatus,
              isWebSocketConnected: true,
            },
          });
        });

        sotaWebSocket.onDisconnect(() => {
          set({
            connectionStatus: {
              ...get().connectionStatus,
              isWebSocketConnected: false,
            },
          });
        });

        sotaWebSocket.onAdaptiveFeedback((feedback: SOTAAdaptiveFeedback) => {
          set({
            realtimeFeedback: [...get().realtimeFeedback.slice(-9), feedback],
            connectionStatus: {
              ...get().connectionStatus,
              lastWebSocketMessage: new Date().toISOString(),
            },
          });
        });

        sotaWebSocket.onDifficultyAdjustment(({ newDifficulty }) => {
          const { adaptiveLearningPath } = get();
          if (adaptiveLearningPath) {
            // Update current module difficulty
            const updatedPath = {
              ...adaptiveLearningPath,
              adaptiveFactors: {
                ...adaptiveLearningPath.adaptiveFactors,
                preferredDifficulty: newDifficulty,
              },
            };
            set({ adaptiveLearningPath: updatedPath });
          }
        });

        sotaWebSocket.onError(({ message }) => {
          set({
            connectionStatus: {
              ...get().connectionStatus,
              error: message,
            },
          });
        });
      },

      disconnectWebSocket: (): void => {
        sotaWebSocket.disconnect();
        set({
          connectionStatus: {
            ...get().connectionStatus,
            isWebSocketConnected: false,
          },
        });
      },

      // =========================================================================
      // SYNC
      // =========================================================================

      syncAll: async (): Promise<void> => {
        set({ pendingSync: true, error: null });

        try {
          await get().syncStudentProfile();

          // Refresh diagnosis if older than 24 hours
          const lastDiagnostic = get().lastDiagnosticDate;
          if (!lastDiagnostic || isOlderThan24Hours(lastDiagnostic)) {
            await get().runDiagnosis();
          }

          // Update learning path if exists
          const { adaptiveLearningPath } = get();
          if (adaptiveLearningPath) {
            const updatedPath = await sotaApi.getCurrentLearningPath();
            if (updatedPath) {
              set({ adaptiveLearningPath: updatedPath });
            }
          }

          set({ pendingSync: false });
        } catch (error) {
          set({ pendingSync: false });
          throw error;
        }
      },

      clearError: (): void => {
        set({ error: null });
      },
    }),
    {
      name: 'darwin-mfc-sota',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist essential data
        studentProfile: state.studentProfile,
        knowledgeGapAnalysis: state.knowledgeGapAnalysis,
        lastDiagnosticDate: state.lastDiagnosticDate,
        adaptiveLearningPath: state.adaptiveLearningPath,
        authContext: {
          ...state.authContext,
          // Don't persist tokens for security
          token: null,
        },
      }),
    }
  )
);

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function isOlderThan24Hours(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  return diffHours > 24;
}

// =============================================================================
// SELECTORS
// =============================================================================

export const selectIsAuthenticated = (state: SOTAStore) =>
  state.authContext.isAuthenticated && sotaApi.isAuthenticated();

export const selectConnectionStatus = (state: SOTAStore) => state.connectionStatus;

export const selectStudentProfile = (state: SOTAStore) => state.studentProfile;

export const selectKnowledgeNodes = (state: SOTAStore) =>
  transformSOTAKnowledgeStatesToNodes(state.knowledgeStates);

export const selectKnowledgeGapAnalysis = (state: SOTAStore) =>
  state.knowledgeGapAnalysis
    ? transformSOTAGapAnalysisForDisplay(state.knowledgeGapAnalysis)
    : null;

export const selectAdaptiveLearningPath = (state: SOTAStore) =>
  state.adaptiveLearningPath
    ? transformSOTAPathForDisplay(state.adaptiveLearningPath)
    : null;

export const selectCurrentSession = (state: SOTAStore) => state.currentSession;

export const selectRealtimeFeedback = (state: SOTAStore) => state.realtimeFeedback;

export const selectIsLoading = (state: SOTAStore) =>
  state.isLoading ||
  state.diagnosticInProgress ||
  state.pathGenerationInProgress;

export const selectError = (state: SOTAStore) => state.error;
