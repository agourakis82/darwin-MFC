'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  description?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
}

/**
 * Checkbox Component - Individual checkbox with label and error states
 *
 * @example
 * <Checkbox
 *   label="I agree to the terms"
 *   required
 * />
 */
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
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
      ...props
    },
    ref
  ) => {
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === ' ') {
          e.preventDefault();
          onCheckedChange?.(checked === 'indeterminate' ? false : !checked);
        }
      },
      [checked, onCheckedChange]
    );

    return (
      <div className={cn('flex items-start gap-3', className)}>
        <CheckboxPrimitive.Root
          ref={ref}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          aria-label={label}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? 'checkbox-error' : helpText ? 'checkbox-help' : undefined}
          className={cn(
            // Layout
            'h-5 w-5 rounded border border-neutral-600',
            // Styling
            'bg-neutral-800 flex items-center justify-center',
            // States
            'hover:border-neutral-500 hover:bg-neutral-700 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
            'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary'
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center text-neutral-900">
            {checked === 'indeterminate' ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Check className="h-4 w-4" />
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {(label || description) && (
          <div
            className="flex flex-col gap-1 cursor-pointer flex-1"
            onClick={() => {
              if (!disabled) {
                onCheckedChange?.(checked === 'indeterminate' ? false : !checked);
              }
            }}
            onKeyDown={handleKeyDown}
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
              <p id="checkbox-error" className="text-xs text-danger">
                {error}
              </p>
            )}
            {helpText && !error && (
              <p id="checkbox-help" className="text-xs text-neutral-400">
                {helpText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export interface CheckboxGroupProps {
  label?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  options: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
  value?: string[];
  onChange?: (values: string[]) => void;
  className?: string;
}

/**
 * CheckboxGroup Component - Multiple checkboxes grouped together
 *
 * @example
 * <CheckboxGroup
 *   label="Select your interests"
 *   options={[
 *     { value: 'cardio', label: 'Cardiology' },
 *     { value: 'neuro', label: 'Neurology' }
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 */
export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      label,
      required = false,
      error,
      helpText,
      options,
      value = [],
      onChange,
      className,
    },
    ref
  ) => {
    const handleChange = React.useCallback(
      (optionValue: string, checked: boolean | 'indeterminate') => {
        if (checked === 'indeterminate') return;
        const newValue = checked
          ? [...value, optionValue]
          : value.filter((v) => v !== optionValue);
        onChange?.(newValue);
      },
      [value, onChange]
    );

    return (
      <div ref={ref} className={cn('flex flex-col gap-3', className)}>
        {label && (
          <label className="text-sm font-medium text-neutral-200">
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        <div className="flex flex-col gap-3">
          {options.map((option) => (
            <Checkbox
              key={option.value}
              checked={value.includes(option.value)}
              onCheckedChange={(checked) => handleChange(option.value, checked)}
              label={option.label}
              description={option.description}
              disabled={option.disabled}
            />
          ))}
        </div>

        {error && <p className="text-xs text-danger">{error}</p>}
        {helpText && !error && <p className="text-xs text-neutral-400">{helpText}</p>}
      </div>
    );
  }
);
CheckboxGroup.displayName = 'CheckboxGroup';

export default Checkbox;
