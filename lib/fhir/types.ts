/**
 * Tipos FHIR (Fast Healthcare Interoperability Resources)
 * Baseado em FHIR R4 (Release 4) - versão atual
 * @see https://www.hl7.org/fhir/
 */

/**
 * FHIR Resource base interface
 */
export interface FHIRResource {
  resourceType: string;
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
  };
}

/**
 * FHIR Coding (código de sistema de terminologia)
 */
export interface FHIRCoding {
  system?: string; // URI do sistema de código (ex: http://hl7.org/fhir/sid/icd-10)
  version?: string;
  code?: string;
  display?: string; // Texto legível
  userSelected?: boolean;
}

/**
 * FHIR CodeableConcept (conceito codificado)
 */
export interface FHIRCodeableConcept {
  coding?: FHIRCoding[];
  text?: string; // Representação textual
}

/**
 * FHIR Reference (referência a outro recurso)
 */
export interface FHIRReference {
  reference?: string; // Ex: "Patient/123", "Condition/456"
  display?: string;
  identifier?: {
    system?: string;
    value?: string;
  };
}

/**
 * FHIR Period (período de tempo)
 */
export interface FHIRPeriod {
  start?: string; // ISO 8601
  end?: string; // ISO 8601
}

/**
 * FHIR Quantity (quantidade com unidade)
 */
export interface FHIRQuantity {
  value?: number;
  unit?: string;
  system?: string; // URI do sistema de unidades
  code?: string; // Código da unidade
}

/**
 * FHIR Ratio (razão entre duas quantidades)
 */
export interface FHIRRatio {
  numerator?: FHIRQuantity;
  denominator?: FHIRQuantity;
}

/**
 * FHIR Condition Resource
 * Representa um diagnóstico, problema de saúde ou condição clínica
 * @see https://www.hl7.org/fhir/condition.html
 */
export interface FHIRCondition extends FHIRResource {
  resourceType: 'Condition';
  
  /** Identificadores clínicos (CID-10, CIAP-2, etc.) */
  identifier?: Array<{
    system?: string;
    value?: string;
    type?: FHIRCodeableConcept;
  }>;
  
  /** Status clínico (ativo, resolvido, remissão) */
  clinicalStatus?: FHIRCodeableConcept;
  
  /** Status de verificação (confirmado, provável, etc.) */
  verificationStatus?: FHIRCodeableConcept;
  
  /** Categorias (problema-lista, preocupação, etc.) */
  category?: FHIRCodeableConcept[];
  
  /** Severidade (leve, moderado, grave) */
  severity?: FHIRCodeableConcept;
  
  /** Código da condição (CID-10, SNOMED-CT, etc.) */
  code?: FHIRCodeableConcept;
  
  /** Corpo afetado (anatomia) */
  bodySite?: FHIRCodeableConcept[];
  
  /** Sujeito (Paciente) */
  subject?: FHIRReference;
  
  /** Contexto (episódio de cuidado) */
  encounter?: FHIRReference;
  
  /** Data estimada ou real de início */
  onsetDateTime?: string;
  onsetAge?: FHIRQuantity;
  onsetPeriod?: FHIRPeriod;
  onsetRange?: {
    low?: FHIRQuantity;
    high?: FHIRQuantity;
  };
  onsetString?: string;
  
  /** Data de resolução/remissão */
  abatementDateTime?: string;
  abatementAge?: FHIRQuantity;
  abatementPeriod?: FHIRPeriod;
  abatementRange?: {
    low?: FHIRQuantity;
    high?: FHIRQuantity;
  };
  abatementString?: string;
  
  /** Data de registro */
  recordedDate?: string;
  
  /** Quem registrou */
  recorder?: FHIRReference;
  
  /** Evidências que apoiam a condição */
  evidence?: Array<{
    code?: FHIRCodeableConcept[];
    detail?: FHIRReference[];
  }>;
  
