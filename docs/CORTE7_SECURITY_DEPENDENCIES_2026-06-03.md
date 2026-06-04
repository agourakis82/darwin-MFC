# Corte 7 - Security Dependencies - 2026-06-03

## Decisao

Nao rodar `npm audit fix` automaticamente dentro do corte de organizacao.

O app raiz tem vulnerabilidades reais, incluindo `jspdf` critical com correcao semver-major. A remediacao deve ser um corte dedicado de upgrade de dependencias com smoke tests de PDF, i18n e static export.

## Evidencia Atual

Comandos:

```bash
npm audit --json
npm run audit:security-deps -- --format=summary
```

Resumo atual:

```text
total vulnerabilities: 10
critical: 1
high: 3
moderate: 6
direct packages: 5
semver-major fixes: 1
```

Pacotes diretos relevantes:

- `jspdf@3.0.4`, fix `4.2.1`, semver-major, superficie PDF export.
- `next@16.1.1`, latest `16.2.7`, superficie App Router/static export.
- `next-intl@4.6.1`, latest `4.13.0`, superficie i18n/routing.
- `dompurify@3.3.1`, latest `3.4.7`, superficie sanitizacao HTML.
- `postcss@8.5.6`, latest `8.5.15`, superficie CSS/tooling.

## Contrato De Staging

`scripts/plan-corte7-security-deps.ts` deve retornar:

```text
stageable dependency upgrade paths: 0
safe to run audit fix automatically: false
```

Somente artefatos de auditoria/plano podem ser staged nesta rodada:

- `docs/SECURITY_DEPENDENCY_AUDIT_2026-06-03.md`
- `docs/CORTE7_SECURITY_DEPENDENCIES_2026-06-03.md`
- `package.json`
- `scripts/audit-security-dependencies.ts`
- `scripts/plan-corte7-security-deps.ts`

## Gates Para Correcao Futura

1. Atualizar pacotes diretos nao-major primeiro: `next`, `next-intl`, `dompurify`, `postcss`.
2. Rodar `npm run type-check`, `npm run lint`, `npm run verify`, `npm run build`.
3. Atualizar `jspdf` major em commit separado, com smoke de exportacao PDF.
4. Rodar smoke de `/pt/calculadoras`, `/pt/learn`, rota de modulo de aprendizagem e troca de locale.
5. Rodar `npm audit --json` novamente e documentar vulnerabilidades restantes.
