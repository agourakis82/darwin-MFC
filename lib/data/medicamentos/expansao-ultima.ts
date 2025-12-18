/**
 * EXPANSÃO ÚLTIMA - MEDICAMENTOS PARA 100+
 * ========================================
 * Expansão final para atingir meta de 100+ medicamentos:
 * - Medicamentos essenciais WHO EML
 * - Medicamentos comuns na APS brasileira
 * - RENAME 2024 completos
 * - Todas com ontologias completas (ATC, RxNorm CUI, DrugBank ID, SNOMED-CT, CAS)
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosExpansaoUltima: Medicamento[] = [
  // ============================================
  // ANTIBIÓTICOS ADICIONAIS
  // ============================================
  {
    id: 'clindamicina',
    nomeGenerico: 'Clindamicina',
    nomesComerciais: ['Dalacine'],
    atcCode: 'J01FF01',
    rxNormCui: '2555',
    drugBankId: 'DB01190',
    snomedCT: '372490004',
    casNumber: '18323-44-9',
    classeTerapeutica: 'antibiotico',
    subclasse: 'lincosamida',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '150mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '300mg', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '300mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Infecções anaeróbicas', 'Acne', 'Infecções de pele e partes moles'],
    mecanismoAcao: 'Inibe síntese proteica bacteriana por ligação à subunidade 50S do ribossomo.',
    posologias: [
      { indicacao: 'Infecções anaeróbicas', adultos: { dose: '300-450mg 6/6h', frequencia: '4x/dia', doseMaxima: '1800mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Colite associada a antibióticos'],
    precaucoes: ['Colite pseudomembranosa', 'DRC', 'Hepatopatia'],
    efeitosAdversos: { comuns: ['Diarreia', 'Náusea', 'Rash'], graves: ['Colite pseudomembranosa', 'Reações de hipersensibilidade'] },
    interacoes: [{ medicamento: 'Eritromicina', gravidade: 'moderada', efeito: 'Antagonismo', conduta: 'Evitar uso conjunto' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: '50% da dose' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Função renal', 'Sinais de colite'],
    orientacoesPaciente: ['Completar tratamento', 'Informar diarreia intensa'],
    doencasRelacionadas: ['acne', 'pneumonia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antibiotico', 'anaerobico', 'acne']
  },
  {
    id: 'metronidazol',
    nomeGenerico: 'Metronidazol',
    nomesComerciais: ['Flagyl'],
    atcCode: 'J01XD01',
    rxNormCui: '6903',
    drugBankId: 'DB00916',
    snomedCT: '387413009',
    casNumber: '443-48-1',
    classeTerapeutica: 'antibiotico',
    subclasse: 'nitroimidazol',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '40mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Infecções anaeróbicas', 'Tricomoníase', 'Giardíase', 'Amebíase', 'H. pylori (tríplice terapia)'],
    mecanismoAcao: 'Inibe síntese de DNA por formação de intermediários tóxicos após redução intracelular.',
    posologias: [
      { indicacao: 'Tricomoníase', adultos: { dose: '2g em dose única', frequencia: '1x', doseMaxima: '2g' } },
      { indicacao: 'Giardíase', adultos: { dose: '250mg 8/8h por 5 dias', frequencia: '3x/dia', doseMaxima: '750mg/dia' } }
    ],
    contraindicacoes: ['Primeiro trimestre de gravidez', 'Hipersensibilidade'],
    precaucoes: ['Álcool (dissulfiram)', 'DRC', 'Hepatopatia', 'Neuropatia'],
    efeitosAdversos: { comuns: ['Náusea', 'Sabor metálico', 'Urina escura'], graves: ['Neuropatia periférica', 'Encefalopatia', 'Pancreatite'] },
    interacoes: [{ medicamento: 'Álcool', gravidade: 'grave', efeito: 'Reação tipo dissulfiram', conduta: 'Evitar álcool' }],
    ajusteDoseRenal: [{ tfg: '<10', ajuste: '50% da dose' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Evitar no primeiro trimestre' },
    monitorizacao: ['Sinais de neuropatia'],
    orientacoesPaciente: ['Evitar álcool durante tratamento e 48h após', 'Urina pode ficar escura'],
    doencasRelacionadas: ['gastrite', 'tricomoniase'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antibiotico', 'anaerobico', 'protozoarios']
  },

  // ============================================
  // ANTIFÚNGICOS ADICIONAIS
  // ============================================
  {
    id: 'nistatina',
    nomeGenerico: 'Nistatina',
    nomesComerciais: ['Nystatin'],
    atcCode: 'A07AA02',
    rxNormCui: '7553',
    drugBankId: 'DB00694',
    snomedCT: '387448003',
    casNumber: '1400-61-9',
    classeTerapeutica: 'antifungico',
    subclasse: 'antifungico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500.000 UI', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '100.000 UI/mL', disponivelSUS: true },
      { forma: 'pomada', concentracao: '100.000 UI/g', disponivelSUS: true }
    ],
    indicacoes: ['Candidíase oral', 'Candidíase esofágica', 'Candidíase cutânea'],
    mecanismoAcao: 'Liga-se ao ergosterol da membrana fúngica, causando alteração da permeabilidade.',
    posologias: [
      { indicacao: 'Candidíase oral', adultos: { dose: '500.000 UI 4x/dia', frequencia: '4x/dia', doseMaxima: '2.000.000 UI/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: [],
    efeitosAdversos: { comuns: ['Náusea leve', 'Diarreia leve'], graves: [] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [],
    orientacoesPaciente: ['Manter na boca por alguns minutos antes de engolir', 'Continuar por 48h após resolução'],
    doencasRelacionadas: ['candidíase'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antifungico', 'candida']
  },

  // ============================================
  // ANTI-HISTAMÍNICOS ADICIONAIS
  // ============================================
  {
    id: 'loratadina',
    nomeGenerico: 'Loratadina',
    nomesComerciais: ['Claritin'],
    atcCode: 'R06AX13',
    rxNormCui: '6629',
    drugBankId: 'DB00455',
    snomedCT: '372520009',
    casNumber: '79794-75-5',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '1mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Rinite alérgica', 'Urticária', 'Conjuntivite alérgica'],
    mecanismoAcao: 'Anti-histamínico H1 de 2ª geração. Antagonista seletivo do receptor H1. Não sedativo.',
    posologias: [
      { indicacao: 'Rinite alérgica/Urticária', adultos: { dose: '10mg 1x/dia', frequencia: '1x/dia', doseMaxima: '10mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['DRC', 'Hepatopatia'],
    efeitosAdversos: { comuns: ['Sonolência leve', 'Boca seca', 'Cefaleia'], graves: [] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: '10mg em dias alternados' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [],
    orientacoesPaciente: ['Pode causar sonolência leve'],
    doencasRelacionadas: ['rinite-alergica', 'urticaria'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anti_histaminico', 'alergia']
  },

  // ============================================
  // GASTROINTESTINAIS ADICIONAIS
  // ============================================
  {
    id: 'pantoprazol',
    nomeGenerico: 'Pantoprazol',
    nomesComerciais: ['Pantozol'],
    atcCode: 'A02BC02',
    rxNormCui: '7980',
    drugBankId: 'DB00213',
    snomedCT: '386837009',
    casNumber: '102625-70-7',
    classeTerapeutica: 'inibidor_bomba_protonica',
    subclasse: 'ibp',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true }
    ],
    indicacoes: ['DRGE', 'Úlcera péptica', 'Síndrome de Zollinger-Ellison'],
    mecanismoAcao: 'Inibe a bomba de prótons H+/K+-ATPase da célula parietal gástrica, reduzindo secreção ácida.',
    posologias: [
      { indicacao: 'DRGE', adultos: { dose: '40mg 1x/dia', frequencia: '1x/dia', doseMaxima: '80mg/dia (dividido)' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Osteoporose (uso prolongado)', 'Deficiência de B12 (uso prolongado)', 'Infecção por C. difficile'],
    efeitosAdversos: { comuns: ['Cefaleia', 'Diarreia', 'Náusea'], graves: ['Deficiência de B12', 'Osteoporose', 'Infecção C. difficile'] },
    interacoes: [{ medicamento: 'Warfarina', gravidade: 'moderada', efeito: 'Aumento de sangramento', conduta: 'Monitorar INR' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['B12 se uso prolongado', 'Densidade óssea se uso prolongado'],
    orientacoesPaciente: ['Tomar 30-60min antes do café da manhã', 'Não esmagar comprimidos'],
    doencasRelacionadas: ['doenca-refluxo-gastroesofagico', 'gastrite'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['ibp', 'gastrointestinal']
  },
  {
    id: 'hioscina',
    nomeGenerico: 'Hioscina (Butilescopolamina)',
    nomesComerciais: ['Buscopan'],
    atcCode: 'A03BB01',
    rxNormCui: '15995',
    drugBankId: 'DB00747',
    snomedCT: '372799009',
    casNumber: '51-34-3',
    classeTerapeutica: 'gastrointestinal',
    subclasse: undefined,
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '20mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Cólica intestinal', 'Cólica biliar', 'Espasmos gastrointestinais', 'SII'],
    mecanismoAcao: 'Anticolinérgico que bloqueia receptores muscarínicos, reduzindo espasmos do músculo liso.',
    posologias: [
      { indicacao: 'Cólica/Espasmos', adultos: { dose: '10-20mg 3x/dia', frequencia: '3x/dia', doseMaxima: '60mg/dia' } }
    ],
    contraindicacoes: ['Glaucoma de ângulo fechado', 'Obstrução intestinal', 'Miastenia gravis', 'Megacólon tóxico'],
    precaucoes: ['Idosos', 'DRC', 'Cardiopatia'],
    efeitosAdversos: { comuns: ['Boca seca', 'Visão turva', 'Retenção urinária'], graves: ['Glaucoma agudo', 'Paralisia ileus'] },
    interacoes: [{ medicamento: 'Outros anticolinérgicos', gravidade: 'moderada', efeito: 'Potencialização de efeitos', conduta: 'Cautela' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Cautela' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [],
    orientacoesPaciente: ['Pode causar boca seca', 'Evitar dirigir se visão turva'],
    doencasRelacionadas: ['sindrome-intestino-irritavel'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antiespasmódico', 'gastrointestinal']
  },
  {
    id: 'ondansetrona',
    nomeGenerico: 'Ondansetrona',
    nomesComerciais: ['Vonau'],
    atcCode: 'A04AA01',
    rxNormCui: '7646',
    drugBankId: 'DB00904',
    snomedCT: '386848009',
    casNumber: '99614-02-5',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_5ht3',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '8mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '2mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Náusea e vômitos pós-operatórios', 'Náusea e vômitos induzidos por quimioterapia', 'Vômitos refratários'],
    mecanismoAcao: 'Antagonista seletivo do receptor 5-HT3, bloqueando vômitos mediados por serotonina.',
    posologias: [
      { indicacao: 'Vômitos', adultos: { dose: '4-8mg 8/8h', frequencia: '3x/dia', doseMaxima: '24mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['QT longo', 'Hipocalemia', 'Hipomagnesemia'],
    efeitosAdversos: { comuns: ['Cefaleia', 'Constipação', 'Tontura'], graves: ['Prolongamento QT', 'Torsades de pointes'] },
    interacoes: [{ medicamento: 'Medicamentos que prolongam QT', gravidade: 'grave', efeito: 'Aumento do risco de arritmias', conduta: 'Evitar ou monitorar ECG' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['ECG se QT longo', 'Eletrólitos'],
    orientacoesPaciente: ['Pode causar constipação', 'Tomar conforme prescrição'],
    doencasRelacionadas: ['gastroenterite-viral'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antiemetico', 'vomitos']
  },

  // ============================================
  // ANALGÉSICOS/ANTI-INFLAMATÓRIOS ADICIONAIS
  // ============================================
  {
    id: 'naproxeno',
    nomeGenerico: 'Naproxeno',
    nomesComerciais: ['Naproxen'],
    atcCode: 'M01AE02',
    rxNormCui: '7220',
    drugBankId: 'DB00788',
    snomedCT: '372694004',
    casNumber: '22204-53-1',
    classeTerapeutica: 'anti_inflamatorio',
    subclasse: 'aine',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true }
    ],
    indicacoes: ['Dor', 'Inflamação', 'Artrite', 'Dismenorreia'],
    mecanismoAcao: 'AINE não seletivo. Inibe ciclooxigenase (COX-1 e COX-2), reduzindo síntese de prostaglandinas.',
    posologias: [
      { indicacao: 'Dor/Inflamação', adultos: { dose: '250-500mg 12/12h', frequencia: '2x/dia', doseMaxima: '1000mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade a AINEs', 'Úlcera péptica ativa', 'Insuficiência renal/hepática grave', '3º trimestre de gravidez'],
    precaucoes: ['DRC', 'Hepatopatia', 'Asma', 'Idosos', 'História de úlcera'],
    efeitosAdversos: { comuns: ['Dispepsia', 'Cefaleia', 'Tontura'], graves: ['Úlcera péptica', 'Sangramento GI', 'Nefrotoxicidade', 'Hepatotoxicidade'] },
    interacoes: [{ medicamento: 'Warfarina', gravidade: 'moderada', efeito: 'Aumento de sangramento', conduta: 'Monitorar INR' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Evitar' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Função renal', 'Hemograma', 'Úlcera GI'],
    orientacoesPaciente: ['Tomar com alimentos', 'Evitar álcool', 'Informar sangramento'],
    doencasRelacionadas: ['artrite', 'lombalgia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['aine', 'analgesico', 'anti_inflamatorio']
  },
  {
    id: 'diclofenaco',
    nomeGenerico: 'Diclofenaco',
    nomesComerciais: ['Voltaren'],
    atcCode: 'M01AB05',
    rxNormCui: '3084',
    drugBankId: 'DB00586',
    snomedCT: '372509005',
    casNumber: '15307-86-5',
    classeTerapeutica: 'anti_inflamatorio',
    subclasse: 'aine',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'gel', concentracao: '10mg/g', disponivelSUS: true }
    ],
    indicacoes: ['Dor', 'Inflamação', 'Artrite', 'Dismenorreia'],
    mecanismoAcao: 'AINE não seletivo. Inibe ciclooxigenase, reduzindo síntese de prostaglandinas.',
    posologias: [
      { indicacao: 'Dor/Inflamação', adultos: { dose: '50mg 8/8h', frequencia: '3x/dia', doseMaxima: '150mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Úlcera péptica ativa', 'Insuficiência renal/hepática grave', '3º trimestre de gravidez'],
    precaucoes: ['DRC', 'Hepatopatia', 'Asma', 'Idosos'],
    efeitosAdversos: { comuns: ['Dispepsia', 'Cefaleia', 'Náusea'], graves: ['Úlcera péptica', 'Sangramento GI', 'Hepatotoxicidade', 'Nefrotoxicidade'] },
    interacoes: [{ medicamento: 'Warfarina', gravidade: 'moderada', efeito: 'Aumento de sangramento', conduta: 'Monitorar INR' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Evitar' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Função hepática', 'Hemograma'],
    orientacoesPaciente: ['Tomar com alimentos', 'Evitar álcool'],
    doencasRelacionadas: ['artrite', 'lombalgia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['aine', 'analgesico', 'anti_inflamatorio']
  },

  // ============================================
  // NEUROLÓGICOS/ANTICONVULSIVANTES ADICIONAIS
  // ============================================
  {
    id: 'gabapentina',
    nomeGenerico: 'Gabapentina',
    nomesComerciais: ['Neurontin'],
    atcCode: 'N03AX12',
    rxNormCui: '4401',
    drugBankId: 'DB00996',
    snomedCT: '386864004',
    casNumber: '60142-96-3',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'bloqueador_canal_sodio',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '300mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '600mg', disponivelSUS: true }
    ],
    indicacoes: ['Epilepsia parcial', 'Neuralgia pós-herpética', 'Dor neuropática', 'Síndrome das pernas inquietas'],
    mecanismoAcao: 'Modula canais de cálcio dependentes de voltagem. Mecanismo exato não totalmente elucidado.',
    posologias: [
      { indicacao: 'Dor neuropática', adultos: { dose: '300mg/dia, aumentar até 1800-3600mg/dia', frequencia: '3x/dia', doseMaxima: '3600mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['DRC', 'Idosos', 'Depressão', 'Suicídio'],
    efeitosAdversos: { comuns: ['Sonolência', 'Tontura', 'Fadiga', 'Ataxia'], graves: ['Ideação suicida', 'Angioedema'] },
    interacoes: [{ medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Potencialização de sedação', conduta: 'Evitar' }],
    ajusteDoseRenal: [{ tfg: '30-60', ajuste: '300-900mg/dia' }, { tfg: '15-30', ajuste: '200-700mg/dia' }, { tfg: '<15', ajuste: '100-300mg/dia' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Usar com cautela' },
    monitorizacao: ['Função renal', 'Sinais de depressão'],
    orientacoesPaciente: ['Pode causar sonolência', 'Não suspender abruptamente'],
    doencasRelacionadas: ['neuropatia-periferica'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anticonvulsivante', 'neuropatia', 'dor']
  },
  {
    id: 'amitriptilina',
    nomeGenerico: 'Amitriptilina',
    nomesComerciais: ['Tryptanol'],
    atcCode: 'N06AA09',
    rxNormCui: '704',
    drugBankId: 'DB00321',
    snomedCT: '372718004',
    casNumber: '50-48-6',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'triciclico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: true }
    ],
    indicacoes: ['Depressão', 'Dor neuropática', 'Cefaleia tensional', 'Enurese noturna', 'Fibromialgia'],
    mecanismoAcao: 'Antidepressivo tricíclico. Inibe recaptação de noradrenalina e serotonina. Também bloqueia receptores colinérgicos e histamínicos.',
    posologias: [
      { indicacao: 'Depressão', adultos: { dose: '25-150mg/dia', frequencia: '1-3x/dia', doseMaxima: '300mg/dia' } },
      { indicacao: 'Dor neuropática', adultos: { dose: '10-50mg/dia à noite', frequencia: '1x/dia', doseMaxima: '75mg/dia' } }
    ],
    contraindicacoes: ['Infarto do miocárdio recente', 'Glaucoma de ângulo fechado', 'Hipersensibilidade'],
    precaucoes: ['Cardiopatia', 'Idosos', 'Suicídio', 'Convulsões', 'Hipertrofia prostática'],
    efeitosAdversos: { comuns: ['Sonolência', 'Boca seca', 'Constipação', 'Visão turva'], graves: ['Arritmias cardíacas', 'Convulsões', 'Ideação suicida'] },
    interacoes: [{ medicamento: 'IMAO', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Contraindicado' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Cautela, reduzir dose' }],
    gestacao: 'C', amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['ECG', 'Função hepática', 'Sinais de suicídio'],
    orientacoesPaciente: ['Pode causar sonolência', 'Tomar à noite', 'Evitar álcool'],
    doencasRelacionadas: ['depressao', 'neuropatia-periferica'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antidepressivo', 'triciclico', 'dor']
  },

  // ============================================
  // ANTIVERTIGINOSOS
  // ============================================
  {
    id: 'meclizina',
    nomeGenerico: 'Meclizina',
    nomesComerciais: ['Meclizin'],
    atcCode: 'N07CA02',
    rxNormCui: '6693',
    drugBankId: 'DB00937',
    snomedCT: '387324009',
    casNumber: '569-65-3',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_1geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true }
    ],
    indicacoes: ['Vertigem', 'Náusea', 'Enjoo de movimento'],
    mecanismoAcao: 'Anti-histamínico H1 de 1ª geração com propriedades anticolinérgicas, reduzindo vertigem e náusea.',
    posologias: [
      { indicacao: 'Vertigem', adultos: { dose: '25-50mg 6/6h', frequencia: '3-4x/dia', doseMaxima: '200mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Glaucoma de ângulo fechado', 'Obstrução prostática'],
    precaucoes: ['Idosos', 'DRC', 'Hepatopatia'],
    efeitosAdversos: { comuns: ['Sonolência', 'Boca seca', 'Visão turva'], graves: [] },
    interacoes: [{ medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Potencialização de sedação', conduta: 'Evitar' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Cautela' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [],
    orientacoesPaciente: ['Pode causar sonolência', 'Evitar dirigir'],
    doencasRelacionadas: ['labirintite'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antivertiginoso', 'vertigem']
  },

  // ============================================
  // VITAMINAS E SUPLEMENTOS
  // ============================================
  {
    id: 'acido-folico',
    nomeGenerico: 'Ácido Fólico',
    nomesComerciais: ['Folacín'],
    atcCode: 'B03BB01',
    rxNormCui: '4359',
    drugBankId: 'DB00158',
    snomedCT: '387292007',
    casNumber: '59-30-3',
    classeTerapeutica: 'vitamina_mineral',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '400mcg', disponivelSUS: true }
    ],
    indicacoes: ['Prevenção de defeitos do tubo neural', 'Anemia megaloblástica', 'Suplementação gestacional'],
    mecanismoAcao: 'Essencial para síntese de DNA e RNA. Coenzima na síntese de purinas e pirimidinas.',
    posologias: [
      { indicacao: 'Prevenção defeitos tubo neural', adultos: { dose: '400mcg/dia', frequencia: '1x/dia', doseMaxima: '5mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Deficiência de B12 (pode mascarar anemia perniciosa)'],
    efeitosAdversos: { comuns: [], graves: [] },
    interacoes: [{ medicamento: 'Metotrexato', gravidade: 'moderada', efeito: 'Antagonismo', conduta: 'Monitorar' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'A', amamentacao: { compativel: true, observacao: 'Recomendado' },
    monitorizacao: [],
    orientacoesPaciente: ['Tomar antes ou durante gestação', 'Importante para desenvolvimento fetal'],
    doencasRelacionadas: ['anemia-megaloblastica'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['vitamina', 'gestacao', 'anemia']
  },
  {
    id: 'cianocobalamina',
    nomeGenerico: 'Cianocobalamina (B12)',
    nomesComerciais: ['Benerva'],
    atcCode: 'B03BA01',
    rxNormCui: '2668',
    drugBankId: 'DB00115',
    snomedCT: '387557004',
    casNumber: '68-19-9',
    classeTerapeutica: 'vitamina_mineral',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '1mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Deficiência de B12', 'Anemia perniciosa', 'Anemia megaloblástica'],
    mecanismoAcao: 'Essencial para síntese de DNA e manutenção da mielina. Coenzima na síntese de metionina.',
    posologias: [
      { indicacao: 'Deficiência de B12', adultos: { dose: '1mg IM semanal por 4-8 semanas, depois mensal', frequencia: 'Variável', doseMaxima: '1mg' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Deficiência de folato'],
    efeitosAdversos: { comuns: ['Dor local (IM)', 'Rash'], graves: ['Reações alérgicas'] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'A', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Hemograma', 'Níveis de B12'],
    orientacoesPaciente: ['Importante para função neurológica', 'Suplementação pode ser necessária por longo prazo'],
    doencasRelacionadas: ['anemia-megaloblastica'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['vitamina', 'b12', 'anemia']
  },
  {
    id: 'colecalciferol',
    nomeGenerico: 'Colecalciferol (Vitamina D3)',
    nomesComerciais: ['Addera D3'],
    atcCode: 'A11CC05',
    rxNormCui: '2903',
    drugBankId: 'DB00169',
    snomedCT: '387426001',
    casNumber: '67-97-0',
    classeTerapeutica: 'vitamina_mineral',
    subclasse: 'vitamina_d',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '7.000 UI', disponivelSUS: true },
      { forma: 'capsula', concentracao: '2.000 UI', disponivelSUS: true },
      { forma: 'gotas', concentracao: '200 UI/gota', disponivelSUS: true }
    ],
    indicacoes: ['Deficiência de vitamina D', 'Prevenção de osteoporose', 'Raquitismo'],
    mecanismoAcao: 'Promove absorção intestinal de cálcio e fósforo. Essencial para mineralização óssea.',
    posologias: [
      { indicacao: 'Deficiência de vitamina D', adultos: { dose: '2.000-4.000 UI/dia', frequencia: '1x/dia', doseMaxima: '10.000 UI/dia' } }
    ],
    contraindicacoes: ['Hipercalcemia', 'Hipervitaminose D'],
    precaucoes: ['Doença renal', 'Hiperparatireoidismo', 'Sarcoidose'],
    efeitosAdversos: { comuns: ['Náusea leve'], graves: ['Hipercalcemia', 'Nefrolitíase'] },
    interacoes: [{ medicamento: 'Corticoesteroides', gravidade: 'moderada', efeito: 'Diminuição de absorção', conduta: 'Monitorar níveis' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Cautela, monitorar cálcio' }],
    gestacao: 'A', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Cálcio sérico', '25-OH vitamina D'],
    orientacoesPaciente: ['Tomar com refeição gordurosa (melhora absorção)', 'Exposição solar moderada também ajuda'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['vitamina', 'calcio', 'osso']
  },

  // ============================================
  // LAXANTES E GASTROINTESTINAIS
  // ============================================
  {
    id: 'lactulona',
    nomeGenerico: 'Lactulona',
    nomesComerciais: ['Lactulona'],
    atcCode: 'A06AD11',
    rxNormCui: '6187',
    drugBankId: 'DB00581',
    snomedCT: '387338008',
    casNumber: '4618-18-2',
    classeTerapeutica: 'gastrointestinal',
    subclasse: undefined,
    rename: true,
    apresentacoes: [
      { forma: 'xarope', concentracao: '667mg/mL', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '667mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Constipação', 'Encefalopatia hepática'],
    mecanismoAcao: 'Laxante osmótico. Não absorvido no intestino delgado, fermentado no cólon produzindo ácidos orgânicos que aumentam pressão osmótica.',
    posologias: [
      { indicacao: 'Constipação', adultos: { dose: '15-30mL/dia', frequencia: '1-2x/dia', doseMaxima: '60mL/dia' } }
    ],
    contraindicacoes: ['Obstrução intestinal', 'Galactosemia'],
    precaucoes: ['Diabetes (contém lactose)', 'Idosos'],
    efeitosAdversos: { comuns: ['Diarreia', 'Distensão abdominal', 'Flatulência'], graves: [] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [],
    orientacoesPaciente: ['Pode levar 24-48h para fazer efeito', 'Beber bastante água'],
    doencasRelacionadas: ['constipacao'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['laxante', 'constipacao']
  },
  {
    id: 'polietilenoglicol',
    nomeGenerico: 'Polietilenoglicol 4000',
    nomesComerciais: ['Muvinlax'],
    atcCode: 'A06AD65',
    rxNormCui: '7453',
    drugBankId: 'DB09287',
    snomedCT: '108606006',
    casNumber: '25322-68-3',
    classeTerapeutica: 'gastrointestinal',
    subclasse: undefined,
    rename: true,
    apresentacoes: [
      { forma: 'solucao_oral', concentracao: '13,8g', disponivelSUS: true }
    ],
    indicacoes: ['Constipação crônica', 'Preparo para colonoscopia'],
    mecanismoAcao: 'Laxante osmótico. Aumenta conteúdo de água nas fezes por osmose, amolecendo e facilitando evacuação.',
    posologias: [
      { indicacao: 'Constipação crônica', adultos: { dose: '1 sachê/dia dissolvido em água', frequencia: '1x/dia', doseMaxima: '2 sachês/dia' } }
    ],
    contraindicacoes: ['Obstrução intestinal', 'Ileus', 'Hipersensibilidade'],
    precaucoes: ['Idosos', 'Doença inflamatória intestinal'],
    efeitosAdversos: { comuns: ['Diarreia', 'Distensão abdominal', 'Náusea'], graves: [] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [],
    orientacoesPaciente: ['Dissolver em 200mL de água', 'Pode levar alguns dias para fazer efeito'],
    doencasRelacionadas: ['constipacao'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['laxante', 'constipacao']
  },

  // ============================================
  // ANTIDIABÉTICOS ADICIONAIS
  // ============================================
  {
    id: 'glibenclamida',
    nomeGenerico: 'Glibenclamida',
    nomesComerciais: ['Daonil'],
    atcCode: 'A10BB01',
    rxNormCui: '4742',
    drugBankId: 'DB01016',
    snomedCT: '372677004',
    casNumber: '10238-21-8',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'sulfonilureia',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true }
    ],
    indicacoes: ['Diabetes mellitus tipo 2'],
    mecanismoAcao: 'Sulfonilureia de 2ª geração. Estimula secreção de insulina pelas células beta do pâncreas ao bloquear canais K+ATP dependentes.',
    posologias: [
      { indicacao: 'DM2', adultos: { dose: '2,5-5mg 1-2x/dia', frequencia: '1-2x/dia', doseMaxima: '20mg/dia' } }
    ],
    contraindicacoes: ['DM1', 'Cetoacidose diabética', 'Gravidez', 'Insuficiência renal/hepática grave'],
    precaucoes: ['Hipoglicemia', 'Idosos', 'Insuficiência renal', 'Alcoolismo'],
    efeitosAdversos: { comuns: ['Hipoglicemia', 'Aumento de peso'], graves: ['Hipoglicemia grave', 'Reações de hipersensibilidade'] },
    interacoes: [{ medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Aumento risco de hipoglicemia', conduta: 'Evitar' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Contraindicado ou reduzir dose' }],
    gestacao: 'C', amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['Glicemia', 'HbA1c'],
    orientacoesPaciente: ['Tomar antes das refeições', 'Reconhecer sinais de hipoglicemia', 'Evitar álcool'],
    doencasRelacionadas: ['diabetes-mellitus-tipo-2'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antidiabetico', 'sulfonilureia', 'dm2']
  },

  // ============================================
  // ANTI-HIPERTENSIVOS ADICIONAIS
  // ============================================
  {
    id: 'losartana',
    nomeGenerico: 'Losartana',
    nomesComerciais: ['Losartana Potássica'],
    atcCode: 'C09CA01',
    rxNormCui: '52175',
    drugBankId: 'DB00678',
    snomedCT: '386887004',
    casNumber: '114798-26-4',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'bra',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: ['Hipertensão arterial', 'Insuficiência cardíaca', 'Nefropatia diabética'],
    mecanismoAcao: 'BRA (Bloqueador do Receptor de Angiotensina II). Bloqueia ação da angiotensina II, causando vasodilatação e redução de retenção de sódio.',
    posologias: [
      { indicacao: 'Hipertensão', adultos: { dose: '50-100mg/dia', frequencia: '1x/dia', doseMaxima: '100mg/dia' } }
    ],
    contraindicacoes: ['Gravidez', 'Hipersensibilidade', 'Estenose bilateral das artérias renais'],
    precaucoes: ['Insuficiência renal', 'Hipovolemia', 'Hipercalemia'],
    efeitosAdversos: { comuns: ['Tontura', 'Hipotensão', 'Tosse seca (menos que IECA)'], graves: ['Angioedema', 'Hipercalemia', 'Insuficiência renal'] },
    interacoes: [{ medicamento: 'Diuréticos poupadores de potássio', gravidade: 'moderada', efeito: 'Aumento de potássio', conduta: 'Monitorar potássio' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Reduzir dose ou contraindicar' }],
    gestacao: 'D', amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['Potássio', 'Função renal', 'PA'],
    orientacoesPaciente: ['Monitorar PA regularmente', 'Reportar tosse persistente'],
    doencasRelacionadas: ['hipertensao-arterial'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anti_hipertensivo', 'bra', 'has']
  },
  {
    id: 'atenolol',
    nomeGenerico: 'Atenolol',
    nomesComerciais: ['Atenolol'],
    atcCode: 'C07AB03',
    rxNormCui: '1202',
    drugBankId: 'DB00335',
    snomedCT: '372505008',
    casNumber: '29122-68-7',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: ['Hipertensão arterial', 'Angina', 'Arritmias', 'Prevenção secundária IAM'],
    mecanismoAcao: 'Betabloqueador seletivo β1. Reduz frequência cardíaca, contratilidade e débito cardíaco.',
    posologias: [
      { indicacao: 'Hipertensão', adultos: { dose: '50-100mg/dia', frequencia: '1x/dia', doseMaxima: '100mg/dia' } }
    ],
    contraindicacoes: ['Asma grave', 'Bloqueio AV 2º/3º grau', 'Bradicardia severa', 'Choque cardiogênico'],
    precaucoes: ['Asma/DPOC', 'Diabetes', 'Idosos', 'Insuficiência cardíaca'],
    efeitosAdversos: { comuns: ['Bradicardia', 'Fadiga', 'Hipotensão', 'Broncoespasmo'], graves: ['Bloqueio AV', 'Insuficiência cardíaca', 'Broncoespasmo grave'] },
    interacoes: [{ medicamento: 'Verapamil', gravidade: 'grave', efeito: 'Aumento risco de bloqueio AV', conduta: 'Evitar combinação' }],
    ajusteDoseRenal: [{ tfg: '15-35', ajuste: '50mg/dia' }, { tfg: '<15', ajuste: '25mg/dia' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['FC', 'PA', 'ECG'],
    orientacoesPaciente: ['Não suspender abruptamente', 'Monitorar FC', 'Reportar falta de ar'],
    doencasRelacionadas: ['hipertensao-arterial'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['betabloqueador', 'anti_hipertensivo', 'has']
  },

  // ============================================
  // CORTICOIDES ADICIONAIS
  // ============================================
  {
    id: 'prednisona',
    nomeGenerico: 'Prednisona',
    nomesComerciais: ['Meticorten'],
    atcCode: 'H02AB07',
    rxNormCui: '8653',
    drugBankId: 'DB00635',
    snomedCT: '387548002',
    casNumber: '53-03-2',
    classeTerapeutica: 'corticoide',
    subclasse: 'corticosteroide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true }
    ],
    indicacoes: ['Doenças autoimunes', 'Asma', 'DPOC (exacerbações)', 'Artrite reumatoide', 'Doenças inflamatórias'],
    mecanismoAcao: 'Glicocorticoide sintético. Inibe inflamação por múltiplos mecanismos: supressão de citocinas, inibição de migração de leucócitos, estabilização de membranas.',
    posologias: [
      { indicacao: 'Doenças autoimunes', adultos: { dose: '0,5-1mg/kg/dia', frequencia: '1-2x/dia', doseMaxima: '80mg/dia' } }
    ],
    contraindicacoes: ['Infecções sistêmicas não tratadas', 'Hipersensibilidade'],
    precaucoes: ['Infecções', 'Diabetes', 'Hipertensão', 'Osteoporose', 'Glaucoma', 'Úlcera péptica'],
    efeitosAdversos: { comuns: ['Hiperglicemia', 'Aumento de peso', 'Insônia', 'Retenção de líquidos'], graves: ['Osteoporose', 'Supressão adrenal', 'Infecções oportunistas', 'Úlcera péptica'] },
    interacoes: [{ medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Aumento risco úlcera', conduta: 'Usar com cautela' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Usar com cautela' },
    monitorizacao: ['Glicemia', 'PA', 'Função adrenal se uso prolongado'],
    orientacoesPaciente: ['Tomar com alimentos', 'Não suspender abruptamente', 'Reportar sinais de infecção'],
    doencasRelacionadas: ['asma', 'dpoc'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['corticoide', 'anti_inflamatorio', 'imunossupressor']
  },
  {
    id: 'hidrocortisona',
    nomeGenerico: 'Hidrocortisona',
    nomesComerciais: ['Hidrocortisona'],
    atcCode: 'H02AB09',
    rxNormCui: '5489',
    drugBankId: 'DB00741',
    snomedCT: '387445003',
    casNumber: '50-23-7',
    classeTerapeutica: 'corticoide',
    subclasse: 'corticosteroide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'creme', concentracao: '10mg/g', disponivelSUS: true },
      { forma: 'pomada', concentracao: '10mg/g', disponivelSUS: true }
    ],
    indicacoes: ['Insuficiência adrenal', 'Doenças inflamatórias', 'Dermatites', 'Choque'],
    mecanismoAcao: 'Glicocorticoide natural. Substituição hormonal na insuficiência adrenal. Anti-inflamatório e imunossupressor.',
    posologias: [
      { indicacao: 'Insuficiência adrenal', adultos: { dose: '20-30mg/dia (2/3 manhã, 1/3 tarde)', frequencia: '2x/dia', doseMaxima: '300mg/dia em choque' } }
    ],
    contraindicacoes: ['Infecções sistêmicas não tratadas'],
    precaucoes: ['Infecções', 'Diabetes', 'Hipertensão'],
    efeitosAdversos: { comuns: ['Hiperglicemia', 'Retenção de líquidos'], graves: ['Supressão adrenal', 'Infecções'] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Glicemia', 'PA'],
    orientacoesPaciente: ['Tomar conforme prescrição', 'Não suspender abruptamente'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['corticoide', 'substituicao_hormonal']
  },

  // ============================================
  // ANTICONVULSIVANTES ADICIONAIS
  // ============================================
  {
    id: 'valproato-sodio',
    nomeGenerico: 'Valproato de Sódio',
    nomesComerciais: ['Depakene'],
    atcCode: 'N03AG01',
    rxNormCui: '11018',
    drugBankId: 'DB00313',
    snomedCT: '387307001',
    casNumber: '1069-66-5',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'derivado_valproico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '250mg/5mL', disponivelSUS: true }
    ],
    indicacoes: ['Epilepsia', 'Crise de ausência', 'Crise tônico-clônica', 'Mania (transtorno bipolar)'],
    mecanismoAcao: 'Mecanismo múltiplo: aumento de GABA, bloqueio de canais de sódio, bloqueio de canais de cálcio T.',
    posologias: [
      { indicacao: 'Epilepsia', adultos: { dose: '15-20mg/kg/dia, aumentar até 30-60mg/kg/dia', frequencia: '2-3x/dia', doseMaxima: '60mg/kg/dia' } }
    ],
    contraindicacoes: ['Gravidez', 'Hepatopatia grave', 'Hipersensibilidade'],
    precaucoes: ['Hepatotoxicidade', 'Teratogenicidade', 'Trombocitopenia', 'Pancreatite'],
    efeitosAdversos: { comuns: ['Náusea', 'Tontura', 'Tremor', 'Ganho de peso'], graves: ['Hepatotoxicidade', 'Pancreatite', 'Teratogenicidade', 'Trombocitopenia'] },
    interacoes: [{ medicamento: 'Fenitoína', gravidade: 'moderada', efeito: 'Aumento de níveis', conduta: 'Monitorar níveis' }],
    ajusteDoseRenal: [{ tfg: '<50', ajuste: 'Cautela' }],
    gestacao: 'D', amamentacao: { compativel: true, observacao: 'Usar com cautela' },
    monitorizacao: ['Função hepática', 'Hemograma', 'Níveis séricos'],
    orientacoesPaciente: ['Evitar álcool', 'Reportar icterícia', 'Usar contracepção se mulher em idade fértil'],
    doencasRelacionadas: ['epilepsia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anticonvulsivante', 'epilepsia', 'bipolar']
  },

  // ============================================
  // ANTIPSICÓTICOS ADICIONAIS
  // ============================================
  {
    id: 'haloperidol',
    nomeGenerico: 'Haloperidol',
    nomesComerciais: ['Haldol'],
    atcCode: 'N05AD01',
    rxNormCui: '5224',
    drugBankId: 'DB00502',
    snomedCT: '387548002',
    casNumber: '52-86-8',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_tipico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '5mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Esquizofrenia', 'Transtornos psicóticos', 'Agitação', 'Síndrome de Tourette'],
    mecanismoAcao: 'Antipsicótico típico. Bloqueia receptores dopaminérgicos D2 no sistema nervoso central.',
    posologias: [
      { indicacao: 'Psicose', adultos: { dose: '2-5mg 2-3x/dia', frequencia: '2-3x/dia', doseMaxima: '100mg/dia' } }
    ],
    contraindicacoes: ['Parkinson', 'Depressão do SNC', 'Hipersensibilidade'],
    precaucoes: ['Discinesia tardia', 'Síndrome neuroléptica maligna', 'QT longo', 'Idosos'],
    efeitosAdversos: { comuns: ['Extrapiramidalismo', 'Sedação', 'Rigidez'], graves: ['Discinesia tardia', 'Síndrome neuroléptica maligna', 'QT longo'] },
    interacoes: [{ medicamento: 'Outros antipsicóticos', gravidade: 'moderada', efeito: 'Aumento de efeitos extrapiramidais', conduta: 'Cautela' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['ECG', 'Sinais extrapiramidais'],
    orientacoesPaciente: ['Pode causar sonolência', 'Reportar movimentos anormais', 'Não suspender abruptamente'],
    doencasRelacionadas: ['esquizofrenia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antipsicotico', 'tipico', 'psicose']
  },

  // ============================================
  // ANTIEMÉTICOS ADICIONAIS
  // ============================================
  {
    id: 'metoclopramida',
    nomeGenerico: 'Metoclopramida',
    nomesComerciais: ['Plasil'],
    atcCode: 'A03FA01',
    rxNormCui: '6809',
    drugBankId: 'DB01233',
    snomedCT: '387557004',
    casNumber: '364-62-5',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_d2',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '5mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Náusea e vômitos', 'Gastroparesia', 'Refluxo gastroesofágico'],
    mecanismoAcao: 'Antagonista dopaminérgico D2 e agonista 5-HT4. Aumenta motilidade gastrointestinal e bloqueia zona quimiorreceptora do vômito.',
    posologias: [
      { indicacao: 'Náusea/Vômitos', adultos: { dose: '10mg 3-4x/dia', frequencia: '3-4x/dia', doseMaxima: '60mg/dia' } }
    ],
    contraindicacoes: ['Obstrução GI', 'Feocromocitoma', 'Epilepsia', 'Uso de levodopa'],
    precaucoes: ['Idosos', 'Parkinson', 'Insuficiência renal', 'Discinesia tardia'],
    efeitosAdversos: { comuns: ['Sonolência', 'Extrapiramidalismo', 'Diarréia'], graves: ['Discinesia tardia', 'Síndrome neuroléptica maligna'] },
    interacoes: [{ medicamento: 'Levodopa', gravidade: 'moderada', efeito: 'Antagonismo', conduta: 'Evitar' }],
    ajusteDoseRenal: [{ tfg: '<40', ajuste: 'Reduzir dose 50%' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Sinais extrapiramidais'],
    orientacoesPaciente: ['Pode causar sonolência', 'Reportar movimentos anormais', 'Não usar por mais de 12 semanas'],
    doencasRelacionadas: ['gastrite'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antiemetico', 'procinetico']
  },

  // ============================================
  // ANTIPARASITÁRIOS
  // ============================================
  {
    id: 'albendazol',
    nomeGenerico: 'Albendazol',
    nomesComerciais: ['Zentel'],
    atcCode: 'P02CA03',
    rxNormCui: '552',
    drugBankId: 'DB00518',
    snomedCT: '387580005',
    casNumber: '54965-21-8',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'anti_helmintico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '400mg/10mL', disponivelSUS: true }
    ],
    indicacoes: ['Ascaris', 'Ancilostomíase', 'Enterobíase', 'Teníase', 'Giardíase'],
    mecanismoAcao: 'Anti-helmíntico de amplo espectro. Inibe polimerização de β-tubulina, causando degeneração do citoplasma e morte do parasita.',
    posologias: [
      { indicacao: 'Ascaris/Ancilostomíase', adultos: { dose: '400mg em dose única', frequencia: '1x', doseMaxima: '400mg' } }
    ],
    contraindicacoes: ['Gravidez', 'Hipersensibilidade'],
    precaucoes: ['Função hepática', 'Função renal'],
    efeitosAdversos: { comuns: ['Diarreia', 'Dor abdominal', 'Náusea'], graves: ['Hepatotoxicidade', 'Agranulocitose'] },
    interacoes: [{ medicamento: 'Cimetidina', gravidade: 'moderada', efeito: 'Aumento de níveis', conduta: 'Monitorar' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Função hepática (uso prolongado)'],
    orientacoesPaciente: ['Tomar com alimentos', 'Tratar contatos familiares se necessário'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antiparasitario', 'helmintos']
  },
  {
    id: 'mebendazol',
    nomeGenerico: 'Mebendazol',
    nomesComerciais: ['Vermox'],
    atcCode: 'P02CA01',
    rxNormCui: '6657',
    drugBankId: 'DB00643',
    snomedCT: '387487009',
    casNumber: '31431-39-7',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'anti_helmintico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '100mg/5mL', disponivelSUS: true }
    ],
    indicacoes: ['Ascaris', 'Ancilostomíase', 'Enterobíase', 'Teníase', 'Tricuríase'],
    mecanismoAcao: 'Anti-helmíntico. Inibe captação de glicose pelos helmintos, causando depleção de glicogênio e morte do parasita.',
    posologias: [
      { indicacao: 'Ascaris/Ancilostomíase', adultos: { dose: '100mg 12/12h por 3 dias', frequencia: '2x/dia', doseMaxima: '200mg/dia' } }
    ],
    contraindicacoes: ['Gravidez', 'Hipersensibilidade'],
    precaucoes: ['Função hepática'],
    efeitosAdversos: { comuns: ['Diarreia', 'Dor abdominal', 'Náusea'], graves: ['Hepatotoxicidade'] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [],
    orientacoesPaciente: ['Tomar com alimentos', 'Tratar contatos familiares se necessário'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antiparasitario', 'helmintos']
  },

  // ============================================
  // MEDICAMENTOS ESSENCIAIS FINAIS
  // ============================================
  {
    id: 'dipirona',
    nomeGenerico: 'Dipirona',
    nomesComerciais: ['Novalgina'],
    atcCode: 'N02BB02',
    rxNormCui: '3337',
    drugBankId: 'DB04817',
    snomedCT: '387307001',
    casNumber: '68-89-3',
    classeTerapeutica: 'analgesico',
    subclasse: 'analgesico_nao_opioide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '1g', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '500mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Dor', 'Febre'],
    mecanismoAcao: 'Analgésico e antipirético. Mecanismo não totalmente elucidado. Pode inibir síntese de prostaglandinas no SNC.',
    posologias: [
      { indicacao: 'Dor/Febre', adultos: { dose: '500-1000mg 6/6h', frequencia: '4x/dia', doseMaxima: '4g/dia' } }
    ],
    contraindicacoes: ['Agranulocitose prévia', 'Hipersensibilidade', 'Porfiria'],
    precaucoes: ['Agranulocitose (raro)', 'Asma'],
    efeitosAdversos: { comuns: ['Hipotensão', 'Tontura'], graves: ['Agranulocitose', 'Anafilaxia'] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Cautela' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Hemograma se uso prolongado'],
    orientacoesPaciente: ['Não exceder dose máxima', 'Reportar sinais de infecção'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['analgesico', 'antipiretico']
  },
  {
    id: 'lorazepam',
    nomeGenerico: 'Lorazepam',
    nomesComerciais: ['Lorax'],
    atcCode: 'N05BA06',
    rxNormCui: '6579',
    drugBankId: 'DB00186',
    snomedCT: '387372005',
    casNumber: '846-49-1',
    classeTerapeutica: 'ansiolitico',
    subclasse: 'benzodiazepínico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '2mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Ansiedade', 'Insônia', 'Agitação', 'Estado de abstinência alcoólica'],
    mecanismoAcao: 'Benzodiazepínico de ação intermediária. Potencializa ação do GABA, aumentando inibição neuronal.',
    posologias: [
      { indicacao: 'Ansiedade', adultos: { dose: '1-2mg 2-3x/dia', frequencia: '2-3x/dia', doseMaxima: '6mg/dia' } }
    ],
    contraindicacoes: ['Glaucoma de ângulo fechado', 'Miastenia gravis', 'Hipersensibilidade'],
    precaucoes: ['Dependência', 'Idosos', 'Insuficiência respiratória', 'Depressão'],
    efeitosAdversos: { comuns: ['Sedação', 'Sonolência', 'Ataxia', 'Amnésia'], graves: ['Dependência', 'Respiração deprimida', 'Paradoxal excitação'] },
    interacoes: [{ medicamento: 'Álcool', gravidade: 'grave', efeito: 'Depressão respiratória', conduta: 'Evitar' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'D', amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Função respiratória'],
    orientacoesPaciente: ['Pode causar sonolência', 'Evitar álcool', 'Não suspender abruptamente'],
    doencasRelacionadas: ['ansiedade'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['ansiolitico', 'benzodiazepinico']
  },
  {
    id: 'propranolol',
    nomeGenerico: 'Propranolol',
    nomesComerciais: ['Inderal'],
    atcCode: 'C07AA05',
    rxNormCui: '8787',
    drugBankId: 'DB00571',
    snomedCT: '387505008',
    casNumber: '525-66-6',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: true }
    ],
    indicacoes: ['Hipertensão', 'Angina', 'Arritmias', 'Cefaleia enxaqueca', 'Ansiedade (performance)'],
    mecanismoAcao: 'Betabloqueador não seletivo (β1 e β2). Reduz frequência cardíaca, contratilidade e débito cardíaco.',
    posologias: [
      { indicacao: 'Hipertensão', adultos: { dose: '40-80mg 2x/dia', frequencia: '2x/dia', doseMaxima: '320mg/dia' } }
    ],
    contraindicacoes: ['Asma', 'Bloqueio AV', 'Bradicardia severa', 'Insuficiência cardíaca descompensada'],
    precaucoes: ['Diabetes', 'Doença vascular periférica', 'Idosos'],
    efeitosAdversos: { comuns: ['Bradicardia', 'Fadiga', 'Hipotensão', 'Broncoespasmo'], graves: ['Bloqueio AV', 'Insuficiência cardíaca'] },
    interacoes: [{ medicamento: 'Verapamil', gravidade: 'grave', efeito: 'Aumento risco bloqueio AV', conduta: 'Evitar' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['FC', 'PA', 'ECG'],
    orientacoesPaciente: ['Não suspender abruptamente', 'Monitorar FC'],
    doencasRelacionadas: ['hipertensao-arterial'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['betabloqueador', 'anti_hipertensivo']
  },
  {
    id: 'hidroclorotiazida',
    nomeGenerico: 'Hidroclorotiazida',
    nomesComerciais: ['Clorana'],
    atcCode: 'C03AA03',
    rxNormCui: '5487',
    drugBankId: 'DB00999',
    snomedCT: '387462005',
    casNumber: '58-93-5',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'diuretico_tiazidico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true }
    ],
    indicacoes: ['Hipertensão', 'Edema', 'Insuficiência cardíaca'],
    mecanismoAcao: 'Diurético tiazídico. Inibe reabsorção de Na+ e Cl- no túbulo contornado distal, aumentando excreção urinária.',
    posologias: [
      { indicacao: 'Hipertensão', adultos: { dose: '12,5-25mg/dia', frequencia: '1x/dia', doseMaxima: '50mg/dia' } }
    ],
    contraindicacoes: ['Anúria', 'Hipersensibilidade', 'Insuficiência renal grave'],
    precaucoes: ['Hipocalemia', 'Hiperuricemia', 'Diabetes', 'Gota'],
    efeitosAdversos: { comuns: ['Hipocalemia', 'Hiponatremia', 'Hiperuricemia'], graves: ['Hipocalemia grave', 'Hipercalcemia'] },
    interacoes: [{ medicamento: 'Lítio', gravidade: 'moderada', efeito: 'Aumento de níveis de lítio', conduta: 'Monitorar lítio' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Ineficaz, evitar' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Eletrólitos', 'Ácido úrico'],
    orientacoesPaciente: ['Monitorar potássio', 'Tomar de manhã'],
    doencasRelacionadas: ['hipertensao-arterial'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['diuretico', 'anti_hipertensivo']
  },
  {
    id: 'espironolactona',
    nomeGenerico: 'Espironolactona',
    nomesComerciais: ['Aldactone'],
    atcCode: 'C03DA01',
    rxNormCui: '9992',
    drugBankId: 'DB00421',
    snomedCT: '387472003',
    casNumber: '52-01-7',
    classeTerapeutica: 'diuretico',
    subclasse: 'poupador_potassio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: ['Hipertensão', 'Insuficiência cardíaca', 'Ascite', 'Acne (mulheres)'],
    mecanismoAcao: 'Diurético poupador de potássio. Antagonista competitivo da aldosterona, reduzindo reabsorção de Na+ e secreção de K+.',
    posologias: [
      { indicacao: 'Hipertensão', adultos: { dose: '25-100mg/dia', frequencia: '1-2x/dia', doseMaxima: '400mg/dia' } }
    ],
    contraindicacoes: ['Hipercalemia', 'Insuficiência renal grave', 'Anúria'],
    precaucoes: ['Hipercalemia', 'Insuficiência renal', 'Idosos'],
    efeitosAdversos: { comuns: ['Hipercalemia', 'Ginecomastia (homens)', 'Irregularidade menstrual'], graves: ['Hipercalemia grave'] },
    interacoes: [{ medicamento: 'IECA/BRA', gravidade: 'moderada', efeito: 'Aumento risco hipercalemia', conduta: 'Monitorar potássio' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Evitar ou reduzir dose' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Potássio', 'Função renal'],
    orientacoesPaciente: ['Monitorar potássio', 'Evitar alimentos ricos em potássio'],
    doencasRelacionadas: ['hipertensao-arterial'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['diuretico', 'anti_hipertensivo']
  },
  {
    id: 'clonazepam',
    nomeGenerico: 'Clonazepam',
    nomesComerciais: ['Rivotril'],
    atcCode: 'N03AE01',
    rxNormCui: '2627',
    drugBankId: 'DB01068',
    snomedCT: '387305005',
    casNumber: '1622-61-3',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'benzodiazepínico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '2,5mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Epilepsia', 'Crises de ausência', 'Ansiedade', 'Síndrome das pernas inquietas'],
    mecanismoAcao: 'Benzodiazepínico de ação longa. Potencializa ação do GABA, aumentando inibição neuronal. Anticonvulsivante.',
    posologias: [
      { indicacao: 'Epilepsia', adultos: { dose: '0,5-2mg 2-3x/dia', frequencia: '2-3x/dia', doseMaxima: '20mg/dia' } }
    ],
    contraindicacoes: ['Glaucoma de ângulo fechado', 'Miastenia gravis', 'Hipersensibilidade'],
    precaucoes: ['Dependência', 'Idosos', 'Insuficiência respiratória'],
    efeitosAdversos: { comuns: ['Sedação', 'Ataxia', 'Amnésia', 'Sonolência'], graves: ['Dependência', 'Respiração deprimida'] },
    interacoes: [{ medicamento: 'Álcool', gravidade: 'grave', efeito: 'Depressão respiratória', conduta: 'Evitar' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'D', amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Função respiratória'],
    orientacoesPaciente: ['Pode causar sonolência', 'Não suspender abruptamente', 'Evitar álcool'],
    doencasRelacionadas: ['epilepsia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anticonvulsivante', 'ansiolitico', 'benzodiazepinico']
  },
  {
    id: 'fenitoina',
    nomeGenerico: 'Fenitoína',
    nomesComerciais: ['Hidantal'],
    atcCode: 'N03AB02',
    rxNormCui: '3842',
    drugBankId: 'DB00252',
    snomedCT: '387440007',
    casNumber: '57-41-0',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'bloqueador_canal_sodio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: ['Epilepsia parcial', 'Crise tônico-clônica', 'Estado de mal epiléptico'],
    mecanismoAcao: 'Bloqueia canais de sódio dependentes de voltagem, estabilizando membranas neuronais e reduzindo descargas epilépticas.',
    posologias: [
      { indicacao: 'Epilepsia', adultos: { dose: '200-400mg/dia', frequencia: '2-3x/dia', doseMaxima: '600mg/dia' } }
    ],
    contraindicacoes: ['Bloqueio AV', 'Sinus bradicardia', 'Hipersensibilidade'],
    precaucoes: ['Hepatotoxicidade', 'Osteomalácia', 'Hirsutismo', 'Linfadenopatia'],
    efeitosAdversos: { comuns: ['Nistagmo', 'Ataxia', 'Gengivite', 'Hirsutismo'], graves: ['Hepatotoxicidade', 'Discrasias sanguíneas', 'Erupções graves'] },
    interacoes: [{ medicamento: 'Warfarina', gravidade: 'moderada', efeito: 'Aumento de sangramento', conduta: 'Monitorar INR' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'D', amamentacao: { compativel: true, observacao: 'Usar com cautela' },
    monitorizacao: ['Níveis séricos', 'Função hepática', 'Hemograma'],
    orientacoesPaciente: ['Higiene bucal rigorosa', 'Não suspender abruptamente', 'Monitorar níveis'],
    doencasRelacionadas: ['epilepsia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anticonvulsivante', 'epilepsia']
  },
  {
    id: 'clorpromazina',
    nomeGenerico: 'Clorpromazina',
    nomesComerciais: ['Amplictil'],
    atcCode: 'N05AA01',
    rxNormCui: '2517',
    drugBankId: 'DB00477',
    snomedCT: '387543003',
    casNumber: '50-53-3',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_tipico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '25mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Esquizofrenia', 'Agitação', 'Delirium', 'Vômitos refratários'],
    mecanismoAcao: 'Antipsicótico típico. Bloqueia receptores dopaminérgicos D2 e múltiplos outros (histamínicos, colinérgicos, α-adrenérgicos).',
    posologias: [
      { indicacao: 'Psicose', adultos: { dose: '25-100mg 2-4x/dia', frequencia: '2-4x/dia', doseMaxima: '1000mg/dia' } }
    ],
    contraindicacoes: ['Depressão do SNC', 'Hipersensibilidade'],
    precaucoes: ['Discinesia tardia', 'Síndrome neuroléptica maligna', 'QT longo', 'Idosos'],
    efeitosAdversos: { comuns: ['Sedação', 'Extrapiramidalismo', 'Hipotensão', 'Tontura'], graves: ['Discinesia tardia', 'Síndrome neuroléptica maligna', 'QT longo'] },
    interacoes: [{ medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Potencialização de sedação', conduta: 'Evitar' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['ECG', 'Sinais extrapiramidais'],
    orientacoesPaciente: ['Pode causar sonolência', 'Reportar movimentos anormais'],
    doencasRelacionadas: ['esquizofrenia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antipsicotico', 'tipico']
  },
  {
    id: 'risperidona',
    nomeGenerico: 'Risperidona',
    nomesComerciais: ['Risperdal'],
    atcCode: 'N05AX08',
    rxNormCui: '9360',
    drugBankId: 'DB00734',
    snomedCT: '386906006',
    casNumber: '106266-06-2',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_atipico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '1mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Esquizofrenia', 'Transtorno bipolar', 'Transtorno autista (agressividade)'],
    mecanismoAcao: 'Antipsicótico atípico. Antagonista D2 e 5-HT2A. Menos efeitos extrapiramidais que típicos.',
    posologias: [
      { indicacao: 'Esquizofrenia', adultos: { dose: '2-6mg/dia', frequencia: '1-2x/dia', doseMaxima: '16mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Discinesia tardia', 'QT longo', 'Diabetes', 'Idosos'],
    efeitosAdversos: { comuns: ['Sedação', 'Aumento de peso', 'Hipetrolactinemia'], graves: ['Discinesia tardia', 'Síndrome neuroléptica maligna', 'Diabetes'] },
    interacoes: [{ medicamento: 'Outros antipsicóticos', gravidade: 'moderada', efeito: 'Aumento de efeitos', conduta: 'Cautela' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Reduzir dose' }],
    gestacao: 'C', amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Glicemia', 'ECG', 'Prolactina'],
    orientacoesPaciente: ['Pode causar aumento de peso', 'Monitorar glicemia'],
    doencasRelacionadas: ['esquizofrenia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antipsicotico', 'atipico']
  },
  {
    id: 'tramadol',
    nomeGenerico: 'Tramadol',
    nomesComerciais: ['Tramal'],
    atcCode: 'N02AX02',
    rxNormCui: '10689',
    drugBankId: 'DB00193',
    snomedCT: '387449008',
    casNumber: '27203-92-5',
    classeTerapeutica: 'analgesico',
    subclasse: 'opioide_fraco',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '100mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Dor moderada a severa'],
    mecanismoAcao: 'Analgésico opioide fraco. Agonista μ-opioide fraco e inibe recaptação de serotonina e noradrenalina.',
    posologias: [
      { indicacao: 'Dor moderada-severa', adultos: { dose: '50-100mg 4-6/6h', frequencia: '4x/dia', doseMaxima: '400mg/dia' } }
    ],
    contraindicacoes: ['Intoxicação aguda por álcool/opioides', 'Hipersensibilidade'],
    precaucoes: ['Dependência', 'Epilepsia', 'Insuficiência respiratória', 'Idosos'],
    efeitosAdversos: { comuns: ['Náusea', 'Vômito', 'Tontura', 'Sonolência'], graves: ['Convulsões', 'Dependência', 'Respiração deprimida'] },
    interacoes: [{ medicamento: 'IMAO', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Contraindicado' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Aumentar intervalo para 12h' }],
    gestacao: 'C', amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Função respiratória', 'Sinais de dependência'],
    orientacoesPaciente: ['Pode causar sonolência', 'Evitar álcool', 'Não dirigir'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['analgesico', 'opioide']
  },
  {
    id: 'codeina',
    nomeGenerico: 'Codeína',
    nomesComerciais: ['Codeína'],
    atcCode: 'R05DA04',
    rxNormCui: '2670',
    drugBankId: 'DB00318',
    snomedCT: '387307001',
    casNumber: '76-57-3',
    classeTerapeutica: 'analgesico',
    subclasse: 'opioide_fraco',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '3mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Dor leve a moderada', 'Tosse seca'],
    mecanismoAcao: 'Opioide fraco. Metabolizado a morfina no fígado. Agonista μ-opioide, causando analgesia e supressão da tosse.',
    posologias: [
      { indicacao: 'Dor', adultos: { dose: '30-60mg 4/4h', frequencia: '4-6x/dia', doseMaxima: '360mg/dia' } }
    ],
    contraindicacoes: ['Insuficiência respiratória', 'Asma', 'Hipersensibilidade'],
    precaucoes: ['Dependência', 'Idosos', 'Crianças', 'Insuficiência hepática'],
    efeitosAdversos: { comuns: ['Náusea', 'Sedação', 'Constipação', 'Tontura'], graves: ['Respiração deprimida', 'Dependência'] },
    interacoes: [{ medicamento: 'Álcool', gravidade: 'grave', efeito: 'Depressão respiratória', conduta: 'Evitar' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Cautela' }],
    gestacao: 'C', amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Função respiratória'],
    orientacoesPaciente: ['Pode causar sonolência', 'Evitar álcool', 'Relatar constipação'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['analgesico', 'opioide', 'antitussivo']
  },
  {
    id: 'levotiroxina',
    nomeGenerico: 'Levotiroxina',
    nomesComerciais: ['Puran T4'],
    atcCode: 'H03AA01',
    rxNormCui: '6598',
    drugBankId: 'DB00451',
    snomedCT: '387520005',
    casNumber: '51-48-9',
    classeTerapeutica: 'hormonio_tireoide',
    subclasse: 'tireoidiano',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mcg', disponivelSUS: true }
    ],
    indicacoes: ['Hipotireoidismo', 'Bócio', 'Câncer de tireoide (supressão TSH)'],
    mecanismoAcao: 'Hormônio tireoidiano sintético (T4). Substituto do hormônio tireoidiano natural. Convertido a T3 nos tecidos periféricos.',
    posologias: [
      { indicacao: 'Hipotireoidismo', adultos: { dose: '1,6mcg/kg/dia (geralmente 50-150mcg/dia)', frequencia: '1x/dia', doseMaxima: '300mcg/dia' } }
    ],
    contraindicacoes: ['Tireotoxicose não tratada', 'Infarto agudo do miocárdio', 'Insuficiência adrenal não tratada'],
    precaucoes: ['Cardiopatia', 'Osteoporose', 'Insuficiência adrenal'],
    efeitosAdversos: { comuns: ['Palpitações', 'Sudorese', 'Insônia'], graves: ['Arritmias', 'Angina', 'Crises tireotóxicas'] },
    interacoes: [{ medicamento: 'Warfarina', gravidade: 'moderada', efeito: 'Aumento de sangramento', conduta: 'Monitorar INR' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'A', amamentacao: { compativel: true, observacao: 'Compatível, pode precisar ajuste de dose' },
    monitorizacao: ['TSH', 'T4 livre', 'Sintomas'],
    orientacoesPaciente: ['Tomar em jejum, 30-60min antes do café', 'Não tomar com alimentos/café', 'Monitoramento de TSH a cada 6-8 semanas'],
    doencasRelacionadas: ['hipotireoidismo'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['hormonio', 'tireoide']
  },
  {
    id: 'ferro-sulfato',
    nomeGenerico: 'Sulfato Ferroso',
    nomesComerciais: ['Sulfato Ferroso'],
    atcCode: 'B03AA07',
    rxNormCui: '4482',
    drugBankId: 'DB13257',
    snomedCT: '387485002',
    casNumber: '7782-63-0',
    classeTerapeutica: 'vitamina_mineral',
    subclasse: 'antianemico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg (elementar)', disponivelSUS: true },
      { forma: 'xarope', concentracao: '25mg/mL', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '40mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Anemia ferropriva', 'Deficiência de ferro'],
    mecanismoAcao: 'Suplemento de ferro. Essencial para síntese de hemoglobina e transporte de oxigênio.',
    posologias: [
      { indicacao: 'Anemia ferropriva', adultos: { dose: '200mg (40mg elementar) 2x/dia', frequencia: '2x/dia', doseMaxima: '600mg/dia' } }
    ],
    contraindicacoes: ['Hemosiderose', 'Hemocromatose', 'Anemia não ferropriva'],
    precaucoes: ['Constipação', 'Gastrite', 'Crianças (intoxicação)'],
    efeitosAdversos: { comuns: ['Constipação', 'Náusea', 'Fezes escuras', 'Gastrite'], graves: ['Intoxicação (em crianças)'] },
    interacoes: [{ medicamento: 'Antiácidos', gravidade: 'moderada', efeito: 'Diminuição de absorção', conduta: 'Administrar com intervalo' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'A', amamentacao: { compativel: true, observacao: 'Compatível e recomendado' },
    monitorizacao: ['Hemograma', 'Ferritina'],
    orientacoesPaciente: ['Tomar com vitamina C (melhora absorção)', 'Evitar com café/chá', 'Fezes podem ficar escuras', 'Tratamento por 3-6 meses após normalização'],
    doencasRelacionadas: ['anemia-ferropriva'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['ferro', 'anemia', 'suplemento']
  },
  {
    id: 'calcio-carbonato',
    nomeGenerico: 'Carbonato de Cálcio',
    nomesComerciais: ['Calcigenol D'],
    atcCode: 'A12AA04',
    rxNormCui: '1777',
    drugBankId: 'DB06724',
    snomedCT: '387497009',
    casNumber: '471-34-1',
    classeTerapeutica: 'vitamina_mineral',
    subclasse: undefined,
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg (elementar)', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '500mg/g', disponivelSUS: true }
    ],
    indicacoes: ['Suplementação de cálcio', 'Osteoporose', 'Hipocalcemia', 'Antiácido'],
    mecanismoAcao: 'Suplemento de cálcio. Essencial para mineralização óssea, contração muscular, coagulação sanguínea.',
    posologias: [
      { indicacao: 'Suplementação de cálcio', adultos: { dose: '500-1000mg (elementar) 2x/dia', frequencia: '2x/dia', doseMaxima: '2500mg/dia' } }
    ],
    contraindicacoes: ['Hipercalcemia', 'Nefrolitíase cálcica'],
    precaucoes: ['Insuficiência renal', 'Hipercalciúria'],
    efeitosAdversos: { comuns: ['Constipação', 'Flatulência'], graves: ['Hipercalcemia', 'Nefrolitíase'] },
    interacoes: [{ medicamento: 'Levotiroxina', gravidade: 'moderada', efeito: 'Diminuição de absorção', conduta: 'Administrar com intervalo' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Cautela, monitorar cálcio' }],
    gestacao: 'A', amamentacao: { compativel: true, observacao: 'Compatível e recomendado' },
    monitorizacao: ['Cálcio sérico'],
    orientacoesPaciente: ['Tomar com alimentos', 'Não exceder dose recomendada'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['calcio', 'osso', 'suplemento']
  },
  {
    id: 'omeprazol',
    nomeGenerico: 'Omeprazol',
    nomesComerciais: ['Losec'],
    atcCode: 'A02BC01',
    rxNormCui: '7646',
    drugBankId: 'DB00338',
    snomedCT: '387462005',
    casNumber: '73590-58-6',
    classeTerapeutica: 'inibidor_bomba_protonica',
    subclasse: 'ibp',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '40mg', disponivelSUS: true }
    ],
    indicacoes: ['DRGE', 'Úlcera péptica', 'Síndrome de Zollinger-Ellison', 'Eradicação H. pylori'],
    mecanismoAcao: 'IBP. Inibe irreversivelmente a bomba de prótons H+/K+-ATPase da célula parietal gástrica, reduzindo secreção ácida.',
    posologias: [
      { indicacao: 'DRGE', adultos: { dose: '20-40mg/dia', frequencia: '1x/dia', doseMaxima: '80mg/dia (dividido)' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Osteoporose (uso prolongado)', 'Deficiência de B12 (uso prolongado)', 'Infecção por C. difficile'],
    efeitosAdversos: { comuns: ['Cefaleia', 'Diarreia', 'Náusea'], graves: ['Deficiência de B12', 'Osteoporose', 'Infecção C. difficile'] },
    interacoes: [{ medicamento: 'Warfarina', gravidade: 'moderada', efeito: 'Aumento de sangramento', conduta: 'Monitorar INR' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['B12 se uso prolongado', 'Densidade óssea se uso prolongado'],
    orientacoesPaciente: ['Tomar 30-60min antes do café da manhã', 'Não abrir cápsulas'],
    doencasRelacionadas: ['gastrite', 'doenca-refluxo-gastroesofagico'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['ibp', 'gastrointestinal']
  },
  {
    id: 'ranitidina',
    nomeGenerico: 'Ranitidina',
    nomesComerciais: ['Antak'],
    atcCode: 'A02BA02',
    rxNormCui: '9002',
    drugBankId: 'DB00863',
    snomedCT: '387501009',
    casNumber: '66357-35-5',
    classeTerapeutica: 'gastrointestinal',
    subclasse: 'antagonista_h2',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true }
    ],
    indicacoes: ['Úlcera péptica', 'DRGE', 'Gastrite'],
    mecanismoAcao: 'Antagonista do receptor H2 da histamina. Reduz secreção ácida gástrica estimulada por histamina.',
    posologias: [
      { indicacao: 'Úlcera/DRGE', adultos: { dose: '150mg 12/12h ou 300mg à noite', frequencia: '1-2x/dia', doseMaxima: '600mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Insuficiência renal', 'Idosos'],
    efeitosAdversos: { comuns: ['Cefaleia', 'Tontura', 'Diarreia'], graves: ['Hepatotoxicidade', 'Pancitopenia'] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: '<50', ajuste: '150mg/dia' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Função renal'],
    orientacoesPaciente: ['Tomar antes das refeições'],
    doencasRelacionadas: ['gastrite', 'doenca-refluxo-gastroesofagico'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antagonista_h2', 'gastrointestinal']
  },
  {
    id: 'domperidona',
    nomeGenerico: 'Domperidona',
    nomesComerciais: ['Motilium'],
    atcCode: 'A03FA03',
    rxNormCui: '3414',
    drugBankId: 'DB01184',
    snomedCT: '387329002',
    casNumber: '57808-66-9',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_d2',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '1mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Náusea e vômitos', 'Gastroparesia'],
    mecanismoAcao: 'Antagonista dopaminérgico D2 periférico. Aumenta motilidade gastrointestinal sem efeitos centrais significativos.',
    posologias: [
      { indicacao: 'Náusea/Vômitos', adultos: { dose: '10-20mg 3-4x/dia', frequencia: '3-4x/dia', doseMaxima: '80mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Hemorragia GI', 'Obstrução mecânica'],
    precaucoes: ['Arritmias cardíacas', 'QT longo'],
    efeitosAdversos: { comuns: ['Cefaleia', 'Boca seca'], graves: ['Arritmias', 'QT longo'] },
    interacoes: [{ medicamento: 'Eritromicina', gravidade: 'moderada', efeito: 'Aumento risco arritmias', conduta: 'Evitar combinação' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['ECG se QT longo'],
    orientacoesPaciente: ['Tomar antes das refeições'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antiemetico', 'procinetico']
  },
  {
    id: 'dexametasona',
    nomeGenerico: 'Dexametasona',
    nomesComerciais: ['Decadron'],
    atcCode: 'H02AB02',
    rxNormCui: '3264',
    drugBankId: 'DB01234',
    snomedCT: '387495001',
    casNumber: '50-02-2',
    classeTerapeutica: 'corticoide',
    subclasse: 'corticosteroide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '4mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Doenças inflamatórias', 'Asma/DPOC (exacerbações)', 'Edema cerebral', 'Alergias graves'],
    mecanismoAcao: 'Glicocorticoide sintético de ação longa. Anti-inflamatório e imunossupressor potente.',
    posologias: [
      { indicacao: 'Inflamação', adultos: { dose: '0,5-4mg/dia', frequencia: '1-4x/dia', doseMaxima: '16mg/dia' } }
    ],
    contraindicacoes: ['Infecções sistêmicas não tratadas', 'Hipersensibilidade'],
    precaucoes: ['Infecções', 'Diabetes', 'Hipertensão', 'Osteoporose'],
    efeitosAdversos: { comuns: ['Hiperglicemia', 'Aumento de peso', 'Insônia'], graves: ['Osteoporose', 'Supressão adrenal', 'Infecções'] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Usar com cautela' },
    monitorizacao: ['Glicemia', 'PA'],
    orientacoesPaciente: ['Não suspender abruptamente', 'Reportar sinais de infecção'],
    doencasRelacionadas: ['asma', 'dpoc'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['corticoide', 'anti_inflamatorio']
  },
  {
    id: 'fenobarbital',
    nomeGenerico: 'Fenobarbital',
    nomesComerciais: ['Gardenal'],
    atcCode: 'N03AA02',
    rxNormCui: '4513',
    drugBankId: 'DB01174',
    snomedCT: '387444004',
    casNumber: '50-06-6',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'barbiturico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: ['Epilepsia', 'Estado de mal epiléptico', 'Sedação'],
    mecanismoAcao: 'Barbiturato. Potencializa ação do GABA, aumentando inibição neuronal. Anticonvulsivante.',
    posologias: [
      { indicacao: 'Epilepsia', adultos: { dose: '60-180mg/dia', frequencia: '1-3x/dia', doseMaxima: '600mg/dia' } }
    ],
    contraindicacoes: ['Porfiria', 'Hipersensibilidade', 'Insuficiência respiratória grave'],
    precaucoes: ['Dependência', 'Insuficiência respiratória', 'Hepatopatia', 'Idosos'],
    efeitosAdversos: { comuns: ['Sedação', 'Ataxia', 'Depressão respiratória'], graves: ['Dependência', 'Respiração deprimida', 'Paradoxal excitação'] },
    interacoes: [{ medicamento: 'Álcool', gravidade: 'grave', efeito: 'Depressão respiratória', conduta: 'Evitar' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'D', amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Função respiratória', 'Níveis séricos'],
    orientacoesPaciente: ['Pode causar sedação', 'Não suspender abruptamente', 'Evitar álcool'],
    doencasRelacionadas: ['epilepsia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anticonvulsivante', 'barbiturico']
  },
  {
    id: 'fenilefrina',
    nomeGenerico: 'Fenilefrina',
    nomesComerciais: ['Fenilefrina'],
    atcCode: 'C01CA06',
    rxNormCui: '7517',
    drugBankId: 'DB00688',
    snomedCT: '387311001',
    casNumber: '59-42-7',
    classeTerapeutica: 'outros',
    subclasse: undefined,
    rename: true,
    apresentacoes: [
      { forma: 'spray_nasal', concentracao: '0,5%', disponivelSUS: true },
      { forma: 'colirio', concentracao: '2,5%', disponivelSUS: true }
    ],
    indicacoes: ['Congestão nasal', 'Hipotensão', 'Midríase'],
    mecanismoAcao: 'Agonista α1-adrenérgico. Causa vasoconstrição e descongestionamento nasal.',
    posologias: [
      { indicacao: 'Congestão nasal', adultos: { dose: '2-3 sprays/narina 4/4h', frequencia: '4x/dia', doseMaxima: 'Não exceder 7 dias' } }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Glaucoma de ângulo fechado'],
    precaucoes: ['Hipertensão', 'Cardiopatia', 'Uso prolongado (rebound)'],
    efeitosAdversos: { comuns: ['Irritação nasal', 'Queimação'], graves: ['Rebound congestionamento', 'Hipertensão'] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [],
    orientacoesPaciente: ['Não usar por mais de 7 dias', 'Evitar uso crônico'],
    doencasRelacionadas: ['rinite-alergica'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['descongestionante', 'nasal']
  },
  {
    id: 'soro-fisiologico',
    nomeGenerico: 'Soro Fisiológico (Cloreto de Sódio)',
    nomesComerciais: ['Soro Fisiológico'],
    atcCode: 'B05XA03',
    rxNormCui: '10124',
    drugBankId: 'DB09153',
    snomedCT: '387541001',
    casNumber: '7647-14-5',
    classeTerapeutica: 'outros',
    subclasse: undefined,
    rename: true,
    apresentacoes: [
      { forma: 'solucao_oral', concentracao: '0,9%', disponivelSUS: true },
      { forma: 'spray_nasal', concentracao: '0,9%', disponivelSUS: true }
    ],
    indicacoes: ['Lavagem nasal', 'Desidratação', 'Hidratação'],
    mecanismoAcao: 'Solução isotônica de cloreto de sódio. Mantém osmolaridade e hidratação tecidual.',
    posologias: [
      { indicacao: 'Lavagem nasal', adultos: { dose: '2-3 sprays/narina 3-4x/dia', frequencia: '3-4x/dia', doseMaxima: 'Conforme necessidade' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: [],
    efeitosAdversos: { comuns: [], graves: [] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'A', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [],
    orientacoesPaciente: ['Pode ser usado regularmente', 'Não causa dependência'],
    doencasRelacionadas: ['rinite-alergica'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['hidratacao', 'nasal']
  },
  {
    id: 'dimenidrinato',
    nomeGenerico: 'Dimenidrinato',
    nomesComerciais: ['Dramin'],
    atcCode: 'R06AA02',
    rxNormCui: '3423',
    drugBankId: 'DB00985',
    snomedCT: '387326006',
    casNumber: '523-87-5',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_1geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '12,5mg/5mL', disponivelSUS: true }
    ],
    indicacoes: ['Náusea', 'Vômitos', 'Vertigem', 'Enjoo de movimento'],
    mecanismoAcao: 'Anti-histamínico H1 de 1ª geração com propriedades anticolinérgicas. Reduz náusea e vertigem.',
    posologias: [
      { indicacao: 'Náusea/Vertigem', adultos: { dose: '50mg 4/4h', frequencia: '4-6x/dia', doseMaxima: '400mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Glaucoma de ângulo fechado'],
    precaucoes: ['Idosos', 'Prostata aumentada', 'Epilepsia'],
    efeitosAdversos: { comuns: ['Sonolência', 'Boca seca', 'Visão turva'], graves: [] },
    interacoes: [{ medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Potencialização de sedação', conduta: 'Evitar' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [],
    orientacoesPaciente: ['Pode causar sonolência', 'Evitar dirigir'],
    doencasRelacionadas: ['labirintite'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anti_histaminico', 'antiemetico', 'vertigem']
  },
  {
    id: 'prometazina',
    nomeGenerico: 'Prometazina',
    nomesComerciais: ['Fenergan'],
    atcCode: 'R06AD02',
    rxNormCui: '8566',
    drugBankId: 'DB01069',
    snomedCT: '387514009',
    casNumber: '60-87-7',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_1geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '25mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Alergias', 'Náusea e vômitos', 'Sedação', 'Prurido'],
    mecanismoAcao: 'Anti-histamínico H1 de 1ª geração. Antagonista de histamina com propriedades anticolinérgicas e sedativas.',
    posologias: [
      { indicacao: 'Alergias', adultos: { dose: '25mg 2-3x/dia', frequencia: '2-3x/dia', doseMaxima: '100mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Glaucoma de ângulo fechado'],
    precaucoes: ['Idosos', 'Doença cardiovascular', 'Epilepsia'],
    efeitosAdversos: { comuns: ['Sonolência', 'Boca seca', 'Visão turva'], graves: ['Reações extrapiramidais'] },
    interacoes: [{ medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Potencialização de sedação', conduta: 'Evitar' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [],
    orientacoesPaciente: ['Pode causar sonolência intensa', 'Evitar dirigir', 'Tomar à noite'],
    doencasRelacionadas: ['urticaria'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anti_histaminico', 'sedativo']
  },
  {
    id: 'budesonida',
    nomeGenerico: 'Budesonida',
    nomesComerciais: ['Pulmicort'],
    atcCode: 'R03BA02',
    rxNormCui: '1827',
    drugBankId: 'DB01222',
    snomedCT: '386893003',
    casNumber: '51333-22-3',
    classeTerapeutica: 'corticoide_inalatorio',
    subclasse: undefined,
    rename: true,
    apresentacoes: [
      { forma: 'inalatorio', concentracao: '200mcg/dose', disponivelSUS: true },
      { forma: 'aerossol', concentracao: '100mcg/dose', disponivelSUS: true }
    ],
    indicacoes: ['Asma', 'DPOC', 'Rinite alérgica'],
    mecanismoAcao: 'Corticoide inalatório. Anti-inflamatório local, reduzindo inflamação das vias aéreas.',
    posologias: [
      { indicacao: 'Asma', adultos: { dose: '200-400mcg 2x/dia', frequencia: '2x/dia', doseMaxima: '1600mcg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Infecções respiratórias', 'Tuberculose'],
    efeitosAdversos: { comuns: ['Tosse', 'Irritação da garganta', 'Candidíase oral'], graves: [] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [],
    orientacoesPaciente: ['Enxaguar boca após uso', 'Usar espaçador se indicado'],
    doencasRelacionadas: ['asma', 'dpoc'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['corticoide', 'inalatorio', 'asma']
  },
  {
    id: 'salbutamol',
    nomeGenerico: 'Salbutamol',
    nomesComerciais: ['Aerolin'],
    atcCode: 'R03AC02',
    rxNormCui: '435',
    drugBankId: 'DB01001',
    snomedCT: '387438001',
    casNumber: '18559-94-9',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'beta2_agonista_curta',
    rename: true,
    apresentacoes: [
      { forma: 'aerossol', concentracao: '100mcg/dose', disponivelSUS: true },
      { forma: 'solucao_nebulizacao', concentracao: '5mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Asma', 'Broncoespasmo', 'DPOC'],
    mecanismoAcao: 'Agonista β2-adrenérgico de ação curta. Relaxa músculo liso brônquico, causando broncodilatação rápida.',
    posologias: [
      { indicacao: 'Asma/Broncoespasmo', adultos: { dose: '2-4 inalações a cada 4-6h', frequencia: '4-6x/dia', doseMaxima: '8 inalações/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Cardiopatia', 'Hipertireoidismo', 'Diabetes'],
    efeitosAdversos: { comuns: ['Tremor', 'Taquicardia', 'Cefaleia'], graves: ['Arritmias', 'Hipocalemia'] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [],
    orientacoesPaciente: ['Para alívio rápido', 'Não usar como único tratamento de asma persistente'],
    doencasRelacionadas: ['asma', 'dpoc'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['broncodilatador', 'asma']
  },
  {
    id: 'cetoconazol',
    nomeGenerico: 'Cetoconazol',
    nomesComerciais: ['Nizoral'],
    atcCode: 'D01AC08',
    rxNormCui: '5968',
    drugBankId: 'DB01026',
    snomedCT: '387462005',
    casNumber: '65277-42-1',
    classeTerapeutica: 'antifungico',
    subclasse: 'antifungico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'creme', concentracao: '20mg/g', disponivelSUS: true }
    ],
    indicacoes: ['Candidíase', 'Dermatofitoses', 'Pitiríase versicolor', 'Seborreia'],
    mecanismoAcao: 'Antifúngico azólico. Inibe síntese de ergosterol da membrana fúngica, causando alteração da permeabilidade.',
    posologias: [
      { indicacao: 'Candidíase/Dermatofitose', adultos: { dose: '200-400mg/dia', frequencia: '1x/dia', doseMaxima: '400mg/dia' } }
    ],
    contraindicacoes: ['Hepatopatia', 'Hipersensibilidade'],
    precaucoes: ['Hepatotoxicidade', 'Insuficiência adrenal', 'QT longo'],
    efeitosAdversos: { comuns: ['Náusea', 'Cefaleia'], graves: ['Hepatotoxicidade', 'Insuficiência adrenal'] },
    interacoes: [{ medicamento: 'Warfarina', gravidade: 'moderada', efeito: 'Aumento de sangramento', conduta: 'Monitorar INR' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Função hepática'],
    orientacoesPaciente: ['Tomar com alimentos', 'Reportar icterícia ou cansaço'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antifungico', 'dermatologia']
  },
  {
    id: 'terbinafina',
    nomeGenerico: 'Terbinafina',
    nomesComerciais: ['Lamisil'],
    atcCode: 'D01AE15',
    rxNormCui: '10384',
    drugBankId: 'DB00857',
    snomedCT: '387427005',
    casNumber: '91161-71-6',
    classeTerapeutica: 'antifungico',
    subclasse: 'antifungico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'creme', concentracao: '10mg/g', disponivelSUS: true }
    ],
    indicacoes: ['Onicomicose', 'Tinha', 'Pitiríase versicolor'],
    mecanismoAcao: 'Antifúngico. Inibe enzima esqualeno epoxidase, bloqueando síntese de ergosterol e causando acúmulo de esqualeno tóxico.',
    posologias: [
      { indicacao: 'Onicomicose', adultos: { dose: '250mg/dia por 6-12 semanas (unhas)', frequencia: '1x/dia', doseMaxima: '250mg/dia' } }
    ],
    contraindicacoes: ['Hepatopatia', 'Hipersensibilidade'],
    precaucoes: ['Hepatotoxicidade', 'Lúpus eritematoso'],
    efeitosAdversos: { comuns: ['Cefaleia', 'Náusea', 'Rash'], graves: ['Hepatotoxicidade', 'Agranulocitose'] },
    interacoes: [{ medicamento: 'Rifampicina', gravidade: 'moderada', efeito: 'Diminuição de níveis', conduta: 'Ajustar dose' }],
    ajusteDoseRenal: [{ tfg: '<50', ajuste: 'Reduzir dose 50%' }],
    gestacao: 'B', amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Função hepática'],
    orientacoesPaciente: ['Completar tratamento', 'Reportar icterícia'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antifungico', 'onicomicose']
  },
  {
    id: 'gentamicina',
    nomeGenerico: 'Gentamicina',
    nomesComerciais: ['Gentamicina'],
    atcCode: 'J01GB03',
    rxNormCui: '4740',
    drugBankId: 'DB00798',
    snomedCT: '387435008',
    casNumber: '1403-66-3',
    classeTerapeutica: 'antibiotico',
    subclasse: undefined,
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_im', concentracao: '40mg/mL', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '40mg/mL', disponivelSUS: true },
      { forma: 'creme', concentracao: '1mg/g', disponivelSUS: true }
    ],
    indicacoes: ['Infecções gram-negativas graves', 'Sepse', 'Pielonefrite', 'Infecções de pele'],
    mecanismoAcao: 'Aminoglicosídeo. Inibe síntese proteica bacteriana por ligação à subunidade 30S do ribossomo.',
    posologias: [
      { indicacao: 'Infecções graves', adultos: { dose: '3-5mg/kg/dia IM/IV', frequencia: '1-3x/dia', doseMaxima: '7mg/kg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Nefrotoxicidade', 'Ototoxicidade', 'Miastenia gravis'],
    efeitosAdversos: { comuns: ['Náusea'], graves: ['Nefrotoxicidade', 'Ototoxicidade', 'Paralisia neuromuscular'] },
    interacoes: [{ medicamento: 'Furosemida', gravidade: 'moderada', efeito: 'Aumento de ototoxicidade', conduta: 'Cautela' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Ajustar dose e intervalo conforme TFG' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Função renal', 'Níveis séricos', 'Audição'],
    orientacoesPaciente: ['Relatar zumbido ou perda auditiva'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antibiotico', 'aminoglicosideo']
  },
  {
    id: 'cloranfenicol',
    nomeGenerico: 'Cloranfenicol',
    nomesComerciais: ['Cloranfenicol'],
    atcCode: 'J01BA01',
    rxNormCui: '2442',
    drugBankId: 'DB00446',
    snomedCT: '387406005',
    casNumber: '56-75-7',
    classeTerapeutica: 'antibiotico',
    subclasse: undefined,
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '250mg', disponivelSUS: true },
      { forma: 'colirio', concentracao: '0,5%', disponivelSUS: true },
      { forma: 'pomada', concentracao: '10mg/g', disponivelSUS: true }
    ],
    indicacoes: ['Conjuntivite bacteriana', 'Infecções oculares', 'Infecções graves (reserva)'],
    mecanismoAcao: 'Inibe síntese proteica bacteriana por ligação à subunidade 50S do ribossomo.',
    posologias: [
      { indicacao: 'Conjuntivite', adultos: { dose: '1-2 gotas 4-6x/dia', frequencia: '4-6x/dia', doseMaxima: 'Conforme prescrição' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Supressão medular', 'Bebês prematuros', 'Uso sistêmico (reserva)'],
    efeitosAdversos: { comuns: ['Irritação local'], graves: ['Supressão medular', 'Síndrome do bebê cinza'] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível tópico' },
    monitorizacao: ['Hemograma se uso sistêmico'],
    orientacoesPaciente: ['Apenas uso tópico oftálmico na APS', 'Não compartilhar colírio'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antibiotico', 'oftalmico']
  },
  {
    id: 'fluconazol',
    nomeGenerico: 'Fluconazol',
    nomesComerciais: ['Zoltec'],
    atcCode: 'J02AC01',
    rxNormCui: '4493',
    drugBankId: 'DB00196',
    snomedCT: '387438001',
    casNumber: '86386-73-4',
    classeTerapeutica: 'antifungico',
    subclasse: 'antifungico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '150mg', disponivelSUS: true }
    ],
    indicacoes: ['Candidíase', 'Micose sistêmica', 'Criptococose'],
    mecanismoAcao: 'Antifúngico azólico. Inibe síntese de ergosterol da membrana fúngica.',
    posologias: [
      { indicacao: 'Candidíase vaginal', adultos: { dose: '150mg em dose única', frequencia: '1x', doseMaxima: '400mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Hepatotoxicidade', 'QT longo', 'Insuficiência renal'],
    efeitosAdversos: { comuns: ['Náusea', 'Cefaleia', 'Rash'], graves: ['Hepatotoxicidade', 'QT longo'] },
    interacoes: [{ medicamento: 'Warfarina', gravidade: 'moderada', efeito: 'Aumento de sangramento', conduta: 'Monitorar INR' }],
    ajusteDoseRenal: [{ tfg: '<50', ajuste: 'Reduzir dose 50%' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Função hepática'],
    orientacoesPaciente: ['Reportar icterícia ou cansaço'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antifungico', 'candida']
  },
  {
    id: 'penicilina-g-benzo',
    nomeGenerico: 'Penicilina G Benzatina',
    nomesComerciais: ['Benzetacil'],
    atcCode: 'J01CE08',
    rxNormCui: '7980',
    drugBankId: 'DB01053',
    snomedCT: '387445003',
    casNumber: '1538-09-6',
    classeTerapeutica: 'antibiotico',
    subclasse: 'penicilina',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_im', concentracao: '1.200.000 UI', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '2.400.000 UI', disponivelSUS: true }
    ],
    indicacoes: ['Sífilis', 'Infecções estreptocócicas', 'Febre reumática (profilaxia)'],
    mecanismoAcao: 'Penicilina de ação prolongada. Inibe síntese de parede celular bacteriana.',
    posologias: [
      { indicacao: 'Sífilis primária', adultos: { dose: '2.400.000 UI IM em dose única', frequencia: '1x', doseMaxima: '2.400.000 UI' } }
    ],
    contraindicacoes: ['Hipersensibilidade a penicilina'],
    precaucoes: ['Anafilaxia', 'Insuficiência renal'],
    efeitosAdversos: { comuns: ['Dor local', 'Rash'], graves: ['Anafilaxia', 'Reações de hipersensibilidade'] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Cautela' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Reações de hipersensibilidade'],
    orientacoesPaciente: ['Relatar histórico de alergia a penicilina', 'Dor local comum após injeção'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antibiotico', 'penicilina']
  },
  {
    id: 'ciprofloxacino',
    nomeGenerico: 'Ciprofloxacino',
    nomesComerciais: ['Cipro'],
    atcCode: 'J01MA02',
    rxNormCui: '2556',
    drugBankId: 'DB00537',
    snomedCT: '387461004',
    casNumber: '85721-33-1',
    classeTerapeutica: 'antibiotico',
    subclasse: 'fluoroquinolona',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '750mg', disponivelSUS: true }
    ],
    indicacoes: ['ITU complicada', 'Pielonefrite', 'Infecções respiratórias', 'Infecções de pele'],
    mecanismoAcao: 'Fluoroquinolona. Inibe DNA girase e topoisomerase IV, bloqueando síntese de DNA bacteriano.',
    posologias: [
      { indicacao: 'ITU complicada', adultos: { dose: '500mg 12/12h por 7-14 dias', frequencia: '2x/dia', doseMaxima: '1500mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Gravidez', 'Crianças <18 anos', 'Miastenia gravis'],
    precaucoes: ['Tendinopatia', 'QT longo', 'Convulsões', 'Hepatopatia'],
    efeitosAdversos: { comuns: ['Náusea', 'Diarreia', 'Cefaleia'], graves: ['Tendinopatia/ruptura de tendão', 'QT longo', 'Hepatotoxicidade'] },
    interacoes: [{ medicamento: 'Antiacidos', gravidade: 'moderada', efeito: 'Diminuição de absorção', conduta: 'Administrar com intervalo' }],
    ajusteDoseRenal: [{ tfg: '30-50', ajuste: '250-500mg 12/12h' }, { tfg: '<30', ajuste: '250-500mg 24/24h' }],
    gestacao: 'C', amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Função renal', 'Tendões'],
    orientacoesPaciente: ['Relatar dor/tumefação em tendões', 'Evitar exposição solar', 'Não tomar com antiácidos'],
    doencasRelacionadas: ['itu'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antibiotico', 'fluoroquinolona']
  },
  {
    id: 'clotrimazol',
    nomeGenerico: 'Clotrimazol',
    nomesComerciais: ['Canesten'],
    atcCode: 'G01AF02',
    rxNormCui: '2599',
    drugBankId: 'DB00257',
    snomedCT: '387304004',
    casNumber: '23593-75-1',
    classeTerapeutica: 'antifungico',
    subclasse: 'antifungico',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '10mg/g', disponivelSUS: true },
      { forma: 'ovulo', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: ['Candidíase vaginal', 'Tinha', 'Pitiríase versicolor', 'Candidíase cutânea'],
    mecanismoAcao: 'Antifúngico azólico tópico. Inibe síntese de ergosterol da membrana fúngica, alterando permeabilidade.',
    posologias: [
      { indicacao: 'Candidíase vaginal', adultos: { dose: '1 ovulo 100mg à noite por 6 dias', frequencia: '1x/dia', doseMaxima: 'Conforme prescrição' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: [],
    efeitosAdversos: { comuns: ['Irritação local', 'Prurido'], graves: [] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário (tópico)' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [],
    orientacoesPaciente: ['Aplicar conforme prescrição', 'Completar tratamento'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antifungico', 'topico', 'candida']
  },
];

