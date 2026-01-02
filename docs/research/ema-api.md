# European Medicines Agency (EMA) API Research

> Research Date: 2026-01-02
> Author: Darwin-MFC Research Team

## Executive Summary

The European Medicines Agency (EMA) provides multiple APIs and data access methods for medication information. Unlike the FDA's openFDA, the EMA ecosystem is more fragmented with different services for different data types. The main data access methods are:

1. **JSON Data Downloads** - Static JSON files updated twice daily
2. **ePI API** - Electronic Product Information (publicly available, no auth)
3. **SPOR APIs** - Substance, Product, Organisation, Referential (requires registration)
4. **PMS API** - Product Management Service (requires registration, public API planned for Q1 2026)

---

## 1. JSON Data Downloads (Recommended for Static Data)

### Overview

EMA provides downloadable JSON files containing comprehensive medicine data. These are the most accessible option for batch data retrieval.

### Base URL

```
https://www.ema.europa.eu
```

### Available Endpoints

| Data Category | Endpoint Path |
|--------------|---------------|
| All Documents (English) | `/en/documents/report/documents-output-json-report_en.json` |
| Centrally Authorised Medicines Documents | `/en/documents/report/documents-output-epar_documents_json-report_en.json` |
| Other Documents & Translations | `/en/documents/report/documents-output-non_epar_documents_json-report_en.json` |
| **Medicines (Centralised Procedure)** | `/en/documents/report/medicines-output-medicines_json-report_en.json` |
| Post-Authorisation Procedures | `/en/documents/report/medicines-output-post_authorisation_json-report_en.json` |
| Referrals | `/en/documents/report/referrals-output-json-report_en.json` |
| Paediatric Investigation Plans | `/medicines-output-paediatric_investigation_plans-output-json-report_en.json` |
| Orphan Designations | `/medicines-output-orphan_designations-json-report_en.json` |
| Periodic Safety Updates (PSUSAs) | `/medicines-output-periodic_safety_update_report_single_assessments-output-json-report_en.json` |
| Healthcare Professional Communications | `/dhpc-output-json-report_en.json` |
| Medicine Supply Shortages | `/shortages-output-json-report_en.json` |
| Herbal Medicines | `/media/70862` |
| Medicines for Use Outside EU | `/media/70860` |

### Update Frequency

- **Twice daily**: 06:00 and 18:00 Amsterdam time (CET)

### Authentication

- **None required** - Publicly accessible

### Example API Call

```bash
# Fetch medicines data
curl -o ema-medicines.json \
  "https://www.ema.europa.eu/en/documents/report/medicines-output-medicines_json-report_en.json"
```

### Available Data Fields (Medicines)

```json
{
  "category": "Human",
  "name_of_medicine": "Humira",
  "ema_product_number": "EMEA/H/C/000481",
  "medicine_status": "Authorised",
  "opinion_status": "Positive",
  "active_substance": "adalimumab",
  "therapeutic_area_mesh": ["Arthritis, Rheumatoid", "Psoriasis"],
  "atc_code_human": "L04AB04",
  "therapeutic_indication": "Treatment of rheumatoid arthritis...",
  "marketing_authorisation_holder": "AbbVie Deutschland GmbH & Co. KG",
  "european_commission_decision_date": "2003-09-08",
  "first_published": "...",
  "last_updated": "..."
}
```

---

## 2. ePI API (Electronic Product Information)

### Overview

The ePI API provides access to electronic product information for EU human medicines. Uses FHIR (HL7) standard data format.

### Developer Portal

- **URL**: https://epi.developer.ema.europa.eu/api-details
- **Platform**: Microsoft Azure API Management

### Authentication

- **None required** - Publicly available without API keys or subscription

### Endpoints

| Endpoint | Description |
|----------|-------------|
| `ListBySearchParameter` | Search for ePI documents by parameters |
| `BundleBySearchParameter` | Get FHIR Bundles by search parameters |
| `ListById` | Get PI List by ID |
| `BundleById` | Get FHIR Bundle by ID |

### Data Format

- **Standard**: FHIR R5 (Fast Healthcare Interoperability Resources)
- **Content Types**: XML, JSON, or RDF (set via `Accept` header or `_format` parameter)

### FHIR Bundle Structure

```json
{
  "resourceType": "Bundle",
  "id": "b99c95f8-bb0b-ef11-9f8a-000d3aa845fb",
  "meta": {
    "profile": ["http://ema.europa.eu/fhir/StructureDefinition/EUEpiBundle"]
  },
  "identifier": {
    "system": "http://ema.europa.eu/fhir/epiDocument",
    "value": "b99c95f8-bb0b-ef11-9f8a-000d3aa845fb"
  },
  "type": "document",
  "timestamp": "2024-05-08T09:21:26.034+00:00",
  "entry": [
    {
      "resourceType": "Composition",
      "id": "...",
      "language": "en",
      "meta": {
        "profile": ["http://ema.europa.eu/fhir/StructureDefinition/EUEpiComposition"]
      }
    }
  ]
}
```

