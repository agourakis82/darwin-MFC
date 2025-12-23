/**
 * EXPANSÃO GASTROINTESTINAL - DARWIN-MFC
 * =======================================
 *
 * Medicamentos gastrointestinais baseados na WHO Essential Medicines
 * e RENAME 2024
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosGastrointestinais: Partial<Medicamento>[] = [
  // ============================================================================
  // INIBIDORES DE BOMBA DE PRÓTONS
  // ============================================================================
  {
    id: 'omeprazol',
    nomeGenerico: 'Omeprazol',
    nomesComerciais: ['Losec', 'Peprazol', 'Omepramix'],
    atcCode: 'A02BC01',
    classeTerapeutica: 'inibidor_bomba_protonica',
    subclasse: 'ibp',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '10mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '40mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '40mg', disponivelSUS: true }
    ],
    indicacoes: [
      'DRGE',
      'Úlcera péptica',
      'Erradicação H. pylori',
      'Síndrome de Zollinger-Ellison',
      'Prevenção úlcera por AINES',
      'Sangramento digestivo alto'
    ],
    mecanismoAcao: 'Pró-droga que se acumula em canalículos parietais ácidos. Inibe irreversivelmente H+/K+-ATPase.',
    posologias: [
      {
        indicacao: 'DRGE/Úlcera',
        adultos: { dose: '20-40mg', frequencia: '1x/dia 30min antes café manhã', doseMaxima: '40mg/dia' }
      },
      {
        indicacao: 'Erradicação H. pylori',
        adultos: { dose: '20mg', frequencia: '2x/dia por 14 dias', observacoes: 'Com claritromicina + amoxicilina' }
      },
      {
        indicacao: 'Sangramento GI IV',
        adultos: { dose: '80mg bolus + 8mg/h por 72h', frequencia: 'Infusão contínua' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade a benzimidazóis'],
    precaucoes: ['Uso prolongado: deficiência B12/Mg, fraturas', 'C. difficile', 'Interações CYP2C19'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Dor abdominal', 'Náusea', 'Diarreia', 'Flatulência'],
      graves: ['Nefrite intersticial', 'Hipomagnesemia', 'C. difficile', 'Fraturas osteoporóticas']
    },
    interacoes: [
      { medicamento: 'Clopidogrel', gravidade: 'grave', efeito: 'Inibe ativação do clopidogrel (CYP2C19)', conduta: 'Preferir pantoprazol' },
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Aumento toxicidade MTX', conduta: 'Suspender IBP se MTX dose alta' },
      { medicamento: 'Tacrolimus', gravidade: 'moderada', efeito: 'Aumento níveis tacrolimus', conduta: 'Monitorar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Excreção mínima. Provavelmente seguro.' }
  },

  {
    id: 'pantoprazol',
    nomeGenerico: 'Pantoprazol',
    nomesComerciais: ['Pantozol', 'Pantocal', 'Tecta'],
    atcCode: 'A02BC02',
    classeTerapeutica: 'inibidor_bomba_protonica',
    subclasse: 'ibp',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '40mg', disponivelSUS: true }
    ],
    indicacoes: ['DRGE', 'Úlcera péptica', 'Profilaxia úlcera de estresse', 'Síndrome Zollinger-Ellison'],
    mecanismoAcao: 'IBP com menor interação CYP2C19. Preferido com clopidogrel.',
    posologias: [
      {
        indicacao: 'DRGE/Úlcera',
        adultos: { dose: '40mg', frequencia: '1x/dia', doseMaxima: '80mg/dia' }
      },
      {
        indicacao: 'Profilaxia estresse UTI',
        adultos: { dose: '40mg IV', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Uso prolongado: fraturas, hipomagnesemia, C. difficile'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Diarreia', 'Náusea'],
      graves: ['Nefrite intersticial', 'Hipomagnesemia grave']
    },
    interacoes: [
      { medicamento: 'Clopidogrel', gravidade: 'leve', efeito: 'Menor interação que omeprazol', conduta: 'Preferido entre IBPs' },
      { medicamento: 'Rilpivirina', gravidade: 'grave', efeito: 'Reduz absorção rilpivirina', conduta: 'Contraindicado' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  {
    id: 'esomeprazol',
    nomeGenerico: 'Esomeprazol',
    nomesComerciais: ['Nexium', 'Esomex'],
    atcCode: 'A02BC05',
    classeTerapeutica: 'inibidor_bomba_protonica',
    subclasse: 'ibp',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: false },
      { forma: 'granulado', concentracao: '10mg', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '40mg', disponivelSUS: false }
    ],
    indicacoes: ['DRGE erosiva', 'Úlcera péptica', 'Erradicação H. pylori', 'Prevenção ressangramento'],
    mecanismoAcao: 'Enantiômero S do omeprazol. Metabolismo mais previsível.',
    posologias: [
      {
        indicacao: 'DRGE/Úlcera',
        adultos: { dose: '20-40mg', frequencia: '1x/dia' },
        pediatrico: { dose: '10-20mg', frequencia: '1x/dia', observacoes: '>1 ano' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Dor abdominal', 'Diarreia'],
      graves: ['Nefrite intersticial', 'SJS (muito raro)']
    },
    interacoes: [
      { medicamento: 'Clopidogrel', gravidade: 'moderada', efeito: 'Menor inibição CYP2C19 que omeprazol', conduta: 'Preferir pantoprazol' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  // ============================================================================
  // ANTIÁCIDOS E PROTETORES GÁSTRICOS
  // ============================================================================
  {
    id: 'ranitidina',
    nomeGenerico: 'Ranitidina',
    nomesComerciais: ['Antak', 'Label', 'Zylium'],
    atcCode: 'A02BA02',
    classeTerapeutica: 'antiacido',
    subclasse: 'antagonista_h2',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '25mg/mL', disponivelSUS: false }
    ],
    indicacoes: ['DRGE leve', 'Úlcera péptica', 'Dispepsia funcional'],
    mecanismoAcao: 'Antagonista competitivo dos receptores H2 das células parietais. Menos potente que IBPs.',
    posologias: [
      {
        indicacao: 'DRGE/Úlcera',
        adultos: { dose: '150mg', frequencia: '2x/dia ou 300mg à noite' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Porfiria aguda'],
    precaucoes: ['NOTA: Retirada do mercado em vários países por NDMA (carcinógeno). Verificar disponibilidade.'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Tontura', 'Constipação'],
      graves: ['Confusão (idosos)', 'Hepatite', 'Discrasias sanguíneas']
    },
    interacoes: [
      { medicamento: 'Cetoconazol', gravidade: 'moderada', efeito: 'Reduz absorção cetoconazol', conduta: 'Separar doses' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  {
    id: 'sucralfato',
    nomeGenerico: 'Sucralfato',
    nomesComerciais: ['Sucralfin', 'Sulcrate'],
    atcCode: 'A02BX02',
    classeTerapeutica: 'protetor_gastrico',
    subclasse: 'barreira_mucosa',
    rename: true,
    apresentacoes: [
      { forma: 'suspensao_oral', concentracao: '200mg/mL', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '1g', disponivelSUS: false }
    ],
    indicacoes: ['Úlcera duodenal', 'Úlcera gástrica', 'Mucosite oral', 'Profilaxia úlcera estresse'],
    mecanismoAcao: 'Forma gel protetor sobre úlcera em pH ácido. Adsorve pepsina e sais biliares.',
    posologias: [
      {
        indicacao: 'Úlcera',
        adultos: { dose: '1g', frequencia: '4x/dia (1h antes refeições e ao deitar)', doseMaxima: '4g/dia' }
      }
    ],
    contraindicacoes: ['Insuficiência renal grave (alumínio)'],
    precaucoes: ['Contém alumínio (acúmulo em DRC)', 'Separar de outros medicamentos'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Náusea', 'Boca seca'],
      graves: ['Bezoar (raro)', 'Toxicidade alumínio (DRC)']
    },
    interacoes: [
      { medicamento: 'Fluoroquinolonas', gravidade: 'grave', efeito: 'Reduz absorção 90%', conduta: 'Separar em 2h' },
      { medicamento: 'Fenitoína', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar em 2h' },
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar em 2h' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Absorção sistêmica mínima' }
  },

  // ============================================================================
  // ANTIEMÉTICOS
  // ============================================================================
  {
    id: 'ondansetrona',
    nomeGenerico: 'Ondansetrona',
    nomesComerciais: ['Zofran', 'Nausedron', 'Vonau'],
    atcCode: 'A04AA01',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_5ht3',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '8mg', disponivelSUS: true },
      { forma: 'comprimido_orodispersivel', concentracao: '4mg', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '2mg/mL', disponivelSUS: true },
      { forma: 'xarope', concentracao: '4mg/5mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Náusea/vômito por quimioterapia',
      'Náusea/vômito pós-operatório',
      'Náusea/vômito por radioterapia',
      'Gastroenterite aguda (crianças)',
      'Hiperemese gravídica (off-label)'
    ],
    mecanismoAcao: 'Antagonista seletivo do receptor 5-HT3 central e periférico (zona gatilho e nervo vago).',
    posologias: [
      {
        indicacao: 'NVIQ moderada',
        adultos: { dose: '8mg', frequencia: '2x/dia' }
      },
      {
        indicacao: 'NVPO',
        adultos: { dose: '4mg IV', frequencia: 'Dose única na indução' }
      },
      {
        indicacao: 'Gastroenterite pediátrica',
        adultos: { dose: '4-8mg', frequencia: 'Dose única' },
        pediatrico: { dose: '0,15mg/kg (máx 4mg)', frequencia: 'Dose única', observacoes: '>6 meses' }
      }
    ],
    contraindicacoes: ['Uso concomitante apomorfina'],
    precaucoes: ['Prolongamento QT dose-dependente', 'Síndrome serotoninérgica com outros serotoninérgicos', 'Constipação'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Constipação', 'Fadiga'],
      graves: ['Prolongamento QT', 'Torsades de pointes', 'Síndrome serotoninérgica']
    },
    interacoes: [
      { medicamento: 'Apomorfina', gravidade: 'grave', efeito: 'Hipotensão profunda', conduta: 'Contraindicado' },
      { medicamento: 'QT prolongadores', gravidade: 'grave', efeito: 'Prolongamento QT aditivo', conduta: 'Cautela, máximo 16mg/dia' },
      { medicamento: 'Tramadol', gravidade: 'moderada', efeito: 'Reduz efeito analgésico', conduta: 'Considerar alternativa' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  {
    id: 'metoclopramida',
    nomeGenerico: 'Metoclopramida',
    nomesComerciais: ['Plasil', 'Eucil', 'Digesan'],
    atcCode: 'A03FA01',
    classeTerapeutica: 'antiemetico',
    subclasse: 'procinetico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '1mg/mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '5mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Náusea e vômito',
      'Gastroparesia diabética',
      'DRGE (curto prazo)',
      'Profilaxia NVPO',
      'Enxaqueca (adjuvante)'
    ],
    mecanismoAcao: 'Antagonista D2 central e periférico. Procinético (aumenta motilidade GI). Também bloqueia 5-HT3.',
    posologias: [
      {
        indicacao: 'Náusea/Gastroparesia',
        adultos: { dose: '10mg', frequencia: '3x/dia 30min antes refeições', doseMaxima: '30mg/dia (máx 12 semanas)' },
        pediatrico: { dose: '0,1-0,15mg/kg', frequencia: '3x/dia', doseMaxima: '0,5mg/kg/dia' }
      }
    ],
    contraindicacoes: ['Obstrução GI mecânica', 'Perfuração', 'Sangramento GI', 'Feocromocitoma', 'Epilepsia'],
    precaucoes: ['Uso >12 semanas: risco discinesia tardia', 'Crianças: alto risco EPS', 'Parkinson'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Fadiga', 'Inquietação', 'Diarreia'],
      graves: ['Discinesia tardia (irreversível)', 'Síndrome neuroléptica maligna', 'Depressão', 'Hiperprolactinemia']
    },
    interacoes: [
      { medicamento: 'Antipsicóticos', gravidade: 'grave', efeito: 'Efeitos EPS aditivos', conduta: 'Evitar combinação' },
      { medicamento: 'Levodopa', gravidade: 'grave', efeito: 'Antagonismo', conduta: 'Evitar' },
      { medicamento: 'Opioides', gravidade: 'moderada', efeito: 'Antagonismo da motilidade', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível. Pode aumentar produção de leite.' }
  },

  {
    id: 'domperidona',
    nomeGenerico: 'Domperidona',
    nomesComerciais: ['Motilium', 'Peridal', 'Dompliv'],
    atcCode: 'A03FA03',
    classeTerapeutica: 'antiemetico',
    subclasse: 'procinetico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '1mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Náusea e vômito',
      'Distensão epigástrica',
      'Refluxo gastroesofágico',
      'Gastroparesia'
    ],
    mecanismoAcao: 'Antagonista D2 periférico. Não atravessa barreira hematoencefálica (menos EPS). Procinético.',
    posologias: [
      {
        indicacao: 'Dispepsia/Náusea',
        adultos: { dose: '10mg', frequencia: '3x/dia antes refeições', doseMaxima: '30mg/dia' },
        pediatrico: { dose: '0,25mg/kg', frequencia: '3x/dia', observacoes: '<35kg usar suspensão' }
      }
    ],
    contraindicacoes: ['Prolactinoma', 'Uso com inibidores CYP3A4 potentes', 'Prolongamento QT', 'Insuficiência hepática'],
    precaucoes: ['Risco arritmias em doses altas ou >1 semana', 'Idosos >60 anos', 'Cardiopatas'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Cefaleia', 'Hiperprolactinemia', 'Galactorreia'],
      graves: ['Prolongamento QT', 'Arritmias', 'Morte súbita cardíaca']
    },
    interacoes: [
      { medicamento: 'Cetoconazol', gravidade: 'grave', efeito: 'Aumento domperidona 3x', conduta: 'Contraindicado' },
      { medicamento: 'Eritromicina', gravidade: 'grave', efeito: 'Aumento domperidona + QT aditivo', conduta: 'Contraindicado' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Aumenta produção de leite. Uso curto.' }
  },

  // ============================================================================
  // LAXANTES
  // ============================================================================
  {
    id: 'lactulose',
    nomeGenerico: 'Lactulose',
    nomesComerciais: ['Lactulona', 'Duphalac', 'Farlac'],
    atcCode: 'A06AD11',
    classeTerapeutica: 'laxante',
    subclasse: 'osmotico',
    rename: true,
    apresentacoes: [
      { forma: 'xarope', concentracao: '667mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Constipação crônica',
      'Encefalopatia hepática',
      'Preparo colonoscopia (adjuvante)'
    ],
    mecanismoAcao: 'Dissacarídeo não absorvível. Fermentado por bactérias colônicas → ácidos orgânicos → efeito osmótico e pH ácido (captura NH3).',
    posologias: [
      {
        indicacao: 'Constipação',
        adultos: { dose: '15-30mL', frequencia: '1-2x/dia', observacoes: 'Ajustar para 2-3 evacuações pastosas/dia' },
        pediatrico: { dose: '5-10mL', frequencia: '1-2x/dia', observacoes: '<1 ano: 2,5-5mL' }
      },
      {
        indicacao: 'Encefalopatia hepática',
        adultos: { dose: '30-45mL', frequencia: '3-4x/dia', observacoes: 'Objetivo: 2-3 evacuações/dia' }
      }
    ],
    contraindicacoes: ['Galactosemia', 'Obstrução intestinal'],
    precaucoes: ['Diabéticos (contém açúcar)', 'Flatulência inicial comum'],
    efeitosAdversos: {
      comuns: ['Flatulência', 'Distensão abdominal', 'Cólicas', 'Diarreia (dose excessiva)'],
      graves: ['Desidratação e distúrbios eletrolíticos (abuso)']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Não absorvida. Seguro.' }
  },

  {
    id: 'polietilenoglicol',
    nomeGenerico: 'Polietilenoglicol (Macrogol)',
    nomesComerciais: ['Muvinlax', 'Dulcolax Balance', 'Colonitro'],
    atcCode: 'A06AD15',
    classeTerapeutica: 'laxante',
    subclasse: 'osmotico',
    rename: true,
    apresentacoes: [
      { forma: 'po_oral', concentracao: '14g/envelope', disponivelSUS: true },
      { forma: 'po_oral', concentracao: '17g/envelope', disponivelSUS: false }
    ],
    indicacoes: ['Constipação crônica', 'Impactação fecal', 'Preparo colonoscopia'],
    mecanismoAcao: 'Polímero inerte que retém água no lúmen intestinal. Não metabolizado. Não causa distúrbios eletrolíticos.',
    posologias: [
      {
        indicacao: 'Constipação',
        adultos: { dose: '1 envelope (17g)', frequencia: '1x/dia diluído em 240mL água' },
        pediatrico: { dose: '0,5-1,5g/kg/dia', frequencia: '1x/dia' }
      },
      {
        indicacao: 'Impactação fecal',
        adultos: { dose: '100g + 2L água', frequencia: 'Via sonda NG ou oral em 4-6h' },
        pediatrico: { dose: '1-1,5g/kg/dia por 3-6 dias', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Obstrução intestinal', 'Íleo paralítico', 'Perfuração'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Distensão abdominal', 'Cólicas', 'Diarreia'],
      graves: ['Distúrbios eletrolíticos (preparo colonoscopia)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Não absorvido. Seguro.' }
  },

  {
    id: 'bisacodil',
    nomeGenerico: 'Bisacodil',
    nomesComerciais: ['Dulcolax', 'Lacto-Purga'],
    atcCode: 'A06AB02',
    classeTerapeutica: 'laxante',
    subclasse: 'estimulante',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'supositorio', concentracao: '10mg', disponivelSUS: false }
    ],
    indicacoes: ['Constipação aguda', 'Preparo exames/cirurgias', 'Uso curto prazo'],
    mecanismoAcao: 'Derivado difenilmetano. Estimula plexo mioentérico → contrações colônicas. Inibe absorção de água.',
    posologias: [
      {
        indicacao: 'Constipação',
        adultos: { dose: '5-10mg', frequencia: 'à noite', doseMaxima: '15mg/dia' },
        pediatrico: { dose: '5mg', frequencia: 'à noite', observacoes: '>6 anos' }
      }
    ],
    contraindicacoes: ['Obstrução intestinal', 'Apendicite', 'Doença inflamatória intestinal ativa'],
    precaucoes: ['Uso prolongado: dependência, hipocalemia', 'Não usar com antiácidos/IBP (dissolve revestimento)'],
    efeitosAdversos: {
      comuns: ['Cólicas abdominais', 'Diarreia', 'Náusea'],
      graves: ['Hipocalemia (uso crônico)', 'Cólon catártico (uso prolongado)']
    },
    interacoes: [
      { medicamento: 'Antiácidos/IBP', gravidade: 'moderada', efeito: 'Dissolução prematura (irritação gástrica)', conduta: 'Separar em 1h' },
      { medicamento: 'Diuréticos', gravidade: 'moderada', efeito: 'Hipocalemia aditiva', conduta: 'Monitorar K+' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorção sistêmica mínima' }
  },

  // ============================================================================
  // ANTIDIARREICOS
  // ============================================================================
  {
    id: 'loperamida',
    nomeGenerico: 'Loperamida',
    nomesComerciais: ['Imosec', 'Diasec', 'Imodium'],
    atcCode: 'A07DA03',
    classeTerapeutica: 'antidiarreico',
    subclasse: 'opioide_periferico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '0,2mg/mL', disponivelSUS: false }
    ],
    indicacoes: ['Diarreia aguda não infecciosa', 'Diarreia crônica', 'Síndrome intestino curto', 'Ileostomia'],
    mecanismoAcao: 'Agonista opioide mu periférico. Reduz peristalse e secreção intestinal. Não atravessa BHE.',
    posologias: [
      {
        indicacao: 'Diarreia aguda',
        adultos: { dose: '4mg inicial + 2mg após cada evacuação líquida', frequencia: 'Conforme necessidade', doseMaxima: '16mg/dia' },
        pediatrico: { dose: '0,1mg/kg após cada evacuação', frequencia: 'Máx 3 doses/dia', observacoes: '>2 anos' }
      }
    ],
    contraindicacoes: ['Diarreia infecciosa invasiva (febre, sangue)', 'Colite pseudomembranosa', '<2 anos', 'Íleo paralítico'],
    precaucoes: ['Doses altas: prolongamento QT', 'Não usar se suspeita de infecção bacteriana invasiva'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Dor abdominal', 'Náusea', 'Boca seca'],
      graves: ['Megacólon tóxico', 'Prolongamento QT (doses altas)', 'Íleo paralítico']
    },
    interacoes: [
      { medicamento: 'QT prolongadores', gravidade: 'moderada', efeito: 'Prolongamento QT em doses altas', conduta: 'Não exceder 16mg/dia' },
      { medicamento: 'Gemfibrozil', gravidade: 'moderada', efeito: 'Aumenta loperamida 2x', conduta: 'Cautela' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Quantidades mínimas no leite' }
  },

  {
    id: 'racecadotrila',
    nomeGenerico: 'Racecadotrila',
    nomesComerciais: ['Tiorfan', 'Tiorflex'],
    atcCode: 'A07XA04',
    classeTerapeutica: 'antidiarreico',
    subclasse: 'antissecretor',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: false },
      { forma: 'sache', concentracao: '10mg', disponivelSUS: false },
      { forma: 'sache', concentracao: '30mg', disponivelSUS: false }
    ],
    indicacoes: ['Diarreia aguda (especialmente pediátrica)', 'Adjuvante a reidratação oral'],
    mecanismoAcao: 'Inibidor da encefalinase. Reduz hipersecreção intestinal sem afetar motilidade (não causa constipação rebote).',
    posologias: [
      {
        indicacao: 'Diarreia aguda',
        adultos: { dose: '100mg', frequencia: '3x/dia no início das refeições', observacoes: 'Por até 7 dias' },
        pediatrico: { dose: '1,5mg/kg', frequencia: '3x/dia', observacoes: 'Usar sachê pediátrico' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Náusea'],
      graves: ['Angioedema (raro)']
    },
    interacoes: [
      { medicamento: 'IECAs', gravidade: 'moderada', efeito: 'Risco aumentado de angioedema', conduta: 'Cautela' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  // ============================================================================
  // ANTIESPASMÓDICOS
  // ============================================================================
  {
    id: 'butilescopolamina',
    nomeGenerico: 'Butilescopolamina',
    nomesComerciais: ['Buscopan', 'Hioscina'],
    atcCode: 'A03BB01',
    classeTerapeutica: 'antiespamodico',
    subclasse: 'anticolinergico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '10mg/mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '20mg/mL', disponivelSUS: true },
      { forma: 'supositorio', concentracao: '10mg', disponivelSUS: false }
    ],
    indicacoes: ['Cólicas abdominais', 'Cólica renal', 'Cólica biliar', 'Dismenorreia', 'Espasmos TGI'],
    mecanismoAcao: 'Anticolinérgico quaternário. Não atravessa BHE (menos efeitos centrais). Relaxa musculatura lisa.',
    posologias: [
      {
        indicacao: 'Cólicas',
        adultos: { dose: '10-20mg', frequencia: '3-5x/dia', doseMaxima: '100mg/dia' },
        pediatrico: { dose: '0,3-0,5mg/kg', frequencia: '3x/dia', observacoes: '>6 anos' }
      },
      {
        indicacao: 'Cólica aguda IM/IV',
        adultos: { dose: '20mg IV/IM', frequencia: 'Pode repetir após 30min', doseMaxima: '100mg/dia' }
      }
    ],
    contraindicacoes: ['Glaucoma ângulo fechado', 'Miastenia gravis', 'Megacólon', 'Taquiarritmias'],
    precaucoes: ['Hipertrofia prostática', 'Obstrução pilórica', 'Estenose GI'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Taquicardia', 'Constipação', 'Visão turva'],
      graves: ['Retenção urinária', 'Glaucoma agudo', 'Anafilaxia (IV)']
    },
    interacoes: [
      { medicamento: 'Anticolinérgicos', gravidade: 'moderada', efeito: 'Efeitos aditivos', conduta: 'Cautela' },
      { medicamento: 'Metoclopramida', gravidade: 'moderada', efeito: 'Antagonismo procinético', conduta: 'Evitar combinação' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Quantidades mínimas. Provavelmente seguro.' }
  },

  // ============================================================================
  // TRATAMENTO H. PYLORI
  // ============================================================================
  {
    id: 'subcitrato-bismuto',
    nomeGenerico: 'Subcitrato de Bismuto Coloidal',
    nomesComerciais: ['Peptulan', 'Bismuto'],
    atcCode: 'A02BX05',
    classeTerapeutica: 'protetor_gastrico',
    subclasse: 'bismuto',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '120mg', disponivelSUS: true }
    ],
    indicacoes: ['Erradicação H. pylori (terapia quádrupla)', 'Úlcera péptica', 'Dispepsia'],
    mecanismoAcao: 'Forma complexo sobre úlcera. Bactericida contra H. pylori. Estimula prostaglandinas e muco.',
    posologias: [
      {
        indicacao: 'Erradicação H. pylori',
        adultos: { dose: '120mg', frequencia: '4x/dia (30min antes refeições e ao deitar) por 14 dias', observacoes: 'Com IBP + metronidazol + tetraciclina' }
      }
    ],
    contraindicacoes: ['Insuficiência renal grave', 'Gravidez'],
    precaucoes: ['Uso prolongado: neurotoxicidade por bismuto', 'Escurece fezes e língua (normal)'],
    efeitosAdversos: {
      comuns: ['Fezes escuras', 'Língua escura', 'Náusea', 'Constipação'],
      graves: ['Encefalopatia por bismuto (uso prolongado)', 'Nefrotoxicidade']
    },
    interacoes: [
      { medicamento: 'Tetraciclinas', gravidade: 'moderada', efeito: 'Reduz absorção tetraciclina', conduta: 'Usar no esquema padrão (eficaz)' },
      { medicamento: 'Quinolonas', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar em 2h' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Bismuto excretado no leite. Evitar.' }
  },

  // ============================================================================
  // ENZIMAS DIGESTIVAS
  // ============================================================================
  {
    id: 'pancreatina',
    nomeGenerico: 'Pancreatina',
    nomesComerciais: ['Creon', 'Panzytrat', 'Ultrase'],
    atcCode: 'A09AA02',
    classeTerapeutica: 'enzima_digestiva',
    subclasse: 'pancreatica',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '10.000 UI lipase', disponivelSUS: true },
      { forma: 'capsula', concentracao: '25.000 UI lipase', disponivelSUS: true },
      { forma: 'capsula', concentracao: '40.000 UI lipase', disponivelSUS: false }
    ],
    indicacoes: [
      'Insuficiência pancreática exócrina',
      'Fibrose cística',
      'Pancreatite crônica',
      'Pós-ressecção pancreática'
    ],
    mecanismoAcao: 'Contém lipase, amilase e protease. Substitui enzimas pancreáticas para digestão de gorduras, carboidratos e proteínas.',
    posologias: [
      {
        indicacao: 'Insuficiência pancreática',
        adultos: { dose: '25.000-75.000 UI lipase', frequencia: 'A cada refeição principal', observacoes: 'Ajustar conforme esteatorreia' },
        pediatrico: { dose: '1.000-2.500 UI lipase/kg/refeição', frequencia: 'A cada refeição', doseMaxima: '10.000 UI/kg/dia' }
      }
    ],
    contraindicacoes: ['Pancreatite aguda (fase inicial)', 'Hipersensibilidade a proteínas suínas'],
    precaucoes: ['Doses muito altas: colonopatia fibrosante (crianças FC)', 'Engolir inteira (microsferas ácido-resistentes)'],
    efeitosAdversos: {
      comuns: ['Dor abdominal', 'Náusea', 'Diarreia', 'Constipação'],
      graves: ['Colonopatia fibrosante (doses altíssimas)', 'Hiperuricemia']
    },
    interacoes: [
      { medicamento: 'Antiácidos', gravidade: 'moderada', efeito: 'Podem reduzir atividade enzimática', conduta: 'Evitar uso excessivo' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Não absorvida. Seguro.' }
  },

  // ============================================================================
  // TRATAMENTO DII
  // ============================================================================
  {
    id: 'mesalazina',
    nomeGenerico: 'Mesalazina (5-ASA)',
    nomesComerciais: ['Asalit', 'Pentasa', 'Mesacol'],
    atcCode: 'A07EC02',
    classeTerapeutica: 'anti_inflamatorio_intestinal',
    subclasse: 'aminossalicilato',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido_liberacao_prolongada', concentracao: '400mg', disponivelSUS: true },
      { forma: 'comprimido_liberacao_prolongada', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido_liberacao_prolongada', concentracao: '800mg', disponivelSUS: true },
      { forma: 'supositorio', concentracao: '500mg', disponivelSUS: true },
      { forma: 'enema', concentracao: '3g/100mL', disponivelSUS: true },
      { forma: 'granulado', concentracao: '1g', disponivelSUS: false }
    ],
    indicacoes: [
      'Retocolite ulcerativa (indução e manutenção)',
      'Doença de Crohn colônica leve',
      'Proctite ulcerativa'
    ],
    mecanismoAcao: 'Ação tópica na mucosa intestinal. Inibe produção de prostaglandinas, leucotrienos e citocinas.',
    posologias: [
      {
        indicacao: 'RCU ativa',
        adultos: { dose: '2,4-4,8g/dia', frequencia: 'Em doses divididas ou dose única' }
      },
      {
        indicacao: 'RCU manutenção',
        adultos: { dose: '1,5-3g/dia', frequencia: '1x/dia ou doses divididas' }
      },
      {
        indicacao: 'Proctite',
        adultos: { dose: 'Supositório 1g', frequencia: '1x/dia à noite', observacoes: 'Pode associar enema' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade a salicilatos', 'Insuficiência renal grave'],
    precaucoes: ['Monitorar função renal', 'Pode exacerbar colite inicialmente', 'Pancreatite (raro)'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Náusea', 'Dor abdominal', 'Diarreia paradoxal'],
      graves: ['Nefrite intersticial', 'Pancreatite', 'Miocardite', 'Hepatotoxicidade', 'Discrasias sanguíneas']
    },
    interacoes: [
      { medicamento: 'Azatioprina', gravidade: 'moderada', efeito: 'Inibe TPMT, aumenta toxicidade azatioprina', conduta: 'Monitorar hemograma' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Pode aumentar anticoagulação', conduta: 'Monitorar INR' }
    ],
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: 'Cautela' },
      { tfg: '15-30', ajuste: 'Evitar' },
      { tfg: '<15', ajuste: 'Contraindicado' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Quantidades mínimas. Monitorar diarreia no lactente.' }
  },

  {
    id: 'sulfassalazina',
    nomeGenerico: 'Sulfassalazina',
    nomesComerciais: ['Azulfin', 'Salazopyrin'],
    atcCode: 'A07EC01',
    classeTerapeutica: 'anti_inflamatorio_intestinal',
    subclasse: 'aminossalicilato',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Retocolite ulcerativa',
      'Doença de Crohn colônica',
      'Artrite reumatoide',
      'Espondilite anquilosante'
    ],
    mecanismoAcao: 'Pró-droga clivada por bactérias colônicas em 5-ASA (ativo local) + sulfapiridina (efeitos sistêmicos/adversos).',
    posologias: [
      {
        indicacao: 'RCU',
        adultos: { dose: '1g 4x/dia na crise, 500mg 4x/dia manutenção', frequencia: 'Com alimentos' }
      },
      {
        indicacao: 'Artrite reumatoide',
        adultos: { dose: '500mg 2x/dia inicial, aumentar até 2-3g/dia', frequencia: 'Em doses divididas' }
      }
    ],
    contraindicacoes: ['Alergia a sulfa', 'Porfiria', 'Obstrução intestinal/urinária'],
    precaucoes: ['Deficiência G6PD', 'Monitorar hemograma', 'Suplementar ácido fólico'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Cefaleia', 'Anorexia', 'Rash', 'Oligospermia reversível'],
      graves: ['Agranulocitose', 'SJS', 'Hepatotoxicidade', 'Nefrotoxicidade', 'Síndrome lúpus-like']
    },
    interacoes: [
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Reduz absorção digoxina', conduta: 'Monitorar níveis' },
      { medicamento: 'Metotrexato', gravidade: 'moderada', efeito: 'Aumenta toxicidade MTX', conduta: 'Monitorar' },
      { medicamento: 'Ácido fólico', gravidade: 'moderada', efeito: 'Sulfassalazina inibe absorção folato', conduta: 'Suplementar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível. Monitorar diarreia/icterícia no lactente.' }
  }
];
