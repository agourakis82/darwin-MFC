/**
 * FHIR Observation Resource Builder
 * Construtor fluente para criar recursos Observation FHIR R4
 * @see https://www.hl7.org/fhir/observation.html
 */

import type {
  FHIRObservation,
  FHIRQuantity,
  FHIRCodeableConcept,
  FHIRPeriod,
  FHIRReference,
} from './types';
import { FHIR_CODE_SYSTEMS } from './types';

/**
 * Builder fluente para observações FHIR
 */
export class ObservationBuilder {
  private observation: FHIRObservation;

  constructor(id?: string) {
    this.observation = {
      resourceType: 'Observation',
      id: id || `observation-${Date.now()}`,
      status: 'final',
    };
  }

  /**
   * Define status da observação
   */
  setStatus(
    status: 'registered' | 'preliminary' | 'final' | 'amended' | 'corrected' | 'cancelled' | 'entered-in-error' | 'unknown'
  ): this {
    this.observation.status = status;
    return this;
  }

  /**
   * Adiciona categoria
   */
  addCategory(code: string, display?: string, system?: string): this {
    if (!this.observation.category) {
      this.observation.category = [];
    }

    this.observation.category.push({
      coding: [
        {
          system: system || FHIR_CODE_SYSTEMS.OBSERVATION_CATEGORY,
          code,
          display: display || code,
        },
      ],
      text: display || code,
    });

    return this;
  }

  /**
   * Adiciona categoria de sinais vitais
   */
  addVitalSignsCategory(): this {
    return this.addCategory('vital-signs', 'Vital Signs', FHIR_CODE_SYSTEMS.OBSERVATION_CATEGORY);
  }

  /**
   * Adiciona categoria de laboratório
   */
  addLaboratoryCategory(): this {
    return this.addCategory('laboratory', 'Laboratory', FHIR_CODE_SYSTEMS.OBSERVATION_CATEGORY);
  }

  /**
   * Define código da observação (LOINC, SNOMED-CT, etc.)
   */
  setCode(code: string, display?: string, system?: string): this {
    this.observation.code = {
      coding: [
        {
          system: system || FHIR_CODE_SYSTEMS.LOINC,
          code,
          display: display || code,
        },
      ],
      text: display || code,
    };
    return this;
  }

  /**
   * Define código usando LOINC
   */
  setCodeLOINC(loincCode: string, display?: string): this {
    return this.setCode(loincCode, display, FHIR_CODE_SYSTEMS.LOINC);
  }

  /**
   * Define código usando SNOMED-CT
   */
  setCodeSNOMED(snomedCode: string, display?: string): this {
    return this.setCode(snomedCode, display, FHIR_CODE_SYSTEMS.SNOMED_CT);
  }

  /**
   * Define sujeito (paciente)
   */
  setSubject(patientId: string, display?: string): this {
    this.observation.subject = {
      reference: `Patient/${patientId}`,
      display: display || `Patient/${patientId}`,
    };
    return this;
  }

  /**
   * Define encontro (encounter)
   */
  setEncounter(encounterId: string, display?: string): this {
    this.observation.encounter = {
      reference: `Encounter/${encounterId}`,
      display: display || `Encounter/${encounterId}`,
    };
    return this;
  }

  /**
   * Define data efetiva (DateTime)
   */
  setEffectiveDateTime(dateTime: string | Date): this {
    if (dateTime instanceof Date) {
      this.observation.effectiveDateTime = dateTime.toISOString();
    } else {
      this.observation.effectiveDateTime = dateTime;
    }
    return this;
  }

  /**
   * Define data efetiva (Período)
   */
  setEffectivePeriod(start: string | Date, end?: string | Date): this {
    const period: FHIRPeriod = {};

    if (start instanceof Date) {
      period.start = start.toISOString();
    } else {
      period.start = start;
    }

    if (end) {
      if (end instanceof Date) {
        period.end = end.toISOString();
      } else {
        period.end = end;
      }
    }

    this.observation.effectivePeriod = period;
    return this;
  }

  /**
   * Define data emitida
   */
  setIssued(dateTime: string | Date): this {
    if (dateTime instanceof Date) {
      this.observation.issued = dateTime.toISOString();
    } else {
      this.observation.issued = dateTime;
    }
    return this;
  }

