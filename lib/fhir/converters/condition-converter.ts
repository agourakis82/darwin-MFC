/**
 * Conversores FHIR para Condition (Doenças)
 *
 * Transforma dados de Doenca para FHIR R4 Condition Resource
 * Mapeia terminologias clínicas: ICD-10, ICD-11, CIAP-2, SNOMED-CT, DOID, UMLS, HPO
 *
 * @see https://www.hl7.org/fhir/condition.html
 */

import type { Doenca } from '@/lib/types/doenca';
import type { Citation } from '@/lib/types/references';
import type {
  FHIRCondition,
  FHIRCodeableConcept,
  FHIRCoding,
  FHIRReference,
} from '../types';
import { FHIR_CODE_SYSTEMS } from '../types';

/**
 * Opções para conversão de Doença para Condition
 */
export interface DoencaToConditionOptions {
  /** ID do paciente FHIR */
  subjectId?: string;

  /** ID do episódio de cuidado */
  encounterId?: string;

  /** Data de início da doença (ISO 8601) */
  onsetDate?: string;

  /** ID de quem registrou */
  recorderId?: string;

  /** Incluir notas de tratamento */
  includeNotes?: boolean;

  /** Incluir evidências de diagnóstico */
  includeEvidence?: boolean;

  /** Profundidade de detalhes (basic, extended) */
  detail?: 'basic' | 'extended';
}

/**
 * Converte uma Doença para FHIR Condition
 *
 * Mapeamento:
 * - Doença.id -> Condition.id
 * - Doença.titulo -> Condition.code.text
 * - Doença.cid10 -> Condition.code.coding (ICD-10)
 * - Doença.cid11 -> Condition.code.coding (ICD-11)
 * - Doença.ciap2 -> Condition.code.coding (CIAP-2)
 * - Doença.snomedCT -> Condition.code.coding (SNOMED-CT)
 * - Doença.categoria -> Condition.category
 *
 * @param doenca Doença a converter
 * @param options Opções de conversão
 * @returns FHIRCondition
 */
