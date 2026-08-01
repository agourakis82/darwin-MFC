import type { Medicamento } from '@/lib/types/medicamento';
import type { MedicationEditorialOverlayV1 } from '@/lib/medication-safety/identity-types';

/**
 * Supabase is an editorial overlay only. It cannot replace identity,
 * presentations, formulary status, interactions, contraindications, or any
 * other bundled clinical field.
 */
export function toMedicationEditorialOverlay(
  remoteMedication: Medicamento,
): MedicationEditorialOverlayV1 {
  return {
    schemaVersion: 'darwin.medication-editorial-overlay.v1',
    legacyId: remoteMedication.id,
    commercialNames: remoteMedication.nomesComerciais ?? [],
    editorialTags: remoteMedication.tags ?? [],
    reviewedAt: remoteMedication.lastUpdate,
    source: 'supabase',
  };
}

export function applyMedicationEditorialOverlay(
  localMedication: Medicamento,
  overlay: MedicationEditorialOverlayV1,
): Medicamento {
  if (overlay.legacyId !== localMedication.id) {
    throw new Error('medication-editorial-overlay-identity-mismatch');
  }
  return {
    ...localMedication,
    nomesComerciais: [...new Set([
      ...(localMedication.nomesComerciais ?? []),
      ...(overlay.commercialNames ?? []),
    ])],
    tags: [...new Set([
      ...(localMedication.tags ?? []),
      ...(overlay.editorialTags ?? []),
    ])],
  };
}

export function getUnknownMedicationCandidateIds(
  localMedicamentos: Medicamento[],
  remoteMedicamentos: Medicamento[],
): string[] {
  const knownIds = new Set(localMedicamentos.map(medication => medication.id));
  return remoteMedicamentos
    .filter(medication => !knownIds.has(medication.id))
    .map(medication => medication.id)
    .sort();
}

export function mergeMedicamentoCatalogs(
  localMedicamentos: Medicamento[],
  remoteMedicamentos: Medicamento[]
): Medicamento[] {
  const medicamentosById = new Map(
    localMedicamentos.map((medicamento) => [medicamento.id, medicamento])
  );

  for (const medicamento of remoteMedicamentos) {
    const localMedication = medicamentosById.get(medicamento.id);
    if (!localMedication) continue;
    medicamentosById.set(
      medicamento.id,
      applyMedicationEditorialOverlay(localMedication, toMedicationEditorialOverlay(medicamento)),
    );
  }

  return Array.from(medicamentosById.values()).sort((a, b) =>
    a.nomeGenerico.localeCompare(b.nomeGenerico, 'pt-BR', { sensitivity: 'base' })
  );
}
