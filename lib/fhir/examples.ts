/**
 * FHIR R4 Examples and Usage Patterns
 * Comprehensive examples for Darwin-MFC FHIR implementations
 */

import {
  createPatient,
  createObservation,
  createEncounter,
  createBundle,
  type FHIRPatient,
  type FHIRObservation,
  type FHIREncounter,
  type FHIRBundle,
} from './index';

/**
 * Example 1: Simple Patient Creation
 *
 * Creates a basic patient record with essential demographic information
 */
export function example1_simplePatient(): FHIRPatient {
  return createPatient('patient-001')
    .addFullName('Maria Silva Santos', 'official')
    .addCPF('12345678901')
    .setGender('female')
    .setBirthDate('1985-03-20')
    .addEmail('maria.silva@example.com')
    .addPhone('11987654321', 'mobile')
    .build();
}

/**
 * Example 2: Comprehensive Patient with Multiple Identifiers
 *
 * Creates a patient with multiple ID systems (CPF, CNH, passport)
 * and complete contact information
 */
export function example2_comprehensivePatient(): FHIRPatient {
  return createPatient('patient-002')
    .addFullName('João Paulo Oliveira', 'official')
    .addFullName('JP Oliveira', 'nickname')
    .addCPF('98765432100')
    .addCNH('1234567890')
    .addIdentifier('http://passport.gov.br', 'AB123456')
    .setGender('male')
    .setBirthDate('1978-07-15')
    .setActive(true)
    .addEmail('joao@example.com')
    .addPhone('1133334444', 'work')
    .addPhone('11999998888', 'mobile')
    .addAddress({
      use: 'home',
      text: 'Avenida Paulista, 1000, Apto 501',
      line: ['Avenida Paulista, 1000', 'Apto 501'],
      city: 'São Paulo',
      district: 'Bela Vista',
      state: 'SP',
      postalCode: '01311-100',
      country: 'Brazil',
    })
    .addAddress({
      use: 'work',
      text: 'Rua Augusta, 2500',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brazil',
    })
    .addLanguage('pt-BR', true)
    .addLanguage('en', false)
    .setMaritalStatus('M', 'Married')
    .addContact({
      relationship: ['emergency-contact', 'spouse'],
      name: 'Ana Paula Oliveira',
      telecom: [
        {
          system: 'phone',
          value: '11999997777',
          use: 'mobile',
        },
      ],
      gender: 'female',
    })
    .setGeneralPractitioner('practitioner-001', 'Dr. Carlos Mendes')
    .setManagedOrganization('org-001', 'São Paulo Health Center')
    .addMeta({
      versionId: '1',
      lastUpdated: new Date().toISOString(),
      profile: ['http://darwin-mfc.org/fhir/StructureDefinition/patient-br'],
    })
    .build();
}

/**
 * Example 3: Blood Pressure Observation with Components
 *
 * Creates a blood pressure observation with systolic and diastolic
 * components following FHIR best practices
 */
export function example3_bloodPressureObservation(): FHIRObservation {
  return createObservation('obs-bp-001')
    .addVitalSignsCategory()
    .setCodeLOINC('85354-9', 'Blood Pressure Panel with all children optional')
    .setSubject('patient-001')
    .setEffectiveDateTime(new Date('2024-01-15T10:30:00Z'))
    .setIssued(new Date('2024-01-15T10:32:00Z'))
    .addPerformer('practitioner-001')
    .setMethod('85473003', 'Invasive systemic arterial blood pressure monitoring')
    .setBodySite('368209003', 'Right arm')
    .addComponent({
      code: '8480-6',
      display: 'Systolic Blood Pressure',
      codeSystem: 'http://loinc.org',
      valueQuantity: {
        value: 130,
        unit: 'mmHg',
        code: 'mm[Hg]',
      },
    })
    .addComponent({
      code: '8462-4',
      display: 'Diastolic Blood Pressure',
      codeSystem: 'http://loinc.org',
      valueQuantity: {
        value: 85,
        unit: 'mmHg',
        code: 'mm[Hg]',
      },
    })
    .addInterpretation('H', 'High')
    .addNote('Blood pressure taken while patient was sitting, right arm at heart level')
    .addReferenceRange({
      low: { value: 90, unit: 'mmHg' },
      high: { value: 120, unit: 'mmHg' },
      text: 'Normal blood pressure',
      appliesTo: ['Adult', 'Sitting position'],
    })
    .build();
}

/**
 * Example 4: Weight and BMI Observations
 *
 * Creates weight and BMI observations for patient health tracking
 */
