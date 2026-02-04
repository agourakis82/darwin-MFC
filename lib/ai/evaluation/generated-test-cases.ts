/**
 * GENERATED TEST CASES - DARWIN-MFC NLP EVALUATION
 * =================================================
 *
 * 40 additional SOAP note test cases generated via Grok LLM
 * Categories: Pediatric, OB/GYN, Mental Health, Emergency Medicine
 *
 * NOTE: Entity indices are approximate and should be validated with
 * the recalculateIndices() helper function before use in benchmarks.
 *
 * Generated: Phase 3 Month 7 Implementation
 */

import type { TestCase } from './test-dataset';

/**
 * Recalculate entity indices based on actual text positions
 * Use this to fix approximate indices from LLM generation
 */
export function recalculateIndices(testCase: TestCase): TestCase {
  const updatedEntities = testCase.expectedEntities.map(entity => {
    const index = testCase.input.indexOf(entity.text);
    if (index === -1) {
      console.warn(`Entity "${entity.text}" not found in test case ${testCase.id}`);
      return entity;
    }
    return {
      ...entity,
      startIndex: index,
      endIndex: index + entity.text.length,
    };
  });

  return {
    ...testCase,
    expectedEntities: updatedEntities,
  };
}

/**
 * Validate all test cases and return those with valid indices
 */
export function validateTestCases(cases: TestCase[]): {
  valid: TestCase[];
  invalid: { case: TestCase; errors: string[] }[];
} {
  const valid: TestCase[] = [];
  const invalid: { case: TestCase; errors: string[] }[] = [];

  for (const tc of cases) {
    const errors: string[] = [];

    for (const entity of tc.expectedEntities) {
      const foundText = tc.input.substring(entity.startIndex, entity.endIndex);
      if (foundText !== entity.text) {
        errors.push(`Entity "${entity.text}" at [${entity.startIndex}:${entity.endIndex}] found "${foundText}"`);
      }
    }

    if (errors.length === 0) {
      valid.push(tc);
    } else {
      invalid.push({ case: tc, errors });
    }
  }

  return { valid, invalid };
}

// =============================================================================
// PEDIATRIC TEST CASES (10 cases)
// =============================================================================

