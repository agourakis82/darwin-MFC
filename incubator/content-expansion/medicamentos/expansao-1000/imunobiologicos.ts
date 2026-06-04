/**
 * IMUNOBIOLOGICOS - DARWIN-MFC EXPANSAO 1000
 * ==========================================
 * Anticorpos monoclonais e proteinas de fusao
 *
 * Referencias:
 * - FDA Prescribing Information
 * - EMA Summary of Product Characteristics
 * - ACR/EULAR Guidelines for Rheumatoid Arthritis
 * - AAD Guidelines for Psoriasis
 * - ACG Guidelines for IBD
 * - PharmGKB Pharmacogenomics Database
 */

import { Medicamento } from '@/lib/types/medicamento';

export const imunobiologicos: Partial<Medicamento>[] = [
  // ============================================================================
  // TNF INHIBITORS
  // ============================================================================
  {
    id: 'certolizumabe-pegol',
    nomeGenerico: 'Certolizumabe Pegol',
    nomesComerciais: ['Cimzia'],
    atcCode: 'L04AB05',
    rxNormCui: '827752',
    drugBankId: 'DB08904',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_tnf',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '200mg/ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '400mg/2ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Artrite reumatoide moderada a grave',
      'Artrite psoriasica',
      'Espondilite anquilosante',
      'Espondiloartrite axial nao radiografica',
      'Doenca de Crohn moderada a grave',
      'Psoriase em placas moderada a grave'
    ],
    mecanismoAcao: 'Fragmento Fab\' de anticorpo monoclonal humanizado anti-TNF-alfa conjugado a polietilenoglicol (PEG). Ausencia de porcao Fc resulta em: (1) nao atravessa placenta significativamente - PREFERENCIAL EM GESTANTES; (2) nao ativa complemento ou ADCC; (3) PEGilacao aumenta meia-vida. Neutraliza TNF-alfa soluvel e ligado a membrana.',
    posologias: [
      {
        indicacao: 'Artrite reumatoide/Artrite psoriasica',
        adultos: { dose: '400mg semanas 0, 2, 4 (inducao), depois 200mg a cada 2 semanas ou 400mg 1x/mes', frequencia: 'Ver esquema', observacoes: 'Pode ser usado com ou sem metotrexato' }
      },
      {
        indicacao: 'Espondilite anquilosante',
        adultos: { dose: '400mg semanas 0, 2, 4, depois 200mg a cada 2 semanas ou 400mg a cada 4 semanas', frequencia: 'Ver esquema' }
      },
      {
        indicacao: 'Doenca de Crohn',
        adultos: { dose: '400mg semanas 0, 2, 4, depois 400mg a cada 4 semanas', frequencia: 'Ver esquema', observacoes: 'Resposta avaliada em 12 semanas' }
      },
      {
        indicacao: 'Psoriase em placas',
        adultos: { dose: '400mg a cada 2 semanas', frequencia: 'Quinzenal', observacoes: 'Para pacientes >90kg; pacientes <=90kg: 400mg semanas 0,2,4 depois 200mg a cada 2 semanas' }
      }
    ],
    contraindicacoes: [
      'Tuberculose ativa ou latente nao tratada',
      'Infeccoes graves ativas (sepse, abscessos)',
      'Insuficiencia cardiaca moderada a grave (NYHA III-IV)',
      'Hipersensibilidade a certolizumabe ou excipientes'
    ],
    precaucoes: [
      'BLACK BOX: Infeccoes graves incluindo TB, infeccoes fungicas invasivas, infeccoes oportunistas',
      'BLACK BOX: Risco aumentado de linfoma e outras malignidades',
      'Rastrear TB antes do inicio (PPD ou IGRA + RX torax)',
      'Rastrear hepatite B antes do inicio',
      'Monitorar sinais de infeccao durante tratamento',
      'Evitar vacinas vivas durante tratamento',
      'Risco de reativacao de hepatite B',
      'Pode induzir ou exacerbar doencas desmielinizantes',
      'Monitorar para desenvolvimento de anticorpos antinucleares e lupus-like'
    ],
    efeitosAdversos: {
      comuns: ['Infeccoes respiratorias superiores', 'Reacoes no local de injecao', 'Cefaleia', 'Rash cutaneo', 'Artralgia'],
      graves: ['Tuberculose reativada', 'Infeccoes oportunistas', 'Linfoma', 'Lupus-like syndrome', 'Insuficiencia cardiaca', 'Doencas desmielinizantes', 'Citopenias']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas (BCG, febre amarela, MMR)', gravidade: 'contraindicada', efeito: 'Risco de infeccao disseminada pela vacina', conduta: 'Contraindicado - aguardar pelo menos 5 meses apos ultima dose' },
      { medicamento: 'Anakinra', gravidade: 'grave', efeito: 'Aumento do risco de infeccoes graves e neutropenia', conduta: 'Nao associar' },
      { medicamento: 'Abatacepte', gravidade: 'grave', efeito: 'Risco aumentado de infeccoes graves', conduta: 'Nao associar' },
      { medicamento: 'Metotrexato', gravidade: 'leve', efeito: 'Nao ha interacao significativa', conduta: 'Associacao comum e segura' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'NAO ATRAVESSA PLACENTA significativamente - opcao PREFERENCIAL para gestantes. Excrecao minima no leite.' },
    monitorizacao: ['PPD/IGRA antes de iniciar e anualmente', 'Sorologias hepatite B/C', 'Hemograma', 'Avaliacao de infeccoes a cada consulta'],
    doencasRelacionadas: ['artrite-reumatoide', 'doenca-crohn', 'psoriase'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-tnf', 'biologico', 'reumatologia', 'gastroenterologia', 'dermatologia', 'gestacao']
  },
  {
    id: 'golimumabe',
    nomeGenerico: 'Golimumabe',
    nomesComerciais: ['Simponi', 'Simponi Aria'],
    atcCode: 'L04AB06',
    rxNormCui: '824868',
    drugBankId: 'DB06674',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_tnf',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '50mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '100mg/ml', disponivelSUS: false },
      { forma: 'injetavel_iv', concentracao: '50mg/4ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Artrite reumatoide moderada a grave (com MTX)',
      'Artrite psoriasica',
      'Espondilite anquilosante',
      'Espondiloartrite axial nao radiografica',
      'Colite ulcerativa moderada a grave',
      'Artrite idiopatica juvenil poliarticular (>=2 anos)'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG1-kappa TOTALMENTE HUMANO anti-TNF-alfa. Liga-se com alta afinidade a formas soluvel e transmembrana de TNF-alfa. Por ser totalmente humano, menor imunogenicidade que anticorpos quimericos. Bloqueia interacao TNF-receptor e inibe cascata inflamatoria.',
    posologias: [
      {
        indicacao: 'AR/Artrite psoriasica/EA (SC)',
        adultos: { dose: '50mg', frequencia: 'SC 1x/mes', observacoes: 'Associar MTX para AR' }
      },
      {
        indicacao: 'AR (IV - Simponi Aria)',
        adultos: { dose: '2mg/kg', frequencia: 'IV semanas 0, 4, depois a cada 8 semanas', observacoes: 'Infusao em 30 minutos' }
      },
      {
        indicacao: 'Colite ulcerativa',
        adultos: { dose: '200mg semana 0, 100mg semana 2, depois 100mg a cada 4 semanas', frequencia: 'Ver esquema', observacoes: 'Pacientes >80kg podem necessitar 100mg a cada 4 semanas para manutencao de resposta' }
      }
    ],
    contraindicacoes: [
      'Tuberculose ativa',
      'Infeccoes graves ativas',
      'Insuficiencia cardiaca NYHA III-IV',
      'Hipersensibilidade a golimumabe'
    ],
    precaucoes: [
      'BLACK BOX: Infeccoes graves - TB, fungicas invasivas, bacterianas, virais, oportunistas',
      'BLACK BOX: Linfoma e outras malignidades (especialmente em criancas/adolescentes)',
      'Triagem obrigatoria para TB latente antes do inicio',
      'Triagem para hepatite B (reativacao pode ocorrer)',
      'Nao iniciar durante infeccao ativa',
      'Descontinuar se infeccao seria se desenvolver',
      'Pode exacerbar ou induzir ICC',
      'Pode causar ou exacerbar doencas desmielinizantes'
    ],
    efeitosAdversos: {
      comuns: ['Infeccoes respiratorias superiores', 'Reacoes no local da injecao (SC)', 'Elevacao de transaminases', 'Hipertensao'],
      graves: ['Tuberculose', 'Infeccoes invasivas fungicas', 'Linfoma hepatoesplenico de celulas T', 'Insuficiencia cardiaca descompensada', 'Lupus-like', 'Doenca desmielinizante', 'Citopenias']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'contraindicada', efeito: 'Risco de infeccao pelo agente vacinal', conduta: 'Evitar; atualizar vacinas antes de iniciar' },
      { medicamento: 'Anakinra', gravidade: 'grave', efeito: 'Infeccoes graves e neutropenia', conduta: 'Nao associar' },
      { medicamento: 'Abatacepte', gravidade: 'grave', efeito: 'Aumento de infeccoes sem beneficio adicional', conduta: 'Nao associar' },
      { medicamento: 'Tocilizumabe', gravidade: 'grave', efeito: 'Aumento de imunossupressao', conduta: 'Nao associar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Excrecao minima no leite; absorvido minimamente pelo TGI do lactente' },
    monitorizacao: ['TB screening antes e durante tratamento', 'Hepatite B/C screening', 'Hemograma periodico', 'Funcao hepatica'],
    doencasRelacionadas: ['artrite-reumatoide', 'colite-ulcerativa', 'espondilite-anquilosante'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-tnf', 'biologico', 'humano', 'reumatologia', 'gastroenterologia']
  },

  // ============================================================================
  // IL-17 INHIBITORS
  // ============================================================================
  {
    id: 'secuquinumabe',
    nomeGenerico: 'Secuquinumabe',
    nomesComerciais: ['Cosentyx'],
    atcCode: 'L04AC10',
    rxNormCui: '1545994',
    drugBankId: 'DB09029',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il17',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '150mg/ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '300mg/2ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Psoriase em placas moderada a grave',
      'Artrite psoriasica',
      'Espondilite anquilosante',
      'Espondiloartrite axial nao radiografica',
      'Hidradenite supurativa moderada a grave'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG1-kappa totalmente humano que se liga SELETIVAMENTE a IL-17A. IL-17A e citocina pro-inflamatoria central na patogenese da psoriase e espondiloartrites. Bloqueio de IL-17A reduz inflamacao, hiperproliferacao de queratinócitos e angiogenese.',
    posologias: [
      {
        indicacao: 'Psoriase em placas',
        adultos: { dose: '300mg', frequencia: 'SC semanas 0,1,2,3,4 (inducao), depois 300mg a cada 4 semanas', observacoes: 'Alguns pacientes podem necessitar de 300mg a cada 2 semanas' }
      },
      {
        indicacao: 'Artrite psoriasica (com psoriase coexistente)',
        adultos: { dose: '300mg', frequencia: 'SC semanas 0,1,2,3,4, depois 300mg a cada 4 semanas', observacoes: 'Com ou sem MTX' }
      },
      {
        indicacao: 'Artrite psoriasica (sem psoriase cutanea)',
        adultos: { dose: '150mg', frequencia: 'SC semanas 0,1,2,3,4, depois 150mg a cada 4 semanas', observacoes: 'Pode aumentar para 300mg se resposta inadequada' }
      },
      {
        indicacao: 'Espondilite anquilosante',
        adultos: { dose: '150mg', frequencia: 'SC semanas 0,1,2,3,4, depois 150mg a cada 4 semanas', observacoes: 'Pode aumentar para 300mg' }
      },
      {
        indicacao: 'Hidradenite supurativa',
        adultos: { dose: '300mg', frequencia: 'SC semanas 0,1,2,3,4, depois 300mg a cada 2 semanas', observacoes: 'Avaliar resposta em 16 semanas' }
      }
    ],
    contraindicacoes: [
      'Infeccoes ativas clinicamente relevantes (TB ativa)',
      'Hipersensibilidade a secuquinumabe',
      'Doenca de Crohn ativa (pode exacerbar)'
    ],
    precaucoes: [
      'Pode exacerbar doenca de Crohn - monitorar sintomas GI',
      'Rastrear TB antes de iniciar',
      'Infeccoes - monitorar sinais durante tratamento',
      'Candidíase mucocutanea mais comum (tratar e continuar se leve)',
      'Reacoes de hipersensibilidade podem ocorrer',
      'Evitar vacinas vivas durante tratamento',
      'Neutropenia raramente relatada'
    ],
    efeitosAdversos: {
      comuns: ['Nasofaringite', 'Infeccoes respiratorias superiores', 'Candidíase oral/esofagica', 'Diarreia', 'Cefaleia'],
      graves: ['Exacerbacao de doenca de Crohn', 'Infeccoes graves', 'Reacoes anafilaticas', 'Neutropenia']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco de infeccao pela vacina', conduta: 'Evitar durante tratamento' },
      { medicamento: 'Substratos CYP450', gravidade: 'leve', efeito: 'IL-17 pode modular CYP450; normalizacao pode afetar metabolismo', conduta: 'Monitorar farmacos com janela terapeutica estreita' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados limitados; excrecao no leite desconhecida - avaliar risco/beneficio' },
    monitorizacao: ['TB screening antes de iniciar', 'Sinais de infeccao', 'Sintomas de doenca inflamatoria intestinal'],
    doencasRelacionadas: ['psoriase', 'artrite-psoriasica', 'espondilite-anquilosante'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-il17', 'biologico', 'dermatologia', 'reumatologia']
  },
  {
    id: 'ixequizumabe',
    nomeGenerico: 'Ixequizumabe',
    nomesComerciais: ['Taltz'],
    atcCode: 'L04AC13',
    rxNormCui: '1721075',
    drugBankId: 'DB11569',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il17',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '80mg/ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Psoriase em placas moderada a grave',
      'Artrite psoriasica',
      'Espondilite anquilosante',
      'Espondiloartrite axial nao radiografica'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG4 humanizado que se liga seletivamente a IL-17A. Alta afinidade de ligacao resulta em neutralizacao potente da IL-17A, citocina crucial na inflamacao e hiperproliferacao queratinocítica da psoriase. IgG4 minimiza funcoes efetoras Fc-dependentes.',
    posologias: [
      {
        indicacao: 'Psoriase em placas',
        adultos: { dose: '160mg semana 0, depois 80mg semanas 2,4,6,8,10,12 (inducao), depois 80mg a cada 4 semanas', frequencia: 'Ver esquema', observacoes: 'PASI 90 em >70% dos pacientes em estudos' }
      },
      {
        indicacao: 'Artrite psoriasica',
        adultos: { dose: '160mg semana 0, depois 80mg a cada 4 semanas', frequencia: 'Ver esquema', observacoes: 'Se psoriase cutanea coexistente: regime de psoriase' }
      },
      {
        indicacao: 'Espondilite anquilosante/EA axial nr',
        adultos: { dose: '80mg ou 160mg semana 0, depois 80mg a cada 4 semanas', frequencia: 'Ver esquema' }
      }
    ],
    contraindicacoes: [
      'Infeccao ativa clinicamente importante',
      'Hipersensibilidade grave a ixequizumabe',
      'Doenca de Crohn ativa'
    ],
    precaucoes: [
      'Pode precipitar ou exacerbar doenca de Crohn - EVITAR se historia de DII',
      'TB - rastrear antes de iniciar',
      'Infeccoes - neutropenia pode ocorrer',
      'Candidíase frequente (oral, vulvovaginal)',
      'Reacoes no local de injecao comuns'
    ],
    efeitosAdversos: {
      comuns: ['Reacoes no local de injecao', 'Infeccoes respiratorias superiores', 'Nasofaringite', 'Candidíase', 'Nausea'],
      graves: ['Doenca inflamatoria intestinal nova ou exacerbada', 'Infeccoes serias', 'Hipersensibilidade', 'Neutropenia']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Infeccao pela vacina', conduta: 'Contraindicado durante tratamento' },
      { medicamento: 'Substratos CYP450', gravidade: 'leve', efeito: 'Citocinas inflamatorias modulam CYP450', conduta: 'Monitorar farmacos com indice terapeutico estreito' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; IgG excretada no leite' },
    monitorizacao: ['TB antes de iniciar', 'Sintomas de DII', 'Infeccoes', 'Neutrofilos periodicamente'],
    doencasRelacionadas: ['psoriase', 'artrite-psoriasica', 'espondilite-anquilosante'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-il17', 'biologico', 'dermatologia', 'reumatologia']
  },
  {
    id: 'brodalumabe',
    nomeGenerico: 'Brodalumabe',
    nomesComerciais: ['Siliq', 'Kyntheum'],
    atcCode: 'L04AC12',
    rxNormCui: '1876372',
    drugBankId: 'DB12159',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il17',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '210mg/1,5ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Psoriase em placas moderada a grave (quando outros tratamentos falharam ou sao contraindicados)'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG2 totalmente humano que se liga ao RECEPTOR de IL-17 (IL-17RA), bloqueando sinalizacao de IL-17A, IL-17F, IL-17C, IL-17E e IL-17A/F heterodímero. MECANISMO UNICO entre anti-IL-17: bloqueia receptor vs. ligante. Bloqueio mais amplo da via IL-17.',
    posologias: [
      {
        indicacao: 'Psoriase em placas',
        adultos: { dose: '210mg', frequencia: 'SC semanas 0, 1, 2 (inducao), depois 210mg a cada 2 semanas', observacoes: 'Se resposta inadequada apos 12-16 semanas, considerar descontinuacao' }
      }
    ],
    contraindicacoes: [
      'Doenca de Crohn ativa',
      'Hipersensibilidade ao brodalumabe',
      'Infeccao ativa clinicamente significativa'
    ],
    precaucoes: [
      'BLACK BOX: Comportamento suicida e ideacao - avaliar risco antes e durante tratamento',
      'REMS (programa de mitigacao de risco) necessario nos EUA',
      'Descontinuar se sintomas psiquiatricos novos ou agravamento',
      'Pode exacerbar ou causar DII',
      'TB - rastrear antes de iniciar',
      'Candidíase mucocutanea comum'
    ],
    efeitosAdversos: {
      comuns: ['Artralgia', 'Cefaleia', 'Fadiga', 'Diarreia', 'Orofaringite', 'Candidíase'],
      graves: ['Ideacao suicida', 'Comportamento suicida', 'Depressao', 'Doenca de Crohn', 'Infeccoes serias', 'Neutropenia']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'contraindicada', efeito: 'Risco de doenca vacinal', conduta: 'Nao administrar durante tratamento' },
      { medicamento: 'Substratos CYP450', gravidade: 'leve', efeito: 'Normalizacao de citocinas pode afetar metabolismo', conduta: 'Monitorar varfarina, ciclosporina' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados humanos insuficientes' },
    monitorizacao: ['Avaliacao psiquiatrica antes e durante', 'TB screening', 'Sintomas GI', 'Infeccoes'],
    doencasRelacionadas: ['psoriase'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-il17r', 'biologico', 'dermatologia', 'black-box-suicidio']
  },
  {
    id: 'bimequizumabe',
    nomeGenerico: 'Bimequizumabe',
    nomesComerciais: ['Bimzelx'],
    atcCode: 'L04AC21',
    rxNormCui: '2599459',
    drugBankId: 'DB16714',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il17',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '160mg/ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Psoriase em placas moderada a grave',
      'Artrite psoriasica',
      'Espondiloartrite axial (EA e nr-axSpA)'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG1 humanizado que neutraliza SELETIVAMENTE TANTO IL-17A QUANTO IL-17F - primeiro e unico inibidor dual. IL-17A e IL-17F sao citocinas pro-inflamatorias distintas com funcoes parcialmente redundantes. Inibicao dual pode proporcionar eficacia superior em relacao a inibidores de IL-17A isolada.',
    posologias: [
      {
        indicacao: 'Psoriase em placas',
        adultos: { dose: '320mg (2x160mg)', frequencia: 'SC semanas 0, 4, 8, 12, 16 (inducao), depois 320mg a cada 8 semanas', observacoes: 'Alguns pacientes podem necessitar 320mg a cada 4 semanas' }
      },
      {
        indicacao: 'Artrite psoriasica',
        adultos: { dose: '160mg', frequencia: 'SC a cada 4 semanas', observacoes: 'Pode aumentar para 320mg a cada 4 semanas em pacientes com psoriase cutanea coexistente' }
      },
      {
        indicacao: 'Espondiloartrite axial',
        adultos: { dose: '160mg', frequencia: 'SC a cada 4 semanas' }
      }
    ],
    contraindicacoes: [
      'Infeccao ativa clinicamente importante',
      'Hipersensibilidade ao bimequizumabe',
      'Tuberculose ativa'
    ],
    precaucoes: [
      'Candidíase oral muito comum (~16%) - tratar e geralmente pode continuar',
      'TB - rastrear antes de iniciar',
      'Pode exacerbar DII - monitorar sintomas',
      'Infeccoes - monitorar durante tratamento',
      'Reacoes no local da injecao'
    ],
    efeitosAdversos: {
      comuns: ['Candidíase oral (muito frequente)', 'Infeccoes respiratorias superiores', 'Cefaleia', 'Nasofaringite', 'Reacoes no local de injecao'],
      graves: ['Infeccoes serias', 'Doenca inflamatoria intestinal', 'Hipersensibilidade']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco de infeccao', conduta: 'Evitar durante tratamento' },
      { medicamento: 'Substratos CYP450', gravidade: 'leve', efeito: 'Normalizacao de citocinas pode alterar metabolismo', conduta: 'Monitorar farmacos metabolizados por CYP450' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes em humanos' },
    monitorizacao: ['TB screening', 'Sinais de infeccao', 'Sintomas de DII', 'Candidíase'],
    doencasRelacionadas: ['psoriase', 'artrite-psoriasica', 'espondilite-anquilosante'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-il17', 'dual-il17a-il17f', 'biologico', 'dermatologia', 'reumatologia']
  },

  // ============================================================================
  // IL-23 INHIBITORS
  // ============================================================================
  {
    id: 'risanquizumabe',
    nomeGenerico: 'Risanquizumabe',
    nomesComerciais: ['Skyrizi'],
    atcCode: 'L04AC18',
    rxNormCui: '2119710',
    drugBankId: 'DB14869',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il12_23',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '75mg/0,83ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '150mg/ml', disponivelSUS: false },
      { forma: 'injetavel_iv', concentracao: '600mg/10ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Psoriase em placas moderada a grave',
      'Artrite psoriasica',
      'Doenca de Crohn moderada a grave'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG1 humanizado que se liga seletivamente a subunidade p19 de IL-23. Diferente de ustequinumabe que bloqueia p40 (comum a IL-12 e IL-23), risanquizumabe bloqueia APENAS IL-23, preservando via IL-12 (importante para imunidade antitumoral e infecciosa). IL-23 promove diferenciacao Th17 e producao de IL-17.',
    posologias: [
      {
        indicacao: 'Psoriase em placas',
        adultos: { dose: '150mg (2x75mg)', frequencia: 'SC semanas 0, 4, depois a cada 12 semanas', observacoes: 'Resposta sustentada com intervalo de 12 semanas' }
      },
      {
        indicacao: 'Artrite psoriasica',
        adultos: { dose: '150mg', frequencia: 'SC semanas 0, 4, depois a cada 12 semanas', observacoes: 'Com ou sem MTX' }
      },
      {
        indicacao: 'Doenca de Crohn',
        adultos: { dose: '600mg IV semanas 0, 4, 8 (inducao), depois 180mg ou 360mg SC a cada 8 semanas', frequencia: 'Ver esquema', observacoes: 'Inducao IV obrigatoria' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade grave ao risanquizumabe',
      'Infeccoes ativas clinicamente importantes'
    ],
    precaucoes: [
      'TB - rastrear antes de iniciar',
      'Infeccoes - monitorar durante tratamento',
      'Evitar vacinas vivas',
      'Perfil de seguranca geralmente favoravel'
    ],
    efeitosAdversos: {
      comuns: ['Infeccoes respiratorias superiores', 'Cefaleia', 'Fadiga', 'Reacoes no local de injecao', 'Tinea'],
      graves: ['Infeccoes serias (raro)', 'Hipersensibilidade']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco de infeccao vacinal', conduta: 'Evitar' },
      { medicamento: 'Substratos CYP450', gravidade: 'leve', efeito: 'Sem interacoes clinicamente relevantes identificadas', conduta: 'Sem ajuste necessario' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados limitados; provavelmente excretado no leite' },
    monitorizacao: ['TB screening', 'Sinais de infeccao'],
    doencasRelacionadas: ['psoriase', 'artrite-psoriasica', 'doenca-crohn'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-il23-p19', 'biologico', 'dermatologia', 'reumatologia', 'gastroenterologia']
  },
  {
    id: 'tildrakizumabe',
    nomeGenerico: 'Tildrakizumabe',
    nomesComerciais: ['Ilumya', 'Ilumetri'],
    atcCode: 'L04AC17',
    rxNormCui: '2049101',
    drugBankId: 'DB12158',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il12_23',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '100mg/ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Psoriase em placas moderada a grave'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG1-kappa humanizado que se liga seletivamente a subunidade p19 de IL-23. Bloqueia IL-23 sem afetar IL-12 (que compartilha subunidade p40). IL-23 e essencial para sobrevivencia e expansao de celulas Th17, principais efetoras na psoriase.',
    posologias: [
      {
        indicacao: 'Psoriase em placas',
        adultos: { dose: '100mg', frequencia: 'SC semanas 0, 4, depois a cada 12 semanas', observacoes: 'Intervalo prolongado de 12 semanas e vantajoso para adesao' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao tildrakizumabe',
      'Infeccao ativa clinicamente relevante'
    ],
    precaucoes: [
      'TB - rastrear antes de iniciar',
      'Infeccoes - monitorar sinais e sintomas',
      'Reacoes de hipersensibilidade podem ocorrer',
      'Evitar vacinas vivas'
    ],
    efeitosAdversos: {
      comuns: ['Infeccoes respiratorias superiores', 'Reacoes no local de injecao', 'Diarreia'],
      graves: ['Infeccoes serias', 'Hipersensibilidade']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco teorico de infeccao', conduta: 'Evitar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['TB screening', 'Infeccoes'],
    doencasRelacionadas: ['psoriase'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-il23-p19', 'biologico', 'dermatologia']
  },
  {
    id: 'guselcumabe',
    nomeGenerico: 'Guselcumabe',
    nomesComerciais: ['Tremfya'],
    atcCode: 'L04AC16',
    rxNormCui: '1992156',
    drugBankId: 'DB12159',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il12_23',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '100mg/ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Psoriase em placas moderada a grave',
      'Artrite psoriasica'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG1-lambda totalmente humano que se liga com alta afinidade a subunidade p19 de IL-23. Bloqueio seletivo de IL-23 (vs. IL-12) preserva imunidade dependente de IL-12 enquanto suprime resposta Th17 patologica. Alta eficacia com perfil de seguranca favoravel.',
    posologias: [
      {
        indicacao: 'Psoriase em placas',
        adultos: { dose: '100mg', frequencia: 'SC semanas 0, 4, depois a cada 8 semanas', observacoes: 'Taxas de PASI 90 elevadas em estudos' }
      },
      {
        indicacao: 'Artrite psoriasica',
        adultos: { dose: '100mg', frequencia: 'SC semanas 0, 4, depois a cada 8 semanas', observacoes: 'Com ou sem MTX' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao guselcumabe',
      'Infeccao ativa clinicamente importante'
    ],
    precaucoes: [
      'TB - rastrear antes de iniciar',
      'Infeccoes - monitorar',
      'Evitar vacinas vivas',
      'Geralmente bem tolerado'
    ],
    efeitosAdversos: {
      comuns: ['Infeccoes respiratorias superiores', 'Cefaleia', 'Reacoes no local de injecao', 'Artralgia', 'Diarreia'],
      graves: ['Infeccoes serias', 'Reacoes de hipersensibilidade']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco de infeccao', conduta: 'Evitar durante tratamento' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Excrecao no leite desconhecida' },
    monitorizacao: ['TB screening', 'Infeccoes'],
    doencasRelacionadas: ['psoriase', 'artrite-psoriasica'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-il23-p19', 'biologico', 'humano', 'dermatologia', 'reumatologia']
  },

  // ============================================================================
  // JAK INHIBITORS
  // ============================================================================
  {
    id: 'upadacitinibe',
    nomeGenerico: 'Upadacitinibe',
    nomesComerciais: ['Rinvoq'],
    atcCode: 'L04AA44',
    rxNormCui: '2261697',
    drugBankId: 'DB15156',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'inibidor_jak',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_xr', concentracao: '15mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '30mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '45mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Artrite reumatoide moderada a grave',
      'Artrite psoriasica',
      'Espondilite anquilosante',
      'Espondiloartrite axial nao radiografica',
      'Colite ulcerativa moderada a grave',
      'Doenca de Crohn moderada a grave',
      'Dermatite atopica moderada a grave'
    ],
    mecanismoAcao: 'Inibidor oral SELETIVO de JAK1. Seletividade JAK1 (vs. JAK2/JAK3) teoricamente proporciona melhor perfil beneficio/risco. JAK1 medeia sinalizacao de citocinas pro-inflamatorias (IL-6, IFN-gama). Molecula pequena - nao requer injecao, rapido inicio de acao, meia-vida curta permite suspensao rapida.',
    posologias: [
      {
        indicacao: 'Artrite reumatoide',
        adultos: { dose: '15mg', frequencia: '1x/dia', observacoes: 'Com ou sem MTX' },
        idosos: { dose: '15mg', observacoes: 'Cautela em >65 anos (estudo ORAL Surveillance)' }
      },
      {
        indicacao: 'Artrite psoriasica/EA',
        adultos: { dose: '15mg', frequencia: '1x/dia' }
      },
      {
        indicacao: 'Colite ulcerativa (inducao)',
        adultos: { dose: '45mg', frequencia: '1x/dia por 8 semanas', observacoes: 'Pode estender para 16 semanas se necessario' }
      },
      {
        indicacao: 'Colite ulcerativa (manutencao)',
        adultos: { dose: '15mg ou 30mg', frequencia: '1x/dia', observacoes: '15mg para maioria; 30mg para casos refratarios' }
      },
      {
        indicacao: 'Doenca de Crohn',
        adultos: { dose: '45mg', frequencia: '1x/dia por 12 semanas (inducao), depois 15mg ou 30mg 1x/dia' }
      },
      {
        indicacao: 'Dermatite atopica',
        adultos: { dose: '15mg ou 30mg', frequencia: '1x/dia', observacoes: '15mg dose inicial; 30mg para casos graves' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao upadacitinibe',
      'Tuberculose ativa',
      'Infeccao grave ativa',
      'Gestacao',
      'Insuficiencia hepatica grave'
    ],
    precaucoes: [
      'BLACK BOX: Risco aumentado de infeccoes serias, mortalidade, malignidades, MACE e TEV',
      'BLACK BOX: Dados de estudo ORAL Surveillance (tofacitinib) aplicados como classe',
      'Rastrear TB, hepatite B/C antes de iniciar',
      'Evitar em pacientes >65 anos com fatores de risco CV',
      'Nao iniciar com linfocitos <500, neutrofilos <1000, Hb <8',
      'Perfuracoes GI podem ocorrer',
      'Herpes zoster mais frequente - considerar vacinacao antes',
      'Monitorar lipidios (aumentam)',
      'Evitar vacinas vivas'
    ],
    efeitosAdversos: {
      comuns: ['Infeccoes respiratorias superiores', 'Nauseas', 'Tosse', 'Elevacao de CPK', 'Acne', 'Elevacao de transaminases'],
      graves: ['TEV (embolia pulmonar, TVP)', 'MACE (infarto, AVC)', 'Malignidades', 'Infeccoes graves', 'Perfuracao GI', 'Herpes zoster', 'Citopenias']
    },
    interacoes: [
      { medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol, itraconazol)', gravidade: 'moderada', efeito: 'Aumenta exposicao de upadacitinibe', conduta: 'Ajustar dose: 15mg->15mg 1x/dia; 30mg->15mg 1x/dia; 45mg->30mg 1x/dia' },
      { medicamento: 'Indutores fortes de CYP3A4 (rifampicina)', gravidade: 'grave', efeito: 'Reduz significativamente eficacia', conduta: 'Nao recomendado' },
      { medicamento: 'Imunossupressores biologicos', gravidade: 'grave', efeito: 'Imunossupressao aditiva', conduta: 'Nao associar' },
      { medicamento: 'Vacinas vivas', gravidade: 'contraindicada', efeito: 'Risco de infeccao vacinal', conduta: 'Evitar; vacinar antes de iniciar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Sem ajuste' },
      { tfg: '30-60', ajuste: 'Sem ajuste para AR/AP/EA; CU: 30mg inducao, 15mg manutencao' },
      { tfg: '15-30', ajuste: '15mg 1x/dia maximo' },
      { tfg: '<15', ajuste: 'Nao recomendado' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado - excretado no leite em animais' },
    monitorizacao: ['Hemograma antes e durante', 'Lipidograma apos 12 semanas', 'Funcao hepatica', 'TB antes de iniciar', 'Sinais de TEV'],
    doencasRelacionadas: ['artrite-reumatoide', 'colite-ulcerativa', 'dermatite-atopica', 'espondilite-anquilosante'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['jak-inhibitor', 'oral', 'reumatologia', 'gastroenterologia', 'dermatologia', 'black-box']
  },
  {
    id: 'filgotinibe',
    nomeGenerico: 'Filgotinibe',
    nomesComerciais: ['Jyseleca'],
    atcCode: 'L04AA45',
    rxNormCui: '2375270',
    drugBankId: 'DB12025',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'inibidor_jak',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Artrite reumatoide moderada a grave (Europa)',
      'Colite ulcerativa moderada a grave'
    ],
    mecanismoAcao: 'Inibidor oral ALTAMENTE SELETIVO de JAK1. Maior seletividade JAK1 vs. JAK2 comparado a outros JAKi. Seletividade pode minimizar efeitos sobre eritropoiese (JAK2) e manter eficacia anti-inflamatoria (JAK1). Metabolito ativo contribui para atividade.',
    posologias: [
      {
        indicacao: 'Artrite reumatoide',
        adultos: { dose: '200mg', frequencia: '1x/dia', observacoes: 'Com ou sem MTX' }
      },
      {
        indicacao: 'Colite ulcerativa',
        adultos: { dose: '200mg', frequencia: '1x/dia', observacoes: 'Inducao e manutencao com mesma dose' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao filgotinibe',
      'Tuberculose ativa',
      'Gestacao',
      'Homens desejando paternidade (efeito em espermatogenese em estudos animais)'
    ],
    precaucoes: [
      'BLACK BOX (classe): Infeccoes graves, malignidades, MACE, TEV',
      'Nao aprovado FDA para AR (preocupacoes com espermatogenese)',
      'Evitar em homens planejando paternidade',
      'TB screening obrigatorio',
      'Hepatite B/C screening',
      'Herpes zoster - considerar vacinacao',
      'Perfuracao GI',
      'Nao iniciar se linfocitos <500, neutrofilos <1000, Hb <8'
    ],
    efeitosAdversos: {
      comuns: ['Nauseas', 'Infeccoes respiratorias', 'Cefaleia', 'Tontura'],
      graves: ['TEV', 'MACE', 'Infeccoes serias', 'Malignidades', 'Perfuracao GI', 'Citopenias', 'Efeitos em espermatogenese']
    },
    interacoes: [
      { medicamento: 'Inibidores fortes CYP3A4', gravidade: 'leve', efeito: 'Aumento modesto de exposicao', conduta: 'Monitorar' },
      { medicamento: 'Biologicos', gravidade: 'grave', efeito: 'Imunossupressao aditiva', conduta: 'Nao associar' },
      { medicamento: 'Vacinas vivas', gravidade: 'contraindicada', efeito: 'Infeccao vacinal', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: '200mg 1x/dia' },
      { tfg: '30-60', ajuste: '100mg 1x/dia' },
      { tfg: '<30', ajuste: 'Nao recomendado' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['Hemograma', 'Funcao hepatica', 'Lipidograma', 'TB antes', 'Contagem espermatica se planejando paternidade'],
    doencasRelacionadas: ['artrite-reumatoide', 'colite-ulcerativa'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['jak-inhibitor', 'oral', 'reumatologia', 'gastroenterologia', 'espermatogenese']
  },
  {
    id: 'deucravacitinibe',
    nomeGenerico: 'Deucravacitinibe',
    nomesComerciais: ['Sotyktu'],
    atcCode: 'L04AA56',
    rxNormCui: '2598193',
    drugBankId: 'DB16627',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'inibidor_jak',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '6mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Psoriase em placas moderada a grave'
    ],
    mecanismoAcao: 'Inibidor ALOSTERICO SELETIVO de TYK2 (tirosina quinase 2). MECANISMO DISTINTO de outros JAKi: liga-se ao dominio regulatorio JH2 (pseudoquinase), nao ao sitio ativo. TYK2 medeia sinalizacao de IL-23, IL-12 e IFN tipo I - vias centrais na psoriase. Seletividade TYK2 vs. JAK1/2/3 teoricamente evita efeitos adversos de classe.',
    posologias: [
      {
        indicacao: 'Psoriase em placas',
        adultos: { dose: '6mg', frequencia: '1x/dia', observacoes: 'Com ou sem alimentos' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao deucravacitinibe',
      'Tuberculose ativa'
    ],
    precaucoes: [
      'TB - rastrear antes de iniciar',
      'Infeccoes - monitorar',
      'Elevaçao de CPK pode ocorrer',
      'Triglicerides podem aumentar',
      'Perfil de segurança aparentemente mais favoravel que JAKi convencionais',
      'SEM black box warnings de MACE/TEV (diferente de outros JAKi)',
      'Evitar vacinas vivas'
    ],
    efeitosAdversos: {
      comuns: ['Infeccoes respiratorias superiores', 'Aumento de triglicerides', 'Elevacao de CPK', 'Acne', 'Foliculite'],
      graves: ['Infeccoes serias (raro)', 'Hipersensibilidade']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco teorico de infeccao', conduta: 'Evitar' },
      { medicamento: 'Sem interacoes CYP450 significativas', gravidade: 'leve', efeito: 'Nao inibe/induz CYP450', conduta: 'Sem ajustes necessarios' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['TB antes de iniciar', 'Lipidograma', 'CPK se sintomas musculares'],
    doencasRelacionadas: ['psoriase'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['tyk2-inhibitor', 'oral', 'dermatologia', 'mecanismo-alosterico']
  },

  // ============================================================================
  // OUTROS MECANISMOS
  // ============================================================================
  {
    id: 'abatacepte',
    nomeGenerico: 'Abatacepte',
    nomesComerciais: ['Orencia'],
    atcCode: 'L04AA24',
    rxNormCui: '615186',
    drugBankId: 'DB01281',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'modulador_coestimulacao',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '125mg/ml', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '250mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Artrite reumatoide moderada a grave',
      'Artrite psoriasica',
      'Artrite idiopatica juvenil poliarticular (>=2 anos)'
    ],
    mecanismoAcao: 'Proteina de fusao CTLA-4-Ig que se liga a CD80/CD86 nas celulas apresentadoras de antígeno, bloqueando interacao com CD28 nas celulas T. MODULA (nao depleta) celulas T ao inibir coestimulacao - segundo sinal necessario para ativacao. Mecanismo upstream unico entre DMARDs biologicos.',
    posologias: [
      {
        indicacao: 'AR (IV)',
        adultos: { dose: '<60kg: 500mg; 60-100kg: 750mg; >100kg: 1000mg', frequencia: 'IV semanas 0, 2, 4, depois a cada 4 semanas', observacoes: 'Infusao em 30 minutos' }
      },
      {
        indicacao: 'AR (SC)',
        adultos: { dose: '125mg', frequencia: 'SC 1x/semana', observacoes: 'Pode ou nao ser precedido por dose IV de ataque' }
      },
      {
        indicacao: 'Artrite idiopatica juvenil',
        adultos: { dose: '10mg/kg (max 1000mg)', frequencia: 'IV semanas 0, 2, 4, depois a cada 4 semanas', observacoes: 'Mesmo esquema para adultos e criancas >=6 anos com >=75kg' },
        pediatrico: { dose: '10mg/kg (max 1000mg)', frequencia: 'IV semanas 0, 2, 4, depois a cada 4 semanas', idadeMinima: '2 anos', doseMaxima: '1000mg' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao abatacepte',
      'Infeccao grave ativa'
    ],
    precaucoes: [
      'Infeccoes - monitorar; risco menor que anti-TNF',
      'TB - rastrear antes de iniciar',
      'DPOC - risco aumentado de exacerbacoes e eventos respiratorios',
      'Nao associar com anti-TNF ou outros biologicos',
      'Vacinas vivas - evitar',
      'Resposta vacinal a vacinas inativadas pode ser atenuada'
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Nasofaringite', 'Nauseas', 'Infeccoes respiratorias superiores', 'Tontura'],
      graves: ['Infeccoes serias', 'Malignidades', 'Reacoes anafilaticas (raro)', 'Exacerbacao DPOC']
    },
    interacoes: [
      { medicamento: 'Anti-TNF', gravidade: 'grave', efeito: 'Aumento de infeccoes graves sem beneficio', conduta: 'Nao associar' },
      { medicamento: 'Anakinra', gravidade: 'grave', efeito: 'Infeccoes graves', conduta: 'Nao associar' },
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco de infeccao', conduta: 'Evitar' },
      { medicamento: 'MTX', gravidade: 'leve', efeito: 'Sem interacao significativa', conduta: 'Associacao segura e comum' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['TB screening', 'Hepatite B/C screening', 'Funcao pulmonar em DPOC', 'Infeccoes'],
    doencasRelacionadas: ['artrite-reumatoide', 'artrite-idiopatica-juvenil'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['coestimulacao', 'modulador-celula-t', 'biologico', 'reumatologia', 'pediatria']
  },
  {
    id: 'tocilizumabe',
    nomeGenerico: 'Tocilizumabe',
    nomesComerciais: ['Actemra', 'RoActemra'],
    atcCode: 'L04AC07',
    rxNormCui: '897019',
    drugBankId: 'DB06273',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il6',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '162mg/0,9ml', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '80mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '200mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '400mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Artrite reumatoide moderada a grave',
      'Artrite idiopatica juvenil sistemica (AIJs)',
      'Artrite idiopatica juvenil poliarticular (AIJp)',
      'Arterite de celulas gigantes',
      'Sindrome de liberacao de citocinas (CRS) grave',
      'COVID-19 grave (uso emergencial)'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG1 humanizado anti-RECEPTOR de IL-6 (IL-6R). Bloqueia sinalizacao de IL-6 tanto cis (receptor de membrana) quanto trans (receptor soluvel). IL-6 e citocina pleiotrofica central na inflamacao cronica, producao de proteinas de fase aguda (PCR) e anemia de doenca cronica.',
    posologias: [
      {
        indicacao: 'AR (IV)',
        adultos: { dose: '4mg/kg inicialmente, pode aumentar para 8mg/kg', frequencia: 'IV a cada 4 semanas', doseMaxima: '800mg/dose', observacoes: 'Infusao em 1 hora' }
      },
      {
        indicacao: 'AR (SC)',
        adultos: { dose: '<100kg: 162mg SC a cada 2 semanas, pode aumentar para semanal. >=100kg: 162mg SC semanal', frequencia: 'Ver dose' }
      },
      {
        indicacao: 'Arterite de celulas gigantes',
        adultos: { dose: '162mg', frequencia: 'SC semanal', observacoes: 'Com corticoide inicial (desmame gradual)' }
      },
      {
        indicacao: 'Sindrome de liberacao de citocinas (CRS)',
        adultos: { dose: '8mg/kg', frequencia: 'IV dose unica (max 800mg)', observacoes: 'Pode repetir a cada 8h se necessario (max 3 doses em 24h)' },
        pediatrico: { dose: '>=30kg: 8mg/kg IV; <30kg: 12mg/kg IV', frequencia: 'Dose unica', doseMaxima: '800mg' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao tocilizumabe',
      'Infeccao grave ativa',
      'Neutrofilos <2000 (inicio) ou <500 (manutencao)',
      'Plaquetas <100.000 (inicio) ou <50.000 (manutencao)',
      'ALT/AST >1,5x LSN (inicio)'
    ],
    precaucoes: [
      'Infeccoes - pode mascarar sinais (suprime febre e PCR)',
      'Perfuracoes GI - maior risco em diverticulite',
      'TB - rastrear antes',
      'Hepatotoxicidade - monitorar transaminases',
      'Neutropenia e trombocitopenia - monitorar hemograma',
      'Dislipidemia - aumenta LDL e colesterol total',
      'Nao associar com biologicos'
    ],
    efeitosAdversos: {
      comuns: ['Infeccoes respiratorias superiores', 'Cefaleia', 'Hipertensao', 'Elevacao de transaminases', 'Reacoes infusionais/injecao'],
      graves: ['Infeccoes serias', 'Perfuracao GI', 'Hepatotoxicidade', 'Neutropenia grave', 'Reacoes anafilaticas', 'Stevens-Johnson']
    },
    interacoes: [
      { medicamento: 'Substratos CYP450 (varfarina, sinvastatina, ciclosporina)', gravidade: 'moderada', efeito: 'IL-6 suprime CYP450; normalizacao pode reduzir niveis dos substratos', conduta: 'Monitorar INR, ajustar doses conforme necessario' },
      { medicamento: 'Biologicos', gravidade: 'grave', efeito: 'Imunossupressao aditiva', conduta: 'Nao associar' },
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco de infeccao vacinal', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Nao estudado formalmente; usar com cautela' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['Hemograma (neutrofilos, plaquetas) antes e a cada 4-8 semanas', 'Transaminases', 'Lipidograma apos 4-8 semanas', 'TB antes', 'Sintomas de perfuracao GI'],
    doencasRelacionadas: ['artrite-reumatoide', 'arterite-celulas-gigantes', 'covid-19'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-il6r', 'biologico', 'reumatologia', 'crs', 'covid-19']
  },
  {
    id: 'belimumabe',
    nomeGenerico: 'Belimumabe',
    nomesComerciais: ['Benlysta'],
    atcCode: 'L04AA26',
    rxNormCui: '1011464',
    drugBankId: 'DB08879',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_cd20',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '120mg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '400mg', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '200mg/ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Lupus eritematoso sistemico (LES) ativo com autoanticorpos positivos (adjuvante)',
      'Nefrite lupica ativa (adjuvante)'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG1-lambda totalmente humano anti-BLyS (estimulador de linfocitos B, tambem conhecido como BAFF). BLyS e crucial para sobrevivencia e maturacao de celulas B. Bloqueio reduz celulas B autorreativas e producao de autoanticorpos. PRIMEIRO BIOLOGICO APROVADO ESPECIFICAMENTE PARA LES.',
    posologias: [
      {
        indicacao: 'LES (IV)',
        adultos: { dose: '10mg/kg', frequencia: 'IV semanas 0, 2, 4, depois a cada 4 semanas', observacoes: 'Infusao em 1 hora (pode prolongar se reacao)' }
      },
      {
        indicacao: 'LES (SC)',
        adultos: { dose: '200mg', frequencia: 'SC 1x/semana', observacoes: 'Autoadministracao possivel apos treinamento' }
      },
      {
        indicacao: 'Nefrite lupica',
        adultos: { dose: '10mg/kg IV semanas 0,2,4, depois a cada 4 semanas; OU 400mg SC semanal x4 (ataque), depois 200mg SC semanal', frequencia: 'Ver dose', observacoes: 'Associar a terapia padrao (micofenolato ou ciclofosfamida + corticoide)' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao belimumabe',
      'Historia de anafilaxia previa ao belimumabe'
    ],
    precaucoes: [
      'Infeccoes - risco aumentado',
      'Reacoes de hipersensibilidade/infusionais - podem ser tardias',
      'Depressao e ideacao suicida - monitorar humor',
      'Leucoencefalopatia multifocal progressiva (PML) - rara',
      'Nao estudado em LES neuropsiquiatrico grave ou nefrite grave requerendo dialise',
      'Vacinas vivas - evitar',
      'Resposta a vacinas inativadas pode ser reduzida'
    ],
    efeitosAdversos: {
      comuns: ['Nauseas', 'Diarreia', 'Febre', 'Nasofaringite', 'Insonia', 'Dor nas extremidades', 'Reacoes infusionais'],
      graves: ['Infeccoes serias', 'Depressao/suicidio', 'PML', 'Reacoes de hipersensibilidade grave', 'Reativacao viral']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco de infeccao vacinal', conduta: 'Evitar; vacinar 30 dias antes de iniciar' },
      { medicamento: 'Ciclofosfamida IV', gravidade: 'leve', efeito: 'Nao estudada associacao; teoricamente segura', conduta: 'Usar com cautela' },
      { medicamento: 'Outros biologicos', gravidade: 'grave', efeito: 'Nao estudado; risco teorico de infeccao', conduta: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretado no leite animal; evitar' },
    monitorizacao: ['Infeccoes', 'Humor/ideacao suicida', 'Reacoes infusionais', 'Sinais neurologicos (PML)'],
    doencasRelacionadas: ['lupus-eritematoso', 'nefrite-lupica'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-blys', 'anti-baff', 'biologico', 'lupus', 'autoimune']
  }
];
