import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { medicamentosConsolidados } from '../lib/data/medicamentos/index';
import { medicationHasIncompleteReferenceData } from '../lib/medication-safety/catalog';
import type {
  MedicationDoseRuleV1,
  MedicationKnowledgeBundleV1,
  MedicationKnowledgeEntryV1,
  MedicationPresentationV1,
  MedicationSourceSnapshotV1,
} from '../lib/medication-safety/types';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const clinicalDir = resolve(root, 'clinical/medication-safety');
const publicDir = resolve(root, 'public/medication-safety');
const sourceRegistryPath = resolve(clinicalDir, 'source-registry.v1.json');
const doseRulesPath = resolve(clinicalDir, 'dose-rules.v1.json');
const bundlePath = resolve(publicDir, 'medication-knowledge-bundle.json');
const auditPath = resolve(publicDir, 'catalog-audit.json');

const EXPECTED_MEDICATION_COUNT = 717;
const BUNDLE_SCHEMA = 'darwin.medication-knowledge-bundle.v1';

function canonicalize(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record).sort().map(key => (
    `${JSON.stringify(key)}:${canonicalize(record[key])}`
  )).join(',')}}`;
}

function sha256(value: string | Buffer): string {
  return createHash('sha256').update(value).digest('hex');
}

function requireCondition(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, 'utf8'));
}

const sourceRegistry = readJson(sourceRegistryPath) as {
  schemaVersion: string;
  registryVersion: string;
  bundleGeneratedAt: string;
  sources: MedicationSourceSnapshotV1[];
};
const doseRuleBundle = readJson(doseRulesPath) as {
  schemaVersion: string;
  bundleVersion: string;
  status: string;
  rules: MedicationDoseRuleV1[];
  promotionPolicy: {
    minimumIndependentReviewers: number;
    requiredReviewerRoles: Array<'physician' | 'pharmacist'>;
    automaticExtractionCanApprove: boolean;
    unsignedRuleCanCalculate: boolean;
    legacyTextCanCalculate: boolean;
  };
};

requireCondition(
  sourceRegistry.schemaVersion === 'darwin.medication-source-registry.v1',
  'Medication source registry schema mismatch.',
);
requireCondition(
  doseRuleBundle.schemaVersion === 'darwin.medication-dose-rules.v1',
  'Medication dose rule bundle schema mismatch.',
);
requireCondition(
  doseRuleBundle.promotionPolicy.minimumIndependentReviewers === 2,
  'Dose rules require exactly the locked two-reviewer minimum.',
);
requireCondition(
  doseRuleBundle.promotionPolicy.requiredReviewerRoles.includes('physician')
    && doseRuleBundle.promotionPolicy.requiredReviewerRoles.includes('pharmacist'),
  'Dose rules require physician and pharmacist review.',
);
requireCondition(
  doseRuleBundle.promotionPolicy.automaticExtractionCanApprove === false
    && doseRuleBundle.promotionPolicy.unsignedRuleCanCalculate === false
    && doseRuleBundle.promotionPolicy.legacyTextCanCalculate === false,
  'Medication promotion policy cannot authorize automatic, unsigned, or legacy-text calculation.',
);

for (const source of sourceRegistry.sources) {
  requireCondition(/^[a-f0-9]{64}$/.test(source.sha256), `Invalid source hash: ${source.id}`);
  requireCondition(source.bytes > 0, `Empty source receipt: ${source.id}`);
  requireCondition(source.url.startsWith('https://'), `Non-HTTPS source: ${source.id}`);
}

const medicationIds = medicamentosConsolidados.map(medication => medication.id);
const uniqueMedicationIds = new Set(medicationIds);
requireCondition(
  medicamentosConsolidados.length === EXPECTED_MEDICATION_COUNT,
  `Medication catalog drifted: ${medicamentosConsolidados.length}/${EXPECTED_MEDICATION_COUNT}.`,
);
requireCondition(
  uniqueMedicationIds.size === EXPECTED_MEDICATION_COUNT,
  `Medication catalog contains duplicate IDs: ${uniqueMedicationIds.size}/${EXPECTED_MEDICATION_COUNT}.`,
);

const rulesByMedication = new Map<string, MedicationDoseRuleV1[]>();
for (const rule of doseRuleBundle.rules) {
  requireCondition(uniqueMedicationIds.has(rule.medicationId), `Unknown medication in rule: ${rule.id}`);
  const approvedReviewers = rule.review.reviewers.filter(reviewer => reviewer.decision === 'approved');
  const approvedRoles = new Set(approvedReviewers.map(reviewer => reviewer.role));
  if (rule.review.status === 'approved') {
    requireCondition(approvedReviewers.length >= 2, `Approved rule lacks two reviewers: ${rule.id}`);
    requireCondition(
      approvedRoles.has('physician') && approvedRoles.has('pharmacist'),
      `Approved rule lacks physician/pharmacist pair: ${rule.id}`,
    );
    requireCondition(rule.review.sourceIds.length > 0, `Approved rule lacks sources: ${rule.id}`);
  }
  const current = rulesByMedication.get(rule.medicationId) ?? [];
  current.push(rule);
  rulesByMedication.set(rule.medicationId, current);
}

function mapPresentation(
  medicationId: string,
  presentation: {
    forma: string;
    concentracao: string;
    disponivelSUS: boolean;
  },
  index: number,
): MedicationPresentationV1 {
  return {
    id: `${medicationId}-presentation-${index + 1}`,
    form: presentation.forma,
    concentrationText: presentation.concentracao,
    availableInSus: presentation.disponivelSUS,
  };
}

const entries: MedicationKnowledgeEntryV1[] = medicamentosConsolidados
  .map(medication => {
    const rules = rulesByMedication.get(medication.id) ?? [];
    const approvedRules = rules.filter(rule => rule.review.status === 'approved');
    const incomplete = medicationHasIncompleteReferenceData(medication);
    const sourceReferenceIds = Array.from(new Set([
      ...(medication.citations ?? []).map(citation => citation.refId),
      'anvisa-bulario-2026-07-31',
      ...(medication.rename ? ['ms-rename-live-2026-07-31'] : []),
    ])).sort();
    const sourceStatus = sourceReferenceIds.includes('local-reference')
      ? 'local-reference' as const
      : sourceReferenceIds.length > 0
        ? 'indexed-reference' as const
        : 'missing' as const;
    const knowledgeStatus = approvedRules.length > 0
      ? 'dose-reviewed' as const
      : incomplete
        ? 'data-incomplete' as const
        : 'reference-only' as const;

    return {
      medicationId: medication.id,
      genericName: medication.nomeGenerico,
      atcCode: medication.atcCode ?? null,
      rename: medication.rename,
      therapeuticClass: medication.classeTerapeutica,
      presentations: (medication.apresentacoes ?? []).map((presentation, index) => (
        mapPresentation(medication.id, presentation, index)
      )),
      indicationLabels: medication.indicacoes ?? [],
      contraindicationCount: medication.contraindicacoes?.length ?? 0,
      interactionCount: medication.interacoes?.length ?? 0,
      sourceReferenceIds,
      sourceStatus,
      knowledgeStatus,
      structuredDoseRuleIds: approvedRules.map(rule => rule.id).sort(),
      clinicalContentSha256: sha256(canonicalize({
        id: medication.id,
        genericName: medication.nomeGenerico,
        atcCode: medication.atcCode ?? null,
        rename: medication.rename,
        presentations: medication.apresentacoes ?? [],
        indications: medication.indicacoes ?? [],
        posologies: medication.posologias ?? [],
        contraindications: medication.contraindicacoes ?? [],
        interactions: medication.interacoes ?? [],
        renalAdjustment: medication.ajusteDoseRenal ?? [],
        specialConsiderations: medication.consideracoesEspeciais ?? null,
        citations: medication.citations ?? [],
      })),
    };
  })
  .sort((left, right) => left.medicationId.localeCompare(right.medicationId));

const audit = {
  expectedMedicationCount: EXPECTED_MEDICATION_COUNT,
  uniqueMedicationCount: entries.length,
  referenceOnlyCount: entries.filter(entry => entry.knowledgeStatus === 'reference-only').length,
  doseReviewedCount: entries.filter(entry => entry.knowledgeStatus === 'dose-reviewed').length,
  dataIncompleteCount: entries.filter(entry => entry.knowledgeStatus === 'data-incomplete').length,
  localReferenceCount: entries.filter(entry => entry.sourceStatus === 'local-reference').length,
  pediatricPosologyCount: medicamentosConsolidados.filter(medication => (
    medication.posologias?.some(posology => Boolean(posology.pediatrico?.dose))
  )).length,
  doseMaximumCount: medicamentosConsolidados.filter(medication => (
    medication.posologias?.some(posology => Boolean(
      posology.adultos?.doseMaxima || posology.pediatrico?.doseMaxima,
    ))
  )).length,
  renalAdjustmentCount: medicamentosConsolidados.filter(medication => (
    Boolean(medication.ajusteDoseRenal?.length)
  )).length,
  hepaticAdjustmentCount: medicamentosConsolidados.filter(medication => (
    Boolean(medication.consideracoesEspeciais?.hepatopatas)
  )).length,
};

const bundle: MedicationKnowledgeBundleV1 = {
  schemaVersion: BUNDLE_SCHEMA,
  bundleVersion: doseRuleBundle.bundleVersion,
  generatedAt: sourceRegistry.bundleGeneratedAt,
  status: doseRuleBundle.rules.some(rule => rule.review.status === 'approved')
    ? 'reviewed'
    : 'unsigned-reference-only',
  intendedUse: 'APS/SUS medication reference with fail-closed structured dosing eligibility.',
  sourceSnapshots: sourceRegistry.sources,
  medications: entries,
  doseRules: doseRuleBundle.rules,
  audit,
  signature: null,
};

requireCondition(bundle.audit.uniqueMedicationCount === EXPECTED_MEDICATION_COUNT, 'Bundle count mismatch.');
requireCondition(
  bundle.audit.referenceOnlyCount
    + bundle.audit.doseReviewedCount
    + bundle.audit.dataIncompleteCount === EXPECTED_MEDICATION_COUNT,
  'Medication knowledge status partition is incomplete.',
);
requireCondition(
  bundle.audit.doseReviewedCount === doseRuleBundle.rules.filter(rule => rule.review.status === 'approved').length,
  'Approved rule count is not bound to reviewed medication coverage.',
);
if (bundle.signature === null) {
  requireCondition(
    bundle.audit.doseReviewedCount === 0,
    'Unsigned medication bundle cannot expose reviewed dose rules.',
  );
}

mkdirSync(publicDir, { recursive: true });
const bundleBytes = Buffer.from(`${JSON.stringify(bundle, null, 2)}\n`);
const auditReport = {
  schemaVersion: 'darwin.medication-catalog-audit.v1',
  bundleVersion: bundle.bundleVersion,
  bundleSha256: sha256(bundleBytes),
  sourceRegistrySha256: sha256(readFileSync(sourceRegistryPath)),
  doseRuleBundleSha256: sha256(readFileSync(doseRulesPath)),
  catalog: audit,
  gates: {
    exactMedicationCount: true,
    uniqueMedicationIds: true,
    sourceSnapshotsHashBound: true,
    automaticExtractionCannotApprove: true,
    unsignedRulesCannotCalculate: true,
    legacyTextCannotCalculate: true,
    allUnreviewedMedicationsReferenceOnly: bundle.audit.doseReviewedCount === 0,
  },
};
writeFileSync(bundlePath, bundleBytes);
writeFileSync(auditPath, `${JSON.stringify(auditReport, null, 2)}\n`);

console.log('MEDICATION_KNOWLEDGE_BUNDLE_VALID');
console.log(JSON.stringify(auditReport, null, 2));
