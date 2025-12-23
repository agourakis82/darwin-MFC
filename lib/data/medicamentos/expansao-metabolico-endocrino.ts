/**
 * EXPANSÃO METABÓLICO/ENDÓCRINO - DARWIN-MFC
 * ==========================================
 *
 * Medicamentos para diabetes, tireoide e outras condições metabólicas
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosMetabolicoEndocrino: Partial<Medicamento>[] = [
  // ============================================================================
  // ANTIDIABÉTICOS ORAIS - BIGUANIDAS
  // ============================================================================
  {
    id: 'metformina',
    nomeGenerico: 'Metformina',
    nomesComerciais: ['Glifage', 'Glucoformin', 'Dimefor'],
    atcCode: 'A10BA02',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'biguanida',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '850mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg XR', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '750mg XR', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '1000mg XR', disponivelSUS: false }
    ],
    indicacoes: [
      'Diabetes mellitus tipo 2 (1ª linha)',
      'Pré-diabetes (prevenção)',
      'SOP (off-label)'
    ],
    mecanismoAcao: 'Reduz produção hepática de glicose, aumenta sensibilidade periférica à insulina, reduz absorção intestinal de glicose.',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '500-850mg', frequencia: 'Iniciar 1x/dia com refeição, titular a cada 1-2 semanas', doseMaxima: '2550mg/dia' }
      }
    ],
    contraindicacoes: ['TFG <30mL/min', 'Acidose metabólica', 'Insuficiência hepática grave', 'Uso de contraste iodado'],
    precaucoes: ['Suspender 48h antes e após contraste iodado', 'Suspender em cirurgias/jejum prolongado'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Diarreia', 'Dor abdominal', 'Gosto metálico'],
      graves: ['Acidose lática (rara)', 'Deficiência de B12 (uso prolongado)']
    },
    interacoes: [
      { medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Risco de acidose lática', conduta: 'Evitar consumo excessivo' },
      { medicamento: 'Contraste iodado', gravidade: 'grave', efeito: 'IRA e acidose lática', conduta: 'Suspender 48h antes e após' }
    ],
    ajusteDoseRenal: [
      { tfg: '30-45', ajuste: 'Máximo 1000mg/dia, não iniciar se ClCr<45' },
      { tfg: '<30', ajuste: 'Contraindicado' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },

  // ============================================================================
  // ANTIDIABÉTICOS - SULFONILUREIAS
  // ============================================================================
  {
    id: 'gliclazida',
    nomeGenerico: 'Gliclazida',
    nomesComerciais: ['Diamicron', 'Azukon'],
    atcCode: 'A10BB09',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'sulfonilureia',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '30mg MR', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '60mg MR', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: true }
    ],
    indicacoes: ['Diabetes mellitus tipo 2'],
    mecanismoAcao: 'Estimula secreção de insulina pelas células beta pancreáticas. Sulfonilureia de 2ª geração com menor risco de hipoglicemia.',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '30-120mg MR', frequencia: '1x/dia no café da manhã', doseMaxima: '120mg/dia' }
      }
    ],
    contraindicacoes: ['DM1', 'Cetoacidose', 'Gravidez', 'DRC grave (ClCr<15)'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Ganho de peso', 'Náuseas'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [
      { medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Hipoglicemia', conduta: 'Evitar' },
      { medicamento: 'Betabloqueadores', gravidade: 'leve', efeito: 'Mascara sintomas de hipoglicemia', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [
      { tfg: '<15', ajuste: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },
  {
    id: 'glimepirida',
    nomeGenerico: 'Glimepirida',
    nomesComerciais: ['Amaryl', 'Glimepil'],
    atcCode: 'A10BB12',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'sulfonilureia',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: false }
    ],
    indicacoes: ['DM2'],
    mecanismoAcao: 'Sulfonilureia de 3ª geração. Dose única diária.',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '1-4mg', frequencia: '1x/dia no café', doseMaxima: '8mg/dia' }
      }
    ],
    contraindicacoes: ['DM1', 'Cetoacidose'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Ganho de peso'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },

  // ============================================================================
  // ANTIDIABÉTICOS - iDPP4
  // ============================================================================
  {
    id: 'sitagliptina',
    nomeGenerico: 'Sitagliptina',
    nomesComerciais: ['Januvia'],
    atcCode: 'A10BH01',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'idpp4',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false }
    ],
    indicacoes: ['DM2 (monoterapia ou associação)'],
    mecanismoAcao: 'Inibe DPP-4, aumentando níveis de GLP-1 e GIP endógenos. Efeito glicose-dependente (baixo risco de hipoglicemia).',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '100mg', frequencia: '1x/dia', observacoes: 'Independente de refeições' }
      }
    ],
    contraindicacoes: ['Pancreatite prévio'],
    efeitosAdversos: {
      comuns: ['Nasofaringite', 'Cefaleia'],
      graves: ['Pancreatite aguda', 'Angioedema']
    },
    interacoes: [],
    ajusteDoseRenal: [
      { tfg: '30-50', ajuste: '50mg/dia' },
      { tfg: '<30', ajuste: '25mg/dia' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },
  {
    id: 'vildagliptina',
    nomeGenerico: 'Vildagliptina',
    nomesComerciais: ['Galvus'],
    atcCode: 'A10BH02',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'idpp4',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false }
    ],
    indicacoes: ['DM2'],
    mecanismoAcao: 'Inibidor de DPP-4.',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '50mg', frequencia: '1-2x/dia' }
      }
    ],
    contraindicacoes: ['Insuficiência hepática', 'Pancreatite'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Tremor'],
      graves: ['Hepatotoxicidade', 'Pancreatite']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },

  // ============================================================================
  // ANTIDIABÉTICOS - iSGLT2
  // ============================================================================
  {
    id: 'dapagliflozina',
    nomeGenerico: 'Dapagliflozina',
    nomesComerciais: ['Forxiga'],
    atcCode: 'A10BK01',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'isglt2',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false }
    ],
    indicacoes: [
      'DM2',
      'Insuficiência cardíaca (com ou sem DM)',
      'DRC (com ou sem DM)'
    ],
    mecanismoAcao: 'Inibe SGLT2 no túbulo proximal, aumentando excreção urinária de glicose. Benefícios cardiorrenal independentes do controle glicêmico.',
    posologias: [
      {
        indicacao: 'DM2/IC/DRC',
        adultos: { dose: '10mg', frequencia: '1x/dia pela manhã' }
      }
    ],
    contraindicacoes: ['DM1', 'ClCr<25 (para início em DM)', 'Cetoacidose'],
    precaucoes: ['Risco de cetoacidose euglicêmica', 'ITU/candidíase genital', 'Hipotensão postural'],
    efeitosAdversos: {
      comuns: ['ITU', 'Candidíase genital', 'Poliúria', 'Hipotensão'],
      graves: ['Cetoacidose diabética euglicêmica', 'Gangrena de Fournier (raro)', 'Amputações (controvérsia)']
    },
    interacoes: [
      { medicamento: 'Diuréticos de alça', gravidade: 'moderada', efeito: 'Hipotensão/desidratação', conduta: 'Ajustar dose do diurético' },
      { medicamento: 'Insulina/Sulfonilureias', gravidade: 'moderada', efeito: 'Hipoglicemia', conduta: 'Reduzir dose' }
    ],
    ajusteDoseRenal: [
      { tfg: '25-45', ajuste: 'Pode manter para benefício cardiorrenal (não iniciar para controle glicêmico)' },
      { tfg: '<25', ajuste: 'Não iniciar; pode manter se já em uso e TFG≥15' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  },
  {
    id: 'empagliflozina',
    nomeGenerico: 'Empagliflozina',
    nomesComerciais: ['Jardiance'],
    atcCode: 'A10BK03',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'isglt2',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: false }
    ],
    indicacoes: ['DM2', 'IC com FE reduzida', 'DRC'],
    mecanismoAcao: 'iSGLT2 com evidência robusta em redução de morte CV (EMPA-REG).',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '10-25mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['DM1', 'Cetoacidose'],
    efeitosAdversos: {
      comuns: ['ITU', 'Candidíase'],
      graves: ['Cetoacidose euglicêmica', 'Gangrena de Fournier']
    },
    interacoes: [],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  },

  // ============================================================================
  // ANTIDIABÉTICOS - AGONISTAS GLP-1
  // ============================================================================
  {
    id: 'liraglutida',
    nomeGenerico: 'Liraglutida',
    nomesComerciais: ['Victoza', 'Saxenda'],
    atcCode: 'A10BJ02',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'glp1',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '6mg/mL caneta', disponivelSUS: false }
    ],
    indicacoes: [
      'DM2',
      'Obesidade (Saxenda 3mg)'
    ],
    mecanismoAcao: 'Análogo do GLP-1. Estimula secreção de insulina glicose-dependente, reduz glucagon, retarda esvaziamento gástrico, promove saciedade.',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '0,6mg SC', frequencia: 'Iniciar, aumentar para 1,2-1,8mg/dia após 1 semana' }
      },
      {
        indicacao: 'Obesidade',
        adultos: { dose: '0,6mg', frequencia: 'Aumentar semanalmente até 3mg/dia' }
      }
    ],
    contraindicacoes: ['Carcinoma medular de tireoide pessoal/familiar', 'NEM 2', 'Pancreatite'],
    efeitosAdversos: {
      comuns: ['Náuseas (principais)', 'Vômitos', 'Diarreia', 'Cefaleia'],
      graves: ['Pancreatite', 'Câncer medular de tireoide (precaução teórica)']
    },
    interacoes: [
      { medicamento: 'Insulina/Sulfonilureias', gravidade: 'moderada', efeito: 'Hipoglicemia', conduta: 'Reduzir dose' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },
  {
    id: 'semaglutida',
    nomeGenerico: 'Semaglutida',
    nomesComerciais: ['Ozempic', 'Wegovy', 'Rybelsus'],
    atcCode: 'A10BJ06',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'glp1',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '0,25mg; 0,5mg; 1mg; 2mg caneta', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '3mg; 7mg; 14mg (Rybelsus)', disponivelSUS: false }
    ],
    indicacoes: ['DM2', 'Obesidade', 'Prevenção CV em DM2 de alto risco'],
    mecanismoAcao: 'Agonista GLP-1 de longa ação (1x/semana SC ou 1x/dia VO). Redução de peso significativa.',
    posologias: [
      {
        indicacao: 'DM2 (SC)',
        adultos: { dose: '0,25mg/semana', frequencia: 'Aumentar a cada 4 semanas: 0,5mg → 1mg → 2mg' }
      },
      {
        indicacao: 'DM2 (VO)',
        adultos: { dose: '3mg/dia por 30 dias', frequencia: 'Depois 7mg/dia, até 14mg/dia', observacoes: 'Tomar em jejum com água, 30min antes de alimentos' }
      }
    ],
    contraindicacoes: ['CMT/NEM2', 'Pancreatite prévia'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Vômitos', 'Diarreia', 'Constipação'],
      graves: ['Pancreatite', 'Retinopatia (piora transitória)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },

  // ============================================================================
  // INSULINAS
  // ============================================================================
  {
    id: 'insulina-glargina',
    nomeGenerico: 'Insulina Glargina',
    nomesComerciais: ['Lantus', 'Basaglar', 'Toujeo'],
    atcCode: 'A10AE04',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '100U/mL caneta', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '300U/mL (Toujeo)', disponivelSUS: false }
    ],
    indicacoes: ['DM1', 'DM2 com necessidade de insulina basal'],
    mecanismoAcao: 'Análogo de insulina de ação prolongada (basal). Forma microprecipitados SC de absorção lenta. Duração ~24h.',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '10U', frequencia: '1x/dia (mesmo horário), titular 2U a cada 3 dias até GJ alvo' }
      },
      {
        indicacao: 'DM1',
        adultos: { dose: '~50% da dose total', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Hipoglicemia'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Ganho de peso', 'Lipodistrofia no local'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'leve', efeito: 'Mascara hipoglicemia', conduta: 'Orientar paciente' },
      { medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Hipoglicemia', conduta: 'Cautela' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },
  {
    id: 'insulina-detemir',
    nomeGenerico: 'Insulina Detemir',
    nomesComerciais: ['Levemir'],
    atcCode: 'A10AE05',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '100U/mL', disponivelSUS: false }
    ],
    indicacoes: ['DM1', 'DM2'],
    mecanismoAcao: 'Análogo basal com ligação à albumina. Duração ~16-24h.',
    posologias: [
      {
        indicacao: 'DM',
        adultos: { dose: '10U', frequencia: '1-2x/dia' }
      }
    ],
    contraindicacoes: ['Hipoglicemia'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Ganho de peso'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },
  {
    id: 'insulina-asparte',
    nomeGenerico: 'Insulina Asparte',
    nomesComerciais: ['NovoRapid', 'Fiasp'],
    atcCode: 'A10AB05',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '100U/mL', disponivelSUS: false }
    ],
    indicacoes: ['DM1', 'DM2 (bolus prandial)'],
    mecanismoAcao: 'Análogo de ação rápida. Início em 10-20min, pico 1-3h, duração 3-5h.',
    posologias: [
      {
        indicacao: 'DM',
        adultos: { dose: 'Individualizada', frequencia: '0-15min antes das refeições' }
      }
    ],
    contraindicacoes: ['Hipoglicemia'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },
  {
    id: 'insulina-lispro',
    nomeGenerico: 'Insulina Lispro',
    nomesComerciais: ['Humalog'],
    atcCode: 'A10AB04',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '100U/mL', disponivelSUS: false }
    ],
    indicacoes: ['DM1', 'DM2 (bolus)'],
    mecanismoAcao: 'Análogo de ação ultrarrápida.',
    posologias: [
      {
        indicacao: 'DM',
        adultos: { dose: 'Individualizada', frequencia: 'Imediatamente antes das refeições' }
      }
    ],
    contraindicacoes: ['Hipoglicemia'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },

  // ============================================================================
  // HORMÔNIOS TIREOIDIANOS
  // ============================================================================
  {
    id: 'levotiroxina-completa',
    nomeGenerico: 'Levotiroxina (T4)',
    nomesComerciais: ['Puran T4', 'Euthyrox', 'Synthroid'],
    atcCode: 'H03AA01',
    classeTerapeutica: 'hormonio_tireoide',
    subclasse: 'tireoidiano',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '75mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '88mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '100mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '112mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '125mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '150mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '175mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '200mcg', disponivelSUS: false }
    ],
    indicacoes: [
      'Hipotireoidismo primário e secundário',
      'Supressão de TSH (câncer de tireoide)',
      'Bócio não tóxico'
    ],
    mecanismoAcao: 'Hormônio tireoidiano sintético (T4). Convertido em T3 ativo nos tecidos. Regula metabolismo celular.',
    posologias: [
      {
        indicacao: 'Hipotireoidismo',
        adultos: { dose: '1,6mcg/kg/dia', frequencia: 'Jejum, 30-60min antes do café', observacoes: 'Iniciar 25-50mcg em idosos/cardiopatas' },
        idosos: { dose: '12,5-25mcg', observacoes: 'Aumentar lentamente a cada 4-6 semanas' }
      }
    ],
    contraindicacoes: ['Tireotoxicose não tratada', 'IAM agudo', 'Insuficiência adrenal não tratada'],
    efeitosAdversos: {
      comuns: ['Geralmente por superdosagem: taquicardia, tremores, insônia, perda de peso'],
      graves: ['Arritmias', 'Angina', 'Osteoporose (supressão prolongada)']
    },
    interacoes: [
      { medicamento: 'Antiácidos/Ferro/Cálcio', gravidade: 'moderada', efeito: 'Redução da absorção', conduta: 'Espaçar 4h' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumento do efeito anticoagulante', conduta: 'Monitorar INR' },
      { medicamento: 'Rifampicina/Carbamazepina', gravidade: 'moderada', efeito: 'Redução de T4', conduta: 'Pode precisar aumentar dose' }
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível - essencial manter' }
  },

  // ============================================================================
  // ANTITIREOIDIANOS
  // ============================================================================
  {
    id: 'metimazol',
    nomeGenerico: 'Metimazol (Tiamazol)',
    nomesComerciais: ['Tapazol'],
    atcCode: 'H03BB02',
    classeTerapeutica: 'hormonio',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipertireoidismo (Doença de Graves)',
      'Preparo para tireoidectomia',
      'Tempestade tireoidiana'
    ],
    mecanismoAcao: 'Inibe a peroxidase tireoidiana, bloqueando a síntese de T3 e T4.',
    posologias: [
      {
        indicacao: 'Hipertireoidismo',
        adultos: { dose: '10-30mg', frequencia: '1x/dia ou dividido', observacoes: 'Titular conforme TSH/T4L' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade prévia', 'Agranulocitose prévia por tionamidas'],
    precaucoes: ['Monitorar hemograma (risco de agranulocitose)', 'Hepatotoxicidade'],
    efeitosAdversos: {
      comuns: ['Rash', 'Prurido', 'Artralgia', 'Náuseas'],
      graves: ['Agranulocitose (0,1-0,5%)', 'Hepatite', 'Vasculite']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Alteração do metabolismo', conduta: 'Monitorar INR' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível em baixas doses (<20mg/dia)' }
  },
  {
    id: 'propiltiouracil',
    nomeGenerico: 'Propiltiouracil (PTU)',
    nomesComerciais: ['Propiltiouracil'],
    atcCode: 'H03BA02',
    classeTerapeutica: 'hormonio',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipertireoidismo (preferido no 1º trimestre gestação)',
      'Tempestade tireoidiana',
      'Intolerância ao metimazol'
    ],
    mecanismoAcao: 'Inibe síntese de hormônios tireoidianos e conversão periférica de T4 em T3.',
    posologias: [
      {
        indicacao: 'Hipertireoidismo',
        adultos: { dose: '100-200mg', frequencia: '8/8h', observacoes: 'Doses altas na tempestade tireoidiana' }
      }
    ],
    contraindicacoes: ['Hepatotoxicidade prévia por PTU'],
    precaucoes: ['Hepatotoxicidade grave (monitorar função hepática)', 'Agranulocitose'],
    efeitosAdversos: {
      comuns: ['Rash', 'Artralgia'],
      graves: ['Hepatite fulminante', 'Agranulocitose', 'Vasculite ANCA+']
    },
    interacoes: [],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },

  // ============================================================================
  // CORTICOIDES SISTÊMICOS
  // ============================================================================
  {
    id: 'prednisona-completa',
    nomeGenerico: 'Prednisona',
    nomesComerciais: ['Meticorten', 'Predicorten'],
    atcCode: 'H02AB07',
    classeTerapeutica: 'corticoide',
    subclasse: 'corticosteroide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Doenças inflamatórias/autoimunes',
      'Asma aguda',
      'DPOC exacerbada',
      'Artrite reumatoide',
      'LES',
      'Doenças hematológicas'
    ],
    mecanismoAcao: 'Glicocorticoide sintético. Inibe fosfolipase A2, reduz citocinas, tem efeito imunossupressor.',
    posologias: [
      {
        indicacao: 'Anti-inflamatório/Imunossupressor',
        adultos: { dose: '5-60mg', frequencia: '1x/dia pela manhã ou dividido' }
      },
      {
        indicacao: 'Asma/DPOC exacerbada',
        adultos: { dose: '40-60mg', frequencia: '1x/dia por 5-7 dias' }
      }
    ],
    contraindicacoes: ['Infecções fúngicas sistêmicas não tratadas'],
    precaucoes: ['Não suspender abruptamente se uso >2 semanas', 'Monitorar glicemia, PA, osteoporose'],
    efeitosAdversos: {
      comuns: ['Hiperglicemia', 'Ganho de peso', 'Insônia', 'Edema'],
      graves: ['Osteoporose', 'Supressão adrenal', 'Infecções oportunistas', 'Necrose avascular']
    },
    interacoes: [
      { medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Aumento risco GI', conduta: 'IBP profilático' },
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Infecção vacinal', conduta: 'Contraindicado em doses altas' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível em baixas doses' }
  },
  {
    id: 'prednisolona',
    nomeGenerico: 'Prednisolona',
    nomesComerciais: ['Predsim', 'Prelone'],
    atcCode: 'H02AB06',
    classeTerapeutica: 'corticoide',
    subclasse: 'corticosteroide',
    rename: true,
    apresentacoes: [
      { forma: 'solucao_oral', concentracao: '3mg/mL', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true }
    ],
    indicacoes: ['Mesmas da prednisona', 'Preferido em crianças (solução) e hepatopatas (forma ativa)'],
    mecanismoAcao: 'Forma ativa da prednisona. Não requer conversão hepática.',
    posologias: [
      {
        indicacao: 'Asma infantil',
        adultos: { dose: '40-60mg', frequencia: '1x/dia por 3-5 dias' },
        pediatrico: { dose: '1-2mg/kg', frequencia: '1x/dia por 3-5 dias', doseMaxima: '60mg' }
      }
    ],
    contraindicacoes: ['Infecções fúngicas sistêmicas'],
    efeitosAdversos: {
      comuns: ['Mesmos da prednisona'],
      graves: ['Supressão adrenal', 'Osteoporose']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },

  // ============================================================================
  // MEDICAMENTOS PARA OBESIDADE
  // ============================================================================
  {
    id: 'orlistate',
    nomeGenerico: 'Orlistate',
    nomesComerciais: ['Xenical', 'Lipiblock'],
    atcCode: 'A08AB01',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '120mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '60mg', disponivelSUS: false }
    ],
    indicacoes: ['Obesidade (IMC≥30 ou ≥27 com comorbidades)'],
    mecanismoAcao: 'Inibe lipases gastrointestinais, reduzindo absorção de gordura em ~30%.',
    posologias: [
      {
        indicacao: 'Obesidade',
        adultos: { dose: '120mg', frequencia: 'Junto ou até 1h após refeições principais (3x/dia)' }
      }
    ],
    contraindicacoes: ['Colestase', 'Síndrome de má absorção crônica'],
    efeitosAdversos: {
      comuns: ['Esteatorreia', 'Urgência fecal', 'Flatulência com descarga oleosa', 'Incontinência fecal'],
      graves: ['Hepatotoxicidade (raro)', 'Nefrolitíase por oxalato']
    },
    interacoes: [
      { medicamento: 'Ciclosporina', gravidade: 'grave', efeito: 'Redução de ciclosporina', conduta: 'Espaçar 3h' },
      { medicamento: 'Levotiroxina', gravidade: 'moderada', efeito: 'Redução de absorção', conduta: 'Espaçar 4h' },
      { medicamento: 'Vitaminas lipossolúveis', gravidade: 'moderada', efeito: 'Redução de absorção', conduta: 'Suplementar separadamente' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  },

  // ============================================================================
  // MEDICAMENTOS PARA GOTA
  // ============================================================================
  {
    id: 'alopurinol-completo',
    nomeGenerico: 'Alopurinol',
    nomesComerciais: ['Zyloric', 'Alopurinol'],
    atcCode: 'M04AA01',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Gota crônica (prevenção)',
      'Hiperuricemia sintomática',
      'Prevenção de síndrome de lise tumoral',
      'Nefrolitíase por ácido úrico'
    ],
    mecanismoAcao: 'Inibe xantina oxidase, reduzindo a produção de ácido úrico.',
    posologias: [
      {
        indicacao: 'Gota crônica',
        adultos: { dose: '100mg', frequencia: 'Iniciar 1x/dia, aumentar 100mg a cada 2-4 semanas', doseMaxima: '800mg/dia', observacoes: 'Alvo: ácido úrico <6mg/dL' }
      }
    ],
    contraindicacoes: ['Crise aguda de gota (não iniciar durante crise)'],
    precaucoes: ['Iniciar com colchicina ou AINE para profilaxia de flare', 'Síndrome de hipersensibilidade ao alopurinol (DRESS)'],
    efeitosAdversos: {
      comuns: ['Rash', 'Flare de gota ao início'],
      graves: ['DRESS/SJS/NET', 'Hepatotoxicidade', 'Vasculite']
    },
    interacoes: [
      { medicamento: 'Azatioprina/6-MP', gravidade: 'grave', efeito: 'Toxicidade grave', conduta: 'Reduzir dose de azatioprina 75%' },
      { medicamento: 'Ampicilina', gravidade: 'leve', efeito: 'Aumento de rash', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: 'Máximo 200mg/dia' },
      { tfg: '<30', ajuste: 'Máximo 100mg/dia ou alternado' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' }
  },
  {
    id: 'colchicina',
    nomeGenerico: 'Colchicina',
    nomesComerciais: ['Colchis', 'Colchicina'],
    atcCode: 'M04AC01',
    classeTerapeutica: 'anti_inflamatorio',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Crise aguda de gota',
      'Profilaxia de flare ao iniciar hipouricemiante',
      'Febre Mediterrânea Familiar',
      'Pericardite aguda/recorrente'
    ],
    mecanismoAcao: 'Inibe polimerização de microtúbulos, reduzindo migração e ativação de neutrófilos.',
    posologias: [
      {
        indicacao: 'Crise de gota',
        adultos: { dose: '1mg inicial + 0,5mg 1h depois', frequencia: 'Depois 0,5mg 2-3x/dia', observacoes: 'Iniciar <36h do início da crise' }
      },
      {
        indicacao: 'Profilaxia',
        adultos: { dose: '0,5mg', frequencia: '1-2x/dia por 6 meses' }
      },
      {
        indicacao: 'Pericardite',
        adultos: { dose: '0,5mg', frequencia: '2x/dia por 3 meses' }
      }
    ],
    contraindicacoes: ['DRC grave + hepatopatia grave', 'Uso com inibidores fortes de CYP3A4/P-gp em DRC'],
    precaucoes: ['Janela terapêutica estreita', 'Diarreia como sinal de toxicidade'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas', 'Dor abdominal'],
      graves: ['Mielotoxicidade', 'Neuropatia', 'Miopatia', 'Toxicidade fatal (superdosagem)']
    },
    interacoes: [
      { medicamento: 'Claritromicina', gravidade: 'grave', efeito: 'Toxicidade por colchicina', conduta: 'Reduzir dose ou evitar' },
      { medicamento: 'Ciclosporina', gravidade: 'grave', efeito: 'Toxicidade', conduta: 'Evitar ou reduzir dose' },
      { medicamento: 'Estatinas', gravidade: 'moderada', efeito: 'Miopatia', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Reduzir dose, ciclos curtos' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível em baixas doses' }
  }
];
