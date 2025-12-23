import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  GamificationState,
  EarnedBadge,
  BadgeProgress,
  XPTransaction,
  XPTransactionType,
  AchievementNotification,
  DailyChallenge,
  Badge,
} from '../types/gamification';
import {
  BADGES,
  getLevelFromXP,
  getBadgeById,
} from '../types/gamification';

// =============================================================================
// GAMIFICATION STORE TYPES
// =============================================================================

interface GamificationActions {
  // XP actions
  addXP: (amount: number, type: XPTransactionType, description?: string, relatedId?: string) => void;
  getTotalXP: () => number;
  getCurrentLevel: () => number;
  
  // Badge actions
  checkAndAwardBadges: () => void;
  awardBadge: (badgeId: string) => void;
  hasBadge: (badgeId: string) => boolean;
  getBadgeProgress: (badgeId: string) => BadgeProgress | undefined;
  updateBadgeProgress: (badgeId: string, value: number) => void;
  
  // Streak actions
  updateStreak: () => void;
  getCurrentStreak: () => number;
  getLongestStreak: () => number;
  
  // Stats tracking
  recordDiseaseView: (diseaseId: string) => void;
  recordMedicationView: (medicationId: string) => void;
  recordProtocolView: (protocolId: string) => void;
  recordCitationView: () => void;
  recordExport: () => void;
  recordQuizComplete: (isPerfect: boolean) => void;
  recordFlashcardReview: () => void;
  
  // Daily challenges
  generateDailyChallenges: () => void;
  updateChallengeProgress: (challengeId: string, progress: number) => void;
  completeChallenge: (challengeId: string) => void;
  
  // Notifications
  addNotification: (notification: Omit<AchievementNotification, 'id' | 'timestamp' | 'dismissed'>) => void;
  dismissNotification: (notificationId: string) => void;
  clearAllNotifications: () => void;
  getPendingNotifications: () => AchievementNotification[];
  
  // Reset
  resetGamification: () => void;
}

type GamificationStore = GamificationState & GamificationActions;

// =============================================================================
// INITIAL STATE
// =============================================================================

