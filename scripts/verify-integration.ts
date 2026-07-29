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
import { allCalculators, meld3 } from '../lib/calculators/calculators';
import { getMedicamentosForDoenca } from '../lib/data/cross-references';
import { generateDifferentialDiagnosis } from '../lib/utils/differential-diagnosis';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

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

if (medicationsWithPharmGKB.length >= 50) {
  pass('PharmGKB', `PharmGKB integrado em ${medicationsWithPharmGKB.length} medicamentos (meta: 50+)`, { count: medicationsWithPharmGKB.length });
} else if (medicationsWithPharmGKB.length > 0) {
  warn('PharmGKB', `PharmGKB integrado em ${medicationsWithPharmGKB.length} medicamentos (meta: 50+, progresso: ${Math.round(medicationsWithPharmGKB.length/50*100)}%)`, { count: medicationsWithPharmGKB.length, target: 50, progress: `${Math.round(medicationsWithPharmGKB.length/50*100)}%` });
} else {
  warn('PharmGKB', 'Nenhum medicamento com dados PharmGKB encontrado');
}

// Count total LOINC codes across diseases
const totalLoincCodes = diseasesWithLOINC.reduce((sum, d) => sum + (d.loinc?.length || 0), 0);
if (totalLoincCodes >= 500) {
  pass('LOINC Coverage', `${totalLoincCodes} códigos LOINC mapeados (meta: 500+)`, { count: totalLoincCodes });
} else if (totalLoincCodes > 0) {
  warn('LOINC Coverage', `${totalLoincCodes} códigos LOINC mapeados (meta: 500+, progresso: ${Math.round(totalLoincCodes/500*100)}%)`, { count: totalLoincCodes, target: 500, progress: `${Math.round(totalLoincCodes/500*100)}%` });
}

// Count citations with GRADE evidence levels
type CitationWithEvidence = { evidenceLevel?: string; studyType?: string };
const countCitationsWithGrade = (obj: any): number => {
  let count = 0;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (item && typeof item === 'object') {
        if ('evidenceLevel' in item) count++;
        count += countCitationsWithGrade(item);
      }
    }
  } else if (obj && typeof obj === 'object') {
    for (const value of Object.values(obj)) {
      count += countCitationsWithGrade(value);
    }
  }
  return count;
};

