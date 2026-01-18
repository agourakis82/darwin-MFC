# Darwin-MFC API Documentation

## Overview

Darwin-MFC provides a comprehensive REST API for accessing medical reference data including diseases, medications, and clinical calculators. The API is built on OpenAPI 3.0 specification and serves Q1-standard (Nature/Cell level) medical information with full citations.

## API Specifications

### Base URL
```
Production: https://mfc.agourakis.med.br
Development: http://localhost:3000
```

### Version
- **Current**: 1.0.0
- **OpenAPI**: 3.0.3

### Academic Standard
- **Q1 (Nature/Cell level)** with Vancouver-style citations
- All claims backed by peer-reviewed literature

## Core Resources

### 1. Diseases (Doenças)
Comprehensive clinical protocols for 82+ primary care diseases.

**Endpoints:**
- `GET /api/doencas` - List diseases with pagination
- `GET /api/doencas/{id}` - Get disease details

**Features:**
- CIAP-2 and CID-10/11 classification
- SNOMED-CT, MeSH, DOID, UMLS codes
- Epidemiology, pathophysiology, diagnosis
- Treatment protocols (first-line and alternatives)
- Follow-up guidelines
- Red flags and referral criteria
- Full citations for all claims

**Example Disease ID:** `hipertensao-arterial`

### 2. Medications (Medicamentos)
Drug information from RENAME 2024 (Brazilian Essential Medications List) with dosage and interaction data.

**Endpoints:**
- `GET /api/medicamentos` - List medications with pagination
- `GET /api/medicamentos/{id}` - Get medication details
- `POST /api/medicamentos/interacoes` - Check drug interactions

**Features:**
- 138+ medications from RENAME 2024
- ATC, RxNorm, DrugBank, SNOMED-CT coding
- Dosage by indication, age group, renal function
- Pregnancy (FDA) and breastfeeding safety
- Drug-drug interactions with severity levels
- Commercial presentations and SUS availability
- Pharmacogenomics data (PharmGKB)
- Patient education points

**Example Medication ID:** `enalapril`

### 3. Clinical Calculators (Calculadoras)
25+ validated clinical calculators for evidence-based decision support.

**Endpoints:**
- `GET /api/calculadoras` - List calculators
- `GET /api/calculadoras/{id}` - Get calculator details
- `POST /api/calculadoras/{id}` - Execute calculator with parameters

**Categories:**
- Cardiovascular (Framingham, SCORE, etc.)
- Renal (CKD-EPI, eGFR)
- Metabolic (HOMA-IR, etc.)
- Obstetric/Pediatric
- Mental Health
- General medicine

**Example Calculator ID:** `ckd-epi`

### 4. References (Referencias)
Complete bibliography database with Vancouver-style citations.

**Endpoints:**
- `GET /api/references` - List references
- Filterable by type (journal articles, guidelines, government documents, etc.)

**Supported Types:**
- artigo (journal article)
- portaria (government regulation)
- lei (law)
- nota_tecnica (technical note)
- site (website)
- livro (book)
- diretriz (guideline)
- relatorio (report)

## API Features

### Pagination
All list endpoints support pagination:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 82,
    "totalPages": 5
  }
}
```

### Filtering & Search
- **Search**: Full-text fuzzy search by name, synonym, code
- **Category Filters**: Disease category, medication class
- **Code Filters**: CIAP-2, CID-10, ATC codes
- **Status Filters**: RENAME availability, pregnancy category

### Response Format
All endpoints return consistent JSON structure:

**Success Response:**
```json
{
  "success": true,
  "data": { /* endpoint-specific data */ },
  "pagination": { /* only for list endpoints */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Human-readable error message",
    "details": { /* additional context */ }
  }
}
```

## Authentication & Rate Limiting

- **Authentication**: None required (public API)
- **Rate Limiting**: No strict limits (static data)
- **CORS**: Enabled for all domains
- **Caching**: Responses cached for up to 1 hour

## Language Support

All data available in 9 languages:
- Portuguese (pt) - default
- English (en)
- Spanish (es)
- French (fr)
- Russian (ru)
- Arabic (ar) - RTL
- Chinese Simplified (zh)
- Greek (el)
- Hindi (hi)

**Note:** Current API returns Portuguese data. Language variants handled at application level via next-intl.

## Data Coding Systems

### Disease Classification
- **CIAP-2**: International Classification of Primary Care
- **CID-10**: ICD-10 (Portuguese)
- **CID-11**: ICD-11 (OMS 2022)
- **SNOMED-CT**: Systematized Nomenclature of Medicine
- **MeSH**: Medical Subject Headings (PubMed)
- **DOID**: Disease Ontology
- **UMLS**: Unified Medical Language System
- **HPO**: Human Phenotype Ontology
- **ORDO**: Orphanet Rare Disease Ontology
- **LOINC**: Lab observation codes

### Medication Classification
- **ATC**: Anatomical Therapeutic Chemical (WHO)
- **RxNorm**: NIH terminology
- **DrugBank**: Drug-specific database
- **SNOMED-CT**: Clinical terminology
- **DCB**: Denominação Comum Brasileira
- **ANVISA**: Brazilian regulatory codes
- **CAS**: Chemical Abstracts Service
- **PharmGKB**: Pharmacogenomics data

## OpenAPI Specification

The complete OpenAPI 3.0 specification is available at:
```
GET /api/openapi.json
```

This can be imported into:
- Swagger UI
- Postman
- Insomnia
- ReDoc
- VS Code REST Client
- Any OpenAPI-compatible tool

## Usage Examples

### JavaScript/Node.js
```javascript
// Fetch a disease
const disease = await fetch(
  'https://mfc.agourakis.med.br/api/doencas/hipertensao-arterial'
).then(r => r.json());

