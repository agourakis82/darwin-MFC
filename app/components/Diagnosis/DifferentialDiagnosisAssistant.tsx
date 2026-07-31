'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Brain,
  Check,
  ChevronDown,
  ChevronUp,
  Plus,
  Search,
  ShieldCheck,
  ShieldX,
  Stethoscope,
  TestTube,
  X,
} from 'lucide-react';
import {
  generateDifferentialDiagnosis,
  getAllSintomas,
  patientAgeInDays,
  patientAgeInYears,
  type DifferentialDiagnosisResult,
  type PatientAgeUnit,
} from '@/lib/utils/differential-diagnosis';
import { runSilentClinicalKernel } from '@/lib/clinical-kernel/loader';
import type { EpistemicDifferential } from '@/lib/clinical-kernel/types';
import {
  EMPTY_PERTUSSIS_SAFETY_INPUT,
  evaluatePertussisSafety,
  isPertussisSafetyRelevant,
  type ClinicalAnswer,
} from '@/lib/clinical-safety/pertussis';
import {
  EMPTY_PEDIATRIC_RESPIRATORY_SAFETY_INPUT,
  evaluatePediatricRespiratorySafety,
  isPediatricRespiratorySafetyRelevant,
} from '@/lib/clinical-safety/pediatric-respiratory';
import {
  EMPTY_YOUNG_INFANT_FEVER_SAFETY_INPUT,
  evaluateYoungInfantFeverSafety,
  isYoungInfantFeverConcernSymptom,
  isYoungInfantFeverSafetyRelevant,
} from '@/lib/clinical-safety/young-infant-fever';
import PertussisSafetyInterview, {
  type PertussisSafetyAnswers,
} from './PertussisSafetyInterview';
import PediatricRespiratorySafetyInterview, {
  type PediatricRespiratorySafetyAnswers,
} from './PediatricRespiratorySafetyInterview';
import YoungInfantFeverSafetyInterview, {
  type YoungInfantFeverSafetyAnswers,
} from './YoungInfantFeverSafetyInterview';

interface DifferentialDiagnosisAssistantProps {
  initialSymptom?: string;
  initialSecondarySymptoms?: string[];
  selectedDiagnosisId?: string;
  patientAge?: string;
  patientAgeUnit?: PatientAgeUnit;
  patientWeightKg?: string;
  onPatientContextChange?: (updates: { age?: string; ageUnit?: PatientAgeUnit; weightKg?: string }) => void;
  onDiagnosisSelect?: (doencaId: string) => void;
}

const probabilityStyles = {
  alta: 'border-emerald-300/25 bg-emerald-300/[0.06] text-emerald-200',
  moderada: 'border-amber-300/25 bg-amber-300/[0.06] text-amber-200',
  baixa: 'border-cyan-300/20 bg-cyan-300/[0.05] text-cyan-200',
};

function uniqueSymptoms(symptoms: string[]): string[] {
  return [...new Set(symptoms)];
}

function mergeClinicalAnswers(...answers: ClinicalAnswer[]): ClinicalAnswer {
  if (answers.includes('yes')) return 'yes';
  if (answers.every(answer => answer === 'no')) return 'no';
  return 'unknown';
}

