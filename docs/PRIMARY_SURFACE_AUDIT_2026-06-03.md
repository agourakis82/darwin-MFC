# Primary Surface Audit - 2026-06-03

## Scope

This audit checks the current Darwin-MFC primary app surface after the Clinical Intelligence 2026 and incubator quarantine work.

Primary surface means:

- `app/`
- `messages/`
- active `lib/` modules that remain outside `incubator/`

The audit intentionally separates visible product copy from internal comments, historical filenames, and implementation labels.

## Command

```bash
npm run audit:primary-surface -- --format=summary
```

## Acceptance

Primary clinical surface is considered ready when:

- visible claim hits are `0`;
- `app/[locale]/learn/diagnosis` is absent;
- `messages/*/common.json` has no `sota` namespace;
- remaining SOTA/revolutionary wording is internal-only and tracked as future cleanup.

## Current Result

```text
scanned files: 997
claim hits: 50
visible claim hits: 0
internal claim hits: 50
app router diagnosis route present: false
common messages sota namespaces: 0
primary surface ready: true
```

The main visible cleanup removed:

- `Referências Principais (Q1+ SOTA)` from the `/outros` page;
- visible `interfaces revolucionárias` copy from the preventive dashboard footer;
- orphaned `sota` namespaces from all 9 `messages/*/common.json` files.

Residual internal hits remain in comments, historical module names, design-system experiment files, AI prototype files, and imported expansion filenames. They should not be treated as current user-facing clinical copy.

## Follow-up

Future cleanup can rename or quarantine the legacy `lib/ai`, `lib/design-system` experimental demos, and older `expansao-sota*` filenames in a dedicated cut. That work is separate from the Clinical Intelligence 2026 calculator cut and should keep the static export gates green.
