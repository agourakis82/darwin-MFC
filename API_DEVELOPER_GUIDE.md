# Darwin-MFC API Developer Guide

**Quick Start Guide for Developers**

## What You're Building With

Darwin-MFC provides a **complete medical reference API** following OpenAPI 3.0 specifications. This guide helps you integrate it into your application.

## Quick Start (5 Minutes)

### 1. Get the OpenAPI Specification
```bash
curl https://mfc.agourakis.med.br/api/openapi.json > openapi.json
```

### 2. Import into Your Tool
- **Postman**: File → Import → Link/File
- **Swagger UI**: https://swagger.io/tools/swagger-ui/
- **VS Code**: Install REST Client, use `@host` directives
- **ReDoc**: https://redoc.ly/

### 3. Make Your First API Call
```bash
# Get disease information
curl https://mfc.agourakis.med.br/api/doencas/hipertensao-arterial

# Search medications
curl "https://mfc.agourakis.med.br/api/medicamentos?search=losartana"

# Check drug interactions
curl -X POST https://mfc.agourakis.med.br/api/medicamentos/interacoes \
  -H "Content-Type: application/json" \
  -d '{"medicamentoIds": ["enalapril", "losartana"]}'
```

## Common Workflows

### Workflow 1: Display Disease Information
```javascript
async function displayDiseaseInfo(diseaseId) {
  const response = await fetch(
    `https://mfc.agourakis.med.br/api/doencas/${diseaseId}`
  );
  const { success, data } = await response.json();

  if (success) {
    // Display quick view
    document.getElementById('definition').textContent =
      data.quickView.definicao;

    // Display diagnostic criteria
    const list = document.getElementById('criteria');
    data.quickView.criteriosDiagnosticos.forEach(criterion => {
      const li = document.createElement('li');
      li.textContent = criterion;
      list.appendChild(li);
    });

    // Display treatment
    document.getElementById('treatment').innerHTML =
      formatTreatment(data.quickView.tratamentoPrimeiraLinha);
  }
}
```

### Workflow 2: Browse Medications by Class
```javascript
async function getMedicationsByClass(therapeuticClass) {
  const medications = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `https://mfc.agourakis.med.br/api/medicamentos?classe=${therapeuticClass}&page=${page}`
    );
    const { data, pagination } = await response.json();

    medications.push(...data);
    hasMore = page < pagination.totalPages;
    page++;
  }

  return medications;
}

// Usage
const antiHypertensives = await getMedicationsByClass('anti_hipertensivo');
```

### Workflow 3: Check Drug Interactions
```javascript
async function checkMedicationSafety(medicationIds) {
  const response = await fetch(
    'https://mfc.agourakis.med.br/api/medicamentos/interacoes',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ medicamentoIds: medicationIds })
    }
  );

  const { success, data } = await response.json();

  if (success) {
    data.interacoes.forEach(interaction => {
      const severity = {
        'leve': 'ℹ️ Mild - Monitor',
        'moderada': '⚠️ Moderate - Consider adjustment',
        'grave': '🔴 Severe - Avoid if possible',
        'contraindicada': '⛔ Contraindicated - Do not use'
      };

      console.log(`
        ${interaction.medicamento1} + ${interaction.medicamento2}
        ${severity[interaction.gravidade]}
        Effect: ${interaction.efeito}
        Management: ${interaction.conduta}
      `);
    });
  }
}
```

### Workflow 4: Use Clinical Calculators
```javascript
async function calculateEGFR(patientData) {
  const response = await fetch(
    'https://mfc.agourakis.med.br/api/calculadoras/ckd-epi',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parameters: {
          creatinine: patientData.creatinine,    // mg/dL
          age: patientData.age,                  // years
          gender: patientData.gender,            // 'M' or 'F'
          race: patientData.race                 // 'white', 'black', 'other'
        }
      })
    }
  );

  const { success, data } = await response.json();

  if (success) {
    return {
      value: data.result.value,
      unit: data.result.unit,
      stage: data.result.category,
      interpretation: data.result.interpretation
    };
  }
}
```

### Workflow 5: Search and Filter
```javascript
// Search with multiple filters
async function findDiseases(options = {}) {
  const params = new URLSearchParams({
    page: options.page || 1,
    pageSize: options.pageSize || 20,
    ...(options.categoria && { categoria: options.categoria }),
    ...(options.search && { search: options.search }),
    ...(options.ciap2 && { ciap2: options.ciap2 })
  });

  const response = await fetch(
    `https://mfc.agourakis.med.br/api/doencas?${params}`
  );
  return response.json();
}

