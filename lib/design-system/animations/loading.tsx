/**
 * LOADING & SKELETON ANIMATIONS
 * ===============================
 *
 * Loading indicators and skeleton screens with smooth animations
 * Material Design, iOS, and custom loading patterns
 *
 * Features:
 * - Spinner variations (circle, dots, bars, etc.)
 * - Skeleton screens (text, image, card, list)
 * - Progress indicators
 * - Shimmer effects
 * - Skeleton content placeholders
 * - Lazy loading animations
 *
 * @example
 * ```tsx
 * import { Spinner, SkeletonText, SkeletonCard } from '@/lib/design-system/animations/loading';
 *
 * <Spinner variant="circle" />
 * <SkeletonText lines={3} />
 * <SkeletonCard />
 * ```
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import { easings, durations, springs } from './presets';

// ============================================================================
// SPINNER COMPONENTS
// ============================================================================

const spinnerVariants = cva('', {
  variants: {
    size: {
      xs: 'w-4 h-4',
      sm: 'w-6 h-6',
      md: 'w-8 h-8',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
    },
    color: {
      primary: 'text-brand-primary-600',
      secondary: 'text-neutral-600',
      white: 'text-white',
      black: 'text-black',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

/**
 * Circular spinner (default)
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size,
  color,
  className,
}) => {
  return (
    <motion.div
      className={cn(spinnerVariants({ size, color }), className)}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
        />
        <circle
          className="opacity-75"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          strokeDasharray="80, 200"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
};

/**
 * Dots spinner
 */
export const DotsSpinner: React.FC<SpinnerProps> = ({ size, color, className }) => {
  const sizeMap = {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 6,
    xl: 8,
  };

  const dotSize = sizeMap[size || 'md'];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn('rounded-full', spinnerVariants({ color }))}
          style={{ width: dotSize, height: dotSize, backgroundColor: 'currentColor' }}
          animate={{
            y: [0, -dotSize * 2, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.15,
            ease: easings.smooth,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Bars spinner
 */
export const BarsSpinner: React.FC<SpinnerProps> = ({ size, color, className }) => {
  const sizeMap = {
    xs: { width: 2, height: 12 },
    sm: { width: 3, height: 16 },
    md: { width: 4, height: 24 },
    lg: { width: 6, height: 32 },
    xl: { width: 8, height: 40 },
  };

  const { width, height } = sizeMap[size || 'md'];

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className={cn('rounded-full', spinnerVariants({ color }))}
          style={{ width, backgroundColor: 'currentColor' }}
          animate={{
            height: [height * 0.3, height, height * 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.1,
            ease: easings.smooth,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Pulse spinner
 */
export const PulseSpinner: React.FC<SpinnerProps> = ({ size, color, className }) => {
  return (
    <motion.div
      className={cn(
        'rounded-full',
        spinnerVariants({ size, color }),
        className
      )}
      style={{ backgroundColor: 'currentColor' }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [1, 0.5, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: easings.smooth,
      }}
    />
  );
};

/**
 * Ring spinner
 */
export const RingSpinner: React.FC<SpinnerProps> = ({ size, color, className }) => {
  return (
    <div className={cn('relative', spinnerVariants({ size }), className)}>
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className={cn(
            'absolute inset-0 rounded-full border-4',
            spinnerVariants({ color })
          )}
          style={{ borderColor: 'currentColor' }}
          animate={{
            scale: [1, 2],
            opacity: [1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.3,
            ease: easings.easeOut,
          }}
        />
      ))}
    </div>
  );
};

// ============================================================================
// SKELETON COMPONENTS
// ============================================================================

const skeletonBaseClass =
  'bg-neutral-200 dark:bg-neutral-800 rounded overflow-hidden relative';

const shimmerAnimation = {
  backgroundPosition: ['200% 0', '-200% 0'],
};

const shimmerTransition = {
  duration: 2,
  repeat: Infinity,
  ease: 'linear' as any,
};

const shimmerStyle = {
  backgroundImage:
    'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
  backgroundSize: '200% 100%',
};

/**
 * Skeleton line (for text)
 */
interface SkeletonLineProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const SkeletonLine: React.FC<SkeletonLineProps> = ({
  width = '100%',
  height = '1rem',
  className,
}) => {
  return (
    <motion.div
      className={cn(skeletonBaseClass, className)}
      style={{ width, height, ...shimmerStyle }}
      animate={shimmerAnimation}
      transition={shimmerTransition}
    />
  );
};

/**
 * Skeleton circle (for avatars)
 */
interface SkeletonCircleProps {
  size?: string | number;
  className?: string;
}

export const SkeletonCircle: React.FC<SkeletonCircleProps> = ({
  size = '3rem',
  className,
}) => {
  return (
    <motion.div
      className={cn(skeletonBaseClass, 'rounded-full', className)}
      style={{ width: size, height: size, ...shimmerStyle }}
      animate={shimmerAnimation}
      transition={shimmerTransition}
    />
  );
};

/**
 * Skeleton rectangle (for images)
 */
interface SkeletonRectangleProps {
  width?: string | number;
  height?: string | number;
  aspectRatio?: string;
  className?: string;
}

export const SkeletonRectangle: React.FC<SkeletonRectangleProps> = ({
  width = '100%',
  height,
  aspectRatio,
  className,
}) => {
  return (
    <motion.div
      className={cn(skeletonBaseClass, className)}
      style={{
        width,
        height,
        aspectRatio,
        ...shimmerStyle,
      }}
      animate={shimmerAnimation}
      transition={shimmerTransition}
    />
  );
};

/**
 * Skeleton text block
 */
interface SkeletonTextProps {
  lines?: number;
  lineHeight?: string;
  gap?: string;
  lastLineWidth?: string;
  className?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  lineHeight = '1rem',
  gap = '0.5rem',
  lastLineWidth = '70%',
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)} style={{ gap }}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonLine
          key={index}
          height={lineHeight}
          width={index === lines - 1 ? lastLineWidth : '100%'}
        />
      ))}
    </div>
  );
};

