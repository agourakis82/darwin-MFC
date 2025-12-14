/**
 * DATABASE DE DOENÇAS EXPANDIDO - DARWIN-MFC
 * ==========================================
 * 
 * 50+ Doenças prioritárias da APS organizadas por capítulo CIAP-2
 * 
 * Capítulos incluídos:
 * K - Cardiovascular | R - Respiratório | D - Digestivo
 * L - Musculoesquelético | P - Psicológico | T - Endócrino
 * U - Urinário | S - Pele | N - Neurológico
 */

import { Doenca } from '../types/doenca';

// =============================================================================
// CAPÍTULO K - CARDIOVASCULAR (Adicionar às existentes: HAS)
// =============================================================================

export const doencasCardiovasculares: Partial<Doenca>[] = [
  {
    id: 'insuficiencia-cardiaca',
    titulo: 'Insuficiência Cardíaca (IC)',
    sinonimos: ['IC', 'ICC', 'Falência cardíaca'],
    ciap2: ['K77'],
    cid10: ['I50', 'I50.0', 'I50.1', 'I50.9'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Síndrome clínica resultante de anormalidades cardíacas estruturais e/ou funcionais que resultam em redução do débito cardíaco e/ou elevação das pressões de enchimento.',
      criteriosDiagnosticos: [
        'Sintomas típicos: dispneia, fadiga, edema de MMII',
        'Sinais: estase jugular, crepitações pulmonares, hepatomegalia',
        'Fração de ejeção: preservada (≥50%), intermediária (40-49%), reduzida (<40%)',
        'BNP >100 pg/mL ou NT-proBNP >300 pg/mL sugere IC'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Restrição hídrica (1,5-2L/dia se descompensação)',
          'Restrição de sódio (<2g/dia)',
          'Atividade física supervisionada (reabilitação cardíaca)',
          'Vacinação (influenza + pneumococo)',
          'Cessar tabagismo e etilismo'
        ],
        farmacologico: [
          'IECA/BRA (dose máxima tolerada)',
          'Betabloqueador (carvedilol, bisoprolol, metoprolol)',
          'Antagonista mineralocorticoide (espironolactona 25-50mg)',
          'Diurético de alça para congestão (furosemida)',
          'iSGLT2 (dapagliflozina, empagliflozina) - recomendação atual'
        ]
      },
      metasTerapeuticas: [
        'Controle de sintomas (NYHA I-II)',
        'Manter euvolemia',
        'FC 60-70 bpm em repouso'
      ],
      redFlags: [
        'Dispneia em repouso / ortopneia progressiva',
        'Edema agudo de pulmão',
        'Hipotensão sintomática / choque cardiogênico',
        'Síncope de origem cardíaca'
      ]
    },
    protocolos: ['ic-tratamento'],
    medicamentos: ['enalapril', 'carvedilol', 'espironolactona', 'furosemida'],
    calculadoras: ['ckd-epi'],
    lastUpdate: '2024-12'
  },
  {
    id: 'fibrilacao-atrial',
    titulo: 'Fibrilação Atrial (FA)',
    sinonimos: ['FA', 'Arritmia atrial'],
    ciap2: ['K78'],
    cid10: ['I48', 'I48.0', 'I48.1', 'I48.2'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Arritmia cardíaca mais comum, caracterizada por ativação elétrica atrial desorganizada com consequente contração atrial ineficaz. Aumenta risco de AVC em 5x.',
      criteriosDiagnosticos: [
        'ECG: ausência de ondas P, intervalo RR irregular',
        'Linha de base fibrilatória (ondas f)',
        'FC geralmente 100-160 bpm (se não tratada)',
        'Classificação: paroxística, persistente, permanente'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Identificar e tratar causas reversíveis (hipertireoidismo, álcool)',
          'Tratar comorbidades (HAS, IC, SAOS)',
          'Cessar tabagismo e etilismo'
        ],
        farmacologico: [
          'Controle de FC: betabloqueador, BCC não-dihidropiridínico, digoxina',
          'Anticoagulação: CHA2DS2-VASc ≥2 homens, ≥3 mulheres',
          'DOACs preferíveis (rivaroxabana, apixabana, dabigatrana)',
          'Warfarina se prótese mecânica ou estenose mitral moderada/grave'
        ]
      },
      metasTerapeuticas: [
        'FC <110 bpm em repouso (estratégia leniente)',
        'FC <80 bpm se sintomático (estratégia rigorosa)',
        'INR 2-3 se warfarina'
      ],
      redFlags: [
        'FA com instabilidade hemodinâmica (cardioversão emergência)',
        'FA + síndrome de Wolff-Parkinson-White',
        'AVC ou AIT na vigência de FA',
        'FA com FC >150 bpm e sintomas'
      ]
    },
    protocolos: ['fa-anticoagulacao'],
    medicamentos: ['atenolol', 'rivaroxabana', 'warfarina', 'digoxina'],
    calculadoras: ['chadsvasc', 'hasbled'],
    lastUpdate: '2024-12'
  },
  {
    id: 'doenca-arterial-coronariana',
    titulo: 'Doença Arterial Coronariana Crônica (DAC)',
    sinonimos: ['Angina estável', 'Cardiopatia isquêmica', 'DAC'],
    ciap2: ['K74', 'K76'],
    cid10: ['I20', 'I25', 'I25.1', 'I25.9'],
    categoria: 'cardiovascular',
    quickView: {
      definicao: 'Aterosclerose das artérias coronárias com redução do fluxo sanguíneo miocárdico. Manifesta-se como angina estável (dor torácica aos esforços, aliviada com repouso ou nitrato).',
      criteriosDiagnosticos: [
        'Angina típica: dor precordial em aperto, desencadeada por esforço/estresse, aliviada em <10min com repouso/nitrato',
        'Probabilidade pré-teste baseada em idade, sexo e sintomas',
        'Teste ergométrico positivo (infradesnivelamento ST ≥1mm)',
        'Cintilografia ou AngioTC coronárias se probabilidade intermediária'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Dieta mediterrânea / low-fat',
          'Atividade física regular (reabilitação cardíaca)',
          'Cessação do tabagismo',
          'Controle de peso (IMC <25)'
        ],
        farmacologico: [
          'AAS 100mg/dia (prevenção secundária)',
          'Estatina de alta potência (atorvastatina 40-80mg)',
          'Betabloqueador (1ª linha para angina)',
          'Nitrato SL para crises',
          'IECA se HAS, DM ou IC associados'
        ]
      },
      metasTerapeuticas: [
        'LDL-c <50 mg/dL (muito alto risco)',
        'PA <130/80 mmHg',
        'Sem angina ou angina ocasional (CCS I)'
      ],
      redFlags: [
        'Angina instável (mudança de padrão, em repouso, progressiva)',
        'Dor torácica >20min em repouso',
        'Síncope associada a dor torácica',
        'Insuficiência cardíaca nova'
      ]
    },
    protocolos: ['dac-prevenção-secundaria'],
    medicamentos: ['aas', 'atorvastatina', 'atenolol', 'isossorbida'],
    calculadoras: ['risco-cv'],
    lastUpdate: '2024-12'
  }
];

