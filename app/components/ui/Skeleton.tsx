'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animated?: boolean;
}

export function Skeleton({
  className,
  variant = 'default',
  width,
  height,
  lines = 1,
  animated = true,
}: SkeletonProps) {
  const baseClasses = animated ? 'skeleton' : 'skeleton-pulse';

  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'text':
        return 'h-4 rounded';
      default:
        return 'rounded-lg';
    }
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseClasses, getVariantClasses(), className)}
            style={{
              ...style,
              width: i === lines - 1 ? '75%' : width || '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, getVariantClasses(), className)}
      style={style}
    />
  );
}

// Card Skeleton for disease/medication/protocol cards
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('card-premium p-6', className)}>
      <div className="flex items-start gap-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-3">
          <Skeleton height={24} width="60%" />
          <Skeleton variant="text" lines={2} />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Skeleton height={24} width={80} className="rounded-full" />
        <Skeleton height={24} width={60} className="rounded-full" />
        <Skeleton height={24} width={70} className="rounded-full" />
      </div>
    </div>
  );
}

// Grid Skeleton for lists
export function GridSkeleton({
  count = 6,
  columns = 3,
  className
}: {
  count?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={cn(
      'grid gap-4',
      columns === 1 && 'grid-cols-1',
      columns === 2 && 'grid-cols-1 md:grid-cols-2',
      columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      columns === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      className
    )}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

// Table Skeleton
export function TableSkeleton({
  rows = 5,
  columns = 4,
  className
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={cn('w-full', className)}>
      {/* Header */}
      <div className="flex gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} height={20} className="flex-1" />
        ))}
      </div>
      {/* Rows */}
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 py-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} height={16} className="flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Stats Skeleton
export function StatsSkeleton({ count = 4, className }: { count?: number; className?: string }) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-premium p-4 text-center">
          <Skeleton height={40} width={80} className="mx-auto mb-2" />
          <Skeleton height={16} width={60} className="mx-auto" />
        </div>
      ))}
    </div>
  );
}

// Page Header Skeleton
export function PageHeaderSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-4', className)}>
      <Skeleton height={40} width="50%" />
      <Skeleton variant="text" lines={2} width="70%" />
    </div>
  );
}

// Search Bar Skeleton
export function SearchBarSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Skeleton height={48} className="flex-1" />
      <Skeleton height={48} width={120} />
    </div>
  );
}

export default Skeleton;
