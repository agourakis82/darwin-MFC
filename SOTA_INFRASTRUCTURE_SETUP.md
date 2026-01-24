# SOTA Infrastructure Setup Guide

Guia completo para configurar a infraestrutura State of the Art (SOTA) do Darwin-MFC, incluindo Elasticsearch, Neo4j e PharmGKB.

## Índice

1. [Visão Geral](#visão-geral)
2. [Pré-requisitos](#pré-requisitos)
3. [Instalação Rápida](#instalação-rápida)
4. [Configuração Detalhada](#configuração-detalhada)
5. [Uso dos Serviços](#uso-dos-serviços)
6. [Solução de Problemas](#solução-de-problemas)
7. [Scripts Disponíveis](#scripts-disponíveis)

---

## Visão Geral

A infraestrutura SOTA do Darwin-MFC consiste em três componentes principais:

| Componente | Função | Porta | URL |
|------------|--------|-------|-----|
| **Elasticsearch** | Busca vetorial e híbrida com BM25 | 9200 | http://localhost:9200 |
| **Neo4j** | Grafo de conhecimento médico | 7474/7687 | http://localhost:7474 |
| **PharmGKB** | Alertas farmacogenéticos | API | https://api.pharmgkb.org/v1 |
| **Kibana** | Visualização do Elasticsearch | 5601 | http://localhost:5601 |

---

## Pré-requisitos

### Obrigatórios

- **Docker** e **Docker Compose** instalados
- **Node.js** 18+ instalado
- **npm** ou **yarn** instalados
- **Git** instalado

### Opcionais

- **Docker Desktop** (para gerenciamento visual)
- **Neo4j Desktop** (para gerenciamento visual do banco)

### Verificar Pré-requisitos

```bash
# Verificar Docker
docker --version
docker-compose --version

# Verificar Node.js
node --version
npm --version
```

---

## Instalação Rápida

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/darwin-mfc.git
cd darwin-mfc
```

### 2. Executar Script de Setup

```bash
./scripts/setup-sota-infrastructure.sh
```

Este script irá:
- Criar arquivo `.env.local` com configurações padrão
- Criar diretórios de configuração Docker
- Criar arquivo `docker-compose.sota.yml`
- Adicionar scripts npm ao `package.json`

### 3. Iniciar os Serviços

```bash
npm run sota:start
```

### 4. Configurar os Bancos de Dados

```bash
# Configurar Elasticsearch
npm run sota:setup:elasticsearch

# Configurar Neo4j
npm run sota:setup:neo4j
```

### 5. Configurar PharmGKB

1. Acesse https://api.pharmgkb.org/v1/account/register
2. Registre-se e obtenha uma API key
3. Adicione ao `.env.local`:

```env
PHARMGKB_API_KEY=sua-api-key-aqui
```

4. Teste a conexão:

```bash
npm run sota:test:pharmgkb
```

---

## Configuração Detalhada

### Elasticsearch

#### Variáveis de Ambiente

```env
ELASTICSEARCH_NODE=http://localhost:9200
ELASTICSEARCH_API_KEY=
ELASTICSEARCH_INDEX=darwin-medical-content
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=changeme
```

#### Mapeamento do Índice

O índice `darwin-medical-content` possui os seguintes campos:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | keyword | Identificador único |
| `title` | text | Título do conteúdo |
| `content` | text | Conteúdo completo |
| `summary` | text | Resumo do conteúdo |
| `category` | keyword | Categoria (disease, medication, etc.) |
| `evidenceLevel` | keyword | Nível de evidência (Ia, Ib, etc.) |
| `ontologyCodes` | nested | Códigos de ontologia (ICD-10, SNOMED-CT) |
| `embedding` | dense_vector | Embedding vetorial (768 dimensões) |
| `tags` | keyword | Tags para busca |

#### Uso

```typescript
import { MedicalSearchEngine } from '@/lib/search/elasticsearch-client';

const searchEngine = new MedicalSearchEngine({
  node: process.env.ELASTICSEARCH_NODE,
  index: process.env.ELASTICSEARCH_INDEX,
});

// Busca híbrida
const results = await searchEngine.hybridSearch('diabetes tipo 2', {
  size: 10,
  filters: { category: 'disease' },
});

// Busca facetada
const faceted = await searchEngine.facetedSearch('hipertensão', {
  facets: ['category', 'evidenceLevel'],
});

// Busca por código de ontologia
const byCode = await searchEngine.searchByOntologyCode('E11', 'ICD-10');
```

---

### Neo4j

#### Variáveis de Ambiente

```env
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=darwin-mfc-2025
NEO4J_DATABASE=neo4j
```

#### Esquema do Grafo

**Tipos de Nós:**

- `Doença` - Doenças e condições médicas
- `Medicamento` - Medicamentos e fármacos
- `Sintoma` - Sintomas e manifestações clínicas
- `Procedimento` - Procedimentos médicos
- `Laboratório` - Exames laboratoriais
- `Gene` - Genes relevantes
- `VarianteGenética` - Variantes genéticas
- `Guideline` - Diretrizes clínicas

**Tipos de Relações:**

- `TREATS` - Medicamento trata doença
- `CAUSES` - Doença causa sintoma
- `INDICATES` - Exame indica doença
- `CONTRAINDICATED` - Medicamento contraindicado para doença
- `INTERACTS_WITH` - Interação medicamentosa
- `GUIDES_TREATMENT` - Guideline direciona tratamento

#### Uso

```typescript
import { MedicalKnowledgeGraph } from '@/lib/graph/neo4j-client';

const graph = new MedicalKnowledgeGraph({
  uri: process.env.NEO4J_URI,
  user: process.env.NEO4J_USER,
  password: process.env.NEO4J_PASSWORD,
});

// Criar nó de doença
await graph.createDiseaseNode({
  id: 'disease-001',
  nome: 'Diabetes Mellitus Tipo 2',
  cid10: ['E11'],
  snomedCT: ['73211009'],
});

// Criar relação
await graph.createEdge(
  'med-001',
  'TREATS',
  'disease-001',
  { evidenceLevel: 'A', guidelines: ['ADA'] }
);

// Buscar caminho fisiopatológico
const path = await graph.findPathophysiologicalPath(
  'obesidade',
  'diabetes'
);

// Buscar interações medicamentosas
const interactions = await graph.findDrugInteractions('med-001', 2);
```

---

### PharmGKB

#### Variáveis de Ambiente

```env
PHARMGKB_API_KEY=sua-api-key-aqui
PHARMGKB_API_URL=https://api.pharmgkb.org/v1
PHARMGKB_CACHE_TTL=3600000
```

#### Obter API Key

1. Acesse: https://api.pharmgkb.org/v1/account/register
2. Preencha o formulário de registro
3. Aguarde aprovação (geralmente 1-2 dias úteis)
4. Copie a API key fornecida

#### Uso

```typescript
import { PharmGKBClient } from '@/lib/pharmacogenetics/pharmgkb-client';
import { AlertSystem } from '@/lib/pharmacogenetics/alert-system';

const pharmGKBClient = new PharmGKBClient({
  apiKey: process.env.PHARMGKB_API_KEY,
  cacheTTL: 3600000,
});

const alertSystem = new AlertSystem(pharmGKBClient);

// Consultar variante genética
const variant = await pharmGKBClient.getVariantInfo('PA166104948');

// Consultar diretrizes de dosagem
const guidelines = await pharmGKBClient.getDrugGuidelines('PA128179466');

// Verificar segurança de medicamento
const safetyCheck = await alertSystem.checkMedicationSafety(
  { name: 'Clopidogrel', atcCode: 'B01AC04' },
  { genes: ['CYP2C19'], variants: ['*2', '*3'] }
);

if (safetyCheck.hasAlerts) {
  safetyCheck.alerts.forEach(alert => {
    console.warn(alert.message);
    console.info(alert.recommendation);
  });
}
```

---

## Uso dos Serviços

### Scripts npm Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run sota:start` | Inicia todos os serviços SOTA |
| `npm run sota:stop` | Para todos os serviços SOTA |
| `npm run sota:restart` | Reinicia todos os serviços SOTA |
| `npm run sota:logs` | Visualiza logs dos serviços |
| `npm run sota:setup:elasticsearch` | Configura o índice Elasticsearch |
| `npm run sota:setup:neo4j` | Configura o banco Neo4j |
| `npm run sota:test:pharmgkb` | Testa conexão PharmGKB |
| `npm run sota:setup:all` | Configura Elasticsearch e Neo4j |

### Acessar Interfaces Web

| Serviço | URL | Credenciais |
|---------|-----|-------------|
| Kibana | http://localhost:5601 | - |
| Neo4j Browser | http://localhost:7474 | neo4j / darwin-mfc-2025 |
| Elasticsearch | http://localhost:9200 | - |

### Verificar Status dos Serviços

```bash
# Verificar se serviços estão rodando
docker-compose -f docker-compose.sota.yml ps

# Verificar logs
docker-compose -f docker-compose.sota.yml logs

# Verificar logs de um serviço específico
docker-compose -f docker-compose.sota.yml logs elasticsearch
docker-compose -f docker-compose.sota.yml logs neo4j
```

---

## Solução de Problemas

### Elasticsearch não inicia

**Problema:** Container do Elasticsearch não inicia

**Solução:**
```bash
# Verificar logs
docker-compose -f docker-compose.sota.yml logs elasticsearch

# Verificar se a porta 9200 está em uso
lsof -i :9200

# Aumentar memória virtual (Linux)
sudo sysctl -w vm.max_map_count=262144
echo "vm.max_map_count=262144" | sudo tee -a /etc/sysctl.conf
```

### Neo4j não inicia

**Problema:** Container do Neo4j não inicia

**Solução:**
```bash
# Verificar logs
docker-compose -f docker-compose.sota.yml logs neo4j

# Verificar se as portas 7474 e 7687 estão em uso
lsof -i :7474
lsof -i :7687

# Reiniciar o serviço
docker-compose -f docker-compose.sota.yml restart neo4j
```

### PharmGKB retorna erro de autenticação

**Problema:** Erro 401 Unauthorized ao acessar PharmGKB

**Solução:**
1. Verifique se a API key está correta no `.env.local`
2. Verifique se a API key ainda é válida
3. Entre em contato com o suporte PharmGKB se necessário

### Erro de conexão com Neo4j

**Problema:** "Connection refused" ao conectar ao Neo4j

**Solução:**
```bash
# Verificar se o container está rodando
docker ps | grep neo4j

# Aguardar inicialização completa
docker-compose -f docker-compose.sota.yml logs neo4j | tail -f

# Verificar credenciais no .env.local
cat .env.local | grep NEO4J
```

### Índice Elasticsearch não encontrado

**Problema:** "index_not_found_exception" ao executar busca

**Solução:**
```bash
# Recriar o índice
npm run sota:setup:elasticsearch

# Verificar se o índice existe
curl -X GET http://localhost:9200/_cat/indices?v
```

---

## Scripts Disponíveis

### setup-sota-infrastructure.sh

Script principal de configuração que cria toda a infraestrutura necessária.

```bash
./scripts/setup-sota-infrastructure.sh
```

### setup-elasticsearch-index.js

Configura o índice Elasticsearch com mapeamento apropriado e dados de exemplo.

```bash
node scripts/setup-elasticsearch-index.js
```

### setup-neo4j-database.js

Configura o banco Neo4j com constraints, índices e dados de exemplo.

```bash
node scripts/setup-neo4j-database.js
```

### test-pharmgkb.js

Testa a conexão com a API PharmGKB.

```bash
node scripts/test-pharmgkb.js
```

---

## Próximos Passos

Após configurar a infraestrutura SOTA:

1. **Indexar conteúdo existente**
   - Migrar dados do Darwin-MFC para Elasticsearch
   - Criar nós e relações no Neo4j

2. **Implementar busca avançada**
   - Criar componentes de busca híbrida
   - Implementar filtros facetados

3. **Adicionar alertas farmacogenéticos**
   - Integrar PharmGKB no fluxo de prescrição
   - Criar componentes de alerta

4. **Monitoramento e manutenção**
   - Configurar backups
   - Monitorar performance
   - Atualizar dados regularmente

---

## Referências

- [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [Neo4j Documentation](https://neo4j.com/docs/)
- [PharmGKB API](https://api.pharmgkb.org/v1/data/swagger)
- [SOTA Implementation Guide](./SOTA_IMPLEMENTATION_GUIDE.md)

---

## Suporte

Para dúvidas ou problemas:
1. Consulte a seção de [Solução de Problemas](#solução-de-problemas)
2. Verifique os logs dos serviços
3. Abra uma issue no repositório
