/**
 * EPIDEMIOLOGY HEATMAP
 * ====================
 *
 * Heatmap visualization for epidemiological data patterns
 * (disease prevalence, screening coverage, demographic distribution)
 *
 * Features:
 * - Responsive grid-based heatmap
 * - Multiple color scales (sequential, diverging, categorical)
 * - Interactive cell hover with detailed tooltips
 * - Animated transitions
 * - Export functionality
 * - Accessibility with ARIA labels
 */

'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import { Download, Info, MapPin, Users, Calendar } from 'lucide-react';
import { Button } from '../../primitives/button';
import { Card } from '../../primitives/card';

// ============================================================================
// TYPES
// ============================================================================

export interface HeatmapCell {
  x: string; // Column label (e.g., region, age group)
  y: string; // Row label (e.g., disease, year)
  value: number;
  label?: string;
  metadata?: Record<string, any>;
}

export interface HeatmapLegendItem {
  min: number;
  max: number;
  color: string;
  label: string;
}

export interface EpidemiologyHeatmapProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof heatmapVariants> {
  data: HeatmapCell[];
  title?: string;
  description?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  colorScale?: 'sequential' | 'diverging' | 'categorical' | 'clinical';
  minValue?: number;
  maxValue?: number;
  cellSize?: 'sm' | 'md' | 'lg' | 'xl';
  showValues?: boolean;
  showTooltips?: boolean;
  enableExport?: boolean;
  animationDuration?: number;
  onCellClick?: (cell: HeatmapCell) => void;
  customColorMapping?: (value: number) => string;
}

// ============================================================================
// VARIANTS
// ============================================================================

