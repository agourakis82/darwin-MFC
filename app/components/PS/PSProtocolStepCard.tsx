'use client';

import type { ElementType } from 'react';
import { AlertTriangle, CheckCircle2, Info, Siren } from 'lucide-react';
import type { EmergencyProtocolStep } from '@/lib/ps/types';

const ALERT_META: Record<string, { icon: ElementType; color: string; bg: string; border: string }> = {
  critical: { icon: Siren, color: '#f87171', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.30)' },
  warning: { icon: AlertTriangle, color: '#fbbf24', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.25)' },
  info: { icon: Info, color: '#60a5fa', bg: 'rgba(59,130,246,0.10)', border: 'rgba(59,130,246,0.25)' },
};

const TYPE_LABEL: Record<string, string> = {
  action: 'Ação',
  decision: 'Decisão',
  drug: 'Droga',
  timer: 'Timer',
  checklist: 'Checklist',
  score: 'Score',
};

interface PSProtocolStepCardProps {
  step: EmergencyProtocolStep;
  isActive: boolean;
  isComplete: boolean;
  hasReviewed: boolean;
  hasConfirmed: boolean;
  onClick: () => void;
}

export default function PSProtocolStepCard({
  step,
  isActive,
  isComplete,
  hasReviewed,
  hasConfirmed,
  onClick,
}: PSProtocolStepCardProps) {
  const alert = ALERT_META[step.alertLevel ?? 'info'] ?? ALERT_META.info;
  const AlertIcon = alert.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left apple-transition-fast active:scale-[0.99]"
    >
      <div
        className="ps-app-interactive overflow-hidden rounded-[18px]"
        style={{
          background: isActive
            ? 'rgba(255,255,255,0.055)'
            : isComplete
              ? 'rgba(34,197,94,0.07)'
              : 'rgba(255,255,255,0.028)',
          border: isActive
            ? `1px solid ${alert.border}`
            : isComplete
              ? '0.5px solid rgba(34,197,94,0.20)'
              : '0.5px solid rgba(255,255,255,0.06)',
          boxShadow: isActive ? `0 0 0 1px ${alert.border}` : 'none',
        }}
      >
        <div className="flex items-center gap-3 px-3 py-2.5">
          <div
            className="flex h-6.5 w-6.5 flex-shrink-0 items-center justify-center rounded-full"
            style={{
              background: isComplete
                ? 'rgba(34,197,94,0.15)'
                : isActive
                  ? alert.bg
                  : 'rgba(255,255,255,0.04)',
            }}
          >
            {isComplete ? (
              <CheckCircle2 className="w-4 h-4 text-green-400" strokeWidth={2.5} />
            ) : (
              <AlertIcon className="w-3.5 h-3.5" style={{ color: isActive ? alert.color : '#64748b' }} strokeWidth={2} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className={`text-[12px] font-semibold leading-snug ${isActive ? 'text-white' : isComplete ? 'text-slate-400' : 'text-slate-300'}`}>
              {step.title}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <p className="text-[9px] uppercase tracking-[0.18em] text-slate-500">{TYPE_LABEL[step.type] ?? step.type}</p>
              {hasReviewed && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide text-amber-200 border border-amber-400/25 bg-amber-500/10">
                  revisado
                </span>
              )}
              {hasConfirmed && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide text-green-200 border border-green-400/25 bg-green-500/10">
                  confirmado
                </span>
              )}
            </div>
          </div>

          {isActive && (
            <div className="h-6 w-1 flex-shrink-0 rounded-full" style={{ background: alert.color }} />
          )}
        </div>
      </div>
    </button>
  );
}
