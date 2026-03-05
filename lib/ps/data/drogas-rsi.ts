import { EmergencyDrug } from '../types';

export const drogasRSI: EmergencyDrug[] = [
  // 1. Etomidato
  {
    id: 'etomidato',
    genericName: 'Etomidato',
    tradeName: ['Amidate', 'Etomidato Lipuro', 'Hypnomidate'],
    category: 'rsi',
    subcategory: 'indutor',
    atcCode: 'N01AX07',
    snomedCT: '387218008',
    rename: true,
    sus: true,
    presentations: [
      'Ampola 20 mg/10 mL (2 mg/mL) solucao injetavel',
    ],
    mechanismOfAction:
      'Derivado imidazolico que potencializa a acao do GABA no receptor GABA-A, promovendo hipnose rapida sem efeito analgesico. Possui minimo impacto hemodinamico por nao afetar significativamente o tonus simpatico ou a funcao miocardica.',
    emergencyDosing: [
      {
        indication: 'Inducao em sequencia rapida de intubacao (RSI)',
        route: 'IV',
        doseRange: { min: 0.3, max: 0.3 },
        doseUnit: 'mg/kg',
        maxDose: '40 mg',
        bolus: 'Infundir em 30-60 segundos',
        onset: '15-45 segundos',
        peak: '1 minuto',
        duration: '3-12 minutos',
        notes: [
          'Dose unica preferencial - uso repetido suprime eixo adrenal',
          'Nao possui propriedade analgesica',
          'Pode causar mioclonias (reduzir com pre-tratamento com fentanil ou lidocaina)',
        ],
        adjustments: [
          {
            condition: 'Choque / instabilidade hemodinamica',
            modification:
              'Manter dose padrao de 0.3 mg/kg - etomidato ja e a droga de menor impacto hemodinamico entre os indutores',
          },
          {
            condition: 'Obeso (IMC > 30)',
            modification: 'Utilizar peso corporal total; dose maxima 40 mg',
          },
          {
            condition: 'Insuficiencia adrenal conhecida',
            modification:
              'Considerar cetamina como alternativa - etomidato suprime sintese de cortisol por 24-72h',
          },
        ],
      },
    ],
    contraindications: [
      'Insuficiencia adrenal conhecida (relativa)',
      'Hipersensibilidade ao etomidato ou excipientes',
      'Sepse com necessidade de infusao continua (supressao adrenal)',
      'Porfiria aguda',
    ],
    seriousAdverseEffects: [
      'Supressao adrenal (inibicao reversivel da 11-beta-hidroxilase) - dose unica: 24-72h',
      'Mioclonias (20-60% dos pacientes)',
      'Nausea e vomitos pos-procedimento',
      'Dor a injecao (formulacao com propilenoglicol)',
      'Apneia transitoria',
    ],
    yCompatibility: [
      { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
      { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
      { drugId: 'succinilcolina', drugName: 'Succinilcolina', status: 'compatible' },
      { drugId: 'rocuronio', drugName: 'Rocuronio', status: 'compatible' },
      { drugId: 'atropina', drugName: 'Atropina', status: 'compatible' },
      { drugId: 'diazepam', drugName: 'Diazepam', status: 'incompatible' },
    ],
    pregnancyCategory: 'C',
    references: [
      {
        citation:
          'Bruder EA, Ball IM, Ridi S, et al. Single induction dose of etomidate versus other induction agents for endotracheal intubation in critically ill patients. Cochrane Database Syst Rev.',
        year: 2015,
        guideline: 'Cochrane Systematic Review CD010225',
      },
      {
        citation:
          'Walls RM, Hockberger RS, Gausche-Hill M. Rosens Emergency Medicine: Concepts and Clinical Practice. 10th ed. Elsevier.',
        year: 2023,
        guideline: 'Chapter 1 - Airway Management',
      },
      {
        citation:
          'Brown CA III, Sakles JC, Mick NW. The Walls Manual of Emergency Airway Management. 6th ed. Wolters Kluwer.',
        year: 2023,
      },
    ],
    keywords: [
      'etomidato',
      'etomidate',
      'indutor',
      'RSI',
      'intubacao',
      'sequencia rapida',
      'hemodinamicamente estavel',
      'GABA',
    ],
  },

  // 2. Cetamina (Ketamine)
  {
    id: 'cetamina',
    genericName: 'Cetamina (Ketamine)',
    tradeName: ['Ketalar', 'Ketamin', 'Clortamina'],
    category: 'rsi',
    subcategory: 'indutor',
    atcCode: 'N01AX03',
    snomedCT: '373464007',
    rename: true,
    sus: true,
    presentations: [
      'Frasco-ampola 500 mg/10 mL (50 mg/mL) solucao injetavel',
      'Frasco-ampola 50 mg/mL - 2 mL',
      'Frasco-ampola 50 mg/mL - 10 mL',
    ],
    mechanismOfAction:
      'Antagonista nao-competitivo do receptor NMDA (N-metil-D-aspartato), produzindo anestesia dissociativa com analgesia, amnesia e manutencao de reflexos protetores das vias aereas e do drive respiratorio. Promove estimulacao simpatica indireta (liberacao de catecolaminas), mantendo a pressao arterial e frequencia cardiaca.',
    emergencyDosing: [
      {
        indication: 'Inducao em sequencia rapida de intubacao (RSI)',
        route: 'IV',
        doseRange: { min: 1, max: 2 },
        doseUnit: 'mg/kg',
        maxDose: '200 mg',
        bolus: 'Infundir em 60 segundos',
        onset: '30-60 segundos',
        peak: '1-2 minutos',
        duration: '10-20 minutos',
        notes: [
          'Droga de escolha no paciente hipotenso / choque',
          'Possui propriedade broncodilatadora - util em status asmaticus',
          'Causa hipersalivacao - considerar atropina ou glicopirrolato como pre-tratamento',
          'Evidencia recente nao demonstra aumento clinicamente significativo da PIC em pacientes ventilados',
        ],
        adjustments: [
          {
            condition: 'Choque / hipotensao',
            modification:
              'Dose preferencial: 1-1.5 mg/kg IV - cetamina e o indutor de escolha neste cenario pelo suporte hemodinamico',
          },
          {
            condition: 'Obeso (IMC > 30)',
            modification:
              'Utilizar peso corporal ideal (IBW); dose maxima 200 mg',
          },
          {
            condition: 'TCE / hipertensao intracraniana (HIC)',
            modification:
              'Pode ser utilizada com seguranca em pacientes ventilados - evidencia atual nao contraindica. Dose padrao.',
          },
          {
            condition: 'Asma / broncoespasmo',
            modification:
              'Droga de escolha - efeito broncodilatador direto. Dose padrao 1-2 mg/kg',
          },
        ],
      },
      {
        indication: 'Inducao RSI - via intramuscular (quando acesso IV indisponivel)',
        route: 'IM',
        doseRange: { min: 3, max: 5 },
        doseUnit: 'mg/kg',
        maxDose: '500 mg',
        onset: '2-4 minutos',
        peak: '4-5 minutos',
        duration: '15-30 minutos',
        notes: [
          'Reservado para situacoes sem acesso venoso',
          'Utilizar concentracao de 50 mg/mL para reduzir volume',
        ],
        adjustments: [],
      },
    ],
    contraindications: [
      'Hipersensibilidade a cetamina',
      'Eclampsia ou pre-eclampsia grave (relativa - dados limitados)',
      'Aneurisma de aorta ou disseccao aortica nao controlada',
      'Esquizofrenia ativa nao tratada (relativa)',
    ],
    seriousAdverseEffects: [
      'Hipersalivacao / sialorreia',
      'Laringoespasmo (raro, mais frequente em criancas)',
      'Fenomenos de emergencia (alucinacoes, agitacao) - reduzir com benzodiazepinicos',
      'Hipertensao e taquicardia (estimulacao simpatica)',
      'Aumento transitorio da PIC (relevancia clinica questionada)',
      'Nistagmo',
      'Vomitos (mais comum apos doses IM)',
    ],
    yCompatibility: [
      { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
      { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
      { drugId: 'rocuronio', drugName: 'Rocuronio', status: 'compatible' },
      { drugId: 'succinilcolina', drugName: 'Succinilcolina', status: 'compatible' },
      { drugId: 'propofol', drugName: 'Propofol', status: 'incompatible' },
      { drugId: 'dexametasona', drugName: 'Dexametasona', status: 'compatible' },
    ],
    pregnancyCategory: 'B',
    references: [
      {
        citation:
          'Drayna PC, Estrada C, Wang W, et al. Ketamine sedation is not associated with clinically meaningful elevation of intraocular pressure. Am J Emerg Med.',
        year: 2012,
      },
      {
        citation:
          'Cohen L, Athaide V, Wickham ME, et al. The effect of ketamine on intracranial and cerebral perfusion pressure and health outcomes: a systematic review. Ann Emerg Med.',
        year: 2015,
      },
      {
        citation:
          'Brown CA III, Sakles JC, Mick NW. The Walls Manual of Emergency Airway Management. 6th ed. Wolters Kluwer.',
        year: 2023,
      },
      {
        citation:
          'Ministerio da Saude. Relacao Nacional de Medicamentos Essenciais - RENAME 2024.',
        year: 2024,
        guideline: 'RENAME',
      },
    ],
    keywords: [
      'cetamina',
      'ketamina',
      'ketamine',
      'indutor',
      'RSI',
      'dissociativa',
      'choque',
      'broncoespasmo',
      'NMDA',
    ],
  },

  // 3. Propofol
  {
    id: 'propofol',
    genericName: 'Propofol',
    tradeName: ['Diprivan', 'Propovan', 'Provive'],
    category: 'rsi',
    subcategory: 'indutor',
    atcCode: 'N01AX10',
    snomedCT: '387423006',
    rename: true,
    sus: true,
    presentations: [
      'Ampola 200 mg/20 mL (10 mg/mL) emulsao injetavel',
      'Frasco-ampola 500 mg/50 mL (10 mg/mL) emulsao injetavel',
      'Frasco-ampola 1000 mg/100 mL (10 mg/mL) emulsao injetavel',
    ],
    mechanismOfAction:
      'Derivado alquilfenolico que potencializa a acao do GABA no receptor GABA-A, causando hipnose rapida com propriedade antiepileptica e antiemetica. Promove vasodilatacao e depressao miocardica direta dose-dependente, resultando em hipotensao significativa.',
    emergencyDosing: [
      {
        indication: 'Inducao em sequencia rapida de intubacao (RSI)',
        route: 'IV',
        doseRange: { min: 1, max: 2.5 },
        doseUnit: 'mg/kg',
        maxDose: '200 mg',
        bolus: 'Infundir em 20-30 segundos',
        onset: '15-45 segundos',
        peak: '1 minuto',
        duration: '5-10 minutos',
        notes: [
          'Causa hipotensao significativa dose-dependente - evitar em pacientes hemodinamicamente instaveis',
          'Util em status epilepticus como indutor com propriedade antiepileptica',
          'Dor a injecao frequente - pode ser atenuada com lidocaina 20-40 mg IV pre-injecao',
          'Emulsao lipidica - risco de contaminacao bacteriana apos abertura',
        ],
        adjustments: [
          {
            condition: 'Choque / hipotensao',
            modification:
              'EVITAR propofol. Se unica opcao disponivel, reduzir dose para 0.5-1 mg/kg e infundir lentamente com reposicao volumetrica agressiva',
          },
          {
            condition: 'Obeso (IMC > 30)',
            modification:
              'Utilizar peso corporal magro (LBW); iniciar com 1 mg/kg de LBW',
          },
          {
            condition: 'Idoso (> 65 anos)',
            modification:
              'Reduzir dose para 0.5-1.5 mg/kg e infundir lentamente',
          },
          {
            condition: 'Status epilepticus',
            modification:
              'Droga de escolha como indutor pela propriedade antiepileptica. Dose padrao 1-2.5 mg/kg',
          },
        ],
      },
    ],
    contraindications: [
      'Hipersensibilidade ao propofol, oleo de soja, lecitina de ovo ou glicerol',
      'Alergia grave a ovo ou soja (controverso - maioria dos alergistas considera seguro)',
      'Choque / instabilidade hemodinamica severa',
      'Disturbio do metabolismo lipidico (hipertrigliceridemia grave)',
    ],
    seriousAdverseEffects: [
      'Hipotensao arterial (25-40% dos pacientes)',
      'Depressao respiratoria / apneia',
      'Bradicardia',
      'Dor a injecao (em veias de pequeno calibre)',
      'Sindrome da infusao de propofol (PRIS) - com uso prolongado em altas doses',
      'Hipertrigliceridemia (uso prolongado)',
      'Movimentos involuntarios (excitatorios paradoxais)',
    ],
    yCompatibility: [
      { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
      { drugId: 'lidocaina-iv', drugName: 'Lidocaina', status: 'compatible' },
      { drugId: 'rocuronio', drugName: 'Rocuronio', status: 'compatible' },
      { drugId: 'succinilcolina', drugName: 'Succinilcolina', status: 'compatible' },
      { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
      { drugId: 'cetamina', drugName: 'Cetamina', status: 'incompatible' },
      { drugId: 'ciprofloxacino', drugName: 'Ciprofloxacino', status: 'incompatible' },
    ],
    pregnancyCategory: 'B',
    references: [
      {
        citation:
          'Walls RM, Hockberger RS, Gausche-Hill M. Rosens Emergency Medicine: Concepts and Clinical Practice. 10th ed. Elsevier.',
        year: 2023,
        guideline: 'Chapter 1 - Airway Management',
      },
      {
        citation:
          'Brown CA III, Sakles JC, Mick NW. The Walls Manual of Emergency Airway Management. 6th ed. Wolters Kluwer.',
        year: 2023,
      },
      {
        citation:
          'Hemphill S, McMenamin L, Bellamy MC, Hopkins PM. Propofol infusion syndrome: a structured literature review and analysis of published case reports. Br J Anaesth.',
        year: 2019,
      },
    ],
    keywords: [
      'propofol',
      'diprivan',
      'indutor',
      'RSI',
      'hipnotico',
      'GABA',
      'hipotensao',
      'antiepileptico',
    ],
  },

  // 4. Midazolam
  {
    id: 'midazolam',
    genericName: 'Midazolam',
    tradeName: ['Dormonid', 'Dormire', 'Midazolam Cristalia'],
    category: 'rsi',
    subcategory: 'indutor',
    atcCode: 'N05CD08',
    snomedCT: '373476007',
    rename: true,
    sus: true,
    presentations: [
      'Ampola 15 mg/3 mL (5 mg/mL) solucao injetavel',
      'Ampola 50 mg/10 mL (5 mg/mL) solucao injetavel',
      'Ampola 5 mg/5 mL (1 mg/mL) solucao injetavel',
    ],
    mechanismOfAction:
      'Benzodiazepinico de acao curta que potencializa a ligacao do GABA ao receptor GABA-A, aumentando a frequencia de abertura dos canais de cloro. Produz sedacao, amnesia anterograda, ansiolise e propriedade anticonvulsivante. Nao possui efeito analgesico.',
    emergencyDosing: [
      {
        indication: 'Inducao RSI - indutor alternativo (quando outros indutores indisponiveis)',
        route: 'IV',
        doseRange: { min: 0.1, max: 0.3 },
        doseUnit: 'mg/kg',
        maxDose: '20 mg',
        bolus: 'Infundir em 20-30 segundos',
        onset: '1-3 minutos',
        peak: '3-5 minutos',
        duration: '15-30 minutos',
        notes: [
          'NAO e o indutor ideal para RSI - inicio de acao mais lento que etomidato/propofol/cetamina',
          'Utilizar dose de 0.2-0.3 mg/kg quando usado como indutor (nao dose de sedacao)',
          'Causa hipotensao, especialmente quando combinado com fentanil',
          'Reversivel com flumazenil (0.2 mg IV a cada 60s, max 1 mg)',
        ],
        adjustments: [
          {
            condition: 'Choque / hipotensao',
            modification:
              'Reduzir dose para 0.05-0.1 mg/kg. Preferir cetamina ou etomidato como alternativa.',
          },
          {
            condition: 'Obeso (IMC > 30)',
            modification:
              'Utilizar peso corporal ideal (IBW); midazolam e altamente lipofilico e acumula em tecido adiposo',
          },
          {
            condition: 'Idoso (> 65 anos)',
            modification:
              'Reduzir dose para 0.05-0.15 mg/kg. Maior sensibilidade e clearance reduzido.',
          },
          {
            condition: 'Insuficiencia hepatica',
            modification:
              'Reduzir dose em 50%. Metabolismo hepatico via CYP3A4 significativamente reduzido.',
          },
        ],
      },
    ],
    contraindications: [
      'Hipersensibilidade a benzodiazepinicos',
      'Glaucoma de angulo fechado agudo nao tratado',
      'Miastenia gravis (relativa - risco de fraqueza muscular exacerbada)',
      'Porfiria aguda',
    ],
    seriousAdverseEffects: [
      'Depressao respiratoria / apneia',
      'Hipotensao (especialmente com opioides concomitantes)',
      'Reacoes paradoxais (agitacao, agressividade - mais frequente em idosos e criancas)',
      'Amnesia anterograda prolongada',
      'Depressao do SNC prolongada em insuficiencia hepatica/renal',
      'Dependencia com uso prolongado',
    ],
    yCompatibility: [
      { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
      { drugId: 'rocuronio', drugName: 'Rocuronio', status: 'compatible' },
      { drugId: 'succinilcolina', drugName: 'Succinilcolina', status: 'compatible' },
      { drugId: 'etomidato', drugName: 'Etomidato', status: 'compatible' },
      { drugId: 'atropina', drugName: 'Atropina', status: 'compatible' },
      { drugId: 'fenitoina', drugName: 'Fenitoina', status: 'incompatible' },
      { drugId: 'furosemida', drugName: 'Furosemida', status: 'incompatible' },
    ],
    pregnancyCategory: 'D',
    references: [
      {
        citation:
          'Brown CA III, Sakles JC, Mick NW. The Walls Manual of Emergency Airway Management. 6th ed. Wolters Kluwer.',
        year: 2023,
      },
      {
        citation:
          'Walls RM, Hockberger RS, Gausche-Hill M. Rosens Emergency Medicine: Concepts and Clinical Practice. 10th ed. Elsevier.',
        year: 2023,
      },
      {
        citation:
          'Ministerio da Saude. Relacao Nacional de Medicamentos Essenciais - RENAME 2024.',
        year: 2024,
        guideline: 'RENAME',
      },
    ],
    keywords: [
      'midazolam',
      'dormonid',
      'benzodiazepinico',
      'indutor',
      'RSI',
      'sedacao',
      'GABA',
      'amnesia',
    ],
  },

  // 5. Fentanil
  {
    id: 'fentanil',
    genericName: 'Fentanil (Fentanyl)',
    tradeName: ['Fentanest', 'Fentanil Cristalia', 'Fentanyl Janssen'],
    category: 'rsi',
    subcategory: 'pre-tratamento',
    atcCode: 'N01AH01',
    snomedCT: '373492002',
    rename: true,
    sus: true,
    presentations: [
      'Ampola 0.05 mg/mL (50 mcg/mL) - 2 mL (100 mcg)',
      'Ampola 0.05 mg/mL (50 mcg/mL) - 5 mL (250 mcg)',
      'Ampola 0.05 mg/mL (50 mcg/mL) - 10 mL (500 mcg)',
    ],
    mechanismOfAction:
      'Opioide sintetico agonista puro dos receptores mu, com potencia 100 vezes superior a morfina. Promove analgesia intensa, sedacao e supressao da resposta simpatica a laringoscopia. Inicio de acao rapido IV com alta lipossolubilidade e curta duracao pelo efeito de redistribuicao.',
    emergencyDosing: [
      {
        indication: 'Pre-tratamento RSI - atenuacao da resposta simpatica a laringoscopia',
        route: 'IV',
        doseRange: { min: 1, max: 3 },
        doseUnit: 'mcg/kg',
        maxDose: '200 mcg',
        bolus: 'Infundir lentamente em 60-90 segundos (rigidez toracica se rapido)',
        onset: '2-3 minutos',
        peak: '3-5 minutos',
        duration: '30-60 minutos',
        notes: [
          'Administrar 3 minutos ANTES do indutor na fase de pre-tratamento',
          'Atenua a resposta hipertensiva e taquicardica a laringoscopia',
          'Indicado especialmente em: disseccao aortica, aneurisma cerebral, HIC, cardiopatia isquemica',
          'Injecao rapida causa rigidez toracica (chest wall rigidity) - infundir em > 60 segundos',
          'Pode causar hipotensao em pacientes hipovolemicos',
        ],
        adjustments: [
          {
            condition: 'Choque / hipotensao',
            modification:
              'Reduzir dose para 1 mcg/kg ou OMITIR pre-tratamento com opioide. Risco de hipotensao acentuada.',
          },
          {
            condition: 'Obeso (IMC > 30)',
            modification:
              'Utilizar peso corporal magro (LBW); fentanil e altamente lipofilico',
          },
          {
            condition: 'TCE / hipertensao intracraniana',
            modification:
              'Dose padrao 2-3 mcg/kg - indicacao principal e atenuar pico hipertensivo da laringoscopia',
          },
          {
            condition: 'Insuficiencia renal',
            modification:
              'Sem ajuste necessario para dose unica; acumulo de metabolitos com doses repetidas',
          },
        ],
      },
    ],
    contraindications: [
      'Hipersensibilidade a fentanil ou opioides sinteticos',
      'Uso concomitante de IMAO (nos ultimos 14 dias) - risco de sindrome serotoninergica',
      'Depressao respiratoria severa sem equipamento de ventilacao disponivel',
    ],
    seriousAdverseEffects: [
      'Rigidez toracica / rigidez da parede toracica (com injecao rapida)',
      'Depressao respiratoria / apneia',
      'Hipotensao (especialmente em hipovolemia)',
      'Bradicardia (efeito vagotonico)',
      'Nausea e vomitos',
      'Laringoespasmo (raro)',
      'Sindrome serotoninergica (com IMAO ou serotoninergicos)',
    ],
    yCompatibility: [
      { drugId: 'etomidato', drugName: 'Etomidato', status: 'compatible' },
      { drugId: 'propofol', drugName: 'Propofol', status: 'compatible' },
      { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
      { drugId: 'rocuronio', drugName: 'Rocuronio', status: 'compatible' },
      { drugId: 'cetamina', drugName: 'Cetamina', status: 'compatible' },
      { drugId: 'fenitoina', drugName: 'Fenitoina', status: 'incompatible' },
      { drugId: 'pantoprazol', drugName: 'Pantoprazol', status: 'incompatible' },
    ],
    pregnancyCategory: 'C',
    references: [
      {
        citation:
          'Walls RM, Hockberger RS, Gausche-Hill M. Rosens Emergency Medicine: Concepts and Clinical Practice. 10th ed. Elsevier.',
        year: 2023,
      },
      {
        citation:
          'Brown CA III, Sakles JC, Mick NW. The Walls Manual of Emergency Airway Management. 6th ed. Wolters Kluwer.',
        year: 2023,
      },
      {
        citation:
          'Correa F, et al. Fentanyl-induced chest wall rigidity syndrome: a narrative review. Ann Intensive Care.',
        year: 2022,
      },
    ],
    keywords: [
      'fentanil',
      'fentanyl',
      'opioide',
      'pre-tratamento',
      'RSI',
      'analgesia',
      'rigidez toracica',
      'mu',
    ],
  },

  // 6. Lidocaina IV
  {
    id: 'lidocaina-iv',
    genericName: 'Lidocaina IV',
    tradeName: ['Xylocaina', 'Xylestesin', 'Lidopass'],
    category: 'rsi',
    subcategory: 'pre-tratamento',
    atcCode: 'C01BB01',
    snomedCT: '387480006',
    rename: true,
    sus: true,
    presentations: [
      'Ampola 2% sem vasoconstritor - 20 mg/mL - 5 mL (100 mg)',
      'Ampola 2% sem vasoconstritor - 20 mg/mL - 20 mL (400 mg)',
      'Frasco-ampola 1% - 10 mg/mL - 20 mL (200 mg)',
    ],
    mechanismOfAction:
      'Anestesico local do grupo amida que bloqueia canais de sodio voltagem-dependentes. Na administracao IV, suprime a tosse e a resposta simpatica reflexa a laringoscopia, atenuando a elevacao da PIC durante a intubacao. Possui tambem propriedade antiaritmica (Classe IB de Vaughan-Williams).',
    emergencyDosing: [
      {
        indication: 'Pre-tratamento RSI - atenuacao do reflexo de tosse e resposta a laringoscopia',
        route: 'IV',
        doseRange: { min: 1.5, max: 1.5 },
        doseUnit: 'mg/kg',
        maxDose: '120 mg',
        bolus: 'Infundir em 60 segundos',
        onset: '1-3 minutos',
        peak: '2-3 minutos',
        duration: '10-20 minutos',
        notes: [
          'Administrar 3 minutos ANTES do indutor',
          'Indicada especialmente em pacientes com hipertensao intracraniana (HIC) e hiperreatividade das vias aereas',
          'SOMENTE usar formulacao SEM vasoconstritor (sem epinefrina) para uso IV',
          'Eficacia como pre-tratamento em RSI e debatida - evidencia moderada',
        ],
        adjustments: [
          {
            condition: 'Choque / hipotensao',
            modification:
              'Pode ser omitida. Lidocaina IV pode causar vasodilatacao e depressao miocardica adicional.',
          },
          {
            condition: 'Obeso (IMC > 30)',
            modification: 'Utilizar peso corporal ideal (IBW)',
          },
          {
            condition: 'Insuficiencia hepatica',
            modification:
              'Reduzir dose em 50% - metabolismo hepatico (CYP1A2 e CYP3A4)',
          },
          {
            condition: 'Insuficiencia cardiaca',
            modification:
              'Reduzir dose em 50% - reducao do fluxo hepatico diminui clearance',
          },
        ],
      },
    ],
    contraindications: [
      'Hipersensibilidade a lidocaina ou anestesicos locais do tipo amida',
      'Bloqueio AV de 2o ou 3o grau sem marca-passo',
      'Sindrome de Stokes-Adams',
      'Sindrome de Wolff-Parkinson-White (WPW)',
      'Bradicardia severa',
    ],
    seriousAdverseEffects: [
      'Toxicidade sistemica por anestesico local (LAST): zumbido, gosto metalico, parestesias periorais, convulsoes, arritmias',
      'Depressao miocardica (doses elevadas)',
      'Bradicardia',
      'Hipotensao',
      'Convulsoes (toxicidade do SNC)',
      'Metemoglobinemia (doses muito elevadas, raro)',
    ],
    yCompatibility: [
      { drugId: 'propofol', drugName: 'Propofol', status: 'compatible' },
      { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
      { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
      { drugId: 'rocuronio', drugName: 'Rocuronio', status: 'compatible' },
      { drugId: 'amiodarona', drugName: 'Amiodarona', status: 'compatible' },
      { drugId: 'anfotericina-b', drugName: 'Anfotericina B', status: 'incompatible' },
    ],
    pregnancyCategory: 'B',
    references: [
      {
        citation:
          'Walls RM, Hockberger RS, Gausche-Hill M. Rosens Emergency Medicine: Concepts and Clinical Practice. 10th ed. Elsevier.',
        year: 2023,
      },
      {
        citation:
          'Vaillancourt C, Bhatt DL. Effect of lidocaine on intracranial pressure and hemodynamics during intubation: a systematic review. CJEM.',
        year: 2014,
      },
      {
        citation:
          'Neal JM, Barrington MJ, Fettiplace MR, et al. The Third American Society of Regional Anesthesia and Pain Medicine Practice Advisory on Local Anesthetic Systemic Toxicity. Reg Anesth Pain Med.',
        year: 2018,
        guideline: 'ASRA LAST Practice Advisory',
      },
    ],
    keywords: [
      'lidocaina',
      'lidocaine',
      'xylocaina',
      'pre-tratamento',
      'RSI',
      'anestesico local',
      'HIC',
      'antiarritmico',
    ],
  },

  // 7. Succinilcolina
  {
    id: 'succinilcolina',
    genericName: 'Succinilcolina (Suxametonio)',
    tradeName: ['Quelicin', 'Anectine', 'Succitrat'],
    category: 'rsi',
    subcategory: 'bnm',
    atcCode: 'M03AB01',
    snomedCT: '372772003',
    rename: true,
    sus: true,
    presentations: [
      'Ampola 100 mg/2 mL (50 mg/mL) solucao injetavel',
      'Frasco-ampola 500 mg po liofilico para solucao injetavel',
    ],
    mechanismOfAction:
      'Bloqueador neuromuscular despolarizante que mimetiza a acetilcolina na juncao neuromuscular, causando despolarizacao sustentada da placa motora terminal. A fasciculacao inicial e seguida de paralisia flacida. Rapidamente hidrolisada pela pseudocolinesterase (butirilcolinesterase) plasmatica, conferindo duracao ultra-curta.',
    emergencyDosing: [
      {
        indication: 'Bloqueio neuromuscular para RSI',
        route: 'IV',
        doseRange: { min: 1, max: 1.5 },
        doseUnit: 'mg/kg',
        maxDose: '150 mg',
        bolus: 'Infundir rapidamente em bolus',
        onset: '30-60 segundos',
        peak: '1-2 minutos',
        duration: '6-10 minutos',
        notes: [
          'Inicio de acao mais rapido entre todos os BNM - ideal para cenario de emergencia pelo curto efeito',
          'Fasciculacoes musculares precedem o bloqueio',
          'Nao pode ser revertida farmacologicamente - aguardar metabolismo pela pseudocolinesterase',
          'Dose IM de resgate: 3-4 mg/kg (se acesso IV indisponivel)',
          'Armazenamento: refrigerado 2-8 graus C (estavel ate 14 dias em temperatura ambiente)',
        ],
        adjustments: [
          {
            condition: 'Obeso (IMC > 30)',
            modification:
              'Utilizar peso corporal TOTAL - succinilcolina tem volume de distribuicao proporcional ao peso total. Dose: 1 mg/kg de peso total.',
          },
          {
            condition: 'Choque / hipotensao',
            modification:
              'Dose padrao. Succinilcolina possui minimo efeito hemodinamico direto.',
          },
          {
            condition: 'TCE / hipertensao intracraniana (HIC)',
            modification:
              'Pode causar aumento transitorio da PIC pelas fasciculacoes - considerar rocuronio como alternativa ou pre-tratar com dose desfasciculante',
          },
          {
            condition: 'Deficiencia de pseudocolinesterase',
            modification:
              'Duracao extremamente prolongada (horas). Considerar rocuronio + sugamadex como alternativa.',
          },
        ],
      },
      {
        indication: 'Bloqueio neuromuscular - via IM (acesso IV indisponivel)',
        route: 'IM',
        doseRange: { min: 3, max: 4 },
        doseUnit: 'mg/kg',
        maxDose: '300 mg',
        onset: '2-4 minutos',
        peak: '4-5 minutos',
        duration: '10-20 minutos',
        notes: [
          'Reservado para laringoespasmo refratario sem acesso IV',
        ],
        adjustments: [],
      },
    ],
    contraindications: [
      'Hipercalemia conhecida (K+ > 5.5 mEq/L) - risco de parada cardiaca hipercalemica',
      'Queimaduras extensas > 24 horas e ate 1 ano pos-queimadura (upregulation de receptores extrasinapticos)',
      'Desnervacao / lesao medular > 48-72h (upregulation de receptores)',
      'Miopatias congenitas (Duchenne, Becker) - risco de rabdomiolise e hipercalemia fatal',
      'Historia pessoal ou familiar de hipertermia maligna',
      'Deficiencia conhecida de pseudocolinesterase (relativa - bloqueio prolongado)',
      'Imobilizacao prolongada > 48-72h (upregulation de receptores)',
      'Lesao por esmagamento > 48-72h',
      'Rabdomiolise ativa',
      'Doenca do neuronio motor (ELA, atrofia muscular espinhal)',
    ],
    seriousAdverseEffects: [
      'Hipercalemia (aumento de 0.5-1 mEq/L em pacientes normais; potencialmente letal em condicoes predisponentes)',
      'Hipertermia maligna (raro, mas fatal se nao tratada - dantrolene e antidoto)',
      'Bradicardia (especialmente com dose repetida ou em criancas - efeito muscarinico)',
      'Fasciculacoes musculares (com dor muscular pos-procedimento)',
      'Aumento da pressao intraocular (PIO)',
      'Aumento transitorio da pressao intragastrica',
      'Rabdomiolise (em miopatias)',
      'Bloqueio neuromuscular prolongado (em deficiencia de pseudocolinesterase)',
      'Anafilaxia (mais frequente que com BNM nao-despolarizantes)',
    ],
    yCompatibility: [
      { drugId: 'etomidato', drugName: 'Etomidato', status: 'compatible' },
      { drugId: 'propofol', drugName: 'Propofol', status: 'compatible' },
      { drugId: 'cetamina', drugName: 'Cetamina', status: 'compatible' },
      { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
      { drugId: 'tiopental', drugName: 'Tiopental', status: 'incompatible' },
      { drugId: 'bicarbonato-sodio', drugName: 'Bicarbonato de Sodio', status: 'incompatible' },
    ],
    pregnancyCategory: 'C',
    references: [
      {
        citation:
          'Brown CA III, Sakles JC, Mick NW. The Walls Manual of Emergency Airway Management. 6th ed. Wolters Kluwer.',
        year: 2023,
      },
      {
        citation:
          'Walls RM, Hockberger RS, Gausche-Hill M. Rosens Emergency Medicine: Concepts and Clinical Practice. 10th ed. Elsevier.',
        year: 2023,
      },
      {
        citation:
          'Martyn JAJ, Richtsfeld M. Succinylcholine-induced hyperkalemia in acquired pathologic states: etiologic factors and molecular mechanisms. Anesthesiology.',
        year: 2006,
      },
      {
        citation:
          'Rosenberg H, Pollock N, Schiemann A, et al. Malignant Hyperthermia: A Review. Orphanet J Rare Dis.',
        year: 2015,
      },
    ],
    keywords: [
      'succinilcolina',
      'suxametonio',
      'quelicin',
      'BNM',
      'despolarizante',
      'RSI',
      'bloqueio neuromuscular',
      'fasciculacao',
      'hipercalemia',
    ],
  },

  // 8. Rocuronio
  {
    id: 'rocuronio',
    genericName: 'Rocuronio',
    tradeName: ['Esmeron', 'Rocuron', 'Rocuronio Cristalia'],
    category: 'rsi',
    subcategory: 'bnm',
    atcCode: 'M03AC09',
    snomedCT: '108450002',
    rename: true,
    sus: true,
    presentations: [
      'Frasco-ampola 50 mg/5 mL (10 mg/mL) solucao injetavel',
      'Frasco-ampola 100 mg/10 mL (10 mg/mL) solucao injetavel',
    ],
    mechanismOfAction:
      'Bloqueador neuromuscular nao-despolarizante aminoesteroidal que antagoniza competitivamente a acetilcolina nos receptores niconinicos da juncao neuromuscular. Na dose de RSI (1-1.2 mg/kg), produz condicoes de intubacao em 60-90 segundos, aproximando-se do inicio de acao da succinilcolina. Metabolismo primariamente hepatico com excrecao biliar.',
    emergencyDosing: [
      {
        indication: 'Bloqueio neuromuscular para RSI (dose modificada)',
        route: 'IV',
        doseRange: { min: 1, max: 1.2 },
        doseUnit: 'mg/kg',
        maxDose: '120 mg',
        bolus: 'Infundir rapidamente em bolus',
        onset: '60-90 segundos',
        peak: '2-3 minutos',
        duration: '40-60 minutos',
        notes: [
          'Dose de RSI (1-1.2 mg/kg) e 2-3x maior que a dose de intubacao padrao (0.6 mg/kg)',
          'Alternativa preferencial quando succinilcolina e contraindicada',
          'Duracao de acao LONGA (40-60 min com dose de RSI) - deve-se ter plano de via aerea dificil',
          'Reversivel com sugamadex (16 mg/kg para reversao imediata pos-RSI)',
          'Armazenamento: refrigerado 2-8 graus C (estavel ate 60 dias a 25 graus C apos abertura)',
        ],
        adjustments: [
          {
            condition: 'Obeso (IMC > 30)',
            modification:
              'Utilizar peso corporal IDEAL (IBW). Rocuronio e hidrofilico - dose baseada no peso ideal para evitar sobredose e duracao excessiva.',
          },
          {
            condition: 'Choque / hipotensao',
            modification:
              'Dose padrao. Rocuronio possui perfil hemodinamico neutro. Considerar que inicio de acao pode ser mais rapido pela circulacao acelerada.',
          },
          {
            condition: 'TCE / hipertensao intracraniana (HIC)',
            modification:
              'Preferir rocuronio sobre succinilcolina - nao causa fasciculacoes nem aumento transitorio da PIC.',
          },
          {
            condition: 'Insuficiencia hepatica',
            modification:
              'Duracao de acao pode ser prolongada. Monitorar com TOF (train-of-four).',
          },
        ],
      },
      {
        indication: 'Bloqueio neuromuscular - intubacao padrao (nao RSI)',
        route: 'IV',
        doseRange: { min: 0.6, max: 0.6 },
        doseUnit: 'mg/kg',
        onset: '90-120 segundos',
        peak: '3-5 minutos',
        duration: '30-40 minutos',
        notes: [
          'Dose padrao de intubacao para procedimentos eletivos',
        ],
        adjustments: [],
      },
    ],
    contraindications: [
      'Hipersensibilidade ao rocuronio ou ao ion brometo',
      'Alergia conhecida a outros BNM aminoesteroidais (vecuronio, pancuronio) - reatividade cruzada possivel',
    ],
    seriousAdverseEffects: [
      'Bloqueio neuromuscular prolongado (especialmente em insuficiencia hepatica)',
      'Reacao anafilatica / anafilactoide (menos frequente que succinilcolina)',
      'Taquicardia (leve, pela acao vagolitica)',
      'Broncoespasmo (raro)',
      'Fraqueza muscular residual pos-operatoria (se reversao incompleta)',
      'Consciencia intraoperatoria (se dose insuficiente)',
    ],
    yCompatibility: [
      { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
      { drugId: 'propofol', drugName: 'Propofol', status: 'compatible' },
      { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
      { drugId: 'etomidato', drugName: 'Etomidato', status: 'compatible' },
      { drugId: 'cetamina', drugName: 'Cetamina', status: 'compatible' },
      { drugId: 'dexametasona', drugName: 'Dexametasona', status: 'incompatible' },
      { drugId: 'tiopental', drugName: 'Tiopental', status: 'incompatible' },
      { drugId: 'diazepam', drugName: 'Diazepam', status: 'incompatible' },
    ],
    pregnancyCategory: 'C',
    references: [
      {
        citation:
          'Tran DTT, Newton EK, Mount VAH, et al. Rocuronium versus succinylcholine for rapid sequence induction intubation. Cochrane Database Syst Rev.',
        year: 2015,
        guideline: 'Cochrane Systematic Review CD002788',
      },
      {
        citation:
          'Brown CA III, Sakles JC, Mick NW. The Walls Manual of Emergency Airway Management. 6th ed. Wolters Kluwer.',
        year: 2023,
      },
      {
        citation:
          'Walls RM, Hockberger RS, Gausche-Hill M. Rosens Emergency Medicine: Concepts and Clinical Practice. 10th ed. Elsevier.',
        year: 2023,
      },
    ],
    keywords: [
      'rocuronio',
      'esmeron',
      'BNM',
      'nao-despolarizante',
      'RSI',
      'bloqueio neuromuscular',
      'aminoesteroidal',
      'sugamadex',
    ],
  },

  // 9. Sugamadex
  {
    id: 'sugamadex',
    genericName: 'Sugamadex',
    tradeName: ['Bridion'],
    category: 'rsi',
    subcategory: 'reversor',
    atcCode: 'V03AB35',
    snomedCT: '442340006',
    rename: false,
    sus: false,
    presentations: [
      'Frasco-ampola 200 mg/2 mL (100 mg/mL) solucao injetavel',
      'Frasco-ampola 500 mg/5 mL (100 mg/mL) solucao injetavel',
    ],
    mechanismOfAction:
      'Ciclodextrina gama modificada que encapsula seletivamente moleculas de BNM aminoesteroidais (rocuronio > vecuronio >> pancuronio), formando um complexo hidrossoluvel inativo que e excretado por via renal. Reverte o bloqueio neuromuscular por mecanismo totalmente independente da inibicao da acetilcolinesterase, sendo eficaz em qualquer profundidade de bloqueio.',
    emergencyDosing: [
      {
        indication: 'Reversao emergencial imediata - cenario nao posso intubar, nao posso oxigenar',
        route: 'IV',
        doseRange: { min: 16, max: 16 },
        doseUnit: 'mg/kg',
        maxDose: '1600 mg',
        bolus: 'Infundir rapidamente em bolus em 10 segundos',
        onset: '1.5-3 minutos',
        peak: '3-5 minutos',
        duration: 'Irreversivel (complexo estavel)',
        notes: [
          'Dose de 16 mg/kg para reversao imediata apos administracao de rocuronio 1.2 mg/kg para RSI',
          'UNICA droga capaz de reverter completamente o bloqueio por rocuronio em cenario de emergencia',
          'Usar quando: via aerea falha apos RSI com rocuronio e ventilacao impossivel',
          'Complexo sugamadex-rocuronio e excretado por via renal sem metabolismo hepatico',
          'Apos reversao, aguardar 24h antes de re-administrar rocuronio ou vecuronio',
        ],
        adjustments: [
          {
            condition: 'Obeso (IMC > 30)',
            modification:
              'Utilizar peso corporal TOTAL - sugamadex precisa encapsular todo o rocuronio circulante, que foi dosado por peso total.',
          },
          {
            condition: 'Insuficiencia renal (TFG < 30 mL/min)',
            modification:
              'Nao recomendado em insuficiencia renal severa - complexo sugamadex-rocuronio depende de excrecao renal. Usar com cautela e monitorar TOF.',
          },
        ],
      },
      {
        indication: 'Reversao de rotina - bloqueio moderado (TOF count >= 2)',
        route: 'IV',
        doseRange: { min: 2, max: 2 },
        doseUnit: 'mg/kg',
        onset: '1.5-2.5 minutos',
        peak: '3 minutos',
        duration: 'Irreversivel (complexo estavel)',
        notes: [
          'Para bloqueio moderado com resposta de TOF count >= 2',
        ],
        adjustments: [],
      },
      {
        indication: 'Reversao de rotina - bloqueio profundo (PTC 1-2, sem resposta ao TOF)',
        route: 'IV',
        doseRange: { min: 4, max: 4 },
        doseUnit: 'mg/kg',
        onset: '2-3 minutos',
        peak: '5 minutos',
        duration: 'Irreversivel (complexo estavel)',
        notes: [
          'Para bloqueio profundo (PTC 1-2, sem resposta ao TOF)',
          'Sempre confirmar reversao com monitorizacao neuromuscular (TOF ratio >= 0.9)',
        ],
        adjustments: [],
      },
    ],
    contraindications: [
      'Hipersensibilidade ao sugamadex',
      'Insuficiencia renal grave (TFG < 30 mL/min) - relativa, dados limitados sobre seguranca',
    ],
    seriousAdverseEffects: [
      'Bradicardia severa (incluindo parada cardiaca em casos raros - observar por 10-15 min pos-administracao)',
      'Reacao anafilatica / anafilactoide (raro)',
      'Broncoespasmo (raro)',
      'Disturbio da coagulacao transitorio (prolonga aPTT e PT/INR por ate 1 hora)',
      'Nausea',
      'Recorrencia do bloqueio neuromuscular (rebound) - raro com dose adequada',
      'Reducao da eficacia de contraceptivos hormonais (equivalente a esquecimento de 1 dose)',
    ],
    yCompatibility: [
      { drugId: 'rocuronio', drugName: 'Rocuronio', status: 'compatible' },
      { drugId: 'propofol', drugName: 'Propofol', status: 'compatible' },
      { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
      { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
      { drugId: 'ondansetrona', drugName: 'Ondansetrona', status: 'compatible' },
      { drugId: 'verapamil', drugName: 'Verapamil', status: 'unknown' },
    ],
    pregnancyCategory: 'N',
    references: [
      {
        citation:
          'Hristovska AM, Duch P, Allingstrup M, Afshari A. Efficacy and safety of sugammadex versus neostigmine in reversing neuromuscular blockade in adults. Cochrane Database Syst Rev.',
        year: 2017,
        guideline: 'Cochrane Systematic Review CD012763',
      },
      {
        citation:
          'Merck Sharp and Dohme. Bridion (sugammadex) Prescribing Information. U.S. Food and Drug Administration.',
        year: 2015,
        guideline: 'FDA Label',
      },
      {
        citation:
          'Partownavid P, Romito BT, Engel AJ. Sugammadex and Bradycardia: A Narrative Review. Cureus.',
        year: 2022,
      },
      {
        citation:
          'Walls RM, Hockberger RS, Gausche-Hill M. Rosens Emergency Medicine: Concepts and Clinical Practice. 10th ed. Elsevier.',
        year: 2023,
      },
    ],
    keywords: [
      'sugamadex',
      'sugammadex',
      'bridion',
      'reversor',
      'RSI',
      'ciclodextrina',
      'rocuronio',
      'bloqueio neuromuscular',
      'reversao',
    ],
  },
];