const heatmapVariants = cva(['relative w-full'], {
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

const cellSizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
  xl: 'w-20 h-20 text-lg',
};

// ============================================================================
// COLOR SCALES
// ============================================================================

const colorScales = {
  sequential: {
    // Green scale for positive metrics (coverage, adherence)
    generate: (value: number, min: number, max: number): string => {
      const normalized = (value - min) / (max - min);
      const hue = 142; // Green
      const saturation = 71;
      const lightness = 95 - normalized * 50; // 95% to 45%
      return `hsl(${hue} ${saturation}% ${lightness}%)`;
    },
  },
  diverging: {
    // Red-Yellow-Green for comparison to targets
    generate: (value: number, min: number, max: number): string => {
      const normalized = (value - min) / (max - min);
      const midpoint = 0.5;

      if (normalized < midpoint) {
        // Red to Yellow
        const t = normalized / midpoint;
        const hue = 0 + t * 38; // 0 (red) to 38 (amber)
        return `hsl(${hue} 84% 60%)`;
      } else {
        // Yellow to Green
        const t = (normalized - midpoint) / midpoint;
        const hue = 38 + t * 104; // 38 (amber) to 142 (green)
        return `hsl(${hue} 71% 50%)`;
      }
    },
  },
  categorical: {
    // Distinct colors for categories
    colors: [
      'hsl(221 83% 53%)', // Blue
      'hsl(142 71% 45%)', // Green
      'hsl(0 84% 60%)', // Red
      'hsl(38 92% 50%)', // Amber
      'hsl(271 81% 56%)', // Purple
      'hsl(173 58% 39%)', // Teal
      'hsl(24 95% 53%)', // Orange
      'hsl(280 87% 65%)', // Pink
    ],
    generate: (value: number, min: number, max: number): string => {
      const index = Math.floor((value - min) / (max - min) * 7);
      return colorScales.categorical.colors[index] || colorScales.categorical.colors[0];
    },
  },
  clinical: {
    // Clinical semantic colors
    generate: (value: number, min: number, max: number): string => {
      const normalized = (value - min) / (max - min);

      if (normalized < 0.25) return 'hsl(0 84% 60%)'; // Critical (red)
      if (normalized < 0.5) return 'hsl(38 92% 50%)'; // Warning (amber)
      if (normalized < 0.75) return 'hsl(221 83% 53%)'; // Info (blue)
      return 'hsl(142 71% 45%)'; // Safe (green)
    },
  },
};

// ============================================================================
// CUSTOM TOOLTIP
// ============================================================================

interface CustomTooltipProps {
  cell: HeatmapCell | null;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  cell,
  xAxisLabel,
  yAxisLabel,
}) => {
  if (!cell) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn(
          'absolute z-50 pointer-events-none',
          'rounded-lg border border-neutral-200 dark:border-neutral-700',
          'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md',
          'p-3 shadow-xl'
        )}
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -120%)',
        }}
      >
        <div className="text-sm space-y-1">
          {xAxisLabel && (
            <div className="flex items-center gap-2">
              <span className="text-neutral-600 dark:text-neutral-400">
                {xAxisLabel}:
              </span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {cell.x}
              </span>
            </div>
          )}
          {yAxisLabel && (
            <div className="flex items-center gap-2">
              <span className="text-neutral-600 dark:text-neutral-400">
                {yAxisLabel}:
              </span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {cell.y}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 pt-1 border-t border-neutral-200 dark:border-neutral-700">
            <span className="text-neutral-600 dark:text-neutral-400">Value:</span>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {cell.value.toFixed(1)}
            </span>
          </div>
          {cell.label && (
            <p className="text-xs text-neutral-600 dark:text-neutral-400 pt-1">
              {cell.label}
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const EpidemiologyHeatmap = React.forwardRef<
  HTMLDivElement,
  EpidemiologyHeatmapProps
>(
  (
    {
      data,
      title,
      description,
      xAxisLabel,
      yAxisLabel,
      colorScale = 'sequential',
      minValue,
      maxValue,
      cellSize = 'md',
      showValues = true,
      showTooltips = true,
      enableExport = true,
      animationDuration = 500,
      onCellClick,
      customColorMapping,
      variant,
      padding,
      className,
      ...props
    },
    ref
  ) => {
    // State
    const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null);

    // Calculate min/max if not provided
    const { min, max } = useMemo(() => {
      const values = data.map((cell) => cell.value);
      return {
        min: minValue ?? Math.min(...values),
        max: maxValue ?? Math.max(...values),
      };
    }, [data, minValue, maxValue]);

    // Get unique x and y labels
    const { xLabels, yLabels } = useMemo(() => {
      const xSet = new Set<string>();
      const ySet = new Set<string>();
      data.forEach((cell) => {
        xSet.add(cell.x);
        ySet.add(cell.y);
      });
      return {
        xLabels: Array.from(xSet),
        yLabels: Array.from(ySet),
      };
    }, [data]);

    // Create grid data structure
    const gridData = useMemo(() => {
      const grid: Record<string, Record<string, HeatmapCell>> = {};
      data.forEach((cell) => {
        if (!grid[cell.y]) grid[cell.y] = {};
        grid[cell.y][cell.x] = cell;
      });
      return grid;
    }, [data]);

    // Color mapping function
    const getColor = useCallback(
      (value: number): string => {
        if (customColorMapping) return customColorMapping(value);
        return colorScales[colorScale].generate(value, min, max);
      },
      [colorScale, min, max, customColorMapping]
    );

    // Generate legend items
    const legendItems = useMemo((): HeatmapLegendItem[] => {
      const steps = 5;
      const range = max - min;
      const stepSize = range / (steps - 1);

      return Array.from({ length: steps }, (_, i) => {
        const value = min + i * stepSize;
        return {
          min: value,
          max: i < steps - 1 ? value + stepSize : value,
          color: getColor(value),
          label: value.toFixed(0),
        };
      });
    }, [min, max, getColor]);

    // Export handler
    const handleExport = useCallback(() => {
      // TODO: Implement export functionality
      console.log('Export heatmap');
    }, []);

    return (
      <Card
        ref={ref}
        className={cn(heatmapVariants({ variant, padding }), className)}
        {...props}
      >
        {/* Header */}
        {(title || description || enableExport) && (
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
        )}

        {/* Heatmap Grid */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* X-axis labels */}
            <div className="flex">
              {yAxisLabel && (
                <div className={cn('flex-shrink-0', cellSizeMap[cellSize])} />
              )}
              {xLabels.map((label) => (
                <div
                  key={label}
                  className={cn(
                    'flex items-center justify-center flex-shrink-0',
                    cellSizeMap[cellSize],
                    'text-xs font-medium text-neutral-700 dark:text-neutral-300'
                  )}
                >
                  <span className="truncate max-w-full px-1">{label}</span>
                </div>
              ))}
            </div>

            {/* Grid rows */}
            {yLabels.map((yLabel, rowIndex) => (
              <div key={yLabel} className="flex">
                {/* Y-axis label */}
                {yAxisLabel && (
                  <div
                    className={cn(
                      'flex items-center justify-end pr-2 flex-shrink-0',
                      cellSizeMap[cellSize],
                      'text-xs font-medium text-neutral-700 dark:text-neutral-300'
                    )}
                  >
                    <span className="truncate max-w-full">{yLabel}</span>
                  </div>
                )}

                {/* Cells */}
                {xLabels.map((xLabel, colIndex) => {
                  const cell = gridData[yLabel]?.[xLabel];
                  if (!cell) return <div key={xLabel} className={cellSizeMap[cellSize]} />;

                  return (
                    <motion.div
                      key={`${yLabel}-${xLabel}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: animationDuration / 1000,
                        delay: (rowIndex * xLabels.length + colIndex) * 0.01,
                      }}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      className={cn(
                        'relative flex items-center justify-center flex-shrink-0 cursor-pointer',
                        'border border-neutral-200 dark:border-neutral-700',
                        cellSizeMap[cellSize],
                        'transition-all duration-200'
                      )}
                      style={{
                        backgroundColor: getColor(cell.value),
                      }}
                      onClick={() => onCellClick?.(cell)}
                      onMouseEnter={() => showTooltips && setHoveredCell(cell)}
                      onMouseLeave={() => showTooltips && setHoveredCell(null)}
                      role="button"
                      aria-label={`${xAxisLabel || 'Column'}: ${xLabel}, ${
                        yAxisLabel || 'Row'
                      }: ${yLabel}, Value: ${cell.value}`}
                    >
                      {showValues && (
                        <span
                          className={cn(
                            'font-semibold',
                            // Adjust text color based on background lightness
                            cell.value > (max + min) / 2
                              ? 'text-white'
                              : 'text-neutral-900'
                          )}
                        >
                          {cell.value.toFixed(0)}
                        </span>
                      )}

                      {/* Tooltip */}
                      {showTooltips && hoveredCell === cell && (
                        <CustomTooltip
                          cell={cell}
                          xAxisLabel={xAxisLabel}
                          yAxisLabel={yAxisLabel}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
            {min.toFixed(0)}
          </span>
          <div className="flex gap-1">
            {legendItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-8 h-4 border border-neutral-300 dark:border-neutral-600"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            ))}
          </div>
          <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
            {max.toFixed(0)}
          </span>
        </div>
      </Card>
    );
  }
);

EpidemiologyHeatmap.displayName = 'EpidemiologyHeatmap';
