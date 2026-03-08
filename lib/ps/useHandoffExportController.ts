'use client';

import { useMemo } from 'react';
import type { ActiveCaseSession } from '@/lib/ps/contracts';
import {
  buildClinicalHandoffText,
  buildNoteHandoffText,
  buildStructuredHandoffPayload,
  getHandoffFormatLabel,
  toStructuredHandoffFields,
} from '@/lib/ps/handoffSchemas';
import { serializeExternalHandoffEnvelope } from '@/lib/ps/handoffIntegrationAdapter';

interface UseHandoffExportControllerInput {
  protocolId: string;
  protocolName: string;
  currentStepTitle: string;
  activeCaseSession: ActiveCaseSession | null;
  reviewedLabels: string[];
  confirmedLabels: string[];
  completedLabels: string[];
  pendingActions: string[];
  eventLines: string[];
  assignedRoleSummary: string;
}

export function useHandoffExportController({
  protocolId,
  protocolName,
  currentStepTitle,
  activeCaseSession,
  reviewedLabels,
  confirmedLabels,
  completedLabels,
  pendingActions,
  eventLines,
  assignedRoleSummary,
}: UseHandoffExportControllerInput) {
  const structuredHandoffPayload = useMemo(
    () => buildStructuredHandoffPayload({
      protocolId,
      protocolName,
      currentStepTitle,
      illnessSeverity: activeCaseSession?.illnessSeverity ?? 'n/a',
      reviewedLabels,
      confirmedLabels,
      completedLabels,
      pendingActions,
      eventLines,
      assignedRoleSummary,
    }),
    [
      activeCaseSession?.illnessSeverity,
      assignedRoleSummary,
      completedLabels,
      confirmedLabels,
      currentStepTitle,
      eventLines,
      pendingActions,
      protocolId,
      protocolName,
      reviewedLabels,
    ]
  );

  const structuredHandoffFields = useMemo(
    () => toStructuredHandoffFields(structuredHandoffPayload),
    [structuredHandoffPayload]
  );

  const structuredHandoffCopyText = useMemo(
    () => serializeExternalHandoffEnvelope(structuredHandoffPayload, structuredHandoffFields),
    [structuredHandoffFields, structuredHandoffPayload]
  );

  const handoffSummary = useMemo(
    () => activeCaseSession
      ? buildClinicalHandoffText({
          protocolId,
          protocolName,
          currentStepTitle,
          illnessSeverity: activeCaseSession.illnessSeverity,
          reviewedLabels,
          confirmedLabels,
          completedLabels,
          pendingActions,
          eventLines,
          assignedRoleSummary,
        })
      : '',
    [
      activeCaseSession,
      assignedRoleSummary,
      completedLabels,
      confirmedLabels,
      currentStepTitle,
      eventLines,
      pendingActions,
      protocolId,
      protocolName,
      reviewedLabels,
    ]
  );

  const noteHandoffCopyText = useMemo(
    () => buildNoteHandoffText({
      protocolId,
      protocolName,
      currentStepTitle,
      illnessSeverity: activeCaseSession?.illnessSeverity ?? 'n/a',
      reviewedLabels,
      confirmedLabels,
      completedLabels,
      pendingActions,
      eventLines,
      assignedRoleSummary,
    }),
    [
      activeCaseSession?.illnessSeverity,
      assignedRoleSummary,
      completedLabels,
      confirmedLabels,
      currentStepTitle,
      eventLines,
      pendingActions,
      protocolId,
      protocolName,
      reviewedLabels,
    ]
  );

  return {
    handoffSummary,
    structuredHandoffFields,
    structuredHandoffCopyText,
    noteHandoffCopyText,
    handoffFormatLabel: getHandoffFormatLabel(protocolId),
  };
}