### Limitations

- Currently limited to medicines published during the EMA-HMA-EC ePI pilot program
- Not all EU medicines are available through this API yet

---

## 3. SPOR APIs (Substance, Product, Organisation, Referential)

### Overview

SPOR is a suite of four master data management services compliant with ISO IDMP standards:

1. **SMS** (Substance Management Service) - Substance/ingredient data
2. **PMS** (Product Management Service) - Medicinal product data
3. **OMS** (Organisation Management Service) - MAH/sponsor data
4. **RMS** (Referentials Management Service) - Controlled vocabularies

### API Specification Documents

- **SPOR API v2 Specification**: https://www.ema.europa.eu/en/documents/other/spor-api-v2-specification_en.pdf
- **SPOR API v1 Specification (v1.7)**: https://www.ema.europa.eu/en/documents/other/substance-product-organisation-referentials-spor-application-program-interface-api-specification-version-17_en.pdf

### Authentication

```
HTTP Basic Authentication over SSL
```

- Authorization: Role-Based Access Control (RBAC)
- Roles assigned during user registration
- Requires EMA account

### Registration Process

1. Create EMA user account
2. Request SPOR API access through EMA portal
3. Follow EU IDMP Implementation Guide Chapter 1 (section 3.2.1)

### API Versions

| Version | Technology | Status |
|---------|------------|--------|
| v1 | RESTful XML/JSON | Maintained |
| v2 | FHIR-based | Current/Recommended |

### Base URL Pattern

```
/v{version}/
```

### Key Endpoints (v2)

| Endpoint | Description |
|----------|-------------|
| `/v2/MedicinalProductDefinition` | Search products |
| `/v2/SubstanceDefinition` | Search substances |
| `/v2/Organization` | Search organizations |
| `/v2/$everything` | Get complete product data |

---

## 4. PMS API (Product Management Service)

### Current Status

- **Read-Only Access**: Available for registered users (industry and regulators)
- **Edit Functionality**: Being gradually released for non-CAPs
- **Public API**: Planned for Q1 2026 (UAT February 2026)

### Data Access

Registered users can view:
- Centrally Authorised Products (CAPs)
- Non-CAPs compliant with ISO IDMP standards

### Data Standard

- **FHIR R5** for data exchange
- ISO IDMP compliant structures

### Access Limitations

- General public cannot currently access PMS API
- Limited to registered industry and NCA users
- Public version expected end of Q1 2026

---

## 5. Rate Limits

| API/Service | Rate Limit |
|------------|------------|
| JSON Downloads | No limit (static files) |
| ePI API | Not documented (assumed fair use) |
| SPOR APIs | Not publicly documented |

---

## 6. Mapping to Darwin-MFC Medicamento Type

### Field Mapping Table

| Darwin-MFC Field | EMA JSON Field | EMA ePI/SPOR Field |
|-----------------|----------------|-------------------|
| `id` | (generate from ema_product_number) | `Bundle.id` |
| `nomeGenerico` | `active_substance` | `SubstanceDefinition.name` |
| `nomesComerciais` | `name_of_medicine` | `MedicinalProductDefinition.name` |
| `atcCode` | `atc_code_human` | `MedicinalProductDefinition.classification.coding` |
| `classeTerapeutica` | (derive from `therapeutic_area_mesh`) | (derive from ATC) |
| `indicacoes` | `therapeutic_indication` | `ClinicalUseDefinition.indication` |
| `gestacao` | (not directly available) | (from SmPC section) |
| `contraindicacoes` | (not in JSON) | (from SmPC section 4.3) |
| `efeitosAdversos` | (not in JSON) | (from SmPC section 4.8) |
| `interacoes` | (not in JSON) | (from SmPC section 4.5) |
| `lastUpdate` | `last_updated` | `Bundle.timestamp` |

### Implementation Strategy