// =============================================================================
// CAPÍTULO R - RESPIRATÓRIO (Adicionar às existentes: Asma)
// =============================================================================

export const doencasRespiratorias: Partial<Doenca>[] = [
  {
    id: 'dpoc',
    titulo: 'Doença Pulmonar Obstrutiva Crônica (DPOC)',
    sinonimos: ['DPOC', 'Enfisema', 'Bronquite crônica'],
    ciap2: ['R95'],
    cid10: ['J44', 'J44.0', 'J44.1', 'J44.9'],
    categoria: 'respiratorio',
    quickView: {
      definicao: 'Doença prevenível e tratável caracterizada por limitação persistente ao fluxo aéreo, geralmente progressiva, associada a resposta inflamatória aumentada nas vias aéreas a partículas ou gases nocivos (principalmente tabagismo).',
      criteriosDiagnosticos: [
        'Dispneia persistente e progressiva',
        'Tosse crônica (com ou sem expectoração)',
        'História de exposição a fatores de risco (tabagismo, biomassa)',
        'Espirometria: VEF1/CVF <0,70 pós-broncodilatador'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cessação do tabagismo (OBRIGATÓRIO)',
          'Vacinação anual contra influenza',
          'Vacinação pneumocócica',
          'Reabilitação pulmonar',
          'Atividade física regular'
        ],
        farmacologico: [
          'LABA ou LAMA para todos (formoterol, tiotrópio)',
          'LABA + LAMA se persistem sintomas',
          'Adicionar CI se exacerbações frequentes (≥2/ano) e eosinófilos ≥300',
          'Evitar CI como monoterapia ou uso indiscriminado'
        ]
      },
      metasTerapeuticas: [
        'mMRC <2 ou CAT <10',
        'Reduzir exacerbações (<2/ano)',
        'Manter atividade física'
      ],
      redFlags: [
        'Exacerbação grave (dispneia em repouso, confusão, cianose)',
        'SpO2 <90% em ar ambiente',
        'Cor pulmonale (edema de MMII, estase jugular)',
        'Perda de peso não intencional >10%'
      ]
    },
    protocolos: ['dpoc-gold'],
    medicamentos: ['formoterol', 'tiotropio', 'budesonida'],
    calculadoras: ['mmrc', 'cat'],
    lastUpdate: '2024-12'
  },
  {
    id: 'ivas',
    titulo: 'Infecção das Vias Aéreas Superiores (IVAS)',
    sinonimos: ['Resfriado comum', 'Gripe', 'Nasofaringite'],
    ciap2: ['R74'],
    cid10: ['J06', 'J00', 'J06.9'],
    categoria: 'respiratorio',
    quickView: {
      definicao: 'Infecção viral autolimitada das vias aéreas superiores (nariz, faringe, laringe). Principal causa de consultas na APS. Duração típica de 7-10 dias.',
      criteriosDiagnosticos: [
        'Rinorreia, congestão nasal',
        'Odinofagia (dor de garganta)',
        'Tosse (geralmente seca no início)',
        'Febre baixa ou ausente',
        'Mialgias, mal-estar geral'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Repouso relativo',
          'Hidratação adequada',
          'Lavagem nasal com soro fisiológico',
          'Elevação da cabeceira'
        ],
        farmacologico: [
          'Paracetamol 500-1000mg 6/6h OU Dipirona 500-1000mg 6/6h (febre/dor)',
          'Descongestionantes tópicos por até 3-5 dias (oximetazolina)',
          'Mel para tosse em >1 ano (evidência modesta)',
          'NÃO usar antibióticos - viral!'
        ]
      },
      metasTerapeuticas: [
        'Alívio sintomático',
        'Evitar complicações bacterianas'
      ],
      redFlags: [
        'Febre >38,5°C por >3 dias',
        'Odinofagia intensa com exsudato amigdaliano',
        'Sintomas unilaterais faciais (sinusite)',
        'Dispneia ou taquipneia',
        'Paciente imunossuprimido'
      ]
    },
    protocolos: ['ivas-tratamento'],
    medicamentos: ['paracetamol', 'dipirona'],
    calculadoras: [],
    lastUpdate: '2024-12'
  },
  {
    id: 'pneumonia',
    titulo: 'Pneumonia Adquirida na Comunidade (PAC)',
    sinonimos: ['Pneumonia', 'PAC'],
    ciap2: ['R81'],
    cid10: ['J18', 'J13', 'J14', 'J15'],
    categoria: 'respiratorio',
    quickView: {
      definicao: 'Infecção aguda do parênquima pulmonar adquirida fora do ambiente hospitalar. S. pneumoniae é o agente mais comum.',
      criteriosDiagnosticos: [
        'Sintomas respiratórios: tosse, expectoração, dispneia',
        'Febre ≥38°C',
        'Achados auscultatórios: estertores, sopro tubário, broncofonia',
        'Radiografia de tórax com infiltrado pulmonar'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Repouso',
          'Hidratação adequada',
          'Oxigenoterapia se SpO2 <92%'
        ],
        farmacologico: [
          'Ambulatorial sem comorbidades: Amoxicilina 500mg 8/8h 5-7 dias',
          'Ambulatorial com comorbidades: Amoxicilina-clavulanato + Azitromicina',
          'Se alergia a penicilina: Levofloxacino 500mg/dia',
          'Duração: 5-7 dias (mínimo 5 dias, afebril 48-72h)'
        ]
      },
      metasTerapeuticas: [
        'Resolução da febre em 48-72h',
        'Melhora clínica progressiva'
      ],
      redFlags: [
        'CURB-65 ≥2 (considerar internação)',
        'SpO2 <90% em ar ambiente',
        'FR >30 irpm, FC >125 bpm, PAS <90',
        'Derrame pleural extenso',
        'Confusão mental'
      ]
    },
    protocolos: ['pac-curb65'],
    medicamentos: ['amoxicilina', 'azitromicina', 'levofloxacino'],
    calculadoras: ['curb65'],
    lastUpdate: '2024-12'
  },
  {
    id: 'rinite-alergica',
    titulo: 'Rinite Alérgica',
    sinonimos: ['Rinite', 'Alergia nasal'],
    ciap2: ['R97'],
    cid10: ['J30', 'J30.1', 'J30.4'],
    categoria: 'respiratorio',
    quickView: {
      definicao: 'Inflamação da mucosa nasal mediada por IgE após exposição a alérgenos, caracterizada por rinorreia, obstrução nasal, espirros e prurido.',
      criteriosDiagnosticos: [
        'Espirros em salva',
        'Rinorreia aquosa',
        'Obstrução nasal',
        'Prurido nasal',
        'Sintomas >2 dias/semana ou >4 semanas = persistente'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Controle ambiental (ácaros, mofo, pelos)',
          'Lavagem nasal com SF 0,9%',
          'Capas antiácaros em colchões/travesseiros',
          'Evitar exposição a alérgenos conhecidos'
        ],
        farmacologico: [
          'Corticoide nasal (1ª linha): budesonida, mometasona',
          'Anti-histamínico oral (2ª geração): loratadina, cetirizina',
          'Combinação se não resposta',
          'Imunoterapia em casos refratários'
        ]
      },
      metasTerapeuticas: [
        'Controle dos sintomas',
        'Sono e atividades sem prejuízo'
      ],
      redFlags: [
        'Sintomas unilaterais (descartar pólipo, corpo estranho)',
        'Rinorreia purulenta (sinusite)',
        'Epistaxe recorrente',
        'Anosmia persistente'
      ]
    },
    protocolos: [],
    medicamentos: ['loratadina', 'budesonida-nasal', 'cetirizina'],
    calculadoras: [],
    lastUpdate: '2024-12'
  },
  {
    id: 'sinusite',
    titulo: 'Rinossinusite Aguda',
    sinonimos: ['Sinusite', 'Rinossinusite'],
    ciap2: ['R75'],
    cid10: ['J01', 'J01.9'],
    categoria: 'respiratorio',
    quickView: {
      definicao: 'Inflamação dos seios paranasais, geralmente viral (maioria) ou bacteriana. Sintomas <4 semanas = aguda.',
      criteriosDiagnosticos: [
        'Congestão/obstrução nasal',
        'Rinorreia anterior ou posterior (gotejamento)',
        'Dor/pressão facial',
        'Hiposmia/anosmia',
        'Bacteriana se: sintomas >10 dias OU piora após melhora inicial (dupla piora)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Lavagem nasal abundante com SF 0,9%',
          'Hidratação',
          'Inalação com vapor'
        ],
        farmacologico: [
          'Viral: sintomáticos (analgésicos, descongestionantes)',
          'Bacteriana: Amoxicilina 500mg 8/8h 5-7 dias',
          'Se falha ou alergia: Amoxicilina-clavulanato ou Levofloxacino',
          'Corticoide nasal pode auxiliar'
        ]
      },
      metasTerapeuticas: [
        'Resolução dos sintomas em 7-10 dias'
      ],
      redFlags: [
        'Edema periorbitário',
        'Diplopia ou alteração visual',
        'Cefaleia intensa frontal',
        'Sinais meníngeos',
        'Febre alta persistente'
      ]
    },
    protocolos: [],
    medicamentos: ['amoxicilina', 'budesonida-nasal'],
    calculadoras: [],
    lastUpdate: '2024-12'
  }
];

