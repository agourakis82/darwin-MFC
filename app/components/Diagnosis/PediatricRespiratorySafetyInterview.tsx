'use client';

import { AlertTriangle, ExternalLink, Gauge, ShieldAlert } from 'lucide-react';
import {
  PEDIATRIC_RESPIRATORY_SAFETY_REFERENCES,
  type PediatricRespiratorySafetyAssessment,
  type PediatricRespiratorySafetyInput,
} from '@/lib/clinical-safety/pediatric-respiratory';
import type { ClinicalAnswer } from '@/lib/clinical-safety/pertussis';

export type PediatricRespiratorySafetyAnswers = Omit<
  PediatricRespiratorySafetyInput,
  'ageDays' | 'respiratorySymptomsPresent'
>;

interface PediatricRespiratorySafetyInterviewProps {
  answers: PediatricRespiratorySafetyAnswers;
  assessment: PediatricRespiratorySafetyAssessment;
  onChange: (updates: Partial<PediatricRespiratorySafetyAnswers>) => void;
  sharedYoungInfantSigns?: boolean;
  sharedDiarrheaSigns?: boolean;
}

const answerOptions: Array<{ value: ClinicalAnswer; label: string; title: string }> = [
  { value: 'yes', label: 'Sim', title: 'Presente' },
  { value: 'no', label: 'Não', title: 'Ausente' },
  { value: 'unknown', label: '?', title: 'Não investigado ou desconhecido' },
];

