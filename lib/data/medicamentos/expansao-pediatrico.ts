/**
 * EXPANSÃO PEDIÁTRICA - DARWIN-MFC
 * =================================
 *
 * Medicamentos com formulações pediátricas e indicações específicas.
 * Foco em apresentações líquidas e doses ajustadas por peso/idade.
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosPediatricos: Partial<Medicamento>[] = [
  // ============================================================================
  // ANTIPIRÉTICOS/ANALGÉSICOS PEDIÁTRICOS
  // ============================================================================
  {
    id: 'paracetamol-pediatrico',
    nomeGenerico: 'Paracetamol Pediátrico',
    nomesComerciais: ['Tylenol Bebê', 'Tylenol Criança', 'Dôrico'],
    atcCode: 'N02BE01',
    classeTerapeutica: 'analgesico',
    subclasse: 'nao_opioide',
    rename: true,
    apresentacoes: [
      { forma: 'gotas', concentracao: '200mg/ml', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '32mg/ml', disponivelSUS: true },
      { forma: 'supositorio', concentracao: '125mg', disponivelSUS: true },
      { forma: 'supositorio', concentracao: '325mg', disponivelSUS: true }
    ],
    indicacoes: ['Febre', 'Dor leve a moderada', 'Pós-vacinação'],
    mecanismoAcao: 'Inibe COX central, reduz prostaglandinas no SNC. Antipirético e analgésico.',
    posologias: [
      {
        indicacao: 'Febre/Dor',
        adultos: { dose: '500-1000mg', frequencia: '4-6h', doseMaxima: '4g/dia' },
        pediatrico: { dose: '10-15mg/kg/dose', frequencia: '4-6h', doseMaxima: '75mg/kg/dia (máx 4g)', idadeMinima: '0 meses' }
      }
    ],
    contraindicacoes: ['Doença hepática grave', 'Deficiência G6PD (cautela)'],
    precaucoes: ['Hepatotoxicidade dose-dependente', 'Não exceder dose máxima', 'Atenção com múltiplos produtos'],
    efeitosAdversos: {
      comuns: ['Raros em doses terapêuticas'],
      graves: ['Hepatotoxicidade (superdose)', 'Reações cutâneas graves (raro)']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'leve', efeito: 'Pode aumentar INR', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  {
    id: 'ibuprofeno-pediatrico',
    nomeGenerico: 'Ibuprofeno Pediátrico',
    nomesComerciais: ['Alivium', 'Advil Infantil', 'Ibupril'],
    atcCode: 'M01AE01',
    classeTerapeutica: 'aine',
    subclasse: 'nao_seletivo',
    rename: true,
    apresentacoes: [
      { forma: 'gotas', concentracao: '50mg/ml', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '20mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Febre', 'Dor leve a moderada', 'Inflamação'],
    mecanismoAcao: 'Inibe COX-1 e COX-2, reduz prostaglandinas.',
    posologias: [
      {
        indicacao: 'Febre/Dor',
        adultos: { dose: '200-400mg', frequencia: '4-6h', doseMaxima: '2,4g/dia' },
        pediatrico: { dose: '5-10mg/kg/dose', frequencia: '6-8h', doseMaxima: '40mg/kg/dia (máx 2,4g)', idadeMinima: '6 meses' }
      }
    ],
    contraindicacoes: ['< 6 meses', 'Úlcera ativa', 'IR grave', 'Desidratação', 'Varicela'],
    precaucoes: ['Risco GI', 'Nefrotoxicidade em desidratados', 'Não usar em varicela (Síndrome Reye-like)'],
    efeitosAdversos: {
      comuns: ['Dor abdominal', 'Náusea'],
      graves: ['Sangramento GI', 'IRA', 'Reações alérgicas']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Excreção mínima' }
  },

  {
    id: 'dipirona-pediatrica',
    nomeGenerico: 'Dipirona Pediátrica',
    nomesComerciais: ['Novalgina Infantil', 'Anador Infantil'],
    atcCode: 'N02BB02',
    classeTerapeutica: 'analgesico',
    subclasse: 'nao_opioide',
    rename: true,
    apresentacoes: [
      { forma: 'gotas', concentracao: '500mg/ml', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '50mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Febre refratária', 'Dor moderada a intensa'],
    mecanismoAcao: 'Inibe COX variantes, analgésico e antipirético potente.',
    posologias: [
      {
        indicacao: 'Febre/Dor',
        adultos: { dose: '500-1000mg', frequencia: '6-8h', doseMaxima: '4g/dia' },
        pediatrico: { dose: '10-25mg/kg/dose', frequencia: '6-8h', doseMaxima: '4 doses/dia', idadeMinima: '3 meses' }
      }
    ],
    contraindicacoes: ['< 3 meses ou < 5kg', 'Discrasias sanguíneas', 'Porfiria', 'Deficiência G6PD'],
    precaucoes: ['Hipotensão (IV)', 'Agranulocitose (raro)', 'Monitorar em uso prolongado'],
    efeitosAdversos: {
      comuns: ['Hipotensão (IV rápido)', 'Urina vermelha'],
      graves: ['Agranulocitose', 'Choque anafilático', 'Síndrome Stevens-Johnson']
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'moderada', efeito: 'Toxicidade MTX', conduta: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Evitar dose alta' }
  },

  // ============================================================================
  // ANTIBIÓTICOS PEDIÁTRICOS
  // ============================================================================
  {
    id: 'amoxicilina-suspensao',
    nomeGenerico: 'Amoxicilina Suspensão',
    nomesComerciais: ['Amoxil Suspensão', 'Clavulin Suspensão'],
    atcCode: 'J01CA04',
    classeTerapeutica: 'antibiotico',
    subclasse: 'penicilina',
    rename: true,
    apresentacoes: [
      { forma: 'suspensao_oral', concentracao: '250mg/5ml', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '400mg/5ml', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '500mg/5ml', disponivelSUS: true }
    ],
    indicacoes: ['IVAS', 'OMA', 'Sinusite', 'Faringite estreptocócica', 'ITU não complicada'],
    mecanismoAcao: 'Betalactâmico que inibe síntese parede celular.',
    posologias: [
      {
        indicacao: 'Infecções leves',
        adultos: { dose: '500mg', frequencia: '8/8h por 7-10 dias' },
        pediatrico: { dose: '25mg/kg/dia', frequencia: 'Dividido 8/8h ou 12/12h por 7-10 dias' }
      },
      {
        indicacao: 'OMA/Sinusite',
        adultos: { dose: '875mg', frequencia: '12/12h por 10 dias' },
        pediatrico: { dose: '80-90mg/kg/dia', frequencia: 'Dividido 12/12h por 10 dias' }
      }
    ],
    contraindicacoes: ['Alergia a penicilinas'],
    precaucoes: ['Mononucleose (rash)', 'Ajustar em IR'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Rash', 'Náusea'],
      graves: ['Anafilaxia', 'Colite por C. difficile']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  {
    id: 'azitromicina-suspensao',
    nomeGenerico: 'Azitromicina Suspensão',
    nomesComerciais: ['Zitromax Suspensão', 'Astro'],
    atcCode: 'J01FA10',
    classeTerapeutica: 'antibiotico',
    subclasse: 'macrolideos',
    rename: true,
    apresentacoes: [
      { forma: 'suspensao_oral', concentracao: '200mg/5ml', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '600mg/15ml', disponivelSUS: false }
    ],
    indicacoes: ['IVAS', 'PAC', 'OMA', 'Faringite (alérgicos penicilina)', 'Coqueluche'],
    mecanismoAcao: 'Macrolídeo que inibe síntese proteica bacteriana (ribossomo 50S).',
    posologias: [
      {
        indicacao: 'IVAS/PAC',
        adultos: { dose: '500mg D1, depois 250mg D2-5', frequencia: '1x/dia por 5 dias' },
        pediatrico: { dose: '10mg/kg/dia D1, depois 5mg/kg/dia D2-5', frequencia: '1x/dia por 5 dias' }
      },
      {
        indicacao: 'OMA',
        adultos: { dose: '500mg', frequencia: '1x/dia por 3 dias' },
        pediatrico: { dose: '30mg/kg', frequencia: 'Dose única ou 10mg/kg/dia por 3 dias' }
      }
    ],
    contraindicacoes: ['Alergia a macrolídeos', 'Uso de ergotamínicos'],
    precaucoes: ['Prolonga QT', 'Estenose pilórica em neonatos'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náusea', 'Dor abdominal'],
      graves: ['Arritmia (QT longo)', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Antiarrítmicos', gravidade: 'grave', efeito: 'Prolonga QT', conduta: 'Evitar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },

  {
    id: 'cefalexina-suspensao',
    nomeGenerico: 'Cefalexina Suspensão',
    nomesComerciais: ['Keflex Suspensão', 'Cefalexin'],
    atcCode: 'J01DB01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'cefalosporina_1g',
    rename: true,
    apresentacoes: [
      { forma: 'suspensao_oral', concentracao: '250mg/5ml', disponivelSUS: true }
    ],
    indicacoes: ['Infecções cutâneas', 'ITU', 'IVAS', 'OMA'],
    mecanismoAcao: 'Cefalosporina 1ª geração, inibe síntese parede celular.',
    posologias: [
      {
        indicacao: 'Infecções gerais',
        adultos: { dose: '500mg', frequencia: '6/6h ou 8/8h por 7-10 dias' },
        pediatrico: { dose: '25-50mg/kg/dia', frequencia: 'Dividido 6/6h ou 8/8h por 7-10 dias' }
      }
    ],
    contraindicacoes: ['Alergia a cefalosporinas/penicilinas (cautela)'],
    precaucoes: ['10% reatividade cruzada com penicilinas'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náusea'],
      graves: ['Anafilaxia', 'Colite pseudomembranosa']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  // ============================================================================
  // ANTITUSSÍGENOS/EXPECTORANTES PEDIÁTRICOS
  // ============================================================================
  {
    id: 'ambroxol-pediatrico',
    nomeGenerico: 'Ambroxol Pediátrico',
    nomesComerciais: ['Mucosolvan Infantil', 'Ambrix'],
    atcCode: 'R05CB06',
    classeTerapeutica: 'mucolitico',
    subclasse: 'tiol',
    rename: false,
    apresentacoes: [
      { forma: 'xarope_pediatrico', concentracao: '15mg/5ml', disponivelSUS: false },
      { forma: 'gotas', concentracao: '7,5mg/ml', disponivelSUS: false }
    ],
    indicacoes: ['Doenças broncopulmonares agudas e crônicas', 'Tosse produtiva'],
    mecanismoAcao: 'Mucolítico que estimula secreção de surfactante e reduz viscosidade do muco.',
    posologias: [
      {
        indicacao: 'Tosse produtiva',
        adultos: { dose: '30mg', frequencia: '2-3x/dia' },
        pediatrico: { dose: '< 2 anos: 7,5mg 2x/dia; 2-5 anos: 7,5mg 3x/dia; > 5 anos: 15mg 2-3x/dia', frequencia: 'Ver dose' }
      }
    ],
    contraindicacoes: ['Úlcera péptica ativa'],
    precaucoes: ['Não usar com antitussígenos'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Diarreia'],
      graves: ['Reações cutâneas graves (raro)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Excreção no leite' }
  },

  // ============================================================================
  // ANTIALÉRGICOS PEDIÁTRICOS
  // ============================================================================
  {
    id: 'desloratadina-pediatrica',
    nomeGenerico: 'Desloratadina Pediátrica',
    nomesComerciais: ['Desalex Xarope', 'Clarinex'],
    atcCode: 'R06AX27',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: false,
    apresentacoes: [
      { forma: 'xarope', concentracao: '0,5mg/ml', disponivelSUS: false }
    ],
    indicacoes: ['Rinite alérgica', 'Urticária crônica'],
    mecanismoAcao: 'Anti-histamínico H1 de 2ª geração, metabólito ativo da loratadina.',
    posologias: [
      {
        indicacao: 'Rinite/Urticária',
        adultos: { dose: '5mg', frequencia: '1x/dia' },
        pediatrico: { dose: '6-11 meses: 1mg/dia; 1-5 anos: 1,25mg/dia; 6-11 anos: 2,5mg/dia; ≥12 anos: 5mg/dia', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Ajustar em IR grave'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Boca seca', 'Fadiga'],
      graves: ['Raro']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excreção no leite' }
  },

  {
    id: 'cetrizina-pediatrica',
    nomeGenerico: 'Cetirizina Pediátrica',
    nomesComerciais: ['Zyrtec Gotas', 'Cetrizin'],
    atcCode: 'R06AE07',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: false,
    apresentacoes: [
      { forma: 'gotas', concentracao: '10mg/ml', disponivelSUS: false },
      { forma: 'xarope', concentracao: '1mg/ml', disponivelSUS: false }
    ],
    indicacoes: ['Rinite alérgica', 'Urticária', 'Conjuntivite alérgica'],
    mecanismoAcao: 'Anti-histamínico H1 de 2ª geração com mínima penetração SNC.',
    posologias: [
      {
        indicacao: 'Alergia',
        adultos: { dose: '10mg', frequencia: '1x/dia' },
        pediatrico: { dose: '6m-2 anos: 2,5mg 1x ou 1,25mg 2x; 2-6 anos: 2,5mg 2x ou 5mg 1x; ≥6 anos: 5-10mg 1x', frequencia: 'Ver dose' }
      }
    ],
    contraindicacoes: ['< 6 meses', 'IR grave'],
    precaucoes: ['Pode causar alguma sedação'],
    efeitosAdversos: {
      comuns: ['Sonolência leve', 'Boca seca', 'Cefaleia'],
      graves: ['Reações alérgicas (paradoxal)']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Excreção significativa' }
  },

  // ============================================================================
  // ANTIEMÉTICOS PEDIÁTRICOS
  // ============================================================================
  {
    id: 'ondansetrona-pediatrica',
    nomeGenerico: 'Ondansetrona Pediátrica',
    nomesComerciais: ['Zofran Xarope', 'Vonau'],
    atcCode: 'A04AA01',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_5ht3',
    rename: true,
    apresentacoes: [
      { forma: 'solucao_oral', concentracao: '4mg/5ml', disponivelSUS: true },
      { forma: 'comprimido_orodispersivel', concentracao: '4mg', disponivelSUS: true }
    ],
    indicacoes: ['Náusea/vômitos por quimioterapia', 'Gastroenterite aguda (off-label)', 'Pós-operatório'],
    mecanismoAcao: 'Antagonista seletivo receptor 5-HT3.',
    posologias: [
      {
        indicacao: 'Vômitos',
        adultos: { dose: '4-8mg', frequencia: '8/8h' },
        pediatrico: { dose: '0,15mg/kg/dose', frequencia: '8/8h', doseMaxima: '8mg/dose', idadeMinima: '6 meses' }
      }
    ],
    contraindicacoes: ['Síndrome QT longo congênita', 'Uso de apomorfina'],
    precaucoes: ['Prolonga QT', 'Pode causar constipação'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Constipação'],
      graves: ['Arritmia (QT)', 'Síndrome serotoninérgica']
    },
    interacoes: [
      { medicamento: 'Apomorfina', gravidade: 'grave', efeito: 'Hipotensão/síncope', conduta: 'Contraindicado' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Usar com cautela' }
  },

  {
    id: 'dimenidrinato-pediatrico',
    nomeGenerico: 'Dimenidrinato Pediátrico',
    nomesComerciais: ['Dramin B6 Infantil', 'Dramavit'],
    atcCode: 'A04AD',
    classeTerapeutica: 'antiemetico',
    subclasse: 'h1_1geracao',
    rename: false,
    apresentacoes: [
      { forma: 'solucao_oral', concentracao: '2,5mg/ml', disponivelSUS: false },
      { forma: 'supositorio', concentracao: '25mg', disponivelSUS: false }
    ],
    indicacoes: ['Cinetose', 'Náusea/vômitos', 'Labirintite'],
    mecanismoAcao: 'Anti-histamínico H1 com ação anticolinérgica e antiemética.',
    posologias: [
      {
        indicacao: 'Cinetose/Vômitos',
        adultos: { dose: '50-100mg', frequencia: '6-8h', doseMaxima: '400mg/dia' },
        pediatrico: { dose: '1,25mg/kg/dose', frequencia: '6-8h', doseMaxima: '300mg/dia', idadeMinima: '2 anos' }
      }
    ],
    contraindicacoes: ['< 2 anos', 'Glaucoma ângulo fechado', 'Porfiria'],
    precaucoes: ['Sedação', 'Efeitos anticolinérgicos'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Boca seca', 'Visão borrada'],
      graves: ['Excitação paradoxal (crianças)', 'Convulsões (superdose)']
    },
    interacoes: [
      { medicamento: 'Depressores SNC', gravidade: 'moderada', efeito: 'Sedação', conduta: 'Cautela' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Pode reduzir lactação' }
  },

  // ============================================================================
  // BRONCODILATADORES PEDIÁTRICOS
  // ============================================================================
  {
    id: 'salbutamol-xarope',
    nomeGenerico: 'Salbutamol Xarope',
    nomesComerciais: ['Aerolin Xarope', 'Bronconal'],
    atcCode: 'R03CC02',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'beta2_agonista_curta',
    rename: true,
    apresentacoes: [
      { forma: 'xarope', concentracao: '2mg/5ml', disponivelSUS: true }
    ],
    indicacoes: ['Asma', 'Broncoespasmo', 'DPOC'],
    mecanismoAcao: 'Agonista β2 seletivo de curta ação.',
    posologias: [
      {
        indicacao: 'Broncoespasmo',
        adultos: { dose: '2-4mg', frequencia: '6/6h ou 8/8h' },
        pediatrico: { dose: '< 2 anos: 0,1mg/kg/dose; 2-6 anos: 1-2mg; > 6 anos: 2mg', frequencia: '8/8h ou 6/6h' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Taquicardia', 'Hipocalemia', 'Hipertireoidismo'],
    efeitosAdversos: {
      comuns: ['Tremor', 'Taquicardia', 'Nervosismo'],
      graves: ['Arritmias', 'Hipocalemia grave']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Antagonismo', conduta: 'Evitar betabloqueadores não seletivos' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  // ============================================================================
  // CORTICOIDES PEDIÁTRICOS
  // ============================================================================
  {
    id: 'prednisolona-solucao',
    nomeGenerico: 'Prednisolona Solução Oral',
    nomesComerciais: ['Predsim', 'Prelone'],
    atcCode: 'H02AB06',
    classeTerapeutica: 'corticoide',
    subclasse: 'glicocorticoide',
    rename: true,
    apresentacoes: [
      { forma: 'solucao_oral', concentracao: '3mg/ml', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '1mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Asma aguda', 'Crupe', 'Artrite inflamatória', 'Doenças autoimunes'],
    mecanismoAcao: 'Glicocorticoide intermediário com ação anti-inflamatória e imunossupressora.',
    posologias: [
      {
        indicacao: 'Asma aguda/Crupe',
        adultos: { dose: '40-60mg', frequencia: '1x/dia por 3-5 dias' },
        pediatrico: { dose: '1-2mg/kg/dia', frequencia: '1x/dia ou dividido 12/12h por 3-5 dias', doseMaxima: '60mg/dia' }
      },
      {
        indicacao: 'Doenças inflamatórias',
        adultos: { dose: '5-60mg/dia', frequencia: 'Variável conforme condição' },
        pediatrico: { dose: '0,5-2mg/kg/dia', frequencia: 'Dividido 1-4x/dia', observacoes: 'Reduzir gradualmente' }
      }
    ],
    contraindicacoes: ['Infecções sistêmicas ativas não tratadas', 'Vacinas vivas (altas doses)'],
    precaucoes: ['Retardo crescimento', 'Supressão adrenal', 'Imunossupressão', 'Hiperglicemia'],
    efeitosAdversos: {
      comuns: ['Aumento apetite', 'Alteração humor', 'Insônia'],
      graves: ['Supressão adrenal', 'Osteoporose (crônico)', 'Infecções oportunistas']
    },
    interacoes: [
      { medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Risco GI', conduta: 'Monitorar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Doses baixas' }
  },

  // ============================================================================
  // ANTICONVULSIVANTES PEDIÁTRICOS
  // ============================================================================
  {
    id: 'fenobarbital-solucao',
    nomeGenerico: 'Fenobarbital Solução Oral',
    nomesComerciais: ['Gardenal Solução', 'Fenobarbitol'],
    atcCode: 'N03AA02',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'barbiturico',
    rename: true,
    apresentacoes: [
      { forma: 'solucao_oral', concentracao: '40mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Epilepsia', 'Convulsões neonatais', 'Convulsões febris (profilaxia)'],
    mecanismoAcao: 'Barbitúrico que potencializa GABA-A, reduz excitabilidade neuronal.',
    posologias: [
      {
        indicacao: 'Epilepsia',
        adultos: { dose: '60-180mg', frequencia: '1x/dia' },
        pediatrico: { dose: '3-6mg/kg/dia', frequencia: '1x/dia ou 12/12h' }
      },
      {
        indicacao: 'Status epilepticus',
        adultos: { dose: '10-20mg/kg IV', frequencia: 'Dose única de ataque' },
        pediatrico: { dose: '15-20mg/kg IV', frequencia: 'Dose única de ataque' }
      }
    ],
    contraindicacoes: ['Porfiria', 'Depressão respiratória grave', 'IH grave'],
    precaucoes: ['Sedação', 'Dependência', 'Interações CYP', 'Retirada gradual'],
    efeitosAdversos: {
      comuns: ['Sedação', 'Ataxia', 'Hiperatividade paradoxal'],
      graves: ['Síndrome Stevens-Johnson', 'Agranulocitose', 'Depressão respiratória']
    },
    interacoes: [
      { medicamento: 'Valproato', gravidade: 'moderada', efeito: 'Aumenta fenobarbital', conduta: 'Monitorar níveis' },
      { medicamento: 'Anticoncepcionais', gravidade: 'moderada', efeito: 'Reduz eficácia', conduta: 'Usar método adicional' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Monitorar sedação no lactente' }
  },

  {
    id: 'acido-valproico-xarope',
    nomeGenerico: 'Ácido Valproico Xarope',
    nomesComerciais: ['Depakene Xarope', 'Valpakine'],
    atcCode: 'N03AG01',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'acido_valproico',
    rename: true,
    apresentacoes: [
      { forma: 'xarope', concentracao: '250mg/5ml', disponivelSUS: true }
    ],
    indicacoes: ['Epilepsia generalizada', 'Epilepsia focal', 'Ausências', 'Síndrome Lennox-Gastaut'],
    mecanismoAcao: 'Bloqueia canais de sódio, potencializa GABA, múltiplos mecanismos.',
    posologias: [
      {
        indicacao: 'Epilepsia',
        adultos: { dose: '750-2000mg/dia', frequencia: 'Dividido 8/8h ou 12/12h' },
        pediatrico: { dose: '10-15mg/kg/dia inicial, titular até 30-60mg/kg/dia', frequencia: 'Dividido 8/8h ou 12/12h' }
      }
    ],
    contraindicacoes: ['Doença hepática', 'Distúrbios ciclo ureia', 'Gestação (teratogênico)'],
    precaucoes: ['Hepatotoxicidade', 'Pancreatite', 'Monitorar plaquetas', 'Teratogenicidade'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Tremor', 'Ganho peso', 'Alopecia'],
      graves: ['Hepatotoxicidade fatal', 'Pancreatite', 'Hiperamonemia', 'Trombocitopenia']
    },
    interacoes: [
      { medicamento: 'Lamotrigina', gravidade: 'moderada', efeito: 'Aumenta lamotrigina', conduta: 'Reduzir dose lamotrigina 50%' },
      { medicamento: 'Carbamazepina', gravidade: 'moderada', efeito: 'Interação complexa', conduta: 'Monitorar níveis' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },

  // ============================================================================
  // VITAMINAS PEDIÁTRICAS
  // ============================================================================
  {
    id: 'vitamina-d-gotas',
    nomeGenerico: 'Vitamina D Gotas',
    nomesComerciais: ['Addera D3', 'Depura'],
    atcCode: 'A11CC05',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_d',
    rename: true,
    apresentacoes: [
      { forma: 'gotas', concentracao: '200UI/gota', disponivelSUS: true },
      { forma: 'gotas', concentracao: '500UI/gota', disponivelSUS: false }
    ],
    indicacoes: ['Suplementação RN/lactentes', 'Prevenção raquitismo', 'Deficiência vitamina D'],
    mecanismoAcao: 'Vitamina lipossolúvel essencial para metabolismo cálcio-fósforo e mineralização óssea.',
    posologias: [
      {
        indicacao: 'Suplementação',
        adultos: { dose: '600-2000UI/dia', frequencia: '1x/dia' },
        pediatrico: { dose: 'RN-1 ano: 400UI/dia; 1-18 anos: 600UI/dia', frequencia: '1x/dia' }
      },
      {
        indicacao: 'Deficiência',
        adultos: { dose: '50.000UI/semana por 8 semanas', frequencia: '1x/semana' },
        pediatrico: { dose: '1000-5000UI/dia', frequencia: '1x/dia por 8-12 semanas' }
      }
    ],
    contraindicacoes: ['Hipercalcemia', 'Hipervitaminose D'],
    precaucoes: ['Monitorar cálcio em doses altas', 'Sarcoidose'],
    efeitosAdversos: {
      comuns: ['Geralmente bem tolerada'],
      graves: ['Hipercalcemia (superdose)', 'Nefrocalcinose']
    },
    interacoes: [
      { medicamento: 'Tiazídicos', gravidade: 'leve', efeito: 'Hipercalcemia', conduta: 'Monitorar cálcio' }
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  {
    id: 'sulfato-ferroso-gotas',
    nomeGenerico: 'Sulfato Ferroso Gotas',
    nomesComerciais: ['Fer-In-Sol', 'Noripurum'],
    atcCode: 'B03AA07',
    classeTerapeutica: 'suplemento',
    subclasse: 'antianemico',
    rename: true,
    apresentacoes: [
      { forma: 'gotas', concentracao: '25mg Fe elem/ml', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '125mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Anemia ferropriva', 'Profilaxia anemia em lactentes'],
    mecanismoAcao: 'Reposição de ferro essencial para eritropoiese.',
    posologias: [
      {
        indicacao: 'Tratamento anemia',
        adultos: { dose: '100-200mg Fe elem/dia', frequencia: '1-2x/dia por 3-6 meses' },
        pediatrico: { dose: '3-6mg Fe elem/kg/dia', frequencia: 'Dividido 1-3x/dia por 3-6 meses' }
      },
      {
        indicacao: 'Profilaxia',
        adultos: { dose: '60mg Fe elem/dia', frequencia: '1x/dia' },
        pediatrico: { dose: '1mg Fe elem/kg/dia', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Hemocromatose', 'Hemossiderose', 'Anemia não ferropriva'],
    precaucoes: ['Dar com suco cítrico', 'Coloração fezes', 'Constipação'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Náusea', 'Dor abdominal', 'Fezes escuras'],
      graves: ['Intoxicação aguda (acidental)']
    },
    interacoes: [
      { medicamento: 'Antiácidos', gravidade: 'moderada', efeito: 'Reduz absorção Fe', conduta: 'Separar 2h' },
      { medicamento: 'Levotiroxina', gravidade: 'moderada', efeito: 'Reduz absorção T4', conduta: 'Separar 4h' }
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  {
    id: 'polivitaminico-pediatrico',
    nomeGenerico: 'Polivitamínico Pediátrico',
    nomesComerciais: ['Protovit', 'Lavitan Kids'],
    atcCode: 'A11BA',
    classeTerapeutica: 'vitamina_mineral',
    subclasse: 'vitamina',
    rename: false,
    apresentacoes: [
      { forma: 'gotas', concentracao: 'Complexo A+D+C+B', disponivelSUS: false },
      { forma: 'xarope', concentracao: 'Complexo vitamínico', disponivelSUS: false }
    ],
    indicacoes: ['Suplementação vitamínica', 'Estados carenciais', 'Convalescença'],
    mecanismoAcao: 'Reposição de múltiplas vitaminas essenciais.',
    posologias: [
      {
        indicacao: 'Suplementação',
        adultos: { dose: '1 comprimido/dia', frequencia: '1x/dia' },
        pediatrico: { dose: 'Conforme fabricante', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Hipervitaminose A ou D'],
    precaucoes: ['Não exceder dose recomendada'],
    efeitosAdversos: {
      comuns: ['Geralmente bem tolerado'],
      graves: ['Hipervitaminose (excesso)']
    },
    interacoes: [],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  }
];
