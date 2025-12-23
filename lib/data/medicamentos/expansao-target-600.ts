/**
 * EXPANSÃO TARGET 600 - DARWIN-MFC
 * =================================
 *
 * Medicamentos finais para atingir exatamente 600+
 * ~40 medicamentos únicos
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosTarget600: Partial<Medicamento>[] = [
  // Oftálmicos adicionais
  {
    id: 'dorzolamida',
    nomeGenerico: 'Dorzolamida',
    nomesComerciais: ['Trusopt'],
    atcCode: 'S01EC03',
    classeTerapeutica: 'outros',
    subclasse: 'inibidor_anidrase_carbonica',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '2%', disponivelSUS: false },
    ],
    indicacoes: ['Glaucoma de ângulo aberto', 'Hipertensão ocular'],
    mecanismoAcao: 'Inibidor da anidrase carbônica; reduz produção de humor aquoso',
    posologias: [
      {
        indicacao: 'Glaucoma',
        adultos: { dose: '1 gota', frequencia: '3x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade a sulfonamidas'],
    efeitosAdversos: {
      comuns: ['Ardência', 'Gosto amargo', 'Visão turva'],
      graves: ['Reações alérgicas']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['glaucoma'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'travoprosta',
    nomeGenerico: 'Travoprosta',
    nomesComerciais: ['Travatan'],
    atcCode: 'S01EE04',
    classeTerapeutica: 'outros',
    subclasse: 'analogo_prostaglandina',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,004%', disponivelSUS: false },
    ],
    indicacoes: ['Glaucoma de ângulo aberto', 'Hipertensão ocular'],
    mecanismoAcao: 'Análogo de prostaglandina; aumenta drenagem uveoescleral',
    posologias: [
      {
        indicacao: 'Glaucoma',
        adultos: { dose: '1 gota', frequencia: '1x/dia à noite' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Hiperemia conjuntival', 'Escurecimento da íris', 'Crescimento cílios'],
      graves: ['Edema macular']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['glaucoma'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'bimatoprosta',
    nomeGenerico: 'Bimatoprosta',
    nomesComerciais: ['Lumigan', 'Latisse'],
    atcCode: 'S01EE03',
    classeTerapeutica: 'outros',
    subclasse: 'analogo_prostaglandina',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,03%', disponivelSUS: false },
    ],
    indicacoes: ['Glaucoma de ângulo aberto', 'Hipertensão ocular', 'Hipotricose ciliar'],
    mecanismoAcao: 'Análogo prostamida; aumenta drenagem aquosa',
    posologias: [
      {
        indicacao: 'Glaucoma',
        adultos: { dose: '1 gota', frequencia: '1x/dia à noite' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Hiperemia', 'Crescimento cílios', 'Escurecimento periocular'],
      graves: ['Edema macular']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['glaucoma'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antialérgicos oftálmicos
  {
    id: 'olopatadina-oftalmica',
    nomeGenerico: 'Olopatadina',
    nomesComerciais: ['Patanol', 'Olopatane'],
    atcCode: 'S01GX09',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'segunda_geracao',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,1%', disponivelSUS: false },
      { forma: 'colirio', concentracao: '0,2%', disponivelSUS: false },
    ],
    indicacoes: ['Conjuntivite alérgica'],
    mecanismoAcao: 'Anti-histamínico H1 e estabilizador de mastócitos',
    posologias: [
      {
        indicacao: 'Conjuntivite alérgica',
        adultos: { dose: '1 gota', frequencia: '12/12h (0,1%) ou 1x/dia (0,2%)' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Ardência transitória', 'Cefaleia'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['conjuntivite-alergica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Vitaminas e suplementos
  {
    id: 'vitamina-b1-tiamina',
    nomeGenerico: 'Tiamina (Vitamina B1)',
    nomesComerciais: ['Benerva'],
    atcCode: 'A11DA01',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '100mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Deficiência de B1', 'Beribéri', 'Encefalopatia de Wernicke', 'Neuropatia periférica'],
    mecanismoAcao: 'Coenzima no metabolismo de carboidratos',
    posologias: [
      {
        indicacao: 'Deficiência leve',
        adultos: { dose: '100-300mg', frequencia: '1x/dia VO' },
      },
      {
        indicacao: 'Wernicke (emergência)',
        adultos: { dose: '500mg IV', frequencia: '8/8h x 3 dias, depois 250mg IM/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Bem tolerada'],
      graves: ['Anafilaxia (IV raro)']
    },
    interacoes: [],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['beriberi', 'encefalopatia-wernicke'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'vitamina-b6-piridoxina',
    nomeGenerico: 'Piridoxina (Vitamina B6)',
    nomesComerciais: ['Adera B6'],
    atcCode: 'A11HA02',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: ['Deficiência de B6', 'Neuropatia por isoniazida', 'Náuseas da gestação', 'Homocistinúria'],
    mecanismoAcao: 'Coenzima em reações de aminoácidos',
    posologias: [
      {
        indicacao: 'Deficiência',
        adultos: { dose: '25-100mg', frequencia: '1x/dia' },
      },
      {
        indicacao: 'Profilaxia com isoniazida',
        adultos: { dose: '25-50mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Bem tolerada'],
      graves: ['Neuropatia sensorial (doses >200mg/dia crônicas)']
    },
    interacoes: [
      { medicamento: 'Levodopa', gravidade: 'grave', efeito: 'Reduz eficácia da levodopa', conduta: 'Usar carbidopa-levodopa' },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['neuropatia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'vitamina-b9-acido-folico',
    nomeGenerico: 'Ácido Fólico (Vitamina B9)',
    nomesComerciais: ['Folacin', 'Endofolin'],
    atcCode: 'B03BB01',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
    ],
    indicacoes: ['Anemia megaloblástica', 'Prevenção defeitos tubo neural', 'Suplementação gestacional'],
    mecanismoAcao: 'Coenzima na síntese de DNA',
    posologias: [
      {
        indicacao: 'Prevenção defeitos tubo neural',
        adultos: { dose: '400mcg-5mg', frequencia: '1x/dia (iniciar pré-concepção)' },
      },
      {
        indicacao: 'Anemia megaloblástica',
        adultos: { dose: '1-5mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Anemia perniciosa não tratada (mascara deficiência B12)'],
    efeitosAdversos: {
      comuns: ['Bem tolerado'],
      graves: []
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'moderada', efeito: 'Antagonismo', conduta: 'Usar como resgate após MTX' },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['anemia', 'gestacao'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'vitamina-e-tocoferol',
    nomeGenerico: 'Vitamina E (Tocoferol)',
    nomesComerciais: ['Ephynal'],
    atcCode: 'A11HA03',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '400UI', disponivelSUS: true },
      { forma: 'capsula', concentracao: '1000UI', disponivelSUS: false },
    ],
    indicacoes: ['Deficiência de vitamina E', 'Aterosclerose (controverso)', 'DHGNA'],
    mecanismoAcao: 'Antioxidante lipofílico',
    posologias: [
      {
        indicacao: 'Deficiência',
        adultos: { dose: '400-800UI', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Fadiga'],
      graves: ['Sangramento (doses altas + anticoagulantes)']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Risco de sangramento', conduta: 'Monitorar INR' },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['deficiencia-vitaminica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'vitamina-c-acido-ascorbico',
    nomeGenerico: 'Ácido Ascórbico (Vitamina C)',
    nomesComerciais: ['Cewin', 'Redoxon'],
    atcCode: 'A11GA01',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '1g', disponivelSUS: true },
      { forma: 'gotas', concentracao: '200mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Escorbuto', 'Deficiência vitamina C', 'Absorção de ferro'],
    mecanismoAcao: 'Antioxidante; cofator enzimático; síntese de colágeno',
    posologias: [
      {
        indicacao: 'Suplementação',
        adultos: { dose: '500-1000mg', frequencia: '1x/dia' },
      },
      {
        indicacao: 'Escorbuto',
        adultos: { dose: '1-2g', frequencia: '1x/dia x 2-3 semanas' },
      }
    ],
    contraindicacoes: ['Cálculo renal de oxalato (cautela)'],
    efeitosAdversos: {
      comuns: ['Diarreia (doses altas)', 'Náuseas'],
      graves: ['Nefrolitíase (doses >2g/dia)']
    },
    interacoes: [],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['escorbuto', 'anemia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Minerais
  {
    id: 'zinco-sulfato',
    nomeGenerico: 'Sulfato de Zinco',
    nomesComerciais: ['Zincaps'],
    atcCode: 'A12CB01',
    classeTerapeutica: 'suplemento',
    subclasse: 'mineral',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '50mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '10mg/5ml', disponivelSUS: true },
    ],
    indicacoes: ['Deficiência de zinco', 'Diarreia aguda (crianças)', 'Acrodermatite enteropática'],
    mecanismoAcao: 'Cofator enzimático; função imune',
    posologias: [
      {
        indicacao: 'Diarreia infantil (OMS)',
        adultos: { dose: '20mg', frequencia: '1x/dia x 10-14 dias' },
        pediatrico: { dose: '10-20mg', frequencia: '1x/dia x 10-14 dias' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Gosto metálico', 'Dispepsia'],
      graves: []
    },
    interacoes: [
      { medicamento: 'Quinolonas', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar 2h' },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['diarreia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'magnesio-sulfato',
    nomeGenerico: 'Sulfato de Magnésio',
    nomesComerciais: ['Sulfato de Magnésio'],
    atcCode: 'B05XA05',
    classeTerapeutica: 'suplemento',
    subclasse: 'mineral',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '50%', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '50%', disponivelSUS: true },
    ],
    indicacoes: ['Pré-eclâmpsia/eclâmpsia', 'Hipomagnesemia', 'Arritmias (torsades)', 'Asma grave'],
    mecanismoAcao: 'Estabilizador de membrana; anticonvulsivante; vasodilatador',
    posologias: [
      {
        indicacao: 'Eclâmpsia (Zuspan)',
        adultos: { dose: '4g IV em 20min, depois 1-2g/h', frequencia: 'Infusão até 24h pós-parto' },
      },
      {
        indicacao: 'Torsades de pointes',
        adultos: { dose: '1-2g IV em 5-20min', frequencia: 'Dose única ou repetir' },
      }
    ],
    contraindicacoes: ['Bloqueio cardíaco', 'Miastenia gravis', 'Insuficiência renal grave'],
    efeitosAdversos: {
      comuns: ['Rubor', 'Hipotensão', 'Fraqueza'],
      graves: ['Depressão respiratória', 'Parada cardíaca']
    },
    interacoes: [
      { medicamento: 'Bloqueadores neuromusculares', gravidade: 'grave', efeito: 'Potencializa bloqueio', conduta: 'Cautela' },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Reflexo patelar', 'FR', 'Diurese', 'Magnésio sérico'],
    doencasRelacionadas: ['pre-eclampsia', 'eclampsia', 'arritmia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'gluconato-calcio',
    nomeGenerico: 'Gluconato de Cálcio',
    nomesComerciais: ['Gluconato de Cálcio'],
    atcCode: 'A12AA03',
    classeTerapeutica: 'suplemento',
    subclasse: 'mineral',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '10%', disponivelSUS: true },
    ],
    indicacoes: ['Hipocalcemia sintomática', 'Hipercalemia grave', 'Hipermagnesemia', 'Intoxicação por BCC'],
    mecanismoAcao: 'Reposição de cálcio; estabilizador cardíaco',
    posologias: [
      {
        indicacao: 'Hipocalcemia aguda',
        adultos: { dose: '1-2g IV lento (10-20ml)', frequencia: 'Em 10min, pode repetir' },
      },
      {
        indicacao: 'Hipercalemia (proteção cardíaca)',
        adultos: { dose: '1g IV em 2-3min', frequencia: 'Repetir se ECG persistir alterado' },
      }
    ],
    contraindicacoes: ['Hipercalcemia', 'Uso de digitálicos (cautela extrema)'],
    efeitosAdversos: {
      comuns: ['Rubor', 'Náuseas'],
      graves: ['Necrose se extravasamento', 'Arritmias (infusão rápida)']
    },
    interacoes: [
      { medicamento: 'Digoxina', gravidade: 'grave', efeito: 'Toxicidade digitálica', conduta: 'Infundir muito lentamente' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['hipocalcemia', 'hipercalemia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'cloreto-potassio',
    nomeGenerico: 'Cloreto de Potássio',
    nomesComerciais: ['KCl', 'Slow-K'],
    atcCode: 'A12BA01',
    classeTerapeutica: 'suplemento',
    subclasse: 'eletrolito',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '600mg (8mEq)', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '10%', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '19,1%', disponivelSUS: true },
    ],
    indicacoes: ['Hipocalemia', 'Prevenção hipocalemia (uso de diuréticos)'],
    mecanismoAcao: 'Reposição de potássio',
    posologias: [
      {
        indicacao: 'Hipocalemia leve (K 3-3,5)',
        adultos: { dose: '40-80mEq/dia VO', frequencia: 'Dividido em 2-4 tomadas' },
      },
      {
        indicacao: 'Hipocalemia grave',
        adultos: { dose: '10-20mEq/h IV', frequencia: 'Max 40mEq/L periférico; monitorar ECG' },
      }
    ],
    contraindicacoes: ['Hipercalemia', 'Insuficiência renal grave', 'Doença de Addison não tratada'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Dor abdominal', 'Diarreia'],
      graves: ['Hipercalemia', 'Arritmias', 'Úlcera GI (formas orais)']
    },
    interacoes: [
      { medicamento: 'IECA/BRA', gravidade: 'moderada', efeito: 'Hipercalemia', conduta: 'Monitorar K+' },
      { medicamento: 'Espironolactona', gravidade: 'moderada', efeito: 'Hipercalemia', conduta: 'Monitorar K+' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['K+ sérico', 'ECG em reposição IV'],
    doencasRelacionadas: ['hipocalemia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antieméticos adicionais
  {
    id: 'dimenidrinato',
    nomeGenerico: 'Dimenidrinato',
    nomesComerciais: ['Dramin', 'Dramamine'],
    atcCode: 'A04AD',
    classeTerapeutica: 'antiemetico',
    subclasse: 'h1_1geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '25mg/ml', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '50mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Cinetose', 'Náuseas e vômitos', 'Vertigem'],
    mecanismoAcao: 'Anticolinérgico central; anti-histamínico',
    posologias: [
      {
        indicacao: 'Náuseas/Cinetose',
        adultos: { dose: '50-100mg', frequencia: '6/6h PRN' },
        pediatrico: { dose: '1-1,5mg/kg', frequencia: '6/6h', idadeMinima: '2 anos' },
      }
    ],
    contraindicacoes: ['Glaucoma de ângulo fechado', 'Retenção urinária', 'Menores de 2 anos'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Boca seca', 'Visão turva'],
      graves: ['Confusão (idosos)', 'Retenção urinária']
    },
    interacoes: [
      { medicamento: 'Depressores SNC', gravidade: 'moderada', efeito: 'Sedação aditiva', conduta: 'Cautela' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível com cautela' },
    doencasRelacionadas: ['vertigem', 'nausea'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'bromoprida',
    nomeGenerico: 'Bromoprida',
    nomesComerciais: ['Digesan', 'Plamet'],
    atcCode: 'A03FA04',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_d2',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '4mg/ml', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '10mg/2ml', disponivelSUS: true },
    ],
    indicacoes: ['Náuseas e vômitos', 'Refluxo', 'Gastroparesia'],
    mecanismoAcao: 'Antagonista D2; procinético',
    posologias: [
      {
        indicacao: 'Náuseas/Vômitos',
        adultos: { dose: '10mg', frequencia: '8/8h antes das refeições' },
      }
    ],
    contraindicacoes: ['Obstrução GI', 'Feocromocitoma', 'Epilepsia'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Astenia'],
      graves: ['SEP', 'Discinesia tardia']
    },
    interacoes: [
      { medicamento: 'Antipsicóticos', gravidade: 'moderada', efeito: 'SEP aditivo', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Pode aumentar lactação' },
    doencasRelacionadas: ['nausea', 'drge'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'domperidona',
    nomeGenerico: 'Domperidona',
    nomesComerciais: ['Motilium', 'Peridal'],
    atcCode: 'A03FA03',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_d2',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '1mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Náuseas e vômitos', 'Dispepsia', 'Gastroparesia'],
    mecanismoAcao: 'Antagonista D2 periférico; procinético',
    posologias: [
      {
        indicacao: 'Náuseas/Dispepsia',
        adultos: { dose: '10mg', frequencia: '3x/dia antes das refeições', doseMaxima: '30mg/dia' },
      }
    ],
    contraindicacoes: ['Prolactinoma', 'QT longo', 'Uso com inibidores CYP3A4'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Cefaleia'],
      graves: ['Prolongamento QT', 'Arritmias', 'Galactorreia']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4', gravidade: 'contraindicada', efeito: 'Arritmia', conduta: 'Contraindicado' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Usado como galactogogo' },
    monitorizacao: ['ECG em pacientes de risco'],
    doencasRelacionadas: ['nausea', 'gastroparesia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antiespasmódicos
  {
    id: 'escopolamina-hioscina',
    nomeGenerico: 'Escopolamina (Hioscina)',
    nomesComerciais: ['Buscopan'],
    atcCode: 'A03BB01',
    classeTerapeutica: 'antiespamodico',
    subclasse: 'anticolinergico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '10mg/ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '20mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Cólica abdominal', 'Cólica renal', 'Cólica biliar', 'Espasmos GI'],
    mecanismoAcao: 'Anticolinérgico; relaxante musculatura lisa',
    posologias: [
      {
        indicacao: 'Cólicas',
        adultos: { dose: '10-20mg', frequencia: '4x/dia PRN' },
      }
    ],
    contraindicacoes: ['Glaucoma de ângulo fechado', 'Miastenia gravis', 'Taquicardia'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Taquicardia', 'Visão turva'],
      graves: ['Retenção urinária', 'Confusão (idosos)']
    },
    interacoes: [
      { medicamento: 'Anticolinérgicos', gravidade: 'moderada', efeito: 'Efeito aditivo', conduta: 'Cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Pode reduzir lactação' },
    doencasRelacionadas: ['colica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'trimebutina',
    nomeGenerico: 'Trimebutina',
    nomesComerciais: ['Debridat'],
    atcCode: 'A03AA05',
    classeTerapeutica: 'antiespamodico',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: false },
      { forma: 'suspensao_oral', concentracao: '24mg/ml', disponivelSUS: false },
    ],
    indicacoes: ['Síndrome do intestino irritável', 'Distúrbios motilidade GI'],
    mecanismoAcao: 'Agonista receptores opioides periféricos; modula motilidade',
    posologias: [
      {
        indicacao: 'SII',
        adultos: { dose: '200mg', frequencia: '3x/dia antes das refeições' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Sonolência', 'Cefaleia'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['sii'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Laxantes
  {
    id: 'bisacodil',
    nomeGenerico: 'Bisacodil',
    nomesComerciais: ['Dulcolax', 'Lacto-purga'],
    atcCode: 'A06AB02',
    classeTerapeutica: 'laxante',
    subclasse: 'estimulante',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'supositorio', concentracao: '10mg', disponivelSUS: true },
    ],
    indicacoes: ['Constipação', 'Preparo para exames/cirurgias'],
    mecanismoAcao: 'Estimulante; aumenta peristaltismo e secreção',
    posologias: [
      {
        indicacao: 'Constipação',
        adultos: { dose: '5-15mg VO ou 10mg retal', frequencia: '1x/dia à noite' },
      }
    ],
    contraindicacoes: ['Obstrução intestinal', 'Abdome agudo', 'Doença inflamatória intestinal aguda'],
    efeitosAdversos: {
      comuns: ['Cólica abdominal', 'Diarreia'],
      graves: ['Desequilíbrio eletrolítico (uso crônico)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    orientacoesPaciente: ['Não usar cronicamente; usar apenas para constipação eventual'],
    doencasRelacionadas: ['constipacao'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'lactulose',
    nomeGenerico: 'Lactulose',
    nomesComerciais: ['Lactulona', 'Farlac'],
    atcCode: 'A06AD11',
    classeTerapeutica: 'laxante',
    subclasse: 'osmotico',
    rename: true,
    apresentacoes: [
      { forma: 'xarope', concentracao: '667mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Constipação', 'Encefalopatia hepática'],
    mecanismoAcao: 'Laxativo osmótico; acidifica cólon (EH)',
    posologias: [
      {
        indicacao: 'Constipação',
        adultos: { dose: '15-30ml', frequencia: '1-2x/dia' },
      },
      {
        indicacao: 'Encefalopatia hepática',
        adultos: { dose: '30-45ml', frequencia: '3-4x/dia (alvo: 2-3 evacuações/dia)' },
      }
    ],
    contraindicacoes: ['Galactosemia', 'Obstrução intestinal'],
    efeitosAdversos: {
      comuns: ['Flatulência', 'Cólica', 'Distensão'],
      graves: ['Hipernatremia (EH)', 'Desidratação']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['constipacao', 'encefalopatia-hepatica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'polietilenoglicol-peg',
    nomeGenerico: 'Polietilenoglicol (PEG)',
    nomesComerciais: ['Muvinlax', 'Miralax'],
    atcCode: 'A06AD15',
    classeTerapeutica: 'laxante',
    subclasse: 'osmotico',
    rename: true,
    apresentacoes: [
      { forma: 'po_oral', concentracao: '17g/sache', disponivelSUS: true },
    ],
    indicacoes: ['Constipação crônica', 'Impactação fecal', 'Preparo colonoscopia'],
    mecanismoAcao: 'Laxativo osmótico; retenção de água no cólon',
    posologias: [
      {
        indicacao: 'Constipação',
        adultos: { dose: '17g (1 sache)', frequencia: '1x/dia diluído em água' },
      }
    ],
    contraindicacoes: ['Obstrução intestinal', 'Perfuração GI'],
    efeitosAdversos: {
      comuns: ['Distensão', 'Náuseas', 'Cólica leve'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Não absorvido' },
    doencasRelacionadas: ['constipacao'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antidiarreicos
  {
    id: 'loperamida',
    nomeGenerico: 'Loperamida',
    nomesComerciais: ['Imosec', 'Diasec'],
    atcCode: 'A07DA03',
    classeTerapeutica: 'antidiarreico',
    subclasse: 'opioide_periferico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
    ],
    indicacoes: ['Diarreia aguda', 'Diarreia crônica', 'Síndrome intestino curto'],
    mecanismoAcao: 'Agonista opioide periférico; reduz motilidade e secreção',
    posologias: [
      {
        indicacao: 'Diarreia aguda',
        adultos: { dose: '4mg inicial, depois 2mg', frequencia: 'Após cada evacuação', doseMaxima: '16mg/dia' },
      }
    ],
    contraindicacoes: ['Diarreia infecciosa invasiva', 'Colite por C. difficile', 'Íleo', 'Menores de 2 anos'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Cólica', 'Náuseas'],
      graves: ['Megacólon tóxico', 'Íleo paralítico']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Quantidade mínima no leite' },
    orientacoesPaciente: ['Não usar em diarreia com sangue ou febre'],
    doencasRelacionadas: ['diarreia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'racecadotrila',
    nomeGenerico: 'Racecadotrila',
    nomesComerciais: ['Tiorfan', 'Hidrasec'],
    atcCode: 'A07XA04',
    classeTerapeutica: 'antidiarreico',
    subclasse: 'antissecretor',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: false },
      { forma: 'sache', concentracao: '10mg', disponivelSUS: false },
      { forma: 'sache', concentracao: '30mg', disponivelSUS: false },
    ],
    indicacoes: ['Diarreia aguda (adultos e crianças)'],
    mecanismoAcao: 'Inibidor de encefalinase; antissecretor intestinal',
    posologias: [
      {
        indicacao: 'Diarreia aguda',
        adultos: { dose: '100mg', frequencia: '3x/dia até cessar diarreia' },
        pediatrico: { dose: '1,5mg/kg', frequencia: '3x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Náuseas'],
      graves: ['Angioedema (raro)']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['diarreia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Anti-histamínicos adicionais
  {
    id: 'desloratadina',
    nomeGenerico: 'Desloratadina',
    nomesComerciais: ['Desalex', 'Clarinex'],
    atcCode: 'R06AX27',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'xarope', concentracao: '0,5mg/ml', disponivelSUS: false },
    ],
    indicacoes: ['Rinite alérgica', 'Urticária crônica'],
    mecanismoAcao: 'Anti-histamínico H1 de segunda geração; metabólito ativo da loratadina',
    posologias: [
      {
        indicacao: 'Rinite/Urticária',
        adultos: { dose: '5mg', frequencia: '1x/dia' },
        pediatrico: { dose: '1,25-2,5mg', frequencia: '1x/dia (por idade)' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Fadiga', 'Boca seca'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['rinite-alergica', 'urticaria'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'bilastina',
    nomeGenerico: 'Bilastina',
    nomesComerciais: ['Alektos', 'Bilaxis'],
    atcCode: 'R06AX29',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
    ],
    indicacoes: ['Rinite alérgica', 'Urticária'],
    mecanismoAcao: 'Anti-histamínico H1; não atravessa BHE',
    posologias: [
      {
        indicacao: 'Rinite/Urticária',
        adultos: { dose: '20mg', frequencia: '1x/dia em jejum' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'DRC grave'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Sonolência (rara)'],
      graves: []
    },
    interacoes: [
      { medicamento: 'Alimentos', gravidade: 'leve', efeito: 'Reduz absorção', conduta: 'Tomar em jejum' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['rinite-alergica', 'urticaria'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'rupatadina',
    nomeGenerico: 'Rupatadina',
    nomesComerciais: ['Rupafin'],
    atcCode: 'R06AX28',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
    ],
    indicacoes: ['Rinite alérgica', 'Urticária'],
    mecanismoAcao: 'Anti-histamínico H1 + antagonista PAF',
    posologias: [
      {
        indicacao: 'Rinite/Urticária',
        adultos: { dose: '10mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Hepatopatia grave'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Cefaleia', 'Fadiga'],
      graves: ['Prolongamento QT (raro)']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['rinite-alergica', 'urticaria'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Descongestionantes
  {
    id: 'oximetazolina-nasal',
    nomeGenerico: 'Oximetazolina',
    nomesComerciais: ['Afrin', 'Naridrin'],
    atcCode: 'R01AA05',
    classeTerapeutica: 'descongestionante',
    subclasse: 'simpatomimetico',
    rename: false,
    apresentacoes: [
      { forma: 'spray_nasal', concentracao: '0,05%', disponivelSUS: false },
    ],
    indicacoes: ['Congestão nasal', 'Sinusite', 'Rinite'],
    mecanismoAcao: 'Agonista alfa-adrenérgico; vasoconstritor',
    posologias: [
      {
        indicacao: 'Congestão nasal',
        adultos: { dose: '2-3 jatos', frequencia: '12/12h por até 3-5 dias' },
      }
    ],
    contraindicacoes: ['Uso crônico', 'Glaucoma de ângulo fechado', 'Menores de 6 anos'],
    efeitosAdversos: {
      comuns: ['Ardência nasal', 'Espirros', 'Ressecamento'],
      graves: ['Rinite medicamentosa (uso >5-7 dias)', 'Hipertensão']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Crise hipertensiva', conduta: 'Contraindicado' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso tópico limitado é seguro' },
    orientacoesPaciente: ['Não usar por mais de 3-5 dias; risco de dependência nasal'],
    doencasRelacionadas: ['rinite', 'sinusite'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Mucolíticos
  {
    id: 'acetilcisteina',
    nomeGenerico: 'Acetilcisteína',
    nomesComerciais: ['Fluimucil', 'NAC'],
    atcCode: 'R05CB01',
    classeTerapeutica: 'mucolitico',
    subclasse: 'tiol',
    rename: true,
    apresentacoes: [
      { forma: 'granulado', concentracao: '200mg', disponivelSUS: true },
      { forma: 'granulado', concentracao: '600mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '40mg/ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '200mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Mucolítico', 'Intoxicação por paracetamol', 'DPOC (antioxidante)'],
    mecanismoAcao: 'Mucolítico; precursor de glutationa (antídoto)',
    posologias: [
      {
        indicacao: 'Mucolítico',
        adultos: { dose: '200mg', frequencia: '3x/dia ou 600mg 1x/dia' },
      },
      {
        indicacao: 'Intoxicação paracetamol',
        adultos: { dose: '150mg/kg IV em 1h, depois 50mg/kg em 4h, depois 100mg/kg em 16h', frequencia: 'Protocolo 21h' },
      }
    ],
    contraindicacoes: ['Úlcera péptica ativa (VO)'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Vômitos', 'Diarreia'],
      graves: ['Broncoespasmo (nebulização)', 'Anafilaxia (IV)']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['dpoc', 'intoxicacao-paracetamol'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ambroxol',
    nomeGenerico: 'Ambroxol',
    nomesComerciais: ['Mucosolvan', 'Ambrax'],
    atcCode: 'R05CB06',
    classeTerapeutica: 'mucolitico',
    subclasse: 'benzilamin',
    rename: true,
    apresentacoes: [
      { forma: 'xarope', concentracao: '6mg/ml', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '7,5mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Afecções respiratórias com secreção'],
    mecanismoAcao: 'Mucolítico; estimula produção de surfactante',
    posologias: [
      {
        indicacao: 'Mucolítico',
        adultos: { dose: '30mg', frequencia: '3x/dia' },
        pediatrico: { dose: '7,5-15mg', frequencia: '2-3x/dia (por idade)' },
      }
    ],
    contraindicacoes: ['Úlcera péptica', 'Primeiro trimestre gestação'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Diarreia', 'Dispepsia'],
      graves: ['Reações cutâneas graves (Stevens-Johnson raro)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Excretado no leite; cautela' },
    doencasRelacionadas: ['ivas', 'bronquite'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antitussígenos
  {
    id: 'dextrometorfano',
    nomeGenerico: 'Dextrometorfano',
    nomesComerciais: ['Silencium', 'Benalet'],
    atcCode: 'R05DA09',
    classeTerapeutica: 'antitussigeno',
    subclasse: 'nao_opioide',
    rename: false,
    apresentacoes: [
      { forma: 'xarope', concentracao: '3mg/ml', disponivelSUS: false },
    ],
    indicacoes: ['Tosse seca não produtiva'],
    mecanismoAcao: 'Supressor central da tosse; antagonista NMDA',
    posologias: [
      {
        indicacao: 'Tosse',
        adultos: { dose: '10-30mg', frequencia: '6-8/8h', doseMaxima: '120mg/dia' },
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'Tosse produtiva'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Sonolência', 'Náuseas'],
      graves: ['Síndrome serotoninérgica', 'Abuso/dependência']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Intervalo 14 dias' },
      { medicamento: 'ISRS', gravidade: 'moderada', efeito: 'Síndrome serotoninérgica', conduta: 'Cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível em doses baixas' },
    doencasRelacionadas: ['tosse'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'codeina-antitussigeno',
    nomeGenerico: 'Codeína',
    nomesComerciais: ['Setux', 'Belacodid'],
    atcCode: 'R05DA04',
    classeTerapeutica: 'antitussigeno',
    subclasse: 'opioide',
    rename: true,
    apresentacoes: [
      { forma: 'xarope', concentracao: '3mg/ml', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: true },
    ],
    indicacoes: ['Tosse seca intratável', 'Dor leve-moderada'],
    mecanismoAcao: 'Agonista opioide; supressor central da tosse',
    posologias: [
      {
        indicacao: 'Tosse',
        adultos: { dose: '10-20mg', frequencia: '6/6h PRN', doseMaxima: '120mg/dia' },
      }
    ],
    contraindicacoes: ['Depressão respiratória', 'Asma aguda', 'Menores de 12 anos', 'Metabolizadores ultrarrápidos CYP2D6'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Sonolência', 'Náuseas'],
      graves: ['Depressão respiratória', 'Dependência']
    },
    interacoes: [
      { medicamento: 'Depressores SNC', gravidade: 'grave', efeito: 'Depressão respiratória', conduta: 'Evitar ou reduzir doses' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Contraindicado; risco apneia neonatal' },
    orientacoesPaciente: ['Receita especial B1; potencial de dependência'],
    doencasRelacionadas: ['tosse'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antibióticos oftálmicos
  {
    id: 'tobramicina-oftalmica',
    nomeGenerico: 'Tobramicina',
    nomesComerciais: ['Tobrex'],
    atcCode: 'S01AA12',
    classeTerapeutica: 'antibiotico',
    subclasse: 'aminoglicosideo',
    rename: true,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,3%', disponivelSUS: true },
      { forma: 'pomada', concentracao: '0,3%', disponivelSUS: true },
    ],
    indicacoes: ['Conjuntivite bacteriana', 'Blefarite', 'Úlcera de córnea'],
    mecanismoAcao: 'Aminoglicosídeo; bactericida',
    posologias: [
      {
        indicacao: 'Conjuntivite',
        adultos: { dose: '1-2 gotas', frequencia: '4-6x/dia x 7 dias' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade a aminoglicosídeos'],
    efeitosAdversos: {
      comuns: ['Ardência transitória', 'Hiperemia'],
      graves: ['Reações alérgicas']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Absorção sistêmica mínima' },
    doencasRelacionadas: ['conjuntivite'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ciprofloxacino-oftalmico',
    nomeGenerico: 'Ciprofloxacino',
    nomesComerciais: ['Ciloxan'],
    atcCode: 'S01AE03',
    classeTerapeutica: 'antibiotico',
    subclasse: 'fluoroquinolona',
    rename: true,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,3%', disponivelSUS: true },
      { forma: 'pomada', concentracao: '0,3%', disponivelSUS: true },
    ],
    indicacoes: ['Conjuntivite bacteriana', 'Úlcera de córnea', 'Profilaxia cirúrgica'],
    mecanismoAcao: 'Fluoroquinolona; bactericida',
    posologias: [
      {
        indicacao: 'Conjuntivite',
        adultos: { dose: '1-2 gotas', frequencia: '4x/dia x 7 dias' },
      },
      {
        indicacao: 'Úlcera de córnea',
        adultos: { dose: '2 gotas 15/15min x 6h, depois 30/30min, depois 1/1h', frequencia: 'Conforme evolução' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade a quinolonas'],
    efeitosAdversos: {
      comuns: ['Desconforto', 'Depósitos corneanos brancos'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorção sistêmica mínima' },
    doencasRelacionadas: ['conjuntivite', 'ulcera-cornea'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antifúngicos tópicos
  {
    id: 'nistatina-topica',
    nomeGenerico: 'Nistatina',
    nomesComerciais: ['Micostatin'],
    atcCode: 'A07AA02',
    classeTerapeutica: 'antifungico',
    subclasse: 'polieno',
    rename: true,
    apresentacoes: [
      { forma: 'suspensao_oral', concentracao: '100.000UI/ml', disponivelSUS: true },
      { forma: 'creme', concentracao: '100.000UI/g', disponivelSUS: true },
      { forma: 'pomada', concentracao: '100.000UI/g', disponivelSUS: true },
    ],
    indicacoes: ['Candidíase oral', 'Candidíase cutânea', 'Candidíase vaginal'],
    mecanismoAcao: 'Poliênico; liga-se ao ergosterol da membrana fúngica',
    posologias: [
      {
        indicacao: 'Candidíase oral',
        adultos: { dose: '4-6ml', frequencia: '4x/dia (bochechar e engolir)' },
        pediatrico: { dose: '1-2ml', frequencia: '4x/dia' },
      },
      {
        indicacao: 'Candidíase cutânea',
        adultos: { dose: 'Aplicar fina camada', frequencia: '2-3x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Vômitos', 'Diarreia'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Não absorvida; compatível' },
    doencasRelacionadas: ['candidiase'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'clotrimazol-topico',
    nomeGenerico: 'Clotrimazol',
    nomesComerciais: ['Canesten', 'Clotrimix'],
    atcCode: 'D01AC01',
    classeTerapeutica: 'antifungico',
    subclasse: 'azol_topico',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '1%', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '1%', disponivelSUS: true },
      { forma: 'ovulo', concentracao: '500mg', disponivelSUS: true },
    ],
    indicacoes: ['Dermatofitoses', 'Candidíase cutânea', 'Candidíase vaginal', 'Pitiríase versicolor'],
    mecanismoAcao: 'Azol; inibe síntese de ergosterol',
    posologias: [
      {
        indicacao: 'Dermatofitose/Candidíase cutânea',
        adultos: { dose: 'Aplicar fina camada', frequencia: '2x/dia x 2-4 semanas' },
      },
      {
        indicacao: 'Candidíase vaginal',
        adultos: { dose: '1 óvulo 500mg', frequencia: 'Dose única ou 1 óvulo 100mg x 6 noites' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Primeiro trimestre (vaginal)'],
    efeitosAdversos: {
      comuns: ['Irritação local', 'Prurido'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso tópico é compatível' },
    doencasRelacionadas: ['micose', 'candidiase'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
];
