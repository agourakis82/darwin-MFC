/**
 * DOENCAS CARDIOVASCULARES AVANCADAS - DARWIN-MFC EXPANSAO 800
 * ============================================================
 * Arritmias, cardiopatias congenitas e doencas vasculares
 */

import { Doenca } from '@/lib/types/doenca';

export const cardiovascularesAvancadas: Doenca[] = [
  // ============================================================================
  // ARRITMIAS E CANALOPATIAS
  // ============================================================================
  {
    id: 'sindrome-qt-longo',
    titulo: 'Síndrome do QT Longo',
    sinonimos: ['LQTS', 'Long QT Syndrome', 'Síndrome do QT prolongado'],
    doid: 'DOID:2843',
    snomedCT: '9651007',
    meshId: 'D008133',
    umlsCui: 'C0023976',
    ciap2: ['K80'],
    cid10: ['I45.8'],
    cid11: ['BC81.1'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Canalopatia cardíaca hereditária caracterizada por prolongamento do intervalo QT no ECG, predispondo a torsades de pointes e morte súbita. Tipos 1, 2 e 3 mais comuns (genes KCNQ1, KCNH2, SCN5A).',
      criteriosDiagnosticos: [
        'QTc ≥480ms (Bazett) em ECG de repouso',
        'Score de Schwartz ≥3.5 pontos',
        'Teste genético positivo para mutação patogênica',
        'História de síncope com estresse ou emoção (LQTS1) ou ruídos (LQTS2)',
        'História familiar de morte súbita cardíaca'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar medicamentos que prolongam QT (www.crediblemeds.org)',
          'Evitar esportes competitivos (especialmente natação em LQTS1)',
          'Manter potássio e magnésio normais',
          'Evitar desidratação'
        ],
        farmacologico: [
          'BETABLOQUEADORES: Nadolol 1-2mg/kg/dia (primeira escolha)',
          'Alternativa: Propranolol 2-4mg/kg/dia',
          'Mexiletina (adjuvante em LQTS3)',
          'CDI se síncope recorrente apesar de betabloqueador, ou PCR recuperada'
        ]
      },
      metasTerapeuticas: ['Prevenção de arritmias ventriculares', 'Prevenção de morte súbita', 'QTc <500ms'],
      examesIniciais: ['ECG 12 derivações', 'Holter 24h', 'Teste ergométrico', 'Teste genético', 'ECG familiar'],
      redFlags: ['Síncope recorrente', 'Torsades de pointes documentada', 'QTc >500ms', 'História familiar de morte súbita <40 anos']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:2.000 nascidos vivos',
        mortalidade: 'Risco anual de eventos 0.5-1% com tratamento, 5% sem tratamento',
        faixaEtaria: 'Diagnóstico frequente na infância/adolescência',
        fatoresRisco: ['Mutação genética', 'Uso de medicamentos que prolongam QT', 'Hipocalemia', 'Bradicardia'],
        citations: [{ refId: 'priori-2015-lqts' }]
      },
      fisiopatologia: {
        texto: 'Mutações em canais iônicos cardíacos levam a prolongamento da repolarização ventricular. LQTS1 (KCNQ1, canal IKs), LQTS2 (KCNH2, canal IKr), LQTS3 (SCN5A, canal de sódio).',
        citations: [{ refId: 'priori-2015-lqts' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Síncope (especialmente com exercício ou emoção)', 'Palpitações', 'Convulsões (diagnóstico diferencial)', 'Morte súbita'],
        sinaisExameFisico: ['Exame físico geralmente normal', 'Bradicardia relativa'],
        formasClinicas: ['LQTS1 (gatilho: exercício, natação)', 'LQTS2 (gatilho: sons súbitos, emoção)', 'LQTS3 (eventos durante repouso/sono)'],
        citations: [{ refId: 'priori-2015-lqts' }]
      },
      diagnostico: {
        criterios: ['Score de Schwartz ≥3.5 pontos', 'QTc ≥480ms em ECG de repouso', 'Teste genético positivo para mutação patogênica'],
        diagnosticoDiferencial: ['Epilepsia', 'Síncope vasovagal', 'Síndrome de Brugada', 'CPVT'],
        examesLaboratoriais: ['Potássio', 'Magnésio', 'Cálcio', 'Teste genético de canalopatias'],
        outrosExames: ['ECG', 'Holter 24h', 'Teste ergométrico'],
        citations: [{ refId: 'priori-2015-lqts' }]
      },
      tratamento: {
        objetivos: ['Prevenir torsades de pointes', 'Prevenir morte súbita'],
        naoFarmacologico: {
          medidas: ['Evitar medicamentos que prolongam QT', 'Evitar exercício intenso (LQTS1)', 'Manter eletrólitos normais'],
          citations: [{ refId: 'priori-2015-lqts' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Betabloqueadores', medicamentos: ['Nadolol', 'Propranolol'], posologia: 'Nadolol 1-2mg/kg/dia ou Propranolol 2-4mg/kg/dia', observacoes: 'Nadolol preferido por meia-vida longa' }
          ],
          segundaLinha: [
            { classe: 'Bloqueadores de canal de sódio', medicamentos: ['Mexiletina'], posologia: '200-300mg 8/8h', observacoes: 'Adjuvante especialmente em LQTS3' }
          ],
          situacoesEspeciais: [
            { situacao: 'PCR recuperada ou síncope recorrente', conduta: 'CDI + betabloqueador' },
            { situacao: 'Refratário a medicamentos', conduta: 'Denervação simpática cardíaca esquerda' }
          ],
          citations: [{ refId: 'priori-2015-lqts' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'ECG e avaliação clínica a cada 6-12 meses',
        examesControle: ['ECG seriado', 'Holter anual', 'Avaliação de adesão ao betabloqueador'],
        metasTerapeuticas: ['QTc <500ms', 'Ausência de síncope', 'Boa tolerância ao betabloqueador'],
        criteriosEncaminhamento: ['Todos: especialista em arritmias', 'Síncope recorrente: eletrofisiologista', 'Gestação: alto risco obstétrico'],
        citations: [{ refId: 'priori-2015-lqts' }]
      },
      prevencao: {
        primaria: ['Teste genético em familiares de 1º grau', 'Aconselhamento genético'],
        secundaria: ['Betabloqueadores contínuos', 'Evitar gatilhos específicos do genótipo'],
        citations: [{ refId: 'priori-2015-lqts' }]
      }
    },
    protocolos: [],
    medicamentos: ['nadolol', 'propranolol', 'mexiletina'],
    calculadoras: ['qtc-bazett'],
    rastreamentos: [],
    citations: [{ refId: 'priori-2015-lqts' }],
    lastUpdate: '2026-01',
    tags: ['arritmia', 'canalopatia', 'morte-subita', 'genetico', 'cardiologia']
  },
  {
    id: 'sindrome-brugada',
    titulo: 'Síndrome de Brugada',
    sinonimos: ['BrS', 'Brugada Syndrome'],
    doid: 'DOID:0050451',
    snomedCT: '418818005',
    meshId: 'D053840',
    umlsCui: 'C1142166',
    ciap2: ['K80'],
    cid10: ['I49.8'],
    cid11: ['BC81.2'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Canalopatia cardíaca caracterizada por padrão ECG tipo 1 (elevação ST coved ≥2mm em V1-V3) e risco de fibrilação ventricular e morte súbita, principalmente durante repouso/sono.',
      criteriosDiagnosticos: [
        'Padrão ECG tipo 1 espontâneo ou induzido (ajmalina/flecainida)',
        'Elevação ST coved ≥2mm em V1-V3',
        'Arritmia ventricular documentada ou síncope inexplicada',
        'História familiar de morte súbita <45 anos'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar febre (antitérmicos agressivos)', 'Evitar álcool em excesso', 'Evitar medicamentos da lista Brugada'],
        farmacologico: ['CDI para pacientes de alto risco', 'Quinidina (profilaxia de choques em portadores de CDI)', 'Isoproterenol IV para tempestade arrítmica']
      },
      metasTerapeuticas: ['Prevenção de morte súbita', 'Identificação de familiares em risco'],
      examesIniciais: ['ECG 12 derivações (derivações altas V1-V3)', 'Teste farmacológico se padrão não tipo 1', 'Teste genético (SCN5A)'],
      redFlags: ['PCR recuperada', 'Síncope recorrente', 'Padrão tipo 1 espontâneo', 'História familiar de morte súbita']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-5/10.000 (mais comum no Sudeste Asiático)',
        mortalidade: 'Risco de morte súbita 0.5-1%/ano em assintomáticos',
        faixaEtaria: 'Eventos principalmente em homens 30-50 anos',
        fatoresRisco: ['Sexo masculino (8:1)', 'Febre', 'Drogas bloqueadoras de canal de sódio'],
        citations: [{ refId: 'priori-2015-brugada' }]
      },
      fisiopatologia: {
        texto: 'Mutações no gene SCN5A (20% dos casos) causam perda de função do canal de sódio. Heterogeneidade de repolarização no ventrículo direito cria substrato para reentrada.',
        citations: [{ refId: 'priori-2015-brugada' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Síncope (especialmente durante repouso/sono)', 'Palpitações', 'Respiração agônica noturna', 'Morte súbita'],
        sinaisExameFisico: ['Exame físico normal'],
        formasClinicas: ['Sintomática (síncope/PCR)', 'Assintomática com padrão tipo 1', 'Padrão induzido apenas'],
        citations: [{ refId: 'priori-2015-brugada' }]
      },
      diagnostico: {
        criterios: ['Padrão ECG tipo 1 espontâneo', 'Padrão tipo 1 induzido por teste farmacológico (ajmalina/flecainida)'],
        diagnosticoDiferencial: ['LQTS', 'CPVT', 'Displasia arritmogênica de VD', 'Repolarização precoce'],
        outrosExames: ['ECG com derivações altas (V1-V3 no 2º/3º EIC)', 'Teste com ajmalina/flecainida', 'EEF em casos selecionados'],
        citations: [{ refId: 'priori-2015-brugada' }]
      },
      tratamento: {
        objetivos: ['Prevenir morte súbita', 'Identificar e tratar gatilhos'],
        naoFarmacologico: {
          medidas: ['Evitar gatilhos (febre, álcool)', 'Lista de medicamentos a evitar (brugadadrugs.org)', 'Educação do paciente e família'],
          citations: [{ refId: 'priori-2015-brugada' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Dispositivo implantável', medicamentos: ['CDI'], posologia: 'Implante cirúrgico', observacoes: 'Indicado em PCR recuperada ou síncope com padrão tipo 1' }
          ],
          segundaLinha: [
            { classe: 'Antiarrítmico', medicamentos: ['Quinidina'], posologia: '300-600mg/dia', observacoes: 'Para reduzir choques em portadores de CDI' }
          ],
          situacoesEspeciais: [
            { situacao: 'Tempestade arrítmica', conduta: 'Isoproterenol IV' },
            { situacao: 'Arritmias recorrentes com CDI', conduta: 'Ablação epicárdica de RVOT' }
          ],
          citations: [{ refId: 'priori-2015-brugada' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Anual ou semestral para portadores de CDI',
        examesControle: ['ECG seriado', 'Interrogação de CDI'],
        metasTerapeuticas: ['Ausência de arritmias', 'Bom funcionamento do CDI', 'Evitar gatilhos'],
        criteriosEncaminhamento: ['Todos: eletrofisiologista', 'Síncope recorrente: centro especializado', 'Familiares: teste genético e ECG'],
        citations: [{ refId: 'priori-2015-brugada' }]
      },
      prevencao: {
        primaria: ['Teste genético familiar', 'ECG em familiares de 1º grau'],
        secundaria: ['CDI em pacientes de alto risco', 'Evitar medicamentos e gatilhos'],
        citations: [{ refId: 'priori-2015-brugada' }]
      }
    },
    protocolos: [],
    medicamentos: ['quinidina', 'isoproterenol'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'priori-2015-brugada' }],
    lastUpdate: '2026-01',
    tags: ['arritmia', 'canalopatia', 'morte-subita', 'genetico']
  },
  {
    id: 'doenca-arterial-periferica',
    titulo: 'Doença Arterial Periférica',
    sinonimos: ['DAP', 'DAOP', 'Claudicação intermitente', 'Peripheral Arterial Disease'],
    doid: 'DOID:0050830',
    snomedCT: '399957001',
    meshId: 'D058729',
    umlsCui: 'C0085096',
    ciap2: ['K92'],
    cid10: ['I73.9', 'I70.2'],
    cid11: ['BD40'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Doença aterosclerótica das artérias periféricas, mais comum em membros inferiores. Manifesta-se como claudicação intermitente ou isquemia crítica. Marcador de doença aterosclerótica sistêmica.',
      criteriosDiagnosticos: [
        'Claudicação intermitente (dor em panturrilha que piora com exercício e alivia com repouso)',
        'Índice tornozelo-braquial (ITB) ≤0.90',
        'Ausência de pulsos periféricos',
        'Isquemia crítica: dor de repouso, úlceras isquêmicas, gangrena'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cessação do tabagismo', 'Exercício supervisionado (caminhada 30-45min, 3x/semana)', 'Controle de PA, DM, dislipidemia'],
        farmacologico: ['AAS 100mg/dia ou Clopidogrel 75mg/dia', 'Estatina de alta potência', 'Cilostazol 100mg 12/12h (melhora claudicação)', 'IECA se hipertensão']
      },
      metasTerapeuticas: ['Melhora da distância de claudicação', 'Prevenção de eventos CV', 'Evitar amputação'],
      examesIniciais: ['ITB', 'Doppler arterial de MMII', 'Glicemia, HbA1c, perfil lipídico', 'Função renal'],
      redFlags: ['Dor de repouso', 'Úlcera que não cicatriza', 'Gangrena', 'ITB ≤0.40', 'Isquemia crítica']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '12-20% em >65 anos',
        mortalidade: 'Mortalidade CV 5 anos: 30%',
        faixaEtaria: '>50 anos, aumenta com idade',
        fatoresRisco: ['Tabagismo (fator mais importante)', 'Diabetes mellitus', 'Hipertensão', 'Dislipidemia', 'Idade avançada'],
        citations: [{ refId: 'aboyans-2017-dap' }]
      },
      fisiopatologia: {
        texto: 'Aterosclerose das artérias de membros inferiores causa estenose progressiva. Claudicação ocorre por desbalanço oferta/demanda de O2 muscular durante exercício.',
        citations: [{ refId: 'aboyans-2017-dap' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Claudicação intermitente', 'Dor de repouso (isquemia crítica)', 'Úlceras arteriais', 'Frialdade de extremidades'],
        sinaisExameFisico: ['Pulsos diminuídos ou ausentes', 'Sopros arteriais', 'Palidez à elevação', 'Rubor pendente', 'Rarefação de pelos'],
        formasClinicas: ['Assintomática (ITB anormal)', 'Claudicação intermitente', 'Isquemia crítica', 'Isquemia aguda'],
        citations: [{ refId: 'aboyans-2017-dap' }]
      },
      diagnostico: {
        criterios: ['ITB ≤0.90 (diagnóstico)', 'ITB 0.91-0.99 (limítrofe)', 'ITB >1.40 (artérias não compressíveis - DM)'],
        diagnosticoDiferencial: ['Estenose espinhal (pseudoclaudicação)', 'Neuropatia diabética', 'Osteoartrite', 'TVP crônica'],
        examesLaboratoriais: ['Glicemia', 'HbA1c', 'Perfil lipídico', 'Creatinina'],
        examesImagem: ['Doppler arterial de MMII', 'Angiotomografia', 'Arteriografia (pré-intervenção)'],
        citations: [{ refId: 'aboyans-2017-dap' }]
      },
      tratamento: {
        objetivos: ['Melhora de sintomas', 'Prevenção de eventos CV', 'Salvamento de membro'],
        naoFarmacologico: {
          medidas: ['Cessação tabágica (essencial)', 'Exercício supervisionado 3x/semana', 'Cuidados com os pés', 'Controle de comorbidades'],
          citations: [{ refId: 'aboyans-2017-dap' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antiagregante', medicamentos: ['AAS', 'Clopidogrel'], posologia: 'AAS 100mg/dia ou Clopidogrel 75mg/dia', observacoes: 'Reduz eventos CV' },
            { classe: 'Estatina', medicamentos: ['Atorvastatina', 'Rosuvastatina'], posologia: 'Atorvastatina 40-80mg/dia', observacoes: 'Meta: LDL <70mg/dL' },
            { classe: 'Vasodilatador', medicamentos: ['Cilostazol'], posologia: '100mg 12/12h', observacoes: 'Melhora claudicação; CI em IC' }
          ],
          segundaLinha: [
            { classe: 'Revascularização', medicamentos: ['Angioplastia', 'Bypass'], observacoes: 'Para isquemia crítica ou claudicação limitante refratária' }
          ],
          situacoesEspeciais: [
            { situacao: 'Isquemia crítica', conduta: 'Revascularização urgente + anticoagulação' },
            { situacao: 'Infecção de úlcera', conduta: 'Antibioticoterapia + debridamento' }
          ],
          citations: [{ refId: 'aboyans-2017-dap' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Semestral a anual conforme gravidade',
        examesControle: ['ITB seriado', 'Doppler de controle', 'Avaliação de feridas'],
        metasTerapeuticas: ['ITB estável', 'Melhora da distância de marcha', 'Cicatrização de úlceras'],
        criteriosEncaminhamento: ['Cirurgia vascular: isquemia crítica, claudicação limitante', 'Endovascular: candidato a angioplastia', 'Ortopedia/podiatria: cuidados com pé'],
        citations: [{ refId: 'aboyans-2017-dap' }]
      },
      prevencao: {
        primaria: ['Cessação tabágica', 'Controle de fatores de risco CV', 'Atividade física regular'],
        secundaria: ['Antiagregação plaquetária', 'Estatinas', 'Controle rigoroso de DM e HAS'],
        citations: [{ refId: 'aboyans-2017-dap' }]
      }
    },
    protocolos: ['protocolo-dap'],
    medicamentos: ['aas', 'clopidogrel', 'cilostazol', 'atorvastatina'],
    calculadoras: ['itb-ankle-brachial'],
    rastreamentos: [],
    citations: [{ refId: 'aboyans-2017-dap' }],
    lastUpdate: '2026-01',
    tags: ['vascular', 'aterosclerose', 'claudicacao', 'amputacao']
  },
  {
    id: 'tetralogia-fallot',
    titulo: 'Tetralogia de Fallot',
    sinonimos: ['TOF', 'Tetralogy of Fallot', 'Fallot'],
    doid: 'DOID:13533',
    snomedCT: '86299006',
    meshId: 'D013771',
    umlsCui: 'C0039685',
    ciap2: ['K73'],
    cid10: ['Q21.3'],
    cid11: ['LA8B.20'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Cardiopatia congênita cianótica mais comum após 1 ano. Composta por 4 defeitos: CIV, estenose pulmonar, dextroposição da aorta e hipertrofia de VD. Causa shunt D→E com cianose.',
      criteriosDiagnosticos: [
        'Cianose central (lábios, leitos ungueais)',
        'Sopro sistólico ejetivo em borda esternal esquerda alta',
        'Crises hipercianóticas (tet spells)',
        'Baqueteamento digital (crônico)',
        'Ecocardiograma mostrando os 4 componentes'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Posição de cócoras durante crise (aumenta RVS)', 'Suplementação de ferro', 'Evitar desidratação'],
        farmacologico: ['Crise hipercianótica: O2, morfina, fenilefrina', 'Propranolol para prevenir crises (0,5-1mg/kg 6/6h)', 'Prostaglandina E1 em neonatos (manter canal arterial)']
      },
      metasTerapeuticas: ['Correção cirúrgica total', 'Prevenção de crises hipercianóticas', 'SatO2 >80%'],
      examesIniciais: ['Ecocardiograma', 'ECG', 'Radiografia de tórax', 'Oximetria', 'Cateterismo cardíaco pré-operatório'],
      redFlags: ['Crise hipercianótica', 'SatO2 <70%', 'Policitemia severa (Hct >65%)', 'Abscesso cerebral', 'AVC']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '3-5/10.000 nascidos vivos',
        mortalidade: 'Sem tratamento: 50% óbito no 1º ano; Com correção: sobrevida >90% em 25 anos',
        faixaEtaria: 'Diagnóstico neonatal ou lactente',
        fatoresRisco: ['Deleção 22q11 (síndrome de DiGeorge)', 'Diabetes materno', 'Rubéola congênita'],
        citations: [{ refId: 'stout-2019-tof' }]
      },
      fisiopatologia: {
        texto: 'Desvio anterior do septo infundibular causa os 4 defeitos. A gravidade depende do grau de estenose pulmonar. Shunt D→E através da CIV causa cianose.',
        citations: [{ refId: 'stout-2019-tof' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Cianose', 'Dispneia', 'Crises hipercianóticas', 'Baixo ganho ponderal', 'Posição de cócoras (squatting)'],
        sinaisExameFisico: ['Cianose central', 'Baqueteamento digital', 'Sopro sistólico ejetivo', 'B2 única'],
        formasClinicas: ['Pink tet (estenose pulmonar leve)', 'TOF clássica', 'TOF com atresia pulmonar'],
        citations: [{ refId: 'stout-2019-tof' }]
      },
      diagnostico: {
        criterios: ['Ecocardiograma mostrando CIV + estenose pulmonar + aorta cavalgando + hipertrofia VD', 'RX tórax: coração em bota', 'ECG: desvio do eixo para direita'],
        diagnosticoDiferencial: ['Transposição de grandes artérias', 'Truncus arteriosus', 'Atresia tricúspide', 'DVSVD'],
        examesImagem: ['Ecocardiograma', 'Cateterismo cardíaco', 'RM cardíaca'],
        outrosExames: ['Teste genético 22q11', 'Gasometria'],
        citations: [{ refId: 'stout-2019-tof' }]
      },
      tratamento: {
        objetivos: ['Correção cirúrgica definitiva', 'Manter oxigenação adequada', 'Prevenir crises hipercianóticas'],
        naoFarmacologico: {
          medidas: ['Posição de cócoras na crise', 'Hidratação adequada', 'Evitar esforço excessivo antes da correção'],
          citations: [{ refId: 'stout-2019-tof' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Betabloqueador', medicamentos: ['Propranolol'], posologia: '0,5-1mg/kg 6/6h', observacoes: 'Profilaxia de crises hipercianóticas' },
            { classe: 'Prostaglandina', medicamentos: ['Prostaglandina E1'], posologia: '0,05-0,1mcg/kg/min IV', observacoes: 'Neonato - manter canal arterial' }
          ],
          segundaLinha: [
            { classe: 'Correção cirúrgica', medicamentos: ['Cirurgia de correção total'], observacoes: 'Eletiva entre 3-6 meses de idade' }
          ],
          situacoesEspeciais: [
            { situacao: 'Crise hipercianótica aguda', conduta: 'O2 + posição genupeitoral + morfina 0,1mg/kg + fenilefrina' },
            { situacao: 'Correção não possível', conduta: 'Shunt Blalock-Taussig paliativo' }
          ],
          citations: [{ refId: 'stout-2019-tof' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Seguimento cardiológico vitalício',
        examesControle: ['Ecocardiograma anual', 'RM cardíaca periódica', 'ECG', 'Holter'],
        metasTerapeuticas: ['Boa função de VD', 'Ausência de arritmias', 'Ausência de insuficiência pulmonar significativa'],
        criteriosEncaminhamento: ['Todos: cardiologia pediátrica/congênita', 'Adultos operados: GUCH specialist', 'Arritmias: eletrofisiologista'],
        citations: [{ refId: 'stout-2019-tof' }]
      },
      prevencao: {
        primaria: ['Ácido fólico pré-concepcional', 'Controle glicêmico materno', 'Evitar teratógenos'],
        secundaria: ['Profilaxia de endocardite em casos selecionados', 'Acompanhamento regular pós-operatório'],
        citations: [{ refId: 'stout-2019-tof' }]
      }
    },
    protocolos: ['protocolo-cardiopatia-congenita'],
    medicamentos: ['propranolol', 'prostaglandina-e1'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'stout-2019-tof' }],
    lastUpdate: '2026-01',
    tags: ['congenito', 'cianose', 'pediatria', 'cirurgia-cardiaca']
  },
  {
    id: 'tromboembolismo-venoso',
    titulo: 'Tromboembolismo Venoso',
    sinonimos: ['TEV', 'TVP', 'TEP', 'VTE', 'Trombose venosa profunda', 'Embolia pulmonar'],
    doid: 'DOID:0060903',
    snomedCT: '111293003',
    meshId: 'D054556',
    umlsCui: 'C1861172',
    ciap2: ['K93', 'K94'],
    cid10: ['I26', 'I80', 'I82'],
    cid11: ['BB00', 'BD72'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Espectro de doença que inclui TVP e TEP. TVP é trombose em veias profundas de MMII. TEP é obstrução de artérias pulmonares por êmbolos, geralmente originados de TVP.',
      criteriosDiagnosticos: [
        'TVP: Edema unilateral + dor + empastamento de panturrilha',
        'TEP: Dispneia súbita + dor torácica pleurítica + taquicardia',
        'D-dímero elevado (alta sensibilidade, baixa especificidade)',
        'USG venoso com compressão (TVP)',
        'Angiotomografia de tórax (TEP)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Deambulação precoce', 'Meia elástica de compressão (prevenção de SPT)'],
        farmacologico: ['DOAC (primeira escolha): Rivaroxabana 15mg 12/12h 21 dias, depois 20mg/dia', 'Apixabana 10mg 12/12h 7 dias, depois 5mg 12/12h', 'Alternativa: Varfarina (INR 2-3) com ponte de HBPM']
      },
      metasTerapeuticas: ['Prevenir extensão do trombo', 'Prevenir TEP fatal', 'Prevenir recorrência', 'Evitar síndrome pós-trombótica'],
      examesIniciais: ['D-dímero', 'USG venoso de MMII', 'Angiotomografia de tórax', 'ECG', 'Troponina, BNP (estratificação TEP)'],
      redFlags: ['TEP maciço (hipotensão, choque)', 'TEP de alto risco (disfunção VD)', 'TVP proximal ilíaco-femoral', 'Trombofilia conhecida', 'TEV recorrente']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-2/1.000 pessoas/ano',
        mortalidade: 'TEP: 10-30% se não tratado, 2-8% se tratado',
        faixaEtaria: 'Aumenta exponencialmente com idade',
        fatoresRisco: ['Imobilização', 'Cirurgia recente', 'Câncer', 'Trombofilia', 'Gravidez/puerpério', 'ACO', 'Obesidade'],
        citations: [{ refId: 'konstantinides-2020-tep' }]
      },
      fisiopatologia: {
        texto: 'Tríade de Virchow: estase venosa, lesão endotelial, hipercoagulabilidade. Trombos se formam em veias profundas e podem embolizar para circulação pulmonar.',
        citations: [{ refId: 'konstantinides-2020-tep' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['TVP: edema, dor, empastamento', 'TEP: dispneia, dor pleurítica, hemoptise, síncope'],
        sinaisExameFisico: ['TVP: sinal de Homans, edema assimétrico', 'TEP: taquicardia, taquipneia, hipoxemia'],
        formasClinicas: ['TVP distal', 'TVP proximal', 'TEP de baixo risco', 'TEP de risco intermediário', 'TEP de alto risco'],
        citations: [{ refId: 'konstantinides-2020-tep' }]
      },
      diagnostico: {
        criterios: ['Score de Wells para TVP/TEP', 'D-dímero negativo + baixa probabilidade = exclui', 'USG venoso positivo = confirma TVP', 'Angiotomo positivo = confirma TEP'],
        diagnosticoDiferencial: ['Celulite', 'Ruptura de cisto de Baker', 'Insuficiência cardíaca', 'Pneumonia', 'IAM', 'Pericardite'],
        examesLaboratoriais: ['D-dímero', 'Troponina', 'BNP', 'Gasometria'],
        examesImagem: ['USG venoso de MMII', 'Angiotomografia de tórax', 'Cintilografia V/Q'],
        citations: [{ refId: 'konstantinides-2020-tep' }]
      },
      tratamento: {
        objetivos: ['Anticoagulação eficaz', 'Prevenir morte por TEP', 'Prevenir recorrência'],
        naoFarmacologico: {
          medidas: ['Deambulação precoce', 'Compressão elástica graduada', 'Evitar imobilização prolongada'],
          citations: [{ refId: 'konstantinides-2020-tep' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'DOAC', medicamentos: ['Rivaroxabana', 'Apixabana', 'Edoxabana'], posologia: 'Rivaroxabana 15mg 12/12h por 21 dias, depois 20mg/dia', observacoes: 'Primeira escolha; evitar se ClCr <30' },
            { classe: 'Anticoagulante oral', medicamentos: ['Varfarina'], posologia: 'INR alvo 2-3', observacoes: 'Requer ponte com HBPM 5 dias' }
          ],
          segundaLinha: [
            { classe: 'Trombolítico', medicamentos: ['Alteplase'], posologia: '100mg IV em 2h', observacoes: 'TEP de alto risco com instabilidade' }
          ],
          situacoesEspeciais: [
            { situacao: 'TEP maciço com choque', conduta: 'Trombólise sistêmica ou embolectomia' },
            { situacao: 'Contraindicação a anticoagulação', conduta: 'Filtro de veia cava inferior' },
            { situacao: 'Câncer ativo', conduta: 'DOAC ou HBPM preferencial' }
          ],
          citations: [{ refId: 'konstantinides-2020-tep' }]
        },
        duracao: '3-6 meses (provocado); indefinido (não provocado/recorrente)'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal no início, depois trimestral',
        examesControle: ['INR semanal se varfarina', 'D-dímero após suspensão', 'Função renal se DOAC'],
        metasTerapeuticas: ['INR 2-3 se varfarina', 'Ausência de sangramento', 'Ausência de recorrência'],
        criteriosEncaminhamento: ['Hematologia: trombofilia, TEV recorrente', 'Cirurgia vascular: síndrome pós-trombótica grave', 'Pneumologia: hipertensão pulmonar tromboembólica crônica'],
        citations: [{ refId: 'konstantinides-2020-tep' }]
      },
      prevencao: {
        primaria: ['Profilaxia farmacológica em hospitalizados de risco', 'Meias elásticas', 'Deambulação precoce pós-operatória'],
        secundaria: ['Anticoagulação prolongada em alto risco de recorrência', 'Investigação de trombofilia em casos selecionados'],
        citations: [{ refId: 'konstantinides-2020-tep' }]
      }
    },
    protocolos: ['protocolo-tev', 'protocolo-anticoagulacao'],
    medicamentos: ['rivaroxabana', 'apixabana', 'edoxabana', 'varfarina', 'enoxaparina'],
    calculadoras: ['wells-tvp', 'wells-tep', 'pesi'],
    rastreamentos: [],
    citations: [{ refId: 'konstantinides-2020-tep' }],
    lastUpdate: '2026-01',
    tags: ['trombose', 'embolia', 'anticoagulacao', 'urgencia']
  }
];
