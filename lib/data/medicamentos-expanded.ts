/**
 * DATABASE DE MEDICAMENTOS EXPANDIDO - DARWIN-MFC
 * ================================================
 * 
 * 50+ Medicamentos essenciais da RENAME 2024
 * Organizados por classe terapêutica
 */

import { Medicamento } from '../types/medicamento';

// =============================================================================
// ANTIDIABÉTICOS
// =============================================================================

export const antidiabeticos: Partial<Medicamento>[] = [
  {
    id: 'metformina',
    nomeGenerico: 'Metformina',
    nomesComerciais: ['Glifage', 'Glucoformin'],
    classeTerapeutica: 'antidiabetico',
    subclasse: 'biguanida',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '850mg', disponivelSUS: true },
    ],
    indicacoes: [
      'Diabetes mellitus tipo 2',
      'Síndrome dos ovários policísticos (off-label)',
      'Pré-diabetes (prevenção)'
    ],
    mecanismoAcao: 'Reduz produção hepática de glicose, aumenta sensibilidade periférica à insulina e reduz absorção intestinal de glicose.',
    posologias: [
      {
        indicacao: 'Diabetes mellitus tipo 2',
        adultos: {
          dose: 'Iniciar 500mg 1-2x/dia, aumentar gradualmente',
          frequencia: '2-3x/dia com refeições',
          doseMaxima: '2550mg/dia',
          observacoes: 'Aumentar dose a cada 1-2 semanas para evitar efeitos GI'
        }
      }
    ],
    contraindicacoes: [
      'TFG <30 mL/min/1,73m²',
      'Acidose metabólica',
      'Insuficiência hepática grave',
      'Alcoolismo',
      'Uso de contraste iodado (suspender 48h antes)'
    ],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Diarreia', 'Dor abdominal', 'Gosto metálico'],
      graves: ['Acidose lática (raro)']
    },
    interacoes: [
      { medicamento: 'Contraste iodado', gravidade: 'grave', efeito: 'Acidose lática', conduta: 'Suspender 48h antes e após' },
      { medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Aumento risco acidose lática', conduta: 'Limitar consumo' }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Sem ajuste' },
      { tfg: '30-60', ajuste: 'Máximo 1000mg/dia, monitorar função renal' },
      { tfg: '<30', ajuste: 'Contraindicado' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível, mínima excreção no leite' },
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [{ refId: 'ada-2024' }],
    lastUpdate: '2024-12'
  },
  {
    id: 'gliclazida',
    nomeGenerico: 'Gliclazida',
    nomesComerciais: ['Diamicron', 'Azukon'],
    classeTerapeutica: 'antidiabetico',
    subclasse: 'sulfonilureira',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '30mg MR', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '60mg MR', disponivelSUS: true },
    ],
    indicacoes: ['Diabetes mellitus tipo 2 (segunda linha após metformina)'],
    mecanismoAcao: 'Estimula secreção de insulina pelas células beta pancreáticas.',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: {
          dose: '30-120mg 1x/dia no café da manhã',
          frequencia: '1x/dia',
          doseMaxima: '120mg/dia'
        }
      }
    ],
    contraindicacoes: ['DM1', 'Cetoacidose diabética', 'Insuficiência hepática/renal grave'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Ganho de peso'],
      graves: ['Hipoglicemia severa']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Mascaram sintomas de hipoglicemia', conduta: 'Orientar paciente' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Usar insulina na gestação/amamentação' },
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [{ refId: 'ada-2024' }],
    lastUpdate: '2024-12'
  },
  {
    id: 'insulina-nph',
    nomeGenerico: 'Insulina NPH (isofana)',
    nomesComerciais: ['Humulin N', 'Novolin N'],
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '100UI/mL', quantidade: 'Frasco 10mL', disponivelSUS: true },
    ],
    indicacoes: ['DM1', 'DM2 com falha de antidiabéticos orais', 'Diabetes gestacional'],
    mecanismoAcao: 'Insulina de ação intermediária. Início 1-2h, pico 4-10h, duração 10-16h.',
    posologias: [
      {
        indicacao: 'DM2 basal',
        adultos: {
          dose: 'Iniciar 10UI ou 0,1-0,2 UI/kg ao deitar',
          frequencia: '1-2x/dia',
          observacoes: 'Titular a cada 3-4 dias (aumentar 2UI se glicemia jejum >130)'
        }
      }
    ],
    contraindicacoes: ['Hipoglicemia'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Ganho de peso', 'Lipodistrofia'],
      graves: ['Hipoglicemia severa']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Segura na amamentação' },
    monitorizacao: ['Glicemia capilar', 'HbA1c a cada 3 meses'],
    orientacoesPaciente: [
      'Armazenar em geladeira (2-8°C)',
      'Após aberto, pode ficar em temperatura ambiente por 28 dias',
      'Homogeneizar antes de usar (rolar entre as mãos)',
      'Alternar locais de aplicação'
    ],
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [{ refId: 'ada-2024' }],
    lastUpdate: '2024-12'
  },
];

