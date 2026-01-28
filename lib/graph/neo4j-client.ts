/**
 * Neo4j Client for Darwin-MFC Knowledge Graph
 *
 * Provides typed queries for the medical knowledge graph.
 */

// =============================================================================
// TYPES
// =============================================================================

export interface Neo4jConfig {
  uri: string;
  username: string;
  password: string;
}

export interface Disease {
  id: string;
  name: string;
  nameEn: string;
  cid10: string[];
  ciap2: string[];
  category: string;
  prevalence: number;
}

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  atcCode: string;
  category: string;
}

export interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface DrugInteraction {
  medication1: Medication;
  medication2: Medication;
  severity: 'minor' | 'moderate' | 'major' | 'contraindicated';
  mechanism: string;
  clinicalEffect: string;
}

export interface PharmacogenomicInteraction {
  gene: string;
  medication: Medication;
  effect: 'poor' | 'intermediate' | 'normal' | 'rapid' | 'ultra';
  dosingRecommendation: string;
}

export interface DifferentialDiagnosis {
  disease: Disease;
  matchingSymptoms: Symptom[];
  score: number;
}

// =============================================================================
// NEO4J CLIENT
// =============================================================================

/**
 * Cliente Neo4j para queries no grafo de conhecimento médico.
 *
 * NOTA: Esta é uma implementação cliente-side que usa a REST API do Neo4j.
 * Para uso em produção, considere usar o driver oficial neo4j-driver.
 */
export class KnowledgeGraphClient {
  private config: Neo4jConfig;
  private baseUrl: string;

  constructor(config?: Partial<Neo4jConfig>) {
    this.config = {
      uri: config?.uri || process.env.NEO4J_URI || 'bolt://localhost:7687',
      username: config?.username || process.env.NEO4J_USER || 'neo4j',
      password: config?.password || process.env.NEO4J_PASSWORD || 'darwin2025'
    };

    // Convert bolt:// to http:// for REST API
    this.baseUrl = this.config.uri
      .replace('bolt://', 'http://')
      .replace(':7687', ':7474');
  }

