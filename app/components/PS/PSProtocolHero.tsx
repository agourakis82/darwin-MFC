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
  return (
    <section className="space-y-4">
      <div className="rounded-[32px] border p-5 md:p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]" style={{ background: `linear-gradient(135deg, ${protocolColor}14 0%, rgba(6,11,19,0.96) 52%, rgba(7,17,31,1) 100%)`, borderColor: `${protocolColor}22` }}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4" style={{ color: protocolColor }} strokeWidth={2} />
              <span className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: protocolColor }}>{protocol.category}</span>
            </div>
            <h1 className="text-2xl md:text-[32px] font-bold text-white leading-tight">{protocol.name}</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-400 leading-relaxed">{protocol.description}</p>
          </div>

          <div className="grid min-w-[220px] grid-cols-2 gap-2 text-sm">
            <div className="rounded-2xl border border-white/7 bg-white/[0.04] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Etapa</p>
              <p className="mt-1 font-semibold text-white">{stepIndex + 1}/{totalSteps}</p>
            </div>
            <div className="rounded-2xl border border-white/7 bg-white/[0.04] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Progressão</p>
              <p className="mt-1 font-semibold text-white">{progress}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-white/8 bg-white/[0.035] p-4 md:p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
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

        <div className="mt-4 flex flex-wrap gap-2">
          {protocol.steps.map((step, index) => {
            const isDone = visitedIds.includes(step.id) || index < stepIndex;
            const isCurrent = step.id === currentStepId;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onSelectStep(step.id)}
                className={`rounded-full border px-3 py-2 text-xs font-semibold transition-all duration-150 ease-out ${isCurrent ? 'text-white' : 'text-slate-400 hover:text-white hover:-translate-y-0.5'}`}
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
        </div>
      </div>
    </section>
  );
}
