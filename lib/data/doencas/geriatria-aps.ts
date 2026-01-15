/**
 * GERIATRIA APS - DARWIN-MFC
 * ==========================
 *
 * Sindromes geriatricas comuns na Atencao Primaria a Saude
 * Condicoes completas com fullContent baseadas em diretrizes SBGG e MS
 *
 * Referencias:
 * - Sociedade Brasileira de Geriatria e Gerontologia (SBGG)
 * - Ministerio da Saude (MS) - Cadernos de Atencao Basica
 * - American Geriatrics Society (AGS)
 * - NICE Guidelines - Geriatrics
 */

import { Doenca } from '../../types/doenca';

export const doencasGeriatriaAPS: Doenca[] = [
  // ============================================================================
  // 1. SINDROME DE FRAGILIDADE
  // ============================================================================
  {
    id: 'fragilidade-idoso',
    titulo: 'Sindrome de Fragilidade no Idoso',
    sinonimos: [
      'Fragilidade',
      'Frailty syndrome',
      'Idoso fragil',
      'Sindrome do idoso fragil',
      'Pre-fragilidade'
    ],
    doid: 'DOID:0080733',
    snomedCT: '713634000',
    meshId: 'D000073496',
    umlsCui: 'C4302695',
    ciap2: ['A04', 'P28'],
    cid10: ['R54', 'R53.1'],
    cid11: ['MG2A'],
    categoria: 'geriatrico',
    subcategoria: 'sindrome-geriatrica',

    quickView: {
      definicao: 'Sindrome clinica multidimensional caracterizada por diminuicao das reservas fisiologicas e vulnerabilidade aumentada a estressores, resultando em maior risco de desfechos adversos (quedas, hospitalizacao, dependencia funcional, morte). Prevalencia de 10-25% em idosos >65 anos na comunidade. Identificacao precoce permite intervencoes preventivas.',
      criteriosDiagnosticos: [
        'CRITERIOS DE FRIED (3+ = fragil; 1-2 = pre-fragil):',
        '1. Perda de peso nao intencional (>=4,5kg ou >=5% no ultimo ano)',
        '2. Exaustao autorreferida (cansaco persistente na maior parte do tempo)',
        '3. Fraqueza muscular (forca de preensao palmar <20% do esperado)',
        '4. Lentidao da marcha (velocidade <0,8m/s ou tempo >7s para 4,6m)',
        '5. Baixa atividade fisica (gasto calorico <383kcal/sem H ou <270 M)',
        'Alternativamente: IVCF-20 (>=7 pontos = fragil), Clinical Frailty Scale'
      ],
      classificacaoRisco: [
        {
          nivel: 'baixo',
          criterios: ['0 criterios de Fried', 'IVCF-20 <6', 'Idoso robusto'],
          conduta: 'Promocao de saude, atividade fisica regular, nutricao adequada'
        },
        {
          nivel: 'moderado',
          criterios: ['1-2 criterios de Fried', 'IVCF-20 6-14', 'Pre-fragil'],
          conduta: 'Intervencao multimodal intensificada, revisao de medicamentos'
        },
        {
          nivel: 'alto',
          criterios: ['>=3 criterios de Fried', 'IVCF-20 >=15', 'Fragil'],
          conduta: 'Avaliacao geriatrica ampla, plano de cuidados individualizado'
        }
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Exercicio fisico multicomponente: resistencia + equilibrio + flexibilidade',
          'Treino de forca progressivo 2-3x/semana (evidencia GRADE A)',
          'Suplementacao proteica: 1,2-1,5g/kg/dia (especialmente pos-exercicio)',
          'Suplementacao de vitamina D se <30ng/ml: 800-2000UI/dia',
          'Revisao e desprescricao de medicamentos potencialmente inapropriados',
          'Suporte nutricional com refeicoes frequentes e hipercaloricas',
          'Estimulacao cognitiva e engajamento social',
          'Prevencao e tratamento de depressao'
        ],
        farmacologico: [
          'NAO ha tratamento farmacologico especifico para fragilidade',
          'Tratar condicoes contribuintes: anemia, hipotireoidismo, deficiencia B12',
          'Vitamina D3: 800-2000UI/dia se insuficiencia/deficiencia',
          'Suplementacao de calcio se necessario: 500-1200mg/dia',
          'Evitar benzodiazepinicos, antipsicóticos e anticolinergicos',
          'Revisar polifarmacia com criterios de Beers e STOPP/START'
        ]
      },
      metasTerapeuticas: [
        'Melhora ou manutencao da funcionalidade (AVDs/AIVDs)',
        'Prevencao de quedas e hospitalizacoes',
        'Melhora da forca muscular e velocidade de marcha',
        'Manutencao do peso corporal adequado',
        'Melhora da qualidade de vida'
      ],
      examesIniciais: [
        'Hemograma completo (anemia, infeccao)',
        'Funcao renal (ureia, creatinina) e eletrolitos',
        'Glicemia de jejum, HbA1c',
        'TSH, T4 livre',
        '25-OH-vitamina D',
        'Vitamina B12, acido folico',
        'Albumina serica',
        'PCR (inflamacao cronica)'
      ],
      redFlags: [
        'Perda de peso rapida (>5% em 1 mes) - investigar neoplasia',
        'Declinio funcional acelerado',
        'Quedas de repeticao (>=2 quedas em 6 meses)',
        'Delirium sobreposto',
        'Hospitalizacoes frequentes',
        'Dor cronica nao controlada',
        'Depressao grave ou ideacao suicida',
        'Sindrome de imobilidade instalada'
      ]
    },

    fullContent: {
      epidemiologia: {
        prevalencia: '10-25% dos idosos >=65 anos na comunidade; ate 50% em institucionalizados',
        incidencia: '7-12% ao ano de transicao para fragilidade em idosos pre-frageis',
        mortalidade: 'Fragilidade aumenta mortalidade em 2-3x em 5 anos',
        faixaEtaria: 'Aumenta exponencialmente apos 75 anos; 25-50% em >85 anos',
        fatoresRisco: [
          'Idade avancada (>80 anos)',
          'Sexo feminino (maior prevalencia, menor letalidade)',
          'Baixa escolaridade e nivel socioeconomico',
          'Doencas cronicas multiplas (multimorbidade)',
          'Polifarmacia (>=5 medicamentos)',
          'Hospitalizacoes previas',
          'Sarcopenia e desnutricao',
          'Depressao e isolamento social',
          'Sedentarismo',
          'Deficiencia de vitamina D',
          'Declinio cognitivo'
        ],
        citations: [{ refId: 'sbgg-fragilidade-2023' }]
      },
      fisiopatologia: {
        texto: 'A fragilidade resulta de desregulacao de multiplos sistemas fisiologicos. O ciclo da fragilidade envolve: sarcopenia (perda de massa e forca muscular) -> reducao da taxa metabolica basal -> diminuicao do gasto energetico -> reducao da ingestao alimentar -> desnutricao -> inflamacao cronica de baixo grau (inflammaging) -> mais sarcopenia. Biomarcadores elevados incluem IL-6, TNF-alfa, PCR. Ha disfuncao do eixo HPA, reducao de IGF-1 e testosterona, e estado pro-coagulante. A perda de homeostase leva a vulnerabilidade a estressores minimos.',
        citations: [{ refId: 'sbgg-fragilidade-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fadiga e exaustao sem causa aparente',
          'Perda de peso nao intencional',
          'Lentidao na marcha e movimentos',
          'Fraqueza muscular progressiva',
          'Baixa tolerancia ao exercicio',
          'Inatividade fisica',
          'Anorexia e reducao do apetite',
          'Vulnerabilidade a infeccoes',
          'Recuperacao lenta apos doencas agudas'
        ],
        sinaisExameFisico: [
          'Baixo IMC (<22kg/m2) ou perda de peso visivel',
          'Reducao da circunferencia da panturrilha (<31cm)',
          'Forca de preensao palmar reduzida (dinamometro)',
          'Velocidade de marcha lenta (<0,8m/s)',
          'Teste Timed Up and Go >12 segundos',
          'Dificuldade para levantar da cadeira sem apoio',
          'Reducao da massa muscular (sarcopenia)',
          'Postura cifótica, marcha cautelosa'
        ],
        formasClinicas: [
          'Fragilidade fisica (criterios de Fried)',
          'Fragilidade cognitiva (fragilidade + comprometimento cognitivo leve)',
          'Fragilidade social (isolamento, vulnerabilidade social)',
          'Pre-fragilidade (1-2 criterios de Fried)'
        ],
        citations: [{ refId: 'sbgg-fragilidade-2023' }]
      },
      diagnostico: {
        criterios: [
          'FENOTIPO DE FRIED (referencia):',
          '- 0 criterios: robusto',
          '- 1-2 criterios: pre-fragil',
          '- >=3 criterios: fragil',
          '',
          'INDICE DE VULNERABILIDADE CLINICO-FUNCIONAL (IVCF-20):',
          '- <6 pontos: robusto',
          '- 6-14 pontos: em risco de fragilizacao',
          '- >=15 pontos: fragil',
          '',
          'CLINICAL FRAILTY SCALE (CFS 1-9):',
          '- 1-3: sem fragilidade',
          '- 4: vulneravel',
          '- 5-6: fragilidade leve a moderada',
          '- 7-9: fragilidade grave a terminal'
        ],
        diagnosticoDiferencial: [
          'Depressao maior (pode mimetizar e coexistir)',
          'Hipotireoidismo',
          'Insuficiencia cardiaca descompensada',
          'DPOC avancada',
          'Neoplasia oculta',
          'Infeccoes cronicas (TB, HIV)',
          'Demencia avancada',
          'Efeitos adversos de medicamentos',
          'Sindrome consumptiva de outra etiologia'
        ],
        examesLaboratoriais: [
          'Hemograma completo',
          'Funcao renal e eletrolitos',
          'Glicemia, HbA1c',
          'TSH, T4L',
          '25-OH-vitamina D',
          'Vitamina B12',
          'Albumina serica',
          'PCR, VHS',
          'Funcao hepatica'
        ],
        outrosExames: [
          'Avaliacao Geriatrica Ampla (AGA)',
          'Mini Exame do Estado Mental (MEEM) ou MoCA',
          'Escala de Depressao Geriatrica (GDS-15)',
          'Indice de Katz (AVDs) e Lawton (AIVDs)',
          'Mini Avaliacao Nutricional (MAN)',
          'Densitometria ossea (rastreio osteoporose)'
        ],
        citations: [{ refId: 'sbgg-fragilidade-2023' }]
      },
      tratamento: {
        objetivos: [
          'Reverter ou estabilizar a fragilidade (possivel em pre-frageis)',
          'Preservar e melhorar capacidade funcional',
          'Prevenir desfechos adversos (quedas, hospitalizacao, morte)',
          'Melhorar qualidade de vida',
          'Manejar condicoes contribuintes'
        ],
        naoFarmacologico: {
          medidas: [
            'EXERCICIO FISICO MULTICOMPONENTE (evidencia nivel A):',
            '- Treino de resistencia progressivo 2-3x/semana',
            '- Exercicios de equilibrio e propriocepcao',
            '- Treino de flexibilidade',
            '- Caminhada ou exercicio aerobico leve',
            '- Duracao minima: 30-60min, 3x/semana',
            '',
            'NUTRICAO:',
            '- Proteina 1,2-1,5g/kg/dia (distribuida nas refeicoes)',
            '- Suplemento proteico pos-exercicio se necessario',
            '- Refeicoes frequentes (5-6x/dia)',
            '- Textura adequada se disfagia',
            '',
            'INTERVENCOES PSICOSSOCIAIS:',
            '- Estimulacao cognitiva',
            '- Engajamento social (grupos, atividades comunitarias)',
            '- Tratamento de depressao e ansiedade',
            '- Suporte familiar e de cuidadores'
          ],
          citations: [{ refId: 'sbgg-fragilidade-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Suplementacao de Vitamina D',
              medicamentos: ['Colecalciferol (Vitamina D3)'],
              posologia: '800-2000 UI/dia se 25-OH-D <30ng/ml',
              observacoes: 'Evidencia moderada para prevencao de quedas e fraturas'
            },
            {
              classe: 'Suplementacao de Calcio',
              medicamentos: ['Carbonato de calcio', 'Citrato de calcio'],
              posologia: '500-1200mg/dia, preferencialmente dietetico',
              observacoes: 'Associar a vitamina D. Preferir fonte alimentar.'
            },
            {
              classe: 'Suplementacao Proteica',
              medicamentos: ['Suplementos proteicos orais'],
              posologia: '15-25g de proteina de alto valor biologico pos-exercicio',
              observacoes: 'Especialmente se ingestao insuficiente'
            }
          ],
          segundaLinha: [
            {
              classe: 'Tratamento de anemia',
              medicamentos: ['Sulfato ferroso', 'Eritropoetina'],
              posologia: 'Conforme etiologia da anemia',
              observacoes: 'Investigar e tratar causa base'
            },
            {
              classe: 'Reposicao de B12',
              medicamentos: ['Cianocobalamina'],
              posologia: '1000mcg IM 1x/semana por 4 semanas, depois mensal, ou 1000-2000mcg/dia VO',
              observacoes: 'Se B12 <300pg/ml'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Polifarmacia',
              conduta: 'Revisar medicamentos com criterios de Beers e STOPP/START. Desprescrever medicamentos potencialmente inapropriados, especialmente benzodiazepinicos, anticolinergicos, opioides.'
            },
            {
              situacao: 'Sarcopenia grave',
              conduta: 'Intensificar exercicio de resistencia + suplementacao proteica (1,5g/kg/dia) + vitamina D. Considerar encaminhamento para fisioterapia especializada.'
            },
            {
              situacao: 'Fragilidade + Demencia',
              conduta: 'Abordagem centrada na pessoa, objetivos de cuidado realistas, envolver familia/cuidador. Prevencao de quedas intensificada.'
            }
          ],
          citations: [{ refId: 'sbgg-fragilidade-2023' }]
        },
        duracao: 'Tratamento continuo e individualizado; reavaliar a cada 3-6 meses'
      },
      acompanhamento: {
        frequenciaConsultas: 'Pre-frageis: a cada 3-6 meses; Frageis: a cada 1-3 meses',
        examesControle: [
          'Avaliacao funcional (Katz, Lawton) a cada consulta',
          'Velocidade de marcha e forca de preensao periodicamente',
          'Estado nutricional (peso, MAN)',
          'Rastreio de depressao (GDS-15)',
          'Revisao de medicamentos',
          '25-OH-vitamina D anual'
        ],
        metasTerapeuticas: [
          'Manutencao ou melhora da velocidade de marcha (>0,8m/s)',
          'Manutencao da independencia para AVDs',
          'Prevencao de quedas',
          'Manutencao do peso corporal',
          'Melhora ou estabilizacao do numero de criterios de Fried'
        ],
        criteriosEncaminhamento: [
          'Geriatria: AGA complexa, fragilidade avancada, polifarmacia importante',
          'Fisioterapia: programa de exercicios supervisionado',
          'Nutricionista: desnutricao, dificuldade para atingir metas proteicas',
          'Psiquiatria/Psicologia: depressao refrataria',
          'Cuidados paliativos: fragilidade grave com prognostico limitado'
        ],
        citations: [{ refId: 'sbgg-fragilidade-2023' }]
      },
      prevencao: {
        primaria: [
          'Atividade fisica regular ao longo da vida',
          'Alimentacao equilibrada com proteina adequada',
          'Controle de doencas cronicas',
          'Evitar tabagismo e etilismo',
          'Manutencao de engajamento social',
          'Estimulacao cognitiva continua',
          'Vacinacao em dia (influenza, pneumococo, herpes-zoster)'
        ],
        secundaria: [
          'Identificacao precoce de pre-fragilidade',
          'Intervencao multimodal em pre-frageis',
          'Revisao periodica de medicamentos',
          'Rastreamento de sindromes geriatricas',
          'Prevencao de quedas'
        ],
        citations: [{ refId: 'sbgg-fragilidade-2023' }]
      },
      populacoesEspeciais: {
        idosos: 'Condicao exclusivamente geriatrica. Muito idosos (>85 anos) tem maior prevalencia e pior prognostico. Abordagem deve ser individualizada considerando preferencias e metas de cuidado.',
        gestantes: 'N/A',
        criancas: 'N/A'
      }
    },

    protocolos: ['fragilidade-sbgg', 'aga-sbgg'],
    medicamentos: ['vitamina-d', 'calcio', 'suplemento-proteico'],
    calculadoras: ['ivcf-20', 'clinical-frailty-scale', 'fried-criteria'],
    citations: [
      { refId: 'sbgg-fragilidade-2023' },
      { refId: 'ags-frailty-2023' }
    ],
    lastUpdate: '2024-01-01',
    tags: ['geriatria', 'aps', 'fragilidade', 'sarcopenia', 'sindrome-geriatrica', 'idoso']
  },

  // ============================================================================
  // 2. DEMENCIA / DOENCA DE ALZHEIMER
  // ============================================================================
  {
    id: 'demencia-alzheimer',
    titulo: 'Demencia / Doenca de Alzheimer',
    sinonimos: [
      'Alzheimer',
      'Demencia senil',
      'Demencia tipo Alzheimer',
      'Transtorno neurocognitivo maior',
      'Doenca de Alzheimer'
    ],
    doid: 'DOID:10652',
    snomedCT: '26929004',
    meshId: 'D000544',
    umlsCui: 'C0002395',
    ciap2: ['P70'],
    cid10: ['G30.9', 'F00.9', 'G30.0', 'G30.1'],
    cid11: ['8A20'],
    categoria: 'geriatrico',
    subcategoria: 'neuropsiquiatrico',

    quickView: {
      definicao: 'Sindrome clinica caracterizada por declinio cognitivo adquirido, progressivo e persistente, suficiente para interferir na funcionalidade e independencia. Doenca de Alzheimer e a causa mais comum (60-70%), seguida de demencia vascular e demencia com corpos de Lewy. Prevalencia dobra a cada 5 anos apos os 65 anos.',
      criteriosDiagnosticos: [
        'CRITERIOS DSM-5 (Transtorno Neurocognitivo Maior):',
        '1. Declinio cognitivo significativo em >=1 dominio (memoria, funcao executiva, atencao, linguagem, percepcao motora, cognicao social)',
        '2. Deficits interferem na independencia para AVDs',
        '3. Nao ocorrem exclusivamente durante delirium',
        '4. Nao sao melhor explicados por outro transtorno mental',
        '',
        'PARA ALZHEIMER: Inicio insidioso, progressao gradual, comprometimento de memoria episodica proeminente'
      ],
      classificacaoRisco: [
        {
          nivel: 'baixo',
          criterios: ['CDR 0,5-1', 'MEEM >18', 'AVDs preservadas', 'Demencia leve'],
          conduta: 'Inibidor de colinesterase, medidas nao farmacologicas, orientacao familiar'
        },
        {
          nivel: 'moderado',
          criterios: ['CDR 2', 'MEEM 10-18', 'Dependencia parcial para AVDs', 'Sintomas comportamentais'],
          conduta: 'Associar memantina, manejar SCPD, planejar cuidados futuros'
        },
        {
          nivel: 'alto',
          criterios: ['CDR 3', 'MEEM <10', 'Dependencia total', 'SCPD graves'],
          conduta: 'Cuidados paliativos, conforto, suporte intensivo ao cuidador'
        }
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Estimulacao cognitiva estruturada (evidencia A)',
          'Atividade fisica adaptada regular',
          'Musicoterapia e terapia de reminiscencia',
          'Orientacao e suporte ao cuidador (reduz sobrecarga)',
          'Adaptacao ambiental (seguranca, rotina estruturada)',
          'Tratamento de depressao e ansiedade comorbidas',
          'Manter engajamento social possivel',
          'Controle de fatores de risco cardiovascular'
        ],
        farmacologico: [
          'DEMENCIA LEVE A MODERADA:',
          'Donepezila 5-10mg/dia (iniciar 5mg, aumentar apos 4-6 semanas)',
          'OU Rivastigmina 6-12mg/dia VO ou patch 9,5-13,3mg/24h',
          'OU Galantamina 16-24mg/dia',
          '',
          'DEMENCIA MODERADA A GRAVE:',
          'Associar Memantina 10-20mg/dia (iniciar 5mg, aumentar semanalmente)',
          '',
          'SCPD: evitar antipsicoticos se possivel; se necessario, baixa dose por curto prazo'
        ]
      },
      metasTerapeuticas: [
        'Estabilizar ou retardar declinio cognitivo',
        'Manter funcionalidade pelo maior tempo possivel',
        'Controlar sintomas comportamentais (SCPD)',
        'Melhorar qualidade de vida do paciente e cuidador',
        'Prevenir complicacoes (quedas, desnutricao, infeccoes)'
      ],
      examesIniciais: [
        'Avaliacao cognitiva: MEEM, MoCA ou teste do relogio',
        'Hemograma, funcao renal e hepatica',
        'TSH, T4L (excluir hipotireoidismo)',
        '25-OH-vitamina D, vitamina B12',
        'Glicemia, HbA1c',
        'Calcio, sodio',
        'VDRL (neurossifilis se suspeita)',
        'Anti-HIV (se fatores de risco)',
        'TC ou RM de cranio (excluir causas secundarias)'
      ],
      redFlags: [
        'Declinio cognitivo rapido (<6 meses) - investigar causas reversiveis',
        'Sinais neurologicos focais (AVC, tumor)',
        'Idade <65 anos (investigar causas geneticas/secundarias)',
        'Cefaleia nova ou alteracao de comportamento subita',
        'Alucinacoes visuais precoces (sugerir Lewy)',
        'Disturbio de marcha proeminente inicial (hidrocefalia, parkinsonismo)',
        'Incontinencia urinaria precoce (hidrocefalia)',
        'Convulsoes'
      ]
    },

    fullContent: {
      epidemiologia: {
        prevalencia: '7,6% em idosos >=60 anos no Brasil; 35% em >85 anos',
        incidencia: 'Dobra a cada 5 anos apos 65 anos; 1% aos 60-64 anos, 30-50% aos >85',
        mortalidade: 'Sobrevida media apos diagnostico: 4-8 anos',
        faixaEtaria: 'Rara antes dos 60; prevalencia aumenta exponencialmente apos 65',
        fatoresRisco: [
          'Idade avancada (principal fator)',
          'Historia familiar de demencia',
          'Genotipo APOE e4',
          'Baixa escolaridade e reserva cognitiva',
          'Traumatismo craniano previo',
          'Hipertensao nao tratada na meia-idade',
          'Diabetes mellitus',
          'Obesidade na meia-idade',
          'Tabagismo',
          'Depressao',
          'Perda auditiva',
          'Isolamento social',
          'Sedentarismo'
        ],
        citations: [{ refId: 'abraz-alzheimer-2023' }]
      },
      fisiopatologia: {
        texto: 'A Doenca de Alzheimer caracteriza-se por deposito extracelular de placas de beta-amiloide e emaranhados neurofibrilares intraneuronais de proteina tau hiperfosforilada. Isso leva a disfuncao sinaptica, neuroinflamacao, estresse oxidativo e morte neuronal progressiva. As areas inicialmente afetadas sao hipocampo e cortex entorrinal (memoria), progredindo para cortex de associacao. Ha deficiencia colinergica, glutamatergica e de outros neurotransmissores. Fatores vasculares frequentemente coexistem (demencia mista).',
        citations: [{ refId: 'abraz-alzheimer-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'FASE INICIAL (demencia leve):',
          '- Esquecimento de eventos recentes (pergunta repetitiva)',
          '- Dificuldade para encontrar palavras',
          '- Desorientacao temporal e espacial leve',
          '- Dificuldade com financas e medicacoes',
          '',
          'FASE INTERMEDIARIA (moderada):',
          '- Esquecimento de fatos importantes, familiares',
          '- Dificuldade para se vestir, higiene',
          '- Alteracoes de comportamento (SCPD)',
          '- Perambulacao, agitacao, apatia',
          '',
          'FASE AVANCADA (grave):',
          '- Dependencia total para AVDs',
          '- Incontinencia urinaria e fecal',
          '- Disfagia, perda de peso',
          '- Mutismo, acamamento'
        ],
        sinaisExameFisico: [
          'Exame neurologico normal nas fases iniciais',
          'Reflexos primitivos (preensao, succao) em fases avancadas',
          'Parkinsonismo pode surgir (marcha em pequenos passos)',
          'Mioclonias em fases tardias',
          'Rigidez, contraturas em fase terminal'
        ],
        formasClinicas: [
          'Doenca de Alzheimer tipica (forma amnestica)',
          'Variante posterior (atrofia cortical posterior)',
          'Variante frontal (comportamental)',
          'Afasia progressiva primaria variante logopenica',
          'Demencia mista (Alzheimer + vascular)',
          'Alzheimer familiar (inicio precoce, mutacoes geneticas)'
        ],
        citations: [{ refId: 'abraz-alzheimer-2023' }]
      },
      diagnostico: {
        criterios: [
          'CRITERIOS NIA-AA 2011/2018 para DA provavel:',
          '1. Criterios de demencia preenchidos',
          '2. Inicio insidioso (meses a anos)',
          '3. Historia clara de piora cognitiva progressiva',
          '4. Deficits cognitivos iniciais em:',
          '   - Apresentacao amnestica (mais comum): memoria episodica',
          '   - OU nao amnestica: linguagem, visuoespacial, executiva',
          '5. Ausencia de doenca cerebrovascular substancial ou outras causas',
          '',
          'Biomarcadores (se disponíveis): PET-amiloide, tau no liquor, atrofia em RM'
        ],
        diagnosticoDiferencial: [
          'Comprometimento cognitivo leve (CCL)',
          'Depressao (pseudodemencia)',
          'Demencia vascular',
          'Demencia com corpos de Lewy',
          'Demencia frontotemporal',
          'Hidrocefalia de pressao normal',
          'Hipotireoidismo',
          'Deficiencia de B12',
          'Neurossifilis',
          'Lesoes expansivas cerebrais',
          'Encefalopatia metabolica'
        ],
        examesLaboratoriais: [
          'Hemograma completo',
          'TSH, T4L',
          'Vitamina B12',
          '25-OH-vitamina D',
          'Funcao renal e hepatica',
          'Glicemia, HbA1c',
          'Calcio, sodio, potassio',
          'VDRL (se indicado)',
          'Anti-HIV (se fatores de risco)'
        ],
        examesImagem: [
          'TC de cranio (excluir causas estruturais)',
          'RM de cranio (atrofia hipocampal, excluir lesoes vasculares)',
          'PET-amiloide ou PET-FDG (se duvida diagnostica)'
        ],
        outrosExames: [
          'Testes cognitivos: MEEM, MoCA, CAMCOG',
          'Avaliacao funcional: CDR, Katz, Lawton, Pfeffer',
          'Avaliacao neuropsicologica formal se duvida',
          'Liquor (biomarcadores) em casos selecionados'
        ],
        citations: [{ refId: 'abraz-alzheimer-2023' }]
      },
      tratamento: {
        objetivos: [
          'Retardar progressao do declinio cognitivo',
          'Manter funcionalidade e independencia',
          'Controlar sintomas comportamentais',
          'Melhorar qualidade de vida',
          'Apoiar familia e cuidadores'
        ],
        naoFarmacologico: {
          medidas: [
            'INTERVENCOES COGNITIVAS:',
            '- Estimulacao cognitiva estruturada (evidencia A)',
            '- Treino cognitivo supervisionado',
            '- Terapia de reminiscencia',
            '- Orientacao para realidade (fase inicial)',
            '',
            'INTERVENCOES COMPORTAMENTAIS (SCPD):',
            '- Identificar e tratar causas (dor, infeccao, constipacao)',
            '- Ambiente calmo, iluminado, com rotina',
            '- Musicoterapia, aromaterapia',
            '- Evitar confronto, redirecionar',
            '',
            'ATIVIDADE FISICA:',
            '- Exercicio regular adaptado',
            '- Fisioterapia para mobilidade e equilibrio',
            '',
            'SUPORTE AO CUIDADOR:',
            '- Psicoeducacao sobre a doenca',
            '- Grupos de apoio',
            '- Respite care (descanso do cuidador)'
          ],
          citations: [{ refId: 'abraz-alzheimer-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Inibidores da Colinesterase',
              medicamentos: ['Donepezila', 'Rivastigmina', 'Galantamina'],
              posologia: 'Donepezila 5mg/dia por 4-6 sem, depois 10mg/dia; Rivastigmina patch 9,5-13,3mg/24h; Galantamina 8-24mg/dia',
              observacoes: 'Indicados em demencia leve a moderada. Beneficio modesto mas significativo em cognicao e funcao.',
              gradeLevel: 'A'
            }
          ],
          segundaLinha: [
            {
              classe: 'Antagonista do receptor NMDA',
              medicamentos: ['Memantina'],
              posologia: 'Iniciar 5mg/dia, aumentar 5mg/semana ate 20mg/dia (10mg 2x ou 20mg 1x)',
              observacoes: 'Indicada em demencia moderada a grave. Pode ser associada a anticolinessterasico.'
            },
            {
              classe: 'Antidepressivos (se depressao/SCPD)',
              medicamentos: ['Sertralina', 'Escitalopram', 'Trazodona'],
              posologia: 'Sertralina 25-100mg/dia; Trazodona 25-100mg a noite (insonia/agitacao)',
              observacoes: 'Tratar depressao comorbida. Trazodona util para disturbio do sono.'
            },
            {
              classe: 'Antipsicoticos (SCPD graves)',
              medicamentos: ['Risperidona', 'Quetiapina'],
              posologia: 'Risperidona 0,25-1mg/dia; Quetiapina 12,5-100mg/dia',
              observacoes: 'APENAS se SCPD graves com risco. Usar menor dose, menor tempo. Risco de AVC e mortalidade.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Demencia com corpos de Lewy',
              conduta: 'Antipsicoticos CONTRAINDICADOS (sensibilidade grave). Preferir anticolinessterasicos (rivastigmina). Quetiapina em baixas doses se absolutamente necessario.'
            },
            {
              situacao: 'Agitacao grave',
              conduta: 'Excluir causas tratáveis (dor, infeccao, retencao urinaria). Medidas nao farmacologicas primeiro. Se necessario: trazodona, ISRS, ou antipsicotico baixa dose por tempo limitado.'
            },
            {
              situacao: 'Fase terminal',
              conduta: 'Cuidados de conforto. Evitar intervencoes futeis. Discutir diretivas antecipadas. Prevencao de broncoaspiracao. Hidratacao e nutricao de conforto.'
            }
          ],
          citations: [{ refId: 'abraz-alzheimer-2023' }]
        },
        duracao: 'Tratamento continuo; reavaliar beneficio periodicamente em fase avancada'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses (mais frequente se SCPD ou fase avancada)',
        examesControle: [
          'Avaliacao cognitiva periodica (MEEM a cada 6-12 meses)',
          'Avaliacao funcional (CDR, Pfeffer)',
          'Avaliacao de SCPD (NPI)',
          'Peso, estado nutricional',
          'Sobrecarga do cuidador (Zarit)',
          'ECG se uso de anticolinessterasicos (bradicardia)'
        ],
        metasTerapeuticas: [
          'Estabilidade ou declinio lento no MEEM',
          'Manutencao da funcionalidade para AVDs',
          'Controle de SCPD',
          'Qualidade de vida preservada',
          'Cuidador sem burnout'
        ],
        criteriosEncaminhamento: [
          'Neurologista/Geriatra: duvida diagnostica, demencia de inicio precoce, variantes atipicas',
          'Psiquiatra geriatrico: SCPD graves ou refratarios',
          'Servico de reabilitacao: estimulacao cognitiva estruturada',
          'Cuidados paliativos: fase avancada',
          'Servico social: questoes legais, curatela, recursos'
        ],
        citations: [{ refId: 'abraz-alzheimer-2023' }]
      },
      prevencao: {
        primaria: [
          'Controle de fatores de risco cardiovascular (HAS, DM, dislipidemia)',
          'Atividade fisica regular',
          'Estimulacao cognitiva ao longo da vida',
          'Educacao formal',
          'Dieta mediterranea',
          'Engajamento social',
          'Tratamento de depressao',
          'Correcao de perda auditiva',
          'Evitar tabagismo e etilismo excessivo',
          'Sono adequado'
        ],
        secundaria: [
          'Identificacao precoce de CCL',
          'Tratamento intensivo de fatores de risco',
          'Monitoramento de individuos com historia familiar'
        ],
        citations: [{ refId: 'abraz-alzheimer-2023' }]
      },
      populacoesEspeciais: {
        idosos: 'Principal populacao afetada. Muito idosos (>85 anos) tem maior prevalencia. Abordagem deve considerar expectativa de vida e metas de cuidado.',
        gestantes: 'N/A',
        criancas: 'N/A'
      }
    },

    protocolos: ['demencia-ms', 'pcdt-alzheimer', 'nice-dementia'],
    medicamentos: ['donepezila', 'rivastigmina', 'galantamina', 'memantina'],
    calculadoras: ['meem', 'moca', 'cdr', 'gds-15'],
    citations: [
      { refId: 'abraz-alzheimer-2023' },
      { refId: 'nice-dementia-2018' }
    ],
    lastUpdate: '2024-01-01',
    tags: ['geriatria', 'aps', 'demencia', 'alzheimer', 'cognitivo', 'neuropsiquiatrico']
  },

  // ============================================================================
  // 3. DELIRIUM
  // ============================================================================
  {
    id: 'delirium',
    titulo: 'Delirium',
    sinonimos: [
      'Estado confusional agudo',
      'Confusao mental aguda',
      'Sindrome cerebral organica aguda',
      'Encefalopatia metabolica',
      'Psicose exogena'
    ],
    doid: 'DOID:11260',
    snomedCT: '2776000',
    meshId: 'D003693',
    umlsCui: 'C0011206',
    ciap2: ['P71'],
    cid10: ['F05.9', 'F05.0', 'F05.1'],
    cid11: ['6D70'],
    categoria: 'geriatrico',
    subcategoria: 'neuropsiquiatrico',

    quickView: {
      definicao: 'Sindrome neuropsiquiatrica aguda caracterizada por alteracao flutuante da atencao e consciencia, com disturbio cognitivo adicional, que se desenvolve em curto periodo (horas a dias) e representa mudanca do estado basal. E uma emergencia medica frequentemente subdiagnosticada. Prevalencia de 15-30% em idosos hospitalizados; ate 80% em UTI.',
      criteriosDiagnosticos: [
        'CRITERIOS DSM-5:',
        'A. Perturbacao da atencao (capacidade reduzida de direcionar, focar, manter e mudar atencao) E consciencia (orientacao reduzida para o ambiente)',
        'B. Desenvolve-se em curto periodo (horas a poucos dias), representa mudanca do basal, tende a flutuar ao longo do dia',
        'C. Perturbacao adicional na cognicao (memoria, orientacao, linguagem, capacidade visuoespacial ou percepcao)',
        'D. Nao e melhor explicado por outro transtorno neurocognitivo e nao ocorre em contexto de coma',
        'E. Ha evidencia de causa organica subjacente',
        '',
        'SCREENING: CAM (Confusion Assessment Method) positivo'
      ],
      classificacaoRisco: [
        {
          nivel: 'baixo',
          criterios: ['Delirium hipoativo leve', 'Causa facilmente identificavel', 'Sem agitacao'],
          conduta: 'Tratar causa base, medidas nao farmacologicas'
        },
        {
          nivel: 'moderado',
          criterios: ['Delirium misto', 'Multiplas causas possiveis', 'Agitacao moderada'],
          conduta: 'Investigacao ampla, medidas nao farmacologicas intensivas, considerar farmacoterapia'
        },
        {
          nivel: 'alto',
          criterios: ['Delirium hiperativo grave', 'Risco de auto ou heteroagressao', 'Instabilidade clinica'],
          conduta: 'Ambiente de cuidados intensivos, tratamento farmacologico, monitoramento continuo'
        }
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'IDENTIFICAR E TRATAR A CAUSA (prioridade absoluta)',
          'Reorientacao frequente (data, local, situacao)',
          'Ambiente calmo, iluminado, com objetos familiares',
          'Relogio e calendario visiveis',
          'Presenca de familiar/cuidador',
          'Corrigir deficits sensoriais (oculos, protese auditiva)',
          'Evitar contencao fisica (aumenta agitacao)',
          'Mobilizacao precoce',
          'Promover ciclo sono-vigilia normal',
          'Hidratacao e nutricao adequadas'
        ],
        farmacologico: [
          'PRIMEIRA OPCAO: Medidas nao farmacologicas (evitar farmacos se possivel)',
          '',
          'SE AGITACAO GRAVE COM RISCO:',
          'Haloperidol 0,5-1mg VO/IM, repetir em 30-60min SN (max 3-5mg/dia)',
          'OU Risperidona 0,25-0,5mg VO',
          'OU Quetiapina 12,5-25mg VO (se parkinsonismo)',
          '',
          'NUNCA USAR: Benzodiazepinicos (exceto delirium por abstinencia alcoolica)'
        ]
      },
      metasTerapeuticas: [
        'Identificar e tratar causa subjacente',
        'Resolucao do delirium',
        'Prevenir complicacoes (quedas, lesoes, aspiracao)',
        'Manter seguranca do paciente e equipe',
        'Evitar uso prolongado de farmacos'
      ],
      examesIniciais: [
        'Hemograma completo',
        'Eletrolitos (sodio, potassio, calcio, magnesio)',
        'Funcao renal (ureia, creatinina)',
        'Glicemia capilar/venosa',
        'Gasometria arterial (se hipoxia)',
        'Funcao hepatica',
        'EAS e urocultura (ITU e causa comum)',
        'Radiografia de torax',
        'ECG',
        'Revisao completa de medicamentos'
      ],
      redFlags: [
        'Delirium hiperativo grave com risco de violencia',
        'Sinais de sepse ou infeccao grave',
        'Sinais neurologicos focais (considerar AVC)',
        'Cefaleia intensa, rigidez de nuca (meningite/HSA)',
        'Febre alta',
        'Hipoxemia grave',
        'Disturbios metabolicos graves (Na <120 ou >160)',
        'Abstinencia alcoolica (risco de Wernicke/Korsakoff)',
        'Intoxicacao por substancias',
        'Paciente nao responsivo'
      ]
    },

    fullContent: {
      epidemiologia: {
        prevalencia: '15-30% em idosos hospitalizados; ate 80% em UTI',
        incidencia: '6-56% incidencia durante hospitalizacao em idosos; 15-53% pos-operatorio',
        mortalidade: 'Mortalidade hospitalar 10-26%; 1 ano 35-40%',
        faixaEtaria: 'Raro em jovens; muito comum em idosos (>65 anos)',
        fatoresRisco: [
          'PREDISPONENTES (vulnerabilidade):',
          'Idade avancada (>65 anos)',
          'Demencia previa (principal fator)',
          'Multiplas comorbidades',
          'Historia previa de delirium',
          'Deficit sensorial (visao, audicao)',
          'Desnutricao',
          'Fragilidade',
          '',
          'PRECIPITANTES (insulto agudo):',
          'Infeccoes (especialmente ITU, pneumonia)',
          'Medicamentos (anticolinergicos, benzodiazepinicos, opioides)',
          'Disturbios metabolicos (desidratacao, eletrolitos, glicemia)',
          'Dor nao tratada',
          'Retencao urinaria, constipacao (fecaloma)',
          'Cirurgia, anestesia',
          'Hipoxia',
          'Abstinencia (alcool, benzodiazepinicos)',
          'Ambiente de UTI, contencao fisica'
        ],
        citations: [{ refId: 'sbgg-delirium-2023' }]
      },
      fisiopatologia: {
        texto: 'Mecanismo nao completamente elucidado. Teoria principal: desequilibrio de neurotransmissores (deficiencia colinergica, excesso dopaminergico, alteracao GABAergica, desregulacao de serotonina). Neuroinflamacao (citocinas pro-inflamatorias) e estresse oxidativo contribuem. Disfuncao da barreira hematoencefalica permite passagem de mediadores inflamatorios. A vulnerabilidade cerebral (demencia, idade) reduz a reserva cognitiva e o limiar para delirium.',
        citations: [{ refId: 'sbgg-delirium-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'ALTERACAO DA ATENCAO (cardinal):',
          '- Dificuldade em manter foco, facilmente distraivel',
          '- Incapaz de seguir comandos complexos',
          '',
          'ALTERACAO DA CONSCIENCIA:',
          '- Desorientacao (tempo, espaco, pessoa)',
          '- Rebaixamento ou hipervigilancia',
          '',
          'FLUTUACAO:',
          '- Sintomas variam ao longo do dia',
          '- Piora tipica ao entardecer/noite (sundowning)',
          '',
          'DISTURBIOS COGNITIVOS ADICIONAIS:',
          '- Deficit de memoria de curto prazo',
          '- Linguagem incoerente',
          '- Alteracoes perceptivas (alucinacoes, ilusoes)'
        ],
        sinaisExameFisico: [
          'Paciente desatento, confuso, desorientado',
          'Discurso desorganizado ou incoerente',
          'Alteracao do nivel de consciencia',
          'Buscar sinais da causa base:',
          '- Febre (infeccao)',
          '- Sinais de desidratacao',
          '- Sinais de infeccao localizada',
          '- Bexigoma (retencao urinaria)',
          '- Globo fecal',
          '- Asterixis (encefalopatia hepatica)'
        ],
        formasClinicas: [
          'DELIRIUM HIPERATIVO (25%):',
          '- Agitacao, agressividade',
          '- Alucinacoes, delírios',
          '- Hipervigilancia',
          '',
          'DELIRIUM HIPOATIVO (25-50%):',
          '- Letargia, sonolencia',
          '- Lentificacao psicomotora',
          '- Apatia, reducao da fala',
          '- MAIS SUBDIAGNOSTICADO e de pior prognostico',
          '',
          'DELIRIUM MISTO (25-35%):',
          '- Alterna entre hiper e hipoativo'
        ],
        citations: [{ refId: 'sbgg-delirium-2023' }]
      },
      diagnostico: {
        criterios: [
          'CAM (Confusion Assessment Method):',
          '1. Inicio agudo E curso flutuante',
          '2. Desatencao',
          '3. Pensamento desorganizado',
          '4. Alteracao do nivel de consciencia',
          '',
          'CAM POSITIVO = (1 + 2) + (3 OU 4)',
          '',
          '4AT (alternativa, mais rapido):',
          '- Alerta (0-4 pontos)',
          '- AMT4 (orientacao)',
          '- Atencao (meses do ano ao contrario)',
          '- Mudanca aguda ou curso flutuante',
          '>=4 pontos = possivel delirium'
        ],
        diagnosticoDiferencial: [
          'Demencia (cronica, sem flutuacao aguda)',
          'Depressao grave (pseudodelirium)',
          'Psicose funcional (esquizofrenia)',
          'Afasia de Wernicke',
          'Estado pos-ictal',
          'Catatonia',
          'Estado dissociativo',
          'Simulacao'
        ],
        examesLaboratoriais: [
          'Hemograma completo',
          'Eletrolitos (Na, K, Ca, Mg, P)',
          'Glicemia',
          'Funcao renal (ureia, creatinina)',
          'Funcao hepatica',
          'TSH',
          'Gasometria arterial',
          'EAS e urocultura',
          'Niveis sericos de medicamentos (digoxina, lítio, anticonvulsivantes)',
          'Amonia se hepatopatia'
        ],
        examesImagem: [
          'Radiografia de torax (pneumonia)',
          'TC de cranio (se sinais focais, trauma, sem causa identificada)'
        ],
        outrosExames: [
          'ECG',
          'Puncao lombar (se suspeita de meningite/encefalite)',
          'EEG (se suspeita de estado de mal epileptico nao convulsivo)'
        ],
        citations: [{ refId: 'sbgg-delirium-2023' }]
      },
      tratamento: {
        objetivos: [
          'Identificar e tratar causa subjacente (prioridade)',
          'Garantir seguranca do paciente',
          'Manejar sintomas perturbadores',
          'Prevenir complicacoes',
          'Minimizar uso de farmacos'
        ],
        naoFarmacologico: {
          medidas: [
            'TRATAR CAUSA BASE (mais importante):',
            '- Tratar infeccao',
            '- Corrigir desidratacao e disturbios eletrolíticos',
            '- Suspender medicamentos deliriogenicos',
            '- Aliviar dor',
            '- Tratar constipacao/retencao urinaria',
            '- Corrigir hipoxia',
            '',
            'MEDIDAS AMBIENTAIS E COMPORTAMENTAIS:',
            '- Ambiente calmo, iluminado, silencioso',
            '- Reorientacao frequente e gentil',
            '- Relogio, calendario, objetos familiares',
            '- Presenca de familiar',
            '- Corrigir deficits sensoriais',
            '- EVITAR contencao fisica (aumenta agitacao)',
            '- Mobilizacao precoce',
            '- Preservar ciclo sono-vigilia',
            '- Hidratacao e nutricao adequadas'
          ],
          citations: [{ refId: 'sbgg-delirium-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Antipsicotico tipico',
              medicamentos: ['Haloperidol'],
              posologia: '0,5-1mg VO ou IM, repetir em 30-60min SN, max 3-5mg/dia',
              observacoes: 'Apenas se agitacao grave com risco. Menor dose, menor tempo. Monitorar ECG (QTc).'
            }
          ],
          segundaLinha: [
            {
              classe: 'Antipsicoticos atipicos',
              medicamentos: ['Risperidona', 'Quetiapina', 'Olanzapina'],
              posologia: 'Risperidona 0,25-0,5mg VO 1-2x/dia; Quetiapina 12,5-50mg VO; Olanzapina 2,5-5mg',
              observacoes: 'Quetiapina preferida se parkinsonismo. Evitar em demencia com corpos de Lewy.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Delirium por abstinencia alcoolica',
              conduta: 'Benzodiazepinicos SAO indicados: Diazepam 10-20mg VO ou IV, repetir conforme protocolo CIWA-Ar. Tiamina 300mg IV antes de glicose. NUNCA usar antipsicóticos isolados.'
            },
            {
              situacao: 'Delirium por abstinencia de benzodiazepinicos',
              conduta: 'Reintroduzir benzodiazepínico com reducao gradual.'
            },
            {
              situacao: 'Delirium em paciente com Parkinson ou demencia com corpos de Lewy',
              conduta: 'Evitar haloperidol e antipsicóticos tipicos. Se necessario, usar quetiapina em baixa dose.'
            },
            {
              situacao: 'Delirium hipoativo',
              conduta: 'NAO usar antipsicóticos rotineiramente. Focar em tratar causa e medidas nao farmacológicas. Revisar sedativos.'
            }
          ],
          citations: [{ refId: 'sbgg-delirium-2023' }]
        },
        duracao: 'Descontinuar farmacos assim que agitacao controlada. Delirium pode persistir dias a semanas apos resolucao da causa.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Monitoramento continuo ate resolucao; reavaliacao cognitiva apos alta',
        examesControle: [
          'CAM ou 4AT a cada turno na hospitalizacao',
          'Monitorar resposta ao tratamento da causa',
          'ECG se uso de antipsicóticos',
          'Avaliacao cognitiva apos resolucao (1-3 meses)'
        ],
        metasTerapeuticas: [
          'Resolucao do delirium',
          'Retorno ao nivel cognitivo basal',
          'Ausencia de complicacoes (quedas, lesoes)',
          'Alta hospitalar segura'
        ],
        criteriosEncaminhamento: [
          'UTI: instabilidade clinica, necessidade de ventilacao, intoxicacao grave',
          'Neurologia: sinais focais, suspeita de AVC, convulsoes',
          'Psiquiatria: delirium prolongado, sobreposicao psiquiatrica',
          'Geriatria: avaliacao pos-delirium, suspeita de demencia subjacente'
        ],
        citations: [{ refId: 'sbgg-delirium-2023' }]
      },
      prevencao: {
        primaria: [
          'Protocolo multicomponente de prevencao (HELP):',
          '- Orientacao e estimulacao cognitiva',
          '- Mobilizacao precoce',
          '- Promocao do sono',
          '- Correcao de deficits sensoriais',
          '- Hidratacao adequada',
          '- Revisao de medicamentos',
          '- Evitar contencao fisica e cateteres'
        ],
        secundaria: [
          'Identificacao precoce com screening (CAM, 4AT)',
          'Intervencao rapida na causa',
          'Evitar progressao para delirium persistente'
        ],
        citations: [{ refId: 'sbgg-delirium-2023' }]
      },
      populacoesEspeciais: {
        idosos: 'Principal populacao de risco. Idosos com demencia tem risco muito elevado. O delirium pode acelerar declinio cognitivo permanente.',
        gestantes: 'Raro; considerar eclampsia, sepse puerperal',
        criancas: 'Raro; investigar encefalite, intoxicacao, sepse'
      }
    },

    protocolos: ['delirium-sbgg', 'nice-delirium', 'help-protocol'],
    medicamentos: ['haloperidol', 'risperidona', 'quetiapina'],
    calculadoras: ['cam', '4at', 'ciwa-ar'],
    citations: [
      { refId: 'sbgg-delirium-2023' },
      { refId: 'nice-delirium-2019' }
    ],
    lastUpdate: '2024-01-01',
    tags: ['geriatria', 'aps', 'delirium', 'confusao', 'emergencia', 'neuropsiquiatrico']
  },

  // ============================================================================
  // 4. QUEDAS NO IDOSO
  // ============================================================================
  {
    id: 'quedas-idoso',
    titulo: 'Quedas no Idoso',
    sinonimos: [
      'Queda recorrente',
      'Sindrome das quedas',
      'Instabilidade postural',
      'Risco de queda',
      'Fall syndrome'
    ],
    doid: 'DOID:0080700',
    snomedCT: '161898004',
    meshId: 'D000058',
    umlsCui: 'C0085639',
    ciap2: ['A29', 'L81'],
    cid10: ['R29.6', 'W01', 'W18', 'W19'],
    cid11: ['MB4F'],
    categoria: 'geriatrico',
    subcategoria: 'sindrome-geriatrica',

    quickView: {
      definicao: 'Evento nao intencional que resulta em mudanca de posicao do individuo para um nivel mais baixo em relacao a sua posicao inicial, nao consequente a uma paralisia subita, convulsao ou forca externa. Cerca de 30% dos idosos >65 anos caem pelo menos 1x/ano; 50% dos >80 anos. Consequencias graves: fraturas (femur, coluna), TCE, medo de cair, dependencia funcional, morte.',
      criteriosDiagnosticos: [
        'AVALIACAO DE RISCO DE QUEDAS:',
        'Historia de queda no ultimo ano (fator de risco independente)',
        'Dificuldade de equilibrio ou marcha observada',
        'Timed Up and Go (TUG) >12 segundos = alto risco',
        'Uso de >=4 medicamentos ou medicamentos de alto risco (psicotrópicos)',
        'Deficit visual',
        'Medo de cair (limita atividades)',
        'Queda recorrente: >=2 quedas em 12 meses'
      ],
      classificacaoRisco: [
        {
          nivel: 'baixo',
          criterios: ['Sem queda no ultimo ano', 'TUG <10s', 'Sem alteracao de marcha'],
          conduta: 'Orientacoes gerais, atividade fisica regular, revisao anual'
        },
        {
          nivel: 'moderado',
          criterios: ['1 queda no ultimo ano sem lesao', 'TUG 10-12s', 'Dificuldade leve de equilibrio'],
          conduta: 'Avaliacao multifatorial de risco, intervencoes direcionadas'
        },
        {
          nivel: 'alto',
          criterios: ['>=2 quedas/ano', 'Queda com lesao', 'TUG >12s', 'Anormalidade de marcha evidente'],
          conduta: 'Avaliacao geriátrica ampla, programa de prevencao intensivo'
        }
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'EXERCICIO FISICO (evidencia nivel A):',
          'Treino de equilibrio (Tai Chi) 2-3x/semana',
          'Treino de forca (membros inferiores)',
          'Exercicios de dupla tarefa',
          '',
          'REVISAO DE MEDICAMENTOS:',
          'Reduzir/suspender psicotrópicos se possivel',
          'Evitar polifarmacia, revisar criterios de Beers',
          '',
          'MODIFICACAO AMBIENTAL:',
          'Remover tapetes soltos, instalar barras de apoio',
          'Iluminacao adequada, especialmente noturna',
          'Calcados adequados (sola antiderrapante)',
          '',
          'CORRECAO DE DEFICITS SENSORIAIS:',
          'Avaliar e corrigir visao',
          'Avaliar audicao'
        ],
        farmacologico: [
          'NAO ha farmaco especifico para prevencao de quedas',
          '',
          'TRATAR CONDICOES CONTRIBUINTES:',
          'Vitamina D 800-2000UI/dia se deficiencia',
          'Tratar hipotensao ortostatica (revisar anti-hipertensivos, hidratacao)',
          'Tratar vertigem se VPPB ou causa central',
          'Tratar arritmias se sincope',
          '',
          'EVITAR/REDUZIR:',
          'Benzodiazepinicos, hipnoticos',
          'Antidepressivos triciclicos',
          'Antipsicoticos',
          'Anti-hipertensivos em excesso'
        ]
      },
      metasTerapeuticas: [
        'Prevenir novas quedas',
        'Reduzir medo de cair',
        'Manter independencia funcional',
        'Prevenir fraturas e lesoes graves',
        'Melhorar forca e equilibrio'
      ],
      examesIniciais: [
        'Avaliacao da marcha e equilibrio (Get Up and Go, Tinetti)',
        'Teste de acuidade visual',
        'Medicacao em uso (psicotrópicos)',
        'PA deitado e em pe (hipotensao ortostatica)',
        'Hemograma (anemia)',
        'Glicemia (hipoglicemia)',
        '25-OH-vitamina D',
        'ECG (arritmias, bloqueios)',
        'Se sincope: investigacao cardiologica'
      ],
      redFlags: [
        'Queda com perda de consciencia (sincope vs. convulsao)',
        'Queda com trauma craniencefalico',
        'Fratura (especialmente quadril, vertebra)',
        'Sinais neurologicos focais (AVC)',
        'Queda em escada ou de altura',
        'Multiplas quedas em curto periodo',
        'Medo extremo de cair com imobilidade',
        'Hematomas multiplos inexplicados'
      ]
    },

    fullContent: {
      epidemiologia: {
        prevalencia: '30% dos idosos >65 anos caem pelo menos 1x/ano; 50% dos >80 anos',
        incidencia: '30-40% dos idosos comunitarios caem anualmente; 50% dos institucionalizados',
        mortalidade: 'Quedas sao 6a causa de morte em idosos; 70% das mortes por lesoes nao intencionais',
        faixaEtaria: 'Aumenta progressivamente com a idade, especialmente >80 anos',
        fatoresRisco: [
          'INTRINSECOS (relacionados ao paciente):',
          'Idade avancada',
          'Historia de queda previa (principal preditor)',
          'Fraqueza muscular (MMII)',
          'Disturbio de marcha e equilibrio',
          'Deficit visual',
          'Deficits cognitivos e demencia',
          'Doenca de Parkinson',
          'AVC previo',
          'Artrite e dor cronica',
          'Hipotensao ortostatica',
          'Vertigem/tontura',
          'Incontinencia urinaria (urgencia)',
          'Depressao e medo de cair',
          '',
          'EXTRINSECOS (ambientais e medicamentos):',
          'Polifarmacia (>=4 medicamentos)',
          'Psicotrópicos (benzodiazepinicos, antidepressivos)',
          'Tapetes soltos, obstaculos no ambiente',
          'Iluminacao inadequada',
          'Calcados inapropriados',
          'Ausencia de barras de apoio'
        ],
        citations: [{ refId: 'sbgg-quedas-2023' }]
      },
      fisiopatologia: {
        texto: 'O controle postural requer integracao de multiplos sistemas: vestibular, visual, proprioceptivo, musculoesquelético e cognitivo. Com o envelhecimento, ocorre declinio de todos esses sistemas: reducao da acuidade visual, perda de celulas vestibulares, reducao da propriocepcao, sarcopenia, lentificacao do processamento central. A queda ocorre quando a demanda para manter o equilibrio excede a capacidade do individuo. Modelo multifatorial: a queda resulta da interacao de fatores de risco intrinsecos e extrinsecos em um momento de estresse postural.',
        citations: [{ refId: 'sbgg-quedas-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'ANAMNESE DA QUEDA:',
          'Circunstancias: onde, quando, o que estava fazendo',
          'Sintomas precedentes: tontura, palpitacao, fraqueza, escurecimento visual',
          'Perda de consciencia?',
          'Conseguiu se levantar sozinho?',
          'Lesoes resultantes',
          '',
          'SINAIS ASSOCIADOS:',
          'Instabilidade na marcha',
          'Lentidao para levantar',
          'Uso de apoio (bengala, paredes)',
          'Medo de cair, restricao de atividades'
        ],
        sinaisExameFisico: [
          'AVALIACAO DA MARCHA:',
          '- Timed Up and Go (TUG): >12s = alto risco',
          '- Teste de Tinetti (POMA)',
          '- Short Physical Performance Battery (SPPB)',
          '',
          'AVALIACAO CARDIOVASCULAR:',
          '- PA deitado e em pe (queda >20 sistolica = hipotensao ortostatica)',
          '- FC (bradicardia, arritmias)',
          '',
          'AVALIACAO NEUROLOGICA:',
          '- Forca muscular MMII',
          '- Sensibilidade proprioceptiva (Romberg)',
          '- Funcao cerebelar',
          '- Cognição (MEEM)',
          '',
          'AVALIACAO VISUAL E AUDITIVA'
        ],
        formasClinicas: [
          'Queda acidental (unica, causa externa clara)',
          'Queda recorrente (>=2/ano - requer investigacao)',
          'Queda sincopal (com perda de consciencia)',
          'Near-fall (quase-queda, conseguiu se recuperar)',
          'Sindrome pos-queda (medo de cair, restricao, ciclo vicioso)'
        ],
        citations: [{ refId: 'sbgg-quedas-2023' }]
      },
      diagnostico: {
        criterios: [
          'SCREENING INICIAL (AGS/BGS):',
          '1. Pergunta de rastreio: "Voce caiu no ultimo ano?"',
          '2. Se sim: quantas vezes? Houve lesao? Dificuldade de marcha?',
          '3. Avaliacao de marcha (TUG)',
          '',
          'AVALIACAO MULTIFATORIAL (se alto risco):',
          '- Historia detalhada das quedas',
          '- Medicamentos em uso',
          '- Exame fisico focado',
          '- Avaliacao funcional',
          '- Avaliacao ambiental'
        ],
        diagnosticoDiferencial: [
          'Sincope (cardiaca, vasovagal, ortostatica)',
          'Convulsao',
          'Drop attack (insuficiencia vertebrobasilar)',
          'AIT/AVC',
          'Hipoglicemia',
          'Vertigem posicional paroxistica benigna (VPPB)',
          'Acidente (fator externo isolado)'
        ],
        examesLaboratoriais: [
          'Hemograma (anemia)',
          'Glicemia',
          'Eletrolitos, funcao renal',
          '25-OH-vitamina D',
          'TSH',
          'B12 (se neuropatia suspeita)'
        ],
        examesImagem: [
          'Radiografia se suspeita de fratura',
          'TC de cranio se TCE',
          'RM de coluna se dor lombar/radiculopatia'
        ],
        outrosExames: [
          'ECG (arritmias, bloqueios)',
          'Holter 24h se sincope recorrente',
          'Ecocardiograma se sopro ou IC suspeita',
          'EEG se suspeita de convulsao',
          'Audiometria e avaliacao otoneurologica se vertigem'
        ],
        citations: [{ refId: 'sbgg-quedas-2023' }]
      },
      tratamento: {
        objetivos: [
          'Prevenir novas quedas',
          'Tratar causas modificaveis',
          'Manter independencia',
          'Prevenir fraturas e lesoes',
          'Reduzir medo de cair'
        ],
        naoFarmacologico: {
          medidas: [
            'EXERCICIO FISICO (evidencia nivel A):',
            '- Programa multicomponente supervisionado',
            '- Treino de equilibrio (Tai Chi: reducao de 20-40% nas quedas)',
            '- Fortalecimento de MMII',
            '- Exercicios de dupla tarefa',
            '- Minimo 3x/semana, duracao prolongada (>3 meses)',
            '',
            'MODIFICACAO AMBIENTAL:',
            '- Remover tapetes soltos e fios',
            '- Instalar barras de apoio no banheiro',
            '- Elevar assento do vaso sanitario',
            '- Iluminacao adequada (noturna incluida)',
            '- Corrimaos em escadas',
            '- Calcados adequados (sola antiderrapante, sem salto)',
            '',
            'CORRECAO DE DEFICITS SENSORIAIS:',
            '- Cirurgia de catarata se indicada (reduz quedas)',
            '- Oculos atualizados',
            '- Evitar lentes multifocais ao caminhar',
            '- Aparelho auditivo se perda',
            '',
            'EDUCACAO E MODIFICACAO COMPORTAMENTAL:',
            '- Levantar-se lentamente',
            '- Sentar antes de levantar',
            '- Uso adequado de dispositivos de auxilio'
          ],
          citations: [{ refId: 'sbgg-quedas-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Suplementacao de vitamina D',
              medicamentos: ['Colecalciferol'],
              posologia: '800-2000 UI/dia se 25-OH-D <30ng/ml',
              observacoes: 'Reduz quedas em idosos com deficiencia. Nao ha beneficio se nivel normal.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Tratamento de hipotensao ortostatica',
              medicamentos: ['Fludrocortisona', 'Midodrina'],
              posologia: 'Fludrocortisona 0,1-0,2mg/dia; Midodrina 2,5-10mg 3x/dia',
              observacoes: 'Apos medidas nao farmacologicas (hidratacao, meias compressivas, levantar lento)'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Polifarmacia',
              conduta: 'Revisar todos os medicamentos. Descontinuar ou reduzir psicotrópicos, sedativos-hipnoticos, anticolinergicos. Reduzir anti-hipertensivos se hipotensao.'
            },
            {
              situacao: 'VPPB',
              conduta: 'Manobra de Epley (reposicionamento canalicular). Eficacia >80%.'
            },
            {
              situacao: 'Sindrome pos-queda (medo de cair)',
              conduta: 'Abordagem multidisciplinar: fisioterapia, terapia ocupacional, suporte psicologico. Exercicio gradual supervisionado.'
            }
          ],
          citations: [{ refId: 'sbgg-quedas-2023' }]
        },
        duracao: 'Prevencao continua; exercicio deve ser mantido indefinidamente'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses em alto risco; anual em baixo risco',
        examesControle: [
          'Reavaliar risco de quedas periodicamente',
          'TUG ou teste de equilibrio',
          'Revisao de medicamentos',
          '25-OH-vitamina D anual',
          'Densitometria ossea (risco de fratura)'
        ],
        metasTerapeuticas: [
          'Reducao do numero de quedas',
          'Ausencia de quedas com lesao',
          'Manutencao da mobilidade e independencia',
          'Reducao do medo de cair',
          'Melhora nos testes de equilibrio'
        ],
        criteriosEncaminhamento: [
          'Fisioterapia: programa de exercicios supervisionado',
          'Geriatria: avaliacao multidimensional complexa',
          'Cardiologia: sincope, arritmia',
          'Neurologia: Parkinson, neuropatia, vertigem central',
          'Otorrinolaringologia: vertigem, VPPB refrataria',
          'Ortopedia: fratura, osteoartrose grave'
        ],
        citations: [{ refId: 'sbgg-quedas-2023' }]
      },
      prevencao: {
        primaria: [
          'Atividade fisica regular ao longo da vida',
          'Manutencao de forca e equilibrio',
          'Controle de doencas cronicas',
          'Avaliacao e correcao visual periodica',
          'Ambiente domiciliar seguro',
          'Evitar polifarmacia e medicamentos de risco',
          'Suplementacao de vitamina D se deficiencia'
        ],
        secundaria: [
          'Rastreamento anual de quedas em idosos',
          'Avaliacao multifatorial em quem caiu',
          'Intervencao multicomponente em alto risco'
        ],
        citations: [{ refId: 'sbgg-quedas-2023' }]
      },
      populacoesEspeciais: {
        idosos: 'Todos os idosos devem ser rastreados anualmente. Idosos com demencia tem risco muito elevado e necessitam supervisao e ambiente adaptado. Idosos institucionalizados: maior incidencia.',
        gestantes: 'N/A',
        criancas: 'N/A'
      }
    },

    protocolos: ['quedas-sbgg', 'ags-falls-prevention', 'nice-falls'],
    medicamentos: ['vitamina-d', 'fludrocortisona'],
    calculadoras: ['timed-up-and-go', 'tinetti', 'sppb'],
    citations: [
      { refId: 'sbgg-quedas-2023' },
      { refId: 'ags-falls-2023' }
    ],
    lastUpdate: '2024-01-01',
    tags: ['geriatria', 'aps', 'quedas', 'equilibrio', 'sindrome-geriatrica', 'prevencao']
  },

  // ============================================================================
  // 5. POLIFARMACIA
  // ============================================================================
  {
    id: 'polifarmacia',
    titulo: 'Polifarmacia no Idoso',
    sinonimos: [
      'Polifarmacia',
      'Polimedicacao',
      'Uso de multiplos medicamentos',
      'Prescricao inadequada',
      'Medicamentos potencialmente inapropriados'
    ],
    snomedCT: '710852002',
    meshId: 'D019338',
    umlsCui: 'C0032257',
    ciap2: ['A91'],
    cid10: ['Y57.9', 'T88.7'],
    cid11: ['NE61'],
    categoria: 'geriatrico',
    subcategoria: 'farmacoterapia',

    quickView: {
      definicao: 'Uso concomitante de multiplos medicamentos, geralmente definido como >=5 medicamentos de uso cronico. Polifarmacia excessiva: >=10 medicamentos. E comum em idosos (30-70% dos >65 anos) e esta associada a maior risco de reacoes adversas, interacoes, quedas, hospitalizacoes, declinio funcional e cognitivo, e aumento da mortalidade. A desprescricao segura e uma intervencao essencial.',
      criteriosDiagnosticos: [
        'DEFINICOES:',
        'Polifarmacia: >=5 medicamentos de uso cronico',
        'Polifarmacia excessiva (hiperpolifarmacia): >=10 medicamentos',
        '',
        'MEDICAMENTOS POTENCIALMENTE INAPROPRIADOS (MPIs):',
        'Criterios de Beers (AGS): lista de medicamentos a evitar em idosos',
        'Criterios STOPP/START: ferramentas de desprescricao',
        'Cascata de prescricao: novo medicamento para tratar efeito adverso de outro',
        '',
        'INDICADORES DE PROBLEMA:',
        'Reacoes adversas a medicamentos (RAMs)',
        'Quedas associadas a medicamentos',
        'Confusao mental/delirium',
        'Nao adesao por regimes complexos'
      ],
      classificacaoRisco: [
        {
          nivel: 'baixo',
          criterios: ['<5 medicamentos', 'Sem MPIs', 'Boa adesao', 'Sem RAMs'],
          conduta: 'Revisao periodica da farmacoterapia'
        },
        {
          nivel: 'moderado',
          criterios: ['5-9 medicamentos', '1-2 MPIs', 'Dificuldade de adesao leve'],
          conduta: 'Revisao detalhada, desprescrever MPIs, simplificar regime'
        },
        {
          nivel: 'alto',
          criterios: ['>=10 medicamentos', 'Multiplos MPIs', 'RAMs presentes', 'Quedas/confusao'],
          conduta: 'Desprescricao sistematica, avaliacao geriatrica, reconciliacao medicamentosa'
        }
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'REVISAO SISTEMATICA DA FARMACOTERAPIA:',
          'Listar TODOS os medicamentos (incluir fitoterapicos, suplementos)',
          'Verificar indicacao atual de cada medicamento',
          'Identificar MPIs usando Beers e STOPP/START',
          'Identificar interacoes medicamentosas',
          'Avaliar adesao e capacidade de autoadministracao',
          '',
          'DESPRESCRICAO:',
          'Priorizar medicamentos sem indicacao clara',
          'Desprescrever MPIs de alto risco',
          'Reduzir/simplificar anti-hipertensivos se hipotensao',
          'Reduzir hipoglicemiantes se hipoglicemia',
          'Usar piramide de desprescricao'
        ],
        farmacologico: [
          'O OBJETIVO E REDUZIR MEDICAMENTOS, NAO ADICIONAR',
          '',
          'ABORDAGEM DE DESPRESCRICAO:',
          '1. Medicamentos sem indicacao atual: SUSPENDER',
          '2. MPIs de alto risco: SUBSTITUIR ou SUSPENDER',
          '3. Cascatas de prescricao: SUSPENDER o causador',
          '4. Medicamentos com beneficio incerto em idosos frageis: REAVALIAR',
          '',
          'DESPRESCRICAO GRADUAL quando necessario (evitar rebote):',
          'Benzodiazepinicos: reduzir 10-25% a cada 2-4 semanas',
          'Antidepressivos: reduzir 25% a cada 2-4 semanas',
          'IBPs: reduzir dose ou usar SOS antes de suspender'
        ]
      },
      metasTerapeuticas: [
        'Reduzir numero de medicamentos para o minimo necessario',
        'Eliminar MPIs',
        'Reduzir reacoes adversas',
        'Melhorar adesao',
        'Simplificar regime posologico',
        'Melhorar qualidade de vida e funcionalidade'
      ],
      examesIniciais: [
        'Lista completa de medicamentos (reconciliacao)',
        'Funcao renal (ajuste de doses)',
        'Funcao hepatica',
        'Avaliacao cognitiva (capacidade de gerenciar medicamentos)',
        'Avaliacao funcional',
        'Revisao de quedas e sintomas adversos'
      ],
      redFlags: [
        'Queda recente (investigar medicamento causador)',
        'Confusao mental nova ou piora (delirium por medicamentos)',
        'Sangramento (anticoagulantes, AINEs)',
        'Hipotensao ortostática sintomatica',
        'Hipoglicemia',
        'Insuficiencia renal aguda (AINEs, IECA em desidratacao)',
        'Constipacao grave (opioides, anticolinergicos)',
        'Retencao urinaria (anticolinergicos)'
      ]
    },

    fullContent: {
      epidemiologia: {
        prevalencia: '30-70% dos idosos >=65 anos usam >=5 medicamentos; 20-30% usam >=10',
        incidencia: 'Aumenta com a idade e numero de comorbidades',
        faixaEtaria: 'Mais comum em >75 anos e idosos institucionalizados',
        fatoresRisco: [
          'Idade avancada',
          'Multiplas doencas cronicas (multimorbidade)',
          'Multiplos prescritores',
          'Hospitalizacoes frequentes',
          'Automedicacao',
          'Baixa escolaridade',
          'Falta de revisao periodica de medicamentos',
          'Pressao de pacientes/familiares para prescrever',
          'Diretrizes focadas em doencas unicas'
        ],
        citations: [{ refId: 'sbgg-polifarmacia-2023' }]
      },
      fisiopatologia: {
        texto: 'Alteracoes farmacocineticas no envelhecimento: reducao do metabolismo hepatico (citocromo P450), reducao da excrecao renal (TFG cai ~1ml/min/ano apos 40), aumento da gordura corporal (acumulo de lipofílicos), reducao da albumina (maior fracao livre). Alteracoes farmacodinamicas: maior sensibilidade a psicotrópicos, anticolinergicos. O risco de interacoes aumenta exponencialmente: 5 medicamentos = 50% de chance de interacao; 8+ = quase 100%. Cascata de prescricao: efeito adverso e interpretado como nova doenca, gerando nova prescricao.',
        citations: [{ refId: 'sbgg-polifarmacia-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'SINTOMAS COMUNS DE RAMs EM IDOSOS:',
          'Quedas (psicotrópicos, anti-hipertensivos)',
          'Confusao mental, delirium (anticolinergicos)',
          'Tontura, hipotensao ortostatica',
          'Constipacao (opioides, anticolinergicos)',
          'Nausea, dispepsia (AINEs, bifosfonatos)',
          'Sangramento (anticoagulantes, AINEs, antiagreantes)',
          'Boca seca (anticolinergicos)',
          'Sonolencia excessiva (sedativos)',
          'Hipoglicemia (insulina, sulfonilureias)'
        ],
        sinaisExameFisico: [
          'Avaliar sinais de RAMs especificas:',
          'Bradicardia (betabloqueadores, digoxina)',
          'Hipotensao ortostatica',
          'Tremor (litio, antipsicóticos)',
          'Rigidez, parkinsonismo (antipsicoticos)',
          'Edema (BCC, AINEs)',
          'Boca seca, midriase (anticolinergicos)'
        ],
        formasClinicas: [
          'Polifarmacia apropriada: multiplos medicamentos necessarios e bem tolerados',
          'Polifarmacia problematica: inclui MPIs, RAMs, cascatas',
          'Subprescricao: ausencia de medicamentos indicados (ex: omissao de estatina por medo)'
        ],
        citations: [{ refId: 'sbgg-polifarmacia-2023' }]
      },
      diagnostico: {
        criterios: [
          'IDENTIFICACAO DE POLIFARMACIA:',
          'Contar TODOS os medicamentos cronicos (incluir suplementos)',
          '>=5 = polifarmacia; >=10 = hiperpolifarmacia',
          '',
          'IDENTIFICACAO DE MPIs:',
          'Criterios de Beers 2023 (AGS)',
          'Criterios STOPP/START v2',
          '',
          'MEDICAMENTOS DE ALTO RISCO EM IDOSOS:',
          'Benzodiazepinicos (quedas, confusao)',
          'Anticolinergicos (confusao, retencao urinaria, constipacao)',
          'Opioides (quedas, confusao, constipacao)',
          'Antipsicóticos (AVC, morte em demencia)',
          'AINEs (sangramento GI, IRA, HAS)',
          'Hipoglicemiantes potentes (hipoglicemia)'
        ],
        diagnosticoDiferencial: [
          'Progressao de doenca de base',
          'Nova doenca',
          'Interacao medicamentosa',
          'RAM de medicamento especifico',
          'Nao adesao ao tratamento',
          'Cascata de prescricao'
        ],
        examesLaboratoriais: [
          'Funcao renal (TFG para ajuste de doses)',
          'Funcao hepatica',
          'Hemograma',
          'Glicemia, HbA1c',
          'Eletrólitos',
          'INR se anticoagulante oral',
          'Niveis sericos de medicamentos se indicado (digoxina, litio, antiepiléticos)'
        ],
        citations: [{ refId: 'sbgg-polifarmacia-2023' }]
      },
      tratamento: {
        objetivos: [
          'Otimizar farmacoterapia',
          'Remover MPIs',
          'Reduzir RAMs e interacoes',
          'Melhorar adesao',
          'Simplificar regime',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'RECONCILIACAO MEDICAMENTOSA:',
            '- Listar todos os medicamentos em uso (prescritos e nao)',
            '- Verificar doses, frequencias, indicacoes',
            '- Identificar discrepancias entre prescrito e usado',
            '',
            'REVISAO ESTRUTURADA:',
            '- Para cada medicamento perguntar:',
            '  1. Ha indicacao atual clara?',
            '  2. O beneficio supera o risco neste paciente?',
            '  3. A dose esta adequada para funcao renal/hepatica?',
            '  4. Ha alternativa mais segura?',
            '  5. E possivel simplificar o regime?',
            '',
            'EDUCACAO DO PACIENTE/CUIDADOR:',
            '- Explicar razao de cada medicamento',
            '- Orientar sobre RAMs e quando procurar ajuda',
            '- Usar organizadores de medicamentos (porta-comprimidos)'
          ],
          citations: [{ refId: 'sbgg-polifarmacia-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Desprescricao - Medicamentos sem indicacao',
              medicamentos: ['Suspender medicamentos sem indicacao atual'],
              posologia: 'Suspender imediatamente se seguro',
              observacoes: 'Ex: IBP apos cicatrizacao de ulcera, bifosfonato >5 anos sem risco alto'
            },
            {
              classe: 'Desprescricao - MPIs de alto risco',
              medicamentos: ['Benzodiazepinicos', 'Anticolinergicos', 'AINEs cronicos'],
              posologia: 'Reduzir gradualmente (benzodiazepinicos: 10-25% a cada 2-4 semanas)',
              observacoes: 'Substituir por alternativas mais seguras quando possivel'
            }
          ],
          segundaLinha: [
            {
              classe: 'Ajuste de doses',
              medicamentos: ['Todos os medicamentos excretados por via renal'],
              posologia: 'Ajustar pela TFG estimada',
              observacoes: 'Ex: metformina, gabapentina, DOACs, aminoglicosideos'
            },
            {
              classe: 'Substituicao por alternativas mais seguras',
              medicamentos: ['Substituir MPI por alternativa'],
              posologia: 'Conforme alternativa escolhida',
              observacoes: 'Ex: trocar diclofenaco por paracetamol; trocar amitriptilina por nortriptilina'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Paciente com demencia avancada ou expectativa de vida limitada',
              conduta: 'Rever medicamentos preventivos (estatinas, bifosfonatos). Focar em conforto e qualidade de vida. Desprescrever medicamentos que nao trazem beneficio no horizonte de tempo do paciente.'
            },
            {
              situacao: 'Cascata de prescricao',
              conduta: 'Identificar medicamento causador do efeito adverso e desprescreve-lo, ao inves de adicionar outro medicamento.'
            },
            {
              situacao: 'Paciente em uso de multiplos prescritores',
              conduta: 'Definir medico de referencia para coordenar prescricoes. Reconciliacao apos cada consulta especializada ou alta hospitalar.'
            }
          ],
          citations: [{ refId: 'sbgg-polifarmacia-2023' }]
        },
        duracao: 'Revisao continua; reavaliar a cada consulta ou apos mudancas'
      },
      acompanhamento: {
        frequenciaConsultas: 'Revisao de medicamentos a cada 3-6 meses ou apos qualquer mudanca',
        examesControle: [
          'Lista atualizada de medicamentos a cada consulta',
          'Funcao renal periodica (ajuste de doses)',
          'Monitorar sintomas de RAMs',
          'Avaliar adesao'
        ],
        metasTerapeuticas: [
          'Menor numero possivel de medicamentos',
          'Ausencia de MPIs',
          'Ausencia de RAMs',
          'Boa adesao ao tratamento',
          'Regime posologico simplificado'
        ],
        criteriosEncaminhamento: [
          'Farmaceutico clinico: reconciliacao complexa, interacoes multiplas',
          'Geriatria: avaliacao global, desprescricao em frageis',
          'Especialista de referencia: ajuste de medicamentos especificos da area',
          'Cuidados paliativos: desprescricao em fim de vida'
        ],
        citations: [{ refId: 'sbgg-polifarmacia-2023' }]
      },
      prevencao: {
        primaria: [
          'Nao prescrever medicamento sem indicacao clara',
          'Questionar necessidade de cada novo medicamento',
          'Preferir alternativas nao farmacologicas quando possivel',
          'Iniciar com doses baixas e aumentar gradualmente',
          'Evitar cascatas de prescricao',
          'Considerar expectativa de vida e metas de cuidado'
        ],
        secundaria: [
          'Revisao regular de medicamentos',
          'Reconciliacao apos alta hospitalar',
          'Usar criterios de Beers e STOPP/START',
          'Comunicacao entre prescritores'
        ],
        citations: [{ refId: 'sbgg-polifarmacia-2023' }]
      },
      populacoesEspeciais: {
        idosos: 'Principal populacao afetada. Risco de RAMs aumenta exponencialmente com numero de medicamentos. Frageis e com demencia tem maior risco e necessitam revisao mais rigorosa.',
        gestantes: 'N/A para polifarmacia geriatrica',
        criancas: 'N/A para polifarmacia geriatrica'
      }
    },

    protocolos: ['polifarmacia-sbgg', 'beers-criteria', 'stopp-start'],
    medicamentos: [],
    calculadoras: ['tfg-ckd-epi', 'beers-screening', 'stopp-start-tool'],
    citations: [
      { refId: 'sbgg-polifarmacia-2023' },
      { refId: 'ags-beers-2023' }
    ],
    lastUpdate: '2024-01-01',
    tags: ['geriatria', 'aps', 'polifarmacia', 'desprescricao', 'medicamentos', 'seguranca']
  }
];

export default doencasGeriatriaAPS;
