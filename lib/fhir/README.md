# FHIR 4.0 R4 Module for Darwin-MFC

Complete FHIR (Fast Healthcare Interoperability Resources) R4 support for the Darwin-MFC medical platform.

## Overview

This module provides full-featured FHIR R4 resource definitions, fluent builders, and utilities for working with healthcare data in an interoperable format.

**Specification:** [HL7 FHIR R4](https://www.hl7.org/fhir/)

## Files Structure

```
lib/fhir/
├── types.ts           # Core FHIR R4 resource type definitions
├── patient.ts         # Patient resource builder
├── observation.ts     # Observation resource builder
├── encounter.ts       # Encounter resource builder
├── bundle.ts          # Bundle resource builder
├── condition.ts       # Condition resource converter
├── medication.ts      # Medication resource converter
├── utils.ts           # Utility functions for FHIR operations
├── index.ts           # Main export file
└── README.md          # This file
```

## Quick Start

### 1. Creating a Patient

```typescript
import { createPatient } from '@/lib/fhir';

const patient = createPatient('patient-001')
  .addFullName('João da Silva', 'official')
  .addCPF('12345678901')
  .setGender('male')
  .setBirthDate('1990-05-15')
  .addEmail('joao@example.com')
  .addPhone('11999999999', 'mobile')
  .addAddress({
    text: 'Rua Principal, 123',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brazil',
  })
  .addLanguage('pt-BR', true)
  .setMaritalStatus('M', 'Married')
  .build();
```

### 2. Creating an Observation (Vital Signs)

```typescript
import { createObservation } from '@/lib/fhir';

const bloodPressure = createObservation('obs-bp-001')
  .addVitalSignsCategory()
  .setCodeLOINC('85354-9', 'Blood Pressure Panel')
  .setSubject('patient-001')
  .setEffectiveDateTime(new Date())
  .addComponent({
    code: '8480-6',
    display: 'Systolic Blood Pressure',
    valueQuantity: { value: 120, unit: 'mmHg', code: 'mm[Hg]' },
  })
  .addComponent({
    code: '8462-4',
    display: 'Diastolic Blood Pressure',
    valueQuantity: { value: 80, unit: 'mmHg', code: 'mm[Hg]' },
  })
  .addInterpretation('N', 'Normal')
  .build();
```

### 3. Creating an Encounter

```typescript
import { createEncounter } from '@/lib/fhir';

const encounter = createEncounter('encounter-001')
  .setClassAmbulatory()
  .setStatus('completed')
  .setSubject('patient-001')
  .addType('99213', 'Office visit for evaluation')
  .addReasonCode('Z00.00', 'Encounter for general adult medical examination')
  .setPeriod(new Date('2024-01-15T09:00:00Z'), new Date('2024-01-15T09:30:00Z'))
  .addParticipant({
    individualId: 'practitioner-456',
    type: '116148006', // Doctor
  })
  .addDiagnosis('condition-789', 'AD', 1)
  .addLocation('location-111')
  .setServiceProvider('organization-222')
  .build();
```

### 4. Creating a Bundle

```typescript
import { createBundle } from '@/lib/fhir';

const bundle = createBundle('clinical-data-bundle')
  .addResource(patient)
  .addResource(encounter)
  .addResource(bloodPressure)
  .addResource(condition)
  .addSelfLink('http://darwin-mfc.org/bundles/clinical-data-bundle')
  .addMeta({
    lastUpdated: new Date().toISOString(),
  })
  .build();
```

## Resource Types & Builders

### Patient

Creates comprehensive patient records with support for:
- Multiple identifiers (CPF, CNH, Passport, etc.)
- Multiple names and contact information
- Addresses, telecom, marital status
- Contact persons, languages, practitioners
- Organization relationships

**Methods:**
- `addIdentifier()`, `addCPF()`, `addCNH()`
- `addName()`, `addFullName()`
- `addTelecom()`, `addEmail()`, `addPhone()`
- `setGender()`, `setBirthDate()`, `setDeceased()`
- `addAddress()`, `setMaritalStatus()`
- `addContact()`, `addLanguage()`
- `setGeneralPractitioner()`, `setManagedOrganization()`

### Observation

Creates clinical observations and measurements with support for:
- Multiple categories (vital signs, laboratory, imaging, etc.)
- Complex values (numeric, text, coding, ranges, ratios)
- Reference ranges and interpretation
- Components (for grouped observations like blood pressure)
- Method, body site, device, and performer tracking

**Methods:**
- `setStatus()`, `addCategory()`
- `setCode()`, `setCodeLOINC()`, `setCodeSNOMED()`
- `setValueQuantity()`, `setValueString()`, `setValueCodeableConcept()`
- `setEffectiveDateTime()`, `setEffectivePeriod()`, `setIssued()`
- `addComponent()`, `addReferenceRange()`, `addInterpretation()`
- `addNote()`, `addPerformer()`, `setDevice()`

### Encounter

Creates clinical encounters and episodes of care with support for:
- Multiple classes (ambulatory, emergency, inpatient, etc.)
- Types, reasons, and priorities
- Participants and locations
- Diagnosis tracking and service providers
- Period and duration information

**Methods:**
- `setStatus()`, `setClass()`, `setClassAmbulatory()`, `setClassEmergency()`, `setClassInpatient()`
- `addType()`, `addReasonCode()`, `addReasonReference()`
- `setPriority()`, `setSubject()`
- `addParticipant()`, `setPeriod()`, `setLength()`
- `addDiagnosis()`, `addLocation()`
- `setServiceProvider()`, `setPartOf()`

### Bundle

Creates FHIR bundles for grouping resources with support for:
- Multiple bundle types (collection, transaction, batch, searchset, document, etc.)
- Resource aggregation and management
- Search parameters and pagination
- Transaction support

**Methods:**
- `setType()`, `setTypeDocument()`, `setTypeTransaction()`, `setTypeCollection()`, `setTypeSearchSet()`
- `addResource()`, `addResources()`, `addEntry()`
- `getResourcesByType()`, `getFirstResourceByType()`
- `removeResource()`, `clear()`
- `addLink()`, `addSelfLink()`, `addNextLink()`, `addPreviousLink()`

## Code Systems

The module includes standard FHIR code systems:

### Disease Classification
- `ICD10` - International Classification of Diseases 10th Revision
- `ICD11` - International Classification of Diseases 11th Revision
- `SNOMED_CT` - Systematized Nomenclature of Medicine
- `CIAP2` - International Classification of Primary Care
- `DOID` - Disease Ontology
- `UMLS` - Unified Medical Language System
- `HPO` - Human Phenotype Ontology

### Medications
- `ATC` - Anatomical Therapeutic Chemical Classification
- `RXNORM` - RxNorm
- `DRUGBANK` - DrugBank
- `NDC` - National Drug Code
- `EDQM` - European Pharmacopoeia

### Laboratory
- `LOINC` - Logical Observation Identifiers Names and Codes

### Clinical
- `CONDITION_CLINICAL_STATUS` - Clinical status codes
- `CONDITION_VERIFICATION_STATUS` - Verification status codes
- `OBSERVATION_CATEGORY` - Observation categories
- `ENCOUNTER_CLASS` - Encounter classes
- `ENCOUNTER_STATUS` - Encounter status codes

### Brazilian Identifiers
- `CPF` - Cadastro de Pessoa Física
- `CNH` - Carteira Nacional de Habilitação

## Utility Functions

The `utils.ts` module provides helper functions:

### Resource Management
```typescript
import {
  createFHIRResource,
  generateFHIRId,
  createFHIRReference,
  cloneFHIRResource,
  validateFHIRResource,
} from '@/lib/fhir/utils';

// Generate unique FHIR ID
const patientId = generateFHIRId('Patient'); // patient-1234567890-abc123

// Create reference to another resource
const patientRef = createFHIRReference('Patient', 'patient-001');

// Validate resource
const validation = validateFHIRResource(patient);
if (!validation.valid) {
  console.error('Validation errors:', validation.errors);
}
```

### Data Formatting
```typescript
import {
  formatQuantity,
  formatPeriod,
  formatFHIRDate,
  formatFHIRDateTime,
  calculateAge,
} from '@/lib/fhir/utils';

// Format values for display
const weightDisplay = formatQuantity(weight.valueQuantity);
const periodDisplay = formatPeriod(observation.effectivePeriod);

// Calculate age from birth date
const age = calculateAge('1990-05-15');

// Format dates in FHIR format
const date = formatFHIRDate(new Date()); // "2024-01-15"
const dateTime = formatFHIRDateTime(new Date()); // "2024-01-15T10:30:00.000Z"
```

### Bundle Operations
```typescript
import {
  findResourceInBundle,
  filterBundleByResourceType,
  bundleToResourceMap,
} from '@/lib/fhir/utils';

// Find specific resource in bundle
const patient = findResourceInBundle(bundle, 'Patient', 'patient-001');

// Filter resources by type
const observations = filterBundleByResourceType(bundle, 'Observation');

// Convert bundle to searchable map
const resourceMap = bundleToResourceMap(bundle);
const patientResource = resourceMap.get('Patient/patient-001');
```

### Metadata Management
```typescript
import {
  setLastUpdated,
  getLastUpdated,
  setVersionId,
  getVersionId,
  incrementVersion,
} from '@/lib/fhir/utils';

// Set last updated timestamp
setLastUpdated(patient, new Date());

// Get last updated
const updated = getLastUpdated(patient);

// Version control
setVersionId(patient, '1');
incrementVersion(patient); // Now version "2"
const version = getVersionId(patient); // "2"
```

## Converters (Legacy)

The module includes converters for existing Darwin-MFC data types:

### Condition Converter
```typescript
import { doencaToFHIRCondition, fhirConditionToDoenca } from '@/lib/fhir';

// Convert Darwin Doença to FHIR Condition
const fhirCondition = doencaToFHIRCondition(doenca, {
  subjectId: 'patient-001',
  onsetDate: '2024-01-01',
});

// Convert back to Darwin Doença
const doencaData = fhirConditionToDoenca(fhirCondition);
```

### Medication Converter
```typescript
import {
  medicamentoToFHIRMedication,
  medicamentoToFHIRMedicationStatement,
} from '@/lib/fhir';

// Convert medication data
const fhirMed = medicamentoToFHIRMedication(medicamento);

// Create medication statement (prescription)
const statement = medicamentoToFHIRMedicationStatement(
  medicamento,
  {
    dose: '500mg',
    frequencia: '2x ao dia',
    via: 'oral',
  },
  {
    subjectId: 'patient-001',
    status: 'active',
  }
);
```

## Best Practices

### 1. Use Builders for Complex Resources
Always use builders to create resources with a fluent API rather than creating objects directly.

```typescript
// Good
const obs = createObservation()
  .setCodeLOINC('29463-7')
  .setSubject('patient-001')
  .setValueQuantity(75.5, 'kg')
  .build();

// Avoid
const obs = {
  resourceType: 'Observation',
  code: { coding: [...] },
  subject: { reference: '...' },
  // ... lots of nested properties
};
```

### 2. Always Set Identifiers
Use appropriate identifier systems for your domain.

```typescript
const patient = createPatient()
  .addCPF('12345678901') // Brazilian ID
  .addIdentifier('https://myhealthsystem.com/patient', 'HS-12345');
```

### 3. Use Proper Code Systems
Always specify the code system when creating CodeableConcepts.

```typescript
const obs = createObservation()
  .setCodeLOINC('29463-7', 'Body weight')
  // Correct: system is specified
  .build();
```

### 4. Validate Before Serialization
Validate resources before sending to external systems.

```typescript
const validation = validateFHIRResource(resource);
if (validation.valid) {
  sendToFHIRServer(resource);
}
```

### 5. Use Bundles for Related Resources
Group related resources in bundles for atomic operations.

```typescript
const clinicalBundle = createBundle()
  .addResource(patient)
  .addResource(encounter)
  .addResource(observation)
  .addResource(condition)
  .build();
```

## Examples

### Complete Clinical Record

```typescript
import {
  createPatient,
  createObservation,
  createEncounter,
  createCondition,
  createBundle,
} from '@/lib/fhir';

// 1. Patient
const patient = createPatient('pt-001')
  .addFullName('Maria Silva')
  .addCPF('98765432100')
  .setGender('female')
  .setBirthDate('1985-03-20')
  .addEmail('maria@example.com')
  .build();

// 2. Vital Signs Observation
const weight = createObservation('obs-weight-001')
  .addVitalSignsCategory()
  .setCodeLOINC('29463-7', 'Body weight')
  .setSubject('pt-001')
  .setEffectiveDateTime(new Date())
  .setValueQuantity(65.5, 'kg', 'http://unitsofmeasure.org', 'kg')
  .addInterpretation('N', 'Normal')
  .build();

// 3. Encounter
const encounter = createEncounter('enc-001')
  .setClassAmbulatory()
  .setSubject('pt-001')
  .addType('99213', 'Office visit')
  .setPeriod(new Date())
  .build();

// 4. Bundle everything
const clinicalBundle = createBundle('clinical-001')
  .addResource(patient)
  .addResource(weight)
  .addResource(encounter)
  .build();

// Export as JSON
console.log(clinicalBundle.toJSON());
```

## Testing

```typescript
import { validateFHIRResource } from '@/lib/fhir/utils';

const patient = createPatient().build();
const validation = validateFHIRResource(patient);

expect(validation.valid).toBe(true);
expect(validation.errors).toHaveLength(0);
```

## References

- [HL7 FHIR R4 Specification](https://www.hl7.org/fhir/)
- [FHIR Patient](https://www.hl7.org/fhir/patient.html)
- [FHIR Observation](https://www.hl7.org/fhir/observation.html)
- [FHIR Encounter](https://www.hl7.org/fhir/encounter.html)
- [FHIR Bundle](https://www.hl7.org/fhir/bundle.html)
- [FHIR Condition](https://www.hl7.org/fhir/condition.html)
- [FHIR Medication](https://www.hl7.org/fhir/medication.html)
- [LOINC - Laboratory](https://loinc.org)
- [SNOMED CT](http://snomed.info/sct)
- [ATC Classification](https://www.whocc.no/atc/)

## License

Part of the Darwin-MFC medical platform.