  /**
   * Adiciona responsável
   */
  addPerformer(reference: string, display?: string): this {
    if (!this.observation.performer) {
      this.observation.performer = [];
    }

    this.observation.performer.push({
      reference,
      display: display || reference,
    });

    return this;
  }

  /**
   * Define valor numérico (Quantidade)
   */
  setValueQuantity(value: number, code: string, system?: string, display?: string): this {
    this.observation.valueQuantity = {
      value,
      code,
      system: system || 'http://unitsofmeasure.org',
      unit: display || code,
    };
    return this;
  }

  /**
   * Define valor como texto
   */
  setValueString(value: string): this {
    this.observation.valueString = value;
    return this;
  }

  /**
   * Define valor booleano
   */
  setValueBoolean(value: boolean): this {
    this.observation.valueBoolean = value;
    return this;
  }

  /**
   * Define valor inteiro
   */
  setValueInteger(value: number): this {
    this.observation.valueInteger = value;
    return this;
  }

  /**
   * Define valor como conceito codificado
   */
  setValueCodeableConcept(code: string, display?: string, system?: string): this {
    this.observation.valueCodeableConcept = {
      coding: [
        {
          system: system || FHIR_CODE_SYSTEMS.SNOMED_CT,
          code,
          display: display || code,
        },
      ],
      text: display || code,
    };
    return this;
  }

  /**
   * Define valor como intervalo
   */
  setValueRange(
    low: { value: number; unit?: string; code?: string },
    high: { value: number; unit?: string; code?: string }
  ): this {
    this.observation.valueRange = {
      low: {
        value: low.value,
        unit: low.unit,
        code: low.code,
      },
      high: {
        value: high.value,
        unit: high.unit,
        code: high.code,
      },
    };
    return this;
  }

