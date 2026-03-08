import type { StructuredHandoffField } from '@/lib/ps/contracts';
import type { ExternalHandoffEnvelope } from '@/lib/ps/handoffIntegrationAdapter';
import { parseExternalHandoffEnvelope } from '@/lib/ps/handoffIntegrationAdapter';

export interface HandoffImportPreview {
  schemaName: string;
  workflow: string;
  protocol: string;
  severity: string;
  currentStep: string;
  pending: string[];
  fields: StructuredHandoffField[];
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function extractPreview(envelope: ExternalHandoffEnvelope): HandoffImportPreview {
  return {
    schemaName: envelope.schema_name,
    workflow: envelope.payload.workflow,
    protocol: envelope.payload.protocol,
    severity: envelope.payload.severity,
    currentStep: envelope.payload.current_step,
    pending: envelope.payload.pending && envelope.payload.pending !== 'none'
      ? envelope.payload.pending.split('; ').filter(Boolean)
      : [],
    fields: envelope.fields,
  };
}

export function parseAndValidateExternalHandoffEnvelope(serialized: string):
  | { envelope: ExternalHandoffEnvelope; preview: HandoffImportPreview; error: null }
  | { envelope: null; preview: null; error: string } {
  if (!serialized.trim()) {
    return { envelope: null, preview: null, error: 'Cole um envelope de handoff para continuar.' };
  }

  let envelope: ExternalHandoffEnvelope;
  try {
    envelope = parseExternalHandoffEnvelope(serialized);
  } catch {
    return { envelope: null, preview: null, error: 'Envelope de handoff inválido.' };
  }

  if (envelope.adapter_version !== 'ps.integration.v1') {
    return { envelope: null, preview: null, error: 'adapter_version incompatível.' };
  }

  if (envelope.source !== 'darwin-ps') {
    return { envelope: null, preview: null, error: 'source incompatível para import.' };
  }

  if (!isObject(envelope.payload)) {
    return { envelope: null, preview: null, error: 'payload ausente no envelope.' };
  }

  if (!Array.isArray(envelope.fields)) {
    return { envelope: null, preview: null, error: 'fields inválidos no envelope.' };
  }

  if (!envelope.payload.workflow || !envelope.payload.protocol || !envelope.payload.current_step) {
    return { envelope: null, preview: null, error: 'Campos obrigatórios do payload estão ausentes.' };
  }

  if (envelope.schema_name !== envelope.payload.schema_name) {
    return { envelope: null, preview: null, error: 'schema_name divergente entre envelope e payload.' };
  }

  return { envelope, preview: extractPreview(envelope), error: null };
}
