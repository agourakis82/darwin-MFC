'use client';

import { AlertTriangle, ExternalLink, ShieldAlert, Thermometer } from 'lucide-react';
import {
  YOUNG_INFANT_FEVER_SAFETY_REFERENCES,
  type YoungInfantFeverSafetyAssessment,
  type YoungInfantFeverSafetyInput,
} from '@/lib/clinical-safety/young-infant-fever';
import type { ClinicalAnswer } from '@/lib/clinical-safety/pertussis';

export type YoungInfantFeverSafetyAnswers = Omit<
  YoungInfantFeverSafetyInput,
  'ageDays' | 'feverConcernPresent'
>;

interface YoungInfantFeverSafetyInterviewProps {
  answers: YoungInfantFeverSafetyAnswers;
  assessment: YoungInfantFeverSafetyAssessment;
  onChange: (updates: Partial<YoungInfantFeverSafetyAnswers>) => void;
  sharedDiarrheaSigns?: boolean;
}

const answerOptions: Array<{ value: ClinicalAnswer; label: string; title: string }> = [
  { value: 'yes', label: 'Sim', title: 'Presente' },
  { value: 'no', label: 'Não', title: 'Ausente' },
  { value: 'unknown', label: '?', title: 'Não investigado ou desconhecido' },
];

const dangerLabels: Record<string, string> = {
  'axillary-temperature-below-36': 'temperatura axilar abaixo de 36 °C',
  'axillary-temperature-at-or-above-37-5': 'temperatura axilar de 37,5 °C ou mais',
  'measured-temperature-at-or-above-38': 'temperatura aferida de 38 °C ou mais',
  'documented-home-fever-at-or-above-38': 'febre aferida em casa de 38 °C ou mais',
  'ill-appearance': 'aparência de doença grave',
  'reduced-movement': 'movimentação reduzida',
  'unable-to-feed': 'não consegue mamar ou beber',
  'vomiting-everything': 'vomita tudo',
  convulsions: 'convulsão',
  apnea: 'apneia',
  'central-cyanosis': 'cianose central',
  'severe-respiratory-distress': 'desconforto respiratório grave',
  'poor-perfusion': 'perfusão ruim',
  'bulging-fontanelle': 'fontanela abaulada',
  'non-blanching-rash': 'petéquias ou púrpura não branqueável',
  'umbilical-infection-extending-to-skin': 'infecção umbilical estendendo-se à pele',
  'extensive-skin-pustules': 'pústulas extensas ou numerosas',
};

