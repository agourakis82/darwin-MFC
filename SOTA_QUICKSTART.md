# SOTA Infrastructure Quick Start

Início rápido para configurar a infraestrutura SOTA do Darwin-MFC.

## 🚀 Setup em 5 minutos

```bash
# 1. Executar script de setup
./scripts/setup-sota-infrastructure.sh

# 2. Iniciar os serviços
npm run sota:start

# 3. Configurar bancos de dados
npm run sota:setup:all

# 4. Testar integração
npm run sota:test:integration
```

## 📋 Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 18+ instalado

## 🔧 Configurar ClinPGx (Pharmacogenetics)

**Opção A: Usar API (requer API key)**

1. Acesse: https://api.pharmgkb.org/v1/account/register
2. Registre-se e obtenha uma API key
3. Adicione ao `.env.local`:

```env
CLINPGX_API_KEY=sua-api-key-aqui
CLINPGX_USE_DOWNLOADS=false
```

**Opção B: Usar Downloads (grátis, sem API key)**

1. Baixe os dados do ClinPGx usando Playwright:

```bash
npm run sota:download:clinpgx
```

2. Configure no `.env.local`:

```env
CLINPGX_USE_DOWNLOADS=true
CLINPGX_DATA_PATH=./data/clinpgx
```

**Nota:** Antes de usar dados ClinPGx em produção, entre em contato com feedback@clinpgx.org para garantir interpretação correta dos dados.

## 🌐 URLs de Acesso

| Serviço | URL | Credenciais |
|---------|-----|-------------|
| Kibana | http://localhost:5601 | - |
| Neo4j Browser | http://localhost:7474 | neo4j / darwin-mfc-2025 |
| Elasticsearch | http://localhost:9200 | - |

## 📚 Scripts Disponíveis

```bash
# Gerenciar serviços
npm run sota:start      # Iniciar serviços
npm run sota:stop       # Parar serviços
npm run sota:restart    # Reiniciar serviços
npm run sota:logs       # Ver logs

# Configurar bancos
npm run sota:setup:elasticsearch  # Configurar Elasticsearch
npm run sota:setup:neo4j          # Configurar Neo4j
npm run sota:setup:all            # Configurar ambos

# ClinPGx (Pharmacogenetics)
npm run sota:download:clinpgx    # Baixar dados do ClinPGx (usando Playwright)

# Testar
npm run sota:test:integration     # Testar integração completa
npm run sota:test:clinpgx        # Testar ClinPGx
```

## 📖 Documentação Completa

Veja [`SOTA_INFRASTRUCTURE_SETUP.md`](./SOTA_INFRASTRUCTURE_SETUP.md) para documentação completa.

## 🐛 Solução de Problemas

### Elasticsearch não inicia

```bash
# Aumentar memória virtual (Linux)
sudo sysctl -w vm.max_map_count=262144
```

### Neo4j não conecta

```bash
# Verificar logs
docker-compose -f docker-compose.sota.yml logs neo4j
```

### PharmGKB erro 401

Verifique se a API key está correta no `.env.local`.

## ✅ Verificar Status

```bash
# Verificar se serviços estão rodando
docker-compose -f docker-compose.sota.yml ps

# Executar testes de integração
npm run sota:test:integration
```