  /** Notas adicionais */
  note?: Array<{
    text?: string;
    time?: string;
    authorReference?: FHIRReference;
  }>;
}

/**
 * FHIR Medication Resource
 * Representa um medicamento
 * @see https://www.hl7.org/fhir/medication.html
 */
export interface FHIRMedication extends FHIRResource {
  resourceType: 'Medication';
  
  /** Identificadores (ATC, RxNorm, etc.) */
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  
  /** Código do medicamento (RxNorm, ATC, etc.) */
  code?: FHIRCodeableConcept;
  
  /** Status (ativo, inativo, inserido por erro) */
  status?: 'active' | 'inactive' | 'entered-in-error';
  
  /** Fabricante */
  manufacturer?: FHIRReference;
  
  /** Forma farmacêutica */
  form?: FHIRCodeableConcept;
  
  /** Quantidade de princípio ativo */
  amount?: FHIRRatio;
  
  /** Ingredientes */
  ingredient?: Array<{
    itemCodeableConcept?: FHIRCodeableConcept;
    itemReference?: FHIRReference;
    isActive?: boolean;
    strength?: FHIRRatio;
  }>;
  
  /** Informações de lote */
  batch?: {
    lotNumber?: string;
    expirationDate?: string;
  };
}

/**
 * FHIR MedicationStatement Resource
 * Representa uma prescrição ou uso de medicamento
 * @see https://www.hl7.org/fhir/medicationstatement.html
 */
export interface FHIRMedicationStatement extends FHIRResource {
  resourceType: 'MedicationStatement';
  
  /** Identificadores */
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  
  /** Status (ativo, completo, entrado por erro, etc.) */
  status: 'active' | 'completed' | 'entered-in-error' | 'intended' | 'stopped' | 'on-hold' | 'unknown' | 'not-taken';
  
  /** Categorias (prescrição, consumo, etc.) */
  category?: FHIRCodeableConcept;
  
  /** Medicamento */
  medicationCodeableConcept?: FHIRCodeableConcept;
  medicationReference?: FHIRReference;
  
  /** Sujeito (Paciente) */
  subject?: FHIRReference;
  
  /** Contexto (episódio de cuidado) */
  context?: FHIRReference;
  
  /** Data efetiva */
  effectiveDateTime?: string;
  effectivePeriod?: FHIRPeriod;
  
  /** Data em que a informação foi coletada */
  dateAsserted?: string;
  
  /** Fonte da informação */
  informationSource?: FHIRReference;
  
  /** Motivo (indicação) */
  reasonCode?: FHIRCodeableConcept[];
  reasonReference?: FHIRReference[];
  
  /** Dosagem */
  dosage?: Array<{
    sequence?: number;
    text?: string;
    additionalInstruction?: FHIRCodeableConcept[];
    patientInstruction?: string;
    timing?: {
      repeat?: {
        frequency?: number;
        period?: number;
        periodUnit?: 's' | 'min' | 'h' | 'd' | 'wk' | 'mo' | 'a';
        dayOfWeek?: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
        timeOfDay?: string[];
      };
    };
    route?: FHIRCodeableConcept;
    method?: FHIRCodeableConcept;
    doseAndRate?: Array<{
      type?: FHIRCodeableConcept;
      doseRange?: {
        low?: FHIRQuantity;
        high?: FHIRQuantity;
      };
      doseQuantity?: FHIRQuantity;
      rateRatio?: FHIRRatio;
      rateRange?: {
        low?: FHIRQuantity;
        high?: FHIRQuantity;
      };
      rateQuantity?: FHIRQuantity;
    }>;
  }>;
}

/**
 * FHIR Bundle Resource
 * Container para múltiplos recursos FHIR
 * @see https://www.hl7.org/fhir/bundle.html
 */