export function example4_weightAndBMI(): {
  weight: FHIRObservation;
  height: FHIRObservation;
  bmi: FHIRObservation;
} {
  const weight = createObservation('obs-weight-001')
    .addVitalSignsCategory()
    .setCodeLOINC('29463-7', 'Body weight')
    .setSubject('patient-001')
    .setEffectiveDateTime(new Date())
    .setValueQuantity(75.5, 'kg', 'http://unitsofmeasure.org', 'kg')
    .addInterpretation('N', 'Normal')
    .addReferenceRange({
      low: { value: 50, unit: 'kg' },
      high: { value: 100, unit: 'kg' },
      text: 'Normal weight for most adults',
    })
    .build();

  const height = createObservation('obs-height-001')
    .addVitalSignsCategory()
    .setCodeLOINC('8302-2', 'Body height')
    .setSubject('patient-001')
    .setEffectiveDateTime(new Date())
    .setValueQuantity(172, 'cm', 'http://unitsofmeasure.org', 'cm')
    .build();

  const bmi = createObservation('obs-bmi-001')
    .addVitalSignsCategory()
    .setCodeLOINC('39156-5', 'Body Mass Index')
    .setSubject('patient-001')
    .setEffectiveDateTime(new Date())
    .setValueQuantity(25.5, 'kg/m2', 'http://unitsofmeasure.org', 'kg/m2')
    .addInterpretation('N', 'Normal weight (BMI 18.5-24.9)')
    .addDerivedFrom(`Observation/${weight.id}`)
    .addDerivedFrom(`Observation/${height.id}`)
    .build();

  return { weight, height, bmi };
}

/**
 * Example 5: Laboratory Results
 *
 * Creates various laboratory test observations
 */
export function example5_laboratoryResults(): FHIRObservation[] {
  const observations: FHIRObservation[] = [];

  // Glucose
  observations.push(
    createObservation('obs-glucose-001')
      .addLaboratoryCategory()
      .setCodeLOINC('2345-7', 'Glucose [Mass/volume] in Serum or Plasma')
      .setSubject('patient-001')
      .setEffectiveDateTime(new Date('2024-01-15T08:00:00Z'))
      .setValueQuantity(95, 'mg/dL', 'http://unitsofmeasure.org', 'mg/dL')
      .addInterpretation('N', 'Normal')
      .addReferenceRange({
        low: { value: 70, unit: 'mg/dL' },
        high: { value: 100, unit: 'mg/dL' },
        text: 'Normal fasting glucose',
      })
      .build()
  );

  // Hemoglobin
  observations.push(
    createObservation('obs-hemoglobin-001')
      .addLaboratoryCategory()
      .setCodeLOINC('718-7', 'Hemoglobin [Mass/volume] in Blood')
      .setSubject('patient-001')
      .setEffectiveDateTime(new Date('2024-01-15T08:00:00Z'))
      .setValueQuantity(14.5, 'g/dL', 'http://unitsofmeasure.org', 'g/dL')
      .addInterpretation('N', 'Normal')
      .addReferenceRange({
        low: { value: 12.0, unit: 'g/dL' },
        high: { value: 17.5, unit: 'g/dL' },
        text: 'Normal for adult female',
      })
      .build()
  );

  // Cholesterol
  observations.push(
    createObservation('obs-cholesterol-001')
      .addLaboratoryCategory()
      .setCodeLOINC('2093-3', 'Cholesterol [Mass/volume] in Serum or Plasma')
      .setSubject('patient-001')
      .setEffectiveDateTime(new Date('2024-01-15T08:00:00Z'))
      .setValueQuantity(185, 'mg/dL', 'http://unitsofmeasure.org', 'mg/dL')
      .addInterpretation('N', 'Normal')
      .addReferenceRange({
        high: { value: 200, unit: 'mg/dL' },
        text: 'Desirable total cholesterol',
      })
      .build()
  );

  return observations;
}

/**
 * Example 6: Encounter (Clinical Visit)
 *
 * Creates a complete clinical encounter with participants and diagnoses
 */
