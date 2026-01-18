# Darwin-MFC Roadmap 2025-2026

**Versão:** 1.0
**Data:** Janeiro 2025
**Status:** Aprovado para Implementação

---

## Visão Estratégica

Transformar o Darwin-MFC na **plataforma líder global** para Medicina de Família e Comunidade, combinando:
- Rigor acadêmico Q1 (Nature/Cell)
- Uso clínico diário prático
- Interoperabilidade internacional
- Código aberto e gratuito

**Contexto de Uso Prioritário:**
1. Acadêmico/Pesquisa - Estudantes, residentes, pesquisadores
2. Clínico Diário - Médicos de família/APS no consultório

---

## Estado Atual (Janeiro 2025)

### Conquistas

| Componente | Status | Quantidade |
|------------|--------|------------|
| Doenças | ✅ Completo | 447+ em 26 categorias |
| Medicamentos | ✅ Completo | 600+ consolidados |
| Calculadoras | ✅ Completo | 26 validadas |
| Casos Clínicos | ✅ Completo | 15 interativos |
| Flowcharts | ✅ Completo | 40 protocolos |
| Idiomas | ✅ Completo | 9 (pt, en, es, fr, ru, ar, zh, el, hi) |
| Rastreamentos | ✅ Completo | 27 (SUS/USPSTF/NHS/NP-NCD/WHO) |
| CIAP-2 | ✅ Completo | 17 capítulos |
| Genograma/Ecomapa | ✅ Implementado | Interativo |
| SOAP Notes | ✅ Básico | NLP para extração |

### Lacunas Identificadas

| Componente | Status | Prioridade |
|------------|--------|------------|
| LOINC (laboratórios) | ❌ Não implementado | 🔥 Alta |
| PharmGKB (farmacogenética) | ❌ Não implementado | 🔥 Alta |
| API REST | ❌ Não implementado | 🔥 Alta |
| FHIR 4.0 | ❌ Não implementado | 🔥 Alta |
| IA/NLP Avançado | ❌ Não implementado | ⚠️ Média |
| Backend/Autenticação | ❌ Não implementado | ⚠️ Média |
| Neo4j Knowledge Graph | ❌ Não implementado | ⚠️ Média |

---

## Roadmap de Implementação

### Fase 1: Fundação Epistemológica (Meses 1-3)

**Objetivo:** Expandir e consolidar base de conhecimento com ontologias médicas padrão.

#### Mês 1: Integração LOINC

| Entrega | Descrição | Critério de Sucesso |
|---------|-----------|---------------------|
| Tipos LOINC | Expandir `lib/types/doenca.ts` com estruturas LOINC | Tipos TypeScript validados |
| Dados LOINC | 500+ códigos laboratoriais mapeados | Cobertura de exames comuns APS |
| UI de Exames | Busca semântica por código LOINC | Autocomplete funcional |
| Verificação | Atualizar `verify-integration.ts` | Script passa sem erros |

**Arquivos a modificar:**
- `lib/types/doenca.ts`
- `lib/data/doencas/**/*.ts`
- `scripts/verify-integration.ts`

#### Mês 2: PharmGKB e Farmacogenética

| Entrega | Descrição | Critério de Sucesso |
|---------|-----------|---------------------|
| Tipos PharmGKB | Estruturas para genes/variantes | CYP2D6, CYP2C19, CYP2C9, TPMT, DPYD |
| Alertas | Sistema de alertas farmacogenéticos | Notificação visual no medicamento |
| Dosagem | Recomendações baseadas em genótipo | Texto clínico por variante |
| 50 medicamentos | Dados PharmGKB para top 50 | Cobertura de medicamentos críticos |

**Arquivos a modificar:**
- `lib/types/medicamento.ts`
- `lib/data/medicamentos/**/*.ts`
- `app/components/Medications/PharmGKBAlert.tsx` (novo)

#### Mês 3: Sistema de Citações e Evidências

| Entrega | Descrição | Critério de Sucesso |
|---------|-----------|---------------------|
| GRADE | Níveis de evidência em recomendações | Alta/Moderada/Baixa/Muito Baixa |
| Oxford CEBM | Classificação alternativa | Níveis Ia-IV |
| Citações | 100% das recomendações citadas | Validador passa |
| Tooltips | DOI/PMID clicáveis | Links funcionais |

**Arquivos a modificar:**
- `lib/types/references.ts`
- `app/components/Bibliography/*`
- `lib/data/references.ts`

#### Milestone Fase 1
- [ ] LOINC integrado com 500+ códigos
- [ ] PharmGKB ativo para 50 medicamentos
- [ ] 100% das recomendações com nível de evidência
- [ ] `npm run verify` passa sem warnings

