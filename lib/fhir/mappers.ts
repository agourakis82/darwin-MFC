/**
 * FHIR RESOURCE MAPPERS - DARWIN-MFC
 * ===================================
 *
 * Mappers para converter dados Darwin-MFC para recursos FHIR R4
 * e vice-versa.
 */

import {
  FHIRCondition,
  FHIRMedication,
  FHIRMedicationRequest,
  FHIRObservation,
  FHIRPatient,
  FHIRCarePlan,
  FHIRDiagnosticReport,
  FHIRCodeableConcept,
  FHIRCoding,
  FHIRQuantity,
  FHIRDosage,
  FHIRTiming,
  FHIRAnnotation,
  FHIR_CODE_SYSTEMS,
  createFHIRCoding,
  createFHIRCodeableConcept,
  createFHIRReference,
  createFHIRQuantity,
  createFHIRIdentifier,
} from './types';

// ============================================================================
// DARWIN-MFC DATA INTERFACES
// ============================================================================

/**
 * Interface para doença do Darwin-MFC
 */
export interface DarwinDoenca {
  id: string;
  nome: string;
  nomeEN?: string;
  descricao?: string;
  ciap2?: string;
  cid10?: string;
  cid11?: string;
  snomedCT?: string;
  categoria?: string;
  sintomasPrincipais?: string[];
  tratamento?: string;
  medicamentosRelacionados?: string[];
  examesRelacionados?: string[];
  sinaisAlerta?: string[];
}

/**
 * Interface para medicamento do Darwin-MFC
 */
export interface DarwinMedicamento {
  id: string;
  nome: string;
  nomeGenerico?: string;
  principioAtivo?: string;
  classe?: string;
  atc?: string;
  rxnorm?: string;
  formaFarmaceutica?: string;
  apresentacoes?: string[];
  indicacoes?: string[];
  contraindicacoes?: string[];
  posologia?: string;
  dosePediatrica?: string;
  doseAdulto?: string;
  interacoes?: Array<{
    medicamento: string;
    tipo: string;
    descricao: string;
  }>;
  efeitosAdversos?: string[];
  categoriaGestacao?: string;
}

/**
 * Interface para exame laboratorial do Darwin-MFC
 */
export interface DarwinExame {
  loincCode: string;
  component: string;
  property?: string;
  unit?: string;
  referenceRanges?: {
    male?: { min?: number; max?: number };
    female?: { min?: number; max?: number };
    general?: { min?: number; max?: number };
  };
  category?: string;
}

/**
 * Interface para paciente do Darwin-MFC
 */
export interface DarwinPaciente {
  id: string;
  nome: string;
  sobrenome?: string;
  dataNascimento?: string;
  sexo?: 'M' | 'F' | 'O';
  cpf?: string;
  cns?: string;
  telefone?: string;
  email?: string;
  endereco?: {
    logradouro?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
  };
  condicoes?: DarwinDoenca[];
  medicamentos?: DarwinMedicamento[];
}

/**
 * Interface para prescrição do Darwin-MFC
 */
export interface DarwinPrescricao {
  id: string;
  pacienteId: string;
  medicamentoId: string;
  medicamento: DarwinMedicamento;
  dose: string;
  frequencia: string;
  via: string;
  duracao?: string;
  dataInicio: string;
  dataFim?: string;
  prescritoPor?: string;
  indicacao?: string;
  observacoes?: string;
}

/**
 * Interface para resultado de exame do Darwin-MFC
 */
export interface DarwinResultadoExame {
  id: string;
  pacienteId: string;
  exame: DarwinExame;
  valor: number;
  unidade: string;
  dataColeta: string;
  dataResultado?: string;
  interpretacao?: 'normal' | 'alto' | 'baixo' | 'critico';
  observacoes?: string;
  laboratorio?: string;
}

// ============================================================================
// MAPPERS: DARWIN-MFC → FHIR
// ============================================================================

