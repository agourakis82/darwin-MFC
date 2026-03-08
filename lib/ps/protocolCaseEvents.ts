export function createStepCompletedEvent(stepTitle: string, stepId: string, protocolId: string) {
  return {
    kind: 'step_completed' as const,
    state: 'completed' as const,
    label: stepTitle,
    meta: { stepId, protocolId },
  };
}

export function createBranchSelectedEvent(
  optionLabel: string,
  fromStepId: string,
  nextStepId: string,
  protocolId: string
) {
  return {
    kind: 'branch_selected' as const,
    state: 'completed' as const,
    label: optionLabel,
    meta: { fromStepId, nextStepId, protocolId },
  };
}

export function createDrugConsultedEvent(drugLabel: string, drugId: string, protocolId: string, stepId: string) {
  return {
    kind: 'drug_opened' as const,
    state: 'consulted' as const,
    label: drugLabel,
    meta: { drugId, protocolId, stepId },
  };
}

export function createDrugReviewedEvent(drugLabel: string, drugId: string, protocolId: string, stepId: string) {
  return {
    kind: 'drug_opened' as const,
    state: 'computed' as const,
    label: `${drugLabel} revisado`,
    meta: { drugId, protocolId, stepId, action: 'reviewed' },
  };
}

export function createDrugConfirmedEvent(drugLabel: string, drugId: string, protocolId: string, stepId: string) {
  return {
    kind: 'drug_opened' as const,
    state: 'confirmed' as const,
    label: `${drugLabel} confirmado`,
    meta: { drugId, protocolId, stepId, action: 'confirmed_use' },
  };
}

export function createStopPointReviewedEvent(stopPointTitle: string, protocolId: string, stepId: string) {
  return {
    kind: 'step_completed' as const,
    state: 'completed' as const,
    label: `${stopPointTitle} revisado`,
    meta: { protocolId, stepId, kind: 'stop_point' },
  };
}

export function createHandoffGeneratedEvent(protocolId: string, stepId: string) {
  return {
    kind: 'handoff_generated' as const,
    state: 'completed' as const,
    label: `Handoff ${protocolId}`,
    meta: { protocolId, stepId },
  };
}

export function createRoleUpdatedEvent(roleLabel: string, protocolId: string, stepId: string, role: string, assignee?: string | null) {
  return {
    kind: 'note_added' as const,
    state: assignee ? ('confirmed' as const) : ('completed' as const),
    label: `${roleLabel} ${assignee ? `assumido por ${assignee}` : 'liberado'}`,
    meta: { protocolId, stepId, role },
  };
}
