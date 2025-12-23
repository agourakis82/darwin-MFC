'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// =============================================================================
// TYPES
// =============================================================================

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  fullWidth?: boolean;
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

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
  icon: 'h-10 w-10 p-0',
};

// =============================================================================
// COMPONENT
// =============================================================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
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
    const disabled = isDisabled || isLoading;

    const buttonContent = (
      <>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : leftIcon ? (
          <span className="flex-shrink-0">{leftIcon}</span>
        ) : null}
        {children && <span>{children}</span>}
        {rightIcon && !isLoading && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </>
    );

    const buttonClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      className
    );

    if (animate) {
      return (
        <motion.button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={buttonClasses}
          disabled={disabled}
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
