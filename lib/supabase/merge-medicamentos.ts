import type { Medicamento } from '@/lib/types/medicamento';

/**
 * Keep the bundled clinical catalog available when Supabase is only partially
 * populated. Remote rows take precedence for matching IDs.
 */
export function mergeMedicamentoCatalogs(
  localMedicamentos: Medicamento[],
  remoteMedicamentos: Medicamento[]
): Medicamento[] {
  const medicamentosById = new Map(
    localMedicamentos.map((medicamento) => [medicamento.id, medicamento])
  );

  for (const medicamento of remoteMedicamentos) {
    medicamentosById.set(medicamento.id, medicamento);
  }

  return Array.from(medicamentosById.values()).sort((a, b) =>
    a.nomeGenerico.localeCompare(b.nomeGenerico, 'pt-BR', { sensitivity: 'base' })
  );
}