export interface FHIRBundle extends FHIRResource {
  resourceType: 'Bundle';
  type: 'document' | 'message' | 'transaction' | 'transaction-response' | 'batch' | 'batch-response' | 'history' | 'searchset' | 'collection';
  timestamp?: string;
  total?: number;
  link?: Array<{
    relation: string;
    url: string;
  }>;
  entry?: Array<{
    link?: Array<{
      relation: string;
      url: string;
    }>;
    fullUrl?: string;
    resource?: FHIRResource;
    search?: {
      mode?: 'match' | 'include' | 'outcome';
      score?: number;
    };
    request?: {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
      url: string;
    };
    response?: {
      status: string;
      location?: string;
      etag?: string;
      lastModified?: string;
    };
  }>;
}

/**
 * Sistemas de código FHIR comuns
 */
export const FHIR_CODE_SYSTEMS = {
  // Classificações de doenças
  ICD10: 'http://hl7.org/fhir/sid/icd-10',
  ICD10CM: 'http://hl7.org/fhir/sid/icd-10-cm',
  ICD11: 'http://hl7.org/fhir/sid/icd-11',
  SNOMED_CT: 'http://snomed.info/sct',
  CIAP2: 'http://hl7.org/fhir/sid/icpc-2',
  DOID: 'http://purl.obolibrary.org/obo/doid.owl',
  UMLS: 'https://uts.nlm.nih.gov/uts/umls',
  HPO: 'http://purl.obolibrary.org/obo/hp.owl',
  
  // Medicamentos
  ATC: 'http://www.whocc.no/atc',
  RXNORM: 'http://www.nlm.nih.gov/research/umls/rxnorm',
  DRUGBANK: 'https://www.drugbank.ca/drugs',
  NDC: 'http://hl7.org/fhir/sid/ndc',
  
  // Formas farmacêuticas
  EDQM: 'http://standardterms.edqm.eu',
  
  // Vias de administração
  SNOMED_ROUTE: 'http://snomed.info/sct',
  
  // Status clínico
  CONDITION_CLINICAL_STATUS: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
  CONDITION_VERIFICATION_STATUS: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',

  // Exames laboratoriais
  LOINC: 'http://loinc.org',

  // Unidades
  UCUM: 'http://unitsofmeasure.org',

  // Farmacogenética
  PHARMGKB: 'https://www.pharmgkb.org',
  CPIC: 'https://cpicpgx.org',

  // Brasil específico
  ANVISA: 'http://anvisa.gov.br/medicamentos',
  CNES: 'http://cnes.datasus.gov.br',
  CNS: 'http://rnds.saude.gov.br/fhir/r4/NamingSystem/cns',
  CPF: 'http://rnds.saude.gov.br/fhir/r4/NamingSystem/cpf',
} as const;

export type FHIRCodeSystemUrl = typeof FHIR_CODE_SYSTEMS[keyof typeof FHIR_CODE_SYSTEMS];

/**
 * FHIR HumanName
 */
export interface FHIRHumanName {
  use?: 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden';
  text?: string;
  family?: string;
  given?: string[];
  prefix?: string[];
  suffix?: string[];
  period?: FHIRPeriod;
}

/**
 * FHIR Address
 */
export interface FHIRAddress {
  use?: 'home' | 'work' | 'temp' | 'old' | 'billing';
  type?: 'postal' | 'physical' | 'both';
  text?: string;
  line?: string[];
  city?: string;
  district?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  period?: FHIRPeriod;
}

/**
 * FHIR ContactPoint
 */
export interface FHIRContactPoint {
  system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
  value?: string;
  use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
  rank?: number;
  period?: FHIRPeriod;
}

/**
 * FHIR Identifier
 */
export interface FHIRIdentifier {
  use?: 'usual' | 'official' | 'temp' | 'secondary' | 'old';
  type?: FHIRCodeableConcept;
  system?: string;
  value?: string;
  period?: FHIRPeriod;
  assigner?: FHIRReference;
}

/**
 * FHIR Annotation
 */
export interface FHIRAnnotation {
  authorReference?: FHIRReference;
  authorString?: string;
  time?: string;
  text: string;
}

