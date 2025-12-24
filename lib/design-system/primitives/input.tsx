/**
 * INPUT PRIMITIVE
 * ===============
 *
 * Flexible input component with comprehensive variant and state support
 * Supports icons, loading states, and clinical validation states
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const inputVariants = cva(
  // Base styles
  [
    'flex w-full rounded-md',
    'border border-neutral-300 dark:border-neutral-700',
    'bg-white dark:bg-neutral-900',
    'px-3 py-2',
    'text-base',
    'transition-all duration-200',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-neutral-400 dark:placeholder:text-neutral-600',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      // Size variants
      size: {
        sm: 'h-9 px-2 text-sm',
        md: 'h-10 px-3 text-base',
        lg: 'h-11 px-4 text-lg',
      },

      // State variants
      state: {
        default: '',
        error: [
          'border-red-500 dark:border-red-600',
          'focus-visible:ring-red-500',
          'bg-red-50/50 dark:bg-red-900/10',
        ],
        success: [
          'border-green-500 dark:border-green-600',
          'focus-visible:ring-green-500',
          'bg-green-50/50 dark:bg-green-900/10',
        ],
        warning: [
          'border-amber-500 dark:border-amber-600',
          'focus-visible:ring-amber-500',
          'bg-amber-50/50 dark:bg-amber-900/10',
        ],
      },

      // Rounded variants
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
      rounded: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Icon to display before input
   */
  iconBefore?: React.ReactNode;

  /**
   * Icon to display after input
   */
  iconAfter?: React.ReactNode;

  /**
   * Show loading spinner
   */
  loading?: boolean;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Helper text to display
   */
  helperText?: string;

  /**
   * Label for the input
   */
  label?: string;

  /**
   * Required indicator
   */
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      size,
      state,
      rounded,
      iconBefore,
      iconAfter,
      loading,
      error,
      helperText,
      label,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const hasError = error || state === 'error';
    const effectiveState = hasError ? 'error' : state;

    return (
      <div className="w-full space-y-2">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Icon Before */}
          {iconBefore && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-600">
              {iconBefore}
            </div>
          )}

          {/* Input Element */}
          <input
            type={type}
            id={inputId}
            className={cn(
              inputVariants({ size, state: effectiveState, rounded }),
              iconBefore && 'pl-10',
              (iconAfter || loading) && 'pr-10',
              className
            )}
            ref={ref}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            {...props}
          />

          {/* Loading Spinner or Icon After */}
          {(loading || iconAfter) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-600">
              {loading ? (
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
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
              ) : (
                iconAfter
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {!error && helperText && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-neutral-600 dark:text-neutral-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
