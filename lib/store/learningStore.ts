import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  UserLearningProgress,
  ModuleProgress,
  ProgressStatus,
  ModuleProgressStatus,
  LearningPath,
  Certificate,
  SM2CardState,
  SM2Quality,
} from '../types/learning';

// =============================================================================
// LEARNING STORE TYPES
// =============================================================================

interface LearningState {
  // Progress tracking
  pathProgress: Record<string, UserLearningProgress>;

  // Flashcard state (SM-2 algorithm)
  flashcardStates: Record<string, SM2CardState>;

  // Certificates earned
  certificates: Certificate[];

  // Streak tracking
  streakDays: number;
  lastActivityDate: string | null;

  // Bookmarks
  bookmarkedPaths: string[];
}

interface LearningActions {
  // Path progress actions
  startPath: (pathId: string, path: LearningPath) => void;
  getPathProgress: (pathId: string) => UserLearningProgress | undefined;

  // Module progress actions
  startModule: (pathId: string, moduleId: string) => void;
  completeModule: (pathId: string, moduleId: string, score?: number) => void;
  updateModuleTime: (pathId: string, moduleId: string, minutes: number) => void;
  saveModulePosition: (pathId: string, moduleId: string, position: number) => void;
  recordQuizAttempt: (pathId: string, moduleId: string, score: number, passed: boolean) => void;

  // Path completion
  completePath: (pathId: string, certificate?: Certificate) => void;

  // Flashcard actions (SM-2 algorithm)
  reviewFlashcard: (cardId: string, quality: SM2Quality) => void;
  getFlashcardState: (cardId: string) => SM2CardState | undefined;
  getDueFlashcards: (pathId: string) => string[];

  // Certificate actions
  addCertificate: (certificate: Certificate) => void;
  getCertificate: (learningPathId: string) => Certificate | undefined;

  // Bookmark actions
  toggleBookmark: (pathId: string) => void;
  isBookmarked: (pathId: string) => boolean;

  // Analytics helpers
  getOverallProgress: (pathId: string) => number;
  getCompletedModules: (pathId: string) => number;
  getTotalTimeSpent: (pathId: string) => number;

  // Streak tracking
  updateStreak: () => void;

  // Reset
  resetPathProgress: (pathId: string) => void;
  resetAllProgress: () => void;
}

type LearningStore = LearningState & LearningActions;

// =============================================================================
// SM-2 ALGORITHM HELPERS
// =============================================================================

function calculateNextReview(
  cardState: SM2CardState | undefined,
  quality: SM2Quality
): SM2CardState {
  const now = new Date().toISOString();

  if (!cardState) {
    // New card - initialize
    return {
      cardId: '',
      easeFactor: 2.5,
      interval: quality >= 3 ? 1 : 0,
      repetitions: quality >= 3 ? 1 : 0,
      nextReviewDate: quality >= 3
        ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        : now,
      lastReviewDate: now,
    };
  }

  let { easeFactor, interval, repetitions } = cardState;

  // SM-2 algorithm
  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect response - reset
    repetitions = 0;
    interval = 1;
  }

  // Update ease factor
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  const nextReviewDate = new Date(
    Date.now() + interval * 24 * 60 * 60 * 1000
  ).toISOString();

  return {
    cardId: cardState.cardId,
    easeFactor,
    interval,
    repetitions,
    nextReviewDate,
    lastReviewDate: now,
  };
}

// =============================================================================
// LEARNING STORE
// =============================================================================