// =============================================================================
// HIPOLIPEMIANTES
// =============================================================================

export const hipolipemiantes: Partial<Medicamento>[] = [
  {
    id: 'sinvastatina',
    nomeGenerico: 'Sinvastatina',
    nomesComerciais: ['Zocor', 'Sinvascor'],
    classeTerapeutica: 'hipolipemiante',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
    ],
    indicacoes: ['Hipercolesterolemia', 'Prevenção CV secundária', 'Dislipidemia mista'],
    mecanismoAcao: 'Inibe HMG-CoA redutase, reduzindo síntese hepática de colesterol.',
    posologias: [
      {
        indicacao: 'Dislipidemia',
        adultos: {
          dose: '20-40mg à noite',
          frequencia: '1x/dia à noite',
          doseMaxima: '40mg/dia (80mg tem mais risco de miopatia)'
        }
      }
    ],
    contraindicacoes: ['Doença hepática ativa', 'Gestação', 'Amamentação'],
    efeitosAdversos: {
      comuns: ['Mialgia', 'Cefaleia', 'Dispepsia'],
      graves: ['Rabdomiólise', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Amiodarona', gravidade: 'grave', efeito: 'Risco de miopatia', conduta: 'Limitar sinvastatina a 20mg' },
      { medicamento: 'Macrolídeos', gravidade: 'grave', efeito: 'Aumenta níveis de sinvastatina', conduta: 'Evitar uso concomitante' }
    ],
    monitorizacao: ['Perfil lipídico', 'Enzimas hepáticas (TGO/TGP)', 'CPK se sintomas musculares'],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicada' },
    doencasRelacionadas: ['dislipidemia'],
    citations: [{ refId: 'diretriz-dislipidemia-2023' }],
    lastUpdate: '2024-12'
  },
  {
    id: 'atorvastatina',
    nomeGenerico: 'Atorvastatina',
    nomesComerciais: ['Lipitor', 'Citalor'],
    classeTerapeutica: 'hipolipemiante',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: false },
    ],
    indicacoes: ['Hipercolesterolemia', 'Prevenção CV primária e secundária', 'Síndrome coronariana aguda'],
    mecanismoAcao: 'Inibidor potente da HMG-CoA redutase. Pode ser tomada a qualquer hora (meia-vida longa).',
    posologias: [
      {
        indicacao: 'Alta intensidade (redução LDL ≥50%)',
        adultos: {
          dose: '40-80mg/dia',
          frequencia: '1x/dia',
          doseMaxima: '80mg/dia'
        }
      },
      {
        indicacao: 'Moderada intensidade (redução LDL 30-50%)',
        adultos: {
          dose: '10-20mg/dia',
          frequencia: '1x/dia'
        }
      }
    ],
    contraindicacoes: ['Doença hepática ativa', 'Gestação', 'Amamentação'],
    efeitosAdversos: {
      comuns: ['Mialgia', 'Artralgia', 'Nasofaringite'],
      graves: ['Rabdomiólise', 'Diabetes novo (pequeno risco)']
    },
    interacoes: [
      { medicamento: 'Ciclosporina', gravidade: 'contraindicada', efeito: 'Risco de rabdomiólise', conduta: 'Evitar' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicada' },
    doencasRelacionadas: ['dislipidemia', 'doenca-arterial-coronariana'],
    citations: [{ refId: 'diretriz-dislipidemia-2023' }],
    lastUpdate: '2024-12'
  },
];

// =============================================================================
// ANTIBIÓTICOS
// =============================================================================