export default function DifferentialDiagnosisAssistant({
  initialSymptom = '',
  initialSecondarySymptoms = [],
  selectedDiagnosisId,
  patientAge = '',
  patientAgeUnit = 'anos',
  patientWeightKg = '',
  onPatientContextChange,
  onDiagnosisSelect,
}: DifferentialDiagnosisAssistantProps) {
  const [primarySymptom, setPrimarySymptom] = useState(initialSymptom);
  const [secondarySymptoms, setSecondarySymptoms] = useState<string[]>(initialSecondarySymptoms);
  const [newSymptom, setNewSymptom] = useState('');
  const [result, setResult] = useState<DifferentialDiagnosisResult | null>(null);
  const [kernelResult, setKernelResult] = useState<EpistemicDifferential | null>(null);
  const [kernelChecking, setKernelChecking] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [pertussisAnswers, setPertussisAnswers] = useState<PertussisSafetyAnswers>({
    ...EMPTY_PERTUSSIS_SAFETY_INPUT,
  });
  const [pediatricRespiratoryAnswers, setPediatricRespiratoryAnswers] = useState<PediatricRespiratorySafetyAnswers>({
    ...EMPTY_PEDIATRIC_RESPIRATORY_SAFETY_INPUT,
  });
  const [youngInfantFeverAnswers, setYoungInfantFeverAnswers] = useState<YoungInfantFeverSafetyAnswers>({
    ...EMPTY_YOUNG_INFANT_FEVER_SAFETY_INPUT,
  });
  const symptomNames = useMemo(() => getAllSintomas().map(item => item.nome), []);
  const ageValue = patientAge === '' ? undefined : Number(patientAge.replace(',', '.'));
  const weightKg = patientWeightKg === '' ? undefined : Number(patientWeightKg.replace(',', '.'));
  const patientAgeContext = { ageValue, ageUnit: patientAgeUnit };
  const ageYears = patientAgeInYears(patientAgeContext);
  const ageDays = patientAgeInDays(patientAgeContext);
  const youngInfantFeverRelevant = isYoungInfantFeverSafetyRelevant(
    [primarySymptom, ...secondarySymptoms],
    ageDays,
  );
  const youngInfantFeverAssessment = evaluateYoungInfantFeverSafety({
    ...youngInfantFeverAnswers,
    ageDays,
    feverConcernPresent: youngInfantFeverRelevant,
  });
  const resolvedApnea = youngInfantFeverRelevant
    ? youngInfantFeverAnswers.apnea
    : pediatricRespiratoryAnswers.apnea;
  const resolvedCentralCyanosis = youngInfantFeverRelevant
    ? youngInfantFeverAnswers.centralCyanosis
    : pediatricRespiratoryAnswers.centralCyanosis;
  const respiratoryRelevant = isPediatricRespiratorySafetyRelevant(
    [primarySymptom, ...secondarySymptoms],
    ageDays,
  );
  const pediatricRespiratoryAssessment = evaluatePediatricRespiratorySafety({
    ...pediatricRespiratoryAnswers,
    apnea: resolvedApnea,
    centralCyanosis: resolvedCentralCyanosis,
    convulsions: youngInfantFeverRelevant
      ? youngInfantFeverAnswers.convulsions
      : pediatricRespiratoryAnswers.convulsions,
    lethargyOrUnconsciousness: youngInfantFeverRelevant
      ? mergeClinicalAnswers(youngInfantFeverAnswers.illAppearance, youngInfantFeverAnswers.reducedMovement)
      : pediatricRespiratoryAnswers.lethargyOrUnconsciousness,
    unableToDrinkOrBreastfeed: youngInfantFeverRelevant
      ? youngInfantFeverAnswers.unableToFeed
      : pediatricRespiratoryAnswers.unableToDrinkOrBreastfeed,
    vomitingEverything: youngInfantFeverRelevant
      ? youngInfantFeverAnswers.vomitingEverything
      : pediatricRespiratoryAnswers.vomitingEverything,
    severeWorkOfBreathing: youngInfantFeverRelevant
      ? youngInfantFeverAnswers.severeRespiratoryDistress
      : pediatricRespiratoryAnswers.severeWorkOfBreathing,
    ageDays,
    respiratorySymptomsPresent: respiratoryRelevant,
  });
  const pertussisRelevant = isPertussisSafetyRelevant([primarySymptom, ...secondarySymptoms]);
  const pertussisAssessment = evaluatePertussisSafety({
    ...pertussisAnswers,
    apnea: respiratoryRelevant ? resolvedApnea : pertussisAnswers.apnea,
    cyanosis: respiratoryRelevant ? resolvedCentralCyanosis : pertussisAnswers.cyanosis,
    ageDays,
    coughPresent: pertussisRelevant,
  });
  const ageBand = ageYears === undefined
    ? null
    : ageYears < (2 / 12) ? 'Neonatal / lactente jovem'
    : ageYears < 2 ? 'Lactente'
    : ageYears < 6 ? 'Pré-escolar'
    : ageYears < 12 ? 'Escolar'
    : ageYears < 18 ? 'Adolescente'
    : ageYears >= 65 ? 'Pessoa idosa'
    : 'Adulto';

  useEffect(() => {
    if (initialSymptom) setPrimarySymptom(initialSymptom);
  }, [initialSymptom]);

  useEffect(() => {
    if (initialSecondarySymptoms.length > 0) setSecondarySymptoms(initialSecondarySymptoms);
  }, [initialSecondarySymptoms]);

  useEffect(() => {
    if (!youngInfantFeverRelevant) return;
    setYoungInfantFeverAnswers(previous => {
      const next = {
        ...previous,
        apnea: previous.apnea === 'unknown' ? pediatricRespiratoryAnswers.apnea : previous.apnea,
        centralCyanosis: previous.centralCyanosis === 'unknown'
          ? pediatricRespiratoryAnswers.centralCyanosis
          : previous.centralCyanosis,
        convulsions: previous.convulsions === 'unknown'
          ? pediatricRespiratoryAnswers.convulsions
          : previous.convulsions,
        unableToFeed: previous.unableToFeed === 'unknown'
          ? pediatricRespiratoryAnswers.unableToDrinkOrBreastfeed
          : previous.unableToFeed,
        vomitingEverything: previous.vomitingEverything === 'unknown'
          ? pediatricRespiratoryAnswers.vomitingEverything
          : previous.vomitingEverything,
        severeRespiratoryDistress: previous.severeRespiratoryDistress === 'unknown'
          ? pediatricRespiratoryAnswers.severeWorkOfBreathing
          : previous.severeRespiratoryDistress,
        illAppearance: previous.illAppearance === 'unknown'
          && pediatricRespiratoryAnswers.lethargyOrUnconsciousness === 'yes'
          ? 'yes' as const
          : previous.illAppearance,
      };
      return Object.keys(next).every(key => (
        next[key as keyof YoungInfantFeverSafetyAnswers]
          === previous[key as keyof YoungInfantFeverSafetyAnswers]
      )) ? previous : next;
    });
  }, [
    youngInfantFeverRelevant,
    pediatricRespiratoryAnswers.apnea,
    pediatricRespiratoryAnswers.centralCyanosis,
    pediatricRespiratoryAnswers.convulsions,
    pediatricRespiratoryAnswers.lethargyOrUnconsciousness,
    pediatricRespiratoryAnswers.severeWorkOfBreathing,
    pediatricRespiratoryAnswers.unableToDrinkOrBreastfeed,
    pediatricRespiratoryAnswers.vomitingEverything,
  ]);

  const updateYoungInfantFeverAnswers = (updates: Partial<YoungInfantFeverSafetyAnswers>) => {
    const next = { ...youngInfantFeverAnswers, ...updates };
    setYoungInfantFeverAnswers(next);

    const respiratoryUpdates: Partial<PediatricRespiratorySafetyAnswers> = {};
    if (updates.apnea !== undefined) respiratoryUpdates.apnea = updates.apnea;
    if (updates.centralCyanosis !== undefined) respiratoryUpdates.centralCyanosis = updates.centralCyanosis;
    if (updates.convulsions !== undefined) respiratoryUpdates.convulsions = updates.convulsions;
    if (updates.unableToFeed !== undefined) respiratoryUpdates.unableToDrinkOrBreastfeed = updates.unableToFeed;
    if (updates.vomitingEverything !== undefined) respiratoryUpdates.vomitingEverything = updates.vomitingEverything;
    if (updates.severeRespiratoryDistress !== undefined) {
      respiratoryUpdates.severeWorkOfBreathing = updates.severeRespiratoryDistress;
    }
    if (updates.illAppearance !== undefined || updates.reducedMovement !== undefined) {
      respiratoryUpdates.lethargyOrUnconsciousness = mergeClinicalAnswers(
        next.illAppearance,
        next.reducedMovement,
      );
    }
    if (Object.keys(respiratoryUpdates).length > 0) {
      setPediatricRespiratoryAnswers(previous => ({ ...previous, ...respiratoryUpdates }));
    }
  };

  const analyze = () => {
    if (!primarySymptom.trim()) return;
    const heuristicSymptoms = uniqueSymptoms([
      ...secondarySymptoms,
      ...(youngInfantFeverRelevant ? youngInfantFeverAssessment.heuristicSymptoms : []),
      ...(respiratoryRelevant ? pediatricRespiratoryAssessment.heuristicSymptoms : []),
      ...(pertussisRelevant ? pertussisAssessment.heuristicSymptoms : []),
    ]);
    setResult(generateDifferentialDiagnosis(primarySymptom, heuristicSymptoms, [], {
      ageValue,
      ageUnit: patientAgeUnit,
      weightKg,
    }));
    const reportedKernelSymptoms = youngInfantFeverRelevant
      ? [primarySymptom, ...secondarySymptoms].filter(symptom => !isYoungInfantFeverConcernSymptom(symptom))
      : [primarySymptom, ...secondarySymptoms];
    setKernelChecking(true);
    setKernelResult(null);
    void runSilentClinicalKernel({
      ageYears,
      symptoms: [
        ...reportedKernelSymptoms,
        ...(youngInfantFeverRelevant ? youngInfantFeverAssessment.kernelSymptoms : []),
        ...(respiratoryRelevant ? pediatricRespiratoryAssessment.kernelSymptoms : []),
        ...(pertussisRelevant ? pertussisAssessment.kernelSymptoms : []),
      ].filter((symptom, index, symptoms) => symptoms.indexOf(symptom) === index),
    }).then(kernel => {
      setKernelResult(kernel);
      setKernelChecking(false);
    });
  };

  const addSecondarySymptom = () => {
    const symptom = newSymptom.trim();
    if (!symptom || secondarySymptoms.some(item => item.toLowerCase() === symptom.toLowerCase())) return;
    setSecondarySymptoms(previous => [...previous, symptom]);
    setNewSymptom('');
  };

  return (
    <section className="overflow-hidden rounded-md border border-cyan-300/25 bg-[#071319]" aria-labelledby="clinical-assistant-title">
      <div className="flex items-center justify-between border-b border-white/10 bg-cyan-300/[0.05] px-4 py-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-cyan-300/25 bg-cyan-300/10">
            <Brain className="h-4 w-4 text-cyan-300" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase text-cyan-300">Apoio clínico por sintomas</p>
            <h2 id="clinical-assistant-title" className="text-base font-semibold text-white">Hipóteses clínicas e diferenciais</h2>
            <p className="mt-0.5 text-xs text-zinc-500">Ordena aderência clínica e mantém sinais de alarme independentes.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setExpanded(value => !value)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
          aria-label={expanded ? 'Recolher assistente clínico' : 'Expandir assistente clínico'}
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {expanded && (
        <div>
          <div className="flex flex-col gap-3 border-b border-white/[0.07] bg-black/10 px-4 py-3 sm:flex-row sm:items-end">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <label className="min-w-0 flex-1 text-xs font-medium text-zinc-400">
                Idade do paciente
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  inputMode="decimal"
                  value={patientAge}
                  onChange={event => onPatientContextChange?.({ age: event.target.value })}
                  placeholder="Idade"
                  className="mt-1.5 h-10 w-full rounded-md border border-white/15 bg-black/20 px-3 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan-300/50"
                />
              </label>
              <label className="w-[104px] shrink-0 text-xs font-medium text-zinc-400">
                Unidade
                <select
                  value={patientAgeUnit}
                  onChange={event => onPatientContextChange?.({ ageUnit: event.target.value as PatientAgeUnit })}
                  className="mt-1.5 h-10 w-full rounded-md border border-white/15 bg-[#071319] px-2 text-sm text-zinc-100 outline-none transition-colors focus:border-cyan-300/50"
                >
                  <option value="dias">dias</option>
                  <option value="meses">meses</option>
                  <option value="anos">anos</option>
                </select>
              </label>
            </div>
            <label className="block min-w-0 sm:w-36 text-xs font-medium text-zinc-400">
              Peso para dose
              <div className="relative mt-1.5">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  inputMode="decimal"
                  value={patientWeightKg}
                  onChange={event => onPatientContextChange?.({ weightKg: event.target.value })}
                  placeholder="Peso"
                  className="h-10 w-full rounded-md border border-white/15 bg-black/20 px-3 pr-9 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan-300/50"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-600">kg</span>
              </div>
            </label>
            <div className="flex h-10 items-center rounded-md border border-white/10 bg-white/[0.03] px-3 text-xs text-zinc-400 sm:min-w-36">
              {ageBand || 'Informe a idade'}
            </div>
          </div>

          <div className="grid gap-3 border-b border-white/[0.07] p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
            <label className="block min-w-0 text-xs font-medium text-zinc-400">
              Sintoma principal
              <input
                value={primarySymptom}
                onChange={event => setPrimarySymptom(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    analyze();
                  }
                }}
                list="darwin-primary-symptoms"
                placeholder="Ex.: tosse, febre, cefaleia"
                className="mt-1.5 h-10 w-full rounded-md border border-white/15 bg-black/20 px-3 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan-300/50"
              />
              <datalist id="darwin-primary-symptoms">
                {symptomNames.map(name => <option key={name} value={name} />)}
              </datalist>
            </label>

            <label className="block min-w-0 text-xs font-medium text-zinc-400">
              Sintoma associado
              <div className="mt-1.5 flex gap-2">
                <input
                  value={newSymptom}
                  onChange={event => setNewSymptom(event.target.value)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      addSecondarySymptom();
                    }
                  }}
                  list="darwin-secondary-symptoms"
                  placeholder="Adicionar outro sintoma"
                  className="h-10 min-w-0 flex-1 rounded-md border border-white/15 bg-black/20 px-3 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan-300/50"
                />
                <datalist id="darwin-secondary-symptoms">
                  {symptomNames.map(name => <option key={name} value={name} />)}
                </datalist>
                <button
                  type="button"
                  onClick={addSecondarySymptom}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/15 text-zinc-300 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
                  aria-label="Adicionar sintoma associado"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </label>

            <button
              type="button"
              onClick={analyze}
              disabled={!primarySymptom.trim()}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-cyan-300 px-4 text-sm font-semibold text-[#041218] transition-colors hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Analisar
            </button>
          </div>

          {secondarySymptoms.length > 0 && (
            <div className="flex flex-wrap gap-2 border-b border-white/[0.07] px-4 py-3">
              {secondarySymptoms.map(symptom => (
                <span key={symptom} className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-zinc-300">
                  {symptom}
                  <button
                    type="button"
                    onClick={() => setSecondarySymptoms(items => items.filter(item => item !== symptom))}
                    className="text-zinc-500 hover:text-white"
                    aria-label={`Remover ${symptom}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {youngInfantFeverRelevant && (
            <YoungInfantFeverSafetyInterview
              answers={youngInfantFeverAnswers}
              assessment={youngInfantFeverAssessment}
              onChange={updateYoungInfantFeverAnswers}
            />
          )}

          {respiratoryRelevant && (
            <PediatricRespiratorySafetyInterview
              answers={pediatricRespiratoryAnswers}
              assessment={pediatricRespiratoryAssessment}
              onChange={updates => setPediatricRespiratoryAnswers(previous => ({ ...previous, ...updates }))}
              sharedYoungInfantSigns={youngInfantFeverRelevant}
            />
          )}

          {pertussisRelevant && (
            <PertussisSafetyInterview
              answers={pertussisAnswers}
              assessment={pertussisAssessment}
              onChange={updates => setPertussisAnswers(previous => ({ ...previous, ...updates }))}
              sharedRespiratorySigns={respiratoryRelevant}
            />
          )}

          {result && (kernelChecking || kernelResult) && (
            <div
              className="flex min-h-9 items-center gap-2 border-b border-white/[0.07] bg-black/10 px-4 py-2 text-[11px] text-zinc-500"
              title={kernelResult?.refusalReasons.join(' · ')}
              aria-live="polite"
            >
              {kernelChecking ? (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border border-cyan-300/25 border-t-cyan-300" aria-hidden="true" />
              ) : kernelResult?.integrityVerified && kernelResult.policy.disposition !== 'REFUSE' ? (
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
              ) : (
                <ShieldX
                  className={`h-3.5 w-3.5 ${kernelResult?.integrityVerified ? 'text-amber-300' : 'text-zinc-600'}`}
                  aria-hidden="true"
                />
              )}
              <span>
                {kernelChecking
                  ? 'Sounio · verificando recibo e integridade'
                  : kernelResult?.integrityVerified
                    ? kernelResult.policy.disposition === 'REFUSE'
                      ? 'Sounio · integridade verificada · autorização clínica bloqueada'
                      : kernelResult.signatureVerified
                        ? 'Sounio · modo silencioso · recibo assinado e verificado'
                        : 'Sounio · modo silencioso · integridade verificada · recibo não assinado'
                    : 'Sounio · execução recusada para este contexto'}
              </span>
              {kernelResult?.integrityVerified && (
                <span className="ml-auto hidden font-mono text-[10px] text-zinc-600 sm:inline">
                  {kernelResult.modelVersion}
                </span>
              )}
            </div>
          )}

          {result && (
            <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)]">
              <div className="divide-y divide-white/[0.07] lg:border-r lg:border-white/[0.07]">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
                    <Stethoscope className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                    Diagnósticos diferenciais
                  </div>
                  <span className="text-xs text-zinc-500">{result.diagnosticosDiferenciais.length} hipóteses</span>
                </div>

                {result.diagnosticosDiferenciais.map((differential, index) => {
                  const isSelected = selectedDiagnosisId === differential.doenca.id;
                  const probabilityStyle = probabilityStyles[differential.probabilidade] || probabilityStyles.baixa;
                  return (
                    <article key={differential.doenca.id || index} className={`px-4 py-3 transition-colors ${isSelected ? 'bg-emerald-300/[0.05]' : 'hover:bg-white/[0.025]'}`}>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs tabular-nums text-zinc-600">{String(index + 1).padStart(2, '0')}</span>
                            <h3 className="text-sm font-semibold text-zinc-100">{differential.doenca.titulo || differential.doenca.id}</h3>
                            <span
                              title="Classificação heurística de aderência; não é probabilidade calibrada"
                              className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase ${probabilityStyle}`}
                            >
                              aderência {differential.probabilidade}
                            </span>
                            <span className="text-xs tabular-nums text-zinc-500">aderência {Math.round(differential.score)}%</span>
                            {differential.adequacaoEtaria === 'preferencial' && (
                              <span className="rounded border border-emerald-300/20 bg-emerald-300/[0.07] px-1.5 py-0.5 text-[10px] font-semibold uppercase text-emerald-200">faixa etária</span>
                            )}
                            {differential.adequacaoEtaria === 'menos_provavel' && (
                              <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-zinc-500">menos típica na idade</span>
                            )}
                          </div>
                          <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                            {differential.criteriosAtendidos}/{differential.criteriosTotais} critérios compatíveis
                            {differential.doenca.quickView?.definicao ? ` · ${differential.doenca.quickView.definicao}` : ''}
                          </p>
                          {differential.examesRecomendados.length > 0 && (
                            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
                              <TestTube className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                              {differential.examesRecomendados.slice(0, 4).join(' · ')}
                            </div>
                          )}
                          {differential.redFlags.length > 0 && (
                            <div className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-red-300">
                              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                              {differential.redFlags.join(' · ')}
                            </div>
                          )}
                        </div>
                        {onDiagnosisSelect && (
                          <button
                            type="button"
                            onClick={() => differential.doenca.id && onDiagnosisSelect(differential.doenca.id)}
                            className={`inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-colors ${isSelected ? 'border border-emerald-300/25 bg-emerald-300/10 text-emerald-200' : 'border border-white/15 text-zinc-300 hover:border-cyan-300/40 hover:text-cyan-200'}`}
                          >
                            {isSelected && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                            {isSelected ? 'Selecionada' : 'Usar hipótese'}
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              <aside className="space-y-4 p-4">
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-semibold uppercase text-zinc-300">
                    <TestTube className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                    Próximos exames
                  </h3>
                  <div className="mt-2 space-y-2">
                    {result.recomendacoes.exames.slice(0, 5).map(exam => (
                      <div key={`${exam.nome}-${exam.prioridade}`} className="border-l border-cyan-300/25 pl-2.5">
                        <p className="text-xs font-medium text-zinc-200">{exam.nome}</p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500">{exam.justificativa}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {result.recomendacoes.encaminhamento.length > 0 && (
                  <div className="border-t border-white/[0.07] pt-4">
                    <h3 className="text-xs font-semibold uppercase text-zinc-300">Encaminhamento</h3>
                    <div className="mt-2 space-y-2">
                      {result.recomendacoes.encaminhamento.map(referral => (
                        <div key={`${referral.especialidade}-${referral.motivo}`} className="text-xs leading-relaxed text-zinc-400">
                          <span className={referral.urgencia === 'urgente' ? 'font-semibold text-red-300' : 'font-medium text-zinc-200'}>{referral.especialidade}</span>
                          {' · '}{referral.motivo}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          )}

          {!result && (
            <div className="px-4 py-5 text-center text-xs text-zinc-500">
              Informe o sintoma principal para ordenar hipóteses, diferenciais e sinais de alarme.
            </div>
          )}
        </div>
      )}
    </section>
  );
}
