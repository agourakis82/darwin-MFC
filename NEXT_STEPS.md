# Darwin-MFC: Next Steps Guide

**Current Status**: Foundation Infrastructure Complete (Weeks 1-3 of Phase 1 + Week 1 of Phase 2)
**Ready For**: Parallel Page Migration & Translation Execution

---

## ✅ What's Been Completed

### Phase 1: UI/UX Foundation (Weeks 1-3)
- ✅ Container system (PageContainer, ContentContainer, SectionContainer)
- ✅ Design tokens (complete CSS custom properties system)
- ✅ 6 layout composition components (PageHeader, ContentGrid, SplitLayout, etc.)
- ✅ Responsive sidebar with collapse toggle
- ✅ Mobile sidebar overlay
- ✅ Breadcrumbs component
- ✅ Enhanced ContentModeWrapper with container support

### Phase 2: Translation Foundation (Week 1-2)
- ✅ Medication string extractor
- ✅ Disease string extractor (2-pass)
- ✅ 6-stage translation validator
- ✅ Medical glossaries (35+ terms × 9 languages)
- ✅ Translation orchestrator script
- ✅ NPM commands for translation workflow

---

## 🚀 Option A: Continue with Page Migration (Phase 1 Weeks 4-6)

### Step 1: Understand the New Layout System
```bash
# Read these files in order:
cat app/components/Layout/Containers.tsx
cat app/components/Layout/LayoutCompositions.tsx
cat app/components/Content/ContentModeWrapper.tsx
```

### Step 2: Migrate First Batch (8 High-Traffic Pages)
Pages to update:
1. `app/[locale]/page.tsx` - Homepage
2. `app/[locale]/doencas/page.tsx` - Diseases list
3. `app/[locale]/medicamentos/page.tsx` - Medications list
4. `app/[locale]/cancer/page.tsx` - Cancer screening
5. `app/[locale]/protocolos/page.tsx` - Protocols
6. `app/[locale]/calculadoras/page.tsx` - Calculators
7. `app/[locale]/learn/page.tsx` - Learning
8. `app/[locale]/about/page.tsx` - About page

### Step 3: Migration Template

For each page, follow this pattern:

```tsx
// Before: Page uses arbitrary layout
export default function Page() {
  return (
    <div className="px-4">
      <h1>Title</h1>
      {/* content */}
    </div>
  );
}

// After: Use new container system
import { PageContainer } from '@/app/components/Layout/Containers';
import { PageHeader } from '@/app/components/Layout/LayoutCompositions';

export default function Page() {
  return (
    <PageContainer>
      <PageHeader
        title="Title"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Current Page' }
        ]}
      />
      {/* content - now automatically wrapped with responsive padding */}
    </PageContainer>
  );
}
```

### Step 4: Test After Each Page
```bash
# After migrating each page:
npm run type-check  # Check for TypeScript errors
npm run dev         # Start dev server at localhost:3000

# Test at 4 breakpoints:
# - Mobile: 375px (F12 toggle device toolbar)
# - Tablet: 768px
# - Desktop: 1024px
# - Ultra-wide: 1536px
```

### Step 5: Commit and Push
```bash
git add app/[locale]/[page].tsx
git commit -m "refactor: migrate [page] to new layout system"
```

---

## 🌍 Option B: Start Translation Workflow (Phase 2 Weeks 2-8)

### Step 1: Verify Setup
```bash
# Ensure offload providers are configured
npm run translate:validate

# This should output:
# "✓ Validator ready for use"
```

### Step 2: Start with Medications (P1 - 5,520 translations)
```bash
# Run translation orchestrator for medications
npm run translate:medications

# This will:
# 1. Extract 690 medications
# 2. Create batches (5 items per batch)
# 3. Translate each batch to 8 languages
# 4. Validate with 6-stage pipeline
# 5. Save to lib/content-generation/output/translations/medications/
# 6. Track progress in lib/content-generation/progress.json

# Monitor progress:
tail -f lib/content-generation/progress.json
```

### Step 3: Translate Diseases (P2 - 7,200 translations)
```bash
# After medications complete, run diseases
npm run translate:diseases

# Follow same monitoring as medications
```

### Step 4: Translate Educational Content (P3-P5)
```bash
# Clinical cases
npm run translate:clinical-cases

# Flashcards
npm run translate:flashcards

# Quizzes
npm run translate:quizzes
```

### Step 5: Validate All Translations
```bash
# Run validation pipeline on all translations
npm run translate:validate

# This generates:
# lib/content-generation/translation-report.json
# - Success rate
# - Failed batches
# - Validation scores by stage
```

### Step 6: Review Report
```bash
# Check translation report
cat lib/content-generation/translation-report.json

# Should show:
# - Status: "success" or "partial"
# - Success rate: target 95%+
# - Total translations: 14,968
```

---

## 🔄 Option C: Run Both Phases in Parallel (Recommended!)

Since the user requested **"1+2 com offload para save tokens"**, the most efficient approach is running both simultaneously:

```bash
# Terminal 1: Start page migration on high-traffic pages
npm run dev

# Terminal 2: Start translation of medications
npm run translate:medications

# Terminal 3: Monitor progress
watch -n 5 'cat lib/content-generation/progress.json'
```

