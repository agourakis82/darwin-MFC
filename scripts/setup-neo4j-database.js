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
