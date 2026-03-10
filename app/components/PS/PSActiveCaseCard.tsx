'use client';

import { Link } from '@/i18n/routing';
import { Activity, ClipboardList, Play, X } from 'lucide-react';
import type { ActiveCaseSession } from '@/lib/store/psStore';

const WORKFLOW_LABELS: Record<ActiveCaseSession['workflow'], string> = {
  pcr: 'PCR / ACLS',
  sepse_choque: 'Sepse / Choque',
  iot_rsi: 'IOT / RSI',
};

const SEVERITY_LABELS: Record<ActiveCaseSession['illnessSeverity'], string> = {
  critical: 'Crítico',
  high: 'Alto risco',
  moderate: 'Moderado',
  unknown: 'A definir',
};

interface PSActiveCaseCardProps {
  activeCaseSession: ActiveCaseSession;
  onClose: () => void;
}

export default function PSActiveCaseCard({
  activeCaseSession,
  onClose,
}: PSActiveCaseCardProps) {
  const href = activeCaseSession.protocolId ? `/ps/protocolos/${activeCaseSession.protocolId}` : '/ps';
  const assignedRoles = Object.values(activeCaseSession.roleAssignments ?? {}).filter((role) => role.assigned).length;

  return (
    <section className="rounded-[32px] border border-cyan-400/12 bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(7,16,29,0.96)_38%,rgba(4,10,18,1))] p-5 md:p-6 shadow-[0_26px_90px_rgba(0,0,0,0.30)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-center gap-2 ps-app-label text-cyan-300/75">
            <Activity className="h-3.5 w-3.5" strokeWidth={2} />
            Caso em execução
          </div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">{WORKFLOW_LABELS[activeCaseSession.workflow]}</h2>
              <p className="mt-2 text-sm text-slate-400 max-w-2xl">
                Etapa atual, pendências imediatas e retomada rápida no mesmo plano operacional.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="ps-app-pill">{SEVERITY_LABELS[activeCaseSession.illnessSeverity]}</span>
              {activeCaseSession.activeStepId && (
                <span className="ps-app-pill">{activeCaseSession.activeStepId}</span>
              )}
              <span className="ps-app-pill">{activeCaseSession.events.length} eventos</span>
              {activeCaseSession.workflow === 'pcr' && (
                <span className="ps-app-pill">Roles {assignedRoles}/4</span>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.04] text-slate-400 transition hover:text-white"
          aria-label="Encerrar caso ativo"
        >
          <X className="h-4.5 w-4.5" strokeWidth={2} />
        </button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="ps-app-surface rounded-[28px] p-4">
          <div className="mb-3 flex items-center gap-2 ps-app-label">
            <ClipboardList className="h-3.5 w-3.5" strokeWidth={2} />
            Próximas ações
          </div>
          <div className="flex flex-wrap gap-2">
            {activeCaseSession.pendingActionLabels.length > 0 ? activeCaseSession.pendingActionLabels.slice(0, 5).map((label) => (
              <span key={label} className="ps-app-pill">
                {label}
              </span>
            )) : (
              <span className="text-sm text-slate-500">Sem pendências imediatas.</span>
            )}
          </div>
        </div>

        <div className="ps-app-surface rounded-[28px] p-4 flex flex-col gap-3">
          <p className="ps-app-label">Retomada rápida</p>
          <Link
            href={href}
            className="ps-app-interactive inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400/16 px-4 py-3 text-sm font-semibold text-cyan-100 border border-cyan-400/20 shadow-[0_14px_36px_rgba(0,0,0,0.16)]"
          >
            <Play className="h-4 w-4" strokeWidth={2} />
            Retomar caso
          </Link>
        </div>
      </div>
    </section>
  );
}
