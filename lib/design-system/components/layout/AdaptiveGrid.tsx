/**
 * ADAPTIVE GRID COMPONENT
 * ========================
 *
 * Responsive grid layout that adapts to viewport size
 * Supports auto-fit, auto-fill, and custom column configurations
 */

'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';

const gridVariants = cva('grid w-full', {
  variants: {
    // Column configurations
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
      auto: 'grid-cols-auto-fit', // Auto-fit based on minmax
    },

    // Gap between grid items
    gap: {
      none: 'gap-0',
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    },

    // Alignment
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },

    justify: {
      start: 'justify-items-start',
      center: 'justify-items-center',
      end: 'justify-items-end',
      stretch: 'justify-items-stretch',
    },
  },
  defaultVariants: {
    cols: 3,
    gap: 'md',
    align: 'stretch',
    justify: 'stretch',
  },
});

export interface AdaptiveGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /**
   * Minimum column width for auto-fit/auto-fill
   * @default '250px'
   */
  minColWidth?: string;

  /**
   * Use auto-fill instead of auto-fit
   * @default false
   */
  autoFill?: boolean;

  /**
   * Custom grid template columns
   */
  templateColumns?: string;
}

/**
 * AdaptiveGrid - Responsive grid layout component
 *
 * @example
 * ```tsx
 * <AdaptiveGrid cols={3} gap="md">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </AdaptiveGrid>
 * ```
 *
 * @example Auto-fit columns
 * ```tsx
 * <AdaptiveGrid cols="auto" minColWidth="300px" gap="lg">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 * </AdaptiveGrid>
 * ```
 */
export const AdaptiveGrid = React.forwardRef<HTMLDivElement, AdaptiveGridProps>(
  (
    {
      className,
      cols,
      gap,
      align,
      justify,
      minColWidth = '250px',
      autoFill = false,
      templateColumns,
      style,
      children,
      ...props
    },
    ref
  ) => {
    // Custom grid template columns for auto-fit/auto-fill
    const customStyle = React.useMemo(() => {
      if (cols === 'auto' && !templateColumns) {
        const repeatMode = autoFill ? 'auto-fill' : 'auto-fit';
        return {
          ...style,
          gridTemplateColumns: `repeat(${repeatMode}, minmax(${minColWidth}, 1fr))`,
        };
      }

      if (templateColumns) {
        return {
          ...style,
          gridTemplateColumns: templateColumns,
        };
      }

      return style;
    }, [cols, autoFill, minColWidth, templateColumns, style]);

    return (
      <div
        ref={ref}
        className={cn(gridVariants({ cols, gap, align, justify }), className)}
        style={customStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AdaptiveGrid.displayName = 'AdaptiveGrid';
