/**
 * TREND VISUALIZATION
 * ===================
 *
 * Multi-series trend visualization for tracking metrics over time
 * (coverage trends, guideline evolution, outcome improvements)
 *
 * Features:
 * - Multiple series comparison
 * - Area, line, and bar chart modes
 * - Trend indicators (up/down/stable)
 * - Percentage change annotations
 * - Reference lines for targets
 * - Interactive legend with series toggling
 * - Responsive with animations
 */

'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  BarChart3,
  LineChart as LineChartIcon,
  AreaChart as AreaChartIcon,
} from 'lucide-react';
import { Button } from '../../primitives/button';
import { Card } from '../../primitives/card';

// ============================================================================
// TYPES
// ============================================================================

export interface TrendDataPoint {
  label: string; // X-axis label (date, year, month)
  [key: string]: number | string; // Dynamic series values
}

export interface TrendSeries {
  key: string; // Data key
  name: string; // Display name
  color: string; // Line/area color
  target?: number; // Optional target line
  unit?: string; // Unit for formatting (%, cases, etc.)
}

export interface TrendStats {
  series: string;
  current: number;
  previous: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
}

export interface TrendVisualizationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof trendVariants> {
  data: TrendDataPoint[];
  series: TrendSeries[];
  title?: string;
  description?: string;
  chartType?: 'line' | 'area' | 'bar';
  height?: number;
  showStats?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
  enableInteractiveLegend?: boolean;
  enableExport?: boolean;
  animationDuration?: number;
  yAxisLabel?: string;
  xAxisLabel?: string;
  onSeriesToggle?: (seriesKey: string, visible: boolean) => void;
}

// ============================================================================
// VARIANTS
// ============================================================================

const trendVariants = cva(['relative w-full'], {
  variants: {
    variant: {
      default: 'bg-white dark:bg-neutral-900',
      bordered: 'border border-neutral-200 dark:border-neutral-800',
      glass: 'bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
});

// ============================================================================
// TREND INDICATOR
// ============================================================================

interface TrendIndicatorProps {
  trend: 'up' | 'down' | 'stable';
  value: number;
  label: string;
}

const TrendIndicator: React.FC<TrendIndicatorProps> = ({ trend, value, label }) => {
  const Icon =
    trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  const colorClass =
    trend === 'up'
      ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      : trend === 'down'
      ? 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
      : 'text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800';

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'flex items-center gap-1 px-2 py-1 rounded text-xs font-medium',
          colorClass
        )}
      >
        <Icon className="w-3 h-3" />
        <span>{value > 0 ? '+' : ''}{value.toFixed(1)}%</span>
      </div>
      <span className="text-xs text-neutral-600 dark:text-neutral-400">{label}</span>
    </div>
  );
};

