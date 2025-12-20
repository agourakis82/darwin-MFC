/**
 * EXPANSÃO DE DOENÇAS - NOVA FASE
 * =================================
 * 
 * Expansão adicional de doenças para alcançar 248+ doenças
 * Focando em doenças raras, pediátricas, geriátricas e especialidades
 */

import { Doenca } from '../../types/doenca';

// ============================================================================
// DOENÇAS RARAS
// ============================================================================

export const doencasRaras: Partial<Doenca>[] = [
  {
    id: 'doenca-fabry',
    titulo: 'Doença de Fabry',
    categoria: 'outros',
    cid10: ['E75.2'],
    cid11: ['5C56.0Z'],
    snomedCT: '35275008',
    doid: 'DOID:2887',
    meshId: 'D000795',
    umlsCui: 'C0015634',
    hpo: ['HP:0000978', 'HP:0001662'],
    ordo: ['ORPHA:324'],
    quickView: {
      definicao: 'Doença lisossomal ligada ao X causada por deficiência da enzima alfa-galactosidase A, levando ao acúmulo de globotriaosilceramida.',
      criteriosDiagnosticos: [
        'Deficiência enzimática (α-Gal A <30% do normal)',
        'Manifestações clínicas típicas (angioqueratomas, acroparestesias, córnea verticillata)',
        'Confirmação genética (mutações no gene GLA)',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suporte multidisciplinar (nefrologia, cardiologia, neurologia)',
          'Tratamento sintomático (anticonvulsivantes para acroparestesias)',
        ],
        farmacologico: [
          'Agalsidase alfa 0,2 mg/kg IV a cada 2 semanas (TRE)',
          'Agalsidase beta 1 mg/kg IV a cada 2 semanas (TRE alternativa)',
        ],
      },
      redFlags: [
        'Suspicion clínica requer confirmação em centro de referência',
        'Iniciar TRE apenas em centros especializados',
        'Acompanhamento multidisciplinar obrigatório',
        'Insuficiência renal progressiva',
        'Arritmias cardíacas',
        'Acidente vascular cerebral prematuro',
      ],
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    citations: [],
    tags: ['rara', 'genética', 'lisossomal', 'pediatria', 'adulto'],
    lastUpdate: '2024-12',
  },
  {
    id: 'doenca-gaucher',
    titulo: 'Doença de Gaucher',
    categoria: 'outros',
    cid10: ['E75.2'],
    cid11: ['5C56.1'],
    snomedCT: '59157009',
    doid: 'DOID:4056',
    meshId: 'D005776',
    umlsCui: 'C0017185',
    hpo: ['HP:0002723', 'HP:0001873'],
    ordo: ['ORPHA:355'],
    quickView: {
      definicao: 'Doença lisossomal autossômica recessiva causada por deficiência da enzima beta-glicosidase ácida, levando ao acúmulo de glicocerebrosídeo.',
      criteriosDiagnosticos: [
        'Deficiência enzimática (GBA <15% do normal)',
        'Manifestações clínicas (hepatosplenomegalia, citopenias, doença óssea)',
        'Biópsia medular com células de Gaucher',
        'Confirmação genética',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suporte multidisciplinar',
          'Tratamento sintomático (transfusões se necessário)',
        ],
        farmacologico: [
          'Imiglucerase 15-60 U/kg IV a cada 2 semanas (Vitalício) - TRE padrão',
          'Velaglucerase alfa 15-60 U/kg IV a cada 2 semanas (Vitalício) - TRE alternativa',
        ],
        // Nota: Esplenectomia apenas se falha da TRE e trombocitopenia grave (informação cirúrgica)
      },
      redFlags: [
        'Confirmar em centro de referência',
        'Iniciar TRE em centros especializados',
      ],
    },
    tags: ['rara', 'genética', 'lisossomal'],
    lastUpdate: '2024-12',
  },
  {
    id: 'doenca-pompe',
    titulo: 'Doença de Pompe (Glicogenose Tipo II)',
    categoria: 'outros',
    cid10: ['E74.0'],
    cid11: ['5C50.10'],
    snomedCT: '56098004',
    doid: 'DOID:332',
    meshId: 'D017093',
    umlsCui: 'C0033703',
    hpo: ['HP:0003326', 'HP:0003202'],
    ordo: ['ORPHA:365'],
    quickView: {
      definicao: 'Doença lisossomal autossômica recessiva causada por deficiência da enzima alfa-glicosidase ácida, levando ao acúmulo de glicogênio nos músculos e outros tecidos.',
      criteriosDiagnosticos: [
        'Deficiência enzimática (GAA <30% do normal)',
        'Manifestações clínicas (hipotonia, cardiomegalia, insuficiência respiratória)',
        'Confirmação genética',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suporte respiratório',
          'Fisioterapia respiratória',
          'Suporte nutricional',
        ],
        farmacologico: [
          'Alglucosidase alfa 20 mg/kg IV a cada 2 semanas (Vitalício) - TRE única opção específica',
        ],
      },
      redFlags: [
        'Confirmar em centro de referência',
        'Iniciar TRE urgentemente (especialmente forma infantil)',
        'Acompanhamento por neurologia, cardiologia, pneumologia',
      ],
    },
    tags: ['rara', 'genética', 'lisossomal', 'muscular'],
    lastUpdate: '2024-12',
  },
];

