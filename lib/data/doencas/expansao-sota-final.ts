/**
 * EXPANSÃO SOTA FINAL - DOENÇAS ADICIONAIS
 * ========================================
 * Expansão final baseada em pesquisa do estado da arte:
 * - Doenças mais comuns na APS brasileira
 * - Doenças com alta prevalência
 * - Condições frequentes em atenção primária
 */

import { Doenca } from '../../types/doenca';

export const doencasExpansaoSOTAFinal: Partial<Doenca>[] = [
  // ============================================
  // DOENÇAS COMUNS DA APS BRASILEIRA
  // ============================================
  {
    id: 'gastrite',
    titulo: 'Gastrite',
    sinonimos: ['Gastrite Crônica', 'Gastrite Aguda'],
    ciap2: ['D87'],
    cid10: ['K29'],
    cid11: ['DD90'],
    categoria: 'gastrointestinal',
    doid: 'DOID:7147',
    snomedCT: '235595009',
    meshId: 'D005756',
    umlsCui: 'C0017158',
    hpo: ['HP:0002585', 'HP:0002028'], // HPO: dor epigástrica, náusea
    tags: ['gastrointestinal', 'comum', 'aps'],
    quickView: {
      definicao: 'Inflamação da mucosa gástrica. Pode ser aguda ou crônica. Helicobacter pylori é causa comum de gastrite crônica.',
      criteriosDiagnosticos: ['Sintomas dispépticos', 'Dor epigástrica', 'Endoscopia: inflamação gástrica', 'Teste H. pylori se indicado'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar alimentos irritantes', 'Refeições menores e frequentes', 'Reduzir álcool/tabaco'],
        farmacologico: ['IBP: Omeprazol 20mg 1x/dia se H. pylori negativo', 'Se H. pylori positivo: Tríplice terapia (IBP + Amoxicilina + Claritromicina)']
      },
      redFlags: ['Hematoquezia/melena', 'Anemia', 'Vômitos persistentes', 'Idade >55 anos com sintomas novos']
    },
    medicamentos: ['omeprazol', 'amoxicilina', 'claritromicina'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'constipacao',
    titulo: 'Constipação Intestinal',
    sinonimos: ['Prisão de ventre'],
    ciap2: ['D12'],
    cid10: ['K59.0'],
    cid11: ['DD91.0'],
    categoria: 'gastrointestinal',
    doid: 'DOID:1100',
    snomedCT: '14760008',
    meshId: 'D003248',
    umlsCui: 'C0009806',
    hpo: ['HP:0002019', 'HP:0004383'], // HPO: constipação, fezes duras
    tags: ['gastrointestinal', 'comum', 'funcional'],
    quickView: {
      definicao: 'Evacuações infrequentes (<3x/semana) ou dificuldade para evacuar. Pode ser funcional ou secundária.',
      criteriosDiagnosticos: ['<3 evacuações/semana', 'Esforço excessivo', 'Fezes duras', 'Sensação de evacuação incompleta', 'Critérios de Roma IV'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Aumentar fibras (25-30g/dia)', 'Hidratação adequada', 'Exercícios', 'Estabelecer rotina evacuatória'],
        farmacologico: ['Laxante osmótico: Lactulona 15-30mL/dia', 'Ou Polietilenoglicol', 'Laxante estimulante apenas se necessário']
      },
      redFlags: ['Sangramento retal', 'Perda ponderal', 'Anemia', 'Obstrução intestinal', 'História familiar de câncer colorretal']
    },
    medicamentos: ['lactulona'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'dermatite-seborreica',
    titulo: 'Dermatite Seborreica',
    ciap2: ['S89'],
    cid10: ['L21'],
    cid11: ['EA81'],
    categoria: 'dermatologico',
    doid: 'DOID:8725',
    snomedCT: '5960000',
    meshId: 'D012628',
    umlsCui: 'C0011616',
    hpo: ['HP:0003765'], // HPO: lesões descamativas
    tags: ['dermatologico', 'comum', 'cronica'],
    quickView: {
      definicao: 'Dermatite crônica recidivante. Áreas seborreicas: couro cabeludo, face, tórax. Escamas amareladas e oleosas.',
      criteriosDiagnosticos: ['Lesões descamativas em áreas seborreicas', 'Prurido leve a moderado', 'Eritema', 'Distribuição típica'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Shampoo anti-caspa', 'Higiene adequada', 'Evitar produtos oleosos'],
        farmacologico: ['Cetoconazol tópico', 'Corticosteroides tópicos suaves', 'Ciclopirox tópico']
      },
      redFlags: ['Lesões extensas', 'Infecção secundária', 'Resistente ao tratamento']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'faringite-estreptococica',
    titulo: 'Faringite Estreptocócica',
    sinonimos: ['Amigdalite estreptocócica'],
    ciap2: ['R72'],
    cid10: ['J02.0'],
    cid11: ['CA40'],
    categoria: 'infecciosas',
    doid: 'DOID:10763',
    snomedCT: '43878009',
    meshId: 'D010996',
    umlsCui: 'C0032285',
    hpo: ['HP:0000347', 'HP:0025258'], // HPO: faringite, amigdalite
    tags: ['infecciosa', 'bacteriana', 'pediatrica'],
    quickView: {
      definicao: 'Faringite causada por Streptococcus pyogenes (grupo A). Mais comum em crianças 5-15 anos. Pode complicar com febre reumática.',
      criteriosDiagnosticos: ['Faringite/amigdalite', 'Exsudato tonsilar', 'Adenomegalia cervical', 'Febre', 'Teste rápido ou cultura positiva'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Analgésicos: Paracetamol ou Ibuprofeno', 'Gargarejos', 'Hidratação'],
        farmacologico: ['Penicilina V 250-500mg 6/6h por 10 dias', 'Ou Amoxicilina 500mg 8/8h por 10 dias', 'Ou Azitromicina se alergia']
      },
      redFlags: ['Abscesso peritonsilar', 'Obstrução de vias aéreas', 'Febre reumática', 'Glomerulonefrite']
    },
    medicamentos: ['penicilina-v', 'amoxicilina', 'azitromicina'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'amigdalite',
    titulo: 'Amigdalite',
    ciap2: ['R72'],
    cid10: ['J03'],
    cid11: ['CA40'],
    categoria: 'infecciosas',
    doid: 'DOID:10763',
    snomedCT: '56717001',
    meshId: 'D014069',
    umlsCui: 'C0040425',
    hpo: ['HP:0025258', 'HP:0012825'], // HPO: amigdalite, adenomegalia
    tags: ['infecciosa', 'orl', 'comum'],
    quickView: {
      definicao: 'Inflamação das amígdalas. Pode ser viral (mais comum) ou bacteriana. Sintomas: dor de garganta, febre, adenomegalia.',
      criteriosDiagnosticos: ['Dor de garganta', 'Amígdalas hiperemiadas/edemaciadas', 'Exsudato pode estar presente', 'Adenomegalia cervical', 'Febre'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Analgésicos: Paracetamol ou Ibuprofeno', 'Gargarejos', 'Hidratação'],
        farmacologico: ['Se estreptocócica: Penicilina V ou Amoxicilina', 'Viral: sintomático apenas']
      },
      redFlags: ['Abscesso peritonsilar', 'Obstrução de vias aéreas', 'Trismo', 'Desvio de úvula']
    },
    medicamentos: ['penicilina-v', 'amoxicilina'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'labirintite',
    titulo: 'Labirintite / Vertigem Periférica',
    ciap2: ['H82'],
    cid10: ['H83.0'],
    cid11: ['AB51'],
    categoria: 'neurologico',
    doid: 'DOID:14692',
    snomedCT: '193469007',
    meshId: 'D007762',
    umlsCui: 'C0022851',
    hpo: ['HP:0002321'], // HPO: vertigem
    tags: ['neurologico', 'orl', 'vertigem'],
    quickView: {
      definicao: 'Vertigem periférica. Inflamação do labirinto. Causas: viral, bacteriana, VPPB. Vertigem rotatória com náusea/vômito.',
      criteriosDiagnosticos: ['Vertigem rotatória', 'Náusea/vômito', 'Nistagmo', 'Sem sintomas neurológicos focais', 'Audição pode estar afetada'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Repouso', 'Evitar movimentos bruscos', 'Manobras de reposicionamento se VPPB'],
        farmacologico: ['Antivertiginosos: Meclizina 25mg 6/6h', 'Ou Dimenidrinato', 'Corticosteroides se inflamatória']
      },
      redFlags: ['Sintomas neurológicos focais', 'Perda auditiva unilateral súbita', 'Vertigem contínua >24h']
    },
    medicamentos: ['meclizina'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'bronquiolite-viral',
    titulo: 'Bronquiolite Viral (VSR)',
    ciap2: ['R78'],
    cid10: ['J21'],
    cid11: ['CA40.0'],
    categoria: 'pediatrico',
    doid: 'DOID:6131',
    snomedCT: '6142004',
    meshId: 'D001988',
    umlsCui: 'C0006274',
    hpo: ['HP:0002099', 'HP:0002780'], // HPO: sibilância, taquipneia
    tags: ['pediatrica', 'viral', 'respiratorio'],
    quickView: {
      definicao: 'Infecção das vias aéreas inferiores em <2 anos. Principalmente VSR. Sibilância, taquipneia, dispneia.',
      criteriosDiagnosticos: ['<2 anos', 'Rinorreia precedendo', 'Sibilância', 'Taquipneia', 'Dispneia', 'Sinais de esforço respiratório'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte ventilatório se necessário', 'Hidratação', 'Aspiração nasal', 'Oxigenoterapia se SpO2 <90%'],
        farmacologico: ['Sintomático: Paracetamol', 'Salbutamol pode ser tentado mas evidência limitada']
      },
      redFlags: ['Cianose', 'Apneia', 'Desidratação', 'Insuficiência respiratória', 'Piora rápida']
    },
    medicamentos: ['paracetamol', 'salbutamol'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'anemia-megaloblastica',
    titulo: 'Anemia Megaloblástica',
    ciap2: ['B82'],
    cid10: ['D51', 'D52'],
    cid11: ['3A00', '3A01'],
    categoria: 'hematologico',
    doid: 'DOID:13636',
    snomedCT: '840580004',
    meshId: 'D000749',
    umlsCui: 'C0002878',
    hpo: ['HP:0001875', 'HP:0002901'], // HPO: anemia megaloblástica, macrocitose
    tags: ['hematologico', 'anemia', 'deficiencia'],
    quickView: {
      definicao: 'Anemia por deficiência de B12 ou ácido fólico. Macrocitose, megaloblastose medular. Pode ter sintomas neurológicos (B12).',
      criteriosDiagnosticos: ['Anemia macrocítica', 'B12 baixa ou ácido fólico baixo', 'Megaloblastose medular', 'LDH elevado', 'Homocisteína elevada'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Tratar causa (déficit nutricional, má absorção)', 'Dieta adequada'],
        farmacologico: ['B12: Cianocobalamina IM ou oral', 'Ácido fólico: 5mg/dia']
      },
      redFlags: ['Sintomas neurológicos (B12)', 'Deficiência combinada', 'Má absorção']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'estomatite-aftosa',
    titulo: 'Estomatite Aftosa Recorrente',
    sinonimos: ['Aftas orais', 'Aftose oral'],
    ciap2: ['D82'],
    cid10: ['K12.0'],
    cid11: ['DA01.0'],
    categoria: 'outros',
    doid: 'DOID:10581',
    snomedCT: '54081009',
    meshId: 'D013281',
    umlsCui: 'C0038362',
    hpo: ['HP:0000160'], // HPO: úlcera oral
    tags: ['oral', 'comum', 'recorrente'],
    quickView: {
      definicao: 'Úlceras orais recorrentes. Aftas dolorosas. Etiologia não totalmente conhecida. Pode ser associada a deficiências nutricionais.',
      criteriosDiagnosticos: ['Úlceras orais recorrentes', 'Dor localizada', 'Semanas de duração', 'Cicatrização espontânea'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar alimentos ácidos/picantes', 'Higiene oral adequada', 'Suplementação: Ferro, B12, Ácido fólico se deficiente'],
        farmacologico: ['Corticosteroides tópicos', 'Anestésicos tópicos', 'Antissépticos orais']
      },
      redFlags: ['Úlceras genitais (Doença de Behçet)', 'Úlceras múltiplas grandes', 'Sem cicatrização']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'sindrome-ansiedade-generalizada',
    titulo: 'Transtorno de Ansiedade Generalizada',
    ciap2: ['P74'],
    cid10: ['F41.1'],
    cid11: ['6B00'],
    categoria: 'saude_mental',
    doid: 'DOID:1596',
    snomedCT: '48544008',
    meshId: 'D001008',
    umlsCui: 'C0003467',
    hpo: ['HP:0000739'], // HPO: ansiedade
    tags: ['saude_mental', 'ansiedade', 'cronica'],
    quickView: {
      definicao: 'Ansiedade excessiva e persistente por ≥6 meses. Preocupações difíceis de controlar. Sintomas físicos associados.',
      criteriosDiagnosticos: ['Ansiedade excessiva ≥6 meses', 'Dificuldade em controlar preocupações', '≥3 sintomas: inquietação, fadiga, dificuldade concentração, irritabilidade, tensão muscular, distúrbio sono'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['TCC', 'Psicoterapia', 'Técnicas de relaxamento', 'Exercícios'],
        farmacologico: ['ISRS: Sertralina ou Escitalopram', 'Benzodiazepínicos apenas curto prazo se necessário']
      },
      redFlags: ['Ideação suicida', 'Crises de pânico', 'Comorbidades psiquiátricas']
    },
    medicamentos: ['sertralina', 'escitalopram'],
    protocolos: [],
    calculadoras: []
  },
];

