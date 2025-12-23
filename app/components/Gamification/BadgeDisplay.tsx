'use client';

import { cn } from '@/lib/utils';
import { useGamificationStore } from '@/lib/store/gamificationStore';
import { useTranslations } from 'next-intl';
import {
  BADGES,
  getBadgeById,
  getBadgeRarityColor,
  getBadgesByCategory,
  type Badge,
  type BadgeCategory,
  type EarnedBadge,
} from '@/lib/types/gamification';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Lock, Check, Trophy, Star, BookOpen, Search, GraduationCap, Sparkles } from 'lucide-react';

interface BadgeDisplayProps {
  className?: string;
  showAll?: boolean;
  showProgress?: boolean;
  category?: BadgeCategory;
  maxVisible?: number;
}

const categoryIcons: Record<BadgeCategory, React.ElementType> = {
  learning: GraduationCap,
  explorer: Search,
  academic: BookOpen,
  contributor: Star,
  special: Sparkles,
};

/**
 * Display a single badge with tooltip
 */
function BadgeItem({
  badge,
  earned,
  progress,
  showProgress = false,
}: {
  badge: Badge;
  earned?: EarnedBadge;
  progress?: number;
  showProgress?: boolean;
}) {
  let t: (key: string) => string;
  try {
    const translations = useTranslations();
    t = (key: string) => {
      try {
        return translations(key);
      } catch {
        return key;
      }
    };
  } catch {
    t = (key: string) => key;
  }

  const isEarned = !!earned;
  const rarityColor = getBadgeRarityColor(badge.rarity);

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div
            className={cn(
              'relative flex items-center justify-center w-14 h-14 rounded-xl border-2 transition-all duration-200 cursor-pointer',
              isEarned
                ? cn(rarityColor, 'border-current shadow-lg')
                : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 grayscale opacity-50'
            )}
          >
            <span className="text-2xl" role="img" aria-label={badge.name}>
              {badge.icon}
            </span>
            {isEarned && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
            {!isEarned && badge.secret && (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-200/80 dark:bg-neutral-700/80 rounded-xl">
                <Lock className="w-5 h-5 text-neutral-500" />
              </div>
            )}
            {showProgress && !isEarned && progress !== undefined && progress > 0 && (
              <div className="absolute -bottom-1 left-1 right-1 h-1 bg-neutral-200 dark:bg-neutral-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: progress + '%' }}
                />
              </div>
            )}
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 max-w-xs px-4 py-3 glass-strong rounded-xl shadow-xl animate-fade-in"
            sideOffset={8}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{badge.icon}</span>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {badge.secret && !isEarned ? '???' : badge.name}
                  </div>
                  <div className={cn('text-xs font-medium capitalize', getBadgeRarityColor(badge.rarity).split(' ')[0])}>
                    {badge.rarity}
                  </div>
                </div>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {badge.secret && !isEarned ? 'Secret badge - keep exploring!' : badge.description}
              </p>
              {isEarned && earned && (
                <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Earned {new Date(earned.earnedAt).toLocaleDateString()}
                </div>
              )}
              {!isEarned && progress !== undefined && (
                <div className="text-xs text-neutral-500">
                  Progress: {progress}%
                </div>
              )}
              <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                +{badge.xpReward} XP
              </div>
            </div>
            <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

/**
 * Badge display grid component
 */
export function BadgeDisplay({
  className,
  showAll = false,
  showProgress = true,
  category,
  maxVisible,
}: BadgeDisplayProps) {
  const earnedBadges = useGamificationStore((state) => state.earnedBadges);
  const stats = useGamificationStore((state) => state.stats);
  const currentStreak = useGamificationStore((state) => state.currentStreak);

  let t: (key: string) => string;
  try {
    const translations = useTranslations();
    t = (key: string) => {
      try {
        return translations(key);
      } catch {
        return key;
      }
    };
  } catch {
    t = (key: string) => key;
  }

  // Get badges to display
  let badges = category ? getBadgesByCategory(category) : BADGES;
  
  // Filter out secret badges if not showing all and not earned
  if (!showAll) {
    badges = badges.filter(b => 
      !b.secret || earnedBadges.some(eb => eb.badgeId === b.id)
    );
  }

  // Limit visible badges
  if (maxVisible) {
    badges = badges.slice(0, maxVisible);
  }

  // Calculate progress for each badge
  const getProgress = (badge: Badge): number => {
    const { criteria } = badge;
    let current = 0;
    
    switch (criteria.type) {
      case 'streak_days':
        current = currentStreak;
        break;
      case 'diseases_viewed':
        current = stats.diseasesViewed.length;
        break;
      case 'medications_viewed':
        current = stats.medicationsViewed.length;
        break;
      case 'protocols_viewed':
        current = stats.protocolsViewed.length;
        break;
      case 'citations_viewed':
        current = stats.citationsViewed;
        break;
      case 'exports_completed':
        current = stats.exportsCompleted;
        break;
      case 'perfect_quizzes':
        current = stats.perfectQuizzes;
        break;
      case 'flashcards_reviewed':
        current = stats.flashcardsReviewed;
        break;
      default:
        current = 0;
    }
    
    return Math.min(100, Math.round((current / criteria.target) * 100));
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-wrap gap-3">
        {badges.map((badge) => {
          const earned = earnedBadges.find(eb => eb.badgeId === badge.id);
          const progress = getProgress(badge);
          
          return (
            <BadgeItem
              key={badge.id}
              badge={badge}
              earned={earned}
              progress={progress}
              showProgress={showProgress}
            />
          );
        })}
      </div>
      
      {showAll && (
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          {earnedBadges.length} / {BADGES.filter(b => !b.secret).length} badges earned
        </div>
      )}
    </div>
  );
}

/**
 * Badge summary for sidebar/header
 */
export function BadgeSummary({ className }: { className?: string }) {
  const earnedBadges = useGamificationStore((state) => state.earnedBadges);
  const totalXP = useGamificationStore((state) => state.totalXP);
  const currentLevel = useGamificationStore((state) => state.currentLevel);

  // Get 3 most recent badges
  const recentBadges = earnedBadges
    .sort((a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime())
    .slice(0, 3)
    .map(eb => getBadgeById(eb.badgeId))
    .filter((b): b is Badge => b !== undefined);

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex items-center gap-1">
        <Trophy className="w-4 h-4 text-amber-500" />
        <span className="text-sm font-medium">{earnedBadges.length}</span>
      </div>
      <div className="flex -space-x-2">
        {recentBadges.map((badge) => (
          <div
            key={badge.id}
            className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center border-2 border-white dark:border-neutral-900',
              getBadgeRarityColor(badge.rarity)
            )}
          >
            <span className="text-sm">{badge.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Badge categories grid
 */
export function BadgeCategoriesGrid({ className }: { className?: string }) {
  const categories: BadgeCategory[] = ['learning', 'explorer', 'academic', 'contributor', 'special'];

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {categories.map((category) => {
        const Icon = categoryIcons[category];
        const categoryBadges = getBadgesByCategory(category);
        
        return (
          <div
            key={category}
            className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/50"
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              <h3 className="font-semibold capitalize text-neutral-900 dark:text-neutral-100">
                {category}
              </h3>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                ({categoryBadges.length})
              </span>
            </div>
            <BadgeDisplay category={category} showProgress maxVisible={6} />
          </div>
        );
      })}
    </div>
  );
}

export default BadgeDisplay;
