# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Darwin-MFC** is an academic Q1-standard (Nature/Cell level) interactive web application for comparative analysis of population-based screening programs and clinical protocols. It compares **official guidelines** (SUS/Brazil, USPSTF/USA, NHS/UK, NP-NCD/India, WHO) with **Medical Society recommendations** across multiple health domains.

**Key Characteristics:**
- Academic rigor with inline citations (Vancouver style)
- Dual content mode: Descriptive ↔ Critical Analysis
- **9 languages**: pt, en, es, fr, ru, ar (RTL), zh, el, hi
- Static site generation (SSG) for GitHub Pages deployment
- Dark mode as default theme

## Commands

### Development
```bash
npm run dev              # Start development server (localhost:3000)
npm run build            # Build for production (static export)
npm run build:custom-domain  # Build for custom domain deployment
npm run start            # Serve production build locally
npm run type-check       # TypeScript type checking
npm run verify           # Integration verification (ontologies, graph, translations)
npm run test:integration # Same as verify
```

### Environment Variables
- `USE_BASE_PATH=true` - Build with `/darwin-MFC` base path for github.io subdirectory deployment

### Deployment
The app is configured for static export (`output: "export"` in next.config.ts). Default build targets custom domain (no basePath), set `USE_BASE_PATH=true` for github.io subdirectory.

## Architecture & Code Structure

### Internationalization (next-intl)

**Files:**
- `i18n/config.ts`: Locale definitions, RTL detection
- `i18n/routing.ts`: next-intl navigation wrappers (Link, useRouter, usePathname)
- `middleware.ts`: Locale routing middleware
- `messages/{locale}/`: Translation JSON files (common.json, clinical-cases.json, protocols.json)

**Locales:** `pt` (default), `en`, `es`, `fr`, `ru`, `ar` (RTL), `zh`, `el`, `hi`

**Usage Pattern:**
```tsx
import { useTranslations } from 'next-intl';
const t = useTranslations('common');
return <h1>{t('title')}</h1>;
```

**Routing:** All routes are prefixed with locale (e.g., `/pt/cancer`, `/en/cancer`). The `[locale]` dynamic segment in `app/[locale]/page.tsx` handles the root for each locale.

### Core State Management (Zustand)

**File:** `lib/store/appStore.ts`

The entire application state is managed through a single Zustand store with localStorage persistence:
- `theme: 'light' | 'dark'` - Dark mode is the default
- `contentMode: 'descriptive' | 'critical_analysis'` - Switches entire app content between descriptive protocols and critical analysis
- `favorites: string[]` - User-favorited screening IDs
- `notes: Record<string, string>` - User notes per screening

**Important:** State persists to localStorage under the key `rastreamentos-sus-storage`. The `contentMode` toggle affects ALL pages globally and is the central architectural decision of the app.

### Multi-Country Architecture (v2.0.0)

**Status:** Implemented (Phase 1-4 complete, Phase 5-6 pending)

Darwin MFC supports multi-country deployment with region-specific medical data for Brazil (BR), India (IN), and European Union (EU).

**Key Features:**
- **Region Selection**: User-selectable via RegionSelector component in Header
- **Auto-Detection**: Automatically detects region from language (pt→BR, hi→IN, others→EU)
- **Independent from Locale**: Region (medical data) is separate from locale (UI language)
  - Example: User can view India medical data in Portuguese UI
- **Regional Overlays**: Medications and diseases have region-specific data overlays
- **Regulatory Bodies**: ANVISA (Brazil), CDSCO (India), EMA (EU)
- **Public Health Systems**: SUS (Brazil), Jan Aushadhi (India), NHS (EU varies by member state)

**Components:**
- `app/components/RegionSelector.tsx`: Flag-based region selector (BR/IN/EU)
- `app/components/RegionalContextBanner.tsx`: Displays regulatory body and public health system info
- `app/components/Comparison/ComparisonCard.tsx`: Highlights selected region's guidelines

**Type System:**
- `lib/types/region.ts`: Core regional types
  - `Region`: 'BR' | 'IN' | 'EU'
  - `RegionalMedicationOverlay`: Region-specific medication data
  - `RegionalDiseaseOverlay`: Region-specific disease prevalence and guidelines
  - `RegionalOverlayMap<T>`: Type-safe mapping of regions to overlays

- `lib/types/medicamento.ts`: Medication types with regional support
  - `regionalOverlays?: RegionalOverlayMap<RegionalMedicationOverlay>`
  - Helper functions: `isAvailableInPublicSystem()`, `getRegionalMedicationData()`