const initialState: GamificationState = {
  totalXP: 0,
  currentLevel: 1,
  xpHistory: [],
  earnedBadges: [],
  badgeProgress: {},
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: null,
  dailyChallenges: [],
  pendingNotifications: [],
  stats: {
    diseasesViewed: [],
    medicationsViewed: [],
    protocolsViewed: [],
    citationsViewed: 0,
    exportsCompleted: 0,
    quizzesCompleted: 0,
    perfectQuizzes: 0,
    flashcardsReviewed: 0,
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function generateId(): string {
  return Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
}

function checkBadgeCriteria(badge: Badge, state: GamificationState): boolean {
  const { criteria } = badge;
  const { stats, currentStreak, earnedBadges } = state;
  
  // Don't award if already earned
  if (earnedBadges.some(eb => eb.badgeId === badge.id)) {
    return false;
  }
  
  switch (criteria.type) {
    case 'streak_days':
      return currentStreak >= criteria.target;
    case 'diseases_viewed':
      return stats.diseasesViewed.length >= criteria.target;
    case 'medications_viewed':
      return stats.medicationsViewed.length >= criteria.target;
    case 'protocols_viewed':
      return stats.protocolsViewed.length >= criteria.target;
    case 'citations_viewed':
      return stats.citationsViewed >= criteria.target;
    case 'exports_completed':
      return stats.exportsCompleted >= criteria.target;
    case 'perfect_quizzes':
      return stats.perfectQuizzes >= criteria.target;
    case 'flashcards_reviewed':
      return stats.flashcardsReviewed >= criteria.target;
    case 'custom':
      if (criteria.condition === 'joined_2025') {
        const now = new Date();
        return now.getFullYear() === 2025;
      }
      return false;
    default:
      return false;
  }
}

// =============================================================================
// GAMIFICATION STORE
// =============================================================================

export const useGamificationStore = create<GamificationStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // XP ACTIONS
      addXP: (amount, type, description, relatedId) => {
        const transaction: XPTransaction = {
          id: generateId(),
          type,
          amount,
          timestamp: new Date().toISOString(),
          description,
          relatedId,
        };
        
        set((state) => {
          const newTotalXP = state.totalXP + amount;
          const newLevel = getLevelFromXP(newTotalXP).level;
          const leveledUp = newLevel > state.currentLevel;
          
          if (leveledUp) {
            const levelInfo = getLevelFromXP(newTotalXP);
            get().addNotification({
              type: 'level_up',
              title: 'Level ' + newLevel + '!',
              description: 'You are now a ' + levelInfo.title,
              icon: levelInfo.icon,
              xpEarned: amount,
            });
          }
          
          return {
            totalXP: newTotalXP,
            currentLevel: newLevel,
            xpHistory: [...state.xpHistory.slice(-99), transaction],
          };
        });
        
        get().checkAndAwardBadges();
      },
      
      getTotalXP: () => get().totalXP,
      getCurrentLevel: () => get().currentLevel,
      
      // BADGE ACTIONS
      checkAndAwardBadges: () => {
        const state = get();
        
        BADGES.forEach((badge) => {
          if (!badge.secret && checkBadgeCriteria(badge, state)) {
            get().awardBadge(badge.id);
          }
        });
      },
      
      awardBadge: (badgeId) => {
        const badge = getBadgeById(badgeId);
        if (!badge) return;
        
        const { earnedBadges } = get();
        if (earnedBadges.some(eb => eb.badgeId === badgeId)) return;
        
        const earnedBadge: EarnedBadge = {
          badgeId,
          earnedAt: new Date().toISOString(),
          progress: 100,
        };
        
        set((state) => ({
          earnedBadges: [...state.earnedBadges, earnedBadge],
        }));
        
        get().addXP(badge.xpReward, 'badge_earned', 'Earned badge: ' + badge.name, badgeId);
        
        get().addNotification({
          type: 'badge',
          title: badge.name,
          description: badge.description,
          icon: badge.icon,
          xpEarned: badge.xpReward,
        });
      },
      
      hasBadge: (badgeId) => {
        return get().earnedBadges.some(eb => eb.badgeId === badgeId);
      },
      
      getBadgeProgress: (badgeId) => {
        return get().badgeProgress[badgeId];
      },
      
      updateBadgeProgress: (badgeId, value) => {
        const badge = getBadgeById(badgeId);
        if (!badge) return;
        
        const percentage = Math.min(100, Math.round((value / badge.criteria.target) * 100));
        
        set((state) => ({
          badgeProgress: {
            ...state.badgeProgress,
            [badgeId]: {
              badgeId,
              currentValue: value,
              targetValue: badge.criteria.target,
              percentage,
              lastUpdated: new Date().toISOString(),
            },
          },
        }));
      },
      
      // STREAK ACTIONS
      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastActivityDate, currentStreak, longestStreak } = get();
        
        if (lastActivityDate === today) return;
        
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];
        
        let newStreak = currentStreak;
        
        if (lastActivityDate === yesterday) {
          newStreak = currentStreak + 1;
        } else if (lastActivityDate !== today) {
          newStreak = 1;
        }
        
        const newLongestStreak = Math.max(longestStreak, newStreak);
        
        set({
          currentStreak: newStreak,
          longestStreak: newLongestStreak,
          lastActivityDate: today,
        });
        
        get().checkAndAwardBadges();
        get().addXP(10, 'daily_login', 'Daily login bonus');
      },
      
      getCurrentStreak: () => get().currentStreak,
      getLongestStreak: () => get().longestStreak,
      
      // STATS TRACKING
      recordDiseaseView: (diseaseId) => {
        set((state) => {
          if (state.stats.diseasesViewed.includes(diseaseId)) {
            return state;
          }
          return {
            stats: {
              ...state.stats,
              diseasesViewed: [...state.stats.diseasesViewed, diseaseId],
            },
          };
        });
        get().checkAndAwardBadges();
      },
      
      recordMedicationView: (medicationId) => {
        set((state) => {
          if (state.stats.medicationsViewed.includes(medicationId)) {
            return state;
          }
          return {
            stats: {
              ...state.stats,
              medicationsViewed: [...state.stats.medicationsViewed, medicationId],
            },
          };
        });
        get().checkAndAwardBadges();
      },
      
      recordProtocolView: (protocolId) => {
        set((state) => {
          if (state.stats.protocolsViewed.includes(protocolId)) {
            return state;
          }
          return {
            stats: {
              ...state.stats,
              protocolsViewed: [...state.stats.protocolsViewed, protocolId],
            },
          };
        });
        get().checkAndAwardBadges();
      },
      
      recordCitationView: () => {
        set((state) => ({
          stats: {
            ...state.stats,
            citationsViewed: state.stats.citationsViewed + 1,
          },
        }));
        get().checkAndAwardBadges();
      },
      
      recordExport: () => {
        set((state) => ({
          stats: {
            ...state.stats,
            exportsCompleted: state.stats.exportsCompleted + 1,
          },
        }));
        get().addXP(25, 'community_action', 'Exported document');
        get().checkAndAwardBadges();
      },
      
      recordQuizComplete: (isPerfect) => {
        set((state) => ({
          stats: {
            ...state.stats,
            quizzesCompleted: state.stats.quizzesCompleted + 1,
            perfectQuizzes: isPerfect
              ? state.stats.perfectQuizzes + 1
              : state.stats.perfectQuizzes,
          },
        }));
        
        if (isPerfect) {
          get().addXP(100, 'perfect_quiz', 'Perfect quiz score!');
        } else {
          get().addXP(50, 'quiz_pass', 'Quiz completed');
        }
        
        get().checkAndAwardBadges();
      },
      
      recordFlashcardReview: () => {
        set((state) => ({
          stats: {
            ...state.stats,
            flashcardsReviewed: state.stats.flashcardsReviewed + 1,
          },
        }));
        get().checkAndAwardBadges();
      },
      
      // DAILY CHALLENGES
      generateDailyChallenges: () => {
        const today = new Date().toISOString().split('T')[0];
        const { dailyChallenges } = get();
        
        if (dailyChallenges.some(c => c.date === today)) {
          return;
        }
        
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        
        const challenges: DailyChallenge[] = [
          {
            id: today + '-quiz',
            date: today,
            type: 'quiz',
            title: 'Daily Quiz',
            titleKey: 'gamification.challenges.daily_quiz.title',
            description: 'Complete 1 quiz today',
            descriptionKey: 'gamification.challenges.daily_quiz.description',
            xpReward: 75,
            target: 1,
            progress: 0,
            completed: false,
            expiresAt,
          },
          {
            id: today + '-reading',
            date: today,
            type: 'reading',
            title: 'Daily Reading',
            titleKey: 'gamification.challenges.daily_reading.title',
            description: 'View 3 disease pages',
            descriptionKey: 'gamification.challenges.daily_reading.description',
            xpReward: 50,
            target: 3,
            progress: 0,
            completed: false,
            expiresAt,
          },
        ];
        
        set({ dailyChallenges: challenges });
      },
      
      updateChallengeProgress: (challengeId, progress) => {
        set((state) => ({
          dailyChallenges: state.dailyChallenges.map((c) =>
            c.id === challengeId ? { ...c, progress: Math.min(progress, c.target) } : c
          ),
        }));
        
        const challenge = get().dailyChallenges.find(c => c.id === challengeId);
        if (challenge && challenge.progress >= challenge.target && !challenge.completed) {
          get().completeChallenge(challengeId);
        }
      },
      
      completeChallenge: (challengeId) => {
        const challenge = get().dailyChallenges.find(c => c.id === challengeId);
        if (!challenge || challenge.completed) return;
        
        set((state) => ({
          dailyChallenges: state.dailyChallenges.map((c) =>
            c.id === challengeId ? { ...c, completed: true } : c
          ),
        }));
        
        get().addXP(challenge.xpReward, 'daily_login', 'Completed: ' + challenge.title, challengeId);
        
        get().addNotification({
          type: 'milestone',
          title: 'Challenge Complete!',
          description: challenge.title,
          icon: '🎯',
          xpEarned: challenge.xpReward,
        });
      },
      
      // NOTIFICATIONS
      addNotification: (notification) => {
        const fullNotification: AchievementNotification = {
          ...notification,
          id: generateId(),
          timestamp: new Date().toISOString(),
          dismissed: false,
        };
        
        set((state) => ({
          pendingNotifications: [...state.pendingNotifications, fullNotification],
        }));
      },
      
      dismissNotification: (notificationId) => {
        set((state) => ({
          pendingNotifications: state.pendingNotifications.map((n) =>
            n.id === notificationId ? { ...n, dismissed: true } : n
          ),
        }));
      },
      
      clearAllNotifications: () => {
        set((state) => ({
          pendingNotifications: state.pendingNotifications.map((n) => ({
            ...n,
            dismissed: true,
          })),
        }));
      },
      
      getPendingNotifications: () => {
        return get().pendingNotifications.filter((n) => !n.dismissed);
      },
      
      // RESET
      resetGamification: () => {
        set(initialState);
      },
    }),
    {
      name: 'darwin-mfc-gamification',
      partialize: (state) => ({
        totalXP: state.totalXP,
        currentLevel: state.currentLevel,
        xpHistory: state.xpHistory,
        earnedBadges: state.earnedBadges,
        badgeProgress: state.badgeProgress,
        currentStreak: state.currentStreak,
        longestStreak: state.longestStreak,
        lastActivityDate: state.lastActivityDate,
        dailyChallenges: state.dailyChallenges,
        pendingNotifications: state.pendingNotifications,
        stats: state.stats,
      }),
    }
  )
);
