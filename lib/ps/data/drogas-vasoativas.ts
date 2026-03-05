import { EmergencyDrug } from '../types';

const noradrenalina: EmergencyDrug = {
  id: 'noradrenalina',
  genericName: 'Noradrenalina (Norepinefrina)',
  tradeName: ['Hyponor', 'Levophed', 'Norepine'],
  category: 'vasoativa',
  atcCode: 'C01CA03',
  snomedCT: '45555007',
  rename: true,
  sus: true,
  presentations: [
    'Ampola 4 mg/4 mL (1 mg/mL) — bitartarato de norepinefrina',
    'Ampola 8 mg/4 mL (2 mg/mL) — bitartarato de norepinefrina',
  ],
  mechanismOfAction:
    'Agonista alfa-1 adrenergico potente com atividade beta-1 moderada; promove vasoconstricao periferica intensa com aumento da resistencia vascular sistemica e elevacao da pressao arterial, alem de discreto efeito inotropico positivo.',
  emergencyDosing: [
    {
      indication: 'Choque septico — vasopressor de primeira linha',
      route: 'IV BIC',
      doseRange: { min: 0.01, max: 3 },
      doseUnit: 'mcg/kg',
      maxDose: 'Sem limite absoluto; titular conforme PAM alvo >= 65 mmHg',
      infusion: {
        dilution: {
          description:
            'Diluicao padrao: 4 ampolas (16 mg) em 234 mL de SG 5%, totalizando 250 mL com concentracao de 64 mcg/mL',
          solute: 'Noradrenalina 4 mg/4 mL',
          soluteVolume: '4 ampolas (16 mL)',
          diluent: 'SG 5%',
          diluentVolume: '234 mL',
          finalVolume: 250,
          finalConcentration: 64,
          concentrationUnit: 'mcg/mL',
          stability: '24 horas em temperatura ambiente, proteger da luz',
          photoprotection: true,
        },
        rateRange: { min: 0.01, max: 3 },
        rateUnit: 'mcg/kg/min',
        steps: [
          { dosePerKgMin: 0.05, unit: 'mcg/kg/min' },
          { dosePerKgMin: 0.1, unit: 'mcg/kg/min' },
          { dosePerKgMin: 0.2, unit: 'mcg/kg/min' },
          { dosePerKgMin: 0.5, unit: 'mcg/kg/min' },
          { dosePerKgMin: 1.0, unit: 'mcg/kg/min' },
          { dosePerKgMin: 2.0, unit: 'mcg/kg/min' },
          { dosePerKgMin: 3.0, unit: 'mcg/kg/min' },
        ],
      },
      onset: '1-2 minutos',
      duration: '1-2 minutos apos suspensao',
      notes: [
        'Vasopressor de primeira escolha no choque septico (SSC 2021)',
        'Administrar preferencialmente por acesso venoso central',
        'Acesso periferico calibroso pode ser usado temporariamente enquanto se obtem CVC',
        'Titular para PAM alvo >= 65 mmHg',
      ],
    },
  ],
  contraindications: [
    'Uso como unico agente em choque hipovolemico nao ressuscitado',
    'Trombose vascular mesenterica ou periferica (risco de agravamento)',
    'Hipersensibilidade ao bissulfito de sodio (contido em algumas formulacoes)',
  ],
  seriousAdverseEffects: [
    'Isquemia de extremidades e necrose tecidual por extravasamento',
    'Arritmias cardiacas (taquiarritmias ventriculares)',
    'Isquemia miocardica',
    'Isquemia mesenterica',
    'Hipertensao grave',
    'Bradicardia reflexa',
  ],
  yCompatibility: [
    { drugId: 'dobutamina', drugName: 'Dobutamina', status: 'compatible' },
    { drugId: 'vasopressina', drugName: 'Vasopressina', status: 'compatible' },
    { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
    { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
    { drugId: 'insulina-regular', drugName: 'Insulina Regular', status: 'compatible' },
    { drugId: 'heparina', drugName: 'Heparina', status: 'compatible' },
    { drugId: 'furosemida', drugName: 'Furosemida', status: 'incompatible' },
    { drugId: 'bicarbonato-sodio', drugName: 'Bicarbonato de Sodio', status: 'incompatible' },
  ],
  pregnancyCategory: 'C',
  references: [
    {
      citation:
        'Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.',
      year: 2021,
      guideline: 'SSC 2021',
    },
    {
      citation:
        'Scheeren TWL, Bakker J, De Backer D, et al. Current use of vasopressors in septic shock. Ann Intensive Care. 2019;9(1):20.',
      year: 2019,
    },
    {
      citation:
        'Anvisa. Bulario Eletronico — Norepinefrina. Agencia Nacional de Vigilancia Sanitaria.',
      year: 2023,
    },
  ],
  keywords: [
    'noradrenalina',
    'norepinefrina',
    'vasopressor',
    'choque septico',
    'alfa-1 agonista',
    'sepse',
    'PAM',
    'vasoativa',
    'droga vasoativa',
  ],
};

const adrenalinaInfusao: EmergencyDrug = {
  id: 'adrenalina-infusao',
  genericName: 'Adrenalina (Epinefrina) — infusao continua',
  tradeName: ['Adrenalina', 'Drenalin'],
  category: 'vasoativa',
  atcCode: 'C01CA24',
  snomedCT: '387362001',
  rename: true,
  sus: true,
  presentations: [
    'Ampola 1 mg/1 mL (1:1.000) — solucao injetavel',
  ],
  mechanismOfAction:
    'Agonista alfa e beta adrenergico nao seletivo; em doses baixas predomina efeito beta-1 (inotropico e cronotropico positivo) e beta-2 (vasodilatacao e broncodilatacao); em doses altas predomina efeito alfa-1 (vasoconstricao) com aumento da RVS.',
  emergencyDosing: [
    {
      indication:
        'Choque septico refratario a noradrenalina — vasopressor adjuvante (SSC 2021)',
      route: 'IV BIC',
      doseRange: { min: 0.01, max: 0.5 },
      doseUnit: 'mcg/kg',
      maxDose: 'Titular conforme resposta hemodinamica',
      infusion: {
        dilution: {
          description:
            'Diluicao padrao: 6 ampolas (6 mg) em 94 mL de SF 0,9%, totalizando 100 mL com concentracao de 60 mcg/mL',
          solute: 'Adrenalina 1 mg/1 mL',
          soluteVolume: '6 ampolas (6 mL)',
          diluent: 'SF 0,9%',
          diluentVolume: '94 mL',
          finalVolume: 100,
          finalConcentration: 60,
          concentrationUnit: 'mcg/mL',
          stability: '24 horas em temperatura ambiente, proteger da luz',
          photoprotection: true,
        },
        rateRange: { min: 0.01, max: 0.5 },
        rateUnit: 'mcg/kg/min',
        steps: [
          { dosePerKgMin: 0.01, unit: 'mcg/kg/min' },
          { dosePerKgMin: 0.05, unit: 'mcg/kg/min' },
          { dosePerKgMin: 0.1, unit: 'mcg/kg/min' },
          { dosePerKgMin: 0.2, unit: 'mcg/kg/min' },
          { dosePerKgMin: 0.3, unit: 'mcg/kg/min' },
          { dosePerKgMin: 0.5, unit: 'mcg/kg/min' },
        ],
      },
      onset: 'Imediato (IV)',
      duration: '1-3 minutos apos suspensao',
      notes: [
        'No choque septico, considerar como segundo vasopressor quando noradrenalina e insuficiente (SSC 2021)',
        'Doses <= 0,1 mcg/kg/min: predomina efeito beta (inotropico)',
        'Doses > 0,1 mcg/kg/min: somam-se efeitos alfa (vasopressor)',
        'Monitorar glicemia capilar (causa hiperglicemia)',
        'Pode causar acidose latica transitoria',
      ],
    },
  ],
  contraindications: [
    'Taquiarritmias nao controladas',
    'Feocromocitoma',
    'Cardiomiopatia obstrutiva hipertrofica',
    'Insuficiencia coronariana grave (relativa — avaliar risco/beneficio)',
  ],
  seriousAdverseEffects: [
    'Taquiarritmias ventriculares e supraventriculares',
    'Isquemia miocardica',
    'Hipertensao grave',
    'Isquemia mesenterica e de extremidades',
    'Hiperglicemia',
    'Acidose latica',
    'Hipocalemia',
  ],
  yCompatibility: [
    { drugId: 'noradrenalina', drugName: 'Noradrenalina', status: 'compatible' },
    { drugId: 'dobutamina', drugName: 'Dobutamina', status: 'compatible' },
    { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
    { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
    { drugId: 'heparina', drugName: 'Heparina', status: 'compatible' },
    { drugId: 'amiodarona', drugName: 'Amiodarona', status: 'compatible' },
    { drugId: 'bicarbonato-sodio', drugName: 'Bicarbonato de Sodio', status: 'incompatible' },
    { drugId: 'tiopental', drugName: 'Tiopental', status: 'incompatible' },
  ],
  pregnancyCategory: 'C',
  references: [
    {
      citation:
        'Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.',
      year: 2021,
      guideline: 'SSC 2021',
    },
    {
      citation:
        'Panchal AR, Bartos JA, Cabanas JG, et al. Part 3: Adult Basic and Advanced Life Support: 2020 AHA Guidelines for CPR and ECC. Circulation. 2020;142(16_suppl_2):S366-S468.',
      year: 2020,
      guideline: 'AHA ACLS 2020',
    },
    {
      citation:
        'Anvisa. Bulario Eletronico — Epinefrina. Agencia Nacional de Vigilancia Sanitaria.',
      year: 2023,
    },
  ],
  keywords: [
    'adrenalina',
    'epinefrina',
    'vasopressor',
    'inotropico',
    'choque',
    'infusao continua',
    'catecolamina',
    'vasoativa',
  ],
};

const dopamina: EmergencyDrug = {
  id: 'dopamina',
  genericName: 'Dopamina',
  tradeName: ['Revivan', 'Dopacris', 'Dopamina Teuto'],
  category: 'vasoativa',
  atcCode: 'C01CA04',
  snomedCT: '59187003',
  rename: true,
  sus: true,
  presentations: [
    'Ampola 50 mg/10 mL (5 mg/mL) — cloridrato de dopamina',
    'Ampola 200 mg/5 mL (40 mg/mL) — cloridrato de dopamina (concentrada)',
  ],
  mechanismOfAction:
    'Catecolamina endogena com acoes dose-dependentes: em baixas doses (1-5 mcg/kg/min) estimula receptores dopaminergicos D1 (vasodilatacao renal e mesenterica); em doses intermediarias (5-10 mcg/kg/min) estimula receptores beta-1 (inotropico e cronotropico positivo); em altas doses (>10 mcg/kg/min) predomina estimulo alfa-1 (vasoconstricao).',
  emergencyDosing: [
    {
      indication:
        'Choque septico como alternativa a noradrenalina em pacientes com baixo risco de taquiarritmia e bradicardia relativa (SSC 2021)',
      route: 'IV BIC',
      doseRange: { min: 2, max: 20 },
      doseUnit: 'mcg/kg',
      maxDose: '20 mcg/kg/min (doses superiores nao demonstram beneficio adicional)',
      infusion: {
        dilution: {
          description:
            'Diluicao padrao: 5 ampolas de 50 mg (250 mg total) em 200 mL de SG 5%, totalizando 250 mL com concentracao de 1.000 mcg/mL',
          solute: 'Dopamina 50 mg/10 mL',
          soluteVolume: '5 ampolas (50 mL)',
          diluent: 'SG 5%',
          diluentVolume: '200 mL',
          finalVolume: 250,
          finalConcentration: 1000,
          concentrationUnit: 'mcg/mL',
          stability: '24 horas em temperatura ambiente',
        },
        rateRange: { min: 2, max: 20 },
        rateUnit: 'mcg/kg/min',
        steps: [
          { dosePerKgMin: 2, unit: 'mcg/kg/min' },
          { dosePerKgMin: 5, unit: 'mcg/kg/min' },
          { dosePerKgMin: 7.5, unit: 'mcg/kg/min' },
          { dosePerKgMin: 10, unit: 'mcg/kg/min' },
          { dosePerKgMin: 15, unit: 'mcg/kg/min' },
          { dosePerKgMin: 20, unit: 'mcg/kg/min' },
        ],
      },
      onset: '2-5 minutos',
      duration: '< 10 minutos apos suspensao',
      notes: [
        'SSC 2021: noradrenalina e preferivel a dopamina na maioria dos pacientes com choque septico',
        'Considerar dopamina apenas em pacientes com bradicardia relativa e baixo risco de arritmia',
        'Dose "renal" (1-3 mcg/kg/min) nao tem beneficio comprovado em protecao renal',
        'Maior incidencia de arritmias comparada a noradrenalina',
      ],
    },
  ],
  contraindications: [
    'Feocromocitoma',
    'Taquiarritmias nao controladas',
    'Fibrilacao ventricular',
    'Hipersensibilidade a sulfitos (presentes em algumas formulacoes)',
  ],
  seriousAdverseEffects: [
    'Taquiarritmias (maior incidencia que noradrenalina)',
    'Isquemia miocardica',
    'Necrose tecidual por extravasamento',
    'Isquemia de extremidades em doses altas',
    'Nauseas e vomitos',
    'Hipertensao',
  ],
  yCompatibility: [
    { drugId: 'noradrenalina', drugName: 'Noradrenalina', status: 'compatible' },
    { drugId: 'dobutamina', drugName: 'Dobutamina', status: 'compatible' },
    { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
    { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
    { drugId: 'heparina', drugName: 'Heparina', status: 'compatible' },
    { drugId: 'bicarbonato-sodio', drugName: 'Bicarbonato de Sodio', status: 'incompatible' },
    { drugId: 'furosemida', drugName: 'Furosemida', status: 'incompatible' },
    { drugId: 'insulina-regular', drugName: 'Insulina Regular', status: 'incompatible' },
  ],
  pregnancyCategory: 'C',
  references: [
    {
      citation:
        'Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.',
      year: 2021,
      guideline: 'SSC 2021',
    },
    {
      citation:
        'De Backer D, Biston P, Devriendt J, et al. Comparison of dopamine and norepinephrine in the treatment of shock. N Engl J Med. 2010;362(9):779-789.',
      year: 2010,
    },
    {
      citation:
        'Anvisa. Bulario Eletronico — Dopamina. Agencia Nacional de Vigilancia Sanitaria.',
      year: 2023,
    },
  ],
  keywords: [
    'dopamina',
    'vasopressor',
    'inotropico',
    'choque',
    'catecolamina',
    'dose-dependente',
    'revivan',
    'vasoativa',
  ],
};

const dobutamina: EmergencyDrug = {
  id: 'dobutamina',
  genericName: 'Dobutamina',
  tradeName: ['Dobutrex', 'Dobtan', 'Dobutamina Teuto'],
  category: 'vasoativa',
  atcCode: 'C01CA07',
  snomedCT: '387145002',
  rename: true,
  sus: true,
  presentations: [
    'Ampola 250 mg/20 mL (12,5 mg/mL) — cloridrato de dobutamina',
  ],
  mechanismOfAction:
    'Agonista beta-1 adrenergico seletivo com efeito inotropico positivo potente; aumenta o debito cardiaco pela melhora da contratilidade miocardica e reducao discreta da pos-carga (leve acao beta-2). Nao possui efeito significativo sobre receptores alfa em doses terapeuticas.',
  emergencyDosing: [
    {
      indication:
        'Disfuncao miocardica / baixo debito cardiaco no choque septico (SSC 2021); insuficiencia cardiaca descompensada aguda',
      route: 'IV BIC',
      doseRange: { min: 2.5, max: 20 },
      doseUnit: 'mcg/kg',
      maxDose: '20 mcg/kg/min (doses superiores aumentam risco de taquiarritmia sem beneficio proporcional)',
      infusion: {
        dilution: {
          description:
            'Diluicao padrao: 1 ampola (250 mg) em 230 mL de SF 0,9%, totalizando 250 mL com concentracao de 1.000 mcg/mL',
          solute: 'Dobutamina 250 mg/20 mL',
          soluteVolume: '1 ampola (20 mL)',
          diluent: 'SF 0,9%',
          diluentVolume: '230 mL',
          finalVolume: 250,
          finalConcentration: 1000,
          concentrationUnit: 'mcg/mL',
          stability: '24 horas em temperatura ambiente. Solucao pode adquirir coloracao rosea sem perda de potencia.',
        },
        rateRange: { min: 2.5, max: 20 },
        rateUnit: 'mcg/kg/min',
        steps: [
          { dosePerKgMin: 2.5, unit: 'mcg/kg/min' },
          { dosePerKgMin: 5, unit: 'mcg/kg/min' },
          { dosePerKgMin: 7.5, unit: 'mcg/kg/min' },
          { dosePerKgMin: 10, unit: 'mcg/kg/min' },
          { dosePerKgMin: 15, unit: 'mcg/kg/min' },
          { dosePerKgMin: 20, unit: 'mcg/kg/min' },
        ],
      },
      onset: '1-2 minutos; pico em 10 minutos',
      duration: '2-5 minutos apos suspensao',
      notes: [
        'SSC 2021: sugerida em pacientes com disfuncao miocardica (hipoperfusao persistente apesar de ressuscitacao volemica e vasopressores)',
        'Associar a vasopressor (noradrenalina) caso PAM < 65 mmHg',
        'Monitorar com ecocardiograma funcional ou cateter de arteria pulmonar se disponivel',
        'Nao usar em cardiomiopatia obstrutiva hipertrofica',
      ],
    },
  ],
  contraindications: [
    'Cardiomiopatia hipertrofica obstrutiva',
    'Estenose subaortica hipertrofica idiopatica',
    'Hipersensibilidade a dobutamina ou sulfitos',
    'Tamponamento cardiaco',
  ],
  seriousAdverseEffects: [
    'Taquicardia sinusal e taquiarritmias',
    'Hipotensao (por vasodilatacao periferica, especialmente sem vasopressor)',
    'Isquemia miocardica (aumento do consumo de O2)',
    'Ectopia ventricular',
    'Cefaleia',
    'Hipertensao transitoria',
  ],
  yCompatibility: [
    { drugId: 'noradrenalina', drugName: 'Noradrenalina', status: 'compatible' },
    { drugId: 'adrenalina-infusao', drugName: 'Adrenalina', status: 'compatible' },
    { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
    { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
    { drugId: 'heparina', drugName: 'Heparina', status: 'incompatible' },
    { drugId: 'furosemida', drugName: 'Furosemida', status: 'incompatible' },
    { drugId: 'bicarbonato-sodio', drugName: 'Bicarbonato de Sodio', status: 'incompatible' },
    { drugId: 'insulina-regular', drugName: 'Insulina Regular', status: 'compatible' },
  ],
  pregnancyCategory: 'B',
  references: [
    {
      citation:
        'Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.',
      year: 2021,
      guideline: 'SSC 2021',
    },
    {
      citation:
        'Hollenberg SM. Vasoactive Drugs in Circulatory Shock. Am J Respir Crit Care Med. 2011;183(7):847-855.',
      year: 2011,
    },
    {
      citation:
        'Anvisa. Bulario Eletronico — Dobutamina. Agencia Nacional de Vigilancia Sanitaria.',
      year: 2023,
    },
  ],
  keywords: [
    'dobutamina',
    'inotropico',
    'beta-1',
    'debito cardiaco',
    'insuficiencia cardiaca',
    'choque cardiogenico',
    'dobutrex',
    'vasoativa',
  ],
};

const vasopressina: EmergencyDrug = {
  id: 'vasopressina',
  genericName: 'Vasopressina (Arginina Vasopressina — AVP)',
  tradeName: ['Encrise', 'Pitressin'],
  category: 'vasoativa',
  atcCode: 'H01BA01',
  snomedCT: '77671006',
  rename: true,
  sus: false,
  presentations: [
    'Ampola 20 UI/1 mL — solucao injetavel',
  ],
  mechanismOfAction:
    'Hormonio antidiuretico sintetico que age nos receptores V1 vasculares promovendo vasoconstricao independente de catecolaminas; nos receptores V2 renais aumenta reabsorcao de agua. No choque septico, atua sinergicamente com noradrenalina permitindo reducao da dose de catecolaminas.',
  emergencyDosing: [
    {
      indication:
        'Choque septico refratario — vasopressor adjuvante a noradrenalina para atingir PAM alvo ou reduzir dose de noradrenalina (SSC 2021)',
      route: 'IV BIC',
      doseRange: { min: 0.01, max: 0.04 },
      doseUnit: 'mcg/kg',
      maxDose: '0,04 U/min (dose fixa, nao titular acima)',
      infusion: {
        dilution: {
          description:
            'Diluicao padrao: 1 ampola (20 UI) em 99 mL de SF 0,9%, totalizando 100 mL com concentracao de 0,2 UI/mL',
          solute: 'Vasopressina 20 UI/1 mL',
          soluteVolume: '1 ampola (1 mL)',
          diluent: 'SF 0,9%',
          diluentVolume: '99 mL',
          finalVolume: 100,
          finalConcentration: 0.2,
          concentrationUnit: 'UI/mL',
          stability: '24 horas em temperatura ambiente',
        },
        rateRange: { min: 0.01, max: 0.04 },
        rateUnit: 'U/min',
        steps: [
          { dosePerKgMin: 0.01, unit: 'U/min' },
          { dosePerKgMin: 0.02, unit: 'U/min' },
          { dosePerKgMin: 0.025, unit: 'U/min' },
          { dosePerKgMin: 0.03, unit: 'U/min' },
          { dosePerKgMin: 0.04, unit: 'U/min' },
        ],
      },
      onset: 'Imediato (IV)',
      duration: '10-20 minutos apos suspensao',
      notes: [
        'SSC 2021: adicionar vasopressina (ate 0,03 U/min) a noradrenalina com intencao de elevar PAM ao alvo OU reduzir dose de noradrenalina',
        'Dose fixa, sem escalonamento baseado em peso corporal',
        'Nao deve ser utilizada como vasopressor de primeira linha isoladamente',
        'Reduzir doses de catecolaminas gradualmente ao introduzir vasopressina',
        'Suspender gradualmente (desmame lento) para evitar hipotensao rebote',
      ],
    },
  ],
  contraindications: [
    'Hipersensibilidade a vasopressina ou componentes',
    'Doenca arterial coronariana grave (relativa — risco de isquemia)',
    'Insuficiencia cardiaca cronica grave (pode piorar pos-carga)',
  ],
  seriousAdverseEffects: [
    'Isquemia miocardica',
    'Isquemia mesenterica',
    'Isquemia digital e de extremidades',
    'Hiponatremia (efeito antidiuretico)',
    'Bradicardia',
    'Arritmias',
    'Trombocitopenia',
  ],
  yCompatibility: [
    { drugId: 'noradrenalina', drugName: 'Noradrenalina', status: 'compatible' },
    { drugId: 'dobutamina', drugName: 'Dobutamina', status: 'compatible' },
    { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
    { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
    { drugId: 'insulina-regular', drugName: 'Insulina Regular', status: 'compatible' },
    { drugId: 'furosemida', drugName: 'Furosemida', status: 'incompatible' },
  ],
  pregnancyCategory: 'C',
  references: [
    {
      citation:
        'Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.',
      year: 2021,
      guideline: 'SSC 2021',
    },
    {
      citation:
        'Gordon AC, Mason AJ, Thirunavukkarasu N, et al. Effect of Early Vasopressin vs Norepinephrine on Kidney Failure in Patients With Septic Shock: The VANISH Randomized Clinical Trial. JAMA. 2016;316(5):509-518.',
      year: 2016,
    },
    {
      citation:
        'Russell JA, Walley KR, Singer J, et al. Vasopressin versus norepinephrine infusion in patients with septic shock. N Engl J Med. 2008;358(9):877-887.',
      year: 2008,
    },
  ],
  keywords: [
    'vasopressina',
    'ADH',
    'hormonio antidiuretico',
    'vasopressor',
    'choque septico',
    'V1',
    'adjuvante',
    'nao catecolamina',
    'vasoativa',
  ],
};

const milrinona: EmergencyDrug = {
  id: 'milrinona',
  genericName: 'Milrinona',
  tradeName: ['Primacor', 'Corotrop', 'Milrinona Eurofarma'],
  category: 'vasoativa',
  atcCode: 'C01CE02',
  snomedCT: '372785007',
  rename: true,
  sus: true,
  presentations: [
    'Ampola 20 mg/20 mL (1 mg/mL) — lactato de milrinona',
  ],
  mechanismOfAction:
    'Inibidor seletivo da fosfodiesterase III (PDE-III); aumenta o AMPc intracelular no miocardio e no musculo liso vascular, resultando em efeito inotropico positivo e vasodilatacao arterial e venosa (inodilatador). Reduz pre-carga e pos-carga com aumento do debito cardiaco.',
  emergencyDosing: [
    {
      indication:
        'Insuficiencia cardiaca descompensada aguda com baixo debito; choque cardiogenico refratario a dobutamina; hipertensao pulmonar aguda',
      route: 'IV BIC',
      doseRange: { min: 0.375, max: 0.75 },
      doseUnit: 'mcg/kg',
      bolus: '50 mcg/kg IV em 10 minutos (opcional; omitir se hipotensao)',
      infusion: {
        dilution: {
          description:
            'Diluicao padrao: 1 ampola (20 mg) em 80 mL de SF 0,9%, totalizando 100 mL com concentracao de 200 mcg/mL',
          solute: 'Milrinona 20 mg/20 mL',
          soluteVolume: '1 ampola (20 mL)',
          diluent: 'SF 0,9%',
          diluentVolume: '80 mL',
          finalVolume: 100,
          finalConcentration: 200,
          concentrationUnit: 'mcg/mL',
          stability: '24 horas em temperatura ambiente',
        },
        rateRange: { min: 0.375, max: 0.75 },
        rateUnit: 'mcg/kg/min',
        steps: [
          { dosePerKgMin: 0.375, unit: 'mcg/kg/min' },
          { dosePerKgMin: 0.4, unit: 'mcg/kg/min' },
          { dosePerKgMin: 0.5, unit: 'mcg/kg/min' },
          { dosePerKgMin: 0.6, unit: 'mcg/kg/min' },
          { dosePerKgMin: 0.7, unit: 'mcg/kg/min' },
          { dosePerKgMin: 0.75, unit: 'mcg/kg/min' },
        ],
      },
      onset: '5-15 minutos',
      peak: '1-2 horas',
      duration: '3-6 horas (meia-vida prolongada)',
      notes: [
        'Inodilatador: diferente das catecolaminas, nao aumenta consumo de O2 miocardico de forma significativa',
        'Omitir dose de ataque (bolus) em pacientes hipotensos',
        'Ajustar dose em insuficiencia renal (meia-vida prolonga significativamente)',
        'Pode causar hipotensao importante — associar vasopressor se necessario',
        'Meia-vida de eliminacao: ~2,3 h (normal) — ate 10-12 h em IRA grave',
      ],
    },
  ],
  contraindications: [
    'Estenose aortica ou subaortica grave',
    'Cardiomiopatia hipertrofica obstrutiva',
    'Hipotensao grave sem vasopressor associado',
    'Hipersensibilidade a milrinona',
  ],
  seriousAdverseEffects: [
    'Hipotensao (principal efeito limitante)',
    'Arritmias ventriculares (taquicardia ventricular, fibrilacao ventricular)',
    'Arritmias supraventriculares',
    'Trombocitopenia',
    'Cefaleia',
    'Tremor',
  ],
  renalAdjustment: [
    { gfr: '> 50 mL/min', adjustment: 'Sem ajuste' },
    { gfr: '31-50 mL/min', adjustment: 'Reduzir para 0,43 mcg/kg/min' },
    { gfr: '21-30 mL/min', adjustment: 'Reduzir para 0,38 mcg/kg/min' },
    { gfr: '11-20 mL/min', adjustment: 'Reduzir para 0,33 mcg/kg/min' },
    { gfr: '<= 10 mL/min', adjustment: 'Reduzir para 0,23 mcg/kg/min' },
  ],
  yCompatibility: [
    { drugId: 'noradrenalina', drugName: 'Noradrenalina', status: 'compatible' },
    { drugId: 'dobutamina', drugName: 'Dobutamina', status: 'compatible' },
    { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
    { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
    { drugId: 'heparina', drugName: 'Heparina', status: 'compatible' },
    { drugId: 'furosemida', drugName: 'Furosemida', status: 'incompatible' },
    { drugId: 'bicarbonato-sodio', drugName: 'Bicarbonato de Sodio', status: 'incompatible' },
  ],
  pregnancyCategory: 'C',
  references: [
    {
      citation:
        'Mebazaa A, Nieminen MS, Packer M, et al. Levosimendan vs Dobutamine for Patients With Acute Decompensated Heart Failure: The SURVIVE Randomized Trial. JAMA. 2007;297(17):1883-1891.',
      year: 2007,
    },
    {
      citation:
        'Packer M, Carver JR, Rodeheffer RJ, et al. Effect of oral milrinone on mortality in severe chronic heart failure. N Engl J Med. 1991;325(21):1468-1475.',
      year: 1991,
    },
    {
      citation:
        'Anvisa. Bulario Eletronico — Milrinona. Agencia Nacional de Vigilancia Sanitaria.',
      year: 2023,
    },
  ],
  keywords: [
    'milrinona',
    'inodilatador',
    'inibidor PDE-III',
    'insuficiencia cardiaca',
    'baixo debito',
    'primacor',
    'fosfodiesterase',
    'vasoativa',
  ],
};

const nitroglicerina: EmergencyDrug = {
  id: 'nitroglicerina',
  genericName: 'Nitroglicerina (Trinitrato de Glicerila)',
  tradeName: ['Tridil', 'Nitrostat', 'Nitradisc'],
  category: 'vasoativa',
  atcCode: 'C01DA02',
  snomedCT: '387404004',
  rename: true,
  sus: true,
  presentations: [
    'Ampola 25 mg/5 mL (5 mg/mL) — solucao injetavel',
    'Ampola 50 mg/10 mL (5 mg/mL) — solucao injetavel',
  ],
  mechanismOfAction:
    'Doador de oxido nitrico (NO) que ativa a guanilato ciclase, elevando GMPc no musculo liso vascular; predomina vasodilatacao venosa em doses baixas (reducao de pre-carga) e vasodilatacao arterial em doses mais altas (reducao de pos-carga). Promove dilatacao coronariana direta.',
  emergencyDosing: [
    {
      indication:
        'Sindrome coronariana aguda (SCA), edema agudo de pulmao cardiogenico, emergencia hipertensiva com isquemia miocardica',
      route: 'IV BIC',
      doseRange: { min: 5, max: 200 },
      doseUnit: 'mcg/kg',
      maxDose: '200 mcg/min (titular ate alivio de sintomas ou queda de PAS de 10-15%)',
      infusion: {
        dilution: {
          description:
            'Diluicao padrao: 1 ampola (50 mg) em 240 mL de SG 5%, totalizando 250 mL com concentracao de 200 mcg/mL. Usar equipo de polietileno ou vidro (PVC adsorve nitroglicerina).',
          solute: 'Nitroglicerina 50 mg/10 mL',
          soluteVolume: '1 ampola (10 mL)',
          diluent: 'SG 5%',
          diluentVolume: '240 mL',
          finalVolume: 250,
          finalConcentration: 200,
          concentrationUnit: 'mcg/mL',
          stability: '24 horas em temperatura ambiente. Usar equipo sem PVC.',
        },
        rateRange: { min: 5, max: 200 },
        rateUnit: 'mcg/min',
        steps: [
          { dosePerKgMin: 5, unit: 'mcg/min' },
          { dosePerKgMin: 10, unit: 'mcg/min' },
          { dosePerKgMin: 20, unit: 'mcg/min' },
          { dosePerKgMin: 50, unit: 'mcg/min' },
          { dosePerKgMin: 100, unit: 'mcg/min' },
          { dosePerKgMin: 150, unit: 'mcg/min' },
          { dosePerKgMin: 200, unit: 'mcg/min' },
        ],
      },
      onset: '1-2 minutos (IV)',
      duration: '3-5 minutos apos suspensao',
      notes: [
        'Iniciar com 5 mcg/min, titular a cada 3-5 min com incrementos de 5-10 mcg/min',
        'Na SCA: objetivo e alivio da dor anginosa e reducao da PAS em 10-15%',
        'Evitar queda de PAS < 90 mmHg ou FC > 100 bpm',
        'Desenvolve tolerancia com uso continuo > 24-48 h; considerar janela livre de nitrato',
        'Usar equipo sem PVC para evitar adsorcao (perda de ate 40-80% da droga)',
        'Contraindicado com inibidores de PDE-5 (sildenafil, tadalafil) nas ultimas 24-48 h',
      ],
    },
  ],
  contraindications: [
    'Uso de inibidores de fosfodiesterase-5 (sildenafil nas ultimas 24 h, tadalafil nas ultimas 48 h)',
    'Hipotensao (PAS < 90 mmHg) ou hipovolemia nao corrigida',
    'Infarto de ventriculo direito',
    'Estenose aortica grave',
    'Cardiomiopatia hipertrofica obstrutiva',
    'Tamponamento cardiaco ou pericardite constritiva',
    'Hipersensibilidade a nitratos',
  ],
  seriousAdverseEffects: [
    'Hipotensao (dose-dependente)',
    'Cefaleia (muito comum)',
    'Taquicardia reflexa',
    'Meta-hemoglobinemia (rara, doses altas ou uso prolongado)',
    'Bradicardia paradoxal (reflexo de Bezold-Jarisch)',
    'Sincope',
  ],
  yCompatibility: [
    { drugId: 'noradrenalina', drugName: 'Noradrenalina', status: 'compatible' },
    { drugId: 'dobutamina', drugName: 'Dobutamina', status: 'compatible' },
    { drugId: 'heparina', drugName: 'Heparina', status: 'compatible' },
    { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
    { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
    { drugId: 'insulina-regular', drugName: 'Insulina Regular', status: 'compatible' },
    { drugId: 'alteplase', drugName: 'Alteplase', status: 'incompatible' },
  ],
  pregnancyCategory: 'C',
  references: [
    {
      citation:
        'Amsterdam EA, Wenger NK, Brindis RG, et al. 2014 AHA/ACC Guideline for the Management of Patients with Non-ST-Elevation Acute Coronary Syndromes. J Am Coll Cardiol. 2014;64(24):e139-e228.',
      year: 2014,
      guideline: 'AHA/ACC NSTE-ACS 2014',
    },
    {
      citation:
        'Panchal AR, Bartos JA, Cabanas JG, et al. Part 3: Adult Basic and Advanced Life Support: 2020 AHA Guidelines for CPR and ECC. Circulation. 2020;142(16_suppl_2):S366-S468.',
      year: 2020,
      guideline: 'AHA ACLS 2020',
    },
    {
      citation:
        'Anvisa. Bulario Eletronico — Nitroglicerina. Agencia Nacional de Vigilancia Sanitaria.',
      year: 2023,
    },
  ],
  keywords: [
    'nitroglicerina',
    'tridil',
    'nitrato',
    'vasodilatador',
    'SCA',
    'angina',
    'edema pulmonar',
    'pre-carga',
    'vasoativa',
  ],
};

const nitroprussiato: EmergencyDrug = {
  id: 'nitroprussiato',
  genericName: 'Nitroprussiato de Sodio',
  tradeName: ['Nipride', 'Nitropress'],
  category: 'vasoativa',
  atcCode: 'C02DD01',
  snomedCT: '387403005',
  rename: true,
  sus: true,
  presentations: [
    'Ampola 50 mg — po para solucao injetavel (frasco-ampola)',
  ],
  mechanismOfAction:
    'Vasodilatador arterial e venoso direto; libera oxido nitrico (NO) que ativa a guanilato ciclase soluvel, elevando GMPc e causando relaxamento do musculo liso vascular. Reduz pre-carga e pos-carga de forma equilibrada, diminuindo a resistencia vascular sistemica e aumentando o debito cardiaco.',
  emergencyDosing: [
    {
      indication:
        'Emergencia hipertensiva, disseccao aguda de aorta (com beta-bloqueador), insuficiencia cardiaca aguda com hipertensao grave, encefalopatia hipertensiva',
      route: 'IV BIC',
      doseRange: { min: 0.3, max: 5 },
      doseUnit: 'mcg/kg',
      maxDose: '10 mcg/kg/min por no maximo 10 min; dose maxima sustentada recomendada: 2-4 mcg/kg/min. Risco de toxicidade por cianeto em doses altas ou uso prolongado (> 48-72 h)',
      infusion: {
        dilution: {
          description:
            'Diluicao padrao: 1 frasco-ampola (50 mg) em 250 mL de SG 5%, totalizando 250 mL com concentracao de 200 mcg/mL. Proteger da luz com equipo opaco e papel aluminio.',
          solute: 'Nitroprussiato de Sodio 50 mg',
          soluteVolume: '1 frasco-ampola reconstituido em 2-3 mL de SG 5%',
          diluent: 'SG 5%',
          diluentVolume: '247-248 mL',
          finalVolume: 250,
          finalConcentration: 200,
          concentrationUnit: 'mcg/mL',
          stability: '24 horas protegido da luz. Descartar se solucao apresentar coloracao azul, verde escura ou vermelha.',
          photoprotection: true,
        },
        rateRange: { min: 0.3, max: 5 },
        rateUnit: 'mcg/kg/min',
        steps: [
          { dosePerKgMin: 0.3, unit: 'mcg/kg/min' },
          { dosePerKgMin: 0.5, unit: 'mcg/kg/min' },
          { dosePerKgMin: 1.0, unit: 'mcg/kg/min' },
          { dosePerKgMin: 2.0, unit: 'mcg/kg/min' },
          { dosePerKgMin: 3.0, unit: 'mcg/kg/min' },
          { dosePerKgMin: 4.0, unit: 'mcg/kg/min' },
          { dosePerKgMin: 5.0, unit: 'mcg/kg/min' },
        ],
      },
      onset: 'Segundos a 1-2 minutos',
      duration: '1-10 minutos apos suspensao',
      notes: [
        'Obrigatorio proteger da luz (solucao, equipo e frasco) — usar papel aluminio',
        'Monitorizacao continua de PA intra-arterial e recomendada',
        'Risco de intoxicacao por cianeto: monitorar lactato e acidose metabolica',
        'Se uso > 48 h ou doses > 4 mcg/kg/min: dosar tiocianato (nivel toxico > 10 mg/dL)',
        'Antidoto para toxicidade por cianeto: hidroxocobalamina ou tiosulfato de sodio',
        'Na disseccao aortica: sempre associar beta-bloqueador antes de iniciar nitroprussiato',
      ],
    },
  ],
  contraindications: [
    'Hipotensao grave ou hipovolemia',
    'Shunt arteriovenoso cirurgico ou comunicacoes patologicas conhecidas',
    'Coarctacao da aorta',
    'Atrofia optica de Leber ou ambliopia tabagica (deficiencia de rodanase)',
    'Insuficiencia hepatica grave (metabolismo prejudicado do cianeto)',
    'Hipotireoidismo (tiocianato inibe captacao de iodo)',
    'Deficiencia de vitamina B12 (prejudica detoxificacao de cianeto)',
  ],
  seriousAdverseEffects: [
    'Toxicidade por cianeto (acidose latica, confusao, coma, arritmias)',
    'Toxicidade por tiocianato (uso prolongado: desorientacao, psicose, convulsoes)',
    'Hipotensao excessiva',
    'Taquicardia reflexa',
    'Meta-hemoglobinemia',
    'Aumento da pressao intracraniana',
    'Hipotireoidismo (uso prolongado)',
  ],
  renalAdjustment: [
    {
      gfr: '< 30 mL/min',
      adjustment: 'Risco aumentado de acumulo de tiocianato; usar dose minima eficaz e monitorar niveis de tiocianato. Evitar uso > 48 h.',
    },
  ],
  yCompatibility: [
    { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
    { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
    { drugId: 'heparina', drugName: 'Heparina', status: 'compatible' },
    { drugId: 'insulina-regular', drugName: 'Insulina Regular', status: 'compatible' },
    { drugId: 'dobutamina', drugName: 'Dobutamina', status: 'compatible' },
    { drugId: 'noradrenalina', drugName: 'Noradrenalina', status: 'compatible' },
    { drugId: 'bicarbonato-sodio', drugName: 'Bicarbonato de Sodio', status: 'incompatible' },
  ],
  pregnancyCategory: 'C',
  references: [
    {
      citation:
        'Whelton PK, Carey RM, Aronow WS, et al. 2017 ACC/AHA Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults. J Am Coll Cardiol. 2018;71(19):e127-e248.',
      year: 2018,
      guideline: 'ACC/AHA Hipertensao 2017',
    },
    {
      citation:
        'Sociedade Brasileira de Cardiologia. 7a Diretriz Brasileira de Hipertensao Arterial. Arq Bras Cardiol. 2016;107(3 Suppl 3):1-83.',
      year: 2016,
      guideline: 'SBC Hipertensao 2016',
    },
    {
      citation:
        'Anvisa. Bulario Eletronico — Nitroprussiato de Sodio. Agencia Nacional de Vigilancia Sanitaria.',
      year: 2023,
    },
  ],
  keywords: [
    'nitroprussiato',
    'nipride',
    'vasodilatador',
    'emergencia hipertensiva',
    'crise hipertensiva',
    'cianeto',
    'disseccao aorta',
    'vasoativa',
    'pos-carga',
  ],
};

const fenilefrina: EmergencyDrug = {
  id: 'fenilefrina',
  genericName: 'Fenilefrina',
  tradeName: ['Fenilefrin', 'Neo-Synephrine'],
  category: 'vasoativa',
  atcCode: 'C01CA06',
  snomedCT: '372771005',
  rename: true,
  sus: true,
  presentations: [
    'Ampola 10 mg/1 mL (10 mg/mL) — cloridrato de fenilefrina',
  ],
  mechanismOfAction:
    'Agonista alfa-1 adrenergico seletivo puro; promove vasoconstricao periferica intensa sem atividade beta significativa. Aumenta a resistencia vascular sistemica e a pressao arterial com bradicardia reflexa. Nao possui efeito inotropico ou cronotropico positivo direto.',
  emergencyDosing: [
    {
      indication:
        'Hipotensao refrataria quando taquiarritmia limita uso de catecolaminas; hipotensao induzida por anestesia; alternativa vasopressora em pacientes com taquicardia',
      route: 'IV BIC',
      doseRange: { min: 0.5, max: 6 },
      doseUnit: 'mcg/kg',
      maxDose: '6 mcg/kg/min',
      bolus: '100-200 mcg IV push a cada 1-2 min para hipotensao aguda (dose de resgate)',
      infusion: {
        dilution: {
          description:
            'Diluicao padrao: 5 ampolas (50 mg) em 245 mL de SF 0,9%, totalizando 250 mL com concentracao de 200 mcg/mL',
          solute: 'Fenilefrina 10 mg/1 mL',
          soluteVolume: '5 ampolas (5 mL)',
          diluent: 'SF 0,9%',
          diluentVolume: '245 mL',
          finalVolume: 250,
          finalConcentration: 200,
          concentrationUnit: 'mcg/mL',
          stability: '24 horas em temperatura ambiente',
        },
        rateRange: { min: 0.5, max: 6 },
        rateUnit: 'mcg/kg/min',
        steps: [
          { dosePerKgMin: 0.5, unit: 'mcg/kg/min' },
          { dosePerKgMin: 1.0, unit: 'mcg/kg/min' },
          { dosePerKgMin: 2.0, unit: 'mcg/kg/min' },
          { dosePerKgMin: 3.0, unit: 'mcg/kg/min' },
          { dosePerKgMin: 4.0, unit: 'mcg/kg/min' },
          { dosePerKgMin: 6.0, unit: 'mcg/kg/min' },
        ],
      },
      onset: 'Imediato (IV)',
      duration: '15-20 minutos apos bolus; 1-2 min apos suspensao de infusao continua',
      notes: [
        'Vasopressor puro sem acao inotropica: pode reduzir debito cardiaco por aumento excessivo de pos-carga',
        'Util quando se deseja evitar taquicardia (ausencia de efeito beta)',
        'SSC 2021: nao recomendada como vasopressor de primeira linha no choque septico (pode reduzir debito esplancnico)',
        'Indicacao principal: hipotensao peri-operatoria, hipotensao na raquianestesia',
        'Cuidado em pacientes com disfuncao ventricular — pode agravar baixo debito',
      ],
    },
  ],
  contraindications: [
    'Hipertensao grave',
    'Taquicardia ventricular',
    'Disfuncao ventricular grave (aumenta pos-carga sem inotropico)',
    'Feocromocitoma',
    'Hipersensibilidade a fenilefrina',
  ],
  seriousAdverseEffects: [
    'Hipertensao grave',
    'Bradicardia reflexa intensa',
    'Isquemia de extremidades (vasoconstricao alfa pura)',
    'Isquemia miocardica (aumento de pos-carga)',
    'Necrose tecidual por extravasamento',
    'Isquemia mesenterica',
  ],
  yCompatibility: [
    { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
    { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
    { drugId: 'propofol', drugName: 'Propofol', status: 'compatible' },
    { drugId: 'heparina', drugName: 'Heparina', status: 'compatible' },
    { drugId: 'insulina-regular', drugName: 'Insulina Regular', status: 'compatible' },
    { drugId: 'bicarbonato-sodio', drugName: 'Bicarbonato de Sodio', status: 'incompatible' },
  ],
  pregnancyCategory: 'C',
  references: [
    {
      citation:
        'Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.',
      year: 2021,
      guideline: 'SSC 2021',
    },
    {
      citation:
        'Panchal AR, Bartos JA, Cabanas JG, et al. Part 3: Adult Basic and Advanced Life Support: 2020 AHA Guidelines for CPR and ECC. Circulation. 2020;142(16_suppl_2):S366-S468.',
      year: 2020,
      guideline: 'AHA ACLS 2020',
    },
    {
      citation:
        'Anvisa. Bulario Eletronico — Fenilefrina. Agencia Nacional de Vigilancia Sanitaria.',
      year: 2023,
    },
  ],
  keywords: [
    'fenilefrina',
    'alfa-1 agonista',
    'vasopressor',
    'neo-synephrine',
    'hipotensao',
    'vasoconstricao',
    'peri-operatorio',
    'vasoativa',
  ],
};

export const drogasVasoativas: EmergencyDrug[] = [
  noradrenalina,
  adrenalinaInfusao,
  dopamina,
  dobutamina,
  vasopressina,
  milrinona,
  nitroglicerina,
  nitroprussiato,
  fenilefrina,
];
