#!/bin/bash

# =============================================================================
# SOTA Infrastructure Setup Script for Darwin-MFC
# =============================================================================
# This script sets up Elasticsearch, Neo4j, and ClinPGx (formerly PharmGKB) integration
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${PROJECT_ROOT}/.env.local"

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}  SOTA Infrastructure Setup${NC}"
echo -e "${BLUE}  Darwin-MFC${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# Check if .env.local exists, if not create from .env.example
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${YELLOW}Creating .env.local from .env.example...${NC}"
    cp "${PROJECT_ROOT}/.env.example" "$ENV_FILE"
fi

# =============================================================================
# 1. Elasticsearch Setup
# =============================================================================
echo -e "${BLUE}[1/3] Setting up Elasticsearch...${NC}"

# Check if Elasticsearch is installed
if ! command -v elasticsearch &> /dev/null; then
    echo -e "${YELLOW}Elasticsearch not found. Installing via Docker...${NC}"
    
    # Create Elasticsearch configuration directory
    mkdir -p "${PROJECT_ROOT}/docker/elasticsearch/config"
    mkdir -p "${PROJECT_ROOT}/docker/elasticsearch/data"
    
    # Create elasticsearch.yml
    cat > "${PROJECT_ROOT}/docker/elasticsearch/config/elasticsearch.yml" << 'EOF'
cluster.name: darwin-mfc
node.name: darwin-node-1
network.host: 0.0.0.0
http.port: 9200
discovery.type: single-node
xpack.security.enabled: false
xpack.security.http.ssl.enabled: false
xpack.security.transport.ssl.enabled: false
EOF

    # Add Elasticsearch to .env.local
    echo "" >> "$ENV_FILE"
    echo "# =============================================================================" >> "$ENV_FILE"
    echo "# ELASTICSEARCH (SOTA Search)" >> "$ENV_FILE"
    echo "# =============================================================================" >> "$ENV_FILE"
    echo "ELASTICSEARCH_NODE=http://localhost:9200" >> "$ENV_FILE"
    echo "ELASTICSEARCH_API_KEY=" >> "$ENV_FILE"
    echo "ELASTICSEARCH_INDEX=darwin-medical-content" >> "$ENV_FILE"
    echo "ELASTICSEARCH_USERNAME=elastic" >> "$ENV_FILE"
    echo "ELASTICSEARCH_PASSWORD=changeme" >> "$ENV_FILE"
    
    echo -e "${GREEN}✓ Elasticsearch configuration created${NC}"
else
    echo -e "${GREEN}✓ Elasticsearch is already installed${NC}"
fi

# =============================================================================
# 2. Neo4j Setup
# =============================================================================
echo -e "${BLUE}[2/3] Setting up Neo4j...${NC}"

# Check if Neo4j is installed
if ! command -v neo4j &> /dev/null; then
    echo -e "${YELLOW}Neo4j not found. Setting up via Docker...${NC}"
    
    # Create Neo4j configuration directory
    mkdir -p "${PROJECT_ROOT}/docker/neo4j/conf"
    mkdir -p "${PROJECT_ROOT}/docker/neo4j/data"
    mkdir -p "${PROJECT_ROOT}/docker/neo4j/logs"
    mkdir -p "${PROJECT_ROOT}/docker/neo4j/plugins"
    
    # Create neo4j.conf
    cat > "${PROJECT_ROOT}/docker/neo4j/conf/neo4j.conf" << 'EOF'
# Basic configuration
dbms.default_listen_address=0.0.0.0
dbms.connector.bolt.listen_address=:7687
dbms.connector.http.listen_address=:7474

# Memory configuration
dbms.memory.heap.initial_size=512m
dbms.memory.heap.max_size=2G
dbms.memory.pagecache.size=1G

# Security
dbms.security.auth_enabled=true
dbms.security.procedures.unrestricted=apoc.*

