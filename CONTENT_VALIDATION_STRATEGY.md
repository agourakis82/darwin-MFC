# Content Validation Strategy
## Automated Validation from Official Sources

**Date:** January 2025  
**Goal:** Generate SOTA-quality content validated against official health authorities, medical societies, and ontologies  
**Approach:** Automated fetching + AI synthesis + Citation tracking

---

## 🎯 Core Principle

**Every piece of content must be traceable to official sources:**
- Health authorities (WHO, CDC, NHS, MS/Brazil, ANVISA)
- Medical societies (ADA, AHA, ESC, SBD, SBC, etc.)
- SOTA literature (PubMed, Cochrane, UpToDate)
- Validated ontologies (SNOMED-CT, LOINC, ICD-11, ATC)

---

## 📚 Official Data Sources

### **1. Health Authorities**

#### **International**
- **WHO** - World Health Organization
  - API: https://www.who.int/data/gho/info/gho-odata-api
  - Guidelines: https://www.who.int/publications/guidelines
  - ICD-11: https://icd.who.int/browse11/l-m/en
  - Use: Disease definitions, global guidelines, epidemiology

- **CDC** - Centers for Disease Control (USA)
  - API: https://data.cdc.gov/
  - Guidelines: https://www.cdc.gov/
  - Use: Infectious diseases, vaccination schedules, screening guidelines

- **NHS** - National Health Service (UK)
  - Guidelines: https://www.nice.org.uk/guidance
  - API: https://digital.nhs.uk/services/fhir-apis
  - Use: Clinical guidelines, NICE recommendations

#### **Brazil-Specific**
- **Ministério da Saúde**
  - Protocolos: https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos
  - PCDT: Protocolos Clínicos e Diretrizes Terapêuticas
  - Use: SUS protocols, Brazilian guidelines

- **ANVISA** - Agência Nacional de Vigilância Sanitária
  - API: https://consultas.anvisa.gov.br/
  - Bulário: https://consultas.anvisa.gov.br/#/bulario/
  - Use: Medication approvals, drug information, safety alerts

- **CONITEC** - Comissão Nacional de Incorporação de Tecnologias
  - Reports: http://conitec.gov.br/
  - Use: Technology assessments, cost-effectiveness

### **2. Medical Societies**

#### **International**
- **ADA** - American Diabetes Association
  - Standards of Care: https://diabetesjournals.org/care/issue/47/Supplement_1
  - Use: Diabetes management guidelines

- **AHA/ACC** - American Heart Association / American College of Cardiology
  - Guidelines: https://www.acc.org/guidelines
  - Use: Cardiovascular disease management

- **ESC** - European Society of Cardiology
  - Guidelines: https://www.escardio.org/Guidelines
  - Use: European cardiovascular guidelines

- **IDSA** - Infectious Diseases Society of America
  - Guidelines: https://www.idsociety.org/practice-guideline/
  - Use: Infectious disease management

#### **Brazil-Specific**
- **SBD** - Sociedade Brasileira de Diabetes
  - Diretrizes: https://diretriz.diabetes.org.br/
  - Use: Brazilian diabetes guidelines

- **SBC** - Sociedade Brasileira de Cardiologia
  - Diretrizes: https://www.portal.cardiol.br/
  - Use: Brazilian cardiovascular guidelines

- **SBMFC** - Sociedade Brasileira de Medicina de Família e Comunidade
  - Protocolos: https://www.sbmfc.org.br/
  - Use: Primary care protocols

### **3. SOTA Literature**

#### **PubMed / NCBI**
- **E-utilities API**: https://www.ncbi.nlm.nih.gov/books/NBK25501/
- **Endpoints:**
  - `esearch`: Search for articles
  - `efetch`: Fetch article details
  - `elink`: Find related articles
  - `esummary`: Get article summaries
- **Use:** Latest research, systematic reviews, meta-analyses

**Example Query:**
```bash
# Search for diabetes management guidelines
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=diabetes+management+guideline&retmode=json&retmax=20&sort=relevance

# Fetch article details
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=PMID&retmode=xml
```

