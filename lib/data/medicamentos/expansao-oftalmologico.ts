/**
 * EXPANSÃO OFTALMOLÓGICA - DARWIN-MFC
 * ====================================
 *
 * Medicamentos oftalmológicos essenciais para APS e uso comum.
 * Inclui colírios antibióticos, anti-glaucomatosos, lubrificantes.
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosOftalmologicos: Partial<Medicamento>[] = [
  // ============================================================================
  // ANTIBIÓTICOS OFTÁLMICOS
  // ============================================================================
  {
    id: 'ciprofloxacino-colirio',
    nomeGenerico: 'Ciprofloxacino Colírio',
    nomesComerciais: ['Ciloxan', 'Biamotil'],
    atcCode: 'S01AE03',
    classeTerapeutica: 'antibiotico',
    subclasse: 'fluoroquinolona',
    rename: true,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,3%', disponivelSUS: true }
    ],
    indicacoes: ['Conjuntivite bacteriana', 'Ceratite bacteriana', 'Úlcera de córnea'],
    mecanismoAcao: 'Fluoroquinolona que inibe DNA-girase e topoisomerase IV bacteriana.',
    posologias: [
      {
        indicacao: 'Conjuntivite',
        adultos: { dose: '1-2 gotas no olho afetado', frequencia: '4x/dia por 7 dias' },
        pediatrico: { dose: '1 gota no olho afetado', frequencia: '4x/dia por 7 dias', idadeMinima: '1 ano' }
      },
      {
        indicacao: 'Úlcera córnea',
        adultos: { dose: '2 gotas', frequencia: 'A cada 15min por 6h, depois 4-6x/dia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade a quinolonas'],
    efeitosAdversos: {
      comuns: ['Ardor transitório', 'Desconforto ocular'],
      graves: ['Superinfecção', 'Ceratite fúngica (raro)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorção sistêmica mínima' }
  },

  {
    id: 'tobramicina-colirio',
    nomeGenerico: 'Tobramicina Colírio',
    nomesComerciais: ['Tobrex', 'Tobra'],
    atcCode: 'S01AA12',
    classeTerapeutica: 'antibiotico',
    subclasse: 'topico',
    rename: true,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,3%', disponivelSUS: true },
      { forma: 'pomada', concentracao: '0,3%', disponivelSUS: false }
    ],
    indicacoes: ['Conjuntivite bacteriana', 'Blefarite', 'Dacriocistite'],
    mecanismoAcao: 'Aminoglicosídeo que inibe síntese proteica bacteriana.',
    posologias: [
      {
        indicacao: 'Conjuntivite',
        adultos: { dose: '1-2 gotas no olho afetado', frequencia: '4x/dia por 7-10 dias' },
        pediatrico: { dose: '1 gota no olho afetado', frequencia: '4x/dia por 7 dias', idadeMinima: '2 meses' }
      }
    ],
    contraindicacoes: ['Alergia a aminoglicosídeos'],
    efeitosAdversos: {
      comuns: ['Irritação local', 'Prurido'],
      graves: ['Hipersensibilidade']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Uso tópico seguro' }
  },

  {
    id: 'ofloxacino-colirio',
    nomeGenerico: 'Ofloxacino Colírio',
    nomesComerciais: ['Oflox', 'Floxstat'],
    atcCode: 'S01AE01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'fluoroquinolona',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,3%', disponivelSUS: false }
    ],
    indicacoes: ['Conjuntivite bacteriana', 'Ceratite', 'Profilaxia pós-operatória'],
    mecanismoAcao: 'Fluoroquinolona com amplo espectro antibacteriano.',
    posologias: [
      {
        indicacao: 'Conjuntivite',
        adultos: { dose: '1-2 gotas', frequencia: '4x/dia por 7 dias' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade a quinolonas'],
    efeitosAdversos: {
      comuns: ['Ardor', 'Visão borrada transitória'],
      graves: ['Toxicidade epitelial (uso prolongado)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorção mínima' }
  },

  // ============================================================================
  // ANTI-INFLAMATÓRIOS OFTÁLMICOS
  // ============================================================================
  {
    id: 'dexametasona-colirio',
    nomeGenerico: 'Dexametasona Colírio',
    nomesComerciais: ['Maxidex', 'Dexafenicol'],
    atcCode: 'S01BA01',
    classeTerapeutica: 'corticosteroide',
    subclasse: 'glicocorticoide',
    rename: true,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,1%', disponivelSUS: true }
    ],
    indicacoes: ['Inflamação pós-operatória', 'Uveíte anterior', 'Conjuntivite alérgica grave'],
    mecanismoAcao: 'Corticosteroide potente que suprime resposta inflamatória ocular.',
    posologias: [
      {
        indicacao: 'Inflamação ocular',
        adultos: { dose: '1-2 gotas no olho afetado', frequencia: '4-6x/dia, reduzindo gradualmente' }
      }
    ],
    contraindicacoes: ['Infecção ocular ativa (viral, fúngica)', 'Glaucoma não controlado', 'Ceratite herpética'],
    precaucoes: ['Monitorar PIO', 'Uso prolongado aumenta risco de catarata', 'Pode mascarar infecções'],
    efeitosAdversos: {
      comuns: ['Ardor', 'Visão borrada'],
      graves: ['Aumento PIO', 'Catarata subcapsular posterior', 'Perfuração córnea (uso prolongado)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso curto' }
  },

  {
    id: 'prednisolona-colirio',
    nomeGenerico: 'Prednisolona Acetato Colírio',
    nomesComerciais: ['Pred Fort', 'Predfort'],
    atcCode: 'S01BA04',
    classeTerapeutica: 'corticosteroide',
    subclasse: 'glicocorticoide',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '1%', disponivelSUS: false }
    ],
    indicacoes: ['Inflamação ocular', 'Uveíte', 'Pós-operatório cirurgia ocular'],
    mecanismoAcao: 'Corticosteroide com alta penetração ocular.',
    posologias: [
      {
        indicacao: 'Uveíte/Inflamação',
        adultos: { dose: '1-2 gotas', frequencia: '4-6x/dia, reduzindo gradualmente' }
      }
    ],
    contraindicacoes: ['Infecção viral ocular', 'Glaucoma', 'Úlcera córnea ativa'],
    efeitosAdversos: {
      comuns: ['Desconforto', 'Visão borrada'],
      graves: ['Glaucoma', 'Catarata']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorção mínima' }
  },

  {
    id: 'diclofenaco-colirio',
    nomeGenerico: 'Diclofenaco Colírio',
    nomesComerciais: ['Voltaren Ophtha', 'Still'],
    atcCode: 'S01BC03',
    classeTerapeutica: 'aine',
    subclasse: 'nao_seletivo',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,1%', disponivelSUS: false }
    ],
    indicacoes: ['Inflamação pós-operatória', 'Prevenção miose transoperatória', 'Edema macular cistoide'],
    mecanismoAcao: 'AINE que inibe cicloxigenase, reduzindo prostaglandinas oculares.',
    posologias: [
      {
        indicacao: 'Pós-operatório',
        adultos: { dose: '1 gota', frequencia: '4x/dia por 2-4 semanas' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade a AINEs', 'Ceratite herpética'],
    efeitosAdversos: {
      comuns: ['Ardor', 'Irritação'],
      graves: ['Retardo cicatrização córnea', 'Adelgaçamento corneal (raro)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso tópico' }
  },

  // ============================================================================
  // ANTI-GLAUCOMATOSOS
  // ============================================================================
  {
    id: 'timolol-colirio',
    nomeGenerico: 'Timolol Colírio',
    nomesComerciais: ['Timoptol', 'Nyolol'],
    atcCode: 'S01ED01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,5%', disponivelSUS: true },
      { forma: 'colirio', concentracao: '0,25%', disponivelSUS: true }
    ],
    indicacoes: ['Glaucoma de ângulo aberto', 'Hipertensão ocular'],
    mecanismoAcao: 'Betabloqueador não-seletivo que reduz produção de humor aquoso.',
    posologias: [
      {
        indicacao: 'Glaucoma',
        adultos: { dose: '1 gota no olho afetado', frequencia: '2x/dia' }
      }
    ],
    contraindicacoes: ['Asma', 'DPOC grave', 'Bradicardia sinusal', 'BAV 2º/3º grau', 'IC descompensada'],
    precaucoes: ['Pode ser absorvido sistemicamente', 'Monitorar FC e PA', 'Cuidado em diabéticos'],
    efeitosAdversos: {
      comuns: ['Ardor ocular', 'Ceratite punctata'],
      graves: ['Broncoespasmo', 'Bradicardia', 'Hipotensão', 'Depressão']
    },
    interacoes: [
      { medicamento: 'Beta-agonistas', gravidade: 'moderada', efeito: 'Antagonismo de efeitos', conduta: 'Avaliar alternativas' },
      { medicamento: 'Verapamil', gravidade: 'grave', efeito: 'Bradicardia severa', conduta: 'Evitar associação' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar ou usar com cautela' }
  },

  {
    id: 'latanoprosta',
    nomeGenerico: 'Latanoprosta',
    nomesComerciais: ['Xalatan', 'Latanost'],
    atcCode: 'S01EE01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,005%', disponivelSUS: false }
    ],
    indicacoes: ['Glaucoma de ângulo aberto', 'Hipertensão ocular'],
    mecanismoAcao: 'Análogo de prostaglandina F2α que aumenta drenagem uveoescleral.',
    posologias: [
      {
        indicacao: 'Glaucoma',
        adultos: { dose: '1 gota no olho afetado', frequencia: '1x/dia à noite' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Pode escurecer íris permanentemente', 'Aumenta crescimento cílios', 'Edema macular (afácicos)'],
    efeitosAdversos: {
      comuns: ['Hiperemia conjuntival', 'Escurecimento íris', 'Crescimento cílios'],
      graves: ['Edema macular', 'Uveíte']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso com cautela' }
  },

  {
    id: 'brimonidina-colirio',
    nomeGenerico: 'Brimonidina Colírio',
    nomesComerciais: ['Alphagan', 'Brimotil'],
    atcCode: 'S01EA05',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'alfabloqueador',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,2%', disponivelSUS: false },
      { forma: 'colirio', concentracao: '0,15%', disponivelSUS: false }
    ],
    indicacoes: ['Glaucoma de ângulo aberto', 'Hipertensão ocular'],
    mecanismoAcao: 'Agonista alfa-2 que reduz produção e aumenta drenagem humor aquoso.',
    posologias: [
      {
        indicacao: 'Glaucoma',
        adultos: { dose: '1 gota', frequencia: '2-3x/dia' }
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'Crianças < 2 anos'],
    precaucoes: ['Pode causar fadiga', 'Depressão SNC em crianças'],
    efeitosAdversos: {
      comuns: ['Hiperemia', 'Prurido', 'Boca seca', 'Sonolência'],
      graves: ['Hipotensão', 'Síncope']
    },
    interacoes: [
      { medicamento: 'IMAOs', gravidade: 'grave', efeito: 'Crise hipertensiva', conduta: 'Contraindicado' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Excreção desconhecida' }
  },

  {
    id: 'dorzolamida-colirio',
    nomeGenerico: 'Dorzolamida Colírio',
    nomesComerciais: ['Trusopt', 'Dorzol'],
    atcCode: 'S01EC03',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '2%', disponivelSUS: false }
    ],
    indicacoes: ['Glaucoma', 'Hipertensão ocular'],
    mecanismoAcao: 'Inibidor da anidrase carbônica que reduz produção de humor aquoso.',
    posologias: [
      {
        indicacao: 'Glaucoma',
        adultos: { dose: '1 gota', frequencia: '3x/dia' }
      }
    ],
    contraindicacoes: ['Alergia a sulfonamidas', 'IR grave'],
    precaucoes: ['Reação cruzada com sulfonamidas'],
    efeitosAdversos: {
      comuns: ['Disgeusia (gosto amargo)', 'Ardor', 'Ceratite punctata'],
      graves: ['Síndrome Stevens-Johnson (raro)', 'Anemia aplástica']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Potencial toxicidade' }
  },

  // ============================================================================
  // LUBRIFICANTES OCULARES
  // ============================================================================
  {
    id: 'carmellose-colirio',
    nomeGenerico: 'Carmelose Sódica Colírio',
    nomesComerciais: ['Refresh', 'Optive'],
    atcCode: 'S01XA20',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,5%', disponivelSUS: true },
      { forma: 'colirio', concentracao: '1%', disponivelSUS: true }
    ],
    indicacoes: ['Olho seco', 'Síndrome de Sjögren', 'Uso de lentes de contato', 'Lubrificação ocular'],
    mecanismoAcao: 'Polímero que forma filme protetor na superfície ocular.',
    posologias: [
      {
        indicacao: 'Olho seco',
        adultos: { dose: '1-2 gotas', frequencia: 'Conforme necessidade (4-6x/dia)' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade aos componentes'],
    efeitosAdversos: {
      comuns: ['Visão borrada transitória'],
      graves: ['Raro']
    },
    interacoes: [],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Sem restrições' }
  },

  {
    id: 'hipromelose-colirio',
    nomeGenerico: 'Hipromelose Colírio',
    nomesComerciais: ['Lacril', 'Tears Naturale'],
    atcCode: 'S01XA20',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,3%', disponivelSUS: false }
    ],
    indicacoes: ['Olho seco', 'Lubrificação ocular'],
    mecanismoAcao: 'Derivado de celulose que substitui filme lacrimal.',
    posologias: [
      {
        indicacao: 'Olho seco',
        adultos: { dose: '1-2 gotas', frequencia: 'Conforme necessidade' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Borramento visual transitório'],
      graves: ['Muito raro']
    },
    interacoes: [],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  // ============================================================================
  // ANTIALÉRGICOS OFTÁLMICOS
  // ============================================================================
  {
    id: 'olopatadina-colirio',
    nomeGenerico: 'Olopatadina Colírio',
    nomesComerciais: ['Patanol', 'Olopat'],
    atcCode: 'S01GX09',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,1%', disponivelSUS: false },
      { forma: 'colirio', concentracao: '0,2%', disponivelSUS: false }
    ],
    indicacoes: ['Conjuntivite alérgica', 'Ceratoconjuntivite alérgica'],
    mecanismoAcao: 'Anti-histamínico H1 seletivo com estabilização de mastócitos.',
    posologias: [
      {
        indicacao: 'Conjuntivite alérgica',
        adultos: { dose: '1 gota', frequencia: '2x/dia (0,1%) ou 1x/dia (0,2%)' },
        pediatrico: { dose: '1 gota', frequencia: '2x/dia', idadeMinima: '3 anos' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Ardor transitório'],
      graves: ['Raro']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Usar com cautela' }
  },

  {
    id: 'cetotifeno-colirio',
    nomeGenerico: 'Cetotifeno Colírio',
    nomesComerciais: ['Zaditen', 'Alerkoft'],
    atcCode: 'S01GX08',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: '0,025%', disponivelSUS: false }
    ],
    indicacoes: ['Conjuntivite alérgica'],
    mecanismoAcao: 'Anti-histamínico com estabilização de mastócitos.',
    posologias: [
      {
        indicacao: 'Conjuntivite alérgica',
        adultos: { dose: '1 gota', frequencia: '2x/dia' },
        pediatrico: { dose: '1 gota', frequencia: '2x/dia', idadeMinima: '3 anos' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Irritação ocular', 'Cefaleia'],
      graves: ['Raro']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso com cautela' }
  },

  // ============================================================================
  // MIDRIÁTICOS/CICLOPLÉGICOS
  // ============================================================================
  {
    id: 'tropicamida-colirio',
    nomeGenerico: 'Tropicamida Colírio',
    nomesComerciais: ['Mydriacyl', 'Tropicil'],
    atcCode: 'S01FA06',
    classeTerapeutica: 'outros',
    subclasse: 'anticolinergico',
    rename: true,
    apresentacoes: [
      { forma: 'colirio', concentracao: '1%', disponivelSUS: true },
      { forma: 'colirio', concentracao: '0,5%', disponivelSUS: true }
    ],
    indicacoes: ['Midríase diagnóstica', 'Fundoscopia', 'Cicloplegia para refração'],
    mecanismoAcao: 'Anticolinérgico que bloqueia músculo esfíncter pupilar e músculo ciliar.',
    posologias: [
      {
        indicacao: 'Midríase',
        adultos: { dose: '1-2 gotas', frequencia: '15-20 min antes do exame' }
      }
    ],
    contraindicacoes: ['Glaucoma de ângulo fechado', 'Câmara anterior rasa'],
    precaucoes: ['Verificar ângulo antes', 'Efeito dura 4-6h'],
    efeitosAdversos: {
      comuns: ['Fotofobia', 'Visão borrada'],
      graves: ['Crise glaucoma ângulo fechado', 'Efeitos anticolinérgicos sistêmicos']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Dose única' }
  },

  {
    id: 'fenilefrina-colirio',
    nomeGenerico: 'Fenilefrina Colírio',
    nomesComerciais: ['Fenilefrina', 'Neo-Synephrine'],
    atcCode: 'S01FB01',
    classeTerapeutica: 'outros',
    subclasse: 'simpatomimetico',
    rename: true,
    apresentacoes: [
      { forma: 'colirio', concentracao: '10%', disponivelSUS: true },
      { forma: 'colirio', concentracao: '2,5%', disponivelSUS: true }
    ],
    indicacoes: ['Midríase diagnóstica', 'Vasoconstricção conjuntival'],
    mecanismoAcao: 'Simpatomimético alfa-1 que contrai músculo dilatador pupilar.',
    posologias: [
      {
        indicacao: 'Midríase',
        adultos: { dose: '1 gota (2,5% ou 10%)', frequencia: 'Pode repetir 1x após 5-10min' }
      }
    ],
    contraindicacoes: ['Glaucoma ângulo fechado', 'HAS grave não controlada'],
    precaucoes: ['Usar 2,5% em idosos/cardiopatas', 'Risco cardiovascular com 10%'],
    efeitosAdversos: {
      comuns: ['Ardor', 'Fotofobia'],
      graves: ['HAS', 'Arritmias', 'AVC (doses altas)', 'IAM']
    },
    interacoes: [
      { medicamento: 'IMAOs', gravidade: 'grave', efeito: 'Crise hipertensiva', conduta: 'Evitar 21 dias após IMAO' },
      { medicamento: 'Tricíclicos', gravidade: 'moderada', efeito: 'Potencialização', conduta: 'Usar dose menor' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Dose única' }
  },

  // ============================================================================
  // COMBINAÇÕES
  // ============================================================================
  {
    id: 'tobramicina-dexametasona-colirio',
    nomeGenerico: 'Tobramicina + Dexametasona Colírio',
    nomesComerciais: ['Tobradex', 'Dexatobra'],
    atcCode: 'S01CA01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'topico',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: 'Tobramicina 0,3% + Dexametasona 0,1%', disponivelSUS: false },
      { forma: 'pomada', concentracao: 'Tobramicina 0,3% + Dexametasona 0,1%', disponivelSUS: false }
    ],
    indicacoes: ['Blefaroconjuntivite bacteriana', 'Pós-operatório cirurgia ocular'],
    mecanismoAcao: 'Antibiótico aminoglicosídeo + corticosteroide anti-inflamatório.',
    posologias: [
      {
        indicacao: 'Blefaroconjuntivite',
        adultos: { dose: '1-2 gotas', frequencia: '4-6x/dia por 7-10 dias' }
      }
    ],
    contraindicacoes: ['Infecção viral/fúngica ocular', 'Glaucoma', 'Ceratite herpética'],
    efeitosAdversos: {
      comuns: ['Ardor', 'Prurido'],
      graves: ['Aumento PIO', 'Catarata', 'Superinfecção']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso limitado' }
  },

  {
    id: 'timolol-dorzolamida',
    nomeGenerico: 'Timolol + Dorzolamida Colírio',
    nomesComerciais: ['Cosopt', 'Duotrav'],
    atcCode: 'S01ED51',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: false,
    apresentacoes: [
      { forma: 'colirio', concentracao: 'Timolol 0,5% + Dorzolamida 2%', disponivelSUS: false }
    ],
    indicacoes: ['Glaucoma de ângulo aberto', 'Hipertensão ocular refratária'],
    mecanismoAcao: 'Betabloqueador + inibidor anidrase carbônica para sinergismo hipotensor.',
    posologias: [
      {
        indicacao: 'Glaucoma',
        adultos: { dose: '1 gota', frequencia: '2x/dia' }
      }
    ],
    contraindicacoes: ['Asma', 'DPOC', 'Bradicardia', 'BAV', 'Alergia sulfonamidas'],
    efeitosAdversos: {
      comuns: ['Ardor', 'Disgeusia', 'Cefaleia'],
      graves: ['Broncoespasmo', 'Bradicardia', 'IC']
    },
    interacoes: [
      { medicamento: 'Beta-agonistas', gravidade: 'moderada', efeito: 'Antagonismo', conduta: 'Avaliar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  }
];