# Logging
dbms.logs.debug.level=INFO
EOF

    # Add Neo4j to .env.local
    echo "" >> "$ENV_FILE"
    echo "# =============================================================================" >> "$ENV_FILE"
    echo "# NEO4J (Knowledge Graph)" >> "$ENV_FILE"
    echo "# =============================================================================" >> "$ENV_FILE"
    echo "NEO4J_URI=bolt://localhost:7687" >> "$ENV_FILE"
    echo "NEO4J_USER=neo4j" >> "$ENV_FILE"
    echo "NEO4J_PASSWORD=darwin-mfc-2025" >> "$ENV_FILE"
    echo "NEO4J_DATABASE=darwin" >> "$ENV_FILE"
    
    echo -e "${GREEN}✓ Neo4j configuration created${NC}"
else
    echo -e "${GREEN}✓ Neo4j is already installed${NC}"
fi

# =============================================================================
# 3. ClinPGx Setup
# =============================================================================
echo -e "${BLUE}[3/3] Setting up ClinPGx...${NC}"

# Add ClinPGx to .env.local
echo "" >> "$ENV_FILE"
echo "# =============================================================================" >> "$ENV_FILE"
echo "# CLINPGX (Pharmacogenetics - formerly PharmGKB)" >> "$ENV_FILE"
echo "# =============================================================================" >> "$ENV_FILE"
echo "CLINPGX_API_KEY=your-api-key-here" >> "$ENV_FILE"
echo "CLINPGX_API_URL=https://api.pharmgkb.org/v1" >> "$ENV_FILE"
echo "CLINPGX_USE_DOWNLOADS=false" >> "$ENV_FILE"
echo "CLINPGX_CACHE_TTL=3600000" >> "$ENV_FILE"

echo -e "${GREEN}✓ ClinPGx configuration added${NC}"

# =============================================================================
# 4. Create Docker Compose File
# =============================================================================
echo -e "${BLUE}Creating Docker Compose configuration...${NC}"

cat > "${PROJECT_ROOT}/docker-compose.sota.yml" << 'EOF'
version: '3.8'

services:
  # Elasticsearch for vector search
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    container_name: darwin-elasticsearch
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - "ES_JAVA_OPTS=-Xms1g -Xmx1g"
    ports:
      - "9200:9200"
      - "9300:9300"
    volumes:
      - ./docker/elasticsearch/data:/usr/share/elasticsearch/data
      - ./docker/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml
    networks:
      - darwin-sota
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:9200/_cluster/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5

  # Neo4j for knowledge graph
  neo4j:
    image: neo4j:5.12.0
    container_name: darwin-neo4j
    environment:
      - NEO4J_AUTH=neo4j/darwin-mfc-2025
      - NEO4J_dbms_memory_heap_initial__size=512m
      - NEO4J_dbms_memory_heap_max__size=2G
      - NEO4J_dbms_memory_pagecache_size=1G
      - NEO4J_PLUGINS=["apoc"]
    ports:
      - "7474:7474"
      - "7687:7687"
    volumes:
      - ./docker/neo4j/data:/data
      - ./docker/neo4j/logs:/logs
      - ./docker/neo4j/plugins:/plugins
      - ./docker/neo4j/conf/neo4j.conf:/conf/neo4j.conf
    networks:
      - darwin-sota
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:7474 || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5

  # Kibana for Elasticsearch visualization (optional)
  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    container_name: darwin-kibana
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch
    networks:
      - darwin-sota
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:5601/api/status || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5

networks:
  darwin-sota:
    driver: bridge

volumes:
  elasticsearch-data:
  neo4j-data:
EOF

echo -e "${GREEN}✓ Docker Compose configuration created${NC}"

# =============================================================================
# 5. Create Index Setup Script
# =============================================================================
echo -e "${BLUE}Creating Elasticsearch index setup script...${NC}"

cat > "${PROJECT_ROOT}/scripts/setup-elasticsearch-index.js" << 'EOF'
/**
 * Elasticsearch Index Setup for Darwin-MFC
 * Creates the medical content index with proper mappings for vector search
 */

const { Client } = require('@elastic/elasticsearch');

