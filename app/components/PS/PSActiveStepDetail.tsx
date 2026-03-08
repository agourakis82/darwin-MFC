'use client';

import type { ElementType } from 'react';
import { CheckCircle2, Circle, ChevronRight, Pill, Search, Timer, AlertTriangle, Info, Siren, BookOpen } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { EmergencyProtocolStep } from '@/lib/ps/types';

const ALERT_META: Record<string, { label: string; icon: ElementType; color: string; bg: string; border: string }> = {
  critical: { label: 'CRÍTICO', icon: Siren, color: '#f87171', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.30)' },
  warning: { label: 'ATENÇÃO', icon: AlertTriangle, color: '#fbbf24', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.25)' },
  info: { label: 'INFO', icon: Info, color: '#60a5fa', bg: 'rgba(59,130,246,0.10)', border: 'rgba(59,130,246,0.25)' },
};

const TYPE_LABEL: Record<string, string> = {
  action: 'Ação',
  decision: 'Decisão',
  drug: 'Droga',
  timer: 'Timer',
  checklist: 'Checklist',
  score: 'Score',
};

interface PSActiveStepDetailProps {
  step: EmergencyProtocolStep;
  isLastStep: boolean;
  hasReviewed: boolean;
  hasConfirmed: boolean;
  checkedItems: Set<number>;
  drugLabel?: string | null;
  onToggleCheck: (i: number) => void;
  onAdvance: () => void;
  onSelectOption: (nextId: string) => void;
  onOpenTimer: () => void;
  onOpenDrug: () => void;
}

