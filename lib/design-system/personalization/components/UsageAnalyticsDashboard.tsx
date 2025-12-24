/**
 * USAGE ANALYTICS DASHBOARD
 * ==========================
 *
 * Visualizes user behavior patterns and usage statistics
 * Privacy-first analytics dashboard (100% local data)
 *
 * Features:
 * - Activity heatmap (hours/days)
 * - Category distribution chart
 * - Usage trends over time
 * - Top searches
 * - Session statistics
 * - Export analytics data
 */

'use client';

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import {
  BarChart3,
  Clock,
  Search,
  TrendingUp,
  Calendar,
  Download,
  Eye,
} from 'lucide-react';
import { Button } from '@/lib/design-system/primitives/button';
import { Card } from '@/lib/design-system/primitives/card';
import { useUserPreferences } from '../userPreferencesStore';
import { getSessionDuration } from '../usageTracker';

// ============================================================================
// TYPES
// ============================================================================

export interface UsageAnalyticsDashboardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardVariants> {
  title?: string;
  showHeatmap?: boolean;
  showCategoryChart?: boolean;
  showTrendChart?: boolean;
  showTopSearches?: boolean;
  compact?: boolean;
}

// ============================================================================
// VARIANTS
// ============================================================================

const dashboardVariants = cva(['relative w-full'], {
  variants: {
    variant: {
      default: '',
      card: 'p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ============================================================================
// STAT CARD
// ============================================================================

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    label: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  description,
  trend,
}) => {
  return (
    <Card variant="outline" padding="md" className="h-full">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-brand-primary-100 dark:bg-brand-primary-900/30">
          {icon}
        </div>
        {trend && (
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-medium',
              trend.value > 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            )}
          >
            <TrendingUp className="w-3 h-3" />
            {trend.value > 0 ? '+' : ''}
            {trend.value}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
        {value}
      </p>
      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        {label}
      </p>
      {description && (
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      )}
    </Card>
  );
};

// ============================================================================
// COLORS
// ============================================================================

const CHART_COLORS = [
  'hsl(221 83% 53%)', // Blue
  'hsl(142 71% 45%)', // Green
  'hsl(271 81% 56%)', // Purple
  'hsl(38 92% 50%)', // Amber
  'hsl(173 58% 39%)', // Teal
  'hsl(0 84% 60%)', // Red
  'hsl(280 87% 65%)', // Pink
  'hsl(24 95% 53%)', // Orange
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const UsageAnalyticsDashboard = React.forwardRef<
  HTMLDivElement,
  UsageAnalyticsDashboardProps
>(
  (
    {
      title = 'Your Usage Analytics',
      showHeatmap = true,
      showCategoryChart = true,
      showTrendChart = true,
      showTopSearches = true,
      compact = false,
      variant,
      className,
      ...props
    },
    ref
  ) => {
    const interactions = useUserPreferences((state) => state.interactions);
    const contentPreferences = useUserPreferences((state) => state.contentPreferences);
    const usagePattern = useUserPreferences((state) => state.usagePattern);
    const shortcuts = useUserPreferences((state) => state.shortcuts);

    // Calculate statistics
    const stats = useMemo(() => {
      const totalInteractions = interactions.length;
      const uniqueCategories = Object.keys(contentPreferences).length;
      const totalShortcuts = shortcuts.length;
      const sessionDuration = getSessionDuration();

      return {
        totalInteractions,
        uniqueCategories,
        totalShortcuts,
        sessionDuration,
      };
    }, [interactions, contentPreferences, shortcuts]);

    // Activity heatmap data (hours of day)
    const activityHeatmapData = useMemo(() => {
      const hours = Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        label: `${i}:00`,
        count: 0,
      }));

      interactions.forEach((interaction) => {
        const hour = new Date(interaction.timestamp).getHours();
        hours[hour].count += 1;
      });

      return hours;
    }, [interactions]);

    // Category distribution for pie chart
    const categoryDistributionData = useMemo(() => {
      return Object.entries(contentPreferences)
        .map(([category, pref]) => ({
          name: category,
          value: pref.viewCount,
          score: pref.score,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8); // Top 8 categories
    }, [contentPreferences]);

    // Interaction trend over last 7 days
    const trendData = useMemo(() => {
      const days = 7;
      const now = Date.now();
      const dayData = Array.from({ length: days }, (_, i) => {
        const date = new Date(now - (days - 1 - i) * 24 * 60 * 60 * 1000);
        return {
          date: date.toLocaleDateString('en-US', { weekday: 'short' }),
          interactions: 0,
        };
      });

      interactions.forEach((interaction) => {
        const daysAgo = Math.floor((now - interaction.timestamp) / (1000 * 60 * 60 * 24));
        if (daysAgo < days) {
          dayData[days - 1 - daysAgo].interactions += 1;
        }
      });

      return dayData;
    }, [interactions]);

    // Top searches
    const topSearches = useMemo(() => {
      const searchCounts: Record<string, number> = {};

      interactions
        .filter((i) => i.type === 'search')
        .forEach((i) => {
          const query = i.itemTitle || i.itemId;
          searchCounts[query] = (searchCounts[query] || 0) + 1;
        });

      return Object.entries(searchCounts)
        .map(([query, count]) => ({ query, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    }, [interactions]);

    // Export handler
    const handleExport = () => {
      const data = {
        stats,
        activityPattern: usagePattern,
        categoryDistribution: categoryDistributionData,
        topSearches,
        exportedAt: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `usage-analytics-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    };

    return (
      <div
        ref={ref}
        className={cn(dashboardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            iconBefore={<Download className="w-4 h-4" />}
          >
            Export
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<Eye className="w-5 h-5 text-brand-primary-600" />}
            label="Total Interactions"
            value={stats.totalInteractions}
            description="All your activities"
          />
          <StatCard
            icon={<BarChart3 className="w-5 h-5 text-brand-primary-600" />}
            label="Categories Explored"
            value={stats.uniqueCategories}
            description="Different content types"
          />
          <StatCard
            icon={<Search className="w-5 h-5 text-brand-primary-600" />}
            label="Shortcuts Created"
            value={stats.totalShortcuts}
            description="Frequently accessed items"
          />
          <StatCard
            icon={<Clock className="w-5 h-5 text-brand-primary-600" />}
            label="Session Duration"
            value={`${stats.sessionDuration}m`}
            description="Current session"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Heatmap */}
          {showHeatmap && (
            <Card variant="outline" padding="md">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Activity by Hour
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={activityHeatmapData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--neutral-200))" />
                  <XAxis
                    dataKey="label"
                    stroke="hsl(var(--neutral-600))"
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis stroke="hsl(var(--neutral-600))" tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--neutral-900))',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="hsl(221 83% 53%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          )}

          {/* Category Distribution */}
          {showCategoryChart && categoryDistributionData.length > 0 && (
            <Card variant="outline" padding="md">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Category Distribution
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={(entry) => entry.name}
                  >
                    {categoryDistributionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          )}

          {/* Trend Chart */}
          {showTrendChart && (
            <Card variant="outline" padding="md">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                7-Day Activity Trend
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--neutral-200))" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--neutral-600))"
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis stroke="hsl(var(--neutral-600))" tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--neutral-900))',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="interactions"
                    stroke="hsl(142 71% 45%)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          )}

          {/* Top Searches */}
          {showTopSearches && topSearches.length > 0 && (
            <Card variant="outline" padding="md">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Top Searches
              </h4>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {topSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded bg-neutral-50 dark:bg-neutral-800/50"
                  >
                    <span className="text-sm text-neutral-900 dark:text-neutral-100 truncate">
                      {search.query}
                    </span>
                    <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400 ml-2 flex-shrink-0">
                      {search.count}x
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Most Active Times */}
        {usagePattern.mostActiveHours.length > 0 && (
          <Card variant="outline" padding="md" className="mt-6">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
              Your Peak Activity Times
            </h4>
            <div className="flex flex-wrap gap-2">
              {usagePattern.mostActiveHours.map((hour) => (
                <span
                  key={hour}
                  className="px-3 py-1 rounded-full bg-brand-primary-100 dark:bg-brand-primary-900/30 text-brand-primary-700 dark:text-brand-primary-300 text-sm font-medium"
                >
                  {hour}:00 - {hour + 1}:00
                </span>
              ))}
            </div>
          </Card>
        )}
      </div>
    );
  }
);

UsageAnalyticsDashboard.displayName = 'UsageAnalyticsDashboard';