export const pediatricTestCases: TestCase[] = [
  {
    id: 'pediatric-001',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Infant presenting with bronchiolitis symptoms',
    input: `S: Bebê de 6 meses com tosse e sibilos há 2 dias, relatado pelos pais como piora noturna.
O: Temperatura 37.8°C, FC 160 bpm, FR 50 irpm, Sat O2 92% em ar ambiente, ausculta com crepitações e sibilos bilaterais.
A: Bronquiolite aguda por VSR.
P: Suporte com oxigênio nasal, hidratação IV se necessário, paracetamol 15mg/kg/dose.`,
    expectedEntities: [
      { text: 'tosse', type: 'SYMPTOM', startIndex: 22, endIndex: 27, codes: { ciap2: 'R05' } },
      { text: 'sibilos', type: 'SYMPTOM', startIndex: 30, endIndex: 37, codes: { ciap2: 'R03' } },
      { text: 'crepitações', type: 'EXAM', startIndex: 148, endIndex: 159 },
      { text: 'sibilos bilaterais', type: 'EXAM', startIndex: 162, endIndex: 180 },
      { text: 'Bronquiolite aguda', type: 'DISEASE', startIndex: 185, endIndex: 203, codes: { icd10: 'J21.0' } },
      { text: 'paracetamol', type: 'MEDICATION', startIndex: 276, endIndex: 287, codes: { atc: 'N02BE01' } },
    ],
  },
  {
    id: 'pediatric-002',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Child with acute otitis media',
    input: `S: Criança de 3 anos com dor de ouvido direito intensa há 24 horas, febre e irritabilidade.
O: Otoscopia revela tímpano hiperêmico e abaulado à direita, temperatura 38.5°C, sem outros achados.
A: Otite média aguda.
P: Amoxicilina 50mg/kg/dia por 10 dias, ibuprofeno para dor e febre.`,
    expectedEntities: [
      { text: 'dor de ouvido', type: 'SYMPTOM', startIndex: 24, endIndex: 37, codes: { ciap2: 'H01' } },
      { text: 'febre', type: 'SYMPTOM', startIndex: 68, endIndex: 73, codes: { ciap2: 'A03' } },
      { text: 'irritabilidade', type: 'SYMPTOM', startIndex: 76, endIndex: 90, codes: { ciap2: 'P04' } },
      { text: 'tímpano hiperêmico', type: 'EXAM', startIndex: 113, endIndex: 131 },
      { text: 'Otite média aguda', type: 'DISEASE', startIndex: 198, endIndex: 215, codes: { icd10: 'H66.0' } },
      { text: 'Amoxicilina', type: 'MEDICATION', startIndex: 220, endIndex: 231, codes: { atc: 'J01CA04' } },
      { text: 'ibuprofeno', type: 'MEDICATION', startIndex: 258, endIndex: 268, codes: { atc: 'M01AE01' } },
    ],
  },
  {
    id: 'pediatric-003',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Child experiencing febrile seizure',
    input: `S: Convulsão tônico-clônica generalizada em criança de 2 anos durante episódio febril.
O: Pós-ictal sonolento, temperatura 39.2°C, sem déficits neurológicos residuais, EEG normal.
A: Crise convulsiva febril simples.
P: Antitérmicos como paracetamol, orientação aos pais, follow-up neurológico.`,
    expectedEntities: [
      { text: 'Convulsão tônico-clônica', type: 'SYMPTOM', startIndex: 3, endIndex: 27, codes: { ciap2: 'N07' } },
      { text: 'episódio febril', type: 'SYMPTOM', startIndex: 69, endIndex: 84, codes: { ciap2: 'A03' } },
      { text: 'EEG normal', type: 'EXAM', startIndex: 163, endIndex: 173 },
      { text: 'Crise convulsiva febril', type: 'DISEASE', startIndex: 178, endIndex: 201, codes: { icd10: 'R56.0' } },
      { text: 'paracetamol', type: 'MEDICATION', startIndex: 231, endIndex: 242, codes: { atc: 'N02BE01' } },
    ],
  },
  {
    id: 'pediatric-004',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Toddler with gastroenteritis and dehydration',
    input: `S: Diarreia aquosa e vômitos em lactente de 18 meses há 3 dias, recusa alimentar.
O: Desidratação moderada, FC 140 bpm, mucosas secas, peso 9kg com perda de 5%.
A: Gastroenterite viral com desidratação.
P: Rehidratação oral com SRO, zinco 10mg/dia, dieta branda.`,
    expectedEntities: [
      { text: 'Diarreia aquosa', type: 'SYMPTOM', startIndex: 3, endIndex: 18, codes: { ciap2: 'D11' } },
      { text: 'vômitos', type: 'SYMPTOM', startIndex: 21, endIndex: 28, codes: { ciap2: 'D10' } },
      { text: 'recusa alimentar', type: 'SYMPTOM', startIndex: 63, endIndex: 79, codes: { ciap2: 'T03' } },
      { text: 'mucosas secas', type: 'EXAM', startIndex: 123, endIndex: 136 },
      { text: 'Gastroenterite viral', type: 'DISEASE', startIndex: 164, endIndex: 184, codes: { icd10: 'A08.4' } },
      { text: 'desidratação', type: 'DISEASE', startIndex: 189, endIndex: 201, codes: { icd10: 'E86.0' } },
      { text: 'zinco', type: 'MEDICATION', startIndex: 232, endIndex: 237, codes: { atc: 'A12CB01' } },
    ],
  },
  {
    id: 'pediatric-005',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Toddler diagnosed with pneumonia',
    input: `S: Febre alta e tosse produtiva em criança de 2 anos há 4 dias, dispneia leve.
O: FR 45 irpm, sat O2 94%, ausculta com roncos e estertores em base direita, RX tórax com infiltrado.
A: Pneumonia comunitária bacteriana.
P: Amoxicilina-clavulanato 45mg/kg/dia, oxigênio se sat <92%, hidratação.`,
    expectedEntities: [
      { text: 'Febre alta', type: 'SYMPTOM', startIndex: 3, endIndex: 13, codes: { ciap2: 'A03' } },
      { text: 'tosse produtiva', type: 'SYMPTOM', startIndex: 16, endIndex: 31, codes: { ciap2: 'R05' } },
      { text: 'dispneia leve', type: 'SYMPTOM', startIndex: 63, endIndex: 76, codes: { ciap2: 'R02' } },
      { text: 'roncos e estertores', type: 'EXAM', startIndex: 118, endIndex: 137 },
      { text: 'RX tórax', type: 'EXAM', startIndex: 157, endIndex: 165 },
      { text: 'Pneumonia comunitária', type: 'DISEASE', startIndex: 186, endIndex: 207, codes: { icd10: 'J18.9' } },
      { text: 'Amoxicilina-clavulanato', type: 'MEDICATION', startIndex: 230, endIndex: 253, codes: { atc: 'J01CR02' } },
    ],
  },
  {
    id: 'pediatric-006',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Child with asthma exacerbation',
    input: `S: Criança de 5 anos com sibilos e falta de ar após infecção viral, uso de inalador aliviou parcialmente.
O: FR 35 irpm, sat O2 93%, ausculta com wheezing difuso, peak flow 70% do esperado.
A: Exacerbação de asma moderada.
P: Salbutamol inalado 4 puffs a cada 4h, prednisona oral 1mg/kg/dia por 3 dias.`,
    expectedEntities: [
      { text: 'sibilos', type: 'SYMPTOM', startIndex: 24, endIndex: 31, codes: { ciap2: 'R03' } },
      { text: 'falta de ar', type: 'SYMPTOM', startIndex: 34, endIndex: 45, codes: { ciap2: 'R02' } },
      { text: 'wheezing difuso', type: 'EXAM', startIndex: 138, endIndex: 153 },
      { text: 'peak flow', type: 'EXAM', startIndex: 155, endIndex: 164 },
      { text: 'Exacerbação de asma', type: 'DISEASE', startIndex: 192, endIndex: 211, codes: { icd10: 'J45.1' } },
      { text: 'Salbutamol', type: 'MEDICATION', startIndex: 228, endIndex: 238, codes: { atc: 'R03AC02' } },
      { text: 'prednisona', type: 'MEDICATION', startIndex: 264, endIndex: 274, codes: { atc: 'H02AB07' } },
    ],
  },
  {
    id: 'pediatric-007',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Child with urinary tract infection',
    input: `S: Menina de 4 anos com disúria e febre baixa há 2 dias, urina turva.
O: Temperatura 37.9°C, abdome sem dor à palpação, exame de urina com leucócitos e nitritos positivos.
A: Infecção do trato urinário.
P: Cefalexina 50mg/kg/dia por 7 dias, aumentar ingestão hídrica.`,
    expectedEntities: [
      { text: 'disúria', type: 'SYMPTOM', startIndex: 22, endIndex: 29, codes: { ciap2: 'U01' } },
      { text: 'febre baixa', type: 'SYMPTOM', startIndex: 32, endIndex: 43, codes: { ciap2: 'A03' } },
      { text: 'urina turva', type: 'SYMPTOM', startIndex: 56, endIndex: 67, codes: { ciap2: 'U06' } },
      { text: 'exame de urina', type: 'EXAM', startIndex: 116, endIndex: 130 },
      { text: 'Infecção do trato urinário', type: 'DISEASE', startIndex: 174, endIndex: 200, codes: { icd10: 'N39.0' } },
      { text: 'Cefalexina', type: 'MEDICATION', startIndex: 205, endIndex: 215, codes: { atc: 'J01DB01' } },
    ],
  },
  {
    id: 'pediatric-008',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Child with atopic dermatitis flare',
    input: `S: Lesões pruriginosas em flexuras em criança de 3 anos, piora com suor.
O: Pele eritematosa e liquenificada em cotovelos e joelhos, sem infecção secundária.
A: Dermatite atópica em surto.
P: Emoliente diário, corticóide tópico classe II por 7 dias, evitar irritantes.`,
    expectedEntities: [
      { text: 'Lesões pruriginosas', type: 'SYMPTOM', startIndex: 3, endIndex: 22, codes: { ciap2: 'S02' } },
      { text: 'Pele eritematosa', type: 'EXAM', startIndex: 75, endIndex: 91 },
      { text: 'liquenificada', type: 'EXAM', startIndex: 94, endIndex: 107 },
      { text: 'Dermatite atópica', type: 'DISEASE', startIndex: 160, endIndex: 177, codes: { icd10: 'L20.9' } },
      { text: 'corticóide tópico', type: 'MEDICATION', startIndex: 213, endIndex: 230, codes: { atc: 'D07AC' } },
    ],
  },
  {
    id: 'pediatric-009',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Follow-up for ADHD in school-age child',
    input: `S: Menino de 7 anos com hiperatividade e dificuldade de atenção na escola, melhora com rotina.
O: Exame neurológico normal, escalas de comportamento indicam TDAH combinado.
A: Transtorno de déficit de atenção com hiperatividade.
P: Metilfenidato 0.5mg/kg/dose manhã, terapia comportamental, follow-up mensal.`,
    expectedEntities: [
      { text: 'hiperatividade', type: 'SYMPTOM', startIndex: 23, endIndex: 37, codes: { ciap2: 'P81' } },
      { text: 'dificuldade de atenção', type: 'SYMPTOM', startIndex: 40, endIndex: 62, codes: { ciap2: 'P81' } },
      { text: 'Exame neurológico', type: 'EXAM', startIndex: 97, endIndex: 114 },
      { text: 'escalas de comportamento', type: 'EXAM', startIndex: 124, endIndex: 148 },
      { text: 'Transtorno de déficit de atenção com hiperatividade', type: 'DISEASE', startIndex: 180, endIndex: 231, codes: { icd10: 'F90.0' } },
      { text: 'Metilfenidato', type: 'MEDICATION', startIndex: 236, endIndex: 249, codes: { atc: 'N06BA04' } },
    ],
  },
  {
    id: 'pediatric-010',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Evaluation for growth and developmental delay',
    input: `S: Atraso no marco motor em bebê de 12 meses, não anda nem fica em pé.
O: Peso 8.5kg (percentil 10), comprimento 72cm, exame físico sem anormalidades, Denver II alterado.
A: Atraso no desenvolvimento global.
P: Avaliação multidisciplinar, suplemento nutricional, estimulação precoce.`,
    expectedEntities: [
      { text: 'Atraso no marco motor', type: 'SYMPTOM', startIndex: 3, endIndex: 24, codes: { ciap2: 'A18' } },
      { text: 'exame físico', type: 'EXAM', startIndex: 106, endIndex: 118 },
      { text: 'Denver II', type: 'EXAM', startIndex: 139, endIndex: 148 },
      { text: 'Atraso no desenvolvimento global', type: 'DISEASE', startIndex: 162, endIndex: 194, codes: { icd10: 'R62.0' } },
      { text: 'suplemento nutricional', type: 'MEDICATION', startIndex: 235, endIndex: 257, codes: { atc: 'A11AA' } },
    ],
  },
];

// =============================================================================
// OB/GYN TEST CASES (10 cases)
// =============================================================================

