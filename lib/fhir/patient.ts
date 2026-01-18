/**
 * FHIR Patient Resource Builder e Conversores
 * Construtor fluente para criar recursos Patient FHIR R4
 * @see https://www.hl7.org/fhir/patient.html
 */

import type {
  FHIRPatient,
  FHIRCodeableConcept,
  FHIRCoding,
  FHIRReference,
  FHIRPeriod,
} from './types';
import { FHIR_CODE_SYSTEMS } from './types';

/**
 * Builder fluente para pacientes FHIR
 */
export class PatientBuilder {
  private patient: FHIRPatient;

  constructor(id?: string) {
    this.patient = {
      resourceType: 'Patient',
      id: id || `patient-${Date.now()}`,
      active: true,
    };
  }

  /**
   * Adiciona identificador
   */
  addIdentifier(system: string, value: string, type?: string): this {
    if (!this.patient.identifier) {
      this.patient.identifier = [];
    }

    const identifier: any = {
      system,
      value,
    };

    if (type) {
      identifier.type = {
        text: type,
      };
    }

    this.patient.identifier.push(identifier);
    return this;
  }

  /**
   * Adiciona CPF como identificador
   */
  addCPF(cpf: string): this {
    return this.addIdentifier(FHIR_CODE_SYSTEMS.CPF, cpf, 'CPF');
  }

  /**
   * Adiciona CNH como identificador
   */
  addCNH(cnh: string): this {
    return this.addIdentifier(FHIR_CODE_SYSTEMS.CNH, cnh, 'CNH');
  }

  /**
   * Define se paciente está ativo
   */
  setActive(active: boolean): this {
    this.patient.active = active;
    return this;
  }

  /**
   * Adiciona nome
   */
  addName(
    nameObj: {
      family?: string;
      given?: string[];
      prefix?: string[];
      suffix?: string[];
      use?: 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden';
      text?: string;
    }
  ): this {
    if (!this.patient.name) {
      this.patient.name = [];
    }

    const name = {
      use: nameObj.use || 'official',
      text: nameObj.text,
      family: nameObj.family,
      given: nameObj.given,
      prefix: nameObj.prefix,
      suffix: nameObj.suffix,
    };

    this.patient.name.push(name);
    return this;
  }

  /**
   * Adiciona nome completo conveniência
   */
  addFullName(fullName: string, use?: 'usual' | 'official' | 'temp' | 'nickname'): this {
    const parts = fullName.trim().split(/\s+/);
    const family = parts[parts.length - 1];
    const given = parts.slice(0, -1);

    return this.addName({
      text: fullName,
      family,
      given: given.length > 0 ? given : undefined,
      use: use || 'usual',
    });
  }

  /**
   * Adiciona telefone
   */
  addTelecom(
    system: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other',
    value: string,
    use?: 'home' | 'work' | 'temp' | 'old' | 'mobile'
  ): this {
    if (!this.patient.telecom) {
      this.patient.telecom = [];
    }

    this.patient.telecom.push({
      system,
      value,
      use,
    });

    return this;
  }

  /**
   * Adiciona email
   */
  addEmail(email: string): this {
    return this.addTelecom('email', email);
  }

  /**
   * Adiciona telefone
   */
  addPhone(phone: string, use?: 'home' | 'work' | 'mobile'): this {
    return this.addTelecom('phone', phone, use);
  }

  /**
   * Define gênero
   */
  setGender(gender: 'male' | 'female' | 'other' | 'unknown'): this {
    this.patient.gender = gender;
    return this;
  }

  /**
   * Define data de nascimento (ISO 8601)
   */
  setBirthDate(birthDate: string | Date): this {
    if (birthDate instanceof Date) {
      this.patient.birthDate = birthDate.toISOString().split('T')[0];
    } else {
      this.patient.birthDate = birthDate;
    }
    return this;
  }

  /**
   * Define como falecido
   */
  setDeceased(dateTime?: string | Date): this {
    if (dateTime === undefined) {
      this.patient.deceasedBoolean = true;
    } else {
      this.patient.deceasedBoolean = false;
      if (dateTime instanceof Date) {
        this.patient.deceasedDateTime = dateTime.toISOString();
      } else {
        this.patient.deceasedDateTime = dateTime;
      }
    }
    return this;
  }

