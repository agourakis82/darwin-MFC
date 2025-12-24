/**
 * INTERACTIVE CLINICAL TIMELINE
 * ==============================
 *
 * Advanced timeline visualization for patient journeys, medication tracking,
 * and symptom progression with Recharts integration
 *
 * Features:
 * - Responsive timeline with zoom/pan
 * - Medication timeline overlay
 * - Symptom progression tracking
 * - Interactive hover states with custom tooltips
 * - Animated data transitions
 * - Export functionality (PNG/SVG)
 */

'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
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
  ReferenceArea,
  ReferenceLine,
  Brush,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import {
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Calendar,
  Activity,
  Pill,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../../primitives/button';
import { Card } from '../../primitives/card';

// ============================================================================
// TYPES
// ============================================================================

export interface TimelineDataPoint {
  date: string;
  timestamp: number;
  symptoms?: Record<string, number>; // Symptom severity 0-10
  vitals?: Record<string, number>; // BP, HR, temp, etc.
  medications?: TimelineMedication[];
  events?: TimelineEvent[];
}

export interface TimelineMedication {
  name: string;
  dose: string;
  time: string;
  type: 'started' | 'ongoing' | 'stopped';
  color?: string;
}

export interface TimelineEvent {
  type: 'visit' | 'procedure' | 'diagnosis' | 'alert' | 'milestone';
  label: string;
  description?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export interface InteractiveClinicalTimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  data: TimelineDataPoint[];
  title?: string;
  description?: string;
  height?: number;
  showMedications?: boolean;
  showSymptoms?: boolean;
  showVitals?: boolean;
  showEvents?: boolean;
  enableZoom?: boolean;
  enableExport?: boolean;
  animationDuration?: number;
  colorScheme?: 'clinical' | 'brand' | 'minimal';
  onDataPointClick?: (dataPoint: TimelineDataPoint) => void;
  onDateRangeChange?: (startDate: string, endDate: string) => void;
}

// ============================================================================
// VARIANTS
// ============================================================================

const timelineVariants = cva(['relative w-full'], {
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
// COLOR SCHEMES
// ============================================================================

const colorSchemes = {
  clinical: {
    critical: 'hsl(0 84% 60%)',
    warning: 'hsl(38 92% 50%)',
    safe: 'hsl(142 71% 45%)',
    info: 'hsl(221 83% 53%)',
    medication: 'hsl(271 81% 56%)',
  },
  brand: {
    primary: 'hsl(221 83% 53%)',
    secondary: 'hsl(262 83% 58%)',
    accent: 'hsl(142 76% 36%)',
    muted: 'hsl(210 40% 96%)',
  },
  minimal: {
    line1: 'hsl(210 100% 50%)',
    line2: 'hsl(160 100% 40%)',
    line3: 'hsl(290 100% 50%)',
    line4: 'hsl(30 100% 50%)',
  },
};

// ============================================================================
// CUSTOM TOOLTIP
// ============================================================================

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  colorScheme: keyof typeof colorSchemes;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  colorScheme,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={cn(
        'rounded-lg border border-neutral-200 dark:border-neutral-700',
        'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md',
        'p-4 shadow-lg'
      )}
    >
      <p className="text-sm font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
        {label}
      </p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-sm mb-1">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-neutral-600 dark:text-neutral-400">
            {entry.name}:
          </span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const InteractiveClinicalTimeline = React.forwardRef<
  HTMLDivElement,
  InteractiveClinicalTimelineProps
>(
  (
    {
      data,
      title,
      description,
      height = 400,
      showMedications = true,
      showSymptoms = true,
      showVitals = true,
      showEvents = true,
      enableZoom = true,
      enableExport = true,
      animationDuration = 1000,
      colorScheme = 'clinical',
      onDataPointClick,
      onDateRangeChange,
      variant,
      padding,
      className,
      ...props
    },
    ref
  ) => {
    // State
    const [zoomDomain, setZoomDomain] = useState<[number, number] | null>(null);
    const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
      'symptoms',
      'vitals',
    ]);
    const [hoveredPoint, setHoveredPoint] = useState<TimelineDataPoint | null>(null);

    // Memoized data transformations
    const chartData = useMemo(() => {
      return data.map((point) => ({
        ...point,
        date: new Date(point.timestamp).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
        }),
        // Flatten symptoms for chart
        ...(point.symptoms || {}),
        // Flatten vitals for chart
        ...(point.vitals || {}),
      }));
    }, [data]);

    const symptomKeys = useMemo(() => {
      if (!showSymptoms) return [];
      const keys = new Set<string>();
      data.forEach((point) => {
        if (point.symptoms) {
          Object.keys(point.symptoms).forEach((key) => keys.add(key));
        }
      });
      return Array.from(keys);
    }, [data, showSymptoms]);

    const vitalKeys = useMemo(() => {
      if (!showVitals) return [];
      const keys = new Set<string>();
      data.forEach((point) => {
        if (point.vitals) {
          Object.keys(point.vitals).forEach((key) => keys.add(key));
        }
      });
      return Array.from(keys);
    }, [data, showVitals]);

    const colors = colorSchemes[colorScheme];

    // Zoom handlers
    const handleZoomIn = useCallback(() => {
      if (chartData.length === 0) return;
      const currentStart = zoomDomain?.[0] ?? 0;
      const currentEnd = zoomDomain?.[1] ?? chartData.length - 1;
      const range = currentEnd - currentStart;
      const newRange = Math.max(range * 0.7, 5);
      const center = (currentStart + currentEnd) / 2;
      setZoomDomain([
        Math.max(0, center - newRange / 2),
        Math.min(chartData.length - 1, center + newRange / 2),
      ]);
    }, [chartData.length, zoomDomain]);

    const handleZoomOut = useCallback(() => {
      if (chartData.length === 0) return;
      const currentStart = zoomDomain?.[0] ?? 0;
      const currentEnd = zoomDomain?.[1] ?? chartData.length - 1;
      const range = currentEnd - currentStart;
      const newRange = Math.min(range * 1.3, chartData.length);
      const center = (currentStart + currentEnd) / 2;
      setZoomDomain([
        Math.max(0, center - newRange / 2),
        Math.min(chartData.length - 1, center + newRange / 2),
      ]);
    }, [chartData.length, zoomDomain]);

    const handleResetZoom = useCallback(() => {
      setZoomDomain(null);
      onDateRangeChange?.(data[0]?.date, data[data.length - 1]?.date);
    }, [data, onDateRangeChange]);

    // Export handlers
    const handleExportPNG = useCallback(() => {
      // TODO: Implement PNG export using html2canvas or similar
      console.log('Export PNG triggered');
    }, []);

    const handleExportSVG = useCallback(() => {
      // TODO: Implement SVG export
      console.log('Export SVG triggered');
    }, []);

    // Render events as reference lines
    const eventReferences = useMemo(() => {
      if (!showEvents) return [];
      return data
        .filter((point) => point.events && point.events.length > 0)
        .map((point, index) => ({
          timestamp: point.timestamp,
          events: point.events!,
        }));
    }, [data, showEvents]);

    return (
      <Card ref={ref} className={cn(timelineVariants({ variant, padding }), className)} {...props}>
        {/* Header */}
        {(title || description || enableZoom || enableExport) && (
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
              {enableZoom && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleZoomIn}
                    aria-label="Zoom in"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleZoomOut}
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleResetZoom}
                    aria-label="Reset zoom"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </>
              )}
              {enableExport && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportPNG}
                  iconBefore={<Download className="w-4 h-4" />}
                >
                  Export
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Chart */}
        <ResponsiveContainer width="100%" height={height}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            onClick={(e: any) => {
              if (e && e.activePayload && e.activePayload[0]) {
                const point = data.find(
                  (p) => p.timestamp === e.activePayload[0].payload.timestamp
                );
                if (point) onDataPointClick?.(point);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--neutral-200))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--neutral-600))"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="hsl(var(--neutral-600))"
              tick={{ fontSize: 12 }}
              domain={[0, 10]}
            />
            <Tooltip
              content={<CustomTooltip colorScheme={colorScheme} />}
              cursor={{ stroke: 'hsl(var(--neutral-300))', strokeWidth: 1 }}
            />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              iconType="line"
              verticalAlign="top"
              height={36}
            />

            {/* Symptom lines */}
            {symptomKeys.map((key, index) => (
              <Line
                key={`symptom-${key}`}
                type="monotone"
                dataKey={key}
                stroke={Object.values(colors)[index % Object.values(colors).length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={animationDuration}
                name={key}
              />
            ))}

            {/* Vital lines */}
            {vitalKeys.map((key, index) => (
              <Line
                key={`vital-${key}`}
                type="monotone"
                dataKey={key}
                stroke={
                  Object.values(colors)[
                    (index + symptomKeys.length) % Object.values(colors).length
                  ]
                }
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={animationDuration}
                name={key}
              />
            ))}

            {/* Event reference lines */}
            {eventReferences.map((ref, index) => {
              const dataIndex = chartData.findIndex(
                (d) => d.timestamp === ref.timestamp
              );
              if (dataIndex === -1) return null;

              return (
                <ReferenceLine
                  key={`event-${index}`}
                  x={chartData[dataIndex].date}
                  stroke={(colors as any).critical || 'red'}
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  label={{
                    value: ref.events[0].label,
                    position: 'top',
                    fontSize: 10,
                  }}
                />
              );
            })}

            {/* Brush for zooming */}
            {enableZoom && (
              <Brush
                dataKey="date"
                height={30}
                stroke="hsl(var(--brand-primary-500))"
                startIndex={zoomDomain?.[0] ?? undefined}
                endIndex={zoomDomain?.[1] ?? undefined}
                onChange={(range: any) => {
                  if (range.startIndex !== undefined && range.endIndex !== undefined) {
                    setZoomDomain([range.startIndex, range.endIndex]);
                    onDateRangeChange?.(
                      data[range.startIndex]?.date,
                      data[range.endIndex]?.date
                    );
                  }
                }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>

        {/* Medication timeline overlay */}
        {showMedications && (
          <div className="mt-4 border-t border-neutral-200 dark:border-neutral-800 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Pill className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                Medication Timeline
              </span>
            </div>
            <div className="space-y-2">
              {data
                .filter((point) => point.medications && point.medications.length > 0)
                .map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="text-neutral-600 dark:text-neutral-400 min-w-[80px]">
                      {new Date(point.timestamp).toLocaleDateString('pt-BR')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {point.medications!.map((med, medIndex) => (
                        <span
                          key={medIndex}
                          className={cn(
                            'px-2 py-1 rounded text-xs',
                            med.type === 'started' &&
                              'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
                            med.type === 'ongoing' &&
                              'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
                            med.type === 'stopped' &&
                              'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                          )}
                        >
                          {med.name} ({med.dose})
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </Card>
    );
  }
);

InteractiveClinicalTimeline.displayName = 'InteractiveClinicalTimeline';
