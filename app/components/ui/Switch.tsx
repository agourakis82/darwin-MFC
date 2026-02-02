'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
  description?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Switch Component - Toggle switch for boolean states
 *
 * @example
 * <Switch
 *   label="Enable dark mode"
 *   checked={darkMode}
 *   onCheckedChange={setDarkMode}
 * />
 */
export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    {
      className,
      label,
      description,
      error,
      helpText,
      required = false,
      disabled = false,
      checked,
      onCheckedChange,
      size = 'md',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'h-5 w-9',
      md: 'h-6 w-11',
      lg: 'h-8 w-14',
    };

    const thumbClasses = {
      sm: 'h-4 w-4 data-[state=checked]:translate-x-4',
      md: 'h-5 w-5 data-[state=checked]:translate-x-5',
      lg: 'h-7 w-7 data-[state=checked]:translate-x-6',
    };

    return (
      <div className={cn('flex items-start gap-3', className)}>
        <SwitchPrimitive.Root
          ref={ref}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          aria-label={label}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? 'switch-error' : helpText ? 'switch-help' : undefined}
          className={cn(
            // Layout
            sizeClasses[size],
            'rounded-full',
            // Styling
            'bg-neutral-700 border border-neutral-600',
            // States
            'hover:border-neutral-500 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
            'data-[state=unchecked]:bg-neutral-700'
          )}
          {...props}
        >
          <SwitchPrimitive.Thumb
            className={cn(
              // Layout
              thumbClasses[size],
              'rounded-full',
              // Styling
              'bg-white shadow-md',
              // Animation
              'transition-transform duration-200'
            )}
          />
        </SwitchPrimitive.Root>

        {(label || description) && (
          <div
            className="flex flex-col gap-1 cursor-pointer flex-1"
            onClick={() => {
              if (!disabled) {
                onCheckedChange?.(!checked);
              }
            }}
            role="button"
            tabIndex={0}
          >
            {label && (
              <label className="text-sm font-medium text-neutral-100">
                {label}
                {required && <span className="text-danger ml-1">*</span>}
              </label>
            )}
            {description && <p className="text-xs text-neutral-400">{description}</p>}
            {error && (
              <p id="switch-error" className="text-xs text-danger">
                {error}
              </p>
            )}
            {helpText && !error && (
              <p id="switch-help" className="text-xs text-neutral-400">
                {helpText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Switch.displayName = 'Switch';

export default Switch;