async function setupIndex() {
  const client = new Client({
    node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
  });

  const indexName = process.env.ELASTICSEARCH_INDEX || 'darwin-medical-content';

  console.log(`Setting up Elasticsearch index: ${indexName}`);

  // Delete index if it exists (for development)
  try {
    await client.indices.delete({ index: indexName });
    console.log('✓ Deleted existing index');
  } catch (error) {
    if (error.meta.statusCode !== 404) {
      throw error;
    }
  }

  // Create index with mapping
  await client.indices.create({
    index: indexName,
    body: {
      settings: {
        number_of_shards: 3,
        number_of_replicas: 1,
        analysis: {
          analyzer: {
            portuguese_analyzer: {
              type: 'custom',
              tokenizer: 'standard',
              filter: ['lowercase', 'portuguese_stemmer', 'stop'],
            },
          },
          filter: {
            portuguese_stemmer: {
              type: 'stemmer',
              language: 'portuguese',
            },
          },
        },
      },
      mappings: {
        properties: {
          id: { type: 'keyword' },
          title: {
            type: 'text',
            analyzer: 'portuguese_analyzer',
            fields: {
              keyword: { type: 'keyword' },
            },
          },
          content: {
            type: 'text',
            analyzer: 'portuguese_analyzer',
          },
          summary: {
            type: 'text',
            analyzer: 'portuguese_analyzer',
          },
          category: { type: 'keyword' },
          subcategory: { type: 'keyword' },
          evidenceLevel: { type: 'keyword' },
          source: { type: 'keyword' },
          ontologyCodes: {
            type: 'nested',
            properties: {
              code: { type: 'keyword' },
              system: { type: 'keyword' },
            },
          },
          tags: { type: 'keyword' },
          country: { type: 'keyword' },
          language: { type: 'keyword' },
          createdAt: { type: 'date' },
          updatedAt: { type: 'date' },
          // Vector embedding for semantic search
          embedding: {
            type: 'dense_vector',
            dims: 768,
            index: true,
            similarity: 'cosine',
          },
          // For faceted search
          facets: {
            properties: {
              category: { type: 'keyword' },
              evidenceLevel: { type: 'keyword' },
              country: { type: 'keyword' },
            },
          },
        },
      },
    },
  });

  console.log('✓ Index created with mapping');

  // Wait for index to be ready
  await client.indices.refresh({ index: indexName });
  console.log('✓ Index is ready');

  await client.close();
  console.log('\n✅ Elasticsearch setup complete!');
}

setupIndex().catch(console.error);
EOF

echo -e "${GREEN}✓ Elasticsearch index setup script created${NC}"

# =============================================================================
# 6. Create Neo4j Database Setup Script
# =============================================================================
echo -e "${BLUE}Creating Neo4j database setup script...${NC}"

cat > "${PROJECT_ROOT}/scripts/setup-neo4j-database.js" << 'EOF'
/**
 * Neo4j Database Setup for Darwin-MFC
 * Creates the medical knowledge graph schema
 */

const neo4j = require('neo4j-driver');

