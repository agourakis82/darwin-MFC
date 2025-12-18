/**
 * Conversores FHIR para Medication (Medicamentos)
 */

import type { Medicamento } from '@/lib/types/medicamento';
import type { FHIRMedication, FHIRMedicationStatement, FHIRCodeableConcept, FHIRCoding } from './types';
import { FHIR_CODE_SYSTEMS } from './types';

/**
 * Converte um Medicamento para FHIR Medication
 */
export function medicamentoToFHIRMedication(
  medicamento: Medicamento,
  options: {
    batchLotNumber?: string;
    batchExpirationDate?: string;
  } = {}
): FHIRMedication {
  const codings: FHIRCoding[] = [];

  // ATC Code
  if (medicamento.atcCode) {
    codings.push({
      system: FHIR_CODE_SYSTEMS.ATC,
      code: medicamento.atcCode,
      display: medicamento.nomeGenerico,
    });
  }

  // RxNorm CUI
  if (medicamento.rxNormCui) {
    codings.push({
      system: FHIR_CODE_SYSTEMS.RXNORM,
      code: medicamento.rxNormCui,
      display: medicamento.nomeGenerico,
    });
  }

  // DrugBank ID
  if (medicamento.drugBankId) {
    codings.push({
      system: FHIR_CODE_SYSTEMS.DRUGBANK,
      code: medicamento.drugBankId,
      display: medicamento.nomeGenerico,
    });
  }

  // SNOMED-CT
  if (medicamento.snomedCT) {
    codings.push({
      system: FHIR_CODE_SYSTEMS.SNOMED_CT,
      code: medicamento.snomedCT,
      display: medicamento.nomeGenerico,
    });
  }

  const code: FHIRCodeableConcept = {
    coding: codings.length > 0 ? codings : undefined,
    text: medicamento.nomeGenerico,
  };

  // Identificadores
  const identifiers = [];
  if (medicamento.id) {
    identifiers.push({
      system: 'http://darwin-mfc.org/fhir/medication',
      value: medicamento.id,
    });
  }

  // ANVISA Registro
  if (medicamento.anvisaRegistro) {
    identifiers.push({
      system: 'http://anvisa.gov.br/medicamento',
      value: medicamento.anvisaRegistro,
    });
  }

  // Forma farmacêutica
  const form = medicamento.apresentacoes && medicamento.apresentacoes.length > 0
    ? {
        coding: [
          {
            system: FHIR_CODE_SYSTEMS.EDQM,
            code: medicamento.apresentacoes[0].forma,
            display: medicamento.apresentacoes[0].forma,
          },
        ],
        text: medicamento.apresentacoes[0].forma,
      }
    : undefined;

  // Ingredientes (princípio ativo) - não disponível no tipo atual
  const ingredient = undefined;

  const medication: FHIRMedication = {
    resourceType: 'Medication',
    id: medicamento.id,
    identifier: identifiers.length > 0 ? identifiers : undefined,
    status: 'active',
    code,
    form,
    ingredient,
  };

  // Batch (lote)
  if (options.batchLotNumber || options.batchExpirationDate) {
    medication.batch = {};
    if (options.batchLotNumber) {
      medication.batch.lotNumber = options.batchLotNumber;
    }
    if (options.batchExpirationDate) {
      medication.batch.expirationDate = options.batchExpirationDate;
    }
  }

  return medication;
}

/**
 * Converte um Medicamento para FHIR MedicationStatement (prescrição/uso)
 */
export function medicamentoToFHIRMedicationStatement(
  medicamento: Medicamento,
  posologia: {
    dose?: string;
    frequencia?: string;
    via?: string;
    duracao?: string;
  },
  options: {
    subjectId?: string; // ID do paciente FHIR
    encounterId?: string; // ID do episódio de cuidado
    status?: 'active' | 'completed' | 'stopped' | 'on-hold';
    effectiveDate?: string; // Data efetiva
    indication?: string; // Indicação/razão
  } = {}
): FHIRMedicationStatement {
  const codings: FHIRCoding[] = [];

  // ATC Code
  if (medicamento.atcCode) {
    codings.push({
      system: FHIR_CODE_SYSTEMS.ATC,
      code: medicamento.atcCode,
      display: medicamento.nomeGenerico,
    });
  }

  // RxNorm CUI
  if (medicamento.rxNormCui) {
    codings.push({
      system: FHIR_CODE_SYSTEMS.RXNORM,
      code: medicamento.rxNormCui,
      display: medicamento.nomeGenerico,
    });
  }

  const medicationCodeableConcept: FHIRCodeableConcept = {
    coding: codings.length > 0 ? codings : undefined,
    text: medicamento.nomeGenerico,
  };

  // Dosagem
  const dosage: FHIRMedicationStatement['dosage'] = [];
  
  if (posologia.dose || posologia.frequencia || posologia.via) {
    const doseText = [posologia.dose, posologia.frequencia, posologia.via]
      .filter(Boolean)
      .join(' ');

    dosage.push({
      text: doseText || undefined,
      route: posologia.via
        ? {
            coding: [
              {
                system: FHIR_CODE_SYSTEMS.SNOMED_ROUTE,
                code: posologia.via,
                display: posologia.via,
              },
            ],
            text: posologia.via,
          }
        : undefined,
      // Parsing básico de frequência (ex: "a cada 8 horas" -> frequency: 1, period: 8, periodUnit: 'h')
      timing: posologia.frequencia
        ? {
            repeat: parseFrequency(posologia.frequencia),
          }
        : undefined,
      doseAndRate: posologia.dose
        ? [
            {
              doseQuantity: {
                text: posologia.dose, // Texto livre (não padrão FHIR, mas útil para compatibilidade)
              } as any, // Type assertion para permitir texto livre
            },
          ]
        : undefined,
    });
  }

  const statement: FHIRMedicationStatement = {
    resourceType: 'MedicationStatement',
    status: options.status || 'active',
    medicationCodeableConcept,
    dosage: dosage.length > 0 ? dosage : undefined,
  };

  // Sujeito (Paciente)
  if (options.subjectId) {
    statement.subject = {
      reference: `Patient/${options.subjectId}`,
    };
  }

  // Contexto (Episódio de cuidado)
  if (options.encounterId) {
    statement.context = {
      reference: `Encounter/${options.encounterId}`,
    };
  }

  // Data efetiva
  if (options.effectiveDate) {
    statement.effectiveDateTime = options.effectiveDate;
  } else {
    statement.effectiveDateTime = new Date().toISOString();
  }

  // Data de assertiva
  statement.dateAsserted = new Date().toISOString();

  // Indicação
  if (options.indication) {
    statement.reasonCode = [
      {
        text: options.indication,
      },
    ];
  }

  return statement;
}