/**
 * Skeleton card
 */
interface SkeletonCardProps {
  hasImage?: boolean;
  imageHeight?: string;
  hasAvatar?: boolean;
  textLines?: number;
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  hasImage = true,
  imageHeight = '12rem',
  hasAvatar = false,
  textLines = 3,
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden',
        className
      )}
    >
      {hasImage && <SkeletonRectangle height={imageHeight} className="rounded-none" />}
      <div className="p-4 space-y-3">
        {hasAvatar && (
          <div className="flex items-center gap-3">
            <SkeletonCircle size="2.5rem" />
            <div className="flex-1">
              <SkeletonLine height="0.75rem" width="40%" />
            </div>
          </div>
        )}
        <SkeletonText lines={textLines} />
      </div>
    </div>
  );
};

/**
 * Skeleton list
 */
interface SkeletonListProps {
  items?: number;
  hasAvatar?: boolean;
  className?: string;
}

export const SkeletonList: React.FC<SkeletonListProps> = ({
  items = 3,
  hasAvatar = true,
  className,
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-start gap-3">
          {hasAvatar && <SkeletonCircle size="2.5rem" />}
          <div className="flex-1 space-y-2">
            <SkeletonLine height="0.875rem" width="30%" />
            <SkeletonLine height="0.75rem" width="100%" />
            <SkeletonLine height="0.75rem" width="80%" />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Skeleton table
 */
interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  hasHeader?: boolean;
  className?: string;
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 4,
  hasHeader = true,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {hasHeader && (
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, index) => (
            <SkeletonLine key={index} height="1rem" />
          ))}
        </div>
      )}
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <SkeletonLine key={colIndex} height="0.875rem" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// PROGRESS INDICATORS
// ============================================================================

/**
 * Linear progress bar
 */
interface ProgressBarProps {
  value?: number; // 0-100
  indeterminate?: boolean;
  color?: string;
  height?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 0,
  indeterminate = false,
  color = 'bg-brand-primary-600',
  height = '0.5rem',
  className,
}) => {
  return (
    <div
      className={cn(
        'w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden',
        className
      )}
      style={{ height }}
    >
      {indeterminate ? (
        <motion.div
          className={cn('h-full rounded-full', color)}
          style={{ width: '30%' }}
          animate={{
            x: ['-100%', '400%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ) : (
        <motion.div
          className={cn('h-full rounded-full', color)}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          transition={{ duration: 0.3, ease: easings.easeOut }}
        />
      )}
    </div>
  );
};

/**
 * Circular progress
 */
interface CircularProgressProps {
  value?: number; // 0-100
  indeterminate?: boolean;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showValue?: boolean;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value = 0,
  indeterminate = false,
  size = 64,
  strokeWidth = 4,
  color = '#3B82F6',
  showValue = false,
  className,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-neutral-200 dark:text-neutral-800"
        />
        {indeterminate ? (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeLinecap="round"
            animate={{
              strokeDashoffset: [circumference, 0],
              rotate: [0, 360],
            }}
            transition={{
              strokeDashoffset: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              },
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          />
        ) : (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.3, ease: easings.easeOut }}
          />
        )}
      </svg>
      {showValue && !indeterminate && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold">{Math.round(value)}%</span>
        </div>
      )}
    </div>
  );
};

/**
 * Step progress
 */
interface StepProgressProps {
  steps: number;
  currentStep: number;
  color?: string;
  className?: string;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  currentStep,
  color = 'bg-brand-primary-600',
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {Array.from({ length: steps }).map((_, index) => (
        <React.Fragment key={index}>
          <motion.div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
              index < currentStep
                ? `${color} text-white`
                : index === currentStep
                ? `${color} text-white`
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1, ...springs.bouncy }}
          >
            {index + 1}
          </motion.div>
          {index < steps - 1 && (
            <div className="flex-1 h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                className={cn('h-full', color)}
                initial={{ width: 0 }}
                animate={{ width: index < currentStep ? '100%' : '0%' }}
                transition={{ duration: 0.3, ease: easings.easeOut }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// ============================================================================
// LOADING OVERLAYS
// ============================================================================

/**
 * Full-screen loading overlay
 */
interface LoadingOverlayProps {
  show: boolean;
  message?: string;
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  backdrop?: 'transparent' | 'light' | 'dark' | 'blur';
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  show,
  message,
  spinnerSize = 'lg',
  backdrop = 'blur',
}) => {
  const backdropClass = {
    transparent: 'bg-transparent',
    light: 'bg-white/80',
    dark: 'bg-black/50',
    blur: 'bg-white/80 dark:bg-black/50 backdrop-blur-sm',
  };

  if (!show) return null;

  return (
    <motion.div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center',
        backdropClass[backdrop]
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Spinner size={spinnerSize} />
      {message && (
        <motion.p
          className="mt-4 text-sm font-medium text-neutral-700 dark:text-neutral-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
};
