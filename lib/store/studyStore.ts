/**
 * STUDY STORE - ZUSTAND STORE PARA PROGRESSO DE ESTUDO
 * =====================================================
 * 
 * Gerencia estado de progresso em flashcards e quizzes
 * Inclui spaced repetition e histórico de estudos
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ReviewSchedule, Quality, calculateNextInterval, initializeSchedule } from '../utils/spaced-repetition';
import { QuizAttempt, QuizResposta } from '../types/study-mode';

interface StudyProgress {
  flashcardId: string;
  masteryLevel: number; // 0-5 (compatível com Quality)
  lastReviewed: Date | null;
  nextReview: Date | null;
  reviewCount: number;
  correctCount: number;
  incorrectCount: number;
}

interface QuizProgress {
  quizId: string;
  attempts: QuizAttempt[];
  bestScore: number;
  lastAttempt: Date | null;
}

interface StudyStore {
  // Flashcard progress
  flashcardSchedules: Record<string, ReviewSchedule>; // cardId -> schedule
  flashcardProgress: Record<string, StudyProgress>; // cardId -> progress
  
  // Quiz progress
  quizProgress: Record<string, QuizProgress>; // quizId -> progress
  
  // Statistics
  streak: number; // Dias consecutivos estudando
  totalStudyTime: number; // em minutos
  lastStudyDate: Date | null;
  
  // Actions - Flashcards
  initializeFlashcard: (cardId: string) => void;
  updateFlashcardReview: (cardId: string, quality: Quality) => void;
  getFlashcardSchedule: (cardId: string) => ReviewSchedule | null;
  getCardsDueToday: () => ReviewSchedule[];
  
  // Actions - Quizzes
  recordQuizAttempt: (quizId: string, attempt: QuizAttempt) => void;
  getQuizProgress: (quizId: string) => QuizProgress | undefined;
  
  // Actions - Statistics
  updateStudyTime: (minutes: number) => void;
  updateStreak: () => void;
  resetProgress: () => void;
}

const STORAGE_KEY = 'darwin-mfc-study-storage';

export const useStudyStore = create<StudyStore>()(
  persist(
    (set, get) => ({
      // Initial state
      flashcardSchedules: {},
      flashcardProgress: {},
      quizProgress: {},
      streak: 0,
      totalStudyTime: 0,
      lastStudyDate: null,

      // Initialize flashcard schedule
      initializeFlashcard: (cardId: string) => {
        const schedules = get().flashcardSchedules;
        if (!schedules[cardId]) {
          const newSchedule = initializeSchedule(cardId);
          set({
            flashcardSchedules: {
              ...schedules,
              [cardId]: newSchedule,
            },
            flashcardProgress: {
              ...get().flashcardProgress,
              [cardId]: {
                flashcardId: cardId,
                masteryLevel: 0,
                lastReviewed: null,
                nextReview: newSchedule.nextReview,
                reviewCount: 0,
                correctCount: 0,
                incorrectCount: 0,
              },
            },
          });
        }
      },

      // Update flashcard review with quality (0-5)
      updateFlashcardReview: (cardId: string, quality: Quality) => {
        const schedules = get().flashcardSchedules;
        const progress = get().flashcardProgress;
        
        const currentSchedule = schedules[cardId] || null;
        const newSchedule = calculateNextInterval(currentSchedule || initializeSchedule(cardId), quality);
        
        const currentProgress = progress[cardId] || {
          flashcardId: cardId,
          masteryLevel: 0,
          lastReviewed: null,
          nextReview: null,
          reviewCount: 0,
          correctCount: 0,
          incorrectCount: 0,
        };

        const updatedProgress: StudyProgress = {
          ...currentProgress,
          masteryLevel: quality,
          lastReviewed: new Date(),
          nextReview: newSchedule.nextReview,
          reviewCount: currentProgress.reviewCount + 1,
          correctCount: quality >= 3 ? currentProgress.correctCount + 1 : currentProgress.correctCount,
          incorrectCount: quality < 3 ? currentProgress.incorrectCount + 1 : currentProgress.incorrectCount,
        };

        // Update streak if quality >= 3
        if (quality >= 3) {
          get().updateStreak();
        }

        set({
          flashcardSchedules: {
            ...schedules,
            [cardId]: newSchedule,
          },
          flashcardProgress: {
            ...progress,
            [cardId]: updatedProgress,
          },
          lastStudyDate: new Date(),
        });
      },

      // Get flashcard schedule
      getFlashcardSchedule: (cardId: string) => {
        return get().flashcardSchedules[cardId] || null;
      },

      // Get cards due today
      getCardsDueToday: () => {
        const schedules = Object.values(get().flashcardSchedules);
        const today = new Date();
        const todayStart = new Date(today);
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date(today);
        todayEnd.setHours(23, 59, 59, 999);

        return schedules.filter(schedule => {
          const reviewDate = new Date(schedule.nextReview);
          return reviewDate >= todayStart && reviewDate <= todayEnd;
        });
      },

      // Record quiz attempt
      recordQuizAttempt: (quizId: string, attempt: QuizAttempt) => {
        const quizProgress = get().quizProgress;
        const current = quizProgress[quizId] || {
          quizId,
          attempts: [],
          bestScore: 0,
          lastAttempt: null,
        };

        const updated: QuizProgress = {
          ...current,
          attempts: [...current.attempts, attempt],
          bestScore: Math.max(current.bestScore, attempt.pontuacao),
          lastAttempt: new Date(),
        };

        // Update streak
        get().updateStreak();

        set({
          quizProgress: {
            ...quizProgress,
            [quizId]: updated,
          },
          lastStudyDate: new Date(),
        });
      },

      // Get quiz progress
      getQuizProgress: (quizId: string) => {
        return get().quizProgress[quizId];
      },

      // Update study time
      updateStudyTime: (minutes: number) => {
        set({
          totalStudyTime: get().totalStudyTime + minutes,
        });
      },

      // Update streak (consecutive days)
      updateStreak: () => {
        const lastStudyDate = get().lastStudyDate;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!lastStudyDate) {
          // First study session
          set({ streak: 1, lastStudyDate: today });
          return;
        }

        const lastDate = new Date(lastStudyDate);
        lastDate.setHours(0, 0, 0, 0);
        
        const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) {
          // Same day, don't increment
          return;
        } else if (daysDiff === 1) {
          // Consecutive day
          set({ streak: get().streak + 1, lastStudyDate: today });
        } else {
          // Streak broken, restart
          set({ streak: 1, lastStudyDate: today });
        }
      },

      // Reset all progress
      resetProgress: () => {
        set({
          flashcardSchedules: {},
          flashcardProgress: {},
          quizProgress: {},
          streak: 0,
          totalStudyTime: 0,
          lastStudyDate: null,
        });
      },
    }),
    {
      name: STORAGE_KEY,
      // Custom serialization for Dates
      partialize: (state) => ({
        flashcardSchedules: Object.fromEntries(
          Object.entries(state.flashcardSchedules).map(([key, schedule]) => [
            key,
            {
              ...schedule,
              nextReview: schedule.nextReview.toISOString(),
              lastReviewed: schedule.lastReviewed?.toISOString(),
            },
          ])
        ),
        flashcardProgress: Object.fromEntries(
          Object.entries(state.flashcardProgress).map(([key, progress]) => [
            key,
            {
              ...progress,
              lastReviewed: progress.lastReviewed?.toISOString() || null,
              nextReview: progress.nextReview?.toISOString() || null,
            },
          ])
        ),
        quizProgress: Object.fromEntries(
          Object.entries(state.quizProgress).map(([key, progress]) => [
            key,
            {
              ...progress,
              attempts: progress.attempts.map(attempt => ({
                ...attempt,
                timestamp: attempt.timestamp.toISOString(),
              })),
              lastAttempt: progress.lastAttempt?.toISOString() || null,
            },
          ])
        ),
        streak: state.streak,
        totalStudyTime: state.totalStudyTime,
        lastStudyDate: state.lastStudyDate?.toISOString() || null,
      }),
      // Custom deserialization for Dates
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        
        // Restore dates in flashcardSchedules
        Object.values(state.flashcardSchedules).forEach(schedule => {
          schedule.nextReview = new Date(schedule.nextReview);
          if (schedule.lastReviewed) {
            schedule.lastReviewed = new Date(schedule.lastReviewed);
          }
        });

        // Restore dates in flashcardProgress
        Object.values(state.flashcardProgress).forEach(progress => {
          if (progress.lastReviewed) {
            progress.lastReviewed = new Date(progress.lastReviewed);
          }
          if (progress.nextReview) {
            progress.nextReview = new Date(progress.nextReview);
          }
        });

        // Restore dates in quizProgress
        Object.values(state.quizProgress).forEach(progress => {
          progress.attempts.forEach(attempt => {
            attempt.timestamp = new Date(attempt.timestamp);
          });
          if (progress.lastAttempt) {
            progress.lastAttempt = new Date(progress.lastAttempt);
          }
        });

        // Restore lastStudyDate
        if (state.lastStudyDate) {
          state.lastStudyDate = new Date(state.lastStudyDate);
        }
      },
    }
  )
);

