import type { ActiveCaseSession, SentinelWorkflow, StructuredHandoffField } from '@/lib/ps/contracts';
import type { StructuredHandoffPayload } from '@/lib/ps/handoffSchemas';

export interface ExternalHandoffEnvelope {
  adapter_version: 'ps.integration.v1';
  source: 'darwin-ps';
  exported_at: string;
  schema_name: StructuredHandoffPayload['schema_name'];
  schema_version: StructuredHandoffPayload['schema_version'];
  payload: StructuredHandoffPayload;
  fields: StructuredHandoffField[];
}

export function buildExternalHandoffEnvelope(
  payload: StructuredHandoffPayload,
  fields: StructuredHandoffField[]
): ExternalHandoffEnvelope {
  return {
    adapter_version: 'ps.integration.v1',
    source: 'darwin-ps',
    exported_at: new Date().toISOString(),
    schema_name: payload.schema_name,
    schema_version: payload.schema_version,
    payload,
    fields,
  };
}

export function serializeExternalHandoffEnvelope(
  payload: StructuredHandoffPayload,
  fields: StructuredHandoffField[]
) {
  return JSON.stringify(buildExternalHandoffEnvelope(payload, fields), null, 2);
}

export function parseExternalHandoffEnvelope(serialized: string): ExternalHandoffEnvelope {
  return JSON.parse(serialized) as ExternalHandoffEnvelope;
}

function resolveWorkflow(workflow: string): SentinelWorkflow {
  if (workflow === 'pcr') return 'pcr';
  if (workflow === 'sepse' || workflow === 'sepse_choque') return 'sepse_choque';
  if (workflow === 'iot' || workflow === 'iot_rsi') return 'iot_rsi';
  return 'pcr';
}

export function importExternalHandoffToCaseSession(envelope: ExternalHandoffEnvelope): ActiveCaseSession {
  const now = Date.now();

  return {
    id: `imported_${now}`,
    workflow: resolveWorkflow(envelope.payload.workflow),
    protocolId: envelope.payload.workflow || envelope.payload.protocol || null,
    startedAt: now,
    updatedAt: now,
    illnessSeverity: (envelope.payload.severity as ActiveCaseSession['illnessSeverity']) || 'unknown',
    activeStepId: null,
    pendingActionLabels: envelope.payload.pending && envelope.payload.pending !== 'none'
      ? envelope.payload.pending.split('; ').filter(Boolean)
      : [],
    roleAssignments: {},
    events: [
      {
        id: `evt_import_${now}`,
        kind: 'handoff_generated',
        state: 'completed',
        at: now,
        label: `Handoff importado: ${envelope.payload.protocol}`,
        meta: {
          source: envelope.source,
          schema_name: envelope.schema_name,
          schema_version: envelope.schema_version,
          exported_at: envelope.exported_at,
          fields: envelope.fields,
        },
      },
    ],
  };
}