---

### Fase 2: Experiência Clínica (Meses 4-6)

**Objetivo:** Melhorar ferramentas para uso clínico diário e estudo.

#### Mês 4: Modo Estudo Completo

| Entrega | Descrição | Critério de Sucesso |
|---------|-----------|---------------------|
| Flashcards | Componente de cards com flip | Animação suave |
| Spaced Repetition | Algoritmo SM-2 (Anki) | Intervalo calculado corretamente |
| Quiz | Perguntas múltipla escolha | Feedback imediato |
| Progresso | Dashboard de aprendizado | Estatísticas por categoria |

**Novos arquivos:**
- `lib/study/spaced-repetition.ts`
- `app/[locale]/estudo/flashcards/page.tsx`
- `app/[locale]/estudo/quiz/page.tsx`
- `app/components/Study/*`

#### Mês 5: Offline e Performance

| Entrega | Descrição | Critério de Sucesso |
|---------|-----------|---------------------|
| Service Worker | Cache completo de dados | Funciona offline |
| IndexedDB | Persistência local robusta | Dados sobrevivem reload |
| Lazy Loading | Chunks por rota | Bundle < 500KB inicial |
| Prefetch | Dados críticos pré-carregados | LCP < 2s |

**Arquivos a modificar:**
- `public/sw.js` (novo)
- `next.config.ts`
- `app/layout.tsx`

#### Mês 6: Busca Semântica

| Entrega | Descrição | Critério de Sucesso |
|---------|-----------|---------------------|
| Sinônimos | Mapeamento expandido pt/en | 1000+ termos |
| Fuzzy | Tolerância a erros de digitação | Levenshtein distance |
| Facetas | Filtros por categoria/gravidade | UI funcional |
| Highlight | Destaque de matches | Visual claro |

**Arquivos a modificar:**
- `lib/search/synonyms.ts`
- `lib/search/semantic.ts`
- `app/components/Search/*`

#### Milestone Fase 2
- [ ] Modo Estudo com 500+ flashcards
- [ ] App funciona 100% offline
- [ ] Busca retorna resultados em < 100ms
- [ ] Lighthouse Performance > 90

---

### Fase 3: Integrações (Meses 7-9)

**Objetivo:** Preparar plataforma para adoção institucional.

#### Mês 7: API REST