export function doencaToCondition(
  doenca: Partial<Doenca>,
  options: DoencaToConditionOptions = {}
): FHIRCondition {
  const codings: FHIRCoding[] = [];

  // CID-10 (ICD-10)
  if (doenca.cid10 && doenca.cid10.length > 0) {
    doenca.cid10.forEach((cid) => {
      codings.push({
        system: FHIR_CODE_SYSTEMS.ICD10,
        code: cid.trim(),
        display: doenca.titulo || 'Unknown condition',
      });
    });
  }

  // CID-11 (ICD-11)
  if (doenca.cid11 && doenca.cid11.length > 0) {
    doenca.cid11.forEach((cid) => {
      codings.push({
        system: FHIR_CODE_SYSTEMS.ICD11,
        code: cid.trim(),
        display: doenca.titulo || 'Unknown condition',
      });
    });
  }

  // CIAP-2 (International Classification of Primary Care)
  if (doenca.ciap2 && doenca.ciap2.length > 0) {
    doenca.ciap2.forEach((ciap) => {
      codings.push({
        system: FHIR_CODE_SYSTEMS.CIAP2,
        code: ciap.trim(),
        display: doenca.titulo || 'Unknown condition',
      });
    });
  }

  // SNOMED-CT
  if (doenca.snomedCT) {
    const snomedCodes = Array.isArray(doenca.snomedCT)
      ? doenca.snomedCT
      : [doenca.snomedCT];
    snomedCodes.forEach((code) => {
      codings.push({
        system: FHIR_CODE_SYSTEMS.SNOMED_CT,
        code: code.trim(),
        display: doenca.titulo || 'Unknown condition',
      });
    });
  }

  // DOID (Disease Ontology)
  if (doenca.doid) {
    codings.push({
      system: FHIR_CODE_SYSTEMS.DOID,
      code: doenca.doid.trim(),
      display: doenca.titulo || 'Unknown condition',
    });
  }

  // UMLS CUI (Unified Medical Language System)
  if (doenca.umlsCui) {
    codings.push({
      system: FHIR_CODE_SYSTEMS.UMLS,
      code: doenca.umlsCui.trim(),
      display: doenca.titulo || 'Unknown condition',
    });
  }

  // HPO (Human Phenotype Ontology)
  if (doenca.hpo && doenca.hpo.length > 0) {
    doenca.hpo.forEach((hpo) => {
      codings.push({
        system: FHIR_CODE_SYSTEMS.HPO,
        code: hpo.trim(),
        display: doenca.titulo || 'Unknown condition',
      });
    });
  }

  // MeSH ID (Medical Subject Headings)
  if (doenca.meshId) {
    codings.push({
      system: 'https://meshb.nlm.nih.gov/record/ui',
      code: doenca.meshId.trim(),
      display: doenca.titulo || 'Unknown condition',
    });
  }

  // Build CodeableConcept
  const code: FHIRCodeableConcept = {
    coding: codings.length > 0 ? codings : undefined,
    text: doenca.titulo || doenca.id || 'Unknown condition',
  };

  // Identificadores
  const identifiers = [];
  if (doenca.id) {
    identifiers.push({
      system: 'http://darwin-mfc.org/fhir/condition',
      value: doenca.id.trim(),
      type: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
            code: 'ACSN',
            display: 'Accession ID',
          },
        ],
      },
    });
  }

  // Categoria baseada na categoria da doença
  const category: FHIRCodeableConcept[] = [];
  if (doenca.categoria) {
    category.push({
      coding: [
        {
          system: 'http://darwin-mfc.org/fhir/condition-category',
          code: doenca.categoria,
          display: formatCategoryLabel(doenca.categoria),
        },
      ],
      text: formatCategoryLabel(doenca.categoria),
    });
  }

  // Adicionar categoria padrão FHIR
  category.push({
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/condition-category',
        code: 'problem-list-item',
        display: 'Problem List Item',
      },
    ],
  });

  // Severidade baseada em classificação de risco
  let severity: FHIRCodeableConcept | undefined;
  if (doenca.quickView?.classificacaoRisco && doenca.quickView.classificacaoRisco.length > 0) {
    const risco = doenca.quickView.classificacaoRisco[0];
    severity = {
      coding: [
        {
          system: 'http://loinc.org',
          code: mapRiscoToLoincSeverity(risco.nivel),
          display: risco.nivel,
        },
      ],
      text: risco.nivel,
    };
  }

  // Construir Condition
  const condition: FHIRCondition = {
    resourceType: 'Condition',
    id: doenca.id || generateId('condition'),
    identifier: identifiers.length > 0 ? identifiers : undefined,
    clinicalStatus: {
      coding: [
        {
          system: FHIR_CODE_SYSTEMS.CONDITION_CLINICAL_STATUS,
          code: 'active',
          display: 'Active',
        },
      ],
      text: 'Active',
    },
    verificationStatus: {
      coding: [
        {
          system: FHIR_CODE_SYSTEMS.CONDITION_VERIFICATION_STATUS,
          code: 'confirmed',
          display: 'Confirmed',
        },
      ],
      text: 'Confirmed',
    },
    category: category.length > 0 ? category : undefined,
    severity,
    code,
  };

  // Metadata
  if (doenca.lastUpdate) {
    condition.meta = {
      lastUpdated: doenca.lastUpdate,
    };
  }

  // Sujeito (Paciente)
  if (options.subjectId) {
    condition.subject = {
      reference: `Patient/${options.subjectId}`,
    };
  }

  // Contexto (Episódio de cuidado)
  if (options.encounterId) {
    condition.encounter = {
      reference: `Encounter/${options.encounterId}`,
    };
  }

  // Data de início
  if (options.onsetDate) {
    condition.onsetDateTime = options.onsetDate;
  }

  // Data de registro
  condition.recordedDate = new Date().toISOString();

  // Quem registrou
  if (options.recorderId) {
    condition.recorder = {
      reference: `Practitioner/${options.recorderId}`,
    };
  }

  // Notas (definição, sintomas, etc)
  const notes: NonNullable<FHIRCondition['note']> = [];

  if (options.includeNotes !== false && doenca.quickView?.definicao) {
    notes.push({
      text: doenca.quickView.definicao,
      time: new Date().toISOString(),
      authorReference: options.recorderId ? { reference: `Practitioner/${options.recorderId}` } : undefined,
    });
  }

  if (options.detail === 'extended' && doenca.fullContent?.quadroClinico) {
    const sintomasPrincipais = doenca.fullContent.quadroClinico.sintomasPrincipais?.join('; ');
    if (sintomasPrincipais) {
      notes.push({
        text: `Sintomas principais: ${sintomasPrincipais}`,
        time: new Date().toISOString(),
      });
    }
  }

  if (notes.length > 0) {
    condition.note = notes;
  }

  // Evidências (critérios diagnósticos)
  if (options.includeEvidence !== false && doenca.quickView?.criteriosDiagnosticos) {
    const diagCriteria = doenca.quickView.criteriosDiagnosticos
      .filter((c) => c && c.length > 0)
      .join('; ');

    if (diagCriteria) {
      condition.evidence = [
        {
          code: [
            {
              text: diagCriteria,
            },
          ],
        },
      ];

      // Adicionar red flags como evidência adicional
      if (doenca.quickView?.redFlags && doenca.quickView.redFlags.length > 0) {
        const redFlagsText = doenca.quickView.redFlags
          .filter((rf) => rf && rf.length > 0)
          .join('; ');

        if (redFlagsText) {
          condition.evidence.push({
            code: [
              {
                text: `Red flags: ${redFlagsText}`,
              },
            ],
          });
        }
      }
    }
  }

  // Notas sobre tratamento (extended detail)
  if (options.detail === 'extended' && doenca.fullContent?.tratamento) {
    if (doenca.fullContent.tratamento.objetivos && doenca.fullContent.tratamento.objetivos.length > 0) {
      const objetivos = doenca.fullContent.tratamento.objetivos.join('; ');
      if (condition.note) {
        condition.note.push({
          text: `Objetivos do tratamento: ${objetivos}`,
          time: new Date().toISOString(),
        });
      }
    }
  }

  return condition;
}

