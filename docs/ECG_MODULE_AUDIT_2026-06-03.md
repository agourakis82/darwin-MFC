# ECG Module Audit - 2026-06-03

## Escopo

Auditoria do modulo ECG incubado:

- `lib/data/ecg/`
- `lib/services/ecg-clinical-support.ts`
- `lib/types/ecg.ts`
- `app/components/ECG/ClinicalSupport/ECGReferralGuide.tsx`

Comando:

```bash
npm run audit:ecg
```

## Resultado Executivo

O modulo ECG compila no type-check raiz e tem uma base clinica estruturada. Ele ainda deve ficar como corte separado antes de exposicao publica, porque precisa de testes unitarios formais, revisao de claims/citacoes e decisao de rota/entrada UI.

## Inventario

| Area | Contagem |
| --- | ---: |
| Padroes ECG | 36 |
| Padroes de emergencia | 10 |
| Red flags | 19 |
| Criterios de encaminhamento | 31 |
| Algoritmos de triagem | 6 |
| Arvores de decisao | 3 |
| Protocolos por contexto | 4 |

Duplicatas detectadas:

- Padroes: 0
- Red flags: 0
- Criterios de encaminhamento: 0

Cobertura:

- Padroes com referencias: 36/36
- Padroes com tags: 21/36
- Red flags com acoes imediatas: 19/19
- Criterios de encaminhamento com tags: 31/31

## Smoke Tests Clinicos

### ECG normal em APS

- `analysis.classification`: `normal`
- `urgency.level`: 1
- `referral.shouldRefer`: `false`
- `actionPlan.followUp`: 1

### IAMCSST em emergencia

- `analysis.classification`: `emergencia`
- `urgency.level`: 4
- `referral.shouldRefer`: `true`
- `referral.recommendation`: `emergency`
- `referral.destination`: `hemodinamica`
- `referral.timeframe`: `imediato`

### QTc prolongado em APS

- `analysis.classification`: `emergencia`
- `urgency.level`: 4
- `referral.shouldRefer`: `true`
- `referral.recommendation`: `priority`
- `referral.destination`: `cardiologia`
- `referral.timeframe`: `24h`

### STEMI em texto livre

- `name`: `text-stemi-emergency`
- `referral.shouldRefer`: `true`
- `referral.recommendation`: `emergency`
- `referral.destination`: `hemodinamica`
- `referral.timeframe`: `imediato`

## Achados

### ECG-1. O modulo e tecnicamente importavel

`npm run type-check` passa com o modulo ECG incluido no escopo raiz. Isso diferencia ECG dos blocos educacionais excluidos do `tsconfig`.

### ECG-2. O smoke test identifica emergencia e encaminhamento

O caso IAMCSST aciona red flags, classifica urgencia 4 e sugere hemodinamica imediata quando o achado usa tags do contrato atual (`iamcsst`, `supradesnivel-st`).

### ECG-3. Normalizacao minima de terminologia resolvida

O primeiro smoke test com `STEMI` em texto livre nao acionava `suggestReferral`; isso foi corrigido em `lib/data/ecg/clinical-support/referral-criteria.ts` com normalizacao ASCII, comparacao bidirecional e aliases para:

- `STEMI`
- `IAMCSST`
- `supra de ST`
- `supradesnivel de ST`
- `supradesnivelamento ST`
- `IAM com supra`

O gate `npm run audit:ecg` agora inclui o cenario `text-stemi-emergency` e valida encaminhamento emergencial para hemodinamica.

### ECG-4. UI existe, mas nao ha rota/entrada publica auditada

`ECGReferralGuide` existe como componente client-side, mas o modulo ainda nao tem uma superficie de produto revisada no app principal.

Recomendacao: criar rota/entrada clinica somente depois dos testes de servico e disclaimers.

## Bloqueios Para Promocao

1. Criar testes unitarios para:
   - `identifyRedFlags`
   - `classifyUrgency`
   - `suggestReferral`
   - `generateActionPlan`
2. Revisar claims e referencias por padrao/red flag.
3. Adicionar disclaimers de emergencia e nao substituicao de julgamento clinico na superficie UI final.
4. Definir a rota/entrada UI e validar no browser.

## Status De Staging

Nao incluir nos Cortes 1, 2 ou 3. Promover como Corte 4, com gate proprio:

```bash
npm run audit:ecg
npm run type-check
npm run lint
npm run build
```
