'use client';

import { useState, useCallback, useMemo } from 'react';
import { DiagnosisDifferential } from '@/app/components/intelligence';

interface DiagnosticContext {
  symptoms?: string[];
  patientAge?: number;
  gender?: 'M' | 'F';
  riskFactors?: string[];
}

function generateDifferentialDiagnosis(context: DiagnosticContext): DiagnosisDifferential[] {
  const symptomLower = (context.symptoms || []).map((s) => s.toLowerCase());

  const differentials: DiagnosisDifferential[] = [];

  if (symptomLower.some((s) => s.includes('chest'))) {
    differentials.push(
      {
        id: 'acs',
        diagnosis: 'Acute Coronary Syndrome',
        probability: 0.75,
        keyFeatures: ['Chest pain', 'Dyspnea', 'Diaphoresis'],
        reasoning: 'Classic presentation with multiple risk factors present',
        nextSteps: ['EKG', 'Troponin', 'Cardiology consult'],
      },
      {
        id: 'pe',
        diagnosis: 'Pulmonary Embolism',
        probability: 0.35,
        keyFeatures: ['Chest pain', 'Dyspnea', 'Tachycardia'],
        reasoning: 'Pleuritic chest pain and dyspnea present',
        nextSteps: ['CT-PE protocol', 'D-dimer'],
      }
    );
  }

  if (symptomLower.some((s) => s.includes('fever'))) {
    differentials.push(
      {
        id: 'uri',
        diagnosis: 'Upper Respiratory Infection',
        probability: 0.5,
        keyFeatures: ['Fever', 'Cough', 'Rhinorrhea'],
        reasoning: 'Most common cause of fever in primary care',
        nextSteps: ['Supportive care'],
      },
      {
        id: 'covid',
        diagnosis: 'COVID-19',
        probability: 0.4,
        keyFeatures: ['Fever', 'Cough', 'Loss of taste/smell'],
        reasoning: 'Still a consideration with respiratory symptoms',
        nextSteps: ['PCR test', 'Isolation'],
      }
    );
  }

  return differentials.sort((a, b) => b.probability - a.probability);
}

export function useDifferentialDiagnosis(initialContext?: DiagnosticContext) {
  const [symptoms, setSymptoms] = useState<string[]>(initialContext?.symptoms || []);
  const [patientAge, setPatientAge] = useState<number | undefined>(initialContext?.patientAge);
  const [gender, setGender] = useState<'M' | 'F' | undefined>(initialContext?.gender);
  const [riskFactors, setRiskFactors] = useState<string[]>(initialContext?.riskFactors || []);

  const diagnosticContext: DiagnosticContext = useMemo(
    () => ({
      symptoms,
      patientAge,
      gender,
      riskFactors,
    }),
    [symptoms, patientAge, gender, riskFactors]
  );

  const differentials: DiagnosisDifferential[] = useMemo(
    () => generateDifferentialDiagnosis(diagnosticContext),
    [diagnosticContext]
  );

  const addSymptom = useCallback((symptom: string) => {
    if (symptom && !symptoms.includes(symptom)) {
      setSymptoms((prev) => [...prev, symptom]);
    }
  }, [symptoms]);

  const removeSymptom = useCallback((symptom: string) => {
    setSymptoms((prev) => prev.filter((s) => s !== symptom));
  }, []);

  const addRiskFactor = useCallback((factor: string) => {
    if (factor && !riskFactors.includes(factor)) {
      setRiskFactors((prev) => [...prev, factor]);
    }
  }, [riskFactors]);

  const removeRiskFactor = useCallback((factor: string) => {
    setRiskFactors((prev) => prev.filter((f) => f !== factor));
  }, []);

  const reset = useCallback(() => {
    setSymptoms([]);
    setPatientAge(undefined);
    setGender(undefined);
    setRiskFactors([]);
  }, []);

  return {
    symptoms,
    addSymptom,
    removeSymptom,
    patientAge,
    setPatientAge,
    gender,
    setGender,
    riskFactors,
    addRiskFactor,
    removeRiskFactor,
    differentials,
    diagnosticContext,
    reset,
  };
}

export default useDifferentialDiagnosis;
