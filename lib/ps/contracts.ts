export type WeightSource = 'verified' | 'estimated' | 'ideal' | 'unknown';
export type SentinelWorkflow = 'pcr' | 'sepse_choque' | 'iot_rsi';
export type CaseEventState = 'consulted' | 'computed' | 'completed' | 'confirmed';
export type CaseRoleSlot = 'leader' | 'compressor' | 'airway' | 'meds_monitor';
export type CaseEventKind =
  | 'protocol_started'
  | 'step_completed'
  | 'branch_selected'
  | 'drug_opened'
  | 'score_calculated'
  | 'calculator_used'
  | 'timer_started'
  | 'timer_stopped'
  | 'note_added'
  | 'handoff_generated';

export interface CaseRoleAssignment {
  assigned: boolean;
  label: string | null;
  updatedAt: number;
}

export interface CaseEvent {
  id: string;
  kind: CaseEventKind;
  state: CaseEventState;
  at: number;
  label: string;
  meta?: Record<string, unknown>;
}

export type IllnessSeverity = 'critical' | 'high' | 'moderate' | 'unknown';

export interface ActiveCaseSession {
  id: string;
  workflow: SentinelWorkflow;
  protocolId: string | null;
  startedAt: number;
  updatedAt: number;
  illnessSeverity: IllnessSeverity;
  activeStepId: string | null;
  pendingActionLabels: string[];
  roleAssignments: Partial<Record<CaseRoleSlot, CaseRoleAssignment>>;
  events: CaseEvent[];
}

export interface PatientContext {
  weight: number | null;
  verifiedWeightKg: number | null;
  estimatedWeightKg: number | null;
  weightSource: WeightSource;
  weightMeasuredAt: number | null;
  useIdealWeight: boolean;
  idealWeight: number | null;
  height: number | null;
  sex: 'M' | 'F' | null;
}

export interface RelatedScore {
  id: string;
  name: string;
}

export interface ProtocolRoleDefinition {
  id: CaseRoleSlot;
  role: string;
  focus: string;
}

export interface StopPointData {
  title: string;
  description: string;
  items: string[];
  actionLabel?: string;
}

export interface TimelineEventItem {
  id: string;
  time: string;
  label: string;
  stateLabel: string;
  stateClassName: string;
  isCurrentStep: boolean;
}

export type HandoffSchemaName =
  | 'handoff_pcr'
  | 'handoff_sepse_choque'
  | 'handoff_iot_rsi'
  | 'handoff_general';

export interface StructuredHandoffField {
  label: string;
  value: string;
}
