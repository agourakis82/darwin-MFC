# Darwin PS Design Tokens and Component Inventory

Status: Draft v1  
Companion docs:
- `SPEC.md`
- `UI_ARCHITECTURE.md`

## 1. Purpose

This document converts the PS product and UI architecture into implementable design tokens and a component inventory.

It is intended to guide:
- design-system implementation
- Tailwind or CSS variable mapping
- component construction
- semantic consistency across PS screens

## 2. Token Strategy

Token model for PS should be semantic-first, not page-first.

Priority order:
1. global PS foundations
2. semantic state tokens
3. component tokens
4. workflow-specific overrides only when justified

## 3. Naming Convention

Recommended naming:
- `--ps-bg-*`
- `--ps-fg-*`
- `--ps-border-*`
- `--ps-state-*`
- `--ps-space-*`
- `--ps-radius-*`
- `--ps-shadow-*`
- `--ps-font-*`
- `--ps-text-*`
- `--ps-motion-*`

Tailwind mapping can mirror these names through theme extension.

## 4. Foundation Tokens

### 4.1 Background tokens

- `--ps-bg-canvas`
: app background

- `--ps-bg-elevated`
: cards and panels

- `--ps-bg-subtle`
: low-emphasis container backgrounds

- `--ps-bg-overlay`
: sheets and overlays

- `--ps-bg-inverse`
: rare inverse surfaces

### 4.2 Foreground tokens

- `--ps-fg-primary`
: primary text

- `--ps-fg-secondary`
: supporting text

- `--ps-fg-muted`
: tertiary metadata

- `--ps-fg-inverse`
: text on inverse surfaces

- `--ps-fg-data`
: monospaced clinical data

### 4.3 Border tokens

- `--ps-border-subtle`
- `--ps-border-strong`
- `--ps-border-focus`
- `--ps-border-divider`

## 5. Semantic State Tokens

Each state needs foreground, background, border, and icon affordance.

### 5.1 Critical

- `--ps-state-critical-fg`
- `--ps-state-critical-bg`
- `--ps-state-critical-border`
- `--ps-state-critical-icon`

### 5.2 Warning

- `--ps-state-warning-fg`
- `--ps-state-warning-bg`
- `--ps-state-warning-border`
- `--ps-state-warning-icon`

### 5.3 Info

- `--ps-state-info-fg`
- `--ps-state-info-bg`
- `--ps-state-info-border`
- `--ps-state-info-icon`

### 5.4 Active

- `--ps-state-active-fg`
- `--ps-state-active-bg`
- `--ps-state-active-border`

### 5.5 Pending

- `--ps-state-pending-fg`
- `--ps-state-pending-bg`
- `--ps-state-pending-border`

### 5.6 Completed

- `--ps-state-completed-fg`
- `--ps-state-completed-bg`
- `--ps-state-completed-border`

### 5.7 Confirmed

- `--ps-state-confirmed-fg`
- `--ps-state-confirmed-bg`
- `--ps-state-confirmed-border`

### 5.8 Disabled

- `--ps-state-disabled-fg`
- `--ps-state-disabled-bg`
- `--ps-state-disabled-border`

## 6. Typography Tokens

### 6.1 Font families

- `--ps-font-sans`
: system sans stack aligned to `SF Pro` style

- `--ps-font-mono`
: system mono stack aligned to `SF Mono` style

### 6.2 Type scale

- `--ps-text-display`
- `--ps-text-title`
- `--ps-text-section`
- `--ps-text-body`
- `--ps-text-meta`
- `--ps-text-data`

### 6.3 Font weights

- `--ps-weight-regular`
- `--ps-weight-medium`
- `--ps-weight-semibold`
- `--ps-weight-bold`

### 6.4 Line heights

- `--ps-leading-tight`
- `--ps-leading-normal`
- `--ps-leading-relaxed`

## 7. Spacing Tokens

Base spacing rhythm:
- `--ps-space-1`: 4px
- `--ps-space-2`: 8px
- `--ps-space-3`: 12px
- `--ps-space-4`: 16px
- `--ps-space-5`: 20px
- `--ps-space-6`: 24px
- `--ps-space-8`: 32px
- `--ps-space-10`: 40px

## 8. Radius Tokens

- `--ps-radius-sm`
- `--ps-radius-md`
- `--ps-radius-lg`
- `--ps-radius-xl`
- `--ps-radius-sheet`
- `--ps-radius-pill`

Guideline:
- buttons and cards should not mix unrelated radii
- sheets may use the largest radius
- pills are reserved for status chips and compact metadata

## 9. Shadow and Depth Tokens

- `--ps-shadow-rest`
- `--ps-shadow-elevated`
- `--ps-shadow-focus`
- `--ps-shadow-overlay`

