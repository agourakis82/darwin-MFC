import type { MedicationEnvelopeDisposition } from './types';

export interface MedicationEnvelopeTelemetryEventV1 {
  schemaVersion: 'darwin.medication-envelope-telemetry.v1';
  artifactId: string;
  disposition: MedicationEnvelopeDisposition;
  constraintCodes: string[];
  elapsedMilliseconds: number;
  decisionCategory: 'accepted' | 'acknowledged-review' | 'saved-legacy-unverified' | 'abandoned';
  occurredAt: string;
  patientContextPersisted: false;
  proposedValuesPersisted: false;
}

export function createMedicationEnvelopeTelemetryEvent(input: Omit<
  MedicationEnvelopeTelemetryEventV1,
  'schemaVersion' | 'patientContextPersisted' | 'proposedValuesPersisted'
>): MedicationEnvelopeTelemetryEventV1 {
  if (!input.artifactId || input.elapsedMilliseconds < 0 || !Number.isFinite(input.elapsedMilliseconds)) {
    throw new Error('invalid-envelope-telemetry');
  }
  return {
    schemaVersion: 'darwin.medication-envelope-telemetry.v1',
    artifactId: input.artifactId,
    disposition: input.disposition,
    constraintCodes: [...new Set(input.constraintCodes)].sort(),
    elapsedMilliseconds: Math.round(input.elapsedMilliseconds),
    decisionCategory: input.decisionCategory,
    occurredAt: input.occurredAt,
    patientContextPersisted: false,
    proposedValuesPersisted: false,
  };
}