export const antibioticos: Partial<Medicamento>[] = [
  {
    id: 'amoxicilina',
    nomeGenerico: 'Amoxicilina',
    nomesComerciais: ['Amoxil', 'Novocilin'],
    classeTerapeutica: 'antibiotico',
    subclasse: 'penicilina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '500mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '50mg/mL', disponivelSUS: true },
    ],
    indicacoes: [
      'Infecções respiratórias (faringite, sinusite, otite, PAC)',
      'Infecções urinárias não complicadas',
      'Infecções de pele e tecidos moles',
      'Erradicação de H. pylori (associada)'
    ],
    mecanismoAcao: 'Betalactâmico bactericida. Inibe síntese da parede celular bacteriana.',
    posologias: [
      {
        indicacao: 'Infecções respiratórias',
        adultos: {
          dose: '500mg 8/8h ou 875mg 12/12h',
          frequencia: '8/8h ou 12/12h',
          doseMaxima: '3g/dia'
        },
        pediatrico: {
          dose: '25-50mg/kg/dia',
          frequencia: 'Dividido em 8/8h',
          doseMaxima: '3g/dia'
        }
      }
    ],
    contraindicacoes: ['Alergia a penicilinas', 'Mononucleose infecciosa (rash)'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas', 'Rash cutâneo'],
      graves: ['Anafilaxia', 'Colite pseudomembranosa']
    },
    interacoes: [
      { medicamento: 'Alopurinol', gravidade: 'moderada', efeito: 'Aumenta risco de rash', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['pneumonia', 'sinusite', 'ivas'],
    citations: [{ refId: 'sanford-2024' }],
    lastUpdate: '2024-12'
  },
  {
    id: 'azitromicina',
    nomeGenerico: 'Azitromicina',
    nomesComerciais: ['Zitromax', 'Astro'],
    classeTerapeutica: 'antibiotico',
    subclasse: 'macrolidio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '40mg/mL', disponivelSUS: true },
    ],
    indicacoes: [
      'PAC em alérgicos a penicilina',
      'PAC atípica (Mycoplasma, Chlamydia)',
      'IST (clamídia, gonorreia)',
      'Coqueluche'
    ],
    mecanismoAcao: 'Macrolídeo bacteriostático. Inibe síntese proteica bacteriana.',
    posologias: [
      {
        indicacao: 'Infecções respiratórias',
        adultos: {
          dose: '500mg no 1º dia, depois 250mg/dia por 4 dias',
          frequencia: '1x/dia',
          observacoes: 'Ou 500mg/dia por 3 dias'
        }
      },
      {
        indicacao: 'IST (clamídia)',
        adultos: {
          dose: '1g dose única',
          frequencia: 'Dose única'
        }
      }
    ],
    contraindicacoes: ['Alergia a macrolídeos', 'Uso de ergotamina'],
    precaucoes: ['QT longo', 'Arritmias', 'Uso com outros medicamentos que prolongam QT'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas', 'Dor abdominal'],
      graves: ['Prolongamento QT', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Antiarrítmicos classe III', gravidade: 'grave', efeito: 'Prolongamento QT', conduta: 'Evitar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['pneumonia'],
    citations: [{ refId: 'sanford-2024' }],
    lastUpdate: '2024-12'
  },
  {
    id: 'cefalexina',
    nomeGenerico: 'Cefalexina',
    nomesComerciais: ['Keflex', 'Cefalexin'],
    classeTerapeutica: 'antibiotico',
    subclasse: 'cefalosporina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '50mg/mL', disponivelSUS: true },
    ],
    indicacoes: [
      'Infecções de pele e tecidos moles (celulite, erisipela)',
      'Profilaxia de ITU recorrente',
      'Faringite estreptocócica'
    ],
    mecanismoAcao: 'Cefalosporina de 1ª geração. Bactericida, inibe síntese da parede celular.',
    posologias: [
      {
        indicacao: 'Infecções de pele',
        adultos: {
          dose: '500mg 6/6h',
          frequencia: '6/6h',
          doseMaxima: '4g/dia'
        }
      }
    ],
    contraindicacoes: ['Alergia a cefalosporinas', 'Alergia grave a penicilinas (anafilaxia)'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas'],
      graves: ['Anafilaxia (raro)', 'Colite por C. difficile']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: [],
    citations: [{ refId: 'sanford-2024' }],
    lastUpdate: '2024-12'
  },
  {
    id: 'sulfametoxazol-trimetoprima',
    nomeGenerico: 'Sulfametoxazol + Trimetoprima',
    nomesComerciais: ['Bactrim', 'Infectrin'],
    classeTerapeutica: 'antibiotico',
    subclasse: 'sulfonamida',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg+80mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '800mg+160mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '40mg+8mg/mL', disponivelSUS: true },
    ],
    indicacoes: [
      'ITU não complicada (2ª linha)',
      'Prostatite',
      'Profilaxia de pneumocistose em HIV',
      'Infecções por MRSA comunitário (pele)'
    ],
    mecanismoAcao: 'Inibe síntese de folato bacteriano em dois passos sequenciais.',
    posologias: [
      {
        indicacao: 'ITU',
        adultos: {
          dose: '800/160mg 12/12h por 3 dias (cistite) ou 7-14 dias (pielonefrite)',
          frequencia: '12/12h'
        }
      }
    ],
    contraindicacoes: ['Alergia a sulfonamidas', 'Gestação (1º e 3º trimestres)', 'Deficiência de G6PD'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Rash', 'Cefaleia'],
      graves: ['Stevens-Johnson', 'Necrólise epidérmica tóxica', 'Discrasias sanguíneas']
    },
    interacoes: [
      { medicamento: 'Warfarina', gravidade: 'moderada', efeito: 'Aumenta efeito anticoagulante', conduta: 'Monitorar INR' },
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Toxicidade hematológica', conduta: 'Evitar' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar em RN <2 meses, risco de kernicterus' },
    doencasRelacionadas: ['infeccao-urinaria'],
    citations: [{ refId: 'sanford-2024' }],
    lastUpdate: '2024-12'
  },
  {
    id: 'nitrofurantoina',
    nomeGenerico: 'Nitrofurantoína',
    nomesComerciais: ['Macrodantina'],
    classeTerapeutica: 'antibiotico',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: ['ITU não complicada (1ª linha)', 'Profilaxia de ITU recorrente'],
    mecanismoAcao: 'Antibiótico urinário. Danifica DNA bacteriano.',
    posologias: [
      {
        indicacao: 'Cistite aguda',
        adultos: {
          dose: '100mg 6/6h por 5 dias',
          frequencia: '6/6h'
        }
      },
      {
        indicacao: 'Profilaxia',
        adultos: {
          dose: '50-100mg à noite',
          frequencia: '1x/dia à noite'
        }
      }
    ],
    contraindicacoes: ['TFG <30', 'Gestação a termo (38-42 sem)', 'RN <1 mês'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Anorexia', 'Urina escurecida'],
      graves: ['Neuropatia periférica', 'Fibrose pulmonar (uso prolongado)']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível, evitar se RN <1 mês ou G6PD' },
    doencasRelacionadas: ['infeccao-urinaria'],
    citations: [{ refId: 'sanford-2024' }],
    lastUpdate: '2024-12'
  },
];

// =============================================================================
// ANTIDEPRESSIVOS
// =============================================================================

export const antidepressivos: Partial<Medicamento>[] = [
  {
    id: 'fluoxetina',
    nomeGenerico: 'Fluoxetina',
    nomesComerciais: ['Prozac', 'Daforin'],
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: true },
    ],
    indicacoes: [
      'Transtorno depressivo maior',
      'Transtorno de ansiedade generalizada',
      'TOC',
      'Bulimia nervosa',
      'Transtorno do pânico'
    ],
    mecanismoAcao: 'Inibidor seletivo da recaptação de serotonina (ISRS).',
    posologias: [
      {
        indicacao: 'Depressão',
        adultos: {
          dose: '20mg/dia pela manhã',
          frequencia: '1x/dia pela manhã',
          doseMaxima: '80mg/dia',
          observacoes: 'Efeito antidepressivo leva 2-4 semanas'
        }
      }
    ],
    contraindicacoes: ['Uso de IMAO (aguardar 14 dias)', 'Uso de pimozida', 'Uso de tioridazina'],
    precaucoes: ['Ideação suicida (monitorar no início)', 'Mania/hipomania', 'Epilepsia'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Insônia', 'Ansiedade inicial', 'Disfunção sexual', 'Cefaleia'],
      graves: ['Síndrome serotoninérgica', 'Sangramento GI', 'Hiponatremia']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Intervalo de 14 dias' },
      { medicamento: 'Tramadol', gravidade: 'grave', efeito: 'Risco de convulsão e síndrome serotoninérgica', conduta: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível, monitorar RN' },
    doencasRelacionadas: ['depressao', 'ansiedade'],
    citations: [{ refId: 'canmat-2024' }],
    lastUpdate: '2024-12'
  },
  {
    id: 'sertralina',
    nomeGenerico: 'Sertralina',
    nomesComerciais: ['Zoloft', 'Tolrest'],
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Depressão',
      'TAG',
      'TEPT',
      'TOC',
      'Pânico',
      'Fobia social'
    ],
    mecanismoAcao: 'ISRS com ação dopaminérgica leve.',
    posologias: [
      {
        indicacao: 'Depressão/ansiedade',
        adultos: {
          dose: 'Iniciar 50mg/dia, aumentar se necessário',
          frequencia: '1x/dia (manhã ou noite)',
          doseMaxima: '200mg/dia'
        }
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'Uso de pimozida', 'Uso concomitante de dissulfiram (formulação líquida contém álcool)'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Diarreia', 'Insônia', 'Disfunção sexual'],
      graves: ['Síndrome serotoninérgica', 'Sangramento']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Intervalo de 14 dias' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Preferível entre ISRS na amamentação' },
    doencasRelacionadas: ['depressao', 'ansiedade'],
    citations: [{ refId: 'canmat-2024' }],
    lastUpdate: '2024-12'
  },
  {
    id: 'amitriptilina',
    nomeGenerico: 'Amitriptilina',
    nomesComerciais: ['Tryptanol', 'Amytril'],
    classeTerapeutica: 'antidepressivo',
    subclasse: 'triciclico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Depressão (2ª linha)',
      'Dor neuropática',
      'Enxaqueca profilaxia',
      'Cefaleia tensional profilaxia',
      'Insônia'
    ],
    mecanismoAcao: 'Antidepressivo tricíclico. Inibe recaptação de noradrenalina e serotonina.',
    posologias: [
      {
        indicacao: 'Dor neuropática / profilaxia enxaqueca',
        adultos: {
          dose: '10-25mg à noite, aumentar gradualmente',
          frequencia: '1x/dia à noite',
          doseMaxima: '75mg/dia (dor) ou 150mg/dia (depressão)'
        }
      }
    ],
    contraindicacoes: ['IAM recente', 'Uso de IMAO', 'Glaucoma de ângulo fechado', 'Arritmias'],
    precaucoes: ['Idosos (efeitos anticolinérgicos)', 'Retenção urinária', 'Constipação'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Boca seca', 'Constipação', 'Ganho de peso', 'Visão turva'],
      graves: ['Arritmias', 'Retenção urinária', 'Íleo paralítico']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Crise hipertensiva', conduta: 'Intervalo de 14 dias' },
      { medicamento: 'Outros anticolinérgicos', gravidade: 'moderada', efeito: 'Potencialização', conduta: 'Monitorar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível, preferir ISRS' },
    doencasRelacionadas: ['depressao', 'cefaleia-tensional', 'enxaqueca'],
    citations: [{ refId: 'canmat-2024' }],
    lastUpdate: '2024-12'
  },
];

// =============================================================================
// ANALGÉSICOS E ANTI-INFLAMATÓRIOS
// =============================================================================

export const analgesicos: Partial<Medicamento>[] = [
  {
    id: 'paracetamol',
    nomeGenerico: 'Paracetamol (Acetaminofeno)',
    nomesComerciais: ['Tylenol', 'Dorflex'],
    classeTerapeutica: 'analgesico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '750mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '200mg/mL', disponivelSUS: true },
    ],
    indicacoes: ['Dor leve a moderada', 'Febre', 'Cefaleia'],
    mecanismoAcao: 'Inibe COX central. Analgésico e antipirético sem ação anti-inflamatória significativa.',
    posologias: [
      {
        indicacao: 'Dor/febre',
        adultos: {
          dose: '500-1000mg 4/4h ou 6/6h',
          frequencia: '4/4h ou 6/6h',
          doseMaxima: '4g/dia (3g/dia se hepatopatia ou alcoolismo)',
        },
        pediatrico: {
          dose: '10-15mg/kg/dose',
          frequencia: '4/4h ou 6/6h',
          doseMaxima: '75mg/kg/dia'
        }
      }
    ],
    contraindicacoes: ['Doença hepática grave'],
    precaucoes: ['Alcoolismo (dose máx 2g/dia)', 'Desnutrição'],
    efeitosAdversos: {
      comuns: ['Raros em doses terapêuticas'],
      graves: ['Hepatotoxicidade (overdose)']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Pode aumentar INR com uso prolongado', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Analgésico de escolha' },
    doencasRelacionadas: ['lombalgia', 'cefaleia-tensional'],
    citations: [{ refId: 'uptodate-2024' }],
    lastUpdate: '2024-12'
  },
  {
    id: 'dipirona',
    nomeGenerico: 'Dipirona sódica (Metamizol)',
    nomesComerciais: ['Novalgina', 'Anador'],
    classeTerapeutica: 'analgesico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '500mg/mL', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '500mg/mL', disponivelSUS: true },
    ],
    indicacoes: ['Dor moderada a intensa', 'Febre', 'Cólica renal/biliar'],
    mecanismoAcao: 'Derivado pirazolônico. Analgésico e antipirético potente.',
    posologias: [
      {
        indicacao: 'Dor/febre',
        adultos: {
          dose: '500-1000mg 6/6h',
          frequencia: '6/6h',
          doseMaxima: '4g/dia'
        }
      }
    ],
    contraindicacoes: ['Alergia a pirazolônicos', 'Porfiria', 'Deficiência de G6PD'],
    efeitosAdversos: {
      comuns: ['Hipotensão (IV rápido)'],
      graves: ['Agranulocitose (raro)', 'Anafilaxia']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Evitar uso prolongado' },
    doencasRelacionadas: ['lombalgia'],
    citations: [{ refId: 'uptodate-2024' }],
    lastUpdate: '2024-12'
  },
  {
    id: 'ibuprofeno',
    nomeGenerico: 'Ibuprofeno',
    nomesComerciais: ['Advil', 'Alivium'],
    classeTerapeutica: 'anti_inflamatorio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '600mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '50mg/mL', disponivelSUS: true },
    ],
    indicacoes: ['Dor leve a moderada', 'Febre', 'Inflamação', 'Dismenorreia'],
    mecanismoAcao: 'AINE não seletivo. Inibe COX-1 e COX-2.',
    posologias: [
      {
        indicacao: 'Dor/inflamação',
        adultos: {
          dose: '400-600mg 6/6h ou 8/8h',
          frequencia: '6/6h ou 8/8h',
          doseMaxima: '2400mg/dia (por curto período)'
        }
      }
    ],
    contraindicacoes: [
      'Úlcera péptica ativa',
      'Sangramento GI',
      'DRC estágio 4-5',
      '3º trimestre gestação',
      'Cirurgia de revascularização miocárdica recente'
    ],
    precaucoes: ['Idosos', 'HAS', 'IC', 'Uso de anticoagulantes'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Náuseas', 'Dor abdominal'],
      graves: ['Sangramento GI', 'IRA', 'Eventos CV']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'moderada', efeito: 'Aumento risco sangramento', conduta: 'Evitar ou monitorar' },
      { medicamento: 'IECA/BRA', gravidade: 'moderada', efeito: 'Reduz efeito anti-hipertensivo, risco de IRA', conduta: 'Monitorar PA e função renal' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível por curto período' },
    doencasRelacionadas: ['lombalgia'],
    citations: [{ refId: 'uptodate-2024' }],
    lastUpdate: '2024-12'
  },
];

