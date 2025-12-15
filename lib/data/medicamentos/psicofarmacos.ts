/**
 * PSICOFÁRMACOS - DARWIN-MFC
 * ===========================
 * Antidepressivos, ansiolíticos e estabilizadores do humor
 */

import { Medicamento } from '../../types/medicamento';

export const psicofarmacos: Medicamento[] = [
  {
    id: 'fluoxetina',
    nomeGenerico: 'Cloridrato de fluoxetina',
    nomesComerciais: ['Prozac', 'Daforin'],
    // Ontologias
    atcCode: 'N06AB03',
    rxNormCui: '4493',
    drugBankId: 'DB00472',
    snomedCT: '372767007',
    casNumber: '54910-89-3',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: true }
    ],
    indicacoes: ['Depressão maior', 'Transtorno de ansiedade generalizada', 'TOC', 'Bulimia nervosa', 'Transtorno de pânico'],
    mecanismoAcao: 'Inibidor seletivo da recaptação de serotonina (ISRS). Aumenta a disponibilidade de serotonina na fenda sináptica.',
    posologias: [
      {
        indicacao: 'Depressão/Ansiedade',
        adultos: { dose: '20mg/dia, podendo aumentar até 80mg', frequencia: '1x/dia', observacoes: 'Início de efeito em 2-4 semanas' }
      },
      {
        indicacao: 'TOC',
        adultos: { dose: '20-60mg/dia', frequencia: '1x/dia', doseMaxima: '80mg/dia' }
      }
    ],
    contraindicacoes: ['Uso de IMAO (intervalo de 5 semanas)', 'Uso de pimozida ou tioridazina', 'QT longo'],
    precaucoes: ['Risco de suicídio nas primeiras semanas', 'Bipolaridade (pode induzir mania)', 'Epilepsia', 'Hepatopatia'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Cefaleia', 'Insônia', 'Disfunção sexual', 'Ansiedade inicial'],
      graves: ['Síndrome serotoninérgica', 'Hiponatremia (SIADH)', 'Sangramento GI', 'Mania']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Síndrome serotoninérgica fatal', conduta: 'Contraindicado. Intervalo de 5 semanas' },
      { medicamento: 'Tramadol', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Evitar' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumento do risco de sangramento', conduta: 'Monitorar INR' }
    ],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Não necessário, mas usar com cautela' }],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível com cautela' },
    monitorizacao: ['Ideação suicida nas primeiras semanas', 'Sódio em idosos', 'Sintomas maníacos'],
    orientacoesPaciente: ['Efeito demora 2-4 semanas', 'Não parar abruptamente', 'Informar sintomas de piora'],
    doencasRelacionadas: ['depressao', 'transtorno-ansiedade', 'toc'],
    calculadoras: ['phq-9', 'gad-7'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antidepressivo', 'isrs', 'depressao', 'ansiedade']
  },
  {
    id: 'sertralina',
    nomeGenerico: 'Cloridrato de sertralina',
    nomesComerciais: ['Zoloft', 'Assert'],
    // Ontologias
    atcCode: 'N06AB06',
    rxNormCui: '36437',
    drugBankId: 'DB01104',
    snomedCT: '372594008',
    casNumber: '79617-96-2',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false }
    ],
    indicacoes: ['Depressão maior', 'Transtorno de pânico', 'TEPT', 'TOC', 'Fobia social', 'Transtorno disfórico pré-menstrual'],
    mecanismoAcao: 'ISRS. Inibe a recaptação de serotonina no SNC.',
    posologias: [
      {
        indicacao: 'Depressão/Ansiedade',
        adultos: { dose: '50mg/dia, aumentar a cada 1-2 sem', frequencia: '1x/dia', doseMaxima: '200mg/dia' }
      }
    ],
    contraindicacoes: ['IMAO', 'Pimozida', 'Uso de dissulfiram (formulação com álcool)'],
    precaucoes: ['Bipolaridade', 'Epilepsia', 'Glaucoma de ângulo fechado'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náusea', 'Insônia', 'Disfunção sexual', 'Cefaleia'],
      graves: ['Síndrome serotoninérgica', 'Hiponatremia', 'Sangramento']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Contraindicado' },
      { medicamento: 'Lítio', gravidade: 'moderada', efeito: 'Aumento de efeitos serotoninérgicos', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário' }],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Risco suicida', 'Sódio sérico em idosos'],
    orientacoesPaciente: ['Pode ser tomado com ou sem alimentos', 'Efeito em 2-4 semanas'],
    doencasRelacionadas: ['depressao', 'transtorno-panico', 'tept'],
    calculadoras: ['phq-9', 'gad-7'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antidepressivo', 'isrs', 'depressao', 'ansiedade']
  },
  {
    id: 'amitriptilina',
    nomeGenerico: 'Cloridrato de amitriptilina',
    nomesComerciais: ['Tryptanol', 'Amytril'],
    // Ontologias
    atcCode: 'N06AA09',
    rxNormCui: '704',
    drugBankId: 'DB00321',
    snomedCT: '372726002',
    casNumber: '50-48-6',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'triciclico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: true }
    ],
    indicacoes: ['Depressão', 'Profilaxia de enxaqueca', 'Dor neuropática', 'Fibromialgia', 'Insônia associada a depressão'],
    mecanismoAcao: 'Antidepressivo tricíclico. Inibe recaptação de serotonina e noradrenalina. Efeito anticolinérgico significativo.',
    posologias: [
      {
        indicacao: 'Depressão',
        adultos: { dose: '25-75mg à noite, aumentar gradualmente', frequencia: '1x/dia (noite)', doseMaxima: '150-300mg/dia' }
      },
      {
        indicacao: 'Profilaxia de enxaqueca',
        adultos: { dose: '10-75mg à noite', frequencia: '1x/dia (noite)' }
      },
      {
        indicacao: 'Dor neuropática',
        adultos: { dose: '10-25mg à noite, titular até 75-150mg', frequencia: '1x/dia (noite)' }
      }
    ],
    contraindicacoes: ['IAM recente', 'Arritmias graves', 'Glaucoma de ângulo fechado', 'Uso de IMAO', 'Retenção urinária'],
    precaucoes: ['Cardiopatia', 'Epilepsia', 'Idosos (efeitos anticolinérgicos)', 'Bipolaridade'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Boca seca', 'Constipação', 'Ganho de peso', 'Visão turva'],
      graves: ['Arritmias (prolongamento QT)', 'Retenção urinária', 'Convulsões', 'Mania']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Crise hipertensiva', conduta: 'Contraindicado' },
      { medicamento: 'Anticolinérgicos', gravidade: 'moderada', efeito: 'Toxicidade anticolinérgica', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Usar com cautela, metabolismo hepático' }],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Quantidade pequena no leite' },
    monitorizacao: ['ECG em idosos ou cardiopatas', 'Peso', 'Sintomas anticolinérgicos'],
    orientacoesPaciente: ['Tomar à noite (causa sonolência)', 'Evitar dirigir inicialmente', 'Não parar abruptamente'],
    doencasRelacionadas: ['depressao', 'enxaqueca', 'fibromialgia', 'neuropatia-diabetica'],
    calculadoras: ['phq-9'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antidepressivo', 'triciclico', 'enxaqueca', 'dor-neuropatica']
  },
  {
    id: 'diazepam',
    nomeGenerico: 'Diazepam',
    nomesComerciais: ['Valium', 'Dienpax'],
    // Ontologias
    atcCode: 'N05BA01',
    rxNormCui: '3322',
    drugBankId: 'DB00829',
    snomedCT: '387264003',
    casNumber: '439-14-5',
    classeTerapeutica: 'ansiolitico',
    subclasse: 'benzodiazepínico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '10mg/2mL', disponivelSUS: true }
    ],
    indicacoes: ['Transtorno de ansiedade', 'Estado de mal epiléptico', 'Espasmo muscular', 'Síndrome de abstinência alcoólica', 'Sedação pré-procedimento'],
    mecanismoAcao: 'Potencializa efeito do GABA no receptor GABA-A. Efeito ansiolítico, anticonvulsivante, miorrelaxante e sedativo.',
    posologias: [
      {
        indicacao: 'Ansiedade',
        adultos: { dose: '5-10mg 2-3x/dia', frequencia: '2-3x/dia', observacoes: 'Usar menor dose eficaz, menor tempo' }
      },
      {
        indicacao: 'Estado de mal epiléptico',
        adultos: { dose: '10mg IV lento', frequencia: 'Repetir se necessário', observacoes: 'Monitorar respiração' }
      }
    ],
    contraindicacoes: ['Miastenia gravis', 'Insuficiência respiratória grave', 'Apneia do sono', 'Glaucoma de ângulo fechado'],
    precaucoes: ['Idosos (quedas)', 'DPOC', 'História de dependência', 'Uso de opioides'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Fadiga', 'Ataxia', 'Amnésia'],
      graves: ['Depressão respiratória', 'Dependência', 'Reações paradoxais']
    },
    interacoes: [
      { medicamento: 'Opioides', gravidade: 'grave', efeito: 'Depressão respiratória fatal', conduta: 'Evitar associação' },
      { medicamento: 'Álcool', gravidade: 'grave', efeito: 'Depressão do SNC', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Reduzir dose' }],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar durante amamentação' },
    monitorizacao: ['Sinais de dependência', 'Função respiratória', 'Quedas em idosos'],
    orientacoesPaciente: ['Não dirigir', 'Não usar álcool', 'Risco de dependência - uso curto', 'Não parar abruptamente'],
    doencasRelacionadas: ['transtorno-ansiedade', 'epilepsia', 'abstinencia-alcoolica'],
    calculadoras: ['gad-7'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['benzodiazepínico', 'ansiolitico', 'anticonvulsivante']
  },
  {
    id: 'clonazepam',
    nomeGenerico: 'Clonazepam',
    nomesComerciais: ['Rivotril'],
    // Ontologias
    atcCode: 'N03AE01',
    rxNormCui: '2598',
    drugBankId: 'DB01068',
    snomedCT: '387383007',
    casNumber: '1622-61-3',
    classeTerapeutica: 'ansiolitico',
    subclasse: 'benzodiazepínico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '2,5mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Transtorno de pânico', 'Epilepsia (mioclônicas, ausências)', 'Ansiedade grave', 'Síndrome das pernas inquietas', 'Transtorno bipolar (adjuvante)'],
    mecanismoAcao: 'Benzodiazepínico de alta potência e longa ação. Potencializa GABA-A.',
    posologias: [
      {
        indicacao: 'Transtorno de pânico',
        adultos: { dose: '0,25mg 2x/dia, aumentar gradualmente', frequencia: '2x/dia', doseMaxima: '4mg/dia' }
      },
      {
        indicacao: 'Epilepsia',
        adultos: { dose: '1-2mg 2-3x/dia', frequencia: '2-3x/dia', doseMaxima: '20mg/dia' }
      }
    ],
    contraindicacoes: ['Miastenia gravis grave', 'Insuficiência respiratória grave', 'Dependência de substâncias'],
    precaucoes: ['Alto potencial de dependência', 'Idosos', 'DPOC', 'Hepatopatia'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Tontura', 'Ataxia', 'Alteração de coordenação'],
      graves: ['Depressão respiratória', 'Dependência grave', 'Síndrome de abstinência']
    },
    interacoes: [
      { medicamento: 'Opioides', gravidade: 'grave', efeito: 'Depressão respiratória', conduta: 'Evitar' },
      { medicamento: 'Valproato', gravidade: 'moderada', efeito: 'Crises de ausência', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Usar com cautela' }],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar durante amamentação' },
    monitorizacao: ['Sinais de dependência', 'Eficácia anticonvulsivante'],
    orientacoesPaciente: ['Alto risco de dependência', 'Não parar abruptamente (convulsões)', 'Não dirigir'],
    doencasRelacionadas: ['transtorno-panico', 'epilepsia'],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['benzodiazepínico', 'ansiolitico', 'anticonvulsivante', 'panico']
  },
  {
    id: 'haloperidol',
    nomeGenerico: 'Haloperidol',
    nomesComerciais: ['Haldol'],
    // Ontologias
    atcCode: 'N05AD01',
    rxNormCui: '5093',
    drugBankId: 'DB00502',
    snomedCT: '386837002',
    casNumber: '52-86-8',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'tipico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '2mg/mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '5mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Esquizofrenia', 'Surto psicótico', 'Agitação psicomotora', 'Delirium', 'Náusea/vômito refratários', 'Síndrome de Tourette'],
    mecanismoAcao: 'Antipsicótico típico. Antagonista dopaminérgico D2 potente.',
    posologias: [
      {
        indicacao: 'Psicose',
        adultos: { dose: '0,5-5mg 2-3x/dia', frequencia: '2-3x/dia', doseMaxima: '20mg/dia' }
      },
      {
        indicacao: 'Agitação/Delirium',
        adultos: { dose: '2,5-5mg IM/IV', frequencia: 'A cada 30min se necessário', observacoes: 'ECG antes se IV' }
      }
    ],
    contraindicacoes: ['Doença de Parkinson', 'Demência com corpos de Lewy', 'QT longo', 'Coma'],
    precaucoes: ['Idosos com demência (aumento de mortalidade)', 'Epilepsia', 'Cardiopatia'],
    efeitosAdversos: {
      comuns: ['Efeitos extrapiramidais (distonia, acatisia, parkinsonismo)', 'Sedação', 'Hipotensão'],
      graves: ['Síndrome neuroléptica maligna', 'Prolongamento QT', 'Discinesia tardia']
    },
    interacoes: [
      { medicamento: 'Medicamentos que prolongam QT', gravidade: 'grave', efeito: 'Torsade de pointes', conduta: 'Evitar, ECG' },
      { medicamento: 'Levodopa', gravidade: 'grave', efeito: 'Antagonismo', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Usar com cautela em DRC' }],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar durante amamentação' },
    monitorizacao: ['ECG (QTc)', 'Sintomas extrapiramidais', 'Discinesia tardia'],
    orientacoesPaciente: ['Levantar devagar (hipotensão)', 'Informar rigidez ou tremores'],
    doencasRelacionadas: ['esquizofrenia', 'delirium'],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antipsicotico', 'tipico', 'psicose', 'delirium']
  },
  {
    id: 'risperidona',
    nomeGenerico: 'Risperidona',
    nomesComerciais: ['Risperdal'],
    // Ontologias
    atcCode: 'N05AX08',
    rxNormCui: '35636',
    drugBankId: 'DB00734',
    snomedCT: '386840000',
    casNumber: '106266-06-2',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'atipico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '1mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Esquizofrenia', 'Transtorno bipolar (mania)', 'Irritabilidade em autismo', 'Transtornos de comportamento em demência'],
    mecanismoAcao: 'Antipsicótico atípico. Antagonista D2 e 5-HT2A. Melhor perfil de efeitos extrapiramidais.',
    posologias: [
      {
        indicacao: 'Esquizofrenia',
        adultos: { dose: '2mg/dia, aumentar a cada 24h', frequencia: '1-2x/dia', doseMaxima: '16mg/dia' }
      },
      {
        indicacao: 'Idosos',
        adultos: { dose: '0,25-0,5mg 2x/dia', frequencia: '2x/dia', observacoes: 'Titular lentamente' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Demência com corpos de Lewy'],
    precaucoes: ['Idosos com demência', 'Diabetes (risco metabólico)', 'Epilepsia', 'QT longo'],
    efeitosAdversos: {
      comuns: ['Ganho de peso', 'Hiperprolactinemia', 'Sedação', 'Parkinsonismo (dose-dependente)'],
      graves: ['Síndrome neuroléptica maligna', 'Prolongamento QT', 'AVC em idosos com demência']
    },
    interacoes: [
      { medicamento: 'Carbamazepina', gravidade: 'moderada', efeito: 'Reduz níveis de risperidona', conduta: 'Ajustar dose' }
    ],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Iniciar 0,5mg 2x/dia, titular lentamente' }],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar durante amamentação' },
    monitorizacao: ['Peso, glicemia, lipídeos', 'Prolactina se sintomas', 'Sintomas extrapiramidais'],
    orientacoesPaciente: ['Monitorar peso', 'Levantar devagar'],
    doencasRelacionadas: ['esquizofrenia', 'transtorno-bipolar'],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antipsicotico', 'atipico', 'esquizofrenia', 'bipolar']
  },
  {
    id: 'carbonato-litio',
    nomeGenerico: 'Carbonato de lítio',
    nomesComerciais: ['Carbolitium', 'Litiocar'],
    // Ontologias
    atcCode: 'N05AN01',
    rxNormCui: '6448',
    drugBankId: 'DB01356',
    snomedCT: '387480006',
    casNumber: '554-13-2',
    classeTerapeutica: 'estabilizador_humor',
    subclasse: 'sal_litio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '450mg CR', disponivelSUS: false }
    ],
    indicacoes: ['Transtorno bipolar (mania e profilaxia)', 'Depressão bipolar (adjuvante)', 'Depressão unipolar refratária'],
    mecanismoAcao: 'Estabilizador do humor. Modula neurotransmissão, cascatas intracelulares e expressão gênica. Mecanismo exato incerto.',
    posologias: [
      {
        indicacao: 'Transtorno bipolar',
        adultos: { dose: '300-600mg 2-3x/dia, titular por litemia', frequencia: '2-3x/dia', observacoes: 'Litemia alvo: 0,6-1,0 mEq/L (manutenção)' }
      }
    ],
    contraindicacoes: ['DRC grave', 'Desidratação', 'Síndrome de Brugada', 'Uso de diuréticos sem monitorização'],
    precaucoes: ['Hipotireoidismo', 'DRC', 'Cardiopatia', 'Desidratação', 'Uso de IECA/AINEs'],
    efeitosAdversos: {
      comuns: ['Tremor', 'Poliúria', 'Polidipsia', 'Ganho de peso', 'Náusea'],
      graves: ['Intoxicação por lítio (confusão, ataxia, convulsões)', 'Hipotireoidismo', 'Diabetes insípidus nefrogênico', 'Arritmias']
    },
    interacoes: [
      { medicamento: 'IECA/BRA', gravidade: 'grave', efeito: 'Aumento da litemia', conduta: 'Monitorar litemia' },
      { medicamento: 'AINEs', gravidade: 'grave', efeito: 'Aumento da litemia', conduta: 'Evitar ou monitorar' },
      { medicamento: 'Diuréticos tiazídicos', gravidade: 'grave', efeito: 'Aumento da litemia', conduta: 'Monitorar rigorosamente' }
    ],
    ajusteDoseRenal: [
      { tfg: '50-90', ajuste: 'Reduzir 25-50%' },
      { tfg: '<50', ajuste: 'Evitar ou usar com monitorização rigorosa' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar durante amamentação' },
    monitorizacao: ['Litemia (semanal início, depois mensal, depois trimestral)', 'TSH, T4L a cada 6 meses', 'Creatinina, ureia', 'ECG basal'],
    orientacoesPaciente: ['Manter hidratação adequada', 'Evitar mudanças bruscas de sódio', 'Informar sinais de toxicidade (tremor intenso, vômitos, confusão)'],
    doencasRelacionadas: ['transtorno-bipolar'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['estabilizador-humor', 'litio', 'bipolar']
  },
  {
    id: 'valproato',
    nomeGenerico: 'Valproato de sódio / Ácido valproico',
    nomesComerciais: ['Depakene', 'Depakote'],
    // Ontologias
    atcCode: 'N03AG01',
    rxNormCui: '10961',
    drugBankId: 'DB00313',
    snomedCT: '387080000',
    casNumber: '99-66-1',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'derivado_valproico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '250mg/5mL', disponivelSUS: true }
    ],
    indicacoes: ['Epilepsia (crises generalizadas e focais)', 'Transtorno bipolar (mania)', 'Profilaxia de enxaqueca'],
    mecanismoAcao: 'Aumenta níveis de GABA, bloqueia canais de sódio e cálcio. Estabiliza membranas neuronais.',
    posologias: [
      {
        indicacao: 'Epilepsia',
        adultos: { dose: '500-2000mg/dia dividido em 2-3 doses', frequencia: '2-3x/dia', observacoes: 'Nível sérico: 50-100 mcg/mL' }
      },
      {
        indicacao: 'Transtorno bipolar',
        adultos: { dose: '750-2000mg/dia', frequencia: '2-3x/dia' }
      }
    ],
    contraindicacoes: ['Hepatopatia grave', 'Porfiria', 'Distúrbios do ciclo da ureia', 'Mulheres em idade fértil sem contracepção eficaz'],
    precaucoes: ['Mulheres (teratogênico)', 'Hepatopatia', 'Pancreatite prévia'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Ganho de peso', 'Tremor', 'Alopecia', 'Sedação'],
      graves: ['Hepatotoxicidade', 'Pancreatite', 'Teratogenicidade (defeitos do tubo neural)', 'Trombocitopenia']
    },
    interacoes: [
      { medicamento: 'Lamotrigina', gravidade: 'grave', efeito: 'Aumenta níveis de lamotrigina', conduta: 'Reduzir dose de lamotrigina em 50%' },
      { medicamento: 'Carbapenêmicos', gravidade: 'grave', efeito: 'Reduz níveis de valproato', conduta: 'Evitar associação' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Pode ser necessário reduzir' }],
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Níveis baixos no leite' },
    monitorizacao: ['Função hepática', 'Hemograma', 'Nível sérico', 'Peso'],
    orientacoesPaciente: ['Contracepção eficaz obrigatória em mulheres', 'Não parar abruptamente'],
    doencasRelacionadas: ['epilepsia', 'transtorno-bipolar', 'enxaqueca'],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['anticonvulsivante', 'estabilizador-humor', 'epilepsia', 'bipolar']
  }
];

