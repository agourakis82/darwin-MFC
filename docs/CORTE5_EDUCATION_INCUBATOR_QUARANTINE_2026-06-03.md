# Corte 5 - Education/SOTA Incubator Quarantine - 2026-06-03

## Decisao

Nao promover a frente Education/SOTA ao app clinico Darwin-MFC nesta rodada.

O app principal foi reenquadrado como ferramenta medica clinica. A frente de calculadoras agora segue o contrato **Inteligencia Clinica 2026**: metadados de evidencia, uso clinico explicito, disclaimer, indisponibilidade segura quando backend real nao estiver configurado e ausencia de mock clinico.

## Por Que Fica Fora

- A superficie `learn/diagnosis` e orientada a adaptive learning, LMS, residencia/ENAMED e banco de questoes.
- O codigo ainda contem token demo local.
- A rota `learn/diagnosis` e os componentes/libs SOTA foram arquivados em `incubator/education-sota/`, fora do App Router e fora dos namespaces principais `app/` e `lib/`.
- O contrato SOTA usa origens separadas para API e WebSocket.
- Ha claims promocionais que precisam ser rebaixados para linguagem experimental/incubadora antes de qualquer exposicao.
- O pacote separado foi arquivado em `incubator/education-sota/packages/medical-education-sota/` e nao participa do build raiz.

## Contrato De Staging

`scripts/plan-corte5-education-incubator.ts` deve retornar:

```text
stageable clinical paths: 0
safe to promote to clinical app: false
static export contamination risk: false
```

Somente estes artefatos de quarentena podem ser staged junto ao trabalho de organizacao:

- `docs/CORTE5_EDUCATION_INCUBATOR_QUARANTINE_2026-06-03.md`
- `docs/EDUCATION_INCUBATOR_AUDIT_2026-06-03.md`
- `package.json`
- `incubator/education-sota/`
- `scripts/audit-education-incubator.ts`
- `scripts/plan-corte5-education-incubator.ts`

## Gates Para Reabrir

1. Decidir se a frente sera produto separado, incubadora arquivada ou descarte.
2. Remover tokens demo e mocks.
3. Reescrever claims como experimental, prototipo ou em validacao.
4. Se integrar ao app clinico, usar origem unica de backend/proxy para API + WebSocket.
5. Corrigir navegacao locale-aware.
6. Rodar lint, type-check e build do pacote separado.
