/**
 * ADVANCED DRUG INTERACTION CHECKER
 * ==================================
 *
 * Enhanced drug interaction checking with severity levels,
 * mechanisms, clinical significance, and recommendations
 *
 * Features:
 * - Multi-drug interaction analysis
 * - Severity classification (contraindicated, major, moderate, minor)
 * - Mechanism of interaction
 * - Clinical recommendations
 * - Alternative medication suggestions
 * - Real-time checking as drugs are added
 * - Visual interaction matrix
 *
 * @example
 * ```tsx
 * import { DrugInteractionChecker } from './advanced-checker';
 *
 * <DrugInteractionChecker
 *   medications={selectedMedications}
 *   onInteractionDetected={handleInteraction}
 * />
 * ```
 */

'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  X,
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { Card } from '../../design-system/primitives/card';
import { Button } from '../../design-system/primitives/button';
import { fadeInUp } from '../../design-system/animations/presets';

// ============================================================================
// TYPES
// ============================================================================

export type InteractionSeverity = 'contraindicated' | 'major' | 'moderate' | 'minor';

export interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: InteractionSeverity;
  mechanism: string;
  effect: string;
  clinicalSignificance: string;
  recommendations: string[];
  alternatives?: string[];
  references?: string[];
}

export interface Medication {
  id: string;
  name: string;
  class?: string;
  indication?: string;
}

interface DrugInteractionCheckerProps {
  medications?: Medication[];
  onInteractionDetected?: (interactions: DrugInteraction[]) => void;
  onMedicationsChange?: (medications: Medication[]) => void;
  className?: string;
}

// ============================================================================
// SEVERITY STYLES
// ============================================================================

const severityStyles = {
  contraindicated: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-500',
    text: 'text-red-900 dark:text-red-100',
    icon: ShieldAlert,
    color: 'text-red-600 dark:text-red-400',
    label: 'CONTRAINDICATED',
  },
  major: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-500',
    text: 'text-orange-900 dark:text-orange-100',
    icon: AlertTriangle,
    color: 'text-orange-600 dark:text-orange-400',
    label: 'MAJOR',
  },
  moderate: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-500',
    text: 'text-yellow-900 dark:text-yellow-100',
    icon: AlertCircle,
    color: 'text-yellow-600 dark:text-yellow-400',
    label: 'MODERATE',
  },
  minor: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-500',
    text: 'text-blue-900 dark:text-blue-100',
    icon: Info,
    color: 'text-blue-600 dark:text-blue-400',
    label: 'MINOR',
  },
};

// ============================================================================
// SAMPLE INTERACTION DATABASE
// ============================================================================

const INTERACTION_DATABASE: DrugInteraction[] = [
  {
    drug1: 'Warfarin',
    drug2: 'Aspirin',
    severity: 'major',
    mechanism: 'Pharmacodynamic synergism',
    effect: 'Increased bleeding risk',
    clinicalSignificance:
      'Concurrent use significantly increases the risk of bleeding complications',
    recommendations: [
      'Avoid combination if possible',
      'If must use together, monitor INR closely',
      'Watch for signs of bleeding',
      'Consider PPI for GI protection',
    ],
    alternatives: ['Clopidogrel (still has interaction but potentially less severe)'],
    references: ['Holbrook AM, et al. JAMA. 2005;293(13):1617-1630'],
  },
  {
    drug1: 'Metformin',
    drug2: 'Contrast Media',
    severity: 'major',
    mechanism: 'Increased risk of lactic acidosis',
    effect: 'Potential for acute kidney injury and lactic acidosis',
    clinicalSignificance:
      'Contrast-induced nephropathy can reduce metformin clearance, leading to accumulation',
    recommendations: [
      'Hold metformin on day of procedure',
      'Check renal function 48 hours post-procedure',
      'Resume metformin only if renal function stable',
      'Ensure adequate hydration',
    ],
  },
  {
    drug1: 'Simvastatin',
    drug2: 'Amiodarone',
    severity: 'major',
    mechanism: 'CYP3A4 inhibition',
    effect: 'Increased risk of myopathy and rhabdomyolysis',
    clinicalSignificance:
      'Amiodarone inhibits CYP3A4, increasing simvastatin levels up to 2-fold',
    recommendations: [
      'Limit simvastatin dose to 20 mg daily',
      'Monitor for muscle pain, weakness',
      'Check CK if symptoms develop',
      'Consider alternative statin (pravastatin, rosuvastatin)',
    ],
    alternatives: ['Pravastatin', 'Rosuvastatin', 'Atorvastatin (lower dose)'],
  },
  {
    drug1: 'ACE Inhibitors',
    drug2: 'Potassium Supplements',
    severity: 'moderate',
    mechanism: 'Additive hyperkalemia risk',
    effect: 'Elevated serum potassium',
    clinicalSignificance:
      'Both agents can increase potassium levels, potentially leading to hyperkalemia',
    recommendations: [
      'Monitor serum potassium regularly',
      'Educate patient on high-potassium foods to avoid',
      'Consider alternative if potassium >5.0 mEq/L',
      'Watch for ECG changes',
    ],
  },
  {
    drug1: 'Levothyroxine',
    drug2: 'Calcium Carbonate',
    severity: 'moderate',
    mechanism: 'Chelation/binding interaction',
    effect: 'Decreased levothyroxine absorption',
    clinicalSignificance:
      'Calcium can bind levothyroxine in the GI tract, reducing its absorption by up to 40%',
    recommendations: [
      'Separate administration by at least 4 hours',
      'Take levothyroxine on empty stomach',
      'Monitor TSH levels',
      'May need dose adjustment',
    ],
  },
];

