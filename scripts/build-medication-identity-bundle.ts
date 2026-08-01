import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { strFromU8, unzipSync } from 'fflate';
import { medicamentosConsolidados } from '../lib/data/medicamentos/index';
import { interacoesMedicamentosas } from '../lib/data/interacoes-medicamentosas';
import type {
  CanonicalIngredientV1,
  CanonicalMedicationConceptV1,
  CanonicalMedicationInteractionPairV1,
  CanonicalMedicationProductV1,
  MedicationDuplicateAtcGroupV1,
  MedicationIdentityBundleV1,
  MedicationIdentityConflictV1,
  MedicationIdentityReceiptV1,
  MedicationLegacyAliasV1,
  MedicationSearchIndexEntryV1,
  NormalizedMedicationStrengthV1,
} from '../lib/medication-safety/identity-types';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const clinicalDir = resolve(root, 'clinical/medication-safety');
const publicDir = resolve(root, 'public/medication-safety');
const manifestPath = resolve(clinicalDir, 'source-manifest.v2.json');
const overridesPath = resolve(clinicalDir, 'reconciliation-overrides.v1.json');
const bundlePath = resolve(publicDir, 'medication-identity-bundle.json');
const searchPath = resolve(publicDir, 'medication-search-index.json');
const reportPath = resolve(publicDir, 'medication-identity-report.json');
const receiptPath = resolve(publicDir, 'medication-identity.receipt.json');
const publicManifestPath = resolve(publicDir, 'source-manifest.v2.json');
const publicOverridesPath = resolve(publicDir, 'reconciliation-overrides.v1.json');

const EXPECTED = {
  aliases: 717,
  presentations: 1415,
  duplicateAtcGroups: 78,
  duplicateAtcRecords: 171,
  interactions: 176,
  interactionPairs: 152,
  duplicateInteractionGroups: 23,
  severityConflicts: 7,
} as const;

interface SourceManifest {
  schemaVersion: 'darwin.medication-source-manifest.v2';
  manifestVersion: string;
  generatedAt: string;
  sources: MedicationIdentityBundleV1['sources'];
}

interface Overrides {
  schemaVersion: 'darwin.medication-reconciliation-overrides.v1';
  version: string;
  ingredientSynonyms: Record<string, string>;
  conceptGroups: Array<{
    preferredName: string;
    ingredientNames: string[];
    legacyIds: string[];
  }>;
  knownDistinctAtcGroups: Record<string, string>;
  exposures: Record<string, string>;
}

interface DcbRow {
  code: string;
  name: string;
  normalizedName: string;
  classification: string;
}

