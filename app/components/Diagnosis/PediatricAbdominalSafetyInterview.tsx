'use client';

import { AlertTriangle, ChevronDown, ExternalLink, ScanSearch, ShieldAlert } from 'lucide-react';
import {
  PEDIATRIC_ABDOMINAL_SAFETY_REFERENCES,
  type PediatricAbdominalSafetyAssessment,
  type PediatricAbdominalSafetyInput,
} from '@/lib/clinical-safety/pediatric-abdominal';
import type { ClinicalAnswer } from '@/lib/clinical-safety/pertussis';

export type PediatricAbdominalSafetyAnswers = Omit<
  PediatricAbdominalSafetyInput,
  'ageDays' | 'abdominalOrVomitingPresent'
>;

interface PediatricAbdominalSafetyInterviewProps {
  answers: PediatricAbdominalSafetyAnswers;
  assessment: PediatricAbdominalSafetyAssessment;
  onChange: (updates: Partial<PediatricAbdominalSafetyAnswers>) => void;
  sharedDiarrheaSigns?: boolean;
}

const answerOptions: Array<{ value: ClinicalAnswer; label: string; title: string }> = [
  { value: 'yes', label: 'Sim', title: 'Presente' },
  { value: 'no', label: 'Não', title: 'Ausente' },
  { value: 'unknown', label: '?', title: 'Não investigado ou desconhecido' },
];

