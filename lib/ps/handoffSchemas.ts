import type { ActiveCaseSession } from '@/lib/store/psStore';
import type { HandoffSchemaName, StructuredHandoffField } from '@/lib/ps/contracts';

export interface StructuredHandoffPayload {
  schema_version: string;
  schema_name: HandoffSchemaName;
  workflow: string;
  severity: string;
  protocol: string;
  current_step: string;
  reviewed: string;
  confirmed: string;
  completed: string;
  pending: string;
  timeline: string;
  next_focus: string;
  [key: string]: string;
}

interface BuildHandoffInput {
  protocolId: string;
  protocolName: string;
  currentStepTitle: string;
  illnessSeverity: ActiveCaseSession['illnessSeverity'] | 'n/a';
  reviewedLabels: string[];
  confirmedLabels: string[];
  completedLabels: string[];
  pendingActions: string[];
  eventLines: string[];
  assignedRoleSummary?: string;
}

export function getHandoffFormatLabel(protocolId: string) {
  if (protocolId === 'pcr') return 'PCR / pós-ROSC institucional';
  if (protocolId === 'sepse') return 'Sepse / choque institucional';
  if (protocolId === 'iot') return 'IOT / RSI institucional';
  return 'Handoff agudo estruturado';
}

export function toStructuredHandoffFields(payload: StructuredHandoffPayload): StructuredHandoffField[] {
  return Object.entries(payload).map(([label, value]) => ({ label, value: String(value) }));
}

export function buildStructuredHandoffPayload(input: BuildHandoffInput): StructuredHandoffPayload {
  const base: StructuredHandoffPayload = {
    schema_version: 'ps.v1',
    schema_name: 'handoff_general',
    workflow: input.protocolId,
    severity: input.illnessSeverity,
    protocol: input.protocolName,
    current_step: input.currentStepTitle,
    reviewed: input.reviewedLabels.join('; ') || 'none',
    confirmed: input.confirmedLabels.join('; ') || 'none',
    completed: input.completedLabels.join('; ') || 'none',
    pending: input.pendingActions.join('; ') || 'none',
    timeline: input.eventLines.join(' | ') || 'none',
    next_focus: input.currentStepTitle,
  };

  if (input.protocolId === 'pcr') {
    return {
      ...base,
      schema_name: 'handoff_pcr',
      team_roles: input.assignedRoleSummary || 'none',
      next_focus: input.currentStepTitle.includes('ROSC')
        ? 'hemodinamica_ventilacao_neuroprotecao'
        : 'compressao_ritmo_drogas',
      post_rosc: input.currentStepTitle.includes('ROSC') ? 'yes' : 'no',
    };
  }

  if (input.protocolId === 'sepse') {
    return {
      ...base,
      schema_name: 'handoff_sepse_choque',
      antibiotic_status: input.completedLabels.some((label) => label.toLowerCase().includes('antibiótico'))
        ? 'completed'
        : 'pending',
      vasopressor_status: input.confirmedLabels.some((label) => label.toLowerCase().includes('norad'))
        ? 'running'
        : 'not_confirmed',
      next_focus: input.confirmedLabels.some((label) => label.toLowerCase().includes('norad'))
        ? 'titulacao_e_perfusao'
        : 'bundle_e_antibiotico',
    };
  }

  if (input.protocolId === 'iot') {
    return {
      ...base,
      schema_name: 'handoff_iot_rsi',
      airway_status: input.completedLabels.some((label) => label.toLowerCase().includes('intubação'))
        ? 'tube_placed'
        : 'not_yet_intubated',
      induction_status: input.confirmedLabels.some(
        (label) => label.toLowerCase().includes('etomidato') || label.toLowerCase().includes('fentanil')
      )
        ? 'drugs_reviewed'
        : 'pending',
      next_focus: input.completedLabels.some((label) => label.toLowerCase().includes('intubação'))
        ? 'confirmacao_e_sedacao'
        : 'setup_e_backup',
    };
  }

  return base;
}

export function buildClinicalHandoffText(input: BuildHandoffInput): string {
  const headlineEvents = [...input.confirmedLabels, ...input.completedLabels].slice(0, 4);
  const commonLines = [
    `GRAVIDADE: ${input.illnessSeverity.toUpperCase()}`,
    `PASSO ATUAL: ${input.currentStepTitle}`,
    `AÇÕES FORTES: ${headlineEvents.join(', ') || 'sem eventos fortes registrados'}`,
    `REVISADO: ${input.reviewedLabels.slice(0, 3).join(', ') || 'sem revisões registradas'}`,
    `PENDÊNCIAS: ${input.pendingActions.join(', ') || 'sem pendências'}`,
    `TIMELINE: ${input.eventLines.slice(0, 4).join(' | ') || 'sem eventos recentes'}`,
  ];

  if (input.protocolId === 'pcr') {
    return [
      'FORMATO: PCR / PÓS-ROSC',
      ...commonLines,
      `PRÓXIMO FOCO: ${input.currentStepTitle.includes('ROSC') ? 'hemodinâmica, ventilação e neuroproteção' : 'compressões, ritmo e drogas do ACLS'}`,
    ].join('\n');
  }

  if (input.protocolId === 'sepse') {
    return [
      'FORMATO: SEPSE / CHOQUE',
      ...commonLines,
      `PRÓXIMO FOCO: ${input.confirmedLabels.some((label) => label.toLowerCase().includes('norad')) ? 'titular vasoativo e reavaliar perfusão' : 'bundle, volume e antibiótico'}`,
    ].join('\n');
  }

  if (input.protocolId === 'iot') {
    return [
      'FORMATO: IOT / RSI',
      ...commonLines,
      `PRÓXIMO FOCO: ${input.completedLabels.some((label) => label.toLowerCase().includes('intubação')) ? 'confirmar tubo e sedação pós-IOT' : 'setup, drogas e via aérea de resgate'}`,
    ].join('\n');
  }

  return [`FORMATO: GERAL`, `PROTOCOLO: ${input.protocolName}`, ...commonLines].join('\n');
}

export function buildNoteHandoffText(input: BuildHandoffInput): string {
  return [
    `${input.protocolName} | gravidade ${input.illnessSeverity}`,
    `Passo atual: ${input.currentStepTitle}`,
    `Revisado: ${input.reviewedLabels.join(', ') || 'nenhum'}`,
    `Confirmado: ${input.confirmedLabels.join(', ') || 'nenhum'}`,
    `Concluído: ${input.completedLabels.join(', ') || 'nenhum'}`,
    `Pendências: ${input.pendingActions.join(', ') || 'nenhuma'}`,
  ].join('\n');
}
