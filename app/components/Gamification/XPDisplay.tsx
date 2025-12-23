'use client';

import { cn } from '@/lib/utils';
import { useGamificationStore } from '@/lib/store/gamificationStore';
import { getLevelFromXP, getXPProgress, LEVELS } from '@/lib/types/gamification';
import { TrendingUp, Zap } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Progress from '@radix-ui/react-progress';

interface XPDisplayProps {
  className?: string;
  showLevel?: boolean;
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * XP and Level display component
 */
export function XPDisplay({
  className,
  showLevel = true,
  showProgress = true,
  size = 'md',
}: XPDisplayProps) {
  const totalXP = useGamificationStore((state) => state.totalXP);
  const currentLevel = useGamificationStore((state) => state.currentLevel);
  
  const level = getLevelFromXP(totalXP);
  const progress = getXPProgress(totalXP);

  const sizeClasses = {
    sm: {
      container: 'gap-2',
      icon: 'w-4 h-4',
      text: 'text-sm',
      levelBadge: 'w-6 h-6 text-xs',
      progressBar: 'h-1',
    },
    md: {
      container: 'gap-3',
      icon: 'w-5 h-5',
      text: 'text-base',
      levelBadge: 'w-8 h-8 text-sm',
      progressBar: 'h-1.5',
    },
    lg: {
      container: 'gap-4',
      icon: 'w-6 h-6',
      text: 'text-lg',
      levelBadge: 'w-10 h-10 text-base',
      progressBar: 'h-2',
    },
  };

  const sizes = sizeClasses[size];

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div
            className={cn(
              'flex items-center cursor-pointer',
              sizes.container,
              className
            )}
          >
            {showLevel && (
              <div
                className={cn(
                  'flex items-center justify-center rounded-full',
                  'bg-gradient-to-br from-amber-400 to-orange-500',
                  'font-bold text-white shadow-lg',
                  sizes.levelBadge
                )}
              >
                {currentLevel}
              </div>
            )}
            
            <div className="flex flex-col min-w-0">
              <div className={cn('flex items-center gap-1.5', sizes.text)}>
                <Zap className={cn('text-amber-500', sizes.icon)} />
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {totalXP.toLocaleString()}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">XP</span>
              </div>
              
              {showProgress && (
                <Progress.Root
                  className={cn(
                    'overflow-hidden bg-neutral-200 dark:bg-neutral-700 rounded-full w-24',
                    sizes.progressBar
                  )}
                  value={progress.percentage}
                >
                  <Progress.Indicator
                    className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-500"
                    style={{ width: progress.percentage + '%' }}
                  />
                </Progress.Root>
              )}
            </div>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 px-4 py-3 glass-strong rounded-xl shadow-xl animate-fade-in max-w-xs"
            sideOffset={8}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{level.icon}</span>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Level {currentLevel}: {level.title}
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {totalXP.toLocaleString()} XP total
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">Progress to Level {currentLevel + 1}</span>
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {progress.percentage}%
                  </span>
                </div>
                <Progress.Root
                  className="overflow-hidden bg-neutral-200 dark:bg-neutral-700 rounded-full h-2"
                  value={progress.percentage}
                >
                  <Progress.Indicator
                    className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full"
                    style={{ width: progress.percentage + '%' }}
                  />
                </Progress.Root>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 text-right">
                  {progress.current.toLocaleString()} / {progress.required.toLocaleString()} XP
                </div>
              </div>
              
              {currentLevel < 10 && (
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Next: {LEVELS[currentLevel].icon} {LEVELS[currentLevel].title}
                </div>
              )}
            </div>
            <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

/**
 * Compact XP display for header/sidebar
 */
export function XPBadge({ className }: { className?: string }) {
  const totalXP = useGamificationStore((state) => state.totalXP);
  const currentLevel = useGamificationStore((state) => state.currentLevel);
  const level = getLevelFromXP(totalXP);

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-full',
        'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
        'border border-amber-200 dark:border-amber-800',
        className
      )}
    >
      <span className="text-base">{level.icon}</span>
      <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">
        Lv.{currentLevel}
      </span>
      <span className="text-xs text-amber-600 dark:text-amber-500">
        {totalXP.toLocaleString()} XP
      </span>
    </div>
  );
}

/**
 * Streak display component
 */
export function StreakDisplay({ className }: { className?: string }) {
  const currentStreak = useGamificationStore((state) => state.currentStreak);
  const longestStreak = useGamificationStore((state) => state.longestStreak);

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer',
              currentStreak > 0
                ? 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800'
                : 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
              className
            )}
          >
            <span className={cn('text-lg', currentStreak > 0 ? 'animate-pulse' : 'grayscale')}>
              🔥
            </span>
            <span
              className={cn(
                'text-sm font-semibold',
                currentStreak > 0
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-neutral-500 dark:text-neutral-400'
              )}
            >
              {currentStreak}
            </span>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 px-4 py-3 glass-strong rounded-xl shadow-xl animate-fade-in"
            sideOffset={8}
          >
            <div className="space-y-2">
              <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                {currentStreak > 0 ? currentStreak + ' Day Streak!' : 'Start Your Streak!'}
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {currentStreak > 0
                  ? 'Keep learning daily to maintain your streak'
                  : 'Complete any learning activity to start a streak'}
              </p>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Longest streak: {longestStreak} days
              </div>
            </div>
            <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default XPDisplay;
