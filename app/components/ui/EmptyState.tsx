'use client';

import * as React from 'react';
import { Search, AlertCircle, Wifi, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

export type EmptyStateVariant = 'no-results' | 'no-data' | 'error' | 'offline';

export interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const iconMap = {
  'no-results': Search,
  'no-data': Package,
  error: AlertCircle,
  offline: Wifi,
};

const colorMap = {
  'no-results': 'text-neutral-400',
  'no-data': 'text-neutral-400',
  error: 'text-danger',
  offline: 'text-warning',
};

/**
 * EmptyState Component - Friendly message when no data is available
 *
 * Variants:
 * - no-results: When search returns no matches
 * - no-data: When list is empty initially
 * - error: When an error occurred
 * - offline: When network is unavailable
 *
 * @example
 * <EmptyState
 *   variant="no-results"
 *   title="No medications found"
 *   description="Try adjusting your search filters"
 *   action={{
 *     label: "Clear filters",
 *     onClick: handleClear
 *   }}
 * />
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      variant = 'no-data',
      title,
      description,
      icon,
      action,
      secondaryAction,
      className,
      size = 'md',
    },
    ref
  ) => {
    const DefaultIcon = iconMap[variant];

    const sizeClasses = {
      sm: {
        container: 'py-8 px-4',
        icon: 'h-8 w-8',
        title: 'text-lg',
        description: 'text-sm',
      },
      md: {
        container: 'py-12 px-6',
        icon: 'h-12 w-12',
        title: 'text-xl',
        description: 'text-base',
      },
      lg: {
        container: 'py-16 px-8',
        icon: 'h-16 w-16',
        title: 'text-2xl',
        description: 'text-lg',
      },
    };

    const sizes = sizeClasses[size];

    return (
      <div
        ref={ref}
        className={cn(
          // Layout
          'flex flex-col items-center justify-center',
          sizes.container,
          // Styling
          'rounded-lg border border-neutral-700/50',
          'bg-neutral-800/25',
          className
        )}
      >
        {/* Icon */}
        {icon ? (
          <div className={cn('mb-4', sizes.icon)}>
            {React.isValidElement(icon) ? icon : null}
          </div>
        ) : (
          <DefaultIcon
            className={cn(
              'mb-4',
              sizes.icon,
              colorMap[variant],
              'opacity-50'
            )}
          />
        )}

        {/* Title */}
        <h3
          className={cn(
            'font-semibold text-neutral-100 text-center',
            sizes.title,
            'mb-2'
          )}
        >
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className={cn('text-neutral-400 text-center max-w-sm', sizes.description, 'mb-6')}>
            {description}
          </p>
        )}

        {/* Actions */}
        {(action || secondaryAction) && (
          <div className="flex gap-3 justify-center">
            {action && (
              <Button
                onClick={action.onClick}
                variant="primary"
                size="sm"
              >
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                onClick={secondaryAction.onClick}
                variant="ghost"
                size="sm"
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
);
EmptyState.displayName = 'EmptyState';

export default EmptyState;
