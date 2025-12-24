/**
 * RESPONSIVE CONTAINER COMPONENT
 * ===============================
 *
 * Container component with responsive max-widths and padding
 * Supports different size variants and alignment options
 */

'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';

const containerVariants = cva('mx-auto w-full', {
  variants: {
    // Max-width variants
    size: {
      sm: 'max-w-screen-sm',      // 640px
      md: 'max-w-screen-md',      // 768px
      lg: 'max-w-screen-lg',      // 1024px
      xl: 'max-w-screen-xl',      // 1280px
      '2xl': 'max-w-screen-2xl',  // 1536px
      full: 'max-w-full',         // No max-width
    },

    // Padding variants
    padding: {
      none: 'px-0',
      sm: 'px-4 md:px-6',
      md: 'px-4 md:px-8',
      lg: 'px-6 md:px-12',
      xl: 'px-8 md:px-16',
    },

    // Vertical padding
    paddingY: {
      none: 'py-0',
      sm: 'py-4 md:py-6',
      md: 'py-6 md:py-12',
      lg: 'py-8 md:py-16',
      xl: 'py-12 md:py-24',
    },

    // Center content
    centered: {
      true: 'flex flex-col items-center',
    },
  },
  defaultVariants: {
    size: 'xl',
    padding: 'md',
    paddingY: 'none',
  },
});

export interface ResponsiveContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  /**
   * Render as a different element
   */
  as?: React.ElementType;
}

/**
 * ResponsiveContainer - Responsive container with max-width and padding
 *
 * @example
 * ```tsx
 * <ResponsiveContainer size="lg" padding="md">
 *   <h1>Page Content</h1>
 * </ResponsiveContainer>
 * ```
 *
 * @example Centered content
 * ```tsx
 * <ResponsiveContainer size="md" centered>
 *   <Card>Centered Card</Card>
 * </ResponsiveContainer>
 * ```
 */
export const ResponsiveContainer = React.forwardRef<HTMLDivElement, ResponsiveContainerProps>(
  (
    {
      className,
      size,
      padding,
      paddingY,
      centered,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          containerVariants({ size, padding, paddingY, centered }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

ResponsiveContainer.displayName = 'ResponsiveContainer';
