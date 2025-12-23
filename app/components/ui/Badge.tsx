'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

// =============================================================================
// TYPES
// =============================================================================

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'outline';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  dot?: boolean;
  pulse?: boolean;
}

// =============================================================================
// STYLES
// =============================================================================

const baseStyles = `
  inline-flex items-center justify-center gap-1
  font-medium rounded-full
  whitespace-nowrap
  transition-colors duration-150
`;

const variantStyles: Record<BadgeVariant, string> = {
  default: `
    bg-gray-100 dark:bg-white/10
    text-gray-700 dark:text-gray-300
  `,
  primary: `
    bg-[#007aff]/10 dark:bg-[#5ac8fa]/15
    text-[#007aff] dark:text-[#5ac8fa]
  `,
  secondary: `
    bg-[#5856d6]/10 dark:bg-[#bf5af2]/15
    text-[#5856d6] dark:text-[#bf5af2]
  `,
  success: `
    bg-[#34c759]/10 dark:bg-[#30d158]/15
    text-[#34c759] dark:text-[#30d158]
  `,
  warning: `
    bg-[#ff9500]/10 dark:bg-[#ff9f0a]/15
    text-[#ff9500] dark:text-[#ff9f0a]
  `,
  danger: `
    bg-[#ff3b30]/10 dark:bg-[#ff453a]/15
    text-[#ff3b30] dark:text-[#ff453a]
  `,
  info: `
    bg-[#5ac8fa]/10 dark:bg-[#64d2ff]/15
    text-[#5ac8fa] dark:text-[#64d2ff]
  `,
  outline: `
    bg-transparent
    border border-current
    text-gray-600 dark:text-gray-400
  `,
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'h-5 px-2 text-xs',
  md: 'h-6 px-2.5 text-sm',
  lg: 'h-7 px-3 text-sm',
};

// =============================================================================
// BADGE COMPONENT
// =============================================================================

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      icon,
      removable = false,
      onRemove,
      dot = false,
      pulse = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {dot && (
          <span className="relative flex h-2 w-2">
            {pulse && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
            )}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
          </span>
        )}
        {icon && <span className="flex-shrink-0 -ml-0.5">{icon}</span>}
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="flex-shrink-0 -mr-1 ml-0.5 h-4 w-4 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Remove"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// =============================================================================
// STATUS BADGE (for online/offline, active/inactive states)
// =============================================================================

export type StatusType = 'online' | 'offline' | 'busy' | 'away' | 'active' | 'inactive' | 'pending';

export interface StatusBadgeProps extends Omit<BadgeProps, 'variant' | 'dot' | 'pulse'> {
  status: StatusType;
  showLabel?: boolean;
}

const statusConfig: Record<StatusType, { variant: BadgeVariant; label: string; pulse?: boolean }> = {
  online: { variant: 'success', label: 'Online', pulse: true },
  offline: { variant: 'default', label: 'Offline' },
  busy: { variant: 'danger', label: 'Busy' },
  away: { variant: 'warning', label: 'Away' },
  active: { variant: 'success', label: 'Active' },
  inactive: { variant: 'default', label: 'Inactive' },
  pending: { variant: 'warning', label: 'Pending', pulse: true },
};

export function StatusBadge({ status, showLabel = true, size = 'sm', ...props }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} size={size} dot pulse={config.pulse} {...props}>
      {showLabel && config.label}
    </Badge>
  );
}

// =============================================================================
// CATEGORY BADGE (for disease categories, medication types, etc.)
// =============================================================================

export type CategoryType =
  | 'cardiovascular'
  | 'respiratory'
  | 'neurological'
  | 'gastrointestinal'
  | 'endocrine'
  | 'infectious'
  | 'mental_health'
  | 'musculoskeletal'
  | 'dermatological'
  | 'pediatric'
  | 'geriatric'
  | 'oncology'
  | 'other';

export interface CategoryBadgeProps extends Omit<BadgeProps, 'variant'> {
  category: CategoryType;
}

const categoryConfig: Record<CategoryType, { variant: BadgeVariant; icon: string }> = {
  cardiovascular: { variant: 'danger', icon: '❤️' },
  respiratory: { variant: 'info', icon: '🫁' },
  neurological: { variant: 'secondary', icon: '🧠' },
  gastrointestinal: { variant: 'warning', icon: '🫃' },
  endocrine: { variant: 'primary', icon: '⚡' },
  infectious: { variant: 'danger', icon: '🦠' },
  mental_health: { variant: 'secondary', icon: '🧘' },
  musculoskeletal: { variant: 'info', icon: '🦴' },
  dermatological: { variant: 'warning', icon: '🩹' },
  pediatric: { variant: 'primary', icon: '👶' },
  geriatric: { variant: 'info', icon: '👴' },
  oncology: { variant: 'danger', icon: '🎗️' },
  other: { variant: 'default', icon: '📋' },
};

const categoryLabels: Record<CategoryType, string> = {
  cardiovascular: 'Cardiovascular',
  respiratory: 'Respiratory',
  neurological: 'Neurological',
  gastrointestinal: 'Gastrointestinal',
  endocrine: 'Endocrine',
  infectious: 'Infectious',
  mental_health: 'Mental Health',
  musculoskeletal: 'Musculoskeletal',
  dermatological: 'Dermatological',
  pediatric: 'Pediatric',
  geriatric: 'Geriatric',
  oncology: 'Oncology',
  other: 'Other',
};

export function CategoryBadge({ category, children, ...props }: CategoryBadgeProps) {
  const config = categoryConfig[category];
  const label = children || categoryLabels[category];

  return (
    <Badge variant={config.variant} {...props}>
      <span className="-ml-0.5">{config.icon}</span>
      {label}
    </Badge>
  );
}

// =============================================================================
// EVIDENCE BADGE (GRADE levels A, B, C, D, GPP)
// =============================================================================

export type EvidenceLevel = 'A' | 'B' | 'C' | 'D' | 'GPP';

export interface EvidenceBadgeProps extends Omit<BadgeProps, 'variant'> {
  level: EvidenceLevel;
  showDescription?: boolean;
}

const evidenceConfig: Record<EvidenceLevel, { variant: BadgeVariant; label: string; description: string }> = {
  A: { variant: 'success', label: 'A', description: 'Strong evidence' },
  B: { variant: 'primary', label: 'B', description: 'Moderate evidence' },
  C: { variant: 'warning', label: 'C', description: 'Weak evidence' },
  D: { variant: 'default', label: 'D', description: 'Expert opinion' },
  GPP: { variant: 'info', label: 'GPP', description: 'Good practice point' },
};

export function EvidenceBadge({ level, showDescription = false, size = 'sm', ...props }: EvidenceBadgeProps) {
  const config = evidenceConfig[level];

  return (
    <Badge variant={config.variant} size={size} {...props}>
      {config.label}
      {showDescription && <span className="opacity-70 ml-1">• {config.description}</span>}
    </Badge>
  );
}

// =============================================================================
// BADGE GROUP
// =============================================================================

export interface BadgeGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: BadgeSize;
}

export function BadgeGroup({ max, size = 'sm', className, children, ...props }: BadgeGroupProps) {
  const items = Array.isArray(children) ? children : [children];
  const visibleItems = max ? items.slice(0, max) : items;
  const remainingCount = max ? Math.max(0, items.length - max) : 0;

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)} {...props}>
      {visibleItems}
      {remainingCount > 0 && (
        <Badge variant="default" size={size}>
          +{remainingCount}
        </Badge>
      )}
    </div>
  );
}

export default Badge;
