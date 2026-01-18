/**
 * DOENÇAS - SAÚDE MENTAL - DARWIN-MFC
 * ====================================
 * 
 * Ontologia: DOID (Disease Ontology)
 * @see https://disease-ontology.org/
 */

import { Doenca } from '../../types/doenca';

export const doencasSaudeMental: Doenca[] = [
  {
    id: 'transtorno-ansiedade-generalizada',
    titulo: 'Transtorno de Ansiedade Generalizada',
    sinonimos: ['TAG', 'Ansiedade crônica', 'Ansiedade generalizada'],
    doid: 'DOID:14320', // generalized anxiety disorder
    snomedCT: '21897009', // Generalized anxiety disorder (disorder)
    meshId: 'D001008',
    umlsCui: 'C0270458',
    ciap2: ['P74'],
    cid10: ['F41.1'],
    cid11: ['6B00'],
    // LOINC codes for anxiety disorder workup (rule out medical causes)
    loinc: [
      { code: '3016-3', name: 'TSH' },
      { code: '3024-7', name: 'T4 Free' },
      { code: '1558-6', name: 'Fasting glucose' },
      { code: '718-7', name: 'Hemoglobin' },
      { code: '2951-2', name: 'Sodium' },
      { code: '2823-3', name: 'Potassium' },
      { code: '17861-6', name: 'Calcium' },
      { code: '2132-9', name: 'Vitamin B12' },
      { code: '1989-3', name: '25-Hydroxyvitamin D' },
      { code: '1988-5', name: 'C-reactive protein' },
      { code: '3426-4', name: 'Urine drug screen' },
      { code: '5643-2', name: 'Ethanol' },
    ],
    categoria: 'saude_mental',
    quickView: {
      definicao: 'Transtorno caracterizado por ansiedade e preocupação excessivas e persistentes, difíceis de controlar, ocorrendo na maioria dos dias por pelo menos 6 meses, acompanhadas de sintomas somáticos.',
      criteriosDiagnosticos: [
        'Ansiedade/preocupação excessiva por ≥6 meses',
        'Dificuldade em controlar a preocupação',
        '≥3 sintomas: inquietação, fadiga, dificuldade concentração, irritabilidade, tensão muscular, insônia',
        'Sofrimento clinicamente significativo ou prejuízo funcional',
        'Não atribuível a substância ou condição médica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoeducação sobre ansiedade',
          'Terapia cognitivo-comportamental (TCC) - padrão-ouro',
          'Técnicas de relaxamento e mindfulness',
          'Higiene do sono',
          'Exercício físico regular'
        ],
        farmacologico: [
          'ISRS: Sertralina 50-200mg/dia ou Escitalopram 10-20mg/dia',
          'Ou IRSN: Venlafaxina 75-225mg/dia ou Duloxetina 60-120mg/dia',
          'Iniciar com dose baixa, aumentar gradualmente',
          'Benzodiazepínicos apenas curto prazo (<4 semanas) se necessário'
        ]
      },
      metasTerapeuticas: [
        'GAD-7 <5 (remissão)',
        'Recuperação funcional (trabalho, relacionamentos)',
        'Redução/cessação de evitações',
        'Melhora da qualidade de vida'
      ],
      examesIniciais: [
        'GAD-7 (gravidade)',
        'PHQ-9 (descartar depressão comórbida)',
        'TSH (descartar hipertireoidismo)',
        'Hemograma, glicemia'
      ],
      redFlags: [
        'Ideação suicida',
        'Uso abusivo de substâncias',
        'Sintomas psicóticos',
        'Ataques de pânico frequentes',
        'Incapacidade funcional grave'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '3-6% da população ao longo da vida',
        incidencia: 'Início geralmente na 3ª-4ª década',
        faixaEtaria: 'Todas as idades, pico entre 35-55 anos',
        fatoresRisco: [
          'Sexo feminino (2:1)',
          'História familiar de transtornos de ansiedade',
          'Eventos de vida estressantes',
          'Temperamento ansioso na infância',
          'Abuso na infância',
          'Condições médicas crônicas'
        ],
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'anxiety-epidemiology-meta', evidenceLevel: 'A', studyType: 'SystematicReview' }
        ]
      },
      fisiopatologia: {
        texto: 'Envolve disfunção em circuitos neurais relacionados ao medo e à preocupação, incluindo amígdala, córtex pré-frontal e sistema límbico. Há desregulação de neurotransmissores (serotonina, noradrenalina, GABA) e hiperatividade do eixo HPA.',
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' }
        ]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Preocupação excessiva e incontrolável',
          'Inquietação ou sensação de estar no limite',
          'Fadiga fácil',
          'Dificuldade de concentração',
          'Irritabilidade',
          'Tensão muscular',
          'Perturbação do sono'
        ],
        sinaisExameFisico: [
          'Pode ser normal',
          'Tensão muscular palpável',
          'Taquicardia, sudorese',
          'Tremor fino de mãos'
        ],
        formasClinicas: [
          'TAG isolado',
          'TAG + Depressão (comórbido - muito comum)',
          'TAG + outros transtornos de ansiedade'
        ],
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' }
        ]
      },
      diagnostico: {
        criterios: [
          'Critérios DSM-5/CID-11',
          'GAD-7 ≥10 sugere TAG',
          'Duração ≥6 meses'
        ],
        diagnosticoDiferencial: [
          'Transtorno de pânico',
          'Fobia social',
          'TOC',
          'TEPT',
          'Depressão',
          'Hipertireoidismo',
          'Uso de estimulantes/abstinência'
        ],
        examesLaboratoriais: [
          'TSH',
          'Hemograma',
          'Glicemia',
          'Toxicológico se suspeita'
        ],
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'gad7-validation-study', evidenceLevel: 'A', studyType: 'Cohort' }
        ]
      },
      tratamento: {
        objetivos: [
          'Remissão dos sintomas',
          'Recuperação funcional',
          'Prevenção de recaídas'
        ],
        naoFarmacologico: {
          medidas: [
            'TCC (12-20 sessões) - 1ª linha',
            'Técnicas de relaxamento',
            'Mindfulness-Based Stress Reduction (MBSR)',
            'Exercício físico aeróbico regular',
            'Higiene do sono'
          ],
          citations: [
            { refId: 'canmat-2024', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'cbt-anxiety-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' }
          ]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'ISRS',
              medicamentos: ['Sertralina', 'Escitalopram', 'Paroxetina'],
              posologia: 'Sertralina 50-200mg/dia | Escitalopram 10-20mg/dia'
            },
            {
              classe: 'IRSN',
              medicamentos: ['Venlafaxina', 'Duloxetina'],
              posologia: 'Venlafaxina XR 75-225mg/dia | Duloxetina 60-120mg/dia'
            }
          ],
          segundaLinha: [
            {
              classe: 'Outros',
              medicamentos: ['Buspirona', 'Pregabalina'],
              posologia: 'Buspirona 15-60mg/dia | Pregabalina 150-600mg/dia'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Ansiedade aguda intensa',
              conduta: 'Benzodiazepínico por curto prazo (<2-4 semanas) enquanto ISRS faz efeito'
            },
            {
              situacao: 'TAG + Depressão',
              conduta: 'ISRS/IRSN tratam ambos. Preferir sertralina, venlafaxina ou duloxetina.'
            }
          ],
          citations: [
            { refId: 'canmat-2024', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'ssri-gad-meta-analysis', evidenceLevel: 'A', studyType: 'SystematicReview' },
            { refId: 'venlafaxine-gad-rct', evidenceLevel: 'A', studyType: 'RCT' }
          ]
        },
        duracao: 'Mínimo 12 meses após remissão. Considerar tratamento de longo prazo se recorrente.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal no início, depois quinzenal/mensal',
        examesControle: [
          'GAD-7 a cada consulta',
          'PHQ-9 se depressão comórbida',
          'Avaliação de efeitos adversos'
        ],
        metasTerapeuticas: [
          'GAD-7 <5',
          'Retorno às atividades normais'
        ],
        criteriosEncaminhamento: [
          'Refratário a 2 tratamentos adequados',
          'Risco de suicídio',
          'Comorbidade psiquiátrica complexa',
          'Necessidade de psicoterapia especializada'
        ],
        citations: [
          { refId: 'canmat-2024', evidenceLevel: 'A', studyType: 'Guideline' }
        ]
      },
      prevencao: {
        primaria: [
          'Manejo do estresse',
          'Estilo de vida saudável',
          'Detecção precoce em grupos de risco'
        ],
        secundaria: [
          'Tratamento adequado e prolongado',
          'Psicoterapia de manutenção'
        ],
        citations: [
          { refId: 'anxiety-prevention-review', evidenceLevel: 'B', studyType: 'SystematicReview' }
        ]
      },
    },
    protocolos: [],
    medicamentos: ['sertralina', 'escitalopram', 'venlafaxina', 'duloxetina'],
    calculadoras: ['gad-7', 'phq-9'],
    rastreamentos: ['rastreamento-ansiedade'],
    citations: [
      { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
      { refId: 'canmat-2024', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'cbt-anxiety-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' }
    ],
    lastUpdate: '2024-12',
    tags: ['ansiedade', 'tag', 'saude-mental', 'isrs', 'tcc'],
  },
  {
    id: 'transtorno-panico',
    titulo: 'Transtorno de Pânico',
    sinonimos: ['Síndrome do pânico', 'Ataques de pânico'],
    doid: 'DOID:594', // panic disorder
    snomedCT: '371631005', // Panic disorder (disorder)
    meshId: 'D016584',
    umlsCui: 'C0030319',
    ciap2: ['P74'],
    cid10: ['F41.0'],
    cid11: ['6B01'],
    // LOINC codes for panic disorder workup (rule out cardiac/metabolic causes)
    loinc: [
      { code: '3016-3', name: 'TSH' },
      { code: '3024-7', name: 'T4 Free' },
      { code: '1558-6', name: 'Fasting glucose' },
      { code: '2951-2', name: 'Sodium' },
      { code: '2823-3', name: 'Potassium' },
      { code: '17861-6', name: 'Calcium' },
      { code: '2160-0', name: 'Creatinine' },
      { code: '6598-7', name: 'Troponin T' },
      { code: '49563-0', name: 'BNP' },
      { code: '3426-4', name: 'Urine drug screen' },
      { code: '5643-2', name: 'Ethanol' },
      { code: '718-7', name: 'Hemoglobin' },
    ],
    categoria: 'saude_mental',
    quickView: {
      definicao: 'Transtorno caracterizado por ataques de pânico recorrentes e inesperados, seguidos de preocupação persistente sobre novos ataques ou mudanças comportamentais mal-adaptativas.',
      criteriosDiagnosticos: [
        'Ataques de pânico recorrentes e inesperados',
        'Pelo menos 1 ataque seguido de ≥1 mês de preocupação com novos ataques ou evitação',
        'Ataque de pânico: surto abrupto de medo intenso com ≥4 sintomas físicos/cognitivos',
        'Não atribuível a substância ou condição médica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoeducação sobre pânico (ciclo do medo)',
          'TCC com exposição interoceptiva',
          'Técnicas de respiração diafragmática',
          'Exercício físico regular'
        ],
        farmacologico: [
          'ISRS: Sertralina 50-200mg/dia ou Paroxetina 20-60mg/dia',
          'Iniciar com dose baixa (metade) para evitar piora inicial',
          'Benzodiazepínico de resgate (Clonazepam 0,25-0,5mg) no início'
        ]
      },
      metasTerapeuticas: [
        'Ausência de ataques de pânico',
        'Eliminação da ansiedade antecipatória',
        'Cessação de evitações agorafóbicas',
        'Retorno ao funcionamento normal'
      ],
      examesIniciais: [
        'ECG (descartar arritmias)',
        'TSH',
        'Glicemia',
        'Hemograma'
      ],
      redFlags: [
        'Primeiro ataque após 45 anos (investigar causa orgânica)',
        'Sintomas atípicos (dor torácica intensa, síncope)',
        'Ideação suicida',
        'Agorafobia grave com confinamento'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2-3% ao longo da vida',
        incidencia: 'Pico na adolescência/início da idade adulta',
        faixaEtaria: 'Início típico 20-30 anos',
        fatoresRisco: [
          'Sexo feminino (2:1)',
          'História familiar',
          'Eventos estressantes',
          'Tabagismo',
          'Sensibilidade à ansiedade',
          'Abuso na infância'
        ],
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'panic-epidemiology-meta', evidenceLevel: 'A', studyType: 'SystematicReview' }
        ]
      },
      fisiopatologia: {
        texto: 'Hiperatividade do sistema de alarme (locus coeruleus, amígdala). Sensibilidade aumentada a CO2 e lactato. Condicionamento interoceptivo: sintomas corporais normais são interpretados como perigosos, desencadeando o ataque.',
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'panic-neurobiology-review', evidenceLevel: 'B', studyType: 'SystematicReview' }
        ]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Palpitações ou taquicardia',
          'Sudorese',
          'Tremores',
          'Sensação de falta de ar',
          'Dor ou desconforto torácico',
          'Náusea',
          'Tontura',
          'Medo de morrer ou enlouquecer',
          'Parestesias',
          'Calafrios ou ondas de calor'
        ],
        sinaisExameFisico: [
          'Durante ataque: taquicardia, hiperventilação, sudorese',
          'Fora do ataque: geralmente normal'
        ],
        formasClinicas: [
          'Transtorno de pânico sem agorafobia',
          'Transtorno de pânico com agorafobia'
        ],
        citations: [{ refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Ataques de pânico recorrentes e inesperados',
          '≥4 de 13 sintomas com pico em minutos',
          'Preocupação persistente ou evitação por ≥1 mês'
        ],
        diagnosticoDiferencial: [
          'Infarto agudo do miocárdio',
          'Arritmias',
          'Hipertireoidismo',
          'Feocromocitoma',
          'Hipoglicemia',
          'Abstinência de substâncias',
          'Outros transtornos de ansiedade'
        ],
        examesLaboratoriais: [
          'ECG (obrigatório no 1º episódio)',
          'TSH',
          'Glicemia',
          'Eletrólitos',
          'Troponina se dor torácica atípica'
        ],
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'pdss-validation', evidenceLevel: 'A', studyType: 'Cohort' }
        ]
      },
      tratamento: {
        objetivos: [
          'Eliminar ataques de pânico',
          'Reduzir ansiedade antecipatória',
          'Tratar evitações agorafóbicas',
          'Prevenir recaídas'
        ],
        naoFarmacologico: {
          medidas: [
            'TCC com exposição interoceptiva - altamente eficaz',
            'Psicoeducação (explicar fisiologia do ataque)',
            'Técnicas de respiração (evitar hiperventilação)',
            'Relaxamento muscular progressivo'
          ],
          citations: [
            { refId: 'canmat-2024', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'cbt-panic-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' },
            { refId: 'interoceptive-exposure-rct', evidenceLevel: 'A', studyType: 'RCT' }
          ]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'ISRS',
              medicamentos: ['Sertralina', 'Paroxetina', 'Fluoxetina', 'Escitalopram'],
              posologia: 'Iniciar com metade da dose usual e aumentar lentamente. Ex: Sertralina 25mg → 50-200mg/dia'
            }
          ],
          segundaLinha: [
            {
              classe: 'IRSN',
              medicamentos: ['Venlafaxina'],
              posologia: 'Venlafaxina XR 75-225mg/dia'
            },
            {
              classe: 'Tricíclicos',
              medicamentos: ['Clomipramina', 'Imipramina'],
              posologia: 'Clomipramina 25-150mg/dia (mais efeitos adversos)'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Ataques muito frequentes no início',
              conduta: 'Clonazepam 0,5-1mg/dia por 2-4 semanas até ISRS fazer efeito'
            },
            {
              situacao: 'Agorafobia grave',
              conduta: 'TCC com exposição gradual é essencial. Considerar visitas domiciliares.'
            }
          ],
          citations: [
            { refId: 'canmat-2024', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'ssri-panic-meta-analysis', evidenceLevel: 'A', studyType: 'SystematicReview' },
            { refId: 'paroxetine-panic-rct', evidenceLevel: 'A', studyType: 'RCT' }
          ]
        },
        duracao: 'Mínimo 12-24 meses após remissão'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal no início, depois quinzenal/mensal',
        examesControle: [
          'Frequência e intensidade dos ataques',
          'Escala de gravidade do pânico'
        ],
        metasTerapeuticas: [
          'Zero ataques de pânico por mês',
          'Ausência de evitações'
        ],
        criteriosEncaminhamento: [
          'Refratário a tratamento',
          'Agorafobia grave',
          'Comorbidade complexa',
          'Risco suicida'
        ],
        citations: [
          { refId: 'canmat-2024', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'panic-relapse-prevention', evidenceLevel: 'B', studyType: 'Cohort' }
        ]
      },
      prevencao: {
        primaria: [
          'Manejo do estresse',
          'Evitar gatilhos conhecidos'
        ],
        secundaria: [
          'Tratamento de manutenção prolongado',
          'TCC para prevenir recaídas'
        ],
        citations: [
          { refId: 'panic-prevention-review', evidenceLevel: 'B', studyType: 'SystematicReview' }
        ]
      },
    },
    protocolos: [],
    medicamentos: ['sertralina', 'paroxetina', 'clonazepam', 'escitalopram'],
    calculadoras: ['pdss'],
    rastreamentos: [],
    citations: [
      { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
      { refId: 'canmat-2024', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'cbt-panic-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'ssri-panic-meta-analysis', evidenceLevel: 'A', studyType: 'SystematicReview' }
    ],
    lastUpdate: '2024-12',
    tags: ['panico', 'ataque-panico', 'agorafobia', 'ansiedade', 'isrs'],
  },
  {
    id: 'insonia',
    titulo: 'Insônia',
    sinonimos: ['Transtorno de insônia', 'Insônia crônica', 'Distúrbio do sono'],
    doid: 'DOID:526', // insomnia
    snomedCT: '193462001', // Insomnia (disorder)
    meshId: 'D007319',
    umlsCui: 'C0917801',
    ciap2: ['P06'],
    cid10: ['G47.0', 'F51.0'],
    cid11: ['7A00'],
    // LOINC codes for insomnia workup (rule out medical causes)
    loinc: [
      { code: '3016-3', name: 'TSH' },
      { code: '3024-7', name: 'T4 Free' },
      { code: '2132-9', name: 'Vitamin B12' },
      { code: '2284-8', name: 'Folate' },
      { code: '1558-6', name: 'Fasting glucose' },
      { code: '718-7', name: 'Hemoglobin' },
      { code: '2160-0', name: 'Creatinine' },
      { code: '19123-9', name: 'Magnesium' },
      { code: '2842-3', name: 'Prolactin' },
      { code: '3426-4', name: 'Urine drug screen' },
      { code: '5643-2', name: 'Ethanol' },
    ],
    categoria: 'saude_mental',
    quickView: {
      definicao: 'Queixa de dificuldade para iniciar ou manter o sono, ou despertar precoce, com prejuízo diurno, apesar de oportunidade adequada para dormir. Crônica quando ≥3 noites/semana por ≥3 meses.',
      criteriosDiagnosticos: [
        'Dificuldade para iniciar o sono, manter o sono ou despertar precoce',
        'Frequência ≥3 noites/semana',
        'Duração ≥3 meses (crônica)',
        'Prejuízo diurno: fadiga, déficit de atenção, humor alterado',
        'Oportunidade adequada para dormir'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Higiene do sono (1ª linha)',
          'TCC-I (Terapia Cognitivo-Comportamental para Insônia) - padrão-ouro',
          'Controle de estímulos',
          'Restrição de sono',
          'Técnicas de relaxamento'
        ],
        farmacologico: [
          'Considerar apenas se TCC-I insuficiente',
          'Zolpidem 5-10mg ao deitar (curto prazo)',
          'Trazodona 25-100mg (off-label, se ansiedade/depressão comórbida)',
          'Melatonina 2-5mg (especialmente em idosos)'
        ]
      },
      metasTerapeuticas: [
        'Latência do sono <30 minutos',
        'Tempo acordado após início <30 minutos',
        'Eficiência do sono >85%',
        'Melhora do funcionamento diurno'
      ],
      examesIniciais: [
        'Diário do sono por 2 semanas',
        'ISI (Insomnia Severity Index)',
        'TSH se sintomas de tireoide',
        'Polissonografia se suspeita de apneia ou movimentos periódicos'
      ],
      redFlags: [
        'Ronco alto + apneias testemunhadas (apneia do sono)',
        'Sonolência diurna excessiva (hipersonia)',
        'Movimentos periódicos das pernas',
        'Parassonias (sonambulismo, terror noturno)',
        'Depressão grave ou risco suicida'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-15% insônia crônica, 30-35% queixas de insônia',
        incidencia: 'Aumenta com idade',
        faixaEtaria: 'Todas as idades, mais comum em idosos',
        fatoresRisco: [
          'Sexo feminino',
          'Idade avançada',
          'Transtornos psiquiátricos (depressão, ansiedade)',
          'Doenças médicas crônicas',
          'Trabalho em turnos',
          'Uso de substâncias',
          'Eventos estressantes'
        ],
        citations: [
          { refId: 'aasm-insonia-2017', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'insomnia-epidemiology-meta', evidenceLevel: 'A', studyType: 'SystematicReview' }
        ]
      },
      fisiopatologia: {
        texto: 'Modelo 3P: Fatores Predisponentes (genética, hiperativação), Precipitantes (estresse, doença) e Perpetuantes (comportamentos mal-adaptativos, crenças disfuncionais). A hiperestimulação do sistema de alerta impede a transição para o sono.',
        citations: [
          { refId: 'aasm-insonia-2017', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'insomnia-hyperarousal-review', evidenceLevel: 'B', studyType: 'SystematicReview' }
        ]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dificuldade para adormecer',
          'Despertares noturnos frequentes',
          'Despertar precoce',
          'Sono não reparador',
          'Fadiga diurna',
          'Dificuldade de concentração',
          'Irritabilidade'
        ],
        sinaisExameFisico: [
          'Geralmente normal',
          'Sinais de fadiga',
          'Avaliar sinais de apneia do sono'
        ],
        formasClinicas: [
          'Insônia inicial (dificuldade para adormecer)',
          'Insônia de manutenção (despertares noturnos)',
          'Insônia terminal (despertar precoce)',
          'Mista'
        ],
        citations: [{ refId: 'aasm-insonia-2017', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Queixa de dificuldade de sono',
          '≥3 noites/semana por ≥3 meses',
          'Prejuízo diurno',
          'Oportunidade adequada para dormir'
        ],
        diagnosticoDiferencial: [
          'Apneia obstrutiva do sono',
          'Síndrome das pernas inquietas',
          'Transtorno do ritmo circadiano',
          'Narcolepsia',
          'Insônia secundária a condição médica/psiquiátrica'
        ],
        examesLaboratoriais: [
          'Diário do sono',
          'TSH',
          'Polissonografia se suspeita de outros distúrbios',
          'Actigrafia (opcional)'
        ],
        citations: [
          { refId: 'aasm-insonia-2017', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'isi-validation-study', evidenceLevel: 'A', studyType: 'Cohort' }
        ]
      },
      tratamento: {
        objetivos: [
          'Melhorar qualidade e quantidade do sono',
          'Reduzir prejuízo diurno',
          'Corrigir crenças e comportamentos disfuncionais'
        ],
        naoFarmacologico: {
          medidas: [
            'TCC-I (6-8 sessões) - tratamento de escolha',
            'Higiene do sono',
            'Controle de estímulos (cama só para dormir)',
            'Restrição de sono (aumenta eficiência)',
            'Técnicas de relaxamento'
          ],
          citations: [
            { refId: 'aasm-insonia-2017', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'cbti-cochrane-2015', evidenceLevel: 'A', studyType: 'SystematicReview' },
            { refId: 'cbti-vs-medication-rct', evidenceLevel: 'A', studyType: 'RCT' }
          ]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Hipnóticos não-benzodiazepínicos (Z-drugs)',
              medicamentos: ['Zolpidem', 'Zopiclona'],
              posologia: 'Zolpidem 5-10mg ao deitar, por curto prazo (<4 semanas)'
            },
            {
              classe: 'Agonista melatoninérgico',
              medicamentos: ['Melatonina'],
              posologia: 'Melatonina 2-5mg 30-60 min antes de dormir'
            }
          ],
          segundaLinha: [
            {
              classe: 'Antidepressivos sedativos (off-label)',
              medicamentos: ['Trazodona', 'Mirtazapina', 'Doxepina'],
              posologia: 'Trazodona 25-100mg ao deitar'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Idosos',
              conduta: 'Preferir melatonina ou doses baixas de trazodona. Evitar benzodiazepínicos (risco de queda).'
            },
            {
              situacao: 'Insônia + Depressão',
              conduta: 'Mirtazapina ou Trazodona podem tratar ambos.'
            }
          ],
          citations: [
            { refId: 'aasm-insonia-2017', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'zolpidem-efficacy-meta', evidenceLevel: 'B', studyType: 'SystematicReview' },
            { refId: 'melatonin-insomnia-cochrane', evidenceLevel: 'B', studyType: 'SystematicReview' }
          ]
        },
        duracao: 'TCC-I: efeito duradouro. Farmacoterapia: curto prazo quando possível.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal durante TCC-I, depois mensal',
        examesControle: [
          'Diário do sono',
          'ISI (Insomnia Severity Index)',
          'Avaliação de efeitos adversos de medicamentos'
        ],
        metasTerapeuticas: [
          'ISI <8 (ausência de insônia)',
          'Eficiência do sono >85%'
        ],
        criteriosEncaminhamento: [
          'Suspeita de apneia do sono',
          'Refratário à TCC-I',
          'Parassonias',
          'Narcolepsia'
        ],
        citations: [
          { refId: 'aasm-insonia-2017', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'insomnia-outcomes-study', evidenceLevel: 'B', studyType: 'Cohort' }
        ]
      },
      prevencao: {
        primaria: [
          'Higiene do sono desde cedo',
          'Manejo do estresse'
        ],
        secundaria: [
          'TCC-I precoce',
          'Evitar uso crônico de hipnóticos'
        ],
        citations: [
          { refId: 'sleep-hygiene-prevention-review', evidenceLevel: 'B', studyType: 'SystematicReview' }
        ]
      },
    },
    protocolos: [],
    medicamentos: ['zolpidem', 'melatonina', 'trazodona'],
    calculadoras: ['isi', 'epworth'],
    rastreamentos: [],
    citations: [
      { refId: 'aasm-insonia-2017', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'cbti-cochrane-2015', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'insomnia-epidemiology-meta', evidenceLevel: 'A', studyType: 'SystematicReview' }
    ],
    lastUpdate: '2024-12',
    tags: ['insonia', 'sono', 'tcc-i', 'higiene-sono', 'zolpidem'],
  },
  {
    id: 'transtorno-depressivo-maior',
    titulo: 'Transtorno Depressivo Maior',
    sinonimos: ['Depressão maior', 'Depressão unipolar', 'Depressão clínica'],
    doid: 'DOID:1470', // major depressive disorder
    snomedCT: '370143000', // Major depressive disorder (disorder)
    meshId: 'D003865',
    umlsCui: 'C1269683',
    ciap2: ['P76'],
    cid10: ['F32', 'F33'],
    cid11: ['6A70', '6A71'],
    // LOINC codes for depression workup and monitoring
    loinc: [
      { code: '3016-3', name: 'TSH' },
      { code: '3024-7', name: 'T4 Free' },
      { code: '2132-9', name: 'Vitamin B12' },
      { code: '2284-8', name: 'Folate' },
      { code: '1558-6', name: 'Fasting glucose' },
      { code: '718-7', name: 'Hemoglobin' },
      { code: '58410-2', name: 'CBC panel' },
      { code: '2160-0', name: 'Creatinine' },
      { code: '1751-7', name: 'Albumin' },
      { code: '1989-3', name: '25-Hydroxyvitamin D' },
      { code: '2951-2', name: 'Sodium' },
      { code: '17861-6', name: 'Calcium' },
      { code: '3426-4', name: 'Urine drug screen' },
      { code: '5643-2', name: 'Ethanol' },
      { code: '2093-3', name: 'Total cholesterol' },
    ],
    categoria: 'saude_mental',
    quickView: {
      definicao: 'Transtorno caracterizado por episódios de humor deprimido ou perda de interesse/prazer, com sintomas adicionais como alterações no sono, apetite, energia, concentração e pensamentos de morte.',
      criteriosDiagnosticos: [
        '≥5 sintomas por ≥2 semanas (incluindo humor deprimido ou anedonia)',
        'Humor deprimido na maior parte do dia',
        'Anedonia (perda de interesse/prazer)',
        'Alteração de peso/apetite',
        'Insônia ou hipersonia',
        'Agitação ou retardo psicomotor',
        'Fadiga ou perda de energia',
        'Sentimentos de inutilidade ou culpa excessiva',
        'Dificuldade de concentração',
        'Pensamentos de morte ou ideação suicida'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoeducação',
          'Terapia cognitivo-comportamental (TCC)',
          'Ativação comportamental',
          'Exercício físico regular',
          'Higiene do sono'
        ],
        farmacologico: [
          'ISRS: Sertralina 50-200mg/dia ou Escitalopram 10-20mg/dia',
          'Iniciar com dose baixa, aumentar após 2-4 semanas',
          'Resposta esperada em 4-6 semanas',
          'Manter por ≥6-12 meses após remissão'
        ]
      },
      metasTerapeuticas: [
        'PHQ-9 <5 (remissão)',
        'Recuperação funcional',
        'Prevenção de recaídas',
        'Melhora da qualidade de vida'
      ],
      examesIniciais: [
        'PHQ-9 (gravidade)',
        'TSH (descartar hipotireoidismo)',
        'Hemograma',
        'Vitamina B12, folato',
        'Glicemia'
      ],
      redFlags: [
        'Ideação suicida ativa com plano',
        'Sintomas psicóticos',
        'Episódio maníaco/hipomaníaco (bipolar)',
        'Catatonia',
        'Recusa alimentar grave'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '7% ao longo de 12 meses, 15-20% ao longo da vida',
        incidencia: 'Pico na 3ª década',
        faixaEtaria: 'Todas as idades',
        fatoresRisco: [
          'Sexo feminino (2:1)',
          'História familiar',
          'Eventos de vida estressantes',
          'Abuso na infância',
          'Doenças crônicas',
          'Uso de substâncias'
        ],
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'depression-global-burden', evidenceLevel: 'A', studyType: 'SystematicReview' },
          { refId: 'mdd-epidemiology-lancet', evidenceLevel: 'A', studyType: 'Cohort' }
        ]
      },
      fisiopatologia: {
        texto: 'Envolve desregulação de sistemas de neurotransmissores (serotonina, noradrenalina, dopamina), disfunção do eixo HPA, neuroinflamação e alterações em circuitos neurais límbicos e pré-frontais.',
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'depression-neurobiology-review', evidenceLevel: 'B', studyType: 'SystematicReview' }
        ]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Humor deprimido',
          'Anedonia',
          'Fadiga',
          'Alterações do sono',
          'Alterações do apetite/peso',
          'Dificuldade de concentração',
          'Sentimentos de culpa/inutilidade',
          'Pensamentos de morte'
        ],
        sinaisExameFisico: [
          'Aparência descuidada',
          'Contato visual pobre',
          'Lentificação psicomotora ou agitação',
          'Afeto embotado ou choroso'
        ],
        formasClinicas: [
          'Episódio único',
          'Recorrente',
          'Com características melancólicas',
          'Com características atípicas',
          'Com características psicóticas',
          'Com padrão sazonal'
        ],
        citations: [{ refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Critérios DSM-5/CID-11',
          'PHQ-9 ≥10 sugere depressão',
          'Avaliar risco suicida'
        ],
        diagnosticoDiferencial: [
          'Transtorno bipolar',
          'Hipotireoidismo',
          'Anemia',
          'Deficiência de B12/folato',
          'Doença de Cushing',
          'Luto normal',
          'Transtorno de ajustamento'
        ],
        examesLaboratoriais: [
          'TSH',
          'Hemograma',
          'Vitamina B12, folato',
          'Glicemia',
          'Função renal e hepática'
        ],
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'phq9-validation-jama', evidenceLevel: 'A', studyType: 'Cohort' }
        ]
      },
      tratamento: {
        objetivos: [
          'Remissão dos sintomas',
          'Recuperação funcional',
          'Prevenção de recaídas'
        ],
        naoFarmacologico: {
          medidas: [
            'TCC (12-20 sessões)',
            'Ativação comportamental',
            'Psicoterapia interpessoal',
            'Exercício físico aeróbico',
            'Fototerapia (se padrão sazonal)'
          ],
          citations: [
            { refId: 'canmat-2024', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'cbt-depression-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' },
            { refId: 'exercise-depression-meta', evidenceLevel: 'A', studyType: 'SystematicReview' }
          ]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'ISRS',
              medicamentos: ['Sertralina', 'Escitalopram', 'Fluoxetina'],
              posologia: 'Sertralina 50-200mg/dia | Escitalopram 10-20mg/dia'
            },
            {
              classe: 'IRSN',
              medicamentos: ['Venlafaxina', 'Duloxetina'],
              posologia: 'Venlafaxina XR 75-225mg/dia | Duloxetina 60-120mg/dia'
            }
          ],
          segundaLinha: [
            {
              classe: 'Outros',
              medicamentos: ['Bupropiona', 'Mirtazapina'],
              posologia: 'Bupropiona 150-300mg/dia | Mirtazapina 15-45mg/dia'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Depressão grave com risco suicida',
              conduta: 'Considerar internação e ECT'
            },
            {
              situacao: 'Depressão com características psicóticas',
              conduta: 'Antidepressivo + Antipsicótico ou ECT'
            }
          ],
          citations: [
            { refId: 'canmat-2024', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'star-d-trial', evidenceLevel: 'A', studyType: 'RCT' },
            { refId: 'ssri-efficacy-lancet-meta', evidenceLevel: 'A', studyType: 'SystematicReview' },
            { refId: 'ect-depression-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' }
          ]
        },
        duracao: 'Mínimo 6-12 meses após remissão. Tratamento prolongado se recorrente.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal no início, depois quinzenal/mensal',
        examesControle: [
          'PHQ-9 a cada consulta',
          'Avaliação de risco suicida',
          'Monitorar efeitos adversos'
        ],
        metasTerapeuticas: [
          'PHQ-9 <5',
          'Retorno às atividades normais'
        ],
        criteriosEncaminhamento: [
          'Risco suicida',
          'Refratário a tratamento',
          'Características psicóticas',
          'Suspeita de bipolar'
        ],
        citations: [
          { refId: 'canmat-2024', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'depression-relapse-prevention-rct', evidenceLevel: 'A', studyType: 'RCT' }
        ]
      },
      prevencao: {
        primaria: [
          'Manejo do estresse',
          'Tratamento de ansiedade',
          'Suporte social'
        ],
        secundaria: [
          'Tratamento de manutenção',
          'Psicoterapia de manutenção'
        ],
        citations: [
          { refId: 'depression-prevention-meta', evidenceLevel: 'B', studyType: 'SystematicReview' }
        ]
      },
    },
    protocolos: [],
    medicamentos: ['sertralina', 'escitalopram', 'fluoxetina', 'venlafaxina', 'duloxetina', 'bupropiona', 'mirtazapina'],
    calculadoras: ['phq-9', 'ham-d'],
    rastreamentos: ['rastreamento-depressao'],
    citations: [
      { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
      { refId: 'canmat-2024', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'star-d-trial', evidenceLevel: 'A', studyType: 'RCT' },
      { refId: 'ssri-efficacy-lancet-meta', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'cbt-depression-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' }
    ],
    lastUpdate: '2024-12',
    tags: ['depressao', 'tdm', 'saude-mental', 'isrs', 'tcc'],
  },
  {
    id: 'transtorno-bipolar',
    titulo: 'Transtorno Bipolar',
    sinonimos: ['Transtorno afetivo bipolar', 'Doença bipolar', 'Transtorno maníaco-depressivo'],
    doid: 'DOID:3312', // bipolar disorder
    snomedCT: '13746004', // Bipolar disorder (disorder)
    meshId: 'D001714',
    umlsCui: 'C0005586',
    ciap2: ['P73'],
    cid10: ['F31'],
    cid11: ['6A60', '6A61'],
    // LOINC codes for bipolar disorder workup and mood stabilizer monitoring
    loinc: [
      { code: '3719-2', name: 'Lithium' },
      { code: '4086-5', name: 'Valproate (Valproic acid)' },
      { code: '3968-5', name: 'Carbamazepine' },
      { code: '3016-3', name: 'TSH' },
      { code: '3024-7', name: 'T4 Free' },
      { code: '2160-0', name: 'Creatinine' },
      { code: '3094-0', name: 'BUN' },
      { code: '2951-2', name: 'Sodium' },
      { code: '2823-3', name: 'Potassium' },
      { code: '17861-6', name: 'Calcium' },
      { code: '718-7', name: 'Hemoglobin' },
      { code: '58410-2', name: 'CBC panel' },
      { code: '6768-6', name: 'Alkaline phosphatase' },
      { code: '1742-6', name: 'ALT' },
      { code: '1920-8', name: 'AST' },
      { code: '4548-4', name: 'Hemoglobin A1c' },
      { code: '2085-9', name: 'HDL cholesterol' },
      { code: '13457-7', name: 'LDL cholesterol' },
      { code: '2571-8', name: 'Triglycerides' },
      { code: '3426-4', name: 'Urine drug screen' },
      { code: '5643-2', name: 'Ethanol' },
      { code: '25428-4', name: 'Glucose serum' },
    ],
    categoria: 'saude_mental',
    quickView: {
      definicao: 'Transtorno caracterizado por episódios de humor que variam entre mania/hipomania e depressão, com períodos de eutimia entre os episódios.',
      criteriosDiagnosticos: [
        'Bipolar I: ≥1 episódio maníaco (pode ter episódios depressivos)',
        'Bipolar II: ≥1 episódio hipomaníaco + ≥1 episódio depressivo maior',
        'Mania: humor elevado/irritável + ↑energia por ≥7 dias + ≥3 sintomas',
        'Hipomania: sintomas mais leves por ≥4 dias, sem psicose ou internação'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoeducação (fundamental)',
          'TCC adaptada para bipolar',
          'Terapia de ritmo social/interpessoal',
          'Regularidade do sono',
          'Evitar substâncias'
        ],
        farmacologico: [
          'Mania: Lítio 900-1200mg/dia OU Valproato 1000-2000mg/dia + Antipsicótico',
          'Depressão bipolar: Quetiapina 300-600mg/dia OU Lítio + Lamotrigina',
          'Manutenção: Lítio (1ª linha) ou Valproato ou Lamotrigina'
        ]
      },
      metasTerapeuticas: [
        'Remissão do episódio atual',
        'Prevenção de novos episódios',
        'Recuperação funcional',
        'Adesão ao tratamento'
      ],
      examesIniciais: [
        'TSH, T4L (antes de lítio)',
        'Creatinina, ureia (função renal)',
        'Hemograma, plaquetas',
        'Função hepática (se valproato)',
        'Perfil lipídico, glicemia, HbA1c',
        'ECG (se >40 anos ou doença cardíaca)'
      ],
      redFlags: [
        'Mania grave com psicose',
        'Risco suicida (especialmente em episódio misto)',
        'Ciclagem rápida',
        'Sintomas psicóticos',
        'Recusa de tratamento com insight prejudicado'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Bipolar I: 1%, Bipolar II: 1-2%',
        incidencia: 'Início típico 15-25 anos',
        faixaEtaria: 'Início na adolescência/adulto jovem',
        fatoresRisco: [
          'História familiar (muito forte)',
          'Eventos estressantes',
          'Uso de substâncias',
          'Trauma na infância'
        ],
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'bipolar-epidemiology-lancet', evidenceLevel: 'A', studyType: 'SystematicReview' }
        ]
      },
      fisiopatologia: {
        texto: 'Alta herdabilidade genética. Envolve desregulação de sistemas de neurotransmissores, ritmos circadianos, sensibilização a estressores e alterações em circuitos pré-frontais e límbicos.',
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'bipolar-genetics-review', evidenceLevel: 'B', studyType: 'SystematicReview' }
        ]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Mania: humor elevado/irritável, ↓necessidade de sono, grandiosidade, fala rápida, aceleração do pensamento, distratibilidade, ↑atividade, comportamentos de risco',
          'Depressão: humor deprimido, anedonia, alterações de sono/apetite, fadiga, ideação suicida'
        ],
        sinaisExameFisico: [
          'Mania: agitação psicomotora, fala rápida, aparência extravagante',
          'Depressão: lentificação psicomotora, descuido pessoal'
        ],
        formasClinicas: [
          'Bipolar I',
          'Bipolar II',
          'Ciclotimia',
          'Com ciclagem rápida (≥4 episódios/ano)'
        ],
        citations: [{ refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Histórico de episódio maníaco (Bipolar I) ou hipomaníaco + depressivo (Bipolar II)',
          'MDQ (Mood Disorder Questionnaire) como triagem'
        ],
        diagnosticoDiferencial: [
          'Depressão unipolar',
          'Esquizofrenia',
          'Transtorno esquizoafetivo',
          'Hipertireoidismo',
          'Uso de substâncias (estimulantes)',
          'TDAH'
        ],
        examesLaboratoriais: [
          'TSH, T4L',
          'Hemograma',
          'Função renal',
          'Função hepática',
          'Toxicológico'
        ],
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'mdq-validation-study', evidenceLevel: 'A', studyType: 'Cohort' }
        ]
      },
      tratamento: {
        objetivos: [
          'Tratar episódio agudo',
          'Prevenir recorrências',
          'Manter eutimia',
          'Recuperação funcional'
        ],
        naoFarmacologico: {
          medidas: [
            'Psicoeducação (reduz recaídas em 50%)',
            'TCC adaptada',
            'Terapia de ritmo social',
            'Regularidade do sono',
            'Evitar álcool e drogas'
          ],
          citations: [
            { refId: 'canmat-2024', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'bipolar-psychoeducation-rct', evidenceLevel: 'A', studyType: 'RCT' },
            { refId: 'ipsrt-bipolar-trial', evidenceLevel: 'A', studyType: 'RCT' }
          ]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Estabilizadores de humor',
              medicamentos: ['Lítio', 'Valproato', 'Lamotrigina'],
              posologia: 'Lítio 600-1200mg/dia (nível 0,6-1,0) | Valproato 1000-2000mg/dia (nível 50-100) | Lamotrigina 100-200mg/dia'
            },
            {
              classe: 'Antipsicóticos atípicos',
              medicamentos: ['Quetiapina', 'Olanzapina', 'Aripiprazol'],
              posologia: 'Quetiapina 300-600mg/dia | Olanzapina 10-20mg/dia | Aripiprazol 15-30mg/dia'
            }
          ],
          segundaLinha: [
            {
              classe: 'Combinações',
              medicamentos: ['Lítio + Valproato', 'Estabilizador + Antipsicótico'],
              posologia: 'Conforme monoterapias'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Mania grave com psicose',
              conduta: 'Antipsicótico + Estabilizador. Considerar internação.'
            },
            {
              situacao: 'Depressão bipolar',
              conduta: 'Quetiapina monoterapia ou Lítio/Lamotrigina. EVITAR antidepressivos em monoterapia.'
            },
            {
              situacao: 'Gestação',
              conduta: 'Evitar valproato. Lítio com cautela. Preferir antipsicóticos atípicos.'
            }
          ],
          citations: [
            { refId: 'canmat-2024', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'lithium-maintenance-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' },
            { refId: 'balance-trial-lithium', evidenceLevel: 'A', studyType: 'RCT' },
            { refId: 'quetiapina-bipolar-depression-rct', evidenceLevel: 'A', studyType: 'RCT' }
          ]
        },
        duracao: 'Tratamento de manutenção por tempo indefinido'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal em episódio agudo, depois mensal/trimestral',
        examesControle: [
          'Litemia a cada 3-6 meses (e 5-7 dias após ajuste)',
          'TSH, creatinina a cada 6-12 meses (se lítio)',
          'Hemograma, função hepática (se valproato)',
          'Perfil metabólico (se antipsicótico)',
          'Valproatemia conforme necessário'
        ],
        metasTerapeuticas: [
          'Eutimia sustentada',
          'Sem episódios por ≥2 anos',
          'Funcionamento social/ocupacional'
        ],
        criteriosEncaminhamento: [
          'Episódio grave',
          'Refratário',
          'Risco suicida',
          'Gestação'
        ],
        citations: [
          { refId: 'canmat-2024', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'lithium-monitoring-review', evidenceLevel: 'B', studyType: 'SystematicReview' }
        ]
      },
      prevencao: {
        primaria: [
          'Identificação precoce',
          'Evitar drogas em pessoas de risco'
        ],
        secundaria: [
          'Tratamento de manutenção',
          'Psicoeducação',
          'Monitorização de pródromos'
        ],
        citations: [
          { refId: 'bipolar-early-intervention-review', evidenceLevel: 'B', studyType: 'SystematicReview' }
        ]
      },
    },
    protocolos: [],
    medicamentos: ['litio', 'valproato', 'lamotrigina', 'quetiapina', 'olanzapina', 'aripiprazol'],
    calculadoras: ['mdq', 'ymrs'],
    rastreamentos: [],
    citations: [
      { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
      { refId: 'canmat-2024', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'lithium-maintenance-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'balance-trial-lithium', evidenceLevel: 'A', studyType: 'RCT' },
      { refId: 'bipolar-psychoeducation-rct', evidenceLevel: 'A', studyType: 'RCT' }
    ],
    lastUpdate: '2024-12',
    tags: ['bipolar', 'mania', 'litio', 'estabilizador-humor', 'ciclotimia'],
  },
  {
    id: 'esquizofrenia',
    titulo: 'Esquizofrenia',
    sinonimos: ['Psicose esquizofrênica', 'Transtorno esquizofrênico'],
    doid: 'DOID:5419', // schizophrenia
    snomedCT: '58214004', // Schizophrenia (disorder)
    meshId: 'D012559',
    umlsCui: 'C0036341',
    ciap2: ['P72'],
    cid10: ['F20'],
    cid11: ['6A20'],
    // LOINC codes for schizophrenia workup and antipsychotic monitoring
    loinc: [
      { code: '58410-2', name: 'CBC panel' },
      { code: '26515-7', name: 'Platelet count' },
      { code: '26464-8', name: 'Leukocytes' },
      { code: '26499-4', name: 'Neutrophils' },
      { code: '2842-3', name: 'Prolactin' },
      { code: '4548-4', name: 'Hemoglobin A1c' },
      { code: '1558-6', name: 'Fasting glucose' },
      { code: '25428-4', name: 'Glucose serum' },
      { code: '2085-9', name: 'HDL cholesterol' },
      { code: '13457-7', name: 'LDL cholesterol' },
      { code: '2571-8', name: 'Triglycerides' },
      { code: '2093-3', name: 'Total cholesterol' },
      { code: '3016-3', name: 'TSH' },
      { code: '2160-0', name: 'Creatinine' },
      { code: '1742-6', name: 'ALT' },
      { code: '1920-8', name: 'AST' },
      { code: '718-7', name: 'Hemoglobin' },
      { code: '2132-9', name: 'Vitamin B12' },
      { code: '2284-8', name: 'Folate' },
      { code: '3426-4', name: 'Urine drug screen' },
      { code: '5643-2', name: 'Ethanol' },
    ],
    categoria: 'saude_mental',
    quickView: {
      definicao: 'Transtorno psicótico crônico caracterizado por sintomas positivos (delírios, alucinações), negativos (embotamento afetivo, avolição), desorganização e déficits cognitivos.',
      criteriosDiagnosticos: [
        '≥2 sintomas por ≥1 mês: delírios, alucinações, discurso desorganizado, comportamento desorganizado, sintomas negativos',
        'Pelo menos 1 deve ser: delírios, alucinações ou discurso desorganizado',
        'Prejuízo funcional',
        'Sinais contínuos por ≥6 meses',
        'Exclusão de transtorno esquizoafetivo, bipolar, depressão com psicose'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoeducação (paciente e família)',
          'Treino de habilidades sociais',
          'Reabilitação cognitiva',
          'Suporte ao emprego',
          'TCC para psicose'
        ],
        farmacologico: [
          '1º episódio: Antipsicótico atípico em dose baixa',
          'Risperidona 2-6mg/dia OU Olanzapina 10-20mg/dia OU Aripiprazol 10-30mg/dia',
          'Refratário: Clozapina 300-600mg/dia'
        ]
      },
      metasTerapeuticas: [
        'Remissão de sintomas positivos',
        'Melhora de sintomas negativos',
        'Recuperação funcional',
        'Prevenção de recaídas',
        'Qualidade de vida'
      ],
      examesIniciais: [
        'Hemograma completo (especialmente se clozapina)',
        'Perfil lipídico, glicemia, HbA1c',
        'Função hepática e renal',
        'Prolactina',
        'TSH',
        'ECG (QTc)',
        'Toxicológico'
      ],
      redFlags: [
        'Primeiro episódio psicótico (investigar causas orgânicas)',
        'Risco suicida (10% de taxa de suicídio)',
        'Agressividade/risco para terceiros',
        'Recusa de tratamento',
        'Neutropenia (se clozapina)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1% ao longo da vida',
        incidencia: '15-20 por 100.000/ano',
        faixaEtaria: 'Início típico 18-25 anos (homens), 25-35 anos (mulheres)',
        fatoresRisco: [
          'História familiar (10x risco se parente de 1º grau)',
          'Complicações obstétricas',
          'Uso de cannabis na adolescência',
          'Migração/urbanização',
          'Trauma na infância'
        ],
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'schizophrenia-epidemiology-lancet', evidenceLevel: 'A', studyType: 'SystematicReview' }
        ]
      },
      fisiopatologia: {
        texto: 'Hipótese dopaminérgica: hiperatividade mesolímbica (sintomas positivos) e hipoatividade mesocortical (sintomas negativos/cognitivos). Alterações glutamatérgicas, neurodesenvolvimentais e neuroinflamatórias.',
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'schizophrenia-neurobiology-review', evidenceLevel: 'B', studyType: 'SystematicReview' }
        ]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sintomas positivos: delírios, alucinações auditivas',
          'Sintomas negativos: embotamento afetivo, avolição, alogia, anedonia',
          'Desorganização: pensamento/comportamento desorganizado',
          'Déficits cognitivos: atenção, memória, função executiva'
        ],
        sinaisExameFisico: [
          'Descuido pessoal',
          'Afeto embotado',
          'Resposta a estímulos internos',
          'Comportamento bizarro'
        ],
        formasClinicas: [
          'Paranoide (mais comum)',
          'Desorganizada (hebefrênica)',
          'Catatônica',
          'Indiferenciada',
          'Residual'
        ],
        citations: [{ refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Critérios DSM-5/CID-11',
          'Duração ≥6 meses',
          'Excluir causas orgânicas'
        ],
        diagnosticoDiferencial: [
          'Psicose induzida por substâncias',
          'Psicose orgânica (tumor, epilepsia)',
          'Transtorno esquizoafetivo',
          'Transtorno delirante',
          'Transtorno bipolar com psicose',
          'Depressão com psicose'
        ],
        examesLaboratoriais: [
          'Hemograma',
          'Função renal e hepática',
          'TSH',
          'Toxicológico',
          'RM de crânio (1º episódio)',
          'EEG se suspeita de epilepsia'
        ],
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'first-episode-psychosis-workup', evidenceLevel: 'B', studyType: 'Guideline' }
        ]
      },
      tratamento: {
        objetivos: [
          'Controle de sintomas positivos',
          'Melhora de sintomas negativos e cognitivos',
          'Recuperação funcional',
          'Prevenção de recaídas'
        ],
        naoFarmacologico: {
          medidas: [
            'Psicoeducação familiar',
            'Reabilitação psicossocial',
            'Treino de habilidades sociais',
            'TCC para psicose',
            'Suporte ao emprego'
          ],
          citations: [
            { refId: 'nice-esquizofrenia-2014', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'cbt-psychosis-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' },
            { refId: 'family-intervention-schizophrenia', evidenceLevel: 'A', studyType: 'SystematicReview' }
          ]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Antipsicóticos atípicos',
              medicamentos: ['Risperidona', 'Olanzapina', 'Aripiprazol', 'Quetiapina', 'Paliperidona'],
              posologia: 'Risperidona 2-6mg/dia | Olanzapina 10-20mg/dia | Aripiprazol 10-30mg/dia'
            }
          ],
          segundaLinha: [
            {
              classe: 'Antipsicóticos típicos',
              medicamentos: ['Haloperidol'],
              posologia: 'Haloperidol 5-15mg/dia (mais efeitos extrapiramidais)'
            },
            {
              classe: 'Clozapina (refratário)',
              medicamentos: ['Clozapina'],
              posologia: 'Clozapina 300-600mg/dia (requer monitorização de hemograma)'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Esquizofrenia refratária',
              conduta: 'Clozapina após falha de ≥2 antipsicóticos. Monitorar hemograma semanalmente.'
            },
            {
              situacao: '1º episódio psicótico',
              conduta: 'Dose baixa de atípico. Resposta geralmente melhor que episódios subsequentes.'
            },
            {
              situacao: 'Má adesão',
              conduta: 'Considerar antipsicótico de depósito (LAI)'
            }
          ],
          citations: [
            { refId: 'nice-esquizofrenia-2014', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'catie-trial', evidenceLevel: 'A', studyType: 'RCT' },
            { refId: 'clozapine-refractory-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' },
            { refId: 'lai-antipsychotic-meta', evidenceLevel: 'A', studyType: 'SystematicReview' }
          ]
        },
        duracao: 'Tratamento contínuo. Após 1º episódio: mínimo 1-2 anos. Recorrente: indefinido.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal no início, depois mensal/trimestral',
        examesControle: [
          'Hemograma (semanal se clozapina, depois mensal)',
          'Glicemia, HbA1c, perfil lipídico a cada 3-6 meses',
          'Prolactina (se sintomas)',
          'ECG (se antipsicótico que prolonga QT)',
          'Peso, circunferência abdominal a cada consulta'
        ],
        metasTerapeuticas: [
          'Remissão de sintomas positivos',
          'Funcionamento social',
          'Adesão ao tratamento'
        ],
        criteriosEncaminhamento: [
          '1º episódio psicótico',
          'Refratário',
          'Clozapina',
          'Alto risco'
        ],
        citations: [
          { refId: 'nice-esquizofrenia-2014', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'metabolic-monitoring-antipsychotic', evidenceLevel: 'B', studyType: 'Guideline' }
        ]
      },
      prevencao: {
        primaria: [
          'Evitar cannabis na adolescência',
          'Intervenção em estados mentais de risco'
        ],
        secundaria: [
          'Intervenção precoce no 1º episódio',
          'Tratamento de manutenção'
        ],
        citations: [
          { refId: 'early-intervention-psychosis-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' }
        ]
      },
    },
    protocolos: [],
    medicamentos: ['risperidona', 'olanzapina', 'aripiprazol', 'quetiapina', 'clozapina', 'haloperidol'],
    calculadoras: ['panss', 'cgi'],
    rastreamentos: [],
    citations: [
      { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
      { refId: 'nice-esquizofrenia-2014', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'catie-trial', evidenceLevel: 'A', studyType: 'RCT' },
      { refId: 'clozapine-refractory-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'cbt-psychosis-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' }
    ],
    lastUpdate: '2024-12',
    tags: ['esquizofrenia', 'psicose', 'antipsicotico', 'clozapina', 'delirio', 'alucinacao'],
  },
  {
    id: 'transtorno-uso-substancias',
    titulo: 'Transtorno por Uso de Substâncias',
    sinonimos: ['Dependência química', 'Abuso de substâncias', 'Adicção'],
    doid: 'DOID:302', // substance-related disorder
    snomedCT: '66214007', // Substance abuse (disorder)
    meshId: 'D019966',
    umlsCui: 'C0038586',
    ciap2: ['P15', 'P16', 'P17', 'P18', 'P19'],
    cid10: ['F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19'],
    cid11: ['6C40', '6C41', '6C42', '6C43', '6C44', '6C45', '6C46', '6C47', '6C48', '6C49'],
    // LOINC codes for substance use disorder workup and monitoring
    loinc: [
      { code: '3426-4', name: 'Urine drug screen' },
      { code: '5643-2', name: 'Ethanol' },
      { code: '14370-7', name: 'Ethanol/Ethyl glucuronide' },
      { code: '19270-8', name: 'Amphetamines urine screen' },
      { code: '3397-7', name: 'Cocaine metabolite urine' },
      { code: '3879-4', name: 'Opiates urine screen' },
      { code: '18282-4', name: 'Cannabis urine screen' },
      { code: '3389-4', name: 'Benzodiazepines urine screen' },
      { code: '3298-7', name: 'Barbiturates urine screen' },
      { code: '58410-2', name: 'CBC panel' },
      { code: '718-7', name: 'Hemoglobin' },
      { code: '787-2', name: 'MCV' },
      { code: '1742-6', name: 'ALT' },
      { code: '1920-8', name: 'AST' },
      { code: '2324-2', name: 'GGT' },
      { code: '1975-2', name: 'Bilirubin total' },
      { code: '6768-6', name: 'Alkaline phosphatase' },
      { code: '1751-7', name: 'Albumin' },
      { code: '5902-2', name: 'Prothrombin time' },
      { code: '2160-0', name: 'Creatinine' },
      { code: '3094-0', name: 'BUN' },
      { code: '2132-9', name: 'Vitamin B12' },
      { code: '2284-8', name: 'Folate' },
      { code: '19123-9', name: 'Magnesium' },
      { code: '2777-1', name: 'Phosphate' },
      { code: '22748-8', name: 'Carbohydrate-deficient transferrin' },
      { code: '16935-9', name: 'Hepatitis B surface antigen' },
      { code: '16936-7', name: 'Hepatitis C antibody' },
      { code: '7917-8', name: 'HIV 1+2 antibody' },
    ],
    categoria: 'saude_mental',
    quickView: {
      definicao: 'Padrão mal-adaptativo de uso de substâncias psicoativas levando a prejuízo ou sofrimento clinicamente significativo, com critérios de tolerância, abstinência, uso compulsivo e prejuízo funcional.',
      criteriosDiagnosticos: [
        '≥2 critérios em 12 meses para diagnóstico',
        'Critérios: uso maior que pretendido, desejo de reduzir, tempo gasto, fissura',
        'Falha em obrigações, uso em situações de risco, problemas interpessoais',
        'Tolerância, abstinência',
        'Gravidade: Leve (2-3), Moderado (4-5), Grave (≥6)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Entrevista motivacional',
          'TCC para dependência',
          'Prevenção de recaída',
          'Grupos de mútua ajuda (AA, NA)',
          'Comunidade terapêutica (casos graves)'
        ],
        farmacologico: [
          'Álcool: Naltrexona 50mg/dia OU Acamprosato 666mg 3x/dia OU Dissulfiram 250-500mg/dia',
          'Opioides: Metadona ou Buprenorfina (substituição)',
          'Tabaco: Vareniclina, Bupropiona, Reposição de nicotina'
        ]
      },
      metasTerapeuticas: [
        'Abstinência ou redução de danos',
        'Prevenção de recaídas',
        'Tratamento de comorbidades',
        'Reintegração social'
      ],
      examesIniciais: [
        'Toxicológico urinário',
        'Hemograma (VCM aumentado)',
        'Função hepática (GGT, AST, ALT)',
        'Sorologias: HIV, Hepatites B e C',
        'Eletrólitos, função renal'
      ],
      redFlags: [
        'Síndrome de abstinência grave (álcool: convulsões, delirium tremens)',
        'Overdose',
        'Ideação suicida',
        'Complicações clínicas graves (cirrose, endocardite)',
        'Gestação'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Álcool: 5-10%, Tabaco: 15-25%, Drogas ilícitas: 2-5%',
        incidencia: 'Varia por substância e região',
        faixaEtaria: 'Início tipicamente na adolescência',
        fatoresRisco: [
          'História familiar',
          'Início precoce de uso',
          'Trauma/abuso na infância',
          'Transtornos psiquiátricos comórbidos',
          'Disponibilidade da substância',
          'Pares usuários'
        ],
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'substance-use-global-burden', evidenceLevel: 'A', studyType: 'SystematicReview' }
        ]
      },
      fisiopatologia: {
        texto: 'Sistema de recompensa dopaminérgico mesolímbico. Neuroadaptações levam a tolerância e dependência. Alterações no córtex pré-frontal prejudicam controle inibitório. O estresse e pistas ambientais podem desencadear fissura e recaída.',
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'addiction-neurobiology-review', evidenceLevel: 'B', studyType: 'SystematicReview' }
        ]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Uso compulsivo apesar de consequências negativas',
          'Fissura (craving)',
          'Tolerância (necessidade de doses maiores)',
          'Síndrome de abstinência específica',
          'Prejuízo funcional (trabalho, relacionamentos)'
        ],
        sinaisExameFisico: [
          'Varia conforme substância',
          'Álcool: hepatomegalia, eritema palmar, telangiectasias',
          'Injetáveis: marcas de agulha, endocardite',
          'Estimulantes: perda de peso, agitação'
        ],
        formasClinicas: [
          'Transtorno por uso de álcool',
          'Transtorno por uso de opioides',
          'Transtorno por uso de estimulantes',
          'Transtorno por uso de cannabis',
          'Transtorno por uso de sedativos',
          'Politoxicomania'
        ],
        citations: [{ refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Critérios DSM-5/CID-11',
          'AUDIT (álcool), DAST (drogas) como triagem',
          'CAGE (álcool)'
        ],
        diagnosticoDiferencial: [
          'Uso recreativo sem transtorno',
          'Intoxicação aguda',
          'Transtornos psiquiátricos primários',
          'Dor crônica com uso apropriado de opioides'
        ],
        examesLaboratoriais: [
          'Toxicológico urinário',
          'Etanol sérico',
          'GGT, AST, ALT',
          'Hemograma (VCM)',
          'Sorologias: HIV, HBV, HCV'
        ],
        citations: [
          { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'audit-validation-study', evidenceLevel: 'A', studyType: 'Cohort' }
        ]
      },
      tratamento: {
        objetivos: [
          'Desintoxicação segura',
          'Manutenção da abstinência ou redução de danos',
          'Tratamento de comorbidades',
          'Reabilitação psicossocial'
        ],
        naoFarmacologico: {
          medidas: [
            'Entrevista motivacional',
            'TCC',
            'Prevenção de recaída',
            'Manejo de contingências',
            'Grupos de mútua ajuda',
            'CAPS-AD'
          ],
          citations: [
            { refId: 'ms-drogas-2021', evidenceLevel: 'B', studyType: 'Guideline' },
            { refId: 'motivational-interviewing-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' },
            { refId: 'contingency-management-meta', evidenceLevel: 'A', studyType: 'SystematicReview' }
          ]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Álcool - Abstinência',
              medicamentos: ['Benzodiazepínicos'],
              posologia: 'Diazepam 10-20mg conforme protocolo de abstinência'
            },
            {
              classe: 'Álcool - Manutenção',
              medicamentos: ['Naltrexona', 'Acamprosato', 'Dissulfiram'],
              posologia: 'Naltrexona 50mg/dia | Acamprosato 666mg 3x/dia'
            },
            {
              classe: 'Opioides - Substituição',
              medicamentos: ['Metadona', 'Buprenorfina'],
              posologia: 'Metadona dose individualizada | Buprenorfina 8-24mg/dia'
            },
            {
              classe: 'Tabaco',
              medicamentos: ['Vareniclina', 'Bupropiona', 'TRN'],
              posologia: 'Vareniclina 1mg 2x/dia | Bupropiona 150mg 2x/dia'
            }
          ],
          segundaLinha: [
            {
              classe: 'Outras opções',
              medicamentos: ['Topiramato', 'Gabapentina'],
              posologia: 'Topiramato 200-300mg/dia (off-label para álcool)'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Abstinência alcoólica grave (delirium tremens)',
              conduta: 'Internação. Benzodiazepínicos em altas doses. Tiamina IV.'
            },
            {
              situacao: 'Overdose de opioides',
              conduta: 'Naloxona 0,4-2mg IV/IM. Repetir conforme necessário.'
            }
          ],
          citations: [
            { refId: 'ms-drogas-2021', evidenceLevel: 'B', studyType: 'Guideline' },
            { refId: 'naltrexone-alcohol-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' },
            { refId: 'buprenorphine-opioid-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' },
            { refId: 'varenicline-smoking-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' }
          ]
        },
        duracao: 'Tratamento de longo prazo. Dependência é condição crônica.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal no início, depois quinzenal/mensal',
        examesControle: [
          'Toxicológico periódico',
          'Função hepática',
          'Hemograma',
          'Reavaliação de comorbidades'
        ],
        metasTerapeuticas: [
          'Abstinência ou uso controlado',
          'Reinserção social',
          'Tratamento de comorbidades'
        ],
        criteriosEncaminhamento: [
          'Abstinência grave',
          'Comorbidade psiquiátrica',
          'Necessidade de internação',
          'Falha em tratamento ambulatorial'
        ],
        citations: [
          { refId: 'ms-drogas-2021', evidenceLevel: 'B', studyType: 'Guideline' },
          { refId: 'substance-use-monitoring-review', evidenceLevel: 'B', studyType: 'SystematicReview' }
        ]
      },
      prevencao: {
        primaria: [
          'Educação sobre riscos',
          'Políticas públicas',
          'Redução da disponibilidade'
        ],
        secundaria: [
          'Intervenção breve em uso de risco',
          'Tratamento precoce'
        ],
        citations: [
          { refId: 'brief-intervention-alcohol-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' }
        ]
      },
    },
    protocolos: [],
    medicamentos: ['naltrexona', 'acamprosato', 'dissulfiram', 'metadona', 'buprenorfina', 'vareniclina'],
    calculadoras: ['audit', 'cage', 'dast'],
    rastreamentos: ['rastreamento-alcool'],
    citations: [
      { refId: 'dsm5-tr', evidenceLevel: 'B', studyType: 'Guideline' },
      { refId: 'ms-drogas-2021', evidenceLevel: 'B', studyType: 'Guideline' },
      { refId: 'naltrexone-alcohol-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'buprenorphine-opioid-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'motivational-interviewing-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' }
    ],
    lastUpdate: '2024-12',
    tags: ['dependencia', 'alcool', 'drogas', 'adiccao', 'abstinencia', 'caps-ad'],
  }
];

