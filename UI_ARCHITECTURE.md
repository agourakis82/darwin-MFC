# Darwin PS UI Architecture

Status: Draft v1  
Scope: Design and interaction architecture for the `PS` vertical  
Companion docs:
- [`SPEC.md`](/home/demetrios/darwin-MFC/SPEC.md)

## 1. Purpose

This document translates the Darwin PS product spec into a concrete UI architecture.

It defines:
- visual hierarchy
- layout rules
- typography
- spacing
- semantic state system
- sheets and overlays
- motion policy
- accessibility gates

This is a normative guide for PS-critical surfaces.

## 2. Design Intent

The PS vertical should feel:
- calm
- precise
- immediate
- legible under stress
- operational rather than ornamental

Target quality bar:
- clinically credible
- Apple-grade minimum interaction quality
- mobile-first emergency ergonomics

Non-goals:
- flashy consumer motion
- decorative skeuomorphism
- dense enterprise dashboard clutter
- inconsistent page-by-page styling

## 3. Surface Model

There are five primary PS surface types:

1. `Cockpit Surface`
: PS home with active case, quick actions, and launchers

2. `Runner Surface`
: active protocol execution workspace

3. `Context Sheet`
: drug, score, calculator, or timer support without route loss

4. `Summary Surface`
: handoff and debrief

5. `Navigation Surface`
: sidebar, mobile nav, search/command entry

Each surface must share the same semantic state system and visual primitives.

## 4. Layout Architecture

### 4.1 Global shell

Top shell order:
1. `Patient Context Bar`
2. `Case / workflow header`
3. `Primary task surface`
4. `Persistent action rail or bottom action bar`

Rules:
- the top area must privilege case state over branding
- the active workflow must be visible without deep scanning
- navigation must never visually overpower the task surface

### 4.2 Desktop layout

Recommended runner grid:
- left rail: step map and section progress
- center pane: active step
- right pane: situational awareness and context sheets

Target ratios:
- left: `20-24%`
- center: `44-52%`
- right: `24-30%`

Rules:
- center pane owns focus
- side panes support orientation and action, not competition
- no more than one dominant panel at a time

### 4.3 Mobile layout

Recommended runner order:
1. compact context bar
2. step progress
3. active step block
4. inline action cards
5. sticky action bar

Rules:
- the active step should fit near the top without dense scrolling
- the primary action should be reachable one-handed
- supporting tools should open as bottom sheets

## 5. Typography System

### 5.1 Font roles

- `Sans UI`: use an `SF Pro`-like system font stack for interface text
- `Mono data`: use an `SF Mono`-like stack for:
  - weights
  - doses
  - infusion rates
  - concentrations
  - timers

### 5.2 Hierarchy

Recommended roles:
- `Display`: workflow title or primary emergency state
- `Title`: active step title
- `Section`: panel titles and stop-point headings
- `Body`: short explanatory text
- `Meta`: supportive descriptors, labels, timestamps
- `Data`: monospaced clinical values

Rules:
- step title must visually dominate description text
- body copy must be concise and broken into digestible blocks
- meta text must remain legible and never become the only carrier of critical meaning

### 5.3 Clinical data formatting

Rules:
- numeric values use tabular-feeling mono formatting when possible
- unit must stay visually attached to the number
- use fixed formatting only where clinically useful
- do not over-round clinically meaningful values

Examples of mono-first data:
- `70 kg`
- `0.12 mcg/kg/min`
- `24 mL/h`
- `02:00`

## 6. Spacing and Density

### 6.1 Base rhythm

Use an `8pt` spacing rhythm with tighter emergency-safe exceptions.

Suggested scale:
- `4`
- `8`
- `12`
- `16`
- `24`
- `32`

### 6.2 Density rules

- active-step surfaces should feel compact, not cramped
- visual breathing room should separate:
  - instruction
  - action
  - confirmation
- dense data is acceptable in sheets if hierarchy is preserved

## 7. Color and Semantic State System

### 7.1 Principle

Color is supportive, never exclusive.

Every semantic state must be represented by:
- color
- icon
- label
- placement pattern

### 7.2 Core semantic states

- `critical`
- `warning`
- `info`
- `active`
- `pending`
- `completed`
- `confirmed`
- `disabled`

### 7.3 Usage rules

- `critical` is reserved for immediate danger, severe risk, or truly urgent interruption
- `warning` highlights elevated risk or required vigilance
- `info` communicates context without demanding action
- `completed` means the workflow step was marked done
- `confirmed` means the user explicitly affirmed a real-world action occurred

### 7.4 Visual restraint

- avoid full-screen saturation
- use stronger chroma near the locus of action, not as page wallpaper
- backgrounds should support long reading and numeric scanning

## 8. Core Components

### 8.1 Patient Context Bar

Contains:
- weight source and value
- ideal-weight toggle if relevant
- key flags
- edit entrypoint

Rules:
- compact by default
- expandable for editing
- current weight source must be obvious

