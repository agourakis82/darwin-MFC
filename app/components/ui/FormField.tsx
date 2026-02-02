'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface FormFieldProps {
  label?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  hint?: string;
  layout?: 'vertical' | 'horizontal';
}

/**
 * FormField Component - Wrapper for form inputs with label, error, and help text
 *
 * Can be used standalone or with any form control component.
 *
 * @example
 * <FormField
 *   label="Email"
 *   error={errors.email?.message}
 *   helpText="We'll never share your email"
 * >
 *   <input type="email" {...register('email')} />
 * </FormField>
 */
export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      error,
      helpText,
      required = false,
      children,
      className,
      hint,
      layout = 'vertical',
    },
    ref
  ) => {
    const isHorizontal = layout === 'horizontal';

    return (
      <div
        ref={ref}
        className={cn(
          isHorizontal ? 'flex items-start gap-4' : 'flex flex-col gap-2',
          className
        )}
      >
        {label && (
          <div className={isHorizontal ? 'w-1/3 flex-shrink-0' : ''}>
            <label className="text-sm font-medium text-neutral-200">
              {label}
              {required && <span className="text-danger ml-1">*</span>}
              {hint && (
                <span className="ml-1 text-xs text-neutral-400">({hint})</span>
              )}
            </label>
          </div>
        )}

        <div
          className={cn(
            'flex flex-col gap-2',
            isHorizontal && label ? 'w-2/3 flex-1' : ''
          )}
        >
          {children}

          {error && (
            <p className="text-xs text-danger flex items-center gap-1">
              <span>⚠</span>
              {error}
            </p>
          )}
          {helpText && !error && (
            <p className="text-xs text-neutral-400">{helpText}</p>
          )}
        </div>
      </div>
    );
  }
);
FormField.displayName = 'FormField';

export default FormField;
