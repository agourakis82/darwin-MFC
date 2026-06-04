# Content Expansion Audit - 2026-06-03

## Escopo

Auditoria das expansoes nao rastreadas:

- `incubator/content-expansion/doencas/expansao-800/`
- `incubator/content-expansion/medicamentos/expansao-1000/`

Comando:

```bash
npm run audit:content-expansions -- --format=summary
```

## Resultado Executivo

As expansoes somam 725 itens, mas ainda devem ficar fora do staging principal e fora dos indices consolidados ate passarem por deduplicacao, revisao de citacoes e validacao clinica.

Elas nao sao importadas pelos indices principais atuais:

- `diseaseExpansionImportedByMainIndex`: `false`
- `medicationExpansionImportedByMainIndex`: `false`

Mesmo assim ha sobreposicao de IDs com o indice principal:

- Doencas: 44 IDs sobrepostos.
- Medicamentos: 87 IDs sobrepostos.

## Resumo Quantitativo

| Colecao | Total | IDs Unicos | IDs Duplicados | Sobreposicao Com Indice Principal | Itens Com Campos Obrigatorios Ausentes | Cobertura De Citacao |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Doencas expansao-800 | 321 | 306 | 15 | 44 | 30 | 91% |
| Medicamentos expansao-1000 | 404 | 390 | 14 | 87 | 0 | 0% |
| Total | 725 | 696 aprox. | 29 | 131 | 30 | 291/725 com citacao detectada |

## Achados

### E1. As expansoes nao estao conectadas aos indices principais

`lib/data/doencas/index.ts` nao importa `expansao-800`.
`lib/data/medicamentos/index.ts` nao importa `expansao-1000`.

Isso e bom para seguranca de publicacao: a massa nova esta incubada, nao exposta diretamente pelo app consolidado.

### E2. Ha duplicatas internas e sobreposicao com dados existentes

IDs duplicados amostrados:

```text
abatacepte
belimumabe
catarata-senil
ceratocone
certolizumabe-pegol
chikungunya
cirrose-hepatica
colangite-biliar-primaria
darbepoetina-alfa
demencia-corpos-lewy
doravirina
eltrombopag
esclerose-sistemica
febre-amarela
filariose-linfatica
fostemsavir
golimumabe
hanseniase
hepatite-autoimune
ibalizumab
idarucizumab
ixequizumabe
leptospirose
nusinersen
ovcr
```

Antes de integrar, definir politica:

- substituir item antigo;
- manter item antigo e descartar duplicata;
- mesclar campos;
- renomear IDs apenas quando houver entidade realmente distinta.

### E3. Doencas tem boa cobertura de citacao, mas ainda ha lacunas de schema

Doencas expansao-800:

- 321 itens.
- 30 itens com campos obrigatorios ausentes.
- 291 com alguma citacao detectada.
- Ontologias:
  - DOID: 318
  - SNOMED CT: 321
  - MeSH: 321
  - UMLS CUI: 177
  - CID-11: 221
  - HPO: 10

### E4. Medicamentos tem campos minimos, mas citacao detectada e zero

Medicamentos expansao-1000:

- 404 itens.
- 0 itens com campos minimos ausentes segundo a auditoria.
- 0 itens com citacao detectada por `refId`, `pmid` ou `doi`.
- Ontologias/codigos:
  - ATC: 404
  - RxNorm: 376
  - DrugBank: 377
  - SNOMED CT: 361
  - CAS: 224

Para um app medico clinico, essa expansao nao deve ser exposta sem referencias rastreaveis por medicamento ou por modulo.

## Recomendacao

Nao incluir `content-expansion` nos Cortes 1, 2 ou em qualquer staging clinico principal desta rodada. O Corte 6 documenta a quarentena e nao promove esses dados aos indices consolidados.

Promover em corte proprio somente depois de:

1. Corrigir os 30 itens de doenca com campos obrigatorios ausentes.
2. Resolver os 29 IDs duplicados internos.
3. Resolver os 131 overlaps com os indices principais.
4. Adicionar citacoes rastreaveis aos medicamentos ou mapear citacoes por modulo com granularidade aceitavel.
5. Criar um gate que falha se houver duplicata, campo obrigatorio ausente, ou cobertura de citacao abaixo do minimo definido.

## Gate Atual

O script atual e auditoria informativa, nao gate bloqueante. Ele deve virar gate antes da integracao:

```bash
npm run audit:content-expansions -- --format=summary
npm run plan:corte6 -- --format=summary
```

O planejador de quarentena deve manter:

```text
stageable clinical data paths: 0
safe to promote to main indexes: false
```
