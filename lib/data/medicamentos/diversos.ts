/**
 * MEDICAMENTOS DIVERSOS - DARWIN-MFC
 * ====================================
 * Outros medicamentos essenciais da RENAME
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosDiversos: Medicamento[] = [
  // ANTIDIABÉTICOS
  {
    id: 'metformina',
    nomeGenerico: 'Cloridrato de metformina',
    nomesComerciais: ['Glifage', 'Glucoformin'],
    // Ontologias
    atcCode: 'A10BA02',
    rxNormCui: '6809',
    drugBankId: 'DB00331',
    snomedCT: '372567009',
    casNumber: '657-24-9',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'biguanida',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '850mg', disponivelSUS: true }
    ],
    indicacoes: ['Diabetes mellitus tipo 2', 'Pré-diabetes', 'Síndrome dos ovários policísticos'],
    mecanismoAcao: 'Reduz produção hepática de glicose e aumenta sensibilidade periférica à insulina.',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '500-850mg 1-3x/dia, aumentar gradualmente', frequencia: '1-3x/dia com refeições', doseMaxima: '2550mg/dia' }
      }
    ],
    contraindicacoes: ['TFG <30', 'Cetoacidose', 'Uso de contraste iodado (suspender 48h antes)', 'Insuficiência hepática grave'],
    precaucoes: ['DRC (ajuste de dose)', 'Alcoolismo', 'Idosos', 'Cirurgia maior'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náusea', 'Flatulência', 'Gosto metálico'],
      graves: ['Acidose láctica (rara)', 'Deficiência de B12 (uso crônico)']
    },
    interacoes: [
      { medicamento: 'Contraste iodado', gravidade: 'grave', efeito: 'Acidose láctica', conduta: 'Suspender 48h antes/após' },
      { medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Risco de hipoglicemia e acidose', conduta: 'Moderar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Dose habitual' },
      { tfg: '45-60', ajuste: 'Máx 2000mg/dia' },
      { tfg: '30-45', ajuste: 'Máx 1000mg/dia' },
      { tfg: '<30', ajuste: 'CONTRAINDICADA' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['HbA1c a cada 3 meses', 'Função renal anual', 'B12 se uso prolongado'],
    orientacoesPaciente: ['Tomar com refeições (reduz GI)', 'Suspender antes de exames com contraste'],
    doencasRelacionadas: ['diabetes-mellitus-2', 'sindrome-ovarios-policisticos'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antidiabetico', 'biguanida', 'dm2']
  },
  {
    id: 'glibenclamida',
    nomeGenerico: 'Glibenclamida',
    nomesComerciais: ['Daonil', 'Euglucon'],
    // Ontologias
    atcCode: 'A10BB01',
    rxNormCui: '4815',
    drugBankId: 'DB01016',
    snomedCT: '386966003',
    casNumber: '10238-21-8',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'sulfonilureia',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true }
    ],
    indicacoes: ['Diabetes mellitus tipo 2'],
    mecanismoAcao: 'Sulfonilureia de 2ª geração. Estimula secreção de insulina pelas células beta pancreáticas.',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '2,5-5mg/dia, aumentar gradualmente', frequencia: '1-2x/dia com café da manhã', doseMaxima: '20mg/dia' }
      }
    ],
    contraindicacoes: ['DM tipo 1', 'Cetoacidose', 'Gestação', 'DRC grave'],
    precaucoes: ['Idosos (risco de hipoglicemia)', 'DRC', 'Hepatopatia', 'Desnutrição'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Ganho de peso', 'Náusea'],
      graves: ['Hipoglicemia grave', 'Reações cutâneas']
    },
    interacoes: [
      { medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Hipoglicemia e efeito dissulfiram', conduta: 'Evitar' },
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Mascaram sintomas de hipoglicemia', conduta: 'Monitorar glicemia' }
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Evitar (risco de hipoglicemia prolongada)' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar durante amamentação' },
    monitorizacao: ['Glicemia', 'HbA1c', 'Sinais de hipoglicemia'],
    orientacoesPaciente: ['Reconhecer sinais de hipoglicemia', 'Não pular refeições', 'Carregar açúcar'],
    doencasRelacionadas: ['diabetes-mellitus-2'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antidiabetico', 'sulfonilureia', 'dm2']
  },
  // GASTROINTESTINAIS
  {
    id: 'omeprazol',
    nomeGenerico: 'Omeprazol',
    nomesComerciais: ['Losec', 'Peprazol'],
    // Ontologias
    atcCode: 'A02BC01',
    rxNormCui: '7646',
    drugBankId: 'DB00338',
    snomedCT: '387137007',
    casNumber: '73590-58-6',
    classeTerapeutica: 'gastrointestinal',
    subclasse: 'ibp',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '40mg', disponivelSUS: true }
    ],
    indicacoes: ['DRGE', 'Úlcera péptica', 'Erradicação de H. pylori', 'Profilaxia de úlcera por AINEs', 'Síndrome de Zollinger-Ellison'],
    mecanismoAcao: 'Inibidor da bomba de prótons. Bloqueia irreversivelmente a H+/K+-ATPase gástrica.',
    posologias: [
      {
        indicacao: 'DRGE/Úlcera',
        adultos: { dose: '20-40mg/dia', frequencia: '1x/dia em jejum', observacoes: 'Tomar 30min antes do café da manhã' }
      },
      {
        indicacao: 'Erradicação H. pylori',
        adultos: { dose: '20mg 12/12h por 14 dias', frequencia: '2x/dia', observacoes: 'Em esquema tríplice com antibióticos' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Uso crônico (>1 ano): risco de fraturas, hipomagnesemia, deficiência de B12', 'Hepatopatia'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Diarreia', 'Dor abdominal', 'Náusea'],
      graves: ['Colite por C. difficile', 'Nefrite intersticial', 'Fraturas (uso prolongado)', 'Hipomagnesemia']
    },
    interacoes: [
      { medicamento: 'Clopidogrel', gravidade: 'moderada', efeito: 'Reduz ativação do clopidogrel', conduta: 'Preferir pantoprazol' },
      { medicamento: 'Metotrexato', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Monitorar toxicidade' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Magnésio em uso crônico', 'B12 em uso >3 anos'],
    orientacoesPaciente: ['Tomar em jejum, 30min antes de comer', 'Usar pelo menor tempo necessário'],
    doencasRelacionadas: ['drge', 'ulcera-peptica'],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['ibp', 'gastrointestinal', 'drge', 'ulcera']
  },
  {
    id: 'ranitidina',
    nomeGenerico: 'Cloridrato de ranitidina',
    nomesComerciais: ['Antak', 'Label'],
    // Ontologias
    atcCode: 'A02BA02',
    rxNormCui: '9143',
    drugBankId: 'DB00863',
    snomedCT: '372755005',
    casNumber: '66357-35-5',
    classeTerapeutica: 'gastrointestinal',
    subclasse: 'antagonista_h2',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: true }
    ],
    indicacoes: ['DRGE leve', 'Úlcera péptica', 'Dispepsia', 'Profilaxia de úlcera de estresse'],
    mecanismoAcao: 'Antagonista do receptor H2 da histamina. Reduz secreção ácida gástrica.',
    posologias: [
      {
        indicacao: 'DRGE/Úlcera',
        adultos: { dose: '150mg 2x/dia ou 300mg à noite', frequencia: '1-2x/dia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Porfiria aguda'],
    precaucoes: ['DRC (ajuste)', 'Hepatopatia'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Constipação', 'Diarreia'],
      graves: ['Hepatite', 'Pancreatite', 'Discrasias sanguíneas']
    },
    interacoes: [
      { medicamento: 'Antiácidos', gravidade: 'leve', efeito: 'Reduz absorção', conduta: 'Separar 1h' }
    ],
    ajusteDoseRenal: [
      { tfg: '<50', ajuste: '150mg/dia' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Resposta clínica'],
    orientacoesPaciente: ['Pode tomar com ou sem alimentos'],
    doencasRelacionadas: ['drge', 'dispepsia'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antagonista-h2', 'gastrointestinal']
  },
  {
    id: 'domperidona',
    nomeGenerico: 'Domperidona',
    nomesComerciais: ['Motilium', 'Peridal'],
    // Ontologias
    atcCode: 'A03FA03',
    rxNormCui: '3626',
    drugBankId: 'DB01184',
    snomedCT: '387181004',
    casNumber: '57808-66-9',
    classeTerapeutica: 'gastrointestinal',
    subclasse: 'procinetico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true }
    ],
    indicacoes: ['Náusea e vômito', 'Gastroparesia', 'Dispepsia funcional'],
    mecanismoAcao: 'Antagonista dopaminérgico D2 periférico. Aumenta motilidade gástrica e esofágica.',
    posologias: [
      {
        indicacao: 'Náusea/Dispepsia',
        adultos: { dose: '10mg 3x/dia antes das refeições', frequencia: '3x/dia', doseMaxima: '30mg/dia' }
      }
    ],
    contraindicacoes: ['Prolactinoma', 'Sangramento GI', 'Obstrução intestinal', 'QT longo'],
    precaucoes: ['Idosos', 'Cardiopatia', 'Hipopotassemia'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Cefaleia'],
      graves: ['Prolongamento QT', 'Arritmias', 'Galactorreia']
    },
    interacoes: [
      { medicamento: 'Medicamentos que prolongam QT', gravidade: 'grave', efeito: 'Arritmias', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Reduzir frequência' }],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Pode aumentar produção de leite' },
    monitorizacao: ['ECG em pacientes de risco'],
    orientacoesPaciente: ['Tomar 15-30min antes das refeições'],
    doencasRelacionadas: ['dispepsia', 'gastroparesia'],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['procinetico', 'antiemetico', 'dispepsia']
  },
  // HIPOLIPEMIANTES
  {
    id: 'sinvastatina',
    nomeGenerico: 'Sinvastatina',
    nomesComerciais: ['Zocor', 'Sinvascor'],
    // Ontologias
    atcCode: 'C10AA01',
    rxNormCui: '36567',
    drugBankId: 'DB00641',
    snomedCT: '387584000',
    casNumber: '79902-63-9',
    classeTerapeutica: 'hipolipemiante',
    subclasse: 'estatina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true }
    ],
    indicacoes: ['Dislipidemia', 'Prevenção CV primária e secundária', 'Pós-IAM', 'DAC'],
    mecanismoAcao: 'Inibe HMG-CoA redutase hepática, reduzindo síntese de colesterol e aumentando receptores de LDL.',
    posologias: [
      {
        indicacao: 'Dislipidemia',
        adultos: { dose: '20-40mg/dia à noite', frequencia: '1x/dia (noite)', doseMaxima: '40mg/dia' }
      }
    ],
    contraindicacoes: ['Hepatopatia ativa', 'Gestação', 'Uso de inibidores potentes de CYP3A4'],
    precaucoes: ['Hipotireoidismo', 'DRC', 'Miopatia prévia', 'Idosos'],
    efeitosAdversos: {
      comuns: ['Mialgia', 'Cefaleia', 'Constipação', 'Elevação de transaminases'],
      graves: ['Rabdomiólise', 'Miopatia', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Amiodarona', gravidade: 'grave', efeito: 'Miopatia', conduta: 'Limitar sinvastatina a 10mg' },
      { medicamento: 'Macrolídeos', gravidade: 'grave', efeito: 'Rabdomiólise', conduta: 'Evitar ou suspender estatina' },
      { medicamento: 'Suco de grapefruit', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Evitar consumo' }
    ],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Iniciar com 5mg, máximo 10mg' }],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Evitar durante amamentação' },
    monitorizacao: ['Perfil lipídico', 'Transaminases', 'CK se sintomas musculares'],
    orientacoesPaciente: ['Tomar à noite', 'Informar dor muscular inexplicada', 'Evitar grapefruit'],
    doencasRelacionadas: ['dislipidemia', 'doenca-arterial-coronariana'],
    calculadoras: ['risco-cv'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['estatina', 'hipolipemiante', 'colesterol']
  },
  {
    id: 'atorvastatina',
    nomeGenerico: 'Atorvastatina cálcica',
    nomesComerciais: ['Lipitor', 'Citalor'],
    // Ontologias
    atcCode: 'C10AA05',
    rxNormCui: '83367',
    drugBankId: 'DB01076',
    snomedCT: '373444002',
    casNumber: '134523-00-5',
    classeTerapeutica: 'hipolipemiante',
    subclasse: 'estatina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: false }
    ],
    indicacoes: ['Dislipidemia', 'Prevenção CV (alta intensidade)', 'Pós-SCA', 'DAC'],
    mecanismoAcao: 'Estatina de alta potência. Inibe HMG-CoA redutase.',
    posologias: [
      {
        indicacao: 'Alta intensidade (muito alto risco)',
        adultos: { dose: '40-80mg/dia', frequencia: '1x/dia (qualquer horário)' }
      },
      {
        indicacao: 'Moderada intensidade',
        adultos: { dose: '10-20mg/dia', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Hepatopatia ativa', 'Gestação', 'Amamentação'],
    precaucoes: ['Miopatia', 'DRC', 'Hipotireoidismo'],
    efeitosAdversos: {
      comuns: ['Mialgia', 'Diarreia', 'Elevação de transaminases'],
      graves: ['Rabdomiólise', 'Miopatia necrotizante autoimune']
    },
    interacoes: [
      { medicamento: 'Ciclosporina', gravidade: 'grave', efeito: 'Miopatia', conduta: 'Evitar' },
      { medicamento: 'Fibratos', gravidade: 'moderada', efeito: 'Risco de miopatia', conduta: 'Monitorar CK' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Evitar durante amamentação' },
    monitorizacao: ['Perfil lipídico', 'Transaminases', 'CK se sintomas'],
    orientacoesPaciente: ['Pode tomar qualquer horário', 'Informar dores musculares'],
    doencasRelacionadas: ['dislipidemia', 'doenca-arterial-coronariana', 'avc'],
    calculadoras: ['risco-cv'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['estatina', 'hipolipemiante', 'alta-intensidade']
  },
  // RESPIRATÓRIOS
  {
    id: 'salbutamol',
    nomeGenerico: 'Sulfato de salbutamol',
    nomesComerciais: ['Aerolin'],
    // Ontologias
    atcCode: 'R03AC02',
    rxNormCui: '435',
    drugBankId: 'DB01001',
    snomedCT: '372897005',
    casNumber: '18559-94-9',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'beta2_agonista_curta',
    rename: true,
    apresentacoes: [
      { forma: 'aerossol', concentracao: '100mcg/jato', disponivelSUS: true },
      { forma: 'solucao_nebulizacao', concentracao: '5mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Asma (resgate)', 'Broncoespasmo', 'DPOC (resgate)', 'Bronquiolite'],
    mecanismoAcao: 'Agonista beta-2 adrenérgico de curta ação. Relaxa musculatura lisa brônquica.',
    posologias: [
      {
        indicacao: 'Crise asmática',
        adultos: { dose: '2-4 jatos (200-400mcg) a cada 4-6h', frequencia: 'A cada 4-6h conforme necessidade' },
        pediatrico: { dose: '2 jatos a cada 4-6h', frequencia: 'Conforme necessidade' }
      },
      {
        indicacao: 'Nebulização (crise)',
        adultos: { dose: '2,5-5mg a cada 20min (até 3 doses)', frequencia: 'A cada 20min' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Cardiopatia', 'Hipertireoidismo', 'Diabetes', 'Hipopotassemia'],
    efeitosAdversos: {
      comuns: ['Tremor', 'Taquicardia', 'Cefaleia', 'Nervosismo'],
      graves: ['Hipopotassemia', 'Arritmias', 'Broncoespasmo paradoxal']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'grave', efeito: 'Antagonismo', conduta: 'Evitar betabloq não seletivos' },
      { medicamento: 'Diuréticos', gravidade: 'moderada', efeito: 'Hipopotassemia', conduta: 'Monitorar K+' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Frequência de uso', 'Potássio em uso frequente'],
    orientacoesPaciente: ['Usar com espaçador', 'Se precisar >3x/semana, revisar tratamento de manutenção'],
    doencasRelacionadas: ['asma', 'dpoc'],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['broncodilatador', 'beta2', 'asma', 'resgate']
  },
  {
    id: 'beclometasona',
    nomeGenerico: 'Dipropionato de beclometasona',
    nomesComerciais: ['Clenil', 'Beclosol'],
    // Ontologias
    atcCode: 'R03BA01',
    rxNormCui: '1009',
    drugBankId: 'DB00394',
    snomedCT: '116571008',
    casNumber: '5534-09-8',
    classeTerapeutica: 'corticoide_inalatorio',
    subclasse: 'ci',
    rename: true,
    apresentacoes: [
      { forma: 'aerossol', concentracao: '50mcg/jato', disponivelSUS: true },
      { forma: 'aerossol', concentracao: '250mcg/jato', disponivelSUS: true }
    ],
    indicacoes: ['Asma persistente (manutenção)', 'Rinite alérgica'],
    mecanismoAcao: 'Corticoide inalatório. Reduz inflamação brônquica, edema e hipersecreção.',
    posologias: [
      {
        indicacao: 'Asma leve',
        adultos: { dose: '100-200mcg 2x/dia', frequencia: '2x/dia' }
      },
      {
        indicacao: 'Asma moderada',
        adultos: { dose: '200-400mcg 2x/dia', frequencia: '2x/dia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Tuberculose ativa', 'Infecções fúngicas orais', 'Osteoporose (altas doses)'],
    efeitosAdversos: {
      comuns: ['Candidíase oral', 'Rouquidão', 'Tosse'],
      graves: ['Supressão adrenal (altas doses)', 'Osteoporose (uso crônico alto)', 'Retardo de crescimento (crianças)']
    },
    interacoes: [
      { medicamento: 'Inibidores de CYP3A4', gravidade: 'moderada', efeito: 'Aumenta efeitos sistêmicos', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Controle de asma', 'Crescimento em crianças'],
    orientacoesPaciente: ['Enxaguar boca após uso', 'Usar espaçador', 'Não é para crise'],
    doencasRelacionadas: ['asma'],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['corticoide-inalatorio', 'asma', 'manutencao']
  },
  // ANTICOAGULANTES
  {
    id: 'varfarina',
    nomeGenerico: 'Varfarina sódica',
    nomesComerciais: ['Marevan', 'Coumadin'],
    // Ontologias
    atcCode: 'B01AA03',
    rxNormCui: '11289',
    drugBankId: 'DB00682',
    snomedCT: '372756006',
    casNumber: '81-81-2',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'antagonista_vitamina_k',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true }
    ],
    indicacoes: ['Fibrilação atrial', 'Tromboembolismo venoso', 'Prótese valvar mecânica', 'Prevenção de AVC'],
    mecanismoAcao: 'Antagonista da vitamina K. Inibe síntese de fatores II, VII, IX e X.',
    posologias: [
      {
        indicacao: 'Anticoagulação',
        adultos: { dose: 'Individualizada conforme INR. Início 5mg/dia', frequencia: '1x/dia', observacoes: 'Meta INR 2-3 (maioria) ou 2,5-3,5 (prótese mecânica)' }
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'Gestação (1º trimestre e próximo ao parto)', 'HAS grave não controlada', 'AVC hemorrágico recente'],
    precaucoes: ['Quedas frequentes', 'Alcoolismo', 'Hepatopatia', 'DRC'],
    efeitosAdversos: {
      comuns: ['Sangramento menor (gengivorragia, equimoses)'],
      graves: ['Hemorragia maior', 'Necrose cutânea (início)', 'Teratogenicidade']
    },
    interacoes: [
      { medicamento: 'AINEs', gravidade: 'grave', efeito: 'Sangramento', conduta: 'Evitar' },
      { medicamento: 'Antibióticos (azitromicina, metronidazol)', gravidade: 'grave', efeito: 'Aumenta INR', conduta: 'Monitorar INR' },
      { medicamento: 'Vitamina K', gravidade: 'moderada', efeito: 'Reduz INR', conduta: 'Manter dieta consistente' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Monitorar INR mais frequentemente' }],
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['INR semanal no início, depois mensal', 'TTR (tempo no range terapêutico)'],
    orientacoesPaciente: ['Manter dieta consistente em vitamina K', 'Informar todos os medicamentos', 'Reconhecer sinais de sangramento'],
    doencasRelacionadas: ['fibrilacao-atrial', 'tev'],
    calculadoras: ['cha2ds2-vasc', 'has-bled'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['anticoagulante', 'avk', 'fa', 'tev']
  },
  {
    id: 'aas',
    nomeGenerico: 'Ácido acetilsalicílico',
    nomesComerciais: ['Aspirina', 'AAS'],
    // Ontologias
    atcCode: 'B01AC06',
    rxNormCui: '1191',
    drugBankId: 'DB00945',
    snomedCT: '387458008',
    casNumber: '50-78-2',
    classeTerapeutica: 'antiagregante',
    subclasse: 'inibidor_cox',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true }
    ],
    indicacoes: ['Prevenção secundária CV (IAM, AVC isquêmico, DAP)', 'SCA', 'Pós-stent'],
    mecanismoAcao: 'Inibe irreversivelmente COX-1 plaquetária, bloqueando síntese de tromboxano A2.',
    posologias: [
      {
        indicacao: 'Prevenção CV',
        adultos: { dose: '100mg/dia', frequencia: '1x/dia' }
      },
      {
        indicacao: 'SCA',
        adultos: { dose: '300mg mastigado (ataque), depois 100mg/dia', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Alergia a AAS', 'Úlcera ativa', 'Sangramento ativo', 'Hemofilia'],
    precaucoes: ['DRC', 'Hepatopatia', 'Asma (pode precipitar broncoespasmo)'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Náusea'],
      graves: ['Hemorragia GI', 'Síndrome de Reye (crianças)', 'Broncoespasmo']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'grave', efeito: 'Sangramento', conduta: 'Monitorar' },
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Toxicidade', conduta: 'Evitar altas doses de AAS' }
    ],
    ajusteDoseRenal: [{ tfg: '<10', ajuste: 'Evitar' }],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Doses baixas compatíveis' },
    monitorizacao: ['Sinais de sangramento'],
    orientacoesPaciente: ['Tomar com alimentos', 'Não usar outros AINEs sem orientação'],
    doencasRelacionadas: ['doenca-arterial-coronariana', 'avc', 'infarto'],
    calculadoras: ['risco-cv'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antiagregante', 'aas', 'prevencao-cv']
  },
  // TIREOIDE
  {
    id: 'levotiroxina',
    nomeGenerico: 'Levotiroxina sódica',
    nomesComerciais: ['Puran T4', 'Euthyrox'],
    // Ontologias
    atcCode: 'H03AA01',
    rxNormCui: '10582',
    drugBankId: 'DB00451',
    snomedCT: '126202002',
    casNumber: '51-48-9',
    classeTerapeutica: 'hormonio',
    subclasse: 'tireoidiano',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '75mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '125mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '150mcg', disponivelSUS: true }
    ],
    indicacoes: ['Hipotireoidismo', 'Supressão de TSH (câncer de tireoide)', 'Coma mixedematoso'],
    mecanismoAcao: 'Hormônio tireoidiano sintético (T4). Convertido em T3 nos tecidos.',
    posologias: [
      {
        indicacao: 'Hipotireoidismo',
        adultos: { dose: '1,6 mcg/kg/dia (adultos jovens). Idosos: iniciar 12,5-25mcg', frequencia: '1x/dia em jejum', observacoes: 'Ajustar por TSH a cada 4-6 semanas' }
      }
    ],
    contraindicacoes: ['Tireotoxicose não tratada', 'IAM agudo', 'Insuficiência adrenal não tratada'],
    precaucoes: ['Cardiopatia (iniciar baixas doses)', 'Idosos', 'Diabetes (pode alterar controle glicêmico)'],
    efeitosAdversos: {
      comuns: ['Geralmente bem tolerado em doses adequadas'],
      graves: ['Superdosagem: taquicardia, arritmias, angina, perda de peso, tremor']
    },
    interacoes: [
      { medicamento: 'Antiácidos/Ferro/Cálcio', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar 4h' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumenta efeito anticoagulante', conduta: 'Monitorar INR' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['TSH a cada 4-6 semanas até estabilizar, depois anual'],
    orientacoesPaciente: ['Tomar em jejum absoluto, 30-60min antes do café', 'Separar de outros medicamentos', 'Não trocar marca sem orientação'],
    doencasRelacionadas: ['hipotireoidismo'],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['hormonio', 'tireoide', 'hipotireoidismo', 'levotiroxina']
  },
  // DIURÉTICOS
  {
    id: 'furosemida',
    nomeGenerico: 'Furosemida',
    nomesComerciais: ['Lasix'],
    // Ontologias
    atcCode: 'C03CA01',
    rxNormCui: '4603',
    drugBankId: 'DB00695',
    snomedCT: '387475002',
    casNumber: '54-31-9',
    classeTerapeutica: 'diuretico',
    subclasse: 'alca',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '20mg/2mL', disponivelSUS: true }
    ],
    indicacoes: ['Edema (IC, cirrose, nefrótico)', 'Edema agudo de pulmão', 'HAS resistente', 'Hipercalcemia'],
    mecanismoAcao: 'Diurético de alça. Inibe cotransportador Na-K-2Cl na alça de Henle.',
    posologias: [
      {
        indicacao: 'Edema crônico',
        adultos: { dose: '20-80mg/dia', frequencia: '1-2x/dia', doseMaxima: '600mg/dia' }
      },
      {
        indicacao: 'EAP',
        adultos: { dose: '20-80mg IV', frequencia: 'Repetir conforme resposta' }
      }
    ],
    contraindicacoes: ['Anúria', 'Coma hepático', 'Hipopotassemia/hiponatremia graves'],
    precaucoes: ['DRC', 'Hepatopatia', 'Diabetes', 'Gota', 'Ototoxicidade (altas doses)'],
    efeitosAdversos: {
      comuns: ['Hipopotassemia', 'Hiponatremia', 'Hipomagnesemia', 'Hiperuricemia'],
      graves: ['Ototoxicidade', 'Nefrotoxicidade', 'Pancreatite']
    },
    interacoes: [
      { medicamento: 'Aminoglicosídeos', gravidade: 'grave', efeito: 'Ototoxicidade', conduta: 'Monitorar audição' },
      { medicamento: 'Digoxina', gravidade: 'grave', efeito: 'Toxicidade digitálica por hipopotassemia', conduta: 'Monitorar K+' }
    ],
    ajusteDoseRenal: [{ tfg: '<20', ajuste: 'Doses mais altas podem ser necessárias (resistência)' }],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Pode reduzir produção de leite' },
    monitorizacao: ['Eletrólitos', 'Função renal', 'PA', 'Peso', 'Débito urinário'],
    orientacoesPaciente: ['Tomar pela manhã (evitar noctúria)', 'Monitorar peso diariamente'],
    doencasRelacionadas: ['insuficiencia-cardiaca', 'cirrose'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['diuretico', 'alca', 'edema', 'ic']
  },
  {
    id: 'espironolactona',
    nomeGenerico: 'Espironolactona',
    nomesComerciais: ['Aldactone'],
    // Ontologias
    atcCode: 'C03DA01',
    rxNormCui: '9997',
    drugBankId: 'DB00421',
    snomedCT: '387078006',
    casNumber: '52-01-7',
    classeTerapeutica: 'diuretico',
    subclasse: 'poupador_potassio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: ['IC com FE reduzida', 'Hiperaldosteronismo', 'Ascite cirrótica', 'Hirsutismo/SOP', 'HAS resistente'],
    mecanismoAcao: 'Antagonista do receptor mineralocorticoide. Bloqueia aldosterona no túbulo coletor.',
    posologias: [
      {
        indicacao: 'IC',
        adultos: { dose: '25-50mg/dia', frequencia: '1x/dia', observacoes: 'Iniciar 12,5-25mg se K+ limítrofe' }
      },
      {
        indicacao: 'Ascite cirrótica',
        adultos: { dose: '100-400mg/dia', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['K+ >5,5 mEq/L', 'Doença de Addison', 'Anúria'],
    precaucoes: ['DRC', 'Uso de IECA/BRA', 'Idosos'],
    efeitosAdversos: {
      comuns: ['Hiperpotassemia', 'Ginecomastia', 'Mastalgia', 'Irregularidade menstrual'],
      graves: ['Hiperpotassemia grave', 'Acidose metabólica']
    },
    interacoes: [
      { medicamento: 'IECA/BRA', gravidade: 'grave', efeito: 'Hiperpotassemia', conduta: 'Monitorar K+ rigorosamente' },
      { medicamento: 'Suplementos de K+', gravidade: 'grave', efeito: 'Hiperpotassemia', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [
      { tfg: '30-50', ajuste: 'Usar com cautela' },
      { tfg: '<30', ajuste: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Potássio (1 semana após início, depois mensal)', 'Função renal'],
    orientacoesPaciente: ['Evitar suplementos de potássio', 'Informar ginecomastia'],
    doencasRelacionadas: ['insuficiencia-cardiaca', 'cirrose', 'sindrome-ovarios-policisticos'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['diuretico', 'poupador-potassio', 'ic', 'antialdosteronico']
  },
  {
    id: 'hidroclorotiazida',
    nomeGenerico: 'Hidroclorotiazida',
    nomesComerciais: ['Clorana'],
    // Ontologias
    atcCode: 'C03AA03',
    rxNormCui: '5487',
    drugBankId: 'DB00999',
    snomedCT: '387525002',
    casNumber: '58-93-5',
    classeTerapeutica: 'diuretico',
    subclasse: 'tiazidico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true }
    ],
    indicacoes: ['Hipertensão arterial', 'Edema leve', 'Nefrolitíase por hipercalciúria'],
    mecanismoAcao: 'Diurético tiazídico. Inibe cotransportador Na-Cl no túbulo distal.',
    posologias: [
      {
        indicacao: 'HAS',
        adultos: { dose: '12,5-25mg/dia', frequencia: '1x/dia', doseMaxima: '50mg/dia' }
      }
    ],
    contraindicacoes: ['Anúria', 'Alergia a sulfonamidas'],
    precaucoes: ['Gota', 'Diabetes', 'Dislipidemia', 'Hipopotassemia'],
    efeitosAdversos: {
      comuns: ['Hipopotassemia', 'Hiperuricemia', 'Hiperglicemia', 'Hiponatremia'],
      graves: ['Pancreatite', 'Fotossensibilidade', 'Reações cutâneas graves']
    },
    interacoes: [
      { medicamento: 'Lítio', gravidade: 'grave', efeito: 'Aumenta litemia', conduta: 'Evitar ou monitorar rigorosamente' },
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Toxicidade por hipopotassemia', conduta: 'Monitorar K+' }
    ],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Ineficaz, evitar' }],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Eletrólitos', 'Ácido úrico', 'Glicemia'],
    orientacoesPaciente: ['Tomar pela manhã', 'Protetor solar (fotossensibilidade)'],
    doencasRelacionadas: ['hipertensao-arterial'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['diuretico', 'tiazidico', 'has']
  }
];