const dangerLabels: Record<string, string> = {
  'bilious-vomiting': 'vômito verde/bilioso, possível obstrução',
  hematemesis: 'sangue no vômito',
  peritonism: 'defesa, rigidez ou dor à descompressão/percussão',
  'abdominal-mass-or-incarcerated-hernia': 'massa abdominal ou hérnia dolorosa/irredutível',
  'acute-scrotal-pain-or-swelling': 'dor ou aumento escrotal agudo',
  'acute-pelvic-pain-or-pregnancy-concern': 'dor pélvica súbita ou possibilidade de gestação/complicação',
  'severe-sudden-or-progressive-pain': 'dor intensa súbita ou progressiva',
  'bowel-obstruction-pattern': 'padrão que exige excluir obstrução intestinal',
  'intussusception-pattern': 'padrão que exige excluir invaginação intestinal',
  'projectile-vomiting-young-infant': 'vômito em jato no lactente jovem',
  'neurological-red-flags': 'sinal neurológico, meningismo, fontanela abaulada ou vômito matinal com cefaleia',
  'dka-pattern': 'padrão sistêmico que exige excluir cetoacidose',
  'suspected-poisoning': 'suspeita de ingestão ou intoxicação',
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

export default function PediatricAbdominalSafetyInterview({
  answers,
  assessment,
  onChange,
  sharedDiarrheaSigns = false,
}: PediatricAbdominalSafetyInterviewProps) {
  const status = assessment.priority === 'immediate-referral'
    ? { label: 'Encaminhar agora', className: 'border-red-300/30 bg-red-300/10 text-red-200' }
    : assessment.priority === 'same-day-assessment'
      ? { label: 'Avaliar hoje', className: 'border-amber-300/30 bg-amber-300/10 text-amber-200' }
      : { label: 'Sem alarme registrado', className: 'border-white/15 bg-white/[0.04] text-zinc-400' };

  return (
    <section className="border-b border-white/[0.07] bg-[#101419]" aria-labelledby="pediatric-abdominal-safety-title">
      <div className="flex flex-col gap-2 border-b border-white/[0.07] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-2.5">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" aria-hidden="true" />
          <div className="min-w-0">
            <h3 id="pediatric-abdominal-safety-title" className="text-xs font-semibold text-zinc-100">
              Dor abdominal e vômitos pediátricos
            </h3>
            <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500">
              Exclui padrões cirúrgicos e extra-abdominais antes de ordenar hipóteses; não fecha diagnóstico.
            </p>
          </div>
        </div>
        <span className={`w-fit shrink-0 rounded border px-2 py-1 text-[10px] font-semibold uppercase ${status.className}`}>
          {status.label}
        </span>
      </div>

      <div className="grid gap-3 border-b border-white/[0.07] px-4 py-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="min-w-0 text-[11px] font-medium text-zinc-400">
          Início da dor
          <select
            value={answers.painOnset}
            onChange={event => onChange({ painOnset: event.target.value as PediatricAbdominalSafetyAnswers['painOnset'] })}
            className="mt-1.5 h-8 w-full rounded border border-white/15 bg-[#101419] px-2 text-xs text-zinc-100 outline-none focus:border-cyan-300/50"
          >
            <option value="unknown">Não investigado</option>
            <option value="sudden">Súbito</option>
            <option value="gradual">Gradual</option>
          </select>
        </label>
        <label className="min-w-0 text-[11px] font-medium text-zinc-400">
          Padrão da dor
          <select
            value={answers.painPattern}
            onChange={event => onChange({ painPattern: event.target.value as PediatricAbdominalSafetyAnswers['painPattern'] })}
            className="mt-1.5 h-8 w-full rounded border border-white/15 bg-[#101419] px-2 text-xs text-zinc-100 outline-none focus:border-cyan-300/50"
          >
            <option value="unknown">Não investigado</option>
            <option value="constant-progressive">Constante / progressiva</option>
            <option value="intermittent-colicky">Crises em cólica</option>
            <option value="other">Outro padrão</option>
            <option value="none">Sem dor</option>
          </select>
        </label>
        <label className="min-w-0 text-[11px] font-medium text-zinc-400">
          Localização
          <select
            value={answers.painLocation}
            onChange={event => onChange({ painLocation: event.target.value as PediatricAbdominalSafetyAnswers['painLocation'] })}
            className="mt-1.5 h-8 w-full rounded border border-white/15 bg-[#101419] px-2 text-xs text-zinc-100 outline-none focus:border-cyan-300/50"
          >
            <option value="unknown">Não investigada</option>
            <option value="diffuse">Difusa</option>
            <option value="periumbilical">Periumbilical</option>
            <option value="right-lower-quadrant">Quadrante inferior direito</option>
            <option value="other-localized">Outra localização focal</option>
            <option value="pelvic-lower">Pélvica / baixo ventre</option>
            <option value="none">Sem dor</option>
          </select>
        </label>
        <label className="min-w-0 text-[11px] font-medium text-zinc-400">
          Intensidade
          <select
            value={answers.painSeverity}
            onChange={event => onChange({ painSeverity: event.target.value as PediatricAbdominalSafetyAnswers['painSeverity'] })}
            className="mt-1.5 h-8 w-full rounded border border-white/15 bg-[#101419] px-2 text-xs text-zinc-100 outline-none focus:border-cyan-300/50"
          >
            <option value="unknown">Não investigada</option>
            <option value="mild">Leve</option>
            <option value="moderate">Moderada</option>
            <option value="severe">Intensa</option>
            <option value="none">Sem dor</option>
          </select>
        </label>
        <label className="min-w-0 text-[11px] font-medium text-zinc-400">
          Duração da dor
          <div className="relative mt-1.5">
            <input
              type="number"
              min="0"
              max="720"
              step="1"
              inputMode="numeric"
              value={answers.painDurationHours ?? ''}
              onChange={event => onChange({ painDurationHours: event.target.value === '' ? undefined : Number(event.target.value) })}
              placeholder="Não informada"
              className="h-8 w-full rounded border border-white/15 bg-black/20 px-2.5 pr-8 text-xs text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-cyan-300/50"
            />
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600">h</span>
          </div>
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
            onChange={event => onChange({ vomitingEpisodesLast24Hours: event.target.value === '' ? undefined : Number(event.target.value) })}
            placeholder="Não informado"
            className="mt-1.5 h-8 w-full rounded border border-white/15 bg-black/20 px-2.5 text-xs text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-cyan-300/50"
          />
        </label>
        <TriStateField label="Migrou para quadrante inferior direito" value={answers.migrationToRightLowerQuadrant} onChange={value => onChange({ migrationToRightLowerQuadrant: value })} />
        <TriStateField label="Piora ao mover / não anda ou pula" value={answers.painWithMovementOrUnableToWalkHop} onChange={value => onChange({ painWithMovementOrUnableToWalkHop: value })} />
      </div>

      <div className="grid gap-3 border-b border-white/[0.07] px-4 py-3 sm:grid-cols-2 lg:grid-cols-4">
        <TriStateField label="Vômito verde / bilioso" value={answers.biliousVomiting} onChange={value => onChange({ biliousVomiting: value })} />
        <TriStateField label="Sangue no vômito" value={answers.hematemesis} onChange={value => onChange({ hematemesis: value })} />
        <TriStateField label="Defesa ou rigidez abdominal" value={answers.guardingOrRigidity} onChange={value => onChange({ guardingOrRigidity: value })} />
        <TriStateField label="Dor à descompressão / percussão" value={answers.reboundOrPercussionTenderness} onChange={value => onChange({ reboundOrPercussionTenderness: value })} />
        <TriStateField label="Distensão abdominal" value={answers.abdominalDistension} onChange={value => onChange({ abdominalDistension: value })} />
        <TriStateField label="Massa ou hérnia dolorosa / irredutível" value={answers.palpableMassOrIncarceratedHernia} onChange={value => onChange({ palpableMassOrIncarceratedHernia: value })} />
        <TriStateField label="Dor ou aumento escrotal agudo" value={answers.scrotalOrInguinalPainSwelling} onChange={value => onChange({ scrotalOrInguinalPainSwelling: value })} />
        <TriStateField label="Dor pélvica súbita / possibilidade de gestação" value={answers.suddenPelvicPainOrPregnancyConcern} onChange={value => onChange({ suddenPelvicPainOrPregnancyConcern: value })} />
      </div>

      <details className="group border-b border-white/[0.07]">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-2.5 text-[11px] font-medium text-zinc-400 hover:text-zinc-200">
          <ScanSearch className="h-3.5 w-3.5 text-rose-300" aria-hidden="true" />
          Padrões por idade e causas extra-abdominais
          <ChevronDown className="ml-auto h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="grid gap-3 border-t border-white/[0.07] px-4 py-3 sm:grid-cols-2 lg:grid-cols-4">
          <TriStateField label="Vômito em jato" value={answers.projectileVomiting} onChange={value => onChange({ projectileVomiting: value })} />
          {!sharedDiarrheaSigns && (
            <TriStateField label="Vomita tudo" value={answers.vomitingEverything} onChange={value => onChange({ vomitingEverything: value })} />
          )}
          {!sharedDiarrheaSigns && (
            <TriStateField label="Sangue visível nas fezes" value={answers.visibleBloodInStool} onChange={value => onChange({ visibleBloodInStool: value })} />
          )}
          <TriStateField label="Encolhe / puxa as pernas nas crises" value={answers.drawsLegsUp} onChange={value => onChange({ drawsLegsUp: value })} />
          <TriStateField label="Palidez ou letargia episódica" value={answers.pallorOrEpisodicLethargy} onChange={value => onChange({ pallorOrEpisodicLethargy: value })} />
          <TriStateField label="Cefaleia ou vômito predominante pela manhã" value={answers.morningHeadacheOrMorningVomiting} onChange={value => onChange({ morningHeadacheOrMorningVomiting: value })} />
          <TriStateField label="Neurológico anormal / meningismo / fontanela" value={answers.abnormalNeurologyMeningismOrBulgingFontanelle} onChange={value => onChange({ abnormalNeurologyMeningismOrBulgingFontanelle: value })} />
          <TriStateField label="Poliúria, polidipsia, perda de peso ou respiração profunda" value={answers.polyuriaPolydipsiaWeightLossOrDeepBreathing} onChange={value => onChange({ polyuriaPolydipsiaWeightLossOrDeepBreathing: value })} />
          <TriStateField label="Suspeita de ingestão / intoxicação" value={answers.suspectedPoisoningOrIngestion} onChange={value => onChange({ suspectedPoisoningOrIngestion: value })} />
          <TriStateField label="Cirurgia abdominal ou obstrução prévia" value={answers.previousAbdominalSurgeryOrObstruction} onChange={value => onChange({ previousAbdominalSurgeryOrObstruction: value })} />
          <TriStateField label="Sintomas urinários" value={answers.urinarySymptoms} onChange={value => onChange({ urinarySymptoms: value })} />
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
          {assessment.prioritySignIds.includes('incomplete-core-surgical-screen') && (
            <p className="text-xs leading-relaxed text-amber-200">Complete os sinais cirúrgicos essenciais; desconhecido não significa ausência.</p>
          )}
          {assessment.prioritySignIds.includes('appendicitis-compatible-pattern') && (
            <p className="text-xs leading-relaxed text-amber-200">Padrão compatível que exige excluir apendicite hoje; isto não confirma o diagnóstico.</p>
          )}
          {assessment.prioritySignIds.includes('recurrent-vomiting') && (
            <p className="text-xs leading-relaxed text-amber-200">Vômitos recorrentes exigem avaliação clínica no mesmo dia e reavaliação da hidratação.</p>
          )}
          {assessment.prioritySignIds.includes('localized-abdominal-pain') && (
            <p className="text-xs leading-relaxed text-amber-200">Dor localizada exige exame abdominal e reavaliação no mesmo dia.</p>
          )}
          {assessment.prioritySignIds.includes('young-infant-nonspecific-symptoms') && (
            <p className="text-xs leading-relaxed text-amber-200">Lactente menor de 3 meses: vômito ou dor inespecífica exige avaliação presencial no mesmo dia.</p>
          )}
          {assessment.prioritySignIds.includes('urinary-symptoms') && (
            <p className="text-xs leading-relaxed text-amber-200">Sintomas urinários exigem avaliação dirigida; não são atribuídos automaticamente ao abdome.</p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 text-[10px] text-zinc-500">
        <span>Não calcula escore, não solicita imagem e não autoriza antiemético, antibiótico ou prescrição.</span>
        {PEDIATRIC_ABDOMINAL_SAFETY_REFERENCES.map(reference => (
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
