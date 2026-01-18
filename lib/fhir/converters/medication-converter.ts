/**
 * Conversores FHIR para Medication (Medicamentos)
 *
 * Transforma dados de Medicamento para FHIR R4 Medication e MedicationStatement Resources
 * Mapeia terminologias farmacêuticas: ATC, RxNorm, DrugBank, SNOMED-CT
 *
 * @see https://www.hl7.org/fhir/medication.html
 * @see https://www.hl7.org/fhir/medicationstatement.html
 */

import type { Medicamento, Posologia } from '@/lib/types/medicamento';
import type {
  FHIRMedication,
  FHIRMedicationStatement,
  FHIRCodeableConcept,
  FHIRCoding,
  FHIRQuantity,
} from '../types';
import { FHIR_CODE_SYSTEMS } from '../types';

/**
 * Opções para conversão de Medicamento para Medication
 */
export interface MedicamentoToMedicationOptions {
  /** Número de lote */
  batchLotNumber?: string;

  /** Data de expiração do lote (ISO 8601) */
  batchExpirationDate?: string;

  /** Status do medicamento */
  status?: 'active' | 'inactive' | 'entered-in-error';

  /** Profundidade de detalhes (basic, extended) */
  detail?: 'basic' | 'extended';
}

/**
 * Opções para conversão de Medicamento para MedicationStatement
 */
export interface MedicamentoToMedicationStatementOptions {
  /** ID do paciente FHIR */
  subjectId?: string;

  /** ID do episódio de cuidado */
  encounterId?: string;

  /** Status do medicamento */
  status?: 'active' | 'completed' | 'stopped' | 'on-hold' | 'unknown' | 'intended' | 'not-taken' | 'entered-in-error';

  /** Data efetiva (ISO 8601) */
  effectiveDate?: string;

  /** Indicação/razão do uso */
  indication?: string;

  /** ID de quem prescreveu */
  prescriberId?: string;

  /** Profundidade de detalhes (basic, extended) */
  detail?: 'basic' | 'extended';
}

/**
 * Converte um Medicamento para FHIR Medication
 *
 * Mapeamento:
 * - Medicamento.id -> Medication.id
 * - Medicamento.nomeGenerico -> Medication.code.text
 * - Medicamento.atcCode -> Medication.code.coding (ATC)
 * - Medicamento.rxNormCui -> Medication.code.coding (RxNorm)
 * - Medicamento.drugBankId -> Medication.code.coding (DrugBank)
 * - Medicamento.snomedCT -> Medication.code.coding (SNOMED-CT)
 * - Medicamento.apresentacoes[0].forma -> Medication.form
 *
 * @param medicamento Medicamento a converter
 * @param options Opções de conversão
 * @returns FHIRMedication
 */
