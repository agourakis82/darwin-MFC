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
} as const;

