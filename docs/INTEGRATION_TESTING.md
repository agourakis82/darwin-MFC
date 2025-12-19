# Testes de Integração - Darwin MFC

## Visão Geral

Este documento descreve os testes de integração implementados para garantir que todas as partes do sistema estão funcionando corretamente em conjunto.

## Estrutura de Testes

### 1. Script de Verificação de Integração

**Arquivo:** `scripts/verify-integration.ts`

Script TypeScript que valida automaticamente:

- ✅ **Ontologias**: LOINC, ORDO, HPO, PharmGKB integrados
- ✅ **Grafo de Conhecimento**: Construção e estrutura
- ✅ **Traduções**: Todos os idiomas configurados
- ✅ **RTL Support**: Configuração para árabe
- ✅ **Dados Médicos**: Quantidade mínima de doenças e medicamentos
- ✅ **Busca Semântica**: Funcionalidade disponível

**Execução:**
```bash
npx tsx scripts/verify-integration.ts
```

### 2. Checklist de Integração Manual

#### Ontologias

- [ ] LOINC mapeado para exames laboratoriais
- [ ] ORDO mapeado para doenças raras
- [ ] HPO incluído para doenças com fenótipos
- [ ] PharmGKB integrado para farmacogenética

#### Sistema de Citações

- [ ] Níveis de evidência funcionando
- [ ] Sistema GRADE implementado
- [ ] Componente EvidenceBadge renderizando
- [ ] Citações inline funcionando

#### Grafo de Conhecimento

- [ ] Grafo construído com dados
- [ ] Queries básicas funcionando
- [ ] Visualização com reactflow renderizando
- [ ] Nós e arestas conectados corretamente

#### Busca Semântica

- [ ] Sinônimos médicos expandidos
- [ ] Busca fuzzy funcionando
- [ ] Faceted search implementado
- [ ] Resultados relevantes retornando

#### Multilíngue

- [ ] Todos os 7 idiomas configurados (pt, en, es, fr, ru, ar, zh, el)
- [ ] Mensagens de UI traduzidas
- [ ] Conteúdo médico traduzido (base)
- [ ] Seletor de idioma funcionando
- [ ] Rotas com locale funcionando
- [ ] RTL funcionando para árabe

#### Integração de Componentes

- [ ] Header traduzido
- [ ] Sidebar traduzido
- [ ] Footer traduzido
- [ ] ExportTools traduzido
- [ ] Componentes principais usando `useTranslations()`

### 3. Testes de RTL

**Como testar:**

1. Acesse a aplicação com locale árabe: `/ar`
2. Verifique:
   - [ ] Texto alinhado à direita
   - [ ] Sidebar na posição correta
   - [ ] Margens e paddings invertidos
   - [ ] Dropdowns posicionados corretamente
   - [ ] Flexbox funcionando em RTL
   - [ ] Bordas e espaçamentos corretos

**Teste manual rápido:**
```bash
# Em desenvolvimento, acesse:
http://localhost:3000/ar
```

### 4. Testes de Tradução

**Verificar strings não traduzidas:**

1. Execute a aplicação
2. Navegue por todas as páginas
3. Verifique se há strings em português quando outro idioma está selecionado
4. Verifique se todas as chaves de tradução estão presentes

**Locais a verificar:**
- Header e navegação
- Sidebar
- Footer
- Formulários
- Mensagens de erro/sucesso
- Tooltips
- Placeholders

### 5. Testes de Busca Semântica

**Cenários de teste:**

1. Busca por nome exato: "Hipertensão"
2. Busca com erro de digitação: "Hiprtensao"
3. Busca por sinônimo: "Pressão alta"
4. Busca por código: "CID-10 I10"
5. Busca por categoria: "cardiovascular"
6. Busca por múltiplos critérios

**Resultados esperados:**
- Resultados relevantes retornados
- Ordenação por relevância
- Faceted search funcionando
- Filtros aplicados corretamente

### 6. Testes do Grafo de Conhecimento

**Queries para testar:**

```typescript
import { findRelatedNodes, findPaths, findComorbidityClusters } from '@/lib/graph/queries';

// Teste 1: Encontrar nós relacionados
const related = findRelatedNodes('hipertensao-arterial', 'disease', 2);

// Teste 2: Encontrar caminhos entre conceitos
const path = findPaths('hipertensao-arterial', 'diabetes-mellitus-tipo-2');

// Teste 3: Encontrar clusters de comorbidades
const clusters = findComorbidityClusters();
```

**Verificações:**
- [ ] Nós relacionados retornados
- [ ] Caminhos encontrados corretamente
- [ ] Clusters identificados
- [ ] Visualização renderizando grafo

### 7. Testes de Ontologias

**Verificações por tipo:**

#### LOINC
```typescript
// Verificar se doenças têm códigos LOINC
const diseasesWithLOINC = doencas.filter(d => d.loinc?.length > 0);
```

#### ORDO
```typescript
// Verificar se doenças raras têm códigos ORDO
const rareDiseases = doencas.filter(d => d.ordo?.length > 0);
```

#### HPO
```typescript
// Verificar se doenças têm códigos HPO
const diseasesWithHPO = doencas.filter(d => d.hpo?.length > 0);
```

#### PharmGKB
```typescript
// Verificar se medicamentos têm dados PharmGKB
const medsWithPharmGKB = medicamentos.filter(m => m.pharmgkb);
```

### 8. Testes de Build

**Verificar build de produção:**

```bash
npm run build
```

**Verificações:**
- [ ] Build completa sem erros
- [ ] Todas as rotas geradas
- [ ] Arquivos estáticos gerados
- [ ] Locales gerados corretamente
- [ ] Sem warnings críticos

### 9. Testes de Performance

**Métricas a verificar:**

- Tempo de build
- Tamanho dos bundles
- First Load JS
- Tempo de carregamento de página
- Tempo de resposta da busca

### 10. Testes de Acessibilidade

**Verificações:**

- [ ] Navegação por teclado funcionando
- [ ] Screen readers compatíveis
- [ ] Contraste de cores adequado
- [ ] ARIA labels presentes
- [ ] Skip links funcionando
- [ ] RTL acessível

## Execução dos Testes

### Teste Completo de Integração

```bash
# Executar script de verificação
npx tsx scripts/verify-integration.ts

# Build de produção
npm run build

# Verificar se build foi bem-sucedido
echo $?
```

### Testes Manuais por Componente

Siga o checklist acima para cada componente.

## Resultados Esperados

Todos os testes devem passar para considerar a integração completa:

- ✅ Ontologias: > 80% de cobertura
- ✅ Traduções: 100% da UI traduzida
- ✅ RTL: Funcionando para árabe
- ✅ Busca: Resultados relevantes
- ✅ Grafo: Estrutura válida
- ✅ Build: Sem erros

## Próximos Passos

Para expandir os testes:

1. Adicionar Jest/Vitest para testes unitários
2. Adicionar Playwright para testes E2E
3. Adicionar testes de snapshot
4. Integrar CI/CD com testes automatizados

