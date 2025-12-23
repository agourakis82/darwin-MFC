/**
 * EXPANSÃO GINECOLOGIA/OBSTETRÍCIA - DARWIN-MFC
 * ==============================================
 *
 * Medicamentos para saúde da mulher, gestação e parto.
 * Inclui contraceptivos, uterotônicos, tratamentos ginecológicos.
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosGinecologia: Partial<Medicamento>[] = [
  // ============================================================================
  // CONTRACEPTIVOS HORMONAIS
  // ============================================================================
  {
    id: 'levonorgestrel-etinilestradiol',
    nomeGenerico: 'Levonorgestrel + Etinilestradiol',
    nomesComerciais: ['Ciclo 21', 'Microvlar', 'Level'],
    atcCode: 'G03AA07',
    classeTerapeutica: 'contraceptivo',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,15mg + 0,03mg', disponivelSUS: true }
    ],
    indicacoes: ['Contracepção', 'Regularização ciclo menstrual', 'Dismenorreia'],
    mecanismoAcao: 'Progestágeno + estrogênio que inibem ovulação e modificam endométrio.',
    posologias: [
      {
        indicacao: 'Contracepção',
        adultos: { dose: '1 comprimido', frequencia: '1x/dia por 21 dias, pausa 7 dias' }
      }
    ],
    contraindicacoes: ['TVP/TEP atual ou prévio', 'Tabagismo > 35 anos', 'Câncer mama', 'Enxaqueca com aura', 'Doença hepática'],
    precaucoes: ['Aumenta risco TEV', 'Monitorar PA', 'Não protege DSTs'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Mastalgia', 'Cefaleia', 'Spotting'],
      graves: ['TEV', 'AVC', 'IAM', 'HAS']
    },
    interacoes: [
      { medicamento: 'Rifampicina', gravidade: 'grave', efeito: 'Reduz eficácia contraceptiva', conduta: 'Usar método adicional' },
      { medicamento: 'Anticonvulsivantes', gravidade: 'moderada', efeito: 'Reduz eficácia', conduta: 'Método adicional' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Reduz produção leite' }
  },

  {
    id: 'desogestrel',
    nomeGenerico: 'Desogestrel',
    nomesComerciais: ['Cerazette', 'Juliet'],
    atcCode: 'G03AC09',
    classeTerapeutica: 'contraceptivo',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,075mg', disponivelSUS: true }
    ],
    indicacoes: ['Contracepção (inclui lactantes)', 'Contraindicação a estrogênio'],
    mecanismoAcao: 'Progestágeno isolado que inibe ovulação de forma consistente.',
    posologias: [
      {
        indicacao: 'Contracepção',
        adultos: { dose: '1 comprimido', frequencia: '1x/dia contínuo (sem pausa)' }
      }
    ],
    contraindicacoes: ['Câncer mama', 'Tumor hepático', 'Sangramento vaginal não diagnosticado'],
    precaucoes: ['Spotting frequente', 'Amenorreia possível', 'Tomar no mesmo horário'],
    efeitosAdversos: {
      comuns: ['Spotting', 'Amenorreia', 'Acne', 'Mastalgia', 'Cefaleia'],
      graves: ['Gravidez ectópica (se falha)']
    },
    interacoes: [
      { medicamento: 'Indutores CYP3A4', gravidade: 'moderada', efeito: 'Reduz eficácia', conduta: 'Método adicional' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Compatível com lactação' }
  },

  {
    id: 'noretisterona-injetavel',
    nomeGenerico: 'Enantato de Noretisterona + Valerato de Estradiol',
    nomesComerciais: ['Mesigyna', 'Noregyna'],
    atcCode: 'G03AA',
    classeTerapeutica: 'contraceptivo',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_im', concentracao: '50mg + 5mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Contracepção mensal'],
    mecanismoAcao: 'Combinação progestágeno + estrogênio injetável de liberação prolongada.',
    posologias: [
      {
        indicacao: 'Contracepção',
        adultos: { dose: '1 ampola IM', frequencia: 'A cada 30 dias (±3 dias)' }
      }
    ],
    contraindicacoes: ['Mesmas do ACO combinado'],
    precaucoes: ['Aplicar sempre no mesmo intervalo', 'Risco TEV similar oral'],
    efeitosAdversos: {
      comuns: ['Alteração ciclo', 'Cefaleia', 'Mastalgia'],
      graves: ['TEV', 'AVC']
    },
    interacoes: [],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },

  {
    id: 'medroxiprogesterona-injetavel',
    nomeGenerico: 'Acetato de Medroxiprogesterona Injetável',
    nomesComerciais: ['Depo-Provera', 'Contracep'],
    atcCode: 'G03AC06',
    classeTerapeutica: 'contraceptivo',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_im', concentracao: '150mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Contracepção trimestral', 'Endometriose', 'Câncer endometrial'],
    mecanismoAcao: 'Progestágeno de depósito que suprime ovulação por 3 meses.',
    posologias: [
      {
        indicacao: 'Contracepção',
        adultos: { dose: '150mg IM profundo', frequencia: 'A cada 12-13 semanas' }
      }
    ],
    contraindicacoes: ['Câncer mama', 'Sangramento não diagnosticado', 'Doença hepática'],
    precaucoes: ['Perda DMO (uso prolongado)', 'Retorno fertilidade demorado', 'Ganho peso'],
    efeitosAdversos: {
      comuns: ['Sangramento irregular', 'Amenorreia', 'Ganho peso', 'Cefaleia'],
      graves: ['Perda DMO', 'Depressão']
    },
    interacoes: [
      { medicamento: 'Aminoglutetimida', gravidade: 'moderada', efeito: 'Reduz níveis MPA', conduta: 'Monitorar' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Seguro após 6 semanas pós-parto' }
  },

  {
    id: 'levonorgestrel-emergencia',
    nomeGenerico: 'Levonorgestrel (Contracepção Emergência)',
    nomesComerciais: ['Postinor', 'Pilem'],
    atcCode: 'G03AC03',
    classeTerapeutica: 'contraceptivo',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '0,75mg', disponivelSUS: true }
    ],
    indicacoes: ['Contracepção de emergência (até 72-120h)'],
    mecanismoAcao: 'Progestágeno em alta dose que inibe/retarda ovulação. Não é abortivo.',
    posologias: [
      {
        indicacao: 'Emergência',
        adultos: { dose: '1,5mg dose única ou 0,75mg 12/12h (2 doses)', frequencia: 'Até 72h (idealmente 12h)' }
      }
    ],
    contraindicacoes: ['Gestação confirmada'],
    precaucoes: ['Eficácia reduz com tempo', 'Não usar rotineiramente', 'Não previne DSTs'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Cefaleia', 'Alteração menstrual', 'Fadiga'],
      graves: ['Gravidez ectópica (se falha)']
    },
    interacoes: [
      { medicamento: 'Indutores CYP3A4', gravidade: 'moderada', efeito: 'Pode reduzir eficácia', conduta: 'Considerar dose dupla' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Dose única segura' }
  },

  // ============================================================================
  // UTEROTÔNICOS
  // ============================================================================
  {
    id: 'ocitocina',
    nomeGenerico: 'Ocitocina',
    nomesComerciais: ['Syntocinon', 'Pitocin'],
    atcCode: 'H01BB02',
    classeTerapeutica: 'hormonio',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '5UI/ml', disponivelSUS: true }
    ],
    indicacoes: ['Indução parto', 'Profilaxia/tratamento HPP', 'Estímulo lactação'],
    mecanismoAcao: 'Hormônio que estimula contração uterina e ejeção do leite.',
    posologias: [
      {
        indicacao: 'Indução parto',
        adultos: { dose: '1-2mUI/min IV, titular até 20mUI/min', frequencia: 'Infusão contínua' }
      },
      {
        indicacao: 'Profilaxia HPP',
        adultos: { dose: '10UI IM', frequencia: 'Após nascimento' }
      }
    ],
    contraindicacoes: ['DCP', 'Apresentação anômala', 'Sofrimento fetal', 'Placenta prévia', 'Prolapso cordão'],
    precaucoes: ['Monitorar BCF contínuo', 'Hiperestimulação', 'Hiponatremia (doses altas)'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Vômitos'],
      graves: ['Rotura uterina', 'Hiponatremia', 'Arritmia', 'Sofrimento fetal']
    },
    interacoes: [
      { medicamento: 'Prostaglandinas', gravidade: 'moderada', efeito: 'Hiperestimulação', conduta: 'Intervalo 4-6h' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Hormônio natural' }
  },

  {
    id: 'misoprostol',
    nomeGenerico: 'Misoprostol',
    nomesComerciais: ['Cytotec', 'Prostokos'],
    atcCode: 'G02AD06',
    classeTerapeutica: 'gastrointestinal',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '200mcg', disponivelSUS: true }
    ],
    indicacoes: ['Amadurecimento cervical', 'Indução parto', 'HPP', 'Aborto retido'],
    mecanismoAcao: 'Análogo prostaglandina E1 que amadurece cérvix e estimula contrações.',
    posologias: [
      {
        indicacao: 'Amadurecimento cervical',
        adultos: { dose: '25mcg vaginal', frequencia: 'A cada 4-6h, máximo 50mcg' }
      },
      {
        indicacao: 'HPP',
        adultos: { dose: '800mcg sublingual', frequencia: 'Dose única' }
      }
    ],
    contraindicacoes: ['Cesariana prévia (> 25mcg)', 'Histerotomia', 'Apresentação anômala'],
    precaucoes: ['Monitorar taquissistolia', 'Dose máxima cervical', 'Conservar refrigerado'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Diarreia', 'Febre', 'Calafrios'],
      graves: ['Rotura uterina', 'Taquissistolia', 'Sofrimento fetal']
    },
    interacoes: [],
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Usar com cautela' }
  },

  {
    id: 'metilergometrina',
    nomeGenerico: 'Metilergometrina',
    nomesComerciais: ['Methergin'],
    atcCode: 'G02AB01',
    classeTerapeutica: 'hormonio',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '0,2mg/ml', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '0,125mg', disponivelSUS: true }
    ],
    indicacoes: ['HPP', 'Subinvolução uterina pós-parto/aborto'],
    mecanismoAcao: 'Ergot alcaloide que causa contração uterina tônica.',
    posologias: [
      {
        indicacao: 'HPP',
        adultos: { dose: '0,2mg IM', frequencia: 'Pode repetir a cada 2-4h, máx 5 doses' }
      }
    ],
    contraindicacoes: ['HAS', 'Pré-eclâmpsia', 'Doença vascular', 'Antes saída placenta'],
    precaucoes: ['Não usar antes do período expulsivo', 'Risco vasoespasmo'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Vômitos', 'Cólicas'],
      graves: ['HAS grave', 'Vasoespasmo coronariano', 'AVC', 'Ergotismo']
    },
    interacoes: [
      { medicamento: 'Macrolídeos', gravidade: 'grave', efeito: 'Ergotismo', conduta: 'Contraindicado' },
      { medicamento: 'Vasoconstrictores', gravidade: 'grave', efeito: 'Vasoespasmo', conduta: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Doses únicas' }
  },

  // ============================================================================
  // TRATAMENTO INFECÇÕES GINECOLÓGICAS
  // ============================================================================
  {
    id: 'metronidazol-vaginal',
    nomeGenerico: 'Metronidazol Gel Vaginal',
    nomesComerciais: ['Flagyl Gel', 'Metrogel'],
    atcCode: 'G01AF01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'nitroimidazol',
    rename: true,
    apresentacoes: [
      { forma: 'gel_vaginal', concentracao: '0,75%', disponivelSUS: true }
    ],
    indicacoes: ['Vaginose bacteriana', 'Tricomoníase'],
    mecanismoAcao: 'Nitroimidazol com ação bactericida contra anaeróbios.',
    posologias: [
      {
        indicacao: 'Vaginose bacteriana',
        adultos: { dose: '1 aplicador (5g) intravaginal', frequencia: '1x/dia por 5 dias ou 2x/dia por 5 dias' }
      }
    ],
    contraindicacoes: ['1º trimestre gestação', 'Alergia a nitroimidazois'],
    precaucoes: ['Evitar álcool (efeito dissulfiram)', 'Pode enfraquecer preservativo'],
    efeitosAdversos: {
      comuns: ['Irritação local', 'Prurido vaginal'],
      graves: ['Reações alérgicas']
    },
    interacoes: [
      { medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Reação dissulfiram', conduta: 'Evitar álcool' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Via vaginal segura' }
  },

  {
    id: 'clotrimazol-vaginal',
    nomeGenerico: 'Clotrimazol Vaginal',
    nomesComerciais: ['Gino-Canesten', 'Clotrimix'],
    atcCode: 'G01AF02',
    classeTerapeutica: 'antifungico',
    subclasse: 'antifungico',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '1%', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg (vaginal)', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg (vaginal)', disponivelSUS: true }
    ],
    indicacoes: ['Candidíase vulvovaginal'],
    mecanismoAcao: 'Imidazólico que inibe síntese de ergosterol fúngico.',
    posologias: [
      {
        indicacao: 'Candidíase',
        adultos: { dose: 'Creme 1x/dia 7 dias OU Comp 100mg 1x/noite 7 dias OU 500mg dose única', frequencia: 'Ver dose' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Pode danificar preservativos de látex'],
    efeitosAdversos: {
      comuns: ['Irritação local', 'Queimação'],
      graves: ['Reações alérgicas']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Absorção mínima' }
  },

  {
    id: 'fluconazol-ginecologia',
    nomeGenerico: 'Fluconazol',
    nomesComerciais: ['Zoltec', 'Diflucan'],
    atcCode: 'J02AC01',
    classeTerapeutica: 'antifungico',
    subclasse: 'antifungico',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '150mg', disponivelSUS: true }
    ],
    indicacoes: ['Candidíase vulvovaginal não complicada'],
    mecanismoAcao: 'Triazol que inibe síntese de ergosterol fúngico.',
    posologias: [
      {
        indicacao: 'Candidíase',
        adultos: { dose: '150mg', frequencia: 'Dose única' }
      },
      {
        indicacao: 'Candidíase recorrente',
        adultos: { dose: '150mg', frequencia: 'Semanal por 6 meses' }
      }
    ],
    contraindicacoes: ['Gestação (uso prolongado)', 'QT longo'],
    precaucoes: ['Hepatotoxicidade', 'Interações CYP'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Náusea', 'Dor abdominal'],
      graves: ['Hepatotoxicidade', 'Prolongamento QT']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumenta INR', conduta: 'Monitorar INR' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Dose única segura' }
  },

  // ============================================================================
  // TERAPIA HORMONAL
  // ============================================================================
  {
    id: 'estradiol-oral',
    nomeGenerico: 'Estradiol',
    nomesComerciais: ['Estrofem', 'Natifa'],
    atcCode: 'G03CA03',
    classeTerapeutica: 'hormonio',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false }
    ],
    indicacoes: ['Sintomas climatério', 'Atrofia urogenital', 'Prevenção osteoporose'],
    mecanismoAcao: 'Estrogênio natural (17β-estradiol) para reposição hormonal.',
    posologias: [
      {
        indicacao: 'Climatério',
        adultos: { dose: '1-2mg', frequencia: '1x/dia (com progestágeno se útero presente)' }
      }
    ],
    contraindicacoes: ['Câncer mama/endométrio', 'TEV', 'Doença hepática', 'Sangramento não diagnosticado'],
    precaucoes: ['Associar progestágeno se útero presente', 'Risco TEV/CV', 'Menor tempo possível'],
    efeitosAdversos: {
      comuns: ['Mastalgia', 'Náusea', 'Cefaleia', 'Spotting'],
      graves: ['TEV', 'AVC', 'Câncer mama', 'Câncer endométrio']
    },
    interacoes: [
      { medicamento: 'Indutores CYP3A4', gravidade: 'moderada', efeito: 'Reduz estradiol', conduta: 'Monitorar' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Pode reduzir lactação' }
  },

  {
    id: 'estrogenos-conjugados',
    nomeGenerico: 'Estrogênios Conjugados',
    nomesComerciais: ['Premarin', 'Wyeth'],
    atcCode: 'G03CA57',
    classeTerapeutica: 'hormonio',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,3mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '0,625mg', disponivelSUS: false },
      { forma: 'creme', concentracao: '0,625mg/g (vaginal)', disponivelSUS: false }
    ],
    indicacoes: ['Sintomas vasomotores', 'Atrofia vulvovaginal', 'Prevenção osteoporose'],
    mecanismoAcao: 'Mistura de estrogênios equinos conjugados.',
    posologias: [
      {
        indicacao: 'Climatério',
        adultos: { dose: '0,3-0,625mg', frequencia: '1x/dia' }
      },
      {
        indicacao: 'Atrofia vaginal',
        adultos: { dose: '0,5g creme vaginal', frequencia: '1x/dia por 3 sem, depois 2x/sem' }
      }
    ],
    contraindicacoes: ['Câncer estrógeno-dependente', 'TEV', 'Sangramento não diagnosticado'],
    precaucoes: ['Risco TEV/CV', 'Uso menor tempo possível', 'Via vaginal menor risco'],
    efeitosAdversos: {
      comuns: ['Mastalgia', 'Náusea', 'Retenção líquida'],
      graves: ['TEV', 'AVC', 'Câncer mama/endométrio']
    },
    interacoes: [],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  },

  {
    id: 'progesterona-micronizada',
    nomeGenerico: 'Progesterona Micronizada',
    nomesComerciais: ['Utrogestan', 'Evocanil'],
    atcCode: 'G03DA04',
    classeTerapeutica: 'hormonio',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '200mg', disponivelSUS: false }
    ],
    indicacoes: ['TRH (proteção endométrio)', 'Suporte fase lútea', 'Ameaça de aborto'],
    mecanismoAcao: 'Progesterona natural que prepara endométrio e mantém gestação.',
    posologias: [
      {
        indicacao: 'TRH',
        adultos: { dose: '200mg', frequencia: '1x/dia ao deitar por 12-14 dias/mês' }
      },
      {
        indicacao: 'Suporte lúteo',
        adultos: { dose: '200mg vaginal', frequencia: '2-3x/dia' }
      }
    ],
    contraindicacoes: ['Sangramento não diagnosticado', 'Câncer mama', 'Tromboflebite'],
    precaucoes: ['Sedação (via oral)', 'Tonturas', 'Via vaginal menos sedação'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Tontura', 'Spotting'],
      graves: ['Reações alérgicas (amendoim-soja)']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },

  // ============================================================================
  // TRATAMENTO DE CONDIÇÕES GINECOLÓGICAS
  // ============================================================================
  {
    id: 'clomifeno',
    nomeGenerico: 'Citrato de Clomifeno',
    nomesComerciais: ['Clomid', 'Indux', 'Serofene'],
    atcCode: 'G03GB02',
    classeTerapeutica: 'indutor_ovulacao',
    subclasse: 'serm',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true }
    ],
    indicacoes: ['Anovulação (SOP)', 'Infertilidade por anovulação'],
    mecanismoAcao: 'SERM que bloqueia retroalimentação negativa estrogênica no hipotálamo.',
    posologias: [
      {
        indicacao: 'Indução ovulação',
        adultos: { dose: '50mg', frequencia: '1x/dia do D5-D9 do ciclo, pode aumentar até 150mg' }
      }
    ],
    contraindicacoes: ['Gestação', 'Cisto ovariano', 'Sangramento anormal não diagnosticado', 'IH'],
    precaucoes: ['Monitorar USG', 'Risco gestação múltipla', 'SHO', 'Máximo 6 ciclos'],
    efeitosAdversos: {
      comuns: ['Fogachos', 'Distensão abdominal', 'Náusea', 'Cefaleia'],
      graves: ['SHO', 'Gestação múltipla', 'Distúrbios visuais', 'Torção ovariana']
    },
    interacoes: [],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Pode inibir lactação' }
  },

  {
    id: 'acido-tranexamico',
    nomeGenerico: 'Ácido Tranexâmico',
    nomesComerciais: ['Transamin', 'Hemoblock'],
    atcCode: 'B02AA02',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '50mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Sangramento menstrual excessivo', 'Hemorragia', 'Fibrinólise excessiva'],
    mecanismoAcao: 'Antifibrinolítico que inibe conversão plasminogênio em plasmina.',
    posologias: [
      {
        indicacao: 'Menorragia',
        adultos: { dose: '1-1,5g', frequencia: '3x/dia durante menstruação (máx 4 dias)' }
      },
      {
        indicacao: 'HPP',
        adultos: { dose: '1g IV', frequencia: 'Em 10min, repetir se necessário após 30min' }
      }
    ],
    contraindicacoes: ['TEV ativa', 'Hemorragia subaracnóidea', 'Cor anômala visão'],
    precaucoes: ['Risco TEV', 'Ajustar em IR', 'Evitar uso prolongado'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Diarreia', 'Cefaleia'],
      graves: ['TEV', 'Convulsões (doses altas IV)']
    },
    interacoes: [
      { medicamento: 'ACO', gravidade: 'leve', efeito: 'Teórico aumento risco TEV', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Excreção mínima' }
  }
];