/**
 * FHIR Range
 */
export interface FHIRRange {
  low?: FHIRQuantity;
  high?: FHIRQuantity;
}

/**
 * FHIR Timing
 */
export interface FHIRTiming {
  event?: string[];
  repeat?: {
    boundsDuration?: FHIRQuantity;
    boundsRange?: FHIRRange;
    boundsPeriod?: FHIRPeriod;
    count?: number;
    countMax?: number;
    duration?: number;
    durationMax?: number;
    durationUnit?: 's' | 'min' | 'h' | 'd' | 'wk' | 'mo' | 'a';
    frequency?: number;
    frequencyMax?: number;
    period?: number;
    periodMax?: number;
    periodUnit?: 's' | 'min' | 'h' | 'd' | 'wk' | 'mo' | 'a';
    dayOfWeek?: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
    timeOfDay?: string[];
    when?: string[];
    offset?: number;
  };
  code?: FHIRCodeableConcept;
}

/**
 * FHIR Dosage
 */
export interface FHIRDosage {
  sequence?: number;
  text?: string;
  additionalInstruction?: FHIRCodeableConcept[];
  patientInstruction?: string;
  timing?: FHIRTiming;
  asNeededBoolean?: boolean;
  asNeededCodeableConcept?: FHIRCodeableConcept;
  site?: FHIRCodeableConcept;
  route?: FHIRCodeableConcept;
  method?: FHIRCodeableConcept;
  doseAndRate?: Array<{
    type?: FHIRCodeableConcept;
    doseRange?: FHIRRange;
    doseQuantity?: FHIRQuantity;
    rateRatio?: FHIRRatio;
    rateRange?: FHIRRange;
    rateQuantity?: FHIRQuantity;
  }>;
  maxDosePerPeriod?: FHIRRatio;
  maxDosePerAdministration?: FHIRQuantity;
  maxDosePerLifetime?: FHIRQuantity;
}

/**
 * FHIR Patient Resource
 * Representa um paciente
 * @see https://www.hl7.org/fhir/patient.html
 */
export interface FHIRPatient extends FHIRResource {
  resourceType: 'Patient';

  /** Identificadores (CPF, CNS, etc.) */
  identifier?: FHIRIdentifier[];

  /** Ativo */
  active?: boolean;

  /** Nome */
  name?: FHIRHumanName[];

  /** Contatos */
  telecom?: FHIRContactPoint[];

  /** Gênero */
  gender?: 'male' | 'female' | 'other' | 'unknown';

  /** Data de nascimento */
  birthDate?: string;

  /** Óbito */
  deceasedBoolean?: boolean;
  deceasedDateTime?: string;

  /** Endereços */
  address?: FHIRAddress[];

  /** Estado civil */
  maritalStatus?: FHIRCodeableConcept;

  /** Múltiplos nascimentos */
  multipleBirthBoolean?: boolean;
  multipleBirthInteger?: number;

  /** Contato de emergência */
  contact?: Array<{
    relationship?: FHIRCodeableConcept[];
    name?: FHIRHumanName;
    telecom?: FHIRContactPoint[];
    address?: FHIRAddress;
    gender?: 'male' | 'female' | 'other' | 'unknown';
    organization?: FHIRReference;
    period?: FHIRPeriod;
  }>;

  /** Idiomas */
  communication?: Array<{
    language: FHIRCodeableConcept;
    preferred?: boolean;
  }>;

  /** Médico de família */
  generalPractitioner?: FHIRReference[];

  /** Organização responsável */
  managingOrganization?: FHIRReference;
}

/**
 * FHIR Observation Resource
 * Representa uma observação/exame
 * @see https://www.hl7.org/fhir/observation.html
 */
export interface FHIRObservation extends FHIRResource {
  resourceType: 'Observation';

  /** Identificadores */
  identifier?: FHIRIdentifier[];

  /** Baseado em */
  basedOn?: FHIRReference[];

