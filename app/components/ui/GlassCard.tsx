'use client';

import { forwardRef, HTMLAttributes, ReactNode, useMemo } from 'react';
import { motion, HTMLMotionProps, Variants, AnimatePresence, TargetAndTransition } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  glassClasses,
  glow,
  focusRing,
  type GlowType,
  type GlassType,
} from '@/lib/design-system/effects';
import { springs, cardAnimations } from '@/lib/design-system/animations';
import {
  gradeColors,
  interactionColors,
  convergenceColors,
  type GradeLevel,
  type InteractionSeverity,
  type ConvergenceStatus,
} from '@/lib/design-system/colors';

// =============================================================================
// TYPES
// =============================================================================

export type GlassVariant = 'light' | 'dark' | 'subtle' | 'frosted' | 'elevated';
export type GlowVariant = 'none' | 'primary' | 'success' | 'warning' | 'danger' | 'evidence' | 'interaction' | 'convergence';
export type HoverEffect = 'none' | 'lift' | 'glow' | 'scale' | 'subtle';
export type GlassCardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface GlassCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Glass morphism variant */
  variant?: GlassVariant;

  /** Glow effect around the card */
  glow?: GlowVariant;

  /** Hover interaction effect */
  hover?: HoverEffect;

  /** Padding size */
  padding?: GlassCardPadding;

  /** Enable entrance animation */
  animate?: boolean;

  /** Custom animation delay (for staggered lists) */
  animationDelay?: number;

  /** Make the card interactive (clickable) */
  interactive?: boolean;

  /** Disable all interactions (for loading states) */
  disabled?: boolean;

  /** GRADE evidence level (A/B/C/D) - adds semantic glow */
  evidenceLevel?: GradeLevel;

  /** Drug interaction severity - adds semantic glow */
  interactionSeverity?: InteractionSeverity;

  /** Convergence status - adds semantic glow */
  convergenceStatus?: ConvergenceStatus;

  /** Header content */
  header?: ReactNode;

  /** Footer content */
  footer?: ReactNode;

  /** Show loading skeleton */
  loading?: boolean;

  /** Reduce motion for accessibility */
  reduceMotion?: boolean;
}

// =============================================================================
// STYLE CONFIGURATIONS
// =============================================================================

const variantStyles: Record<GlassVariant, string> = {
  light: `
    bg-white/72 dark:bg-[#1c1c1e]/72
    backdrop-blur-xl backdrop-saturate-150
    border border-white/20 dark:border-white/10
    shadow-lg
  `,
  dark: `
    bg-[#1c1c1e]/85 dark:bg-black/80
    backdrop-blur-xl backdrop-saturate-150
    border border-white/10
    shadow-xl
  `,
  subtle: `
    bg-white/50 dark:bg-white/5
    backdrop-blur-md
    border border-white/10 dark:border-white/5
    shadow-sm
  `,
  frosted: `
    bg-gradient-to-br from-white/80 to-white/60 dark:from-white/15 dark:to-white/5
    backdrop-blur-2xl backdrop-saturate-200
    border border-white/30 dark:border-white/15
    shadow-xl
  `,
  elevated: `
    bg-white/90 dark:bg-[#2c2c2e]/90
    backdrop-blur-xl
    border border-white/20 dark:border-white/10
    shadow-2xl
  `,
};

const paddingStyles: Record<GlassCardPadding, string> = {
  none: '',
  xs: 'p-2',
  sm: 'p-3',
  md: 'p-4 sm:p-5',
  lg: 'p-5 sm:p-6',
  xl: 'p-6 sm:p-8',
};

const glowStyles: Record<Exclude<GlowVariant, 'none' | 'evidence' | 'interaction' | 'convergence'>, string> = {
  primary: 'shadow-[0_0_20px_rgba(0,113,227,0.3)]',
  success: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
  warning: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
  danger: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
};

