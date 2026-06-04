# Corte 6 - Content Expansion Quarantine - 2026-06-03

## Decisao

Nao promover `expansao-800` e `expansao-1000` aos indices clinicos principais nesta rodada.

Essas colecoes sao valiosas como massa de trabalho, mas ainda nao cumprem o contrato de publicacao do Darwin-MFC como app medico clinico: identificadores sem conflito, campos obrigatorios completos, referencias rastreaveis e revisao clinica antes de exposicao.

## Evidencia Atual

Comando:

```bash
npm run audit:content-expansions -- --format=summary
```

Resultado esperado nesta rodada:

```text
total expansion items: 725
total duplicate ids: 29
total missing required items: 30
total without any citation: 434
disease expansion imported: false
medication expansion imported: false
disease overlap with main index: 44
medication overlap with main index: 87
```

## Contrato De Staging

`scripts/plan-corte6-content-expansion.ts` deve retornar:

```text
stageable clinical data paths: 0
safe to promote to main indexes: false
```

Somente artefatos de auditoria/quarentena podem ser staged:

- `docs/CONTENT_EXPANSION_AUDIT_2026-06-03.md`
- `docs/CORTE6_CONTENT_EXPANSION_QUARANTINE_2026-06-03.md`
- `scripts/audit-content-expansions.ts`
- `scripts/plan-corte6-content-expansion.ts`

## Gates Para Promocao Futura

1. Resolver os 29 IDs duplicados internos.
2. Resolver os 131 overlaps com os indices principais.
3. Corrigir os 30 itens de doenca com campos obrigatorios ausentes.
4. Adicionar citacoes rastreaveis para medicamentos ou justificar citacoes por modulo com granularidade revisavel.
5. Criar um gate bloqueante que falhe em duplicata, campo obrigatorio ausente ou cobertura de citacao abaixo do minimo.
6. Integrar em corte proprio, com diff revisavel e sem misturar com Education/SOTA ou calculators.
