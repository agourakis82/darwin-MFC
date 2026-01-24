# Guia de Implementação SOTA - Darwin-MFC

Este documento descreve a implementação das funcionalidades State of the Art (SOTA) adicionadas ao projeto Darwin-MFC.

## Índice

1. [Elasticsearch com Vector Search](#1-elasticsearch-com-vector-search)
2. [Integração PharmGKB](#2-integração-pharmgkb)
3. [Neo4j para Grafo de Conhecimento](#3-neo4j-para-grafo-de-conhecimento)
4. [Testes E2E e Visual Regression](#4-testes-e2e-e-visual-regression)
5. [WCAG 2.2 AAA Compliance](#5-wcag-22-aaa-compliance)

---

## 1. Elasticsearch com Vector Search

### Arquivos Criados

- [`lib/search/elasticsearch-client.ts`](lib/search/elasticsearch-client.ts) - Cliente Elasticsearch com busca híbrida
- [`lib/search/types.ts`](lib/search/types.ts) - Tipos TypeScript para busca

### Funcionalidades

#### Busca Híbrida
Combina busca por palavras-chave (BM25) com busca vetorial (similarity) usando Reciprocal Rank Fusion (RRF):

```typescript
const results = await searchEngine.hybridSearch('diabetes tipo 2', {
  size: 10,
  filters: { category: 'disease' },
  ontologyCodes: ['E11']
});
```

#### Busca Facetada
Permite filtrar resultados por múltiplas dimensões:

```typescript
const facetedResults = await searchEngine.facetedSearch('hipertensão', {
  facets: ['category', 'evidenceLevel', 'country']
});
```

#### Busca por Código de Ontologia
Busca direta por códigos médicos:

```typescript
const results = await searchEngine.searchByOntologyCode('I10', 'cid10');
```

### Configuração

```typescript
const client = new MedicalSearchEngine({
  node: 'http://localhost:9200',
  index: 'darwin-medical-content',
  apiKey: process.env.ELASTICSEARCH_API_KEY
});
```

### Dependências

```bash
npm install @elastic/elasticsearch
```

### Variáveis de Ambiente

```env
ELASTICSEARCH_NODE=http://localhost:9200
ELASTICSEARCH_API_KEY=your-api-key
ELASTICSEARCH_INDEX=darwin-medical-content
```

---

## 2. Integração PharmGKB

### Arquivos Criados

- [`lib/pharmacogenetics/pharmgkb-client.ts`](lib/pharmacogenetics/pharmgkb-client.ts) - Cliente PharmGKB API
- [`lib/pharmacogenetics/alert-system.ts`](lib/pharmacogenetics/alert-system.ts) - Sistema de alertas farmacogenéticos
- [`lib/pharmacogenetics/types.ts`](lib/pharmacogenetics/types.ts) - Tipos TypeScript

### Funcionalidades

#### Consulta de Variantes Genéticas

```typescript
const variant = await pharmGKBClient.getVariantInfo('PA166104948');
```

#### Diretrizes de Dosagem

```typescript
const guidelines = await pharmGKBClient.getDrugGuidelines('PA128179466');
```

#### Mapeamento Gene-Medicamento

```typescript
const drugs = await pharmGKBClient.getGeneDrugs('CYP2C19');
```

#### Sistema de Alertas

Verificação de segurança de medicamentos:

```typescript
const safetyCheck = await alertSystem.checkMedicationSafety(
  medication,
  patientGenetics
);

if (safetyCheck.hasAlerts) {
  safetyCheck.alerts.forEach(alert => {
    console.warn(alert.message);
    console.info(alert.recommendation);
  });
}
```

### Configuração

```typescript
const client = new PharmGKBClient({
  apiKey: process.env.PHARMGKB_API_KEY,
  cacheTTL: 3600000 // 1 hora
});
```

### Dependências

```bash
npm install @elastic/elasticsearch neo4j-driver
```

### Variáveis de Ambiente

```env
PHARMGKB_API_KEY=your-api-key
PHARMGKB_API_URL=https://api.pharmgkb.org/v1
```

---

## 3. Neo4j para Grafo de Conhecimento

### Arquivos Criados

- [`lib/graph/neo4j-client.ts`](lib/graph/neo4j-client.ts) - Cliente Neo4j

### Funcionalidades

#### Criação de Nós

```typescript
// Doença
const diseaseNode = await graph.createDiseaseNode({
  id: 'disease-123',
  nome: 'Diabetes Mellitus Tipo 2',
  cid10: ['E11'],
  snomedCT: ['73211009']
});

// Medicamento
const medNode = await graph.createMedicationNode({
  id: 'med-456',
  nome: 'Metformina',
  atcCode: 'A10BA02',
  snomedCT: ['83209005']
});

// Sintoma
const symptomNode = await graph.createSymptomNode({
  id: 'symptom-789',
  nome: 'Poliúria',
  snomedCT: ['16248004']
});
```

#### Criação de Arestas

```typescript
// Relação de tratamento
await graph.createEdge(
  'med-456',
  'TREATS',
  'disease-123',
  { evidenceLevel: 'A', guidelines: ['ADA'] }
);

// Relação de causa
await graph.createEdge(
  'disease-123',
  'CAUSES',
  'symptom-789',
  { frequency: 'common' }
);
```

#### Consultas Complexas

```typescript
// Caminho fisiopatológico
const path = await graph.findPathophysiologicalPath(
  'obesidade',
  'diabetes'
);

// Interações medicamentosas
const interactions = await graph.findDrugInteractions(
  'med-456',
  2
);

// Busca por padrão
const pattern = await graph.findPattern(
  '(:Medicamento)-[:TREATS]->(:Doença)-[:CAUSES]->(:Sintoma)'
);
```

### Configuração

```typescript
const graph = new MedicalKnowledgeGraph({
  uri: 'bolt://localhost:7687',
  user: 'neo4j',
  password: process.env.NEO4J_PASSWORD
});
```

### Dependências

```bash
npm install neo4j-driver
```

### Variáveis de Ambiente

```env
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your-password
NEO4J_DATABASE=darwin
```

---

## 4. Testes E2E e Visual Regression

### Arquivos Criados

- [`tests/e2e/clinical-workflow.spec.ts`](tests/e2e/clinical-workflow.spec.ts) - Testes E2E de workflow clínico
- [`tests/visual-regression/visual-regression.spec.ts`](tests/visual-regression/visual-regression.spec.ts) - Testes de regressão visual
- [`playwright.config.ts`](playwright.config.ts) - Configuração do Playwright
- [`lighthouserc.js`](lighthouserc.js) - Configuração do Lighthouse CI

### Testes E2E

#### Executar todos os testes

```bash
npm run test:e2e
```

#### Executar com interface visual

```bash
npm run test:e2e:ui
```

#### Executar em modo debug

```bash
npm run test:e2e:debug
```

#### Executar com navegador visível

```bash
npm run test:e2e:headed
```

### Testes de Regressão Visual

#### Executar testes visuais

```bash
npm run test:visual
```

#### Atualizar screenshots

```bash
npx playwright test --update-snapshots
```

### Testes de Performance (Lighthouse)

#### Executar testes de performance

```bash
npm run test:lighthouse
```

#### Métricas exigidas

- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 90
- First Contentful Paint: ≤ 1500ms
- Largest Contentful Paint: ≤ 2500ms
- Cumulative Layout Shift: ≤ 0.1
- Total Blocking Time: ≤ 300ms

### Dependências

```bash
npm install -D @playwright/test @lhci/cli
```

### Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `test:e2e` | Executa testes E2E |
| `test:e2e:ui` | Executa testes com interface visual |
| `test:e2e:debug` | Executa testes em modo debug |
| `test:e2e:headed` | Executa testes com navegador visível |
| `test:visual` | Executa testes de regressão visual |
| `test:visual:headed` | Executa testes visuais com navegador visível |
| `test:lighthouse` | Executa testes de performance |
| `test:all` | Executa todos os testes |

---

## 5. WCAG 2.2 AAA Compliance

### Arquivos Criados

- [`lib/accessibility/validator.ts`](lib/accessibility/validator.ts) - Validador de acessibilidade
- [`components/accessibility/SkipLinks.tsx`](components/accessibility/SkipLinks.tsx) - Links de skip
- [`components/accessibility/AccessibleButton.tsx`](components/accessibility/AccessibleButton.tsx) - Botão acessível
- [`components/accessibility/AccessibleToast.tsx`](components/accessibility/AccessibleToast.tsx) - Toast acessível
- [`components/accessibility/AccessibleModal.tsx`](components/accessibility/AccessibleModal.tsx) - Modal acessível
- [`components/accessibility/AccessibleForm.tsx`](components/accessibility/AccessibleForm.tsx) - Formulário acessível
- [`messages/pt/accessibility.json`](messages/pt/accessibility.json) - Traduções PT-BR
- [`messages/en/accessibility.json`](messages/en/accessibility.json) - Traduções EN

### Funcionalidades

#### Validador de Acessibilidade

```typescript
import { getAccessibilityValidator } from '@/lib/accessibility/validator';

const validator = getAccessibilityValidator();
const report = await validator.validatePage();

console.log(`Score: ${report.score}`);
console.log(`Violations: ${report.violations.length}`);
```

#### Componentes Acessíveis

```typescript
import { AccessibleButton } from '@/components/accessibility/AccessibleButton';
import { AccessibleInput } from '@/components/accessibility/AccessibleForm';
import { ToastContainer, useToast } from '@/components/accessibility/AccessibleToast';
import { AccessibleModal } from '@/components/accessibility/AccessibleModal';

// Botão com touch target mínimo de 44x44px
<AccessibleButton variant="primary" size="md">
  Clique aqui
</AccessibleButton>

// Input com labels e mensagens de erro
<AccessibleInput 
  label="E-mail"
  error={errors.email}
  required
/>

// Toast com ARIA live regions
const { success, error } = useToast();
success('Operação realizada com sucesso!');

// Modal com focus trap
<AccessibleModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmar ação"
>
  Conteúdo do modal
</AccessibleModal>
```

### Critérios WCAG 2.2 AAA Implementados

| Critério | Descrição | Implementação |
|----------|-----------|---------------|
| 1.4.6 | Contraste 7:1 (texto) | Validador automático |
| 1.4.12 | Espaçamento 2x | Validador automático |
| 2.1.1 | Teclado acessível | Todos os componentes |
| 2.4.7 | Indicador de foco 3px | Todos os componentes |
| 2.5.5 | Touch target 44x44px | Todos os componentes |
| 3.3.1 | Identificação de erros | Formulários com ARIA |
| 3.3.2 | Instruções de erro | Mensagens claras |
| 4.1.2 | Nome, função, valor | ARIA attributes |

### Dependências

```bash
npm install @axe-core/react
```

### Scripts Disponíveis

```bash
npm run test:accessibility
```

---

## Próximos Passos

1. **Configurar Elasticsearch**
   - Instalar e configurar Elasticsearch
   - Criar índice com mapeamento apropriado
   - Indexar conteúdo existente

2. **Configurar Neo4j**
   - Instalar e configurar Neo4j
   - Criar banco de dados Darwin
   - Importar dados médicos

3. **Configurar PharmGKB**
   - Obter API key
   - Configurar autenticação
   - Testar endpoints

4. **Executar Testes**
   - Configurar Playwright browsers
   - Executar testes E2E
   - Configurar CI/CD

5. **Implementar Componentes**
   - Substituir componentes existentes por acessíveis
   - Adicionar validador de acessibilidade
   - Testar com leitores de tela

---

## Referências

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [Neo4j Documentation](https://neo4j.com/docs/)
- [PharmGKB API](https://api.pharmgkb.org/v1/data/swagger)
- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
