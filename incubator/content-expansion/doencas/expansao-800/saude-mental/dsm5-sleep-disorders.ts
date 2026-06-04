/**
 * TRANSTORNOS DO SONO - DSM-5
 * ===========================
 * Transtornos do sono-vigilia conforme DSM-5 e ICSD-3
 *
 * Referencias principais:
 * - DSM-5 (APA, 2013)
 * - ICSD-3 (AASM, 2014)
 * - CID-10 (OMS) e CID-11
 * - AASM Practice Guidelines
 * - European Sleep Research Society Guidelines
 */

import { Doenca } from '@/lib/types/doenca';

export const transtornosSono: Doenca[] = [
  // ============================================================================
  // 1. TRANSTORNO DE INSONIA (INSOMNIA DISORDER)
  // ============================================================================
  {
    id: 'transtorno-insonia',
    titulo: 'Transtorno de Insonia',
    sinonimos: ['Insomnia Disorder', 'Insonia Cronica', 'Insonia Primaria'],
    doid: 'DOID:526',
    snomedCT: '193462001',
    meshId: 'D007319',
    umlsCui: 'C0917801',
    ciap2: ['P06'],
    cid10: ['F51.01'],
    cid11: ['7A00'],
    categoria: 'saude_mental',
    subcategoria: 'transtornos_sono',
    quickView: {
      definicao: 'Insatisfacao com a quantidade ou qualidade do sono, com dificuldade para iniciar ou manter o sono, ou despertar precoce, ocorrendo pelo menos 3 noites por semana por pelo menos 3 meses, causando sofrimento clinicamente significativo.',
      criteriosDiagnosticos: [
        'Dificuldade para iniciar o sono (latencia >30 min)',
        'Dificuldade para manter o sono (despertares >30 min)',
        'Despertar precoce com incapacidade de retornar ao sono',
        'Frequencia: >=3 noites/semana por >=3 meses',
        'Oportunidade adequada para dormir',
        'Sofrimento clinicamente significativo ou prejuizo funcional',
        'Nao melhor explicado por outro transtorno do sono'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'TCC-I (Terapia Cognitivo-Comportamental para Insonia) - primeira linha',
          'Higiene do sono (horarios regulares, ambiente adequado)',
          'Restricao de sono (paradoxalmente eficaz)',
          'Controle de estimulos (cama apenas para sono e sexo)',
          'Tecnicas de relaxamento e mindfulness'
        ],
        farmacologico: [
          'TCC-I e preferivel a farmacoterapia (nivel A)',
          'Se necessario: Zolpidem 5-10mg ao deitar (curto prazo)',
          'Alternativa: Eszopiclona 1-3mg, Zaleplon 5-10mg',
          'Trazodona 25-100mg (off-label, evidencia moderada)',
          'Melatonina 0,5-5mg (especialmente idosos)'
        ]
      },
      metasTerapeuticas: [
        'Latencia de sono <30 minutos',
        'Eficiencia do sono >85%',
        'Tempo total de sono adequado para idade',
        'Reducao do sofrimento e melhora funcional'
      ],
      examesIniciais: [
        'Diario do sono por 2 semanas',
        'Indice de Gravidade de Insonia (ISI)',
        'Questionario de Pittsburgh (PSQI)',
        'Actigrafia (se disponivel)',
        'Polissonografia nao rotineira (apenas se suspeita de outro transtorno)'
      ],
      redFlags: [
        'Suspeita de apneia do sono (ronco, pausas)',
        'Movimentos periodicos dos membros',
        'Ideacao suicida',
        'Uso cronico de hipnoticos',
        'Insonia refrataria a TCC-I'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-15% da populacao adulta com insonia cronica',
        incidencia: '30-35% com sintomas de insonia em algum momento',
        faixaEtaria: 'Aumenta com idade; mulheres 1,5x mais afetadas',
        fatoresRisco: [
          'Sexo feminino',
          'Idade avancada',
          'Comorbidades psiquiatricas (depressao, ansiedade)',
          'Dor cronica',
          'Trabalho em turnos',
          'Estresse cronico'
        ],
        citations: [{ refId: 'aasm-insomnia-2017' }]
      },
      fisiopatologia: {
        texto: 'Modelo 3P: fatores Predisponentes (genetica, personalidade), Precipitantes (estresse, doenca) e Perpetuadores (comportamentos mal-adaptativos, crencas disfuncionais). Hiperarousal fisiologico e cognitivo mantem a insonia.',
        citations: [{ refId: 'lancet-insomnia-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dificuldade para adormecer',
          'Despertares noturnos frequentes',
          'Despertar precoce',
          'Sono nao reparador',
          'Fadiga diurna',
          'Dificuldade de concentracao'
        ],
        sinaisExameFisico: [
          'Exame fisico geralmente normal',
          'Avaliar sinais de apneia (IMC, circunferencia cervical)',
          'Sinais de depressao/ansiedade'
        ],
        formasClinicas: [
          'Insonia de inicio do sono',
          'Insonia de manutencao do sono',
          'Insonia com despertar precoce',
          'Insonia mista'
        ],
        citations: [{ refId: 'dsm5-apa-2013' }]
      },
      diagnostico: {
        criterios: [
          'Criterios DSM-5: insatisfacao + 1 dos 3 tipos + >=3 noites/sem + >=3 meses',
          'Oportunidade adequada para dormir',
          'Sofrimento ou prejuizo significativo',
          'Nao atribuivel a outro transtorno do sono, substancia ou condicao medica'
        ],
        diagnosticoDiferencial: [
          'Sindrome da apneia obstrutiva do sono',
          'Sindrome das pernas inquietas',
          'Transtorno do ritmo circadiano',
          'Insonia secundaria a transtorno psiquiatrico',
          'Insonia induzida por substancias'
        ],
        examesLaboratoriais: [
          'TSH (excluir tireopatia)',
          'Hemograma, glicemia (rotina)',
          'Ferritina (se suspeita de SPI)'
        ],
        outrosExames: [
          'Polissonografia: se suspeita de SAOS ou PLMS',
          'Actigrafia: avaliacao objetiva do padrao sono-vigilia'
        ],
        citations: [{ refId: 'aasm-insomnia-2017' }]
      },
      tratamento: {
        objetivos: [
          'Melhorar qualidade e quantidade do sono',
          'Reduzir sofrimento diurno',
          'Evitar dependencia de hipnoticos'
        ],
        naoFarmacologico: {
          medidas: [
            'TCC-I: 4-8 sessoes (evidencia nivel A)',
            'Restricao do tempo na cama',
            'Controle de estimulos',
            'Reestruturacao cognitiva',
            'Higiene do sono',
            'Tecnicas de relaxamento'
          ],
          citations: [{ refId: 'aasm-cbt-insomnia-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Agonistas receptores benzodiazepinicos (Z-drugs)',
              medicamentos: ['Zolpidem', 'Eszopiclona', 'Zaleplon'],
              posologia: 'Zolpidem 5-10mg ou Eszopiclona 1-3mg ao deitar',
              observacoes: 'Uso de curto prazo (<4 semanas); risco de dependencia'
            },
            {
              classe: 'Antidepressivos sedativos (off-label)',
              medicamentos: ['Trazodona', 'Doxepina', 'Mirtazapina'],
              posologia: 'Trazodona 25-100mg; Doxepina 3-6mg',
              observacoes: 'Menor potencial de dependencia; util se comorbidade depressiva'
            }
          ],
          segundaLinha: [
            {
              classe: 'Agonistas de melatonina',
              medicamentos: ['Melatonina', 'Ramelteon'],
              posologia: 'Melatonina 0,5-5mg; Ramelteon 8mg',
              observacoes: 'Preferivel em idosos; baixo potencial de abuso'
            },
            {
              classe: 'Antagonistas de orexina',
              medicamentos: ['Suvorexant', 'Lemborexant'],
              posologia: 'Suvorexant 10-20mg ao deitar',
              observacoes: 'Mecanismo inovador; custo elevado'
            }
          ],
          situacoesEspeciais: [
            { situacao: 'Idosos', conduta: 'Preferir melatonina, doxepina baixa dose; evitar benzodiazepinicos' },
            { situacao: 'Gestantes', conduta: 'TCC-I; evitar farmacoterapia se possivel' },
            { situacao: 'Comorbidade psiquiatrica', conduta: 'Tratar transtorno de base; trazodona ou mirtazapina' }
          ],
          citations: [{ refId: 'acp-insomnia-2016' }]
        },
        duracao: 'TCC-I: 6-8 semanas; Farmacoterapia: curto prazo preferencial'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal durante TCC-I; mensal apos estabilizacao',
        examesControle: [
          'Diario do sono',
          'ISI (Insomnia Severity Index)',
          'PSQI periodicamente'
        ],
        metasTerapeuticas: [
          'Eficiencia do sono >85%',
          'Latencia <30 minutos',
          'Reducao do ISI'
        ],
        criteriosEncaminhamento: [
          'Refratariedade a TCC-I',
          'Suspeita de outros transtornos do sono',
          'Comorbidades psiquiatricas graves',
          'Uso cronico de hipnoticos'
        ],
        citations: [{ refId: 'aasm-insomnia-2017' }]
      },
      prevencao: {
        primaria: [
          'Educacao sobre higiene do sono',
          'Manejo precoce do estresse',
          'Evitar cafeina e alcool a noite'
        ],
        secundaria: [
          'Identificacao precoce de sintomas',
          'TCC-I preventiva em populacoes de risco'
        ],
        citations: [{ refId: 'sleep-foundation-2023' }]
      }
    },
    protocolos: ['insonia-manejo-aps'],
    medicamentos: ['zolpidem', 'trazodona', 'melatonina'],
    calculadoras: ['isi-insomnia', 'psqi'],
    rastreamentos: [],
    citations: [
      { refId: 'aasm-insomnia-2017' },
      { refId: 'dsm5-apa-2013' },
      { refId: 'lancet-insomnia-2022' }
    ],
    lastUpdate: '2025-01',
    tags: ['insonia', 'sono', 'tcc-i', 'hipnoticos', 'dsm5']
  },

  // ============================================================================
  // 2. NARCOLEPSIA TIPO 1 (COM CATAPLEXIA)
  // ============================================================================
  {
    id: 'narcolepsia-tipo-1',
    titulo: 'Narcolepsia Tipo 1',
    sinonimos: ['Narcolepsia com Cataplexia', 'Narcolepsy Type 1', 'Deficiencia de Hipocretina'],
    doid: 'DOID:8986',
    snomedCT: '60380001',
    meshId: 'D009290',
    umlsCui: 'C0027404',
    ciap2: ['P06'],
    cid10: ['G47.411'],
    cid11: ['7A20.0'],
    categoria: 'saude_mental',
    subcategoria: 'transtornos_sono',
    quickView: {
      definicao: 'Transtorno de hipersonolencia caracterizado por sonolencia excessiva diurna irresistivel, cataplexia (perda subita do tonus muscular desencadeada por emocoes), e deficiencia de hipocretina-1 no LCR (<110 pg/mL).',
      criteriosDiagnosticos: [
        'Sonolencia excessiva diurna por >=3 meses',
        'Cataplexia definida (episodios breves de perda do tonus muscular bilateral desencadeados por emocoes)',
        'MSLT: latencia media <=8 min + >=2 SOREMPs',
        'OU Hipocretina-1 no LCR <110 pg/mL (diagnostico definitivo)',
        'Nao melhor explicado por outro transtorno'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cochilos programados (15-20 min, 2-3x/dia)',
          'Higiene do sono rigorosa',
          'Evitar privacao de sono',
          'Orientacao ocupacional e para direcao',
          'Suporte psicossocial'
        ],
        farmacologico: [
          'SONOLENCIA: Modafinila 100-400mg/dia (primeira linha)',
          'Alternativas: Metilfenidato 10-60mg/dia, Pitolisant 9-36mg/dia',
          'CATAPLEXIA: Oxibato de sodio 4,5-9g/noite (dividido em 2 doses)',
          'Alternativas: Venlafaxina 75-225mg/dia, Fluoxetina 20-60mg/dia'
        ]
      },
      metasTerapeuticas: [
        'Reducao da sonolencia diurna (ESS <10)',
        'Controle da cataplexia',
        'Melhora da qualidade de vida',
        'Manutencao de atividades laborais/academicas'
      ],
      examesIniciais: [
        'Polissonografia noturna seguida de MSLT',
        'Dosagem de hipocretina-1 no LCR (se disponivel)',
        'HLA-DQB1*06:02 (associacao em >98% dos casos)',
        'RM de cranio (excluir lesoes hipotalamicas)'
      ],
      redFlags: [
        'Sonolencia extrema com acidentes',
        'Cataplexia com quedas e lesoes',
        'Status cataplecticus',
        'Depressao comorbida',
        'Sintomas em criancas (apresentacao atipica)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '25-50/100.000 (tipo 1 + tipo 2)',
        incidencia: '0,74/100.000/ano',
        faixaEtaria: 'Pico bimodal: 15 anos e 35 anos',
        fatoresRisco: [
          'Predisposicao genetica (HLA-DQB1*06:02)',
          'Infeccoes (H1N1, estreptococo)',
          'Vacinacao H1N1 (Pandemrix na Europa)',
          'Historia familiar (1-2% dos casos)'
        ],
        citations: [{ refId: 'lancet-neurol-narcolepsy-2019' }]
      },
      fisiopatologia: {
        texto: 'Destruicao autoimune seletiva dos neuronios produtores de hipocretina/orexina no hipotalamo lateral. A deficiencia de hipocretina desestabiliza o controle sono-vigilia, causando intrusoes de sono REM na vigilia (cataplexia, paralisia do sono, alucinacoes).',
        citations: [{ refId: 'nature-narcolepsy-2018' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sonolencia excessiva diurna (sintoma cardinal)',
          'Cataplexia (patognomonico do tipo 1)',
          'Paralisia do sono',
          'Alucinacoes hipnagogicas/hipnopompicas',
          'Sono noturno fragmentado'
        ],
        sinaisExameFisico: [
          'Exame neurologico geralmente normal',
          'Episodios de cataplexia podem ser observados',
          'Obesidade comum (deficiencia de orexina)'
        ],
        formasClinicas: [
          'Tipo 1: com cataplexia / hipocretina baixa',
          'Tipo 2: sem cataplexia / hipocretina normal',
          'Narcolepsia secundaria (lesoes hipotalamicas)'
        ],
        citations: [{ refId: 'icsd3-aasm-2014' }]
      },
      diagnostico: {
        criterios: [
          'Sonolencia excessiva diurna >=3 meses',
          'Cataplexia definida (perda bilateral do tonus com emocao)',
          'MSLT: latencia media <=8 min E >=2 SOREMPs',
          'OU Hipocretina-1 LCR <=110 pg/mL'
        ],
        diagnosticoDiferencial: [
          'Narcolepsia tipo 2',
          'Hipersonia idiopatica',
          'Sindrome da apneia do sono',
          'Privacao cronica de sono',
          'Hipersonia por condicao medica',
          'Sindrome de Kleine-Levin'
        ],
        examesLaboratoriais: [
          'Hipocretina-1 no LCR (<110 pg/mL = diagnostico)',
          'HLA-DQB1*06:02 (positivo em >98%)'
        ],
        outrosExames: [
          'PSG noturna + MSLT',
          'RM cranio (excluir lesoes)',
          'Escala de Sonolencia de Epworth (ESS)'
        ],
        citations: [{ refId: 'aasm-narcolepsy-2021' }]
      },
      tratamento: {
        objetivos: [
          'Reduzir sonolencia diurna',
          'Controlar cataplexia',
          'Melhorar qualidade de vida',
          'Permitir funcionamento normal'
        ],
        naoFarmacologico: {
          medidas: [
            'Cochilos programados (15-20 min)',
            'Higiene do sono estrita',
            'Educacao sobre a doenca',
            'Restricoes para direcao veicular',
            'Suporte psicossocial e grupos de apoio'
          ],
          citations: [{ refId: 'aasm-narcolepsy-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Promotores de vigilia',
              medicamentos: ['Modafinila', 'Armodafinila'],
              posologia: 'Modafinila 100-400mg/dia em 1-2 tomadas',
              observacoes: 'Primeira linha para sonolencia; poucos efeitos adversos'
            },
            {
              classe: 'Oxibato de sodio',
              medicamentos: ['Oxibato de sodio'],
              posologia: '4,5-9g/noite dividido em 2 doses',
              observacoes: 'Unico que trata sonolencia E cataplexia; controle restrito'
            }
          ],
          segundaLinha: [
            {
              classe: 'Psicoestimulantes',
              medicamentos: ['Metilfenidato', 'Anfetaminas'],
              posologia: 'Metilfenidato 10-60mg/dia',
              observacoes: 'Eficazes, porem maior potencial de abuso'
            },
            {
              classe: 'Antidepressivos (para cataplexia)',
              medicamentos: ['Venlafaxina', 'Fluoxetina', 'Clomipramina'],
              posologia: 'Venlafaxina 75-225mg/dia',
              observacoes: 'Suprimem REM; nao tratam sonolencia'
            },
            {
              classe: 'Antagonista H3',
              medicamentos: ['Pitolisant'],
              posologia: '9-36mg/dia pela manha',
              observacoes: 'Mecanismo inovador; aprovado para sonolencia e cataplexia'
            }
          ],
          situacoesEspeciais: [
            { situacao: 'Gestacao', conduta: 'Descontinuar medicacoes se possivel; cochilos programados' },
            { situacao: 'Criancas', conduta: 'Modafinila off-label; ajuste de dose por peso' }
          ],
          citations: [{ refId: 'aan-narcolepsy-2021' }]
        },
        duracao: 'Tratamento cronico; ajustes conforme resposta'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal no inicio; trimestral apos estabilizacao',
        examesControle: [
          'Escala de Sonolencia de Epworth (ESS)',
          'Diario de cataplexia',
          'Avaliacao de efeitos adversos'
        ],
        metasTerapeuticas: [
          'ESS <10',
          'Reducao >=50% da cataplexia',
          'Manutencao de atividades ocupacionais'
        ],
        criteriosEncaminhamento: [
          'Todos: neurologista/especialista em sono',
          'Refratariedade a tratamento',
          'Necessidade de oxibato de sodio'
        ],
        citations: [{ refId: 'aasm-narcolepsy-2021' }]
      },
      prevencao: {
        primaria: [
          'Nao ha prevencao conhecida',
          'Aconselhamento genetico limitado (baixa hereditariedade)'
        ],
        secundaria: [
          'Diagnostico precoce',
          'Tratamento adequado para prevenir acidentes'
        ],
        citations: [{ refId: 'lancet-neurol-narcolepsy-2019' }]
      }
    },
    protocolos: ['narcolepsia-manejo'],
    medicamentos: ['modafinila', 'oxibato-sodio', 'metilfenidato', 'venlafaxina'],
    calculadoras: ['epworth-sleepiness-scale'],
    rastreamentos: [],
    citations: [
      { refId: 'aasm-narcolepsy-2021' },
      { refId: 'lancet-neurol-narcolepsy-2019' },
      { refId: 'icsd3-aasm-2014' }
    ],
    lastUpdate: '2025-01',
    tags: ['narcolepsia', 'cataplexia', 'hipocretina', 'sonolencia', 'dsm5']
  },

  // ============================================================================
  // 3. NARCOLEPSIA TIPO 2 (SEM CATAPLEXIA)
  // ============================================================================
  {
    id: 'narcolepsia-tipo-2',
    titulo: 'Narcolepsia Tipo 2',
    sinonimos: ['Narcolepsia sem Cataplexia', 'Narcolepsy Type 2', 'Narcolepsia com Hipocretina Normal'],
    doid: 'DOID:8986',
    snomedCT: '230495002',
    meshId: 'D009290',
    umlsCui: 'C0751781',
    ciap2: ['P06'],
    cid10: ['G47.419'],
    cid11: ['7A20.1'],
    categoria: 'saude_mental',
    subcategoria: 'transtornos_sono',
    quickView: {
      definicao: 'Transtorno de hipersonolencia com sonolencia excessiva diurna, MSLT positivo, porem sem cataplexia e com niveis normais de hipocretina-1 no LCR. Pode evoluir para tipo 1 em alguns casos.',
      criteriosDiagnosticos: [
        'Sonolencia excessiva diurna por >=3 meses',
        'MSLT: latencia media <=8 min + >=2 SOREMPs',
        'Cataplexia AUSENTE',
        'Hipocretina-1 no LCR >110 pg/mL (ou nao dosada)',
        'Nao melhor explicado por outro transtorno, substancia ou condicao medica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cochilos programados (15-20 min)',
          'Higiene do sono rigorosa',
          'Evitar privacao de sono',
          'Orientacoes sobre direcao veicular'
        ],
        farmacologico: [
          'Modafinila 100-400mg/dia (primeira linha)',
          'Armodafinila 150-250mg/dia',
          'Alternativas: Metilfenidato 10-60mg/dia',
          'Pitolisant 9-36mg/dia'
        ]
      },
      metasTerapeuticas: [
        'Reducao da sonolencia (ESS <10)',
        'Melhora funcional',
        'Seguranca para direcao e trabalho'
      ],
      examesIniciais: [
        'PSG noturna seguida de MSLT',
        'Escala de Sonolencia de Epworth',
        'HLA-DQB1*06:02 (positivo em ~40%)',
        'Hipocretina-1 no LCR (opcional, para confirmar tipo 2)'
      ],
      redFlags: [
        'Desenvolvimento de cataplexia (reclassificar para tipo 1)',
        'Acidentes relacionados a sonolencia',
        'Refratariedade ao tratamento',
        'Surgimento de outros sintomas neurologicos'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '20-30% dos casos de narcolepsia',
        faixaEtaria: 'Similar ao tipo 1, pico na adolescencia',
        fatoresRisco: [
          'HLA-DQB1*06:02 (menos forte que tipo 1, ~40%)',
          'Historia familiar em poucos casos',
          'Etiologia menos clara que tipo 1'
        ],
        citations: [{ refId: 'sleep-narcolepsy-type2-2020' }]
      },
      fisiopatologia: {
        texto: 'Fisiopatologia incerta. Hipocretina-1 normal ou levemente reduzida. Pode representar forma incompleta de narcolepsia tipo 1, destruicao parcial de neuronios hipocretinergicos, ou entidade distinta. 10-25% evoluem para tipo 1.',
        citations: [{ refId: 'lancet-neurol-narcolepsy-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sonolencia excessiva diurna (menos intensa que tipo 1)',
          'Paralisia do sono (menos frequente)',
          'Alucinacoes hipnagogicas (menos frequente)',
          'Sono noturno fragmentado',
          'Ausencia de cataplexia'
        ],
        sinaisExameFisico: [
          'Exame neurologico normal',
          'Sem episodios de cataplexia'
        ],
        formasClinicas: [
          'Narcolepsia tipo 2 classica',
          'Transicao para tipo 1 (se desenvolver cataplexia)'
        ],
        citations: [{ refId: 'icsd3-aasm-2014' }]
      },
      diagnostico: {
        criterios: [
          'Sonolencia excessiva >=3 meses',
          'MSLT: latencia <=8 min E >=2 SOREMPs',
          'Ausencia de cataplexia',
          'Hipocretina-1 LCR >110 pg/mL ou nao testada'
        ],
        diagnosticoDiferencial: [
          'Narcolepsia tipo 1 (cataplexia sutil)',
          'Hipersonia idiopatica',
          'Sindrome da apneia do sono',
          'Privacao cronica de sono',
          'Hipersonia por medicamentos'
        ],
        outrosExames: [
          'PSG + MSLT (obrigatorio)',
          'HLA tipagem',
          'Actigrafia'
        ],
        citations: [{ refId: 'aasm-narcolepsy-2021' }]
      },
      tratamento: {
        objetivos: [
          'Controlar sonolencia diurna',
          'Manter funcionalidade',
          'Prevenir acidentes'
        ],
        naoFarmacologico: {
          medidas: [
            'Cochilos programados',
            'Regularidade do sono',
            'Educacao sobre a doenca',
            'Restricoes de atividades de risco'
          ],
          citations: [{ refId: 'aasm-narcolepsy-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Promotores de vigilia',
              medicamentos: ['Modafinila', 'Armodafinila'],
              posologia: 'Modafinila 100-400mg/dia',
              observacoes: 'Primeira linha; nao trata cataplexia (que nao existe)'
            }
          ],
          segundaLinha: [
            {
              classe: 'Psicoestimulantes',
              medicamentos: ['Metilfenidato', 'Anfetaminas'],
              posologia: 'Metilfenidato 10-60mg/dia',
              observacoes: 'Reservado para refratarios'
            },
            {
              classe: 'Antagonista H3',
              medicamentos: ['Pitolisant'],
              posologia: '9-36mg/dia',
              observacoes: 'Alternativa eficaz'
            }
          ],
          citations: [{ refId: 'aan-narcolepsy-2021' }]
        },
        duracao: 'Cronico'
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral apos estabilizacao',
        examesControle: [
          'ESS periodicamente',
          'Monitorar surgimento de cataplexia'
        ],
        metasTerapeuticas: [
          'ESS <10',
          'Funcionamento normal'
        ],
        criteriosEncaminhamento: [
          'Especialista em sono para diagnostico',
          'Refratariedade',
          'Desenvolvimento de cataplexia'
        ],
        citations: [{ refId: 'aasm-narcolepsy-2021' }]
      },
      prevencao: {
        primaria: [
          'Nao ha prevencao conhecida'
        ],
        secundaria: [
          'Diagnostico precoce',
          'Monitoramento para evolucao para tipo 1'
        ],
        citations: [{ refId: 'sleep-narcolepsy-type2-2020' }]
      }
    },
    protocolos: ['narcolepsia-manejo'],
    medicamentos: ['modafinila', 'armodafinila', 'metilfenidato'],
    calculadoras: ['epworth-sleepiness-scale'],
    rastreamentos: [],
    citations: [
      { refId: 'aasm-narcolepsy-2021' },
      { refId: 'icsd3-aasm-2014' },
      { refId: 'sleep-narcolepsy-type2-2020' }
    ],
    lastUpdate: '2025-01',
    tags: ['narcolepsia', 'tipo2', 'hipersonolencia', 'dsm5']
  },

  // ============================================================================
  // 4. APNEIA OBSTRUTIVA DO SONO
  // ============================================================================
  {
    id: 'apneia-obstrutiva-sono',
    titulo: 'Apneia Obstrutiva do Sono',
    sinonimos: ['SAOS', 'OSA', 'Obstructive Sleep Apnea', 'Sindrome da Apneia Obstrutiva do Sono'],
    doid: 'DOID:0050847',
    snomedCT: '78275009',
    meshId: 'D020181',
    umlsCui: 'C0520679',
    ciap2: ['R29'],
    cid10: ['G47.33'],
    cid11: ['7A40.0'],
    categoria: 'saude_mental',
    subcategoria: 'transtornos_sono',
    quickView: {
      definicao: 'Transtorno respiratorio do sono caracterizado por episodios repetitivos de obstrucao parcial (hipopneia) ou completa (apneia) da via aerea superior durante o sono, levando a dessaturacao e despertares.',
      criteriosDiagnosticos: [
        'PSG/HST: IAH >=5 eventos/hora + sintomas OU',
        'IAH >=15 eventos/hora (mesmo assintomatico)',
        'Sintomas: ronco, pausas respiratorias testemunhadas, sonolencia diurna',
        'Classificacao: Leve (5-14), Moderada (15-29), Grave (>=30)',
        'Excluir apneia central predominante'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'CPAP (pressao positiva continua) - padrao-ouro',
          'Perda de peso (se IMC elevado)',
          'Evitar alcool e sedativos',
          'Posicao lateral para dormir (casos posicionais)',
          'Dispositivo de avanco mandibular (leve/moderada)'
        ],
        farmacologico: [
          'Nao ha tratamento farmacologico eficaz para SAOS',
          'Tratar comorbidades (HAS, DM)',
          'Modafinila para sonolencia residual em uso de CPAP'
        ]
      },
      metasTerapeuticas: [
        'IAH <5 eventos/hora com tratamento',
        'Resolucao da sonolencia (ESS <10)',
        'Resolucao do ronco',
        'Controle de comorbidades cardiovasculares'
      ],
      examesIniciais: [
        'Polissonografia (PSG) - padrao-ouro',
        'Teste domiciliar de apneia (HST) - alternativa',
        'Epworth Sleepiness Scale',
        'STOP-BANG (triagem)',
        'Avaliacao otorrinolaringologica'
      ],
      redFlags: [
        'Sonolencia extrema com acidentes',
        'Arritmias noturnas',
        'Insuficiencia cardiaca refrataria',
        'Hipertensao resistente',
        'Dessaturacao grave (SpO2 <80%)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '9-38% em adultos; ate 90% nao diagnosticados',
        incidencia: 'Aumenta com idade e obesidade',
        mortalidade: 'SAOS grave nao tratada aumenta risco cardiovascular',
        faixaEtaria: 'Pico 40-70 anos; mais comum em homens ate menopausa',
        fatoresRisco: [
          'Obesidade (IMC >30)',
          'Sexo masculino',
          'Idade avancada',
          'Circunferencia cervical >40cm (mulheres) ou >43cm (homens)',
          'Anormalidades craniofaciais',
          'Uso de alcool/sedativos'
        ],
        citations: [{ refId: 'lancet-sleep-apnea-2021' }]
      },
      fisiopatologia: {
        texto: 'Colapso repetitivo da via aerea superior durante o sono por desequilibrio entre pressao negativa inspiratoria e tono muscular faringeo. Resulta em hipoxia intermitente, hipercapnia, despertares recorrentes e ativacao simpatica, levando a consequencias cardiovasculares e metabolicas.',
        citations: [{ refId: 'nejm-osa-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Ronco alto e frequente',
          'Pausas respiratorias testemunhadas',
          'Sonolencia excessiva diurna',
          'Sono nao reparador',
          'Cefaleia matinal',
          'Nocturia'
        ],
        sinaisExameFisico: [
          'Obesidade, IMC elevado',
          'Circunferencia cervical aumentada',
          'Retrognastia, micrognatia',
          'Hipertrofia de amigdalas/uvula',
          'Escala de Mallampati elevada',
          'Hipertensao arterial'
        ],
        formasClinicas: [
          'SAOS leve (IAH 5-14)',
          'SAOS moderada (IAH 15-29)',
          'SAOS grave (IAH >=30)',
          'SAOS posicional',
          'SAOS REM-relacionada'
        ],
        citations: [{ refId: 'aasm-osa-guidelines-2022' }]
      },
      diagnostico: {
        criterios: [
          'IAH >=5 + sintomas (ronco, sonolencia, pausas) OU',
          'IAH >=15 independente de sintomas',
          'PSG laboratorial ou HST domiciliar'
        ],
        diagnosticoDiferencial: [
          'Apneia central do sono',
          'Sindrome de hipoventilacao por obesidade',
          'Ronco primario',
          'Sindrome de resistencia de via aerea superior',
          'Hipersonia por outra causa'
        ],
        examesLaboratoriais: [
          'Glicemia, HbA1c',
          'Perfil lipidico',
          'TSH',
          'Hemograma (policitemia)'
        ],
        examesImagem: [
          'Nasofibrolaringoscopia (avaliar via aerea)',
          'Cefalometria (se planejamento cirurgico)'
        ],
        outrosExames: [
          'PSG tipo 1 (laboratorial) - padrao-ouro',
          'HST tipo 3 (domiciliar) - alta probabilidade pre-teste',
          'Oximetria noturna (triagem)'
        ],
        citations: [{ refId: 'aasm-osa-guidelines-2022' }]
      },
      tratamento: {
        objetivos: [
          'Eliminar eventos obstrutivos',
          'Resolver sintomas',
          'Reduzir risco cardiovascular'
        ],
        naoFarmacologico: {
          medidas: [
            'CPAP/APAP (primeira linha para moderada/grave)',
            'Dispositivo de avanco mandibular (DAM) para leve/moderada',
            'Perda de peso (10% reduz IAH em 26%)',
            'Terapia posicional (se SAOS posicional)',
            'Cirurgia de via aerea (casos selecionados)',
            'Estimulacao do nervo hipoglosso (Inspire)'
          ],
          citations: [{ refId: 'ats-cpap-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Sem tratamento farmacologico eficaz para SAOS',
              medicamentos: [],
              observacoes: 'CPAP e o tratamento padrao'
            }
          ],
          segundaLinha: [
            {
              classe: 'Promotores de vigilia (sonolencia residual)',
              medicamentos: ['Modafinila', 'Armodafinila'],
              posologia: 'Modafinila 200mg/dia',
              observacoes: 'Apenas para sonolencia residual em pacientes aderentes ao CPAP'
            }
          ],
          situacoesEspeciais: [
            { situacao: 'SAOS + insuficiencia cardiaca', conduta: 'CPAP; considerar ASV se apneia central emerge' },
            { situacao: 'Intolerancia ao CPAP', conduta: 'DAM, cirurgia, ou estimulacao do hipoglosso' }
          ],
          citations: [{ refId: 'aasm-osa-guidelines-2022' }]
        },
        duracao: 'Tratamento cronico'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal ate adesao ao CPAP; depois semestral',
        examesControle: [
          'Download do CPAP (adesao, IAH residual)',
          'ESS periodicamente',
          'Controle de comorbidades'
        ],
        metasTerapeuticas: [
          'IAH residual <5',
          'Uso de CPAP >=4h/noite em >=70% das noites',
          'ESS <10'
        ],
        criteriosEncaminhamento: [
          'Todos: especialista em sono para diagnostico',
          'Intolerancia ao CPAP: otorrino, odonto do sono',
          'SAOS grave refrataria'
        ],
        citations: [{ refId: 'aasm-osa-guidelines-2022' }]
      },
      prevencao: {
        primaria: [
          'Manutencao de peso saudavel',
          'Evitar alcool antes de dormir',
          'Atividade fisica regular'
        ],
        secundaria: [
          'Triagem em populacoes de risco (obesos, diabeticos, HAS resistente)',
          'STOP-BANG para triagem'
        ],
        citations: [{ refId: 'lancet-sleep-apnea-2021' }]
      }
    },
    protocolos: ['saos-manejo-cpap'],
    medicamentos: ['modafinila'],
    calculadoras: ['stop-bang', 'epworth-sleepiness-scale', 'iah-calculator'],
    rastreamentos: [],
    citations: [
      { refId: 'aasm-osa-guidelines-2022' },
      { refId: 'lancet-sleep-apnea-2021' },
      { refId: 'nejm-osa-2019' }
    ],
    lastUpdate: '2025-01',
    tags: ['apneia', 'saos', 'cpap', 'ronco', 'sono']
  },

  // ============================================================================
  // 5. APNEIA CENTRAL DO SONO
  // ============================================================================
  {
    id: 'apneia-central-sono',
    titulo: 'Apneia Central do Sono',
    sinonimos: ['CSA', 'Central Sleep Apnea', 'Apneia de Cheyne-Stokes'],
    doid: 'DOID:9220',
    snomedCT: '230493009',
    meshId: 'D020182',
    umlsCui: 'C0520680',
    ciap2: ['R29'],
    cid10: ['G47.31'],
    cid11: ['7A41'],
    categoria: 'saude_mental',
    subcategoria: 'transtornos_sono',
    quickView: {
      definicao: 'Transtorno respiratorio do sono caracterizado por pausas respiratorias decorrentes de falha transitoria do drive respiratorio central, sem obstrucao de via aerea. Frequentemente associado a insuficiencia cardiaca ou uso de opioides.',
      criteriosDiagnosticos: [
        'PSG: IAH >=5 com predominio de eventos centrais (>50%)',
        'Respiracao de Cheyne-Stokes: padrao crescendo-decrescendo',
        'Sonolencia diurna, despertares noturnos, dispneia',
        'Associacao comum com ICC, AVC, opioides',
        'Ausencia de obstrucao como evento primario'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Otimizar tratamento da causa (ICC, neurologia)',
          'CPAP pode piorar ou melhorar (depende do caso)',
          'ASV (ventilacao servo-adaptativa) - controverso em ICC com FE <45%',
          'Oxigenoterapia noturna',
          'Reduzir/eliminar opioides se possivel'
        ],
        farmacologico: [
          'Acetazolamida 250-500mg/dia (aumenta drive respiratorio)',
          'Teofilina 200-400mg a noite (limitado)',
          'Otimizar farmacoterapia da ICC'
        ]
      },
      metasTerapeuticas: [
        'Reducao do IAH',
        'Melhora dos sintomas',
        'Otimizacao da condicao de base'
      ],
      examesIniciais: [
        'Polissonografia (distinguir de SAOS)',
        'Ecocardiograma (avaliar FE)',
        'BNP/NT-proBNP',
        'RM/TC cranio se suspeita neurologica'
      ],
      redFlags: [
        'ICC descompensada',
        'Dessaturacao grave',
        'AVC recente',
        'Uso de altas doses de opioides',
        'Piora com CPAP (apneia complexa)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,9% populacao geral; 30-40% em ICC com FE reduzida',
        faixaEtaria: 'Mais comum em idosos',
        fatoresRisco: [
          'Insuficiencia cardiaca (FE reduzida)',
          'Fibrilacao atrial',
          'AVC',
          'Uso de opioides cronicos',
          'Altitude elevada',
          'Condicoes neurologicas'
        ],
        citations: [{ refId: 'jacc-csa-heart-failure-2020' }]
      },
      fisiopatologia: {
        texto: 'Instabilidade do controle ventilatório central. Na ICC, a congestao pulmonar e tempo circulatorio prolongado causam atraso no feedback quimiorreceptor, gerando oscilacao entre hiper e hipoventilacao (Cheyne-Stokes). Opioides deprimem diretamente o centro respiratorio.',
        citations: [{ refId: 'chest-csa-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Despertares noturnos frequentes',
          'Dispneia paroxistica noturna',
          'Sonolencia diurna (menos proeminente que SAOS)',
          'Insonia',
          'Fadiga'
        ],
        sinaisExameFisico: [
          'Sinais de ICC (edema, B3, estase jugular)',
          'Exame neurologico se causa central',
          'Geralmente sem obesidade associada'
        ],
        formasClinicas: [
          'CSA com Cheyne-Stokes (ICC)',
          'CSA por condicao medica (AVC, tumor)',
          'CSA por opioides',
          'CSA idiopatica',
          'CSA emergente de tratamento (apneia complexa)'
        ],
        citations: [{ refId: 'icsd3-aasm-2014' }]
      },
      diagnostico: {
        criterios: [
          'IAH >=5 com >50% eventos centrais',
          'Ou padrao de Cheyne-Stokes na PSG',
          'Sintomas de perturbacao do sono'
        ],
        diagnosticoDiferencial: [
          'Apneia obstrutiva do sono',
          'Apneia complexa (mista)',
          'Hipoventilacao central',
          'Dispneia paroxistica noturna por ICC'
        ],
        examesLaboratoriais: [
          'BNP/NT-proBNP',
          'Gasometria arterial',
          'Funcao renal'
        ],
        examesImagem: [
          'Ecocardiograma',
          'RM cranio se causa neurologica'
        ],
        outrosExames: [
          'PSG com EEG, ECG, fluxo, esforco'
        ],
        citations: [{ refId: 'aasm-csa-2016' }]
      },
      tratamento: {
        objetivos: [
          'Tratar causa de base',
          'Reduzir eventos centrais',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Otimizar tratamento da ICC (diureticos, IECA/BRA, BB)',
            'CPAP (pode ser eficaz em alguns casos)',
            'ASV (contraindicado se FE <45% - estudo SERVE-HF)',
            'Oxigenoterapia suplementar noturna',
            'Reducao/desmame de opioides'
          ],
          citations: [{ refId: 'nejm-serve-hf-2015' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Estimulantes respiratorios',
              medicamentos: ['Acetazolamida'],
              posologia: '250-500mg ao deitar',
              observacoes: 'Aumenta drive por acidose metabolica; monitorar K+'
            }
          ],
          segundaLinha: [
            {
              classe: 'Metilxantinas',
              medicamentos: ['Teofilina'],
              posologia: '200-400mg a noite',
              observacoes: 'Evidencia limitada; efeitos adversos frequentes'
            }
          ],
          situacoesEspeciais: [
            { situacao: 'ICC com FE <45%', conduta: 'NAO usar ASV (risco de morte - SERVE-HF); otimizar ICC' },
            { situacao: 'CSA por opioides', conduta: 'Reducao de opioide; ASV pode ser considerado' }
          ],
          citations: [{ refId: 'chest-csa-2019' }]
        },
        duracao: 'Cronico enquanto persistir fator causal'
      },
      acompanhamento: {
        frequenciaConsultas: 'Conforme a condicao de base; minimo trimestral',
        examesControle: [
          'PSG de seguimento',
          'Ecocardiograma periodico',
          'BNP'
        ],
        metasTerapeuticas: [
          'Reducao do IAH',
          'Melhora da ICC',
          'Qualidade do sono'
        ],
        criteriosEncaminhamento: [
          'Cardiologia para ICC',
          'Especialista em sono',
          'Neurologia se causa central'
        ],
        citations: [{ refId: 'jacc-csa-heart-failure-2020' }]
      },
      prevencao: {
        primaria: [
          'Prevencao e tratamento adequado de ICC',
          'Uso criterioso de opioides'
        ],
        secundaria: [
          'Triagem de apneia em pacientes com ICC',
          'Monitoramento de pacientes em uso cronico de opioides'
        ],
        citations: [{ refId: 'chest-csa-2019' }]
      }
    },
    protocolos: ['apneia-central-manejo'],
    medicamentos: ['acetazolamida'],
    calculadoras: ['epworth-sleepiness-scale'],
    rastreamentos: [],
    citations: [
      { refId: 'aasm-csa-2016' },
      { refId: 'jacc-csa-heart-failure-2020' },
      { refId: 'nejm-serve-hf-2015' }
    ],
    lastUpdate: '2025-01',
    tags: ['apneia', 'central', 'cheyne-stokes', 'icc', 'opioides']
  },

  // ============================================================================
  // 6. SINDROME DAS PERNAS INQUIETAS
  // ============================================================================
  {
    id: 'sindrome-pernas-inquietas',
    titulo: 'Sindrome das Pernas Inquietas',
    sinonimos: ['SPI', 'RLS', 'Restless Legs Syndrome', 'Doenca de Willis-Ekbom'],
    doid: 'DOID:0050425',
    snomedCT: '32914008',
    meshId: 'D012148',
    umlsCui: 'C0035258',
    ciap2: ['N04'],
    cid10: ['G25.81'],
    cid11: ['8A05.Y'],
    categoria: 'saude_mental',
    subcategoria: 'transtornos_sono',
    quickView: {
      definicao: 'Transtorno sensoriomotor caracterizado por urgencia irresistivel de mover as pernas, acompanhada de sensacoes desconfortaveis, que piora em repouso e a noite, e alivia com movimento. Causa significativo prejuizo ao sono.',
      criteriosDiagnosticos: [
        'Urgencia de mover as pernas, geralmente com sensacoes desconfortaveis',
        'Sintomas iniciam ou pioram durante repouso/inatividade',
        'Alivio parcial ou total com movimento',
        'Sintomas pioram a noite/anoitecer',
        'Nao melhor explicado por outra condicao (caimbras, desconforto posicional)',
        'Causa sofrimento clinicamente significativo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Corrigir deficiencia de ferro (ferritina <75 ng/mL)',
          'Higiene do sono',
          'Evitar cafeina, alcool, nicotina',
          'Exercicio moderado (nao proximo ao sono)',
          'Compressao pneumatica, massagem'
        ],
        farmacologico: [
          'LEVE/INTERMITENTE: Gabapentina 300-900mg a noite',
          'MODERADA/GRAVE: Pregabalina 75-300mg a noite',
          'Alternativas: Agonistas dopaminergicos (pramipexol, ropinirol) - CUIDADO com aumento',
          'Ferro IV se ferritina <75 e sintomas refratarios'
        ]
      },
      metasTerapeuticas: [
        'Reducao da frequencia e intensidade dos sintomas',
        'Melhora do sono',
        'Evitar aumento (augmentation) por dopaminergicos'
      ],
      examesIniciais: [
        'Ferritina serica (<75 = tratar)',
        'Saturacao de transferrina',
        'Funcao renal (DRC e causa comum)',
        'Hemograma',
        'Glicemia, TSH'
      ],
      redFlags: [
        'Ferritina muito baixa (<30)',
        'Aumento (augmentation) com dopaminergicos',
        'Sintomas unilaterais ou assimetricos (excluir neuropatia)',
        'DRC grave',
        'Gestacao (pode exacerbar)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '5-15% da populacao adulta; mais comum em mulheres',
        faixaEtaria: 'Pode iniciar em qualquer idade; piora com idade',
        fatoresRisco: [
          'Deficiencia de ferro (ferritina <75)',
          'DRC/dialise',
          'Gestacao (principalmente 3o trimestre)',
          'Neuropatia periferica',
          'Historia familiar (40-60% dos casos)',
          'Uso de antidepressivos, antipsicóticos, anti-histamínicos'
        ],
        citations: [{ refId: 'sleep-rls-guidelines-2021' }]
      },
      fisiopatologia: {
        texto: 'Disfuncao dopaminergica central combinada com deficiencia de ferro cerebral. O ferro e cofator da tirosina hidroxilase, essencial para sintese de dopamina. Alteracoes no metabolismo do ferro no SNC e em receptores D2/D3 contribuem para a fisiopatologia.',
        citations: [{ refId: 'lancet-neurol-rls-2018' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sensacoes desconfortaveis nas pernas (formigamento, queimacao, "insetos rastejando")',
          'Urgencia irresistivel de mover',
          'Piora em repouso',
          'Piora a noite',
          'Alivio com movimento',
          'Insonia (dificuldade de iniciar sono)'
        ],
        sinaisExameFisico: [
          'Exame neurologico geralmente normal',
          'Pode haver movimentos periodicos das pernas durante exame',
          'Excluir neuropatia periferica'
        ],
        formasClinicas: [
          'SPI primaria/idiopatica',
          'SPI secundaria (deficiencia de ferro, DRC, gestacao)',
          'SPI intermitente vs persistente'
        ],
        citations: [{ refId: 'irlssg-diagnostic-criteria-2014' }]
      },
      diagnostico: {
        criterios: [
          'Criterios IRLSSG: 5 criterios essenciais',
          'Urgencia + repouso + alivio com movimento + piora noturna + exclusao de mimetizadores',
          'Diagnostico clinico (nao requer PSG)'
        ],
        diagnosticoDiferencial: [
          'Caimbras noturnas',
          'Neuropatia periferica',
          'Acatisia (por antipsicoticos)',
          'Claudicacao venosa/arterial',
          'Ansiedade com inquietacao'
        ],
        examesLaboratoriais: [
          'Ferritina (alvo >75 ng/mL)',
          'Saturacao de transferrina',
          'Funcao renal',
          'Glicemia, HbA1c',
          'B12, folato'
        ],
        outrosExames: [
          'PSG com eletromiografia: detecta PLMS (80% dos pacientes)',
          'Eletroneuromiografia se suspeita de neuropatia'
        ],
        citations: [{ refId: 'sleep-rls-guidelines-2021' }]
      },
      tratamento: {
        objetivos: [
          'Aliviar sintomas',
          'Melhorar sono',
          'Evitar aumento (augmentation)'
        ],
        naoFarmacologico: {
          medidas: [
            'Reposicao de ferro se ferritina <75',
            'Evitar cafeina, alcool, nicotina',
            'Exercicio moderado',
            'Massagem, compressao pneumatica',
            'Evitar medicacoes que pioram (antidepressivos, anti-histaminicos)'
          ],
          citations: [{ refId: 'aan-rls-2016' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Ligantes alfa-2-delta',
              medicamentos: ['Gabapentina', 'Pregabalina', 'Gabapentina enacarbil'],
              posologia: 'Gabapentina 300-900mg; Pregabalina 75-300mg a noite',
              observacoes: 'Primeira linha - menor risco de aumento que dopaminergicos'
            },
            {
              classe: 'Ferro',
              medicamentos: ['Sulfato ferroso', 'Ferro IV (carboximaltose ferrica)'],
              posologia: 'Ferro oral ou IV se ferritina <75',
              observacoes: 'Essencial corrigir deficiencia de ferro'
            }
          ],
          segundaLinha: [
            {
              classe: 'Agonistas dopaminergicos',
              medicamentos: ['Pramipexol', 'Ropinirol', 'Rotigotina patch'],
              posologia: 'Pramipexol 0,125-0,5mg; Ropinirol 0,25-4mg a noite',
              observacoes: 'CUIDADO: alto risco de aumento (augmentation) em uso cronico'
            },
            {
              classe: 'Opioides (casos refratarios)',
              medicamentos: ['Oxicodona', 'Metadona'],
              posologia: 'Doses baixas',
              observacoes: 'Reservado para casos graves refratarios'
            }
          ],
          situacoesEspeciais: [
            { situacao: 'Aumento (augmentation)', conduta: 'Reduzir/suspender dopaminergico; trocar para alfa-2-delta ou opioide' },
            { situacao: 'Gestacao', conduta: 'Reposicao de ferro; evitar medicacoes' },
            { situacao: 'DRC/dialise', conduta: 'Otimizar ferro; gabapentina com ajuste de dose' }
          ],
          citations: [{ refId: 'aan-rls-2016' }]
        },
        duracao: 'Cronico para formas persistentes'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal no inicio; trimestral apos estabilizacao',
        examesControle: [
          'Ferritina a cada 3-6 meses',
          'IRLS (escala de gravidade)',
          'Monitorar aumento se usando dopaminergicos'
        ],
        metasTerapeuticas: [
          'Reducao de >=50% nos sintomas',
          'Ferritina >75 ng/mL',
          'Sono restaurado'
        ],
        criteriosEncaminhamento: [
          'Refratariedade',
          'Aumento por dopaminergicos',
          'Necessidade de opioides',
          'Causa secundaria complexa'
        ],
        citations: [{ refId: 'sleep-rls-guidelines-2021' }]
      },
      prevencao: {
        primaria: [
          'Manutencao de niveis adequados de ferro',
          'Evitar medicacoes que exacerbam'
        ],
        secundaria: [
          'Triagem em DRC, gestantes',
          'Tratamento precoce para evitar cronicidade'
        ],
        citations: [{ refId: 'lancet-neurol-rls-2018' }]
      }
    },
    protocolos: ['spi-manejo'],
    medicamentos: ['gabapentina', 'pregabalina', 'pramipexol', 'sulfato-ferroso'],
    calculadoras: ['irls-severity-scale'],
    rastreamentos: [],
    citations: [
      { refId: 'sleep-rls-guidelines-2021' },
      { refId: 'aan-rls-2016' },
      { refId: 'lancet-neurol-rls-2018' }
    ],
    lastUpdate: '2025-01',
    tags: ['pernas-inquietas', 'rls', 'ferro', 'dopamina', 'sono']
  },

  // ============================================================================
  // 7. TRANSTORNO DO RITMO CIRCADIANO - FASE ATRASADA
  // ============================================================================
  {
    id: 'transtorno-ritmo-circadiano-fase-atrasada',
    titulo: 'Transtorno do Ritmo Circadiano - Tipo Fase Atrasada',
    sinonimos: ['DSPD', 'Delayed Sleep Phase Disorder', 'Sindrome da Fase Atrasada do Sono'],
    doid: 'DOID:0050768',
    snomedCT: '39898005',
    meshId: 'D021081',
    umlsCui: 'C0751407',
    ciap2: ['P06'],
    cid10: ['G47.21'],
    cid11: ['7A60.0'],
    categoria: 'saude_mental',
    subcategoria: 'transtornos_sono',
    quickView: {
      definicao: 'Desalinhamento persistente entre o ritmo circadiano endogeno e o horario socialmente desejado, com atraso habitual do inicio do sono e despertar (tipicamente 2-6h). Comum em adolescentes e adultos jovens.',
      criteriosDiagnosticos: [
        'Atraso cronico do inicio do sono em relacao ao horario desejado/convencional',
        'Dificuldade de acordar no horario necessario',
        'Sono normal em qualidade e duracao quando permitido dormir no horario preferido',
        'Presente por >=3 meses',
        'Diario de sono ou actigrafia por >=7 dias confirmando padrao',
        'Nao melhor explicado por outro transtorno ou substancia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cronoterapia (atraso progressivo do horario de sono)',
          'Fototerapia matinal (10.000 lux por 30-60 min ao acordar)',
          'Evitar luz azul a noite (telas, LED)',
          'Higiene do sono rigorosa',
          'Horarios regulares (inclusive fins de semana)'
        ],
        farmacologico: [
          'Melatonina 0,5-5mg 3-5h antes do horario desejado de sono',
          'Melatonina de liberacao prolongada pode ser util',
          'Hipnoticos nao corrigem o ritmo, apenas induzem sono'
        ]
      },
      metasTerapeuticas: [
        'Avancar o horario de sono para o desejado',
        'Conseguir acordar no horario necessario',
        'Manter regularidade'
      ],
      examesIniciais: [
        'Diario de sono por 2 semanas',
        'Actigrafia (se disponivel)',
        'Questionario de cronotipo (Morningness-Eveningness)',
        'Excluir depressao, transtornos de ansiedade'
      ],
      redFlags: [
        'Depressao comorbida grave',
        'Prejuizo funcional significativo (abandono escolar/laboral)',
        'Uso de substancias para "regular" sono',
        'Padrao irregular (nao apenas atrasado)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,13-0,17% populacao geral; 7-16% em adolescentes',
        faixaEtaria: 'Tipico em adolescentes e adultos jovens',
        fatoresRisco: [
          'Adolescencia (atraso fisiologico puberal)',
          'Exposicao a luz artificial a noite',
          'Cronotipo vespertino ("coruja")',
          'Historia familiar',
          'Transtornos psiquiatricos (TDAH, depressao)'
        ],
        citations: [{ refId: 'sleep-circadian-2020' }]
      },
      fisiopatologia: {
        texto: 'Atraso do oscilador circadiano central (nucleo supraquiasmatico) em relacao ao ambiente externo. Pode envolver periodo circadiano endogeno >24h, sensibilidade reduzida a luz matinal, ou sensibilidade aumentada a luz noturna. Componente genetico (PER3, CLOCK).',
        citations: [{ refId: 'lancet-neurol-circadian-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Incapacidade de adormecer no horario convencional',
          'Dificuldade extrema de acordar cedo',
          'Sono normal quando pode seguir horario preferido',
          'Sonolencia diurna se forcado a acordar cedo',
          'Melhora em ferias/fins de semana'
        ],
        sinaisExameFisico: [
          'Exame fisico normal',
          'Paciente pode parecer somnolento em consultas matinais'
        ],
        formasClinicas: [
          'DSPD tipico',
          'DSPD grave (atraso >6h)',
          'DSPD com componente nao-24h (cegueira, etc.)'
        ],
        citations: [{ refId: 'icsd3-aasm-2014' }]
      },
      diagnostico: {
        criterios: [
          'Atraso cronico do sono (>=3 meses)',
          'Confirmacao por diario/actigrafia (>=7 dias)',
          'Sono normal em quantidade e qualidade no horario preferido'
        ],
        diagnosticoDiferencial: [
          'Ma higiene do sono',
          'Insonia cronica',
          'Transtorno de ritmo circadiano nao-24h',
          'Jet lag cronico',
          'Depressao com hipersonia'
        ],
        outrosExames: [
          'Actigrafia por 7-14 dias',
          'DLMO (dim light melatonin onset) - se disponivel'
        ],
        citations: [{ refId: 'aasm-circadian-2015' }]
      },
      tratamento: {
        objetivos: [
          'Alinhar ritmo circadiano com horario desejado',
          'Manter sincronizacao a longo prazo'
        ],
        naoFarmacologico: {
          medidas: [
            'Fototerapia matinal (10.000 lux, 30-60 min)',
            'Restringir luz a noite (oculos bloqueadores de azul)',
            'Cronoterapia (atraso progressivo do horario)',
            'Horarios fixos de sono/vigilia',
            'Exercicio matinal'
          ],
          citations: [{ refId: 'aasm-circadian-2015' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Melatonina exogena',
              medicamentos: ['Melatonina'],
              posologia: '0,5-5mg, 3-5h antes do horario desejado de sono',
              observacoes: 'Avancar progressivamente o horario de administracao'
            }
          ],
          segundaLinha: [
            {
              classe: 'Agonistas de melatonina',
              medicamentos: ['Ramelteon', 'Tasimelteon'],
              posologia: 'Ramelteon 8mg antes de dormir',
              observacoes: 'Alternativa se melatonina ineficaz'
            }
          ],
          situacoesEspeciais: [
            { situacao: 'Adolescentes', conduta: 'Envolver escola; horarios mais tardios ajudam' },
            { situacao: 'Cegueira', conduta: 'Tasimelteon aprovado para nao-24h em cegos' }
          ],
          citations: [{ refId: 'sleep-circadian-2020' }]
        },
        duracao: 'Manutencao cronica de medidas comportamentais; melatonina conforme necessidade'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal no inicio; depois conforme necessidade',
        examesControle: [
          'Diario de sono',
          'Actigrafia de seguimento'
        ],
        metasTerapeuticas: [
          'Horario de sono alinhado com necessidades',
          'Funcionamento diurno normal'
        ],
        criteriosEncaminhamento: [
          'Refratariedade a medidas iniciais',
          'Suspeita de outro transtorno circadiano',
          'Comorbidade psiquiatrica'
        ],
        citations: [{ refId: 'aasm-circadian-2015' }]
      },
      prevencao: {
        primaria: [
          'Higiene de luz (reduzir exposicao noturna)',
          'Horarios regulares desde infancia',
          'Exposicao a luz natural pela manha'
        ],
        secundaria: [
          'Intervencao precoce em adolescentes com atraso',
          'Educacao escolar sobre sono'
        ],
        citations: [{ refId: 'lancet-neurol-circadian-2019' }]
      }
    },
    protocolos: ['ritmo-circadiano-manejo'],
    medicamentos: ['melatonina'],
    calculadoras: ['morningness-eveningness-questionnaire'],
    rastreamentos: [],
    citations: [
      { refId: 'aasm-circadian-2015' },
      { refId: 'sleep-circadian-2020' },
      { refId: 'lancet-neurol-circadiano-2019' }
    ],
    lastUpdate: '2025-01',
    tags: ['ritmo-circadiano', 'fase-atrasada', 'melatonina', 'cronoterapia', 'fototerapia']
  },

  // ============================================================================
  // 8. TRANSTORNO COMPORTAMENTAL DO SONO REM
  // ============================================================================
  {
    id: 'transtorno-comportamental-sono-rem',
    titulo: 'Transtorno Comportamental do Sono REM',
    sinonimos: ['RBD', 'REM Sleep Behavior Disorder', 'Parasonia REM'],
    doid: 'DOID:0080045',
    snomedCT: '230504004',
    meshId: 'D020187',
    umlsCui: 'C0751772',
    ciap2: ['P06'],
    cid10: ['G47.52'],
    cid11: ['7B01.1'],
    categoria: 'saude_mental',
    subcategoria: 'transtornos_sono',
    quickView: {
      definicao: 'Parasonia caracterizada por perda da atonia muscular fisiologica do sono REM, resultando em comportamentos de atuacao de sonhos (falar, gritar, chutar, socar), frequentemente violentos. Forte associacao com futuras sinucleinopatias (Parkinson, DCL).',
      criteriosDiagnosticos: [
        'Episodios repetidos de vocalizacoes e/ou comportamentos motores durante sono REM',
        'Comportamentos correlacionam com conteudo de sonhos vividos',
        'PSG demonstra REM sem atonia (RSWA)',
        'Comportamentos causam lesoes, perturbam sono, ou causam sofrimento',
        'Nao atribuivel a outro transtorno, substancia ou medicacao'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Seguranca do ambiente (colchao no chao, afastar moveis)',
          'Parceiro dormir em cama separada se necessario',
          'Evitar privacao de sono',
          'Suspender antidepressivos se possivel (podem causar/exacerbar)',
          'Evitar alcool'
        ],
        farmacologico: [
          'Clonazepam 0,5-2mg ao deitar (primeira linha, eficacia ~90%)',
          'Melatonina 3-12mg ao deitar (alternativa, menos efeitos adversos)',
          'Combinacao pode ser usada'
        ]
      },
      metasTerapeuticas: [
        'Eliminar comportamentos de risco/lesoes',
        'Reduzir frequencia e intensidade dos episodios',
        'Monitorar sinais de sinucleinopatia'
      ],
      examesIniciais: [
        'PSG com video e EMG (RSWA)',
        'Avaliacao neurologica (parkinsonismo)',
        'Teste do olfato (hiposmia precoce)',
        'RM cranio (excluir lesoes)',
        'Revisao de medicacoes (antidepressivos)'
      ],
      redFlags: [
        'Lesoes por comportamentos noturnos',
        'Sinais de parkinsonismo (bradicinesia, rigidez)',
        'Declinio cognitivo',
        'Disautonomia (constipacao, hipotensao)',
        'Inicio em jovem (<50 anos) - investigar causa secundaria'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,38-0,5% populacao geral; 7-8% em >60 anos',
        incidencia: 'Aumenta com idade',
        faixaEtaria: 'Tipico >50 anos; homens 9:1',
        fatoresRisco: [
          'Sexo masculino',
          'Idade >50 anos',
          'Uso de antidepressivos (ISRS, IRSN)',
          'Sinucleinopatias (Parkinson, DCL, AMS)',
          'Narcolepsia',
          'Lesoes de tronco cerebral'
        ],
        citations: [{ refId: 'lancet-neurol-rbd-2018' }]
      },
      fisiopatologia: {
        texto: 'Disfuncao dos circuitos de tronco cerebral que geram atonia durante REM (sublaterodorsal nucleus, nucleo magnocelular). Em RBD idiopatico, representa provavelmente fase prodromica de sinucleinopatia (acumulo de alfa-sinucleina), com >80% convertendo em Parkinson/DCL em 10-15 anos.',
        citations: [{ refId: 'brain-rbd-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Comportamentos durante sono (falar, gritar, chutar, socar)',
          'Atuacao de sonhos vividos (frequentemente violentos)',
          'Parceiro relata movimentacao anormal',
          'Paciente pode lembrar sonhos correspondentes',
          'Lesoes (proprias ou do parceiro)'
        ],
        sinaisExameFisico: [
          'Exame neurologico pode ser normal',
          'Buscar sinais sutis de parkinsonismo',
          'Testar olfato (hiposmia)',
          'Avaliar disautonomia'
        ],
        formasClinicas: [
          'RBD idiopatico (prodromal de sinucleinopatia)',
          'RBD secundario (lesao tronco, narcolepsia)',
          'RBD induzido por medicacao (antidepressivos)'
        ],
        citations: [{ refId: 'sleep-rbd-criteria-2022' }]
      },
      diagnostico: {
        criterios: [
          'Comportamentos anormais durante REM',
          'PSG: REM sem atonia (RSWA)',
          'Nao explicado por outra condicao'
        ],
        diagnosticoDiferencial: [
          'Terror noturno (ocorre em NREM)',
          'Sonambulismo',
          'Epilepsia noturna',
          'SAOS com arousals confusionais',
          'Transtorno dissociativo'
        ],
        examesImagem: [
          'RM cranio (excluir lesoes de tronco)',
          'DaTscan (se sinais de parkinsonismo)'
        ],
        outrosExames: [
          'PSG com video e EMG extenso (RSWA)',
          'Teste do olfato (UPSIT)',
          'Avaliacao cognitiva'
        ],
        citations: [{ refId: 'aasm-rbd-2022' }]
      },
      tratamento: {
        objetivos: [
          'Prevenir lesoes',
          'Reduzir comportamentos perturbadores',
          'Monitorar conversao para sinucleinopatia'
        ],
        naoFarmacologico: {
          medidas: [
            'Modificar ambiente de sono (seguranca)',
            'Afastar objetos perigosos',
            'Camas separadas se necessario',
            'Evitar privacao de sono e alcool',
            'Suspender antidepressivos se possivel'
          ],
          citations: [{ refId: 'aasm-rbd-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Benzodiazepinicos',
              medicamentos: ['Clonazepam'],
              posologia: '0,5-2mg 30 min antes de dormir',
              observacoes: 'Eficaz em ~90%; cuidado em SAOS e idosos'
            },
            {
              classe: 'Melatonina',
              medicamentos: ['Melatonina'],
              posologia: '3-12mg ao deitar',
              observacoes: 'Alternativa com menos efeitos adversos; pode ser combinado'
            }
          ],
          segundaLinha: [
            {
              classe: 'Outros',
              medicamentos: ['Pramipexol', 'Donepezila'],
              posologia: 'Variavel',
              observacoes: 'Evidencia limitada'
            }
          ],
          situacoesEspeciais: [
            { situacao: 'SAOS concomitante', conduta: 'Tratar SAOS pode melhorar RBD; cuidado com clonazepam' },
            { situacao: 'Parkinson concomitante', conduta: 'Otimizar tratamento do Parkinson' }
          ],
          citations: [{ refId: 'lancet-neurol-rbd-2018' }]
        },
        duracao: 'Cronico; monitoramento neurologico a longo prazo'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semestral a anual; neurologico periodico',
        examesControle: [
          'Avaliacao neurologica periodica (sinais de parkinsonismo)',
          'Avaliacao cognitiva anual',
          'PSG de seguimento se necessario'
        ],
        metasTerapeuticas: [
          'Ausencia de lesoes',
          'Reducao dos episodios',
          'Deteccao precoce de sinucleinopatia'
        ],
        criteriosEncaminhamento: [
          'Todos: neurologista',
          'Sinais de parkinsonismo ou declinio cognitivo',
          'Refratariedade ao tratamento'
        ],
        citations: [{ refId: 'brain-rbd-2019' }]
      },
      prevencao: {
        primaria: [
          'Nao ha prevencao conhecida',
          'Evitar antidepressivos se possivel (em risco)'
        ],
        secundaria: [
          'Seguranca do ambiente',
          'Monitoramento para conversao (fenoconversao)'
        ],
        citations: [{ refId: 'lancet-neurol-rbd-2018' }]
      }
    },
    protocolos: ['rbd-manejo'],
    medicamentos: ['clonazepam', 'melatonina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [
      { refId: 'aasm-rbd-2022' },
      { refId: 'lancet-neurol-rbd-2018' },
      { refId: 'brain-rbd-2019' }
    ],
    lastUpdate: '2025-01',
    tags: ['rbd', 'parasonia', 'rem', 'sinucleinopatia', 'parkinson']
  },

  // ============================================================================
  // 9. TRANSTORNO DE PESADELO
  // ============================================================================
  {
    id: 'transtorno-pesadelo',
    titulo: 'Transtorno de Pesadelo',
    sinonimos: ['Nightmare Disorder', 'Pesadelos Recorrentes', 'Parasonia REM'],
    doid: 'DOID:0080046',
    snomedCT: '89142003',
    meshId: 'D020184',
    umlsCui: 'C0028732',
    ciap2: ['P06'],
    cid10: ['F51.5'],
    cid11: ['7B01.0'],
    categoria: 'saude_mental',
    subcategoria: 'transtornos_sono',
    quickView: {
      definicao: 'Parasonia REM com pesadelos recorrentes, bem lembrados, que despertam o individuo e causam sofrimento significativo ou prejuizo funcional. Comum em TEPT e pode ocorrer de forma idiopatica.',
      criteriosDiagnosticos: [
        'Episodios repetidos de sonhos perturbadores, bem lembrados',
        'Despertar com rapida orientacao e alerta',
        'Conteudo tipicamente ameacador (perseguicao, violencia, morte)',
        'Ocorrem geralmente na segunda metade da noite (sono REM)',
        'Causa sofrimento clinicamente significativo ou prejuizo',
        'Nao atribuivel a substancia ou outra condicao'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Terapia de Ensaio de Imagens (IRT) - primeira linha',
          'TCC para pesadelos',
          'EMDR (se TEPT associado)',
          'Exposicao, relaxamento e reescrita do roteiro',
          'Higiene do sono'
        ],
        farmacologico: [
          'Prazosina 1-15mg ao deitar (bloqueador alfa-1, nivel A para TEPT)',
          'Se TEPT: tratar com ISRS (Sertralina, Paroxetina)',
          'Evitar antidepressivos que intensificam sonhos (alguns ISRS)'
        ]
      },
      metasTerapeuticas: [
        'Reducao da frequencia de pesadelos',
        'Reducao do sofrimento associado',
        'Melhora do sono e funcionamento diurno'
      ],
      examesIniciais: [
        'Avaliacao psiquiatrica (TEPT, depressao, ansiedade)',
        'Diario de sono/pesadelos',
        'Revisao de medicacoes (algumas intensificam sonhos)',
        'PSG geralmente nao necessaria'
      ],
      redFlags: [
        'TEPT grave com risco suicida',
        'Pesadelos com comportamentos violentos (considerar RBD)',
        'Uso de substancias',
        'Alucinacoes hipnagogicas intensas (narcolepsia?)',
        'Abuso/trauma recente'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2-8% adultos com pesadelos frequentes; 50-70% em TEPT',
        faixaEtaria: 'Pode ocorrer em qualquer idade; pico em criancas e adolescentes',
        fatoresRisco: [
          'TEPT (fator de risco principal)',
          'Ansiedade e depressao',
          'Privacao de sono',
          'Medicacoes (betabloqueadores, alguns antidepressivos)',
          'Trauma na infancia',
          'Personalidade com altos tracos de absorcao/imaginacao'
        ],
        citations: [{ refId: 'aasm-nightmare-2018' }]
      },
      fisiopatologia: {
        texto: 'Pesadelos ocorrem predominantemente durante sono REM, quando atividade cerebral e similar a vigilia. Em TEPT, ha hiperativacao adrenergica e amigdalar que perpetua memorias traumaticas nos sonhos. Falha na extincao do medo durante processamento onirico.',
        citations: [{ refId: 'sleep-nightmare-neurobiology-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sonhos perturbadores, bem lembrados',
          'Despertar do sono com ansiedade',
          'Dificuldade de retornar ao sono',
          'Medo de dormir (em casos graves)',
          'Fadiga diurna'
        ],
        sinaisExameFisico: [
          'Exame fisico normal',
          'Avaliar sinais de TEPT, depressao, ansiedade'
        ],
        formasClinicas: [
          'Pesadelos idiopaticos',
          'Pesadelos relacionados a TEPT',
          'Pesadelos induzidos por substancias/medicacoes'
        ],
        citations: [{ refId: 'dsm5-apa-2013' }]
      },
      diagnostico: {
        criterios: [
          'Pesadelos recorrentes',
          'Despertar com lembranca do sonho',
          'Rapida orientacao ao despertar',
          'Sofrimento ou prejuizo significativo'
        ],
        diagnosticoDiferencial: [
          'Terror noturno (NREM, sem lembranca)',
          'RBD (comportamentos motores)',
          'Epilepsia noturna',
          'Alucinacoes hipnagogicas (narcolepsia)',
          'Ataques de panico noturnos'
        ],
        outrosExames: [
          'PSG se suspeita de outro transtorno do sono',
          'Avaliacao psicologica/psiquiatrica'
        ],
        citations: [{ refId: 'aasm-nightmare-2018' }]
      },
      tratamento: {
        objetivos: [
          'Reduzir frequencia e intensidade dos pesadelos',
          'Tratar condicao de base (TEPT)',
          'Melhorar qualidade do sono'
        ],
        naoFarmacologico: {
          medidas: [
            'IRT (Image Rehearsal Therapy) - nivel A de evidencia',
            'Reescrever o roteiro do pesadelo acordado',
            'Ensaiar mentalmente o novo roteiro',
            'TCC para pesadelos',
            'EMDR se TEPT'
          ],
          citations: [{ refId: 'aasm-nightmare-2018' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Bloqueador alfa-1 adrenergico',
              medicamentos: ['Prazosina'],
              posologia: 'Iniciar 1mg ao deitar; titular ate 15mg',
              observacoes: 'Evidencia nivel A para pesadelos de TEPT; monitorar hipotensao'
            }
          ],
          segundaLinha: [
            {
              classe: 'ISRS (se TEPT/depressao)',
              medicamentos: ['Sertralina', 'Paroxetina'],
              posologia: 'Doses padrao para TEPT',
              observacoes: 'Alguns ISRS podem intensificar sonhos inicialmente'
            },
            {
              classe: 'Outros',
              medicamentos: ['Trazodona', 'Clonidina'],
              posologia: 'Trazodona 50-100mg; Clonidina 0,1-0,3mg',
              observacoes: 'Evidencia limitada'
            }
          ],
          situacoesEspeciais: [
            { situacao: 'TEPT grave', conduta: 'Prazosina + ISRS + psicoterapia (EMDR, exposicao prolongada)' },
            { situacao: 'Criancas', conduta: 'IRT adaptada; evitar farmacoterapia se possivel' }
          ],
          citations: [{ refId: 'jama-prazosin-2021' }]
        },
        duracao: 'IRT: 4-6 sessoes; Prazosina: enquanto necessario'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal durante IRT; depois conforme necessidade',
        examesControle: [
          'Diario de pesadelos',
          'Escalas de TEPT (PCL-5)',
          'Qualidade do sono'
        ],
        metasTerapeuticas: [
          'Reducao >=50% na frequencia de pesadelos',
          'Melhora do funcionamento diurno'
        ],
        criteriosEncaminhamento: [
          'TEPT grave',
          'Refratariedade a IRT e prazosina',
          'Risco suicida'
        ],
        citations: [{ refId: 'aasm-nightmare-2018' }]
      },
      prevencao: {
        primaria: [
          'Prevencao de trauma',
          'Intervencao precoce em eventos traumaticos'
        ],
        secundaria: [
          'Tratamento precoce de TEPT',
          'IRT profilatica em grupos de risco'
        ],
        citations: [{ refId: 'sleep-nightmare-neurobiology-2021' }]
      }
    },
    protocolos: ['pesadelo-irt-manejo'],
    medicamentos: ['prazosina', 'sertralina'],
    calculadoras: ['pcl5-ptsd'],
    rastreamentos: [],
    citations: [
      { refId: 'aasm-nightmare-2018' },
      { refId: 'dsm5-apa-2013' },
      { refId: 'jama-prazosin-2021' }
    ],
    lastUpdate: '2025-01',
    tags: ['pesadelo', 'parasonia', 'tept', 'prazosina', 'irt']
  },

  // ============================================================================
  // 10. TRANSTORNOS DO DESPERTAR DO SONO NREM
  // ============================================================================
  {
    id: 'transtornos-despertar-nrem',
    titulo: 'Transtornos do Despertar do Sono NREM',
    sinonimos: ['NREM Parasomnias', 'Sonambulismo', 'Terror Noturno', 'Despertar Confusional'],
    doid: 'DOID:0060162',
    snomedCT: '95549007',
    meshId: 'D020448',
    umlsCui: 'C0393761',
    ciap2: ['P06'],
    cid10: ['F51.3', 'F51.4'],
    cid11: ['7B00'],
    categoria: 'saude_mental',
    subcategoria: 'transtornos_sono',
    quickView: {
      definicao: 'Parasonias NREM caracterizadas por despertar incompleto do sono profundo (N3), com comportamentos automaticos, amnesia do episodio, e dificuldade de despertar. Inclui sonambulismo, terror noturno e despertar confusional.',
      criteriosDiagnosticos: [
        'Episodios recorrentes de despertar incompleto do sono',
        'Ocorrem tipicamente no primeiro terco da noite (sono N3)',
        'Ausencia ou minima resposta a estimulos externos',
        'Cognição prejudicada durante episodio',
        'Amnesia parcial ou completa do evento',
        'Nao melhor explicado por outro transtorno, substancia ou condicao'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Medidas de seguranca (trancar portas, alarmes)',
          'Higiene do sono rigorosa',
          'Evitar privacao de sono (desencadeante)',
          'Evitar alcool e sedativos',
          'Despertar antecipado (acordar 15-30 min antes do horario usual do episodio)'
        ],
        farmacologico: [
          'Casos frequentes/perigosos: Clonazepam 0,25-2mg ao deitar',
          'Alternativas: Imipramina, Paroxetina',
          'Tratar condicoes que fragmentam sono (SAOS, SPI)'
        ]
      },
      metasTerapeuticas: [
        'Reduzir frequencia de episodios',
        'Prevenir lesoes',
        'Identificar e tratar fatores precipitantes'
      ],
      examesIniciais: [
        'Historia detalhada (horario, comportamento, amnesia)',
        'Diario de sono',
        'PSG se diagnostico incerto ou suspeita de SAOS',
        'Exclusao de epilepsia se atipico'
      ],
      redFlags: [
        'Comportamentos violentos com lesoes',
        'Episodios fora do primeiro terco da noite',
        'Comportamentos estereotipados (epilepsia?)',
        'Inicio na idade adulta (investigar causa)',
        'Persistencia apesar de tratamento'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Sonambulismo: 1-4% adultos, 17% criancas; Terror noturno: 1-6%',
        faixaEtaria: 'Pico na infancia (3-12 anos); geralmente resolve na adolescencia',
        fatoresRisco: [
          'Historia familiar (forte componente genetico)',
          'Privacao de sono',
          'Estresse, febre',
          'Medicacoes (hipnoticos, litio)',
          'Condicoes que fragmentam sono (SAOS, SPI)',
          'Distensao vesical'
        ],
        citations: [{ refId: 'sleep-nrem-parasomnia-2020' }]
      },
      fisiopatologia: {
        texto: 'Dissociacao entre vigilia e sono NREM: partes do cerebro (motor, autonomico) "despertam" enquanto outras permanecem em sono profundo (cortex associativo, hipocampo). Instabilidade do sono de ondas lentas e componente genetico contribuem.',
        citations: [{ refId: 'lancet-neurol-parasomnia-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'SONAMBULISMO: deambulacao, comportamentos complexos',
          'TERROR NOTURNO: grito, taquicardia, sudorese, medo intenso',
          'DESPERTAR CONFUSIONAL: confusao, desorientacao, fala incoerente',
          'Olhos abertos mas olhar vago',
          'Amnesia do episodio'
        ],
        sinaisExameFisico: [
          'Exame neurologico normal entre episodios',
          'Paciente nao responsivo durante episodio',
          'Dificil de acordar completamente'
        ],
        formasClinicas: [
          'Sonambulismo (F51.3)',
          'Terror noturno (F51.4)',
          'Despertar confusional',
          'Sleep-related eating disorder (variante)'
        ],
        citations: [{ refId: 'icsd3-aasm-2014' }]
      },
      diagnostico: {
        criterios: [
          'Episodios de despertar incompleto',
          'Ocorrem no primeiro terco da noite',
          'Resposta minima a estimulos',
          'Amnesia'
        ],
        diagnosticoDiferencial: [
          'RBD (ocorre no sono REM, ultimo terco)',
          'Epilepsia noturna do lobo frontal',
          'Ataques de panico noturnos',
          'SAOS com arousals confusionais',
          'Transtorno dissociativo'
        ],
        outrosExames: [
          'PSG com video-EEG expandido (se atipico)',
          'EEG de vigilia (excluir epilepsia)'
        ],
        citations: [{ refId: 'aasm-nrem-2018' }]
      },
      tratamento: {
        objetivos: [
          'Seguranca do paciente',
          'Reduzir frequencia',
          'Tratar fatores precipitantes'
        ],
        naoFarmacologico: {
          medidas: [
            'Seguranca ambiental (alarmes, portas trancadas)',
            'Evitar privacao de sono',
            'Tratar SAOS/SPI se presentes',
            'Despertares programados (acordar 15-30 min antes)',
            'Hipnoterapia (evidencia limitada)'
          ],
          citations: [{ refId: 'aasm-nrem-2018' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Benzodiazepinicos',
              medicamentos: ['Clonazepam'],
              posologia: '0,25-2mg ao deitar',
              observacoes: 'Reduz sono profundo; usar em casos frequentes ou perigosos'
            }
          ],
          segundaLinha: [
            {
              classe: 'Antidepressivos triciclicos',
              medicamentos: ['Imipramina'],
              posologia: '25-75mg ao deitar',
              observacoes: 'Especialmente para terror noturno em criancas'
            },
            {
              classe: 'ISRS',
              medicamentos: ['Paroxetina'],
              posologia: '10-20mg',
              observacoes: 'Evidencia anedotica'
            }
          ],
          situacoesEspeciais: [
            { situacao: 'Criancas', conduta: 'Geralmente resolve espontaneamente; seguranca; despertares programados' },
            { situacao: 'Adultos com inicio tardio', conduta: 'Investigar causa (SAOS, medicacoes, estresse)' }
          ],
          citations: [{ refId: 'sleep-nrem-parasomnia-2020' }]
        },
        duracao: 'Conforme necessidade; muitos casos infantis resolvem'
      },
      acompanhamento: {
        frequenciaConsultas: 'Conforme gravidade; muitos casos nao requerem seguimento intensivo',
        examesControle: [
          'Diario de sono/episodios',
          'Reavaliacao de fatores precipitantes'
        ],
        metasTerapeuticas: [
          'Ausencia de lesoes',
          'Reducao na frequencia'
        ],
        criteriosEncaminhamento: [
          'Comportamentos violentos ou perigosos',
          'Diagnostico incerto',
          'Persistencia em adultos',
          'Suspeita de epilepsia'
        ],
        citations: [{ refId: 'aasm-nrem-2018' }]
      },
      prevencao: {
        primaria: [
          'Manutencao de sono adequado',
          'Evitar privacao de sono'
        ],
        secundaria: [
          'Seguranca ambiental',
          'Tratar comorbidades do sono'
        ],
        citations: [{ refId: 'lancet-neurol-parasomnia-2021' }]
      }
    },
    protocolos: ['nrem-parasomnia-manejo'],
    medicamentos: ['clonazepam', 'imipramina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [
      { refId: 'aasm-nrem-2018' },
      { refId: 'icsd3-aasm-2014' },
      { refId: 'lancet-neurol-parasomnia-2021' }
    ],
    lastUpdate: '2025-01',
    tags: ['sonambulismo', 'terror-noturno', 'parasonia', 'nrem', 'sono']
  }
];
