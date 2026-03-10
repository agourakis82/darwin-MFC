# PS Web App Shell Changelog

## 2026-03-10

### Product surface
- Rebuilt the PS vertical as an app shell instead of a site-like dashboard.
- Promoted the three sentinel workflows to the primary entrypoint: `PCR`, `Sepse / choque`, `IOT / RSI`.
- Tightened the header into operational chrome with command-surface search, active-case context, and mode switching.

### Runner
- Moved the runner to a persistent three-plane layout:
  - `flow map`
  - `active task`
  - `safety column`
- Pulled resources into the active-task plane to reduce context switching.
- Preserved safety timeline, stop points, role board, handoff, and debrief flows.

### Overlays
- Restyled `DrugSheet`, `Handoff`, and `Debrief` into higher-quality app surfaces.
- Kept existing test hooks and import/export behaviors intact.
- Preserved the active safety model around review, confirmation, and handoff replacement.

### Design system
- Added shared PS app-shell utilities in `app/globals.css`.
- Reduced per-component visual drift by unifying surfaces, pills, labels, and interaction transitions.

### Validation
- `pnpm type-check` passed.
- `pnpm test:e2e -- tests/e2e/ps-runner-smoke.spec.ts tests/e2e/ps-drug-sheet.spec.ts` passed (`14 passed`).

### Infra cleanup
- Aligned repo Node metadata to `24` (`package.json`, `.node-version`, `.nvmrc`, workflows).
- Removed the duplicate native scaffold from this monorepo after splitting it into `Darwin-ER`.
