# FHIR Converters

Comprehensive FHIR R4 converter suite for transforming Darwin-MFC data structures into interoperable healthcare data formats.

## Overview

This module provides utilities to convert Darwin-MFC domain objects (Doença, Medicamento, etc.) into FHIR R4-compliant resources, enabling seamless integration with healthcare information systems.

**FHIR Version:** R4 (Release 4)
**Standard:** https://www.hl7.org/fhir/

## Features

- **Type-Safe Conversions**: Full TypeScript support with detailed type definitions
- **Bidirectional Mapping**: Convert both ways between Darwin-MFC and FHIR formats
- **Terminology Mapping**: Support for multiple medical coding systems (ICD-10, ICD-11, CIAP-2, SNOMED-CT, ATC, RxNorm)
- **Bundle Building**: Fluent API for constructing FHIR bundles with transaction support
- **Edge Case Handling**: Graceful handling of missing fields and null values
- **Extensible**: Support for basic and extended detail levels in conversions

## Modules

### 1. Condition Converter (`condition-converter.ts`)

Converts disease data to FHIR Condition resources.

#### Functions

#### `doencaToCondition(doenca, options?): FHIRCondition`

Converts a `Doença` object to FHIR Condition.

```typescript
import { doencaToCondition } from '@/lib/fhir/converters';

const condition = doencaToCondition(doenca, {
  subjectId: 'patient-123',
  encounterId: 'encounter-456',
  onsetDate: '2024-01-15T10:30:00Z',
  recorderId: 'practitioner-789',
  detail: 'extended',
  includeNotes: true,
  includeEvidence: true,
});
```

**Mapping:**
- `Doença.id` → `Condition.id`
- `Doença.titulo` → `Condition.code.text`
- `Doença.cid10` → `Condition.code.coding[ICD-10]`
- `Doença.cid11` → `Condition.code.coding[ICD-11]`
- `Doença.ciap2` → `Condition.code.coding[CIAP-2]`
- `Doença.snomedCT` → `Condition.code.coding[SNOMED-CT]`
- `Doença.categoria` → `Condition.category`
- `Doença.quickView.classificacaoRisco` → `Condition.severity`

**Terminology Systems:**
- ICD-10: `http://hl7.org/fhir/sid/icd-10`
- ICD-11: `http://hl7.org/fhir/sid/icd-11`
- CIAP-2: `http://hl7.org/fhir/sid/icpc-2`
- SNOMED-CT: `http://snomed.info/sct`
- DOID: `http://purl.obolibrary.org/obo/doid.owl`
- UMLS: `https://uts.nlm.nih.gov/uts/umls`
- HPO: `http://purl.obolibrary.org/obo/hp.owl`
- MeSH: `https://meshb.nlm.nih.gov/record/ui`

#### `conditionToDoenca(fhirCondition): Partial<Doença>`

Converts FHIR Condition back to Darwin-MFC `Doença` (partial).

```typescript
import { conditionToDoenca } from '@/lib/fhir/converters';

const doenca = conditionToDoenca(fhirCondition);
```

#### `createConditionBundle(conditions, bundleId?): FHIRBundle`

Creates a Bundle with multiple Conditions.

```typescript
import { createConditionBundle } from '@/lib/fhir/converters';

const bundle = createConditionBundle(
  [condition1, condition2, condition3],
  'bundle-123'
);
```

### 2. Medication Converter (`medication-converter.ts`)

Converts medication data to FHIR Medication and MedicationStatement resources.

#### Functions

#### `medicamentoToMedication(medicamento, options?): FHIRMedication`

Converts a `Medicamento` object to FHIR Medication.

```typescript
import { medicamentoToMedication } from '@/lib/fhir/converters';

const medication = medicamentoToMedication(medicamento, {
  status: 'active',
  batchLotNumber: 'LOT123456',
  batchExpirationDate: '2025-12-31',
  detail: 'extended',
});
```

**Mapping:**
- `Medicamento.id` → `Medication.id`
- `Medicamento.nomeGenerico` → `Medication.code.text`
- `Medicamento.atcCode` → `Medication.code.coding[ATC]`
- `Medicamento.rxNormCui` → `Medication.code.coding[RxNorm]`
- `Medicamento.drugBankId` → `Medication.code.coding[DrugBank]`
- `Medicamento.snomedCT` → `Medication.code.coding[SNOMED-CT]`
- `Medicamento.apresentacoes[0].forma` → `Medication.form`

**Terminology Systems:**
- ATC: `http://www.whocc.no/atc`
- RxNorm: `http://www.nlm.nih.gov/research/umls/rxnorm`
- DrugBank: `https://www.drugbank.ca/drugs`
- SNOMED-CT: `http://snomed.info/sct`
- EDQM (Pharma Forms): `http://standardterms.edqm.eu`

#### `medicamentoToMedicationStatement(medicamento, posologia?, options?): FHIRMedicationStatement`

Converts a `Medicamento` with dosage to FHIR MedicationStatement (prescription/usage).