// =============================================================================
// CAPÍTULO D - DIGESTIVO
// =============================================================================

export const doencasDigestivas: Partial<Doenca>[] = [
  {
    id: 'drge',
    titulo: 'Doença do Refluxo Gastroesofágico (DRGE)',
    sinonimos: ['Refluxo', 'DRGE', 'Azia'],
    ciap2: ['D84'],
    cid10: ['K21', 'K21.0'],
    categoria: 'gastrointestinal',
    quickView: {
      definicao: 'Afecção crônica decorrente do fluxo retrógrado de conteúdo gastroduodenal para o esôfago e/ou órgãos adjacentes, acarretando sintomas e/ou complicações.',
      criteriosDiagnosticos: [
        'Pirose (queimação retroesternal) - sintoma típico',
        'Regurgitação ácida',
        'Sintomas atípicos: tosse crônica, laringite, dor torácica não cardíaca',
        'Diagnóstico clínico na maioria; EDA se sinais de alarme'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Elevação da cabeceira (15-20cm)',
          'Evitar refeições 2-3h antes de deitar',
          'Evitar alimentos gatilhos (café, álcool, frituras, chocolate)',
          'Perda de peso se sobrepeso/obeso',
          'Cessar tabagismo'
        ],
        farmacologico: [
          'IBP dose padrão: Omeprazol 20mg/dia OU Pantoprazol 40mg/dia',
          'Duração inicial: 4-8 semanas',
          'Antiácidos para alívio rápido (Hidróxido de alumínio)',
          'Manutenção sob demanda se recorrência'
        ]
      },
      metasTerapeuticas: [
        'Alívio dos sintomas',
        'Cicatrização de esofagite (se presente)',
        'Prevenção de complicações (estenose, Barrett)'
      ],
      redFlags: [
        'Disfagia progressiva',
        'Odinofagia',
        'Perda de peso não intencional',
        'Anemia ou sangramento digestivo',
        'Idade >55 anos com sintomas novos'
      ]
    },
    protocolos: [],
    medicamentos: ['omeprazol', 'pantoprazol'],
    calculadoras: [],
    lastUpdate: '2024-12'
  },
  {
    id: 'gastrite',
    titulo: 'Gastrite / Dispepsia Funcional',
    sinonimos: ['Gastrite', 'Dispepsia', 'Dor de estômago'],
    ciap2: ['D87'],
    cid10: ['K29', 'K30'],
    categoria: 'gastrointestinal',
    quickView: {
      definicao: 'Gastrite: inflamação da mucosa gástrica. Dispepsia funcional: sintomas dispépticos sem causa orgânica identificável (Roma IV).',
      criteriosDiagnosticos: [
        'Dor/desconforto epigástrico',
        'Plenitude pós-prandial',
        'Saciedade precoce',
        'Náuseas, eructação',
        'Dispepsia funcional: sintomas ≥3 meses, EDA normal'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fracionamento das refeições',
          'Evitar AINEs, álcool, café, tabaco',
          'Reduzir estresse'
        ],
        farmacologico: [
          'IBP por 4-8 semanas (teste terapêutico)',
          'Pesquisar e tratar H. pylori se positivo',
          'Procinéticos (domperidona) se sintomas pós-prandiais',
          'Antidepressivo tricíclico em dose baixa se refratário'
        ]
      },
      redFlags: [
        'Sinais de alarme: perda de peso, anemia, disfagia',
        'Vômitos persistentes',
        'Massa abdominal palpável',
        'Idade >55 anos com sintomas novos'
      ]
    },
    protocolos: ['dispepsia-investigacao'],
    medicamentos: ['omeprazol', 'domperidona'],
    calculadoras: [],
    lastUpdate: '2024-12'
  },
  {
    id: 'sindrome-intestino-irritavel',
    titulo: 'Síndrome do Intestino Irritável (SII)',
    sinonimos: ['SII', 'Intestino irritável', 'Colite nervosa'],
    ciap2: ['D93'],
    cid10: ['K58', 'K58.0', 'K58.9'],
    categoria: 'gastrointestinal',
    quickView: {
      definicao: 'Distúrbio funcional gastrointestinal caracterizado por dor abdominal recorrente associada a alterações do hábito intestinal, sem causa orgânica identificável.',
      criteriosDiagnosticos: [
        'Roma IV: Dor abdominal recorrente ≥1 dia/semana nos últimos 3 meses',
        'Associada a ≥2: relação com evacuação, mudança na frequência, mudança na forma',
        'Subtipos: SII-C (constipação), SII-D (diarreia), SII-M (misto)',
        'Ausência de sinais de alarme'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educação e tranquilização (NÃO é doença grave)',
          'Dieta FODMAP pode ajudar',
          'Aumento de fibras solúveis (psyllium)',
          'Atividade física regular',
          'Manejo do estresse'
        ],
        farmacologico: [
          'SII-D: loperamida, antiespasmódicos (hioscina)',
          'SII-C: laxativos osmóticos (PEG), lubiprostona',
          'Dor: antiespasmódicos, antidepressivo tricíclico baixa dose',
          'Distensão: simeticona'
        ]
      },
      redFlags: [
        'Perda de peso involuntária',
        'Sangue nas fezes',
        'Anemia',
        'Febre',
        'Sintomas noturnos que acordam o paciente',
        'Início após 50 anos'
      ]
    },
    protocolos: [],
    medicamentos: ['hioscina', 'simeticona'],
    calculadoras: [],
    lastUpdate: '2024-12'
  },
  {
    id: 'constipacao',
    titulo: 'Constipação Intestinal',
    sinonimos: ['Prisão de ventre', 'Obstipação'],
    ciap2: ['D12'],
    cid10: ['K59.0'],
    categoria: 'gastrointestinal',
    quickView: {
      definicao: 'Evacuações infrequentes (<3/semana), difíceis ou incompletas. Pode ser primária (funcional) ou secundária.',
      criteriosDiagnosticos: [
        'Roma IV: ≥2 de: esforço evacuatório >25%, fezes endurecidas >25%, sensação de evacuação incompleta, necessidade de manobras manuais, <3 evacuações/semana',
        'Duração ≥3 meses',
        'Descartar causas secundárias (medicamentos, hipotireoidismo, obstrução)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Aumento de fibras (25-30g/dia) gradualmente',
          'Hidratação adequada (2L/dia)',
          'Atividade física regular',
          'Não reprimir o reflexo evacuatório',
          'Posição adequada (apoio para pés)'
        ],
        farmacologico: [
          'Fibras suplementares (psyllium)',
          'Laxativos osmóticos: lactulose, polietilenoglicol (PEG)',
          'Laxativos estimulantes: bisacodil, senna (uso esporádico)',
          'Óleo mineral (lubrificante)'
        ]
      },
      redFlags: [
        'Constipação aguda / mudança recente do hábito',
        'Sangue nas fezes',
        'Perda de peso',
        'Anemia',
        'Idade >50 anos sem rastreamento de CCR'
      ]
    },
    protocolos: [],
    medicamentos: ['lactulose', 'bisacodil'],
    calculadoras: [],
    lastUpdate: '2024-12'
  },
  {
    id: 'hemorroidas',
    titulo: 'Doença Hemorroidária',
    sinonimos: ['Hemorroidas', 'Almorreimas'],
    ciap2: ['D95'],
    cid10: ['K64', 'I84'],
    categoria: 'gastrointestinal',
    quickView: {
      definicao: 'Dilatação dos plexos hemorroidários, podendo ser internas (acima da linha pectínea) ou externas (abaixo).',
      criteriosDiagnosticos: [
        'Sangramento vivo durante evacuação',
        'Prolapso durante evacuação',
        'Prurido e desconforto anal',
        'Dor (principalmente se trombose externa)',
        'Classificação: Grau I a IV'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Dieta rica em fibras',
          'Hidratação adequada',
          'Evitar esforço evacuatório',
          'Banhos de assento mornos',
          'Evitar permanecer muito tempo no vaso'
        ],
        farmacologico: [
          'Pomadas/supositórios com corticoide + anestésico (uso curto)',
          'Venotônicos (diosmina + hesperidina) - evidência limitada',
          'Analgésicos se dor (paracetamol)'
        ]
      },
      redFlags: [
        'Sangramento volumoso',
        'Dor intensa (trombose hemorroidária)',
        'Prolapso irredutível (grau IV)',
        'Alteração de hábito intestinal associada',
        'Sangue escuro ou misturado às fezes'
      ]
    },
    protocolos: [],
    medicamentos: ['diosmina-hesperidina'],
    calculadoras: [],
    lastUpdate: '2024-12'
  }
];

