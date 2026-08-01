import identityBundleData from '@/public/medication-safety/medication-identity-bundle.json';
import searchIndexData from '@/public/medication-safety/medication-search-index.json';
import type { Medicamento } from '@/lib/types/medicamento';
import type {
  CanonicalMedicationConceptV1,
  MedicationIdentityBundleV1,
  MedicationLegacyAliasV1,
  MedicationSearchIndexEntryV1,
} from './identity-types';

const identityBundle = identityBundleData as unknown as MedicationIdentityBundleV1;
const compactSearchIndex = (searchIndexData as unknown as {
  schemaVersion: 'darwin.medication-search-index.v1';
  entries: MedicationSearchIndexEntryV1[];
}).entries;

const conceptById = new Map(identityBundle.concepts.map(concept => [concept.id, concept]));
const aliasById = new Map(identityBundle.aliases.map(alias => [alias.id, alias]));
const searchByConceptId = new Map(compactSearchIndex.map(entry => [entry.conceptId, entry]));

export interface CanonicalMedicationIdentityView {
  conceptId: string;
  canonicalPathId: string;
  requestedId: string;
  requestedViaAlias: boolean;
  preferredName: string;
  primaryLegacyId: string;
  aliasIds: string[];
  aliases: Array<{ id: string; displayName: string; relation: MedicationLegacyAliasV1['relation'] }>;
  atcCodes: string[];
  dcbCodes: string[];
  productCount: number;
  resolvedProductCount: number;
  reviewRequiredProductCount: number;
  status: CanonicalMedicationConceptV1['status'];
  normalizedSearchText: string;
}

export interface CanonicalMedicationCatalogEntry {
  identity: CanonicalMedicationIdentityView;
  medication: Medicamento;
}

function dedupeStrings(values: Array<string | undefined>): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value?.trim())).map(value => value.trim()))];
}

function dedupeObjects<T>(values: T[]): T[] {
  const seen = new Set<string>();
  return values.filter(value => {
    if (value === null || value === undefined) return false;
    const key = JSON.stringify(value);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function resolveMedicationIdentity(id: string): CanonicalMedicationIdentityView | null {
  const alias = aliasById.get(id);
  const concept = alias ? conceptById.get(alias.conceptId) : conceptById.get(id);
  if (!concept) return null;
  const search = searchByConceptId.get(concept.id);
  const conceptAliases = concept.legacyAliasIds
    .map(aliasId => aliasById.get(aliasId))
    .filter((item): item is MedicationLegacyAliasV1 => Boolean(item));
  const conceptProducts = identityBundle.products.filter(product => product.conceptId === concept.id);
  return {
    conceptId: concept.id,
    canonicalPathId: concept.id,
    requestedId: id,
    requestedViaAlias: Boolean(alias),
    preferredName: concept.preferredName,
    primaryLegacyId: concept.primaryLegacyId,
    aliasIds: concept.legacyAliasIds,
    aliases: conceptAliases.map(item => ({ id: item.id, displayName: item.displayName, relation: item.relation })),
    atcCodes: concept.atcCodes,
    dcbCodes: search?.dcbCodes ?? [],
    productCount: conceptProducts.length,
    resolvedProductCount: conceptProducts.filter(product => product.status === 'resolved').length,
    reviewRequiredProductCount: conceptProducts.filter(product => product.status !== 'resolved').length,
    status: concept.status,
    normalizedSearchText: search?.normalizedSearchText ?? '',
  };
}

export function mergeCanonicalMedication(
  identity: CanonicalMedicationIdentityView,
  medications: Medicamento[],
): Medicamento | null {
  const members = identity.aliasIds
    .map(id => medications.find(medication => medication.id === id))
    .filter((item): item is Medicamento => Boolean(item));
  if (members.length === 0) return null;
  const primary = members.find(item => item.id === identity.primaryLegacyId) ?? members[0];
  return {
    ...primary,
    id: identity.conceptId,
    nomeGenerico: identity.preferredName,
    nomesComerciais: dedupeStrings(members.flatMap(item => item.nomesComerciais ?? [])),
    rename: members.some(item => item.rename),
    apresentacoes: dedupeObjects(members.flatMap(item => item.apresentacoes)),
    indicacoes: dedupeStrings(members.flatMap(item => item.indicacoes)),
    posologias: dedupeObjects(members.flatMap(item => item.posologias)),
    contraindicacoes: dedupeStrings(members.flatMap(item => item.contraindicacoes)),
    precaucoes: dedupeStrings(members.flatMap(item => item.precaucoes ?? [])),
    efeitosAdversos: {
      comuns: dedupeStrings(members.flatMap(item => item.efeitosAdversos.comuns)),
      graves: dedupeStrings(members.flatMap(item => item.efeitosAdversos.graves ?? [])),
    },
    interacoes: dedupeObjects(members.flatMap(item => item.interacoes)),
    ajusteDoseRenal: dedupeObjects(members.flatMap(item => item.ajusteDoseRenal ?? [])),
    monitorizacao: dedupeStrings(members.flatMap(item => item.monitorizacao ?? [])),
    orientacoesPaciente: dedupeStrings(members.flatMap(item => item.orientacoesPaciente ?? [])),
    doencasRelacionadas: dedupeStrings(members.flatMap(item => item.doencasRelacionadas)),
    calculadoras: dedupeStrings(members.flatMap(item => item.calculadoras ?? [])),
    citations: dedupeObjects(members.flatMap(item => item.citations)),
    tags: dedupeStrings([
      ...members.flatMap(item => item.tags ?? []),
      ...identity.aliasIds,
      ...identity.aliases.map(item => item.displayName),
      ...identity.atcCodes,
      ...identity.dcbCodes,
    ]),
  };
}

export function getCanonicalMedicationById(
  id: string,
  medications: Medicamento[],
): CanonicalMedicationCatalogEntry | null {
  const identity = resolveMedicationIdentity(id);
  if (!identity) return null;
  const medication = mergeCanonicalMedication(identity, medications);
  return medication ? { identity, medication } : null;
}

export function getCanonicalMedicationCatalog(
  medications: Medicamento[],
): CanonicalMedicationCatalogEntry[] {
  return compactSearchIndex
    .map(entry => getCanonicalMedicationById(entry.conceptId, medications))
    .filter((item): item is CanonicalMedicationCatalogEntry => Boolean(item))
    .sort((left, right) => left.identity.preferredName.localeCompare(right.identity.preferredName, 'pt-BR', { sensitivity: 'base' }));
}

export function getMedicationRouteIds(): string[] {
  return [...identityBundle.concepts.map(concept => concept.id), ...identityBundle.aliases.map(alias => alias.id)];
}

export function getMedicationIdentityBundle(): MedicationIdentityBundleV1 {
  return identityBundle;
}
