/**
 * Correction Feedback Store
 * ==========================
 *
 * Zustand store for persisting NER entity correction feedback.
 * Supports user feedback collection, analytics, and model improvement.
 *
 * Features:
 * - Persistent storage (localStorage)
 * - Session-based grouping
 * - Statistics and analytics
 * - Export/import functionality
 * - Feedback deduplication
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { EntityCorrection, FeedbackType, CorrectionEntity } from '@/app/components/AI/EntityCorrectionModal';
import type { EntityType } from '@/lib/ai/models/onnx-config';

// =============================================================================
// TYPES
// =============================================================================

export interface CorrectionSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  noteId?: string;
  noteText?: string;
  corrections: EntityCorrection[];
  metadata?: Record<string, unknown>;
}

export interface CorrectionStats {
  totalCorrections: number;
  byFeedbackType: Record<FeedbackType, number>;
  byEntityType: Record<string, number>;
  bySource: Record<string, number>;
  accuracyRate: number; // % of "correct" feedback
  sessionCount: number;
  averageCorrectionsPerSession: number;
  mostCommonMistakes: Array<{
    originalType: EntityType;
    correctedType: EntityType;
    count: number;
  }>;
}

export interface CorrectionFeedbackState {
  // Data
  sessions: CorrectionSession[];
  currentSessionId: string | null;

  // Actions
  startSession: (noteId?: string, noteText?: string) => string;
  endSession: (sessionId?: string) => void;
  addCorrection: (correction: EntityCorrection) => void;
  addBatchCorrections: (corrections: EntityCorrection[]) => void;
  removeCorrection: (correctionId: string) => void;
  clearSession: (sessionId: string) => void;
  clearAllSessions: () => void;

  // Queries
  getSession: (sessionId: string) => CorrectionSession | undefined;
  getCurrentSession: () => CorrectionSession | undefined;
  getAllCorrections: () => EntityCorrection[];
  getCorrectionsForNote: (noteId: string) => EntityCorrection[];
  getStats: () => CorrectionStats;

  // Export/Import
  exportCorrections: () => string;
  importCorrections: (json: string) => boolean;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function calculateStats(sessions: CorrectionSession[]): CorrectionStats {
  const allCorrections = sessions.flatMap(s => s.corrections);

  const byFeedbackType: Record<FeedbackType, number> = {
    correct: 0,
    incorrect_text: 0,
    incorrect_type: 0,
    incorrect_both: 0,
    missing: 0,
    spurious: 0,
  };

  const byEntityType: Record<string, number> = {};
  const bySource: Record<string, number> = {};
  const typeMistakes: Map<string, number> = new Map();

  for (const correction of allCorrections) {
    // Count by feedback type
    byFeedbackType[correction.feedbackType]++;

    // Count by entity type
    if (correction.originalEntity) {
      const type = correction.originalEntity.type;
      byEntityType[type] = (byEntityType[type] || 0) + 1;

      // Count by source
      const source = correction.originalEntity.source || 'unknown';
      bySource[source] = (bySource[source] || 0) + 1;

      // Track type changes
      if ((correction.feedbackType === 'incorrect_type' || correction.feedbackType === 'incorrect_both') && correction.correctedEntity) {
        const key = `${correction.originalEntity.type}->${correction.correctedEntity.type}`;
        typeMistakes.set(key, (typeMistakes.get(key) || 0) + 1);
      }
    }
  }

  // Calculate accuracy rate (exclude 'missing' - those are entities the model didn't detect)
  const totalWithFeedback = allCorrections.filter(c => c.feedbackType !== 'missing').length;
  const accuracyRate = totalWithFeedback > 0
    ? (byFeedbackType.correct / totalWithFeedback) * 100
    : 0;

  // Find most common mistakes
  const mostCommonMistakes = Array.from(typeMistakes.entries())
    .map(([key, count]) => {
      const [original, corrected] = key.split('->') as [EntityType, EntityType];
      return { originalType: original, correctedType: corrected, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalCorrections: allCorrections.length,
    byFeedbackType,
    byEntityType,
    bySource,
    accuracyRate,
    sessionCount: sessions.length,
    averageCorrectionsPerSession: sessions.length > 0
      ? allCorrections.length / sessions.length
      : 0,
    mostCommonMistakes,
  };
}

// =============================================================================
// STORE DEFINITION
// =============================================================================

export const useCorrectionFeedbackStore = create<CorrectionFeedbackState>()(
  persist(
    (set, get) => ({
      // Initial state
      sessions: [],
      currentSessionId: null,

      // Start a new session
      startSession: (noteId?: string, noteText?: string) => {
        const sessionId = generateSessionId();
        const newSession: CorrectionSession = {
          id: sessionId,
          startTime: new Date(),
          noteId,
          noteText,
          corrections: [],
        };

        set(state => ({
          sessions: [...state.sessions, newSession],
          currentSessionId: sessionId,
        }));

        return sessionId;
      },

      // End the current session
      endSession: (sessionId?: string) => {
        const targetId = sessionId || get().currentSessionId;
        if (!targetId) return;

        set(state => ({
          sessions: state.sessions.map(s =>
            s.id === targetId ? { ...s, endTime: new Date() } : s
          ),
          currentSessionId: state.currentSessionId === targetId ? null : state.currentSessionId,
        }));
      },

      // Add a single correction
      addCorrection: (correction: EntityCorrection) => {
        const { currentSessionId, sessions } = get();

        // Auto-start session if none active
        let sessionId = currentSessionId;
        if (!sessionId) {
          sessionId = get().startSession();
        }

        set(state => ({
          sessions: state.sessions.map(s =>
            s.id === sessionId
              ? { ...s, corrections: [...s.corrections, correction] }
              : s
          ),
        }));
      },

      // Add multiple corrections at once
      addBatchCorrections: (corrections: EntityCorrection[]) => {
        const { currentSessionId } = get();

        let sessionId = currentSessionId;
        if (!sessionId) {
          sessionId = get().startSession();
        }

        set(state => ({
          sessions: state.sessions.map(s =>
            s.id === sessionId
              ? { ...s, corrections: [...s.corrections, ...corrections] }
              : s
          ),
        }));
      },

      // Remove a correction
      removeCorrection: (correctionId: string) => {
        set(state => ({
          sessions: state.sessions.map(s => ({
            ...s,
            corrections: s.corrections.filter(c => {
              // Match by original entity text and timestamp
              const id = `${c.originalEntity?.text}-${c.timestamp.getTime()}`;
              return id !== correctionId;
            }),
          })),
        }));
      },

      // Clear all corrections in a session
      clearSession: (sessionId: string) => {
        set(state => ({
          sessions: state.sessions.map(s =>
            s.id === sessionId ? { ...s, corrections: [] } : s
          ),
        }));
      },

      // Clear all sessions
      clearAllSessions: () => {
        set({ sessions: [], currentSessionId: null });
      },

      // Get a specific session
      getSession: (sessionId: string) => {
        return get().sessions.find(s => s.id === sessionId);
      },

      // Get the current session
      getCurrentSession: () => {
        const { currentSessionId, sessions } = get();
        if (!currentSessionId) return undefined;
        return sessions.find(s => s.id === currentSessionId);
      },

      // Get all corrections across sessions
      getAllCorrections: () => {
        return get().sessions.flatMap(s => s.corrections);
      },

      // Get corrections for a specific note
      getCorrectionsForNote: (noteId: string) => {
        return get().sessions
          .filter(s => s.noteId === noteId)
          .flatMap(s => s.corrections);
      },

      // Get statistics
      getStats: () => {
        return calculateStats(get().sessions);
      },

      // Export corrections as JSON
      exportCorrections: () => {
        const { sessions } = get();
        return JSON.stringify(
          {
            version: '1.0',
            exportDate: new Date().toISOString(),
            sessions: sessions.map(s => ({
              ...s,
              startTime: s.startTime.toISOString(),
              endTime: s.endTime?.toISOString(),
              corrections: s.corrections.map(c => ({
                ...c,
                timestamp: c.timestamp.toISOString(),
              })),
            })),
          },
          null,
          2
        );
      },

      // Import corrections from JSON
      importCorrections: (json: string) => {
        try {
          const data = JSON.parse(json);

          if (!data.sessions || !Array.isArray(data.sessions)) {
            console.error('Invalid correction data format');
            return false;
          }

          const importedSessions: CorrectionSession[] = data.sessions.map((s: CorrectionSession) => ({
            ...s,
            startTime: new Date(s.startTime),
            endTime: s.endTime ? new Date(s.endTime) : undefined,
            corrections: s.corrections.map((c: EntityCorrection) => ({
              ...c,
              timestamp: new Date(c.timestamp),
            })),
          }));

          set(state => ({
            sessions: [...state.sessions, ...importedSessions],
          }));

          return true;
        } catch (error) {
          console.error('Failed to import corrections:', error);
          return false;
        }
      },
    }),
    {
      name: 'darwin-mfc-ner-corrections',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sessions: state.sessions.map(s => ({
          ...s,
          startTime: s.startTime.toISOString(),
          endTime: s.endTime?.toISOString(),
          corrections: s.corrections.map(c => ({
            ...c,
            timestamp: c.timestamp.toISOString(),
          })),
        })),
        currentSessionId: state.currentSessionId,
      }),
      onRehydrateStorage: () => (state) => {
        // Convert ISO strings back to Date objects
        if (state) {
          state.sessions = state.sessions.map((s: CorrectionSession) => ({
            ...s,
            startTime: new Date(s.startTime),
            endTime: s.endTime ? new Date(s.endTime) : undefined,
            corrections: s.corrections.map((c: EntityCorrection) => ({
              ...c,
              timestamp: new Date(c.timestamp),
            })),
          }));
        }
      },
    }
  )
);

// =============================================================================
// HOOKS
// =============================================================================

/**
 * Hook for quick access to correction stats
 */
export function useCorrectionStats(): CorrectionStats {
  const getStats = useCorrectionFeedbackStore(state => state.getStats);
  return getStats();
}

/**
 * Hook for current session management
 */
export function useCurrentSession() {
  const currentSessionId = useCorrectionFeedbackStore(state => state.currentSessionId);
  const getCurrentSession = useCorrectionFeedbackStore(state => state.getCurrentSession);
  const startSession = useCorrectionFeedbackStore(state => state.startSession);
  const endSession = useCorrectionFeedbackStore(state => state.endSession);
  const addCorrection = useCorrectionFeedbackStore(state => state.addCorrection);

  return {
    sessionId: currentSessionId,
    session: getCurrentSession(),
    startSession,
    endSession,
    addCorrection,
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

export default useCorrectionFeedbackStore;