export function medicamentoToMedication(
  medicamento: Medicamento,
  options: MedicamentoToMedicationOptions = {}
): FHIRMedication {
  const codings: FHIRCoding[] = [];

  // ATC Code (WHO - Anatomical Therapeutic Chemical)
  if (medicamento.atcCode) {
    codings.push({
      system: FHIR_CODE_SYSTEMS.ATC,
      code: medicamento.atcCode.trim(),
      display: medicamento.nomeGenerico,
    });
  }

  // RxNorm CUI (National Library of Medicine)
  if (medicamento.rxNormCui) {
    codings.push({
      system: FHIR_CODE_SYSTEMS.RXNORM,
      code: medicamento.rxNormCui.trim(),
      display: medicamento.nomeGenerico,
    });
  }

  // DrugBank ID
  if (medicamento.drugBankId) {
    codings.push({
      system: FHIR_CODE_SYSTEMS.DRUGBANK,
      code: medicamento.drugBankId.trim(),
      display: medicamento.nomeGenerico,
    });
  }

  // SNOMED-CT
  if (medicamento.snomedCT) {
    const snomedCodes = Array.isArray(medicamento.snomedCT)
      ? medicamento.snomedCT
      : [medicamento.snomedCT];
    snomedCodes.forEach((code) => {
      codings.push({
        system: FHIR_CODE_SYSTEMS.SNOMED_CT,
        code: code.trim(),
        display: medicamento.nomeGenerico,
      });
    });
  }

  // Build CodeableConcept
  const code: FHIRCodeableConcept = {
    coding: codings.length > 0 ? codings : undefined,
    text: medicamento.nomeGenerico,
  };

  // Identificadores
  const identifiers = [];

  // Darwin MFC ID
  if (medicamento.id) {
    identifiers.push({
      system: 'http://darwin-mfc.org/fhir/medication',
      value: medicamento.id.trim(),
    });
  }

  // ANVISA Registro (Brasil)
  if (medicamento.anvisaRegistro) {
    identifiers.push({
      system: 'https://www.gov.br/anvisa/pt-br',
      value: medicamento.anvisaRegistro.trim(),
      type: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
            code: 'NPI',
            display: 'National Provider Identifier',
          },
        ],
      },
    });
  }

  // DCB Code (Denominação Comum Brasileira)
  if (medicamento.dcbCode) {
    identifiers.push({
      system: 'http://anvisa.gov.br/dcb',
      value: medicamento.dcbCode.trim(),
    });
  }

  // CAS Number
  if (medicamento.casNumber) {
    identifiers.push({
      system: 'http://www.cas.org',
      value: medicamento.casNumber.trim(),
    });
  }

  // Forma farmacêutica (primeira apresentação)
  const form = medicamento.apresentacoes && medicamento.apresentacoes.length > 0
    ? buildPharmaFormConcept(medicamento.apresentacoes[0].forma)
    : undefined;

  // Ingredientes (detalhes estendidos)
  const ingredient = options.detail === 'extended'
    ? buildIngredients(medicamento)
    : undefined;

  // Build Medication
  const medication: FHIRMedication = {
    resourceType: 'Medication',
    id: medicamento.id || generateId('medication'),
    identifier: identifiers.length > 0 ? identifiers : undefined,
    status: options.status || 'active',
    code,
    form,
    ingredient,
  };

  // Metadata
  if (medicamento.lastUpdate) {
    medication.meta = {
      lastUpdated: medicamento.lastUpdate,
    };
  }

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
 *
 * Mapeamento:
 * - Medicamento -> MedicationStatement.medicationCodeableConcept
 * - Posologia.dose -> MedicationStatement.dosage[0].doseAndRate[0].doseQuantity
 * - Posologia.frequencia -> MedicationStatement.dosage[0].timing.repeat
 * - Posologia.via -> MedicationStatement.dosage[0].route
 * - options.subjectId -> MedicationStatement.subject
 * - options.indication -> MedicationStatement.reasonCode
 *
 * @param medicamento Medicamento a converter
 * @param posologia Posologia/dosagem
 * @param options Opções de conversão
 * @returns FHIRMedicationStatement
 */
export function medicamentoToMedicationStatement(
  medicamento: Medicamento,
  posologia?: Posologia | Partial<Posologia>,
  options: MedicamentoToMedicationStatementOptions = {}
): FHIRMedicationStatement {
  const codings: FHIRCoding[] = [];

  // ATC Code
  if (medicamento.atcCode) {
    codings.push({
      system: FHIR_CODE_SYSTEMS.ATC,
      code: medicamento.atcCode.trim(),
      display: medicamento.nomeGenerico,
    });
  }

  // RxNorm CUI
  if (medicamento.rxNormCui) {
    codings.push({
      system: FHIR_CODE_SYSTEMS.RXNORM,
      code: medicamento.rxNormCui.trim(),
      display: medicamento.nomeGenerico,
    });
  }

  // SNOMED-CT
  if (medicamento.snomedCT) {
    const snomedCodes = Array.isArray(medicamento.snomedCT)
      ? medicamento.snomedCT
      : [medicamento.snomedCT];
    snomedCodes.forEach((code) => {
      codings.push({
        system: FHIR_CODE_SYSTEMS.SNOMED_CT,
        code: code.trim(),
        display: medicamento.nomeGenerico,
      });
    });
  }

  // Build medication CodeableConcept
  const medicationCodeableConcept: FHIRCodeableConcept = {
    coding: codings.length > 0 ? codings : undefined,
    text: medicamento.nomeGenerico,
  };

  // Build dosage
  const dosage: FHIRMedicationStatement['dosage'] = [];

  if (posologia) {
    const doseText = buildDoseText(posologia);
    const doseStr = (posologia as any)?.dose || '';

    dosage.push({
      text: doseText || undefined,
      route: doseStr?.includes?.('oral')
        ? buildRouteConcept('oral')
        : doseStr?.includes?.('IV')
        ? buildRouteConcept('intravenous')
        : doseStr?.includes?.('IM')
        ? buildRouteConcept('intramuscular')
        : undefined,
      method: undefined,
      timing: (posologia as any)?.frequencia
        ? {
            repeat: parseFrequency((posologia as any).frequencia),
          }
        : undefined,
      doseAndRate: doseStr
        ? [
            {
              doseQuantity: {
                value: extractDoseValue(doseStr),
                unit: extractDoseUnit(doseStr),
                text: doseStr,
              } as FHIRQuantity,
            },
          ]
        : undefined,
    });
  }

  // Build MedicationStatement
  const statement: FHIRMedicationStatement = {
    resourceType: 'MedicationStatement',
    id: generateId('medicationstatement'),
    status: options.status || 'active',
    medicationCodeableConcept,
    dosage: dosage.length > 0 ? dosage : undefined,
  };

  // Metadata
  if (medicamento.lastUpdate) {
    statement.meta = {
      lastUpdated: medicamento.lastUpdate,
    };
  }

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
  statement.effectiveDateTime = options.effectiveDate || new Date().toISOString();

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

  // Fonte da informação (prescriber)
  if (options.prescriberId) {
    statement.informationSource = {
      reference: `Practitioner/${options.prescriberId}`,
    };
  }

  // Categoria
  if (medicamento.classeTerapeutica) {
    statement.category = {
      coding: [
        {
          system: 'http://darwin-mfc.org/fhir/medication-class',
          code: medicamento.classeTerapeutica,
          display: medicamento.classeTerapeutica,
        },
      ],
      text: medicamento.classeTerapeutica,
    };
  }

  // Adicionar detalhes estendidos
  if (options.detail === 'extended') {
    // Contraindicações como nota
    if (medicamento.contraindicacoes && medicamento.contraindicacoes.length > 0) {
      if (!statement.dosage) {
        statement.dosage = [];
      }
      const firstDosage = statement.dosage[0] || {};
      firstDosage.patientInstruction = `Contraindicações: ${medicamento.contraindicacoes.join('; ')}`;
      if (statement.dosage.length === 0) {
        statement.dosage.push(firstDosage);
      }
    }

    // Efeitos adversos importantes como nota estruturada
    if (
      medicamento.efeitosAdversos &&
      (medicamento.efeitosAdversos.comuns?.length || medicamento.efeitosAdversos.graves?.length)
    ) {
      const adverseEffects = [
        ...(medicamento.efeitosAdversos.comuns || []),
        ...(medicamento.efeitosAdversos.graves || []),
      ];
      if (statement.dosage && statement.dosage[0]) {
        statement.dosage[0].additionalInstruction = [
          {
            text: `Efeitos adversos: ${adverseEffects.join('; ')}`,
          },
        ];
      }
    }
  }

  return statement;
}

