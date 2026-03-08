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
    <section
      className="rounded-3xl p-4 md:p-5"
      style={{
        background: 'linear-gradient(135deg, rgba(153,27,27,0.24) 0%, rgba(17,24,39,0.96) 40%, rgba(4,12,24,0.98) 100%)',
        border: '1px solid rgba(248,113,113,0.18)',
        boxShadow: '0 18px 40px rgba(0,0,0,0.28)',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.18)' }}
          >
            <Activity className="w-5 h-5 text-red-300" strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.24em] text-red-300/75 font-semibold">Caso ativo</p>
            <h2 className="text-white text-lg md:text-xl font-bold leading-tight mt-1">
              {WORKFLOW_LABELS[activeCaseSession.workflow]}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
              <span className="px-2 py-1 rounded-full bg-white/7 border border-white/10 text-slate-200">
                Gravidade: {SEVERITY_LABELS[activeCaseSession.illnessSeverity]}
              </span>
              {activeCaseSession.activeStepId && (
                <span className="px-2 py-1 rounded-full bg-white/7 border border-white/10 text-slate-300">
                  Etapa: {activeCaseSession.activeStepId}
                </span>
              )}
              <span className="px-2 py-1 rounded-full bg-white/7 border border-white/10 text-slate-300">
                {activeCaseSession.events.length} evento(s)
              </span>
              {activeCaseSession.workflow === 'pcr' && (
                <span className="px-2 py-1 rounded-full bg-white/7 border border-white/10 text-slate-300">
                  Roles: {assignedRoles}/4
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white active:scale-95 transition-all"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          aria-label="Encerrar caso ativo"
        >
          <X className="w-4.5 h-4.5" strokeWidth={2} />
        </button>
      </div>

      {activeCaseSession.pendingActionLabels.length > 0 && (
        <div className="mt-4 rounded-2xl p-3 bg-white/5 border border-white/7">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">
            <ClipboardList className="w-3.5 h-3.5" strokeWidth={2} />
            Próximas ações
          </div>
          <div className="flex flex-wrap gap-2">
            {activeCaseSession.pendingActionLabels.slice(0, 4).map((label) => (
              <span
                key={label}
                className="px-2.5 py-1.5 rounded-full text-xs text-slate-200 bg-white/6 border border-white/8"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      )}

      {activeCaseSession.workflow === 'pcr' && (
        <div className="mt-4 rounded-2xl p-3 bg-white/5 border border-white/7">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">
            <Activity className="w-3.5 h-3.5" strokeWidth={2} />
            Role board
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Líder', assigned: activeCaseSession.roleAssignments.leader?.assigned },
              { label: 'Compressor', assigned: activeCaseSession.roleAssignments.compressor?.assigned },
              { label: 'Airway', assigned: activeCaseSession.roleAssignments.airway?.assigned },
              { label: 'Meds/monitor', assigned: activeCaseSession.roleAssignments.meds_monitor?.assigned },
            ].map((item) => (
              <div key={item.label} className="px-2.5 py-2 rounded-xl bg-white/6 border border-white/8">
                <p className="text-xs text-slate-200 font-semibold">{item.label}</p>
                <p className={`text-[11px] mt-1 ${item.assigned ? 'text-green-300' : 'text-slate-500'}`}>
                  {item.assigned ? activeCaseSession.roleAssignments[
                    item.label === 'Líder'
                      ? 'leader'
                      : item.label === 'Compressor'
                        ? 'compressor'
                        : item.label === 'Airway'
                          ? 'airway'
                          : 'meds_monitor'
                  ]?.label ?? 'assumido' : 'livre'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={href}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold text-white active:scale-95 transition-all"
          style={{ background: 'rgba(248,113,113,0.18)', border: '1px solid rgba(248,113,113,0.24)' }}
        >
          <Play className="w-4 h-4" strokeWidth={2} />
          Retomar caso
        </Link>
      </div>
    </section>
  );
}
