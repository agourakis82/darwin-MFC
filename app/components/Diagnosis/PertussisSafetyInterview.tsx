'use client';

import { AlertTriangle, ExternalLink, ShieldAlert } from 'lucide-react';
import {
  PERTUSSIS_SAFETY_REFERENCES,
  type ClinicalAnswer,
  type PertussisSafetyAssessment,
  type PertussisSafetyInput,
} from '@/lib/clinical-safety/pertussis';

export type PertussisSafetyAnswers = Omit<PertussisSafetyInput, 'ageDays' | 'coughPresent'>;

interface PertussisSafetyInterviewProps {
  answers: PertussisSafetyAnswers;
  assessment: PertussisSafetyAssessment;
  onChange: (updates: Partial<PertussisSafetyAnswers>) => void;
  sharedRespiratorySigns?: boolean;
}

const answerOptions: Array<{ value: ClinicalAnswer; label: string; title: string }> = [
  { value: 'yes', label: 'Sim', title: 'Presente' },
  { value: 'no', label: 'Não', title: 'Ausente' },
  { value: 'unknown', label: '?', title: 'Não investigado ou desconhecido' },
];

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

export default function PertussisSafetyInterview({
  answers,
  assessment,
  onChange,
  sharedRespiratorySigns = false,
}: PertussisSafetyInterviewProps) {
  const status = assessment.priority === 'immediate-assessment'
    ? { label: 'Avaliação imediata', className: 'border-red-300/30 bg-red-300/10 text-red-200' }
    : assessment.highRiskIds.length > 0
      ? { label: 'Maior risco', className: 'border-amber-300/30 bg-amber-300/10 text-amber-200' }
      : assessment.surveillanceDefinitionMet
        ? { label: 'Suspeição atendida', className: 'border-cyan-300/30 bg-cyan-300/10 text-cyan-200' }
        : { label: 'Em investigação', className: 'border-white/15 bg-white/[0.04] text-zinc-400' };

  return (
    <section className="border-b border-white/[0.07] bg-[#08171d]" aria-labelledby="pertussis-safety-title">
      <div className="flex flex-col gap-2 border-b border-white/[0.07] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-2.5">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
          <div className="min-w-0">
            <h3 id="pertussis-safety-title" className="text-xs font-semibold text-zinc-100">Triagem de segurança · coqueluche</h3>
            <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500">
              Caracterização clínica e epidemiológica; sem estimativa probabilística ou prescrição automática.
            </p>
          </div>
        </div>
        <span className={`w-fit shrink-0 rounded border px-2 py-1 text-[10px] font-semibold uppercase ${status.className}`}>
          {status.label}
        </span>
      </div>

      <div className="grid gap-3 px-4 py-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="min-w-0 text-[11px] font-medium text-zinc-400">
          Duração da tosse
          <div className="relative mt-1.5">
            <input
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              value={answers.coughDurationDays ?? ''}
              onChange={event => onChange({
                coughDurationDays: event.target.value === '' ? undefined : Number(event.target.value),
              })}
              placeholder="Não informada"
              className="h-8 w-full rounded border border-white/15 bg-black/20 px-2.5 pr-10 text-xs text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan-300/50"
            />
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600">dias</span>
          </div>
        </label>

        <label className="min-w-0 text-[11px] font-medium text-zinc-400">
          Vacinação para coqueluche
          <select
            value={answers.vaccinationStatus}
            onChange={event => onChange({ vaccinationStatus: event.target.value as PertussisSafetyAnswers['vaccinationStatus'] })}
            className="mt-1.5 h-8 w-full rounded border border-white/15 bg-[#071319] px-2 text-xs text-zinc-100 outline-none transition-colors focus:border-cyan-300/50"
          >
            <option value="unknown">Não informada</option>
            <option value="up-to-date">Em dia para a idade</option>
            <option value="incomplete">Incompleta / atrasada</option>
          </select>
        </label>

        <TriStateField label="Tosse em acessos" value={answers.paroxysmalCough} onChange={value => onChange({ paroxysmalCough: value })} />
        <TriStateField label="Guincho inspiratório" value={answers.inspiratoryWhoop} onChange={value => onChange({ inspiratoryWhoop: value })} />
        <TriStateField label="Vômito pós-tosse" value={answers.postTussiveVomiting} onChange={value => onChange({ postTussiveVomiting: value })} />
        {!sharedRespiratorySigns && (
          <TriStateField label="Apneia" value={answers.apnea} onChange={value => onChange({ apnea: value })} />
        )}
        {!sharedRespiratorySigns && (
          <TriStateField label="Cianose" value={answers.cyanosis} onChange={value => onChange({ cyanosis: value })} />
        )}
        <TriStateField label="Engasgo" value={answers.choking} onChange={value => onChange({ choking: value })} />
        <div className="sm:col-span-2 lg:col-span-2">
          <TriStateField
            label="Contato próximo com caso confirmado laboratorialmente"
            value={answers.closeContact}
            onChange={value => onChange({ closeContact: value })}
          />
        </div>
      </div>

      {(assessment.dangerSignIds.length > 0 || assessment.highRiskIds.length > 0 || assessment.surveillanceDefinitionMet) && (
        <div className="space-y-1.5 border-t border-white/[0.07] px-4 py-3" aria-live="polite">
          {assessment.dangerSignIds.length > 0 && (
            <p className="flex items-start gap-2 text-xs font-semibold leading-relaxed text-red-200">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {assessment.dangerSignIds.includes('apnea') && assessment.dangerSignIds.includes('cyanosis')
                ? 'Apneia e cianose presentes: avaliação clínica imediata.'
                : assessment.dangerSignIds.includes('apnea')
                  ? 'Apneia presente: avaliação clínica imediata.'
                  : 'Cianose presente: avaliação clínica imediata.'}
            </p>
          )}
          {assessment.highRiskIds.length > 0 && (
            <p className="text-xs leading-relaxed text-amber-200">
              Lactente com menos de 6 meses: maior risco de complicações; a ausência de guincho não exclui apresentação grave.
            </p>
          )}
          {assessment.surveillanceDefinitionMet && (
            <p className="text-xs leading-relaxed text-cyan-100">
              Critérios brasileiros de suspeição atendidos
              {assessment.surveillanceRoute === 'confirmed-close-contact' ? ' por contato próximo confirmado' : ''}; seguir investigação, notificação e manejo conforme o fluxo local.
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/[0.07] px-4 py-2 text-[10px] text-zinc-500">
        <span>Estado vacinal não exclui suspeição.</span>
        {PERTUSSIS_SAFETY_REFERENCES.map(reference => (
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
