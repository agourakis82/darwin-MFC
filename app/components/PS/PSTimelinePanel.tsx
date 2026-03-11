'use client';

interface TimelineEventItem {
  id: string;
  time: string;
  label: string;
  stateLabel: string;
  stateClassName: string;
  isCurrentStep: boolean;
}

interface PSTimelinePanelProps {
  events: TimelineEventItem[];
}

export default function PSTimelinePanel({ events }: PSTimelinePanelProps) {
  return (
    <div className="rounded-[24px] border border-white/8 bg-white/[0.025] px-4 py-4 space-y-3 md:px-5">
      <div className="flex items-center justify-between gap-2">
        <p className="ps-app-label">Timeline de segurança</p>
        <span className="ps-app-pill font-mono">{events.length} eventos</span>
      </div>

      <div className="space-y-2">
        {events.length > 0 ? events.map((event) => (
          <div
            key={event.id}
            className="apple-transition-fast rounded-[16px] px-3 py-3"
            style={{
              background: event.isCurrentStep
                ? 'rgba(255,255,255,0.055)'
                : 'rgba(255,255,255,0.03)',
              border: event.isCurrentStep ? '0.5px solid rgba(255,255,255,0.12)' : '0.5px solid rgba(255,255,255,0.07)',
              boxShadow: 'none',
            }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full" style={{ background: event.isCurrentStep ? 'rgba(255,255,255,0.75)' : 'rgba(148,163,184,0.5)' }} />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-white font-medium leading-snug">{event.label}</p>
                <p className="text-[11px] text-slate-500 mt-1">{event.time}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${event.stateClassName}`}>
                {event.stateLabel}
              </span>
            </div>
          </div>
        )) : (
          <div className="rounded-[16px] border border-white/7 bg-white/[0.03] px-3 py-3">
            <p className="text-xs text-slate-500">Sem eventos de segurança registrados neste caso.</p>
          </div>
        )}
      </div>
    </div>
  );
}
