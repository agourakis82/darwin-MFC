# Component Refactoring Plan

**Date:** 2026-01-17
**Author:** Claude Code Analysis
**Status:** Proposed

## Executive Summary

This document outlines a refactoring plan for two large components identified in the Darwin-MFC codebase audit:

1. **`sections.tsx`** (1026 lines) - Presentation/lecture sections component
2. **`SOAPExport.tsx`** (966 lines) - SOAP medical note export component

Both files exceed the recommended component size threshold (~300-400 lines) and contain multiple logical units that can be extracted into separate, more maintainable components.

---

## 1. sections.tsx Analysis

**File Path:** `/Users/demetriosagourakis/Darwin-MFC/app/components/Presentation/sections.tsx`
**Current Lines:** 1026
**Purpose:** Educational presentation sections for screening guidelines comparison (SUS vs Medical Societies)

### Current Structure

The file contains 10 exported section components and 12 private helper components:

| Lines | Component | Type | Description |
|-------|-----------|------|-------------|
| 25-70 | `HeroSection` | Exported | Landing/hero section with key cards |
| 72-86 | `HeroCard` | Private | Reusable card for hero section |
| 89-132 | `ConceptSection` | Exported | Screening concepts explanation |
| 134-165 | `ConceptCard` | Private | Card for concept display |
| 168-219 | `LifeCycleSection` | Exported | Interactive lifecycle timeline |
| 221-237 | `LifeCyclePanel` | Private | Content panel for lifecycle |
| 239-416 | `getLifeCycleContent` | Helper | Content data for lifecycle phases |
| 419-459 | `DCNTSection` | Exported | Chronic diseases section |
| 461-515 | `DCNTCard` | Private | DCNT comparison card |
| 518-571 | `CancerSection` | Exported | Cancer screening section |
| 573-621 | `CancerCard` | Private | Cancer screening comparison card |
| 624-661 | `InfectiousSection` | Exported | Infectious diseases section |
| 664-690 | `InfectionCard` | Private | Infection comparison card |
| 693-807 | `PregnancySection` | Exported | Pregnancy screening section |
| 810-853 | `MentalHealthSection` | Exported | Mental health screening section |
| 842-853 | `MentalCard` | Private | Mental health card |
| 856-959 | `CaseSection` | Exported | Clinical case study section |
| 962-1013 | `SummarySection` | Exported | Summary and quiz section |
| 1015-1026 | `SummaryCard` | Private | Summary card component |

### Recommended Extractions

#### Priority 1: Extract Reusable Card Components

**New File:** `app/components/Presentation/cards/index.tsx`

```
/app/components/Presentation/
  cards/
    BaseCard.tsx          (~40 lines) - Base animated card with hover effects
    HeroCard.tsx          (~30 lines) - Hero section card
    ConceptCard.tsx       (~35 lines) - Concept explanation card
    ComparisonCard.tsx    (~60 lines) - SUS vs Societies comparison card (shared by DCNT, Cancer, Infection)
    SummaryCard.tsx       (~25 lines) - Summary/takeaway card
    index.tsx             (~10 lines) - Barrel export
```

**Rationale:** The file contains 6 similar card components with identical animation patterns. A single `BaseCard` with props for variant styling reduces duplication.

#### Priority 2: Extract Section Components

**New Structure:**
```
/app/components/Presentation/
  sections/
    HeroSection.tsx           (~70 lines)
    ConceptSection.tsx        (~50 lines)
    LifeCycleSection/
      index.tsx               (~60 lines) - Main section with timeline
      LifeCyclePanel.tsx      (~30 lines) - Content display panel
      lifecycleData.ts        (~180 lines) - Content data (extract from getLifeCycleContent)
    DCNTSection.tsx           (~80 lines)
    CancerSection.tsx         (~80 lines)
    InfectiousSection.tsx     (~60 lines)
    PregnancySection.tsx      (~120 lines)
    MentalHealthSection.tsx   (~50 lines)
    CaseSection.tsx           (~110 lines)
    SummarySection.tsx        (~70 lines)
    index.tsx                 (~15 lines) - Barrel export of all sections
```

#### Priority 3: Extract Shared UI Elements

**New File:** `app/components/Presentation/ui/SectionHeader.tsx`

Common section header pattern with title, description, and styling.

**New File:** `app/components/Presentation/ui/ModeToggle.tsx`

The SUS/Societies/Combined toggle used in DCNTSection.

#### Priority 4: Extract Animation Variants

**New File:** `app/components/Presentation/animations.ts`

```typescript
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const cardHover = {
  whileHover: { scale: 1.03, y: -8 },
  transition: { type: "spring", stiffness: 300 },
};
```

### Estimated Result

| Before | After |
|--------|-------|
| 1 file, 1026 lines | 15+ files, avg ~60 lines each |

---

## 2. SOAPExport.tsx Analysis

**File Path:** `/Users/demetriosagourakis/Darwin-MFC/app/components/Export/SOAPExport.tsx`
**Current Lines:** 966
**Purpose:** SOAP medical note creation, formatting, and export

### Current Structure

The file is a single large component with multiple concerns:

| Lines | Section | Responsibility |
|-------|---------|----------------|
| 1-18 | Imports | Dependencies |
| 19-83 | Types/Interfaces | `FamilyToolsData`, `SOAPData`, `SOAPExportProps` |
| 85-431 | Main Component | State, handlers, data management |
| 142-298 | `formattedSOAP` | useMemo for text generation |
| 300-320 | `copyToClipboard`, `downloadTxt` | Export utilities |
| 322-343 | `SectionHeader` | Collapsible section header |
| 345-411 | `handleSelectRecommendation` | Recommendation handling |
| 432-965 | JSX Return | Massive render block |

### Issues Identified