// ============================================================================
// DOENÇAS PEDIÁTRICAS
// ============================================================================

export const doencasPediatricasExpandidas: Partial<Doenca>[] = [
  {
    id: 'fibrose-cistica',
    titulo: 'Fibrose Cística',
    categoria: 'pediatrico',
    cid10: ['E84'],
    cid11: ['CA25'],
    snomedCT: '190905008',
    doid: 'DOID:1485',
    meshId: 'D003550',
    umlsCui: 'C0010674',
    hpo: ['HP:0004904', 'HP:0002204'],
    ordo: ['ORPHA:586'],
    quickView: {
      definicao: 'Doença genética autossômica recessiva causada por mutações no gene CFTR, caracterizada por secreções espessas que afetam pulmões, pâncreas e outros órgãos.',
      criteriosDiagnosticos: [
        'Teste do pezinho alterado (triagem neonatal)',
        'Teste do suor (cloreto >60 mEq/L)',
        'Duas mutações patogênicas no CFTR',
        'Manifestações clínicas típicas',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fisioterapia respiratória diária',
          'Desobstrução de vias aéreas',
          'Suporte nutricional (enzimas pancreáticas)',
          'Suplementação vitamínica (A, D, E, K)',
        ],
        farmacologico: [
          'Dornase alfa 2,5 mg nebulização 1x/dia (Contínuo) - Reduz viscosidade do muco',
          'Ivacaftor + Lumacaftor Conforme protocolo (moduladores CFTR) (Vitalício (se elegível)) - Apenas para mutações específicas',
        ],
        // Nota: Transplante pulmonar em casos avançados (informação cirúrgica)
      },
      redFlags: [
        'Todas as crianças devem ser acompanhadas em centro de referência',
        'Internação para exacerbações respiratórias',
      ],
    },
    tags: ['genética', 'pediatria', 'respiratória', 'gastrointestinal'],
    lastUpdate: '2024-12',
  },
  {
    id: 'espinha-bifida',
    titulo: 'Espinha Bífida',
    categoria: 'pediatrico',
    cid10: ['Q05'],
    cid11: ['LA02'],
    snomedCT: '204063003',
    doid: 'DOID:1060',
    meshId: 'D013131',
    umlsCui: 'C0037923',
    hpo: ['HP:0002415', 'HP:0001250'],
    quickView: {
      definicao: 'Defeito congênito do tubo neural caracterizado por falha no fechamento da coluna vertebral, podendo envolver meninges e/ou medula espinhal.',
      criteriosDiagnosticos: [
        'Diagnóstico pré-natal (ultrassom)',
        'Exame físico ao nascer',
        'Exames de imagem (RM) para avaliação completa',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cirurgia de correção precoce (idealmente nas primeiras 48h)',
          'Fisioterapia',
          'Tratamento de incontinência',
          'Prevenção de infecções urinárias',
        ],
        farmacologico: [
          'Ácido fólico Profilaxia pré-concepcional: 5 mg/dia (1 mês antes e durante gestação) - Prevenção primária',
        ],
        // Nota: Reparo cirúrgico da lesão. Derivação ventriculoperitoneal se hidrocefalia (informação cirúrgica)
      },
      redFlags: [
        'Todas as crianças devem ser acompanhadas em centro especializado',
        'Equipe multidisciplinar obrigatória',
      ],
    },
    tags: ['congênita', 'pediatria', 'neurológica'],
    lastUpdate: '2024-12',
  },
];

