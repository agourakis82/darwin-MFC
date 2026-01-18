# FHIR Integration Guide for Darwin-MFC

Quick integration guide for using FHIR 4.0 R4 with Darwin-MFC medical platform.

## Quick Start

### 1. Basic Patient Creation

```typescript
import { createPatient } from '@/lib/fhir';

const patient = createPatient('pat-001')
  .addFullName('João Silva')
  .addCPF('12345678901')
  .setGender('male')
  .setBirthDate('1990-05-15')
  .addEmail('joao@example.com')
  .build();
```

### 2. Clinical Observation

```typescript
import { createObservation } from '@/lib/fhir';

const weight = createObservation('obs-001')
  .addVitalSignsCategory()
  .setCodeLOINC('29463-7', 'Body weight')
  .setSubject('pat-001')
  .setValueQuantity(75.5, 'kg')
  .build();
```

### 3. Clinical Encounter

```typescript
import { createEncounter } from '@/lib/fhir';

const visit = createEncounter('enc-001')
  .setClassAmbulatory()
  .setSubject('pat-001')
  .addType('99213', 'Office visit')
  .setPeriod(new Date())
  .build();
```

### 4. Bundle Everything

```typescript
import { createBundle } from '@/lib/fhir';

const bundle = createBundle('bundle-001')
  .addResource(patient)
  .addResource(weight)
  .addResource(visit)
  .build();

// Export as JSON
console.log(JSON.stringify(bundle, null, 2));
```

## Converting Darwin Data Types

### Darwin Doença to FHIR Condition

```typescript
import { doencaToFHIRCondition } from '@/lib/fhir';

const condition = doencaToFHIRCondition(darwinDoenca, {
  subjectId: 'patient-001',
  onsetDate: '2024-01-01',
});
```

### Darwin Medicamento to FHIR Medication

```typescript
import { medicamentoToFHIRMedication, medicamentoToFHIRMedicationStatement } from '@/lib/fhir';

const medication = medicamentoToFHIRMedication(darwinMedicamento);

const statement = medicamentoToFHIRMedicationStatement(
  darwinMedicamento,
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

## Common Code Systems

### LOINC (Laboratory Codes)

```typescript
// Common LOINC codes
const codes = {
  bloodPressure: '85354-9',
  bodyWeight: '29463-7',
  bodyHeight: '8302-2',
  bmi: '39156-5',
  glucose: '2345-7',
  hemoglobin: '718-7',
  cholesterol: '2093-3',
};
```

### SNOMED-CT (Clinical Codes)

```typescript
// Example SNOMED codes
const codes = {
  physician: '116148006',
  nurse: '224621009',
  diabetes: '73211009',
  hypertension: '59621000',
};
```

### ATC (Medication Classification)

```typescript
// ATC Level 5 examples
const atcCodes = {
  aspirin: 'B01AC06',
  amoxicillin: 'J01CA04',
  metformin: 'A10BA02',
};
```

### ICD-10 (Disease Classification)

```typescript
// ICD-10 examples
const icd10Codes = {
  hypertension: 'I10',
  diabetes: 'E11.9',
  pneumonia: 'J15.9',
};
```

## Utility Functions

### Formatting

```typescript
import { formatQuantity, formatPeriod, calculateAge } from '@/lib/fhir/utils';

// Format quantity for display
const display = formatQuantity(obs.valueQuantity); // "75.5 kg"

// Format date period
const period = formatPeriod(obs.effectivePeriod); // "01/01/2024 até 15/01/2024"

// Calculate age
const age = calculateAge('1990-05-15'); // 33
```

### Resource Management

```typescript
import {
  generateFHIRId,
  createFHIRReference,
  validateFHIRResource,
  cloneFHIRResource,
} from '@/lib/fhir/utils';

// Generate unique ID
const id = generateFHIRId('Patient'); // "patient-1234567890-abc"

// Create reference
const patientRef = createFHIRReference('Patient', 'pat-001');

// Validate resource
const validation = validateFHIRResource(patient);
if (!validation.valid) {
  console.error('Errors:', validation.errors);
}

// Clone resource
const patientCopy = cloneFHIRResource(patient);
```

### Bundle Operations

```typescript
import {
  findResourceInBundle,
  filterBundleByResourceType,
  bundleToResourceMap,
} from '@/lib/fhir/utils';

// Find resource
const patient = findResourceInBundle(bundle, 'Patient', 'pat-001');

// Filter by type
const observations = filterBundleByResourceType(bundle, 'Observation');

// Convert to map for fast lookup
const resourceMap = bundleToResourceMap(bundle);
const resource = resourceMap.get('Patient/pat-001');
```

## Integration with Darwin Components

### In React Components

```typescript
'use client';

import { createPatient, createObservation } from '@/lib/fhir';
import { useAppStore } from '@/lib/store/appStore';