export const obgynTestCases: TestCase[] = [
  {
    id: 'obgyn-001',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'First trimester prenatal visit',
    input: `S: Paciente de 28 anos, G2P1, relata náuseas matinais e fadiga desde a confirmação da gravidez há 6 semanas.
O: PA 110/70, peso 65 kg, exame físico abdominal normal, beta-hCG 5000 mUI/mL, ultrassonografia transvaginal confirma gestação intrauterina de 7 semanas.
A: Gravidez normal no primeiro trimestre.
P: Orientação nutricional, prescrição de ácido fólico 5 mg/dia, retorno em 4 semanas.`,
    expectedEntities: [
      { text: 'náuseas matinais', type: 'SYMPTOM', startIndex: 36, endIndex: 52, codes: { ciap2: 'W05' } },
      { text: 'fadiga', type: 'SYMPTOM', startIndex: 55, endIndex: 61, codes: { ciap2: 'A04' } },
      { text: 'beta-hCG', type: 'EXAM', startIndex: 152, endIndex: 160 },
      { text: 'ultrassonografia transvaginal', type: 'EXAM', startIndex: 175, endIndex: 204 },
      { text: 'Gravidez normal', type: 'DISEASE', startIndex: 259, endIndex: 274, codes: { icd10: 'Z34.0' } },
      { text: 'ácido fólico', type: 'MEDICATION', startIndex: 337, endIndex: 349, codes: { atc: 'B03BB01' } },
    ],
  },
  {
    id: 'obgyn-002',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Gestational diabetes management',
    input: `S: Paciente de 32 anos, G1, com glicemia de jejum alterada na 24ª semana, relata poliúria e polidipsia.
O: PA 120/80, IMC 28, glicemia de jejum 105 mg/dL, hemoglobina glicada 6.2%, ultrassom fetal normal.
A: Diabetes mellitus gestacional.
P: Dieta hipocalórica, monitoramento glicêmico domiciliar, metformina 500 mg 2x/dia, consulta com nutricionista.`,
    expectedEntities: [
      { text: 'poliúria', type: 'SYMPTOM', startIndex: 81, endIndex: 89, codes: { ciap2: 'U02' } },
      { text: 'polidipsia', type: 'SYMPTOM', startIndex: 92, endIndex: 102, codes: { ciap2: 'T11' } },
      { text: 'glicemia de jejum', type: 'EXAM', startIndex: 31, endIndex: 48 },
      { text: 'hemoglobina glicada', type: 'EXAM', startIndex: 152, endIndex: 171 },
      { text: 'Diabetes mellitus gestacional', type: 'DISEASE', startIndex: 211, endIndex: 240, codes: { icd10: 'O24.4' } },
      { text: 'metformina', type: 'MEDICATION', startIndex: 302, endIndex: 312, codes: { atc: 'A10BA02' } },
    ],
  },
  {
    id: 'obgyn-003',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Preeclampsia evaluation',
    input: `S: Paciente de 30 anos, G3P2, na 34ª semana, relata cefaleia intensa e edema em membros inferiores.
O: PA 150/100 mmHg, proteinúria 2+, edema +/4+, creatinina 0.9 mg/dL, plaquetas 150.000.
A: Pré-eclâmpsia moderada.
P: Repouso relativo, sulfato de magnésio IV se necessário, labetalol, planejamento de parto.`,
    expectedEntities: [
      { text: 'cefaleia intensa', type: 'SYMPTOM', startIndex: 51, endIndex: 67, codes: { ciap2: 'N01' } },
      { text: 'edema em membros inferiores', type: 'SYMPTOM', startIndex: 70, endIndex: 97, codes: { ciap2: 'K07' } },
      { text: 'proteinúria', type: 'EXAM', startIndex: 121, endIndex: 132 },
      { text: 'creatinina', type: 'EXAM', startIndex: 146, endIndex: 156 },
      { text: 'Pré-eclâmpsia moderada', type: 'DISEASE', startIndex: 191, endIndex: 213, codes: { icd10: 'O14.0' } },
      { text: 'sulfato de magnésio', type: 'MEDICATION', startIndex: 235, endIndex: 254, codes: { atc: 'A12CC02' } },
      { text: 'labetalol', type: 'MEDICATION', startIndex: 273, endIndex: 282, codes: { atc: 'C07AG01' } },
    ],
  },
  {
    id: 'obgyn-004',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Postpartum hemorrhage',
    input: `S: Paciente de 26 anos, pós-parto vaginal há 2 horas, relata sangramento vaginal abundante e tontura.
O: PA 90/60, pulso 110 bpm, útero subinvoluído, hemoglobina 8 g/dL, coagulograma normal.
A: Hemorragia pós-parto.
P: Massagem uterina, ocitocina 20 UI IV, transfusão de concentrado de hemácias se persistir.`,
    expectedEntities: [
      { text: 'sangramento vaginal abundante', type: 'SYMPTOM', startIndex: 55, endIndex: 84, codes: { ciap2: 'W17' } },
      { text: 'tontura', type: 'SYMPTOM', startIndex: 87, endIndex: 94, codes: { ciap2: 'N17' } },
      { text: 'hemoglobina', type: 'EXAM', startIndex: 149, endIndex: 160 },
      { text: 'coagulograma', type: 'EXAM', startIndex: 172, endIndex: 184 },
      { text: 'Hemorragia pós-parto', type: 'DISEASE', startIndex: 197, endIndex: 217, codes: { icd10: 'O72.1' } },
      { text: 'ocitocina', type: 'MEDICATION', startIndex: 241, endIndex: 250, codes: { atc: 'H01BB02' } },
    ],
  },
  {
    id: 'obgyn-005',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Vulvovaginal candidiasis',
    input: `S: Paciente de 24 anos, relata prurido vulvar intenso e corrimento branco espesso há 3 dias.
O: Exame ginecológico: hiperemia vulvar, leucorreia espessa, pH vaginal 4.5, cultura positiva para Candida albicans.
A: Candidíase vulvovaginal.
P: Fluconazol 150 mg dose única oral, higiene local, retorno se persistir.`,
    expectedEntities: [
      { text: 'prurido vulvar intenso', type: 'SYMPTOM', startIndex: 30, endIndex: 52, codes: { ciap2: 'X16' } },
      { text: 'corrimento branco espesso', type: 'SYMPTOM', startIndex: 55, endIndex: 80, codes: { ciap2: 'X14' } },
      { text: 'Exame ginecológico', type: 'EXAM', startIndex: 95, endIndex: 113 },
      { text: 'pH vaginal', type: 'EXAM', startIndex: 149, endIndex: 159 },
      { text: 'Candidíase vulvovaginal', type: 'DISEASE', startIndex: 218, endIndex: 241, codes: { icd10: 'B37.3' } },
      { text: 'Fluconazol', type: 'MEDICATION', startIndex: 246, endIndex: 256, codes: { atc: 'J02AC01' } },
    ],
  },
  {
    id: 'obgyn-006',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Polycystic ovary syndrome',
    input: `S: Paciente de 29 anos, com ciclos menstruais irregulares e ganho de peso há 2 anos, infertilidade.
O: IMC 32, hirsutismo moderado, USG pélvica: ovários policísticos, testosterona elevada 120 ng/dL.
A: Síndrome dos ovários policísticos.
P: Anticoncepcional oral combinado, metformina 850 mg/dia, orientação para perda de peso.`,
    expectedEntities: [
      { text: 'ciclos menstruais irregulares', type: 'SYMPTOM', startIndex: 27, endIndex: 56, codes: { ciap2: 'X07' } },
      { text: 'ganho de peso', type: 'SYMPTOM', startIndex: 59, endIndex: 72, codes: { ciap2: 'T08' } },
      { text: 'infertilidade', type: 'SYMPTOM', startIndex: 85, endIndex: 98, codes: { ciap2: 'W15' } },
      { text: 'hirsutismo', type: 'EXAM', startIndex: 113, endIndex: 123 },
      { text: 'USG pélvica', type: 'EXAM', startIndex: 135, endIndex: 146 },
      { text: 'Síndrome dos ovários policísticos', type: 'DISEASE', startIndex: 199, endIndex: 232, codes: { icd10: 'E28.2' } },
      { text: 'Anticoncepcional oral combinado', type: 'MEDICATION', startIndex: 237, endIndex: 268, codes: { atc: 'G03AA' } },
      { text: 'metformina', type: 'MEDICATION', startIndex: 270, endIndex: 280, codes: { atc: 'A10BA02' } },
    ],
  },
  {
    id: 'obgyn-007',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Endometriosis pain management',
    input: `S: Paciente de 35 anos, relata dismenorreia severa e dor pélvica crônica durante menstruação.
O: Exame físico: dor à palpação em fundo de saco, USG transvaginal normal, CA-125 45 U/mL.
A: Endometriose suspeita.
P: Ibuprofeno 600 mg 3x/dia, anticoncepcional oral, laparoscopia diagnóstica se refratária.`,
    expectedEntities: [
      { text: 'dismenorreia severa', type: 'SYMPTOM', startIndex: 30, endIndex: 49, codes: { ciap2: 'X02' } },
      { text: 'dor pélvica crônica', type: 'SYMPTOM', startIndex: 52, endIndex: 71, codes: { ciap2: 'X01' } },
      { text: 'Exame físico', type: 'EXAM', startIndex: 96, endIndex: 108 },
      { text: 'USG transvaginal', type: 'EXAM', startIndex: 138, endIndex: 154 },
      { text: 'CA-125', type: 'EXAM', startIndex: 164, endIndex: 170 },
      { text: 'Endometriose', type: 'DISEASE', startIndex: 186, endIndex: 198, codes: { icd10: 'N80' } },
      { text: 'Ibuprofeno', type: 'MEDICATION', startIndex: 216, endIndex: 226, codes: { atc: 'M01AE01' } },
      { text: 'anticoncepcional oral', type: 'MEDICATION', startIndex: 241, endIndex: 262, codes: { atc: 'G03AA' } },
    ],
  },
  {
    id: 'obgyn-008',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Menopause hormone therapy',
    input: `S: Paciente de 52 anos, relata fogachos intensos e insônia pós-menopausa confirmada.
O: FSH >30 mUI/mL, estradiol baixo 15 pg/mL, exame mamário normal, densitometria óssea T-score -1.5.
A: Climatério com sintomas vasomotores.
P: Terapia hormonal: estrogênio conjugado 0.625 mg/dia, progestágeno se útero intacto, monitoramento anual.`,
    expectedEntities: [
      { text: 'fogachos intensos', type: 'SYMPTOM', startIndex: 30, endIndex: 47, codes: { ciap2: 'X11' } },
      { text: 'insônia', type: 'SYMPTOM', startIndex: 50, endIndex: 57, codes: { ciap2: 'P06' } },
      { text: 'FSH', type: 'EXAM', startIndex: 87, endIndex: 90 },
      { text: 'estradiol', type: 'EXAM', startIndex: 103, endIndex: 112 },
      { text: 'exame mamário', type: 'EXAM', startIndex: 129, endIndex: 142 },
      { text: 'densitometria óssea', type: 'EXAM', startIndex: 152, endIndex: 171 },
      { text: 'Climatério', type: 'DISEASE', startIndex: 190, endIndex: 200, codes: { icd10: 'N95.1' } },
      { text: 'estrogênio conjugado', type: 'MEDICATION', startIndex: 249, endIndex: 269, codes: { atc: 'G03CA57' } },
    ],
  },
  {
    id: 'obgyn-009',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Abnormal uterine bleeding',
    input: `S: Paciente de 42 anos, relata sangramento uterino irregular e abundante há 6 meses, sem dor.
O: PA 118/76, hemoglobina 10.5 g/dL, USG: mioma submucoso 3 cm, endométrio espessado 12 mm.
A: Sangramento uterino anormal.
P: Ácido tranexâmico 500 mg 3x/dia durante sangramento, DIU com levonorgestrel, histeroscopia.`,
    expectedEntities: [
      { text: 'sangramento uterino irregular e abundante', type: 'SYMPTOM', startIndex: 30, endIndex: 71, codes: { ciap2: 'X06' } },
      { text: 'hemoglobina', type: 'EXAM', startIndex: 106, endIndex: 117 },
      { text: 'USG', type: 'EXAM', startIndex: 131, endIndex: 134 },
      { text: 'endométrio espessado', type: 'EXAM', startIndex: 159, endIndex: 179 },
      { text: 'Sangramento uterino anormal', type: 'DISEASE', startIndex: 191, endIndex: 218, codes: { icd10: 'N93.9' } },
      { text: 'Ácido tranexâmico', type: 'MEDICATION', startIndex: 223, endIndex: 240, codes: { atc: 'B02AA02' } },
      { text: 'DIU com levonorgestrel', type: 'MEDICATION', startIndex: 276, endIndex: 298, codes: { atc: 'G02BA03' } },
    ],
  },
  {
    id: 'obgyn-010',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Contraception counseling',
    input: `S: Paciente de 27 anos, nulípara, deseja método contraceptivo de longa duração, sem comorbidades.
O: Exame ginecológico normal, PA 110/70, peso 60 kg, sem contraindicações.
A: Aconselhamento contraceptivo.
P: Opções: pílula anticoncepcional, DIU de cobre ou hormonal, implante subdérmico, discutir eficácia.`,
    expectedEntities: [
      { text: 'método contraceptivo', type: 'SYMPTOM', startIndex: 40, endIndex: 60, codes: { ciap2: 'W14' } },
      { text: 'Exame ginecológico', type: 'EXAM', startIndex: 101, endIndex: 119 },
      { text: 'Aconselhamento contraceptivo', type: 'DISEASE', startIndex: 178, endIndex: 206, codes: { icd10: 'Z30.0' } },
      { text: 'pílula anticoncepcional', type: 'MEDICATION', startIndex: 218, endIndex: 241, codes: { atc: 'G03AA' } },
      { text: 'DIU de cobre', type: 'MEDICATION', startIndex: 243, endIndex: 255, codes: { atc: 'G02BA01' } },
    ],
  },
];