  /**
   * Define motivo da observação ausente
   */
  setDataAbsentReason(code: string, display?: string): this {
    this.observation.dataAbsentReason = {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/data-absent-reason',
          code,
          display: display || code,
        },
      ],
      text: display || code,
    };
    return this;
  }

  /**
   * Adiciona interpretação
   */
  addInterpretation(code: string, display?: string): this {
    if (!this.observation.interpretation) {
      this.observation.interpretation = [];
    }

    this.observation.interpretation.push({
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
          code,
          display: display || code,
        },
      ],
      text: display || code,
    });

    return this;
  }

  /**
   * Adiciona nota
   */
  addNote(text: string, authorId?: string): this {
    if (!this.observation.note) {
      this.observation.note = [];
    }

    const note: any = {
      text,
      time: new Date().toISOString(),
    };

    if (authorId) {
      note.authorReference = {
        reference: `Practitioner/${authorId}`,
      };
    }

    this.observation.note.push(note);
    return this;
  }

  /**
   * Define método de observação
   */
  setMethod(code: string, display?: string): this {
    this.observation.method = {
      coding: [
        {
          system: FHIR_CODE_SYSTEMS.SNOMED_CT,
          code,
          display: display || code,
        },
      ],
      text: display || code,
    };
    return this;
  }

  /**
   * Define sítio do corpo
   */
  setBodySite(code: string, display?: string): this {
    this.observation.bodySite = {
      coding: [
        {
          system: FHIR_CODE_SYSTEMS.SNOMED_CT,
          code,
          display: display || code,
        },
      ],
      text: display || code,
    };
    return this;
  }

  /**
   * Define dispositivo
   */
  setDevice(deviceId: string, display?: string): this {
    this.observation.device = {
      reference: `Device/${deviceId}`,
      display: display || `Device/${deviceId}`,
    };
    return this;
  }

  /**
   * Adiciona intervalo de referência
   */
  addReferenceRange(
    rangeObj: {
      low?: { value: number; unit?: string; code?: string };
      high?: { value: number; unit?: string; code?: string };
      text?: string;
      appliesTo?: string[];
    }
  ): this {
    if (!this.observation.referenceRange) {
      this.observation.referenceRange = [];
    }

    const range: any = {};

    if (rangeObj.low) {
      range.low = {
        value: rangeObj.low.value,
        unit: rangeObj.low.unit,
        code: rangeObj.low.code,
      };
    }

    if (rangeObj.high) {
      range.high = {
        value: rangeObj.high.value,
        unit: rangeObj.high.unit,
        code: rangeObj.high.code,
      };
    }

    if (rangeObj.text) {
      range.text = rangeObj.text;
    }

    if (rangeObj.appliesTo && rangeObj.appliesTo.length > 0) {
      range.appliesTo = rangeObj.appliesTo.map((applies) => ({
        text: applies,
      }));
    }

    this.observation.referenceRange.push(range);
    return this;
  }

  /**
   * Adiciona observação relacionada
   */
  addHasMember(reference: string): this {
    if (!this.observation.hasMember) {
      this.observation.hasMember = [];
    }

    this.observation.hasMember.push({
      reference,
    });

    return this;
  }

  /**
   * Adiciona referência para recurso derivado
   */
  addDerivedFrom(reference: string): this {
    if (!this.observation.derivedFrom) {
      this.observation.derivedFrom = [];
    }

    this.observation.derivedFrom.push({
      reference,
    });

    return this;
  }

  /**
   * Adiciona componente (para observações agrupadas)
   */
  addComponent(
    componentObj: {
      code: string;
      display?: string;
      codeSystem?: string;
      valueQuantity?: { value: number; unit?: string; code?: string };
      valueString?: string;
      valueCodeableConcept?: { code: string; display?: string };
    }
  ): this {
    if (!this.observation.component) {
      this.observation.component = [];
    }

    const component: any = {
      code: {
        coding: [
          {
            system: componentObj.codeSystem || FHIR_CODE_SYSTEMS.LOINC,
            code: componentObj.code,
            display: componentObj.display || componentObj.code,
          },
        ],
        text: componentObj.display || componentObj.code,
      },
    };

    if (componentObj.valueQuantity) {
      component.valueQuantity = {
        value: componentObj.valueQuantity.value,
        unit: componentObj.valueQuantity.unit,
        code: componentObj.valueQuantity.code,
      };
    }

    if (componentObj.valueString) {
      component.valueString = componentObj.valueString;
    }

    if (componentObj.valueCodeableConcept) {
      component.valueCodeableConcept = {
        coding: [
          {
            system: FHIR_CODE_SYSTEMS.SNOMED_CT,
            code: componentObj.valueCodeableConcept.code,
            display: componentObj.valueCodeableConcept.display,
          },
        ],
        text: componentObj.valueCodeableConcept.display || componentObj.valueCodeableConcept.code,
      };
    }

    this.observation.component.push(component);
    return this;
  }

  /**
   * Retorna a observação FHIR
   */
  build(): FHIRObservation {
    return this.observation;
  }

  /**
   * Retorna a observação FHIR como JSON
   */
  toJSON(): string {
    return JSON.stringify(this.observation, null, 2);
  }

  /**
   * Retorna cópia da observação
   */
  clone(): ObservationBuilder {
    const builder = new ObservationBuilder(this.observation.id);
    builder.observation = JSON.parse(JSON.stringify(this.observation));
    return builder;
  }
}

/**
 * Cria um novo builder de observação
 */
export function createObservation(id?: string): ObservationBuilder {
  return new ObservationBuilder(id);
}

/**
 * Exemplo de uso:
 *
 * // Observação de pressão arterial
 * const bpObservation = createObservation('obs-bp-123')
 *   .addVitalSignsCategory()
 *   .setCodeLOINC('85354-9', 'Blood Pressure Panel')
 *   .setSubject('patient-123')
 *   .setEffectiveDateTime(new Date())
 *   .addComponent({
 *     code: '8480-6',
 *     display: 'Systolic Blood Pressure',
 *     valueQuantity: { value: 120, unit: 'mmHg', code: 'mm[Hg]' },
 *   })
 *   .addComponent({
 *     code: '8462-4',
 *     display: 'Diastolic Blood Pressure',
 *     valueQuantity: { value: 80, unit: 'mmHg', code: 'mm[Hg]' },
 *   })
 *   .addInterpretation('N', 'Normal')
 *   .build();
 *
 * // Observação de peso
 * const weightObservation = createObservation('obs-weight-123')
 *   .addVitalSignsCategory()
 *   .setCodeLOINC('29463-7', 'Body weight')
 *   .setSubject('patient-123')
 *   .setEffectiveDateTime(new Date())
 *   .setValueQuantity(75.5, 'kg', 'http://unitsofmeasure.org', 'kg')
 *   .addReferenceRange({
 *     low: { value: 50, unit: 'kg' },
 *     high: { value: 100, unit: 'kg' },
 *     text: 'Normal weight for adults',
 *   })
 *   .build();
 */
