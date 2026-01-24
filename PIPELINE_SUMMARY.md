# Content Generation Pipeline - Executive Summary
## Automated SOTA Content Generation for Darwin-MFC

**Date:** January 2025  
**Status:** Architecture Complete, Ready for Implementation  
**Timeline:** 12 weeks to 20 SOTA-quality learning paths

---

## 🎯 What We're Building

An **automated content generation pipeline** that:
1. **Fetches** data from official health authorities, medical societies, and SOTA literature
2. **Aggregates** and normalizes data from multiple sources
3. **Synthesizes** educational content using AI (llm-offload + local Mistral)
4. **Validates** content against SOTA quality standards
5. **Translates** to 9 languages
6. **Publishes** to Darwin-MFC codebase

---

## 🏗️ Architecture

### **6-Layer Pipeline**

```
Layer 1: Data Fetchers → PubMed, WHO, CDC, ANVISA, Medical Societies, Ontologies
Layer 2: Aggregator → Merge, Normalize, Resolve Conflicts
Layer 3: AI Synthesizer → Generate Modules, Flashcards, Quizzes, Cases
Layer 4: Validator → Citation, GRADE, Sources, Ontology, Recency Checks
Layer 5: Translator → 9 Languages with Medical Terminology Preservation
Layer 6: Publisher → TypeScript Files, Translation JSONs, References, Graph
```

### **Key Components**

| Component | Purpose | Technology |
|-----------|---------|------------|
| **PubMed Fetcher** | Fetch SOTA literature | E-utilities API (free) |
| **WHO Fetcher** | Fetch global guidelines | WHO API |
| **Medical Societies** | Fetch ADA, AHA, SBD, SBC | Web scraping + APIs |
| **Aggregator** | Merge & normalize data | TypeScript |
| **AI Synthesizer** | Generate content | llm-offload + Mistral (free) |
| **Validator** | Quality assurance | Automated checks |
| **Translator** | Multilingual support | llm-offload |
| **Publisher** | Deploy to codebase | File generation |

---

## 📊 Quality Standards

### **Every Generated Module Must Have:**

✅ **100% Citation Coverage** - Every claim has Vancouver-style citation  
✅ **≥3 Official Sources** - WHO/CDC/MS + Medical Society + PubMed  
✅ **GRADE Evidence Levels** - Ia/Ib/IIa/IIb/III/IV specified  
✅ **Ontology Codes** - ICD-11, SNOMED-CT, LOINC included  
✅ **Recency** - Published within last 5 years  
✅ **Multilingual** - Translated to 9 languages  
✅ **Validation Score** - >90/100 automated score  

---

## 📅 Implementation Timeline

### **12-Week Plan**

| Weeks | Phase | Deliverable |
|-------|-------|-------------|
| **1-2** | Core Infrastructure + Fetchers | 6 working fetchers |
| **3-4** | Aggregator + AI Synthesizer | Content generation working |
| **5** | Validator + Translator | Quality assurance complete |
| **6** | Publisher + Pilot | Diabetes Management path |
| **7-12** | Scale | 19 additional paths |

### **Milestones**

- **Week 2:** PubMed fetcher retrieving articles ✅
- **Week 4:** AI generating module content ✅
- **Week 5:** Validation passing >95% ✅
- **Week 6:** First complete learning path published ✅
- **Week 12:** All 20 paths live ✅

---

## 💰 Cost Analysis

### **Free/Open Source Components**

- ✅ **PubMed E-utilities API** - Free, no auth required
- ✅ **llm-offload** - Free, open source
- ✅ **Local Mistral** - Free, runs locally
- ✅ **WHO API** - Free
- ✅ **Ontology APIs** - Free (SNOMED, LOINC, ICD-11)

### **Potential Costs**

- ⚠️ **Medical Society APIs** - May require subscriptions (~$500/year)
- ⚠️ **Cloud LLM (optional)** - If local Mistral insufficient (~$100/month)
- ⚠️ **Expert Review** - Manual validation (~$2,000 for pilot)

**Total Estimated Cost:** $500-$3,000 for 12 weeks

---

## 🎯 Target Output

### **20 Learning Paths × Components**

Each path includes:
- **10 modules** with rich content (150-200 lines each)
- **50 flashcards** with explanations and citations
- **50 quiz questions** (MCQ, T/F, case-based)
- **5 clinical cases** with differential diagnosis
- **5 video scripts** (text-based for future recording)

**Total Content:**
- 200 modules
- 1,000 flashcards
- 1,000 quiz questions
- 100 clinical cases
- 100 video scripts

---

## 🚀 Three Implementation Approaches

### **Option A: Full Pipeline (Recommended)**
**Timeline:** 12 weeks  
**Effort:** High upfront, low maintenance  
**Quality:** Highest (automated validation)  
**Scalability:** Excellent (can generate 100+ paths)

**Pros:**
- Fully automated
- Consistent quality
- Easy to update when guidelines change
- Scalable to other topics

**Cons:**
- 12 weeks to first complete set
- Complex architecture
- Requires technical expertise

---

### **Option B: Simplified Prototype**
**Timeline:** 2 weeks  
**Effort:** Medium  
**Quality:** Good (manual validation)  
**Scalability:** Limited

**Approach:**
1. Build minimal pipeline (PubMed + AI only)
2. Generate 1 learning path
3. Manual quality review
4. Decide whether to scale or pivot

**Pros:**
- Quick proof-of-concept
- Lower risk
- Validates approach

**Cons:**
- Not production-ready
- Manual work required
- Limited scalability

---

### **Option C: Manual Creation First**
**Timeline:** 4 weeks  
**Effort:** Very high  
**Quality:** Highest (expert-created)  
**Scalability:** None

**Approach:**
1. Manually create 1 gold-standard learning path
2. Use as template for AI generation
3. Reverse-engineer prompts
4. Then build pipeline

**Pros:**
- Highest quality baseline
- Better understanding of requirements
- Gold standard for validation

**Cons:**
- Very time-consuming
- Not scalable
- Delays automation

---

## 💡 Recommendation

**Start with Option B (Simplified Prototype)**

**Rationale:**
1. **Validate concept** in 2 weeks instead of 12
2. **Lower risk** - test before full commitment
3. **Learn requirements** - discover edge cases early
4. **Quick win** - show progress to stakeholders
5. **Pivot option** - can switch to manual if AI quality insufficient

**Then:**
- If prototype succeeds → Scale to Option A (full pipeline)
- If prototype fails → Fall back to Option C (manual creation)

---

## 📋 Next Immediate Steps

### **Week 1: Simplified Prototype**

**Day 1-2: PubMed Fetcher**
- [ ] Create `lib/content-generation/fetchers/pubmed.ts`
- [ ] Test fetching diabetes articles
- [ ] Parse to structured data

**Day 3-4: AI Synthesizer**
- [ ] Install llm-offload
- [ ] Create prompt template
- [ ] Generate 1 module from PubMed data

**Day 5-7: Validation & Review**
- [ ] Manual quality review
- [ ] Compare with UpToDate/ADA
- [ ] Document findings
- [ ] Decide: Scale or Pivot

---

## 🤔 Decision Point

**What would you like to do?**

**A)** Start **Option A** (Full Pipeline) - 12 weeks, fully automated

**B)** Start **Option B** (Simplified Prototype) - 2 weeks, proof-of-concept ⭐ **Recommended**

**C)** Start **Option C** (Manual Creation) - 4 weeks, gold standard

**D)** Something else (tell me your thoughts)

**Reply with A, B, C, or D!** 🚀