// ============================================================================
// CUSTOM TOOLTIP
// ============================================================================

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  series: TrendSeries[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  series,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-lg border border-neutral-200 dark:border-neutral-700',
        'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md',
        'p-3 shadow-lg'
      )}
    >
      <p className="text-sm font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
        {label}
      </p>
      {payload.map((entry: any, index: number) => {
        const seriesInfo = series.find((s) => s.key === entry.dataKey);
        return (
          <div key={index} className="flex items-center gap-2 text-sm mb-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-neutral-600 dark:text-neutral-400">
              {entry.name}:
            </span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {typeof entry.value === 'number'
                ? entry.value.toFixed(1)
                : entry.value}
              {seriesInfo?.unit && ` ${seriesInfo.unit}`}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const TrendVisualization = React.forwardRef<
  HTMLDivElement,
  TrendVisualizationProps
>(
  (
    {
      data,
      series,
      title,
      description,
      chartType = 'line',
      height = 400,
      showStats = true,
      showLegend = true,
      showGrid = true,
      enableInteractiveLegend = true,
      enableExport = true,
      animationDuration = 1000,
      yAxisLabel,
      xAxisLabel,
      onSeriesToggle,
      variant,
      padding,
      className,
      ...props
    },
    ref
  ) => {
    // State
    const [activeChartType, setActiveChartType] = useState<'line' | 'area' | 'bar'>(
      chartType
    );
    const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());

    // Calculate trend statistics
    const trendStats = useMemo((): TrendStats[] => {
      if (data.length < 2) return [];

      return series.map((s) => {
        const values = data
          .map((d) => d[s.key])
          .filter((v) => typeof v === 'number') as number[];

        if (values.length < 2) {
          return {
            series: s.name,
            current: 0,
            previous: 0,
            change: 0,
            changePercent: 0,
            trend: 'stable' as const,
          };
        }

        const current = values[values.length - 1];
        const previous = values[values.length - 2];
        const change = current - previous;
        const changePercent = (change / previous) * 100;

        return {
          series: s.name,
          current,
          previous,
          change,
          changePercent,
          trend:
            Math.abs(changePercent) < 1
              ? ('stable' as const)
              : changePercent > 0
              ? ('up' as const)
              : ('down' as const),
        };
      });
    }, [data, series]);

    // Filter visible series
    const visibleSeries = useMemo(() => {
      return series.filter((s) => !hiddenSeries.has(s.key));
    }, [series, hiddenSeries]);

    // Toggle series visibility
    const handleToggleSeries = useCallback(
      (seriesKey: string) => {
        if (!enableInteractiveLegend) return;

        setHiddenSeries((prev) => {
          const next = new Set(prev);
          if (next.has(seriesKey)) {
            next.delete(seriesKey);
            onSeriesToggle?.(seriesKey, true);
          } else {
            next.add(seriesKey);
            onSeriesToggle?.(seriesKey, false);
          }
          return next;
        });
      },
      [enableInteractiveLegend, onSeriesToggle]
    );

    // Export handler
    const handleExport = useCallback(() => {
      // TODO: Implement export
      console.log('Export trend visualization');
    }, []);

    // Render chart based on type
    const renderChart = () => {
      const commonProps = {
        data,
        margin: { top: 5, right: 30, left: 20, bottom: 5 },
      };

      const commonAxisProps = {
        xAxis: {
          dataKey: 'label',
          stroke: 'hsl(var(--neutral-600))',
          tick: { fontSize: 12 },
        },
        yAxis: {
          stroke: 'hsl(var(--neutral-600))',
          tick: { fontSize: 12 },
          label: yAxisLabel ? ({ value: yAxisLabel, angle: -90, position: 'insideLeft' } as any) : undefined,
        },
      };

      if (activeChartType === 'area') {
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--neutral-200))" />}
            <XAxis {...commonAxisProps.xAxis} />
            <YAxis {...commonAxisProps.yAxis} />
            <Tooltip content={<CustomTooltip series={series} />} />
            {showLegend && (
              <Legend
                onClick={(e) => handleToggleSeries(e.dataKey as string)}
                wrapperStyle={{ cursor: enableInteractiveLegend ? 'pointer' : 'default' }}
              />
            )}

            {visibleSeries.map((s) => (
              <React.Fragment key={s.key}>
                <Area
                  type="monotone"
                  dataKey={s.key}
                  name={s.name}
                  stroke={s.color}
                  fill={s.color}
                  fillOpacity={0.3}
                  strokeWidth={2}
                  animationDuration={animationDuration}
                />
                {s.target && (
                  <ReferenceLine
                    y={s.target}
                    stroke={s.color}
                    strokeDasharray="3 3"
                    label={{ value: 'Target', fontSize: 10 }}
                  />
                )}
              </React.Fragment>
            ))}
          </AreaChart>
        );
      }

      if (activeChartType === 'bar') {
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--neutral-200))" />}
            <XAxis {...commonAxisProps.xAxis} />
            <YAxis {...commonAxisProps.yAxis} />
            <Tooltip content={<CustomTooltip series={series} />} />
            {showLegend && (
              <Legend
                onClick={(e) => handleToggleSeries(e.dataKey as string)}
                wrapperStyle={{ cursor: enableInteractiveLegend ? 'pointer' : 'default' }}
              />
            )}

            {visibleSeries.map((s) => (
              <React.Fragment key={s.key}>
                <Bar
                  dataKey={s.key}
                  name={s.name}
                  fill={s.color}
                  animationDuration={animationDuration}
                />
                {s.target && (
                  <ReferenceLine
                    y={s.target}
                    stroke={s.color}
                    strokeDasharray="3 3"
                    label={{ value: 'Target', fontSize: 10 }}
                  />
                )}
              </React.Fragment>
            ))}
          </BarChart>
        );
      }

      // Default: line chart
      return (
        <LineChart {...commonProps}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--neutral-200))" />}
          <XAxis {...commonAxisProps.xAxis} />
          <YAxis {...commonAxisProps.yAxis} />
          <Tooltip content={<CustomTooltip series={series} />} />
          {showLegend && (
            <Legend
              onClick={(e) => handleToggleSeries(e.dataKey as string)}
              wrapperStyle={{ cursor: enableInteractiveLegend ? 'pointer' : 'default' }}
            />
          )}

          {visibleSeries.map((s) => (
            <React.Fragment key={s.key}>
              <Line
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={animationDuration}
              />
              {s.target && (
                <ReferenceLine
                  y={s.target}
                  stroke={s.color}
                  strokeDasharray="3 3"
                  label={{ value: 'Target', fontSize: 10 }}
                />
              )}
            </React.Fragment>
          ))}
        </LineChart>
      );
    };

    return (
      <Card
        ref={ref}
        className={cn(trendVariants({ variant, padding }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            {title && (
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {description}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Chart type switcher */}
            <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded">
              <Button
                variant={activeChartType === 'line' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setActiveChartType('line')}
                aria-label="Line chart"
              >
                <LineChartIcon className="w-4 h-4" />
              </Button>
              <Button
                variant={activeChartType === 'area' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setActiveChartType('area')}
                aria-label="Area chart"
              >
                <AreaChartIcon className="w-4 h-4" />
              </Button>
              <Button
                variant={activeChartType === 'bar' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setActiveChartType('bar')}
                aria-label="Bar chart"
              >
                <BarChart3 className="w-4 h-4" />
              </Button>
            </div>

            {enableExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                iconBefore={<Download className="w-4 h-4" />}
              >
                Export
              </Button>
            )}
          </div>
        </div>

        {/* Trend Stats */}
        {showStats && trendStats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {trendStats.map((stat) => (
              <div
                key={stat.series}
                className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50"
              >
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                  {stat.series}
                </p>
                <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  {stat.current.toFixed(1)}
                </p>
                <TrendIndicator
                  trend={stat.trend}
                  value={stat.changePercent}
                  label="vs previous"
                />
              </div>
            ))}
          </div>
        )}

        {/* Chart */}
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </Card>
    );
  }
);

TrendVisualization.displayName = 'TrendVisualization';
