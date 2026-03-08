'use client';

import { ClipboardCheck } from 'lucide-react';
import type { ActiveCaseSession } from '@/lib/store/psStore';

interface PSDebriefPanelProps {
  activeCaseSession: ActiveCaseSession;
  confirmedLabels: string[];
  reviewedLabels: string[];
  completedLabels: string[];
  pendingActions: string[];
  eventLines: string[];
}

export default function PSDebriefPanel({
  activeCaseSession,
  confirmedLabels,
  reviewedLabels,
  completedLabels,
  pendingActions,
  eventLines,
}: PSDebriefPanelProps) {
  return (
    <div
      data-testid="ps-debrief-panel"
      className="rounded-[24px] px-4 py-4 space-y-3.5"
      style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-center gap-2">
        <ClipboardCheck className="w-3.5 h-3.5 text-green-400" strokeWidth={2} />
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Debrief</p>
      </div>

      <div className="rounded-xl px-3 py-2 border border-green-400/12 bg-green-500/6">
        <p className="text-[10px] uppercase tracking-wider text-green-200 font-bold">Fechamento rápido do caso</p>
        <p className="text-xs text-slate-300 mt-1">
          O que foi confirmado, o que ficou pendente e o que precisa ser retomado primeiro.
        </p>
      </div>

      <div className="grid gap-2 md:grid-cols-[minmax(0,1.1fr)_minmax(180px,0.9fr)]">
        <div className="rounded-xl px-3 py-3 bg-white/5 border border-white/7">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Caso ativo</p>
          <p className="text-xs text-slate-100 mt-1">{activeCaseSession.protocolId ?? activeCaseSession.workflow}</p>
          <p className="text-[11px] text-slate-500 mt-1">{activeCaseSession.events.length} evento(s) no caso</p>
        </div>
        <div className="rounded-xl px-3 py-3 bg-white/5 border border-white/7">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Prioridade de retomada</p>
          <p className="text-xs text-slate-100 mt-1">
            {pendingActions[0] ?? 'Sem pendência imediata'}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span data-testid="ps-debrief-confirmed-count" className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-green-200 border border-green-400/20 bg-green-500/10">
          Confirmado {confirmedLabels.length}
        </span>
        <span data-testid="ps-debrief-reviewed-count" className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-amber-200 border border-amber-400/20 bg-amber-500/10">
          Revisado {reviewedLabels.length}
        </span>
        <span data-testid="ps-debrief-completed-count" className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-violet-200 border border-violet-400/20 bg-violet-500/10">
          Concluído {completedLabels.length}
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl p-3.5 bg-white/5 border border-white/7">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Confirmado</p>
          <div className="space-y-1.5">
            {confirmedLabels.length > 0 ? confirmedLabels.slice(0, 4).map((label) => (
              <p key={label} className="text-xs text-slate-200">{label}</p>
            )) : <p className="text-xs text-slate-500">Sem confirmações.</p>}
          </div>
        </div>
        <div className="rounded-2xl p-3.5 bg-white/5 border border-white/7">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Revisado</p>
          <div className="space-y-1.5">
            {reviewedLabels.length > 0 ? reviewedLabels.slice(0, 4).map((label) => (
              <p key={label} className="text-xs text-slate-200">{label}</p>
            )) : <p className="text-xs text-slate-500">Sem revisões.</p>}
          </div>
        </div>
        <div className="rounded-2xl p-3.5 bg-white/5 border border-white/7">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Concluído</p>
          <div className="space-y-1.5">
            {completedLabels.length > 0 ? completedLabels.slice(0, 4).map((label) => (
              <p key={label} className="text-xs text-slate-200">{label}</p>
            )) : <p className="text-xs text-slate-500">Sem passos concluídos.</p>}
          </div>
        </div>
        <div className="rounded-2xl p-3.5 bg-white/5 border border-white/7">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Pendências</p>
          <div className="space-y-1.5">
            {pendingActions.length > 0 ? pendingActions.slice(0, 4).map((label) => (
              <p key={label} className="text-xs text-slate-200">{label}</p>
            )) : <p className="text-xs text-slate-500">Sem pendências.</p>}
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-3.5 bg-white/5 border border-white/7">
        <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Timeline recente</p>
        <div className="space-y-1.5">
          {eventLines.length > 0 ? eventLines.slice(0, 8).map((line) => (
            <p key={line} className="text-xs text-slate-200">{line}</p>
          )) : <p className="text-xs text-slate-500">Sem timeline disponível.</p>}
        </div>
      </div>
    </div>
  );
}