  /** Status */
  status: 'registered' | 'preliminary' | 'final' | 'amended' | 'corrected' | 'cancelled' | 'entered-in-error' | 'unknown';

  /** Categoria (laboratorial, vital signs, etc.) */
  category?: FHIRCodeableConcept[];

  /** Código (LOINC) */
  code: FHIRCodeableConcept;

  /** Sujeito */
  subject?: FHIRReference;

  /** Encontro */
  encounter?: FHIRReference;

  /** Data/hora efetiva */
  effectiveDateTime?: string;
  effectivePeriod?: FHIRPeriod;
  effectiveInstant?: string;

  /** Data emissão */
  issued?: string;

  /** Executor */
  performer?: FHIRReference[];

  /** Valor */
  valueQuantity?: FHIRQuantity;
  valueCodeableConcept?: FHIRCodeableConcept;
  valueString?: string;
  valueBoolean?: boolean;
  valueInteger?: number;
  valueRange?: FHIRRange;
  valueRatio?: FHIRRatio;
  valueTime?: string;
  valueDateTime?: string;
  valuePeriod?: FHIRPeriod;

  /** Razão de ausência */
  dataAbsentReason?: FHIRCodeableConcept;

  /** Interpretação (alto, baixo, normal) */
  interpretation?: FHIRCodeableConcept[];

  /** Notas */
  note?: FHIRAnnotation[];

  /** Local do corpo */
  bodySite?: FHIRCodeableConcept;

  /** Método */
  method?: FHIRCodeableConcept;

  /** Amostra */
  specimen?: FHIRReference;

  /** Dispositivo */
  device?: FHIRReference;

  /** Valores de referência */
  referenceRange?: Array<{
    low?: FHIRQuantity;
    high?: FHIRQuantity;
    type?: FHIRCodeableConcept;
    appliesTo?: FHIRCodeableConcept[];
    age?: FHIRRange;
    text?: string;
  }>;

  /** Membros (para painéis) */
  hasMember?: FHIRReference[];

  /** Derivado de */
  derivedFrom?: FHIRReference[];

  /** Componentes */
  component?: Array<{
    code: FHIRCodeableConcept;
    valueQuantity?: FHIRQuantity;
    valueCodeableConcept?: FHIRCodeableConcept;
    valueString?: string;
    valueBoolean?: boolean;
    valueInteger?: number;
    valueRange?: FHIRRange;
    valueRatio?: FHIRRatio;
    valueTime?: string;
    valueDateTime?: string;
    valuePeriod?: FHIRPeriod;
    dataAbsentReason?: FHIRCodeableConcept;
    interpretation?: FHIRCodeableConcept[];
    referenceRange?: Array<{
      low?: FHIRQuantity;
      high?: FHIRQuantity;
      type?: FHIRCodeableConcept;
      appliesTo?: FHIRCodeableConcept[];
      age?: FHIRRange;
      text?: string;
    }>;
  }>;
}

/**
 * FHIR MedicationRequest Resource
 * Representa uma prescrição médica
 * @see https://www.hl7.org/fhir/medicationrequest.html
 */
export interface FHIRMedicationRequest extends FHIRResource {
  resourceType: 'MedicationRequest';

  /** Identificadores */
  identifier?: FHIRIdentifier[];

  /** Status */
  status: 'active' | 'on-hold' | 'cancelled' | 'completed' | 'entered-in-error' | 'stopped' | 'draft' | 'unknown';

  /** Razão do status */
  statusReason?: FHIRCodeableConcept;

  /** Intenção */
  intent: 'proposal' | 'plan' | 'order' | 'original-order' | 'reflex-order' | 'filler-order' | 'instance-order' | 'option';

  /** Categoria */
  category?: FHIRCodeableConcept[];

  /** Prioridade */
  priority?: 'routine' | 'urgent' | 'asap' | 'stat';

  /** Não realizar */
  doNotPerform?: boolean;

