/**
 * Script de Verificação de Integração
 * Valida que todas as partes do sistema estão integradas corretamente
 */

import { doencasConsolidadas } from '../lib/data/doencas/index';
import { medicamentosConsolidados } from '../lib/data/medicamentos/index';
import { buildKnowledgeGraph } from '../lib/graph/builder';
import { isRTL, locales, defaultLocale } from '../i18n/config';
import { getDirection } from '../lib/i18n/utils';
import type { Doenca } from '../lib/types/doenca';
import type { Medicamento } from '../lib/types/medicamento';

interface VerificationResult {
  component: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: any;
}

const results: VerificationResult[] = [];

// Helper functions
function pass(component: string, message: string, details?: any) {
  results.push({ component, status: 'pass', message, details });
}

function fail(component: string, message: string, details?: any) {
  results.push({ component, status: 'fail', message, details });
}

function warn(component: string, message: string, details?: any) {
  results.push({ component, status: 'warning', message, details });
}

// 1. Verificar Ontologias
console.log('🔍 Verificando Ontologias...');

const diseasesWithLOINC = doencasConsolidadas.filter((d): d is Doenca => d.loinc !== undefined && Array.isArray(d.loinc) && d.loinc.length > 0);
const diseasesWithORDO = doencasConsolidadas.filter((d): d is Doenca => d.ordo !== undefined && Array.isArray(d.ordo) && d.ordo.length > 0);
const diseasesWithHPO = doencasConsolidadas.filter((d): d is Doenca => d.hpo !== undefined && Array.isArray(d.hpo) && d.hpo.length > 0);

if (diseasesWithLOINC.length > 0) {
  pass('LOINC', `LOINC integrado em ${diseasesWithLOINC.length} doenças`, { count: diseasesWithLOINC.length });
} else {
  warn('LOINC', 'Nenhuma doença com código LOINC encontrado');
}

if (diseasesWithORDO.length > 0) {
  pass('ORDO', `ORDO integrado em ${diseasesWithORDO.length} doenças`, { count: diseasesWithORDO.length });
} else {
  warn('ORDO', 'Nenhuma doença rara com código ORDO encontrado');
}

if (diseasesWithHPO.length > 0) {
  pass('HPO', `HPO integrado em ${diseasesWithHPO.length} doenças`, { count: diseasesWithHPO.length });
} else {
  warn('HPO', 'Nenhuma doença com código HPO encontrado');
}

// Verificar PharmGKB
const medicationsWithPharmGKB = medicamentosConsolidados.filter((m): m is Medicamento => m.pharmgkb !== undefined);

if (medicationsWithPharmGKB.length > 0) {
  pass('PharmGKB', `PharmGKB integrado em ${medicationsWithPharmGKB.length} medicamentos`, { count: medicationsWithPharmGKB.length });
} else {
  warn('PharmGKB', 'Nenhum medicamento com dados PharmGKB encontrado');
}

// 2. Verificar Grafo de Conhecimento
console.log('🔍 Verificando Grafo de Conhecimento...');

try {
  const graph = buildKnowledgeGraph();
  if (graph.nodes.length > 0 && graph.edges.length > 0) {
    pass('Knowledge Graph', `Grafo construído com ${graph.nodes.length} nós e ${graph.edges.length} arestas`, {
      nodes: graph.nodes.length,
      edges: graph.edges.length
    });
  } else {
    fail('Knowledge Graph', 'Grafo vazio ou mal construído', { nodes: graph.nodes.length, edges: graph.edges.length });
  }
} catch (error) {
  fail('Knowledge Graph', `Erro ao construir grafo: ${error}`, { error });
}

// 3. Verificar Traduções
console.log('🔍 Verificando Traduções...');

const requiredLocales = locales.length;
pass('Locales', `Configurados ${requiredLocales} idiomas: ${locales.join(', ')}`, { locales });

// Verificar RTL
const rtlLocale = locales.find(l => isRTL(l));
if (rtlLocale) {
  const direction = getDirection(rtlLocale);
  if (direction === 'rtl') {
    pass('RTL Support', `RTL configurado corretamente para ${rtlLocale}`, { locale: rtlLocale, direction });
  } else {
    fail('RTL Support', `RTL não configurado corretamente para ${rtlLocale}`, { locale: rtlLocale, direction });
  }
} else {
  warn('RTL Support', 'Nenhum locale RTL configurado');
}

// 4. Verificar Dados Médicos
console.log('🔍 Verificando Dados Médicos...');

if (doencasConsolidadas.length >= 100) {
  pass('Diseases', `${doencasConsolidadas.length} doenças disponíveis`, { count: doencasConsolidadas.length });
} else {
  warn('Diseases', `Apenas ${doencasConsolidadas.length} doenças disponíveis (meta: 100+)`, { count: doencasConsolidadas.length });
}

if (medicamentosConsolidados.length >= 100) {
  pass('Medications', `${medicamentosConsolidados.length} medicamentos disponíveis`, { count: medicamentosConsolidados.length });
} else {
  warn('Medications', `Apenas ${medicamentosConsolidados.length} medicamentos disponíveis (meta: 100+)`, { count: medicamentosConsolidados.length });
}

// Verificar que todas as doenças têm pelo menos CID-10 ou CIAP-2
const diseasesWithoutCodes = doencasConsolidadas.filter(d => 
  (!d.cid10 || (Array.isArray(d.cid10) && d.cid10.length === 0)) && 
  (!d.ciap2 || (Array.isArray(d.ciap2) && d.ciap2.length === 0))
);
if (diseasesWithoutCodes.length === 0) {
  pass('Disease Codes', 'Todas as doenças têm pelo menos CID-10 ou CIAP-2');
} else {
  warn('Disease Codes', `${diseasesWithoutCodes.length} doenças sem códigos CID-10 ou CIAP-2`, {
    diseases: diseasesWithoutCodes.map(d => d.id)
  });
}

// 5. Verificar Busca Semântica
console.log('🔍 Verificando Busca Semântica...');

try {
  const { semanticSearch } = require('../lib/search/semantic');
  if (typeof semanticSearch === 'function') {
    pass('Semantic Search', 'Função de busca semântica disponível');
  } else {
    fail('Semantic Search', 'Função de busca semântica não encontrada');
  }
} catch (error) {
  fail('Semantic Search', `Erro ao importar busca semântica: ${error}`, { error });
}

// 6. Resumo
console.log('\n' + '='.repeat(60));
console.log('📊 RESUMO DA VERIFICAÇÃO DE INTEGRAÇÃO');
console.log('='.repeat(60) + '\n');

const passed = results.filter(r => r.status === 'pass').length;
const failed = results.filter(r => r.status === 'fail').length;
const warnings = results.filter(r => r.status === 'warning').length;

results.forEach(result => {
  const icon = result.status === 'pass' ? '✅' : result.status === 'fail' ? '❌' : '⚠️';
  console.log(`${icon} [${result.component}] ${result.message}`);
  if (result.details) {
    console.log(`   Detalhes:`, result.details);
  }
});

console.log('\n' + '='.repeat(60));
console.log(`✅ Passou: ${passed} | ❌ Falhou: ${failed} | ⚠️  Avisos: ${warnings}`);
console.log('='.repeat(60) + '\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