// =============================================================================
// MENTAL HEALTH TEST CASES (10 cases)
// =============================================================================

export const mentalHealthTestCases: TestCase[] = [
  {
    id: 'mental-001',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'New diagnosis of major depressive disorder',
    input: `S: Paciente de 35 anos relata tristeza persistente, perda de apetite e fadiga intensa há 8 semanas. Nega ideação suicida.
O: Aparência desleixada, afeto restrito, raciocínio lento. Exame de status mental revela humor disfórico.
A: Transtorno Depressivo Maior, episódio único moderado.
P: Iniciar fluoxetina 20mg/dia, agendar psicoterapia cognitivo-comportamental semanal.`,
    expectedEntities: [
      { text: 'tristeza persistente', type: 'SYMPTOM', startIndex: 27, endIndex: 47, codes: { ciap2: 'P03' } },
      { text: 'perda de apetite', type: 'SYMPTOM', startIndex: 49, endIndex: 65, codes: { ciap2: 'T03' } },
      { text: 'fadiga intensa', type: 'SYMPTOM', startIndex: 68, endIndex: 82, codes: { ciap2: 'A04' } },
      { text: 'Exame de status mental', type: 'EXAM', startIndex: 168, endIndex: 190 },
      { text: 'Transtorno Depressivo Maior', type: 'DISEASE', startIndex: 217, endIndex: 244, codes: { icd10: 'F32.1' } },
      { text: 'fluoxetina', type: 'MEDICATION', startIndex: 291, endIndex: 301, codes: { atc: 'N06AB03' } },
    ],
  },
  {
    id: 'mental-002',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Generalized anxiety disorder',
    input: `S: Paciente relata ansiedade constante, inquietação e dificuldade para concentrar há 6 meses. Preocupação excessiva.
O: Aparência tensa, tremor fino nas mãos. Exame mental mostra ansiedade generalizada.
A: Transtorno de Ansiedade Generalizada.
P: Prescrever escitalopram 10mg/dia, terapia cognitivo-comportamental.`,
    expectedEntities: [
      { text: 'ansiedade constante', type: 'SYMPTOM', startIndex: 18, endIndex: 37, codes: { ciap2: 'P01' } },
      { text: 'inquietação', type: 'SYMPTOM', startIndex: 39, endIndex: 50, codes: { ciap2: 'P01' } },
      { text: 'dificuldade para concentrar', type: 'SYMPTOM', startIndex: 53, endIndex: 80, codes: { ciap2: 'P20' } },
      { text: 'Exame mental', type: 'EXAM', startIndex: 145, endIndex: 157 },
      { text: 'Transtorno de Ansiedade Generalizada', type: 'DISEASE', startIndex: 198, endIndex: 234, codes: { icd10: 'F41.1' } },
      { text: 'escitalopram', type: 'MEDICATION', startIndex: 250, endIndex: 262, codes: { atc: 'N06AB10' } },
    ],
  },
  {
    id: 'mental-003',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Panic disorder with agoraphobia',
    input: `S: Paciente descreve ataques de pânico frequentes com medo de sair de casa, sudorese e palpitações.
O: Aparência ansiosa, hiperventilação. Avaliação de status mental confirma pânico.
A: Transtorno de Pânico com Agorafobia.
P: Iniciar alprazolam 0,5mg conforme necessário, exposição gradual em terapia.`,
    expectedEntities: [
      { text: 'ataques de pânico', type: 'SYMPTOM', startIndex: 20, endIndex: 37, codes: { ciap2: 'P74' } },
      { text: 'sudorese', type: 'SYMPTOM', startIndex: 75, endIndex: 83, codes: { ciap2: 'A09' } },
      { text: 'palpitações', type: 'SYMPTOM', startIndex: 86, endIndex: 97, codes: { ciap2: 'K04' } },
      { text: 'Avaliação de status mental', type: 'EXAM', startIndex: 131, endIndex: 157 },
      { text: 'Transtorno de Pânico com Agorafobia', type: 'DISEASE', startIndex: 177, endIndex: 212, codes: { icd10: 'F40.01' } },
      { text: 'alprazolam', type: 'MEDICATION', startIndex: 226, endIndex: 236, codes: { atc: 'N05BA12' } },
    ],
  },
  {
    id: 'mental-004',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Bipolar disorder manic episode',
    input: `S: Paciente apresenta euforia excessiva, diminuição do sono e ideias grandiosas há 1 semana. Aumento de energia.
O: Aparência agitada, fala rápida, insight pobre. Exame mental indica mania.
A: Transtorno Bipolar, episódio maníaco atual.
P: Iniciar valproato 500mg/dia, monitorar humor.`,
    expectedEntities: [
      { text: 'euforia excessiva', type: 'SYMPTOM', startIndex: 21, endIndex: 38, codes: { ciap2: 'P04' } },
      { text: 'diminuição do sono', type: 'SYMPTOM', startIndex: 40, endIndex: 58, codes: { ciap2: 'P06' } },
      { text: 'ideias grandiosas', type: 'SYMPTOM', startIndex: 61, endIndex: 78, codes: { ciap2: 'P72' } },
      { text: 'Exame mental', type: 'EXAM', startIndex: 152, endIndex: 164 },
      { text: 'Transtorno Bipolar', type: 'DISEASE', startIndex: 186, endIndex: 204, codes: { icd10: 'F31.1' } },
      { text: 'valproato', type: 'MEDICATION', startIndex: 247, endIndex: 256, codes: { atc: 'N03AG01' } },
    ],
  },
  {
    id: 'mental-005',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Schizophrenia stable follow-up',
    input: `S: Paciente relata alucinações auditivas controladas com medicação, sem delírios recentes. Cumpre adesão.
O: Aparência organizada, afeto apropriado. Exame de status mental estável.
A: Esquizofrenia, fase residual.
P: Manter risperidona 4mg/dia, consulta psiquiátrica mensal.`,
    expectedEntities: [
      { text: 'alucinações auditivas', type: 'SYMPTOM', startIndex: 18, endIndex: 39, codes: { ciap2: 'P98' } },
      { text: 'delírios', type: 'SYMPTOM', startIndex: 69, endIndex: 77, codes: { ciap2: 'P98' } },
      { text: 'Exame de status mental', type: 'EXAM', startIndex: 140, endIndex: 162 },
      { text: 'Esquizofrenia', type: 'DISEASE', startIndex: 176, endIndex: 189, codes: { icd10: 'F20.5' } },
      { text: 'risperidona', type: 'MEDICATION', startIndex: 220, endIndex: 231, codes: { atc: 'N05AX08' } },
    ],
  },
  {
    id: 'mental-006',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'PTSD evaluation',
    input: `S: Paciente relata flashbacks de trauma de acidente, pesadelos e evitação social há 3 meses. Hipervigilância.
O: Aparência vigilante, tremor. Avaliação mental revela sintomas de TEPT.
A: Transtorno de Estresse Pós-Traumático.
P: Iniciar sertralina 50mg/dia, EMDR therapy.`,
    expectedEntities: [
      { text: 'flashbacks', type: 'SYMPTOM', startIndex: 18, endIndex: 28, codes: { ciap2: 'P82' } },
      { text: 'pesadelos', type: 'SYMPTOM', startIndex: 51, endIndex: 60, codes: { ciap2: 'P06' } },
      { text: 'evitação social', type: 'SYMPTOM', startIndex: 63, endIndex: 78, codes: { ciap2: 'P82' } },
      { text: 'Hipervigilância', type: 'SYMPTOM', startIndex: 93, endIndex: 108, codes: { ciap2: 'P82' } },
      { text: 'Avaliação mental', type: 'EXAM', startIndex: 140, endIndex: 156 },
      { text: 'Transtorno de Estresse Pós-Traumático', type: 'DISEASE', startIndex: 186, endIndex: 223, codes: { icd10: 'F43.1' } },
      { text: 'sertralina', type: 'MEDICATION', startIndex: 237, endIndex: 247, codes: { atc: 'N06AB06' } },
    ],
  },
  {
    id: 'mental-007',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Alcohol use disorder',
    input: `S: Paciente admite consumo excessivo de álcool diário, tolerância aumentada e abstinência com tremores.
O: Aparência desnutrida, odor alcoólico. Exame mental mostra craving.
A: Transtorno por Uso de Álcool, dependência.
P: Iniciar dissulfiram 250mg/dia, grupo de apoio AA.`,
    expectedEntities: [
      { text: 'consumo excessivo de álcool', type: 'SYMPTOM', startIndex: 18, endIndex: 45, codes: { ciap2: 'P15' } },
      { text: 'tolerância aumentada', type: 'SYMPTOM', startIndex: 54, endIndex: 74, codes: { ciap2: 'P15' } },
      { text: 'abstinência com tremores', type: 'SYMPTOM', startIndex: 77, endIndex: 101, codes: { ciap2: 'P15' } },
      { text: 'Exame mental', type: 'EXAM', startIndex: 140, endIndex: 152 },
      { text: 'Transtorno por Uso de Álcool', type: 'DISEASE', startIndex: 175, endIndex: 203, codes: { icd10: 'F10.2' } },
      { text: 'dissulfiram', type: 'MEDICATION', startIndex: 227, endIndex: 238, codes: { atc: 'N07BB01' } },
    ],
  },
  {
    id: 'mental-008',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Primary insomnia',
    input: `S: Paciente queixa de dificuldade para iniciar o sono, despertares noturnos frequentes há 4 meses.
O: Aparência cansada, afeto irritável. Exame de sono sugere insônia primária.
A: Insônia não orgânica.
P: Prescrever zolpidem 10mg à noite, higiene do sono.`,
    expectedEntities: [
      { text: 'dificuldade para iniciar o sono', type: 'SYMPTOM', startIndex: 21, endIndex: 52, codes: { ciap2: 'P06' } },
      { text: 'despertares noturnos frequentes', type: 'SYMPTOM', startIndex: 54, endIndex: 85, codes: { ciap2: 'P06' } },
      { text: 'Exame de sono', type: 'EXAM', startIndex: 124, endIndex: 137 },
      { text: 'Insônia não orgânica', type: 'DISEASE', startIndex: 167, endIndex: 187, codes: { icd10: 'F51.0' } },
      { text: 'zolpidem', type: 'MEDICATION', startIndex: 204, endIndex: 212, codes: { atc: 'N05CF02' } },
    ],
  },
  {
    id: 'mental-009',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'Adjustment disorder',
    input: `S: Paciente relata ansiedade e choro após demissão recente, sintomas iniciaram há 2 semanas.
O: Aparência abatida, humor ansioso. Avaliação mental confirma ajuste.
A: Transtorno Adaptativo com ansiedade.
P: Psicoterapia de apoio, monitorar evolução.`,
    expectedEntities: [
      { text: 'ansiedade', type: 'SYMPTOM', startIndex: 18, endIndex: 27, codes: { ciap2: 'P01' } },
      { text: 'choro', type: 'SYMPTOM', startIndex: 30, endIndex: 35, codes: { ciap2: 'P03' } },
      { text: 'Avaliação mental', type: 'EXAM', startIndex: 128, endIndex: 144 },
      { text: 'Transtorno Adaptativo', type: 'DISEASE', startIndex: 165, endIndex: 186, codes: { icd10: 'F43.22' } },
    ],
  },
  {
    id: 'mental-010',
    category: 'specialized',
    difficulty: 'medium',
    clinicalContext: 'OCD with medication adjustment',
    input: `S: Paciente descreve obsessões com contaminação e compulsões de lavagem, sintomas persistentes apesar de medicação.
O: Aparência limpa excessiva, ritualística. Exame mental mostra TOC ativo.
A: Transtorno Obsessivo-Compulsivo.
P: Aumentar fluoxetina para 40mg/dia, terapia de exposição.`,
    expectedEntities: [
      { text: 'obsessões com contaminação', type: 'SYMPTOM', startIndex: 20, endIndex: 46, codes: { ciap2: 'P79' } },
      { text: 'compulsões de lavagem', type: 'SYMPTOM', startIndex: 49, endIndex: 70, codes: { ciap2: 'P79' } },
      { text: 'Exame mental', type: 'EXAM', startIndex: 156, endIndex: 168 },
      { text: 'Transtorno Obsessivo-Compulsivo', type: 'DISEASE', startIndex: 192, endIndex: 223, codes: { icd10: 'F42' } },
      { text: 'fluoxetina', type: 'MEDICATION', startIndex: 238, endIndex: 248, codes: { atc: 'N06AB03' } },
    ],
  },
];

