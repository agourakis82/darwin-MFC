# Testing Instructions - Workflow A & B
## Phase 1 Week 4-5 Responsive Testing + Phase 2 Week 2-3 Translation Batch

**Date**: 2026-01-23
**Status**: ✅ READY FOR TESTING
**User Decision**: "A+B with offloading"

---

## 🎯 Immediate Next Steps (This Week)

### **WORKFLOW A: Homepage Responsive Testing**

#### **Step 1: Start Development Server**
```bash
npm run dev
```
This will start the dev server at `http://localhost:3000/pt`

#### **Step 2: Test at 4 Breakpoints**

Using your browser's DevTools (F12), set viewport sizes and test:

**Mobile (375px)**
```
Device: iPhone SE
Size: 375×667px
Checklist:
  ☐ Hero section fits without horizontal scroll
  ☐ Stats cards stack vertically
  ☐ Quick access shows 2 columns
  ☐ Padding is px-4 (16px on sides)
  ☐ Framer Motion fade-in animations play
```

**Tablet (768px)**
```
Device: iPad
Size: 768×1024px
Checklist:
  ☐ Content width responsive
  ☐ Stats grid shows 2 columns
  ☐ Quick access shows 2 columns
  ☐ Padding is px-6 (24px on sides)
  ☐ No horizontal scrolling
```

**Desktop (1024px)**
```
Device: MacBook / Standard Desktop
Size: 1024×768px
Checklist:
  ☐ Hero uses ContentContainer (max-w-5xl, centered)
  ☐ Stats use PageContainer (max-w-7xl, centered)
  ☐ Quick access uses PageContainer (max-w-7xl, centered)
  ☐ Padding is px-8 (32px on sides)
  ☐ Content properly centered, not full width
```

**Ultrawide (1536px)**
```
Device: 4K Monitor / Large Monitor
Size: 1536×1440px
Checklist:
  ☐ Hero stays max-w-5xl (640px max)
  ☐ Stats stay max-w-7xl (960px max)
  ☐ Padding is px-12 (48px on sides)
  ☐ Centered with equal side margins
  ☐ No content stretching to edges
```

#### **Step 3: Success Criteria**

All must pass:
- ✅ No horizontal scrolling at ANY breakpoint
- ✅ Content respects max-width constraints
- ✅ Padding scales correctly (px-4 → px-6 → px-8 → px-12)
- ✅ All Framer Motion animations trigger on scroll
- ✅ No layout shift or CLS issues
- ✅ Colors render correctly (dark mode toggle test too)

#### **Step 4: Verify TypeScript**
```bash
npm run type-check
```
Should show: ✅ PASSED (0 errors)

---

### **WORKFLOW B: Translation Test Batch**

#### **Step 1: View Test Plan**
```bash
npx tsx scripts/test-translation-batch.ts
```
This displays the complete test plan with expected outputs.

#### **Step 2: Verify Infrastructure**
```bash
npx tsx scripts/test-translation-setup.ts
```
Expected output:
```
✅ All checks passed!
📊 Setup Verification Summary:
  Directories: ✅
  Glossary: ✅ (150 terms)
  Validators: ✅
  Extractors: ✅
```

#### **Step 3: Execute Test Batch**

**Option A: Quick Manual Test (Recommended for debugging)**
```bash
# Extract 5 medications
npx tsx scripts/extract-medication-strings.ts --items 5

# This creates sample medication data for extraction testing
# Then verify the output files are created
ls -lh lib/content-generation/output/translations/medications/
```

**Option B: Automated Test (When ready)**
```bash
npx tsx scripts/translate-orchestrator.ts --test-mode --items 5 --locales en,es
```

#### **Step 4: Validate Test Results**

Check that 10 files are created:
```bash
ls -1 lib/content-generation/output/translations/medications/*.{en,es}.json | wc -l
# Should show: 10 files
```

Verify JSON structure:
```bash
npx tsx scripts/validate-translations.ts --sample-only
```

Expected validation results:
- ✅ All 10 translations passed structure check
- ✅ No missing fields
- ✅ All ontology codes preserved
- ✅ Citations markers [1,2,3] intact
- ✅ Quality score ≥ 85%

#### **Step 5: Success Criteria**

All must pass:
- ✅ 10/10 translation files created
- ✅ All JSON files are valid
- ✅ Medical codes (atcCode, snomedCT) unchanged
- ✅ Citation markers preserved
- ✅ Validation score ≥ 85%
- ✅ Output files < 500 KB total

---

## 📅 Timeline

### **This Week (Week 4)**
```
Mon-Wed: Responsive Testing (Workflow A)
  - Test at 4 breakpoints
  - Fix any layout issues found
  - Document CSS changes if needed

Wed-Fri: Translation Test Batch (Workflow B)
  - Execute 5 medications × 2 languages test
  - Validate results
  - Document any issues
  - Prepare for full run
```

### **Next Week (Week 5)**
```
Full Page Migration (Workflow A)
  - Migrate 7 high-traffic pages using template
  - Test each page at 4 breakpoints
  - Commit in batches of 2-3 pages

Full Medications Translation (Workflow B)
  - Run: npm run translate:medications
  - 690 medications × 8 languages = 5,520 translations
  - Estimated: 3-4 hours
```

