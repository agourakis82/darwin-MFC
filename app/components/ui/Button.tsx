'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

// =============================================================================
// TYPES
// =============================================================================

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

/**
 * Clinical intent for semantic button colors
 * - info: Informational actions (blue)
 * - success: Positive/safe actions (green)
 * - warning: Cautionary actions (amber)
 * - critical: Urgent/dangerous actions (red)
 */
export type ButtonIntent = 'info' | 'success' | 'warning' | 'critical';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Clinical intent - overrides variant color when set */
  intent?: ButtonIntent;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  fullWidth?: boolean;
  /** Enable animations (respects prefers-reduced-motion) */
  animate?: boolean;
}

// =============================================================================
// STYLES
// =============================================================================

const baseStyles = `
  inline-flex items-center justify-center gap-2
  font-medium rounded-xl
  transition-all duration-200 ease-out
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
`;

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-[#007aff] to-[#5856d6]
    text-white
    hover:from-[#0066cc] hover:to-[#4b49b8]
    focus:ring-[#007aff]/50
    shadow-md hover:shadow-lg
    active:scale-[0.98]
  `,
  secondary: `
    bg-[#f5f5f7] dark:bg-white/10
    text-[#1d1d1f] dark:text-[#f5f5f7]
    hover:bg-[#e8e8ed] dark:hover:bg-white/20
    focus:ring-[#86868b]/50
    border border-transparent
  `,
  ghost: `
    bg-transparent
    text-[#1d1d1f] dark:text-[#f5f5f7]
    hover:bg-black/5 dark:hover:bg-white/10
    focus:ring-[#86868b]/50
  `,
  danger: `
    bg-gradient-to-r from-[#ff3b30] to-[#ff6b6b]
    text-white
    hover:from-[#e63329] hover:to-[#e55d5d]
    focus:ring-[#ff3b30]/50
    shadow-md hover:shadow-lg
    active:scale-[0.98]
  `,
  success: `
    bg-gradient-to-r from-[#34c759] to-[#30d158]
    text-white
    hover:from-[#2db84f] hover:to-[#28b94d]
    focus:ring-[#34c759]/50
    shadow-md hover:shadow-lg
    active:scale-[0.98]
  `,
  outline: `
    bg-transparent
    text-[#007aff] dark:text-[#5ac8fa]
    border-2 border-[#007aff] dark:border-[#5ac8fa]
    hover:bg-[#007aff]/10 dark:hover:bg-[#5ac8fa]/10
    focus:ring-[#007aff]/50
  `,
};

/**
 * Intent styles for clinical contexts
 * These override the gradient colors when intent is set
 */
const intentStyles: Record<ButtonIntent, string> = {
  info: `
    bg-gradient-to-r from-[#007aff] to-[#5ac8fa]
    text-white
    hover:from-[#0066cc] hover:to-[#4ab8ea]
    focus:ring-[#007aff]/50
    shadow-md hover:shadow-lg
  `,
  success: `
    bg-gradient-to-r from-[#34c759] to-[#30d158]
    text-white
    hover:from-[#2db84f] hover:to-[#28b94d]
    focus:ring-[#34c759]/50
    shadow-md hover:shadow-lg
  `,
  warning: `
    bg-gradient-to-r from-[#ff9500] to-[#ffb340]
    text-white
    hover:from-[#e68600] hover:to-[#e6a030]
    focus:ring-[#ff9500]/50
    shadow-md hover:shadow-lg
  `,
  critical: `
    bg-gradient-to-r from-[#ff3b30] to-[#ff6b6b]
    text-white
    hover:from-[#e63329] hover:to-[#e55d5d]
    focus:ring-[#ff3b30]/50
    shadow-md hover:shadow-lg
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
  icon: 'h-10 w-10 p-0',
};

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * @description A versatile button component with multiple variants, sizes, and animation support.
 * Supports loading states, icons, and full-width layouts. Uses Framer Motion for smooth animations.
 *
 * @param props - The button properties
 * @param props.variant - Visual style variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline'. Defaults to 'primary'.
 * @param props.size - Button size: 'sm' | 'md' | 'lg' | 'icon'. Defaults to 'md'.
 * @param props.isLoading - Shows a loading spinner and disables the button. Defaults to false.
 * @param props.isDisabled - Disables the button. Defaults to false.
 * @param props.leftIcon - Icon element to display on the left side of the button text.
 * @param props.rightIcon - Icon element to display on the right side of the button text.
 * @param props.children - Button content/label.
 * @param props.fullWidth - Makes the button take full width of its container. Defaults to false.
 * @param props.animate - Enables Framer Motion hover/tap animations. Defaults to true.
 * @param props.className - Additional CSS classes to apply.
 *
 * @example
 * // Primary button with loading state
 * <Button variant="primary" isLoading>
 *   Saving...
 * </Button>
 *
 * @example
 * // Danger button with left icon
 * <Button variant="danger" leftIcon={<TrashIcon />}>
 *   Delete
 * </Button>
 *
 * @example
 * // Full-width secondary button
 * <Button variant="secondary" fullWidth>
 *   Cancel
 * </Button>
 *
 * @returns {JSX.Element} A styled button element with optional animations
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      intent,
      isLoading = false,
      isDisabled = false,
      leftIcon,
      rightIcon,
      children,
      fullWidth = false,
      animate = true,
      className,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const disabled = isDisabled || isLoading;

    // Determine if we should animate (user preference overrides)
    const shouldAnimate = animate && !prefersReducedMotion;

    const buttonContent = (
      <>
        {isLoading ? (
          <Loader2
            className={cn(
              "h-4 w-4",
              !prefersReducedMotion && "animate-spin"
            )}
            aria-hidden="true"
          />
        ) : leftIcon ? (
          <span className="flex-shrink-0" aria-hidden="true">{leftIcon}</span>
        ) : null}
        {children && <span>{children}</span>}
        {rightIcon && !isLoading && (
          <span className="flex-shrink-0" aria-hidden="true">{rightIcon}</span>
        )}
      </>
    );

    // Intent overrides variant styles when set
    const colorStyles = intent ? intentStyles[intent] : variantStyles[variant];

    const buttonClasses = cn(
      baseStyles,
      colorStyles,
      sizeStyles[size],
      fullWidth && 'w-full',
      className
    );

    if (shouldAnimate) {
      return (
        <motion.button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={buttonClasses}
          disabled={disabled}
          aria-busy={isLoading}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          transition={{ duration: 0.15 }}
          {...(props as HTMLMotionProps<'button'>)}
        >
          {buttonContent}
        </motion.button>
      );
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled}
        aria-busy={isLoading}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = 'Button';

// =============================================================================
// BUTTON GROUP
// =============================================================================

export interface ButtonGroupProps {
  children: ReactNode;
  attached?: boolean;
  className?: string;
}

/**
 * @description A container component for grouping multiple buttons together.
 * Supports attached mode where buttons visually connect without gaps.
 *
 * @param props - The button group properties
 * @param props.children - Button elements to group together.
 * @param props.attached - When true, buttons are visually connected. Defaults to false.
 * @param props.className - Additional CSS classes to apply.
 *
 * @example
 * // Attached button group for segmented control
 * <ButtonGroup attached>
 *   <Button variant="secondary">Left</Button>
 *   <Button variant="secondary">Middle</Button>
 *   <Button variant="secondary">Right</Button>
 * </ButtonGroup>
 *
 * @returns {JSX.Element} A flex container with grouped buttons
 */
export function ButtonGroup({ children, attached = false, className }: ButtonGroupProps) {
  return (
    <div
      className={cn(
        'inline-flex',
        attached && '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:-ml-px',
        !attached && 'gap-2',
        className
      )}
    >
      {children}
    </div>
  );
}

// =============================================================================
// ICON BUTTON
// =============================================================================

export interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'children'> {
  icon: ReactNode;
  'aria-label': string;
}

/**
 * @description A button component designed specifically for icon-only actions.
 * Requires an aria-label for accessibility.
 *
 * @param props - The icon button properties
 * @param props.icon - The icon element to display.
 * @param props.aria-label - Required accessibility label describing the button action.
 * @param props.size - Button size, defaults to 'icon' for square proportions.
 * @param props.variant - Visual style variant inherited from Button.
 *
 * @example
 * // Icon button for settings
 * <IconButton
 *   icon={<SettingsIcon />}
 *   aria-label="Open settings"
 *   variant="ghost"
 * />
 *
 * @returns {JSX.Element} A square button containing only an icon
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'icon', ...props }, ref) => {
    return (
      <Button ref={ref} size={size} {...props}>
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default Button;
