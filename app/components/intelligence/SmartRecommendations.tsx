'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, TrendingUp, Zap, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type RecommendationType = 'related' | 'trending' | 'personalized' | 'alert';

export interface Recommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  category: string;
  relevanceScore: number;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface SmartRecommendationsProps {
  recommendations: Recommendation[];
  title?: string;
  maxDisplay?: number;
  onDismiss?: (id: string) => void;
  density?: 'comfortable' | 'compact' | 'clinical';
  className?: string;
}

const typeConfig: Record<RecommendationType, { icon: React.ReactNode; color: string; bgColor: string }> = {
  related: {
    icon: <Lightbulb className="w-5 h-5" />,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
  },
  trending: {
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
  },
  personalized: {
    icon: <Zap className="w-5 h-5" />,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
  },
  alert: {
    icon: <Zap className="w-5 h-5" />,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/30',
  },
};

export function SmartRecommendations({
  recommendations,
  title = 'Smart Recommendations',
  maxDisplay = 5,
  onDismiss,
  density = 'comfortable',
  className,
}: SmartRecommendationsProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const handleDismiss = useCallback(
    (id: string) => {
      setDismissed((prev) => new Set([...prev, id]));
      onDismiss?.(id);
    },
    [onDismiss]
  );

  const visibleRecommendations = useMemo(
    () =>
      recommendations
        .filter((r) => !dismissed.has(r.id))
        .slice(0, maxDisplay)
        .sort((a, b) => b.relevanceScore - a.relevanceScore),
    [recommendations, dismissed, maxDisplay]
  );

  if (visibleRecommendations.length === 0) return null;

  const paddingClass = {
    comfortable: 'p-6',
    compact: 'p-4',
    clinical: 'p-3',
  }[density];

  return (
    <div className={cn('clinical-card dark:clinical-card-dark', paddingClass, className)}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className={cn(
          'font-bold text-gray-900 dark:text-white',
          density === 'comfortable' && 'text-lg',
          density === 'compact' && 'text-base',
          density === 'clinical' && 'text-sm'
        )}>
          {title}
        </h3>
      </div>

      {/* Recommendations List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {visibleRecommendations.map((rec, idx) => {
            const config = typeConfig[rec.type];

            return (
              <motion.div
                key={rec.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: idx * 0.05 }}
                className={cn(
                  'rounded-lg p-4 border-l-4 transition-all',
                  config.bgColor,
                  'border-l-blue-500 dark:border-l-blue-400'
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={cn('flex-shrink-0 mt-0.5', config.color)}>
                    {config.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {rec.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide mt-0.5">
                          {rec.category}
                        </p>
                      </div>

                      {/* Relevance Badge */}
                      <div className="flex-shrink-0">
                        <span className={cn(
                          'text-xs font-bold rounded-full px-2 py-1',
                          rec.relevanceScore > 0.8 && 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400',
                          rec.relevanceScore > 0.5 && rec.relevanceScore <= 0.8 && 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400',
                          rec.relevanceScore <= 0.5 && 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        )}>
                          {Math.round(rec.relevanceScore * 100)}%
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                      {rec.description}
                    </p>

                    {/* Action Button */}
                    {rec.action && (
                      <button
                        onClick={rec.action.onClick}
                        className={cn(
                          'mt-2 text-sm font-medium transition-colors',
                          'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200'
                        )}
                      >
                        {rec.action.label} →
                      </button>
                    )}
                  </div>

                  {/* Dismiss Button */}
                  {onDismiss && (
                    <button
                      onClick={() => handleDismiss(rec.id)}
                      className="flex-shrink-0 p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors opacity-60 hover:opacity-100"
                      aria-label="Dismiss recommendation"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SmartRecommendations;
