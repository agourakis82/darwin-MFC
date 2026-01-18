# Darwin-MFC OpenAPI 3.0 Specification

**Last Updated**: January 18, 2024
**Version**: 1.0.0
**Status**: Production Ready

## Overview

Darwin-MFC provides a comprehensive **OpenAPI 3.0** specification for accessing medical reference data. The API serves Q1-standard (Nature/Cell level) medical information with full citations through REST endpoints.

### Quick Facts
- **82+ diseases** with full clinical protocols
- **138+ medications** from RENAME 2024
- **25+ clinical calculators** for evidence-based decision support
- **Full citation system** with Vancouver-style references
- **9 language translations** (Portuguese primary)
- **Academic rigor** with inline citations throughout

## Files Created

### 1. OpenAPI Specification
**Location**: `/lib/api/openapi.ts`

Complete OpenAPI 3.0 specification object describing all API endpoints, schemas, and data structures. Includes:
- All endpoint definitions with parameters and responses
- Complete schema definitions for all data types
- Example values and response structures
- Error handling specifications
- CORS and header information

**Features:**
- 15+ API endpoints across 5 resource categories
- Comprehensive schema definitions with nested types
- Example requests and responses
- Error response schemas
- Tag-based organization

### 2. API Documentation Page
**Location**: `/app/[locale]/api-docs/page.tsx`

Interactive in-browser documentation providing:
- API overview and quick stats
- Interactive endpoint explorer
- Copy-to-clipboard cURL examples
- Code examples in JavaScript and Python
- Response format documentation
- Links to external tools (Swagger UI, OpenAPI JSON)

**Features:**
- Dark mode support
- Expandable endpoint details
- Live cURL command examples
- Feature highlights
- Support contact information

### 3. OpenAPI JSON Endpoint
**Location**: `/app/api/openapi.json/route.ts`

REST endpoint that serves the OpenAPI specification as JSON:
- **URL**: `GET /api/openapi.json`
- **Purpose**: Integration with Swagger UI, Postman, ReDoc, etc.
- **CORS Enabled**: Yes
- **Cache**: 1 hour

### 4. Health Check Endpoint
**Location**: `/app/api/health/route.ts`

Simple health check endpoint for API availability:
- **URL**: `GET /api/health`
- **Purpose**: Monitor API status and availability
- **Response**: Service info, version, timestamp

### 5. API Documentation
**Location**: `/lib/api/README.md`

Comprehensive API documentation including:
- Core resource descriptions
- Endpoint specifications
- Authentication and rate limiting
- Data coding systems (CIAP-2, CID-10, ATC, etc.)
- Usage examples in multiple languages
- Error handling guide
- Best practices

## API Endpoints

### Diseases (Doenças)
```
GET  /api/doencas              # List diseases with pagination
GET  /api/doencas/{id}         # Get disease details
```

**Filters:**
- `categoria` - Disease category (cardiovascular, metabolic, etc.)
- `search` - Full-text search by name/code
- `ciap2` - CIAP-2 classification code
- `cid10` - CID-10 classification code

### Medications (Medicamentos)
```
GET  /api/medicamentos         # List medications
GET  /api/medicamentos/{id}    # Get medication details
POST /api/medicamentos/interacoes  # Check drug interactions
```

**Filters:**
- `classe` - Therapeutic class (anti-hypertensive, antibiotic, etc.)
- `search` - Full-text search
- `rename` - Filter by RENAME availability
- `atc` - ATC classification code

### Clinical Calculators (Calculadoras)
```
GET  /api/calculadoras         # List calculators
GET  /api/calculadoras/{id}    # Get calculator details
POST /api/calculadoras/{id}    # Execute calculator
```

**Filters:**
- `category` - Calculator category
- `search` - Full-text search

### References (Bibliografía)
```
GET  /api/references           # List references
```

**Filters:**
- `type` - Reference type (article, guideline, regulation, etc.)
- `search` - Search by title/author

### System Endpoints
```
GET  /api/health               # Health check
GET  /api/openapi.json         # OpenAPI specification
```

## Data Schemas

