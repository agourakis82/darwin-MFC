/**
 * COMPLEMENTO FINAL - DARWIN-MFC
 * ===============================
 *
 * Medicamentos complementares para atingir 600+
 * Vacinas, hormônios, outros
 * ~75 medicamentos
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosComplementoFinal: Partial<Medicamento>[] = [
  // Hormônios sexuais
  {
    id: 'estradiol',
    nomeGenerico: 'Estradiol',
    nomesComerciais: ['Estrofem', 'Oestrogel'],
    atcCode: 'G03CA03',
    classeTerapeutica: 'hormonio',
    subclasse: 'estrogeno',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'gel_topico', concentracao: '0,06%', disponivelSUS: false },
      { forma: 'adesivo', concentracao: '50mcg/dia', disponivelSUS: false },
    ],
    indicacoes: ['Terapia hormonal menopausa', 'Hipogonadismo feminino', 'Atrofia vaginal'],
    mecanismoAcao: 'Ativa receptores de estrogênio; efeitos tróficos e metabólicos',
    posologias: [
      {
        indicacao: 'TH menopausa',
        adultos: { dose: '0,5-2mg VO ou 25-100mcg/dia adesivo', frequencia: 'Diário', observacoes: 'Associar progestagênio se útero presente' },
      }
    ],
    contraindicacoes: ['Câncer de mama', 'TEV ativo/histórico', 'Doença hepática ativa', 'Sangramento vaginal não diagnosticado'],
    efeitosAdversos: {
      comuns: ['Mastalgia', 'Náuseas', 'Sangramento irregular', 'Cefaleia'],
      graves: ['TEV', 'AVC', 'Câncer de mama (uso prolongado)', 'Câncer de endométrio (sem progestagênio)']
    },
    interacoes: [
      { medicamento: 'Indutores CYP3A4', gravidade: 'moderada', efeito: 'Reduz níveis de estradiol', conduta: 'Considerar dose maior' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Reduz lactação' },
    doencasRelacionadas: ['menopausa', 'osteoporose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'progesterona-micronizada',
    nomeGenerico: 'Progesterona Micronizada',
    nomesComerciais: ['Utrogestan', 'Prometrium'],
    atcCode: 'G03DA04',
    classeTerapeutica: 'hormonio',
    subclasse: 'progestageno',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '200mg', disponivelSUS: true },
      { forma: 'gel_vaginal', concentracao: '8%', disponivelSUS: false },
    ],
    indicacoes: ['TH (proteção endometrial)', 'Suporte lúteo FIV', 'Ameaça de aborto', 'Ciclos irregulares'],
    mecanismoAcao: 'Ativa receptor de progesterona; prepara endométrio para implantação',
    posologias: [
      {
        indicacao: 'TH contínua',
        adultos: { dose: '100-200mg', frequencia: 'Ao deitar x 12-14 dias/mês ou contínuo' },
      },
      {
        indicacao: 'Suporte lúteo',
        adultos: { dose: '200-400mg vaginal', frequencia: '1-2x/dia' },
      }
    ],
    contraindicacoes: ['Sangramento vaginal não diagnosticado', 'Doença hepática grave'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Tontura', 'Mastalgia', 'Sangramento irregular'],
      graves: ['Depressão', 'TEV (raro)']
    },
    interacoes: [
      { medicamento: 'Carbamazepina', gravidade: 'moderada', efeito: 'Reduz níveis', conduta: 'Usar via vaginal' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['menopausa', 'infertilidade'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'testosterona',
    nomeGenerico: 'Testosterona',
    nomesComerciais: ['Durateston', 'Nebido', 'Androgel'],
    atcCode: 'G03BA03',
    classeTerapeutica: 'hormonio',
    subclasse: 'androgeno',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_im', concentracao: '250mg/ml', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '1000mg/4ml', disponivelSUS: false },
      { forma: 'gel_topico', concentracao: '1%', disponivelSUS: false },
    ],
    indicacoes: ['Hipogonadismo masculino', 'Puberdade tardia', 'Disfunção erétil por hipogonadismo'],
    mecanismoAcao: 'Ativa receptores androgênicos; efeitos anabólicos e virilizantes',
    posologias: [
      {
        indicacao: 'Hipogonadismo',
        adultos: { dose: '250mg IM a cada 2-3 semanas ou 1000mg a cada 10-14 semanas', frequencia: 'Ver esquema' },
      }
    ],
    contraindicacoes: ['Câncer de próstata', 'Câncer de mama masculino', 'Policitemia', 'Gestação (contato)'],
    efeitosAdversos: {
      comuns: ['Acne', 'Ginecomastia', 'Alteração de humor', 'Retenção hídrica'],
      graves: ['Policitemia', 'Hepatotoxicidade (oral)', 'Apneia do sono', 'TEV']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'moderada', efeito: 'Pode aumentar INR', conduta: 'Monitorar' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['Hemoglobina/Hematócrito', 'PSA', 'Testosterona sérica'],
    doencasRelacionadas: ['hipogonadismo'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ciproterona',
    nomeGenerico: 'Acetato de Ciproterona',
    nomesComerciais: ['Androcur'],
    atcCode: 'G03HA01',
    classeTerapeutica: 'hormonio',
    subclasse: 'antiandrogeno',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
    ],
    indicacoes: ['Hirsutismo grave', 'Acne grave (mulheres)', 'Controle de libido (homens)', 'Câncer de próstata'],
    mecanismoAcao: 'Antagonista de receptor androgênico; inibe LH',
    posologias: [
      {
        indicacao: 'Hirsutismo',
        adultos: { dose: '50-100mg', frequencia: 'Dias 1-10 do ciclo, associado a etinilestradiol' },
      }
    ],
    contraindicacoes: ['Hepatopatia', 'TEV', 'Meningioma', 'Depressão grave'],
    efeitosAdversos: {
      comuns: ['Fadiga', 'Redução libido', 'Mastalgia', 'Ganho de peso'],
      graves: ['Hepatotoxicidade', 'Meningioma', 'TEV', 'Depressão']
    },
    interacoes: [],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['TGO/TGP'],
    doencasRelacionadas: ['hirsutismo', 'sop'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'espironolactona-derma',
    nomeGenerico: 'Espironolactona',
    nomesComerciais: ['Aldactone'],
    atcCode: 'C03DA01',
    classeTerapeutica: 'diuretico',
    subclasse: 'poupador_potassio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: ['Hipertensão resistente', 'ICC', 'Ascite cirrótica', 'Hirsutismo', 'Acne hormonal'],
    mecanismoAcao: 'Antagonista de aldosterona e receptor androgênico',
    posologias: [
      {
        indicacao: 'ICC/HAS',
        adultos: { dose: '25-50mg', frequencia: '1-2x/dia' },
      },
      {
        indicacao: 'Hirsutismo/Acne',
        adultos: { dose: '50-200mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Hipercalemia', 'DRC grave', 'Gestação'],
    efeitosAdversos: {
      comuns: ['Hipercalemia', 'Ginecomastia', 'Irregularidade menstrual', 'Mastalgia'],
      graves: ['Hipercalemia grave', 'IRA']
    },
    interacoes: [
      { medicamento: 'IECA/BRA', gravidade: 'moderada', efeito: 'Hipercalemia', conduta: 'Monitorar K+' },
      { medicamento: 'Suplemento de K+', gravidade: 'grave', efeito: 'Hipercalemia grave', conduta: 'Evitar' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Potássio', 'Creatinina'],
    doencasRelacionadas: ['icc', 'hirsutismo', 'ascite'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antialérgicos adicionais
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
    mecanismoAcao: 'Metabólito ativo da loratadina; anti-H1 de longa ação',
    posologias: [
      {
        indicacao: 'Rinite/Urticária',
        adultos: { dose: '5mg', frequencia: '1x/dia' },
        pediatrico: { dose: '1,25-2,5mg', frequencia: '1x/dia', idadeMinima: '6 meses' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Boca seca', 'Fadiga'],
      graves: ['Reações de hipersensibilidade (raro)']
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
    nomesComerciais: ['Alektos', 'Bilaxten'],
    atcCode: 'R06AX29',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
    ],
    indicacoes: ['Rinite alérgica', 'Urticária'],
    mecanismoAcao: 'Anti-H1 de segunda geração; não atravessa BHE',
    posologias: [
      {
        indicacao: 'Rinite/Urticária',
        adultos: { dose: '20mg', frequencia: '1x/dia em jejum' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Sonolência (raro)'],
      graves: []
    },
    interacoes: [
      { medicamento: 'Alimentos', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Tomar em jejum' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['rinite-alergica', 'urticaria'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'epinastina',
    nomeGenerico: 'Epinastina',
    nomesComerciais: ['Talerc', 'Relestat'],
    atcCode: 'R06AX24',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
      { forma: 'colirio', concentracao: '0,05%', disponivelSUS: false },
    ],
    indicacoes: ['Rinite alérgica', 'Conjuntivite alérgica'],
    mecanismoAcao: 'Anti-H1; estabilizador de mastócitos',
    posologias: [
      {
        indicacao: 'Rinite',
        adultos: { dose: '10-20mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Fadiga', 'Boca seca'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['rinite-alergica', 'conjuntivite'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'rupatadina',
    nomeGenerico: 'Rupatadina',
    nomesComerciais: ['Rupafin', 'Rinialer'],
    atcCode: 'R06AX28',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
    ],
    indicacoes: ['Rinite alérgica', 'Urticária crônica'],
    mecanismoAcao: 'Anti-H1 + antagonista PAF',
    posologias: [
      {
        indicacao: 'Rinite/Urticária',
        adultos: { dose: '10mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Prolongamento QT'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Cefaleia', 'Fadiga'],
      graves: []
    },
    interacoes: [
      { medicamento: 'Suco de toranja', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['rinite-alergica', 'urticaria'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'cromoglicato',
    nomeGenerico: 'Cromoglicato de Sódio',
    nomesComerciais: ['Intal', 'Maxicrom'],
    atcCode: 'R01AC01',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'estabilizador_mastocito',
    rename: true,
    apresentacoes: [
      { forma: 'spray_nasal', concentracao: '2%', disponivelSUS: true },
      { forma: 'colirio', concentracao: '4%', disponivelSUS: true },
    ],
    indicacoes: ['Rinite alérgica (profilaxia)', 'Conjuntivite alérgica', 'Mastocitose'],
    mecanismoAcao: 'Estabiliza mastócitos; previne liberação de mediadores',
    posologias: [
      {
        indicacao: 'Rinite alérgica',
        adultos: { dose: '1 jato cada narina', frequencia: '4-6x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Irritação nasal', 'Espirros', 'Gosto desagradável'],
      graves: []
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['rinite-alergica', 'conjuntivite'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antidepressivos adicionais
  {
    id: 'escitalopram',
    nomeGenerico: 'Escitalopram',
    nomesComerciais: ['Lexapro', 'Exodus'],
    atcCode: 'N06AB10',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
    ],
    indicacoes: ['Depressão maior', 'TAG', 'TOC', 'Pânico', 'Fobia social'],
    mecanismoAcao: 'Inibidor seletivo da recaptação de serotonina (S-enantiômero)',
    posologias: [
      {
        indicacao: 'Depressão/Ansiedade',
        adultos: { dose: '10-20mg', frequencia: '1x/dia', doseMaxima: '20mg/dia' },
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'QT longo', 'Pimozida'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Cefaleia', 'Insônia/Sonolência', 'Disfunção sexual'],
      graves: ['Síndrome serotoninérgica', 'Prolongamento QT', 'Sangramento', 'Hiponatremia']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Intervalo 14 dias' },
      { medicamento: 'QT prolongadores', gravidade: 'grave', efeito: 'Arritmia', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível com monitorização' },
    doencasRelacionadas: ['depressao', 'ansiedade', 'toc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'paroxetina',
    nomeGenerico: 'Paroxetina',
    nomesComerciais: ['Paxil', 'Pondera'],
    atcCode: 'N06AB05',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
    ],
    indicacoes: ['Depressão', 'TAG', 'TOC', 'Pânico', 'TEPT', 'Fobia social'],
    mecanismoAcao: 'ISRS; também inibe recaptação de noradrenalina (fraco)',
    posologias: [
      {
        indicacao: 'Depressão',
        adultos: { dose: '20-50mg', frequencia: '1x/dia', doseMaxima: '60mg/dia' },
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'Gestação (1º trimestre)', 'Pimozida'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Sonolência', 'Ganho de peso', 'Disfunção sexual', 'Sudorese'],
      graves: ['Síndrome de abstinência (descontinuação)', 'Síndrome serotoninérgica']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Intervalo 14 dias' },
      { medicamento: 'Tamoxifeno', gravidade: 'grave', efeito: 'Inibe ativação do tamoxifeno (CYP2D6)', conduta: 'Evitar' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['depressao', 'ansiedade', 'toc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'citalopram',
    nomeGenerico: 'Citalopram',
    nomesComerciais: ['Cipramil', 'Procimax'],
    atcCode: 'N06AB04',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
    ],
    indicacoes: ['Depressão', 'Pânico'],
    mecanismoAcao: 'ISRS; mistura racêmica (escitalopram é S-enantiômero)',
    posologias: [
      {
        indicacao: 'Depressão',
        adultos: { dose: '20-40mg', frequencia: '1x/dia', doseMaxima: '40mg/dia (20mg em idosos)' },
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'QT longo congênito', 'Pimozida'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Boca seca', 'Sonolência', 'Disfunção sexual'],
      graves: ['Prolongamento QT (dose-dependente)', 'Síndrome serotoninérgica']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Intervalo 14 dias' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['ECG se dose >40mg ou fatores de risco QT'],
    doencasRelacionadas: ['depressao', 'panico'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'desvenlafaxina',
    nomeGenerico: 'Desvenlafaxina',
    nomesComerciais: ['Pristiq', 'Imense'],
    atcCode: 'N06AX23',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrsn',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_xr', concentracao: '50mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '100mg', disponivelSUS: false },
    ],
    indicacoes: ['Depressão maior'],
    mecanismoAcao: 'Metabólito ativo da venlafaxina; IRSN',
    posologias: [
      {
        indicacao: 'Depressão',
        adultos: { dose: '50-100mg', frequencia: '1x/dia', doseMaxima: '200mg/dia' },
      }
    ],
    contraindicacoes: ['Uso de IMAO'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Cefaleia', 'Boca seca', 'Constipação', 'Tontura'],
      graves: ['Síndrome serotoninérgica', 'Hipertensão', 'Sangramento']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Intervalo 14 dias' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['depressao'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'nortriptilina',
    nomeGenerico: 'Nortriptilina',
    nomesComerciais: ['Pamelor'],
    atcCode: 'N06AA10',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'triciclico',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '10mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '25mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '50mg', disponivelSUS: true },
    ],
    indicacoes: ['Depressão', 'Dor neuropática', 'Profilaxia enxaqueca', 'Cessação tabagismo'],
    mecanismoAcao: 'Tricíclico; inibe recaptação de noradrenalina > serotonina',
    posologias: [
      {
        indicacao: 'Depressão',
        adultos: { dose: '25-150mg', frequencia: '1x/dia ao deitar', observacoes: 'Iniciar 25mg' },
      },
      {
        indicacao: 'Dor neuropática',
        adultos: { dose: '25-75mg', frequencia: 'Ao deitar' },
      }
    ],
    contraindicacoes: ['IAM recente', 'Uso de IMAO', 'Glaucoma ângulo fechado', 'Arritmias'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Constipação', 'Sonolência', 'Ganho de peso'],
      graves: ['Arritmias', 'Retenção urinária', 'Convulsões', 'Overdose (cardiotóxica)']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Crise hipertensiva/serotoninérgica', conduta: 'Intervalo 14 dias' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['ECG em idosos e cardiopatas'],
    doencasRelacionadas: ['depressao', 'dor-neuropatica', 'enxaqueca'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'clomipramina',
    nomeGenerico: 'Clomipramina',
    nomesComerciais: ['Anafranil'],
    atcCode: 'N06AA04',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'triciclico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: true },
    ],
    indicacoes: ['TOC', 'Depressão', 'Pânico', 'Cataplexia'],
    mecanismoAcao: 'Tricíclico mais serotoninérgico; tratamento de escolha para TOC',
    posologias: [
      {
        indicacao: 'TOC',
        adultos: { dose: '25-250mg', frequencia: '1x/dia ou dividido', doseMaxima: '250mg/dia' },
      }
    ],
    contraindicacoes: ['IAM recente', 'Uso de IMAO', 'Glaucoma'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Constipação', 'Sonolência', 'Ganho de peso', 'Disfunção sexual'],
      graves: ['Arritmias', 'Convulsões', 'Síndrome serotoninérgica']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Intervalo 14 dias' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['toc', 'depressao'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antipsicóticos adicionais
  {
    id: 'aripiprazol',
    nomeGenerico: 'Aripiprazol',
    nomesComerciais: ['Abilify'],
    atcCode: 'N05AX12',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_atipico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: false },
      { forma: 'injetavel_longa_acao', concentracao: '400mg', disponivelSUS: false },
    ],
    indicacoes: ['Esquizofrenia', 'TAB', 'Adjuvante em depressão', 'Irritabilidade no autismo'],
    mecanismoAcao: 'Agonista parcial D2 e 5-HT1A; antagonista 5-HT2A',
    posologias: [
      {
        indicacao: 'Esquizofrenia',
        adultos: { dose: '10-30mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Acatisia', 'Insônia', 'Náuseas', 'Cefaleia'],
      graves: ['SNM', 'Discinesia tardia', 'Hiperglicemia']
    },
    interacoes: [
      { medicamento: 'Indutores CYP3A4', gravidade: 'moderada', efeito: 'Reduz níveis', conduta: 'Pode precisar dose maior' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados limitados' },
    doencasRelacionadas: ['esquizofrenia', 'tab'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'paliperidona',
    nomeGenerico: 'Paliperidona',
    nomesComerciais: ['Invega', 'Invega Sustenna'],
    atcCode: 'N05AX13',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_atipico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_xr', concentracao: '3mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '6mg', disponivelSUS: false },
      { forma: 'injetavel_longa_acao', concentracao: '100mg/ml', disponivelSUS: false },
    ],
    indicacoes: ['Esquizofrenia', 'Transtorno esquizoafetivo'],
    mecanismoAcao: 'Metabólito ativo da risperidona; antagonista D2/5-HT2A',
    posologias: [
      {
        indicacao: 'Esquizofrenia',
        adultos: { dose: '3-12mg VO', frequencia: '1x/dia manhã' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade a risperidona'],
    efeitosAdversos: {
      comuns: ['SEP', 'Acatisia', 'Taquicardia', 'Cefaleia'],
      graves: ['SNM', 'Prolongamento QT', 'Hiperprolactinemia']
    },
    interacoes: [
      { medicamento: 'QT prolongadores', gravidade: 'moderada', efeito: 'Arritmia', conduta: 'Cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretada no leite' },
    ajusteDoseRenal: [
      { tfg: '50-80', ajuste: 'Máx 6mg/dia' },
      { tfg: '10-50', ajuste: 'Máx 3mg/dia' },
    ],
    doencasRelacionadas: ['esquizofrenia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ziprasidona',
    nomeGenerico: 'Ziprasidona',
    nomesComerciais: ['Geodon'],
    atcCode: 'N05AE04',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_atipico',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '40mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '80mg', disponivelSUS: false },
      { forma: 'injetavel_im', concentracao: '20mg/ml', disponivelSUS: false },
    ],
    indicacoes: ['Esquizofrenia', 'TAB (fase maníaca)', 'Agitação aguda'],
    mecanismoAcao: 'Antagonista D2/5-HT2A; também bloqueia recaptação 5-HT/NE',
    posologias: [
      {
        indicacao: 'Esquizofrenia',
        adultos: { dose: '40-80mg', frequencia: '12/12h com alimentos' },
      }
    ],
    contraindicacoes: ['QT longo', 'IAM recente', 'ICC descompensada'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Náuseas', 'SEP', 'Tontura'],
      graves: ['Prolongamento QT', 'Arritmias', 'SNM']
    },
    interacoes: [
      { medicamento: 'QT prolongadores', gravidade: 'contraindicada', efeito: 'Torsades de pointes', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados limitados' },
    monitorizacao: ['ECG basal'],
    doencasRelacionadas: ['esquizofrenia', 'tab'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'amisulprida',
    nomeGenerico: 'Amisulprida',
    nomesComerciais: ['Socian'],
    atcCode: 'N05AL05',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_atipico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: false },
    ],
    indicacoes: ['Esquizofrenia (sintomas positivos e negativos)', 'Distimia'],
    mecanismoAcao: 'Antagonista D2/D3 seletivo; doses baixas pré-sináptico',
    posologias: [
      {
        indicacao: 'Esquizofrenia',
        adultos: { dose: '400-800mg', frequencia: '1x/dia ou dividido', doseMaxima: '1200mg/dia' },
      },
      {
        indicacao: 'Distimia/Sint. negativos',
        adultos: { dose: '50-300mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Feocromocitoma', 'Prolactinoma', 'DRC grave'],
    efeitosAdversos: {
      comuns: ['Hiperprolactinemia', 'Insônia', 'Ansiedade', 'SEP'],
      graves: ['Prolongamento QT', 'SNM', 'Amenorreia/Galactorreia']
    },
    interacoes: [
      { medicamento: 'QT prolongadores', gravidade: 'grave', efeito: 'Arritmia', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Aumenta prolactina' },
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: 'Reduzir dose 50%' },
      { tfg: '<30', ajuste: 'Reduzir dose 66%' },
    ],
    doencasRelacionadas: ['esquizofrenia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Anticonvulsivantes adicionais
  {
    id: 'lamotrigina',
    nomeGenerico: 'Lamotrigina',
    nomesComerciais: ['Lamictal', 'Neural'],
    atcCode: 'N03AX09',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'bloqueador_canal_sodio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: ['Epilepsia focal e generalizada', 'TAB (profilaxia)', 'Síndrome de Lennox-Gastaut'],
    mecanismoAcao: 'Bloqueia canais de sódio; inibe liberação de glutamato',
    posologias: [
      {
        indicacao: 'Epilepsia (monoterapia)',
        adultos: { dose: '25mg/dia semanas 1-2, 50mg semanas 3-4, então aumentar até 100-200mg', frequencia: '1-2x/dia' },
      },
      {
        indicacao: 'Com valproato',
        adultos: { dose: 'Metade das doses acima', frequencia: 'Titulação mais lenta' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Tontura', 'Diplopia', 'Ataxia', 'Náuseas'],
      graves: ['Síndrome de Stevens-Johnson', 'NET', 'DRESS', 'Meningite asséptica']
    },
    interacoes: [
      { medicamento: 'Valproato', gravidade: 'grave', efeito: 'Dobra níveis de lamotrigina; maior risco de rash', conduta: 'Reduzir dose pela metade' },
      { medicamento: 'Carbamazepina', gravidade: 'moderada', efeito: 'Reduz níveis de lamotrigina', conduta: 'Pode precisar dose maior' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível com monitorização' },
    orientacoesPaciente: ['Suspender imediatamente se surgir rash; titulação lenta previne rash grave'],
    doencasRelacionadas: ['epilepsia', 'tab'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'oxcarbazepina',
    nomeGenerico: 'Oxcarbazepina',
    nomesComerciais: ['Trileptal'],
    atcCode: 'N03AF02',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'bloqueador_canal_sodio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '600mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '60mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Epilepsia focal', 'Neuralgia do trigêmeo'],
    mecanismoAcao: 'Pró-droga; metabólito ativo bloqueia canais de sódio',
    posologias: [
      {
        indicacao: 'Epilepsia',
        adultos: { dose: '600-2400mg', frequencia: 'Dividido 12/12h', observacoes: 'Iniciar 300mg 12/12h' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade a carbamazepina'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Sonolência', 'Diplopia', 'Náuseas', 'Cefaleia'],
      graves: ['Hiponatremia', 'Stevens-Johnson (raro)', 'Reações cutâneas']
    },
    interacoes: [
      { medicamento: 'Contraceptivos orais', gravidade: 'grave', efeito: 'Reduz eficácia contraceptiva', conduta: 'Usar método adicional' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Sódio sérico (especialmente em idosos ou com diuréticos)'],
    doencasRelacionadas: ['epilepsia', 'neuralgia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antidiabéticos adicionais
  {
    id: 'glimepirida',
    nomeGenerico: 'Glimepirida',
    nomesComerciais: ['Amaryl'],
    atcCode: 'A10BB12',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'sulfonilureia',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
    ],
    indicacoes: ['DM2 (quando metformina insuficiente)'],
    mecanismoAcao: 'Secretagogo de insulina; fecha canais K-ATP',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '1-4mg', frequencia: '1x/dia antes do café', doseMaxima: '8mg/dia' },
      }
    ],
    contraindicacoes: ['DM1', 'Cetoacidose', 'Gravidez', 'Insuficiência hepática/renal grave'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Ganho de peso', 'Náuseas'],
      graves: ['Hipoglicemia grave e prolongada']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Mascara sintomas de hipoglicemia', conduta: 'Cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['dm2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'gliclazida',
    nomeGenerico: 'Gliclazida',
    nomesComerciais: ['Diamicron', 'Azukon'],
    atcCode: 'A10BB09',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'sulfonilureia',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '30mg MR', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '60mg MR', disponivelSUS: true },
    ],
    indicacoes: ['DM2'],
    mecanismoAcao: 'Sulfonilureia; menor risco de hipoglicemia',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '30-120mg', frequencia: '1x/dia no café', doseMaxima: '120mg/dia' },
      }
    ],
    contraindicacoes: ['DM1', 'Cetoacidose', 'Gravidez'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia (menos que outras SU)', 'Ganho de peso'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [
      { medicamento: 'Miconazol', gravidade: 'contraindicada', efeito: 'Hipoglicemia grave', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['dm2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'pioglitazona',
    nomeGenerico: 'Pioglitazona',
    nomesComerciais: ['Actos', 'Piotaz'],
    atcCode: 'A10BG03',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'tiazolidinediona',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '45mg', disponivelSUS: false },
    ],
    indicacoes: ['DM2 (sensibilizador de insulina)', 'Esteatose hepática não alcoólica'],
    mecanismoAcao: 'Agonista PPAR-gama; aumenta sensibilidade à insulina',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '15-45mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['ICC classe III-IV', 'Câncer de bexiga ativo/histórico', 'Hepatopatia'],
    efeitosAdversos: {
      comuns: ['Edema', 'Ganho de peso', 'Infecções respiratórias'],
      graves: ['ICC', 'Fraturas (mulheres)', 'Câncer de bexiga (controverso)', 'Edema macular']
    },
    interacoes: [
      { medicamento: 'Insulina', gravidade: 'moderada', efeito: 'Edema e ICC', conduta: 'Cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['TGO/TGP', 'Sinais de ICC'],
    doencasRelacionadas: ['dm2', 'nash'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'acarbose',
    nomeGenerico: 'Acarbose',
    nomesComerciais: ['Glucobay', 'Aglucose'],
    atcCode: 'A10BF01',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'inibidor_alfa_glicosidase',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: ['DM2 (controle glicemia pós-prandial)', 'Síndrome de dumping'],
    mecanismoAcao: 'Inibe alfa-glicosidase intestinal; retarda absorção de carboidratos',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '50-100mg', frequencia: '3x/dia no início das refeições' },
      }
    ],
    contraindicacoes: ['Doença inflamatória intestinal', 'Obstrução intestinal', 'Cirrose'],
    efeitosAdversos: {
      comuns: ['Flatulência', 'Diarreia', 'Desconforto abdominal'],
      graves: ['Hepatotoxicidade (raro)']
    },
    interacoes: [
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Reduz absorção de digoxina', conduta: 'Monitorar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    orientacoesPaciente: ['Em caso de hipoglicemia, usar glicose (não sacarose)'],
    doencasRelacionadas: ['dm2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Anti-hipertensivos adicionais
  {
    id: 'clonidina',
    nomeGenerico: 'Clonidina',
    nomesComerciais: ['Atensina'],
    atcCode: 'C02AC01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'agonista_alfa2',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '0,2mg', disponivelSUS: true },
      { forma: 'adesivo', concentracao: '0,1mg/dia', disponivelSUS: false },
    ],
    indicacoes: ['Hipertensão resistente', 'Abstinência de opioides', 'TDAH (off-label)', 'Menopausa (fogachos)'],
    mecanismoAcao: 'Agonista alfa-2 central; reduz tônus simpático',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '0,1-0,3mg', frequencia: '12/12h', doseMaxima: '1,2mg/dia' },
      },
      {
        indicacao: 'Abstinência opioides',
        adultos: { dose: '0,1-0,3mg', frequencia: '6-8/8h por 7-10 dias' },
      }
    ],
    contraindicacoes: ['Bradicardia', 'BAV'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Sedação', 'Constipação', 'Hipotensão'],
      graves: ['Hipertensão rebote (suspensão abrupta)', 'Bradicardia', 'Depressão']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'grave', efeito: 'Hipertensão rebote se suspender clonidina', conduta: 'Retirar BB antes' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    orientacoesPaciente: ['Não suspender abruptamente'],
    doencasRelacionadas: ['hipertensao', 'abstinencia-opioide'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'metildopa',
    nomeGenerico: 'Metildopa',
    nomesComerciais: ['Aldomet'],
    atcCode: 'C02AB01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'agonista_alfa2',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
    ],
    indicacoes: ['Hipertensão na gestação'],
    mecanismoAcao: 'Pró-droga; convertida em alfa-metil-norepinefrina (agonista alfa-2)',
    posologias: [
      {
        indicacao: 'HAS gestacional',
        adultos: { dose: '250-500mg', frequencia: '2-3x/dia', doseMaxima: '3g/dia' },
      }
    ],
    contraindicacoes: ['Hepatopatia ativa', 'Depressão', 'Feocromocitoma'],
    efeitosAdversos: {
      comuns: ['Sedação', 'Boca seca', 'Cefaleia', 'Edema'],
      graves: ['Hepatotoxicidade', 'Anemia hemolítica', 'Depressão', 'Síndrome lúpus-like']
    },
    interacoes: [
      { medicamento: 'Ferro', gravidade: 'moderada', efeito: 'Reduz absorção de metildopa', conduta: 'Separar doses' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['TGO/TGP', 'Hemograma (Coombs)'],
    doencasRelacionadas: ['pre-eclampsia', 'hipertensao'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'hidralazina',
    nomeGenerico: 'Hidralazina',
    nomesComerciais: ['Apresolina'],
    atcCode: 'C02DB02',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'vasodilatador',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '20mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Emergência hipertensiva', 'ICC (com nitrato)', 'HAS na gestação'],
    mecanismoAcao: 'Vasodilatador arteriolar direto',
    posologias: [
      {
        indicacao: 'Emergência HAS',
        adultos: { dose: '10-20mg IV', frequencia: 'Repetir em 20-30min PRN' },
      },
      {
        indicacao: 'ICC (crônico)',
        adultos: { dose: '25-100mg', frequencia: '3-4x/dia' },
      }
    ],
    contraindicacoes: ['LES', 'DAC grave', 'Taquicardia', 'Aneurisma dissecante'],
    efeitosAdversos: {
      comuns: ['Taquicardia reflexa', 'Cefaleia', 'Rubor', 'Edema'],
      graves: ['Síndrome lúpus-like (dose alta crônica)', 'Angina']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'leve', efeito: 'Benéfico - reduz taquicardia reflexa', conduta: 'Associação útil' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['emergencia-hipertensiva', 'icc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'minoxidil',
    nomeGenerico: 'Minoxidil',
    nomesComerciais: ['Loniten'],
    atcCode: 'C02DC01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'vasodilatador',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
    ],
    indicacoes: ['Hipertensão refratária grave'],
    mecanismoAcao: 'Abre canais de potássio; vasodilatador arteriolar potente',
    posologias: [
      {
        indicacao: 'HAS refratária',
        adultos: { dose: '5-40mg', frequencia: '1-2x/dia', observacoes: 'Associar diurético e betabloqueador' },
      }
    ],
    contraindicacoes: ['Feocromocitoma', 'Derrame pericárdico'],
    efeitosAdversos: {
      comuns: ['Hirsutismo', 'Taquicardia reflexa', 'Retenção hídrica', 'Cefaleia'],
      graves: ['Derrame pericárdico', 'Angina', 'Edema pulmonar']
    },
    interacoes: [
      { medicamento: 'Guanetidina', gravidade: 'grave', efeito: 'Hipotensão ortostática grave', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretado no leite' },
    orientacoesPaciente: ['Sempre usar com diurético e betabloqueador'],
    doencasRelacionadas: ['hipertensao-refrataria'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Oftálmicos
  {
    id: 'latanoprosta',
    nomeGenerico: 'Latanoprosta',
    nomesComerciais: ['Xalatan', 'Glautan'],
    atcCode: 'S01EE01',
    classeTerapeutica: 'outros',
    subclasse: 'analogo_prostaglandina',
    rename: true,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,005%', disponivelSUS: true },
    ],
    indicacoes: ['Glaucoma de ângulo aberto', 'Hipertensão ocular'],
    mecanismoAcao: 'Análogo de prostaglandina F2-alfa; aumenta drenagem uveoscleral',
    posologias: [
      {
        indicacao: 'Glaucoma',
        adultos: { dose: '1 gota', frequencia: 'À noite no olho afetado' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Hiperemia conjuntival', 'Escurecimento da íris', 'Crescimento de cílios', 'Prurido'],
      graves: ['Edema macular (afácicos)', 'Uveíte']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    orientacoesPaciente: ['Pode escurecer permanentemente a cor da íris'],
    doencasRelacionadas: ['glaucoma'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'timolol-colirio',
    nomeGenerico: 'Timolol',
    nomesComerciais: ['Timoptol'],
    atcCode: 'S01ED01',
    classeTerapeutica: 'outros',
    subclasse: 'betabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,25%', disponivelSUS: true },
      { forma: 'colirio', concentracao: '0,5%', disponivelSUS: true },
    ],
    indicacoes: ['Glaucoma', 'Hipertensão ocular'],
    mecanismoAcao: 'Betabloqueador; reduz produção de humor aquoso',
    posologias: [
      {
        indicacao: 'Glaucoma',
        adultos: { dose: '1 gota', frequencia: '12/12h' },
      }
    ],
    contraindicacoes: ['Asma', 'DPOC grave', 'Bradicardia', 'BAV', 'ICC descompensada'],
    efeitosAdversos: {
      comuns: ['Ardência', 'Visão turva', 'Bradicardia'],
      graves: ['Broncoespasmo', 'Piora de ICC', 'Bradicardia grave']
    },
    interacoes: [
      { medicamento: 'Betabloqueador sistêmico', gravidade: 'moderada', efeito: 'Efeito aditivo', conduta: 'Cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorção sistêmica possível' },
    orientacoesPaciente: ['Comprimir ponto lacrimal após aplicação para reduzir absorção sistêmica'],
    doencasRelacionadas: ['glaucoma'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'brimonidina',
    nomeGenerico: 'Brimonidina',
    nomesComerciais: ['Alphagan'],
    atcCode: 'S01EA05',
    classeTerapeutica: 'outros',
    subclasse: 'agonista_alfa2',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,2%', disponivelSUS: false },
    ],
    indicacoes: ['Glaucoma', 'Hipertensão ocular'],
    mecanismoAcao: 'Agonista alfa-2; reduz produção e aumenta drenagem',
    posologias: [
      {
        indicacao: 'Glaucoma',
        adultos: { dose: '1 gota', frequencia: '8/8h ou 12/12h' },
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'Crianças <2 anos'],
    efeitosAdversos: {
      comuns: ['Alergia local', 'Boca seca', 'Fadiga', 'Cefaleia'],
      graves: ['Depressão SNC (crianças)', 'Bradicardia', 'Hipotensão']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Hipotensão', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['glaucoma'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'dorzolamida',
    nomeGenerico: 'Dorzolamida',
    nomesComerciais: ['Trusopt'],
    atcCode: 'S01EC03',
    classeTerapeutica: 'outros',
    subclasse: 'inibidor_anidrase_carbonica',
    rename: true,
    apresentacoes: [
      { forma: 'colirio', concentracao: '2%', disponivelSUS: true },
    ],
    indicacoes: ['Glaucoma', 'Hipertensão ocular'],
    mecanismoAcao: 'Inibe anidrase carbônica; reduz produção de humor aquoso',
    posologias: [
      {
        indicacao: 'Glaucoma',
        adultos: { dose: '1 gota', frequencia: '8/8h' },
      }
    ],
    contraindicacoes: ['Alergia a sulfonamidas'],
    efeitosAdversos: {
      comuns: ['Gosto amargo', 'Ardência', 'Visão turva', 'Ceratite'],
      graves: ['Reação alérgica grave', 'Stevens-Johnson (raro)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['glaucoma'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'acetazolamida',
    nomeGenerico: 'Acetazolamida',
    nomesComerciais: ['Diamox'],
    atcCode: 'S01EC01',
    classeTerapeutica: 'diuretico',
    subclasse: 'inibidor_anidrase_carbonica',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
    ],
    indicacoes: ['Glaucoma agudo', 'Epilepsia (adjuvante)', 'Edema de altitude', 'Alcalose metabólica'],
    mecanismoAcao: 'Inibe anidrase carbônica sistêmica',
    posologias: [
      {
        indicacao: 'Glaucoma agudo',
        adultos: { dose: '250-500mg', frequencia: '6/6h ou 8/8h' },
      },
      {
        indicacao: 'Mal de altitude',
        adultos: { dose: '125-250mg', frequencia: '12/12h iniciando 1 dia antes' },
      }
    ],
    contraindicacoes: ['Alergia a sulfonamidas', 'DRC grave', 'Acidose hiperclorêmica', 'Hiponatremia/Hipocalemia'],
    efeitosAdversos: {
      comuns: ['Parestesias', 'Poliúria', 'Anorexia', 'Alteração do paladar'],
      graves: ['Acidose metabólica', 'Nefrolitíase', 'Discrasias sanguíneas', 'Stevens-Johnson']
    },
    interacoes: [
      { medicamento: 'Lítio', gravidade: 'moderada', efeito: 'Reduz níveis de lítio', conduta: 'Monitorar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['glaucoma', 'epilepsia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Procinéticos adicionais
  {
    id: 'domperidona',
    nomeGenerico: 'Domperidona',
    nomesComerciais: ['Motilium', 'Peridal'],
    atcCode: 'A03FA03',
    classeTerapeutica: 'gastrointestinal',
    subclasse: 'procinetico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '1mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Náuseas e vômitos', 'Dispepsia', 'Gastroparesia'],
    mecanismoAcao: 'Antagonista D2 periférico; não atravessa BHE significativamente',
    posologias: [
      {
        indicacao: 'Náuseas/Dispepsia',
        adultos: { dose: '10mg', frequencia: '3x/dia antes das refeições', doseMaxima: '30mg/dia' },
      }
    ],
    contraindicacoes: ['QT longo', 'Prolactinoma', 'Obstrução GI', 'Hemorragia GI'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Cefaleia', 'Diarreia'],
      graves: ['Prolongamento QT', 'Arritmias', 'Hiperprolactinemia']
    },
    interacoes: [
      { medicamento: 'QT prolongadores', gravidade: 'grave', efeito: 'Arritmias', conduta: 'Evitar' },
      { medicamento: 'Inibidores CYP3A4', gravidade: 'grave', efeito: 'Aumenta níveis', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Aumenta lactação; monitorar lactente' },
    doencasRelacionadas: ['dispepsia', 'gastroparesia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'bromoprida',
    nomeGenerico: 'Bromoprida',
    nomesComerciais: ['Digesan'],
    atcCode: 'A03FA04',
    classeTerapeutica: 'gastrointestinal',
    subclasse: 'procinetico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '4mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Náuseas e vômitos', 'Dispepsia funcional'],
    mecanismoAcao: 'Antagonista D2; procinético',
    posologias: [
      {
        indicacao: 'Náuseas/Dispepsia',
        adultos: { dose: '10mg', frequencia: '3x/dia antes das refeições' },
      }
    ],
    contraindicacoes: ['Obstrução GI', 'Hemorragia GI', 'Perfuração'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Inquietação'],
      graves: ['SEP', 'Discinesia tardia', 'SNM']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['dispepsia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
];