/**
 * Converte doença Darwin-MFC para FHIR Condition
 */
export function mapDoencaToFHIRCondition(
  doenca: DarwinDoenca,
  patientReference?: string
): FHIRCondition {
  const codings: FHIRCoding[] = [];

  // ICD-10
  if (doenca.cid10) {
    codings.push(createFHIRCoding(FHIR_CODE_SYSTEMS.ICD10, doenca.cid10, doenca.nome));
  }

  // ICD-11
  if (doenca.cid11) {
    codings.push(createFHIRCoding(FHIR_CODE_SYSTEMS.ICD11, doenca.cid11, doenca.nome));
  }

  // SNOMED-CT
  if (doenca.snomedCT) {
    codings.push(createFHIRCoding(FHIR_CODE_SYSTEMS.SNOMED_CT, doenca.snomedCT, doenca.nome));
  }

  // CIAP-2
  if (doenca.ciap2) {
    codings.push(createFHIRCoding(FHIR_CODE_SYSTEMS.CIAP2, doenca.ciap2, doenca.nome));
  }

  const condition: FHIRCondition = {
    resourceType: 'Condition',
    id: doenca.id,
    meta: {
      profile: ['http://hl7.org/fhir/StructureDefinition/Condition'],
      lastUpdated: new Date().toISOString(),
    },
    code: createFHIRCodeableConcept(codings, doenca.nome),
    clinicalStatus: createFHIRCodeableConcept([
      createFHIRCoding(
        FHIR_CODE_SYSTEMS.CONDITION_CLINICAL_STATUS,
        'active',
        'Active'
      ),
    ]),
    verificationStatus: createFHIRCodeableConcept([
      createFHIRCoding(
        FHIR_CODE_SYSTEMS.CONDITION_VERIFICATION_STATUS,
        'confirmed',
        'Confirmed'
      ),
    ]),
  };

  if (patientReference) {
    condition.subject = { reference: patientReference };
  }

  // Notas com sinais de alerta
  if (doenca.sinaisAlerta && doenca.sinaisAlerta.length > 0) {
    condition.note = doenca.sinaisAlerta.map((sinal) => ({
      text: `⚠️ Sinal de alerta: ${sinal}`,
    }));
  }

  return condition;
}

/**
 * Converte medicamento Darwin-MFC para FHIR Medication
 */
export function mapMedicamentoToFHIRMedication(
  medicamento: DarwinMedicamento
): FHIRMedication {
  const codings: FHIRCoding[] = [];

  // ATC
  if (medicamento.atc) {
    codings.push(createFHIRCoding(FHIR_CODE_SYSTEMS.ATC, medicamento.atc, medicamento.nome));
  }

  // RxNorm
  if (medicamento.rxnorm) {
    codings.push(createFHIRCoding(FHIR_CODE_SYSTEMS.RXNORM, medicamento.rxnorm, medicamento.nome));
  }

  const medication: FHIRMedication = {
    resourceType: 'Medication',
    id: medicamento.id,
    meta: {
      profile: ['http://hl7.org/fhir/StructureDefinition/Medication'],
      lastUpdated: new Date().toISOString(),
    },
    code: createFHIRCodeableConcept(codings, medicamento.nome),
    status: 'active',
  };

  // Forma farmacêutica
  if (medicamento.formaFarmaceutica) {
    medication.form = createFHIRCodeableConcept(
      [createFHIRCoding(FHIR_CODE_SYSTEMS.EDQM, '', medicamento.formaFarmaceutica)],
      medicamento.formaFarmaceutica
    );
  }

  // Ingredientes
  if (medicamento.principioAtivo) {
    medication.ingredient = [
      {
        itemCodeableConcept: createFHIRCodeableConcept(
          [],
          medicamento.principioAtivo
        ),
        isActive: true,
      },
    ];
  }

  return medication;
}

/**
 * Converte prescrição Darwin-MFC para FHIR MedicationRequest
 */