  /** Medicamento */
  medicationCodeableConcept?: FHIRCodeableConcept;
  medicationReference?: FHIRReference;

  /** Sujeito */
  subject: FHIRReference;

  /** Encontro */
  encounter?: FHIRReference;

  /** Informação de suporte */
  supportingInformation?: FHIRReference[];

  /** Data da prescrição */
  authoredOn?: string;

  /** Prescritor */
  requester?: FHIRReference;

  /** Executor */
  performer?: FHIRReference;

  /** Tipo de executor */
  performerType?: FHIRCodeableConcept;

  /** Registrador */
  recorder?: FHIRReference;

  /** Motivo */
  reasonCode?: FHIRCodeableConcept[];
  reasonReference?: FHIRReference[];

  /** Baseado em */
  basedOn?: FHIRReference[];

  /** Tipo de curso de terapia */
  courseOfTherapyType?: FHIRCodeableConcept;

  /** Seguros */
  insurance?: FHIRReference[];

  /** Notas */
  note?: FHIRAnnotation[];

  /** Instruções de dosagem */
  dosageInstruction?: FHIRDosage[];

  /** Requisição de dispensação */
  dispenseRequest?: {
    initialFill?: {
      quantity?: FHIRQuantity;
      duration?: FHIRQuantity;
    };
    dispenseInterval?: FHIRQuantity;
    validityPeriod?: FHIRPeriod;
    numberOfRepeatsAllowed?: number;
    quantity?: FHIRQuantity;
    expectedSupplyDuration?: FHIRQuantity;
    performer?: FHIRReference;
  };

  /** Substituição */
  substitution?: {
    allowedBoolean?: boolean;
    allowedCodeableConcept?: FHIRCodeableConcept;
    reason?: FHIRCodeableConcept;
  };

  /** Prescrição anterior */
  priorPrescription?: FHIRReference;

  /** Problemas detectados */
  detectedIssue?: FHIRReference[];

  /** Histórico de eventos */
  eventHistory?: FHIRReference[];
}

/**
 * FHIR CarePlan Resource
 * Representa um plano de cuidados
 * @see https://www.hl7.org/fhir/careplan.html
 */
export interface FHIRCarePlan extends FHIRResource {
  resourceType: 'CarePlan';

  /** Identificadores */
  identifier?: FHIRIdentifier[];

  /** Instâncias canônicas */
  instantiatesCanonical?: string[];
  instantiatesUri?: string[];

  /** Baseado em */
  basedOn?: FHIRReference[];

  /** Substitui */
  replaces?: FHIRReference[];

  /** Parte de */
  partOf?: FHIRReference[];

  /** Status */
  status: 'draft' | 'active' | 'on-hold' | 'revoked' | 'completed' | 'entered-in-error' | 'unknown';

  /** Intenção */
  intent: 'proposal' | 'plan' | 'order' | 'option';

  /** Categoria */
  category?: FHIRCodeableConcept[];

  /** Título */
  title?: string;

  /** Descrição */
  description?: string;

  /** Sujeito */
  subject: FHIRReference;

  /** Encontro */
  encounter?: FHIRReference;

  /** Período */
  period?: FHIRPeriod;

  /** Data de criação */
  created?: string;

  /** Autor */
  author?: FHIRReference;

  /** Contribuidores */
  contributor?: FHIRReference[];

  /** Equipe de cuidado */
  careTeam?: FHIRReference[];

  /** Condições abordadas */
  addresses?: FHIRReference[];

  /** Informação de suporte */
  supportingInfo?: FHIRReference[];

  /** Metas */
  goal?: FHIRReference[];