// Usage examples
const cardiovascularDiseases = await findDiseases({
  categoria: 'cardiovascular',
  page: 1,
  pageSize: 50
});

const hypertensionResults = await findDiseases({
  search: 'hipertensao',
  page: 1
});

const ciap2CodeK86 = await findDiseases({
  ciap2: 'K86'
});
```

## Response Patterns

### List Endpoints (Pagination)
```json
{
  "success": true,
  "data": [
    { "id": "disease-1", "titulo": "..." },
    { "id": "disease-2", "titulo": "..." }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 82,
    "totalPages": 5
  }
}
```

### Detail Endpoints
```json
{
  "success": true,
  "data": {
    "id": "hipertensao-arterial",
    "titulo": "Hypertension",
    "quickView": { ... },
    "fullContent": { ... },
    "citations": [ ... ]
  }
}
```

### Error Responses
```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid page number",
    "details": { "page": "must be >= 1" }
  }
}
```

## Error Handling Patterns

### Try-Catch Pattern
```javascript
async function safeApiCall(endpoint) {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error.message);
    }

    return data.data;

  } catch (error) {
    console.error('API Error:', error.message);
    // Handle error appropriately
    return null;
  }
}
```

### Promise Pattern
```javascript
fetch('https://mfc.agourakis.med.br/api/doencas/hipertensao-arterial')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(data => {
    if (data.success) {
      console.log('Disease:', data.data.titulo);
    } else {
      console.error('API Error:', data.error.message);
    }
  })
  .catch(error => {
    console.error('Network Error:', error.message);
  });
```

### Async-Await Pattern
```javascript
async function robustApiCall(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(`${data.error.code}: ${data.error.message}`);
    }

    return data;

  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      console.error('Network unavailable');
    } else if (error instanceof SyntaxError) {
      // JSON parse error
      console.error('Invalid response format');
    } else {
      // API error
      console.error('API Error:', error.message);
    }
    throw error;
  }
}
```

## Performance Tips

### 1. Pagination
Always use pagination to reduce payload size:
```javascript
// Good - Limited results
fetch('https://mfc.agourakis.med.br/api/medicamentos?page=1&pageSize=20')

// Avoid - Too large
fetch('https://mfc.agourakis.med.br/api/medicamentos?pageSize=1000')
```

### 2. Filtering
Use filters to reduce results:
```javascript
// Good - Filtered
fetch('https://mfc.agourakis.med.br/api/medicamentos?classe=antibiotico&rename=true')

// Less efficient - All medications
fetch('https://mfc.agourakis.med.br/api/medicamentos')
```

### 3. Caching
Cache responses client-side:
```javascript
const cache = new Map();

async function getCachedDisease(id, ttl = 3600000) {
  if (cache.has(id)) {
    const { data, timestamp } = cache.get(id);
    if (Date.now() - timestamp < ttl) {
      return data;
    }
  }

  const response = await fetch(
    `https://mfc.agourakis.med.br/api/doencas/${id}`
  );
  const result = await response.json();

  if (result.success) {
    cache.set(id, {
      data: result.data,
      timestamp: Date.now()
    });
  }

  return result.data;
}
```

### 4. Batch Requests
Load multiple resources efficiently:
```javascript
async function getDiseaseWithMedicationsAndCalculators(diseaseId) {
  const [disease, calcs] = await Promise.all([
    fetch(`https://mfc.agourakis.med.br/api/doencas/${diseaseId}`)
      .then(r => r.json()),
    fetch('https://mfc.agourakis.med.br/api/calculadoras')
      .then(r => r.json())
  ]);

  return {
    disease: disease.data,
    calculators: calcs.data
  };
}
```

## Testing

### Health Check
```bash
curl https://mfc.agourakis.med.br/api/health
```

### Test Common Endpoints
```bash
# Diseases
curl "https://mfc.agourakis.med.br/api/doencas?page=1&pageSize=5"
curl "https://mfc.agourakis.med.br/api/doencas/hipertensao-arterial"