// =============================================================================
// EMERGENCY MEDICINE TEST CASES (10 cases)
// =============================================================================

export const emergencyTestCases: TestCase[] = [
  {
    id: 'emergency-001',
    category: 'specialized',
    difficulty: 'hard',
    clinicalContext: 'Patient presenting with chest pain suggestive of STEMI',
    input: `S: Paciente masculino, 55 anos, refere dor torácica intensa de início súbito há 2 horas, irradiando para o braço esquerdo, associada a sudorese profusa e náuseas.
O: PA 140/90 mmHg, FC 110 bpm, FR 20 irpm, SatO2 95%. ECG: elevação do ST em derivações V1-V4. Troponina I elevada 2,5 ng/mL.
A: Infarto agudo do miocárdio com supradesnivelamento do ST.
P: Aspirina 300 mg VO, clopidogrel 600 mg VO, heparina IV. Transferir para hemodinâmica para angioplastia primária.`,
    expectedEntities: [
      { text: 'dor torácica intensa', type: 'SYMPTOM', startIndex: 38, endIndex: 58, codes: { ciap2: 'K01' } },
      { text: 'sudorese profusa', type: 'SYMPTOM', startIndex: 124, endIndex: 140, codes: { ciap2: 'A09' } },
      { text: 'náuseas', type: 'SYMPTOM', startIndex: 143, endIndex: 150, codes: { ciap2: 'D09' } },
      { text: 'ECG', type: 'EXAM', startIndex: 206, endIndex: 209 },
      { text: 'elevação do ST', type: 'EXAM', startIndex: 211, endIndex: 225 },
      { text: 'Troponina I', type: 'EXAM', startIndex: 250, endIndex: 261 },
      { text: 'Infarto agudo do miocárdio com supradesnivelamento do ST', type: 'DISEASE', startIndex: 289, endIndex: 345, codes: { icd10: 'I21.0' } },
      { text: 'Aspirina', type: 'MEDICATION', startIndex: 350, endIndex: 358, codes: { atc: 'B01AC06' } },
      { text: 'clopidogrel', type: 'MEDICATION', startIndex: 372, endIndex: 383, codes: { atc: 'B01AC04' } },
      { text: 'heparina', type: 'MEDICATION', startIndex: 396, endIndex: 404, codes: { atc: 'B01AB01' } },
    ],
  },
  {
    id: 'emergency-002',
    category: 'specialized',
    difficulty: 'hard',
    clinicalContext: 'Patient with sudden onset of hemiparesis, candidate for thrombolysis',
    input: `S: Paciente feminina, 68 anos, refere fraqueza súbita no braço e perna direitos há 1 hora, dificuldade para falar.
O: PA 160/95 mmHg, FC 80 bpm. Exame neurológico: hemiparesia direita grau 2/5, afasia expressiva. TC de crânio sem sangramento. NIHSS 12.
A: Acidente vascular cerebral isquêmico agudo, candidato a trombólise.
P: Alteplase 0,9 mg/kg IV. Controlar PA com labetalol IV. Admitir em UTI neurológica.`,
    expectedEntities: [
      { text: 'fraqueza súbita', type: 'SYMPTOM', startIndex: 37, endIndex: 52, codes: { ciap2: 'N18' } },
      { text: 'dificuldade para falar', type: 'SYMPTOM', startIndex: 90, endIndex: 112, codes: { ciap2: 'N19' } },
      { text: 'hemiparesia direita', type: 'EXAM', startIndex: 164, endIndex: 183 },
      { text: 'afasia expressiva', type: 'EXAM', startIndex: 196, endIndex: 213 },
      { text: 'TC de crânio', type: 'EXAM', startIndex: 215, endIndex: 227 },
      { text: 'NIHSS', type: 'EXAM', startIndex: 247, endIndex: 252 },
      { text: 'Acidente vascular cerebral isquêmico agudo', type: 'DISEASE', startIndex: 261, endIndex: 303, codes: { icd10: 'I63.9' } },
      { text: 'Alteplase', type: 'MEDICATION', startIndex: 331, endIndex: 340, codes: { atc: 'B01AD02' } },
      { text: 'labetalol', type: 'MEDICATION', startIndex: 371, endIndex: 380, codes: { atc: 'C07AG01' } },
    ],
  },
  {
    id: 'emergency-003',
    category: 'specialized',
    difficulty: 'hard',
    clinicalContext: 'Patient with right lower quadrant pain suspicious for appendicitis',
    input: `S: Paciente masculino, 28 anos, dor abdominal em quadrante inferior direito iniciada há 12 horas, náuseas, vômitos e febre.
O: PA 120/80, FC 95 bpm, T 38°C. Sensibilidade em fossa ilíaca direita, sinal de Rovsing positivo. USG: apêndice >6mm.
A: Apendicite aguda.
P: Jejum, hidratação IV, dipirona 1g IV. Ceftriaxona 1g IV + metronidazol 500mg IV. Apendicectomia laparoscópica urgente.`,
    expectedEntities: [
      { text: 'dor abdominal', type: 'SYMPTOM', startIndex: 31, endIndex: 44, codes: { ciap2: 'D01' } },
      { text: 'náuseas', type: 'SYMPTOM', startIndex: 98, endIndex: 105, codes: { ciap2: 'D09' } },
      { text: 'vômitos', type: 'SYMPTOM', startIndex: 107, endIndex: 114, codes: { ciap2: 'D10' } },
      { text: 'febre', type: 'SYMPTOM', startIndex: 117, endIndex: 122, codes: { ciap2: 'A03' } },
      { text: 'sinal de Rovsing', type: 'EXAM', startIndex: 195, endIndex: 211 },
      { text: 'USG', type: 'EXAM', startIndex: 222, endIndex: 225 },
      { text: 'Apendicite aguda', type: 'DISEASE', startIndex: 245, endIndex: 261, codes: { icd10: 'K35.80' } },
      { text: 'dipirona', type: 'MEDICATION', startIndex: 293, endIndex: 301, codes: { atc: 'N02BB02' } },
      { text: 'Ceftriaxona', type: 'MEDICATION', startIndex: 310, endIndex: 321, codes: { atc: 'J01DD04' } },
      { text: 'metronidazol', type: 'MEDICATION', startIndex: 333, endIndex: 345, codes: { atc: 'J01XD01' } },
    ],
  },
  {
    id: 'emergency-004',
    category: 'specialized',
    difficulty: 'hard',
    clinicalContext: 'Diabetic patient with altered mental status and hyperglycemia',
    input: `S: Paciente feminina, 42 anos, diabética tipo 1, refere poliúria, polidipsia e fadiga há 3 dias, vômitos hoje.
O: PA 110/70, FC 110 bpm, FR 28 irpm, T 37.5°C, glicemia capilar 450 mg/dL. Desidratada, hálito cetônico, confusão. Gasometria: pH 7.2, bicarbonato 10.
A: Cetoacidose diabética.
P: Hidratação com SF 0,9% 1L em 1h. Insulina regular IV bolus + infusão. Monitorar glicemia e potássio. UTI.`,
    expectedEntities: [
      { text: 'poliúria', type: 'SYMPTOM', startIndex: 56, endIndex: 64, codes: { ciap2: 'U02' } },
      { text: 'polidipsia', type: 'SYMPTOM', startIndex: 66, endIndex: 76, codes: { ciap2: 'T11' } },
      { text: 'fadiga', type: 'SYMPTOM', startIndex: 79, endIndex: 85, codes: { ciap2: 'A04' } },
      { text: 'vômitos', type: 'SYMPTOM', startIndex: 97, endIndex: 104, codes: { ciap2: 'D10' } },
      { text: 'glicemia capilar', type: 'EXAM', startIndex: 150, endIndex: 166 },
      { text: 'hálito cetônico', type: 'EXAM', startIndex: 192, endIndex: 207 },
      { text: 'Gasometria', type: 'EXAM', startIndex: 219, endIndex: 229 },
      { text: 'Cetoacidose diabética', type: 'DISEASE', startIndex: 261, endIndex: 282, codes: { icd10: 'E10.10' } },
      { text: 'Insulina regular', type: 'MEDICATION', startIndex: 319, endIndex: 335, codes: { atc: 'A10AB01' } },
    ],
  },
  {
    id: 'emergency-005',
    category: 'specialized',
    difficulty: 'hard',
    clinicalContext: 'Elderly patient with fever and hypotension indicating septic shock',
    input: `S: Paciente masculino, 72 anos, refere febre alta e calafrios há 48 horas, dor lombar e disúria, piora com confusão.
O: PA 80/50, FC 120 bpm, FR 30 irpm, SatO2 92%, T 39.5°C. Oligúria. Urocultura: E. coli. Lactato 4,5 mmol/L. Leucócitos 18.000.
A: Choque séptico secundário a pielonefrite.
P: Ressuscitação volêmica SF 30 mL/kg. Ciprofloxacino 400mg IV + gentamicina 5mg/kg IV. Noradrenalina se PAM <65. UTI.`,
    expectedEntities: [
      { text: 'febre alta', type: 'SYMPTOM', startIndex: 38, endIndex: 48, codes: { ciap2: 'A03' } },
      { text: 'calafrios', type: 'SYMPTOM', startIndex: 51, endIndex: 60, codes: { ciap2: 'A02' } },
      { text: 'dor lombar', type: 'SYMPTOM', startIndex: 75, endIndex: 85, codes: { ciap2: 'L03' } },
      { text: 'disúria', type: 'SYMPTOM', startIndex: 88, endIndex: 95, codes: { ciap2: 'U01' } },
      { text: 'confusão', type: 'SYMPTOM', startIndex: 107, endIndex: 115, codes: { ciap2: 'P20' } },
      { text: 'Urocultura', type: 'EXAM', startIndex: 178, endIndex: 188 },
      { text: 'Lactato', type: 'EXAM', startIndex: 199, endIndex: 206 },
      { text: 'Leucócitos', type: 'EXAM', startIndex: 221, endIndex: 231 },
      { text: 'Choque séptico', type: 'DISEASE', startIndex: 243, endIndex: 257, codes: { icd10: 'A41.9' } },
      { text: 'pielonefrite', type: 'DISEASE', startIndex: 272, endIndex: 284, codes: { icd10: 'N12' } },
      { text: 'Ciprofloxacino', type: 'MEDICATION', startIndex: 319, endIndex: 333, codes: { atc: 'J01MA02' } },
      { text: 'gentamicina', type: 'MEDICATION', startIndex: 346, endIndex: 357, codes: { atc: 'J01GB03' } },
      { text: 'Noradrenalina', type: 'MEDICATION', startIndex: 372, endIndex: 385, codes: { atc: 'C01CA03' } },
    ],
  },
  {
    id: 'emergency-006',
    category: 'specialized',
    difficulty: 'hard',
    clinicalContext: 'Patient with acute allergic reaction after insect sting',
    input: `S: Paciente feminina, 35 anos, picada de abelha há 20 minutos, refere urticária generalizada, dificuldade respiratória e tontura.
O: PA 100/60, FC 110 bpm, FR 25 irpm, SatO2 90%. Edema de face e língua, sibilos difusos, hipotensão.
A: Anafilaxia.
P: Adrenalina IM 0,3 mg imediata, repetir se necessário. Difenidramina 50 mg IV. Hidrocortisona 100 mg IV. Oxigênio via máscara.`,
    expectedEntities: [
      { text: 'urticária generalizada', type: 'SYMPTOM', startIndex: 70, endIndex: 92, codes: { ciap2: 'S98' } },
      { text: 'dificuldade respiratória', type: 'SYMPTOM', startIndex: 94, endIndex: 118, codes: { ciap2: 'R02' } },
      { text: 'tontura', type: 'SYMPTOM', startIndex: 121, endIndex: 128, codes: { ciap2: 'N17' } },
      { text: 'Edema de face e língua', type: 'EXAM', startIndex: 177, endIndex: 199 },
      { text: 'sibilos difusos', type: 'EXAM', startIndex: 201, endIndex: 216 },
      { text: 'Anafilaxia', type: 'DISEASE', startIndex: 234, endIndex: 244, codes: { icd10: 'T78.2' } },
      { text: 'Adrenalina', type: 'MEDICATION', startIndex: 249, endIndex: 259, codes: { atc: 'C01CA24' } },
      { text: 'Difenidramina', type: 'MEDICATION', startIndex: 303, endIndex: 316, codes: { atc: 'R06AA02' } },
      { text: 'Hidrocortisona', type: 'MEDICATION', startIndex: 329, endIndex: 343, codes: { atc: 'H02AB09' } },
    ],
  },
  {
    id: 'emergency-007',
    category: 'specialized',
    difficulty: 'hard',
    clinicalContext: 'Trauma patient from motor vehicle accident with multiple injuries',
    input: `S: Paciente masculino, 40 anos, vítima de colisão frontal há 30 minutos, refere dor intensa em tórax e abdome, tontura e dispneia.
O: PA 90/60, FC 130 bpm, FR 35 irpm, SatO2 88%. Hematoma torácico, crepitação. RX tórax: pneumotórax direito. FAST positivo.
A: Trauma torácico com pneumotórax e trauma abdominal com hemorragia.
P: Oxigênio 100%, acesso venoso. Tubo torácico direito urgente. Transferir para cirurgia para laparotomia exploradora. UTI trauma.`,
    expectedEntities: [
      { text: 'dor intensa em tórax', type: 'SYMPTOM', startIndex: 80, endIndex: 100, codes: { ciap2: 'A11' } },
      { text: 'tontura', type: 'SYMPTOM', startIndex: 112, endIndex: 119, codes: { ciap2: 'N17' } },
      { text: 'dispneia', type: 'SYMPTOM', startIndex: 122, endIndex: 130, codes: { ciap2: 'R02' } },
      { text: 'Hematoma torácico', type: 'EXAM', startIndex: 178, endIndex: 195 },
      { text: 'RX tórax', type: 'EXAM', startIndex: 210, endIndex: 218 },
      { text: 'pneumotórax direito', type: 'EXAM', startIndex: 220, endIndex: 239 },
      { text: 'FAST', type: 'EXAM', startIndex: 241, endIndex: 245 },
      { text: 'Trauma torácico', type: 'DISEASE', startIndex: 260, endIndex: 275, codes: { icd10: 'S29.9' } },
      { text: 'pneumotórax', type: 'DISEASE', startIndex: 280, endIndex: 291, codes: { icd10: 'J93.9' } },
      { text: 'trauma abdominal', type: 'DISEASE', startIndex: 294, endIndex: 310, codes: { icd10: 'S39.9' } },
    ],
  },
  {
    id: 'emergency-008',
    category: 'specialized',
    difficulty: 'hard',
    clinicalContext: 'Patient with sudden dyspnea and chest pain post long flight',
    input: `S: Paciente feminina, 60 anos, dispneia súbita e dor pleurítica no hemitórax direito após voo de 8 horas, associada a taquicardia.
O: PA 130/80, FC 115 bpm, FR 28 irpm, SatO2 92%. Sem cianose. D-dímero elevado 1500 ng/mL. Angio-TC: embolia pulmonar segmentar direita.
A: Embolia pulmonar aguda.
P: Heparina de baixo peso molecular 1mg/kg SC. Oxigênio suplementar. Tramadol 50mg IV para dor. Anticoagulação por 6 meses.`,
    expectedEntities: [
      { text: 'dispneia súbita', type: 'SYMPTOM', startIndex: 30, endIndex: 45, codes: { ciap2: 'R02' } },
      { text: 'dor pleurítica', type: 'SYMPTOM', startIndex: 48, endIndex: 62, codes: { ciap2: 'R01' } },
      { text: 'taquicardia', type: 'SYMPTOM', startIndex: 117, endIndex: 128, codes: { ciap2: 'K04' } },
      { text: 'D-dímero', type: 'EXAM', startIndex: 186, endIndex: 194 },
      { text: 'Angio-TC', type: 'EXAM', startIndex: 216, endIndex: 224 },
      { text: 'Embolia pulmonar aguda', type: 'DISEASE', startIndex: 263, endIndex: 285, codes: { icd10: 'I26.9' } },
      { text: 'Heparina de baixo peso molecular', type: 'MEDICATION', startIndex: 290, endIndex: 322, codes: { atc: 'B01AB05' } },
      { text: 'Tramadol', type: 'MEDICATION', startIndex: 356, endIndex: 364, codes: { atc: 'N02AX02' } },
    ],
  },
  {
    id: 'emergency-009',
    category: 'specialized',
    difficulty: 'hard',
    clinicalContext: 'Patient with severe hypertension and end-organ damage',
    input: `S: Paciente masculino, 58 anos, cefaleia intensa e visão embaçada há 4 horas, história de hipertensão não controlada.
O: PA 220/120 mmHg, FC 100 bpm, FR 20 irpm. Fundo de olho: hipertensão retiniana grau III. Creatinina 2,5 mg/dL. ECG: hipertrofia VE.
A: Emergência hipertensiva com lesão renal aguda.
P: Nitroprussiato de sódio IV. Reduzir PA em 25% nas primeiras horas. Monitorar função renal. UTI.`,
    expectedEntities: [
      { text: 'cefaleia intensa', type: 'SYMPTOM', startIndex: 31, endIndex: 47, codes: { ciap2: 'N01' } },
      { text: 'visão embaçada', type: 'SYMPTOM', startIndex: 50, endIndex: 64, codes: { ciap2: 'F05' } },
      { text: 'Fundo de olho', type: 'EXAM', startIndex: 152, endIndex: 165 },
      { text: 'Creatinina', type: 'EXAM', startIndex: 199, endIndex: 209 },
      { text: 'ECG', type: 'EXAM', startIndex: 223, endIndex: 226 },
      { text: 'Emergência hipertensiva', type: 'DISEASE', startIndex: 248, endIndex: 271, codes: { icd10: 'I16.1' } },
      { text: 'lesão renal aguda', type: 'DISEASE', startIndex: 276, endIndex: 293, codes: { icd10: 'N17.9' } },
      { text: 'Nitroprussiato de sódio', type: 'MEDICATION', startIndex: 298, endIndex: 321, codes: { atc: 'C02DD01' } },
    ],
  },
  {
    id: 'emergency-010',
    category: 'specialized',
    difficulty: 'hard',
    clinicalContext: 'Patient with epigastric pain and vomiting after heavy meal',
    input: `S: Paciente masculino, 50 anos, dor epigástrica intensa irradiada para dorso há 6 horas, após refeição, associada a náuseas e vômitos.
O: PA 130/85, FC 105 bpm, T 38.2°C. Sensibilidade epigástrica. Amilase sérica 800 U/L, lipase 1200 U/L. USG: pâncreas edemaciado.
A: Pancreatite aguda biliar.
P: Jejum absoluto, hidratação IV agressiva. Tramadol 50 mg IV. Piperacilina-tazobactam se sinais de infecção. Monitorar em UTI.`,
    expectedEntities: [
      { text: 'dor epigástrica intensa', type: 'SYMPTOM', startIndex: 31, endIndex: 54, codes: { ciap2: 'D02' } },
      { text: 'náuseas', type: 'SYMPTOM', startIndex: 115, endIndex: 122, codes: { ciap2: 'D09' } },
      { text: 'vômitos', type: 'SYMPTOM', startIndex: 125, endIndex: 132, codes: { ciap2: 'D10' } },
      { text: 'Amilase sérica', type: 'EXAM', startIndex: 195, endIndex: 209 },
      { text: 'lipase', type: 'EXAM', startIndex: 220, endIndex: 226 },
      { text: 'USG', type: 'EXAM', startIndex: 238, endIndex: 241 },
      { text: 'Pancreatite aguda biliar', type: 'DISEASE', startIndex: 263, endIndex: 287, codes: { icd10: 'K85.1' } },
      { text: 'Tramadol', type: 'MEDICATION', startIndex: 333, endIndex: 341, codes: { atc: 'N02AX02' } },
      { text: 'Piperacilina-tazobactam', type: 'MEDICATION', startIndex: 354, endIndex: 377, codes: { atc: 'J01CR05' } },
    ],
  },
];