const ageBandLabels: Record<string, string> = {
  '0-to-7-days': '0–7 dias',
  '8-to-21-days': '8–21 dias',
  '22-to-28-days': '22–28 dias',
  '29-to-59-days': '29–59 dias',
  '60-to-89-days': '60–89 dias',
  unknown: 'idade não informada',
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

export default function YoungInfantFeverSafetyInterview({
  answers,
  assessment,
  onChange,
  sharedDiarrheaSigns = false,
}: YoungInfantFeverSafetyInterviewProps) {
  const sharedDangerSignIds = new Set([
    'ill-appearance',
    'reduced-movement',
    'unable-to-feed',
    'vomiting-everything',
    'poor-perfusion',
  ]);
  const displayedDangerSignIds = sharedDiarrheaSigns
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
      ? { label: 'Completar agora', className: 'border-amber-300/30 bg-amber-300/10 text-amber-200' }
      : { label: 'Sem sinal registrado', className: 'border-white/15 bg-white/[0.04] text-zinc-400' };

  return (
    <section className="border-b border-white/[0.07] bg-[#0a171b]" aria-labelledby="young-infant-fever-safety-title">
      <div className="flex flex-col gap-2 border-b border-white/[0.07] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-2.5">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
          <div className="min-w-0">
            <h3 id="young-infant-fever-safety-title" className="text-xs font-semibold text-zinc-100">
              Febre no lactente jovem · {ageBandLabels[assessment.ageBand] ?? 'fora da faixa'}
            </h3>
            <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500">
              Temperatura e sinais de possível infecção grave permanecem independentes do diagnóstico diferencial.
            </p>
          </div>
        </div>
        <span className={`w-fit shrink-0 rounded border px-2 py-1 text-[10px] font-semibold uppercase ${status.className}`}>
          {status.label}
        </span>
      </div>

      <div className="grid gap-3 border-b border-white/[0.07] px-4 py-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="min-w-0 text-[11px] font-medium text-zinc-400">
          Temperatura atual
          <div className="relative mt-1.5">
            <input
              type="number"
              min="30"
              max="45"
              step="0.1"
              inputMode="decimal"
              value={answers.temperatureC ?? ''}
              onChange={event => onChange({
                temperatureC: event.target.value === '' ? undefined : Number(event.target.value),
              })}
              placeholder="Não aferida"
              className="h-8 w-full rounded border border-white/15 bg-black/20 px-2.5 pr-8 text-xs text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan-300/50"
            />
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600">°C</span>
          </div>
        </label>

        <label className="min-w-0 text-[11px] font-medium text-zinc-400">
          Local de aferição
          <select
            value={answers.temperatureMeasurementSite}
            onChange={event => onChange({
              temperatureMeasurementSite: event.target.value as YoungInfantFeverSafetyAnswers['temperatureMeasurementSite'],
            })}
            className="mt-1.5 h-8 w-full rounded border border-white/15 bg-[#071319] px-2 text-xs text-zinc-100 outline-none transition-colors focus:border-cyan-300/50"
          >
            <option value="unknown">Não informado</option>
            <option value="axillary">Axilar</option>
            <option value="rectal">Retal</option>
            <option value="other">Outro local</option>
          </select>
        </label>

        <TriStateField
          label="Febre ≥38 °C aferida em casa nas últimas 24 h"
          value={answers.documentedHomeFeverAtOrAbove38}
          onChange={value => onChange({ documentedHomeFeverAtOrAbove38: value })}
        />
        <TriStateField
          label="Prematuro ou condição clínica complexa"
          value={answers.pretermOrMedicallyComplex}
          onChange={value => onChange({ pretermOrMedicallyComplex: value })}
        />
      </div>

      <div className="grid gap-3 px-4 py-3 sm:grid-cols-2 lg:grid-cols-4">
        {!sharedDiarrheaSigns && (
          <TriStateField label="Parece muito doente / não vai bem" value={answers.illAppearance} onChange={value => onChange({ illAppearance: value })} />
        )}
        {!sharedDiarrheaSigns && (
          <TriStateField label="Movimenta-se menos que o normal" value={answers.reducedMovement} onChange={value => onChange({ reducedMovement: value })} />
        )}
        {!sharedDiarrheaSigns && (
          <TriStateField label="Não consegue mamar ou beber" value={answers.unableToFeed} onChange={value => onChange({ unableToFeed: value })} />
        )}
        {!sharedDiarrheaSigns && (
          <TriStateField label="Vomita tudo" value={answers.vomitingEverything} onChange={value => onChange({ vomitingEverything: value })} />
        )}
        <TriStateField label="Convulsão" value={answers.convulsions} onChange={value => onChange({ convulsions: value })} />
        <TriStateField label="Apneia" value={answers.apnea} onChange={value => onChange({ apnea: value })} />
        <TriStateField label="Cianose central" value={answers.centralCyanosis} onChange={value => onChange({ centralCyanosis: value })} />
        <TriStateField label="Esforço respiratório grave" value={answers.severeRespiratoryDistress} onChange={value => onChange({ severeRespiratoryDistress: value })} />
        {!sharedDiarrheaSigns && (
          <TriStateField label="Perfusão ruim / enchimento >2 s" value={answers.poorPerfusion} onChange={value => onChange({ poorPerfusion: value })} />
        )}
        <TriStateField label="Fontanela abaulada" value={answers.bulgingFontanelle} onChange={value => onChange({ bulgingFontanelle: value })} />
        <TriStateField label="Petéquias / púrpura não branqueável" value={answers.nonBlanchingRash} onChange={value => onChange({ nonBlanchingRash: value })} />
        <TriStateField label="Umbigo: eritema estende à pele" value={answers.umbilicalInfectionExtendingToSkin} onChange={value => onChange({ umbilicalInfectionExtendingToSkin: value })} />
        <TriStateField label="Pústulas extensas ou numerosas" value={answers.extensiveSkinPustules} onChange={value => onChange({ extensiveSkinPustules: value })} />
      </div>

      {(displayedDangerSignIds.length > 0 || assessment.prioritySignIds.length > 0 || assessment.aapAgeScope) && (
        <div className="space-y-1.5 border-t border-white/[0.07] px-4 py-3" aria-live="polite">
          {displayedDangerSignIds.length > 0 && (
            <p className="flex items-start gap-2 text-xs font-semibold leading-relaxed text-red-200">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Encaminhamento urgente: {displayedDangerSignIds.map(id => dangerLabels[id]).join(' · ')}.
            </p>
          )}
          {assessment.prioritySignIds.includes('temperature-measurement-required') && (
            <p className="flex items-start gap-2 text-xs leading-relaxed text-amber-200">
              <Thermometer className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Aferir temperatura agora; relato inespecífico de febre não é convertido em observação ausente ou presente.
            </p>
          )}
          {assessment.prioritySignIds.includes('measurement-site-required') && (
            <p className="text-xs leading-relaxed text-amber-200">
              Informe o local de aferição. O limiar AIDPI de 37,5 °C nesta faixa é específico para temperatura axilar.
            </p>
          )}
          {assessment.prioritySignIds.includes('incomplete-danger-screen') && (
            <p className="text-xs leading-relaxed text-amber-200">
              Complete os sinais de possível infecção grave; respostas desconhecidas permanecem desconhecidas e não significam ausência.
            </p>
          )}
          {assessment.prioritySignIds.includes('higher-risk-clinical-context') && (
            <p className="text-xs leading-relaxed text-amber-200">
              Prematuridade ou condição complexa exige avaliação individual e impede uso direto da via AAP para lactente a termo.
            </p>
          )}
          {assessment.aapAgeScope && (
            <p className="text-[11px] leading-relaxed text-zinc-400">
              Faixa etária AAP 8–60 dias: a diretriz se restringe a lactentes a termo, com bom aspecto e febre ≥38 °C; exames e tratamento não são inferidos por este painel.
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/[0.07] px-4 py-2 text-[10px] text-zinc-500">
        <span>Triagem de segurança; não calcula risco de sepse nem autoriza antibiótico.</span>
        {YOUNG_INFANT_FEVER_SAFETY_REFERENCES.map(reference => (
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
