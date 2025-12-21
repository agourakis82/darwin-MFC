/**
 * EXPANSÃO SPRINT 3 - DOENÇAS CARDIOVASCULARES
 * =============================================
 * Condições cardiovasculares comuns na APS
 */

import { Doenca } from '../../types/doenca';

export const doencasCardiovascularesExpansao: Partial<Doenca>[] = [
  {
    id: 'doenca-arterial-periferica',
    titulo: 'Doença Arterial Periférica',
    sinonimos: ['DAP', 'DAOP', 'Claudicação intermitente', 'Doença vascular periférica'],
    ciap2: ['K92'],
    cid10: ['I73.9', 'I70.2'],
    cid11: ['BD40'],
    doid: 'DOID:0050830',
    snomedCT: '399957001',
    meshId: 'D058729',
    umlsCui: 'C1704436',
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Aterosclerose de artérias periféricas (especialmente MMII) causando isquemia. ITB <0,9 é diagnóstico. Marcador de doença aterosclerótica sistêmica.',
      criteriosDiagnosticos: [
        'ITB (Índice Tornozelo-Braquial) <0,9',
        'Claudicação intermitente: dor em panturrilha ao caminhar, alivia com repouso',
        'Pulsos periféricos diminuídos/ausentes',
        'ITB <0,4 ou dor em repouso: isquemia crítica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Exercício supervisionado de caminhada (principal)',
          'Cessação do tabagismo (obrigatória)',
          'Cuidados com pés'
        ],
        farmacologico: [
          'AAS 100mg/dia ou Clopidogrel 75mg/dia',
          'Estatina de alta potência',
          'IECA se HAS ou DM',
          'Cilostazol 100mg 2x/dia (claudicação limitante)'
        ]
      },
      redFlags: ['Dor em repouso', 'Úlcera arterial', 'Gangrena', 'ITB <0,4'],
      metasTerapeuticas: ['LDL-c <70 mg/dL', 'PA <130/80', 'HbA1c <7%', 'Cessar tabagismo'],
      examesIniciais: ['ITB', 'Doppler arterial', 'Perfil lipídico', 'Glicemia/HbA1c', 'Creatinina']
    },
    protocolos: ['has', 'dm2'],
    medicamentos: ['aas', 'clopidogrel', 'atorvastatina', 'cilostazol'],
    calculadoras: [],
    tags: ['vascular', 'aterosclerose', 'tabagismo']
  },
  {
    id: 'estenose-aortica',
    titulo: 'Estenose Aórtica',
    sinonimos: ['EAo', 'Valvulopatia aórtica'],
    ciap2: ['K83'],
    cid10: ['I35.0', 'I06.0'],
    cid11: ['BB60.0'],
    doid: 'DOID:1712',
    snomedCT: '60573004',
    meshId: 'D001024',
    umlsCui: 'C0003507',
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Obstrução à ejeção do VE pela valva aórtica. Degenerativa (calcificada) é a causa mais comum em idosos. Bicúspide em jovens.',
      criteriosDiagnosticos: [
        'Sopro sistólico ejetivo em foco aórtico, irradiação para carótidas',
        'Eco: EAo grave = área valvar <1,0 cm², gradiente médio >40 mmHg, Vmáx >4 m/s',
        'Sintomas: dispneia, angina, síncope',
        'Pulso parvus et tardus (tardio e de baixa amplitude)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar exercício intenso se sintomático',
          'Profilaxia de endocardite (se alto risco)'
        ],
        farmacologico: [
          'Tratamento clínico limitado - cirurgia é definitivo',
          'Evitar vasodilatadores intensos (risco de hipotensão)',
          'Betabloqueador se FA ou angina',
          'Estatina NÃO reduz progressão'
        ]
      },
      redFlags: ['Síncope', 'Angina', 'IC descompensada', 'EAo grave sintomática'],
      metasTerapeuticas: ['Encaminhamento precoce se sintomático', 'Troca valvar (TAVR ou cirúrgica)'],
      examesIniciais: ['Ecocardiograma', 'ECG', 'Radiografia de tórax']
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    tags: ['valvulopatia', 'sopro', 'cirurgia']
  },
  {
    id: 'insuficiencia-mitral',
    titulo: 'Insuficiência Mitral',
    sinonimos: ['IM', 'Regurgitação mitral'],
    ciap2: ['K83'],
    cid10: ['I34.0', 'I05.1'],
    cid11: ['BB61.1'],
    doid: 'DOID:11719',
    snomedCT: '48724000',
    meshId: 'D008944',
    umlsCui: 'C0026266',
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Refluxo de sangue do VE para AE durante sístole. Primária (valvar) ou secundária (funcional por dilatação do VE).',
      criteriosDiagnosticos: [
        'Sopro holossistólico em foco mitral, irradiação para axila',
        'Eco: gravidade por volume regurgitante, área do jato, vena contracta',
        'IM grave: FEVE ↓, dilatação de VE/AE, hipertensão pulmonar'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Restrição de sal e líquidos se IC',
          'Atividade física conforme tolerância'
        ],
        farmacologico: [
          'IM secundária: otimizar tratamento de IC (IECA/BRA, betabloqueador, espironolactona)',
          'IM primária: tratamento clínico limitado',
          'Diuréticos se congestão',
          'Anticoagulação se FA'
        ]
      },
      redFlags: ['IC refratária', 'FEVE <60%', 'Diâmetro sistólico VE >40mm', 'FA de início recente'],
      metasTerapeuticas: ['Manter FEVE', 'Controle de sintomas', 'Cirurgia se indicado'],
      examesIniciais: ['Ecocardiograma', 'ECG', 'BNP']
    },
    protocolos: ['insuficiencia-cardiaca'],
    medicamentos: ['enalapril', 'carvedilol', 'furosemida'],
    calculadoras: [],
    tags: ['valvulopatia', 'sopro', 'insuficiência cardíaca']
  },
  {
    id: 'trombose-venosa-profunda',
    titulo: 'Trombose Venosa Profunda',
    sinonimos: ['TVP', 'Tromboflebite profunda'],
    ciap2: ['K94'],
    cid10: ['I80.2'],
    cid11: ['BD72.0'],
    doid: 'DOID:1725',
    snomedCT: '128053003',
    meshId: 'D020246',
    umlsCui: 'C0149871',
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Formação de trombo em veias profundas, geralmente em MMII. Risco de TEP e síndrome pós-trombótica.',
      criteriosDiagnosticos: [
        'Escore de Wells para TVP (probabilidade clínica)',
        'D-dímero: alto VPN se probabilidade baixa',
        'USG Doppler venoso: diagnóstico definitivo',
        'Edema unilateral, dor em panturrilha, empastamento'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Deambulação precoce (não mais repouso)',
          'Meia elástica de compressão',
          'Elevação do membro'
        ],
        farmacologico: [
          'DOACs: Rivaroxabana 15mg 2x/dia por 21 dias, depois 20mg/dia',
          'Ou Apixabana 10mg 2x/dia por 7 dias, depois 5mg 2x/dia',
          'Alternativa: Enoxaparina + Varfarina (bridge)',
          'Duração: 3-6 meses (provocado), indefinido (não provocado/recorrente)'
        ]
      },
      redFlags: ['Dispneia (suspeita de TEP)', 'TVP proximal extensa', 'Flegmasia', 'Síndrome compartimental'],
      metasTerapeuticas: ['Anticoagulação terapêutica', 'Prevenção de TEP', 'Prevenção de recorrência'],
      examesIniciais: ['USG Doppler venoso', 'D-dímero', 'Hemograma', 'Coagulograma', 'Creatinina']
    },
    protocolos: [],
    medicamentos: ['rivaroxabana', 'apixabana', 'enoxaparina', 'varfarina'],
    calculadoras: ['wells-tvp'],
    tags: ['tromboembolismo', 'anticoagulação', 'urgência']
  },
  {
    id: 'embolia-pulmonar',
    titulo: 'Embolia Pulmonar',
    sinonimos: ['TEP', 'Tromboembolismo pulmonar'],
    ciap2: ['K93'],
    cid10: ['I26'],
    cid11: ['BB20'],
    doid: 'DOID:9477',
    snomedCT: '59282003',
    meshId: 'D011655',
    umlsCui: 'C0034065',
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Obstrução de artérias pulmonares por trombos, geralmente oriundos de TVP de MMII. Espectro de assintomático a instabilidade hemodinâmica.',
      criteriosDiagnosticos: [
        'Escore de Wells para TEP: alta (>6), moderada (2-6), baixa (<2)',
        'PERC rule: se todos negativos e baixa probabilidade, excluído',
        'D-dímero: alto VPN se baixa/moderada probabilidade',
        'Angio-TC de tórax: padrão-ouro',
        'Dispneia súbita, dor torácica pleurítica, taquicardia, hipoxemia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Estabilização hemodinâmica',
          'Oxigenoterapia'
        ],
        farmacologico: [
          'TEP de baixo risco: DOAC (rivaroxabana ou apixabana)',
          'TEP de risco intermediário: anticoagulação + monitoramento',
          'TEP alto risco (instável): trombólise sistêmica (alteplase)',
          'Duração: igual a TVP'
        ]
      },
      redFlags: ['Hipotensão', 'Disfunção de VD', 'Troponina elevada', 'BNP elevado'],
      metasTerapeuticas: ['Anticoagulação precoce', 'Estabilização hemodinâmica'],
      examesIniciais: ['Angio-TC tórax', 'D-dímero', 'ECG', 'Gasometria', 'Troponina', 'BNP', 'Eco se instável']
    },
    protocolos: ['dor-toracica'],
    medicamentos: ['rivaroxabana', 'apixabana', 'enoxaparina', 'alteplase'],
    calculadoras: ['wells-tep'],
    tags: ['emergência', 'anticoagulação', 'tromboembolismo']
  },
  {
    id: 'pericardite-aguda',
    titulo: 'Pericardite Aguda',
    sinonimos: ['Inflamação pericárdica'],
    ciap2: ['K84'],
    cid10: ['I30'],
    cid11: ['BC80'],
    doid: 'DOID:1787',
    snomedCT: '3238004',
    meshId: 'D010493',
    umlsCui: 'C0031046',
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Inflamação do pericárdio, geralmente idiopática/viral. Diagnóstico: ≥2 de 4 critérios.',
      criteriosDiagnosticos: [
        'Dor torácica típica: precordial, piora com respiração/decúbito, melhora sentado',
        'Atrito pericárdico',
        'Alterações ECG: supradesnível difuso de ST, infradesnivelamento de PR',
        'Derrame pericárdico novo ou aumento'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Repouso relativo até resolução de sintomas',
          'Evitar exercício por 3 meses (atletas)'
        ],
        farmacologico: [
          'AAS 650-1000mg 8/8h por 1-2 semanas OU',
          'Ibuprofeno 600mg 8/8h por 1-2 semanas',
          'Colchicina 0,5mg 12/12h por 3 meses (reduz recorrência)',
          'IBP para proteção gástrica'
        ]
      },
      redFlags: ['Febre alta', 'Derrame volumoso', 'Tamponamento', 'Imunossupressão', 'Anticoagulação'],
      metasTerapeuticas: ['Resolução da dor', 'Normalização de marcadores inflamatórios'],
      examesIniciais: ['ECG', 'Ecocardiograma', 'PCR', 'Troponina', 'Radiografia de tórax']
    },
    protocolos: ['dor-toracica'],
    medicamentos: ['aas', 'ibuprofeno', 'colchicina'],
    calculadoras: [],
    tags: ['dor torácica', 'inflamação', 'viral']
  },
  {
    id: 'cardiomiopatia-hipertrofica',
    titulo: 'Cardiomiopatia Hipertrófica',
    sinonimos: ['CMH', 'Miocardiopatia hipertrófica'],
    ciap2: ['K84'],
    cid10: ['I42.1', 'I42.2'],
    cid11: ['BC43.0'],
    doid: 'DOID:11984',
    snomedCT: '45227007',
    meshId: 'D002312',
    umlsCui: 'C0007194',
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Hipertrofia ventricular inexplicada (≥15mm), geralmente assimétrica. Causa genética (mutações sarcoméricas). Principal causa de morte súbita em jovens atletas.',
      criteriosDiagnosticos: [
        'Eco: espessura VE ≥15mm sem causa',
        'Obstrução dinâmica de VSVE (gradiente ≥30 mmHg)',
        'Movimento sistólico anterior da mitral (SAM)',
        'ECG: hipertrofia VE, ondas Q, alterações de ST-T'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar exercício competitivo de alta intensidade',
          'Rastreamento familiar (1º grau)',
          'Aconselhamento genético'
        ],
        farmacologico: [
          'Betabloqueador (propranolol, metoprolol) - primeira linha',
          'Verapamil se intolerância a BB',
          'Mavacamten (inibidor de miosina) - novo',
          'CDI se alto risco de morte súbita'
        ]
      },
      redFlags: ['Síncope', 'História familiar de morte súbita', 'TVNS', 'Resposta anormal de PA ao exercício'],
      metasTerapeuticas: ['Prevenção de morte súbita', 'Controle de sintomas'],
      examesIniciais: ['Ecocardiograma', 'ECG', 'Holter 24h', 'RM cardíaca', 'Teste genético']
    },
    protocolos: [],
    medicamentos: ['propranolol', 'metoprolol', 'verapamil'],
    calculadoras: [],
    tags: ['morte súbita', 'genética', 'atleta']
  },
  {
    id: 'sincope',
    titulo: 'Síncope',
    sinonimos: ['Desmaio', 'Perda transitória de consciência'],
    ciap2: ['A06'],
    cid10: ['R55'],
    cid11: ['MB40.1'],
    doid: 'DOID:11091',
    snomedCT: '271594007',
    meshId: 'D013575',
    umlsCui: 'C0039070',
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Perda transitória de consciência por hipoperfusão cerebral global com recuperação espontânea e completa. Vasovagal é a causa mais comum.',
      criteriosDiagnosticos: [
        'Perda de consciência transitória com recuperação espontânea',
        'Síncope reflexa (vasovagal): gatilho, pródromos (náusea, sudorese, visão turva)',
        'Hipotensão ortostática: queda PA ≥20/10 mmHg ao ortostatismo',
        'Cardíaca: exercício, palpitações, ECG anormal, cardiopatia estrutural'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Vasovagal: evitar gatilhos, reconhecer pródromos, manobras de contrapressão',
          'Ortostática: hidratação, sal, levantar devagar, meias elásticas'
        ],
        farmacologico: [
          'Vasovagal: geralmente não farmacológico. Fludrocortisona, midodrina se refratária',
          'Ortostática: fludrocortisona 0,1-0,3mg/dia, midodrina 2,5-10mg 3x/dia',
          'Cardíaca: tratar causa (marca-passo, CDI, antiarrítmico)'
        ]
      },
      redFlags: ['Síncope ao exercício', 'Palpitações antes', 'Dor torácica', 'ECG anormal', 'Cardiopatia conhecida'],
      metasTerapeuticas: ['Identificar causa', 'Prevenir recorrência', 'Avaliar risco de morte súbita'],
      examesIniciais: ['ECG', 'PA ortostática', 'Glicemia', 'Hemograma', 'Eco se suspeita cardíaca']
    },
    protocolos: [],
    medicamentos: ['fludrocortisona', 'midodrina'],
    calculadoras: [],
    tags: ['emergência', 'arritmia', 'neurologia']
  },
  {
    id: 'angina-estavel',
    titulo: 'Angina Estável',
    sinonimos: ['Angina pectoris crônica', 'Angina de esforço'],
    ciap2: ['K74'],
    cid10: ['I20.8', 'I20.9'],
    cid11: ['BA80.1'],
    doid: 'DOID:0111052',
    snomedCT: '194828000',
    meshId: 'D060050',
    umlsCui: 'C0340288',
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Dor torácica desencadeada por esforço ou estresse emocional, aliviada com repouso ou nitrato. Indica DAC obstrutiva.',
      criteriosDiagnosticos: [
        'Dor retroesternal, em aperto/pressão',
        'Desencadeada por esforço/estresse',
        'Aliviada em <10 min com repouso ou nitrato',
        'Angina típica: 3/3 critérios. Atípica: 2/3'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Modificação de fatores de risco',
          'Exercício supervisionado (reabilitação cardíaca)',
          'Cessação do tabagismo'
        ],
        farmacologico: [
          'AAS 100mg/dia',
          'Estatina de alta potência (atorvastatina 40-80mg)',
          'Betabloqueador (metoprolol, bisoprolol) - primeira linha antianginoso',
          'Nitrato SL de resgate',
          'Adicionar BCC se sintomas persistem'
        ]
      },
      redFlags: ['Angina instável', 'Angina em repouso', 'Angina progressiva', 'Angina pós-IAM'],
      metasTerapeuticas: ['LDL-c <55 mg/dL', 'PA <130/80', 'FC 55-60 bpm', 'Cessar tabaco'],
      examesIniciais: ['ECG', 'Ecocardiograma', 'Teste ergométrico', 'Perfil lipídico', 'Glicemia']
    },
    protocolos: ['dor-toracica'],
    medicamentos: ['aas', 'atorvastatina', 'metoprolol', 'isossorbida'],
    calculadoras: ['risco-cardiovascular'],
    tags: ['coronariopatia', 'prevenção', 'dor torácica']
  },
  {
    id: 'flutter-atrial',
    titulo: 'Flutter Atrial',
    sinonimos: ['FLA'],
    ciap2: ['K78'],
    cid10: ['I48.3', 'I48.4'],
    cid11: ['BC81.0'],
    doid: 'DOID:0060675',
    snomedCT: '5370000',
    meshId: 'D001282',
    umlsCui: 'C0004239',
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Taquiarritmia atrial com circuito de macrorreentrada. ECG típico: ondas F em dentes de serra, FC atrial ~300 bpm, condução AV geralmente 2:1 (FC ~150 bpm).',
      criteriosDiagnosticos: [
        'ECG: ondas F (dentes de serra) em DII, DIII, aVF',
        'Frequência atrial 250-350 bpm',
        'Condução AV 2:1, 3:1, 4:1 ou variável',
        'FC ventricular regular (exceto se condução variável)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cardioversão elétrica se instável (50-100J)',
          'Ablação por cateter (alta taxa de sucesso)'
        ],
        farmacologico: [
          'Controle de frequência: betabloqueador ou BCC não-dihidropiridínico',
          'Anticoagulação: mesmas regras da FA (CHA2DS2-VASc)',
          'Cardioversão farmacológica menos eficaz que na FA',
          'Ibutilida IV para cardioversão (hospitalar)'
        ]
      },
      redFlags: ['Instabilidade hemodinâmica', 'IC descompensada', 'Síndrome de pré-excitação'],
      metasTerapeuticas: ['Restaurar ritmo sinusal ou controlar FC', 'Prevenir tromboembolismo'],
      examesIniciais: ['ECG 12 derivações', 'Ecocardiograma', 'TSH', 'Eletrólitos']
    },
    protocolos: [],
    medicamentos: ['metoprolol', 'diltiazem', 'amiodarona'],
    calculadoras: ['cha2ds2-vasc'],
    tags: ['arritmia', 'anticoagulação', 'ablação']
  },
  {
    id: 'bloqueio-atrioventricular',
    titulo: 'Bloqueio Atrioventricular',
    sinonimos: ['BAV', 'Bloqueio AV'],
    ciap2: ['K84'],
    cid10: ['I44.0', 'I44.1', 'I44.2'],
    cid11: ['BC61'],
    doid: 'DOID:0110687',
    snomedCT: '233916004',
    meshId: 'D054537',
    umlsCui: 'C0004245',
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Distúrbio de condução entre átrios e ventrículos. 1º grau: PR prolongado. 2º grau: alguns P bloqueados. 3º grau (BAVT): dissociação AV completa.',
      criteriosDiagnosticos: [
        'BAV 1º grau: PR >200ms, todos P conduzidos',
        'BAV 2º grau Mobitz I: PR progressivamente maior até P bloqueado (Wenckebach)',
        'BAV 2º grau Mobitz II: P bloqueado sem alargamento prévio de PR',
        'BAV 3º grau (BAVT): nenhum P conduzido, escape ventricular'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'BAV 1º e Mobitz I: observação, remover drogas bradicardizantes',
          'BAVT e Mobitz II: marca-passo provisório → definitivo'
        ],
        farmacologico: [
          'Atropina 0,5-1mg IV (emergência, BAVT sintomático)',
          'Isoproterenol (temporário)',
          'Suspender drogas: betabloqueador, BCC, digoxina, amiodarona',
          'Tratar causa: isquemia, Lyme, hipercalemia'
        ]
      },
      redFlags: ['Síncope', 'Bradicardia sintomática', 'BAVT', 'Mobitz II', 'QRS largo no escape'],
      metasTerapeuticas: ['Marca-passo se indicado', 'FC adequada', 'Ausência de sintomas'],
      examesIniciais: ['ECG 12 derivações', 'Holter 24h', 'Eletrólitos', 'Função tireoidiana', 'Digoxinemia se uso']
    },
    protocolos: [],
    medicamentos: ['atropina'],
    calculadoras: [],
    tags: ['arritmia', 'marca-passo', 'emergência']
  },
  {
    id: 'hipertensao-pulmonar',
    titulo: 'Hipertensão Pulmonar',
    sinonimos: ['HP', 'Hipertensão arterial pulmonar'],
    ciap2: ['K82'],
    cid10: ['I27.0', 'I27.2'],
    cid11: ['BB01'],
    doid: 'DOID:6432',
    snomedCT: '70995007',
    meshId: 'D006976',
    umlsCui: 'C0020542',
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Pressão arterial pulmonar média ≥25 mmHg em repouso. Classificação: Grupo 1 (HAP), 2 (cardiopatia esquerda), 3 (pulmonar), 4 (CTEPH), 5 (multifatorial).',
      criteriosDiagnosticos: [
        'Sintomas: dispneia aos esforços progressiva, fadiga, síncope',
        'Eco: PSAP estimada >35-40 mmHg, dilatação de VD',
        'Cateterismo direito: PAPm ≥25 mmHg (diagnóstico definitivo)',
        'BNP/NT-proBNP elevados'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Limitar esforço físico intenso',
          'Oxigenoterapia se hipoxemia',
          'Anticoncepção (gestação contraindicada)'
        ],
        farmacologico: [
          'Grupo 2: tratar cardiopatia de base',
          'Grupo 3: tratar pneumopatia, O2',
          'Grupo 4 (CTEPH): anticoagulação, considerar cirurgia',
          'HAP: terapias específicas (sildenafil, bosentana, prostanoides)'
        ]
      },
      redFlags: ['Síncope', 'Sinais de falência de VD', 'BNP muito elevado', 'Derrame pericárdico'],
      metasTerapeuticas: ['Classe funcional OMS I-II', 'BNP baixo', 'Distância no TC6M'],
      examesIniciais: ['Ecocardiograma', 'BNP', 'TC de tórax', 'V/Q scan', 'Cateterismo direito']
    },
    protocolos: [],
    medicamentos: ['sildenafil'],
    calculadoras: [],
    tags: ['dispneia', 'insuficiência cardíaca', 'especializado']
  },
];
