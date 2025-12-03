# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Darwin-MFC** is an academic Q1-standard (Nature/Cell level) interactive web application for comparative analysis of population-based screening programs in Brazil. It compares **SUS (Sistema Único de Saúde)** guidelines with **Medical Society recommendations** across 16 different screening programs (cancer, prenatal, neonatal, chronic diseases, etc.).

**Key Characteristics:**
- Academic rigor with inline citations (Vancouver style)
- Dual content mode: Descriptive ↔ Critical Analysis
- Static site generation (SSG) for GitHub Pages deployment
- Dark mode as default theme
- Portuguese language content (pt-BR)

## Commands

### Development
```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production (static export)
npm run start        # Serve production build locally
npm install          # Install dependencies
```

### Deployment
The app is configured for static export (`output: "export"` in next.config.ts) suitable for GitHub Pages or similar static hosting.

## Architecture & Code Structure

### Core State Management (Zustand)

**File:** `lib/store/appStore.ts`

The entire application state is managed through a single Zustand store with localStorage persistence:
- `theme: 'light' | 'dark'` - Dark mode is the default
- `contentMode: 'descriptive' | 'critical_analysis'` - Switches entire app content between descriptive protocols and critical analysis
- `favorites: string[]` - User-favorited screening IDs
- `notes: Record<string, string>` - User notes per screening

**Important:** State persists to localStorage under the key `rastreamentos-sus-storage`. The `contentMode` toggle affects ALL pages globally and is the central architectural decision of the app.

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
- Each screening category has its own route (e.g., `/cancer`, `/gestacao`, `/infantil`)
- Pages that support dual content use `ContentModeWrapper` to switch between modes
- `page.tsx` files are the entry points for each route

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

**Data Linking:** Critical analyses link to screenings via `rastreamentoId` field.

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

## Key Technical Decisions

1. **Static Export:** App is fully static (no server-side runtime) for easy deployment
2. **No Backend:** All data is TypeScript constants, no API calls or database
3. **Client-Side Only State:** Zustand + localStorage (no server state)
4. **Portuguese Content:** All UI and content in pt-BR
5. **Academic Rigor:** Every claim must be cited with Vancouver-style references
6. **Dual Content Architecture:** Central design pattern affecting entire app structure

## Project Context

This is an academic/scientific project for the **Darwin Medical Foundation Cluster (Darwin-MFC)** platform. The goal is Nature/Cell-level academic rigor for analyzing Brazilian healthcare screening guidelines. Priority is given to accuracy, citations, and critical systemic analysis over features.
