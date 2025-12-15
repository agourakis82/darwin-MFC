/**
 * PSICOFÁRMACOS - DARWIN-MFC
 * ===========================
 * Medicamentos RENAME 2024
 */

import { Medicamento } from '../../types/medicamento';

export const psicotropicos: Partial<Medicamento>[] = [
  {
    id: 'fluoxetina',
    nomeGenerico: 'Cloridrato de fluoxetina',
    nomesComerciais: ['Prozac', 'Daforin', 'Fluxene'],
    atcCode: 'N06AB03',
    rxNormCui: '4493',
    drugBankId: 'DB00472',
    snomedCT: '372767007',
    casNumber: '54910-89-3',
    dcbCode: '04158',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: true }
    ],
    indicacoes: ['Transtorno depressivo maior', 'TAG', 'TOC', 'Bulimia nervosa', 'TEPT'],
    mecanismoAcao: 'Inibidor seletivo da recaptação de serotonina (ISRS).',
    posologias: [{
      indicacao: 'Depressão',
      adultos: { dose: '20mg', frequencia: '1x/dia pela manhã', doseMaxima: '80mg/dia', observacoes: 'Efeito em 2-4 semanas' }
    }],
    contraindicacoes: ['Uso de IMAO nos últimos 14 dias', 'Linezolida', 'Pimozida'],
    efeitosAdversos: { comuns: ['Insônia', 'Náusea', 'Disfunção sexual', 'Cefaleia', 'Ansiedade inicial'], graves: ['Síndrome serotoninérgica', 'Ideação suicida (início)', 'Hiponatremia (idosos)'] },
    interacoes: [{ medicamento: 'IMAO', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Intervalo de 5 semanas' }],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Preferido na gestação/amamentação entre ISRS' },
    doencasRelacionadas: ['depressao', 'transtorno-ansiedade'],
    lastUpdate: '2024-12',
    tags: ['antidepressivo', 'ISRS', 'fluoxetina']
  },
  {
    id: 'sertralina',
    nomeGenerico: 'Cloridrato de sertralina',
    nomesComerciais: ['Zoloft', 'Assert', 'Serenata'],
    atcCode: 'N06AB06',
    rxNormCui: '36437',
    drugBankId: 'DB01104',
    snomedCT: '372594008',
    casNumber: '79617-96-2',
    dcbCode: '08178',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false }
    ],
    indicacoes: ['Depressão', 'Transtorno do pânico', 'TOC', 'Fobia social', 'TEPT', 'TDPM'],
    mecanismoAcao: 'ISRS com leve inibição de recaptação de dopamina.',
    posologias: [{
      indicacao: 'Depressão/Ansiedade',
      adultos: { dose: '50mg', frequencia: '1x/dia', doseMaxima: '200mg/dia' }
    }],
    contraindicacoes: ['Uso de IMAO', 'Uso de pimozida/dissulfiram (formulação com álcool)'],
    efeitosAdversos: { comuns: ['Diarreia', 'Náusea', 'Disfunção sexual', 'Cefaleia'], graves: ['Síndrome serotoninérgica', 'Sangramento GI (com AINEs)'] },
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['depressao', 'transtorno-panico'],
    lastUpdate: '2024-12',
    tags: ['antidepressivo', 'ISRS', 'sertralina']
  },
  {
    id: 'escitalopram',
    nomeGenerico: 'Oxalato de escitalopram',
    nomesComerciais: ['Lexapro', 'Exodus'],
    atcCode: 'N06AB10',
    rxNormCui: '321988',
    drugBankId: 'DB01175',
    snomedCT: '400447003',
    casNumber: '128196-01-0',
    dcbCode: '03737',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false }
    ],
    indicacoes: ['Depressão', 'TAG', 'Transtorno do pânico', 'Fobia social'],
    mecanismoAcao: 'S-enantiômero do citalopram. ISRS mais seletivo.',
    posologias: [{
      indicacao: 'Depressão/TAG',
      adultos: { dose: '10mg', frequencia: '1x/dia', doseMaxima: '20mg/dia' }
    }],
    contraindicacoes: ['QT longo', 'Uso de IMAO', 'Uso de pimozida'],
    efeitosAdversos: { comuns: ['Náusea', 'Insônia', 'Disfunção sexual'], graves: ['QT longo (dose-dependente)', 'Síndrome serotoninérgica'] },
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['depressao', 'transtorno-ansiedade'],
    lastUpdate: '2024-12',
    tags: ['antidepressivo', 'ISRS', 'escitalopram']
  },
  {
    id: 'amitriptilina',
    nomeGenerico: 'Cloridrato de amitriptilina',
    nomesComerciais: ['Tryptanol', 'Amytril'],
    atcCode: 'N06AA09',
    rxNormCui: '704',
    drugBankId: 'DB00321',
    snomedCT: '372726002',
    casNumber: '50-48-6',
    dcbCode: '00453',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'triciclico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: true }
    ],
    indicacoes: ['Depressão', 'Dor neuropática', 'Profilaxia de enxaqueca', 'Fibromialgia', 'Insônia'],
    mecanismoAcao: 'Inibe recaptação de serotonina e noradrenalina. Efeitos anticolinérgicos e anti-histamínicos.',
    posologias: [{
      indicacao: 'Depressão',
      adultos: { dose: '25-75mg', frequencia: '1x/noite', doseMaxima: '300mg/dia' }
    }, {
      indicacao: 'Dor neuropática/Enxaqueca',
      adultos: { dose: '10-25mg', frequencia: '1x/noite', doseMaxima: '75mg/dia' }
    }],
    contraindicacoes: ['IAM recente', 'Arritmias', 'Glaucoma de ângulo fechado', 'Uso de IMAO', 'Retenção urinária'],
    efeitosAdversos: { comuns: ['Boca seca', 'Constipação', 'Sedação', 'Ganho de peso'], graves: ['Arritmia', 'Hipotensão ortostática', 'Convulsões (overdose)'] },
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['depressao', 'enxaqueca', 'neuropatia-periferica', 'fibromialgia'],
    lastUpdate: '2024-12',
    tags: ['antidepressivo', 'tricíclico', 'dor-neuropática', 'enxaqueca']
  },
  {
    id: 'clonazepam',
    nomeGenerico: 'Clonazepam',
    nomesComerciais: ['Rivotril', 'Clonotril'],
    atcCode: 'N03AE01',
    rxNormCui: '2598',
    drugBankId: 'DB01068',
    snomedCT: '387383007',
    casNumber: '1622-61-3',
    dcbCode: '02390',
    classeTerapeutica: 'ansiolitico',
    subclasse: 'benzodiazepínico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '2,5mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Epilepsia', 'Transtorno do pânico', 'Ansiedade (curto prazo)', 'Síndrome das pernas inquietas'],
    mecanismoAcao: 'Potencializa efeito do GABA no receptor GABA-A.',
    posologias: [{
      indicacao: 'Transtorno do pânico',
      adultos: { dose: '0,5-2mg', frequencia: 'A cada 12h', doseMaxima: '4mg/dia' }
    }, {
      indicacao: 'Epilepsia',
      adultos: { dose: '1,5-20mg/dia', frequencia: 'Dividido em 3 doses' }
    }],
    contraindicacoes: ['Miastenia gravis', 'Insuficiência respiratória grave', 'Glaucoma de ângulo fechado'],
    efeitosAdversos: { comuns: ['Sonolência', 'Tontura', 'Ataxia', 'Alteração de memória'], graves: ['Depressão respiratória', 'Dependência', 'Amnésia anterógrada'] },
    interacoes: [{ medicamento: 'Opioides', gravidade: 'grave', efeito: 'Depressão respiratória', conduta: 'Evitar associação' }],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Não recomendado' },
    doencasRelacionadas: ['epilepsia', 'transtorno-panico'],
    lastUpdate: '2024-12',
    tags: ['benzodiazepínico', 'ansiolítico', 'antiepiléptico']
  },
  {
    id: 'diazepam',
    nomeGenerico: 'Diazepam',
    nomesComerciais: ['Valium', 'Dienpax'],
    atcCode: 'N05BA01',
    rxNormCui: '3322',
    drugBankId: 'DB00829',
    snomedCT: '372879007',
    casNumber: '439-14-5',
    dcbCode: '02867',
    classeTerapeutica: 'ansiolitico',
    subclasse: 'benzodiazepínico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '5mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Ansiedade (curto prazo)', 'Espasmo muscular', 'Convulsões (estado de mal)', 'Abstinência alcoólica', 'Sedação pré-procedimento'],
    mecanismoAcao: 'Benzodiazepínico de ação longa. Potencializa GABA-A.',
    posologias: [{
      indicacao: 'Ansiedade',
      adultos: { dose: '5-10mg', frequencia: 'A cada 8-12h', doseMaxima: '40mg/dia' }
    }, {
      indicacao: 'Estado de mal epiléptico',
      adultos: { dose: '10mg IV', frequencia: 'Pode repetir em 5-10 min', doseMaxima: '30mg' }
    }],
    contraindicacoes: ['Miastenia gravis', 'Insuficiência respiratória grave', 'Apneia do sono'],
    efeitosAdversos: { comuns: ['Sedação', 'Ataxia', 'Amnésia'], graves: ['Depressão respiratória', 'Dependência', 'Reação paradoxal'] },
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Não recomendado' },
    doencasRelacionadas: ['transtorno-ansiedade', 'epilepsia'],
    lastUpdate: '2024-12',
    tags: ['benzodiazepínico', 'ansiolítico', 'estado-mal']
  },
  {
    id: 'haloperidol',
    nomeGenerico: 'Haloperidol',
    nomesComerciais: ['Haldol'],
    atcCode: 'N05AD01',
    rxNormCui: '5093',
    drugBankId: 'DB00502',
    snomedCT: '386837002',
    casNumber: '52-86-8',
    dcbCode: '04555',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_tipico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '2mg/mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '5mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Esquizofrenia', 'Psicose aguda', 'Agitação psicomotora', 'Delirium', 'Náusea/vômito refratário'],
    mecanismoAcao: 'Antagonista dopaminérgico D2 potente.',
    posologias: [{
      indicacao: 'Psicose aguda',
      adultos: { dose: '2-10mg', frequencia: 'A cada 4-8h', doseMaxima: '30mg/dia' }
    }, {
      indicacao: 'Delirium',
      adultos: { dose: '0,5-1mg', frequencia: 'A cada 8-12h VO ou 2-5mg IM/IV' }
    }],
    contraindicacoes: ['QT longo', 'Parkinson', 'Depressão grave do SNC', 'Demência com corpo de Lewy'],
    efeitosAdversos: { comuns: ['Extrapiramidalismo', 'Acatisia', 'Sedação'], graves: ['Síndrome neuroléptica maligna', 'Torsades de pointes', 'Discinesia tardia'] },
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Não recomendado' },
    doencasRelacionadas: ['esquizofrenia'],
    lastUpdate: '2024-12',
    tags: ['antipsicótico', 'típico', 'haloperidol']
  },
  {
    id: 'risperidona',
    nomeGenerico: 'Risperidona',
    nomesComerciais: ['Risperdal', 'Respidon'],
    atcCode: 'N05AX08',
    rxNormCui: '35636',
    drugBankId: 'DB00734',
    snomedCT: '386840002',
    casNumber: '106266-06-2',
    dcbCode: '08093',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_atipico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '3mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '1mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Esquizofrenia', 'Transtorno bipolar', 'Irritabilidade no autismo', 'Agressividade em demência (off-label, cuidado)'],
    mecanismoAcao: 'Antagonista dopaminérgico D2 e serotoninérgico 5-HT2A.',
    posologias: [{
      indicacao: 'Esquizofrenia',
      adultos: { dose: '2-8mg', frequencia: '1x/dia', doseMaxima: '16mg/dia' }
    }, {
      indicacao: 'Irritabilidade autismo',
      adultos: { dose: 'N/A', frequencia: 'N/A' },
      pediatrico: { dose: '0,25-0,5mg', frequencia: '1x/dia, titular' }
    }],
    contraindicacoes: ['Hipersensibilidade', 'Demência com corpo de Lewy'],
    efeitosAdversos: { comuns: ['Ganho de peso', 'Sedação', 'Hiperprolactinemia'], graves: ['Síndrome metabólica', 'Síndrome neuroléptica maligna', 'AVC em idosos'] },
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Não recomendado' },
    doencasRelacionadas: ['esquizofrenia', 'transtorno-bipolar'],
    lastUpdate: '2024-12',
    tags: ['antipsicótico', 'atípico', 'risperidona']
  },
  {
    id: 'quetiapina',
    nomeGenerico: 'Fumarato de quetiapina',
    nomesComerciais: ['Seroquel', 'Queropax'],
    atcCode: 'N05AH04',
    rxNormCui: '51272',
    drugBankId: 'DB01224',
    snomedCT: '386850001',
    casNumber: '111974-69-7',
    dcbCode: '07619',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_atipico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true }
    ],
    indicacoes: ['Esquizofrenia', 'Transtorno bipolar', 'Depressão bipolar', 'Adjuvante em TDM refratário', 'Insônia (off-label)'],
    mecanismoAcao: 'Antagonista D2, 5-HT2A, H1, alfa-1. Perfil multirrreceptor.',
    posologias: [{
      indicacao: 'Esquizofrenia/Bipolar',
      adultos: { dose: '150-800mg', frequencia: '1x/dia ou dividido', doseMaxima: '800mg/dia' }
    }, {
      indicacao: 'Depressão bipolar',
      adultos: { dose: '300mg', frequencia: '1x/noite' }
    }],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: { comuns: ['Sedação intensa', 'Ganho de peso', 'Hipotensão ortostática', 'Boca seca'], graves: ['Síndrome metabólica', 'Diabetes', 'Cataratas'] },
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Não recomendado' },
    doencasRelacionadas: ['esquizofrenia', 'transtorno-bipolar', 'depressao'],
    lastUpdate: '2024-12',
    tags: ['antipsicótico', 'atípico', 'quetiapina']
  },
  {
    id: 'carbamazepina',
    nomeGenerico: 'Carbamazepina',
    nomesComerciais: ['Tegretol', 'Tegretard'],
    atcCode: 'N03AF01',
    rxNormCui: '2002',
    drugBankId: 'DB00564',
    snomedCT: '387222003',
    casNumber: '298-46-4',
    dcbCode: '02100',
    classeTerapeutica: 'antiepileptico',
    subclasse: 'bloqueador_canais_sodio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '20mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Epilepsia focal', 'Neuralgia do trigêmeo', 'Transtorno bipolar', 'Dor neuropática'],
    mecanismoAcao: 'Bloqueia canais de sódio voltagem-dependentes.',
    posologias: [{
      indicacao: 'Epilepsia',
      adultos: { dose: '200-1600mg', frequencia: 'Dividido em 2-3 doses', observacoes: 'Iniciar baixo, titular' }
    }, {
      indicacao: 'Neuralgia do trigêmeo',
      adultos: { dose: '200-1200mg', frequencia: 'Dividido em 2-3 doses' }
    }],
    contraindicacoes: ['Bloqueio AV', 'Porfiria', 'Uso de IMAO', 'HLA-B*1502+ (asiáticos - risco Stevens-Johnson)'],
    efeitosAdversos: { comuns: ['Tontura', 'Ataxia', 'Sonolência', 'Náusea'], graves: ['Stevens-Johnson/NET', 'Agranulocitose', 'Hepatotoxicidade', 'Hiponatremia'] },
    interacoes: [{ medicamento: 'ACO', gravidade: 'grave', efeito: 'Reduz eficácia contraceptiva', conduta: 'Usar método adicional ou DIU' }],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['epilepsia', 'transtorno-bipolar'],
    lastUpdate: '2024-12',
    tags: ['antiepiléptico', 'estabilizador-humor', 'neuralgia']
  },
  {
    id: 'valproato',
    nomeGenerico: 'Ácido valproico / Valproato de sódio',
    nomesComerciais: ['Depakene', 'Depakote', 'Valpakine'],
    atcCode: 'N03AG01',
    rxNormCui: '11118',
    drugBankId: 'DB00313',
    snomedCT: '387080000',
    casNumber: '99-66-1',
    dcbCode: '09527',
    classeTerapeutica: 'antiepileptico',
    subclasse: 'multiplo',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '250mg/5mL', disponivelSUS: true }
    ],
    indicacoes: ['Epilepsia (focal e generalizada)', 'Transtorno bipolar', 'Profilaxia de enxaqueca'],
    mecanismoAcao: 'Aumenta GABA, bloqueia canais de sódio e cálcio.',
    posologias: [{
      indicacao: 'Epilepsia',
      adultos: { dose: '500-2000mg', frequencia: 'Dividido em 2-3 doses', observacoes: 'Nível sérico 50-100 mcg/mL' }
    }, {
      indicacao: 'Bipolar',
      adultos: { dose: '750-2000mg', frequencia: 'Dividido em 2 doses' }
    }],
    contraindicacoes: ['Hepatopatia', 'Distúrbios do ciclo da ureia', 'Gestação (alto risco teratogênico)', 'Porfiria'],
    efeitosAdversos: { comuns: ['Náusea', 'Tremor', 'Ganho de peso', 'Alopecia'], graves: ['Hepatotoxicidade', 'Pancreatite', 'Teratogenicidade', 'Trombocitopenia'] },
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Monitorar lactente' },
    doencasRelacionadas: ['epilepsia', 'transtorno-bipolar', 'enxaqueca'],
    lastUpdate: '2024-12',
    tags: ['antiepiléptico', 'estabilizador-humor']
  },
  {
    id: 'carbonato-litio',
    nomeGenerico: 'Carbonato de lítio',
    nomesComerciais: ['Carbolitium', 'Lithium'],
    atcCode: 'N05AN01',
    rxNormCui: '6448',
    drugBankId: 'DB01356',
    snomedCT: '387137009',
    casNumber: '554-13-2',
    dcbCode: '02121',
    classeTerapeutica: 'estabilizador_humor',
    subclasse: 'litio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true }
    ],
    indicacoes: ['Transtorno bipolar (mania, profilaxia)', 'Depressão bipolar', 'Potencialização antidepressiva'],
    mecanismoAcao: 'Modula neurotransmissão e segundos mensageiros (inositol, GSK-3).',
    posologias: [{
      indicacao: 'Transtorno bipolar',
      adultos: { dose: '600-1800mg', frequencia: 'Dividido em 2-3 doses', observacoes: 'Litemia 0,6-1,0 mEq/L (manutenção)' }
    }],
    contraindicacoes: ['DRC grave', 'Desidratação', 'Hiponatremia', 'Uso de diuréticos tiazídicos sem ajuste'],
    efeitosAdversos: { comuns: ['Tremor fino', 'Poliúria', 'Ganho de peso', 'Hipotireoidismo'], graves: ['Intoxicação por lítio (>1,5 mEq/L)', 'Nefrotoxicidade', 'Síndrome serotoninérgica'] },
    interacoes: [{ medicamento: 'IECA/BRA/AINEs/Tiazídicos', gravidade: 'grave', efeito: 'Aumento da litemia', conduta: 'Monitorar níveis rigorosamente' }],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Não recomendado' },
    doencasRelacionadas: ['transtorno-bipolar'],
    lastUpdate: '2024-12',
    tags: ['estabilizador-humor', 'lítio', 'bipolar']
  }
];

