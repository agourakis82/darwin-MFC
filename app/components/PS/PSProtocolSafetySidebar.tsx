'use client';

import { Shield } from 'lucide-react';
import PSPCRRoleBoard from '@/app/components/PS/PSPCRRoleBoard';
import PSStopPointCard from '@/app/components/PS/PSStopPointCard';
import PSTimelinePanel from '@/app/components/PS/PSTimelinePanel';
import type { ActiveCaseSession, CaseRoleSlot } from '@/lib/store/psStore';
import type { ProtocolRoleDefinition, StopPointData, TimelineEventItem } from '@/lib/ps/contracts';

interface PSProtocolSafetySidebarProps {
  protocolId: string;
  currentStepId: string;
  activeCaseSession: ActiveCaseSession | null;
  pcrRoleDefinitions: ProtocolRoleDefinition[];
  pcrPausePoints: string[];
  stopPoint: StopPointData | null;
  timelineEvents: TimelineEventItem[];
  onEditRole: (role: ProtocolRoleDefinition) => void;
  onStopPointContinue: () => void;
}

export default function PSProtocolSafetySidebar({
  protocolId,
  currentStepId,
  activeCaseSession,
  pcrRoleDefinitions,
  pcrPausePoints,
  stopPoint,
  timelineEvents,
  onEditRole,
  onStopPointContinue,
}: PSProtocolSafetySidebarProps) {
  return (
    <div className="space-y-4">
      {protocolId === 'pcr' && (
        <PSPCRRoleBoard
          activeCaseSession={activeCaseSession}
          roles={pcrRoleDefinitions}
          onEditRole={onEditRole}
        />
      )}

      {protocolId === 'pcr' && pcrPausePoints.length > 0 && (
        <div
          className="rounded-3xl px-4 py-4 space-y-3"
          style={{ background: 'rgba(239,68,68,0.08)', border: '0.5px solid rgba(239,68,68,0.16)' }}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-rose-300" strokeWidth={2} />
            <p className="text-[11px] text-rose-200 font-bold uppercase tracking-wider">PCR pause points</p>
          </div>
          <div className="space-y-2">
            {pcrPausePoints.map((point) => (
              <div key={`${currentStepId}-${point}`} className="rounded-xl px-3 py-3 bg-black/10 border border-white/8">
                <p className="text-xs text-rose-50/90 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <p className="text-[11px] text-slate-600 font-semibold uppercase tracking-widest px-0.5">
          Checkpoint de segurança
        </p>
        {stopPoint ? (
          <PSStopPointCard
            title={stopPoint.title}
            description={stopPoint.description}
            items={stopPoint.items}
            actionLabel={stopPoint.actionLabel ?? 'Marcar checkpoint como revisado'}
            onContinue={onStopPointContinue}
          />
        ) : (
          <div
            className="rounded-3xl px-4 py-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-xs font-semibold text-slate-300">Sem checkpoint formal neste passo</p>
            <p className="text-xs text-slate-500 mt-1">Awareness e timeline seguem ativos sem bloqueio extra.</p>
          </div>
        )}
      </div>

      <PSTimelinePanel events={timelineEvents} />
    </div>
  );
}
