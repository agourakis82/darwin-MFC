import type { SupabaseClient } from '@supabase/supabase-js';
import type { MedicationEditorialOverlayV2 } from '@/lib/medication-safety/review-types';

type ReviewClient = SupabaseClient<any>;

export async function getMedicationEditorialOverlaysV2(
  rawClient: SupabaseClient<any>,
  legacyIds?: string[],
): Promise<MedicationEditorialOverlayV2[]> {
  const client = rawClient as ReviewClient;
  let query = client.from('medication_editorial_overlays_v2').select('*');
  if (legacyIds?.length) query = query.in('legacy_id', legacyIds);
  const { data, error } = await query;
  if (error || !data) return [];
  return data.map(row => ({
    schemaVersion: 'darwin.medication-editorial-overlay.v2',
    legacyId: row.legacy_id,
    commercialAliases: row.commercial_aliases ?? [],
    searchSynonyms: row.search_synonyms ?? [],
    editorialSummary: row.editorial_summary ?? undefined,
    patientCounselingNotes: row.patient_counseling_notes ?? [],
    editorialReferences: row.editorial_references ?? [],
    translations: row.translations ?? {},
    consensusReceiptDigest: row.consensus_receipt_digest,
    source: 'supabase',
  }));
}