/**
 * Parse de frequência de texto para FHIR Timing
 * Exemplos: "a cada 8 horas" -> { frequency: 1, period: 8, periodUnit: 'h' }
 */
function parseFrequency(freqText: string): {
  frequency?: number;
  period?: number;
  periodUnit?: 's' | 'min' | 'h' | 'd' | 'wk' | 'mo' | 'a';
} {
  const normalized = freqText.toLowerCase().trim();

  // Padrões comuns
  if (normalized.includes('hora')) {
    const match = normalized.match(/(\d+)\s*hora/);
    if (match) {
      return {
        frequency: 1,
        period: parseInt(match[1]),
        periodUnit: 'h',
      };
    }
  }

  if (normalized.includes('dia')) {
    const match = normalized.match(/(\d+)\s*vez.*dia/);
    if (match) {
      return {
        frequency: parseInt(match[1]),
        period: 1,
        periodUnit: 'd',
      };
    }
  }

  if (normalized.includes('semana')) {
    const match = normalized.match(/(\d+)\s*vez.*semana/);
    if (match) {
      return {
        frequency: parseInt(match[1]),
        period: 1,
        periodUnit: 'wk',
      };
    }
  }

  // Retorna valores padrão se não conseguir fazer parse
  return {
    frequency: 1,
    period: 1,
    periodUnit: 'd',
  };
}

/**
 * Converte um FHIR Medication para Medicamento (parcial)
 */
export function fhirMedicationToMedicamento(
  fhirMedication: FHIRMedication
): Partial<Medicamento> {
  const medicamento: Partial<Medicamento> = {};

  // ID
  medicamento.id = fhirMedication.id;

  // Nome genérico
  if (fhirMedication.code) {
    medicamento.nomeGenerico = fhirMedication.code.text || fhirMedication.code.coding?.[0]?.display || '';
  }

  // Extrai códigos dos sistemas de terminologia
  if (fhirMedication.code?.coding) {
    fhirMedication.code.coding.forEach(coding => {
      switch (coding.system) {
        case FHIR_CODE_SYSTEMS.ATC:
          if (coding.code) medicamento.atcCode = coding.code;
          break;
        case FHIR_CODE_SYSTEMS.RXNORM:
          if (coding.code) medicamento.rxNormCui = coding.code;
          break;
        case FHIR_CODE_SYSTEMS.DRUGBANK:
          if (coding.code) medicamento.drugBankId = coding.code;
          break;
        case FHIR_CODE_SYSTEMS.SNOMED_CT:
          if (coding.code) medicamento.snomedCT = coding.code;
          break;
      }
    });
  }

  // Forma farmacêutica
  if (fhirMedication.form?.coding?.[0]?.code) {
    medicamento.apresentacoes = [
      {
        forma: fhirMedication.form.coding[0].code as any,
        concentracao: '',
        disponivelSUS: false,
      },
    ];
  }

  // Princípio ativo (do ingrediente) - não mapeado para tipo atual
  // if (fhirMedication.ingredient && fhirMedication.ingredient.length > 0) {
  //   const activeIngredient = fhirMedication.ingredient.find(ing => ing.isActive);
  //   if (activeIngredient?.itemCodeableConcept?.text) {
  //     medicamento.principioAtivo = activeIngredient.itemCodeableConcept.text;
  //   }
  // }

  return medicamento;
}

/**
 * Cria um Bundle FHIR com múltiplos medicamentos
 */
export function createMedicationBundle(
  medications: FHIRMedication[]
): import('./types').FHIRBundle {
  return {
    resourceType: 'Bundle',
    type: 'collection',
    total: medications.length,
    entry: medications.map(medication => ({
      fullUrl: `Medication/${medication.id}`,
      resource: medication,
    })),
  };
}

