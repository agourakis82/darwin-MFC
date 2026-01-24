/**
 * Elasticsearch Client for Medical Search with Vector Search
 * State of the Art Implementation
 */

import { Client } from '@elastic/elasticsearch';

// ============================================================================
// TYPES
// ============================================================================

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  score: number;
  highlight?: {
    title?: string[];
    description?: string[];
  };
}

export interface SearchOptions {
  category?: string;
  evidenceLevel?: string;
  region?: 'BR' | 'IN' | 'EU';
  limit?: number;
  offset?: number;
}

export interface FacetedSearchResult {
  results: SearchResult[];
  aggregations: {
    categories: { key: string; docCount: number }[];
    evidenceLevels: { key: string; docCount: number }[];
    regions: { key: string; docCount: number }[];
  };
}

export interface MedicalIndexDocument {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  embedding?: number[];
  // Ontology codes
  cid10?: string[];
  snomedCT?: string[];
  ciap2?: string[];
  // Regional data
  regionalPrevalence?: {
    region: 'BR' | 'IN' | 'EU';
    value: string;
    source: string;
  }[];
  // Evidence
  evidenceLevel?: string;
  lastUpdate: string;
}

// ============================================================================
// MEDICAL SEARCH ENGINE
// ============================================================================

export class MedicalSearchEngine {
  private client: Client;
  private indexName: string;

  constructor() {
    const elasticsearchUrl = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';
    const apiKey = process.env.ELASTICSEARCH_API_KEY;

    this.client = new Client({
      node: elasticsearchUrl,
      ...(apiKey && { auth: { apiKey } }),
      maxRetries: 3,
      requestTimeout: 30000,
    });

    this.indexName = 'darwin-medical-content';
  }

  // ==========================================================================
  // INDEX MANAGEMENT
  // ==========================================================================

  async createMedicalIndex(): Promise<void> {
    const indexExists = await this.client.indices.exists({
      index: this.indexName,
    });

    if (indexExists) {
      console.log(`Index ${this.indexName} already exists`);
      return;
    }

    await this.client.indices.create({
      index: this.indexName,
      body: {
        settings: {
          analysis: {
            analyzer: {
              portuguese_medical: {
                type: 'custom',
                tokenizer: 'standard',
                filter: [
                  'lowercase',
                  'stemmer',
                  'stop',
                  'synonym_medical'
                ]
              },
              english_medical: {
                type: 'custom',
                tokenizer: 'standard',
                filter: [
                  'lowercase',
                  'stemmer',
                  'stop',
                  'synonym_medical'
                ]
              }
            },
            filter: {
              synonym_medical: {
                type: 'synonym',
                synonyms: [
                  'hipertensao,ha,hta,pressao alta',
                  'diabetes,diabetes mellitus,hiperglicemia',
                  'asma,bronquite asmatica,asma bronquial',
                  'cancer,tumor,neoplasia,malignidade'
                ]
              }
            }
          }
        },
        mappings: {
          properties: {
            id: { type: 'keyword' },
            title: {
              type: 'text',
              analyzer: 'portuguese_medical',
              fields: {
                english: { analyzer: 'english_medical' },
                keyword: { type: 'keyword' }
              }
            },
            description: {
              type: 'text',
              analyzer: 'portuguese_medical',
              fields: {
                english: { analyzer: 'english_medical' }
              }
            },
            category: { type: 'keyword' },
            tags: { type: 'keyword' },
            // Vector embeddings for semantic search
            embedding: {
              type: 'dense_vector',
              dims: 768,
              index: true,
              similarity: 'cosine'
            },
            // Ontology codes
            cid10: { type: 'keyword' },
            snomedCT: { type: 'keyword' },
            ciap2: { type: 'keyword' },
            // Regional data
            regionalPrevalence: {
              type: 'nested',
              properties: {
                region: { type: 'keyword' },
                value: { type: 'text' },
                source: { type: 'keyword' }
              }
            },
            // Evidence
            evidenceLevel: { type: 'keyword' },
            lastUpdate: { type: 'date' }
          }
        }
      }
    });

    console.log(`Index ${this.indexName} created successfully`);
  }

