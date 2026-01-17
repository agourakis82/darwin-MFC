'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

// =============================================================================
// TYPES
// =============================================================================

export type BadgeVariant =
  | 'default'
  | 'neutral'  // Alias for default (preferred)
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'outline';

export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Clinical intent for semantic badge colors
 * - info: Informational (blue) - educational content
 * - success: Safe/positive (green) - normal results
 * - warning: Caution (amber) - requires attention
 * - critical: Urgent/danger (red) - emergencies, alerts
 */
export type BadgeIntent = 'neutral' | 'info' | 'success' | 'warning' | 'critical';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Clinical intent - overrides variant color when set */
  intent?: BadgeIntent;
  size?: BadgeSize;
  icon?: ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  dot?: boolean;
  /** Pulsing dot (respects prefers-reduced-motion) */
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

const neutralStyle = `
  bg-gray-100 dark:bg-white/10
  text-gray-700 dark:text-gray-300
`;

const variantStyles: Record<BadgeVariant, string> = {
  default: neutralStyle,
  neutral: neutralStyle,  // Preferred name (alias)
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

/**
 * Intent styles for clinical contexts
 * Maps to semantic colors with medical meaning
 */
const intentStyles: Record<BadgeIntent, string> = {
  neutral: neutralStyle,
  info: `
    bg-[#007aff]/10 dark:bg-[#5ac8fa]/15
    text-[#007aff] dark:text-[#5ac8fa]
  `,
  success: `
    bg-[#34c759]/10 dark:bg-[#30d158]/15
    text-[#34c759] dark:text-[#30d158]
  `,
  warning: `
    bg-[#ff9500]/10 dark:bg-[#ff9f0a]/15
    text-[#ff9500] dark:text-[#ff9f0a]
  `,
  critical: `
    bg-[#ff3b30]/10 dark:bg-[#ff453a]/15
    text-[#ff3b30] dark:text-[#ff453a]
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

/**
 * @description A versatile badge/tag component for displaying labels, statuses, and categories.
 * Supports multiple color variants, sizes, icons, dot indicators, and removable functionality.
 *
 * @param props - The badge properties
 * @param props.variant - Color variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline'. Defaults to 'default'.
 * @param props.size - Badge size: 'sm' | 'md' | 'lg'. Defaults to 'md'.
 * @param props.icon - Icon element to display before the badge text.
 * @param props.removable - Shows a remove button on the right side. Defaults to false.
 * @param props.onRemove - Callback function when the remove button is clicked.
 * @param props.dot - Shows a small dot indicator before the text. Defaults to false.
 * @param props.pulse - Animates the dot indicator with a pulsing effect. Defaults to false.
 * @param props.children - Badge text content.
 * @param props.className - Additional CSS classes to apply.
 *
 * @example
 * // Simple status badge
 * <Badge variant="success">Active</Badge>
 *
 * @example
 * // Badge with pulsing dot indicator
 * <Badge variant="warning" dot pulse>
 *   Processing
 * </Badge>
 *
 * @example
 * // Removable tag badge
 * <Badge removable onRemove={() => handleRemove()}>
 *   Tag Name
 * </Badge>
 *
 * @returns {JSX.Element} A styled badge element
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      intent,
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
    const prefersReducedMotion = useReducedMotion();

    // Intent overrides variant styles when set
    const colorStyles = intent ? intentStyles[intent] : variantStyles[variant];

    // Respect reduced motion preference for pulse animation
    const shouldPulse = pulse && !prefersReducedMotion;

    return (
      <span
        ref={ref}
        className={cn(baseStyles, colorStyles, sizeStyles[size], className)}
        {...props}
      >
        {dot && (
          <span className="relative flex h-2 w-2">
            {shouldPulse && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
            )}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
          </span>
        )}
        {icon && <span className="flex-shrink-0 -ml-0.5" aria-hidden="true">{icon}</span>}
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="flex-shrink-0 -mr-1 ml-0.5 h-4 w-4 rounded-full flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Remove"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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

/**
 * @description A specialized badge for displaying online/offline and activity statuses.
 * Automatically applies appropriate colors and pulsing animations based on status type.
 *
 * @param props - The status badge properties
 * @param props.status - Status type: 'online' | 'offline' | 'busy' | 'away' | 'active' | 'inactive' | 'pending'.
 * @param props.showLabel - Whether to display the status text label. Defaults to true.
 * @param props.size - Badge size. Defaults to 'sm'.
 *
 * @example
 * // Online status with label
 * <StatusBadge status="online" />
 *
 * @example
 * // Dot-only offline indicator
 * <StatusBadge status="offline" showLabel={false} />
 *
 * @returns {JSX.Element} A status indicator badge with dot and optional label
 */
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

/**
 * @description A specialized badge for medical/health categories with built-in emoji icons.
 * Automatically applies appropriate colors and icons based on the category type.
 *
 * @param props - The category badge properties
 * @param props.category - Medical category: 'cardiovascular' | 'respiratory' | 'neurological' | 'gastrointestinal' | 'endocrine' | 'infectious' | 'mental_health' | 'musculoskeletal' | 'dermatological' | 'pediatric' | 'geriatric' | 'oncology' | 'other'.
 * @param props.children - Optional custom label text. If not provided, uses the category's default label.
 *
 * @example
 * // Cardiovascular category badge
 * <CategoryBadge category="cardiovascular" />
 *
 * @example
 * // Custom label for pediatric category
 * <CategoryBadge category="pediatric">Child Health</CategoryBadge>
 *
 * @returns {JSX.Element} A category badge with emoji icon and label
 */
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

/**
 * @description A specialized badge for displaying GRADE evidence levels in academic/medical contexts.
 * Automatically applies appropriate colors based on evidence strength.
 *
 * @param props - The evidence badge properties
 * @param props.level - Evidence level: 'A' (strong) | 'B' (moderate) | 'C' (weak) | 'D' (expert opinion) | 'GPP' (good practice point).
 * @param props.showDescription - Whether to display the evidence description alongside the level. Defaults to false.
 * @param props.size - Badge size. Defaults to 'sm'.
 *
 * @example
 * // Level A evidence badge
 * <EvidenceBadge level="A" />
 *
 * @example
 * // Evidence badge with description
 * <EvidenceBadge level="B" showDescription />
 *
 * @returns {JSX.Element} An evidence level badge with optional description
 */
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

/**
 * @description A container component for grouping multiple badges with optional truncation.
 * Shows a "+N" badge when the number of badges exceeds the specified maximum.
 *
 * @param props - The badge group properties
 * @param props.max - Maximum number of badges to display before truncating. Remaining count shown as "+N".
 * @param props.size - Size applied to the overflow "+N" badge. Defaults to 'sm'.
 * @param props.children - Badge elements to display in the group.
 * @param props.className - Additional CSS classes to apply.
 *
 * @example
 * // Badge group with truncation
 * <BadgeGroup max={3}>
 *   <Badge>Tag 1</Badge>
 *   <Badge>Tag 2</Badge>
 *   <Badge>Tag 3</Badge>
 *   <Badge>Tag 4</Badge>
 *   <Badge>Tag 5</Badge>
 * </BadgeGroup>
 * // Renders: Tag 1, Tag 2, Tag 3, +2
 *
 * @returns {JSX.Element} A flex container with grouped badges and optional overflow indicator
 */
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