const dangerLabels: Record<string, string> = {
  apnea: 'apneia',
  'central-cyanosis': 'cianose central',
  convulsions: 'convulsão',
  'lethargy-or-unconsciousness': 'letargia ou inconsciência',
  'unable-to-drink-or-breastfeed': 'não consegue beber ou mamar',
  'vomiting-everything': 'vomita tudo',
  'severe-work-of-breathing': 'esforço respiratório grave',
  'chest-indrawing': 'tiragem subcostal',
  'stridor-at-rest': 'estridor em repouso',
  'room-air-spo2-below-92': 'SpO₂ abaixo de 92% em ar ambiente',
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

export default function PediatricRespiratorySafetyInterview({
  answers,
  assessment,
  onChange,
  sharedYoungInfantSigns = false,
  sharedDiarrheaSigns = false,
}: PediatricRespiratorySafetyInterviewProps) {
  const sharedDangerSignIds = new Set<string>();
  if (sharedYoungInfantSigns) {
    [
      'apnea',
      'central-cyanosis',
      'convulsions',
      'lethargy-or-unconsciousness',
      'unable-to-drink-or-breastfeed',
      'vomiting-everything',
      'severe-work-of-breathing',
    ].forEach(id => sharedDangerSignIds.add(id));
  }
  if (sharedDiarrheaSigns) {
    [
      'lethargy-or-unconsciousness',
      'unable-to-drink-or-breastfeed',
      'vomiting-everything',
    ].forEach(id => sharedDangerSignIds.add(id));
  }
  const displayedDangerSignIds = sharedDangerSignIds.size > 0
    ? assessment.dangerSignIds.filter(id => !sharedDangerSignIds.has(id))
    : assessment.dangerSignIds;
  const displayPriority = displayedDangerSignIds.length > 0
    ? 'immediate-referral'
    : assessment.prioritySignIds.length > 0
      ? 'same-day-assessment'
      : 'routine';
  const status = displayPriority === 'immediate-referral'
    ? { label: 'Encaminhamento urgente', className: 'border-red-300/30 bg-red-300/10 text-red-200' }
    : displayPriority === 'same-day-assessment'
      ? { label: 'Avaliar hoje', className: 'border-amber-300/30 bg-amber-300/10 text-amber-200' }
      : { label: 'Em investigação', className: 'border-white/15 bg-white/[0.04] text-zinc-400' };

  const rateSummary = assessment.fastBreathingThreshold === null
    ? assessment.ageBand === '5-to-17-years'
      ? 'Sem derivação AIDPI após 5 anos'
      : 'Informe a idade para derivar o limiar'
    : `Taquipneia: ≥ ${assessment.fastBreathingThreshold}/min em repouso`;
  const chestIndrawingLabel = assessment.ageBand === 'under-2-months'
    ? 'Tiragem subcostal grave'
    : 'Tiragem subcostal';

  return (
    <section className="border-b border-white/[0.07] bg-[#07181d]" aria-labelledby="pediatric-respiratory-safety-title">
      <div className="flex flex-col gap-2 border-b border-white/[0.07] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-2.5">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
          <div className="min-w-0">
            <h3 id="pediatric-respiratory-safety-title" className="text-xs font-semibold text-zinc-100">
              Gravidade respiratória pediátrica
            </h3>
            <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500">
              Pneumonia e bronquiolite: sinais de perigo independem da hipótese ou da probabilidade.
            </p>
          </div>
        </div>
        <span className={`w-fit shrink-0 rounded border px-2 py-1 text-[10px] font-semibold uppercase ${status.className}`}>
          {status.label}
        </span>
      </div>

      <div className="grid gap-3 border-b border-white/[0.07] px-4 py-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="min-w-0 text-[11px] font-medium text-zinc-400">
          Frequência respiratória
          <div className="relative mt-1.5">
            <input
              type="number"
              min="1"
              max="200"
              step="1"
              inputMode="numeric"
              value={answers.respiratoryRatePerMinute ?? ''}
              onChange={event => onChange({
                respiratoryRatePerMinute: event.target.value === '' ? undefined : Number(event.target.value),
              })}
              placeholder="Não aferida"
              className="h-8 w-full rounded border border-white/15 bg-black/20 px-2.5 pr-11 text-xs text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan-300/50"
            />
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600">/min</span>
          </div>
        </label>

        <label className="min-w-0 text-[11px] font-medium text-zinc-400">
          Estado durante a contagem
          <select
            value={answers.respiratoryRateMeasurementState}
            onChange={event => onChange({
              respiratoryRateMeasurementState: event.target.value as PediatricRespiratorySafetyAnswers['respiratoryRateMeasurementState'],
            })}
            className="mt-1.5 h-8 w-full rounded border border-white/15 bg-[#071319] px-2 text-xs text-zinc-100 outline-none transition-colors focus:border-cyan-300/50"
          >
            <option value="unknown">Não informado</option>
            <option value="calm">Calma / em repouso</option>
            <option value="not-calm">Chorando / agitada</option>
          </select>
        </label>

        {assessment.repeatCountRequired ? (
          <label className="min-w-0 text-[11px] font-medium text-amber-200">
            Repetir contagem por 1 minuto
            <div className="relative mt-1.5">
              <input
                type="number"
                min="1"
                max="200"
                step="1"
                inputMode="numeric"
                value={answers.repeatRespiratoryRatePerMinute ?? ''}
                onChange={event => onChange({
                  repeatRespiratoryRatePerMinute: event.target.value === '' ? undefined : Number(event.target.value),
                })}
                placeholder="2ª contagem"
                className="h-8 w-full rounded border border-amber-300/30 bg-amber-300/[0.05] px-2.5 pr-11 text-xs text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-amber-300/60"
              />
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600">/min</span>
            </div>
          </label>
        ) : (
          <div className="flex min-w-0 items-end">
            <div className="flex h-8 w-full items-center gap-2 rounded border border-white/10 bg-white/[0.025] px-2.5 text-[10px] leading-tight text-zinc-500">
              <Gauge className="h-3.5 w-3.5 shrink-0 text-cyan-300" aria-hidden="true" />
              {rateSummary}
            </div>
          </div>
        )}

        <div className="grid min-w-0 grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-2">
          <label className="min-w-0 text-[11px] font-medium text-zinc-400">
            SpO₂
            <div className="relative mt-1.5">
              <input
                type="number"
                min="50"
                max="100"
                step="1"
                inputMode="numeric"
                value={answers.spo2Percent ?? ''}
                onChange={event => onChange({
                  spo2Percent: event.target.value === '' ? undefined : Number(event.target.value),
                })}
                placeholder="--"
                className="h-8 w-full rounded border border-white/15 bg-black/20 px-2 pr-6 text-xs text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan-300/50"
              />
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600">%</span>
            </div>
          </label>
          <label className="min-w-0 text-[11px] font-medium text-zinc-400">
            Contexto
            <select
              value={answers.oxygenMeasurementContext}
              onChange={event => onChange({
                oxygenMeasurementContext: event.target.value as PediatricRespiratorySafetyAnswers['oxygenMeasurementContext'],
              })}
              className="mt-1.5 h-8 w-full rounded border border-white/15 bg-[#071319] px-1.5 text-[11px] text-zinc-100 outline-none transition-colors focus:border-cyan-300/50"
            >
              <option value="unknown">Não informado</option>
              <option value="room-air">Ar ambiente</option>
              <option value="supplemental-oxygen">Com O₂</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-3 px-4 py-3 sm:grid-cols-2 lg:grid-cols-5">
        {!sharedYoungInfantSigns && (
          <TriStateField label="Apneia" value={answers.apnea} onChange={value => onChange({ apnea: value })} />
        )}
        {!sharedYoungInfantSigns && (
          <TriStateField label="Cianose central" value={answers.centralCyanosis} onChange={value => onChange({ centralCyanosis: value })} />
        )}
        <TriStateField label={chestIndrawingLabel} value={answers.chestIndrawing} onChange={value => onChange({ chestIndrawing: value })} />
        {!sharedYoungInfantSigns && (
          <TriStateField label="Gemência / esforço intenso" value={answers.severeWorkOfBreathing} onChange={value => onChange({ severeWorkOfBreathing: value })} />
        )}
        <TriStateField label="Estridor em repouso" value={answers.stridorAtRest} onChange={value => onChange({ stridorAtRest: value })} />
        {!sharedYoungInfantSigns && !sharedDiarrheaSigns && (
          <TriStateField label="Não bebe ou não mama" value={answers.unableToDrinkOrBreastfeed} onChange={value => onChange({ unableToDrinkOrBreastfeed: value })} />
        )}
        {!sharedYoungInfantSigns && !sharedDiarrheaSigns && (
          <TriStateField label="Vomita tudo" value={answers.vomitingEverything} onChange={value => onChange({ vomitingEverything: value })} />
        )}
        <TriStateField label="Ingestão reduzida / desidratação" value={answers.reducedOralIntakeOrDehydration} onChange={value => onChange({ reducedOralIntakeOrDehydration: value })} />
        {!sharedYoungInfantSigns && !sharedDiarrheaSigns && (
          <TriStateField label="Letargia / inconsciência" value={answers.lethargyOrUnconsciousness} onChange={value => onChange({ lethargyOrUnconsciousness: value })} />
        )}
        {!sharedYoungInfantSigns && (
          <TriStateField label="Convulsão" value={answers.convulsions} onChange={value => onChange({ convulsions: value })} />
        )}
      </div>

      {(displayedDangerSignIds.length > 0 || assessment.prioritySignIds.length > 0) && (
        <div className="space-y-1.5 border-t border-white/[0.07] px-4 py-3" aria-live="polite">
          {displayedDangerSignIds.length > 0 && (
            <p className="flex items-start gap-2 text-xs font-semibold leading-relaxed text-red-200">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Encaminhamento urgente: {displayedDangerSignIds.map(id => (
                id === 'chest-indrawing' && assessment.ageBand === 'under-2-months'
                  ? 'tiragem subcostal grave'
                  : dangerLabels[id]
              )).join(' · ')}.
            </p>
          )}
          {assessment.prioritySignIds.includes('young-infant-repeat-count-required') && (
            <p className="text-xs leading-relaxed text-amber-200">
              Lactente menor de 2 meses: repita por um minuto a contagem elevada antes de classificá-la.
            </p>
          )}
          {assessment.prioritySignIds.includes('tachypnea-for-age') && (
            <p className="text-xs leading-relaxed text-amber-200">
              Respiração rápida para a idade: avaliação clínica no mesmo dia para pneumonia e outros diagnósticos.
            </p>
          )}
          {assessment.prioritySignIds.includes('reduced-intake-or-dehydration') && (
            <p className="text-xs leading-relaxed text-amber-200">
              Ingestão reduzida ou desidratação: definir necessidade de encaminhamento conforme intensidade e fatores de risco.
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/[0.07] px-4 py-2 text-[10px] text-zinc-500">
        <span>Segurança clínica; não autoriza antibiótico, oxigênio ou prescrição.</span>
        {PEDIATRIC_RESPIRATORY_SAFETY_REFERENCES.map(reference => (
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
