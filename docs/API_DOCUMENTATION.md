# Darwin-MFC REST API v1 Documentation

## Overview

Darwin-MFC provides a comprehensive REST API v1 for accessing clinical data including diseases, medications, and medical calculators. Since this is a static export Next.js application, the API is **client-side only** and uses in-memory data.

**Base URL:** `/api` (relative to application root)
**API Version:** 1.0.0
**Format:** JSON

### Key Characteristics

- ✅ **Client-side Implementation** - No server required
- ✅ **TypeScript Support** - Full type definitions included
- ✅ **Pagination Support** - Efficient data handling
- ✅ **Advanced Filtering** - Multiple filter options per resource
- ✅ **Search Functionality** - Full-text search with accent normalization
- ✅ **Error Handling** - Consistent error responses
- ✅ **Standard REST Conventions** - Familiar endpoint structure

---

## Standard Response Format

All API endpoints return responses in the following format:

```typescript
interface APIResponse<T> {
  success: boolean;           // true if request succeeded
  data?: T;                   // Response data (only if success = true)
  error?: {                   // Error object (only if success = false)
    code: string;            // Error code for programmatic handling
    message: string;         // Human-readable error message
    details?: unknown;       // Additional error details
  };
  meta?: {                    // Metadata (optional)
    total?: number;          // Total items available
    page?: number;           // Current page (1-indexed)
    pageSize?: number;       // Items per page
    totalPages?: number;     // Total pages
    timestamp?: string;      // Response timestamp (ISO 8601)
    version?: string;        // API version
  };
}
```

### Example Success Response

```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "total": 150,
      "page": 1,
      "pageSize": 20,
      "totalPages": 8,
      "hasNext": true,
      "hasPrev": false
    }
  },
  "meta": {
    "total": 150,
    "page": 1,
    "pageSize": 20,
    "totalPages": 8,
    "timestamp": "2026-01-18T12:00:00Z",
    "version": "1.0.0"
  }
}
```

### Example Error Response

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Recurso com ID 'xxx' não encontrado",
    "details": null
  }
}
```

---

## Pagination

List endpoints support pagination through query parameters:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number (1-indexed) |
| `pageSize` | number | 20 | Items per page (max 100) |
| `sortBy` | string | - | Field to sort by |
| `sortOrder` | 'asc' \| 'desc' | 'asc' | Sort direction |

### Pagination Response

```typescript
interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;        // Total items available
    page: number;         // Current page
    pageSize: number;     // Items per page
    totalPages: number;   // Total pages
    hasNext: boolean;     // Has next page
    hasPrev: boolean;     // Has previous page
  };
}
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|------------|-------------|
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `CALCULATION_ERROR` | 400 | Calculator execution failed |
| `INTERPRETATION_ERROR` | 400 | Result interpretation failed |
| `INTERNAL_ERROR` | 500 | Internal server error |

---

## Disease Endpoints

### GET /api/diseases

List all diseases with optional filters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `page` | number | No | Page number (default: 1) |
| `pageSize` | number | No | Items per page (default: 20) |
| `search` | string | No | Search query (full-text) |
| `categoria` | string | No | Filter by disease category |
| `cid10` | string | No | Filter by CID-10 code |
| `ciap2` | string | No | Filter by CIAP-2 code |
| `doid` | string | No | Filter by DOID |
| `snomedCT` | string | No | Filter by SNOMED-CT |
| `ids` | string[] | No | List of specific disease IDs |
| `sortBy` | string | No | Sort field (titulo, id, categoria) |
| `sortOrder` | string | No | Sort direction (asc, desc) |

**Example Request:**

```typescript
import { getDiseases } from '@/lib/api';

const response = await getDiseases({
  search: 'hipertensão',
  categoria: 'cardiovascular',
  page: 1,
  pageSize: 10,
  sortBy: 'titulo',
  sortOrder: 'asc'
});

if (response.success) {
  console.log(response.data?.items); // Array of diseases
  console.log(response.data?.pagination); // Pagination info
}
```

### GET /api/diseases/:id

Get a single disease by ID.

**Parameters:**

| Name | Type | Required |
|------|------|----------|
| `id` | string | Yes |

**Example Request:**

```typescript
import { getDiseaseById } from '@/lib/api';

const response = await getDiseaseById('hipertensao-arterial');

if (response.success) {
  const disease = response.data;
  console.log(disease.titulo);
  console.log(disease.quickView);
  console.log(disease.fullContent);
}
```

### GET /api/diseases/search

Advanced search for diseases.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | string | Yes | Search query |
| `page` | number | No | Page number |
| `pageSize` | number | No | Items per page |
| `categoria` | string | No | Filter by category |

**Example Request:**