```typescript
// Example EMA to Medicamento mapper
function mapEMAToMedicamento(emaProduct: EMAProduct): Partial<Medicamento> {
  return {
    id: `ema-${emaProduct.ema_product_number.replace(/\//g, '-')}`,
    nomeGenerico: emaProduct.active_substance,
    nomesComerciais: [emaProduct.name_of_medicine],
    atcCode: emaProduct.atc_code_human,
    classeTerapeutica: deriveClasseFromATC(emaProduct.atc_code_human),
    indicacoes: parseIndications(emaProduct.therapeutic_indication),
    lastUpdate: emaProduct.last_updated,
    // Additional fields require ePI API or manual curation
    gestacao: 'N', // Default - requires SmPC parsing
    rename: false, // EMA products, not RENAME
    apresentacoes: [], // Requires additional data
    mecanismoAcao: '', // Requires curation
    posologias: [], // From SmPC section 4.2
    contraindicacoes: [], // From SmPC section 4.3
    efeitosAdversos: { comuns: [], graves: [] }, // From SmPC section 4.8
    interacoes: [], // From SmPC section 4.5
    amamentacao: { compativel: false, observacao: '' }, // From SmPC
    doencasRelacionadas: [],
    citations: []
  };
}

function deriveClasseFromATC(atcCode: string): ClasseTerapeutica {
  // ATC first letter indicates anatomical main group
  const atcMap: Record<string, ClasseTerapeutica> = {
    'A': 'gastrointestinal',
    'B': 'anticoagulante',
    'C': 'anti_hipertensivo',
    'D': 'outros', // Dermatologicals
    'G': 'hormonio',
    'H': 'hormonio',
    'J': 'antibiotico',
    'L': 'imunossupressor',
    'M': 'anti_inflamatorio',
    'N': 'analgesico',
    'P': 'antiparasitario',
    'R': 'broncodilatador',
    'S': 'outros',
    'V': 'outros'
  };
  return atcMap[atcCode?.charAt(0)] || 'outros';
}
```

---

## 7. Data Gaps and Limitations

### Available from EMA JSON Downloads

- Medicine name (brand and active substance)
- Marketing authorization holder
- Authorization dates and status
- Therapeutic area (MeSH terms)
- ATC code
- Basic indication text

### NOT Available (Requires ePI parsing or manual curation)

- Detailed dosing/posology
- Contraindications
- Drug interactions
- Adverse effects with frequencies
- Pregnancy/lactation categories
- Renal/hepatic adjustments
- Monitoring requirements
- Patient instructions

### Recommended Approach

1. **Phase 1**: Use JSON downloads for basic product catalog
2. **Phase 2**: Integrate ePI API for SmPC data when available
3. **Phase 3**: Manual curation for clinical details not in structured form
4. **Future**: Wait for Public PMS API (Q1 2026) for comprehensive access

---

## 8. Example Implementation

### Fetching EMA Medicines Data

```typescript
// lib/data/ema/fetchEMAMedicines.ts

interface EMAMedicine {
  category: string;
  name_of_medicine: string;
  ema_product_number: string;
  medicine_status: string;
  active_substance: string;
  therapeutic_area_mesh: string[];
  atc_code_human: string;
  therapeutic_indication: string;
  marketing_authorisation_holder: string;
  european_commission_decision_date: string;
  last_updated: string;
}

async function fetchEMAMedicines(): Promise<EMAMedicine[]> {
  const response = await fetch(
    'https://www.ema.europa.eu/en/documents/report/medicines-output-medicines_json-report_en.json'
  );

  if (!response.ok) {
    throw new Error(`EMA API error: ${response.status}`);
  }

  const data = await response.json();

  // Filter for human medicines only
  return data.filter((med: EMAMedicine) => med.category === 'Human');
}