  async deleteIndex(): Promise<void> {
    await this.client.indices.delete({
      index: this.indexName,
      ignore_unavailable: true
    });
    console.log(`Index ${this.indexName} deleted`);
  }

  // ==========================================================================
  // DOCUMENT OPERATIONS
  // ==========================================================================

  async indexDocument(doc: MedicalIndexDocument): Promise<void> {
    await this.client.index({
      index: this.indexName,
      id: doc.id,
      body: doc,
      refresh: true
    });
  }

  async bulkIndexDocuments(docs: MedicalIndexDocument[]): Promise<void> {
    const operations = docs.flatMap(doc => [
      { index: { _index: this.indexName, _id: doc.id } },
      doc
    ]);

    await this.client.bulk({
      refresh: true,
      body: operations
    });

    console.log(`Indexed ${docs.length} documents`);
  }

  async updateDocument(id: string, doc: Partial<MedicalIndexDocument>): Promise<void> {
    await this.client.update({
      index: this.indexName,
      id,
      body: { doc },
      refresh: true
    });
  }

  async deleteDocument(id: string): Promise<void> {
    await this.client.delete({
      index: this.indexName,
      id,
      refresh: true
    });
  }

  // ==========================================================================
  // SEARCH OPERATIONS
  // ==========================================================================

  /**
   * Hybrid search combining keyword and vector search
   */
  async hybridSearch(
    query: string,
    options: SearchOptions = {}
  ): Promise<SearchResult[]> {
    const limit = options.limit || 20;
    const offset = options.offset || 0;

    // 1. Keyword search
    const keywordResults = await this.client.search<SearchResult>({
      index: this.indexName,
      from: offset,
      size: limit * 2, // Get more for RRF
      body: {
        query: this.buildKeywordQuery(query, options),
        highlight: {
          fields: {
            title: {},
            description: {}
          },
          pre_tags: ['<mark>'],
          post_tags: ['</mark>']
        }
      }
    }
    });

    // 2. Vector search (if embeddings available)
    let vectorResults: typeof keywordResults;
    try {
      const queryEmbedding = await this.generateEmbedding(query);
      vectorResults = await this.client.search<SearchResult>({
        index: this.indexName,
        from: offset,
        size: limit * 2,
        body: {
          query: {
            script_score: {
              query: { match_all: {} },
              script: {
                source: 'cosineSimilarity(params.query_vector, "embedding") + 1.0',
                params: { query_vector: queryEmbedding }
              }
            }
          }
        }
      });
    } catch (error) {
      console.warn('Vector search failed, falling back to keyword only:', error);
    }

