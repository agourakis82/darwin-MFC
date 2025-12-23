'use client';

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, ReactNode, useState } from 'react';
import { Search, Eye, EyeOff, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// =============================================================================
// TYPES
// =============================================================================

export type InputVariant = 'default' | 'filled' | 'flushed' | 'unstyled';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

export interface SearchInputProps extends Omit<InputProps, 'type'> {
  onSearch?: (value: string) => void;
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: InputVariant;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

// =============================================================================
// STYLES
// =============================================================================

const baseInputStyles = `
  w-full
  text-[#1d1d1f] dark:text-[#f5f5f7]
  placeholder:text-[#86868b]
  transition-all duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
`;

const variantStyles: Record<InputVariant, string> = {
  default: `
    bg-white dark:bg-[#1c1c1e]
    border border-gray-300 dark:border-white/20
    rounded-xl
    focus:border-[#007aff] dark:focus:border-[#5ac8fa]
    focus:ring-2 focus:ring-[#007aff]/20 dark:focus:ring-[#5ac8fa]/20
    focus:outline-none
  `,
  filled: `
    bg-gray-100 dark:bg-white/10
    border-2 border-transparent
    rounded-xl
    focus:bg-white dark:focus:bg-[#1c1c1e]
    focus:border-[#007aff] dark:focus:border-[#5ac8fa]
    focus:outline-none
  `,
  flushed: `
    bg-transparent
    border-b-2 border-gray-300 dark:border-white/20
    rounded-none
    px-0
    focus:border-[#007aff] dark:focus:border-[#5ac8fa]
    focus:outline-none
  `,
  unstyled: `
    bg-transparent
    border-none
    focus:outline-none
  `,
};

const sizeStyles: Record<InputSize, { input: string; label: string }> = {
  sm: { input: 'h-8 px-3 text-sm', label: 'text-xs mb-1' },
  md: { input: 'h-10 px-4 text-base', label: 'text-sm mb-1.5' },
  lg: { input: 'h-12 px-5 text-lg', label: 'text-base mb-2' },
};

const invalidStyles = `
  border-[#ff3b30] dark:border-[#ff453a]
  focus:border-[#ff3b30] dark:focus:border-[#ff453a]
  focus:ring-[#ff3b30]/20 dark:focus:ring-[#ff453a]/20
`;

// =============================================================================
// INPUT COMPONENT
// =============================================================================

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      label,
      helperText,
      errorMessage,
      isInvalid = false,
      leftElement,
      rightElement,
      leftAddon,
      rightAddon,
      clearable = false,
      onClear,
      className,
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = isInvalid || !!errorMessage;
    const showClear = clearable && value && String(value).length > 0;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block font-medium text-[#1d1d1f] dark:text-[#f5f5f7]',
              sizeStyles[size].label
            )}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-stretch">
          {leftAddon && (
            <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-white/5 text-[#86868b] text-sm">
              {leftAddon}
            </span>
          )}

          <div className="relative flex-1">
            {leftElement && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b] pointer-events-none">
                {leftElement}
              </span>
            )}

            <input
              ref={ref}
              id={inputId}
              value={value}
              onChange={onChange}
              className={cn(
                baseInputStyles,
                variantStyles[variant],
                sizeStyles[size].input,
                hasError && invalidStyles,
                leftElement && 'pl-10',
                (rightElement || showClear) && 'pr-10',
                leftAddon && 'rounded-l-none',
                rightAddon && 'rounded-r-none',
                className
              )}
              aria-invalid={hasError}
              aria-describedby={
                errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
              }
              {...props}
            />

            {(rightElement || showClear) && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {showClear && (
                  <button
                    type="button"
                    onClick={onClear}
                    className="p-1 rounded-full text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] hover:bg-gray-100 dark:hover:bg-white/10"
                    aria-label="Clear"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                {rightElement && <span className="text-[#86868b]">{rightElement}</span>}
              </span>
            )}
          </div>

          {rightAddon && (
            <span className="inline-flex items-center px-3 rounded-r-xl border border-l-0 border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-white/5 text-[#86868b] text-sm">
              {rightAddon}
            </span>
          )}
        </div>

        {(errorMessage || helperText) && (
          <p
            id={errorMessage ? `${inputId}-error` : `${inputId}-helper`}
            className={cn(
              'mt-1.5 text-sm',
              errorMessage ? 'text-[#ff3b30] dark:text-[#ff453a]' : 'text-[#86868b]'
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// =============================================================================
// SEARCH INPUT
// =============================================================================

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch, onKeyDown, size = 'md', placeholder = 'Search...', ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch((e.target as HTMLInputElement).value);
      }
      onKeyDown?.(e);
    };

    return (
      <Input
        ref={ref}
        type="search"
        placeholder={placeholder}
        size={size}
        leftElement={<Search className="h-4 w-4" />}
        clearable
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';

// =============================================================================
// PASSWORD INPUT
// =============================================================================

export const PasswordInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-white/10"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

// =============================================================================
// NUMBER INPUT
// =============================================================================

export interface NumberInputProps extends Omit<InputProps, 'type' | 'onChange'> {
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number | undefined) => void;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ min, max, step = 1, onChange, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (val === '') {
        onChange?.(undefined);
      } else {
        const num = parseFloat(val);
        if (!isNaN(num)) {
          onChange?.(num);
        }
      }
    };

    const increment = () => {
      const current = typeof value === 'number' ? value : 0;
      const newValue = current + step;
      if (max === undefined || newValue <= max) {
        onChange?.(newValue);
      }
    };

    const decrement = () => {
      const current = typeof value === 'number' ? value : 0;
      const newValue = current - step;
      if (min === undefined || newValue >= min) {
        onChange?.(newValue);
      }
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          type="number"
          value={value}
          onChange={handleChange as unknown as React.ChangeEventHandler<HTMLInputElement>}
          min={min}
          max={max}
          step={step}
          className="pr-10 [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
          {...props}
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
          <button
            type="button"
            onClick={increment}
            className="h-4 px-1 flex items-center justify-center text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
            aria-label="Increment"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={decrement}
            className="h-4 px-1 flex items-center justify-center text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
            aria-label="Decrement"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';

// =============================================================================
// TEXTAREA
// =============================================================================

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = 'default',
      label,
      helperText,
      errorMessage,
      isInvalid = false,
      resize = 'vertical',
      className,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = isInvalid || !!errorMessage;

    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-1.5"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={cn(
            baseInputStyles,
            variantStyles[variant],
            'py-3 px-4 min-h-[100px]',
            hasError && invalidStyles,
            resizeStyles[resize],
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />

        {(errorMessage || helperText) && (
          <p
            id={errorMessage ? `${inputId}-error` : `${inputId}-helper`}
            className={cn(
              'mt-1.5 text-sm',
              errorMessage ? 'text-[#ff3b30] dark:text-[#ff453a]' : 'text-[#86868b]'
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Input;