- `lib/types/doenca.ts`: Disease types with regional support
  - `regionalOverlays?: RegionalOverlayMap<RegionalDiseaseOverlay>`
  - Helper functions: `getRegionalPrevalence()`, `getRegionalGuideline()`

**Data Files:**
- `lib/data/regional-terminology.json`: Comprehensive regional medical terminology registry
- `lib/data/regions/brazil/medications.ts`: Brazil medication overlays (690 medications)
- `lib/data/regions/india/medications.ts`: India medication overlays (4350+ medications from NLEM 2022)
- `lib/data/regions/eu/medications.ts`: EU medication overlays
- `lib/data/regions/disease-prevalence-template.json`: Template for 1,104 regional disease entries

**State Management:**
```typescript
// lib/store/appStore.ts
const selectedRegion = useAppStore((state) => state.selectedRegion); // 'BR' | 'IN' | 'EU'
const setRegion = useAppStore((state) => state.setRegion);
```

**Usage Example:**
```typescript
import { useAppStore } from '@/lib/store/appStore';
import { isAvailableInPublicSystem } from '@/lib/types/medicamento';

const selectedRegion = useAppStore((state) => state.selectedRegion);
const isAvailable = isAvailableInPublicSystem(medication, selectedRegion);
```

**UI Integration:**
- Header displays RegionSelector next to LanguageSelector
- Medication cards show Globe icon when available in selected region's public system
- Disease detail pages display regional prevalence and guideline references
- ComparisonCard highlights selected region's screening guidelines with ring-2 border

**Future Work (Phase 5-6):**
- Phase 5: Translation of regional terminology to all 9 locales
- Phase 6: Auto-update system via PubMed E-utilities API, ANVISA/CDSCO/EMA APIs, WHO Global Health Observatory

### Dual Content Architecture

The app's unique feature is the **dual content mode system**:

1. **ContentModeWrapper** (`app/components/Content/ContentModeWrapper.tsx`):
   - Wraps pages that support both modes
   - Receives `descriptiveContent` and `criticalAnalysisContent` as props
   - Smoothly transitions between modes using Framer Motion
   - Controlled by global `contentMode` state

2. **Header Toggle** (`app/components/Layout/Header.tsx`):
   - Blue button = Descriptive mode (protocols, epidemiology, SUS vs Societies data)
   - Purple button = Critical Analysis mode (insights, controversies, challenges)
   - Clicking toggles `contentMode` in the store, affecting all pages instantly

3. **Data Structure Separation**:
   - Descriptive data: `lib/data/rastreamentos.ts` (structured screening protocols)
   - Critical analysis data: `lib/data/analise-critica.ts` (insights, controversies, challenges)
   - Both reference the same screening IDs for linking

### Type System Architecture

**Central Types** (`lib/types/`):
- `rastreamentos.ts`: Core screening data structures
  - `Rastreamento`: Main screening interface with recommendations, epidemiology, citations
  - `Recommendations`: Nested structure with `sus`, `societies`, `convergence` fields
  - `ConvergenciaStatus`: 'convergencia' | 'parcial' | 'divergencia' | 'em_disputa'

- `analysis.ts`: Critical analysis structures
  - `CriticalAnalysis`: Links to rastreamentoId with insights, controversies, challenges
  - `Insight`: Second-order and third-order insights (systemic implications)
  - `Controversy`: A vs B position debates with synthesis

- `references.ts`: Academic citation system
  - `Citation`: Vancouver-style references with DOI, PMID support

### Component Architecture

**Layout Components** (`app/components/Layout/`):
- `Header.tsx`: Global navigation + theme toggle + content mode toggle
- `Sidebar.tsx`: Category navigation (only visible on lg+ screens)
- `ThemeProvider.tsx`: Client-side theme initialization and toggle

**Bibliography System** (`app/components/Bibliography/`):
- `InlineCitation.tsx`: Renders citations like [1,2,3] with hover tooltips
- `CitationTooltip.tsx`: Shows full reference on hover
- `ReferenceList.tsx`: Generates complete bibliography sections
- `ReferenceValidator.tsx`: Development tool to check for uncited claims

**Comparison Components** (`app/components/Comparison/`):
- `ComparisonCard.tsx`: Side-by-side SUS vs Societies comparison
- Visual status indicators: 🟢 Convergence, 🟡 Partial, 🔴 Divergence, 🟣 Disputed

**Data Visualization** (`app/components/Charts/`):
- `CoverageChart.tsx`: Recharts bar chart for screening coverage vs targets
- `ConvergenceChart.tsx`: Pie chart showing convergence status distribution
- `TimelineChart.tsx`: Historical evolution of screening guidelines

