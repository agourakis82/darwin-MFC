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
    <div
      className="rounded-2xl px-4 py-4 space-y-3"
      style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Timeline de segurança</p>
        <span className="text-[11px] text-slate-600 font-mono">{events.length} eventos</span>
      </div>

      <div className="space-y-2">
        {events.length > 0 ? events.map((event) => (
          <div
            key={event.id}
            className="rounded-xl px-3 py-3"
            style={{
              background: event.isCurrentStep ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
              border: event.isCurrentStep ? '0.5px solid rgba(255,255,255,0.14)' : '0.5px solid rgba(255,255,255,0.07)',
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
          <div className="rounded-xl px-3 py-3 bg-white/5 border border-white/7">
            <p className="text-xs text-slate-500">Sem eventos de segurança registrados neste caso.</p>
          </div>
        )}
      </div>
    </div>
  );
}