### Doença (Disease)
```typescript
interface Doenca {
  id: string;
  titulo: string;
  sinonimos?: string[];
  categoria: string;
  ciap2: string[];
  cid10: string[];
  doid?: string;
  snomedCT?: string;
  meshId?: string;
  umlsCui?: string;

  quickView: {
    definicao: string;
    criteriosDiagnosticos: string[];
    tratamentoPrimeiraLinha: { ... };
    metasTerapeuticas?: string[];
    examesIniciais?: string[];
    redFlags: string[];
  };

  fullContent: {
    epidemiologia: { ... };
    fisiopatologia?: { ... };
    quadroClinico: { ... };
    diagnostico: { ... };
    tratamento: { ... };
    acompanhamento: { ... };
    prevencao?: { ... };
  };

  citations: Citation[];
  lastUpdate: string;
}
```

### Medicamento (Medication)
```typescript
interface Medicamento {
  id: string;
  nomeGenerico: string;
  nomesComerciais?: string[];
  classeTerapeutica: string;
  subclasse?: string;
  rename: boolean;

  atcCode?: string;
  snomedCT?: string | string[];
  drugBankId?: string;

  indicacoes: string[];
  posologias: Posologia[];
  contraindicacoes: string[];
  precaucoes?: string[];

  efeitosAdversos: {
    comuns: string[];
    graves?: string[];
  };

  interacoes: Interacao[];
  ajusteDoseRenal?: AjusteDoseRenal[];

  gestacao: 'A' | 'B' | 'C' | 'D' | 'X' | 'N';
  amamentacao: {
    compativel: boolean;
    observacao: string;
  };

  citations: Citation[];
  lastUpdate: string;
}
```

### Interacao (Drug Interaction)
```typescript
interface Interacao {
  medicamento: string;
  gravidade: 'leve' | 'moderada' | 'grave' | 'contraindicada';
  efeito: string;
  mecanismo?: string;
  conduta: string;
}
```

### Calculator
```typescript
interface Calculator {
  id: string;
  name: string;
  description: string;
  category: string;
  formula?: string;
  variables: CalculatorVariable[];
  interpretation?: {
    resultUnit: string;
    categories: Array<{
      min: number;
      max: number;
      label: string;
      clinical_significance: string;
    }>;
  };
}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* endpoint-specific */ },
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 82,
    "totalPages": 5
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid page number",
    "details": { }
  }
}
```

## Data Coding Systems

### Clinical Classifications
| System | Purpose | Example |
|--------|---------|---------|
| CIAP-2 | Primary Care | K86 (Hypertension) |
| CID-10 | Disease Classification | I10 (Essential Hypertension) |
| CID-11 | WHO Standard (2022) | BA00 |
| SNOMED-CT | Clinical Terminology | 38341003 |
| MeSH | Biomedical Indexing | D006973 |
| DOID | Disease Ontology | DOID:10763 |
| UMLS | Unified Medical Language | C0020538 |
| HPO | Human Phenotype | HP:0000822 |
| LOINC | Lab Test Codes | 3094-0 |

### Medication Classifications
| System | Purpose | Example |
|--------|---------|---------|
| ATC | WHO Therapeutic | C09AA02 |
| RxNorm | NIH Standard | 656659 |
| DrugBank | Drug Information | DB00884 |
| DCB | Brazilian Standard | Enalapril |
| ANVISA | Regulatory | 1234567 |
| CAS | Chemical | 106635-80-7 |
| SNOMED-CT | Clinical Term | 372567009 |

## Usage Examples

### JavaScript/Node.js
```javascript
// Get disease
const disease = await fetch(
  'https://mfc.agourakis.med.br/api/doencas/hipertensao-arterial'
).then(r => r.json());

// Get medications
const meds = await fetch(
  'https://mfc.agourakis.med.br/api/medicamentos?classe=anti_hipertensivo'
).then(r => r.json());

// Check interactions
const interactions = await fetch(
  'https://mfc.agourakis.med.br/api/medicamentos/interacoes',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ medicamentoIds: ['enalapril', 'losartana'] })
  }
).then(r => r.json());
```

### Python
```python
import requests

# Get disease
response = requests.get(
  'https://mfc.agourakis.med.br/api/doencas/hipertensao-arterial'
)
disease = response.json()

# Search medications
medications = requests.get(
  'https://mfc.agourakis.med.br/api/medicamentos',
  params={'classe': 'anti_hipertensivo', 'rename': True}
)

# Check interactions
interactions = requests.post(
  'https://mfc.agourakis.med.br/api/medicamentos/interacoes',
  json={'medicamentoIds': ['enalapril', 'losartana']}
)
```

