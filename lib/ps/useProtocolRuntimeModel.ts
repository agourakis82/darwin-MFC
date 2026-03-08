'use client';

import { useMemo } from 'react';
import type { ActiveCaseSession, ProtocolRoleDefinition } from '@/lib/ps/contracts';
import type { EmergencyProtocol } from '@/lib/ps/types';
import {
  getCompletedLabels,
  getConfirmedLabels,
  getConfirmedStepIds,
  getEventLines,
  getReviewedLabels,
  getReviewedStepIds,
  getTimelineEvents,
} from '@/lib/ps/protocolRuntime';

function getPCRPausePoints(stepId: string) {
  if (stepId === 'pcr-1' || stepId === 'pcr-2') {
    return [
      'Quem está liderando o ciclo atual?',
      'Ritmo, compressor e cronômetro estão sincronizados?',
      'As drogas do próximo ciclo já estão prontas?',
    ];
  }

  if (stepId === 'pcr-3a' || stepId === 'pcr-4') {
    return [
      'A pausa pré-choque ficou abaixo de 5 segundos?',
      'A próxima energia e a próxima droga estão definidas?',
      'Alguém está monitorando ETCO2 e qualidade da RCP?',
    ];
  }

  if (stepId === 'pcr-5' || stepId === 'pcr-6') {
    return [
      'PAM, ETCO2 e temperatura já têm meta explícita?',
      'Cateterismo, UTI e causa reversível já têm dono?',
      'A equipe sabe o próximo risco nas próximas 10 minutos?',
    ];
  }

  return [];
}

interface UseProtocolRuntimeModelInput {
  protocol: EmergencyProtocol;
  currentStep: EmergencyProtocol['steps'][number];
  activeCaseSession: ActiveCaseSession | null;
  pendingActions: string[];
  pcrRoleDefinitions: ProtocolRoleDefinition[];
}

export function useProtocolRuntimeModel({
  protocol,
  currentStep,
  activeCaseSession,
  pendingActions,
  pcrRoleDefinitions,
}: UseProtocolRuntimeModelInput) {
  const confirmedLabels = useMemo(
    () => activeCaseSession ? getConfirmedLabels(activeCaseSession.events) : [],
    [activeCaseSession]
  );
  const completedLabels = useMemo(
    () => activeCaseSession ? getCompletedLabels(activeCaseSession.events) : [],
    [activeCaseSession]
  );
  const reviewedLabels = useMemo(
    () => activeCaseSession ? getReviewedLabels(activeCaseSession.events) : [],
    [activeCaseSession]
  );
  const reviewedStepIds = useMemo(
    () => activeCaseSession ? getReviewedStepIds(activeCaseSession.events) : new Set<string>(),
    [activeCaseSession]
  );
  const confirmedStepIds = useMemo(
    () => activeCaseSession ? getConfirmedStepIds(activeCaseSession.events) : new Set<string>(),
    [activeCaseSession]
  );
  const assignedRoleSummary = useMemo(
    () => pcrRoleDefinitions
      .map((item) => `${item.role}: ${activeCaseSession?.roleAssignments[item.id]?.label ?? 'livre'}`)
      .join('; '),
    [activeCaseSession?.roleAssignments, pcrRoleDefinitions]
  );
  const eventLines = useMemo(
    () => activeCaseSession ? getEventLines(activeCaseSession.events) : [],
    [activeCaseSession]
  );
  const timelineEvents = useMemo(
    () => activeCaseSession ? getTimelineEvents(activeCaseSession.events, currentStep.id) : [],
    [activeCaseSession, currentStep.id]
  );
  const statusChips = useMemo(
    () => [
      { label: 'Revisado', value: reviewedLabels.length, tone: 'rgba(245,158,11,0.14)', border: 'rgba(245,158,11,0.24)', color: '#fde68a' },
      { label: 'Confirmado', value: confirmedLabels.length, tone: 'rgba(34,197,94,0.14)', border: 'rgba(34,197,94,0.24)', color: '#bbf7d0' },
      { label: 'Concluído', value: completedLabels.length, tone: 'rgba(168,85,247,0.14)', border: 'rgba(168,85,247,0.24)', color: '#e9d5ff' },
      { label: 'Pendências', value: pendingActions.length, tone: 'rgba(59,130,246,0.14)', border: 'rgba(59,130,246,0.24)', color: '#bfdbfe' },
    ],
    [completedLabels.length, confirmedLabels.length, pendingActions.length, reviewedLabels.length]
  );
  const pcrPausePoints = useMemo(
    () => protocol.id === 'pcr' ? getPCRPausePoints(currentStep.id) : [],
    [currentStep.id, protocol.id]
  );

  return {
    confirmedLabels,
    completedLabels,
    reviewedLabels,
    reviewedStepIds,
    confirmedStepIds,
    eventLines,
    timelineEvents,
    statusChips,
    pcrPausePoints,
    assignedRoleSummary,
  };
}
