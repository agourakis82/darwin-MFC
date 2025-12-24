/**
 * USER INSIGHTS PANEL
 * ====================
 *
 * Displays personalized insights about user behavior and preferences
 * Helps users understand their usage patterns
 *
 * Features:
 * - Top categories and interests
 * - Usage streaks and milestones
 * - Learning progress indicators
 * - Personalized tips
 * - Activity summary
 */

'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import {
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  Star,
  Zap,
  Award,
  Heart,
  Flame,
  Lightbulb,
} from 'lucide-react';
import { Card } from '@/lib/design-system/primitives/card';
import { useUserPreferences } from '../userPreferencesStore';

// ============================================================================
// TYPES
// ============================================================================

export interface UserInsightsPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof insightsVariants> {
  title?: string;
  showMilestones?: boolean;
  showTips?: boolean;
  showTopCategories?: boolean;
  compact?: boolean;
}

// ============================================================================
// VARIANTS
// ============================================================================

const insightsVariants = cva(['relative w-full'], {
  variants: {
    variant: {
      default: '',
      card: 'p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ============================================================================
// INSIGHT CARD
// ============================================================================

interface InsightCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description?: string;
  color?: string;
}

const InsightCard: React.FC<InsightCardProps> = ({
  icon,
  title,
  value,
  description,
  color = 'bg-brand-primary-100 dark:bg-brand-primary-900/30',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
    >
      <div className="flex items-start gap-3">
        <div className={cn('p-2 rounded-lg', color)}>{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
            {title}
          </p>
          <p className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
            {value}
          </p>
          {description && (
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// TIP CARD
// ============================================================================

interface TipCardProps {
  title: string;
  description: string;
}

const TipCard: React.FC<TipCardProps> = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
    >
      <div className="flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">
            {title}
          </p>
          <p className="text-xs text-amber-800 dark:text-amber-200">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const UserInsightsPanel = React.forwardRef<
  HTMLDivElement,
  UserInsightsPanelProps
>(
  (
    {
      title = 'Your Insights',
      showMilestones = true,
      showTips = true,
      showTopCategories = true,
      compact = false,
      variant,
      className,
      ...props
    },
    ref
  ) => {
    const interactions = useUserPreferences((state) => state.interactions);
    const contentPreferences = useUserPreferences((state) => state.contentPreferences);
    const shortcuts = useUserPreferences((state) => state.shortcuts);
    const favoriteCategories = useUserPreferences(
      (state) => state.usagePattern.favoriteCategories
    );

    // Calculate insights
    const insights = useMemo(() => {
      const totalInteractions = interactions.length;
      const uniqueCategories = Object.keys(contentPreferences).length;
      const totalShortcuts = shortcuts.length;

      // Calculate streak (consecutive days with activity)
      const today = new Date().setHours(0, 0, 0, 0);
      let streak = 0;
      let checkDate = today;

      const interactionDates = new Set(
        interactions.map((i) => new Date(i.timestamp).setHours(0, 0, 0, 0))
      );

      while (interactionDates.has(checkDate)) {
        streak++;
        checkDate -= 24 * 60 * 60 * 1000;
      }

      // Top category
      const topCategory = favoriteCategories[0] || 'N/A';

      // Most active day
      const dayCounts: Record<number, number> = {};
      interactions.forEach((i) => {
        const day = new Date(i.timestamp).getDay();
        dayCounts[day] = (dayCounts[day] || 0) + 1;
      });
      const mostActiveDay = Object.entries(dayCounts)
        .sort(([, a], [, b]) => b - a)
        .map(([day]) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][parseInt(day)])[0] || 'N/A';

      return {
        totalInteractions,
        uniqueCategories,
        totalShortcuts,
        streak,
        topCategory,
        mostActiveDay,
      };
    }, [interactions, contentPreferences, shortcuts, favoriteCategories]);

    // Milestones
    const milestones = useMemo(() => {
      const achieved = [];

      if (insights.totalInteractions >= 100) {
        achieved.push({
          icon: <Trophy className="w-4 h-4 text-amber-600" />,
          title: 'Century Club',
          description: '100+ interactions',
        });
      }

      if (insights.uniqueCategories >= 10) {
        achieved.push({
          icon: <Target className="w-4 h-4 text-blue-600" />,
          title: 'Explorer',
          description: '10+ categories explored',
        });
      }

      if (insights.streak >= 7) {
        achieved.push({
          icon: <Flame className="w-4 h-4 text-red-600" />,
          title: '7-Day Streak',
          description: 'Active for a week!',
        });
      }

      if (insights.totalShortcuts >= 20) {
        achieved.push({
          icon: <Star className="w-4 h-4 text-purple-600" />,
          title: 'Power User',
          description: '20+ shortcuts created',
        });
      }

      return achieved;
    }, [insights]);

    // Personalized tips
    const tips = useMemo(() => {
      const tipsList = [];

      if (insights.uniqueCategories < 5) {
        tipsList.push({
          title: 'Explore More Categories',
          description:
            "You've only explored a few categories. Try browsing different sections to discover new content!",
        });
      }

      if (insights.totalShortcuts === 0) {
        tipsList.push({
          title: 'Create Your First Shortcut',
          description:
            'Pin frequently accessed content for quick access. Just click on any item to add it to your shortcuts!',
        });
      }

      if (insights.streak === 0 && interactions.length > 0) {
        tipsList.push({
          title: 'Build a Streak',
          description:
            "Visit daily to build a learning streak. It's a great way to stay consistent with your studies!",
        });
      }

      if (favoriteCategories.length >= 3 && insights.totalShortcuts < 10) {
        tipsList.push({
          title: 'Organize with Shortcuts',
          description:
            'You have favorite categories! Consider pinning your most-used items for faster access.',
        });
      }

      return tipsList.slice(0, 2); // Show max 2 tips
    }, [insights, interactions.length, favoriteCategories.length]);

    return (
      <div
        ref={ref}
        className={cn(insightsVariants({ variant }), className)}
        {...props}
      >
        {title && (
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-brand-primary-600 dark:text-brand-primary-400" />
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {title}
            </h3>
          </div>
        )}

        {/* Stats Grid */}
        <div
          className={cn(
            'grid gap-4 mb-6',
            compact ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-3'
          )}
        >
          <InsightCard
            icon={<TrendingUp className="w-5 h-5 text-brand-primary-600" />}
            title="Total Activity"
            value={insights.totalInteractions.toString()}
            description="Interactions"
          />

          <InsightCard
            icon={<Star className="w-5 h-5 text-purple-600" />}
            title="Categories"
            value={insights.uniqueCategories.toString()}
            description="Explored"
            color="bg-purple-100 dark:bg-purple-900/30"
          />

          <InsightCard
            icon={<Flame className="w-5 h-5 text-red-600" />}
            title="Current Streak"
            value={`${insights.streak} ${insights.streak === 1 ? 'day' : 'days'}`}
            description={insights.streak > 0 ? 'Keep it up!' : 'Start today!'}
            color="bg-red-100 dark:bg-red-900/30"
          />

          {!compact && (
            <>
              <InsightCard
                icon={<Heart className="w-5 h-5 text-pink-600" />}
                title="Top Interest"
                value={insights.topCategory}
                description="Favorite category"
                color="bg-pink-100 dark:bg-pink-900/30"
              />

              <InsightCard
                icon={<Calendar className="w-5 h-5 text-blue-600" />}
                title="Most Active Day"
                value={insights.mostActiveDay}
                description="Your peak day"
                color="bg-blue-100 dark:bg-blue-900/30"
              />

              <InsightCard
                icon={<Zap className="w-5 h-5 text-amber-600" />}
                title="Quick Access"
                value={insights.totalShortcuts.toString()}
                description="Shortcuts created"
                color="bg-amber-100 dark:bg-amber-900/30"
              />
            </>
          )}
        </div>

        {/* Milestones */}
        {showMilestones && milestones.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Milestones Achieved
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {milestone.icon}
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {milestone.title}
                    </p>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        {showTips && tips.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Personalized Tips
            </h4>
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <TipCard
                  key={index}
                  title={tip.title}
                  description={tip.description}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {insights.totalInteractions === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Zap className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mb-3" />
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
              Start Exploring
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              Your personalized insights will appear here as you use the app
            </p>
          </div>
        )}
      </div>
    );
  }
);

UserInsightsPanel.displayName = 'UserInsightsPanel';