```typescript
import { medicamentoToMedicationStatement } from '@/lib/fhir/converters';

const statement = medicamentoToMedicationStatement(
  medicamento,
  {
    dose: '500 mg',
    frequencia: 'a cada 8 horas',
    via: 'oral',
    duracao: '7 dias',
  },
  {
    subjectId: 'patient-123',
    encounterId: 'encounter-456',
    status: 'active',
    indication: 'Infecção respiratória',
    prescriberId: 'practitioner-789',
    detail: 'extended',
  }
);
```

**Dosage Parsing:**
- Supports common frequency patterns: "a cada 8 horas", "2 vezes ao dia", "1 vez por semana"
- Extracts dose values and units automatically
- Maps routes to SNOMED-CT codes

#### `medicationToMedicamento(fhirMedication): Partial<Medicamento>`

Converts FHIR Medication back to Darwin-MFC `Medicamento` (partial).

```typescript
import { medicationToMedicamento } from '@/lib/fhir/converters';

const medicamento = medicationToMedicamento(fhirMedication);
```

#### `createMedicationBundle(medications, bundleId?): FHIRBundle`

Creates a Bundle with multiple Medications.

#### `createMedicationStatementBundle(statements, bundleId?): FHIRBundle`

Creates a Bundle with multiple MedicationStatements.

### 3. Bundle Builder (`bundle-builder.ts`)

Fluent API for building FHIR Bundles with various types and purposes.

#### Classes

#### `BundleBuilder`

Fluent builder for constructing FHIR Bundles.

```typescript
import { BundleBuilder } from '@/lib/fhir/converters';

const bundle = new BundleBuilder()
  .setType('transaction')
  .addResource(condition, {
    request: { method: 'POST', url: 'Condition' }
  })
  .addResource(medication, {
    request: { method: 'POST', url: 'Medication' }
  })
  .addLink('self', 'https://api.example.com/fhir')
  .setMeta({
    lastUpdated: new Date().toISOString(),
  })
  .build();
```

**Methods:**
- `setType(type)`: Set bundle type (document, message, transaction, batch, etc.)
- `setId(id)`: Set bundle ID
- `addResource(resource, entryOptions?)`: Add single resource
- `addResources(resources, entryOptions?)`: Add multiple resources
- `addLink(relation, url)`: Add related link
- `setMeta(meta)`: Set metadata
- `build()`: Build and return FHIRBundle
- `getSize()`: Get resource count
- `clear()`: Reset builder

#### Functions

#### `createCollectionBundle(resources, options?): FHIRBundle`

Creates a simple collection bundle.

```typescript
import { createCollectionBundle } from '@/lib/fhir/converters';

const bundle = createCollectionBundle([condition1, medication1]);
```

#### `createSearchSetBundle(resources, total?, options?): FHIRBundle`

Creates a searchset bundle (search results).

```typescript
import { createSearchSetBundle } from '@/lib/fhir/converters';

const bundle = createSearchSetBundle(
  [condition1, condition2],
  100, // total results available
  { type: 'searchset' }
);
```

#### `createTransactionBundle(entries, options?): FHIRBundle`

Creates a transaction bundle for atomic operations.

```typescript
import { createTransactionBundle } from '@/lib/fhir/converters';

const bundle = createTransactionBundle([
  {
    resource: condition,
    request: { method: 'POST', url: 'Condition' }
  },
  {
    resource: medication,
    request: { method: 'PUT', url: `Medication/${medication.id}` }
  }
]);
```

#### `validateBundle(bundle): string[]`

Validates bundle structure and returns errors.

```typescript
import { validateBundle } from '@/lib/fhir/converters';

const errors = validateBundle(bundle);
if (errors.length > 0) {
  console.error('Bundle validation errors:', errors);
}
```

#### `bundleToJsonLd(bundle): string`

Converts bundle to JSON-LD format for RDF processing.

#### `extractResourcesFromBundle(bundle): FHIRResource[]`

Extracts all resources from a bundle.

#### `filterResourcesByType(bundle, resourceType): Resource[]`

Filters resources by type.

```typescript
import { filterResourcesByType } from '@/lib/fhir/converters';

const conditions = filterResourcesByType(bundle, 'Condition');
const medications = filterResourcesByType(bundle, 'Medication');
```

## Usage Examples

### Example 1: Convert Single Disease to Condition

```typescript
import {
  doencaToCondition,
  createConditionBundle,
} from '@/lib/fhir/converters';
import { doencas } from '@/lib/data/doencas';

// Find a disease
const hipertensao = doencas.find(d => d.id === 'hipertensao');

// Convert to FHIR Condition
const condition = doencaToCondition(hipertensao, {
  subjectId: 'patient-123',
  detail: 'extended',
  includeEvidence: true,
});

// Create bundle
const bundle = createConditionBundle([condition]);

// Use bundle
console.log(JSON.stringify(bundle, null, 2));
```

### Example 2: Create Medication Statement for Prescription

