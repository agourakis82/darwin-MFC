'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// =============================================================================
// TYPES
// =============================================================================

export type CardVariant = 'base' | 'premium' | 'interactive' | 'glass' | 'bordered';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  clickable?: boolean;
  animate?: boolean;
}

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  justify?: 'start' | 'center' | 'end' | 'between';
}

// =============================================================================
// STYLES
// =============================================================================

const baseStyles = `
  rounded-2xl
  transition-all duration-200 ease-out
`;

const variantStyles: Record<CardVariant, string> = {
  base: `
    bg-white dark:bg-[#1c1c1e]
    border border-gray-200 dark:border-white/10
    shadow-sm
  `,
  premium: `
    bg-gradient-to-br from-white to-gray-50 dark:from-[#1c1c1e] dark:to-[#2c2c2e]
    border border-gray-200/50 dark:border-white/10
    shadow-lg
    backdrop-blur-sm
  `,
  interactive: `
    bg-white dark:bg-[#1c1c1e]
    border border-gray-200 dark:border-white/10
    shadow-sm
    cursor-pointer
  `,
  glass: `
    bg-white/70 dark:bg-white/10
    backdrop-blur-xl
    border border-white/20 dark:border-white/10
    shadow-lg
  `,
  bordered: `
    bg-transparent
    border-2 border-gray-200 dark:border-white/20
  `,
};

const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const hoverStyles = {
  base: 'hover:shadow-md hover:border-gray-300 dark:hover:border-white/20',
  premium: 'hover:shadow-xl hover:-translate-y-0.5',
  interactive: 'hover:shadow-lg hover:border-[#007aff]/30 dark:hover:border-[#5ac8fa]/30 hover:-translate-y-1',
  glass: 'hover:bg-white/80 dark:hover:bg-white/15',
  bordered: 'hover:border-[#007aff] dark:hover:border-[#5ac8fa]',
};

// =============================================================================
// CARD COMPONENT
// =============================================================================

