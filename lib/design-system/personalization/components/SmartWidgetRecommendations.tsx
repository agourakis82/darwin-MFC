/**
 * SMART WIDGET RECOMMENDATIONS
 * =============================
 *
 * Intelligent widget suggestions based on user behavior
 * Helps users discover useful widgets for their dashboard
 *
 * Features:
 * - AI-powered widget recommendations
 * - Confidence scoring
 * - One-click widget installation
 * - Dismiss/feedback mechanism
 * - Adaptive suggestions
 */

'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import {
  Sparkles,
  Plus,
  X,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/lib/design-system/primitives/button';
import { Card } from '@/lib/design-system/primitives/card';
import { useUserPreferences } from '../userPreferencesStore';
import { recommendationEngine, WidgetRecommendation } from '../recommendationEngine';

// ============================================================================
// TYPES
// ============================================================================

export interface SmartWidgetRecommendationsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof recommendationsVariants> {
  title?: string;
  maxRecommendations?: number;
  installedWidgets?: string[];
  onInstallWidget?: (widgetId: string) => void;
  onDismiss?: (recommendationId: string) => void;
  showFeedback?: boolean;
  compact?: boolean;
}

// ============================================================================
// VARIANTS
// ============================================================================

const recommendationsVariants = cva(['relative w-full'], {
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
// RECOMMENDATION CARD
// ============================================================================

interface RecommendationCardProps {
  recommendation: WidgetRecommendation;
  onInstall: () => void;
  onDismiss: () => void;
  onFeedback?: (helpful: boolean) => void;
  showFeedback: boolean;
  compact?: boolean;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onInstall,
  onDismiss,
  onFeedback,
  showFeedback,
  compact,
}) => {
  const [feedbackGiven, setFeedbackGiven] = React.useState(false);

  const confidenceColor =
    recommendation.score >= 80
      ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      : recommendation.score >= 60
      ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30'
      : 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30';

  const handleFeedback = (helpful: boolean) => {
    setFeedbackGiven(true);
    onFeedback?.(helpful);
    // Auto-dismiss after 2 seconds on negative feedback
    if (!helpful) {
      setTimeout(onDismiss, 2000);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={cn(
        'group relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700',
        'bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900',
        'hover:shadow-lg transition-shadow',
        compact ? 'p-4' : 'p-5'
      )}
    >
      {/* Confidence Badge */}
      <div className="absolute top-3 right-3">
        <span
          className={cn(
            'px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1',
            confidenceColor
          )}
        >
          <TrendingUp className="w-3 h-3" />
          {recommendation.score}%
        </span>
      </div>

      {/* Content */}
      <div className="pr-16 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-brand-primary-600 dark:text-brand-primary-400" />
          <h4
            className={cn(
              'font-semibold text-neutral-900 dark:text-neutral-100',
              compact ? 'text-sm' : 'text-base'
            )}
          >
            {recommendation.title}
          </h4>
        </div>

        <p
          className={cn(
            'text-neutral-600 dark:text-neutral-400 mb-2',
            compact ? 'text-xs' : 'text-sm'
          )}
        >
          {recommendation.description}
        </p>

        <p className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-1">
          <Lightbulb className="w-3 h-3" />
          {recommendation.reason}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={onInstall}
          iconBefore={<Plus className="w-4 h-4" />}
          className="flex-1"
        >
          Add to Dashboard
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Feedback */}
      {showFeedback && !feedbackGiven && (
        <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
            Was this helpful?
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFeedback(true)}
              iconBefore={<ThumbsUp className="w-3 h-3" />}
            >
              Yes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFeedback(false)}
              iconBefore={<ThumbsDown className="w-3 h-3" />}
            >
              No
            </Button>
          </div>
        </div>
      )}

      {feedbackGiven && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-xs text-green-600 dark:text-green-400"
        >
          Thanks for your feedback!
        </motion.div>
      )}
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const SmartWidgetRecommendations = React.forwardRef<
  HTMLDivElement,
  SmartWidgetRecommendationsProps
>(
  (
    {
      title = 'Recommended Widgets',
      maxRecommendations = 3,
      installedWidgets = [],
      onInstallWidget,
      onDismiss,
      showFeedback = true,
      compact = false,
      variant,
      className,
      ...props
    },
    ref
  ) => {
    const contentPreferences = useUserPreferences((state) => state.contentPreferences);
    const shortcuts = useUserPreferences((state) => state.shortcuts);
    const favoriteCategories = useUserPreferences(
      (state) => state.usagePattern.favoriteCategories
    );
    const recentSearches = useUserPreferences(
      (state) => state.usagePattern.searchQueries
    );

    const [dismissedIds, setDismissedIds] = React.useState<Set<string>>(new Set());

    // Generate recommendations
    const recommendations = useMemo(() => {
      const context = {
        contentPreferences,
        shortcuts,
        favoriteCategories,
        recentSearches,
      };

      return recommendationEngine
        .recommendWidgets(context, installedWidgets)
        .filter((rec) => !dismissedIds.has(rec.id))
        .slice(0, maxRecommendations);
    }, [
      contentPreferences,
      shortcuts,
      favoriteCategories,
      recentSearches,
      installedWidgets,
      dismissedIds,
      maxRecommendations,
    ]);

    // Handle install
    const handleInstall = (widgetId: string, recommendationId: string) => {
      onInstallWidget?.(widgetId);
      setDismissedIds((prev) => new Set([...prev, recommendationId]));
    };

    // Handle dismiss
    const handleDismiss = (recommendationId: string) => {
      setDismissedIds((prev) => new Set([...prev, recommendationId]));
      onDismiss?.(recommendationId);
    };

    // Handle feedback
    const handleFeedback = (recommendationId: string, helpful: boolean) => {
      // In a real app, this would be sent to analytics
      console.log(`Recommendation ${recommendationId} was ${helpful ? 'helpful' : 'not helpful'}`);
    };

    // Empty state
    if (recommendations.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(recommendationsVariants({ variant }), className)}
          {...props}
        >
          {title && (
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              {title}
            </h3>
          )}

          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Sparkles className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mb-3" />
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
              No recommendations at the moment
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              Keep using the app to get personalized widget suggestions
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(recommendationsVariants({ variant }), className)}
        {...props}
      >
        {title && (
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-brand-primary-600 dark:text-brand-primary-400" />
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {title}
            </h3>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              ({recommendations.length})
            </span>
          </div>
        )}

        <div className={cn('grid gap-4', compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3')}>
          <AnimatePresence mode="popLayout">
            {recommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                onInstall={() => handleInstall(recommendation.widgetId, recommendation.id)}
                onDismiss={() => handleDismiss(recommendation.id)}
                onFeedback={(helpful) => handleFeedback(recommendation.id, helpful)}
                showFeedback={showFeedback}
                compact={compact}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
        >
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <Lightbulb className="w-4 h-4 inline mr-2" />
            These recommendations are based on your usage patterns and favorite categories.
            The more you use the app, the better the suggestions become!
          </p>
        </motion.div>
      </div>
    );
  }
);

SmartWidgetRecommendations.displayName = 'SmartWidgetRecommendations';
