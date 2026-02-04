/**
 * ANALGÉSICOS E AINEs - DARWIN-MFC
 * =================================
 * Analgésicos e anti-inflamatórios da RENAME
 */

import { Medicamento } from '../../types/medicamento';

export const analgesicosAines: Medicamento[] = [
  {
    id: 'paracetamol',
    nomeGenerico: 'Paracetamol',
    nomesComerciais: ['Tylenol', 'Dorflex'],
    // Ontologias
    atcCode: 'N02BE01',
    rxNormCui: '161',
    drugBankId: 'DB00316',
    snomedCT: '387517004',
    casNumber: '103-90-2',
    classeTerapeutica: 'analgesico',
    subclasse: 'nao_opioide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '750mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '200mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Dor leve a moderada', 'Febre', 'Cefaleia', 'Dor musculoesquelética', 'Osteoartrite'],
    mecanismoAcao: 'Analgésico e antipirético. Inibe a síntese de prostaglandinas no SNC. Sem efeito anti-inflamatório significativo.',
    posologias: [
      {
        indicacao: 'Dor/Febre',
        adultos: { dose: '500-1000mg 4-6h', frequencia: 'A cada 4-6h', doseMaxima: '4g/dia (3g em hepatopatas)' },
        pediatrico: { dose: '10-15mg/kg/dose', frequencia: 'A cada 4-6h', doseMaxima: '75mg/kg/dia' }
      }
    ],
    contraindicacoes: ['Hepatopatia grave', 'Hipersensibilidade'],
    precaucoes: ['Alcoolismo crônico', 'Desnutrição', 'Uso crônico'],
    efeitosAdversos: {
      comuns: ['Raros em doses terapêuticas'],
      graves: ['Hepatotoxicidade (superdosagem)', 'Reações cutâneas graves (raras)']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Pode aumentar INR em uso crônico', conduta: 'Monitorar INR' },
      { medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Aumento do risco de hepatotoxicidade', conduta: 'Limitar álcool' }
    ],
    ajusteDoseRenal: [{ tfg: 'Qualquer', ajuste: 'Não necessário ajuste' }],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Função hepática em uso crônico'],
    orientacoesPaciente: ['Não exceder 4g/dia', 'Evitar álcool', 'Ler rótulos de outros medicamentos (associações)'],
    doencasRelacionadas: ['cefaleia-tensional', 'osteoartrite', 'lombalgia'],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['analgesico', 'antipiretico', 'dor', 'febre']
  },
  {
    id: 'dipirona',
    nomeGenerico: 'Dipirona sódica',
    nomesComerciais: ['Novalgina', 'Anador'],
    // Ontologias
    atcCode: 'N02BB02',
    rxNormCui: '21212',
    drugBankId: 'DB04817',
    snomedCT: '387264003',
    casNumber: '68-89-3',
    classeTerapeutica: 'analgesico',
    subclasse: 'nao_opioide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '500mg/mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '500mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Dor aguda moderada a intensa', 'Febre alta', 'Cólica renal', 'Dor pós-operatória'],
    mecanismoAcao: 'Analgésico e antipirético potente. Inibe ciclooxigenase e pode modular canais de dor.',
    posologias: [
      {
        indicacao: 'Dor/Febre',
        adultos: { dose: '500-1000mg 4-6h', frequencia: 'A cada 4-6h', doseMaxima: '4g/dia' },
        pediatrico: { dose: '10-25mg/kg/dose', frequencia: 'A cada 6h' }
      }
    ],
    contraindicacoes: ['Discrasias sanguíneas', 'Porfiria', 'Deficiência de G6PD', 'Gestação 1º e 3º trimestre'],
    precaucoes: ['Asma (pode precipitar broncoespasmo)', 'Uso prolongado'],
    efeitosAdversos: {
      comuns: ['Hipotensão (IV rápido)', 'Reações cutâneas leves'],
      graves: ['Agranulocitose', 'Anemia aplástica', 'Anafilaxia', 'Síndrome de Stevens-Johnson']
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Aumento da toxicidade', conduta: 'Evitar' },
      { medicamento: 'Ciclosporina', gravidade: 'moderada', efeito: 'Redução dos níveis', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Evitar uso prolongado' }],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar ou suspender amamentação por 48h' },
    monitorizacao: ['Hemograma se uso prolongado'],
    orientacoesPaciente: ['Procurar médico se febre, mal-estar, lesões orais (risco de agranulocitose)'],
    doencasRelacionadas: ['colica-renal', 'cefaleia'],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['analgesico', 'antipiretico', 'dor', 'febre']
  },
  {
    id: 'ibuprofeno',
    nomeGenerico: 'Ibuprofeno',
    nomesComerciais: ['Advil', 'Alivium'],
    // Ontologias
    atcCode: 'M01AE01',
    rxNormCui: '5640',
    drugBankId: 'DB01050',
    snomedCT: '387207008',
    casNumber: '15687-27-1',
    classeTerapeutica: 'anti_inflamatorio',
    subclasse: 'nao_seletivo',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '600mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '50mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Dor leve a moderada', 'Febre', 'Dismenorreia', 'Artrite', 'Enxaqueca', 'Dor musculoesquelética'],
    mecanismoAcao: 'AINE não seletivo. Inibe COX-1 e COX-2, reduzindo síntese de prostaglandinas.',
    posologias: [
      {
        indicacao: 'Dor/Inflamação',
        adultos: { dose: '400-600mg 6-8h', frequencia: 'A cada 6-8h', doseMaxima: '2400mg/dia' },
        pediatrico: { dose: '5-10mg/kg/dose', frequencia: 'A cada 6-8h', doseMaxima: '40mg/kg/dia' }
      }
    ],
    contraindicacoes: ['Úlcera péptica ativa', 'Hemorragia digestiva', 'Insuficiência renal grave', 'ICC grave', '3º trimestre gestação', 'Pós-op de cirurgia cardíaca'],
    precaucoes: ['Idosos', 'HAS', 'DRC', 'Uso de anticoagulantes', 'Asma'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Náusea', 'Dor abdominal', 'Cefaleia'],
      graves: ['Sangramento GI', 'IRA', 'IAM/AVC', 'Reações cutâneas graves']
    },
    interacoes: [
      { medicamento: 'IECA/BRA', gravidade: 'moderada', efeito: 'Redução do efeito anti-hipertensivo e IRA', conduta: 'Evitar uso crônico' },
      { medicamento: 'Anticoagulantes', gravidade: 'grave', efeito: 'Aumento do risco de sangramento', conduta: 'Evitar ou monitorar' },
      { medicamento: 'Lítio', gravidade: 'moderada', efeito: 'Aumento dos níveis de lítio', conduta: 'Monitorar litemia' }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Usar com cautela' },
      { tfg: '<30', ajuste: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível em doses baixas e curta duração' },
    monitorizacao: ['Função renal', 'Sintomas GI'],
    orientacoesPaciente: ['Tomar com alimentos', 'Usar menor dose eficaz pelo menor tempo', 'Evitar em jejum prolongado'],
    doencasRelacionadas: ['osteoartrite', 'lombalgia', 'enxaqueca', 'dismenorreia'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['aine', 'anti-inflamatorio', 'dor', 'febre'],
    pharmgkb: [
      {
        gene: 'CYP2C9',
        variant: '*1/*1',
        phenotype: 'extensive_metabolizer',
        implications: ['Normal ibuprofen metabolism', 'Standard clearance and exposure'],
        dosageRecommendations: ['Standard dosing appropriate', 'Use lowest effective dose for shortest duration'],
      },
      {
        gene: 'CYP2C9',
        variant: '*2/*2, *3/*3, *2/*3',
        phenotype: 'poor_metabolizer',
        implications: ['Reduced ibuprofen clearance', 'Increased drug exposure (up to 2x)', 'Higher risk of GI and renal adverse effects'],
        dosageRecommendations: ['Consider 50% dose reduction', 'Use shortest duration possible', 'Increased monitoring for GI and renal effects'],
      },
      {
        gene: 'CYP2C9',
        variant: '*1/*2, *1/*3',
        phenotype: 'intermediate_metabolizer',
        implications: ['Moderately reduced clearance', 'May have 1.5x increased exposure'],
        dosageRecommendations: ['Consider lower dose', 'Monitor for GI symptoms and renal function'],
      },
    ]
  },
  {
    id: 'naproxeno',
    nomeGenerico: 'Naproxeno sódico',
    nomesComerciais: ['Flanax', 'Naprosyn'],
    // Ontologias
    atcCode: 'M01AE02',
    rxNormCui: '7258',
    drugBankId: 'DB00788',
    snomedCT: '372588000',
    casNumber: '22204-53-1',
    classeTerapeutica: 'anti_inflamatorio',
    subclasse: 'nao_seletivo',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '550mg', disponivelSUS: false }
    ],
    indicacoes: ['Dor inflamatória', 'Artrite reumatoide', 'Osteoartrite', 'Gota aguda', 'Dismenorreia', 'Enxaqueca'],
    mecanismoAcao: 'AINE não seletivo de longa ação. Inibe COX-1 e COX-2.',
    posologias: [
      {
        indicacao: 'Dor/Artrite',
        adultos: { dose: '500mg 12/12h', frequencia: '2x/dia', doseMaxima: '1500mg/dia' }
      },
      {
        indicacao: 'Gota aguda',
        adultos: { dose: '750mg inicial, depois 250mg 8/8h', frequencia: '3x/dia' }
      }
    ],
    contraindicacoes: ['Úlcera péptica', 'Insuficiência renal/cardíaca grave', '3º trimestre gestação'],
    precaucoes: ['Idosos', 'DRC', 'HAS', 'Uso de anticoagulantes'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Náusea', 'Cefaleia', 'Tontura'],
      graves: ['Hemorragia GI', 'IRA', 'Eventos CV']
    },
    interacoes: [
      { medicamento: 'AAS', gravidade: 'moderada', efeito: 'Reduz efeito cardioprotetor do AAS', conduta: 'Separar administração' },
      { medicamento: 'Lítio', gravidade: 'moderada', efeito: 'Aumento dos níveis de lítio', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Evitar' }],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Função renal', 'Sintomas GI'],
    orientacoesPaciente: ['Tomar com alimentos', 'Menor tempo possível'],
    doencasRelacionadas: ['artrite-reumatoide', 'gota', 'osteoartrite'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['aine', 'anti-inflamatorio', 'artrite', 'gota'],
    pharmgkb: [
      {
        gene: 'CYP2C9',
        variant: '*1/*1',
        phenotype: 'extensive_metabolizer',
        implications: ['Normal naproxen metabolism', 'Standard drug clearance'],
        dosageRecommendations: ['Standard dosing appropriate', 'Use lowest effective dose'],
      },
      {
        gene: 'CYP2C9',
        variant: '*2/*2, *3/*3, *2/*3',
        phenotype: 'poor_metabolizer',
        implications: ['Reduced naproxen clearance', 'Increased drug exposure', 'Higher risk of GI bleeding and renal effects'],
        dosageRecommendations: ['Consider 25-50% dose reduction', 'Shorter treatment duration', 'Enhanced monitoring for adverse effects'],
      },
      {
        gene: 'CYP2C9',
        variant: '*1/*2, *1/*3',
        phenotype: 'intermediate_metabolizer',
        implications: ['Moderately reduced clearance', 'May have increased exposure'],
        dosageRecommendations: ['Standard dosing with monitoring', 'Consider lower dose if prolonged use'],
      },
    ]
  },
  {
    id: 'diclofenaco',
    nomeGenerico: 'Diclofenaco sódico',
    nomesComerciais: ['Voltaren', 'Cataflam'],
    // Ontologias
    atcCode: 'M01AB05',
    rxNormCui: '3355',
    drugBankId: 'DB00586',
    snomedCT: '372756006',
    casNumber: '15307-86-5',
    classeTerapeutica: 'anti_inflamatorio',
    subclasse: 'nao_seletivo',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '75mg/3mL', disponivelSUS: true }
    ],
    indicacoes: ['Dor pós-operatória', 'Cólica renal', 'Dor musculoesquelética', 'Artrite', 'Dismenorreia'],
    mecanismoAcao: 'AINE não seletivo potente. Inibe COX-1 e COX-2.',
    posologias: [
      {
        indicacao: 'Dor/Inflamação',
        adultos: { dose: '50mg 8/8h ou 75mg 12/12h', frequencia: '2-3x/dia', doseMaxima: '150mg/dia' }
      }
    ],
    contraindicacoes: ['Úlcera péptica', 'DCV estabelecida (IAM, AVC, DAP)', 'ICC NYHA II-IV', 'Gestação 3º trimestre'],
    precaucoes: ['Alto risco CV', 'Idosos', 'DRC', 'Hepatopatia'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Náusea', 'Diarreia'],
      graves: ['Eventos CV (IAM, AVC)', 'Hemorragia GI', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'grave', efeito: 'Risco de sangramento', conduta: 'Evitar' },
      { medicamento: 'IECA/BRA', gravidade: 'moderada', efeito: 'IRA', conduta: 'Monitorar função renal' }
    ],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Evitar' }],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Usar por curto período' },
    monitorizacao: ['Função renal e hepática', 'Sintomas GI'],
    orientacoesPaciente: ['Tomar com alimentos', 'Curta duração', 'Atenção a sintomas cardíacos'],
    doencasRelacionadas: ['colica-renal', 'artrite'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['aine', 'anti-inflamatorio', 'dor'],
    pharmgkb: [
      {
        gene: 'CYP2C9',
        variant: '*1/*1',
        phenotype: 'extensive_metabolizer',
        implications: ['Normal diclofenac metabolism', 'Standard drug clearance'],
        dosageRecommendations: ['Standard dosing appropriate', 'Use lowest effective dose for shortest duration'],
      },
      {
        gene: 'CYP2C9',
        variant: '*2/*2, *3/*3, *2/*3',
        phenotype: 'poor_metabolizer',
        implications: ['Reduced diclofenac clearance (up to 3x AUC increase)', 'Increased drug exposure', 'Higher risk of GI bleeding, CV events, and hepatotoxicity'],
        dosageRecommendations: ['Consider 50% dose reduction', 'Avoid prolonged use', 'Consider alternative NSAID or non-NSAID analgesic'],
      },
      {
        gene: 'CYP2C9',
        variant: '*1/*2, *1/*3',
        phenotype: 'intermediate_metabolizer',
        implications: ['Moderately reduced clearance', 'May have 1.5-2x increased exposure'],
        dosageRecommendations: ['Consider lower dose', 'Monitor for GI and hepatic adverse effects'],
      },
    ]
  },
  {
    id: 'tramadol',
    nomeGenerico: 'Cloridrato de tramadol',
    nomesComerciais: ['Tramal', 'Sylador'],
    // Ontologias
    atcCode: 'N02AX02',
    rxNormCui: '10689',
    drugBankId: 'DB00193',
    snomedCT: '386858008',
    casNumber: '27203-92-5',
    classeTerapeutica: 'analgesico',
    subclasse: 'opioide_fraco',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '50mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '100mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Dor moderada a intensa', 'Dor crônica', 'Dor oncológica', 'Neuropatia diabética'],
    mecanismoAcao: 'Opioide fraco. Agonista mu-opioide e inibidor da recaptação de serotonina e noradrenalina.',
    posologias: [
      {
        indicacao: 'Dor moderada a intensa',
        adultos: { dose: '50-100mg 4-6h', frequencia: 'A cada 4-6h', doseMaxima: '400mg/dia' }
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'Epilepsia não controlada', 'Intoxicação aguda', 'Gestação'],
    precaucoes: ['História de convulsões', 'Uso de ISRS/IRSN (síndrome serotoninérgica)', 'Idosos', 'DRC'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Tontura', 'Constipação', 'Cefaleia', 'Sonolência'],
      graves: ['Convulsões', 'Síndrome serotoninérgica', 'Depressão respiratória', 'Dependência']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Contraindicado' },
      { medicamento: 'ISRS/IRSN', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Usar com cautela' },
      { medicamento: 'Anticonvulsivantes', gravidade: 'moderada', efeito: 'Risco de convulsão', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [
      { tfg: '10-30', ajuste: '50-100mg 12/12h' },
      { tfg: '<10', ajuste: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar durante amamentação' },
    monitorizacao: ['Sinais de dependência', 'Nível de dor'],
    orientacoesPaciente: ['Pode causar dependência', 'Não dirigir inicialmente', 'Não usar com álcool'],
    doencasRelacionadas: ['dor-cronica', 'neuropatia-diabetica'],
    pharmgkb: [
      {
        gene: 'CYP2D6',
        variant: '*4/*4, *4/*5, *5/*5',
        phenotype: 'poor_metabolizer',
        implications: ['Reduced tramadol activation to O-desmethyltramadol', 'Decreased analgesic efficacy', 'May still have serotonergic/noradrenergic effects'],
        dosageRecommendations: ['Consider 25-50% dose reduction', 'Monitor for reduced efficacy', 'Alternative opioids may be needed'],
      },
      {
        gene: 'CYP2D6',
        variant: '*1/*1xN, *2/*2xN',
        phenotype: 'ultra_rapid_metabolizer',
        implications: ['Increased O-desmethyltramadol formation', 'Enhanced opioid effects', 'Higher risk of respiratory depression and seizures'],
        dosageRecommendations: ['Use with caution', 'Consider lower doses', 'Monitor for adverse effects'],
      },
    ],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['analgesico', 'opioide', 'dor', 'cronica']
  },
  {
    id: 'codeina',
    nomeGenerico: 'Fosfato de codeína',
    nomesComerciais: ['Codein', 'Tylex (associação)'],
    // Ontologias
    atcCode: 'R05DA04',
    rxNormCui: '2670',
    drugBankId: 'DB00318',
    snomedCT: '387494007',
    casNumber: '76-57-3',
    classeTerapeutica: 'analgesico',
    subclasse: 'opioide_fraco',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '3mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Dor moderada', 'Tosse seca intratável', 'Diarreia grave'],
    mecanismoAcao: 'Pró-droga convertida em morfina pela CYP2D6. Agonista mu-opioide.',
    posologias: [
      {
        indicacao: 'Dor moderada',
        adultos: { dose: '30-60mg 4-6h', frequencia: 'A cada 4-6h', doseMaxima: '360mg/dia' }
      },
      {
        indicacao: 'Tosse',
        adultos: { dose: '15-30mg 4-6h', frequencia: 'A cada 4-6h' }
      }
    ],
    contraindicacoes: ['Crianças <12 anos', 'Pós-amigdalectomia em <18 anos', 'Metabolizadores ultrarrápidos CYP2D6'],
    precaucoes: ['Constipação', 'Idosos', 'DRC', 'DPOC'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Náusea', 'Sonolência', 'Tontura'],
      graves: ['Depressão respiratória', 'Dependência']
    },
    interacoes: [
      { medicamento: 'Depressores do SNC', gravidade: 'grave', efeito: 'Depressão respiratória', conduta: 'Evitar ou reduzir doses' }
    ],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Reduzir dose ou evitar' }],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['Padrão respiratório', 'Constipação'],
    orientacoesPaciente: ['Pode causar constipação', 'Não usar com álcool'],
    doencasRelacionadas: ['dor-moderada'],
    pharmgkb: [
      {
        gene: 'CYP2D6',
        level: '1A',
        summary: 'Codeína é um pró-fármaco metabolizado pelo CYP2D6 em morfina (metabólito ativo responsável pela analgesia)',
        guidelineUrl: 'https://cpicpgx.org/guidelines/guideline-for-codeine-and-cyp2d6/',
        variants: [
          {
            allele: '*1/*1',
            phenotype: 'normal_metabolizer',
            frequency: {
              european: 0.77,
              african: 0.83,
              asian: 0.51,
              hispanic: 0.64,
              southAsian: 0.71,
            },
            implications: [
              'Metabolização normal de codeína em morfina (~10% conversão)',
              'Resposta analgésica esperada com dose padrão',
              'Risco normal de efeitos adversos (constipação, náusea)',
            ],
            dosageRecommendation: {
              recommendation: 'Usar dose padrão de codeína (30-60 mg a cada 4-6h)',
              reasoning: 'Função enzimática normal permite metabolização adequada ao metabólito ativo (morfina)',
              strength: 'strong',
              classification: 'CPIC Level A - Normal metabolizer',
            },
          },
          {
            allele: '*1/*4',
            phenotype: 'intermediate_metabolizer',
            frequency: {
              european: 0.17,
              african: 0.09,
              asian: 0.38,
              hispanic: 0.27,
              southAsian: 0.22,
            },
            implications: [
              'Metabolização reduzida de codeína em morfina (~5% conversão)',
              'Resposta analgésica pode ser insuficiente ou inconsistente',
              'Menor risco de efeitos adversos opioides',
            ],
            dosageRecommendation: {
              recommendation: 'Considerar dose maior de codeína OU escolher analgésico alternativo (não tramadol)',
              reasoning: 'Atividade enzimática reduzida resulta em menor formação de morfina',
              strength: 'moderate',
              classification: 'CPIC Level B - Intermediate metabolizer',
            },
            alternatives: ['morfina', 'ibuprofeno', 'paracetamol'],
          },
          {
            allele: '*4/*4',
            phenotype: 'poor_metabolizer',
            frequency: {
              european: 0.06,
              african: 0.02,
              asian: 0.11,
              hispanic: 0.09,
              southAsian: 0.07,
            },
            implications: [
              'Metabolização mínima/ausente de codeína em morfina (<1% conversão)',
              'Resposta analgésica inadequada ou ausente',
              'Risco muito baixo de efeitos adversos opioides',
              'Ainda pode causar constipação e náusea (efeito da codeína não metabolizada)',
            ],
            dosageRecommendation: {
              recommendation: 'EVITAR codeína - ineficaz. Escolher analgésico alternativo que não dependa de CYP2D6',
              reasoning: 'Ausência de atividade enzimática impede formação do metabólito ativo (morfina), tornando o medicamento ineficaz',
              strength: 'strong',
              classification: 'CPIC Level A - Poor metabolizer (contraindicação relativa)',
            },
            alternatives: ['morfina', 'oxicodona', 'ibuprofeno', 'paracetamol'],
          },
          {
            allele: '*1/*2xN',
            phenotype: 'ultra_rapid_metabolizer',
            frequency: {
              european: 0.03,
              african: 0.16,
              asian: 0.02,
              hispanic: 0.05,
              southAsian: 0.09,
            },
            implications: [
              'Metabolização muito rápida de codeína em morfina (>20% conversão)',
              'Níveis elevados e imprevisíveis de morfina no plasma',
              'ALTO RISCO de toxicidade opioide (depressão respiratória, sedação excessiva)',
              'Risco de overdose fatal, especialmente em crianças',
              'FDA Black Box Warning para esta população',
            ],
            dosageRecommendation: {
              recommendation: 'CONTRAINDICADO - evitar codeína completamente. Escolher analgésico alternativo com farmacocinética conhecida',
              reasoning: 'Atividade enzimática aumentada resulta em formação excessiva de morfina com risco significativo de toxicidade e morte',
              strength: 'strong',
              classification: 'CPIC Level A - Ultra-rapid metabolizer (CONTRAINDICAÇÃO ABSOLUTA)',
            },
            alternatives: ['morfina (dose ajustada)', 'ibuprofeno', 'paracetamol'],
          },
        ],
      },
    ],
    calculadoras: [],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['analgesico', 'opioide', 'antitussigeno']
  },
  {
    id: 'morfina',
    nomeGenerico: 'Sulfato de morfina',
    nomesComerciais: ['Dimorf', 'Dolo Moff'],
    // Ontologias
    atcCode: 'N02AA01',
    rxNormCui: '7052',
    drugBankId: 'DB00295',
    snomedCT: '373529000',
    casNumber: '57-27-2',
    classeTerapeutica: 'analgesico',
    subclasse: 'opioide_forte',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '10mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Dor intensa', 'Dor oncológica', 'Dispneia refratária em cuidados paliativos', 'Dor pós-operatória'],
    mecanismoAcao: 'Agonista opioide mu potente. Analgesia central e periférica.',
    posologias: [
      {
        indicacao: 'Dor oncológica',
        adultos: { dose: 'Iniciar 5-10mg VO 4/4h, titular', frequencia: 'A cada 4h', observacoes: 'Rotação de opioides se tolerância' }
      }
    ],
    contraindicacoes: ['Depressão respiratória grave', 'Íleo paralítico', 'Asma aguda'],
    precaucoes: ['DPOC', 'Apneia do sono', 'Uso concomitante de depressores SNC', 'DRC'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Náusea', 'Sonolência', 'Prurido'],
      graves: ['Depressão respiratória', 'Dependência', 'Síndrome de abstinência']
    },
    interacoes: [
      { medicamento: 'Benzodiazepínicos', gravidade: 'grave', efeito: 'Depressão respiratória fatal', conduta: 'Evitar associação' }
    ],
    ajusteDoseRenal: [
      { tfg: '10-50', ajuste: 'Reduzir dose em 25%' },
      { tfg: '<10', ajuste: 'Reduzir dose em 50% ou evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar durante amamentação' },
    monitorizacao: ['Padrão respiratório', 'Escala de dor', 'Sinais de abuso'],
    orientacoesPaciente: ['Usar laxativo profilático', 'Não dirigir', 'Não parar abruptamente'],
    doencasRelacionadas: ['dor-oncologica', 'cuidados-paliativos'],
    calculadoras: ['conversao-opioides'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['opioide', 'dor-oncologica', 'paliativos'],
    pharmgkb: [
      {
        gene: 'OPRM1',
        variant: 'A118G (rs1799971)',
        phenotype: 'reduced_response',
        implications: [
          'Reduced mu-opioid receptor binding',
          'May require higher morphine doses for pain control',
          'Lower risk of opioid-induced nausea',
        ],
        dosageRecommendations: [
          'May need 10-30% higher doses for adequate analgesia',
          'Titrate to effect more aggressively',
          'Consider pharmacogenomics panel before opioid therapy',
        ],
      },
      {
        gene: 'COMT',
        variant: 'Val158Met (rs4680)',
        phenotype: 'met_met_high_pain_sensitivity',
        implications: [
          'Met/Met: Higher pain sensitivity, better morphine response',
          'Val/Val: Lower pain sensitivity, may need less morphine',
        ],
        dosageRecommendations: [
          'Met/Met carriers may respond better to opioids',
          'Val/Val carriers may need alternative approaches',
        ],
      },
    ]
  }
];
