import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

export interface StepperStep {
  id: string;
  label: string;
  description?: string;
  status?: 'pending' | 'active' | 'completed' | 'error';
  onClick?: () => void;
  disabled?: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'progress';
  showStepNumber?: boolean;
}

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  variant = 'default',
  showStepNumber = true,
}: StepperProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div className={`w-full ${isHorizontal ? 'flex gap-4' : 'flex flex-col gap-6'}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const status = step.status || (isCompleted ? 'completed' : isActive ? 'active' : 'pending');

        return (
          <div
            key={step.id}
            className={`flex items-start gap-3 ${isHorizontal ? 'flex-1' : 'w-full'}`}
            onClick={() => !step.disabled && onStepClick?.(index)}
          >
            {/* Step circle */}
            <div className="relative flex-shrink-0">
              <button
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold transition-all ${
                  isCompleted
                    ? 'bg-success border-success text-neutral-900'
                    : isActive
                      ? 'bg-primary border-primary text-neutral-900'
                      : status === 'error'
                        ? 'bg-danger border-danger text-neutral-100'
                        : 'bg-neutral-800 border-neutral-600 text-neutral-400'
                } ${
                  !step.disabled && (isActive || status === 'pending')
                    ? 'cursor-pointer hover:border-neutral-400'
                    : step.disabled
                      ? 'cursor-not-allowed opacity-50'
                      : ''
                }`}
                disabled={step.disabled}
              >
                {isCompleted ? (
                  <Check size={20} />
                ) : showStepNumber ? (
                  index + 1
                ) : null}
              </button>

              {/* Connector line (horizontal) */}
              {isHorizontal && index < steps.length - 1 && (
                <div
                  className={`absolute top-5 left-10 w-[calc(100vw/max(2,${Math.ceil(steps.length/1)}))] h-0.5 ${
                    isCompleted ? 'bg-success' : 'bg-neutral-700'
                  }`}
                />
              )}

              {/* Connector line (vertical) */}
              {!isHorizontal && index < steps.length - 1 && (
                <div className={`absolute top-10 left-5 w-0.5 h-12 ${isCompleted ? 'bg-success' : 'bg-neutral-700'}`} />
              )}
            </div>

            {/* Step content */}
            <div className={`flex-1 ${isHorizontal ? 'hidden sm:block' : ''}`}>
              <h3
                className={`font-semibold transition-colors ${
                  isActive
                    ? 'text-primary'
                    : isCompleted
                      ? 'text-success'
                      : status === 'error'
                        ? 'text-danger'
                        : 'text-neutral-400'
                }`}
              >
                {step.label}
              </h3>
              {step.description && (
                <p className="text-sm text-neutral-500 mt-1">{step.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * StepperContent - Display content for specific step
 */
export interface StepperContentProps {
  currentStep: number;
  steps: { id: string; content: React.ReactNode }[];
}

export function StepperContent({ currentStep, steps }: StepperContentProps) {
  const content = steps[currentStep]?.content;

  return (
    <div className="w-full animate-in fade-in slide-in-from-top-2 duration-300">
      {content}
    </div>
  );
}
