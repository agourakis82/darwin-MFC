'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  options?: SelectOption[];
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  label?: string;
  required?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  children?: React.ReactNode;
}

const SelectContext = React.createContext<{
  searchValue: string;
  setSearchValue: (value: string) => void;
  searchable?: boolean;
}>({
  searchValue: '',
  setSearchValue: () => {},
});

/**
 * Select Component - Single/multi-select with search and keyboard navigation
 *
 * @example
 * <Select
 *   placeholder="Select an option"
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2', description: 'This is an option' }
 *   ]}
 *   searchable
 *   required
 * />
 */
export const Select = React.forwardRef<
  HTMLDivElement,
  SelectProps
>(
  (
    {
      options = [],
      placeholder = 'Select an option...',
      searchable = false,
      clearable = false,
      disabled = false,
      error,
      helpText,
      label,
      required = false,
      className,
      triggerClassName,
      contentClassName,
      children,
      onValueChange,
      value,
      ...props
    },
    ref
  ) => {
    const [searchValue, setSearchValue] = React.useState('');
    const [open, setOpen] = React.useState(false);

    // Filter options based on search value
    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchValue) return options;
      return options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
          option.value.toLowerCase().includes(searchValue.toLowerCase())
      );
    }, [options, searchable, searchValue]);

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onValueChange?.('');
    };

    return (
      <SelectContext.Provider value={{ searchValue, setSearchValue, searchable }}>
        <div ref={ref} className={cn('flex flex-col gap-2', className)}>
          {label && (
            <label className="text-sm font-medium text-neutral-200">
              {label}
              {required && <span className="text-danger ml-1">*</span>}
            </label>
          )}

          <SelectPrimitive.Root
            disabled={disabled}
            open={open}
            onOpenChange={setOpen}
            onValueChange={onValueChange}
            value={value}
            {...props}
          >
            <SelectPrimitive.Trigger
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
                error && 'border-danger focus-visible:ring-danger',
                triggerClassName
              )}
              aria-label={label || placeholder}
              aria-required={required}
              aria-invalid={!!error}
              aria-describedby={error ? `${label}-error` : helpText ? `${label}-help` : undefined}
            >
              <SelectPrimitive.Value placeholder={placeholder} />
              <div className="flex items-center gap-1">
                {clearable && value && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 hover:bg-neutral-700 rounded transition-colors"
                    aria-label="Clear selection"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <ChevronDown className="h-4 w-4 opacity-50" aria-hidden="true" />
              </div>
            </SelectPrimitive.Trigger>

            <SelectPrimitive.Portal>
              <SelectPrimitive.Content
                className={cn(
                  // Layout
                  'relative z-50 max-h-96 w-[var(--radix-select-trigger-width)] min-w-[200px]',
                  // Styling
                  'overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg',
                  contentClassName
                )}
                position="popper"
                sideOffset={4}
              >
                <SelectPrimitive.ScrollUpButton className="flex h-7 cursor-default items-center justify-center bg-neutral-800 text-neutral-400 hover:bg-neutral-700">
                  <ChevronDown className="h-4 w-4 rotate-180" />
                </SelectPrimitive.ScrollUpButton>

                {searchable && (
                  <div className="p-2 border-b border-neutral-700">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full px-2 py-1 rounded bg-neutral-700 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      autoFocus
                    />
                  </div>
                )}

                <SelectPrimitive.Viewport className="p-1">
                  {children ? (
                    children
                  ) : (
                    <>
                      {filteredOptions.length === 0 ? (
                        <div className="py-6 text-center text-sm text-neutral-400">
                          {searchValue ? 'No results found' : 'No options available'}
                        </div>
                      ) : (
                        filteredOptions.map((option) => (
                          <SelectOption key={option.value} option={option} />
                        ))
                      )}
                    </>
                  )}
                </SelectPrimitive.Viewport>

                <SelectPrimitive.ScrollDownButton className="flex h-7 cursor-default items-center justify-center bg-neutral-800 text-neutral-400 hover:bg-neutral-700">
                  <ChevronDown className="h-4 w-4" />
                </SelectPrimitive.ScrollDownButton>
              </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
          </SelectPrimitive.Root>

          {error && (
            <p id={`${label}-error`} className="text-xs text-danger">
              {error}
            </p>
          )}
          {helpText && !error && (
            <p id={`${label}-help`} className="text-xs text-neutral-400">
              {helpText}
            </p>
          )}
        </div>
      </SelectContext.Provider>
    );
  }
);
Select.displayName = 'Select';

interface SelectOptionProps {
  option: SelectOption;
}

const SelectOption = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectOptionProps
>(({ option }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    value={option.value}
    disabled={option.disabled}
    className={cn(
      // Layout
      'relative flex h-9 w-full select-none items-center pl-8 pr-2',
      // Styling
      'text-sm text-neutral-100 rounded hover:bg-neutral-700 focus:outline-none focus:bg-neutral-700',
      // States
      'disabled:opacity-50 disabled:cursor-not-allowed',
      // Focus/selection
      'data-[state=checked]:bg-neutral-700'
    )}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-primary font-bold" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <div className="flex flex-col gap-0.5">
      <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
      {option.description && (
        <p className="text-xs text-neutral-400">{option.description}</p>
      )}
    </div>
  </SelectPrimitive.Item>
));
SelectOption.displayName = 'SelectOption';

export default Select;
