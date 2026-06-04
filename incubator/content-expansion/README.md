# Content Expansion Incubator

This directory holds large clinical content expansion batches that are not ready for the main Darwin-MFC clinical indexes.

Current batches:

- `doencas/expansao-800`: 321 disease entries.
- `medicamentos/expansao-1000`: 404 medication entries.

Promotion status:

- Not imported by `lib/data/doencas/index.ts`.
- Not imported by `lib/data/medicamentos/index.ts`.
- Not part of the clinical static export surface.
- Audited through `npm run audit:content-expansions`.

Known blockers from the 2026-06-03 audit:

- 29 duplicate IDs across the expansion batches.
- 30 disease entries missing required fields.
- 434 entries without detectable citation metadata.
- 131 overlaps with existing consolidated indexes.

Promotion requires deduplication, citation review, schema validation, and an explicit import decision.
