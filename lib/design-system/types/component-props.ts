/**
 * Darwin-MFC Design System - Unified Component Props
 * ===================================================
 * Standard prop interfaces for consistent API across all components.
 *
 * USAGE:
 * Components should extend these base interfaces to ensure consistent
 * naming conventions and behavior across the design system.
 */

import { ReactNode } from 'react';

// =============================================================================
// SIZE SYSTEM
// =============================================================================

/**
 * Standard size scale for all components
 * - xs: Extra small (compact contexts, badges, pills)
 * - sm: Small (secondary actions, tight layouts)
 * - md: Medium (default, most common)
 * - lg: Large (primary actions, emphasis)
 * - xl: Extra large (hero sections, prominent CTAs)
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Simplified size scale for components with fewer size options
 */
export type SimplifiedSize = 'sm' | 'md' | 'lg';

// =============================================================================
// VARIANT SYSTEM
// =============================================================================

/**
 * Standard visual variants for interactive components
 * - primary: Main action, high emphasis
 * - secondary: Supporting action, medium emphasis
 * - tertiary: Low-priority action, minimal emphasis
 * - ghost: Transparent background, visible on hover
 * - outline: Border-only style
 */
export type ComponentVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'outline';

// =============================================================================
// INTENT SYSTEM (Clinical Context)
// =============================================================================

/**
 * Semantic intent for clinical contexts
 * Maps to specific colors with medical meaning:
 * - neutral: Default, no specific meaning
 * - info: Informational (blue) - educational content
 * - success: Safe/positive (green) - normal results, confirmations
 * - warning: Caution (amber) - requires attention, contraindications
 * - critical: Urgent/danger (red) - emergencies, severe conditions, alerts
 */
export type ComponentIntent = 'neutral' | 'info' | 'success' | 'warning' | 'critical';

/**
 * Legacy intent names for backwards compatibility
 * @deprecated Use ComponentIntent instead
 */
export type LegacyIntent = 'default' | 'primary' | 'secondary' | 'destructive' | 'danger';

// =============================================================================
// BASE COMPONENT PROPS
// =============================================================================

/**
 * Base props that ALL components should support
 */
export interface BaseComponentProps {
  /** Additional CSS classes */
  className?: string;
  /** React children */
  children?: ReactNode;
  /** Component size */
  size?: ComponentSize;
  /** Visual variant */
  variant?: ComponentVariant;
  /** Semantic intent (clinical context) */
  intent?: ComponentIntent;
  /** Loading state - shows spinner, disables interaction */
  isLoading?: boolean;
  /** Disabled state - reduces opacity, prevents interaction */
  isDisabled?: boolean;
  /** Test ID for automated testing */
  'data-testid'?: string;
}

/**
 * Props for components that can be pressed/clicked
 */
export interface PressableProps extends BaseComponentProps {
  /** Click handler */
  onClick?: (event: React.MouseEvent) => void;
  /** Keyboard handler */
  onKeyDown?: (event: React.KeyboardEvent) => void;
  /** Focus handler */
  onFocus?: (event: React.FocusEvent) => void;
  /** Blur handler */
  onBlur?: (event: React.FocusEvent) => void;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
}

/**
 * Base props for form input components
 * Note: Named BaseInputProps to avoid collision with primitives/input.tsx InputProps
 */
export interface BaseInputProps extends BaseComponentProps {
  /** Input name attribute */
  name?: string;
  /** Current value */
  value?: string | number;
  /** Default value (uncontrolled) */
  defaultValue?: string | number;
  /** Change handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Required field */
  required?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Invalid state - shows error styling */
  isInvalid?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Helper text below input */
  helperText?: string;
  /** Label for the input */
  label?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** ARIA describedby for accessibility */
  'aria-describedby'?: string;
}

// =============================================================================
// MODAL/OVERLAY PROPS
// =============================================================================

/**
 * Props for modal/overlay components
 */
export interface OverlayProps {
  /** Whether the overlay is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Close when clicking outside */
  closeOnOverlayClick?: boolean;
  /** Close when pressing Escape */
  closeOnEsc?: boolean;
  /** Show close button */
  showCloseButton?: boolean;
  /** Overlay title */
  title?: ReactNode;
  /** Overlay description */
  description?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Extract props type from a component
 */
export type PropsOf<C extends React.ComponentType<object>> = C extends React.ComponentType<infer P> ? P : never;

/**
 * Make specific props required
 */
export type RequiredProps<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Make all props optional except specified ones
 */
export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;

// =============================================================================
// INTENT TO COLOR MAPPING
// =============================================================================

/**
 * Maps intent to CSS variable names for consistent coloring
 */
export const intentColorMap: Record<ComponentIntent, string> = {
  neutral: 'var(--color-text-primary)',
  info: 'var(--color-intent-info, #007aff)',
  success: 'var(--color-intent-success, #34c759)',
  warning: 'var(--color-intent-warning, #ff9500)',
  critical: 'var(--color-intent-critical, #ff3b30)',
} as const;

/**
 * Maps intent to background color CSS variable names
 */
export const intentBgColorMap: Record<ComponentIntent, string> = {
  neutral: 'var(--color-bg-subtle)',
  info: 'var(--color-intent-info-bg, rgba(0, 122, 255, 0.1))',
  success: 'var(--color-intent-success-bg, rgba(52, 199, 89, 0.1))',
  warning: 'var(--color-intent-warning-bg, rgba(255, 149, 0, 0.1))',
  critical: 'var(--color-intent-critical-bg, rgba(255, 59, 48, 0.1))',
} as const;

// =============================================================================
// SIZE TO TAILWIND MAPPING
// =============================================================================

/**
 * Maps component size to height classes
 */
export const sizeHeightMap: Record<ComponentSize, string> = {
  xs: 'h-6',
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
  xl: 'h-14',
} as const;

/**
 * Maps component size to padding classes
 */
export const sizePaddingMap: Record<ComponentSize, string> = {
  xs: 'px-2 py-0.5',
  sm: 'px-3 py-1',
  md: 'px-4 py-2',
  lg: 'px-6 py-3',
  xl: 'px-8 py-4',
} as const;

/**
 * Maps component size to text size classes
 */
export const sizeTextMap: Record<ComponentSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
} as const;

export default BaseComponentProps;
