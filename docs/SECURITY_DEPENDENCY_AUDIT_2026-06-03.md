# Security Dependency Audit - 2026-06-03

## Escopo

Auditoria de vulnerabilidades reportadas por `npm audit` no app raiz Darwin-MFC. Este documento cobre dependencias do projeto principal, nao o pacote separado arquivado em `incubator/education-sota/packages/medical-education-sota/`.

Comandos reprodutiveis:

```bash
npm audit --json
npm run audit:security-deps -- --format=summary
```

## Resultado Atual

```text
total vulnerabilities: 0
critical: 0
high: 0
moderate: 0
direct packages: 0
semver-major fixes: 0
run audit fix automatically: false
```

Remediacao aplicada em 2026-06-04:

```text
next        16.2.7
jspdf       4.2.1
dompurify   3.4.8
next-intl   4.13.0
postcss     8.5.15
```

`package.json` tambem fixa `overrides.postcss="$postcss"` para deduplicar o `postcss` transitivo de `next` para a versao raiz corrigida. `npm ls postcss --all` confirmou `next@16.2.7 -> postcss@8.5.15 deduped`.

## Conclusao

O corte de seguranca de dependencias foi aplicado no app raiz. `npm audit --json` e `npm run audit:security-deps -- --format=summary` reportam zero vulnerabilidades.

Continuar sem `npm audit fix --force`: antes da correcao, o npm sugeria downgrade inseguro/inadequado de `next`. O caminho adotado foi upgrade explicito de dependencias diretas, refresh de lockfile e override controlado de `postcss`.

## Achados

### P0 - `jspdf` critical, upgrade major aplicado

Pacote direto:

- anterior: `jspdf@3.0.4`
- atual: `jspdf@4.2.1`
- tipo: semver major
- superficie: `lib/export/pdf.ts`

Risco reportado pelo audit:

- path traversal/local file inclusion;
- PDF injection / JavaScript execution em caminhos AcroForm/addJS;
- DoS por dimensoes maliciosas em imagens;
- HTML injection em caminhos de nova janela.

Gate antes de commit:

- smoke test de exportacao PDF de protocolos/casos/notas se houver UI acessivel;
- `npm run type-check`;
- `npm run lint`;
- `npm run verify`;
- `npm run build`.

### P1 - `next` high, upgrade aplicado com static export gate completo

Pacote direto:

- anterior: `next@16.1.1`
- atual: `next@16.2.7`
- superficie: `next.config.ts`, App Router, SSG/static export

Observacao importante: varios advisories de `next` envolvem middleware/proxy, server actions, image optimizer, RSC e self-hosted runtime. O app principal usa `output: "export"` e removeu `middleware.ts`, reduzindo parte da exposicao runtime. Mesmo assim, o pacote direto foi atualizado para manter o audit limpo e reduzir risco futuro.

Gate antes de commit:

- confirmar que `output: "export"` continua ativo;
- confirmar que `middleware.ts` nao retorna ao runtime;
- `npm run build` com SSG completo;
- smoke de `/`, `/pt`, `/pt/calculadoras`, `/pt/learn`;
- `npm run dev` sem warning de middleware/export e sem warning de Turbopack root.

### P1 - `dompurify` moderate, runtime XSS-sensitive

Pacote direto:

- anterior: `dompurify@3.3.1`
- atual: `dompurify@3.4.8`
- superficie: `app/[locale]/learn/paths/[pathId]/modules/[moduleId]/ModulePlayerClient.tsx`

O uso atual sanitiza HTML vindo de strings i18n antes de `dangerouslySetInnerHTML`. Atualizar e rodar smoke de modulo de aprendizagem que usa modal de conclusao.

### P1 - `next-intl` moderate, i18n/routing

Pacote direto:

- anterior: `next-intl@4.6.1`
- atual: `next-intl@4.13.0`
- superficie: `i18n/routing.ts`, `i18n/request.ts`, layouts App Router

Riscos reportados:

- open redirect;
- prototype pollution via precompile experimental em catalogs controlados por atacante.

Gate antes de commit:

- confirmar que catalogs continuam locais/estaticos;
- smoke de troca/rotas locale;
- build static completo.

### P2 - `postcss`, `styled-components`, `picomatch`, `minimatch`, `brace-expansion`, `ws`

Pacotes misturam tooling, transitive deps e runtime indireto:

- `postcss@8.5.6` era direto/dev e tambem transitive por `next`/`styled-components`;
- `styled-components@6.3.6` transitive via `postcss`;
- `picomatch@2.3.1` transitive/tooling;
- `minimatch` em arvores Jest/test tooling;
- `brace-expansion` em arvores de glob/test tooling;
- `ws@8.18.3` transitive/runtime indireto, tambem ha SOTA WebSocket incubado fora do core.

Foram resolvidos por atualizacoes diretas, refresh do lockfile, `npm audit fix` sem `--force` para transitive tooling e `overrides.postcss="$postcss"`.

## Correcao Aplicada

1. Atualizados `next`, `next-intl`, `dompurify`, `postcss` e `jspdf`.
2. Rodado `npm audit fix` sem `--force` para refresh seguro de dependencias transitive.
3. Adicionado override controlado `postcss: "$postcss"` para impedir regressao para `postcss@8.4.x` transitivo em `next`.
4. Revalidado `npm audit` e `audit:security-deps` com zero vulnerabilidades.

## Gates

```bash
npm run audit:security-deps -- --format=summary
npm run plan:corte7 -- --format=summary
npm run type-check
npm run lint
npm run verify
npm run build
```

Smoke manual/browser recomendado depois dos upgrades:

- exportacao PDF;
- rota `/pt/calculadoras`;
- rota `/pt/learn/paths/aps-essentials/modules/aps-intro`;
- troca de locale/rotas i18n;
- dev server sem middleware/export warning.

## Artefatos

- Script: `scripts/audit-security-dependencies.ts`
- Planejador: `scripts/plan-corte7-security-deps.ts`
- Comando: `npm run audit:security-deps`
- Corte recomendado: `Corte 7 - Segurança De Dependencias`
