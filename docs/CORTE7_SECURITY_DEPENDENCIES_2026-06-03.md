# Corte 7 - Security Dependencies - 2026-06-03

## Decisao

Executar o corte dedicado de seguranca de dependencias no app raiz.

O app raiz tinha vulnerabilidades reais, incluindo `jspdf` critical com correcao semver-major. A remediacao foi separada do corte de organizacao e aplicada via upgrades explicitos, lockfile refresh e override controlado de `postcss`.

## Evidencia Atual

Comandos:

```bash
npm audit --json
npm run audit:security-deps -- --format=summary
```

Resumo atual:

```text
total vulnerabilities: 0
critical: 0
high: 0
moderate: 0
direct packages: 0
semver-major fixes: 0
```

Pacotes diretos relevantes:

- `jspdf@4.2.1`, semver-major aplicado, superficie PDF export.
- `next@16.2.7`, superficie App Router/static export.
- `next-intl@4.13.0`, superficie i18n/routing.
- `dompurify@3.4.8`, superficie sanitizacao HTML.
- `postcss@8.5.15`, superficie CSS/tooling.
- `overrides.postcss="$postcss"`, para deduplicar `next` para a versao corrigida.

## Contrato De Staging

`scripts/plan-corte7-security-deps.ts` deve retornar:

```text
stageable dependency upgrade paths: 2
safe to run audit fix automatically: false
```

Somente artefatos do corte de seguranca podem ser staged nesta rodada:

- `docs/SECURITY_DEPENDENCY_AUDIT_2026-06-03.md`
- `docs/CORTE7_SECURITY_DEPENDENCIES_2026-06-03.md`
- `package.json`
- `package-lock.json`
- `scripts/audit-security-dependencies.ts`
- `scripts/plan-corte7-security-deps.ts`

## Gates Do Corte

1. `npm audit --json`
2. `npm run audit:security-deps -- --format=summary`
3. `npm run plan:corte7 -- --format=summary`
4. Smoke de import/geracao basica com `jspdf@4.2.1`.
5. `npm run type-check`, `npm run lint`, `npm run verify`, `npm run build`.