```typescript
import { searchDiseases } from '@/lib/api';

const response = await searchDiseases('diabetes', {
  categoria: 'metabolico',
  page: 1,
  pageSize: 20
});
```

### GET /api/diseases/by-category/:category

List diseases by category.

**Example Request:**

```typescript
import { getDiseasesByCategory } from '@/lib/api';

const response = await getDiseasesByCategory('cardiovascular');
```

### GET /api/diseases/by-cid10/:cid10

List diseases by CID-10 code.

**Example Request:**

```typescript
import { getDiseasesByCID10 } from '@/lib/api';

const response = await getDiseasesByCID10('I10');
```

### GET /api/diseases/by-ciap2/:ciap2

List diseases by CIAP-2 code.

**Example Request:**

```typescript
import { getDiseasesByCIAP2 } from '@/lib/api';

const response = await getDiseasesByCIAP2('K86');
```

### GET /api/diseases/categories

Get all available disease categories.

**Example Request:**

```typescript
import { getDiseaseCategories } from '@/lib/api';

const response = await getDiseaseCategories();

if (response.success) {
  const categories = response.data; // ['cardiovascular', 'metabolico', ...]
}
```

---

## Medication Endpoints

### GET /api/medications

List all medications with optional filters.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `page` | number | No | Page number (default: 1) |
| `pageSize` | number | No | Items per page (default: 20) |
| `search` | string | No | Search query (full-text) |
| `classe` | string | No | Filter by therapeutic class |
| `subclasse` | string | No | Filter by subclass |
| `formaFarmaceutica` | string | No | Filter by pharmaceutical form |
| `atcCode` | string | No | Filter by ATC code |
| `rxNormCui` | string | No | Filter by RxNorm CUI |
| `drugBankId` | string | No | Filter by DrugBank ID |
| `ids` | string[] | No | List of specific medication IDs |
| `sortBy` | string | No | Sort field (nomeGenerico, id, classe) |
| `sortOrder` | string | No | Sort direction (asc, desc) |

**Example Request:**

```typescript
import { getMedications } from '@/lib/api';

const response = await getMedications({
  search: 'losartana',
  classe: 'anti_hipertensivo',
  page: 1,
  pageSize: 10
});

if (response.success) {
  console.log(response.data?.items); // Array of medications
}
```

### GET /api/medications/:id

Get a single medication by ID.

**Example Request:**

```typescript
import { getMedicationById } from '@/lib/api';

const response = await getMedicationById('losartana');

if (response.success) {
  const med = response.data;
  console.log(med.nomeGenerico);
  console.log(med.posologias);
  console.log(med.interacoes);
}
```

### GET /api/medications/search

Advanced search for medications.

**Parameters:**

| Name | Type | Required |
|------|------|----------|
| `query` | string | Yes |
| `page` | number | No |
| `pageSize` | number | No |
| `classe` | string | No |

**Example Request:**

```typescript
import { searchMedications } from '@/lib/api';

const response = await searchMedications('antibiótico', {
  classe: 'antibiotico',
  page: 1
});
```

### GET /api/medications/by-class/:class

List medications by therapeutic class.

**Example Request:**

```typescript
import { getMedicationsByClass } from '@/lib/api';

const response = await getMedicationsByClass('anti_hipertensivo');
```

### GET /api/medications/classes

Get all available therapeutic classes.

**Example Request:**

```typescript
import { getMedicationClasses } from '@/lib/api';

const response = await getMedicationClasses();

if (response.success) {
  const classes = response.data; // ['anti_hipertensivo', 'antibiotico', ...]
}
```

### GET /api/medications/interactions

Check interactions between multiple medications.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `medicationIds` | string[] | Yes | Array of medication IDs to check |

**Response:**

```typescript
interface InteractionResult {
  medication1: string;      // First medication ID
  medication2: string;      // Second medication ID
  interaction: Interacao;   // Interaction details
}
```

**Example Request:**

```typescript
import { getMedicationInteractions } from '@/lib/api';

const response = await getMedicationInteractions(['losartana', 'enalapril']);

if (response.success) {
  const interactions = response.data;
  // [
  //   {
  //     medication1: 'losartana',
  //     medication2: 'enalapril',
  //     interaction: { ... }
  //   }
  // ]
}
```

---

## Calculator Endpoints

### GET /api/calculators

List all available clinical calculators.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `page` | number | No | Page number (default: 1) |
| `pageSize` | number | No | Items per page (default: 20) |
| `search` | string | No | Search query (full-text) |
| `category` | string | No | Filter by category |
| `ids` | string[] | No | List of specific calculator IDs |
| `sortBy` | string | No | Sort field (name, category, id) |
| `sortOrder` | string | No | Sort direction (asc, desc) |