**Search & Export** (`app/components/`):
- `Search/AdvancedSearch.tsx`: Fuse.js fuzzy search with category/convergence filters
- `Export/ExportTools.tsx`: PDF/CSV/JSON export functionality

### Page Structure (App Router)

Pages follow Next.js 15 App Router conventions in the `app/` directory:

**Major Route Categories:**
- **Screening**: `/cancer`, `/gestacao`, `/infantil`, `/neonatal`, `/adultos`, `/outros`
- **Clinical Tools**: `/medicamentos`, `/medicamentos/[id]`, `/medicamentos/comparador`, `/medicamentos/interacoes`
- **Diseases**: `/doencas`, `/doencas/[id]`, `/contexto/[doencaId]`
- **Protocols**: `/protocolos`, `/protocolos/flowchart/[id]`
- **Clinical Cases**: `/casos-clinicos`, `/casos-clinicos/[id]`
- **Family Tools**: `/ferramentas-familia`, `/ferramentas/genograma`, `/ferramentas/ecomapa`
- **Utilities**: `/calculadoras`, `/busca`, `/consulta-rapida`, `/prontuario`, `/estudo`
- **Reference**: `/analise`, `/bibliografia`, `/timeline`, `/comparacao`, `/about`

**Example Dual-Mode Page Pattern:**
```tsx
export default function Page() {
  return (
    <ContentModeWrapper
      descriptiveContent={<DescriptiveView />}
      criticalAnalysisContent={<CriticalAnalysisView />}
    />
  );
}
```

### Data Layer

**Location:** `lib/data/`

All content is stored as TypeScript constants (no database):
- `rastreamentos.ts`: Array of screening protocols with full citations
- `analise-critica.ts`: Array of critical analyses matching screening IDs
- `references.ts`: Centralized bibliography database
- `medicamentos/`: Drug information modules (antibiotics, cardiovascular, endocrine)
- `doencas/`: Disease protocols (infectious, non-infectious)

**Data Linking:** Critical analyses link to screenings via `rastreamentoId` field.

### Knowledge Graph System

**Location:** `lib/graph/`

A semantic graph connecting all medical entities:

- `builder.ts`: Constructs graph from disease/medication data
- `types.ts`: Node and edge type definitions

**Node Types:** `doenca`, `medicamento`, `sintoma`, `exame`, `gene`, `protocolo`

**Edge Types:**
- `causa`: disease → symptom
- `diagnostica`: exam → disease
- `trata`: medication → disease
- `interage`: medication ↔ medication (drug interactions)
- `metaboliza`: gene → medication (pharmacogenomics)
- `associado`: protocol → disease

**Usage:**
```tsx
import { buildKnowledgeGraph } from '@/lib/graph/builder';
const graph = buildKnowledgeGraph();
// graph.nodes, graph.edges
```

### Semantic Search

**Location:** `lib/search/`

Enhanced search with synonym expansion and medical terminology:

- `semantic.ts`: Fuse.js-based search with synonym expansion
- `synonyms.ts`: Medical synonym mappings

**Key Functions:**
- `semanticSearch()`: Search with automatic synonym expansion
- `facetedSearch()`: Combined filter + search
- `calculateSemanticSimilarity()`: String similarity scoring

**Usage:**
```tsx
import { semanticSearch } from '@/lib/search/semantic';
const results = semanticSearch(items, 'diabetes', [
  { name: 'titulo', weight: 2 },
  { name: 'descricao', weight: 1 }
]);
```

### Clinical Calculators

**Location:** `lib/calculators/`

25+ validated clinical scoring calculators:

- `types.ts`: Calculator interface definitions
- `registry.ts`: Central calculator registry
- `formulas.ts`: Shared calculation formulas
- `calculators/`: Individual calculator implementations

**Available Calculators:** APGAR, APACHE II, ASCVD, Bishop, Centor, CHA₂DS₂-VASc, Child-Pugh, CURB-65, Framingham, GAD-7, GCS, HAS-BLED, HEART, 4Ts HIT, MELD-Na, MMSE, NEWS2, Ottawa Ankle, PESI, PHQ-9, qSOFA, SOFA, TIMI, Wells PE, Apfel

**Pattern for adding calculators:**
```tsx
// lib/calculators/calculators/new-score.ts
export const newScoreCalculator: Calculator = {
  id: 'new-score',
  name: 'New Score',
  category: 'cardiology',
  calculate: (inputs) => ({ score, interpretation }),
};
```

### Ontology Integration

Medical data includes standardized ontology codes:

