/**
 * DOENÇAS GASTROINTESTINAIS - DARWIN-MFC
 * =======================================
 * 
 * Ontologia: DOID (Disease Ontology)
 */

import { Doenca } from '../../types/doenca';

export const doencasGastrointestinais: Doenca[] = [
  {
    id: 'doenca-refluxo-gastroesofagico',
    titulo: 'Doença do Refluxo Gastroesofágico',
    sinonimos: ['DRGE', 'Refluxo', 'Esofagite de refluxo'],
    doid: 'DOID:8534', // gastroesophageal reflux disease
    ciap2: ['D84'],
    cid10: ['K21', 'K21.0'],
    categoria: 'gastrointestinal',
    quickView: {
      definicao: 'Condição que se desenvolve quando o refluxo do conteúdo gástrico causa sintomas incômodos e/ou complicações. Manifestações típicas: pirose e regurgitação.',
      criteriosDiagnosticos: [
        'Pirose (queimação retroesternal) ≥2x/semana',
        'Regurgitação ácida',
        'Resposta ao teste terapêutico com IBP (4-8 semanas)',
        'EDA indicada se sinais de alarme ou >45 anos'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Elevação da cabeceira (15-20cm)',
          'Evitar comer 2-3h antes de deitar',
          'Evitar gatilhos: gordura, café, álcool, chocolate, menta, cítricos',
          'Perda de peso se sobrepeso/obesidade',
          'Cessação do tabagismo'
        ],
        farmacologico: [
          'IBP dose padrão por 4-8 semanas: Omeprazol 20mg/dia ou Pantoprazol 40mg/dia',
          'Tomar 30-60 min antes do café da manhã',
          'Casos leves: antiácidos ou bloqueadores H2 (Ranitidina 150mg 12/12h)'
        ]
      },
      metasTerapeuticas: [
        'Alívio dos sintomas',
        'Cicatrização de esofagite se presente',
        'Prevenção de complicações (estenose, Barrett)'
      ],
      examesIniciais: [
        'Diagnóstico geralmente clínico',
        'EDA se: sinais de alarme, >45 anos, refratário, sintomas atípicos'
      ],
      redFlags: [
        'Disfagia (dificuldade para engolir)',
        'Odinofagia (dor ao engolir)',
        'Perda de peso não intencional',
        'Anemia ferropriva',
        'Vômitos persistentes',
        'Sangramento GI',
        'Massa palpável'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '20-40% da população adulta',
        incidencia: 'Uma das doenças GI mais comuns',
        faixaEtaria: 'Todas as idades',
        fatoresRisco: [
          'Obesidade',
          'Hérnia hiatal',
          'Gestação',
          'Tabagismo',
          'Medicamentos (AINEs, BCC, nitratos)',
          'Dieta gordurosa'
        ],
        citations: [{ refId: 'acg-gerd-2022' }]
      },
      fisiopatologia: {
        texto: 'Falha na barreira antirrefluxo (EEI incompetente, hérnia hiatal), associada a fatores como relaxamentos transitórios do EEI, aumento da pressão intra-abdominal e retardo do esvaziamento gástrico. O ácido causa lesão esofágica.',
        citations: [{ refId: 'acg-gerd-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Pirose (sintoma cardinal)',
          'Regurgitação ácida',
          'Dor epigástrica',
          'Sintomas atípicos: tosse crônica, rouquidão, laringite, asma'
        ],
        sinaisExameFisico: [
          'Geralmente normal',
          'Pode haver dor epigástrica à palpação'
        ],
        formasClinicas: [
          'DRGE erosiva (com esofagite)',
          'DRGE não erosiva (NERD)',
          'Manifestações extraesofágicas'
        ],
        citations: [{ refId: 'acg-gerd-2022' }]
      },
      diagnostico: {
        criterios: [
          'Sintomas típicos + resposta ao IBP',
          'EDA se sinais de alarme',
          'pHmetria se diagnóstico incerto'
        ],
        diagnosticoDiferencial: [
          'Dispepsia funcional',
          'Úlcera péptica',
          'Esofagite eosinofílica',
          'Câncer de esôfago/estômago',
          'Doença cardíaca (angina)'
        ],
        examesLaboratoriais: [
          'EDA se indicada',
          'pHmetria 24h (casos duvidosos)',
          'Manometria esofágica (pré-cirurgia)'
        ],
        citations: [{ refId: 'acg-gerd-2022' }]
      },
      tratamento: {
        objetivos: [
          'Alívio sintomático',
          'Cicatrização de esofagite',
          'Prevenção de complicações'
        ],
        naoFarmacologico: {
          medidas: [
            'Modificações dietéticas',
            'Elevar cabeceira',
            'Perda de peso',
            'Evitar deitar após refeições',
            'Cessação do tabagismo'
          ],
          citations: [{ refId: 'acg-gerd-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'IBP',
              medicamentos: ['Omeprazol', 'Pantoprazol', 'Esomeprazol', 'Lansoprazol'],
              posologia: 'Omeprazol 20mg ou Pantoprazol 40mg 1x/dia em jejum por 4-8 semanas'
            }
          ],
          segundaLinha: [
            {
              classe: 'IBP dose dobrada',
              medicamentos: ['Omeprazol', 'Pantoprazol'],
              posologia: 'IBP 2x/dia (antes café e antes jantar) se resposta parcial'
            },
            {
              classe: 'Bloqueador H2',
              medicamentos: ['Ranitidina', 'Famotidina'],
              posologia: 'Para sintomas leves ou noturnos adicionais'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'DRGE refratária',
              conduta: 'Verificar adesão, horário de tomada. Considerar EDA. pHmetria se diagnóstico incerto.'
            },
            {
              situacao: 'Esôfago de Barrett',
              conduta: 'IBP contínuo + vigilância endoscópica'
            }
          ],
          citations: [{ refId: 'acg-gerd-2022' }]
        },
        duracao: 'DRGE erosiva: IBP por 8 semanas. NERD: 4-8 semanas. Manutenção se recidiva.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Reavaliar em 4-8 semanas após tratamento',
        examesControle: [
          'EDA de controle se esofagite grave ou Barrett',
          'Não é necessária em NERD com resposta ao tratamento'
        ],
        metasTerapeuticas: [
          'Controle dos sintomas com menor dose de IBP',
          'Cicatrização endoscópica se esofagite'
        ],
        criteriosEncaminhamento: [
          'Sinais de alarme',
          'Refratário a IBP dose dobrada',
          'Esôfago de Barrett',
          'Candidato a cirurgia antirrefluxo'
        ],
        citations: [{ refId: 'acg-gerd-2022' }]
      },
      prevencao: {
        primaria: [
          'Manutenção do peso saudável',
          'Evitar tabagismo',
          'Dieta equilibrada'
        ],
        secundaria: [
          'Modificações de estilo de vida',
          'Tratamento de manutenção se necessário'
        ],
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['omeprazol', 'pantoprazol', 'ranitidina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'acg-gerd-2022' }],
    lastUpdate: '2024-12',
    tags: ['drge', 'refluxo', 'pirose', 'ibp', 'omeprazol'],
  },
  {
    id: 'sindrome-intestino-irritavel',
    titulo: 'Síndrome do Intestino Irritável',
    sinonimos: ['SII', 'Cólon irritável', 'IBS'],
    doid: 'DOID:9778', // irritable bowel syndrome
    ciap2: ['D93'],
    cid10: ['K58', 'K58.0', 'K58.9'],
    categoria: 'gastrointestinal',
    quickView: {
      definicao: 'Distúrbio funcional gastrointestinal caracterizado por dor abdominal recorrente associada a alteração do hábito intestinal, sem causa orgânica identificável.',
      criteriosDiagnosticos: [
        'Critérios de Roma IV:',
        'Dor abdominal recorrente ≥1 dia/semana nos últimos 3 meses',
        'Associada a ≥2: relação com defecação, mudança na frequência das evacuações, mudança na forma das fezes',
        'Início dos sintomas ≥6 meses antes do diagnóstico'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educação e tranquilização',
          'Dieta com baixo FODMAP',
          'Aumento gradual de fibras (se constipação)',
          'Atividade física regular',
          'Manejo do estresse'
        ],
        farmacologico: [
          'SII-D (diarreia): Loperamida 2-4mg SOS',
          'SII-C (constipação): Fibras solúveis, laxativos osmóticos',
          'Dor/distensão: Antiespasmódicos (Hioscina 10-20mg)',
          'TCA em baixa dose (Amitriptilina 10-25mg) se dor predominante'
        ]
      },
      metasTerapeuticas: [
        'Controle adequado dos sintomas',
        'Melhora da qualidade de vida',
        'Identificação e evitação de gatilhos'
      ],
      examesIniciais: [
        'Hemograma',
        'PCR ou VHS',
        'TSH',
        'Sorologia para doença celíaca (anti-tTG IgA)',
        'Calprotectina fecal (se diarreia, para excluir DII)'
      ],
      redFlags: [
        'Idade >50 anos com sintomas novos',
        'Sangramento retal',
        'Perda de peso não intencional',
        'Anemia',
        'Massa abdominal',
        'Sintomas noturnos que acordam o paciente',
        'História familiar de câncer colorretal ou DII'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-15% da população global',
        incidencia: 'Pico na 3ª-4ª década',
        faixaEtaria: 'Mais comum em adultos jovens',
        fatoresRisco: [
          'Sexo feminino (2:1)',
          'Ansiedade e depressão',
          'Eventos estressantes',
          'Gastroenterite prévia (SII pós-infeccioso)',
          'Abuso na infância'
        ],
        citations: [{ refId: 'rome-iv-2016' }]
      },
      fisiopatologia: {
        texto: 'Interação complexa entre eixo cérebro-intestino, alterações na motilidade, hipersensibilidade visceral, inflamação de baixo grau, disbiose intestinal e fatores psicossociais.',
        citations: [{ refId: 'rome-iv-2016' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor abdominal (alivia com evacuação)',
          'Distensão abdominal',
          'Alteração do hábito intestinal (diarreia e/ou constipação)',
          'Urgência fecal',
          'Sensação de evacuação incompleta',
          'Muco nas fezes'
        ],
        sinaisExameFisico: [
          'Geralmente normal',
          'Dor à palpação abdominal (sem defesa)',
          'Timpanismo (distensão)'
        ],
        formasClinicas: [
          'SII-D (predomínio de diarreia)',
          'SII-C (predomínio de constipação)',
          'SII-M (misto)',
          'SII-U (não classificado)'
        ],
        citations: [{ refId: 'rome-iv-2016' }]
      },
      diagnostico: {
        criterios: [
          'Critérios de Roma IV',
          'Exclusão de causas orgânicas (exames mínimos)',
          'Diagnóstico positivo, não apenas de exclusão'
        ],
        diagnosticoDiferencial: [
          'Doença inflamatória intestinal (Crohn, RCU)',
          'Doença celíaca',
          'Intolerância à lactose',
          'Câncer colorretal',
          'Endometriose',
          'Supercrescimento bacteriano (SIBO)'
        ],
        examesLaboratoriais: [
          'Hemograma',
          'PCR/VHS',
          'TSH',
          'Anti-tTG IgA',
          'Calprotectina fecal (se diarreia)',
          'Colonoscopia se >50 anos ou sinais de alarme'
        ],
        citations: [{ refId: 'rome-iv-2016' }]
      },
      tratamento: {
        objetivos: [
          'Controle dos sintomas',
          'Identificar e evitar gatilhos',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Educação sobre a condição (benigna)',
            'Dieta baixa em FODMAPs',
            'Fibras solúveis (psyllium)',
            'Exercício físico',
            'Terapia cognitivo-comportamental',
            'Hipnoterapia gut-directed'
          ],
          citations: [{ refId: 'acg-sii-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Antiespasmódicos',
              medicamentos: ['Hioscina', 'Mebeverina', 'Trimebutina'],
              posologia: 'Hioscina 10-20mg 3x/dia antes das refeições'
            },
            {
              classe: 'Antidiarreicos (SII-D)',
              medicamentos: ['Loperamida'],
              posologia: 'Loperamida 2mg SOS (máx 16mg/dia)'
            },
            {
              classe: 'Laxativos (SII-C)',
              medicamentos: ['Macrogol', 'Psyllium'],
              posologia: 'Macrogol 1-2 sachês/dia'
            }
          ],
          segundaLinha: [
            {
              classe: 'Antidepressivos tricíclicos (dor)',
              medicamentos: ['Amitriptilina', 'Nortriptilina'],
              posologia: 'Amitriptilina 10-25mg à noite'
            },
            {
              classe: 'ISRS (se ansiedade/depressão comórbida)',
              medicamentos: ['Paroxetina', 'Citalopram'],
              posologia: 'Paroxetina 10-20mg/dia'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'SII-D grave',
              conduta: 'Considerar rifaximina ou eluxadolina'
            },
            {
              situacao: 'SII-C refratário',
              conduta: 'Considerar linaclotida ou prucaloprida'
            }
          ],
          citations: [{ refId: 'acg-sii-2021' }]
        },
        duracao: 'Tratamento crônico, ajustado conforme sintomas'
      },
      acompanhamento: {
        frequenciaConsultas: 'Conforme necessidade, geralmente a cada 2-3 meses inicialmente',
        examesControle: [
          'Reavaliação clínica',
          'Novos exames apenas se mudança do padrão ou sinais de alarme'
        ],
        metasTerapeuticas: [
          'Controle satisfatório dos sintomas',
          'Qualidade de vida preservada'
        ],
        criteriosEncaminhamento: [
          'Sinais de alarme',
          'Refratário ao tratamento',
          'Dúvida diagnóstica'
        ],
        citations: [{ refId: 'acg-sii-2021' }]
      },
      prevencao: {
        primaria: [
          'Manejo do estresse',
          'Dieta equilibrada'
        ],
        secundaria: [
          'Identificação de gatilhos alimentares',
          'Tratamento de comorbidades psiquiátricas'
        ],
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['hioscina', 'loperamida', 'amitriptilina', 'macrogol'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'rome-iv-2016' }, { refId: 'acg-sii-2021' }],
    lastUpdate: '2024-12',
    tags: ['sii', 'intestino-irritavel', 'colica', 'diarreia', 'constipacao', 'fodmap'],
  },
  {
    id: 'gastrite',
    titulo: 'Gastrite e Dispepsia',
    sinonimos: ['Gastrite crônica', 'Dispepsia funcional', 'Má digestão'],
    doid: 'DOID:4029', // gastritis
    ciap2: ['D87'],
    cid10: ['K29', 'K30'],
    categoria: 'gastrointestinal',
    quickView: {
      definicao: 'Gastrite: inflamação da mucosa gástrica. Dispepsia: sintomas de dor/desconforto epigástrico sem causa orgânica identificável (funcional) ou secundária a doença (orgânica).',
      criteriosDiagnosticos: [
        'Dispepsia: dor/queimação epigástrica, plenitude pós-prandial, saciedade precoce',
        'Roma IV (dispepsia funcional): sintomas ≥3 meses, início ≥6 meses',
        'Gastrite: diagnóstico histológico (EDA com biópsia)',
        'Investigar H. pylori'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar AINEs, álcool, tabaco',
          'Fracionar refeições',
          'Evitar alimentos que pioram sintomas',
          'Reduzir estresse'
        ],
        farmacologico: [
          'IBP: Omeprazol 20mg/dia por 4-8 semanas',
          'Erradicação de H. pylori se positivo',
          'Dispepsia funcional: IBP ou procinético (Domperidona)',
          'TCA em baixa dose se refratário'
        ]
      },
      metasTerapeuticas: [
        'Alívio dos sintomas',
        'Erradicação de H. pylori',
        'Cicatrização de lesões'
      ],
      examesIniciais: [
        'Teste para H. pylori (urease respiratória ou antígeno fecal)',
        'EDA se: >45 anos, sinais de alarme, refratário'
      ],
      redFlags: [
        'Disfagia',
        'Perda de peso',
        'Vômitos persistentes',
        'Sangramento GI',
        'Anemia',
        'Massa palpável',
        'Idade >45-55 anos com dispepsia nova'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Dispepsia: 20-40% da população',
        incidencia: 'Muito comum na APS',
        faixaEtaria: 'Todas as idades',
        fatoresRisco: [
          'H. pylori',
          'Uso de AINEs',
          'Tabagismo',
          'Álcool',
          'Estresse',
          'Idade avançada'
        ],
        citations: [{ refId: 'acg-dispepsia-2022' }]
      },
      fisiopatologia: {
        texto: 'Gastrite: inflamação por H. pylori, AINEs, autoimune ou outras causas. Dispepsia funcional: hipersensibilidade visceral, dismotilidade gástrica, alteração do eixo cérebro-intestino.',
        citations: [{ refId: 'acg-dispepsia-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor ou queimação epigástrica',
          'Plenitude pós-prandial',
          'Saciedade precoce',
          'Náuseas',
          'Eructações'
        ],
        sinaisExameFisico: [
          'Dor à palpação epigástrica',
          'Geralmente sem achados significativos'
        ],
        formasClinicas: [
          'Dispepsia funcional tipo dor epigástrica',
          'Dispepsia funcional tipo desconforto pós-prandial',
          'Gastrite por H. pylori',
          'Gastrite por AINEs'
        ],
        citations: [{ refId: 'acg-dispepsia-2022' }]
      },
      diagnostico: {
        criterios: [
          'Sintomas dispépticos',
          'Teste para H. pylori',
          'EDA se indicada'
        ],
        diagnosticoDiferencial: [
          'Úlcera péptica',
          'DRGE',
          'Câncer gástrico',
          'Doença biliar',
          'Pancreatite',
          'Isquemia mesentérica'
        ],
        examesLaboratoriais: [
          'Teste respiratório com ureia C13',
          'Antígeno fecal de H. pylori',
          'Sorologia H. pylori (menos específica)',
          'EDA com biópsia se indicada'
        ],
        citations: [{ refId: 'acg-dispepsia-2022' }]
      },
      tratamento: {
        objetivos: [
          'Aliviar sintomas',
          'Erradicar H. pylori se presente',
          'Prevenir complicações'
        ],
        naoFarmacologico: {
          medidas: [
            'Suspender AINEs',
            'Cessar tabagismo',
            'Reduzir álcool',
            'Fracionar refeições'
          ],
          citations: [{ refId: 'acg-dispepsia-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'IBP',
              medicamentos: ['Omeprazol', 'Pantoprazol'],
              posologia: 'Omeprazol 20mg/dia por 4-8 semanas'
            },
            {
              classe: 'Erradicação H. pylori',
              medicamentos: ['Omeprazol', 'Amoxicilina', 'Claritromicina'],
              posologia: 'OAC: Omeprazol 20mg 12/12h + Amoxicilina 1g 12/12h + Claritromicina 500mg 12/12h por 14 dias'
            }
          ],
          segundaLinha: [
            {
              classe: 'Procinéticos (dispepsia funcional)',
              medicamentos: ['Domperidona', 'Metoclopramida'],
              posologia: 'Domperidona 10mg 3x/dia antes das refeições'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Falha de erradicação',
              conduta: 'Esquema com Bismuto + Tetraciclina + Metronidazol + IBP ou Levofloxacino'
            },
            {
              situacao: 'Dispepsia funcional refratária',
              conduta: 'TCA em baixa dose (Amitriptilina 10-25mg)'
            }
          ],
          citations: [{ refId: 'acg-dispepsia-2022' }]
        },
        duracao: 'Erradicação: 14 dias. IBP: 4-8 semanas ou conforme sintomas.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Reavaliar após tratamento',
        examesControle: [
          'Teste de cura H. pylori (4 semanas após término do tratamento, 2 semanas sem IBP)'
        ],
        metasTerapeuticas: [
          'Erradicação de H. pylori',
          'Resolução dos sintomas'
        ],
        criteriosEncaminhamento: [
          'Sinais de alarme',
          'Falha de erradicação múltipla',
          'Dispepsia refratária'
        ],
        citations: [{ refId: 'acg-dispepsia-2022' }]
      },
      prevencao: {
        primaria: [
          'Evitar AINEs sem indicação',
          'Não fumar'
        ],
        secundaria: [
          'Erradicação de H. pylori',
          'Gastroproteção se AINEs necessários'
        ],
        citations: []
      },
    },
    protocolos: ['protocolo-hp'],
    medicamentos: ['omeprazol', 'amoxicilina', 'claritromicina', 'domperidona'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'acg-dispepsia-2022' }],
    lastUpdate: '2024-12',
    tags: ['gastrite', 'dispepsia', 'h-pylori', 'ibp', 'ulcera'],
  }
];