**Response:**

```typescript
interface CalculatorMetadata {
  id: string;                // Unique identifier
  name: string;              // Full name
  abbreviation: string;      // Short abbreviation
  category: string;          // Category
  description: string;       // Brief description
  inputCount: number;        // Number of inputs
  hasValidationStudy: boolean; // Has validation study
}
```

**Example Request:**

```typescript
import { getCalculators } from '@/lib/api';

const response = await getCalculators({
  search: 'SOFA',
  page: 1,
  pageSize: 20
});

if (response.success) {
  console.log(response.data?.items);
}
```

### GET /api/calculators/:id

Get a complete calculator definition.

**Response:**

```typescript
interface ClinicalCalculator {
  id: string;
  name: string;
  abbreviation: string;
  category: CalculatorCategory;
  description: string;
  inputs: CalculatorInput[];
  calculate: (inputs: Record<string, number>) => number;
  interpret: (score: number) => ScoreInterpretation;
  citations: CalculatorCitation[];
  // ... other fields
}
```

**Example Request:**

```typescript
import { getCalculatorById } from '@/lib/api';

const response = await getCalculatorById('sofa');

if (response.success) {
  const calculator = response.data;
  console.log(calculator.name);      // "Sequential Organ Failure Assessment"
  console.log(calculator.inputs);    // Input definitions
  console.log(calculator.citations); // References
}
```

### POST /api/calculators/:id/execute

Execute a calculator with input values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Calculator ID |
| `inputs` | Record<string, number> | Yes | Input values |

**Response:**

```typescript
interface CalculatorResult {
  calculatorId: string;
  inputs: Record<string, number>;
  score: number;
  interpretation: ScoreInterpretation;
  timestamp: Date;
}

interface ScoreInterpretation {
  score: number;
  scoreDisplay?: string;      // e.g., "7.5%"
  category: string;
  risk: RiskLevel;
  mortality?: string;
  morbidity?: string;
  recommendation: string;
  action?: string;
  notes?: string[];
}
```

**Example Request:**

```typescript
import { executeCalculator } from '@/lib/api';

const response = await executeCalculator('sofa', {
  respiratory: 0,
  coagulation: 1,
  liver: 0,
  cardiovascular: 2,
  cns: 1,
  renal: 1
});

if (response.success) {
  const result = response.data;
  console.log(result.score);           // 5
  console.log(result.interpretation.risk);        // 'moderate'
  console.log(result.interpretation.recommendation);
}
```

### GET /api/calculators/search

Search for calculators.

**Parameters:**

| Name | Type | Required |
|------|------|----------|
| `query` | string | Yes |
| `page` | number | No |
| `pageSize` | number | No |
| `category` | string | No |

**Example Request:**

```typescript
import { searchCalculators } from '@/lib/api';

const response = await searchCalculators('cardiac', {
  category: 'cardiology'
});
```

### GET /api/calculators/by-category/:category

List calculators by category.

**Example Request:**

```typescript
import { getCalculatorsByCategory } from '@/lib/api';

const response = await getCalculatorsByCategory('critical-care');
```

### GET /api/calculators/categories

Get all available calculator categories.

**Response:**

```typescript
interface CategoryInfo {
  category: CalculatorCategory;
  label: string;
  icon: string;
  count: number;
}
```

**Example Request:**

```typescript
import { getCalculatorCategories } from '@/lib/api';

const response = await getCalculatorCategories();

if (response.success) {
  const categories = response.data;
  // [
  //   {
  //     category: 'critical-care',
  //     label: 'Critical Care',
  //     icon: '🏥',
  //     count: 5
  //   },
  //   ...
  // ]
}
```

### GET /api/calculators/count

Get total calculator count and breakdown by category.

**Response:**

```typescript
interface CalculatorCount {
  total: number;
  byCategory: Record<CalculatorCategory, number>;
}
```

**Example Request:**

```typescript
import { getCalculatorCount } from '@/lib/api';

const response = await getCalculatorCount();

if (response.success) {
  console.log(response.data?.total);        // 25
  console.log(response.data?.byCategory);   // { 'critical-care': 5, ... }
}
```

---

## Input Validation

Calculator inputs are validated before execution. Validation includes:

- Required field checking
- Min/max value validation
- Custom validation functions
- Type checking

**Example:**

```typescript
import { validateCalculatorInputs, getCalculatorById } from '@/lib/api';

const calcResponse = await getCalculatorById('sofa');

if (calcResponse.success) {
  const calculator = calcResponse.data;

  const validation = validateCalculatorInputs(calculator, {
    respiratory: 0,
    coagulation: 1
    // Missing required inputs...
  });

  if (!validation.valid) {
    console.log(validation.errors);
    // { "liver": "Campo obrigatório: Liver Dysfunction" }
  }
}
```

