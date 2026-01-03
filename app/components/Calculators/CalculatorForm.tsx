'use client';

/**
 * DARWIN-MFC CALCULATOR FORM
 * ==========================
 *
 * Dynamic form component for clinical calculator inputs.
 * Supports various input types with validation.
 */

import { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  RotateCcw,
  ChevronDown,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import type {
  ClinicalCalculator,
  CalculatorInput,
  CalculatorInputValues,
  CalculatorValidationErrors,
} from '@/lib/calculators/types';

// =============================================================================
// TYPES
// =============================================================================

export interface CalculatorFormProps {
  calculator: ClinicalCalculator;
  onCalculate: (values: CalculatorInputValues) => void;
  initialValues?: CalculatorInputValues;
  className?: string;
}

// =============================================================================
// INPUT COMPONENTS
// =============================================================================

interface InputWrapperProps {
  input: CalculatorInput;
  error?: string;
  children: React.ReactNode;
}

function InputWrapper({ input, error, children }: InputWrapperProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <label
          htmlFor={input.id}
          className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {input.label}
          {input.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {input.description && (
          <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button type="button" className="text-neutral-400 hover:text-neutral-600">
                  <HelpCircle className="w-4 h-4" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="z-50 max-w-xs px-3 py-2 text-sm bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700"
                  sideOffset={5}
                >
                  {input.description}
                  <Tooltip.Arrow className="fill-white dark:fill-neutral-800" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        )}
      </div>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-sm text-red-500">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectInputProps {
  input: CalculatorInput;
  value: number | undefined;
  onChange: (value: number) => void;
  error?: string;
}

function SelectInput({ input, value, onChange, error }: SelectInputProps) {
  return (
    <InputWrapper input={input} error={error}>
      <div className="relative">
        <select
          id={input.id}
          value={value ?? ''}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn(
            'w-full px-3 py-2.5 pr-10 rounded-lg appearance-none',
            'bg-white dark:bg-neutral-800',
            'border border-neutral-200 dark:border-neutral-700',
            'text-neutral-900 dark:text-neutral-100',
            'focus:outline-none focus:ring-2 focus:ring-[#0071E3]/50 focus:border-[#0071E3]',
            error && 'border-red-500 focus:ring-red-500/50'
          )}
        >
          <option value="" disabled>
            Select...
          </option>
          {input.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
      </div>
    </InputWrapper>
  );
}

interface NumberInputProps {
  input: CalculatorInput;
  value: number | undefined;
  onChange: (value: number) => void;
  error?: string;
}

function NumberInput({ input, value, onChange, error }: NumberInputProps) {
  return (
    <InputWrapper input={input} error={error}>
      <div className="relative">
        <input
          id={input.id}
          type="number"
          value={value ?? ''}
          onChange={(e) => onChange(Number(e.target.value))}
          min={input.validation?.min}
          max={input.validation?.max}
          step={input.validation?.step || 1}
          placeholder={`Enter ${input.label.toLowerCase()}`}
          className={cn(
            'w-full px-3 py-2.5 rounded-lg',
            'bg-white dark:bg-neutral-800',
            'border border-neutral-200 dark:border-neutral-700',
            'text-neutral-900 dark:text-neutral-100',
            'placeholder:text-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-[#0071E3]/50 focus:border-[#0071E3]',
            error && 'border-red-500 focus:ring-red-500/50',
            input.unit && 'pr-12'
          )}
        />
        {input.unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
            {input.unit}
          </span>
        )}
      </div>
    </InputWrapper>
  );
}

interface RadioGroupProps {
  input: CalculatorInput;
  value: number | undefined;
  onChange: (value: number) => void;
  error?: string;
}

function RadioGroup({ input, value, onChange, error }: RadioGroupProps) {
  return (
    <InputWrapper input={input} error={error}>
      <div className="space-y-2">
        {input.options?.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors',
              'border',
              value === option.value
                ? 'bg-[#0071E3]/5 border-[#0071E3] dark:bg-[#0071E3]/10'
                : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
            )}
          >
            <input
              type="radio"
              name={input.id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="mt-0.5 w-4 h-4 text-[#0071E3] focus:ring-[#0071E3]"
            />
            <div className="flex-1">
              <div className="font-medium text-neutral-900 dark:text-neutral-100">
                {option.label}
              </div>
              {option.description && (
                <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {option.description}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    </InputWrapper>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function CalculatorForm({
  calculator,
  onCalculate,
  initialValues = {},
  className,
}: CalculatorFormProps) {
  const [values, setValues] = useState<CalculatorInputValues>(initialValues);
  const [errors, setErrors] = useState<CalculatorValidationErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  // Group inputs by their group property
  const groupedInputs = useMemo(() => {
    const groups: Record<string, CalculatorInput[]> = {};
    for (const input of calculator.inputs) {
      const group = input.group || 'General';
      if (!groups[group]) groups[group] = [];
      groups[group].push(input);
    }
    return groups;
  }, [calculator.inputs]);

  const validateInput = useCallback(
    (input: CalculatorInput, value: number | undefined): string | undefined => {
      if (input.required && (value === undefined || value === null)) {
        return 'This field is required';
      }

      if (value !== undefined && input.validation) {
        const { min, max, customValidator, errorMessage } = input.validation;

        if (min !== undefined && value < min) {
          return errorMessage || `Minimum value is ${min}`;
        }
        if (max !== undefined && value > max) {
          return errorMessage || `Maximum value is ${max}`;
        }
        if (customValidator && !customValidator(value)) {
          return errorMessage || 'Invalid value';
        }
      }

      return undefined;
    },
    []
  );

  const handleChange = useCallback(
    (inputId: string, value: number) => {
      setValues((prev) => ({ ...prev, [inputId]: value }));
      setTouched((prev) => new Set(prev).add(inputId));

      // Validate on change
      const input = calculator.inputs.find((i) => i.id === inputId);
      if (input) {
        const error = validateInput(input, value);
        setErrors((prev) => {
          if (error) {
            return { ...prev, [inputId]: error };
          }
          const newErrors = { ...prev };
          delete newErrors[inputId];
          return newErrors;
        });
      }
    },
    [calculator.inputs, validateInput]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Validate all inputs
      const newErrors: CalculatorValidationErrors = {};
      let isValid = true;

      for (const input of calculator.inputs) {
        const error = validateInput(input, values[input.id]);
        if (error) {
          newErrors[input.id] = error;
          isValid = false;
        }
      }

      setErrors(newErrors);
      setTouched(new Set(calculator.inputs.map((i) => i.id)));

      if (isValid) {
        onCalculate(values);
      }
    },
    [calculator.inputs, values, validateInput, onCalculate]
  );

  const handleReset = useCallback(() => {
    setValues({});
    setErrors({});
    setTouched(new Set());
  }, []);

  const isFormValid = useMemo(() => {
    return calculator.inputs.every((input) => {
      if (!input.required) return true;
      return values[input.id] !== undefined;
    });
  }, [calculator.inputs, values]);

  const renderInput = useCallback(
    (input: CalculatorInput) => {
      const value = values[input.id];
      const error = touched.has(input.id) ? errors[input.id] : undefined;

      // Check conditional display
      if (input.showWhen) {
        const conditionValue = values[input.showWhen.inputId];
        const { operator, value: compareValue } = input.showWhen;

        let show = false;
        switch (operator) {
          case '==':
            show = conditionValue === compareValue;
            break;
          case '!=':
            show = conditionValue !== compareValue;
            break;
          case '>':
            show = conditionValue > compareValue;
            break;
          case '<':
            show = conditionValue < compareValue;
            break;
          case '>=':
            show = conditionValue >= compareValue;
            break;
          case '<=':
            show = conditionValue <= compareValue;
            break;
        }

        if (!show) return null;
      }

      // Render based on type
      switch (input.type) {
        case 'select':
          return (
            <SelectInput
              key={input.id}
              input={input}
              value={value}
              onChange={(v) => handleChange(input.id, v)}
              error={error}
            />
          );

        case 'boolean':
        case 'radio':
          return (
            <RadioGroup
              key={input.id}
              input={input}
              value={value}
              onChange={(v) => handleChange(input.id, v)}
              error={error}
            />
          );

        case 'number':
        case 'integer':
        case 'age':
        case 'weight':
        case 'height':
        case 'heart-rate':
        case 'respiratory-rate':
        case 'temperature':
        case 'oxygen-saturation':
        default:
          return (
            <NumberInput
              key={input.id}
              input={input}
              value={value}
              onChange={(v) => handleChange(input.id, v)}
              error={error}
            />
          );
      }
    },
    [values, errors, touched, handleChange]
  );

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {Object.entries(groupedInputs).map(([groupName, inputs]) => (
        <div key={groupName} className="space-y-4">
          {Object.keys(groupedInputs).length > 1 && (
            <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
              {groupName}
            </h3>
          )}
          <AnimatePresence mode="popLayout">
            {inputs.map((input) => {
              const rendered = renderInput(input);
              if (!rendered) return null;

              return (
                <motion.div
                  key={input.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {rendered}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ))}

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={!isFormValid}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 rounded-lg',
            'font-semibold text-white transition-colors',
            isFormValid
              ? 'bg-[#0071E3] hover:bg-[#0077ED]'
              : 'bg-neutral-300 dark:bg-neutral-700 cursor-not-allowed'
          )}
        >
          <Calculator className="w-5 h-5" />
          Calculate
        </button>
        <button
          type="button"
          onClick={handleReset}
          className={cn(
            'px-4 py-3 rounded-lg',
            'bg-neutral-100 dark:bg-neutral-800',
            'text-neutral-600 dark:text-neutral-400',
            'hover:bg-neutral-200 dark:hover:bg-neutral-700',
            'transition-colors'
          )}
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}

export default CalculatorForm;
