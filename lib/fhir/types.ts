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
 * FHIR Patient Resource
 * Representa um paciente
 * @see https://www.hl7.org/fhir/patient.html
 */
export interface FHIRPatient extends FHIRResource {
  resourceType: 'Patient';

  /** Identificadores (CPF, CNH, etc.) */
  identifier?: Array<{
    system?: string;
    type?: FHIRCodeableConcept;
    value?: string;
    period?: FHIRPeriod;
  }>;

  /** Ativo/Inativo */
  active?: boolean;

  /** Nome(s) */
  name?: Array<{
    use?: 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden';
    text?: string;
    family?: string;
    given?: string[];
    prefix?: string[];
    suffix?: string[];
    period?: FHIRPeriod;
  }>;

  /** Telefones */
  telecom?: Array<{
    system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
    value?: string;
    use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
    period?: FHIRPeriod;
  }>;

  /** Gênero/Sexo */
  gender?: 'male' | 'female' | 'other' | 'unknown';

  /** Data de nascimento */
  birthDate?: string; // ISO 8601 date

  /** Falecido */
  deceasedBoolean?: boolean;
  deceasedDateTime?: string;

  /** Endereço(s) */
  address?: Array<{
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
  }>;

  /** Estrutura familiar (casado, solteiro, etc.) */
  maritalStatus?: FHIRCodeableConcept;

  /** Múltiplos nascimentos */
  multipleBirthBoolean?: boolean;
  multipleBirthInteger?: number;

  /** Foto */
  photo?: Array<{
    contentType?: string;
    language?: string;
    data?: string; // base64
    url?: string;
    size?: number;
    title?: string;
    creation?: string;
    height?: number;
    width?: number;
    frames?: number;
    duration?: number;
  }>;

  /** Contatos */
  contact?: Array<{
    relationship?: FHIRCodeableConcept[];
    name?: {
      use?: 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden';
      text?: string;
      family?: string;
      given?: string[];
      prefix?: string[];
      suffix?: string[];
      period?: FHIRPeriod;
    };
    telecom?: Array<{
      system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
      value?: string;
      use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
      period?: FHIRPeriod;
    }>;
    address?: {
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
    };
    gender?: 'male' | 'female' | 'other' | 'unknown';
    organization?: FHIRReference;
    period?: FHIRPeriod;
  }>;

  /** Língua */
  communication?: Array<{
    language?: FHIRCodeableConcept;
    preferred?: boolean;
  }>;

  /** Cuidador geral */
  generalPractitioner?: FHIRReference[];

  /** Organização responsável */
  managingOrganization?: FHIRReference;

  /** Elos com outros pacientes */
  link?: Array<{
    other?: FHIRReference;
    type?: 'replaced-by' | 'replaces' | 'refer' | 'seealso';
  }>;
}

/**
 * FHIR Observation Resource
 * Representa medições, testes, achados clínicos
 * @see https://www.hl7.org/fhir/observation.html
 */
export interface FHIRObservation extends FHIRResource {
  resourceType: 'Observation';

  /** Identificadores */
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;

  /** Status (final, preliminary, amended, corrected, cancelled, etc.) */
  status: 'registered' | 'preliminary' | 'final' | 'amended' | 'corrected' | 'cancelled' | 'entered-in-error' | 'unknown';

  /** Categorias (laboratory, vital-signs, imaging, social-history, etc.) */
  category?: FHIRCodeableConcept[];

  /** Código da observação (LOINC, SNOMED-CT) */
  code?: FHIRCodeableConcept;

  /** Sujeito (Paciente) */
  subject?: FHIRReference;

  /** Encontro (Encounter) */
  encounter?: FHIRReference;

  /** Data efetiva */
  effectiveDateTime?: string;
  effectivePeriod?: FHIRPeriod;
  effectiveInstant?: string;
  effectiveTiming?: {
    repeat?: {
      frequency?: number;
      period?: number;
      periodUnit?: 's' | 'min' | 'h' | 'd' | 'wk' | 'mo' | 'a';
    };
  };

  /** Data emitida */
  issued?: string;

  /** Responsável */
  performer?: FHIRReference[];

  /** Valores (numérico, texto, quantidade, proporção, sampledData, etc.) */
  valueQuantity?: FHIRQuantity;
  valueCodeableConcept?: FHIRCodeableConcept;
  valueString?: string;
  valueBoolean?: boolean;
  valueInteger?: number;
  valueRange?: {
    low?: FHIRQuantity;
    high?: FHIRQuantity;
  };
  valueRatio?: FHIRRatio;
  valueSampledData?: {
    origin?: FHIRQuantity;
    period?: number;
    factor?: number;
    lowerLimit?: number;
    upperLimit?: number;
    dimensions: number;
    data?: string;
  };
  valueTime?: string;
  valueDateTime?: string;
  valuePeriod?: FHIRPeriod;

  /** Motivo da observação ausente */
  dataAbsentReason?: FHIRCodeableConcept;

  /** Interpretação (normal, abnormal, low, high, etc.) */
  interpretation?: FHIRCodeableConcept[];

  /** Notas */
  note?: Array<{
    text?: string;
    time?: string;
    authorReference?: FHIRReference;
    authorString?: string;
  }>;

  /** Método de observação */
  method?: FHIRCodeableConcept;

  /** Corpo afetado */
  bodySite?: FHIRCodeableConcept;

