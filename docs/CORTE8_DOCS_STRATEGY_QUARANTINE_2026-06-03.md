# Corte 8 - Docs Strategy Quarantine - 2026-06-03

## Decisao

Nao stagear docs SOTA/estrategia historicas como documentacao primaria do Darwin-MFC clinico.

Esses documentos podem ser uteis como memoria de ideacao, mas conflitam com o contrato atual:

- app medico clinico, nao LMS;
- Inteligencia Clinica 2026, nao SOTA calculators 2025;
- claims cautelosos e rastreaveis;
- backend clinico real ou estado indisponivel;
- sem mock clinico.

## Contrato De Staging

`scripts/plan-corte8-docs-strategy.ts` deve retornar:

```text
stageable primary product docs: 0
safe to promote to primary clinical docs: false
```

Somente artefatos de auditoria/quarentena podem ser staged:

- `docs/DOCS_STRATEGY_AUDIT_2026-06-03.md`
- `docs/CORTE8_DOCS_STRATEGY_QUARANTINE_2026-06-03.md`
- `package.json`
- `incubator/education-sota/docs/strategy/`
- `incubator/education-sota/lib/design-system/UIUX-INNOVATION-GOALS.md`
- `incubator/education-sota/lib/calculators/sota-calculators-index.ts`
- `scripts/audit-docs-strategy.ts`
- `scripts/plan-corte8-docs-strategy.ts`

## Docs Mantidos Fora

- `incubator/education-sota/docs/strategy/CONTENT-CREATION-STRATEGY-SOTA.md`
- `incubator/education-sota/docs/strategy/EXECUTIVE-STRATEGY-SUMMARY.md`
- `incubator/education-sota/docs/strategy/MEDICAL-EDUCATION-SOTA-SYSTEM.md`
- `incubator/education-sota/docs/strategy/ONTOLOGIAS-QUESTOES-MEDICAS.md`
- `docs/OVER_SOTA_MEDICAL_LOCALIZATION.md`
- `incubator/education-sota/docs/strategy/SIMPLE-CONTENT-STRATEGY.md`
- `incubator/education-sota/docs/strategy/SIMPLIFIED-CONTENT-STRATEGY.md`
- `incubator/education-sota/docs/strategy/SISTEMA-QUESTOES-MEDICAS-PROTOTIPO.md`
- `incubator/education-sota/docs/strategy/SOTA-CALCULATORS-IMPLEMENTATION-SUMMARY.md`
- `incubator/education-sota/docs/strategy/SOTA-MEDICAL-CALCULATORS-PLAN-2025.md`
- `incubator/education-sota/docs/strategy/SOTA-MEDICAL-CALCULATORS-PLAN.md`
- `incubator/education-sota/docs/strategy/UIUX-SOTA-ANALYSIS.md`
- `incubator/education-sota/docs/strategy/UIUX-SOTA-METRICS.md`
- `incubator/education-sota/lib/design-system/UIUX-INNOVATION-GOALS.md`

## Proxima Promocao Possivel

Criar um conjunto novo de docs clinicos 2026, com linguagem cautelosa, escopo medico, evidencia explicita e separacao clara entre produto principal, incubadora educacional e ideias historicas.