export function mapPrescricaoToFHIRMedicationRequest(
  prescricao: DarwinPrescricao
): FHIRMedicationRequest {
  const codings: FHIRCoding[] = [];

  if (prescricao.medicamento.atc) {
    codings.push(createFHIRCoding(FHIR_CODE_SYSTEMS.ATC, prescricao.medicamento.atc, prescricao.medicamento.nome));
  }

  // Parse da dosagem
  const dosage: FHIRDosage = {
    sequence: 1,
    text: `${prescricao.dose} - ${prescricao.frequencia} - ${prescricao.via}`,
    route: createFHIRCodeableConcept([], prescricao.via),
    timing: {
      repeat: parseFrequencia(prescricao.frequencia),
    },
  };

  const medicationRequest: FHIRMedicationRequest = {
    resourceType: 'MedicationRequest',
    id: prescricao.id,
    meta: {
      profile: ['http://hl7.org/fhir/StructureDefinition/MedicationRequest'],
      lastUpdated: new Date().toISOString(),
    },
    status: 'active',
    intent: 'order',
    medicationCodeableConcept: createFHIRCodeableConcept(codings, prescricao.medicamento.nome),
    subject: createFHIRReference('Patient', prescricao.pacienteId),
    authoredOn: prescricao.dataInicio,
    dosageInstruction: [dosage],
  };

  // Indicação
  if (prescricao.indicacao) {
    medicationRequest.reasonCode = [
      createFHIRCodeableConcept([], prescricao.indicacao),
    ];
  }

  // Observações
  if (prescricao.observacoes) {
    medicationRequest.note = [{ text: prescricao.observacoes }];
  }

  // Período de validade
  if (prescricao.dataFim) {
    medicationRequest.dispenseRequest = {
      validityPeriod: {
        start: prescricao.dataInicio,
        end: prescricao.dataFim,
      },
    };
  }

  // Prescritor
  if (prescricao.prescritoPor) {
    medicationRequest.requester = {
      display: prescricao.prescritoPor,
    };
  }

  return medicationRequest;
}

/**
 * Converte resultado de exame Darwin-MFC para FHIR Observation
 */
export function mapResultadoExameToFHIRObservation(
  resultado: DarwinResultadoExame
): FHIRObservation {
  const observation: FHIRObservation = {
    resourceType: 'Observation',
    id: resultado.id,
    meta: {
      profile: ['http://hl7.org/fhir/StructureDefinition/Observation'],
      lastUpdated: new Date().toISOString(),
    },
    status: 'final',
    category: [
      createFHIRCodeableConcept([
        createFHIRCoding(
          'http://terminology.hl7.org/CodeSystem/observation-category',
          'laboratory',
          'Laboratory'
        ),
      ]),
    ],
    code: createFHIRCodeableConcept(
      [createFHIRCoding(FHIR_CODE_SYSTEMS.LOINC, resultado.exame.loincCode, resultado.exame.component)],
      resultado.exame.component
    ),
    subject: createFHIRReference('Patient', resultado.pacienteId),
    effectiveDateTime: resultado.dataColeta,
    issued: resultado.dataResultado || resultado.dataColeta,
    valueQuantity: createFHIRQuantity(resultado.valor, resultado.unidade),
  };

  // Interpretação
  if (resultado.interpretacao) {
    observation.interpretation = [
      createFHIRCodeableConcept(
        [createFHIRCoding(
          'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
          mapInterpretacaoToFHIR(resultado.interpretacao),
          resultado.interpretacao
        )],
        resultado.interpretacao
      ),
    ];
  }

  // Valores de referência
  if (resultado.exame.referenceRanges?.general) {
    const range = resultado.exame.referenceRanges.general;
    observation.referenceRange = [
      {
        low: range.min !== undefined ? createFHIRQuantity(range.min, resultado.unidade) : undefined,
        high: range.max !== undefined ? createFHIRQuantity(range.max, resultado.unidade) : undefined,
      },
    ];
  }

  // Notas
  if (resultado.observacoes) {
    observation.note = [{ text: resultado.observacoes }];
  }

  // Laboratório
  if (resultado.laboratorio) {
    observation.performer = [{ display: resultado.laboratorio }];
  }

  return observation;
}

