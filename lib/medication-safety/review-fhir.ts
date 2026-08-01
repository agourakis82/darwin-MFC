import type {
  MedicationReviewConsensusV1,
  MedicationReviewDecisionV1,
  MedicationReviewTaskV1,
} from './review-types';

const STATUS_MAP: Record<MedicationReviewTaskV1['status'], string> = {
  OPEN: 'requested',
  CLAIMED: 'accepted',
  IN_REVIEW: 'in-progress',
  AWAITING_SECOND_REVIEW: 'in-progress',
  CONSENSUS: 'completed',
  DISPUTED: 'on-hold',
  ADJUDICATION: 'in-progress',
  CLOSED: 'completed',
  SUPERSEDED: 'cancelled',
};

export function toFhirMedicationReviewTask(task: MedicationReviewTaskV1) {
  return {
    resourceType: 'Task' as const,
    id: task.id,
    identifier: [
      { system: 'https://darwin-mfc.org/rx/review-task', value: task.id },
      { system: 'https://darwin-mfc.org/rx/target-digest', value: task.targetDigest },
    ],
    status: STATUS_MAP[task.status],
    intent: 'proposal',
    priority: task.risk === 'critical' ? 'stat' : task.risk === 'high' ? 'urgent' : 'routine',
    code: {
      coding: [{ system: 'https://darwin-mfc.org/codes/rx-review', code: task.category }],
      text: task.title,
    },
    description: task.summary,
    restriction: {
      repetitions: task.requiredReviewerRoles.length,
      performerType: task.requiredReviewerRoles.map(role => ({
        coding: [{ system: 'https://darwin-mfc.org/codes/reviewer-role', code: role }],
      })),
    },
    input: [
      { type: { text: 'identityBundleSha256' }, valueString: task.bundleSha256 },
      { type: { text: 'targetDigest' }, valueString: task.targetDigest },
    ],
  };
}

export function toFhirMedicationReviewProvenance(
  task: MedicationReviewTaskV1,
  decisions: MedicationReviewDecisionV1[],
  consensus: MedicationReviewConsensusV1,
) {
  return {
    resourceType: 'Provenance' as const,
    target: [{ reference: `Task/${task.id}` }],
    recorded: consensus.reachedAt,
    reason: [{ text: consensus.result }],
    agent: decisions.map(decision => ({
      type: { text: decision.reviewerRole },
      who: { reference: `Practitioner/${decision.reviewerId}` },
      onBehalfOf: { display: 'Darwin Rx independent review' },
    })),
    entity: [
      { role: 'source', what: { identifier: { value: task.bundleSha256 } } },
      { role: 'revision', what: { identifier: { value: consensus.receiptDigest } } },
    ],
  };
}

export function toFhirMedicationReviewAuditEvent(input: {
  taskId: string;
  actorId: string;
  eventType: string;
  recordedAt: string;
  eventDigest: string;
}) {
  return {
    resourceType: 'AuditEvent' as const,
    type: {
      system: 'https://darwin-mfc.org/codes/rx-review-event',
      code: input.eventType,
      display: input.eventType,
    },
    recorded: input.recordedAt,
    outcome: '0',
    agent: [{ requestor: true, who: { reference: `Practitioner/${input.actorId}` } }],
    source: { observer: { display: 'Darwin Rx Evidence Review Studio' } },
    entity: [{
      what: { reference: `Task/${input.taskId}` },
      detail: [{ type: 'eventDigest', valueString: input.eventDigest }],
    }],
  };
}