  /** Orientação do sítio */
  bodySiteReference?: FHIRReference;

  /** Técnica */
  technique?: FHIRCodeableConcept;

  /** Dispositivo */
  device?: FHIRReference;

  /** Referência para outro recurso */
  referenceRange?: Array<{
    low?: FHIRQuantity;
    high?: FHIRQuantity;
    type?: FHIRCodeableConcept;
    appliesTo?: FHIRCodeableConcept[];
    age?: {
      low?: FHIRQuantity;
      high?: FHIRQuantity;
    };
    text?: string;
  }>;

  /** Observações relacionadas */
  hasMember?: FHIRReference[];
  derivedFrom?: FHIRReference[];

  /** Componentes (para observações groupadas) */
  component?: Array<{
    code?: FHIRCodeableConcept;
    valueQuantity?: FHIRQuantity;
    valueCodeableConcept?: FHIRCodeableConcept;
    valueString?: string;
    valueBoolean?: boolean;
    valueInteger?: number;
    valueRange?: {
      low?: FHIRQuantity;
      high?: FHIRQuantity;
    };
    valueRatio?: FHIRRatio;
    valueSampledData?: {
      origin?: FHIRQuantity;
      period?: number;
      factor?: number;
      lowerLimit?: number;
      upperLimit?: number;
      dimensions: number;
      data?: string;
    };
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
      age?: {
        low?: FHIRQuantity;
        high?: FHIRQuantity;
      };
      text?: string;
    }>;
  }>;
}

/**
 * FHIR Encounter Resource
 * Representa um encontro/episódio de cuidado
 * @see https://www.hl7.org/fhir/encounter.html
 */
export interface FHIREncounter extends FHIRResource {
  resourceType: 'Encounter';

  /** Identificadores */
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;

  /** Status */
  status: 'planned' | 'in-progress' | 'onhold' | 'discharged' | 'completed' | 'cancelled' | 'entered-in-error' | 'unknown';

  /** Classe (inpatient, outpatient, ambulatory, emergency, etc.) */
  class?: {
    system?: string;
    code?: string;
    display?: string;
  };

  /** Tipos de encontro */
  type?: FHIRCodeableConcept[];

  /** Razão/Motivo */
  reasonCode?: FHIRCodeableConcept[];
  reasonReference?: FHIRReference[];

  /** Prioridade */
  priority?: FHIRCodeableConcept;

  /** Sujeito (Paciente) */
  subject?: FHIRReference;

  /** Encontro anterior (relacionado) */
  partOf?: FHIRReference;

  /** Participantes */
  participant?: Array<{
    type?: FHIRCodeableConcept[];
    period?: FHIRPeriod;
    individual?: FHIRReference;
  }>;

  /** Data de agendamento */
  appointment?: FHIRReference[];

  /** Período */
  period?: FHIRPeriod;

  /** Duração */
  length?: FHIRQuantity;

  /** Diagnósticos */
  diagnosis?: Array<{
    condition?: FHIRReference;
    use?: FHIRCodeableConcept;
    rank?: number;
  }>;

  /** Localização */
  location?: Array<{
    location?: FHIRReference;
    status?: 'planned' | 'active' | 'reserved' | 'completed';
    physicalType?: FHIRCodeableConcept;
    period?: FHIRPeriod;
  }>;

  /** Organização responsável */
  serviceProvider?: FHIRReference;

  /** Encontro anterior */
  partOfEncounter?: FHIRReference;
}

/**
 * FHIR Bundle Resource
 * Container para múltiplos recursos FHIR
 * @see https://www.hl7.org/fhir/bundle.html
 */
export interface FHIRBundle extends FHIRResource {
  resourceType: 'Bundle';
  type: 'document' | 'message' | 'transaction' | 'transaction-response' | 'batch' | 'batch-response' | 'history' | 'searchset' | 'collection';
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

  // Laboratório
  LOINC: 'http://loinc.org',

  // Identificadores
  CPF: 'http://darwin-mfc.org/fhir/identifier/cpf',
  CNH: 'http://darwin-mfc.org/fhir/identifier/cnh',
  PASSPORT: 'http://darwin-mfc.org/fhir/identifier/passport',

  // Paciente
  GENDER: 'http://hl7.org/fhir/administrative-gender',
  MARITAL_STATUS: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',

  // Observações
  OBSERVATION_CATEGORY: 'http://terminology.hl7.org/CodeSystem/observation-category',
  VITAL_SIGNS: 'http://terminology.hl7.org/CodeSystem/observation-category',

  // Sinais vitais
  BP: '8480-6', // Blood Pressure (LOINC)
  HEART_RATE: '8867-4', // Heart rate (LOINC)
  RESPIRATORY_RATE: '9279-1', // Respiratory rate (LOINC)
  BODY_TEMPERATURE: '8310-5', // Body temperature (LOINC)
  BODY_HEIGHT: '8302-2', // Body height (LOINC)
  BODY_WEIGHT: '29463-7', // Body weight (LOINC)
  BMI: '39156-5', // Body Mass Index (LOINC)

  // Encontros
  ENCOUNTER_CLASS: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
  ENCOUNTER_STATUS: 'http://hl7.org/fhir/encounter-status',
  ENCOUNTER_TYPE: 'http://terminology.hl7.org/CodeSystem/encounter-type',
} as const;

