'use client';

/**
 * STUDY STATS COMPONENT
 * =====================
 *
 * Displays study progress statistics including:
 * - Cards due for review
 * - Overall learning progress
 * - Daily study streak
 * - Weekly activity chart
 */

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  Flame,
  Target,
  TrendingUp,
  Calendar,
  BookOpen,
  CheckCircle2,
  Clock,
  Zap,
} from 'lucide-react';
import { useStudyStore } from '@/lib/store/studyStore';
import { calculateReviewStats } from '@/lib/utils/spaced-repetition';

interface StudyStatsProps {
  totalFlashcards: number;
}

export default function StudyStats({ totalFlashcards }: StudyStatsProps) {
  const t = useTranslations('learning');

  const {
    flashcardSchedules,
    flashcardProgress,
    quizProgress,
    streak,
    totalStudyTime,
    lastStudyDate,
  } = useStudyStore();

  // Calculate review stats
  const reviewStats = useMemo(() => {
    const schedules = Object.values(flashcardSchedules);
    return calculateReviewStats(schedules);
  }, [flashcardSchedules]);

  // Calculate overall accuracy
  const overallAccuracy = useMemo(() => {
    const progressValues = Object.values(flashcardProgress);
    if (progressValues.length === 0) return 0;

    const totalCorrect = progressValues.reduce((acc, p) => acc + p.correctCount, 0);
    const totalReviews = progressValues.reduce((acc, p) => acc + p.reviewCount, 0);

    return totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0;
  }, [flashcardProgress]);

  // Calculate quiz stats
  const quizStats = useMemo(() => {
    const allAttempts = Object.values(quizProgress).flatMap(p => p.attempts);
    const totalQuizzes = Object.keys(quizProgress).length;
    const totalAttempts = allAttempts.length;
    const avgScore = totalAttempts > 0
      ? Math.round(allAttempts.reduce((acc, a) => acc + a.porcentagemAcerto, 0) / totalAttempts)
      : 0;

    return { totalQuizzes, totalAttempts, avgScore };
  }, [quizProgress]);

  // Weekly activity data (last 7 days)
  const weeklyActivity = useMemo(() => {
    const days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      // Count reviews on this day
      const reviewsOnDay = Object.values(flashcardProgress).filter(p => {
        if (!p.lastReviewed) return false;
        const reviewDate = new Date(p.lastReviewed);
        reviewDate.setHours(0, 0, 0, 0);
        return reviewDate.getTime() === date.getTime();
      }).length;

      days.push({
        date,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        reviews: reviewsOnDay,
      });
    }

    return days;
  }, [flashcardProgress]);

  // Get max reviews for scaling the chart
  const maxReviews = useMemo(() => {
    return Math.max(...weeklyActivity.map(d => d.reviews), 1);
  }, [weeklyActivity]);

  // Cards learned (reviewed at least once)
  const cardsLearned = Object.values(flashcardProgress).filter(p => p.reviewCount > 0).length;

  // Stats cards data
  const statsCards = [
    {
      icon: Calendar,
      label: 'Due Today',
      value: reviewStats.dueToday + reviewStats.overdue,
      subtext: reviewStats.overdue > 0 ? `(${reviewStats.overdue} overdue)` : 'cards to review',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      urgent: reviewStats.overdue > 0,
    },
    {
      icon: CheckCircle2,
      label: 'Mastered',
      value: reviewStats.mastered,
      subtext: 'cards mastered',
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
      urgent: false,
    },
    {
      icon: Target,
      label: 'Accuracy',
      value: `${overallAccuracy}%`,
      subtext: 'overall accuracy',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      urgent: false,
    },
    {
      icon: Flame,
      label: 'Streak',
      value: streak,
      subtext: streak === 1 ? 'day streak' : 'days streak',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      urgent: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className={`relative rounded-xl p-4 ${stat.bgColor} border border-transparent ${
              stat.urgent ? 'ring-2 ring-orange-400 dark:ring-orange-500' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              {stat.urgent && (
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
              )}
            </div>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {stat.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Overview */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          Learning Progress
        </h3>

        <div className="space-y-4">
          {/* Cards Progress Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600 dark:text-slate-400">Cards Progress</span>
              <span className="text-slate-900 dark:text-white font-medium">
                {cardsLearned} / {totalFlashcards}
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                style={{ width: `${totalFlashcards > 0 ? (cardsLearned / totalFlashcards) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Mastery Distribution */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="text-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {reviewStats.mastered}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Mastered</div>
            </div>
            <div className="text-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {cardsLearned - reviewStats.mastered - reviewStats.new}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Learning</div>
            </div>
            <div className="text-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <div className="text-lg font-bold text-slate-600 dark:text-slate-400">
                {totalFlashcards - cardsLearned}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">New</div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-500" />
          Weekly Activity
        </h3>

        <div className="flex items-end justify-between gap-2 h-32">
          {weeklyActivity.map((day, index) => {
            const height = day.reviews > 0 ? (day.reviews / maxReviews) * 100 : 4;
            const isToday = index === weeklyActivity.length - 1;

            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    day.reviews > 0
                      ? isToday
                        ? 'bg-emerald-500'
                        : 'bg-emerald-400 dark:bg-emerald-600'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                  style={{ height: `${height}%`, minHeight: '4px' }}
                  title={`${day.reviews} reviews`}
                />
                <span className={`text-xs ${
                  isToday
                    ? 'font-semibold text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {day.dayName}
                </span>
              </div>
            );
          })}
        </div>

        {/* Study time summary */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Clock className="w-4 h-4" />
            <span>Total study time: {Math.round(totalStudyTime)} min</span>
          </div>
          {lastStudyDate && (
            <div className="text-slate-500 dark:text-slate-400">
              Last studied: {new Date(lastStudyDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

      {/* Quiz Stats */}
      {quizStats.totalAttempts > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Quiz Performance
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {quizStats.totalQuizzes}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Quizzes Taken</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {quizStats.totalAttempts}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Total Attempts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {quizStats.avgScore}%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Avg Score</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
