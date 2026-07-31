'use client';

import { AlertTriangle, ChevronDown, Droplets, ExternalLink, ShieldAlert } from 'lucide-react';
import {
  PEDIATRIC_DIARRHEA_SAFETY_REFERENCES,
  type PediatricDiarrheaSafetyAssessment,
  type PediatricDiarrheaSafetyInput,
} from '@/lib/clinical-safety/pediatric-diarrhea';
import type { ClinicalAnswer } from '@/lib/clinical-safety/pertussis';

export type PediatricDiarrheaSafetyAnswers = Omit<
  PediatricDiarrheaSafetyInput,
  'ageDays' | 'diarrheaPresent'
>;

interface PediatricDiarrheaSafetyInterviewProps {
  answers: PediatricDiarrheaSafetyAnswers;
  assessment: PediatricDiarrheaSafetyAssessment;
  onChange: (updates: Partial<PediatricDiarrheaSafetyAnswers>) => void;
}

const answerOptions: Array<{ value: ClinicalAnswer; label: string; title: string }> = [
  { value: 'yes', label: 'Sim', title: 'Presente' },
  { value: 'no', label: 'Não', title: 'Ausente' },
  { value: 'unknown', label: '?', title: 'Não investigado ou desconhecido' },
];

const classificationLabels: Record<string, string> = {
  'young-infant-dehydration': 'Desidratação · menor de 2 meses',
  'severe-dehydration': 'Desidratação grave',
  'some-dehydration': 'Alguma desidratação',
  'no-dehydration': 'Sem desidratação pelos sinais informados',
  incomplete: 'Classificação incompleta',
  'not-applicable': 'Fora da matriz AIDPI',
};

const dangerLabels: Record<string, string> = {
  'young-infant-dehydration': 'desidratação em lactente menor de 2 meses',
  'severe-dehydration': 'desidratação grave',
  'lethargic-or-unconscious': 'letargia ou inconsciência',
  'unable-to-drink-or-breastfeed': 'não consegue beber ou mamar',
  'vomiting-everything': 'vomita tudo',
  'pale-or-mottled-skin': 'pele pálida ou moteada',
  'cold-extremities': 'extremidades frias',
  'weak-peripheral-pulse': 'pulso periférico fraco',
  'capillary-refill-over-2-seconds': 'enchimento capilar acima de 2 segundos',
  hypotension: 'hipotensão',
  'young-infant-diarrhea-7-days-or-more': 'diarreia por 7 dias ou mais em menor de 2 meses',
  'young-infant-blood-in-stool': 'sangue nas fezes em menor de 2 meses',
  'persistent-diarrhea-with-dehydration': 'diarreia persistente com desidratação',
  'bilious-vomiting': 'vômito bilioso',
};

function TriStateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: ClinicalAnswer;
  onChange: (value: ClinicalAnswer) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-1.5 text-[11px] font-medium leading-tight text-zinc-400">{label}</legend>
      <div className="grid h-8 grid-cols-3 overflow-hidden rounded border border-white/15 bg-black/20">
        {answerOptions.map(option => (
          <button
            key={option.value}
            type="button"
            title={option.title}
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={`min-w-0 border-r border-white/10 px-2 text-[11px] font-medium transition-colors last:border-r-0 ${
              value === option.value
                ? option.value === 'yes'
                  ? 'bg-cyan-300 text-[#041218]'
                  : option.value === 'no'
                    ? 'bg-white/10 text-white'
                    : 'bg-amber-300/15 text-amber-200'
                : 'text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function PediatricDiarrheaSafetyInterview({
  answers,
  assessment,
  onChange,
}: PediatricDiarrheaSafetyInterviewProps) {
  const status = assessment.priority === 'immediate-referral'
    ? { label: 'Encaminhar agora', className: 'border-red-300/30 bg-red-300/10 text-red-200' }
    : assessment.priority === 'same-day-assessment'
      ? { label: 'Avaliar hoje', className: 'border-amber-300/30 bg-amber-300/10 text-amber-200' }
      : { label: 'Sem alarme registrado', className: 'border-white/15 bg-white/[0.04] text-zinc-400' };

  return (
    <section className="border-b border-white/[0.07] bg-[#07191a]" aria-labelledby="pediatric-diarrhea-safety-title">
      <div className="flex flex-col gap-2 border-b border-white/[0.07] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-2.5">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
          <div className="min-w-0">
            <h3 id="pediatric-diarrhea-safety-title" className="text-xs font-semibold text-zinc-100">
              Diarreia e hidratação pediátrica
            </h3>
            <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500">
              {classificationLabels[assessment.classification]} · classificação observacional independente das hipóteses.
            </p>
          </div>
        </div>
        <span className={`w-fit shrink-0 rounded border px-2 py-1 text-[10px] font-semibold uppercase ${status.className}`}>
          {status.label}
        </span>
      </div>

      <div className="grid gap-3 border-b border-white/[0.07] px-4 py-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="min-w-0 text-[11px] font-medium text-zinc-400">
          Duração da diarreia
          <div className="relative mt-1.5">
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              inputMode="numeric"
              value={answers.durationDays ?? ''}
              onChange={event => onChange({
                durationDays: event.target.value === '' ? undefined : Number(event.target.value),
              })}
              placeholder="Não informado"
              className="h-8 w-full rounded border border-white/15 bg-black/20 px-2.5 pr-10 text-xs text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan-300/50"
            />
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600">dias</span>
          </div>
        </label>

        <label className="min-w-0 text-[11px] font-medium text-zinc-400">
          Estado geral
          <select
            value={answers.generalCondition}
            onChange={event => onChange({
              generalCondition: event.target.value as PediatricDiarrheaSafetyAnswers['generalCondition'],
            })}
            className="mt-1.5 h-8 w-full rounded border border-white/15 bg-[#071319] px-2 text-xs text-zinc-100 outline-none transition-colors focus:border-cyan-300/50"
          >
            <option value="unknown">Não investigado</option>
            <option value="normal">Normal</option>
            <option value="restless-irritable">Inquieta ou irritada</option>
            <option value="lethargic-unconscious">Letárgica ou inconsciente</option>
          </select>
        </label>

        <label className="min-w-0 text-[11px] font-medium text-zinc-400">
          Como bebe ou mama
          <select
            value={answers.drinkingAbility}
            onChange={event => onChange({
              drinkingAbility: event.target.value as PediatricDiarrheaSafetyAnswers['drinkingAbility'],
            })}
            className="mt-1.5 h-8 w-full rounded border border-white/15 bg-[#071319] px-2 text-xs text-zinc-100 outline-none transition-colors focus:border-cyan-300/50"
          >
            <option value="unknown">Não investigado</option>
            <option value="normal">Normal</option>
            <option value="eager-thirsty">Ávida, com sede</option>
            <option value="poor-unable">Mal ou não consegue</option>
          </select>
        </label>

        <label className="min-w-0 text-[11px] font-medium text-zinc-400">
          Prega cutânea retorna
          <select
            value={answers.skinPinchReturn}
            onChange={event => onChange({
              skinPinchReturn: event.target.value as PediatricDiarrheaSafetyAnswers['skinPinchReturn'],
            })}
            className="mt-1.5 h-8 w-full rounded border border-white/15 bg-[#071319] px-2 text-xs text-zinc-100 outline-none transition-colors focus:border-cyan-300/50"
          >
            <option value="unknown">Não investigado</option>
            <option value="normal">Imediatamente</option>
            <option value="slow">Lentamente</option>
            <option value="very-slow">Muito lentamente</option>
          </select>
        </label>

        <TriStateField label="Olhos fundos" value={answers.sunkenEyes} onChange={value => onChange({ sunkenEyes: value })} />
        <TriStateField label="Sangue visível nas fezes" value={answers.bloodInStool} onChange={value => onChange({ bloodInStool: value })} />
        <TriStateField label="Vomita tudo" value={answers.vomitingEverything} onChange={value => onChange({ vomitingEverything: value })} />
        <TriStateField label="Urina reduzida" value={answers.decreasedUrineOutput} onChange={value => onChange({ decreasedUrineOutput: value })} />
      </div>

      <div className="grid gap-3 border-b border-white/[0.07] px-4 py-3 sm:grid-cols-2 lg:grid-cols-5">
        <TriStateField label="Enchimento capilar >2 s" value={answers.capillaryRefillOver2Seconds} onChange={value => onChange({ capillaryRefillOver2Seconds: value })} />
        <TriStateField label="Pele pálida ou moteada" value={answers.paleOrMottledSkin} onChange={value => onChange({ paleOrMottledSkin: value })} />
        <TriStateField label="Extremidades frias" value={answers.coldExtremities} onChange={value => onChange({ coldExtremities: value })} />
        <TriStateField label="Pulso periférico fraco" value={answers.weakPeripheralPulse} onChange={value => onChange({ weakPeripheralPulse: value })} />
        <TriStateField label="Hipotensão aferida" value={answers.hypotension} onChange={value => onChange({ hypotension: value })} />
        <TriStateField label="Vômito bilioso" value={answers.biliousVomiting} onChange={value => onChange({ biliousVomiting: value })} />
      </div>

      <details className="group border-b border-white/[0.07]">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-2.5 text-[11px] font-medium text-zinc-400 hover:text-zinc-200">
          <Droplets className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
          Risco de piora e diagnósticos alternativos
          <ChevronDown className="ml-auto h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="grid gap-3 border-t border-white/[0.07] px-4 py-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="min-w-0 text-[11px] font-medium text-zinc-400">
            Evacuações nas últimas 24 h
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              inputMode="numeric"
              value={answers.stoolsLast24Hours ?? ''}
              onChange={event => onChange({
                stoolsLast24Hours: event.target.value === '' ? undefined : Number(event.target.value),
              })}
              placeholder="Não informado"
              className="mt-1.5 h-8 w-full rounded border border-white/15 bg-black/20 px-2.5 text-xs text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-cyan-300/50"
            />
          </label>
          <label className="min-w-0 text-[11px] font-medium text-zinc-400">
            Vômitos nas últimas 24 h
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              inputMode="numeric"
              value={answers.vomitingEpisodesLast24Hours ?? ''}
              onChange={event => onChange({
                vomitingEpisodesLast24Hours: event.target.value === '' ? undefined : Number(event.target.value),
              })}
              placeholder="Não informado"
              className="mt-1.5 h-8 w-full rounded border border-white/15 bg-black/20 px-2.5 text-xs text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-cyan-300/50"
            />
          </label>
          <TriStateField label="Interrompeu aleitamento" value={answers.stoppedBreastfeeding} onChange={value => onChange({ stoppedBreastfeeding: value })} />
          <TriStateField label="Baixo peso ou desnutrição" value={answers.lowBirthWeightOrMalnutrition} onChange={value => onChange({ lowBirthWeightOrMalnutrition: value })} />
          <TriStateField label="Dor abdominal forte ou localizada" value={answers.severeLocalizedAbdominalPain} onChange={value => onChange({ severeLocalizedAbdominalPain: value })} />
          <TriStateField label="Distensão ou defesa abdominal" value={answers.abdominalDistensionOrRebound} onChange={value => onChange({ abdominalDistensionOrRebound: value })} />
        </div>
      </details>

      {(assessment.dangerSignIds.length > 0 || assessment.prioritySignIds.length > 0) && (
        <div className="space-y-1.5 border-b border-white/[0.07] px-4 py-3" aria-live="polite">
          {assessment.dangerSignIds.length > 0 && (
            <p className="flex items-start gap-2 text-xs font-semibold leading-relaxed text-red-200">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Encaminhamento urgente: {assessment.dangerSignIds.map(id => dangerLabels[id]).join(' · ')}.
            </p>
          )}
          {assessment.prioritySignIds.includes('incomplete-dehydration-screen') && (
            <p className="text-xs leading-relaxed text-amber-200">
              Complete estado geral, olhos, ingestão e prega cutânea; desconhecido não significa ausência.
            </p>
          )}
          {assessment.prioritySignIds.includes('some-dehydration') && (
            <p className="text-xs leading-relaxed text-amber-200">Alguma desidratação: avaliação e plano clínico no mesmo dia.</p>
          )}
          {assessment.prioritySignIds.includes('persistent-diarrhea') && (
            <p className="text-xs leading-relaxed text-amber-200">Diarreia persistente por 14 dias ou mais: avaliação no mesmo dia.</p>
          )}
          {assessment.prioritySignIds.includes('blood-in-stool-dysentery') && (
            <p className="text-xs leading-relaxed text-amber-200">Sangue nas fezes na faixa de 2 meses a menor de 5 anos: avaliar disenteria no mesmo dia.</p>
          )}
          {assessment.prioritySignIds.includes('decreased-urine-output') && (
            <p className="text-xs leading-relaxed text-amber-200">Diurese reduzida aumenta a preocupação com desidratação.</p>
          )}
          {assessment.prioritySignIds.includes('increased-dehydration-risk') && (
            <p className="text-xs leading-relaxed text-amber-200">Há fator de maior risco para desidratação ou piora.</p>
          )}
          {assessment.prioritySignIds.includes('alternative-diagnosis-sign') && (
            <p className="text-xs leading-relaxed text-amber-200">Dor intensa/localizada ou distensão/defesa exige avaliar diagnóstico alternativo.</p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 text-[10px] text-zinc-500">
        <span>Não calcula choque nem autoriza plano de hidratação, zinco, antibiótico ou prescrição.</span>
        {PEDIATRIC_DIARRHEA_SAFETY_REFERENCES.map(reference => (
          <a
            key={reference.id}
            href={reference.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-cyan-300"
          >
            {reference.label}
            <ExternalLink className="h-2.5 w-2.5" aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}