/**
 * Converte paciente Darwin-MFC para FHIR Patient
 */
export function mapPacienteToFHIRPatient(
  paciente: DarwinPaciente
): FHIRPatient {
  const patient: FHIRPatient = {
    resourceType: 'Patient',
    id: paciente.id,
    meta: {
      profile: ['http://hl7.org/fhir/StructureDefinition/Patient'],
      lastUpdated: new Date().toISOString(),
    },
    active: true,
    name: [
      {
        use: 'official',
        family: paciente.sobrenome,
        given: [paciente.nome],
        text: paciente.sobrenome ? `${paciente.nome} ${paciente.sobrenome}` : paciente.nome,
      },
    ],
    identifier: [],
    telecom: [],
  };

  // CPF
  if (paciente.cpf) {
    patient.identifier!.push(createFHIRIdentifier(FHIR_CODE_SYSTEMS.CPF, paciente.cpf, 'official'));
  }

  // CNS (Cartão Nacional de Saúde)
  if (paciente.cns) {
    patient.identifier!.push(createFHIRIdentifier(FHIR_CODE_SYSTEMS.CNS, paciente.cns, 'official'));
  }

  // Gênero
  if (paciente.sexo) {
    patient.gender = mapSexoToFHIR(paciente.sexo);
  }

  // Data de nascimento
  if (paciente.dataNascimento) {
    patient.birthDate = paciente.dataNascimento;
  }

  // Telefone
  if (paciente.telefone) {
    patient.telecom!.push({
      system: 'phone',
      value: paciente.telefone,
      use: 'mobile',
    });
  }

  // Email
  if (paciente.email) {
    patient.telecom!.push({
      system: 'email',
      value: paciente.email,
      use: 'home',
    });
  }

  // Endereço
  if (paciente.endereco) {
    patient.address = [
      {
        use: 'home',
        type: 'physical',
        line: paciente.endereco.logradouro
          ? [`${paciente.endereco.logradouro}${paciente.endereco.numero ? `, ${paciente.endereco.numero}` : ''}`]
          : undefined,
        city: paciente.endereco.cidade,
        district: paciente.endereco.bairro,
        state: paciente.endereco.estado,
        postalCode: paciente.endereco.cep,
        country: 'BR',
      },
    ];
  }

  return patient;
}

// ============================================================================
// MAPPERS: FHIR → DARWIN-MFC
// ============================================================================

/**
 * Converte FHIR Condition para doença Darwin-MFC
 */
export function mapFHIRConditionToDoenca(
  condition: FHIRCondition
): Partial<DarwinDoenca> {
  const doenca: Partial<DarwinDoenca> = {
    id: condition.id,
    nome: condition.code?.text || '',
  };

  if (condition.code?.coding) {
    for (const coding of condition.code.coding) {
      switch (coding.system) {
        case FHIR_CODE_SYSTEMS.ICD10:
        case FHIR_CODE_SYSTEMS.ICD10CM:
          doenca.cid10 = coding.code;
          break;
        case FHIR_CODE_SYSTEMS.ICD11:
          doenca.cid11 = coding.code;
          break;
        case FHIR_CODE_SYSTEMS.SNOMED_CT:
          doenca.snomedCT = coding.code;
          break;
        case FHIR_CODE_SYSTEMS.CIAP2:
          doenca.ciap2 = coding.code;
          break;
      }

      // Nome do coding se não tiver
      if (!doenca.nome && coding.display) {
        doenca.nome = coding.display;
      }
    }
  }

  // Sinais de alerta das notas
  if (condition.note) {
    doenca.sinaisAlerta = condition.note
      .filter((n) => n.text?.includes('Sinal de alerta'))
      .map((n) => n.text!.replace('⚠️ Sinal de alerta: ', ''));
  }

  return doenca;
}

