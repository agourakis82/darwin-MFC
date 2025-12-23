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