| Entrega | Descrição | Critério de Sucesso |
|---------|-----------|---------------------|
| Endpoints | CRUD para doenças, medicamentos | RESTful compliance |
| Documentação | Swagger/OpenAPI spec | Interativo |
| Rate Limiting | Proteção contra abuso | 100 req/min |
| Versioning | v1 namespace | /api/v1/* |

**Novos arquivos:**
- `app/api/v1/doencas/route.ts`
- `app/api/v1/medicamentos/route.ts`
- `app/api/v1/calculadoras/route.ts`
- `lib/api/swagger.ts`

#### Mês 8: FHIR 4.0

| Entrega | Descrição | Critério de Sucesso |
|---------|-----------|---------------------|
| Patient | Recurso Patient | FHIR compliant |
| Condition | Mapeamento doença→Condition | ICD-10/SNOMED |
| Medication | Recurso MedicationStatement | ATC/RxNorm |
| Bundle | Transações atômicas | ACID compliance |

**Novos arquivos:**
- `lib/fhir/resources/*`
- `lib/fhir/converters/*`
- `app/api/fhir/[resource]/route.ts`

#### Mês 9: Integrações Acadêmicas

| Entrega | Descrição | Critério de Sucesso |
|---------|-----------|---------------------|
| Zotero | Export de referências | RIS/BibTeX |
| Mendeley | Integração OAuth | Sincronização |
| DOI | Resolução automática | CrossRef API |
| PMID | Link PubMed | Metadados extraídos |

**Novos arquivos:**
- `lib/integrations/zotero.ts`
- `lib/integrations/mendeley.ts`
- `app/api/references/export/route.ts`

#### Milestone Fase 3
- [ ] API com 100% de cobertura de dados
- [ ] FHIR 4.0 para Patient, Condition, Medication
- [ ] Export Zotero/Mendeley funcionando
- [ ] Documentação Swagger completa

---

### Fase 4: Escala (Meses 10-12)

**Objetivo:** Expansão internacional e recursos avançados.

#### Mês 10: Guidelines Regionais

| Entrega | Descrição | Critério de Sucesso |
|---------|-----------|---------------------|
| NHS/NICE | Guidelines UK completos | 50+ protocolos |
| NP-NCD India | Expansão para doenças crônicas | 30+ protocolos |
| USPSTF | Atualização 2025 | 100% atualizados |
| WHO | Guidelines globais | 40+ protocolos |

**Arquivos a modificar:**
- `lib/data/rastreamentos.ts`
- `messages/*/protocols.json`

#### Mês 11: IA/NLP Avançado

| Entrega | Descrição | Critério de Sucesso |
|---------|-----------|---------------------|
| BioBERT | Modelo para português | Fine-tuned SUS |
| Extração | Entidades de SOAP melhorada | F1 > 0.85 |
| Sugestões | Diagnóstico diferencial | Top 5 relevantes |
| Alertas | Inconsistências clínicas | Detecção automática |

**Novos arquivos:**
- `lib/ai/models/*`
- `lib/ai/extraction.ts`
- `lib/ai/suggestions.ts`

#### Mês 12: Polimento e Lançamento

| Entrega | Descrição | Critério de Sucesso |
|---------|-----------|---------------------|
| Beta Testing | 50 usuários reais | Feedback coletado |
| Bugs | Zero bugs críticos | Issue tracker limpo |
| Docs | Documentação completa | CLAUDE.md atualizado |
| Marketing | Landing page | mfc.agourakis.med.br |

#### Milestone Fase 4
- [ ] 4 sistemas de guidelines completos
- [ ] IA com F1 > 0.85 em extração
- [ ] Zero bugs críticos
- [ ] 50 beta testers ativos

---

## Métricas de Sucesso

### Técnicas

| Métrica | Meta | Medição |
|---------|------|---------|
| First Contentful Paint | < 1s | Lighthouse |
| Time to Interactive | < 2s | Lighthouse |
| Lighthouse Performance | > 90 | Lighthouse |
| Bundle Size (initial) | < 500KB | Webpack analyzer |
| API Response Time | < 200ms (p95) | Monitoring |
| Uptime | > 99.9% | Status page |

### Epistemológicas

| Métrica | Meta | Medição |
|---------|------|---------|
| Doenças com CID-10 | 100% | Validador |
| Recomendações citadas | 100% | Validador |
| Nível de evidência | > 80% | Manual review |
| LOINC coverage | 500+ códigos | Count |
| PharmGKB coverage | 50+ medicamentos | Count |

### Adoção

| Métrica | Meta 12 meses | Medição |
|---------|---------------|---------|
| Usuários únicos/mês | 5,000 | Analytics |
| Sessão média | > 10 min | Analytics |
| Páginas/sessão | > 5 | Analytics |
| Stars GitHub | 500 | GitHub |
| Contribuidores | 20 | GitHub |

---

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Complexidade FHIR | Alta | Alto | Começar com subset mínimo |
| Licenças ontologias | Média | Alto | Verificar termos LOINC/PharmGKB |
| Performance IA | Média | Médio | Fallback para regras simples |
| Adoção lenta | Média | Médio | Marketing em residências |
| Burnout desenvolvedor | Alta | Alto | Sprints curtos, pausas |

---

## Recursos Necessários

### Humanos
- 1 Desenvolvedor Full-stack (líder)
- 1 Médico validador (part-time)
- 1 Designer UX (consultoria)

### Tecnológicos
- Vercel Pro (deployment)
- Supabase (backend quando necessário)
- GitHub Actions (CI/CD)
- Sentry (error tracking)

### Financeiros
- Estimativa: R$ 0 (open source, infraestrutura gratuita tier)
- Opcional: R$ 500/mês para serviços premium

---

## Documentos Relacionados

- [PLANO_SUPERACAO_SOTA_DARWIN.md](PLANO_SUPERACAO_SOTA_DARWIN.md) - Estratégia de 6 dimensões
- [SOTA_COMPETITIVE_ANALYSIS.md](SOTA_COMPETITIVE_ANALYSIS.md) - Análise competitiva
- [APS_MFC_FOCUS.md](APS_MFC_FOCUS.md) - Reposicionamento estratégico
- [CLAUDE.md](CLAUDE.md) - Instruções para desenvolvimento
- [CHANGELOG.md](CHANGELOG.md) - Histórico de versões

---

## Próximos Passos Imediatos

1. **Semana 1:** Setup do ambiente para LOINC integration
2. **Semana 2:** Mapeamento inicial de 100 códigos LOINC
3. **Semana 3:** UI de busca de exames
4. **Semana 4:** Validação e documentação

---

**Aprovado por:** Darwin-MFC Development Team
**Data:** Janeiro 2025
**Próxima Revisão:** Abril 2025
