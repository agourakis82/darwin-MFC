import fs from 'node:fs';
import { doencasConsolidadas } from '../lib/data/doencas/index';
import { doencasExpansao800, expansao800Stats } from '../incubator/content-expansion/doencas/expansao-800';
import { medicamentosConsolidados } from '../lib/data/medicamentos/index';
import {
  medicamentosExpansao1000,
  expansao1000Stats,
} from '../incubator/content-expansion/medicamentos/expansao-1000';

type OutputFormat = 'json' | 'summary';
type AuditItem = Record<string, unknown>;

interface CollectionAudit {
  name: string;
  total: number;
  uniqueIds: number;
  duplicateIds: string[];
  overlapWithMainIndex: number;
  missingRequired: Record<string, string[]>;
  citationCoverage: {
    withAnyCitation: number;
    withoutAnyCitation: number;
    percentWithAnyCitation: number;
  };
  ontologyCoverage?: Record<string, number>;
  moduleStats?: unknown;
}

function unique(values: string[]): string[] {
  return [...new Set(values)].sort();
}

function parseArgs(args: string[]): OutputFormat {
  const formatArg = args.find((arg) => arg.startsWith('--format='));
  if (!formatArg) return 'json';

  const format = formatArg.slice('--format='.length);
  if (format === 'json' || format === 'summary') return format;
  throw new Error(`Unsupported format: ${format}`);
}

