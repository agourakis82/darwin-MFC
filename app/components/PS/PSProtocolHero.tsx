'use client';

import { Activity, ArrowLeft } from 'lucide-react';
import type { EmergencyProtocol } from '@/lib/ps/types';

interface PSProtocolHeroProps {
  protocol: EmergencyProtocol;
  protocolColor: string;
  stepIndex: number;
  totalSteps: number;
  progress: number;
  currentStepId: string | null;
  visitedIds: string[];
  onSelectStep: (stepId: string) => void;
  onBack: () => void;
}

export default function PSProtocolHero({
  protocol,
  protocolColor,
  stepIndex,
  totalSteps,
  progress,
  currentStepId,
  visitedIds,
  onSelectStep,
  onBack,
}: PSProtocolHeroProps) {
  const compactSteps = protocol.steps.slice(0, 10);

  return (
    <section className="space-y-4">
      <div className="rounded-[34px] border p-5 md:p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]" style={{ background: `linear-gradient(135deg, ${protocolColor}12 0%, rgba(6,11,19,0.96) 52%, rgba(7,17,31,1) 100%)`, borderColor: `${protocolColor}20` }}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4" style={{ color: protocolColor }} strokeWidth={2} />
              <span className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: protocolColor }}>{protocol.category}</span>
            </div>
            <h1 className="text-[2rem] font-bold leading-tight tracking-[-0.05em] text-white md:text-[2.5rem]">{protocol.name}</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-400 leading-relaxed">{protocol.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="ps-app-pill">step {stepIndex + 1} / {totalSteps}</span>
              <span className="ps-app-pill">{progress}%</span>
              {currentStepId && <span className="ps-app-pill">{currentStepId}</span>}
            </div>
          </div>

          <div className="min-w-[220px] rounded-[26px] border border-white/8 bg-white/[0.04] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <p className="ps-app-kicker">Protocol state</p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Etapa</p>
                <p className="mt-1 text-xl font-semibold text-white">{stepIndex + 1}/{totalSteps}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Progressão</p>
                <p className="mt-1 text-xl font-semibold text-white">{progress}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-white/8 bg-[#08111d]/82 p-4 md:p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
        <div className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold text-slate-400">
          <span>Fluxo do protocolo</span>
          {visitedIds.length > 0 && (
            <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-slate-400 transition-colors hover:text-white">
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              Voltar
            </button>
          )}
        </div>

        <div className="h-1.5 rounded-full overflow-hidden bg-white/[0.06]">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${protocolColor} 0%, ${protocolColor}CC 100%)` }} />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {compactSteps.map((step, index) => {
            const isDone = visitedIds.includes(step.id) || index < stepIndex;
            const isCurrent = step.id === currentStepId;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onSelectStep(step.id)}
                className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition-all duration-150 ease-out ${isCurrent ? 'text-white' : 'text-slate-400 hover:text-white hover:-translate-y-0.5'}`}
                style={{
                  borderColor: isCurrent ? `${protocolColor}55` : 'rgba(255,255,255,0.08)',
                  background: isCurrent ? `${protocolColor}22` : isDone ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
                }}
                title={step.title}
              >
                {index + 1}. {step.title}
              </button>
            );
          })}
          {protocol.steps.length > compactSteps.length && (
            <span className="shrink-0 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-slate-500">
              +{protocol.steps.length - compactSteps.length} passos
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
