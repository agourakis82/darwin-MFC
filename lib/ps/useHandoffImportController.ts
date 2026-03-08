'use client';

import { useMemo } from 'react';
import type { HandoffImportPreview } from '@/lib/ps/handoffImportValidation';
import { parseAndValidateExternalHandoffEnvelope } from '@/lib/ps/handoffImportValidation';

interface UseHandoffImportControllerInput {
  draft: string;
  inferredWorkflow: 'pcr' | 'sepse_choque' | 'iot_rsi' | null;
  onImportEnvelope: (serialized: string) => void;
}

interface HandoffImportController {
  preview: HandoffImportPreview | null;
  validationError: string | null;
  submitImport: (serialized: string) => string | null;
}

function resolveImportedWorkflow(workflow: string) {
  if (workflow === 'pcr') return 'pcr';
  if (workflow === 'sepse' || workflow === 'sepse_choque') return 'sepse_choque';
  if (workflow === 'iot' || workflow === 'iot_rsi') return 'iot_rsi';
  return null;
}

export function useHandoffImportController({
  draft,
  inferredWorkflow,
  onImportEnvelope,
}: UseHandoffImportControllerInput): HandoffImportController {
  const parsed = useMemo(
    () => parseAndValidateExternalHandoffEnvelope(draft),
    [draft]
  );

  return {
    preview: parsed.preview,
    validationError: parsed.error,
    submitImport: (serialized: string) => {
      const result = parseAndValidateExternalHandoffEnvelope(serialized);
      if (result.error || !result.envelope) {
        return result.error;
      }

      const importedWorkflow = resolveImportedWorkflow(result.envelope.payload.workflow);

      if (!importedWorkflow || importedWorkflow !== inferredWorkflow) {
        return 'Handoff incompatível com o workflow atual.';
      }

      onImportEnvelope(serialized);
      return null;
    },
  };
}
