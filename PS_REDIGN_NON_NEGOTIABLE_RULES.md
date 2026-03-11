# PS Redesign Non-Negotiable Rules

## Layout rules

### 1. Center column wins
- in runner views, the active task is the visual anchor
- left and right columns must be quieter in contrast, density, and geometry

### 2. One launch surface
- in the cockpit, `Continue / start` is the dominant surface
- everything else supports that decision

### 3. No metric card by default
- metrics become pills, rows, or inline values unless they directly drive action

### 4. Support panes stay compact
- flow map is navigation
- safety column is support
- neither can behave like a second center column

## Typography rules

### 5. Labels stay quiet
- uppercase labels are metadata, not headings
- they should never dominate a surface

### 6. Active task gets the largest type
- the step title and core decision should carry the page visually

## Surface rules

### 7. Fewer surfaces, stronger purpose
- remove duplicate framing
- merge adjacent low-value panels
- use contrast to show priority, not random variety

### 8. Overlays are premium surfaces
- overlays should look cleaner and more direct than background content
- they should not inherit dashboard density

## Motion rules

### 9. Motion is structural
- entry, step change, and overlay transitions only
- no decorative animation loops
- reduced-motion fallback is mandatory

## Content rules

### 10. Short copy wins
- action first
- fewer descriptors
- no “UI explaining itself” copy unless safety requires it

### 11. Safety copy must be explicit
- guardrails stay visible
- provenance and assumptions stay explicit
- risk language is direct

## Decision rule

If a change makes the screen:
- feel more like a dashboard
- introduce another equal-weight box
- or reduce active-task dominance

the change is wrong and should be rejected.