  /**
   * Executa uma query Cypher via REST API.
   */
  private async runQuery<T>(cypher: string, params: Record<string, unknown> = {}): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}/db/neo4j/tx/commit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${this.config.username}:${this.config.password}`)
      },
      body: JSON.stringify({
        statements: [{
          statement: cypher,
          parameters: params
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Neo4j query failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors && data.errors.length > 0) {
      throw new Error(`Neo4j error: ${data.errors[0].message}`);
    }

    // Extract results from Neo4j response format
    const results = data.results[0];
    if (!results || !results.data) {
      return [];
    }

    return results.data.map((row: { row: unknown[] }) => {
      const obj: Record<string, unknown> = {};
      results.columns.forEach((col: string, idx: number) => {
        obj[col] = row.row[idx];
      });
      return obj as T;
    });
  }

  // ===========================================================================
  // DISEASE QUERIES
  // ===========================================================================

  /**
   * Busca doença por ID.
   */
  async getDiseaseById(id: string): Promise<Disease | null> {
    const results = await this.runQuery<Disease>(
      `MATCH (d:Disease {id: $id}) RETURN d.id as id, d.name as name, d.nameEn as nameEn,
       d.cid10 as cid10, d.ciap2 as ciap2, d.category as category, d.prevalence as prevalence`,
      { id }
    );
    return results[0] || null;
  }

  /**
   * Busca sintomas causados por uma doença.
   */
  async getSymptomsByDisease(diseaseId: string): Promise<Array<Symptom & { frequency: string }>> {
    return this.runQuery(
      `MATCH (d:Disease {id: $diseaseId})-[r:CAUSES]->(s:Symptom)
       RETURN s.id as id, s.name as name, s.severity as severity, r.frequency as frequency`,
      { diseaseId }
    );
  }

  /**
   * Busca medicamentos que tratam uma doença.
   */
  async getMedicationsByDisease(diseaseId: string): Promise<Array<Medication & { evidenceLevel: string; firstLine: boolean }>> {
    return this.runQuery(
      `MATCH (m:Medication)-[r:TREATS]->(d:Disease {id: $diseaseId})
       RETURN m.id as id, m.name as name, m.genericName as genericName,
              m.atcCode as atcCode, m.category as category,
              r.evidenceLevel as evidenceLevel, r.firstLine as firstLine`,
      { diseaseId }
    );
  }

  // ===========================================================================
  // MEDICATION QUERIES
  // ===========================================================================

  /**
   * Busca interações medicamentosas.
   */
  async getDrugInteractions(medicationId: string): Promise<DrugInteraction[]> {
    const results = await this.runQuery<{
      m1_id: string;
      m1_name: string;
      m2_id: string;
      m2_name: string;
      severity: string;
      mechanism: string;
      clinicalEffect: string;
    }>(
      `MATCH (m1:Medication {id: $medicationId})-[r:INTERACTS_WITH]-(m2:Medication)
       RETURN m1.id as m1_id, m1.name as m1_name,
              m2.id as m2_id, m2.name as m2_name,
              r.severity as severity, r.mechanism as mechanism, r.clinicalEffect as clinicalEffect`,
      { medicationId }
    );

    return results.map(r => ({
      medication1: { id: r.m1_id, name: r.m1_name } as Medication,
      medication2: { id: r.m2_id, name: r.m2_name } as Medication,
      severity: r.severity as DrugInteraction['severity'],
      mechanism: r.mechanism,
      clinicalEffect: r.clinicalEffect
    }));
  }

  /**
   * Busca interações farmacogenômicas para um medicamento.
   */
  async getPharmacogenomics(medicationId: string): Promise<PharmacogenomicInteraction[]> {
    const results = await this.runQuery<{
      gene: string;
      effect: string;
      dosingRecommendation: string;
    }>(
      `MATCH (g:Gene)-[r:METABOLIZES]->(m:Medication {id: $medicationId})
       RETURN g.id as gene, r.effect as effect, r.dosingRecommendation as dosingRecommendation`,
      { medicationId }
    );

    return results.map(r => ({
      gene: r.gene,
      medication: { id: medicationId } as Medication,
      effect: r.effect as PharmacogenomicInteraction['effect'],
      dosingRecommendation: r.dosingRecommendation
    }));
  }

  // ===========================================================================
  // DIAGNOSIS QUERIES
  // ===========================================================================

  /**
   * Diagnóstico diferencial baseado em sintomas.
   */
  async getDifferentialDiagnosis(symptomIds: string[]): Promise<DifferentialDiagnosis[]> {
    const results = await this.runQuery<{
      id: string;
      name: string;
      matchCount: number;
      matchingSymptoms: string[];
    }>(
      `MATCH (d:Disease)-[:CAUSES]->(s:Symptom)
       WHERE s.id IN $symptomIds
       WITH d, collect(s) as symptoms, count(s) as matchCount
       RETURN d.id as id, d.name as name, matchCount,
              [s IN symptoms | s.name] as matchingSymptoms
       ORDER BY matchCount DESC
       LIMIT 10`,
      { symptomIds }
    );

    return results.map(r => ({
      disease: { id: r.id, name: r.name } as Disease,
      matchingSymptoms: r.matchingSymptoms.map(name => ({ name } as Symptom)),
      score: r.matchCount / symptomIds.length
    }));
  }

  // ===========================================================================
  // HEALTH CHECK
  // ===========================================================================

  /**
   * Verifica conexão com Neo4j.
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.runQuery('RETURN 1 as ok');
      return true;
    } catch {
      return false;
    }
  }
}

// =============================================================================
// SINGLETON INSTANCE
// =============================================================================

let clientInstance: KnowledgeGraphClient | null = null;

/**
 * Obtém instância singleton do cliente Neo4j.
 */
export function getKnowledgeGraphClient(config?: Partial<Neo4jConfig>): KnowledgeGraphClient {
  if (!clientInstance) {
    clientInstance = new KnowledgeGraphClient(config);
  }
  return clientInstance;
}
