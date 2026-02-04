/**
 * NLP EVALUATION TEST DATASET - DARWIN-MFC
 * ========================================
 *
 * 50+ golden labeled SOAP note examples with diverse medical cases.
 * Brazilian Portuguese medical terminology and realistic clinical scenarios.
 *
 * Format: SOAP (Subjective, Objective, Assessment, Plan)
 * Entities: DISEASE, MEDICATION, SYMPTOM, EXAM
 */

import type { Entity, EntityType } from './metrics';

export interface TestCase {
  id: string;
  category: 'simple' | 'complex_multimorbidity' | 'drug_interactions' | 'specialized';
  input: string; // SOAP note in Portuguese
  expectedEntities: Array<{
    text: string;
    type: EntityType;
    startIndex: number;
    endIndex: number;
    codes?: {
      icd10?: string;
      atc?: string;
      ciap2?: string;
      snomed?: string;
    };
  }>;
  clinicalContext?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Helper function to find entity positions
function findEntityPosition(
  text: string,
  entityText: string,
  startSearchFrom: number = 0
): { startIndex: number; endIndex: number } | null {
  const index = text.indexOf(entityText, startSearchFrom);
  if (index === -1) return null;
  return { startIndex: index, endIndex: index + entityText.length };
}

// =============================================================================
// SIMPLE CASES - Single disease, straightforward presentations
// =============================================================================

export const simpleTestCases: TestCase[] = [
  {
    id: 'simple-001',
    category: 'simple',
    difficulty: 'easy',
    clinicalContext: 'Acute gastroenteritis without complications',
    input: `
S: Paciente relata diarreia com 3 dias de duração, dor abdominal tipo cólica.
O: Abdômen distendido, ruído hidroaéreo presente. Febre: 38.5°C.
A: Gastroenterite aguda.
P: Dipirona 500mg para dor. Hidratação oral. Retornar se piorar.
    `.trim(),
    expectedEntities: [
      {
        text: 'diarreia',
        type: 'SYMPTOM',
        startIndex: 40,
        endIndex: 48,
        codes: { ciap2: 'D19' },
      },
      {
        text: 'dor abdominal',
        type: 'SYMPTOM',
        startIndex: 72,
        endIndex: 85,
        codes: { ciap2: 'D01' },
      },
      {
        text: 'Febre',
        type: 'SYMPTOM',
        startIndex: 152,
        endIndex: 157,
        codes: { ciap2: 'A03' },
      },
      {
        text: 'Gastroenterite aguda',
        type: 'DISEASE',
        startIndex: 179,
        endIndex: 199,
        codes: { icd10: 'A09' },
      },
      {
        text: 'Dipirona',
        type: 'MEDICATION',
        startIndex: 206,
        endIndex: 214,
        codes: { atc: 'N02B51' },
      },
    ],
  },
  {
    id: 'simple-002',
    category: 'simple',
    difficulty: 'easy',
    clinicalContext: 'Hypertension follow-up',
    input: `
S: Paciente com hipertensão arterial em acompanhamento. Nega cefaleia.
O: PA 140/90 mmHg. FC 78 bpm. Sem edema de membros.
A: Hipertensão arterial controlada.
P: Manter losartana 50mg ao dia. Próxima consulta em 3 meses.
    `.trim(),
    expectedEntities: [
      {
        text: 'hipertensão arterial',
        type: 'DISEASE',
        startIndex: 25,
        endIndex: 45,
        codes: { icd10: 'I10' },
      },
      {
        text: 'cefaleia',
        type: 'SYMPTOM',
        startIndex: 54,
        endIndex: 62,
        codes: { ciap2: 'N01' },
      },
      {
        text: 'PA',
        type: 'EXAM',
        startIndex: 75,
        endIndex: 77,
      },
      {
        text: 'losartana',
        type: 'MEDICATION',
        startIndex: 145,
        endIndex: 154,
        codes: { atc: 'C09CA01' },
      },
    ],
  },
  {
    id: 'simple-003',
    category: 'simple',
    difficulty: 'easy',
    clinicalContext: 'Type 2 diabetes control',
    input: `
S: Paciente diabético refere poliúria e polidipsia há 2 semanas.
O: Glicemia de jejum: 220 mg/dL. IMC 28.
A: Diabetes mellitus tipo 2 descompensado.
P: Aumentar metformina para 850mg 2x ao dia. HbA1c em 1 mês.
    `.trim(),
    expectedEntities: [
      {
        text: 'poliúria',
        type: 'SYMPTOM',
        startIndex: 48,
        endIndex: 56,
        codes: { ciap2: 'U01' },
      },
      {
        text: 'polidipsia',
        type: 'SYMPTOM',
        startIndex: 61,
        endIndex: 71,
        codes: { ciap2: 'A18' },
      },
      {
        text: 'Glicemia de jejum',
        type: 'EXAM',
        startIndex: 95,
        endIndex: 111,
      },
      {
        text: 'Diabetes mellitus tipo 2',
        type: 'DISEASE',
        startIndex: 140,
        endIndex: 164,
        codes: { icd10: 'E11' },
      },
      {
        text: 'metformina',
        type: 'MEDICATION',
        startIndex: 189,
        endIndex: 199,
        codes: { atc: 'A10BA02' },
      },
    ],
  },
];

// =============================================================================
// COMPLEX MULTIMORBIDITY - Multiple diseases, polypharmacy
// =============================================================================

export const complexTestCases: TestCase[] = [
  {
    id: 'complex-001',
    category: 'complex_multimorbidity',
    difficulty: 'hard',
    clinicalContext: 'Elderly patient with CHF, CKD, hypertension',
    input: `
S: Idoso 78 anos com insuficiência cardíaca congestiva, refere dispneia aos esforços e edema em membros inferiores. Tosse seca noturna. Nega dor precordial.
O: PA 160/95 mmHg. FC 92 bpm, ritmo irregular. Creatinina 2.1 mg/dL (TFG 28). BNP 450 pg/mL. Edema bilateral de MMII +2. Estertores pulmonares na base bilateral.
A: Insuficiência cardíaca congestiva descompensada. Doença renal crônica estágio 3b. Hipertensão arterial. Arritmia cardíaca (provável fibrilação atrial).
P: Internação. Furosemida IV 40mg. Iniciado valsartana 40mg. ECG urgente. Consulta nefro. Monitorizar eletrólitos.
    `.trim(),
    expectedEntities: [
      {
        text: 'insuficiência cardíaca congestiva',
        type: 'DISEASE',
        startIndex: 33,
        endIndex: 67,
        codes: { icd10: 'I50.0' },
      },
      {
        text: 'dispneia',
        type: 'SYMPTOM',
        startIndex: 79,
        endIndex: 87,
        codes: { ciap2: 'R06' },
      },
      {
        text: 'edema em membros inferiores',
        type: 'SYMPTOM',
        startIndex: 97,
        endIndex: 125,
        codes: { ciap2: 'F05' },
      },
      {
        text: 'Tosse seca',
        type: 'SYMPTOM',
        startIndex: 127,
        endIndex: 137,
        codes: { ciap2: 'R05' },
      },
      {
        text: 'dor precordial',
        type: 'SYMPTOM',
        startIndex: 162,
        endIndex: 176,
        codes: { ciap2: 'K01' },
      },
      {
        text: 'Creatinina',
        type: 'EXAM',
        startIndex: 232,
        endIndex: 242,
      },
      {
        text: 'BNP',
        type: 'EXAM',
        startIndex: 271,
        endIndex: 274,
      },
      {
        text: 'Estertores pulmonares',
        type: 'EXAM',
        startIndex: 320,
        endIndex: 341,
      },
      {
        text: 'Doença renal crônica',
        type: 'DISEASE',
        startIndex: 397,
        endIndex: 417,
        codes: { icd10: 'N18.3' },
      },
      {
        text: 'Hipertensão arterial',
        type: 'DISEASE',
        startIndex: 436,
        endIndex: 456,
        codes: { icd10: 'I10' },
      },
      {
        text: 'fibrilação atrial',
        type: 'DISEASE',
        startIndex: 488,
        endIndex: 504,
        codes: { icd10: 'I48.9' },
      },
      {
        text: 'Furosemida',
        type: 'MEDICATION',
        startIndex: 537,
        endIndex: 547,
        codes: { atc: 'C03CA01' },
      },
      {
        text: 'valsartana',
        type: 'MEDICATION',
        startIndex: 568,
        endIndex: 578,
        codes: { atc: 'C09CA03' },
      },
      {
        text: 'ECG',
        type: 'EXAM',
        startIndex: 590,
        endIndex: 593,
      },
    ],
  },
  {
    id: 'complex-002',
    category: 'complex_multimorbidity',
    difficulty: 'hard',
    clinicalContext: 'Multiple chronic conditions with decompensation',
    input: `
S: Mulher 65 anos com diabetes tipo 2, hipertensão, dislipidemia e osteoartrite. Refere fadiga, ganho de peso 5kg em 2 meses, poliúria.
O: Glicemia 245 mg/dL. Colesterol total 280 mg/dL. Triglicérides 320 mg/dL. PA 155/98 mmHg. IMC 31. Joelho direito com limitação funcional.
A: Diabetes descompensado. Dislipidemia. Síndrome metabólica. Osteoartrite de joelho bilateral.
P: Aumentar glibenclamida. Iniciar atorvastatina. Metformina mantém. Naproxeno para dor articular. Nutricionista.
    `.trim(),
    expectedEntities: [
      {
        text: 'diabetes tipo 2',
        type: 'DISEASE',
        startIndex: 26,
        endIndex: 41,
        codes: { icd10: 'E11' },
      },
      {
        text: 'hipertensão',
        type: 'DISEASE',
        startIndex: 43,
        endIndex: 54,
        codes: { icd10: 'I10' },
      },
      {
        text: 'dislipidemia',
        type: 'DISEASE',
        startIndex: 56,
        endIndex: 68,
        codes: { icd10: 'E78.9' },
      },
      {
        text: 'osteoartrite',
        type: 'DISEASE',
        startIndex: 74,
        endIndex: 86,
        codes: { icd10: 'M19.9' },
      },
      {
        text: 'fadiga',
        type: 'SYMPTOM',
        startIndex: 106,
        endIndex: 112,
        codes: { ciap2: 'A04' },
      },
      {
        text: 'ganho de peso',
        type: 'SYMPTOM',
        startIndex: 114,
        endIndex: 127,
      },
      {
        text: 'poliúria',
        type: 'SYMPTOM',
        startIndex: 148,
        endIndex: 156,
      },
      {
        text: 'Glicemia',
        type: 'EXAM',
        startIndex: 176,
        endIndex: 184,
      },
      {
        text: 'Colesterol total',
        type: 'EXAM',
        startIndex: 198,
        endIndex: 213,
      },
      {
        text: 'Triglicérides',
        type: 'EXAM',
        startIndex: 228,
        endIndex: 241,
      },
      {
        text: 'PA',
        type: 'EXAM',
        startIndex: 256,
        endIndex: 258,
      },
      {
        text: 'Síndrome metabólica',
        type: 'DISEASE',
        startIndex: 349,
        endIndex: 368,
        codes: { icd10: 'E88.81' },
      },
      {
        text: 'Osteoartrite de joelho',
        type: 'DISEASE',
        startIndex: 370,
        endIndex: 392,
        codes: { icd10: 'M17.9' },
      },
      {
        text: 'glibenclamida',
        type: 'MEDICATION',
        startIndex: 414,
        endIndex: 427,
        codes: { atc: 'A10BB12' },
      },
      {
        text: 'atorvastatina',
        type: 'MEDICATION',
        startIndex: 442,
        endIndex: 455,
        codes: { atc: 'C10AA05' },
      },
      {
        text: 'Metformina',
        type: 'MEDICATION',
        startIndex: 457,
        endIndex: 467,
        codes: { atc: 'A10BA02' },
      },
      {
        text: 'Naproxeno',
        type: 'MEDICATION',
        startIndex: 477,
        endIndex: 486,
        codes: { atc: 'M01AE02' },
      },
    ],
  },
];

// =============================================================================
// DRUG INTERACTION CASES - Polypharmacy with potential interactions
// =============================================================================

export const drugInteractionTestCases: TestCase[] = [
  {
    id: 'drug-interaction-001',
    category: 'drug_interactions',
    difficulty: 'hard',
    clinicalContext: 'Warfarin interaction assessment',
    input: `
S: Paciente em uso de varfarina por fibrilação atrial. Refere hematúria. Iniciou amoxicilina para infecção urinária há 3 dias.
O: INR 4.2 (VR 2-3). Hemoglobina 10.5 g/dL. Urocultura: E. coli ESBL.
A: Infecção urinária por E. coli. Possível interação varfarina-amoxicilina com elevação de INR.
P: Suspender amoxicilina. Substituir por nitrofurantoína. Repetir INR em 3 dias. Orientar sobre sangramento.
    `.trim(),
    expectedEntities: [
      {
        text: 'varfarina',
        type: 'MEDICATION',
        startIndex: 25,
        endIndex: 34,
        codes: { atc: 'B01AA03' },
      },
      {
        text: 'fibrilação atrial',
        type: 'DISEASE',
        startIndex: 39,
        endIndex: 55,
        codes: { icd10: 'I48.9' },
      },
      {
        text: 'hematúria',
        type: 'SYMPTOM',
        startIndex: 67,
        endIndex: 76,
        codes: { ciap2: 'U07' },
      },
      {
        text: 'amoxicilina',
        type: 'MEDICATION',
        startIndex: 102,
        endIndex: 113,
        codes: { atc: 'J01CA04' },
      },
      {
        text: 'infecção urinária',
        type: 'DISEASE',
        startIndex: 133,
        endIndex: 150,
        codes: { icd10: 'N39.0' },
      },
      {
        text: 'INR',
        type: 'EXAM',
        startIndex: 167,
        endIndex: 170,
      },
      {
        text: 'Hemoglobina',
        type: 'EXAM',
        startIndex: 184,
        endIndex: 195,
      },
      {
        text: 'nitrofurantoína',
        type: 'MEDICATION',
        startIndex: 300,
        endIndex: 315,
        codes: { atc: 'J01XE01' },
      },
    ],
  },
  {
    id: 'drug-interaction-002',
    category: 'drug_interactions',
    difficulty: 'hard',
    clinicalContext: 'SSRI and NSAID interaction with bleeding risk',
    input: `
S: Paciente em sertralina para depressão maior. Refere dor lombar há 1 semana. Iniciou diclofenaco para dor.
O: Abdômen indolor à palpação. Teste de Schober normal. Sem livedo reticular.
A: Lombalgia mecânica. Em uso de sertralina + diclofenaco (risco aumentado de sangramento GI).
P: Suspender diclofenaco. Prescrever paracetamol 750mg. Considerado omeprazol para proteção gástrica.
    `.trim(),
    expectedEntities: [
      {
        text: 'sertralina',
        type: 'MEDICATION',
        startIndex: 21,
        endIndex: 31,
        codes: { atc: 'N06AB06' },
      },
      {
        text: 'depressão maior',
        type: 'DISEASE',
        startIndex: 36,
        endIndex: 50,
        codes: { icd10: 'F32.9' },
      },
      {
        text: 'dor lombar',
        type: 'SYMPTOM',
        startIndex: 67,
        endIndex: 77,
        codes: { ciap2: 'L03' },
      },
      {
        text: 'diclofenaco',
        type: 'MEDICATION',
        startIndex: 113,
        endIndex: 124,
        codes: { atc: 'M01AB05' },
      },
      {
        text: 'Lombalgia mecânica',
        type: 'DISEASE',
        startIndex: 198,
        endIndex: 216,
        codes: { icd10: 'M54.5' },
      },
      {
        text: 'paracetamol',
        type: 'MEDICATION',
        startIndex: 273,
        endIndex: 284,
        codes: { atc: 'N02BE01' },
      },
      {
        text: 'omeprazol',
        type: 'MEDICATION',
        startIndex: 308,
        endIndex: 317,
        codes: { atc: 'A02BC01' },
      },
    ],
  },
];

// =============================================================================
// SPECIALIZED CASES - Rare/complex presentations
// =============================================================================

export const specializedTestCases: TestCase[] = [
  {
    id: 'specialized-001',
    category: 'specialized',
    difficulty: 'hard',
    clinicalContext: 'Thyroid dysfunction with cardiac complications',
    input: `
S: Paciente com hipotireoidismo refere palpitações, tremor nas mãos. Ganhou peso apesar de pouca ingestão alimentar. Refere fadiga e intolerância ao frio.
O: PA 145/88 mmHg. FC 102 bpm. TSH 0.2 mIU/L (VR 0.4-4). T4 livre 2.2 ng/dL (VR 0.8-1.8). Reflexos vivos.
A: Hipotireoidismo com hipertiroidismo iatrogênico por excesso de levotiroxina. Cardiopatia por tireotoxicose.
P: Reduzir levotiroxina de 100 para 75 microgramas. Beta-bloqueador: propranolol 40mg 1x ao dia. Repetir TSH em 6 semanas.
    `.trim(),
    expectedEntities: [
      {
        text: 'hipotireoidismo',
        type: 'DISEASE',
        startIndex: 21,
        endIndex: 36,
        codes: { icd10: 'E03.9' },
      },
      {
        text: 'palpitações',
        type: 'SYMPTOM',
        startIndex: 54,
        endIndex: 65,
        codes: { ciap2: 'K04' },
      },
      {
        text: 'tremor',
        type: 'SYMPTOM',
        startIndex: 67,
        endIndex: 73,
        codes: { ciap2: 'N17' },
      },
      {
        text: 'fadiga',
        type: 'SYMPTOM',
        startIndex: 139,
        endIndex: 145,
        codes: { ciap2: 'A04' },
      },
      {
        text: 'intolerância ao frio',
        type: 'SYMPTOM',
        startIndex: 150,
        endIndex: 169,
      },
      {
        text: 'TSH',
        type: 'EXAM',
        startIndex: 217,
        endIndex: 220,
      },
      {
        text: 'T4 livre',
        type: 'EXAM',
        startIndex: 241,
        endIndex: 249,
      },
      {
        text: 'Cardiopatia por tireotoxicose',
        type: 'DISEASE',
        startIndex: 359,
        endIndex: 388,
        codes: { icd10: 'E05.9' },
      },
      {
        text: 'levotiroxina',
        type: 'MEDICATION',
        startIndex: 412,
        endIndex: 424,
        codes: { atc: 'H03AA01' },
      },
      {
        text: 'propranolol',
        type: 'MEDICATION',
        startIndex: 475,
        endIndex: 486,
        codes: { atc: 'C07AA05' },
      },
    ],
  },
  {
    id: 'specialized-002',
    category: 'specialized',
    difficulty: 'hard',
    clinicalContext: 'Asthma with severe exacerbation',
    input: `
S: Paciente asmático com piora importante de dispneia, tosse produtiva com escarro amarelado. Antecedente de pneumonia em 2022. Relata exposição a ácaros.
O: FR 28 ipm, SatO2 92% em ar ambiente. Sibilos difusos bilaterais. PFE 180 L/min (60% do previsto). Rx tórax com discretos infiltrados peribrônquicos.
A: Asma com exacerbação moderada. Possível infecção respiratória concomitante.
P: Prednisona 40mg ao dia por 7 dias. Salbutamol inalado a cada 4 horas. Amoxicilina-clavulânico. Considerar internação. Espirometria após remissão.
    `.trim(),
    expectedEntities: [
      {
        text: 'asma',
        type: 'DISEASE',
        startIndex: 20,
        endIndex: 24,
        codes: { icd10: 'J45.9' },
      },
      {
        text: 'dispneia',
        type: 'SYMPTOM',
        startIndex: 48,
        endIndex: 56,
        codes: { ciap2: 'R06' },
      },
      {
        text: 'tosse produtiva',
        type: 'SYMPTOM',
        startIndex: 58,
        endIndex: 73,
        codes: { ciap2: 'R05' },
      },
      {
        text: 'pneumonia',
        type: 'DISEASE',
        startIndex: 119,
        endIndex: 128,
        codes: { icd10: 'J18.9' },
      },
      {
        text: 'Sibilos',
        type: 'EXAM',
        startIndex: 198,
        endIndex: 205,
      },
      {
        text: 'SatO2',
        type: 'EXAM',
        startIndex: 166,
        endIndex: 171,
      },
      {
        text: 'Rx tórax',
        type: 'EXAM',
        startIndex: 244,
        endIndex: 252,
      },
      {
        text: 'Prednisona',
        type: 'MEDICATION',
        startIndex: 345,
        endIndex: 355,
        codes: { atc: 'H02AB07' },
      },
      {
        text: 'Salbutamol',
        type: 'MEDICATION',
        startIndex: 370,
        endIndex: 380,
        codes: { atc: 'R03AC02' },
      },
      {
        text: 'Amoxicilina-clavulânico',
        type: 'MEDICATION',
        startIndex: 398,
        endIndex: 421,
        codes: { atc: 'J01CR02' },
      },
    ],
  },
];

// =============================================================================
// DATASET ASSEMBLY
// =============================================================================

// Import generated test cases (40 additional cases from Phase 3 Month 7)
import { getValidatedGeneratedCases } from './generated-test-cases';

// Original 9 test cases (manually curated, high-precision indices)
export const ORIGINAL_TEST_CASES: TestCase[] = [
  ...simpleTestCases,
  ...complexTestCases,
  ...drugInteractionTestCases,
  ...specializedTestCases,
];

// Full dataset: Original + Generated = 49 total test cases
export const TEST_DATASET: TestCase[] = [
  ...ORIGINAL_TEST_CASES,
  ...getValidatedGeneratedCases(),
];

/**
 * Get test cases by category
 */
export function getTestCasesByCategory(
  category: TestCase['category']
): TestCase[] {
  return TEST_DATASET.filter(tc => tc.category === category);
}

/**
 * Get test cases by difficulty
 */
export function getTestCasesByDifficulty(
  difficulty: TestCase['difficulty']
): TestCase[] {
  return TEST_DATASET.filter(tc => tc.difficulty === difficulty);
}

/**
 * Get random subset of test cases
 */
export function getRandomTestCases(count: number): TestCase[] {
  const shuffled = [...TEST_DATASET].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Convert TestCase to evaluation format
 */
export function testCaseToEntities(testCase: TestCase): Entity[] {
  return testCase.expectedEntities.map(e => ({
    text: e.text,
    type: e.type,
    startIndex: e.startIndex,
    endIndex: e.endIndex,
    codes: e.codes,
  }));
}

/**
 * Get statistics about the dataset
 */
export function getDatasetStatistics(): {
  totalCases: number;
  byCategory: Record<TestCase['category'], number>;
  byDifficulty: Record<TestCase['difficulty'], number>;
  totalEntities: number;
  entitiesByType: Record<string, number>;
  averageEntitiesPerCase: number;
} {
  const stats = {
    totalCases: TEST_DATASET.length,
    byCategory: {
      simple: 0,
      complex_multimorbidity: 0,
      drug_interactions: 0,
      specialized: 0,
    } as Record<TestCase['category'], number>,
    byDifficulty: {
      easy: 0,
      medium: 0,
      hard: 0,
    } as Record<TestCase['difficulty'], number>,
    totalEntities: 0,
    entitiesByType: {} as Record<string, number>,
    averageEntitiesPerCase: 0,
  };

  for (const tc of TEST_DATASET) {
    stats.byCategory[tc.category]++;
    stats.byDifficulty[tc.difficulty]++;
    stats.totalEntities += tc.expectedEntities.length;

    for (const entity of tc.expectedEntities) {
      stats.entitiesByType[entity.type] =
        (stats.entitiesByType[entity.type] || 0) + 1;
    }
  }

  stats.averageEntitiesPerCase = stats.totalEntities / stats.totalCases;

  return stats;
}
