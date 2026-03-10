'use client';

import type { ElementType } from 'react';
import { CheckCircle2, Circle, ChevronRight, Pill, Search, Timer, AlertTriangle, Info, Siren, BookOpen } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { EmergencyProtocolStep } from '@/lib/ps/types';

const ALERT_META: Record<string, { label: string; icon: ElementType; color: string; bg: string; border: string }> = {
  critical: { label: 'Crítico', icon: Siren, color: '#fb7185', bg: 'rgba(239,68,68,0.10)', border: 'rgba(239,68,68,0.24)' },
  warning: { label: 'Atenção', icon: AlertTriangle, color: '#fbbf24', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.24)' },
  info: { label: 'Info', icon: Info, color: '#67e8f9', bg: 'rgba(34,211,238,0.10)', border: 'rgba(34,211,238,0.22)' },
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
    <section className="overflow-hidden rounded-[32px] border shadow-[0_18px_48px_rgba(0,0,0,0.18)]" style={{ background: 'rgba(255,255,255,0.035)', borderColor: alert.border }}>
      <div className="px-5 py-4 border-b" style={{ background: alert.bg, borderColor: alert.border }}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <AlertIcon className="w-4 h-4 flex-shrink-0" style={{ color: alert.color }} strokeWidth={2} />
            <span className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: alert.color }}>{alert.label}</span>
          </div>
          <span className="rounded-full border border-white/8 bg-white/[0.05] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">{TYPE_LABEL[step.type]}</span>
        </div>
      </div>

      <div className="space-y-5 px-5 py-5">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {hasReviewed && <span className="rounded-full border border-amber-400/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-200">Revisado</span>}
            {hasConfirmed && <span className="rounded-full border border-green-400/20 bg-green-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-green-200">Confirmado</span>}
            <span className="rounded-full border border-white/8 bg-white/[0.05] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">{TYPE_LABEL[step.type]}</span>
          </div>
          <h2 className="text-2xl font-bold text-white leading-tight">{step.title}</h2>
          <p className="mt-3 text-sm md:text-[15px] text-slate-400 leading-relaxed max-w-3xl">{step.description}</p>
        </div>

        {step.type === 'checklist' && step.checklistItems?.length ? (
          <div className="space-y-3">
            <div className="rounded-[22px] border border-amber-400/18 bg-amber-500/[0.08] px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-amber-300 font-bold">Checkpoint de segurança</p>
              <p className="mt-1 text-xs text-amber-100/85">Conclua os itens antes de avançar para reduzir omissão de passo crítico.</p>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
              <span>{checkedCount} / {totalItems} concluídos</span>
              {checkedCount === totalItems && totalItems > 0 && <span className="text-green-400">Completo</span>}
            </div>
            <div className="grid gap-2.5">
              {step.checklistItems.map((item, i) => {
                const done = checkedItems.has(i);
                return (
                  <button
                    key={`${step.id}-ck-${i}`}
                    type="button"
                    onClick={() => onToggleCheck(i)}
                    className="flex w-full items-start gap-3 rounded-[22px] border px-4 py-3.5 text-left transition-all duration-150 ease-out hover:bg-white/[0.05]"
                    style={{
                      background: done ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.03)',
                      borderColor: done ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.08)',
                    }}
                  >
                    {done ? <CheckCircle2 className="w-4.5 h-4.5 text-green-400 mt-0.5" strokeWidth={2.4} /> : <Circle className="w-4.5 h-4.5 text-slate-600 mt-0.5" strokeWidth={1.5} />}
                    <span className={`text-sm leading-snug ${done ? 'text-slate-500 line-through' : 'text-slate-100'}`}>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="rounded-[26px] border border-white/8 bg-[#08111d]/82 p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Ações do passo</p>
            <span className="text-[11px] font-semibold text-slate-500">sem troca de contexto</span>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
          {step.type === 'drug' && step.drugId && (
            <button
              type="button"
              onClick={onOpenDrug}
              data-testid={`ps-step-drug-${step.drugId}`}
              aria-label={`${drugLabel ?? step.drugId} abrir sheet`}
              className="inline-flex items-center justify-center gap-2 rounded-[22px] border border-amber-400/22 bg-amber-500/10 px-4 py-3.5 text-sm font-semibold text-amber-100 transition-all duration-150 ease-out hover:bg-amber-500/14"
            >
              <Pill className="w-4 h-4" strokeWidth={2} />
              Abrir {drugLabel ?? step.drugId}
            </button>
          )}

          {step.type === 'timer' && (
            <button
              type="button"
              onClick={onOpenTimer}
              className="inline-flex items-center justify-center gap-2 rounded-[22px] border border-rose-400/20 bg-rose-500/10 px-4 py-3.5 text-sm font-semibold text-rose-100 transition-all duration-150 ease-out hover:bg-rose-500/14"
            >
              <Timer className="w-4 h-4" strokeWidth={2} />
              Abrir timer
            </button>
          )}

          {step.type === 'score' && step.scoreId && (
            <Link
              href={`/ps/escalas?score=${step.scoreId}`}
              className="inline-flex items-center justify-center gap-2 rounded-[22px] border border-cyan-400/20 bg-cyan-400/10 px-4 py-3.5 text-sm font-semibold text-cyan-100 transition-all duration-150 ease-out hover:bg-cyan-400/14"
            >
              <Search className="w-4 h-4" strokeWidth={2} />
              Abrir score
            </Link>
          )}
        </div>
        </div>

        {step.notes?.length ? (
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500 font-bold">
              <BookOpen className="w-3.5 h-3.5" strokeWidth={2} />
              Notas clínicas
            </div>
            <div className="space-y-2">
              {step.notes.map((note) => (
                <div key={note} className="rounded-[18px] border border-white/7 bg-white/[0.025] px-3 py-2.5">
                  <p className="text-xs text-slate-400 leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {step.type === 'decision' && step.options?.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {step.options.map((opt, i) => (
              <button
                key={`${step.id}-opt-${i}`}
                type="button"
                onClick={() => onSelectOption(opt.nextStepId)}
                className="rounded-[24px] border border-white/8 bg-white/[0.035] px-4 py-4 text-left transition-all duration-150 ease-out hover:bg-white/[0.05] hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-white">{opt.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" strokeWidth={2} />
                </div>
                {opt.condition && <p className="mt-2 text-xs text-slate-500 leading-snug">{opt.condition}</p>}
              </button>
            ))}
          </div>
        ) : step.type !== 'decision' ? (
          <button
            type="button"
            onClick={onAdvance}
            disabled={isLastStep}
            className="flex w-full items-center justify-center gap-2 rounded-[28px] px-4 py-4 text-sm font-bold transition-all duration-150 ease-out shadow-[0_18px_40px_rgba(0,0,0,0.16)]"
            style={isLastStep
              ? { background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80' }
              : { background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.22)', color: '#cffafe' }}
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
    </section>
  );
}