const hoverEffectStyles: Record<HoverEffect, string> = {
  none: '',
  lift: 'hover:-translate-y-1 hover:shadow-2xl',
  glow: 'hover:shadow-[0_0_30px_rgba(0,113,227,0.4)]',
  scale: 'hover:scale-[1.02]',
  subtle: 'hover:bg-white/80 dark:hover:bg-white/15',
};

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
  },
};

const hoverVariants: Record<HoverEffect, Variants> = {
  none: {},
  lift: {
    rest: { y: 0, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' },
    hover: { y: -4, boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
    tap: { scale: 0.99 },
  },
  glow: {
    rest: { boxShadow: '0 0 0 rgba(0, 113, 227, 0)' },
    hover: { boxShadow: '0 0 30px rgba(0, 113, 227, 0.4)' },
    tap: { scale: 0.99 },
  },
  scale: {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  },
  subtle: {
    rest: { opacity: 1 },
    hover: { opacity: 0.95 },
    tap: { opacity: 0.9 },
  },
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function getSemanticGlow(
  evidenceLevel?: GradeLevel,
  interactionSeverity?: InteractionSeverity,
  convergenceStatus?: ConvergenceStatus
): string {
  if (evidenceLevel) {
    const config = gradeColors[evidenceLevel];
    return `shadow-[0_0_20px_${config.color}40]`;
  }

  if (interactionSeverity) {
    const colorMap: Record<InteractionSeverity, string> = {
      contraindicated: 'rgba(220,38,38,0.3)',
      major: 'rgba(234,88,12,0.3)',
      moderate: 'rgba(202,138,4,0.3)',
      minor: 'rgba(22,163,74,0.3)',
    };
    return `shadow-[0_0_20px_${colorMap[interactionSeverity]}]`;
  }

  if (convergenceStatus) {
    const config = convergenceColors[convergenceStatus];
    return `shadow-[0_0_20px_${config.bg}40]`;
  }

  return '';
}

function getSemanticBorder(
  evidenceLevel?: GradeLevel,
  interactionSeverity?: InteractionSeverity,
  convergenceStatus?: ConvergenceStatus
): string {
  if (evidenceLevel) {
    const config = gradeColors[evidenceLevel];
    return `border-l-4 border-l-[${config.hex}]`;
  }

  if (interactionSeverity) {
    const colorMap: Record<InteractionSeverity, string> = {
      contraindicated: '#DC2626',
      major: '#EA580C',
      moderate: '#CA8A04',
      minor: '#16A34A',
    };
    return `border-l-4 border-l-[${colorMap[interactionSeverity]}]`;
  }

  if (convergenceStatus) {
    const config = convergenceColors[convergenceStatus];
    return `border-l-4 border-l-[${config.border}]`;
  }

  return '';
}

// =============================================================================
// LOADING SKELETON
// =============================================================================

function GlassCardSkeleton({ padding = 'md' }: { padding?: GlassCardPadding }) {
  return (
    <div className={cn('animate-pulse', paddingStyles[padding])}>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
    </div>
  );
}

// =============================================================================
// GLASS CARD COMPONENT
// =============================================================================

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      variant = 'light',
      glow: glowProp = 'none',
      hover = 'none',
      padding = 'md',
      animate = false,
      animationDelay = 0,
      interactive = false,
      disabled = false,
      evidenceLevel,
      interactionSeverity,
      convergenceStatus,
      header,
      footer,
      loading = false,
      reduceMotion = false,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    // Determine if card should have semantic styling
    const hasSemanticContext = evidenceLevel || interactionSeverity || convergenceStatus;

    // Build class names
    const cardClasses = useMemo(() => {
      const classes = [
        // Base styles
        'relative rounded-2xl overflow-hidden',
        'transition-all duration-200 ease-out',

        // Variant styles
        variantStyles[variant],

        // Padding (applied to outer container, not inner content)
        !header && !footer ? paddingStyles[padding] : '',

        // Glow effects
        glowProp !== 'none' &&
        glowProp !== 'evidence' &&
        glowProp !== 'interaction' &&
        glowProp !== 'convergence'
          ? glowStyles[glowProp]
          : '',

        // Semantic glow
        hasSemanticContext
          ? getSemanticGlow(evidenceLevel, interactionSeverity, convergenceStatus)
          : '',

        // Semantic border
        hasSemanticContext
          ? getSemanticBorder(evidenceLevel, interactionSeverity, convergenceStatus)
          : '',

        // Hover effects (non-animated)
        !animate && hover !== 'none' ? hoverEffectStyles[hover] : '',

        // Interactive states
        interactive && !disabled ? 'cursor-pointer' : '',
        disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : '',

        // Focus styles
        interactive ? 'focus:outline-none focus-visible:ring-3 focus-visible:ring-[#0071E3]/50' : '',

        className,
      ];

      return cn(...classes);
    }, [
      variant,
      padding,
      glowProp,
      hasSemanticContext,
      evidenceLevel,
      interactionSeverity,
      convergenceStatus,
      hover,
      animate,
      interactive,
      disabled,
      header,
      footer,
      className,
    ]);

    // Handle click events
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(e);
    };

    // Content with optional header/footer
    const content = loading ? (
      <GlassCardSkeleton padding={padding} />
    ) : (
      <>
        {header && (
          <div className={cn('border-b border-white/10 dark:border-white/5', paddingStyles[padding])}>
            {header}
          </div>
        )}
        <div className={cn(header || footer ? paddingStyles[padding] : '')}>{children}</div>
        {footer && (
          <div className={cn('border-t border-white/10 dark:border-white/5', paddingStyles[padding])}>
            {footer}
          </div>
        )}
      </>
    );

    // Animated version
    if (animate && !reduceMotion) {
      return (
        <motion.div
          ref={ref}
          className={cardClasses}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            ...springs.default,
            delay: animationDelay,
          }}
          whileHover={
            interactive && hover !== 'none'
              ? (hoverVariants[hover].hover as TargetAndTransition)
              : undefined
          }
          whileTap={
            interactive && hover !== 'none'
              ? (hoverVariants[hover].tap as TargetAndTransition)
              : undefined
          }
          onClick={handleClick}
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : undefined}
          {...(props as HTMLMotionProps<'div'>)}
        >
          {content}
        </motion.div>
      );
    }

    // Static version
    return (
      <div
        ref={ref}
        className={cardClasses}
        onClick={handleClick}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {content}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

// =============================================================================
// GLASS CARD HEADER
// =============================================================================

export interface GlassCardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
}