export default function PSActiveStepDetail({
  step,
  isLastStep,
  hasReviewed,
  hasConfirmed,
  checkedItems,
  drugLabel,
  onToggleCheck,
  onAdvance,
  onSelectOption,
  onOpenTimer,
  onOpenDrug,
}: PSActiveStepDetailProps) {
  const alert = ALERT_META[step.alertLevel ?? 'info'] ?? ALERT_META.info;
  const AlertIcon = alert.icon;
  const checkedCount = checkedItems.size;
  const totalItems = step.checklistItems?.length ?? 0;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: `1px solid ${alert.border}`,
      }}
    >
      <div
        className="flex items-center gap-2.5 px-4 py-3"
        style={{ background: alert.bg, borderBottom: `0.5px solid ${alert.border}` }}
      >
        <AlertIcon className="w-4 h-4 flex-shrink-0" style={{ color: alert.color }} strokeWidth={2} />
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: alert.color }}>
          {alert.label}
        </span>
        <span className="ml-auto text-xs font-mono text-slate-600">{TYPE_LABEL[step.type]}</span>
      </div>

      <div className="px-4 py-4 space-y-4">
        <div>
          <h2 className="text-[17px] font-bold text-white leading-tight">{step.title}</h2>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {hasReviewed && (
              <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-amber-200 border border-amber-400/25 bg-amber-500/10">
                Revisado
              </span>
            )}
            {hasConfirmed && (
              <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-green-200 border border-green-400/25 bg-green-500/10">
                Confirmado
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{step.description}</p>
        </div>

        {step.type === 'checklist' && step.checklistItems?.length ? (
          <div className="space-y-1.5">
            <div
              className="rounded-xl px-3 py-2.5 mb-2"
              style={{ background: 'rgba(245,158,11,0.08)', border: '0.5px solid rgba(245,158,11,0.18)' }}
            >
              <p className="text-[11px] uppercase tracking-widest text-amber-300 font-bold">Checkpoint de segurança</p>
              <p className="text-xs text-amber-100/85 mt-1">Conclua os itens antes de avançar para reduzir omissão de passo crítico.</p>
            </div>
            {totalItems > 0 && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                  {checkedCount} / {totalItems} concluídos
                </span>
                {checkedCount === totalItems && totalItems > 0 && (
                  <span className="text-[11px] text-green-400 font-bold">✓ Completo</span>
                )}
              </div>
            )}
            {step.checklistItems.map((item, i) => {
              const done = checkedItems.has(i);
              return (
                <button
                  key={`${step.id}-ck-${i}`}
                  type="button"
                  onClick={() => onToggleCheck(i)}
                  className="w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 active:scale-[0.99]"
                  style={{
                    background: done ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.03)',
                    border: `0.5px solid ${done ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.07)'}`,
                  }}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {done ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-green-400" strokeWidth={2.5} />
                    ) : (
                      <Circle className="w-4.5 h-4.5 text-slate-600" strokeWidth={1.5} />
                    )}
                  </div>
                  <span className={`text-sm leading-snug transition-colors ${done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                    {item}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}

        {step.type === 'drug' && step.drugId && (
          <button
            type="button"
            onClick={onOpenDrug}
            data-testid={`ps-step-drug-${step.drugId}`}
            aria-label={`${drugLabel ?? step.drugId} abrir sheet`}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold active:scale-95 transition-transform"
            style={{ background: 'rgba(245,158,11,0.12)', border: '0.5px solid rgba(245,158,11,0.30)', color: '#fcd34d' }}
          >
            <Pill className="w-4 h-4" strokeWidth={2} />
            {drugLabel ?? step.drugId}
            <span className="text-amber-400/60 text-xs ml-auto">abrir sheet</span>
          </button>
        )}

        {step.type === 'timer' && (
          <button
            type="button"
            onClick={onOpenTimer}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold active:scale-95 transition-transform"
            style={{ background: 'rgba(239,68,68,0.12)', border: '0.5px solid rgba(239,68,68,0.30)', color: '#fca5a5' }}
          >
            <Timer className="w-4 h-4" strokeWidth={2} />
            Abrir timer
          </button>
        )}

        {step.type === 'score' && step.scoreId && (
          <Link
            href={`/ps/escalas?score=${step.scoreId}`}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold active:scale-95 transition-transform"
            style={{ background: 'rgba(34,211,238,0.10)', border: '0.5px solid rgba(34,211,238,0.25)', color: '#67e8f9' }}
          >
            <Search className="w-4 h-4" strokeWidth={2} />
            Abrir score
          </Link>
        )}

        {step.notes?.length ? (
          <div
            className="rounded-xl px-3 py-3 space-y-2"
            style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <BookOpen className="w-3.5 h-3.5 text-slate-500" strokeWidth={2} />
              <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Notas clínicas</span>
            </div>
            {step.notes.map((note) => (
              <p key={note} className="text-xs text-slate-400 leading-relaxed">{note}</p>
            ))}
          </div>
        ) : null}

        {step.type === 'decision' && step.options?.length ? (
          <div className="space-y-2">
            {step.options.map((opt, i) => (
              <button
                key={`${step.id}-opt-${i}`}
                type="button"
                onClick={() => onSelectOption(opt.nextStepId)}
                className="w-full text-left px-4 py-3.5 rounded-xl transition-all active:scale-[0.98] duration-100"
                style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.12)' }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-white">{opt.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
                </div>
                {opt.condition && (
                  <p className="text-xs text-slate-500 mt-1 leading-snug">{opt.condition}</p>
                )}
              </button>
            ))}
          </div>
        ) : step.type !== 'decision' ? (
          <button
            type="button"
            onClick={onAdvance}
            disabled={isLastStep}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold active:scale-[0.98] transition-all duration-100"
            style={
              isLastStep
                ? { background: 'rgba(34,197,94,0.12)', border: '0.5px solid rgba(34,197,94,0.25)', color: '#4ade80' }
                : { background: 'rgba(239,68,68,0.15)', border: '0.5px solid rgba(239,68,68,0.35)', color: '#f87171' }
            }
          >
            {isLastStep ? (
              <>
                <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                Protocolo concluído
              </>
            ) : (
              <>
                Próximo passo
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </>
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}