/**
 * Converte um FHIR Medication para Medicamento (parcial)
 */
export function medicationToMedicamento(fhirMedication: FHIRMedication): Partial<Medicamento> {
  const medicamento: Partial<Medicamento> = {};

  // ID
  if (fhirMedication.id) {
    medicamento.id = fhirMedication.id;
  }

  // Nome genérico
  if (fhirMedication.code) {
    medicamento.nomeGenerico =
      fhirMedication.code.text ||
      fhirMedication.code.coding?.[0]?.display ||
      '';
  }

  // Extrai códigos dos sistemas de terminologia
  if (fhirMedication.code?.coding) {
    fhirMedication.code.coding.forEach((coding) => {
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

  // LastUpdate from meta
  if (fhirMedication.meta?.lastUpdated) {
    medicamento.lastUpdate = fhirMedication.meta.lastUpdated;
  } else {
    medicamento.lastUpdate = new Date().toISOString();
  }

  // Status padrão
  medicamento.rename = fhirMedication.status === 'active';

  return medicamento;
}

/**
 * Cria um Bundle FHIR com múltiplos Medications
 * @deprecated Use BundleBuilder or createCollectionBundle from converters/bundle-builder instead
 */
export function createMedicationBundle(
  medications: FHIRMedication[],
  bundleId?: string
): import('../types').FHIRBundle {
  return {
    resourceType: 'Bundle',
    id: bundleId || generateId('bundle'),
    type: 'collection',
    total: medications.length,
    entry: medications.map((medication) => ({
      fullUrl: `${FHIR_BASE_URL}/Medication/${medication.id}`,
      resource: medication,
    })),
  };
}

/**
 * Cria um Bundle FHIR com múltiplos MedicationStatements
 * @deprecated Use BundleBuilder or createCollectionBundle from converters/bundle-builder instead
 */
export function createMedicationStatementBundle(
  statements: FHIRMedicationStatement[],
  bundleId?: string
): import('../types').FHIRBundle {
  return {
    resourceType: 'Bundle',
    id: bundleId || generateId('bundle'),
    type: 'collection',
    total: statements.length,
    entry: statements.map((statement) => ({
      fullUrl: `${FHIR_BASE_URL}/MedicationStatement/${statement.id}`,
      resource: statement,
    })),
  };
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Constrói CodeableConcept para forma farmacêutica
 */
function buildPharmaFormConcept(forma: string): FHIRCodeableConcept {
  const formMap: Record<string, { code: string; display: string }> = {
    comprimido: { code: '10379000', display: 'Tablet' },
    capsula: { code: '10440500', display: 'Capsule' },
    solucao_oral: { code: '11423000', display: 'Oral solution' },
    suspensao_oral: { code: '11546000', display: 'Oral suspension' },
    injetavel: { code: '11294000', display: 'Injectable' },
    injetavel_iv: { code: '11294000', display: 'Injectable solution for intravenous use' },
    injetavel_im: { code: '11294000', display: 'Injectable solution for intramuscular use' },
    creme: { code: '10850000', display: 'Cream' },
    pomada: { code: '11315000', display: 'Ointment' },
    gel: { code: '10843000', display: 'Gel' },
    locao: { code: '10898000', display: 'Lotion' },
    colirio: { code: '10837000', display: 'Eye drops' },
    spray_nasal: { code: '12135000', display: 'Nasal spray' },
    inalatorio: { code: '11549000', display: 'Inhalation powder' },
    aerosol: { code: '11541000', display: 'Metered dose inhaler' },
  };

  const formInfo = formMap[forma] || { code: forma, display: forma };

  return {
    coding: [
      {
        system: FHIR_CODE_SYSTEMS.EDQM,
        code: formInfo.code,
        display: formInfo.display,
      },
    ],
    text: forma,
  };
}

/**
 * Constrói CodeableConcept para via de administração
 */
function buildRouteConcept(route: string): FHIRCodeableConcept {
  const routeMap: Record<string, { code: string; display: string }> = {
    oral: { code: '26643006', display: 'Oral route' },
    intravenous: { code: '47625008', display: 'Intravenous route' },
    intramuscular: { code: '78421000', display: 'Intramuscular route' },
    subcutaneous: { code: '34206005', display: 'Subcutaneous route' },
    topical: { code: '359540000', display: 'Topical route' },
    inhalation: { code: '447694001', display: 'Inhalation route' },
    rectal: { code: '37161004', display: 'Rectal route' },
  };

  const routeInfo = routeMap[route] || { code: route, display: route };

  return {
    coding: [
      {
        system: FHIR_CODE_SYSTEMS.SNOMED_CT,
        code: routeInfo.code,
        display: routeInfo.display,
      },
    ],
    text: route,
  };
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
  if (!freqText || freqText.length === 0) {
    return { frequency: 1, period: 1, periodUnit: 'd' };
  }

  const normalized = freqText.toLowerCase().trim();

  // Padrão: "a cada X horas"
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

  // Padrão: "X vez(es) ao dia"
  if (normalized.includes('dia') || normalized.includes('diária')) {
    const match = normalized.match(/(\d+)\s*vez/);
    if (match) {
      return {
        frequency: parseInt(match[1]),
        period: 1,
        periodUnit: 'd',
      };
    }
  }

  // Padrão: "X vez(es) por semana"
  if (normalized.includes('semana')) {
    const match = normalized.match(/(\d+)\s*vez/);
    if (match) {
      return {
        frequency: parseInt(match[1]),
        period: 1,
        periodUnit: 'wk',
      };
    }
  }

  // Padrão: "X vez(es) por mês"
  if (normalized.includes('mês')) {
    const match = normalized.match(/(\d+)\s*vez/);
    if (match) {
      return {
        frequency: parseInt(match[1]),
        period: 1,
        periodUnit: 'mo',
      };
    }
  }

  // Retorna valores padrão
  return {
    frequency: 1,
    period: 1,
    periodUnit: 'd',
  };
}

/**
 * Extrai valor numérico da dose
 */
function extractDoseValue(doseText: string): number | undefined {
  const match = doseText.match(/(\d+(?:,\d+)?|\d+\.?\d*)/);
  if (match) {
    return parseFloat(match[1].replace(',', '.'));
  }
  return undefined;
}

/**
 * Extrai unidade da dose
 */
function extractDoseUnit(doseText: string): string {
  const unitMap: Record<string, string> = {
    mg: 'mg',
    g: 'g',
    mcg: 'mcg',
    ml: 'mL',
    u: 'U',
    'unidade internacional': 'IU',
  };

  for (const [key, value] of Object.entries(unitMap)) {
    if (doseText.toLowerCase().includes(key)) {
      return value;
    }
  }

  return 'unit';
}

/**
 * Constrói texto de dosagem formatado
 */
function buildDoseText(posologia: Posologia | Partial<Posologia>): string {
  const parts = [];

  const dose = (posologia as any)?.dose;
  const frequencia = (posologia as any)?.frequencia;

  if (dose) {
    parts.push(dose);
  }

  if (frequencia) {
    parts.push(frequencia);
  }

  return parts.join(' ');
}

/**
 * Constrói ingredientes para medicamento
 */
function buildIngredients(medicamento: Medicamento): import('../types').FHIRMedication['ingredient'] {
  // Retorna undefined se não há informações de ingredientes
  // Pode ser expandido para incluir força de cada ingrediente
  return undefined;
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
