/**
 * CLINICAL CHART BASE COMPONENT
 * ==============================
 *
 * Enhanced wrapper around Recharts with clinical features
 * Provides consistent styling, reference ranges, and export functionality
 *
 * Features:
 * - Reference ranges (normal, borderline, abnormal)
 * - Clinical thresholds with color coding
 * - Export to PNG/SVG/CSV
 * - Responsive container
 * - Loading and empty states
 * - Accessibility features
 * - Print-friendly styling
 */

'use client';

import React, { useCallback, useRef } from 'react';
import { ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import { Download, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../../primitives/button';
import { Card } from '../../primitives/card';

// ============================================================================
// TYPES
// ============================================================================

export interface ReferenceRange {
  label: string;
  min?: number;
  max?: number;
  value?: number; // For single threshold lines
  color: string;
  severity?: 'critical' | 'warning' | 'normal' | 'optimal';
  description?: string;
}

export interface ClinicalChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chartVariants> {
  title?: string;
  description?: string;
  subtitle?: string;
  height?: number;
  minHeight?: number;
  loading?: boolean;
  error?: string | null;
  empty?: boolean;
  emptyMessage?: string;
  showExport?: boolean;
  referenceRanges?: ReferenceRange[];
  footer?: React.ReactNode;
  actions?: React.ReactNode;
  onExportPNG?: () => void;
  onExportSVG?: () => void;
  onExportCSV?: () => void;
  children: React.ReactNode;
}

// ============================================================================
// VARIANTS
// ============================================================================

const chartVariants = cva(['relative w-full'], {
  variants: {
    variant: {
      default: 'bg-white dark:bg-neutral-900',
      bordered: 'border border-neutral-200 dark:border-neutral-800',
      glass: 'bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md',
      clinical: 'border-2 border-clinical-info-base bg-clinical-info-base/5',
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
// LOADING STATE
// ============================================================================

const LoadingState: React.FC<{ height: number }> = ({ height }) => (
  <div
    className="flex flex-col items-center justify-center gap-3"
    style={{ height }}
  >
    <Loader2 className="w-8 h-8 animate-spin text-brand-primary-500" />
    <p className="text-sm text-neutral-600 dark:text-neutral-400">
      Loading chart data...
    </p>
  </div>
);

// ============================================================================
// ERROR STATE
// ============================================================================

const ErrorState: React.FC<{ height: number; message: string }> = ({
  height,
  message,
}) => (
  <div
    className="flex flex-col items-center justify-center gap-3"
    style={{ height }}
  >
    <AlertCircle className="w-8 h-8 text-clinical-critical-base" />
    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
      Error loading chart
    </p>
    <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md text-center">
      {message}
    </p>
  </div>
);

// ============================================================================
// EMPTY STATE
// ============================================================================

const EmptyState: React.FC<{ height: number; message: string }> = ({
  height,
  message,
}) => (
  <div
    className="flex flex-col items-center justify-center gap-3"
    style={{ height }}
  >
    <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
      <AlertCircle className="w-8 h-8 text-neutral-400" />
    </div>
    <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md text-center">
      {message}
    </p>
  </div>
);

// ============================================================================
// REFERENCE RANGES LEGEND
// ============================================================================

const ReferenceRangesLegend: React.FC<{ ranges: ReferenceRange[] }> = ({
  ranges,
}) => {
  if (!ranges || ranges.length === 0) return null;

  return (
    <div className="mt-6 border-t border-neutral-200 dark:border-neutral-800 pt-4">
      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">
        Reference Ranges
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ranges.map((range, index) => (
          <div key={index} className="flex items-start gap-3">
            <div
              className="w-4 h-4 rounded mt-0.5 flex-shrink-0"
              style={{ backgroundColor: range.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {range.label}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {range.min !== undefined && range.max !== undefined
                  ? `${range.min} - ${range.max}`
                  : range.value !== undefined
                  ? `Threshold: ${range.value}`
                  : 'N/A'}
              </p>
              {range.description && (
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                  {range.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ClinicalChart = React.forwardRef<HTMLDivElement, ClinicalChartProps>(
  (
    {
      title,
      description,
      subtitle,
      height = 400,
      minHeight,
      loading = false,
      error = null,
      empty = false,
      emptyMessage = 'No data available',
      showExport = true,
      referenceRanges,
      footer,
      actions,
      onExportPNG,
      onExportSVG,
      onExportCSV,
      children,
      variant,
      padding,
      className,
      ...props
    },
    ref
  ) => {
    const chartRef = useRef<HTMLDivElement>(null);

    // Export handlers
    const handleExportPNG = useCallback(() => {
      if (onExportPNG) {
        onExportPNG();
      } else {
        // TODO: Default PNG export using html2canvas
        console.log('Export PNG');
      }
    }, [onExportPNG]);

    const handleExportSVG = useCallback(() => {
      if (onExportSVG) {
        onExportSVG();
      } else {
        // TODO: Default SVG export
        console.log('Export SVG');
      }
    }, [onExportSVG]);

    const handleExportCSV = useCallback(() => {
      if (onExportCSV) {
        onExportCSV();
      } else {
        // TODO: Default CSV export
        console.log('Export CSV');
      }
    }, [onExportCSV]);

    return (
      <Card
        ref={ref}
        className={cn(chartVariants({ variant, padding }), className)}
        {...props}
      >
        {/* Header */}
        {(title || description || subtitle || showExport || actions) && (
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1 truncate">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  {subtitle}
                </p>
              )}
              {description && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {description}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-4">
              {actions}
              {showExport && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportPNG}
                    iconBefore={<Download className="w-4 h-4" />}
                  >
                    PNG
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportSVG}
                    iconBefore={<Download className="w-4 h-4" />}
                  >
                    SVG
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportCSV}
                    iconBefore={<Download className="w-4 h-4" />}
                  >
                    CSV
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chart Content */}
        <div
          ref={chartRef}
          className="w-full print:bg-white"
          style={{ minHeight: minHeight || height }}
        >
          {loading ? (
            <LoadingState height={height} />
          ) : error ? (
            <ErrorState height={height} message={error} />
          ) : empty ? (
            <EmptyState height={height} message={emptyMessage} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <ResponsiveContainer width="100%" height={height}>
                {children}
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>

        {/* Reference Ranges Legend */}
        {!loading && !error && !empty && referenceRanges && (
          <ReferenceRangesLegend ranges={referenceRanges} />
        )}

        {/* Footer */}
        {!loading && !error && !empty && footer && (
          <div className="mt-6 border-t border-neutral-200 dark:border-neutral-800 pt-4">
            {footer}
          </div>
        )}
      </Card>
    );
  }
);

ClinicalChart.displayName = 'ClinicalChart';

// ============================================================================
// CLINICAL COLOR HELPERS
// ============================================================================

export const clinicalColors = {
  critical: 'hsl(0 84% 60%)',
  warning: 'hsl(38 92% 50%)',
  normal: 'hsl(221 83% 53%)',
  optimal: 'hsl(142 71% 45%)',
  info: 'hsl(173 58% 39%)',
};

export function getClinicalColor(
  value: number,
  ranges: ReferenceRange[]
): string {
  for (const range of ranges) {
    if (range.min !== undefined && range.max !== undefined) {
      if (value >= range.min && value <= range.max) {
        return range.color;
      }
    } else if (range.value !== undefined) {
      if (value >= range.value) {
        return range.color;
      }
    }
  }
  return clinicalColors.normal;
}

// ============================================================================
// COMMON REFERENCE RANGES
// ============================================================================

export const commonReferenceRanges = {
  bloodPressure: {
    systolic: [
      {
        label: 'Normal',
        min: 90,
        max: 120,
        color: clinicalColors.optimal,
        severity: 'normal' as const,
      },
      {
        label: 'Elevated',
        min: 120,
        max: 129,
        color: clinicalColors.warning,
        severity: 'warning' as const,
      },
      {
        label: 'Hypertension',
        min: 130,
        max: 180,
        color: clinicalColors.critical,
        severity: 'critical' as const,
      },
    ],
    diastolic: [
      {
        label: 'Normal',
        min: 60,
        max: 80,
        color: clinicalColors.optimal,
        severity: 'normal' as const,
      },
      {
        label: 'Hypertension',
        min: 80,
        max: 120,
        color: clinicalColors.critical,
        severity: 'critical' as const,
      },
    ],
  },
  glucose: [
    {
      label: 'Normal',
      min: 70,
      max: 100,
      color: clinicalColors.optimal,
      severity: 'normal' as const,
    },
    {
      label: 'Prediabetes',
      min: 100,
      max: 126,
      color: clinicalColors.warning,
      severity: 'warning' as const,
    },
    {
      label: 'Diabetes',
      min: 126,
      max: 400,
      color: clinicalColors.critical,
      severity: 'critical' as const,
    },
  ],
  cholesterol: {
    total: [
      {
        label: 'Desirable',
        min: 0,
        max: 200,
        color: clinicalColors.optimal,
        severity: 'optimal' as const,
      },
      {
        label: 'Borderline High',
        min: 200,
        max: 239,
        color: clinicalColors.warning,
        severity: 'warning' as const,
      },
      {
        label: 'High',
        min: 240,
        max: 500,
        color: clinicalColors.critical,
        severity: 'critical' as const,
      },
    ],
    ldl: [
      {
        label: 'Optimal',
        min: 0,
        max: 100,
        color: clinicalColors.optimal,
        severity: 'optimal' as const,
      },
      {
        label: 'Near Optimal',
        min: 100,
        max: 129,
        color: clinicalColors.normal,
        severity: 'normal' as const,
      },
      {
        label: 'Borderline High',
        min: 130,
        max: 159,
        color: clinicalColors.warning,
        severity: 'warning' as const,
      },
      {
        label: 'High',
        min: 160,
        max: 400,
        color: clinicalColors.critical,
        severity: 'critical' as const,
      },
    ],
  },
};
