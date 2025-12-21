/**
 * DOENÇAS CARDIOVASCULARES - DARWIN-MFC
 * =====================================
 */

import { Doenca } from '../../types/doenca';

export const doencasCardiovasculares: Doenca[] = [
  {
    id: 'insuficiencia-cardiaca',
    titulo: 'Insuficiência Cardíaca',
    sinonimos: ['IC', 'ICC', 'Insuficiência cardíaca congestiva'],
    doid: 'DOID:6000',
    snomedCT: '84114007',
    meshId: 'D006333',
    umlsCui: 'C0018801',
    ciap2: ['K77'],
    cid10: ['I50', 'I50.0', 'I50.1', 'I50.9'],
    cid11: ['BD10'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Síndrome clínica caracterizada pela incapacidade do coração de bombear sangue suficiente para atender às necessidades metabólicas dos tecidos, ou fazê-lo apenas com pressões de enchimento elevadas.',
      criteriosDiagnosticos: [
        'Sintomas típicos: dispneia, ortopneia, DPN, fadiga, edema MMII',
        'Sinais: turgência jugular, hepatomegalia, estertores pulmonares',
        'Evidência objetiva de disfunção cardíaca (ecocardiograma)',
        'Critérios de Framingham: 2 maiores OU 1 maior + 2 menores'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Restrição de sódio (<2g/dia)',
          'Restrição hídrica se hiponatremia (<1,5L/dia)',
          'Atividade física supervisionada (reabilitação cardíaca)',
          'Cessação do tabagismo e álcool',
          'Vacinação (influenza, pneumococo)'
        ],
        farmacologico: [
          'IECA ou BRA (ex: Enalapril 2,5-20mg 12/12h)',
          'Betabloqueador (ex: Carvedilol 3,125-25mg 12/12h)',
          'Diurético de alça se congestão (Furosemida 20-80mg/dia)',
          'Espironolactona 25-50mg/dia se FEVE ≤35%'
        ]
      },
      metasTerapeuticas: [
        'FEVE: estabilização ou melhora',
        'Classe funcional NYHA: melhora de pelo menos 1 classe',
        'PA adequada, FC 60-70 bpm',
        'Euvolemia (sem edema, peso seco)',
        'Redução de internações'
      ],
      examesIniciais: [
        'Ecocardiograma transtorácico',
        'ECG',
        'Radiografia de tórax',
        'Hemograma, função renal, eletrólitos',
        'BNP ou NT-proBNP',
        'Perfil lipídico, glicemia, TSH'
      ],
      redFlags: [
        'Hipotensão sintomática (PAS <90)',
        'Choque cardiogênico',
        'Edema agudo de pulmão',
        'Arritmias graves (FV, TVNS)',
        'Síncope',
        'Piora rápida da classe funcional'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2% da população adulta, aumenta com idade (>10% em >70 anos)',
        incidencia: '2-5 novos casos/1000 pessoas-ano',
        faixaEtaria: 'Mais comum >65 anos',
        fatoresRisco: [
          'Hipertensão arterial (principal)',
          'Doença arterial coronariana',
          'Diabetes mellitus',
          'Obesidade',
          'Valvopatias',
          'Cardiomiopatias',
          'Tabagismo, alcoolismo'
        ],
        citations: [{ refId: 'diretriz-ic-2021' }]
      },
      fisiopatologia: {
        texto: 'Disfunção sistólica (FEVE reduzida) ou diastólica (FEVE preservada) leva a ativação neuro-hormonal compensatória (SRAA, sistema simpático), remodelamento cardíaco progressivo e congestão sistêmica/pulmonar.',
        citations: [{ refId: 'diretriz-ic-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dispneia aos esforços (progressiva)',
          'Ortopneia',
          'Dispneia paroxística noturna (DPN)',
          'Fadiga e intolerância ao exercício',
          'Edema de membros inferiores',
          'Ganho de peso (retenção hídrica)'
        ],
        sinaisExameFisico: [
          'Turgência jugular a 45°',
          'Refluxo hepatojugular',
          'Estertores pulmonares bibasais',
          'B3 (galope)',
          'Hepatomegalia dolorosa',
          'Edema de MMII com cacifo'
        ],
        formasClinicas: [
          'ICFEr (FEVE <40%): IC sistólica',
          'ICFEi (FEVE 40-49%): IC intermediária',
          'ICFEp (FEVE ≥50%): IC diastólica'
        ],
        citations: [{ refId: 'diretriz-ic-2021' }]
      },
      diagnostico: {
        criterios: [
          'Critérios de Framingham',
          'Ecocardiograma com FEVE e função diastólica',
          'BNP >100 pg/mL ou NT-proBNP >300 pg/mL'
        ],
        diagnosticoDiferencial: [
          'DPOC',
          'Pneumonia',
          'TEP',
          'Insuficiência renal com hipervolemia',
          'Cirrose hepática com ascite',
          'Síndrome nefrótica'
        ],
        examesLaboratoriais: [
          'BNP/NT-proBNP',
          'Hemograma, função renal, eletrólitos',
          'Hepatograma',
          'Perfil lipídico, glicemia, HbA1c',
          'TSH',
          'Ferritina, saturação de transferrina'
        ],
        citations: [{ refId: 'diretriz-ic-2021' }]
      },
      tratamento: {
        objetivos: [
          'Aliviar sintomas e melhorar qualidade de vida',
          'Reduzir mortalidade e hospitalizações',
          'Prevenir progressão do remodelamento'
        ],
        naoFarmacologico: {
          medidas: [
            'Educação sobre IC e autocuidado',
            'Monitorização diária do peso',
            'Restrição de sódio e líquidos',
            'Reabilitação cardíaca',
            'Vacinação anual'
          ],
          citations: [{ refId: 'diretriz-ic-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'IECA/BRA',
              medicamentos: ['Enalapril', 'Losartana'],
              posologia: 'Enalapril 2,5-20mg 12/12h | Losartana 25-100mg/dia'
            },
            {
              classe: 'Betabloqueador',
              medicamentos: ['Carvedilol', 'Bisoprolol', 'Metoprolol succinato'],
              posologia: 'Carvedilol 3,125-25mg 12/12h (titular lentamente)'
            },
            {
              classe: 'Antagonista mineralocorticoide',
              medicamentos: ['Espironolactona'],
              posologia: '25-50mg/dia se FEVE ≤35% e sintomático'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Congestão',
              conduta: 'Furosemida 20-80mg/dia VO ou IV'
            },
            {
              situacao: 'FA com RVR',
              conduta: 'Controle de frequência com betabloqueador ou digoxina'
            }
          ],
          citations: [{ refId: 'diretriz-ic-2021' }]
        },
        duracao: 'Tratamento contínuo por toda a vida'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal até estabilização, depois a cada 3-6 meses',
        examesControle: [
          'Função renal e eletrólitos (1-2 semanas após ajuste de IECA/diurético)',
          'BNP/NT-proBNP se disponível',
          'Ecocardiograma anual ou se piora clínica'
        ],
        metasTerapeuticas: [
          'Classe NYHA I-II',
          'Peso seco estável',
          'Sem hospitalizações'
        ],
        criteriosEncaminhamento: [
          'FEVE <30%',
          'IC avançada (NYHA III-IV refratária)',
          'Considerar CDI/TRC',
          'Avaliação para transplante'
        ],
        citations: [{ refId: 'diretriz-ic-2021' }]
      },
      prevencao: {
        primaria: [
          'Controle de HAS, DM, dislipidemia',
          'Cessação do tabagismo',
          'Atividade física regular'
        ],
        secundaria: [
          'Adesão ao tratamento medicamentoso',
          'Monitorização do peso diário',
          'Dieta hipossódica'
        ],
        citations: [{ refId: 'diretriz-ic-2021' }]
      },
    },
    protocolos: ['protocolo-ic'],
    medicamentos: ['enalapril', 'losartana', 'carvedilol', 'furosemida', 'espironolactona'],
    calculadoras: ['nyha', 'ckd-epi'],
    rastreamentos: [],
    citations: [{ refId: 'diretriz-ic-2021' }],
    lastUpdate: '2024-12',
    tags: ['ic', 'insuficiencia-cardiaca', 'dispneia', 'edema', 'cardiopatia'],
  },
  {
    id: 'fibrilacao-atrial',
    titulo: 'Fibrilação Atrial',
    sinonimos: ['FA', 'Arritmia', 'Fibrilação auricular'],
    doid: 'DOID:0060224',
    snomedCT: '49436004',
    meshId: 'D001281',
    umlsCui: 'C0004238',
    ciap2: ['K78'],
    cid10: ['I48', 'I48.0', 'I48.1', 'I48.9'],
    cid11: ['BC81.1'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Arritmia supraventricular caracterizada por ativação atrial desorganizada, irregular e rápida, com perda da contração atrial efetiva. É a arritmia sustentada mais comum.',
      criteriosDiagnosticos: [
        'ECG: ausência de onda P, presença de ondas f irregulares',
        'Intervalos RR irregularmente irregulares',
        'Frequência atrial 350-600 bpm',
        'Pode ser paroxística, persistente ou permanente'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Controle de fatores precipitantes (álcool, cafeína)',
          'Tratamento de causas reversíveis (hipertireoidismo)',
          'Perda de peso se obesidade',
          'Tratamento de apneia do sono'
        ],
        farmacologico: [
          'Controle de frequência: Betabloqueador (Atenolol 25-100mg/dia) ou BCC (Diltiazem)',
          'Anticoagulação se CHA2DS2-VASc ≥2 (homens) ou ≥3 (mulheres)',
          'Varfarina (INR 2-3) ou DOACs (Rivaroxabana, Apixabana)'
        ]
      },
      metasTerapeuticas: [
        'FC em repouso 60-110 bpm',
        'Anticoagulação adequada (INR 2-3 ou aderência a DOAC)',
        'Prevenção de AVC e eventos tromboembólicos',
        'Controle de sintomas'
      ],
      examesIniciais: [
        'ECG de 12 derivações',
        'Ecocardiograma transtorácico',
        'TSH',
        'Função renal, eletrólitos',
        'Hemograma',
        'Holter 24h se paroxística'
      ],
      redFlags: [
        'FA com RVR e instabilidade hemodinâmica',
        'Sinais de AVC/AIT',
        'Síncope',
        'Dor torácica sugestiva de SCA',
        'IC descompensada',
        'Pré-excitação (WPW + FA)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2-4% da população adulta, aumenta com idade',
        incidencia: 'Dobra a cada década após 55 anos',
        faixaEtaria: 'Rara antes dos 50 anos, comum >75 anos',
        fatoresRisco: [
          'Idade avançada',
          'Hipertensão arterial',
          'Doença valvar (principalmente mitral)',
          'IC, DAC',
          'Diabetes mellitus',
          'Obesidade',
          'Apneia obstrutiva do sono',
          'Hipertireoidismo',
          'Consumo excessivo de álcool'
        ],
        citations: [{ refId: 'esc-fa-2020' }]
      },
      fisiopatologia: {
        texto: 'Múltiplos circuitos de reentrada nos átrios, frequentemente iniciados por focos ectópicos nas veias pulmonares. Remodelamento atrial elétrico e estrutural perpetua a arritmia. Estase atrial predispõe à formação de trombos, principalmente no apêndice atrial esquerdo.',
        citations: [{ refId: 'esc-fa-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Palpitações irregulares',
          'Dispneia aos esforços',
          'Fadiga',
          'Tontura',
          'Desconforto torácico',
          'Pode ser assintomática (30%)'
        ],
        sinaisExameFisico: [
          'Pulso irregular e geralmente rápido',
          'Déficit de pulso (FC apical > FC radial)',
          'Variação da intensidade de B1',
          'Ausência de onda a no pulso jugular'
        ],
        formasClinicas: [
          'Paroxística: episódios <7 dias, autolimitados',
          'Persistente: >7 dias ou requer cardioversão',
          'Persistente de longa duração: >1 ano',
          'Permanente: aceita, sem tentativa de restaurar ritmo'
        ],
        citations: [{ refId: 'esc-fa-2020' }]
      },
      diagnostico: {
        criterios: [
          'ECG com ritmo irregularmente irregular',
          'Ausência de ondas P definidas',
          'Ondas f de fibrilação (melhor vistas em V1)'
        ],
        diagnosticoDiferencial: [
          'Flutter atrial',
          'Taquicardia atrial multifocal',
          'Extrassístoles atriais frequentes',
          'Taquicardia sinusal com extrassístoles'
        ],
        examesLaboratoriais: [
          'TSH (descartar hipertireoidismo)',
          'Função renal (ajuste de anticoagulantes)',
          'Eletrólitos',
          'Hemograma',
          'Coagulograma se varfarina'
        ],
        citations: [{ refId: 'esc-fa-2020' }]
      },
      tratamento: {
        objetivos: [
          'Prevenção de tromboembolismo (AVC)',
          'Controle de sintomas',
          'Tratamento de comorbidades'
        ],
        naoFarmacologico: {
          medidas: [
            'Modificação do estilo de vida',
            'Controle de peso',
            'Redução de álcool',
            'Tratamento de apneia do sono',
            'Ablação por cateter em casos selecionados'
          ],
          citations: [{ refId: 'esc-fa-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Controle de frequência',
              medicamentos: ['Atenolol', 'Metoprolol', 'Diltiazem', 'Verapamil', 'Digoxina'],
              posologia: 'Atenolol 25-100mg/dia | Metoprolol 50-200mg/dia'
            },
            {
              classe: 'Anticoagulação (se CHA2DS2-VASc indicar)',
              medicamentos: ['Varfarina', 'Rivaroxabana', 'Apixabana', 'Dabigatrana', 'Edoxabana'],
              posologia: 'Varfarina (INR 2-3) ou DOAC conforme função renal'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'FA + IC com FEVE reduzida',
              conduta: 'Preferir betabloqueador ou digoxina (evitar BCC)'
            },
            {
              situacao: 'FA + WPW',
              conduta: 'EVITAR digoxina, BCC, betabloqueador. Encaminhar urgente.'
            }
          ],
          citations: [{ refId: 'esc-fa-2020' }]
        },
        duracao: 'Anticoagulação geralmente contínua se indicada'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses, ou mais frequente se instável',
        examesControle: [
          'INR mensal se varfarina',
          'Função renal anual (ajuste de DOAC)',
          'ECG se mudança de sintomas'
        ],
        metasTerapeuticas: [
          'FC 60-110 bpm em repouso',
          'TTR >70% se varfarina',
          'Ausência de eventos tromboembólicos'
        ],
        criteriosEncaminhamento: [
          'FA com instabilidade hemodinâmica',
          'Candidato a ablação',
          'FA + WPW',
          'FA refratária ao controle de frequência'
        ],
        citations: [{ refId: 'esc-fa-2020' }]
      },
      prevencao: {
        primaria: [
          'Controle de HAS',
          'Tratamento de apneia do sono',
          'Controle de peso',
          'Moderação no consumo de álcool'
        ],
        secundaria: [
          'Anticoagulação adequada',
          'Controle de fatores precipitantes'
        ],
        citations: [{ refId: 'esc-fa-2020' }]
      },
    },
    protocolos: [],
    medicamentos: ['atenolol', 'metoprolol', 'varfarina', 'rivaroxabana'],
    calculadoras: ['cha2ds2-vasc', 'has-bled'],
    rastreamentos: [],
    citations: [{ refId: 'esc-fa-2020' }],
    lastUpdate: '2024-12',
    tags: ['fa', 'fibrilacao-atrial', 'arritmia', 'anticoagulacao', 'avc'],
  },
  {
    id: 'doenca-arterial-coronariana',
    titulo: 'Doença Arterial Coronariana Estável',
    sinonimos: ['DAC', 'Angina estável', 'Cardiopatia isquêmica crônica'],
    doid: 'DOID:3393',
    snomedCT: '53741008',
    meshId: 'D003324',
    umlsCui: 'C0010054',
    ciap2: ['K74', 'K76'],
    cid10: ['I25', 'I25.1', 'I25.9', 'I20.8'],
    cid11: ['BA80'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Obstrução aterosclerótica das artérias coronárias levando a isquemia miocárdica durante esforço ou estresse. Caracteriza-se por angina típica previsível, estável em frequência e intensidade.',
      criteriosDiagnosticos: [
        'Dor torácica típica: retroesternal, em aperto, desencadeada por esforço/estresse',
        'Alívio com repouso ou nitrato sublingual (1-3 min)',
        'Duração de 2-10 minutos',
        'Teste ergométrico positivo ou imagem funcional com isquemia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cessação do tabagismo (essencial)',
          'Dieta mediterrânea',
          'Atividade física regular supervisionada',
          'Controle de peso',
          'Controle do estresse'
        ],
        farmacologico: [
          'AAS 100mg/dia (antiagregação)',
          'Estatina de alta intensidade (Atorvastatina 40-80mg)',
          'Betabloqueador (Atenolol, Metoprolol) para controle de angina',
          'Nitrato sublingual para crises'
        ]
      },
      metasTerapeuticas: [
        'LDL-C <50 mg/dL (muito alto risco) ou <70 mg/dL (alto risco)',
        'PA <130/80 mmHg',
        'HbA1c <7% se DM',
        'Cessação completa do tabagismo',
        'Controle de angina (CCS classe I-II)'
      ],
      examesIniciais: [
        'ECG de repouso',
        'Ecocardiograma',
        'Perfil lipídico',
        'Glicemia, HbA1c',
        'Função renal',
        'Teste ergométrico ou cintilografia'
      ],
      redFlags: [
        'Angina em repouso ou prolongada (>20 min)',
        'Angina de início recente (<2 meses)',
        'Angina em crescendo (piora progressiva)',
        'Alterações dinâmicas de ECG',
        'Instabilidade hemodinâmica',
        'Síncope com dor torácica'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '5-8% dos adultos >40 anos',
        incidencia: 'Principal causa de morte no mundo',
        faixaEtaria: 'Aumenta com idade, homens >45 anos, mulheres >55 anos',
        fatoresRisco: [
          'Hipertensão arterial',
          'Dislipidemia (LDL elevado, HDL baixo)',
          'Diabetes mellitus',
          'Tabagismo',
          'Obesidade',
          'Sedentarismo',
          'História familiar de DAC precoce',
          'Idade avançada'
        ],
        citations: [{ refId: 'esc-dac-2019' }]
      },
      fisiopatologia: {
        texto: 'Aterosclerose coronariana com formação de placas que reduzem o lúmen arterial. Quando a obstrução atinge >70%, o fluxo coronariano torna-se insuficiente durante esforço, causando isquemia e angina.',
        citations: [{ refId: 'esc-dac-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor/desconforto torácico retroesternal em aperto/pressão',
          'Irradiação para MSE, mandíbula, dorso',
          'Desencadeada por esforço físico, estresse emocional, frio',
          'Alivia com repouso (1-5 min) ou nitrato sublingual',
          'Equivalentes anginosos: dispneia, fadiga'
        ],
        sinaisExameFisico: [
          'Geralmente normal no período intercrítico',
          'B4 pode estar presente',
          'Sopro de insuficiência mitral transitório durante crise'
        ],
        formasClinicas: [
          'Angina típica: 3 características (localização típica, desencadeada por esforço, alivia com repouso/nitrato)',
          'Angina atípica: 2 características',
          'Dor torácica não cardíaca: 0-1 característica'
        ],
        citations: [{ refId: 'esc-dac-2019' }]
      },
      diagnostico: {
        criterios: [
          'História clínica compatível',
          'Teste funcional positivo para isquemia',
          'Ou anatomia coronária com estenose significativa (>50% TCE ou >70% outras)'
        ],
        diagnosticoDiferencial: [
          'Síndrome coronariana aguda',
          'Dissecção de aorta',
          'TEP',
          'Pericardite',
          'Espasmo esofágico',
          'Dor musculoesquelética'
        ],
        examesLaboratoriais: [
          'Perfil lipídico completo',
          'Glicemia, HbA1c',
          'Função renal',
          'Hemograma',
          'Troponina (para descartar SCA)'
        ],
        citations: [{ refId: 'esc-dac-2019' }]
      },
      tratamento: {
        objetivos: [
          'Aliviar sintomas',
          'Prevenir eventos cardiovasculares (IAM, morte)',
          'Melhorar qualidade de vida',
          'Controlar fatores de risco'
        ],
        naoFarmacologico: {
          medidas: [
            'Cessação absoluta do tabagismo',
            'Dieta mediterrânea ou DASH',
            'Exercício aeróbico regular (150 min/semana)',
            'Manutenção do peso ideal',
            'Reabilitação cardíaca'
          ],
          citations: [{ refId: 'esc-dac-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Antiagregante',
              medicamentos: ['AAS'],
              posologia: 'AAS 100mg/dia'
            },
            {
              classe: 'Estatina',
              medicamentos: ['Atorvastatina', 'Rosuvastatina'],
              posologia: 'Atorvastatina 40-80mg/dia (alta intensidade)'
            },
            {
              classe: 'Antianginoso',
              medicamentos: ['Atenolol', 'Metoprolol', 'Bisoprolol'],
              posologia: 'Atenolol 25-100mg/dia | Nitrato SL para crises'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Intolerância a betabloqueador',
              conduta: 'BCC (Anlodipino, Diltiazem) ou Ivabradina'
            },
            {
              situacao: 'DAC + DM',
              conduta: 'Considerar iSGLT2 ou GLP-1RA com benefício CV'
            }
          ],
          citations: [{ refId: 'esc-dac-2019' }]
        },
        duracao: 'Tratamento contínuo'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: [
          'Perfil lipídico a cada 6-12 meses',
          'Função renal anual',
          'ECG se mudança clínica'
        ],
        metasTerapeuticas: [
          'LDL-C na meta',
          'PA <130/80',
          'Ausência de angina ou angina controlada (CCS I)'
        ],
        criteriosEncaminhamento: [
          'Angina refratária ao tratamento clínico',
          'Angina instável',
          'Teste funcional com grande área de isquemia',
          'Disfunção ventricular esquerda'
        ],
        citations: [{ refId: 'esc-dac-2019' }]
      },
      prevencao: {
        primaria: [
          'Controle rigoroso de fatores de risco CV',
          'Estatina em alto risco',
          'Cessação do tabagismo'
        ],
        secundaria: [
          'AAS + estatina de alta intensidade',
          'Controle agressivo de LDL',
          'Reabilitação cardíaca'
        ],
        citations: [{ refId: 'esc-dac-2019' }]
      },
    },
    protocolos: [],
    medicamentos: ['aas', 'atorvastatina', 'atenolol', 'isossorbida'],
    calculadoras: ['risco-cv', 'cha2ds2-vasc'],
    rastreamentos: [],
    citations: [{ refId: 'esc-dac-2019' }],
    lastUpdate: '2024-12',
    tags: ['dac', 'angina', 'coronariopatia', 'aterosclerose', 'isquemia'],
  }
];

