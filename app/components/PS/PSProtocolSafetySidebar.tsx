'use client';

import { Shield } from 'lucide-react';
import PSPCRRoleBoard from '@/app/components/PS/PSPCRRoleBoard';
import PSStopPointCard from '@/app/components/PS/PSStopPointCard';
import PSTimelinePanel from '@/app/components/PS/PSTimelinePanel';
import type { ActiveCaseSession } from '@/lib/store/psStore';
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
    <aside className="space-y-4 xl:sticky xl:top-24">
      <div className="rounded-[30px] border border-white/10 bg-[#08111d]/86 p-4">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
          <Shield className="h-3.5 w-3.5 text-cyan-300" strokeWidth={2} />
          Safety column
        </div>
        <div className="rounded-[24px] border border-white/8 bg-white/[0.04] px-4 py-4">
          <p className="ps-app-kicker">Monitorar agora</p>
          <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">{protocolId.toUpperCase()}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-[18px] border border-white/7 bg-white/[0.035] p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Etapa</p>
              <p className="mt-1 truncate font-semibold text-white">{currentStepId}</p>
            </div>
            <div className="rounded-[18px] border border-white/7 bg-white/[0.035] p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Eventos</p>
              <p className="mt-1 font-semibold text-white">{timelineEvents.length}</p>
            </div>
          </div>
        </div>
      </div>

      {protocolId === 'pcr' && (
        <PSPCRRoleBoard
          activeCaseSession={activeCaseSession}
          roles={pcrRoleDefinitions}
          onEditRole={onEditRole}
        />
      )}

      {protocolId === 'pcr' && pcrPausePoints.length > 0 && (
        <div className="rounded-[28px] border border-rose-500/16 bg-rose-500/[0.07] p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-rose-300" strokeWidth={2} />
            <p className="text-[11px] text-rose-200 font-bold uppercase tracking-wider">PCR pause points</p>
          </div>
          <div className="space-y-2">
            {pcrPausePoints.map((point) => (
              <div key={`${currentStepId}-${point}`} className="rounded-[18px] border border-white/8 bg-black/10 px-3 py-3">
                <p className="text-xs text-rose-50/90 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {stopPoint ? (
        <PSStopPointCard
          title={stopPoint.title}
          description={stopPoint.description}
          items={stopPoint.items}
          actionLabel={stopPoint.actionLabel ?? 'Marcar checkpoint como revisado'}
          onContinue={onStopPointContinue}
        />
      ) : (
        <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-4">
          <p className="text-xs font-semibold text-slate-300">Checkpoint de segurança</p>
          <p className="mt-1 text-xs text-slate-500">A timeline e a coordenação seguem ativas sem bloqueio extra.</p>
        </div>
      )}

      <PSTimelinePanel events={timelineEvents} />
    </aside>
  );
}
