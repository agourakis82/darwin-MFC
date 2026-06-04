# Education/SOTA Incubator Audit - 2026-06-03

## Escopo

Auditoria do dominio `education-sota-incubator`, cobrindo a rota `learn/diagnosis`, componentes SOTA, clientes API/WebSocket, store Zustand, motores educacionais locais, pacote separado `medical-education-sota/`, demos e scripts de geracao de questoes.

Comando reprodutivel:

```bash
npm run audit:education-incubator -- --format=summary
```

## Resultado Atual

```text
changed files: 54
source files: 53
route files: 2
package manifests: 3
promotional claim hits: 292
separate package present: true
excluded from root type-check: true
root package depends on incubator workspace: false
static export compatible by default: true
single API/WS origin: false
has mock token in app route: true
unlocalized adaptive route push: true
unlocalized learn link: true
route physically present in App Router: false
route archived outside App Router: true
participates in local static export when present: false
manifest incubator/education-sota/packages/medical-education-sota/package.json: exists=true duplicateKeys=none
manifest incubator/education-sota/packages/medical-education-sota/backend/package.json: exists=true duplicateKeys=redis
manifest incubator/education-sota/packages/medical-education-sota/frontend/package.json: exists=true duplicateKeys=none
```

## Conclusao

Este bloco deve permanecer como **incubadora educacional/produto separado** no Corte 5. Ele nao deve ser misturado com o app medico clinico nem com o Corte 2 de Inteligencia Clinica 2026 para calculadoras.

O app principal Darwin-MFC pode conviver com o codigo porque a integracao SOTA fica desativada por padrao (`NEXT_PUBLIC_SOTA_ENABLED === 'true'`) e os pacotes/motores mais incompletos estao fora do `type-check` raiz. Isso e aceitavel para organizacao temporaria, mas nao e suficiente para publicacao clinica.

## Achados

### P0 - Nao promover ao app medico clinico

O dominio e explicitamente educacional: adaptive learning, diagnostico de lacunas, preparacao para residencia/ENAMED, LMS, banco de questoes e analytics de aprendizagem. Isso conflita com a decisao de produto atual: Darwin-MFC como app medico clinico, com primeiro alvo em calculadoras clinicas.

Decisao: manter fora do Corte 1, Corte 2 e de qualquer staging clinico. O Corte 5 documenta a quarentena, nao promove esses arquivos ao app medico.

### P1 - Rota do app principal usa mock token

`incubator/education-sota/app-routes/learn-diagnosis/DiagnosisClient.tsx` ainda contem `demo-darwin-token`. Isso e correto apenas para prototipo local. Nao deve ir para producao nem para qualquer fluxo que sugira autenticacao real.

A rota e os componentes/libs SOTA do app raiz foram movidos para `incubator/education-sota/`, fora do App Router e fora dos namespaces principais `app/` e `lib/`. Isso preserva o prototipo para decisao futura sem inclui-lo no static export local.

Gate antes de exposicao:

- remover token demo;
- definir auth via backend/proxy externo;
- tratar estado indisponivel sem backend como experiencia final, nao como erro acidental.
- manter a rota fora de `app/` ate decisao explicita de produto;
- se reativada, transforma-la em pagina indisponivel sem backend real, nunca com token demo.

### P1 - Contrato API/WebSocket diverge do padrao clinico 2026

A incubadora usa:

- `NEXT_PUBLIC_SOTA_API_URL`
- `NEXT_PUBLIC_SOTA_WS_URL`
- defaults separados: `http://localhost:8000` e `ws://localhost:8002`

Para o app clinico 2026, a decisao desejada e origem/porta unica para API + WebSocket em backend/proxy externo. A incubadora pode manter contrato proprio, mas nao deve contaminar `clinical-intelligence`.

### P1 - Claims promocionais precisam downgrade

O auditor encontrou 292 ocorrencias de linguagem SOTA/promocional ou nao validada. Exemplos de categorias:

- "implementacao mais avancada"
- "revolucionar"
- GPT-4/GPT-5/Claude-4 como capacidade assumida
- blockchain, VR/AR, federated learning
- conformidade LGPD/GDPR total
- validacao medica automatica

Antes de qualquer publicacao externa, reescrever como: experimental, incubadora, prototipo, em validacao, dependente de backend e revisao especialista.

### P2 - Rotas sem locale na client navigation

`DiagnosisClient.tsx` contem:

- `router.push('/learn/adaptive')`
- `href="/learn"`

Como a app principal usa rotas prefixadas por locale, isso precisa usar os wrappers de `@/i18n/routing` ou construir caminho locale-aware antes de exposicao.

### P2 - Backend package tem chave duplicada

`incubator/education-sota/packages/medical-education-sota/backend/package.json` declara `redis` duas vezes em `dependencies`. JSON parse aceita o ultimo valor, mas isso e ruido de manifest e deve ser limpo antes de tratar o pacote como buildavel.

### P2 - Frontend separado esta defasado em relacao ao app raiz

`incubator/education-sota/packages/medical-education-sota/frontend/package.json` usa Next 14/React 18 e `next lint`, enquanto o app raiz esta em Next 16/React 19 com ESLint CLI. Isso reforca que o pacote e produto separado/incubadora, nao parte do build principal.

## Fronteiras Saudaveis

Manter:

- `incubator/education-sota/` excluido do type-check raiz enquanto for prototipo;
- `incubator/education-sota/packages/medical-education-sota/` como pacote separado arquivado;
- SOTA educacional fora da navegacao principal clinica;
- docs SOTA antigas fora de publicacao ate revisao de claims.

Nao misturar:

- calculadoras clinicas 2026;
- ECG clinico;
- expansoes massivas de doencas/medicamentos;
- backend/proxy clinico futuro.

## Gates Para Promocao Futura

Antes de promover qualquer parte da incubadora:

1. Decidir produto: separado, pacote incubado, arquivo historico ou descarte.
2. Remover mocks e demo tokens.
3. Reescrever claims com linguagem cautelosa.
4. Unificar contrato API/WS se for integrar ao app clinico.
5. Resolver rotas locale-aware.
6. Rodar build/test/lint do pacote separado.
7. Adicionar docs de risco, privacidade e revisao humana.

## Artefatos

- Script: `scripts/audit-education-incubator.ts`
- Comando: `npm run audit:education-incubator`
- Arquivos incubados: `incubator/education-sota/`
- Planejador de quarentena: `scripts/plan-corte5-education-incubator.ts`
- Corte recomendado: `Corte 5 - Educacao/SOTA Incubator quarantine`
