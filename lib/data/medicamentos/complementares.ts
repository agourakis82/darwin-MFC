/**
 * MEDICAMENTOS COMPLEMENTARES - DARWIN-MFC
 * =========================================
 * Medicamentos adicionais para completar 100 RENAME
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosComplementares: Medicamento[] = [
  // ANTIEMÉTICOS
  {
    id: 'ondansetrona',
    nomeGenerico: 'Cloridrato de ondansetrona',
    nomesComerciais: ['Zofran', 'Vonau'],
    // Ontologias
    atcCode: 'A04AA01',
    rxNormCui: '26225',
    drugBankId: 'DB00904',
    snomedCT: '372487007',
    casNumber: '99614-02-5',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_5ht3',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '8mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '4mg/2mL', disponivelSUS: true }
    ],
    indicacoes: ['Náusea e vômito pós-operatório', 'Náusea por quimioterapia', 'Náusea em gastroenterite', 'Hiperemese gravídica'],
    mecanismoAcao: 'Antagonista seletivo do receptor 5-HT3 de serotonina.',
    posologias: [
      { indicacao: 'Náusea/Vômito', adultos: { dose: '4-8mg 8/8h', frequencia: '3x/dia', doseMaxima: '24mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Prolongamento QT congênito'],
    precaucoes: ['QT longo', 'Hepatopatia'],
    efeitosAdversos: { comuns: ['Constipação', 'Cefaleia'], graves: ['Prolongamento QT', 'Síndrome serotoninérgica'] },
    interacoes: [{ medicamento: 'Medicamentos que prolongam QT', gravidade: 'grave', efeito: 'Arritmias', conduta: 'Monitorar ECG' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['ECG se uso IV em doses altas'],
    orientacoesPaciente: ['Pode causar constipação'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antiemetico', 'nausea', 'vomito']
  },
  {
    id: 'metoclopramida',
    nomeGenerico: 'Cloridrato de metoclopramida',
    nomesComerciais: ['Plasil'],
    // Ontologias
    atcCode: 'A03FA01',
    rxNormCui: '6915',
    drugBankId: 'DB01233',
    snomedCT: '387003001',
    casNumber: '364-62-5',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_d2',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '4mg/mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '10mg/2mL', disponivelSUS: true }
    ],
    indicacoes: ['Náusea e vômito', 'Gastroparesia', 'DRGE (adjuvante)'],
    mecanismoAcao: 'Antagonista dopaminérgico D2. Procinético e antiemético.',
    posologias: [
      { indicacao: 'Náusea', adultos: { dose: '10mg 8/8h antes das refeições', frequencia: '3x/dia', doseMaxima: '30mg/dia' } }
    ],
    contraindicacoes: ['Feocromocitoma', 'Epilepsia', 'Parkinson', 'Obstrução GI'],
    precaucoes: ['Idosos (discinesia)', 'DRC', 'Uso prolongado (>3 meses)'],
    efeitosAdversos: { comuns: ['Sonolência', 'Inquietação', 'Diarreia'], graves: ['Discinesia tardia', 'Síndrome neuroléptica maligna', 'Parkinsonismo'] },
    interacoes: [{ medicamento: 'Antipsicóticos', gravidade: 'moderada', efeito: 'Efeitos extrapiramidais', conduta: 'Evitar' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Reduzir 50%' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Pode aumentar produção de leite' },
    monitorizacao: ['Sintomas extrapiramidais'],
    orientacoesPaciente: ['Não usar por mais de 12 semanas', 'Informar tremores ou movimentos involuntários'],
    doencasRelacionadas: ['dispepsia', 'gastroparesia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antiemetico', 'procinetico', 'nausea']
  },
  // ANTIALÉRGICOS
  {
    id: 'loratadina',
    nomeGenerico: 'Loratadina',
    nomesComerciais: ['Claritin', 'Loralerg'],
    // Ontologias
    atcCode: 'R06AX13',
    rxNormCui: '28889',
    drugBankId: 'DB00455',
    snomedCT: '386884007',
    casNumber: '79794-75-5',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '1mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Rinite alérgica', 'Urticária', 'Conjuntivite alérgica'],
    mecanismoAcao: 'Anti-histamínico H1 de 2ª geração. Não sedativo.',
    posologias: [
      { indicacao: 'Rinite/Urticária', adultos: { dose: '10mg/dia', frequencia: '1x/dia' }, pediatrico: { dose: '5mg/dia (<30kg) ou 10mg/dia (>30kg)', frequencia: '1x/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Hepatopatia (reduzir dose)', 'DRC grave'],
    efeitosAdversos: { comuns: ['Cefaleia', 'Sonolência (rara)'], graves: ['Raros'] },
    interacoes: [{ medicamento: 'Cetoconazol', gravidade: 'leve', efeito: 'Aumenta níveis de loratadina', conduta: 'Geralmente não clinicamente significativo' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: '10mg em dias alternados' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Resposta clínica'],
    orientacoesPaciente: ['Pode ser tomado com ou sem alimentos', 'Não causa sonolência na maioria'],
    doencasRelacionadas: ['rinite-alergica', 'urticaria'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anti-histaminico', 'alergia', 'rinite']
  },
  {
    id: 'cetirizina',
    nomeGenerico: 'Dicloridrato de cetirizina',
    nomesComerciais: ['Zyrtec', 'Zetalerg'],
    // Ontologias
    atcCode: 'R06AE07',
    rxNormCui: '20610',
    drugBankId: 'DB00341',
    snomedCT: '372523007',
    casNumber: '83881-51-0',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'gotas', concentracao: '10mg/mL', disponivelSUS: false }
    ],
    indicacoes: ['Rinite alérgica', 'Urticária crônica', 'Dermatite atópica'],
    mecanismoAcao: 'Anti-histamínico H1 de 2ª geração. Metabólito ativo da hidroxizina.',
    posologias: [
      { indicacao: 'Rinite/Urticária', adultos: { dose: '10mg/dia', frequencia: '1x/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade a hidroxizina'],
    precaucoes: ['DRC (ajuste)', 'Idosos'],
    efeitosAdversos: { comuns: ['Sonolência (mais que loratadina)', 'Boca seca', 'Cefaleia'], graves: ['Raros'] },
    interacoes: [{ medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Sedação aumentada', conduta: 'Evitar' }],
    ajusteDoseRenal: [{ tfg: '30-50', ajuste: '5mg/dia' }, { tfg: '<30', ajuste: '5mg em dias alternados' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Resposta clínica'],
    orientacoesPaciente: ['Pode causar sonolência leve', 'Evitar dirigir se sonolento'],
    doencasRelacionadas: ['rinite-alergica', 'urticaria', 'dermatite-atopica'], calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anti-histaminico', 'alergia', 'urticaria']
  },
  {
    id: 'prometazina',
    nomeGenerico: 'Cloridrato de prometazina',
    nomesComerciais: ['Fenergan'],
    // Ontologias
    atcCode: 'R06AD02',
    rxNormCui: '8745',
    drugBankId: 'DB01069',
    snomedCT: '372747003',
    casNumber: '60-87-7',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_1geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '50mg/2mL', disponivelSUS: true }
    ],
    indicacoes: ['Reações alérgicas', 'Sedação pré-operatória', 'Cinetose', 'Náusea/vômito'],
    mecanismoAcao: 'Anti-histamínico H1 de 1ª geração com efeitos anticolinérgicos e sedativos.',
    posologias: [
      { indicacao: 'Alergia', adultos: { dose: '25mg 1-2x/dia', frequencia: '1-2x/dia' } },
      { indicacao: 'Sedação', adultos: { dose: '25-50mg VO ou IM', frequencia: 'Dose única' } }
    ],
    contraindicacoes: ['Crianças <2 anos', 'Coma', 'Depressão respiratória'],
    precaucoes: ['Idosos', 'Glaucoma', 'Retenção urinária', 'DPOC'],
    efeitosAdversos: { comuns: ['Sedação intensa', 'Boca seca', 'Visão turva', 'Constipação'], graves: ['Síndrome neuroléptica maligna', 'Depressão respiratória'] },
    interacoes: [{ medicamento: 'Depressores do SNC', gravidade: 'grave', efeito: 'Sedação excessiva', conduta: 'Evitar ou reduzir doses' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Usar com cautela' }],
    gestacao: 'C', amamentacao: { compativel: false, observacao: 'Evitar durante amamentação' },
    monitorizacao: ['Nível de consciência'],
    orientacoesPaciente: ['Causa sonolência intensa', 'Não dirigir'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anti-histaminico', 'sedativo', '1a-geracao']
  },
  // CORTICOIDES SISTÊMICOS
  {
    id: 'prednisona',
    nomeGenerico: 'Prednisona',
    nomesComerciais: ['Meticorten', 'Predsim'],
    // Ontologias
    atcCode: 'H02AB07',
    rxNormCui: '8640',
    drugBankId: 'DB00635',
    snomedCT: '116602009',
    casNumber: '53-03-2',
    classeTerapeutica: 'corticoide',
    subclasse: 'sistemico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true }
    ],
    indicacoes: ['Asma aguda', 'Artrite reumatoide', 'LES', 'Doenças inflamatórias', 'Alergia grave', 'Exacerbação de DPOC'],
    mecanismoAcao: 'Glicocorticoide sintético. Efeito anti-inflamatório e imunossupressor.',
    posologias: [
      { indicacao: 'Asma aguda', adultos: { dose: '40-60mg/dia por 5-7 dias', frequencia: '1x/dia (manhã)' } },
      { indicacao: 'Doenças autoimunes', adultos: { dose: '1mg/kg/dia inicial, desmame gradual', frequencia: '1x/dia' } }
    ],
    contraindicacoes: ['Infecção fúngica sistêmica ativa'],
    precaucoes: ['Diabetes', 'HAS', 'Osteoporose', 'Úlcera péptica', 'Infecções', 'Psicose prévia'],
    efeitosAdversos: { comuns: ['Aumento de apetite', 'Insônia', 'Alteração de humor', 'Hiperglicemia'], graves: ['Supressão adrenal', 'Osteoporose', 'Cushing', 'Necrose avascular', 'Infecções oportunistas'] },
    interacoes: [{ medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Risco de úlcera GI', conduta: 'Usar IBP protetor' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Doses baixas compatíveis' },
    monitorizacao: ['Glicemia', 'PA', 'Peso', 'Potássio', 'Sinais de infecção'],
    orientacoesPaciente: ['Tomar pela manhã com alimentos', 'Não parar abruptamente se uso >2 semanas', 'Cartão de alerta'],
    doencasRelacionadas: ['asma', 'artrite-reumatoide', 'les'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['corticoide', 'anti-inflamatorio', 'imunossupressor']
  },
  {
    id: 'dexametasona',
    nomeGenerico: 'Fosfato dissódico de dexametasona',
    nomesComerciais: ['Decadron'],
    // Ontologias
    atcCode: 'H02AB02',
    rxNormCui: '3264',
    drugBankId: 'DB01234',
    snomedCT: '372584003',
    casNumber: '50-02-2',
    classeTerapeutica: 'corticoide',
    subclasse: 'sistemico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '4mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Edema cerebral', 'Náusea por quimioterapia', 'Crupe', 'COVID-19 grave', 'Doenças inflamatórias'],
    mecanismoAcao: 'Glicocorticoide potente de longa ação. 25x mais potente que hidrocortisona.',
    posologias: [
      { indicacao: 'Edema cerebral', adultos: { dose: '10mg IV ataque, 4mg 6/6h', frequencia: '4x/dia' } },
      { indicacao: 'COVID-19 grave', adultos: { dose: '6mg/dia por 10 dias', frequencia: '1x/dia' } }
    ],
    contraindicacoes: ['Infecção fúngica sistêmica'],
    precaucoes: ['Diabetes', 'HAS', 'Osteoporose', 'Uso prolongado'],
    efeitosAdversos: { comuns: ['Hiperglicemia', 'Insônia', 'Retenção hídrica'], graves: ['Supressão adrenal', 'Osteoporose', 'Cushing'] },
    interacoes: [{ medicamento: 'Anticoagulantes', gravidade: 'moderada', efeito: 'Altera resposta', conduta: 'Monitorar' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Glicemia', 'Eletrólitos'],
    orientacoesPaciente: ['Tomar pela manhã', 'Desmame gradual se uso >3 dias'],
    doencasRelacionadas: [], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['corticoide', 'potente', 'edema-cerebral']
  },
  // ANTICONVULSIVANTES
  {
    id: 'carbamazepina',
    nomeGenerico: 'Carbamazepina',
    nomesComerciais: ['Tegretol', 'Tegretard'],
    // Ontologias
    atcCode: 'N03AF01',
    rxNormCui: '2002',
    drugBankId: 'DB00564',
    snomedCT: '387222003',
    casNumber: '298-46-4',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'bloqueador_canal_sodio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true }
    ],
    indicacoes: ['Epilepsia focal', 'Neuralgia do trigêmeo', 'Transtorno bipolar', 'Neuropatia diabética'],
    mecanismoAcao: 'Bloqueia canais de sódio voltagem-dependentes. Estabiliza membranas neuronais.',
    posologias: [
      { indicacao: 'Epilepsia', adultos: { dose: '200mg 2x/dia, aumentar gradualmente', frequencia: '2-3x/dia', doseMaxima: '1200-1600mg/dia' } },
      { indicacao: 'Neuralgia do trigêmeo', adultos: { dose: '100-200mg 2x/dia, titular', frequencia: '2x/dia', doseMaxima: '1200mg/dia' } }
    ],
    contraindicacoes: ['Bloqueio AV', 'Porfiria', 'Uso de IMAO', 'Depressão medular'],
    precaucoes: ['Hepatopatia', 'Cardiopatia', 'HLA-B*1502 (asiáticos - rash grave)'],
    efeitosAdversos: { comuns: ['Sonolência', 'Tontura', 'Ataxia', 'Náusea', 'Diplopia'], graves: ['Agranulocitose', 'Síndrome de Stevens-Johnson', 'Hepatotoxicidade', 'SIADH'] },
    interacoes: [
      { medicamento: 'Anticoncepcionais orais', gravidade: 'grave', efeito: 'Falha contraceptiva', conduta: 'Usar método adicional' },
      { medicamento: 'Varfarina', gravidade: 'grave', efeito: 'Reduz efeito anticoagulante', conduta: 'Monitorar INR' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário, metabolismo hepático' }],
    gestacao: 'D', amamentacao: { compativel: true, observacao: 'Monitorar RN para sedação' },
    monitorizacao: ['Hemograma', 'Função hepática', 'Sódio', 'Nível sérico (4-12 mcg/mL)'],
    orientacoesPaciente: ['Não parar abruptamente', 'Informar rash ou febre', 'Reduz eficácia de anticoncepcionais'],
    doencasRelacionadas: ['epilepsia', 'neuralgia-trigemeo'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anticonvulsivante', 'epilepsia', 'neuralgia']
  },
  {
    id: 'fenitoina',
    nomeGenerico: 'Fenitoína sódica',
    nomesComerciais: ['Hidantal'],
    // Ontologias
    atcCode: 'N03AB02',
    rxNormCui: '8183',
    drugBankId: 'DB00252',
    snomedCT: '387220006',
    casNumber: '57-41-0',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'bloqueador_canal_sodio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '50mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Epilepsia focal e generalizada', 'Estado de mal epiléptico', 'Profilaxia de convulsões pós-TCE'],
    mecanismoAcao: 'Bloqueia canais de sódio. Estabiliza membranas.',
    posologias: [
      { indicacao: 'Epilepsia', adultos: { dose: '300mg/dia (pode dividir em 2-3 doses)', frequencia: '1-3x/dia', observacoes: 'Nível sérico: 10-20 mcg/mL' } },
      { indicacao: 'Estado de mal', adultos: { dose: '15-20mg/kg IV lento', frequencia: 'Dose de ataque', observacoes: 'Máx 50mg/min' } }
    ],
    contraindicacoes: ['Bradicardia sinusal', 'Bloqueio AV', 'Síndrome de Stokes-Adams'],
    precaucoes: ['Hepatopatia', 'Porfiria', 'Diabetes (pode elevar glicemia)'],
    efeitosAdversos: { comuns: ['Hiperplasia gengival', 'Hirsutismo', 'Ataxia', 'Nistagmo'], graves: ['Síndrome de Stevens-Johnson', 'Hepatotoxicidade', 'Linfadenopatia', 'Osteomalácia'] },
    interacoes: [
      { medicamento: 'Anticoncepcionais', gravidade: 'grave', efeito: 'Falha contraceptiva', conduta: 'Método adicional' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Interação complexa', conduta: 'Monitorar INR' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Ajustar conforme nível sérico' }],
    gestacao: 'D', amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Nível sérico', 'Hemograma', 'Função hepática'],
    orientacoesPaciente: ['Higiene oral rigorosa (hiperplasia gengival)', 'Não parar abruptamente', 'Suplementar vitamina D'],
    doencasRelacionadas: ['epilepsia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anticonvulsivante', 'epilepsia', 'estado-de-mal']
  },
  {
    id: 'fenobarbital',
    nomeGenerico: 'Fenobarbital sódico',
    nomesComerciais: ['Gardenal'],
    // Ontologias
    atcCode: 'N03AA02',
    rxNormCui: '8134',
    drugBankId: 'DB01174',
    snomedCT: '373505007',
    casNumber: '50-06-6',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'barbiturico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '40mg/mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '200mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Epilepsia', 'Estado de mal (refratário)', 'Convulsões neonatais', 'Sedação'],
    mecanismoAcao: 'Barbitúrico. Potencializa GABA e inibe glutamato.',
    posologias: [
      { indicacao: 'Epilepsia', adultos: { dose: '60-180mg/dia', frequencia: '1x/dia (noite)', observacoes: 'Nível sérico: 15-40 mcg/mL' } }
    ],
    contraindicacoes: ['Porfiria', 'Insuficiência respiratória grave', 'Dependência de barbitúricos'],
    precaucoes: ['Idosos', 'DPOC', 'Hepatopatia', 'Depressão'],
    efeitosAdversos: { comuns: ['Sedação', 'Alteração cognitiva', 'Ataxia'], graves: ['Depressão respiratória', 'Dependência', 'Síndrome de Stevens-Johnson'] },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'grave', efeito: 'Reduz efeito', conduta: 'Monitorar INR' },
      { medicamento: 'Contraceptivos orais', gravidade: 'grave', efeito: 'Falha contraceptiva', conduta: 'Método adicional' }
    ],
    ajusteDoseRenal: [{ tfg: '<10', ajuste: 'Aumentar intervalo para 12-16h' }],
    gestacao: 'D', amamentacao: { compativel: true, observacao: 'Monitorar sedação no RN' },
    monitorizacao: ['Nível sérico', 'Sinais de depressão respiratória'],
    orientacoesPaciente: ['Causa sonolência', 'Alto risco de dependência', 'Não parar abruptamente'],
    doencasRelacionadas: ['epilepsia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anticonvulsivante', 'barbiturico', 'sedativo']
  },
  // VITAMINAS E SUPLEMENTOS
  {
    id: 'acido-folico',
    nomeGenerico: 'Ácido fólico',
    nomesComerciais: ['Folacin', 'Endofolin'],
    // Ontologias
    atcCode: 'B03BB01',
    rxNormCui: '4511',
    drugBankId: 'DB00158',
    snomedCT: '63718003',
    casNumber: '59-30-3',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true }
    ],
    indicacoes: ['Prevenção de defeitos do tubo neural', 'Anemia megaloblástica por deficiência de folato', 'Suplementação em gestantes', 'Uso com metotrexato'],
    mecanismoAcao: 'Vitamina essencial para síntese de DNA. Cofator em reações de transferência de carbono.',
    posologias: [
      { indicacao: 'Gestantes (profilaxia)', adultos: { dose: '0,4-0,8mg/dia', frequencia: '1x/dia', observacoes: '5mg/dia se alto risco (epilepsia, DM, obesidade)' } },
      { indicacao: 'Anemia megaloblástica', adultos: { dose: '5mg/dia', frequencia: '1x/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['NÃO usar isoladamente se suspeita de deficiência de B12 (pode mascarar)'],
    efeitosAdversos: { comuns: ['Bem tolerado'], graves: ['Raros'] },
    interacoes: [{ medicamento: 'Anticonvulsivantes', gravidade: 'leve', efeito: 'Podem reduzir níveis de folato', conduta: 'Suplementar' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'A', amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Hemograma', 'Níveis de folato e B12'],
    orientacoesPaciente: ['Iniciar antes de engravidar (idealmente 3 meses antes)'],
    doencasRelacionadas: ['anemia-megaloblastica'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['vitamina', 'acido-folico', 'gestacao', 'anemia']
  },
  {
    id: 'tiamina',
    nomeGenerico: 'Cloridrato de tiamina (Vitamina B1)',
    nomesComerciais: ['Benerva'],
    // Ontologias
    atcCode: 'A11DA01',
    rxNormCui: '10594',
    drugBankId: 'DB00152',
    snomedCT: '259663000',
    casNumber: '59-43-8',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '100mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Encefalopatia de Wernicke', 'Síndrome de abstinência alcoólica', 'Deficiência de tiamina', 'Beribéri'],
    mecanismoAcao: 'Cofator essencial para metabolismo de carboidratos. Necessária para função neurológica.',
    posologias: [
      { indicacao: 'Wernicke (suspeita)', adultos: { dose: '500mg IV 8/8h por 3-5 dias', frequencia: '3x/dia', observacoes: 'SEMPRE administrar ANTES de glicose em alcoolistas' } },
      { indicacao: 'Profilaxia em alcoolistas', adultos: { dose: '100-300mg/dia VO ou IM', frequencia: '1x/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Anafilaxia rara com uso IV'],
    efeitosAdversos: { comuns: ['Bem tolerado'], graves: ['Anafilaxia (IV, raro)'] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'A', amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Resposta clínica'],
    orientacoesPaciente: ['Importante para quem consome álcool regularmente'],
    doencasRelacionadas: ['encefalopatia-wernicke', 'abstinencia-alcoolica'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['vitamina', 'b1', 'tiamina', 'wernicke']
  },
  {
    id: 'vitamina-d',
    nomeGenerico: 'Colecalciferol (Vitamina D3)',
    nomesComerciais: ['Addera D3', 'Depura'],
    // Ontologias
    atcCode: 'A11CC05',
    rxNormCui: '10631',
    drugBankId: 'DB00169',
    snomedCT: '88519001',
    casNumber: '67-97-0',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_d',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '7.000UI', disponivelSUS: false },
      { forma: 'gotas', concentracao: '10.000UI/mL', disponivelSUS: true }
    ],
    indicacoes: ['Deficiência de vitamina D', 'Osteoporose', 'Raquitismo', 'Osteomalácia', 'Hipoparatireoidismo'],
    mecanismoAcao: 'Hormônio esteroide que regula metabolismo do cálcio e fósforo. Essencial para saúde óssea.',
    posologias: [
      { indicacao: 'Deficiência', adultos: { dose: '50.000UI/semana por 8 semanas, depois manutenção 1.000-2.000UI/dia', frequencia: 'Semanal (ataque) ou diário (manutenção)' } },
      { indicacao: 'Manutenção/Profilaxia', adultos: { dose: '1.000-2.000UI/dia', frequencia: '1x/dia' } }
    ],
    contraindicacoes: ['Hipercalcemia', 'Hipervitaminose D'],
    precaucoes: ['Sarcoidose', 'Hiperparatireoidismo', 'Litíase renal'],
    efeitosAdversos: { comuns: ['Bem tolerado'], graves: ['Hipercalcemia', 'Nefrolitíase (excesso)'] },
    interacoes: [{ medicamento: 'Tiazídicos', gravidade: 'moderada', efeito: 'Hipercalcemia', conduta: 'Monitorar cálcio' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Usar forma ativa (calcitriol) se DRC estágio 4-5' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['25-OH vitamina D', 'Cálcio sérico'],
    orientacoesPaciente: ['Tomar com refeição gordurosa (melhora absorção)', 'Exposição solar adequada'],
    doencasRelacionadas: ['osteoporose', 'raquitismo'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['vitamina', 'vitamina-d', 'osso', 'calcio']
  },
  // OUTROS ESSENCIAIS
  {
    id: 'insulina-nph',
    nomeGenerico: 'Insulina humana NPH',
    nomesComerciais: ['Humulin N', 'Novolin N'],
    // Ontologias
    atcCode: 'A10AC01',
    rxNormCui: '311041',
    drugBankId: 'DB00046',
    snomedCT: '67866001',
    casNumber: '53027-39-7',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina_intermediaria',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '100UI/mL', disponivelSUS: true }
    ],
    indicacoes: ['Diabetes mellitus tipo 1', 'Diabetes mellitus tipo 2 com falha de antidiabéticos orais', 'Diabetes gestacional', 'Cetoacidose diabética'],
    mecanismoAcao: 'Insulina de ação intermediária. Início 1-2h, pico 4-8h, duração 12-18h.',
    posologias: [
      { indicacao: 'DM2', adultos: { dose: 'Iniciar 10UI/dia (ou 0,1-0,2UI/kg) à noite', frequencia: '1-2x/dia', observacoes: 'Titular conforme glicemia de jejum' } }
    ],
    contraindicacoes: ['Hipoglicemia'],
    precaucoes: ['Ajuste de dose em exercício, jejum, infecções', 'DRC (menor necessidade)'],
    efeitosAdversos: { comuns: ['Hipoglicemia', 'Ganho de peso', 'Lipodistrofia'], graves: ['Hipoglicemia grave'] },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Mascaram sintomas de hipoglicemia', conduta: 'Orientar paciente' }
    ],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Reduzir dose (menor clearance de insulina)' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Glicemia capilar', 'HbA1c', 'Sinais de hipoglicemia'],
    orientacoesPaciente: ['Técnica correta de aplicação', 'Rodízio de locais', 'Reconhecer hipoglicemia', 'Armazenar em geladeira'],
    doencasRelacionadas: ['diabetes-mellitus-2', 'diabetes-mellitus-1'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['insulina', 'antidiabetico', 'dm1', 'dm2']
  },
  {
    id: 'insulina-regular',
    nomeGenerico: 'Insulina humana regular',
    nomesComerciais: ['Humulin R', 'Novolin R'],
    // Ontologias
    atcCode: 'A10AB01',
    rxNormCui: '253182',
    drugBankId: 'DB00030',
    snomedCT: '325072002',
    casNumber: '11061-68-0',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina_rapida',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '100UI/mL', disponivelSUS: true }
    ],
    indicacoes: ['Controle glicêmico pré-prandial', 'Cetoacidose diabética', 'Estado hiperosmolar', 'Perioperatório'],
    mecanismoAcao: 'Insulina de ação rápida. Início 30-60min, pico 2-4h, duração 6-8h.',
    posologias: [
      { indicacao: 'Pré-prandial', adultos: { dose: 'Conforme contagem de carboidratos ou escala', frequencia: 'Antes das refeições', observacoes: 'Aplicar 30min antes de comer' } },
      { indicacao: 'CAD', adultos: { dose: '0,1UI/kg/h em BIC IV', frequencia: 'Contínuo', observacoes: 'Em UTI com monitorização' } }
    ],
    contraindicacoes: ['Hipoglicemia'],
    precaucoes: ['Risco de hipoglicemia', 'DRC'],
    efeitosAdversos: { comuns: ['Hipoglicemia'], graves: ['Hipoglicemia grave'] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Reduzir dose' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Glicemia capilar frequente'],
    orientacoesPaciente: ['Aplicar 30min antes das refeições', 'Não pular refeição após aplicar'],
    doencasRelacionadas: ['diabetes-mellitus-1', 'cetoacidose'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['insulina', 'antidiabetico', 'cad']
  },
  {
    id: 'clomifeno',
    nomeGenerico: 'Citrato de clomifeno',
    nomesComerciais: ['Clomid', 'Indux'],
    // Ontologias
    atcCode: 'G03GB02',
    rxNormCui: '2588',
    drugBankId: 'DB00882',
    snomedCT: '387166005',
    casNumber: '911-45-5',
    classeTerapeutica: 'indutor_ovulacao',
    subclasse: 'serm',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true }
    ],
    indicacoes: ['Anovulação com desejo de gestar', 'Síndrome dos ovários policísticos', 'Infertilidade'],
    mecanismoAcao: 'SERM (modulador seletivo do receptor de estrogênio). Bloqueia feedback negativo do estrogênio, aumentando FSH.',
    posologias: [
      { indicacao: 'Indução de ovulação', adultos: { dose: '50mg/dia do D3 ao D7 (ou D5-D9) do ciclo', frequencia: '1x/dia por 5 dias', observacoes: 'Pode aumentar para 100-150mg se não responder' } }
    ],
    contraindicacoes: ['Gestação', 'Cisto ovariano', 'Sangramento uterino anormal não diagnosticado', 'Insuficiência hepática'],
    precaucoes: ['Síndrome de hiperestimulação ovariana', 'Gestação múltipla (10% gêmeos)'],
    efeitosAdversos: { comuns: ['Fogachos', 'Desconforto pélvico', 'Cefaleia', 'Alterações visuais'], graves: ['Síndrome de hiperestimulação ovariana', 'Gestação múltipla'] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'X', amamentacao: { compativel: false, observacao: 'Evitar durante amamentação' },
    monitorizacao: ['USG para monitorar folículos', 'Sintomas de hiperestimulação'],
    orientacoesPaciente: ['Relações sexuais programadas no período fértil', 'Informar distensão abdominal intensa'],
    doencasRelacionadas: ['sindrome-ovarios-policisticos', 'infertilidade'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['indutor-ovulacao', 'sop', 'infertilidade']
  },
  {
    id: 'clopidogrel',
    nomeGenerico: 'Bissulfato de clopidogrel',
    nomesComerciais: ['Plavix', 'Clopigrel'],
    // Ontologias
    atcCode: 'B01AC04',
    rxNormCui: '32968',
    drugBankId: 'DB00758',
    snomedCT: '386952008',
    casNumber: '113665-84-2',
    classeTerapeutica: 'antiagregante',
    subclasse: 'inibidor_p2y12',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: true }
    ],
    indicacoes: ['SCA (com AAS)', 'Pós-stent coronariano', 'Prevenção de AVC', 'Doença arterial periférica', 'Alergia a AAS'],
    mecanismoAcao: 'Inibe irreversivelmente receptor P2Y12 plaquetário, bloqueando agregação induzida por ADP.',
    posologias: [
      { indicacao: 'SCA', adultos: { dose: '300-600mg (ataque) + 75mg/dia', frequencia: '1x/dia' } },
      { indicacao: 'Prevenção secundária', adultos: { dose: '75mg/dia', frequencia: '1x/dia' } }
    ],
    contraindicacoes: ['Sangramento ativo', 'Hipersensibilidade'],
    precaucoes: ['Cirurgia (suspender 5-7 dias antes)', 'Metabolizadores lentos CYP2C19'],
    efeitosAdversos: { comuns: ['Sangramento menor', 'Dispepsia'], graves: ['Hemorragia maior', 'PTT (raro)'] },
    interacoes: [
      { medicamento: 'Omeprazol', gravidade: 'moderada', efeito: 'Reduz ativação do clopidogrel', conduta: 'Preferir pantoprazol' },
      { medicamento: 'Anticoagulantes', gravidade: 'grave', efeito: 'Sangramento', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'B', amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['Sinais de sangramento'],
    orientacoesPaciente: ['Informar antes de cirurgias/procedimentos', 'Reconhecer sinais de sangramento'],
    doencasRelacionadas: ['sca', 'avc', 'dap'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antiagregante', 'antiplaquetario', 'stent']
  },
  {
    id: 'enoxaparina',
    nomeGenerico: 'Enoxaparina sódica',
    nomesComerciais: ['Clexane', 'Cutenox'],
    // Ontologias
    atcCode: 'B01AB05',
    rxNormCui: '67108',
    drugBankId: 'DB01225',
    snomedCT: '372879009',
    casNumber: '679809-58-6',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'hbpm',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '40mg/0,4mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '60mg/0,6mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '80mg/0,8mL', disponivelSUS: true }
    ],
    indicacoes: ['Profilaxia de TVP', 'Tratamento de TVP/TEP', 'SCA', 'Prevenção de trombose em FA'],
    mecanismoAcao: 'Heparina de baixo peso molecular. Inibe principalmente fator Xa.',
    posologias: [
      { indicacao: 'Profilaxia TVP', adultos: { dose: '40mg SC 1x/dia', frequencia: '1x/dia' } },
      { indicacao: 'Tratamento TVP/TEP', adultos: { dose: '1mg/kg SC 12/12h ou 1,5mg/kg 1x/dia', frequencia: '1-2x/dia' } }
    ],
    contraindicacoes: ['Sangramento ativo', 'Trombocitopenia induzida por heparina (HIT)', 'Alergia a heparinas'],
    precaucoes: ['DRC (acúmulo)', 'Peso extremos', 'Anestesia neuroaxial'],
    efeitosAdversos: { comuns: ['Sangramento menor', 'Hematoma no local'], graves: ['Hemorragia maior', 'HIT', 'Osteoporose (uso prolongado)'] },
    interacoes: [{ medicamento: 'AINEs/AAS', gravidade: 'moderada', efeito: 'Sangramento', conduta: 'Monitorar' }],
    ajusteDoseRenal: [
      { tfg: '15-30', ajuste: '1mg/kg 1x/dia (tratamento)' },
      { tfg: '<15', ajuste: 'Usar com cautela, monitorar anti-Xa' }
    ],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Plaquetas (HIT)', 'Anti-Xa se DRC ou obeso', 'Sinais de sangramento'],
    orientacoesPaciente: ['Técnica de aplicação SC', 'Rodízio de locais', 'Não massagear local'],
    doencasRelacionadas: ['tvp', 'tep', 'sca'], calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anticoagulante', 'hbpm', 'tvp', 'tep']
  },
  {
    id: 'albendazol',
    nomeGenerico: 'Albendazol',
    nomesComerciais: ['Zentel', 'Albentel'],
    // Ontologias
    atcCode: 'P02CA03',
    rxNormCui: '429',
    drugBankId: 'DB00518',
    snomedCT: '387558006',
    casNumber: '54965-21-8',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'anti_helmintico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '40mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Ascaridíase', 'Enterobíase', 'Ancilostomíase', 'Tricuríase', 'Estrongiloidíase', 'Giardíase', 'Teníase', 'Neurocisticercose'],
    mecanismoAcao: 'Anti-helmíntico benzimidazol. Inibe captação de glicose pelo parasita.',
    posologias: [
      { indicacao: 'Helmintos intestinais', adultos: { dose: '400mg dose única', frequencia: 'Dose única' } },
      { indicacao: 'Giardíase', adultos: { dose: '400mg/dia por 5 dias', frequencia: '1x/dia' } },
      { indicacao: 'Neurocisticercose', adultos: { dose: '15mg/kg/dia dividido em 2 doses por 8-30 dias', frequencia: '2x/dia', observacoes: 'Com corticoide e anticonvulsivante' } }
    ],
    contraindicacoes: ['Gestação (1º trimestre)', 'Hipersensibilidade'],
    precaucoes: ['Hepatopatia', 'Cistercose ocular ou espinhal'],
    efeitosAdversos: { comuns: ['Dor abdominal', 'Náusea', 'Cefaleia'], graves: ['Hepatotoxicidade', 'Agranulocitose (uso prolongado)'] },
    interacoes: [{ medicamento: 'Dexametasona', gravidade: 'leve', efeito: 'Aumenta níveis de albendazol', conduta: 'Geralmente desejado na neurocisticercose' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Suspender por 24h após dose' },
    monitorizacao: ['Função hepática em tratamentos prolongados', 'Hemograma'],
    orientacoesPaciente: ['Tomar com refeição gordurosa (melhora absorção)', 'Tratar toda família se enterobíase'],
    doencasRelacionadas: ['parasitoses-intestinais'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antiparasitario', 'verminose', 'helmintiase']
  },
  {
    id: 'ivermectina',
    nomeGenerico: 'Ivermectina',
    nomesComerciais: ['Revectina', 'Ivermec'],
    // Ontologias
    atcCode: 'P02CF01',
    rxNormCui: '28031',
    drugBankId: 'DB00602',
    snomedCT: '387559003',
    casNumber: '70288-86-7',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'anti_helmintico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '6mg', disponivelSUS: true }
    ],
    indicacoes: ['Estrongiloidíase', 'Oncocercose', 'Escabiose', 'Pediculose', 'Filariose'],
    mecanismoAcao: 'Avermectina. Potencializa canais de cloro mediados por glutamato, causando paralisia do parasita.',
    posologias: [
      { indicacao: 'Estrongiloidíase', adultos: { dose: '200mcg/kg dose única (ou 2 dias)', frequencia: 'Dose única' } },
      { indicacao: 'Escabiose', adultos: { dose: '200mcg/kg dose única, repetir em 7-14 dias', frequencia: '2 doses' } }
    ],
    contraindicacoes: ['Crianças <15kg', 'Loíase (risco de encefalopatia)'],
    precaucoes: ['Gestação', 'Amamentação', 'Asma'],
    efeitosAdversos: { comuns: ['Cefaleia', 'Tontura', 'Náusea'], graves: ['Reação de Mazzotti (oncocercose)', 'Encefalopatia (loíase)'] },
    interacoes: [{ medicamento: 'Varfarina', gravidade: 'leve', efeito: 'Pode alterar INR', conduta: 'Monitorar' }],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Aguardar 24h após dose' },
    monitorizacao: ['Resposta clínica', 'Exame de fezes de controle'],
    orientacoesPaciente: ['Tomar em jejum com água', 'Repetir dose para escabiose'],
    doencasRelacionadas: ['escabiose', 'estrongiloidiase'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antiparasitario', 'escabiose', 'estrongiloides']
  },

  // === MEDICAMENTOS FINAIS (100 RENAME) ===

  {
    id: 'sulfametoxazol-trimetoprima',
    nomeGenerico: 'Sulfametoxazol + Trimetoprima',
    nomesComerciais: ['Bactrim', 'Bacteracin'],
    // Ontologias
    atcCode: 'J01EE01',
    rxNormCui: '10180',
    drugBankId: 'DB00440',
    snomedCT: '387179001',
    casNumber: '723-46-6',
    classeTerapeutica: 'antibiotico',
    subclasse: 'sulfonamida_inibidor_folato',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg+80mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '800mg+160mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '200mg+40mg/5mL', disponivelSUS: true }
    ],
    indicacoes: ['ITU', 'Prostatite', 'Pneumocistose', 'Nocardiose', 'Toxoplasmose', 'Shigelose'],
    mecanismoAcao: 'Inibição sequencial da síntese de folato: sulfametoxazol inibe diidropteroato sintetase, trimetoprima inibe diidrofolato redutase.',
    posologias: [
      { indicacao: 'ITU não complicada', adultos: { dose: '800/160mg', frequencia: '12/12h', observacoes: 'Duração: 3 dias' } },
      { indicacao: 'Pneumocistose', adultos: { dose: '15-20mg/kg/dia (TMP)', frequencia: '6/6h', observacoes: 'Duração: 21 dias' } }
    ],
    contraindicacoes: ['Alergia a sulfonamidas', 'Deficiência de G6PD', 'Anemia megaloblástica por deficiência de folato'],
    precaucoes: ['Insuficiência renal', 'Idosos', 'Desidratação'],
    efeitosAdversos: { comuns: ['Náusea', 'Vômito', 'Rash'], graves: ['Síndrome de Stevens-Johnson', 'Hipercalemia', 'Supressão medular'] },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'grave', efeito: 'Aumenta INR', conduta: 'Monitorar intensivo' },
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Aumenta toxicidade', conduta: 'Evitar combinação' }
    ],
    ajusteDoseRenal: [
      { tfg: '15-30', ajuste: '50% da dose usual' },
      { tfg: '<15', ajuste: 'Evitar ou ajuste individualizado' }
    ],
    gestacao: 'D', amamentacao: { compativel: false, observacao: 'Evitar em icterícia neonatal' },
    monitorizacao: ['Hemograma', 'Creatinina', 'Potássio'],
    orientacoesPaciente: ['Tomar com água', 'Manter hidratação adequada', 'Fotossensibilidade'],
    doencasRelacionadas: ['infeccao-urinaria'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antibiotico', 'itu', 'sulfa']
  },
  {
    id: 'prednisolona',
    nomeGenerico: 'Prednisolona',
    nomesComerciais: ['Prelone', 'Predsim'],
    // Ontologias
    atcCode: 'H02AB06',
    rxNormCui: '8638',
    drugBankId: 'DB00860',
    snomedCT: '116601002',
    casNumber: '50-24-8',
    classeTerapeutica: 'anti_inflamatorio',
    subclasse: 'corticosteroide',
    rename: true,
    apresentacoes: [
      { forma: 'solucao_oral', concentracao: '3mg/mL', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true }
    ],
    indicacoes: ['Asma', 'DPOC exacerbado', 'Artrite reumatoide', 'Doenças autoimunes', 'Laringite'],
    mecanismoAcao: 'Corticosteroide sintético. Liga-se a receptores citoplasmáticos, inibindo transcrição de genes pró-inflamatórios.',
    posologias: [
      { indicacao: 'Asma crise', adultos: { dose: '40-60mg', frequencia: '1x/dia', observacoes: 'Duração: 5-7 dias' }, 
        pediatrico: { dose: '1-2mg/kg/dia', frequencia: '1x/dia', doseMaxima: '60mg' } },
      { indicacao: 'Laringite', adultos: { dose: 'Raramente indicado', frequencia: 'N/A' }, pediatrico: { dose: '1mg/kg dose única', frequencia: 'Dose única', doseMaxima: '60mg' } }
    ],
    contraindicacoes: ['Infecção sistêmica sem tratamento', 'Hipersensibilidade'],
    precaucoes: ['Diabetes', 'HAS', 'Osteoporose', 'Glaucoma', 'Úlcera péptica'],
    efeitosAdversos: { comuns: ['Insônia', 'Aumento apetite', 'Hiperglicemia'], graves: ['Supressão adrenal', 'Osteoporose', 'Catarata', 'Psicose'] },
    interacoes: [
      { medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Risco de úlcera', conduta: 'Usar protetor gástrico' },
      { medicamento: 'Hipoglicemiantes', gravidade: 'moderada', efeito: 'Antagonismo', conduta: 'Ajustar doses' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Doses baixas são seguras' },
    monitorizacao: ['Glicemia', 'Pressão arterial', 'Peso'],
    orientacoesPaciente: ['Tomar pela manhã', 'Não interromper abruptamente', 'Cuidado com infecções'],
    doencasRelacionadas: ['asma', 'dpoc'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['corticoide', 'anti-inflamatorio', 'asma']
  },
  {
    id: 'sulfato-ferroso',
    nomeGenerico: 'Sulfato Ferroso',
    nomesComerciais: ['Sulfato Ferroso', 'Fer-In-Sol'],
    // Ontologias
    atcCode: 'B03AA07',
    rxNormCui: '10140',
    drugBankId: 'DB14491',
    snomedCT: '387399004',
    casNumber: '7720-78-7',
    classeTerapeutica: 'suplemento',
    subclasse: 'antianemico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg Fe elementar', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '25mg Fe/mL', disponivelSUS: true }
    ],
    indicacoes: ['Anemia ferropriva', 'Profilaxia de anemia na gestação', 'Suplementação pediátrica'],
    mecanismoAcao: 'Fornece ferro elementar para síntese de hemoglobina e mioglobina.',
    posologias: [
      { indicacao: 'Anemia tratamento', adultos: { dose: '120-200mg Fe/dia', frequencia: '2-3x/dia' } },
      { indicacao: 'Profilaxia gestação', adultos: { dose: '40mg Fe/dia', frequencia: '1x/dia' } },
      { indicacao: 'Pediatria', adultos: { dose: 'N/A', frequencia: 'N/A' }, pediatrico: { dose: '3-6mg Fe/kg/dia', frequencia: '1-2x/dia' } }
    ],
    contraindicacoes: ['Hemocromatose', 'Hemossiderose', 'Anemia não ferropriva'],
    precaucoes: ['Úlcera péptica', 'Doença inflamatória intestinal'],
    efeitosAdversos: { comuns: ['Constipação', 'Náusea', 'Fezes escuras', 'Desconforto epigástrico'], graves: ['Intoxicação por ferro (superdose)'] },
    interacoes: [
      { medicamento: 'Antiácidos', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar 2h' },
      { medicamento: 'Quinolonas', gravidade: 'grave', efeito: 'Reduz absorção do antibiótico', conduta: 'Separar 2h' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Cautela em diálise' }],
    gestacao: 'A', amamentacao: { compativel: true, observacao: 'Seguro e recomendado' },
    monitorizacao: ['Hemoglobina', 'Ferritina', 'Reticulócitos'],
    orientacoesPaciente: ['Tomar em jejum', 'Vitamina C melhora absorção', 'Evitar com leite/café'],
    doencasRelacionadas: ['anemia-ferropriva'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['ferro', 'anemia', 'suplemento']
  },
  {
    id: 'acido-folico',
    nomeGenerico: 'Ácido Fólico',
    nomesComerciais: ['Ácido Fólico', 'Enfol'],
    // Ontologias
    atcCode: 'B03BB01',
    rxNormCui: '4511',
    drugBankId: 'DB00158',
    snomedCT: '63718003',
    casNumber: '59-30-3',
    classeTerapeutica: 'suplemento',
    subclasse: 'vitamina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true }
    ],
    indicacoes: ['Profilaxia de defeitos do tubo neural', 'Anemia megaloblástica', 'Suplementação pré-concepcional'],
    mecanismoAcao: 'Vitamina B9. Coenzima essencial na síntese de nucleotídeos e metabolismo de aminoácidos.',
    posologias: [
      { indicacao: 'Pré-concepção', adultos: { dose: '0,4-0,8mg', frequencia: '1x/dia', observacoes: '3 meses antes da concepção até fim do 1º trimestre' } },
      { indicacao: 'Gestação alto risco', adultos: { dose: '4-5mg', frequencia: '1x/dia' } },
      { indicacao: 'Anemia megaloblástica', adultos: { dose: '5mg', frequencia: '1x/dia' } }
    ],
    contraindicacoes: ['Anemia perniciosa não tratada (mascara deficiência de B12)'],
    precaucoes: ['Diagnóstico diferencial com deficiência de B12'],
    efeitosAdversos: { comuns: ['Bem tolerado'], graves: ['Reações alérgicas (raras)'] },
    interacoes: [
      { medicamento: 'Fenitoína', gravidade: 'moderada', efeito: 'Reduz níveis de ambos', conduta: 'Monitorar' },
      { medicamento: 'Metotrexato', gravidade: 'moderada', efeito: 'Antagonismo (pode ser intencional)', conduta: 'Ajustar conforme indicação' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'A', amamentacao: { compativel: true, observacao: 'Seguro e recomendado' },
    monitorizacao: ['Resposta hematológica'],
    orientacoesPaciente: ['Iniciar antes da concepção', 'Manter durante primeiro trimestre'],
    doencasRelacionadas: ['anemia-megaloblastica'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['vitamina', 'gestacao', 'neural']
  },
  {
    id: 'vitamina-d3',
    nomeGenerico: 'Colecalciferol (Vitamina D3)',
    nomesComerciais: ['Addera D3', 'DePura'],
    // Ontologias
    atcCode: 'A11CC05',
    rxNormCui: '10631',
    drugBankId: 'DB00169',
    snomedCT: '88519001',
    casNumber: '67-97-0',
    classeTerapeutica: 'suplemento',
    subclasse: 'vitamina',
    rename: true,
    apresentacoes: [
      { forma: 'gotas', concentracao: '200UI/gota', disponivelSUS: true },
      { forma: 'capsula', concentracao: '7.000UI', disponivelSUS: true },
      { forma: 'capsula', concentracao: '50.000UI', disponivelSUS: true }
    ],
    indicacoes: ['Deficiência de vitamina D', 'Osteoporose', 'Osteomalácia', 'Raquitismo'],
    mecanismoAcao: 'Vitamina D ativa regula absorção intestinal de cálcio e fósforo, mineralização óssea e homeostase mineral.',
    posologias: [
      { indicacao: 'Manutenção adultos', adultos: { dose: '600-2000UI', frequencia: '1x/dia' } },
      { indicacao: 'Deficiência (reposição)', adultos: { dose: '50.000UI', frequencia: '1x/semana', observacoes: 'Duração: 8-12 semanas' } },
      { indicacao: 'Pediatria', adultos: { dose: 'N/A', frequencia: 'N/A' }, pediatrico: { dose: '400-1000UI', frequencia: '1x/dia' } }
    ],
    contraindicacoes: ['Hipercalcemia', 'Hipervitaminose D', 'Litíase renal recorrente'],
    precaucoes: ['Insuficiência renal', 'Sarcoidose', 'Hiperparatireoidismo'],
    efeitosAdversos: { comuns: ['Bem tolerado'], graves: ['Hipercalcemia', 'Nefrocalcinose', 'Fraqueza'] },
    interacoes: [
      { medicamento: 'Tiazídicos', gravidade: 'moderada', efeito: 'Risco de hipercalcemia', conduta: 'Monitorar cálcio' },
      { medicamento: 'Digitálicos', gravidade: 'moderada', efeito: 'Potencializa toxicidade', conduta: 'Cautela' }
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Preferir calcitriol (forma ativa)' }
    ],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Doses fisiológicas seguras' },
    monitorizacao: ['25-OH vitamina D', 'Cálcio sérico', 'Fósforo'],
    orientacoesPaciente: ['Tomar com refeição gordurosa', 'Exposição solar moderada também ajuda'],
    doencasRelacionadas: ['osteoporose'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['vitamina', 'osso', 'calcio']
  },
  {
    id: 'cefalexina',
    nomeGenerico: 'Cefalexina',
    nomesComerciais: ['Keflex', 'Cefalexina'],
    // Ontologias
    atcCode: 'J01DB01',
    rxNormCui: '2231',
    drugBankId: 'DB00567',
    snomedCT: '387297002',
    casNumber: '15686-71-2',
    classeTerapeutica: 'antibiotico',
    subclasse: 'cefalosporina_1_geracao',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '500mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '250mg/5mL', disponivelSUS: true }
    ],
    indicacoes: ['Infecções de pele', 'Faringite estreptocócica', 'ITU não complicada', 'Otite média'],
    mecanismoAcao: 'Cefalosporina de 1ª geração. Inibe síntese da parede celular bacteriana ligando-se às PBPs.',
    posologias: [
      { indicacao: 'Infecções leves-moderadas', adultos: { dose: '500mg', frequencia: '6/6h', observacoes: 'Duração: 7-10 dias' } },
      { indicacao: 'Faringite', adultos: { dose: '500mg', frequencia: '12/12h', observacoes: 'Duração: 10 dias' } },
      { indicacao: 'Pediatria', adultos: { dose: 'N/A', frequencia: 'N/A' }, pediatrico: { dose: '25-50mg/kg/dia', frequencia: '6/6h', doseMaxima: '4g' } }
    ],
    contraindicacoes: ['Alergia a cefalosporinas', 'Anafilaxia prévia a penicilinas'],
    precaucoes: ['Insuficiência renal', 'Alergia a penicilinas (reação cruzada ~1%)'],
    efeitosAdversos: { comuns: ['Diarreia', 'Náusea', 'Dispepsia'], graves: ['Colite pseudomembranosa', 'Anafilaxia'] },
    interacoes: [
      { medicamento: 'Probenecida', gravidade: 'leve', efeito: 'Aumenta níveis de cefalexina', conduta: 'Pode ser intencional' }
    ],
    ajusteDoseRenal: [
      { tfg: '10-50', ajuste: '500mg 8/8h' },
      { tfg: '<10', ajuste: '250-500mg 12/12h' }
    ],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Seguro' },
    monitorizacao: ['Resposta clínica', 'Função renal se prolongado'],
    orientacoesPaciente: ['Pode tomar com ou sem alimentos', 'Completar tratamento'],
    doencasRelacionadas: ['infeccao-urinaria'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antibiotico', 'cefalosporina', 'pele']
  },
  {
    id: 'benzoato-benzila',
    nomeGenerico: 'Benzoato de Benzila',
    nomesComerciais: ['Acarsan', 'Sanasar'],
    // Ontologias
    atcCode: 'P03AX01',
    rxNormCui: '1341',
    drugBankId: 'DB00676',
    snomedCT: '418761004',
    casNumber: '120-51-4',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'escabicida_pediculicida',
    rename: true,
    apresentacoes: [
      { forma: 'locao', concentracao: '25%', disponivelSUS: true }
    ],
    indicacoes: ['Escabiose', 'Pediculose'],
    mecanismoAcao: 'Ação neurotóxica sobre Sarcoptes scabiei e Pediculus. Penetra no exoesqueleto do parasita causando paralisia.',
    posologias: [
      { indicacao: 'Escabiose', adultos: { dose: 'Aplicar no corpo todo (do pescoço para baixo)', frequencia: '1x/dia', observacoes: 'Duração: 3 noites consecutivas' } },
      { indicacao: 'Pediculose', adultos: { dose: 'Aplicar no couro cabeludo', frequencia: '1x/dia', observacoes: 'Duração: 3 dias' } }
    ],
    contraindicacoes: ['Lesões cutâneas extensas', 'Inflamação aguda da pele'],
    precaucoes: ['Evitar contato com olhos e mucosas', 'Não usar em crianças <2 anos'],
    efeitosAdversos: { comuns: ['Ardência local', 'Irritação cutânea'], graves: ['Dermatite de contato', 'Convulsões (se ingerido)'] },
    interacoes: [],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não se aplica (uso tópico)' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Uso tópico, absorção mínima' },
    monitorizacao: ['Resposta clínica', 'Prurido residual pode durar semanas'],
    orientacoesPaciente: ['Aplicar após banho', 'Trocar roupas de cama', 'Tratar contactantes'],
    doencasRelacionadas: ['escabiose'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['escabicida', 'pediculose', 'topico']
  }
];

