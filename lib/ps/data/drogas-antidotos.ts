import { EmergencyDrug } from '../types';

export const drogasAntidotos: EmergencyDrug[] = [
  // 1. Naloxona
  {
    id: 'naloxona',
    genericName: 'Naloxona',
    tradeName: ['Narcan'],
    category: 'antidoto',
    atcCode: 'V03AB15',
    snomedCT: '372890007',
    rename: true,
    sus: true,
    presentations: [
      'Ampola 0.4 mg/1 mL solucao injetavel',
    ],
    mechanismOfAction:
      'Antagonista competitivo puro dos receptores opioides mu, kappa e delta. Desloca os opioides dos receptores, revertendo depressao respiratoria, sedacao e hipotensao induzidas por opioides. Nao possui atividade agonista intrinseca.',
    emergencyDosing: [
      {
        indication: 'Intoxicacao aguda por opioides com depressao respiratoria',
        route: 'IV',
        doseRange: { min: 0.04, max: 0.4 },
        doseUnit: 'mg',
        maxDose: '10 mg (dose total cumulativa)',
        bolus: 'Iniciar com 0.04-0.1 mg IV e titular a cada 2-3 min ate resposta adequada (FR > 12 irpm)',
        onset: '1-2 minutos',
        peak: '5 minutos',
        duration: '30-90 minutos',
        notes: [
          'Titular em pequenos incrementos para evitar sindrome de abstinencia aguda e edema pulmonar',
          'Meia-vida menor que a maioria dos opioides — monitorizar por 4-6h para ressedacao',
          'Opioides de longa acao (metadona, patch de fentanil) podem requerer infusao continua',
          'Objetivo: restaurar ventilacao adequada, nao consciencia plena',
        ],
        adjustments: [
          {
            condition: 'Dependencia cronica de opioides',
            modification:
              'Iniciar com 0.04 mg e titular lentamente para evitar abstinencia aguda com vomitos e aspiracao',
          },
          {
            condition: 'Intoxicacao por opioide de longa acao (metadona, fentanil transdermico)',
            modification:
              'Considerar infusao continua: 2/3 da dose efetiva inicial por hora em SG 5% ou SF 0.9%',
          },
        ],
      },
      {
        indication: 'Intoxicacao por opioides — via alternativa (sem acesso IV)',
        route: 'IM / SC / IN',
        doseRange: { min: 0.4, max: 2 },
        doseUnit: 'mg',
        maxDose: '10 mg (dose total cumulativa)',
        onset: '2-5 minutos (IM); 3-5 minutos (IN)',
        peak: '15 minutos (IM)',
        duration: '30-90 minutos',
        notes: [
          'Via intranasal (IN): 2-4 mg via atomizador nasal',
          'Via IM e preferida em ambiente pre-hospitalar sem acesso IV',
          'Repetir a cada 2-3 min se necessario',
        ],
      },
    ],
    contraindications: [
      'Hipersensibilidade conhecida a naloxona',
    ],
    seriousAdverseEffects: [
      'Sindrome de abstinencia aguda (agitacao, vomitos, diarreia, piloereccao, taquicardia, hipertensao)',
      'Edema pulmonar nao cardiogenico (raro, associado a doses altas e rapidas)',
      'Arritmias cardiacas (fibrilacao ventricular — raro)',
      'Convulsoes (raro)',
      'Hipertensao grave',
    ],
    yCompatibility: [
      { drugId: 'sf-0.9', drugName: 'SF 0.9%', status: 'compatible' },
      { drugId: 'sg-5', drugName: 'SG 5%', status: 'compatible' },
      { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
      { drugId: 'heparina', drugName: 'Heparina', status: 'incompatible' },
    ],
    pregnancyCategory: 'B',
    references: [
      {
        citation:
          'Boyer EW. Management of Opioid Analgesic Overdose. N Engl J Med. 2012;367(2):146-155.',
        year: 2012,
      },
      {
        citation:
          'Walls RM, Hockberger RS, Gausche-Hill M. Rosens Emergency Medicine: Concepts and Clinical Practice. 10th ed. Elsevier.',
        year: 2023,
        guideline: 'Chapter 140 - Opioids',
      },
      {
        citation:
          'AHA 2020 Guidelines for CPR and Emergency Cardiovascular Care. Part 10: Special Circumstances of Resuscitation. Circulation. 2020;142(16 Suppl 2):S366-S468.',
        year: 2020,
        guideline: 'AHA ACLS 2020',
      },
    ],
    keywords: [
      'naloxona',
      'naloxone',
      'narcan',
      'antidoto opioide',
      'overdose opioide',
      'depressao respiratoria',
      'antagonista opioide',
      'reversao opioide',
    ],
  },

  // 2. Flumazenil
  {
    id: 'flumazenil',
    genericName: 'Flumazenil',
    tradeName: ['Lanexat', 'Flumazenil Generico'],
    category: 'antidoto',
    atcCode: 'V03AB25',
    snomedCT: '387575000',
    rename: true,
    sus: true,
    presentations: [
      'Ampola 0.5 mg/5 mL (0.1 mg/mL) solucao injetavel',
      'Ampola 1 mg/10 mL (0.1 mg/mL) solucao injetavel',
    ],
    mechanismOfAction:
      'Antagonista competitivo especifico do sitio benzodiazepino no complexo receptor GABA-A. Reverte sedacao, depressao respiratoria e efeitos amnesticos induzidos por benzodiazepinicos. Nao reverte efeitos de barbitúricos, opioides ou outros sedativos nao benzodiazepinicos.',
    emergencyDosing: [
      {
        indication: 'Intoxicacao aguda por benzodiazepinicos com depressao respiratoria',
        route: 'IV',
        doseRange: { min: 0.2, max: 0.5 },
        doseUnit: 'mg',
        maxDose: '3 mg em 1 hora (5 mg total em casos raros)',
        bolus: '0.2 mg IV em 30 seg; repetir 0.2 mg a cada 1 min ate resposta ou dose maxima',
        onset: '1-2 minutos',
        peak: '6-10 minutos',
        duration: '45-90 minutos',
        notes: [
          'Risco de convulsoes em usuarios cronicos de BZD e em coingestao com pro-convulsivantes (TCA, tramadol)',
          'Meia-vida menor que a maioria dos BZD — monitorizar por 2h para ressedacao',
          'NAO usar rotineiramente em intoxicacao mista ou overdose desconhecida',
          'Indicacao principal: reversao de sedacao procedural iatrogena',
        ],
        adjustments: [
          {
            condition: 'Uso cronico de benzodiazepinicos / epilepsia',
            modification:
              'CONTRAINDICADO — alto risco de convulsoes refratarias e status epilepticus',
          },
          {
            condition: 'Insuficiencia hepatica',
            modification:
              'Metabolismo hepatico reduzido; pode requerer ajuste de dose e monitorizacao prolongada',
          },
        ],
      },
    ],
    contraindications: [
      'Uso cronico de benzodiazepinicos (risco de convulsoes / status epilepticus)',
      'Coingestao confirmada ou suspeita de antidepressivos triciclicos',
      'Coingestao de agentes pro-convulsivantes (tramadol, isoniazida, bupropiona)',
      'Epilepsia controlada com benzodiazepinicos',
      'Hipersensibilidade ao flumazenil',
      'Sinais de hipertensao intracraniana',
    ],
    seriousAdverseEffects: [
      'Convulsoes (especialmente em dependentes de BZD ou coingestao com TCA)',
      'Arritmias cardiacas',
      'Ressedacao apos dissipacao do efeito',
      'Agitacao e ansiedade',
      'Nausea e vomitos',
    ],
    yCompatibility: [
      { drugId: 'sf-0.9', drugName: 'SF 0.9%', status: 'compatible' },
      { drugId: 'sg-5', drugName: 'SG 5%', status: 'compatible' },
      { drugId: 'ringer-lactato', drugName: 'Ringer Lactato', status: 'compatible' },
      { drugId: 'dobutamina', drugName: 'Dobutamina', status: 'incompatible' },
    ],
    pregnancyCategory: 'C',
    references: [
      {
        citation:
          'Hoffman RS, Howland MA, Lewin NA, Nelson LS, Goldfrank LR. Goldfranks Toxicologic Emergencies. 11th ed. McGraw-Hill.',
        year: 2019,
        guideline: 'Chapter 73 - Benzodiazepines',
      },
      {
        citation:
          'Walls RM, Hockberger RS, Gausche-Hill M. Rosens Emergency Medicine. 10th ed. Elsevier.',
        year: 2023,
        guideline: 'Chapter 141 - Sedative-Hypnotics',
      },
    ],
    keywords: [
      'flumazenil',
      'lanexat',
      'antidoto benzodiazepinicos',
      'reversao midazolam',
      'reversao diazepam',
      'antagonista GABA',
      'sedacao procedural',
    ],
  },

  // 3. Atropina
  {
    id: 'atropina',
    genericName: 'Atropina',
    tradeName: ['Atropina Generico'],
    category: 'antidoto',
    atcCode: 'A03BA01',
    snomedCT: '372832002',
    rename: true,
    sus: true,
    presentations: [
      'Ampola 0.25 mg/1 mL solucao injetavel',
      'Ampola 0.5 mg/1 mL solucao injetavel',
      'Ampola 1 mg/1 mL solucao injetavel',
    ],
    mechanismOfAction:
      'Antagonista competitivo dos receptores muscarinicos da acetilcolina (M1-M5). Bloqueia os efeitos da estimulacao parassimpatica no coracao (aumenta FC), glandulas (diminui secrecoes), musculatura lisa (relaxamento) e SNC. Em intoxicacao por organofosforados, reverte os efeitos muscarinicos (broncoespasmo, bradicardia, sialorreia, miose, broncorreia).',
    emergencyDosing: [
      {
        indication: 'Intoxicacao por organofosforados / carbamatos (sindrome colinergica)',
        route: 'IV',
        doseRange: { min: 2, max: 5 },
        doseUnit: 'mg',
        maxDose: 'Sem limite absoluto — titular ate secagem de secrecoes bronquicas',
        bolus: '2-5 mg IV a cada 5-10 minutos; dobrar dose se sem resposta apos 5 min',
        onset: '1-2 minutos',
        peak: '2-4 minutos',
        duration: '4-6 horas (dose dependente)',
        notes: [
          'Endpoint terapeutico: secagem de secrecoes bronquicas (nao midriase ou taquicardia)',
          'Doses muito elevadas podem ser necessarias (centenas de mg em intoxicacao grave)',
          'Associar pralidoxima (reativador de colinesterase) em intoxicacao por organofosforados',
          'NAO usar pralidoxima em intoxicacao por carbamatos — a reativacao e espontanea',
        ],
        adjustments: [
          {
            condition: 'Intoxicacao grave com insuficiencia respiratoria',
            modification:
              'Iniciar com 5 mg IV; dobrar a dose a cada 5 min ate controle de broncorreia; pode ser necessaria infusao continua 0.5-1 mg/h',
          },
        ],
      },
      {
        indication: 'Bradicardia sinusal sintomatica (ACLS)',
        route: 'IV',
        doseRange: { min: 0.5, max: 1 },
        doseUnit: 'mg',
        maxDose: '3 mg (dose vagolitica total)',
        bolus: '0.5 mg IV a cada 3-5 minutos; pode repetir ate 3 mg total',
        onset: '1-2 minutos',
        peak: '2-4 minutos',
        duration: '2-4 horas',
        notes: [
          'Primeira linha na bradicardia sinusal sintomatica conforme ACLS',
          'Doses < 0.5 mg podem causar bradicardia paradoxal',
          'Ineficaz em BAV de 2o grau Mobitz II e BAVT — considerar marca-passo transcutaneo',
        ],
      },
    ],
    contraindications: [
      'Glaucoma de angulo fechado (relativo)',
      'Obstrucao do trato urinario (relativo)',
      'Ileus paralitico (relativo)',
      'Miastenia gravis (pode piorar fraqueza)',
      'Taquicardia (uso na bradicardia — nao administrar se FC ja elevada)',
    ],
    seriousAdverseEffects: [
      'Taquicardia sinusal e arritmias supraventriculares',
      'Retencao urinaria',
      'Ileo paralitico',
      'Hipertermia (inibicao de sudorese)',
      'Psicose anticolinergica (agitacao, alucinacoes, delirio)',
      'Midriase com fotofobia',
    ],
    yCompatibility: [
      { drugId: 'adrenalina', drugName: 'Adrenalina', status: 'compatible' },
      { drugId: 'etomidato', drugName: 'Etomidato', status: 'compatible' },
      { drugId: 'succinilcolina', drugName: 'Succinilcolina', status: 'compatible' },
      { drugId: 'fentanil', drugName: 'Fentanil', status: 'compatible' },
      { drugId: 'midazolam', drugName: 'Midazolam', status: 'compatible' },
      { drugId: 'bicarbonato-sodio', drugName: 'Bicarbonato de Sodio', status: 'incompatible' },
    ],
    pregnancyCategory: 'C',
    references: [
      {
        citation:
          'Eddleston M, Buckley NA, Eyer P, Dawson AH. Management of acute organophosphorus pesticide poisoning. Lancet. 2008;371(9612):597-607.',
        year: 2008,
      },
      {
        citation:
          'Panchal AR, Bartos JA, Cabanas JG, et al. Part 3: Adult Basic and Advanced Life Support. 2020 AHA Guidelines for CPR and ECC. Circulation. 2020;142(16 Suppl 2):S366-S468.',
        year: 2020,
        guideline: 'AHA ACLS 2020',
      },
      {
        citation:
          'Roberts DM, Aaron CK. Management of acute organophosphorus pesticide poisoning. BMJ. 2007;334(7594):629-634.',
        year: 2007,
      },
    ],
    keywords: [
      'atropina',
      'atropine',
      'anticolinergico',
      'organofosforado',
      'bradicardia',
      'ACLS',
      'sindrome colinergica',
      'carbamato',
      'muscarinicos',
    ],
  },

  // 4. N-acetilcisteina (NAC)
  {
    id: 'n-acetilcisteina',
    genericName: 'N-acetilcisteina (NAC)',
    tradeName: ['Fluimucil', 'Acetadote'],
    category: 'antidoto',
    atcCode: 'V03AB23',
    snomedCT: '387440002',
    rename: true,
    sus: true,
    presentations: [
      'Ampola 300 mg/3 mL (100 mg/mL) solucao injetavel',
      'Ampola 600 mg/3 mL (200 mg/mL) solucao injetavel',
      'Ampola 2000 mg/10 mL (200 mg/mL) solucao injetavel',
    ],
    mechanismOfAction:
      'Precursor da glutationa (GSH), restaurando os estoques hepaticos depletados pelo metabolito toxico do paracetamol (NAPQI — N-acetil-p-benzoquinona imina). Tambem atua como substituto direto da glutationa na conjugacao do NAPQI e possui propriedades antioxidantes e anti-inflamatorias hepatoprotetoras.',
    emergencyDosing: [
      {
        indication: 'Intoxicacao aguda por paracetamol (acetaminofeno) — protocolo IV 21 horas',
        route: 'IV',
        doseRange: { min: 300, max: 300 },
        doseUnit: 'mg/kg',
        maxDose: 'Dose total: 300 mg/kg ao longo de 21h (para pacientes ate 100 kg)',
        notes: [
          'Protocolo 21h modificado (2-bag): 200 mg/kg em 500 mL SG 5% em 4h, seguido de 100 mg/kg em 1000 mL SG 5% em 16h',
          'Protocolo classico 3-bag (Prescott): 150 mg/kg em 200 mL SG 5% em 60 min, 50 mg/kg em 500 mL SG 5% em 4h, 100 mg/kg em 1000 mL SG 5% em 16h',
          'Iniciar o mais precoce possivel; maximo beneficio se iniciado < 8h pos-ingestao',
          'Basear indicacao no nomograma de Rumack-Matthew (nivel serico de paracetamol x tempo pos-ingestao)',
          'Em caso de duvida sobre tempo de ingestao ou dose, INICIAR NAC e reavaliar com exames',
        ],
        adjustments: [
          {
            condition: 'Paciente > 100 kg',
            modification:
              'Calcular dose com peso maximo de 100 kg para evitar sobrecarga de volume',
          },
          {
            condition: 'Insuficiencia hepatica fulminante',
            modification:
              'Manter infusao continua apos as 21h iniciais: 6.25 mg/kg/h ate melhora clinica e laboratorial (INR, transaminases, encefalopatia)',
          },
          {
            condition: 'Reacao anafilactoide durante infusao',
            modification:
              'Pausar infusao, tratar com anti-histaminico (difenidramina 50 mg IV); reiniciar em taxa mais lenta apos resolucao',
          },
        ],
        onset: 'Efeito hepatoprotetor progressivo ao longo da infusao',
        duration: 'Protocolo completo: 21 horas',
      },
      {
        indication: 'Intoxicacao aguda por paracetamol — via oral (alternativa)',
        route: 'VO',
        doseRange: { min: 140, max: 140 },
        doseUnit: 'mg/kg',
        maxDose: 'Dose de ataque 140 mg/kg VO, seguido de 70 mg/kg a cada 4h por 17 doses adicionais (72h total)',
        notes: [
          'Protocolo oral (72h): 140 mg/kg ataque + 70 mg/kg a cada 4h x 17 doses',
          'Desvantagem: alta incidencia de vomitos — considerar antiemetico (ondansetrona)',
          'Via IV e preferida na pratica atual de emergencia',
        ],
        onset: 'Efeito hepatoprotetor progressivo',
        duration: 'Protocolo completo: 72 horas',
      },
    ],
    contraindications: [
      'Hipersensibilidade grave conhecida a NAC (anafilaxia previa verdadeira — extremamente rara)',
    ],
    seriousAdverseEffects: [
      'Reacao anafilactoide (nao IgE-mediada): urticaria, broncoespasmo, hipotensao — ocorre em 10-20% com protocolo IV, geralmente na 1a hora',
      'Nausea e vomitos (frequente com via oral)',
      'Coagulopatia (NAC pode prolongar INR independentemente da lesao hepatica — nao confundir com falencia hepatica)',
    ],
    yCompatibility: [
      { drugId: 'sg-5', drugName: 'SG 5%', status: 'compatible' },
      { drugId: 'sf-0.9', drugName: 'SF 0.9%', status: 'compatible' },
      { drugId: 'ondansetrona', drugName: 'Ondansetrona', status: 'compatible' },
      { drugId: 'bicarbonato-sodio', drugName: 'Bicarbonato de Sodio', status: 'incompatible' },
    ],
    pregnancyCategory: 'B',
    references: [
      {
        citation:
          'Heard KJ. Acetylcysteine for Acetaminophen Poisoning. N Engl J Med. 2008;359(3):285-292.',
        year: 2008,
      },
      {
        citation:
          'Bateman DN, Dear JW, Thanacoody HKR, et al. Reduction of adverse effects from intravenous acetylcysteine treatment for paracetamol poisoning: a randomised controlled trial. Lancet. 2014;383(9918):697-704.',
        year: 2014,
      },
      {
        citation:
          'Hoffman RS, Howland MA, Lewin NA, Nelson LS, Goldfrank LR. Goldfranks Toxicologic Emergencies. 11th ed. McGraw-Hill.',
        year: 2019,
        guideline: 'Chapter 34 - Acetaminophen',
      },
    ],
    keywords: [
      'n-acetilcisteina',
      'NAC',
      'acetilcisteina',
      'fluimucil',
      'paracetamol',
      'acetaminofeno',
      'intoxicacao paracetamol',
      'overdose paracetamol',
      'hepatotoxicidade',
      'nomograma Rumack-Matthew',
      'NAPQI',
    ],
  },

  // 5. Gluconato de Calcio 10%
  {
    id: 'gluconato-calcio',
    genericName: 'Gluconato de Calcio 10%',
    tradeName: ['Gluconato de Calcio Generico'],
    category: 'antidoto',
    atcCode: 'A12AA03',
    snomedCT: '387368005',
    rename: true,
    sus: true,
    presentations: [
      'Ampola 10 mL a 10% (93 mg de calcio elementar / 10 mL = 4.65 mEq Ca++)',
    ],
    mechanismOfAction:
      'Fornece calcio ionica que antagoniza os efeitos da hipercalemia e dos bloqueadores de canal de calcio na membrana celular cardiaca, estabilizando o potencial de membrana do miocardio. Restaura o gradiente de calcio transmembrana, protegendo contra arritmias e depressao miocardica.',
    emergencyDosing: [
      {
        indication: 'Hipercalemia grave com alteracoes eletrocardiograficas',
        route: 'IV',
        doseRange: { min: 10, max: 30 },
        doseUnit: 'mL',
        maxDose: '30 mL (3 ampolas) de gluconato de calcio 10%',
        bolus: '10-20 mL IV em 2-5 minutos; pode repetir em 5-10 min se ECG nao normalizar',
        onset: '1-3 minutos',
        peak: '5 minutos',
        duration: '30-60 minutos',
        notes: [
          'NAO reduz o potassio serico — apenas estabiliza membrana cardiaca',
          'Associar medidas para shift do potassio (insulina + glicose, salbutamol nebulizado, bicarbonato)',
          'Monitorizar ECG continuamente',
          'Preferir gluconato de calcio sobre cloreto de calcio por via periferica (menor risco de necrose tecidual)',
        ],
      },
      {
        indication: 'Intoxicacao por bloqueadores de canal de calcio (BCC)',
        route: 'IV',
        doseRange: { min: 30, max: 60 },
        doseUnit: 'mL',
        maxDose: '60 mL (6 ampolas) de gluconato de calcio 10%; pode ser necessario mais em BCC-OD grave',
        bolus: '30 mL IV em 10-15 minutos; pode repetir; considerar infusao continua',
        onset: '1-3 minutos',
        duration: '30-60 minutos',
        notes: [
          'Doses elevadas podem ser necessarias em intoxicacao grave por verapamil ou diltiazem',
          'Infusao continua: 0.6-1.5 mL/kg/h de gluconato de calcio 10% guiada por calcio ionizado',
          'Alvo: calcio ionizado 2x normal (manter 2.0-2.5 mmol/L)',
          'Associar insulina em alta dose (HIE), vasopressores e emulsao lipidica se refratario',
        ],
        adjustments: [
          {
            condition: 'Uso concomitante de digoxina',
            modification:
              'CONTRAINDICADO — calcio potencializa toxicidade digitalica e pode causar arritmia fatal. Usar magnesio e anti-digoxina (Fab)',
          },
        ],
      },
      {
        indication: 'Hipocalcemia sintomatica aguda (tetania, convulsoes, QT longo)',
        route: 'IV',
        doseRange: { min: 10, max: 20 },
        doseUnit: 'mL',
        maxDose: '20 mL de gluconato de calcio 10%',
        bolus: '10-20 mL IV em 10 minutos',
        onset: '1-3 minutos',
        duration: '30-60 minutos',
        notes: [
          'Monitorizar calcio ionizado a cada 4-6h',
          'Seguir com infusao continua se sintomas recorrentes',
        ],
      },
    ],
    contraindications: [
      'Intoxicacao digitalica (risco de arritmia fatal com calcio)',
      'Hipercalcemia',
      'Fibrilacao ventricular',
    ],
    seriousAdverseEffects: [
      'Necrose tecidual por extravasamento (menor risco que cloreto de calcio)',
      'Bradicardia com infusao rapida',
      'Hipotensao se infundido muito rapido',
      'Arritmias em pacientes digitalizados',
      'Hipercalcemia iatrogena',
    ],
    yCompatibility: [
      { drugId: 'sf-0.9', drugName: 'SF 0.9%', status: 'compatible' },
      { drugId: 'sg-5', drugName: 'SG 5%', status: 'compatible' },
      { drugId: 'insulina-regular', drugName: 'Insulina Regular', status: 'compatible' },
      { drugId: 'bicarbonato-sodio', drugName: 'Bicarbonato de Sodio', status: 'incompatible' },
      { drugId: 'ceftriaxona', drugName: 'Ceftriaxona', status: 'incompatible' },
    ],
    pregnancyCategory: 'C',
    references: [
      {
        citation:
          'Vanden Hoek TL, Morrison LJ, Shuster M, et al. Part 12: Cardiac Arrest in Special Situations. 2010 AHA Guidelines. Circulation. 2010;122(18 Suppl 3):S829-S861.',
        year: 2010,
        guideline: 'AHA ACLS Special Situations',
      },
      {
        citation:
          'Levine M, Brent J, Burkhart K. Critical Care Toxicology. 2nd ed. Springer. Calcium Channel Blocker Poisoning.',
        year: 2017,
      },
      {
        citation:
          'Palmer BF, Clegg DJ. Diagnosis and Treatment of Hyperkalemia. Cleve Clin J Med. 2017;84(12):934-942.',
        year: 2017,
      },
    ],
    keywords: [
      'gluconato calcio',
      'calcio',
      'hipercalemia',
      'bloqueador canal calcio',
      'estabilizador membrana',
      'hipocalcemia',
      'BCC overdose',
      'verapamil',
      'diltiazem',
    ],
  },

  // 6. Bicarbonato de Sodio 8.4%
  {
    id: 'bicarbonato-sodio',
    genericName: 'Bicarbonato de Sodio 8.4%',
    tradeName: ['Bicarbonato de Sodio Generico'],
    category: 'antidoto',
    atcCode: 'B05CB04',
    snomedCT: '387319002',
    rename: true,
    sus: true,
    presentations: [
      'Ampola 8.4% — 10 mL (1 mEq/mL = 10 mEq por ampola)',
      'Frasco 8.4% — 250 mL (250 mEq)',
    ],
    mechanismOfAction:
      'Agente alcalinizante que eleva o pH sanguineo e urinario. Na intoxicacao por antidepressivos triciclicos (TCA), a alcalinizacao sanguinea (pH 7.45-7.55) reduz a fracao livre do TCA, diminui a ligacao ao canal de sodio e alivia o bloqueio de conduccao cardiaca. Na acidose metabolica, tampona ions H+ diretamente.',
    emergencyDosing: [
      {
        indication: 'Intoxicacao por antidepressivos triciclicos (TCA) com QRS alargado > 100 ms',
        route: 'IV',
        doseRange: { min: 1, max: 2 },
        doseUnit: 'mEq/kg',
        maxDose: 'Titular ate QRS < 100 ms e pH 7.45-7.55',
        bolus: '1-2 mEq/kg IV em bolus rapido; pode repetir a cada 3-5 min',
        onset: '1-2 minutos',
        duration: 'Variavel — manter infusao para pH alvo',
        notes: [
          'Indicacao: QRS > 100 ms, arritmia ventricular ou hipotensao na intoxicacao por TCA',
          'Infusao de manutencao: 150 mEq (3 ampolas de 50 mEq) em 1L de SG 5% — infundir a 150-200 mL/h',
          'Monitorizar pH arterial (alvo 7.45-7.55) e potassio (alcalose causa hipocalemia)',
          'Evitar pH > 7.60 — risco de arritmias',
        ],
      },
      {
        indication: 'Acidose metabolica grave (pH < 7.1)',
        route: 'IV',
        doseRange: { min: 1, max: 1 },
        doseUnit: 'mEq/kg',
        bolus: '1 mEq/kg IV; reavaliar gasometria a cada 15-30 min',
        onset: '1-2 minutos',
        notes: [
          'Usar com cautela — corrigir a causa base da acidose e primordial',
          'Indicacao controversa em PCR (AHA nao recomenda uso rotineiro)',
          'Hipercalemia com acidose: pode auxiliar o shift do potassio para o intracelular',
        ],
      },
      {
        indication: 'Alcalinizacao urinaria (intoxicacao por salicilatos)',
        route: 'IV',
        doseRange: { min: 150, max: 150 },
        doseUnit: 'mEq',
        maxDose: 'Titular ate pH urinario 7.5-8.0',
        notes: [
          '150 mEq (3 ampolas de 50 mEq) em 1L de SG 5% + 40 mEq KCl, infundir 1.5-2x manutencao',
          'Alvo: pH urinario 7.5-8.0 para aumentar excrecao renal de salicilatos',
          'Monitorizar potassio — hipocalemia impede alcalinizacao urinaria eficaz',
        ],
      },
    ],
    contraindications: [
      'Alcalose metabolica ou respiratoria preexistente',
      'Hipocalemia nao corrigida (alcalinizacao agrava hipocalemia)',
      'Edema pulmonar / sobrecarga de volume (contém alto teor de sodio)',
      'Hipocalcemia grave nao corrigida (alcalose reduz calcio ionizado)',
    ],
    seriousAdverseEffects: [
      'Alcalose metabolica',
      'Hipocalemia (shift de K+ para intracelular)',
      'Hipocalcemia ionizada',
      'Hipernatremia e sobrecarga de volume',
      'Hiperosmolaridade',
      'Necrose tecidual por extravasamento (solucao hiperosmolar)',
    ],
    yCompatibility: [
      { drugId: 'sg-5', drugName: 'SG 5%', status: 'compatible' },
      { drugId: 'noradrenalina', drugName: 'Noradrenalina', status: 'incompatible' },
      { drugId: 'adrenalina', drugName: 'Adrenalina', status: 'incompatible' },
      { drugId: 'gluconato-calcio', drugName: 'Gluconato de Calcio', status: 'incompatible' },
      { drugId: 'dopamina', drugName: 'Dopamina', status: 'incompatible' },
      { drugId: 'midazolam', drugName: 'Midazolam', status: 'incompatible' },
    ],
    pregnancyCategory: 'C',
    references: [
      {
        citation:
          'Bruccoleri RE, Burns MM. A Literature Review of the Use of Sodium Bicarbonate for the Treatment of QRS Widening. J Med Toxicol. 2016;12(1):121-129.',
        year: 2016,
      },
      {
        citation:
          'Body R, Bartram T, Azam F, Mackway-Jones K. Guidelines in Emergency Medicine Network (GEMNet): Guideline for the Management of Tricyclic Antidepressant Overdose. Emerg Med J. 2011;28(4):347-368.',
        year: 2011,
      },
      {
        citation:
          'Panchal AR, Bartos JA, Cabanas JG, et al. Part 3: Adult Basic and Advanced Life Support. 2020 AHA Guidelines. Circulation. 2020;142(16 Suppl 2).',
        year: 2020,
        guideline: 'AHA ACLS 2020',
      },
    ],
    keywords: [
      'bicarbonato',
      'bicarbonato de sodio',
      'alcalinizacao',
      'TCA',
      'antidepressivo triciclico',
      'QRS alargado',
      'acidose metabolica',
      'salicilato',
      'intoxicacao',
    ],
  },

  // 7. Vitamina K / Fitomenadiona
  {
    id: 'fitomenadiona',
    genericName: 'Fitomenadiona (Vitamina K1)',
    tradeName: ['Kanakion', 'Kavit'],
    category: 'antidoto',
    atcCode: 'B02BA01',
    snomedCT: '66656000',
    rename: true,
    sus: true,
    presentations: [
      'Ampola 10 mg/1 mL solucao injetavel',
      'Ampola 2 mg/0.2 mL (neonatal) solucao injetavel',
      'Comprimido 10 mg',
    ],
    mechanismOfAction:
      'Cofator essencial para a carboxilacao hepatica dos fatores de coagulacao dependentes de vitamina K (fatores II, VII, IX, X e proteinas C e S). Restaura a producao desses fatores, revertendo os efeitos anticoagulantes da warfarina e de superwarfarins (rodenticidas).',
    emergencyDosing: [
      {
        indication: 'Reversao de warfarina com sangramento grave (INR elevado)',
        route: 'IV',
        doseRange: { min: 10, max: 10 },
        doseUnit: 'mg',
        maxDose: '10 mg IV (pode repetir a cada 12h se necessario)',
        bolus: '10 mg IV diluido em 50 mL SF 0.9%, infundir em 20-30 minutos (nunca em bolus rapido)',
        onset: '1-2 horas (inicio da sintese de fatores)',
        peak: '6-12 horas (normalizacao significativa do INR)',
        duration: '24-48 horas',
        notes: [
          'Em sangramento grave: associar SEMPRE CCP (concentrado de complexo protrombinico) ou PFC para reversao imediata',
          'Vitamina K isolada demora 6-12h para efeito pleno — insuficiente em sangramento agudo',
          'Nunca administrar IV em bolus rapido — risco de anafilaxia',
          'Diluir em SG 5% ou SF 0.9%, infundir lentamente',
        ],
        adjustments: [
          {
            condition: 'INR elevado sem sangramento (INR 4.5-10)',
            modification:
              'Suspender warfarina; considerar vitamina K 1-2.5 mg VO; reavaliar INR em 24h',
          },
          {
            condition: 'INR > 10 sem sangramento',
            modification:
              'Vitamina K 2.5-5 mg VO; suspender warfarina; reavaliar INR em 24h',
          },
        ],
      },
      {
        indication: 'Intoxicacao por superwarfarins (rodenticidas — brodifacum, bromadiolona)',
        route: 'VO',
        doseRange: { min: 25, max: 50 },
        doseUnit: 'mg',
        maxDose: '200 mg/dia dividida em 2-4 doses',
        notes: [
          'Superwarfarins tem meia-vida de semanas a meses — tratamento prolongado por 3-6 meses',
          'Monitorizar INR semanalmente durante tratamento',
          'Via oral e preferida para tratamento prolongado',
          'Via IV apenas para reversao inicial em sangramento agudo',
        ],
        onset: '6-12 horas',
        duration: '24-48 horas por dose (requerer doses repetidas)',
      },
    ],
    contraindications: [
      'Hipersensibilidade a fitomenadiona ou aos excipientes (polissorbato 80, lecitina)',
    ],
    seriousAdverseEffects: [
      'Reacao anafilactoide com administracao IV rapida (rara mas potencialmente fatal)',
      'Hipotensao com infusao rapida',
      'Resistencia a superwarfarinas de longa duração, exigindo reposição prolongada com monitorizacao intensa de INR',
    ],
    yCompatibility: [
      { drugId: 'sf-0.9', drugName: 'SF 0.9%', status: 'unknown' },
      { drugId: 'sg-5', drugName: 'SG 5%', status: 'unknown' },
    ],
    pregnancyCategory: 'C',
    references: [
      {
        citation:
          'American College of Chest Physicians. Evidence-Based Clinical Practice Guidelines. Chest. 2012;141(2 Suppl):7S-47S.',
        year: 2012,
        guideline: 'CHEST 2012',
      },
    ],
    keywords: [
      'vitamina K1',
      'fitomenadiona',
      'antidoto warfarina',
      'reversao anticoagulante',
      'superwarfarins',
      'rodenticidas',
    ],
  },
  // 14. Emulsao Lipidica 20%
  {
    id: 'emulsao-lipidica',
    genericName: 'Emulsao Lipidica Intravenosa 20% (ILE)',
    tradeName: ['Intralipid', 'Lipovenos', 'SMOFlipid'],
    category: 'antidoto',
    atcCode: 'B05BA02',
    snomedCT: '346464004',
    rename: true,
    sus: true,
    presentations: [
      'Frasco 20% — 100 mL',
      'Frasco 20% — 250 mL',
      'Frasco 20% — 500 mL',
    ],
    mechanismOfAction:
      'Mecanismo multiplo (lipid sink theory): 1) Cria um compartimento lipidico intravascular que sequestra drogas lipofilicas (anestesicos locais, BCC, TCA), reduzindo sua concentracao no tecido cardiaco e SNC; 2) Fornece substrato energetico de acidos graxos ao miocardio em estado de choque toxico; 3) Pode ativar canais ionicos de calcio via acidos graxos de cadeia longa.',
    emergencyDosing: [
      {
        indication: 'Toxicidade sistemica por anestesicos locais (LAST)',
        route: 'IV',
        doseRange: { min: 1.5, max: 1.5 },
        doseUnit: 'mL/kg',
        maxDose: 'Bolus: 100 mL; Infusao: ~12.5 mL/kg total (aprox. 1000 mL em paciente de 80 kg)',
        bolus: '1.5 mL/kg de ILE 20% IV em bolus em 1 minuto; pode repetir bolus 1-2x a cada 3-5 min se instabilidade persistir',
        onset: '1-5 minutos',
        duration: 'Infundir por 15-60 minutos',
        notes: [
          'Protocolo ASRA (American Society of Regional Anesthesia):',
          'Bolus: 1.5 mL/kg em 1 min, seguido de infusao 0.25 mL/kg/min por 30-60 min',
          'Se colapso cardiovascular persiste: repetir bolus (max 2 bolus adicionais) e aumentar infusao para 0.5 mL/kg/min',
          'Dose maxima total: ~12.5 mL/kg (aproximadamente 1000 mL para 80 kg)',
          'Usar ILE 20% — NAO usar formulas com concentracoes diferentes',
          'Sinal classico de LAST: formigamento perioral, zumbido, convulsao, seguido de colapso cardiovascular',
          'Priorizar manejo de via aerea e RCP de qualidade — ILE e adjuvante',
        ],
      },
      {
        indication: 'Intoxicacao por drogas lipofilicas refrataria (BCC, TCA, beta-bloqueadores — uso off-label)',
        route: 'IV',
        doseRange: { min: 1.5, max: 1.5 },
        doseUnit: 'mL/kg',
        maxDose: '12.5 mL/kg total',
        bolus: '1.5 mL/kg IV em bolus; seguir com infusao 0.25 mL/kg/min',
        onset: '1-5 minutos',
        notes: [
          'Considerar em intoxicacao grave por drogas lipofilicas refrataria a medidas convencionais',
          'Nao atrasar outras terapias especificas (atropina, glucagon, HIE, vasopressores)',
          'Nivel de evidencia mais baixo para indicacoes nao-LAST',
        ],
      },
    ],
    contraindications: [
      'Alergia grave a soja, ovo ou amendoim (excipientes da emulsão)',
      'Hipertrigliceridemia grave (> 400 mg/dL)',
      'Disturbio grave do metabolismo lipidico',
    ],
    seriousAdverseEffects: [
      'Hipertrigliceridemia',
      'Pancreatite (uso prolongado/doses altas)',
      'Sindrome de sobrecarga lipidica (febre, hepatomegalia, esplenomegalia, coagulopatia)',
      'Interferencia em exames laboratoriais (lipemia)',
      'Reacao alergica (raro)',
      'Embolia gordurosa (teorico)',
    ],
    yCompatibility: [
      { drugId: 'sf-0.9', drugName: 'SF 0.9%', status: 'incompatible' },
      { drugId: 'sg-5', drugName: 'SG 5%', status: 'incompatible' },
      { drugId: 'noradrenalina', drugName: 'Noradrenalina', status: 'incompatible' },
    ],
    pregnancyCategory: 'C',
    references: [
      {
        citation:
          'Neal JM, Barrington MJ, Fettiplace MR, et al. The Third American Society of Regional Anesthesia and Pain Medicine Practice Advisory on Local Anesthetic Systemic Toxicity. Reg Anesth Pain Med. 2018;43(2):113-123.',
        year: 2018,
        guideline: 'ASRA LAST Advisory 2018',
      },
      {
        citation:
          'Weinberg GL. Lipid Emulsion Infusion: Resuscitation for Local Anesthetic and Other Drug Overdose. Anesthesiology. 2012;117(1):180-187.',
        year: 2012,
      },
      {
        citation:
          'Ok SH, Hong JM, Lee SH, Sohn JT. Lipid Emulsion for Treating Local Anesthetic Systemic Toxicity. Int J Med Sci. 2018;15(7):713-722.',
        year: 2018,
      },
    ],
    keywords: [
      'emulsao lipidica',
      'intralipid',
      'ILE',
      'LAST',
      'toxicidade anestesico local',
      'lipid rescue',
      'bupivacaina',
      'drogas lipofilicas',
      'lipid sink',
    ],
  },

  // 15. Idarucizumab
  {
    id: 'idarucizumab',
    genericName: 'Idarucizumab',
    tradeName: ['Praxbind'],
    category: 'antidoto',
    atcCode: 'V03AB37',
    snomedCT: '716075009',
    rename: true,
    sus: false,
    presentations: [
      'Frasco-ampola 2.5 g/50 mL (50 mg/mL) solucao injetavel — embalagem com 2 frascos (dose total: 5 g)',
    ],
    mechanismOfAction:
      'Fragmento de anticorpo monoclonal humanizado (Fab) que se liga ao dabigatrana livre e ligado a trombina com afinidade 350 vezes maior que a afinidade do dabigatrana pela trombina, neutralizando imediata e completamente o efeito anticoagulante do dabigatrana. A ligacao e irreversivel.',
    emergencyDosing: [
      {
        indication: 'Reversao emergencial de dabigatrana — sangramento grave ou cirurgia de emergencia',
        route: 'IV',
        doseRange: { min: 5, max: 5 },
        doseUnit: 'g',
        maxDose: '5 g (dose unica; segunda dose de 5 g pode ser considerada em casos excepcionais)',
        bolus: '5 g IV total: 2 infusoes consecutivas de 2.5 g em 5-10 min cada, OU bolus unico de 5 g',
        onset: 'Imediato (minutos)',
        peak: 'Reversao completa em 5-30 minutos',
        duration: '24 horas (pode necessitar redose se dabigatran redistributar)',
        notes: [
          'Estudo RE-VERSE AD: reversao completa do efeito anticoagulante em 88% dos pacientes em 4 horas',
          'Nao necessita de ajuste por funcao renal ou hepatica',
          'Nao reverte outros anticoagulantes (rivaroxabana, apixabana, edoxabana, heparina)',
          'Monitorizar com tempo de trombina diluido (dTT) ou tempo de coagulacao da ecarina (ECT)',
          'TTPa pode ser util mas nao e sensivel em concentracoes altas de dabigatrana',
          'Se idarucizumab indisponivel: considerar CCP 4 fatores 50 U/kg ou hemodialise',
          'Pode readministrar dabigatrana 24h apos idarucizumab se indicacao de anticoagulacao persiste',
        ],
      },
    ],
    contraindications: [
      'Hipersensibilidade ao idarucizumab ou excipientes',
      'Nao indicado para reversao de outros anticoagulantes que nao o dabigatrana',
    ],
    seriousAdverseEffects: [
      'Eventos tromboembolicos (risco inerente a reversao de anticoagulacao — nao causado pelo farmaco em si)',
      'Reacao de hipersensibilidade / anafilaxia (raro)',
      'Cefaleia',
      'Hipocalemia',
      'Delirio',
      'Constipacao',
      'Febre',
    ],
    yCompatibility: [
      { drugId: 'sf-0.9', drugName: 'SF 0.9%', status: 'compatible' },
      { drugId: 'acido-tranexamico', drugName: 'Acido Tranexamico', status: 'unknown' },
      { drugId: 'heparina', drugName: 'Heparina', status: 'unknown' },
    ],
    pregnancyCategory: 'C',
    references: [
      {
        citation:
          'Pollack CV Jr, Reilly PA, van Ryn J, et al. Idarucizumab for Dabigatran Reversal — Full Cohort Analysis. N Engl J Med. 2017;377(5):431-441.',
        year: 2017,
        guideline: 'RE-VERSE AD Trial',
      },
      {
        citation:
          'Tomaselli GF, Mahaffey KW, Cuker A, et al. 2017 ACC Expert Consensus Decision Pathway on Management of Bleeding in Patients on Oral Anticoagulants. J Am Coll Cardiol. 2017;70(24):3042-3067.',
        year: 2017,
        guideline: 'ACC 2017',
      },
      {
        citation:
          'Anvisa. Bula do Praxbind (idarucizumabe). Boehringer Ingelheim. Registro MS 1.0367.0247.',
        year: 2023,
      },
    ],
    keywords: [
      'idarucizumab',
      'praxbind',
      'dabigatrana',
      'reversao dabigatrana',
      'antidoto DOAC',
      'RE-VERSE AD',
      'anticoagulante oral direto',
      'sangramento',
    ],
  },

  // Andexanet Alfa
  {
    id: 'andexanet-alfa',
    genericName: 'Andexanet Alfa',
    tradeName: ['Ondexxya', 'Andexxa'],
    category: 'antidoto',
    atcCode: 'B01AX07',
    snomedCT: '860989000',
    rename: false,
    sus: false,
    presentations: [
      'Frasco-ampola 200 mg liofilizado para reconstituição IV',
    ],
    mechanismOfAction:
      'Proteína recombinante do fator Xa modificada (cataliticamente inativa): age como isca competitiva para inibidores do fator Xa (apixabana, rivaroxabana, edoxabana, betrixabana). Liga-se com alta afinidade e reverte a atividade anticoagulante em minutos sem efeitos procoagulantes diretos. Meia-vida ~6h — anticoagulação pode retornar após eliminação.',
    emergencyDosing: [
      {
        indication: 'Reversão de apixabana ou rivaroxabana ≤ 7,5 mg — baixa dose',
        route: 'IV',
        doseRange: { min: 400, max: 400 },
        doseUnit: 'mg',
        maxDose: '400 mg bolus + 480 mg infusão',
        bolus: '400 mg IV bolus em 15–30 min',
        infusion: {
          dilution: {
            description: '480 mg em infusão contínua em 2 horas (4 mg/min)',
            solute: 'Andexanet alfa',
            soluteVolume: '480 mg',
            diluent: 'SF 0,9%',
            diluentVolume: '240 mL',
            finalVolume: 260,
            finalConcentration: 1.85,
            concentrationUnit: 'mg/mL',
            stability: '8 horas após reconstituição',
          },
          rateRange: { min: 4, max: 4 },
          rateUnit: 'mg/min' as any,
          steps: [],
        },
        onset: '2 minutos',
        peak: '10 minutos',
        duration: '2 horas (atividade antiXa diminui após infusão)',
        notes: [
          'Indicação: apixabana ≤ 5 mg dose/dia OU tomada há > 8h; rivaroxabana ≤ 10 mg/dia',
          'Reversão anti-Xa em 92% (apixabana) e 92% (rivaroxabana) — ANNEXA-4',
          'Risco de eventos trombóticos: 10–15% nas primeiras 30 dias — reiniciar anticoagulação tão logo hemostasia segura (24–48h)',
          'Custo elevado: considerar 4F-PCC como alternativa quando andexanet não disponível',
        ],
        adjustments: [],
      },
      {
        indication: 'Reversão de apixabana > 5 mg ou rivaroxabana > 10 mg — alta dose',
        route: 'IV',
        doseRange: { min: 800, max: 800 },
        doseUnit: 'mg',
        maxDose: '800 mg bolus + 960 mg infusão',
        bolus: '800 mg IV bolus em 15–30 min',
        infusion: {
          dilution: {
            description: '960 mg em infusão contínua em 2 horas (8 mg/min)',
            solute: 'Andexanet alfa',
            soluteVolume: '960 mg',
            diluent: 'SF 0,9%',
            diluentVolume: '480 mL',
            finalVolume: 520,
            finalConcentration: 1.85,
            concentrationUnit: 'mg/mL',
            stability: '8 horas após reconstituição',
          },
          rateRange: { min: 8, max: 8 },
          rateUnit: 'mg/min' as any,
          steps: [],
        },
        onset: '2 minutos',
        peak: '10 minutos',
        duration: '2 horas',
        notes: [
          'Indicação: apixabana > 5 mg dose/dia OU tomada há < 8h; rivaroxabana > 10 mg/dia OU tomada há < 8h',
          'Edoxabana qualquer dose: usar protocolo de alta dose',
          'Enoxaparina: andexanet pode ser considerado mas 4F-PCC é geralmente preferido (mais dados)',
          'Monitorar atividade anti-Xa pós-infusão: se > 0,5 UI/mL, considerar repetição (off-label)',
        ],
        adjustments: [],
      },
    ],
    contraindications: [
      'Não indicado para reversão de HNF, HBPM, bivalirudina, argatrobana, fondaparinux (não são inibidores diretos de Xa com o mesmo mecanismo)',
      'Cuidado em pacientes com história recente de trombose arterial ou venosa',
      'Sem dados em gravidez ou lactação',
    ],
    seriousAdverseEffects: [
      'Eventos trombóticos (10–15% em 30 dias): AVC, IAM, TVP, TEP — reiniciar anticoagulação precocemente',
      'Infusão rápida: flushing, tosse, alteração do paladar (raro)',
      'Anticorpos neutralizantes: pode reduzir eficácia em uso repetido',
    ],
    yCompatibility: [],
    pregnancyCategory: 'C',
    references: [
      {
        citation: 'Connolly SJ, et al. Andexanet Alfa for Acute Major Bleeding Associated with Factor Xa Inhibitors (ANNEXA-4). NEJM. 2019;380:1326-1335.',
        year: 2019,
        guideline: 'ANNEXA-4',
        pmid: '30730782',
      },
      {
        citation: 'Connolly SJ, et al. Andexanet Alfa for Factor Xa Inhibitor Reversal. NEJM. 2024;390:1799-1810 (ANNEXA-I RCT).',
        year: 2024,
        guideline: 'ANNEXA-I',
        pmid: '38587228',
      },
    ],
    keywords: [
      'andexanet alfa',
      'ondexxya',
      'reversao fator Xa',
      'apixabana',
      'rivaroxabana',
      'edoxabana',
      'DOAC',
      'anticoagulante',
      'sangramento',
      'ANNEXA-4',
    ],
  },

  // Complexo Protrombínico de 4 Fatores (4F-PCC)
  {
    id: 'cpb-4f',
    genericName: 'Complexo Protrombínico de 4 Fatores',
    tradeName: ['Octaplex', 'Beriplex', 'Kcentra'],
    category: 'antidoto',
    atcCode: 'B02BD09',
    snomedCT: '372563008',
    rename: false,
    sus: false,
    presentations: [
      'Frasco-ampola 500 UI (fatores II, VII, IX, X + proteínas C e S) liofilizado para reconstituição IV',
      'Frasco-ampola 1000 UI liofilizado para reconstituição IV',
    ],
    mechanismOfAction:
      'Concentrado de fatores de coagulação vitamina K dependentes (II, VII, IX, X) + proteínas C e S anticoagulantes. Restaura a cascata de coagulação em minutos. Vantagem sobre PFC: volume muito menor (~30–50 mL vs 1.000–2.000 mL), sem necessidade de compatibilidade sanguínea, ação mais rápida. Indicação aprovada: reversão de anticoagulantes antagonistas da vitamina K (varfarina). Uso off-label crescente: inibidores de fator Xa quando andexanet não disponível.',
    emergencyDosing: [
      {
        indication: 'Reversão urgente de varfarina (INR > 1,5) com sangramento grave ou cirurgia urgente',
        route: 'IV',
        doseRange: { min: 25, max: 50 },
        doseUnit: 'U/kg',
        maxDose: '3000 UI por dose (50 UI/kg máx)',
        bolus: 'Dose guiada pelo INR: INR 2–4: 25 UI/kg IV; INR 4–6: 35 UI/kg IV; INR > 6: 50 UI/kg IV',
        onset: '10 minutos',
        peak: '30 minutos',
        duration: '6–8 horas (fatores VII e IX têm meia-vida curta)',
        notes: [
          'SEMPRE associar Vitamina K 5–10 mg IV em infusão lenta (evita recorrência do anticoagulante em 6–8h)',
          'Verificar INR 30–60 min após administração — meta: INR < 1,5',
          'Taxa de infusão: máx 3 UI/kg/min (1,5–3 mL/min para concentração 25 UI/mL)',
          'WARFASA/ATHLETE: 4F-PCC superior ao PFC em velocidade de reversão e volume administrado',
          'Não usar em coagulação intravascular disseminada ativa (CID)',
        ],
        adjustments: [],
      },
      {
        indication: 'Reversão off-label de inibidores de fator Xa (rivaroxabana, apixabana) quando andexanet indisponível',
        route: 'IV',
        doseRange: { min: 50, max: 50 },
        doseUnit: 'U/kg',
        maxDose: '50 UI/kg (máx 3000 UI)',
        bolus: '50 UI/kg IV — dose fixa independente do nível do anticoagulante (anti-Xa não guia dose de 4F-PCC)',
        onset: '10 minutos',
        peak: '30 minutos',
        duration: '6–8 horas',
        notes: [
          'Evidência off-label: estudos observacionais e ex vivo mostram reversão parcial de anti-Xa',
          'ANNEXA-4 mostrou andexanet superior ao 4F-PCC em hemostasia — mas 4F-PCC é muito mais acessível e mais barato',
          'Alternativa razoável em: hemorragia intracraniana + uso de rivaroxabana/apixabana + sem andexanet disponível',
          'Após reversão: monitorar coagulograma e atividade anti-Xa; repetir dose se sangramento persistente',
        ],
        adjustments: [],
      },
      {
        indication: 'Reversão de anticoagulação em cirurgia de emergência (qualquer anticoagulante VKA)',
        route: 'IV',
        doseRange: { min: 25, max: 50 },
        doseUnit: 'U/kg',
        maxDose: '3000 UI',
        bolus: '25–50 UI/kg IV conforme INR + vitamina K 10 mg IV concomitante',
        onset: '10 minutos',
        peak: '30 minutos',
        duration: '6–8 horas',
        notes: [
          'Pré-operatório urgente: verificar INR 20 min pós-4F-PCC antes de proceder à cirurgia',
          'Transfusão simultânea: em coagulopatia mista (trauma + cirrose) pode ser necessário PFC + plaquetas adicionais',
          'Considerar fibrinogênio: se fibrinogênio < 150 mg/dL, adicionar crioprecipitado',
        ],
        adjustments: [],
      },
    ],
    contraindications: [
      'CID (coagulação intravascular disseminada) ativa — risco de trombose paradoxal',
      'HIT (trombocitopenia induzida por heparina) se formulação contiver heparina',
      'Hipersensibilidade a proteínas humanas ou bovinas',
      'Não indicado para reversão de heparina (usar protamina) ou dabigatrana (usar idarucizumab)',
    ],
    seriousAdverseEffects: [
      'Eventos trombóticos (2–5%): TVP, TEP, IAM, AVC — associado a estados de hipercoagulabilidade',
      'Reação anafilática: rara (< 0,1%) mas potencialmente grave',
      'Transmissão de patógenos: mínima (produto submetido a inativação viral)',
      'Hipervolemia: improvável dado o baixo volume (20–50 mL) vs PFC (500–2.000 mL)',
    ],
    yCompatibility: [],
    renalAdjustment: [{ gfr: 'Qualquer TFG', adjustment: 'Sem ajuste necessário; produto de fatores de coagulação, não excretado renalmente' }],
    pregnancyCategory: 'C',
    references: [
      {
        citation: 'Sarode R, et al. Efficacy and safety of a 4-factor prothrombin complex concentrate in patients on vitamin K antagonists presenting with major bleeding. Circulation. 2013;128(11):1234-1243.',
        year: 2013,
        pmid: '23935011',
      },
      {
        citation: 'Frontera JA, et al. Guideline for Reversal of Antithrombotics in Intracranial Hemorrhage: A Statement for Healthcare Professionals from the Neurocritical Care Society and Society of Critical Care Medicine. Neurocrit Care. 2016;24(1):6-46.',
        year: 2016,
        guideline: 'NCS/SCCM',
        pmid: '26714677',
      },
    ],
    keywords: [
      'complexo protrombínico',
      '4F-PCC',
      'octaplex',
      'beriplex',
      'kcentra',
      'reversão varfarina',
      'INR elevado',
      'sangramento grave',
      'reversão anticoagulante',
      'fator II VII IX X',
    ],
  },

  {
    id: 'protamina',
    genericName: 'Sulfato de Protamina',
    tradeName: ['Protamina', 'Protamine Sulfate'],
    category: 'antidoto',
    atcCode: 'V03AB14',
    rename: false,
    sus: false,
    presentations: [
      'Ampola 50 mg/5 mL (10 mg/mL) solução injetável',
      'Ampola 100 mg/10 mL (10 mg/mL) solução injetável',
    ],
    mechanismOfAction:
      'Proteína policatiônica de baixo peso molecular derivada de esperma de salmão. Liga-se ionicamente à heparina (altamente aniônica) formando complexo estável eletricamente neutro e farmacologicamente inativo. Reverte efeito anticoagulante da heparina não fracionada (HNF) e parcialmente da enoxaparina (HBPM). Sem efeito direto sobre fator Xa residual de HBPM.',
    emergencyDosing: [
      {
        indication: 'Reversão de HNF (Heparina Não Fracionada) IV — dose calculada pela dose de heparina',
        route: 'IV',
        doseRange: { min: 1, max: 1.5 },
        doseUnit: 'mg',
        maxDose: '50 mg por dose; máximo 100 mg total',
        bolus: '1 mg de protamina para cada 100 UI de HNF administrada nas últimas 2–3 h. Infundir em 10 min (máx 5 mg/min). Se > 3 h: reduzir dose pela metade (heparina já em clearance).',
        onset: '5 minutos',
        peak: '10 minutos',
        duration: '2 horas',
        notes: [
          'Cálculo preciso: dose de HNF × 0,01 mg de protamina por UI. Ex: paciente recebeu 25.000 UI HNF IV na última hora → protamina 250 mg (dividir em 5 bolus de 50 mg cada 10 min).',
          'Velocidade máxima de infusão: 5 mg/min (50 mg em 10 min) — velocidade maior aumenta risco de reações anafilactoides.',
          'Monitorar TTPa ou TCA após 15 min: se ainda prolongado, pode-se repetir 25–50 mg IV.',
          'Efeito transitório: heparina pode ser liberada dos tecidos após 30–60 min ("rebound") → re-checar TTPa em 2–4 h.',
        ],
        adjustments: [
          { condition: 'Qualquer TFG', modification: 'Sem ajuste necessário — protamina é rapidamente metabolizada independente de função renal' },
        ],
      },
      {
        indication: 'Reversão parcial de HBPM (Enoxaparina) — sangramento grave ou pré-procedimento urgente',
        route: 'IV',
        doseRange: { min: 1, max: 1 },
        doseUnit: 'mg',
        maxDose: '50 mg por dose',
        bolus: '1 mg de protamina para cada 1 mg de enoxaparina administrado nas últimas 8 h (dose ≤ 8 h anterior). Se > 8 h: 0,5 mg de protamina por 1 mg de enoxaparina.',
        onset: '5 minutos',
        peak: '10 minutos',
        duration: '3 horas',
        notes: [
          'Reversão PARCIAL: protamina neutraliza 60–75% da atividade anti-IIa de HBPM, mas apenas ~40–50% da atividade anti-Xa. Efeito incompleto — biologicamente irreversível para anti-Xa residual.',
          'Segunda dose de protamina: 0,5 mg por 1 mg de enoxaparina se sangramento persistir após 2–4 h (anti-Xa ainda > 0,3 UI/mL).',
          'Anti-Xa sérico: pode guiar necessidade de dose adicional (alvo < 0,2 UI/mL em sangramento ativo).',
          'Para HBPM de dose única recente (< 4 h): usar dose máxima (1 mg:1 mg). Dose mais antiga: proporcional ao tempo.',
          'Fondaparinux (Arixtra): protamina NÃO reverte. Usar andexanet-alfa se disponível.',
        ],
        adjustments: [
          { condition: 'TFG < 30 mL/min', modification: 'Enoxaparina acumula em IR grave — efeito anti-Xa prolonga; monitorar anti-Xa e considerar doses extras de protamina' },
        ],
      },
      {
        indication: 'Pós-cirurgia cardíaca com CEC — reversão de heparinização plena intraoperatória',
        route: 'IV',
        doseRange: { min: 1, max: 1.3 },
        doseUnit: 'mg',
        maxDose: '300–400 mg total em CEC típica',
        bolus: '1–1,3 mg de protamina por 100 UI de HNF administrada no intraoperatório. Ex: CEC com 30.000 UI HNF → protamina 300–390 mg. Infundir em 10–20 min via acesso central venoso ou artéria pulmonar (evitar VP periférica — reação grave).',
        onset: '5 minutos',
        peak: '15 minutos',
        duration: '2 horas',
        notes: [
          'Monitorar TCA (tempo de coagulação ativado): meta < 140 s após protamina. Se TCA elevado persistente → dose adicional 25–50 mg.',
          'Síndrome de protamina: hipotensão severa + broncoespasmo + hipertensão pulmonar aguda — pode mimetizar anafilaxia. Mais comum em pacientes com exposição prévia à protamina (insulina NPH contém protamina!) ou alergia a peixe.',
          'Epinefrina + inhaled NO + vasopressor se reação anafilactoide grave.',
          'Excesso de protamina ("heparin rebound"): doses muito altas de protamina têm efeito anticoagulante intrínseco leve. Não superar razão 1,5:1.',
        ],
        adjustments: [
          { condition: 'Qualquer TFG', modification: 'Sem ajuste; em IR grave checar rebound por acúmulo de complexo heparina-protamina liberado tardiamente' },
        ],
      },
    ],
    contraindications: [
      'Alergia documentada à protamina (história de reação a insulina NPH — contém protamina)',
      'Alergia a peixe (proteína de salmão) — risco aumentado de reação anafilactoide',
      'Exposição prévia à protamina (vasectomizados com anticorpos anti-protamina — risco de reação grave)',
    ],
    seriousAdverseEffects: [
      'Hipotensão arterial (dose-dependente, especialmente se infusão rápida > 5 mg/min)',
      'Bradicardia transitória',
      'Reação anafilactoide (0,2–2%): broncoespasmo grave, hipotensão refratária, edema pulmonar não-cardiogênico',
      'Hipertensão pulmonar aguda (especialmente em pós-CEC — vasoconstrição pulmonar mediada por tromboxano)',
      'Trombocitopenia (rara)',
      'Efeito anticoagulante intrínseco (doses excessivas > razão 1,5:1 com heparina)',
    ],
    yCompatibility: [],
    pregnancyCategory: 'C — uso somente se benefício superar risco; dados limitados em humanos',
    references: [
      {
        citation: 'Boer C, et al. 2017 EACTS/EACTA Guidelines on patient blood management for adult cardiac surgery. Eur J Cardiothorac Surg. 2018;53(1):79-111.',
        year: 2017,
        guideline: 'EACTS/EACTA PBM 2017',
      },
      {
        citation: 'Frontera JA, et al. Guideline for Reversal of Antithrombotics in Intracranial Hemorrhage. Neurocrit Care. 2016;24(1):6-46.',
        year: 2016,
        guideline: 'NCS/SCCM ICH Reversal',
        pmid: '26714677',
      },
      {
        citation: 'Warkentin TE, et al. Anticoagulants: Heparin and the heparins. In: Marder VJ, et al., eds. Hemostasis and Thrombosis, 5th ed. 2012.',
        year: 2012,
      },
    ],
    keywords: [
      'protamina',
      'sulfato de protamina',
      'reversão heparina',
      'antídoto heparina',
      'reversão HBPM',
      'reversão enoxaparina',
      'anticoagulação',
      'pós-operatório CEC',
      'cirurgia cardíaca',
      'sangramento',
    ],
  },
];
