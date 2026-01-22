'use client';

import { useState, useCallback } from 'react';
import { ChevronDown, Plus, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DiagnosisDifferential {
  id: string;
  diagnosis: string;
  probability: number;
  keyFeatures: string[];
  reasoning: string;
  nextSteps?: string[];
  references?: string[];
}

export interface DifferentialDiagnosisAssistantProps {
  diagnosis: DiagnosisDifferential[];
  symptoms: string[];
  patientFactors?: Record<string, string | number | boolean>;
  onAddSymptom?: (symptom: string) => void;
  onRemoveSymptom?: (symptom: string) => void;
  onViewProtocol?: (diagnosisId: string) => void;
  density?: 'comfortable' | 'compact' | 'clinical';
  className?: string;
}

export function DifferentialDiagnosisAssistant({
  diagnosis,
  symptoms,
  patientFactors = {},
  onAddSymptom,
  onRemoveSymptom,
  onViewProtocol,
  density = 'comfortable',
  className,
}: DifferentialDiagnosisAssistantProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(diagnosis.length > 0 ? [diagnosis[0].id] : []));
  const [newSymptom, setNewSymptom] = useState('');

  const toggleExpanded = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleAddSymptom = useCallback(() => {
    if (newSymptom.trim() && onAddSymptom) {
      onAddSymptom(newSymptom.trim());
      setNewSymptom('');
    }
  }, [newSymptom, onAddSymptom]);

  const paddingClass = {
    comfortable: 'p-6',
    compact: 'p-4',
    clinical: 'p-3',
  }[density];

  // Sort by probability
  const sortedDiagnosis = [...diagnosis].sort((a, b) => b.probability - a.probability);

  return (
    <div className={cn('clinical-card dark:clinical-card-dark', paddingClass, className)}>
      {/* Header */}
      <div className="mb-6">
        <h3 className={cn(
          'font-bold text-gray-900 dark:text-white flex items-center gap-2',
          density === 'comfortable' && 'text-xl mb-2',
          density === 'compact' && 'text-lg mb-1',
          density === 'clinical' && 'text-base'
        )}>
          <Zap className="w-5 h-5 text-purple-600" />
          Differential Diagnosis Builder
        </h3>
      </div>

      {/* Symptoms Input */}
      <div className={cn(density !== 'clinical' && 'mb-6')}>
        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
          Clinical Presentation
        </label>
        <div className="space-y-3">
          {/* Current Symptoms */}
          {symptoms.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => (
                <div
                  key={symptom}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-950/50 rounded-lg text-sm text-blue-900 dark:text-blue-200"
                >
                  <span>✓ {symptom}</span>
                  {onRemoveSymptom && (
                    <button
                      onClick={() => onRemoveSymptom(symptom)}
                      className="p-0.5 hover:bg-blue-200 dark:hover:bg-blue-900 rounded transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add Symptom Input */}
          {onAddSymptom && (
            <div className="flex gap-2">
              <input
                type="text"
                value={newSymptom}
                onChange={(e) => setNewSymptom(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSymptom()}
                placeholder="Add symptom (e.g., chest pain, dyspnea)..."
                className={cn(
                  'flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600',
                  'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
                  'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
                )}
              />
              <button
                onClick={handleAddSymptom}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Patient Factors */}
      {Object.keys(patientFactors).length > 0 && (
        <div className={cn(density !== 'clinical' && 'mb-6')}>
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            Patient Context
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(patientFactors).map(([key, value]) => (
              <div key={key} className="px-2 py-1.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300">
                <span className="font-medium">{key}:</span> {String(value)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Differential Diagnosis List */}
      <div className="space-y-3">
        {sortedDiagnosis.map((diff, idx) => {
          const isExpanded = expanded.has(diff.id);
          const probability = Math.round(diff.probability * 100);

          return (
            <div
              key={diff.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              {/* Header - Always Visible */}
              <button
                onClick={() => toggleExpanded(diff.id)}
                className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {idx + 1}.
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {diff.diagnosis}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Confidence score based on presented symptoms
                      </p>
                    </div>
                  </div>
                </div>

                {/* Probability Bar */}
                <div className="flex-shrink-0 flex items-center gap-3">
                  <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        probability > 80 && 'bg-red-600',
                        probability > 50 && probability <= 80 && 'bg-amber-600',
                        probability <= 50 && 'bg-blue-600'
                      )}
                      style={{ width: `${probability}%` }}
                    />
                  </div>
                  <span className={cn(
                    'font-bold text-sm w-12 text-right',
                    probability > 80 && 'text-red-600',
                    probability > 50 && probability <= 80 && 'text-amber-600',
                    probability <= 50 && 'text-blue-600'
                  )}>
                    {probability}%
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform flex-shrink-0',
                      isExpanded && 'rotate-180'
                    )}
                  />
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 space-y-4">
                  {/* Key Features */}
                  <div>
                    <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Key Features
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {diff.keyFeatures.map((feature) => (
                        <span
                          key={feature}
                          className="px-2.5 py-1 text-xs bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Reasoning */}
                  <div>
                    <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                      Clinical Reasoning
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {diff.reasoning}
                    </p>
                  </div>

                  {/* Next Steps */}
                  {diff.nextSteps && diff.nextSteps.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                        Recommended Workup
                      </p>
                      <ul className="space-y-1">
                        {diff.nextSteps.map((step, idx) => (
                          <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex gap-2">
                            <span className="text-blue-600 dark:text-blue-400">→</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    {onViewProtocol && (
                      <button
                        onClick={() => onViewProtocol(diff.id)}
                        className="flex-1 px-3 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        📋 View Protocol
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No Diagnosis Message */}
      {diagnosis.length === 0 && (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">Add symptoms to generate differential diagnosis</p>
        </div>
      )}
    </div>
  );
}

export default DifferentialDiagnosisAssistant;
