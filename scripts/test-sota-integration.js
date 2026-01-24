/**
 * SOTA Integration Test Script
 * Tests Elasticsearch, Neo4j, and PharmGKB integration
 */

require('dotenv').config({ path: '.env.local' });

const { Client } = require('@elastic/elasticsearch');
const neo4j = require('neo4j-driver');

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
}

function logInfo(message) {
  log(`ℹ ${message}`, colors.blue);
}

function logSection(title) {
  console.log('\n' + '='.repeat(50));
  log(title, colors.cyan);
  console.log('='.repeat(50));
}

// Test Elasticsearch
async function testElasticsearch() {
  logSection('Testing Elasticsearch');

  const client = new Client({
    node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
  });

  try {
    // Check cluster health
    const health = await client.cluster.health();
    logSuccess(`Cluster status: ${health.status}`);
    logInfo(`Nodes: ${health.number_of_nodes}`);

    // Check index exists
    const indexName = process.env.ELASTICSEARCH_INDEX || 'darwin-medical-content';
    const indexExists = await client.indices.exists({ index: indexName });

    if (indexExists) {
      logSuccess(`Index '${indexName}' exists`);

      // Count documents
      const count = await client.count({ index: indexName });
      logInfo(`Documents in index: ${count.count}`);

      // Test search
      const searchResult = await client.search({
        index: indexName,
        body: {
          query: {
            match_all: {},
          },
          size: 1,
        },
      });

      if (searchResult.hits.hits.length > 0) {
        const doc = searchResult.hits.hits[0];
        logSuccess(`Search works - found document: ${doc._id}`);
      }
    } else {
      logError(`Index '${indexName}' does not exist`);
      logInfo('Run: npm run sota:setup:elasticsearch');
    }

    await client.close();
    return true;
  } catch (error) {
    logError(`Elasticsearch test failed: ${error.message}`);
    logInfo('Make sure Elasticsearch is running: npm run sota:start');
    return false;
  }
}

// Test Neo4j
async function testNeo4j() {
  logSection('Testing Neo4j');

  const driver = neo4j.driver(
    process.env.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      process.env.NEO4J_USER || 'neo4j',
      process.env.NEO4J_PASSWORD || 'darwin-mfc-2025'
    )
  );

  const session = driver.session();

  try {
    // Test connection
    const result = await session.run('RETURN 1 as num');
    logSuccess('Connection established');

    // Count nodes
    const nodeCount = await session.run('MATCH (n) RETURN count(n) as count');
    const nodes = nodeCount.records[0].get('count').toNumber();
    logInfo(`Total nodes: ${nodes}`);

    // Count relationships
    const edgeCount = await session.run('MATCH ()-[r]->() RETURN count(r) as count');
    const edges = edgeCount.records[0].get('count').toNumber();
    logInfo(`Total relationships: ${edges}`);

    if (nodes > 0) {
      logSuccess('Database contains data');
    } else {
      logError('Database is empty');
      logInfo('Run: npm run sota:setup:neo4j');
    }

    await session.close();
    await driver.close();
    return true;
  } catch (error) {
    logError(`Neo4j test failed: ${error.message}`);
    logInfo('Make sure Neo4j is running: npm run sota:start');
    logInfo('Check credentials in .env.local');
    await session.close();
    await driver.close();
    return false;
  }
}

// Test PharmGKB
async function testPharmGKB() {
  logSection('Testing PharmGKB');

  const apiKey = process.env.PHARMGKB_API_KEY;

  if (!apiKey || apiKey === 'your-api-key-here') {
    logError('PHARMGKB_API_KEY not configured');
    logInfo('Get API key at: https://api.pharmgkb.org/v1/account/register');
    logInfo('Add to .env.local: PHARMGKB_API_KEY=your-key');
    return false;
  }

  try {
    const apiUrl = process.env.PHARMGKB_API_URL || 'https://api.pharmgkb.org/v1';

    // Test variant endpoint
    const response = await fetch(`${apiUrl}/data/variant/PA166104948`, {
      headers: {
        'Authorization': apiKey,
      },
    });

    if (response.ok) {
      const data = await response.json();
      logSuccess('API connection works');
      logInfo(`Variant: ${data.name}`);
      logInfo(`Gene: ${data.geneSymbol}`);
      return true;
    } else {
      logError(`API returned status: ${response.status}`);
      if (response.status === 401) {
        logInfo('Invalid API key - check your PHARMGKB_API_KEY');
      }
      return false;
    }
  } catch (error) {
    logError(`PharmGKB test failed: ${error.message}`);
    logInfo('Check your internet connection and API key');
    return false;
  }
}

// Main test runner
async function runTests() {
  log('============================================', colors.cyan);
  log('  SOTA Infrastructure Integration Test', colors.cyan);
  log('  Darwin-MFC', colors.cyan);
  log('============================================', colors.cyan);

  const results = {
    elasticsearch: await testElasticsearch(),
    neo4j: await testNeo4j(),
    pharmgkb: await testPharmGKB(),
  };

  // Summary
  logSection('Test Summary');
  logSuccess(`Elasticsearch: ${results.elasticsearch ? 'PASS' : 'FAIL'}`);
  logSuccess(`Neo4j: ${results.neo4j ? 'PASS' : 'FAIL'}`);
  logSuccess(`PharmGKB: ${results.pharmgkb ? 'PASS' : 'FAIL'}`);

  const allPassed = Object.values(results).every(r => r);

  if (allPassed) {
    log('\n🎉 All tests passed!', colors.green);
    log('\nAccess URLs:', colors.cyan);
    log('  - Elasticsearch: http://localhost:9200', colors.reset);
    log('  - Kibana: http://localhost:5601', colors.reset);
    log('  - Neo4j Browser: http://localhost:7474', colors.reset);
    log('  - Neo4j Bolt: bolt://localhost:7687', colors.reset);
  } else {
    log('\n❌ Some tests failed. Check the errors above.', colors.red);
  }

  process.exit(allPassed ? 0 : 1);
}

runTests();