#### **Cochrane Library**
- **API**: https://www.cochranelibrary.com/
- **Use:** Systematic reviews, meta-analyses (highest evidence level)

#### **UpToDate** (Reference, not API)
- **Use:** Cross-reference our content against UpToDate recommendations
- **Note:** No public API, manual verification

### **4. Ontologies & Terminologies**

#### **SNOMED-CT**
- **API**: https://browser.ihtsdotools.org/
- **Use:** Standardized clinical terminology

#### **LOINC**
- **API**: https://loinc.org/downloads/
- **Use:** Laboratory test codes and reference ranges

#### **RxNorm / RxNav**
- **API**: https://rxnav.nlm.nih.gov/
- **Use:** Medication names, drug interactions

#### **ATC Classification**
- **WHO ATC**: https://www.whocc.no/atc_ddd_index/
- **Use:** Medication classification

#### **ICD-11**
- **API**: https://icd.who.int/icdapi
- **Use:** Disease classification

---

## 🤖 Automated Content Generation Pipeline

### **Phase 1: Data Fetching**

```typescript
// lib/content-generation/fetchers/pubmed.ts
export async function fetchPubMedArticles(query: string, maxResults = 20) {
  const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmode=json&retmax=${maxResults}&sort=relevance`;
  
  const searchResponse = await fetch(searchUrl);
  const searchData = await searchResponse.json();
  const pmids = searchData.esearchresult.idlist;
  
  // Fetch article details
  const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmids.join(',')}&retmode=xml`;
  const articles = await fetch(fetchUrl);
  
  return parseArticles(articles);
}
```

### **Phase 2: Content Synthesis**

```typescript
// lib/content-generation/synthesizer.ts
export async function generateModuleContent(topic: string) {
  // 1. Fetch official guidelines
  const whoGuidelines = await fetchWHOGuidelines(topic);
  const cdcGuidelines = await fetchCDCGuidelines(topic);
  const msGuidelines = await fetchMSGuidelines(topic); // Brazil
  
  // 2. Fetch medical society recommendations
  const societyGuidelines = await fetchMedicalSocietyGuidelines(topic);
  
  // 3. Fetch SOTA literature
  const pubmedArticles = await fetchPubMedArticles(`${topic} guideline systematic review`);
  const cochraneReviews = await fetchCochraneReviews(topic);
  
  // 4. Synthesize with AI (llm-offload or Claude)
  const synthesizedContent = await synthesizeContent({
    whoGuidelines,
    cdcGuidelines,
    msGuidelines,
    societyGuidelines,
    pubmedArticles,
    cochraneReviews,
  });
  
  // 5. Add citations
  const contentWithCitations = addVancouverCitations(synthesizedContent);
  
  return contentWithCitations;
}
```

### **Phase 3: Validation**

```typescript
// lib/content-generation/validator.ts
export function validateContent(content: GeneratedContent) {
  const checks = {
    hasCitations: checkCitations(content),
    hasGradeLevel: checkGradeLevel(content),
    hasOfficialSource: checkOfficialSource(content),
    hasOntologyCode: checkOntologyCode(content),
    isUpToDate: checkPublicationDate(content), // < 5 years
    hasConflictDisclosure: checkConflictDisclosure(content),
  };
  
  return {
    isValid: Object.values(checks).every(Boolean),
    checks,
  };
}
```

---

## 📋 Content Generation Workflow

### **For Each Learning Path Module:**

1. **Define Topic** (e.g., "Diabetes Type 2 - Diagnosis")

2. **Fetch Official Guidelines**
   - WHO: ICD-11 definition, global guidelines
   - ADA: Standards of Care 2024
   - SBD: Diretrizes SBD 2023
   - MS/Brazil: PCDT Diabetes

3. **Fetch SOTA Literature**
   - PubMed: Last 5 years, systematic reviews
   - Cochrane: Meta-analyses
   - Filter by GRADE level Ia/Ib

