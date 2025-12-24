/**
 * VARIANT UTILITIES
 * =================
 *
 * Type-safe variant system for components
 * Uses class-variance-authority (cva) for declarative variant definitions
 */

import { type VariantProps, cva } from 'class-variance-authority';

// Re-export cva and VariantProps for convenience
export { cva, type VariantProps };

/**
 * Example variant definition pattern
 *
 * @example
 * ```tsx
 * const buttonVariants = cva(
 *   // Base styles
 *   'inline-flex items-center justify-center rounded-md font-medium transition-colors',
 *   {
 *     variants: {
 *       variant: {
 *         default: 'bg-primary text-white hover:bg-primary/90',
 *         outline: 'border border-input bg-transparent hover:bg-accent',
 *         ghost: 'hover:bg-accent hover:text-accent-foreground',
 *       },
 *       size: {
 *         sm: 'h-9 px-3 text-sm',
 *         md: 'h-10 px-4 py-2',
 *         lg: 'h-11 px-8',
 *       },
 *     },
 *     defaultVariants: {
 *       variant: 'default',
 *       size: 'md',
 *     },
 *   }
 * );
 *
 * type ButtonProps = VariantProps<typeof buttonVariants>;
 * ```
 */

/**
 * Common variant patterns for reuse across components
 */
export const commonVariants = {
  // Size variants (consistent across components)
  sizes: {
    xs: 'h-7 px-2 text-xs',
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-11 px-6 text-lg',
    xl: 'h-12 px-8 text-xl',
  },

  // Rounded variants
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  },

  // Shadow variants
  shadow: {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  },
};

/**
 * Clinical-specific variant patterns
 */
export const clinicalVariants = {
  // Severity levels
  severity: {
    critical: 'bg-clinical-critical text-white border-clinical-critical',
    warning: 'bg-clinical-warning text-black border-clinical-warning',
    safe: 'bg-clinical-safe text-white border-clinical-safe',
    info: 'bg-clinical-info text-white border-clinical-info',
  },

  // Evidence strength levels
  evidenceStrength: {
    strong: 'border-l-4 border-l-green-600 bg-green-50 dark:bg-green-900/20',
    moderate: 'border-l-4 border-l-blue-600 bg-blue-50 dark:bg-blue-900/20',
    weak: 'border-l-4 border-l-amber-600 bg-amber-50 dark:bg-amber-900/20',
    expert: 'border-l-4 border-l-purple-600 bg-purple-50 dark:bg-purple-900/20',
  },

  // Convergence status
  convergence: {
    full: 'text-green-600 dark:text-green-400',
    partial: 'text-amber-600 dark:text-amber-400',
    divergent: 'text-red-600 dark:text-red-400',
    disputed: 'text-purple-600 dark:text-purple-400',
  },
};
