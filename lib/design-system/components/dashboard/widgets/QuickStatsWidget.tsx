/**
 * QUICK STATS WIDGET
 * ===================
 *
 * Compact statistics display widget for dashboards
 * Shows key metrics with trend indicators and sparklines
 *
 * Features:
 * - Metric value with label
 * - Trend indicator (up/down/stable)
 * - Percentage change from previous period
 * - Optional sparkline chart
 * - Color-coded severity
 * - Responsive layout
 */

'use client';

import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  Users,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  LucideIcon,
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

export interface QuickStat {
  label: string;
  value: string | number;
  unit?: string;
  change?: number; // Percentage change
  trend?: 'up' | 'down' | 'stable';
  sparklineData?: number[];
  severity?: 'critical' | 'warning' | 'normal' | 'success';
  icon?: LucideIcon;
}

export interface QuickStatsWidgetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statsVariants> {
  stat: QuickStat;
  showSparkline?: boolean;
  showTrend?: boolean;
  showIcon?: boolean;
  compact?: boolean;
  onClick?: () => void;
}

// ============================================================================
// VARIANTS
// ============================================================================

const statsVariants = cva(['relative p-4 rounded-lg transition-all duration-200'], {
  variants: {
    severity: {
      critical: [
        'bg-red-50 dark:bg-red-900/10',
        'border border-red-200 dark:border-red-800',
        'hover:bg-red-100 dark:hover:bg-red-900/20',
      ],
      warning: [
        'bg-amber-50 dark:bg-amber-900/10',
        'border border-amber-200 dark:border-amber-800',
        'hover:bg-amber-100 dark:hover:bg-amber-900/20',
      ],
      normal: [
        'bg-neutral-50 dark:bg-neutral-800/50',
        'border border-neutral-200 dark:border-neutral-700',
        'hover:bg-neutral-100 dark:hover:bg-neutral-800',
      ],
      success: [
        'bg-green-50 dark:bg-green-900/10',
        'border border-green-200 dark:border-green-800',
        'hover:bg-green-100 dark:hover:bg-green-900/20',
      ],
    },
  },
  defaultVariants: {
    severity: 'normal',
  },
});

// ============================================================================
// TREND INDICATOR
// ============================================================================

interface TrendIndicatorProps {
  trend: 'up' | 'down' | 'stable';
  change?: number;
  compact?: boolean;
}

const TrendIndicator: React.FC<TrendIndicatorProps> = ({ trend, change, compact }) => {
  const Icon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  const colorClass =
    trend === 'up'
      ? 'text-green-600 dark:text-green-400'
      : trend === 'down'
      ? 'text-red-600 dark:text-red-400'
      : 'text-neutral-600 dark:text-neutral-400';

  return (
    <div className={cn('flex items-center gap-1', colorClass)}>
      <Icon className={cn(compact ? 'w-3 h-3' : 'w-4 h-4')} />
      {change !== undefined && (
        <span className={cn('font-medium', compact ? 'text-xs' : 'text-sm')}>
          {change > 0 ? '+' : ''}
          {change.toFixed(1)}%
        </span>
      )}
    </div>
  );
};

// ============================================================================
// SPARKLINE
// ============================================================================

interface SparklineProps {
  data: number[];
  color: string;
  height?: number;
}

