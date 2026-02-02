'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  autoResize?: boolean;
  rows?: number;
}

/**
 * Textarea Component - Multi-line text input with auto-resize and character counting
 *
 * @example
 * <Textarea
 *   label="Comments"
 *   placeholder="Enter your comments..."
 *   maxLength={500}
 *   showCharCount
 *   autoResize
 * />
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helpText,
      required = false,
      disabled = false,
      maxLength,
      showCharCount = false,
      autoResize = false,
      rows = 3,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(
      typeof value === 'string' ? value.length : 0
    );
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    // Auto-resize textarea to fit content
    const autoResizeTextarea = React.useCallback(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [autoResize]);

    React.useEffect(() => {
      autoResizeTextarea();
    }, [value, autoResize, autoResizeTextarea]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      autoResizeTextarea();
      onChange?.(e);
    };

    const handleRef = React.useCallback(
      (element: HTMLTextAreaElement) => {
        textareaRef.current = element;
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      },
      [ref]
    );

    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-medium text-neutral-200 mb-2">
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={handleRef}
            disabled={disabled}
            maxLength={maxLength}
            rows={rows}
            value={value}
            onChange={handleChange}
            aria-label={label}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={
              error ? 'textarea-error' : helpText ? 'textarea-help' : undefined
            }
            className={cn(
              // Layout
              'w-full px-3 py-2 rounded-lg',
              autoResize && 'resize-none',
              !autoResize && 'resize-vertical',
              // Styling
              'bg-neutral-800 border border-neutral-700',
              'text-sm text-neutral-100 placeholder-neutral-500',
              // States
              'hover:border-neutral-600 transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-danger focus-visible:ring-danger',
              // Font
              'font-mono'
            )}
            {...props}
          />

          {maxLength && (
            <div
              className={cn(
                'absolute bottom-2 right-3 text-xs',
                charCount > maxLength * 0.9
                  ? 'text-warning'
                  : charCount > maxLength * 0.8
                    ? 'text-info'
                    : 'text-neutral-400'
              )}
            >
              {charCount}/{maxLength}
            </div>
          )}
        </div>

        {error && (
          <p id="textarea-error" className="text-xs text-danger mt-1">
            {error}
          </p>
        )}
        {helpText && !error && (
          <p id="textarea-help" className="text-xs text-neutral-400 mt-1">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export default Textarea;
