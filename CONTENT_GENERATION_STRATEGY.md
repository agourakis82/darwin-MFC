# SOTA Content Generation Strategy
## Darwin-MFC Education Module

**Date:** January 2025  
**Goal:** Generate Nature/Cell Q1-level educational content  
**Target:** Surpass UpToDate, Medscape, and Orphanet in quality and depth

---

## 📊 Current Content Assessment

### ✅ **What We Have**

| Content Type | Quantity | Quality | Status |
|--------------|----------|---------|--------|
| **Diseases** | 447+ | Good | ✅ Structured with ontologies |
| **Medications** | 600+ | Good | ✅ ATC codes, interactions |
| **Calculators** | 26 | Excellent | ✅ Validated formulas |
| **Clinical Cases** | 15 | Good | ✅ Interactive |
| **Flowcharts** | 40 | Good | ✅ Protocol-based |
| **Learning Paths** | 2 | **Basic** | ⚠️ Needs expansion |
| **Flashcards** | Auto-generated | **Basic** | ⚠️ Needs curation |
| **Quiz Questions** | Auto-generated | **Basic** | ⚠️ Needs validation |
| **Video Content** | 0 | N/A | ❌ Missing |
| **Infographics** | Limited | Basic | ⚠️ Needs enhancement |

### ❌ **Critical Gaps**

1. **Learning Paths**: Only 2 paths (need 20+)
2. **Flashcards**: Auto-generated, not curated
3. **Quiz Questions**: No validated question bank
4. **Clinical Cases**: Only 15 (need 100+)
5. **Video Content**: Completely missing
6. **Evidence Citations**: Incomplete
7. **Multi-language**: Content not fully translated

---

## 🎯 SOTA Quality Standards

### **Academic Rigor (Nature/Cell Level)**

1. **Every claim must have:**
   - Vancouver-style citation
   - DOI/PMID link
   - GRADE evidence level
   - Study type (RCT, meta-analysis, cohort, etc.)
   - Conflict of interest disclosure

2. **Content structure:**
   - **1st order**: Descriptive (protocols, epidemiology)
   - **2nd order**: Critical analysis (insights, controversies)
   - **3rd order**: Systemic implications (epistemology, philosophy of medicine)

3. **Multilingual:**
   - All content in 9 languages (pt, en, es, fr, ru, ar, zh, el, hi)
   - Medical terminology localized
   - Cultural adaptation

---

## 📋 Content Generation Priorities

### **Phase 1: Foundation (Weeks 1-4)**

#### **Priority 1: Learning Paths (20 paths)**

**Target Paths:**
1. ✅ APS Essentials (exists)
2. ✅ Medication Safety (exists)
3. ❌ Diabetes Management in Primary Care
4. ❌ Hypertension: From Diagnosis to Control
5. ❌ Mental Health in Family Medicine
6. ❌ Pediatric Care Essentials
7. ❌ Geriatric Medicine Fundamentals
8. ❌ Women's Health Across Lifespan
9. ❌ Cardiovascular Risk Assessment
10. ❌ Respiratory Diseases in APS
11. ❌ Infectious Diseases: Common Presentations
12. ❌ Dermatology for Primary Care
13. ❌ Musculoskeletal Disorders
14. ❌ Gastrointestinal Complaints
15. ❌ Preventive Medicine & Screening
16. ❌ Chronic Pain Management
17. ❌ Substance Use Disorders
18. ❌ Emergency Medicine in Primary Care
19. ❌ Palliative Care Basics
20. ❌ Health Equity & Social Determinants

**Each path must include:**
- 8-12 modules
- Content + Video + Quiz + Case Study + Flashcards
- 15-30 hours estimated completion
- Certificate upon completion
- GRADE-level evidence citations

#### **Priority 2: Flashcard Decks (50 decks, 2,500 cards)**

