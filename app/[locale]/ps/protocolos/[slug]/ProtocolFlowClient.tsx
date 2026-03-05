'use client';

import { useState, useCallback } from 'react';
import {
  CheckCircle2, Circle, ChevronRight, Pill, Search, Timer, ArrowLeft,
  AlertTriangle, Info, Siren, BookOpen, Beaker, Activity,
} from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';
import type { EmergencyProtocol, EmergencyProtocolStep } from '@/lib/ps/types';
import { getDrugById } from '@/lib/ps/data';

interface RelatedScore { id: string; name: string }
interface ProtocolFlowClientProps { protocol: EmergencyProtocol; relatedScores: RelatedScore[] }

function resolveDrugName(drugId: string) {
  return getDrugById(drugId)?.genericName ?? drugId;
}

// ─── Pill badge for step type / alert level ───────────────────────────────────

const ALERT_META: Record<string, { label: string; icon: React.ElementType; color: string; bg: string; border: string }> = {
  critical: { label: 'CRÍTICO',  icon: Siren,          color: '#f87171', bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.30)' },
  warning:  { label: 'ATENÇÃO',  icon: AlertTriangle,  color: '#fbbf24', bg: 'rgba(245,158,11,0.10)',  border: 'rgba(245,158,11,0.25)' },
  info:     { label: 'INFO',     icon: Info,           color: '#60a5fa', bg: 'rgba(59,130,246,0.10)',  border: 'rgba(59,130,246,0.25)' },
  safe:     { label: 'SEGURO',   icon: CheckCircle2,   color: '#4ade80', bg: 'rgba(34,197,94,0.10)',   border: 'rgba(34,197,94,0.25)' },
};

const TYPE_LABEL: Record<string, string> = {
  action: 'Ação', decision: 'Decisão', drug: 'Droga', timer: 'Timer',
  checklist: 'Checklist', score: 'Score',
};

// ─── Individual step card ─────────────────────────────────────────────────────

function StepCard({
  step, isActive, isComplete, onClick,
}: {
  step: EmergencyProtocolStep;
  isActive: boolean;
  isComplete: boolean;
  onClick: () => void;
}) {
  const alert = ALERT_META[step.alertLevel ?? 'info'] ?? ALERT_META.info;
  const AlertIcon = alert.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left transition-all duration-200 active:scale-[0.99]"
    >
      <div
        className="rounded-2xl overflow-hidden transition-all duration-200"
        style={{
          background: isActive
            ? 'rgba(255,255,255,0.06)'
            : isComplete
              ? 'rgba(34,197,94,0.04)'
              : 'rgba(255,255,255,0.025)',
          border: isActive
            ? `1px solid ${alert.border}`
            : isComplete
              ? '0.5px solid rgba(34,197,94,0.20)'
              : '0.5px solid rgba(255,255,255,0.06)',
          boxShadow: isActive ? `0 0 0 1px ${alert.border}` : 'none',
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Step status circle */}
          <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full"
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

          <div className="flex-1 min-w-0">
            <p className={`text-[13px] font-semibold leading-snug ${isActive ? 'text-white' : isComplete ? 'text-slate-400' : 'text-slate-300'}`}>
              {step.title}
            </p>
            <p className="text-[11px] text-slate-600 mt-0.5">{TYPE_LABEL[step.type] ?? step.type}</p>
          </div>

          {isActive && (
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: alert.color }} />
          )}
        </div>
      </div>
    </button>
  );
}

// ─── Active step detail panel ─────────────────────────────────────────────────