1. **Duplicated Preview Section** (lines 883-949 and 917-949) - The preview component is rendered twice, likely a copy-paste bug
2. **Mixed Concerns** - Form logic, text formatting, export utilities, and UI all in one file
3. **Large JSX Tree** - 500+ lines of JSX makes it hard to trace component structure
4. **Non-memoized handlers** - Several handlers recreated on every render

### Recommended Extractions

#### Priority 1: Fix Duplicate Preview Section

**Immediate:** Remove the duplicated preview section (lines 917-949 appear to be duplicated from 883-916). This alone removes ~32 lines.

#### Priority 2: Extract Form Sections

**New Structure:**
```
/app/components/Export/SOAPExport/
  index.tsx                    (~200 lines) - Main orchestrator
  sections/
    IdentificationSection.tsx  (~60 lines) - Patient identification form
    SubjectiveSection.tsx      (~80 lines) - S - Queixa principal with NLP
    ObjectiveSection.tsx       (~100 lines) - O - Vital signs, exam findings
    AssessmentSection.tsx      (~120 lines) - A - Diagnoses, codes, differential
    PlanSection.tsx            (~100 lines) - P - Prescriptions, follow-up
    FamilySection.tsx          (~80 lines) - F - Genogram, ecomap links
    index.tsx                  (~10 lines) - Barrel export
```

#### Priority 3: Extract SOAP Formatter

**New File:** `app/components/Export/SOAPExport/utils/formatSOAP.ts`

```typescript
export function formatSOAPToText(data: SOAPData): string {
  // Move the entire formattedSOAP logic here (~160 lines)
}

export function formatSOAPHeader(data: SOAPData): string { ... }
export function formatSubjective(data: SOAPData): string { ... }
export function formatObjective(data: SOAPData): string { ... }
export function formatAssessment(data: SOAPData): string { ... }
export function formatPlan(data: SOAPData): string { ... }
export function formatFamily(data: SOAPData): string { ... }
```

**Rationale:** Text formatting is pure logic with no React dependencies. Testing becomes trivial.

#### Priority 4: Extract Preview Component

**New File:** `app/components/Export/SOAPExport/SOAPPreview.tsx`

```typescript
interface SOAPPreviewProps {
  formattedText: string;
  onCopy: () => void;
  onDownload: () => void;
  copied: boolean;
}
```

#### Priority 5: Extract Types

**New File:** `app/components/Export/SOAPExport/types.ts`

Move `SOAPData`, `SOAPExportProps`, `FamilyToolsData` interfaces.

#### Priority 6: Extract Hooks

**New File:** `app/components/Export/SOAPExport/hooks/useSOAPForm.ts`

```typescript
export function useSOAPForm(initialData?: Partial<SOAPData>) {
  // State management
  // Update handlers
  // Recommendation handler
  // Return: data, updateData, handlers
}
```

**New File:** `app/components/Export/SOAPExport/hooks/useSOAPExport.ts`

```typescript
export function useSOAPExport(formattedSOAP: string) {
  // Copy/download logic
  // Return: copyToClipboard, downloadTxt, copied
}
```

### Estimated Result

| Before | After |
|--------|-------|
| 1 file, 966 lines | 12+ files, avg ~80 lines each |

---

## Implementation Priority

### Phase 1: Quick Wins (1-2 hours)

1. **SOAPExport.tsx:** Remove duplicate preview section (bug fix)
2. **sections.tsx:** Extract animation variants to shared file
3. **Both:** Extract TypeScript interfaces/types to dedicated files

### Phase 2: Core Refactoring (4-6 hours)

1. **SOAPExport.tsx:** Extract form sections
2. **sections.tsx:** Extract card components with BaseCard pattern
3. **SOAPExport.tsx:** Extract SOAP text formatter

### Phase 3: Polish (2-3 hours)

1. **SOAPExport.tsx:** Extract custom hooks
2. **sections.tsx:** Extract each section to dedicated file
3. **Both:** Add barrel exports and update import paths

---

## Benefits of Refactoring

### Maintainability

- **Single Responsibility:** Each file does one thing well
- **Easier Navigation:** Find code by file name, not line number
- **Smaller Diffs:** Code reviews focus on relevant changes
- **Clear Dependencies:** Import structure shows relationships

### Testability

- **Unit Testing:** Pure functions like `formatSOAPToText` can be tested in isolation
- **Component Testing:** Smaller components are easier to mount and test
- **Mocking:** Clear interfaces make dependency injection straightforward

### Performance

- **Code Splitting:** Next.js can split extracted components
- **Memoization:** Smaller components benefit more from React.memo
- **Bundle Analysis:** Clearer picture of what's included where

### Developer Experience

- **Faster IDE:** Smaller files load faster in editors
- **Better TypeScript:** Type inference works better in smaller scopes
- **Onboarding:** New developers understand structure quickly

---

## Migration Strategy

### Backward Compatibility

Keep the original file exporting from the new structure during migration:

```typescript
// sections.tsx (transitional)
export * from './sections';
```

This allows gradual migration of import statements across the codebase.

### Testing During Migration

1. Ensure existing functionality works after each extraction
2. Add tests for newly extracted modules
3. Run `npm run build` after each phase to catch type errors

### Rollback Plan

Git commits should be atomic per extraction, allowing easy revert if issues arise.

---

## Appendix: File Size Guidelines

| Size | Classification | Action |
|------|----------------|--------|
| < 100 lines | Small | No action needed |
| 100-300 lines | Medium | Acceptable for complex components |
| 300-500 lines | Large | Consider extraction |
| 500+ lines | Very Large | Extraction recommended |
| 1000+ lines | Critical | Extraction required |

Both analyzed files fall into the "Critical" category, making this refactoring a high-priority technical debt item.
