/**
 * OFTALMOLOGIA NOVOS - DARWIN-MFC EXPANSAO 1000
 * ==============================================
 * Agentes oftalmologicos avancados: anti-VEGF, prostaglandinas,
 * beta-bloqueadores, alfa-agonistas, CAIs e ROCK inhibitors.
 *
 * Referencias:
 * - ANCHOR/MARINA/HARBOR trials (Ranibizumab)
 * - VIEW 1/2, VIVID/VISTA trials (Aflibercept)
 * - HAWK/HARRIER trials (Brolucizumab)
 * - TENAYA/LUCERNE trials (Faricimab)
 * - Prostaglandin analog studies
 * - ROCKET trials (Netarsudil)
 * - RESTASIS/CEQUA studies (Cyclosporine)
 */

import { Medicamento } from '@/lib/types/medicamento';

export const oftalmologiaNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // ANTI-VEGF INTRAVITREAL AGENTS
  // =============================================================================
  {
    id: 'ranibizumab',
    nomeGenerico: 'Ranibizumab',
    nomesComerciais: ['Lucentis'],
    atcCode: 'S01LA04',
    rxNormCui: '596189',
    drugBankId: 'DB01270',
    snomedCT: '421724008',
    casNumber: '347396-82-1',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '10mg/mL (0,5mg/0,05mL)', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '10mg/mL (0,3mg/0,03mL)', disponivelSUS: false },
    ],
    indicacoes: [
      'Degeneracao macular relacionada a idade (DMRI) neovascular',
      'Edema macular diabetico (EMD)',
      'Retinopatia diabetica proliferativa',
      'Edema macular por oclusao venosa retiniana (OVR)',
      'Neovascularizacao coroidal miopica',
    ],
    mecanismoAcao: 'Fragmento de anticorpo monoclonal humanizado (Fab) que se liga e neutraliza todas as isoformas ativas do VEGF-A. Inibe a angiogenese patologica e reduz a permeabilidade vascular retiniana. Eficacia comprovada em multiplos estudos pivotais (ANCHOR, MARINA, HARBOR).',
    posologias: [
      {
        indicacao: 'DMRI neovascular',
        adultos: {
          dose: '0,5mg (0,05mL)',
          frequencia: 'Injecao intravitrea mensal ou conforme protocolo treat-and-extend',
          observacoes: 'Iniciar com 3 injecoes mensais (dose de carga), depois ajustar conforme resposta. Monitorar com OCT.',
        },
      },
      {
        indicacao: 'Edema macular diabetico',
        adultos: {
          dose: '0,3mg ou 0,5mg (0,03mL ou 0,05mL)',
          frequencia: 'Mensal inicialmente',
          observacoes: 'Pode ser combinado com laser focal/grid. Avaliar resposta apos 3-6 injecoes.',
        },
      },
    ],
    contraindicacoes: [
      'Infeccao ocular ou periocular ativa',
      'Inflamacao intraocular ativa',
      'Hipersensibilidade ao ranibizumab ou componentes',
    ],
    precaucoes: [
      'Risco de endoftalmite (tecnica assetica rigorosa)',
      'Risco de descolamento de retina regmatogenico',
      'Risco de aumento da PIO transitorio',
      'Eventos tromboembolicos arteriais (raro, mas monitorar pacientes de risco)',
    ],
    efeitosAdversos: {
      comuns: ['Hemorragia conjuntival', 'Dor ocular', 'Moscas volantes', 'Aumento transitorio da PIO', 'Inflamacao ocular'],
      graves: ['Endoftalmite', 'Descolamento de retina', 'Catarata traumatica', 'AVC/IAM (raro)'],
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - evitar durante tratamento e por 1 mes apos' },
    monitorizacao: [
      'Acuidade visual antes e apos injecao',
      'Pressao intraocular',
      'OCT (tomografia de coerencia optica)',
      'Fundoscopia',
      'Angiografia fluoresceina periodica',
    ],
    orientacoesPaciente: [
      'Procedimento realizado em centro especializado',
      'Usar colirios antibioticos conforme prescrito',
      'Sinais de alerta: dor intensa, perda subita de visao, secrecao - procurar emergencia',
      'Evitar esfregar os olhos',
    ],
    consideracoesEspeciais: {
      idosos: 'Populacao principal de uso; sem ajuste especifico',
    },
    doencasRelacionadas: ['dmri', 'edema-macular-diabetico', 'retinopatia-diabetica', 'oclusao-venosa-retiniana'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['ranibizumab', 'anti-VEGF', 'DMRI', 'intravitreal', 'Lucentis', 'ANCHOR', 'MARINA'],
  },

  {
    id: 'aflibercept',
    nomeGenerico: 'Aflibercept',
    nomesComerciais: ['Eylea'],
    atcCode: 'S01LA05',
    rxNormCui: '1299899',
    drugBankId: 'DB08885',
    snomedCT: '703124007',
    casNumber: '862111-32-8',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '40mg/mL (2mg/0,05mL)', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '114,3mg/mL (8mg/0,07mL)', disponivelSUS: false },
    ],
    indicacoes: [
      'Degeneracao macular relacionada a idade (DMRI) neovascular',
      'Edema macular diabetico (EMD)',
      'Retinopatia diabetica',
      'Edema macular secundario a oclusao venosa retiniana',
      'Retinopatia da prematuridade (ROP)',
    ],
    mecanismoAcao: 'Proteina de fusao recombinante (VEGF Trap) composta por porcoes dos receptores VEGFR-1 e VEGFR-2 fusionadas com porcao Fc de IgG1 humana. Liga-se ao VEGF-A, VEGF-B e PlGF com alta afinidade, atuando como receptor solubel "chamariz". Estudos VIEW 1/2, VIVID/VISTA demonstraram eficacia.',
    posologias: [
      {
        indicacao: 'DMRI neovascular',
        adultos: {
          dose: '2mg (0,05mL)',
          frequencia: 'Mensal por 3 meses, depois a cada 8 semanas',
          observacoes: 'Formulacao 8mg permite intervalos de ate 16 semanas apos periodo de carga.',
        },
      },
      {
        indicacao: 'Edema macular diabetico',
        adultos: {
          dose: '2mg (0,05mL)',
          frequencia: 'Mensal por 5 meses, depois a cada 8 semanas',
          observacoes: 'Avaliar necessidade de tratamento mais frequente baseado em resposta.',
        },
      },
    ],
    contraindicacoes: [
      'Infeccao ocular ou periocular ativa',
      'Inflamacao intraocular ativa grave',
      'Hipersensibilidade conhecida',
    ],
    precaucoes: [
      'Risco de endoftalmite - tecnica assetica obrigatoria',
      'Aumento transitorio da PIO',
      'Eventos tromboembolicos arteriais',
      'Cuidado em pacientes com historico de AVC ou IAM recente',
    ],
    efeitosAdversos: {
      comuns: ['Hemorragia conjuntival', 'Dor ocular', 'Catarata', 'Descolamento vitreo', 'Moscas volantes'],
      graves: ['Endoftalmite', 'Descolamento de retina', 'Aumento PIO sustentado', 'Eventos tromboembolicos'],
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar - dados insuficientes' },
    monitorizacao: [
      'Acuidade visual',
      'OCT macular',
      'Pressao intraocular',
      'Exame de fundo de olho',
    ],
    orientacoesPaciente: [
      'Tratamento cronico com injecoes regulares',
      'Procurar emergencia se dor intensa ou perda de visao',
      'Intervalos mais longos possiveis com formulacao 8mg',
    ],
    consideracoesEspeciais: {
      idosos: 'Uso principal em idosos; sem ajuste',
    },
    doencasRelacionadas: ['dmri', 'edema-macular-diabetico', 'retinopatia-diabetica', 'oclusao-venosa-retiniana'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['aflibercept', 'anti-VEGF', 'VEGF-Trap', 'Eylea', 'VIEW', 'VIVID', 'VISTA'],
  },

  {
    id: 'brolucizumab',
    nomeGenerico: 'Brolucizumab',
    nomesComerciais: ['Beovu'],
    atcCode: 'S01LA06',
    rxNormCui: '2361274',
    drugBankId: 'DB15346',
    snomedCT: '1156236007',
    casNumber: '1441382-57-1',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '120mg/mL (6mg/0,05mL)', disponivelSUS: false },
    ],
    indicacoes: [
      'Degeneracao macular relacionada a idade (DMRI) neovascular',
      'Edema macular diabetico (EMD)',
    ],
    mecanismoAcao: 'Fragmento de anticorpo de cadeia unica (scFv) humanizado que inibe o VEGF-A. Menor tamanho molecular permite maior penetracao tecidual e durabilidade. Estudos HAWK/HARRIER demonstraram nao-inferioridade ao aflibercept com potencial para intervalos de ate 12 semanas.',
    posologias: [
      {
        indicacao: 'DMRI neovascular',
        adultos: {
          dose: '6mg (0,05mL)',
          frequencia: 'Mensal por 3 meses, depois a cada 8-12 semanas',
          observacoes: 'Primeira injecao a cada 8 semanas pode ser estendida para 12 semanas em pacientes responsivos.',
        },
      },
      {
        indicacao: 'Edema macular diabetico',
        adultos: {
          dose: '6mg (0,05mL)',
          frequencia: 'Mensal por 5 doses, depois a cada 8-12 semanas',
          observacoes: 'Intervalos individualizados conforme resposta.',
        },
      },
    ],
    contraindicacoes: [
      'Infeccao ocular ou periocular ativa',
      'Inflamacao intraocular ativa',
      'Hipersensibilidade ao brolucizumab',
      'Historico de vasculite retiniana ou oclusao vascular ocular com brolucizumab',
    ],
    precaucoes: [
      'Risco de vasculite retiniana e oclusao vascular retiniana (maior que outros anti-VEGF)',
      'Endoftalmite',
      'Aumento PIO',
      'Descolamento de retina',
      'Monitoramento rigoroso nas primeiras semanas apos injecao',
    ],
    efeitosAdversos: {
      comuns: ['Acuidade visual reduzida', 'Hemorragia conjuntival', 'Dor ocular', 'Moscas volantes'],
      graves: ['Vasculite retiniana', 'Oclusao vascular retiniana', 'Endoftalmite', 'Iridociclite', 'Uveite'],
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Acuidade visual',
      'OCT',
      'Exame de fundo de olho para sinais de vasculite',
      'Pressao intraocular',
      'Retornar imediatamente se sintomas de inflamacao',
    ],
    orientacoesPaciente: [
      'Risco de inflamacao ocular - relatar sintomas prontamente',
      'Dor, vermelhidao, sensibilidade a luz - procurar atendimento urgente',
      'Potencial para intervalos mais longos entre injecoes',
    ],
    consideracoesEspeciais: {
      idosos: 'Populacao alvo; cautela com historico vascular',
    },
    doencasRelacionadas: ['dmri', 'edema-macular-diabetico'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['brolucizumab', 'anti-VEGF', 'scFv', 'Beovu', 'HAWK', 'HARRIER'],
  },

  {
    id: 'faricimab',
    nomeGenerico: 'Faricimab',
    nomesComerciais: ['Vabysmo'],
    atcCode: 'S01LA09',
    rxNormCui: '2551501',
    drugBankId: 'DB16224',
    snomedCT: '1254756001',
    casNumber: '2169232-48-2',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '120mg/mL (6mg/0,05mL)', disponivelSUS: false },
    ],
    indicacoes: [
      'Degeneracao macular relacionada a idade (DMRI) neovascular',
      'Edema macular diabetico (EMD)',
    ],
    mecanismoAcao: 'Primeiro anticorpo biespecifico aprovado para uso intraocular. Liga-se simultaneamente ao VEGF-A e Angiopoetina-2 (Ang-2). A dupla inibicao proporciona estabilizacao vascular superior ao bloqueio isolado de VEGF. Estudos TENAYA/LUCERNE (DMRI) e YOSEMITE/RHINE (EMD) demonstraram eficacia com intervalos de ate 16 semanas em muitos pacientes.',
    posologias: [
      {
        indicacao: 'DMRI neovascular',
        adultos: {
          dose: '6mg (0,05mL)',
          frequencia: '4 injecoes mensais, depois a cada 8-16 semanas',
          observacoes: 'Intervalo pode ser estendido baseado em atividade da doenca por OCT.',
        },
      },
      {
        indicacao: 'Edema macular diabetico',
        adultos: {
          dose: '6mg (0,05mL)',
          frequencia: '4-6 injecoes mensais, depois a cada 8 semanas ate 16 semanas',
          observacoes: 'Potencial para intervalos prolongados apos estabilizacao.',
        },
      },
    ],
    contraindicacoes: [
      'Infeccao ocular ou periocular',
      'Inflamacao intraocular ativa',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Risco de endoftalmite',
      'Aumento transitorio da PIO',
      'Eventos tromboembolicos (monitorar)',
      'Descolamento de retina',
    ],
    efeitosAdversos: {
      comuns: ['Hemorragia conjuntival', 'Catarata', 'Moscas volantes', 'Dor ocular', 'Acuidade visual reduzida transitoria'],
      graves: ['Endoftalmite', 'Descolamento de retina', 'Uveite', 'Irite'],
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - evitar' },
    monitorizacao: [
      'Acuidade visual',
      'OCT macular',
      'Pressao intraocular',
      'Fundoscopia',
    ],
    orientacoesPaciente: [
      'Anticorpo biespecifico - potencial para intervalos mais longos',
      'Relatar sintomas de inflamacao ou perda de visao',
      'Tratamento de longo prazo necessario',
    ],
    consideracoesEspeciais: {
      idosos: 'Populacao principal; sem ajuste especifico',
    },
    doencasRelacionadas: ['dmri', 'edema-macular-diabetico'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['faricimab', 'anti-VEGF', 'anti-Ang-2', 'biespecifico', 'Vabysmo', 'TENAYA', 'LUCERNE'],
  },

  // =============================================================================
  // PROSTAGLANDIN ANALOGS FOR GLAUCOMA
  // =============================================================================
  {
    id: 'bimatoprosta',
    nomeGenerico: 'Bimatoprosta',
    nomesComerciais: ['Lumigan', 'Latisse'],
    atcCode: 'S01EE03',
    rxNormCui: '242969',
    drugBankId: 'DB00905',
    snomedCT: '129492005',
    casNumber: '155206-00-1',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'analogo_prostaglandina',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,01%', disponivelSUS: false },
      { forma: 'colirio', concentracao: '0,03%', disponivelSUS: false },
    ],
    indicacoes: [
      'Glaucoma de angulo aberto',
      'Hipertensao ocular',
      'Hipotricose dos cilios (uso cosmetico)',
    ],
    mecanismoAcao: 'Analogo sintetico da prostamida que aumenta o fluxo de saida do humor aquoso pela via uveoescleral e trabecular. Reducao da PIO de 25-30%. Aplicacao unica diaria a noite. Mecanismo via receptores de prostamida e prostaglandina FP.',
    posologias: [
      {
        indicacao: 'Glaucoma/Hipertensao ocular',
        adultos: {
          dose: '1 gota no olho afetado',
          frequencia: '1x/dia a noite',
          observacoes: 'Aplicacao mais frequente pode reduzir eficacia. Remover lentes de contato antes.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a bimatoprosta ou cloreto de benzalconio',
    ],
    precaucoes: [
      'Mudanca permanente de cor da iris (escurecimento)',
      'Aumento de pigmentacao palpebral e periocular',
      'Aumento do comprimento e pigmentacao dos cilios',
      'Edema macular cistoide em pacientes afacicos/pseudofacicos',
      'Reativacao de ceratite herpetica',
    ],
    efeitosAdversos: {
      comuns: ['Hiperemia conjuntival', 'Crescimento dos cilios', 'Prurido ocular', 'Escurecimento da iris', 'Sensacao de corpo estranho'],
      graves: ['Edema macular cistoide', 'Irite/uveite', 'Ceratite herpetica'],
    },
    interacoes: [
      {
        medicamento: 'Outros analogos de prostaglandinas',
        gravidade: 'moderada',
        efeito: 'Aumento paradoxal da PIO',
        conduta: 'Nao combinar prostaglandinas',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorcao sistemica minima' },
    monitorizacao: [
      'Pressao intraocular',
      'Cor da iris',
      'Aspecto dos cilios',
      'Alteracoes palpebrais',
    ],
    orientacoesPaciente: [
      'Aplicar a noite, 1 vez ao dia',
      'Iris pode escurecer permanentemente',
      'Cilios podem crescer mais longos e escuros',
      'Remover lentes de contato antes e aguardar 15 min',
    ],
    consideracoesEspeciais: {
      idosos: 'Uso frequente; sem ajuste',
    },
    doencasRelacionadas: ['glaucoma', 'hipertensao-ocular'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['bimatoprosta', 'prostaglandina', 'glaucoma', 'Lumigan', 'PIO'],
  },

  {
    id: 'latanoprosta',
    nomeGenerico: 'Latanoprosta',
    nomesComerciais: ['Xalatan', 'Latanost'],
    atcCode: 'S01EE01',
    rxNormCui: '61380',
    drugBankId: 'DB00654',
    snomedCT: '129489002',
    casNumber: '130209-82-4',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'analogo_prostaglandina',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,005%', disponivelSUS: false },
    ],
    indicacoes: [
      'Glaucoma de angulo aberto',
      'Hipertensao ocular',
    ],
    mecanismoAcao: 'Pro-droga ester isopropilico do acido de latanoprosta (analogo da prostaglandina F2-alfa). Hidrolisada pela esterase corneana ao metabolito ativo. Aumenta a drenagem uveoescleral do humor aquoso, reduzindo PIO em 25-30%. Primeira linha no tratamento do glaucoma.',
    posologias: [
      {
        indicacao: 'Glaucoma',
        adultos: {
          dose: '1 gota no olho afetado',
          frequencia: '1x/dia a noite',
          observacoes: 'Nao aplicar mais de 1x/dia - pode reduzir eficacia.',
        },
        pediatrico: {
          dose: '1 gota',
          frequencia: '1x/dia',
          idadeMinima: '1 ano',
          observacoes: 'Aprovado em pediatria.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a latanoprosta ou conservantes',
    ],
    precaucoes: [
      'Mudanca irreversivel de cor da iris (marrom)',
      'Pode reativar ceratite herpetica',
      'Edema macular em afacicos',
      'Aumento de pigmentacao palpebral',
      'Crescimento ciliar',
    ],
    efeitosAdversos: {
      comuns: ['Hiperemia conjuntival', 'Escurecimento da iris', 'Aumento pigmentacao cilios', 'Irritacao ocular', 'Sensacao de queimacao'],
      graves: ['Edema macular', 'Uveite', 'Herpes ocular'],
    },
    interacoes: [
      {
        medicamento: 'Timolol (combinacao)',
        gravidade: 'leve',
        efeito: 'Efeito aditivo na reducao de PIO',
        conduta: 'Combinacao frequentemente usada - segura',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorcao sistemica minima' },
    monitorizacao: [
      'PIO',
      'Cor da iris (fotografar no inicio)',
      'Fundo de olho',
    ],
    orientacoesPaciente: [
      'Usar 1x ao dia a noite',
      'Cor da iris pode mudar permanentemente',
      'Armazenar na geladeira antes de abrir',
    ],
    consideracoesEspeciais: {
      idosos: 'Populacao principal; sem ajuste',
      pediatrico: 'Aprovado para >= 1 ano',
    },
    doencasRelacionadas: ['glaucoma', 'hipertensao-ocular'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['latanoprosta', 'prostaglandina', 'glaucoma', 'Xalatan', 'primeira-linha'],
  },

  {
    id: 'travoprosta',
    nomeGenerico: 'Travoprosta',
    nomesComerciais: ['Travatan', 'Travatan Z'],
    atcCode: 'S01EE04',
    rxNormCui: '282047',
    drugBankId: 'DB00287',
    snomedCT: '129497004',
    casNumber: '157283-68-6',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'analogo_prostaglandina',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,004%', disponivelSUS: false },
    ],
    indicacoes: [
      'Glaucoma de angulo aberto',
      'Hipertensao ocular',
    ],
    mecanismoAcao: 'Analogo sintetico de prostaglandina F2-alfa, pro-droga ester isopropilico. Ativado por esterases corneanas. Aumenta o efluxo de humor aquoso via via uveoescleral. Reducao de PIO comparavel a latanoprosta. Formulacao Travatan Z sem conservante benzalconio.',
    posologias: [
      {
        indicacao: 'Glaucoma/Hipertensao ocular',
        adultos: {
          dose: '1 gota no olho afetado',
          frequencia: '1x/dia a noite',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao travoprosta ou componentes',
    ],
    precaucoes: [
      'Pigmentacao iris/palpebras/cilios',
      'Pode exacerbar inflamacao intraocular',
      'Edema macular em pacientes de risco',
      'Ceratite herpetica',
    ],
    efeitosAdversos: {
      comuns: ['Hiperemia ocular', 'Alteracao de cor da iris', 'Crescimento cilios', 'Desconforto ocular', 'Prurido'],
      graves: ['Edema macular', 'Irite', 'Ceratite'],
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorcao sistemica minima' },
    monitorizacao: [
      'PIO',
      'Pigmentacao iris/palpebra',
      'Sinais de inflamacao',
    ],
    orientacoesPaciente: [
      'Aplicar a noite',
      'Possivel mudanca permanente de cor da iris',
      'Formulacao Z sem benzalconio - melhor tolerada',
    ],
    consideracoesEspeciais: {
      idosos: 'Uso comum; sem ajuste',
    },
    doencasRelacionadas: ['glaucoma', 'hipertensao-ocular'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['travoprosta', 'prostaglandina', 'glaucoma', 'Travatan', 'PIO'],
  },

  // =============================================================================
  // BETA-BLOCKER FOR GLAUCOMA
  // =============================================================================
  {
    id: 'timolol-colirio-avancado',
    nomeGenerico: 'Timolol',
    nomesComerciais: ['Timoptol', 'Timoptol XE', 'Nyolol'],
    atcCode: 'S01ED01',
    rxNormCui: '10600',
    drugBankId: 'DB00373',
    snomedCT: '372880008',
    casNumber: '26839-75-8',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,25%', disponivelSUS: true },
      { forma: 'colirio', concentracao: '0,5%', disponivelSUS: true },
      { forma: 'gel_topico', concentracao: '0,5% gel-forming', disponivelSUS: false },
    ],
    indicacoes: [
      'Glaucoma de angulo aberto',
      'Hipertensao ocular',
      'Glaucoma afacico',
      'Glaucoma secundario',
    ],
    mecanismoAcao: 'Betabloqueador nao-seletivo que reduz a producao de humor aquoso pelo corpo ciliar por bloqueio de receptores beta-adrenergicos. Reducao de PIO de 20-25%. Pode ser absorvido sistemicamente causando efeitos cardiovasculares e respiratorios.',
    posologias: [
      {
        indicacao: 'Glaucoma',
        adultos: {
          dose: '1 gota de 0,25% ou 0,5%',
          frequencia: '2x/dia',
          observacoes: 'Iniciar com 0,25% e aumentar se necessario. Gel-forming pode ser 1x/dia.',
        },
      },
    ],
    contraindicacoes: [
      'Asma bronquica ou historico de asma grave',
      'DPOC grave',
      'Bradicardia sinusal (<45-50 bpm)',
      'Bloqueio AV 2o ou 3o grau sem marcapasso',
      'Insuficiencia cardiaca descompensada',
      'Choque cardiogenico',
    ],
    precaucoes: [
      'Absorcao sistemica pode causar efeitos cardiovasculares',
      'Pode mascarar sinais de hipoglicemia',
      'Exacerbar miastenia gravis',
      'Suspensao abrupta pode precipitar angina',
      'Ocluir ponto lacrimal apos aplicacao para reduzir absorcao sistemica',
    ],
    efeitosAdversos: {
      comuns: ['Ardor/queimacao transitoria', 'Visao borrada', 'Ceratite punctata'],
      graves: ['Broncoespasmo', 'Bradicardia', 'Hipotensao', 'Bloqueio cardiaco', 'Depressao', 'Fadiga'],
    },
    interacoes: [
      {
        medicamento: 'Beta-agonistas (sistemicos ou inalatorios)',
        gravidade: 'moderada',
        efeito: 'Antagonismo farmacologico',
        conduta: 'Usar com cautela em asmaticos',
      },
      {
        medicamento: 'Verapamil, diltiazem',
        gravidade: 'grave',
        efeito: 'Bradicardia e bloqueio AV',
        conduta: 'Evitar combinacao ou monitorar rigorosamente',
      },
      {
        medicamento: 'Insulina e hipoglicemiantes',
        gravidade: 'moderada',
        efeito: 'Pode mascarar sintomas de hipoglicemia',
        conduta: 'Monitorar glicemia em diabeticos',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar - excretado no leite; risco para lactente' },
    monitorizacao: [
      'PIO',
      'FC e PA (especialmente no inicio)',
      'Sintomas respiratorios',
      'Glicemia em diabeticos',
    ],
    orientacoesPaciente: [
      'Comprimir canto interno do olho apos aplicacao (1-2 min)',
      'Informar medicos sobre uso - pode interferir em cirurgias',
      'Relatar falta de ar, tontura, palpitacoes',
      'Nao suspender abruptamente',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de efeitos sistemicos; considerar betaxolol seletivo',
      hepatopatas: 'Metabolismo hepatico - cautela',
    },
    doencasRelacionadas: ['glaucoma', 'hipertensao-ocular'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['timolol', 'betabloqueador', 'glaucoma', 'Timoptol', 'RENAME'],
  },

  // =============================================================================
  // ALPHA-AGONIST FOR GLAUCOMA
  // =============================================================================
  {
    id: 'brimonidina-avancado',
    nomeGenerico: 'Brimonidina',
    nomesComerciais: ['Alphagan', 'Alphagan P', 'Brimotil'],
    atcCode: 'S01EA05',
    rxNormCui: '83057',
    drugBankId: 'DB00484',
    snomedCT: '108450002',
    casNumber: '59803-98-4',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'agonista_alfa2',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,1%', disponivelSUS: false },
      { forma: 'colirio', concentracao: '0,15%', disponivelSUS: false },
      { forma: 'colirio', concentracao: '0,2%', disponivelSUS: false },
    ],
    indicacoes: [
      'Glaucoma de angulo aberto',
      'Hipertensao ocular',
      'Prevencao de picos de PIO apos laser',
      'Adjuvante a outros anti-glaucomatosos',
    ],
    mecanismoAcao: 'Agonista alfa-2 adrenergico altamente seletivo. Reduz producao de humor aquoso e aumenta drenagem uveoescleral. Reducao de PIO de 18-25%. Formulacao P (0,15%) contem Purite em vez de benzalconio - melhor tolerada. Pode ter propriedades neuroprotetoras teoricas.',
    posologias: [
      {
        indicacao: 'Glaucoma',
        adultos: {
          dose: '1 gota no olho afetado',
          frequencia: '2-3x/dia',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a brimonidina ou clonidina',
      'Uso de IMAOs',
      'Criancas < 2 anos (risco de depressao SNC grave)',
    ],
    precaucoes: [
      'Sonolencia e fadiga em idosos',
      'Pode causar depressao respiratoria em criancas',
      'Cautela em doenca cardiovascular',
      'Pode causar secura bucal',
      'Alergia ocular tardia em 10-20% dos pacientes (uso prolongado)',
    ],
    efeitosAdversos: {
      comuns: ['Hiperemia conjuntival', 'Prurido ocular', 'Boca seca', 'Sonolencia/fadiga', 'Visao borrada', 'Foliculose conjuntival'],
      graves: ['Depressao SNC em criancas', 'Sincope', 'Bradicardia', 'Hipotensao'],
    },
    interacoes: [
      {
        medicamento: 'IMAOs',
        gravidade: 'contraindicada',
        efeito: 'Risco de crise hipertensiva',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Antidepressivos triciclicos',
        gravidade: 'moderada',
        efeito: 'Reducao da eficacia hipotensora da brimonidina',
        conduta: 'Monitorar PIO',
      },
      {
        medicamento: 'Depressores do SNC',
        gravidade: 'moderada',
        efeito: 'Efeito sedativo aditivo',
        conduta: 'Cautela ao dirigir',
      },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Excrecao desconhecida - evitar' },
    monitorizacao: [
      'PIO',
      'Sinais de alergia ocular (dermatite de contato)',
      'Sonolencia',
    ],
    orientacoesPaciente: [
      'Pode causar sonolencia - cuidado ao dirigir',
      'Boca seca e comum',
      'Se desenvolver coceira/vermelhidao prolongada, pode ser alergia',
      'Formulacao P geralmente melhor tolerada',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de fadiga/tontura; monitorar',
      pediatrico: 'Contraindicado < 2 anos; cautela em criancas maiores',
    },
    doencasRelacionadas: ['glaucoma', 'hipertensao-ocular'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['brimonidina', 'alfa-agonista', 'glaucoma', 'Alphagan'],
  },

  // =============================================================================
  // CARBONIC ANHYDRASE INHIBITOR FOR GLAUCOMA
  // =============================================================================
  {
    id: 'dorzolamida-avancado',
    nomeGenerico: 'Dorzolamida',
    nomesComerciais: ['Trusopt', 'Cosopt (combinado)'],
    atcCode: 'S01EC03',
    rxNormCui: '39515',
    drugBankId: 'DB00869',
    snomedCT: '372888001',
    casNumber: '120279-96-1',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'inibidor_anidrase_carbonica',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '2%', disponivelSUS: false },
    ],
    indicacoes: [
      'Glaucoma de angulo aberto',
      'Hipertensao ocular',
      'Adjuvante a betabloqueadores ou prostaglandinas',
    ],
    mecanismoAcao: 'Inibidor toopico da anidrase carbonica II, a isoenzima predominante no corpo ciliar. Reduz a producao de humor aquoso por diminuicao da secrecao de bicarbonato. Reducao de PIO de 15-20%. Alternativa topica a acetazolamida oral sem efeitos sistemicos tao pronunciados.',
    posologias: [
      {
        indicacao: 'Glaucoma',
        adultos: {
          dose: '1 gota no olho afetado',
          frequencia: '3x/dia (monoterapia) ou 2x/dia (combinado)',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a dorzolamida ou sulfonamidas',
      'IR grave (ClCr < 30 mL/min) - dados limitados',
    ],
    precaucoes: [
      'Reacao cruzada com alergia a sulfonamidas',
      'Pode acumular em pacientes com IR',
      'Ceratite punctata',
      'Risco raro de sindrome de Stevens-Johnson',
    ],
    efeitosAdversos: {
      comuns: ['Disgeusia (gosto amargo/metalico)', 'Ardor/queimacao', 'Visao borrada transitoria', 'Ceratite punctata', 'Conjuntivite'],
      graves: ['Sindrome de Stevens-Johnson (muito raro)', 'Agranulocitose (muito raro)', 'Nefrolitiase'],
    },
    interacoes: [
      {
        medicamento: 'Acetazolamida oral',
        gravidade: 'moderada',
        efeito: 'Efeito aditivo - maior risco de efeitos sistemicos',
        conduta: 'Evitar uso concomitante prolongado',
      },
      {
        medicamento: 'Salicilatos em altas doses',
        gravidade: 'moderada',
        efeito: 'Potencial toxicidade por competicao de ligacao',
        conduta: 'Monitorar',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Dados limitados - usar com cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Potencial de efeitos adversos no lactente' },
    monitorizacao: [
      'PIO',
      'Superficie ocular (ceratite)',
      'Funcao renal se uso prolongado',
    ],
    orientacoesPaciente: [
      'Gosto amargo na boca e comum',
      'Se alergia a sulfas, informar medico',
      'Aguardar 10 min entre diferentes colirios',
    ],
    consideracoesEspeciais: {
      idosos: 'Monitorar funcao renal',
      hepatopatas: 'Cautela - metabolismo hepatico parcial',
    },
    doencasRelacionadas: ['glaucoma', 'hipertensao-ocular'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['dorzolamida', 'CAI', 'inibidor-anidrase-carbonica', 'glaucoma', 'Trusopt'],
  },

  // =============================================================================
  // ROCK INHIBITOR FOR GLAUCOMA
  // =============================================================================
  {
    id: 'netarsudil',
    nomeGenerico: 'Netarsudil',
    nomesComerciais: ['Rhopressa'],
    atcCode: 'S01EX99',
    rxNormCui: '2047650',
    drugBankId: 'DB11817',
    snomedCT: '786094004',
    casNumber: '1253952-02-3',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,02%', disponivelSUS: false },
    ],
    indicacoes: [
      'Glaucoma de angulo aberto',
      'Hipertensao ocular',
    ],
    mecanismoAcao: 'Inibidor da Rho-quinase (ROCK) e inibidor do transportador de norepinefrina. Primeiro da classe aprovado para glaucoma. Aumenta a drenagem pelo trabeculado (via convencional) - diferente das prostaglandinas. Reduz PIO em 16-20%. Reducao adicional em pacientes ja em uso de outras classes. Estudos ROCKET demonstraram eficacia.',
    posologias: [
      {
        indicacao: 'Glaucoma/Hipertensao ocular',
        adultos: {
          dose: '1 gota no olho afetado',
          frequencia: '1x/dia a noite',
          observacoes: 'Nao usar mais de 1x/dia. Aplicar a noite minimiza hiperemia.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao netarsudil ou componentes',
    ],
    precaucoes: [
      'Hiperemia conjuntival muito comum (>50%)',
      'Depositos corneanos (verticillata) reversiveis',
      'Alteracoes palpebrais',
    ],
    efeitosAdversos: {
      comuns: ['Hiperemia conjuntival (50-60%)', 'Verticillata corneana', 'Instilacao dolorosa', 'Hemorragia conjuntival', 'Eritema palpebral'],
      graves: ['Erosao corneana (raro)'],
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorcao sistemica minima' },
    monitorizacao: [
      'PIO',
      'Superficie ocular',
      'Depositos corneanos (geralmente assintomaticos)',
    ],
    orientacoesPaciente: [
      'Hiperemia (olho vermelho) e muito comum - geralmente melhora com o tempo',
      'Aplicar a noite para minimizar vermelhidao diurna',
      'Depositos na cornea sao reversiveis e geralmente nao afetam visao',
      'Mecanismo diferente - pode ser usado com prostaglandinas',
    ],
    consideracoesEspeciais: {
      idosos: 'Populacao alvo; sem ajuste especifico',
    },
    doencasRelacionadas: ['glaucoma', 'hipertensao-ocular'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['netarsudil', 'ROCK-inhibitor', 'Rho-quinase', 'glaucoma', 'Rhopressa', 'ROCKET'],
  },

  // =============================================================================
  // CYCLOSPORINE OPHTHALMIC FOR DRY EYE
  // =============================================================================
  {
    id: 'ciclosporina-oftalmico',
    nomeGenerico: 'Ciclosporina Oftalmico',
    nomesComerciais: ['Restasis', 'Cequa', 'Ikervis'],
    atcCode: 'S01XA18',
    rxNormCui: '749776',
    drugBankId: 'DB00091',
    snomedCT: '387467008',
    casNumber: '59865-13-3',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'inibidor_calcineurina',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,05% (Restasis)', disponivelSUS: false },
      { forma: 'colirio', concentracao: '0,09% (Cequa)', disponivelSUS: false },
      { forma: 'colirio', concentracao: '0,1% (Ikervis)', disponivelSUS: false },
    ],
    indicacoes: [
      'Doenca do olho seco (ceratoconjuntivite seca)',
      'Sindrome de Sjogren',
      'Olho seco secundario a doenca do enxerto vs hospedeiro',
      'Aumento da producao lacrimal em pacientes com inflamacao ocular',
    ],
    mecanismoAcao: 'Imunossupressor inibidor da calcineurina que suprime a ativacao de celulas T na superficie ocular. Reduz a inflamacao cronica na glandula lacrimal e conjuntiva. Pode aumentar a producao de lagrimas endogenas e a densidade de celulas caliciformes. Efeito maximo apos 3-6 meses de uso.',
    posologias: [
      {
        indicacao: 'Olho seco',
        adultos: {
          dose: '1 gota em cada olho',
          frequencia: '2x/dia (12/12h)',
          observacoes: 'Efeito pleno pode levar 3-6 meses. Continuar uso de lagrimas artificiais conforme necessario. Inverter frasco unico antes de usar.',
        },
      },
    ],
    contraindicacoes: [
      'Infeccao ocular ativa',
      'Hipersensibilidade a ciclosporina',
    ],
    precaucoes: [
      'Nao usar com lentes de contato (remover antes)',
      'Ardor inicial pode ser significativo',
      'Pode aumentar risco de infeccao ocular',
      'Evitar em imunossuprimidos sem avaliacao',
    ],
    efeitosAdversos: {
      comuns: ['Ardor/queimacao na instilacao (17-30%)', 'Hiperemia conjuntival', 'Lacrimejamento', 'Prurido', 'Sensacao de corpo estranho'],
      graves: ['Infeccao ocular (raro)', 'Herpes ocular (muito raro)'],
    },
    interacoes: [
      {
        medicamento: 'Colirios com conservantes',
        gravidade: 'leve',
        efeito: 'Pode aumentar irritacao',
        conduta: 'Aguardar 15 minutos entre aplicacoes',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorcao sistemica minima' },
    monitorizacao: [
      'Sintomas de olho seco (questionarios OSDI)',
      'Coloracao com fluoresceina/lissamina',
      'Teste de Schirmer',
      'Tempo de ruptura do filme lacrimal (BUT)',
    ],
    orientacoesPaciente: [
      'Ardor inicial e comum - geralmente melhora com o tempo',
      'Pode levar 3-6 meses para efeito maximo',
      'Continuar lagrimas artificiais',
      'Remover lentes de contato 15 min antes',
      'Virar frasco unitario antes de usar',
    ],
    consideracoesEspeciais: {
      idosos: 'Populacao frequente; sem ajuste',
    },
    doencasRelacionadas: ['olho-seco', 'sindrome-sjogren', 'ceratoconjuntivite-seca'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['ciclosporina', 'olho-seco', 'Restasis', 'Cequa', 'ceratoconjuntivite-seca', 'imunossupressor'],
  },
];
