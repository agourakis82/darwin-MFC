'use client';

import React, { useState, useCallback } from 'react';
import { Search, Plus, Check, AlertCircle, Activity, Brain } from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

interface DifferentialDiagnosis {
  condition: string;
  probability: number;
  symptoms: string[];
}

interface DiagnosisAssistantProps {
  onDiagnosisComplete?: (results: DifferentialDiagnosis[]) => void;
}

// =============================================================================
// SYMPTOM DATA (Portuguese)
// =============================================================================

const SYMPTOMS = [
  'Febre',
  'Dor de cabeça',
  'Tosse seca',
  'Tosse produtiva',
  'Fadiga',
  'Dor no peito',
  'Falta de ar',
  'Dispneia aos esforços',
  'Náusea',
  'Vômito',
  'Diarreia',
  'Constipação',
  'Dor abdominal',
  'Dor epigástrica',
  'Erupção cutânea',
  'Prurido',
  'Dor nas articulações',
  'Rigidez articular',
  'Fraqueza muscular',
  'Mialgia',
  'Perda de peso',
  'Ganho de peso',
  'Insônia',
  'Sonolência excessiva',
  'Ansiedade',
  'Depressão',
  'Visão turva',
  'Dor ocular',
  'Poliúria',
  'Polidipsia',
  'Edema de membros inferiores',
  'Palpitações',
  'Sudorese noturna',
  'Calafrios',
  'Odinofagia',
  'Disfagia',
  'Icterícia',
  'Hematúria',
  'Disúria',
  'Lombalgia',
];

// =============================================================================
// DIAGNOSIS ASSISTANT COMPONENT
// =============================================================================

