/**
 * ONCOLOGIA SUPORTE - DARWIN-MFC EXPANSAO 1000
 * =============================================
 * Medicamentos de suporte oncologico: antiemeticos de segunda geracao,
 * fatores de crescimento hematopoietico, uroprotecao, cardioproteção,
 * tratamento sindrome de lise tumoral e resgate quimioterapico.
 *
 * Referencias:
 * - ASCO/NCCN Antiemetic Guidelines 2024
 * - ASCO Guidelines for Use of Growth Factors
 * - FDA Prescribing Information
 * - EMA Summary of Product Characteristics
 * - PharmGKB Pharmacogenomics Database
 * - WHO ATC Index 2024
 * - RxNorm (NIH/NLM)
 * - DrugBank 5.0
 * - SNOMED CT International Edition
 */

import { Medicamento } from '@/lib/types/medicamento';

export const oncologiaSuporte: Partial<Medicamento>[] = [
  // ============================================================================
  // ANTIEMETICOS - ANTAGONISTAS 5-HT3 (Segunda Geracao)
  // ============================================================================
  {
    id: 'palonosetron',
    nomeGenerico: 'Palonosetrona',
    nomesComerciais: ['Aloxi', 'Onicit'],
    atcCode: 'A04AA05',
    rxNormCui: '372567',
    drugBankId: 'DB00377',
    snomedCT: '416133008',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_5ht3',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '0,25mg/5ml', disponivelSUS: false },
      { forma: 'capsula', concentracao: '0,5mg', disponivelSUS: false }
    ],
    indicacoes: [
      'NVIQ (nausea/vomito induzido por quimioterapia) - risco moderado a alto',
      'NVPO (nausea/vomito pos-operatorio)',
      'Nausea tardia por quimioterapia'
    ],
    mecanismoAcao: 'Antagonista de SEGUNDA GERACAO do receptor 5-HT3 de serotonina com ALTA AFINIDADE DE LIGACAO (pKi 10,45) e LONGA MEIA-VIDA (40h vs 4-9h dos outros 5-HT3). Liga-se de forma alosterica positiva ao receptor, promovendo internalizacao prolongada do receptor. Eficacia superior na fase tardia de NVIQ comparado a antagonistas de primeira geracao.',
    posologias: [
      {
        indicacao: 'NVIQ - Quimioterapia altamente emetogenica',
        adultos: { dose: '0,25mg IV', frequencia: 'Dose unica 30 minutos antes da quimioterapia', observacoes: 'Associar com dexametasona e antagonista NK-1 para esquema triplo' }
      },
      {
        indicacao: 'NVIQ - Quimioterapia moderadamente emetogenica',
        adultos: { dose: '0,25mg IV ou 0,5mg VO', frequencia: 'Dose unica 30-60 minutos antes', observacoes: 'Sem necessidade de doses adicionais devido a longa meia-vida' },
        pediatrico: { dose: '20mcg/kg IV (max 1,5mg)', frequencia: 'Dose unica', idadeMinima: '1 mes', doseMaxima: '1,5mg' }
      },
      {
        indicacao: 'NVPO',
        adultos: { dose: '0,075mg IV', frequencia: 'Dose unica na inducao anestesica' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a palonosetrona ou outros antagonistas 5-HT3'
    ],
    precaucoes: [
      'MENOR RISCO de prolongamento QTc comparado a ondansetrona',
      'Constipacao (monitorar, especialmente em opioides concomitantes)',
      'Cefaleia transitoria comum',
      'Uso em insuficiencia hepatica/renal: sem ajuste necessario',
      'Evitar associacao com apomorfina (risco de hipotensao)'
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia (5-9%)', 'Constipacao', 'Tontura', 'Fadiga'],
      graves: ['Sindrome serotoninergica (com outros agentes serotoninergicos)', 'Arritmias (raro)', 'Reacoes de hipersensibilidade']
    },
    interacoes: [
      { medicamento: 'Apomorfina', gravidade: 'grave', efeito: 'Hipotensao profunda e perda de consciencia', conduta: 'Contraindicada associacao' },
      { medicamento: 'ISRSs/IRSN', gravidade: 'moderada', efeito: 'Risco de sindrome serotoninergica', mecanismo: 'Aumento cumulativo da serotonina', conduta: 'Monitorar sintomas, usar com cautela' },
      { medicamento: 'Tramadol', gravidade: 'moderada', efeito: 'Sindrome serotoninergica', conduta: 'Monitorar' },
      { medicamento: 'Metoclopramida', gravidade: 'leve', efeito: 'Antagonismo farmacologico teorico', conduta: 'Evitar associacao concomitante' }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Sem ajuste (dados limitados, mas provavelmente seguro)' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Dados limitados, provavelmente seguro devido a dose unica e peso molecular' },
    monitorizacao: ['ECG se uso concomitante de outros prolongadores QT', 'Funcao intestinal (constipacao)'],
    doencasRelacionadas: ['cancer', 'quimioterapia', 'nausea-vomito'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['5-HT3', 'antiemetico', 'segunda-geracao', 'NVIQ', 'oncologia', 'quimioterapia']
  },
  {
    id: 'ondansetrona-oncologia-suporte',
    nomeGenerico: 'Ondansetrona',
    nomesComerciais: ['Zofran', 'Vonau', 'Nausedron'],
    atcCode: 'A04AA01',
    rxNormCui: '26225',
    drugBankId: 'DB00904',
    snomedCT: '372487007',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_5ht3',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '8mg', disponivelSUS: true },
      { forma: 'comprimido_orodispersivel', concentracao: '4mg', disponivelSUS: false },
      { forma: 'comprimido_orodispersivel', concentracao: '8mg', disponivelSUS: false },
      { forma: 'injetavel_iv', concentracao: '4mg/2ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '8mg/4ml', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '4mg/5ml', disponivelSUS: false }
    ],
    indicacoes: [
      'NVIQ (nausea/vomito induzido por quimioterapia)',
      'NVPO (nausea/vomito pos-operatorio)',
      'Nausea por radioterapia',
      'Nausea refrataria em cuidados paliativos'
    ],
    mecanismoAcao: 'Antagonista SELETIVO do receptor 5-HT3 de serotonina nos neuronios aferentes vagais perifericos e na zona de gatilho quimiorreceptora (CTZ). Bloqueia a serotonina liberada pelas celulas enterocromafins em resposta a agentes quimioterapicos. Antagonista de PRIMEIRA GERACAO com meia-vida de 3-6h.',
    posologias: [
      {
        indicacao: 'NVIQ alto risco emetogenico',
        adultos: { dose: '8mg IV ou 16-24mg VO', frequencia: '30 min antes QT, depois 8/8h por 1-2 dias', doseMaxima: '16mg/dose IV (FDA 2012)', observacoes: 'LIMITACAO FDA: dose maxima IV unica de 16mg por risco QT' },
        pediatrico: { dose: '0,15mg/kg IV (max 8mg/dose)', frequencia: '30 min antes QT, repetir 4-8h se necessario', idadeMinima: '6 meses', doseMaxima: '8mg' }
      },
      {
        indicacao: 'NVIQ moderado risco',
        adultos: { dose: '8mg IV ou VO', frequencia: '30 min antes QT, repetir 8h depois', observacoes: 'Pode associar dexametasona' }
      },
      {
        indicacao: 'NVPO profilaxia',
        adultos: { dose: '4mg IV lento', frequencia: 'Ao final da cirurgia, dose unica' }
      },
      {
        indicacao: 'Radioterapia',
        adultos: { dose: '8mg VO', frequencia: '1-2h antes da sessao, depois 8/8h' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a ondansetrona ou outros 5-HT3',
      'Uso concomitante com apomorfina',
      'Sindrome do QT longo congenita'
    ],
    precaucoes: [
      'ALERTA FDA: Prolongamento QTc DOSE-DEPENDENTE - max 16mg IV por dose',
      'Constipacao comum (especialmente com opioides)',
      'Cefaleia frequente',
      'Sindrome serotoninergica com ISRSs',
      'Cautela em hepatopatia (reduzir dose max para 8mg/dia)',
      'Fenilcetonuricos: formas orodispersiveis contem aspartame'
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia (17-27%)', 'Constipacao (9-11%)', 'Fadiga', 'Diarreia paradoxal'],
      graves: ['Prolongamento QT/Torsades de pointes', 'Sindrome serotoninergica', 'Reacoes anafilacticas', 'Hepatotoxicidade transitoria']
    },
    interacoes: [
      { medicamento: 'Apomorfina', gravidade: 'contraindicada', efeito: 'Hipotensao profunda', conduta: 'CONTRAINDICADO' },
      { medicamento: 'Medicamentos que prolongam QT (antiarritmicos, antipsicoticos)', gravidade: 'grave', efeito: 'Prolongamento QTc aditivo', mecanismo: 'Bloqueio canal hERG', conduta: 'Monitorar ECG, evitar doses altas' },
      { medicamento: 'ISRSs (fluoxetina, sertralina)', gravidade: 'moderada', efeito: 'Sindrome serotoninergica', conduta: 'Monitorar sintomas' },
      { medicamento: 'Tramadol', gravidade: 'moderada', efeito: 'Reducao analgesia + sindrome serotoninergica', conduta: 'Usar alternativa se possivel' },
      { medicamento: 'Rifampicina', gravidade: 'moderada', efeito: 'Reducao niveis ondansetrona (indutor CYP3A4)', conduta: 'Pode necessitar aumento dose' }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Sem ajuste (excrecao renal minima)' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Excrecao minima no leite, provavelmente seguro' },
    consideracoesEspeciais: {
      idosos: 'Sem ajuste rotineiro, cautela com QT',
      hepatopatas: 'Dose maxima 8mg/dia em cirrose Child-Pugh C',
      pediatrico: 'Aprovado para >6 meses; usar dose por peso'
    },
    monitorizacao: ['ECG se fatores de risco para QT longo', 'Eletrolitos (K, Mg)', 'Funcao intestinal'],
    doencasRelacionadas: ['cancer', 'quimioterapia', 'cirurgia', 'radioterapia'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['5-HT3', 'antiemetico', 'NVIQ', 'NVPO', 'oncologia', 'rename', 'alerta-QT']
  },
  {
    id: 'granisetron',
    nomeGenerico: 'Granisetrona',
    nomesComerciais: ['Kytril', 'Sancuso', 'Sustol'],
    atcCode: 'A04AA02',
    rxNormCui: '4757',
    drugBankId: 'DB00889',
    snomedCT: '386844009',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_5ht3',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
      { forma: 'injetavel_iv', concentracao: '1mg/ml', disponivelSUS: true },
      { forma: 'adesivo', concentracao: '3,1mg/24h (Sancuso)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '10mg (Sustol - liberacao prolongada)', disponivelSUS: false }
    ],
    indicacoes: [
      'NVIQ (nausea/vomito induzido por quimioterapia)',
      'NVPO',
      'Nausea por radioterapia',
      'NVIQ em regimes de multiplos dias (adesivo transdermico)'
    ],
    mecanismoAcao: 'Antagonista seletivo do receptor 5-HT3 com MEIA-VIDA MAIS LONGA (9-12h) que ondansetrona. Meia-vida permite dosagem 1x/dia. Formulacao transdérmica (Sancuso) libera por 5 dias, ideal para regimes de QT de multiplos dias. Sustol e formulacao de liberacao prolongada SC.',
    posologias: [
      {
        indicacao: 'NVIQ',
        adultos: { dose: '1mg IV ou 2mg VO', frequencia: '30-60 minutos antes da quimioterapia', observacoes: 'Pode repetir dose IV apos 12h se necessario' },
        pediatrico: { dose: '10-40mcg/kg IV', frequencia: 'Dose unica antes QT', idadeMinima: '2 anos', doseMaxima: '1mg' }
      },
      {
        indicacao: 'NVIQ multiplos dias (transdermico)',
        adultos: { dose: 'Adesivo 3,1mg/24h', frequencia: 'Aplicar 24-48h antes da QT, manter por ate 7 dias', observacoes: 'Ideal para cisplatina ou regimes de 3-5 dias' }
      },
      {
        indicacao: 'NVIQ (liberacao prolongada SC)',
        adultos: { dose: '10mg SC', frequencia: 'Dose unica 30 min antes da QT, efeito por 5 dias', observacoes: 'Sustol - indicado para quimio moderada a altamente emetogenica' }
      },
      {
        indicacao: 'NVPO',
        adultos: { dose: '1mg IV', frequencia: 'Antes ou ao final da anestesia' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a granisetrona',
      'Formulacao transdérmica: alergia a adesivos'
    ],
    precaucoes: [
      'Prolongamento QT (menor que ondansetrona)',
      'Constipacao',
      'Reacao no local do adesivo (eritema, prurido)',
      'Reacao no local da injecao SC (nodulo pode persistir)',
      'Cefaleia comum'
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia (14-21%)', 'Constipacao (10-18%)', 'Astenia', 'Diarreia'],
      graves: ['Prolongamento QT', 'Sindrome serotoninergica', 'Reacoes de hipersensibilidade']
    },
    interacoes: [
      { medicamento: 'Indutores CYP3A4 (rifampicina, fenitoina)', gravidade: 'moderada', efeito: 'Reducao niveis de granisetrona', conduta: 'Pode necessitar ajuste de dose' },
      { medicamento: 'ISRSs', gravidade: 'moderada', efeito: 'Sindrome serotoninergica', conduta: 'Monitorar' },
      { medicamento: 'Prolongadores QT', gravidade: 'moderada', efeito: 'Efeito aditivo QT', conduta: 'Monitorar ECG' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Dados limitados, provavelmente seguro' },
    monitorizacao: ['ECG em pacientes com risco QT', 'Local de aplicacao (transdermico)', 'Funcao intestinal'],
    doencasRelacionadas: ['cancer', 'quimioterapia', 'radioterapia'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['5-HT3', 'antiemetico', 'NVIQ', 'transdermico', 'oncologia', 'rename']
  },

  // ============================================================================
  // ANTIEMETICOS - ANTAGONISTAS NK-1
  // ============================================================================
  {
    id: 'aprepitant',
    nomeGenerico: 'Aprepitanto',
    nomesComerciais: ['Emend'],
    atcCode: 'A04AD12',
    rxNormCui: '358255',
    drugBankId: 'DB00673',
    snomedCT: '416393003',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_nk1',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '40mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '80mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '125mg', disponivelSUS: false }
    ],
    indicacoes: [
      'NVIQ alto risco emetogenico (regime triplo com 5-HT3 + dexametasona)',
      'NVIQ moderado risco em pacientes selecionados',
      'NVPO (dose unica de 40mg)'
    ],
    mecanismoAcao: 'Antagonista SELETIVO do receptor de neurocinina-1 (NK-1) que bloqueia a substancia P. A substancia P e liberada tardiamente apos quimioterapia e atua na CTZ e no nucleo do trato solitario. Eficaz especialmente na FASE TARDIA (dias 2-5) de NVIQ, complementando os antagonistas 5-HT3 que sao mais eficazes na fase aguda.',
    posologias: [
      {
        indicacao: 'NVIQ alto risco (regime 3 dias)',
        adultos: { dose: 'D1: 125mg; D2: 80mg; D3: 80mg', frequencia: '1x/dia por 3 dias, iniciando 1h antes da QT no D1', observacoes: 'Associar com 5-HT3 no D1 e dexametasona D1-4. REDUZIR DEXAMETASONA 50% pela interacao' }
      },
      {
        indicacao: 'NVPO',
        adultos: { dose: '40mg', frequencia: '3h antes da inducao anestesica, dose unica' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao aprepitanto',
      'Uso concomitante com pimozida (risco de arritmia)',
      'Uso concomitante com cisaprida'
    ],
    precaucoes: [
      'INTERACAO IMPORTANTE com dexametasona - reduzir dose da dexa em 50%',
      'Inibidor moderado CYP3A4 e indutor CYP2C9',
      'Reduz eficacia de contraceptivos hormonais por 28 dias',
      'Monitorar INR em usuarios de varfarina',
      'Fadiga e solucos comuns'
    ],
    efeitosAdversos: {
      comuns: ['Fadiga (15-18%)', 'Solucos (4-11%)', 'Constipacao', 'Cefaleia', 'Anorexia'],
      graves: ['Reacoes anafilacticas (raro)', 'Stevens-Johnson (muito raro)', 'Bradicardia']
    },
    interacoes: [
      { medicamento: 'Dexametasona', gravidade: 'moderada', efeito: 'Aumenta AUC da dexametasona em 2x', mecanismo: 'Inibicao CYP3A4', conduta: 'REDUZIR dose de dexametasona em 50%' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Reduz INR (inducao CYP2C9)', conduta: 'Monitorar INR nos dias 7-10 apos o ciclo de aprepitanto' },
      { medicamento: 'Contraceptivos hormonais', gravidade: 'moderada', efeito: 'Reduz eficacia', conduta: 'Usar metodo adicional durante e 28 dias apos' },
      { medicamento: 'Pimozida', gravidade: 'contraindicada', efeito: 'Risco de arritmia por aumento de pimozida', conduta: 'CONTRAINDICADO' },
      { medicamento: 'Docetaxel, paclitaxel, etoposido', gravidade: 'leve', efeito: 'Pequeno aumento de niveis', conduta: 'Monitorar toxicidade' },
      { medicamento: 'Rifampicina', gravidade: 'grave', efeito: 'Reduz drasticamente niveis de aprepitanto', conduta: 'Evitar ou usar alternativa' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes, evitar' },
    monitorizacao: ['INR se uso de varfarina', 'Eficacia contraceptiva'],
    doencasRelacionadas: ['cancer', 'quimioterapia'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['NK-1', 'antiemetico', 'NVIQ', 'fase-tardia', 'oncologia', 'interacao-dexametasona']
  },
  {
    id: 'fosaprepitant',
    nomeGenerico: 'Fosaprepitanto',
    nomesComerciais: ['Emend IV', 'Ivemend'],
    atcCode: 'A04AD13',
    rxNormCui: '616809',
    drugBankId: 'DB06717',
    snomedCT: '449030003',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_nk1',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '150mg', disponivelSUS: false }
    ],
    indicacoes: [
      'NVIQ alto risco (dose unica IV substituindo regime oral de 3 dias)',
      'Pacientes incapazes de ingerir medicacao oral'
    ],
    mecanismoAcao: 'PRO-DROGA do aprepitanto, convertida em aprepitanto por fosfatases no plasma em 30 minutos. Dose unica de 150mg IV equivale ao regime oral de 3 dias (125mg D1 + 80mg D2-3). Permite simplificacao do esquema antiemetico para dose unica no D1.',
    posologias: [
      {
        indicacao: 'NVIQ alto risco',
        adultos: { dose: '150mg IV', frequencia: 'Dose unica 30 minutos antes da quimioterapia no D1', observacoes: 'Infundir em 20-30 minutos. Associar com 5-HT3 e dexametasona (reduzir dexa 50% no D1)' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao aprepitanto ou fosaprepitanto',
      'Uso concomitante com pimozida'
    ],
    precaucoes: [
      'Reacoes no local de infusao (dor, eritema, tromboflebite)',
      'Mesmas interacoes medicamentosas do aprepitanto',
      'Reduzir dexametasona em 50%',
      'Monitorar INR se varfarina'
    ],
    efeitosAdversos: {
      comuns: ['Reacoes no local de infusao (3%)', 'Fadiga', 'Cefaleia', 'Solucos'],
      graves: ['Anafilaxia (raro)', 'Tromboflebite', 'Sindrome de infusao']
    },
    interacoes: [
      { medicamento: 'Dexametasona', gravidade: 'moderada', efeito: 'Aumenta niveis de dexametasona', conduta: 'Reduzir dose de dexametasona em 50% no D1' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Reduz INR', conduta: 'Monitorar INR' },
      { medicamento: 'Contraceptivos hormonais', gravidade: 'moderada', efeito: 'Reduz eficacia', conduta: 'Metodo adicional' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['Local de infusao', 'INR se varfarina'],
    doencasRelacionadas: ['cancer', 'quimioterapia'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['NK-1', 'antiemetico', 'NVIQ', 'intravenoso', 'pro-droga', 'oncologia']
  },

  // ============================================================================
  // FATORES DE CRESCIMENTO HEMATOPOIETICO
  // ============================================================================
  {
    id: 'filgrastim-gcsf',
    nomeGenerico: 'Filgrastim (G-CSF)',
    nomesComerciais: ['Granulokine', 'Neupogen', 'Filgrastim', 'Zarxio', 'Nivestim'],
    atcCode: 'L03AA02',
    rxNormCui: '4192',
    drugBankId: 'DB00099',
    snomedCT: '386947003',
    classeTerapeutica: 'outros',
    subclasse: 'estimulante_eritropoiese',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '300mcg/ml (30MUI)', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '480mcg/0,5ml (48MUI)', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '300mcg/ml', disponivelSUS: true }
    ],
    indicacoes: [
      'Neutropenia febril - profilaxia primaria (risco >20%)',
      'Neutropenia febril - profilaxia secundaria',
      'Mobilizacao de celulas-tronco hematopoieticas',
      'Neutropenia congenita severa',
      'Neutropenia ciclica',
      'Pos-transplante de medula ossea'
    ],
    mecanismoAcao: 'Fator Estimulador de Colonias de Granulócitos (G-CSF) recombinante humano produzido em E. coli. Estimula a proliferacao, diferenciacao e maturacao de precursores neutrofilicos na medula ossea. Aumenta a liberacao de neutrofilos maduros e promove funcao fagocitica. Meia-vida de 3,5h requer administracao diaria.',
    posologias: [
      {
        indicacao: 'Profilaxia neutropenia febril pos-QT',
        adultos: { dose: '5mcg/kg/dia SC', frequencia: '1x/dia, iniciar 24-72h apos QT ate recuperacao neutrofilica', observacoes: 'Continuar ate neutrofilos >1.000-1.500/mm3 ou conforme protocolo' },
        pediatrico: { dose: '5-10mcg/kg/dia SC', frequencia: '1x/dia', idadeMinima: 'Lactentes', observacoes: 'Dose maxima tipica 300mcg/dia' }
      },
      {
        indicacao: 'Mobilizacao celulas-tronco (doador autologico)',
        adultos: { dose: '10mcg/kg/dia SC', frequencia: '1x/dia ou dividido 12/12h por 5-7 dias', observacoes: 'Aferese no D4-5 quando CD34+ adequado' }
      },
      {
        indicacao: 'Neutropenia congenita severa',
        adultos: { dose: '6mcg/kg SC 2x/dia (12mcg/kg/dia)', frequencia: '12/12h, ajustar por resposta', observacoes: 'Dose inicial; titular por neutrofilos' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao filgrastim ou proteinas derivadas de E. coli',
      'Neutropenia congenita severa com anormalidades citogeneticas'
    ],
    precaucoes: [
      'DOR OSSEA muito comum (70%) - tratar com analgesicos',
      'ESPLENOMEGALIA - monitorar tamanho esplenico (risco ruptura)',
      'NAO iniciar 24h antes ate 24h APOS quimioterapia mielossupressora',
      'Leucocitose excessiva (monitorar hemograma)',
      'Sindrome de Sweet (dermatose neutrofilica aguda)',
      'Crise vaso-oclusiva em pacientes com doenca falciforme'
    ],
    efeitosAdversos: {
      comuns: ['Dor ossea (59-79%)', 'Cefaleia', 'Fadiga', 'Nausea', 'Alopecia'],
      graves: ['Ruptura esplenica', 'SARA/Lesao pulmonar aguda', 'Sindrome de Sweet', 'Glomerulonefrite', 'Transformacao leucemica (SCN)', 'Reacao alergica grave']
    },
    interacoes: [
      { medicamento: 'Quimioterapia mielossupressora', gravidade: 'moderada', efeito: 'Estimular precursores em divisao aumenta mielotoxicidade', conduta: 'Nao administrar 24h antes ate 24h apos QT' },
      { medicamento: 'Litio', gravidade: 'leve', efeito: 'Sinergismo na leucocitose', conduta: 'Monitorar hemograma' }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Sem ajuste formal necessario' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Proteina grande, provavelmente nao excretada significativamente' },
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      pediatrico: 'Seguro e eficaz em criancas'
    },
    monitorizacao: ['Hemograma 2x/semana durante uso', 'Tamanho esplenico (palpacao/US)', 'Sintomas respiratorios', 'Dor ossea'],
    doencasRelacionadas: ['neutropenia', 'cancer', 'quimioterapia', 'transplante-medula'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['G-CSF', 'fator-crescimento', 'neutropenia', 'oncologia', 'rename', 'mobilizacao-celulas-tronco']
  },
  {
    id: 'pegfilgrastim-gcsf',
    nomeGenerico: 'Pegfilgrastim',
    nomesComerciais: ['Neulasta', 'Fulphila', 'Udenyca', 'Ziextenzo'],
    atcCode: 'L03AA13',
    rxNormCui: '337522',
    drugBankId: 'DB00019',
    snomedCT: '420649001',
    classeTerapeutica: 'outros',
    subclasse: 'estimulante_eritropoiese',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '6mg/0,6ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Profilaxia neutropenia febril em quimioterapia mielossupressora',
      'Reducao da duracao da neutropenia'
    ],
    mecanismoAcao: 'G-CSF PEGUILADO com molecula de polietilenoglicol de 20kDa conjugada ao N-terminal. A peguilacao AUMENTA A MEIA-VIDA de 3,5h para ~15-80h, permitindo DOSE UNICA por ciclo de quimioterapia. Clearance mediado por neutrofilos (auto-regulacao): quando neutrofilos baixos, meia-vida aumenta; com recuperacao, clearance aumenta.',
    posologias: [
      {
        indicacao: 'Profilaxia neutropenia febril',
        adultos: { dose: '6mg SC', frequencia: 'DOSE UNICA 24h apos cada ciclo de quimioterapia', observacoes: 'Nao administrar entre 14 dias antes ate 24h apos quimioterapia' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao pegfilgrastim, filgrastim ou derivados E. coli',
      'Pacientes com peso <45kg (dose fixa)'
    ],
    precaucoes: [
      'Nao administrar 14 dias antes ate 24h APOS a quimioterapia',
      'Dor ossea comum (30%)',
      'ESPLENOMEGALIA/RUPTURA ESPLENICA - monitorar',
      'Nao usar em quimioterapias semanais (dose-densa exige avaliacao)',
      'Aortite rara mas reportada',
      'SARA/Sindrome de vazamento capilar'
    ],
    efeitosAdversos: {
      comuns: ['Dor ossea (30-35%)', 'Mialgia', 'Cefaleia', 'Fadiga', 'Nausea'],
      graves: ['Ruptura esplenica', 'SARA', 'Sindrome de vazamento capilar', 'Aortite', 'Glomerulonefrite', 'Reacoes alergicas graves']
    },
    interacoes: [
      { medicamento: 'Quimioterapia', gravidade: 'moderada', efeito: 'Potenciacao mielotoxicidade se timing incorreto', conduta: 'Respeitar intervalo de 24h apos QT' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro, proteina grande' },
    monitorizacao: ['Hemograma', 'Tamanho esplenico', 'Sintomas respiratorios', 'Dor vascular (aortite)'],
    doencasRelacionadas: ['neutropenia', 'cancer', 'quimioterapia'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['G-CSF', 'peguilado', 'longa-acao', 'neutropenia', 'oncologia', 'dose-unica']
  },
  {
    id: 'darbepoetin-alfa',
    nomeGenerico: 'Darbepoetina Alfa',
    nomesComerciais: ['Aranesp'],
    atcCode: 'B03XA02',
    rxNormCui: '92416',
    drugBankId: 'DB00012',
    snomedCT: '412261008',
    classeTerapeutica: 'antianemico',
    subclasse: 'estimulante_eritropoiese',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '25mcg', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '40mcg', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '60mcg', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '100mcg', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '150mcg', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '200mcg', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '300mcg', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '500mcg', disponivelSUS: false }
    ],
    indicacoes: [
      'Anemia por quimioterapia em tumores solidos/hematologicos nao mieloides',
      'Anemia da doenca renal cronica (dialise e pre-dialise)'
    ],
    mecanismoAcao: 'Analogo da eritropoetina HIPERGLICOSILADO com 2 cadeias de carboidratos adicionais. A hiperglicosilacao aumenta a MEIA-VIDA de 8-24h (EPO) para 21-73h, permitindo dosagem a cada 1-3 semanas vs. 3x/semana da EPO. Estimula a eritropoiese pela ativacao do receptor de eritropoetina (EPO-R) em precursores eritroide.',
    posologias: [
      {
        indicacao: 'Anemia por quimioterapia',
        adultos: { dose: '2,25mcg/kg SC semanal ou 500mcg SC a cada 3 semanas', frequencia: 'Semanal ou cada 3 semanas', observacoes: 'ALVO: Hb 10-12g/dL. NAO hipercorrigir (risco tromboembolico). Iniciar se Hb <10 e QT restante >=2 ciclos' }
      },
      {
        indicacao: 'Anemia DRC em dialise',
        adultos: { dose: '0,45mcg/kg SC/IV semanal ou 0,75mcg/kg a cada 2 semanas', frequencia: 'Semanal ou quinzenal', observacoes: 'Titular para Hb 10-12g/dL. Evitar Hb >12g/dL' }
      }
    ],
    contraindicacoes: [
      'Hipertensao nao controlada',
      'Hipersensibilidade a darbepoetina ou componentes',
      'Aplasia pura de serie vermelha apos uso de ESA'
    ],
    precaucoes: [
      'BLACK BOX: Aumento de mortalidade e eventos CV/tromboembolicos com alvo Hb >12g/dL',
      'BLACK BOX: Potencial progressao tumoral (controverso)',
      'Alvo Hb: 10-12g/dL (nao hipercorrigir)',
      'Hipertensao (comum, monitorar PA)',
      'Suplementar ferro se ferritina baixa',
      'Descontinuar em cancer se QT concluida ou sem resposta em 8 semanas'
    ],
    efeitosAdversos: {
      comuns: ['Hipertensao (18-32%)', 'Cefaleia', 'Artralgia', 'Fadiga', 'Diarreia'],
      graves: ['Eventos tromboembólicos (TVP, TEP, IAM, AVC)', 'Hipertensao grave', 'Aplasia pura de serie vermelha (raro)', 'Convulsoes']
    },
    interacoes: [
      { medicamento: 'Anti-hipertensivos', gravidade: 'leve', efeito: 'Pode necessitar ajuste devido a aumento da PA', conduta: 'Monitorar PA, ajustar anti-HAS' }
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Geralmente o cenario de uso em DRC - ajustar por Hb, nao por TFG' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro, proteina grande' },
    monitorizacao: ['Hemoglobina semanal ate estabilizacao, depois mensal', 'Pressao arterial', 'Ferritina e saturacao de transferrina', 'Sintomas de trombose'],
    doencasRelacionadas: ['anemia', 'cancer', 'quimioterapia', 'doenca-renal-cronica'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['ESA', 'eritropoetina', 'anemia', 'oncologia', 'DRC', 'black-box']
  },

  // ============================================================================
  // AGENTES TROMBOPOIETICOS
  // ============================================================================
  {
    id: 'romiplostim',
    nomeGenerico: 'Romiplostim',
    nomesComerciais: ['Nplate'],
    atcCode: 'B02BX04',
    rxNormCui: '727595',
    drugBankId: 'DB05332',
    snomedCT: '442425003',
    classeTerapeutica: 'outros',
    subclasse: 'estimulante_eritropoiese',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '125mcg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '250mcg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '500mcg', disponivelSUS: false }
    ],
    indicacoes: [
      'Purpura trombocitopenica imune (PTI) cronica em adultos com resposta insuficiente a corticoides, imunoglobulinas ou esplenectomia',
      'PTI pediatrica cronica (>=1 ano)',
      'Trombocitopenia em sindromes mielodisplasicas de baixo risco'
    ],
    mecanismoAcao: 'Proteina de fusao Fc-peptideo (peptibody) que age como AGONISTA DO RECEPTOR DE TROMBOPOETINA (TPO-R ou c-Mpl). O dominio peptidico mimetiza a TPO endogena, estimulando a proliferacao e diferenciacao de megacariocitos. Nao compartilha sequencia com TPO endogena, minimizando risco de anticorpos neutralizantes cruzados.',
    posologias: [
      {
        indicacao: 'PTI cronica adultos',
        adultos: { dose: 'Inicial: 1mcg/kg SC semanal; titular por plaquetas', frequencia: 'Semanal', doseMaxima: '10mcg/kg/semana', observacoes: 'Ajustar dose para manter plaquetas 50.000-200.000. Incrementos de 1mcg/kg' },
        pediatrico: { dose: 'Inicial: 1mcg/kg SC semanal', frequencia: 'Semanal', doseMaxima: '10mcg/kg/semana', idadeMinima: '1 ano' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao romiplostim ou componentes'
    ],
    precaucoes: [
      'Rebote de trombocitopenia apos descontinuacao',
      'Aumento de reticulina na medula (monitorar)',
      'Risco tromboembolico com plaquetas muito altas',
      'Progressao de SMD para LMA (monitorar)',
      'Cataratas (em estudos pre-clinicos)',
      'Perda de resposta pode indicar anticorpos neutralizantes'
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia (26%)', 'Artralgia', 'Tontura', 'Insonia', 'Mialgia', 'Dor abdominal'],
      graves: ['Fibrose medular reticulinica', 'Eventos tromboembólicos', 'Progressao SMD', 'Rebote trombocitopenico grave']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'leve', efeito: 'Pode necessitar ajuste se plaquetas mudarem', conduta: 'Monitorar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes, evitar' },
    monitorizacao: ['Hemograma com plaquetas semanal ate estabilizacao, depois mensal', 'Esfregaco periferico (celulas anormais)', 'Biopsia de medula se citopenias inexplicadas'],
    doencasRelacionadas: ['trombocitopenia', 'pti', 'sindrome-mielodisplasica'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['TPO-agonista', 'trombopoetina', 'PTI', 'trombocitopenia', 'oncologia-suporte']
  },
  {
    id: 'eltrombopag',
    nomeGenerico: 'Eltrombopag',
    nomesComerciais: ['Revolade', 'Promacta'],
    atcCode: 'B02BX05',
    rxNormCui: '825670',
    drugBankId: 'DB06210',
    snomedCT: '442031003',
    classeTerapeutica: 'outros',
    subclasse: 'estimulante_eritropoiese',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '12,5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: false },
      { forma: 'po_oral', concentracao: '12,5mg', disponivelSUS: false },
      { forma: 'po_oral', concentracao: '25mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Purpura trombocitopenica imune (PTI) cronica',
      'Trombocitopenia por hepatite C cronica (para iniciar interferon)',
      'Anemia aplastica grave (primeira linha com imunossupressao ou refratarios)'
    ],
    mecanismoAcao: 'Agonista de MOLECULA PEQUENA (nao peptidico) do receptor de TPO (c-Mpl). Liga-se ao DOMINIO TRANSMEMBRANA do receptor (diferente da TPO e romiplostim que ligam ao dominio extracelular), ativando vias JAK-STAT e AKT. Via ORAL. Quelante de cations - interacao com alimentos e antiácidos.',
    posologias: [
      {
        indicacao: 'PTI cronica',
        adultos: { dose: 'Inicial 50mg 1x/dia (25mg em asiaticos)', frequencia: '1x/dia em jejum (2h antes ou 4h depois de alimentos)', doseMaxima: '75mg/dia', observacoes: 'Ajustar para manter plaquetas 50.000-150.000. Tomar 4h afastado de laticinios, antiacidos e polivitaminicos' }
      },
      {
        indicacao: 'Hepatite C cronica',
        adultos: { dose: 'Inicial 25mg 1x/dia', frequencia: '1x/dia', doseMaxima: '100mg/dia', observacoes: 'Para permitir inicio/manutencao de interferon' }
      },
      {
        indicacao: 'Anemia aplastica grave',
        adultos: { dose: 'Inicial 150mg 1x/dia', frequencia: '1x/dia', doseMaxima: '150mg/dia', observacoes: 'Associar com imunossupressao (ATG + ciclosporina)' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao eltrombopag'
    ],
    precaucoes: [
      'HEPATOTOXICIDADE - monitorar transaminases',
      'Tomar em JEJUM (2h antes ou 4h apos alimentos)',
      'Nao tomar com laticinios, antiacidos ou suplementos de cations',
      'Rebote de trombocitopenia apos descontinuacao',
      'Fibrose reticulinica medular',
      'Cataratas (monitorar)',
      'Risco tromboembolico'
    ],
    efeitosAdversos: {
      comuns: ['Nausea (8%)', 'Diarreia', 'Cefaleia', 'Elevacao transaminases', 'Infeccoes respiratorias'],
      graves: ['Hepatotoxicidade', 'Fibrose medular', 'Eventos tromboembólicos', 'Cataratas', 'Rebote trombocitopenico']
    },
    interacoes: [
      { medicamento: 'Antiácidos (Al, Mg, Ca)', gravidade: 'grave', efeito: 'Reduz absorcao drasticamente por quelacao', conduta: 'Separar em 4 horas' },
      { medicamento: 'Laticinios', gravidade: 'grave', efeito: 'Reduz absorcao (calcio)', conduta: 'Separar em 2-4 horas' },
      { medicamento: 'Suplementos de ferro, zinco, magnesio', gravidade: 'moderada', efeito: 'Quelacao reduz absorcao', conduta: 'Separar em 4 horas' },
      { medicamento: 'Rosuvastatina', gravidade: 'moderada', efeito: 'Eltrombopag inibe OATP1B1, aumenta estatina', conduta: 'Reduzir dose rosuvastatina' },
      { medicamento: 'Substratos BCRP (metotrexato)', gravidade: 'moderada', efeito: 'Inibicao BCRP pode aumentar niveis', conduta: 'Monitorar toxicidade' }
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Iniciar com doses menores, monitorar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Iniciar com 25mg em hepatopatia leve; evitar em hepatopatia moderada/grave, exceto em indicacao de HCV'
    },
    monitorizacao: ['Transaminases (ALT/AST/bilirrubinas) basal e a cada 2 semanas por 3 meses, depois mensal', 'Hemograma com plaquetas', 'Exame oftalmologico basal e periodico (cataratas)', 'Esfregaco periferico'],
    doencasRelacionadas: ['trombocitopenia', 'pti', 'hepatite-c', 'anemia-aplastica'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['TPO-agonista', 'oral', 'PTI', 'anemia-aplastica', 'hepatite-c', 'quelante']
  },

  // ============================================================================
  // TRATAMENTO SINDROME DE LISE TUMORAL
  // ============================================================================
  {
    id: 'rasburicase',
    nomeGenerico: 'Rasburicase',
    nomesComerciais: ['Fasturtec', 'Elitek'],
    atcCode: 'V03AF07',
    rxNormCui: '284463',
    drugBankId: 'DB00049',
    snomedCT: '416633006',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '1,5mg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '7,5mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Tratamento e prevencao de hiperuricemia em sindrome de lise tumoral',
      'Hiperuricemia aguda em leucemias, linfomas e tumores solidos com alta carga tumoral'
    ],
    mecanismoAcao: 'URATO OXIDASE RECOMBINANTE (uricase) produzida em S. cerevisiae. Converte acido urico em ALANTOINA, que e 5-10x mais soluvel que o urato e facilmente excretada pelos rins. Humanos nao possuem uricase funcional (gene silenciado). Acao RAPIDA: reduz acido urico em 4h. Nao requer ajuste de pH urinario.',
    posologias: [
      {
        indicacao: 'Sindrome lise tumoral - prevencao/tratamento',
        adultos: { dose: '0,2mg/kg IV', frequencia: 'Dose unica ou 1x/dia por ate 5-7 dias', observacoes: 'Infundir em 30 minutos. Muitos centros usam dose fixa de 3-6mg' },
        pediatrico: { dose: '0,2mg/kg IV', frequencia: '1x/dia por ate 5-7 dias', idadeMinima: '1 mes', observacoes: 'Eficacia estabelecida em pediatria' }
      },
      {
        indicacao: 'Dose unica (protocolo alternativo)',
        adultos: { dose: '3-6mg IV dose fixa', frequencia: 'Dose unica; repetir se acido urico persistir elevado', observacoes: 'Estrategia de dose fixa com monitorizacao' }
      }
    ],
    contraindicacoes: [
      'Deficiencia de G6PD (HEMOLISE GRAVE)',
      'Deficiencia de metemoglobina redutase',
      'Historia de reacao alergica/anafilaxia a rasburicase',
      'Gravidez e lactacao'
    ],
    precaucoes: [
      'RASTREAR DEFICIENCIA DE G6PD antes do uso (especialmente populacoes de risco)',
      'Amostra de acido urico: coletar em gelo e processar rapidamente (enzima continua agindo in vitro)',
      'Metemoglobinemia (monitorar saturacao)',
      'Hemolise (monitorar hemoglobina e LDH)',
      'Reacoes de hipersensibilidade (anticorpos se desenvolvem com exposicoes repetidas)'
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Febre', 'Cefaleia', 'Dor abdominal', 'Vomitos'],
      graves: ['Hemolise (em G6PD)', 'Metemoglobinemia', 'Anafilaxia', 'Broncoespasmo', 'Anticorpos neutralizantes']
    },
    interacoes: [
      { medicamento: 'Alopurinol', gravidade: 'leve', efeito: 'Nao necessario associar, mecanismos diferentes', conduta: 'Geralmente descontinuar alopurinol se rasburicase disponivel' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['Acido urico (coletar em gelo!)', 'Hemoglobina e haptoglobina', 'Metemoglobina/saturacao O2', 'Funcao renal', 'Eletrolitos (K, P, Ca)'],
    doencasRelacionadas: ['sindrome-lise-tumoral', 'leucemia', 'linfoma', 'hiperuricemia'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['urato-oxidase', 'sindrome-lise-tumoral', 'hiperuricemia', 'oncologia', 'G6PD']
  },

  // ============================================================================
  // UROPROTECAO
  // ============================================================================
  {
    id: 'mesna-uroprotecao',
    nomeGenerico: 'Mesna',
    nomesComerciais: ['Uromitexan', 'Mesnex'],
    atcCode: 'V03AF01',
    rxNormCui: '6756',
    drugBankId: 'DB00928',
    snomedCT: '387135007',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '100mg/ml (400mg/4ml)', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '100mg/ml (1000mg/10ml)', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '600mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Prevencao cistite hemorragica por ifosfamida',
      'Prevencao cistite hemorragica por ciclofosfamida em doses altas (TMO)',
      'Cistite hemorragica estabelecida (lavagem vesical)'
    ],
    mecanismoAcao: 'TIOL (2-mercaptoetano sulfonato de sodio) que se liga a ACROLEINA, metabolito uroxico da ifosfamida e ciclofosfamida. Mesna e excretado rapidamente pelos rins, atingindo alta concentracao no trato urinario onde neutraliza a acroleina antes que esta cause dano urothelial. Nao interfere na eficacia antitumoral.',
    posologias: [
      {
        indicacao: 'Ifosfamida - regime padrao',
        adultos: { dose: 'Mesna = 60-100% da dose de ifosfamida, dividida em 3 doses', frequencia: 'Administrar em 0h, 4h e 8h apos cada dose de ifosfamida', observacoes: 'Ex: Ifosfamida 2g -> Mesna 400mg IV a 0h, 400mg a 4h, 400mg a 8h' }
      },
      {
        indicacao: 'Ifosfamida - infusao continua',
        adultos: { dose: 'Mesna = 60-100% da dose diária de ifosfamida', frequencia: 'Em infusao continua paralela + 4-8h apos termino', observacoes: 'Manter mesna enquanto houver acroleina' }
      },
      {
        indicacao: 'Ciclofosfamida alta dose (TMO)',
        adultos: { dose: 'Mesna 60-80% da dose de ciclofosfamida', frequencia: 'Dividido em doses a 0h, 3h, 6h, 9h apos cada dose de ciclofosfamida', observacoes: 'Ou infusao continua' }
      },
      {
        indicacao: 'Via oral apos dose IV inicial',
        adultos: { dose: 'Mesna VO = 40% da dose de ifosfamida', frequencia: '2h e 6h apos ifosfamida (apos dose IV a 0h)', observacoes: 'Biodisponibilidade oral ~50%' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a compostos tiol'
    ],
    precaucoes: [
      'Nao protege contra outras toxicidades (mielossupressao, nefrotoxicidade)',
      'Hidratacao adequada concomitante e mandatoria',
      'Pode causar falso-positivo para cetonas urinárias',
      'Disgeusia (gosto desagradavel)',
      'Reacoes de hipersensibilidade podem ocorrer'
    ],
    efeitosAdversos: {
      comuns: ['Disgeusia (gosto ruim)', 'Nausea/vomitos (especialmente VO)', 'Cefaleia', 'Fadiga'],
      graves: ['Reacoes anafilácticas', 'Hipotensao (infusao rapida)', 'Reacoes cutaneas']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'leve', efeito: 'Potencial alteracao INR (raro)', conduta: 'Monitorar se suspeita' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro, excrecao minima esperada' },
    monitorizacao: ['Urina (hematuria)', 'Hidratacao adequada', 'Exame de urina'],
    doencasRelacionadas: ['cancer', 'quimioterapia', 'cistite-hemorragica'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['uroprotecao', 'ifosfamida', 'ciclofosfamida', 'cistite-hemorragica', 'rename', 'oncologia']
  },

  // ============================================================================
  // RESGATE QUIMIOTERAPICO
  // ============================================================================
  {
    id: 'leucovorin-resgate',
    nomeGenerico: 'Leucovorina (Acido Folinico)',
    nomesComerciais: ['Leucovorin', 'Rescuvolin', 'Wellcovorin'],
    atcCode: 'V03AF03',
    rxNormCui: '6357',
    drugBankId: 'DB00650',
    snomedCT: '387478008',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '50mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '100mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '350mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: false }
    ],
    indicacoes: [
      'RESGATE de metotrexato alta dose (MTX-HD)',
      'Potencializacao de 5-fluorouracil (FOLFOX, FOLFIRI)',
      'Intoxicacao por metotrexato',
      'Anemia megaloblastica refrataria a folato',
      'Deficiencia de folato quando acido folico contraindicado'
    ],
    mecanismoAcao: 'Forma REDUZIDA e ATIVA do acido folico (5-formil-tetrahidrofolato). NAO REQUER reducao pela DHFR, contornando o bloqueio pelo metotrexato. Fornece folato diretamente para vias de sintese de timidilato e purinas, "resgatando" celulas normais dos efeitos toxicos do MTX. Na potencializacao do 5-FU, estabiliza o complexo FdUMP-timidilato sintase.',
    posologias: [
      {
        indicacao: 'Resgate MTX alta dose',
        adultos: { dose: '15mg/m2 (10-25mg/m2) IV ou VO', frequencia: 'A cada 6h por 10 doses, iniciando 24h apos MTX', observacoes: 'AJUSTAR por nivel de MTX: se MTX >1umol/L em 42h ou >0,2umol/L em 72h, aumentar dose e prolongar resgate' }
      },
      {
        indicacao: 'Intoxicacao MTX',
        adultos: { dose: 'Leucovorina = dose de MTX ou 100-1000mg/m2', frequencia: 'A cada 3-6h ate MTX <0,05umol/L', observacoes: 'Doses altas podem ser necessarias. Associar hidratacao e alcalinizacao' }
      },
      {
        indicacao: 'Potencializacao 5-FU (FOLFOX/FOLFIRI)',
        adultos: { dose: '200-400mg/m2 IV', frequencia: 'Antes de cada infusao de 5-FU', observacoes: 'Infundir em 2h; aumenta toxicidade GI - monitorar mucosite' }
      }
    ],
    contraindicacoes: [
      'Anemia perniciosa nao diagnosticada (pode mascarar deficiencia de B12)'
    ],
    precaucoes: [
      'NIVELAR leucovorina conforme niveis de metotrexato sericos',
      'Em resgate MTX: hidratar + alcalinizar urina (pH >7)',
      'Nao usar folato regular (acido folico) para resgate - requer DHFR',
      'Potencializa toxicidade GI do 5-FU (mucosite, diarreia)',
      'Alta dose IV: infundir em velocidade <=160mg/min (risco calcio)'
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Vomitos', 'Estomatite (com 5-FU)'],
      graves: ['Reacoes alergicas (raro)', 'Convulsoes (altas doses IV rapidas)']
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'leve', efeito: 'Antagonismo - objetivo do resgate', conduta: 'Uso terapeutico' },
      { medicamento: '5-fluorouracil', gravidade: 'moderada', efeito: 'Sinergismo - aumenta eficacia E toxicidade', conduta: 'Uso terapeutico com monitoramento GI' },
      { medicamento: 'Fenitoina', gravidade: 'moderada', efeito: 'Pode reduzir niveis de fenitoina', conduta: 'Monitorar niveis anticonvulsivante' },
      { medicamento: 'Sulfametoxazol-trimetoprim', gravidade: 'leve', efeito: 'Pode antagonizar efeito do SMX-TMP', conduta: 'Evitar uso concomitante para tratamento de PCP' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Seguro, vitamina' },
    monitorizacao: ['Nivel serico de MTX (no resgate)', 'pH urinario (manter >7)', 'Funcao renal', 'Hemograma', 'Mucosite (com 5-FU)'],
    doencasRelacionadas: ['cancer', 'quimioterapia', 'intoxicacao-metotrexato'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['folato', 'resgate-MTX', 'potencializacao-5FU', 'oncologia', 'rename', 'FOLFOX', 'FOLFIRI']
  },

  // ============================================================================
  // CARDIOPROTETOR
  // ============================================================================
  {
    id: 'dexrazoxane',
    nomeGenerico: 'Dexrazoxano',
    nomesComerciais: ['Cardioxane', 'Totect', 'Zinecard'],
    atcCode: 'V03AF02',
    rxNormCui: '3145',
    drugBankId: 'DB00380',
    snomedCT: '387084005',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '250mg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '500mg', disponivelSUS: false }
    ],
    indicacoes: [
      'CARDIOPROTEÇÃO contra toxicidade de antraciclinas (doxorrubicina, epirrubicina)',
      'Extravasamento de antraciclinas (indicacao distinta)'
    ],
    mecanismoAcao: 'Pro-droga QUELANTE DE FERRO intracelular. Hidrolisado a um analogo do EDTA que sequestra ferro livre, prevenindo formacao de radicais livres mediados por ferro-antraciclina que causam cardiotoxicidade. Nao afeta eficacia antitumoral das antraciclinas. Indicado quando dose cumulativa de doxorrubicina atinge 300mg/m2.',
    posologias: [
      {
        indicacao: 'Cardioproteção (doxorrubicina)',
        adultos: { dose: 'Razao 10:1 com doxorrubicina (ex: 500mg dexrazoxano para 50mg doxo)', frequencia: 'IV 15-30min ANTES de cada dose de antraciclina', observacoes: 'Iniciar quando dose cumulativa de doxo atingir 300mg/m2. Razao 20:1 se razao com epirrubicina' }
      },
      {
        indicacao: 'Extravasamento de antraciclina',
        adultos: { dose: 'D1 e D2: 1000mg/m2; D3: 500mg/m2', frequencia: '1x/dia por 3 dias consecutivos, iniciando ate 6h apos extravasamento', doseMaxima: '2000mg por dose', observacoes: 'INICIAR ATE 6H do extravasamento. Nao aplicar gelo na area' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao dexrazoxano',
      'Uso com regimes de quimioterapia nao baseados em antraciclinas',
      'Inicio da cardioproteção em pacientes que nunca receberam antraciclinas'
    ],
    precaucoes: [
      'MIELOSSUPRESSAO ADITIVA - pode aumentar neutropenia',
      'Nao iniciar cardioproteção desde a primeira dose (controverso em algumas diretrizes)',
      'Nao usar em quimioterapias adjuvantes/curativas de mama (pode reduzir eficacia? - dados conflitantes)',
      'Reservar para pacientes que se beneficiarao de mais antraciclina apos 300mg/m2',
      'Hepatotoxicidade transitoria'
    ],
    efeitosAdversos: {
      comuns: ['Nausea/vomitos', 'Fadiga', 'Febre', 'Alopecia', 'Diarreia'],
      graves: ['Mielossupressao aditiva', 'Segundas neoplasias mieloides (dados controversos)', 'Infeccoes', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Antraciclinas', gravidade: 'leve', efeito: 'Interacao intencional - cardioproteção', conduta: 'Uso terapeutico' },
      { medicamento: 'Agentes mielossupressores', gravidade: 'moderada', efeito: 'Mielossupressao aditiva', conduta: 'Monitorar hemograma' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar - potencial toxicidade' },
    monitorizacao: ['Hemograma (mielossupressao)', 'Funcao hepatica', 'Funcao cardiaca (ecocardiograma periodico)'],
    doencasRelacionadas: ['cancer', 'cardiotoxicidade', 'antraciclinas', 'extravasamento'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['cardioprotetor', 'quelante-ferro', 'antraciclinas', 'extravasamento', 'oncologia']
  },

  // ============================================================================
  // CITOPROTETOR
  // ============================================================================
  {
    id: 'amifostine',
    nomeGenerico: 'Amifostina',
    nomesComerciais: ['Ethyol'],
    atcCode: 'V03AF05',
    rxNormCui: '672',
    drugBankId: 'DB00156',
    snomedCT: '391793003',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '500mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Reducao da toxicidade renal da cisplatina em cancer de ovario ou CPNPC',
      'Reducao de xerostomia por radioterapia em cancer de cabeca e pescoco',
      'Citoproteção contra mielossupressao (off-label, evidencias limitadas)'
    ],
    mecanismoAcao: 'PRO-DROGA tiol fosforilada, desfosforilada pela fosfatase alcalina no tecido normal (maior atividade em tecido normal vs tumoral devido a vascularizacao). O metabolito ativo (WR-1065) atua como SCAVENGER DE RADICAIS LIVRES e quelante de metabolitos citotoxicos de cisplatina e radioterapia. Seletividade relativa para tecidos normais devido a maior pH e fosfatase alcalina.',
    posologias: [
      {
        indicacao: 'Citoproteção renal (cisplatina)',
        adultos: { dose: '910mg/m2 IV', frequencia: '15min ANTES de cada dose de cisplatina', observacoes: 'Infundir em 15 minutos. Pre-medicar com antiemeticos. Monitorar PA (hipotensao comum)' }
      },
      {
        indicacao: 'Xerostomia (radioterapia de cabeca/pescoco)',
        adultos: { dose: '200mg/m2/dia IV', frequencia: '15-30min antes de cada sessao de RT', observacoes: 'Evidencia de reducao de xerostomia cronica' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a amifostina',
      'Hipotensao (PA sistolica <90mmHg) ou desidratacao',
      'Quimioterapia com intencao curativa onde protecao tumoral e preocupacao'
    ],
    precaucoes: [
      'HIPOTENSAO frequente - interromper se PAS <90 (retomar apos hidratacao)',
      'Nausea/vomito intensos - pre-medicar com antiemeticos',
      'Reacoes cutaneas (eritema, rash)',
      'Calcio serico pode reduzir - monitorar',
      'Controversia sobre protecao tumoral (estudos sugerem que nao protege tumor)'
    ],
    efeitosAdversos: {
      comuns: ['Hipotensao (62%)', 'Nausea/vomitos (52-96%)', 'Flush/calor', 'Tontura', 'Sonolencia'],
      graves: ['Hipotensao grave', 'Reacoes anafilacticas', 'Sindrome de Stevens-Johnson (raro)', 'Hipocalcemia']
    },
    interacoes: [
      { medicamento: 'Anti-hipertensivos', gravidade: 'moderada', efeito: 'Hipotensao aditiva', conduta: 'Suspender anti-HAS 24h antes se possivel' }
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Dados limitados; usar com cautela' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['Pressao arterial a cada 5min durante infusao', 'Calcio serico', 'Sintomas de nausea'],
    doencasRelacionadas: ['cancer', 'nefrotoxicidade-cisplatina', 'xerostomia', 'radioterapia'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['citoprotetor', 'radioprotetor', 'cisplatina', 'xerostomia', 'oncologia']
  }
];
