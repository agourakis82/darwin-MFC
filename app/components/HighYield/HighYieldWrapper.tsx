'use client';

import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store/appStore';
import { Zap, Star, AlertTriangle, Activity, Lightbulb } from 'lucide-react';
import type { HighYieldCategory } from '@/lib/types/evidence';
import type { ReactNode } from 'react';

interface HighYieldWrapperProps {
  children: ReactNode;
  isHighYield?: boolean;
  category?: HighYieldCategory;
  priority?: 1 | 2 | 3;
  className?: string;
  showIndicator?: boolean;
}

const categoryConfig: Record<
  HighYieldCategory,
  {
    icon: React.ElementType;
    color: string;
    bgColor: string;
    borderColor: string;
    label: string;
  }
> = {
  key_point: {
    icon: Star,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    borderColor: 'border-amber-200 dark:border-amber-800',
    label: 'Key Point',
  },
  critical_value: {
    icon: Activity,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-950/30',
    borderColor: 'border-red-200 dark:border-red-800',
    label: 'Critical Value',
  },
  red_flag: {
    icon: AlertTriangle,
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-50 dark:bg-rose-950/30',
    borderColor: 'border-rose-200 dark:border-rose-800',
    label: 'Red Flag',
  },
  quick_decision: {
    icon: Zap,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
    label: 'Quick Decision',
  },
  pearl: {
    icon: Lightbulb,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    borderColor: 'border-purple-200 dark:border-purple-800',
    label: 'Clinical Pearl',
  },
};

/**
 * Wrapper component that conditionally shows content based on High-Yield mode
 * 
 * Usage:
 * <HighYieldWrapper isHighYield category="key_point">
 *   <p>This is a key point that shows in high-yield mode</p>
 * </HighYieldWrapper>
 * 
 * <HighYieldWrapper>
 *   <p>This only shows in full mode</p>
 * </HighYieldWrapper>
 */
export function HighYieldWrapper({
  children,
  isHighYield = false,
  category,
  priority = 2,
  className,
  showIndicator = true,
}: HighYieldWrapperProps) {
  const viewMode = useAppStore((state) => state.viewMode);

  // In high-yield mode, only show high-yield content
  if (viewMode === 'high_yield' && !isHighYield) {
    return null;
  }

  // In print-friendly mode, show everything but with simplified styling
  if (viewMode === 'print_friendly') {
    return (
      <div className={cn('print:block', className)}>
        {children}
      </div>
    );
  }

  // In full mode, show everything with enhanced styling for high-yield items
  if (!isHighYield || !showIndicator) {
    return <div className={className}>{children}</div>;
  }

  // High-yield content with indicator
  const config = category ? categoryConfig[category] : categoryConfig.key_point;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'relative rounded-lg border-l-4 pl-4 py-2',
        config.borderColor,
        viewMode === 'full' && config.bgColor,
        priority === 1 && 'font-medium',
        className
      )}
    >
      {showIndicator && (
        <div
          className={cn(
            'absolute -left-3 top-2 flex items-center justify-center w-6 h-6 rounded-full',
            config.bgColor,
            config.color
          )}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * Inline high-yield marker for text content
 */
export function HighYieldMarker({
  category = 'key_point',
  children,
  className,
}: {
  category?: HighYieldCategory;
  children: ReactNode;
  className?: string;
}) {
  const viewMode = useAppStore((state) => state.viewMode);
  const config = categoryConfig[category];
  const Icon = config.icon;

  if (viewMode === 'print_friendly') {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-sm',
        config.bgColor,
        config.color,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {children}
    </span>
  );
}

/**
 * High-yield section divider
 */
export function HighYieldSection({
  title,
  category = 'key_point',
  children,
  className,
}: {
  title: string;
  category?: HighYieldCategory;
  children: ReactNode;
  className?: string;
}) {
  const viewMode = useAppStore((state) => state.viewMode);
  const config = categoryConfig[category];
  const Icon = config.icon;

  if (viewMode === 'print_friendly') {
    return (
      <section className={cn('mb-4', className)}>
        <h3 className="font-bold mb-2">{title}</h3>
        {children}
      </section>
    );
  }

  return (
    <section
      className={cn(
        'rounded-xl border p-4',
        config.borderColor,
        viewMode === 'high_yield' && config.bgColor,
        className
      )}
    >
      <h3
        className={cn(
          'flex items-center gap-2 font-semibold mb-3',
          config.color
        )}
      >
        <Icon className="w-5 h-5" />
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

/**
 * Hook to check if we should show high-yield content only
 */
export function useIsHighYieldMode(): boolean {
  const viewMode = useAppStore((state) => state.viewMode);
  return viewMode === 'high_yield';
}

/**
 * Hook to get current view mode
 */
export function useViewMode() {
  const viewMode = useAppStore((state) => state.viewMode);
  const setViewMode = useAppStore((state) => state.setViewMode);
  const toggleHighYieldMode = useAppStore((state) => state.toggleHighYieldMode);

  return {
    viewMode,
    isHighYield: viewMode === 'high_yield',
    isPrintFriendly: viewMode === 'print_friendly',
    isFull: viewMode === 'full',
    setViewMode,
    toggleHighYieldMode,
  };
}

export default HighYieldWrapper;
