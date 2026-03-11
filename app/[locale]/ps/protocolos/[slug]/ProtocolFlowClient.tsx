'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { Link, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import PSDrugSheet from '@/app/components/PS/PSDrugSheet';
import PSActiveStepDetail from '@/app/components/PS/PSActiveStepDetail';
import PSProtocolStepCard from '@/app/components/PS/PSProtocolStepCard';
import PSSituationalAwarenessPanel from '@/app/components/PS/PSSituationalAwarenessPanel';
import PSHandoffPanel from '@/app/components/PS/PSHandoffPanel';
import PSDebriefPanel from '@/app/components/PS/PSDebriefPanel';
import PSRoleAssignmentSheet from '@/app/components/PS/PSRoleAssignmentSheet';
import PSProtocolStatusChips from '@/app/components/PS/PSProtocolStatusChips';
import PSProtocolResourcesPanel from '@/app/components/PS/PSProtocolResourcesPanel';
import PSProtocolCaseActions from '@/app/components/PS/PSProtocolCaseActions';
import PSProtocolHero from '@/app/components/PS/PSProtocolHero';
import PSProtocolSafetySidebar from '@/app/components/PS/PSProtocolSafetySidebar';
import { usePSStore } from '@/lib/store/psStore';
import type { EmergencyProtocol } from '@/lib/ps/types';
import { getDrugById } from '@/lib/ps/data';
import type { RelatedScore, ProtocolRoleDefinition } from '@/lib/ps/contracts';
import { parseExternalHandoffEnvelope } from '@/lib/ps/handoffIntegrationAdapter';
import { copyProtocolText, toggleOverlayVisibility } from '@/lib/ps/protocolOverlayActions';
import {
  createBranchSelectedEvent,
  createDrugConfirmedEvent,
  createDrugConsultedEvent,
  createDrugReviewedEvent,
  createHandoffGeneratedEvent,
  createRoleUpdatedEvent,
  createStepCompletedEvent,
  createStopPointReviewedEvent,
} from '@/lib/ps/protocolCaseEvents';
import { useProtocolPresentationState } from '@/lib/ps/useProtocolPresentationState';
import { useProtocolRuntimeModel } from '@/lib/ps/useProtocolRuntimeModel';
import { useHandoffImportController } from '@/lib/ps/useHandoffImportController';
import { useHandoffExportController } from '@/lib/ps/useHandoffExportController';
interface ProtocolFlowClientProps { protocol: EmergencyProtocol; relatedScores: RelatedScore[] }

function resolveDrugName(drugId: string) {
  return getDrugById(drugId)?.genericName ?? drugId;
}

function mapProtocolToWorkflow(protocolId: string): 'pcr' | 'sepse_choque' | 'iot_rsi' | null {
  if (protocolId === 'pcr') return 'pcr';
  if (protocolId === 'sepse') return 'sepse_choque';
  if (protocolId === 'iot') return 'iot_rsi';
  return null;
}

const PCR_ROLE_DEFS: ProtocolRoleDefinition[] = [
  { id: 'leader', role: 'Líder', focus: 'ritmo, decisão e coordenação do ciclo' },
  { id: 'compressor', role: 'Compressor', focus: 'RCP de alta qualidade e troca a cada 2 min' },
  { id: 'airway', role: 'Airway', focus: 'ventilação, capnografia e oxigenação' },
  { id: 'meds_monitor', role: 'Meds/monitor', focus: 'drogas, choque e cronometria do ciclo' },
];

