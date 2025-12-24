/**
 * BUTTON PRIMITIVE
 * ================
 *
 * Core button component with comprehensive variant support
 * Based on Shadcn/ui pattern, customized for Darwin-MFC
 */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const buttonVariants = cva(
  // Base styles - Common to all buttons
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-md font-medium',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-95', // Micro-interaction: press effect
  ],
  {
    variants: {
      // Visual variants
      variant: {
        default: [
          'bg-brand-primary-500 text-white',
          'hover:bg-brand-primary-600',
          'focus-visible:ring-brand-primary-500',
          'shadow-sm hover:shadow-md',
        ],
        secondary: [
          'bg-brand-secondary-500 text-white',
          'hover:bg-brand-secondary-600',
          'focus-visible:ring-brand-secondary-500',
          'shadow-sm hover:shadow-md',
        ],
        outline: [
          'border-2 border-neutral-300 dark:border-neutral-700',
          'bg-transparent',
          'hover:bg-neutral-100 dark:hover:bg-neutral-800',
          'focus-visible:ring-neutral-500',
        ],
        ghost: [
          'bg-transparent',
          'hover:bg-neutral-100 dark:hover:bg-neutral-800',
          'focus-visible:ring-neutral-500',
        ],
        link: [
          'bg-transparent underline-offset-4',
          'hover:underline',
          'text-brand-primary-500 dark:text-brand-primary-400',
        ],

        // Clinical variants
        critical: [
          'bg-clinical-critical-base text-clinical-critical-foreground',
          'hover:bg-clinical-critical-dark',
          'focus-visible:ring-clinical-critical-base',
          'shadow-sm hover:shadow-md',
        ],
        warning: [
          'bg-clinical-warning-base text-clinical-warning-foreground',
          'hover:bg-clinical-warning-dark',
          'focus-visible:ring-clinical-warning-base',
          'shadow-sm hover:shadow-md',
        ],
        safe: [
          'bg-clinical-safe-base text-clinical-safe-foreground',
          'hover:bg-clinical-safe-dark',
          'focus-visible:ring-clinical-safe-base',
          'shadow-sm hover:shadow-md',
        ],
        info: [
          'bg-clinical-info-base text-clinical-info-foreground',
          'hover:bg-clinical-info-dark',
          'focus-visible:ring-clinical-info-base',
          'shadow-sm hover:shadow-md',
        ],
      },

      // Size variants
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-11 px-6 text-lg',
        xl: 'h-12 px-8 text-xl',
        icon: 'h-10 w-10', // Square icon button
      },

      // Rounded variants
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },

      // Full width option
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      rounded: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Use Slot to compose with other components
   * @example <Button asChild><Link href="/">Home</Link></Button>
   */
  asChild?: boolean;

  /**
   * Show loading state with spinner
   */
  loading?: boolean;

  /**
   * Icon to display before button content
   */
  iconBefore?: React.ReactNode;

  /**
   * Icon to display after button content
   */
  iconAfter?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      fullWidth,
      asChild = false,
      loading = false,
      disabled,
      iconBefore,
      iconAfter,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, fullWidth }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && iconBefore}
        {children}
        {!loading && iconAfter}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
