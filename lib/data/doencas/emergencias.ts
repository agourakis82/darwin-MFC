/**
 * EMERGÊNCIAS MÉDICAS - DARWIN-MFC
 * =================================
 *
 * Condições de emergência para manejo na APS e referenciamento
 *
 * Ontologias integradas:
 * - DOID (Disease Ontology)
 * - SNOMED-CT (Systematized Nomenclature of Medicine)
 * - MeSH (Medical Subject Headings)
 * - UMLS CUI (Unified Medical Language System)
 */

import { Doenca } from '../../types/doenca';

export const doencasEmergencias: Doenca[] = [
  // ============================================================================
  // EMERGÊNCIAS CARDIOVASCULARES
  // ============================================================================
  {
    id: 'sindrome-coronariana-aguda',
    titulo: 'Síndrome Coronariana Aguda',
    sinonimos: ['SCA', 'Infarto agudo do miocárdio', 'IAM', 'IAMCSST', 'IAMSSST', 'Angina instável'],
    doid: 'DOID:0060158',
    snomedCT: '394659003',
    meshId: 'D054058',
    umlsCui: 'C0948089',
    ciap2: ['K74', 'K75', 'K76'],
    cid10: ['I20.0', 'I21', 'I21.0', 'I21.1', 'I21.2', 'I21.3', 'I21.4', 'I21.9'],
    cid11: ['BA41', 'BA42', 'BA80'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Espectro de isquemia miocárdica aguda incluindo angina instável, IAM sem supra de ST (IAMSSST) e IAM com supra de ST (IAMCSST). Representa emergência cardiovascular com necessidade de intervenção imediata.',
      criteriosDiagnosticos: [
        'Dor torácica típica: opressiva, retroesternal, irradiação para MSE/mandíbula, >20min',
        'Dispneia, sudorese fria, náuseas, síncope',
        'ECG: Supra de ST ≥1mm em 2 derivações contíguas (IAMCSST)',
        'ECG: Infra de ST, inversão de onda T (IAMSSST)',
        'Troponina elevada (curva ascendente)',
        'Escore HEART ≥4 pontos indica alto risco'
      ],
      classificacaoRisco: [
        { nivel: 'muito_alto', criterios: ['IAMCSST', 'Instabilidade hemodinâmica', 'Arritmia maligna'], conduta: 'Cateterismo de emergência <90min' },
        { nivel: 'alto', criterios: ['IAMSSST com troponina +', 'GRACE >140'], conduta: 'Cateterismo <24h' },
        { nivel: 'moderado', criterios: ['Angina instável', 'GRACE 109-140'], conduta: 'Avaliação invasiva em 72h' }
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'MONABCH: Monitor, Oxigênio (se SatO2<90%), Acesso venoso',
          'Repouso absoluto',
          'Desfibrilador à disposição'
        ],
        farmacologico: [
          'AAS 300mg mastigável imediatamente',
          'Clopidogrel 300-600mg (ou Ticagrelor 180mg)',
          'Heparina (HNF ou Enoxaparina)',
          'Morfina 2-4mg IV se dor refratária',
          'Nitrato SL (não usar se PAS<90, uso de sildenafil, IAM de VD)',
          'IAMCSST: Trombolítico (Tenecteplase) se >120min até ICP'
        ]
      },
      metasTerapeuticas: [
        'Reperfusão em <90min (ICP primária)',
        'Controle da dor',
        'Prevenção de arritmias',
        'Estabilização hemodinâmica'
      ],
      examesIniciais: [
        'ECG 12 derivações em <10min',
        'Troponina (0h, 1h, 3h)',
        'Hemograma, função renal, eletrólitos',
        'Coagulograma',
        'BNP/NT-proBNP',
        'Rx de tórax'
      ],
      redFlags: [
        'Hipotensão (PAS<90mmHg) - choque cardiogênico',
        'Taquiarritmia ou bradiarritmia',
        'Congestão pulmonar (Killip ≥II)',
        'Parada cardiorrespiratória',
        'Dissecção aórtica concomitante',
        'Sangramento ativo (contraindicação a anticoagulação)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Principal causa de morte no Brasil',
        incidencia: '~350.000 casos/ano no Brasil',
        mortalidade: '30% na fase aguda sem tratamento adequado',
        faixaEtaria: 'Aumenta progressivamente com idade, pico >60 anos',
        fatoresRisco: [
          'Hipertensão arterial',
          'Diabetes mellitus',
          'Dislipidemia',
          'Tabagismo',
          'Obesidade',
          'História familiar de DAC precoce',
          'Sedentarismo'
        ],
        citations: [{ refId: 'sbc-sca-2020' }]
      },
      fisiopatologia: {
        texto: 'Ruptura ou erosão de placa aterosclerótica vulnerável, com exposição do núcleo lipídico e formação de trombo. No IAMCSST há oclusão total; no IAMSSST/angina instável, oclusão parcial ou microembolização.',
        citations: [{ refId: 'esc-stemi-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor torácica opressiva/em aperto',
          'Irradiação para MSE, mandíbula, epigástrio, dorso',
          'Dispneia',
          'Sudorese fria (diaforese)',
          'Náuseas e vômitos',
          'Síncope',
          'Sensação de morte iminente'
        ],
        sinaisExameFisico: [
          'Palidez cutânea',
          'Taquicardia ou bradicardia',
          'B4 (rigidez ventricular)',
          'Estertores pulmonares (congestão)',
          'Hipotensão (mau prognóstico)',
          'Turgência jugular (IAM de VD)'
        ],
        formasClinicas: [
          'Angina instável: sem elevação de troponina',
          'IAMSSST: troponina elevada, sem supra de ST',
          'IAMCSST: supra de ST no ECG'
        ],
        citations: [{ refId: 'sbc-sca-2020' }]
      },
      diagnostico: {
        criterios: [
          'História clínica sugestiva',
          'ECG com alterações isquêmicas',
          'Elevação de troponina (curva)'
        ],
        diagnosticoDiferencial: [
          'Dissecção aórtica',
          'Embolia pulmonar',
          'Pericardite aguda',
          'Espasmo esofágico',
          'Pneumotórax',
          'Costocondrite'
        ],
        examesLaboratoriais: [
          'Troponina I ou T (alta sensibilidade)',
          'CK-MB (se troponina indisponível)',
          'Hemograma, creatinina, eletrólitos',
          'Glicemia, HbA1c',
          'Perfil lipídico'
        ],
        examesImagem: [
          'ECG 12 derivações',
          'Ecocardiograma transtorácico',
          'Rx de tórax',
          'Angiografia coronariana (cineangiocoronariografia)'
        ],
        citations: [{ refId: 'esc-stemi-2023' }]
      },
      tratamento: {
        objetivos: [
          'Reperfusão coronariana precoce',
          'Alívio da dor',
          'Prevenção de complicações',
          'Prevenção secundária'
        ],
        naoFarmacologico: {
          medidas: [
            'Repouso absoluto',
            'Monitorização contínua',
            'Oxigenoterapia se SatO2<90%',
            'Jejum inicial'
          ],
          citations: [{ refId: 'sbc-sca-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antiagregantes', medicamentos: ['AAS 300mg', 'Clopidogrel 600mg ou Ticagrelor 180mg'], posologia: 'Dose de ataque' },
            { classe: 'Anticoagulantes', medicamentos: ['Enoxaparina 1mg/kg SC 12/12h', 'HNF IV'], posologia: 'Até revascularização' },
            { classe: 'Analgesia', medicamentos: ['Morfina 2-4mg IV'], observacoes: 'Se dor refratária a nitrato' },
            { classe: 'Betabloqueador', medicamentos: ['Metoprolol 5mg IV'], observacoes: 'Se não houver contraindicação' }
          ],
          citations: [{ refId: 'esc-stemi-2023' }]
        },
        duracao: 'Internação + terapia dupla antiagregante por 12 meses'
      },
      acompanhamento: {
        frequenciaConsultas: 'Primeira consulta em 7-14 dias pós-alta, depois mensal por 3 meses',
        examesControle: ['Ecocardiograma em 4-6 semanas', 'Perfil lipídico', 'HbA1c', 'Função renal'],
        metasTerapeuticas: [
          'LDL <55 mg/dL',
          'PA <130/80 mmHg',
          'HbA1c <7% se diabético',
          'Cessação tabágica',
          'Reabilitação cardíaca'
        ],
        criteriosEncaminhamento: [
          'Todo IAMCSST: emergência/cardiologia intervencionista',
          'IAMSSST de alto risco',
          'Complicações mecânicas',
          'Arritmias sustentadas'
        ],
        citations: [{ refId: 'sbc-sca-2020' }]
      },
      prevencao: {
        primaria: [
          'Controle de fatores de risco',
          'Estatina em alto risco cardiovascular',
          'AAS em prevenção primária (controverso)'
        ],
        secundaria: [
          'Terapia dupla antiagregante',
          'Estatina de alta potência',
          'Betabloqueador',
          'IECA/BRA',
          'Reabilitação cardíaca'
        ],
        citations: [{ refId: 'sbc-sca-2020' }]
      }
    },
    protocolos: ['manejo-sca', 'anticoagulacao-sca'],
    medicamentos: ['aas', 'clopidogrel', 'ticagrelor', 'enoxaparina', 'morfina'],
    calculadoras: ['heart-score', 'grace-score', 'timi-score'],
    citations: [
      { refId: 'sbc-sca-2020' },
      { refId: 'esc-stemi-2023' },
      { refId: 'aha-ua-nstemi-2021' }
    ],
    lastUpdate: '2024-12-23'
  },

  // ============================================================================
  // AVC ISQUÊMICO
  // ============================================================================
  {
    id: 'avc-isquemico',
    titulo: 'Acidente Vascular Cerebral Isquêmico',
    sinonimos: ['AVC', 'AVCi', 'Derrame cerebral', 'Stroke isquêmico', 'Infarto cerebral'],
    doid: 'DOID:3455',
    snomedCT: '422504002',
    meshId: 'D002544',
    umlsCui: 'C0007785',
    ciap2: ['K90'],
    cid10: ['I63', 'I63.0', 'I63.1', 'I63.2', 'I63.3', 'I63.4', 'I63.5', 'I63.8', 'I63.9'],
    cid11: ['8B11'],
    categoria: 'neurologico',
    quickView: {
      definicao: 'Déficit neurológico focal de início súbito causado por isquemia cerebral. Emergência neurológica com janela terapêutica crítica para trombólise (4,5h) e trombectomia mecânica (até 24h em casos selecionados).',
      criteriosDiagnosticos: [
        'Déficit neurológico focal de início súbito',
        'FAST: Face (assimetria), Arm (fraqueza), Speech (alteração fala), Time',
        'NIHSS para quantificar gravidade',
        'TC de crânio: exclui hemorragia (pode ser normal nas primeiras horas)',
        'Angio-TC/RM: identifica oclusão de grande vaso',
        'Tempo de início dos sintomas é crítico'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'ABC - estabilização clínica',
          'Cabeceira a 0° (sem hipertensão intracraniana)',
          'Acesso venoso periférico (evitar subclávia)',
          'Monitorização contínua',
          'Glicemia capilar'
        ],
        farmacologico: [
          'TROMBÓLISE IV (se <4,5h do início):',
          'Alteplase (rtPA) 0,9mg/kg (máx 90mg) - 10% em bolus, 90% em 1h',
          'OU Tenecteplase 0,25mg/kg em bolus único',
          '',
          'NÃO REDUZIR PA SE <220/120 (candidato a trombólise: <185/110)',
          'AAS 100-300mg após 24h da trombólise',
          'Estatina de alta potência'
        ]
      },
      metasTerapeuticas: [
        'Trombólise em <60min da chegada (door-to-needle)',
        'Trombectomia em <90min se indicada',
        'Prevenir transformação hemorrágica',
        'Reabilitação precoce'
      ],
      examesIniciais: [
        'TC de crânio sem contraste (exclui hemorragia)',
        'Glicemia capilar',
        'ECG 12 derivações',
        'Hemograma, TP/INR, plaquetas',
        'Função renal, eletrólitos',
        'Angio-TC (se oclusão de grande vaso)'
      ],
      redFlags: [
        'PA >185/110 em candidato a trombólise',
        'Glicemia <50 ou >400 mg/dL',
        'INR >1,7 ou uso de anticoagulante',
        'Plaquetas <100.000',
        'Sangramento ativo',
        'AVC/TCE grave nos últimos 3 meses',
        'Cirurgia de grande porte nos últimos 14 dias'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2ª causa de morte no Brasil',
        incidencia: '~400.000 casos/ano no Brasil',
        mortalidade: '30% em 30 dias, principal causa de incapacidade',
        faixaEtaria: 'Aumenta com idade, >55 anos maior risco',
        fatoresRisco: [
          'Hipertensão arterial (principal)',
          'Fibrilação atrial',
          'Diabetes mellitus',
          'Dislipidemia',
          'Tabagismo',
          'Cardiopatia estrutural',
          'AVC/AIT prévio',
          'Estenose carotídea'
        ],
        citations: [{ refId: 'sbn-avc-2022' }]
      },
      fisiopatologia: {
        texto: 'Oclusão arterial por trombo (cardioembólico, aterotrómbico ou lacunar) levando a isquemia cerebral. Existe uma área de penumbra potencialmente salvável ao redor do core isquêmico. A janela terapêutica visa salvar essa penumbra.',
        citations: [{ refId: 'aha-stroke-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Hemiparesia/hemiplegia',
          'Hemi-hipoestesia',
          'Afasia (motora, sensorial, mista)',
          'Disartria',
          'Hemianopsia',
          'Ataxia',
          'Vertigem',
          'Diplopia',
          'Alteração do nível de consciência'
        ],
        sinaisExameFisico: [
          'Déficit motor focal',
          'Desvio de rima',
          'Sinal de Babinski',
          'Alteração de reflexos',
          'Negligência hemiespacial',
          'Sopro carotídeo'
        ],
        formasClinicas: [
          'AVC de território carotídeo (circulação anterior)',
          'AVC de território vertebrobasilar (circulação posterior)',
          'AVC lacunar (pequenos vasos)',
          'AIT (sintomas <24h com neuroimagem normal)'
        ],
        citations: [{ refId: 'sbn-avc-2022' }]
      },
      diagnostico: {
        criterios: [
          'Déficit neurológico focal súbito',
          'TC sem hemorragia',
          'Exclusão de mimetizadores (hipoglicemia, crise epiléptica)'
        ],
        diagnosticoDiferencial: [
          'AVC hemorrágico',
          'Hipoglicemia',
          'Crise epiléptica pós-ictal (paralisia de Todd)',
          'Enxaqueca com aura',
          'Tumor cerebral',
          'Encefalite',
          'Transtorno conversivo'
        ],
        examesLaboratoriais: [
          'Glicemia (obrigatório antes de trombólise)',
          'Hemograma completo',
          'TP/INR, TTPa',
          'Função renal, eletrólitos',
          'Troponina (se suspeita de cardiopatia)'
        ],
        examesImagem: [
          'TC de crânio sem contraste',
          'Angio-TC de vasos cervicais e intracranianos',
          'RM de crânio (difusão)',
          'Ecocardiograma (pesquisa fonte embólica)',
          'Doppler de carótidas'
        ],
        citations: [{ refId: 'aha-stroke-2019' }]
      },
      tratamento: {
        objetivos: [
          'Recanalização arterial',
          'Minimizar área de infarto',
          'Prevenir complicações',
          'Identificar etiologia para prevenção secundária'
        ],
        naoFarmacologico: {
          medidas: [
            'Monitorização neurológica intensiva',
            'Controle de temperatura (evitar hipertermia)',
            'Cabeceira a 0-15°',
            'Fisioterapia/fonoaudiologia precoce',
            'Prevenção de broncoaspiração'
          ],
          citations: [{ refId: 'sbn-avc-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Trombolítico', medicamentos: ['Alteplase 0,9mg/kg', 'Tenecteplase 0,25mg/kg'], posologia: 'Dose única', observacoes: 'Janela <4,5h' },
            { classe: 'Antiagregante', medicamentos: ['AAS 100-300mg/dia'], posologia: 'Após 24h da trombólise' },
            { classe: 'Estatina', medicamentos: ['Atorvastatina 40-80mg', 'Rosuvastatina 20-40mg'], posologia: '1x/dia' }
          ],
          segundaLinha: [
            { classe: 'Anticoagulação', medicamentos: ['Rivaroxabana', 'Apixabana', 'Varfarina'], observacoes: 'Se FA, após 3-14 dias dependendo do tamanho do AVC' }
          ],
          citations: [{ refId: 'aha-stroke-2019' }]
        },
        duracao: 'Prevenção secundária vitalícia'
      },
      acompanhamento: {
        frequenciaConsultas: 'Alta da unidade de AVC em 5-7 dias, depois mensal por 3 meses',
        examesControle: ['TC/RM de controle', 'Ecocardiograma', 'Holter 24-72h', 'Doppler carotídeo'],
        metasTerapeuticas: [
          'PA <130/80 mmHg',
          'LDL <70 mg/dL (ou <55 se muito alto risco)',
          'HbA1c <7%',
          'INR 2-3 se varfarina',
          'Reabilitação neurológica'
        ],
        criteriosEncaminhamento: [
          'Todo AVC agudo: Unidade de AVC/Neurologia',
          'Estenose carotídea >50% sintomática: Cirurgia vascular',
          'Jovem sem fator de risco: investigação de trombofilias'
        ],
        citations: [{ refId: 'sbn-avc-2022' }]
      },
      prevencao: {
        primaria: [
          'Controle da HAS',
          'Anticoagulação em FA (CHA2DS2-VASc)',
          'Estatina em alto risco',
          'Cessação do tabagismo'
        ],
        secundaria: [
          'Antiagregação ou anticoagulação',
          'Estatina de alta potência',
          'Controle rigoroso de fatores de risco',
          'Revascularização carotídea se indicada'
        ],
        citations: [{ refId: 'aha-stroke-2019' }]
      }
    },
    protocolos: ['codigo-avc', 'trombolise-avc', 'investigacao-avc-jovem'],
    medicamentos: ['alteplase', 'aas', 'clopidogrel', 'atorvastatina', 'rivaroxabana'],
    calculadoras: ['nihss', 'abcd2', 'chads2-vasc'],
    citations: [
      { refId: 'sbn-avc-2022' },
      { refId: 'aha-stroke-2019' },
      { refId: 'eso-stroke-2021' }
    ],
    lastUpdate: '2024-12-23'
  },

  // ============================================================================
  // ANAFILAXIA
  // ============================================================================
  {
    id: 'anafilaxia',
    titulo: 'Anafilaxia',
    sinonimos: ['Reação anafilática', 'Choque anafilático', 'Anafilaxia sistêmica'],
    doid: 'DOID:5841',
    snomedCT: '39579001',
    meshId: 'D000707',
    umlsCui: 'C0002792',
    ciap2: ['A92'],
    cid10: ['T78.2', 'T78.0', 'T80.5', 'T88.6'],
    cid11: ['4A84'],
    categoria: 'outros',
    quickView: {
      definicao: 'Reação de hipersensibilidade sistêmica grave, potencialmente fatal, de início rápido após exposição a alérgeno. Requer reconhecimento e tratamento imediato com adrenalina.',
      criteriosDiagnosticos: [
        'CRITÉRIO 1: Início agudo com envolvimento cutâneo/mucoso + comprometimento respiratório OU hipotensão',
        'CRITÉRIO 2: ≥2 dos seguintes após exposição provável: pele/mucosas, respiratório, hipotensão, TGI',
        'CRITÉRIO 3: Hipotensão após alérgeno conhecido',
        'Tempo: minutos a horas após exposição',
        'Gatilhos comuns: medicamentos, alimentos, insetos, látex'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'REMOVER ALÉRGENO se possível',
          'Posicionar paciente (Trendelenburg se hipotenso)',
          'ABC - via aérea, oxigênio',
          'Acesso venoso calibroso',
          'Monitorização contínua'
        ],
        farmacologico: [
          'ADRENALINA IM 0,3-0,5mg (0,01mg/kg) face anterolateral da coxa',
          'Repetir a cada 5-15min se necessário',
          'SF 0,9% 20mL/kg em bolus se hipotensão',
          'Difenidramina 25-50mg IV (adjuvante)',
          'Ranitidina 50mg IV (adjuvante)',
          'Metilprednisolona 1-2mg/kg IV (prevenir bifásica)'
        ]
      },
      metasTerapeuticas: [
        'Estabilização hemodinâmica',
        'Reversão do broncoespasmo',
        'Prevenção de reação bifásica',
        'Identificação do alérgeno'
      ],
      examesIniciais: [
        'Triptase sérica (colher em até 1h, repetir em 24h)',
        'ECG (se sintomas cardiovasculares)',
        'Gasometria arterial (se dispneia grave)',
        'Observação por 4-6h mínimo'
      ],
      redFlags: [
        'Estridor ou sibilância grave (edema de via aérea)',
        'Hipotensão refratária a adrenalina',
        'Necessidade de >2 doses de adrenalina',
        'Uso de betabloqueador (resposta atenuada)',
        'Asma grave prévia',
        'Reação bifásica (recorrência em 1-72h)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,05-2% da população geral',
        incidencia: '50-112 casos/100.000 pessoas-ano',
        mortalidade: '0,5-1% dos casos, maior em adolescentes/adultos jovens',
        faixaEtaria: 'Qualquer idade; alimentos mais comuns em crianças, medicamentos em adultos',
        fatoresRisco: [
          'História prévia de anafilaxia',
          'Asma (especialmente mal controlada)',
          'Mastocitose sistêmica',
          'Uso de betabloqueadores ou IECA',
          'Exercício pós-prandial',
          'Alergia a amendoim/nozes (maior risco de fatal)'
        ],
        citations: [{ refId: 'wao-anaphylaxis-2020' }]
      },
      fisiopatologia: {
        texto: 'Reação mediada por IgE (maioria) ou não-IgE com degranulação maciça de mastócitos e basófilos, liberando histamina, triptase, leucotrienos e prostaglandinas. Causa vasodilatação, aumento da permeabilidade vascular, broncoconstrição e estímulo de terminações nervosas.',
        citations: [{ refId: 'eaaci-anaphylaxis-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Urticária, prurido, flush',
          'Angioedema (lábios, língua, pálpebras)',
          'Dispneia, sibilância, estridor',
          'Dor abdominal, náuseas, vômitos, diarreia',
          'Tontura, síncope',
          'Sensação de morte iminente'
        ],
        sinaisExameFisico: [
          'Urticária generalizada',
          'Edema de lábios/língua/úvula',
          'Sibilos, roncos, estridor',
          'Hipotensão, taquicardia',
          'Alteração do nível de consciência',
          'Cianose'
        ],
        formasClinicas: [
          'Anafilaxia unipolar (único episódio)',
          'Anafilaxia bifásica (recorrência em 1-72h)',
          'Anafilaxia protaída (sintomas persistentes)',
          'Anafilaxia induzida por exercício'
        ],
        citations: [{ refId: 'wao-anaphylaxis-2020' }]
      },
      diagnostico: {
        criterios: [
          'Critérios clínicos da WAO (World Allergy Organization)',
          'Início rápido após exposição',
          'Resposta a adrenalina suporta diagnóstico'
        ],
        diagnosticoDiferencial: [
          'Urticária/angioedema isolados',
          'Crise de asma',
          'Síncope vasovagal',
          'Ataque de pânico',
          'Síndrome carcinoide',
          'Mastocitose sistêmica',
          'Choque séptico'
        ],
        examesLaboratoriais: [
          'Triptase sérica (pico em 1-2h)',
          'Histamina plasmática (meia-vida curta)',
          'IgE específica posteriormente'
        ],
        citations: [{ refId: 'eaaci-anaphylaxis-2021' }]
      },
      tratamento: {
        objetivos: [
          'Estabilização imediata',
          'Prevenção de progressão',
          'Prevenção de reação bifásica',
          'Educação e prevenção secundária'
        ],
        naoFarmacologico: {
          medidas: [
            'Remover gatilho se possível',
            'Posição supina com MMII elevados',
            'Oxigênio suplementar',
            'Acesso venoso calibroso',
            'Preparo para IOT se edema de via aérea'
          ],
          citations: [{ refId: 'wao-anaphylaxis-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Adrenalina', medicamentos: ['Adrenalina 1:1000 (1mg/mL)'], posologia: '0,3-0,5mg IM (0,01mg/kg em crianças, máx 0,5mg)', observacoes: 'Face anterolateral da coxa. Repetir a cada 5-15min' }
          ],
          segundaLinha: [
            { classe: 'Anti-histamínico H1', medicamentos: ['Difenidramina 25-50mg IV', 'Prometazina 25mg IM'], observacoes: 'Adjuvante, não substitui adrenalina' },
            { classe: 'Anti-histamínico H2', medicamentos: ['Ranitidina 50mg IV'], observacoes: 'Pode ajudar em sintomas cutâneos' },
            { classe: 'Corticoide', medicamentos: ['Metilprednisolona 1-2mg/kg IV', 'Hidrocortisona 200mg IV'], observacoes: 'Pode prevenir bifásica, sem efeito imediato' },
            { classe: 'Broncodilatador', medicamentos: ['Salbutamol 4-8 jatos ou nebulização'], observacoes: 'Se broncoespasmo' }
          ],
          situacoesEspeciais: [
            { situacao: 'Uso de betabloqueador', conduta: 'Glucagon 1-5mg IV se refratário a adrenalina' },
            { situacao: 'Choque refratário', conduta: 'Adrenalina IV 0,1-0,5mcg/kg/min em BIC' }
          ],
          citations: [{ refId: 'eaaci-anaphylaxis-2021' }]
        },
        duracao: 'Observação mínima 4-6h (até 24h se grave ou bifásica prévia)'
      },
      acompanhamento: {
        frequenciaConsultas: 'Alergista em 2-4 semanas após alta',
        metasTerapeuticas: [
          'Identificação do alérgeno',
          'Prescrição de auto-injetor de adrenalina',
          'Educação do paciente e familiares',
          'Plano de ação escrito'
        ],
        criteriosEncaminhamento: [
          'Todo paciente: Alergista para investigação',
          'Considerar imunoterapia se veneno de inseto',
          'Dessensibilização se medicamento essencial'
        ],
        citations: [{ refId: 'wao-anaphylaxis-2020' }]
      },
      prevencao: {
        primaria: [
          'Identificação e evitação de alérgenos',
          'Leitura de rótulos de alimentos',
          'Alertas médicos em prontuário'
        ],
        secundaria: [
          'Portar auto-injetor de adrenalina sempre',
          'Pulseira de identificação médica',
          'Educação de familiares e cuidadores',
          'Plano de emergência escrito'
        ],
        citations: [{ refId: 'eaaci-anaphylaxis-2021' }]
      }
    },
    protocolos: ['anafilaxia-emergencia', 'choque-anafilatico'],
    medicamentos: ['adrenalina', 'difenidramina', 'metilprednisolona', 'ranitidina'],
    calculadoras: [],
    citations: [
      { refId: 'wao-anaphylaxis-2020' },
      { refId: 'eaaci-anaphylaxis-2021' },
      { refId: 'asbai-anafilaxia-2022' }
    ],
    lastUpdate: '2024-12-23'
  },

  // ============================================================================
  // SEPSE
  // ============================================================================
  {
    id: 'sepse',
    titulo: 'Sepse e Choque Séptico',
    sinonimos: ['Septicemia', 'Síndrome séptica', 'Choque séptico', 'Infecção generalizada'],
    doid: 'DOID:0080009',
    snomedCT: '91302008',
    meshId: 'D018805',
    umlsCui: 'C0036690',
    ciap2: ['A78'],
    cid10: ['A41', 'A41.9', 'R65.1', 'R57.2'],
    cid11: ['1G40'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Disfunção orgânica potencialmente fatal causada por resposta desregulada do hospedeiro à infecção. Choque séptico: sepse + necessidade de vasopressores + lactato >2mmol/L apesar de reposição volêmica.',
      criteriosDiagnosticos: [
        'SEPSE: Infecção suspeita/confirmada + SOFA ≥2 pontos',
        'qSOFA (triagem): ≥2 de: FR≥22, PAS≤100, alteração mental',
        'CHOQUE SÉPTICO: Sepse + vasopressor para PAM≥65 + Lactato>2 após volume',
        'Identificar foco infeccioso',
        'Hemoculturas antes de antibiótico (sem atrasar ATB)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Identificar e controlar foco (drenagem de abscesso, remoção de cateter)',
          'Acesso venoso calibroso (idealmente central)',
          'Monitorização contínua',
          'Sondagem vesical para débito urinário'
        ],
        farmacologico: [
          'HORA 1 (Bundles Surviving Sepsis):',
          'Lactato (repetir se inicial >2)',
          'Hemoculturas (2 sets) antes do ATB',
          'Antibiótico de amplo espectro <1h',
          'SF 0,9% 30mL/kg se hipotensão ou lactato≥4',
          'Noradrenalina se PAM<65 após volume',
          '',
          'ATB empírico conforme foco suspeito:',
          'Pulmonar: Ceftriaxona + Azitromicina',
          'Abdominal: Piperacilina-Tazobactam ou Meropenem',
          'Urinário: Ceftriaxona ou Ciprofloxacino',
          'Pele: Oxacilina + Clindamicina'
        ]
      },
      metasTerapeuticas: [
        'PAM ≥65 mmHg',
        'Débito urinário ≥0,5 mL/kg/h',
        'Normalização do lactato',
        'Melhora da consciência',
        'Controle do foco infeccioso'
      ],
      examesIniciais: [
        'Lactato sérico',
        'Hemoculturas (2 sets antes do ATB)',
        'Hemograma, creatinina, bilirrubinas',
        'Gasometria arterial',
        'Coagulograma',
        'Procalcitonina (se disponível)',
        'Rx de tórax, EAS/urocultura, imagem conforme foco'
      ],
      redFlags: [
        'Lactato >4 mmol/L',
        'Hipotensão refratária a volume',
        'Disfunção de múltiplos órgãos',
        'Alteração importante do nível de consciência',
        'Coagulopatia (CIVD)',
        'Imunossupressão grave'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '~30 milhões de casos/ano no mundo',
        incidencia: '200-300 casos/100.000 habitantes/ano em países desenvolvidos',
        mortalidade: '25-30% na sepse, 40-50% no choque séptico',
        faixaEtaria: 'Extremos de idade (neonatos e idosos) mais vulneráveis',
        fatoresRisco: [
          'Idade avançada',
          'Imunossupressão',
          'Diabetes mellitus',
          'Neoplasias',
          'Doença renal/hepática crônica',
          'Dispositivos invasivos (cateter, sonda)',
          'Hospitalização recente',
          'Cirurgia recente'
        ],
        citations: [{ refId: 'ilas-sepse-2023' }]
      },
      fisiopatologia: {
        texto: 'Resposta imune desregulada à infecção com liberação maciça de citocinas (tempestade de citocinas), ativação de cascata de coagulação, disfunção endotelial e vasodilatação. Resulta em hipoperfusão tecidual, disfunção orgânica e potencial óbito.',
        citations: [{ refId: 'sepsis-3' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Febre ou hipotermia',
          'Calafrios',
          'Taquicardia, taquipneia',
          'Confusão mental, agitação ou letargia',
          'Oligúria',
          'Sinais do foco infeccioso'
        ],
        sinaisExameFisico: [
          'Hipotensão',
          'Taquicardia',
          'Taquipneia',
          'Alteração do sensório',
          'Tempo de enchimento capilar >3s',
          'Pele mosqueada/lívedo',
          'Extremidades frias'
        ],
        formasClinicas: [
          'Sepse sem choque',
          'Choque séptico',
          'Sepse com disfunção de órgão específico (IRA, SDRA, etc.)'
        ],
        citations: [{ refId: 'sepsis-3' }]
      },
      diagnostico: {
        criterios: [
          'Sepsis-3: SOFA ≥2 + infecção',
          'qSOFA para triagem (não diagnóstico)',
          'Identificação do foco e agente'
        ],
        diagnosticoDiferencial: [
          'Choque cardiogênico',
          'Choque hipovolêmico',
          'Choque anafilático',
          'SIRS não infecciosa (pancreatite, queimaduras)',
          'Insuficiência adrenal aguda'
        ],
        examesLaboratoriais: [
          'Hemoculturas (2 sets)',
          'Lactato arterial',
          'Procalcitonina',
          'Hemograma (leucocitose ou leucopenia)',
          'Função renal e hepática',
          'Coagulograma (plaquetopenia, alargamento TP)',
          'Gasometria arterial'
        ],
        examesImagem: [
          'Rx de tórax',
          'TC conforme suspeita (abdome, pelve)',
          'Ecocardiograma (se disfunção cardíaca ou suspeita de endocardite)'
        ],
        citations: [{ refId: 'ilas-sepse-2023' }]
      },
      tratamento: {
        objetivos: [
          'Ressuscitação hemodinâmica precoce',
          'Antibioticoterapia adequada <1h',
          'Controle do foco infeccioso',
          'Suporte de disfunções orgânicas'
        ],
        naoFarmacologico: {
          medidas: [
            'Acesso venoso central',
            'Cateter de PAM invasiva',
            'Controle de foco (drenagem, debridamento, remoção de dispositivo)',
            'Ventilação protetora se SDRA',
            'Terapia de substituição renal se necessário'
          ],
          citations: [{ refId: 'surviving-sepsis-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antibiótico', medicamentos: ['Piperacilina-Tazobactam', 'Meropenem', 'Ceftriaxona + Metronidazol'], posologia: 'Dose máxima, ajuste renal', observacoes: 'Iniciar <1h do reconhecimento' },
            { classe: 'Cristaloide', medicamentos: ['SF 0,9%', 'Ringer Lactato'], posologia: '30mL/kg nas primeiras 3h se hipotensão/lactato≥4' },
            { classe: 'Vasopressor', medicamentos: ['Noradrenalina 0,1-2mcg/kg/min'], posologia: 'Titular para PAM≥65', observacoes: 'Primeira escolha' }
          ],
          segundaLinha: [
            { classe: 'Vasopressor adicional', medicamentos: ['Vasopressina 0,01-0,04 U/min'], observacoes: 'Se noradrenalina insuficiente' },
            { classe: 'Inotrópico', medicamentos: ['Dobutamina 2,5-20mcg/kg/min'], observacoes: 'Se baixo débito cardíaco' },
            { classe: 'Corticoide', medicamentos: ['Hidrocortisona 200mg/dia'], observacoes: 'Se refratário a vasopressores' }
          ],
          citations: [{ refId: 'surviving-sepsis-2021' }]
        },
        duracao: 'ATB por 7-10 dias na maioria; ajustar conforme foco e resposta'
      },
      acompanhamento: {
        frequenciaConsultas: 'Reavaliação contínua na fase aguda',
        examesControle: ['Lactato seriado', 'Função renal', 'Hemograma', 'Culturas de vigilância'],
        metasTerapeuticas: [
          'Clareamento do lactato',
          'Desmame de vasopressores',
          'Débito urinário >0,5mL/kg/h',
          'Resolução da disfunção orgânica'
        ],
        criteriosEncaminhamento: [
          'Todo paciente com sepse: UTI ou unidade de cuidados intensivos',
          'Cirurgia se foco cirúrgico',
          'Infectologista para casos complexos'
        ],
        citations: [{ refId: 'ilas-sepse-2023' }]
      },
      prevencao: {
        primaria: [
          'Vacinação (pneumocócica, influenza)',
          'Higiene de mãos',
          'Prevenção de infecções hospitalares',
          'Manejo adequado de dispositivos invasivos'
        ],
        secundaria: [
          'Reconhecimento precoce de infecções',
          'Tratamento adequado de infecções comunitárias',
          'Bundle da hora 1'
        ],
        citations: [{ refId: 'surviving-sepsis-2021' }]
      }
    },
    protocolos: ['sepse-bundle-1h', 'choque-septico', 'atb-empirico-sepse'],
    medicamentos: ['noradrenalina', 'meropenem', 'piperacilina-tazobactam', 'vancomicina'],
    calculadoras: ['sofa', 'qsofa', 'apache-ii'],
    citations: [
      { refId: 'sepsis-3' },
      { refId: 'surviving-sepsis-2021' },
      { refId: 'ilas-sepse-2023' }
    ],
    lastUpdate: '2024-12-23'
  },

  // ============================================================================
  // INTOXICAÇÃO EXÓGENA
  // ============================================================================
  {
    id: 'intoxicacao-exogena',
    titulo: 'Intoxicação Exógena Aguda',
    sinonimos: ['Envenenamento', 'Intoxicação por drogas', 'Overdose', 'Intoxicação medicamentosa'],
    doid: 'DOID:3571',
    snomedCT: '75478009',
    meshId: 'D011041',
    umlsCui: 'C0032343',
    ciap2: ['A84', 'A86'],
    cid10: ['T36-T65', 'T50.9', 'X40-X49'],
    cid11: ['NE61'],
    categoria: 'outros',
    quickView: {
      definicao: 'Exposição a substâncias tóxicas (medicamentos, drogas, produtos químicos, plantas, animais peçonhentos) resultando em manifestações clínicas potencialmente graves. Requer identificação do agente e tratamento específico.',
      criteriosDiagnosticos: [
        'História de exposição (intencional ou acidental)',
        'Quadro clínico compatível (toxíndrome)',
        'TOXÍNDROMES CLÁSSICAS:',
        'Colinérgica: SLUDGE (salivação, lacrimejamento, urina, diarreia, gastrointestinal, êmese) + miose + bradicardia',
        'Anticolinérgica: "blind, red, dry, hot, mad" + midríase + taquicardia',
        'Simpatomimética: taquicardia, HAS, midríase, hipertermia, agitação',
        'Opioidérgica: miose puntiforme, depressão respiratória, coma',
        'Sedativo-hipnótica: depressão do SNC, hipotensão, hipotermia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'ABC - via aérea é prioridade',
          'Descontaminação cutânea/ocular se exposição externa',
          'Monitorização contínua',
          'Acesso venoso',
          'ECG (avaliar QRS, QTc)'
        ],
        farmacologico: [
          'ANTÍDOTOS ESPECÍFICOS (quando disponíveis):',
          'Opioides: Naloxona 0,4-2mg IV (repetir até 10mg)',
          'Benzodiazepínicos: Flumazenil 0,2-0,5mg IV (cuidado!)',
          'Organofosforados: Atropina 2-4mg IV + Pralidoxima',
          'Paracetamol: N-acetilcisteína',
          'Antidepressivos tricíclicos: Bicarbonato de sódio se QRS>100ms',
          'Betabloqueadores: Glucagon 5-10mg IV',
          'Carvão ativado 1g/kg se <1h da ingestão (sem contraindicações)'
        ]
      },
      metasTerapeuticas: [
        'Estabilização do paciente',
        'Identificação do agente tóxico',
        'Descontaminação quando indicada',
        'Administração de antídoto específico',
        'Prevenção de complicações'
      ],
      examesIniciais: [
        'Glicemia capilar (SEMPRE)',
        'ECG 12 derivações',
        'Gasometria arterial',
        'Eletrólitos (incluindo Ca, Mg)',
        'Função renal e hepática',
        'Hemograma, coagulograma',
        'Screening toxicológico (urina)',
        'Níveis séricos específicos se disponíveis (paracetamol, salicilato, lítio, digoxina)'
      ],
      redFlags: [
        'Depressão respiratória (FR<12)',
        'Arritmias (QRS>100ms, QTc>500ms)',
        'Convulsões',
        'Hipotensão refratária',
        'Hipertermia maligna',
        'Rabdomiólise',
        'Alteração do nível de consciência'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '~2,5 milhões de exposições/ano nos EUA',
        incidencia: 'No Brasil: ~100.000 casos/ano notificados (subnotificação)',
        mortalidade: 'Varia conforme agente; opioides e pesticidas com maior mortalidade',
        faixaEtaria: 'Crianças <6 anos: maioria acidental; Adolescentes/adultos: intencional',
        fatoresRisco: [
          'Acesso a medicamentos',
          'Transtornos psiquiátricos',
          'Uso de drogas ilícitas',
          'Trabalho agrícola (pesticidas)',
          'Crianças pequenas (exploração oral)'
        ],
        citations: [{ refId: 'aapcc-annual-report-2022' }]
      },
      fisiopatologia: {
        texto: 'Varia conforme o agente: ligação a receptores específicos, inibição enzimática, alteração de canais iônicos, dano celular direto. Cada toxíndrome reflete o mecanismo predominante do agente envolvido.',
        citations: [{ refId: 'goldfrank-toxicology' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Alteração do nível de consciência',
          'Náuseas e vômitos',
          'Convulsões',
          'Arritmias',
          'Alteração pupilar',
          'Alteração de temperatura corporal',
          'Alterações neuromusculares'
        ],
        sinaisExameFisico: [
          'Tamanho pupilar (miose vs midríase)',
          'Sudorese ou ressecamento de mucosas',
          'Frequência cardíaca e ritmo',
          'Temperatura corporal',
          'Estado mental',
          'Peristalse (aumentada vs diminuída)',
          'Odores característicos'
        ],
        formasClinicas: [
          'Toxíndrome colinérgica (organofosforados, carbamatos)',
          'Toxíndrome anticolinérgica (anti-histamínicos, ATCs, escopolamina)',
          'Toxíndrome simpatomimética (cocaína, anfetaminas)',
          'Toxíndrome opioidérgica (morfina, fentanil, heroína)',
          'Toxíndrome sedativo-hipnótica (benzodiazepínicos, barbitúricos)'
        ],
        citations: [{ refId: 'goldfrank-toxicology' }]
      },
      diagnostico: {
        criterios: [
          'História de exposição',
          'Toxíndrome compatível',
          'Exclusão de outras causas',
          'Níveis séricos quando disponíveis'
        ],
        diagnosticoDiferencial: [
          'Hipoglicemia',
          'AVC',
          'Encefalopatia metabólica',
          'Infecção do SNC',
          'Transtornos psiquiátricos',
          'Trauma craniano'
        ],
        examesLaboratoriais: [
          'Glicemia',
          'Gasometria com lactato',
          'Eletrólitos, osmolaridade',
          'Função renal e hepática',
          'CK (rabdomiólise)',
          'Coagulograma',
          'Screening toxicológico',
          'Níveis específicos (paracetamol, salicilato, digoxina, lítio, etc.)'
        ],
        examesImagem: [
          'Rx de tórax (aspiração)',
          'Rx de abdome (body packer)',
          'TC de crânio se alteração persistente do sensório'
        ],
        citations: [{ refId: 'sbpt-intoxicacoes-2021' }]
      },
      tratamento: {
        objetivos: [
          'Estabilização clínica',
          'Descontaminação',
          'Antídoto específico',
          'Suporte das disfunções orgânicas',
          'Avaliação psiquiátrica (se intencional)'
        ],
        naoFarmacologico: {
          medidas: [
            'Intubação orotraqueal se necessário',
            'Lavagem gástrica (contraindicações: corrosivos, hidrocarbonetos, <1h)',
            'Carvão ativado (se <1h, agente adsorvível, via aérea protegida)',
            'Irrigação intestinal total (body packer, Fe, Li, liberação prolongada)',
            'Hemodiálise (salicilatos, metanol, etilenoglicol, lítio)'
          ],
          citations: [{ refId: 'goldfrank-toxicology' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antídotos', medicamentos: ['Naloxona (opioides)', 'Atropina (organofosforados)', 'N-acetilcisteína (paracetamol)', 'Flumazenil (BZD)', 'Bicarbonato (ATCs)'], observacoes: 'Uso conforme agente identificado' }
          ],
          situacoesEspeciais: [
            { situacao: 'Paracetamol', conduta: 'N-acetilcisteína se nível acima da linha de tratamento no nomograma' },
            { situacao: 'Organofosforados', conduta: 'Atropina até secar secreções + Pralidoxima nas primeiras 24-48h' },
            { situacao: 'Antidepressivos tricíclicos', conduta: 'Bicarbonato 1-2mEq/kg se QRS>100ms' }
          ],
          citations: [{ refId: 'sbpt-intoxicacoes-2021' }]
        },
        duracao: 'Observação mínima 6-24h conforme agente; alguns requerem internação prolongada'
      },
      acompanhamento: {
        frequenciaConsultas: 'Conforme gravidade e agente',
        metasTerapeuticas: [
          'Resolução dos sintomas',
          'Normalização laboratorial',
          'Avaliação psiquiátrica se intencional'
        ],
        criteriosEncaminhamento: [
          'UTI se instabilidade hemodinâmica ou depressão respiratória',
          'Psiquiatria se tentativa de suicídio',
          'Centro de Intoxicação para orientação (0800 722 6001 - CEATOX-SP)'
        ],
        citations: [{ refId: 'sbpt-intoxicacoes-2021' }]
      },
      prevencao: {
        primaria: [
          'Armazenamento seguro de medicamentos e produtos químicos',
          'Educação sobre riscos',
          'Embalagens de segurança'
        ],
        secundaria: [
          'Reconhecimento precoce',
          'Contato imediato com centro de intoxicação',
          'Avaliação e tratamento de transtornos psiquiátricos'
        ],
        citations: [{ refId: 'aapcc-annual-report-2022' }]
      }
    },
    protocolos: ['intoxicacao-aguda', 'lavagem-gastrica', 'carvao-ativado'],
    medicamentos: ['naloxona', 'atropina', 'n-acetilcisteina', 'flumazenil'],
    calculadoras: ['nomograma-paracetamol'],
    citations: [
      { refId: 'goldfrank-toxicology' },
      { refId: 'sbpt-intoxicacoes-2021' },
      { refId: 'aapcc-annual-report-2022' }
    ],
    lastUpdate: '2024-12-23'
  },

  // ============================================================================
  // QUEIMADURAS
  // ============================================================================
  {
    id: 'queimaduras',
    titulo: 'Queimaduras',
    sinonimos: ['Queimadura térmica', 'Queimadura química', 'Queimadura elétrica', 'Escaldadura'],
    doid: 'DOID:0080312',
    snomedCT: '125666000',
    meshId: 'D002056',
    umlsCui: 'C0006434',
    ciap2: ['S14'],
    cid10: ['T20-T32', 'T30', 'T31'],
    cid11: ['NB5'],
    categoria: 'outros',
    quickView: {
      definicao: 'Lesão tecidual causada por agentes térmicos, químicos, elétricos ou radioativos. Gravidade depende da extensão (% SCQ), profundidade e localização. Grande queimado requer ressuscitação volêmica e tratamento especializado.',
      criteriosDiagnosticos: [
        'PROFUNDIDADE:',
        '1º grau: eritema, dor, sem bolhas (epiderme)',
        '2º grau superficial: bolhas, base úmida, muito dolorosa',
        '2º grau profundo: bolhas rotas, base pálida, menos dolorosa',
        '3º grau: necrose, indolor, cor branca/negra',
        '',
        'EXTENSÃO - Regra dos 9 (adulto):',
        'Cabeça 9%, Cada MS 9%, Tórax anterior 18%, Tórax posterior 18%, Cada MI 18%, Períneo 1%',
        'Palma da mão do paciente = 1% SCQ'
      ],
      classificacaoRisco: [
        { nivel: 'baixo', criterios: ['<10% SCQ adulto', '2º grau superficial', 'Sem face/mãos/pés/períneo'], conduta: 'Tratamento ambulatorial' },
        { nivel: 'moderado', criterios: ['10-20% SCQ', '2º grau profundo', 'Idoso ou criança'], conduta: 'Considerar internação' },
        { nivel: 'alto', criterios: ['>20% SCQ', '3º grau >5%', 'Face, mãos, pés, genitais, articulações', 'Elétrica, química, inalação'], conduta: 'Centro de queimados' }
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Resfriar com água corrente (10-20min) - NÃO gelo',
          'Remover roupas e joias (se não aderidas)',
          'Cobrir com campo limpo/estéril',
          'Elevação de extremidades',
          'Manter temperatura corporal (evitar hipotermia)'
        ],
        farmacologico: [
          'RESSUSCITAÇÃO VOLÊMICA (Parkland):',
          '4mL x peso(kg) x %SCQ nas primeiras 24h',
          '50% nas primeiras 8h, 50% nas 16h seguintes',
          'Meta: diurese 0,5-1mL/kg/h',
          '',
          'Analgesia: Morfina ou Tramadol IV',
          'Profilaxia antitetânica',
          'NÃO usar ATB profilático de rotina',
          'Curativo com sulfadiazina de prata (2º/3º grau)'
        ]
      },
      metasTerapeuticas: [
        'Ressuscitação volêmica adequada',
        'Controle da dor',
        'Prevenção de infecção',
        'Preservação de função e estética',
        'Cicatrização dirigida'
      ],
      examesIniciais: [
        'Hemograma, eletrólitos, função renal',
        'Gasometria arterial (se inalação)',
        'Carboxi-hemoglobina (se incêndio em ambiente fechado)',
        'ECG (se queimadura elétrica)',
        'CK (rabdomiólise em elétrica)',
        'Rx de tórax (se suspeita de inalação)'
      ],
      redFlags: [
        'Queimadura de via aérea (rouquidão, stridor, pelos nasais chamuscados)',
        'Queimadura elétrica (risco de arritmia e síndrome compartimental)',
        'Queimadura química (irrigação contínua)',
        'Lesão circunferencial (síndrome compartimental)',
        'SCQ >20% (choque hipovolêmico)',
        'Extremos de idade (<2 ou >60 anos)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Milhões de casos/ano globalmente',
        incidencia: '~1 milhão de casos/ano no Brasil',
        mortalidade: 'Depende da extensão; >50% SCQ tem alta mortalidade',
        faixaEtaria: 'Crianças pequenas (escaldadura) e adultos (trabalho)',
        fatoresRisco: [
          'Ambiente doméstico inseguro',
          'Trabalho em risco (indústria, construção)',
          'Álcool e drogas',
          'Epilepsia',
          'Extremos de idade',
          'Maus-tratos (crianças e idosos)'
        ],
        citations: [{ refId: 'sbq-queimaduras-2021' }]
      },
      fisiopatologia: {
        texto: 'Lesão tecidual com três zonas: coagulação (necrose central), estase (potencialmente salvável) e hiperemia (inflamação). Grande queimado desenvolve resposta inflamatória sistêmica com aumento da permeabilidade capilar, edema e choque distributivo.',
        citations: [{ refId: 'aba-guidelines-2016' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor (variável conforme profundidade)',
          'Eritema, bolhas ou necrose',
          'Edema local ou generalizado',
          'Sintomas de inalação (tosse, rouquidão, dispneia)'
        ],
        sinaisExameFisico: [
          'Aspecto da lesão (cor, bolhas, textura)',
          'Sensibilidade ao toque',
          'Enchimento capilar',
          'Sinais de lesão de via aérea',
          'Pulsos distais (lesão circunferencial)'
        ],
        formasClinicas: [
          'Queimadura térmica (chama, contato, escaldadura)',
          'Queimadura química (ácido, álcali)',
          'Queimadura elétrica (baixa ou alta tensão)',
          'Lesão por inalação'
        ],
        citations: [{ refId: 'sbq-queimaduras-2021' }]
      },
      diagnostico: {
        criterios: [
          'Avaliação da profundidade',
          'Cálculo da extensão (regra dos 9 ou palma)',
          'Identificação de áreas especiais',
          'Avaliação de lesões associadas'
        ],
        diagnosticoDiferencial: [
          'Necrólise epidérmica tóxica (NET)',
          'Síndrome de Stevens-Johnson',
          'Dermatite de contato severa',
          'Pênfigo/penfigoide'
        ],
        examesLaboratoriais: [
          'Hemograma',
          'Eletrólitos, ureia, creatinina',
          'Gasometria arterial',
          'Lactato',
          'CK (queimadura elétrica)',
          'Carboxi-hemoglobina (inalação)'
        ],
        examesImagem: [
          'Rx de tórax',
          'Broncoscopia (se suspeita de lesão inalatória)'
        ],
        citations: [{ refId: 'aba-guidelines-2016' }]
      },
      tratamento: {
        objetivos: [
          'Ressuscitação hemodinâmica',
          'Analgesia adequada',
          'Prevenção de infecção',
          'Cicatrização adequada',
          'Preservação funcional e estética'
        ],
        naoFarmacologico: {
          medidas: [
            'Resfriamento inicial com água corrente',
            'Curativos com sulfadiazina de prata ou curativos biológicos',
            'Desbridamento cirúrgico quando indicado',
            'Escarotomia/fasciotomia se síndrome compartimental',
            'Enxertia de pele em queimaduras profundas',
            'Fisioterapia precoce'
          ],
          citations: [{ refId: 'sbq-queimaduras-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Cristaloide', medicamentos: ['Ringer Lactato'], posologia: '4mL/kg/%SCQ em 24h (Parkland)', observacoes: '50% nas primeiras 8h' },
            { classe: 'Analgésico', medicamentos: ['Morfina', 'Tramadol'], posologia: 'Conforme intensidade da dor' },
            { classe: 'Profilaxia antitetânica', medicamentos: ['Vacina dT + SAT se necessário'] }
          ],
          segundaLinha: [
            { classe: 'Antimicrobiano tópico', medicamentos: ['Sulfadiazina de prata 1%'], observacoes: 'Em queimaduras de 2º/3º grau' }
          ],
          citations: [{ refId: 'aba-guidelines-2016' }]
        },
        duracao: 'Variável conforme extensão e profundidade'
      },
      acompanhamento: {
        frequenciaConsultas: 'Trocas de curativos a cada 24-72h; acompanhamento prolongado',
        metasTerapeuticas: [
          'Cicatrização em 2-3 semanas (2º grau superficial)',
          'Prevenção de cicatrizes hipertróficas',
          'Reabilitação funcional',
          'Suporte psicológico'
        ],
        criteriosEncaminhamento: [
          'Centro de queimados: >20% SCQ, 3º grau, face/mãos/pés/genitais, elétrica, química, inalação',
          'Cirurgia plástica: cicatrizes, retraturas',
          'Psicologia/Psiquiatria'
        ],
        citations: [{ refId: 'sbq-queimaduras-2021' }]
      }
    },
    protocolos: ['queimaduras-atendimento-inicial', 'parkland-ressuscitacao'],
    medicamentos: ['morfina', 'sulfadiazina-prata'],
    calculadoras: ['regra-dos-9', 'parkland'],
    citations: [
      { refId: 'sbq-queimaduras-2021' },
      { refId: 'aba-guidelines-2016' }
    ],
    lastUpdate: '2024-12-23'
  },

  // ============================================================================
  // STATUS EPILEPTICUS
  // ============================================================================
  {
    id: 'estado-de-mal-epileptico',
    titulo: 'Estado de Mal Epiléptico',
    sinonimos: ['Status epilepticus', 'EME', 'Crise epiléptica prolongada', 'Crise refratária'],
    doid: 'DOID:9188',
    snomedCT: '26184008',
    meshId: 'D013226',
    umlsCui: 'C0038220',
    ciap2: ['N88'],
    cid10: ['G41', 'G41.0', 'G41.1', 'G41.2', 'G41.9'],
    cid11: ['8A62'],
    categoria: 'neurologico',
    quickView: {
      definicao: 'Atividade epiléptica contínua por >5 minutos ou crises recorrentes sem recuperação da consciência entre elas. Emergência neurológica com risco de dano cerebral permanente e morte se não tratada rapidamente.',
      criteriosDiagnosticos: [
        'Crise epiléptica por ≥5 minutos (definição operacional)',
        'Duas ou mais crises sem recuperação da consciência',
        'Definição clássica: >30 min (risco de sequela)',
        'EME não convulsivo: alteração de consciência + atividade epileptiforme no EEG',
        'Identificar possível causa (metabólica, lesional, abstinência)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'ABC - via aérea com cânula orofaríngea (não forçar)',
          'O2 suplementar',
          'Posição de recuperação (lateral)',
          'Acesso venoso (ou intraósseo)',
          'Glicemia capilar IMEDIATA',
          'Monitorização contínua'
        ],
        farmacologico: [
          'FASE 1 (0-5 min): Benzodiazepínico',
          'Diazepam 10mg IV lento (0,2mg/kg, máx 20mg) OU',
          'Midazolam 10mg IM (se sem acesso venoso) OU',
          'Lorazepam 4mg IV (se disponível)',
          '',
          'FASE 2 (5-20 min): Se não responder',
          'Fenitoína 20mg/kg IV (máx 50mg/min) OU',
          'Valproato 40mg/kg IV (máx 10mg/kg/min) OU',
          'Levetiracetam 60mg/kg IV',
          '',
          'FASE 3 (>20 min): EME refratário',
          'Indução anestésica: Propofol, Midazolam ou Tiopental em BIC',
          'IOT e ventilação mecânica'
        ]
      },
      metasTerapeuticas: [
        'Cessação da atividade epiléptica',
        'Proteção neurológica',
        'Estabilização hemodinâmica',
        'Identificação da causa'
      ],
      examesIniciais: [
        'Glicemia capilar (OBRIGATÓRIO)',
        'Hemograma, eletrólitos (Na, K, Ca, Mg)',
        'Gasometria arterial',
        'Ureia, creatinina',
        'Níveis de antiepilépticos (se uso prévio)',
        'Screening toxicológico',
        'TC de crânio',
        'Punção lombar (se suspeita de infecção, após imagem)'
      ],
      redFlags: [
        'EME >30 minutos (dano neurológico)',
        'EME refratário (não responde a 2 FAEs)',
        'EME super-refratário (>24h em anestesia)',
        'Causa estrutural aguda (AVC, tumor)',
        'Febre (encefalite)',
        'Hiponatremia grave',
        'Acidose metabólica persistente'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '50-150 casos/100.000 habitantes/ano',
        incidencia: 'Mortalidade de 20-30% no EME refratário',
        faixaEtaria: 'Bimodal: crianças pequenas e idosos',
        fatoresRisco: [
          'Epilepsia prévia (má aderência, redução de FAE)',
          'AVC agudo ou sequela',
          'Infecção do SNC',
          'Tumor cerebral',
          'Distúrbios metabólicos (hipoglicemia, hiponatremia)',
          'Abstinência de álcool ou benzodiazepínicos',
          'Intoxicação'
        ],
        citations: [{ refId: 'ilae-status-2015' }]
      },
      fisiopatologia: {
        texto: 'Falha dos mecanismos inibitórios (GABAérgicos) em encerrar a atividade ictal, com hiperatividade excitatória (glutamatérgica) mantida. Leva a excitotoxicidade, dano neuronal, edema cerebral e potencial falência respiratória/cardiovascular.',
        citations: [{ refId: 'ilae-status-2015' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Movimentos tônico-clônicos generalizados',
          'Perda de consciência',
          'Salivação excessiva',
          'Cianose',
          'Incontinência',
          'Confusão pós-ictal prolongada'
        ],
        sinaisExameFisico: [
          'Movimentos clônicos',
          'Hipertonia',
          'Desvio ocular',
          'Taquicardia, hipertensão',
          'Febre (pela atividade muscular)',
          'Sinais focais pós-ictais'
        ],
        formasClinicas: [
          'EME convulsivo generalizado',
          'EME focal com consciência preservada',
          'EME focal com comprometimento da consciência',
          'EME não convulsivo (suspeitar em alteração de consciência prolongada)',
          'EME sutil (movimentos mínimos, EEG epileptiforme)'
        ],
        citations: [{ refId: 'lbn-eme-2020' }]
      },
      diagnostico: {
        criterios: [
          'Critério temporal: ≥5 minutos de crise ou crises recorrentes sem recuperação',
          'EEG para EME não convulsivo',
          'Identificação da etiologia'
        ],
        diagnosticoDiferencial: [
          'Síncope convulsiva',
          'Crises psicogênicas não epilépticas',
          'Rigidez de descerebração',
          'Movimento involuntário (distonia, coreia)',
          'Intoxicação',
          'Hipoglicemia'
        ],
        examesLaboratoriais: [
          'Glicemia',
          'Eletrólitos (Na, K, Ca, Mg)',
          'Gasometria arterial',
          'Função renal e hepática',
          'Níveis de antiepilépticos',
          'Lactato'
        ],
        examesImagem: [
          'TC de crânio (urgente)',
          'RM de crânio (se TC normal e causa não identificada)',
          'EEG contínuo (UTI)'
        ],
        outrosExames: [
          'Punção lombar (se suspeita de neuroinfecção, após imagem)',
          'Anticorpos antineuronais (encefalite autoimune)'
        ],
        citations: [{ refId: 'ilae-status-2015' }]
      },
      tratamento: {
        objetivos: [
          'Cessar a atividade epiléptica rapidamente',
          'Prevenir dano neuronal',
          'Tratar a causa subjacente',
          'Prevenir recorrência'
        ],
        naoFarmacologico: {
          medidas: [
            'Via aérea pérvia',
            'Oxigenoterapia',
            'Intubação se necessário',
            'Monitorização contínua',
            'Correção de distúrbios metabólicos'
          ],
          citations: [{ refId: 'lbn-eme-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Benzodiazepínico', medicamentos: ['Diazepam 10mg IV', 'Midazolam 10mg IM', 'Lorazepam 4mg IV'], posologia: 'Dose única, repetir 1x se necessário', observacoes: 'Primeira linha, eficaz em ~65%' }
          ],
          segundaLinha: [
            { classe: 'Antiepiléptico IV', medicamentos: ['Fenitoína 20mg/kg IV', 'Valproato 40mg/kg IV', 'Levetiracetam 60mg/kg IV'], observacoes: 'Se BZD falhar' }
          ],
          situacoesEspeciais: [
            { situacao: 'EME refratário', conduta: 'Anestésicos: Midazolam, Propofol ou Tiopental em BIC; IOT + VM; EEG contínuo' },
            { situacao: 'Hipoglicemia', conduta: 'Glicose 50% 50mL IV + Tiamina 100mg' },
            { situacao: 'Abstinência alcoólica', conduta: 'Benzodiazepínicos em doses altas + Tiamina' }
          ],
          citations: [{ refId: 'ilae-status-2015' }]
        },
        duracao: 'Manutenção com FAE conforme etiologia'
      },
      acompanhamento: {
        frequenciaConsultas: 'UTI até controle; depois neurologia ambulatorial',
        metasTerapeuticas: [
          'Ausência de crises',
          'Recuperação neurológica',
          'Controle do FAE de manutenção'
        ],
        criteriosEncaminhamento: [
          'Todo EME: Emergência → UTI',
          'Neurologia para investigação',
          'Epileptologista se refratário'
        ],
        citations: [{ refId: 'lbn-eme-2020' }]
      }
    },
    protocolos: ['eme-emergencia', 'crise-epileptica-aguda'],
    medicamentos: ['diazepam', 'midazolam', 'fenitoina', 'valproato', 'levetiracetam'],
    calculadoras: [],
    citations: [
      { refId: 'ilae-status-2015' },
      { refId: 'lbn-eme-2020' }
    ],
    lastUpdate: '2024-12-23'
  },

  // ============================================================================
  // EDEMA AGUDO DE PULMÃO
  // ============================================================================
  {
    id: 'edema-agudo-pulmao',
    titulo: 'Edema Agudo de Pulmão',
    sinonimos: ['EAP', 'Edema pulmonar cardiogênico', 'Congestão pulmonar aguda'],
    doid: 'DOID:11396',
    snomedCT: '67782005',
    meshId: 'D011654',
    umlsCui: 'C0034063',
    ciap2: ['K77'],
    cid10: ['J81', 'I50.1'],
    cid11: ['CB01'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Acúmulo abrupto de líquido no interstício e alvéolos pulmonares por aumento da pressão capilar pulmonar (cardiogênico) ou aumento da permeabilidade (não cardiogênico). Emergência com insuficiência respiratória aguda.',
      criteriosDiagnosticos: [
        'Dispneia intensa de início súbito',
        'Ortopneia (não tolera decúbito)',
        'Estertores crepitantes difusos bilaterais',
        'Escarro róseo espumoso (casos graves)',
        'Taquipneia, uso de musculatura acessória',
        'Rx de tórax: infiltrado bilateral "em asa de morcego"',
        'BNP/NT-proBNP elevado (cardiogênico)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'LEMON: Lasix, Elevar cabeceira, Morfina, Oxigênio, Nitrato',
          'Cabeceira elevada a 90° (ou sentado com pernas pendentes)',
          'Oxigênio (máscara não reinalante, VNI se disponível)',
          'VNI (CPAP ou BiPAP) - reduz mortalidade',
          'Acesso venoso, monitorização'
        ],
        farmacologico: [
          'FUROSEMIDA 40-80mg IV (0,5-1mg/kg)',
          'Repetir se necessário; dobrar dose se uso prévio de diurético',
          '',
          'NITROGLICERINA SL 0,4mg ou spray (se PAS>90)',
          'Se possível: NTG IV 10-200mcg/min',
          '',
          'MORFINA 2-4mg IV (controverso, cautela)',
          '',
          'Se HAS grave: Nitroprussiato IV',
          'Se hipotensão: Noradrenalina + Dobutamina'
        ]
      },
      metasTerapeuticas: [
        'Redução da congestão pulmonar',
        'Melhora da oxigenação (SatO2>92%)',
        'Controle da pressão arterial',
        'Identificação e tratamento da causa'
      ],
      examesIniciais: [
        'ECG 12 derivações (isquemia, arritmia)',
        'Rx de tórax',
        'BNP ou NT-proBNP',
        'Troponina',
        'Gasometria arterial',
        'Eletrólitos, função renal',
        'Ecocardiograma (assim que possível)'
      ],
      redFlags: [
        'Choque cardiogênico (PA baixa, extremidades frias)',
        'Arritmia grave (FA rápida, TV)',
        'IAM associado',
        'Necessidade de IOT',
        'Saturação <80% apesar de O2',
        'Não resposta a VNI em 30-60 min'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Complicação comum de IC (1 milhão de internações/ano nos EUA)',
        faixaEtaria: 'Mais comum em idosos',
        fatoresRisco: [
          'Insuficiência cardíaca prévia',
          'Cardiopatia isquêmica',
          'Hipertensão arterial',
          'Valvopatias',
          'Cardiomiopatias',
          'Fibrilação atrial',
          'Doença renal crônica'
        ],
        citations: [{ refId: 'sbc-ic-2018' }]
      },
      fisiopatologia: {
        texto: 'Aumento da pressão de enchimento do VE → aumento da pressão capilar pulmonar → transudação de líquido para interstício e alvéolos → comprometimento das trocas gasosas e hipoxemia. No não cardiogênico, há lesão da barreira alvéolo-capilar.',
        citations: [{ refId: 'esc-hf-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dispneia intensa',
          'Ortopneia',
          'Dispneia paroxística noturna',
          'Tosse com escarro róseo espumoso',
          'Ansiedade, sensação de morte iminente'
        ],
        sinaisExameFisico: [
          'Taquipneia',
          'Uso de musculatura acessória',
          'Estertores crepitantes bilaterais',
          'Sibilos ("asma cardíaca")',
          'Turgência jugular',
          'B3/B4, sopros',
          'Edema de MMII'
        ],
        formasClinicas: [
          'EAP hipertensivo (PA elevada)',
          'EAP normotensivo',
          'EAP com choque cardiogênico (PA baixa)',
          'EAP não cardiogênico (SDRA)'
        ],
        citations: [{ refId: 'sbc-ic-2018' }]
      },
      diagnostico: {
        criterios: [
          'Clínica + Rx compatível',
          'BNP/NT-proBNP elevado',
          'Exclusão de causas não cardiogênicas'
        ],
        diagnosticoDiferencial: [
          'SDRA (não cardiogênico)',
          'Pneumonia grave',
          'Exacerbação de DPOC/asma',
          'Embolia pulmonar',
          'Crise de ansiedade/hiperventilação'
        ],
        examesLaboratoriais: [
          'BNP (>400pg/mL) ou NT-proBNP (>2000pg/mL)',
          'Troponina (SCA associada?)',
          'Gasometria arterial',
          'Hemograma, função renal, eletrólitos',
          'D-dímero (se suspeita de TEP)'
        ],
        examesImagem: [
          'Rx de tórax (congestão vascular, infiltrado, cardiomegalia)',
          'Ecocardiograma (disfunção VE, valvopatias)',
          'TC de tórax (se dúvida diagnóstica)'
        ],
        citations: [{ refId: 'esc-hf-2021' }]
      },
      tratamento: {
        objetivos: [
          'Aliviar a congestão',
          'Melhorar a oxigenação',
          'Tratar a causa',
          'Prevenir recorrência'
        ],
        naoFarmacologico: {
          medidas: [
            'Sentar paciente (pernas pendentes)',
            'Oxigenoterapia',
            'VNI (CPAP 5-10cmH2O ou BiPAP)',
            'Intubação se VNI falhar'
          ],
          citations: [{ refId: 'sbc-ic-2018' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Diurético de alça', medicamentos: ['Furosemida 40-80mg IV'], posologia: 'Dose inicial; repetir conforme resposta' },
            { classe: 'Vasodilatador', medicamentos: ['Nitroglicerina SL ou IV', 'Nitroprussiato IV (se HAS)'], posologia: 'NTG IV 10-200mcg/min' }
          ],
          segundaLinha: [
            { classe: 'Inotrópico', medicamentos: ['Dobutamina 2,5-20mcg/kg/min'], observacoes: 'Se baixo débito' },
            { classe: 'Vasopressor', medicamentos: ['Noradrenalina'], observacoes: 'Se choque' }
          ],
          citations: [{ refId: 'esc-hf-2021' }]
        },
        duracao: 'Fase aguda: horas a dias; otimização crônica da IC'
      },
      acompanhamento: {
        frequenciaConsultas: 'Reavaliação contínua na emergência; seguimento cardiológico',
        metasTerapeuticas: [
          'Euvolemia',
          'Otimização de IECA/BRA, BB, antagonista mineralocorticoide',
          'Controle de fatores precipitantes'
        ],
        criteriosEncaminhamento: [
          'UTI se choque, IOT ou refratário',
          'Cardiologia para investigação e otimização',
          'Cirurgia cardíaca se valvopatia grave'
        ],
        citations: [{ refId: 'sbc-ic-2018' }]
      }
    },
    protocolos: ['eap-emergencia', 'ic-descompensada'],
    medicamentos: ['furosemida', 'nitroglicerina', 'nitroprussiato', 'dobutamina'],
    calculadoras: [],
    citations: [
      { refId: 'sbc-ic-2018' },
      { refId: 'esc-hf-2021' }
    ],
    lastUpdate: '2024-12-23'
  },

  // ============================================================================
  // CETOACIDOSE DIABÉTICA
  // ============================================================================
  {
    id: 'cetoacidose-diabetica',
    titulo: 'Cetoacidose Diabética',
    sinonimos: ['CAD', 'Cetoacidose', 'Descompensação diabética aguda'],
    doid: 'DOID:11716',
    snomedCT: '420422005',
    meshId: 'D016883',
    umlsCui: 'C0011880',
    ciap2: ['T89'],
    cid10: ['E10.1', 'E11.1', 'E13.1', 'E14.1'],
    cid11: ['5A10.1', '5A11.1'],
    categoria: 'endocrino',
    quickView: {
      definicao: 'Emergência metabólica caracterizada por hiperglicemia, acidose metabólica e cetonemia, causada por deficiência absoluta ou relativa de insulina. Mais comum em DM1, mas pode ocorrer em DM2.',
      criteriosDiagnosticos: [
        'TRÍADE: Hiperglicemia + Acidose + Cetonemia',
        'Glicemia >250 mg/dL',
        'pH arterial <7,3',
        'Bicarbonato <18 mEq/L',
        'Cetonúria ++ ou cetonemia >3 mmol/L',
        'Ânion gap aumentado (>12)',
        'GRAVIDADE: Leve (pH 7,25-7,3), Moderada (pH 7,0-7,24), Grave (pH<7,0)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Acesso venoso calibroso (2 acessos)',
          'Sondagem vesical de demora',
          'Monitorização contínua',
          'Glicemia capilar 1/1h'
        ],
        farmacologico: [
          '1. HIDRATAÇÃO (Prioridade):',
          'SF 0,9% 1-1,5L na 1ª hora',
          'SF 0,9% 250-500mL/h nas próximas horas',
          'Trocar para SF 0,45% se Na corrigido >135',
          '',
          '2. INSULINA (após 1h de hidratação):',
          'Insulina Regular 0,1U/kg em bolus IV',
          'Depois: 0,1U/kg/h em BIC',
          'Meta: queda de glicemia 50-70mg/dL/h',
          '',
          '3. POTÁSSIO:',
          'K <3,3: NÃO iniciar insulina até repor K',
          'K 3,3-5,3: KCl 20-30mEq/L no SF',
          'K >5,3: Aguardar para repor',
          '',
          '4. BICARBONATO (apenas se pH<6,9):',
          'NaHCO3 100mEq em 400mL SF em 2h'
        ]
      },
      metasTerapeuticas: [
        'Glicemia 150-200 mg/dL',
        'pH >7,3',
        'Bicarbonato >18 mEq/L',
        'Ânion gap <12',
        'Cetonemia <0,6 mmol/L',
        'Potássio normal'
      ],
      examesIniciais: [
        'Glicemia',
        'Gasometria arterial',
        'Eletrólitos (Na, K, Cl)',
        'Ureia, creatinina',
        'Hemograma',
        'EAS + cetonúria',
        'Beta-hidroxibutirato (se disponível)',
        'ECG (avaliar K)',
        'Rx de tórax, culturas (se suspeita de infecção)'
      ],
      redFlags: [
        'pH <7,0 (CAD grave)',
        'Hipocalemia grave (K<3,3)',
        'Alteração do nível de consciência',
        'Choque hipovolêmico',
        'Edema cerebral (principalmente crianças)',
        'Insuficiência renal aguda'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '~4-8 episódios/1000 diabéticos/ano',
        mortalidade: '<1% em centros especializados; até 5% em países em desenvolvimento',
        faixaEtaria: 'Mais comum em jovens com DM1; primeiro diagnóstico em até 30%',
        fatoresRisco: [
          'DM1 (principalmente)',
          'Omissão ou redução de insulina',
          'Infecções (principal precipitante)',
          'IAM, AVC',
          'Primeiro diagnóstico de DM',
          'Uso de SGLT2i (CAD euglicêmica)',
          'Uso de corticoides'
        ],
        citations: [{ refId: 'ada-diabetes-2024' }]
      },
      fisiopatologia: {
        texto: 'Deficiência de insulina + excesso de hormônios contrarreguladores → lipólise aumentada → excesso de ácidos graxos livres → cetogênese hepática → acúmulo de corpos cetônicos (acetoacetato, beta-hidroxibutirato) → acidose metabólica. Hiperglicemia causa diurese osmótica e desidratação.',
        citations: [{ refId: 'sbd-cad-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Poliúria, polidipsia',
          'Náuseas, vômitos, dor abdominal',
          'Desidratação',
          'Taquipneia (respiração de Kussmaul)',
          'Hálito cetônico (maçã podre)',
          'Confusão mental, letargia'
        ],
        sinaisExameFisico: [
          'Desidratação (mucosas secas, turgor diminuído)',
          'Taquicardia, hipotensão',
          'Respiração de Kussmaul',
          'Hálito cetônico',
          'Alteração do nível de consciência'
        ],
        formasClinicas: [
          'CAD leve (pH 7,25-7,3)',
          'CAD moderada (pH 7,0-7,24)',
          'CAD grave (pH <7,0)',
          'CAD euglicêmica (glicemia <250, uso de SGLT2i)'
        ],
        citations: [{ refId: 'ada-diabetes-2024' }]
      },
      diagnostico: {
        criterios: [
          'Glicemia >250 mg/dL',
          'pH <7,3 e/ou HCO3 <18',
          'Cetonemia ou cetonúria',
          'Ânion gap aumentado'
        ],
        diagnosticoDiferencial: [
          'Estado hiperglicêmico hiperosmolar',
          'Acidose lática',
          'Cetose de jejum',
          'Cetoacidose alcoólica',
          'Intoxicação (metanol, etilenoglicol, salicilatos)',
          'Acidose urêmica'
        ],
        examesLaboratoriais: [
          'Glicemia',
          'Gasometria arterial',
          'Eletrólitos com cálculo de ânion gap',
          'Beta-hidroxibutirato sérico',
          'Ureia, creatinina',
          'Hemograma, PCR',
          'Amilase, lipase (se dor abdominal)',
          'Culturas (se suspeita de infecção)'
        ],
        citations: [{ refId: 'sbd-cad-2022' }]
      },
      tratamento: {
        objetivos: [
          'Correção da volemia',
          'Correção da hiperglicemia',
          'Correção da acidose e cetose',
          'Correção de distúrbios eletrolíticos',
          'Tratamento do fator precipitante'
        ],
        naoFarmacologico: {
          medidas: [
            'Monitorização em UTI ou unidade intensiva',
            'Balanço hídrico rigoroso',
            'Glicemia capilar 1/1h',
            'Eletrólitos e gasometria 2-4h',
            'Identificar e tratar precipitante'
          ],
          citations: [{ refId: 'ada-diabetes-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Cristaloide', medicamentos: ['SF 0,9%'], posologia: '1-1,5L na 1ª hora; depois 250-500mL/h' },
            { classe: 'Insulina', medicamentos: ['Insulina Regular IV'], posologia: '0,1U/kg bolus + 0,1U/kg/h em BIC' },
            { classe: 'Potássio', medicamentos: ['KCl'], posologia: '20-40mEq/L no soro, conforme K sérico' }
          ],
          situacoesEspeciais: [
            { situacao: 'Glicemia <200 com acidose persistente', conduta: 'Adicionar SG 5% ao SF e manter insulina' },
            { situacao: 'pH <6,9', conduta: 'Considerar NaHCO3 100mEq em 400mL em 2h' },
            { situacao: 'K <3,3', conduta: 'Adiar insulina e repor K primeiro' }
          ],
          citations: [{ refId: 'sbd-cad-2022' }]
        },
        duracao: 'Até resolução da acidose e cetose (geralmente 12-24h)'
      },
      acompanhamento: {
        frequenciaConsultas: 'UTI até resolução; depois endocrinologia ambulatorial',
        metasTerapeuticas: [
          'Transição para insulina SC',
          'Educação do paciente',
          'Ajuste do esquema de insulina',
          'Prevenção de recorrência'
        ],
        criteriosEncaminhamento: [
          'UTI se CAD grave',
          'Endocrinologia para ajuste',
          'Psicologia se omissão intencional de insulina'
        ],
        citations: [{ refId: 'ada-diabetes-2024' }]
      }
    },
    protocolos: ['cad-emergencia', 'insulinizacao-cad'],
    medicamentos: ['insulina-regular', 'sf-0,9', 'kcl'],
    calculadoras: ['anion-gap', 'sodio-corrigido', 'osmolaridade'],
    citations: [
      { refId: 'ada-diabetes-2024' },
      { refId: 'sbd-cad-2022' }
    ],
    lastUpdate: '2024-12-23'
  }
];