export const GlassCardHeader = forwardRef<HTMLDivElement, GlassCardHeaderProps>(
  ({ title, subtitle, action, icon, badge, className, children, ...props }, ref) => {
    if (children) {
      return (
        <div
          ref={ref}
          className={cn('flex items-start justify-between gap-4', className)}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-start justify-between gap-4', className)}
        {...props}
      >
        <div className="flex items-start gap-3 min-w-0 flex-1">
          {icon && (
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#0071E3]/15 to-[#5E5CE6]/15 dark:from-[#0071E3]/25 dark:to-[#5E5CE6]/25 flex items-center justify-center text-[#0071E3]">
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              {title && (
                <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] truncate">
                  {title}
                </h3>
              )}
              {badge}
            </div>
            {subtitle && (
              <p className="text-sm text-[#86868b] mt-0.5 line-clamp-2">{subtitle}</p>
            )}
          </div>
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    );
  }
);

GlassCardHeader.displayName = 'GlassCardHeader';

// =============================================================================
// GLASS CARD BODY
// =============================================================================

export interface GlassCardBodyProps extends HTMLAttributes<HTMLDivElement> {}

export const GlassCardBody = forwardRef<HTMLDivElement, GlassCardBodyProps>(
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

GlassCardBody.displayName = 'GlassCardBody';

// =============================================================================
// GLASS CARD FOOTER
// =============================================================================

export interface GlassCardFooterProps extends HTMLAttributes<HTMLDivElement> {
  justify?: 'start' | 'center' | 'end' | 'between';
}

export const GlassCardFooter = forwardRef<HTMLDivElement, GlassCardFooterProps>(
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
        className={cn('flex items-center gap-3', justifyStyles[justify], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCardFooter.displayName = 'GlassCardFooter';

// =============================================================================
// GLASS CARD GRID
// =============================================================================

export interface GlassCardGridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  stagger?: boolean;
}

export function GlassCardGrid({
  columns = 3,
  gap = 'md',
  stagger = false,
  className,
  children,
  ...props
}: GlassCardGridProps) {
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

  if (stagger) {
    return (
      <motion.div
        className={cn('grid', columnStyles[columns], gapStyles[gap], className)}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.1,
            },
          },
        }}
        {...(props as HTMLMotionProps<'div'>)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={cn('grid', columnStyles[columns], gapStyles[gap], className)}
      {...props}
    >
      {children}
    </div>
  );
}

// =============================================================================
// SPECIALIZED VARIANTS
// =============================================================================

/**
 * Evidence Card - Pre-configured for displaying GRADE evidence levels
 */
export interface EvidenceGlassCardProps extends Omit<GlassCardProps, 'glow' | 'evidenceLevel'> {
  level: GradeLevel;
  showBorder?: boolean;
}

export function EvidenceGlassCard({
  level,
  showBorder = true,
  ...props
}: EvidenceGlassCardProps) {
  return (
    <GlassCard
      {...props}
      evidenceLevel={level}
      glow="evidence"
      className={cn(
        showBorder && `border-l-4`,
        level === 'A' && 'border-l-[#10B981]',
        level === 'B' && 'border-l-[#3B82F6]',
        level === 'C' && 'border-l-[#F59E0B]',
        level === 'D' && 'border-l-[#EF4444]',
        props.className
      )}
    />
  );
}

/**
 * Interaction Card - Pre-configured for drug interaction alerts
 */
export interface InteractionGlassCardProps extends Omit<GlassCardProps, 'glow' | 'interactionSeverity'> {
  severity: InteractionSeverity;
  showBorder?: boolean;
  pulse?: boolean;
}

export function InteractionGlassCard({
  severity,
  showBorder = true,
  pulse = false,
  ...props
}: InteractionGlassCardProps) {
  const severityBorderColors: Record<InteractionSeverity, string> = {
    contraindicated: 'border-l-[#DC2626]',
    major: 'border-l-[#EA580C]',
    moderate: 'border-l-[#CA8A04]',
    minor: 'border-l-[#16A34A]',
  };

  return (
    <GlassCard
      {...props}
      interactionSeverity={severity}
      glow="interaction"
      className={cn(
        showBorder && 'border-l-4',
        showBorder && severityBorderColors[severity],
        pulse && severity === 'contraindicated' && 'animate-pulse',
        props.className
      )}
    />
  );
}

/**
 * Convergence Card - Pre-configured for convergence status display
 */
export interface ConvergenceGlassCardProps extends Omit<GlassCardProps, 'glow' | 'convergenceStatus'> {
  status: ConvergenceStatus;
  showBorder?: boolean;
}

export function ConvergenceGlassCard({
  status,
  showBorder = true,
  ...props
}: ConvergenceGlassCardProps) {
  const statusBorderColors: Record<ConvergenceStatus, string> = {
    full: 'border-l-[#22C55E]',
    partial: 'border-l-[#EAB308]',
    divergence: 'border-l-[#EF4444]',
    disputed: 'border-l-[#A855F7]',
  };

  return (
    <GlassCard
      {...props}
      convergenceStatus={status}
      glow="convergence"
      className={cn(
        showBorder && 'border-l-4',
        showBorder && statusBorderColors[status],
        props.className
      )}
    />
  );
}

export default GlassCard;
