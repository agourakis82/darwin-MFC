'use client';

/**
 * DARWIN-MFC DRUG INTERACTION BADGE
 * ==================================
 *
 * A severity-coded badge for displaying drug interaction levels.
 * Uses color coding and icons to quickly communicate risk levels.
 *
 * @example
 * ```tsx
 * <InteractionBadge severity="major" />
 * <InteractionBadge severity="contraindicated" showLabel pulsate />
 * ```
 */

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  Ban,
  AlertTriangle,
  AlertCircle,
  Info,
  Check,
  type LucideIcon,
} from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

export type InteractionSeverity =
  | 'contraindicated'
  | 'major'
  | 'moderate'
  | 'minor'
  | 'none'
  | 'unknown';

export interface InteractionBadgeProps {
  /** Interaction severity level */
  severity: InteractionSeverity;

  /** Show text label */
  showLabel?: boolean;

  /** Show tooltip with description */
  showTooltip?: boolean;

  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /** Enable pulse animation for critical interactions */
  pulsate?: boolean;

  /** Custom class name */
  className?: string;

  /** Custom tooltip text */
  tooltipText?: string;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

interface SeverityConfig {
  label: string;
  labelKey: string;
  description: string;
  descriptionKey: string;
  shortLabel: string;
  color: string;
  bgColor: string;
  borderColor: string;
  ringColor: string;
  icon: LucideIcon;
  priority: number;
}

const severityConfig: Record<InteractionSeverity, SeverityConfig> = {
  contraindicated: {
    label: 'Contraindicated',
    labelKey: 'interactions.severity.contraindicated.label',
    description: 'This combination should never be used. Serious harm or death may result.',
    descriptionKey: 'interactions.severity.contraindicated.description',
    shortLabel: 'CI',
    color: 'text-red-700 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/50',
    borderColor: 'border-red-300 dark:border-red-800',
    ringColor: 'ring-red-400',
    icon: Ban,
    priority: 5,
  },
  major: {
    label: 'Major',
    labelKey: 'interactions.severity.major.label',
    description: 'May cause significant harm. Avoid combination or use with extreme caution.',
    descriptionKey: 'interactions.severity.major.description',
    shortLabel: 'MAJ',
    color: 'text-orange-700 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/50',
    borderColor: 'border-orange-300 dark:border-orange-800',
    ringColor: 'ring-orange-400',
    icon: AlertTriangle,
    priority: 4,
  },
  moderate: {
    label: 'Moderate',
    labelKey: 'interactions.severity.moderate.label',
    description: 'May worsen patient condition. Consider alternatives or monitor closely.',
    descriptionKey: 'interactions.severity.moderate.description',
    shortLabel: 'MOD',
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/50',
    borderColor: 'border-amber-300 dark:border-amber-800',
    ringColor: 'ring-amber-400',
    icon: AlertCircle,
    priority: 3,
  },
  minor: {
    label: 'Minor',
    labelKey: 'interactions.severity.minor.label',
    description: 'May cause minor effects. Usually no action needed.',
    descriptionKey: 'interactions.severity.minor.description',
    shortLabel: 'MIN',
    color: 'text-lime-700 dark:text-lime-400',
    bgColor: 'bg-lime-50 dark:bg-lime-950/50',
    borderColor: 'border-lime-300 dark:border-lime-800',
    ringColor: 'ring-lime-400',
    icon: Info,
    priority: 2,
  },
  none: {
    label: 'No Interaction',
    labelKey: 'interactions.severity.none.label',
    description: 'No clinically significant interaction expected.',
    descriptionKey: 'interactions.severity.none.description',
    shortLabel: 'OK',
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
    borderColor: 'border-emerald-300 dark:border-emerald-800',
    ringColor: 'ring-emerald-400',
    icon: Check,
    priority: 1,
  },
  unknown: {
    label: 'Unknown',
    labelKey: 'interactions.severity.unknown.label',
    description: 'Interaction status is not known. Use clinical judgment.',
    descriptionKey: 'interactions.severity.unknown.description',
    shortLabel: '?',
    color: 'text-neutral-600 dark:text-neutral-400',
    bgColor: 'bg-neutral-100 dark:bg-neutral-800/50',
    borderColor: 'border-neutral-300 dark:border-neutral-700',
    ringColor: 'ring-neutral-400',
    icon: Info,
    priority: 0,
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

export function InteractionBadge({
  severity,
  showLabel = true,
  showTooltip = true,
  size = 'md',
  pulsate = false,
  className,
  tooltipText,
}: InteractionBadgeProps) {
  const config = severityConfig[severity];
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

  const shouldPulsate = pulsate && (severity === 'contraindicated' || severity === 'major');

  const badge = (
    <span
      className={cn(
        'inline-flex items-center font-medium border',
        config.bgColor,
        config.borderColor,
        config.color,
        sizes.badge,
        shouldPulsate && 'animate-pulse',
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
                <Icon className="w-4 h-4" />
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
 * Compact interaction indicator for table cells or lists
 */
export function InteractionIndicator({
  severity,
  className,
}: {
  severity: InteractionSeverity;
  className?: string;
}) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span
            className={cn(
              'inline-flex items-center justify-center w-6 h-6 rounded-full cursor-help',
              config.bgColor,
              config.color,
              className
            )}
          >
            <Icon className="w-3.5 h-3.5" />
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
 * Get the highest severity from a list of interactions
 */
export function getHighestSeverity(severities: InteractionSeverity[]): InteractionSeverity {
  if (severities.length === 0) return 'unknown';

  return severities.reduce((highest, current) => {
    const currentPriority = severityConfig[current]?.priority ?? 0;
    const highestPriority = severityConfig[highest]?.priority ?? 0;
    return currentPriority > highestPriority ? current : highest;
  }, 'unknown' as InteractionSeverity);
}

/**
 * Interaction severity legend component
 */
export function InteractionLegend({ className }: { className?: string }) {
  const severities: InteractionSeverity[] = [
    'contraindicated',
    'major',
    'moderate',
    'minor',
    'none',
  ];

  return (
    <div className={cn('space-y-3', className)}>
      <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
        Interaction Severity Levels
      </h4>
      <div className="flex flex-wrap gap-2">
        {severities.map((severity) => (
          <InteractionBadge
            key={severity}
            severity={severity}
            showLabel
            showTooltip={false}
            size="sm"
          />
        ))}
      </div>
    </div>
  );
}

export default InteractionBadge;
