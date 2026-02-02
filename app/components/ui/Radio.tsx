'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: string;
  description?: string;
}

/**
 * Radio Component - Individual radio button with label
 *
 * @example
 * <Radio value="option1" label="Option 1" />
 */
export const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioProps
>(({ className, label, description, disabled = false, value, ...props }, ref) => (
  <div className="flex items-start gap-3">
    <RadioGroupPrimitive.Item
      ref={ref}
      value={value}
      disabled={disabled}
      className={cn(
        // Layout
        'h-5 w-5 rounded-full border-2 border-neutral-600',
        // Styling
        'bg-neutral-800 flex items-center justify-center',
        // States
        'hover:border-neutral-500 hover:bg-neutral-700 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'data-[state=checked]:border-primary',
        className
      )}
      aria-label={label}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>

    {(label || description) && (
      <div className="flex flex-col gap-1">
        {label && <label className="text-sm font-medium text-neutral-100">{label}</label>}
        {description && <p className="text-xs text-neutral-400">{description}</p>}
      </div>
    )}
  </div>
));
Radio.displayName = 'Radio';

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  label?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  options: RadioOption[];
  className?: string;
}

/**
 * RadioGroup Component - Multiple radio buttons for exclusive selection
 *
 * @example
 * <RadioGroup
 *   label="Select gender"
 *   options={[
 *     { value: 'M', label: 'Male' },
 *     { value: 'F', label: 'Female' }
 *   ]}
 *   value={gender}
 *   onValueChange={setGender}
 * />
 */
export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    {
      label,
      required = false,
      error,
      helpText,
      options,
      value,
      onValueChange,
      className,
      ...props
    },
    ref
  ) => (
    <div className={cn('flex flex-col gap-3', className)}>
      {label && (
        <label className="text-sm font-medium text-neutral-200">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      <RadioGroupPrimitive.Root
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? 'radio-error' : helpText ? 'radio-help' : undefined}
        {...props}
      >
        <div className="flex flex-col gap-3">
          {options.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              label={option.label}
              description={option.description}
              disabled={option.disabled}
            />
          ))}
        </div>
      </RadioGroupPrimitive.Root>

      {error && (
        <p id="radio-error" className="text-xs text-danger">
          {error}
        </p>
      )}
      {helpText && !error && (
        <p id="radio-help" className="text-xs text-neutral-400">
          {helpText}
        </p>
      )}
    </div>
  )
);
RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
