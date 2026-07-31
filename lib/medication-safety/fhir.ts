import type { StructuredPrescriptionDraftV2 } from './types';

export interface FhirR4MedicationRequestDraft {
  resourceType: 'MedicationRequest';
  id: string;
  meta: {
    profile: string[];
    tag: Array<{ system: string; code: string; display: string }>;
  };
  status: 'draft';
  intent: 'proposal';
  medicationCodeableConcept: {
    coding: Array<{ system: string; code: string; display: string }>;
    text: string;
  };
  subject: { reference: string };
  authoredOn: string;
  reasonCode: Array<{ coding: Array<{ system: string; code: string }>; text: string }>;
  dosageInstruction: Array<{
    text: string;
    route: { text: string };
    doseAndRate?: Array<{
      type: { text: string };
      doseQuantity: { value: number; unit: string; system: string; code: string };
    }>;
  }>;
  instantiatesUri: string[];
  note: Array<{ text: string }>;
}

function stableDraftId(prescription: StructuredPrescriptionDraftV2): string {
  return [
    prescription.medicationId,
    prescription.indicationId,
    prescription.presentationId,
  ].join('-').replace(/[^a-zA-Z0-9-.]/g, '-').slice(0, 64);
}

export function toFhirMedicationRequestDraft(
  prescription: StructuredPrescriptionDraftV2,
  subjectReference = 'Patient/anonymous',
): FhirR4MedicationRequestDraft {
  if (prescription.verificationStatus !== 'professionally-confirmed') {
    throw new Error('FHIR export requires an explicitly confirmed structured draft.');
  }
  if (prescription.safetyResult.disposition !== 'READY_FOR_CONFIRMATION') {
    throw new Error('FHIR export refuses medication drafts that did not pass the safety kernel.');
  }
  if (!prescription.professionalConfirmation) {
    throw new Error('FHIR export requires a professional confirmation receipt.');
  }

  const doseMicrogram = prescription.safetyResult.calculatedDoseMicrogram;
  return {
    resourceType: 'MedicationRequest',
    id: stableDraftId(prescription),
    meta: {
      profile: ['http://hl7.org/fhir/StructureDefinition/MedicationRequest'],
      tag: [{
        system: 'https://darwin-mfc.local/fhir/tags',
        code: 'non-authoritative-draft',
        display: 'Rascunho clinico nao autoritativo',
      }],
    },
    status: 'draft',
    intent: 'proposal',
    medicationCodeableConcept: {
      coding: [{
        system: 'https://darwin-mfc.local/medications',
        code: prescription.medicationId,
        display: prescription.medicamento,
      }],
      text: prescription.medicamento,
    },
    subject: { reference: subjectReference },
    authoredOn: prescription.professionalConfirmation.confirmedAt,
    reasonCode: [{
      coding: [{
        system: 'https://darwin-mfc.local/indications',
        code: prescription.indicationId,
      }],
      text: prescription.indicationId,
    }],
    dosageInstruction: [{
      text: prescription.posologia,
      route: { text: prescription.route },
      doseAndRate: doseMicrogram === null ? undefined : [{
        type: { text: 'Dose calculada pelo kernel Sounio e confirmada profissionalmente' },
        doseQuantity: {
          value: doseMicrogram,
          unit: 'microgram',
          system: 'http://unitsofmeasure.org',
          code: 'ug',
        },
      }],
    }],
    instantiatesUri: prescription.safetyResult.sourceIds,
    note: [{
      text: 'Rascunho de interoperabilidade. Nao representa prescricao legal ativa nem dispensa assinatura profissional valida.',
    }],
  };
}