/**
 * Converte FHIR Medication para medicamento Darwin-MFC
 */
export function mapFHIRMedicationToMedicamento(
  medication: FHIRMedication
): Partial<DarwinMedicamento> {
  const medicamento: Partial<DarwinMedicamento> = {
    id: medication.id,
    nome: medication.code?.text || '',
  };

  if (medication.code?.coding) {
    for (const coding of medication.code.coding) {
      switch (coding.system) {
        case FHIR_CODE_SYSTEMS.ATC:
          medicamento.atc = coding.code;
          break;
        case FHIR_CODE_SYSTEMS.RXNORM:
          medicamento.rxnorm = coding.code;
          break;
      }

      if (!medicamento.nome && coding.display) {
        medicamento.nome = coding.display;
      }
    }
  }

  if (medication.form?.text) {
    medicamento.formaFarmaceutica = medication.form.text;
  }

  if (medication.ingredient && medication.ingredient.length > 0) {
    const principio = medication.ingredient[0];
    if (principio.itemCodeableConcept?.text) {
      medicamento.principioAtivo = principio.itemCodeableConcept.text;
    }
  }

  return medicamento;
}

/**
 * Converte FHIR Observation para resultado de exame Darwin-MFC
 */
export function mapFHIRObservationToResultadoExame(
  observation: FHIRObservation
): Partial<DarwinResultadoExame> {
  const resultado: Partial<DarwinResultadoExame> = {
    id: observation.id,
    dataColeta: observation.effectiveDateTime,
    dataResultado: observation.issued,
  };

  // Código LOINC
  if (observation.code?.coding) {
    const loincCoding = observation.code.coding.find((c) => c.system === FHIR_CODE_SYSTEMS.LOINC);
    if (loincCoding) {
      resultado.exame = {
        loincCode: loincCoding.code || '',
        component: loincCoding.display || observation.code.text || '',
      };
    }
  }

  // Valor
  if (observation.valueQuantity) {
    resultado.valor = observation.valueQuantity.value;
    resultado.unidade = observation.valueQuantity.unit || '';
  }

  // Interpretação
  if (observation.interpretation && observation.interpretation.length > 0) {
    const interpCoding = observation.interpretation[0].coding?.[0];
    if (interpCoding?.code) {
      resultado.interpretacao = mapFHIRInterpretacaoToDarwin(interpCoding.code);
    }
  }

  // Observações
  if (observation.note && observation.note.length > 0) {
    resultado.observacoes = observation.note.map((n) => n.text).join('\n');
  }

  // Laboratório
  if (observation.performer && observation.performer.length > 0) {
    resultado.laboratorio = observation.performer[0].display;
  }

  return resultado;
}

/**
 * Converte FHIR Patient para paciente Darwin-MFC
 */