export function PatientProfile({ patientData }) {
  const contentMode = useAppStore((state) => state.contentMode);

  const fhirPatient = createPatient(patientData.id)
    .addFullName(patientData.name)
    .setCPF(patientData.cpf)
    .setGender(patientData.gender)
    .setBirthDate(patientData.birthDate)
    .build();

  return (
    <div>
      <h1>{fhirPatient.name?.[0]?.text}</h1>
      <p>FHIR ID: {fhirPatient.id}</p>
    </div>
  );
}
```

### In API Routes

```typescript
// app/api/fhir/patient/route.ts
import { createPatient } from '@/lib/fhir';

export async function POST(request: Request) {
  const data = await request.json();

  const patient = createPatient()
    .addFullName(data.name)
    .addCPF(data.cpf)
    .setGender(data.gender)
    .setBirthDate(data.birthDate)
    .build();

  return Response.json(patient);
}
```

### Exporting Data

```typescript
import { createBundle } from '@/lib/fhir';

function exportClinicalData(patientId: string) {
  const bundle = createBundle(`export-${patientId}`)
    .addResource(patient)
    .addResource(condition)
    .addResource(medication)
    .addResource(observation);

  // Export as JSON
  const json = bundle.toJSON();

  // Or create blob for download
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  return url;
}
```

## Type Safety

All builders return properly typed FHIR resources:

```typescript
import type { FHIRPatient, FHIRObservation, FHIRBundle } from '@/lib/fhir';

const patient: FHIRPatient = createPatient('pat-001')
  .addFullName('João')
  .build();

const obs: FHIRObservation = createObservation('obs-001')
  .setCodeLOINC('29463-7')
  .build();

const bundle: FHIRBundle = createBundle('bundle-001')
  .addResource(patient)
  .addResource(obs)
  .build();
```

## Best Practices

### 1. Always Use Builders

```typescript
// Good ✓
const patient = createPatient()
  .addFullName('João')
  .setGender('male')
  .build();

// Avoid ✗
const patient = {
  resourceType: 'Patient',
  name: [{ text: 'João' }],
  // ... manual structure
};
```

### 2. Validate Before Export

```typescript
import { validateFHIRResource } from '@/lib/fhir/utils';

const validation = validateFHIRResource(resource);
if (validation.valid) {
  exportResource(resource);
} else {
  console.error('Validation errors:', validation.errors);
}
```

### 3. Use Proper Code Systems

```typescript
// Good ✓
const obs = createObservation()
  .setCodeLOINC('29463-7') // System is implied
  .build();

// Explicit ✓
const obs = createObservation()
  .setCode('29463-7', 'Body weight', 'http://loinc.org')
  .build();
```

### 4. Group Related Resources

```typescript
// Create bundle for atomic operations
const clinicalData = createBundle()
  .addResource(patient)
  .addResource(condition)
  .addResource(medication)
  .addResource(observation)
  .build();
```

### 5. Use Metadata

```typescript
const patient = createPatient()
  .addFullName('João')
  .addMeta({
    versionId: '1',
    lastUpdated: new Date().toISOString(),
    profile: ['http://darwin-mfc.org/fhir/StructureDefinition/patient-br'],
  })
  .build();
```

## Testing Example

```typescript
import { createPatient, validateFHIRResource } from '@/lib/fhir';

describe('FHIR Patient Builder', () => {
  it('should create valid patient', () => {
    const patient = createPatient('test-1')
      .addFullName('Test User')
      .setGender('male')
      .build();

    const validation = validateFHIRResource(patient);
    expect(validation.valid).toBe(true);
  });

  it('should include identifiers', () => {
    const patient = createPatient('test-2')
      .addCPF('12345678901')
      .build();

    expect(patient.identifier).toHaveLength(1);
    expect(patient.identifier?.[0]?.value).toBe('12345678901');
  });
});
```

## Troubleshooting

### Missing Properties

If TypeScript complains about missing properties:
```typescript
import type { FHIRPatient } from '@/lib/fhir';

const patient = createPatient().build() as FHIRPatient;
```

### Code System Not Found

Check the FHIR_CODE_SYSTEMS export:
```typescript
import { FHIR_CODE_SYSTEMS } from '@/lib/fhir';

console.log(FHIR_CODE_SYSTEMS.ATC); // "http://www.whocc.no/atc"
```

### Bundle Operations

When filtering bundles:
```typescript
import { filterBundleByResourceType } from '@/lib/fhir/utils';

const resources = filterBundleByResourceType(bundle, 'Observation');
// Returns FHIRResource[] (not FHIRObservation[])
// Cast if needed: as FHIRObservation[]
```

## Additional Resources

- [HL7 FHIR R4 Specification](https://www.hl7.org/fhir/)
- [LOINC - Laboratory Codes](https://loinc.org)
- [SNOMED CT Browser](http://snomed.info/sct)
- [ATC - Drug Classification](https://www.whocc.no/atc/)
- [ICD-10 Lookup](https://www.icd10data.com/)

## Support

For issues or questions:
1. Check the README.md in the fhir module
2. Review the examples.ts file for usage patterns
3. Check type definitions in types.ts
4. Consult the official FHIR specification
