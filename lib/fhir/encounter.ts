/**
 * FHIR Encounter Resource Builder
 * Construtor fluente para criar recursos Encounter FHIR R4
 * @see https://www.hl7.org/fhir/encounter.html
 */

import type {
  FHIREncounter,
  FHIRCodeableConcept,
  FHIRPeriod,
  FHIRReference,
  FHIRQuantity,
} from './types';
import { FHIR_CODE_SYSTEMS } from './types';

/**
 * Builder fluente para encontros/episódios de cuidado FHIR
 */
export class EncounterBuilder {
  private encounter: FHIREncounter;

  constructor(id?: string) {
    this.encounter = {
      resourceType: 'Encounter',
      id: id || `encounter-${Date.now()}`,
      status: 'completed',
    };
  }

  /**
   * Define status do encontro
   */
  setStatus(
    status: 'planned' | 'in-progress' | 'onhold' | 'discharged' | 'completed' | 'cancelled' | 'entered-in-error' | 'unknown'
  ): this {
    this.encounter.status = status;
    return this;
  }

  /**
   * Define classe do encontro
   */
  setClass(
    code: 'AMB' | 'EMER' | 'IMP' | 'OBSENC' | 'PRENC' | 'SS' | 'VR',
    display?: string
  ): this {
    const displays: Record<string, string> = {
      AMB: 'Ambulatory',
      EMER: 'Emergency',
      IMP: 'Inpatient',
      OBSENC: 'Obstetric Encounter',
      PRENC: 'Pre-admission',
      SS: 'Short Stay',
      VR: 'Virtual',
    };

    this.encounter.class = {
      system: FHIR_CODE_SYSTEMS.ENCOUNTER_CLASS,
      code,
      display: display || displays[code] || code,
    };

    return this;
  }

  /**
   * Define classe como ambulatório
   */
  setClassAmbulatory(): this {
    return this.setClass('AMB', 'Ambulatory');
  }

  /**
   * Define classe como emergência
   */
  setClassEmergency(): this {
    return this.setClass('EMER', 'Emergency');
  }

  /**
   * Define classe como internação
   */
  setClassInpatient(): this {
    return this.setClass('IMP', 'Inpatient');
  }

  /**
   * Adiciona tipo de encontro
   */
  addType(code: string, display?: string): this {
    if (!this.encounter.type) {
      this.encounter.type = [];
    }

    this.encounter.type.push({
      coding: [
        {
          system: FHIR_CODE_SYSTEMS.ENCOUNTER_TYPE,
          code,
          display: display || code,
        },
      ],
      text: display || code,
    });

    return this;
  }

  /**
   * Adiciona razão/motivo do encontro
   */
  addReasonCode(code: string, display?: string): this {
    if (!this.encounter.reasonCode) {
      this.encounter.reasonCode = [];
    }

    this.encounter.reasonCode.push({
      coding: [
        {
          system: FHIR_CODE_SYSTEMS.ICD10,
          code,
          display: display || code,
        },
      ],
      text: display || code,
    });

    return this;
  }

  /**
   * Adiciona razão por referência (Condition, etc.)
   */
  addReasonReference(reference: string): this {
    if (!this.encounter.reasonReference) {
      this.encounter.reasonReference = [];
    }

    this.encounter.reasonReference.push({
      reference,
    });

    return this;
  }

  /**
   * Define prioridade
   */
  setPriority(code: string, display?: string): this {
    this.encounter.priority = {
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
   * Define sujeito (paciente)
   */
  setSubject(patientId: string, display?: string): this {
    this.encounter.subject = {
      reference: `Patient/${patientId}`,
      display: display || `Patient/${patientId}`,
    };

    return this;
  }

  /**
   * Adiciona participante
   */
  addParticipant(
    participantObj: {
      individualId?: string;
      type?: string;
      startDate?: string | Date;
      endDate?: string | Date;
    }
  ): this {
    if (!this.encounter.participant) {
      this.encounter.participant = [];
    }

    const participant: any = {};

    if (participantObj.type) {
      participant.type = [
        {
          coding: [
            {
              system: FHIR_CODE_SYSTEMS.SNOMED_CT,
              code: participantObj.type,
            },
          ],
        },
      ];
    }

    if (participantObj.startDate || participantObj.endDate) {
      const period: FHIRPeriod = {};

      if (participantObj.startDate) {
        if (participantObj.startDate instanceof Date) {
          period.start = participantObj.startDate.toISOString();
        } else {
          period.start = participantObj.startDate;
        }
      }

      if (participantObj.endDate) {
        if (participantObj.endDate instanceof Date) {
          period.end = participantObj.endDate.toISOString();
        } else {
          period.end = participantObj.endDate;
        }
      }

      participant.period = period;
    }

    if (participantObj.individualId) {
      participant.individual = {
        reference: `Practitioner/${participantObj.individualId}`,
      };
    }

    this.encounter.participant.push(participant);
    return this;
  }

  /**
   * Define período do encontro
   */
  setPeriod(
    startDate: string | Date,
    endDate?: string | Date
  ): this {
    const period: FHIRPeriod = {};

    if (startDate instanceof Date) {
      period.start = startDate.toISOString();
    } else {
      period.start = startDate;
    }

    if (endDate) {
      if (endDate instanceof Date) {
        period.end = endDate.toISOString();
      } else {
        period.end = endDate;
      }
    }

    this.encounter.period = period;
    return this;
  }

  /**
   * Define duração do encontro
   */
  setLength(value: number, unit: string): this {
    this.encounter.length = {
      value,
      unit,
      code: unit === 'minutes' ? 'min' : unit === 'hours' ? 'h' : 'd',
      system: 'http://unitsofmeasure.org',
    };

    return this;
  }

  /**
   * Adiciona diagnóstico
   */
  addDiagnosis(
    conditionId: string,
    diagnosticCode?: string,
    rank?: number
  ): this {
    if (!this.encounter.diagnosis) {
      this.encounter.diagnosis = [];
    }

    const diagnosis: any = {
      condition: {
        reference: `Condition/${conditionId}`,
      },
    };

    if (diagnosticCode) {
      diagnosis.use = {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/diagnosis-role',
            code: diagnosticCode,
          },
        ],
      };
    }

    if (rank !== undefined) {
      diagnosis.rank = rank;
    }

    this.encounter.diagnosis.push(diagnosis);
    return this;
  }