4. **Fetch Ontology Data**
   - ICD-11: E11 (Type 2 Diabetes)
   - SNOMED-CT: 44054006
   - LOINC: HbA1c codes (4548-4, 17856-6)

5. **Synthesize Content**
   - Use `llm-offload` with local Mistral
   - Prompt: "Synthesize diabetes diagnosis guidelines from [sources]"
   - Include: Definition, diagnostic criteria, differential diagnosis

6. **Add Citations**
   - Vancouver style
   - DOI/PMID links
   - GRADE evidence level

7. **Validate**
   - Run validation checks
   - Ensure all claims have citations
   - Verify ontology codes

8. **Translate**
   - Use `llm-offload` to translate to 9 languages
   - Preserve medical terminology
   - Adapt cultural context

---

## 🚀 Implementation Plan

### **Week 1: Setup Infrastructure**

**Day 1-2: API Configuration**
- [ ] Set up PubMed E-utilities API (free, no key needed)
- [ ] Configure WHO API access
- [ ] Set up RxNav API for medications
- [ ] Test LOINC/SNOMED-CT access

**Day 3-4: Build Fetchers**
- [ ] Create `lib/content-generation/fetchers/pubmed.ts`
- [ ] Create `lib/content-generation/fetchers/who.ts`
- [ ] Create `lib/content-generation/fetchers/anvisa.ts`
- [ ] Create `lib/content-generation/fetchers/medical-societies.ts`

**Day 5-7: Build Pipeline**
- [ ] Create `lib/content-generation/synthesizer.ts`
- [ ] Create `lib/content-generation/validator.ts`
- [ ] Create `lib/content-generation/citation-manager.ts`
- [ ] Test with sample topic

---

## 💡 Next Immediate Steps

1. **Set up PubMed API** (easiest, free, no auth)
2. **Create fetcher for diabetes guidelines**
3. **Test content synthesis with llm-offload**
4. **Generate 1 module as proof-of-concept**

---

## 📊 Quality Assurance Metrics

### **For Each Generated Module:**

| Metric | Target | Validation Method |
|--------|--------|-------------------|
| **Citations** | 100% of claims | Automated check for citation markers |
| **Official Sources** | ≥3 per module | WHO/CDC/MS + Medical Society + PubMed |
| **GRADE Level** | 100% specified | Ia/Ib/IIa/IIb/III/IV for each citation |
| **Ontology Codes** | 100% coverage | ICD-11 + SNOMED-CT + LOINC |
| **Recency** | <5 years | Publication date check |
| **Conflict Disclosure** | 100% | Check for COI statements |
| **Multilingual** | 9 languages | Automated translation validation |
| **Readability** | Flesch-Kincaid 8-10 | Automated readability score |

### **Content Freshness**

- **Auto-update trigger:** When new guidelines published
- **Manual review:** Every 6 months
- **Version control:** Track guideline versions (e.g., "ADA 2024", "SBD 2023")

---

## 🔄 Continuous Validation Loop

```
1. Generate Content → 2. Fetch Official Sources → 3. Synthesize →
4. Add Citations → 5. Validate → 6. Translate → 7. Publish →
8. Monitor for Updates → [Back to 1 if outdated]
```

---

## 🎯 Success Criteria

**A module is considered SOTA-quality when:**
- ✅ Every claim has Vancouver citation with DOI/PMID
- ✅ At least 3 official sources (WHO/CDC/MS + Society + PubMed)
- ✅ GRADE evidence level specified for all recommendations
- ✅ ICD-11, SNOMED-CT, LOINC codes included
- ✅ Published within last 5 years (or marked as "classic reference")
- ✅ Conflict of interest disclosed
- ✅ Translated to all 9 languages
- ✅ Passes automated validation checks
- ✅ Cross-referenced against UpToDate (manual spot-check)

---

## 🚀 Ready to Start?

I can help you:
- **A)** Set up PubMed API and create first fetcher NOW
- **B)** Design the complete pipeline architecture first
- **C)** Generate a sample module manually to test the concept
- **D)** Something else

Reply with **A**, **B**, **C**, or **D**! 🚀

