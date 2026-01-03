'use client';

/**
 * DARWIN-MFC CONVERGENCE STATUS BADGE
 * =====================================
 *
 * A badge component for displaying the alignment status between
 * official guidelines (SUS/Government) and medical society recommendations.
 *
 * Convergence Status:
 * - convergencia: Full alignment between all sources
 * - parcial: Partial alignment with minor differences
 * - divergencia: Significant disagreement between sources
 * - em_disputa: Active debate with unresolved differences
 *
 * @example
 * ```tsx
 * <ConvergenceStatusBadge status="convergencia" />
 * <ConvergenceStatusBadge status="divergencia" showLabel />
 * ```
 */

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  CheckCircle2,
  CircleDot,
  AlertTriangle,
  HelpCircle,
  Scale,
  type LucideIcon,
} from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

export type ConvergenceStatus = 'convergencia' | 'parcial' | 'divergencia' | 'em_disputa';

export interface ConvergenceStatusBadgeProps {
  /** Convergence status */
  status: ConvergenceStatus;

  /** Show text label */
  showLabel?: boolean;

  /** Show detailed tooltip */
  showTooltip?: boolean;

  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /** Custom class name */
  className?: string;

  /** Custom tooltip text */
  tooltipText?: string;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

interface StatusConfig {
  label: string;
  labelKey: string;
  description: string;
  descriptionKey: string;
  shortLabel: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: LucideIcon;
}

const statusConfig: Record<ConvergenceStatus, StatusConfig> = {
  convergencia: {
    label: 'Convergence',
    labelKey: 'convergence.status.convergencia.label',
    description: 'Full alignment between official guidelines and medical societies.',
    descriptionKey: 'convergence.status.convergencia.description',
    shortLabel: 'C',
    emoji: '🟢',
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    icon: CheckCircle2,
  },
  parcial: {
    label: 'Partial',
    labelKey: 'convergence.status.parcial.label',
    description: 'Partial alignment with minor differences in recommendations.',
    descriptionKey: 'convergence.status.parcial.description',
    shortLabel: 'P',
    emoji: '🟡',
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/50',
    borderColor: 'border-amber-200 dark:border-amber-800',
    icon: CircleDot,
  },
  divergencia: {
    label: 'Divergence',
    labelKey: 'convergence.status.divergencia.label',
    description: 'Significant disagreement between official guidelines and societies.',
    descriptionKey: 'convergence.status.divergencia.description',
    shortLabel: 'D',
    emoji: '🔴',
    color: 'text-red-700 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/50',
    borderColor: 'border-red-200 dark:border-red-800',
    icon: AlertTriangle,
  },
  em_disputa: {
    label: 'In Dispute',
    labelKey: 'convergence.status.em_disputa.label',
    description: 'Active debate with unresolved differences among experts.',
    descriptionKey: 'convergence.status.em_disputa.description',
    shortLabel: '?',
    emoji: '🟣',
    color: 'text-purple-700 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/50',
    borderColor: 'border-purple-200 dark:border-purple-800',
    icon: HelpCircle,
  },
};

const sizeClasses = {
  xs: {
    badge: 'px-1 py-0.5 text-[10px] gap-0.5 rounded',
    icon: 'w-2.5 h-2.5',
  },
  sm: {
    badge: 'px-1.5 py-0.5 text-xs gap-1 rounded-md',
    icon: 'w-3 h-3',
  },
  md: {
    badge: 'px-2 py-1 text-sm gap-1.5 rounded-md',
    icon: 'w-4 h-4',
  },
  lg: {
    badge: 'px-3 py-1.5 text-base gap-2 rounded-lg',
    icon: 'w-5 h-5',
  },
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ConvergenceStatusBadge({
  status,
  showLabel = true,
  showTooltip = true,
  size = 'md',
  className,
  tooltipText,
}: ConvergenceStatusBadgeProps) {
  const config = statusConfig[status];
  const sizes = sizeClasses[size];
  const Icon = config.icon;

  // Safe translation hook with fallback
  let t: (key: string) => string;
  try {
    const translations = useTranslations();
    t = (key: string) => {
      try {
        return translations(key);
      } catch {
        if (key === config.labelKey) return config.label;
        if (key === config.descriptionKey) return config.description;
        return key;
      }
    };
  } catch {
    t = (key: string) => {
      if (key === config.labelKey) return config.label;
      if (key === config.descriptionKey) return config.description;
      return key;
    };
  }

  const badge = (
    <span
      className={cn(
        'inline-flex items-center font-medium border',
        config.bgColor,
        config.borderColor,
        config.color,
        sizes.badge,
        className
      )}
    >
      <Icon className={sizes.icon} aria-hidden="true" />
      {showLabel ? (
        <span>{t(config.labelKey)}</span>
      ) : (
        <span className="font-bold">{config.shortLabel}</span>
      )}
    </span>
  );

  if (!showTooltip) {
    return badge;
  }

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{badge}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={cn(
              'z-50 max-w-xs px-3 py-2 text-sm rounded-lg shadow-lg',
              'bg-white dark:bg-neutral-800 border',
              config.borderColor
            )}
            sideOffset={5}
          >
            <div className="space-y-1">
              <div className={cn('font-semibold flex items-center gap-1.5', config.color)}>
                <span>{config.emoji}</span>
                {t(config.labelKey)}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                {tooltipText || t(config.descriptionKey)}
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
 * Compact convergence indicator for table cells
 */
export function ConvergenceIndicator({
  status,
  className,
}: {
  status: ConvergenceStatus;
  className?: string;
}) {
  const config = statusConfig[status];

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span
            className={cn(
              'inline-flex items-center justify-center w-6 h-6 rounded-full cursor-help text-sm',
              config.bgColor,
              className
            )}
          >
            {config.emoji}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 px-2 py-1 text-xs bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700"
            sideOffset={5}
          >
            <span className={config.color}>{config.label}</span>
            <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

/**
 * Convergence legend for reference
 */
export function ConvergenceLegend({ className }: { className?: string }) {
  const statuses: ConvergenceStatus[] = ['convergencia', 'parcial', 'divergencia', 'em_disputa'];

  return (
    <div className={cn('space-y-3', className)}>
      <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
        <Scale className="w-4 h-4" />
        Guideline Alignment Status
      </h4>
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <ConvergenceStatusBadge
            key={status}
            status={status}
            showLabel
            showTooltip={false}
            size="sm"
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Convergence comparison showing counts
 */
export function ConvergenceSummary({
  counts,
  className,
}: {
  counts: Partial<Record<ConvergenceStatus, number>>;
  className?: string;
}) {
  const statuses: ConvergenceStatus[] = ['convergencia', 'parcial', 'divergencia', 'em_disputa'];
  const total = Object.values(counts).reduce((sum, n) => sum + (n || 0), 0);

  if (total === 0) return null;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {statuses.map((status) => {
        const count = counts[status];
        if (!count) return null;
        const config = statusConfig[status];
        const percentage = Math.round((count / total) * 100);

        return (
          <Tooltip.Provider key={status} delayDuration={200}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div className="flex items-center gap-1.5 cursor-help">
                  <span className="text-lg">{config.emoji}</span>
                  <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    {count}
                  </span>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="z-50 px-2 py-1 text-xs bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700"
                  sideOffset={5}
                >
                  {config.label}: {count} ({percentage}%)
                  <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        );
      })}
    </div>
  );
}

export default ConvergenceStatusBadge;