### cURL
```bash
# Get disease
curl -X GET https://mfc.agourakis.med.br/api/doencas/hipertensao-arterial

# List medications
curl -X GET "https://mfc.agourakis.med.br/api/medicamentos?search=losartana&page=1"

# Check interactions
curl -X POST https://mfc.agourakis.med.br/api/medicamentos/interacoes \
  -H "Content-Type: application/json" \
  -d '{"medicamentoIds": ["enalapril", "losartana"]}'

# Execute calculator
curl -X POST https://mfc.agourakis.med.br/api/calculadoras/ckd-epi \
  -H "Content-Type: application/json" \
  -d '{
    "parameters": {
      "creatinine": 1.2,
      "age": 45,
      "gender": "M",
      "race": "white"
    }
  }'
```

## Authentication & CORS

- **Authentication**: None required (public API)
- **Rate Limiting**: No strict limits (static data)
- **CORS**: Enabled for all domains
- **Caching**: Responses cached up to 1 hour
- **Compression**: gzip enabled

## Error Handling

### HTTP Status Codes
| Code | Meaning |
|------|---------|
| 200 | Successful GET request |
| 201 | Successful POST request |
| 400 | Invalid parameters or malformed request |
| 404 | Resource not found |
| 429 | Rate limited |
| 500 | Server error |

### Error Codes
- `INVALID_PARAMETER` - Invalid query parameters
- `NOT_FOUND` - Resource not found
- `MALFORMED_REQUEST` - Invalid request body
- `SERVER_ERROR` - Internal error
- `RATE_LIMIT` - Rate limit exceeded

## Integration Tools

### Swagger UI
Import `/api/openapi.json` into Swagger UI for interactive documentation:
```
https://swagger.io/tools/swagger-ui/
```

### Postman
1. File → Import
2. Link: `https://mfc.agourakis.med.br/api/openapi.json`
3. Or upload downloaded JSON file

### ReDoc
Use ReDoc for beautiful API documentation:
```
https://redoc.ly/
```

### VS Code REST Client
```
@host = https://mfc.agourakis.med.br

### Get disease
GET {{host}}/api/doencas/hipertensao-arterial

### List medications
GET {{host}}/api/medicamentos?classe=anti_hipertensivo
```

## Best Practices

1. **Pagination**: Always handle pagination for list endpoints
   - Default: 20 items per page
   - Maximum: 100 items per page

2. **Filtering**: Use specific filters to reduce payload size
   - Filter by category, class, or code
   - Use search for targeted queries

3. **Caching**: Cache responses client-side when possible
   - API responses cached for 1 hour
   - Static medical data rarely changes

4. **Error Handling**: Always check `success` field
   ```javascript
   if (!response.success) {
     console.error(response.error);
   }
   ```

5. **CORS**: Automatic for web applications
   - No additional headers needed
   - Cross-origin requests supported

6. **Citations**: Always attribute medical information
   - Each endpoint includes citations
   - Use references for academic work

## Support & Contact

- **Email**: darwin@agourakis.med.br
- **Website**: https://mfc.agourakis.med.br
- **Documentation**: `/api-docs` (in-browser)
- **OpenAPI Spec**: `/api/openapi.json`
- **Health Check**: `/api/health`

## Version History

### v1.0.0 (Current)
- Initial OpenAPI 3.0 specification
- 82+ diseases with full protocols
- 138+ medications from RENAME 2024
- 25+ clinical calculators
- Complete citation system
- 9 language translations
- Health check and OpenAPI endpoints

## License & Attribution

**License**: MIT
**Academic Standard**: Q1 (Nature/Cell level)
**Maintained By**: Darwin Medical Foundation Cluster

All medical data validated against:
- Peer-reviewed literature
- Brazilian guidelines (SUS, ANVISA)
- International standards (WHO, USPSTF, NHS)
- Medical society recommendations

---

**Last Updated**: January 18, 2024
**Production Status**: Ready
**API Version**: 1.0.0
