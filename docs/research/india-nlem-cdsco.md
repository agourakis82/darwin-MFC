# India NLEM & CDSCO Data Sources Research

**Research Date:** January 2, 2026
**Purpose:** Identify official data sources for Indian medications to integrate with Darwin-MFC
**Author:** Darwin-MFC Research Team

---

## Executive Summary

India has several official and unofficial sources for medication data, though most are available as PDFs rather than structured data formats. The primary official sources are:

1. **NLEM 2022** - 384 essential medicines (official PDF)
2. **CDSCO** - Regulatory approval data (web portal, PDFs)
3. **Jan Aushadhi/PMBJP** - Generic medicines program (~2,000+ products)
4. **NP-NCD/NPCDCS** - NCD medication guidelines (PDFs)
5. **Indian Pharmacopoeia** - 3,152+ drug monographs (DVDs, subscription)

**Key Finding:** No official government API exists. Best structured data comes from community datasets (GitHub, Kaggle) with 250K+ medicines in CSV/JSON format.

---

## 1. National List of Essential Medicines (NLEM) 2022

### Overview
- **Total Medicines:** 384 drugs (up from 376 in NLEM 2015)
- **Categories:** 27 therapeutic categories
- **Healthcare Levels:** P (Primary), S (Secondary), T (Tertiary)
- **Release Date:** September 13, 2022
- **Governing Body:** Standing National Committee on Medicines (SNCM), Ministry of Health

### Official PDF Downloads

| Source | URL | Format |
|--------|-----|--------|
| CDSCO | https://cdsco.gov.in/opencms/resources/UploadCDSCOWeb/2018/UploadConsumer/nlem2022.pdf | PDF |
| ICMR | https://main.icmr.nic.in/sites/default/files/upload_documents/Report_and_NLEM_2022.pdf | PDF |
| NHSRC | https://qps.nhsrcindia.org/node/11818 | PDF |
| MoHFW | https://main.mohfw.gov.in/?q=newshighlights-104 | PDF |

### Data Available
- Generic drug names
- Therapeutic category
- Dosage forms and strengths
- Healthcare level (P/S/T)
- Route of administration

### Data Format
- **Available:** PDF only
- **Structured Data:** Not available officially
- **API:** None

### Notes
- The NLEM determines drug pricing under the Drug Price Control Order (DPCO)
- Medicines marked "P" are available at Primary Health Centers (PHCs)
- PDF requires manual extraction for database integration

---

## 2. CDSCO (Central Drugs Standard Control Organisation)

### Overview
CDSCO is India's national regulatory body for pharmaceuticals, medical devices, and cosmetics - equivalent to the US FDA or European EMA.

### Official Websites

| Portal | URL | Purpose |
|--------|-----|---------|
| Main Website | https://cdsco.gov.in/opencms/opencms/en/Home/ | Official information |
| SUGAM Portal | https://cdscoonline.gov.in/ | E-governance, applications |
| Medical Devices | https://www.cdscomdonline.gov.in/ | Device registration |
| Approved Drugs | https://cdscoonline.gov.in/CDSCO/Drugs | Drug approvals list |

### Available Data

#### Approved New Drugs Lists
| Year | URL | Format |
|------|-----|--------|
| 2025 | https://cdsco.gov.in/opencms/resources/UploadCDSCOWeb/2018/UploadApprovalNewDrugs/List%20of%20New%20Drugs%20approved%20in%20the%20year%202025.pdf | PDF |
| 2024 | https://cdsco.gov.in/opencms/resources/UploadCDSCOWeb/2018/UploadApprovalNewDrugs/31maynewdruge%20year%202024.pdf | PDF |
| FDC Approvals | https://cdsco.gov.in/opencms/opencms/en/Approval_new/FDC-New-Drugs-Marketing/ | PDF |

#### Data Available per Drug
- Drug name
- Indication
- Dosage form/strength
- Approval date
- Category (New Drug, FDC, etc.)

### Data Bank Section
- https://cdsco.gov.in/opencms/opencms/en/Data-Bank/
- Contains information on Indian System of Medicines, Traditional Drugs

### API Access
- **Public API:** None available
- **SUGAM Portal:** Web-based only (for manufacturers/applicants)
- **Export Options:** None (manual PDF download only)

---

## 3. Jan Aushadhi / PMBJP (Pradhan Mantri Bharatiya Janaushadhi Pariyojana)

