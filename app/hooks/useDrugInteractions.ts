'use client';

import { useState, useCallback, useMemo } from 'react';

export type InteractionSeverity = 'contraindicated' | 'major' | 'moderate' | 'minor';

export interface DrugCheckInteraction {
  id: string;
  drug1: string;
  drug2: string;
  severity: InteractionSeverity;
  mechanism: string;
  recommendation: string;
}

/**
 * Simulated drug interaction database
 */
const INTERACTION_DATABASE: Record<string, Record<string, { severity: InteractionSeverity; mechanism: string; recommendation: string }>> = {
  warfarin: {
    aspirin: {
      severity: 'major',
      mechanism: 'Increased bleeding risk due to platelet inhibition and anticoagulation',
      recommendation: 'Use alternative antiplatelet if possible. Monitor INR closely.',
    },
    nsaid: {
      severity: 'major',
      mechanism: 'Increased GI bleeding risk and reduced warfarin metabolism',
      recommendation: 'Avoid NSAIDs. Use acetaminophen for pain relief.',
    },
    metformin: {
      severity: 'moderate',
      mechanism: 'Possible increased warfarin effect',
      recommendation: 'Monitor INR regularly.',
    },
  },
  lisinopril: {
    potassium: {
      severity: 'major',
      mechanism: 'Risk of hyperkalemia with ACE inhibitor',
      recommendation: 'Monitor potassium levels. Reduce supplemental potassium.',
    },
    ibuprofen: {
      severity: 'major',
      mechanism: 'Reduced antihypertensive effect and renal function decline',
      recommendation: 'Use alternative analgesic. Consider reduced lisinopril dose.',
    },
    metformin: {
      severity: 'moderate',
      mechanism: 'Possible increased metformin levels',
      recommendation: 'Monitor renal function.',
    },
  },
  metformin: {
    contrast: {
      severity: 'major',
      mechanism: 'Risk of lactic acidosis with contrast dye',
      recommendation: 'Hold metformin 48 hours before and after contrast procedures.',
    },
    alcohol: {
      severity: 'moderate',
      mechanism: 'Increased risk of lactic acidosis',
      recommendation: 'Limit alcohol consumption.',
    },
  },
  simvastatin: {
    amiodarone: {
      severity: 'major',
      mechanism: 'Increased statin levels and myopathy risk',
      recommendation: 'Reduce simvastatin dose or use alternative statin.',
    },
    clarithromycin: {
      severity: 'major',
      mechanism: 'Increased statin levels via CYP3A4 inhibition',
      recommendation: 'Use alternative antibiotic or reduce statin dose.',
    },
  },
};

export interface UseDrugInteractionsOptions {
  initialMedications?: string[];
}

export function useDrugInteractions(options: UseDrugInteractionsOptions = {}) {
  const [medications, setMedications] = useState<string[]>(options.initialMedications || []);

  const interactions = useMemo<DrugCheckInteraction[]>(() => {
    const found: DrugCheckInteraction[] = [];
    const medLower = medications.map((m) => m.toLowerCase());

    // Check all pairs
    for (let i = 0; i < medLower.length; i++) {
      for (let j = i + 1; j < medLower.length; j++) {
        const drug1 = medications[i];
        const drug2 = medications[j];
        const drug1Lower = medLower[i];
        const drug2Lower = medLower[j];

        // Check if interaction exists
        if (INTERACTION_DATABASE[drug1Lower]?.[drug2Lower]) {
          const interactionData = INTERACTION_DATABASE[drug1Lower][drug2Lower];
          found.push({
            id: `${drug1Lower}-${drug2Lower}`,
            drug1,
            drug2,
            ...interactionData,
          });
        } else if (INTERACTION_DATABASE[drug2Lower]?.[drug1Lower]) {
          const interactionData = INTERACTION_DATABASE[drug2Lower][drug1Lower];
          found.push({
            id: `${drug2Lower}-${drug1Lower}`,
            drug1,
            drug2,
            ...interactionData,
          });
        }
      }
    }

    return found;
  }, [medications]);

  const addMedication = useCallback((drug: string) => {
    const cleaned = drug.trim();
    if (cleaned && !medications.some((m) => m.toLowerCase() === cleaned.toLowerCase())) {
      setMedications((prev) => [...prev, cleaned]);
    }
  }, [medications]);

  const removeMedication = useCallback((drug: string) => {
    setMedications((prev) => prev.filter((m) => m !== drug));
  }, []);

  const reset = useCallback(() => {
    setMedications([]);
  }, []);

  const criticalCount = useMemo(
    () => interactions.filter((i) => i.severity === 'contraindicated' || i.severity === 'major').length,
    [interactions]
  );

  return {
    medications,
    addMedication,
    removeMedication,
    interactions,
    criticalCount,
    reset,
  };
}

export default useDrugInteractions;
