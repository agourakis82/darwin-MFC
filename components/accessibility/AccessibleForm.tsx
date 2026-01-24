/**
 * Accessible Form Components
 * WCAG 2.2 AAA Compliant
 * Proper labels, error messages, and ARIA attributes
 */

'use client';

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

// Form field wrapper
export interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, error, hint, required, children }: FormFieldProps) {
  const fieldId = Math.random().toString(36).substring(2, 9);
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-600 ml-1" aria-label="obrigatório">*</span>}
      </label>
      {children}
      {hint && (
        <p id={hintId} className="text-sm text-gray-500">
          {hint}
        </p>
      )}
      {error && (
        <div
          id={errorId}
          className="flex items-center gap-1 text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-4 h-4" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

// Accessible Input
export interface AccessibleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ label, error, hint, required, className, id, ...props }, ref) => {
    const inputId = id || Math.random().toString(36).substring(2, 9);
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    const baseStyles = [
      'w-full px-4 py-3',
      'min-h-[44px]', // AAA touch target
      'border border-gray-300 rounded-lg',
      'text-gray-900',
      'placeholder:text-gray-400',
      'focus:outline-none',
      'focus:ring-4',
      'focus:ring-blue-300',
      'focus:border-blue-500',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'transition-colors',
    ];

    const errorStyles = error
      ? ['border-red-500', 'focus:ring-red-300', 'focus:border-red-500']
      : [];

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-red-600 ml-1" aria-label="obrigatório">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(
            error && errorId,
            hint && hintId
          )}
          className={cn(baseStyles, errorStyles, className)}
          {...props}
        />
        {hint && (
          <p id={hintId} className="text-sm text-gray-500">
            {hint}
          </p>
        )}
        {error && (
          <div
            id={errorId}
            className="flex items-center gap-1 text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = 'AccessibleInput';

// Accessible Textarea
export interface AccessibleTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const AccessibleTextarea = forwardRef<HTMLTextAreaElement, AccessibleTextareaProps>(
  ({ label, error, hint, required, className, id, ...props }, ref) => {
    const textareaId = id || Math.random().toString(36).substring(2, 9);
    const errorId = `${textareaId}-error`;
    const hintId = `${textareaId}-hint`;

    const baseStyles = [
      'w-full px-4 py-3',
      'min-h-[44px]', // AAA touch target
      'border border-gray-300 rounded-lg',
      'text-gray-900',
      'placeholder:text-gray-400',
      'focus:outline-none',
      'focus:ring-4',
      'focus:ring-blue-300',
      'focus:border-blue-500',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'transition-colors',
      'resize-y',
    ];

    const errorStyles = error
      ? ['border-red-500', 'focus:ring-red-300', 'focus:border-red-500']
      : [];

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-red-600 ml-1" aria-label="obrigatório">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(
            error && errorId,
            hint && hintId
          )}
          className={cn(baseStyles, errorStyles, className)}
          {...props}
        />
        {hint && (
          <p id={hintId} className="text-sm text-gray-500">
            {hint}
          </p>
        )}
        {error && (
          <div
            id={errorId}
            className="flex items-center gap-1 text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

AccessibleTextarea.displayName = 'AccessibleTextarea';

// Accessible Select
export interface AccessibleSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

export const AccessibleSelect = forwardRef<HTMLSelectElement, AccessibleSelectProps>(
  ({ label, error, hint, required, className, id, options, ...props }, ref) => {
    const selectId = id || Math.random().toString(36).substring(2, 9);
    const errorId = `${selectId}-error`;
    const hintId = `${selectId}-hint`;

    const baseStyles = [
      'w-full px-4 py-3',
      'min-h-[44px]', // AAA touch target
      'border border-gray-300 rounded-lg',
      'text-gray-900',
      'focus:outline-none',
      'focus:ring-4',
      'focus:ring-blue-300',
      'focus:border-blue-500',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'transition-colors',
      'bg-white',
    ];

    const errorStyles = error
      ? ['border-red-500', 'focus:ring-red-300', 'focus:border-red-500']
      : [];

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-red-600 ml-1" aria-label="obrigatório">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(
            error && errorId,
            hint && hintId
          )}
          className={cn(baseStyles, errorStyles, className)}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {hint && (
          <p id={hintId} className="text-sm text-gray-500">
            {hint}
          </p>
        )}
        {error && (
          <div
            id={errorId}
            className="flex items-center gap-1 text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

AccessibleSelect.displayName = 'AccessibleSelect';

// Accessible Checkbox
export interface AccessibleCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const AccessibleCheckbox = forwardRef<HTMLInputElement, AccessibleCheckboxProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const checkboxId = id || Math.random().toString(36).substring(2, 9);
    const errorId = `${checkboxId}-error`;
    const hintId = `${checkboxId}-hint`;

    return (
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={cn(
              error && errorId,
              hint && hintId
            )}
            className="mt-1 w-5 h-5 min-w-[44px] min-h-[44px] rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-4 focus:ring-blue-300"
            {...props}
          />
          <div className="flex-1">
            <label
              htmlFor={checkboxId}
              className="block text-sm font-medium text-gray-700 cursor-pointer"
            >
              {label}
            </label>
            {hint && (
              <p id={hintId} className="text-sm text-gray-500 mt-1">
                {hint}
              </p>
            )}
          </div>
        </div>
        {error && (
          <div
            id={errorId}
            className="flex items-center gap-1 text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

AccessibleCheckbox.displayName = 'AccessibleCheckbox';

// Accessible Radio Group
export interface RadioOption {
  value: string;
  label: string;
  hint?: string;
}

export interface AccessibleRadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export function AccessibleRadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
  required,
}: AccessibleRadioGroupProps) {
  const groupId = Math.random().toString(36).substring(2, 9);
  const errorId = `${groupId}-error`;

  return (
    <div className="space-y-3">
      <fieldset>
        <legend className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-600 ml-1" aria-label="obrigatório">*</span>}
        </legend>
        <div className="mt-2 space-y-3" role="radiogroup" aria-required={required}>
          {options.map((option) => (
            <div key={option.value} className="flex items-start gap-3">
              <input
                id={`${groupId}-${option.value}`}
                name={name}
                type="radio"
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? errorId : undefined}
                className="mt-1 w-5 h-5 min-w-[44px] min-h-[44px] border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-4 focus:ring-blue-300"
              />
              <div className="flex-1">
                <label
                  htmlFor={`${groupId}-${option.value}`}
                  className="block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  {option.label}
                </label>
                {option.hint && (
                  <p className="text-sm text-gray-500 mt-1">{option.hint}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </fieldset>
      {error && (
        <div
          id={errorId}
          className="flex items-center gap-1 text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-4 h-4" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

// Form validation helper
export interface FormErrors {
  [fieldName: string]: string;
}

export function validateForm(
  formData: FormData,
  requiredFields: string[]
): FormErrors {
  const errors: FormErrors = {};

  for (const field of requiredFields) {
    const value = formData.get(field);
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors[field] = 'Este campo é obrigatório';
    }
  }

  return errors;
}

export default {
  FormField,
  AccessibleInput,
  AccessibleTextarea,
  AccessibleSelect,
  AccessibleCheckbox,
  AccessibleRadioGroup,
  validateForm,
};
