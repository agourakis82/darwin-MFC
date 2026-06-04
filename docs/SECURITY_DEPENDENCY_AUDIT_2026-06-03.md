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
total vulnerabilities: 10
critical: 1
high: 3
moderate: 6
direct packages: 5
semver-major fixes: 1
run audit fix automatically: false
critical jspdf              direct=true  current=3.0.4 fix=semver_major -> 4.2.1
high     next               direct=true  current=16.1.1 fix=available
high     minimatch          direct=false current=10.2.5 fix=available
high     picomatch          direct=false current=2.3.1 fix=available
moderate dompurify          direct=true  current=3.3.1 fix=available
moderate next-intl          direct=true  current=4.6.1 fix=available
moderate postcss            direct=true  current=8.5.6 fix=available
moderate brace-expansion    direct=false current=2.0.2 fix=available
moderate styled-components  direct=false current=6.3.6 fix=available
moderate ws                 direct=false current=8.18.3 fix=available
```

Versoes mais recentes consultadas via `npm view` em 2026-06-03:

```text
next 16.2.7
jspdf 4.2.1
dompurify 3.4.7
next-intl 4.13.0
postcss 8.5.15
ws 8.21.0
```

## Conclusao

Nao aplicar `npm audit fix` automaticamente. O pacote mais critico, `jspdf`, exige upgrade major para `4.2.1` e e usado em exportacao PDF client-side. `next` e `next-intl` tambem afetam o contrato de static export/i18n e precisam de gate completo.

Tratar como **Corte 7 - Segurança De Dependencias**, separado dos cortes de tooling, calculadoras, educacao, ECG, conteudo e agent-config.

## Achados

### P0 - `jspdf` critical, upgrade major obrigatorio

Pacote direto:

- atual: `jspdf@3.0.4`
- fix: `jspdf@4.2.1`
- tipo: semver major
- superficie: `lib/export/pdf.ts`

Risco reportado pelo audit:

- path traversal/local file inclusion;
- PDF injection / JavaScript execution em caminhos AcroForm/addJS;
- DoS por dimensoes maliciosas em imagens;
- HTML injection em caminhos de nova janela.

Gate antes de commit:

- revisar API de `jsPDF` entre 3.x e 4.x;
- smoke test de exportacao PDF de protocolos/casos/notas se houver UI acessivel;
- `npm run type-check`;
- `npm run lint`;
- `npm run verify`;
- `npm run build`.

### P1 - `next` high, atualizar com static export gate completo

Pacote direto:

- atual: `next@16.1.1`
- mais recente consultado: `16.2.7`
- superficie: `next.config.ts`, App Router, SSG/static export

Observacao importante: varios advisories de `next` envolvem middleware/proxy, server actions, image optimizer, RSC e self-hosted runtime. O app principal usa `output: "export"` e removeu `middleware.ts`, reduzindo parte da exposicao runtime. Ainda assim, o pacote e direto e o audit permanece falhando.

Gate antes de commit:

- confirmar que `output: "export"` continua ativo;
- confirmar que `middleware.ts` nao retorna ao runtime;
- `npm run build` com SSG completo;
- smoke de `/`, `/pt`, `/pt/calculadoras`, `/pt/learn`;
- `npm run dev` sem warning de middleware/export e sem warning de Turbopack root.

### P1 - `dompurify` moderate, runtime XSS-sensitive

Pacote direto:

- atual: `dompurify@3.3.1`
- mais recente consultado: `3.4.7`
- superficie: `app/[locale]/learn/paths/[pathId]/modules/[moduleId]/ModulePlayerClient.tsx`

O uso atual sanitiza HTML vindo de strings i18n antes de `dangerouslySetInnerHTML`. Atualizar e rodar smoke de modulo de aprendizagem que usa modal de conclusao.

### P1 - `next-intl` moderate, i18n/routing

Pacote direto:

- atual: `next-intl@4.6.1`
- mais recente consultado: `4.13.0`
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

- `postcss@8.5.6` direto/dev e tambem transitive por `next`/`styled-components`;
- `styled-components@6.3.6` transitive via `postcss`;
- `picomatch@2.3.1` transitive/tooling;
- `minimatch` em arvores Jest/test tooling;
- `brace-expansion` em arvores de glob/test tooling;
- `ws@8.18.3` transitive/runtime indireto, tambem ha SOTA WebSocket incubado fora do core.

Provavelmente serao resolvidos por atualizacoes diretas de `next`, `postcss`, `dompurify`, `next-intl`, `jspdf` e refresh do lockfile. Validar com novo `npm audit`.

## Plano De Correcao Recomendado

1. Criar branch/corte proprio para seguranca.
2. Atualizar primeiro pacotes diretos sem major quando seguro:
   - `next`
   - `next-intl`
   - `dompurify`
   - `postcss`
3. Rodar gates completos.
4. Atualizar `jspdf` major em commit separado dentro do corte, com smoke PDF.
5. Rodar `npm audit --json` novamente.
6. Se restarem vulnerabilidades transitive, resolver via lockfile/parent packages, sem `audit fix --force` cego.

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