```typescript
import { medicamentoToMedicationStatement } from '@/lib/fhir/converters';
import { medicamentos } from '@/lib/data/medicamentos';

const amoxicilina = medicamentos.find(m => m.id === 'amoxicilina');

const statement = medicamentoToMedicationStatement(
  amoxicilina,
  {
    dose: '500 mg',
    frequencia: '3 vezes ao dia',
    via: 'oral',
    duracao: '7 dias',
  },
  {
    subjectId: 'patient-123',
    encounterId: 'encounter-456',
    status: 'active',
    indication: 'Otite média aguda',
    prescriberId: 'practitioner-789',
  }
);

// Send to EHR system
await sendToFHIRServer(statement);
```

### Example 3: Transaction Bundle with Multiple Resources

```typescript
import { createTransactionBundle } from '@/lib/fhir/converters';

const transactionBundle = createTransactionBundle([
  {
    resource: condition,
    request: { method: 'POST', url: 'Condition' }
  },
  {
    resource: medication,
    request: { method: 'POST', url: 'Medication' }
  },
  {
    resource: medicationStatement,
    request: { method: 'POST', url: 'MedicationStatement' }
  }
], { id: 'tx-bundle-001' });

// Execute transaction on FHIR server
const response = await fetch('https://fhir-server.example.com', {
  method: 'POST',
  headers: { 'Content-Type': 'application/fhir+json' },
  body: JSON.stringify(transactionBundle),
});
```

### Example 4: Export Patient Data as FHIR Bundle

```typescript
import { BundleBuilder } from '@/lib/fhir/converters';
import { doencas } from '@/lib/data/doencas';
import { medicamentos } from '@/lib/data/medicamentos';

async function exportPatientDataAsBundle(patientId: string) {
  const builder = new BundleBuilder()
    .setType('searchset')
    .setId(`export-${patientId}-${Date.now()}`);

  // Add patient's conditions
  const conditions = doencas.map(d =>
    doencaToCondition(d, { subjectId: patientId })
  );

  // Add patient's medications
  const medications = medicamentos.map(m =>
    medicamentoToMedication(m)
  );

  builder
    .addResources(conditions)
    .addResources(medications)
    .addLink('self', `https://api.example.com/fhir/Patient/${patientId}`)
    .setMeta({
      lastUpdated: new Date().toISOString(),
    });

  const bundle = builder.build();

  // Export to file
  const json = JSON.stringify(bundle, null, 2);
  return json;
}
```

## Terminology Mapping

### ICD-10 → SNOMED-CT

The converters automatically map ICD-10 codes to SNOMED-CT when available, enabling semantic interoperability.

Example:
- ICD-10: `E11` (Type 2 diabetes)
- SNOMED-CT: `44054006` (Diabetes mellitus type 2)

### ATC → RxNorm

Medication codes are converted between ATC (WHO standard) and RxNorm (NIH standard).

Example:
- ATC: `C09AA01` (Enalapril)
- RxNorm: `3827` (Enalapril CUI)

## Edge Cases Handled

1. **Missing Fields**: Gracefully handles null/undefined values
2. **Null References**: Optional reference fields are excluded from output
3. **Empty Arrays**: Arrays with no elements are excluded
4. **Type Conversions**: Automatic conversion between compatible types
5. **Special Characters**: Properly escapes and handles special characters in text fields

## Performance Considerations

- **Lazy Evaluation**: Bundle building uses lazy evaluation for efficiency
- **Memory**: Resources are held in memory only during build process
- **Streaming**: Large bundles can be streamed using bundle pagination
- **Batch Operations**: Use transaction bundles for atomic multi-resource operations

## Standards Compliance

All converters follow FHIR R4 specifications:
- Resource definitions: https://www.hl7.org/fhir/
- Terminology bindings: https://www.hl7.org/fhir/terminologies.html
- Implementation guides: https://www.hl7.org/fhir/

## Integration Points

These converters integrate with:
- FHIR servers (HL7 standard healthcare systems)
- EHR/EMR systems
- Clinical decision support systems
- Health information exchanges
- Research data repositories

## Future Enhancements

- [ ] Observation resource converter (lab results, vital signs)
- [ ] Care Plan resource converter (treatment plans)
- [ ] Procedure resource converter (clinical procedures)
- [ ] Allergy Intolerance resource converter
- [ ] Immunization resource converter
- [ ] Document bundle support
- [ ] CDS Hooks integration

## Error Handling

All converters include validation and error handling:

```typescript
import { validateBundle } from '@/lib/fhir/converters';

try {
  const errors = validateBundle(bundle);
  if (errors.length > 0) {
    throw new Error(`Bundle validation failed: ${errors.join(', ')}`);
  }
} catch (error) {
  console.error('FHIR conversion error:', error);
}
```

## Testing

Comprehensive test coverage for:
- Bidirectional conversions
- Edge case handling
- Terminology mapping
- Bundle validation
- Performance benchmarks

## References

- FHIR R4 Specification: https://www.hl7.org/fhir/
- ICD-10 Coding: https://www.who.int/standards/classifications/classification-of-diseases
- SNOMED-CT: https://www.snomed.org/
- ATC Classification: https://www.who.int/tools/atc-ddd-toolkit/atc-classification
- RxNorm: https://www.nlm.nih.gov/research/umls/rxnorm/
