import type { Medicamento } from '@/lib/types/medicamento';
import type {
  LegacyPrescriptionV1,
  MedicationKnowledgeStatus,
  SOAPPrescriptionV2,
} from './types';

const PLACEHOLDER = /^(n\/?a|nao especificad[oa]|consulta de bula indicada\.?|dados insuficientes\.?)$/i;

export interface MedicationEvidenceSummary {
  knowledgeStatus: MedicationKnowledgeStatus;
  statusLabel: 'Referencia' | 'Dose revisada' | 'Dados incompletos';
  doseCalculationEnabled: boolean;
  sourceReferenceCount: number;
  reportedUpdateDate: string | null;
  regulatorySourceUrl: string;
  formularySourceUrl: string;
  pregnancyRiskNarrative: string;
  lactationNarrative: string;
  limitations: string[];
}

function normalizedLactationNarrative(medication: Medicamento): string {
  const raw = medication.amamentacao?.observacao || '';
  if (raw.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(raw) as { observacao?: unknown };
      if (typeof parsed.observacao === 'string' && parsed.observacao.trim()) return parsed.observacao;
    } catch {
      return 'Dados narrativos de lactacao presentes, mas o registro legado esta malformado.';
    }
  }
  return raw || 'Dados narrativos de lactacao nao estruturados.';
}

export function medicationHasIncompleteReferenceData(medication: Medicamento): boolean {
  const adultDoseMissing = !medication.posologias?.length
    || medication.posologias.some(posology => (
      !posology.adultos?.dose
      || !posology.adultos?.frequencia
      || PLACEHOLDER.test(posology.adultos.dose.trim())
      || PLACEHOLDER.test(posology.adultos.frequencia.trim())
    ));
  const presentationMissing = !medication.apresentacoes?.length
    || medication.apresentacoes.some(presentation => (
      !presentation.concentracao
      || PLACEHOLDER.test(presentation.concentracao.trim())
    ));
  const sourceMissing = !medication.citations?.length
    || medication.citations.some(citation => citation.refId === 'local-reference');

  return adultDoseMissing || presentationMissing || sourceMissing;
}

export function getMedicationEvidenceSummary(
  medication: Medicamento,
): MedicationEvidenceSummary {
  const incomplete = medicationHasIncompleteReferenceData(medication);
  const knowledgeStatus: MedicationKnowledgeStatus = incomplete
    ? 'data-incomplete'
    : 'reference-only';
  const limitations = [
    'Nenhuma regra de dose deste catalogo possui dupla revisao independente no bundle Darwin Rx atual.',
    'Textos legados de posologia nao sao interpretados nem calculados em tempo de execucao.',
  ];
  if (incomplete) {
    limitations.unshift('Ha campos de referencia, apresentacao ou proveniencia ainda incompletos.');
  }

  return {
    knowledgeStatus,
    statusLabel: incomplete ? 'Dados incompletos' : 'Referencia',
    doseCalculationEnabled: false,
    sourceReferenceCount: medication.citations?.length ?? 0,
    reportedUpdateDate: /^(\d{4}-\d{2}-\d{2})/.exec(medication.lastUpdate)?.[1] ?? null,
    regulatorySourceUrl: 'https://www.gov.br/anvisa/pt-br/sistemas/bulario-eletronico',
    formularySourceUrl: 'https://www.gov.br/saude/pt-br/composicao/sectics/rename',
    pregnancyRiskNarrative: 'Consultar a secao narrativa de gravidez e potencial reprodutivo da bula profissional vigente. Categorias por letras nao sao usadas para decidir risco.',
    lactationNarrative: normalizedLactationNarrative(medication),
    limitations,
  };
}

export function normalizeLegacyPrescription(
  prescription: SOAPPrescriptionV2,
): SOAPPrescriptionV2 {
  if ('schemaVersion' in prescription) return prescription;
  return {
    ...prescription,
    verificationStatus: 'legacy-unverified',
  } satisfies LegacyPrescriptionV1;
}
