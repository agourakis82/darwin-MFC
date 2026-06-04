/**
 * GASTROINTESTINAL NOVOS - DARWIN-MFC EXPANSAO 1000
 * ==================================================
 * Novos agentes gastrointestinais (P-CABs, biologicos, procineticos, secretagogos)
 *
 * Referencias:
 * - PHALCON-EE/HP trials (Vonoprazan)
 * - GEMINI trials (Vedolizumab)
 * - TARGET-IBS (Rifaximin)
 * - Linaclotide Phase III (COMPOSE-1/2)
 * - Plecanatide trials
 * - IBS-3001/3002 (Eluxadoline)
 * - Alosetron REMS
 * - PRISM trials (Prucalopride)
 * - Amitiza Phase III (Lubiprostone)
 * - CLARINET (Lanreotide)
 * - BUDENOFALK studies
 * - UDCA meta-analyses
 */

import { Medicamento } from '@/lib/types/medicamento';

export const gastrointestinalNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // P-CAB (POTASSIUM-COMPETITIVE ACID BLOCKER)
  // =============================================================================
  {
    id: 'vonoprazan',
    nomeGenerico: 'Vonoprazan',
    nomesComerciais: ['Takecab', 'Voquezna'],
    atcCode: 'A02BX13',
    rxNormCui: '1812167',
    drugBankId: 'DB11752',
    snomedCT: '772882001',
    casNumber: '881681-00-1',
    classeTerapeutica: 'inibidor_bomba_protonica',
    subclasse: 'ibp',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
    ],
    indicacoes: [
      'DRGE erosiva e nao erosiva',
      'Erradicacao de H. pylori (terapia dupla ou tripla)',
      'Ulcera peptica',
      'Sindrome de Zollinger-Ellison',
      'Prevencao de ulcera por AINEs',
      'Esofagite erosiva refrataria a IBPs tradicionais',
    ],
    mecanismoAcao: 'Bloqueador acido-competitivo de potassio (P-CAB). Liga-se de forma competitiva e reversivel ao sitio de ligacao do potassio da H+/K+-ATPase. Diferente dos IBPs: nao requer ativacao acida, inicio de acao mais rapido (1-2h), inibicao mais potente e sustentada da secrecao acida, eficaz independente das refeicoes. Meia-vida mais longa permite supressao acida noturna superior.',
    posologias: [
      {
        indicacao: 'DRGE/Esofagite erosiva',
        adultos: {
          dose: '20mg',
          frequencia: '1x/dia por 4-8 semanas',
          doseMaxima: '20mg/dia',
          observacoes: 'Pode tomar com ou sem alimentos. Manutencao: 10mg/dia.',
        },
      },
      {
        indicacao: 'Erradicacao H. pylori (terapia dupla)',
        adultos: {
          dose: '20mg + amoxicilina 1g',
          frequencia: '3x/dia por 14 dias',
          observacoes: 'Terapia dupla com vonoprazan demonstrou eficacia similar a tripla com IBP.',
        },
      },
      {
        indicacao: 'Erradicacao H. pylori (terapia tripla)',
        adultos: {
          dose: '20mg + claritromicina 500mg + amoxicilina 1g',
          frequencia: '2x/dia por 7-14 dias',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao vonoprazan',
      'Uso concomitante com rilpivirina',
      'Uso concomitante com atazanavir',
    ],
    precaucoes: [
      'Pode mascarar sintomas de neoplasia gastrica',
      'Risco de C. difficile',
      'Hipomagnesemia em uso prolongado',
      'Uso prolongado: risco de fraturas, deficiencia B12',
      'Interacoes via CYP3A4 e CYP2B6',
    ],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Nasofaringite', 'Cefaleia', 'Constipacao', 'Dor abdominal'],
      graves: ['Colite por C. difficile', 'Hipomagnesemia grave', 'Reacoes de hipersensibilidade'],
    },
    interacoes: [
      {
        medicamento: 'Rilpivirina',
        gravidade: 'contraindicada',
        efeito: 'Reducao significativa da absorcao de rilpivirina',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Atazanavir',
        gravidade: 'contraindicada',
        efeito: 'Reducao da absorcao e eficacia do atazanavir',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Metotrexato',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de metotrexato',
        conduta: 'Considerar suspensao temporaria do vonoprazan',
      },
      {
        medicamento: 'Clopidogrel',
        gravidade: 'leve',
        efeito: 'Menor interacao que com IBPs tradicionais',
        conduta: 'Monitorar; vonoprazan tem menor efeito sobre CYP2C19',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Sem ajuste necessario; cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; evitar' },
    monitorizacao: [
      'Sintomas de DRGE',
      'Magnesio serico em uso prolongado',
      'Sintomas de infeccao GI',
      'B12 em uso prolongado',
    ],
    orientacoesPaciente: [
      'Pode tomar com ou sem alimentos',
      'Efeito mais rapido que omeprazol',
      'Nao mastigar ou partir o comprimido',
      'Informar medico sobre todos medicamentos em uso',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico; monitorar funcao renal',
      hepatopatas: 'Child-Pugh A/B: sem ajuste; Child-Pugh C: cautela',
    },
    doencasRelacionadas: ['drge', 'ulcera-peptica', 'h-pylori', 'zollinger-ellison'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['vonoprazan', 'P-CAB', 'DRGE', 'H-pylori', 'PHALCON', 'supressor-acido'],
  },

  // =============================================================================
  // BIOLOGICOS - ANTI-INTEGRINA
  // =============================================================================
  {
    id: 'vedolizumab',
    nomeGenerico: 'Vedolizumab',
    nomesComerciais: ['Entyvio'],
    atcCode: 'L04AA33',
    rxNormCui: '1535220',
    drugBankId: 'DB09033',
    snomedCT: '710287009',
    casNumber: '943609-66-3',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_integrina',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '300mg (frasco-ampola IV)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '108mg (seringa preenchida)', disponivelSUS: false },
    ],
    indicacoes: [
      'Retocolite ulcerativa moderada a grave',
      'Doenca de Crohn moderada a grave',
      'Falha ou intolerancia a terapia convencional ou anti-TNF',
      'Manutencao de remissao em DII',
      'Pouchite cronica (off-label)',
    ],
    mecanismoAcao: 'Anticorpo monoclonal humanizado IgG1 que se liga especificamente a integrina alfa4-beta7, expressa predominantemente em linfocitos T auxiliares do intestino. Bloqueia a interacao com MAdCAM-1 no endotelio intestinal, impedindo a migracao de linfocitos para o tecido GI. Seletividade intestinal (gut-selective) reduz risco de imunossupressao sistemica e LMP.',
    posologias: [
      {
        indicacao: 'RCU/Crohn - Inducao IV',
        adultos: {
          dose: '300mg IV',
          frequencia: 'Semanas 0, 2 e 6',
          observacoes: 'Infusao em 30 minutos. Avaliar resposta na semana 6-14.',
        },
      },
      {
        indicacao: 'RCU/Crohn - Manutencao IV',
        adultos: {
          dose: '300mg IV',
          frequencia: 'A cada 8 semanas',
          observacoes: 'Alguns pacientes podem necessitar a cada 4 semanas.',
        },
      },
      {
        indicacao: 'Manutencao SC (apos inducao IV)',
        adultos: {
          dose: '108mg SC',
          frequencia: 'A cada 2 semanas',
          observacoes: 'Iniciar apos pelo menos 2 infusoes IV. Auto-aplicacao apos treinamento.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao vedolizumab',
      'Infeccoes graves ativas (sepse, TB ativa, infeccoes oportunistas)',
      'Leucoencefalopatia multifocal progressiva (LMP)',
    ],
    precaucoes: [
      'Triagem para TB antes do inicio',
      'Risco de infeccoes (especialmente respiratorias)',
      'Reacoes infusionais',
      'Imunizacoes devem ser atualizadas antes do inicio',
      'Evitar vacinas vivas durante tratamento',
    ],
    efeitosAdversos: {
      comuns: ['Nasofaringite', 'Cefaleia', 'Artralgia', 'Nausea', 'Febre', 'Fadiga', 'Infeccao trato respiratorio superior'],
      graves: ['Reacoes infusionais graves', 'Infeccoes graves', 'LMP (muito raro)', 'Hepatotoxicidade'],
    },
    interacoes: [
      {
        medicamento: 'Vacinas vivas',
        gravidade: 'grave',
        efeito: 'Risco de infeccao por vacina',
        conduta: 'Evitar vacinas vivas; atualizar imunizacoes antes do inicio',
      },
      {
        medicamento: 'Outros imunossupressores',
        gravidade: 'moderada',
        efeito: 'Risco aditivo de infeccoes',
        conduta: 'Monitorar; pode ser usado com azatioprina ou metotrexato',
      },
      {
        medicamento: 'Anti-TNF (infliximabe, adalimumabe)',
        gravidade: 'moderada',
        efeito: 'Nao ha dados de uso combinado; risco teorico de imunossupressao excessiva',
        conduta: 'Nao recomendado uso concomitante',
      },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Quantidades minimas no leite; provavelmente seguro' },
    monitorizacao: [
      'Sinais de infeccao',
      'PPD ou IGRA antes do inicio',
      'Funcao hepatica',
      'Reacoes infusionais durante administracao',
      'Resposta clinica (Mayo score, CDAI)',
    ],
    orientacoesPaciente: [
      'Tratamento de longo prazo para controle da doenca',
      'Informar sintomas de infeccao',
      'Evitar vacinas vivas',
      'SC pode ser auto-aplicado apos treinamento',
      'Acompanhamento regular obrigatorio',
    ],
    consideracoesEspeciais: {
      idosos: 'Dados limitados em >65 anos; monitorar infeccoes',
      hepatopatas: 'Sem ajuste especifico; monitorar',
    },
    doencasRelacionadas: ['retocolite-ulcerativa', 'doenca-crohn', 'dii'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['vedolizumab', 'anti-integrina', 'DII', 'RCU', 'Crohn', 'GEMINI', 'biologico'],
  },

  // =============================================================================
  // ANTIBIOTICO INTESTINAL
  // =============================================================================
  {
    id: 'rifaximin',
    nomeGenerico: 'Rifaximina',
    nomesComerciais: ['Xifaxan', 'Flonorm'],
    atcCode: 'A07AA11',
    rxNormCui: '337540',
    drugBankId: 'DB01220',
    snomedCT: '420756003',
    casNumber: '80621-81-4',
    classeTerapeutica: 'antibiotico',
    subclasse: 'rifamicina',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '550mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Encefalopatia hepatica - reducao de recorrencia',
      'Sindrome do intestino irritavel com diarreia (SII-D)',
      'Diarreia do viajante por E. coli nao invasiva',
      'Supercrescimento bacteriano intestinal (SIBO)',
      'Diverticulite nao complicada (off-label)',
    ],
    mecanismoAcao: 'Derivado da rifamicina com absorcao intestinal minima (<0,4%). Inibe a sintese de RNA bacteriano ligando-se a subunidade beta da RNA polimerase. Age localmente no lumen intestinal com efeito sistemico minimo. Eficaz contra gram-positivos e gram-negativos. Modula microbiota intestinal sem erradicacao significativa.',
    posologias: [
      {
        indicacao: 'Encefalopatia hepatica',
        adultos: {
          dose: '550mg',
          frequencia: '2x/dia',
          observacoes: 'Uso cronico para prevencao de recorrencia. Associar com lactulose.',
        },
      },
      {
        indicacao: 'SII com diarreia',
        adultos: {
          dose: '550mg',
          frequencia: '3x/dia por 14 dias',
          observacoes: 'Pode repetir curso se recorrencia dos sintomas. TARGET-3 permitiu ate 2 retratamentos.',
        },
      },
      {
        indicacao: 'Diarreia do viajante',
        adultos: {
          dose: '200mg',
          frequencia: '3x/dia por 3 dias',
          observacoes: 'Apenas para diarreia nao invasiva (sem febre/sangue).',
        },
      },
      {
        indicacao: 'SIBO',
        adultos: {
          dose: '550mg',
          frequencia: '3x/dia por 14 dias',
          observacoes: 'Pode necessitar cursos repetidos.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a rifaximina ou rifamicinas',
      'Diarreia com febre ou sangue nas fezes (suspeita de patogeno invasivo)',
    ],
    precaucoes: [
      'Hepatopatia grave (Child-Pugh C) - aumento da exposicao sistemica',
      'Superinfeccao por C. difficile',
      'Nao usar em diarreia invasiva',
      'Resistencia a rifamicinas (relevancia clinica incerta)',
    ],
    efeitosAdversos: {
      comuns: ['Edema periferico', 'Nausea', 'Cefaleia', 'Ascite', 'Fadiga', 'Tontura'],
      graves: ['Colite por C. difficile', 'Reacoes de hipersensibilidade', 'Angioedema (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Varfarina',
        gravidade: 'moderada',
        efeito: 'Pode induzir CYP3A4 localmente, mas efeito sistemico minimo',
        conduta: 'Monitorar INR se uso concomitante',
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de rifaximina (substrato glicoproteina-P)',
        conduta: 'Monitorar efeitos adversos da rifaximina',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario (absorcao minima)' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorcao sistemica minima; provavelmente seguro' },
    monitorizacao: [
      'Melhora dos sintomas',
      'Sinais de infeccao invasiva',
      'Funcao hepatica em hepatopatas',
      'Recorrencia de encefalopatia hepatica',
    ],
    orientacoesPaciente: [
      'Pode tomar com ou sem alimentos',
      'Nao para diarreia com febre ou sangue',
      'Completar o curso prescrito',
      'Encefalopatia hepatica: uso continuo de longo prazo',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Child-Pugh C: exposicao sistemica aumentada; indicacao principal (EH) requer uso',
    },
    doencasRelacionadas: ['encefalopatia-hepatica', 'sii-diarreia', 'sibo', 'diarreia-viajante'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['rifaximina', 'antibiotico-intestinal', 'encefalopatia-hepatica', 'SII', 'SIBO', 'TARGET'],
  },

  // =============================================================================
  // AGONISTAS GC-C (GUANILATO CICLASE C)
  // =============================================================================
  {
    id: 'linaclotide',
    nomeGenerico: 'Linaclotide',
    nomesComerciais: ['Linzess', 'Constella'],
    atcCode: 'A06AX04',
    rxNormCui: '1235587',
    drugBankId: 'DB08890',
    snomedCT: '704226002',
    casNumber: '851199-59-2',
    classeTerapeutica: 'laxante',
    subclasse: 'agonista_gc_c',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '72mcg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '145mcg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '290mcg', disponivelSUS: false },
    ],
    indicacoes: [
      'Sindrome do intestino irritavel com constipacao (SII-C)',
      'Constipacao idiopatica cronica (CIC)',
    ],
    mecanismoAcao: 'Peptideo agonista da guanilato ciclase C (GC-C) nos enterocitos. Aumenta GMPc intracelular, ativando CFTR e causando secrecao de cloreto e bicarbonato para o lumen, com aumento de agua nas fezes. O GMPc tambem reduz a atividade de fibras aferentes viscerais, diminuindo dor abdominal. Acao local (absorcao sistemica minima).',
    posologias: [
      {
        indicacao: 'SII com constipacao',
        adultos: {
          dose: '290mcg',
          frequencia: '1x/dia em jejum, 30min antes da primeira refeicao',
          observacoes: 'Tomar pelo menos 30 minutos antes do cafe da manha.',
        },
      },
      {
        indicacao: 'Constipacao idiopatica cronica',
        adultos: {
          dose: '145mcg',
          frequencia: '1x/dia em jejum',
          observacoes: 'Pode aumentar para 290mcg se resposta insuficiente.',
        },
      },
    ],
    contraindicacoes: [
      'Criancas <6 anos (evitar)',
      'Obstrucao intestinal mecanica conhecida ou suspeita',
      'Hipersensibilidade ao linaclotide',
    ],
    precaucoes: [
      'Criancas 6-17 anos: evitar (diarreia grave)',
      'Diarreia intensa no inicio - pode necessitar reducao de dose',
      'Desidratacao em pacientes suscetiveis',
    ],
    efeitosAdversos: {
      comuns: ['Diarreia (16-20%)', 'Dor abdominal', 'Flatulencia', 'Distensao abdominal'],
      graves: ['Diarreia grave/desidratacao', 'Reacoes de hipersensibilidade'],
    },
    interacoes: [
      {
        medicamento: 'Alimentos',
        gravidade: 'moderada',
        efeito: 'Alimentos aumentam incidencia de diarreia',
        conduta: 'Tomar em jejum, 30min antes do cafe',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario (absorcao minima)' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorcao sistemica minima; provavelmente seguro' },
    monitorizacao: [
      'Frequencia e consistencia das evacuacoes',
      'Sintomas abdominais',
      'Sinais de desidratacao se diarreia intensa',
    ],
    orientacoesPaciente: [
      'Tomar em jejum, pelo menos 30 minutos antes de comer',
      'Diarreia pode ocorrer, especialmente no inicio',
      'Engolir capsula inteira',
      'Nao dar para criancas',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste; monitorar desidratacao',
      pediatrico: 'Contraindicado <6 anos; evitar 6-17 anos',
    },
    doencasRelacionadas: ['sii-constipacao', 'constipacao-idiopatica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['linaclotide', 'GC-C', 'SII-C', 'constipacao', 'secretagogo'],
  },

  {
    id: 'plecanatide',
    nomeGenerico: 'Plecanatide',
    nomesComerciais: ['Trulance'],
    atcCode: 'A06AX05',
    rxNormCui: '1860480',
    drugBankId: 'DB12407',
    snomedCT: '784861005',
    casNumber: '467426-54-6',
    classeTerapeutica: 'laxante',
    subclasse: 'agonista_gc_c',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '3mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Sindrome do intestino irritavel com constipacao (SII-C)',
      'Constipacao idiopatica cronica (CIC)',
    ],
    mecanismoAcao: 'Analogo da uroguanilina que ativa GC-C nos enterocitos. Aumenta GMPc, estimulando secrecao de fluido intestinal e acelerando transito. Maxima atividade em pH 5-6 (duodeno proximal), mimetizando a uroguanilina endogena. Pode ter perfil de efeitos adversos mais favoravel que linaclotide.',
    posologias: [
      {
        indicacao: 'SII-C ou CIC',
        adultos: {
          dose: '3mg',
          frequencia: '1x/dia com ou sem alimentos',
          observacoes: 'Pode tomar em qualquer horario. Comprimido pode ser esmagado para administracao via sonda.',
        },
      },
    ],
    contraindicacoes: [
      'Criancas <6 anos',
      'Obstrucao intestinal mecanica',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Criancas 6-17 anos: evitar',
      'Diarreia - pode ocorrer',
      'Desidratacao em pacientes suscetiveis',
    ],
    efeitosAdversos: {
      comuns: ['Diarreia (4-5%)', 'Distensao abdominal', 'Flatulencia', 'Dor abdominal'],
      graves: ['Diarreia grave', 'Desidratacao'],
    },
    interacoes: [],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorcao sistemica minima' },
    monitorizacao: [
      'Frequencia de evacuacoes',
      'Sintomas abdominais',
      'Hidratacao',
    ],
    orientacoesPaciente: [
      'Pode tomar com ou sem alimentos',
      'Unica dose diaria',
      'Diarreia menos comum que com linaclotide',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste',
      pediatrico: 'Contraindicado <6 anos',
    },
    doencasRelacionadas: ['sii-constipacao', 'constipacao-idiopatica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['plecanatide', 'GC-C', 'SII-C', 'constipacao', 'uroguanilina'],
  },

  // =============================================================================
  // OPIOIDES MISTOS / MODULADORES
  // =============================================================================
  {
    id: 'eluxadoline',
    nomeGenerico: 'Eluxadoline',
    nomesComerciais: ['Viberzi', 'Truberzi'],
    atcCode: 'A07DA06',
    rxNormCui: '1741122',
    drugBankId: 'DB09203',
    snomedCT: '716087002',
    casNumber: '864821-90-9',
    classeTerapeutica: 'antidiarreico',
    subclasse: 'opioide_periferico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Sindrome do intestino irritavel com diarreia (SII-D)',
    ],
    mecanismoAcao: 'Agonista misto de receptores opioides: agonista dos receptores mu e kappa (reduz motilidade e secrecao) e antagonista do receptor delta (contrabalanca constipacao excessiva). Age localmente no trato GI com biodisponibilidade sistemica minima. Reduz diarreia e dor abdominal.',
    posologias: [
      {
        indicacao: 'SII com diarreia',
        adultos: {
          dose: '100mg',
          frequencia: '2x/dia com alimentos',
          doseMaxima: '200mg/dia',
          observacoes: 'Dose de 75mg 2x/dia para pacientes que nao toleram 100mg ou em uso concomitante de inibidores de OATP1B1.',
        },
      },
    ],
    contraindicacoes: [
      'Pacientes sem vesicula biliar (colecistectomizados)',
      'Estenose do esfíncter de Oddi conhecida ou suspeita',
      'Alcoolismo ou uso abusivo de alcool (>3 doses/dia)',
      'Pancreatite ou doenca pancreatica estrutural',
      'Hepatopatia grave (Child-Pugh C)',
      'Constipacao grave ou obstrucao intestinal',
      'Historia de pancreatite relacionada ao uso',
    ],
    precaucoes: [
      'RISCO DE PANCREATITE - maior em pacientes sem vesicula',
      'Espasmo do esfincter de Oddi',
      'Hepatopatia leve/moderada - usar dose reduzida',
      'Uso de opioides - pode reduzir eficacia',
    ],
    efeitosAdversos: {
      comuns: ['Constipacao', 'Nausea', 'Dor abdominal', 'Infeccao trato respiratorio superior'],
      graves: ['Pancreatite', 'Espasmo do esfincter de Oddi', 'Hepatotoxicidade', 'Reacoes de hipersensibilidade'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores de OATP1B1 (ciclosporina, gemfibrozil, antivirais)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de eluxadoline',
        conduta: 'Usar dose de 75mg 2x/dia',
      },
      {
        medicamento: 'Opioides',
        gravidade: 'moderada',
        efeito: 'Efeitos aditivos na constipacao',
        conduta: 'Cautela; monitorar constipacao',
      },
      {
        medicamento: 'Loperamida',
        gravidade: 'moderada',
        efeito: 'Risco de constipacao grave',
        conduta: 'Evitar uso cronico concomitante',
      },
      {
        medicamento: 'Alcool',
        gravidade: 'grave',
        efeito: 'Aumenta risco de pancreatite aguda',
        conduta: 'Contraindicado em alcoolistas',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste (baixa absorcao sistemica)' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; evitar' },
    monitorizacao: [
      'Sintomas de pancreatite (dor abdominal intensa)',
      'Funcao hepatica se hepatopatia',
      'Constipacao grave',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos',
      'NAO usar se nao tiver vesicula biliar',
      'NAO beber alcool em excesso',
      'Dor abdominal intensa - procurar emergencia (pancreatite)',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Child-Pugh A/B: 75mg 2x/dia; Child-Pugh C: contraindicado',
    },
    doencasRelacionadas: ['sii-diarreia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['eluxadoline', 'SII-D', 'opioide-misto', 'antidiarreico'],
  },

  // =============================================================================
  // ANTAGONISTAS 5-HT3/5-HT4
  // =============================================================================
  {
    id: 'alosetron',
    nomeGenerico: 'Alosetron',
    nomesComerciais: ['Lotronex'],
    atcCode: 'A03AE01',
    rxNormCui: '77492',
    drugBankId: 'DB00969',
    snomedCT: '386927003',
    casNumber: '122852-42-0',
    classeTerapeutica: 'antidiarreico',
    subclasse: 'antagonista_5ht3',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Sindrome do intestino irritavel com diarreia (SII-D) grave em mulheres',
      'Falha a terapia convencional',
    ],
    mecanismoAcao: 'Antagonista potente e seletivo do receptor 5-HT3. Reduz motilidade colonica, secrecao intestinal e sensibilidade visceral. Efeito mais pronunciado em mulheres. REMS devido a risco de colite isquemica e constipacao grave.',
    posologias: [
      {
        indicacao: 'SII-D grave (mulheres)',
        adultos: {
          dose: '0,5mg',
          frequencia: '2x/dia por 4 semanas',
          doseMaxima: '1mg 2x/dia',
          observacoes: 'Iniciar com 0,5mg 2x/dia. Se resposta inadequada apos 4 semanas, pode aumentar para 1mg 2x/dia. Suspender se nao houver resposta.',
        },
      },
    ],
    contraindicacoes: [
      'Homens (nao aprovado)',
      'Constipacao atual ou historico de constipacao grave',
      'Historia de colite isquemica, obstrucao intestinal, perfuracao, estenose',
      'Doenca de Crohn ou colite ulcerativa',
      'Doenca diverticular',
      'Hepatopatia grave',
    ],
    precaucoes: [
      'REMS obrigatorio - apenas prescritores cadastrados',
      'Risco de colite isquemica (1:1000)',
      'Constipacao grave - suspender se <3 evacuacoes/semana',
      'Apenas para mulheres com SII-D grave refrataria',
    ],
    efeitosAdversos: {
      comuns: ['Constipacao (25-30%)', 'Dor abdominal', 'Nausea'],
      graves: ['Colite isquemica', 'Constipacao grave/obstrucao', 'Impactacao fecal'],
    },
    interacoes: [
      {
        medicamento: 'Fluvoxamina',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis de alosetron (CYP1A2)',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Outros inibidores CYP1A2 (ciprofloxacino)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de alosetron',
        conduta: 'Cautela; monitorar constipacao',
      },
      {
        medicamento: 'Outros constipantes (opioides, anticolinergicos)',
        gravidade: 'moderada',
        efeito: 'Risco aumentado de constipacao grave',
        conduta: 'Evitar ou usar com cautela',
      },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; evitar' },
    monitorizacao: [
      'Frequencia de evacuacoes (suspender se <3/semana)',
      'Sinais de colite isquemica (dor abdominal subita, sangue nas fezes)',
      'Resposta clinica em 4 semanas',
    ],
    orientacoesPaciente: [
      'APENAS para mulheres com SII-D grave',
      'Suspender IMEDIATAMENTE se: constipacao grave, dor abdominal subita, sangue nas fezes',
      'Termo de consentimento obrigatorio (REMS)',
      'Iniciar com dose baixa',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de constipacao; cautela extrema',
      hepatopatas: 'Hepatopatia leve/moderada: cautela; grave: contraindicado',
    },
    doencasRelacionadas: ['sii-diarreia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['alosetron', '5-HT3', 'SII-D', 'REMS', 'mulheres', 'Lotronex'],
  },

  {
    id: 'tegaserod',
    nomeGenerico: 'Tegaserod',
    nomesComerciais: ['Zelnorm'],
    atcCode: 'A06AX06',
    rxNormCui: '283742',
    drugBankId: 'DB01079',
    snomedCT: '387520006',
    casNumber: '145158-71-0',
    classeTerapeutica: 'laxante',
    subclasse: 'procinetico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '6mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Sindrome do intestino irritavel com constipacao (SII-C)',
      'Mulheres <65 anos sem doenca cardiovascular',
    ],
    mecanismoAcao: 'Agonista parcial seletivo do receptor 5-HT4. Estimula reflexo peristaltico, aumenta secrecao de cloreto e fluido intestinal, acelera transito. Reintroduzido em 2019 com restricoes apos retirada em 2007 por eventos CV.',
    posologias: [
      {
        indicacao: 'SII-C (mulheres <65 anos)',
        adultos: {
          dose: '6mg',
          frequencia: '2x/dia 30min antes das refeicoes',
          observacoes: 'Apenas para mulheres <65 anos sem fatores de risco CV.',
        },
      },
    ],
    contraindicacoes: [
      'Homens',
      'Mulheres >=65 anos',
      'Doenca cardiovascular (IAM, AVC, angina)',
      'Fatores de risco CV (hipertensao, hiperlipidemia, obesidade, DM, tabagismo)',
      'Insuficiencia hepatica moderada/grave',
      'Insuficiencia renal grave',
      'Obstrucao intestinal, aderencias, doenca biliar',
    ],
    precaucoes: [
      'Restricao rigorosa da populacao elegivel',
      'Risco CV: avaliar fatores de risco antes',
      'Diarreia - pode ocorrer',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Dor abdominal', 'Diarreia', 'Nausea', 'Flatulencia'],
      graves: ['Eventos cardiovasculares (IAM, AVC)', 'Colite isquemica (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Digoxina',
        gravidade: 'leve',
        efeito: 'Pode reduzir absorcao de digoxina',
        conduta: 'Monitorar niveis de digoxina',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Contraindicado' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: [
      'Fatores de risco CV antes e durante',
      'Sintomas de eventos CV',
      'Resposta clinica',
    ],
    orientacoesPaciente: [
      'APENAS para mulheres <65 anos SEM doenca cardiaca',
      'Tomar 30min antes das refeicoes',
      'Informar medico sobre fatores de risco CV',
    ],
    consideracoesEspeciais: {
      idosos: 'Contraindicado em >=65 anos',
      hepatopatas: 'Leve: cautela; moderada/grave: contraindicado',
    },
    doencasRelacionadas: ['sii-constipacao'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['tegaserod', '5-HT4', 'SII-C', 'procinetico', 'restricao-CV'],
  },

  {
    id: 'prucalopride',
    nomeGenerico: 'Prucalopride',
    nomesComerciais: ['Resolor', 'Motegrity'],
    atcCode: 'A06AX05',
    rxNormCui: '2049104',
    drugBankId: 'DB06480',
    snomedCT: '442051007',
    casNumber: '179474-81-8',
    classeTerapeutica: 'laxante',
    subclasse: 'procinetico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Constipacao idiopatica cronica (CIC) em adultos',
      'Falha a laxantes convencionais',
    ],
    mecanismoAcao: 'Agonista altamente seletivo do receptor 5-HT4 (>150x vs outros subtipos). Estimula motilidade colonica de alta amplitude e propulsiva. Diferente do tegaserod: muito menor afinidade por outros receptores (hERG, 5-HT1B), perfil CV mais seguro.',
    posologias: [
      {
        indicacao: 'Constipacao cronica',
        adultos: {
          dose: '2mg',
          frequencia: '1x/dia',
          observacoes: 'Pode tomar com ou sem alimentos. Se eficacia inadequada apos 4 semanas, reavaliar.',
        },
        idosos: {
          dose: '1mg 1x/dia',
          observacoes: 'Idosos >65 anos: iniciar com 1mg; pode aumentar para 2mg se necessario.',
        },
      },
    ],
    contraindicacoes: [
      'Perfuracao ou obstrucao intestinal',
      'Doenca de Crohn ou colite ulcerativa obstrutiva',
      'Megacolon/megareto toxico',
      'Dialise',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Insuficiencia renal grave (TFG <30): usar 1mg/dia',
      'Insuficiencia hepatica grave: dados limitados',
      'Doenca cardiaca grave - avaliado em estudos, perfil seguro',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia (primeiras 24h)', 'Dor abdominal', 'Nausea', 'Diarreia', 'Flatulencia'],
      graves: ['Reacoes de hipersensibilidade (raro)', 'Ideacao suicida (raro, monitorar)'],
    },
    interacoes: [
      {
        medicamento: 'Eritromicina, cetoconazol',
        gravidade: 'leve',
        efeito: 'Aumento leve dos niveis de prucalopride',
        conduta: 'Sem ajuste necessario',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste (2mg/dia)' },
      { tfg: '<30', ajuste: '1mg 1x/dia' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretado no leite; evitar' },
    monitorizacao: [
      'Frequencia de evacuacoes completas espontaneas',
      'Sintomas de humor',
      'Resposta em 4 semanas',
    ],
    orientacoesPaciente: [
      'Tomar 1x ao dia, com ou sem comida',
      'Cefaleia no primeiro dia e comum e melhora',
      'Funciona melhor em constipacao cronica verdadeira',
    ],
    consideracoesEspeciais: {
      idosos: 'Iniciar com 1mg; ajustar conforme resposta',
      hepatopatas: 'Hepatopatia grave: dados limitados',
    },
    doencasRelacionadas: ['constipacao-idiopatica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['prucalopride', '5-HT4', 'constipacao', 'CIC', 'procinetico', 'PRISM'],
  },

  // =============================================================================
  // ATIVADOR DE CANAL DE CLORETO
  // =============================================================================
  {
    id: 'lubiprostone',
    nomeGenerico: 'Lubiprostone',
    nomesComerciais: ['Amitiza'],
    atcCode: 'A06AX03',
    rxNormCui: '617310',
    drugBankId: 'DB01046',
    snomedCT: '422456007',
    casNumber: '136790-76-6',
    classeTerapeutica: 'laxante',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '8mcg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '24mcg', disponivelSUS: false },
    ],
    indicacoes: [
      'Constipacao idiopatica cronica',
      'Sindrome do intestino irritavel com constipacao (SII-C) em mulheres',
      'Constipacao induzida por opioides (nao relacionada a cancer)',
    ],
    mecanismoAcao: 'Ativador seletivo de canais de cloreto tipo 2 (ClC-2) na membrana apical dos enterocitos. Aumenta secrecao de cloreto para o lumen, seguida de sodio e agua, amolecendo fezes e aumentando motilidade. Derivado de prostaglandina E1 com acoes locais.',
    posologias: [
      {
        indicacao: 'Constipacao idiopatica cronica',
        adultos: {
          dose: '24mcg',
          frequencia: '2x/dia com alimentos',
        },
      },
      {
        indicacao: 'SII-C (mulheres)',
        adultos: {
          dose: '8mcg',
          frequencia: '2x/dia com alimentos',
        },
      },
      {
        indicacao: 'Constipacao induzida por opioides',
        adultos: {
          dose: '24mcg',
          frequencia: '2x/dia com alimentos',
        },
      },
    ],
    contraindicacoes: [
      'Obstrucao intestinal mecanica conhecida ou suspeita',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Nausea pode ser intensa - tomar com alimentos',
      'Diarreia',
      'Dispneia (rara, dentro de 1h da dose)',
      'Insuficiencia hepatica grave - reduzir dose',
    ],
    efeitosAdversos: {
      comuns: ['Nausea (31%)', 'Diarreia', 'Cefaleia', 'Distensao abdominal', 'Dor abdominal', 'Flatulencia'],
      graves: ['Dispneia (rara)', 'Sincope (rara)', 'Diarreia grave'],
    },
    interacoes: [
      {
        medicamento: 'Metadona',
        gravidade: 'leve',
        efeito: 'Lubiprostone pode reduzir absorcao de metadona',
        conduta: 'Monitorar eficacia da metadona',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; evitar' },
    monitorizacao: [
      'Frequencia de evacuacoes',
      'Sintomas GI',
      'Dispneia',
    ],
    orientacoesPaciente: [
      'Tomar COM alimentos para reduzir nausea',
      'Engolir capsula inteira',
      'Nausea tende a melhorar com o tempo',
      'Dispneia - informar medico',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Child-Pugh B (CIC): iniciar 16mcg 2x/dia; Child-Pugh C: 8mcg 2x/dia com possibilidade de aumentar para 16mcg',
    },
    doencasRelacionadas: ['constipacao-idiopatica', 'sii-constipacao', 'constipacao-opioide'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['lubiprostone', 'ClC-2', 'constipacao', 'CIC', 'SII-C', 'opioides', 'Amitiza'],
  },

  // =============================================================================
  // ANALOGOS DE SOMATOSTATINA
  // =============================================================================
  {
    id: 'octreotide',
    nomeGenerico: 'Octreotide',
    nomesComerciais: ['Sandostatin', 'Sandostatin LAR'],
    atcCode: 'H01CB02',
    rxNormCui: '7646',
    drugBankId: 'DB00104',
    snomedCT: ['387054005', '376866009'],
    casNumber: '83150-76-9',
    classeTerapeutica: 'hormonio',
    subclasse: 'analogo_somatostatina',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '0,05mg/mL', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '0,1mg/mL', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '0,5mg/mL', disponivelSUS: true },
      { forma: 'injetavel_longa_acao', concentracao: '10mg (LAR)', disponivelSUS: true },
      { forma: 'injetavel_longa_acao', concentracao: '20mg (LAR)', disponivelSUS: true },
      { forma: 'injetavel_longa_acao', concentracao: '30mg (LAR)', disponivelSUS: true },
    ],
    indicacoes: [
      'Tumores neuroendocrinos gastroenteropancreaticos (TNE-GEP)',
      'Acromegalia',
      'Sindrome carcinoide (diarreia, flushing)',
      'VIPomas (diarreia secretora)',
      'Sangramento varicoso agudo (off-label)',
      'Fistulas enterocutaneas',
      'Diarreia secretora grave',
    ],
    mecanismoAcao: 'Octapeptideo analogo da somatostatina com meia-vida maior (90min vs 2min). Liga-se aos receptores de somatostatina (SSTR2 > SSTR5 > SSTR3). Inibe secrecao de GH, glucagon, insulina, gastrina, VIP, serotonina. Reduz fluxo sanguineo esplancnico. Efeitos antisecretores e antiproliferativos em tumores neuroendocrinos.',
    posologias: [
      {
        indicacao: 'Sindrome carcinoide / TNE',
        adultos: {
          dose: 'SC: 100-600mcg/dia divididos em 2-4 doses; LAR: 20-30mg IM a cada 4 semanas',
          frequencia: 'SC: 8/8h ou 6/6h; LAR: mensal',
          observacoes: 'Iniciar com SC para testar tolerancia, depois converter para LAR.',
        },
      },
      {
        indicacao: 'Acromegalia',
        adultos: {
          dose: 'SC: 100mcg 3x/dia; LAR: 20mg IM/28 dias',
          frequencia: 'Ajustar para normalizar IGF-1',
          doseMaxima: 'LAR: 40mg/28 dias',
        },
      },
      {
        indicacao: 'Sangramento varicoso agudo',
        adultos: {
          dose: '50mcg bolus IV + 50mcg/h infusao continua',
          frequencia: 'Por 2-5 dias',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao octreotide',
    ],
    precaucoes: [
      'Colelitiase (20-30% em uso cronico)',
      'Hipoglicemia ou hiperglicemia',
      'Hipotireoidismo',
      'Bradicardia',
      'Deficiencia de B12 (uso prolongado)',
      'Pancreatite (raro)',
    ],
    efeitosAdversos: {
      comuns: ['Dor abdominal', 'Diarreia/esteatorreia', 'Nausea', 'Flatulencia', 'Colelitiase', 'Reacao local na injecao', 'Hiperglicemia'],
      graves: ['Bradicardia', 'Pancreatite', 'Hipoglicemia grave', 'Colecistite'],
    },
    interacoes: [
      {
        medicamento: 'Ciclosporina',
        gravidade: 'moderada',
        efeito: 'Reducao da absorcao de ciclosporina',
        conduta: 'Monitorar niveis de ciclosporina',
      },
      {
        medicamento: 'Insulina, hipoglicemiantes orais',
        gravidade: 'moderada',
        efeito: 'Alteracao da glicemia (hipo ou hiperglicemia)',
        conduta: 'Monitorar glicemia; ajustar doses',
      },
      {
        medicamento: 'Betabloqueadores, BCC',
        gravidade: 'moderada',
        efeito: 'Bradicardia aditiva',
        conduta: 'Monitorar FC',
      },
      {
        medicamento: 'Bromocriptina',
        gravidade: 'leve',
        efeito: 'Aumento da biodisponibilidade de bromocriptina',
        conduta: 'Monitorar efeitos da bromocriptina',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Dialise: meia-vida aumentada; pode necessitar reducao' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; evitar' },
    monitorizacao: [
      'Ultrassom de vesicula biliar periodico',
      'Glicemia',
      'TSH periodico',
      'IGF-1 (acromegalia)',
      'Cromogranina A, 5-HIAA (carcinoide)',
      'B12 em uso prolongado',
    ],
    orientacoesPaciente: [
      'Armazenar na geladeira (nao congelar)',
      'SC: pode aplicar em casa apos treinamento',
      'LAR: aplicacao mensal por profissional',
      'Calculos biliares podem ocorrer - informar dor abdominal',
      'Monitorar glicemia se diabetico',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior sensibilidade; monitorar glicemia',
      hepatopatas: 'Cirroticos: meia-vida aumentada; ajustar dose',
    },
    doencasRelacionadas: ['tumor-neuroendocrino', 'sindrome-carcinoide', 'acromegalia', 'vipoma'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['octreotide', 'somatostatina', 'TNE', 'carcinoide', 'acromegalia', 'Sandostatin', 'LAR'],
  },

  {
    id: 'lanreotide',
    nomeGenerico: 'Lanreotide',
    nomesComerciais: ['Somatuline', 'Somatuline Autogel'],
    atcCode: 'H01CB03',
    rxNormCui: '203770',
    drugBankId: 'DB06791',
    snomedCT: '395953000',
    casNumber: '108736-35-2',
    classeTerapeutica: 'hormonio',
    subclasse: 'analogo_somatostatina',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '60mg (seringa preenchida)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '90mg (seringa preenchida)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '120mg (seringa preenchida)', disponivelSUS: false },
    ],
    indicacoes: [
      'Tumores neuroendocrinos gastroenteropancreaticos (TNE-GEP)',
      'Acromegalia',
      'Sindrome carcinoide',
      'Controle de crescimento tumoral em TNE',
    ],
    mecanismoAcao: 'Octapeptideo analogo da somatostatina de longa acao. Alta afinidade por SSTR2, moderada por SSTR5. Formulacao Autogel permite injecao SC profunda a cada 4 semanas com liberacao sustentada. Efeitos antisecretores e antiproliferativos similares ao octreotide.',
    posologias: [
      {
        indicacao: 'TNE-GEP / Sindrome carcinoide',
        adultos: {
          dose: '120mg SC profunda',
          frequencia: 'A cada 4 semanas',
          observacoes: 'Injecao no quadrante superior externo da nadega. Pode ser auto-administrado apos treinamento.',
        },
      },
      {
        indicacao: 'Acromegalia',
        adultos: {
          dose: 'Iniciar 90mg a cada 4 semanas',
          frequencia: 'A cada 4 semanas',
          observacoes: 'Ajustar para 60mg ou 120mg conforme niveis de GH/IGF-1.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao lanreotide ou peptideos relacionados',
    ],
    precaucoes: [
      'Colelitiase (monitorar)',
      'Disglicemia',
      'Bradicardia',
      'Hipotireoidismo',
    ],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Dor abdominal', 'Colelitiase', 'Reacao no local da injecao', 'Nausea', 'Flatulencia'],
      graves: ['Bradicardia', 'Hiperglicemia', 'Pancreatite (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Ciclosporina',
        gravidade: 'moderada',
        efeito: 'Pode reduzir absorcao de ciclosporina',
        conduta: 'Monitorar niveis',
      },
      {
        medicamento: 'Insulina, antidiabeticos',
        gravidade: 'moderada',
        efeito: 'Alteracoes glicemicas',
        conduta: 'Monitorar glicemia',
      },
      {
        medicamento: 'Bradicardizantes',
        gravidade: 'moderada',
        efeito: 'Bradicardia aditiva',
        conduta: 'Monitorar FC',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '15-30', ajuste: 'Iniciar 60mg a cada 4 semanas' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: [
      'Ultrassom vesicula biliar',
      'Glicemia',
      'TSH',
      'GH e IGF-1 (acromegalia)',
      'Cromogranina A (TNE)',
    ],
    orientacoesPaciente: [
      'Injecao mensal SC profunda',
      'Pode ser auto-administrado apos treinamento',
      'Armazenar na geladeira',
      'Calculos biliares - informar dor abdominal',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Hepatopatia leve/moderada: sem ajuste; grave: dados limitados',
    },
    doencasRelacionadas: ['tumor-neuroendocrino', 'acromegalia', 'sindrome-carcinoide'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['lanreotide', 'somatostatina', 'TNE', 'acromegalia', 'CLARINET', 'Somatuline'],
  },

  // =============================================================================
  // CORTICOIDE TOPICO INTESTINAL
  // =============================================================================
  {
    id: 'budesonide-oral',
    nomeGenerico: 'Budesonide (liberacao intestinal)',
    nomesComerciais: ['Entocort', 'Budenofalk', 'Uceris'],
    atcCode: 'A07EA06',
    rxNormCui: '19831',
    drugBankId: 'DB01222',
    snomedCT: ['395726003', '426443009'],
    casNumber: '51333-22-3',
    classeTerapeutica: 'corticoide',
    subclasse: 'glicocorticoide',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '3mg (Entocort/ileo)', disponivelSUS: false },
      { forma: 'comprimido_liberacao_prolongada', concentracao: '9mg (Uceris/colon)', disponivelSUS: false },
      { forma: 'granulado', concentracao: '9mg (Budenofalk)', disponivelSUS: false },
      { forma: 'enema', concentracao: '2mg/100mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Doenca de Crohn ileocecal leve a moderada (Entocort)',
      'Retocolite ulcerativa leve a moderada (Uceris)',
      'Colite microscopica (colagena e linfocitica)',
      'Inducao de remissao em DII',
      'Hepatite autoimune (off-label)',
    ],
    mecanismoAcao: 'Corticosteroide com alta potencia topica e extenso metabolismo de primeira passagem hepatica (90%), resultando em baixa biodisponibilidade sistemica (~10%). Formulacoes de liberacao modificada direcionam acao para ileo terminal (Entocort) ou colon (Uceris). Menos efeitos sistemicos que prednisona.',
    posologias: [
      {
        indicacao: 'Crohn ileocecal',
        adultos: {
          dose: '9mg (3 capsulas de 3mg)',
          frequencia: '1x/dia por manha, por 8 semanas',
          observacoes: 'Reduzir gradualmente antes de suspender. Manutencao: 6mg/dia por ate 3 meses.',
        },
      },
      {
        indicacao: 'Retocolite ulcerativa',
        adultos: {
          dose: '9mg (Uceris)',
          frequencia: '1x/dia por manha, por ate 8 semanas',
          observacoes: 'Engolir inteiro, nao mastigar.',
        },
      },
      {
        indicacao: 'Colite microscopica',
        adultos: {
          dose: '9mg',
          frequencia: '1x/dia por 6-8 semanas',
          observacoes: 'Manutencao pode ser necessaria em alguns pacientes.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a budesonide',
      'Infeccoes graves nao tratadas',
    ],
    precaucoes: [
      'Menos supressao adrenal que prednisona, mas pode ocorrer',
      'Transicao de corticoide sistemico: monitorar insuficiencia adrenal',
      'Infeccoes',
      'Uso prolongado: efeitos sistemicos possiveis',
      'Hepatopatia: exposicao sistemica aumentada',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Infeccao respiratoria', 'Nausea', 'Dor abdominal', 'Acne', 'Dispepsia'],
      graves: ['Supressao adrenal', 'Infeccoes', 'Osteoporose (uso prolongado)', 'Hiperglicemia'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores de CYP3A4 (cetoconazol, itraconazol, ritonavir)',
        gravidade: 'moderada',
        efeito: 'Aumento significativo da exposicao sistemica ao budesonide',
        conduta: 'Evitar combinacao; se necessario, monitorar efeitos corticoides',
      },
      {
        medicamento: 'Grapefruit',
        gravidade: 'moderada',
        efeito: 'Aumento da biodisponibilidade',
        conduta: 'Evitar grapefruit durante tratamento',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Baixa exposicao sistemica; provavelmente seguro' },
    monitorizacao: [
      'Resposta clinica',
      'Sintomas de supressao adrenal ao descontinuar',
      'Glicemia em diabeticos',
      'Pressao intraocular em uso prolongado',
    ],
    orientacoesPaciente: [
      'Tomar pela manha com ou sem alimentos',
      'Engolir inteiro, nao mastigar',
      'Nao suspender abruptamente',
      'Evitar grapefruit',
      'Menos efeitos que prednisona, mas ainda e corticoide',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste; monitorar osteoporose',
      hepatopatas: 'Hepatopatia grave: exposicao sistemica aumentada; cautela',
    },
    doencasRelacionadas: ['doenca-crohn', 'retocolite-ulcerativa', 'colite-microscopica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['budesonide', 'corticoide-topico', 'Crohn', 'RCU', 'colite-microscopica', 'DII'],
  },

  // =============================================================================
  // ANTI-INFLAMATORIO INTESTINAL
  // =============================================================================
  {
    id: 'mesalazine-oral',
    nomeGenerico: 'Mesalazina (Mesalamina/5-ASA)',
    nomesComerciais: ['Asacol', 'Pentasa', 'Lialda', 'Apriso', 'Mesacol'],
    atcCode: 'A07EC02',
    rxNormCui: '6809',
    drugBankId: 'DB00244',
    snomedCT: '387405008',
    casNumber: '89-57-6',
    classeTerapeutica: 'anti_inflamatorio_intestinal',
    subclasse: 'aminossalicilato',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido_liberacao_prolongada', concentracao: '400mg', disponivelSUS: true },
      { forma: 'comprimido_liberacao_prolongada', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido_liberacao_prolongada', concentracao: '800mg', disponivelSUS: true },
      { forma: 'comprimido_liberacao_prolongada', concentracao: '1,2g (Lialda)', disponivelSUS: false },
      { forma: 'granulado', concentracao: '1g', disponivelSUS: false },
      { forma: 'supositorio', concentracao: '500mg', disponivelSUS: true },
      { forma: 'supositorio', concentracao: '1000mg', disponivelSUS: true },
      { forma: 'enema', concentracao: '4g/60mL', disponivelSUS: true },
    ],
    indicacoes: [
      'Retocolite ulcerativa - inducao e manutencao de remissao',
      'Doenca de Crohn colonica leve (eficacia limitada)',
      'Proctite e proctossigmoidite ulcerativa',
      'Prevencao de recorrencia pos-resseccao em Crohn (controverso)',
    ],
    mecanismoAcao: 'Acao topica anti-inflamatoria na mucosa intestinal. Inibe sintese de prostaglandinas (COX) e leucotrienos (5-LOX), sequestra radicais livres, inibe NF-kB e producao de citocinas. Diferentes formulacoes liberam 5-ASA em diferentes segmentos do TGI (Pentasa: liberacao ao longo do TGI; Asacol: colon; Lialda: colon com dose unica).',
    posologias: [
      {
        indicacao: 'RCU ativa leve-moderada',
        adultos: {
          dose: '2,4-4,8g/dia',
          frequencia: 'Em doses divididas ou dose unica (Lialda)',
          observacoes: 'Combinacao oral + topica (enema/supositorio) mais eficaz na doenca distal.',
        },
      },
      {
        indicacao: 'RCU manutencao',
        adultos: {
          dose: '1,5-3g/dia',
          frequencia: '1x/dia ou doses divididas',
          observacoes: 'Manutencao de longo prazo reduz risco de cancer colorretal.',
        },
      },
      {
        indicacao: 'Proctite (supositorio)',
        adultos: {
          dose: '1g',
          frequencia: '1x/dia ao deitar',
        },
      },
      {
        indicacao: 'Proctossigmoidite (enema)',
        adultos: {
          dose: '4g',
          frequencia: '1x/dia ao deitar',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a salicilatos',
      'Insuficiencia renal grave (TFG <30)',
      'Obstrucao urinaria ou GI',
    ],
    precaucoes: [
      'Monitorar funcao renal (nefrite intersticial)',
      'Piora paradoxal da colite (1-3%)',
      'Pancreatite (rara)',
      'Miocardite/pericardite (muito rara)',
      'Hepatotoxicidade (rara)',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Nausea', 'Dor abdominal', 'Diarreia', 'Flatulencia', 'Rash'],
      graves: ['Nefrite intersticial', 'Pancreatite', 'Miopericardite', 'Hepatotoxicidade', 'Discrasias sanguineas', 'Sindrome lupus-like'],
    },
    interacoes: [
      {
        medicamento: 'Azatioprina, 6-mercaptopurina',
        gravidade: 'moderada',
        efeito: 'Inibe TPMT, aumentando toxicidade de tiopurinas',
        conduta: 'Monitorar hemograma rigorosamente',
      },
      {
        medicamento: 'Varfarina',
        gravidade: 'moderada',
        efeito: 'Pode aumentar anticoagulacao',
        conduta: 'Monitorar INR',
      },
      {
        medicamento: 'AINEs',
        gravidade: 'moderada',
        efeito: 'Risco aditivo de nefrotoxicidade',
        conduta: 'Cautela; monitorar funcao renal',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Sem ajuste' },
      { tfg: '30-60', ajuste: 'Cautela; monitorar funcao renal' },
      { tfg: '<30', ajuste: 'Contraindicado' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Quantidades minimas no leite; monitorar diarreia no lactente' },
    monitorizacao: [
      'Creatinina e urinalise antes e periodicamente',
      'Hemograma periodico',
      'Funcao hepatica se sintomas',
      'Resposta clinica',
    ],
    orientacoesPaciente: [
      'Engolir comprimidos inteiros, nao mastigar',
      'Manutencao de longo prazo importante',
      'Informar sintomas renais ou cardiacos',
      'Casca do comprimido pode aparecer nas fezes (normal)',
    ],
    consideracoesEspeciais: {
      idosos: 'Monitorar funcao renal',
      hepatopatas: 'Hepatopatia grave: usar com cautela',
    },
    doencasRelacionadas: ['retocolite-ulcerativa', 'doenca-crohn', 'proctite', 'dii'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['mesalazina', '5-ASA', 'aminossalicilato', 'RCU', 'DII', 'manutencao'],
  },

  // =============================================================================
  // ACIDO BILIAR
  // =============================================================================
  {
    id: 'ursodeoxycholic-acid',
    nomeGenerico: 'Acido Ursodesoxicolico (UDCA)',
    nomesComerciais: ['Ursacol', 'Ursofalk', 'Actigall', 'Urso'],
    atcCode: 'A05AA02',
    rxNormCui: '11095',
    drugBankId: 'DB01586',
    snomedCT: ['387092000', '426332003'],
    casNumber: '128-13-2',
    classeTerapeutica: 'hepatobiliar',
    subclasse: 'acido_biliar',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '150mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '300mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: false },
      { forma: 'suspensao_oral', concentracao: '50mg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Colangite biliar primaria (CBP)',
      'Dissolucao de calculos biliares de colesterol (nao calcificados)',
      'Prevencao de calculos durante perda de peso rapida',
      'Colestase intra-hepatica da gravidez',
      'Fibrose cistica (melhora funcao hepatica)',
      'Colangite esclerosante primaria (beneficio controverso)',
      'Colestase induzida por drogas',
      'Atresia biliar (pediatrico, pos-Kasai)',
    ],
    mecanismoAcao: 'Acido biliar secundario hidrofilico natural. Substitui acidos biliares toxicos (hidrofobicos) no pool, protegendo hepatocitos. Aumenta secrecao de bicarbonato biliar. Efeitos imunomoduladores. Promove dissolucao de calculos de colesterol. Na CBP, retarda progressao e melhora bioquimica hepatica.',
    posologias: [
      {
        indicacao: 'Colangite biliar primaria',
        adultos: {
          dose: '13-15mg/kg/dia',
          frequencia: 'Em 2-4 doses com alimentos',
          observacoes: 'Tratamento de longo prazo/indefinido.',
        },
      },
      {
        indicacao: 'Dissolucao de calculos biliares',
        adultos: {
          dose: '8-10mg/kg/dia',
          frequencia: 'Em 2-3 doses com alimentos',
          observacoes: 'Tratamento por 6-24 meses. Apenas calculos radiotransparentes <20mm.',
        },
      },
      {
        indicacao: 'Prevencao de calculos (perda de peso)',
        adultos: {
          dose: '300mg',
          frequencia: '2x/dia',
          observacoes: 'Durante periodo de perda de peso rapida.',
        },
      },
      {
        indicacao: 'Colestase da gravidez',
        adultos: {
          dose: '10-15mg/kg/dia',
          frequencia: 'Em doses divididas',
          observacoes: 'Ate o parto.',
        },
      },
      {
        indicacao: 'Fibrose cistica',
        adultos: {
          dose: '20mg/kg/dia',
          frequencia: 'Em 2-3 doses',
        },
        pediatrico: {
          dose: '20-30mg/kg/dia',
          frequencia: 'Em 2-3 doses',
        },
      },
    ],
    contraindicacoes: [
      'Calculos calcificados ou radiopcos',
      'Colecistite aguda',
      'Obstrucao biliar completa',
      'Fistula biliar',
      'Hipersensibilidade a acidos biliares',
    ],
    precaucoes: [
      'Diarreia (dose-dependente)',
      'Vesicula nao funcionante (nao dissolve calculos)',
      'Monitorar funcao hepatica em CBP',
    ],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Nausea', 'Dor abdominal', 'Prurido (pode piorar transitoriamente na CBP)', 'Constipacao'],
      graves: ['Calcificacao de calculos (raro)', 'Descompensacao hepatica em cirrose avancada'],
    },
    interacoes: [
      {
        medicamento: 'Antiacidos com aluminio, colestiramina, colestipol',
        gravidade: 'moderada',
        efeito: 'Reduzem absorcao de UDCA',
        conduta: 'Separar administracao em 2-4h',
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'moderada',
        efeito: 'UDCA pode aumentar absorcao de ciclosporina',
        conduta: 'Monitorar niveis de ciclosporina',
      },
      {
        medicamento: 'Contraceptivos orais, estrogenos',
        gravidade: 'leve',
        efeito: 'Podem aumentar secrecao de colesterol biliar, reduzindo eficacia',
        conduta: 'Considerar ao tratar calculos',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario (excrecao biliar)' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Quantidades minimas; provavelmente seguro' },
    monitorizacao: [
      'Enzimas hepaticas (TGO, TGP, FA, GGT) a cada 1-3 meses inicialmente',
      'Ultrassom de vias biliares periodico (dissolucao de calculos)',
      'Bilirrubinas na CBP',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos para melhor absorcao',
      'Tratamento prolongado para calculos e CBP',
      'Prurido pode piorar inicialmente na CBP',
      'Nao funciona para calculos calcificados',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Cirrose descompensada: usar com cautela; pode nao ser eficaz',
      pediatrico: 'Usado em atresia biliar e fibrose cistica',
    },
    doencasRelacionadas: ['colangite-biliar-primaria', 'colelitiase', 'colestase', 'fibrose-cistica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['UDCA', 'ursodesoxicolico', 'CBP', 'calculos-biliares', 'colestase', 'acido-biliar'],
  },
];
