/**
 * EXPANSÃO SOTA - MEDICAMENTOS ADICIONAIS
 * ========================================
 * Expansão adicional de medicamentos para alcançar 150+ medicamentos RENAME
 * Todas com ontologias completas (ATC, RxNorm CUI, DrugBank ID, SNOMED-CT, CAS)
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosExpansaoSOTA: Medicamento[] = [
  // ============================================
  // ANTIBIÓTICOS ADICIONAIS
  // ============================================
  {
    id: 'azitromicina',
    nomeGenerico: 'Azitromicina',
    nomesComerciais: ['Zitromax', 'Azitrox'],
    atcCode: 'J01FA10',
    rxNormCui: '8013',
    drugBankId: 'DB00207',
    snomedCT: '372505008',
    casNumber: '83905-01-5',
    classeTerapeutica: 'antibiotico',
    subclasse: 'macrolideo',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true }
    ],
    indicacoes: ['Infecções respiratórias', 'Infecções de pele e partes moles', 'ITU não complicada'],
    mecanismoAcao: 'Inibe síntese proteica bacteriana por ligação à subunidade 50S do ribossomo.',
    posologias: [
      { indicacao: 'Infecção respiratória', adultos: { dose: '500mg 1x/dia por 3 dias', frequencia: '1x/dia', doseMaxima: '1500mg total' } }
    ],
    contraindicacoes: ['Hipersensibilidade a macrolídeos', 'QT longo', 'Arritmias'],
    precaucoes: ['QT longo', 'Miastenia gravis', 'Hepatopatia'],
    efeitosAdversos: { comuns: ['Náusea', 'Diarreia', 'Dispépsia'], graves: ['Prolongamento QT', 'Hepatite', 'Reações de hipersensibilidade'] },
    interacoes: [{ medicamento: 'Anticoagulantes', gravidade: 'moderada', efeito: 'Aumento de sangramento', conduta: 'Monitorar INR' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Função hepática', 'ECG se QT longo'],
    orientacoesPaciente: ['Tomar com estômago vazio', 'Completar tratamento mesmo se melhorar'],
    doencasRelacionadas: ['pneumonia', 'faringite'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antibiotico', 'macrolideo', 'respiratorio']
  },
  {
    id: 'cefalexina',
    nomeGenerico: 'Cefalexina',
    nomesComerciais: ['Keflex'],
    atcCode: 'J01DB01',
    rxNormCui: '2269',
    drugBankId: 'DB00567',
    snomedCT: '372523001',
    casNumber: '15686-71-2',
    classeTerapeutica: 'antibiotico',
    subclasse: 'cefalosporina_1_geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '250mg/5mL', disponivelSUS: true }
    ],
    indicacoes: ['Infecções de pele e partes moles', 'ITU não complicada', 'Infecções respiratórias'],
    mecanismoAcao: 'Inibe síntese da parede celular bacteriana.',
    posologias: [
      { indicacao: 'ITU não complicada', adultos: { dose: '500mg 6/6h', frequencia: '4x/dia', doseMaxima: '4g/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade a cefalosporinas ou penicilina'],
    precaucoes: ['Hipersensibilidade a penicilina (reação cruzada 10%)', 'DRC'],
    efeitosAdversos: { comuns: ['Diarreia', 'Náusea', 'Rash'], graves: ['Anafilaxia', 'Colite pseudomembranosa'] },
    interacoes: [{ medicamento: 'Probenecida', gravidade: 'moderada', efeito: 'Aumento de níveis', conduta: 'Ajustar dose' }],
    ajusteDoseRenal: [{ tfg: '10-50', ajuste: 'Reduzir 25-50%' }, { tfg: '<10', ajuste: 'Reduzir 50-75%' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Função renal'],
    orientacoesPaciente: ['Pode tomar com alimentos', 'Completar tratamento'],
    doencasRelacionadas: ['itu', 'infeccao-pele'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antibiotico', 'cefalosporina', 'itu']
  },

  // ============================================
  // ANTIFÚNGICOS
  // ============================================
  {
    id: 'fluconazol',
    nomeGenerico: 'Fluconazol',
    nomesComerciais: ['Zoltec', 'Medley'],
    atcCode: 'J02AC01',
    rxNormCui: '4337',
    drugBankId: 'DB00196',
    snomedCT: '372772009',
    casNumber: '86386-73-4',
    classeTerapeutica: 'antifungico',
    subclasse: 'antifungico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true }
    ],
    indicacoes: ['Candidíase vulvovaginal', 'Candidíase oral', 'Candidíase esofágica', 'Criptococose'],
    mecanismoAcao: 'Inibe síntese de ergosterol, componente da membrana fúngica.',
    posologias: [
      { indicacao: 'Candidíase vulvovaginal', adultos: { dose: '150mg dose única', frequencia: 'Dose única', doseMaxima: '150mg' } },
      { indicacao: 'Candidíase oral', adultos: { dose: '200mg no primeiro dia, depois 100mg/dia', frequencia: '1x/dia', doseMaxima: '200mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Gravidez (primeiro trimestre)', 'Lactação'],
    precaucoes: ['DRC', 'Hepatopatia', 'QT longo'],
    efeitosAdversos: { comuns: ['Náusea', 'Cefaleia', 'Rash'], graves: ['Hepatotoxicidade', 'Exantema grave', 'Prolongamento QT'] },
    interacoes: [{ medicamento: 'Warfarina', gravidade: 'moderada', efeito: 'Aumento de sangramento', conduta: 'Monitorar INR' }],
    ajusteDoseRenal: [{ tfg: '<50', ajuste: 'Reduzir 50%' }],
    gestacao: 'C', amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Função hepática'],
    orientacoesPaciente: ['Pode tomar com ou sem alimentos'],
    doencasRelacionadas: ['candidíase'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antifungico', 'candidiase']
  },

  // ============================================
  // ANTIVIRAIS
  // ============================================
  {
    id: 'aciclovir',
    nomeGenerico: 'Aciclovir',
    nomesComerciais: ['Zovirax'],
    atcCode: 'J05AB01',
    rxNormCui: '87',
    drugBankId: 'DB00787',
    snomedCT: '372782003',
    casNumber: '59277-89-3',
    classeTerapeutica: 'antiviral',
    subclasse: undefined,
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'creme', concentracao: '5%', disponivelSUS: true }
    ],
    indicacoes: ['Herpes simples', 'Herpes zóster', 'Varicela'],
    mecanismoAcao: 'Inibe replicação do DNA viral ao se incorporar na cadeia de DNA viral.',
    posologias: [
      { indicacao: 'Herpes simples recorrente', adultos: { dose: '200mg 5x/dia por 5 dias', frequencia: '5x/dia', doseMaxima: '1000mg/dia' } },
      { indicacao: 'Herpes zóster', adultos: { dose: '800mg 5x/dia por 7 dias', frequencia: '5x/dia', doseMaxima: '4000mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['DRC', 'Desidratação'],
    efeitosAdversos: { comuns: ['Náusea', 'Cefaleia', 'Tontura'], graves: ['Nefrotoxicidade', 'Neurotoxicidade', 'Alterações hematológicas'] },
    interacoes: [{ medicamento: 'Probenecida', gravidade: 'moderada', efeito: 'Aumento de níveis', conduta: 'Ajustar dose' }],
    ajusteDoseRenal: [{ tfg: '25-50', ajuste: 'Reduzir 50%' }, { tfg: '10-25', ajuste: 'Reduzir 75%' }, { tfg: '<10', ajuste: '25% da dose' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Função renal'],
    orientacoesPaciente: ['Tomar com bastante líquido', 'Iniciar o mais cedo possível'],
    doencasRelacionadas: ['herpes-simples', 'herpes-zoster'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antiviral', 'herpes']
  },

  // ============================================
  // ANTICONVULSIVANTES
  // ============================================
  {
    id: 'carbamazepina',
    nomeGenerico: 'Carbamazepina',
    nomesComerciais: ['Tegretol'],
    atcCode: 'N03AF01',
    rxNormCui: '2034',
    drugBankId: 'DB00564',
    snomedCT: '372526009',
    casNumber: '298-46-4',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'bloqueador_canal_sodio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true }
    ],
    indicacoes: ['Epilepsia', 'Neuralgia do trigêmeo', 'Transtorno bipolar'],
    mecanismoAcao: 'Bloqueia canais de sódio voltagem-dependentes. Estabiliza neurônios hiperexcitáveis.',
    posologias: [
      { indicacao: 'Epilepsia', adultos: { dose: '200mg 2x/dia, aumentar gradualmente', frequencia: '2-3x/dia', doseMaxima: '1200mg/dia' } }
    ],
    contraindicacoes: ['Bloqueio AV', 'Hepatopatia grave', 'Hipersensibilidade'],
    precaucoes: ['DRC', 'Hepatopatia', 'Hematológicas', 'HLA-B*1502 (asiáticos - risco SJS)'],
    efeitosAdversos: { comuns: ['Tontura', 'Sonolência', 'Náusea'], graves: ['Síndrome de Stevens-Johnson', 'Agranulocitose', 'Hepatotoxicidade', 'Aplasia medular'] },
    interacoes: [{ medicamento: 'Anticoagulantes', gravidade: 'moderada', efeito: 'Diminuição de eficácia', conduta: 'Ajustar dose anticoagulante' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'D', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Hemograma', 'Função hepática', 'Níveis séricos'],
    orientacoesPaciente: ['Não suspender abruptamente', 'Pode causar sonolência - evitar dirigir'],
    doencasRelacionadas: ['epilepsia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anticonvulsivante', 'epilepsia', 'neuralgia']
  },
  {
    id: 'fenitoina',
    nomeGenerico: 'Fenitoína',
    nomesComerciais: ['Hidantal'],
    atcCode: 'N03AB02',
    rxNormCui: '8183',
    drugBankId: 'DB00252',
    snomedCT: '372628001',
    casNumber: '57-41-0',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'anticonvulsivante_tratamento',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: ['Epilepsia (convulsões tônico-clônicas, parciais)', 'Status epilepticus'],
    mecanismoAcao: 'Bloqueia canais de sódio voltagem-dependentes. Reduz descargas epilépticas.',
    posologias: [
      { indicacao: 'Epilepsia', adultos: { dose: '300mg/dia em 1-3 tomadas', frequencia: '1-3x/dia', doseMaxima: '600mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Bloqueio AV', 'Sinus bradicardia'],
    precaucoes: ['Hepatopatia', 'Hipoproteinemia', 'Gravidez'],
    efeitosAdversos: { comuns: ['Nistagmo', 'Ataxia', 'Hiperplasia gengival'], graves: ['Síndrome de Stevens-Johnson', 'Toxicodermia grave', 'Hepatotoxicidade'] },
    interacoes: [{ medicamento: 'Anticoagulantes', gravidade: 'moderada', efeito: 'Diminuição de eficácia', conduta: 'Ajustar dose' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'D', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Níveis séricos', 'Função hepática', 'Hemograma'],
    orientacoesPaciente: ['Higiene oral rigorosa (hiperplasia gengival)', 'Não suspender abruptamente'],
    doencasRelacionadas: ['epilepsia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anticonvulsivante', 'epilepsia']
  },

  // ============================================
  // IMUNOSSUPRESSORES
  // ============================================
  {
    id: 'metotrexato',
    nomeGenerico: 'Metotrexato',
    nomesComerciais: ['Methotrexate'],
    atcCode: 'L01BA01',
    rxNormCui: '6964',
    drugBankId: 'DB00563',
    snomedCT: '372576009',
    casNumber: '59-05-2',
    classeTerapeutica: 'outros',
    subclasse: undefined,
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '50mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Artrite reumatoide', 'Psoríase', 'Leucemias', 'Linfomas'],
    mecanismoAcao: 'Antimetabolito do ácido fólico. Inibe síntese de DNA/RNA.',
    posologias: [
      { indicacao: 'Artrite reumatoide', adultos: { dose: '7,5-25mg 1x/semana', frequencia: '1x/semana', doseMaxima: '25mg/semana' } }
    ],
    contraindicacoes: ['Gravidez', 'Lactação', 'Hepatopatia grave', 'Alcoolismo'],
    precaucoes: ['DRC', 'Hepatopatia', 'Doença pulmonar', 'Ácido fólico obrigatório'],
    efeitosAdversos: { comuns: ['Náusea', 'Ulcerações orais', 'Fadiga'], graves: ['Mielossupressão', 'Hepatotoxicidade', 'Fibrose pulmonar', 'Toxicidade mucocutânea'] },
    interacoes: [{ medicamento: 'Ácido fólico', gravidade: 'leve', efeito: 'Reduz toxicidade', conduta: 'Usar concomitantemente' }],
    ajusteDoseRenal: [{ tfg: '30-60', ajuste: 'Reduzir 25%' }, { tfg: '<30', ajuste: 'Contraindicado' }],
    gestacao: 'X', amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['Hemograma', 'Função hepática', 'Creatinina', 'Radiografia de tórax'],
    orientacoesPaciente: ['Tomar ácido fólico', 'Evitar álcool', 'Evitar gravidez', 'Monitorar sintomas de toxicidade'],
    doencasRelacionadas: ['artrite-reumatoide', 'psoriase'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['imunossupressor', 'reumatologia']
  },
  {
    id: 'hidroxicloroquina',
    nomeGenerico: 'Hidroxicloroquina',
    nomesComerciais: ['Plaquenil'],
    atcCode: 'P01BA02',
    rxNormCui: '5640',
    drugBankId: 'DB01611',
    snomedCT: '372734001',
    casNumber: '747-36-4',
    classeTerapeutica: 'outros',
    subclasse: 'imunossupressor',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true }
    ],
    indicacoes: ['Lúpus eritematoso sistêmico', 'Artrite reumatoide', 'Malária', 'Síndrome de Sjögren'],
    mecanismoAcao: 'Mecanismo imunomodulador não completamente elucidado. Afeta vias de sinalização celular.',
    posologias: [
      { indicacao: 'Lúpus', adultos: { dose: '200-400mg/dia', frequencia: '1-2x/dia', doseMaxima: '400mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Retinopatia pré-existente', 'Miastenia gravis'],
    precaucoes: ['Retinopatia', 'DRC', 'Hepatopatia', 'G6PD'],
    efeitosAdversos: { comuns: ['Náusea', 'Cefaleia', 'Rash'], graves: ['Retinopatia irreversível', 'Cardiomiopatia', 'Mielossupressão'] },
    interacoes: [{ medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Aumento de níveis', conduta: 'Monitorar' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Reduzir 50%' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Exame oftalmológico anual', 'Hemograma', 'Função hepática'],
    orientacoesPaciente: ['Exame de fundo de olho anual obrigatório', 'Pode levar meses para efeito'],
    doencasRelacionadas: ['lupus', 'artrite-reumatoide'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['imunossupressor', 'lupus', 'reumatologia']
  },
];

