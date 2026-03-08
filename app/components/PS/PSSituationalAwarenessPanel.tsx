'use client';

import { Activity, Clock3, ClipboardList, Weight } from 'lucide-react';
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
      ? 'ver.'
      : patient.weightSource === 'estimated'
        ? 'est.'
        : null;

  return (
    <div
      className="rounded-2xl px-4 py-4 space-y-3"
      style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-rose-400" strokeWidth={2} />
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Situational awareness</p>
        </div>
        {activeCaseSession && (
          <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-rose-100 bg-rose-500/12 border border-rose-500/18">
            {activeCaseSession.illnessSeverity}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs md:grid-cols-3">
        <div className="rounded-xl px-3 py-2 bg-white/5 border border-white/7">
          <span className="text-slate-500 block mb-1">Workflow</span>
          <span className="text-white font-semibold">
            {activeCaseSession ? WORKFLOW_LABELS[activeCaseSession.workflow] : 'Sem caso ativo'}
          </span>
        </div>
        <div className="rounded-xl px-3 py-2 bg-white/5 border border-white/7">
          <span className="text-slate-500 block mb-1">Peso</span>
          <span className="text-white font-semibold inline-flex items-center gap-1.5">
            <Weight className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
            {weight ? `${weight} kg` : 'Não informado'}
            {weightSource && <span className="text-[10px] uppercase text-slate-500">{weightSource}</span>}
          </span>
        </div>
        <div className="rounded-xl px-3 py-2 bg-white/5 border border-white/7 col-span-2 md:col-span-1">
          <span className="text-slate-500 block mb-1">Pendências</span>
          <span className="text-white font-semibold">
            {pendingActions.length}
          </span>
        </div>
      </div>

      <div className="rounded-xl px-3 py-3 bg-white/5 border border-white/7">
        <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1">Passo atual</span>
        <p className="text-sm text-white font-semibold">{currentStepTitle}</p>
        {nextStepTitle && (
          <p className="text-xs text-slate-400 mt-1 inline-flex items-center gap-1.5">
            <Clock3 className="w-3.5 h-3.5" strokeWidth={2} />
            Próximo: {nextStepTitle}
          </p>
        )}
      </div>

      <div className="rounded-xl px-3 py-3 bg-white/5 border border-white/7">
        <div className="flex items-center gap-1.5 mb-2">
          <ClipboardList className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
          <span className="text-[11px] text-slate-500 uppercase tracking-wider">Pendências</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {pendingActions.length > 0 ? pendingActions.map((label) => (
            <span
              key={label}
              className="px-2.5 py-1.5 rounded-full text-xs text-slate-200 bg-white/6 border border-white/8"
            >
              {label}
            </span>
          )) : (
            <span className="text-xs text-slate-500">Sem pendências registradas.</span>
          )}
        </div>
      </div>
    </div>
  );
}