/**
 * @description A flexible card container component with multiple visual variants and interaction states.
 * Supports glass morphism, premium gradients, and optional Framer Motion animations.
 *
 * @param props - The card properties
 * @param props.variant - Visual style: 'base' | 'premium' | 'interactive' | 'glass' | 'bordered'. Defaults to 'base'.
 * @param props.padding - Internal padding: 'none' | 'sm' | 'md' | 'lg'. Defaults to 'md'.
 * @param props.hoverable - Enables hover effects without making the card clickable. Defaults to false.
 * @param props.clickable - Makes the card appear interactive with cursor and hover effects. Defaults to false.
 * @param props.animate - Enables Framer Motion entrance and hover animations. Defaults to false.
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - Card content, typically CardHeader, CardBody, and CardFooter components.
 *
 * @example
 * // Basic card with header and body
 * <Card>
 *   <CardHeader title="Card Title" subtitle="Optional subtitle" />
 *   <CardBody>Card content goes here</CardBody>
 * </Card>
 *
 * @example
 * // Interactive glass card with animation
 * <Card variant="glass" clickable animate>
 *   <CardBody>Click me!</CardBody>
 * </Card>
 *
 * @returns {JSX.Element} A styled card container element
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'base',
      padding = 'md',
      hoverable = false,
      clickable = false,
      animate = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isInteractive = clickable || variant === 'interactive';

    const cardClasses = cn(
      baseStyles,
      variantStyles[variant],
      paddingStyles[padding],
      (hoverable || isInteractive) && hoverStyles[variant],
      isInteractive && 'cursor-pointer',
      className
    );

    if (animate) {
      return (
        <motion.div
          ref={ref}
          className={cardClasses}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={isInteractive ? { scale: 1.01, y: -2 } : undefined}
          transition={{ duration: 0.2 }}
          {...(props as HTMLMotionProps<'div'>)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// =============================================================================
// CARD HEADER
// =============================================================================

/**
 * @description Header section for Card components with built-in title, subtitle, icon, and action support.
 * Can also accept custom children for full layout control.
 *
 * @param props - The card header properties
 * @param props.title - Main title text or element displayed prominently.
 * @param props.subtitle - Secondary text displayed below the title in muted color.
 * @param props.action - Element (typically a button) displayed on the right side.
 * @param props.icon - Icon element displayed in a styled container on the left.
 * @param props.children - Custom content that replaces the default title/subtitle layout.
 * @param props.className - Additional CSS classes to apply.
 *
 * @example
 * // Header with title, subtitle, and action button
 * <CardHeader
 *   title="Patient Information"
 *   subtitle="Last updated: Today"
 *   action={<Button size="sm">Edit</Button>}
 * />
 *
 * @example
 * // Header with icon
 * <CardHeader
 *   icon={<HeartIcon />}
 *   title="Cardiovascular"
 * />
 *
 * @returns {JSX.Element} A styled header section for cards
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, icon, className, children, ...props }, ref) => {
    if (children) {
      return (
        <div
          ref={ref}
          className={cn('flex items-start justify-between gap-4 mb-4', className)}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-start justify-between gap-4 mb-4', className)}
        {...props}
      >
        <div className="flex items-start gap-3">
          {icon && (
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#007aff]/10 to-[#5856d6]/10 flex items-center justify-center text-[#007aff]">
              {icon}
            </div>
          )}
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-[#86868b] mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// =============================================================================
// CARD BODY
// =============================================================================

/**
 * @description Main content area for Card components with appropriate text styling.
 *
 * @param props - The card body properties
 * @param props.children - Content to display in the card body.
 * @param props.className - Additional CSS classes to apply.
 *
 * @example
 * <CardBody>
 *   <p>This is the main content of the card.</p>
 * </CardBody>
 *
 * @returns {JSX.Element} A styled content container for cards
 */
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-[#1d1d1f] dark:text-[#f5f5f7]', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

// =============================================================================
// CARD FOOTER
// =============================================================================

/**
 * @description Footer section for Card components with flexible content alignment.
 * Includes a top border separator from the card body.
 *
 * @param props - The card footer properties
 * @param props.justify - Horizontal alignment of footer content: 'start' | 'center' | 'end' | 'between'. Defaults to 'end'.
 * @param props.children - Footer content, typically action buttons.
 * @param props.className - Additional CSS classes to apply.
 *
 * @example
 * // Footer with right-aligned buttons (default)
 * <CardFooter>
 *   <Button variant="ghost">Cancel</Button>
 *   <Button>Save</Button>
 * </CardFooter>
 *
 * @example
 * // Footer with space-between alignment
 * <CardFooter justify="between">
 *   <span>Step 1 of 3</span>
 *   <Button>Next</Button>
 * </CardFooter>
 *
 * @returns {JSX.Element} A styled footer section for cards
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ justify = 'end', className, children, ...props }, ref) => {
    const justifyStyles = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-white/10',
          justifyStyles[justify],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// =============================================================================
// CARD GRID
// =============================================================================

export interface CardGridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

/**
 * @description A responsive grid layout component for arranging Card components.
 * Automatically adjusts columns based on viewport size.
 *
 * @param props - The card grid properties
 * @param props.columns - Maximum number of columns at largest breakpoint: 1 | 2 | 3 | 4. Defaults to 3.
 * @param props.gap - Spacing between grid items: 'sm' | 'md' | 'lg'. Defaults to 'md'.
 * @param props.children - Card components to arrange in the grid.
 * @param props.className - Additional CSS classes to apply.
 *
 * @example
 * // 3-column grid of cards
 * <CardGrid columns={3} gap="md">
 *   <Card>Card 1</Card>
 *   <Card>Card 2</Card>
 *   <Card>Card 3</Card>
 * </CardGrid>
 *
 * @returns {JSX.Element} A responsive grid container for cards
 */
export function CardGrid({
  columns = 3,
  gap = 'md',
  className,
  children,
  ...props
}: CardGridProps) {
  const columnStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div
      className={cn('grid', columnStyles[columns], gapStyles[gap], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