### **Week 6**
```
Page Migration Batch 3 (Workflow A)
  - Migrate remaining 44 pages
  - Accessibility audit
  - Visual regression testing

Diseases & Educational Content (Workflow B)
  - npm run translate:diseases (7,200 translations)
  - Translate flashcards/quizzes (1,616 translations)
  - Validation and QA
```

---

## 📊 Tracking Progress

### Workflow A Progress
```
Homepage:        ✅ Template created
                 ⏳ Responsive testing (THIS WEEK)
Batch 2 (7 pgs): ⏳ Using template (NEXT WEEK)
Batch 3 (20 pgs): ⏳ Using template (WEEK 5)
Batch 4 (44 pgs): ⏳ Using template (WEEK 6)
Total: 1/72 pages migrated → Target 72/72
```

### Workflow B Progress
```
Infrastructure:  ✅ Verified
Test Batch:      ⏳ Execute (THIS WEEK)
Medications:     ⏳ Full run (WEEK 5)
Diseases:        ⏳ Full run (WEEK 5-6)
Educational:     ⏳ Full run (WEEK 6)
Total: 0/13,360 translations → Target 13,360/13,360
```

---

## 🔧 Troubleshooting

### Workflow A Issues

**Issue: Homepage has horizontal scrolling**
```
Solution:
1. Check PageContainer/ContentContainer imports
2. Verify max-w classes are applied
3. Check for any px-full or w-full overrides
4. Look for padding overflow issues
```

**Issue: Padding inconsistent across breakpoints**
```
Solution:
1. Verify getPaddingClasses() in Containers.tsx
2. Check Tailwind responsive prefixes (sm:, md:, lg:, 2xl:)
3. Ensure container className applied before custom classes
```

**Issue: Animations not triggering**
```
Solution:
1. Check Framer Motion viewport settings
2. Verify whileInView triggers
3. Check for z-index issues hiding content
4. Inspect browser console for errors
```

### Workflow B Issues

**Issue: Extract script fails**
```
Solution:
1. Check medication data exists: ls lib/data/medicamentos/index.ts
2. Verify file has exported medicamentosConsolidados
3. Check for TypeScript errors: npm run type-check
```

**Issue: Translation test hangs**
```
Solution:
1. Kill process: Ctrl+C
2. Check provider connectivity
3. Verify llm-offload is configured
4. Try local provider first (instant)
5. Check file permissions in output directory
```

**Issue: Validation fails**
```
Solution:
1. Check validation logs for specific errors
2. Review error categorization (structure/completeness/citations/etc)
3. Verify medical glossary loaded: ls lib/content-generation/glossaries/
4. Check ontology codes are protected
```

---

## 📝 Commands Quick Reference

### Development
```bash
npm run dev              # Start dev server (http://localhost:3000)
npm run type-check       # Verify TypeScript (should pass)
npm run build            # Production build (optional for testing)
```

### Testing
```bash
# Responsive testing (manual)
npx tsx scripts/test-responsive-homepage.ts  # View testing guide

# Translation testing
npx tsx scripts/test-translation-setup.ts    # Verify infrastructure
npx tsx scripts/test-translation-batch.ts    # View test plan
npx tsx scripts/test-offload-providers.ts    # Verify LLM providers
```

### Execution (When ready)
```bash
# Test batch
npx tsx scripts/extract-medication-strings.ts --items 5
npx tsx scripts/validate-translations.ts --sample-only
npx tsx scripts/translate-orchestrator.ts --test-mode

# Full run (next week)
npm run translate:medications    # 5,520 translations
npm run translate:diseases       # 7,200 translations
npm run translate:validate       # Validate all
```

---

## 🚀 Success Indicators

**When Workflow A is complete:**
- ✅ Homepage loads at all breakpoints
- ✅ No CSS errors in DevTools
- ✅ All Framer Motion animations play
- ✅ TypeScript compilation passes
- ✅ Git commits clean

**When Workflow B is complete:**
- ✅ 10 translation files created
- ✅ All JSON valid
- ✅ Medical codes preserved
- ✅ Validation score ≥ 85%
- ✅ Ready for full 690-medication run

---

## 📞 Next Steps After Testing

### If Both Succeed (Expected)
1. Migrate remaining 71 pages (Workflow A)
2. Execute full medications translation (Workflow B)
3. Commit weekly progress
4. Continue parallel execution through Week 6

### If Issues Found
1. Document in issue tracker
2. Fix in current task
3. Test again
4. Proceed only when all checks pass

---

## 📄 Reference Files

- **Homepage Migration Template**: `/app/[locale]/HomeContent.tsx`
- **Container System**: `/app/components/Layout/Containers.tsx`
- **Container Patterns**: `/app/components/Layout/LayoutCompositions.tsx`
- **Translation Orchestrator**: `/scripts/translate-orchestrator.ts`
- **Translation Validators**: `/scripts/validate-translations.ts`
- **Medical Glossary**: `/lib/content-generation/glossaries/medical-terms.json`

---

**Status**: 🟢 ALL SYSTEMS READY FOR TESTING

**Next Action**: Start dev server and test homepage at 4 breakpoints
