/**
 * Accessible Button Component
 * WCAG 2.2 AAA Compliant
 * Minimum touch target: 44x44px
 * Focus indicator: 3px minimum
 */

'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface AccessibleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      // Minimum touch target for AAA (44x44px)
      'min-h-[44px]',
      'min-w-[44px]',
      
      // Focus indicator for AAA (3px minimum)
      'focus:outline-none',
      'focus:ring-4',
      'focus:ring-offset-2',
      
      // Transition
      'transition-all',
      'duration-200',
      'ease-in-out',
      
      // Disabled state
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      
      // Base styles
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'rounded-lg',
    ];

    const variants = {
      primary: [
        'bg-blue-600',
        'text-white',
        'hover:bg-blue-700',
        'focus:ring-blue-300',
        'active:bg-blue-800',
      ],
      secondary: [
        'bg-gray-200',
        'text-gray-900',
        'hover:bg-gray-300',
        'focus:ring-gray-400',
        'active:bg-gray-400',
      ],
      danger: [
        'bg-red-600',
        'text-white',
        'hover:bg-red-700',
        'focus:ring-red-300',
        'active:bg-red-800',
      ],
      ghost: [
        'bg-transparent',
        'text-gray-700',
        'hover:bg-gray-100',
        'focus:ring-gray-300',
        'active:bg-gray-200',
      ],
    };

    const sizes = {
      sm: ['px-4', 'py-2', 'text-sm'],
      md: ['px-6', 'py-3', 'text-base'],
      lg: ['px-8', 'py-4', 'text-lg'],
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span aria-hidden="true">{children}</span>
            <span className="sr-only">Carregando...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;