// =============================================================================
// BRONCODILATADORES E CORTICOIDES INALATÓRIOS
// =============================================================================

export const respiratorios: Partial<Medicamento>[] = [
  {
    id: 'salbutamol',
    nomeGenerico: 'Salbutamol (Albuterol)',
    nomesComerciais: ['Aerolin'],
    classeTerapeutica: 'broncodilatador',
    rename: true,
    apresentacoes: [
      { forma: 'inalatorio', concentracao: '100mcg/dose', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '5mg/mL para nebulização', disponivelSUS: true },
    ],
    indicacoes: ['Asma - resgate', 'DPOC - resgate', 'Broncoespasmo'],
    mecanismoAcao: 'Beta-2 agonista de curta duração (SABA). Broncodilatação rápida.',
    posologias: [
      {
        indicacao: 'Resgate',
        adultos: {
          dose: '2-4 jatos (200-400mcg) SOS',
          frequencia: 'SOS, máx 4/4h',
          observacoes: 'Se precisar >2x/semana: asma não controlada'
        }
      }
    ],
    contraindicacoes: [],
    efeitosAdversos: {
      comuns: ['Tremor', 'Taquicardia', 'Palpitações'],
      graves: ['Arritmias (raro)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['asma', 'dpoc'],
    citations: [{ refId: 'gina-2024' }],
    lastUpdate: '2024-12'
  },
  {
    id: 'beclometasona',
    nomeGenerico: 'Beclometasona',
    nomesComerciais: ['Clenil'],
    classeTerapeutica: 'corticoide',
    rename: true,
    apresentacoes: [
      { forma: 'inalatorio', concentracao: '50mcg/dose', disponivelSUS: true },
      { forma: 'inalatorio', concentracao: '250mcg/dose', disponivelSUS: true },
    ],
    indicacoes: ['Asma - manutenção', 'Rinite alérgica'],
    mecanismoAcao: 'Corticoide inalatório. Anti-inflamatório tópico nas vias aéreas.',
    posologias: [
      {
        indicacao: 'Asma',
        adultos: {
          dose: 'Baixa dose: 100-200mcg/dia\nMédia: 200-400mcg/dia\nAlta: >400mcg/dia',
          frequencia: '12/12h',
        }
      }
    ],
    contraindicacoes: [],
    precaucoes: ['Enxaguar boca após uso (candidíase)'],
    efeitosAdversos: {
      comuns: ['Candidíase oral', 'Rouquidão'],
      graves: ['Supressão adrenal (doses altas prolongadas)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    orientacoesPaciente: [
      'Enxaguar a boca após cada uso',
      'Usar espaçador',
      'Não usar para crises'
    ],
    doencasRelacionadas: ['asma'],
    citations: [{ refId: 'gina-2024' }],
    lastUpdate: '2024-12'
  },
];

// =============================================================================
// IBPs E ANTIÁCIDOS
// =============================================================================

export const gastricos: Partial<Medicamento>[] = [
  {
    id: 'omeprazol',
    nomeGenerico: 'Omeprazol',
    nomesComerciais: ['Losec', 'Peprazol'],
    classeTerapeutica: 'inibidor_bomba_protonica',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: true },
    ],
    indicacoes: ['DRGE', 'Úlcera péptica', 'Erradicação de H. pylori', 'Profilaxia de úlcera por AINE'],
    mecanismoAcao: 'Inibidor da bomba de prótons. Suprime secreção ácida gástrica.',
    posologias: [
      {
        indicacao: 'DRGE/Úlcera',
        adultos: {
          dose: '20mg 1x/dia em jejum por 4-8 semanas',
          frequencia: '1x/dia em jejum (30 min antes do café)',
        }
      }
    ],
    contraindicacoes: [],
    precaucoes: ['Uso prolongado: risco de deficiência B12, Mg, fraturas'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Diarreia', 'Náuseas'],
      graves: ['Nefrite intersticial', 'Colite por C. difficile']
    },
    interacoes: [
      { medicamento: 'Clopidogrel', gravidade: 'moderada', efeito: 'Reduz ativação do clopidogrel', conduta: 'Preferir pantoprazol' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['drge', 'gastrite'],
    citations: [{ refId: 'uptodate-2024' }],
    lastUpdate: '2024-12'
  },
];

// =============================================================================
// ANTI-HIPERTENSIVOS ADICIONAIS
// =============================================================================

export const antiHipertensivosAdicionais: Partial<Medicamento>[] = [
  {
    id: 'hidroclorotiazida',
    nomeGenerico: 'Hidroclorotiazida',
    nomesComerciais: ['Clorana', 'Drenol'],
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'diuretico_tiazidico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
    ],
    indicacoes: ['Hipertensão arterial', 'Edema leve'],
    mecanismoAcao: 'Diurético tiazídico. Inibe reabsorção de sódio no túbulo distal.',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: {
          dose: '12,5-25mg/dia',
          frequencia: '1x/dia pela manhã',
          doseMaxima: '50mg/dia (pouco benefício adicional)'
        }
      }
    ],
    contraindicacoes: ['Anúria', 'Alergia a sulfonamidas'],
    efeitosAdversos: {
      comuns: ['Hipocalemia', 'Hiperuricemia', 'Hiperglicemia'],
      graves: ['Arritmias (por hipocalemia)']
    },
    interacoes: [
      { medicamento: 'Lítio', gravidade: 'grave', efeito: 'Aumenta níveis de lítio', conduta: 'Monitorar litemia' }
    ],
    monitorizacao: ['Potássio', 'Sódio', 'Creatinina', 'Ácido úrico', 'Glicemia'],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Pode reduzir produção de leite' },
    doencasRelacionadas: ['hipertensao-arterial'],
    citations: [{ refId: 'sbc-has-2020' }],
    lastUpdate: '2024-12'
  },
  {
    id: 'atenolol',
    nomeGenerico: 'Atenolol',
    nomesComerciais: ['Atenol', 'Ablok'],
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
    ],
    indicacoes: ['Hipertensão', 'Angina estável', 'Arritmias', 'Pós-IAM'],
    mecanismoAcao: 'Betabloqueador beta-1 seletivo. Reduz FC e débito cardíaco.',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: {
          dose: '25-50mg 1x/dia',
          frequencia: '1x/dia',
          doseMaxima: '100mg/dia'
        }
      }
    ],
    contraindicacoes: ['Bradicardia severa', 'BAV 2º/3º grau', 'Asma grave', 'IC descompensada'],
    efeitosAdversos: {
      comuns: ['Bradicardia', 'Fadiga', 'Extremidades frias', 'Disfunção erétil'],
      graves: ['Broncoespasmo', 'Bloqueio AV']
    },
    interacoes: [
      { medicamento: 'Verapamil/Diltiazem', gravidade: 'grave', efeito: 'Bradicardia severa', conduta: 'Evitar associação' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Monitorar RN (bradicardia)' },
    doencasRelacionadas: ['hipertensao-arterial', 'fibrilacao-atrial'],
    citations: [{ refId: 'sbc-has-2020' }],
    lastUpdate: '2024-12'
  },
  {
    id: 'propranolol',
    nomeGenerico: 'Propranolol',
    nomesComerciais: ['Inderal'],
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: false },
    ],
    indicacoes: ['Hipertensão', 'Tremor essencial', 'Profilaxia de enxaqueca', 'Ansiedade', 'Hipertireoidismo'],
    mecanismoAcao: 'Betabloqueador não seletivo.',
    posologias: [
      {
        indicacao: 'Profilaxia enxaqueca',
        adultos: {
          dose: '40-80mg 2-3x/dia',
          frequencia: '2-3x/dia',
          doseMaxima: '240mg/dia'
        }
      }
    ],
    contraindicacoes: ['Asma', 'DPOC grave', 'Bradicardia severa', 'BAV'],
    efeitosAdversos: {
      comuns: ['Fadiga', 'Bradicardia', 'Broncoespasmo', 'Extremidades frias'],
      graves: ['Broncoespasmo severo']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Monitorar RN' },
    doencasRelacionadas: ['enxaqueca', 'ansiedade'],
    citations: [{ refId: 'uptodate-2024' }],
    lastUpdate: '2024-12'
  },
];