export default function ProtocolFlowClient({ protocol, relatedScores }: ProtocolFlowClientProps) {
  const firstStep = protocol.steps[0];
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedOpenDrugId = searchParams.get('openDrug');
  const {
    patient,
    activeCaseSession,
    startCase,
    setActiveCaseStep,
    setPendingActions,
    setCaseRole,
importExternalHandoff,
    recentTeamMembers,
    logCaseEvent,
  } = usePSStore();
  const [currentStepId, setCurrentStepId] = useState(firstStep?.id ?? null);
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [checked, setChecked] = useState<Record<string, Set<number>>>({});
  const {
    selectedDrugId,
    showHandoff,
    showDebrief,
    roleEditor,
    handoffImportDraft,
    handoffImportConfirmReplace,
    setShowHandoff,
    setShowDebrief,
    setHandoffImportDraft,
    setHandoffImportConfirmReplace,
    openDrugSheet,
    closeDrugSheet,
    openRoleEditor,
    updateRoleEditorValue,
    closeRoleEditor,
  } = useProtocolPresentationState();

  if (!firstStep) return <div className="text-slate-400 p-8">Protocolo sem passos.</div>;

  const currentStep = protocol.steps.find((s) => s.id === currentStepId) ?? firstStep;
  const stepIndex = protocol.steps.findIndex((s) => s.id === currentStep.id);
  const totalSteps = protocol.steps.length;
  const progress = Math.round(((stepIndex + 1) / Math.max(totalSteps, 1)) * 100);
  const nextStepId = currentStep.nextStepId ?? protocol.steps[stepIndex + 1]?.id;
  const nextStepTitle = protocol.steps.find((step) => step.id === nextStepId)?.title ?? null;
  const isLastStep = stepIndex === totalSteps - 1 || !nextStepId;
  const checklistState = checked[currentStep.id] ?? new Set<number>();
  const inferredWorkflow = mapProtocolToWorkflow(protocol.id);
  const stopPoint = currentStep.stopPoint ?? null;

  const pendingActions = useMemo(() => {
    if (currentStep.type === 'decision' && currentStep.options?.length) {
      return currentStep.options.slice(0, 3).map((option) => option.label);
    }
    if (currentStep.type === 'checklist' && currentStep.checklistItems?.length) {
      return currentStep.checklistItems
        .filter((_, index) => !checklistState.has(index))
        .slice(0, 4);
    }
    if (nextStepTitle) {
      return [nextStepTitle];
    }
    return [currentStep.title];
  }, [checklistState, currentStep, nextStepTitle]);

  const activeSessionForProtocol = activeCaseSession && activeCaseSession.protocolId === protocol.id ? activeCaseSession : null;

  const {
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
  } = useProtocolRuntimeModel({
    protocol,
    currentStep,
    activeCaseSession: activeSessionForProtocol,
    pendingActions,
    pcrRoleDefinitions: PCR_ROLE_DEFS,
  });
  const handoffImport = useHandoffImportController({
    draft: handoffImportDraft,
    inferredWorkflow,
    onImportEnvelope: (serialized) => {
      importExternalHandoff(parseExternalHandoffEnvelope(serialized));
    },
  });
  const handoffExport = useHandoffExportController({
    protocolId: protocol.id,
    protocolName: protocol.name,
    currentStepTitle: currentStep.title,
    activeCaseSession: activeSessionForProtocol,
    reviewedLabels,
    confirmedLabels,
    completedLabels,
    pendingActions,
    eventLines,
    assignedRoleSummary,
  });

  const goTo = useCallback((id: string) => {
    setVisitedIds((prev) => [...prev.filter((v) => v !== currentStepId), currentStepId]);
    setCurrentStepId(id);
  }, [currentStepId]);

  const goBack = useCallback(() => {
    if (visitedIds.length > 0) {
      const prev = visitedIds[visitedIds.length - 1];
      setVisitedIds((ids) => ids.slice(0, -1));
      setCurrentStepId(prev);
    }
  }, [visitedIds]);

  const toggleCheck = useCallback((index: number) => {
    setChecked((prev) => {
      const current = new Set(prev[currentStep.id] ?? []);
      if (current.has(index)) current.delete(index); else current.add(index);
      return { ...prev, [currentStep.id]: current };
    });
  }, [currentStep.id]);

  useEffect(() => {
    if (!requestedOpenDrugId) return;
    openDrugSheet(requestedOpenDrugId);
  }, [openDrugSheet, requestedOpenDrugId]);

  useEffect(() => {
    if (!inferredWorkflow) return;
    if (!activeSessionForProtocol) {
      startCase({
        workflow: inferredWorkflow,
        protocolId: protocol.id,
        illnessSeverity: inferredWorkflow === 'iot_rsi' ? 'high' : 'critical',
        pendingActionLabels: pendingActions,
      });
      return;
    }

    if (activeSessionForProtocol.activeStepId && activeSessionForProtocol.activeStepId !== currentStepId) {
      setCurrentStepId(activeSessionForProtocol.activeStepId);
    }
  }, [activeSessionForProtocol, currentStepId, inferredWorkflow, pendingActions, protocol.id, startCase]);

  useEffect(() => {
    if (!activeSessionForProtocol) return;
    setActiveCaseStep(currentStep.id);
    setPendingActions(pendingActions);
  }, [activeSessionForProtocol, currentStep.id, pendingActions, setActiveCaseStep, setPendingActions]);

  const protocolColor = protocol.color ?? '#ef4444';

  return (
    <div className="min-h-screen text-white" style={{ background: 'radial-gradient(circle at top left, rgba(34,211,238,0.10), transparent 24%), radial-gradient(circle at top right, rgba(248,113,113,0.08), transparent 22%), linear-gradient(180deg, #07111f 0%, #050b14 100%)' }}>
      <div
        className="max-w-[1480px] mx-auto px-4 md:px-6 pt-6 pb-28 md:pb-12 space-y-6"
        style={{ fontFamily: '-apple-system, "SF Pro Display", BlinkMacSystemFont, system-ui, sans-serif' }}
      >
        <PSProtocolHero
          protocol={protocol}
          protocolColor={protocolColor}
          stepIndex={stepIndex}
          totalSteps={totalSteps}
          progress={progress}
          currentStepId={currentStepId}
          visitedIds={visitedIds}
          onSelectStep={setCurrentStepId}
          onBack={goBack}
        />

        <PSProtocolStatusChips items={statusChips} />

        <div className="grid gap-6 xl:grid-cols-[228px_minmax(0,1.28fr)_308px]">
          <aside className="space-y-3 xl:sticky xl:top-24 self-start">
            <div className="rounded-[24px] border border-white/10 bg-[#08111d]/84 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Flow map</p>
                <span className="ps-app-pill">{totalSteps} passos</span>
              </div>
              <div className="space-y-2">
                {protocol.steps.map((s) => {
                  const isActive = s.id === currentStepId;
                  const isComplete = visitedIds.includes(s.id);
                  return (
                    <PSProtocolStepCard
                      key={s.id}
                      step={s}
                      isActive={isActive}
                      isComplete={isComplete}
                      hasReviewed={reviewedStepIds.has(s.id)}
                      hasConfirmed={confirmedStepIds.has(s.id)}
                      onClick={() => setCurrentStepId(s.id)}
                    />
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="space-y-4">
            <PSActiveStepDetail
              step={currentStep}
              isLastStep={isLastStep}
              hasReviewed={reviewedStepIds.has(currentStep.id)}
              hasConfirmed={confirmedStepIds.has(currentStep.id)}
              checkedItems={checklistState}
              drugLabel={currentStep.drugId ? resolveDrugName(currentStep.drugId) : null}
              onToggleCheck={toggleCheck}
              onAdvance={() => {
                logCaseEvent(createStepCompletedEvent(currentStep.title, currentStep.id, protocol.id));
                if (nextStepId) goTo(nextStepId);
              }}
              onSelectOption={(id: string) => {
                const optionLabel = currentStep.options?.find((option) => option.nextStepId === id)?.label ?? id;
                logCaseEvent(createBranchSelectedEvent(optionLabel, currentStep.id, id, protocol.id));
                goTo(id);
              }}
              onOpenTimer={() => router.push('/ps/timer')}
              onOpenDrug={() => {
                if (!currentStep.drugId) return;
                openDrugSheet(currentStep.drugId);
                logCaseEvent(createDrugConsultedEvent(
                  resolveDrugName(currentStep.drugId),
                  currentStep.drugId,
                  protocol.id,
                  currentStep.id
                ));
              }}
            />

            <PSSituationalAwarenessPanel
              activeCaseSession={activeSessionForProtocol}
              patient={patient}
              currentStepTitle={currentStep.title}
              nextStepTitle={nextStepTitle}
              pendingActions={pendingActions}
            />

            <PSProtocolResourcesPanel
              protocol={protocol}
              relatedScores={relatedScores}
              currentStepId={currentStep.id}
              onOpenDrug={(drugId) => {
                openDrugSheet(drugId);
                logCaseEvent(createDrugConsultedEvent(resolveDrugName(drugId), drugId, protocol.id, currentStep.id));
              }}
              resolveDrugName={resolveDrugName}
            />
          </div>

          <PSProtocolSafetySidebar
            protocolId={protocol.id}
            currentStepId={currentStep.id}
            activeCaseSession={activeSessionForProtocol}
            pcrRoleDefinitions={PCR_ROLE_DEFS}
            pcrPausePoints={pcrPausePoints}
            stopPoint={stopPoint}
            timelineEvents={timelineEvents}
            onEditRole={(item) => openRoleEditor({
              slot: item.id,
              role: item.role,
              value: activeSessionForProtocol?.roleAssignments[item.id]?.label ?? '',
            })}
            onStopPointContinue={() => {
              if (!stopPoint) return;
              logCaseEvent(createStopPointReviewedEvent(stopPoint.title, protocol.id, currentStep.id));
            }}
          />
        </div>

        {activeSessionForProtocol && (
          <>
            <PSProtocolCaseActions
              hasActiveCase={Boolean(activeSessionForProtocol)}
              canGoBack={visitedIds.length > 0}
              showHandoff={showHandoff}
              showDebrief={showDebrief}
              onBack={goBack}
              onToggleHandoff={() => toggleOverlayVisibility({
                isOpen: showHandoff,
                setOpen: setShowHandoff,
                onFirstOpen: () => {
                  logCaseEvent(createHandoffGeneratedEvent(protocol.id, currentStep.id));
                },
              })}
              onToggleDebrief={() => toggleOverlayVisibility({
                isOpen: showDebrief,
                setOpen: setShowDebrief,
              })}
            />

            {showHandoff && (
              <PSHandoffPanel
                activeCaseSession={activeSessionForProtocol}
                summary={handoffExport.handoffSummary}
                eventLines={eventLines}
                reviewedLabels={reviewedLabels}
                confirmedLabels={confirmedLabels}
                completedLabels={completedLabels}
                formatLabel={handoffExport.handoffFormatLabel}
                structuredFields={handoffExport.structuredHandoffFields}
                importDraft={handoffImportDraft}
                importPreview={handoffImport.preview}
                confirmReplace={handoffImportConfirmReplace}
                validationError={handoffImport.validationError}
                onImportDraftChange={setHandoffImportDraft}
                onConfirmReplaceChange={setHandoffImportConfirmReplace}
                onImportStructured={() => handoffImport.submitImport(handoffImportDraft)}
                onCopy={() => { void copyProtocolText(handoffExport.handoffSummary); }}
                onCopyStructured={() => { void copyProtocolText(handoffExport.structuredHandoffCopyText); }}
                onCopyNote={() => { void copyProtocolText(handoffExport.noteHandoffCopyText); }}
              />
            )}

            {showDebrief && (
              <PSDebriefPanel
                activeCaseSession={activeSessionForProtocol}
                confirmedLabels={confirmedLabels}
                reviewedLabels={reviewedLabels}
                completedLabels={completedLabels}
                pendingActions={pendingActions}
                eventLines={eventLines}
              />
            )}
          </>
        )}
      </div>

      <PSDrugSheet
        drugId={selectedDrugId}
        patient={patient}
        onClose={closeDrugSheet}
        onReview={(drugId) => {
          logCaseEvent(createDrugReviewedEvent(resolveDrugName(drugId), drugId, protocol.id, currentStep.id));
        }}
        onConfirm={(drugId) => {
          logCaseEvent(createDrugConfirmedEvent(resolveDrugName(drugId), drugId, protocol.id, currentStep.id));
        }}
      />

      <PSRoleAssignmentSheet
        open={Boolean(roleEditor)}
        roleLabel={roleEditor?.role ?? ''}
        value={roleEditor?.value ?? ''}
        onChange={updateRoleEditorValue}
        suggestions={recentTeamMembers}
        onSave={() => {
          if (!roleEditor) return;
          const normalized = roleEditor.value.trim();
          setCaseRole(roleEditor.slot, normalized || null);
          logCaseEvent(createRoleUpdatedEvent(roleEditor.role, protocol.id, currentStep.id, roleEditor.slot, normalized || null));
          closeRoleEditor();
        }}
        onClear={() => {
          if (!roleEditor) return;
          setCaseRole(roleEditor.slot, null);
          logCaseEvent(createRoleUpdatedEvent(roleEditor.role, protocol.id, currentStep.id, roleEditor.slot, null));
          closeRoleEditor();
        }}
        onClose={closeRoleEditor}
      />
    </div>
  );
}
