/**
 * Conversores FHIR para Condition (Doenças)
 */

import type { Doenca } from '@/lib/types/doenca';
import type { FHIRCondition, FHIRCodeableConcept, FHIRCoding } from './types';
import { FHIR_CODE_SYSTEMS } from './types';

/**
 * Converte uma Doença para FHIR Condition
 */
export function doencaToFHIRCondition(
  doenca: Partial<Doenca>,
  options: {
    subjectId?: string; // ID do paciente FHIR
    encounterId?: string; // ID do episódio de cuidado
    onsetDate?: string; // Data de início (ISO 8601)
    recorderId?: string; // ID de quem registrou
  } = {}
): FHIRCondition {
  const codings: FHIRCoding[] = [];

  // CID-10
  if (doenca.cid10 && doenca.cid10.length > 0) {
    doenca.cid10.forEach(cid => {
      codings.push({
        system: FHIR_CODE_SYSTEMS.ICD10,
        code: cid,
        display: doenca.titulo,
      });
    });
  }

  // CID-11
  if (doenca.cid11 && doenca.cid11.length > 0) {
    doenca.cid11.forEach(cid => {
      codings.push({
        system: FHIR_CODE_SYSTEMS.ICD11,
        code: cid,
        display: doenca.titulo,
      });
    });
  }

  // CIAP-2
  if (doenca.ciap2 && doenca.ciap2.length > 0) {
    doenca.ciap2.forEach(ciap => {
      codings.push({
        system: FHIR_CODE_SYSTEMS.CIAP2,
        code: ciap,
        display: doenca.titulo,
      });
    });
  }

  // SNOMED-CT
  if (doenca.snomedCT) {
    codings.push({
      system: FHIR_CODE_SYSTEMS.SNOMED_CT,
      code: doenca.snomedCT,
      display: doenca.titulo,
    });
  }

  // DOID
  if (doenca.doid) {
    codings.push({
      system: FHIR_CODE_SYSTEMS.DOID,
      code: doenca.doid,
      display: doenca.titulo,
    });
  }

  // UMLS CUI
  if (doenca.umlsCui) {
    codings.push({
      system: FHIR_CODE_SYSTEMS.UMLS,
      code: doenca.umlsCui,
      display: doenca.titulo,
    });
  }

  // HPO (Human Phenotype Ontology)
  if (doenca.hpo && doenca.hpo.length > 0) {
    doenca.hpo.forEach(hpo => {
      codings.push({
        system: FHIR_CODE_SYSTEMS.HPO,
        code: hpo,
        display: doenca.titulo,
      });
    });
  }

  const code: FHIRCodeableConcept = {
    coding: codings.length > 0 ? codings : undefined,
    text: doenca.titulo || doenca.id,
  };

  // Identificadores
  const identifiers = [];
  if (doenca.id) {
    identifiers.push({
      system: 'http://darwin-mfc.org/fhir/condition',
      value: doenca.id,
    });
  }

  // Categoria baseada na categoria da doença
  const category = doenca.categoria
    ? {
        coding: [
          {
            system: 'http://darwin-mfc.org/fhir/condition-category',
            code: doenca.categoria,
            display: doenca.categoria,
          },
        ],
        text: doenca.categoria,
      }
    : undefined;

  // Severidade baseada em classificacao de risco
  const severity = doenca.quickView?.classificacaoRisco
    ? doenca.quickView.classificacaoRisco.map(risco => ({
        coding: [
          {
            system: 'http://darwin-mfc.org/fhir/risk-classification',
            code: risco.nivel,
            display: risco.nivel,
          },
        ],
        text: risco.nivel,
      }))[0] // Pega o primeiro nível de risco
    : undefined;

  const condition: FHIRCondition = {
    resourceType: 'Condition',
    id: doenca.id,
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
    category: category ? [category] : undefined,
    severity,
    code,
  };

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

  // Notas (definição da doença)
  if (doenca.quickView?.definicao) {
    condition.note = [
      {
        text: doenca.quickView.definicao,
        time: new Date().toISOString(),
      },
    ];
  }

  // Evidências (critérios diagnósticos)
  if (doenca.quickView?.criteriosDiagnosticos && doenca.quickView.criteriosDiagnosticos.length > 0) {
    condition.evidence = [
      {
        code: [
          {
            text: doenca.quickView.criteriosDiagnosticos.join('; '),
          },
        ],
      },
    ];
  }

  return condition;
}

/**
 * Converte um FHIR Condition para Doença (parcial)
 */
export function fhirConditionToDoenca(
  fhirCondition: FHIRCondition
): Partial<Doenca> {
  const doenca: Partial<Doenca> = {};

  // ID
  doenca.id = fhirCondition.id;

  // Título (do código ou texto)
  if (fhirCondition.code) {
    doenca.titulo = fhirCondition.code.text || fhirCondition.code.coding?.[0]?.display;
  }

  // Extrai códigos dos sistemas de terminologia
  if (fhirCondition.code?.coding) {
    const cid10Codes: string[] = [];
    const cid11Codes: string[] = [];
    const ciap2Codes: string[] = [];

    fhirCondition.code.coding.forEach(coding => {
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
      }
    });

    if (cid10Codes.length > 0) doenca.cid10 = cid10Codes;
    if (cid11Codes.length > 0) doenca.cid11 = cid11Codes;
    if (ciap2Codes.length > 0) doenca.ciap2 = ciap2Codes;
  }

  // Categoria
  if (fhirCondition.category && fhirCondition.category.length > 0) {
    const categoryCoding = fhirCondition.category[0].coding?.[0];
    if (categoryCoding?.code) {
      doenca.categoria = categoryCoding.code as any; // Type assertion necessário
    }
  }

  // Definicao (das notas)
  if (fhirCondition.note && fhirCondition.note.length > 0) {
    doenca.quickView = {
      definicao: fhirCondition.note[0].text || '',
      criteriosDiagnosticos: [],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [],
        farmacologico: [],
      },
      redFlags: [],
    };
  }

  // Critérios diagnósticos (das evidências)
  if (fhirCondition.evidence && fhirCondition.evidence.length > 0) {
    const evidenceText = fhirCondition.evidence[0].code?.[0]?.text;
    if (evidenceText && doenca.quickView) {
      doenca.quickView.criteriosDiagnosticos = evidenceText.split('; ').filter(Boolean);
    }
  }

  return doenca;
}

/**
 * Cria um Bundle FHIR com múltiplas condições
 */
export function createConditionBundle(
  conditions: FHIRCondition[]
): import('./types').FHIRBundle {
  return {
    resourceType: 'Bundle',
    type: 'collection',
    total: conditions.length,
    entry: conditions.map(condition => ({
      fullUrl: `Condition/${condition.id}`,
      resource: condition,
    })),
  };
}

