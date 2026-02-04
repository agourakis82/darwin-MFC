/**
 * Darwin-MFC Data Migration Script
 * =================================
 * Converts TypeScript data to PostgreSQL SQL statements
 *
 * Usage:
 *   npx ts-node scripts/migrate-to-postgresql.ts
 *
 * Output:
 *   api/setup/data-migration.sql
 */

import * as fs from 'fs';
import * as path from 'path';

// Import consolidated data
import { medicamentosConsolidados } from '../lib/data/medicamentos/index';
import { doencasConsolidadas } from '../lib/data/doencas/index';

// Helper to escape strings for SQL
function escapeSQL(value: any): string {
  if (value === null || value === undefined) {
    return 'NULL';
  }
  if (typeof value === 'boolean') {
    return value ? 'TRUE' : 'FALSE';
  }
  if (typeof value === 'number') {
    return String(value);
  }
  if (typeof value === 'object') {
    // Convert to JSONB
    const jsonStr = JSON.stringify(value)
      .replace(/'/g, "''"); // Escape single quotes
    return `'${jsonStr}'::jsonb`;
  }
  // String - escape single quotes
  const escaped = String(value).replace(/'/g, "''");
  return `'${escaped}'`;
}

// Generate SQL for medications
function generateMedicamentoSQL(med: any): string {
  const id = escapeSQL(med.id);
  const nome = escapeSQL(med.nomeGenerico || med.nome || '');
  const nomeComercial = escapeSQL(med.nomeComercial || med.nomesComerciais?.[0] || null);
  const classe = escapeSQL(med.classeTerapeutica || med.classe || '');
  const subclasse = escapeSQL(med.subclasse || null);
  const mecanismoAcao = escapeSQL(med.mecanismoAcao || null);
  const indicacoes = escapeSQL(med.indicacoes || []);
  const contraindicacoes = escapeSQL(med.contraindicacoes || []);
  const efeitosAdversos = escapeSQL(med.efeitosAdversos || med.reacoesAdversas || []);
  const posologia = escapeSQL(med.posologia || {});
  const interacoes = escapeSQL(med.interacoes || med.interacoesMedicamentosas || []);
  const atcCode = escapeSQL(med.codigoATC || med.atcCode || null);
  const disponivelSus = med.disponivelSUS === true ? 'TRUE' : 'FALSE';
  const custoTratamento = escapeSQL(med.custoTratamento || null);
  const nivelEvidencia = escapeSQL(med.nivelEvidencia || null);
  const regionalBr = escapeSQL(med.regionalOverlays?.BR || {});
  const regionalIn = escapeSQL(med.regionalOverlays?.IN || {});
  const regionalEu = escapeSQL(med.regionalOverlays?.EU || {});
  const referencias = escapeSQL(med.referencias || med.fontesRecomendacao || []);

  return `INSERT INTO medicamentos (id, nome, nome_comercial, classe, subclasse, mecanismo_acao, indicacoes, contraindicacoes, efeitos_adversos, posologia, interacoes, atc_code, disponivel_sus, custo_tratamento, nivel_evidencia, regional_br, regional_in, regional_eu, referencias)
VALUES (${id}, ${nome}, ${nomeComercial}, ${classe}, ${subclasse}, ${mecanismoAcao}, ${indicacoes}, ${contraindicacoes}, ${efeitosAdversos}, ${posologia}, ${interacoes}, ${atcCode}, ${disponivelSus}, ${custoTratamento}, ${nivelEvidencia}, ${regionalBr}, ${regionalIn}, ${regionalEu}, ${referencias})
ON CONFLICT (id) DO UPDATE SET
  nome = EXCLUDED.nome,
  nome_comercial = EXCLUDED.nome_comercial,
  classe = EXCLUDED.classe,
  mecanismo_acao = EXCLUDED.mecanismo_acao,
  indicacoes = EXCLUDED.indicacoes,
  contraindicacoes = EXCLUDED.contraindicacoes,
  efeitos_adversos = EXCLUDED.efeitos_adversos,
  posologia = EXCLUDED.posologia,
  disponivel_sus = EXCLUDED.disponivel_sus,
  updated_at = CURRENT_TIMESTAMP;`;
}

// Generate SQL for diseases
function generateDoencaSQL(doenca: any): string {
  const id = escapeSQL(doenca.id);
  // Disease data uses 'titulo' not 'nome'
  const nome = escapeSQL(doenca.titulo || doenca.nome || '');
  const nomePopular = escapeSQL(doenca.sinonimos?.[0] || doenca.nomePopular || null);
  const categoria = escapeSQL(doenca.categoria || doenca.especialidade || '');
  const cid10 = escapeSQL(doenca.cid10 || doenca.codigoCID10 || null);
  const ciap2 = escapeSQL(doenca.ciap2 || doenca.codigoCIAP2 || null);
  // Definition is in quickView.definicao
  const definicao = escapeSQL(doenca.quickView?.definicao || doenca.definicao || doenca.descricao || null);
  const epidemiologia = escapeSQL(doenca.fullContent?.epidemiologia || doenca.epidemiologia || {});
  const fatoresRisco = escapeSQL(doenca.fullContent?.fatoresRisco || doenca.fatoresRisco || doenca.fatoresDeRisco || []);
  const sinaisSintomas = escapeSQL(doenca.quickView?.criteriosDiagnosticos || doenca.sinaisSintomas || doenca.sintomas || []);
  const diagnostico = escapeSQL(doenca.fullContent?.diagnostico || doenca.diagnostico || doenca.criteriosDiagnosticos || {});
  const diagnosticoDiferencial = escapeSQL(doenca.fullContent?.diagnosticoDiferencial || doenca.diagnosticoDiferencial || []);
  const tratamento = escapeSQL(doenca.quickView?.tratamentoPrimeiraLinha || doenca.tratamento || {});
  const prevencao = escapeSQL(doenca.fullContent?.prevencao || doenca.prevencao || []);
  const prognostico = escapeSQL(doenca.fullContent?.prognostico || doenca.prognostico || null);
  const complicacoes = escapeSQL(doenca.fullContent?.complicacoes || doenca.complicacoes || []);
  const quandoEncaminhar = escapeSQL(doenca.quickView?.redFlags || doenca.quandoEncaminhar || doenca.criteriosEncaminhamento || []);
  const regionalBr = escapeSQL(doenca.regionalOverlays?.BR || {});
  const regionalIn = escapeSQL(doenca.regionalOverlays?.IN || {});
  const regionalEu = escapeSQL(doenca.regionalOverlays?.EU || {});
  const referencias = escapeSQL(doenca.fullContent?.referencias || doenca.referencias || []);

  return `INSERT INTO doencas (id, nome, nome_popular, categoria, cid10, ciap2, definicao, epidemiologia, fatores_risco, sinais_sintomas, diagnostico, diagnostico_diferencial, tratamento, prevencao, prognostico, complicacoes, quando_encaminhar, regional_br, regional_in, regional_eu, referencias)
VALUES (${id}, ${nome}, ${nomePopular}, ${categoria}, ${cid10}, ${ciap2}, ${definicao}, ${epidemiologia}, ${fatoresRisco}, ${sinaisSintomas}, ${diagnostico}, ${diagnosticoDiferencial}, ${tratamento}, ${prevencao}, ${prognostico}, ${complicacoes}, ${quandoEncaminhar}, ${regionalBr}, ${regionalIn}, ${regionalEu}, ${referencias})
ON CONFLICT (id) DO UPDATE SET
  nome = EXCLUDED.nome,
  categoria = EXCLUDED.categoria,
  cid10 = EXCLUDED.cid10,
  definicao = EXCLUDED.definicao,
  sinais_sintomas = EXCLUDED.sinais_sintomas,
  tratamento = EXCLUDED.tratamento,
  updated_at = CURRENT_TIMESTAMP;`;
}

// Generate ontology mappings
function generateOntologiaSQL(sourceType: string, sourceId: string, ontologyType: string, code: string | null, name?: string): string | null {
  if (!code) return null;
  const escapedSourceId = escapeSQL(sourceId);
  const escapedCode = escapeSQL(code);
  const escapedName = escapeSQL(name || null);
  return `INSERT INTO ontologias (source_type, source_id, ontology_type, ontology_code, ontology_name)
VALUES ('${sourceType}', ${escapedSourceId}, '${ontologyType}', ${escapedCode}, ${escapedName})
ON CONFLICT (source_type, source_id, ontology_type, ontology_code) DO NOTHING;`;
}

// Main migration function
async function migrate() {
  console.log('Darwin-MFC Data Migration');
  console.log('=========================\n');

  const outputPath = path.join(__dirname, '../api/setup/data-migration.sql');
  const outputDir = path.dirname(outputPath);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let sql = `-- Darwin-MFC Data Migration
-- Generated: ${new Date().toISOString()}
-- ==========================================

BEGIN;

`;

  // Migrate medications
  console.log(`Processing ${medicamentosConsolidados.length} medications...`);
  sql += `-- ============================================\n`;
  sql += `-- MEDICAMENTOS (${medicamentosConsolidados.length} records)\n`;
  sql += `-- ============================================\n\n`;

  let medCount = 0;
  const ontologias: string[] = [];

  for (const med of medicamentosConsolidados) {
    try {
      sql += generateMedicamentoSQL(med) + '\n\n';
      medCount++;

      // Generate ontology mappings
      if (med.codigoATC || med.atcCode) {
        const ont = generateOntologiaSQL('medicamento', med.id, 'atc', med.codigoATC || med.atcCode);
        if (ont) ontologias.push(ont);
      }
    } catch (err) {
      console.error(`Error processing medication ${med.id}:`, err);
    }
  }

  // Migrate diseases
  console.log(`Processing ${doencasConsolidadas.length} diseases...`);
  sql += `-- ============================================\n`;
  sql += `-- DOENCAS (${doencasConsolidadas.length} records)\n`;
  sql += `-- ============================================\n\n`;

  let doencaCount = 0;

  for (const doenca of doencasConsolidadas) {
    try {
      sql += generateDoencaSQL(doenca) + '\n\n';
      doencaCount++;

      // Generate ontology mappings
      const cid10 = doenca.cid10 || doenca.codigoCID10;
      const ciap2 = doenca.ciap2 || doenca.codigoCIAP2;

      if (cid10) {
        const ont = generateOntologiaSQL('doenca', doenca.id, 'cid10', cid10, doenca.nome);
        if (ont) ontologias.push(ont);
      }
      if (ciap2) {
        const ont = generateOntologiaSQL('doenca', doenca.id, 'ciap2', ciap2);
        if (ont) ontologias.push(ont);
      }
    } catch (err) {
      console.error(`Error processing disease ${doenca.id}:`, err);
    }
  }

  // Add ontology mappings
  if (ontologias.length > 0) {
    sql += `-- ============================================\n`;
    sql += `-- ONTOLOGIAS (${ontologias.length} mappings)\n`;
    sql += `-- ============================================\n\n`;
    sql += ontologias.join('\n') + '\n\n';
  }

  sql += `
COMMIT;

-- Verify counts
SELECT 'medicamentos' as tabela, COUNT(*) as total FROM medicamentos
UNION ALL
SELECT 'doencas', COUNT(*) FROM doencas
UNION ALL
SELECT 'ontologias', COUNT(*) FROM ontologias;
`;

  // Write to file
  fs.writeFileSync(outputPath, sql, 'utf-8');

  console.log('\n✅ Migration complete!');
  console.log(`   - Medications: ${medCount}`);
  console.log(`   - Diseases: ${doencaCount}`);
  console.log(`   - Ontology mappings: ${ontologias.length}`);
  console.log(`\n📄 Output: ${outputPath}`);
  console.log(`   Size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
  console.log('\nNext steps:');
  console.log('1. Upload data-migration.sql to Locaweb');
  console.log('2. Import via phpMyAdmin or psql');
}

// Run migration
migrate().catch(console.error);