### Overview
Government program providing quality generic medicines at 50-90% lower prices than branded equivalents.

- **Total Products:** ~2,000+ medicines + 300 surgical items
- **Kendras (Stores):** 12,616+ across India (as of June 2024)
- **Implementing Agency:** BPPI (Bureau of Pharma PSUs of India)

### Official Resources

| Resource | URL | Format |
|----------|-----|--------|
| Official Website | https://janaushadhi.gov.in/ | Website (requires JS) |
| Product List PDF | https://janaushadhi.gov.in/Data/PMBJP%20Product.pdf | PDF |
| PMBJP Book | https://janaushadhi.gov.in/data/pmbjp-book.pdf | PDF |
| Product Search | https://janaushadhi.gov.in/productportfolio/Productmrp | Web |
| Product Search Alt | https://janaushadhi.gov.in/SortingView.aspx | Web |

### Mobile Applications
- **Android:** Jan Aushadhi Sugam (PMBI) - https://play.google.com/store/apps/details?id=in.gov.pmbjp
- **iOS:** https://apps.apple.com/in/app/jan-aushadhi-sugam-pmbi/id1476574620
- **Downloads:** 1.5 million+

### Data Available
- Drug code
- Product name
- Unit size
- MRP (Maximum Retail Price)
- Manufacturer
- Category

### Data Format
- **PDF Lists:** Available for download
- **Web Search:** Drug code, product name, unit size, MRP
- **API:** None publicly documented

---

## 4. NP-NCD / NPCDCS (National Programme for Prevention and Control of NCDs)

### Overview
Government program focusing on Cancer, Diabetes, Cardiovascular Diseases, and Stroke. Covers screening and medication guidelines.

- **Coverage:** 400+ districts for population-based screening
- **Infrastructure:** 665 District NCD Cells, 637 NCD Clinics, 4472 CHC NCD Clinics

### Official Documents

| Document | URL | Format |
|----------|-----|--------|
| NP-NCD Operational Guidelines 2023 | https://www.mohfw.gov.in/sites/default/files/NP-NCD%20Operational%20Guidelines_0.pdf | PDF |
| NPCDCS Guidelines (2013-17) | https://mohfw.gov.in/sites/default/files/Operational%20Guidelines%20of%20NPCDCS%20(Revised%20-%202013-17)_1.pdf | PDF |
| Prevention & Screening Guidelines | https://mohfw.gov.in/sites/default/files/Operational%20Guidelines%20on%20Prevention,%20Screening%20and%20Control%20of%20Common%20NCDs_1.pdf | PDF |
| MPW Training Module | https://mohfw.gov.in/sites/default/files/Module%20for%20Multi-Purpose%20Workers%20-%20Prevention,%20Screening%20and%20Control%20of%20Common%20NCDS_2.pdf | PDF |
| NMAP (2017-22) | https://mohfw.gov.in/sites/default/files/National%20Multisectoral%20Action%20Plan%20(NMAP)%20for%20Prevention%20and%20Control%20of%20Common%20NCDs%20(2017-22)_1.pdf | PDF |

### Medication Information
- Essential drugs for NCD management
- TPA (Tissue Plasminogen Activator) for stroke
- Anti-diabetic drugs
- Anti-hypertensive drugs
- Cardiovascular medications

### Related Programs
- Free Drugs Service Initiative
- Free Diagnostic Service
- PMBJP integration (anti-cancer, anti-diabetic, cardiovascular drugs)

### Data Format
- **PDF Guidelines:** Available
- **Structured Data:** None
- **API:** None

---

## 5. Indian Pharmacopoeia (IP)

### Overview
Official compendium of drug standards for India, published by the Indian Pharmacopoeia Commission (IPC).

- **Current Edition:** IP 2022 (8th Edition)
- **Drug Monographs:** 3,152+
- **General Chapters:** 223
- **New Additions (2022):** 92 new monographs

### Official Resources
- **IPC Website:** https://ipc.gov.in
- **Government Portal:** https://services.india.gov.in/service/detail/website-of-indian-pharmacopoeia-commission-1

### Data Available
- Drug monographs
- API specifications
- Quality standards
- Analytical methods
- Reference spectra (IP Reference Spectra)
- IP Reference Substances (IPRS)

### Access
- **Format:** Print volumes + DVD
- **Digital:** DVD with IP 2018, IP 2022
- **Cost:** Subscription-based
- **Public API:** None