### Timeline for Parallel Execution
- **Weeks 4-5**: Migrate 8 high-traffic pages + Translate medications
- **Week 6**: Migrate detail pages + Translate diseases
- **Week 7**: Migrate remaining pages + Translate clinical cases
- **Week 8**: Testing & validation + Translate flashcards/quizzes
- **Weeks 9-12**: Content generation (Phase 3) + Final QA

---

## 🔍 How to Load Translated Content

Once translations are ready, use the content loader:

```tsx
import { loadMedicationTranslation } from '@/lib/i18n/medical-content-loader';

// In a page that needs translated medication:
const medication = await loadMedicationTranslation('paracetamol', locale);

// Features:
// - Automatically loads from JSON files
// - Falls back to Portuguese if translation missing
// - Reconstructs nested structure from flat JSON
// - Preserves medical codes unchanged
```

---

## 📊 Tracking Progress

### For Phase 1 (Pages)
```bash
# Check how many pages still need migration:
grep -r "className=\"px-4\"" app/[locale]/ | wc -l

# Before: 72 pages with custom padding
# After: 0 (all using PageContainer/ContentContainer)
```

### For Phase 2 (Translations)
```bash
# Real-time progress:
tail -f lib/content-generation/progress.json | jq '.completedBatches, .totalBatches'

# Final report:
cat lib/content-generation/translation-report.json | jq '.'
```

---

## 🛠️ Troubleshooting

### Container Integration Issues
**Problem**: Page looks broken after adding PageContainer
**Solution**:
- Check if parent has conflicting padding
- Use DevTools to inspect computed CSS
- Verify dark mode still works: `dark:` classes

### Translation Failures
**Problem**: Translation validation fails at stage 4 (Ontology)
**Solution**:
- Medical codes should NEVER be translated
- Check protected fields in extractor: atcCode, cid10, etc.
- Review `validation-report.json` for specific field errors

### Missing Translations
**Problem**: Translated JSON files don't exist
**Solution**:
- Check `progress.json` - batches may still be pending/in_progress
- Ensure `npm run translate:all` completes fully
- Check for error messages in console output

---

## 📝 Key Files Reference

| File | Purpose | View |
|------|---------|------|
| `app/components/Layout/Containers.tsx` | Container system | `cat app/components/Layout/Containers.tsx` |
| `lib/design-system/tokens.css` | Design tokens | `cat lib/design-system/tokens.css` |
| `app/components/Layout/LayoutCompositions.tsx` | Layout components | `cat app/components/Layout/LayoutCompositions.tsx` |
| `lib/content-generation/glossaries/medical-terms.json` | Medical glossary | `jq . lib/content-generation/glossaries/medical-terms.json` |
| `lib/content-generation/progress.json` | Translation progress | `tail lib/content-generation/progress.json` |
| `lib/content-generation/translation-report.json` | Translation summary | `cat lib/content-generation/translation-report.json` |

---

## 🎯 Success Criteria

### Phase 1: Complete When
- [ ] All 72 pages use PageContainer/ContentContainer
- [ ] ResponsiveSidebar fully integrated in layout
- [ ] Breadcrumbs showing on all pages (md+)
- [ ] Mobile menu overlay works (< lg)
- [ ] Sidebar collapse toggle works + localStorage persists
- [ ] Lighthouse scores: Performance 95+, Accessibility 100
- [ ] No CLS (Cumulative Layout Shift) issues

### Phase 2: Complete When
- [ ] 14,968 translations generated
- [ ] Validation success rate ≥ 95%
- [ ] Zero ontology code changes
- [ ] All translations in output directories
- [ ] JSON files load correctly at runtime
- [ ] Manual spot-check: 10 translations reviewed for quality

---

## 💡 Quick Commands Cheat Sheet

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run type-check       # Check TypeScript errors

# Translation
npm run translate:all    # All translations
npm run translate:medications
npm run translate:diseases
npm run translate:validate

# Testing
npm run verify           # Integration tests
npm run test:e2e        # End-to-end tests
npm run test:visual     # Visual regression

# Git
git status              # Check changes
git add .               # Stage all
git commit -m "..."     # Commit with message
git push origin main    # Push to main

# Monitoring Progress
tail -f lib/content-generation/progress.json
cat lib/content-generation/translation-report.json
```

---

## 🎓 Best Practices

1. **Always run `npm run type-check` before pushing**
   - Catches TypeScript errors early
   - Prevents build failures

2. **Test responsive at all 4 breakpoints**
   - Use Chrome DevTools device toolbar
   - Check on real devices if possible

3. **One page migration per commit**
   - Easier to revert if issues arise
   - Clearer commit history

4. **Validate translations regularly**
   - Don't wait until all translations complete
   - Catch patterns of errors early

5. **Document any deviations from templates**
   - If a page needs custom styling, explain why
   - Leave comments for future maintainers

---

## ❓ Questions?

Refer to:
- `PHASE_1_2_FOUNDATION_SUMMARY.md` - Detailed architecture explanation
- `.claude/plans/clever-wishing-pine.md` - Original implementation plan
- `CLAUDE.md` - Project architecture and conventions

---

**Ready to continue?** Choose Option A (Pages), Option B (Translation), or Option C (Both in Parallel), then follow the steps above!

Good luck! 🚀
