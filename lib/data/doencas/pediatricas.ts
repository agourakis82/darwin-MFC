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
    calculadoras: []
  },
  {
    id: 'laringite-aguda',
    titulo: 'Laringotraqueobronquite Aguda (Crupe)',
    ciap2: ['R77'],
    cid10: ['J05'],
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
    calculadoras: []
  },
  {
    id: 'otite-media-aguda',
    titulo: 'Otite Média Aguda',
    ciap2: ['H71'],
    cid10: ['H65', 'H66'],
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
    calculadoras: []
  },
  {
    id: 'faringoamigdalite',
    titulo: 'Faringoamigdalite Aguda',
    ciap2: ['R76'],
    cid10: ['J02', 'J03'],
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
    calculadoras: []
  },
  {
    id: 'ivas-pediatrica',
    titulo: 'IVAS (Infecção de Vias Aéreas Superiores)',
    ciap2: ['R74'],
    cid10: ['J00', 'J06'],
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
    calculadoras: []
  }
];