  /**
   * Adiciona localização
   */
  addLocation(
    locationId: string,
    locationStatus?: 'planned' | 'active' | 'reserved' | 'completed',
    startDate?: string | Date,
    endDate?: string | Date
  ): this {
    if (!this.encounter.location) {
      this.encounter.location = [];
    }

    const location: any = {
      location: {
        reference: `Location/${locationId}`,
      },
      status: locationStatus || 'active',
    };

    if (startDate || endDate) {
      const period: FHIRPeriod = {};

      if (startDate) {
        if (startDate instanceof Date) {
          period.start = startDate.toISOString();
        } else {
          period.start = startDate;
        }
      }

      if (endDate) {
        if (endDate instanceof Date) {
          period.end = endDate.toISOString();
        } else {
          period.end = endDate;
        }
      }

      location.period = period;
    }

    this.encounter.location.push(location);
    return this;
  }

  /**
   * Define organização responsável
   */
  setServiceProvider(organizationId: string): this {
    this.encounter.serviceProvider = {
      reference: `Organization/${organizationId}`,
    };

    return this;
  }

  /**
   * Define encontro anterior
   */
  setPartOf(encounterId: string): this {
    this.encounter.partOf = {
      reference: `Encounter/${encounterId}`,
    };

    return this;
  }

  /**
   * Adiciona identificador
   */
  addIdentifier(system: string, value: string): this {
    if (!this.encounter.identifier) {
      this.encounter.identifier = [];
    }

    this.encounter.identifier.push({
      system,
      value,
    });

    return this;
  }

  /**
   * Adiciona meta (versionId, lastUpdated, etc.)
   */
  addMeta(meta: { versionId?: string; lastUpdated?: string; profile?: string[] }): this {
    if (!this.encounter.meta) {
      this.encounter.meta = {};
    }
    this.encounter.meta = { ...this.encounter.meta, ...meta };
    return this;
  }

  /**
   * Retorna o encontro FHIR
   */
  build(): FHIREncounter {
    return this.encounter;
  }

  /**
   * Retorna o encontro FHIR como JSON
   */
  toJSON(): string {
    return JSON.stringify(this.encounter, null, 2);
  }

  /**
   * Retorna cópia do encontro
   */
  clone(): EncounterBuilder {
    const builder = new EncounterBuilder(this.encounter.id);
    builder.encounter = JSON.parse(JSON.stringify(this.encounter));
    return builder;
  }
}

/**
 * Cria um novo builder de encontro
 */
export function createEncounter(id?: string): EncounterBuilder {
  return new EncounterBuilder(id);
}

/**
 * Exemplo de uso:
 *
 * const encounter = createEncounter('encounter-123')
 *   .setClassAmbulatory()
 *   .setStatus('completed')
 *   .setSubject('patient-123')
 *   .addType('99213', 'Office visit for evaluation')
 *   .addReasonCode('Z00.00', 'Encounter for general adult medical examination')
 *   .setPeriod(new Date('2024-01-15T09:00:00Z'), new Date('2024-01-15T09:30:00Z'))
 *   .addParticipant({
 *     individualId: 'practitioner-456',
 *     type: '116148006', // Doctor
 *   })
 *   .addDiagnosis('condition-789', 'AD', 1)
 *   .addLocation('location-111')
 *   .setServiceProvider('organization-222')
 *   .build();
 */
