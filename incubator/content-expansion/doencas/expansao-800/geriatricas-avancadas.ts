/**
 * DOENCAS GERIATRICAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * =======================================================
 * Sindromes geriatricas com fullContent completo
 */

import { Doenca } from '@/lib/types/doenca';

export const geriatricasAvancadas: Doenca[] = [
  // ============================================================================
  // SINDROME DA FRAGILIDADE
  // ============================================================================
  {
    id: 'sindrome-fragilidade-avancada',
    titulo: 'Sindrome da Fragilidade',
    sinonimos: ['Frailty Syndrome', 'Idoso fragil'],
    doid: 'DOID:0080429',
    snomedCT: '248279007',
    meshId: 'D000073496',
    ciap2: ['A04'],
    cid10: ['R54'],
    categoria: 'geriatrico',
    quickView: {
      definicao: 'Sindrome de vulnerabilidade a estressores por declinio de reservas fisiologicas. Prevalencia 10-15% em >65 anos.',
      criteriosDiagnosticos: [
        'Fenotipo de Fried: >=3 criterios = fragil',
        'Perda peso >4,5kg/ano',
        'Exaustao autorrelatada',
        'Baixa atividade fisica',
        'Lentidao de marcha',
        'Fraqueza (grip strength)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercicio multicomponente', 'Intervencao nutricional proteica'],
        farmacologico: ['Vitamina D se deficiencia', 'Desprescricao']
      },
      redFlags: ['Quedas recorrentes', 'Perda peso >10%', 'Hospitalizacoes frequentes']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-15% em >65 anos; 25-50% em >85 anos',
        fatoresRisco: ['Idade avancada', 'Comorbidades multiplas', 'Polifarmacia', 'Isolamento social'],
        citations: [{ refId: 'fried-fragilidade-2001' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fadiga', 'Perda peso', 'Fraqueza', 'Lentidao'],
        sinaisExameFisico: ['Grip strength reduzido', 'Velocidade marcha <0,8m/s'],
        citations: [{ refId: 'fragilidade-consenso-2022' }]
      },
      diagnostico: {
        criterios: [
          'Fried: >=3/5 = fragil, 1-2 = pre-fragil',
          'FRAIL scale alternativa',
          'Clinical Frailty Scale'
        ],
        diagnosticoDiferencial: ['Sarcopenia', 'Depressao', 'Hipotireoidismo', 'Neoplasia oculta'],
        citations: [{ refId: 'fried-fragilidade-2001' }]
      },
      tratamento: {
        objetivos: ['Reverter pre-fragilidade', 'Manter funcionalidade'],
        naoFarmacologico: {
          medidas: ['Exercicio resistido + aerobico', 'Proteina 1,2-1,5g/kg/dia', 'Suporte social'],
          citations: [{ refId: 'fragilidade-consenso-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Suplementacao', medicamentos: ['Vitamina D'], posologia: '800-2000UI/dia', observacoes: 'Se <30ng/mL' }
          ],
          citations: [{ refId: 'fragilidade-consenso-2022' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        metasTerapeuticas: ['Manter independencia AVDs', 'Prevenir hospitalizacoes'],
        criteriosEncaminhamento: ['Declinio funcional rapido', 'Quedas recorrentes'],
        citations: [{ refId: 'fried-fragilidade-2001' }]
      },
      prevencao: {
        primaria: ['Atividade fisica regular', 'Nutricao adequada'],
        secundaria: ['Rastreio anual >70 anos', 'Intervencao precoce em pre-frageis'],
        citations: [{ refId: 'fragilidade-consenso-2022' }]
      }
    },
    protocolos: ['fragilidade-manejo'],
    medicamentos: ['vitamina-d'],
    calculadoras: ['fried-frailty', 'clinical-frailty-scale'],
    citations: [{ refId: 'fried-fragilidade-2001' }, { refId: 'fragilidade-consenso-2022' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // SARCOPENIA
  // ============================================================================
  {
    id: 'sarcopenia-avancada',
    titulo: 'Sarcopenia',
    sinonimos: ['Perda muscular senil', 'Muscle wasting'],
    doid: 'DOID:0081310',
    snomedCT: '1172655006',
    meshId: 'D055948',
    ciap2: ['L29'],
    cid10: ['M62.84'],
    categoria: 'geriatrico',
    quickView: {
      definicao: 'Perda progressiva de massa e forca muscular com envelhecimento. Prevalencia 5-13% em 60-70 anos, ate 50% em >80 anos.',
      criteriosDiagnosticos: [
        'EWGSOP2: forca reduzida = provavel',
        'Dinamometria <27kg (H) ou <16kg (F)',
        'Confirmacao: massa muscular baixa (DXA/BIA)',
        'SPPB <8 = sarcopenia grave'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercicio resistido progressivo', 'Proteina 1,2g/kg/dia'],
        farmacologico: ['Vitamina D se deficiencia']
      },
      redFlags: ['Perda peso rapida', 'Quedas', 'Incapacidade levantar da cadeira']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '5-13% em 60-70 anos; ate 50% em >80 anos',
        fatoresRisco: ['Idade', 'Inatividade', 'Desnutricao', 'Doencas cronicas'],
        citations: [{ refId: 'ewgsop2-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fraqueza', 'Dificuldade levantar', 'Fadiga'],
        sinaisExameFisico: ['Reducao massa muscular', 'Grip strength baixo'],
        citations: [{ refId: 'ewgsop2-2019' }]
      },
      diagnostico: {
        criterios: [
          'Forca baixa: grip <27kg(H)/<16kg(F)',
          'Massa baixa: DXA ou BIA',
          'Desempenho baixo: SPPB <8, TUG >20s'
        ],
        diagnosticoDiferencial: ['Miopatia', 'Caquexia', 'Hipotireoidismo'],
        citations: [{ refId: 'ewgsop2-2019' }]
      },
      tratamento: {
        objetivos: ['Aumentar forca', 'Preservar massa muscular'],
        naoFarmacologico: {
          medidas: ['Treino resistido 2-3x/semana', 'Proteina 1,2-1,5g/kg/dia', 'Leucina/HMB'],
          citations: [{ refId: 'ewgsop2-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Vitamina', medicamentos: ['Vitamina D'], posologia: '800-2000UI/dia' }
          ],
          citations: [{ refId: 'sarcopenia-tratamento-2021' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6 meses',
        metasTerapeuticas: ['Melhorar grip strength', 'SPPB >=8'],
        criteriosEncaminhamento: ['Sarcopenia grave', 'Quedas recorrentes'],
        citations: [{ refId: 'ewgsop2-2019' }]
      },
      prevencao: {
        primaria: ['Exercicio ao longo da vida', 'Nutricao proteica adequada'],
        secundaria: ['Rastreio em >65 anos'],
        citations: [{ refId: 'sarcopenia-tratamento-2021' }]
      }
    },
    protocolos: ['sarcopenia-manejo'],
    medicamentos: ['vitamina-d'],
    calculadoras: ['sppb', 'sarc-f'],
    citations: [{ refId: 'ewgsop2-2019' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // DELIRIUM
  // ============================================================================
  {
    id: 'delirium-avancado',
    titulo: 'Delirium',
    sinonimos: ['Estado confusional agudo', 'Acute confusional state'],
    doid: 'DOID:0060164',
    snomedCT: '2776000',
    meshId: 'D003693',
    ciap2: ['P71'],
    cid10: ['F05'],
    categoria: 'geriatrico',
    quickView: {
      definicao: 'Sindrome neuropsiquiatrica aguda com alteracao de atencao e consciencia, curso flutuante. 10-30% dos idosos hospitalizados.',
      criteriosDiagnosticos: [
        'CAM: inicio agudo + curso flutuante',
        'Desatencao',
        'Pensamento desorganizado OU alteracao consciencia',
        'Flutuacao ao longo do dia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Tratar causa subjacente', 'Reorientacao', 'Presenca familiar'],
        farmacologico: ['Haloperidol 0,5-1mg se agitacao grave', 'Evitar benzodiazepinicos']
      },
      redFlags: ['Febre alta', 'Sinais focais', 'Hipoxia', 'Hipoglicemia']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-30% idosos hospitalizados; 50-80% em UTI',
        fatoresRisco: ['Demencia previa', 'Idade >70', 'Doenca grave', 'Polifarmacia'],
        citations: [{ refId: 'delirium-guidelines-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Confusao aguda', 'Desatencao', 'Flutuacao'],
        sinaisExameFisico: ['Alteracao nivel consciencia', 'Agitacao ou hipoatividade'],
        formasClinicas: ['Hiperativo', 'Hipoativo', 'Misto'],
        citations: [{ refId: 'delirium-guidelines-2023' }]
      },
      diagnostico: {
        criterios: [
          'CAM: 4 criterios',
          'Inicio agudo/flutuante + desatencao + (desorganizacao OU alteracao consciencia)'
        ],
        diagnosticoDiferencial: ['Demencia', 'Depressao', 'Psicose', 'AVC'],
        examesLaboratoriais: ['Hemograma', 'Eletrolitos', 'Glicemia', 'Funcao renal', 'EAS'],
        citations: [{ refId: 'delirium-guidelines-2023' }]
      },
      tratamento: {
        objetivos: ['Identificar e tratar causa', 'Manter seguranca'],
        naoFarmacologico: {
          medidas: ['Corrigir causas reversiveis', 'Ambiente calmo', 'Reorientacao', 'Mobilizacao precoce'],
          citations: [{ refId: 'delirium-guidelines-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antipsicotico', medicamentos: ['Haloperidol'], posologia: '0,5-1mg VO/IM', observacoes: 'Apenas se agitacao grave com risco' }
          ],
          situacoesEspeciais: [
            { situacao: 'Abstinencia alcoolica', conduta: 'Benzodiazepinicos' }
          ],
          citations: [{ refId: 'delirium-guidelines-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Diaria durante episodio; seguimento pos-alta',
        metasTerapeuticas: ['Resolucao do delirium', 'Recuperacao cognitiva'],
        criteriosEncaminhamento: ['Delirium persistente', 'Suspeita de demencia subjacente'],
        citations: [{ refId: 'delirium-guidelines-2023' }]
      },
      prevencao: {
        primaria: ['Protocolo HELP', 'Evitar medicamentos deliriogenicos'],
        secundaria: ['Identificacao precoce com CAM'],
        citations: [{ refId: 'delirium-guidelines-2023' }]
      }
    },
    protocolos: ['delirium-manejo'],
    medicamentos: ['haloperidol'],
    calculadoras: ['cam', '4at'],
    citations: [{ refId: 'delirium-guidelines-2023' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // DEMENCIA VASCULAR
  // ============================================================================
  {
    id: 'demencia-vascular',
    titulo: 'Demencia Vascular',
    sinonimos: ['Vascular dementia', 'Demencia multi-infarto'],
    doid: 'DOID:8725',
    snomedCT: '429998004',
    meshId: 'D015140',
    ciap2: ['P70'],
    cid10: ['F01'],
    categoria: 'geriatrico',
    quickView: {
      definicao: 'Declinio cognitivo causado por doenca cerebrovascular. Segunda causa mais comum de demencia. Inicio tipico apos AVC ou doenca de pequenos vasos.',
      criteriosDiagnosticos: [
        'Declinio cognitivo (funcoes executivas)',
        'Evidencia de doenca cerebrovascular',
        'Relacao temporal com AVC ou progressao escalonada',
        'Neuroimagem com lesoes vasculares'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Controle fatores de risco vascular', 'Reabilitacao cognitiva'],
        farmacologico: ['Antiagregante/anticoagulante conforme indicacao', 'Estatina']
      },
      redFlags: ['Declinio em escada', 'Sinais focais', 'AVC previo']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '15-20% das demencias',
        fatoresRisco: ['HAS', 'DM', 'Fibrilacao atrial', 'AVC previo', 'Tabagismo'],
        citations: [{ refId: 'demencia-vascular-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Disfuncao executiva', 'Lentificacao', 'Alteracao marcha'],
        sinaisExameFisico: ['Sinais focais', 'Parkinsonismo vascular', 'Incontinencia'],
        formasClinicas: ['Pos-AVC', 'Multiinfarto', 'Subcortical (Binswanger)'],
        citations: [{ refId: 'demencia-vascular-2022' }]
      },
      diagnostico: {
        criterios: [
          'NINDS-AIREN ou VASCOG',
          'Deficit cognitivo + evidencia vascular + relacao causal'
        ],
        diagnosticoDiferencial: ['Alzheimer', 'Demencia mista', 'Demencia corpos Lewy'],
        examesImagem: ['RM cranio (lesoes substancia branca, infartos)'],
        citations: [{ refId: 'demencia-vascular-2022' }]
      },
      tratamento: {
        objetivos: ['Prevenir progressao', 'Controlar fatores risco'],
        naoFarmacologico: {
          medidas: ['Controle rigoroso PA', 'Atividade fisica', 'Estimulacao cognitiva'],
          citations: [{ refId: 'demencia-vascular-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Prevencao secundaria', medicamentos: ['AAS', 'Estatina', 'Anti-hipertensivo'], observacoes: 'Conforme risco vascular' }
          ],
          segundaLinha: [
            { classe: 'Anticolinesterasico', medicamentos: ['Donepezila'], posologia: '5-10mg/dia', observacoes: 'Beneficio modesto' }
          ],
          citations: [{ refId: 'demencia-vascular-2022' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        metasTerapeuticas: ['PA <130/80', 'LDL <70', 'Estabilidade cognitiva'],
        criteriosEncaminhamento: ['Neurologista', 'Geriatra'],
        citations: [{ refId: 'demencia-vascular-2022' }]
      },
      prevencao: {
        primaria: ['Controle fatores risco cardiovascular'],
        secundaria: ['Prevencao AVC recorrente'],
        citations: [{ refId: 'demencia-vascular-2022' }]
      }
    },
    protocolos: ['demencia-vascular-manejo'],
    medicamentos: ['aas', 'estatina', 'donepezila'],
    calculadoras: ['meem', 'moca'],
    citations: [{ refId: 'demencia-vascular-2022' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // DEMENCIA POR CORPOS DE LEWY
  // ============================================================================
  {
    id: 'demencia-corpos-lewy',
    titulo: 'Demencia por Corpos de Lewy',
    sinonimos: ['Lewy body dementia', 'DLB'],
    doid: 'DOID:12217',
    snomedCT: '312991009',
    meshId: 'D020961',
    ciap2: ['P70'],
    cid10: ['G31.83'],
    categoria: 'geriatrico',
    quickView: {
      definicao: 'Demencia com alucinacoes visuais, parkinsonismo e flutuacao cognitiva. Terceira causa de demencia neurodegenerativa.',
      criteriosDiagnosticos: [
        'Demencia + 2 caracteristicas core = provavel',
        'Flutuacao cognitiva',
        'Alucinacoes visuais recorrentes',
        'Parkinsonismo espontaneo',
        'Disturbio comportamento sono REM'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Ambiente seguro', 'Orientacao a cuidadores'],
        farmacologico: ['Rivastigmina 3-12mg/dia', 'EVITAR ANTIPSICOTICOS TIPICOS']
      },
      redFlags: ['Sensibilidade a antipsicoticos', 'Quedas recorrentes', 'Sincope']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '5% das demencias em idosos',
        fatoresRisco: ['Idade >65', 'Sexo masculino', 'Historia familiar'],
        citations: [{ refId: 'dlb-consortium-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Demencia flutuante', 'Alucinacoes visuais', 'Parkinsonismo'],
        sinaisExameFisico: ['Rigidez', 'Bradicinesia', 'Tremor leve'],
        formasClinicas: ['DLB puro', 'Demencia da doenca de Parkinson'],
        citations: [{ refId: 'dlb-consortium-2023' }]
      },
      diagnostico: {
        criterios: [
          'McKeith 2017: demencia + >=2 caracteristicas core',
          'Biomarcadores suportivos: DaTscan, polissonografia'
        ],
        diagnosticoDiferencial: ['Alzheimer', 'Parkinson com demencia', 'Demencia vascular'],
        examesImagem: ['DaTscan (captacao reduzida)', 'RM (preservacao hipocampal relativa)'],
        citations: [{ refId: 'dlb-consortium-2023' }]
      },
      tratamento: {
        objetivos: ['Melhorar cognicao', 'Tratar sintomas motores'],
        naoFarmacologico: {
          medidas: ['Prevencao quedas', 'Ambiente iluminado', 'Rotina estruturada'],
          citations: [{ refId: 'dlb-consortium-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anticolinesterasico', medicamentos: ['Rivastigmina'], posologia: '3-12mg/dia', observacoes: 'Preferido na DCL' }
          ],
          situacoesEspeciais: [
            { situacao: 'Alucinacoes que requerem tratamento', conduta: 'Quetiapina 12,5-50mg ou Pimavanserina' },
            { situacao: 'Parkinsonismo', conduta: 'Levodopa em doses baixas' }
          ],
          citations: [{ refId: 'dlb-consortium-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3 meses',
        metasTerapeuticas: ['Estabilidade cognitiva', 'Controle alucinacoes'],
        criteriosEncaminhamento: ['Neurologista especializado', 'Psiquiatra geriatrico'],
        citations: [{ refId: 'dlb-consortium-2023' }]
      },
      prevencao: {
        primaria: ['Nao ha prevencao conhecida'],
        secundaria: ['Diagnostico precoce', 'Evitar antipsicoticos'],
        citations: [{ refId: 'dlb-consortium-2023' }]
      }
    },
    protocolos: ['demencia-lewy-manejo'],
    medicamentos: ['rivastigmina', 'quetiapina'],
    calculadoras: ['meem', 'moca'],
    citations: [{ refId: 'dlb-consortium-2023' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // INCONTINENCIA URINARIA
  // ============================================================================
  {
    id: 'incontinencia-urinaria-idoso-avancada',
    titulo: 'Incontinencia Urinaria no Idoso',
    sinonimos: ['Urinary incontinence', 'Perda urinaria'],
    doid: 'DOID:13580',
    snomedCT: '165232002',
    meshId: 'D014549',
    ciap2: ['U04'],
    cid10: ['N39.4'],
    categoria: 'geriatrico',
    quickView: {
      definicao: 'Perda involuntaria de urina com impacto social/higienico. 30-50% dos idosos na comunidade.',
      criteriosDiagnosticos: [
        'Tipo: urgencia, esforco, mista, funcional, overflow',
        'Diario miccional',
        'Teste esforco',
        'Residuo pos-miccional'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercicios Kegel', 'Treinamento vesical', 'Miccao programada'],
        farmacologico: ['Oxibutinina 2,5-5mg (urgencia)', 'Cuidado anticolinergicos']
      },
      redFlags: ['Hematuria', 'Dor pelvica', 'ITU recorrente', 'Retencao']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '30-50% idosos comunidade; 60-80% institucionalizados',
        fatoresRisco: ['Sexo feminino', 'Obesidade', 'Paridade', 'Prostatismo', 'Demencia'],
        citations: [{ refId: 'incontinencia-geriatrica-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Perda urinaria', 'Urgencia', 'Frequencia', 'Nocturia'],
        sinaisExameFisico: ['Exame pelvico', 'Toque retal', 'Teste esforco'],
        formasClinicas: ['Urgencia', 'Esforco', 'Mista', 'Funcional', 'Overflow'],
        citations: [{ refId: 'incontinencia-geriatrica-2022' }]
      },
      diagnostico: {
        criterios: [
          'Historia detalhada + diario miccional',
          'Exame fisico + residuo pos-miccional',
          'EAS + urocultura'
        ],
        diagnosticoDiferencial: ['ITU', 'Hiperplasia prostatica', 'Cistite intersticial'],
        citations: [{ refId: 'incontinencia-geriatrica-2022' }]
      },
      tratamento: {
        objetivos: ['Reduzir episodios', 'Melhorar qualidade de vida'],
        naoFarmacologico: {
          medidas: ['Kegel (8-12 contracoes 3x/dia)', 'Treinamento vesical', 'Perda peso'],
          citations: [{ refId: 'incontinencia-geriatrica-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antimuscarinicos', medicamentos: ['Oxibutinina', 'Tolterodina'], posologia: 'Oxibutinina 2,5-5mg 2-3x/dia', observacoes: 'Evitar em demencia' }
          ],
          segundaLinha: [
            { classe: 'Beta-3 agonista', medicamentos: ['Mirabegrona'], posologia: '25-50mg/dia', observacoes: 'Menos efeitos anticolinergicos' }
          ],
          citations: [{ refId: 'incontinencia-geriatrica-2022' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3 meses inicial, depois semestral',
        metasTerapeuticas: ['Reducao 50% episodios', 'Melhora QV'],
        criteriosEncaminhamento: ['Hematuria', 'Falha tratamento', 'Candidato cirurgia'],
        citations: [{ refId: 'incontinencia-geriatrica-2022' }]
      },
      prevencao: {
        primaria: ['Exercicios assoalho pelvico', 'Manter peso saudavel'],
        secundaria: ['Tratamento precoce'],
        citations: [{ refId: 'incontinencia-geriatrica-2022' }]
      }
    },
    protocolos: ['incontinencia-urinaria-manejo'],
    medicamentos: ['oxibutinina', 'tolterodina', 'mirabegrona'],
    calculadoras: ['iciq-sf'],
    citations: [{ refId: 'incontinencia-geriatrica-2022' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // SINDROME DE IMOBILIDADE
  // ============================================================================
  {
    id: 'sindrome-imobilidade',
    titulo: 'Sindrome de Imobilidade',
    sinonimos: ['Imobilismo', 'Immobility syndrome'],
    doid: 'DOID:0080744',
    snomedCT: '102893002',
    meshId: 'D055959',
    ciap2: ['L29'],
    cid10: ['M62.3'],
    categoria: 'geriatrico',
    quickView: {
      definicao: 'Restricao grave de mobilidade por causas multiplas, levando a complicacoes sistemicas. Comum em idosos acamados.',
      criteriosDiagnosticos: [
        'Incapacidade de sair do leito sem auxilio',
        'Dependencia completa para AVDs',
        'Presenca de complicacoes (UPP, contraturas)',
        'Duracao >15 dias'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Mobilizacao precoce', 'Mudanca decubito 2/2h', 'Fisioterapia'],
        farmacologico: ['Profilaxia TVP se indicado', 'Tratar causas reversiveis']
      },
      redFlags: ['UPP grau III/IV', 'TVP/TEP', 'Pneumonia aspirativa', 'Desnutricao grave']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '30-50% idosos institucionalizados',
        fatoresRisco: ['AVC', 'Fratura quadril', 'Demencia avancada', 'Doenca terminal'],
        citations: [{ refId: 'imobilidade-geriatrica-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Incapacidade deambular', 'Dependencia total', 'Complicacoes sistemicas'],
        sinaisExameFisico: ['Atrofia muscular', 'Contraturas', 'UPP', 'Edema'],
        citations: [{ refId: 'imobilidade-geriatrica-2021' }]
      },
      diagnostico: {
        criterios: [
          'Clinico: restricao ao leito/poltrona',
          'Duracao >15 dias',
          'Identificar causa base'
        ],
        diagnosticoDiferencial: ['Sarcopenia grave', 'Parkinsonismo avancado'],
        citations: [{ refId: 'imobilidade-geriatrica-2021' }]
      },
      tratamento: {
        objetivos: ['Prevenir complicacoes', 'Maximizar funcionalidade possivel'],
        naoFarmacologico: {
          medidas: ['Mudanca decubito 2/2h', 'Colchao pneumatico', 'Fisioterapia passiva/ativa', 'Nutricao adequada'],
          citations: [{ refId: 'imobilidade-geriatrica-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Profilaxia TVP', medicamentos: ['Enoxaparina', 'HNF'], posologia: 'Enoxaparina 40mg/dia SC', observacoes: 'Se alto risco TVP' }
          ],
          citations: [{ refId: 'imobilidade-geriatrica-2021' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal inicial, depois quinzenal',
        metasTerapeuticas: ['Ausencia de UPP', 'Ausencia de contraturas', 'Nutricao adequada'],
        criteriosEncaminhamento: ['UPP complexa', 'Necessidade reabilitacao intensiva'],
        citations: [{ refId: 'imobilidade-geriatrica-2021' }]
      },
      prevencao: {
        primaria: ['Mobilizacao precoce pos-eventos agudos'],
        secundaria: ['Reabilitacao intensiva'],
        citations: [{ refId: 'imobilidade-geriatrica-2021' }]
      }
    },
    protocolos: ['imobilidade-manejo'],
    medicamentos: ['enoxaparina'],
    calculadoras: ['braden-scale', 'padua-score'],
    citations: [{ refId: 'imobilidade-geriatrica-2021' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // QUEDAS RECORRENTES
  // ============================================================================
  {
    id: 'quedas-recorrentes',
    titulo: 'Quedas Recorrentes no Idoso',
    sinonimos: ['Falls in elderly', 'Sindrome de quedas'],
    doid: 'DOID:14002',
    snomedCT: '56307009',
    meshId: 'D000058',
    ciap2: ['A29'],
    cid10: ['W19'],
    categoria: 'geriatrico',
    quickView: {
      definicao: 'Duas ou mais quedas em 12 meses. 30% >65 anos caem/ano. Principal causa morte traumatica em idosos.',
      criteriosDiagnosticos: [
        '>=2 quedas em 12 meses',
        'Timed Up and Go >12s = alto risco',
        'Historia detalhada (circunstancias)',
        'Avaliacao marcha e equilibrio'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercicios equilibrio (Tai Chi)', 'Correcao visual', 'Adaptacao ambiental'],
        farmacologico: ['Vitamina D 800-1000UI/dia', 'Revisar sedativos']
      },
      redFlags: ['Queda com fratura', 'Lesao cabeça', 'Sincope associada']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '30% >65 anos caem/ano; 50% >80 anos',
        mortalidade: 'Principal causa morte traumatica em idosos',
        fatoresRisco: ['Queda previa', 'Deficit visual', 'Polifarmacia', 'Fraqueza muscular', 'Deficit equilibrio'],
        citations: [{ refId: 'quedas-guidelines-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Quedas repetidas', 'Medo de cair', 'Restricao mobilidade'],
        sinaisExameFisico: ['TUG >12s', 'Romberg positivo', 'Deficit visual', 'Hipotensao ortostatica'],
        citations: [{ refId: 'quedas-guidelines-2023' }]
      },
      diagnostico: {
        criterios: [
          '>=2 quedas/ano ou 1 queda com lesao',
          'Avaliacao multifatorial obrigatoria'
        ],
        diagnosticoDiferencial: ['Sincope', 'Epilepsia', 'Hipoglicemia', 'AIT'],
        examesLaboratoriais: ['Hemograma', 'Glicemia', 'Vitamina D', 'TSH'],
        citations: [{ refId: 'quedas-guidelines-2023' }]
      },
      tratamento: {
        objetivos: ['Reduzir quedas em 30-40%', 'Prevenir fraturas'],
        naoFarmacologico: {
          medidas: ['Exercicio multicomponente', 'Correcao visual', 'Calcados adequados', 'Remocao riscos ambientais'],
          citations: [{ refId: 'quedas-guidelines-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Suplementacao', medicamentos: ['Vitamina D'], posologia: '800-2000UI/dia' }
          ],
          situacoesEspeciais: [
            { situacao: 'Hipotensao ortostatica', conduta: 'Reduzir anti-hipertensivos, fludrocortisona' }
          ],
          citations: [{ refId: 'quedas-guidelines-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3 meses ate estabilizacao',
        metasTerapeuticas: ['Zero quedas com lesao', 'TUG <12s', 'Independencia mobilidade'],
        criteriosEncaminhamento: ['Queda com fratura', 'Sincope', 'Refratario a intervencoes'],
        citations: [{ refId: 'quedas-guidelines-2023' }]
      },
      prevencao: {
        primaria: ['Exercicio regular', 'Revisao medicamentos anual', 'Avaliacao visual'],
        secundaria: ['Intervencao multifatorial apos primeira queda'],
        citations: [{ refId: 'quedas-guidelines-2023' }]
      }
    },
    protocolos: ['quedas-manejo'],
    medicamentos: ['vitamina-d'],
    calculadoras: ['timed-up-go', 'morse-fall-scale'],
    citations: [{ refId: 'quedas-guidelines-2023' }],
    lastUpdate: '2026-01'
  }
];