export function example6_clinicalEncounter(): FHIREncounter {
  return createEncounter('encounter-001')
    .setClassAmbulatory()
    .setStatus('completed')
    .setSubject('patient-001')
    .addIdentifier('https://myhealthsystem.com/encounter', 'ENC-2024-001')
    .addType('99213', 'Office visit for evaluation and management')
    .addReasonCode('Z00.00', 'Encounter for general adult medical examination')
    .setPeriod(
      new Date('2024-01-15T09:00:00Z'),
      new Date('2024-01-15T09:45:00Z')
    )
    .setLength(45, 'min')
    .addParticipant({
      individualId: 'practitioner-001',
      type: '116148006', // Physician
    })
    .addParticipant({
      individualId: 'practitioner-002',
      type: '224621009', // Nursing staff
    })
    .addDiagnosis('condition-001', 'AD', 1) // Primary diagnosis
    .addDiagnosis('condition-002', 'DD', 2) // Secondary diagnosis
    .addLocation('location-001', 'active')
    .setServiceProvider('organization-001')
    .addMeta({
      versionId: '1',
      lastUpdated: new Date().toISOString(),
    })
    .build();
}

/**
 * Example 7: Complete Clinical Bundle
 *
 * Creates a comprehensive bundle containing patient, observations,
 * and encounter data for a complete clinical record
 */
export function example7_clinicalBundle(): FHIRBundle {
  // Create patient
  const patient = example2_comprehensivePatient();

  // Create vital signs
  const { weight, height, bmi } = example4_weightAndBMI();
  const { bmi: bpObs } = example3_bloodPressureObservation() as any;

  // Create lab results
  const labResults = example5_laboratoryResults();

  // Create encounter
  const encounter = example6_clinicalEncounter();

  // Create bundle
  return createBundle('clinical-bundle-001')
    .setTypeDocument()
    .addResource(patient)
    .addResource(encounter)
    .addResource(weight)
    .addResource(height)
    .addResource(bmi)
    .addResource(createObservation('obs-bp-001')
      .addVitalSignsCategory()
      .setCodeLOINC('85354-9', 'Blood Pressure Panel')
      .setSubject('patient-002')
      .setEffectiveDateTime(new Date())
      .build()
    )
    .addResources(labResults)
    .addSelfLink('http://darwin-mfc.org/bundles/clinical-bundle-001')
    .addMeta({
      versionId: '1',
      lastUpdated: new Date().toISOString(),
      profile: ['http://hl7.org/fhir/StructureDefinition/Bundle'],
    })
    .build();
}

/**
 * Example 8: Transaction Bundle
 *
 * Creates a bundle for transactional operations (all-or-nothing)
 */
export function example8_transactionBundle(): FHIRBundle {
  const builder = createBundle('tx-bundle-001');
  builder.setTypeTransaction();

  // Add POST request to create patient
  builder.addEntry({
    resource: example1_simplePatient(),
    method: 'POST',
    fullUrl: 'Patient',
  });

  // Add POST request to create observation
  builder.addEntry({
    resource: createObservation('obs-001')
      .addVitalSignsCategory()
      .setCodeLOINC('29463-7', 'Body weight')
      .setSubject('Patient/patient-001')
      .setValueQuantity(70, 'kg')
      .build(),
    method: 'POST',
    fullUrl: 'Observation',
  });

  return builder.build();
}

/**
 * Example 9: Search Results Bundle (SearchSet)
 *
 * Creates a bundle representing search results with scoring
 */
export function example9_searchResults(): FHIRBundle {
  const builder = createBundle('search-results-001');
  builder.setTypeSearchSet();

  const patients = [
    example1_simplePatient(),
    example2_comprehensivePatient(),
  ];

  patients.forEach((patient, index) => {
    builder.addEntry({
      resource: patient,
      search: {
        mode: 'match',
        score: 1.0 - index * 0.1, // Score decreases for subsequent results
      },
      fullUrl: `http://darwin-mfc.org/Patient/${patient.id}`,
    });
  });

  builder.addSelfLink(
    'http://darwin-mfc.org/Patient?name=silva&_count=50'
  );
  builder.addNextLink(
    'http://darwin-mfc.org/Patient?name=silva&_count=50&_skip=50'
  );

  return builder.build();
}

/**
 * Example 10: Export Bundle to JSON
 *
 * Demonstrates serialization of FHIR bundles to JSON
 */
export function example10_exportToJSON(): string {
  const bundle = example7_clinicalBundle();
  return JSON.stringify(bundle, null, 2);
}

/**
 * Export all examples as a map
 */
export const FHIR_EXAMPLES = {
  simplePatient: example1_simplePatient,
  comprehensivePatient: example2_comprehensivePatient,
  bloodPressure: example3_bloodPressureObservation,
  weightAndBMI: example4_weightAndBMI,
  laboratoryResults: example5_laboratoryResults,
  clinicalEncounter: example6_clinicalEncounter,
  clinicalBundle: example7_clinicalBundle,
  transactionBundle: example8_transactionBundle,
  searchResults: example9_searchResults,
  exportToJSON: example10_exportToJSON,
};
