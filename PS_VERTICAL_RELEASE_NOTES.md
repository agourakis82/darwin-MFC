# Release Notes: Darwin PS Vertical

## Summary

Esta entrega transforma a vertical de pronto-socorro em um runner operacional de caso agudo, com estado persistente, safety workflow e handoff estruturado.

## Highlights

- `activeCaseSession` persistente para protocolos sentinela
- timeline de segurança ligada ao caso real
- `drug sheet` contextual com revisão e confirmação
- `stop points` e `situational awareness` no runner
- `handoff` em três formatos:
  - clínico
  - estruturado
  - nota clínica
- import de handoff com:
  - validação
  - preview
  - confirmação explícita
  - rascunho salvo na sessão
- `debrief` operacional derivado do caso
- `PCR role board` com nomes persistidos

## Included workflows

- `PCR`
- `Sepse / choque`
- `IOT / RSI`

## Safety impact

- reforço de separação entre `consultado`, `revisado`, `confirmado` e `concluído`
- redução de perda de contexto após interrupção
- melhoria da passagem de caso com schema estruturado

## Validation snapshot

- `pnpm type-check`: green
- `ps-runner-smoke`: green
- `ps-drug-sheet`: green

## Known follow-ups

- consolidar adapters externos de handoff
- última rodada de polish visual transversal
- expandir integração clínica e export institucional
