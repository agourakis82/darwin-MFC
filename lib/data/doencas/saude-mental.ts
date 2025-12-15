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
    ciap2: ['P74'],
    cid10: ['F41.1'],
    cid11: ['6B00'],
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
        citations: [{ refId: 'dsm5-tr' }]
      },
      fisiopatologia: {
        texto: 'Envolve disfunção em circuitos neurais relacionados ao medo e à preocupação, incluindo amígdala, córtex pré-frontal e sistema límbico. Há desregulação de neurotransmissores (serotonina, noradrenalina, GABA) e hiperatividade do eixo HPA.',
        citations: [{ refId: 'dsm5-tr' }]
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
        citations: [{ refId: 'dsm5-tr' }]
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
        citations: [{ refId: 'dsm5-tr' }]
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
          citations: [{ refId: 'canmat-2024' }]
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
          citations: [{ refId: 'canmat-2024' }]
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
        citations: [{ refId: 'canmat-2024' }]
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
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['sertralina', 'escitalopram', 'venlafaxina', 'duloxetina'],
    calculadoras: ['gad-7', 'phq-9'],
    rastreamentos: ['rastreamento-ansiedade'],
    citations: [{ refId: 'dsm5-tr' }, { refId: 'canmat-2024' }],
    lastUpdate: '2024-12',
    tags: ['ansiedade', 'tag', 'saude-mental', 'isrs', 'tcc'],
  },
  {
    id: 'transtorno-panico',
    titulo: 'Transtorno de Pânico',
    sinonimos: ['Síndrome do pânico', 'Ataques de pânico'],
    doid: 'DOID:594', // panic disorder
    ciap2: ['P74'],
    cid10: ['F41.0'],
    cid11: ['6B01'],
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
        citations: [{ refId: 'dsm5-tr' }]
      },
      fisiopatologia: {
        texto: 'Hiperatividade do sistema de alarme (locus coeruleus, amígdala). Sensibilidade aumentada a CO2 e lactato. Condicionamento interoceptivo: sintomas corporais normais são interpretados como perigosos, desencadeando o ataque.',
        citations: [{ refId: 'dsm5-tr' }]
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
        citations: [{ refId: 'dsm5-tr' }]
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
        citations: [{ refId: 'dsm5-tr' }]
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
          citations: [{ refId: 'canmat-2024' }]
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
          citations: [{ refId: 'canmat-2024' }]
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
        citations: [{ refId: 'canmat-2024' }]
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
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['sertralina', 'paroxetina', 'clonazepam', 'escitalopram'],
    calculadoras: ['pdss'],
    rastreamentos: [],
    citations: [{ refId: 'dsm5-tr' }, { refId: 'canmat-2024' }],
    lastUpdate: '2024-12',
    tags: ['panico', 'ataque-panico', 'agorafobia', 'ansiedade', 'isrs'],
  },
  {
    id: 'insonia',
    titulo: 'Insônia',
    sinonimos: ['Transtorno de insônia', 'Insônia crônica', 'Distúrbio do sono'],
    doid: 'DOID:526', // insomnia
    ciap2: ['P06'],
    cid10: ['G47.0', 'F51.0'],
    cid11: ['7A00'],
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
        citations: [{ refId: 'aasm-insonia-2017' }]
      },
      fisiopatologia: {
        texto: 'Modelo 3P: Fatores Predisponentes (genética, hiperativação), Precipitantes (estresse, doença) e Perpetuantes (comportamentos mal-adaptativos, crenças disfuncionais). A hiperestimulação do sistema de alerta impede a transição para o sono.',
        citations: [{ refId: 'aasm-insonia-2017' }]
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
        citations: [{ refId: 'aasm-insonia-2017' }]
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
        citations: [{ refId: 'aasm-insonia-2017' }]
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
          citations: [{ refId: 'aasm-insonia-2017' }]
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
          citations: [{ refId: 'aasm-insonia-2017' }]
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
        citations: [{ refId: 'aasm-insonia-2017' }]
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
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['zolpidem', 'melatonina', 'trazodona'],
    calculadoras: ['isi', 'epworth'],
    rastreamentos: [],
    citations: [{ refId: 'aasm-insonia-2017' }],
    lastUpdate: '2024-12',
    tags: ['insonia', 'sono', 'tcc-i', 'higiene-sono', 'zolpidem'],
  }
];

