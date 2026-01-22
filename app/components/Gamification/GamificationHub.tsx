'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Zap, Target, Calendar, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGamificationStore } from '@/lib/store/gamificationStore';
import { BADGES, getBadgeRarityColor, LEVELS } from '@/lib/types/gamification';
import XPDisplay, { XPBadge, StreakDisplay } from './XPDisplay';

interface GamificationHubProps {
  className?: string;
  showStats?: boolean;
  compact?: boolean;
}

/**
 * Gamification Hub - Central hub for all gamification features
 * Shows achievements, badges, streaks, and stats
 */
export function GamificationHub({
  className,
  showStats = true,
  compact = false,
}: GamificationHubProps) {
  const state = useGamificationStore();
  
  // Calculate stats
  const earnedBadgeIds = new Set(state.earnedBadges.map(b => b.badgeId));
  const totalBadges = BADGES.length - BADGES.filter(b => b.secret).length;
  const earnedCount = state.earnedBadges.length;
  const completionPercent = Math.round((earnedCount / totalBadges) * 100);

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
        <div className="flex items-center gap-3 flex-wrap">
          <XPBadge />
          <StreakDisplay />
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
      {/* Header with XP and Streak */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={itemVariants}
      >
        <div className="card-base p-6">
          <XPDisplay size="lg" />
        </div>

        <div className="card-base p-6 flex items-center justify-center">
          <StreakDisplay />
        </div>

        <div className="card-base p-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                Badges
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">
                  {earnedCount} / {totalBadges}
                </span>
                <span className="font-medium text-amber-600 dark:text-amber-400">
                  {completionPercent}%
                </span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Daily Challenges Section */}
      {state.dailyChallenges.length > 0 && (
        <motion.div variants={itemVariants} className="card-base p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                Daily Challenges
              </h3>
              <span className="ml-auto text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {state.dailyChallenges.filter(c => c.completed).length} / {state.dailyChallenges.length}
              </span>
            </div>

            <div className="space-y-3">
              {state.dailyChallenges.map(challenge => (
                <div
                  key={challenge.id}
                  className={cn(
                    'p-3 rounded-lg border transition-colors',
                    challenge.completed
                      ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                      : 'bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                        {challenge.title}
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                        {challenge.description}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                        +{challenge.xpReward} XP
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {challenge.progress}/{challenge.target}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className={cn(
                        'h-full',
                        challenge.completed
                          ? 'bg-green-500'
                          : 'bg-blue-500'
                      )}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(100, (challenge.progress / challenge.target) * 100)}%`
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Earned Badges Showcase */}
      {showStats && earnedCount > 0 && (
        <motion.div variants={itemVariants} className="card-base p-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Earned Badges
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {state.earnedBadges.map(earnedBadge => {
                const badge = BADGES.find(b => b.id === earnedBadge.badgeId);
                if (!badge) return null;

                return (
                  <motion.div
                    key={badge.id}
                    className={cn(
                      'p-4 rounded-lg border flex flex-col items-center justify-center gap-2 text-center transition-all',
                      getBadgeRarityColor(badge.rarity)
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={badge.name}
                  >
                    <span className="text-3xl">{badge.icon}</span>
                    <span className="text-xs font-semibold truncate w-full px-1">
                      {badge.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Level Progress */}
      <motion.div variants={itemVariants} className="card-base p-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Level Progress
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {LEVELS.map(level => (
              <div
                key={level.level}
                className={cn(
                  'p-3 rounded-lg text-center text-sm transition-colors',
                  level.level <= state.currentLevel
                    ? 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-300 dark:border-blue-700'
                    : 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'
                )}
              >
                <div className="text-xl mb-1">{level.icon}</div>
                <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {level.level}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                  {level.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      {showStats && (
        <motion.div variants={itemVariants} className="card-base p-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
              Statistics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatCard
                icon={<Zap className="w-5 h-5" />}
                label="Total XP"
                value={state.totalXP.toLocaleString()}
                color="amber"
              />
              <StatCard
                icon={<Trophy className="w-5 h-5" />}
                label="Quizzes"
                value={state.stats.quizzesCompleted}
                color="blue"
              />
              <StatCard
                icon={<Flame className="w-5 h-5" />}
                label="Max Streak"
                value={state.longestStreak}
                color="red"
              />
              <StatCard
                icon={<Target className="w-5 h-5" />}
                label="Diseases"
                value={state.stats.diseasesViewed.length}
                color="green"
              />
              <StatCard
                icon={<Calendar className="w-5 h-5" />}
                label="Flashcards"
                value={state.stats.flashcardsReviewed}
                color="purple"
              />
              <StatCard
                icon={<TrendingUp className="w-5 h-5" />}
                label="Badges"
                value={earnedCount}
                color="yellow"
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: 'amber' | 'blue' | 'red' | 'green' | 'purple' | 'yellow';
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colorClasses = {
    amber: 'text-amber-600 dark:text-amber-400',
    blue: 'text-blue-600 dark:text-blue-400',
    red: 'text-red-600 dark:text-red-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
  };

  return (
    <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
      <div className={cn('mb-2', colorClasses[color])}>
        {icon}
      </div>
      <div className="text-xs text-neutral-600 dark:text-neutral-400">
        {label}
      </div>
      <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-1">
        {value}
      </div>
    </div>
  );
}

export default GamificationHub;
