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
