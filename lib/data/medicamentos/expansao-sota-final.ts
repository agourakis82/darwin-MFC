/**
 * EXPANSÃO SOTA FINAL - MEDICAMENTOS ADICIONAIS
 * =============================================
 * Expansão final baseada em:
 * - WHO Essential Medicines List (EML) 2023-2024
 * - Medicamentos comuns na APS brasileira
 * - RENAME 2024 completos
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosExpansaoSOTAFinal: Medicamento[] = [
  // ============================================
  // ANTIBIÓTICOS ADICIONAIS (WHO EML)
  // ============================================
  {
    id: 'doxiciclina',
    nomeGenerico: 'Doxiciclina',
    nomesComerciais: ['Vibramicina'],
    atcCode: 'J01AA02',
    rxNormCui: '3689',
    drugBankId: 'DB00254',
    snomedCT: '372546009',
    casNumber: '564-25-0',
    classeTerapeutica: 'antibiotico',
    subclasse: 'tetraciclina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: ['Acne', 'Infecções respiratórias', 'Doença de Lyme', 'Malária (profilaxia)'],
    mecanismoAcao: 'Inibe síntese proteica bacteriana por ligação à subunidade 30S do ribossomo.',
    posologias: [
      { indicacao: 'Acne', adultos: { dose: '100mg/dia', frequencia: '1x/dia', doseMaxima: '100mg/dia' } }
    ],
    contraindicacoes: ['Gravidez', 'Lactação', 'Hipersensibilidade', 'Crianças <8 anos'],
    precaucoes: ['Fotossensibilidade', 'Esofagite', 'DRC'],
    efeitosAdversos: { comuns: ['Náusea', 'Fotossensibilidade', 'Diarreia'], graves: ['Hepatotoxicidade', 'Pancreatite', 'Pseudotumor cerebral'] },
    interacoes: [{ medicamento: 'Antiácidos', gravidade: 'moderada', efeito: 'Redução de absorção', conduta: 'Não tomar juntos' }],
    ajusteDoseRenal: [{ tfg: '<30', ajuste: 'Não necessário (metabolismo hepático)' }],
    gestacao: 'D', amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['Função hepática'],
    orientacoesPaciente: ['Tomar com bastante líquido (sentado/em pé)', 'Evitar sol (fotossensibilidade)', 'Não tomar com antiácidos'],
    doencasRelacionadas: ['acne', 'pneumonia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antibiotico', 'tetraciclina', 'acne']
  },
  {
    id: 'trimetoprima-sulfametoxazol',
    nomeGenerico: 'Trimetoprima + Sulfametoxazol',
    nomesComerciais: ['Bactrim', 'Septra'],
    atcCode: 'J01EE01',
    rxNormCui: '36567',
    drugBankId: 'DB00440',
    snomedCT: '387361002',
    casNumber: '738-70-5',
    classeTerapeutica: 'antibiotico',
    subclasse: 'sulfonamida_inibidor_folato',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '80mg+400mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '160mg+800mg', disponivelSUS: true }
    ],
    indicacoes: ['ITU não complicada', 'Pneumonia por Pneumocystis', 'Infecções de pele'],
    mecanismoAcao: 'Inibe síntese de ácido fólico (bloqueio sequencial da di-hidrofolato redutase e síntese de di-hidrofolato).',
    posologias: [
      { indicacao: 'ITU não complicada', adultos: { dose: '160mg+800mg 12/12h', frequencia: '2x/dia', doseMaxima: '320mg+1600mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Gravidez (primeiro trimestre)', 'Lactação', 'Deficiência de G6PD'],
    precaucoes: ['DRC', 'Hepatopatia', 'Idosos', 'Fotossensibilidade'],
    efeitosAdversos: { comuns: ['Náusea', 'Rash', 'Fotossensibilidade'], graves: ['Síndrome de Stevens-Johnson', 'Agranulocitose', 'Toxicidade hepática', 'Hipercalemia'] },
    interacoes: [{ medicamento: 'Warfarina', gravidade: 'moderada', efeito: 'Aumento de sangramento', conduta: 'Monitorar INR' }],
    ajusteDoseRenal: [{ tfg: '15-30', ajuste: '50% da dose' }, { tfg: '<15', ajuste: 'Contraindicado' }],
    gestacao: 'C', amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Hemograma', 'Função renal', 'Potássio'],
    orientacoesPaciente: ['Beber bastante líquido', 'Evitar sol', 'Informar rash ou febre'],
    doencasRelacionadas: ['itu', 'pneumonia'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antibiotico', 'itu', 'pneumonia']
  },

  // ============================================
  // ANTIVIRAIS ADICIONAIS
  // ============================================
  {
    id: 'oseltamivir',
    nomeGenerico: 'Oseltamivir',
    nomesComerciais: ['Tamiflu'],
    atcCode: 'J05AH02',
    rxNormCui: '73032',
    drugBankId: 'DB00198',
    snomedCT: '386220001',
    casNumber: '204255-11-8',
    classeTerapeutica: 'antiviral',
    subclasse: undefined,
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '75mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '12mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Influenza A e B', 'Profilaxia de influenza'],
    mecanismoAcao: 'Inibe neuraminidase viral, impedindo liberação de partículas virais das células infectadas.',
    posologias: [
      { indicacao: 'Influenza', adultos: { dose: '75mg 12/12h por 5 dias', frequencia: '2x/dia', doseMaxima: '150mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['DRC', 'Psicose/neuropsiquiatria'],
    efeitosAdversos: { comuns: ['Náusea', 'Vômito', 'Cefaleia'], graves: ['Reações neuropsiquiátricas', 'Reações de hipersensibilidade'] },
    interacoes: [{ medicamento: 'Probenecida', gravidade: 'moderada', efeito: 'Aumento de níveis', conduta: 'Ajustar dose' }],
    ajusteDoseRenal: [{ tfg: '10-30', ajuste: '75mg 1x/dia' }, { tfg: '<10', ajuste: 'Não recomendado' }],
    gestacao: 'C', amamentacao: { compativel: true, observacao: 'Usar com cautela' },
    monitorizacao: ['Sintomas neuropsiquiátricos'],
    orientacoesPaciente: ['Iniciar dentro de 48h do início dos sintomas', 'Completar tratamento'],
    doencasRelacionadas: ['influenza'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['antiviral', 'influenza']
  },

  // ============================================
  // ANTI-HISTAMÍNICOS ADICIONAIS
  // ============================================
  {
    id: 'cetirizina',
    nomeGenerico: 'Cetirizina',
    nomesComerciais: ['Zyrtec'],
    atcCode: 'R06AE07',
    rxNormCui: '2202',
    drugBankId: 'DB00341',
    snomedCT: '387530009',
    casNumber: '83881-51-0',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '1mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Rinite alérgica', 'Urticária', 'Conjuntivite alérgica'],
    mecanismoAcao: 'Anti-histamínico H1 de 2ª geração. Antagonista seletivo do receptor H1. Pouco sedativo.',
    posologias: [
      { indicacao: 'Rinite alérgica/Urticária', adultos: { dose: '10mg 1x/dia', frequencia: '1x/dia', doseMaxima: '10mg/dia' } }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['DRC', 'Idosos', 'Condução de veículos'],
    efeitosAdversos: { comuns: ['Sonolência leve', 'Boca seca', 'Cefaleia'], graves: ['Reações de hipersensibilidade'] },
    interacoes: [{ medicamento: 'Álcool', gravidade: 'leve', efeito: 'Potencialização de sedação', conduta: 'Evitar' }],
    ajusteDoseRenal: [{ tfg: '10-50', ajuste: '5mg/dia' }, { tfg: '<10', ajuste: '5mg em dias alternados' }],
    gestacao: 'B', amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [],
    orientacoesPaciente: ['Pode causar sonolência leve', 'Tomar à noite se sedativo'],
    doencasRelacionadas: ['rinite-alergica', 'urticaria'], calculadoras: [],
    citations: [{ refId: 'rename-2024' }], lastUpdate: '2024-12',
    tags: ['anti_histaminico', 'alergia']
  },
];