/**
 * Converte um FHIR Condition para Doença (parcial)
 *
 * Retorna um objeto parcial de Doença com os campos que consegue extrair
 * de um Condition FHIR.
 */
export function conditionToDoenca(fhirCondition: FHIRCondition): Partial<Doenca> {
  const doenca: Partial<Doenca> = {};

  // ID
  if (fhirCondition.id) {
    doenca.id = fhirCondition.id;
  }

  // Título (do código ou texto)
  if (fhirCondition.code) {
    doenca.titulo = fhirCondition.code.text || fhirCondition.code.coding?.[0]?.display;
  }

  // Extrai códigos dos sistemas de terminologia
  if (fhirCondition.code?.coding) {
    const cid10Codes: string[] = [];
    const cid11Codes: string[] = [];
    const ciap2Codes: string[] = [];

    fhirCondition.code.coding.forEach((coding) => {
      switch (coding.system) {
        case FHIR_CODE_SYSTEMS.ICD10:
          if (coding.code) cid10Codes.push(coding.code);
          break;
        case FHIR_CODE_SYSTEMS.ICD11:
          if (coding.code) cid11Codes.push(coding.code);
          break;
        case FHIR_CODE_SYSTEMS.CIAP2:
          if (coding.code) ciap2Codes.push(coding.code);
          break;
        case FHIR_CODE_SYSTEMS.SNOMED_CT:
          doenca.snomedCT = coding.code;
          break;
        case FHIR_CODE_SYSTEMS.DOID:
          doenca.doid = coding.code;
          break;
        case FHIR_CODE_SYSTEMS.UMLS:
          doenca.umlsCui = coding.code;
          break;
        case FHIR_CODE_SYSTEMS.HPO:
          if (!doenca.hpo) doenca.hpo = [];
          if (coding.code) doenca.hpo.push(coding.code);
          break;
      }
    });

    if (cid10Codes.length > 0) doenca.cid10 = cid10Codes;
    if (cid11Codes.length > 0) doenca.cid11 = cid11Codes;
    if (ciap2Codes.length > 0) doenca.ciap2 = ciap2Codes;
  }

  // Categoria
  if (fhirCondition.category && fhirCondition.category.length > 0) {
    const categoryCoding = fhirCondition.category.find(
      (cat) => cat.coding?.[0]?.system === 'http://darwin-mfc.org/fhir/condition-category'
    );

    if (categoryCoding?.coding?.[0]?.code) {
      doenca.categoria = categoryCoding.coding[0].code as any;
    }
  }

  // LastUpdate from meta
  if (fhirCondition.meta?.lastUpdated) {
    doenca.lastUpdate = fhirCondition.meta.lastUpdated;
  } else {
    doenca.lastUpdate = new Date().toISOString();
  }

  // Definição e critérios diagnósticos (das notas)
  if (fhirCondition.note && fhirCondition.note.length > 0) {
    const definicao = fhirCondition.note[0].text || '';

    doenca.quickView = {
      definicao,
      criteriosDiagnosticos: [],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [],
        farmacologico: [],
      },
      redFlags: [],
    };

    // Extrair red flags das notas adicionais
    fhirCondition.note.forEach((note) => {
      if (note.text?.startsWith('Red flags:')) {
        const redFlagsText = note.text.replace('Red flags: ', '');
        doenca.quickView!.redFlags = redFlagsText.split('; ').filter(Boolean);
      }
    });
  }

  // Critérios diagnósticos (das evidências)
  if (fhirCondition.evidence && fhirCondition.evidence.length > 0) {
    const evidenceText = fhirCondition.evidence[0].code?.[0]?.text;
    if (evidenceText && doenca.quickView) {
      doenca.quickView.criteriosDiagnosticos = evidenceText.split('; ').filter(Boolean);
    }
  }

  // Citations (vazias por padrão, não disponível em Condition FHIR)
  doenca.citations = [];

  return doenca;
}