Guideline:
- shadow is secondary to contrast and border
- avoid heavy consumer-style layered shadows

## 10. Motion Tokens

- `--ps-motion-fast`
- `--ps-motion-base`
- `--ps-motion-slow`
- `--ps-ease-standard`
- `--ps-ease-emphasis`

Allowed uses:
- sheet reveal
- step transition
- active-state highlight
- timer emphasis

## 11. Z-Index Layers

- `--ps-z-base`
- `--ps-z-sticky`
- `--ps-z-header`
- `--ps-z-sheet`
- `--ps-z-overlay`
- `--ps-z-critical`

## 12. Component Inventory

### 12.1 Shell and navigation

- `PSLayoutShell`
: root shell for PS pages

- `PSPatientContextBar`
: persistent patient context and edit entrypoint

- `PSCaseHeader`
: workflow title, severity, and quick actions

- `PSSidebarNav`
: desktop navigation

- `PSMobileNav`
: mobile navigation

- `PSCommandSearch`
: contextual search entry

### 12.2 Cockpit components

- `PSActiveCaseCard`
: resume current case

- `PSImmediateActionsRail`
: quick access to drugs, timers, scores, calculators

- `PSSentinelWorkflowGrid`
: PCR, sepse/choque, IOT/RSI launchers

- `PSQuickDoseRail`
: high-frequency medication shortcuts

- `PSRecentItemsPanel`
: recent protocols, drugs, and scores

- `PSFavoritesPanel`
: curated persistent items

### 12.3 Runner components

- `PSProtocolStepMap`
: step list and progress

- `PSActiveStepCard`
: active step content

- `PSDecisionBlock`
: branching options

- `PSChecklistBlock`
: checkable protocol tasks

- `PSStopPointCard`
: rare pause-and-verify checkpoint

- `PSSituationalAwarenessPanel`
: timers, next actions, last confirmed actions, pending tasks

- `PSProtocolTimeline`
: event stream

### 12.4 Support sheets

- `PSDrugSheet`
: drug data, weight source, dose, rate, confirm actions

- `PSScoreSheet`
: inline score input and result

- `PSCalculatorSheet`
: inline calculator support

- `PSTimerOverlay`
: running timer and markers

- `PSNotePanel`
: quick note and reflection support

### 12.5 Summary surfaces

- `PSHandoffPanel`
: I-PASS-derived summary

- `PSDebriefPanel`
: reflection and action review after case stabilization/closure

### 12.6 Role-oriented extension

- `PSPCRRoleBoard`
: optional role view for leader, compressor, airway, medication, monitor-defibrillator

## 13. Component States

Components should support these states where relevant:
- rest
- hover
- pressed
- focused
- active
- pending
- completed
- confirmed
- disabled
- loading
- error

## 14. State Mapping Rules

### 14.1 Completed vs confirmed

- `completed`
: user marked workflow item done

- `confirmed`
: user explicitly affirmed a real-world action occurred

These states must never share identical visual treatment.

### 14.2 Critical vs warning

- `critical`
: high urgency, severe risk, or interruptive necessity

- `warning`
: caution without hard interruption

These states must never share the same banner style.

## 15. Priority Matrix

### Tier 1: must build for MVP

- `PSPatientContextBar`
- `PSActiveCaseCard`
- `PSImmediateActionsRail`
- `PSProtocolStepMap`
- `PSActiveStepCard`
- `PSStopPointCard`
- `PSSituationalAwarenessPanel`
- `PSDrugSheet`
- `PSTimerOverlay`
- `PSHandoffPanel`

### Tier 2: should build after MVP core

- `PSScoreSheet`
- `PSCalculatorSheet`
- `PSProtocolTimeline`
- `PSDebriefPanel`
- `PSRecentItemsPanel`

### Tier 3: validate before building

- `PSPCRRoleBoard`
- advanced command search
- shared team display
- patient-facing room mode

## 16. Suggested Implementation Mapping

### CSS variables

Use CSS variables for:
- semantic colors
- typography roles
- spacing
- radii
- shadows
- motion

### React components

Use dedicated components for:
- cards
- banners
- pills
- sheets
- action rows
- checklist rows
- summary panels

### Utility classes

Use utility classes for:
- layout
- spacing application
- flex and grid behavior
- responsive switching

## 17. Accessibility Checklist

Before a PS-critical component is considered done, verify:
- target size safe for touch
- visible focus ring
- contrast sufficient
- color not sole carrier of meaning
- labels for icon-only controls
- reduced-motion safe behavior

## 18. Definition of Done

This inventory is only useful if it reduces ambiguity.

A PS component is considered production-ready when:
- its semantic state mapping is explicit
- its token dependencies are known
- its motion behavior is defined
- its accessibility requirements are defined
- its mobile and desktop behavior are both defined