// ============================================================================
// DOENÇAS GERIÁTRICAS
// ============================================================================

export const doencasGeriatricasExpandidas: Partial<Doenca>[] = [
  {
    id: 'sindrome-fragilidade',
    titulo: 'Síndrome da Fragilidade',
    categoria: 'geriatrico',
    cid10: ['R54'],
    cid11: ['MG2A'],
    snomedCT: '71425006',
    doid: 'DOID:9000000',
    meshId: 'D058010',
    umlsCui: 'C3714705',
    quickView: {
      definicao: 'Síndrome geriátrica caracterizada por redução das reservas fisiológicas e maior vulnerabilidade a estressores, aumentando risco de quedas, hospitalização e mortalidade.',
      criteriosDiagnosticos: [
        'Critérios de Fried (≥3 de 5): perda de peso não intencional, fadiga, baixa atividade física, velocidade de marcha reduzida, fraqueza muscular',
        'Avaliação funcional: testes de força de preensão, velocidade de marcha',
        'Questionários: SHARE-FI, FRAIL scale',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Exercício físico multicomponente (força, equilíbrio, resistência)',
          'Suporte nutricional (proteína adequada)',
          'Tratamento de doenças crônicas',
          'Prevenção de quedas',
          'Revisão de medicamentos (desprescrição quando possível)',
        ],
        farmacologico: [
          'Suplementação de vitamina D 800-1000 UI/dia (Contínuo) - Se deficiência confirmada',
        ],
      },
      redFlags: [
        'Avaliação geriátrica ampla (AGA) em centro especializado',
        'Reabilitação geriátrica',
        'Equipe multidisciplinar',
      ],
    },
    tags: ['geriatria', 'sindrome-geriatrica', 'fragilidade'],
    lastUpdate: '2024-12',
  },
  {
    id: 'delirium',
    titulo: 'Delirium',
    categoria: 'geriatrico',
    cid10: ['F05'],
    cid11: ['6D70'],
    snomedCT: '419620001',
    doid: 'DOID:1299',
    meshId: 'D003693',
    umlsCui: 'C0011269',
    quickView: {
      definicao: 'Distúrbio agudo da atenção e consciência, com início súbito e curso flutuante, frequentemente associado a condição médica ou medicamentosa.',
      criteriosDiagnosticos: [
        'DSM-5: Perturbação aguda da atenção e consciência',
        'Mudança aguda (horas a dias) com flutuação',
        'Evidência de causa médica/substância',
        'CAM (Confusion Assessment Method)',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Identificar e tratar causa subjacente',
          'Orientação temporal e espacial',
          'Presença familiar',
          'Estimulação cognitiva',
          'Mobilização precoce',
          'Correção de deficiências sensoriais (óculos, aparelho auditivo)',
          'Normalização do ciclo sono-vigília',
        ],
        farmacologico: [
          'Haloperidol 0,5-2 mg VO/IM a cada 4-6 horas se necessário (sintomas graves) (Curto prazo) - Apenas se agitado ou risco de autolesão. Usar dose mínima efetiva.',
        ],
      },
      redFlags: [
        'Delirium refratário',
        'Necessidade de contenção química',
        'Investigação de causa não identificada',
      ],
    },
    tags: ['geriatria', 'neurologico', 'sindrome-geriatrica'],
    lastUpdate: '2024-12',
  },
];

