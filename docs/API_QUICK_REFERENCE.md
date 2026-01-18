# Darwin-MFC REST API v1 - Quick Reference

## Diseases API

```typescript
import {
  getDiseases,
  getDiseaseById,
  searchDiseases,
  getDiseasesByCategory,
  getDiseaseCategories,
  getDiseasesByCID10,
  getDiseasesByCIAP2,
} from '@/lib/api';

// List all diseases
const diseases = await getDiseases({ page: 1, pageSize: 20 });

// Get single disease
const disease = await getDiseaseById('hipertensao-arterial');

// Search diseases
const results = await searchDiseases('diabetes');

// Filter by category
const cardiovascular = await getDiseasesByCategory('cardiovascular');

// Get all categories
const categories = await getDiseaseCategories();

// Filter by code
const cid10Results = await getDiseasesByCID10('I10');
const ciap2Results = await getDiseasesByCIAP2('K86');
```

## Medications API

```typescript
import {
  getMedications,
  getMedicationById,
  searchMedications,
  getMedicationsByClass,
  getMedicationClasses,
  getMedicationInteractions,
} from '@/lib/api';

// List all medications
const meds = await getMedications({ page: 1, pageSize: 20 });

// Get single medication
const med = await getMedicationById('losartana');

// Search medications
const results = await searchMedications('antibiótico');

// Filter by class
const antiHypertensives = await getMedicationsByClass('anti_hipertensivo');

// Get all classes
const classes = await getMedicationClasses();

// Check interactions
const interactions = await getMedicationInteractions(['losartana', 'enalapril']);
```

## Calculators API

```typescript
import {
  getCalculators,
  getCalculatorById,
  searchCalculators,
  executeCalculator,
  getCalculatorsByCategory,
  getCalculatorCategories,
  getCalculatorCount,
} from '@/lib/api';

// List all calculators
const calcs = await getCalculators({ page: 1, pageSize: 20 });

// Get single calculator
const calc = await getCalculatorById('sofa');

// Search calculators
const results = await searchCalculators('SOFA');

// Execute calculator
const result = await executeCalculator('sofa', {
  respiratory: 1,
  coagulation: 0,
  liver: 1,
  cardiovascular: 2,
  cns: 2,
  renal: 1,
});

// Filter by category
const criticalCare = await getCalculatorsByCategory('critical-care');

// Get all categories
const categories = await getCalculatorCategories();

// Get count
const count = await getCalculatorCount();
```

## Common Patterns

### Error Handling

```typescript
const response = await getDiseaseById('id');

if (response.success) {
  console.log(response.data);
} else {
  console.error(response.error?.message);
  console.error(response.error?.code);
}
```

### Pagination

```typescript
const response = await getDiseases({
  page: 2,
  pageSize: 50,
  sortBy: 'titulo',
  sortOrder: 'asc'
});

if (response.success && response.data) {
  const { items, pagination } = response.data;
  console.log(`Page ${pagination.page} of ${pagination.totalPages}`);
}
```

### Filtering

```typescript
// Search with filters
const response = await searchMedications('losartana', {
  classe: 'anti_hipertensivo',
  page: 1,
  pageSize: 10
});

// Get by specific codes
const response = await getDiseases({
  cid10: 'I10',
  categoria: 'cardiovascular'
});
```

## Response Structure

```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
    totalPages?: number;
    timestamp?: string;
    version?: string;
  };
}
```

## Common Filters

### Disease Filters
- `search` - Full-text search
- `categoria` - Disease category
- `cid10` - CID-10 code
- `ciap2` - CIAP-2 code
- `doid` - Disease Ontology ID
- `snomedCT` - SNOMED-CT code
- `page` - Page number
- `pageSize` - Items per page
- `sortBy` - Sort field
- `sortOrder` - asc or desc

### Medication Filters
- `search` - Full-text search
- `classe` - Therapeutic class
- `subclasse` - Subclass
- `formaFarmaceutica` - Pharmaceutical form
- `atcCode` - ATC code
- `rxNormCui` - RxNorm CUI
- `drugBankId` - DrugBank ID
- `page` - Page number
- `pageSize` - Items per page
- `sortBy` - Sort field
- `sortOrder` - asc or desc

### Calculator Filters
- `search` - Full-text search
- `category` - Calculator category
- `page` - Page number
- `pageSize` - Items per page
- `sortBy` - Sort field
- `sortOrder` - asc or desc

## Import Shortcut

```typescript
// Import all API functions at once
import * as API from '@/lib/api';

const diseases = await API.getDiseases();
const disease = await API.getDiseaseById('id');
const medications = await API.getMedications();
// ... etc
```

## Full Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete details.