// Search medications
const meds = await fetch(
  'https://mfc.agourakis.med.br/api/medicamentos?search=losartana&classe=anti_hipertensivo'
).then(r => r.json());

// Check interactions
const interactions = await fetch(
  'https://mfc.agourakis.med.br/api/medicamentos/interacoes',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      medicamentoIds: ['enalapril', 'losartana']
    })
  }
).then(r => r.json());

// Calculate eGFR
const eGFR = await fetch(
  'https://mfc.agourakis.med.br/api/calculadoras/ckd-epi',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      parameters: {
        creatinine: 1.2,
        age: 45,
        gender: 'M',
        race: 'white'
      }
    })
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

# Filter medications
medications = requests.get(
    'https://mfc.agourakis.med.br/api/medicamentos',
    params={
        'classe': 'anti_hipertensivo',
        'rename': True
    }
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

# Search medications
curl -X GET "https://mfc.agourakis.med.br/api/medicamentos?search=losartana&page=1&pageSize=10"

# Check interactions
curl -X POST https://mfc.agourakas.med.br/api/medicamentos/interacoes \
  -H "Content-Type: application/json" \
  -d '{"medicamentoIds": ["enalapril", "losartana"]}'

# Get calculator details
curl -X GET https://mfc.agourakis.med.br/api/calculadoras/ckd-epi

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

## Health Check

Simple health check endpoint to verify API availability:
```
GET /api/health
```

Response:
```json
{
  "success": true,
  "timestamp": "2024-01-18T10:30:00Z",
  "status": "operational",
  "version": "1.0.0"
}
```

## Error Handling

### Common Error Codes
- `INVALID_PARAMETER`: Invalid query parameters or filter values
- `NOT_FOUND`: Requested resource not found
- `MALFORMED_REQUEST`: Invalid request body (POST endpoints)
- `SERVER_ERROR`: Internal server error
- `RATE_LIMIT`: Rate limit exceeded

### HTTP Status Codes
- **200**: Successful GET request
- **201**: Successful POST request
- **400**: Invalid parameters or malformed request
- **404**: Resource not found
- **429**: Rate limited
- **500**: Server error

## Documentation

### Interactive API Docs
- **Path**: `/api-docs` (in-browser)
- **Features**:
  - Expand/collapse endpoints
  - Copy example cURL commands
  - View request/response schemas
  - Link to OpenAPI JSON

### OpenAPI Tools
The OpenAPI JSON can be used with:

1. **Swagger UI**
   ```
   https://swagger.io/tools/swagger-ui/
   ```

2. **ReDoc**
   ```
   https://redoc.ly/
   ```

3. **Postman**
   - Import via "Import > Link" or "Import > File"

4. **VS Code REST Client**
   ```
   @host = https://mfc.agourakis.med.br
   GET {{host}}/api/doencas
   ```

## Best Practices

1. **Pagination**: Always handle pagination for list endpoints (default 20 items)
2. **Filtering**: Use specific filters to reduce payload size
3. **Caching**: Cache responses client-side when possible
4. **Error Handling**: Always check `success` field in response
5. **CORS**: Request from web applications automatically supported
6. **Citations**: Always attribute medical information to published sources

## Data Integrity & Validation

- All medical data validated against peer-reviewed literature
- ANVISA regulations and Brazilian guidelines followed
- Regular updates with latest clinical evidence
- Version tracking for all changes
- Complete audit trail in Git history

## Support & Contributions

For issues, questions, or contributions:
- **Email**: darwin@agourakis.med.br
- **Website**: https://mfc.agourakis.med.br
- **GitHub**: Available upon request
- **License**: MIT

## Version History

### v1.0.0 (Current)
- Initial OpenAPI 3.0 specification
- 82+ diseases
- 138+ medications from RENAME 2024
- 25+ clinical calculators
- Full citation system
- 9 language support (Portuguese primary)

---

**Last Updated**: January 2024
**Academic Standard**: Q1 (Nature/Cell level)
**Status**: Production Ready
