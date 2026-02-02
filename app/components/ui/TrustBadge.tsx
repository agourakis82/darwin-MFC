'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { Calendar, BookOpen, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { semanticColors, EvidenceLevel, evidenceLevelConfig } from '@/lib/design-system/tokens';

// =============================================================================
// TYPES
// =============================================================================

export interface TrustBadgeProps extends HTMLAttributes<HTMLDivElement> {
  lastUpdated?: Date | string;
  citationCount?: number;
  evidenceLevel?: EvidenceLevel;
  variant?: 'inline' | 'compact' | 'detailed';
  showLabels?: boolean;
}

// =============================================================================
// TRUST BADGE COMPONENT
// =============================================================================

/**
 * TrustBadge - Displays credibility signals (last updated, citations, evidence level)
 *
 * Variants:
 * - inline: All indicators in a single row (default for desktop)
 * - compact: Minimal display with just icons (default for mobile)
 * - detailed: Full explanation of each indicator
 *
 * Example:
 * <TrustBadge
 *   lastUpdated={new Date('2025-01-15')}
 *   citationCount={12}
 *   evidenceLevel="A"
 *   variant="inline"
 * />
 */
export const TrustBadge = forwardRef<HTMLDivElement, TrustBadgeProps>(
  (
    {
      lastUpdated,
      citationCount,
      evidenceLevel,
      variant = 'inline',
      showLabels = true,
      className,
      ...props
    },
    ref
  ) => {
    // Format date
    const formattedDate = lastUpdated
      ? typeof lastUpdated === 'string'
        ? new Date(lastUpdated).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : lastUpdated.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
      : null;

    const evidenceConfig = evidenceLevel ? evidenceLevelConfig[evidenceLevel] : null;

    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center gap-2',
            'text-xs text-neutral-500 dark:text-neutral-400',
            className
          )}
          {...props}
        >
          {formattedDate && (
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              title={`Updated: ${formattedDate}`}
            >
              <Calendar className="w-3 h-3" />
              {showLabels && <span className="hidden sm:inline">{formattedDate}</span>}
            </div>
          )}

          {citationCount !== undefined && citationCount > 0 && (
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
              title={`${citationCount} citation${citationCount !== 1 ? 's' : ''}`}
            >
              <BookOpen className="w-3 h-3" />
              {showLabels && <span className="hidden sm:inline">{citationCount}</span>}
            </div>
          )}

          {evidenceConfig && (
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-md transition-colors"
              style={{
                backgroundColor: `${evidenceConfig.color.light}`,
                color: evidenceConfig.color.text,
              }}
              title={evidenceConfig.description.en}
            >
              <Shield className="w-3 h-3" />
              {showLabels && (
                <span className="font-semibold hidden sm:inline">{evidenceConfig.label}</span>
              )}
            </div>
          )}
        </div>
      );
    }

    if (variant === 'detailed') {
      return (
        <div
          ref={ref}
          className={cn(
            'rounded-xl border border-neutral-200 dark:border-neutral-800',
            'bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950',
            'p-4 space-y-3',
            'shadow-sm',
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
            Content Credibility
          </div>

          {formattedDate && (
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-neutral-400 dark:text-neutral-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  Last Updated
                </div>
                <div className="text-sm text-neutral-900 dark:text-neutral-50">
                  {formattedDate}
                </div>
              </div>
            </div>
          )}

          {citationCount !== undefined && citationCount > 0 && (
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  Citations
                </div>
                <div className="text-sm text-neutral-900 dark:text-neutral-50">
                  {citationCount} source{citationCount !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}

          {evidenceConfig && (
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: evidenceConfig.color.text }} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  Evidence Level
                </div>
                <div className="text-sm text-neutral-900 dark:text-neutral-50">
                  {evidenceConfig.label} - {evidenceConfig.description.en}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Default: inline variant
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-3 sm:gap-4',
          'text-xs sm:text-sm',
          'flex-wrap sm:flex-nowrap',
          className
        )}
        {...props}
      >
        {formattedDate && (
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            {showLabels && <span className="hidden sm:inline">{formattedDate}</span>}
            <span className="sm:hidden text-[10px]">{formattedDate?.substring(0, 5)}</span>
          </div>
        )}

        {citationCount !== undefined && citationCount > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
            <BookOpen className="w-4 h-4 flex-shrink-0" />
            {showLabels && <span className="hidden sm:inline">{citationCount} cite{citationCount !== 1 ? 's' : ''}</span>}
            <span className="sm:hidden text-[10px]">{citationCount}×</span>
          </div>
        )}

        {evidenceConfig && (
          <div
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors font-semibold"
            style={{
              backgroundColor: `${evidenceConfig.color.light}33`,
              color: evidenceConfig.color.text,
            }}
            title={evidenceConfig.description.en}
          >
            <Shield className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline">Level {evidenceConfig.label}</span>
            <span className="sm:hidden">{evidenceConfig.label}</span>
          </div>
        )}
      </div>
    );
  }
);

TrustBadge.displayName = 'TrustBadge';

export default TrustBadge;
