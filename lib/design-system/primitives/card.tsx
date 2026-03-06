/**
 * CARD PRIMITIVE
 * ==============
 *
 * Flexible card component with comprehensive variant support
 * Supports glassmorphism, elevation, and interactive states
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const cardVariants = cva(
  // Base styles
  [
    'rounded-lg',
    'transition-all duration-200',
  ],
  {
    variants: {
      // Visual variants
      variant: {
        default: [
          'bg-paper-white dark:bg-carbon-900',
          'border border-carbon-200 dark:border-carbon-800',
        ],
        elevated: [
          'bg-paper-white dark:bg-carbon-900',
          'shadow-elevation-1 hover:shadow-elevation-2',
        ],
        glass: [
          // Uses global glass vars so "Reduce transparency" can make it solid.
          'bg-[var(--darwin-glass-bg)] dark:bg-[var(--darwin-glass-bg-dark)]',
          'backdrop-blur-md',
          'border border-carbon-200/70 dark:border-carbon-800/70',
          'shadow-elevation-2',
        ],
        outline: [
          'bg-transparent',
          'border-2 border-carbon-300 dark:border-carbon-700',
        ],
        filled: [
          'bg-carbon-100 dark:bg-carbon-800',
        ],

        // Clinical variants
        criticalAlert: [
          'bg-critical-red-50 dark:bg-critical-red-900/20',
          'border-l-4 border-l-clinical-critical-base',
        ],
        warningAlert: [
          'bg-thymine-gold/10 dark:bg-thymine-gold/15',
          'border-l-4 border-l-clinical-warning-base',
        ],
        safeAlert: [
          'bg-guanine-green/10 dark:bg-guanine-green/15',
          'border-l-4 border-l-clinical-safe-base',
        ],
        infoAlert: [
          'bg-brand-primary-50 dark:bg-brand-primary-900/15',
          'border-l-4 border-l-clinical-info-base',
        ],
      },

      // Padding variants
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },

      // Interactive states
      interactive: {
        true: [
          'cursor-pointer',
          'hover:scale-[1.01]',
          'hover:shadow-lg',
          'active:scale-[0.99]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500 focus-visible:ring-offset-2',
        ],
      },

      // Rounded variants
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      rounded: 'lg',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Render as a different element
   */
  as?: React.ElementType;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      interactive,
      rounded,
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    return (
      <Component
        className={cn(
          cardVariants({ variant, padding, interactive, rounded }),
          className
        )}
        ref={ref}
        {...(interactive && { tabIndex: 0 })}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// Card sub-components for composition
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }
>(({ className, as: Component = 'h3', ...props }, ref) => (
  <Component
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-carbon-600 dark:text-carbon-400', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants
};
