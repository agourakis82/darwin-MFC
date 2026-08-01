import type {
  MedicationEnvelopeResultV1,
  ProposedMedicationActionV1,
} from './types';

export interface ConfirmedMedicationEnvelopeDraftV1 {
  action: ProposedMedicationActionV1;
  result: MedicationEnvelopeResultV1;
  professionalConfirmation: {
    confirmedAt: string;
    confirmerId: string;
    statementVersion: 'darwin.medication-envelope-professional-confirmation.v1';
  };
}

export function toFhirEnvelopeMedicationRequestDraft(
  draft: ConfirmedMedicationEnvelopeDraftV1,
  subjectReference = 'Patient/local-context',
) {
  if (draft.result.disposition !== 'WITHIN_REVIEWED_ENVELOPE') {
    throw new Error('envelope-fhir-export-requires-within-reviewed-envelope');
  }
  if (!draft.result.integrityVerified || !draft.result.receiptSha256) {
    throw new Error('envelope-fhir-export-requires-integrity');
  }
  const id = `${draft.action.medicationConceptId}-${draft.result.artifactId}`
    .replace(/[^a-zA-Z0-9-.]/g, '-')
    .slice(0, 64);
  return {
    resourceType: 'MedicationRequest' as const,
    id,
    meta: {
      profile: ['http://hl7.org/fhir/StructureDefinition/MedicationRequest'],
      tag: [{
        system: 'https://darwin-mfc.org/fhir/tags',
        code: 'verified-envelope-draft',
        display: 'Draft checked against a delimited reviewed envelope',
      }],
    },
    status: 'draft' as const,
    intent: 'proposal' as const,
    medicationCodeableConcept: {
      coding: [{
        system: 'https://darwin-mfc.org/medication-concepts',
        code: draft.action.medicationConceptId,
      }],
    },
    subject: { reference: subjectReference },
    authoredOn: draft.professionalConfirmation.confirmedAt,
    reasonCode: draft.action.indicationId ? [{
      coding: [{ system: 'https://darwin-mfc.org/indications', code: draft.action.indicationId }],
    }] : undefined,
    dosageInstruction: [{
      route: draft.action.route ? { text: draft.action.route } : undefined,
      text: 'Structured dose remains encoded in the local proposed action; this artifact is not an active order.',
    }],
    instantiatesUri: [
      `urn:sha256:${draft.result.receiptSha256}`,
      `urn:sha256:${draft.result.graphMerkleRootSha256}`,
    ],
    note: [{
      text: 'Draft/proposal only. No treatment was selected and no substitute dose was suggested by Darwin Rx.',
    }],
  };
}
