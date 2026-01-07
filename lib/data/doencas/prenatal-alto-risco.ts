/**
 * PRÉ-NATAL DE ALTO RISCO - DARWIN-MFC
 * =====================================
 *
 * Módulo completo de condições de alto risco gestacional
 * Baseado no Manual de Gestação de Alto Risco MS 2022 e diretrizes internacionais
 *
 * Condições incluídas:
 * 1. Classificação de Risco Gestacional
 * 2. Diabetes Mellitus Gestacional (DMG)
 * 3. Pré-eclâmpsia/Eclâmpsia/HELLP
 * 4. Hipertensão Arterial Crônica na Gestação
 * 5. Hipotireoidismo na Gestação
 * 6. Hipertireoidismo na Gestação
 * 7. Cardiopatia e Gravidez
 * 8. Trombofilia na Gestação
 * 9. HIV na Gestação
 * 10. Sífilis na Gestação
 * 11. Hepatite B na Gestação
 * 12. Anemia na Gestação
 * 13. Gestação Gemelar
 */

import type { Doenca } from '../../types/doenca';

// =============================================================================
// 1. CLASSIFICAÇÃO DE RISCO GESTACIONAL
// =============================================================================

export const classificacaoRiscoGestacional: Doenca = {
  id: 'classificacao-risco-gestacional',
  titulo: 'Classificação de Risco Gestacional',
  sinonimos: ['estratificação de risco gestacional', 'gestação de alto risco', 'pré-natal de alto risco'],

  // Ontologias
  ciap2: ['W78', 'W84'],
  cid10: ['O09', 'Z35'],
  cid11: ['QA40'],
  snomedCT: '237238006',

  categoria: 'ginecologico',
  subcategoria: 'obstetrícia',

  quickView: {
    definicao: 'A gestação de alto risco é aquela que possui qualquer condição que interfira ou possa interferir no bem-estar materno ou fetal. Está presente em cerca de 15% das gestações.',
    criteriosDiagnosticos: [
      'Fatores pessoais: idade <15 ou >35 anos, peso <45kg ou IMC >30',
      'Condições prévias: HAS, DM, cardiopatia, tireopatias, doenças autoimunes',
      'História reprodutiva: óbito fetal/neonatal anterior, prematuridade prévia, PE prévia',
      'Gestação atual: gemelaridade, malformação fetal, RCIU, polidrâmnio/oligodrâmnio'
    ],
    classificacaoRisco: [
      {
        nivel: 'baixo',
        criterios: ['Sem fatores de risco identificados', 'Gestação única', 'Sem comorbidades'],
        conduta: 'Pré-natal de baixo risco na APS. Mínimo 6 consultas.'
      },
      {
        nivel: 'moderado',
        criterios: ['Idade 15-19 ou 35-39 anos', 'IMC 25-29,9 ou <18,5', 'Tabagismo ativo', 'ITU de repetição'],
        conduta: 'Pré-natal na APS com vigilância aumentada. Considerar interconsulta.'
      },
      {
        nivel: 'alto',
        criterios: ['HAS crônica', 'DM prévio ou DMG', 'Cardiopatia compensada', 'Epilepsia', 'HIV/Sífilis'],
        conduta: 'Pré-natal de alto risco. Compartilhamento APS + especialista.'
      },
      {
        nivel: 'muito_alto',
        criterios: ['Cardiopatia descompensada (NYHA III-IV)', 'PE grave/HELLP prévio', 'Óbito fetal anterior', 'Gemelaridade monocoriônica'],
        conduta: 'Pré-natal de alto risco em centro de referência. Planejamento do parto.'
      }
    ],
    tratamentoPrimeiraLinha: {
      naoFarmacologico: [
        'Identificação precoce de fatores de risco na 1ª consulta',
        'Estratificação de risco a cada consulta',
        'Suplementação: ácido fólico 0,4mg/dia + sulfato ferroso 40mg Fe/dia'
      ],
      farmacologico: [
        'AAS 100mg/dia: se risco de pré-eclâmpsia (iniciar 12-16 sem, até 36 sem)',
        'Carbonato de cálcio 1-2g/dia: se baixa ingesta de cálcio',
        'Progesterona vaginal: se colo curto (<25mm) ou parto prematuro prévio'
      ]
    },
    redFlags: [
      'PA ≥160/110 mmHg',
      'Sangramento vaginal',
      'Diminuição dos movimentos fetais',
      'Perda de líquido amniótico',
      'Cefaleia intensa + escotomas',
      'Dor abdominal intensa',
      'Edema súbito de face/mãos'
    ],
    metasTerapeuticas: [
      'Gestação a termo (≥37 semanas)',
      'Peso ao nascer adequado para IG',
      'Parto seguro para mãe e concepto'
    ],
    examesIniciais: [
      'Hemograma completo',
      'Tipagem sanguínea + Fator Rh + Coombs indireto',
      'Glicemia de jejum',
      'VDRL/RPR',
      'HIV (teste rápido)',
      'HBsAg',
      'Toxoplasmose IgG/IgM',
      'Urina tipo I + Urocultura',
      'USG obstétrica (11-14 sem para TN)'
    ]
  },

  fullContent: {
    epidemiologia: {
      prevalencia: '15% das gestações são classificadas como alto risco',
      incidencia: 'Brasil: ~3 milhões de gestações/ano, ~450.000 de alto risco',
      mortalidade: 'Razão de mortalidade materna: 55/100.000 NV (2022)',
      faixaEtaria: 'Maior risco em extremos da idade reprodutiva (<15 e >35 anos)',
      fatoresRisco: [
        'Idade materna <15 ou >35 anos',
        'Baixa escolaridade',
        'Situação conjugal instável',
        'IMC <18,5 ou >30 kg/m²',
        'Uso de tabaco, álcool ou drogas ilícitas',
        'Exposição ocupacional a agentes teratogênicos',
        'Hipertensão arterial crônica',
        'Diabetes mellitus prévio',
        'Cardiopatias',
        'Doenças autoimunes (LES, SAF)',
        'Infecção por HIV, sífilis, hepatites',
        'Doenças psiquiátricas',
        'História de prematuridade ou RCIU',
        'Óbito fetal ou neonatal prévio',
        'Pré-eclâmpsia grave prévia'
      ],
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    fisiopatologia: {
      texto: 'A gestação de alto risco resulta da interação entre fatores maternos, placentários e fetais que comprometem a adaptação fisiológica à gravidez. Condições pré-existentes (HAS, DM, cardiopatias) são exacerbadas pelas alterações hemodinâmicas, metabólicas e imunológicas da gestação. A placentação inadequada, especialmente a invasão trofoblástica defeituosa das artérias espiraladas, está na gênese de várias complicações como pré-eclâmpsia e RCIU.',
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    quadroClinico: {
      sintomasPrincipais: [
        'Dependente da condição de base',
        'Sinais de alerta: cefaleia, escotomas, epigastralgia',
        'Sangramento vaginal em qualquer trimestre',
        'Diminuição dos movimentos fetais',
        'Dispneia progressiva',
        'Edema acentuado/súbito'
      ],
      sinaisExameFisico: [
        'PA elevada',
        'Altura uterina discordante da IG',
        'BCF alterado (bradicardia/taquicardia)',
        'Edema de face e mãos',
        'Icterícia',
        'Sinais de descompensação cardíaca'
      ],
      formasClinicas: [
        'Risco relacionado a condições prévias',
        'Risco relacionado à história reprodutiva',
        'Risco relacionado a condições da gestação atual'
      ],
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    diagnostico: {
      criterios: [
        'Anamnese detalhada na 1ª consulta',
        'Identificação de fatores de risco',
        'Exame físico completo incluindo IMC e PA',
        'Exames complementares de rotina',
        'USG obstétrica para datação e rastreio'
      ],
      diagnosticoDiferencial: [
        'Gestação de baixo risco',
        'Gestação de risco intermediário',
        'Emergência obstétrica'
      ],
      examesLaboratoriais: [
        'Hemograma completo',
        'Glicemia de jejum (<92 mg/dL)',
        'TOTG 75g (24-28 sem): jejum <92, 1h <180, 2h <153',
        'Tipagem ABO/Rh + Coombs indireto',
        'VDRL/RPR',
        'HIV',
        'HBsAg',
        'Anti-HCV (populações de risco)',
        'Toxoplasmose IgG/IgM',
        'TSH (se disponível)',
        'Urocultura'
      ],
      examesImagem: [
        'USG 1º trimestre (11-14 sem): TN, datação',
        'USG morfológico (20-24 sem)',
        'USG 3º trimestre (32-36 sem): crescimento, LA, placenta',
        'Doppler de artérias uterinas (se risco de PE)',
        'Ecocardiograma fetal (se indicado)'
      ],
      outrosExames: [
        'Cardiotocografia (a partir de 32 sem em gestações de risco)',
        'Perfil biofísico fetal',
        'Contagem de movimentos fetais'
      ],
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }, { refId: 'ms-prenatal-baixo-risco-2012' }]
    },

    tratamento: {
      objetivos: [
        'Identificação e manejo precoce de complicações',
        'Gestação a termo com RN saudável',
        'Prevenção de morbimortalidade materna e perinatal',
        'Planejamento do momento e via de parto'
      ],
      naoFarmacologico: {
        medidas: [
          'Consultas pré-natais com frequência adequada ao risco',
          'Educação em saúde: sinais de alerta',
          'Orientação nutricional individualizada',
          'Suporte psicossocial',
          'Planejamento do parto em maternidade adequada'
        ],
        citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
      },
      farmacologico: {
        primeiraLinha: [
          {
            classe: 'Suplementação universal',
            medicamentos: ['Ácido fólico 0,4mg/dia', 'Sulfato ferroso 40mg Fe elementar/dia'],
            posologia: 'Iniciar no 1º trimestre, manter durante toda gestação',
            observacoes: 'Ácido fólico idealmente desde pré-concepção'
          },
          {
            classe: 'Profilaxia pré-eclâmpsia',
            medicamentos: ['AAS 100-150mg/dia'],
            posologia: 'Iniciar entre 12-16 semanas, até 36 semanas',
            observacoes: 'Indicado se ≥1 fator de alto risco ou ≥2 de risco moderado'
          }
        ],
        segundaLinha: [
          {
            classe: 'Suplementação de cálcio',
            medicamentos: ['Carbonato de cálcio 1-2g/dia'],
            posologia: 'Dividido em 2-3 doses, longe das refeições',
            observacoes: 'Indicado se baixa ingesta dietética de cálcio'
          },
          {
            classe: 'Prevenção prematuridade',
            medicamentos: ['Progesterona micronizada 200mg vaginal'],
            posologia: 'Uma vez ao dia, ao deitar',
            observacoes: 'Se colo curto (<25mm) ou parto prematuro prévio'
          }
        ],
        situacoesEspeciais: [
          {
            situacao: 'Gestante Rh negativo não sensibilizada',
            conduta: 'Imunoglobulina anti-D 300mcg IM na 28ª sem e até 72h pós-parto'
          },
          {
            situacao: 'Alto risco de ácido fólico insuficiente',
            conduta: 'Ácido fólico 4-5mg/dia (epilepsia, DM prévio, obesidade, gemelaridade)'
          }
        ],
        citations: [{ refId: 'ms-gestacao-alto-risco-2022' }, { refId: 'aspre-trial-2017' }]
      },
      duracao: 'Durante toda a gestação, com ajustes conforme evolução'
    },

    acompanhamento: {
      frequenciaConsultas: 'Baixo risco: mensal até 28 sem, quinzenal até 36 sem, semanal até o parto. Alto risco: individualizado, geralmente semanal ou quinzenal.',
      examesControle: [
        'Hemograma: trimestral',
        'Glicemia de jejum: trimestral',
        'VDRL: trimestral',
        'Urocultura: trimestral',
        'Coombs indireto: mensal se Rh negativo',
        'USG: conforme indicação clínica'
      ],
      metasTerapeuticas: [
        'PA <140/90 mmHg (ou <135/85 em HAS crônica)',
        'Glicemia de jejum <95 mg/dL',
        'Ganho de peso adequado para IMC prévio',
        'Crescimento fetal adequado para IG'
      ],
      criteriosEncaminhamento: [
        'Qualquer condição de alto risco identificada',
        'Sinais de gravidade: PE grave, DMG sem controle, RCIU',
        'Necessidade de propedêutica especializada',
        'Planejamento de parto complexo'
      ],
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    prevencao: {
      primaria: [
        'Planejamento familiar adequado',
        'Suplementação pré-concepcional de ácido fólico',
        'Controle de doenças crônicas antes da gestação',
        'Vacinação em dia',
        'Cessação de tabagismo e álcool'
      ],
      secundaria: [
        'Captação precoce para pré-natal',
        'Estratificação de risco na 1ª consulta',
        'AAS para prevenção de pré-eclâmpsia',
        'Rastreamento de DMG com TOTG'
      ],
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    populacoesEspeciais: {
      gestantes: 'Este módulo é inteiramente dedicado às gestantes de alto risco.'
    }
  },

  protocolos: ['prenatal-alto-risco', 'estratificacao-risco-gestacional'],
  medicamentos: ['acido-folico', 'sulfato-ferroso', 'aas', 'progesterona'],
  calculadoras: ['imc', 'idade-gestacional', 'peso-fetal-estimado'],
  rastreamentos: ['dmg', 'pre-eclampsia', 'sifilis-gestacao'],

  citations: [
    { refId: 'ms-gestacao-alto-risco-2022' },
    { refId: 'ms-prenatal-baixo-risco-2012' }
  ],

  lastUpdate: '2025-01-07',
  tags: ['gestação', 'alto risco', 'pré-natal', 'obstetrícia', 'classificação']
};

// =============================================================================
// 2. DIABETES MELLITUS GESTACIONAL (DMG)
// =============================================================================

export const diabetesGestacional: Doenca = {
  id: 'diabetes-gestacional',
  titulo: 'Diabetes Mellitus Gestacional',
  sinonimos: ['DMG', 'diabetes na gravidez', 'hiperglicemia gestacional'],

  // Ontologias
  doid: 'DOID:11714',
  snomedCT: '11687002',
  meshId: 'D016640',
  ciap2: ['W85', 'T90'],
  cid10: ['O24.4', 'O24.9'],
  cid11: ['JA63.2'],

  categoria: 'endocrino',
  subcategoria: 'diabetes gestacional',

  quickView: {
    definicao: 'Hiperglicemia detectada pela primeira vez durante a gestação, que não atinge os critérios diagnósticos de diabetes prévio. Acomete 7-18% das gestações brasileiras.',
    criteriosDiagnosticos: [
      'TOTG 75g (24-28 sem): Jejum ≥92 OU 1h ≥180 OU 2h ≥153 mg/dL',
      'Glicemia de jejum 1º trimestre: ≥92 e <126 mg/dL = DMG precoce',
      'Glicemia de jejum ≥126 ou HbA1c ≥6,5% = DM prévio (overt diabetes)'
    ],
    classificacaoRisco: [
      {
        nivel: 'baixo',
        criterios: ['DMG dietético', 'Controle glicêmico com dieta', 'USG normal'],
        conduta: 'Dieta + exercício. Glicemia capilar 4x/dia. USG mensal.'
      },
      {
        nivel: 'moderado',
        criterios: ['DMG em insulinoterapia', 'Bom controle glicêmico', 'Crescimento fetal adequado'],
        conduta: 'Insulina + dieta. Glicemia capilar 4-7x/dia. CTG semanal a partir 32 sem.'
      },
      {
        nivel: 'alto',
        criterios: ['Controle glicêmico inadequado', 'Macrossomia fetal', 'Polidrâmnio'],
        conduta: 'Ajuste intensivo de insulina. Internação para controle se necessário.'
      }
    ],
    tratamentoPrimeiraLinha: {
      naoFarmacologico: [
        'Orientação nutricional: 1.800-2.200 kcal/dia, fracionado em 6 refeições',
        'Carboidratos complexos: 40-45% do VCT',
        'Exercício físico: 30 min/dia, 5x/semana (caminhada, hidroginástica)',
        'Automonitorização glicêmica: 4-7 medidas/dia'
      ],
      farmacologico: [
        'Insulina NPH: se jejum elevado, iniciar 0,1-0,2 UI/kg/dia à noite',
        'Insulina Regular/Lispro/Aspart: se pós-prandial elevado',
        'Metformina 500-2500mg/dia: alternativa se insulina indisponível'
      ]
    },
    redFlags: [
      'Cetoacidose diabética',
      'Hipoglicemia grave',
      'Macrossomia (CA ≥P75)',
      'Polidrâmnio',
      'Pré-eclâmpsia sobreposta',
      'Movimentos fetais diminuídos'
    ],
    metasTerapeuticas: [
      'Jejum: <95 mg/dL',
      '1h pós-prandial: <140 mg/dL',
      '2h pós-prandial: <120 mg/dL',
      'HbA1c: <6% (sem hipoglicemias)'
    ],
    examesIniciais: [
      'Glicemia de jejum (1ª consulta)',
      'TOTG 75g (24-28 semanas)',
      'HbA1c (se suspeita de DM prévio)',
      'Função renal, fundo de olho (se DM prévio)',
      'USG para avaliação de CA fetal'
    ]
  },

  fullContent: {
    epidemiologia: {
      prevalencia: '7-18% das gestações no Brasil (critérios IADPSG)',
      incidencia: 'Aumentando paralelamente à epidemia de obesidade',
      fatoresRisco: [
        'Idade ≥35 anos',
        'IMC ≥25 kg/m²',
        'Ganho de peso excessivo na gestação',
        'HF de DM em parente de 1º grau',
        'DMG em gestação anterior',
        'Macrossomia prévia (≥4.000g)',
        'Óbito fetal inexplicado',
        'Síndrome dos ovários policísticos',
        'Uso de corticoides'
      ],
      citations: [{ refId: 'sbd-dmg-2025' }, { refId: 'hapo-study-2008' }]
    },

    fisiopatologia: {
      texto: 'A gestação é caracterizada por resistência insulínica fisiológica, especialmente no 2º e 3º trimestres, mediada por hormônios placentários (lactogênio placentário, progesterona, cortisol). O DMG ocorre quando a capacidade de secreção de insulina pelas células beta pancreáticas não consegue compensar essa resistência aumentada. A hiperglicemia materna leva à hiperglicemia e hiperinsulinemia fetal, causando macrossomia, organomegalia e risco de hipoglicemia neonatal.',
      citations: [{ refId: 'hapo-study-2008' }, { refId: 'sbd-dmg-2025' }]
    },

    quadroClinico: {
      sintomasPrincipais: [
        'Frequentemente assintomático',
        'Poliúria/polidipsia (se hiperglicemia acentuada)',
        'Ganho de peso excessivo',
        'Fadiga'
      ],
      sinaisExameFisico: [
        'Altura uterina maior que esperada para IG',
        'Polidrâmnio',
        'Obesidade'
      ],
      formasClinicas: [
        'DMG classe A1: controlado apenas com dieta',
        'DMG classe A2: necessita de insulina/antidiabético'
      ],
      citations: [{ refId: 'sbd-dmg-2025' }]
    },

    diagnostico: {
      criterios: [
        'RASTREAMENTO UNIVERSAL com TOTG 75g entre 24-28 semanas',
        'Diagnóstico: ≥1 valor alterado no TOTG',
        'Jejum ≥92 mg/dL',
        '1 hora ≥180 mg/dL',
        '2 horas ≥153 mg/dL'
      ],
      diagnosticoDiferencial: [
        'DM tipo 2 prévio não diagnosticado (overt diabetes)',
        'DM tipo 1',
        'MODY (diabetes monogênico)',
        'Diabetes secundário (corticoterapia)'
      ],
      examesLaboratoriais: [
        'Glicemia de jejum na 1ª consulta',
        'TOTG 75g (24-28 sem): jejum, 1h, 2h',
        'HbA1c (se suspeita de DM prévio)',
        'Perfil lipídico',
        'Função renal (Cr, clearance)',
        'Proteinúria 24h (se suspeita de nefropatia)'
      ],
      examesImagem: [
        'USG obstétrica mensal (crescimento fetal)',
        'USG com biometria fetal detalhada',
        'Doppler umbilical/cerebral se RCIU'
      ],
      outrosExames: [
        'Glicemia capilar (automonitorização)',
        'Cardiotocografia a partir de 32 sem',
        'Perfil biofísico fetal'
      ],
      citations: [{ refId: 'iadpsg-criteria-2010' }, { refId: 'sbd-dmg-2025' }]
    },

    tratamento: {
      objetivos: [
        'Euglicemia materna',
        'Crescimento fetal adequado',
        'Prevenção de complicações perinatais',
        'Parto a termo por via apropriada'
      ],
      naoFarmacologico: {
        medidas: [
          'Orientação nutricional individualizada',
          'Carboidratos 40-45% do VET, preferencialmente complexos',
          'Fracionamento: 3 refeições + 3 lanches',
          'Exercício físico regular: 30 min, 5x/semana',
          'Automonitorização: jejum + 1-2h pós-prandial (4-7x/dia)'
        ],
        citations: [{ refId: 'sbd-dmg-2025' }, { refId: 'ada-diabetes-pregnancy-2025' }]
      },
      farmacologico: {
        primeiraLinha: [
          {
            classe: 'Insulina',
            medicamentos: ['Insulina NPH', 'Insulina Regular', 'Insulina Lispro', 'Insulina Aspart'],
            posologia: 'Dose inicial: 0,5 UI/kg/dia, dividida em múltiplas aplicações',
            observacoes: 'Ajustar a cada 1-2 semanas conforme glicemia capilar',
            gradeLevel: 'A'
          }
        ],
        segundaLinha: [
          {
            classe: 'Biguanida',
            medicamentos: ['Metformina'],
            posologia: '500-2500 mg/dia, dividido em 2-3 doses',
            observacoes: 'Alternativa se insulina indisponível. ~46% necessitam associar insulina.',
            gradeLevel: 'B'
          }
        ],
        situacoesEspeciais: [
          {
            situacao: 'Apenas jejum elevado',
            conduta: 'NPH ao deitar (0,1-0,2 UI/kg)'
          },
          {
            situacao: 'Apenas pós-prandial elevado',
            conduta: 'Insulina rápida antes da refeição específica'
          },
          {
            situacao: 'CA fetal ≥P75 mesmo com glicemias normais',
            conduta: 'Iniciar insulina independente dos valores glicêmicos'
          },
          {
            situacao: 'Corticoterapia para maturação pulmonar',
            conduta: 'Aumentar insulina em 30-50%, monitorizar glicemia a cada 4-6h por 72h'
          }
        ],
        citations: [{ refId: 'sbd-dmg-2025' }, { refId: 'ada-diabetes-pregnancy-2025' }]
      },
      duracao: 'Durante toda a gestação. Suspender medicamentos no pós-parto imediato.'
    },

    acompanhamento: {
      frequenciaConsultas: 'Quinzenal até 30 sem, semanal após 30 sem',
      examesControle: [
        'Glicemia capilar: 4-7x/dia',
        'HbA1c: mensal',
        'USG: mensal para crescimento fetal',
        'CTG: semanal a partir de 32 sem',
        'Doppler: se RCIU ou PE'
      ],
      metasTerapeuticas: [
        'Jejum: <95 mg/dL',
        '1h pós-prandial: <140 mg/dL',
        '2h pós-prandial: <120 mg/dL',
        'HbA1c: <6% (idealmente)'
      ],
      criteriosEncaminhamento: [
        'Todas as gestantes com DMG devem ter acompanhamento compartilhado',
        'Controle inadequado após 2 semanas de insulinoterapia',
        'Macrossomia ou polidrâmnio',
        'Complicações: PE, RCIU'
      ],
      citations: [{ refId: 'sbd-dmg-2025' }]
    },

    prevencao: {
      primaria: [
        'Manter peso adequado antes da gestação',
        'Dieta equilibrada e atividade física regular',
        'Planejamento de gestação em idade apropriada'
      ],
      secundaria: [
        'Rastreamento universal com TOTG 24-28 sem',
        'Glicemia de jejum na 1ª consulta',
        'Intervenção nutricional precoce em obesas'
      ],
      citations: [{ refId: 'sbd-dmg-2025' }]
    },

    populacoesEspeciais: {
      gestantes: 'Esta é uma condição exclusiva da gestação. 15-70% desenvolvem DM2 nos anos subsequentes.'
    }
  },

  protocolos: ['dmg-manejo', 'insulinoterapia-gestacao'],
  medicamentos: ['insulina-nph', 'insulina-regular', 'insulina-lispro', 'insulina-aspart', 'metformina'],
  calculadoras: ['totg-interpretacao', 'dose-insulina-gestacao'],
  rastreamentos: ['dmg-totg'],

  citations: [
    { refId: 'sbd-dmg-2025' },
    { refId: 'ada-diabetes-pregnancy-2025' },
    { refId: 'hapo-study-2008' },
    { refId: 'iadpsg-criteria-2010' }
  ],

  lastUpdate: '2025-01-07',
  tags: ['diabetes', 'gestação', 'DMG', 'insulina', 'endocrinologia', 'obstetrícia']
};

// =============================================================================
// 3. PRÉ-ECLÂMPSIA / ECLÂMPSIA / HELLP
// =============================================================================

export const preEclampsia: Doenca = {
  id: 'pre-eclampsia-eclampsia',
  titulo: 'Pré-eclâmpsia, Eclâmpsia e Síndrome HELLP',
  sinonimos: ['doença hipertensiva específica da gestação', 'DHEG', 'toxemia gravídica', 'hipertensão gestacional'],

  // Ontologias
  doid: 'DOID:10591',
  snomedCT: '398254007',
  meshId: 'D011225',
  ciap2: ['W81'],
  cid10: ['O14.0', 'O14.1', 'O14.2', 'O14.9', 'O15.0', 'O15.1'],
  cid11: ['JA24', 'JA25'],

  categoria: 'cardiovascular',
  subcategoria: 'hipertensão gestacional',

  quickView: {
    definicao: 'Pré-eclâmpsia: HAS de novo (≥140/90) após 20 semanas + proteinúria ou lesão de órgão-alvo. Eclâmpsia: convulsão em contexto de PE. HELLP: hemólise + enzimas hepáticas elevadas + plaquetopenia.',
    criteriosDiagnosticos: [
      'PA ≥140/90 mmHg em 2 medidas (4h de intervalo) após 20 semanas',
      'Proteinúria ≥300mg/24h OU relação P/C ≥0,3 OU fita ≥1+',
      'OU lesão de órgão-alvo SEM proteinúria (plaquetas <100.000, Cr >1,1, transaminases 2x LSN)',
      'PE com sinais de gravidade: PA ≥160/110, plaquetas <100.000, sintomas cerebrais/visuais'
    ],
    classificacaoRisco: [
      {
        nivel: 'moderado',
        criterios: ['PE sem sinais de gravidade', 'PA <160/110', 'Labs estáveis', 'Bem-estar fetal preservado'],
        conduta: 'Internação para avaliação. Vigilância PA, labs, vitalidade fetal. Parto com 37 semanas.'
      },
      {
        nivel: 'alto',
        criterios: ['PE com sinais de gravidade', 'HELLP parcial', 'RCIU associado'],
        conduta: 'Internação. MgSO4 profilático. Anti-hipertensivo se PA ≥160/110. Corticoide se <34 sem. Parto com 34-37 sem.'
      },
      {
        nivel: 'muito_alto',
        criterios: ['Eclâmpsia', 'HELLP completo', 'DPP', 'EAP', 'Insuficiência renal aguda'],
        conduta: 'EMERGÊNCIA. MgSO4 + anti-hipertensivo IV. Estabilização e parto IMEDIATO.'
      }
    ],
    tratamentoPrimeiraLinha: {
      naoFarmacologico: [
        'Internação hospitalar',
        'Repouso relativo',
        'Monitorização de PA (6/6h ou contínua se grave)',
        'Balanço hídrico rigoroso',
        'Avaliação de vitalidade fetal'
      ],
      farmacologico: [
        'MgSO4 (Zuspan): Ataque 4g IV em 20min + Manutenção 1-2g/h',
        'Hidralazina 5mg IV: se PA ≥160/110 (repetir 20/20min até 20mg)',
        'Nifedipina 10mg VO: alternativa para crise hipertensiva',
        'Betametasona 12mg IM 2 doses 24h: se <34 semanas'
      ]
    },
    redFlags: [
      'Convulsão (eclâmpsia)',
      'PA ≥160/110 mmHg persistente',
      'Cefaleia intensa refratária',
      'Escotomas/amaurose',
      'Epigastralgia/dor em barra',
      'Oligúria (<500mL/24h)',
      'Plaquetas <100.000/mm³',
      'Transaminases >2x LSN',
      'Descolamento prematuro de placenta',
      'Sofrimento fetal'
    ],
    metasTerapeuticas: [
      'PA <160/110 mmHg (não hipotensão)',
      'Diurese ≥25 mL/h',
      'Ausência de sinais de iminência de eclâmpsia',
      'Estabilidade laboratorial'
    ]
  },

  fullContent: {
    epidemiologia: {
      prevalencia: '2-8% das gestações globalmente',
      incidencia: 'Brasil: ~75.000 casos/ano',
      mortalidade: 'Causa 10-15% das mortes maternas no Brasil',
      fatoresRisco: [
        'Primiparidade',
        'História prévia de PE (RR 8x)',
        'Idade >35 ou <18 anos',
        'Gestação múltipla',
        'HAS crônica',
        'Diabetes mellitus',
        'Doença renal crônica',
        'Doenças autoimunes (LES, SAF)',
        'Obesidade (IMC >30)',
        'Síndrome dos anticorpos antifosfolípides',
        'Intervalo interpartal >10 anos',
        'Reprodução assistida'
      ],
      citations: [{ refId: 'acog-gestational-hypertension-2020' }, { refId: 'rbehg-pre-eclampsia-2023' }]
    },

    fisiopatologia: {
      texto: 'A pré-eclâmpsia resulta de placentação defeituosa com invasão trofoblástica inadequada das artérias espiraladas, levando a isquemia placentária. A placenta isquêmica libera fatores antiangiogênicos (sFlt-1) e citocinas inflamatórias, causando disfunção endotelial sistêmica. Isso resulta em vasoconstrição, aumento da permeabilidade vascular, ativação da coagulação e lesão de múltiplos órgãos (rim, fígado, cérebro, sistema hematológico).',
      citations: [{ refId: 'acog-gestational-hypertension-2020' }]
    },

    quadroClinico: {
      sintomasPrincipais: [
        'Pode ser assintomática (achado em consulta de rotina)',
        'Cefaleia frontal/occipital intensa',
        'Escotomas cintilantes/amaurose',
        'Epigastralgia ou dor em barra no hipocôndrio direito',
        'Náuseas e vômitos',
        'Edema súbito de face e mãos',
        'Oligúria',
        'Convulsão tônico-clônica (eclâmpsia)'
      ],
      sinaisExameFisico: [
        'Hipertensão arterial (PA ≥140/90 mmHg)',
        'Edema de face, mãos e membros inferiores',
        'Hiperreflexia (sinal de iminência de eclâmpsia)',
        'Clônus',
        'Icterícia (se HELLP)',
        'Petéquias/equimoses (se plaquetopenia grave)'
      ],
      formasClinicas: [
        'Hipertensão gestacional: HAS sem proteinúria ou LOA',
        'Pré-eclâmpsia sem sinais de gravidade',
        'Pré-eclâmpsia com sinais de gravidade',
        'Eclâmpsia',
        'Síndrome HELLP: Hemolysis, Elevated Liver enzymes, Low Platelets'
      ],
      citations: [{ refId: 'rbehg-pre-eclampsia-2023' }]
    },

    diagnostico: {
      criterios: [
        'PA ≥140/90 mmHg em 2 medidas com intervalo de 4h, após 20 semanas',
        'Proteinúria: ≥300 mg/24h OU P/C ≥0,3 OU dipstick ≥1+',
        'Ou LOA sem proteinúria: plaquetas <100.000, Cr >1,1 mg/dL, TGO/TGP >2x LSN, edema pulmonar, sintomas cerebrais/visuais',
        'SINAIS DE GRAVIDADE: PA ≥160/110, plaquetas <100.000, TGO/TGP >2x, Cr >1,1, EAP, sintomas SNC'
      ],
      diagnosticoDiferencial: [
        'HAS crônica com PE sobreposta',
        'HAS crônica isolada',
        'Hipertensão de jaleco branco',
        'Púrpura trombocitopênica trombótica (PTT)',
        'Síndrome hemolítico-urêmica',
        'Esteatose hepática aguda da gravidez',
        'Feocromocitoma'
      ],
      examesLaboratoriais: [
        'Hemograma completo (hemólise, plaquetopenia)',
        'Esfregaço periférico (esquizócitos)',
        'Creatinina sérica',
        'Ácido úrico',
        'TGO, TGP, DHL, bilirrubinas',
        'Proteinúria 24h ou relação P/C',
        'Coagulograma (TP, TTPa, fibrinogênio)',
        'Haptoglobina (se disponível)'
      ],
      examesImagem: [
        'USG obstétrica: biometria, LA, Doppler',
        'Doppler de artérias uterinas',
        'Doppler umbilical e cerebral (se RCIU)',
        'TC de crânio (se suspeita de AVC/hemorragia)'
      ],
      outrosExames: [
        'Cardiotocografia',
        'Perfil biofísico fetal',
        'Avaliação oftalmológica (fundo de olho)'
      ],
      citations: [{ refId: 'acog-gestational-hypertension-2020' }, { refId: 'rbehg-pre-eclampsia-2023' }]
    },

    tratamento: {
      objetivos: [
        'Prevenção de convulsões (eclâmpsia)',
        'Controle pressórico sem hipotensão',
        'Prevenção de complicações (AVC, DPP, IRA)',
        'Otimização do momento do parto'
      ],
      naoFarmacologico: {
        medidas: [
          'Internação obrigatória',
          'Repouso em decúbito lateral esquerdo',
          'Dieta normossódica',
          'Monitorização de PA (6/6h ou contínua)',
          'Balanço hídrico (diurese >25mL/h)',
          'Vigilância de sinais de gravidade'
        ],
        citations: [{ refId: 'rbehg-pre-eclampsia-2023' }]
      },
      farmacologico: {
        primeiraLinha: [
          {
            classe: 'Anticonvulsivante (profilaxia/tratamento eclâmpsia)',
            medicamentos: ['Sulfato de Magnésio'],
            posologia: 'ZUSPAN: Ataque 4g IV em 20min + Manutenção 1-2g/h IV contínuo',
            observacoes: 'Monitorizar: reflexo patelar, FR ≥16, diurese ≥25mL/h. Antídoto: Gluconato de Cálcio 1g IV',
            gradeLevel: 'A'
          },
          {
            classe: 'Anti-hipertensivo (emergência)',
            medicamentos: ['Hidralazina IV', 'Nifedipina VO'],
            posologia: 'Hidralazina 5mg IV 20/20min (máx 20mg). Nifedipina 10mg VO 30/30min (máx 30mg)',
            observacoes: 'Meta: PA <160/110, evitar hipotensão',
            gradeLevel: 'A'
          }
        ],
        segundaLinha: [
          {
            classe: 'Anti-hipertensivo manutenção',
            medicamentos: ['Metildopa', 'Nifedipina retard', 'Labetalol'],
            posologia: 'Metildopa 250-500mg 8/8h. Nifedipina 20-60mg/dia. Labetalol 100-400mg 12/12h',
            observacoes: 'Para controle pressórico entre crises',
            gradeLevel: 'B'
          },
          {
            classe: 'Corticoide (maturação pulmonar)',
            medicamentos: ['Betametasona', 'Dexametasona'],
            posologia: 'Betametasona 12mg IM, 2 doses com 24h intervalo',
            observacoes: 'Se IG <34 semanas e parto previsto em 24h-7dias',
            gradeLevel: 'A'
          }
        ],
        situacoesEspeciais: [
          {
            situacao: 'Eclâmpsia',
            conduta: 'MgSO4 + controle PA + parto após estabilização (não necessariamente cesariana de emergência)'
          },
          {
            situacao: 'HELLP',
            conduta: 'MgSO4 + corticoide + parto em 24-48h. Considerar transfusão de plaquetas se <20.000 ou <50.000 com sangramento'
          },
          {
            situacao: 'PE <34 semanas sem sinais de gravidade',
            conduta: 'Conduta expectante com monitorização rigorosa. Corticoide e parto se deterioração'
          }
        ],
        citations: [{ refId: 'rbehg-pre-eclampsia-2023' }, { refId: 'magpie-trial-2002' }]
      },
      duracao: 'MgSO4 mantido por 24-48h após o parto ou última convulsão'
    },

    acompanhamento: {
      frequenciaConsultas: 'Internação até resolução. Pós-parto: reavaliação em 72h e 7-10 dias',
      examesControle: [
        'PA: contínua ou 6/6h',
        'Hemograma, plaquetas: 12/12h ou diário',
        'Função hepática: diário',
        'Função renal: diário',
        'Proteinúria: 24-48h',
        'CTG: contínua ou 6/6h'
      ],
      metasTerapeuticas: [
        'PA <160/110 mmHg',
        'Diurese >25 mL/h',
        'Ausência de sintomas de iminência de eclâmpsia',
        'Estabilização laboratorial'
      ],
      criteriosEncaminhamento: [
        'Toda PE deve ser manejada em hospital com capacidade de parto de emergência',
        'PE grave: UTI materna disponível',
        'Prematuridade <32 sem: UTI neonatal'
      ],
      citations: [{ refId: 'rbehg-pre-eclampsia-2023' }]
    },

    prevencao: {
      primaria: [
        'AAS 100-150mg/dia a partir de 12-16 semanas em gestantes de alto risco',
        'Cálcio 1-2g/dia se baixa ingesta',
        'Controle de peso e PA antes da gestação'
      ],
      secundaria: [
        'Identificação precoce de fatores de risco',
        'Doppler de artérias uterinas para predição',
        'Marcadores bioquímicos (PAPP-A, PlGF)',
        'Monitorização intensificada em gestantes de risco'
      ],
      citations: [{ refId: 'aspre-trial-2017' }, { refId: 'who-preeclampsia-2011' }]
    },

    populacoesEspeciais: {
      gestantes: 'Esta é uma doença específica da gestação. Após o parto, deve haver vigilância por 72h-7dias pela possibilidade de PE/eclâmpsia puerperal.'
    }
  },

  protocolos: ['emergencia-hipertensiva-gestacao', 'sulfato-magnesio', 'hellp-manejo'],
  medicamentos: ['sulfato-magnesio', 'hidralazina', 'nifedipina', 'metildopa', 'labetalol', 'betametasona'],
  calculadoras: ['criterios-hellp', 'risco-pre-eclampsia'],
  rastreamentos: ['pre-eclampsia-aas'],

  citations: [
    { refId: 'acog-gestational-hypertension-2020' },
    { refId: 'rbehg-pre-eclampsia-2023' },
    { refId: 'magpie-trial-2002' },
    { refId: 'aspre-trial-2017' },
    { refId: 'who-preeclampsia-2011' }
  ],

  lastUpdate: '2025-01-07',
  tags: ['pré-eclâmpsia', 'eclâmpsia', 'HELLP', 'hipertensão', 'gestação', 'emergência obstétrica']
};

// =============================================================================
// 4. HIPERTENSÃO ARTERIAL CRÔNICA NA GESTAÇÃO
// =============================================================================

export const hipertensaoCronicaGestacao: Doenca = {
  id: 'hipertensao-cronica-gestacao',
  titulo: 'Hipertensão Arterial Crônica na Gestação',
  sinonimos: ['HAS crônica na gravidez', 'hipertensão pré-existente'],

  ciap2: ['K86', 'K87', 'W81'],
  cid10: ['O10.0', 'O10.1', 'O10.2', 'O10.9', 'O11'],
  cid11: ['JA20', 'JA21'],
  snomedCT: '48194001',

  categoria: 'cardiovascular',
  subcategoria: 'hipertensão',

  quickView: {
    definicao: 'HAS diagnosticada antes da gestação ou antes de 20 semanas, ou que persiste além de 12 semanas pós-parto. Risco aumentado de pré-eclâmpsia sobreposta (17-25%).',
    criteriosDiagnosticos: [
      'PA ≥140/90 mmHg prévia à gestação',
      'PA ≥140/90 antes de 20 semanas de gestação',
      'HAS que persiste >12 semanas pós-parto',
      'Com PE sobreposta: proteinúria de novo ou piora + PA descontrolada + LOA'
    ],
    tratamentoPrimeiraLinha: {
      naoFarmacologico: [
        'Dieta com restrição de sódio moderada',
        'Atividade física leve-moderada',
        'Monitorização domiciliar da PA',
        'Cessar tabagismo e álcool'
      ],
      farmacologico: [
        'Metildopa 250-500mg 2-3x/dia (1ª escolha)',
        'Nifedipina retard 20-60mg/dia',
        'Labetalol 100-400mg 2-3x/dia',
        'SUSPENDER: IECA, BRA, diuréticos tiazídicos'
      ]
    },
    redFlags: [
      'Pré-eclâmpsia sobreposta',
      'PA ≥160/110 mmHg',
      'RCIU',
      'Descolamento de placenta',
      'Edema agudo de pulmão'
    ],
    metasTerapeuticas: [
      'PA <140/90 mmHg (alguns guidelines <135/85)',
      'Evitar hipotensão (PA <110/70 pode comprometer fluxo útero-placentário)'
    ]
  },

  fullContent: {
    epidemiologia: {
      prevalencia: '1-5% das gestações',
      fatoresRisco: [
        'Idade materna avançada',
        'Obesidade',
        'Diabetes mellitus',
        'Doença renal crônica',
        'Raça negra',
        'História familiar de HAS'
      ],
      citations: [{ refId: 'acog-gestational-hypertension-2020' }]
    },

    fisiopatologia: {
      texto: 'Na gestação normal, ocorre vasodilatação periférica e queda da PA no 2º trimestre, com retorno aos níveis pré-gestacionais no 3º trimestre. Gestantes com HAS crônica têm menor capacidade de vasodilatação e maior risco de lesão vascular, predispondo a pré-eclâmpsia sobreposta e complicações placentárias.',
      citations: [{ refId: 'acog-gestational-hypertension-2020' }]
    },

    quadroClinico: {
      sintomasPrincipais: [
        'Geralmente assintomática',
        'Cefaleia (se PA muito elevada)',
        'Palpitações',
        'Dispneia (se LOA cardíaca)'
      ],
      sinaisExameFisico: [
        'PA elevada',
        'Pode ter alterações em fundo de olho',
        'Sopro cardíaco (se HVE)',
        'Edema (inespecífico na gestação)'
      ],
      formasClinicas: [
        'HAS crônica leve-moderada (PA 140-159/90-109)',
        'HAS crônica grave (PA ≥160/110)',
        'HAS crônica com PE sobreposta'
      ],
      citations: [{ refId: 'acog-gestational-hypertension-2020' }]
    },

    diagnostico: {
      criterios: [
        'HAS conhecida prévia ou diagnosticada <20 semanas',
        'PA ≥140/90 em 2 medidas',
        'PE sobreposta: proteinúria de novo OU piora súbita de PA/labs em HAS previamente controlada'
      ],
      diagnosticoDiferencial: [
        'Pré-eclâmpsia',
        'Hipertensão gestacional',
        'Hipertensão de jaleco branco',
        'HAS secundária (feocromocitoma, estenose de artéria renal)'
      ],
      examesLaboratoriais: [
        'Hemograma',
        'Função renal (Cr, ureia)',
        'Eletrólitos',
        'Ácido úrico',
        'Proteinúria 24h ou P/C (basal)',
        'Função hepática',
        'ECG'
      ],
      examesImagem: [
        'Ecocardiograma (avaliar HVE, função)',
        'USG renal (se suspeita de HAS secundária)',
        'Doppler de artérias uterinas'
      ],
      citations: [{ refId: 'acog-gestational-hypertension-2020' }]
    },

    tratamento: {
      objetivos: [
        'Controle pressórico sem hipotensão',
        'Prevenção de pré-eclâmpsia sobreposta',
        'Vigilância de crescimento fetal'
      ],
      naoFarmacologico: {
        medidas: [
          'Restrição moderada de sódio',
          'Manutenção de peso adequado',
          'Atividade física leve',
          'MAPA ou monitorização domiciliar'
        ],
        citations: [{ refId: 'acog-gestational-hypertension-2020' }]
      },
      farmacologico: {
        primeiraLinha: [
          {
            classe: 'Anti-hipertensivo central',
            medicamentos: ['Metildopa'],
            posologia: '250-500mg 2-3x/dia (máx 3g/dia)',
            observacoes: 'Droga de escolha por longa experiência de segurança',
            gradeLevel: 'B'
          },
          {
            classe: 'Bloqueador de canal de cálcio',
            medicamentos: ['Nifedipina retard'],
            posologia: '20-60mg/dia em 1-2 doses',
            observacoes: 'Alternativa segura',
            gradeLevel: 'B'
          }
        ],
        segundaLinha: [
          {
            classe: 'Betabloqueador',
            medicamentos: ['Labetalol', 'Metoprolol'],
            posologia: 'Labetalol 100-400mg 2-3x/dia',
            observacoes: 'Labetalol tem ação alfa e beta. Evitar atenolol.',
            gradeLevel: 'B'
          }
        ],
        situacoesEspeciais: [
          {
            situacao: 'Uso prévio de IECA/BRA',
            conduta: 'SUSPENDER imediatamente ao confirmar gestação. Trocar por metildopa/nifedipina'
          },
          {
            situacao: 'HAS refratária',
            conduta: 'Associar 2-3 drogas. Investigar HAS secundária'
          }
        ],
        citations: [{ refId: 'acog-gestational-hypertension-2020' }]
      },
      duracao: 'Durante toda gestação. Reavaliar esquema no puerpério.'
    },

    acompanhamento: {
      frequenciaConsultas: 'Quinzenal até 28 sem, semanal até o parto',
      examesControle: [
        'PA em todas as consultas',
        'Proteinúria mensal ou P/C',
        'Função renal e hepática mensais',
        'USG mensal para crescimento',
        'Doppler a partir de 24-28 sem'
      ],
      metasTerapeuticas: [
        'PA <140/90 mmHg (alguns <135/85)',
        'Evitar PAS <110 e PAD <70'
      ],
      criteriosEncaminhamento: [
        'Todas as HAS crônicas devem ter pré-natal de alto risco',
        'PE sobreposta',
        'HAS de difícil controle'
      ],
      citations: [{ refId: 'acog-gestational-hypertension-2020' }]
    },

    prevencao: {
      primaria: [
        'Controle da PA antes da gestação',
        'Otimização de peso e dieta',
        'Trocar medicamentos teratogênicos antes de engravidar'
      ],
      secundaria: [
        'AAS 100-150mg/dia a partir de 12-16 semanas',
        'Cálcio 1-2g/dia se baixa ingesta',
        'Vigilância para PE sobreposta'
      ],
      citations: [{ refId: 'aspre-trial-2017' }]
    },

    populacoesEspeciais: {
      gestantes: 'Este é o foco do módulo. Risco de PE sobreposta: 17-25%.'
    }
  },

  protocolos: ['has-cronica-gestacao'],
  medicamentos: ['metildopa', 'nifedipina', 'labetalol'],
  calculadoras: [],
  rastreamentos: ['pre-eclampsia-sobreposta'],

  citations: [
    { refId: 'acog-gestational-hypertension-2020' },
    { refId: 'ms-gestacao-alto-risco-2022' }
  ],

  lastUpdate: '2025-01-07',
  tags: ['hipertensão', 'HAS crônica', 'gestação', 'pré-eclâmpsia sobreposta']
};

// =============================================================================
// 5. HIV NA GESTAÇÃO
// =============================================================================

export const hivGestacao: Doenca = {
  id: 'hiv-gestacao',
  titulo: 'HIV na Gestação',
  sinonimos: ['infecção pelo HIV na gravidez', 'gestante HIV positiva', 'transmissão vertical do HIV'],

  // Ontologias
  doid: 'DOID:526',
  snomedCT: '86406008',
  meshId: 'D015658',
  ciap2: ['B90', 'W78'],
  cid10: ['O98.7', 'B20', 'B24', 'Z21'],
  cid11: ['JB63.1', '1C62'],

  categoria: 'infecciosas',
  subcategoria: 'infecções na gestação',

  quickView: {
    definicao: 'Gestação em mulher vivendo com HIV requer manejo especializado para prevenção da transmissão vertical (PTV). Com TARV adequada, a taxa de TV pode ser reduzida de 25-30% para <2%.',
    criteriosDiagnosticos: [
      'Teste rápido HIV reagente + confirmação (2º teste rápido de metodologia diferente)',
      'ELISA/CLIA reagente + Western Blot ou Imunoblot confirmatório',
      'Carga viral HIV detectável (RNA)',
      'Toda gestante deve ser testada no 1º trimestre, 3º trimestre e no parto'
    ],
    tratamentoPrimeiraLinha: {
      naoFarmacologico: [
        'Acompanhamento multidisciplinar (obstetra + infectologista)',
        'Vinculação ao SAE (Serviço de Atenção Especializada)',
        'Aconselhamento sobre adesão ao tratamento',
        'Discussão sobre amamentação (contraindicada no Brasil)',
        'Testagem e orientação do parceiro'
      ],
      farmacologico: [
        'TARV de preferência: TDF + 3TC + DTG (Dolutegravir)',
        'Alternativa: TDF + 3TC + RAL (Raltegravir)',
        'AZT injetável no parto se CV desconhecida ou >1000 cópias/mL',
        'Profilaxia para RN: AZT xarope por 4 semanas (+ NVP se alto risco)'
      ]
    },
    redFlags: [
      'Carga viral >1000 cópias/mL próximo ao parto',
      'Diagnóstico tardio (3º trimestre ou parto)',
      'Coinfecção (HBV, HCV, sífilis, TB)',
      'Resistência a antirretrovirais',
      'Má adesão ao tratamento',
      'Ruptura prematura de membranas >4h'
    ],
    metasTerapeuticas: [
      'Carga viral indetectável (<50 cópias/mL) no 3º trimestre',
      'CD4 >500 células/mm³',
      'Parto vaginal se CV <1000 cópias/mL na 34ª semana',
      'RN não infectado'
    ],
    examesIniciais: [
      'Carga viral HIV (CV)',
      'Contagem de CD4/CD8',
      'Genotipagem (se viremia prévia ou falha)',
      'Hemograma completo',
      'Função renal e hepática',
      'VDRL, HBsAg, Anti-HCV',
      'Toxoplasmose, CMV',
      'PPD ou IGRA (TB)'
    ]
  },

  fullContent: {
    epidemiologia: {
      prevalencia: '~0,4% das gestantes brasileiras são HIV+',
      incidencia: 'Brasil: ~8.000 gestantes HIV+/ano',
      mortalidade: 'Taxa de TV com TARV adequada: <2%. Sem intervenção: 25-30%',
      fatoresRisco: [
        'Parceiro HIV+',
        'Uso de drogas injetáveis',
        'Múltiplos parceiros sexuais',
        'IST prévia',
        'Transfusão de sangue (histórico)',
        'Profissional do sexo'
      ],
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    fisiopatologia: {
      texto: 'A transmissão vertical do HIV pode ocorrer intraútero (especialmente no 3º trimestre), intraparto (principal momento) ou pós-parto (amamentação). A carga viral materna é o principal determinante do risco de TV. A TARV reduz a replicação viral, diminuindo a viremia e o risco de transmissão. O AZT atravessa a barreira placentária e protege o feto durante a exposição ao vírus no canal de parto.',
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    quadroClinico: {
      sintomasPrincipais: [
        'Maioria assintomática',
        'Síndrome retroviral aguda: febre, adenopatia, rash, fadiga (infecção recente)',
        'Manifestações de AIDS: infecções oportunistas, emagrecimento'
      ],
      sinaisExameFisico: [
        'Pode ser normal',
        'Linfadenopatia generalizada',
        'Candidíase oral',
        'Lesões de herpes',
        'Hepatoesplenomegalia'
      ],
      formasClinicas: [
        'Infecção aguda/primária',
        'Infecção crônica assintomática',
        'AIDS (CD4 <200 ou doença definidora)'
      ],
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    diagnostico: {
      criterios: [
        'Teste rápido (TR1) reagente + TR2 (metodologia diferente) reagente',
        'ELISA/CLIA reagente + teste confirmatório (WB, IB, carga viral)',
        'Carga viral HIV detectável em 2 amostras'
      ],
      diagnosticoDiferencial: [
        'Outras causas de linfadenopatia',
        'Síndrome mononucleose-like',
        'Outras imunodeficiências'
      ],
      examesLaboratoriais: [
        'Teste rápido HIV (triagem)',
        'ELISA/CLIA + Western Blot (confirmação)',
        'Carga viral HIV RNA',
        'Contagem de CD4/CD8',
        'Genotipagem HIV',
        'Hemograma, função renal e hepática',
        'Sorologias: VDRL, HBsAg, Anti-HBs, Anti-HCV, toxoplasmose, CMV, rubéola',
        'PPD ou IGRA',
        'Citologia oncótica'
      ],
      examesImagem: [
        'Radiografia de tórax (se suspeita de TB)',
        'USG obstétrica seriada'
      ],
      outrosExames: [
        'Teste de resistência (genotipagem) se carga viral detectável em uso de TARV'
      ],
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    tratamento: {
      objetivos: [
        'Carga viral indetectável',
        'Prevenção da transmissão vertical',
        'Preservação da saúde materna',
        'Parto seguro'
      ],
      naoFarmacologico: {
        medidas: [
          'Acompanhamento conjunto obstetrícia + infectologia',
          'Avaliação nutricional',
          'Suporte psicossocial',
          'Orientação sobre contraindicação à amamentação',
          'Discussão sobre via de parto',
          'Testagem e tratamento do parceiro'
        ],
        citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
      },
      farmacologico: {
        primeiraLinha: [
          {
            classe: 'TARV preferencial',
            medicamentos: ['Tenofovir (TDF) 300mg + Lamivudina (3TC) 300mg + Dolutegravir (DTG) 50mg'],
            posologia: '1 comprimido combinado 1x/dia',
            observacoes: 'DTG é seguro em qualquer IG. Iniciar TARV o mais precoce possível.',
            gradeLevel: 'A'
          }
        ],
        segundaLinha: [
          {
            classe: 'TARV alternativa',
            medicamentos: ['TDF 300mg + 3TC 300mg + Raltegravir (RAL) 400mg'],
            posologia: 'TDF/3TC 1x/dia + RAL 12/12h',
            observacoes: 'Se intolerância ou interação com DTG',
            gradeLevel: 'A'
          }
        ],
        situacoesEspeciais: [
          {
            situacao: 'Parto com CV desconhecida ou >1000 cópias/mL',
            conduta: 'AZT IV 2mg/kg na 1ª hora + 1mg/kg/h até clampeamento do cordão'
          },
          {
            situacao: 'Parto com CV indetectável ou <1000 cópias/mL',
            conduta: 'Manter TARV VO. AZT IV não é necessário.'
          },
          {
            situacao: 'Profilaxia do RN - risco baixo',
            conduta: 'AZT xarope 4mg/kg 12/12h por 4 semanas'
          },
          {
            situacao: 'Profilaxia do RN - alto risco',
            conduta: 'AZT + 3TC + NVP ou RAL por 4-6 semanas'
          },
          {
            situacao: 'Diagnóstico no parto ou puerpério',
            conduta: 'Iniciar TARV imediatamente. RN recebe esquema de alto risco.'
          }
        ],
        citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
      },
      duracao: 'TARV contínua (para toda a vida)'
    },

    acompanhamento: {
      frequenciaConsultas: 'Mensal até 28 sem, quinzenal até 36 sem, semanal até parto',
      examesControle: [
        'Carga viral: ao diagnóstico, 2-4 sem após início/troca, depois trimestral, e na 34ª sem',
        'CD4: ao diagnóstico e a cada 6 meses se <350',
        'Função renal e hepática: trimestral',
        'VDRL: trimestral',
        'Hemograma: trimestral'
      ],
      metasTerapeuticas: [
        'CV indetectável (<50 cópias/mL)',
        'CD4 >500 células/mm³',
        'Adesão >95%'
      ],
      criteriosEncaminhamento: [
        'Todas as gestantes HIV+ devem ser acompanhadas em serviço de referência',
        'SAE (Serviço de Atenção Especializada)',
        'Alto risco obstétrico'
      ],
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    prevencao: {
      primaria: [
        'Testagem universal de gestantes',
        'PrEP para gestantes HIV- com parceiro HIV+',
        'Uso de preservativo',
        'Testagem e tratamento do parceiro'
      ],
      secundaria: [
        'Início precoce da TARV',
        'Adesão rigorosa ao tratamento',
        'Via de parto adequada',
        'Profilaxia do RN',
        'Contraindicação à amamentação (no Brasil)'
      ],
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    populacoesEspeciais: {
      gestantes: 'Este é o foco do módulo. A amamentação é contraindicada no Brasil para mulheres HIV+.'
    }
  },

  protocolos: ['ptv-hiv', 'tarv-gestacao'],
  medicamentos: ['tenofovir', 'lamivudina', 'dolutegravir', 'raltegravir', 'zidovudina'],
  calculadoras: [],
  rastreamentos: ['hiv-gestacao'],

  citations: [
    { refId: 'ms-pcdt-transmissao-vertical-2022' }
  ],

  lastUpdate: '2025-01-07',
  tags: ['HIV', 'gestação', 'transmissão vertical', 'TARV', 'prevenção', 'infectologia']
};

// =============================================================================
// 6. SÍFILIS NA GESTAÇÃO
// =============================================================================

export const sifilisGestacao: Doenca = {
  id: 'sifilis-gestacao',
  titulo: 'Sífilis na Gestação',
  sinonimos: ['sífilis gestacional', 'lues na gravidez', 'sífilis materna'],

  // Ontologias
  doid: 'DOID:4166',
  snomedCT: '76272004',
  meshId: 'D013587',
  ciap2: ['W70', 'X70'],
  cid10: ['O98.1', 'A50', 'A51', 'A52', 'A53'],
  cid11: ['JB60', '1A60', '1A61', '1A62'],

  categoria: 'infecciosas',
  subcategoria: 'infecções na gestação',

  quickView: {
    definicao: 'Infecção por Treponema pallidum durante a gestação. Pode causar sífilis congênita (SC) com graves sequelas fetais/neonatais. É agravo de notificação compulsória.',
    criteriosDiagnosticos: [
      'Teste treponêmico (TR) reagente + teste não treponêmico (VDRL/RPR) reagente',
      'Ou: TR reagente + história clínica compatível',
      'Classificação: primária (cancro), secundária (rash, condiloma), latente recente (<1 ano), latente tardia (>1 ano), terciária'
    ],
    tratamentoPrimeiraLinha: {
      naoFarmacologico: [
        'Notificação compulsória',
        'Tratamento do parceiro sexual (obrigatório)',
        'Orientação sobre retestagem',
        'Avaliação de outras IST'
      ],
      farmacologico: [
        'Sífilis recente (primária, secundária, latente recente): Penicilina Benzatina 2,4 milhões UI IM dose única',
        'Sífilis tardia (latente tardia, duração desconhecida, terciária): Penicilina Benzatina 2,4 milhões UI IM semanal por 3 semanas',
        'Neurossífilis: Penicilina Cristalina 3-4 milhões UI IV 4/4h por 14 dias'
      ]
    },
    redFlags: [
      'Alergia a penicilina (requer dessensibilização)',
      'Neurossífilis',
      'Tratamento incompleto ou inadequado',
      'Parceiro não tratado',
      'Reinfecção (elevação de ≥2 diluições no VDRL)',
      'Sífilis terciária com lesão cardiovascular ou goma'
    ],
    metasTerapeuticas: [
      'Queda de 2 diluições no VDRL em 3-6 meses (resposta adequada)',
      'VDRL negativo ou cicatriz sorológica (título baixo estável)',
      'Parceiro tratado',
      'RN sem sífilis congênita'
    ],
    examesIniciais: [
      'Teste rápido treponêmico',
      'VDRL ou RPR quantitativo',
      'Punção lombar se suspeita de neurossífilis',
      'HIV (sempre pesquisar coinfecção)',
      'Sorologias para HBV, HCV'
    ]
  },

  fullContent: {
    epidemiologia: {
      prevalencia: 'Brasil: ~1,5% das gestantes com sífilis (2022)',
      incidencia: '~100.000 casos de sífilis gestacional/ano no Brasil',
      mortalidade: 'Sífilis congênita: ~40% dos casos não tratados resultam em óbito fetal ou neonatal',
      fatoresRisco: [
        'Múltiplos parceiros sexuais',
        'Parceiro com IST',
        'Uso de drogas',
        'Idade jovem',
        'Baixa escolaridade',
        'Ausência de pré-natal'
      ],
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    fisiopatologia: {
      texto: 'O Treponema pallidum atravessa a barreira placentária em qualquer momento da gestação, mas a transmissão vertical é mais frequente após a 16ª semana. A bacteremia materna permite a disseminação transplacentária, causando placentite e infecção fetal. A gravidade depende da carga bacteriana (maior na sífilis recente) e do momento da infecção. Pode causar abortamento, óbito fetal, prematuridade, RCIU, hidropsia fetal e múltiplas malformações.',
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    quadroClinico: {
      sintomasPrincipais: [
        'Sífilis primária: cancro duro (úlcera indolor)',
        'Sífilis secundária: rash maculopapular palmoplantar, condiloma plano, alopecia',
        'Sífilis latente: assintomática',
        'Sífilis terciária: gomas, aortite, tabes dorsalis'
      ],
      sinaisExameFisico: [
        'Cancro duro: úlcera única, indolor, base endurecida',
        'Rash cutâneo difuso (secundária)',
        'Linfadenopatia',
        'Condiloma plano (lesões verrucosas anogenitais)',
        'Placas mucosas',
        'Alopecia em clareira'
      ],
      formasClinicas: [
        'Sífilis primária: cancro duro',
        'Sífilis secundária: manifestações sistêmicas',
        'Sífilis latente recente: <1 ano, assintomática',
        'Sífilis latente tardia: >1 ano ou duração desconhecida',
        'Sífilis terciária: cardiovascular, neurológica, gomatosa'
      ],
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    diagnostico: {
      criterios: [
        'Teste treponêmico (TR, FTA-Abs, TPHA) + teste não treponêmico (VDRL/RPR) AMBOS reagentes',
        'OU TR reagente + quadro clínico compatível',
        'Obs: TR isolado pode indicar cicatriz sorológica (sífilis tratada)',
        'VDRL quantitativo para monitorar resposta ao tratamento'
      ],
      diagnosticoDiferencial: [
        'Cancroide (Haemophilus ducreyi)',
        'Herpes genital',
        'Linfogranuloma venéreo',
        'Ptiríase rósea (secundária)',
        'Farmacodermia'
      ],
      examesLaboratoriais: [
        'Teste rápido treponêmico (triagem)',
        'VDRL/RPR quantitativo',
        'FTA-Abs ou TPHA (confirmatório)',
        'LCR se neurossífilis (VDRL no líquor, celularidade, proteínas)',
        'HIV (sempre)',
        'Sorologias para HBV, HCV'
      ],
      examesImagem: [
        'USG obstétrica: avaliar sinais de infecção congênita',
        'Sinais sugestivos: hepatomegalia, esplenomegalia, ascite, hidropsia, RCIU, placentomegalia'
      ],
      outrosExames: [
        'Rx de ossos longos do RN (se suspeita de SC)'
      ],
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    tratamento: {
      objetivos: [
        'Erradicação do T. pallidum',
        'Prevenção da transmissão vertical',
        'Tratamento do parceiro',
        'RN sem sífilis congênita'
      ],
      naoFarmacologico: {
        medidas: [
          'Notificação compulsória obrigatória',
          'Tratamento do(s) parceiro(s) sexual(is)',
          'Abstinência sexual ou uso de preservativo durante tratamento',
          'Orientação sobre importância do tratamento completo'
        ],
        citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
      },
      farmacologico: {
        primeiraLinha: [
          {
            classe: 'Penicilina benzatina - Sífilis recente',
            medicamentos: ['Penicilina G Benzatina 2.400.000 UI'],
            posologia: 'Dose única IM (1.200.000 UI em cada glúteo)',
            observacoes: 'Sífilis primária, secundária ou latente recente (<1 ano)',
            gradeLevel: 'A'
          },
          {
            classe: 'Penicilina benzatina - Sífilis tardia',
            medicamentos: ['Penicilina G Benzatina 2.400.000 UI'],
            posologia: '2.400.000 UI IM semanalmente por 3 semanas (total 7.200.000 UI)',
            observacoes: 'Sífilis latente tardia, duração indeterminada ou terciária',
            gradeLevel: 'A'
          }
        ],
        segundaLinha: [
          {
            classe: 'Ceftriaxona',
            medicamentos: ['Ceftriaxona 1g'],
            posologia: '1g IM ou IV 1x/dia por 10-14 dias',
            observacoes: 'Alternativa se impossibilidade de usar penicilina. Eficácia menor para PTV.',
            gradeLevel: 'C'
          }
        ],
        situacoesEspeciais: [
          {
            situacao: 'Alergia a penicilina',
            conduta: 'Dessensibilização em ambiente hospitalar e uso de penicilina. É a ÚNICA opção segura para gestantes.'
          },
          {
            situacao: 'Neurossífilis',
            conduta: 'Penicilina Cristalina 3-4 milhões UI IV 4/4h ou Penicilina Procaína 2,4 mi UI IM + Probenecida 500mg VO 6/6h por 14 dias'
          },
          {
            situacao: 'Reinfecção (VDRL com aumento ≥2 diluições)',
            conduta: 'Novo tratamento completo. Notificar novamente. Investigar e tratar parceiro.'
          },
          {
            situacao: 'Tratamento inadequado',
            conduta: 'RN deve ser tratado para SC presumida independente de exames'
          }
        ],
        citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
      },
      duracao: 'Tratamento único ou 3 semanas conforme estadiamento'
    },

    acompanhamento: {
      frequenciaConsultas: 'Mensal para monitoramento sorológico',
      examesControle: [
        'VDRL mensal durante gestação',
        'VDRL no momento do parto',
        'VDRL 3, 6, 9, 12 e 18 meses pós-tratamento',
        'Resposta adequada: queda ≥2 diluições em 3-6 meses'
      ],
      metasTerapeuticas: [
        'Queda de ≥2 diluições (4x) do título de VDRL em 3-6 meses',
        'VDRL negativo ou cicatriz sorológica (título baixo estável ≤1:4)',
        'Tratamento do parceiro documentado',
        'Tratamento completado ≥30 dias antes do parto'
      ],
      criteriosEncaminhamento: [
        'Neurossífilis',
        'Alergia a penicilina (para dessensibilização)',
        'Sífilis cardiovascular',
        'Falha terapêutica'
      ],
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    prevencao: {
      primaria: [
        'Testagem universal no pré-natal (1º, 3º trimestre e parto)',
        'Uso de preservativo',
        'Educação em saúde',
        'Testagem de parceiros'
      ],
      secundaria: [
        'Diagnóstico precoce',
        'Tratamento adequado e oportuno',
        'Tratamento do parceiro',
        'Monitoramento sorológico rigoroso'
      ],
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    populacoesEspeciais: {
      gestantes: 'Este é o foco do módulo. A penicilina é a ÚNICA droga eficaz para PTV.'
    }
  },

  protocolos: ['sifilis-gestacao-tratamento', 'ptv-sifilis'],
  medicamentos: ['penicilina-benzatina', 'penicilina-cristalina', 'ceftriaxona'],
  calculadoras: [],
  rastreamentos: ['sifilis-gestacao'],

  citations: [
    { refId: 'ms-pcdt-transmissao-vertical-2022' }
  ],

  lastUpdate: '2025-01-07',
  tags: ['sífilis', 'gestação', 'transmissão vertical', 'penicilina', 'IST', 'infectologia']
};

// =============================================================================
// 7. HIPOTIREOIDISMO NA GESTAÇÃO
// =============================================================================

export const hipotireoidismoGestacao: Doenca = {
  id: 'hipotireoidismo-gestacao',
  titulo: 'Hipotireoidismo na Gestação',
  sinonimos: ['hipotireoidismo gestacional', 'tireoidite de Hashimoto na gravidez'],

  ciap2: ['T86', 'W78'],
  cid10: ['O99.2', 'E03'],
  cid11: ['5A00', 'JB0A'],
  snomedCT: '40930008',

  categoria: 'endocrino',
  subcategoria: 'tireoide',

  quickView: {
    definicao: 'Deficiência de hormônios tireoidianos durante a gestação. Pode ser clínico (TSH elevado + T4L baixo) ou subclínico (TSH elevado + T4L normal). Associado a complicações obstétricas e neurodesenvolvimento fetal.',
    criteriosDiagnosticos: [
      'TSH elevado para IG (>4 mUI/L ou >percentil específico do trimestre)',
      'T4L baixo = hipotireoidismo clínico',
      'T4L normal + TSH elevado = hipotireoidismo subclínico',
      'Metas de TSH: 1º tri <2,5 mUI/L; 2º-3º tri <3,0 mUI/L'
    ],
    tratamentoPrimeiraLinha: {
      naoFarmacologico: [
        'Orientação sobre importância da adesão ao tratamento',
        'Evitar ingestão concomitante de cálcio, ferro, fibras (reduzem absorção)',
        'Tomar levotiroxina em jejum, 30-60min antes do café'
      ],
      farmacologico: [
        'Levotiroxina: dose inicial conforme TSH e IG',
        'TSH 2,5-5: iniciar 25-50 mcg/dia',
        'TSH 5-10: iniciar 50-75 mcg/dia',
        'TSH >10: iniciar 75-100 mcg/dia',
        'Já em uso: aumentar dose em 25-30% ao confirmar gestação'
      ]
    },
    redFlags: [
      'TSH >10 mUI/L',
      'Hipotireoidismo clínico não tratado',
      'Cretinismo endêmico (áreas com deficiência de iodo)',
      'Mixedema',
      'RCIU',
      'Complicações obstétricas de repetição'
    ],
    metasTerapeuticas: [
      'TSH <2,5 mUI/L no 1º trimestre',
      'TSH <3,0 mUI/L no 2º-3º trimestre',
      'T4L no limite superior da normalidade'
    ]
  },

  fullContent: {
    epidemiologia: {
      prevalencia: 'Hipotireoidismo clínico: 0,3-0,5%. Subclínico: 2-3%',
      fatoresRisco: [
        'Doença tireoidiana prévia',
        'Anticorpos anti-TPO positivos',
        'DM tipo 1 ou outras doenças autoimunes',
        'História de irradiação cervical',
        'Uso de amiodarona ou lítio',
        'Área com deficiência de iodo',
        'Abortamentos de repetição'
      ],
      citations: [{ refId: 'febrasgo-hipotireoidismo-2022' }, { refId: 'acog-thyroid-2020' }]
    },

    fisiopatologia: {
      texto: 'Na gestação, há aumento da TBG por estímulo estrogênico, levando a maior necessidade de T4 total. A hCG tem atividade TSH-like, reduzindo TSH fisiologicamente no 1º trimestre. O feto depende do T4 materno até 12-14 semanas (início da função tireoidiana fetal). A deficiência de hormônios tireoidianos neste período pode comprometer o neurodesenvolvimento fetal.',
      citations: [{ refId: 'febrasgo-hipotireoidismo-2022' }]
    },

    quadroClinico: {
      sintomasPrincipais: [
        'Fadiga (confunde com sintomas da gestação)',
        'Intolerância ao frio',
        'Constipação',
        'Ganho de peso excessivo',
        'Pele seca',
        'Sonolência',
        'Bradicardia'
      ],
      sinaisExameFisico: [
        'Bócio (aumento da tireoide)',
        'Bradicardia',
        'Pele seca e fria',
        'Edema periorbitário',
        'Fase de relaxamento lentificada dos reflexos',
        'Mixedema (casos graves)'
      ],
      formasClinicas: [
        'Hipotireoidismo clínico (manifesto)',
        'Hipotireoidismo subclínico',
        'Hipotireoidismo central (raro)',
        'Tireoidite de Hashimoto'
      ],
      citations: [{ refId: 'febrasgo-hipotireoidismo-2022' }]
    },

    diagnostico: {
      criterios: [
        'TSH elevado para valores de referência gestacionais',
        'Hipotireoidismo clínico: TSH elevado + T4L baixo',
        'Hipotireoidismo subclínico: TSH elevado (até 10) + T4L normal',
        'Anti-TPO: avalia risco de progressão e identifica tireoidite autoimune'
      ],
      diagnosticoDiferencial: [
        'Sintomas fisiológicos da gestação',
        'Síndrome do eutireoideo doente',
        'Hipotireoidismo central',
        'Interferência de biotina em exames'
      ],
      examesLaboratoriais: [
        'TSH (principal)',
        'T4 livre',
        'Anti-TPO (anticorpo)',
        'T3 (raramente necessário)'
      ],
      examesImagem: [
        'USG de tireoide (se bócio ou nódulos palpáveis)'
      ],
      citations: [{ refId: 'febrasgo-hipotireoidismo-2022' }, { refId: 'acog-thyroid-2020' }]
    },

    tratamento: {
      objetivos: [
        'Normalizar TSH para valores gestacionais',
        'Manter T4L no limite superior da normalidade',
        'Prevenir complicações obstétricas e fetais'
      ],
      naoFarmacologico: {
        medidas: [
          'Tomar levotiroxina em jejum, 30-60min antes do café',
          'Evitar ingestão simultânea de cálcio, ferro, antiácidos',
          'Garantir aporte adequado de iodo (250 mcg/dia)'
        ],
        citations: [{ refId: 'febrasgo-hipotireoidismo-2022' }]
      },
      farmacologico: {
        primeiraLinha: [
          {
            classe: 'Reposição de hormônio tireoidiano',
            medicamentos: ['Levotiroxina (T4)'],
            posologia: 'Dose inicial conforme TSH: 25-100 mcg/dia. Ajustar a cada 4 semanas.',
            observacoes: 'Aumentar dose em 25-30% se já em uso antes da gestação',
            gradeLevel: 'A'
          }
        ],
        segundaLinha: [],
        situacoesEspeciais: [
          {
            situacao: 'Hipotireoidismo subclínico com TSH 2,5-10 e anti-TPO negativo',
            conduta: 'Tratamento controverso. Considerar tratar se TSH >4 ou história de abortamento.'
          },
          {
            situacao: 'Hipotireoidismo subclínico com anti-TPO positivo',
            conduta: 'Tratar com levotiroxina'
          },
          {
            situacao: 'Hipotiroxinemia isolada (T4L baixo com TSH normal)',
            conduta: 'Não há evidência de benefício do tratamento'
          }
        ],
        citations: [{ refId: 'febrasgo-hipotireoidismo-2022' }, { refId: 'acog-thyroid-2020' }]
      },
      duracao: 'Durante toda a gestação e reavaliação no pós-parto'
    },

    acompanhamento: {
      frequenciaConsultas: 'A cada 4 semanas até 20 sem, depois a cada 6-8 semanas',
      examesControle: [
        'TSH a cada 4 semanas até 20 semanas',
        'TSH a cada 6-8 semanas após estabilização',
        'TSH 6-8 semanas pós-parto'
      ],
      metasTerapeuticas: [
        '1º trimestre: TSH <2,5 mUI/L',
        '2º-3º trimestre: TSH <3,0 mUI/L',
        'T4L no limite superior da normalidade'
      ],
      criteriosEncaminhamento: [
        'Hipotireoidismo central',
        'Nódulo tireoidiano suspeito',
        'TSH muito elevado (>10) ao diagnóstico',
        'Dificuldade de controle'
      ],
      citations: [{ refId: 'febrasgo-hipotireoidismo-2022' }]
    },

    prevencao: {
      primaria: [
        'Rastreamento de função tireoidiana no início da gestação em grupos de risco',
        'Suplementação de iodo se área deficiente'
      ],
      secundaria: [
        'Ajuste precoce de dose em mulheres já em tratamento',
        'Monitoramento frequente'
      ],
      citations: [{ refId: 'febrasgo-hipotireoidismo-2022' }]
    },

    populacoesEspeciais: {
      gestantes: 'A necessidade de levotiroxina aumenta 25-50% na gestação.'
    }
  },

  protocolos: ['hipotireoidismo-gestacao'],
  medicamentos: ['levotiroxina'],
  calculadoras: [],
  rastreamentos: ['funcao-tireoidiana-gestacao'],

  citations: [
    { refId: 'febrasgo-hipotireoidismo-2022' },
    { refId: 'acog-thyroid-2020' }
  ],

  lastUpdate: '2025-01-07',
  tags: ['hipotireoidismo', 'tireoide', 'gestação', 'levotiroxina', 'TSH']
};

// =============================================================================
// 8. HIPERTIREOIDISMO NA GESTAÇÃO
// =============================================================================

export const hipertireoidismoGestacao: Doenca = {
  id: 'hipertireoidismo-gestacao',
  titulo: 'Hipertireoidismo na Gestação',
  sinonimos: ['tireotoxicose gestacional', 'doença de Graves na gravidez', 'bócio tóxico difuso'],

  ciap2: ['T85', 'W78'],
  cid10: ['O99.2', 'E05'],
  cid11: ['5A01', 'JB0A'],
  snomedCT: '34486009',

  categoria: 'endocrino',
  subcategoria: 'tireoide',

  quickView: {
    definicao: 'Excesso de hormônios tireoidianos na gestação. Principal causa: doença de Graves. Distinguir de tireotoxicose gestacional transitória (hCG-mediada). Pode causar complicações maternas e fetais graves.',
    criteriosDiagnosticos: [
      'TSH suprimido (<0,1 mUI/L) + T4L elevado',
      'Doença de Graves: TRAb positivo + bócio difuso + exoftalmia',
      'Tireotoxicose gestacional: TSH baixo + T4L levemente elevado + hCG alto + sem TRAb',
      'Crise tireotóxica: emergência (febre, taquicardia >140, ICC, alteração neurológica)'
    ],
    tratamentoPrimeiraLinha: {
      naoFarmacologico: [
        'Repouso relativo',
        'Hidratação adequada',
        'Evitar estresse',
        'Monitorar ganho de peso e frequência cardíaca fetal'
      ],
      farmacologico: [
        'PTU (Propiltiouracil): preferido até 16 semanas (150-300 mg/dia 8/8h)',
        'Metimazol: preferido após 16 semanas (10-20 mg/dia)',
        'Propranolol: se sintomas adrenérgicos intensos (20-40 mg 8/8h)',
        'Crise tireotóxica: PTU + iodo + corticoide + betabloqueador'
      ]
    },
    redFlags: [
      'Crise tireotóxica (tempestade tireoidiana)',
      'Insuficiência cardíaca',
      'Arritmias',
      'Pré-eclâmpsia',
      'TRAb >3x LSN (risco de hipertireoidismo fetal/neonatal)',
      'RCIU'
    ],
    metasTerapeuticas: [
      'T4L no limite superior da normalidade ou levemente elevado',
      'Menor dose de antitireoidiano possível',
      'TSH pode permanecer suprimido (não usar como meta principal)',
      'Evitar hipotireoidismo iatrogênico'
    ]
  },

  fullContent: {
    epidemiologia: {
      prevalencia: 'Hipertireoidismo clínico: 0,1-0,4%. Tireotoxicose gestacional: 1-3%',
      fatoresRisco: [
        'Doença de Graves prévia',
        'Hiperemese gravídica (associação com tireotoxicose gestacional)',
        'Gestação molar',
        'História familiar de doença tireoidiana autoimune'
      ],
      citations: [{ refId: 'febrasgo-hipertireoidismo-2022' }, { refId: 'acog-thyroid-2020' }]
    },

    fisiopatologia: {
      texto: 'A hCG tem homologia estrutural com TSH e pode estimular o receptor de TSH, causando tireotoxicose gestacional transitória (pico na 10-12ª semana). Na doença de Graves, anticorpos TRAb estimulam diretamente a tireoide. TRAb atravessa a placenta e pode causar hipertireoidismo fetal/neonatal. Antitireoidianos também atravessam a placenta e podem causar hipotireoidismo fetal se dose excessiva.',
      citations: [{ refId: 'febrasgo-hipertireoidismo-2022' }]
    },

    quadroClinico: {
      sintomasPrincipais: [
        'Taquicardia (>100 bpm)',
        'Tremor fino',
        'Intolerância ao calor',
        'Perda de peso apesar de apetite aumentado',
        'Ansiedade, irritabilidade',
        'Diarreia',
        'Palpitações'
      ],
      sinaisExameFisico: [
        'Bócio difuso',
        'Exoftalmia (Graves)',
        'Taquicardia',
        'Pele quente e úmida',
        'Tremor fino de extremidades',
        'Hiperreflexia',
        'Mixedema pré-tibial (Graves)'
      ],
      formasClinicas: [
        'Doença de Graves (principal)',
        'Tireotoxicose gestacional transitória',
        'Bócio multinodular tóxico',
        'Adenoma tóxico',
        'Tireoidite subaguda'
      ],
      citations: [{ refId: 'febrasgo-hipertireoidismo-2022' }]
    },

    diagnostico: {
      criterios: [
        'TSH suprimido + T4L elevado',
        'Doença de Graves: TRAb positivo',
        'Tireotoxicose gestacional: TSH baixo + T4L levemente elevado + TRAb negativo + melhora espontânea até 16-20 sem'
      ],
      diagnosticoDiferencial: [
        'Tireotoxicose gestacional transitória',
        'Doença de Graves',
        'Bócio multinodular tóxico',
        'Tireoidite pós-parto (puerpério)',
        'Tireoidite subaguda'
      ],
      examesLaboratoriais: [
        'TSH',
        'T4 livre',
        'T3 (se T4L normal e suspeita alta)',
        'TRAb (diferencia Graves de tireotoxicose gestacional)',
        'Anti-TPO'
      ],
      examesImagem: [
        'USG de tireoide (se nódulos palpáveis)',
        'Cintilografia CONTRAINDICADA na gestação'
      ],
      citations: [{ refId: 'febrasgo-hipertireoidismo-2022' }, { refId: 'acog-thyroid-2020' }]
    },

    tratamento: {
      objetivos: [
        'Controlar sintomas com menor dose possível',
        'Manter T4L no limite superior da normalidade',
        'Evitar hipotireoidismo fetal',
        'Monitorar risco de hipertireoidismo fetal (TRAb)'
      ],
      naoFarmacologico: {
        medidas: [
          'Repouso',
          'Hidratação',
          'Dieta rica em calorias',
          'Evitar iodo em excesso'
        ],
        citations: [{ refId: 'febrasgo-hipertireoidismo-2022' }]
      },
      farmacologico: {
        primeiraLinha: [
          {
            classe: 'Antitireoidiano - 1º trimestre',
            medicamentos: ['Propiltiouracil (PTU)'],
            posologia: '50-150 mg 8/8h (máx 600 mg/dia)',
            observacoes: 'Preferido até 16 semanas (metimazol associado a defeitos congênitos no 1º tri)',
            gradeLevel: 'B'
          },
          {
            classe: 'Antitireoidiano - 2º e 3º trimestre',
            medicamentos: ['Metimazol (MMZ)'],
            posologia: '5-20 mg/dia em dose única ou dividida',
            observacoes: 'Preferido após 16 semanas. Trocar de PTU para MMZ.',
            gradeLevel: 'B'
          }
        ],
        segundaLinha: [
          {
            classe: 'Betabloqueador',
            medicamentos: ['Propranolol'],
            posologia: '20-40 mg 8/8h',
            observacoes: 'Para controle de sintomas adrenérgicos. Usar menor dose e menor tempo possível.',
            gradeLevel: 'C'
          }
        ],
        situacoesEspeciais: [
          {
            situacao: 'Tireotoxicose gestacional transitória',
            conduta: 'Geralmente não requer tratamento. Suporte hidratação. Melhora espontânea.'
          },
          {
            situacao: 'Crise tireotóxica',
            conduta: 'PTU dose alta + Iodeto + Dexametasona 2mg 6/6h + Propranolol + Suporte em UTI'
          },
          {
            situacao: 'TRAb >3x LSN no 3º trimestre',
            conduta: 'Risco de hipertireoidismo fetal/neonatal. Monitorar FC fetal, bócio fetal. RN precisa de acompanhamento.'
          }
        ],
        citations: [{ refId: 'febrasgo-hipertireoidismo-2022' }, { refId: 'acog-thyroid-2020' }]
      },
      duracao: 'Durante toda gestação. Muitas pacientes com Graves melhoram no 2º-3º trimestre.'
    },

    acompanhamento: {
      frequenciaConsultas: 'A cada 2-4 semanas até controle, depois a cada 4-6 semanas',
      examesControle: [
        'T4L a cada 2-4 semanas (principal parâmetro)',
        'TSH pode demorar a normalizar',
        'TRAb no 3º trimestre se Graves (prediz risco neonatal)',
        'USG fetal: avaliar FC, bócio, crescimento'
      ],
      metasTerapeuticas: [
        'T4L no limite superior da normalidade',
        'Menor dose de antitireoidiano',
        'Resolução dos sintomas',
        'FC fetal normal (110-160 bpm)'
      ],
      criteriosEncaminhamento: [
        'Doença de Graves de difícil controle',
        'Necessidade de cirurgia (2º trimestre é período mais seguro)',
        'Crise tireotóxica'
      ],
      citations: [{ refId: 'febrasgo-hipertireoidismo-2022' }]
    },

    prevencao: {
      primaria: [
        'Rastreamento em gestantes de risco',
        'Planejamento da gestação em mulheres com Graves'
      ],
      secundaria: [
        'Controle adequado antes de engravidar',
        'Monitoramento frequente na gestação'
      ],
      citations: [{ refId: 'febrasgo-hipertireoidismo-2022' }]
    },

    populacoesEspeciais: {
      gestantes: 'Trocar de PTU para metimazol após 16 semanas.'
    }
  },

  protocolos: ['hipertireoidismo-gestacao'],
  medicamentos: ['propiltiouracil', 'metimazol', 'propranolol'],
  calculadoras: [],
  rastreamentos: ['funcao-tireoidiana-gestacao'],

  citations: [
    { refId: 'febrasgo-hipertireoidismo-2022' },
    { refId: 'acog-thyroid-2020' }
  ],

  lastUpdate: '2025-01-07',
  tags: ['hipertireoidismo', 'tireoide', 'Graves', 'gestação', 'PTU', 'metimazol']
};

// =============================================================================
// 9. CARDIOPATIA E GRAVIDEZ
// =============================================================================

export const cardiopatiaGestacao: Doenca = {
  id: 'cardiopatia-gestacao',
  titulo: 'Cardiopatia e Gravidez',
  sinonimos: ['doença cardíaca na gestação', 'gestante cardiopata', 'gravidez na cardiopata'],

  ciap2: ['K74', 'K77', 'K83', 'W78'],
  cid10: ['O99.4', 'I05-I09', 'I20-I25', 'I42', 'I44-I49', 'Q20-Q28'],
  cid11: ['JB0Y', 'BA00-BA9Z'],
  snomedCT: '56265001',

  categoria: 'cardiovascular',
  subcategoria: 'cardiopatia',

  quickView: {
    definicao: 'Gestação em mulher portadora de cardiopatia estrutural ou funcional. Classificação de risco OMS modificada (mWHO) orienta o manejo. É a principal causa de mortalidade materna indireta no Brasil.',
    criteriosDiagnosticos: [
      'História de cardiopatia prévia (congênita, valvar, isquêmica, miocardiopatia)',
      'Classificação funcional NYHA (I-IV)',
      'Classificação de risco mWHO (I, II, II-III, III, IV)',
      'Avaliação ecocardiográfica: fração de ejeção, gradientes valvares, pressões'
    ],
    classificacaoRisco: [
      {
        nivel: 'baixo',
        criterios: ['mWHO I: lesões simples reparadas sem sequela', 'Sopro inocente', 'PVM sem regurgitação significativa'],
        conduta: 'Pré-natal em centro secundário. Parto normal possível.'
      },
      {
        nivel: 'moderado',
        criterios: ['mWHO II: CIA não reparada, CIV reparada, estenose pulmonar leve', 'Maioria das arritmias'],
        conduta: 'Pré-natal com cardiologista. Ecocardiograma trimestral.'
      },
      {
        nivel: 'alto',
        criterios: ['mWHO III: prótese mecânica, Marfan, coarctação não reparada', 'Disfunção ventricular leve-moderada (FE 30-45%)'],
        conduta: 'Centro terciário. Equipe multidisciplinar. Parto planejado.'
      },
      {
        nivel: 'muito_alto',
        criterios: ['mWHO IV: hipertensão pulmonar grave, FE <30%, síndrome de Eisenmenger', 'Marfan com aorta >45mm'],
        conduta: 'Gestação contraindicada. Se já gestante: aconselhamento sobre riscos, centro quaternário.'
      }
    ],
    tratamentoPrimeiraLinha: {
      naoFarmacologico: [
        'Repouso relativo',
        'Dieta hipossódica se ICC',
        'Monitorização de peso diário',
        'Meias de compressão elástica'
      ],
      farmacologico: [
        'Diuréticos (furosemida) se congestão: com cautela',
        'Betabloqueadores (metoprolol): se arritmia ou miocardiopatia',
        'Anticoagulação: HBPM ou varfarina (2º-3º tri em válvulas mecânicas)',
        'Digital: se FA ou IC refratária'
      ]
    },
    redFlags: [
      'Dispneia progressiva',
      'Ortopneia e dispneia paroxística noturna',
      'Síncope',
      'Dor torácica',
      'Palpitações persistentes',
      'Edema agudo de pulmão',
      'Saturação <95%'
    ],
    metasTerapeuticas: [
      'NYHA I-II',
      'Ausência de arritmias sintomáticas',
      'FE estável',
      'Parto a termo ou próximo'
    ]
  },

  fullContent: {
    epidemiologia: {
      prevalencia: '1-4% das gestações',
      incidencia: 'Aumentando devido a sobrevida de cardiopatas congênitas e idade materna avançada',
      mortalidade: 'Principal causa de morte materna indireta',
      fatoresRisco: [
        'Cardiopatia congênita',
        'Valvopatia reumática',
        'Idade materna avançada',
        'Hipertensão pulmonar',
        'Miocardiopatia dilatada',
        'Cardiopatia isquêmica'
      ],
      citations: [{ refId: 'sbc-cardiopatia-gravidez-2020' }, { refId: 'who-cardiovascular-pregnancy-2018' }]
    },

    fisiopatologia: {
      texto: 'A gestação impõe adaptações cardiovasculares significativas: aumento de 30-50% do débito cardíaco, redução da resistência vascular periférica, aumento do volume plasmático em 40-50%. Essas mudanças atingem pico entre 28-34 semanas e durante o trabalho de parto. Cardiopatas podem descompensar devido à incapacidade de aumentar o débito cardíaco ou tolerar as variações hemodinâmicas.',
      citations: [{ refId: 'sbc-cardiopatia-gravidez-2020' }]
    },

    quadroClinico: {
      sintomasPrincipais: [
        'Dispneia (distinguir da fisiológica da gestação)',
        'Palpitações',
        'Dor torácica',
        'Edema (distinguir do fisiológico)',
        'Síncope',
        'Ortopneia',
        'Tosse'
      ],
      sinaisExameFisico: [
        'Sopro cardíaco patológico (sistólico >3+/6, diastólico)',
        'B3 patológica',
        'Turgência jugular',
        'Hepatomegalia',
        'Estertores pulmonares',
        'Cianose',
        'Baqueteamento digital'
      ],
      formasClinicas: [
        'Cardiopatia congênita (mais comum em idade fértil)',
        'Valvopatia reumática',
        'Miocardiopatia periparto',
        'Cardiopatia isquêmica',
        'Arritmias',
        'Hipertensão pulmonar',
        'Cardiopatia hipertensiva'
      ],
      citations: [{ refId: 'sbc-cardiopatia-gravidez-2020' }]
    },

    diagnostico: {
      criterios: [
        'História de cardiopatia + exame físico',
        'Ecocardiograma transtorácico',
        'Classificação NYHA e mWHO',
        'Sinais de descompensação: dispneia progressiva, ortopneia, edema pulmonar'
      ],
      diagnosticoDiferencial: [
        'Alterações fisiológicas da gestação (sopro inocente, dispneia leve)',
        'Miocardiopatia periparto',
        'Tromboembolismo pulmonar',
        'Pré-eclâmpsia com repercussão cardíaca'
      ],
      examesLaboratoriais: [
        'Hemograma',
        'BNP ou NT-proBNP',
        'Função renal e hepática',
        'Gasometria se dispneia',
        'D-dímero se suspeita de TEP (elevado na gestação normal)'
      ],
      examesImagem: [
        'Ecocardiograma transtorácico (fundamental)',
        'RX de tórax (se necessário, com proteção abdominal)',
        'RM cardíaca (sem gadolínio) em casos selecionados',
        'Angio-TC se suspeita de TEP'
      ],
      outrosExames: [
        'ECG',
        'Holter 24h se arritmias',
        'Teste de esforço (selecionados)'
      ],
      citations: [{ refId: 'sbc-cardiopatia-gravidez-2020' }]
    },

    tratamento: {
      objetivos: [
        'Manter NYHA I-II',
        'Prevenir descompensação',
        'Planejar momento e via de parto',
        'Profilaxia de endocardite quando indicada'
      ],
      naoFarmacologico: {
        medidas: [
          'Repouso adequado',
          'Dieta hipossódica',
          'Controle de peso',
          'Evitar esforço físico intenso',
          'Meias elásticas',
          'Vacina contra influenza'
        ],
        citations: [{ refId: 'sbc-cardiopatia-gravidez-2020' }]
      },
      farmacologico: {
        primeiraLinha: [
          {
            classe: 'Betabloqueador',
            medicamentos: ['Metoprolol', 'Labetalol'],
            posologia: 'Metoprolol 25-100mg 12/12h',
            observacoes: 'Para controle de FC, arritmias, miocardiopatia. Evitar atenolol.',
            gradeLevel: 'B'
          },
          {
            classe: 'Diurético',
            medicamentos: ['Furosemida'],
            posologia: '20-80 mg/dia VO ou IV',
            observacoes: 'Se congestão. Usar com cautela (reduz volemia uteroplacentária).',
            gradeLevel: 'B'
          }
        ],
        segundaLinha: [
          {
            classe: 'Anticoagulante',
            medicamentos: ['Enoxaparina', 'Varfarina'],
            posologia: 'Individualizado conforme indicação',
            observacoes: 'HBPM preferida. Varfarina: evitar 1º tri (embriopatia) e periparto.',
            gradeLevel: 'B'
          },
          {
            classe: 'Digital',
            medicamentos: ['Digoxina'],
            posologia: '0,125-0,25 mg/dia',
            observacoes: 'Se FA com RVR ou IC refratária',
            gradeLevel: 'C'
          }
        ],
        situacoesEspeciais: [
          {
            situacao: 'Prótese mecânica',
            conduta: 'HBPM doses ajustadas (Anti-Xa 0,8-1,2) ou varfarina ≤5mg no 2º-3º tri. Transição para HBPM antes do parto.'
          },
          {
            situacao: 'Miocardiopatia periparto',
            conduta: 'IECA/BRA contraindicados na gestação. Betabloqueador + diurético. Bromocriptina pode ser considerada.'
          },
          {
            situacao: 'Edema agudo de pulmão',
            conduta: 'Furosemida IV + morfina + oxigênio + vasodilatador. Considerar parto de emergência.'
          }
        ],
        citations: [{ refId: 'sbc-cardiopatia-gravidez-2020' }]
      },
      duracao: 'Individualizado. Muitos medicamentos continuam no pós-parto.'
    },

    acompanhamento: {
      frequenciaConsultas: 'mWHO I: mensal. mWHO II: quinzenal. mWHO III-IV: semanal ou mais.',
      examesControle: [
        'ECG: inicial e conforme indicação',
        'Ecocardiograma: trimestral ou mais frequente se mWHO III-IV',
        'BNP/NT-proBNP: se suspeita de descompensação',
        'Saturação de O2'
      ],
      metasTerapeuticas: [
        'NYHA estável (I-II)',
        'Sem arritmias significativas',
        'FE preservada ou estável',
        'Crescimento fetal adequado'
      ],
      criteriosEncaminhamento: [
        'mWHO III-IV: centro terciário/quaternário',
        'Descompensação cardíaca',
        'Necessidade de intervenção',
        'Planejamento de parto'
      ],
      citations: [{ refId: 'sbc-cardiopatia-gravidez-2020' }]
    },

    prevencao: {
      primaria: [
        'Aconselhamento pré-concepcional',
        'Classificação de risco antes de engravidar',
        'Otimização da condição cardíaca',
        'Contraindicação de gestação em mWHO IV'
      ],
      secundaria: [
        'Acompanhamento multidisciplinar',
        'Profilaxia de eventos tromboembólicos',
        'Monitoramento intensivo'
      ],
      citations: [{ refId: 'sbc-cardiopatia-gravidez-2020' }]
    },

    populacoesEspeciais: {
      gestantes: 'Este é o foco do módulo. A classificação mWHO é fundamental.'
    }
  },

  protocolos: ['cardiopatia-gestacao', 'anticoagulacao-proteses-gestacao'],
  medicamentos: ['metoprolol', 'furosemida', 'digoxina', 'enoxaparina', 'varfarina'],
  calculadoras: ['risco-cardiaco-gestacao'],
  rastreamentos: [],

  citations: [
    { refId: 'sbc-cardiopatia-gravidez-2020' },
    { refId: 'who-cardiovascular-pregnancy-2018' }
  ],

  lastUpdate: '2025-01-07',
  tags: ['cardiopatia', 'gestação', 'mWHO', 'NYHA', 'valvopatia', 'cardiopatia congênita']
};

// =============================================================================
// 10. TROMBOFILIA NA GESTAÇÃO
// =============================================================================

export const trombofiliaGestacao: Doenca = {
  id: 'trombofilia-gestacao',
  titulo: 'Trombofilia na Gestação',
  sinonimos: ['trombofilias hereditárias/adquiridas na gravidez', 'TEV na gestação', 'síndrome antifosfolípide obstétrica'],

  ciap2: ['B83', 'K94', 'W78'],
  cid10: ['O22.3', 'O22.5', 'O87.1', 'O99.1', 'D68.5', 'D68.6'],
  cid11: ['JA80', '3B64'],
  snomedCT: '234467004',

  categoria: 'hematologico',
  subcategoria: 'coagulação',

  quickView: {
    definicao: 'Predisposição hereditária ou adquirida a trombose. A gestação é estado protrombótico fisiológico. Trombofilias aumentam risco de TEV, perdas gestacionais, RCIU, PE e DPP.',
    criteriosDiagnosticos: [
      'Hereditárias: Fator V Leiden, mutação protrombina G20210A, deficiência de proteína C/S/antitrombina',
      'Adquirida: Síndrome antifosfolípide (anticoagulante lúpico + anticardiolipina + anti-β2GP1)',
      'SAF obstétrica: critérios clínicos (perdas, PE, RCIU) + laboratoriais'
    ],
    tratamentoPrimeiraLinha: {
      naoFarmacologico: [
        'Deambulação precoce',
        'Meias de compressão elástica graduada',
        'Hidratação adequada',
        'Evitar viagens prolongadas sem movimentação'
      ],
      farmacologico: [
        'HBPM profilática: Enoxaparina 40 mg/dia SC',
        'HBPM terapêutica: Enoxaparina 1 mg/kg 12/12h SC',
        'SAF: HBPM + AAS 100 mg/dia',
        'Suspender 12-24h antes do parto, reiniciar 6-12h pós'
      ]
    },
    redFlags: [
      'TVP (dor, edema, empastamento de panturrilha)',
      'TEP (dispneia súbita, dor torácica, hemoptise)',
      'AVC',
      'Perdas gestacionais de repetição',
      'RCIU grave precoce',
      'PE grave <34 semanas'
    ],
    metasTerapeuticas: [
      'Prevenção de TEV',
      'Gestação a termo',
      'Ausência de complicações obstétricas',
      'Anti-Xa no alvo se HBPM terapêutica (0,5-1,0 UI/mL)'
    ]
  },

  fullContent: {
    epidemiologia: {
      prevalencia: 'Trombofilias hereditárias: 5-8%. SAF: ~5% das perdas gestacionais de repetição.',
      incidencia: 'TEV na gestação: 1-2/1000',
      mortalidade: 'TEP é uma das principais causas de morte materna',
      fatoresRisco: [
        'História pessoal de TEV',
        'História familiar de TEV',
        'Imobilização prolongada',
        'Obesidade',
        'Tabagismo',
        'Idade >35 anos',
        'Cesariana',
        'Pré-eclâmpsia'
      ],
      citations: [{ refId: 'ms-pcdt-trombofilia-2021' }, { refId: 'acog-thromboembolism-2018' }]
    },

    fisiopatologia: {
      texto: 'A gestação é um estado de hipercoagulabilidade fisiológica: aumento de fatores pró-coagulantes (fibrinogênio, fator VIII, von Willebrand) e redução de anticoagulantes naturais (proteína S). Trombofilias amplificam esse desequilíbrio. SAF envolve anticorpos que interferem na anticoagulação endógena e causam trombose placentária.',
      citations: [{ refId: 'ms-pcdt-trombofilia-2021' }]
    },

    quadroClinico: {
      sintomasPrincipais: [
        'TVP: dor, edema assimétrico de MMII, empastamento',
        'TEP: dispneia, dor torácica pleurítica, taquicardia, hemoptise',
        'Complicações obstétricas: perdas recorrentes, RCIU, PE, DPP'
      ],
      sinaisExameFisico: [
        'Sinal de Homans (TVP)',
        'Edema unilateral de membro',
        'Empastamento de panturrilha',
        'Taquipneia, hipóxia, taquicardia (TEP)',
        'Sinais de insuficiência placentária'
      ],
      formasClinicas: [
        'Trombofilia hereditária assintomática',
        'TEV agudo (TVP, TEP)',
        'SAF obstétrica',
        'SAF trombótica'
      ],
      citations: [{ refId: 'acog-thromboembolism-2018' }]
    },

    diagnostico: {
      criterios: [
        'Trombofilias hereditárias: testes genéticos/funcionais específicos',
        'SAF: critérios de Sydney (clínicos + laboratoriais confirmados em 12 semanas)',
        'TEV: clínica + exames de imagem (Doppler, angioTC)'
      ],
      diagnosticoDiferencial: [
        'Edema fisiológico da gestação',
        'Celulite',
        'Síndrome pós-trombótica',
        'Dispneia fisiológica vs. TEP'
      ],
      examesLaboratoriais: [
        'Painel de trombofilia: Fator V Leiden, mutação protrombina, proteína C, S, antitrombina',
        'SAF: anticoagulante lúpico, anticardiolipina IgG/IgM, anti-β2GP1 IgG/IgM',
        'D-dímero (elevado fisiologicamente na gestação - pouco útil)',
        'Anti-Xa se HBPM dose terapêutica'
      ],
      examesImagem: [
        'Doppler venoso de MMII',
        'Angio-TC de tórax (se suspeita de TEP)',
        'Cintilografia V/Q (alternativa com menor radiação)'
      ],
      citations: [{ refId: 'ms-pcdt-trombofilia-2021' }, { refId: 'acog-thromboembolism-2018' }]
    },

    tratamento: {
      objetivos: [
        'Prevenção de TEV',
        'Tratamento de TEV agudo',
        'Prevenção de complicações obstétricas (SAF)',
        'Parto seguro'
      ],
      naoFarmacologico: {
        medidas: [
          'Meias de compressão elástica graduada',
          'Deambulação precoce',
          'Hidratação',
          'Evitar imobilização prolongada'
        ],
        citations: [{ refId: 'ms-pcdt-trombofilia-2021' }]
      },
      farmacologico: {
        primeiraLinha: [
          {
            classe: 'HBPM profilática',
            medicamentos: ['Enoxaparina'],
            posologia: '40 mg SC 1x/dia',
            observacoes: 'Para profilaxia em trombofilias de baixo risco. Ajustar se peso >90kg.',
            gradeLevel: 'A'
          },
          {
            classe: 'HBPM terapêutica',
            medicamentos: ['Enoxaparina'],
            posologia: '1 mg/kg SC 12/12h',
            observacoes: 'Para TEV agudo ou SAF de alto risco. Monitorar Anti-Xa.',
            gradeLevel: 'A'
          }
        ],
        segundaLinha: [
          {
            classe: 'Heparina não fracionada',
            medicamentos: ['Heparina sódica'],
            posologia: 'Dose ajustada pelo TTPa',
            observacoes: 'Se insuficiência renal grave ou necessidade de reversão rápida',
            gradeLevel: 'B'
          }
        ],
        situacoesEspeciais: [
          {
            situacao: 'SAF obstétrica',
            conduta: 'AAS 100 mg/dia + HBPM profilática ou terapêutica conforme história'
          },
          {
            situacao: 'TEV agudo na gestação',
            conduta: 'HBPM dose terapêutica. Não usar varfarina. Manter por 3-6 meses pós-parto.'
          },
          {
            situacao: 'Periparto',
            conduta: 'Suspender HBPM profilática 12h antes; terapêutica 24h antes. Reiniciar 6-12h pós-parto.'
          },
          {
            situacao: 'Anestesia regional',
            conduta: 'Suspender HBPM ≥12h (profilática) ou ≥24h (terapêutica) antes do procedimento'
          }
        ],
        citations: [{ refId: 'ms-pcdt-trombofilia-2021' }, { refId: 'acog-thromboembolism-2018' }]
      },
      duracao: 'Profilaxia: durante gestação + 6 semanas pós-parto. TEV: 3-6 meses mínimo.'
    },

    acompanhamento: {
      frequenciaConsultas: 'Mensal ou conforme risco',
      examesControle: [
        'Hemograma: mensal',
        'Plaquetas: monitorar (risco de HIT)',
        'Anti-Xa: se HBPM dose terapêutica (4h pós-dose, alvo 0,5-1,0 UI/mL)',
        'USG obstétrica: avaliar crescimento fetal'
      ],
      metasTerapeuticas: [
        'Ausência de eventos tromboembólicos',
        'Anti-Xa no alvo',
        'Crescimento fetal adequado',
        'Gestação a termo'
      ],
      criteriosEncaminhamento: [
        'Hematologista para manejo de anticoagulação complexa',
        'Pré-natal de alto risco',
        'TEV agudo: internação'
      ],
      citations: [{ refId: 'ms-pcdt-trombofilia-2021' }]
    },

    prevencao: {
      primaria: [
        'Identificação de pacientes de risco',
        'Profilaxia em situações de risco (cesariana, imobilização)'
      ],
      secundaria: [
        'Profilaxia em gestantes com trombofilia conhecida',
        'AAS + HBPM em SAF'
      ],
      citations: [{ refId: 'ms-pcdt-trombofilia-2021' }]
    },

    populacoesEspeciais: {
      gestantes: 'A gestação aumenta o risco de TEV em 4-5x. Puerpério: risco ainda maior.'
    }
  },

  protocolos: ['tromboprofilaxia-gestacao', 'saf-obstetricia'],
  medicamentos: ['enoxaparina', 'heparina', 'aas'],
  calculadoras: ['risco-tev-gestacao'],
  rastreamentos: ['trombofilia-perdas-recorrentes'],

  citations: [
    { refId: 'ms-pcdt-trombofilia-2021' },
    { refId: 'acog-thromboembolism-2018' }
  ],

  lastUpdate: '2025-01-07',
  tags: ['trombofilia', 'TEV', 'SAF', 'HBPM', 'gestação', 'anticoagulação']
};

// =============================================================================
// 11. HEPATITE B NA GESTAÇÃO
// =============================================================================

export const hepatiteBGestacao: Doenca = {
  id: 'hepatite-b-gestacao',
  titulo: 'Hepatite B na Gestação',
  sinonimos: ['HBV na gravidez', 'gestante HBsAg positiva'],

  ciap2: ['D72', 'W78'],
  cid10: ['O98.4', 'B16', 'B18.1'],
  cid11: ['JB64', '1E50'],
  snomedCT: '66071002',

  categoria: 'infecciosas',
  subcategoria: 'hepatites',

  quickView: {
    definicao: 'Infecção pelo vírus da hepatite B durante a gestação. Risco de transmissão vertical de 70-90% em mães HBeAg+ sem profilaxia. Com imunoprofilaxia adequada, reduz para <5%.',
    criteriosDiagnosticos: [
      'HBsAg reagente = infecção (aguda ou crônica)',
      'HBeAg reagente = alta replicação viral',
      'Anti-HBs reagente isolado = imunidade vacinal',
      'Anti-HBc total reagente = contato prévio'
    ],
    tratamentoPrimeiraLinha: {
      naoFarmacologico: [
        'Aconselhamento sobre transmissão',
        'Testagem de parceiro e familiares',
        'Vacinação de contactantes suscetíveis',
        'Amamentação permitida se RN recebeu IGHAHB + vacina'
      ],
      farmacologico: [
        'Antiviral (TDF 300mg/dia): se CV >200.000 UI/mL ou HBeAg+ a partir de 28-32 sem',
        'IGHAHB 0,5mL IM para RN nas primeiras 12h',
        'Vacina hepatite B para RN nas primeiras 12h (+ esquema completo)'
      ]
    },
    redFlags: [
      'Carga viral >200.000 UI/mL',
      'HBeAg reagente',
      'Cirrose hepática',
      'Coinfecção HIV ou HCV',
      'Hepatite fulminante (rara)',
      'Procedimentos invasivos na gestação'
    ],
    metasTerapeuticas: [
      'CV <200.000 UI/mL no parto',
      'RN não infectado',
      'Imunoprofilaxia do RN em tempo adequado'
    ]
  },

  fullContent: {
    epidemiologia: {
      prevalencia: '0,5-1% das gestantes brasileiras são HBsAg+',
      incidencia: '~20.000 gestantes HBsAg+/ano no Brasil',
      mortalidade: 'Hepatite fulminante é rara mas grave',
      fatoresRisco: [
        'Parceiro HBsAg+',
        'Uso de drogas injetáveis',
        'Múltiplos parceiros',
        'Área endêmica',
        'Profissional de saúde',
        'Transfusão antes de 1993'
      ],
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    fisiopatologia: {
      texto: 'O HBV pode ser transmitido verticalmente principalmente no momento do parto (exposição a sangue e secreções). A transmissão intraútero é menos comum. A carga viral materna é o principal fator de risco. RN infectados têm 90% de risco de cronificação. A imunoprofilaxia (vacina + IGHAHB) bloqueia a infecção na maioria dos casos.',
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    quadroClinico: {
      sintomasPrincipais: [
        'Maioria assintomática (portadora crônica)',
        'Hepatite aguda: icterícia, fadiga, náuseas, dor em HCD',
        'Cirrose: sinais de hipertensão portal'
      ],
      sinaisExameFisico: [
        'Pode ser normal',
        'Hepatomegalia',
        'Icterícia (se aguda)',
        'Sinais de hepatopatia crônica (se cirrose)'
      ],
      formasClinicas: [
        'Portadora inativa (HBsAg+, HBeAg-, CV baixa)',
        'Hepatite B crônica ativa',
        'Cirrose',
        'Hepatite aguda'
      ],
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    diagnostico: {
      criterios: [
        'HBsAg reagente = diagnóstico de infecção',
        'Solicitar: HBeAg, anti-HBe, carga viral HBV',
        'Avaliar função hepática: TGO, TGP, bilirrubinas, albumina, TAP'
      ],
      diagnosticoDiferencial: [
        'Outras hepatites virais (A, C, E)',
        'Esteatose hepática da gestação',
        'Colestase intrahepática da gestação',
        'HELLP'
      ],
      examesLaboratoriais: [
        'HBsAg (triagem obrigatória)',
        'HBeAg, anti-HBe',
        'Carga viral HBV (HBV DNA)',
        'TGO, TGP, GGT, FA',
        'Bilirrubinas, albumina',
        'TAP/INR',
        'Sorologias: Anti-HCV, HIV'
      ],
      examesImagem: [
        'USG de abdome (avaliar fígado)'
      ],
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    tratamento: {
      objetivos: [
        'Reduzir risco de transmissão vertical',
        'Monitorar função hepática',
        'Profilaxia adequada do RN'
      ],
      naoFarmacologico: {
        medidas: [
          'Evitar procedimentos invasivos desnecessários',
          'Parto vaginal não é contraindicado',
          'Amamentação permitida após imunoprofilaxia do RN'
        ],
        citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
      },
      farmacologico: {
        primeiraLinha: [
          {
            classe: 'Antiviral',
            medicamentos: ['Tenofovir (TDF)'],
            posologia: '300 mg VO 1x/dia',
            observacoes: 'Indicado se CV >200.000 UI/mL ou HBeAg+. Iniciar 28-32 semanas.',
            gradeLevel: 'A'
          },
          {
            classe: 'Imunoprofilaxia do RN',
            medicamentos: ['IGHAHB + Vacina hepatite B'],
            posologia: 'IGHAHB 0,5 mL IM + Vacina nas primeiras 12h de vida',
            observacoes: 'Obrigatória para TODO RN de mãe HBsAg+',
            gradeLevel: 'A'
          }
        ],
        segundaLinha: [],
        situacoesEspeciais: [
          {
            situacao: 'CV <200.000 e HBeAg negativo',
            conduta: 'Apenas imunoprofilaxia do RN. TDF não necessário.'
          },
          {
            situacao: 'Já em uso de TDF antes da gestação',
            conduta: 'Manter TDF. Não suspender.'
          },
          {
            situacao: 'Pós-parto',
            conduta: 'TDF pode ser suspenso 1-3 meses pós-parto se iniciado apenas para PTV. Monitorar ALT.'
          }
        ],
        citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
      },
      duracao: 'TDF: até 1-3 meses pós-parto (se iniciado para PTV)'
    },

    acompanhamento: {
      frequenciaConsultas: 'Mensal para monitoramento',
      examesControle: [
        'TGO, TGP: mensal',
        'Carga viral: ao diagnóstico e 3º trimestre',
        'Após parto: TGO/TGP mensal por 6 meses (risco de flare)'
      ],
      metasTerapeuticas: [
        'CV <200.000 UI/mL no momento do parto',
        'RN recebeu imunoprofilaxia completa',
        'Função hepática estável'
      ],
      criteriosEncaminhamento: [
        'Hepatologista se cirrose ou hepatite ativa',
        'Infectologista para coinfecções'
      ],
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    prevencao: {
      primaria: [
        'Vacinação universal contra hepatite B',
        'Testagem universal no pré-natal',
        'Vacinação de contactantes suscetíveis'
      ],
      secundaria: [
        'Imunoprofilaxia do RN em tempo hábil',
        'TDF se carga viral alta',
        'Testar RN: HBsAg e anti-HBs aos 9-18 meses'
      ],
      citations: [{ refId: 'ms-pcdt-transmissao-vertical-2022' }]
    },

    populacoesEspeciais: {
      gestantes: 'Amamentação é segura após imunoprofilaxia do RN.'
    }
  },

  protocolos: ['hepatite-b-gestacao', 'ptv-hepatite-b'],
  medicamentos: ['tenofovir', 'vacina-hepatite-b', 'imunoglobulina-hahb'],
  calculadoras: [],
  rastreamentos: ['hepatite-b-prenatal'],

  citations: [
    { refId: 'ms-pcdt-transmissao-vertical-2022' }
  ],

  lastUpdate: '2025-01-07',
  tags: ['hepatite B', 'HBV', 'gestação', 'transmissão vertical', 'tenofovir']
};

// =============================================================================
// 12. ANEMIA NA GESTAÇÃO
// =============================================================================

export const anemiaGestacao: Doenca = {
  id: 'anemia-gestacao',
  titulo: 'Anemia na Gestação',
  sinonimos: ['anemia gestacional', 'anemia ferropriva na gravidez'],

  ciap2: ['B80', 'B82', 'W78'],
  cid10: ['O99.0', 'D50', 'D51', 'D52', 'D53'],
  cid11: ['JB0Z', '3A00'],
  snomedCT: '87522002',

  categoria: 'hematologico',
  subcategoria: 'anemias',

  quickView: {
    definicao: 'Hemoglobina <11 g/dL no 1º e 3º trimestres, ou <10,5 g/dL no 2º trimestre. A anemia ferropriva é a causa mais comum (90%). Associada a desfechos adversos materno-fetais.',
    criteriosDiagnosticos: [
      'Hb <11 g/dL (1º e 3º trimestres)',
      'Hb <10,5 g/dL (2º trimestre)',
      'Ferritina <30 ng/mL = depleção de ferro',
      'Ferritina <15 ng/mL = deficiência grave'
    ],
    tratamentoPrimeiraLinha: {
      naoFarmacologico: [
        'Orientação dietética: carnes, feijões, folhas verdes',
        'Evitar chá e café nas refeições (inibem absorção)',
        'Associar vitamina C para melhorar absorção de ferro'
      ],
      farmacologico: [
        'Sulfato ferroso 120-200 mg Fe elementar/dia (em jejum, longe de cálcio)',
        'Ácido fólico 5 mg/dia (se megaloblástica)',
        'Ferro IV (sacarato ou carboximaltose): se intolerância VO ou Hb <8',
        'Vitamina B12 IM: se deficiência confirmada'
      ]
    },
    redFlags: [
      'Hb <7 g/dL (anemia grave)',
      'Descompensação hemodinâmica',
      'Anemia refratária ao tratamento oral',
      'Suspeita de hemoglobinopatia',
      'Sangramento ativo'
    ],
    metasTerapeuticas: [
      'Hb >11 g/dL',
      'Ferritina >30 ng/mL',
      'Ausência de sintomas de anemia'
    ]
  },

  fullContent: {
    epidemiologia: {
      prevalencia: '40-50% das gestantes no Brasil têm anemia',
      incidencia: 'Mais comum no 2º e 3º trimestres',
      mortalidade: 'Anemia grave aumenta morbimortalidade materna',
      fatoresRisco: [
        'Dieta pobre em ferro',
        'Gestações múltiplas ou com intervalo curto',
        'Menorragia prévia',
        'Parasitoses intestinais',
        'Vegetarianismo/veganismo',
        'Adolescentes',
        'Multiparidade'
      ],
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    fisiopatologia: {
      texto: 'Na gestação, há aumento do volume plasmático (40-50%) maior que o aumento da massa eritrocitária (20-30%), resultando em hemodiluição fisiológica. A demanda de ferro aumenta de ~1 mg/dia para ~6 mg/dia para suportar a eritropoiese materna, fetal e reservas para o parto. Se a ingesta e reservas não suprem essa demanda, desenvolve-se anemia ferropriva.',
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    quadroClinico: {
      sintomasPrincipais: [
        'Fadiga (confunde com sintoma da gestação)',
        'Palidez',
        'Dispneia aos esforços',
        'Tonturas',
        'Palpitações',
        'Cefaleia'
      ],
      sinaisExameFisico: [
        'Palidez de mucosas e leitos ungueais',
        'Taquicardia',
        'Sopro sistólico funcional',
        'Coiloníquia (unhas em colher) - ferropenia crônica',
        'Queilite angular',
        'Glossite'
      ],
      formasClinicas: [
        'Anemia ferropriva (90%)',
        'Anemia megaloblástica (deficiência de folato/B12)',
        'Anemia por doença crônica',
        'Anemias hemolíticas (talassemia, anemia falciforme)',
        'Anemia aplástica (rara)'
      ],
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    diagnostico: {
      criterios: [
        'Hemoglobina: <11 g/dL (1º/3º tri) ou <10,5 g/dL (2º tri)',
        'VCM: microcítico (<80 fL) em ferropriva; macrocítico (>100 fL) em megaloblástica',
        'Ferritina: <30 ng/mL confirma depleção de ferro',
        'TIBC aumentada e saturação de transferrina baixa na ferropriva'
      ],
      diagnosticoDiferencial: [
        'Hemodiluição fisiológica',
        'Anemia ferropriva',
        'Deficiência de B12 ou folato',
        'Talassemia minor',
        'Anemia falciforme',
        'Sangramento oculto'
      ],
      examesLaboratoriais: [
        'Hemograma completo',
        'Ferritina (principal marcador de reserva)',
        'Ferro sérico e TIBC (se ferritina indisponível)',
        'Reticulócitos',
        'Vitamina B12 e ácido fólico (se macrocitose)',
        'Eletroforese de hemoglobina (se suspeita de hemoglobinopatia)',
        'EPF (parasitoses)'
      ],
      examesImagem: [
        'Não necessários rotineiramente'
      ],
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    tratamento: {
      objetivos: [
        'Corrigir anemia',
        'Repor estoques de ferro',
        'Prevenir complicações obstétricas'
      ],
      naoFarmacologico: {
        medidas: [
          'Dieta rica em ferro heme (carnes) e não-heme (leguminosas, folhas)',
          'Associar vitamina C às refeições',
          'Evitar chá, café e cálcio junto com ferro (reduzem absorção)'
        ],
        citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
      },
      farmacologico: {
        primeiraLinha: [
          {
            classe: 'Suplementação de ferro oral',
            medicamentos: ['Sulfato ferroso'],
            posologia: '120-200 mg de ferro elementar/dia (2-3 cp de sulfato ferroso 40mg Fe)',
            observacoes: 'Tomar em jejum para melhor absorção. Pode fracionar para reduzir efeitos GI.',
            gradeLevel: 'A'
          },
          {
            classe: 'Ácido fólico',
            medicamentos: ['Ácido fólico'],
            posologia: '5 mg/dia',
            observacoes: 'Se anemia megaloblástica ou profilaxia (0,4-0,8 mg/dia)',
            gradeLevel: 'A'
          }
        ],
        segundaLinha: [
          {
            classe: 'Ferro intravenoso',
            medicamentos: ['Sacarato de hidróxido de ferro III', 'Carboximaltose férrica'],
            posologia: 'Sacarato: 200 mg 2-3x/semana. Carboximaltose: 500-1000 mg dose única.',
            observacoes: 'Se intolerância ao VO, má absorção ou Hb <8 g/dL',
            gradeLevel: 'A'
          }
        ],
        situacoesEspeciais: [
          {
            situacao: 'Anemia grave (Hb <7)',
            conduta: 'Considerar transfusão de hemácias. Ferro IV. Internação.'
          },
          {
            situacao: 'Talassemia minor',
            conduta: 'Não suplementar ferro se ferritina normal. Ácido fólico 5mg/dia.'
          },
          {
            situacao: 'Anemia falciforme',
            conduta: 'Acompanhamento com hematologista. Ácido fólico. Hidratação. Monitoramento de crises.'
          }
        ],
        citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
      },
      duracao: 'Ferro: durante toda gestação + 3 meses pós-parto para repor estoques'
    },

    acompanhamento: {
      frequenciaConsultas: 'Mensal até normalização',
      examesControle: [
        'Hemograma: 4-8 semanas após início do tratamento',
        'Ferritina: após 8-12 semanas',
        'Reticulócitos: para avaliar resposta (pico em 7-10 dias)'
      ],
      metasTerapeuticas: [
        'Hb >11 g/dL',
        'Ferritina >30 ng/mL',
        'Aumento de Hb ≥1 g/dL em 4 semanas'
      ],
      criteriosEncaminhamento: [
        'Anemia refratária ao ferro oral',
        'Suspeita de hemoglobinopatia',
        'Anemia grave (Hb <8)',
        'Necessidade de transfusão'
      ],
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    prevencao: {
      primaria: [
        'Suplementação profilática de ferro: 40 mg Fe elementar/dia',
        'Ácido fólico 0,4 mg/dia (preferencialmente pré-concepcional)',
        'Orientação dietética'
      ],
      secundaria: [
        'Hemograma no 1º trimestre e 28 semanas',
        'Tratar deficiência de ferro antes de anemia'
      ],
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    populacoesEspeciais: {
      gestantes: 'Suplementação de ferro é universal no pré-natal brasileiro.'
    }
  },

  protocolos: ['anemia-gestacao'],
  medicamentos: ['sulfato-ferroso', 'acido-folico', 'ferro-intravenoso'],
  calculadoras: ['calculo-ferro-iv'],
  rastreamentos: ['anemia-prenatal'],

  citations: [
    { refId: 'ms-gestacao-alto-risco-2022' }
  ],

  lastUpdate: '2025-01-07',
  tags: ['anemia', 'ferropriva', 'gestação', 'sulfato ferroso', 'ácido fólico']
};

// =============================================================================
// 13. GESTAÇÃO GEMELAR
// =============================================================================

export const gestacaoGemelar: Doenca = {
  id: 'gestacao-gemelar',
  titulo: 'Gestação Gemelar',
  sinonimos: ['gravidez gemelar', 'gestação múltipla', 'gemelaridade'],

  ciap2: ['W84'],
  cid10: ['O30', 'O31'],
  cid11: ['JA02'],
  snomedCT: '65147003',

  categoria: 'ginecologico',
  subcategoria: 'obstetrícia',

  quickView: {
    definicao: 'Gestação com dois ou mais fetos. Classificada por corionicidade (1 ou 2 placentas) e amnionicidade (1 ou 2 sacos). A monocoriônica tem maior risco de complicações.',
    criteriosDiagnosticos: [
      'USG 1º trimestre: visualização de 2+ fetos',
      'Determinar corionicidade/amnionicidade até 14 semanas',
      'Dicoriônica: sinal do lambda (λ)',
      'Monocoriônica: sinal do T',
      'Monoamniótica: ausência de membrana entre fetos'
    ],
    classificacaoRisco: [
      {
        nivel: 'moderado',
        criterios: ['Dicoriônica/diamniótica', 'Crescimento concordante', 'Sem complicações'],
        conduta: 'Consultas quinzenais. USG a cada 4 semanas. Parto 37-38 sem.'
      },
      {
        nivel: 'alto',
        criterios: ['Monocoriônica/diamniótica', 'Discordância de peso <25%', 'Sem STFF'],
        conduta: 'Consultas semanais/quinzenais. USG a cada 2 semanas. Parto 36-37 sem.'
      },
      {
        nivel: 'muito_alto',
        criterios: ['Monocoriônica/monoamniótica', 'STFF', 'Restrição seletiva', 'Discordância >25%'],
        conduta: 'Centro de referência. USG semanal ou mais. Intervenção se STFF. Parto 32-34 sem.'
      }
    ],
    tratamentoPrimeiraLinha: {
      naoFarmacologico: [
        'Determinar corionicidade no 1º trimestre (crucial)',
        'Repouso relativo',
        'Orientação nutricional (maior aporte calórico)',
        'Monitoramento frequente'
      ],
      farmacologico: [
        'Corticoide para maturação pulmonar: se parto prematuro previsto',
        'Sulfato de Mg: neuroproteção se <32 semanas',
        'Progesterona: se colo curto (<25mm)',
        'AAS 150mg/dia: profilaxia de PE se fatores de risco'
      ]
    },
    redFlags: [
      'STFF (síndrome da transfusão feto-fetal)',
      'Discordância de peso >25%',
      'Oligoâmnio/polidrâmnio',
      'Restrição seletiva de um dos fetos',
      'Óbito de um dos fetos',
      'Colo curto (<25mm)',
      'Trabalho de parto prematuro'
    ],
    metasTerapeuticas: [
      'Determinar corionicidade precocemente',
      'Detectar complicações em tempo hábil',
      'Parto no momento adequado para tipo de gemelaridade'
    ]
  },

  fullContent: {
    epidemiologia: {
      prevalencia: '1-2% das gestações são gemelares',
      incidencia: 'Aumentando com técnicas de reprodução assistida e idade materna avançada',
      mortalidade: 'Mortalidade perinatal 4-10x maior que gestação única',
      fatoresRisco: [
        'Reprodução assistida (FIV)',
        'Idade materna avançada',
        'Multiparidade',
        'História familiar de gemelaridade dizigótica',
        'Raça negra'
      ],
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    fisiopatologia: {
      texto: 'Gemelaridade dizigótica (2 óvulos): sempre dicoriônica/diamniótica. Monozigótica (1 óvulo): depende do momento da divisão. Divisão até 3 dias: dicoriônica/diamniótica. 4-8 dias: monocoriônica/diamniótica. 8-13 dias: monocoriônica/monoamniótica. >13 dias: gêmeos unidos. Na monocoriônica, anastomoses vasculares placentárias podem causar STFF.',
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    quadroClinico: {
      sintomasPrincipais: [
        'Altura uterina maior que esperada',
        'Movimentos fetais em múltiplas localizações',
        'Sintomas de gestação exacerbados (náuseas, fadiga)',
        'Dispneia precoce'
      ],
      sinaisExameFisico: [
        'Útero maior que IG',
        'Palpação de múltiplos polos fetais',
        '2+ focos de BCF',
        'Ganho de peso excessivo',
        'Edema acentuado'
      ],
      formasClinicas: [
        'Dicoriônica/diamniótica (DCDA): menor risco',
        'Monocoriônica/diamniótica (MCDA): risco intermediário',
        'Monocoriônica/monoamniótica (MCMA): alto risco'
      ],
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    diagnostico: {
      criterios: [
        'USG 1º trimestre: 2+ sacos gestacionais ou embriões',
        'Corionicidade: sinal do lambda (DC) vs. sinal do T (MC)',
        'Determinar corionicidade é obrigatório e melhor feito até 14 semanas'
      ],
      diagnosticoDiferencial: [
        'Gestação única com mioma/cisto',
        'Erro de datação (gestação maior)',
        'Gestação molar parcial'
      ],
      examesLaboratoriais: [
        'Beta-hCG pode ser mais elevado',
        'Hemograma (maior risco de anemia)',
        'TOTG (maior risco de DMG)',
        'Função hepática e renal',
        'Rastreamento habitual do pré-natal'
      ],
      examesImagem: [
        'USG 11-14 sem: determinar corionicidade, TN de cada feto',
        'USG morfológico 20-24 sem',
        'USG de crescimento: cada 4 sem (DC) ou cada 2 sem (MC)',
        'Cervicometria: 16-24 sem',
        'Ecocardiograma fetal (especialmente MC)'
      ],
      outrosExames: [
        'Doppler de artéria umbilical',
        'Doppler de ducto venoso (se STFF)',
        'CTG'
      ],
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    tratamento: {
      objetivos: [
        'Monitoramento adequado conforme tipo de gemelaridade',
        'Detecção precoce de complicações',
        'Parto no momento ideal'
      ],
      naoFarmacologico: {
        medidas: [
          'Determinação precoce de corionicidade',
          'Consultas frequentes (quinzenais a semanais)',
          'Repouso relativo',
          'Orientação sobre sinais de alerta',
          'Planejamento do local e momento do parto'
        ],
        citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
      },
      farmacologico: {
        primeiraLinha: [
          {
            classe: 'Corticoide (maturação pulmonar)',
            medicamentos: ['Betametasona', 'Dexametasona'],
            posologia: 'Betametasona 12mg IM 2 doses (24h intervalo)',
            observacoes: 'Se parto previsto 24h-7d entre 24-34 semanas',
            gradeLevel: 'A'
          },
          {
            classe: 'Sulfato de magnésio (neuroproteção)',
            medicamentos: ['Sulfato de magnésio'],
            posologia: '4g bolus + 1g/h por 12-24h',
            observacoes: 'Se parto prematuro iminente <32 semanas',
            gradeLevel: 'A'
          }
        ],
        segundaLinha: [
          {
            classe: 'Progesterona',
            medicamentos: ['Progesterona vaginal'],
            posologia: '200mg/dia vaginal',
            observacoes: 'Se colo curto (<25mm). Evidência limitada em gemelares.',
            gradeLevel: 'C'
          }
        ],
        situacoesEspeciais: [
          {
            situacao: 'STFF (síndrome de transfusão feto-fetal)',
            conduta: 'Ablação a laser das anastomoses (procedimento de escolha). Centro de referência em medicina fetal.'
          },
          {
            situacao: 'Restrição seletiva de um feto',
            conduta: 'Monitoramento intensivo. Considerar parto se deterioração.'
          },
          {
            situacao: 'Óbito de um feto (MC)',
            conduta: 'Risco de lesão neurológica no sobrevivente. Monitoramento rigoroso. Parto não imediato geralmente.'
          }
        ],
        citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
      },
      duracao: 'Monitoramento até o parto'
    },

    acompanhamento: {
      frequenciaConsultas: 'DCDA: quinzenal. MCDA/MCMA: semanal a quinzenal.',
      examesControle: [
        'USG crescimento: cada 4 sem (DC) ou cada 2 sem (MC)',
        'Doppler: cada 2 sem em MC',
        'Cervicometria: 16-24 sem',
        'CTG: a partir de 32 sem ou conforme indicação'
      ],
      metasTerapeuticas: [
        'Crescimento concordante (<25% discordância)',
        'Ausência de STFF',
        'Líquido amniótico normal',
        'Colo >25mm'
      ],
      criteriosEncaminhamento: [
        'Toda gestação MC deve ser acompanhada em centro de referência',
        'STFF: centro com medicina fetal intervencionista',
        'Complicações: prematuridade iminente, RCIU'
      ],
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    prevencao: {
      primaria: [
        'Transferência de embrião único em FIV',
        'Aconselhamento sobre riscos da gemelaridade'
      ],
      secundaria: [
        'Determinação precoce de corionicidade',
        'Monitoramento intensivo de MC'
      ],
      citations: [{ refId: 'ms-gestacao-alto-risco-2022' }]
    },

    populacoesEspeciais: {
      gestantes: 'A corionicidade determina o risco e o manejo.'
    }
  },

  protocolos: ['gestacao-gemelar', 'stff-manejo'],
  medicamentos: ['betametasona', 'sulfato-magnesio', 'progesterona'],
  calculadoras: ['discordancia-peso-gemelar'],
  rastreamentos: [],

  citations: [
    { refId: 'ms-gestacao-alto-risco-2022' }
  ],

  lastUpdate: '2025-01-07',
  tags: ['gemelar', 'múltipla', 'monocoriônica', 'dicoriônica', 'STFF', 'gestação']
};

// =============================================================================
// EXPORT CONSOLIDADO
// =============================================================================

export const doencasPrenatalAltoRisco: Doenca[] = [
  classificacaoRiscoGestacional,
  diabetesGestacional,
  preEclampsia,
  hipertensaoCronicaGestacao,
  hivGestacao,
  sifilisGestacao,
  hipotireoidismoGestacao,
  hipertireoidismoGestacao,
  cardiopatiaGestacao,
  trombofiliaGestacao,
  hepatiteBGestacao,
  anemiaGestacao,
  gestacaoGemelar,
];

// Função auxiliar para obter doença por ID
export function getDoencaPrenatalById(id: string): Doenca | undefined {
  return doencasPrenatalAltoRisco.find(d => d.id === id);
}
