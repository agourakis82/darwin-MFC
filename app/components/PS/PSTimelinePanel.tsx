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
    <div className="ps-app-surface rounded-[28px] px-4 py-4 space-y-3 md:px-5">
      <div className="flex items-center justify-between gap-2">
        <p className="ps-app-label">Timeline de segurança</p>
        <span className="ps-app-pill font-mono">{events.length} eventos</span>
      </div>

      <div className="space-y-2">
        {events.length > 0 ? events.map((event) => (
          <div
            key={event.id}
            className="rounded-[22px] px-3 py-3 apple-transition-fast"
            style={{
              background: event.isCurrentStep
                ? 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)'
                : 'linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.025) 100%)',
              border: event.isCurrentStep ? '0.5px solid rgba(255,255,255,0.14)' : '0.5px solid rgba(255,255,255,0.07)',
              boxShadow: event.isCurrentStep ? '0 12px 32px rgba(0,0,0,0.14)' : 'none',
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm text-white font-medium leading-snug">{event.label}</p>
                <p className="text-[11px] text-slate-500 mt-1">{event.time}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${event.stateClassName}`}>
                {event.stateLabel}
              </span>
            </div>
          </div>
        )) : (
          <div className="rounded-[22px] px-3 py-3 bg-white/[0.045] border border-white/7">
            <p className="text-xs text-slate-500">Sem eventos de segurança registrados neste caso.</p>
          </div>
        )}
      </div>
    </div>
  );
}
