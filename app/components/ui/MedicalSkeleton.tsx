'use client';

import { cn } from '@/lib/utils';

export interface MedicalSkeletonProps {
  count?: number;
  height?: string;
  className?: string;
  animated?: boolean;
  circle?: boolean;
}

export function MedicalSkeleton({
  count = 1,
  height = 'h-4',
  className,
  animated = true,
  circle = false,
}: MedicalSkeletonProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700',
            height,
            circle ? 'rounded-full' : 'rounded-lg',
            animated && 'animate-pulse'
          )}
        />
      ))}
    </div>
  );
}

export default MedicalSkeleton;
