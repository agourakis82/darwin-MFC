# PS Vertical Changelog

## Scope

Pronto-socorro operacional (`app/[locale]/ps`) com foco em:
- case session persistente
- protocol runner
- safety timeline
- handoff/debrief
- drug sheet
- PCR role board

## Main product changes

- O PS deixou de operar como catálogo puro e passou a ter `active case session`.
- Protocolos sentinela (`PCR`, `sepse`, `IOT/RSI`) agora mantêm estado, passo ativo, pendências e timeline.
- `Drug sheet` virou overlay contextual com peso, pressupostos, revisão e confirmação.
- `Stop points` e `situational awareness` foram incorporados ao runner.
- `Handoff` passou a ter:
  - resumo clínico
  - export estruturado
  - nota clínica
  - import validado com preview
- `Debrief` foi ligado ao caso ativo real.
- `PCR role board` ganhou atribuição nominal persistida.

## Architecture changes

- contratos compartilhados em `lib/ps/contracts.ts`
- eventos do caso em `lib/ps/protocolCaseEvents.ts`
- overlay/copy helpers em `lib/ps/protocolOverlayActions.ts`
- runtime derivado em `lib/ps/protocolRuntime.ts`
- runtime do runner em `lib/ps/useProtocolRuntimeModel.ts`
- controller de import em `lib/ps/useHandoffImportController.ts`
- controller de export em `lib/ps/useHandoffExportController.ts`

## Testing changes

- smoke principal da vertical PS cobre:
  - dashboard
  - PCR
  - sepse
  - IOT
  - handoff import
  - debrief
  - role assignment
- `PSDrugSheet` tem e2e dedicada

## Validation status

- `pnpm type-check`: green
- `pnpm test:e2e -- tests/e2e/ps-runner-smoke.spec.ts`: green
- `pnpm test:e2e -- tests/e2e/ps-runner-smoke.spec.ts tests/e2e/ps-drug-sheet.spec.ts`: green

## Residual risks

- `PSHandoffPanel` ainda concentra bastante densidade informacional em uma única superfície
- import/export ainda dependem de schema local, sem adapter externo bidirecional completo
- controllers de handoff podem ser consolidados mais adiante
