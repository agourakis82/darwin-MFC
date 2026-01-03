'use client';

/**
 * DARWIN-MFC EVIDENCE CONFIDENCE BAR
 * ===================================
 *
 * Visual confidence meter for displaying evidence quality
 * as a horizontal bar with segmented fill and percentage.
 *
 * @example
 * ```tsx
 * <EvidenceConfidenceBar value={85} />
 * <EvidenceConfidenceBar value={60} showPercentage showLabel label="Certainty" />
 * ```
 */

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';
import { AlertCircle, CheckCircle2, HelpCircle, Info } from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

export type ConfidenceLevel = 'very-low' | 'low' | 'moderate' | 'high' | 'very-high';

export interface EvidenceConfidenceBarProps {
  /** Confidence value (0-100) */
  value: number;

  /** Show percentage text */
  showPercentage?: boolean;

  /** Show text label */
  showLabel?: boolean;

  /** Custom label text */
  label?: string;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Show segments instead of smooth fill */
  segmented?: boolean;

  /** Number of segments (if segmented) */
  segments?: number;

  /** Enable animation */
  animated?: boolean;

  /** Custom class name */
  className?: string;

  /** Tooltip text */
  tooltipText?: string;
}

// =============================================================================
// CONFIGURATION
// =============================================================================

interface LevelConfig {
  label: string;
  description: string;
  color: string;
  bgColor: string;
  fillColor: string;
  icon: React.ElementType;
  minValue: number;
  maxValue: number;
}

const levelConfig: Record<ConfidenceLevel, LevelConfig> = {
  'very-low': {
    label: 'Very Low',
    description: 'Evidence is very uncertain',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    fillColor: 'bg-red-500',
    icon: AlertCircle,
    minValue: 0,
    maxValue: 20,
  },
  low: {
    label: 'Low',
    description: 'Evidence is uncertain',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    fillColor: 'bg-orange-500',
    icon: AlertCircle,
    minValue: 20,
    maxValue: 40,
  },
  moderate: {
    label: 'Moderate',
    description: 'Evidence is moderately certain',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    fillColor: 'bg-amber-500',
    icon: Info,
    minValue: 40,
    maxValue: 60,
  },
  high: {
    label: 'High',
    description: 'Evidence is fairly certain',
    color: 'text-lime-600 dark:text-lime-400',
    bgColor: 'bg-lime-100 dark:bg-lime-900/30',
    fillColor: 'bg-lime-500',
    icon: CheckCircle2,
    minValue: 60,
    maxValue: 80,
  },
  'very-high': {
    label: 'Very High',
    description: 'Evidence is very certain',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    fillColor: 'bg-emerald-500',
    icon: CheckCircle2,
    minValue: 80,
    maxValue: 100,
  },
};

const sizeConfig = {
  sm: {
    bar: 'h-1.5',
    text: 'text-xs',
    icon: 'w-3 h-3',
    gap: 'gap-1.5',
  },
  md: {
    bar: 'h-2',
    text: 'text-sm',
    icon: 'w-4 h-4',
    gap: 'gap-2',
  },
  lg: {
    bar: 'h-3',
    text: 'text-base',
    icon: 'w-5 h-5',
    gap: 'gap-2.5',
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getConfidenceLevel(value: number): ConfidenceLevel {
  if (value < 20) return 'very-low';
  if (value < 40) return 'low';
  if (value < 60) return 'moderate';
  if (value < 80) return 'high';
  return 'very-high';
}

function getGradientColor(value: number): string {
  // Create a gradient from red (0) through yellow (50) to green (100)
  if (value < 40) {
    return 'from-red-500 via-orange-500 to-amber-500';
  }
  if (value < 60) {
    return 'from-amber-500 via-yellow-500 to-lime-500';
  }
  return 'from-lime-500 via-green-500 to-emerald-500';
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function EvidenceConfidenceBar({
  value,
  showPercentage = true,
  showLabel = false,
  label,
  size = 'md',
  segmented = false,
  segments = 5,
  animated = true,
  className,
  tooltipText,
}: EvidenceConfidenceBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const level = getConfidenceLevel(clampedValue);
  const config = levelConfig[level];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  const activeSegments = useMemo(() => {
    if (!segmented) return 0;
    return Math.round((clampedValue / 100) * segments);
  }, [clampedValue, segmented, segments]);

  const barContent = (
    <div className={cn('w-full', sizes.gap, className)}>
      {/* Label and percentage row */}
      {(showLabel || showPercentage) && (
        <div className="flex items-center justify-between mb-1">
          {showLabel && (
            <div className={cn('flex items-center gap-1', sizes.text)}>
              <Icon className={cn(sizes.icon, config.color)} />
              <span className={cn('font-medium', config.color)}>
                {label || config.label}
              </span>
            </div>
          )}
          {showPercentage && (
            <span className={cn(sizes.text, 'font-semibold text-neutral-700 dark:text-neutral-300')}>
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      )}

      {/* Bar */}
      <div
        className={cn(
          'w-full rounded-full overflow-hidden',
          'bg-neutral-200 dark:bg-neutral-700',
          sizes.bar
        )}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Confidence: ${clampedValue}%`}
      >
        {segmented ? (
          // Segmented bar
          <div className="h-full flex gap-0.5">
            {Array.from({ length: segments }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  'flex-1 h-full transition-colors duration-300',
                  index < activeSegments ? config.fillColor : 'bg-transparent',
                  index === 0 && 'rounded-l-full',
                  index === segments - 1 && 'rounded-r-full'
                )}
              />
            ))}
          </div>
        ) : (
          // Smooth gradient bar
          <motion.div
            className={cn('h-full rounded-full bg-gradient-to-r', getGradientColor(clampedValue))}
            initial={animated ? { width: 0 } : false}
            animate={{ width: `${clampedValue}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        )}
      </div>
    </div>
  );

  if (!tooltipText) {
    return barContent;
  }

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="cursor-help">{barContent}</div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 max-w-xs px-3 py-2 text-sm bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700"
            sideOffset={5}
          >
            <div className="space-y-1">
              <div className={cn('font-semibold', config.color)}>
                {config.label} Confidence ({clampedValue}%)
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                {tooltipText || config.description}
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
 * Compact inline confidence indicator
 */
export function ConfidenceIndicator({
  value,
  size = 'sm',
  className,
}: {
  value: number;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const level = getConfidenceLevel(clampedValue);
  const config = levelConfig[level];

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span
            className={cn(
              'inline-flex items-center justify-center rounded-full font-bold cursor-help',
              config.bgColor,
              config.color,
              size === 'sm' && 'w-6 h-6 text-[10px]',
              size === 'md' && 'w-8 h-8 text-xs',
              className
            )}
          >
            {Math.round(clampedValue)}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 px-2 py-1 text-xs bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700"
            sideOffset={5}
          >
            <span className={config.color}>
              {config.label}: {config.description}
            </span>
            <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

/**
 * Multiple confidence bars for comparing different aspects
 */
export function ConfidenceComparison({
  items,
  size = 'sm',
  className,
}: {
  items: Array<{
    label: string;
    value: number;
    description?: string;
  }>;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, index) => (
        <div key={index}>
          <EvidenceConfidenceBar
            value={item.value}
            label={item.label}
            showLabel
            showPercentage
            size={size}
            tooltipText={item.description}
          />
        </div>
      ))}
    </div>
  );
}

export default EvidenceConfidenceBar;
