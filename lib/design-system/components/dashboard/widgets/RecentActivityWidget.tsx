/**
 * RECENT ACTIVITY WIDGET
 * =======================
 *
 * Timeline display of recent user activities and system events
 * Useful for dashboards to show recent interactions
 *
 * Features:
 * - Chronological activity timeline
 * - Activity type icons and colors
 * - Relative timestamps
 * - Clickable activity items
 * - Grouped by date
 * - Infinite scroll support
 * - Loading states
 */

'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import {
  FileText,
  User,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Pill,
  Activity,
  Search,
  BookOpen,
  LucideIcon,
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

export type ActivityType =
  | 'view'
  | 'create'
  | 'update'
  | 'delete'
  | 'search'
  | 'favorite'
  | 'note'
  | 'medication'
  | 'protocol'
  | 'info';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
  icon?: LucideIcon;
  color?: string;
}

export interface RecentActivityWidgetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof activityVariants> {
  activities: ActivityItem[];
  maxItems?: number;
  showTimestamps?: boolean;
  showIcons?: boolean;
  groupByDate?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  onActivityClick?: (activity: ActivityItem) => void;
  onLoadMore?: () => void;
}

// ============================================================================
// VARIANTS
// ============================================================================

const activityVariants = cva(['relative w-full'], {
  variants: {
    variant: {
      default: '',
      compact: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ============================================================================
// ACTIVITY TYPE CONFIG
// ============================================================================

const activityConfig: Record<
  ActivityType,
  { icon: LucideIcon; color: string; bgColor: string }
> = {
  view: {
    icon: BookOpen,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  create: {
    icon: FileText,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
  update: {
    icon: CheckCircle,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
  },
  delete: {
    icon: AlertCircle,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
  },
  search: {
    icon: Search,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
  },
  favorite: {
    icon: Activity,
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-100 dark:bg-pink-900/30',
  },
  note: {
    icon: FileText,
    color: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-100 dark:bg-teal-900/30',
  },
  medication: {
    icon: Pill,
    color: 'text-violet-600 dark:text-violet-400',
    bgColor: 'bg-violet-100 dark:bg-violet-900/30',
  },
  protocol: {
    icon: BookOpen,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  info: {
    icon: Info,
    color: 'text-neutral-600 dark:text-neutral-400',
    bgColor: 'bg-neutral-100 dark:bg-neutral-800',
  },
};

// ============================================================================
// RELATIVE TIME FORMATTER
// ============================================================================

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;

  return date.toLocaleDateString();
}

// ============================================================================
// GROUP ACTIVITIES BY DATE
// ============================================================================

function groupActivitiesByDate(
  activities: ActivityItem[]
): Map<string, ActivityItem[]> {
  const groups = new Map<string, ActivityItem[]>();

  activities.forEach((activity) => {
    const dateKey = activity.timestamp.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    if (!groups.has(dateKey)) {
      groups.set(dateKey, []);
    }
    groups.get(dateKey)!.push(activity);
  });

  return groups;
}

// ============================================================================
// ACTIVITY ITEM COMPONENT
// ============================================================================

interface ActivityItemComponentProps {
  activity: ActivityItem;
  showIcon: boolean;
  showTimestamp: boolean;
  onClick?: () => void;
}

const ActivityItemComponent: React.FC<ActivityItemComponentProps> = ({
  activity,
  showIcon,
  showTimestamp,
  onClick,
}) => {
  const config = activityConfig[activity.type];
  const Icon = activity.icon || config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={onClick ? { x: 4 } : undefined}
      className={cn(
        'flex gap-3 p-3 rounded-lg transition-colors',
        onClick && 'cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
      )}
      onClick={onClick}
    >
      {/* Icon */}
      {showIcon && (
        <div className={cn('flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center', config.bgColor)}>
          <Icon className={cn('w-4 h-4', config.color)} />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
          {activity.title}
        </p>
        {activity.description && (
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 line-clamp-2">
            {activity.description}
          </p>
        )}
        {showTimestamp && (
          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {getRelativeTime(activity.timestamp)}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const RecentActivityWidget = React.forwardRef<
  HTMLDivElement,
  RecentActivityWidgetProps
>(
  (
    {
      activities,
      maxItems = 10,
      showTimestamps = true,
      showIcons = true,
      groupByDate = false,
      loading = false,
      emptyMessage = 'No recent activity',
      onActivityClick,
      onLoadMore,
      variant,
      className,
      ...props
    },
    ref
  ) => {
    // Limit activities
    const displayedActivities = useMemo(
      () => activities.slice(0, maxItems),
      [activities, maxItems]
    );

    // Group activities if needed
    const groupedActivities = useMemo(() => {
      if (!groupByDate) return null;
      return groupActivitiesByDate(displayedActivities);
    }, [displayedActivities, groupByDate]);

    // Loading state
    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(activityVariants({ variant }), className)}
          {...props}
        >
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-3 p-3">
                <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Empty state
    if (displayedActivities.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(activityVariants({ variant }), className)}
          {...props}
        >
          <div className="flex flex-col items-center justify-center py-12">
            <Activity className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mb-3" />
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {emptyMessage}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(activityVariants({ variant }), className)}
        {...props}
      >
        <div className="space-y-2">
          {groupByDate && groupedActivities ? (
            // Grouped by date
            Array.from(groupedActivities.entries()).map(([date, items]) => (
              <div key={date} className="space-y-1">
                <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-500 px-3 pt-2 sticky top-0 bg-white dark:bg-neutral-900">
                  {date}
                </p>
                <AnimatePresence>
                  {items.map((activity) => (
                    <ActivityItemComponent
                      key={activity.id}
                      activity={activity}
                      showIcon={showIcons}
                      showTimestamp={showTimestamps}
                      onClick={
                        onActivityClick ? () => onActivityClick(activity) : undefined
                      }
                    />
                  ))}
                </AnimatePresence>
              </div>
            ))
          ) : (
            // Ungrouped
            <AnimatePresence>
              {displayedActivities.map((activity) => (
                <ActivityItemComponent
                  key={activity.id}
                  activity={activity}
                  showIcon={showIcons}
                  showTimestamp={showTimestamps}
                  onClick={
                    onActivityClick ? () => onActivityClick(activity) : undefined
                  }
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Load More */}
        {onLoadMore && activities.length > maxItems && (
          <div className="mt-4 text-center">
            <button
              onClick={onLoadMore}
              className="text-sm text-brand-primary-600 hover:text-brand-primary-700 dark:text-brand-primary-400 dark:hover:text-brand-primary-300 font-medium"
            >
              Load more activities
            </button>
          </div>
        )}
      </div>
    );
  }
);

RecentActivityWidget.displayName = 'RecentActivityWidget';