### 8.2 Active Step Card

Contains:
- step type
- step title
- concise description
- required actions
- contextual CTAs

Rules:
- only one active step card should dominate the surface
- long notes belong below the main action region or in expandable panels

### 8.3 Stop Point Card

Contains:
- short title
- why it matters
- 2-5 verification items
- continue action

Rules:
- must be rarer and more deliberate than a normal card
- should not feel like a blocking punishment dialog
- should be visually distinct from generic warnings

### 8.4 Drug Sheet

Contains:
- drug identity
- weight source used
- dose output
- concentration assumption
- rate or dilution output
- consult/confirm actions

Rules:
- output must be glanceable
- assumptions must sit next to outputs, not hidden below
- consult versus confirm must be unmistakable

### 8.5 Score Sheet

Contains:
- score name
- inputs
- result
- interpretation
- return-to-flow action

Rules:
- minimal typing
- clear result state
- no ambiguity about whether the result entered the session timeline

### 8.6 Timer Overlay

Contains:
- active timer
- elapsed time
- next milestone
- quick event markers

Rules:
- visible but not overwhelming
- must not steal the user from the runner

### 8.7 Handoff Panel

Contains:
- illness severity
- patient summary
- action list
- contingency plan
- copy action

Rules:
- terse
- operational
- readable in under 30 seconds

### 8.8 Debrief Panel

Contains:
- key timestamps
- confirmed actions
- pending or missed actions
- optional reflection

Rules:
- educational tone, not punitive
- must not imply legal charting

## 9. Navigation and Search

### 9.1 Navigation

Rules:
- navigation supports orientation, not dominance
- active workflow state should be visible in navigation chrome
- avoid deep nested route journeys inside live case work

### 9.2 Search

Search should behave like a contextual clinical command entry.

Priorities:
- current workflow relevance
- exact match on critical drugs and protocols
- recent items
- quick-launch actions

Rules:
- search results should group by type
- results should be short and decisive
- selecting a result should preserve case context when possible

## 10. Interaction States

Every interactive element should have explicit states:
- rest
- hover if applicable
- pressed
- focused
- active
- disabled
- completed
- confirmed

Rules:
- focus visibility is required
- pressed state must be immediate
- disabled state must remain readable enough to explain unavailability

## 11. Motion Policy

### 11.1 Allowed motion

- sheet reveal
- step transition
- subtle highlight on completion
- timer state emphasis

### 11.2 Prohibited motion on critical surfaces

- ornamental parallax
- large zoom transitions
- looping decorative motion
- persistent motion that competes with timers or alerts

### 11.3 Reduced motion

When reduced-motion preference is present:
- replace spatial motion with fade or emphasis changes
- keep continuity, remove theatricality

## 12. Alerts, Banners, and Interruptions

### 12.1 Alert hierarchy

- `info`: inline, low emphasis
- `warning`: inline prominent
- `critical`: rare, interruptive only when justified

### 12.2 Copy rules

- verb-first when possible
- one idea per line
- actionable language only
- no long explanatory paragraphs

### 12.3 Banner rules

Use banners for:
- context mismatch
- estimated-weight warning
- active timer state
- recoverable but important safety conditions

Do not use banners for:
- generic tips
- low-value reminders
- repeated noise

## 13. Accessibility Gates

The PS vertical must meet these minimum gates:
- critical tap targets at least `44x44`
- state not conveyed by color alone
- contrast at least WCAG AA for text
- non-text contrast sufficient for controls and state surfaces
- reduced-motion support
- keyboard/focus visibility on desktop contexts
- labels for icon-only critical controls

## 14. Content Rules

### 14.1 Step copy

- one primary instruction
- one short explanation if needed
- notes below action region

### 14.2 Clinical value display

- number and unit must stay together
- show source and assumption
- use consistent terminology across protocols and sheets

### 14.3 Freshness and governance

Secondary surfaces may show:
- last reviewed
- version
- owner
- source guideline

## 15. Anti-Patterns

Do not ship:
- tiny chips as primary actions
- color-only severity cues
- route change for every supporting task
- dense multi-column mobile tables without clear priority
- modals stacked on sheets stacked on overlays
- decorative motion during urgent tasks
- giant hero branding in place of case state

## 16. Recommended Implementation Order

1. establish semantic state tokens
2. build typography and spacing primitives
3. build `PatientContextBar`
4. build `ActiveStepCard`
5. build `DrugSheet`
6. build `StopPointCard`
7. build `SituationalAwarenessPanel`
8. build `HandoffPanel`
9. build `DebriefPanel`
10. unify motion and accessibility behavior

## 17. Definition of Done for PS UI

The UI architecture is not done when it merely looks consistent.

It is done when:
- active case state is obvious
- next action is obvious
- critical values are glanceable
- interruption recovery is easy
- touch ergonomics are safe
- alerts are rare and meaningful
- sheets preserve flow
- visual polish reinforces speed and trust
