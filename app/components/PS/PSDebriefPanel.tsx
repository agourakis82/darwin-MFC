'use client';

import type { ActiveCaseSession } from '@/lib/store/psStore';

interface PSDebriefPanelProps {
  activeCaseSession: ActiveCaseSession | null;
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
  const activeCaseLabel = activeCaseSession
    ? `${activeCaseSession.workflow.toUpperCase()} · ${activeCaseSession.activeStepId ?? 'sem passo ativo'}`
    : 'Sem caso ativo';

  return (
    <section data-testid="ps-debrief-panel" className="space-y-5">
      <div className="ps-app-surface-strong rounded-[30px] p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="ps-app-label">Debrief mode</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white">Fechamento operacional</h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-300">Resumo do que foi revisado, confirmado, concluído e do que ainda exige retomada.</p>
          </div>
          <span className="ps-app-pill">{eventLines.length} eventos</span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <div data-testid="ps-debrief-reviewed-count" className="rounded-[24px] border border-amber-400/18 bg-amber-400/10 px-4 py-4"><p className="ps-app-label text-amber-200">Revisado</p><p className="mt-2 text-2xl font-bold text-white">{reviewedLabels.length}</p></div>
          <div data-testid="ps-debrief-confirmed-count" className="rounded-[24px] border border-emerald-400/18 bg-emerald-500/10 px-4 py-4"><p className="ps-app-label text-emerald-200">Confirmado</p><p className="mt-2 text-2xl font-bold text-white">{confirmedLabels.length}</p></div>
          <div data-testid="ps-debrief-completed-count" className="rounded-[24px] border border-cyan-400/18 bg-cyan-400/10 px-4 py-4"><p className="ps-app-label text-cyan-200">Concluído</p><p className="mt-2 text-2xl font-bold text-white">{completedLabels.length}</p></div>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-4"><p className="ps-app-label">Caso</p><p className="mt-2 text-base font-semibold text-white">{activeCaseLabel}</p></div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="ps-app-surface rounded-[30px] p-5 md:p-6">
          <p className="ps-app-label">Pendências / retomada</p>
          <div className="mt-4 space-y-3">
            {pendingActions.length > 0 ? pendingActions.map((item, index) => (
              <div key={`${item}-${index}`} className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-slate-200">{item}</div>
            )) : (
              <div className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-slate-400">Sem pendências abertas.</div>
            )}
          </div>
        </section>

        <section className="ps-app-surface rounded-[30px] p-5 md:p-6">
          <p className="ps-app-label">Timeline recente</p>
          <div className="mt-4 space-y-3">
            {eventLines.map((item, index) => (
              <div key={`${item}-${index}`} className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-slate-200">{item}</div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