function ActiveStepDetail({
  step, isLastStep, checkedItems, onToggleCheck, onAdvance, onSelectOption, onOpenTimer,
}: {
  step: EmergencyProtocolStep;
  isLastStep: boolean;
  checkedItems: Set<number>;
  onToggleCheck: (i: number) => void;
  onAdvance: () => void;
  onSelectOption: (nextId: string) => void;
  onOpenTimer: () => void;
}) {
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
      {/* Header band */}
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
        {/* Title */}
        <div>
          <h2 className="text-[17px] font-bold text-white leading-tight">{step.title}</h2>
          <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{step.description}</p>
        </div>

        {/* Checklist items */}
        {step.type === 'checklist' && step.checklistItems?.length ? (
          <div className="space-y-1.5">
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

        {/* Drug CTA */}
        {step.type === 'drug' && step.drugId && (
          <Link
            href={`/ps/drogas/${step.drugId}`}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold active:scale-95 transition-transform"
            style={{ background: 'rgba(245,158,11,0.12)', border: '0.5px solid rgba(245,158,11,0.30)', color: '#fcd34d' }}
          >
            <Pill className="w-4 h-4" strokeWidth={2} />
            {resolveDrugName(step.drugId)}
            <span className="text-amber-400/60 text-xs ml-auto">→ doses e diluição</span>
          </Link>
        )}

        {/* Timer CTA */}
        {step.type === 'timer' && (
          <button
            type="button"
            onClick={onOpenTimer}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold active:scale-95 transition-transform"
            style={{ background: 'rgba(239,68,68,0.12)', border: '0.5px solid rgba(239,68,68,0.30)', color: '#fca5a5' }}
          >
            <Timer className="w-4 h-4" strokeWidth={2} />
            Abrir Timer PCR
          </button>
        )}

        {/* Score CTA */}
        {step.type === 'score' && step.scoreId && (
          <Link
            href={`/ps/escalas?score=${step.scoreId}`}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold active:scale-95 transition-transform"
            style={{ background: 'rgba(34,211,238,0.10)', border: '0.5px solid rgba(34,211,238,0.25)', color: '#67e8f9' }}
          >
            <Search className="w-4 h-4" strokeWidth={2} />
            Calcular score
          </Link>
        )}

        {/* Notes */}
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

        {/* Decision options */}
        {step.type === 'decision' && step.options?.length ? (
          <div className="space-y-2">
            {step.options.map((opt, i) => (
              <button
                key={`${step.id}-opt-${i}`}
                type="button"
                onClick={() => onSelectOption(opt.nextStepId)}
                className="w-full text-left px-4 py-3.5 rounded-xl transition-all active:scale-[0.98] duration-100"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '0.5px solid rgba(255,255,255,0.12)',
                }}
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

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ProtocolFlowClient({ protocol, relatedScores }: ProtocolFlowClientProps) {
  const firstStep = protocol.steps[0];
  const router = useRouter();
  const [currentStepId, setCurrentStepId] = useState(firstStep?.id ?? null);
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [checked, setChecked] = useState<Record<string, Set<number>>>({});

  if (!firstStep) return <div className="text-slate-400 p-8">Protocolo sem passos.</div>;

  const currentStep = protocol.steps.find((s) => s.id === currentStepId) ?? firstStep;
  const stepIndex = protocol.steps.findIndex((s) => s.id === currentStep.id);
  const totalSteps = protocol.steps.length;
  const progress = Math.round(((stepIndex + 1) / Math.max(totalSteps, 1)) * 100);
  const nextStepId = currentStep.nextStepId ?? protocol.steps[stepIndex + 1]?.id;
  const isLastStep = stepIndex === totalSteps - 1 || !nextStepId;
  const checklistState = checked[currentStep.id] ?? new Set<number>();

  const goTo = useCallback((id: string) => {
    setVisitedIds((prev) => [...prev.filter((v) => v !== currentStepId), currentStepId]);
    setCurrentStepId(id);
  }, [currentStepId]);

  const goBack = useCallback(() => {
    if (visitedIds.length > 0) {
      const prev = visitedIds[visitedIds.length - 1];
      setVisitedIds((ids) => ids.slice(0, -1));
      setCurrentStepId(prev);
    }
  }, [visitedIds]);

  const toggleCheck = useCallback((index: number) => {
    setChecked((prev) => {
      const current = new Set(prev[currentStep.id] ?? []);
      if (current.has(index)) current.delete(index); else current.add(index);
      return { ...prev, [currentStep.id]: current };
    });
  }, [currentStep.id]);

  const protocolColor = protocol.color ?? '#ef4444';
  const alertBorder = currentStep.alertLevel === 'critical'
    ? 'rgba(239,68,68,0.4)'
    : currentStep.alertLevel === 'warning'
      ? 'rgba(245,158,11,0.3)'
      : 'rgba(59,130,246,0.25)';

  return (
    <div className="min-h-screen text-white" style={{ background: '#080810' }}>
      <div
        className="max-w-3xl mx-auto px-3 pt-3 pb-28 md:pb-10 space-y-4"
        style={{ fontFamily: '-apple-system, "SF Pro Display", BlinkMacSystemFont, system-ui, sans-serif' }}
      >

        {/* ── Protocol header ── */}
        <div
          className="rounded-2xl px-4 py-4"
          style={{
            background: `linear-gradient(135deg, ${protocolColor}18 0%, rgba(8,8,16,0) 60%)`,
            border: `0.5px solid ${protocolColor}30`,
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 flex-shrink-0" style={{ color: protocolColor }} strokeWidth={2} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: protocolColor }}>
                  {protocol.category}
                </span>
              </div>
              <h1 className="text-xl font-bold text-white leading-tight">{protocol.name}</h1>
              <p className="text-[12px] text-slate-400 mt-1.5 leading-relaxed line-clamp-2">{protocol.description}</p>
            </div>
          </div>
        </div>

        {/* ── Progress capsule ── */}
        <div
          className="rounded-2xl px-4 py-3"
          style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2.5">
            <span>Passo {stepIndex + 1} de {totalSteps}</span>
            <span className="font-mono" style={{ color: protocolColor }}>{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${protocolColor} 0%, ${protocolColor}99 100%)` }}
            />
          </div>
          {/* Mini step dots */}
          <div className="flex items-center gap-1 mt-2.5 flex-wrap">
            {protocol.steps.map((s, i) => {
              const isDone = visitedIds.includes(s.id) || i < stepIndex;
              const isCurrent = s.id === currentStepId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentStepId(s.id)}
                  className="h-1.5 rounded-full transition-all duration-200 flex-shrink-0"
                  style={{
                    width: isCurrent ? 20 : 6,
                    background: isCurrent ? protocolColor : isDone ? `${protocolColor}60` : 'rgba(255,255,255,0.12)',
                  }}
                  title={s.title}
                />
              );
            })}
          </div>
        </div>

        {/* ── Back button ── */}
        {visitedIds.length > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-400 hover:text-white active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Voltar
          </button>
        )}

        {/* ── Active step detail ── */}
        <ActiveStepDetail
          step={currentStep}
          isLastStep={isLastStep}
          checkedItems={checklistState}
          onToggleCheck={toggleCheck}
          onAdvance={() => nextStepId && goTo(nextStepId)}
          onSelectOption={(id) => goTo(id)}
          onOpenTimer={() => router.push('/ps/timer')}
        />

        {/* ── Step navigator (accordion) ── */}
        <div className="space-y-1.5">
          <p className="text-[11px] text-slate-600 font-semibold uppercase tracking-widest px-0.5 mb-2">
            Todos os passos
          </p>
          {protocol.steps.map((s) => {
            const isActive = s.id === currentStepId;
            const isComplete = visitedIds.includes(s.id);
            return (
              <StepCard
                key={s.id}
                step={s}
                isActive={isActive}
                isComplete={isComplete}
                onClick={() => setCurrentStepId(s.id)}
              />
            );
          })}
        </div>

        {/* ── Related scores ── */}
        {relatedScores.length > 0 && (
          <div
            className="rounded-2xl px-4 py-4 space-y-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center gap-2">
              <Beaker className="w-3.5 h-3.5 text-cyan-500" strokeWidth={2} />
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scores Relacionados</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {relatedScores.map((score) => (
                <Link
                  key={score.id}
                  href={`/ps/escalas?score=${score.id}`}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-transform"
                  style={{ background: 'rgba(34,211,238,0.10)', border: '0.5px solid rgba(34,211,238,0.25)', color: '#67e8f9' }}
                >
                  {score.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Related drugs ── */}
        {protocol.relatedDrugs.length > 0 && (
          <div
            className="rounded-2xl px-4 py-4 space-y-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center gap-2">
              <Pill className="w-3.5 h-3.5 text-amber-500" strokeWidth={2} />
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Drogas Relacionadas</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {protocol.relatedDrugs.slice(0, 8).map((drugId) => (
                <Link
                  key={drugId}
                  href={`/ps/drogas/${drugId}`}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-transform"
                  style={{ background: 'rgba(245,158,11,0.10)', border: '0.5px solid rgba(245,158,11,0.25)', color: '#fcd34d' }}
                >
                  {resolveDrugName(drugId)}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── References ── */}
        {protocol.references.length > 0 && (
          <div
            className="rounded-2xl px-4 py-4 space-y-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-slate-500" strokeWidth={2} />
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Referências</p>
            </div>
            <ol className="space-y-2.5">
              {protocol.references.map((ref, i) => (
                <li key={`${protocol.id}-ref-${i}`} className="flex gap-2.5">
                  <span className="text-[11px] text-slate-600 font-mono mt-0.5 flex-shrink-0">[{i + 1}]</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-slate-400 leading-relaxed">{ref.citation}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-slate-600">{ref.year}</span>
                      {ref.guideline && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                          style={{ background: 'rgba(245,158,11,0.12)', color: '#fbbf24' }}
                        >
                          {ref.guideline}
                        </span>
                      )}
                      {ref.pmid && (
                        <span className="text-[10px] text-slate-600 font-mono">PMID {ref.pmid}</span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* ── Back to protocols ── */}
        <Link
          href="/ps/protocolos"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold active:scale-[0.98] transition-transform"
          style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.10)', color: '#94a3b8' }}
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          Voltar aos Protocolos
        </Link>

      </div>
    </div>
  );
}