// =============================================================================
// COMBINED EXPORT - All 40 generated cases
// =============================================================================

export const GENERATED_TEST_CASES: TestCase[] = [
  ...pediatricTestCases,
  ...obgynTestCases,
  ...mentalHealthTestCases,
  ...emergencyTestCases,
];

/**
 * Get generated test cases with recalculated indices
 */
export function getValidatedGeneratedCases(): TestCase[] {
  return GENERATED_TEST_CASES.map(recalculateIndices);
}

/**
 * Get statistics about generated test cases
 */
export function getGeneratedCasesStatistics() {
  const stats = {
    total: GENERATED_TEST_CASES.length,
    byCategory: {
      pediatric: pediatricTestCases.length,
      obgyn: obgynTestCases.length,
      mentalHealth: mentalHealthTestCases.length,
      emergency: emergencyTestCases.length,
    },
    byDifficulty: {
      easy: 0,
      medium: 0,
      hard: 0,
    },
    totalEntities: 0,
    entitiesByType: {
      DISEASE: 0,
      MEDICATION: 0,
      SYMPTOM: 0,
      EXAM: 0,
    } as Record<string, number>,
  };

  for (const tc of GENERATED_TEST_CASES) {
    stats.byDifficulty[tc.difficulty]++;
    stats.totalEntities += tc.expectedEntities.length;

    for (const entity of tc.expectedEntities) {
      stats.entitiesByType[entity.type] = (stats.entitiesByType[entity.type] || 0) + 1;
    }
  }

  return stats;
}