// ============================================================================
// DOENÇAS INFECCIOSAS ADICIONAIS
// ============================================================================

export const doencasInfecciosasExpandidas: Partial<Doenca>[] = [
  {
    id: 'hepatite-a',
    titulo: 'Hepatite A',
    categoria: 'infecciosas',
    cid10: ['B15'],
    cid11: ['1D81'],
    snomedCT: '40468003',
    doid: 'DOID:2234',
    meshId: 'D006506',
    umlsCui: 'C0019158',
    quickView: {
      definicao: 'Infecção aguda pelo vírus da hepatite A (HAV), transmitida principalmente por via fecal-oral, através de água e alimentos contaminados.',
      criteriosDiagnosticos: [
        'Sorologia: Anti-HAV IgM positivo (infecção aguda)',
        'Anti-HAV IgG positivo (infecção prévia ou vacinação)',
        'Clínica: icterícia, colúria, hipocolia fecal, astenia, náuseas',
        'Elevação de transaminases (ALT > AST)',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Repouso relativo',
          'Hidratação adequada',
          'Dieta normocalórica (evitar álcool)',
          'Isolamento de precaução entérica até 1 semana após início da icterícia',
        ],
        farmacologico: [
          'Suporte sintomático Paracetamol para febre/dor se necessário (Conforme sintomas) - Evitar medicações hepatotóxicas',
        ],
      },
      redFlags: [
        'Hepatite fulminante',
        'Coagulopatia grave',
        'Encefalopatia hepática',
        'Icterícia prolongada (>4 semanas)',
      ],
    },
    tags: ['hepatite', 'viral', 'infecciosa', 'prevenivel'],
    lastUpdate: '2024-12',
  },
  {
    id: 'hepatite-b',
    titulo: 'Hepatite B',
    categoria: 'infecciosas',
    cid10: ['B16', 'B18.0', 'B18.1'],
    cid11: ['1D82', '1D83'],
    snomedCT: '66071002',
    doid: 'DOID:2043',
    meshId: 'D006509',
    umlsCui: 'C0019163',
    quickView: {
      definicao: 'Infecção pelo vírus da hepatite B (HBV), que pode ser aguda ou crônica, transmitida por sangue, sêmen, secreções vaginais e perinatalmente.',
      criteriosDiagnosticos: [
        'Sorologia: HBsAg positivo (infecção atual)',
        'Anti-HBc IgM (infecção aguda)',
        'Anti-HBc IgG (infecção prévia ou crônica)',
        'HBeAg e DNA-HBV (replicação viral)',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Vacinação de contatos',
          'Prevenção de transmissão',
          'Monitoramento',
        ],
        farmacologico: [
          'Entecavir ou Tenofovir Conforme protocolo (Varia conforme critérios) - Apenas para hepatite crônica com indicação (elevação ALT, DNA-HBV, fibrose)',
        ],
      },
      redFlags: [
        'Hepatite crônica com indicação de tratamento',
        'Hepatite fulminante',
        'Cirrose hepática',
        'Carcinoma hepatocelular',
      ],
    },
    tags: ['hepatite', 'viral', 'cronica', 'infecciosa'],
    lastUpdate: '2024-12',
  },
];

// Exportar todas
export const doencasExpansaoNovaFase = [
  ...doencasRaras,
  ...doencasPediatricasExpandidas,
  ...doencasGeriatricasExpandidas,
  ...doencasInfecciosasExpandidas,
];

