# Docs Strategy Audit - 2026-06-03

## Escopo

Auditoria de documentos estrategicos, SOTA, UI/UX, educacao medica e planos historicos que nao devem ser tratados como documentacao primaria do app clinico Darwin-MFC.

Comando:

```bash
npm run audit:docs-strategy -- --format=summary
```

## Resultado Atual

```text
strategy docs: 15
changed strategy docs: 16
claim hits: 284
changed claim hits: 279
stageable primary product docs: 0
promote to primary clinical docs: false
```

Os documentos auditados foram arquivados em `incubator/education-sota/docs/strategy/` e incluem planos SOTA de calculadoras 2025, estrategias de educacao medica, UI/UX SOTA, prototipos de questoes e goals de design revolucionario.

## Achados

### D1 - Framing desalinhado com o produto atual

Varios documentos descrevem Darwin-MFC como sistema educacional, LMS, preparacao ENAMED/residencia ou plataforma SOTA. A decisao atual e tratar Darwin-MFC como app medico clinico, com Education/SOTA separado como incubadora.

### D2 - Claims fortes sem gate clinico

Ha linguagem de marketing e claims nao validados:

- SOTA/state-of-the-art;
- lider mundial;
- revolucionario;
- VR/AR;
- blockchain;
- GPT/Claude como capacidade assumida;
- conformidade LGPD/GDPR ampla;
- metas financeiras e ARR;
- calculadoras 2025 ja superadas pelo contrato Clinical Intelligence 2026.

### D3 - Documentos de calculadoras 2025 foram supersedidos

Os documentos `SOTA-MEDICAL-CALCULATORS-*` e `SOTA-CALCULATORS-IMPLEMENTATION-SUMMARY.md` nao devem ser usados como fonte primaria. A fonte atual e:

- `docs/CLINICAL_INTELLIGENCE_AUDIT_2026-06-03.md`
- `docs/CORTE2_CLINICAL_INTELLIGENCE_PATHSPEC_2026-06-03.md`

## Decisao

Nao promover esses documentos para a documentacao primaria do produto clinico. Manter como historico/incubadora ate reescrita cautelosa.

## Gates Para Reabrir

1. Separar docs historicos/incubadora de docs clinicos publicaveis.
2. Reescrever claims como experimental, prototipo, em validacao ou historico.
3. Remover linguagem educacional da experiencia principal do app clinico.
4. Atualizar planos de calculadoras para 2026, evidencia explicita e backend seguro.
5. Evitar metas comerciais ou promessas tecnicas nao implementadas como documentacao de produto.
