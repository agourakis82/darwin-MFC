/**
 * EXPANSÃO ONCOLOGIA SUPORTE - DARWIN-MFC
 * ========================================
 * Medicamentos de suporte oncológico: antieméticos, fatores de crescimento,
 * protetores de mucosa, tratamento de efeitos adversos da quimioterapia.
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosOncologiaSuporte: Partial<Medicamento>[] = [
  // ==================== ANTIEMÉTICOS QUIMIOTERAPIA ====================
  {
    id: 'ondansetrona-oncologia',
    nomeGenerico: 'Ondansetrona',
    nomesComerciais: ['Zofran', 'Vonau'],
    atcCode: 'A04AA01',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_5ht3',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '8mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '4mg/2ml', disponivelSUS: true },
      { forma: 'comprimido_orodispersivel', concentracao: '8mg', disponivelSUS: false }
    ],
    indicacoes: ['NVIQ (náusea/vômito induzido por quimioterapia)', 'NVPO', 'Náusea por radioterapia'],
    mecanismoAcao: 'Antagonista seletivo do receptor 5-HT3 de serotonina.',
    posologias: [
      {
        indicacao: 'NVIQ alto risco',
        adultos: { dose: '8mg IV ou 16-24mg VO', frequencia: '30min antes QT, repetir 8/8h por 1-2 dias' },
        pediatrico: { dose: '0,15mg/kg IV (máx 8mg)', frequencia: '30min antes QT', idadeMinima: '6 meses' }
      },
      {
        indicacao: 'NVPO',
        adultos: { dose: '4mg IV lento', frequencia: 'Fim da cirurgia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Uso concomitante apomorfina'],
    precaucoes: ['Prolongamento QT dose-dependente (máx 16mg/dose IV)', 'Constipação', 'Cefaleia'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Cefaleia', 'Fadiga'],
      graves: ['Prolongamento QT', 'Síndrome serotoninérgica']
    },
    interacoes: [
      { medicamento: 'Apomorfina', gravidade: 'grave', efeito: 'Hipotensão grave', conduta: 'Contraindicado' },
      { medicamento: 'Prolongadores QT', gravidade: 'moderada', efeito: 'Risco arritmia', conduta: 'Monitorar ECG' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  {
    id: 'granisetrona',
    nomeGenerico: 'Granisetrona',
    nomesComerciais: ['Kytril', 'Sancuso'],
    atcCode: 'A04AA02',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_5ht3',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '1mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['NVIQ', 'NVPO', 'Náusea por radioterapia'],
    mecanismoAcao: 'Antagonista 5-HT3 com meia-vida mais longa que ondansetrona.',
    posologias: [
      {
        indicacao: 'NVIQ',
        adultos: { dose: '1mg IV ou 2mg VO', frequencia: '30-60min antes QT' },
        pediatrico: { dose: '10-40mcg/kg IV', frequencia: 'Dose única antes QT', idadeMinima: '2 anos' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Prolongamento QT', 'Constipação'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Constipação', 'Astenia'],
      graves: ['Prolongamento QT', 'Síndrome serotoninérgica']
    },
    interacoes: [
      { medicamento: 'Indutores CYP3A4', gravidade: 'leve', efeito: 'Reduz níveis', conduta: 'Pode necessitar ajuste' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  {
    id: 'aprepitanto',
    nomeGenerico: 'Aprepitanto',
    nomesComerciais: ['Emend'],
    atcCode: 'A04AD12',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_nk1',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '80mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '125mg', disponivelSUS: false }
    ],
    indicacoes: ['NVIQ alto risco (com dexametasona e 5-HT3)', 'NVPO (dose única)'],
    mecanismoAcao: 'Antagonista do receptor NK-1 (neurocinina) - previne náusea tardia.',
    posologias: [
      {
        indicacao: 'NVIQ alto risco',
        adultos: { dose: 'D1: 125mg; D2-3: 80mg', frequencia: '1x/dia por 3 dias' }
      },
      {
        indicacao: 'NVPO',
        adultos: { dose: '40mg', frequencia: '3h antes anestesia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Uso com pimozida'],
    precaucoes: ['Reduzir dose dexametasona 50% quando associado', 'Interações CYP3A4'],
    efeitosAdversos: {
      comuns: ['Fadiga', 'Soluços', 'Constipação'],
      graves: ['Reações anafiláticas (raro)']
    },
    interacoes: [
      { medicamento: 'Dexametasona', gravidade: 'moderada', efeito: 'Aumenta níveis dexa', conduta: 'Reduzir dexa 50%' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Reduz INR', conduta: 'Monitorar INR' },
      { medicamento: 'Contraceptivos hormonais', gravidade: 'moderada', efeito: 'Reduz eficácia', conduta: 'Método adicional' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  {
    id: 'fosaprepitanto',
    nomeGenerico: 'Fosaprepitanto',
    nomesComerciais: ['Emend IV'],
    atcCode: 'A04AD13',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_nk1',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '150mg', disponivelSUS: false }
    ],
    indicacoes: ['NVIQ alto risco (regime de dose única IV)'],
    mecanismoAcao: 'Pró-droga IV do aprepitanto, convertida em aprepitanto.',
    posologias: [
      {
        indicacao: 'NVIQ',
        adultos: { dose: '150mg IV', frequencia: '30min antes QT D1 (dose única)' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade ao aprepitanto'],
    precaucoes: ['Reações no local de infusão', 'Mesmas interações do aprepitanto'],
    efeitosAdversos: {
      comuns: ['Fadiga', 'Cefaleia', 'Reação no local infusão'],
      graves: ['Anafilaxia (raro)']
    },
    interacoes: [
      { medicamento: 'Dexametasona', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Reduzir dose dexa' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  {
    id: 'palonosetrona',
    nomeGenerico: 'Palonosetrona',
    nomesComerciais: ['Aloxi'],
    atcCode: 'A04AA05',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_5ht3',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '0,25mg/5ml', disponivelSUS: false },
      { forma: 'capsula', concentracao: '0,5mg', disponivelSUS: false }
    ],
    indicacoes: ['NVIQ (moderado a alto risco)', 'NVPO'],
    mecanismoAcao: 'Antagonista 5-HT3 de segunda geração com alta afinidade e longa meia-vida (40h).',
    posologias: [
      {
        indicacao: 'NVIQ',
        adultos: { dose: '0,25mg IV', frequencia: '30min antes QT (dose única)' },
        pediatrico: { dose: '20mcg/kg IV (máx 1,5mg)', frequencia: 'Dose única', idadeMinima: '1 mês' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Menor risco prolongamento QT que outros 5-HT3', 'Constipação'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Constipação'],
      graves: ['Prolongamento QT (menos que outros)']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  // ==================== FATORES DE CRESCIMENTO ====================
  {
    id: 'filgrastim',
    nomeGenerico: 'Filgrastim (G-CSF)',
    nomesComerciais: ['Granulokine', 'Neupogen'],
    atcCode: 'L03AA02',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '300mcg/ml', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '480mcg/1,6ml', disponivelSUS: true }
    ],
    indicacoes: ['Neutropenia pós-quimioterapia', 'Mobilização células-tronco', 'Neutropenia congênita/cíclica'],
    mecanismoAcao: 'Fator estimulador de colônias de granulócitos recombinante.',
    posologias: [
      {
        indicacao: 'Neutropenia pós-QT (profilaxia primária)',
        adultos: { dose: '5mcg/kg/dia SC', frequencia: '1x/dia até recuperação neutrófilos' },
        pediatrico: { dose: '5-10mcg/kg/dia SC', frequencia: '1x/dia', idadeMinima: 'Lactentes' }
      },
      {
        indicacao: 'Mobilização células-tronco',
        adultos: { dose: '10mcg/kg/dia SC', frequencia: 'Por 5-7 dias' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade a E. coli'],
    precaucoes: ['Dor óssea comum', 'Esplenomegalia (risco ruptura)', 'Não iniciar 24h antes até 24h após QT'],
    efeitosAdversos: {
      comuns: ['Dor óssea (70%)', 'Cefaleia', 'Fadiga'],
      graves: ['Ruptura esplênica', 'SARA', 'Síndrome Sweet']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente não excretado' }
  },

  {
    id: 'pegfilgrastim',
    nomeGenerico: 'Pegfilgrastim',
    nomesComerciais: ['Neulasta', 'Fulphila'],
    atcCode: 'L03AA13',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '6mg/0,6ml', disponivelSUS: false }
    ],
    indicacoes: ['Profilaxia neutropenia febril pós-quimioterapia'],
    mecanismoAcao: 'G-CSF peguilado de longa ação.',
    posologias: [
      {
        indicacao: 'Profilaxia neutropenia',
        adultos: { dose: '6mg SC', frequencia: 'Dose única 24h após cada ciclo QT' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Não administrar 14 dias antes até 24h após QT', 'Dor óssea', 'Esplenomegalia'],
    efeitosAdversos: {
      comuns: ['Dor óssea', 'Mialgia', 'Cefaleia'],
      graves: ['Ruptura esplênica', 'SARA']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  // ==================== PROTETORES DE MUCOSA ====================
  {
    id: 'palifermina',
    nomeGenerico: 'Palifermina',
    nomesComerciais: ['Kepivance'],
    atcCode: 'V03AF08',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '6,25mg', disponivelSUS: false }
    ],
    indicacoes: ['Prevenção mucosite oral grave em TMO'],
    mecanismoAcao: 'Fator de crescimento de queratinócitos recombinante.',
    posologias: [
      {
        indicacao: 'Prevenção mucosite TMO',
        adultos: { dose: '60mcg/kg/dia IV', frequencia: '3 dias antes e 3 dias após TMO' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Não administrar 24h antes até 24h após QT', 'Rash cutâneo', 'Alteração paladar'],
    efeitosAdversos: {
      comuns: ['Rash', 'Prurido', 'Edema', 'Disgeusia'],
      graves: ['Reações alérgicas']
    },
    interacoes: [
      { medicamento: 'Heparina', gravidade: 'leve', efeito: 'Interação in vitro', conduta: 'Não misturar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  // ==================== SUPORTE ÓSSEO ====================
  {
    id: 'acido-zoledronico',
    nomeGenerico: 'Ácido Zoledrônico',
    nomesComerciais: ['Zometa', 'Aclasta'],
    atcCode: 'M05BA08',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '4mg/5ml', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '5mg/100ml', disponivelSUS: true }
    ],
    indicacoes: ['Metástases ósseas', 'Hipercalcemia de malignidade', 'Osteoporose', 'Doença de Paget'],
    mecanismoAcao: 'Bifosfonato potente que inibe reabsorção óssea osteoclástica.',
    posologias: [
      {
        indicacao: 'Metástases ósseas',
        adultos: { dose: '4mg IV em 15min', frequencia: 'A cada 3-4 semanas' }
      },
      {
        indicacao: 'Hipercalcemia de malignidade',
        adultos: { dose: '4mg IV em 15min', frequencia: 'Dose única, repetir se Ca >3mmol/L' }
      },
      {
        indicacao: 'Osteoporose',
        adultos: { dose: '5mg IV', frequencia: 'Anual' }
      }
    ],
    contraindicacoes: ['ClCr <35 (4mg dose)', 'Hipocalcemia não corrigida'],
    precaucoes: ['Hidratação pré-infusão', 'Suplementar cálcio/vitamina D', 'Risco osteonecrose mandíbula', 'Ajuste renal'],
    efeitosAdversos: {
      comuns: ['Febre', 'Mialgia', 'Artralgia (reação fase aguda)', 'Hipocalcemia'],
      graves: ['Osteonecrose de mandíbula', 'Fratura atípica fêmur', 'Insuficiência renal']
    },
    interacoes: [
      { medicamento: 'Aminoglicosídeos', gravidade: 'moderada', efeito: 'Hipocalcemia aditiva', conduta: 'Monitorar cálcio' },
      { medicamento: 'Drogas nefrotóxicas', gravidade: 'moderada', efeito: 'Nefrotoxicidade aditiva', conduta: 'Monitorar função renal' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },

  {
    id: 'denosumabe',
    nomeGenerico: 'Denosumabe',
    nomesComerciais: ['Prolia', 'Xgeva'],
    atcCode: 'M05BX04',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '60mg/ml (Prolia)', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '120mg/1,7ml (Xgeva)', disponivelSUS: false }
    ],
    indicacoes: ['Metástases ósseas (Xgeva)', 'Osteoporose (Prolia)', 'Tumor células gigantes ósseo'],
    mecanismoAcao: 'Anticorpo monoclonal anti-RANKL que inibe ativação osteoclástica.',
    posologias: [
      {
        indicacao: 'Metástases ósseas (Xgeva)',
        adultos: { dose: '120mg SC', frequencia: 'A cada 4 semanas' }
      },
      {
        indicacao: 'Osteoporose (Prolia)',
        adultos: { dose: '60mg SC', frequencia: 'A cada 6 meses' }
      }
    ],
    contraindicacoes: ['Hipocalcemia não corrigida', 'Hipersensibilidade'],
    precaucoes: ['Suplementar Ca/Vit D', 'Osteonecrose mandíbula', 'Hipocalcemia grave', 'Rebote de reabsorção ao parar'],
    efeitosAdversos: {
      comuns: ['Dor extremidades', 'Hipocalcemia', 'Fadiga'],
      graves: ['Osteonecrose de mandíbula', 'Fratura atípica fêmur', 'Hipocalcemia grave']
    },
    interacoes: [],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  },

  // ==================== TRATAMENTO ANEMIA ====================
  {
    id: 'darbepoetina-oncologia',
    nomeGenerico: 'Darbepoetina Alfa',
    nomesComerciais: ['Aranesp'],
    atcCode: 'B03XA02',
    classeTerapeutica: 'suplemento',
    subclasse: 'estimulante_eritropoiese',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '100mcg', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '200mcg', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '300mcg', disponivelSUS: false }
    ],
    indicacoes: ['Anemia por quimioterapia'],
    mecanismoAcao: 'Análogo EPO hiperglicosilado de longa ação.',
    posologias: [
      {
        indicacao: 'Anemia por QT',
        adultos: { dose: '2,25mcg/kg SC semanal ou 500mcg a cada 3 semanas', frequencia: 'Até Hb 12g/dL' }
      }
    ],
    contraindicacoes: ['Hipertensão não controlada', 'Hipersensibilidade'],
    precaucoes: ['Alvo Hb 10-12 (não hipercorrigir)', 'Monitorar PA', 'Risco trombótico em alguns cânceres'],
    efeitosAdversos: {
      comuns: ['Hipertensão', 'Cefaleia', 'Artralgia'],
      graves: ['Eventos tromboembólicos', 'Progressão tumoral (controverso)', 'Aplasia pura']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  // ==================== EXTRAVASAMENTO ====================
  {
    id: 'dexrazoxano',
    nomeGenerico: 'Dexrazoxano',
    nomesComerciais: ['Cardioxane', 'Totect'],
    atcCode: 'V03AF02',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '500mg', disponivelSUS: false }
    ],
    indicacoes: ['Cardioproteção (antraciclinas)', 'Extravasamento antraciclinas'],
    mecanismoAcao: 'Quelante de ferro que protege contra toxicidade cardíaca das antraciclinas.',
    posologias: [
      {
        indicacao: 'Cardioproteção',
        adultos: { dose: 'Razão 10:1 com doxorrubicina (ex: 500mg para cada 50mg doxo)', frequencia: 'Antes de cada dose antraciclina' }
      },
      {
        indicacao: 'Extravasamento',
        adultos: { dose: '1000mg/m² D1 e D2, 500mg/m² D3', frequencia: 'Iniciar até 6h do extravasamento' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Mielossupressão aditiva', 'Não usar em pacientes que não receberão dose cumulativa alta'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Fadiga', 'Anemia', 'Leucopenia'],
      graves: ['Mielossupressão', 'Infecções']
    },
    interacoes: [],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },

  // ==================== ANTÍDOTOS ESPECÍFICOS ====================
  {
    id: 'leucovorina',
    nomeGenerico: 'Leucovorina (Ácido Folínico)',
    nomesComerciais: ['Leukovorin'],
    atcCode: 'V03AF03',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: true }
    ],
    indicacoes: ['Resgate metotrexato alta dose', 'Potencialização 5-FU (FOLFOX/FOLFIRI)', 'Intoxicação por metotrexato'],
    mecanismoAcao: 'Forma reduzida do ácido fólico que bypassa bloqueio por MTX.',
    posologias: [
      {
        indicacao: 'Resgate MTX',
        adultos: { dose: '15mg/m² IV/VO', frequencia: 'A cada 6h por 10 doses (iniciar 24h após MTX)' }
      },
      {
        indicacao: 'Potencialização 5-FU',
        adultos: { dose: '200-400mg/m² IV', frequencia: 'Antes de cada infusão de 5-FU' }
      }
    ],
    contraindicacoes: ['Anemia perniciosa'],
    precaucoes: ['Não usar como substituto de ácido fólico em anemia megaloblástica'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Vômito'],
      graves: ['Reações alérgicas (raro)']
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'leve', efeito: 'Antagonismo (desejado)', conduta: 'Objetivo do resgate' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  {
    id: 'mesna',
    nomeGenerico: 'Mesna',
    nomesComerciais: ['Uromitexan'],
    atcCode: 'V03AF01',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '400mg/4ml', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: false }
    ],
    indicacoes: ['Prevenção cistite hemorrágica por ifosfamida/ciclofosfamida alta dose'],
    mecanismoAcao: 'Tiol que se liga à acroleína (metabólito urotóxico) no trato urinário.',
    posologias: [
      {
        indicacao: 'Profilaxia cistite',
        adultos: { dose: '60-100% da dose de ifosfamida dividido em 3 doses', frequencia: '0, 4 e 8h após cada dose ifosfamida' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade a compostos tiol'],
    precaucoes: ['Não protege contra outras toxicidades', 'Hidratação adequada concomitante'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Vômito', 'Cefaleia', 'Disgeusia'],
      graves: ['Reações alérgicas', 'Hipotensão']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  // ==================== OUTROS SUPORTES ====================
  {
    id: 'megestrol',
    nomeGenerico: 'Megestrol',
    nomesComerciais: ['Megestat'],
    atcCode: 'L02AB01',
    classeTerapeutica: 'hormonio',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '160mg', disponivelSUS: false },
      { forma: 'suspensao_oral', concentracao: '40mg/ml', disponivelSUS: false }
    ],
    indicacoes: ['Caquexia/anorexia oncológica', 'Câncer mama metastático', 'Câncer endométrio'],
    mecanismoAcao: 'Progestágeno com efeito estimulante de apetite e peso.',
    posologias: [
      {
        indicacao: 'Anorexia/caquexia',
        adultos: { dose: '400-800mg/dia', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Tromboembolismo ativo', 'Gravidez'],
    precaucoes: ['Risco trombótico', 'Insuficiência adrenal', 'Hiperglicemia'],
    efeitosAdversos: {
      comuns: ['Edema', 'Ganho de peso', 'Insuficiência adrenal'],
      graves: ['Tromboembolismo', 'Insuficiência adrenal grave']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumenta/diminui INR', conduta: 'Monitorar INR' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  },

  {
    id: 'octreotida',
    nomeGenerico: 'Octreotida',
    nomesComerciais: ['Sandostatin'],
    atcCode: 'H01CB02',
    classeTerapeutica: 'hormonio',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '0,1mg/ml', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '0,5mg/ml', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '20mg LAR', disponivelSUS: true }
    ],
    indicacoes: ['Tumores neuroendócrinos', 'Acromegalia', 'Diarreia refratária', 'Sangramento varicoso'],
    mecanismoAcao: 'Análogo da somatostatina que inibe secreção hormonal.',
    posologias: [
      {
        indicacao: 'Tumor neuroendócrino',
        adultos: { dose: '100-600mcg/dia SC dividido ou LAR 20-30mg IM mensal', frequencia: 'Titular por resposta' }
      },
      {
        indicacao: 'Diarreia refratária/fístula',
        adultos: { dose: '100-200mcg SC', frequencia: '8/8h' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Colelitíase', 'Bradicardia', 'Hipo/hiperglicemia', 'Hipotireoidismo'],
    efeitosAdversos: {
      comuns: ['Dor abdominal', 'Diarreia', 'Náusea', 'Colelitíase'],
      graves: ['Bradicardia', 'Pancreatite', 'Hipoglicemia/hiperglicemia']
    },
    interacoes: [
      { medicamento: 'Ciclosporina', gravidade: 'moderada', efeito: 'Reduz absorção ciclosporina', conduta: 'Monitorar níveis' },
      { medicamento: 'Insulina/ADOs', gravidade: 'moderada', efeito: 'Altera glicemia', conduta: 'Ajustar hipoglicemiantes' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  {
    id: 'dexametasona-oncologia',
    nomeGenerico: 'Dexametasona',
    nomesComerciais: ['Decadron'],
    atcCode: 'H02AB02',
    classeTerapeutica: 'corticoide',
    subclasse: 'glicocorticoide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '4mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['NVIQ (antiemético)', 'Edema cerebral tumoral', 'Compressão medular', 'Linfomas (terapia)'],
    mecanismoAcao: 'Corticoide potente com múltiplos mecanismos antieméticos e anti-edema.',
    posologias: [
      {
        indicacao: 'NVIQ alto risco',
        adultos: { dose: '12mg VO/IV D1, 8mg D2-4', frequencia: 'Conforme risco emetogênico' }
      },
      {
        indicacao: 'Edema cerebral',
        adultos: { dose: '10-16mg IV seguido 4mg 6/6h', frequencia: 'Reduzir gradualmente' }
      },
      {
        indicacao: 'Compressão medular',
        adultos: { dose: '10-100mg IV bolus + 4-24mg 6/6h', frequencia: 'Doses altas iniciais' }
      }
    ],
    contraindicacoes: ['Infecção fúngica sistêmica não tratada'],
    precaucoes: ['Hiperglicemia', 'Imunossupressão', 'Osteoporose', 'Miopatia (doses altas prolongadas)'],
    efeitosAdversos: {
      comuns: ['Hiperglicemia', 'Insônia', 'Edema', 'Ganho peso'],
      graves: ['Sangramento GI', 'Miopatia', 'Infecções oportunistas']
    },
    interacoes: [
      { medicamento: 'Aprepitanto', gravidade: 'moderada', efeito: 'Aumenta níveis dexa', conduta: 'Reduzir dexa 50%' },
      { medicamento: 'Fenitoína', gravidade: 'moderada', efeito: 'Reduz efeito dexa', conduta: 'Pode necessitar aumento' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Doses baixas compatíveis' }
  }
];