const totalCitationsWithGrade = doencasConsolidadas.reduce((sum, d) => sum + countCitationsWithGrade(d), 0);
const gradeTarget = 500; // Target: 500+ citations with evidence levels
if (totalCitationsWithGrade >= gradeTarget) {
  pass('GRADE Evidence', `${totalCitationsWithGrade} citações com nível de evidência GRADE (meta: ${gradeTarget}+)`, { count: totalCitationsWithGrade });
} else if (totalCitationsWithGrade > 0) {
  warn('GRADE Evidence', `${totalCitationsWithGrade} citações com nível de evidência GRADE (meta: ${gradeTarget}+, progresso: ${Math.round(totalCitationsWithGrade/gradeTarget*100)}%)`, { count: totalCitationsWithGrade, target: gradeTarget, progress: `${Math.round(totalCitationsWithGrade/gradeTarget*100)}%` });
} else {
  warn('GRADE Evidence', 'Nenhuma citação com nível de evidência GRADE encontrado');
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

// Verificar calculadoras clínicas e um vetor conhecido do MELD 3.0
const calculatorIds = new Set(allCalculators.map(calculator => calculator.id));
if (calculatorIds.size === allCalculators.length && calculatorIds.has('meld-3')) {
  pass('Clinical Calculators', `${allCalculators.length} calculadoras registradas com IDs únicos`);
} else {
  fail('Clinical Calculators', 'Registro duplicado ou MELD 3.0 ausente', {
    count: allCalculators.length,
    uniqueIds: calculatorIds.size,
  });
}

const meld3KnownVector = meld3.calculate({
  creatinine: 1.2,
  bilirubin: 3,
  inr: 1.5,
  sodium: 132,
  albumin: 2.8,
  sex: 1,
  dialysis: 0,
});

if (meld3KnownVector === 22) {
  pass('MELD 3.0', 'Vetor de referência calculado corretamente (22 pontos)');
} else {
  fail('MELD 3.0', `Vetor de referência retornou ${meld3KnownVector}; esperado 22`);
}

const respiratoryDifferential = generateDifferentialDiagnosis('Tosse', ['Febre', 'Dispneia']);
const leadingRespiratoryDiagnosis = respiratoryDifferential.diagnosticosDiferenciais[0]?.doenca.id;
if (leadingRespiratoryDiagnosis === 'pneumonia-comunitaria') {
  pass('Clinical Decision Support', 'PAC lidera o diferencial para tosse + febre + dispneia');
} else {
  fail('Clinical Decision Support', `Diferencial respiratório liderado por ${leadingRespiratoryDiagnosis || 'nenhuma hipótese'}`);
}

const pediatricRespiratoryDifferential = generateDifferentialDiagnosis(
  'Tosse',
  ['Febre', 'Dor de Garganta', 'Coriza'],
  [],
  { ageValue: 4, ageUnit: 'anos', weightKg: 18 }
);
const pediatricLeaders = pediatricRespiratoryDifferential.diagnosticosDiferenciais.slice(0, 5);
const pediatricLeader = pediatricLeaders[0]?.doenca.id;
const pediatricPneumoniaIndex = pediatricLeaders.findIndex(item => item.doenca.id === 'pneumonia-adquirida-comunidade-pediatrica');
const adultPneumoniaIndex = pediatricLeaders.findIndex(item => item.doenca.id === 'pneumonia-comunitaria');
const adultCopdInLeaders = pediatricLeaders.some(item => item.doenca.id === 'dpoc');
if (
  pediatricLeader === 'ivas-pediatrica'
  && pediatricPneumoniaIndex >= 0
  && (adultPneumoniaIndex < 0 || pediatricPneumoniaIndex < adultPneumoniaIndex)
  && !adultCopdInLeaders
) {
  pass('Pediatric Decision Support', 'Idade pediátrica prioriza IVAS e PAC pediátrica sem DPOC no top 5');
} else {
  fail('Pediatric Decision Support', 'Ordenação pediátrica inconsistente', {
    leaders: pediatricLeaders.map(item => item.doenca.id),
  });
}

try {
  const kernelDir = resolve(process.cwd(), 'public/clinical-kernel');
  const receiptBytes = readFileSync(resolve(kernelDir, 'clinical-kernel.receipt.json'));
  const receipt = JSON.parse(receiptBytes.toString('utf8'));
  const evidenceBytes = readFileSync(resolve(kernelDir, 'evidence-bundle.json'));
  const modelBytes = readFileSync(resolve(kernelDir, 'clinical-model.bin'));
  const wasmBytes = readFileSync(resolve(kernelDir, 'clinical-kernel.wasm'));
  const calibrationBytes = readFileSync(resolve(kernelDir, 'calibration-certificate.json'));
  const calibration = JSON.parse(calibrationBytes.toString('utf8'));
  const policyBytes = readFileSync(resolve(kernelDir, 'epistemic-firewall.policy.json'));
  const policy = JSON.parse(policyBytes.toString('utf8'));
  const firewallReceipt = JSON.parse(
    readFileSync(resolve(kernelDir, 'epistemic-firewall.receipt.json'), 'utf8'),
  );
  const hash = (value: Buffer) => createHash('sha256').update(value).digest('hex');
  const hashesMatch = hash(evidenceBytes) === receipt.hashes.evidenceSha256
    && hash(modelBytes) === receipt.hashes.modelSha256
    && hash(wasmBytes) === receipt.hashes.wasmSha256
    && hash(calibrationBytes) === receipt.hashes.calibrationCertificateSha256
    && hash(policyBytes) === receipt.hashes.epistemicFirewallPolicySha256
    && hash(receiptBytes) === firewallReceipt.hashes.clinicalReceiptSha256;
  const tamperedWasm = Buffer.from(wasmBytes);
  tamperedWasm[tamperedWasm.length - 1] ^= 1;
  const tamperedPolicy = Buffer.from(policyBytes);
  tamperedPolicy[tamperedPolicy.length - 2] ^= 1;
  const tamperedCalibration = Buffer.from(calibrationBytes);
  tamperedCalibration[tamperedCalibration.length - 2] ^= 1;
  const tamperDetected = hash(tamperedWasm) !== receipt.hashes.wasmSha256
    && hash(tamperedPolicy) !== receipt.hashes.epistemicFirewallPolicySha256
    && hash(tamperedCalibration) !== receipt.hashes.calibrationCertificateSha256;
  const instance = new WebAssembly.Instance(
    new WebAssembly.Module(wasmBytes),
    { env: { log: Math.log } },
  );
  const abiAvailable = instance.exports.memory instanceof WebAssembly.Memory
    && typeof instance.exports.infer === 'function'
    && typeof instance.exports.next_question === 'function'
    && receipt.abi.informationGainOffsetBytes === 288
    && receipt.abi.nextQuestionOffsetBytes === 384
    && receipt.abi.outputBytes === 400
    && receipt.abi.imports?.[0]?.module === 'env'
    && receipt.abi.imports?.[0]?.name === 'log';
  const gatesPassed = receipt.status === 'experimental'
    && receipt.schemaVersion === 'darwin.sounio.clinical-receipt.v2'
    && receipt.gates.nativeOracleExecuted === true
    && receipt.gates.nativeWasmParity === true
    && receipt.gates.informationGainParity === true
    && receipt.gates.epistemicFirewallOracleExecuted === true
    && receipt.gates.epistemicFirewallPolicyTableComplete === true
    && receipt.gates.retrospectiveCalibration === false;
  const policyMasks = new Set(policy.entries.map((entry: { mask: number }) => entry.mask));
  const calibrationRefusal = calibration.status === 'not-calibrated'
    && firewallReceipt.status === 'refused'
    && firewallReceipt.gates.calibrationCertificateValid === false
    && policy.entries.find((entry: { mask: number }) => entry.mask === 1)?.disposition === 'REFUSE'
    && policy.entries.find((entry: { mask: number }) => entry.mask === 1)?.reason === 'calibration-invalid';
  const firewallPassed = policy.schemaVersion === 'darwin.sounio.epistemic-firewall-policy.v1'
    && policy.entries.length === 256
    && policyMasks.size === 256
    && firewallReceipt.gates.policyOracleExecuted === true
    && firewallReceipt.gates.policyTableComplete === true
    && calibrationRefusal;

  if (hashesMatch && tamperDetected && abiAvailable && gatesPassed && firewallPassed) {
    pass('Sounio Clinical Kernel', 'WASM íntegro e Epistemic Firewall Sounio bloqueando uso clínico sem calibração');
  } else {
    fail('Sounio Clinical Kernel', 'Gate de integridade, ABI ou estado experimental falhou', {
      hashesMatch,
      tamperDetected,
      abiAvailable,
      gatesPassed,
      firewallPassed,
    });
  }
} catch (error) {
  fail('Sounio Clinical Kernel', `Falha ao validar artefatos: ${error}`);
}

const calibrationScript = resolve(process.cwd(), 'scripts/calibrate-epistemic-firewall.mjs');
const fixtureValidation = spawnSync(
  process.execPath,
  [calibrationScript, '--fixture', '--validate-only'],
  { cwd: process.cwd(), encoding: 'utf8' },
);
const fixturePromotion = spawnSync(
  process.execPath,
  [calibrationScript, '--fixture', '--promote'],
  { cwd: process.cwd(), encoding: 'utf8' },
);
const fixtureContractPassed = fixtureValidation.status === 0
  && fixtureValidation.stdout.includes('COHORT_VALIDATION_OK')
  && fixtureValidation.stdout.includes('"patientLeakage": 0')
  && fixtureValidation.stdout.includes('"allConditionsInCalibration": true')
  && fixtureValidation.stdout.includes('"allConditionsInEvaluation": true');
const fixturePromotionRefused = fixturePromotion.status !== 0
  && fixturePromotion.stderr.includes('PROMOTION_REFUSED: synthetic fixtures can never');

if (fixtureContractPassed && fixturePromotionRefused) {
  pass('Epistemic Calibration Guard', 'Coorte sintética passa o contrato, mantém split sem vazamento e não pode ser promovida');
} else {
  fail('Epistemic Calibration Guard', 'Contrato de coorte ou bloqueio de promoção sintética falhou', {
    validationStatus: fixtureValidation.status,
    validationOutput: fixtureValidation.stdout || fixtureValidation.stderr,
    promotionStatus: fixturePromotion.status,
    promotionOutput: fixturePromotion.stderr || fixturePromotion.stdout,
  });
}

try {
  const comparatorScript = resolve(process.cwd(), 'scripts/score-current-aps-comparator.ts');
  const comparatorConfig = JSON.parse(readFileSync(
    resolve(process.cwd(), 'clinical/epistemic-firewall/current-aps-comparator.json'),
    'utf8',
  ));
  const comparatorEvidence = JSON.parse(readFileSync(
    resolve(process.cwd(), 'clinical/sounio/evidence-bundle.json'),
    'utf8',
  ));
  const comparatorRun = spawnSync(
    'pnpm',
    ['exec', 'tsx', comparatorScript],
    {
      cwd: process.cwd(),
      encoding: 'utf8',
      input: JSON.stringify({
        schemaVersion: 'darwin.sounio.comparator-input.v1',
        features: comparatorEvidence.features.map((feature: { id: string }) => ({ id: feature.id })),
        conditions: comparatorEvidence.conditions.map((condition: { id: string }) => ({ id: condition.id })),
        records: [{
          ageDays: 1461,
          features: [1, 1, 0, -1, 1, 0, 0, 1, 1, 0, 0, 0],
        }],
      }),
    },
  );
  const comparatorOutput = JSON.parse(comparatorRun.stdout || '{}');
  const scores = comparatorOutput.records?.[0]?.rawScores;
  const comparatorPassed = comparatorRun.status === 0
    && comparatorOutput.schemaVersion === 'darwin.sounio.comparator-scores.v1'
    && comparatorOutput.comparatorVersion === comparatorConfig.comparatorVersion
    && comparatorOutput.probabilityNormalization === 'sounio-add-one-and-normalize-v1'
    && Array.isArray(scores)
    && scores.length === 9
    && scores.every((value: number) => Number.isFinite(value) && value >= 0 && value <= 100)
    && scores[1] > 0;
  if (comparatorPassed) {
    pass('APS Comparator Contract', 'Comparador versionado emite nove scores brutos e mantém probabilidades sob autoridade do Sounio');
  } else {
    fail('APS Comparator Contract', 'Saída do comparador APS atual é incompatível', {
      status: comparatorRun.status,
      output: comparatorRun.stdout || comparatorRun.stderr,
    });
  }
} catch (error) {
  fail('APS Comparator Contract', `Falha ao executar comparador versionado: ${error}`);
}

const pneumoniaTherapy = getMedicamentosForDoenca('pneumonia-comunitaria');
const hasAmoxicillinDose = pneumoniaTherapy.some(reference =>
  reference.medicamentoId === 'amoxicilina' && Boolean(reference.posologiaResumida)
);
const hasAzithromycinDose = pneumoniaTherapy.some(reference =>
  reference.medicamentoId === 'azitromicina' && Boolean(reference.posologiaResumida)
);
if (hasAmoxicillinDose && hasAzithromycinDose) {
  pass('Diagnosis to Treatment', 'PAC vinculada a amoxicilina e azitromicina com posologia');
} else {
  fail('Diagnosis to Treatment', 'PAC sem opções terapêuticas completas', { pneumoniaTherapy });
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
