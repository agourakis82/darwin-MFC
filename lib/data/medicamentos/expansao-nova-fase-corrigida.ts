/**
 * EXPANSÃO DE MEDICAMENTOS - NOVA FASE (CORRIGIDA)
 * ================================================
 * 
 * Expansão adicional de medicamentos com estrutura corrigida
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosExpansaoNovaFase: Partial<Medicamento>[] = [
  {
    id: 'ceftriaxona',
    nomeGenerico: 'Ceftriaxona',
    classeTerapeutica: 'antibiotico',
    subclasse: 'cefalosporina_3g',
    rename: true,
    atcCode: 'J01DD04',
    rxNormCui: '213453',
    drugBankId: 'DB01212',
    snomedCT: '387225008',
    casNumber: '73384-59-5',
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '1g', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '2g', disponivelSUS: true },
    ],
    indicacoes: [
      'Meningite bacteriana',
      'Pneumonia comunitária grave',
      'Infecções urinárias complicadas',
      'Gonorreia',
      'Sepse',
    ],
    mecanismoAcao: 'Cefalosporina de terceira geração bactericida. Inibe síntese da parede celular bacteriana.',
    posologias: [
      {
        indicacao: 'Meningite bacteriana',
        adultos: { 
          dose: '2 g IV a cada 12 horas', 
          frequencia: '2x/dia'
        },
        pediatrico: { 
          dose: '100 mg/kg/dia IV dividido em 1-2 doses (máx. 4 g/dia)', 
          frequencia: '1-2x/dia'
        },
      },
      {
        indicacao: 'Pneumonia comunitária grave',
        adultos: { 
          dose: '1-2 g IV a cada 24 horas', 
          frequencia: '1x/dia'
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a cefalosporinas ou penicilinas',
      'Prematuros (risco de kernicterus)',
    ],
    precaucoes: [
      'Insuficiência renal ou hepática',
      'Neutropenia',
      'Uso prolongado (superinfecção)',
    ],
    efeitosAdversos: {
      comuns: ['Diarréia', 'Náuseas', 'Exantema'],
      graves: ['Reação anafilática', 'Colite pseudomembranosa'],
    },
    interacoes: [
      {
        medicamento: 'Álcool',
        gravidade: 'grave',
        efeito: 'Efeito antabuse (náuseas, vômitos)',
        conduta: 'Evitar consumo de álcool durante tratamento',
      },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    tags: ['antibiotico', 'parenteral', 'broad-spectrum'],
    lastUpdate: '2024-12',
  },
];