export const useLearningStore = create<LearningStore>()(
  persist(
    (set, get) => ({
      // Initial state
      pathProgress: {},
      flashcardStates: {},
      certificates: [],
      streakDays: 0,
      lastActivityDate: null,
      bookmarkedPaths: [],

      // =======================================================================
      // PATH PROGRESS ACTIONS
      // =======================================================================

      startPath: (pathId, path) => {
        const now = new Date().toISOString();
        const existing = get().pathProgress[pathId];

        if (existing) return; // Already started

        // Initialize module progress for all modules
        const moduleProgress: ModuleProgress[] = path.modules.map((module, index) => ({
          moduleId: module.id,
          status: index === 0 ? 'available' : 'locked', // First module available
          attempts: 0,
          timeSpentMinutes: 0,
        }));

        const progress: UserLearningProgress = {
          id: `user_${pathId}`,
          userId: 'local_user',
          learningPathId: pathId,
          status: 'in_progress',
          startedAt: now,
          lastAccessedAt: now,
          moduleProgress,
        };

        set((state) => ({
          pathProgress: {
            ...state.pathProgress,
            [pathId]: progress,
          },
        }));

        get().updateStreak();
      },

      getPathProgress: (pathId) => get().pathProgress[pathId],

      // =======================================================================
      // MODULE PROGRESS ACTIONS
      // =======================================================================

      startModule: (pathId, moduleId) => {
        const now = new Date().toISOString();

        set((state) => {
          const pathProg = state.pathProgress[pathId];
          if (!pathProg) return state;

          const updatedModules = pathProg.moduleProgress.map((mp) =>
            mp.moduleId === moduleId
              ? {
                  ...mp,
                  status: 'in_progress' as ModuleProgressStatus,
                  startedAt: mp.startedAt || now,
                }
              : mp
          );

          return {
            pathProgress: {
              ...state.pathProgress,
              [pathId]: {
                ...pathProg,
                moduleProgress: updatedModules,
                lastAccessedAt: now,
              },
            },
          };
        });

        get().updateStreak();
      },

      completeModule: (pathId, moduleId, score) => {
        const now = new Date().toISOString();

        set((state) => {
          const pathProg = state.pathProgress[pathId];
          if (!pathProg) return state;

          let moduleIndex = -1;
          const updatedModules = pathProg.moduleProgress.map((mp, index) => {
            if (mp.moduleId === moduleId) {
              moduleIndex = index;
              return {
                ...mp,
                status: 'completed' as ModuleProgressStatus,
                completedAt: now,
                score: score ?? mp.score,
              };
            }
            return mp;
          });

          // Unlock next module if exists
          if (moduleIndex >= 0 && moduleIndex < updatedModules.length - 1) {
            const nextModule = updatedModules[moduleIndex + 1];
            if (nextModule.status === 'locked') {
              updatedModules[moduleIndex + 1] = {
                ...nextModule,
                status: 'available',
              };
            }
          }

          // Check if all modules completed
          const allCompleted = updatedModules.every(
            (mp) => mp.status === 'completed'
          );

          // Calculate overall score
          const completedWithScores = updatedModules.filter(
            (mp) => mp.status === 'completed' && mp.score !== undefined
          );
          const overallScore = completedWithScores.length > 0
            ? Math.round(
                completedWithScores.reduce((sum, mp) => sum + (mp.score || 0), 0) /
                completedWithScores.length
              )
            : undefined;

          return {
            pathProgress: {
              ...state.pathProgress,
              [pathId]: {
                ...pathProg,
                moduleProgress: updatedModules,
                lastAccessedAt: now,
                status: allCompleted ? 'completed' : pathProg.status,
                completedAt: allCompleted ? now : pathProg.completedAt,
                overallScore,
              },
            },
          };
        });

        get().updateStreak();
      },

      updateModuleTime: (pathId, moduleId, minutes) => {
        set((state) => {
          const pathProg = state.pathProgress[pathId];
          if (!pathProg) return state;

          const updatedModules = pathProg.moduleProgress.map((mp) =>
            mp.moduleId === moduleId
              ? { ...mp, timeSpentMinutes: mp.timeSpentMinutes + minutes }
              : mp
          );

          return {
            pathProgress: {
              ...state.pathProgress,
              [pathId]: {
                ...pathProg,
                moduleProgress: updatedModules,
                lastAccessedAt: new Date().toISOString(),
              },
            },
          };
        });
      },

      saveModulePosition: (pathId, moduleId, position) => {
        set((state) => {
          const pathProg = state.pathProgress[pathId];
          if (!pathProg) return state;

          const updatedModules = pathProg.moduleProgress.map((mp) =>
            mp.moduleId === moduleId ? { ...mp, lastPosition: position } : mp
          );

          return {
            pathProgress: {
              ...state.pathProgress,
              [pathId]: {
                ...pathProg,
                moduleProgress: updatedModules,
              },
            },
          };
        });
      },

      recordQuizAttempt: (pathId, moduleId, score, passed) => {
        const now = new Date().toISOString();

        set((state) => {
          const pathProg = state.pathProgress[pathId];
          if (!pathProg) return state;

          const updatedModules = pathProg.moduleProgress.map((mp) =>
            mp.moduleId === moduleId
              ? {
                  ...mp,
                  attempts: mp.attempts + 1,
                  score: Math.max(mp.score || 0, score),
                  status: passed
                    ? ('completed' as ModuleProgressStatus)
                    : ('in_progress' as ModuleProgressStatus),
                  completedAt: passed ? now : mp.completedAt,
                }
              : mp
          );

          return {
            pathProgress: {
              ...state.pathProgress,
              [pathId]: {
                ...pathProg,
                moduleProgress: updatedModules,
                lastAccessedAt: now,
              },
            },
          };
        });

        // If passed, complete the module to unlock next
        if (passed) {
          get().completeModule(pathId, moduleId, score);
        }

        get().updateStreak();
      },

      // =======================================================================
      // PATH COMPLETION
      // =======================================================================

      completePath: (pathId, certificate) => {
        const now = new Date().toISOString();

        set((state) => {
          const pathProg = state.pathProgress[pathId];
          if (!pathProg) return state;

          const newState: Partial<LearningState> = {
            pathProgress: {
              ...state.pathProgress,
              [pathId]: {
                ...pathProg,
                status: certificate ? 'certified' : 'completed',
                completedAt: now,
                certificateId: certificate?.id,
              },
            },
          };

          if (certificate) {
            newState.certificates = [...state.certificates, certificate];
          }

          return newState as LearningState;
        });
      },

      // =======================================================================
      // FLASHCARD ACTIONS (SM-2)
      // =======================================================================

      reviewFlashcard: (cardId, quality) => {
        set((state) => {
          const currentState = state.flashcardStates[cardId];
          const newState = calculateNextReview(currentState, quality);
          newState.cardId = cardId;

          return {
            flashcardStates: {
              ...state.flashcardStates,
              [cardId]: newState,
            },
          };
        });

        get().updateStreak();
      },

      getFlashcardState: (cardId) => get().flashcardStates[cardId],

      getDueFlashcards: (pathId) => {
        const now = new Date();
        const states = get().flashcardStates;

        return Object.entries(states)
          .filter(([id, state]) => {
            if (!id.startsWith(pathId)) return false;
            return new Date(state.nextReviewDate) <= now;
          })
          .map(([id]) => id);
      },

      // =======================================================================
      // CERTIFICATE ACTIONS
      // =======================================================================

      addCertificate: (certificate) => {
        set((state) => ({
          certificates: [...state.certificates, certificate],
        }));
      },

      getCertificate: (learningPathId) => {
        return get().certificates.find(
          (cert) => cert.learningPathId === learningPathId
        );
      },

      // =======================================================================
      // BOOKMARK ACTIONS
      // =======================================================================

      toggleBookmark: (pathId) => {
        set((state) => {
          const isBookmarked = state.bookmarkedPaths.includes(pathId);
          return {
            bookmarkedPaths: isBookmarked
              ? state.bookmarkedPaths.filter((id) => id !== pathId)
              : [...state.bookmarkedPaths, pathId],
          };
        });
      },

      isBookmarked: (pathId) => get().bookmarkedPaths.includes(pathId),

      // =======================================================================
      // ANALYTICS HELPERS
      // =======================================================================

      getOverallProgress: (pathId) => {
        const progress = get().pathProgress[pathId];
        if (!progress) return 0;

        const completed = progress.moduleProgress.filter(
          (mp) => mp.status === 'completed'
        ).length;
        const total = progress.moduleProgress.length;

        return total > 0 ? Math.round((completed / total) * 100) : 0;
      },

      getCompletedModules: (pathId) => {
        const progress = get().pathProgress[pathId];
        if (!progress) return 0;

        return progress.moduleProgress.filter(
          (mp) => mp.status === 'completed'
        ).length;
      },

      getTotalTimeSpent: (pathId) => {
        const progress = get().pathProgress[pathId];
        if (!progress) return 0;

        return progress.moduleProgress.reduce(
          (total, mp) => total + mp.timeSpentMinutes,
          0
        );
      },

      // =======================================================================
      // STREAK TRACKING
      // =======================================================================

      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastActivityDate, streakDays } = get();

        if (lastActivityDate === today) return; // Already updated today

        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];

        let newStreak = streakDays;

        if (lastActivityDate === yesterday) {
          // Continuing streak
          newStreak = streakDays + 1;
        } else if (lastActivityDate !== today) {
          // Streak broken or first activity
          newStreak = 1;
        }

        set({
          streakDays: newStreak,
          lastActivityDate: today,
        });
      },

      // =======================================================================
      // RESET ACTIONS
      // =======================================================================

      resetPathProgress: (pathId) => {
        set((state) => {
          const { [pathId]: removed, ...remaining } = state.pathProgress;
          return { pathProgress: remaining };
        });
      },

      resetAllProgress: () => {
        set({
          pathProgress: {},
          flashcardStates: {},
          certificates: [],
          streakDays: 0,
          lastActivityDate: null,
          bookmarkedPaths: [],
        });
      },
    }),
    {
      name: 'darwin-mfc-learning',
      partialize: (state) => ({
        pathProgress: state.pathProgress,
        flashcardStates: state.flashcardStates,
        certificates: state.certificates,
        streakDays: state.streakDays,
        lastActivityDate: state.lastActivityDate,
        bookmarkedPaths: state.bookmarkedPaths,
      }),
    }
  )
);
