/**
 * DOENCAS NEUROLOGICAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * ========================================================
 * Doencas neurologicas degenerativas, desmielinizantes e do movimento
 */

import { Doenca } from '@/lib/types/doenca';

export const neurologicasAvancadas: Doenca[] = [
  // ============================================================================
  // DISTURBIOS DO MOVIMENTO
  // ============================================================================
  {
    id: 'doenca-huntington',
    titulo: 'Doenca de Huntington',
    sinonimos: ['Coreia de Huntington', 'HD', 'Huntington Disease'],
    doid: 'DOID:12858',
    snomedCT: '58756001',
    meshId: 'D006816',
    umlsCui: 'C0020179',
    ciap2: ['N87'],
    cid10: ['G10'],
    cid11: ['8A01.10'],
    categoria: 'neurologico',
    subcategoria: 'disturbios_movimento',
    quickView: {
      definicao: 'Doenca neurodegenerativa autossomica dominante causada por expansao de repeticoes CAG no gene HTT. Triade: coreia, demencia e alteracoes psiquiatricas. Inicio tipico 30-50 anos.',
      criteriosDiagnosticos: [
        'Historia familiar positiva (autossomica dominante)',
        'Movimentos coreicos involuntarios progressivos',
        'Declinio cognitivo progressivo',
        'Alteracoes psiquiatricas (depressao, irritabilidade)',
        'Teste genetico: >=40 repeticoes CAG no gene HTT (diagnostico definitivo)',
        'RM: atrofia do nucleo caudado (sinal do boxcar)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Aconselhamento genetico para familia',
          'Fisioterapia para mobilidade e prevencao de quedas',
          'Fonoaudiologia para disfagia e disartria',
          'Terapia ocupacional',
          'Suporte psicologico para paciente e familia'
        ],
        farmacologico: [
          'COREIA: Tetrabenazina 12,5-100mg/dia (primeira linha)',
          'Alternativa: Deutetrabenazina 6-48mg/dia',
          'DEPRESSAO: ISRS (Sertralina, Citalopram)',
          'PSICOSE: Antipsicóticos atípicos (Olanzapina, Quetiapina)',
          'IRRITABILIDADE: Valproato, Carbamazepina'
        ]
      },
      metasTerapeuticas: [
        'Controle dos movimentos involuntarios',
        'Manutencao da funcionalidade por mais tempo',
        'Tratamento de sintomas psiquiatricos',
        'Prevencao de complicacoes (quedas, aspiracao)'
      ],
      examesIniciais: [
        'Teste genetico para repeticoes CAG',
        'RM de crânio (atrofia caudado)',
        'Avaliacao neuropsicologica',
        'Avaliacao psiquiatrica'
      ],
      redFlags: [
        'Disfagia grave (risco de aspiracao)',
        'Quedas frequentes',
        'Ideacao suicida (alta prevalencia)',
        'Perda de peso significativa',
        'Forma juvenil (<20 anos) - progressao mais rapida'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '5-10/100.000 em populacoes caucasianas',
        incidencia: '0,38/100.000/ano',
        mortalidade: 'Sobrevida media 15-20 anos apos inicio dos sintomas',
        faixaEtaria: 'Inicio tipico 30-50 anos; forma juvenil <20 anos',
        fatoresRisco: [
          'Historia familiar (autossomica dominante, penetrancia completa se >=40 CAG)',
          'Numero de repeticoes CAG correlaciona com idade de inicio',
          'Instabilidade meiotica paterna (antecipacao)'
        ],
        citations: [{ refId: 'hdsa-guidelines-2022' }]
      },
      fisiopatologia: {
        texto: 'Expansao de repeticoes CAG (>=40) no gene HTT codifica huntingtina mutante com poliglutamina expandida. Agregacao proteica causa disfuncao neuronal e morte celular, especialmente em neuronios espinhosos medios do estriado (nucleo caudado e putamen).',
        citations: [{ refId: 'lancet-neurol-huntington-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Coreia (movimentos involuntarios, irregulares, fluidos)',
          'Declinio cognitivo progressivo (funcoes executivas)',
          'Alteracoes psiquiatricas (depressao, apatia, irritabilidade)',
          'Distonia e rigidez (fases avancadas)',
          'Disfagia e disartria'
        ],
        sinaisExameFisico: [
          'Movimentos coreicos (face, tronco, membros)',
          'Impersistencia motora (incapacidade de manter protrusao lingual)',
          'Sacadas oculares lentas',
          'Marcha instavel (danca)',
          'Reflexos normais ou aumentados'
        ],
        formasClinicas: [
          'Forma classica (adulto, 30-50 anos)',
          'Forma juvenil (Westphal) - rigidez, bradicinesia, epilepsia',
          'Forma tardia (>60 anos) - progressao mais lenta'
        ],
        citations: [{ refId: 'hdsa-guidelines-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clinica sugestiva + historia familiar',
          'Teste genetico: >=40 repeticoes CAG (diagnostico definitivo)',
          '36-39 repeticoes: penetrancia incompleta',
          '27-35 repeticoes: intermediario (risco para descendentes)'
        ],
        diagnosticoDiferencial: [
          'Coreia de Sydenham',
          'Neuroacantocitose',
          'Doenca de Wilson',
          'Atrofia dentatorubral-palidoluisiana',
          'Coreia hereditaria benigna'
        ],
        examesLaboratoriais: [
          'Teste genetico para HTT',
          'Hemograma, funcao hepatica',
          'Ceruloplasmina e cobre (excluir Wilson)'
        ],
        examesImagem: [
          'RM de cranio: atrofia do nucleo caudado',
          'Razao bicaudado aumentada'
        ],
        citations: [{ refId: 'lancet-neurol-huntington-2021' }]
      },
      tratamento: {
        objetivos: [
          'Controle sintomatico (nao ha tratamento modificador)',
          'Manter qualidade de vida',
          'Prevenir complicacoes'
        ],
        naoFarmacologico: {
          medidas: [
            'Fisioterapia regular',
            'Fonoaudiologia (disfagia, comunicacao)',
            'Nutricao (alto gasto calorico)',
            'Suporte psicossocial',
            'Cuidados paliativos em fases avancadas'
          ],
          citations: [{ refId: 'hdsa-guidelines-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Depletores de dopamina', medicamentos: ['Tetrabenazina', 'Deutetrabenazina'], posologia: 'Tetrabenazina 12,5-100mg/dia em doses divididas', observacoes: 'Monitorar depressao' }
          ],
          segundaLinha: [
            { classe: 'Antipsicoticos', medicamentos: ['Olanzapina', 'Risperidona'], posologia: 'Olanzapina 5-20mg/dia', observacoes: 'Para coreia refrataria ou psicose' }
          ],
          situacoesEspeciais: [
            { situacao: 'Forma juvenil', conduta: 'Anticonvulsivantes para epilepsia; rigidez responde mal a levodopa' },
            { situacao: 'Depressao/suicidio', conduta: 'ISRS + acompanhamento psiquiatrico intensivo' }
          ],
          citations: [{ refId: 'aan-huntington-2023' }]
        },
        duracao: 'Tratamento continuo, ajuste conforme progressao'
      },
      acompanhamento: {
        frequenciaConsultas: 'Neurologista a cada 3-6 meses; multidisciplinar',
        examesControle: [
          'Avaliacao funcional (TFC - Total Functional Capacity)',
          'Escala UHDRS',
          'Avaliacao cognitiva anual'
        ],
        metasTerapeuticas: [
          'Manter independencia funcional',
          'Controle de movimentos involuntarios',
          'Suporte nutricional adequado'
        ],
        criteriosEncaminhamento: [
          'Todos os casos: neurologista especializado',
          'Aconselhamento genetico para familiares em risco',
          'Psiquiatria se sintomas graves',
          'Cuidados paliativos em fase avancada'
        ],
        citations: [{ refId: 'hdsa-guidelines-2022' }]
      },
      prevencao: {
        primaria: [
          'Aconselhamento genetico pre-concepcional',
          'Diagnostico pre-implantacional disponivel'
        ],
        secundaria: [
          'Teste genetico preditivo para familiares em risco',
          'Acompanhamento de portadores assintomaticos'
        ],
        citations: [{ refId: 'lancet-neurol-huntington-2021' }]
      }
    },
    protocolos: ['huntington-manejo'],
    medicamentos: ['tetrabenazina', 'deutetrabenazina', 'olanzapina'],
    calculadoras: ['uhdrs', 'tfc-huntington'],
    rastreamentos: [],
    citations: [{ refId: 'hdsa-guidelines-2022' }, { refId: 'lancet-neurol-huntington-2021' }],
    lastUpdate: '2025-01',
    tags: ['huntington', 'coreia', 'neurodegenerativa', 'genetica', 'CAG']
  },

  {
    id: 'tremor-essencial',
    titulo: 'Tremor Essencial',
    sinonimos: ['ET', 'Tremor familiar', 'Tremor benigno'],
    doid: 'DOID:4990',
    snomedCT: '609558006',
    meshId: 'D020329',
    umlsCui: 'C0270736',
    ciap2: ['N87'],
    cid10: ['G25.0'],
    cid11: ['8A04.0'],
    categoria: 'neurologico',
    subcategoria: 'disturbios_movimento',
    quickView: {
      definicao: 'Disturbio do movimento mais comum, caracterizado por tremor de acao (postural e cinetico) bilateral, frequencia 4-12Hz, principalmente em maos, podendo afetar cabeca e voz. Curso lentamente progressivo.',
      criteriosDiagnosticos: [
        'Tremor de acao bilateral de maos e antebracos',
        'Frequencia 4-12Hz',
        'Ausencia de outras anormalidades neurologicas',
        'Duracao >3 anos',
        'Pode haver tremor de cabeca (sem distonia)',
        'Historia familiar positiva em 50-70%',
        'Melhora com alcool (caracteristico)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar cafeina e outros estimulantes',
          'Tecnicas de relaxamento',
          'Uso de utensilios adaptativos',
          'Fisioterapia para estrategias compensatorias'
        ],
        farmacologico: [
          'PROPRANOLOL 60-320mg/dia (primeira linha)',
          'PRIMIDONA 25-750mg/dia (primeira linha)',
          'Podem ser combinados se monoterapia insuficiente',
          'Alternativas: Gabapentina, Topiramato, Alprazolam'
        ]
      },
      metasTerapeuticas: [
        'Reducao da amplitude do tremor',
        'Melhora funcional nas AVDs',
        'Melhora da qualidade de vida'
      ],
      examesIniciais: [
        'Exame neurologico completo',
        'TSH (excluir hipertireoidismo)',
        'Funcao hepatica',
        'Nao ha exame diagnostico especifico'
      ],
      redFlags: [
        'Tremor de repouso (sugere Parkinson)',
        'Rigidez ou bradicinesia associadas',
        'Assimetria marcante',
        'Progressao rapida',
        'Sinais cerebelares'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,9-5% da populacao; ate 20% em >65 anos',
        incidencia: 'Aumenta com idade',
        faixaEtaria: 'Dois picos: 15-20 anos e >50 anos',
        fatoresRisco: [
          'Historia familiar (heranca autossomica dominante em muitos casos)',
          'Idade avancada',
          'Etnia caucasiana'
        ],
        citations: [{ refId: 'neurology-et-2019' }]
      },
      fisiopatologia: {
        texto: 'Disfuncao do circuito cerebelo-talamo-cortical. Oscilacoes anormais no nucleo olivar inferior e cerebelo geram o tremor. Componente genetico heterogeneo (LINGO1, ETM1, ETM2).',
        citations: [{ refId: 'mov-disord-et-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Tremor postural e cinetico de maos',
          'Bilateral (pode ser assimetrico)',
          'Piora com movimentos finos (escrita, beber)',
          'Melhora com repouso',
          'Pode afetar cabeca, voz, pernas'
        ],
        sinaisExameFisico: [
          'Tremor ao manter postura (bracos estendidos)',
          'Tremor ao movimento (dedo-nariz)',
          'Ausencia de tremor de repouso',
          'Exame neurologico normal (fora o tremor)'
        ],
        formasClinicas: [
          'ET classico',
          'ET plus (sinais neurologicos leves adicionais)',
          'ET com tremor de intencao'
        ],
        citations: [{ refId: 'mov-disord-et-2022' }]
      },
      diagnostico: {
        criterios: [
          'Criterios da MDS 2018',
          'Tremor de acao isolado de maos por >=3 anos',
          'Sem outras causas identificaveis'
        ],
        diagnosticoDiferencial: [
          'Doenca de Parkinson',
          'Tremor fisiologico exacerbado',
          'Tremor distônico',
          'Tremor induzido por drogas',
          'Hipertireoidismo',
          'Tremor cerebelar'
        ],
        examesLaboratoriais: [
          'TSH',
          'Funcao hepatica',
          'Glicemia'
        ],
        examesImagem: [
          'Geralmente desnecessarios',
          'DaTscan se duvida com Parkinson'
        ],
        citations: [{ refId: 'neurology-et-2019' }]
      },
      tratamento: {
        objetivos: [
          'Reducao do tremor',
          'Melhora funcional',
          'Minimizar efeitos adversos'
        ],
        naoFarmacologico: {
          medidas: [
            'Evitar cafeina',
            'Tecnicas de relaxamento',
            'Utensilios adaptativos (canetas grossas, copos com tampa)',
            'Pequenas doses de alcool podem ajudar (cuidado)'
          ],
          citations: [{ refId: 'aan-et-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Betabloqueador', medicamentos: ['Propranolol'], posologia: '60-320mg/dia em doses divididas', observacoes: 'Evitar em asma, bradicardia' },
            { classe: 'Anticonvulsivante', medicamentos: ['Primidona'], posologia: '25-750mg/dia, iniciar com 25mg a noite', observacoes: 'Iniciar dose baixa (sedacao)' }
          ],
          segundaLinha: [
            { classe: 'Alternativas', medicamentos: ['Gabapentina', 'Topiramato', 'Alprazolam'], posologia: 'Gabapentina 1200-3600mg/dia', observacoes: 'Menor nivel de evidencia' }
          ],
          situacoesEspeciais: [
            { situacao: 'Refratario a medicacoes', conduta: 'DBS do nucleo VIM do talamo ou talamotomia por ultrassom focalizado' }
          ],
          citations: [{ refId: 'aan-et-2019' }]
        },
        duracao: 'Continuo, ajuste conforme necessidade'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses se estavel',
        metasTerapeuticas: [
          'Controle funcional do tremor',
          'Ausencia de efeitos adversos significativos'
        ],
        criteriosEncaminhamento: [
          'Duvida diagnostica',
          'Refratario a tratamento',
          'Candidato a cirurgia'
        ],
        citations: [{ refId: 'aan-et-2019' }]
      }
    },
    protocolos: ['tremor-essencial-tratamento'],
    medicamentos: ['propranolol', 'primidona', 'gabapentina'],
    calculadoras: ['fahn-tolosa-marin'],
    rastreamentos: [],
    citations: [{ refId: 'aan-et-2019' }, { refId: 'mov-disord-et-2022' }],
    lastUpdate: '2025-01',
    tags: ['tremor', 'essencial', 'propranolol', 'primidona']
  },

  {
    id: 'distonia',
    titulo: 'Distonia',
    sinonimos: ['Distonia primaria', 'Sindrome distonica'],
    doid: 'DOID:543',
    snomedCT: '15802004',
    meshId: 'D004421',
    umlsCui: 'C0013421',
    ciap2: ['N87'],
    cid10: ['G24', 'G24.1', 'G24.2', 'G24.3'],
    cid11: ['8A02'],
    categoria: 'neurologico',
    subcategoria: 'disturbios_movimento',
    quickView: {
      definicao: 'Disturbio do movimento caracterizado por contracoes musculares sustentadas ou intermitentes causando movimentos e/ou posturas anormais, repetitivos. Pode ser focal, segmentar ou generalizada.',
      criteriosDiagnosticos: [
        'Contracoes musculares involuntarias',
        'Movimentos/posturas anormais, repetitivos, padronizados',
        'Pode haver tremor distonico',
        'Gesto antagonista (truque sensorial) caracteristico',
        'Classificar: focal, segmentar, multifocal, hemidistonia, generalizada',
        'Identificar etiologia: isolada, combinada, adquirida'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fisioterapia',
          'Terapia ocupacional',
          'Identificar e evitar fatores desencadeantes'
        ],
        farmacologico: [
          'FOCAL/SEGMENTAR: Toxina botulinica tipo A (primeira linha)',
          'Doses variam por musculo afetado',
          'GENERALIZADA: Trihexifenidil (anticolinergico) 6-30mg/dia',
          'Baclofeno 30-120mg/dia',
          'Clonazepam 1-6mg/dia'
        ]
      },
      metasTerapeuticas: [
        'Reducao da postura/movimento anormal',
        'Alivio da dor associada',
        'Melhora funcional'
      ],
      examesIniciais: [
        'Exame neurologico completo',
        'RM de cranio',
        'Ceruloplasmina e cobre (excluir Wilson em <50 anos)',
        'Teste genetico se inicio precoce'
      ],
      redFlags: [
        'Inicio abrupto',
        'Hemidistonia (sugere lesao estrutural)',
        'Distonia fixa desde o inicio',
        'Outros sinais neurologicos',
        'Inicio <30 anos (investigar causas geneticas)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '16-30/100.000 para distonia focal primaria',
        faixaEtaria: 'Focal: adultos (blefaroespasmo, torcicolo). Generalizada: infancia',
        fatoresRisco: [
          'Historia familiar (DYT1, DYT6)',
          'Lesoes cerebrais (distonia secundaria)',
          'Uso de antipsicoticos (distonia aguda)'
        ],
        citations: [{ refId: 'dystonia-foundation-2022' }]
      },
      fisiopatologia: {
        texto: 'Disfuncao dos ganglios da base, cerebelo e suas conexoes. Perda de inibicao no circuito motor leva a co-contracao de agonistas e antagonistas. Mutacoes em genes como TOR1A (DYT1) causam formas geneticas.',
        citations: [{ refId: 'lancet-neurol-dystonia-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Contracoes musculares involuntarias',
          'Posturas anormais',
          'Movimentos repetitivos',
          'Tremor distonico',
          'Dor associada (frequente)'
        ],
        sinaisExameFisico: [
          'Postura anormal do segmento afetado',
          'Overflow (ativacao de musculos nao envolvidos)',
          'Gesto antagonista (truque sensorial)',
          'Piora com acao voluntaria'
        ],
        formasClinicas: [
          'FOCAL: Blefaroespasmo, torcicolo espasmódico, distonia laríngea, câimbra do escrivão',
          'SEGMENTAR: duas regiões contíguas',
          'GENERALIZADA: tronco + >=2 regiões'
        ],
        citations: [{ refId: 'mov-disord-dystonia-2022' }]
      },
      diagnostico: {
        criterios: [
          'Fenomenologia clínica característica',
          'Classificar eixo I (clínico) e eixo II (etiológico)',
          'RM para excluir lesões estruturais'
        ],
        diagnosticoDiferencial: [
          'Torcicolo muscular',
          'Espasticidade',
          'Tremor essencial',
          'Tiques',
          'Reações distônicas agudas por medicamentos'
        ],
        examesLaboratoriais: [
          'Ceruloplasmina e cobre sérico/urinário',
          'Teste genético (DYT1, DYT6)',
          'Lactato se suspeita mitocondrial'
        ],
        examesImagem: [
          'RM de crânio',
          'DaTscan se parkinsonismo associado'
        ],
        citations: [{ refId: 'dystonia-foundation-2022' }]
      },
      tratamento: {
        objetivos: [
          'Reduzir postura/movimento anormal',
          'Aliviar dor',
          'Melhorar função'
        ],
        naoFarmacologico: {
          medidas: [
            'Fisioterapia',
            'Terapia ocupacional',
            'Órteses quando indicadas'
          ],
          citations: [{ refId: 'aan-dystonia-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Toxina botulínica', medicamentos: ['OnabotulinumtoxinA', 'AbobotulinumtoxinA'], posologia: 'Doses por músculo; repetir a cada 3-4 meses', observacoes: 'Primeira linha para distonia focal' }
          ],
          segundaLinha: [
            { classe: 'Anticolinérgico', medicamentos: ['Trihexifenidil', 'Biperideno'], posologia: 'Trihexifenidil 6-30mg/dia', observacoes: 'Melhor tolerado em jovens' },
            { classe: 'Relaxante muscular', medicamentos: ['Baclofeno', 'Clonazepam'], posologia: 'Baclofeno 30-120mg/dia', observacoes: 'Adjuvante' }
          ],
          situacoesEspeciais: [
            { situacao: 'Distonia generalizada refratária', conduta: 'DBS do globo pálido interno' },
            { situacao: 'Distonia dopa-responsiva', conduta: 'Levodopa em doses baixas (resposta dramática)' }
          ],
          citations: [{ refId: 'aan-dystonia-2021' }]
        },
        duracao: 'Contínuo; toxina botulínica a cada 3-4 meses'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-4 meses para toxina; mais espaçado se oral',
        metasTerapeuticas: [
          'Melhora da postura/função',
          'Ausência de efeitos adversos significativos'
        ],
        criteriosEncaminhamento: [
          'Todos: neurologista/movimento',
          'Refratário: centro de DBS'
        ],
        citations: [{ refId: 'dystonia-foundation-2022' }]
      }
    },
    protocolos: ['distonia-toxina-botulinica'],
    medicamentos: ['toxina-botulinica', 'trihexifenidil', 'baclofeno'],
    calculadoras: ['burke-fahn-marsden'],
    rastreamentos: [],
    citations: [{ refId: 'aan-dystonia-2021' }, { refId: 'dystonia-foundation-2022' }],
    lastUpdate: '2025-01',
    tags: ['distonia', 'toxina-botulinica', 'blefaroespasmo', 'torcicolo']
  },

  {
    id: 'paralisia-supranuclear-progressiva',
    titulo: 'Paralisia Supranuclear Progressiva',
    sinonimos: ['PSP', 'Síndrome de Steele-Richardson-Olszewski'],
    doid: 'DOID:678',
    snomedCT: '192813003',
    meshId: 'D013494',
    umlsCui: 'C0038868',
    ciap2: ['N87'],
    cid10: ['G23.1'],
    cid11: ['8A00.1'],
    categoria: 'neurologico',
    subcategoria: 'disturbios_movimento',
    quickView: {
      definicao: 'Tauopatia neurodegenerativa caracterizada por paralisia supranuclear do olhar vertical (especialmente para baixo), parkinsonismo axial, quedas precoces para trás e demência subcortical.',
      criteriosDiagnosticos: [
        'CRITÉRIOS MDS-PSP 2017:',
        'Início >40 anos, progressão gradual',
        'Paralisia supranuclear do olhar vertical (principalmente para baixo)',
        'Lentificação das sacadas verticais',
        'Instabilidade postural com quedas no primeiro ano',
        'Parkinsonismo axial, rigidez',
        'Resposta pobre a levodopa'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fisioterapia para equilíbrio e prevenção de quedas',
          'Fonoaudiologia para disfagia',
          'Terapia ocupacional',
          'Adaptações ambientais (segurança)'
        ],
        farmacologico: [
          'Levodopa: tentativa até 1000mg/dia (resposta limitada em 30%)',
          'Amitriptilina: para sintomas depressivos',
          'Toxina botulínica: para blefaroespasmo se presente',
          'Não há tratamento modificador da doença'
        ]
      },
      metasTerapeuticas: [
        'Manutenção da mobilidade e prevenção de quedas',
        'Manejo da disfagia',
        'Qualidade de vida'
      ],
      examesIniciais: [
        'RM de crânio (atrofia mesencefálica - sinal do beija-flor)',
        'Avaliação neuropsicológica',
        'Avaliação oftalmológica'
      ],
      redFlags: [
        'Quedas frequentes desde o início',
        'Disfagia precoce (risco de aspiração)',
        'Paralisia do olhar para baixo (dificuldade descer escadas, ler)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '3-7/100.000',
        incidencia: '1-2/100.000/ano',
        mortalidade: 'Sobrevida média 6-9 anos após início',
        faixaEtaria: 'Início típico 60-70 anos',
        fatoresRisco: [
          'Idade avançada',
          'Polimorfismos no gene MAPT (tau)'
        ],
        citations: [{ refId: 'mov-disord-psp-2022' }]
      },
      fisiopatologia: {
        texto: 'Acúmulo de proteína tau hiperfosforilada em neurônios e glia. Degeneração do mesencéfalo, núcleos da base, córtex frontal. Classificação atual reconhece vários fenótipos (PSP-RS, PSP-P, PSP-F, etc.).',
        citations: [{ refId: 'lancet-neurol-psp-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Quedas precoces (tipicamente para trás)',
          'Paralisia do olhar vertical para baixo',
          'Rigidez axial > apendicular',
          'Bradicinesia',
          'Disartria e disfagia precoces',
          'Alteração cognitiva frontal'
        ],
        sinaisExameFisico: [
          'Paralisia supranuclear do olhar (vertical > horizontal)',
          'Lentificação das sacadas',
          'Rigidez axial proeminente',
          'Extensão do pescoço (retrocollis)',
          'Fácies de espanto (olhos bem abertos)',
          'Reflexo de preensão, aplausos'
        ],
        formasClinicas: [
          'PSP-RS (Richardson syndrome) - clássico',
          'PSP-P (parkinsonismo predominante)',
          'PSP-F (frontal/comportamental)',
          'PSP-CBS (síndrome corticobasal)'
        ],
        citations: [{ refId: 'mov-disord-psp-2022' }]
      },
      diagnostico: {
        criterios: [
          'Critérios MDS-PSP 2017',
          'Níveis de certeza: possível, provável, definitivo (autópsia)'
        ],
        diagnosticoDiferencial: [
          'Doença de Parkinson',
          'Atrofia de múltiplos sistemas',
          'Degeneração corticobasal',
          'Demência frontotemporal'
        ],
        examesImagem: [
          'RM: atrofia mesencefálica (sinal do beija-flor/hummingbird)',
          'Sinal do Mickey Mouse (corte axial)',
          'Atrofia do pedúnculo cerebelar superior'
        ],
        citations: [{ refId: 'lancet-neurol-psp-2021' }]
      },
      tratamento: {
        objetivos: [
          'Tratamento sintomático (não há modificador)',
          'Prevenção de quedas',
          'Manejo de disfagia'
        ],
        naoFarmacologico: {
          medidas: [
            'Fisioterapia intensiva (equilíbrio)',
            'Fonoaudiologia (disfagia, disartria)',
            'Adaptações ambientais',
            'Prismas para dificuldade do olhar para baixo'
          ],
          citations: [{ refId: 'aan-psp-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Dopaminérgico', medicamentos: ['Levodopa'], posologia: 'Até 1000mg/dia', observacoes: 'Resposta modesta em 30%; tentativa obrigatória' }
          ],
          segundaLinha: [
            { classe: 'Antidepressivo', medicamentos: ['Amitriptilina'], posologia: '25-75mg/dia', observacoes: 'Para depressão e sialorreia' }
          ],
          citations: [{ refId: 'aan-psp-2020' }]
        },
        duracao: 'Contínuo até fase final'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; multidisciplinar',
        examesControle: [
          'Escala PSP-RS',
          'Avaliação de disfagia',
          'Monitoramento nutricional'
        ],
        metasTerapeuticas: [
          'Minimizar quedas',
          'Manter nutrição adequada'
        ],
        criteriosEncaminhamento: [
          'Neurologista especializado em movimento',
          'Gastroenterologia para gastrostomia se disfagia grave',
          'Cuidados paliativos'
        ],
        citations: [{ refId: 'mov-disord-psp-2022' }]
      }
    },
    protocolos: ['psp-manejo-multidisciplinar'],
    medicamentos: ['levodopa', 'amitriptilina'],
    calculadoras: ['psp-rating-scale'],
    rastreamentos: [],
    citations: [{ refId: 'mov-disord-psp-2022' }, { refId: 'lancet-neurol-psp-2021' }],
    lastUpdate: '2025-01',
    tags: ['PSP', 'parkinsonismo-atipico', 'tauopatia', 'quedas']
  },

  // ============================================================================
  // DOENÇAS DESMIELINIZANTES
  // ============================================================================
  {
    id: 'neuromielite-optica',
    titulo: 'Neuromielite Optica (NMOSD)',
    sinonimos: ['Doença de Devic', 'NMOSD', 'NMO'],
    doid: 'DOID:8869',
    snomedCT: '63461003',
    meshId: 'D009471',
    umlsCui: 'C0027873',
    ciap2: ['N86'],
    cid10: ['G36.0'],
    cid11: ['8A41'],
    categoria: 'neurologico',
    subcategoria: 'desmielinizante',
    quickView: {
      definicao: 'Doença desmielinizante inflamatória do SNC mediada por anticorpos anti-aquaporina-4 (AQP4), caracterizada por ataques severos de neurite óptica e mielite transversa longitudinalmente extensa.',
      criteriosDiagnosticos: [
        'CRITÉRIOS IPND 2015:',
        'COM anti-AQP4: >=1 característica clínica central + AQP4-IgG positivo',
        'SEM anti-AQP4: >=2 características + disseminação no espaço + AQP4 negativo',
        'Características centrais: neurite óptica, mielite, síndrome de área postrema, tronco, diencéfalo, cerebral',
        'RM medula: lesão >=3 segmentos vertebrais (LETM)',
        'Ataques tipicamente severos e com recuperação incompleta'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Reabilitação intensiva',
          'Fisioterapia',
          'Suporte visual (baixa visão)'
        ],
        farmacologico: [
          'ATAQUE AGUDO: Metilprednisolona 1g/dia IV 5 dias',
          'Se refratário: Plasmaférese (5-7 sessões)',
          'PREVENÇÃO: Rituximabe 1g a cada 6 meses (primeira linha)',
          'Alternativas: Azatioprina, Micofenolato',
          'NOVOS: Eculizumabe, Satralizumabe, Inebilizumabe'
        ]
      },
      metasTerapeuticas: [
        'Prevenir novos ataques (cada ataque causa dano cumulativo)',
        'Recuperação máxima de ataques',
        'Manter função visual e motora'
      ],
      examesIniciais: [
        'Anti-AQP4 (aquaporina-4) - específico',
        'Anti-MOG (se AQP4 negativo)',
        'RM de crânio e medula completa com contraste',
        'LCR (pleocitose, pode ter bandas oligoclonais negativas)',
        'OCT (tomografia de coerência óptica)'
      ],
      redFlags: [
        'Ataque de neurite óptica bilateral ou severa',
        'Mielite transversa completa',
        'Síndrome de área postrema (vômitos intratáveis, soluços)',
        'Recaídas frequentes'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,5-10/100.000 (varia por região)',
        incidencia: '0,05-0,4/100.000/ano',
        faixaEtaria: 'Média 40 anos; mais comum em mulheres (9:1)',
        fatoresRisco: [
          'Sexo feminino',
          'Afrodescendentes e asiáticos (maior prevalência)',
          'Outras doenças autoimunes'
        ],
        citations: [{ refId: 'neurology-nmosd-2022' }]
      },
      fisiopatologia: {
        texto: 'Anticorpos anti-AQP4 (aquaporina-4) atacam astrócitos, principalmente na medula espinhal, nervos ópticos e área postrema. Ativação de complemento causa desmielinização secundária. Anti-MOG representa entidade distinta.',
        citations: [{ refId: 'lancet-neurol-nmosd-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Neurite óptica (frequentemente bilateral ou severa)',
          'Mielite transversa (paraplegia, nível sensitivo)',
          'Síndrome de área postrema (soluços, náuseas, vômitos)',
          'Síndrome de tronco encefálico',
          'Sintomas diencefálicos (narcolepsia sintomática)'
        ],
        sinaisExameFisico: [
          'Perda visual severa (pode ser bilateral)',
          'Paraparesia ou tetraparesia',
          'Nível sensitivo',
          'Disfunção vesical'
        ],
        formasClinicas: [
          'NMOSD AQP4-positivo',
          'NMOSD AQP4-negativo',
          'MOGAD (doença associada a anti-MOG)'
        ],
        citations: [{ refId: 'neurology-nmosd-2022' }]
      },
      diagnostico: {
        criterios: [
          'Critérios IPND 2015',
          'Anti-AQP4 positivo + >=1 característica central',
          'RM medula: LETM (>=3 segmentos)'
        ],
        diagnosticoDiferencial: [
          'Esclerose múltipla',
          'MOGAD',
          'Mielite infecciosa',
          'Neurossarcoidose'
        ],
        examesLaboratoriais: [
          'Anti-AQP4 (cell-based assay)',
          'Anti-MOG',
          'LCR'
        ],
        examesImagem: [
          'RM medula: lesão longitudinalmente extensa (>=3 segmentos)',
          'RM crânio: pode ser normal ou lesões atípicas para EM'
        ],
        citations: [{ refId: 'lancet-neurol-nmosd-2021' }]
      },
      tratamento: {
        objetivos: [
          'Tratamento agressivo do ataque agudo',
          'Prevenção de recaídas (fundamental)',
          'Reabilitação'
        ],
        naoFarmacologico: {
          medidas: [
            'Reabilitação intensiva',
            'Suporte para baixa visão',
            'Cateterismo intermitente se disfunção vesical'
          ],
          citations: [{ refId: 'aan-nmosd-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Ataque agudo', medicamentos: ['Metilprednisolona'], posologia: '1g/dia IV por 5 dias', observacoes: 'Iniciar precocemente' },
            { classe: 'Plasmaférese', medicamentos: ['Plasmaférese'], posologia: '5-7 sessões', observacoes: 'Se refratário a corticóide' },
            { classe: 'Prevenção', medicamentos: ['Rituximabe'], posologia: '1g IV, repetir em 2 semanas, depois 6/6 meses', observacoes: 'Primeira linha para prevenção' }
          ],
          segundaLinha: [
            { classe: 'Imunossupressor', medicamentos: ['Azatioprina', 'Micofenolato'], posologia: 'Azatioprina 2-3mg/kg/dia', observacoes: 'Alternativa ao rituximabe' }
          ],
          situacoesEspeciais: [
            { situacao: 'Anti-MOG positivo', conduta: 'Pode ter melhor prognóstico; imunoterapia similar' },
            { situacao: 'Gestação', conduta: 'Planejar; rituximabe evitar; azatioprina pode ser mantida' }
          ],
          citations: [{ refId: 'aan-nmosd-2021' }]
        },
        duracao: 'Imunoterapia preventiva contínua (doença recidivante)'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; mais frequente se instável',
        examesControle: [
          'EDSS (Expanded Disability Status Scale)',
          'OCT periódico',
          'RM de controle'
        ],
        metasTerapeuticas: [
          'Zero recaídas (cada ataque causa dano)',
          'Estabilidade no EDSS'
        ],
        criteriosEncaminhamento: [
          'Todos: neurologista especializado em desmielinizantes',
          'Oftalmologista (baixa visão)',
          'Urologia se disfunção vesical'
        ],
        citations: [{ refId: 'neurology-nmosd-2022' }]
      }
    },
    protocolos: ['nmosd-tratamento-ataque', 'nmosd-prevencao'],
    medicamentos: ['metilprednisolona', 'rituximabe', 'azatioprina', 'eculizumabe'],
    calculadoras: ['edss'],
    rastreamentos: [],
    citations: [{ refId: 'aan-nmosd-2021' }, { refId: 'lancet-neurol-nmosd-2021' }],
    lastUpdate: '2025-01',
    tags: ['NMOSD', 'neuromielite', 'anti-AQP4', 'mielite', 'neurite-optica']
  },

  {
    id: 'adem',
    titulo: 'Encefalomielite Disseminada Aguda (ADEM)',
    sinonimos: ['ADEM', 'Encefalomielite pós-infecciosa'],
    doid: 'DOID:639',
    snomedCT: '83942000',
    meshId: 'D004673',
    umlsCui: 'C0014059',
    ciap2: ['N86'],
    cid10: ['G04.0'],
    cid11: ['8A45'],
    categoria: 'neurologico',
    subcategoria: 'desmielinizante',
    quickView: {
      definicao: 'Doença desmielinizante inflamatória aguda do SNC, tipicamente monofásica, ocorrendo frequentemente após infecção viral ou vacinação. Mais comum em crianças. Caracterizada por encefalopatia + déficits neurológicos multifocais.',
      criteriosDiagnosticos: [
        'CRITÉRIOS IPMSSG 2013:',
        'Primeiro evento desmielinizante multifocal do SNC',
        'Encefalopatia (alteração comportamental/consciência) obrigatória',
        'Déficits neurológicos multifocais',
        'RM: lesões grandes, mal-definidas, na substância branca',
        'Precedido por infecção/vacinação (60-70%)',
        'Não atribuível a outras causas'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suporte em UTI se grave',
          'Reabilitação precoce',
          'Monitoramento neurológico'
        ],
        farmacologico: [
          'Metilprednisolona 20-30mg/kg/dia IV (máx 1g) por 3-5 dias',
          'Seguido de prednisona oral desmame por 4-6 semanas',
          'Se refratário: IVIG 2g/kg em 2-5 dias',
          'Plasmaférese se IVIG falhar'
        ]
      },
      metasTerapeuticas: [
        'Recuperação neurológica completa (maioria)',
        'Prevenção de sequelas',
        'Diferenciar de primeiro surto de EM'
      ],
      examesIniciais: [
        'RM de crânio e medula com contraste',
        'LCR (pleocitose, proteína elevada, bandas oligoclonais geralmente negativas)',
        'Anti-MOG (positivo em muitos casos pediátricos)',
        'Anti-AQP4 (excluir NMOSD)',
        'Sorologias virais'
      ],
      redFlags: [
        'Ausência de encefalopatia (questionar diagnóstico)',
        'Recorrência (considerar MOGAD ou EM)',
        'Lesões que não melhoram com corticóide'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Rara; 0,2-0,8/100.000/ano em crianças',
        faixaEtaria: 'Principalmente crianças (5-8 anos); raro em adultos',
        fatoresRisco: [
          'Infecção viral recente (sarampo, varicela, EBV, influenza)',
          'Vacinação (raro, mas descrito)',
          'Idade pediátrica'
        ],
        citations: [{ refId: 'neurology-adem-2019' }]
      },
      fisiopatologia: {
        texto: 'Resposta autoimune pós-infecciosa com mimetismo molecular. Ativação de células T e produção de anticorpos contra mielina. Anti-MOG frequentemente positivo em crianças. Diferente de EM (monofásico, encefalopatia presente).',
        citations: [{ refId: 'lancet-neurol-adem-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Encefalopatia (confusão, letargia, irritabilidade)',
          'Déficits motores (hemiparesia, paraparesia)',
          'Ataxia cerebelar',
          'Neurite óptica (pode ser bilateral)',
          'Mielite',
          'Convulsões (10-35%)'
        ],
        sinaisExameFisico: [
          'Alteração do nível de consciência',
          'Sinais piramidais',
          'Ataxia',
          'Nervos cranianos',
          'Meningismo (pode estar presente)'
        ],
        formasClinicas: [
          'ADEM típico',
          'ADEM com neurite óptica',
          'AHLE (Hurst) - forma hemorrágica fulminante'
        ],
        citations: [{ refId: 'neurology-adem-2019' }]
      },
      diagnostico: {
        criterios: [
          'Encefalopatia obrigatória',
          'Déficits multifocais',
          'RM com lesões compatíveis',
          'Monofásico'
        ],
        diagnosticoDiferencial: [
          'Primeiro surto de esclerose múltipla',
          'Encefalite viral',
          'NMOSD',
          'Vasculite do SNC',
          'Leucoencefalopatia tóxica'
        ],
        examesLaboratoriais: [
          'LCR: pleocitose linfomononuclear, proteína elevada',
          'Anti-MOG',
          'Sorologias virais'
        ],
        examesImagem: [
          'RM: lesões grandes (>1-2cm), bilaterais, mal-definidas',
          'Substância branca subcortical e profunda',
          'Podem envolver tálamo, gânglios da base'
        ],
        citations: [{ refId: 'lancet-neurol-adem-2020' }]
      },
      tratamento: {
        objetivos: [
          'Suprimir inflamação aguda',
          'Maximizar recuperação',
          'Monitorar para recorrência'
        ],
        naoFarmacologico: {
          medidas: [
            'Suporte intensivo se grave',
            'Reabilitação multidisciplinar',
            'Acompanhamento neuropsicológico'
          ],
          citations: [{ refId: 'ann-neurol-adem-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticosteróide', medicamentos: ['Metilprednisolona'], posologia: '20-30mg/kg/dia IV por 3-5 dias (máx 1g)', observacoes: 'Desmame oral por 4-6 semanas' }
          ],
          segundaLinha: [
            { classe: 'Imunoglobulina', medicamentos: ['IVIG'], posologia: '2g/kg dividido em 2-5 dias', observacoes: 'Se refratário a corticóide' },
            { classe: 'Plasmaférese', medicamentos: ['Plasmaférese'], posologia: '5-7 sessões', observacoes: 'Terceira linha' }
          ],
          citations: [{ refId: 'ann-neurol-adem-2021' }]
        },
        duracao: 'Agudo; desmame de corticóide por 4-6 semanas'
      },
      acompanhamento: {
        frequenciaConsultas: 'Intensivo no primeiro ano; depois anual',
        examesControle: [
          'RM de controle em 3-6 meses',
          'Anti-MOG seriado (se positivo)',
          'Avaliação neuropsicológica'
        ],
        metasTerapeuticas: [
          'Recuperação completa (70-90%)',
          'Identificar recorrência (se recorrer: MOGAD ou EM)'
        ],
        criteriosEncaminhamento: [
          'Neurologista pediátrico',
          'Reabilitação',
          'Psicologia para sequelas cognitivas'
        ],
        citations: [{ refId: 'neurology-adem-2019' }]
      }
    },
    protocolos: ['adem-tratamento-agudo'],
    medicamentos: ['metilprednisolona', 'ivig'],
    calculadoras: ['edss'],
    rastreamentos: [],
    citations: [{ refId: 'neurology-adem-2019' }, { refId: 'lancet-neurol-adem-2020' }],
    lastUpdate: '2025-01',
    tags: ['ADEM', 'desmielinizante', 'pos-infecciosa', 'pediatrico', 'anti-MOG']
  },

  // ============================================================================
  // DEMÊNCIAS E NEURODEGENERATIVAS
  // ============================================================================
  {
    id: 'demencia-corpos-lewy',
    titulo: 'Demência por Corpos de Lewy',
    sinonimos: ['DCL', 'DLB', 'Lewy Body Dementia'],
    doid: 'DOID:12217',
    snomedCT: '312991009',
    meshId: 'D020961',
    umlsCui: 'C0752347',
    ciap2: ['P70'],
    cid10: ['G31.83', 'F02.8'],
    cid11: ['6D82'],
    categoria: 'neurologico',
    subcategoria: 'demencia',
    quickView: {
      definicao: 'Segunda causa mais comum de demência neurodegenerativa. Caracterizada por flutuações cognitivas, alucinações visuais recorrentes, parkinsonismo e distúrbio comportamental do sono REM.',
      criteriosDiagnosticos: [
        'CRITÉRIOS DO QUARTO CONSÓRCIO (2017):',
        'Demência progressiva (déficit de atenção, função executiva, visuoespacial)',
        'CARACTERÍSTICAS CENTRAIS (>=2 = provável):',
        '- Flutuações cognitivas com variações de atenção/alerta',
        '- Alucinações visuais recorrentes, detalhadas',
        '- Distúrbio comportamental do sono REM',
        '- Parkinsonismo espontâneo',
        'BIOMARCADORES: captação reduzida no DaTscan, polissonografia com RBD'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Ambiente calmo e bem iluminado',
          'Rotina estruturada',
          'Evitar antipsicóticos típicos (hipersensibilidade severa)',
          'Fisioterapia para parkinsonismo'
        ],
        farmacologico: [
          'COGNITIVO: Inibidores de colinesterase (primeira linha)',
          'Rivastigmina 6-12mg/dia ou adesivo',
          'Donepezila 5-10mg/dia',
          'ALUCINAÇÕES: Clozapina ou Quetiapina (doses baixas) se necessário',
          'PARKINSONISMO: Levodopa (cuidado com psicose)',
          'RBD: Melatonina 3-12mg ou Clonazepam 0,25-1mg'
        ]
      },
      metasTerapeuticas: [
        'Melhora cognitiva e funcional',
        'Controle de alucinações',
        'Segurança (quedas, aspiração)',
        'Qualidade de vida do cuidador'
      ],
      examesIniciais: [
        'Avaliação neuropsicológica',
        'RM de crânio',
        'DaTscan (SPECT com ioflupano)',
        'Polissonografia (RBD)',
        'MIBG cardíaco (denervação simpática)'
      ],
      redFlags: [
        'Hipersensibilidade a antipsicóticos (síndrome neuroléptica maligna)',
        'Quedas frequentes',
        'Disfagia',
        'Disautonomia severa'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,1-5% da população geral; 15-20% das demências',
        faixaEtaria: 'Início típico após 50 anos (média 75 anos)',
        fatoresRisco: [
          'Idade avançada',
          'Sexo masculino (discreto)',
          'História familiar (casos raros)',
          'Distúrbio comportamental do sono REM prévio'
        ],
        citations: [{ refId: 'neurology-dlb-2022' }]
      },
      fisiopatologia: {
        texto: 'Acúmulo de alfa-sinucleína em neurônios corticais formando corpos de Lewy. Continuum com doença de Parkinson. Déficit colinérgico proeminente explica boa resposta a anticolinesterásicos.',
        citations: [{ refId: 'lancet-neurol-dlb-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Demência progressiva (atenção, visuoespacial)',
          'Flutuações cognitivas (variações dia a dia)',
          'Alucinações visuais detalhadas',
          'Parkinsonismo (rigidez, bradicinesia)',
          'Distúrbio comportamental do sono REM'
        ],
        sinaisExameFisico: [
          'Déficit visuoespacial proeminente',
          'Flutuação de atenção durante exame',
          'Parkinsonismo (menos tremor que DP)',
          'Hipotensão ortostática',
          'Hipersensibilidade a neurolépticos'
        ],
        formasClinicas: [
          'DCL típica',
          'Demência da doença de Parkinson (PDD) - quando parkinsonismo precede demência em >1 ano'
        ],
        citations: [{ refId: 'neurology-dlb-2022' }]
      },
      diagnostico: {
        criterios: [
          'Critérios do 4º Consórcio DLB (2017)',
          'Provável: demência + >=2 características centrais OU 1 central + 1 biomarcador',
          'Possível: 1 característica central OU >=1 biomarcador'
        ],
        diagnosticoDiferencial: [
          'Doença de Alzheimer',
          'Demência da doença de Parkinson',
          'Demência frontotemporal',
          'Paralisia supranuclear progressiva'
        ],
        examesLaboratoriais: [
          'Excluir causas reversíveis de demência',
          'TSH, B12, função renal e hepática'
        ],
        examesImagem: [
          'RM: atrofia cortical, preservação relativa do hipocampo',
          'DaTscan: captação reduzida nos gânglios da base',
          'PET-FDG: hipometabolismo occipital',
          'MIBG cardíaco: captação reduzida'
        ],
        citations: [{ refId: 'lancet-neurol-dlb-2021' }]
      },
      tratamento: {
        objetivos: [
          'Melhora cognitiva',
          'Controle de sintomas comportamentais',
          'Segurança (evitar antipsicóticos típicos)'
        ],
        naoFarmacologico: {
          medidas: [
            'Ambiente seguro e calmo',
            'Iluminação adequada',
            'Rotinas estruturadas',
            'Fisioterapia para parkinsonismo'
          ],
          citations: [{ refId: 'aan-dlb-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inibidor de colinesterase', medicamentos: ['Rivastigmina', 'Donepezila'], posologia: 'Rivastigmina 6-12mg/dia ou adesivo 9,5mg/24h', observacoes: 'Evidência mais forte para rivastigmina' }
          ],
          segundaLinha: [
            { classe: 'Antipsicótico atípico', medicamentos: ['Quetiapina', 'Clozapina'], posologia: 'Quetiapina 12,5-100mg/dia', observacoes: 'Apenas se alucinações perturbadoras; doses baixas' },
            { classe: 'Para RBD', medicamentos: ['Melatonina', 'Clonazepam'], posologia: 'Melatonina 3-12mg à noite', observacoes: 'Melatonina preferível em idosos' }
          ],
          situacoesEspeciais: [
            { situacao: 'Parkinsonismo incapacitante', conduta: 'Levodopa em doses baixas (pode piorar alucinações)' },
            { situacao: 'EVITAR', conduta: 'Antipsicóticos típicos, anticolinérgicos, benzodiazepínicos' }
          ],
          citations: [{ refId: 'aan-dlb-2021' }]
        },
        duracao: 'Contínuo, ajuste conforme progressão'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: [
          'Avaliação cognitiva periódica',
          'Monitoramento de efeitos adversos',
          'Avaliação funcional'
        ],
        metasTerapeuticas: [
          'Estabilidade cognitiva',
          'Controle de sintomas comportamentais',
          'Suporte ao cuidador'
        ],
        criteriosEncaminhamento: [
          'Neurologista/geriatra especializado',
          'Psiquiatria se sintomas comportamentais refratários',
          'Cuidados paliativos em fase avançada'
        ],
        citations: [{ refId: 'neurology-dlb-2022' }]
      }
    },
    protocolos: ['dlb-manejo'],
    medicamentos: ['rivastigmina', 'donepezila', 'quetiapina', 'melatonina'],
    calculadoras: ['moca', 'cdr'],
    rastreamentos: [],
    citations: [{ refId: 'aan-dlb-2021' }, { refId: 'lancet-neurol-dlb-2021' }],
    lastUpdate: '2025-01',
    tags: ['demencia', 'corpos-lewy', 'alucinacoes', 'parkinsonismo', 'RBD']
  },

  {
    id: 'demencia-frontotemporal',
    titulo: 'Demência Frontotemporal',
    sinonimos: ['DFT', 'FTD', 'Demência de Pick'],
    doid: 'DOID:9255',
    snomedCT: '230270009',
    meshId: 'D057180',
    umlsCui: 'C0338451',
    ciap2: ['P70'],
    cid10: ['G31.0'],
    cid11: ['6D83'],
    categoria: 'neurologico',
    subcategoria: 'demencia',
    quickView: {
      definicao: 'Grupo de demências caracterizadas por degeneração frontal e temporal, manifestando-se como alterações comportamentais/personalidade (variante comportamental) ou de linguagem (afasia progressiva primária).',
      criteriosDiagnosticos: [
        'VARIANTE COMPORTAMENTAL (bvFTD):',
        '>=3 de: desinibição, apatia, perda de empatia, comportamentos compulsivos/rituais, hiperoralidade, déficit executivo',
        'Declínio funcional',
        'RM/PET: atrofia ou hipometabolismo frontal/temporal anterior',
        'AFASIA PROGRESSIVA PRIMÁRIA (APP):',
        '- Não-fluente/agramática: agramatismo, apraxia de fala',
        '- Semântica: perda de significado de palavras',
        '- Logopênica: pausas para encontrar palavras (patologia de Alzheimer)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Modificação ambiental',
          'Estratégias comportamentais',
          'Fonoaudiologia para variantes linguísticas',
          'Suporte ao cuidador (fundamental)'
        ],
        farmacologico: [
          'Não há tratamento modificador de doença',
          'ISRS para sintomas comportamentais (desinibição, compulsões)',
          'Trazodona para agitação',
          'Evitar anticolinesterásicos (podem piorar)',
          'Antipsicóticos atípicos com cautela se agitação severa'
        ]
      },
      metasTerapeuticas: [
        'Controle de sintomas comportamentais',
        'Segurança do paciente',
        'Suporte ao cuidador',
        'Manutenção da comunicação (variantes linguísticas)'
      ],
      examesIniciais: [
        'Avaliação neuropsicológica detalhada',
        'RM de crânio (atrofia frontal/temporal)',
        'PET-FDG (hipometabolismo frontal/temporal)',
        'Teste genético se história familiar'
      ],
      redFlags: [
        'Comportamento desinibido (impulsividade financeira, sexual)',
        'Mudança de personalidade marcante',
        'Comportamentos rituais/compulsivos',
        'Perda de insight'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '15-22/100.000 em 45-64 anos',
        faixaEtaria: 'Início pré-senil (45-65 anos); pode ocorrer mais cedo',
        fatoresRisco: [
          'História familiar (30-50% têm parente de primeiro grau)',
          'Mutações genéticas: MAPT, GRN, C9orf72'
        ],
        citations: [{ refId: 'neurology-ftd-2022' }]
      },
      fisiopatologia: {
        texto: 'Grupo heterogêneo com diferentes patologias: tau (Pick), TDP-43, FUS. Mutação C9orf72 é a causa genética mais comum. Degeneração seletiva do córtex frontal e temporal anterior.',
        citations: [{ refId: 'lancet-neurol-ftd-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'bvFTD: desinibição, apatia, comportamentos repetitivos',
          'Perda de empatia e julgamento social',
          'Hiperoralidade (preferência por doces)',
          'APP-nf: fala esforçada, agramatismo',
          'APP-sv: perda de vocabulário, compreensão comprometida'
        ],
        sinaisExameFisico: [
          'Reflexos primitivos (preensão, sucção)',
          'Déficit executivo',
          'Memória relativamente preservada inicialmente',
          'Sinais de neurônio motor (DFT-ELA)'
        ],
        formasClinicas: [
          'Variante comportamental (bvFTD)',
          'APP não-fluente/agramática',
          'APP semântica',
          'APP logopênica (patologia Alzheimer)',
          'DFT com ELA',
          'Síndrome corticobasal'
        ],
        citations: [{ refId: 'neurology-ftd-2022' }]
      },
      diagnostico: {
        criterios: [
          'Critérios de Rascovsky (bvFTD)',
          'Critérios de Gorno-Tempini (APP)',
          'Neuroimagem compatível'
        ],
        diagnosticoDiferencial: [
          'Doença de Alzheimer',
          'Transtorno bipolar',
          'Esquizofrenia de início tardio',
          'Demência por corpos de Lewy'
        ],
        examesImagem: [
          'RM: atrofia frontal e/ou temporal anterior',
          'PET-FDG: hipometabolismo frontal/temporal',
          'PET-amiloide: negativo (diferencia de Alzheimer)'
        ],
        citations: [{ refId: 'lancet-neurol-ftd-2021' }]
      },
      tratamento: {
        objetivos: [
          'Controle sintomático',
          'Segurança',
          'Suporte ao cuidador'
        ],
        naoFarmacologico: {
          medidas: [
            'Estratégias comportamentais estruturadas',
            'Modificação ambiental',
            'Fonoaudiologia (para APP)',
            'Grupos de apoio para cuidadores'
          ],
          citations: [{ refId: 'aan-ftd-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'ISRS', medicamentos: ['Sertralina', 'Paroxetina', 'Citalopram'], posologia: 'Sertralina 50-200mg/dia', observacoes: 'Para comportamentos compulsivos, desinibição' },
            { classe: 'Trazodona', medicamentos: ['Trazodona'], posologia: '50-300mg/dia', observacoes: 'Para agitação, distúrbio de sono' }
          ],
          situacoesEspeciais: [
            { situacao: 'Agitação severa', conduta: 'Antipsicóticos atípicos em doses baixas (cautela)' },
            { situacao: 'EVITAR', conduta: 'Anticolinesterásicos (podem piorar comportamento)' }
          ],
          citations: [{ refId: 'aan-ftd-2021' }]
        },
        duracao: 'Contínuo, ajuste conforme sintomas'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        metasTerapeuticas: [
          'Controle de comportamentos perturbadores',
          'Saúde do cuidador',
          'Planejamento de cuidados avançados'
        ],
        criteriosEncaminhamento: [
          'Neurologista especializado',
          'Geneticista se história familiar',
          'Cuidados paliativos'
        ],
        citations: [{ refId: 'neurology-ftd-2022' }]
      }
    },
    protocolos: ['ftd-manejo-comportamental'],
    medicamentos: ['sertralina', 'trazodona'],
    calculadoras: ['frs-frontotemporal'],
    rastreamentos: [],
    citations: [{ refId: 'aan-ftd-2021' }, { refId: 'lancet-neurol-ftd-2021' }],
    lastUpdate: '2025-01',
    tags: ['demencia', 'frontotemporal', 'comportamental', 'afasia', 'Pick']
  },

  {
    id: 'atrofia-multiplos-sistemas',
    titulo: 'Atrofia de Múltiplos Sistemas (MSA)',
    sinonimos: ['MSA', 'Atrofia olivopontocerebelar', 'Síndrome de Shy-Drager'],
    doid: 'DOID:1752',
    snomedCT: '230292007',
    meshId: 'D019578',
    umlsCui: 'C0037019',
    ciap2: ['N87'],
    cid10: ['G90.3'],
    cid11: ['8A00.3'],
    categoria: 'neurologico',
    subcategoria: 'disturbios_movimento',
    quickView: {
      definicao: 'Doença neurodegenerativa esporádica caracterizada por parkinsonismo com resposta pobre a levodopa, disfunção cerebelar, disautonomia e sinais piramidais. Alfa-sinucleinopatia.',
      criteriosDiagnosticos: [
        'CRITÉRIOS MDS 2022:',
        'MSA-P: parkinsonismo predominante + disautonomia',
        'MSA-C: síndrome cerebelar predominante + disautonomia',
        'DISAUTONOMIA obrigatória: hipotensão ortostática (>=20/10mmHg) e/ou disfunção vesical',
        'Progressão rápida',
        'Resposta pobre a levodopa',
        'RM: sinal da cruz quente (MSA-C), atrofia do putâmen'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Medidas para hipotensão ortostática (meias compressivas, elevar cabeceira)',
          'Fisioterapia (equilíbrio)',
          'Fonoaudiologia (disfagia, disartria)',
          'Cateterismo intermitente se retenção urinária'
        ],
        farmacologico: [
          'DISAUTONOMIA: Fludrocortisona 0,1-0,3mg/dia + Midodrina 2,5-10mg 3x/dia',
          'Droxidopa para hipotensão ortostática',
          'PARKINSONISMO: Tentativa com Levodopa (resposta em 30%)',
          'BEXIGA: Anticolinérgicos se hiperatividade; alfa-bloqueadores se retenção'
        ]
      },
      metasTerapeuticas: [
        'Controle de hipotensão ortostática',
        'Manejo de sintomas vesicais',
        'Prevenção de quedas',
        'Manutenção de deglutição segura'
      ],
      examesIniciais: [
        'RM de crânio (sinal da cruz quente, atrofia pontina/cerebelar/putamen)',
        'Tilt test (hipotensão ortostática)',
        'Estudo urodinâmico',
        'Esfincterografia (denervação do esfíncter anal)'
      ],
      redFlags: [
        'Progressão rápida (sobrevida média 6-9 anos)',
        'Estridor laríngeo (risco de morte súbita)',
        'Disfagia grave (risco aspiração)',
        'Quedas frequentes'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '3-5/100.000',
        incidencia: '0,6-0,7/100.000/ano',
        mortalidade: 'Sobrevida média 6-9 anos após diagnóstico',
        faixaEtaria: 'Início típico 50-60 anos',
        fatoresRisco: [
          'Idade',
          'Esporádica (não há fator de risco genético forte identificado)'
        ],
        citations: [{ refId: 'mov-disord-msa-2022' }]
      },
      fisiopatologia: {
        texto: 'Acúmulo de alfa-sinucleína em oligodendrócitos (inclusões citoplasmáticas gliais). Degeneração de gânglios da base, cerebelo, tronco encefálico e núcleos autonômicos.',
        citations: [{ refId: 'lancet-neurol-msa-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Parkinsonismo (rigidez, bradicinesia)',
          'Síndrome cerebelar (ataxia, disartria)',
          'Disautonomia (hipotensão ortostática, disfunção vesical)',
          'Estridor laríngeo',
          'Distúrbio comportamental do sono REM'
        ],
        sinaisExameFisico: [
          'Hipotensão ortostática',
          'Parkinsonismo simétrico',
          'Ataxia de marcha',
          'Nistagmo',
          'Reflexos vivos/Babinski'
        ],
        formasClinicas: [
          'MSA-P (parkinsonismo predominante)',
          'MSA-C (cerebelar predominante)'
        ],
        citations: [{ refId: 'mov-disord-msa-2022' }]
      },
      diagnostico: {
        criterios: [
          'Critérios MDS 2022',
          'Parkinsonismo OU síndrome cerebelar',
          'Disautonomia obrigatória',
          'Suporte por RM'
        ],
        diagnosticoDiferencial: [
          'Doença de Parkinson',
          'Paralisia supranuclear progressiva',
          'Degeneração corticobasal',
          'Ataxias espinocerebelares'
        ],
        examesImagem: [
          'RM: sinal da cruz quente (hot cross bun), atrofia pontina',
          'Atrofia de cerebelo médio',
          'Atrofia/sinal do putâmen'
        ],
        citations: [{ refId: 'lancet-neurol-msa-2021' }]
      },
      tratamento: {
        objetivos: [
          'Tratamento sintomático',
          'Manejo da disautonomia',
          'Suporte multidisciplinar'
        ],
        naoFarmacologico: {
          medidas: [
            'Meias compressivas',
            'Elevar cabeceira 10-20 graus',
            'Aumento de sal/líquidos',
            'Fisioterapia, fonoaudiologia'
          ],
          citations: [{ refId: 'aan-msa-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Para hipotensão ortostática', medicamentos: ['Fludrocortisona', 'Midodrina'], posologia: 'Fludrocortisona 0,1-0,3mg/dia; Midodrina 2,5-10mg 3x/dia', observacoes: 'Monitorar HAS supina' },
            { classe: 'Dopaminérgico', medicamentos: ['Levodopa'], posologia: 'Até 1000mg/dia', observacoes: 'Tentativa obrigatória; resposta modesta em 30%' }
          ],
          situacoesEspeciais: [
            { situacao: 'Estridor laríngeo', conduta: 'CPAP noturno; traqueostomia se grave' }
          ],
          citations: [{ refId: 'aan-msa-2021' }]
        },
        duracao: 'Contínuo'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; multidisciplinar',
        metasTerapeuticas: [
          'Controle de hipotensão ortostática',
          'Prevenir quedas',
          'Manter deglutição segura'
        ],
        criteriosEncaminhamento: [
          'Neurologista especializado',
          'Urologia',
          'Cuidados paliativos'
        ],
        citations: [{ refId: 'mov-disord-msa-2022' }]
      }
    },
    protocolos: ['msa-manejo-disautonomia'],
    medicamentos: ['fludrocortisona', 'midodrina', 'levodopa'],
    calculadoras: ['umsars'],
    rastreamentos: [],
    citations: [{ refId: 'aan-msa-2021' }, { refId: 'lancet-neurol-msa-2021' }],
    lastUpdate: '2025-01',
    tags: ['MSA', 'parkinsonismo-atipico', 'disautonomia', 'alfa-sinucleinopatia']
  },

  // ============================================================================
  // DOENÇAS DO NERVO PERIFÉRICO
  // ============================================================================
  {
    id: 'guillain-barre',
    titulo: 'Síndrome de Guillain-Barré',
    sinonimos: ['SGB', 'GBS', 'Polirradiculoneuropatia desmielinizante inflamatória aguda', 'AIDP'],
    doid: 'DOID:12842',
    snomedCT: '40956001',
    meshId: 'D020275',
    umlsCui: 'C0018378',
    ciap2: ['N91'],
    cid10: ['G61.0'],
    cid11: ['8C00.0'],
    categoria: 'neurologico',
    subcategoria: 'neuropatia_periferica',
    quickView: {
      definicao: 'Polirradiculoneuropatia inflamatória aguda, geralmente pós-infecciosa. Caracterizada por fraqueza ascendente simétrica, arreflexia e dissociação albumino-citológica no LCR. Emergência neurológica.',
      criteriosDiagnosticos: [
        'CRITÉRIOS DE BRIGHTON:',
        'Fraqueza bilateral e flácida dos membros',
        'Reflexos tendinosos diminuídos ou abolidos',
        'Padrão monofásico (nadir em 2-4 semanas)',
        'LCR: dissociação albumino-citológica (proteína elevada, celularidade normal)',
        'ENMG: padrão desmielinizante ou axonal',
        'Ausência de causa alternativa'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Internação (monitorar função respiratória)',
          'Capacidade vital forçada seriada (intubar se <20mL/kg)',
          'Profilaxia de TVP',
          'Fisioterapia precoce'
        ],
        farmacologico: [
          'IVIG 0,4g/kg/dia por 5 dias (primeira linha)',
          'OU Plasmaférese 5 sessões em 2 semanas',
          'Eficácia similar; IVIG mais disponível',
          'NÃO usar corticosteróides (ineficaz em GBS)',
          'Dor neuropática: Gabapentina, Pregabalina'
        ]
      },
      metasTerapeuticas: [
        'Evitar insuficiência respiratória',
        'Estabilização e início de recuperação',
        'Reabilitação funcional'
      ],
      examesIniciais: [
        'LCR (dissociação albumino-citológica)',
        'ENMG (após 10-14 dias do início)',
        'Capacidade vital forçada seriada',
        'Anticorpos anti-gangliosídeos (GM1, GQ1b)',
        'Sorologia para Campylobacter, CMV, Zika'
      ],
      redFlags: [
        'Insuficiência respiratória (CVF <20mL/kg = intubar)',
        'Progressão rápida',
        'Disfunção autonômica (arritmias, flutuação PA)',
        'Disfagia',
        'Variante de Miller-Fisher (oftalmoplegia, ataxia, arreflexia)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'N/A (doença aguda)',
        incidencia: '1-2/100.000/ano',
        mortalidade: '3-7% em países desenvolvidos',
        faixaEtaria: 'Qualquer idade; discreto aumento com idade',
        fatoresRisco: [
          'Infecção prévia (Campylobacter jejuni, CMV, EBV, Zika, COVID-19)',
          'Cirurgia recente',
          'Vacinação (raro)'
        ],
        citations: [{ refId: 'lancet-gbs-2021' }]
      },
      fisiopatologia: {
        texto: 'Resposta autoimune pós-infecciosa com mimetismo molecular. Anticorpos contra gangliosídeos atacam mielina (AIDP) ou axônio (AMAN, AMSAN). Campylobacter associado a formas axonais e anti-GM1.',
        citations: [{ refId: 'nejm-gbs-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fraqueza ascendente (inicia em MMII)',
          'Parestesias/dor',
          'Arreflexia',
          'Disfunção autonômica (arritmias, retenção urinária)',
          'Paralisia facial bilateral (frequente)',
          'Disfagia'
        ],
        sinaisExameFisico: [
          'Fraqueza simétrica',
          'Hipotonia',
          'Arreflexia ou hiporreflexia',
          'Pode haver sinais sensitivos leves',
          'Disfunção autonômica'
        ],
        formasClinicas: [
          'AIDP (desmielinizante) - mais comum no Ocidente',
          'AMAN (axonal motora) - mais comum na Ásia',
          'AMSAN (axonal sensório-motora)',
          'Miller-Fisher (oftalmoplegia, ataxia, arreflexia - anti-GQ1b)'
        ],
        citations: [{ refId: 'lancet-gbs-2021' }]
      },
      diagnostico: {
        criterios: [
          'Critérios de Brighton',
          'LCR: proteína elevada, células normais (após primeira semana)',
          'ENMG: confirma e classifica'
        ],
        diagnosticoDiferencial: [
          'Mielite transversa',
          'Miastenia gravis',
          'Botulismo',
          'Poliomielite',
          'Compressão medular',
          'Neuropatia do paciente crítico'
        ],
        examesLaboratoriais: [
          'LCR',
          'Anticorpos anti-gangliosídeos',
          'Sorologia para infecções desencadeantes'
        ],
        outrosExames: [
          'ENMG (após 10-14 dias)',
          'CVF seriada',
          'ECG (arritmias)'
        ],
        citations: [{ refId: 'nejm-gbs-2020' }]
      },
      tratamento: {
        objetivos: [
          'Suporte ventilatório se necessário',
          'Imunoterapia precoce',
          'Prevenir complicações'
        ],
        naoFarmacologico: {
          medidas: [
            'Monitorar CVF a cada 4-6 horas',
            'Intubar se CVF <20mL/kg ou declínio rápido',
            'Profilaxia de TVP',
            'Fisioterapia precoce'
          ],
          citations: [{ refId: 'aan-gbs-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Imunoglobulina', medicamentos: ['IVIG'], posologia: '0,4g/kg/dia por 5 dias (total 2g/kg)', observacoes: 'Iniciar nos primeiros 14 dias' },
            { classe: 'Plasmaférese', medicamentos: ['Plasmaférese'], posologia: '5 sessões em 2 semanas', observacoes: 'Alternativa à IVIG; eficácia similar' }
          ],
          situacoesEspeciais: [
            { situacao: 'Sem resposta ou recaída', conduta: 'Segundo curso de IVIG' },
            { situacao: 'Dor neuropática', conduta: 'Gabapentina, Pregabalina' }
          ],
          citations: [{ refId: 'aan-gbs-2021' }]
        },
        duracao: 'IVIG por 5 dias; reabilitação por meses'
      },
      acompanhamento: {
        frequenciaConsultas: 'Internação; seguimento ambulatorial após',
        examesControle: [
          'CVF até estabilização',
          'ENMG de controle',
          'Avaliação funcional'
        ],
        metasTerapeuticas: [
          'Recuperação da força',
          'Retorno à funcionalidade',
          '85% recuperam capacidade de deambular'
        ],
        criteriosEncaminhamento: [
          'UTI se comprometimento respiratório',
          'Reabilitação intensiva',
          'Neurologista para seguimento'
        ],
        citations: [{ refId: 'lancet-gbs-2021' }]
      }
    },
    protocolos: ['gbs-emergencia', 'gbs-ivig'],
    medicamentos: ['ivig', 'gabapentina', 'pregabalina'],
    calculadoras: ['egris', 'mrc-sum-score'],
    rastreamentos: [],
    citations: [{ refId: 'lancet-gbs-2021' }, { refId: 'aan-gbs-2021' }],
    lastUpdate: '2025-01',
    tags: ['guillain-barre', 'AIDP', 'neuropatia', 'IVIG', 'emergencia']
  },

  {
    id: 'cidp',
    titulo: 'Polineuropatia Desmielinizante Inflamatória Crônica (CIDP)',
    sinonimos: ['CIDP', 'PDIC', 'Chronic Inflammatory Demyelinating Polyneuropathy'],
    doid: 'DOID:5211',
    snomedCT: '128191003',
    meshId: 'D020277',
    umlsCui: 'C0393819',
    ciap2: ['N91'],
    cid10: ['G61.8'],
    cid11: ['8C00.1'],
    categoria: 'neurologico',
    subcategoria: 'neuropatia_periferica',
    quickView: {
      definicao: 'Neuropatia desmielinizante imunomediada crônica. Fraqueza simétrica proximal e distal, arreflexia, evolução >8 semanas. Responde a imunoterapia. Análogo crônico da síndrome de Guillain-Barré.',
      criteriosDiagnosticos: [
        'CRITÉRIOS EAN/PNS 2021:',
        'Fraqueza proximal e distal, simétrica, em MMSS e MMII',
        'Arreflexia ou hiporreflexia',
        'Progressão >8 semanas',
        'ENMG: desmielinização (latências prolongadas, bloqueio de condução, dispersão temporal)',
        'LCR: proteína elevada, celularidade normal',
        'Resposta a imunoterapia apoia diagnóstico'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fisioterapia para manutenção de força',
          'Terapia ocupacional',
          'Órteses se necessário'
        ],
        farmacologico: [
          'IVIG 2g/kg dividido em 2-5 dias, depois manutenção 1g/kg a cada 3-4 semanas',
          'OU Corticosteróides: Prednisona 1mg/kg/dia (desmame lento)',
          'OU Plasmaférese (menos conveniente para crônico)',
          'Refratário: Rituximabe, Ciclofosfamida'
        ]
      },
      metasTerapeuticas: [
        'Melhora da força muscular',
        'Prevenção de incapacidade',
        'Menor dose eficaz de manutenção'
      ],
      examesIniciais: [
        'ENMG com estudos de condução nervosa (padrão-ouro)',
        'LCR (dissociação albumino-citológica)',
        'Hemograma, função renal e hepática',
        'Eletroforese de proteínas (excluir MGUS)',
        'RM de raízes nervosas (espessamento/realce)'
      ],
      redFlags: [
        'Assimetria marcante (considerar MMN)',
        'Dor proeminente (considerar POEMS)',
        'Ausência de resposta a tratamento',
        'Componente monoclonal (avaliar POEMS, MGUS)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-9/100.000',
        incidencia: '0,3-0,6/100.000/ano',
        faixaEtaria: 'Qualquer idade; pico em 40-60 anos',
        fatoresRisco: [
          'Diabetes mellitus',
          'Gamopatia monoclonal',
          'Outras doenças autoimunes'
        ],
        citations: [{ refId: 'neurology-cidp-2022' }]
      },
      fisiopatologia: {
        texto: 'Resposta autoimune contra componentes da mielina periférica. Anticorpos contra nodo de Ranvier (NF155, CNTN1, CASPR1) em subgrupos. Desmielinização segmentar com bloqueio de condução.',
        citations: [{ refId: 'lancet-neurol-cidp-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fraqueza simétrica proximal e distal',
          'Parestesias',
          'Ataxia sensitiva',
          'Fadiga',
          'Evolução progressiva ou recidivante-remitente'
        ],
        sinaisExameFisico: [
          'Fraqueza proximal e distal',
          'Arreflexia ou hiporreflexia',
          'Perda sensitiva (vibração, propriocepção)',
          'Marcha atáxica',
          'Nervos podem estar espessados'
        ],
        formasClinicas: [
          'CIDP típica',
          'CIDP atípica: distal (DADS), sensitiva, focal, motora',
          'CIDP associada a anticorpos (anti-MAG, anti-NF155)'
        ],
        citations: [{ refId: 'neurology-cidp-2022' }]
      },
      diagnostico: {
        criterios: [
          'Critérios EAN/PNS 2021',
          'Definido: clínica + ENMG desmielinizante',
          'Provável: clínica + ENMG sugestiva',
          'Suporte: LCR, RM, resposta ao tratamento'
        ],
        diagnosticoDiferencial: [
          'Neuropatia diabética',
          'POEMS',
          'Neuropatia hereditária (CMT)',
          'MMN (multifocal motora)',
          'MGUS-neuropatia'
        ],
        examesLaboratoriais: [
          'Eletroforese de proteínas',
          'Imunofixação',
          'Anticorpos anti-MAG, anti-NF155',
          'VEGF (se suspeita POEMS)'
        ],
        outrosExames: [
          'ENMG (desmielinização)',
          'LCR',
          'RM de plexo/raízes'
        ],
        citations: [{ refId: 'lancet-neurol-cidp-2021' }]
      },
      tratamento: {
        objetivos: [
          'Induzir remissão',
          'Manter resposta com menor dose',
          'Prevenir incapacidade'
        ],
        naoFarmacologico: {
          medidas: [
            'Fisioterapia regular',
            'Terapia ocupacional',
            'Exercícios de fortalecimento'
          ],
          citations: [{ refId: 'aan-cidp-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Imunoglobulina', medicamentos: ['IVIG', 'SCIG'], posologia: 'IVIG 2g/kg indução, depois 1g/kg/mês', observacoes: 'Primeira linha; SCIG opção de manutenção' },
            { classe: 'Corticosteróide', medicamentos: ['Prednisona', 'Metilprednisolona'], posologia: 'Prednisona 1mg/kg/dia, desmame lento', observacoes: 'Alternativa à IVIG; efeitos colaterais a longo prazo' }
          ],
          segundaLinha: [
            { classe: 'Plasmaférese', medicamentos: ['Plasmaférese'], posologia: '2x/semana inicialmente', observacoes: 'Eficaz, mas logisticamente difícil para crônico' },
            { classe: 'Imunossupressor', medicamentos: ['Rituximabe', 'Azatioprina', 'Ciclofosfamida'], posologia: 'Rituximabe 375mg/m2 semanal x4 ou 1g x2', observacoes: 'Para refratários' }
          ],
          citations: [{ refId: 'aan-cidp-2021' }]
        },
        duracao: 'Manutenção a longo prazo; tentar desmame periódico'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal durante ajuste; depois trimestral',
        examesControle: [
          'MRC sum score',
          'INCAT disability score',
          'ENMG periódico'
        ],
        metasTerapeuticas: [
          'Melhora ou estabilização funcional',
          'Menor dose de manutenção'
        ],
        criteriosEncaminhamento: [
          'Neurologista especializado em neuromuscular',
          'Refratários: centros especializados'
        ],
        citations: [{ refId: 'neurology-cidp-2022' }]
      }
    },
    protocolos: ['cidp-ivig-manutencao'],
    medicamentos: ['ivig', 'prednisona', 'rituximabe'],
    calculadoras: ['incat-disability', 'mrc-sum-score'],
    rastreamentos: [],
    citations: [{ refId: 'aan-cidp-2021' }, { refId: 'lancet-neurol-cidp-2021' }],
    lastUpdate: '2025-01',
    tags: ['CIDP', 'neuropatia', 'desmielinizante', 'cronica', 'IVIG']
  },

  {
    id: 'esclerose-lateral-amiotrofica',
    titulo: 'Esclerose Lateral Amiotrófica (ELA)',
    sinonimos: ['ELA', 'ALS', 'Doença de Lou Gehrig', 'Doença do neurônio motor'],
    doid: 'DOID:332',
    snomedCT: '86044005',
    meshId: 'D000690',
    umlsCui: 'C0002736',
    ciap2: ['N87'],
    cid10: ['G12.2'],
    cid11: ['8B60.0'],
    categoria: 'neurologico',
    subcategoria: 'neuronio_motor',
    quickView: {
      definicao: 'Doença neurodegenerativa progressiva que afeta neurônios motores superiores (córtex) e inferiores (medula/tronco). Fraqueza progressiva, atrofia, fasciculações, espasticidade. Fatal em 2-5 anos; doença de Stephen Hawking.',
      criteriosDiagnosticos: [
        'CRITÉRIOS DE GOLD COAST (2019):',
        'Disfunção progressiva de neurônio motor',
        'Sinais de NMS E NMI na mesma região OU',
        'Sinais de NMI em >=2 regiões',
        'Ausência de evidência de outro processo',
        'ENMG: denervação ativa em >=2 regiões',
        'Regiões: bulbar, cervical, torácica, lombossacra'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Equipe multidisciplinar (neurologista, fisio, fono, nutri, pneumo)',
          'Ventilação não invasiva (VNI) precoce',
          'Gastrostomia se disfagia (antes de CVF <50%)',
          'Comunicação alternativa',
          'Cuidados paliativos integrados'
        ],
        farmacologico: [
          'RILUZOL 50mg 2x/dia (único aprovado que modifica sobrevida - 2-3 meses)',
          'Edaravone (evidência limitada)',
          'ESPASTICIDADE: Baclofeno, Tizanidina',
          'SIALORREIA: Amitriptilina, Atropina, Toxina botulínica',
          'DEPRESSÃO: ISRS',
          'DOR: Gabapentina, Pregabalina'
        ]
      },
      metasTerapeuticas: [
        'Manter qualidade de vida',
        'Prolongar função respiratória',
        'Manter nutrição adequada',
        'Suporte paliativo'
      ],
      examesIniciais: [
        'ENMG (denervação ativa, fasciculações)',
        'RM de neuroeixo (excluir mielopatia)',
        'Laboratoriais: excluir mímicos (TSH, PTH, B12, HIV, sífilis)',
        'Testes genéticos se história familiar (SOD1, C9orf72)'
      ],
      redFlags: [
        'Insuficiência respiratória',
        'Disfagia grave (risco de aspiração)',
        'Perda de peso rápida',
        'Síndrome pseudobulbar (riso/choro patológico)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '4-6/100.000',
        incidencia: '1-2/100.000/ano',
        mortalidade: 'Sobrevida mediana 2-4 anos; 10% sobrevivem >10 anos',
        faixaEtaria: 'Início típico 55-75 anos',
        fatoresRisco: [
          'Idade',
          'História familiar (5-10% dos casos)',
          'Mutações: SOD1, C9orf72, TARDBP, FUS',
          'Sexo masculino (discreto)'
        ],
        citations: [{ refId: 'lancet-neurol-als-2022' }]
      },
      fisiopatologia: {
        texto: 'Degeneração seletiva de neurônios motores no córtex motor, tronco encefálico e corno anterior da medula. Acúmulo de TDP-43 na maioria. Expansão de hexanucleotídeo C9orf72 é a causa genética mais comum.',
        citations: [{ refId: 'nejm-als-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fraqueza progressiva assimétrica',
          'Atrofia muscular',
          'Fasciculações',
          'Câimbras',
          'Disartria, disfagia (forma bulbar)',
          'Dispneia'
        ],
        sinaisExameFisico: [
          'NEURÔNIO MOTOR INFERIOR: atrofia, fasciculações, hiporreflexia',
          'NEURÔNIO MOTOR SUPERIOR: espasticidade, hiperreflexia, Babinski, Hoffmann',
          'Combinação de ambos = característica de ELA',
          'Síndrome pseudobulbar'
        ],
        formasClinicas: [
          'ELA clássica (espinhal)',
          'ELA bulbar (disartria/disfagia iniciais)',
          'Esclerose lateral primária (apenas NMS)',
          'Atrofia muscular progressiva (apenas NMI)',
          'ELA-FTD (com demência frontotemporal)'
        ],
        citations: [{ refId: 'lancet-neurol-als-2022' }]
      },
      diagnostico: {
        criterios: [
          'Critérios de Gold Coast 2019 (simplificados)',
          'Sinais de NMS + NMI na mesma região OU NMI em >=2 regiões',
          'Progressão',
          'Exclusão de outras causas'
        ],
        diagnosticoDiferencial: [
          'Mielopatia espondilótica cervical',
          'Neuropatia motora multifocal',
          'Doença de Kennedy (SBMA)',
          'Miastenia gravis',
          'Poliomielite/síndrome pós-pólio',
          'CIDP'
        ],
        examesLaboratoriais: [
          'TSH, B12, PTH, HIV, sífilis, Lyme',
          'CK (elevada moderadamente)',
          'Teste genético se familiar'
        ],
        outrosExames: [
          'ENMG (denervação ativa e crônica)',
          'RM de neuroeixo',
          'PFP (capacidade vital)'
        ],
        citations: [{ refId: 'nejm-als-2021' }]
      },
      tratamento: {
        objetivos: [
          'Modificar doença minimamente (riluzol)',
          'Sintomático e suportivo',
          'Qualidade de vida e dignidade'
        ],
        naoFarmacologico: {
          medidas: [
            'Equipe multidisciplinar',
            'VNI quando CVF <80% ou sintomas',
            'Gastrostomia profilática (CVF >50%)',
            'Fisioterapia respiratória',
            'Comunicação alternativa aumentativa'
          ],
          citations: [{ refId: 'aan-als-practice-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Modificador de doença', medicamentos: ['Riluzol'], posologia: '50mg 2x/dia', observacoes: 'Prolonga sobrevida em 2-3 meses; monitorar função hepática' }
          ],
          segundaLinha: [
            { classe: 'Para espasticidade', medicamentos: ['Baclofeno', 'Tizanidina'], posologia: 'Baclofeno 30-80mg/dia', observacoes: 'Não exagerar (fraqueza)' },
            { classe: 'Para sialorreia', medicamentos: ['Amitriptilina', 'Atropina', 'Toxina botulínica'], posologia: 'Amitriptilina 25-50mg à noite', observacoes: 'Toxina em glândulas salivares se refratário' },
            { classe: 'Para pseudobulbar', medicamentos: ['Dextrometorfano/Quinidina'], posologia: '20/10mg 2x/dia', observacoes: 'Nuedexta - aprovado para afeto pseudobulbar' }
          ],
          citations: [{ refId: 'aan-als-practice-2022' }]
        },
        duracao: 'Contínuo até fase terminal'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 1-3 meses; multidisciplinar',
        examesControle: [
          'ALSFRS-R (escala funcional)',
          'Capacidade vital forçada',
          'Estado nutricional',
          'Avaliação de sintomas'
        ],
        metasTerapeuticas: [
          'Manter funcionalidade o máximo possível',
          'Suporte respiratório adequado',
          'Discussão de diretivas antecipadas'
        ],
        criteriosEncaminhamento: [
          'Centro especializado em ELA',
          'Pneumologia (VNI)',
          'Gastroenterologia (gastrostomia)',
          'Cuidados paliativos desde diagnóstico'
        ],
        citations: [{ refId: 'lancet-neurol-als-2022' }]
      }
    },
    protocolos: ['ela-manejo-multidisciplinar', 'ela-vni'],
    medicamentos: ['riluzol', 'baclofeno', 'amitriptilina'],
    calculadoras: ['alsfrs-r'],
    rastreamentos: [],
    citations: [{ refId: 'aan-als-practice-2022' }, { refId: 'lancet-neurol-als-2022' }],
    lastUpdate: '2025-01',
    tags: ['ELA', 'ALS', 'neuronio-motor', 'neurodegenerativa', 'riluzol']
  }
];
