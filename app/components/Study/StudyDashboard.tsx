'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, CheckCircle2, AlertCircle, TrendingUp, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGamificationStore } from '@/lib/store/gamificationStore';

interface StudyDashboardProps {
  className?: string;
  compact?: boolean;
}

interface StudySession {
  date: string;
  durationMinutes: number;
  type: 'flashcard' | 'quiz' | 'reading';
  itemsCompleted: number;
}

/**
 * Study Dashboard - Central hub for study activities
 * Shows daily challenges, study history, and recommendations
 */
export function StudyDashboard({
  className,
  compact = false,
}: StudyDashboardProps) {
  const state = useGamificationStore();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');

  // Generate mock study sessions for demonstration
  const mockSessions: StudySession[] = useMemo(() => {
    const sessions: StudySession[] = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      sessions.push({
        date: date.toISOString().split('T')[0],
        durationMinutes: Math.floor(Math.random() * 90) + 15,
        type: ['flashcard', 'quiz', 'reading'][Math.floor(Math.random() * 3)] as any,
        itemsCompleted: Math.floor(Math.random() * 30) + 5,
      });
    }
    return sessions.sort((a, b) => a.date.localeCompare(b.date));
  }, []);

  const totalMinutesThisWeek = mockSessions
    .filter(s => {
      const sessionDate = new Date(s.date);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return sessionDate >= weekAgo;
    })
    .reduce((sum, s) => sum + s.durationMinutes, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  if (compact) {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="card-base p-4">
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                This week
              </span>
            </div>
            <span className="font-bold text-neutral-900 dark:text-neutral-100">
              {totalMinutesThisWeek} min
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={cn('space-y-6', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Study Time Overview */}
      <motion.div variants={itemVariants} className="card-base p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Study Overview
            </h3>
            <div className="flex gap-2">
              {(['week', 'month'] as const).map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    selectedPeriod === period
                      ? 'bg-blue-500 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  )}
                >
                  {period === 'week' ? 'This Week' : 'This Month'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StudyMetric
              icon={<Clock className="w-5 h-5" />}
              label="Study Time"
              value={`${totalMinutesThisWeek} min`}
              color="blue"
            />
            <StudyMetric
              icon={<CheckCircle2 className="w-5 h-5" />}
              label="Items Studied"
              value={mockSessions.reduce((sum, s) => sum + s.itemsCompleted, 0)}
              color="green"
            />
            <StudyMetric
              icon={<TrendingUp className="w-5 h-5" />}
              label="Streak"
              value={`${state.currentStreak} days`}
              color="red"
            />
          </div>
        </div>
      </motion.div>

      {/* Daily Challenge Progress */}
      {state.dailyChallenges.length > 0 && (
        <motion.div variants={itemVariants} className="card-base p-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              Today's Challenges
            </h3>

            <div className="space-y-3">
              {state.dailyChallenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Study Recommendations */}
      <motion.div variants={itemVariants} className="card-base p-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-cyan-500" />
            Recommendations
          </h3>

          <div className="space-y-3">
            {state.currentStreak === 0 ? (
              <RecommendationCard
                title="Start Your Streak!"
                description="Complete any study activity to begin your learning streak."
                actionLabel="View Flashcards"
                color="amber"
              />
            ) : (
              <RecommendationCard
                title="Keep Going!"
                description={`You're on a ${state.currentStreak}-day streak. Complete today's challenges to maintain it.`}
                actionLabel="View Challenges"
                color="green"
              />
            )}

            {state.stats.quizzesCompleted < 5 ? (
              <RecommendationCard
                title="Try a Quiz"
                description="Quizzes are a great way to test your knowledge and earn bonus XP."
                actionLabel="Start Quiz"
                color="blue"
              />
            ) : null}

            {state.stats.flashcardsReviewed < 20 ? (
              <RecommendationCard
                title="Use Spaced Repetition"
                description="Flashcards with spaced repetition help you retain information longer."
                actionLabel="Review Flashcards"
                color="purple"
              />
            ) : null}
          </div>
        </div>
      </motion.div>

      {/* Study History Chart */}
      <motion.div variants={itemVariants} className="card-base p-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
            Study History
          </h3>

          <div className="space-y-2">
            {mockSessions.slice(-7).reverse().map(session => {
              const date = new Date(session.date);
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              const percentage = (session.durationMinutes / 120) * 100; // 120 min = 100%

              return (
                <div key={session.date} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {dayName} {dateStr}
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {session.durationMinutes} min · {session.itemsCompleted} items
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, percentage)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface StudyMetricProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: 'blue' | 'green' | 'red';
}

function StudyMetric({ icon, label, value, color }: StudyMetricProps) {
  const bgColors = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  };

  return (
    <div className={cn('p-4 rounded-lg', bgColors[color])}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm font-medium opacity-75">{label}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

interface ChallengeCardProps {
  challenge: any;
}

function ChallengeCard({ challenge }: ChallengeCardProps) {
  const progress = Math.min(100, Math.round((challenge.progress / challenge.target) * 100));

  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-all',
        challenge.completed
          ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
          : 'bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700'
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1">
          <h4 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
            {challenge.title}
          </h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
            {challenge.description}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
            +{challenge.xpReward} XP
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-neutral-600 dark:text-neutral-400">Progress</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            {challenge.progress}/{challenge.target}
          </span>
        </div>
        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 overflow-hidden">
          <motion.div
            className={cn(
              'h-full',
              challenge.completed ? 'bg-green-500' : 'bg-blue-500'
            )}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}

interface RecommendationCardProps {
  title: string;
  description: string;
  actionLabel: string;
  color: 'amber' | 'green' | 'blue' | 'purple';
}

function RecommendationCard({
  title,
  description,
  actionLabel,
  color,
}: RecommendationCardProps) {
  const bgColors = {
    amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
  };

  const buttonColors = {
    amber: 'bg-amber-500 hover:bg-amber-600 text-white',
    green: 'bg-green-500 hover:bg-green-600 text-white',
    blue: 'bg-blue-500 hover:bg-blue-600 text-white',
    purple: 'bg-purple-500 hover:bg-purple-600 text-white',
  };

  return (
    <div className={cn('p-4 rounded-lg border', bgColors[color])}>
      <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
        {title}
      </h4>
      <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
        {description}
      </p>
      <button
        className={cn(
          'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
          buttonColors[color]
        )}
      >
        {actionLabel}
      </button>
    </div>
  );
}

export default StudyDashboard;