// =============================================================================
// HORMÔNIOS
// =============================================================================

export const hormonios: Partial<Medicamento>[] = [
  {
    id: 'levotiroxina',
    nomeGenerico: 'Levotiroxina sódica',
    nomesComerciais: ['Puran T4', 'Euthyrox'],
    classeTerapeutica: 'hormonio_tireoide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mcg', disponivelSUS: true },
    ],
    indicacoes: ['Hipotireoidismo', 'Supressão de TSH em câncer de tireoide'],
    mecanismoAcao: 'Hormônio tireoidiano sintético (T4).',
    posologias: [
      {
        indicacao: 'Hipotireoidismo',
        adultos: {
          dose: 'Adultos jovens: 1,6 mcg/kg/dia\nIdosos/cardiopatas: iniciar 12,5-25mcg/dia',
          frequencia: '1x/dia em jejum (30-60min antes do café)',
          observacoes: 'Ajustar a cada 4-6 semanas conforme TSH'
        }
      }
    ],
    contraindicacoes: ['Tireotoxicose não tratada', 'IAM recente', 'Insuficiência adrenal não tratada'],
    efeitosAdversos: {
      comuns: ['Geralmente bem tolerada em doses adequadas'],
      graves: ['Arritmias (se dose excessiva)', 'Osteoporose (supressão prolongada)']
    },
    interacoes: [
      { medicamento: 'Carbonato de cálcio', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar 4h' },
      { medicamento: 'Sulfato ferroso', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar 4h' }
    ],
    monitorizacao: ['TSH a cada 4-6 semanas até estabilizar, depois anual'],
    orientacoesPaciente: [
      'Tomar em jejum, 30-60min antes do café',
      'Manter mesma marca (bioequivalência)',
      'Não interromper sem orientação'
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Segura' },
    doencasRelacionadas: ['hipotireoidismo'],
    citations: [{ refId: 'ata-2024' }],
    lastUpdate: '2024-12'
  },
];

// =============================================================================
// ANTI-HISTAMÍNICOS
// =============================================================================

export const antiHistaminicos: Partial<Medicamento>[] = [
  {
    id: 'loratadina',
    nomeGenerico: 'Loratadina',
    nomesComerciais: ['Claritin', 'Loralerg'],
    classeTerapeutica: 'anti_histaminico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '1mg/mL', disponivelSUS: true },
    ],
    indicacoes: ['Rinite alérgica', 'Urticária', 'Prurido'],
    mecanismoAcao: 'Anti-histamínico H1 de 2ª geração. Não sedativo.',
    posologias: [
      {
        indicacao: 'Rinite/Urticária',
        adultos: {
          dose: '10mg 1x/dia',
          frequencia: '1x/dia'
        },
        pediatrico: {
          dose: '2-5 anos: 5mg/dia; >6 anos: 10mg/dia',
          frequencia: '1x/dia'
        }
      }
    ],
    contraindicacoes: [],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Sonolência (raro)', 'Boca seca'],
      graves: []
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['rinite-alergica'],
    citations: [{ refId: 'uptodate-2024' }],
    lastUpdate: '2024-12'
  },
];

// =============================================================================
// CONSOLIDAÇÃO
// =============================================================================

export const medicamentosExpanded: Partial<Medicamento>[] = [
  ...antidiabeticos,
  ...hipolipemiantes,
  ...antibioticos,
  ...antidepressivos,
  ...analgesicos,
  ...respiratorios,
  ...gastricos,
  ...antiHipertensivosAdicionais,
  ...hormonios,
  ...antiHistaminicos,
];

// Total: ~30 novos medicamentos + 9 existentes = ~39 medicamentos

