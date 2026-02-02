'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import Popover from './Popover';

export interface DatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  required?: boolean;
  placeholder?: string;
  disabledDates?: (date: Date) => boolean;
  fromDate?: Date;
  toDate?: Date;
  format?: string;
}

/**
 * DatePicker Component - Calendar date selection with popover
 *
 * @example
 * <DatePicker
 *   label="Birth Date"
 *   value={date}
 *   onChange={setDate}
 *   fromDate={new Date(1920, 0, 1)}
 *   toDate={new Date()}
 * />
 */
export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      label,
      value,
      onChange,
      disabled = false,
      error,
      helpText,
      required = false,
      placeholder = 'Select a date',
      disabledDates,
      fromDate,
      toDate,
      format: dateFormat = 'PP',
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(undefined);
    };

    const handleDateSelect = (date: Date | undefined) => {
      onChange?.(date);
      setOpen(false);
    };

    return (
      <div ref={ref} className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium text-neutral-200">
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        <Popover open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
            <button
              type="button"
              disabled={disabled}
              className={cn(
                // Layout
                'flex h-10 w-full items-center justify-between rounded-lg px-3 py-2',
                // Styling
                'bg-neutral-800 border border-neutral-700',
                'text-sm text-neutral-100 placeholder-neutral-500',
                // States
                'hover:border-neutral-600 transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                error && 'border-danger focus-visible:ring-danger'
              )}
              aria-label={label || placeholder}
              aria-required={required}
              aria-invalid={!!error}
              aria-describedby={error ? 'date-error' : helpText ? 'date-help' : undefined}
            >
              <span className={!value ? 'text-neutral-500' : ''}>
                {value ? format(value, dateFormat) : placeholder}
              </span>
              <div className="flex items-center gap-1">
                {value && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 hover:bg-neutral-700 rounded transition-colors"
                    aria-label="Clear date"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <CalendarIcon className="h-4 w-4 opacity-50" />
              </div>
            </button>
          </Popover.Trigger>

          <Popover.Content className="w-auto p-0" align="start">
            <DayPicker
              mode="single"
              selected={value}
              onSelect={handleDateSelect}
              disabled={disabledDates}
              fromDate={fromDate}
              toDate={toDate}
              className="p-4"
              classNames={{
                months: 'flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0',
                month: 'space-y-4',
                caption: 'flex justify-center pt-1 relative items-center',
                caption_label: 'text-sm font-medium text-neutral-200',
                nav: 'space-x-1 flex justify-between items-center',
                nav_button: cn(
                  'h-7 w-7 bg-neutral-800 p-0 opacity-50 hover:opacity-100',
                  'inline-flex items-center justify-center rounded-md'
                ),
                nav_button_previous: 'absolute left-1',
                nav_button_next: 'absolute right-1',
                table: 'w-full border-collapse space-y-1',
                head_row: 'flex',
                head_cell:
                  'text-neutral-400 rounded-md w-9 font-normal text-[0.8rem]',
                row: 'flex w-full mt-2',
                cell: cn(
                  'h-9 w-9 text-center text-sm p-0 relative',
                  '[&:has([aria-selected].day-range-end)]:rounded-r-md',
                  '[&:has([aria-selected].day-outside)]:bg-neutral-800/50',
                  '[&:has([aria-selected])]:bg-neutral-800',
                  'first:[&:has([aria-selected])]:rounded-l-md',
                  'last:[&:has([aria-selected])]:rounded-r-md',
                  '[&:has([aria-selected].day-range-continuation)]:rounded-none',
                  '[&:has([aria-selected].day-range-continuation)]:bg-neutral-800'
                ),
                day: cn(
                  'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
                  'rounded-md hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                ),
                day_selected: 'bg-primary text-neutral-900 font-semibold hover:bg-primary hover:text-neutral-900 focus-visible:bg-primary focus-visible:text-neutral-900',
                day_today: 'bg-neutral-700/50 text-neutral-100 font-semibold',
                day_outside: 'text-neutral-500 opacity-50',
                day_disabled: 'text-neutral-500 opacity-50',
                day_hidden: 'invisible',
              }}
            />
          </Popover.Content>
        </Popover>

        {error && (
          <p id="date-error" className="text-xs text-danger">
            {error}
          </p>
        )}
        {helpText && !error && (
          <p id="date-help" className="text-xs text-neutral-400">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);
DatePicker.displayName = 'DatePicker';

export default DatePicker;
