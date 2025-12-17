/**
 * EXPANSÃO SOTA AVANÇADA - DOENÇAS ADICIONAIS
 * ===========================================
 * Expansão baseada em pesquisa do estado da arte (SOTA):
 * - CID-11 (OMS 2022)
 * - Human Phenotype Ontology (HPO)
 * - ORDO (Orphanet Rare Disease Ontology)
 * - Doenças específicas da APS brasileira
 */

import { Doenca } from '../../types/doenca';

export const doencasExpansaoSOTAAvancada: Partial<Doenca>[] = [
  // ============================================
  // DOENÇAS RARAS (ORDO - Orphanet)
  // ============================================
  {
    id: 'doenca-celíaca',
    titulo: 'Doença Celíaca',
    sinonimos: ['Enteropatia por glúten', 'Espru celíaco'],
    ciap2: ['D90'],
    cid10: ['K90.0'],
    cid11: ['DD90.0'], // CID-11
    categoria: 'gastrointestinal',
    doid: 'DOID:13084',
    snomedCT: '396331005',
    meshId: 'D002446',
    umlsCui: 'C0007570',
    hpo: ['HP:0002027', 'HP:0002583', 'HP:0004380'], // HPO: distensão abdominal, esteatorreia, anemia
    tags: ['autoimune', 'gastrointestinal', 'gluten'],
    quickView: {
      definicao: 'Enteropatia autoimune desencadeada por glúten em genéticamente susceptíveis. Caracterizada por atrofia vilositária.',
      criteriosDiagnosticos: ['Anti-tTG IgA elevado', 'Anti-EMA positivo', 'Biópsia duodenal: atrofia vilositária', 'HLA-DQ2 ou DQ8 positivo'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta sem glúten rigorosa e permanente', 'Suporte nutricional', 'Acompanhamento nutricional'],
        farmacologico: ['Suplementação: Ferro, Ácido fólico, Vitamina D conforme deficiências']
      },
      redFlags: ['Linfoma intestinal', 'Refratária ao tratamento', 'Colite microscópica']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'doenca-inflamatoria-intestinal-pediatrica',
    titulo: 'Doença Inflamatória Intestinal Pediátrica',
    ciap2: ['D93'],
    cid10: ['K50', 'K51'],
    cid11: ['DD90', 'DD91'],
    categoria: 'pediatrico',
    doid: 'DOID:8778',
    snomedCT: '64766004',
    meshId: 'D015212',
    umlsCui: 'C0021390',
    hpo: ['HP:0002024', 'HP:0002583'], // HPO: dor abdominal, diarréia
    tags: ['pediatrica', 'cronica', 'gastrointestinal'],
    quickView: {
      definicao: 'DII manifestada antes dos 18 anos. Inclui Crohn e Colite ulcerativa. Apresentação pode ser diferente do adulto.',
      criteriosDiagnosticos: ['Idade <18 anos', 'Sintomas gastrointestinais crônicos', 'Endoscopia/colonoscopia', 'Histopatologia'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte nutricional', 'Crescimento e desenvolvimento', 'Acompanhamento multidisciplinar'],
        farmacologico: ['5-ASA conforme tipo', 'Corticosteroides na indução', 'Imunossupressores conforme gravidade']
      },
      redFlags: ['Retardo de crescimento', 'Pubertade tardia', 'Desnutrição grave']
    },
    medicamentos: ['mesalazina'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // DOENÇAS INFECCIOSAS ADICIONAIS
  // ============================================
  {
    id: 'hepatite-e',
    titulo: 'Hepatite E',
    ciap2: ['D72'],
    cid10: ['B17.2'],
    cid11: ['1E50.0'],
    categoria: 'infecciosas',
    doid: 'DOID:12476',
    snomedCT: '240530008',
    meshId: 'D006526',
    umlsCui: 'C0019160',
    hpo: ['HP:0002920', 'HP:0002901'], // HPO: icterícia, aumento de transaminases
    tags: ['infecciosa', 'viral', 'hepatite'],
    quickView: {
      definicao: 'Infecção pelo vírus da hepatite E (HEV). Transmissão fecal-oral. Pode ser grave na gravidez.',
      criteriosDiagnosticos: ['Anti-HEV IgM positivo', 'HEV RNA positivo', 'Elevação de transaminases'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte', 'Repouso', 'Hidratação'],
        farmacologico: ['Sintomático apenas', 'Ribavirina em casos graves/transplante']
      },
      redFlags: ['Insuficiência hepática fulminante', 'Gravidez (alta mortalidade)', 'Imunossuprimidos']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'sífilis-terciaria',
    titulo: 'Sífilis Terciária',
    ciap2: ['Y77'],
    cid10: ['A52'],
    cid11: ['1C1Z'],
    categoria: 'infecciosas',
    doid: 'DOID:13240',
    snomedCT: '76272004',
    meshId: 'D013592',
    umlsCui: 'C0039102',
    hpo: ['HP:0001250', 'HP:0002134'], // HPO: convulsões, alterações comportamentais
    tags: ['infecciosa', 'bacteriana', 'neurologica'],
    quickView: {
      definicao: 'Sífilis tardia (anos após infecção). Neurolues, sífilis cardiovascular, gomas sifilíticas.',
      criteriosDiagnosticos: ['História de sífilis', 'VDRL/RPR positivo', 'TPHA/FTA-ABS positivo', 'Manifestações tardias'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Avaliação neurológica', 'Cardiológica se necessário'],
        farmacologico: ['Penicilina G cristalina 18-24 milhões UI/dia IV 10-14 dias (neurolues)', 'Ou Ceftriaxona alternativa']
      },
      redFlags: ['Neurolues ativa', 'Insuficiência aórtica', 'Aneurisma aórtico']
    },
    medicamentos: ['penicilina-g'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // DOENÇAS NEUROLÓGICAS ADICIONAIS
  // ============================================
  {
    id: 'doenca-parkinson',
    titulo: 'Doença de Parkinson',
    ciap2: ['N87'],
    cid10: ['G20'],
    cid11: ['8A00.0'],
    categoria: 'neurologico',
    doid: 'DOID:14330',
    snomedCT: '49049000',
    meshId: 'D010300',
    umlsCui: 'C0030567',
    hpo: ['HP:0001300', 'HP:0001260', 'HP:0002072'], // HPO: parkinsonismo, bradicinesia, tremor
    tags: ['neurologico', 'cronica', 'movimento'],
    quickView: {
      definicao: 'Doença neurodegenerativa. Perda de neurônios dopaminérgicos da substantia nigra. Tremor, rigidez, bradicinesia.',
      criteriosDiagnosticos: ['Tremor de repouso', 'Rigidez', 'Bradicinesia', 'Instabilidade postural', 'Resposta à levodopa'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia', 'Fonoaudiologia', 'Terapia ocupacional', 'Exercícios'],
        farmacologico: ['Levodopa/Carbidopa', 'Agonistas dopaminérgicos: Pramipexol ou Ropinirol', 'Inibidores MAO-B']
      },
      redFlags: ['Demência', 'Alucinações', 'Fenômeno ON-OFF', 'Distonia']
    },
    medicamentos: ['levodopa'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'demencia-vascular',
    titulo: 'Demência Vascular',
    ciap2: ['P70'],
    cid10: ['F01'],
    cid11: ['6D80'],
    categoria: 'neurologico',
    doid: 'DOID:6713',
    snomedCT: '52448006',
    meshId: 'D003712',
    umlsCui: 'C0011269',
    hpo: ['HP:0000726', 'HP:0001263'], // HPO: demência, déficit cognitivo
    tags: ['neurologico', 'cronica', 'cognitiva'],
    quickView: {
      definicao: 'Demência por lesões vasculares cerebrais. Pode ser isquêmica ou hemorrágica. Degradação cognitiva multifocal.',
      criteriosDiagnosticos: ['Demência', 'Evidências de doença cerebrovascular', 'Relação temporal entre evento vascular e demência', 'Imagem: lesões vasculares'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Prevenção secundária de AVC', 'Controle de fatores de risco', 'Reabilitação cognitiva'],
        farmacologico: ['Inibidores de colinesterase: Donepezila ou Rivastigmina', 'Memantina']
      },
      redFlags: ['Evolução rápida', 'Sintomas focais', 'AVC recorrente']
    },
    medicamentos: ['donepezila', 'rivastigmina'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // DOENÇAS ENDÓCRINAS ADICIONAIS
  // ============================================
  {
    id: 'hipotireoidismo-congenito',
    titulo: 'Hipotireoidismo Congênito',
    ciap2: ['T85'],
    cid10: ['E03.0', 'E03.1'],
    cid11: ['5A00.0'],
    categoria: 'pediatrico',
    doid: 'DOID:9502',
    snomedCT: '19031007',
    meshId: 'D003409',
    umlsCui: 'C0020509',
    hpo: ['HP:0008230', 'HP:0001511'], // HPO: hipotireoidismo, crescimento lento
    tags: ['pediatrica', 'endocrino', 'congenita'],
    quickView: {
      definicao: 'Deficiência de hormônio tireoidiano desde o nascimento. Detectado no teste do pezinho. Tratamento precoce essencial.',
      criteriosDiagnosticos: ['Teste do pezinho: TSH elevado/T4 baixo', 'Confirmar com exames séricos', 'Cintilografia se necessário'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Iniciar tratamento imediatamente', 'Acompanhamento multidisciplinar'],
        farmacologico: ['Levotiroxina 10-15 mcg/kg/dia', 'Ajustar conforme T4 livre e TSH']
      },
      redFlags: ['Não detectado no teste do pezinho', 'Retardo mental se não tratado', 'Cretinismo']
    },
    medicamentos: ['levotiroxina'],
    protocolos: ['teste-pezinho'],
    calculadoras: []
  },
  {
    id: 'sindrome-metabolica',
    titulo: 'Síndrome Metabólica',
    ciap2: ['T92'],
    cid10: ['E88.9'],
    cid11: ['5C51'],
    categoria: 'metabolico',
    doid: 'DOID:11984',
    snomedCT: '367498001',
    meshId: 'D024821',
    umlsCui: 'C0239946',
    hpo: ['HP:0003077', 'HP:0005978'], // HPO: resistência à insulina, obesidade
    tags: ['metabolico', 'multisistemico'],
    quickView: {
      definicao: 'Conjunto de fatores de risco: obesidade abdominal, glicemia alterada, dislipidemia, hipertensão.',
      criteriosDiagnosticos: ['≥3 dos seguintes: Obesidade abdominal, Triglicerídeos ≥150, HDL baixo, PA ≥130/85, Glicemia ≥100'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Mudanças estilo de vida', 'Dieta', 'Exercícios', 'Perda de peso'],
        farmacologico: ['Tratar cada componente: Anti-hipertensivo, Hipolipemiante, Antidiabético se necessário']
      },
      redFlags: ['Diabetes estabelecido', 'Doença cardiovascular', 'Esteatose hepática']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // DOENÇAS DERMATOLÓGICAS ADICIONAIS
  // ============================================
  {
    id: 'psoriase',
    titulo: 'Psoríase',
    ciap2: ['S91'],
    cid10: ['L40'],
    cid11: ['EA90'],
    categoria: 'dermatologico',
    doid: 'DOID:8893',
    snomedCT: '9014002',
    meshId: 'D011565',
    umlsCui: 'C0033860',
    hpo: ['HP:0003765', 'HP:0003766'], // HPO: lesões psoriásicas, escamas
    tags: ['dermatologico', 'autoimune', 'cronica'],
    quickView: {
      definicao: 'Doença inflamatória crônica da pele. Placas eritematosas com escamas prateadas. Pode ter artrite psoriásica.',
      criteriosDiagnosticos: ['Placas eritematosas com escamas', 'Localização típica (cotovelos, joelhos, couro cabeludo)', 'Histopatologia se necessário'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Emolientes', 'Fototerapia', 'Evitar fatores desencadeantes'],
        farmacologico: ['Corticosteroides tópicos', 'Análogos da vitamina D tópicos', 'Sistêmico se extensa: Metotrexato ou Biologics']
      },
      redFlags: ['Eritrodermia', 'Pústulas', 'Artrite psoriásica', 'Infecção secundária']
    },
    medicamentos: ['metotrexato'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'dermatite-atopica',
    titulo: 'Dermatite Atópica',
    sinonimos: ['Eczema atópico'],
    ciap2: ['S87'],
    cid10: ['L20'],
    cid11: ['EA80'],
    categoria: 'dermatologico',
    doid: 'DOID:3310',
    snomedCT: '24079001',
    meshId: 'D003876',
    umlsCui: 'C0011603',
    hpo: ['HP:0000967', 'HP:0000962'], // HPO: prurido, eczema
    tags: ['dermatologico', 'alergica', 'cronica'],
    quickView: {
      definicao: 'Dermatite crônica recorrente. Prurido intenso, lesões eczematosas. Comumente associada a asma e rinite alérgica.',
      criteriosDiagnosticos: ['Prurido', 'Morfoloxia e distribuição típica', 'Cronificação', 'História pessoal/familiar de atopia'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Emolientes abundantes', 'Evitar irritantes', 'Banhos mornos', 'Hidratação'],
        farmacologico: ['Corticosteroides tópicos', 'Inibidores de calcineurina tópicos', 'Anti-histamínicos para prurido']
      },
      redFlags: ['Infecção secundária', 'Eritrodermia', 'Impetiginização']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // DOENÇAS MUSCULOESQUELÉTICAS ADICIONAIS
  // ============================================
  {
    id: 'fibromialgia',
    titulo: 'Fibromialgia',
    ciap2: ['L18'],
    cid10: ['M79.3'],
    cid11: ['MG30.0'],
    categoria: 'musculoesqueletico',
    doid: 'DOID:3634',
    snomedCT: '23867004',
    meshId: 'D005356',
    umlsCui: 'C0016053',
    hpo: ['HP:0003327', 'HP:0003324'], // HPO: dor muscular, fadiga
    tags: ['musculoesqueletico', 'cronica', 'dor'],
    quickView: {
      definicao: 'Síndrome de dor crônica generalizada. Pontos dolorosos à palpação. Fadiga, distúrbios do sono.',
      criteriosDiagnosticos: ['Dor crônica generalizada ≥3 meses', '≥11 pontos dolorosos em 18 pontos (critérios ACR 1990)', 'Ou critérios ACR 2010/2016'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercícios (aeróbicos, alongamento)', 'Educação sobre a doença', 'TCC', 'Melhora do sono'],
        farmacologico: ['Duloxetina 60mg/dia', 'Ou Pregabalina', 'Ou Amitriptilina 10-50mg HS']
      },
      redFlags: ['Sintomas neurológicos focais', 'Artrite verdadeira', 'Doença reumatológica']
    },
    medicamentos: ['duloxetina', 'pregabalina', 'amitriptilina'],
    protocolos: [],
    calculadoras: []
  },
];