  /** Atividades */
  activity?: Array<{
    outcomeCodeableConcept?: FHIRCodeableConcept[];
    outcomeReference?: FHIRReference[];
    progress?: FHIRAnnotation[];
    reference?: FHIRReference;
    detail?: {
      kind?: 'Appointment' | 'CommunicationRequest' | 'DeviceRequest' | 'MedicationRequest' | 'NutritionOrder' | 'Task' | 'ServiceRequest' | 'VisionPrescription';
      instantiatesCanonical?: string[];
      instantiatesUri?: string[];
      code?: FHIRCodeableConcept;
      reasonCode?: FHIRCodeableConcept[];
      reasonReference?: FHIRReference[];
      goal?: FHIRReference[];
      status: 'not-started' | 'scheduled' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled' | 'stopped' | 'unknown' | 'entered-in-error';
      statusReason?: FHIRCodeableConcept;
      doNotPerform?: boolean;
      scheduledTiming?: FHIRTiming;
      scheduledPeriod?: FHIRPeriod;
      scheduledString?: string;
      location?: FHIRReference;
      performer?: FHIRReference[];
      productCodeableConcept?: FHIRCodeableConcept;
      productReference?: FHIRReference;
      dailyAmount?: FHIRQuantity;
      quantity?: FHIRQuantity;
      description?: string;
    };
  }>;

  /** Notas */
  note?: FHIRAnnotation[];
}

/**
 * FHIR DiagnosticReport Resource
 * Representa um laudo de exame
 * @see https://www.hl7.org/fhir/diagnosticreport.html
 */
export interface FHIRDiagnosticReport extends FHIRResource {
  resourceType: 'DiagnosticReport';

  /** Identificadores */
  identifier?: FHIRIdentifier[];

  /** Baseado em */
  basedOn?: FHIRReference[];

  /** Status */
  status: 'registered' | 'partial' | 'preliminary' | 'final' | 'amended' | 'corrected' | 'appended' | 'cancelled' | 'entered-in-error' | 'unknown';

  /** Categoria */
  category?: FHIRCodeableConcept[];

  /** Código */
  code: FHIRCodeableConcept;

  /** Sujeito */
  subject?: FHIRReference;

  /** Encontro */
  encounter?: FHIRReference;

  /** Data efetiva */
  effectiveDateTime?: string;
  effectivePeriod?: FHIRPeriod;

  /** Data emissão */
  issued?: string;

  /** Executor */
  performer?: FHIRReference[];

  /** Intérprete */
  resultsInterpreter?: FHIRReference[];

  /** Amostras */
  specimen?: FHIRReference[];

  /** Resultados (Observations) */
  result?: FHIRReference[];

  /** Estudos de imagem */
  imagingStudy?: FHIRReference[];

  /** Mídia */
  media?: Array<{
    comment?: string;
    link: FHIRReference;
  }>;

  /** Conclusão textual */
  conclusion?: string;

  /** Conclusão codificada */
  conclusionCode?: FHIRCodeableConcept[];

  /** Documento apresentado */
  presentedForm?: Array<{
    contentType?: string;
    language?: string;
    data?: string;
    url?: string;
    size?: number;
    hash?: string;
    title?: string;
    creation?: string;
  }>;
}

/**
 * FHIR Procedure Resource
 * Representa um procedimento realizado
 * @see https://www.hl7.org/fhir/procedure.html
 */
export interface FHIRProcedure extends FHIRResource {
  resourceType: 'Procedure';

  /** Identificadores */
  identifier?: FHIRIdentifier[];

  /** Instâncias canônicas */
  instantiatesCanonical?: string[];
  instantiatesUri?: string[];

  /** Baseado em */
  basedOn?: FHIRReference[];

  /** Parte de */
  partOf?: FHIRReference[];

  /** Status */
  status: 'preparation' | 'in-progress' | 'not-done' | 'on-hold' | 'stopped' | 'completed' | 'entered-in-error' | 'unknown';

  /** Razão do status */
  statusReason?: FHIRCodeableConcept;

  /** Categoria */
  category?: FHIRCodeableConcept;

  /** Código */
  code?: FHIRCodeableConcept;

  /** Sujeito */
  subject: FHIRReference;