const Sparkline: React.FC<SparklineProps> = ({ data, color, height = 40 }) => {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          animationDuration={1000}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// ============================================================================
// SEVERITY ICON
// ============================================================================

function getSeverityIcon(severity?: QuickStat['severity']): LucideIcon {
  switch (severity) {
    case 'critical':
      return AlertCircle;
    case 'warning':
      return AlertCircle;
    case 'success':
      return CheckCircle;
    default:
      return Activity;
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const QuickStatsWidget = React.forwardRef<
  HTMLDivElement,
  QuickStatsWidgetProps
>(
  (
    {
      stat,
      showSparkline = true,
      showTrend = true,
      showIcon = true,
      compact = false,
      onClick,
      className,
    },
    ref
  ) => {
    const Icon = stat.icon || getSeverityIcon(stat.severity);

    const sparklineColor =
      stat.severity === 'critical'
        ? 'hsl(0 84% 60%)'
        : stat.severity === 'warning'
        ? 'hsl(38 92% 50%)'
        : stat.severity === 'success'
        ? 'hsl(142 71% 45%)'
        : 'hsl(221 83% 53%)';

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={onClick ? { scale: 1.02 } : undefined}
        onClick={onClick}
        className={cn(
          statsVariants({ severity: stat.severity }),
          onClick && 'cursor-pointer',
          className
        )}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                'text-neutral-600 dark:text-neutral-400 mb-1 truncate',
                compact ? 'text-xs' : 'text-sm'
              )}
            >
              {stat.label}
            </p>
            <div className="flex items-baseline gap-2">
              <span
                className={cn(
                  'font-bold text-neutral-900 dark:text-neutral-100',
                  compact ? 'text-xl' : 'text-2xl'
                )}
              >
                {typeof stat.value === 'number'
                  ? stat.value.toLocaleString()
                  : stat.value}
              </span>
              {stat.unit && (
                <span
                  className={cn(
                    'text-neutral-600 dark:text-neutral-400',
                    compact ? 'text-xs' : 'text-sm'
                  )}
                >
                  {stat.unit}
                </span>
              )}
            </div>
          </div>

          {showIcon && (
            <div
              className={cn(
                'flex-shrink-0 rounded-full p-2',
                stat.severity === 'critical' && 'bg-red-100 dark:bg-red-900/30',
                stat.severity === 'warning' && 'bg-amber-100 dark:bg-amber-900/30',
                stat.severity === 'success' && 'bg-green-100 dark:bg-green-900/30',
                stat.severity === 'normal' && 'bg-neutral-100 dark:bg-neutral-700'
              )}
            >
              <Icon
                className={cn(
                  compact ? 'w-4 h-4' : 'w-5 h-5',
                  stat.severity === 'critical' && 'text-red-600 dark:text-red-400',
                  stat.severity === 'warning' && 'text-amber-600 dark:text-amber-400',
                  stat.severity === 'success' && 'text-green-600 dark:text-green-400',
                  stat.severity === 'normal' && 'text-neutral-600 dark:text-neutral-400'
                )}
              />
            </div>
          )}
        </div>

        {/* Trend Indicator */}
        {showTrend && (stat.trend || stat.change !== undefined) && (
          <div className="mb-3">
            <TrendIndicator
              trend={stat.trend || 'stable'}
              change={stat.change}
              compact={compact}
            />
          </div>
        )}

        {/* Sparkline */}
        {showSparkline && stat.sparklineData && stat.sparklineData.length > 0 && (
          <div className="mt-2 -mx-2 -mb-2">
            <Sparkline
              data={stat.sparklineData}
              color={sparklineColor}
              height={compact ? 30 : 40}
            />
          </div>
        )}
      </motion.div>
    );
  }
);

QuickStatsWidget.displayName = 'QuickStatsWidget';

// ============================================================================
// STATS GRID CONTAINER
// ============================================================================

export interface StatsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: QuickStat[];
  columns?: 1 | 2 | 3 | 4;
  showSparkline?: boolean;
  showTrend?: boolean;
  showIcon?: boolean;
  compact?: boolean;
  onStatClick?: (stat: QuickStat) => void;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  stats,
  columns = 2,
  showSparkline = true,
  showTrend = true,
  showIcon = true,
  compact = false,
  onStatClick,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'grid gap-4',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-1 sm:grid-cols-2',
        columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
      {...props}
    >
      {stats.map((stat, index) => (
        <QuickStatsWidget
          key={index}
          stat={stat}
          showSparkline={showSparkline}
          showTrend={showTrend}
          showIcon={showIcon}
          compact={compact}
          onClick={onStatClick ? () => onStatClick(stat) : undefined}
        />
      ))}
    </div>
  );
};