function duplicateIds(items: AuditItem[]): string[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    const id = typeof item.id === 'string' ? item.id : '';
    if (!id) continue;
    counts.set(id, (counts.get(id) || 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([id]) => id)
    .sort();
}

function missingRequiredFields(items: AuditItem[], fields: string[]): Record<string, string[]> {
  const missing: Record<string, string[]> = {};

  for (const item of items) {
    const id = typeof item.id === 'string' && item.id ? item.id : '(missing-id)';
    const missingFields = fields.filter((field) => {
      const value = item[field];
      if (Array.isArray(value)) return value.length === 0;
      return value === undefined || value === null || value === '';
    });

    if (missingFields.length > 0) {
      missing[id] = missingFields;
    }
  }

  return missing;
}

function hasCitation(value: unknown): boolean {
  if (!value) return false;
  if (Array.isArray(value)) return value.some(hasCitation);
  if (typeof value !== 'object') return false;

  const object = value as Record<string, unknown>;
  if (typeof object.refId === 'string' && object.refId.length > 0) return true;
  if (typeof object.pmid === 'string' && object.pmid.length > 0) return true;
  if (typeof object.doi === 'string' && object.doi.length > 0) return true;

  return Object.values(object).some(hasCitation);
}

function citationCoverage(items: AuditItem[]): CollectionAudit['citationCoverage'] {
  const withAnyCitation = items.filter(hasCitation).length;
  const withoutAnyCitation = items.length - withAnyCitation;

  return {
    withAnyCitation,
    withoutAnyCitation,
    percentWithAnyCitation: items.length
      ? Math.round((withAnyCitation / items.length) * 100)
      : 0,
  };
}

function overlapCount(items: AuditItem[], mainIds: Set<string>): number {
  return items.filter((item) => typeof item.id === 'string' && mainIds.has(item.id)).length;
}

function auditCollection(args: {
  name: string;
  items: AuditItem[];
  mainIds: Set<string>;
  requiredFields: string[];
  moduleStats?: unknown;
  ontologyFields?: string[];
}): CollectionAudit {
  const ids = args.items
    .map((item) => (typeof item.id === 'string' ? item.id : ''))
    .filter(Boolean);

  const audit: CollectionAudit = {
    name: args.name,
    total: args.items.length,
    uniqueIds: new Set(ids).size,
    duplicateIds: duplicateIds(args.items),
    overlapWithMainIndex: overlapCount(args.items, args.mainIds),
    missingRequired: missingRequiredFields(args.items, args.requiredFields),
    citationCoverage: citationCoverage(args.items),
    moduleStats: args.moduleStats,
  };

  if (args.ontologyFields) {
    audit.ontologyCoverage = Object.fromEntries(
      args.ontologyFields.map((field) => [
        field,
        args.items.filter((item) => {
          const value = item[field];
          return Array.isArray(value) ? value.length > 0 : Boolean(value);
        }).length,
      ])
    );
  }

  return audit;
}

const diseaseMainIds = new Set(
  doencasConsolidadas
    .map((item: { id?: string }) => item.id)
    .filter((id): id is string => typeof id === 'string' && id.length > 0)
);

const medicationMainIds = new Set(
  medicamentosConsolidados
    .map((item: { id?: string }) => item.id)
    .filter((id): id is string => typeof id === 'string' && id.length > 0)
);

const diseaseAudit = auditCollection({
  name: 'doencas-expansao-800',
  items: doencasExpansao800 as AuditItem[],
  mainIds: diseaseMainIds,
  requiredFields: ['id', 'titulo', 'categoria', 'ciap2', 'cid10', 'quickView', 'fullContent'],
  moduleStats: expansao800Stats,
  ontologyFields: ['doid', 'snomedCT', 'meshId', 'umlsCui', 'cid11', 'hpo'],
});

const medicationAudit = auditCollection({
  name: 'medicamentos-expansao-1000',
  items: medicamentosExpansao1000 as AuditItem[],
  mainIds: medicationMainIds,
  requiredFields: [
    'id',
    'nomeGenerico',
    'classeTerapeutica',
    'apresentacoes',
    'indicacoes',
    'contraindicacoes',
  ],
  moduleStats: expansao1000Stats,
  ontologyFields: ['atcCode', 'rxNormCui', 'drugBankId', 'snomedCT', 'casNumber'],
});

const diseaseMainIndexSource = fs.readFileSync('lib/data/doencas/index.ts', 'utf8');
const medicationMainIndexSource = fs.readFileSync('lib/data/medicamentos/index.ts', 'utf8');

const report = {
  generatedAt: new Date().toISOString(),
  integrationStatus: {
    diseaseExpansionImportedByMainIndex: diseaseMainIndexSource.includes('expansao-800'),
    medicationExpansionImportedByMainIndex: medicationMainIndexSource.includes('expansao-1000'),
    diseaseIdOverlapWithMainIndex: diseaseAudit.overlapWithMainIndex,
    medicationIdOverlapWithMainIndex: medicationAudit.overlapWithMainIndex,
  },
  audits: [diseaseAudit, medicationAudit],
  summary: {
    totalExpansionItems: diseaseAudit.total + medicationAudit.total,
    totalDuplicateIds: diseaseAudit.duplicateIds.length + medicationAudit.duplicateIds.length,
    totalMissingRequiredItems:
      Object.keys(diseaseAudit.missingRequired).length +
      Object.keys(medicationAudit.missingRequired).length,
    totalWithoutAnyCitation:
      diseaseAudit.citationCoverage.withoutAnyCitation +
      medicationAudit.citationCoverage.withoutAnyCitation,
    sampledDuplicateIds: unique([...diseaseAudit.duplicateIds, ...medicationAudit.duplicateIds]).slice(0, 25),
  },
};

const format = parseArgs(process.argv.slice(2));

if (format === 'summary') {
  console.log(`total expansion items: ${report.summary.totalExpansionItems}`);
  console.log(`total duplicate ids: ${report.summary.totalDuplicateIds}`);
  console.log(`total missing required items: ${report.summary.totalMissingRequiredItems}`);
  console.log(`total without any citation: ${report.summary.totalWithoutAnyCitation}`);
  console.log(`disease expansion imported: ${report.integrationStatus.diseaseExpansionImportedByMainIndex}`);
  console.log(`medication expansion imported: ${report.integrationStatus.medicationExpansionImportedByMainIndex}`);
  console.log(`disease overlap with main index: ${report.integrationStatus.diseaseIdOverlapWithMainIndex}`);
  console.log(`medication overlap with main index: ${report.integrationStatus.medicationIdOverlapWithMainIndex}`);
  for (const audit of report.audits) {
    console.log(
      `${audit.name}: total=${audit.total} duplicateIds=${audit.duplicateIds.length} ` +
        `missingRequired=${Object.keys(audit.missingRequired).length} ` +
        `citationCoverage=${audit.citationCoverage.percentWithAnyCitation}%`
    );
  }
} else {
  console.log(JSON.stringify(report, null, 2));
}
