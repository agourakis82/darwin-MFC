import type { CaseEvent, TimelineEventItem } from '@/lib/ps/contracts';

const EVENT_STATE_META: Record<string, { label: string; className: string }> = {
  consulted: { label: 'Consultado', className: 'text-sky-200 border-sky-400/20 bg-sky-500/10' },
  computed: { label: 'Revisado', className: 'text-amber-200 border-amber-400/20 bg-amber-500/10' },
  confirmed: { label: 'Confirmado', className: 'text-green-200 border-green-400/20 bg-green-500/10' },
  completed: { label: 'Concluído', className: 'text-violet-200 border-violet-400/20 bg-violet-500/10' },
};

function uniq(values: string[]) {
  return [...new Set(values)];
}

export function getConfirmedLabels(events: CaseEvent[]) {
  return uniq(events.filter((event) => event.state === 'confirmed').map((event) => event.label));
}

export function getCompletedLabels(events: CaseEvent[]) {
  return uniq(events.filter((event) => event.kind === 'step_completed').map((event) => event.label));
}

export function getReviewedLabels(events: CaseEvent[]) {
  return uniq(
    events
      .filter((event) => event.state === 'computed' || event.meta?.action === 'reviewed')
      .map((event) => event.label)
  );
}

export function getReviewedStepIds(events: CaseEvent[]) {
  return new Set(
    events
      .filter((event) => event.state === 'computed' || event.meta?.action === 'reviewed')
      .map((event) => event.meta?.stepId)
      .filter((stepId): stepId is string => typeof stepId === 'string')
  );
}

export function getConfirmedStepIds(events: CaseEvent[]) {
  return new Set(
    events
      .filter((event) => event.state === 'confirmed')
      .map((event) => event.meta?.stepId)
      .filter((stepId): stepId is string => typeof stepId === 'string')
  );
}

export function getEventLines(events: CaseEvent[]) {
  return [...events]
    .slice(-8)
    .reverse()
    .map((event) => {
      const time = new Date(event.at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      return `${time} • ${EVENT_STATE_META[event.state]?.label ?? event.state} • ${event.label}`;
    });
}

export function getTimelineEvents(events: CaseEvent[], currentStepId: string): TimelineEventItem[] {
  return [...events]
    .slice(-6)
    .reverse()
    .map((event) => ({
      id: `${event.at}-${event.label}`,
      time: new Date(event.at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      label: event.label,
      stateLabel: EVENT_STATE_META[event.state]?.label ?? event.state,
      stateClassName: EVENT_STATE_META[event.state]?.className ?? 'text-slate-200 border-white/10 bg-white/5',
      isCurrentStep: event.meta?.stepId === currentStepId,
    }));
}