# Medications
curl "https://mfc.agourakis.med.br/api/medicamentos?classe=anti_hipertensivo"
curl "https://mfc.agourakis.med.br/api/medicamentos/enalapril"

# Calculators
curl "https://mfc.agourakis.med.br/api/calculadoras"

# References
curl "https://mfc.agourakis.med.br/api/references?type=artigo"
```

## Rate Limiting & Quotas

**Current Policy:**
- No authentication required
- No rate limiting (static data)
- No strict quotas
- Responses cached up to 1 hour
- Recommended: Cache on client for better performance

## Language Support

Current API returns Portuguese data. Language variants handled at application level:

```javascript
// Translated disease names by locale
const diseaseNames = {
  pt: 'Hipertensão Arterial Sistêmica',
  en: 'Hypertension',
  es: 'Hipertensión Arterial',
  fr: 'Hypertension Artérielle'
};

// API always returns Portuguese
const disease = await fetch(
  'https://mfc.agourakis.med.br/api/doencas/hipertensao-arterial'
).then(r => r.json());

// Your app handles translation
const title = diseaseNames[userLanguage];
```

## Data Citation

Always include proper attribution when using medical data:

```javascript
// Format reference in APA style
function formatReference(reference) {
  const authors = reference.authors?.join(', ') || 'Unknown';
  const year = reference.year;
  const title = reference.title;

  return `${authors} (${year}). ${title}. ${reference.journal || reference.publisher}.`;
}

// Include in your documentation
const disease = await fetch(
  'https://mfc.agourakis.med.br/api/doencas/hipertensao-arterial'
).then(r => r.json());

disease.data.citations.forEach(citation => {
  const reference = /* get from references endpoint */;
  console.log('Based on:', formatReference(reference));
});
```

## Integration Examples

### React Component
```jsx
import { useState, useEffect } from 'react';

export function DiseaseCard({ diseaseId }) {
  const [disease, setDisease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://mfc.agourakis.med.br/api/doencas/${diseaseId}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setDisease(data.data);
        } else {
          setError(data.error.message);
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [diseaseId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="disease-card">
      <h2>{disease.titulo}</h2>
      <p>{disease.quickView.definicao}</p>
      <h3>Diagnostic Criteria</h3>
      <ul>
        {disease.quickView.criteriosDiagnosticos.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Vue Component
```vue
<template>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else class="disease-card">
    <h2>{{ disease.titulo }}</h2>
    <p>{{ disease.quickView.definicao }}</p>
    <h3>Diagnostic Criteria</h3>
    <ul>
      <li v-for="criterion in disease.quickView.criteriosDiagnosticos" :key="criterion">
        {{ criterion }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({ diseaseId: String });
const disease = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(() => {
  fetch(`https://mfc.agourakis.med.br/api/doencas/${props.diseaseId}`)
    .then(r => r.json())
    .then(data => {
      if (data.success) disease.value = data.data;
      else error.value = data.error.message;
    })
    .catch(err => error.value = err.message)
    .finally(() => loading.value = false);
});
</script>
```

## Support

- **Documentation**: https://mfc.agourakis.med.br/api-docs
- **OpenAPI Spec**: https://mfc.agourakis.med.br/api/openapi.json
- **Email**: darwin@agourakis.med.br
- **GitHub**: Available upon request

## Next Steps

1. **Explore the API**: Visit `/api-docs` for interactive documentation
2. **Test Endpoints**: Use cURL, Postman, or REST Client
3. **Integrate**: Build your application using the patterns above
4. **Give Feedback**: Report issues and suggest improvements

---

**Happy Coding!**

For more information, see `API_SPECIFICATION.md` and `/lib/api/README.md`