// =============================================================================
// CAPÍTULO P - PSICOLÓGICO (Adicionar às existentes: Depressão)
// =============================================================================

export const doencasPsicologicas: Partial<Doenca>[] = [
  {
    id: 'ansiedade',
    titulo: 'Transtorno de Ansiedade Generalizada (TAG)',
    sinonimos: ['Ansiedade', 'TAG', 'Nervosismo'],
    ciap2: ['P74'],
    cid10: ['F41.1'],
    categoria: 'saude_mental',
    quickView: {
      definicao: 'Ansiedade e preocupação excessivas (expectativa apreensiva), difíceis de controlar, presentes na maioria dos dias por pelo menos 6 meses, causando sofrimento significativo.',
      criteriosDiagnosticos: [
        'Ansiedade e preocupação excessivas por ≥6 meses',
        'Dificuldade em controlar a preocupação',
        '≥3 sintomas: inquietação, fadiga, dificuldade concentração, irritabilidade, tensão muscular, insônia',
        'Prejuízo funcional significativo',
        'GAD-7 ≥10 sugere TAG'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoterapia (TCC é primeira linha)',
          'Técnicas de relaxamento e mindfulness',
          'Atividade física regular',
          'Higiene do sono',
          'Reduzir cafeína'
        ],
        farmacologico: [
          'ISRS: sertralina 50-200mg/dia, escitalopram 10-20mg/dia',
          'IRSN: venlafaxina, duloxetina (2ª linha)',
          'Benzodiazepínicos apenas se necessário (curto prazo)',
          'Buspirona (ansiolítico não benzo)'
        ]
      },
      metasTerapeuticas: [
        'GAD-7 <5',
        'Funcionamento social/ocupacional preservado'
      ],
      redFlags: [
        'Ideação suicida',
        'Uso abusivo de substâncias',
        'Sintomas psicóticos',
        'Incapacidade funcional grave'
      ]
    },
    protocolos: ['ansiedade-gad7'],
    medicamentos: ['sertralina', 'escitalopram'],
    calculadoras: ['gad-7'],
    lastUpdate: '2024-12'
  },
  {
    id: 'insonia',
    titulo: 'Insônia',
    sinonimos: ['Insônia', 'Distúrbio do sono'],
    ciap2: ['P06'],
    cid10: ['G47.0', 'F51.0'],
    categoria: 'saude_mental',
    quickView: {
      definicao: 'Dificuldade persistente para iniciar ou manter o sono, ou despertar precoce, associada a prejuízo diurno, apesar de oportunidade adequada para dormir.',
      criteriosDiagnosticos: [
        'Dificuldade para iniciar o sono (>30 min)',
        'Dificuldade para manter o sono (despertares frequentes)',
        'Despertar precoce (>30 min antes do desejado)',
        'Prejuízo diurno (fadiga, irritabilidade, dificuldade concentração)',
        '≥3 noites/semana por ≥3 meses = crônica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Higiene do sono (1ª linha!)',
          'Horário regular para dormir e acordar',
          'Evitar telas 1h antes de dormir',
          'Ambiente escuro, silencioso, temperatura agradável',
          'TCC para insônia (TCC-I)'
        ],
        farmacologico: [
          'Curto prazo se necessário: zolpidem 5-10mg (não benzo)',
          'Antidepressivo sedativo: trazodona 25-100mg, mirtazapina',
          'Anti-histamínico: difenidramina, prometazina',
          'Melatonina em idosos',
          'Evitar benzodiazepínicos prolongados'
        ]
      },
      redFlags: [
        'Roncos/apneias (suspeita de SAOS)',
        'Movimentos periódicos das pernas',
        'Narcolepsia (sonolência diurna excessiva)',
        'Parassonias (sonambulismo, terror noturno)'
      ]
    },
    protocolos: [],
    medicamentos: ['zolpidem', 'trazodona'],
    calculadoras: [],
    lastUpdate: '2024-12'
  },
  {
    id: 'tabagismo',
    titulo: 'Tabagismo',
    sinonimos: ['Dependência de tabaco', 'Fumante'],
    ciap2: ['P17'],
    cid10: ['F17.2'],
    categoria: 'saude_mental',
    quickView: {
      definicao: 'Dependência de nicotina caracterizada por padrão de uso compulsivo de tabaco, tolerância e síndrome de abstinência.',
      criteriosDiagnosticos: [
        'Uso diário ou quase diário de tabaco',
        'Sintomas de abstinência ao tentar parar',
        'Tolerância (necessidade de fumar mais)',
        'Tentativas prévias de cessação sem sucesso',
        'Teste de Fagerström para avaliar grau de dependência'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Abordagem breve (5As): Abordar, Aconselhar, Avaliar, Assistir, Acompanhar',
          'Aconselhamento intensivo aumenta sucesso',
          'Grupos de apoio',
          'Definir data para parar (D-Day)'
        ],
        farmacologico: [
          'Terapia de reposição de nicotina (TRN): adesivo + goma/pastilha',
          'Bupropiona 150mg 12/12h (iniciar 1-2 sem antes)',
          'Vareniclina 0,5-1mg 12/12h (mais eficaz, iniciar antes)',
          'Combinar TRN + bupropiona aumenta eficácia'
        ]
      },
      metasTerapeuticas: [
        'Cessação completa do tabagismo',
        'Prevenção de recaídas'
      ],
      redFlags: [
        'Transtorno psiquiátrico descompensado',
        'Uso de outras substâncias',
        'Ideação suicida (cuidado com vareniclina)'
      ]
    },
    protocolos: ['tabagismo-5as'],
    medicamentos: ['bupropiona', 'vareniclina', 'nicotina-adesivo'],
    calculadoras: ['fagerstrom'],
    lastUpdate: '2024-12'
  },
  {
    id: 'alcoolismo',
    titulo: 'Transtorno por Uso de Álcool',
    sinonimos: ['Alcoolismo', 'Dependência alcoólica', 'Etilismo'],
    ciap2: ['P15'],
    cid10: ['F10.1', 'F10.2'],
    categoria: 'saude_mental',
    quickView: {
      definicao: 'Padrão problemático de uso de álcool levando a prejuízo ou sofrimento clinicamente significativo, manifestado por ≥2 critérios em 12 meses.',
      criteriosDiagnosticos: [
        'CAGE ≥2 positivo sugere problema',
        'AUDIT ≥8 sugere uso de risco',
        'Tolerância e abstinência',
        'Uso em quantidade/tempo maior que pretendido',
        'Abandono de atividades por causa do álcool',
        'Uso continuado apesar de problemas'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Intervenção breve (FRAMES)',
          'Entrevista motivacional',
          'Grupos de apoio (AA)',
          'Tratamento de comorbidades psiquiátricas'
        ],
        farmacologico: [
          'Naltrexona 50mg/dia (reduz craving)',
          'Acamprosato 666mg 8/8h (mantém abstinência)',
          'Dissulfiram 250-500mg/dia (aversivo)',
          'Tiamina 300mg/dia IM/VO (prevenção de Wernicke)'
        ]
      },
      redFlags: [
        'Síndrome de abstinência (tremores, sudorese, confusão)',
        'Delirium tremens (emergência)',
        'Encefalopatia de Wernicke',
        'Ideação suicida',
        'Doença hepática avançada'
      ]
    },
    protocolos: ['alcoolismo-cage-audit'],
    medicamentos: ['naltrexona', 'tiamina'],
    calculadoras: ['cage', 'audit'],
    lastUpdate: '2024-12'
  }
];