  /**
   * Adiciona endereço
   */
  addAddress(
    addressObj: {
      text?: string;
      line?: string[];
      city?: string;
      district?: string;
      state?: string;
      postalCode?: string;
      country?: string;
      use?: 'home' | 'work' | 'temp' | 'old' | 'billing';
      type?: 'postal' | 'physical' | 'both';
    }
  ): this {
    if (!this.patient.address) {
      this.patient.address = [];
    }

    const address = {
      use: addressObj.use || 'home',
      type: addressObj.type || 'both',
      text: addressObj.text,
      line: addressObj.line,
      city: addressObj.city,
      district: addressObj.district,
      state: addressObj.state,
      postalCode: addressObj.postalCode,
      country: addressObj.country,
    };

    this.patient.address.push(address);
    return this;
  }

  /**
   * Define status marital
   */
  setMaritalStatus(code: string, display?: string): this {
    this.patient.maritalStatus = {
      coding: [
        {
          system: FHIR_CODE_SYSTEMS.MARITAL_STATUS,
          code,
          display: display || code,
        },
      ],
      text: display || code,
    };
    return this;
  }

  /**
   * Adiciona contato
   */
  addContact(
    contactObj: {
      relationship?: string[];
      name?: string;
      telecom?: Array<{
        system: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
        value: string;
        use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
      }>;
      address?: {
        text?: string;
        line?: string[];
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
      };
      gender?: 'male' | 'female' | 'other' | 'unknown';
    }
  ): this {
    if (!this.patient.contact) {
      this.patient.contact = [];
    }

    const contact: any = {};

    if (contactObj.relationship && contactObj.relationship.length > 0) {
      contact.relationship = contactObj.relationship.map((rel) => ({
        text: rel,
      }));
    }

    if (contactObj.name) {
      contact.name = {
        text: contactObj.name,
      };
    }

    if (contactObj.telecom) {
      contact.telecom = contactObj.telecom;
    }

    if (contactObj.address) {
      contact.address = contactObj.address;
    }

    if (contactObj.gender) {
      contact.gender = contactObj.gender;
    }

    this.patient.contact.push(contact);
    return this;
  }

  /**
   * Adiciona idioma
   */
  addLanguage(code: string, preferred: boolean = false): this {
    if (!this.patient.communication) {
      this.patient.communication = [];
    }

    this.patient.communication.push({
      language: {
        coding: [
          {
            system: 'urn:ietf:bcp:47',
            code,
          },
        ],
        text: code,
      },
      preferred,
    });

    return this;
  }

  /**
   * Define médico geral
   */
  setGeneralPractitioner(practitionerId: string, display?: string): this {
    this.patient.generalPractitioner = [
      {
        reference: `Practitioner/${practitionerId}`,
        display: display || `Practitioner/${practitionerId}`,
      },
    ];
    return this;
  }

  /**
   * Define organização responsável
   */
  setManagedOrganization(organizationId: string, display?: string): this {
    this.patient.managingOrganization = {
      reference: `Organization/${organizationId}`,
      display: display || `Organization/${organizationId}`,
    };
    return this;
  }

  /**
   * Adiciona meta (versionId, lastUpdated, etc.)
   */
  addMeta(meta: { versionId?: string; lastUpdated?: string; profile?: string[] }): this {
    if (!this.patient.meta) {
      this.patient.meta = {};
    }
    this.patient.meta = { ...this.patient.meta, ...meta };
    return this;
  }

  /**
   * Retorna o paciente FHIR
   */
  build(): FHIRPatient {
    return this.patient;
  }

  /**
   * Retorna o paciente FHIR como JSON
   */
  toJSON(): string {
    return JSON.stringify(this.patient, null, 2);
  }

  /**
   * Retorna cópia do paciente
   */
  clone(): PatientBuilder {
    const builder = new PatientBuilder(this.patient.id);
    builder.patient = JSON.parse(JSON.stringify(this.patient));
    return builder;
  }
}

/**
 * Cria um novo builder de paciente
 */
export function createPatient(id?: string): PatientBuilder {
  return new PatientBuilder(id);
}

/**
 * Exemplo de uso:
 *
 * const patient = createPatient('patient-123')
 *   .addFullName('João Silva', 'official')
 *   .addCPF('12345678901')
 *   .addEmail('joao@example.com')
 *   .addPhone('11999999999', 'mobile')
 *   .setBirthDate('1990-05-15')
 *   .setGender('male')
 *   .addAddress({
 *     text: 'Rua Principal, 123',
 *     city: 'São Paulo',
 *     state: 'SP',
 *     country: 'Brazil',
 *   })
 *   .addLanguage('pt-BR', true)
 *   .setMaritalStatus('M', 'Married')
 *   .build();
 */