export function DiagnosisAssistant({ onDiagnosisComplete }: DiagnosisAssistantProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnoses, setDiagnoses] = useState<DifferentialDiagnosis[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Filter symptoms based on search
  const filteredSymptoms = SYMPTOMS.filter((symptom) =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle symptom selection
  const toggleSymptom = useCallback((symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
    setError(null);
  }, []);

  // Mock AI diagnosis function
  const getDifferentialDiagnosis = async (symptoms: string[]): Promise<DifferentialDiagnosis[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (symptoms.length === 0) {
      throw new Error('Selecione pelo menos um sintoma para análise.');
    }

    // Simplified diagnostic logic based on symptom patterns
    const results: DifferentialDiagnosis[] = [];

    // Check for respiratory patterns
    if (symptoms.some(s => ['Tosse seca', 'Tosse produtiva', 'Falta de ar', 'Febre'].includes(s))) {
      results.push({ condition: 'Infecção Respiratória', probability: 0.75, symptoms });
      if (symptoms.includes('Febre') && symptoms.includes('Tosse produtiva')) {
        results.push({ condition: 'Pneumonia', probability: 0.65, symptoms });
      }
    }

    // Check for GI patterns
    if (symptoms.some(s => ['Náusea', 'Vômito', 'Diarreia', 'Dor abdominal'].includes(s))) {
      results.push({ condition: 'Gastroenterite', probability: 0.70, symptoms });
    }

    // Check for cardiac patterns
    if (symptoms.some(s => ['Dor no peito', 'Falta de ar', 'Palpitações', 'Edema de membros inferiores'].includes(s))) {
      results.push({ condition: 'Insuficiência Cardíaca', probability: 0.55, symptoms });
    }

    // Check for metabolic patterns
    if (symptoms.some(s => ['Poliúria', 'Polidipsia', 'Fadiga', 'Perda de peso'].includes(s))) {
      results.push({ condition: 'Diabetes Mellitus', probability: 0.60, symptoms });
    }

    // Check for rheumatic patterns
    if (symptoms.some(s => ['Dor nas articulações', 'Rigidez articular', 'Fadiga'].includes(s))) {
      results.push({ condition: 'Artrite Reumatoide', probability: 0.45, symptoms });
    }

    // Add generic conditions if few specific matches
    if (results.length < 3) {
      if (symptoms.includes('Fadiga')) {
        results.push({ condition: 'Síndrome da Fadiga Crônica', probability: 0.35, symptoms });
      }
      if (symptoms.includes('Ansiedade') || symptoms.includes('Depressão')) {
        results.push({ condition: 'Transtorno de Ansiedade', probability: 0.50, symptoms });
      }
    }

    // Sort by probability and return top 5
    return results.sort((a, b) => b.probability - a.probability).slice(0, 5);
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      setError('Selecione pelo menos um sintoma.');
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    try {
      const results = await getDifferentialDiagnosis(selectedSymptoms);
      setDiagnoses(results);
      onDiagnosisComplete?.(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro na análise de diagnósticos.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearSelection = () => {
    setSelectedSymptoms([]);
    setDiagnoses([]);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Assistente de Diagnóstico
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Selecione os sintomas para análise diferencial
          </p>
        </div>
      </div>

      {/* Symptom Search and Selection */}
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Pesquisar sintomas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Selected symptoms chips */}
        {selectedSymptoms.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSymptoms.map((symptom) => (
              <span
                key={symptom}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/50"
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom}
                <span className="text-blue-600 dark:text-blue-400">×</span>
              </span>
            ))}
            <button
              onClick={clearSelection}
              className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 underline"
            >
              Limpar tudo
            </button>
          </div>
        )}

        {/* Symptom list */}
        <div className="max-h-60 overflow-y-auto space-y-1 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2">
          {filteredSymptoms.map((symptom) => (
            <button
              key={symptom}
              onClick={() => toggleSymptom(symptom)}
              className={`w-full flex justify-between items-center p-2.5 rounded-md transition-colors ${
                selectedSymptoms.includes(symptom)
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                  : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'
              }`}
            >
              <span>{symptom}</span>
              {selectedSymptoms.includes(symptom) ? (
                <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              ) : (
                <Plus className="w-5 h-5 text-zinc-400" />
              )}
            </button>
          ))}
          {filteredSymptoms.length === 0 && (
            <p className="text-center text-zinc-500 py-4">Nenhum sintoma encontrado</p>
          )}
        </div>

        {error && (
          <div className="mt-3 flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      {/* Analyze Button */}
      <button
        onClick={analyzeSymptoms}
        disabled={selectedSymptoms.length === 0 || isAnalyzing}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-zinc-400 dark:disabled:bg-zinc-600 transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isAnalyzing ? (
          <>
            <Activity className="w-5 h-5 animate-pulse" />
            Analisando...
          </>
        ) : (
          <>
            <Brain className="w-5 h-5" />
            Analisar ({selectedSymptoms.length} sintomas)
          </>
        )}
      </button>

      {/* Differential Diagnoses Results */}
      {diagnoses.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-500" />
            Diagnósticos Diferenciais
          </h3>
          <div className="space-y-3">
            {diagnoses.map((diagnosis, index) => (
              <div
                key={index}
                className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-zinc-900 dark:text-white">
                    {index + 1}. {diagnosis.condition}
                  </span>
                  <span
                    className={`text-sm font-bold px-2 py-0.5 rounded ${
                      diagnosis.probability >= 0.7
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : diagnosis.probability >= 0.5
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400'
                    }`}
                  >
                    {Math.round(diagnosis.probability * 100)}%
                  </span>
                </div>
                {/* Probability bar */}
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      diagnosis.probability >= 0.7
                        ? 'bg-green-500'
                        : diagnosis.probability >= 0.5
                        ? 'bg-yellow-500'
                        : 'bg-zinc-400'
                    }`}
                    style={{ width: `${diagnosis.probability * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg">
            <strong>Aviso:</strong> Esta é uma ferramenta de suporte à decisão clínica e não
            substitui a avaliação médica profissional. Os resultados devem ser interpretados
            no contexto clínico do paciente.
          </p>
        </div>
      )}
    </div>
  );
}

export default DiagnosisAssistant;