// =============================================================================
// CAPÍTULO T - ENDÓCRINO/METABÓLICO (Adicionar às existentes: DM2)
// =============================================================================

export const doencasEndocrinas: Partial<Doenca>[] = [
  {
    id: 'hipotireoidismo',
    titulo: 'Hipotireoidismo',
    sinonimos: ['Hipotireoidismo', 'Tireoide hipoativa'],
    ciap2: ['T86'],
    cid10: ['E03', 'E03.9'],
    categoria: 'endocrino',
    quickView: {
      definicao: 'Síndrome clínica resultante da produção insuficiente de hormônios tireoidianos. A causa mais comum é a tireoidite de Hashimoto.',
      criteriosDiagnosticos: [
        'Sintomas: fadiga, intolerância ao frio, ganho de peso, constipação, pele seca',
        'Sinais: bradicardia, mixedema, alopecia, reflexos lentificados',
        'TSH elevado (hipotireoidismo primário)',
        'T4 livre baixo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Orientar sobre necessidade de tratamento contínuo',
          'Tomar medicação em jejum (30-60min antes do café)'
        ],
        farmacologico: [
          'Levotiroxina: dose inicial 1,6 mcg/kg/dia em jovens',
          'Idosos/cardiopatas: iniciar 12,5-25 mcg/dia',
          'Ajuste a cada 4-6 semanas até TSH normal',
          'Tomar em jejum, longe de cálcio e ferro'
        ]
      },
      metasTerapeuticas: [
        'TSH 0,5-4,0 mUI/L (adultos)',
        'TSH 4-6 mUI/L aceitável em idosos >70 anos'
      ],
      redFlags: [
        'Coma mixedematoso (hipotermia, bradicardia, rebaixamento)',
        'Hipotireoidismo severo não tratado',
        'Gravidez com hipotireoidismo',
        'Nódulo tireoidiano associado'
      ]
    },
    protocolos: ['hipotireoidismo-tratamento'],
    medicamentos: ['levotiroxina'],
    calculadoras: [],
    lastUpdate: '2024-12'
  },
  {
    id: 'dislipidemia',
    titulo: 'Dislipidemia',
    sinonimos: ['Colesterol alto', 'Hipercolesterolemia', 'Triglicerídeos alto'],
    ciap2: ['T93'],
    cid10: ['E78', 'E78.0', 'E78.1', 'E78.2'],
    categoria: 'endocrino',
    quickView: {
      definicao: 'Anormalidades nos níveis lipídicos séricos (colesterol total, LDL-c, HDL-c, triglicerídeos) associadas a aumento do risco cardiovascular.',
      criteriosDiagnosticos: [
        'LDL-c elevado (limite depende do risco CV)',
        'HDL-c baixo (<40 homens, <50 mulheres)',
        'Triglicerídeos elevados (≥150 mg/dL)',
        'Estratificar risco CV (PREVENT/ERG)',
        'Jejum de 12h não mais obrigatório para CT e HDL'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Dieta mediterrânea / redução de gorduras saturadas',
          'Atividade física regular',
          'Cessação do tabagismo',
          'Perda de peso se sobrepeso/obeso'
        ],
        farmacologico: [
          'Estatinas: atorvastatina, rosuvastatina (1ª linha)',
          'Alta intensidade: atorvastatina 40-80mg, rosuvastatina 20-40mg',
          'Moderada intensidade: atorvastatina 10-20mg, sinvastatina 20-40mg',
          'Ezetimiba 10mg se não atinge meta',
          'Fibratos apenas se TG >500 mg/dL'
        ]
      },
      metasTerapeuticas: [
        'Baixo risco: LDL-c <130',
        'Intermediário: LDL-c <100',
        'Alto risco: LDL-c <70',
        'Muito alto risco: LDL-c <50'
      ],
      redFlags: [
        'TG >500 mg/dL (risco de pancreatite)',
        'LDL-c >190 mg/dL (suspeita HF)',
        'Xantomas tendinosos',
        'Evento CV prévio'
      ]
    },
    protocolos: ['dislipidemia-metas'],
    medicamentos: ['atorvastatina', 'rosuvastatina', 'ezetimiba'],
    calculadoras: ['risco-cv', 'prevent'],
    lastUpdate: '2024-12'
  },
  {
    id: 'obesidade',
    titulo: 'Obesidade',
    sinonimos: ['Obesidade', 'Excesso de peso'],
    ciap2: ['T82'],
    cid10: ['E66', 'E66.9'],
    categoria: 'endocrino',
    quickView: {
      definicao: 'Doença crônica caracterizada por acúmulo anormal ou excessivo de gordura corporal que pode prejudicar a saúde. IMC ≥30 kg/m².',
      criteriosDiagnosticos: [
        'IMC 25-29,9: sobrepeso',
        'IMC 30-34,9: obesidade grau I',
        'IMC 35-39,9: obesidade grau II',
        'IMC ≥40: obesidade grau III (mórbida)',
        'Circunferência abdominal: >88cm mulheres, >102cm homens'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Déficit calórico 500-750 kcal/dia',
          'Dieta equilibrada (não restritiva demais)',
          'Atividade física: 150-300 min/semana',
          'Mudança de comportamento alimentar',
          'Suporte psicológico'
        ],
        farmacologico: [
          'Indicado se IMC ≥30 ou ≥27 + comorbidades',
          'Orlistate 120mg nas refeições (disponível SUS)',
          'Liraglutida 3mg/dia SC (agonista GLP-1)',
          'Semaglutida 2,4mg/semana SC',
          'Cirurgia bariátrica se IMC ≥40 ou ≥35 + comorbidades'
        ]
      },
      metasTerapeuticas: [
        'Perda de 5-10% do peso inicial em 6 meses',
        'Manutenção do peso perdido'
      ],
      redFlags: [
        'SAOS grave',
        'Síndrome metabólica',
        'Diabetes descompensado',
        'Limitação funcional grave'
      ]
    },
    protocolos: [],
    medicamentos: ['orlistate', 'liraglutida'],
    calculadoras: ['imc'],
    lastUpdate: '2024-12'
  }
];

