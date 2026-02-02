'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

export interface RangeSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (value: number) => string;
  showLabels?: boolean;
  error?: string;
  helpText?: string;
  required?: boolean;
  unit?: string;
}

/**
 * RangeSlider Component - Single or dual range slider for numeric selection
 *
 * @example
 * <RangeSlider
 *   label="Age range"
 *   min={0}
 *   max={100}
 *   step={1}
 *   value={[18, 65]}
 *   onValueChange={setRange}
 *   unit="years"
 * />
 */
export const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  RangeSliderProps
>(
  (
    {
      className,
      label,
      min = 0,
      max = 100,
      step = 1,
      formatValue,
      showLabels = true,
      error,
      helpText,
      required = false,
      disabled = false,
      value,
      onValueChange,
      unit,
      ...props
    },
    ref
  ) => {
    const displayValue = React.useCallback(
      (val: number) => {
        if (formatValue) return formatValue(val);
        return unit ? `${val} ${unit}` : String(val);
      },
      [formatValue, unit]
    );

    const isRange = Array.isArray(value) && value.length === 2;

    return (
      <div className={className}>
        {label && (
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-neutral-200">
              {label}
              {required && <span className="text-danger ml-1">*</span>}
            </label>
            {showLabels && Array.isArray(value) && (
              <span className="text-sm text-neutral-400">
                {isRange
                  ? `${displayValue(value[0])} - ${displayValue(value[1])}`
                  : displayValue(value[0])}
              </span>
            )}
          </div>
        )}

        <SliderPrimitive.Root
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? 'slider-error' : helpText ? 'slider-help' : undefined}
          className={cn(
            // Layout
            'relative flex w-full touch-none select-none items-center',
            // States
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          {...props}
        >
          {/* Track */}
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-700">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
          </SliderPrimitive.Track>

          {/* Thumbs */}
          {Array.isArray(value) && (
            <>
              {value.map((_, index) => (
                <SliderPrimitive.Thumb
                  key={index}
                  className={cn(
                    // Layout
                    'block h-5 w-5 rounded-full',
                    // Styling
                    'bg-primary border-2 border-neutral-900',
                    'shadow-md',
                    // States
                    'hover:bg-primary/90 transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    // Positioning
                    'cursor-pointer'
                  )}
                  aria-label={
                    isRange
                      ? index === 0
                        ? `${label} minimum`
                        : `${label} maximum`
                      : label
                  }
                />
              ))}
            </>
          )}
        </SliderPrimitive.Root>

        {/* Min/Max labels */}
        {showLabels && (
          <div className="flex justify-between mt-2 text-xs text-neutral-400">
            <span>{displayValue(min)}</span>
            <span>{displayValue(max)}</span>
          </div>
        )}

        {error && (
          <p id="slider-error" className="text-xs text-danger mt-2">
            {error}
          </p>
        )}
        {helpText && !error && (
          <p id="slider-help" className="text-xs text-neutral-400 mt-2">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);
RangeSlider.displayName = 'RangeSlider';

export default RangeSlider;