**Categories:**
- Diseases (20 decks × 50 cards = 1,000 cards)
- Medications (15 decks × 50 cards = 750 cards)
- Procedures (10 decks × 50 cards = 500 cards)
- Differential Diagnosis (5 decks × 50 cards = 250 cards)

**Quality Standards:**
- Front: Clear, concise question
- Back: Detailed answer with explanation
- Source: Citation with PMID/DOI
- Tags: Disease, specialty, difficulty
- Images: When applicable
- Mnemonics: When helpful

#### **Priority 3: Quiz Question Bank (1,000 questions)**

**Distribution:**
- Multiple choice: 700 questions
- True/False: 150 questions
- Case-based: 150 questions

**Quality Standards:**
- Validated by medical experts
- Detailed explanations for all options
- Evidence citations
- Difficulty rating (easy, medium, hard)
- Bloom's taxonomy level
- USMLE/ENARE style formatting

---

## 🤖 Content Generation Workflow

### **Option 1: AI-Assisted Generation (Recommended)**

**Tools:**
- `llm-offload` for bulk generation (free, local Mistral)
- Claude for quality review and refinement
- Human expert validation

**Workflow:**
```bash
# Step 1: Generate outline
llm-offload -t expand -p local --input "Diabetes Management Learning Path"

# Step 2: Expand content
llm-offload -t scaffold -p local --input outline.md

# Step 3: Claude reviews and refines
# (Manual review in this conversation)

# Step 4: Add citations
# (Semi-automated with PubMed API)

# Step 5: Translate
llm-offload -t translate -p minimax --languages pt,en,es,fr,ru,ar,zh,el,hi
```

### **Option 2: Template-Based Generation**

**Use existing content as templates:**
- `lib/data/learning-paths/aps-essentials.ts` → Template for new paths
- Auto-generated flashcards → Template for curated cards
- Existing clinical cases → Template for new cases

---

## 📊 Quality Metrics

### **Content Quality Checklist**

For each piece of content, verify:

- [ ] **Citations**: Every claim has Vancouver-style citation
- [ ] **Evidence Level**: GRADE level specified
- [ ] **Accuracy**: Fact-checked against UpToDate/PubMed
- [ ] **Clarity**: Written at appropriate reading level
- [ ] **Completeness**: All sections filled
- [ ] **Multilingual**: Translated to all 9 languages
- [ ] **Accessibility**: WCAG 2.1 AA compliant
- [ ] **Engagement**: Interactive elements included

### **Target Metrics**

| Metric | Target | Current | Gap |
|--------|--------|---------|-----|
| Learning Paths | 20 | 2 | 18 |
| Flashcard Decks | 50 | 0 | 50 |
| Curated Flashcards | 2,500 | 0 | 2,500 |
| Quiz Questions | 1,000 | 0 | 1,000 |
| Clinical Cases | 100 | 15 | 85 |
| Video Modules | 50 | 0 | 50 |
| Evidence Citations | 100% | ~60% | 40% |

---

## 🚀 Immediate Next Steps

### **Week 1: Pilot Content Generation**

1. **Choose 1 learning path** to develop fully (e.g., "Diabetes Management")
2. **Generate all components:**
   - 10 modules with content
   - 50 flashcards
   - 50 quiz questions
   - 5 clinical cases
   - 5 video scripts
3. **Validate quality** against SOTA standards
4. **Use as template** for remaining 19 paths

### **Tools Setup**

```bash
# Install llm-offload (if not already)
npm install -g llm-offload

# Configure for local Mistral (free)
llm-offload config --provider local --model mistral

# Test generation
llm-offload -t expand -p local --input "test prompt"
```

---

## 💡 Recommendation

**Start with:** 
1. **Diabetes Management Learning Path** (high impact, common condition)
2. Generate complete path with all components
3. Validate quality
4. Use as template for scaling

**Would you like me to:**
- A) Generate the Diabetes Management path now?
- B) Set up the content generation tools first?
- C) Create templates for bulk generation?
- D) Something else?

Let me know how you'd like to proceed! 🚀