export function mapFHIRPatientToPaciente(
  patient: FHIRPatient
): Partial<DarwinPaciente> {
  const paciente: Partial<DarwinPaciente> = {
    id: patient.id,
  };

  // Nome
  if (patient.name && patient.name.length > 0) {
    const name = patient.name[0];
    paciente.nome = name.given?.[0] || '';
    paciente.sobrenome = name.family;
  }

  // Data de nascimento
  if (patient.birthDate) {
    paciente.dataNascimento = patient.birthDate;
  }

  // Gênero
  if (patient.gender) {
    paciente.sexo = mapFHIRGenderToDarwin(patient.gender);
  }

  // Identificadores
  if (patient.identifier) {
    for (const id of patient.identifier) {
      if (id.system === FHIR_CODE_SYSTEMS.CPF) {
        paciente.cpf = id.value;
      } else if (id.system === FHIR_CODE_SYSTEMS.CNS) {
        paciente.cns = id.value;
      }
    }
  }

  // Contatos
  if (patient.telecom) {
    for (const contact of patient.telecom) {
      if (contact.system === 'phone' && contact.value) {
        paciente.telefone = contact.value;
      } else if (contact.system === 'email' && contact.value) {
        paciente.email = contact.value;
      }
    }
  }

  // Endereço
  if (patient.address && patient.address.length > 0) {
    const addr = patient.address[0];
    paciente.endereco = {
      logradouro: addr.line?.[0]?.split(',')[0],
      cidade: addr.city,
      bairro: addr.district,
      estado: addr.state,
      cep: addr.postalCode,
    };
  }

  return paciente;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Parse frequência para FHIR Timing
 */
function parseFrequencia(frequencia: string): FHIRTiming['repeat'] {
  const lower = frequencia.toLowerCase();

  // Padrões comuns
  if (lower.includes('12/12h') || lower.includes('12 em 12')) {
    return { frequency: 1, period: 12, periodUnit: 'h' };
  }
  if (lower.includes('8/8h') || lower.includes('8 em 8')) {
    return { frequency: 1, period: 8, periodUnit: 'h' };
  }
  if (lower.includes('6/6h') || lower.includes('6 em 6')) {
    return { frequency: 1, period: 6, periodUnit: 'h' };
  }
  if (lower.includes('24/24h') || lower.includes('1x/dia') || lower.includes('uma vez ao dia')) {
    return { frequency: 1, period: 1, periodUnit: 'd' };
  }
  if (lower.includes('2x/dia') || lower.includes('duas vezes ao dia')) {
    return { frequency: 2, period: 1, periodUnit: 'd' };
  }
  if (lower.includes('3x/dia') || lower.includes('três vezes ao dia')) {
    return { frequency: 3, period: 1, periodUnit: 'd' };
  }
  if (lower.includes('4x/dia') || lower.includes('quatro vezes ao dia')) {
    return { frequency: 4, period: 1, periodUnit: 'd' };
  }
  if (lower.includes('semana') || lower.includes('semanal')) {
    return { frequency: 1, period: 1, periodUnit: 'wk' };
  }

  // Default
  return { frequency: 1, period: 1, periodUnit: 'd' };
}

/**
 * Mapeia interpretação Darwin para código FHIR
 */
function mapInterpretacaoToFHIR(interpretacao: string): string {
  switch (interpretacao) {
    case 'alto':
      return 'H';
    case 'baixo':
      return 'L';
    case 'critico':
      return 'HH'; // ou LL
    case 'normal':
    default:
      return 'N';
  }
}

/**
 * Mapeia código FHIR para interpretação Darwin
 */
function mapFHIRInterpretacaoToDarwin(code: string): DarwinResultadoExame['interpretacao'] {
  switch (code) {
    case 'H':
    case 'HH':
      return 'alto';
    case 'L':
    case 'LL':
      return 'baixo';
    case 'HU':
    case 'LU':
      return 'critico';
    case 'N':
    default:
      return 'normal';
  }
}

/**
 * Mapeia sexo Darwin para FHIR
 */
function mapSexoToFHIR(sexo: 'M' | 'F' | 'O'): FHIRPatient['gender'] {
  switch (sexo) {
    case 'M':
      return 'male';
    case 'F':
      return 'female';
    case 'O':
      return 'other';
    default:
      return 'unknown';
  }
}

/**
 * Mapeia gênero FHIR para Darwin
 */
function mapFHIRGenderToDarwin(gender: NonNullable<FHIRPatient['gender']>): DarwinPaciente['sexo'] {
  switch (gender) {
    case 'male':
      return 'M';
    case 'female':
      return 'F';
    case 'other':
    case 'unknown':
      return 'O';
    default:
      return 'O';
  }
}

// FHIRMedication is imported from ./types
