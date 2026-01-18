/**
 * DOENÇAS PEDIÁTRICAS - DARWIN-MFC
 * =================================
 * Doenças da infância comuns na APS
 * 
 * Nota: fullContent será expandido em versão futura
 */

import { Doenca } from '../../types/doenca';

export const doencasPediatricas: Partial<Doenca>[] = [
  {
    id: 'bronquiolite',
    titulo: 'Bronquiolite Viral Aguda',
    ciap2: ['R78'],
    cid10: ['J21'],
    cid11: ['CA21'],
    categoria: 'respiratorio',
    doid: 'DOID:2942',
    snomedCT: '4120002',
    meshId: 'D001988',
    umlsCui: 'C0006271',
    quickView: {
      definicao: 'Infecção viral das vias aéreas inferiores mais comum em lactentes <2 anos. Pico entre 2-6 meses. Principal causa: VSR (70%). Sazonal: outono/inverno.',
      criteriosDiagnosticos: ['Primeiro episódio de sibilância', 'Idade <2 anos', 'Pródromos de IVAS', 'Época sazonal'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Aspiração nasal', 'Fracionamento alimentar', 'Posição elevada', 'Hidratação'],
        farmacologico: ['Oxigênio se SpO2 <92%', 'Solução salina hipertônica nebulizada (considerar)', 'NÃO usar broncodilatadores de rotina']
      },
      redFlags: ['Apneia', 'Cianose', 'SpO2 <92%', 'Desidratação', 'Idade <6 semanas', 'Prematuro']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: [],
    citations: [
      { refId: 'aap-bronchiolitis-2014', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'ralston-bronchiolitis-cochrane-2014', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'florin-bronchiolitis-management-2017', evidenceLevel: 'B', studyType: 'SystematicReview' },
      { refId: 'hasegawa-rsv-bronchiolitis-2013', evidenceLevel: 'B', studyType: 'Cohort' }
    ]
  },
  {
    id: 'laringite-aguda',
    titulo: 'Laringotraqueobronquite Aguda (Crupe)',
    ciap2: ['R77'],
    cid10: ['J05'],
    cid11: ['CA03'],
    categoria: 'respiratorio',
    doid: 'DOID:6133',
    snomedCT: '71186008',
    meshId: 'D003440',
    umlsCui: 'C0010380',
    quickView: {
      definicao: 'Inflamação viral da laringe e traqueia em crianças de 6 meses a 3 anos. Caracterizada por estridor inspiratório e tosse ladrante. Causa principal: parainfluenza.',
      criteriosDiagnosticos: ['Tosse ladrante característica', 'Estridor inspiratório', 'Rouquidão', 'Piora noturna'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Umidificação do ar', 'Manter calma da criança', 'Hidratação'],
        farmacologico: ['Dexametasona 0,6mg/kg VO dose única', 'Nebulização com adrenalina (casos moderados/graves)']
      },
      redFlags: ['Estridor em repouso', 'Tiragem grave', 'Alteração da consciência', 'Cianose', 'Sialorreia (epiglotite)']
    },
    medicamentos: ['dexametasona'],
    protocolos: [],
    calculadoras: [],
    citations: [
      { refId: 'bjornson-croup-cochrane-2013', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'russell-croup-glucocorticoids-2011', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'waisman-nebulized-epinephrine-croup-rct-1992', evidenceLevel: 'B', studyType: 'RCT' },
      { refId: 'cherry-croup-current-diagnosis-2008', evidenceLevel: 'B', studyType: 'Guideline' }
    ]
  },
  {
    id: 'otite-media-aguda',
    titulo: 'Otite Média Aguda',
    ciap2: ['H71'],
    cid10: ['H65', 'H66'],
    cid11: ['AA80'],
    categoria: 'infecciosas',
    doid: 'DOID:10754',
    snomedCT: '3110003',
    meshId: 'D010033',
    umlsCui: 'C0029882',
    quickView: {
      definicao: 'Infecção aguda do ouvido médio, comum em crianças <5 anos. Agentes: S. pneumoniae, H. influenzae, M. catarrhalis.',
      criteriosDiagnosticos: ['Otalgia + abaulamento de MT', 'Febre', 'Irritabilidade', 'Otorreia (perfuração)'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Analgesia', 'Observação expectante (casos leves, >2 anos)'],
        farmacologico: ['Amoxicilina 80-90mg/kg/dia ÷ 2 por 7-10 dias', 'Ibuprofeno/Paracetamol para dor']
      },
      redFlags: ['<6 meses', 'Febre alta >39°C', 'Otalgia intensa', 'OMA bilateral', 'Mastoidite (eritema retroauricular)']
    },
    medicamentos: ['amoxicilina', 'ibuprofeno', 'paracetamol'],
    protocolos: [],
    calculadoras: [],
    citations: [
      { refId: 'aap-otitis-media-2013', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'lieberthal-aom-diagnosis-management-2013', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'rovers-aom-antibiotics-cochrane-2006', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'venekamp-aom-antibiotics-cochrane-2015', evidenceLevel: 'A', studyType: 'SystematicReview' }
    ]
  },
  {
    id: 'faringoamigdalite',
    titulo: 'Faringoamigdalite Aguda',
    ciap2: ['R76'],
    cid10: ['J02', 'J03'],
    cid11: ['CA02'],
    categoria: 'infecciosas',
    doid: 'DOID:3083',
    snomedCT: '195666003',
    meshId: 'D010612',
    umlsCui: 'C0031350',
    quickView: {
      definicao: 'Inflamação da faringe e amígdalas. Viral (maioria) vs. bacteriana (Streptococcus pyogenes - 15-30%). Pico: 5-15 anos.',
      criteriosDiagnosticos: ['Centor/McIsaac: Febre >38°C, Ausência de tosse, Linfonodomegalia cervical anterior, Exsudato amigdaliano'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação', 'Gargarejo com água morna salgada', 'Repouso'],
        farmacologico: ['Se EBHGA: Penicilina Benzatina 600.000U (<27kg) ou 1.200.000U (>27kg) IM DU', 'Alternativa: Amoxicilina 50mg/kg/dia ÷2 por 10 dias']
      },
      redFlags: ['Abscesso periamigdaliano (trismo, voz abafada)', 'Dificuldade respiratória', 'Mononucleose (esplenomegalia)']
    },
    medicamentos: ['amoxicilina', 'penicilina-benzatina'],
    protocolos: [],
    calculadoras: [],
    citations: [
      { refId: 'idsa-pharyngitis-2012', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'spinks-penicillin-pharyngitis-cochrane-2013', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'mcisaac-centor-validation-1998', evidenceLevel: 'B', studyType: 'Cohort' },
      { refId: 'shulman-gas-pharyngitis-2012', evidenceLevel: 'A', studyType: 'Guideline' }
    ]
  },
  {
    id: 'ivas-pediatrica',
    titulo: 'IVAS (Infecção de Vias Aéreas Superiores)',
    ciap2: ['R74'],
    cid10: ['J00', 'J06'],
    cid11: ['CA07'],
    categoria: 'respiratorio',
    doid: 'DOID:0050117',
    snomedCT: '54150009',
    meshId: 'D012141',
    umlsCui: 'C0041912',
    quickView: {
      definicao: 'Resfriado comum. Causa mais frequente de consulta pediátrica. Etiologia viral (>200 vírus). Autolimitada em 7-10 dias.',
      criteriosDiagnosticos: ['Coriza clara → purulenta', 'Obstrução nasal', 'Febre baixa', 'Tosse seca/produtiva'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Lavagem nasal com SF', 'Hidratação', 'Elevação da cabeceira', 'Mel (>1 ano) para tosse'],
        farmacologico: ['Antitérmico se febre', 'NÃO usar descongestionantes <6 anos', 'NÃO usar antitussígenos']
      },
      redFlags: ['Febre >72h ou recorrente', 'Dificuldade respiratória', 'Piora após melhora inicial', 'Otalgia']
    },
    medicamentos: ['paracetamol', 'ibuprofeno'],
    protocolos: ['ivas'],
    calculadoras: [],
    citations: [
      { refId: 'heikkinen-common-cold-lancet-2003', evidenceLevel: 'B', studyType: 'SystematicReview' },
      { refId: 'smith-cold-symptoms-children-cochrane-2014', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'aap-cough-cold-children-2008', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'de-sutter-antihistamines-common-cold-cochrane-2015', evidenceLevel: 'A', studyType: 'SystematicReview' }
    ]
  },
  // ===============================================
  // DOENÇAS PEDIÁTRICAS ADICIONAIS
  // ===============================================
  {
    id: 'asma-infantil',
    titulo: 'Asma na Infância',
    ciap2: ['R96'],
    cid10: ['J45'],
    cid11: ['CA23'],
    categoria: 'respiratorio',
    doid: 'DOID:2841',
    snomedCT: '195967001',
    meshId: 'D001249',
    umlsCui: 'C0004096',
    quickView: {
      definicao: 'Doença inflamatória crônica das vias aéreas com episódios recorrentes de sibilância. Diagnóstico desafiador em <5 anos. Principal doença crônica da infância.',
      criteriosDiagnosticos: [
        'Sibilância recorrente (≥3 episódios)',
        'Tosse noturna/matinal',
        'Dispneia aos esforços',
        'Melhora com broncodilatador',
        'IPA modificado (preditivo em <5 anos)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Controle ambiental', 'Evitar tabagismo passivo', 'Vacinação em dia'],
        farmacologico: [
          'Leve intermitente: SABA resgate',
          'Persistente: CI dose baixa (budesonida 100-200mcg)',
          'Step-up se não controlado'
        ]
      },
      redFlags: ['Cianose', 'Uso de musculatura acessória', 'Dificuldade para falar', 'SpO2 <92%', 'Silêncio torácico']
    },
    medicamentos: ['salbutamol', 'budesonida', 'prednisolona'],
    protocolos: ['asma-exacerbacao'],
    calculadoras: [],
    citations: [
      { refId: 'gina-2023', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'castro-rodriguez-api-asthma-2010', evidenceLevel: 'B', studyType: 'Cohort' },
      { refId: 'ducharme-ics-asthma-children-cochrane-2014', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'brand-ers-asthma-preschool-2008', evidenceLevel: 'A', studyType: 'Guideline' }
    ]
  },
  {
    id: 'diarreia-aguda-pediatrica',
    titulo: 'Diarreia Aguda Infantil',
    ciap2: ['D73'],
    cid10: ['A09'],
    cid11: ['1A40'],
    categoria: 'gastrointestinal',
    doid: 'DOID:13250',
    snomedCT: '409966000',
    meshId: 'D003967',
    umlsCui: 'C0011991',
    quickView: {
      definicao: 'Alteração do hábito intestinal com ≥3 evacuações amolecidas/líquidas em 24h, duração <14 dias. Principal causa: rotavírus.',
      criteriosDiagnosticos: [
        '≥3 evacuações líquidas/dia',
        'Duração <14 dias (aguda)',
        'Avaliar grau de desidratação',
        'Sem sangue/muco = provavelmente viral'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['TRO (Soro caseiro ou SRO)', 'Manter alimentação', 'Aleitamento materno livre demanda'],
        farmacologico: ['Zinco 10-20mg/dia por 10-14 dias', 'SEM antidiarreicos', 'SEM antieméticos de rotina']
      },
      redFlags: ['Desidratação grave', 'Letargia', 'Olhos fundos', 'Sinal da prega >2s', 'Diurese ausente', 'Sangue nas fezes']
    },
    medicamentos: ['sais-reidratacao-oral'],
    protocolos: [],
    calculadoras: [],
    citations: [
      { refId: 'who-diarrhea-management-2005', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'guarino-espghan-acute-gastroenteritis-2014', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'lazzerini-ors-diarrhea-cochrane-2016', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'lukacik-zinc-diarrhea-meta-analysis-2008', evidenceLevel: 'A', studyType: 'SystematicReview' }
    ]
  },
  {
    id: 'constipacao-pediatrica',
    titulo: 'Constipação Funcional na Infância',
    ciap2: ['D12'],
    cid10: ['K59.0'],
    cid11: ['ME04'],
    categoria: 'gastrointestinal',
    doid: 'DOID:2089',
    snomedCT: '14760008',
    meshId: 'D003248',
    umlsCui: 'C0009806',
    quickView: {
      definicao: 'Evacuações infrequentes (<3/semana), dolorosas ou com retenção fecal. 90% funcional. Pico: treinamento esfincteriano e início escolar.',
      criteriosDiagnosticos: [
        'Roma IV: ≥2 critérios por 1 mês',
        '≤2 evacuações/semana',
        'Retenção fecal excessiva',
        'Evacuações dolorosas',
        'Fezes volumosas no reto',
        'Incontinência fecal (escape)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Educação familiar (não punitivo)', 'Treinamento de hábito', 'Dieta com fibras', 'Hidratação'],
        farmacologico: ['Desimpactação: PEG (1-1,5g/kg/dia) ou enema', 'Manutenção: PEG 0,4-0,8g/kg/dia', 'Lactulose alternativa']
      },
      redFlags: ['Distensão abdominal grave', 'Vômitos biliosos', 'Atraso eliminação mecônio', 'Déficit de crescimento']
    },
    medicamentos: ['lactulose'],
    protocolos: [],
    calculadoras: [],
    citations: [
      { refId: 'tabbers-espghan-constipation-2014', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'naspghan-constipation-evaluation-2006', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'gordon-peg-constipation-cochrane-2016', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'benninga-childhood-constipation-rome-iv-2016', evidenceLevel: 'A', studyType: 'Guideline' }
    ]
  },
  {
    id: 'dermatite-atopica-pediatrica',
    titulo: 'Dermatite Atópica',
    ciap2: ['S87'],
    cid10: ['L20'],
    cid11: ['EA80'],
    categoria: 'dermatologico',
    doid: 'DOID:3310',
    snomedCT: '24079001',
    meshId: 'D003876',
    umlsCui: 'C0011615',
    quickView: {
      definicao: 'Dermatose inflamatória crônica pruriginosa. Início geralmente <5 anos. Faz parte da marcha atópica (dermatite → rinite → asma).',
      criteriosDiagnosticos: [
        'Hanifin-Rajka: prurido + ≥3 critérios',
        'Morfologia típica para idade',
        'Lactentes: face e superfícies extensoras',
        'Maiores: flexuras (fossas)',
        'Curso crônico/recidivante'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação intensa (emolientes 2-3x/dia)', 'Banho curto, água morna', 'Evitar gatilhos', 'Cortar unhas'],
        farmacologico: ['Corticoide tópico baixa potência (hidrocortisona)', 'Crises: CT média potência curto prazo', 'Inibidor calcineurina (>2 anos)']
      },
      redFlags: ['Infecção secundária (impetigo)', 'Eczema herpético', 'Eritrodermia', 'Refratariedade ao tratamento']
    },
    medicamentos: ['hidrocortisona-topica'],
    protocolos: [],
    calculadoras: [],
    citations: [
      { refId: 'aad-atopic-dermatitis-2014', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'eichenfield-atopic-dermatitis-guidelines-2014', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'el-batawy-topical-corticosteroids-ad-cochrane-2015', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'wollenberg-eaaci-atopic-eczema-2018', evidenceLevel: 'A', studyType: 'Guideline' }
    ]
  },
  {
    id: 'anemia-ferropriva-pediatrica',
    titulo: 'Anemia Ferropriva na Infância',
    ciap2: ['B80'],
    cid10: ['D50'],
    cid11: ['3A00'],
    categoria: 'hematologico',
    doid: 'DOID:11758',
    snomedCT: '87522002',
    meshId: 'D018798',
    umlsCui: 'C0085576',
    quickView: {
      definicao: 'Anemia mais comum na infância. Prevalência 20-30% em <5 anos no Brasil. Causa: desequilíbrio oferta/demanda de ferro.',
      criteriosDiagnosticos: [
        'Hb <11g/dL (6m-5a) ou <11,5g/dL (5-11a)',
        'VCM baixo (microcitose)',
        'RDW elevado (anisocitose)',
        'Ferritina <12ng/mL (ou <30 se inflamação)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Alimentação rica em ferro', 'Vitamina C nas refeições', 'Evitar leite de vaca em excesso'],
        farmacologico: ['Sulfato ferroso 3-5mg/kg/dia de Fe elementar', 'Longe das refeições', 'Duração: 3-6 meses (repor estoques)']
      },
      redFlags: ['Anemia grave (Hb <7)', 'Não resposta ao tratamento', 'Sintomas neurológicos', 'Sangramento GI']
    },
    medicamentos: ['sulfato-ferroso'],
    protocolos: [],
    calculadoras: [],
    citations: [
      { refId: 'who-iron-deficiency-2001', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'baker-aap-iron-deficiency-2010', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'pasricha-iron-supplementation-cochrane-2013', evidenceLevel: 'A', studyType: 'SystematicReview' },
      { refId: 'ms-anemia-ferropriva-2013', evidenceLevel: 'B', studyType: 'Guideline' }
    ]
  }
];