function assertCondition(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function sha256(value: string | Buffer | Uint8Array): string {
  return createHash('sha256').update(value).digest('hex');
}

function canonicalize(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record).sort().map(key => `${JSON.stringify(key)}:${canonicalize(record[key])}`).join(',')}}`;
}

function decodeXml(value: string): string {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

export function normalizeMedicationIdentity(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9+]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function slug(value: string): string {
  return normalizeMedicationIdentity(value).replaceAll('+', ' mais ').replaceAll(' ', '-');
}

function parseDcbWorkbook(bytes: Buffer): DcbRow[] {
  const archive = unzipSync(new Uint8Array(bytes));
  const stringsXml = strFromU8(archive['xl/sharedStrings.xml']);
  const sheetXml = strFromU8(archive['xl/worksheets/sheet1.xml']);
  const sharedStrings = [...stringsXml.matchAll(/<si>([\s\S]*?)<\/si>/g)].map(match => (
    decodeXml([...match[1].matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)].map(part => part[1]).join(''))
  ));
  const rows: DcbRow[] = [];
  for (const row of sheetXml.matchAll(/<row\b[^>]*r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)) {
    if (Number(row[1]) < 3) continue;
    const cells = new Map<string, string>();
    for (const cell of row[2].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
      const reference = /\br="([A-Z]+)\d+"/.exec(cell[1])?.[1];
      const raw = /<v>([\s\S]*?)<\/v>/.exec(cell[2])?.[1];
      if (!reference || raw === undefined) continue;
      const value = /\bt="s"/.test(cell[1]) ? sharedStrings[Number(raw)] : raw;
      cells.set(reference, value ?? '');
    }
    const name = cells.get('B')?.trim();
    if (!name) continue;
    rows.push({
      code: cells.get('A')?.trim().padStart(5, '0') ?? '',
      name,
      normalizedName: normalizeMedicationIdentity(name),
      classification: cells.get('D')?.trim() ?? '',
    });
  }
  assertCondition(rows.length > 10_000, `DCB workbook parsing produced only ${rows.length} rows.`);
  return rows;
}

function cleanLegacyIngredientName(name: string, synonyms: Record<string, string>): string[] {
  const normalized = normalizeMedicationIdentity(name)
    .replace(/\b(vitamina d3|vitamina b[169]|acetaminofeno|metamizol|t4)\b/g, '')
    .replace(/\b(pediatrico|pediatrica|adulto|gotas|suspensao|solucao|oral|topico|topica|inalatorio|inalatoria|oftalmico|oftalmica|colirio|completo|completa|oncologia|urologia|urologico|derma|reumatologia|antitussigeno|obesidade|ev|iv|sc|im|inj|injetavel|liberacao imediata|liberacao prolongada|ir|la|xr)\b/g, '')
    .replace(/\b\d+(?:[.,]\d+)?\s*(?:mg|mcg|g|ml|porcento)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const wholeSynonym = synonyms[normalized];
  if (wholeSynonym) return [wholeSynonym];
  const separator = normalized.includes('+') ? '+' : null;
  const parts = separator ? normalized.split(separator) : [normalized.split('/')[0]];
  return parts
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => synonyms[part] ?? part)
    .sort();
}

const ROUTES_BY_FORM: Record<string, string> = {
  adesivo: 'transdermal', aerossol: 'inhalation', aerosol: 'inhalation', ampola: 'parenteral',
  capsula: 'oral', capsula_inalacao: 'inhalation', capsula_sprinkle: 'oral', capsula_xr: 'oral',
  colirio: 'ophthalmic', comprimido: 'oral', comprimido_orodispersivel: 'oral', comprimido_xr: 'oral',
  creme: 'topical', gel: 'topical', gel_topico: 'topical', gel_vaginal: 'vaginal', gotas: 'oral',
  inalatorio: 'inhalation', injetavel: 'parenteral', injetavel_im: 'intramuscular',
  injetavel_iv: 'intravenous', injetavel_sc: 'subcutaneous', locao: 'topical', ovulo: 'vaginal',
  po_inalacao: 'inhalation', po_injetavel: 'parenteral', pomada: 'topical',
  solucao_gotas: 'oral', solucao_inalacao: 'inhalation', solucao_nebulizacao: 'inhalation',
  solucao_oral: 'oral', supositorio: 'rectal', suspensao_nebulizacao: 'inhalation',
  suspensao_oral: 'oral', xarope: 'oral', xarope_adulto: 'oral', xarope_pediatrico: 'oral',
};

function parseStrength(text: string): { strength: NormalizedMedicationStrengthV1 | null; ambiguous: boolean } {
  const normalized = normalizeMedicationIdentity(text).replaceAll(',', '.');
  if (!normalized || /\b(variavel|diversas|nao especificad|ui|u i|mmol|meq|%)\b/.test(normalized)) {
    return { strength: null, ambiguous: true };
  }
  const matches = [...normalized.matchAll(/(\d+(?:\.\d+)?)\s*(mcg|micrograma|mg|g|ui|unidades?)(?:\s*\/\s*(\d+(?:\.\d+)?)?\s*(ml|dose|g))?/g)];
  if (matches.length !== 1) return { strength: null, ambiguous: true };
  const match = matches[0];
  const numeratorUnits: Record<string, NormalizedMedicationStrengthV1['numeratorUnit']> = {
    mcg: 'microgram', micrograma: 'microgram', mg: 'milligram', g: 'gram', ui: 'unit', unidade: 'unit', unidades: 'unit',
  };
  const denominatorUnits: Record<string, NonNullable<NormalizedMedicationStrengthV1['denominatorUnit']>> = {
    ml: 'milliliter', dose: 'dose', g: 'gram',
  };
  return {
    ambiguous: false,
    strength: {
      numeratorValue: Number(match[1]),
      numeratorUnit: numeratorUnits[match[2]],
      denominatorValue: match[4] ? Number(match[3] || 1) : null,
      denominatorUnit: match[4] ? denominatorUnits[match[4]] : null,
    },
  };
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as SourceManifest;
const overrides = JSON.parse(readFileSync(overridesPath, 'utf8')) as Overrides;
assertCondition(manifest.schemaVersion === 'darwin.medication-source-manifest.v2', 'Source manifest v2 required.');
assertCondition(overrides.schemaVersion === 'darwin.medication-reconciliation-overrides.v1', 'Reconciliation overrides v1 required.');

for (const source of manifest.sources) {
  const bytes = readFileSync(resolve(root, source.localPath));
  assertCondition(bytes.length === source.bytes, `Source byte count mismatch: ${source.id}`);
  assertCondition(sha256(bytes) === source.sha256, `Source hash mismatch: ${source.id}`);
}

assertCondition(medicamentosConsolidados.length === EXPECTED.aliases, 'Legacy medication count drifted.');
assertCondition(new Set(medicamentosConsolidados.map(item => item.id)).size === EXPECTED.aliases, 'Legacy medication IDs are not unique.');

const dcbSource = manifest.sources.find(source => source.id === 'anvisa-dcb-in-439-2026');
assertCondition(dcbSource, 'DCB source is missing.');
const dcbRows = parseDcbWorkbook(readFileSync(resolve(root, dcbSource.localPath)));
const dcbByName = new Map<string, DcbRow[]>();
for (const row of dcbRows) dcbByName.set(row.normalizedName, [...(dcbByName.get(row.normalizedName) ?? []), row]);

const explicitGroupByLegacyId = new Map<string, Overrides['conceptGroups'][number]>();
for (const group of overrides.conceptGroups) {
  for (const id of group.legacyIds) {
    assertCondition(!explicitGroupByLegacyId.has(id), `Legacy ID appears in multiple concept overrides: ${id}`);
    explicitGroupByLegacyId.set(id, group);
  }
}

const working = medicamentosConsolidados.map(medication => {
  const explicit = explicitGroupByLegacyId.get(medication.id);
  const ingredientNames = explicit?.ingredientNames
    ?? cleanLegacyIngredientName(medication.nomeGenerico, overrides.ingredientSynonyms);
  const compositionKey = ingredientNames.map(normalizeMedicationIdentity).sort().join('+') || `unresolved:${medication.id}`;
  return { medication, ingredientNames, compositionKey, explicit };
});

const groups = new Map<string, typeof working>();
for (const item of working) groups.set(item.compositionKey, [...(groups.get(item.compositionKey) ?? []), item]);

const ingredientsById = new Map<string, CanonicalIngredientV1>();
const concepts: CanonicalMedicationConceptV1[] = [];
const aliases: MedicationLegacyAliasV1[] = [];
const products: CanonicalMedicationProductV1[] = [];
const conflicts: MedicationIdentityConflictV1[] = [];
const conceptIdByLegacyId = new Map<string, string>();

for (const [compositionKey, members] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
  const preferredName = members[0].explicit?.preferredName
    ?? members.slice().sort((a, b) => a.medication.nomeGenerico.length - b.medication.nomeGenerico.length)[0].medication.nomeGenerico;
  const preferredSlug = slug(preferredName) || slug(members[0].medication.id);
  let conceptId = `med-${preferredSlug}`;
  if (concepts.some(concept => concept.id === conceptId)) conceptId += `-${sha256(compositionKey).slice(0, 8)}`;
  const ingredientIds: string[] = [];
  let conceptStatus: CanonicalMedicationConceptV1['status'] = 'source-confirmed';
  for (const ingredientName of members[0].ingredientNames) {
    const normalizedName = normalizeMedicationIdentity(ingredientName);
    const matches = dcbByName.get(normalizedName) ?? [];
    const ingredientId = `dcb-${matches.length === 1 ? matches[0].code : slug(normalizedName)}`;
    ingredientIds.push(ingredientId);
    if (!ingredientsById.has(ingredientId)) {
      const status = matches.length === 1 ? 'source-confirmed' : matches.length > 1 ? 'review-required' : 'candidate';
      ingredientsById.set(ingredientId, {
        id: ingredientId,
        preferredName: matches.length === 1 ? matches[0].name : ingredientName,
        normalizedName,
        dcbCode: matches.length === 1 ? matches[0].code : null,
        dcbClassification: matches.length === 1 ? matches[0].classification : null,
        dcbSourceId: dcbSource.id,
        status,
      });
      if (matches.length > 1) {
        conflicts.push({
          id: `dcb-ambiguous-${slug(normalizedName)}`,
          type: 'dcb-ambiguous',
          legacyIds: members.map(member => member.medication.id).sort(),
          message: `DCB name ${ingredientName} resolves to ${matches.length} source rows.`,
          resolution: 'review-required',
        });
      }
    }
    const ingredientStatus = ingredientsById.get(ingredientId)?.status;
    if (ingredientStatus === 'review-required') conceptStatus = 'review-required';
    else if (ingredientStatus === 'candidate' && conceptStatus === 'source-confirmed') conceptStatus = 'candidate';
  }
  const sortedMembers = members.slice().sort((a, b) => (
    Number(b.medication.rename) - Number(a.medication.rename)
      || a.medication.id.length - b.medication.id.length
      || a.medication.id.localeCompare(b.medication.id)
  ));
  const primaryLegacyId = sortedMembers[0].medication.id;
  for (const member of members) conceptIdByLegacyId.set(member.medication.id, conceptId);
  const conceptProductIds: string[] = [];
  const allRoutes = new Set<string>();
  for (const member of members) {
    member.medication.apresentacoes.forEach((presentation, index) => {
      const form = presentation.forma || 'unknown';
      const route = ROUTES_BY_FORM[form] ?? null;
      if (route) allRoutes.add(route);
      const parsed = parseStrength(presentation.concentracao || '');
      const productId = `${conceptId}-${slug(member.medication.id)}-p${index + 1}`;
      const status = !presentation.concentracao
        ? 'incomplete' as const
        : !route || parsed.ambiguous
          ? 'review-required' as const
          : 'resolved' as const;
      products.push({
        id: productId,
        conceptId,
        sourceLegacyId: member.medication.id,
        sourcePresentationIndex: index,
        form,
        route,
        concentrationText: presentation.concentracao || '',
        strength: parsed.strength,
        packageText: null,
        availableInSus: presentation.disponivelSUS,
        status,
      });
      conceptProductIds.push(productId);
    });
  }
  concepts.push({
    id: conceptId,
    preferredName,
    ingredientIds,
    compositionKey,
    primaryLegacyId,
    legacyAliasIds: members.map(member => member.medication.id).sort(),
    productIds: conceptProductIds,
    atcCodes: [...new Set(members
      .map(member => member.medication.atcCode)
      .filter((code): code is string => Boolean(code)))].sort(),
    therapeuticClasses: [...new Set(members.map(member => member.medication.classeTerapeutica))].sort(),
    rename: members.some(member => member.medication.rename),
    status: conceptStatus,
  });
  const formsByMember = members.map(member => new Set(member.medication.apresentacoes.map(item => item.forma)));
  const routesDiffer = allRoutes.size > 1;
  for (const member of members) {
    const relation = member.medication.id === primaryLegacyId
      ? 'preferred' as const
      : routesDiffer
        ? 'route-alias' as const
        : formsByMember.some(forms => forms.size > 0)
          ? 'formulation-alias' as const
          : 'exact-alias' as const;
    aliases.push({
      id: member.medication.id,
      displayName: member.medication.nomeGenerico,
      normalizedName: normalizeMedicationIdentity(member.medication.nomeGenerico),
      conceptId,
      relation,
      legacyAtcCode: member.medication.atcCode || null,
      commercialNames: [...new Set(member.medication.nomesComerciais ?? [])].sort(),
    });
  }
}

const duplicateAtcGroups: MedicationDuplicateAtcGroupV1[] = [];
const byAtc = new Map<string, typeof medicamentosConsolidados>();
for (const medication of medicamentosConsolidados) {
  if (!medication.atcCode) continue;
  byAtc.set(medication.atcCode, [...(byAtc.get(medication.atcCode) ?? []), medication]);
}
for (const [atcCode, medications] of [...byAtc].filter(([, items]) => items.length > 1).sort(([a], [b]) => a.localeCompare(b))) {
  const conceptIds = [...new Set(medications.map(item => conceptIdByLegacyId.get(item.id)!))].sort();
  const routeSets = medications.map(item => new Set(item.apresentacoes.map(presentation => ROUTES_BY_FORM[presentation.forma]).filter(Boolean)));
  const routeUnion = new Set(routeSets.flatMap(set => [...set]));
  let classification: MedicationDuplicateAtcGroupV1['classification'];
  if (overrides.knownDistinctAtcGroups[atcCode]) classification = 'conflict';
  else if (conceptIds.length > 1) classification = medications.some(item => item.nomeGenerico.includes('+')) ? 'association-distinct' : 'conflict';
  else if (routeUnion.size > 1) classification = 'product-by-route';
  else if (new Set(medications.flatMap(item => item.apresentacoes.map(presentation => presentation.forma))).size > 1) classification = 'product-by-formulation';
  else classification = 'exact-alias';
  duplicateAtcGroups.push({ atcCode, legacyIds: medications.map(item => item.id).sort(), conceptIds, classification });
  if (classification === 'conflict') {
    conflicts.push({
      id: `atc-conflict-${atcCode.toLowerCase()}`,
      type: 'atc-inconsistent',
      legacyIds: medications.map(item => item.id).sort(),
      message: overrides.knownDistinctAtcGroups[atcCode] ?? `Legacy ATC ${atcCode} maps to ${conceptIds.length} ingredient concepts.`,
      resolution: 'review-required',
    });
  }
}

function interactionEndpoint(rawId: string): CanonicalMedicationInteractionPairV1['endpoints'][number] {
  if (overrides.exposures[rawId]) return { kind: 'exposure', id: `exposure-${rawId}`, label: overrides.exposures[rawId] };
  const conceptId = conceptIdByLegacyId.get(rawId);
  const medication = medicamentosConsolidados.find(item => item.id === rawId);
  if (conceptId) return { kind: 'medication-concept', id: conceptId, label: medication?.nomeGenerico ?? rawId };
  return { kind: 'unresolved', id: `unresolved-${slug(rawId)}`, label: rawId };
}

const interactionGroups = new Map<string, typeof interacoesMedicamentosas>();
for (const interaction of interacoesMedicamentosas) {
  const left = interactionEndpoint(interaction.medicamento1);
  const right = interactionEndpoint(interaction.medicamento2);
  const key = [left, right].map(item => `${item.kind}:${item.id}`).sort().join('::');
  interactionGroups.set(key, [...(interactionGroups.get(key) ?? []), interaction]);
}
const interactions: CanonicalMedicationInteractionPairV1[] = [];
for (const [key, rules] of [...interactionGroups].sort(([a], [b]) => a.localeCompare(b))) {
  const firstEndpoints = [interactionEndpoint(rules[0].medicamento1), interactionEndpoint(rules[0].medicamento2)]
    .sort((a, b) => `${a.kind}:${a.id}`.localeCompare(`${b.kind}:${b.id}`)) as CanonicalMedicationInteractionPairV1['endpoints'];
  const severities = [...new Set(rules.map(rule => rule.gravidade))].sort();
  const severityConflict = severities.length > 1;
  const sources = rules.flatMap(rule => rule.fontes);
  const sourceStatus = sources.some(source => /https?:\/\/|doi:|\b20\d{2}\b/i.test(source)) ? 'located' as const : 'source-unverifiable' as const;
  interactions.push({
    id: `interaction-${sha256(key).slice(0, 16)}`,
    endpoints: firstEndpoints,
    legacyRuleIds: rules.map(rule => rule.id).sort(),
    severities,
    severityConflict,
    sourceStatus,
    observations: rules.map(rule => ({
      severity: rule.gravidade,
      effect: rule.efeito,
      management: rule.conduta,
      source: rule.fontes.join('; '),
    })),
    promotionStatus: 'not-promoted',
  });
  if (severityConflict) {
    conflicts.push({
      id: `interaction-severity-${sha256(key).slice(0, 12)}`,
      type: 'interaction-severity-conflict',
      legacyIds: rules.map(rule => rule.id).sort(),
      message: `Conflicting legacy severities: ${severities.join(', ')}.`,
      resolution: 'review-required',
    });
  }
}

const presentationCounts = {
  resolved: products.filter(item => item.status === 'resolved').length,
  incomplete: products.filter(item => item.status === 'incomplete').length,
  reviewRequired: products.filter(item => item.status === 'review-required').length,
  conflicted: products.filter(item => item.status === 'conflict').length,
};
const duplicateInteractionGroups = interactions.filter(item => item.legacyRuleIds.length > 1).length;
const bundle: MedicationIdentityBundleV1 = {
  schemaVersion: 'darwin.medication-identity-bundle.v1',
  bundleVersion: manifest.manifestVersion,
  generatedAt: manifest.generatedAt,
  sources: manifest.sources,
  ingredients: [...ingredientsById.values()].sort((a, b) => a.id.localeCompare(b.id)),
  concepts: concepts.sort((a, b) => a.preferredName.localeCompare(b.preferredName, 'pt-BR')),
  products: products.sort((a, b) => a.id.localeCompare(b.id)),
  aliases: aliases.sort((a, b) => a.id.localeCompare(b.id)),
  duplicateAtcGroups,
  conflicts: conflicts.sort((a, b) => a.id.localeCompare(b.id)),
  interactions,
  audit: {
    legacyRecordCount: EXPECTED.aliases,
    uniqueAliasCount: EXPECTED.aliases,
    legacyPresentationCount: EXPECTED.presentations,
    resolvedPresentationCount: presentationCounts.resolved,
    incompletePresentationCount: presentationCounts.incomplete,
    reviewRequiredPresentationCount: presentationCounts.reviewRequired,
    conflictedPresentationCount: presentationCounts.conflicted,
    duplicateAtcGroupCount: EXPECTED.duplicateAtcGroups,
    duplicateAtcLegacyRecordCount: EXPECTED.duplicateAtcRecords,
    legacyInteractionCount: EXPECTED.interactions,
    uniqueInteractionPairCount: EXPECTED.interactionPairs,
    duplicateInteractionGroupCount: EXPECTED.duplicateInteractionGroups,
    interactionSeverityConflictCount: EXPECTED.severityConflicts,
    clinicalRulesPromoted: 0,
  },
};

assertCondition(aliases.length === EXPECTED.aliases && new Set(aliases.map(alias => alias.id)).size === EXPECTED.aliases, 'Alias reconciliation is incomplete.');
assertCondition(products.length === EXPECTED.presentations, `Presentation count drifted: ${products.length}.`);
assertCondition(Object.values(presentationCounts).reduce((sum, value) => sum + value, 0) === EXPECTED.presentations, 'Presentation partition is incomplete.');
assertCondition(duplicateAtcGroups.length === EXPECTED.duplicateAtcGroups, `Duplicate ATC group count drifted: ${duplicateAtcGroups.length}.`);
assertCondition(duplicateAtcGroups.reduce((sum, group) => sum + group.legacyIds.length, 0) === EXPECTED.duplicateAtcRecords, 'Duplicate ATC records drifted.');
assertCondition(interacoesMedicamentosas.length === EXPECTED.interactions, 'Legacy interaction count drifted.');
assertCondition(interactions.length === EXPECTED.interactionPairs, `Canonical interaction pairs drifted: ${interactions.length}.`);
assertCondition(duplicateInteractionGroups === EXPECTED.duplicateInteractionGroups, `Duplicate interaction groups drifted: ${duplicateInteractionGroups}.`);
assertCondition(interactions.filter(item => item.severityConflict).length === EXPECTED.severityConflicts, 'Interaction severity conflict count drifted.');

const searchIndex: MedicationSearchIndexEntryV1[] = bundle.concepts.map(concept => {
  const conceptAliases = bundle.aliases.filter(alias => alias.conceptId === concept.id);
  const dcbCodes = concept.ingredientIds.map(id => ingredientsById.get(id)?.dcbCode).filter((value): value is string => Boolean(value));
  const values = [
    concept.preferredName,
    ...concept.legacyAliasIds,
    ...conceptAliases.map(alias => alias.displayName),
    ...conceptAliases.flatMap(alias => alias.commercialNames),
    ...concept.atcCodes,
    ...dcbCodes,
  ];
  return {
    conceptId: concept.id,
    preferredName: concept.preferredName,
    primaryLegacyId: concept.primaryLegacyId,
    aliasIds: concept.legacyAliasIds,
    aliases: conceptAliases.map(alias => alias.displayName),
    commercialNames: [...new Set(conceptAliases.flatMap(alias => alias.commercialNames))].sort(),
    atcCodes: concept.atcCodes,
    dcbCodes,
    normalizedSearchText: normalizeMedicationIdentity(values.join(' ')),
  };
});

mkdirSync(publicDir, { recursive: true });
const bundleBytes = Buffer.from(`${JSON.stringify(bundle, null, 2)}\n`);
const searchBytes = Buffer.from(`${JSON.stringify({ schemaVersion: 'darwin.medication-search-index.v1', entries: searchIndex }, null, 2)}\n`);
const report = {
  schemaVersion: 'darwin.medication-identity-report.v1',
  bundleVersion: bundle.bundleVersion,
  summary: {
    canonicalConcepts: bundle.concepts.length,
    ingredients: bundle.ingredients.length,
    aliases: bundle.aliases.length,
    products: bundle.products.length,
    conflicts: bundle.conflicts.length,
    sourceConfirmedConcepts: bundle.concepts.filter(item => item.status === 'source-confirmed').length,
    candidateConcepts: bundle.concepts.filter(item => item.status === 'candidate').length,
    reviewRequiredConcepts: bundle.concepts.filter(item => item.status === 'review-required').length,
  },
  audit: bundle.audit,
  duplicateAtcClassifications: Object.fromEntries(['exact-alias', 'product-by-formulation', 'product-by-route', 'association-distinct', 'conflict'].map(classification => [
    classification,
    bundle.duplicateAtcGroups.filter(group => group.classification === classification).length,
  ])),
  interactionCoverage: {
    sourceUnverifiablePairs: bundle.interactions.filter(item => item.sourceStatus === 'source-unverifiable').length,
    unresolvedEndpointPairs: bundle.interactions.filter(item => item.endpoints.some(endpoint => endpoint.kind === 'unresolved')).length,
    promotedPairs: 0,
  },
};
const parserSourceBytes = readFileSync(fileURLToPath(import.meta.url));
const receipt: MedicationIdentityReceiptV1 = {
  schemaVersion: 'darwin.medication-identity-receipt.v1',
  bundleVersion: bundle.bundleVersion,
  generatedAt: bundle.generatedAt,
  hashes: {
    identityBundleSha256: sha256(bundleBytes),
    compactSearchIndexSha256: sha256(searchBytes),
    sourceManifestSha256: sha256(readFileSync(manifestPath)),
    reconciliationOverridesSha256: sha256(readFileSync(overridesPath)),
    parserSourceSha256: sha256(parserSourceBytes),
  },
  sourceHashes: Object.fromEntries(manifest.sources.map(source => [source.id, source.sha256])),
  gates: {
    exactLegacyAliases: true,
    allAliasesResolveExactlyOnce: aliases.every(alias => concepts.some(concept => concept.id === alias.conceptId)),
    presentationsFullyPartitioned: true,
    duplicateAtcGroupsAccounted: true,
    interactionsFullyReconciled: true,
    severityConflictsNotPromoted: interactions.filter(item => item.severityConflict).every(item => item.promotionStatus === 'not-promoted'),
    supabaseClinicalOverridesForbidden: true,
    doseRulesEmpty: true,
    productionAuthorized: false,
  },
  signature: null,
};

writeFileSync(bundlePath, bundleBytes);
writeFileSync(searchPath, searchBytes);
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
writeFileSync(publicManifestPath, readFileSync(manifestPath));
writeFileSync(publicOverridesPath, readFileSync(overridesPath));
console.log('MEDICATION_IDENTITY_BUNDLE_VALID');
console.log(JSON.stringify({ ...report.summary, audit: bundle.audit, identityBundleSha256: receipt.hashes.identityBundleSha256 }, null, 2));