/**
 * Cria um Bundle FHIR com múltiplas Conditions
 * @deprecated Use BundleBuilder or createCollectionBundle from converters/bundle-builder instead
 */
export function createConditionBundle(
  conditions: FHIRCondition[],
  bundleId?: string
): import('../types').FHIRBundle {
  return {
    resourceType: 'Bundle',
    id: bundleId || generateId('bundle'),
    type: 'collection',
    total: conditions.length,
    entry: conditions.map((condition) => ({
      fullUrl: `${FHIR_BASE_URL}/Condition/${condition.id}`,
      resource: condition,
    })),
  };
}

/**
 * Função auxiliar: mapear nível de risco para LOINC severity code
 */
function mapRiscoToLoincSeverity(nivel: string): string {
  const map: Record<string, string> = {
    baixo: 'LA6752-5', // Mild
    moderado: 'LA6751-7', // Moderate
    alto: 'LA6750-9', // Severe
    muito_alto: 'LA6750-9', // Severe
  };
  return map[nivel] || 'LA6752-5';
}

/**
 * Função auxiliar: formatar label da categoria
 */
function formatCategoryLabel(categoria: string): string {
  const labels: Record<string, string> = {
    cardiovascular: 'Cardiovascular',
    metabolico: 'Metabólico',
    respiratorio: 'Respiratório',
    musculoesqueletico: 'Musculoesquelético',
    saude_mental: 'Saúde Mental',
    infecciosas: 'Infecciosas',
    dermatologico: 'Dermatológico',
    gastrointestinal: 'Gastrointestinal',
    neurologico: 'Neurológico',
    endocrino: 'Endócrino',
    hematologico: 'Hematológico',
    urologico: 'Urológico',
    ginecologico: 'Ginecológico',
    pediatrico: 'Pediátrico',
    geriatrico: 'Geriátrico',
    outros: 'Outros',
  };
  return labels[categoria] || categoria;
}

/**
 * Função auxiliar: gerar ID único
 */
function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Constante de base URL FHIR
 */
const FHIR_BASE_URL = 'http://darwin-mfc.org/fhir';