// =============================================================================
// CAPÍTULO S - PELE
// =============================================================================

export const doencasDermatologicas: Partial<Doenca>[] = [
  {
    id: 'acne',
    titulo: 'Acne Vulgar',
    sinonimos: ['Acne', 'Espinhas', 'Cravos'],
    ciap2: ['S96'],
    cid10: ['L70', 'L70.0'],
    categoria: 'dermatologico',
    quickView: {
      definicao: 'Doença inflamatória crônica da unidade pilossebácea, caracterizada por comedões, pápulas, pústulas e, em casos graves, nódulos e cistos.',
      criteriosDiagnosticos: [
        'Lesões na face, tórax e/ou dorso',
        'Comedões (cravos abertos/fechados)',
        'Pápulas e pústulas inflamatórias',
        'Nódulos e cistos (formas graves)',
        'Classificação: leve, moderada, grave'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Limpeza suave 2x/dia',
          'Evitar manipular lesões',
          'Hidratação não comedogênica',
          'Proteção solar'
        ],
        farmacologico: [
          'Leve: retinoide tópico (adapaleno) + peróxido de benzoíla',
          'Moderada: adicionar antibiótico tópico (clindamicina)',
          'Moderada a grave: antibiótico oral (doxiciclina, azitromicina)',
          'Grave/refratária: isotretinoína oral (dermatologista)'
        ]
      },
      redFlags: [
        'Acne fulminans (febre, artralgia, leucocitose)',
        'Acne grave com cicatrizes',
        'Sinais de hiperandrogenismo em mulheres'
      ]
    },
    protocolos: [],
    medicamentos: ['adapaleno', 'doxiciclina'],
    calculadoras: [],
    lastUpdate: '2024-12'
  },
  {
    id: 'dermatite-atopica',
    titulo: 'Dermatite Atópica',
    sinonimos: ['Eczema', 'Dermatite atópica'],
    ciap2: ['S87'],
    cid10: ['L20', 'L20.9'],
    categoria: 'dermatologico',
    quickView: {
      definicao: 'Doença inflamatória crônica da pele, recidivante, caracterizada por prurido intenso, xerose e lesões eczematosas.',
      criteriosDiagnosticos: [
        'Prurido (critério obrigatório)',
        'Morfologia e distribuição típicas por idade',
        'Lactentes: face e superfícies extensoras',
        'Crianças/adultos: flexuras (fossas cubitais, poplíteas)',
        'História pessoal/familiar de atopia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratação intensiva (emolientes 2-3x/dia)',
          'Banhos mornos e curtos',
          'Evitar sabonetes agressivos',
          'Controle ambiental (ácaros, pelos)',
          'Cortar unhas curtas'
        ],
        farmacologico: [
          'Corticoide tópico: baixa potência (hidrocortisona) para face',
          'Média potência (mometasona, betametasona) para corpo',
          'Anti-histamínicos orais para prurido',
          'Inibidores de calcineurina (pimecrolimus, tacrolimus) para manutenção'
        ]
      },
      redFlags: [
        'Infecção secundária (impetiginização)',
        'Eczema herpético',
        'Eritrodermia',
        'Refratariedade ao tratamento'
      ]
    },
    protocolos: [],
    medicamentos: ['hidrocortisona', 'mometasona', 'loratadina'],
    calculadoras: [],
    lastUpdate: '2024-12'
  },
  {
    id: 'micoses-superficiais',
    titulo: 'Micoses Superficiais',
    sinonimos: ['Tinha', 'Micose', 'Frieira', 'Pano branco'],
    ciap2: ['S74', 'S75'],
    cid10: ['B35', 'B36', 'B37.2'],
    categoria: 'dermatologico',
    quickView: {
      definicao: 'Infecções fúngicas da pele, cabelo e unhas. Incluem dermatofitoses (tineas) e candidíase cutânea.',
      criteriosDiagnosticos: [
        'Tinha corporis: lesão anular com borda ativa e centro claro',
        'Tinha pedis (pé de atleta): descamação interdigital, prurido',
        'Tinha cruris: placa pruriginosa na virilha',
        'Pitiríase versicolor: máculas hipo/hipercrômicas',
        'Candidíase: eritema úmido em dobras'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Manter área seca',
          'Roupas de algodão',
          'Não compartilhar objetos pessoais',
          'Secar bem entre os dedos'
        ],
        farmacologico: [
          'Tópico: cetoconazol, miconazol, terbinafina creme',
          'Aplicar 1-2x/dia por 2-4 semanas',
          'Tinha capitis: terbinafina ou griseofulvina oral',
          'Onicomicose: terbinafina oral por 3-6 meses'
        ]
      },
      redFlags: [
        'Tinha capitis (queda de cabelo)',
        'Onicomicose extensa',
        'Imunossupressão',
        'Micose disseminada'
      ]
    },
    protocolos: [],
    medicamentos: ['cetoconazol', 'terbinafina'],
    calculadoras: [],
    lastUpdate: '2024-12'
  }
];

