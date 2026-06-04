# Corte 4 ECG Pathspec - 2026-06-03

## Objetivo

Preparar o quarto corte de staging para o modulo ECG clinico. Este corte inclui dados, tipos, servico e componente de suporte ECG, mais o auditor especifico do modulo. Education/SOTA, expansoes de conteudo e docs estrategicas antigas continuam fora.

Comando reprodutivel:

```bash
npx tsx scripts/plan-corte4-ecg.ts --format=summary
```

Resultado esperado antes do staging:

```text
ecg changes: 18
candidate paths: 18
uncovered ecg changes: 0
index already staged: 106
safe to stage as Corte 4: true
```

## Pathspec Atual

```text
app/components/ECG/ClinicalSupport/ECGReferralGuide.tsx
docs/CORTE4_ECG_PATHSPEC_2026-06-03.md
docs/ECG_MODULE_AUDIT_2026-06-03.md
lib/data/ecg/clinical-support/interpretation-checklist.ts
lib/data/ecg/clinical-support/protocols-by-setting.ts
lib/data/ecg/clinical-support/red-flags.ts
lib/data/ecg/clinical-support/referral-criteria.ts
lib/data/ecg/clinical-support/triage-algorithms.ts
lib/data/ecg/index.ts
lib/data/ecg/patterns/arritmias-supraventriculares.ts
lib/data/ecg/patterns/arritmias-ventriculares.ts
lib/data/ecg/patterns/bloqueios-conducao.ts
lib/data/ecg/patterns/isquemia-infarto.ts
lib/data/ecg/patterns/ritmos-normais.ts
lib/services/ecg-clinical-support.ts
lib/types/ecg.ts
scripts/audit-ecg-module.ts
scripts/plan-corte4-ecg.ts
```

## Gates

```bash
npm run audit:ecg
npx tsx scripts/plan-corte4-ecg.ts --format=summary
npm run type-check
npm run lint -- --quiet
git diff --cached --check
```

## Estado Validado

- Padroes ECG: 36
- Padroes de emergencia: 10
- Red flags: 19
- Criterios de encaminhamento: 31
- Algoritmos de triagem: 6
- Arvores de decisao: 3
- Protocolos por contexto: 4
- Duplicatas de IDs: 0
- `STEMI` em texto livre: emergencia, hemodinamica, imediato
- total staged apos Corte 4: 106 arquivos

## Exclusoes Confirmadas

Continuam fora do Corte 4:

- `/learn/diagnosis`
- `app/components/SOTA`
- `lib/api/sota-*`
- `incubator/education-sota/packages/medical-education-sota/`
- expansoes massivas de doencas/medicamentos
- docs SOTA antigas e docs estrategicas nao operacionais
- demos HTML/JSON/imagens
