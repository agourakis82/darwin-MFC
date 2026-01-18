/**
 * EXPANSÃO SPRINT 3 - DOENÇAS METABÓLICAS/ENDÓCRINAS
 * ===================================================
 * Condições metabólicas e endócrinas comuns na APS
 */

import { Doenca } from '../../types/doenca';

export const doencasMetabolicasExpansao: Partial<Doenca>[] = [
  {
    id: 'dislipidemia',
    titulo: 'Dislipidemia',
    sinonimos: ['Hiperlipidemia', 'Hipercolesterolemia', 'Hipertrigliceridemia'],
    ciap2: ['T93'],
    cid10: ['E78.0', 'E78.1', 'E78.2', 'E78.5'],
    cid11: ['5C80'],
    doid: 'DOID:1168',
    snomedCT: '370992007',
    meshId: 'D050171',
    umlsCui: 'C0242339',
    // LOINC codes for dyslipidemia workup and monitoring
    loinc: [
      { code: '2093-3', name: 'Total cholesterol' },
      { code: '2085-9', name: 'HDL' },
      { code: '13457-7', name: 'LDL calculated' },
      { code: '18262-6', name: 'LDL direct' },
      { code: '2571-8', name: 'Triglycerides' },
      { code: '13458-5', name: 'VLDL' },
      { code: '1558-6', name: 'Fasting glucose' },
      { code: '4548-4', name: 'HbA1c' },
      { code: '2160-0', name: 'Creatinine' },
      { code: '3016-3', name: 'TSH' },
      { code: '1920-8', name: 'AST' },
      { code: '1742-6', name: 'ALT' },
      { code: '2157-6', name: 'CK total (for statin monitoring)' },
    ],
    categoria: 'metabolico',
    quickView: {
      definicao: 'Alteração do metabolismo lipídico com elevação de LDL-c, triglicérides e/ou redução de HDL-c. Principal fator de risco modificável para DCV aterosclerótica.',
      criteriosDiagnosticos: [
        'LDL-c ≥160 mg/dL (alto) ou ≥130 mg/dL (limítrofe)',
        'HDL-c <40 mg/dL (homens) ou <50 mg/dL (mulheres)',
        'Triglicérides ≥150 mg/dL',
        'Colesterol total ≥240 mg/dL',
        'Calcular risco cardiovascular (ASCVD, Framingham)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Dieta mediterrânea ou DASH',
          'Exercício aeróbico 150min/semana',
          'Perda de peso se sobrepeso/obesidade',
          'Cessação do tabagismo',
          'Reduzir álcool'
        ],
        farmacologico: [
          'Estatinas: Sinvastatina 20-40mg, Atorvastatina 10-80mg, Rosuvastatina 5-20mg',
          'Meta LDL-c conforme risco: <70 (muito alto), <100 (alto), <130 (moderado)',
          'Ezetimiba 10mg se meta não atingida com estatina',
          'Fibrato se TG >500 mg/dL'
        ]
      },
      redFlags: ['Xantomas', 'Arco corneano <45 anos', 'HF de evento CV precoce', 'Pancreatite (TG>1000)'],
      metasTerapeuticas: ['Redução de 30-50% do LDL-c ou meta absoluta conforme risco'],
      examesIniciais: ['Perfil lipídico em jejum', 'Glicemia', 'Creatinina', 'TSH', 'TGO/TGP']
    },
    protocolos: ['has', 'dm2'],
    medicamentos: ['sinvastatina', 'atorvastatina', 'rosuvastatina'],
    calculadoras: ['risco-cardiovascular'],
    tags: ['cardiovascular', 'prevenção', 'estatina'],
    citations: [
      {
        refId: 'esc-eas-dyslipidemia-2019',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'acc-aha-cholesterol-2018',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
    ],
  },
  {
    id: 'sindrome-metabolica',
    titulo: 'Síndrome Metabólica',
    sinonimos: ['Síndrome X', 'Síndrome de resistência insulínica'],
    ciap2: ['T99'],
    cid10: ['E88.81'],
    cid11: ['5C80.Z'],
    doid: 'DOID:14221',
    snomedCT: '237602007',
    meshId: 'D024821',
    umlsCui: 'C0524620',
    // LOINC codes for metabolic syndrome assessment
    loinc: [
      { code: '1558-6', name: 'Fasting glucose' },
      { code: '4548-4', name: 'HbA1c' },
      { code: '2093-3', name: 'Total cholesterol' },
      { code: '2085-9', name: 'HDL' },
      { code: '2571-8', name: 'Triglycerides' },
      { code: '13457-7', name: 'LDL calculated' },
      { code: '8280-0', name: 'Waist circumference' },
      { code: '8480-6', name: 'Systolic BP' },
      { code: '8462-4', name: 'Diastolic BP' },
      { code: '39156-5', name: 'BMI' },
      { code: '2160-0', name: 'Creatinine' },
      { code: '9318-7', name: 'Albumin/creatinine ratio (microalbuminuria)' },
      { code: '1920-8', name: 'AST' },
      { code: '1742-6', name: 'ALT' },
      { code: '3084-1', name: 'Uric acid' },
    ],
    categoria: 'metabolico',
    quickView: {
      definicao: 'Constelação de fatores de risco metabólicos que aumentam risco de DCV e DM2. Prevalência de 20-25% em adultos.',
      criteriosDiagnosticos: [
        'Critérios NCEP-ATPIII (≥3 de 5):',
        'Circunferência abdominal: >102cm (H) ou >88cm (M)',
        'Triglicérides ≥150 mg/dL',
        'HDL-c <40 (H) ou <50 (M) mg/dL',
        'PA ≥130/85 mmHg ou em tratamento',
        'Glicemia jejum ≥100 mg/dL ou DM'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Perda de peso 7-10% (principal intervenção)',
          'Exercício aeróbico + resistência',
          'Dieta hipocalórica, baixo IG',
          'Cessar tabagismo'
        ],
        farmacologico: [
          'Tratar cada componente individualmente',
          'Metformina se pré-diabetes + alto risco',
          'Estatina conforme risco CV',
          'Anti-hipertensivo se HAS'
        ]
      },
      redFlags: ['DM2 manifesto', 'Doença cardiovascular estabelecida', 'NASH/cirrose'],
      metasTerapeuticas: ['Perda de peso sustentada', 'Normalização dos componentes'],
      examesIniciais: ['Glicemia jejum', 'TOTG se GJ 100-125', 'Perfil lipídico', 'TGO/TGP', 'US abdome']
    },
    protocolos: ['dm2', 'has'],
    medicamentos: ['metformina'],
    calculadoras: ['imc'],
    tags: ['obesidade', 'diabetes', 'cardiovascular'],
    citations: [
      {
        refId: 'ncep-atp3-metabolic-syndrome',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'idf-metabolic-syndrome-2006',
        evidenceLevel: 'A',
        studyType: 'Consensus',
      },
    ],
  },
  {
    id: 'deficiencia-vitamina-d',
    titulo: 'Deficiência de Vitamina D',
    sinonimos: ['Hipovitaminose D', 'Insuficiência de vitamina D'],
    ciap2: ['T91'],
    cid10: ['E55.9'],
    cid11: ['5B57.4'],
    doid: 'DOID:10609',
    snomedCT: '34713006',
    meshId: 'D014808',
    umlsCui: 'C0042870',
    // LOINC codes for vitamin D deficiency workup
    loinc: [
      { code: '1989-3', name: '25-hydroxyvitamin D [Mass/volume] in Serum or Plasma' },
      { code: '62292-8', name: '25-hydroxyvitamin D2+D3 [Mass/volume] in Serum or Plasma' },
      { code: '17861-6', name: 'Calcium [Mass/volume] in Serum or Plasma' },
      { code: '2777-1', name: 'Phosphorus [Mass/volume] in Serum or Plasma' },
      { code: '2731-8', name: 'Parathyroid hormone (PTH) [Mass/volume] in Serum or Plasma' },
      { code: '2160-0', name: 'Creatinine [Mass/volume] in Serum or Plasma' },
      { code: '6768-6', name: 'Alkaline phosphatase [Enzymatic activity/volume] in Serum or Plasma' },
    ],
    categoria: 'metabolico',
    quickView: {
      definicao: 'Níveis insuficientes de 25(OH)D associados a comprometimento ósseo e possíveis efeitos extraesqueléticos. Prevalência >50% em algumas populações.',
      criteriosDiagnosticos: [
        '25(OH)D <20 ng/mL: Deficiência',
        '25(OH)D 20-29 ng/mL: Insuficiência',
        '25(OH)D ≥30 ng/mL: Suficiência',
        'Rastrear grupos de risco: idosos, obesos, pele escura, pouca exposição solar'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Exposição solar moderada (10-15min/dia)',
          'Alimentos fortificados',
          'Peixes gordurosos, gema de ovo'
        ],
        farmacologico: [
          'Deficiência: Colecalciferol 50.000 UI/semana por 8 semanas',
          'Manutenção: 1.000-2.000 UI/dia',
          'Idosos/obesos podem precisar de doses maiores'
        ]
      },
      redFlags: ['Hipocalcemia sintomática', 'Fraturas por fragilidade', 'Osteomalácia'],
      metasTerapeuticas: ['25(OH)D ≥30 ng/mL'],
      examesIniciais: ['25(OH)D sérica', 'Cálcio, fósforo', 'PTH', 'Creatinina']
    },
    protocolos: [],
    medicamentos: ['colecalciferol'],
    calculadoras: [],
    tags: ['osso', 'suplementação', 'rastreamento'],
    citations: [
      {
        refId: 'endocrine-society-vitamin-d-2011',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'uptodate-vitamin-d-2024',
        evidenceLevel: 'B',
        studyType: 'SystematicReview',
      },
    ],
  },
  {
    id: 'deficiencia-vitamina-b12',
    titulo: 'Deficiência de Vitamina B12',
    sinonimos: ['Hipovitaminose B12', 'Deficiência de cobalamina'],
    ciap2: ['B81'],
    cid10: ['E53.8'],
    cid11: ['5B5C'],
    doid: 'DOID:13381',
    snomedCT: '190634004',
    meshId: 'D014806',
    umlsCui: 'C0042847',
    // LOINC codes for vitamin B12 deficiency workup
    loinc: [
      { code: '2132-9', name: 'Vitamin B12 [Mass/volume] in Serum or Plasma' },
      { code: '2284-8', name: 'Folate [Mass/volume] in Serum or Plasma' },
      { code: '785-6', name: 'Mean corpuscular volume (MCV) [Entitic volume]' },
      { code: '718-7', name: 'Hemoglobin [Mass/volume] in Blood' },
      { code: '4544-3', name: 'Hematocrit [Volume Fraction] in Blood' },
      { code: '26474-7', name: 'Lymphocytes [#/volume] in Blood' },
      { code: '17820-2', name: 'Homocysteine [Moles/volume] in Serum or Plasma' },
      { code: '2170-9', name: 'Methylmalonic acid [Mass/volume] in Serum or Plasma' },
      { code: '14685-2', name: 'Reticulocyte count [#/volume] in Blood' },
      { code: '2532-0', name: 'Lactate dehydrogenase (LDH) [Enzymatic activity/volume] in Serum or Plasma' },
    ],
    categoria: 'hematologico',
    quickView: {
      definicao: 'Deficiência de cobalamina causando anemia megaloblástica e manifestações neurológicas. Comum em idosos, vegetarianos e uso crônico de metformina/IBP.',
      criteriosDiagnosticos: [
        'B12 sérica <200 pg/mL: deficiência',
        'B12 200-300 pg/mL: zona cinzenta - dosar MMA e homocisteína',
        'VCM >100 fL (anemia macrocítica)',
        'Sintomas neurológicos: parestesias, ataxia, alteração cognitiva'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Investigar causa: dieta, anemia perniciosa, gastrite atrófica',
          'Orientação dietética para vegetarianos'
        ],
        farmacologico: [
          'Deficiência grave/sintomas neurológicos: Cianocobalamina 1000mcg IM 1x/dia por 7 dias, depois semanal por 4 sem, depois mensal',
          'Deficiência leve: Cianocobalamina oral 1000-2000mcg/dia',
          'Manutenção vitalícia se anemia perniciosa'
        ]
      },
      redFlags: ['Pancitopenia', 'Sintomas neurológicos graves', 'Declínio cognitivo rápido'],
      metasTerapeuticas: ['B12 >400 pg/mL', 'Resolução da anemia', 'Melhora neurológica'],
      examesIniciais: ['Hemograma com VCM', 'B12 sérica', 'Reticulócitos', 'LDH', 'Ácido fólico']
    },
    protocolos: [],
    medicamentos: ['cianocobalamina'],
    calculadoras: [],
    tags: ['anemia', 'neurologia', 'idoso'],
    citations: [
      {
        refId: 'bsh-b12-folate-2014',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'nice-anaemia-b12-2024',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
    ],
  },
  {
    id: 'esteatose-hepatica',
    titulo: 'Esteatose Hepática Não Alcoólica (DHGNA)',
    sinonimos: ['NAFLD', 'Fígado gorduroso', 'MASLD'],
    ciap2: ['D97'],
    cid10: ['K76.0'],
    cid11: ['DB92.1'],
    doid: 'DOID:0080547',
    snomedCT: '197315008',
    meshId: 'D065626',
    umlsCui: 'C0400966',
    // LOINC codes for NAFLD/MASLD workup and monitoring
    loinc: [
      { code: '1742-6', name: 'ALT (Alanine aminotransferase) [Enzymatic activity/volume] in Serum or Plasma' },
      { code: '1920-8', name: 'AST (Aspartate aminotransferase) [Enzymatic activity/volume] in Serum or Plasma' },
      { code: '2324-2', name: 'GGT (Gamma glutamyl transferase) [Enzymatic activity/volume] in Serum or Plasma' },
      { code: '6768-6', name: 'Alkaline phosphatase [Enzymatic activity/volume] in Serum or Plasma' },
      { code: '1975-2', name: 'Bilirubin.total [Mass/volume] in Serum or Plasma' },
      { code: '1751-7', name: 'Albumin [Mass/volume] in Serum or Plasma' },
      { code: '5902-2', name: 'Prothrombin time (PT)' },
      { code: '2093-3', name: 'Total Cholesterol [Mass/volume] in Serum or Plasma' },
      { code: '2571-8', name: 'Triglycerides [Mass/volume] in Serum or Plasma' },
      { code: '2345-7', name: 'Glucose [Mass/volume] in Serum or Plasma' },
      { code: '4548-4', name: 'Hemoglobin A1c/Hemoglobin.total [Mass Fraction] in Blood' },
      { code: '1558-6', name: 'Fasting glucose [Mass/volume] in Serum or Plasma' },
      { code: '26515-7', name: 'Platelet count [#/volume] in Blood' },
    ],
    categoria: 'gastrointestinal',
    quickView: {
      definicao: 'Acúmulo de gordura hepática (>5%) na ausência de consumo significativo de álcool. Prevalência 25-30% globalmente, associada à síndrome metabólica.',
      criteriosDiagnosticos: [
        'Esteatose em exame de imagem (US, TC, RM)',
        'Exclusão de consumo alcoólico significativo (<20g/dia M, <30g/dia H)',
        'Exclusão de outras causas de hepatopatia',
        'FIB-4 ou NAFLD Fibrosis Score para estratificação'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Perda de peso 7-10% (principal tratamento)',
          'Exercício aeróbico + resistência',
          'Dieta mediterrânea',
          'Evitar frutose/bebidas açucaradas'
        ],
        farmacologico: [
          'Vitamina E 800 UI/dia (não diabéticos com NASH comprovada)',
          'Pioglitazona (diabéticos com NASH)',
          'Agonistas GLP-1 (semaglutida) - evidência emergente',
          'Tratar comorbidades: DM, dislipidemia'
        ]
      },
      redFlags: ['Cirrose', 'Hipertensão portal', 'Carcinoma hepatocelular', 'Transaminases >10x LSN'],
      metasTerapeuticas: ['Perda de peso sustentada', 'Normalização de transaminases'],
      examesIniciais: ['TGO, TGP, GGT', 'Perfil lipídico', 'Glicemia/HbA1c', 'US abdome', 'FIB-4']
    },
    protocolos: [],
    medicamentos: ['pioglitazona', 'vitamina-e'],
    calculadoras: ['fib-4'],
    tags: ['fígado', 'obesidade', 'síndrome metabólica'],
    citations: [
      {
        refId: 'aasld-nafld-2018',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'easl-nafld-2016',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
    ],
  },
  {
    id: 'hipotireoidismo-subclinico',
    titulo: 'Hipotireoidismo Subclínico',
    sinonimos: ['Disfunção tireoidiana subclínica'],
    ciap2: ['T86'],
    cid10: ['E02'],
    cid11: ['5A00.1'],
    doid: 'DOID:0080530',
    snomedCT: '237519004',
    meshId: 'D000073057',
    umlsCui: 'C0271790',
    // LOINC codes for subclinical hypothyroidism workup
    loinc: [
      { code: '3016-3', name: 'TSH [Units/volume] in Serum or Plasma' },
      { code: '3026-2', name: 'T4 free [Mass/volume] in Serum or Plasma' },
      { code: '3053-6', name: 'T3 free [Mass/volume] in Serum or Plasma' },
      { code: '5385-0', name: 'Anti-thyroid peroxidase (Anti-TPO) [Units/volume] in Serum' },
      { code: '5379-3', name: 'Anti-thyroglobulin (Anti-TG) [Units/volume] in Serum' },
      { code: '2093-3', name: 'Total Cholesterol [Mass/volume] in Serum or Plasma' },
      { code: '2085-9', name: 'HDL [Mass/volume] in Serum or Plasma' },
      { code: '2089-1', name: 'LDL [Mass/volume] in Serum or Plasma' },
    ],
    categoria: 'endocrino',
    quickView: {
      definicao: 'TSH elevado com T4 livre normal. Prevalência 4-10% em adultos, maior em mulheres e idosos. Progressão para hipotireoidismo manifesto ~2-5%/ano.',
      criteriosDiagnosticos: [
        'TSH elevado (>4,0-4,5 mUI/L conforme laboratório)',
        'T4 livre normal',
        'Confirmar com segunda dosagem em 2-3 meses',
        'Pesquisar anti-TPO para avaliar risco de progressão'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Observação com monitoramento se TSH <10 e assintomático',
          'Repetir TSH em 6-12 meses'
        ],
        farmacologico: [
          'Tratar se TSH ≥10 mUI/L',
          'Considerar tratar se: TSH 7-10 + sintomas, anti-TPO+, gestantes, tentando engravidar',
          'Levotiroxina: iniciar 25-50mcg/dia, ajustar a cada 6-8 semanas',
          'Idosos: iniciar com 12,5-25mcg'
        ]
      },
      redFlags: ['Gestação', 'Bócio volumoso', 'TSH >10', 'Sintomas significativos'],
      metasTerapeuticas: ['TSH 0,5-4,0 mUI/L se tratado'],
      examesIniciais: ['TSH', 'T4 livre', 'Anti-TPO', 'Perfil lipídico']
    },
    protocolos: [],
    medicamentos: ['levotiroxina'],
    calculadoras: [],
    tags: ['tireoide', 'rastreamento', 'endocrinologia'],
    citations: [
      {
        refId: 'ata-thyroid-guidelines-2014',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'eta-subclinical-thyroid-2013',
        evidenceLevel: 'B',
        studyType: 'Consensus',
      },
    ],
  },
  {
    id: 'hipertireoidismo-subclinico',
    titulo: 'Hipertireoidismo Subclínico',
    sinonimos: ['Tireotoxicose subclínica'],
    ciap2: ['T85'],
    cid10: ['E05.9'],
    cid11: ['5A01.Z'],
    doid: 'DOID:0080532',
    snomedCT: '237516002',
    meshId: 'D000073058',
    umlsCui: 'C0342157',
    // LOINC codes for subclinical hyperthyroidism workup
    loinc: [
      { code: '3016-3', name: 'TSH [Units/volume] in Serum or Plasma' },
      { code: '3026-2', name: 'T4 free [Mass/volume] in Serum or Plasma' },
      { code: '3053-6', name: 'T3 free [Mass/volume] in Serum or Plasma' },
      { code: '5384-3', name: 'TSH receptor antibody (TRAb/Anti-TRAB) [Units/volume] in Serum' },
      { code: '46985-5', name: 'Thyroid-stimulating immunoglobulin (TSI) [Units/volume] in Serum' },
      { code: '24348-5', name: 'Bone density study' },
    ],
    categoria: 'endocrino',
    quickView: {
      definicao: 'TSH suprimido com T4 e T3 livres normais. Pode ser endógeno (Graves, nódulo tóxico) ou exógeno (excesso de levotiroxina).',
      criteriosDiagnosticos: [
        'TSH <0,1-0,4 mUI/L (conforme laboratório)',
        'T4 livre e T3 livre normais',
        'Grau I: TSH 0,1-0,4 mUI/L',
        'Grau II: TSH <0,1 mUI/L'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Observação se leve e assintomático',
          'Investigar causa: cintilografia, anti-TRAB'
        ],
        farmacologico: [
          'Tratar se: >65 anos, FA, osteoporose, sintomas',
          'Causa endógena: metimazol ou radioiodo',
          'Causa exógena: reduzir dose de levotiroxina',
          'Betabloqueador se sintomas adrenérgicos'
        ]
      },
      redFlags: ['Fibrilação atrial', 'Osteoporose', 'Sintomas cardiovasculares', 'Idosos >65 anos'],
      metasTerapeuticas: ['TSH normal', 'Eutireoidismo'],
      examesIniciais: ['TSH', 'T4 livre', 'T3 livre', 'Anti-TRAB', 'Cintilografia se indicado']
    },
    protocolos: [],
    medicamentos: ['propranolol', 'metimazol'],
    calculadoras: [],
    tags: ['tireoide', 'arritmia', 'osteoporose'],
    citations: [
      {
        refId: 'ata-hyperthyroidism-2016',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'eta-subclinical-hyperthyroidism-2015',
        evidenceLevel: 'B',
        studyType: 'Consensus',
      },
    ],
  },
  {
    id: 'hiperuricemia-assintomatica',
    titulo: 'Hiperuricemia Assintomática',
    sinonimos: ['Ácido úrico elevado'],
    ciap2: ['T99'],
    cid10: ['E79.0'],
    cid11: ['5C64.0'],
    doid: 'DOID:9245',
    snomedCT: '35885006',
    meshId: 'D033461',
    umlsCui: 'C0740394',
    // LOINC codes for hyperuricemia workup
    loinc: [
      { code: '3084-1', name: 'Uric acid [Mass/volume] in Serum or Plasma' },
      { code: '2160-0', name: 'Creatinine [Mass/volume] in Serum or Plasma' },
      { code: '3094-0', name: 'Blood urea nitrogen (BUN) [Mass/volume] in Serum or Plasma' },
      { code: '33914-3', name: 'Estimated GFR (eGFR) [Volume Rate/Area] in Serum, Plasma or Blood' },
      { code: '2093-3', name: 'Total Cholesterol [Mass/volume] in Serum or Plasma' },
      { code: '2571-8', name: 'Triglycerides [Mass/volume] in Serum or Plasma' },
      { code: '2345-7', name: 'Glucose [Mass/volume] in Serum or Plasma' },
      { code: '5778-6', name: 'Urinalysis - microscopic panel' },
    ],
    categoria: 'metabolico',
    quickView: {
      definicao: 'Ácido úrico sérico elevado (>7 mg/dL em homens, >6 mg/dL em mulheres) sem história de gota ou nefrolitíase por urato.',
      criteriosDiagnosticos: [
        'Ácido úrico >7 mg/dL (H) ou >6 mg/dL (M)',
        'Ausência de artrite gotosa',
        'Ausência de nefrolitíase por urato',
        'Avaliar comorbidades: HAS, DRC, síndrome metabólica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Redução de peso',
          'Limitar álcool (especialmente cerveja)',
          'Evitar bebidas açucaradas',
          'Reduzir carnes vermelhas e vísceras',
          'Aumentar laticínios desnatados'
        ],
        farmacologico: [
          'NÃO tratar apenas pelo nível de ácido úrico',
          'Considerar tratamento se: DRC progressiva, risco CV muito alto',
          'Se indicado: Alopurinol 100mg, titular até alvo',
          'Febuxostat como alternativa'
        ]
      },
      redFlags: ['Primeiro episódio de gota', 'Nefrolitíase', 'Nefropatia por urato', 'Síndrome de lise tumoral'],
      metasTerapeuticas: ['Ácido úrico <6 mg/dL se tratado'],
      examesIniciais: ['Ácido úrico sérico', 'Creatinina', 'Perfil lipídico', 'Glicemia', 'EAS']
    },
    protocolos: [],
    medicamentos: ['alopurinol'],
    calculadoras: [],
    tags: ['gota', 'renal', 'metabólico'],
    citations: [
      {
        refId: 'acr-gout-2020',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'eular-gout-2016',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
    ],
  },
  {
    id: 'insuficiencia-adrenal',
    titulo: 'Insuficiência Adrenal',
    sinonimos: ['Doença de Addison', 'Hipoadrenalismo'],
    ciap2: ['T99'],
    cid10: ['E27.1', 'E27.2', 'E27.4'],
    cid11: ['5A74.1'],
    doid: 'DOID:10493',
    snomedCT: '386584007',
    meshId: 'D000309',
    umlsCui: 'C0001623',
    // LOINC codes for adrenal insufficiency workup
    loinc: [
      { code: '2143-6', name: 'Cortisol [Mass/volume] in Serum or Plasma' },
      { code: '2141-0', name: 'ACTH (Corticotropin) [Mass/volume] in Plasma' },
      { code: '2823-3', name: 'Potassium [Moles/volume] in Serum or Plasma' },
      { code: '2951-2', name: 'Sodium [Moles/volume] in Serum or Plasma' },
      { code: '2345-7', name: 'Glucose [Mass/volume] in Serum or Plasma' },
      { code: '2160-0', name: 'Creatinine [Mass/volume] in Serum or Plasma' },
      { code: '56540-8', name: '21-hydroxylase antibody (Anti-21-hydroxylase) [Units/volume] in Serum' },
      { code: '2731-8', name: 'Renin [Mass/volume] in Plasma' },
      { code: '1714-5', name: 'Aldosterone [Mass/volume] in Serum or Plasma' },
    ],
    categoria: 'endocrino',
    quickView: {
      definicao: 'Deficiência de produção de cortisol (primária) ou ACTH (secundária). Primária: destruição adrenal. Secundária: supressão por corticoides exógenos é causa comum.',
      criteriosDiagnosticos: [
        'Cortisol matinal <5 mcg/dL: sugere insuficiência',
        'Cortisol >18 mcg/dL: exclui insuficiência',
        'Teste de estímulo com ACTH: cortisol <18 mcg/dL',
        'ACTH: elevado (primária) ou baixo/normal (secundária)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educação sobre doença e identificação de crise',
          'Pulseira/cartão de identificação médica',
          'Ensinar auto-injeção de hidrocortisona'
        ],
        farmacologico: [
          'Hidrocortisona 15-25mg/dia (dividido: 2/3 manhã, 1/3 tarde)',
          'Ou Prednisona 3-5mg/dia',
          'Fludrocortisona 0,05-0,2mg/dia se primária',
          'Dobrar dose em estresse/doença'
        ]
      },
      redFlags: ['Crise adrenal: hipotensão, vômitos, dor abdominal', 'Hipercalemia', 'Hiponatremia grave'],
      metasTerapeuticas: ['Bem-estar clínico', 'PA normal', 'Eletrólitos normais'],
      examesIniciais: ['Cortisol 8h', 'ACTH', 'Sódio, potássio', 'Glicemia', 'Anti-21-hidroxilase']
    },
    protocolos: [],
    medicamentos: ['hidrocortisona', 'prednisona'],
    calculadoras: [],
    tags: ['urgência', 'corticoide', 'endocrinologia'],
    citations: [
      {
        refId: 'endocrine-society-adrenal-2016',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'esh-adrenal-insufficiency-2014',
        evidenceLevel: 'B',
        studyType: 'Consensus',
      },
    ],
  },
  {
    id: 'hipogonadismo-masculino',
    titulo: 'Hipogonadismo Masculino',
    sinonimos: ['Deficiência de testosterona', 'Andropausa', 'DAEM'],
    ciap2: ['Y99'],
    cid10: ['E29.1'],
    cid11: ['5A80.0'],
    doid: 'DOID:1924',
    snomedCT: '48723006',
    meshId: 'D007006',
    umlsCui: 'C0020619',
    // LOINC codes for male hypogonadism workup
    loinc: [
      { code: '2986-8', name: 'Testosterone [Mass/volume] in Serum or Plasma' },
      { code: '2990-0', name: 'Testosterone.free [Mass/volume] in Serum or Plasma' },
      { code: '10501-5', name: 'LH (Luteinizing hormone) [Units/volume] in Serum or Plasma' },
      { code: '15067-2', name: 'FSH (Follicle stimulating hormone) [Units/volume] in Serum or Plasma' },
      { code: '2243-4', name: 'Prolactin [Mass/volume] in Serum or Plasma' },
      { code: '4544-3', name: 'Hematocrit [Volume Fraction] in Blood' },
      { code: '2857-1', name: 'PSA (Prostate specific antigen) [Mass/volume] in Serum or Plasma' },
      { code: '2093-3', name: 'Total Cholesterol [Mass/volume] in Serum or Plasma' },
      { code: '2085-9', name: 'HDL [Mass/volume] in Serum or Plasma' },
      { code: '2089-1', name: 'LDL [Mass/volume] in Serum or Plasma' },
    ],
    categoria: 'endocrino',
    quickView: {
      definicao: 'Síndrome clínica de deficiência de testosterona com sintomas e sinais característicos. Prevalência aumenta com idade.',
      criteriosDiagnosticos: [
        'Testosterona total matinal <300 ng/dL (repetir)',
        'Sintomas: fadiga, disfunção erétil, libido reduzida, humor deprimido',
        'Sinais: perda de massa muscular, osteoporose, ginecomastia',
        'LH: elevado (primário) ou baixo/normal (secundário)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Perda de peso se obeso',
          'Exercício físico',
          'Otimizar sono',
          'Investigar causas secundárias'
        ],
        farmacologico: [
          'Indicações claras: sintomas + testosterona baixa confirmada',
          'Cipionato de testosterona 200mg IM a cada 2 semanas',
          'Undecanoato de testosterona 1000mg IM a cada 10-12 semanas',
          'Monitorar hematócrito, PSA, lipídeos'
        ]
      },
      redFlags: ['Câncer de próstata', 'Hematócrito >54%', 'PSA elevado', 'Tumor hipofisário'],
      metasTerapeuticas: ['Testosterona 400-700 ng/dL', 'Melhora dos sintomas'],
      examesIniciais: ['Testosterona total (2x manhã)', 'LH, FSH', 'Prolactina', 'PSA', 'Hematócrito']
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    tags: ['andrologia', 'disfunção erétil', 'osteoporose'],
    citations: [
      {
        refId: 'aua-testosterone-2018',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'endocrine-society-hypogonadism-2018',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
    ],
  },
  {
    id: 'menopausa-climatério',
    titulo: 'Menopausa e Climatério',
    sinonimos: ['Síndrome climatérica', 'Transição menopáusica'],
    ciap2: ['X11'],
    cid10: ['N95.1'],
    cid11: ['GA31.0'],
    doid: 'DOID:0111805',
    snomedCT: '161712005',
    meshId: 'D008593',
    umlsCui: 'C0025320',
    // LOINC codes for menopause workup
    loinc: [
      { code: '15067-2', name: 'FSH (Follicle stimulating hormone) [Units/volume] in Serum or Plasma' },
      { code: '10501-5', name: 'LH (Luteinizing hormone) [Units/volume] in Serum or Plasma' },
      { code: '2243-3', name: 'Estradiol (E2) [Mass/volume] in Serum or Plasma' },
      { code: '3016-3', name: 'TSH [Units/volume] in Serum or Plasma' },
      { code: '2093-3', name: 'Total Cholesterol [Mass/volume] in Serum or Plasma' },
      { code: '2085-9', name: 'HDL [Mass/volume] in Serum or Plasma' },
      { code: '2089-1', name: 'LDL [Mass/volume] in Serum or Plasma' },
      { code: '2571-8', name: 'Triglycerides [Mass/volume] in Serum or Plasma' },
      { code: '17861-6', name: 'Calcium [Mass/volume] in Serum or Plasma' },
      { code: '1989-3', name: '25-hydroxyvitamin D [Mass/volume] in Serum or Plasma' },
      { code: '24348-5', name: 'Bone density study' },
    ],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Cessação permanente da menstruação após 12 meses de amenorreia. Idade média 51 anos. Climatério: período de transição peri e pós-menopausa.',
      criteriosDiagnosticos: [
        '12 meses consecutivos de amenorreia em >45 anos',
        'FSH >25-30 mUI/mL (se necessário confirmar)',
        'Sintomas vasomotores: fogachos, sudorese noturna',
        'Sintomas urogenitais: atrofia vaginal, dispareunia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Exercício físico regular',
          'Evitar gatilhos de fogachos (álcool, café, comida picante)',
          'Lubrificantes vaginais',
          'Terapias mente-corpo'
        ],
        farmacologico: [
          'Terapia hormonal (TH) se sintomas moderados/graves e sem contraindicações',
          'Estrogênio + progestagênio se útero intacto',
          'Estrogênio tópico vaginal para sintomas urogenitais',
          'Alternativas: ISRS, gabapentina, clonidina'
        ]
      },
      redFlags: ['Sangramento pós-menopausa', 'Tromboembolismo prévio', 'Câncer de mama', 'DCV estabelecida'],
      metasTerapeuticas: ['Controle de sintomas', 'Qualidade de vida', 'Prevenção de osteoporose'],
      examesIniciais: ['FSH (se dúvida)', 'Mamografia', 'USTV', 'Densitometria óssea', 'Perfil lipídico']
    },
    protocolos: [],
    medicamentos: ['estradiol'],
    calculadoras: [],
    tags: ['ginecologia', 'osteoporose', 'hormônio'],
    citations: [
      {
        refId: 'nams-menopause-2017',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'ims-menopause-2016',
        evidenceLevel: 'A',
        studyType: 'Consensus',
      },
    ],
  },
  {
    id: 'hiperprolactinemia',
    titulo: 'Hiperprolactinemia',
    sinonimos: ['Prolactina elevada'],
    ciap2: ['T99'],
    cid10: ['E22.1'],
    cid11: ['5A60.1'],
    doid: 'DOID:10504',
    snomedCT: '237662005',
    meshId: 'D006966',
    umlsCui: 'C0020514',
    // LOINC codes for hyperprolactinemia workup
    loinc: [
      { code: '2243-4', name: 'Prolactin [Mass/volume] in Serum or Plasma' },
      { code: '3016-3', name: 'TSH [Units/volume] in Serum or Plasma' },
      { code: '3026-2', name: 'T4 free [Mass/volume] in Serum or Plasma' },
      { code: '2986-8', name: 'Testosterone [Mass/volume] in Serum or Plasma (for men)' },
      { code: '2243-3', name: 'Estradiol (E2) [Mass/volume] in Serum or Plasma (for women)' },
      { code: '19080-1', name: 'Beta-hCG [Units/volume] in Serum or Plasma' },
      { code: '10501-5', name: 'LH (Luteinizing hormone) [Units/volume] in Serum or Plasma' },
      { code: '15067-2', name: 'FSH (Follicle stimulating hormone) [Units/volume] in Serum or Plasma' },
    ],
    categoria: 'endocrino',
    quickView: {
      definicao: 'Elevação da prolactina sérica. Causas: prolactinoma, medicamentos (antipsicóticos, metoclopramida), hipotireoidismo, gestação.',
      criteriosDiagnosticos: [
        'Prolactina >25 ng/mL em mulheres, >20 ng/mL em homens',
        'Excluir causas secundárias: medicamentos, hipotireoidismo',
        'Se PRL >200 ng/mL: altamente sugestivo de prolactinoma',
        'RM de sela túrcica se PRL >100 ou sintomas compressivos'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suspender medicamento causador se possível',
          'Tratar hipotireoidismo se presente'
        ],
        farmacologico: [
          'Agonista dopaminérgico: Cabergolina 0,25-1mg 1-2x/semana',
          'Bromocriptina como alternativa',
          'Cirurgia se refratário ou compressão quiasmática'
        ]
      },
      redFlags: ['Cefaleia intensa', 'Alteração visual (hemianopsia)', 'Apoplexia hipofisária'],
      metasTerapeuticas: ['Prolactina normal', 'Restaurar função gonadal', 'Redução tumoral'],
      examesIniciais: ['Prolactina (2x)', 'TSH', 'Beta-HCG', 'RM de sela túrcica']
    },
    protocolos: [],
    medicamentos: ['cabergolina'],
    calculadoras: [],
    tags: ['hipófise', 'amenorreia', 'galactorreia'],
    citations: [
      {
        refId: 'endocrine-society-prolactin-2011',
        evidenceLevel: 'A',
        studyType: 'Guideline',
      },
      {
        refId: 'pituitary-society-hyperprolactinemia-2006',
        evidenceLevel: 'B',
        studyType: 'Consensus',
      },
    ],
  },
];