  /** Encontro */
  encounter?: FHIRReference;

  /** Data realizada */
  performedDateTime?: string;
  performedPeriod?: FHIRPeriod;
  performedString?: string;
  performedAge?: FHIRQuantity;
  performedRange?: FHIRRange;

  /** Registrador */
  recorder?: FHIRReference;

  /** Assertor */
  asserter?: FHIRReference;

  /** Executores */
  performer?: Array<{
    function?: FHIRCodeableConcept;
    actor: FHIRReference;
    onBehalfOf?: FHIRReference;
  }>;

  /** Local */
  location?: FHIRReference;

  /** Motivos */
  reasonCode?: FHIRCodeableConcept[];
  reasonReference?: FHIRReference[];

  /** Locais do corpo */
  bodySite?: FHIRCodeableConcept[];

  /** Resultado */
  outcome?: FHIRCodeableConcept;

  /** Relatórios */
  report?: FHIRReference[];

  /** Complicações */
  complication?: FHIRCodeableConcept[];
  complicationDetail?: FHIRReference[];

  /** Acompanhamento */
  followUp?: FHIRCodeableConcept[];

  /** Notas */
  note?: FHIRAnnotation[];

  /** Dispositivo focal */
  focalDevice?: Array<{
    action?: FHIRCodeableConcept;
    manipulated: FHIRReference;
  }>;

  /** Itens usados */
  usedReference?: FHIRReference[];
  usedCode?: FHIRCodeableConcept[];
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Union de todos os tipos de recursos FHIR
 */
export type FHIRAnyResource =
  | FHIRPatient
  | FHIRCondition
  | FHIRMedication
  | FHIRMedicationStatement
  | FHIRMedicationRequest
  | FHIRObservation
  | FHIRCarePlan
  | FHIRDiagnosticReport
  | FHIRProcedure
  | FHIRBundle;

export type FHIRResourceType = FHIRAnyResource['resourceType'];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Cria um FHIRCoding
 */
export function createFHIRCoding(
  system: string,
  code: string,
  display?: string
): FHIRCoding {
  return { system, code, display };
}

/**
 * Cria um FHIRCodeableConcept
 */
export function createFHIRCodeableConcept(
  codings: FHIRCoding[],
  text?: string
): FHIRCodeableConcept {
  return { coding: codings, text };
}

/**
 * Cria uma referência FHIR
 */
export function createFHIRReference(
  resourceType: string,
  id: string,
  display?: string
): FHIRReference {
  return {
    reference: `${resourceType}/${id}`,
    display,
  };
}

/**
 * Cria uma quantidade FHIR
 */
export function createFHIRQuantity(
  value: number,
  unit: string,
  system: string = FHIR_CODE_SYSTEMS.UCUM,
  code?: string
): FHIRQuantity {
  return { value, unit, system, code: code || unit };
}

/**
 * Cria um identificador FHIR
 */
export function createFHIRIdentifier(
  system: string,
  value: string,
  use: FHIRIdentifier['use'] = 'official'
): FHIRIdentifier {
  return { system, value, use };
}

/**
 * Valida se um recurso FHIR é válido
 */
export function isValidFHIRResource(resource: unknown): resource is FHIRAnyResource {
  if (!resource || typeof resource !== 'object') return false;
  const r = resource as Record<string, unknown>;
  return typeof r.resourceType === 'string' && r.resourceType.length > 0;
}

/**
 * Extrai códigos de um CodeableConcept
 */
export function extractCodes(concept?: FHIRCodeableConcept): string[] {
  if (!concept?.coding) return [];
  return concept.coding
    .filter((c): c is FHIRCoding & { code: string } => typeof c.code === 'string')
    .map(c => c.code);
}

/**
 * Busca código por sistema
 */
export function findCodeBySystem(
  concept: FHIRCodeableConcept | undefined,
  system: string
): string | undefined {
  return concept?.coding?.find(c => c.system === system)?.code;
}

