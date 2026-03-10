'use client';

import { Activity, ArrowRight, ClipboardList, Weight } from 'lucide-react';
import type { ActiveCaseSession, PatientContext } from '@/lib/store/psStore';
import { getEffectiveWeight } from '@/lib/store/psStore';

const WORKFLOW_LABELS: Record<ActiveCaseSession['workflow'], string> = {
  pcr: 'PCR / ACLS',
  sepse_choque: 'Sepse / Choque',
  iot_rsi: 'IOT / RSI',
};

interface PSSituationalAwarenessPanelProps {
  activeCaseSession: ActiveCaseSession | null;
  patient: PatientContext;
  currentStepTitle: string;
  nextStepTitle?: string | null;
  pendingActions: string[];
}

export default function PSSituationalAwarenessPanel({
  activeCaseSession,
  patient,
  currentStepTitle,
  nextStepTitle,
  pendingActions,
}: PSSituationalAwarenessPanelProps) {
  const weight = getEffectiveWeight(patient);
  const weightSource = patient.useIdealWeight
    ? 'ideal'
    : patient.weightSource === 'verified'
      ? 'verificado'
      : patient.weightSource === 'estimated'
        ? 'estimado'
        : null;

  return (
    <section className="rounded-[28px] border border-white/8 bg-white/[0.035] p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-cyan-300" strokeWidth={2} />
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Contexto vivo do caso</p>
        </div>
        {activeCaseSession && (
          <span className="rounded-full border border-cyan-400/16 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-100">
            {activeCaseSession.illnessSeverity}
          </span>
        )}
      </div>

      <div className="grid gap-3 xl:grid-cols-[0.85fr_0.65fr_1.5fr]">
        <div className="rounded-[22px] border border-white/7 bg-white/[0.04] p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Workflow</p>
          <p className="mt-1 text-sm font-semibold text-white">{activeCaseSession ? WORKFLOW_LABELS[activeCaseSession.workflow] : 'Sem caso ativo'}</p>
        </div>
        <div className="rounded-[22px] border border-white/7 bg-white/[0.04] p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Peso</p>
          <p className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-white">
            <Weight className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
            {weight ? `${weight} kg` : 'Não informado'}
          </p>
          {weightSource && <p className="mt-1 text-[11px] text-slate-500">{weightSource}</p>}
        </div>
        <div className="rounded-[22px] border border-white/7 bg-white/[0.04] p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Agora → Próximo</p>
          <p className="mt-1 text-sm font-semibold text-white">{currentStepTitle}</p>
          {nextStepTitle && (
            <p className="mt-2 inline-flex items-center gap-2 text-xs text-slate-400">
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              {nextStepTitle}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-[22px] border border-white/7 bg-white/[0.04] p-4">
        <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
          <ClipboardList className="h-3.5 w-3.5" strokeWidth={2} />
          Próximas ações
        </div>
        <div className="flex flex-wrap gap-2">
          {pendingActions.length > 0 ? pendingActions.map((label) => (
            <span key={label} className="rounded-full border border-white/8 bg-white/[0.05] px-3 py-1.5 text-xs text-slate-100">
              {label}
            </span>
          )) : (
            <span className="text-xs text-slate-500">Sem pendências registradas.</span>
          )}
        </div>
      </div>
    </section>
  );
}