---

## Usage Examples

### Example 1: Search for Disease and Get Full Details

```typescript
import { searchDiseases, getDiseaseById } from '@/lib/api';

// Search for diseases
const searchResponse = await searchDiseases('infarto');

if (searchResponse.success && searchResponse.data?.items.length > 0) {
  const diseaseId = searchResponse.data.items[0].id;

  // Get full disease details
  const detailResponse = await getDiseaseById(diseaseId);

  if (detailResponse.success) {
    const disease = detailResponse.data;
    console.log(disease.titulo);
    console.log(disease.quickView.definicao);
    console.log(disease.fullContent.epidemiologia);
    console.log(disease.citations);
  }
}
```

### Example 2: Check Medication Interactions

```typescript
import { getMedicationInteractions } from '@/lib/api';

const medIds = ['losartana', 'enalapril', 'amlodipino'];

const response = await getMedicationInteractions(medIds);

if (response.success) {
  const interactions = response.data || [];

  for (const interaction of interactions) {
    if (interaction.interaction.gravidade === 'grave') {
      console.warn(
        `⚠️ Grave interaction between ${interaction.medication1} and ${interaction.medication2}`
      );
      console.log(interaction.interaction.efeito);
      console.log(interaction.interaction.conduta);
    }
  }
}
```

### Example 3: Execute Clinical Calculator

```typescript
import { getCalculatorById, executeCalculator } from '@/lib/api';

// Get calculator definition
const calcResponse = await getCalculatorById('sofa');

if (calcResponse.success) {
  const calculator = calcResponse.data;

  // Show input requirements
  console.log('SOFA Calculator Inputs:');
  calculator.inputs.forEach(input => {
    console.log(`- ${input.label}${input.required ? ' (required)' : ''}`);
    if (input.options) {
      input.options.forEach(opt => console.log(`  • ${opt.label}: ${opt.value}`));
    }
  });

  // Execute calculator
  const execResponse = await executeCalculator('sofa', {
    respiratory: 1,
    coagulation: 0,
    liver: 1,
    cardiovascular: 2,
    cns: 2,
    renal: 1
  });

  if (execResponse.success) {
    const result = execResponse.data;
    console.log(`\nResults:`);
    console.log(`Score: ${result.score}`);
    console.log(`Risk Level: ${result.interpretation.risk}`);
    console.log(`Recommendation: ${result.interpretation.recommendation}`);

    if (result.interpretation.notes) {
      console.log(`Notes:`);
      result.interpretation.notes.forEach(note => console.log(`  • ${note}`));
    }
  }
}
```

### Example 4: Paginated List with Filtering

```typescript
import { getMedications } from '@/lib/api';

// Get page 2 of cardiovascular medications
const response = await getMedications({
  classe: 'anti_hipertensivo',
  page: 2,
  pageSize: 15,
  sortBy: 'nomeGenerico',
  sortOrder: 'asc'
});

if (response.success && response.data) {
  const { items, pagination } = response.data;

  console.log(`Showing ${items.length} items`);
  console.log(`Page ${pagination.page} of ${pagination.totalPages}`);
  console.log(`Total: ${pagination.total} items`);

  if (pagination.hasNext) {
    console.log('More pages available');
  }

  items.forEach(med => {
    console.log(`- ${med.nomeGenerico}`);
  });
}
```

---

## Error Handling

All API functions return responses with consistent error structure:

```typescript
const response = await getCalculatorById('nonexistent');

if (!response.success) {
  console.error('Error:', response.error?.message);
  console.error('Code:', response.error?.code);

  if (response.error?.code === 'NOT_FOUND') {
    // Handle not found
  } else if (response.error?.code === 'VALIDATION_ERROR') {
    // Handle validation errors
    console.error('Details:', response.error?.details);
  }
}
```

---

## Limitations

Since this is a static client-side API:

1. **No server-side computation** - Complex queries are evaluated in JavaScript
2. **Full data download** - Large datasets load completely into memory
3. **No real-time updates** - Data refreshes require page reload
4. **Browser caching** - Responses are not cached automatically

---

## Migration Path

When migrating to server-side endpoints in the future:

1. The API client functions remain unchanged
2. Only the implementation details change
3. Response types are already standardized
4. Error handling is already in place

---

## Support

For issues or questions about the API:

1. Check the [type definitions](/lib/api/types.ts)
2. Review the [implementation files](/lib/api/)
3. See examples in the application components
4. Consult the [CLAUDE.md](CLAUDE.md) for architecture overview

---

**Last Updated:** 2026-01-18
**API Version:** 1.0.0
**Status:** Production
