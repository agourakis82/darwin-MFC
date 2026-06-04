/**
 * UROLOGIA NOVOS - DARWIN-MFC EXPANSAO 1000
 * ==========================================
 * Medicamentos urologicos com abordagem ontology-first
 *
 * Inclui:
 * - Alfa-bloqueadores (HPB): Tansulosina, Silodosina, Alfuzosina
 * - Inibidores 5-alfa-redutase: Finasterida, Dutasterida
 * - Agonistas beta-3: Mirabegrona, Vibegron
 * - Antimuscarinicoss (bexiga hiperativa): Solifenacina, Tolterodina, Oxibutinina, Darifenacina, Fesoterodina
 *
 * Referencias:
 * - AUA Guidelines on BPH/LUTS 2021
 * - AUA/SUFU Guidelines on Overactive Bladder 2019
 * - EAU Guidelines on LUTS 2024
 * - PCPT, MTOPS, CombAT trials
 */

import { Medicamento } from '@/lib/types/medicamento';

export const urologiaNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // ALFA-BLOQUEADORES (HPB/STUI)
  // =============================================================================
  {
    id: 'tansulosina-novo',
    nomeGenerico: 'Tansulosina',
    nomesComerciais: ['Secotex', 'Flomax', 'Omnic', 'Contiflo'],
    atcCode: 'G04CA02',
    rxNormCui: '77492',
    drugBankId: 'DB00706',
    snomedCT: '372509005',
    casNumber: '106133-20-4',
    classeTerapeutica: 'outros',
    subclasse: 'alfabloqueador',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '0,4mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '0,4mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Hiperplasia prostatica benigna (HPB) sintomatica',
      'Sintomas do trato urinario inferior (STUI) por HPB',
      'Terapia expulsiva medica para litiase ureteral distal (off-label)',
    ],
    mecanismoAcao: 'Bloqueador alfa-1A adrenergico seletivo. Relaxa musculo liso prostatico e colo vesical, melhorando fluxo urinario sem efeito significativo na pressao arterial.',
    posologias: [
      {
        indicacao: 'HPB/STUI',
        adultos: {
          dose: '0,4mg',
          frequencia: '1x/dia, 30min apos mesma refeicao',
          observacoes: 'Nao mastigar capsulas. Efeito em 1-2 semanas.',
        },
      },
      {
        indicacao: 'Litiase ureteral (off-label)',
        adultos: {
          dose: '0,4mg',
          frequencia: '1x/dia por ate 4 semanas',
          observacoes: 'Calculos <=10mm no ureter distal.',
        },
      },
    ],
    contraindicacoes: [
      'Hipotensao ortostatica grave',
      'Historia de sindrome de iris flacida (IFIS) sem informar oftalmologista',
      'Insuficiencia hepatica grave',
    ],
    precaucoes: [
      'Informar oftalmologista antes de cirurgia de catarata (risco IFIS)',
      'Hipotensao ortostatica na primeira dose',
      'Ejaculacao retrograda frequente',
      'Cautela com inibidores CYP3A4 ou CYP2D6',
    ],
    efeitosAdversos: {
      comuns: ['Ejaculacao retrograda/anormal', 'Tontura', 'Rinite', 'Cefaleia'],
      graves: ['Sincope', 'Priapismo (raro)', 'Reacoes alergicas graves'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores CYP3A4 fortes (cetoconazol)',
        gravidade: 'grave',
        efeito: 'Aumento significativo niveis tansulosina',
        conduta: 'Evitar uso concomitante',
      },
      {
        medicamento: 'Anti-hipertensivos',
        gravidade: 'moderada',
        efeito: 'Potencializacao efeito hipotensor',
        conduta: 'Monitorar PA; ajustar doses',
      },
      {
        medicamento: 'Inibidores PDE5 (sildenafila)',
        gravidade: 'moderada',
        efeito: 'Hipotensao',
        conduta: 'Iniciar PDE5i em dose baixa',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>10', ajuste: 'Sem ajuste necessario' },
      { tfg: '<10', ajuste: 'Dados limitados; usar com cautela' },
    ],
    gestacao: 'N',
    amamentacao: { compativel: false, observacao: 'Nao aplicavel - uso masculino' },
    monitorizacao: ['Melhora sintomas STUI (IPSS)', 'Fluxo urinario', 'PA ortostatica inicial'],
    orientacoesPaciente: [
      'Tomar sempre apos mesma refeicao',
      'Levantar-se devagar para evitar tontura',
      'Informar medico antes de cirurgia de catarata',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco hipotensao ortostatica',
      hepatopatas: 'Contraindicado em IH grave',
    },
    doencasRelacionadas: ['hpb', 'stui', 'litiase-urinaria'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['HPB', 'alfa-bloqueador', 'tansulosina', 'prostata', 'STUI'],
  },

  {
    id: 'silodosina',
    nomeGenerico: 'Silodosina',
    nomesComerciais: ['Rapaflo', 'Silodyx', 'Urorec'],
    atcCode: 'G04CA04',
    rxNormCui: '603276',
    drugBankId: 'DB06207',
    snomedCT: '442042006',
    casNumber: '160970-54-7',
    classeTerapeutica: 'outros',
    subclasse: 'alfabloqueador',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '4mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '8mg', disponivelSUS: false },
    ],
    indicacoes: [
      'HPB sintomatica',
      'STUI associados a HPB',
    ],
    mecanismoAcao: 'Bloqueador alfa-1A altamente seletivo (162x mais afinidade alfa-1A vs alfa-1B). Menor efeito cardiovascular que outros alfa-bloqueadores.',
    posologias: [
      {
        indicacao: 'HPB',
        adultos: {
          dose: '8mg',
          frequencia: '1x/dia com alimentos',
          observacoes: 'Reduzir para 4mg se IR moderada.',
        },
      },
    ],
    contraindicacoes: [
      'IR grave (ClCr <30)',
      'IH grave (Child-Pugh C)',
      'Uso concomitante com inibidores CYP3A4 fortes',
    ],
    precaucoes: [
      'Alta incidencia de ejaculacao retrograda (ate 28%)',
      'IFIS - informar oftalmologista',
      'Nao recomendado com inibidores CYP3A4 fortes',
    ],
    efeitosAdversos: {
      comuns: ['Ejaculacao retrograda (muito frequente)', 'Tontura', 'Diarreia', 'Congestao nasal'],
      graves: ['Sincope', 'Priapismo', 'Reacoes alergicas'],
    },
    interacoes: [
      {
        medicamento: 'Cetoconazol e inibidores CYP3A4 fortes',
        gravidade: 'contraindicada',
        efeito: 'Aumento 3,7x niveis silodosina',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Anti-hipertensivos',
        gravidade: 'moderada',
        efeito: 'Hipotensao aditiva',
        conduta: 'Monitorar PA',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: '8mg/dia' },
      { tfg: '30-50', ajuste: '4mg/dia' },
      { tfg: '<30', ajuste: 'Contraindicado' },
    ],
    gestacao: 'N',
    amamentacao: { compativel: false, observacao: 'Nao aplicavel - uso masculino' },
    monitorizacao: ['IPSS', 'Fluxo urinario', 'Funcao renal'],
    orientacoesPaciente: [
      'Tomar com alimentos',
      'Ejaculacao retrograda e comum mas reversivel',
      'Informar oftalmologista antes cirurgia catarata',
    ],
    doencasRelacionadas: ['hpb', 'stui'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['HPB', 'silodosina', 'alfa-bloqueador', 'seletivo'],
  },

  {
    id: 'alfuzosina',
    nomeGenerico: 'Alfuzosina',
    nomesComerciais: ['Xatral', 'Uroxatral'],
    atcCode: 'G04CA01',
    rxNormCui: '17109',
    drugBankId: 'DB00346',
    snomedCT: '386918003',
    casNumber: '81403-80-7',
    classeTerapeutica: 'outros',
    subclasse: 'alfabloqueador',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_xr', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: false },
    ],
    indicacoes: [
      'HPB sintomatica',
      'STUI por HPB',
      'Retencao urinaria aguda (facilitacao cateterismo)',
    ],
    mecanismoAcao: 'Bloqueador alfa-1 com seletividade urologica. Relaxa musculo liso prostatico e colo vesical.',
    posologias: [
      {
        indicacao: 'HPB',
        adultos: {
          dose: '10mg XR',
          frequencia: '1x/dia apos refeicao',
          observacoes: 'Liberacao imediata: 2,5mg 3x/dia (menos usado).',
        },
      },
    ],
    contraindicacoes: [
      'IH moderada a grave',
      'Uso com inibidores CYP3A4 fortes',
      'QT longo',
      'Hipotensao ortostatica sintomatica',
    ],
    precaucoes: [
      'Prolongamento QT - evitar em arritmias',
      'IFIS em cirurgia catarata',
      'Menor incidencia ejaculacao retrograda vs tansulosina',
    ],
    efeitosAdversos: {
      comuns: ['Tontura', 'Cefaleia', 'Fadiga', 'Sintomas respiratorios superiores'],
      graves: ['Hipotensao', 'Sincope', 'Prolongamento QT', 'Angioedema'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores CYP3A4 (cetoconazol, itraconazol, ritonavir)',
        gravidade: 'contraindicada',
        efeito: 'Aumento niveis alfuzosina',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Medicamentos que prolongam QT',
        gravidade: 'grave',
        efeito: 'Risco arritmia',
        conduta: 'Evitar combinacao',
      },
      {
        medicamento: 'Nitratos',
        gravidade: 'moderada',
        efeito: 'Hipotensao',
        conduta: 'Usar com cautela',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Usar com cautela' },
    ],
    gestacao: 'N',
    amamentacao: { compativel: false, observacao: 'Nao aplicavel - uso masculino' },
    monitorizacao: ['IPSS', 'ECG se fatores risco QT', 'PA'],
    orientacoesPaciente: [
      'Tomar apos refeicao',
      'Nao mastigar comprimido XR',
      'Evitar dirigir se tontura',
    ],
    doencasRelacionadas: ['hpb', 'stui', 'retencao-urinaria'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['HPB', 'alfuzosina', 'alfa-bloqueador', 'QT'],
  },

  // =============================================================================
  // INIBIDORES 5-ALFA-REDUTASE
  // =============================================================================
  {
    id: 'finasterida-novo',
    nomeGenerico: 'Finasterida',
    nomesComerciais: ['Proscar', 'Propecia', 'Finalop', 'Finastil'],
    atcCode: 'G04CB01',
    rxNormCui: '42355',
    drugBankId: 'DB01216',
    snomedCT: '386963006',
    casNumber: '98319-26-7',
    classeTerapeutica: 'outros',
    subclasse: 'inibidor_5alfa_redutase',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: false },
    ],
    indicacoes: [
      'HPB sintomatica (5mg)',
      'Prevencao retencao urinaria aguda e necessidade de cirurgia',
      'Alopecia androgenica masculina (1mg)',
    ],
    mecanismoAcao: 'Inibidor competitivo da 5-alfa-redutase tipo 2. Reduz conversao de testosterona em diidrotestosterona (DHT), diminuindo volume prostatico em 20-30%.',
    posologias: [
      {
        indicacao: 'HPB',
        adultos: {
          dose: '5mg',
          frequencia: '1x/dia',
          observacoes: 'Efeito maximo em 6-12 meses. Pode combinar com alfa-bloqueador.',
        },
      },
      {
        indicacao: 'Alopecia',
        adultos: {
          dose: '1mg',
          frequencia: '1x/dia',
          observacoes: 'Uso continuo; perda beneficio ao suspender.',
        },
      },
    ],
    contraindicacoes: [
      'Mulheres (teratogenico)',
      'Criancas',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Reduz PSA em ~50% - ajustar interpretacao',
      'Mulheres gravidas nao devem manipular comprimidos',
      'Efeitos sexuais podem persistir apos suspensao',
      'Risco aumentado cancer prostata alto grau controverso',
    ],
    efeitosAdversos: {
      comuns: ['Disfuncao eretil', 'Diminuicao libido', 'Reducao volume ejaculado'],
      graves: ['Depressao', 'Ginecomastia', 'Sindrome pos-finasterida (controversa)', 'Cancer mama masculino (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Nao ha interacoes clinicamente significativas',
        gravidade: 'leve',
        efeito: 'Metabolismo hepatico minimo',
        conduta: 'Nenhum ajuste necessario',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>10', ajuste: 'Sem ajuste' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado em mulheres' },
    monitorizacao: ['PSA basal e periodico (dobrar valor)', 'Exame prostata digital', 'Sintomas depressivos'],
    orientacoesPaciente: [
      'Pode demorar 6 meses para efeito maximo',
      'Informar laboratorio sobre uso (PSA)',
      'Mulheres gravidas nao devem tocar comprimidos',
      'Nao doar sangue durante uso e 1 mes apos',
    ],
    consideracoesEspeciais: {
      idosos: 'Nao requer ajuste',
    },
    doencasRelacionadas: ['hpb', 'alopecia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['HPB', 'finasterida', '5-alfa-redutase', 'prostata', 'alopecia'],
  },

  {
    id: 'dutasterida-novo',
    nomeGenerico: 'Dutasterida',
    nomesComerciais: ['Avodart', 'Dutas', 'Combodart (+ tansulosina)'],
    atcCode: 'G04CB02',
    rxNormCui: '152964',
    drugBankId: 'DB01126',
    snomedCT: '407313003',
    casNumber: '164656-23-9',
    classeTerapeutica: 'outros',
    subclasse: 'inibidor_5alfa_redutase',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '0,5mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '0,5mg + tansulosina 0,4mg', disponivelSUS: false },
    ],
    indicacoes: [
      'HPB sintomatica',
      'Reducao risco retencao urinaria e cirurgia',
      'Terapia combinada com alfa-bloqueador',
      'Alopecia androgenica (off-label)',
    ],
    mecanismoAcao: 'Inibidor dual da 5-alfa-redutase tipo 1 e tipo 2. Reducao mais completa de DHT (~95%) comparado a finasterida (~70%). Meia-vida longa (5 semanas).',
    posologias: [
      {
        indicacao: 'HPB',
        adultos: {
          dose: '0,5mg',
          frequencia: '1x/dia',
          observacoes: 'Pode ser combinado com tansulosina (Combodart).',
        },
      },
    ],
    contraindicacoes: [
      'Mulheres (teratogenico)',
      'Criancas',
      'IH grave',
    ],
    precaucoes: [
      'Reduz PSA ~50%',
      'Meia-vida muito longa - efeitos persistem meses apos suspensao',
      'Nao doar sangue por 6 meses apos uso',
      'Metabolizado por CYP3A4',
    ],
    efeitosAdversos: {
      comuns: ['Impotencia', 'Diminuicao libido', 'Disturbios ejaculacao', 'Ginecomastia'],
      graves: ['Depressao', 'Reacoes alergicas', 'Possivel aumento cancer mama masculino'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores CYP3A4 fortes',
        gravidade: 'moderada',
        efeito: 'Aumento niveis dutasterida',
        conduta: 'Monitorar efeitos adversos',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste - excrecao renal minima' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado em mulheres' },
    monitorizacao: ['PSA (dobrar valor)', 'Exame prostata', 'Volume prostatico'],
    orientacoesPaciente: [
      'Nao abrir capsula (irritante mucosa)',
      'Efeito maximo em 6-12 meses',
      'Nao doar sangue por 6 meses apos parar',
      'Mulheres gravidas nao devem manusear',
    ],
    consideracoesEspeciais: {
      hepatopatas: 'Evitar em IH grave',
    },
    doencasRelacionadas: ['hpb', 'alopecia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['HPB', 'dutasterida', '5-alfa-redutase', 'prostata', 'CombAT'],
  },

  // =============================================================================
  // AGONISTAS BETA-3 (BEXIGA HIPERATIVA)
  // =============================================================================
  {
    id: 'mirabegrona-novo',
    nomeGenerico: 'Mirabegrona',
    nomesComerciais: ['Myrbetric', 'Betmiga'],
    atcCode: 'G04BD12',
    rxNormCui: '1300770',
    drugBankId: 'DB08893',
    snomedCT: '703128001',
    casNumber: '223673-61-8',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_xr', concentracao: '25mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '50mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Bexiga hiperativa (BH) - urgencia, frequencia, incontinencia de urgencia',
      'Alternativa para intolerantes a antimuscarinicoss',
      'Combinacao com solifenacina',
    ],
    mecanismoAcao: 'Agonista seletivo do receptor beta-3 adrenergico no detrusor. Promove relaxamento vesical durante enchimento sem efeitos antimuscarinicoss (sem boca seca, constipacao, deficit cognitivo).',
    posologias: [
      {
        indicacao: 'Bexiga hiperativa',
        adultos: {
          dose: 'Iniciar 25mg; aumentar para 50mg se tolerado',
          frequencia: '1x/dia',
          doseMaxima: '50mg/dia',
          observacoes: 'Em IR/IH moderada: max 25mg.',
        },
      },
    ],
    contraindicacoes: [
      'HAS nao controlada grave (PAS >= 180 ou PAD >= 110)',
      'IR grave (ClCr <15) ou dialise',
      'IH grave (Child-Pugh C)',
    ],
    precaucoes: [
      'Pode elevar PA - monitorar em hipertensos',
      'Retencao urinaria possivel em obstrucao saida',
      'Cautela com inibidores CYP3A4 fortes',
    ],
    efeitosAdversos: {
      comuns: ['ITU', 'Cefaleia', 'Nasofaringite', 'HAS', 'Taquicardia'],
      graves: ['Retencao urinaria', 'Angioedema', 'FA (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Digoxina',
        gravidade: 'moderada',
        efeito: 'Aumento niveis digoxina',
        conduta: 'Monitorar niveis digoxina; iniciar dose baixa',
      },
      {
        medicamento: 'Inibidores CYP3A4 fortes',
        gravidade: 'moderada',
        efeito: 'Aumento niveis mirabegrona',
        conduta: 'Limitar a 25mg/dia',
      },
      {
        medicamento: 'Antimuscarinicoss',
        gravidade: 'leve',
        efeito: 'Efeito sinergico (combinacao aprovada com solifenacina)',
        conduta: 'Combinacao eficaz; monitorar retencao urinaria',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '15-30', ajuste: 'Max 25mg/dia' },
      { tfg: '<15', ajuste: 'Nao recomendado' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretado no leite em animais; evitar' },
    monitorizacao: ['PA periodica', 'Sintomas de retencao urinaria', 'Eficacia (diario miccional)'],
    orientacoesPaciente: [
      'Pode ser tomado com ou sem alimentos',
      'Engolir inteiro, nao mastigar',
      'Monitorar PA se hipertenso',
      'Sem efeitos antimuscarinicoss (boca seca rara)',
    ],
    consideracoesEspeciais: {
      idosos: 'Boa opcao - sem efeitos cognitivos antimuscarinicoss',
      hepatopatas: 'Max 25mg em IH moderada; evitar IH grave',
    },
    doencasRelacionadas: ['bexiga-hiperativa', 'incontinencia-urgencia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['bexiga-hiperativa', 'mirabegrona', 'beta-3', 'OAB', 'incontinencia'],
  },

  {
    id: 'vibegron',
    nomeGenerico: 'Vibegron',
    nomesComerciais: ['Gemtesa'],
    atcCode: 'G04BD13',
    rxNormCui: '2468232',
    drugBankId: 'DB16137',
    snomedCT: '1179298008',
    casNumber: '1190048-82-2',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Bexiga hiperativa com urgencia, frequencia e incontinencia de urgencia',
      'Alternativa a mirabegrona e antimuscarinicoss',
    ],
    mecanismoAcao: 'Agonista beta-3 adrenergico de segunda geracao. Relaxa detrusor durante fase de enchimento. Menor interacao com CYP450 que mirabegrona.',
    posologias: [
      {
        indicacao: 'Bexiga hiperativa',
        adultos: {
          dose: '75mg',
          frequencia: '1x/dia',
          observacoes: 'Dose unica sem necessidade titulacao.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'Retencao urinaria',
      'Retencao gastrica',
    ],
    precaucoes: [
      'Menor efeito em PA que mirabegrona',
      'Risco retencao urinaria em obstrucao',
      'Dados limitados em IR/IH grave',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'ITU', 'Nasofaringite', 'Diarreia'],
      graves: ['Retencao urinaria', 'Reacoes hipersensibilidade'],
    },
    interacoes: [
      {
        medicamento: 'Digoxina',
        gravidade: 'moderada',
        efeito: 'Aumento niveis digoxina',
        conduta: 'Monitorar niveis',
      },
      {
        medicamento: 'Substratos CYP3A4',
        gravidade: 'leve',
        efeito: 'Menor interacao que mirabegrona',
        conduta: 'Monitorar se necessario',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>15', ajuste: 'Sem ajuste' },
      { tfg: '<15', ajuste: 'Dados limitados; cautela' },
    ],
    gestacao: 'N',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['Diario miccional', 'Sintomas OAB', 'PA'],
    orientacoesPaciente: [
      'Pode esmagar e misturar com alimentos se dificuldade deglutir',
      'Dose unica diaria sem titulacao',
      'Menos interacoes medicamentosas',
    ],
    doencasRelacionadas: ['bexiga-hiperativa', 'incontinencia-urgencia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['vibegron', 'beta-3', 'bexiga-hiperativa', 'OAB'],
  },

  // =============================================================================
  // ANTIMUSCARINICOSS (BEXIGA HIPERATIVA)
  // =============================================================================
  {
    id: 'solifenacina',
    nomeGenerico: 'Solifenacina',
    nomesComerciais: ['Vesicare', 'Vesitirim'],
    atcCode: 'G04BD08',
    rxNormCui: '350477',
    drugBankId: 'DB01591',
    snomedCT: '407314009',
    casNumber: '242478-37-1',
    classeTerapeutica: 'outros',
    subclasse: 'anticolinergico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Bexiga hiperativa',
      'Urgencia e frequencia urinaria',
      'Incontinencia de urgencia',
    ],
    mecanismoAcao: 'Antagonista competitivo dos receptores muscarinicoss M3 (predominante detrusor). Maior seletividade M3 vs M2 comparado a oxibutinina. Reduz contracoes involuntarias do detrusor.',
    posologias: [
      {
        indicacao: 'Bexiga hiperativa',
        adultos: {
          dose: 'Iniciar 5mg; aumentar para 10mg se necessario',
          frequencia: '1x/dia',
          doseMaxima: '5mg se IR moderada ou IH moderada ou uso inibidor CYP3A4',
        },
      },
    ],
    contraindicacoes: [
      'Retencao urinaria',
      'Glaucoma angulo fechado nao controlado',
      'Retencao gastrica',
      'Miastenia gravis',
      'IH grave',
      'IR grave com inibidor CYP3A4 forte',
    ],
    precaucoes: [
      'Efeitos antimuscarinicoss menos intensos que oxibutinina',
      'Prolongamento QT - evitar em QT longo',
      'Constipacao pode ser significativa',
      'Cautela em idosos (Beers)',
    ],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Constipacao', 'Visao borrada', 'Dispepsia'],
      graves: ['Retencao urinaria', 'Prolongamento QT', 'Angioedema', 'Confusao em idosos'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores CYP3A4 fortes (cetoconazol)',
        gravidade: 'moderada',
        efeito: 'Aumento niveis solifenacina',
        conduta: 'Max 5mg/dia',
      },
      {
        medicamento: 'Medicamentos que prolongam QT',
        gravidade: 'moderada',
        efeito: 'Risco arritmia',
        conduta: 'Monitorar ECG',
      },
      {
        medicamento: 'Outros antimuscarinicoss',
        gravidade: 'moderada',
        efeito: 'Potencializacao efeitos adversos',
        conduta: 'Evitar',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Max 5mg/dia' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excrecao desconhecida; evitar' },
    monitorizacao: ['Eficacia (diario miccional)', 'Residuo pos-miccional', 'Funcao cognitiva em idosos'],
    orientacoesPaciente: [
      'Pode tomar com ou sem alimentos',
      'Beber agua suficiente',
      'Constipacao e boca seca sao comuns',
      'Evitar calor excessivo (reduz sudorese)',
    ],
    consideracoesEspeciais: {
      idosos: 'Cautela - lista Beers; menor risco cognitivo que oxibutinina',
      hepatopatas: 'Max 5mg em IH moderada; evitar IH grave',
    },
    doencasRelacionadas: ['bexiga-hiperativa', 'incontinencia-urgencia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['solifenacina', 'antimuscarinico', 'bexiga-hiperativa', 'OAB', 'M3'],
  },

  {
    id: 'tolterodina-novo',
    nomeGenerico: 'Tolterodina',
    nomesComerciais: ['Detrusitol', 'Detrol'],
    atcCode: 'G04BD07',
    rxNormCui: '61276',
    drugBankId: 'DB01036',
    snomedCT: '372532001',
    casNumber: '124937-51-5',
    classeTerapeutica: 'outros',
    subclasse: 'anticolinergico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
      { forma: 'capsula_xr', concentracao: '2mg', disponivelSUS: false },
      { forma: 'capsula_xr', concentracao: '4mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Bexiga hiperativa',
      'Urgencia urinaria',
      'Incontinencia de urgencia',
    ],
    mecanismoAcao: 'Antagonista muscarinico nao seletivo (M1-M5) com seletividade funcional para bexiga. Metabolito ativo (5-hidroximetil tolterodina) equipotente.',
    posologias: [
      {
        indicacao: 'Bexiga hiperativa',
        adultos: {
          dose: 'Liberacao imediata: 2mg 2x/dia; XR: 4mg 1x/dia',
          frequencia: 'IR: 2x/dia; XR: 1x/dia',
          doseMaxima: 'IR: 1mg 2x/dia em IR/IH ou com inibidor CYP3A4',
          observacoes: 'XR preferido - menor incidencia boca seca.',
        },
      },
    ],
    contraindicacoes: [
      'Retencao urinaria',
      'Retencao gastrica',
      'Glaucoma angulo fechado nao controlado',
      'Hipersensibilidade a fesoterodina (pro-farmaco)',
    ],
    precaucoes: [
      'Metabolizado por CYP2D6 e CYP3A4',
      'Metabolizadores lentos CYP2D6 - niveis elevados',
      'QT - evitar em QT longo',
    ],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Cefaleia', 'Constipacao', 'Dor abdominal'],
      graves: ['Retencao urinaria', 'Confusao', 'Alucinacoes', 'Prolongamento QT'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores CYP3A4 fortes',
        gravidade: 'moderada',
        efeito: 'Aumento niveis',
        conduta: 'Max 2mg/dia (IR) ou 2mg XR',
      },
      {
        medicamento: 'Fluoxetina (inibidor CYP2D6)',
        gravidade: 'moderada',
        efeito: 'Aumento niveis tolterodina',
        conduta: 'Considerar reducao dose',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Max 2mg/dia (IR) ou 2mg XR' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretado no leite em animais; evitar' },
    monitorizacao: ['Diario miccional', 'Residuo pos-miccional', 'Funcao cognitiva'],
    orientacoesPaciente: [
      'XR engolir inteiro',
      'Boca seca: beber agua, balas sem acucar',
      'Evitar atividades em calor intenso',
    ],
    consideracoesEspeciais: {
      idosos: 'Lista Beers - usar com cautela; XR pode ter menos efeitos centrais',
    },
    doencasRelacionadas: ['bexiga-hiperativa', 'incontinencia-urgencia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['tolterodina', 'antimuscarinico', 'bexiga-hiperativa', 'OAB'],
  },

  {
    id: 'oxibutinina-novo',
    nomeGenerico: 'Oxibutinina',
    nomesComerciais: ['Retemic', 'Incontinol', 'Ditropan'],
    atcCode: 'G04BD04',
    rxNormCui: '7815',
    drugBankId: 'DB01062',
    snomedCT: '372715005',
    casNumber: '5633-20-5',
    classeTerapeutica: 'outros',
    subclasse: 'anticolinergico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '1mg/ml', disponivelSUS: true },
      { forma: 'comprimido_xr', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '10mg', disponivelSUS: false },
      { forma: 'adesivo', concentracao: '3,9mg/dia', disponivelSUS: false },
      { forma: 'gel_topico', concentracao: '10%', disponivelSUS: false },
    ],
    indicacoes: [
      'Bexiga hiperativa',
      'Incontinencia urinaria de urgencia',
      'Enurese noturna (criancas >5 anos)',
      'Bexiga neurogenica',
    ],
    mecanismoAcao: 'Antagonista muscarinico com acao antiespasmodica direta no musculo liso. Metabolito ativo (N-desetil-oxibutinina) responsavel por muitos efeitos adversos centrais.',
    posologias: [
      {
        indicacao: 'Bexiga hiperativa',
        adultos: {
          dose: 'IR: 5mg 2-3x/dia; XR: 5-10mg 1x/dia',
          frequencia: 'IR: 2-3x/dia; XR: 1x/dia',
          doseMaxima: '20mg/dia (IR); 30mg/dia (XR)',
        },
        pediatrico: {
          dose: '0,1-0,2mg/kg/dose',
          frequencia: '2-3x/dia',
          idadeMinima: '5 anos',
          doseMaxima: '5mg/dose',
        },
        idosos: {
          dose: 'Iniciar 2,5mg 2-3x/dia',
          observacoes: 'Titular lentamente; alto risco efeitos cognitivos.',
        },
      },
    ],
    contraindicacoes: [
      'Glaucoma angulo fechado nao tratado',
      'Obstrucao intestinal/urinaria',
      'Ileo paralitico',
      'Atonia gastrica',
      'Miastenia gravis',
    ],
    precaucoes: [
      'Efeitos antimuscarinicoss pronunciados',
      'Alto risco deficit cognitivo em idosos (EVITAR se possivel)',
      'Calor - reducao sudorese',
      'Formulacoes topicas tem menos efeitos sistemicos',
    ],
    efeitosAdversos: {
      comuns: ['Boca seca (frequente)', 'Constipacao', 'Sonolencia', 'Visao borrada', 'Tontura'],
      graves: ['Retencao urinaria', 'Confusao mental', 'Alucinacoes', 'Taquicardia', 'Hipertermia'],
    },
    interacoes: [
      {
        medicamento: 'Outros antimuscarinicoss',
        gravidade: 'moderada',
        efeito: 'Potencializacao toxicidade',
        conduta: 'Evitar',
      },
      {
        medicamento: 'Depressores SNC',
        gravidade: 'moderada',
        efeito: 'Sedacao aditiva',
        conduta: 'Reduzir doses',
      },
      {
        medicamento: 'Inibidores CYP3A4',
        gravidade: 'leve',
        efeito: 'Aumento niveis',
        conduta: 'Monitorar',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste especifico; usar com cautela' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Pode reduzir lactacao; excrecao provavel' },
    monitorizacao: ['Funcao cognitiva (especialmente idosos)', 'Residuo pos-miccional', 'Hidratacao'],
    orientacoesPaciente: [
      'Boca seca intensa e comum',
      'Evitar calor extremo',
      'Gel topico: aplicar em abdome/coxas/bracos (rotacionar)',
      'Adesivo: trocar 2x/semana',
    ],
    consideracoesEspeciais: {
      idosos: 'EVITAR se possivel (Beers criteria) - alto risco delirium e demencia. Preferir mirabegrona ou topicos.',
      pediatrico: 'Aprovado >5 anos para enurese/bexiga neurogenica',
    },
    doencasRelacionadas: ['bexiga-hiperativa', 'incontinencia-urgencia', 'enurese', 'bexiga-neurogenica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['oxibutinina', 'antimuscarinico', 'bexiga-hiperativa', 'enurese', 'RENAME'],
  },

  {
    id: 'darifenacina',
    nomeGenerico: 'Darifenacina',
    nomesComerciais: ['Enablex', 'Emselex'],
    atcCode: 'G04BD10',
    rxNormCui: '332428',
    drugBankId: 'DB00496',
    snomedCT: '407312008',
    casNumber: '133099-04-4',
    classeTerapeutica: 'outros',
    subclasse: 'anticolinergico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_xr', concentracao: '7,5mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '15mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Bexiga hiperativa com urgencia e incontinencia',
    ],
    mecanismoAcao: 'Antagonista muscarinico altamente seletivo para M3 (9x mais que M1, M5). Menor efeito em receptores M1 (cognicao) e M2 (cardiaco) teoricamente.',
    posologias: [
      {
        indicacao: 'Bexiga hiperativa',
        adultos: {
          dose: 'Iniciar 7,5mg; aumentar para 15mg se necessario',
          frequencia: '1x/dia',
          observacoes: 'Max 7,5mg se IH moderada ou inibidor CYP3A4.',
        },
      },
    ],
    contraindicacoes: [
      'Retencao urinaria',
      'Retencao gastrica',
      'Glaucoma angulo fechado nao controlado',
      'IH grave',
    ],
    precaucoes: [
      'Constipacao pode ser significativa',
      'Metabolizado por CYP3A4 e CYP2D6',
      'Menor efeito cognitivo teorico (seletividade M3)',
    ],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Constipacao (pode ser grave)', 'Dispepsia', 'Dor abdominal'],
      graves: ['Retencao urinaria', 'Obstrucao intestinal', 'Angioedema'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores CYP3A4 fortes',
        gravidade: 'moderada',
        efeito: 'Aumento niveis',
        conduta: 'Max 7,5mg/dia',
      },
      {
        medicamento: 'Inibidores CYP2D6 potentes',
        gravidade: 'moderada',
        efeito: 'Aumento niveis',
        conduta: 'Monitorar; considerar dose menor',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['Habito intestinal (constipacao)', 'Diario miccional', 'Residuo pos-miccional'],
    orientacoesPaciente: [
      'Engolir inteiro - nao mastigar',
      'Constipacao frequente - aumentar fibras/liquidos',
      'Pode tomar com ou sem alimentos',
    ],
    consideracoesEspeciais: {
      idosos: 'Menor efeito cognitivo teorico vs oxibutinina; ainda cautela (Beers)',
      hepatopatas: 'Max 7,5mg em IH moderada; evitar IH grave',
    },
    doencasRelacionadas: ['bexiga-hiperativa', 'incontinencia-urgencia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['darifenacina', 'antimuscarinico', 'M3-seletivo', 'bexiga-hiperativa'],
  },

  {
    id: 'fesoterodina',
    nomeGenerico: 'Fesoterodina',
    nomesComerciais: ['Toviaz'],
    atcCode: 'G04BD11',
    rxNormCui: '604425',
    drugBankId: 'DB06702',
    snomedCT: '441646008',
    casNumber: '286930-03-8',
    classeTerapeutica: 'outros',
    subclasse: 'anticolinergico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_xr', concentracao: '4mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '8mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Bexiga hiperativa com urgencia e incontinencia de urgencia',
    ],
    mecanismoAcao: 'Pro-farmaco rapidamente hidrolisado em 5-hidroximetil tolterodina (metabolito ativo da tolterodina) por esterases plasmaticas. Nao depende de CYP2D6 para ativacao (diferente de tolterodina).',
    posologias: [
      {
        indicacao: 'Bexiga hiperativa',
        adultos: {
          dose: 'Iniciar 4mg; aumentar para 8mg se necessario',
          frequencia: '1x/dia',
          doseMaxima: '4mg em IR grave (ClCr <30) ou com inibidor CYP3A4 forte',
        },
      },
    ],
    contraindicacoes: [
      'Retencao urinaria',
      'Retencao gastrica',
      'Glaucoma angulo fechado nao controlado',
      'Miastenia gravis',
      'IH grave',
    ],
    precaucoes: [
      'Metabolito ativo nao depende CYP2D6 (vantagem sobre tolterodina)',
      'Prolongamento QT possivel',
      'Angioedema relatado',
    ],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Constipacao', 'Cefaleia', 'Olho seco'],
      graves: ['Retencao urinaria', 'Angioedema', 'Prolongamento QT', 'Confusao'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores CYP3A4 fortes',
        gravidade: 'moderada',
        efeito: 'Aumento niveis metabolito ativo',
        conduta: 'Max 4mg/dia',
      },
      {
        medicamento: 'Medicamentos que prolongam QT',
        gravidade: 'moderada',
        efeito: 'Risco arritmia',
        conduta: 'Cautela; monitorar',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Max 4mg/dia' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['Diario miccional', 'Residuo pos-miccional', 'ECG se fatores risco'],
    orientacoesPaciente: [
      'Engolir inteiro',
      'Pode tomar com ou sem alimentos',
      'Evitar calor intenso',
    ],
    consideracoesEspeciais: {
      idosos: 'Cautela (Beers); nao depende CYP2D6 - farmacocinetica mais previsivel',
      hepatopatas: 'Evitar IH grave',
    },
    doencasRelacionadas: ['bexiga-hiperativa', 'incontinencia-urgencia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['fesoterodina', 'antimuscarinico', 'bexiga-hiperativa', 'pro-farmaco'],
  },
];
