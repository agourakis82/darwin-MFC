# ✅ Task A: Integration - READY TO MERGE!

**Date:** January 21, 2026  
**Status:** 80% Complete - Automated scripts done, manual merge pending  
**Time Remaining:** 30-45 minutes (manual merge + test)

---

## ✅ **WHAT'S DONE (Automated)**

1. **✅ Integration script created** (`scripts/integrate-modules-to-darwin.ts`)
   - Transforms 32 modules to Darwin-MFC format
   - Maps categories correctly
   - Converts citation format

2. **✅ Modules transformed** (`lib/content-generation/output/darwin-mfc-modules.ts`)
   - 32 modules ready in Darwin-MFC format
   - Category distribution:
     - `saude_mental`: 4 modules
     - `adultos`: 2 modules  
     - `outros`: 26 modules

3. **✅ References extracted** (`lib/content-generation/output/darwin-references.ts`)
   - 299 references converted to Darwin-MFC Reference format
   - Includes PMID, DOI, URLs where available
   - Properly typed (artigo, diretriz, portaria, site)

---

## 📋 **WHAT'S NEXT (Manual - 30-45 min)**

### **Step 1: Merge Modules (15 min)**

**File:** `lib/data/rastreamentos.ts`

1. Open `lib/content-generation/output/darwin-mfc-modules.ts`
2. Copy the 32 module entries from `newRastreamentos` object
3. Open `lib/data/rastreamentos.ts`
4. Paste before line 1391 (before the closing `};`)
5. Save file

**Quick command:**
```bash
# View the modules to merge
cat lib/content-generation/output/darwin-mfc-modules.ts | head -100
```

---

### **Step 2: Merge References (15 min)**

**File:** `lib/data/references.ts`

1. Open `lib/content-generation/output/darwin-references.ts`
2. Copy the 299 reference entries from `newReferences` object
3. Open `lib/data/references.ts`
4. Paste before line 1722 (before the closing `};`)
5. Save file

**Quick command:**
```bash
# View the references to merge
cat lib/content-generation/output/darwin-references.ts | head -100
```

---

### **Step 3: Test Integration (10 min)**

**Run development server:**
```bash
npm run dev
```

**Test checklist:**
- [ ] Server starts without errors
- [ ] Navigate to a new module (e.g., `/pt/diabetes-mellitus-2`)
- [ ] Module displays correctly
- [ ] Citations render properly
- [ ] References show in bibliography
- [ ] Search finds new modules
- [ ] No console errors

---

### **Step 4: Type Check (5 min)**

**Run TypeScript validation:**
```bash
npm run type-check
```

**Expected:** No type errors

---

## 📊 **Integration Summary**

### **32 New Modules**

**Mental Health (saude_mental - 4):**
- ansiedade
- depressao
- transtorno-bipolar
- transtorno-panico

**Chronic Diseases (adultos - 2):**
- diabetes-mellitus-2
- insuficiencia-cardiaca

**Other Conditions (outros - 26):**
- acne, alzheimer, asma, celulite, demencia, dermatite-atopica
- dislipidemia, doenca-renal-cronica, dpoc, epilepsia, esquizofrenia
- fibrilacao-atrial, fibromialgia, hipertensao-arterial, hipotireoidismo
- itu, lombalgia, obesidade, osteoartrite, osteoporose, parkinson
- pneumonia, psoriase, rinite-alergica, sinusite, toc

### **299 New References**

- **Artigos:** ~250 (journal articles with PMID/DOI)
- **Diretrizes:** ~30 (clinical guidelines)
- **Portarias:** ~10 (Brazilian health ministry protocols)
- **Sites:** ~9 (official health organization websites)

---

## 🚨 **IMPORTANT NOTES**

### **Citation Format Difference**

**Generated modules use:**
```typescript
referencias: [11,12]  // Array of numbers
```

**Darwin-MFC expects:**
```typescript
citations: [{ refId: 'diabetes-ref-11' }, { refId: 'diabetes-ref-12' }]
```

**✅ Already handled** by integration script!

### **Category Mapping**

Generated categories → Darwin-MFC categories:
- `doenças crônicas não transmissíveis` → `adultos`
- `saúde mental` → `saude_mental`
- `doenças respiratórias` → `outros`
- `doenças cardiovasculares` → `outros`
- `doenças neurológicas` → `outros`
- `doenças dermatológicas` → `outros`
- `doenças musculoesqueléticas` → `outros`

**✅ Already mapped** by integration script!

---

## ✅ **Files Ready for Merge**

1. **`lib/content-generation/output/darwin-mfc-modules.ts`**
   - 32 modules in Darwin-MFC format
   - Ready to copy into `lib/data/rastreamentos.ts`

2. **`lib/content-generation/output/darwin-references.ts`**
   - 299 references in Darwin-MFC format
   - Ready to copy into `lib/data/references.ts`

---

## 🎯 **Success Criteria**

- [ ] All 32 modules merged into `lib/data/rastreamentos.ts`
- [ ] All 299 references merged into `lib/data/references.ts`
- [ ] `npm run dev` starts without errors
- [ ] Modules display correctly in browser
- [ ] Citations render properly
- [ ] `npm run type-check` passes
- [ ] No console errors

---

## 🚀 **Ready to Merge?**

**Estimated time:** 30-45 minutes

**Steps:**
1. Merge modules (15 min)
2. Merge references (15 min)
3. Test (10 min)
4. Type check (5 min)

**After merge:**
- 32 new medical modules live on Darwin-MFC
- 299 new academic references
- Complete Primary Care coverage expansion

---

## 💬 **Need Help?**

**Q: Can I automate the merge?**  
A: Yes! I can create a script, but manual merge is safer for first time.

**Q: What if there are type errors?**  
A: Run `npm run type-check` and I'll help fix them.

**Q: Should I commit before merging?**  
A: YES! Commit current state first:
```bash
git add .
git commit -m "Before merging 32 new modules"
```

---

## ✅ **Ready When You Are!**

**Reply with:**
- **"merge"** - I'll guide you through the manual merge
- **"automate"** - I'll create an automated merge script
- **"test first"** - Let's test one module manually first
- **"later"** - Save progress and continue later

🚀 **You're 30 minutes away from 32 new modules live!**