    // 3. Combine results using Reciprocal Rank Fusion (RRF)
    return this.reciprocalRankFusion(
      keywordResults.hits.hits,
      vectorResults.hits.hits,
      limit
    );
  }

  /**
   * Search by ontology code
   */
  async searchByOntologyCode(
    code: string,
    ontology: 'cid10' | 'snomedCT' | 'ciap2'
  ): Promise<SearchResult[]> {
    const result = await this.client.search<SearchResult>({
      index: this.indexName,
      body: {
        query: {
          term: {
            [ontology]: code
          }
        }
      }
    });

    return result.hits.hits.map(hit => ({
      ...hit._source,
      score: hit._score
    }));
  }

  /**
   * Faceted search with aggregations
   */
  async facetedSearch(
    query: string,
    options: SearchOptions = {}
  ): Promise<FacetedSearchResult> {
    const limit = options.limit || 20;
    const offset = options.offset || 0;

    const result = await this.client.search<SearchResult>({
      index: this.indexName,
      from: offset,
      size: limit,
      body: {
        query: this.buildKeywordQuery(query, options),
        aggs: {
          categories: {
            terms: { field: 'category', size: 20 }
          },
          evidenceLevels: {
            terms: { field: 'evidenceLevel', size: 10 }
          },
          regions: {
            nested: {
              path: 'regionalPrevalence'
            },
            aggs: {
              regions: {
                terms: { field: 'regionalPrevalence.region', size: 10 }
              }
            }
          }
        }
      }
    });

    return {
      results: result.hits.hits.map(hit => ({
        ...hit._source,
        score: hit._score,
        highlight: hit.highlight
      })),
      aggregations: {
        categories: result.aggregations.categories.buckets.map(b => ({
          key: b.key,
          docCount: b.doc_count
        })),
        evidenceLevels: result.aggregations.evidenceLevels.buckets.map(b => ({
          key: b.key,
          docCount: b.doc_count
        })),
        regions: result.aggregations.regions.regions.buckets.map(b => ({
          key: b.key,
          docCount: b.doc_count
        }))
      }
    };
  }

  // ==========================================================================
  // PRIVATE METHODS
  // ==========================================================================

  private buildKeywordQuery(query: string, options: SearchOptions) {
    const filters: any[] = [];

    if (options.category) {
      filters.push({ term: { category: options.category } });
    }

    if (options.evidenceLevel) {
      filters.push({ term: { evidenceLevel: options.evidenceLevel } });
    }

    if (options.region) {
      filters.push({
        nested: {
          path: 'regionalPrevalence',
          query: {
            term: { 'regionalPrevalence.region': options.region }
          }
        }
      });
    }

    return {
      bool: {
        must: [
          {
            multi_match: {
              query,
              fields: [
                'title^3',
                'title.keyword^4',
                'description^2',
                'tags^2'
              ],
              fuzziness: 'AUTO',
              operator: 'and'
            }
          }
        ],
        ...(filters.length > 0 && { filter: filters })
      }
    };
  }

  private async generateEmbedding(text: string): Promise<number[]> {
    // Try to use OpenAI embeddings
    if (process.env.OPENAI_API_KEY) {
      try {
        const response = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'text-embedding-3-small',
            input: text
          })
        });

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data[0].embedding;
      } catch (error) {
        console.warn('OpenAI embeddings failed, using fallback:', error);
      }
    }

    // Fallback: Simple hash-based embedding (not ideal, but works)
    return this.generateFallbackEmbedding(text);
  }

  private generateFallbackEmbedding(text: string): number[] {
    // Simple hash-based embedding for fallback
    // In production, use a local model like sentence-transformers
    const size = 768;
    const embedding = new Array(size).fill(0);

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      const index = (charCode * 7 + i * 13) % size;
      embedding[index] += charCode / 255;
    }

    // Normalize
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => magnitude > 0 ? val / magnitude : 0);
  }

  private reciprocalRankFusion(
    results1: any[],
    results2: any[],
    k: number = 60,
    limit: number = 20
  ): SearchResult[] {
    const scores = new Map<string, number>();

    results1.forEach((hit, i) => {
      const id = hit._source.id;
      scores.set(id, (scores.get(id) || 0) + 1 / (k + i + 1));
    });

    results2.forEach((hit, i) => {
      const id = hit._source.id;
      scores.set(id, (scores.get(id) || 0) + 1 / (k + i + 1));
    });

    return Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id]) => {
        const hit = results1.find(h => h._source.id === id) || results2.find(h => h._source.id === id);
        return {
          ...hit._source,
          score: scores.get(id)!,
          highlight: hit.highlight
        };
      });
  }

  // ==========================================================================
  // HEALTH CHECK
  // ==========================================================================

  async healthCheck(): Promise<boolean> {
    try {
      await this.client.ping();
      return true;
    } catch (error) {
      console.error('Elasticsearch health check failed:', error);
      return false;
    }
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

let searchEngineInstance: MedicalSearchEngine | null = null;

export function getSearchEngine(): MedicalSearchEngine {
  if (!searchEngineInstance) {
    searchEngineInstance = new MedicalSearchEngine();
  }
  return searchEngineInstance;
}

export async function initializeSearchEngine(): Promise<void> {
  const engine = getSearchEngine();
  
  if (await engine.healthCheck()) {
    console.log('Elasticsearch is healthy');
  } else {
    console.warn('Elasticsearch is not available, search will be degraded');
  }
}
