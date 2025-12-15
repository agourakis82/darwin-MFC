/**
 * MEDICAMENTOS GASTROINTESTINAIS E METABÓLICOS - DARWIN-MFC
 * ==========================================================
 * Medicamentos RENAME 2024
 */

import { Medicamento } from '../../types/medicamento';

export const gastroMetabolicos: Partial<Medicamento>[] = [
  {
    id: 'omeprazol',
    nomeGenerico: 'Omeprazol',
    nomesComerciais: ['Losec', 'Peprazol'],
    atcCode: 'A02BC01',
    rxNormCui: '7646',
    drugBankId: 'DB00338',
    snomedCT: '387137007',
    casNumber: '73590-58-6',
    dcbCode: '06552',
    classeTerapeutica: 'inibidor_bomba_protonica',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '40mg', disponivelSUS: true }
    ],
    indicacoes: ['DRGE', 'Úlcera péptica', 'H. pylori (esquema tríplice)', 'Prevenção úlcera por AINEs', 'Zollinger-Ellison'],
    mecanismoAcao: 'Inibe bomba de prótons (H+/K+-ATPase) nas células parietais gástricas.',
    posologias: [{
      indicacao: 'DRGE/Úlcera',
      adultos: { dose: '20-40mg', frequencia: '1x/dia antes do café', observacoes: '4-8 semanas' }
    }],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: { comuns: ['Cefaleia', 'Náusea', 'Diarreia'], graves: ['Hipomagnesemia (uso crônico)', 'Deficiência B12', 'Fraturas'] },
    interacoes: [{ medicamento: 'Clopidogrel', gravidade: 'moderada', efeito: 'Reduz ativação de clopidogrel', conduta: 'Preferir pantoprazol' }],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['drge', 'ulcera-peptica'],
    lastUpdate: '2024-12',
    tags: ['IBP', 'omeprazol', 'úlcera', 'refluxo']
  },
  {
    id: 'pantoprazol',
    nomeGenerico: 'Pantoprazol sódico',
    nomesComerciais: ['Pantozol', 'Pantocal'],
    atcCode: 'A02BC02',
    rxNormCui: '40790',
    drugBankId: 'DB00213',
    snomedCT: '395908005',
    casNumber: '102625-70-7',
    dcbCode: '06743',
    classeTerapeutica: 'inibidor_bomba_protonica',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '40mg', disponivelSUS: true }
    ],
    indicacoes: ['DRGE', 'Úlcera péptica', 'Zollinger-Ellison', 'Sangramento digestivo alto (IV)'],
    mecanismoAcao: 'IBP com menor interação com CYP2C19 que omeprazol.',
    posologias: [{
      indicacao: 'DRGE',
      adultos: { dose: '40mg', frequencia: '1x/dia' }
    }],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: { comuns: ['Cefaleia', 'Diarreia'], graves: ['Hipomagnesemia'] },
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['drge', 'ulcera-peptica'],
    lastUpdate: '2024-12',
    tags: ['IBP', 'pantoprazol']
  },
  {
    id: 'ranitidina',
    nomeGenerico: 'Cloridrato de ranitidina',
    nomesComerciais: ['Antak', 'Label'],
    atcCode: 'A02BA02',
    rxNormCui: '9143',
    drugBankId: 'DB00863',
    snomedCT: '372755005',
    casNumber: '66357-35-5',
    dcbCode: '07673',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '25mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Úlcera péptica', 'DRGE', 'Profilaxia de aspiração (pré-cirúrgico)'],
    mecanismoAcao: 'Antagonista do receptor H2 de histamina. Reduz secreção ácida.',
    posologias: [{
      indicacao: 'Úlcera',
      adultos: { dose: '150mg', frequencia: 'A cada 12h ou 300mg à noite' }
    }],
    contraindicacoes: ['Hipersensibilidade', 'Porfiria'],
    efeitosAdversos: { comuns: ['Cefaleia', 'Constipação'], graves: ['Confusão (idosos)', 'Hepatotoxicidade'] },
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    lastUpdate: '2024-12',
    tags: ['anti-H2', 'ranitidina', 'úlcera']
  },
  {
    id: 'metoclopramida',
    nomeGenerico: 'Cloridrato de metoclopramida',
    nomesComerciais: ['Plasil', 'Eucil'],
    atcCode: 'A03FA01',
    rxNormCui: '6915',
    drugBankId: 'DB01233',
    snomedCT: '372776000',
    casNumber: '364-62-5',
    dcbCode: '05789',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '4mg/mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '5mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Náusea e vômitos', 'Gastroparesia', 'Procinético'],
    mecanismoAcao: 'Antagonista dopaminérgico D2 + agonista 5-HT4. Aumenta motilidade GI.',
    posologias: [{
      indicacao: 'Náusea/Vômito',
      adultos: { dose: '10mg', frequencia: 'A cada 6-8h, antes das refeições', doseMaxima: '30mg/dia', observacoes: 'Máximo 5 dias' }
    }],
    contraindicacoes: ['Obstrução GI', 'Feocromocitoma', 'Parkinson', 'Epilepsia não controlada'],
    efeitosAdversos: { comuns: ['Sonolência', 'Inquietação'], graves: ['Discinesia tardia', 'Síndrome neuroléptica maligna', 'Parkinsonismo'] },
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível, pode aumentar prolactina' },
    lastUpdate: '2024-12',
    tags: ['antiemético', 'procinético', 'náusea']
  },
  {
    id: 'ondansetrona',
    nomeGenerico: 'Cloridrato de ondansetrona',
    nomesComerciais: ['Zofran', 'Vonau'],
    atcCode: 'A04AA01',
    rxNormCui: '26225',
    drugBankId: 'DB00904',
    snomedCT: '372487007',
    casNumber: '99614-02-5',
    dcbCode: '06559',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '8mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '2mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Náusea/vômito por quimioterapia', 'Náusea/vômito pós-operatório', 'Gastroenterite (uso criterioso)'],
    mecanismoAcao: 'Antagonista seletivo do receptor 5-HT3. Antiemético central.',
    posologias: [{
      indicacao: 'Náusea/Vômito',
      adultos: { dose: '4-8mg', frequencia: 'A cada 8h VO ou IV', doseMaxima: '24mg/dia' }
    }],
    contraindicacoes: ['QT longo', 'Uso de apomorfina'],
    efeitosAdversos: { comuns: ['Cefaleia', 'Constipação'], graves: ['QT longo', 'Síndrome serotoninérgica'] },
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    lastUpdate: '2024-12',
    tags: ['antiemético', '5-HT3', 'quimioterapia']
  },
  {
    id: 'loperamida',
    nomeGenerico: 'Cloridrato de loperamida',
    nomesComerciais: ['Imosec', 'Diasec'],
    atcCode: 'A07DA03',
    rxNormCui: '6468',
    drugBankId: 'DB00836',
    snomedCT: '387040009',
    casNumber: '53179-11-6',
    dcbCode: '05401',
    classeTerapeutica: 'analgesico',
    subclasse: 'opioide_fraco',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true }
    ],
    indicacoes: ['Diarreia aguda não infecciosa', 'Diarreia crônica', 'Síndrome do intestino curto'],
    mecanismoAcao: 'Opioide sintético que atua em receptores μ intestinais, reduzindo motilidade sem efeito SNC.',
    posologias: [{
      indicacao: 'Diarreia',
      adultos: { dose: '4mg inicial, depois 2mg após cada evacuação líquida', frequencia: 'Conforme necessário', doseMaxima: '16mg/dia' }
    }],
    contraindicacoes: ['Disenteria (sangue/febre)', 'Colite pseudomembranosa', 'Íleo paralítico', 'Megacólon tóxico'],
    efeitosAdversos: { comuns: ['Constipação', 'Cólicas'], graves: ['Megacólon tóxico', 'Íleo paralítico'] },
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['sindrome-intestino-irritavel'],
    lastUpdate: '2024-12',
    tags: ['antidiarreico', 'loperamida']
  },
  {
    id: 'simeticona',
    nomeGenerico: 'Simeticona (Dimeticona)',
    nomesComerciais: ['Luftal', 'Flagass'],
    atcCode: 'A03AX13',
    rxNormCui: '9788',
    drugBankId: 'DB04896',
    snomedCT: '387289009',
    casNumber: '8050-81-5',
    dcbCode: '08217',
    classeTerapeutica: 'analgesico',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '75mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Flatulência', 'Distensão abdominal', 'Cólica do lactente', 'Preparo para exames'],
    mecanismoAcao: 'Reduz tensão superficial das bolhas de gás no TGI, facilitando eliminação.',
    posologias: [{
      indicacao: 'Flatulência',
      adultos: { dose: '40-125mg', frequencia: 'Após refeições e ao deitar', doseMaxima: '500mg/dia' }
    }],
    contraindicacoes: ['Obstrução GI'],
    efeitosAdversos: { comuns: ['Praticamente nenhum'], graves: [] },
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    lastUpdate: '2024-12',
    tags: ['antiflatulento', 'simeticona']
  },
  {
    id: 'levotiroxina',
    nomeGenerico: 'Levotiroxina sódica',
    nomesComerciais: ['Puran T4', 'Euthyrox', 'Synthroid'],
    atcCode: 'H03AA01',
    rxNormCui: '10582',
    drugBankId: 'DB00451',
    snomedCT: '387114003',
    casNumber: '51-48-9',
    dcbCode: '05294',
    classeTerapeutica: 'hormonio_tireoide',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '75mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '125mcg', disponivelSUS: true }
    ],
    indicacoes: ['Hipotireoidismo', 'Supressão de TSH pós-tireoidectomia por câncer', 'Bócio não tóxico'],
    mecanismoAcao: 'Reposição de T4 (tiroxina). Convertido perifericamente em T3.',
    posologias: [{
      indicacao: 'Hipotireoidismo',
      adultos: { dose: '1,6 mcg/kg/dia', frequencia: '1x/dia em jejum, 30-60 min antes café', observacoes: 'Ajustar pelo TSH a cada 6-8 semanas' }
    }],
    contraindicacoes: ['Tireotoxicose não tratada', 'IAM agudo', 'Insuficiência adrenal não tratada'],
    efeitosAdversos: { comuns: ['Se dose correta: nenhum'], graves: ['Hipertireoidismo (overdose)', 'Arritmias', 'Angina'] },
    interacoes: [
      { medicamento: 'Cálcio/Ferro/Antiácidos', gravidade: 'moderada', efeito: 'Reduzem absorção', conduta: 'Separar por 4h' },
      { medicamento: 'Warfarina', gravidade: 'moderada', efeito: 'Aumenta efeito anticoagulante', conduta: 'Monitorar INR' }
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível - essencial manter' },
    doencasRelacionadas: ['hipotireoidismo'],
    lastUpdate: '2024-12',
    tags: ['tireoide', 'levotiroxina', 'T4', 'hipotireoidismo']
  },
  {
    id: 'prednisona',
    nomeGenerico: 'Prednisona',
    nomesComerciais: ['Meticorten', 'Predsim'],
    atcCode: 'H02AB07',
    rxNormCui: '8640',
    drugBankId: 'DB00635',
    snomedCT: '116602009',
    casNumber: '53-03-2',
    dcbCode: '07313',
    classeTerapeutica: 'corticoide',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true }
    ],
    indicacoes: ['Doenças autoimunes', 'Asma grave', 'DPOC exacerbado', 'Artrite reumatoide', 'Alergias graves'],
    mecanismoAcao: 'Glicocorticoide com potente efeito anti-inflamatório e imunossupressor.',
    posologias: [{
      indicacao: 'Anti-inflamatório',
      adultos: { dose: '5-60mg', frequencia: '1x/dia pela manhã', observacoes: 'Desmame gradual se uso >14 dias' }
    }],
    contraindicacoes: ['Infecção fúngica sistêmica não tratada'],
    efeitosAdversos: { comuns: ['Ganho de peso', 'Insônia', 'Hiperglicemia'], graves: ['Cushing iatrogênico', 'Osteoporose', 'Necrose avascular', 'Supressão adrenal'] },
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível em doses baixas' },
    doencasRelacionadas: ['asma', 'artrite-reumatoide'],
    lastUpdate: '2024-12',
    tags: ['corticoide', 'prednisona', 'anti-inflamatório']
  },
  {
    id: 'dexametasona',
    nomeGenerico: 'Dexametasona',
    nomesComerciais: ['Decadron', 'Dexason'],
    atcCode: 'H02AB02',
    rxNormCui: '3264',
    drugBankId: 'DB01234',
    snomedCT: '372584003',
    casNumber: '50-02-2',
    dcbCode: '02836',
    classeTerapeutica: 'corticoide',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
      { forma: 'elixir', concentracao: '0,1mg/mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '4mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Edema cerebral', 'Alergias graves', 'COVID-19 grave', 'Profilaxia náusea QT', 'Crupe'],
    mecanismoAcao: 'Glicocorticoide potente (25-30x prednisona). Longa duração.',
    posologias: [{
      indicacao: 'Anti-inflamatório potente',
      adultos: { dose: '4-20mg', frequencia: '1x/dia ou dividido' }
    }, {
      indicacao: 'COVID-19 (hipoxêmico)',
      adultos: { dose: '6mg', frequencia: '1x/dia por 10 dias' }
    }],
    contraindicacoes: ['Infecção fúngica sistêmica'],
    efeitosAdversos: { comuns: ['Hiperglicemia', 'Insônia'], graves: ['Supressão adrenal', 'Imunossupressão', 'Miopatia'] },
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    lastUpdate: '2024-12',
    tags: ['corticoide', 'dexametasona', 'COVID']
  },
  {
    id: 'insulina-nph',
    nomeGenerico: 'Insulina NPH (isófana)',
    nomesComerciais: ['Humulin N', 'Novolin N', 'Insunorm N'],
    atcCode: 'A10AC01',
    rxNormCui: '5856',
    drugBankId: 'DB00030',
    snomedCT: '325072002',
    casNumber: '11061-68-0',
    dcbCode: '04833',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '100 UI/mL', disponivelSUS: true }
    ],
    indicacoes: ['DM1', 'DM2 quando necessário', 'Diabetes gestacional', 'Hiperglicemia hospitalar'],
    mecanismoAcao: 'Insulina de ação intermediária. Início 1-2h, pico 4-12h, duração 14-24h.',
    posologias: [{
      indicacao: 'DM2 basal',
      adultos: { dose: '0,1-0,2 UI/kg/dia', frequencia: '1-2x/dia (antes café e/ou ao deitar)', observacoes: 'Titular a cada 3-7 dias conforme glicemia' }
    }],
    contraindicacoes: ['Hipoglicemia'],
    efeitosAdversos: { comuns: ['Hipoglicemia', 'Ganho de peso', 'Lipodistrofia'], graves: ['Hipoglicemia grave'] },
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['diabetes-mellitus-2'],
    lastUpdate: '2024-12',
    tags: ['insulina', 'NPH', 'diabetes']
  },
  {
    id: 'insulina-regular',
    nomeGenerico: 'Insulina Regular (cristalina)',
    nomesComerciais: ['Humulin R', 'Novolin R'],
    atcCode: 'A10AB01',
    rxNormCui: '5856',
    drugBankId: 'DB00030',
    snomedCT: '67866001',
    casNumber: '11070-73-8',
    dcbCode: '04834',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '100 UI/mL', disponivelSUS: true }
    ],
    indicacoes: ['DM1/DM2 (bolus prandial)', 'Cetoacidose diabética', 'Estado hiperosmolar', 'Controle glicêmico intensivo (UTI)'],
    mecanismoAcao: 'Insulina de ação rápida. Início 30-60min, pico 2-4h, duração 6-8h.',
    posologias: [{
      indicacao: 'Correção pré-prandial',
      adultos: { dose: 'Conforme escala móvel ou contagem de carboidratos', frequencia: '15-30 min antes das refeições' }
    }],
    contraindicacoes: ['Hipoglicemia'],
    efeitosAdversos: { comuns: ['Hipoglicemia'], graves: ['Hipoglicemia grave'] },
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['diabetes-mellitus-2'],
    lastUpdate: '2024-12',
    tags: ['insulina', 'regular', 'diabetes', 'emergência']
  },
  {
    id: 'glibenclamida',
    nomeGenerico: 'Glibenclamida',
    nomesComerciais: ['Daonil', 'Euglucon'],
    atcCode: 'A10BB01',
    rxNormCui: '4815',
    drugBankId: 'DB01016',
    snomedCT: '386966003',
    casNumber: '10238-21-8',
    dcbCode: '04397',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'sulfonilureira',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true }
    ],
    indicacoes: ['DM2 (segunda linha após metformina)'],
    mecanismoAcao: 'Sulfoniluréia. Estimula secreção de insulina pelas células beta.',
    posologias: [{
      indicacao: 'DM2',
      adultos: { dose: '2,5-20mg', frequencia: '1-2x/dia com refeições', doseMaxima: '20mg/dia' }
    }],
    contraindicacoes: ['DM1', 'Cetoacidose', 'Insuficiência hepática/renal grave', 'Idosos (risco hipoglicemia)'],
    efeitosAdversos: { comuns: ['Hipoglicemia', 'Ganho de peso'], graves: ['Hipoglicemia prolongada (idosos)'] },
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Não recomendado' },
    doencasRelacionadas: ['diabetes-mellitus-2'],
    lastUpdate: '2024-12',
    tags: ['sulfonilureia', 'diabetes', 'hipoglicemiante']
  }
];