**Disease Ontologies:**
- `cid10`: ICD-10 codes (required for all diseases)
- `ciap2`: ICPC-2 codes for primary care
- `loinc`: LOINC codes for laboratory tests
- `ordo`: ORDO codes for rare diseases
- `hpo`: Human Phenotype Ontology codes

**Medication Ontologies:**
- `atcCode`: ATC classification
- `pharmgkb`: PharmGKB pharmacogenomics data

The verification script (`npm run verify`) validates ontology coverage.

### Styling & Theme System

**Global Styles:** `app/globals.css`
- CSS variables for theme colors: `--foreground`, `--background`, `--primary`, etc.
- Dark/light mode via Tailwind's `dark:` variant and HTML `class="dark"`
- Print styles for academic PDF export

**Theme Initialization:**
- SSR-safe theme loading via inline script in `app/layout.tsx`
- Prevents flash of wrong theme on page load
- Dark mode as default if no localStorage preference exists

**Path Aliases:**
- `@/*` maps to repository root (configured in tsconfig.json)
- Use `@/lib/...`, `@/app/components/...` for imports

## Development Guidelines

### Adding New Screenings

1. Define screening data in `lib/data/rastreamentos.ts` following the `Rastreamento` interface
2. Create critical analysis in `lib/data/analise-critica.ts` with matching `rastreamentoId`
3. Add references to `lib/data/references.ts`
4. Create route in `app/{category}/page.tsx` using `ContentModeWrapper`
5. Update sidebar navigation in `app/components/Layout/Sidebar.tsx`

### Working with Citations

Every factual claim must have inline citations:
```tsx
<InlineCitation citation="[1], [2]" references={references} />
```

The citation prop should reference IDs from the `references.ts` file.

### Content Mode Considerations

When building pages:
- Always provide BOTH descriptive and critical analysis content
- Descriptive = protocols, data, epidemiology, SUS vs Societies comparison
- Critical Analysis = insights, controversies, challenges, systemic implications
- Use `ContentModeWrapper` to wrap both versions
- Never mix descriptive and critical content in the same view

### State Management

Access global state via Zustand hooks:
```tsx
const theme = useAppStore((state) => state.theme);
const toggleTheme = useAppStore((state) => state.toggleTheme);
const contentMode = useAppStore((state) => state.contentMode);
```

State persists automatically to localStorage.

### Responsive Design

- Mobile-first approach
- Sidebar hidden on screens < lg (1024px)
- Tailwind breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Test print styles for academic PDF export

### Testing

**Design System Tests:** `lib/design-system/__tests__/`
- `accessibility.test.tsx`: WCAG compliance tests
- `integration.test.tsx`: Component integration tests
- `performance.test.tsx`: Rendering performance tests

**Note:** Tests are excluded from TypeScript compilation (see `tsconfig.json` excludes) but can be run with Jest.

## Key Technical Decisions

1. **Static Export:** App is fully static (no server-side runtime) for easy deployment
2. **No Backend:** All data is TypeScript constants, no API calls or database
3. **Client-Side Only State:** Zustand + localStorage (no server state)
4. **Multilingual:** 9 locales via next-intl, Portuguese as default
5. **Academic Rigor:** Every claim must be cited with Vancouver-style references
6. **Dual Content Architecture:** Central design pattern affecting entire app structure

## Project Context

This is an academic/scientific project for the **Darwin Medical Foundation Cluster (Darwin-MFC)** platform. The goal is Nature/Cell-level academic rigor for analyzing healthcare screening guidelines globally. Priority is given to accuracy, citations, and critical systemic analysis over features.

**Live Demo:** <https://mfc.agourakis.med.br>

## Strategic Planning

For implementation roadmap and strategic direction, see:
- `ROADMAP.md` - 12-month implementation plan with 4 phases
- `PLANO_SUPERACAO_SOTA_DARWIN.md` - Strategic 6-dimension expansion plan
- `SOTA_COMPETITIVE_ANALYSIS.md` - Competitive analysis vs. UpToDate, Medscape, etc.
- `APS_MFC_FOCUS.md` - Strategic repositioning for Primary Care focus

## LLM Offload

Use `llm-offload` for bulk generation to save Anthropic tokens:
- `llm-offload -t expand -p local` - Expand outline (free, local Mistral)
- `llm-offload -t paraphrase -p grok` - Rewrite text (Grok)
- `llm-offload -t scaffold -p local` - Code boilerplate
- `llm-offload -t variations -p minimax` - Generate alternatives
- `llm-offload --list-templates` - See all templates

**Workflow**: Claude designs → llm-offload expands → Claude critiques