// Example usage for static generation
export async function getStaticEMAData() {
  const medicines = await fetchEMAMedicines();

  return medicines.map(med => ({
    id: `ema-${med.ema_product_number.replace(/\//g, '-')}`,
    name: med.name_of_medicine,
    activeSubstance: med.active_substance,
    atcCode: med.atc_code_human,
    indication: med.therapeutic_indication,
    mah: med.marketing_authorisation_holder,
    status: med.medicine_status
  }));
}
```

---

## 9. Comparison with Other Drug APIs

| Feature | EMA | FDA openFDA | DrugBank |
|---------|-----|-------------|----------|
| Authentication | None (JSON), Required (SPOR) | None | API Key |
| Rate Limits | Not documented | 1000/day (no key), 120K/day (with key) | Tiered |
| Data Format | JSON, XML, FHIR | JSON | JSON, XML |
| Real-time | No (2x daily updates) | Yes | Yes |
| Coverage | EU authorized | US authorized | Global |
| Drug Interactions | In SmPC (text) | Structured | Structured |
| Pricing | Free | Free | Paid (clinical) |
| FHIR Support | Yes (ePI) | No | No |

---

## 10. Official Resources

- **EMA Homepage**: https://www.ema.europa.eu/en/homepage
- **Download Medicine Data**: https://www.ema.europa.eu/en/medicines/download-medicine-data
- **JSON Data Format**: https://www.ema.europa.eu/en/about-us/about-website/download-website-data-json-data-format
- **ePI Developer Portal**: https://epi.developer.ema.europa.eu/api-details
- **SPOR Documentation**: https://www.ema.europa.eu/en/human-regulatory-overview/research-development/data-medicines-iso-idmp-standards-overview/substance-product-organisation-referential-spor-master-data
- **PMS/SMS Services**: https://www.ema.europa.eu/en/human-regulatory-overview/research-development/data-medicines-iso-idmp-standards-overview/substance-product-organisation-referential-spor-master-data/substance-product-data-management-services

---

## 11. Recommendations for Darwin-MFC

### Short-term (Immediate Implementation)

1. Use the **JSON downloads** for building an EU medicines catalog
2. Store as static TypeScript data similar to existing medicamentos structure
3. Set up a periodic fetch script to update data (manual or CI/CD)
4. Map ATC codes to therapeutic classes

### Medium-term (Q1 2026)

1. Monitor release of **Public PMS API**
2. Integrate ePI API for SmPC structured data when coverage improves
3. Build automated parser for contraindications, interactions, etc.

### Long-term

1. Implement full FHIR integration for real-time data
2. Consider SPOR API registration for comprehensive substance data
3. Cross-reference with DrugBank/RxNorm for enhanced interoperability

---

## Appendix A: ATC Code Mapping to ClasseTerapeutica

```typescript
const ATC_TO_CLASSE: Record<string, ClasseTerapeutica> = {
  // A - Alimentary tract and metabolism
  'A02': 'inibidor_bomba_protonica', // Antacids, antiulcerants
  'A03': 'antiespamodico',
  'A07': 'antidiarreico',
  'A10': 'antidiabetico',

  // B - Blood and blood forming organs
  'B01': 'anticoagulante',
  'B03': 'antianemico',

  // C - Cardiovascular system
  'C01': 'cardiotonico',
  'C02': 'anti_hipertensivo',
  'C03': 'diuretico',
  'C07': 'anti_hipertensivo', // Beta blockers
  'C08': 'anti_hipertensivo', // CCBs
  'C09': 'anti_hipertensivo', // ACEi/ARBs
  'C10': 'hipolipemiante',

  // J - Antiinfectives
  'J01': 'antibiotico',
  'J02': 'antifungico',
  'J04': 'antibiotico', // Antimycobacterials
  'J05': 'antiviral',

  // L - Antineoplastic and immunomodulating
  'L01': 'outros', // Antineoplastic
  'L04': 'imunossupressor',

  // M - Musculo-skeletal system
  'M01': 'aine',
  'M02': 'anti_inflamatorio',
  'M03': 'relaxante_muscular',
  'M04': 'antigotoso',
  'M05': 'anti_osteoporose',

  // N - Nervous system
  'N02': 'analgesico',
  'N03': 'anticonvulsivante',
  'N04': 'antiparkinsoniano',
  'N05': 'antipsicotico', // Psycholeptics
  'N06': 'antidepressivo', // Psychoanaleptics
  'N07': 'outros',

  // P - Antiparasitic products
  'P01': 'antiparasitario',
  'P02': 'antiparasitario',

  // R - Respiratory system
  'R01': 'descongestionante',
  'R03': 'broncodilatador',
  'R05': 'antitussigeno',
  'R06': 'anti_histaminico',

  // S - Sensory organs (eye/ear)
  // H - Systemic hormonal preparations
  'H01': 'hormonio',
  'H02': 'corticoide',
  'H03': 'hormonio_tireoide',
};
```

---

## Appendix B: Sample EMA Medicines JSON Response

```json
[
  {
    "category": "Human",
    "name_of_medicine": "Ozempic",
    "ema_product_number": "EMEA/H/C/004174",
    "medicine_status": "Authorised",
    "opinion_status": "Positive",
    "active_substance": "semaglutide",
    "therapeutic_area_mesh": ["Diabetes Mellitus, Type 2"],
    "atc_code_human": "A10BJ06",
    "therapeutic_indication": "Ozempic is indicated for the treatment of adults with insufficiently controlled type 2 diabetes mellitus as an adjunct to diet and exercise - as monotherapy when metformin is considered inappropriate due to intolerance or contraindications...",
    "marketing_authorisation_holder": "Novo Nordisk A/S",
    "european_commission_decision_date": "2018-02-08",
    "first_published": "2018-02-08",
    "last_updated": "2024-11-15",
    "url": "/en/medicines/human/EPAR/ozempic"
  }
]
```
