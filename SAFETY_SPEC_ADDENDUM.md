# Darwin PS Safety Spec Addendum

Status: Draft v1  
Companion docs:
- `SPEC.md`
- `UI_ARCHITECTURE.md`
- `EVALUATION_PROTOCOL.md`

## 1. Purpose

This addendum narrows the Darwin PS redesign around the highest-priority safety risks:
- dose and weight error
- omission of critical steps

It converts product decisions into explicit safety behavior for the PS vertical.

## 2. Safety Priorities

Priority 1:
- dose and weight error

Priority 2:
- omission of critical steps

These priorities override secondary UX improvements when tradeoffs are required.

## 3. Ordered Safety Strategy

Implementation order:
1. `Drug sheet`
2. `Weight source rigor`
3. `Stop points`
4. `Double-check workflow`

Rationale:
- the drug sheet is the main safety surface where dosing assumptions become visible
- weight source semantics must then be made explicit across all calculated outputs
- stop points reduce omission during workflow progression
- double-check should be focused where risk is highest to avoid unnecessary friction

## 4. Weight Safety Rules

### 4.1 Weight states

Supported weight states:
- `verified`
- `estimated`
- `ideal`
- `unknown`

### 4.2 Product rule

Verified and estimated weights may coexist, but they must never appear visually equivalent.

### 4.3 Dose display requirements

Any dose that depends on weight must display:
- calculated value
- unit
- weight source
- weight timestamp
- calculation basis

### 4.4 Estimated-weight warning

If a dose uses `estimated` weight:
- show a persistent banner in the active safety surface
- show a visible badge beside each calculated dose

This rule is mandatory for:
- drug sheet
- infusion calculations
- any future inline dose cards

## 5. High-Alert Medication Policy

### 5.1 Definition in v1

Any medication using:
- weight-based dosing
- infusion logic

is treated as `high-alert` in v1.

### 5.2 Safety behavior

For every high-alert medication:
- `Mark as reviewed` must always be available
- `Confirm use` must be available and visually prominent
- dose assumptions must remain visible beside the output
- concentration and infusion assumptions must remain visible beside the output

### 5.3 Speed vs safety rule

When speed and safety conflict:
- safety takes precedence for `high-alert meds`
- speed may dominate only outside the high-alert context

## 6. Drug Sheet Safety Requirements

The `drug sheet` is the primary medication safety surface.

### 6.1 Mandatory content

The sheet must show:
- drug identity
- indication
- weight source
- weight timestamp
- dose output
- dilution
- infusion rate where applicable
- explicit assumptions and calculation basis

### 6.2 Mandatory actions

The sheet must support:
- `consulted`
- `reviewed`
- `confirmed use`

### 6.3 UI rules

- `Confirm use` should be strongly emphasized
- `Reviewed` should be easy to tap and clearly distinct from `Confirm use`
- estimated-weight states must be impossible to miss

## 7. Stop Point Policy

### 7.1 Coverage

Stop points are required across all sentinel workflows:
- PCR
- sepse/choque
- IOT/RSI

### 7.2 Density

Stop-point count is variable by workflow and risk.

### 7.3 Size

Stop-point size is variable by workflow and risk, but every item must be clinically necessary.

### 7.4 Exit behavior

The destination after stop-point completion is context-dependent:
- return to current step
- advance to next step
- open related safety tool

The workflow author should control this behavior.

## 8. Omission Prevention Model

The minimum evidence of safe workflow execution is:
- checklist interaction
- step completion
- timeline event

This is the minimum v1 behavior for reducing omission risk.

## 9. Safety Timeline Model

The timeline must capture:
- `consulted`
- `reviewed`
- `confirmed`
- `step completed`

The timeline does not need to include weight source in v1, but dose surfaces must show it.

## 10. Open Implementation Notes

- future versions may add stricter gating for confirmation flows
- future versions may add route-level prevention when weight is unknown
- future versions may add explicit 10x and unit mismatch traps

