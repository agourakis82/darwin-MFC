'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useGamificationStore } from '@/lib/store/gamificationStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Star, Flame, Target, TrendingUp } from 'lucide-react';
import type { AchievementNotification } from '@/lib/types/gamification';

interface AchievementToastProps {
  className?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  maxVisible?: number;
}

const typeIcons: Record<AchievementNotification['type'], React.ElementType> = {
  badge: Trophy,
  level_up: Star,
  streak: Flame,
  milestone: Target,
};

const typeColors: Record<AchievementNotification['type'], string> = {
  badge: 'from-amber-500 to-orange-500',
  level_up: 'from-purple-500 to-pink-500',
  streak: 'from-red-500 to-orange-500',
  milestone: 'from-blue-500 to-cyan-500',
};

/**
 * Single achievement toast notification
 */
function AchievementToastItem({
  notification,
  onDismiss,
}: {
  notification: AchievementNotification;
  onDismiss: () => void;
}) {
  const Icon = typeIcons[notification.type];
  const gradientColor = typeColors[notification.type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={cn(
        'relative overflow-hidden rounded-xl shadow-2xl',
        'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700',
        'min-w-[280px] max-w-sm'
      )}
    >
      {/* Gradient accent bar */}
      <div className={cn('absolute top-0 left-0 right-0 h-1 bg-gradient-to-r', gradientColor)} />

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon with gradient background */}
          <div
            className={cn(
              'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
              'bg-gradient-to-br shadow-lg',
              gradientColor
            )}
          >
            {notification.icon ? (
              <span className="text-2xl">{notification.icon}</span>
            ) : (
              <Icon className="w-6 h-6 text-white" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {notification.title}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                  {notification.description}
                </p>
              </div>
              <button
                onClick={onDismiss}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <X className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            {/* XP Earned */}
            {notification.xpEarned && (
              <div className="mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  +{notification.xpEarned} XP
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress bar for auto-dismiss */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 5, ease: 'linear' }}
        className={cn(
          'absolute bottom-0 left-0 right-0 h-0.5 origin-left',
          'bg-gradient-to-r',
          gradientColor
        )}
      />
    </motion.div>
  );
}

/**
 * Achievement toast container that displays pending notifications
 */
export function AchievementToast({
  className,
  position = 'top-right',
  maxVisible = 3,
}: AchievementToastProps) {
  const pendingNotifications = useGamificationStore((state) =>
    state.pendingNotifications.filter((n) => !n.dismissed)
  );
  const dismissNotification = useGamificationStore((state) => state.dismissNotification);

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  const visibleNotifications = pendingNotifications.slice(0, maxVisible);

  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col gap-3',
        positionClasses[position],
        className
      )}
    >
      <AnimatePresence mode="popLayout">
        {visibleNotifications.map((notification) => (
          <AchievementToastItem
            key={notification.id}
            notification={notification}
            onDismiss={() => dismissNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Hook to trigger achievement notifications manually
 */
export function useAchievementToast() {
  const addNotification = useGamificationStore((state) => state.addNotification);

  const showBadgeEarned = (title: string, description: string, icon: string, xpEarned: number) => {
    addNotification({
      type: 'badge',
      title,
      description,
      icon,
      xpEarned,
    });
  };

  const showLevelUp = (level: number, title: string, icon: string) => {
    addNotification({
      type: 'level_up',
      title: 'Level ' + level + '!',
      description: 'You are now a ' + title,
      icon,
    });
  };

  const showStreakMilestone = (days: number) => {
    addNotification({
      type: 'streak',
      title: days + ' Day Streak!',
      description: 'Keep up the great work!',
      icon: '🔥',
    });
  };

  const showMilestone = (title: string, description: string, icon: string, xpEarned?: number) => {
    addNotification({
      type: 'milestone',
      title,
      description,
      icon,
      xpEarned,
    });
  };

  return {
    showBadgeEarned,
    showLevelUp,
    showStreakMilestone,
    showMilestone,
  };
}

export default AchievementToast;
