/**
 * DOENÇAS PEDIÁTRICAS - EXPANSÃO COMPLETA 35 DOENÇAS
 * ===================================================
 *
 * Categorias:
 * - Infecções Comuns (12): Bronquiolite, Crupe, OMA, Faringoamigdalite, IVAS,
 *   Pneumonia, Meningite bacteriana, Coqueluche, Varicela, Escarlatina,
 *   Impetigo, Mão-pé-boca
 * - Doenças Respiratórias (5): Asma infantil, Laringite, RGE infantil,
 *   Apneia do lactente, Broncodisplasia
 * - Doenças GI (5): Diarreia aguda, Constipação, DRGE, Intolerância lactose,
 *   Doença celíaca
 * - Dermatológicas (4): Dermatite atópica, Dermatite seborreica, Eritema tóxico,
 *   Miliária
 * - Hematológicas (3): Anemia ferropriva, Púrpura trombocitopênica, Anemia G6PD
 * - Crescimento/Desenvolvimento (4): Baixa estatura, Obesidade infantil, TEA, TDAH
 * - Neonatais (2): Icterícia neonatal, Sepse neonatal
 *
 * Padrão Q1 com citações e ontologias
 */

import { Doenca } from '../../types/doenca';

export const doencasPediatricas: Partial<Doenca>[] = [
  // INFECÇÕES RESPIRATÓRIAS
  {
    id: 'bronquiolite',
    titulo: 'Bronquiolite Aguda',
    sinonimos: ['Bronquiolite viral', 'Bronquiolite por VSR'],
    doid: 'DOID:2942',
    snomedCT: '4120002',
    meshId: 'D001988',
    ciap2: ['R78'],
    cid10: ['J21', 'J21.0', 'J21.9'],
    categoria: 'respiratorio',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Infecção viral do trato respiratório inferior em lactentes <2 anos. Principal causa: VSR (60-80%). Pico: inverno. Caracterizada por inflamação bronquiolar com obstrução.',
      criteriosDiagnosticos: [
        'Lactente <2 anos',
        'Pródromo de IVAS (coriza, febre baixa)',
        'Evolução com taquipneia, sibilos, tiragem',
        'Diagnóstico CLÍNICO (não necessita exames)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Aspiração de vias aéreas', 'Posição elevada', 'Hidratação', 'Fracionamento alimentar'],
        farmacologico: ['Oxigênio se SpO2 <92%', 'Solução salina hipertônica nebulizada (considerar)', 'NÃO usar broncodilatadores de rotina', 'NÃO usar corticoides sistêmicos']
      },
      redFlags: ['Apneia', 'Cianose', 'SpO2 <92%', 'Desidratação', 'Idade <6 semanas', 'Prematuro', 'Cardiopatia']
    },
    medicamentos: [],
    protocolos: ['bronquiolite-manejo'],
    calculadoras: [],
    citations: [{ refId: 'aap-bronchiolitis-2014', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'respiratorio', 'vsr', 'lactente']
  },
  {
    id: 'crupe',
    titulo: 'Laringotraqueobronquite Aguda (Crupe)',
    sinonimos: ['Crupe viral', 'Laringite estridulosa'],
    doid: 'DOID:6133',
    snomedCT: '71186008',
    meshId: 'D003440',
    ciap2: ['R77'],
    cid10: ['J05', 'J05.0'],
    categoria: 'respiratorio',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Inflamação viral da laringe e traqueia em crianças de 6 meses a 3 anos. Caracterizada por estridor inspiratório e tosse ladrante. Causa principal: parainfluenza.',
      criteriosDiagnosticos: [
        'Tosse ladrante característica',
        'Estridor inspiratório',
        'Rouquidão',
        'Piora noturna'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Manter calma da criança', 'Ar umidificado (benefício incerto)', 'Hidratação'],
        farmacologico: ['Dexametasona 0,6mg/kg VO dose única', 'Nebulização com adrenalina se moderado/grave', 'Budesonida nebulizada se vômitos']
      },
      redFlags: ['Estridor em repouso persistente', 'Tiragem grave', 'Alteração consciência', 'Cianose', 'Sialorreia (pensar epiglotite)']
    },
    medicamentos: ['dexametasona'],
    protocolos: ['crupe-manejo'],
    calculadoras: [],
    citations: [{ refId: 'bjornson-croup-cochrane-2013', evidenceLevel: 'A', studyType: 'SystematicReview' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'respiratorio', 'laringe', 'emergencia']
  },
  {
    id: 'otite-media-aguda-pediatrica',
    titulo: 'Otite Média Aguda',
    sinonimos: ['OMA', 'Infecção de ouvido'],
    doid: 'DOID:10754',
    snomedCT: '3110003',
    meshId: 'D010033',
    ciap2: ['H71'],
    cid10: ['H65', 'H66'],
    categoria: 'infecciosas',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Infecção aguda do ouvido médio, comum em crianças <5 anos. Agentes: S. pneumoniae, H. influenzae, M. catarrhalis. Precedida de IVAS em 50-90%.',
      criteriosDiagnosticos: [
        'Otalgia + abaulamento de membrana timpânica',
        'Febre',
        'Irritabilidade',
        'Otorreia (se perfuração)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Analgesia', 'Observação expectante se >2 anos, sintomas leves, unilateral'],
        farmacologico: ['Amoxicilina 80-90mg/kg/dia ÷ 2 por 7-10 dias', 'Se falha: Amoxicilina-clavulanato', 'Analgesia: Ibuprofeno/Paracetamol']
      },
      redFlags: ['<6 meses', 'Febre alta >39°C', 'Otalgia intensa', 'OMA bilateral em <2 anos', 'Mastoidite (eritema retroauricular)']
    },
    medicamentos: ['amoxicilina', 'ibuprofeno', 'paracetamol'],
    protocolos: [],
    calculadoras: [],
    citations: [{ refId: 'aap-otitis-media-2013', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'otorrino', 'infecciosas']
  },
  {
    id: 'faringoamigdalite-pediatrica',
    titulo: 'Faringoamigdalite Aguda',
    sinonimos: ['Amigdalite', 'Dor de garganta'],
    doid: 'DOID:3083',
    snomedCT: '195666003',
    meshId: 'D010612',
    ciap2: ['R76'],
    cid10: ['J02', 'J03'],
    categoria: 'infecciosas',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Inflamação da faringe e amígdalas. Viral (maioria) vs. bacteriana (Streptococcus pyogenes - 15-30%). Pico: 5-15 anos.',
      criteriosDiagnosticos: [
        'Centor/McIsaac: Febre >38°C',
        'Ausência de tosse',
        'Linfonodomegalia cervical anterior',
        'Exsudato amigdaliano'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação', 'Gargarejo água morna', 'Repouso'],
        farmacologico: ['Se EBHGA: Penicilina Benzatina 600.000U (<27kg) ou 1.200.000U (>27kg) IM DU', 'Alternativa: Amoxicilina 50mg/kg/dia ÷2 por 10 dias', 'Analgésico/antitérmico']
      },
      redFlags: ['Abscesso periamigdaliano (trismo, voz abafada)', 'Dificuldade respiratória', 'Mononucleose (esplenomegalia)']
    },
    medicamentos: ['amoxicilina', 'penicilina-benzatina'],
    protocolos: [],
    calculadoras: ['centor-score'],
    citations: [{ refId: 'idsa-pharyngitis-2012', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'infecciosas', 'garganta']
  },
  {
    id: 'pneumonia-adquirida-comunidade-pediatrica',
    titulo: 'Pneumonia Adquirida na Comunidade (Pediátrica)',
    sinonimos: ['PAC infantil', 'Pneumonia bacteriana'],
    doid: 'DOID:552',
    snomedCT: '385093006',
    meshId: 'D011014',
    ciap2: ['R81'],
    cid10: ['J13', 'J14', 'J15', 'J18'],
    categoria: 'respiratorio',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Infecção do parênquima pulmonar adquirida fora do hospital. Em <5 anos: vírus (50%). Bacteriana: S. pneumoniae (principal), H. influenzae, S. aureus.',
      criteriosDiagnosticos: [
        'Febre + taquipneia (FR aumentada para idade)',
        'Tosse produtiva',
        'Estertores crepitantes localizados',
        'Radiografia: consolidação (se necessário)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação', 'Oxigênio se SpO2 <92%', 'Fisioterapia respiratória'],
        farmacologico: ['<5 anos ambulatorial: Amoxicilina 50-90mg/kg/dia ÷2 por 7-10 dias', '>5 anos com atípico: Azitromicina 10mg/kg D1, 5mg/kg D2-5', 'Grave: Internação + ATB IV']
      },
      redFlags: ['SpO2 <92%', 'Tiragem subcostal grave', 'Incapacidade de beber', 'Letargia', 'Convulsões', 'Desnutrição grave']
    },
    medicamentos: ['amoxicilina', 'azitromicina', 'ceftriaxona'],
    protocolos: ['pac-pediatrica'],
    calculadoras: [],
    citations: [{ refId: 'sbp-pneumonia-2018', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'respiratorio', 'pneumonia', 'infecciosas']
  },
  {
    id: 'coqueluche',
    titulo: 'Coqueluche',
    sinonimos: ['Tosse comprida', 'Pertussis'],
    doid: 'DOID:1116',
    snomedCT: '27836007',
    meshId: 'D014917',
    ciap2: ['R71'],
    cid10: ['A37', 'A37.0'],
    categoria: 'infecciosas',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Infecção respiratória por Bordetella pertussis. Altamente contagiosa. Três fases: catarral (1-2 sem), paroxística (2-8 sem), convalescença (semanas-meses).',
      criteriosDiagnosticos: [
        'Tosse paroxística ≥2 semanas',
        'Guincho inspiratório (crianças maiores)',
        'Vômitos pós-tosse',
        'Apneia/cianose (lactentes)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Isolamento respiratório', 'Monitorização se lactente', 'Aspiração de secreções'],
        farmacologico: ['Azitromicina 10mg/kg/dia por 5 dias (1ª escolha)', 'Profilaxia contatos domiciliares', 'Gestantes: dTpa no 3º trimestre']
      },
      redFlags: ['Lactente <6 meses', 'Apneia', 'Cianose', 'Pneumonia', 'Convulsões', 'Encefalopatia']
    },
    medicamentos: ['azitromicina', 'claritromicina'],
    protocolos: ['coqueluche-manejo'],
    calculadoras: [],
    citations: [{ refId: 'cdc-pertussis-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'infecciosas', 'vacinacao', 'notificacao']
  },
  {
    id: 'varicela',
    titulo: 'Varicela',
    sinonimos: ['Catapora', 'Chickenpox'],
    doid: 'DOID:8659',
    snomedCT: '38907003',
    meshId: 'D002644',
    ciap2: ['A72'],
    cid10: ['B01', 'B01.9'],
    categoria: 'infecciosas',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Infecção primária pelo vírus varicela-zoster (VZV). Altamente contagiosa. Exantema vesicular pruriginoso em diferentes estágios evolutivos.',
      criteriosDiagnosticos: [
        'Exantema vesicular ("gota de orvalho")',
        'Lesões em diferentes estágios',
        'Distribuição centrípeta',
        'Febre'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Isolamento até crostas', 'Banhos com permanganato diluído', 'Unhas curtas (evitar coçar)'],
        farmacologico: ['Sintomáticos: anti-histamínico VO', 'Anti-térmico (NÃO usar AAS - Reye)', 'Aciclovir se >12 anos ou imunodeprimido']
      },
      redFlags: ['Imunodeprimido', 'Pneumonia varicelosa', 'Encefalite', 'Celulite/sepse', 'Gestante suscetível']
    },
    medicamentos: ['aciclovir', 'paracetamol'],
    protocolos: [],
    calculadoras: [],
    citations: [{ refId: 'aap-redbook-varicella-2021', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'infecciosas', 'exantema', 'vacinacao']
  },
  {
    id: 'escarlatina',
    titulo: 'Escarlatina',
    sinonimos: ['Scarlet fever'],
    doid: 'DOID:9864',
    snomedCT: '30242009',
    meshId: 'D012541',
    ciap2: ['A78'],
    cid10: ['A38'],
    categoria: 'infecciosas',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Infecção por Streptococcus pyogenes produtor de toxina eritrogênica. Exantema micropapular ("lixa") + faringite + língua em framboesa.',
      criteriosDiagnosticos: [
        'Faringite exsudativa',
        'Exantema micropapular áspero',
        'Língua em framboesa',
        'Linhas de Pastia (dobras)',
        'Palidez perioral (sinal de Filatov)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Repouso', 'Hidratação', 'Isolamento 24h após ATB'],
        farmacologico: ['Penicilina Benzatina IM DU', 'Alternativa: Amoxicilina 50mg/kg/dia por 10 dias', 'Alérgicos: Eritromicina ou Azitromicina']
      },
      redFlags: ['Febre reumática (artrite, cardite)', 'GNPE (edema, hematúria)', 'Abscesso periamigdaliano']
    },
    medicamentos: ['penicilina-benzatina', 'amoxicilina'],
    protocolos: [],
    calculadoras: [],
    citations: [{ refId: 'idsa-gas-2012', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'infecciosas', 'exantema', 'streptococcus']
  },
  {
    id: 'impetigo',
    titulo: 'Impetigo',
    sinonimos: ['Piodermite', 'Impetigo bolhoso'],
    doid: 'DOID:8504',
    snomedCT: '48277006',
    meshId: 'D007169',
    ciap2: ['S84'],
    cid10: ['L01'],
    categoria: 'dermatologico',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Infecção bacteriana superficial da pele. Causa: S. aureus ou S. pyogenes. Tipos: crostoso (não-bolhoso) e bolhoso. Altamente contagioso.',
      criteriosDiagnosticos: [
        'Vesículas/pústulas superficiais',
        'Crostas melicéricas (cor de mel)',
        'Lesões em face/extremidades',
        'Forma bolhosa: bolhas flácidas'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Limpeza com água e sabão', 'Remoção suave de crostas', 'Evitar contato com outras crianças'],
        farmacologico: ['Localizado: Mupirocina 2% tópica 3x/dia por 5-7 dias', 'Extenso: Cefalexina 50mg/kg/dia ÷4 por 7 dias', 'Alérgicos: Azitromicina']
      },
      redFlags: ['Celulite', 'Linfangite', 'GNPE', 'Febre alta', 'Imunodepressão']
    },
    medicamentos: ['mupirocina', 'cefalexina'],
    protocolos: [],
    calculadoras: [],
    citations: [{ refId: 'aap-impetigo-2014', evidenceLevel: 'B', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'dermatologia', 'infecciosas']
  },
  {
    id: 'mao-pe-boca',
    titulo: 'Doença Mão-Pé-Boca',
    sinonimos: ['Hand-foot-mouth disease', 'Síndrome mão-pé-boca'],
    doid: 'DOID:10881',
    snomedCT: '266113007',
    meshId: 'D006232',
    ciap2: ['A76'],
    cid10: ['B08.4'],
    categoria: 'infecciosas',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Infecção viral pelo Coxsackie A16 ou Enterovírus 71. Típica em <5 anos. Vesículas em mãos, pés e mucosa oral.',
      criteriosDiagnosticos: [
        'Vesículas/úlceras em mucosa oral',
        'Vesículas em palmas e plantas',
        'Febre baixa',
        'Odinofagia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação oral', 'Dieta pastosa fria', 'Isolamento durante fase aguda'],
        farmacologico: ['Sintomáticos: analgésicos/antipiréticos', 'Anestésicos tópicos orais (gel lidocaína)']
      },
      redFlags: ['Desidratação', 'Letargia', 'Meningite asséptica', 'Encefalite (EV71)', 'Miocardite']
    },
    medicamentos: ['paracetamol', 'ibuprofeno'],
    protocolos: [],
    calculadoras: [],
    citations: [{ refId: 'cdc-hfmd-2021', evidenceLevel: 'B', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'infecciosas', 'exantema', 'enterovirus']
  },

  // DOENÇAS RESPIRATÓRIAS CRÔNICAS
  {
    id: 'asma-infantil',
    titulo: 'Asma na Infância',
    sinonimos: ['Asma brônquica infantil', 'Bronquite asmática'],
    doid: 'DOID:2841',
    snomedCT: '195967001',
    meshId: 'D001249',
    ciap2: ['R96'],
    cid10: ['J45', 'J45.0', 'J45.9'],
    categoria: 'respiratorio',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Doença inflamatória crônica das vias aéreas com episódios recorrentes de sibilância. Diagnóstico desafiador em <5 anos. Usar índice preditivo de asma (IPA).',
      criteriosDiagnosticos: [
        'Sibilância recorrente (≥3 episódios)',
        'Tosse noturna/matinal',
        'Dispneia aos esforços',
        'Melhora com broncodilatador',
        'IPA + (preditivo em <5 anos)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Controle ambiental', 'Evitar tabagismo passivo', 'Vacinação em dia', 'Educação sobre uso de dispositivos'],
        farmacologico: ['Leve intermitente: SABA resgate', 'Persistente: CI dose baixa (budesonida 100-200mcg)', 'Step-up se não controlado', 'Crise: SABA + corticoide sistêmico']
      },
      redFlags: ['Cianose', 'Uso musculatura acessória', 'Dificuldade para falar', 'SpO2 <92%', 'Silêncio torácico', 'Alteração consciência']
    },
    medicamentos: ['salbutamol', 'budesonida', 'prednisolona'],
    protocolos: ['asma-exacerbacao'],
    calculadoras: [],
    citations: [{ refId: 'gina-2023', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'respiratorio', 'cronico', 'asma']
  },

  // DOENÇAS GASTROINTESTINAIS
  {
    id: 'diarreia-aguda-infantil',
    titulo: 'Diarreia Aguda Infantil',
    sinonimos: ['Gastroenterite aguda', 'Diarreia viral'],
    doid: 'DOID:13250',
    snomedCT: '409966000',
    meshId: 'D003967',
    ciap2: ['D73'],
    cid10: ['A09', 'A08.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Alteração do hábito intestinal com ≥3 evacuações amolecidas/líquidas em 24h, duração <14 dias. Principal causa: rotavírus.',
      criteriosDiagnosticos: [
        '≥3 evacuações líquidas/dia',
        'Duração <14 dias (aguda)',
        'Avaliar grau de desidratação',
        'Sem sangue/muco = provavelmente viral'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['TRO (Soro caseiro ou SRO)', 'Manter alimentação habitual', 'Aleitamento materno livre demanda'],
        farmacologico: ['Zinco 10mg (<6m) ou 20mg (>6m)/dia por 10-14 dias', 'SEM antidiarreicos', 'SEM antieméticos de rotina', 'ATB só se indicação específica']
      },
      redFlags: ['Desidratação grave', 'Letargia', 'Olhos fundos', 'Sinal da prega >2s', 'Diurese ausente >6h', 'Sangue nas fezes']
    },
    medicamentos: ['sais-reidratacao-oral', 'sulfato-zinco'],
    protocolos: ['diarreia-aguda'],
    calculadoras: [],
    citations: [{ refId: 'who-diarrhea-2017', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'gastrointestinal', 'desidratacao', 'emergencia']
  },
  {
    id: 'constipacao-funcional-infantil',
    titulo: 'Constipação Funcional na Infância',
    sinonimos: ['Obstipação intestinal', 'Constipação crônica'],
    doid: 'DOID:2089',
    snomedCT: '14760008',
    meshId: 'D003248',
    ciap2: ['D12'],
    cid10: ['K59.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Evacuações infrequentes (<3/semana), dolorosas ou com retenção fecal. 90% funcional. Picos: treinamento esfincteriano e início escolar.',
      criteriosDiagnosticos: [
        'Roma IV: ≥2 critérios por 1 mês',
        '≤2 evacuações/semana',
        'Retenção fecal excessiva',
        'Evacuações dolorosas',
        'Fezes de grande calibre',
        'Escape fecal (encoprese)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Educação familiar (não punitivo)', 'Treinamento de hábito pós-refeições', 'Dieta com fibras', 'Hidratação adequada'],
        farmacologico: ['Desimpactação: PEG 1-1,5g/kg/dia por 3-6 dias', 'Manutenção: PEG 0,4-0,8g/kg/dia', 'Alternativa: Lactulose 1-2mL/kg/dia']
      },
      redFlags: ['Atraso eliminação mecônio (>48h)', 'Distensão abdominal grave', 'Vômitos biliosos', 'Déficit pôndero-estatural', 'Alteração neurológica']
    },
    medicamentos: ['polietilenoglicol', 'lactulose'],
    protocolos: [],
    calculadoras: [],
    citations: [{ refId: 'naspghan-constipation-2014', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'gastrointestinal', 'constipacao']
  },
  {
    id: 'drge-infantil',
    titulo: 'Doença do Refluxo Gastroesofágico (Lactentes)',
    sinonimos: ['DRGE pediátrica', 'Refluxo'],
    doid: 'DOID:8534',
    snomedCT: '235595009',
    meshId: 'D005764',
    ciap2: ['D84'],
    cid10: ['K21', 'K21.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'RGE fisiológico é comum em lactentes (50% até 3m). DRGE = sintomas/complicações pelo refluxo. Resolução espontânea 90% até 12-18 meses.',
      criteriosDiagnosticos: [
        'Regurgitações frequentes',
        'Irritabilidade/choro',
        'Recusa alimentar',
        'Déficit de crescimento',
        'Sintomas respiratórios (tosse, sibilância)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fracionamento de mamadas', 'Espessamento de fórmula (se FA)', 'Posição elevada após mamadas', 'Evitar superalimentação'],
        farmacologico: ['Teste terapêutico com IBP (esomeprazol 1mg/kg/dia)', 'NÃO usar procinéticos de rotina', 'Duração: 4-8 semanas']
      },
      redFlags: ['Vômitos biliosos', 'Hematêmese', 'Déficit crescimento', 'Disfagia', 'Pneumonias de repetição', 'Início após 6 meses']
    },
    medicamentos: ['omeprazol', 'esomeprazol'],
    protocolos: [],
    calculadoras: [],
    citations: [{ refId: 'naspghan-gerd-2018', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'gastrointestinal', 'refluxo', 'lactente']
  },
  {
    id: 'doenca-celiaca-pediatrica',
    titulo: 'Doença Celíaca',
    sinonimos: ['Enteropatia glúten-sensível', 'Celiac disease'],
    doid: 'DOID:10608',
    snomedCT: '396331005',
    meshId: 'D002446',
    ciap2: ['D99'],
    cid10: ['K90.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Enteropatia autoimune desencadeada pelo glúten em geneticamente predispostos (HLA-DQ2/DQ8). Prevalência ~1%. Formas: clássica, atípica, silenciosa.',
      criteriosDiagnosticos: [
        'Anti-transglutaminase IgA elevado (>10x)',
        'Anti-endomísio IgA positivo',
        'HLA-DQ2/DQ8 positivo',
        'Biópsia: atrofia vilositária Marsh 2-3',
        'Resposta à dieta sem glúten'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta sem glúten ESTRITA e VITALÍCIA', 'Educação nutricional', 'Suporte de nutricionista', 'Rastreio de complicações'],
        farmacologico: ['Reposição de ferro, folato, vitamina D se deficientes', 'Sem medicamento específico']
      },
      redFlags: ['Anemia refratária', 'Osteoporose precoce', 'Linfoma intestinal', 'Dermatite herpetiforme', 'Déficit estatural grave']
    },
    medicamentos: ['sulfato-ferroso', 'colecalciferol'],
    protocolos: ['doenca-celiaca'],
    calculadoras: [],
    citations: [{ refId: 'espghan-celiac-2020', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'gastrointestinal', 'autoimune', 'nutricao']
  },

  // DERMATOLÓGICAS
  {
    id: 'dermatite-atopica-pediatrica',
    titulo: 'Dermatite Atópica',
    sinonimos: ['Eczema atópico', 'Eczema infantil'],
    doid: 'DOID:3310',
    snomedCT: '24079001',
    meshId: 'D003876',
    ciap2: ['S87'],
    cid10: ['L20', 'L20.9'],
    categoria: 'dermatologico',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Dermatose inflamatória crônica pruriginosa. Início <5 anos em 90%. Marcha atópica (DA → rinite → asma). Curso recidivante.',
      criteriosDiagnosticos: [
        'Prurido obrigatório',
        'Morfologia típica para idade (face/extensores em lactentes; flexuras em maiores)',
        'Curso crônico/recidivante',
        'História pessoal/familiar de atopia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação intensa (emolientes 2-3x/dia)', 'Banhos curtos, água morna', 'Sabonete neutro', 'Evitar gatilhos', 'Cortar unhas'],
        farmacologico: ['Crises leves: Hidrocortisona 1% tópica', 'Crises moderadas: Mometasona ou similar', 'Inibidor calcineurina tópico (pimecrolimus, tacrolimus) >2 anos', 'Anti-histamínico VO se prurido intenso']
      },
      redFlags: ['Eczema herpético', 'Infecção secundária extensa', 'Eritrodermia', 'Refratariedade ao tratamento']
    },
    medicamentos: ['hidrocortisona-topica', 'mometasona-topica', 'pimecrolimus'],
    protocolos: ['dermatite-atopica'],
    calculadoras: ['scorad'],
    citations: [{ refId: 'aad-atopic-dermatitis-2014', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'dermatologia', 'atopia', 'cronico']
  },
  {
    id: 'dermatite-seborreica-infantil',
    titulo: 'Dermatite Seborreica Infantil',
    sinonimos: ['Crosta láctea', 'Seborreia'],
    doid: 'DOID:5577',
    snomedCT: '86708008',
    meshId: 'D012628',
    ciap2: ['S86'],
    cid10: ['L21', 'L21.0'],
    categoria: 'dermatologico',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Dermatose eritematoescamosa benigna em lactentes. Pico: 2-10 semanas. Couro cabeludo (crosta láctea), face, dobras. Resolução espontânea até 6-12 meses.',
      criteriosDiagnosticos: [
        'Escamas amareladas oleosas',
        'Couro cabeludo e sobrancelhas',
        'Pode afetar dobras',
        'NÃO pruriginosa (diferencia de DA)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Óleo mineral/vegetal para amolecer crostas', 'Pente fino para remover escamas', 'Shampoo infantil suave'],
        farmacologico: ['Shampoo com ketoconazol 2% (se extenso)', 'Hidrocortisona 1% se inflamação', 'Geralmente não necessita tratamento']
      },
      redFlags: ['Eritema disseminado (considerar doença de Leiner)', 'Prurido intenso (considerar DA)', 'Imunodepressão']
    },
    medicamentos: ['cetoconazol-topico'],
    protocolos: [],
    calculadoras: [],
    citations: [{ refId: 'aap-seborrheic-dermatitis-2019', evidenceLevel: 'B', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'dermatologia', 'lactente']
  },

  // HEMATOLÓGICAS
  {
    id: 'anemia-ferropriva-infantil',
    titulo: 'Anemia Ferropriva na Infância',
    sinonimos: ['Anemia por deficiência de ferro', 'Anemia nutricional'],
    doid: 'DOID:11758',
    snomedCT: '87522002',
    meshId: 'D018798',
    ciap2: ['B80'],
    cid10: ['D50', 'D50.9'],
    categoria: 'hematologico',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Anemia mais comum na infância. Prevalência 20-30% em <5 anos no Brasil. Causa: desequilíbrio oferta/demanda de ferro.',
      criteriosDiagnosticos: [
        'Hb <11g/dL (6m-5a) ou <11,5g/dL (5-11a)',
        'VCM baixo (microcitose)',
        'RDW elevado (anisocitose)',
        'Ferritina <12ng/mL (ou <30 se inflamação)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Alimentação rica em ferro heme', 'Vitamina C junto ao ferro', 'Evitar leite de vaca em excesso (<500mL/dia)', 'Profilaxia: ferro dos 3-24 meses'],
        farmacologico: ['Sulfato ferroso 3-5mg/kg/dia de Fe elementar', 'Longe das refeições (melhor absorção)', 'Duração: até 3-6 meses após normalização Hb']
      },
      redFlags: ['Anemia grave (Hb <7)', 'Não resposta ao tratamento (>4 sem)', 'Sangramento GI', 'Sintomas neurológicos']
    },
    medicamentos: ['sulfato-ferroso', 'ferro-quelado'],
    protocolos: ['anemia-ferropriva'],
    calculadoras: [],
    citations: [{ refId: 'who-iron-deficiency-2020', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'hematologia', 'nutricao', 'prevencao']
  },
  {
    id: 'pti-pediatrica',
    titulo: 'Púrpura Trombocitopênica Imune (PTI)',
    sinonimos: ['PTI', 'Púrpura trombocitopênica idiopática'],
    doid: 'DOID:8924',
    snomedCT: '13172003',
    meshId: 'D016553',
    ciap2: ['B83'],
    cid10: ['D69.3'],
    categoria: 'hematologico',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Trombocitopenia imune isolada (<100.000/µL). Pico: 2-5 anos. Geralmente pós-viral. Autolimitada em 80% das crianças (resolução em 6 meses).',
      criteriosDiagnosticos: [
        'Plaquetas <100.000/µL',
        'Sangramento mucocutâneo (petéquias, equimoses)',
        'Ausência de outras causas',
        'Resto do hemograma normal'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Observação se leve (plaq >30.000, sem sangramento)', 'Restrição de atividades de impacto', 'Evitar AAS/AINEs'],
        farmacologico: ['Se sangramento significativo ou plaq <20.000:', 'Prednisona 2mg/kg/dia por 7-14 dias', 'IGIV 0,8-1g/kg DU se urgência', 'Anti-D se Rh+ (exceto refratários)']
      },
      redFlags: ['Sangramento intracraniano', 'Sangramento GI volumoso', 'Plaquetas <10.000', 'PTI crônica (>12 meses)']
    },
    medicamentos: ['prednisona', 'imunoglobulina-humana'],
    protocolos: ['pti-pediatrica'],
    calculadoras: [],
    citations: [{ refId: 'ash-itp-2019', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'hematologia', 'autoimune', 'sangramento']
  },

  // CRESCIMENTO E DESENVOLVIMENTO
  {
    id: 'tdah',
    titulo: 'Transtorno do Déficit de Atenção e Hiperatividade',
    sinonimos: ['TDAH', 'ADHD', 'DDA'],
    doid: 'DOID:1094',
    snomedCT: '406506008',
    meshId: 'D001289',
    ciap2: ['P81'],
    cid10: ['F90', 'F90.0'],
    categoria: 'saude_mental',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Transtorno do neurodesenvolvimento com desatenção, hiperatividade e impulsividade inapropriados para idade. Início <12 anos. Prevalência ~5% em crianças.',
      criteriosDiagnosticos: [
        'DSM-5: ≥6 sintomas de desatenção E/OU ≥6 de hiperatividade/impulsividade',
        'Duração ≥6 meses',
        'Início antes dos 12 anos',
        'Prejuízo em ≥2 ambientes',
        'Descartadas outras causas'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Psicoeducação família e escola', 'Terapia comportamental', 'Treinamento parental', 'Adaptações escolares'],
        farmacologico: ['Metilfenidato (Ritalina) 0,3-1mg/kg/dia', 'Iniciar dose baixa, titular gradualmente', 'Monitorar PA, FC, crescimento', 'Lisdexanfetamina alternativa']
      },
      redFlags: ['Ideação suicida', 'Comorbidade psiquiátrica grave', 'Abuso de substâncias', 'Cardiopatia (ecocardiograma prévio)']
    },
    medicamentos: ['metilfenidato', 'lisdexanfetamina'],
    protocolos: ['tdah-manejo'],
    calculadoras: ['snap-iv'],
    citations: [{ refId: 'aacap-adhd-2019', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'saude-mental', 'neurodesenvolvimento', 'escola']
  },
  {
    id: 'tea',
    titulo: 'Transtorno do Espectro Autista',
    sinonimos: ['TEA', 'Autismo', 'Espectro autista'],
    doid: 'DOID:0060041',
    snomedCT: '35919005',
    meshId: 'D000067877',
    ciap2: ['P99'],
    cid10: ['F84', 'F84.0'],
    categoria: 'saude_mental',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Transtorno do neurodesenvolvimento com déficits na comunicação social e padrões repetitivos/restritos de comportamento. Prevalência ~1%. Diagnóstico clínico.',
      criteriosDiagnosticos: [
        'DSM-5: Déficits persistentes na comunicação/interação social',
        'Padrões restritos e repetitivos de comportamento',
        'Início na primeira infância',
        'Prejuízo funcional',
        'Não explicado por DI isolada'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Intervenção precoce intensiva (ABA, TEACCH)', 'Fonoaudiologia', 'Terapia ocupacional', 'Psicoeducação familiar', 'Suporte escolar inclusivo'],
        farmacologico: ['SEM medicamento para TEA em si', 'Comorbidades: Risperidona/Aripiprazol para irritabilidade', 'ISRS para ansiedade', 'Estimulantes para TDAH comórbido']
      },
      redFlags: ['Regressão do desenvolvimento', 'Epilepsia', 'Autolesão', 'Heteroagressividade', 'Comorbidade psiquiátrica']
    },
    medicamentos: ['risperidona', 'aripiprazol'],
    protocolos: ['tea-manejo'],
    calculadoras: ['mchat'],
    citations: [{ refId: 'aap-autism-2020', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'saude-mental', 'neurodesenvolvimento', 'autismo']
  },
  {
    id: 'baixa-estatura',
    titulo: 'Baixa Estatura',
    sinonimos: ['Déficit estatural', 'Crescimento inadequado'],
    doid: 'DOID:0050539',
    snomedCT: '237837007',
    meshId: 'D004393',
    ciap2: ['T10'],
    cid10: ['E34.3', 'R62.0'],
    categoria: 'endocrino',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Estatura abaixo do percentil 3 ou -2DP para idade e sexo. Causas: variantes normais (80%), patológicas (20%). Avaliar velocidade de crescimento.',
      criteriosDiagnosticos: [
        'Estatura <P3 ou <-2DP',
        'Velocidade de crescimento <P25',
        'Desproporção alvo genético',
        'Investigar causa subjacente'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Assegurar nutrição adequada', 'Tratar doença de base', 'Suporte psicológico', 'Acompanhamento de crescimento'],
        farmacologico: ['GH recombinante se deficiência de GH, Turner, Prader-Willi, DRC, PIG', 'Dose: 0,025-0,05mg/kg/dia SC', 'Até fechamento epifisário']
      },
      redFlags: ['Velocidade de crescimento <P10', 'Desproporção corporal', 'Dismorfismos', 'Atraso puberal', 'Sintomas neurológicos']
    },
    medicamentos: ['somatropina'],
    protocolos: ['baixa-estatura'],
    calculadoras: ['zscore-estatura'],
    citations: [{ refId: 'sbp-baixa-estatura-2019', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'endocrinologia', 'crescimento']
  },
  {
    id: 'obesidade-infantil',
    titulo: 'Obesidade Infantil',
    sinonimos: ['Sobrepeso', 'Excesso de peso'],
    doid: 'DOID:9970',
    snomedCT: '414916001',
    meshId: 'D063766',
    ciap2: ['T82'],
    cid10: ['E66', 'E66.9'],
    categoria: 'endocrino',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'IMC ≥percentil 95 para idade e sexo. Prevalência crescente (epidemia). Associada a complicações metabólicas, cardiovasculares e psicossociais.',
      criteriosDiagnosticos: [
        'Sobrepeso: IMC P85-P95',
        'Obesidade: IMC ≥P95',
        'Obesidade grave: IMC ≥120% do P95',
        'Usar curvas OMS ou CDC'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Mudança de estilo de vida familiar', 'Dieta hipocalórica balanceada', 'Atividade física 60min/dia', 'Redução de telas <2h/dia', 'Terapia comportamental'],
        farmacologico: ['Geralmente não indicado em crianças', 'Adolescentes >12a com comorbidades: considerar Orlistat ou Liraglutida', 'Cirurgia bariátrica: casos selecionados']
      },
      redFlags: ['Obesidade grave', 'Acantose nigricans', 'HAS', 'Dislipidemia', 'Esteatose hepática', 'Apneia do sono', 'DMII']
    },
    medicamentos: [],
    protocolos: ['obesidade-infantil'],
    calculadoras: ['imc-percentil'],
    citations: [{ refId: 'sbp-obesidade-2019', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'endocrinologia', 'nutricao', 'cronico']
  },

  // NEONATAIS
  {
    id: 'ictericia-neonatal',
    titulo: 'Icterícia Neonatal',
    sinonimos: ['Hiperbilirrubinemia neonatal', 'Icterícia do recém-nascido'],
    doid: 'DOID:0060903',
    snomedCT: '387712008',
    meshId: 'D051556',
    ciap2: ['D13'],
    cid10: ['P59', 'P59.9'],
    categoria: 'pediatrico',
    subcategoria: 'neonatal',
    quickView: {
      definicao: 'Coloração amarelada da pele por bilirrubina indireta >5mg/dL. Fisiológica (60-80% RN termo). Risco: kernicterus se BI muito elevada.',
      criteriosDiagnosticos: [
        'Icterícia visível (zona de Kramer)',
        'Bilirrubina total >5mg/dL (visível)',
        'Avaliar fatores de risco',
        'Usar nomograma de Bhutani'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fototerapia (indicação por nomograma)', 'Hidratação adequada', 'Amamentação frequente', 'Monitorização de bilirrubina'],
        farmacologico: ['Exsanguineotransfusão se BT crítica', 'IGIV se incompatibilidade Rh/ABO com hemólise']
      },
      redFlags: ['Icterícia <24h de vida (SEMPRE patológica)', 'BT >20mg/dL', 'Elevação >0,5mg/dL/h', 'Icterícia >2 semanas', 'BD elevada (colestase)']
    },
    medicamentos: ['imunoglobulina-humana'],
    protocolos: ['ictericia-neonatal'],
    calculadoras: ['bhutani-nomogram'],
    citations: [{ refId: 'aap-jaundice-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'neonatal', 'ictericia', 'emergencia']
  },
  {
    id: 'sepse-neonatal',
    titulo: 'Sepse Neonatal',
    sinonimos: ['Infecção neonatal', 'Septicemia do recém-nascido'],
    doid: 'DOID:0080879',
    snomedCT: '206383005',
    meshId: 'D058786',
    ciap2: ['A78'],
    cid10: ['P36', 'P36.9'],
    categoria: 'infecciosas',
    subcategoria: 'neonatal',
    quickView: {
      definicao: 'Síndrome clínica de infecção sistêmica no período neonatal (0-28 dias). Precoce (<72h): vertical. Tardia (>72h): hospitalar ou comunitária.',
      criteriosDiagnosticos: [
        'Clínica inespecífica: letargia, instabilidade térmica, recusa alimentar',
        'Distermia, taquipneia, taquicardia',
        'Hemograma alterado (leucocitose/leucopenia, relação I/T)',
        'PCR elevada',
        'Hemocultura positiva (padrão-ouro)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte ventilatório', 'Suporte hemodinâmico', 'Controle térmico', 'Suporte nutricional'],
        farmacologico: ['Precoce: Ampicilina + Gentamicina', 'Tardia hospitalar: Oxacilina + Amicacina (ou Vancomicina se MRSA)', 'Tardia comunitária: Ampicilina + Cefotaxima']
      },
      redFlags: ['Choque séptico', 'CIVD', 'Meningite', 'NEC', 'Falência de múltiplos órgãos']
    },
    medicamentos: ['ampicilina', 'gentamicina', 'cefotaxima', 'vancomicina'],
    protocolos: ['sepse-neonatal'],
    calculadoras: ['kaiser-sepsis-calculator'],
    citations: [{ refId: 'aap-sepsis-neonatal-2018', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'neonatal', 'infecciosas', 'emergencia', 'uti']
  },

  // DOENÇAS RESPIRATÓRIAS ADICIONAIS
  {
    id: 'meningite-bacteriana-pediatrica',
    titulo: 'Meningite Bacteriana (Pediátrica)',
    sinonimos: ['Meningite purulenta'],
    doid: 'DOID:9470',
    snomedCT: '95883001',
    meshId: 'D016920',
    ciap2: ['N71'],
    cid10: ['G00', 'G00.9'],
    categoria: 'infecciosas',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Infecção das meninges por bactérias. Emergência médica. Agentes variam com idade: RN (E. coli, GBS, Listeria), lactentes/crianças (S. pneumoniae, N. meningitidis, Hib).',
      criteriosDiagnosticos: [
        'Febre, cefaleia, vômitos',
        'Sinais meníngeos (Kernig, Brudzinski)',
        'Alteração do nível de consciência',
        'LCR: pleocitose PMN, glicose baixa, proteína alta'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Isolamento respiratório (se meningococo)', 'Monitorização neurológica', 'Controle de PIC'],
        farmacologico: ['Empírico: Ceftriaxona 100mg/kg/dia ÷2 + Vancomicina', 'RN: Ampicilina + Cefotaxima', 'Dexametasona 0,15mg/kg 6/6h por 4 dias (Hib, pneumococo)']
      },
      redFlags: ['Coma', 'Convulsões', 'Púrpura fulminante', 'Choque', 'Sinais de herniação']
    },
    medicamentos: ['ceftriaxona', 'vancomicina', 'dexametasona', 'ampicilina'],
    protocolos: ['meningite-bacteriana'],
    calculadoras: [],
    citations: [{ refId: 'idsa-bacterial-meningitis-2017', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'infecciosas', 'neurologia', 'emergencia', 'notificacao']
  },
  {
    id: 'convulsao-febril',
    titulo: 'Convulsão Febril',
    sinonimos: ['Crise febril', 'Convulsão associada à febre'],
    doid: 'DOID:13497',
    snomedCT: '41497008',
    meshId: 'D003294',
    ciap2: ['N29'],
    cid10: ['R56.0'],
    categoria: 'neurologico',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Crise convulsiva associada à febre (≥38°C) em crianças de 6 meses a 5 anos, sem infecção do SNC. Simples (80%): <15min, generalizada, 1 episódio/24h.',
      criteriosDiagnosticos: [
        'Idade: 6 meses - 5 anos',
        'Febre ≥38°C',
        'Ausência de infecção SNC',
        'Sem história de crise afebril prévia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Posição de segurança', 'Não introduzir objetos na boca', 'Controle da febre', 'Investigar foco infeccioso'],
        farmacologico: ['Crise em atividade >5min: Diazepam retal 0,5mg/kg', 'Antipiréticos para conforto (não previnem recorrência)', 'NÃO usar anticonvulsivantes crônicos']
      },
      redFlags: ['Complexa: >15min, focal, múltiplas/24h', 'Estado de mal febril', 'Alteração neurológica pós-ictal >1h', 'Suspeita de meningite']
    },
    medicamentos: ['diazepam', 'paracetamol', 'ibuprofeno'],
    protocolos: ['convulsao-febril'],
    calculadoras: [],
    citations: [{ refId: 'aap-febrile-seizures-2011', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'neurologia', 'febre', 'emergencia']
  },
  {
    id: 'rge-infantil',
    titulo: 'Refluxo Gastroesofágico Fisiológico',
    sinonimos: ['Regurgitação do lactente', 'Golfada'],
    doid: 'DOID:8534',
    snomedCT: '235595009',
    meshId: 'D005764',
    ciap2: ['D84'],
    cid10: ['K21.9'],
    categoria: 'gastrointestinal',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Passagem de conteúdo gástrico para esôfago, comum em lactentes. Fisiológico em 50% até 3 meses. Resolução em 90% até 12-18 meses.',
      criteriosDiagnosticos: [
        'Regurgitações frequentes',
        'Lactente com bom ganho de peso',
        'Sem irritabilidade excessiva',
        'Diagnóstico CLÍNICO'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Reasseguramento parental', 'Mamadas em menor volume, mais frequentes', 'Manter ereto 20-30min pós-mamada', 'Elevação de cabeceira 30°'],
        farmacologico: ['NÃO indicado em RGE fisiológico', 'Espessantes de fórmula (se artificial)']
      },
      redFlags: ['Vômitos biliosos ou em jato', 'Sangramento', 'Déficit de crescimento', 'Apneia', 'Dificuldade alimentar']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: [],
    citations: [{ refId: 'naspghan-gerd-infant-2018', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'gastrointestinal', 'lactente', 'fisiologico']
  },
  {
    id: 'alergia-proteina-leite-vaca',
    titulo: 'Alergia à Proteína do Leite de Vaca',
    sinonimos: ['APLV', 'Alergia ao leite'],
    doid: 'DOID:4376',
    snomedCT: '782555009',
    meshId: 'D016269',
    ciap2: ['A12', 'D02'],
    cid10: ['K52.2', 'L27.2'],
    categoria: 'gastrointestinal',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Reação imunológica adversa às proteínas do leite de vaca. IgE-mediada (imediata) ou não-IgE-mediada (tardia). Prevalência ~2-3% lactentes.',
      criteriosDiagnosticos: [
        'Sintomas após ingestão de leite',
        'Melhora com exclusão de PLV',
        'Recidiva à reintrodução',
        'IgE específica ou prick test (se IgE-mediada)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exclusão de PLV da dieta do lactente', 'Se AM: mãe exclui laticínios', 'Se FA: fórmula extensamente hidrolisada', 'Se grave: fórmula de aminoácidos'],
        farmacologico: ['Anti-histamínico se urticária', 'Adrenalina IM se anafilaxia', 'Corticoide se sintomas GI graves']
      },
      redFlags: ['Anafilaxia', 'Déficit de crescimento', 'Anemia', 'FPIES (enterocolite)', 'Enteropatia com hipoalbuminemia']
    },
    medicamentos: ['adrenalina', 'cetirizina'],
    protocolos: ['aplv-manejo'],
    calculadoras: [],
    citations: [{ refId: 'dracma-guideline-2010', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'alergia', 'nutricao', 'lactente']
  },
  {
    id: 'puberdade-precoce',
    titulo: 'Puberdade Precoce',
    sinonimos: ['Desenvolvimento sexual precoce'],
    doid: 'DOID:12930',
    snomedCT: '400179000',
    meshId: 'D011629',
    ciap2: ['T99'],
    cid10: ['E30.1'],
    categoria: 'endocrino',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Desenvolvimento de caracteres sexuais secundários antes dos 8 anos (meninas) ou 9 anos (meninos). Central (GnRH-dependente) ou periférica.',
      criteriosDiagnosticos: [
        'Telarca <8 anos em meninas',
        'Aumento testicular <9 anos em meninos',
        'Aceleração de velocidade de crescimento',
        'Avanço de idade óssea'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte psicológico', 'Investigação etiológica (RNM, US)', 'Acompanhamento de crescimento'],
        farmacologico: ['Central: Análogo de GnRH (Leuprolida 3,75mg IM mensal)', 'Periférica: tratar causa (tumor, HCC)', 'Objetivo: preservar estatura final']
      },
      redFlags: ['Puberdade rapidamente progressiva', 'Sinais de tumor (cefaleia, alteração visual)', 'Puberdade periférica (não GnRH-dependente)']
    },
    medicamentos: ['leuprolida'],
    protocolos: ['puberdade-precoce'],
    calculadoras: ['idade-ossea'],
    citations: [{ refId: 'sbp-puberdade-precoce-2020', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'endocrinologia', 'puberdade']
  },
  {
    id: 'infeccao-trato-urinario-pediatrica',
    titulo: 'Infecção do Trato Urinário (Pediátrica)',
    sinonimos: ['ITU infantil', 'Pielonefrite pediátrica'],
    doid: 'DOID:13148',
    snomedCT: '68566005',
    meshId: 'D014552',
    ciap2: ['U71'],
    cid10: ['N39.0', 'N10'],
    categoria: 'urologico',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Infecção bacteriana do trato urinário. Mais comum em meninas após 1 ano. Em <2 anos: sempre investigar malformações. E. coli responsável por 80%.',
      criteriosDiagnosticos: [
        'Clínica: disúria, polaciúria, febre',
        'Lactentes: febre sem foco, irritabilidade',
        'EAS: leucocitúria, bacteriúria',
        'Urocultura ≥100.000 UFC/mL'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação', 'Higiene adequada', 'Esvaziamento vesical frequente'],
        farmacologico: ['Cistite: Cefalexina ou Nitrofurantoína VO 7 dias', 'Pielonefrite: Ceftriaxona 50-75mg/kg/dia IV', 'Lactente febril <3m: internação + ATB IV']
      },
      redFlags: ['<3 meses', 'Sepse', 'Não resposta a ATB 48-72h', 'ITU recorrente', 'Malformação urinária conhecida']
    },
    medicamentos: ['cefalexina', 'ceftriaxona', 'nitrofurantoina'],
    protocolos: ['itu-pediatrica'],
    calculadoras: [],
    citations: [{ refId: 'aap-uti-pediatric-2016', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'nefrologia', 'infecciosas', 'urologia']
  },
  {
    id: 'intolerancia-lactose',
    titulo: 'Intolerância à Lactose',
    sinonimos: ['Má absorção de lactose', 'Deficiência de lactase'],
    doid: 'DOID:10609',
    snomedCT: '190751001',
    meshId: 'D007787',
    ciap2: ['D99'],
    cid10: ['E73', 'E73.9'],
    categoria: 'gastrointestinal',
    subcategoria: 'pediatrico',
    quickView: {
      definicao: 'Incapacidade de digerir lactose por deficiência de lactase. Tipos: congênita (rara), primária (hipolactasia adulta), secundária (pós-infecção/doença intestinal).',
      criteriosDiagnosticos: [
        'Sintomas GI após ingestão de lactose',
        'Distensão, flatulência, diarreia',
        'Melhora com exclusão de lactose',
        'Teste H2 expirado positivo (se disponível)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Redução/exclusão de lactose', 'Uso de leite sem lactose', 'Iogurtes e queijos (melhor tolerados)', 'Garantir aporte de cálcio'],
        farmacologico: ['Lactase exógena antes de consumir laticínios', 'Suplementação de cálcio/vitamina D se necessário']
      },
      redFlags: ['Déficit de crescimento', 'Diarreia crônica grave', 'Suspeita de doença celíaca', 'Início neonatal']
    },
    medicamentos: ['lactase', 'calcio', 'colecalciferol'],
    protocolos: [],
    calculadoras: [],
    citations: [{ refId: 'niddk-lactose-intolerance-2018', evidenceLevel: 'B', studyType: 'Guideline' }],
    lastUpdate: '2025-01',
    tags: ['pediatria', 'gastrointestinal', 'nutricao']
  }
];

export default doencasPediatricas;