### Related Documents
- National Formulary of India (NFI)
- Guidance Manual for IP

---

## 6. Open Government Data (data.gov.in)

### Overview
India's Open Government Data Platform provides datasets with API access.

### Health & Medicine Resources

| Resource | URL |
|----------|-----|
| Health APIs | https://www.data.gov.in/apis/?sector=Health+and+Family+welfare |
| Medicine Datasets | https://www.data.gov.in/keywords/Medicine |
| Healthcare Datasets | https://www.data.gov.in/keywords/healthcare |

### API Access
- API Key required (free registration)
- Download in multiple formats
- Datasets may be limited in scope

### Data Format
- CSV, JSON, XML available
- API endpoints for programmatic access

---

## 7. Third-Party / Community Data Sources

### GitHub: Indian Medicine Dataset
**Repository:** https://github.com/junioralive/Indian-Medicine-Dataset

| Attribute | Value |
|-----------|-------|
| Records | 253,973 medicines |
| Format | CSV, JSON |
| License | Open source |
| Last Updated | Recent |

#### Data Fields
| Field | Description |
|-------|-------------|
| `id` | Unique identifier |
| `name` | Medicine name |
| `price(Rs.)` | Price in Indian Rupees |
| `Is_discontinued` | Availability status |
| `manufacturer_name` | Manufacturer |
| `type` | Medicine type (allopathy) |
| `pack_size_label` | Packaging details |
| `short_composition1` | Active ingredient 1 |
| `short_composition2` | Active ingredient 2 |

**Download:**
- CSV: `DATA/indian_medicine_data.csv`
- JSON: `DATA/indian_medicine_data.json`

---

### Kaggle: A-Z Medicine Dataset of India
**URL:** https://www.kaggle.com/datasets/shudhanshusingh/az-medicine-dataset-of-india

| Attribute | Value |
|-----------|-------|
| Records | 250,000+ medicines |
| File Size | ~6.9 MB (ZIP) |
| License | CC BY-SA 4.0 |
| Last Updated | November 2022 |
| Views | 50,540+ |
| Downloads | 9,127+ |
| Manufacturers | 7,648+ companies |

#### Data Fields
- Medicine composition
- Type
- Market availability
- Pricing
- Discontinuation status
- Manufacturer

**Related Dataset:**
- 250K Medicines Usage, Side Effects and Substitutes
- https://www.kaggle.com/datasets/shudhanshusingh/250k-medicines-usage-side-effects-and-substitutes

---

### Kaggle: India Medicines and Drug Info Dataset
**URL:** https://www.kaggle.com/datasets/apkaayush/india-medicines-and-drug-info-dataset

---

### Commercial: DataRequisite
**URL:** https://datarequisite.com/

| Attribute | Value |
|-----------|-------|
| Records | 600,000+ products |
| API | Limited access |
| Cost | Commercial |

#### Features
- Complete medicine database
- Images included
- Uniformly maintained

---

### Commercial: myUpchar Medicine API
**URL:** https://www.myupchar.com/en/home/medicine_api

| Attribute | Value |
|-----------|-------|
| Records | 200,000+ medicines |
| API | Yes |
| Cost | Commission-based |

#### API Endpoint
```
https://beta.myupchar.com/api/medicine/search
```

#### Parameters
- `api_key` - API key
- `name` - Medicine name
- `type` - Allopath, Ayurveda, General, Homeopath, Unani
- `category_id` - Category filter
- `manufacturer` - Manufacturer filter

---

## 8. Mapping to Darwin-MFC Medicamento Type

### Field Mapping: GitHub/Kaggle Dataset to Medicamento

| Source Field | Darwin-MFC Field | Notes |
|--------------|------------------|-------|
| `name` | `nomeGenerico` | May need parsing |
| `manufacturer_name` | `nomesComerciais` | Partial mapping |
| `type` | `classeTerapeutica` | Requires classification |
| `price(Rs.)` | - | Not in current schema |
| `Is_discontinued` | - | Could add to schema |
| `pack_size_label` | `apresentacoes[].quantidade` | Parse required |
| `short_composition1/2` | `mecanismoAcao` / `tags` | Chemical composition |

### Fields Requiring Manual Enrichment
These Darwin-MFC fields require additional data sources:

| Field | Source Needed |
|-------|--------------|
| `atcCode` | WHO ATC/DDD Index |
| `rxNormCui` | NIH RxNorm API |
| `drugBankId` | DrugBank database |
| `snomedCT` | SNOMED CT browser |
| `anvisaRegistro` | N/A (Brazil-specific) |
| `posologias` | NLEM/IP monographs |
| `contraindicacoes` | IP/Drug reference |
| `efeitosAdversos` | IP/Drug reference |
| `interacoes` | Drug interaction DB |
| `gestacao` | TGA/FDA classification |
| `ajusteDoseRenal` | Clinical references |
| `citations` | PubMed/literature |

### Recommended Approach for Integration

1. **Base Data:** Use GitHub/Kaggle CSV (250K+ records)
2. **Essential Medicines:** Cross-reference with NLEM 2022 PDF
3. **Classification:** Map to ATC codes via WHO database
4. **Clinical Data:** Manual curation from IP monographs
5. **NLEM Flag:** Add `nlem: boolean` field to identify essential medicines
6. **India-specific Field:** Consider adding `janAushadhiCode` for generic program

### Proposed Schema Extension for India

```typescript
interface MedicamentoIndia extends Medicamento {
  // India-specific identifiers
  nlemIncluded?: boolean;          // Part of NLEM 2022
  nlemCategory?: 'P' | 'S' | 'T';  // Primary/Secondary/Tertiary
  janAushadhiCode?: string;        // PMBJP product code
  ipMonograph?: string;            // Indian Pharmacopoeia reference

  // India regulatory
  dcgiApproved?: boolean;          // DCGI (CDSCO) approved
  dcgiApprovalDate?: string;

  // Pricing (optional)
  priceControlled?: boolean;       // Under DPCO
  janAushadhiMRP?: number;         // Generic price in INR
}
```

---

## 9. Data Collection Recommendations

### Priority 1: Immediate (Structured Data Available)
1. Download GitHub Indian Medicine Dataset (CSV/JSON)
2. Download Kaggle A-Z Dataset for cross-reference
3. Parse NLEM 2022 PDF for essential medicines list

### Priority 2: Short-term (PDF Extraction Required)
1. Extract Jan Aushadhi product list
2. Parse CDSCO approved drugs lists
3. Extract NP-NCD medication guidelines

### Priority 3: Long-term (Subscription/Manual)
1. Obtain Indian Pharmacopoeia access for monographs
2. Map drugs to international ontologies (ATC, RxNorm)
3. Add clinical data from authoritative sources

### Tools for PDF Extraction
- Python: `pdfplumber`, `tabula-py`, `PyPDF2`
- OCR: `pytesseract` for scanned PDFs
- AI: Claude/GPT for unstructured text extraction

---

## 10. Summary Table: Data Sources

| Source | Records | Format | API | Cost | Quality |
|--------|---------|--------|-----|------|---------|
| NLEM 2022 | 384 | PDF | No | Free | Official |
| CDSCO | Varies | PDF | No | Free | Official |
| Jan Aushadhi | 2,000+ | PDF/Web | No | Free | Official |
| NP-NCD | Guidelines | PDF | No | Free | Official |
| Indian Pharmacopoeia | 3,152 | DVD | No | Paid | Official |
| data.gov.in | Limited | CSV/JSON | Yes | Free | Official |
| GitHub Dataset | 253,973 | CSV/JSON | N/A | Free | Community |
| Kaggle Dataset | 250,000+ | CSV | N/A | Free | Community |
| DataRequisite | 600,000+ | API | Yes | Paid | Commercial |
| myUpchar | 200,000+ | API | Yes | Paid | Commercial |

---

## References

1. Ministry of Health & Family Welfare, Government of India. National List of Essential Medicines 2022. https://main.mohfw.gov.in/?q=newshighlights-104
2. Central Drugs Standard Control Organisation. https://cdsco.gov.in/
3. Pradhan Mantri Bharatiya Janaushadhi Pariyojana. https://janaushadhi.gov.in/
4. National Health Mission - NPCDCS. https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1048&lid=604
5. Indian Pharmacopoeia Commission. https://ipc.gov.in/
6. Open Government Data Platform India. https://data.gov.in/
7. junioralive/Indian-Medicine-Dataset. GitHub. https://github.com/junioralive/Indian-Medicine-Dataset
8. Singh, S. A-Z Medicine Dataset of India. Kaggle. https://www.kaggle.com/datasets/shudhanshusingh/az-medicine-dataset-of-india

---

*Document version: 1.0 | Last updated: January 2, 2026*
