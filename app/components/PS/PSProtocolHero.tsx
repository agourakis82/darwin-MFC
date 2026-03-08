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
    <div className="space-y-3">
      <div
        className="rounded-3xl px-5 py-5 md:px-6"
        style={{
          background: `linear-gradient(135deg, ${protocolColor}18 0%, rgba(8,8,16,0) 60%)`,
          border: `0.5px solid ${protocolColor}30`,
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 flex-shrink-0" style={{ color: protocolColor }} strokeWidth={2} />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: protocolColor }}>
                {protocol.category}
              </span>
            </div>
            <h1 className="text-[22px] md:text-2xl font-bold text-white leading-tight">{protocol.name}</h1>
            <p className="text-[13px] text-slate-400 mt-2 leading-relaxed max-w-3xl">{protocol.description}</p>
          </div>
        </div>
      </div>

      <div
        className="rounded-3xl px-5 py-4 md:px-6"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.03) 100%)',
          border: '0.5px solid rgba(255,255,255,0.08)',
          boxShadow: '0 10px 24px rgba(0,0,0,0.14)',
        }}
      >
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2.5">
          <span>Etapa {stepIndex + 1} de {totalSteps}</span>
          <span className="font-mono" style={{ color: protocolColor }}>{progress}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${protocolColor} 0%, ${protocolColor}99 100%)` }}
          />
        </div>
        <div className="flex items-center gap-1 mt-2.5 flex-wrap">
          {protocol.steps.map((step, index) => {
            const isDone = visitedIds.includes(step.id) || index < stepIndex;
            const isCurrent = step.id === currentStepId;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onSelectStep(step.id)}
                className="h-1.5 rounded-full transition-all duration-200 flex-shrink-0"
                style={{
                  width: isCurrent ? 20 : 6,
                  background: isCurrent ? protocolColor : isDone ? `${protocolColor}60` : 'rgba(255,255,255,0.12)',
                }}
                title={step.title}
              />
            );
          })}
        </div>
      </div>

      {visitedIds.length > 0 && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-400 hover:text-white active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          Voltar
        </button>
      )}
    </div>
  );
}