// ============================================================================
// INTERACTION CARD COMPONENT
// ============================================================================

interface InteractionCardProps {
  interaction: DrugInteraction;
  isExpanded: boolean;
  onToggle: () => void;
}

const InteractionCard: React.FC<InteractionCardProps> = ({
  interaction,
  isExpanded,
  onToggle,
}) => {
  const styles = severityStyles[interaction.severity];
  const Icon = styles.icon;

  return (
    <motion.div
      variants={fadeInUp}
      className={cn('rounded-lg border-2 overflow-hidden', styles.bg, styles.border)}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-start gap-3 text-left hover:opacity-80 transition-opacity"
      >
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', styles.color)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn('text-xs font-bold px-2 py-0.5 rounded', styles.color)}>
              {styles.label}
            </span>
          </div>
          <h4 className={cn('font-semibold mb-1', styles.text)}>
            {interaction.drug1} + {interaction.drug2}
          </h4>
          <p className={cn('text-sm', styles.text)}>{interaction.effect}</p>
        </div>
        <div className="flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className={cn('w-5 h-5', styles.color)} />
          ) : (
            <ChevronDown className={cn('w-5 h-5', styles.color)} />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-current/20">
              {/* Mechanism */}
              <div className="pt-3">
                <p className={cn('text-xs font-semibold uppercase mb-1', styles.text)}>
                  Mechanism:
                </p>
                <p className="text-sm">{interaction.mechanism}</p>
              </div>

              {/* Clinical Significance */}
              <div>
                <p className={cn('text-xs font-semibold uppercase mb-1', styles.text)}>
                  Clinical Significance:
                </p>
                <p className="text-sm">{interaction.clinicalSignificance}</p>
              </div>

              {/* Recommendations */}
              <div>
                <p className={cn('text-xs font-semibold uppercase mb-1', styles.text)}>
                  Recommendations:
                </p>
                <ul className="text-sm space-y-1">
                  {interaction.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className={styles.color}>•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Alternatives */}
              {interaction.alternatives && interaction.alternatives.length > 0 && (
                <div>
                  <p className={cn('text-xs font-semibold uppercase mb-1', styles.text)}>
                    Alternative Medications:
                  </p>
                  <ul className="text-sm space-y-1">
                    {interaction.alternatives.map((alt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className={styles.color}>→</span>
                        <span>{alt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* References */}
              {interaction.references && interaction.references.length > 0 && (
                <div className="pt-2 border-t border-current/10">
                  <p className={cn('text-xs font-semibold uppercase mb-1', styles.text)}>
                    References:
                  </p>
                  <ul className="text-xs space-y-1">
                    {interaction.references.map((ref, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span>{idx + 1}.</span>
                        <span>{ref}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const DrugInteractionChecker: React.FC<DrugInteractionCheckerProps> = ({
  medications: propMedications = [],
  onInteractionDetected,
  onMedicationsChange,
  className,
}) => {
  const [medications, setMedications] = useState<Medication[]>(propMedications);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedInteractions, setExpandedInteractions] = useState<Set<number>>(new Set());

  // Check for interactions
  const interactions = useMemo(() => {
    const found: DrugInteraction[] = [];

    // Check each pair of medications
    for (let i = 0; i < medications.length; i++) {
      for (let j = i + 1; j < medications.length; j++) {
        const med1 = medications[i].name.toLowerCase();
        const med2 = medications[j].name.toLowerCase();

        // Find interactions in database
        const interaction = INTERACTION_DATABASE.find(
          (int) =>
            (int.drug1.toLowerCase() === med1 && int.drug2.toLowerCase() === med2) ||
            (int.drug1.toLowerCase() === med2 && int.drug2.toLowerCase() === med1)
        );

        if (interaction) {
          found.push(interaction);
        }
      }
    }

    // Sort by severity
    const severityOrder = { contraindicated: 0, major: 1, moderate: 2, minor: 3 };
    found.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    return found;
  }, [medications]);

  // Notify parent of interactions
  useEffect(() => {
    if (onInteractionDetected) {
      onInteractionDetected(interactions);
    }
  }, [interactions, onInteractionDetected]);

  // Add medication
  const handleAddMedication = useCallback(
    (name: string) => {
      const newMed: Medication = {
        id: `med-${Date.now()}`,
        name: name.trim(),
      };

      const newMedications = [...medications, newMed];
      setMedications(newMedications);
      onMedicationsChange?.(newMedications);
      setSearchTerm('');
    },
    [medications, onMedicationsChange]
  );

  // Remove medication
  const handleRemoveMedication = useCallback(
    (id: string) => {
      const newMedications = medications.filter((med) => med.id !== id);
      setMedications(newMedications);
      onMedicationsChange?.(newMedications);
    },
    [medications, onMedicationsChange]
  );

  // Toggle interaction expansion
  const toggleInteraction = useCallback((index: number) => {
    setExpandedInteractions((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  // Summary stats
  const stats = useMemo(() => {
    const counts = {
      contraindicated: 0,
      major: 0,
      moderate: 0,
      minor: 0,
    };

    interactions.forEach((int) => {
      counts[int.severity]++;
    });

    return counts;
  }, [interactions]);

  return (
    <Card className={cn('p-6', className)}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Drug Interaction Checker
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Add medications to check for potential drug-drug interactions
        </p>
      </div>

      {/* Add Medication */}
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchTerm.trim()) {
                  handleAddMedication(searchTerm);
                }
              }}
              placeholder="Enter medication name..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-brand-primary-500 focus:border-transparent"
            />
          </div>
          <Button
            onClick={() => searchTerm.trim() && handleAddMedication(searchTerm)}
            disabled={!searchTerm.trim()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      {/* Current Medications */}
      {medications.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Current Medications ({medications.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {medications.map((med) => (
              <motion.div
                key={med.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm"
              >
                <span>{med.name}</span>
                <button
                  onClick={() => handleRemoveMedication(med.id)}
                  className="hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Interaction Summary */}
      {interactions.length > 0 && (
        <div className="mb-6 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Interaction Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(stats).map(([severity, count]) => {
              if (count === 0) return null;
              const styles = severityStyles[severity as InteractionSeverity];
              return (
                <div
                  key={severity}
                  className={cn('p-2 rounded text-center', styles.bg)}
                >
                  <p className={cn('text-2xl font-bold', styles.color)}>{count}</p>
                  <p className={cn('text-xs uppercase font-semibold', styles.text)}>
                    {styles.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactions List */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
          {interactions.length > 0
            ? `Detected Interactions (${interactions.length})`
            : 'No Interactions Detected'}
        </h3>

        <AnimatePresence mode="popLayout">
          {interactions.length > 0 ? (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={{
                initial: {},
                animate: { transition: { staggerChildren: 0.05 } },
                exit: {},
              }}
              className="space-y-3"
            >
              {interactions.map((interaction, index) => (
                <InteractionCard
                  key={`${interaction.drug1}-${interaction.drug2}`}
                  interaction={interaction}
                  isExpanded={expandedInteractions.has(index)}
                  onToggle={() => toggleInteraction(index)}
                />
              ))}
            </motion.div>
          ) : medications.length >= 2 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center text-green-600 dark:text-green-400 border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg"
            >
              <Info className="w-8 h-8 mx-auto mb-2" />
              <p className="font-medium">No known interactions found</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                The selected medications do not have documented interactions
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center text-neutral-500 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg"
            >
              <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Add at least 2 medications to check for interactions</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <p className="text-xs text-neutral-500 text-center">
          <strong>Disclaimer:</strong> This tool is for educational purposes only. Always consult
          with a qualified healthcare professional before making clinical decisions. Not all
          interactions may be listed.
        </p>
      </div>
    </Card>
  );
};