async function setupDatabase() {
  const driver = neo4j.driver(
    process.env.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      process.env.NEO4J_USER || 'neo4j',
      process.env.NEO4J_PASSWORD || 'darwin-mfc-2025'
    )
  );

  const session = driver.session();
  const database = process.env.NEO4J_DATABASE || 'darwin';

  console.log(`Setting up Neo4j database: ${database}`);

  try {
    // Create constraints for unique nodes
    const constraints = [
      'CREATE CONSTRAINT IF NOT EXISTS FOR (d:Doença) REQUIRE d.id IS UNIQUE',
      'CREATE CONSTRAINT IF NOT EXISTS FOR (m:Medicamento) REQUIRE m.id IS UNIQUE',
      'CREATE CONSTRAINT IF NOT EXISTS FOR (s:Sintoma) REQUIRE s.id IS UNIQUE',
      'CREATE CONSTRAINT IF NOT EXISTS FOR (p:Procedimento) REQUIRE p.id IS UNIQUE',
      'CREATE CONSTRAINT IF NOT EXISTS FOR (l:Laboratório) REQUIRE l.id IS UNIQUE',
      'CREATE CONSTRAINT IF NOT EXISTS FOR (g:Gene) REQUIRE g.id IS UNIQUE',
      'CREATE CONSTRAINT IF NOT EXISTS FOR (v:VarianteGenética) REQUIRE v.id IS UNIQUE',
    ];

    for (const constraint of constraints) {
      await session.run(constraint);
      console.log(`✓ Created constraint: ${constraint.split('FOR')[1].split('REQUIRE')[0].trim()}`);
    }

    // Create indexes for common search patterns
    const indexes = [
      'CREATE INDEX IF NOT EXISTS FOR (d:Doença) ON (d.nome)',
      'CREATE INDEX IF NOT EXISTS FOR (d:Doença) ON (d.cid10)',
      'CREATE INDEX IF NOT EXISTS FOR (d:Doença) ON (d.snomedCT)',
      'CREATE INDEX IF NOT EXISTS FOR (m:Medicamento) ON (m.nome)',
      'CREATE INDEX IF NOT EXISTS FOR (m:Medicamento) ON (m.atcCode)',
      'CREATE INDEX IF NOT EXISTS FOR (s:Sintoma) ON (s.nome)',
      'CREATE INDEX IF NOT EXISTS FOR (g:Gene) ON (g.nome)',
    ];

    for (const index of indexes) {
      await session.run(index);
      console.log(`✓ Created index: ${index.split('ON')[1].trim()}`);
    }

    // Create full-text search indexes
    const fullTextIndexes = [
      'CREATE FULLTEXT INDEX disease_search IF NOT EXISTS FOR (d:Doença) ON EACH [d.nome, d.descricao]',
      'CREATE FULLTEXT INDEX medication_search IF NOT EXISTS FOR (m:Medicamento) ON EACH [m.nome, m.descricao]',
      'CREATE FULLTEXT INDEX symptom_search IF NOT EXISTS FOR (s:Sintoma) ON EACH [s.nome, s.descricao]',
    ];

    for (const index of fullTextIndexes) {
      await session.run(index);
      console.log(`✓ Created full-text index`);
    }

    console.log('\n✅ Neo4j database setup complete!');
  } finally {
    await session.close();
    await driver.close();
  }
}

setupDatabase().catch(console.error);
EOF

echo -e "${GREEN}✓ Neo4j database setup script created${NC}"

# =============================================================================
# 7. Create ClinPGx Test Script
# =============================================================================
echo -e "${BLUE}Creating ClinPGx test script...${NC}"

cat > "${PROJECT_ROOT}/scripts/test-clinpgx.js" << 'EOF'
/**
 * ClinPGx API Test Script
 * Tests connectivity and basic functionality
 */

const ClinPGxClient = require('../lib/pharmacogenetics/clinpgx-client').default;

async function testClinPGx() {
  console.log('Testing ClinPGx API connection...\n');

  const client = new ClinPGxClient({
    apiKey: process.env.CLINPGX_API_KEY,
    cacheTTL: 3600000,
  });

  try {
    // Test 1: Get variant info
    console.log('Test 1: Getting variant info for PA166104948 (CYP2C19*2)...');
    const variant = await client.getVariantInfo('PA166104948');
    console.log('✓ Variant:', variant.name);
    console.log('  Gene:', variant.geneSymbol);
    console.log('  Clinical Significance:', variant.clinicalSignificance);

    // Test 2: Get drug guidelines
    console.log('\nTest 2: Getting drug guidelines for PA128179466 (Clopidogrel)...');
    const guidelines = await client.getDrugGuidelines('PA128179466');
    console.log(`✓ Found ${guidelines.length} guidelines`);
    if (guidelines.length > 0) {
      console.log('  First guideline:', guidelines[0].name);
    }

    // Test 3: Get gene drugs
    console.log('\nTest 3: Getting drugs for CYP2C19 gene...');
    const drugs = await client.getGeneDrugs('CYP2C19');
    console.log(`✓ Found ${drugs.length} drugs`);
    if (drugs.length > 0) {
      console.log('  First 3 drugs:', drugs.slice(0, 3).map(d => d.name).join(', '));
    }

    console.log('\n✅ All ClinPGx tests passed!');
  } catch (error) {
    console.error('❌ ClinPGx test failed:', error.message);
    console.error('\nNote: You need a valid ClinPGx API key.');
    console.error('Get one at: https://api.pharmgkb.org/v1/account/register');
    process.exit(1);
  }
}

