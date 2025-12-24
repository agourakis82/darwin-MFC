/**
 * CLINICAL CALCULATOR FRAMEWORK
 * ==============================
 *
 * Reusable framework for building clinical calculators
 * Real-time validation, unit conversion, result interpretation
 *
 * Features:
 * - Input validation with medical units
 * - Automatic calculation updates
 * - Result interpretation with risk levels
 * - Reference ranges
 * - Evidence-based scoring
 * - Print-friendly results
 * - Calculation history
 *
 * @example
 * ```tsx
 * import { Calculator, CalculatorInput, CalculatorResult } from './framework';
 *
 * <Calculator
 *   title="BMI Calculator"
 *   calculate={calculateBMI}
 *   inputs={[...]}
 *   interpretations={[...]}
 * />
 * ```
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import {
  Calculator as CalcIcon,
  AlertCircle,
  CheckCircle,
  Info,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  FileText,
  History,
  Printer,
} from 'lucide-react';
import { Card } from '../../design-system/primitives/card';
import { Button } from '../../design-system/primitives/button';
import { fadeInUp } from '../../design-system/animations/presets';

// ============================================================================
// TYPES
// ============================================================================

export type InputType = 'number' | 'select' | 'radio' | 'checkbox' | 'slider';
export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';
export type Unit = 'kg' | 'lb' | 'cm' | 'in' | 'mg/dL' | 'mmol/L' | 'mL/min' | '%' | 'years';

export interface CalculatorInput {
  id: string;
  label: string;
  type: InputType;
  unit?: Unit;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  defaultValue?: string | number;
  options?: { value: string | number; label: string }[];
  helpText?: string;
  validate?: (value: any) => string | null; // Returns error message or null
}

export interface CalculatorResult {
  value: number | string;
  unit?: string;
  label: string;
  interpretation?: string;
  riskLevel?: RiskLevel;
  reference?: {
    min?: number;
    max?: number;
    optimal?: number;
  };
}

export interface Interpretation {
  condition: (result: CalculatorResult) => boolean;
  message: string;
  riskLevel: RiskLevel;
  recommendations?: string[];
}

export interface CalculatorProps {
  title: string;
  description?: string;
  inputs: CalculatorInput[];
  calculate: (values: Record<string, any>) => CalculatorResult | CalculatorResult[];
  interpretations?: Interpretation[];
  references?: {
    title: string;
    url?: string;
    citation?: string;
  }[];
  onCalculate?: (result: CalculatorResult | CalculatorResult[]) => void;
  className?: string;
}

export interface CalculationHistoryItem {
  timestamp: number;
  inputs: Record<string, any>;
  results: CalculatorResult | CalculatorResult[];
}

// ============================================================================
// RISK LEVEL STYLING
// ============================================================================

const riskLevelStyles = {
  low: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-900 dark:text-green-100',
    icon: CheckCircle,
    color: 'text-green-600 dark:text-green-400',
  },
  moderate: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    text: 'text-yellow-900 dark:text-yellow-100',
    icon: Minus,
    color: 'text-yellow-600 dark:text-yellow-400',
  },
  high: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-800',
    text: 'text-orange-900 dark:text-orange-100',
    icon: AlertTriangle,
    color: 'text-orange-600 dark:text-orange-400',
  },
  critical: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-900 dark:text-red-100',
    icon: AlertCircle,
    color: 'text-red-600 dark:text-red-400',
  },
};

// ============================================================================
// INPUT COMPONENT
// ============================================================================

interface InputFieldProps {
  input: CalculatorInput;
  value: any;
  onChange: (value: any) => void;
  error?: string | null;
}

const InputField: React.FC<InputFieldProps> = ({ input, value, onChange, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = input.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    onChange(newValue);
  };

  const renderInput = () => {
    switch (input.type) {
      case 'number':
        return (
          <div className="relative">
            <input
              type="number"
              value={value || ''}
              onChange={handleChange}
              min={input.min}
              max={input.max}
              step={input.step || 0.1}
              required={input.required}
              className={cn(
                'w-full px-4 py-2 rounded-lg border',
                'bg-white dark:bg-neutral-900',
                'border-neutral-300 dark:border-neutral-700',
                'focus:ring-2 focus:ring-brand-primary-500 focus:border-transparent',
                'transition-colors',
                error && 'border-red-500 focus:ring-red-500',
                input.unit && 'pr-16'
              )}
            />
            {input.unit && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                {input.unit}
              </span>
            )}
          </div>
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={handleChange}
            required={input.required}
            className={cn(
              'w-full px-4 py-2 rounded-lg border',
              'bg-white dark:bg-neutral-900',
              'border-neutral-300 dark:border-neutral-700',
              'focus:ring-2 focus:ring-brand-primary-500 focus:border-transparent',
              'transition-colors',
              error && 'border-red-500 focus:ring-red-500'
            )}
          >
            <option value="">Select...</option>
            {input.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {input.options?.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={input.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  className="text-brand-primary-600 focus:ring-brand-primary-500"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
              className="text-brand-primary-600 focus:ring-brand-primary-500"
            />
            <span className="text-sm">{input.helpText}</span>
          </label>
        );

      case 'slider':
        return (
          <div className="space-y-2">
            <input
              type="range"
              value={value || input.min || 0}
              onChange={handleChange}
              min={input.min}
              max={input.max}
              step={input.step || 1}
              className="w-full accent-brand-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500">
              <span>{input.min}</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {value || input.min}
              </span>
              <span>{input.max}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">
        {input.label}
        {input.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {input.helpText && !error && (
        <p className="text-xs text-neutral-500">{input.helpText}</p>
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3" />
          {error}
        </motion.p>
      )}
    </div>
  );
};

// ============================================================================
// RESULT COMPONENT
// ============================================================================

interface ResultDisplayProps {
  result: CalculatorResult;
  interpretation?: Interpretation;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, interpretation }) => {
  const riskLevel = interpretation?.riskLevel || result.riskLevel || 'low';
  const styles = riskLevelStyles[riskLevel];
  const Icon = styles.icon;

  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        'p-4 rounded-lg border-2',
        styles.bg,
        styles.border
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', styles.color)} />
        <div className="flex-1 space-y-2">
          <div>
            <h4 className={cn('font-semibold', styles.text)}>{result.label}</h4>
            <p className="text-2xl font-bold mt-1">
              {typeof result.value === 'number' ? result.value.toFixed(2) : result.value}
              {result.unit && <span className="text-sm ml-1">{result.unit}</span>}
            </p>
          </div>

          {result.interpretation && (
            <p className={cn('text-sm', styles.text)}>{result.interpretation}</p>
          )}

          {interpretation && (
            <>
              <p className={cn('text-sm', styles.text)}>{interpretation.message}</p>
              {interpretation.recommendations && interpretation.recommendations.length > 0 && (
                <div className="mt-3 space-y-1">
                  <p className={cn('text-xs font-semibold uppercase', styles.text)}>
                    Recommendations:
                  </p>
                  <ul className="text-sm space-y-1">
                    {interpretation.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className={styles.color}>•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {result.reference && (
            <div className="mt-3 pt-3 border-t border-current/10">
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Reference range:{' '}
                {result.reference.min !== undefined && `${result.reference.min} - `}
                {result.reference.max !== undefined && `${result.reference.max}`}
                {result.reference.optimal !== undefined &&
                  ` (Optimal: ${result.reference.optimal})`}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN CALCULATOR COMPONENT
// ============================================================================

export const Calculator: React.FC<CalculatorProps> = ({
  title,
  description,
  inputs,
  calculate,
  interpretations = [],
  references = [],
  onCalculate,
  className,
}) => {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    inputs.forEach((input) => {
      if (input.defaultValue !== undefined) {
        initial[input.id] = input.defaultValue;
      }
    });
    return initial;
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [results, setResults] = useState<CalculatorResult | CalculatorResult[] | null>(null);
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Validate all inputs
  const validate = useCallback(() => {
    const newErrors: Record<string, string | null> = {};
    let isValid = true;

    inputs.forEach((input) => {
      const value = values[input.id];

      // Required check
      if (input.required && (value === undefined || value === '' || value === null)) {
        newErrors[input.id] = 'This field is required';
        isValid = false;
        return;
      }

      // Custom validation
      if (input.validate && value !== undefined && value !== '') {
        const error = input.validate(value);
        if (error) {
          newErrors[input.id] = error;
          isValid = false;
        }
      }

      // Range validation for numbers
      if (input.type === 'number' && value !== undefined && value !== '') {
        const numValue = parseFloat(value);
        if (input.min !== undefined && numValue < input.min) {
          newErrors[input.id] = `Must be at least ${input.min}`;
          isValid = false;
        }
        if (input.max !== undefined && numValue > input.max) {
          newErrors[input.id] = `Must be at most ${input.max}`;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [inputs, values]);

  // Handle calculation
  const handleCalculate = useCallback(() => {
    if (!validate()) {
      return;
    }

    const result = calculate(values);
    setResults(result);

    // Add to history
    const historyItem: CalculationHistoryItem = {
      timestamp: Date.now(),
      inputs: { ...values },
      results: result,
    };
    setHistory((prev) => [historyItem, ...prev].slice(0, 10)); // Keep last 10

    onCalculate?.(result);
  }, [values, calculate, validate, onCalculate]);

  // Auto-calculate on value change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      const allRequiredFilled = inputs
        .filter((input) => input.required)
        .every((input) => values[input.id] !== undefined && values[input.id] !== '');

      if (allRequiredFilled) {
        handleCalculate();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [values, inputs, handleCalculate]);

  // Find matching interpretations
  const getInterpretations = (result: CalculatorResult) => {
    return interpretations.find((interp) => interp.condition(result));
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className={cn('p-6', className)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-brand-primary-100 dark:bg-brand-primary-900/30">
            <CalcIcon className="w-6 h-6 text-brand-primary-600 dark:text-brand-primary-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowHistory(!showHistory)}
            title="View history"
          >
            <History className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrint}
            title="Print results"
          >
            <Printer className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Input Parameters
          </h3>
          {inputs.map((input) => (
            <InputField
              key={input.id}
              input={input}
              value={values[input.id]}
              onChange={(value) => setValues((prev) => ({ ...prev, [input.id]: value }))}
              error={errors[input.id]}
            />
          ))}

          <Button onClick={handleCalculate} className="w-full">
            Calculate
          </Button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Results
          </h3>

          <AnimatePresence mode="wait">
            {results ? (
              <motion.div
                key="results"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={{
                  initial: {},
                  animate: { transition: { staggerChildren: 0.1 } },
                  exit: {},
                }}
                className="space-y-3"
              >
                {Array.isArray(results) ? (
                  results.map((result, idx) => (
                    <ResultDisplay
                      key={idx}
                      result={result}
                      interpretation={getInterpretations(result)}
                    />
                  ))
                ) : (
                  <ResultDisplay
                    result={results}
                    interpretation={getInterpretations(results)}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 text-center text-neutral-500 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg"
              >
                <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Enter values to see results</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* References */}
      {references.length > 0 && (
        <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            References
          </h4>
          <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
            {references.map((ref, idx) => (
              <li key={idx}>
                {idx + 1}. {ref.title}
                {ref.citation && <span className="italic ml-1">({ref.citation})</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* History Panel */}
      <AnimatePresence>
        {showHistory && history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 overflow-hidden"
          >
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
              Calculation History
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded bg-neutral-50 dark:bg-neutral-800 text-xs"
                >
                  <p className="text-neutral-500 mb-1">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setValues(item.inputs)}
                    className="text-xs"
                  >
                    Restore this calculation
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
