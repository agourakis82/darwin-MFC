'use client';

import { useState, useCallback, useMemo } from 'react';
import { AlertCircle, Pill, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InteractionAlert } from '@/app/components/medical';

export type InteractionSeverity = 'contraindicated' | 'major' | 'moderate' | 'minor';

export interface DrugCheckInteraction {
  id: string;
  drug1: string;
  drug2: string;
  severity: InteractionSeverity;
  mechanism: string;
  recommendation: string;
}

export interface DrugInteractionCheckerProps {
  medications: string[];
  interactions: DrugCheckInteraction[];
  onAddMedication?: (drug: string) => void;
  onRemoveMedication?: (drug: string) => void;
  onInteractionClick?: (interaction: DrugCheckInteraction) => void;
  density?: 'comfortable' | 'compact' | 'clinical';
  className?: string;
}

const severityConfig: Record<InteractionSeverity, { label: string; priority: number }> = {
  contraindicated: { label: 'Contraindicated', priority: 1 },
  major: { label: 'Major', priority: 2 },
  moderate: { label: 'Moderate', priority: 3 },
  minor: { label: 'Minor', priority: 4 },
};

export function DrugInteractionChecker({
  medications,
  interactions,
  onAddMedication,
  onRemoveMedication,
  onInteractionClick,
  density = 'comfortable',
  className,
}: DrugInteractionCheckerProps) {
  const [newDrug, setNewDrug] = useState('');
  const [expandedInteractions, setExpandedInteractions] = useState<Set<string>>(new Set());

  const handleAddDrug = useCallback(() => {
    if (newDrug.trim() && onAddMedication) {
      onAddMedication(newDrug.trim());
      setNewDrug('');
    }
  }, [newDrug, onAddMedication]);

  const sortedInteractions = useMemo(
    () => [...interactions].sort((a, b) => severityConfig[a.severity].priority - severityConfig[b.severity].priority),
    [interactions]
  );

  const criticalInteractions = useMemo(
    () => sortedInteractions.filter((i) => i.severity === 'contraindicated' || i.severity === 'major'),
    [sortedInteractions]
  );

  const paddingClass = {
    comfortable: 'p-6',
    compact: 'p-4',
    clinical: 'p-3',
  }[density];

  return (
    <div className={cn('clinical-card dark:clinical-card-dark', paddingClass, className)}>
      {/* Header with Alert Badge */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Pill className="w-5 h-5 text-emerald-600" />
          <h3 className={cn(
            'font-bold text-gray-900 dark:text-white',
            density === 'comfortable' && 'text-lg',
            density === 'compact' && 'text-base',
            density === 'clinical' && 'text-sm'
          )}>
            Drug Interaction Checker
          </h3>
        </div>

        {/* Alert Badge */}
        {criticalInteractions.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-950/50 rounded-full">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="text-xs font-bold text-red-700 dark:text-red-400">
              {criticalInteractions.length} Critical
            </span>
          </div>
        )}
      </div>

      {/* Add Medication Input */}
      {onAddMedication && (
        <div className={cn(density !== 'clinical' && 'mb-6')}>
          <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
            Current Medications
          </label>
          <div className="space-y-3">
            {/* Medication Pills */}
            {medications.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {medications.map((drug) => (
                  <div
                    key={drug}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg text-sm font-medium text-emerald-900 dark:text-emerald-200"
                  >
                    <span className="text-lg">💊</span>
                    <span>{drug}</span>
                    {onRemoveMedication && (
                      <button
                        onClick={() => onRemoveMedication(drug)}
                        className="p-0.5 hover:bg-emerald-200 dark:hover:bg-emerald-900 rounded transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Input Field */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newDrug}
                onChange={(e) => setNewDrug(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddDrug()}
                placeholder="Add medication (e.g., Metformin, Warfarin)..."
                className={cn(
                  'flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600',
                  'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
                  'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                  'focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm'
                )}
              />
              <button
                onClick={handleAddDrug}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactions Summary */}
      {interactions.length > 0 && (
        <div className={cn(density !== 'clinical' && 'mb-6')}>
          <div className="grid grid-cols-4 gap-2">
            <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg text-center">
              <div className="text-xl font-bold text-red-600">
                {interactions.filter((i) => i.severity === 'contraindicated').length}
              </div>
              <div className="text-xs text-red-600 dark:text-red-400 mt-1">Contraindicated</div>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg text-center">
              <div className="text-xl font-bold text-orange-600">
                {interactions.filter((i) => i.severity === 'major').length}
              </div>
              <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">Major</div>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-center">
              <div className="text-xl font-bold text-amber-600">
                {interactions.filter((i) => i.severity === 'moderate').length}
              </div>
              <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">Moderate</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
              <div className="text-xl font-bold text-green-600">
                {interactions.filter((i) => i.severity === 'minor').length}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">Minor</div>
            </div>
          </div>
        </div>
      )}

      {/* Interactions List */}
      {sortedInteractions.length > 0 && (
        <div className="space-y-3">
          {sortedInteractions.map((interaction) => (
            <button
              key={interaction.id}
              onClick={() => onInteractionClick?.(interaction)}
              className="w-full text-left"
            >
              <InteractionAlert
                severity={interaction.severity}
                drug1={interaction.drug1}
                drug2={interaction.drug2}
                mechanism={interaction.mechanism}
                recommendation={interaction.recommendation}
                isDismissible={false}
              />
            </button>
          ))}
        </div>
      )}

      {/* Empty State */}
      {medications.length === 0 && (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">Add medications to check for interactions</p>
        </div>
      )}

      {medications.length > 0 && interactions.length === 0 && (
        <div className="py-8 text-center text-green-600 dark:text-green-400">
          <p className="text-sm">✓ No significant interactions detected</p>
        </div>
      )}
    </div>
  );
}

export default DrugInteractionChecker;