testClinPGx();
EOF

echo -e "${GREEN}✓ ClinPGx test script created${NC}"

# =============================================================================
# 8. Create Package.json Scripts
# =============================================================================
echo -e "${BLUE}Adding npm scripts...${NC}"

# Check if package.json has the scripts section
if grep -q '"sota:start"' "${PROJECT_ROOT}/package.json"; then
    echo -e "${YELLOW}SOTA scripts already exist in package.json${NC}"
else
    # Add SOTA scripts to package.json
    cat >> "${PROJECT_ROOT}/package.json" << 'EOF'

  # =============================================================================
  # SOTA Infrastructure Scripts
  # =============================================================================
  "sota:start": "docker-compose -f docker-compose.sota.yml up -d",
  "sota:stop": "docker-compose -f docker-compose.sota.yml down",
  "sota:restart": "docker-compose -f docker-compose.sota.yml restart",
  "sota:logs": "docker-compose -f docker-compose.sota.yml logs -f",
  "sota:setup:elasticsearch": "node scripts/setup-elasticsearch-index.js",
  "sota:setup:neo4j": "node scripts/setup-neo4j-database.js",
  "sota:test:clinpgx": "node scripts/test-clinpgx.js",
  "sota:setup:all": "npm run sota:setup:elasticsearch && npm run sota:setup:neo4j",
  "sota:test:all": "npm run sota:test:clinpgx"
EOF
    echo -e "${GREEN}✓ SOTA scripts added to package.json${NC}"
fi

# =============================================================================
# Summary
# =============================================================================
echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  Setup Complete!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo ""
echo -e "1. ${YELLOW}Start the SOTA services:${NC}"
echo -e "   ${GREEN}npm run sota:start${NC}"
echo ""
echo -e "2. ${YELLOW}Wait for services to be healthy (check with):${NC}"
echo -e "   ${GREEN}docker-compose -f docker-compose.sota.yml ps${NC}"
echo ""
echo -e "3. ${YELLOW}Setup Elasticsearch index:${NC}"
echo -e "   ${GREEN}npm run sota:setup:elasticsearch${NC}"
echo ""
echo -e "4. ${YELLOW}Setup Neo4j database:${NC}"
echo -e "   ${GREEN}npm run sota:setup:neo4j${NC}"
echo ""
echo -e "5. ${YELLOW}Get PharmGKB API key:${NC}"
echo -e "   Visit: ${GREEN}https://api.pharmgkb.org/v1/account/register${NC}"
echo -e "   Then add to .env.local: ${GREEN}PHARMGKB_API_KEY=your-key${NC}"
echo ""
echo -e "6. ${YELLOW}Test ClinPGx:${NC}"
echo -e "   ${GREEN}npm run sota:test:clinpgx${NC}"
echo ""
echo -e "${BLUE}Access URLs:${NC}"
echo -e "  - Elasticsearch: ${GREEN}http://localhost:9200${NC}"
echo -e "  - Kibana:        ${GREEN}http://localhost:5601${NC}"
echo -e "  - Neo4j Browser: ${GREEN}http://localhost:7474${NC}"
echo -e "  - Neo4j Bolt:    ${GREEN}bolt://localhost:7687${NC}"
echo ""
echo -e "${BLUE}Documentation:${NC}"
echo -e "  - See ${GREEN}SOTA_IMPLEMENTATION_GUIDE.md${NC} for usage examples"
echo ""
