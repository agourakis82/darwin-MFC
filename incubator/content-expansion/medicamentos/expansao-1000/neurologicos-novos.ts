/**
 * NEUROLOGICOS NOVOS - DARWIN-MFC EXPANSAO 1000
 * =============================================
 * Novos agentes neurologicos (enxaqueca, Parkinson, esclerose multipla, atrofia muscular espinhal)
 *
 * Referencias:
 * - LIBERTY/EVOLVE/REGAIN trials (anticorpos anti-CGRP)
 * - ACHIEVE/BHV3000 trials (Gepants)
 * - OPERA/ORATORIO trials (Ocrelizumabe)
 * - ASCLEPIOS trials (Ofatumumabe)
 * - BIPARK/SETTLE studies (Opicapona)
 * - SETTLE/SAFINAMIDE trials (Safinamida)
 * - ENDEAR/CHERISH trials (Nusinersen)
 * - FDA/EMA prescribing information
 * - American Headache Society guidelines
 * - AAN Multiple Sclerosis guidelines
 */

import { Medicamento } from '@/lib/types/medicamento';

export const neurologicosNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // ENXAQUECA - ANTICORPOS ANTI-CGRP (PREVENCAO)
  // =============================================================================
  {
    id: 'erenumabe',
    nomeGenerico: 'Erenumabe',
    nomesComerciais: ['Aimovig'],
    atcCode: 'N02CD01',
    rxNormCui: '2049106',
    drugBankId: 'DB14007',
    snomedCT: '1149236006',
    casNumber: '1332181-49-5',
    classeTerapeutica: 'antienxaqueca',
    subclasse: 'anticorpo_cgrp',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '70mg/mL (seringa preenchida)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '140mg/mL (seringa preenchida)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '70mg (autoinjector)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '140mg (autoinjector)', disponivelSUS: false },
    ],
    indicacoes: [
      'Profilaxia de enxaqueca episodica em adultos (>= 4 dias/mes)',
      'Profilaxia de enxaqueca cronica em adultos (>= 15 dias/mes)',
    ],
    mecanismoAcao: 'Anticorpo monoclonal totalmente humano (IgG2) que se liga ao receptor de CGRP (calcitonin gene-related peptide). Bloqueia a acao do CGRP nos seus receptores, prevenindo a vasodilatacao e inflamacao neurogenica envolvidas na fisiopatologia da enxaqueca. Primeiro da classe a ser aprovado (2018). Nao atravessa barreira hematoencefalica - atua perifericamente.',
    posologias: [
      {
        indicacao: 'Profilaxia de enxaqueca',
        adultos: {
          dose: '70mg ou 140mg',
          frequencia: 'Subcutaneo, 1x/mes (a cada 4 semanas)',
          doseMaxima: '140mg/mes',
          observacoes: 'Pode ser administrado em abdome, coxa ou parte posterior do braco. Retirar da geladeira 30min antes. Resposta clinica geralmente em 3 meses; alguns respondem em 1 mes.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao erenumabe ou excipientes',
    ],
    precaucoes: [
      'Reacoes no local da injecao (comum)',
      'Constipacao (mais frequente que outros anti-CGRP)',
      'Hipertensao arterial nova ou agravada - monitorar PA',
      'Doenca cardiovascular - dados limitados em IAM/AVC recente',
      'Gestacao - anticorpos IgG atravessam placenta no 3o trimestre',
    ],
    efeitosAdversos: {
      comuns: ['Reacao no local da injecao (5-6%)', 'Constipacao (3-4%)', 'Espasmos musculares', 'Prurido'],
      graves: ['Reacoes de hipersensibilidade (raro)', 'Hipertensao grave (relatos pos-marketing)', 'Constipacao grave com hospitalizacao (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Nao ha interacoes farmacocineticas clinicamente significativas conhecidas',
        gravidade: 'leve',
        efeito: 'Anticorpos monoclonais nao sao metabolizados por CYP450',
        conduta: 'Pode ser usado com triptanos e outros medicamentos para enxaqueca aguda',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes. IgG humana e excretada no leite. Considerar riscos/beneficios.' },
    monitorizacao: [
      'Diario de enxaqueca (frequencia, intensidade, duracao)',
      'Pressao arterial (especialmente em hipertensos)',
      'Habito intestinal (constipacao)',
      'Reacoes no local da injecao',
    ],
    orientacoesPaciente: [
      'Autoaplicacao subcutanea mensal',
      'Retirar da geladeira 30 minutos antes de aplicar',
      'Alternar locais de injecao',
      'Manter diario de dores de cabeca',
      'Informar medico se constipacao persistente',
      'Pode levar ate 3 meses para resposta maxima',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessario; experiencia limitada em >65 anos',
      hepatopatas: 'Sem ajuste necessario (nao metabolizado pelo figado)',
    },
    doencasRelacionadas: ['enxaqueca', 'enxaqueca-cronica', 'cefaleia'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['erenumabe', 'Aimovig', 'anti-CGRP', 'enxaqueca', 'profilaxia', 'anticorpo-monoclonal', 'STRIVE', 'ARISE'],
  },

  {
    id: 'fremanezumabe',
    nomeGenerico: 'Fremanezumabe',
    nomesComerciais: ['Ajovy'],
    atcCode: 'N02CD03',
    rxNormCui: '2176285',
    drugBankId: 'DB14573',
    snomedCT: '1149234009',
    casNumber: '1353485-38-7',
    classeTerapeutica: 'antienxaqueca',
    subclasse: 'anticorpo_cgrp',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '225mg/1,5mL (seringa preenchida)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '225mg (autoinjector)', disponivelSUS: false },
    ],
    indicacoes: [
      'Profilaxia de enxaqueca episodica em adultos',
      'Profilaxia de enxaqueca cronica em adultos',
    ],
    mecanismoAcao: 'Anticorpo monoclonal humanizado (IgG2delta/kappa) que se liga seletivamente ao peptideo CGRP (ligante), impedindo sua ligacao aos receptores. Diferente do erenumabe que bloqueia o receptor, fremanezumabe neutraliza o ligante CGRP circulante. Oferece flexibilidade posologica (mensal ou trimestral).',
    posologias: [
      {
        indicacao: 'Profilaxia de enxaqueca - dose mensal',
        adultos: {
          dose: '225mg',
          frequencia: 'Subcutaneo, 1x/mes',
          observacoes: 'Uma injecao por mes',
        },
      },
      {
        indicacao: 'Profilaxia de enxaqueca - dose trimestral',
        adultos: {
          dose: '675mg (3 injecoes de 225mg)',
          frequencia: 'Subcutaneo, 1x a cada 3 meses',
          observacoes: 'Tres injecoes consecutivas em locais diferentes no mesmo dia',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao fremanezumabe ou excipientes',
    ],
    precaucoes: [
      'Reacoes no local da injecao',
      'Doenca cardiovascular - dados limitados',
      'Gestacao - atravessa placenta no 3o trimestre',
      'Opcao trimestral pode ter menor aderencia se efeitos adversos',
    ],
    efeitosAdversos: {
      comuns: ['Reacao no local da injecao (26-45%)', 'Induracoes', 'Eritema', 'Prurido'],
      graves: ['Reacoes de hipersensibilidade (raro)', 'Anafilaxia (muito raro)'],
    },
    interacoes: [
      {
        medicamento: 'Sem interacoes clinicamente significativas conhecidas',
        gravidade: 'leve',
        efeito: 'Nao metabolizado por CYP450',
        conduta: 'Seguro com medicamentos de resgate (triptanos, AINEs)',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; IgG excretada no leite' },
    monitorizacao: [
      'Diario de enxaqueca',
      'Reacoes no local da injecao',
      'Se dose trimestral: avaliar resposta antes da proxima dose',
    ],
    orientacoesPaciente: [
      'Escolher entre dose mensal (1 injecao) ou trimestral (3 injecoes)',
      'Deixar em temperatura ambiente 30min antes',
      'Pode aplicar em abdome, coxa ou braco',
      'Se trimestral: aplicar 3 injecoes em locais diferentes no mesmo dia',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste; dados limitados',
      hepatopatas: 'Sem ajuste necessario',
    },
    doencasRelacionadas: ['enxaqueca', 'enxaqueca-cronica', 'cefaleia'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['fremanezumabe', 'Ajovy', 'anti-CGRP', 'enxaqueca', 'profilaxia', 'HALO'],
  },

  {
    id: 'galcanezumabe',
    nomeGenerico: 'Galcanezumabe',
    nomesComerciais: ['Emgality'],
    atcCode: 'N02CD02',
    rxNormCui: '2176289',
    drugBankId: 'DB14574',
    snomedCT: '1149235005',
    casNumber: '1698308-64-7',
    classeTerapeutica: 'antienxaqueca',
    subclasse: 'anticorpo_cgrp',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '120mg/mL (seringa preenchida)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '120mg (autoinjector)', disponivelSUS: false },
    ],
    indicacoes: [
      'Profilaxia de enxaqueca episodica em adultos',
      'Profilaxia de enxaqueca cronica em adultos',
      'Cefaleia em salvas episodica (primeira indicacao aprovada para esta condicao)',
    ],
    mecanismoAcao: 'Anticorpo monoclonal humanizado (IgG4) que se liga com alta afinidade ao peptideo CGRP, prevenindo sua atividade biologica. A ligacao IgG4 reduz potencial de reacoes mediadas por complemento. Unico anti-CGRP aprovado para cefaleia em salvas, demonstrando eficacia na reducao de ataques semanais.',
    posologias: [
      {
        indicacao: 'Profilaxia de enxaqueca',
        adultos: {
          dose: 'Dose de ataque: 240mg (2 injecoes); Manutencao: 120mg',
          frequencia: 'Subcutaneo, 120mg 1x/mes apos dose de ataque',
          observacoes: 'Dose de ataque com 2 injecoes de 120mg no primeiro dia',
        },
      },
      {
        indicacao: 'Cefaleia em salvas episodica',
        adultos: {
          dose: '300mg (3 injecoes de 100mg)',
          frequencia: 'Subcutaneo, 1x/mes durante periodo de cluster',
          observacoes: 'Iniciar no inicio do periodo de salvas; descontinuar quando cluster terminar',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao galcanezumabe ou excipientes',
    ],
    precaucoes: [
      'Reacoes no local da injecao',
      'Cefaleia em salvas: usar apenas em episodica (nao ha dados para cronica)',
      'Doenca cardiovascular - dados limitados',
    ],
    efeitosAdversos: {
      comuns: ['Reacao no local da injecao (18%)', 'Eritema', 'Prurido', 'Vertigo'],
      graves: ['Reacoes de hipersensibilidade (raro)', 'Anafilaxia (muito raro)'],
    },
    interacoes: [
      {
        medicamento: 'Sem interacoes conhecidas',
        gravidade: 'leve',
        efeito: 'Nao metabolizado hepaticamente',
        conduta: 'Pode ser combinado com triptanos',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Diario de enxaqueca ou ataques de cluster',
      'Reacoes no local da injecao',
      'Em cluster: monitorar inicio e fim do periodo',
    ],
    orientacoesPaciente: [
      'Primeira dose: 2 injecoes (dose de ataque)',
      'Manutencao: 1 injecao mensal',
      'Para cefaleia em salvas: 3 injecoes mensais durante periodo ativo',
      'Deixar em temperatura ambiente antes de aplicar',
    ],
    consideracoesEspeciais: {
      idosos: 'Experiencia limitada; sem ajuste',
      hepatopatas: 'Sem ajuste',
    },
    doencasRelacionadas: ['enxaqueca', 'enxaqueca-cronica', 'cefaleia-em-salvas', 'cluster-headache'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['galcanezumabe', 'Emgality', 'anti-CGRP', 'enxaqueca', 'cefaleia-em-salvas', 'EVOLVE', 'REGAIN'],
  },

  {
    id: 'eptinezumabe',
    nomeGenerico: 'Eptinezumabe',
    nomesComerciais: ['Vyepti'],
    atcCode: 'N02CD04',
    rxNormCui: '2359283',
    drugBankId: 'DB15100',
    snomedCT: '1179001008',
    casNumber: '1688889-62-8',
    classeTerapeutica: 'antienxaqueca',
    subclasse: 'anticorpo_cgrp',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '100mg/mL (frasco-ampola)', disponivelSUS: false },
    ],
    indicacoes: [
      'Profilaxia de enxaqueca episodica em adultos',
      'Profilaxia de enxaqueca cronica em adultos',
    ],
    mecanismoAcao: 'Anticorpo monoclonal humanizado (IgG1) que se liga ao peptideo CGRP-alfa e CGRP-beta com alta afinidade. Unico anti-CGRP de administracao intravenosa, permitindo inicio de acao mais rapido (dentro de 24h). Produzido em levedura (Pichia pastoris) em vez de celulas de mamiferos, o que pode reduzir imunogenicidade.',
    posologias: [
      {
        indicacao: 'Profilaxia de enxaqueca',
        adultos: {
          dose: '100mg ou 300mg',
          frequencia: 'IV a cada 3 meses (trimestral)',
          doseMaxima: '300mg a cada 3 meses',
          observacoes: 'Infusao IV durante 30 minutos. Dose de 300mg pode ser mais eficaz em enxaqueca cronica. Inicio rapido de acao - pode reduzir enxaqueca ja no dia 1.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao eptinezumabe ou excipientes',
    ],
    precaucoes: [
      'Reacoes a infusao (nasofaringite, hipersensibilidade)',
      'Requer acesso venoso - administracao em ambiente de saude',
      'Dados limitados em doenca cardiovascular',
    ],
    efeitosAdversos: {
      comuns: ['Nasofaringite (6-7%)', 'Hipersensibilidade (2%)', 'Fadiga', 'Nausea'],
      graves: ['Reacoes a infusao graves (raro)', 'Anafilaxia (muito raro)'],
    },
    interacoes: [
      {
        medicamento: 'Sem interacoes conhecidas',
        gravidade: 'leve',
        efeito: 'Nao metabolizado por CYP450',
        conduta: 'Compativel com medicamentos de resgate',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Durante infusao: sinais vitais, reacoes de hipersensibilidade',
      'Diario de enxaqueca entre infusoes',
      'Reacoes pos-infusao',
    ],
    orientacoesPaciente: [
      'Administracao trimestral em clinica/hospital',
      'Infusao de 30 minutos',
      'Pode sentir melhora ja no primeiro dia',
      'Manter diario de enxaqueca para avaliar resposta',
    ],
    consideracoesEspeciais: {
      idosos: 'Dados limitados; sem ajuste',
      hepatopatas: 'Sem ajuste',
    },
    doencasRelacionadas: ['enxaqueca', 'enxaqueca-cronica', 'cefaleia'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['eptinezumabe', 'Vyepti', 'anti-CGRP', 'enxaqueca', 'IV', 'intravenoso', 'PROMISE'],
  },

  // =============================================================================
  // ENXAQUECA - GEPANTS E DITANS (TRATAMENTO AGUDO + PREVENCAO)
  // =============================================================================
  {
    id: 'ubrogepante',
    nomeGenerico: 'Ubrogepante',
    nomesComerciais: ['Ubrelvy'],
    atcCode: 'N02CD05',
    rxNormCui: '2281316',
    drugBankId: 'DB15033',
    snomedCT: '1156233001',
    casNumber: '1374248-72-2',
    classeTerapeutica: 'antienxaqueca',
    subclasse: 'antagonista_cgrp',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Tratamento agudo de enxaqueca com ou sem aura em adultos',
    ],
    mecanismoAcao: 'Antagonista de receptor CGRP (gepant) de pequena molecula, oral. Bloqueia competitivamente a ligacao do CGRP ao seu receptor. Diferente dos triptanos, nao causa vasoconstrição - seguro em pacientes com doenca cardiovascular. Nao atua em receptores de serotonina. Primeira geracao de gepants orais aprovados.',
    posologias: [
      {
        indicacao: 'Enxaqueca aguda',
        adultos: {
          dose: '50mg ou 100mg',
          frequencia: 'Dose unica ao inicio da enxaqueca; pode repetir apos >=2 horas se necessario',
          doseMaxima: '200mg/24h',
          observacoes: 'Iniciar o mais cedo possivel apos inicio da cefaleia. Evitar em >8 dias/mes (risco de cefaleia por uso excessivo).',
        },
      },
    ],
    contraindicacoes: [
      'Uso concomitante com inibidores fortes de CYP3A4',
      'Hipersensibilidade ao ubrogepante',
    ],
    precaucoes: [
      'Ajuste de dose necessario com inibidores de CYP3A4',
      'Insuficiencia hepatica grave - evitar',
      'Insuficiencia renal grave - dose maxima 50mg',
      'Nao usar para prevencao (apenas tratamento agudo)',
    ],
    efeitosAdversos: {
      comuns: ['Nausea (2-4%)', 'Sonolencia (2-3%)', 'Xerostomia'],
      graves: ['Reacoes de hipersensibilidade (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol, itraconazol, claritromicina)',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis de ubrogepante',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Inibidores moderados de CYP3A4 (fluconazol, ciprofloxacino, verapamil)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de ubrogepante',
        conduta: 'Usar 50mg como dose inicial e maxima',
      },
      {
        medicamento: 'Indutores fortes de CYP3A4 (rifampicina, fenitoina)',
        gravidade: 'moderada',
        efeito: 'Reducao dos niveis de ubrogepante',
        conduta: 'Evitar combinacao',
      },
      {
        medicamento: 'Substratos de BCRP/P-gp (rosuvastatina, metotrexato)',
        gravidade: 'leve',
        efeito: 'Ubrogepante pode aumentar niveis destes farmacos',
        conduta: 'Monitorar',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '15-30', ajuste: 'Dose maxima 50mg/dose, 100mg/dia' },
      { tfg: '<15', ajuste: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Resposta clinica (alivio da cefaleia)',
      'Frequencia de uso (evitar >8 dias/mes)',
      'Funcao hepatica em uso prolongado',
    ],
    orientacoesPaciente: [
      'Tomar ao inicio da enxaqueca',
      'Pode tomar com ou sem alimentos',
      'Se necessario, pode repetir apos 2 horas',
      'Maximo 200mg por dia',
      'Alternativa aos triptanos se doenca cardiovascular',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico; experiencia limitada',
      hepatopatas: 'Hepatopatia moderada: 50mg (evitar segunda dose); grave: evitar',
    },
    doencasRelacionadas: ['enxaqueca', 'enxaqueca-com-aura', 'enxaqueca-sem-aura'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['ubrogepante', 'Ubrelvy', 'gepant', 'CGRP', 'enxaqueca-aguda', 'ACHIEVE'],
  },

  {
    id: 'rimegepante',
    nomeGenerico: 'Rimegepante',
    nomesComerciais: ['Nurtec ODT', 'Vydura'],
    atcCode: 'N02CD06',
    rxNormCui: '2372509',
    drugBankId: 'DB15152',
    snomedCT: '1186702007',
    casNumber: '1340593-70-5',
    classeTerapeutica: 'antienxaqueca',
    subclasse: 'antagonista_cgrp',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_orodispersivel', concentracao: '75mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Tratamento agudo de enxaqueca com ou sem aura',
      'Profilaxia de enxaqueca episodica (dupla indicacao)',
    ],
    mecanismoAcao: 'Antagonista de receptor CGRP de pequena molecula com dupla indicacao (unico gepant). Formulacao orodispersivel permite administracao sem agua. Meia-vida de 11 horas permite uso tanto agudo quanto profilatico. Nao vasoconstritivo - seguro em pacientes cardiovasculares.',
    posologias: [
      {
        indicacao: 'Enxaqueca aguda',
        adultos: {
          dose: '75mg',
          frequencia: 'Dose unica ao inicio da enxaqueca',
          doseMaxima: '75mg/24h (tratamento agudo)',
          observacoes: 'Colocar na lingua - dissolve sem agua. Nao repetir em menos de 24h para uso agudo.',
        },
      },
      {
        indicacao: 'Profilaxia de enxaqueca',
        adultos: {
          dose: '75mg',
          frequencia: 'Em dias alternados (a cada 48h)',
          observacoes: 'Pode usar dose adicional para tratamento agudo se enxaqueca ocorrer (respeitando intervalo de 24h)',
        },
      },
    ],
    contraindicacoes: [
      'Uso concomitante com inibidores fortes de CYP3A4 (em uso cronico/profilatico)',
      'Hipersensibilidade ao rimegepante',
    ],
    precaucoes: [
      'Insuficiencia hepatica grave - evitar',
      'Insuficiencia renal grave - evitar em profilaxia',
      'Interacoes com inibidores/indutores de CYP3A4',
      'Contém aspartame - cautela em fenilcetonuria',
    ],
    efeitosAdversos: {
      comuns: ['Nausea (2%)', 'Dor abdominal', 'Dispepsia'],
      graves: ['Reacoes de hipersensibilidade (dispneia, rash) - descontinuar'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol, itraconazol)',
        gravidade: 'grave',
        efeito: 'Aumento significativo dos niveis de rimegepante',
        conduta: 'Evitar uso profilatico cronico; pode usar dose unica aguda ocasional',
      },
      {
        medicamento: 'Inibidores moderados de CYP3A4',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis',
        conduta: 'Evitar outra dose de rimegepante em 48h',
      },
      {
        medicamento: 'Indutores fortes/moderados de CYP3A4 (rifampicina)',
        gravidade: 'moderada',
        efeito: 'Reducao da eficacia',
        conduta: 'Evitar combinacao',
      },
      {
        medicamento: 'Inibidores de P-gp e BCRP',
        gravidade: 'leve',
        efeito: 'Aumento potencial dos niveis',
        conduta: 'Monitorar',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '15-30', ajuste: 'Evitar uso profilatico; pode usar para tratamento agudo' },
      { tfg: '<15', ajuste: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Diario de enxaqueca (frequencia e resposta)',
      'Reacoes de hipersensibilidade',
      'Funcao hepatica em uso prolongado',
    ],
    orientacoesPaciente: [
      'Colocar comprimido na lingua - dissolve em segundos sem agua',
      'Nao engolir inteiro',
      'Pode usar para crises E para prevencao',
      'Profilaxia: tomar em dias alternados',
      'Se crise durante profilaxia: aguardar 24h da ultima dose para dose de resgate',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Hepatopatia grave: evitar',
    },
    doencasRelacionadas: ['enxaqueca', 'enxaqueca-episodica'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['rimegepante', 'Nurtec', 'gepant', 'CGRP', 'enxaqueca', 'dupla-indicacao', 'ODT', 'BHV3000'],
  },

  {
    id: 'lasmiditan',
    nomeGenerico: 'Lasmiditan',
    nomesComerciais: ['Reyvow'],
    atcCode: 'N02CC07',
    rxNormCui: '2281317',
    drugBankId: 'DB15052',
    snomedCT: '1156234007',
    casNumber: '439239-90-4',
    classeTerapeutica: 'antienxaqueca',
    subclasse: 'agonista_5ht1f',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Tratamento agudo de enxaqueca com ou sem aura em adultos',
    ],
    mecanismoAcao: 'Agonista seletivo do receptor 5-HT1F (ditan). Primeiro de uma nova classe. Diferente dos triptanos (5-HT1B/1D), nao causa vasoconstrição porque receptores 5-HT1F nao estao presentes em vasos sanguineos. Inibe neurotransmissao trigeminal sem efeitos cardiovasculares. Seguro em pacientes com doenca coronariana onde triptanos sao contraindicados.',
    posologias: [
      {
        indicacao: 'Enxaqueca aguda',
        adultos: {
          dose: '50mg, 100mg ou 200mg',
          frequencia: 'Dose unica ao inicio da enxaqueca',
          doseMaxima: '200mg/24h (dose unica)',
          observacoes: 'Nao repetir em menos de 24h. Escolher dose conforme resposta previa. Nao dirigir por 8 horas apos a dose.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao lasmiditan',
    ],
    precaucoes: [
      'Comprometimento significativo da conducao - nao dirigir por 8 horas',
      'Sindrome serotoninergica com outros serotoninergicos',
      'Potencial de abuso (Schedule V nos EUA)',
      'Nao usar para prevencao',
      'Bradicardia e hipotensao possiveis',
    ],
    efeitosAdversos: {
      comuns: ['Tontura (9-17%)', 'Sonolencia (6-8%)', 'Parestesias (4-6%)', 'Fadiga', 'Nausea', 'Fraqueza muscular'],
      graves: ['Sindrome serotoninergica (raro)', 'Bradicardia sintomatica', 'Comprometimento cognitivo/motor'],
    },
    interacoes: [
      {
        medicamento: 'Serotoninergicos (ISRS, ISRSN, triptanos, tramadol)',
        gravidade: 'grave',
        efeito: 'Risco de sindrome serotoninergica',
        mecanismo: 'Aumento de serotonina',
        conduta: 'Usar com cautela; monitorar sintomas de sindrome serotoninergica',
      },
      {
        medicamento: 'Depressores do SNC (alcool, benzodiazepinicos)',
        gravidade: 'moderada',
        efeito: 'Aumento da sedacao',
        conduta: 'Evitar alcool; cautela com outros depressores',
      },
      {
        medicamento: 'Inibidores de P-gp e BCRP',
        gravidade: 'leve',
        efeito: 'Possivel aumento de niveis',
        conduta: 'Monitorar',
      },
      {
        medicamento: 'Bradicardizantes (betabloqueadores, digoxina)',
        gravidade: 'moderada',
        efeito: 'Risco aumentado de bradicardia',
        conduta: 'Monitorar FC',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - evitar' },
    monitorizacao: [
      'Resposta clinica',
      'Efeitos no SNC (tontura, sonolencia)',
      'Sinais de sindrome serotoninergica',
      'Frequencia cardiaca',
    ],
    orientacoesPaciente: [
      'NAO DIRIGIR por 8 horas apos tomar',
      'Evitar atividades que exijam alerta mental',
      'Pode causar tontura significativa',
      'Tomar ao inicio da enxaqueca',
      'Pode tomar com ou sem alimentos',
      'Alternativa se triptanos contraindicados (doenca cardiaca)',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior sensibilidade a efeitos no SNC; iniciar com 50mg',
      hepatopatas: 'Hepatopatia grave: nao recomendado',
    },
    doencasRelacionadas: ['enxaqueca', 'enxaqueca-com-aura', 'enxaqueca-sem-aura'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['lasmiditan', 'Reyvow', 'ditan', '5-HT1F', 'enxaqueca', 'sem-vasoconstrição', 'SAMURAI', 'SPARTAN'],
  },

  // =============================================================================
  // ESCLEROSE MULTIPLA - ANTICORPOS ANTI-CD20
  // =============================================================================
  {
    id: 'ocrelizumabe',
    nomeGenerico: 'Ocrelizumabe',
    nomesComerciais: ['Ocrevus'],
    atcCode: 'L04AA36',
    rxNormCui: '1876093',
    drugBankId: 'DB12411',
    snomedCT: '735246007',
    casNumber: '637334-45-3',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_cd20',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '300mg/10mL (frasco-ampola)', disponivelSUS: false },
    ],
    indicacoes: [
      'Esclerose multipla recorrente-remitente (EMRR)',
      'Esclerose multipla primariamente progressiva (EMPP) - primeiro tratamento aprovado',
    ],
    mecanismoAcao: 'Anticorpo monoclonal humanizado anti-CD20 que se liga seletivamente a linfocitos B CD20+, causando sua deplecao via citotoxicidade mediada por celulas e complemento, e apoptose direta. Preserva celulas-tronco B e plasmocitos (CD20-negativos). O papel dos linfocitos B na EM inclui apresentacao de antigenos, secrecao de citocinas e producao de autoanticorpos.',
    posologias: [
      {
        indicacao: 'Esclerose multipla (EMRR e EMPP)',
        adultos: {
          dose: 'Dose inicial: 300mg IV seguido de 300mg IV apos 2 semanas; Manutencao: 600mg IV',
          frequencia: 'A cada 6 meses',
          observacoes: 'Pre-medicacao obrigatoria: metilprednisolona 100mg IV + anti-histaminico + antipirérico, 30-60min antes. Primeira infusao em 2,5h; subsequentes podem ser feitas em 2h ou 3,5h conforme protocolo.',
        },
      },
    ],
    contraindicacoes: [
      'Hepatite B ativa',
      'Infeccao ativa grave',
      'Hipersensibilidade ao ocrelizumabe',
      'Doenca maligna ativa',
    ],
    precaucoes: [
      'Reacoes a infusao - comum na primeira dose; pre-medicacao obrigatoria',
      'Reativacao de hepatite B - triagem obrigatoria antes de iniciar',
      'Infeccoes graves (incluindo PML - leucoencefalopatia multifocal progressiva)',
      'Neoplasias malignas - aumento de risco (especialmente cancer de mama)',
      'Vacinacao - completar pelo menos 6 semanas antes de iniciar; evitar vacinas vivas',
      'Imunossupressao prolongada apos descontinuacao',
    ],
    efeitosAdversos: {
      comuns: ['Reacoes a infusao (34-40%)', 'Infeccoes respiratorias superiores', 'Nasofaringite', 'Cefaleia', 'Infeccao urinaria'],
      graves: ['Reacao a infusao grave', 'Infeccoes graves (2-3%)', 'PML', 'Hepatite B reativada', 'Neoplasias'],
    },
    interacoes: [
      {
        medicamento: 'Outros imunossupressores',
        gravidade: 'grave',
        efeito: 'Imunossupressao aditiva',
        conduta: 'Cautela extrema; avaliar washout de terapias previas',
      },
      {
        medicamento: 'Vacinas vivas ou vivas atenuadas',
        gravidade: 'grave',
        efeito: 'Risco de infeccao pelo agente vacinal',
        conduta: 'Contraindicadas durante tratamento e ate B-cells se recuperarem',
      },
      {
        medicamento: 'Vacinas inativadas',
        gravidade: 'moderada',
        efeito: 'Resposta vacinal pode ser reduzida',
        conduta: 'Completar vacinacao 6 semanas antes de iniciar tratamento',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'IgG excretada no leite; deplecao de celulas B no lactente possivel' },
    monitorizacao: [
      'Sorologia para hepatite B antes de iniciar',
      'Hemograma e imunoglobulinas periodicamente',
      'Sinais de infeccao',
      'Durante infusao: sinais vitais, reacoes',
      'Rastreamento de neoplasias conforme idade',
      'Ressonancia magnetica conforme protocolo de EM',
    ],
    orientacoesPaciente: [
      'Infusoes a cada 6 meses em centro de infusao',
      'Primeira infusao dividida em 2 doses (semanas 0 e 2)',
      'Pre-medicacao para prevenir reacoes a infusao',
      'Informar sobre sinais de infeccao',
      'Evitar vacinas de virus vivo',
      'Rastreamento regular de cancer de mama',
    ],
    consideracoesEspeciais: {
      idosos: 'Dados limitados em >55 anos; maior risco de infeccoes',
      hepatopatas: 'Contraindicado em hepatite B ativa',
    },
    doencasRelacionadas: ['esclerose-multipla', 'emrr', 'empp', 'esclerose-multipla-progressiva'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['ocrelizumabe', 'Ocrevus', 'anti-CD20', 'esclerose-multipla', 'EMRR', 'EMPP', 'OPERA', 'ORATORIO'],
  },

  {
    id: 'ofatumumabe',
    nomeGenerico: 'Ofatumumabe',
    nomesComerciais: ['Kesimpta'],
    atcCode: 'L04AA52',
    rxNormCui: '2470679',
    drugBankId: 'DB06650',
    snomedCT: '1153541009',
    casNumber: '679818-59-8',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_cd20',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '20mg/0,4mL (caneta preenchida)', disponivelSUS: false },
    ],
    indicacoes: [
      'Esclerose multipla recorrente-remitente (EMRR)',
      'Esclerose multipla secundariamente progressiva ativa',
      'Sindrome clinicamente isolada (CIS)',
    ],
    mecanismoAcao: 'Anticorpo monoclonal totalmente humano anti-CD20 administrado por via subcutanea. Liga-se a um epitopo distinto do CD20 comparado ao ocrelizumabe/rituximabe, causando deplecao de celulas B por citotoxicidade dependente de complemento e celular. Via subcutanea permite autoadministracao domiciliar mensal. Primeiro anti-CD20 SC para EM.',
    posologias: [
      {
        indicacao: 'Esclerose multipla',
        adultos: {
          dose: 'Semanas 0, 1 e 2: 20mg SC (dose de ataque); Manutencao: 20mg SC',
          frequencia: 'Mensal a partir da semana 4',
          observacoes: 'Tres doses iniciais semanais, depois mensalmente. Primeira dose deve ser supervisionada por profissional de saude. Doses subsequentes podem ser autoadministradas.',
        },
      },
    ],
    contraindicacoes: [
      'Hepatite B ativa',
      'Infeccao grave ativa',
      'Hipersensibilidade ao ofatumumabe',
    ],
    precaucoes: [
      'Reacoes a injecao - geralmente leves; mais comum nas doses iniciais',
      'Triagem obrigatoria para hepatite B antes de iniciar',
      'Infeccoes - incluindo reativacao viral',
      'PML (leucoencefalopatia multifocal progressiva) - monitorar',
      'Vacinacao - evitar vacinas vivas; completar antes de iniciar',
      'Imunossupressao pode persistir por meses apos parar',
    ],
    efeitosAdversos: {
      comuns: ['Reacoes no local da injecao (20%)', 'Cefaleia', 'Reacoes sistemicas relacionadas a injecao (eritema, febre, cefaleia)', 'Infeccoes respiratorias'],
      graves: ['Infeccoes graves', 'PML', 'Reativacao de hepatite B'],
    },
    interacoes: [
      {
        medicamento: 'Outros imunossupressores',
        gravidade: 'grave',
        efeito: 'Imunossupressao aditiva',
        conduta: 'Considerar washout de terapias previas; nao iniciar durante infeccao',
      },
      {
        medicamento: 'Vacinas vivas',
        gravidade: 'grave',
        efeito: 'Risco de infeccao',
        conduta: 'Evitar durante tratamento e apos descontinuacao enquanto celulas B depletadas',
      },
      {
        medicamento: 'Vacinas inativadas',
        gravidade: 'moderada',
        efeito: 'Resposta pode ser reduzida',
        conduta: 'Vacinar preferencialmente antes de iniciar tratamento',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'IgG excretada no leite; potencial deplecao de celulas B no lactente' },
    monitorizacao: [
      'Sorologia hepatite B antes de iniciar',
      'Imunoglobulinas periodicamente',
      'Sinais e sintomas de infeccao',
      'Sinais de PML (alteracoes cognitivas, visuais, motoras)',
      'RNM conforme protocolo de EM',
    ],
    orientacoesPaciente: [
      'Injecao subcutanea mensal (autoadministracao possivel)',
      'Primeira dose supervisionada',
      'Tres doses nas 3 primeiras semanas, depois mensal',
      'Guardar na geladeira; retirar 15-30min antes',
      'Alternar locais de injecao (abdome, coxa, braco)',
      'Informar sinais de infeccao',
    ],
    consideracoesEspeciais: {
      idosos: 'Dados limitados; maior risco de infeccoes',
      hepatopatas: 'Hepatite B ativa: contraindicado',
    },
    doencasRelacionadas: ['esclerose-multipla', 'emrr', 'emsp', 'cis'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['ofatumumabe', 'Kesimpta', 'anti-CD20', 'esclerose-multipla', 'subcutaneo', 'autoadministracao', 'ASCLEPIOS'],
  },

  // =============================================================================
  // DOENCA DE PARKINSON - NOVOS ADJUVANTES
  // =============================================================================
  {
    id: 'opicapona',
    nomeGenerico: 'Opicapona',
    nomesComerciais: ['Ongentys'],
    atcCode: 'N04BX04',
    rxNormCui: '2055398',
    drugBankId: 'DB11695',
    snomedCT: '724035005',
    casNumber: '923287-50-7',
    classeTerapeutica: 'antiparkinsoniano',
    subclasse: 'inibidor_comt',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '50mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Doenca de Parkinson - tratamento adjuvante a levodopa/carbidopa em pacientes com flutuacoes motoras de fim de dose (wearing-off)',
    ],
    mecanismoAcao: 'Inibidor periferico, seletivo e reversivel da catecol-O-metiltransferase (COMT) de terceira geracao. A inibicao da COMT reduz a metabolizacao da levodopa em 3-O-metildopa, aumentando sua biodisponibilidade e prolongando sua meia-vida. Diferente da entacapona, tem meia-vida longa (1-2h de acao, mas efeito inibitorio prolongado) permitindo dose unica diaria. Nao requer coadministracao com cada dose de levodopa.',
    posologias: [
      {
        indicacao: 'Flutuacoes motoras em Parkinson',
        adultos: {
          dose: '50mg',
          frequencia: '1x/dia, ao deitar',
          doseMaxima: '50mg/dia',
          observacoes: 'Tomar pelo menos 1 hora antes ou apos a levodopa. Ao deitar para minimizar efeitos dopaminergicos. Pode ser necessario reduzir dose de levodopa em 10-30%.',
        },
        idosos: {
          dose: '50mg ao deitar',
          observacoes: 'Sem ajuste; monitorar discinesias',
        },
      },
    ],
    contraindicacoes: [
      'Feocromocitoma, paraganglioma',
      'Historia de sindrome neuroleptica maligna ou rabdomiolise',
      'Uso concomitante de IMAO nao-seletivos',
      'Hepatopatia grave',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Pode aumentar efeitos dopaminergicos da levodopa (discinesias, nausea, hipotensao)',
      'Sindrome de desregulacao dopaminergica (comportamentos compulsivos)',
      'Hipotensao ortostatica - especialmente no inicio',
      'Sonolencia e ataques subitos de sono',
      'Hepatotoxicidade - monitorar funcao hepatica',
      'Alucinacoes e psicose - especialmente em idosos',
    ],
    efeitosAdversos: {
      comuns: ['Discinesias (20%)', 'Constipacao', 'Hipotensao ortostatica', 'Insonia', 'Xerostomia', 'Nausea'],
      graves: ['Discinesias graves', 'Alucinacoes', 'Comportamentos compulsivos (jogo, hipersexualidade)', 'Hepatotoxicidade'],
    },
    interacoes: [
      {
        medicamento: 'IMAO nao-seletivos (fenelzina, tranilcipromina)',
        gravidade: 'contraindicada',
        efeito: 'Risco de crise hipertensiva',
        conduta: 'Contraindicado uso concomitante',
      },
      {
        medicamento: 'IMAO-B seletivos (selegilina, rasagilina)',
        gravidade: 'moderada',
        efeito: 'Pode ser combinado com cautela',
        conduta: 'Monitorar; combinacao e comum em Parkinson',
      },
      {
        medicamento: 'Substratos de COMT (dobutamina, adrenalina, isoprenalina)',
        gravidade: 'moderada',
        efeito: 'Potencializacao dos efeitos das catecolaminas',
        conduta: 'Reduzir dose das catecolaminas se necessario',
      },
      {
        medicamento: 'Varfarina',
        gravidade: 'moderada',
        efeito: 'Possivel alteracao do INR',
        conduta: 'Monitorar INR ao iniciar opicapona',
      },
      {
        medicamento: 'Levodopa',
        gravidade: 'moderada',
        efeito: 'Aumento do efeito da levodopa (intencional - este e o objetivo do tratamento)',
        conduta: 'Pode ser necessario reduzir levodopa em 10-30% para evitar discinesias',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar - dados insuficientes' },
    monitorizacao: [
      'Funcao hepatica (baseline e periodicamente no primeiro ano)',
      'Discinesias e efeitos dopaminergicos',
      'Pressao arterial ortostatica',
      'Comportamentos compulsivos',
      'Qualidade do sono e sonolencia diurna',
    ],
    orientacoesPaciente: [
      'Tomar ao deitar, 1 hora apos a ultima dose de levodopa',
      'Pode aumentar movimentos involuntarios - informar medico',
      'Levantar-se lentamente (risco de tontura)',
      'Informar sobre comportamentos incomuns (jogo, compras excessivas)',
      'Evitar dirigir se sonolencia',
    ],
    consideracoesEspeciais: {
      idosos: 'Populacao-alvo; monitorar alucinacoes e quedas',
      hepatopatas: 'Moderada: usar com cautela; grave: contraindicado',
    },
    doencasRelacionadas: ['doenca-de-parkinson', 'parkinson', 'flutuacoes-motoras', 'wearing-off'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['opicapona', 'Ongentys', 'COMT', 'Parkinson', 'wearing-off', 'BIPARK'],
  },

  {
    id: 'safinamida',
    nomeGenerico: 'Safinamida',
    nomesComerciais: ['Xadago'],
    atcCode: 'N04BD03',
    rxNormCui: '1798302',
    drugBankId: 'DB06654',
    snomedCT: '713465002',
    casNumber: '133865-89-1',
    classeTerapeutica: 'antiparkinsoniano',
    subclasse: 'imao_b',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Doenca de Parkinson - tratamento adjuvante a levodopa em pacientes com flutuacoes motoras',
    ],
    mecanismoAcao: 'Inibidor seletivo e reversivel da MAO-B com mecanismo de acao dual: (1) Inibicao da MAO-B aumenta niveis de dopamina no estriado; (2) Modulacao da liberacao de glutamato atraves do bloqueio de canais de sodio voltagem-dependentes. Este mecanismo dual pode oferecer beneficios adicionais comparado a IMAO-B puros (selegilina, rasagilina). Pode ter efeitos antidiscinéticos via acao glutamatergica.',
    posologias: [
      {
        indicacao: 'Parkinson com flutuacoes motoras',
        adultos: {
          dose: 'Iniciar 50mg/dia; apos 2 semanas pode aumentar para 100mg/dia',
          frequencia: '1x/dia (manha)',
          doseMaxima: '100mg/dia',
          observacoes: 'Pode ser tomado com ou sem alimentos. Ajuste de levodopa pode ser necessario.',
        },
      },
    ],
    contraindicacoes: [
      'Uso de outros IMAO (IMAO-A, IMAO nao-seletivos)',
      'Uso de opioides (petidina, tramadol, tapentadol, metadona)',
      'Insuficiencia hepatica grave',
      'Uso de dextrometorfano',
      'Albinismo, degeneracao retiniana, uveite, retinopatia hereditaria',
    ],
    precaucoes: [
      'Interacoes com serotoninergicos - sindrome serotoninergica',
      'Restricao dietetica de tiramina geralmente nao necessaria em doses aprovadas',
      'Degeneracao retiniana - exame oftalmologico recomendado',
      'Comportamentos compulsivos (sindrome de desregulacao dopaminergica)',
      'Alucinacoes - especialmente em idosos',
      'Hipotensao ortostatica',
    ],
    efeitosAdversos: {
      comuns: ['Discinesias', 'Nausea', 'Quedas', 'Insonia', 'Hipotensao ortostatica', 'Catarata'],
      graves: ['Sindrome serotoninergica (com serotoninergicos)', 'Alucinacoes', 'Comportamentos compulsivos', 'Hipertensao (raro, com tiramina)'],
    },
    interacoes: [
      {
        medicamento: 'IMAO (fenelzina, tranilcipromina, selegilina, rasagilina)',
        gravidade: 'contraindicada',
        efeito: 'Crise hipertensiva, sindrome serotoninergica',
        conduta: 'Aguardar 14 dias entre troca de IMAO',
      },
      {
        medicamento: 'Opioides (petidina, tramadol, tapentadol)',
        gravidade: 'contraindicada',
        efeito: 'Sindrome serotoninergica, crise hipertensiva',
        conduta: 'Uso contraindicado',
      },
      {
        medicamento: 'Dextrometorfano',
        gravidade: 'contraindicada',
        efeito: 'Reacoes graves tipo sindrome serotoninergica',
        conduta: 'Evitar antitussigenos com dextrometorfano',
      },
      {
        medicamento: 'ISRS, ISRSN, antidepressivos triciclicos',
        gravidade: 'grave',
        efeito: 'Risco de sindrome serotoninergica',
        conduta: 'Usar com extrema cautela; monitorar',
      },
      {
        medicamento: 'Simpaticomiméticos (pseudoefedrina, fenilefrina)',
        gravidade: 'moderada',
        efeito: 'Risco de hipertensao',
        conduta: 'Evitar descongestionantes',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar - dados insuficientes' },
    monitorizacao: [
      'Exame oftalmologico (baseline e periodicamente)',
      'Discinesias e efeitos dopaminergicos',
      'Comportamentos compulsivos',
      'Pressao arterial',
      'Sinais de sindrome serotoninergica se em uso de serotoninergicos',
    ],
    orientacoesPaciente: [
      'Tomar 1x ao dia pela manha',
      'Informar sobre todos os medicamentos em uso (muitas interacoes)',
      'Evitar antitussigenos com dextrometorfano',
      'Levantar-se lentamente',
      'Informar sobre comportamentos incomuns',
      'Fazer exames oftalmologicos conforme orientado',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de alucinacoes e quedas',
      hepatopatas: 'Moderada: maximo 50mg/dia; grave: contraindicado',
    },
    doencasRelacionadas: ['doenca-de-parkinson', 'parkinson', 'flutuacoes-motoras'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['safinamida', 'Xadago', 'MAO-B', 'Parkinson', 'dual-mecanismo', 'SETTLE'],
  },

  // =============================================================================
  // ATROFIA MUSCULAR ESPINHAL - TERAPIA GENETICA
  // =============================================================================
  {
    id: 'nusinersen',
    nomeGenerico: 'Nusinersen',
    nomesComerciais: ['Spinraza'],
    atcCode: 'N07XX16',
    rxNormCui: '1872988',
    drugBankId: 'DB12327',
    snomedCT: '735081008',
    casNumber: '1258984-36-9',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '12mg/5mL (intratecal)', disponivelSUS: true },
    ],
    indicacoes: [
      'Atrofia muscular espinhal 5q (AME) - todos os tipos (I, II, III, IV)',
      'Pacientes com mutacao no gene SMN1',
    ],
    mecanismoAcao: 'Oligonucleotideo antisense (ASO) de 18 nucleotideos modificado (2\'O-metoxietil). Modula o splicing do pre-mRNA do gene SMN2, promovendo inclusao do exon 7 que normalmente e excluido. Isso resulta em producao de proteina SMN (survival motor neuron) funcional, compensando a deficiencia causada pela mutacao em SMN1. Primeiro tratamento modificador de doença aprovado para AME (2016).',
    posologias: [
      {
        indicacao: 'Atrofia muscular espinhal',
        adultos: {
          dose: '12mg por administracao',
          frequencia: 'Intratecal - Doses de ataque: Dias 0, 14, 28, 63; Manutencao: a cada 4 meses',
          observacoes: 'Administracao por puncao lombar. Volume total de 5mL em bolus por 1-3 minutos. Paciente deve permanecer em decubito por 1 hora apos.',
        },
        pediatrico: {
          dose: '12mg por administracao (mesma dose para todas as idades)',
          frequencia: 'Intratecal - Dias 0, 14, 28, 63; depois a cada 4 meses',
          observacoes: 'Aprovado para todas as idades, incluindo neonatos',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao nusinersen',
    ],
    precaucoes: [
      'Administracao intratecal - risco de cefaleia pos-puncao, infeccao, sangramento',
      'Trombocitopenia e coagulopatias - monitorar plaquetas e coagulacao',
      'Toxicidade renal potencial - monitorar proteinuria',
      'Escoliose grave pode dificultar acesso intratecal',
      'Pode ser necessario acesso alternativo (cervical, foramen magno) em escoliose',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia pos-puncao lombar', 'Dor lombar', 'Vomitos', 'Infeccao respiratoria inferior'],
      graves: ['Trombocitopenia', 'Coagulopatia', 'Toxicidade renal (proteinuria)', 'Meningite (raro)', 'Hidrocefalia comunicante (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Nao ha interacoes farmacocineticas conhecidas',
        gravidade: 'leve',
        efeito: 'ASOs nao sao metabolizados por CYP450',
        conduta: 'Monitorar funcao renal se uso de nefrotoxicos concomitantes',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste; monitorar proteinuria' },
      { tfg: '<30', ajuste: 'Dados limitados; monitorar funcao renal rigorosamente' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; provavelmente seguro devido a baixa exposicao sistemica' },
    monitorizacao: [
      'Plaquetas antes de cada dose (trombocitopenia)',
      'Testes de coagulacao (TP, TTPa) antes de cada dose',
      'Proteinuria (urina tipo I) antes de cada dose',
      'Funcao respiratoria',
      'Marcos motores (escalas funcionais: CHOP-INTEND, HFMSE, RULM)',
      'Cefaleia e sinais de vazamento de LCR apos procedimento',
    ],
    orientacoesPaciente: [
      'Tratamento intratecal (injecao na coluna) a cada 4 meses apos doses iniciais',
      'Procedimento em ambiente hospitalar',
      'Permanecer deitado 1 hora apos procedimento',
      'Informar sobre sinais de infeccao ou sangramento',
      'Beneficio maximo em pacientes tratados precocemente',
    ],
    consideracoesEspeciais: {
      idosos: 'AME tipo IV (adulto): mesma dose; monitorar funcao renal',
      pediatrico: 'Aprovado desde neonatos; quanto mais precoce, melhor resposta. Dose padrao de 12mg independente de peso/idade.',
      hepatopatas: 'Sem ajuste; nao metabolizado hepaticamente',
    },
    doencasRelacionadas: ['ame', 'atrofia-muscular-espinhal', 'sma', 'ame-tipo-1', 'ame-tipo-2', 'ame-tipo-3'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['nusinersen', 'Spinraza', 'ASO', 'AME', 'SMA', 'SMN', 'terapia-genetica', 'ENDEAR', 'CHERISH'],
  },
];
