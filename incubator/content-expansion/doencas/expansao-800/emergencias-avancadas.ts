/**
 * EMERGENCIAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * ================================================
 * Emergencias medicas criticas para manejo inicial
 *
 * Ontologias: DOID, SNOMED-CT, MeSH, CID-10, CIAP-2
 */

import { Doenca } from '@/lib/types/doenca';

export const emergenciasAvancadas: Doenca[] = [
  // ============================================================================
  // CHOQUE SEPTICO
  // ============================================================================
  {
    id: 'choque-septico',
    titulo: 'Choque Septico',
    sinonimos: ['Septic shock', 'Choque septicemico'],
    doid: 'DOID:0080356',
    snomedCT: '76571007',
    meshId: 'D012772',
    ciap2: ['A78'],
    cid10: ['R65.1', 'A41.9'],
    categoria: 'outros',
    quickView: {
      definicao: 'Disfuncao circulatoria secundaria a sepse com hipotensao persistente apesar de ressuscitacao volemica adequada, requerendo vasopressores e lactato >2mmol/L.',
      criteriosDiagnosticos: [
        'Sepse com hipotensao refrataria a volume',
        'Necessidade de vasopressor para PAM >=65mmHg',
        'Lactato >2mmol/L apos ressuscitacao',
        'SOFA >=2 pontos'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Acesso venoso central', 'Monitorizacao invasiva', 'Cateter vesical'],
        farmacologico: ['SF 0.9% 30mL/kg em 1-3h', 'Noradrenalina 0.1-0.5mcg/kg/min', 'ATB amplo espectro em 1h', 'Hidrocortisona 200mg/dia se refratario']
      },
      metasTerapeuticas: ['PAM >=65mmHg', 'Debito urinario >0.5mL/kg/h', 'Lactato em queda'],
      examesIniciais: ['Hemoculturas', 'Lactato', 'Gasometria', 'Hemograma', 'PCR', 'Procalcitonina'],
      redFlags: ['Hipotensao refrataria', 'Lactato >4mmol/L', 'Multiplas disfuncoes organicas']
    },
    fullContent: {
      epidemiologia: {
        mortalidade: '40-50% hospitalar',
        fatoresRisco: ['Imunossupressao', 'Idade avancada', 'Comorbidades', 'Dispositivos invasivos'],
        citations: [{ refId: 'ssc-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Hipotensao', 'Taquicardia', 'Alteracao consciencia', 'Oliguria'],
        sinaisExameFisico: ['Pele moteada', 'Extremidades frias', 'TEC prolongado'],
        citations: [{ refId: 'ssc-2021' }]
      },
      diagnostico: {
        criterios: ['Sepse + hipotensao refrataria + lactato >2', 'Necessidade de vasopressor'],
        diagnosticoDiferencial: ['Choque cardiogenico', 'Choque hipovolemico', 'Anafilaxia'],
        citations: [{ refId: 'ssc-2021' }]
      },
      tratamento: {
        objetivos: ['Restaurar perfusao', 'Controle do foco', 'Suporte organico'],
        naoFarmacologico: {
          medidas: ['Monitorizacao intensiva', 'Controle de foco infeccioso', 'Ventilacao protetora se necessario'],
          citations: [{ refId: 'ssc-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Cristaloide', medicamentos: ['SF 0.9%', 'Ringer lactato'], posologia: '30mL/kg em 1-3h' },
            { classe: 'Vasopressor', medicamentos: ['Noradrenalina'], posologia: '0.1-2mcg/kg/min', observacoes: 'Primeira escolha' },
            { classe: 'Antibiotico', medicamentos: ['Piperacilina-tazobactam', 'Meropenem'], posologia: 'Dose maxima', observacoes: 'Em 1h do diagnostico' }
          ],
          citations: [{ refId: 'ssc-2021' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'UTI ate estabilizacao',
        metasTerapeuticas: ['PAM >=65', 'Lactato normalizado', 'Desmame de vasopressor'],
        criteriosEncaminhamento: ['UTI obrigatorio'],
        citations: [{ refId: 'ssc-2021' }]
      },
      prevencao: {
        primaria: ['Vacinacao', 'Higiene adequada'],
        secundaria: ['Reconhecimento precoce de sepse'],
        citations: [{ refId: 'ssc-2021' }]
      }
    },
    protocolos: ['protocolo-sepse'],
    medicamentos: ['noradrenalina', 'meropenem'],
    calculadoras: ['sofa-score', 'qsofa'],
    citations: [{ refId: 'ssc-2021' }],
    lastUpdate: '2026-01',
    tags: ['emergencia', 'sepse', 'choque', 'uti']
  },

  // ============================================================================
  // CHOQUE CARDIOGENICO
  // ============================================================================
  {
    id: 'choque-cardiogenico',
    titulo: 'Choque Cardiogenico',
    sinonimos: ['Cardiogenic shock'],
    doid: 'DOID:0050700',
    snomedCT: '89138009',
    meshId: 'D012770',
    ciap2: ['K77'],
    cid10: ['R57.0'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Falencia de bomba cardiaca com hipoperfusao tecidual. PAS <90mmHg por >30min com sinais de congestao e baixo debito cardiaco. Principal causa: IAM.',
      criteriosDiagnosticos: [
        'PAS <90mmHg por >30min ou necessidade de vasopressor',
        'Indice cardiaco <2.2 L/min/m2',
        'Pressao capilar pulmonar >15mmHg',
        'Sinais de hipoperfusao (extremidades frias, oliguria, confusao)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Monitorizacao invasiva', 'Eco beira-leito', 'Acesso central'],
        farmacologico: ['Dobutamina 2-20mcg/kg/min', 'Noradrenalina se PAS muito baixa', 'Diuretico se congestao', 'Revascularizacao urgente se IAM']
      },
      metasTerapeuticas: ['PAM >=65mmHg', 'Indice cardiaco >2.2', 'Melhora perfusao'],
      examesIniciais: ['ECG', 'Troponina', 'BNP', 'Ecocardiograma', 'Lactato', 'Gasometria'],
      redFlags: ['Arritmia maligna', 'Complicacao mecanica de IAM', 'FEVE <20%']
    },
    fullContent: {
      epidemiologia: {
        mortalidade: '40-50% hospitalar',
        fatoresRisco: ['IAM extenso', 'IAM previo', 'Idade avancada', 'Diabetes'],
        citations: [{ refId: 'esc-cardiogenic-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dispneia intensa', 'Hipotensao', 'Confusao mental', 'Oliguria'],
        sinaisExameFisico: ['Extremidades frias', 'Estertores pulmonares', 'B3', 'Turgencia jugular'],
        citations: [{ refId: 'esc-cardiogenic-2021' }]
      },
      diagnostico: {
        criterios: ['Hipotensao + baixo debito + congestao', 'Eco com FEVE reduzida'],
        diagnosticoDiferencial: ['TEP macico', 'Tamponamento', 'Choque septico'],
        citations: [{ refId: 'esc-cardiogenic-2021' }]
      },
      tratamento: {
        objetivos: ['Restaurar perfusao', 'Revascularizar se IAM', 'Suporte mecanico se necessario'],
        naoFarmacologico: {
          medidas: ['BIA se disponivel', 'ECMO em casos refratarios', 'Cateterismo urgente se IAM'],
          citations: [{ refId: 'esc-cardiogenic-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inotropico', medicamentos: ['Dobutamina'], posologia: '2-20mcg/kg/min' },
            { classe: 'Vasopressor', medicamentos: ['Noradrenalina'], posologia: '0.1-0.5mcg/kg/min', observacoes: 'Se PAS <70mmHg' }
          ],
          citations: [{ refId: 'esc-cardiogenic-2021' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'UTI coronariana',
        metasTerapeuticas: ['Estabilizacao hemodinamica', 'Desmame de inotropicos'],
        criteriosEncaminhamento: ['Centro com hemodinamica', 'Suporte mecanico circulatorio'],
        citations: [{ refId: 'esc-cardiogenic-2021' }]
      },
      prevencao: {
        primaria: ['Prevencao de IAM', 'Controle de fatores de risco CV'],
        secundaria: ['Reperfusao precoce no IAM'],
        citations: [{ refId: 'esc-cardiogenic-2021' }]
      }
    },
    protocolos: ['protocolo-choque-cardiogenico'],
    medicamentos: ['dobutamina', 'noradrenalina'],
    calculadoras: ['scai-shock'],
    citations: [{ refId: 'esc-cardiogenic-2021' }],
    lastUpdate: '2026-01',
    tags: ['emergencia', 'cardiologia', 'choque', 'iam']
  },

  // ============================================================================
  // CHOQUE HIPOVOLEMICO
  // ============================================================================
  {
    id: 'choque-hipovolemico',
    titulo: 'Choque Hipovolemico',
    sinonimos: ['Hypovolemic shock', 'Choque hemorragico'],
    doid: 'DOID:0080014',
    snomedCT: '39419009',
    meshId: 'D012769',
    ciap2: ['K99'],
    cid10: ['R57.1'],
    categoria: 'outros',
    quickView: {
      definicao: 'Choque por perda de volume intravascular (hemorragia ou desidratacao) com hipoperfusao tecidual. Classificacao em 4 graus conforme perda estimada.',
      criteriosDiagnosticos: [
        'Hipotensao + taquicardia',
        'Sinais de hipoperfusao (TEC >2s, pele fria)',
        'Historia de perda volemica (hemorragia, diarreia, queimaduras)',
        'Classe I: <15%, II: 15-30%, III: 30-40%, IV: >40%'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Controle de sangramento', 'Acessos venosos calibrosos', 'Aquecimento'],
        farmacologico: ['Cristaloide 1-2L em bolus', 'Hemoderivados se hemorragico (protocolo 1:1:1)', 'Acido tranexamico 1g se trauma']
      },
      metasTerapeuticas: ['PAM >=65mmHg', 'Hb >7g/dL (>8 se cardiopata)', 'Debito urinario >0.5mL/kg/h'],
      examesIniciais: ['Hemograma', 'Tipagem sanguinea', 'Lactato', 'Gasometria', 'Coagulograma'],
      redFlags: ['Classe IV', 'Coagulopatia', 'Hipotermia', 'Acidose']
    },
    fullContent: {
      epidemiologia: {
        mortalidade: '20-50% dependendo da causa e gravidade',
        fatoresRisco: ['Trauma', 'Hemorragia digestiva', 'Rotura de aneurisma', 'Desidratacao grave'],
        citations: [{ refId: 'atls-2018' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Sede intensa', 'Tontura', 'Confusao', 'Oliguria'],
        sinaisExameFisico: ['Taquicardia', 'Hipotensao', 'Pele fria e palida', 'Pulsos finos'],
        citations: [{ refId: 'atls-2018' }]
      },
      diagnostico: {
        criterios: ['Historia + sinais de hipoperfusao + resposta a volume'],
        diagnosticoDiferencial: ['Choque cardiogenico', 'Choque septico', 'Choque neurogenico'],
        citations: [{ refId: 'atls-2018' }]
      },
      tratamento: {
        objetivos: ['Controlar sangramento', 'Repor volume', 'Corrigir coagulopatia'],
        naoFarmacologico: {
          medidas: ['Compressao de feridas', 'Torniquete se necessario', 'Cirurgia de controle de danos'],
          citations: [{ refId: 'atls-2018' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Cristaloide', medicamentos: ['SF 0.9%', 'Ringer lactato'], posologia: '1-2L em bolus inicial' },
            { classe: 'Hemoderivados', medicamentos: ['CH', 'PFC', 'Plaquetas'], posologia: 'Protocolo 1:1:1 em trauma' },
            { classe: 'Antifibrinolitico', medicamentos: ['Acido tranexamico'], posologia: '1g IV em 10min + 1g em 8h' }
          ],
          citations: [{ refId: 'atls-2018' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'UTI ate estabilizacao',
        metasTerapeuticas: ['Hemodinamica estavel', 'Sangramento controlado'],
        criteriosEncaminhamento: ['Centro de trauma', 'Cirurgia de urgencia'],
        citations: [{ refId: 'atls-2018' }]
      },
      prevencao: {
        primaria: ['Prevencao de trauma', 'Tratamento de ulceras GI'],
        secundaria: ['Reconhecimento precoce', 'Reposicao volemica imediata'],
        citations: [{ refId: 'atls-2018' }]
      }
    },
    protocolos: ['protocolo-trauma'],
    medicamentos: ['acido-tranexamico'],
    calculadoras: ['shock-index'],
    citations: [{ refId: 'atls-2018' }],
    lastUpdate: '2026-01',
    tags: ['emergencia', 'trauma', 'choque', 'hemorragia']
  },

  // ============================================================================
  // EDEMA AGUDO DE PULMAO
  // ============================================================================
  {
    id: 'edema-agudo-pulmao',
    titulo: 'Edema Agudo de Pulmao',
    sinonimos: ['EAP', 'Acute pulmonary edema', 'Edema pulmonar cardiogenico'],
    doid: 'DOID:11396',
    snomedCT: '67782005',
    meshId: 'D011654',
    ciap2: ['K77'],
    cid10: ['J81'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Acumulo rapido de liquido nos alveolos por aumento da pressao capilar pulmonar (cardiogenico) ou lesao da membrana alveolocapilar (nao cardiogenico).',
      criteriosDiagnosticos: [
        'Dispneia intensa de inicio subito',
        'Ortopneia, dispneia paroxistica noturna',
        'Estertores crepitantes bilaterais difusos',
        'SatO2 baixa, hipoxemia',
        'RX com infiltrado bilateral em asa de borboleta'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Sentar paciente', 'O2 em alto fluxo', 'VNI (CPAP 10cmH2O)', 'IOT se falha'],
        farmacologico: ['Furosemida 40-80mg IV', 'Nitroglicerina 5-200mcg/min se PAS >100', 'Morfina 2-4mg IV (controverso)']
      },
      metasTerapeuticas: ['SatO2 >94%', 'Melhora da dispneia', 'Diurese'],
      examesIniciais: ['ECG', 'RX torax', 'BNP', 'Troponina', 'Gasometria', 'Funcao renal'],
      redFlags: ['PAS <90mmHg', 'Necessidade de IOT', 'IAM concomitante', 'Choque']
    },
    fullContent: {
      epidemiologia: {
        mortalidade: '10-20% hospitalar',
        fatoresRisco: ['IC previa', 'IAM', 'Emergencia hipertensiva', 'Valvopatia', 'Arritmia'],
        citations: [{ refId: 'esc-hf-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dispneia intensa', 'Tosse com expectoracao rosea', 'Ansiedade', 'Diaforese'],
        sinaisExameFisico: ['Taquipneia', 'Estertores difusos', 'B3', 'Turgencia jugular'],
        citations: [{ refId: 'esc-hf-2021' }]
      },
      diagnostico: {
        criterios: ['Clinica + RX compativel + BNP elevado'],
        diagnosticoDiferencial: ['SDRA', 'Pneumonia', 'TEP', 'Asma/DPOC exacerbado'],
        citations: [{ refId: 'esc-hf-2021' }]
      },
      tratamento: {
        objetivos: ['Oxigenacao', 'Reducao de pre e pos-carga', 'Diurese'],
        naoFarmacologico: {
          medidas: ['Posicao sentada', 'VNI (CPAP ou BiPAP)', 'IOT se insuficiencia respiratoria grave'],
          citations: [{ refId: 'esc-hf-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Diuretico', medicamentos: ['Furosemida'], posologia: '40-80mg IV em bolus' },
            { classe: 'Vasodilatador', medicamentos: ['Nitroglicerina'], posologia: '5-200mcg/min IV', observacoes: 'Se PAS >100mmHg' }
          ],
          citations: [{ refId: 'esc-hf-2021' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'UTI ate estabilizacao, depois ambulatorial',
        metasTerapeuticas: ['Euvolemia', 'Identificar e tratar causa'],
        criteriosEncaminhamento: ['Cardiologia', 'Hemodinamica se IAM'],
        citations: [{ refId: 'esc-hf-2021' }]
      },
      prevencao: {
        primaria: ['Adesao ao tratamento de IC', 'Controle de HAS'],
        secundaria: ['Restricao hidrossalina', 'Otimizacao de IC'],
        citations: [{ refId: 'esc-hf-2021' }]
      }
    },
    protocolos: ['protocolo-ic-descompensada'],
    medicamentos: ['furosemida', 'nitroglicerina'],
    calculadoras: [],
    citations: [{ refId: 'esc-hf-2021' }],
    lastUpdate: '2026-01',
    tags: ['emergencia', 'cardiologia', 'respiratorio', 'ic']
  },

  // ============================================================================
  // STATUS EPILEPTICUS
  // ============================================================================
  {
    id: 'status-epilepticus',
    titulo: 'Status Epilepticus',
    sinonimos: ['Estado de mal epileptico', 'SE'],
    doid: 'DOID:3327',
    snomedCT: '230456007',
    meshId: 'D013226',
    ciap2: ['N88'],
    cid10: ['G41'],
    categoria: 'neurologico',
    quickView: {
      definicao: 'Crise epileptica prolongada (>5min para TCG) ou crises repetidas sem recuperacao da consciencia. Emergencia neurologica com risco de lesao cerebral permanente.',
      criteriosDiagnosticos: [
        'Crise TCG >5min sem recuperacao',
        'Crises repetidas sem recuperacao da consciencia',
        'SE nao convulsivo: alteracao consciencia + EEG ictal'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['ABC', 'Decubito lateral', 'Proteger via aerea', 'Acesso venoso', 'Glicemia capilar'],
        farmacologico: ['Diazepam 10mg IV ou Midazolam 10mg IM', 'Fenitoina 20mg/kg IV ou Acido valproico 40mg/kg', 'Se refratario: Fenobarbital ou anestesicos']
      },
      metasTerapeuticas: ['Cessar crise em <30min', 'Prevenir lesao cerebral', 'Identificar causa'],
      examesIniciais: ['Glicemia', 'Eletrolitos', 'Calcio', 'Mg', 'Gasometria', 'TC de cranio', 'EEG'],
      redFlags: ['>30min de crise', 'Hipoxemia', 'Hipotensao', 'Febre alta']
    },
    fullContent: {
      epidemiologia: {
        mortalidade: '20% em SE refratario',
        fatoresRisco: ['Epilepsia previa', 'Lesao cerebral', 'Infeccao SNC', 'Disturbio metabolico'],
        citations: [{ refId: 'neurocrit-se-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Movimentos tonico-clonicos', 'Perda de consciencia', 'Cianose', 'Sialorreia'],
        sinaisExameFisico: ['Abalos musculares', 'Desvio do olhar', 'Incontinencia'],
        citations: [{ refId: 'neurocrit-se-2020' }]
      },
      diagnostico: {
        criterios: ['Crise prolongada ou repetitiva', 'EEG se SE nao convulsivo'],
        diagnosticoDiferencial: ['Sincope convulsiva', 'PNES', 'Intoxicacao'],
        citations: [{ refId: 'neurocrit-se-2020' }]
      },
      tratamento: {
        objetivos: ['Cessar atividade ictal', 'Proteger via aerea', 'Identificar etiologia'],
        naoFarmacologico: {
          medidas: ['Posicao de seguranca', 'Oxigenioterapia', 'IOT se necessario'],
          citations: [{ refId: 'neurocrit-se-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Benzodiazepinicos', medicamentos: ['Diazepam', 'Midazolam'], posologia: 'Diazepam 10mg IV ou Midazolam 10mg IM' },
            { classe: 'Anticonvulsivante', medicamentos: ['Fenitoina', 'Ac. valproico'], posologia: 'Fenitoina 20mg/kg IV em 20min' }
          ],
          segundaLinha: [
            { classe: 'Barbiturico', medicamentos: ['Fenobarbital'], posologia: '20mg/kg IV' }
          ],
          citations: [{ refId: 'neurocrit-se-2020' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'UTI ate estabilizacao, Neurologia ambulatorial',
        metasTerapeuticas: ['Controle de crises', 'Ajuste de anticonvulsivantes'],
        criteriosEncaminhamento: ['Neurologia/Epilepsia'],
        citations: [{ refId: 'neurocrit-se-2020' }]
      },
      prevencao: {
        primaria: ['Adesao ao tratamento anticonvulsivante'],
        secundaria: ['Identificar e evitar gatilhos'],
        citations: [{ refId: 'neurocrit-se-2020' }]
      }
    },
    protocolos: ['protocolo-status-epilepticus'],
    medicamentos: ['diazepam', 'fenitoina', 'midazolam'],
    calculadoras: [],
    citations: [{ refId: 'neurocrit-se-2020' }],
    lastUpdate: '2026-01',
    tags: ['emergencia', 'neurologia', 'epilepsia']
  },

  // ============================================================================
  // AVC ISQUEMICO AGUDO
  // ============================================================================
  {
    id: 'avc-isquemico-agudo',
    titulo: 'AVC Isquemico Agudo',
    sinonimos: ['AVCi agudo', 'Stroke isquemico', 'Infarto cerebral agudo'],
    doid: 'DOID:3455',
    snomedCT: '422504002',
    meshId: 'D002544',
    ciap2: ['K90'],
    cid10: ['I63'],
    categoria: 'neurologico',
    quickView: {
      definicao: 'Deficit neurologico focal subito por isquemia cerebral. Janela para trombolise <4.5h e trombectomia ate 24h em selecionados. Tempo e cerebro.',
      criteriosDiagnosticos: [
        'Deficit neurologico focal de inicio subito',
        'FAST positivo (Face, Arm, Speech, Time)',
        'TC sem hemorragia',
        'NIHSS para quantificar gravidade'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['ABC', 'Cabeceira 0 graus', 'Monitorizacao', 'Glicemia capilar'],
        farmacologico: ['Alteplase 0.9mg/kg (max 90mg) se <4.5h', 'Tenecteplase 0.25mg/kg alternativa', 'Nao baixar PA se <220/120']
      },
      metasTerapeuticas: ['Reperfusao', 'NIHSS em queda', 'Prevencao de complicacoes'],
      examesIniciais: ['TC cranio', 'Glicemia', 'TP/INR', 'ECG', 'Hemograma', 'Funcao renal'],
      redFlags: ['>4.5h do inicio', 'PA >185/110 (se candidato a trombolise)', 'INR >1.7', 'Sangramento ativo']
    },
    fullContent: {
      epidemiologia: {
        incidencia: '~400.000 casos/ano no Brasil',
        mortalidade: '30% em 30 dias',
        fatoresRisco: ['HAS', 'FA', 'DM', 'Dislipidemia', 'Tabagismo'],
        citations: [{ refId: 'aha-stroke-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Hemiparesia', 'Afasia', 'Hemianopsia', 'Ataxia', 'Disartria'],
        sinaisExameFisico: ['Deficit motor focal', 'Desvio de rima', 'Babinski'],
        citations: [{ refId: 'aha-stroke-2019' }]
      },
      diagnostico: {
        criterios: ['Deficit subito + TC sem hemorragia'],
        diagnosticoDiferencial: ['AVC hemorragico', 'Hipoglicemia', 'Crise epileptica', 'Enxaqueca'],
        citations: [{ refId: 'aha-stroke-2019' }]
      },
      tratamento: {
        objetivos: ['Reperfusao precoce', 'Minimizar area de infarto'],
        naoFarmacologico: {
          medidas: ['Monitorizacao intensiva', 'Controle de temperatura', 'Prevenir broncoaspiracao'],
          citations: [{ refId: 'aha-stroke-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Trombolitico', medicamentos: ['Alteplase', 'Tenecteplase'], posologia: 'Alteplase 0.9mg/kg IV', observacoes: 'Janela <4.5h' },
            { classe: 'Antiagregante', medicamentos: ['AAS'], posologia: '100-300mg apos 24h da trombolise' }
          ],
          citations: [{ refId: 'aha-stroke-2019' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Unidade de AVC, apos Neurologia ambulatorial',
        metasTerapeuticas: ['PA <130/80', 'LDL <70', 'Reabilitacao'],
        criteriosEncaminhamento: ['Unidade de AVC', 'Trombectomia se grande vaso'],
        citations: [{ refId: 'aha-stroke-2019' }]
      },
      prevencao: {
        primaria: ['Controle de HAS', 'Anticoagulacao em FA'],
        secundaria: ['Estatina alta potencia', 'Antiagregacao/anticoagulacao'],
        citations: [{ refId: 'aha-stroke-2019' }]
      }
    },
    protocolos: ['codigo-avc'],
    medicamentos: ['alteplase', 'aas'],
    calculadoras: ['nihss'],
    citations: [{ refId: 'aha-stroke-2019' }],
    lastUpdate: '2026-01',
    tags: ['emergencia', 'neurologia', 'avc', 'trombolise']
  },

  // ============================================================================
  // IAM COM SUPRA DE ST
  // ============================================================================
  {
    id: 'iam-com-supra-st',
    titulo: 'IAM com Supradesnivel de ST',
    sinonimos: ['IAMCSST', 'STEMI', 'Infarto transmural'],
    doid: 'DOID:0060165',
    snomedCT: '401303003',
    meshId: 'D009203',
    ciap2: ['K75'],
    cid10: ['I21.0', 'I21.1', 'I21.2', 'I21.3'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Oclusao total de arteria coronaria com necrose miocardica. Supra de ST >=1mm em 2 derivacoes contiguas. Reperfusao em <90min (ICP) ou <30min (fibrinolitico).',
      criteriosDiagnosticos: [
        'Dor toracica tipica >20min',
        'Supra de ST >=1mm em 2 derivacoes contiguas',
        'BRE novo',
        'Troponina elevada (curva ascendente)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Monitorizacao', 'Oxigenio se SatO2 <90%', 'Desfibrilador proximo'],
        farmacologico: ['AAS 300mg VO', 'Clopidogrel 600mg ou Ticagrelor 180mg', 'Heparina', 'ICP primaria ou Fibrinolitico']
      },
      metasTerapeuticas: ['Reperfusao <90min (ICP) ou <30min (fibrinolitico)', 'Controle da dor'],
      examesIniciais: ['ECG em 10min', 'Troponina', 'Hemograma', 'Coagulograma', 'Funcao renal'],
      redFlags: ['Choque cardiogenico', 'Arritmia maligna', 'Congestao pulmonar', 'PCR']
    },
    fullContent: {
      epidemiologia: {
        incidencia: '~350.000 casos/ano no Brasil (todas SCA)',
        mortalidade: '30% sem tratamento adequado',
        fatoresRisco: ['HAS', 'DM', 'Dislipidemia', 'Tabagismo', 'Historia familiar'],
        citations: [{ refId: 'esc-stemi-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dor toracica opressiva', 'Irradiacao MSE/mandibula', 'Dispneia', 'Sudorese', 'Nausea'],
        sinaisExameFisico: ['Palidez', 'Taquicardia', 'B4', 'Hipotensao (mau prognostico)'],
        citations: [{ refId: 'esc-stemi-2023' }]
      },
      diagnostico: {
        criterios: ['Clinica + ECG com supra de ST', 'Troponina elevada'],
        diagnosticoDiferencial: ['Disseccao aortica', 'TEP', 'Pericardite'],
        citations: [{ refId: 'esc-stemi-2023' }]
      },
      tratamento: {
        objetivos: ['Reperfusao imediata', 'Prevencao de complicacoes'],
        naoFarmacologico: {
          medidas: ['ICP primaria (preferencial)', 'Reperfusao em <12h', 'Monitorizacao em UTI coronariana'],
          citations: [{ refId: 'esc-stemi-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antiagregante', medicamentos: ['AAS', 'Clopidogrel', 'Ticagrelor'], posologia: 'AAS 300mg + Ticagrelor 180mg ataque' },
            { classe: 'Anticoagulante', medicamentos: ['Enoxaparina', 'HNF'], posologia: 'Enoxaparina 1mg/kg 12/12h' },
            { classe: 'Trombolitico', medicamentos: ['Tenecteplase'], posologia: 'Peso-ajustado', observacoes: 'Se >120min ate ICP' }
          ],
          citations: [{ refId: 'esc-stemi-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'UTI coronariana, alta em 3-5 dias se estavel',
        metasTerapeuticas: ['LDL <55', 'PA <130/80', 'Reabilitacao cardiaca'],
        criteriosEncaminhamento: ['Hemodinamica urgente', 'Cardiologia'],
        citations: [{ refId: 'esc-stemi-2023' }]
      },
      prevencao: {
        primaria: ['Controle de fatores de risco'],
        secundaria: ['DAPT por 12 meses', 'Estatina alta potencia', 'Betabloqueador'],
        citations: [{ refId: 'esc-stemi-2023' }]
      }
    },
    protocolos: ['manejo-sca'],
    medicamentos: ['aas', 'ticagrelor', 'tenecteplase'],
    calculadoras: ['timi-stemi', 'grace-score'],
    citations: [{ refId: 'esc-stemi-2023' }],
    lastUpdate: '2026-01',
    tags: ['emergencia', 'cardiologia', 'iam', 'reperfusao']
  },

  // ============================================================================
  // CETOACIDOSE DIABETICA
  // ============================================================================
  {
    id: 'cetoacidose-diabetica',
    titulo: 'Cetoacidose Diabetica',
    sinonimos: ['CAD', 'DKA', 'Diabetic ketoacidosis'],
    doid: 'DOID:0050591',
    snomedCT: '420422005',
    meshId: 'D016883',
    ciap2: ['T89'],
    cid10: ['E10.1', 'E11.1'],
    categoria: 'endocrino',
    quickView: {
      definicao: 'Emergencia metabolica com hiperglicemia, acidose metabolica (pH <7.3, HCO3 <18) e cetonemia. Mais comum em DM1. Mortalidade <1% se bem tratada.',
      criteriosDiagnosticos: [
        'Glicemia >250mg/dL',
        'pH <7.3 ou HCO3 <18mEq/L',
        'Cetonemia ou cetonuria positiva',
        'Anion gap aumentado'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratacao vigorosa', 'Monitorizacao em UTI', 'Sonda vesical'],
        farmacologico: ['SF 0.9% 1-1.5L na 1a hora', 'Insulina regular 0.1U/kg/h IV', 'Potassio (se K <5.3)', 'Bicarbonato se pH <6.9']
      },
      metasTerapeuticas: ['Glicemia 150-200mg/dL', 'pH >7.3', 'Anion gap normalizado', 'K 4-5mEq/L'],
      examesIniciais: ['Glicemia', 'Gasometria', 'Eletrolitos', 'Cetonas', 'Funcao renal', 'Hemograma'],
      redFlags: ['pH <7.0', 'K <3.3', 'Coma', 'Edema cerebral']
    },
    fullContent: {
      epidemiologia: {
        mortalidade: '<1% se tratada, 5% se complicada',
        fatoresRisco: ['DM1', 'Omissao de insulina', 'Infeccao', 'Estreia de diabetes'],
        citations: [{ refId: 'ada-dka-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Poliuria', 'Polidipsia', 'Nausea', 'Vomito', 'Dor abdominal', 'Alteracao consciencia'],
        sinaisExameFisico: ['Desidratacao', 'Respiracao de Kussmaul', 'Halito cetonico', 'Taquicardia'],
        citations: [{ refId: 'ada-dka-2022' }]
      },
      diagnostico: {
        criterios: ['Hiperglicemia + acidose + cetose'],
        diagnosticoDiferencial: ['EHH', 'Acidose lactica', 'Cetoacidose alcoolica', 'Intoxicacao'],
        citations: [{ refId: 'ada-dka-2022' }]
      },
      tratamento: {
        objetivos: ['Corrigir desidratacao', 'Normalizar glicemia', 'Corrigir acidose', 'Repor potassio'],
        naoFarmacologico: {
          medidas: ['Hidratacao IV', 'Monitorizacao de K a cada 2h', 'Identificar fator precipitante'],
          citations: [{ refId: 'ada-dka-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Insulina', medicamentos: ['Insulina regular'], posologia: '0.1U/kg/h IV', observacoes: 'Iniciar apos K >3.3' },
            { classe: 'Cristaloide', medicamentos: ['SF 0.9%'], posologia: '1-1.5L/h nas primeiras 2h' },
            { classe: 'Eletrolito', medicamentos: ['KCl'], posologia: '20-40mEq/L no soro', observacoes: 'Se K <5.3' }
          ],
          citations: [{ refId: 'ada-dka-2022' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'UTI ate resolucao, Endocrinologia ambulatorial',
        metasTerapeuticas: ['Prevencao de recorrencia', 'Educacao em diabetes'],
        criteriosEncaminhamento: ['Endocrinologia'],
        citations: [{ refId: 'ada-dka-2022' }]
      },
      prevencao: {
        primaria: ['Educacao em diabetes', 'Adesao ao tratamento'],
        secundaria: ['Regra do dia de doenca', 'Monitoramento de cetonas'],
        citations: [{ refId: 'ada-dka-2022' }]
      }
    },
    protocolos: ['protocolo-cad'],
    medicamentos: ['insulina-regular'],
    calculadoras: ['anion-gap'],
    citations: [{ refId: 'ada-dka-2022' }],
    lastUpdate: '2026-01',
    tags: ['emergencia', 'endocrino', 'diabetes', 'acidose']
  },

  // ============================================================================
  // ESTADO HIPEROSMOLAR HIPERGLICEMICO
  // ============================================================================
  {
    id: 'estado-hiperosmolar-hiperglicemico',
    titulo: 'Estado Hiperosmolar Hiperglicemico',
    sinonimos: ['EHH', 'HHS', 'Coma hiperosmolar'],
    doid: 'DOID:9836',
    snomedCT: '234424001',
    meshId: 'D006944',
    ciap2: ['T89'],
    cid10: ['E11.0'],
    categoria: 'endocrino',
    quickView: {
      definicao: 'Emergencia hiperglicemica com osmolaridade >320mOsm/kg, glicemia >600mg/dL, sem acidose significativa. Mais comum em DM2 idosos. Mortalidade 10-20%.',
      criteriosDiagnosticos: [
        'Glicemia >600mg/dL',
        'Osmolaridade efetiva >320mOsm/kg',
        'pH >7.3 e HCO3 >18',
        'Ausencia de cetose significativa',
        'Alteracao do sensorio'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratacao agressiva', 'Monitorizacao intensiva', 'Prevencao de TVP'],
        farmacologico: ['SF 0.9% 1-1.5L/h inicial', 'Insulina regular 0.1U/kg/h apos hidratacao inicial', 'Potassio conforme niveis']
      },
      metasTerapeuticas: ['Osmolaridade <315', 'Glicemia 200-300mg/dL', 'Nivel de consciencia normal'],
      examesIniciais: ['Glicemia', 'Osmolaridade', 'Eletrolitos', 'Gasometria', 'Funcao renal', 'Cetonas'],
      redFlags: ['Osmolaridade >350', 'Coma', 'Insuficiencia renal aguda', 'Hipotensao']
    },
    fullContent: {
      epidemiologia: {
        mortalidade: '10-20%',
        fatoresRisco: ['DM2', 'Idade avancada', 'Infeccao', 'Demencia', 'Institucionalizacao'],
        citations: [{ refId: 'ada-hhs-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Poliuria', 'Polidipsia', 'Fraqueza', 'Confusao', 'Letargia', 'Coma'],
        sinaisExameFisico: ['Desidratacao grave', 'Hipotensao', 'Taquicardia', 'Sinais neurologicos focais'],
        citations: [{ refId: 'ada-hhs-2022' }]
      },
      diagnostico: {
        criterios: ['Hiperglicemia extrema + hiperosmolaridade + ausencia de cetoacidose'],
        diagnosticoDiferencial: ['CAD', 'AVC', 'Uremia', 'Intoxicacao'],
        citations: [{ refId: 'ada-hhs-2022' }]
      },
      tratamento: {
        objetivos: ['Corrigir desidratacao', 'Normalizar osmolaridade', 'Corrigir hiperglicemia'],
        naoFarmacologico: {
          medidas: ['Hidratacao e principal tratamento', 'Profilaxia de TVP', 'Monitorizacao de sodio corrigido'],
          citations: [{ refId: 'ada-hhs-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Cristaloide', medicamentos: ['SF 0.9%'], posologia: '1-1.5L/h nas primeiras horas', observacoes: 'Hidratacao e prioridade' },
            { classe: 'Insulina', medicamentos: ['Insulina regular'], posologia: '0.1U/kg/h IV', observacoes: 'Iniciar apos 1-2L de hidratacao' }
          ],
          citations: [{ refId: 'ada-hhs-2022' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'UTI, depois Endocrinologia',
        metasTerapeuticas: ['Prevenir recorrencia', 'Ajuste de hipoglicemiantes'],
        criteriosEncaminhamento: ['Endocrinologia', 'Geriatria'],
        citations: [{ refId: 'ada-hhs-2022' }]
      },
      prevencao: {
        primaria: ['Hidratacao adequada em idosos', 'Monitoramento de glicemia'],
        secundaria: ['Educacao de cuidadores', 'Ajuste de medicacoes'],
        citations: [{ refId: 'ada-hhs-2022' }]
      }
    },
    protocolos: ['protocolo-ehh'],
    medicamentos: ['insulina-regular'],
    calculadoras: ['osmolaridade-efetiva'],
    citations: [{ refId: 'ada-hhs-2022' }],
    lastUpdate: '2026-01',
    tags: ['emergencia', 'endocrino', 'diabetes', 'hiperosmolar']
  },

  // ============================================================================
  // INSUFICIENCIA RESPIRATORIA AGUDA
  // ============================================================================
  {
    id: 'insuficiencia-respiratoria-aguda',
    titulo: 'Insuficiencia Respiratoria Aguda',
    sinonimos: ['IRpA', 'Acute respiratory failure'],
    doid: 'DOID:11162',
    snomedCT: '65710008',
    meshId: 'D012131',
    ciap2: ['R99'],
    cid10: ['J96.0'],
    categoria: 'respiratorio',
    quickView: {
      definicao: 'Falencia aguda das trocas gasosas. Tipo I (hipoxemica): PaO2 <60mmHg. Tipo II (hipercapnica): PaCO2 >50mmHg. Emergencia com necessidade de suporte ventilatorio.',
      criteriosDiagnosticos: [
        'PaO2 <60mmHg em ar ambiente (tipo I)',
        'PaCO2 >50mmHg com acidose (tipo II)',
        'Dispneia intensa, uso de musculatura acessoria',
        'Alteracao do sensorio por hipoxemia/hipercapnia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Oxigenioterapia', 'VNI (CPAP/BiPAP)', 'IOT se indicado', 'Posicao prona se SDRA'],
        farmacologico: ['Broncodilatador se broncoespasmo', 'Corticoide se indicado', 'ATB se pneumonia', 'Diuretico se congestao']
      },
      metasTerapeuticas: ['SatO2 >92%', 'PaO2 >60mmHg', 'PaCO2 normalizado ou em queda'],
      examesIniciais: ['Gasometria arterial', 'RX torax', 'Hemograma', 'PCR', 'BNP', 'D-dimero'],
      redFlags: ['PaO2 <40mmHg', 'pH <7.2', 'Exaustao respiratoria', 'Rebaixamento consciencia']
    },
    fullContent: {
      epidemiologia: {
        mortalidade: '20-40% dependendo da causa',
        fatoresRisco: ['DPOC', 'Pneumonia', 'SDRA', 'Edema pulmonar', 'TEP'],
        citations: [{ refId: 'ers-arf-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dispneia', 'Taquipneia', 'Uso de musculatura acessoria', 'Cianose', 'Confusao'],
        sinaisExameFisico: ['Tiragem', 'Batimento de asa de nariz', 'Estertores', 'Sibilos'],
        citations: [{ refId: 'ers-arf-2021' }]
      },
      diagnostico: {
        criterios: ['Gasometria alterada + quadro clinico compativel'],
        diagnosticoDiferencial: ['Definir etiologia: pneumonia, DPOC, SDRA, EAP, TEP, etc.'],
        citations: [{ refId: 'ers-arf-2021' }]
      },
      tratamento: {
        objetivos: ['Manter oxigenacao', 'Tratar causa base', 'Evitar IOT quando possivel'],
        naoFarmacologico: {
          medidas: ['O2 suplementar', 'VNI precoce se indicado', 'IOT e VM se necessario'],
          citations: [{ refId: 'ers-arf-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Broncodilatador', medicamentos: ['Salbutamol', 'Ipratropio'], posologia: 'Nebulizacao', observacoes: 'Se broncoespasmo' },
            { classe: 'Corticoide', medicamentos: ['Metilprednisolona'], posologia: '40-125mg IV', observacoes: 'DPOC, asma' }
          ],
          citations: [{ refId: 'ers-arf-2021' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'UTI ate estabilizacao',
        metasTerapeuticas: ['Desmame ventilatorio', 'Tratar doenca de base'],
        criteriosEncaminhamento: ['Pneumologia', 'UTI'],
        citations: [{ refId: 'ers-arf-2021' }]
      },
      prevencao: {
        primaria: ['Vacinacao', 'Cessacao tabagica'],
        secundaria: ['Tratamento otimizado de doencas cronicas'],
        citations: [{ refId: 'ers-arf-2021' }]
      }
    },
    protocolos: ['protocolo-irpa'],
    medicamentos: ['salbutamol', 'ipratropio'],
    calculadoras: ['pao2-fio2'],
    citations: [{ refId: 'ers-arf-2021' }],
    lastUpdate: '2026-01',
    tags: ['emergencia', 'respiratorio', 'uti', 'ventilacao']
  },

  // ============================================================================
  // ANAFILAXIA
  // ============================================================================
  {
    id: 'anafilaxia-emergencia',
    titulo: 'Anafilaxia',
    sinonimos: ['Reacao anafilatica', 'Choque anafilatico'],
    doid: 'DOID:5841',
    snomedCT: '39579001',
    meshId: 'D000707',
    ciap2: ['A92'],
    cid10: ['T78.2'],
    categoria: 'outros',
    quickView: {
      definicao: 'Reacao de hipersensibilidade sistemica grave, de inicio rapido, potencialmente fatal. Adrenalina IM e tratamento de primeira linha, sem contraindicacao absoluta.',
      criteriosDiagnosticos: [
        'Inicio agudo (minutos a horas)',
        'Pele/mucosas + respiratorio OU hipotensao',
        '>=2 sistemas: pele, respiratorio, TGI, cardiovascular',
        'Hipotensao apos alergeno conhecido'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Remover alergeno', 'Decubito dorsal (Trendelenburg se hipotenso)', 'ABC'],
        farmacologico: ['ADRENALINA IM 0.3-0.5mg (coxa anterolateral) - repetir cada 5-15min', 'SF 0.9% 20mL/kg bolus', 'Anti-histaminico e corticoide (adjuvantes)']
      },
      metasTerapeuticas: ['Estabilizacao hemodinamica', 'Reversao do broncoespasmo'],
      examesIniciais: ['Monitorizacao', 'Triptase serica (se disponivel)', 'ECG'],
      redFlags: ['Edema de glote', 'Broncoespasmo severo', 'Hipotensao refrataria', 'PCR']
    },
    fullContent: {
      epidemiologia: {
        mortalidade: '<1% se tratada rapidamente',
        fatoresRisco: ['Alergia conhecida', 'Asma', 'Mastocitose', 'Uso de betabloqueador'],
        citations: [{ refId: 'wao-anaphylaxis-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Urticaria', 'Angioedema', 'Dispneia', 'Sibilos', 'Nausea', 'Vomito', 'Tontura'],
        sinaisExameFisico: ['Rash', 'Estridor', 'Sibilos', 'Hipotensao', 'Taquicardia'],
        citations: [{ refId: 'wao-anaphylaxis-2020' }]
      },
      diagnostico: {
        criterios: ['Clinico - nao esperar exames'],
        diagnosticoDiferencial: ['Urticaria simples', 'Crise asmatica', 'Sincope vasovagal', 'Ataque de panico'],
        citations: [{ refId: 'wao-anaphylaxis-2020' }]
      },
      tratamento: {
        objetivos: ['Administrar adrenalina imediatamente', 'Suporte hemodinamico'],
        naoFarmacologico: {
          medidas: ['Posicao supina', 'Remover alergeno', 'Preparar para IOT se necessario'],
          citations: [{ refId: 'wao-anaphylaxis-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Simpaticomimetico', medicamentos: ['Adrenalina'], posologia: '0.3-0.5mg IM (adulto) cada 5-15min', observacoes: 'Sem contraindicacao absoluta' },
            { classe: 'Cristaloide', medicamentos: ['SF 0.9%'], posologia: '20mL/kg bolus', observacoes: 'Se hipotensao' }
          ],
          segundaLinha: [
            { classe: 'Anti-histaminico', medicamentos: ['Difenidramina'], posologia: '25-50mg IV' },
            { classe: 'Corticoide', medicamentos: ['Metilprednisolona'], posologia: '1-2mg/kg IV', observacoes: 'Prevencao de bifasica' }
          ],
          citations: [{ refId: 'wao-anaphylaxis-2020' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Observacao 4-6h (ate 24h se grave), Alergologia',
        metasTerapeuticas: ['Prescricao de adrenalina auto-injetavel', 'Identificacao do alergeno'],
        criteriosEncaminhamento: ['Alergista/Imunologista'],
        citations: [{ refId: 'wao-anaphylaxis-2020' }]
      },
      prevencao: {
        primaria: ['Evitar alergeno conhecido'],
        secundaria: ['Portar adrenalina auto-injetavel', 'Imunoterapia em casos selecionados'],
        citations: [{ refId: 'wao-anaphylaxis-2020' }]
      }
    },
    protocolos: ['protocolo-anafilaxia'],
    medicamentos: ['adrenalina'],
    calculadoras: [],
    citations: [{ refId: 'wao-anaphylaxis-2020' }],
    lastUpdate: '2026-01',
    tags: ['emergencia', 'alergia', 'choque', 'adrenalina']
  },

  // ============================================================================
  // CRISE HIPERTENSIVA
  // ============================================================================
  {
    id: 'crise-hipertensiva',
    titulo: 'Crise Hipertensiva',
    sinonimos: ['Emergencia hipertensiva', 'Urgencia hipertensiva'],
    doid: 'DOID:10825',
    snomedCT: '70272006',
    meshId: 'D006973',
    ciap2: ['K86'],
    cid10: ['I10'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'PA severamente elevada (geralmente >180/120mmHg). Emergencia: com LOA aguda (AVC, EAP, disseccao). Urgencia: sem LOA, reduzir PA em 24-48h.',
      criteriosDiagnosticos: [
        'PA >=180/120mmHg',
        'EMERGENCIA: lesao de orgao-alvo aguda',
        'URGENCIA: sem evidencia de LOA',
        'Sintomas: cefaleia, alteracao visual, dispneia, dor toracica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Ambiente calmo', 'Decubito elevado', 'Monitorizacao continua'],
        farmacologico: ['EMERGENCIA: Nitroprussiato ou Nitroglicerina IV (reducao 10-20% em 1h)', 'URGENCIA: Captopril 25mg VO ou Clonidina 0.2mg VO']
      },
      metasTerapeuticas: ['Emergencia: reducao 10-20% na 1a hora', 'Urgencia: reducao gradual em 24-48h'],
      examesIniciais: ['ECG', 'RX torax', 'Funcao renal', 'Eletrolitos', 'Hemograma', 'Urina I', 'TC cranio se suspeita AVC'],
      redFlags: ['Disseccao aortica', 'AVC', 'Encefalopatia', 'EAP', 'Eclampsia', 'IRA']
    },
    fullContent: {
      epidemiologia: {
        fatoresRisco: ['HAS cronica mal controlada', 'Uso de drogas', 'Nao adesao ao tratamento', 'Doenca renal'],
        citations: [{ refId: 'aha-hypertension-2017' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Cefaleia intensa', 'Alteracao visual', 'Dispneia', 'Dor toracica', 'Deficit neurologico'],
        sinaisExameFisico: ['PA muito elevada', 'Retinopatia grau III/IV', 'Sinais de IC', 'Alteracoes neurologicas'],
        citations: [{ refId: 'aha-hypertension-2017' }]
      },
      diagnostico: {
        criterios: ['PA elevada + presenca ou ausencia de LOA aguda'],
        diagnosticoDiferencial: ['Crise de ansiedade', 'Dor', 'Apneia do sono'],
        citations: [{ refId: 'aha-hypertension-2017' }]
      },
      tratamento: {
        objetivos: ['Emergencia: reducao controlada e imediata', 'Urgencia: reducao gradual'],
        naoFarmacologico: {
          medidas: ['Monitorizacao continua', 'Identificar e tratar causa'],
          citations: [{ refId: 'aha-hypertension-2017' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Vasodilatador IV', medicamentos: ['Nitroprussiato', 'Nitroglicerina'], posologia: '0.25-10mcg/kg/min', observacoes: 'Emergencia hipertensiva' },
            { classe: 'IECA', medicamentos: ['Captopril'], posologia: '25mg VO', observacoes: 'Urgencia hipertensiva' }
          ],
          situacoesEspeciais: [
            { situacao: 'Disseccao aortica', conduta: 'PA <120 e FC <60 em 20min (betabloqueador + vasodilatador)' },
            { situacao: 'AVC', conduta: 'Nao reduzir PA se <220/120 (exceto se trombolise)' }
          ],
          citations: [{ refId: 'aha-hypertension-2017' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Reavaliar em 24-72h, depois ambulatorial',
        metasTerapeuticas: ['PA <140/90mmHg em semanas', 'Adesao ao tratamento'],
        criteriosEncaminhamento: ['Cardiologia se IC', 'Neurologia se AVC', 'Nefrologia se IRA'],
        citations: [{ refId: 'aha-hypertension-2017' }]
      },
      prevencao: {
        primaria: ['Adesao ao tratamento anti-hipertensivo'],
        secundaria: ['Controle rigoroso de PA', 'Modificacao de estilo de vida'],
        citations: [{ refId: 'aha-hypertension-2017' }]
      }
    },
    protocolos: ['protocolo-crise-hipertensiva'],
    medicamentos: ['nitroprussiato', 'captopril', 'clonidina'],
    calculadoras: [],
    citations: [{ refId: 'aha-hypertension-2017' }],
    lastUpdate: '2026-01',
    tags: ['emergencia', 'cardiologia', 'hipertensao']
  }
];