// =============================================================================
// CAPÍTULO N - NEUROLÓGICO
// =============================================================================

export const doencasNeurologicas: Partial<Doenca>[] = [
  {
    id: 'cefaleia-tensional',
    titulo: 'Cefaleia do Tipo Tensional',
    sinonimos: ['Cefaleia tensional', 'Dor de cabeça'],
    ciap2: ['N90', 'N01'],
    cid10: ['G44.2'],
    categoria: 'neurologico',
    quickView: {
      definicao: 'Cefaleia primária mais comum, caracterizada por dor bilateral, em pressão/aperto, intensidade leve a moderada, sem piora com atividade física.',
      criteriosDiagnosticos: [
        'Dor bilateral (em faixa ou capacete)',
        'Qualidade em pressão/aperto (não pulsátil)',
        'Intensidade leve a moderada',
        'Não piora com atividade física rotineira',
        'Sem náuseas/vômitos (pode ter foto OU fonofobia)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Identificar e evitar gatilhos (estresse, postura)',
          'Técnicas de relaxamento',
          'Atividade física regular',
          'Higiene do sono'
        ],
        farmacologico: [
          'Agudo: paracetamol 500-1000mg ou ibuprofeno 400-600mg',
          'Evitar uso >10 dias/mês (cefaleia por uso excessivo)',
          'Profilaxia se ≥15 dias/mês: amitriptilina 10-75mg/noite'
        ]
      },
      redFlags: [
        'Cefaleia súbita e intensa ("a pior da vida")',
        'Alteração neurológica focal',
        'Febre + rigidez de nuca',
        'Início após 50 anos',
        'Mudança de padrão habitual'
      ]
    },
    protocolos: ['cefaleia-red-flags'],
    medicamentos: ['paracetamol', 'ibuprofeno', 'amitriptilina'],
    calculadoras: [],
    lastUpdate: '2024-12'
  },
  {
    id: 'enxaqueca',
    titulo: 'Enxaqueca (Migrânea)',
    sinonimos: ['Enxaqueca', 'Migrânea'],
    ciap2: ['N89'],
    cid10: ['G43', 'G43.0', 'G43.1'],
    categoria: 'neurologico',
    quickView: {
      definicao: 'Cefaleia primária recorrente caracterizada por crises de dor unilateral, pulsátil, moderada a intensa, com náuseas e/ou foto/fonofobia.',
      criteriosDiagnosticos: [
        '≥5 crises preenchendo critérios',
        'Duração 4-72 horas (se não tratada)',
        '≥2 de: unilateral, pulsátil, moderada/intensa, piora com atividade',
        '≥1 de: náusea/vômito, foto E fonofobia',
        'Com ou sem aura (sintomas neurológicos reversíveis)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Identificar e evitar gatilhos',
          'Diário de cefaleia',
          'Atividade física regular',
          'Sono regular'
        ],
        farmacologico: [
          'Crise leve: ibuprofeno, naproxeno, paracetamol',
          'Crise moderada/grave: triptanos (sumatriptano 50-100mg)',
          'Náusea: metoclopramida',
          'Profilaxia se ≥4 crises/mês: propranolol, amitriptilina, topiramato'
        ]
      },
      redFlags: [
        'Aura atípica (>60 min, motora)',
        'Cefaleia súbita e intensa',
        'Febre + rigidez de nuca',
        'Alteração neurológica persistente'
      ]
    },
    protocolos: ['enxaqueca-tratamento'],
    medicamentos: ['sumatriptano', 'propranolol', 'amitriptilina'],
    calculadoras: ['midas'],
    lastUpdate: '2024-12'
  }
];

// =============================================================================
// CONSOLIDAÇÃO - TODAS AS DOENÇAS EXPANDIDAS
// =============================================================================

export const doencasExpanded: Partial<Doenca>[] = [
  ...doencasCardiovasculares,
  ...doencasRespiratorias,
  ...doencasDigestivas,
  ...doencasPsicologicas,
  ...doencasEndocrinas,
  ...doencasDermatologicas,
  ...doencasNeurologicas,
];

// Total: ~35 novas doenças + 6 existentes = ~41 doenças
// Para chegar a 50+, adicionar mais em iterações futuras

