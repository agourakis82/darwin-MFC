/**
 * VITAMINAS E SUPLEMENTOS - DARWIN-MFC EXPANSAO 1000
 * ===================================================
 * Vitaminas, minerais e suplementos comuns na pratica clinica
 *
 * Referencias:
 * - Institute of Medicine (IOM) Dietary Reference Intakes
 * - Endocrine Society Guidelines (Vitamin D)
 * - ASH/AABB Guidelines (Iron)
 * - WHO Micronutrient Guidelines
 * - RENAME 2024
 */

import { Medicamento } from '@/lib/types/medicamento';

export const vitaminasSuplementos: Partial<Medicamento>[] = [
  // =============================================================================
  // VITAMINA D
  // =============================================================================
  {
    id: 'colecalciferol',
    nomeGenerico: 'Colecalciferol (Vitamina D3)',
    nomesComerciais: ['Addera D3', 'Dprev', 'Doss', 'Sany D'],
    atcCode: 'A11CC05',
    rxNormCui: '11253',
    drugBankId: 'DB00169',
    snomedCT: '419408000',
    casNumber: '67-97-0',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_d',
    rename: true,
    apresentacoes: [
      { forma: 'gotas', concentracao: '200UI/gota', disponivelSUS: true },
      { forma: 'capsula', concentracao: '1000UI', disponivelSUS: false },
      { forma: 'capsula', concentracao: '2000UI', disponivelSUS: false },
      { forma: 'capsula', concentracao: '7000UI', disponivelSUS: false },
      { forma: 'capsula', concentracao: '50000UI', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '1000UI', disponivelSUS: false },
    ],
    indicacoes: [
      'Prevencao e tratamento de deficiencia de vitamina D',
      'Prevencao de raquitismo e osteomalacia',
      'Adjuvante no tratamento de osteoporose',
      'Hipoparatireoidismo',
      'Doenca renal cronica com deficiencia de vitamina D',
    ],
    mecanismoAcao: 'Pro-hormonio convertido no figado em 25-hidroxivitamina D (calcidiol) e nos rins em 1,25-dihidroxivitamina D (calcitriol), forma ativa. Atua no receptor nuclear VDR, regulando absorcao intestinal de calcio e fosforo, mineralizacao ossea, funcao neuromuscular e modulacao imunologica.',
    posologias: [
      {
        indicacao: 'Manutencao/prevencao em adultos',
        adultos: {
          dose: '800-2000UI/dia',
          frequencia: 'Diaria',
          observacoes: 'Alvo: 25(OH)D >= 30ng/mL. Idosos, obesos e pele escura podem precisar doses maiores.',
        },
      },
      {
        indicacao: 'Tratamento de deficiencia (<20ng/mL)',
        adultos: {
          dose: '50000UI/semana por 8-12 semanas, depois 1000-2000UI/dia',
          frequencia: 'Semanal (ataque) depois diaria',
          observacoes: 'Alternativa: 6000UI/dia por 8 semanas.',
        },
      },
      {
        indicacao: 'Prevencao pediatrica',
        pediatrico: {
          dose: '400-1000UI/dia',
          frequencia: 'Diaria',
          idadeMinima: 'Nascimento',
          observacoes: 'Lactentes em aleitamento exclusivo: 400UI/dia desde o nascimento.',
        },
      },
    ],
    contraindicacoes: [
      'Hipercalcemia',
      'Hipervitaminose D',
      'Nefrolitiase calcica recorrente',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Doenca granulomatosa (sarcoidose, tuberculose) - risco de hipercalcemia',
      'Insuficiencia renal - preferir calcitriol se TFG muito baixa',
      'Uso de digitalis - hipercalcemia aumenta toxicidade',
      'Hiperfosfatemia',
    ],
    efeitosAdversos: {
      comuns: ['Geralmente bem tolerado nas doses recomendadas'],
      graves: ['Hipercalcemia (em superdosagem)', 'Nefrocalcinose', 'Nefrolitiase'],
    },
    interacoes: [
      {
        medicamento: 'Digitalis (digoxina)',
        gravidade: 'moderada',
        efeito: 'Hipercalcemia induzida por vitamina D aumenta toxicidade digitalis',
        conduta: 'Monitorar calcio e sinais de intoxicacao digitalis',
      },
      {
        medicamento: 'Tiazidicos',
        gravidade: 'moderada',
        efeito: 'Risco aumentado de hipercalcemia',
        conduta: 'Monitorar calcio serio',
      },
      {
        medicamento: 'Colestiramina, orlistat',
        gravidade: 'leve',
        efeito: 'Reducao da absorcao de vitamina D',
        conduta: 'Separar administracao',
      },
      {
        medicamento: 'Fenitoina, fenobarbital',
        gravidade: 'moderada',
        efeito: 'Aumento do catabolismo de vitamina D',
        conduta: 'Pode necessitar doses maiores de vitamina D',
      },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro; suplementacao recomendada' },
    monitorizacao: [
      '25(OH)D serica apos 3 meses de tratamento',
      'Calcio serio se doses altas',
      'Calcio urinario se historia de nefrolitiase',
    ],
    orientacoesPaciente: [
      'Tomar com refeicao para melhor absorcao (gordura)',
      'Exposicao solar moderada ajuda na producao endogena',
      'Nao exceder doses prescritas',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de deficiencia; doses de 1000-2000UI/dia frequentemente necessarias',
      pediatrico: 'Suplementacao universal para lactentes em aleitamento materno',
    },
    doencasRelacionadas: ['osteoporose', 'raquitismo', 'osteomalacia', 'hipoparatireoidismo'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['vitamina-d', 'colecalciferol', 'd3', 'osso', 'calcio', 'suplemento'],
  },

  // =============================================================================
  // VITAMINA B12
  // =============================================================================
  {
    id: 'cianocobalamina',
    nomeGenerico: 'Cianocobalamina (Vitamina B12)',
    nomesComerciais: ['Rubranova', 'Cronobê', 'Citoneurin'],
    atcCode: 'B03BA01',
    rxNormCui: '1940',
    drugBankId: 'DB00115',
    snomedCT: '419382002',
    casNumber: '68-19-9',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_im', concentracao: '1000mcg/mL', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '5000mcg/mL', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '1000mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '5000mcg', disponivelSUS: false },
      { forma: 'gotas', concentracao: '250mcg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Anemia perniciosa',
      'Deficiencia de vitamina B12 (nutricional, malabsorcao)',
      'Neuropatia por deficiencia de B12',
      'Profilaxia em gastrectomizados e resseccao ileal',
      'Uso cronico de metformina ou IBPs',
    ],
    mecanismoAcao: 'Coenzima essencial para sintese de DNA (cofator da metionina sintase e metilmalonil-CoA mutase). Participa da conversao de homocisteina em metionina e na degradacao de acidos graxos de cadeia impar. Deficiencia causa anemia megaloblastica e degeneracao combinada subaguda da medula.',
    posologias: [
      {
        indicacao: 'Anemia perniciosa / deficiencia grave',
        adultos: {
          dose: '1000mcg IM diario por 7 dias, depois semanal por 4 semanas, depois mensal',
          frequencia: 'Variavel conforme fase',
          observacoes: 'Manutencao: 1000mcg IM mensal por toda vida em anemia perniciosa.',
        },
      },
      {
        indicacao: 'Deficiencia leve a moderada (oral)',
        adultos: {
          dose: '1000-2000mcg/dia VO',
          frequencia: 'Diaria',
          observacoes: 'Via oral eficaz mesmo em anemia perniciosa (absorcao passiva de 1%).',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a cianocobalamina ou cobalto',
      'Doenca de Leber (neuropatia optica hereditaria) - pode causar atrofia optica',
    ],
    precaucoes: [
      'Hipocalemia pode ocorrer com correcao rapida (monitorar K+)',
      'Nao mascara anemia com acido folico isolado (risco neurologico)',
      'Policitemia vera - pode exacerbar',
    ],
    efeitosAdversos: {
      comuns: ['Dor no local da injecao', 'Diarreia leve', 'Prurido'],
      graves: ['Anafilaxia (rara)', 'Hipocalemia (correcao rapida da anemia)'],
    },
    interacoes: [
      {
        medicamento: 'Metformina',
        gravidade: 'moderada',
        efeito: 'Metformina reduz absorcao de B12',
        conduta: 'Monitorar B12 em uso cronico; suplementar se necessario',
      },
      {
        medicamento: 'IBPs (omeprazol, pantoprazol)',
        gravidade: 'leve',
        efeito: 'Reducao da liberacao de B12 dos alimentos',
        conduta: 'Monitorar B12 em uso prolongado',
      },
      {
        medicamento: 'Colchicina',
        gravidade: 'leve',
        efeito: 'Pode reduzir absorcao de B12',
        conduta: 'Monitorar se uso cronico',
      },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro e importante para lactantes vegetarianas' },
    monitorizacao: [
      'B12 serica apos 1-2 meses de tratamento',
      'Hemograma (resposta reticulocitaria em 5-7 dias)',
      'Potassio serio nos primeiros dias de tratamento de anemia grave',
      'Sintomas neurologicos (melhora mais lenta que anemia)',
    ],
    orientacoesPaciente: [
      'Injecoes mensais sao necessarias por toda vida na anemia perniciosa',
      'Via oral pode ser opcao se absorcao intestinal preservada',
      'Sintomas neurologicos podem demorar meses para melhorar',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior prevalencia de deficiencia; rastrear em demencia, neuropatia',
    },
    doencasRelacionadas: ['anemia-megaloblastica', 'anemia-perniciosa', 'neuropatia-periferica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['vitamina-b12', 'cianocobalamina', 'anemia', 'perniciosa', 'megaloblastica', 'neuropatia'],
  },

  // =============================================================================
  // ACIDO FOLICO
  // =============================================================================
  {
    id: 'acido-folico',
    nomeGenerico: 'Acido folico (Vitamina B9)',
    nomesComerciais: ['Folicil', 'Folacin', 'Endofolin'],
    atcCode: 'B03BB01',
    rxNormCui: '4511',
    drugBankId: 'DB00158',
    snomedCT: '63718003',
    casNumber: '59-30-3',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '0,4mg', disponivelSUS: false },
      { forma: 'solucao_oral', concentracao: '0,2mg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Anemia megaloblastica por deficiencia de folato',
      'Prevencao de defeitos do tubo neural (suplementacao periconcepcional)',
      'Hiper-homocisteinemia',
      'Suplementacao em uso de metotrexato',
      'Anemia hemolitica cronica',
      'Gestacao e lactacao',
    ],
    mecanismoAcao: 'Precursor do tetraidrofolato (THF), coenzima essencial para transferencia de unidades de carbono na sintese de purinas e timidilato (DNA). Participa do ciclo da metionina, convertendo homocisteina em metionina. Deficiencia causa anemia megaloblastica e defeitos do tubo neural.',
    posologias: [
      {
        indicacao: 'Anemia megaloblastica',
        adultos: {
          dose: '1-5mg/dia',
          frequencia: 'Diaria',
          observacoes: 'Excluir deficiencia de B12 antes de tratar (mascara anemia mas nao neuropatia).',
        },
      },
      {
        indicacao: 'Prevencao de DTN (gestacao)',
        adultos: {
          dose: '0,4-0,8mg/dia (4-5mg/dia se alto risco)',
          frequencia: 'Diaria',
          observacoes: 'Iniciar 1-3 meses antes da concepcao e manter ate 12a semana. Alto risco: historia de DTN, uso de antiepilepticos, diabetes.',
        },
      },
      {
        indicacao: 'Suplementacao com metotrexato',
        adultos: {
          dose: '1-5mg, 24-48h apos metotrexato',
          frequencia: 'Semanal (1 dia apos MTX)',
          observacoes: 'Reduz toxicidade do MTX sem comprometer eficacia.',
        },
      },
    ],
    contraindicacoes: [
      'Anemia perniciosa nao tratada (mascara anemia, piora neuropatia)',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Sempre excluir deficiencia de B12 antes de tratar anemia com folato isolado',
      'Doses altas podem mascarar deficiencia de B12',
      'Interacoes com antiepilepticos',
    ],
    efeitosAdversos: {
      comuns: ['Geralmente bem tolerado'],
      graves: ['Reacoes alergicas (raras)', 'Broncoespasmo (muito raro)'],
    },
    interacoes: [
      {
        medicamento: 'Fenitoina, fenobarbital, carbamazepina',
        gravidade: 'moderada',
        efeito: 'Antiepilepticos reduzem folato; folato pode reduzir niveis de antiepilepticos',
        conduta: 'Suplementar folato; monitorar niveis de antiepileptico',
      },
      {
        medicamento: 'Metotrexato',
        gravidade: 'leve',
        efeito: 'Folato reduz toxicidade do MTX (efeito desejado)',
        conduta: 'Administrar 24-48h apos MTX',
      },
      {
        medicamento: 'Sulfassalazina',
        gravidade: 'leve',
        efeito: 'Reducao da absorcao de folato',
        conduta: 'Suplementar folato',
      },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro e recomendado' },
    monitorizacao: [
      'Hemograma para resposta',
      'Folato serio se duvida diagnostica',
      'B12 serica antes de iniciar tratamento',
    ],
    orientacoesPaciente: [
      'Iniciar antes da gestacao para prevencao de defeitos do tubo neural',
      'Tomar diariamente',
      'Alimentos ricos em folato: vegetais verdes, feijao, laranja',
    ],
    consideracoesEspeciais: {
      pediatrico: 'Suplementacao em prematuros e anemias hemoliticas',
    },
    doencasRelacionadas: ['anemia-megaloblastica', 'defeito-tubo-neural', 'hiper-homocisteinemia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['acido-folico', 'folato', 'b9', 'gestacao', 'anemia', 'megaloblastica', 'tubo-neural'],
  },

  // =============================================================================
  // VITAMINA K
  // =============================================================================
  {
    id: 'fitomenadiona',
    nomeGenerico: 'Fitomenadiona (Vitamina K1)',
    nomesComerciais: ['Kanakion', 'Kavit'],
    atcCode: 'B02BA01',
    rxNormCui: '8935',
    drugBankId: 'DB01022',
    snomedCT: '387149000',
    casNumber: '84-80-0',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_k',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_im', concentracao: '10mg/mL', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '10mg/mL', disponivelSUS: true },
      { forma: 'gotas', concentracao: '20mg/mL', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Profilaxia de doenca hemorragica do recem-nascido',
      'Reversao de anticoagulacao por warfarina',
      'Deficiencia de vitamina K (malabsorcao, uso de antibioticos)',
      'Superdosagem de cumarinicos',
      'Doenca hepatica com coagulopatia',
    ],
    mecanismoAcao: 'Cofator essencial para a gama-carboxilacao hepatica dos fatores de coagulacao II, VII, IX e X, e proteinas C e S. A carboxilacao e necessaria para a ligacao desses fatores ao calcio e fosfolipidios, permitindo ativacao da cascata de coagulacao.',
    posologias: [
      {
        indicacao: 'Profilaxia neonatal',
        pediatrico: {
          dose: '1mg IM ao nascer',
          frequencia: 'Dose unica',
          idadeMinima: 'Nascimento',
          observacoes: 'Alternativa oral: 2mg ao nascer, repetir na 1a e 4a semanas.',
        },
      },
      {
        indicacao: 'Reversao de warfarina (INR elevado sem sangramento)',
        adultos: {
          dose: '1-2,5mg VO',
          frequencia: 'Dose unica',
          observacoes: 'Repetir em 24-48h se necessario. INR >10: 2,5-5mg VO.',
        },
      },
      {
        indicacao: 'Sangramento grave por warfarina',
        adultos: {
          dose: '10mg IV lento (em 30 min)',
          frequencia: 'Dose unica, pode repetir em 12h',
          observacoes: 'Associar concentrado de complexo protrombinico (CCP) ou PFC.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a fitomenadiona',
    ],
    precaucoes: [
      'IV deve ser diluido e administrado lentamente (risco de anafilaxia)',
      'Reversao excessiva pode dificultar reanticoagulacao',
      'Resistencia a warfarina pode ocorrer por dias',
    ],
    efeitosAdversos: {
      comuns: ['Dor no local da injecao'],
      graves: ['Anafilaxia (IV rapido)', 'Hematoma IM se coagulopatia'],
    },
    interacoes: [
      {
        medicamento: 'Warfarina e cumarinicos',
        gravidade: 'grave',
        efeito: 'Vitamina K reverte efeito anticoagulante',
        conduta: 'Uso terapeutico; aguardar 24-48h para reajuste de warfarina',
      },
      {
        medicamento: 'Colestiramina, orlistat',
        gravidade: 'leve',
        efeito: 'Reducao da absorcao oral de vitamina K',
        conduta: 'Separar administracao',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Seguro' },
    monitorizacao: [
      'INR/TP em reversao de anticoagulacao',
      'Sinais de sangramento ou trombose',
    ],
    orientacoesPaciente: [
      'Informar uso de vitamina K ao medico que controla anticoagulacao',
      'Efeito leva 6-24h para ser completo',
    ],
    consideracoesEspeciais: {
      pediatrico: 'Profilaxia neonatal universal prevenira doenca hemorragica',
    },
    doencasRelacionadas: ['doenca-hemorragica-rn', 'intoxicacao-cumarinico', 'coagulopatia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['vitamina-k', 'fitomenadiona', 'k1', 'coagulacao', 'warfarina', 'neonatal'],
  },

  // =============================================================================
  // TIAMINA (B1)
  // =============================================================================
  {
    id: 'tiamina',
    nomeGenerico: 'Tiamina (Vitamina B1)',
    nomesComerciais: ['Benerva', 'Vitamina B1'],
    atcCode: 'A11DA01',
    rxNormCui: '10438',
    drugBankId: 'DB00152',
    snomedCT: '259659006',
    casNumber: '59-43-8',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '100mg/mL', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '100mg/mL', disponivelSUS: true },
    ],
    indicacoes: [
      'Prevencao e tratamento de encefalopatia de Wernicke',
      'Sindrome de Korsakoff',
      'Beriberi (seco e umido)',
      'Deficiencia de tiamina em alcoolistas',
      'Nutricao parenteral prolongada',
      'Insuficiencia cardiaca refrataria (beriberi cardiaco)',
    ],
    mecanismoAcao: 'Coenzima (pirofosfato de tiamina) essencial para o metabolismo de carboidratos, participando da descarboxilacao oxidativa do piruvato e alfa-cetoglutarato no ciclo de Krebs, e da via das pentoses-fosfato. Deficiencia causa acumulo de lactato e falha energetica, afetando particularmente cerebro e coracao.',
    posologias: [
      {
        indicacao: 'Encefalopatia de Wernicke (tratamento)',
        adultos: {
          dose: '500mg IV 3x/dia por 2-3 dias, depois 250mg IV/IM 1x/dia por 3-5 dias',
          frequencia: '3x/dia depois 1x/dia',
          observacoes: 'Administrar ANTES de glicose em alcoolistas (glicose pode precipitar Wernicke).',
        },
      },
      {
        indicacao: 'Profilaxia em alcoolistas (antes de glicose)',
        adultos: {
          dose: '100-250mg IV/IM',
          frequencia: 'Antes de infusao de glicose',
          observacoes: 'Continuar 100mg VO 3x/dia por semanas.',
        },
      },
      {
        indicacao: 'Beriberi',
        adultos: {
          dose: '100mg IM/IV 3x/dia por 1-2 semanas, depois 100mg VO/dia',
          frequencia: '3x/dia depois diaria',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a tiamina',
    ],
    precaucoes: [
      'Anafilaxia rara mas possivel com IV (ter suporte disponivel)',
      'Sempre administrar antes de glicose em pacientes com suspeita de deficiencia',
      'Via IM preferida se possivel (menor risco de anafilaxia)',
    ],
    efeitosAdversos: {
      comuns: ['Dor no local da injecao', 'Flush'],
      graves: ['Anafilaxia (rara, mais comum IV)', 'Angioedema'],
    },
    interacoes: [
      {
        medicamento: 'Furosemida (uso cronico)',
        gravidade: 'leve',
        efeito: 'Aumento da excrecao de tiamina',
        conduta: 'Considerar suplementacao em uso cronico',
      },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' },
    monitorizacao: [
      'Melhora clinica neurologica',
      'Funcao cardiaca em beriberi cardiaco',
      'Niveis de tiamina sericos se disponiveis',
    ],
    orientacoesPaciente: [
      'Abstinencia alcoolica e essencial',
      'Tratamento pode ser prolongado',
      'Dieta balanceada apos alta',
    ],
    doencasRelacionadas: ['encefalopatia-wernicke', 'korsakoff', 'beriberi', 'alcoolismo'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['tiamina', 'vitamina-b1', 'wernicke', 'beriberi', 'alcoolismo'],
  },

  // =============================================================================
  // PIRIDOXINA (B6)
  // =============================================================================
  {
    id: 'piridoxina',
    nomeGenerico: 'Piridoxina (Vitamina B6)',
    nomesComerciais: ['Vitamina B6', 'Piridoxina'],
    atcCode: 'A11HA02',
    rxNormCui: '8947',
    drugBankId: 'DB00165',
    snomedCT: '430469009',
    casNumber: '65-23-6',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
      { forma: 'injetavel_im', concentracao: '100mg/mL', disponivelSUS: true },
    ],
    indicacoes: [
      'Deficiencia de piridoxina',
      'Profilaxia de neuropatia por isoniazida',
      'Intoxicacao por isoniazida (convulsoes)',
      'Nauseas e vomitos da gestacao (hiperemese)',
      'Anemia sideroblastica responsiva a piridoxina',
      'Homocistinuria',
    ],
    mecanismoAcao: 'Convertida em piridoxal-5-fosfato (PLP), coenzima essencial para mais de 100 reacoes enzimaticas, incluindo transaminases, descarboxilases e reacoes de sintese de neurotransmissores (GABA, serotonina, dopamina). Participa do metabolismo de aminoacidos, glicogenolise e sintese de heme.',
    posologias: [
      {
        indicacao: 'Profilaxia de neuropatia por isoniazida',
        adultos: {
          dose: '25-50mg/dia',
          frequencia: 'Diaria',
          observacoes: 'Indicado em alcoolistas, diabeticos, desnutridos, HIV, gestantes.',
        },
      },
      {
        indicacao: 'Intoxicacao por isoniazida',
        adultos: {
          dose: '1g IV para cada 1g de isoniazida ingerida (maximo 5g)',
          frequencia: 'Dose unica, pode repetir',
          observacoes: 'Se quantidade ingerida desconhecida: 5g IV. Infundir em 30-60 min.',
        },
      },
      {
        indicacao: 'Nauseas/vomitos da gestacao',
        adultos: {
          dose: '10-25mg 3-4x/dia',
          frequencia: '3-4x/dia',
          doseMaxima: '200mg/dia',
          observacoes: 'Frequentemente combinado com doxilamina.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Doses altas cronicas (>200mg/dia) podem causar neuropatia sensorial',
      'Interacoes com levodopa (sem carbidopa)',
    ],
    efeitosAdversos: {
      comuns: ['Geralmente bem tolerado'],
      graves: ['Neuropatia sensorial periferica (doses altas cronicas >200mg/dia)'],
    },
    interacoes: [
      {
        medicamento: 'Levodopa (sem carbidopa)',
        gravidade: 'grave',
        efeito: 'Piridoxina acelera metabolismo periferico da levodopa, reduzindo eficacia',
        conduta: 'Usar formulacoes com carbidopa; carbidopa bloqueia este efeito',
      },
      {
        medicamento: 'Fenitoina, fenobarbital',
        gravidade: 'moderada',
        efeito: 'Piridoxina pode reduzir niveis desses antiepilepticos',
        conduta: 'Monitorar niveis se uso de doses altas de B6',
      },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' },
    monitorizacao: [
      'Sintomas de neuropatia (formigamento, dormencia) se uso prolongado de altas doses',
    ],
    orientacoesPaciente: [
      'Nao exceder doses prescritas',
      'Relatar formigamentos ou dormencia',
    ],
    doencasRelacionadas: ['neuropatia-isoniazida', 'hiperemese-gravidica', 'anemia-sideroblastica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['piridoxina', 'vitamina-b6', 'isoniazida', 'neuropatia', 'gestacao'],
  },

  // =============================================================================
  // VITAMINA A
  // =============================================================================
  {
    id: 'retinol',
    nomeGenerico: 'Retinol (Vitamina A)',
    nomesComerciais: ['Arovit', 'Aderogil'],
    atcCode: 'A11CA01',
    rxNormCui: '11243',
    drugBankId: 'DB00162',
    snomedCT: '82622003',
    casNumber: '68-26-8',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '50000UI', disponivelSUS: true },
      { forma: 'gotas', concentracao: '150000UI/mL', disponivelSUS: true },
      { forma: 'capsula', concentracao: '200000UI', disponivelSUS: false },
    ],
    indicacoes: [
      'Profilaxia e tratamento de deficiencia de vitamina A',
      'Xeroftalmia e cegueira noturna',
      'Sarampo em criancas com deficiencia ou em areas endemicas',
      'Malabsorcao (fibrose cistica, colestase)',
    ],
    mecanismoAcao: 'Vitamina lipossolúvel essencial para visao (componente da rodopsina), diferenciacao epitelial, funcao imune e reproducao. Atua via receptores nucleares RAR/RXR regulando expressao genica. Deficiencia causa metaplasia escamosa de epitelios, cegueira noturna e xeroftalmia.',
    posologias: [
      {
        indicacao: 'Deficiencia em adultos',
        adultos: {
          dose: '100000-200000UI/dia por 3 dias, depois 50000UI/dia por 2 semanas',
          frequencia: 'Diaria',
          observacoes: 'Doses altas por curto periodo. Manutencao: 10000-15000UI/dia.',
        },
      },
      {
        indicacao: 'Xeroftalmia (criancas)',
        pediatrico: {
          dose: '200000UI no dia 1, repetir no dia 2 e em 2 semanas',
          frequencia: '3 doses',
          idadeMinima: '1 ano',
          observacoes: '<1 ano: 100000UI. <6 meses: 50000UI.',
        },
      },
      {
        indicacao: 'Suplementacao em sarampo',
        pediatrico: {
          dose: '200000UI (>1 ano) ou 100000UI (<1 ano) por 2 dias consecutivos',
          frequencia: '2 doses',
          observacoes: 'Reduz morbimortalidade do sarampo.',
        },
      },
    ],
    contraindicacoes: [
      'Hipervitaminose A',
      'Gestacao (doses >10000UI/dia - teratogenico)',
    ],
    precaucoes: [
      'Gestacao: evitar doses >10000UI/dia (risco teratogenico)',
      'Hepatopatia: maior risco de toxicidade',
      'Uso de retinoides sistemicos',
    ],
    efeitosAdversos: {
      comuns: ['Geralmente bem tolerado em doses adequadas'],
      graves: ['Hipervitaminose A aguda (nausea, cefaleia, papiledema)', 'Hipervitaminose cronica (hepatotoxicidade, hipercalcemia, descamacao)', 'Teratogenicidade'],
    },
    interacoes: [
      {
        medicamento: 'Retinoides (isotretinoina, acitretina)',
        gravidade: 'grave',
        efeito: 'Risco de hipervitaminose A',
        conduta: 'Evitar suplementacao de vitamina A durante uso de retinoides',
      },
      {
        medicamento: 'Tetraciclinas',
        gravidade: 'moderada',
        efeito: 'Risco de pseudotumor cerebri',
        conduta: 'Evitar uso concomitante',
      },
      {
        medicamento: 'Orlistat, colestiramina',
        gravidade: 'leve',
        efeito: 'Reducao da absorcao de vitamina A',
        conduta: 'Separar administracao',
      },
    ],
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Seguro em doses adequadas' },
    monitorizacao: [
      'Retinol serico se suspeita de deficiencia ou toxicidade',
      'Funcao hepatica se uso prolongado de altas doses',
    ],
    orientacoesPaciente: [
      'Nao exceder doses recomendadas',
      'Gestantes devem evitar suplementos de vitamina A em altas doses',
      'Alimentos ricos: figado, ovos, vegetais alaranjados',
    ],
    consideracoesEspeciais: {
      pediatrico: 'Suplementacao universal em areas de alta deficiencia (OMS)',
    },
    doencasRelacionadas: ['xeroftalmia', 'cegueira-noturna', 'sarampo', 'deficiencia-vitamina-a'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['vitamina-a', 'retinol', 'xeroftalmia', 'sarampo', 'visao'],
  },

  // =============================================================================
  // VITAMINA E
  // =============================================================================
  {
    id: 'tocoferol',
    nomeGenerico: 'Alfa-tocoferol (Vitamina E)',
    nomesComerciais: ['Ephynal', 'Vitamina E'],
    atcCode: 'A11HA03',
    rxNormCui: '10739',
    drugBankId: 'DB00163',
    snomedCT: '37237003',
    casNumber: '59-02-9',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '400UI', disponivelSUS: false },
      { forma: 'capsula', concentracao: '1000UI', disponivelSUS: false },
      { forma: 'gotas', concentracao: '100mg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Deficiencia de vitamina E (malabsorcao, abetalipoproteinemia)',
      'Ataxia por deficiencia de vitamina E (AVED)',
      'Retinopatia da prematuridade (controverso)',
      'Prevencao de deficiencia em fibrose cistica e colestase',
    ],
    mecanismoAcao: 'Principal antioxidante lipossolúvel nas membranas celulares. Neutraliza radicais livres, protegendo acidos graxos poli-insaturados da peroxidacao lipidica. Deficiencia causa neuropatia periferica, ataxia cerebelar, miopatia e anemia hemolitica.',
    posologias: [
      {
        indicacao: 'Deficiencia em adultos',
        adultos: {
          dose: '100-400UI/dia',
          frequencia: 'Diaria',
          observacoes: 'Em malabsorcao grave, pode ser necessaria forma hidrossoluvel ou via parenteral.',
        },
      },
      {
        indicacao: 'Ataxia por deficiencia (AVED)',
        adultos: {
          dose: '800-1500mg/dia',
          frequencia: 'Dividida em 2-3 tomadas',
          observacoes: 'Tratamento de longo prazo; pode estabilizar/melhorar ataxia.',
        },
      },
      {
        indicacao: 'Prematuros com malabsorcao',
        pediatrico: {
          dose: '25-50UI/kg/dia',
          frequencia: 'Diaria',
          observacoes: 'Monitorar niveis sericos.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Doses altas (>400UI/dia) podem aumentar mortalidade em alguns estudos',
      'Risco de sangramento com anticoagulantes',
      'Deficiencia de vitamina K pode ser exacerbada',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Diarreia', 'Fadiga'],
      graves: ['Aumento de risco de sangramento', 'Possivel aumento de mortalidade em doses altas'],
    },
    interacoes: [
      {
        medicamento: 'Warfarina e anticoagulantes',
        gravidade: 'moderada',
        efeito: 'Vitamina E pode potencializar efeito anticoagulante',
        conduta: 'Monitorar INR; evitar doses altas de vitamina E',
      },
      {
        medicamento: 'Orlistat, colestiramina',
        gravidade: 'leve',
        efeito: 'Reducao da absorcao de vitamina E',
        conduta: 'Separar administracao',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Seguro em doses adequadas' },
    monitorizacao: [
      'Alfa-tocoferol serico se deficiencia ou tratamento',
      'INR se em uso de anticoagulantes',
    ],
    orientacoesPaciente: [
      'Tomar com refeicao para melhor absorcao',
      'Evitar doses muito altas sem orientacao medica',
    ],
    doencasRelacionadas: ['ataxia-aved', 'abetalipoproteinemia', 'fibrose-cistica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['vitamina-e', 'tocoferol', 'antioxidante', 'ataxia', 'neuropatia'],
  },

  // =============================================================================
  // FERRO ELEMENTAR
  // =============================================================================
  {
    id: 'sulfato-ferroso',
    nomeGenerico: 'Sulfato ferroso',
    nomesComerciais: ['Combiron', 'Noripurum (IV)', 'Ferronil'],
    atcCode: 'B03AA07',
    rxNormCui: '10634',
    drugBankId: 'DB14513',
    snomedCT: '387402000',
    casNumber: '7720-78-7',
    classeTerapeutica: 'antianemico',
    subclasse: 'ferro_oral',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg Fe elementar', disponivelSUS: true },
      { forma: 'gotas', concentracao: '25mg Fe/mL', disponivelSUS: true },
      { forma: 'xarope', concentracao: '25mg Fe/5mL', disponivelSUS: false },
      { forma: 'injetavel_iv', concentracao: '100mg Fe (sacarato)', disponivelSUS: true },
    ],
    indicacoes: [
      'Anemia ferropriva',
      'Profilaxia de deficiencia de ferro (gestantes, lactantes)',
      'Anemia da DRC (com ESAs)',
      'Deficiencia de ferro sem anemia',
    ],
    mecanismoAcao: 'Fornece ferro elementar para sintese de hemoglobina, mioglobina e enzimas dependentes de ferro. Absorvido principalmente no duodeno, regulado pela hepcidina. Ferro e incorporado no heme pela ferroquelatase, essencial para transporte de oxigenio.',
    posologias: [
      {
        indicacao: 'Anemia ferropriva (adultos)',
        adultos: {
          dose: '100-200mg Fe elementar/dia',
          frequencia: 'Dividida em 2-3 tomadas ou dose unica em dias alternados',
          observacoes: 'Tomar em jejum se tolerado. Dose em dias alternados pode melhorar absorcao.',
        },
      },
      {
        indicacao: 'Profilaxia na gestacao',
        adultos: {
          dose: '30-60mg Fe elementar/dia',
          frequencia: 'Diaria',
          observacoes: 'Iniciar no 2o trimestre em gestantes sem anemia.',
        },
      },
      {
        indicacao: 'Anemia ferropriva pediatrica',
        pediatrico: {
          dose: '3-6mg Fe elementar/kg/dia',
          frequencia: 'Dividida em 2-3 tomadas',
          doseMaxima: '150mg Fe/dia',
        },
      },
    ],
    contraindicacoes: [
      'Hemocromatose e sobrecarga de ferro',
      'Anemias nao ferroprivas (talassemia, sideroblastica)',
      'Transfusoes repetidas',
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Intolerancia GI comum',
      'Fezes escuras (esperado)',
      'Interacoes com absorcao de outros medicamentos',
      'Toxicidade grave em superdosagem pediatrica',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Constipacao', 'Dor abdominal', 'Fezes escuras', 'Diarreia', 'Pirose'],
      graves: ['Intoxicacao por ferro (superdosagem)', 'Ulceracao GI (preparacoes de liberacao lenta)'],
    },
    interacoes: [
      {
        medicamento: 'Levotiroxina',
        gravidade: 'moderada',
        efeito: 'Ferro reduz absorcao de levotiroxina',
        conduta: 'Separar por pelo menos 4 horas',
      },
      {
        medicamento: 'Quinolonas, tetraciclinas',
        gravidade: 'moderada',
        efeito: 'Ferro quela antibioticos, reduzindo absorcao',
        conduta: 'Separar por 2 horas',
      },
      {
        medicamento: 'IBPs, antiacidos',
        gravidade: 'leve',
        efeito: 'Reducao da absorcao de ferro',
        conduta: 'Preferir tomar ferro em jejum; separar de antiacidos',
      },
      {
        medicamento: 'Levodopa, metildopa',
        gravidade: 'moderada',
        efeito: 'Ferro pode reduzir absorcao',
        conduta: 'Separar por 2 horas',
      },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro e frequentemente necessario' },
    monitorizacao: [
      'Hemoglobina: resposta em 2-4 semanas',
      'Ferritina e saturacao de transferrina apos 4-8 semanas',
      'Reticulocitos: pico em 5-10 dias',
    ],
    orientacoesPaciente: [
      'Tomar em jejum para melhor absorcao (se tolerado)',
      'Vitamina C aumenta absorcao',
      'Fezes escuras sao normais',
      'Evitar cha e cafe junto com o ferro',
      'Guardar fora do alcance de criancas (toxicidade grave)',
    ],
    consideracoesEspeciais: {
      pediatrico: 'Intoxicacao acidental e emergencia medica - guardar com seguranca',
    },
    doencasRelacionadas: ['anemia-ferropriva', 'deficiencia-ferro', 'anemia-gestacao'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['ferro', 'sulfato-ferroso', 'anemia', 'ferropriva', 'suplemento'],
  },

  // =============================================================================
  // ZINCO
  // =============================================================================
  {
    id: 'sulfato-zinco',
    nomeGenerico: 'Sulfato de zinco',
    nomesComerciais: ['Zinco quelato', 'Oligozinc'],
    atcCode: 'A12CB01',
    rxNormCui: '11251',
    drugBankId: 'DB14533',
    snomedCT: '125476003',
    casNumber: '7733-02-0',
    classeTerapeutica: 'suplemento',
    subclasse: 'mineral',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg Zn elementar', disponivelSUS: false },
      { forma: 'capsula', concentracao: '50mg Zn', disponivelSUS: false },
      { forma: 'solucao_oral', concentracao: '10mg Zn/5mL', disponivelSUS: false },
      { forma: 'xarope', concentracao: '20mg Zn/5mL (OMS diarreia)', disponivelSUS: true },
    ],
    indicacoes: [
      'Tratamento adjuvante da diarreia aguda em criancas (OMS)',
      'Deficiencia de zinco',
      'Acrodermatite enteropatica',
      'Doenca de Wilson (acetato de zinco)',
      'Cicatrizacao de feridas',
    ],
    mecanismoAcao: 'Micronutriente essencial cofator de mais de 300 enzimas, incluindo RNA e DNA polimerases. Participa da funcao imune, cicatrizacao, sintese proteica e divisao celular. Na diarreia, restaura absorcao intestinal, regenera epitelio e modula resposta imune.',
    posologias: [
      {
        indicacao: 'Diarreia aguda em criancas (OMS)',
        pediatrico: {
          dose: '20mg Zn/dia por 10-14 dias (10mg/dia se <6 meses)',
          frequencia: 'Diaria',
          observacoes: 'Iniciar junto com SRO. Reduz duracao e severidade.',
        },
      },
      {
        indicacao: 'Deficiencia de zinco (adultos)',
        adultos: {
          dose: '15-30mg Zn elementar/dia',
          frequencia: 'Diaria',
          observacoes: 'Alimentos ricos: carnes, frutos do mar, nozes.',
        },
      },
      {
        indicacao: 'Acrodermatite enteropatica',
        adultos: {
          dose: '30-50mg Zn 3x/dia',
          frequencia: '3x/dia',
          observacoes: 'Tratamento de longo prazo.',
        },
        pediatrico: {
          dose: '3mg/kg/dia',
          frequencia: 'Dividida em doses',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Doses altas cronicas (>50mg/dia) podem causar deficiencia de cobre',
      'Interacoes com absorcao de antibioticos e outros minerais',
      'Nausea comum em jejum',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Vomitos', 'Dor abdominal', 'Gosto metalico'],
      graves: ['Deficiencia de cobre (uso cronico de altas doses)', 'Anemia sideroblastica'],
    },
    interacoes: [
      {
        medicamento: 'Quinolonas, tetraciclinas',
        gravidade: 'moderada',
        efeito: 'Zinco quela antibioticos, reduzindo absorcao',
        conduta: 'Separar por 2 horas',
      },
      {
        medicamento: 'Penicilamina',
        gravidade: 'moderada',
        efeito: 'Reducao mutua da absorcao',
        conduta: 'Separar por pelo menos 2 horas',
      },
      {
        medicamento: 'Ferro',
        gravidade: 'leve',
        efeito: 'Competicao pela absorcao',
        conduta: 'Separar administracao',
      },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' },
    monitorizacao: [
      'Zinco serio se suspeita de deficiencia',
      'Cobre serio em uso prolongado de altas doses',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos para reduzir nausea',
      'Separar de antibioticos e suplementos de ferro',
      'Na diarreia infantil, manter por 10-14 dias mesmo apos melhora',
    ],
    doencasRelacionadas: ['diarreia-aguda', 'acrodermatite-enteropatica', 'deficiencia-zinco'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['zinco', 'diarreia', 'OMS', 'imunidade', 'mineral'],
  },

  // =============================================================================
  // MAGNESIO
  // =============================================================================
  {
    id: 'sulfato-magnesio',
    nomeGenerico: 'Sulfato de magnesio',
    nomesComerciais: ['Sulfato de magnesio', 'Magnesio (diversos)'],
    atcCode: 'A12CC02',
    rxNormCui: '6872',
    drugBankId: 'DB00653',
    snomedCT: '387386004',
    casNumber: '7487-88-9',
    classeTerapeutica: 'suplemento',
    subclasse: 'mineral',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '500mg/mL (50%)', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '500mg/mL (50%)', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: false },
      { forma: 'po_oral', concentracao: 'variavel', disponivelSUS: false },
    ],
    indicacoes: [
      'Eclampsia e pre-eclampsia grave (profilaxia e tratamento de convulsoes)',
      'Hipomagnesemia',
      'Arritmias (torsades de pointes, arritmias digitalis)',
      'Asma aguda grave (broncodilatador adjuvante)',
      'Tocolise (controverso)',
    ],
    mecanismoAcao: 'Ion essencial cofator de mais de 300 enzimas, incluindo ATPases. Estabiliza membranas excitaveis (neuronio, musculo, coracao). Bloqueia receptor NMDA (anticonvulsivante), relaxa musculo liso vascular e bronquico. Efeito tocolitico por relaxamento miometrial.',
    posologias: [
      {
        indicacao: 'Eclampsia/pre-eclampsia (protocolo Zuspan)',
        adultos: {
          dose: 'Ataque: 4g IV em 20min; Manutencao: 1-2g/h IV continuo',
          frequencia: 'Infusao continua',
          observacoes: 'Manter ate 24-48h pos-parto. Monitorar reflexos, diurese, respiracao.',
        },
      },
      {
        indicacao: 'Hipomagnesemia grave',
        adultos: {
          dose: '1-2g IV em 15-60min, depois 1g/h por 6h',
          frequencia: 'Conforme nivel',
          observacoes: 'Diluir em SF; monitorar ECG.',
        },
      },
      {
        indicacao: 'Torsades de pointes',
        adultos: {
          dose: '1-2g IV em 1-2min',
          frequencia: 'Dose unica, pode repetir em 5-15min',
          observacoes: 'Tratamento de escolha mesmo com Mg normal.',
        },
      },
      {
        indicacao: 'Asma aguda grave',
        adultos: {
          dose: '2g IV em 20min',
          frequencia: 'Dose unica',
          observacoes: 'Adjuvante em asma refrataria a broncodilatadores.',
        },
      },
    ],
    contraindicacoes: [
      'Bloqueio cardiaco (sem marcapasso)',
      'Miastenia gravis',
      'Insuficiencia renal grave (acumulo)',
      'Hipotensao grave',
    ],
    precaucoes: [
      'Monitorar reflexos patelares (ausencia = toxicidade)',
      'Depressao respiratoria em superdosagem',
      'Antidoto: gluconato de calcio',
      'Ajustar em insuficiencia renal',
    ],
    efeitosAdversos: {
      comuns: ['Flushing', 'Nausea', 'Fraqueza muscular', 'Hipotensao'],
      graves: ['Depressao respiratoria', 'Bloqueio cardiaco', 'Parada cardiaca'],
    },
    interacoes: [
      {
        medicamento: 'Bloqueadores neuromusculares',
        gravidade: 'grave',
        efeito: 'Potencializacao do bloqueio neuromuscular',
        conduta: 'Reduzir dose de bloqueador; monitorar intensamente',
      },
      {
        medicamento: 'Aminoglicosideos',
        gravidade: 'moderada',
        efeito: 'Potencializacao de bloqueio neuromuscular',
        conduta: 'Monitorar funcao respiratoria',
      },
      {
        medicamento: 'Bloqueadores de canal de calcio',
        gravidade: 'moderada',
        efeito: 'Potencializacao de hipotensao e bradicardia',
        conduta: 'Usar com cautela; monitorar PA e FC',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Reduzir dose; risco de acumulo' },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' },
    monitorizacao: [
      'Magnesio serio a cada 4-6h durante infusao',
      'Reflexos patelares',
      'Frequencia respiratoria (>12/min)',
      'Diurese (>25mL/h)',
      'ECG em doses altas',
    ],
    orientacoesPaciente: [
      'Medicamento de uso hospitalar',
      'Relatar fraqueza ou dificuldade para respirar',
    ],
    doencasRelacionadas: ['eclampsia', 'pre-eclampsia', 'hipomagnesemia', 'arritmia', 'asma'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['magnesio', 'sulfato', 'eclampsia', 'torsades', 'arritmia', 'asma'],
  },

  // =============================================================================
  // POTASSIO
  // =============================================================================
  {
    id: 'cloreto-potassio',
    nomeGenerico: 'Cloreto de potassio',
    nomesComerciais: ['Slow-K', 'KCl'],
    atcCode: 'A12BA01',
    rxNormCui: '8591',
    drugBankId: 'DB14500',
    snomedCT: '387392006',
    casNumber: '7447-40-7',
    classeTerapeutica: 'suplemento',
    subclasse: 'eletrolito',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido_cr', concentracao: '600mg (8mEq K+)', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '6% (60mg/mL)', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '10% (100mg/mL)', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '19,1% (1mEq/mL)', disponivelSUS: true },
    ],
    indicacoes: [
      'Prevencao e tratamento de hipocalemia',
      'Reposicao em uso de diureticos espoliadores de potassio',
      'Alcalose metabolica hipocloremica',
      'Cetoacidose diabetica (reposicao)',
    ],
    mecanismoAcao: 'Principal cation intracelular. Essencial para potencial de repouso da membrana, conducao nervosa, contracao muscular e funcao cardiaca. Hipocalemia causa fraqueza, arritmias e ileo; hipercalemia causa arritmias potencialmente fatais.',
    posologias: [
      {
        indicacao: 'Hipocalemia leve a moderada (VO)',
        adultos: {
          dose: '40-100mEq/dia divididos',
          frequencia: 'Dividida em 2-4 tomadas com alimentos',
          observacoes: 'Cada 10mEq eleva K+ em ~0,1mEq/L. Monitroar K+ a cada 2-3 dias.',
        },
      },
      {
        indicacao: 'Hipocalemia grave/sintomatica (IV)',
        adultos: {
          dose: '10-20mEq/h IV (maximo 40mEq/h em emergencia)',
          frequencia: 'Infusao continua',
          doseMaxima: '40mEq/h (veia central), 10mEq/h (periferico)',
          observacoes: 'Concentracao maxima: 40mEq/L periferico, 60-80mEq/L central. Monitorar ECG.',
        },
      },
      {
        indicacao: 'Profilaxia com diureticos',
        adultos: {
          dose: '20-40mEq/dia',
          frequencia: 'Diaria',
        },
      },
    ],
    contraindicacoes: [
      'Hipercalemia',
      'Insuficiencia renal grave (TFG <10)',
      'Obstrucao GI (preparacoes orais)',
      'Doenca de Addison nao tratada',
    ],
    precaucoes: [
      'Monitorar K+ serio frequentemente',
      'Risco de hipercalemia em DRC, diabetes, uso de IECA/BRA/espironolactona',
      'IV muito rapido pode causar arritmias fatais',
      'Preparacoes orais podem causar ulceracao GI',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Vomitos', 'Dor abdominal', 'Diarreia'],
      graves: ['Hipercalemia (arritmias, parada cardiaca)', 'Ulceracao GI (preparacoes solidas)', 'Flebite (IV periferico)'],
    },
    interacoes: [
      {
        medicamento: 'IECA, BRA, espironolactona, amilorida',
        gravidade: 'grave',
        efeito: 'Risco elevado de hipercalemia',
        conduta: 'Monitorar K+ rigorosamente; ajustar doses',
      },
      {
        medicamento: 'Trimetoprima',
        gravidade: 'moderada',
        efeito: 'Aumenta risco de hipercalemia',
        conduta: 'Monitorar K+',
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'moderada',
        efeito: 'Hipocalemia aumenta toxicidade digitalis; reposicao reduz',
        conduta: 'Manter K+ >4mEq/L em usuarios de digoxina',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Usar com extrema cautela; monitorar K+ frequentemente' },
      { tfg: '<10', ajuste: 'Geralmente contraindicado via oral' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Seguro' },
    monitorizacao: [
      'Potassio serio: antes, apos 2-4h de infusao IV, depois diariamente',
      'ECG em hipocalemia/hipercalemia ou infusao IV',
      'Funcao renal',
      'Magnesio (hipomagnesemia dificulta correcao de K+)',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos para reduzir irritacao gastrica',
      'Engolir comprimidos inteiros (nao mastigar liberacao controlada)',
      'Relatar fraqueza, palpitacoes ou formigamentos',
    ],
    doencasRelacionadas: ['hipocalemia', 'arritmia', 'cetoacidose-diabetica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['potassio', 'cloreto', 'kcl', 'hipocalemia', 'eletrolito'],
  },

  // =============================================================================
  // CALCIO
  // =============================================================================
  {
    id: 'carbonato-calcio',
    nomeGenerico: 'Carbonato de calcio',
    nomesComerciais: ['Os-Cal', 'Calcium Sandoz', 'Calcitran'],
    atcCode: 'A12AA04',
    rxNormCui: '1812',
    drugBankId: 'DB06724',
    snomedCT: '387307005',
    casNumber: '471-34-1',
    classeTerapeutica: 'suplemento',
    subclasse: 'mineral',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg Ca elementar', disponivelSUS: true },
      { forma: 'comprimido_mastigavel', concentracao: '500mg Ca', disponivelSUS: false },
      { forma: 'po_oral', concentracao: 'variavel', disponivelSUS: false },
    ],
    indicacoes: [
      'Prevencao e tratamento de osteoporose (com vitamina D)',
      'Suplementacao de calcio em ingestao dietaria inadequada',
      'Hipocalcemia',
      'Hiperfosfatemia na DRC (quelante de fosfato)',
    ],
    mecanismoAcao: 'Fornece calcio elementar para manutencao da massa ossea, funcao neuromuscular, conducao cardiaca e coagulacao. Carbonato requer ambiente acido para absorcao otima. Como quelante de fosfato, liga-se ao fosfato dietario no TGI.',
    posologias: [
      {
        indicacao: 'Suplementacao para osteoporose',
        adultos: {
          dose: '1000-1200mg Ca elementar/dia',
          frequencia: 'Dividida em 2-3 tomadas com refeicoes',
          observacoes: 'Associar vitamina D. Absorcao maxima por dose: 500mg.',
        },
      },
      {
        indicacao: 'Hipocalcemia leve',
        adultos: {
          dose: '1000-2000mg Ca/dia',
          frequencia: 'Dividida em 2-3 doses',
          observacoes: 'Calcio IV se sintomatica ou grave.',
        },
      },
      {
        indicacao: 'Quelante de fosfato (DRC)',
        adultos: {
          dose: '500-1500mg Ca 3x/dia com refeicoes',
          frequencia: '3x/dia com refeicoes',
          observacoes: 'Limitar Ca total a <1500mg/dia pelo risco de calcificacao vascular.',
        },
      },
    ],
    contraindicacoes: [
      'Hipercalcemia',
      'Nefrolitiase calcica recorrente',
      'Hipercalciuria grave',
    ],
    precaucoes: [
      'Risco de nefrolitiase',
      'Sindrome leite-alcali com doses muito altas',
      'Calcificacao vascular em DRC (limitar Ca total)',
      'Reducao da absorcao de diversos medicamentos',
    ],
    efeitosAdversos: {
      comuns: ['Constipacao', 'Flatulencia', 'Distensao abdominal'],
      graves: ['Hipercalcemia', 'Nefrolitiase', 'Sindrome leite-alcali', 'Calcificacao vascular'],
    },
    interacoes: [
      {
        medicamento: 'Levotiroxina',
        gravidade: 'moderada',
        efeito: 'Calcio reduz absorcao de levotiroxina',
        conduta: 'Separar por pelo menos 4 horas',
      },
      {
        medicamento: 'Quinolonas, tetraciclinas',
        gravidade: 'moderada',
        efeito: 'Quelacao reduz absorcao dos antibioticos',
        conduta: 'Separar por 2-4 horas',
      },
      {
        medicamento: 'Bisfosfonatos',
        gravidade: 'moderada',
        efeito: 'Calcio reduz absorcao de bisfosfonatos',
        conduta: 'Tomar bisfosfonato em jejum, calcio em outro horario',
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'moderada',
        efeito: 'Hipercalcemia aumenta toxicidade digitalis',
        conduta: 'Monitorar calcio em usuarios de digoxina',
      },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro e frequentemente necessario' },
    monitorizacao: [
      'Calcio serio se uso de doses altas ou DRC',
      'Vitamina D (25-OH)',
      'Calcio urinario se historia de nefrolitiase',
    ],
    orientacoesPaciente: [
      'Tomar com refeicoes para melhor absorcao (carbonato)',
      'Dividir em doses de ate 500mg',
      'Associar vitamina D para absorcao',
      'Manter hidratacao adequada',
    ],
    consideracoesEspeciais: {
      idosos: 'Suplementacao frequentemente necessaria; cuidado com constipacao',
    },
    doencasRelacionadas: ['osteoporose', 'hipocalcemia', 'hiperfosfatemia-drc'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['calcio', 'carbonato', 'osteoporose', 'suplemento', 'quelante'],
  },

  // =============================================================================
  // FOSFATO
  // =============================================================================
  {
    id: 'fosfato-potassio',
    nomeGenerico: 'Fosfato de potassio',
    nomesComerciais: ['Fosfato de potassio (manipulado)', 'K-Phos'],
    atcCode: 'A12CX',
    rxNormCui: '8552',
    drugBankId: 'DB14481',
    snomedCT: '430527003',
    casNumber: '7778-77-0',
    classeTerapeutica: 'suplemento',
    subclasse: 'eletrolito',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '2mEq fosforo/mL', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '250mg fosforo', disponivelSUS: false },
      { forma: 'solucao_oral', concentracao: 'variavel (manipulado)', disponivelSUS: false },
    ],
    indicacoes: [
      'Hipofosfatemia moderada a grave',
      'Reposicao em nutricao parenteral',
      'Hipofosfatemia da realimentacao',
      'Cetoacidose diabetica (quando fosforo muito baixo)',
    ],
    mecanismoAcao: 'Reposicao de fosfato inorganico, essencial para metabolismo energetico (ATP), mineralizacao ossea, funcao celular e tamponamento. Hipofosfatemia grave causa fraqueza muscular, insuficiencia respiratoria, rabdomiolise e arritmias.',
    posologias: [
      {
        indicacao: 'Hipofosfatemia grave (<1,0mg/dL) sintomatica',
        adultos: {
          dose: '0,32-0,64mmol/kg IV em 6-12h',
          frequencia: 'Infusao lenta',
          observacoes: 'Nunca em bolus. Diluir em SF ou SG5%. Monitorar calcio (precipitacao).',
        },
      },
      {
        indicacao: 'Hipofosfatemia moderada (1,0-2,0mg/dL)',
        adultos: {
          dose: '0,16-0,32mmol/kg IV em 6h ou 1-2g/dia VO',
          frequencia: 'Conforme nivel',
          observacoes: 'Via oral preferida se tolerada e nao urgente.',
        },
      },
    ],
    contraindicacoes: [
      'Hiperfosfatemia',
      'Hipercalcemia (risco de precipitacao)',
      'Insuficiencia renal grave (risco de hiperfosfatemia)',
      'Hipoparatireoidismo nao tratado',
    ],
    precaucoes: [
      'Infusao rapida pode causar hipocalcemia aguda',
      'Incompatibilidade com solucoes de calcio (precipitacao)',
      'Monitorar calcio, potassio e funcao renal',
      'Formulacoes com potassio aumentam K+ serico',
    ],
    efeitosAdversos: {
      comuns: ['Diarreia (VO)', 'Nausea'],
      graves: ['Hipocalcemia (infusao rapida)', 'Hipercalemia (formulacoes com K)', 'Calcificacao de tecidos moles', 'Hiperfosfatemia'],
    },
    interacoes: [
      {
        medicamento: 'Solucoes de calcio IV',
        gravidade: 'contraindicada',
        efeito: 'Precipitacao de fosfato de calcio na linha IV',
        conduta: 'Nunca misturar ou infundir pela mesma linha',
      },
      {
        medicamento: 'Antiacidos com aluminio/magnesio',
        gravidade: 'moderada',
        efeito: 'Reducao da absorcao oral de fosfato',
        conduta: 'Separar administracao',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Usar com cautela extrema; risco de hiperfosfatemia' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Seguro se necessario' },
    monitorizacao: [
      'Fosforo serio: antes, apos infusao, depois a cada 6-12h',
      'Calcio serio (queda com reposicao de fosfato)',
      'Potassio (se formulacao com K)',
      'Funcao renal',
    ],
    orientacoesPaciente: [
      'Medicamento geralmente de uso hospitalar',
      'Via oral pode causar diarreia',
    ],
    doencasRelacionadas: ['hipofosfatemia', 'sindrome-realimentacao', 'cetoacidose-diabetica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['fosfato', 'potassio', 'hipofosfatemia', 'realimentacao', 'eletrolito'],
  },

  // =============================================================================
  // SELENIO
  // =============================================================================
  {
    id: 'selenio',
    nomeGenerico: 'Selenio (selenito de sodio)',
    nomesComerciais: ['Selenio quelato', 'Selenium'],
    atcCode: 'A12CE02',
    rxNormCui: '9526',
    drugBankId: 'DB11135',
    snomedCT: '68527004',
    casNumber: '10102-18-8',
    classeTerapeutica: 'suplemento',
    subclasse: 'mineral',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '55mcg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '100mcg', disponivelSUS: false },
      { forma: 'injetavel_iv', concentracao: '100mcg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Deficiencia de selenio (nutricao parenteral prolongada)',
      'Doenca de Keshan (cardiomiopatia endemica)',
      'Doenca de Kashin-Beck (osteoartropatia endemica)',
      'Suplementacao em areas de solo deficiente',
      'Tireoidite de Hashimoto (controverso, pode reduzir anticorpos)',
    ],
    mecanismoAcao: 'Micronutriente essencial incorporado nas selenoproteinas, incluindo glutationa peroxidases (antioxidante), tireoidoxina redutases (metabolismo hormonal tireoidiano) e selenoproteina P. Deficiencia causa cardiomiopatia, miopatia e hipotireoidismo.',
    posologias: [
      {
        indicacao: 'Suplementacao em deficiencia',
        adultos: {
          dose: '55-200mcg/dia',
          frequencia: 'Diaria',
          observacoes: 'RDA: 55mcg/dia. Maximo toleravel: 400mcg/dia.',
        },
      },
      {
        indicacao: 'NPT prolongada',
        adultos: {
          dose: '60-100mcg/dia IV',
          frequencia: 'Diaria na NPT',
        },
      },
      {
        indicacao: 'Tireoidite de Hashimoto (adjuvante)',
        adultos: {
          dose: '100-200mcg/dia',
          frequencia: 'Diaria',
          observacoes: 'Beneficio modesto em reducao de anticorpos; estudos heterogeneos.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
    ],
    precaucoes: [
      'Toxicidade em doses altas (selenose)',
      'Interacoes com absorcao de vitamina C',
      'Margem entre dose terapeutica e toxica e estreita',
    ],
    efeitosAdversos: {
      comuns: ['Geralmente bem tolerado em doses recomendadas'],
      graves: ['Selenose (halitose alicea, alopecia, unhas quebradicas, neuropatia, nausea) em superdosagem'],
    },
    interacoes: [
      {
        medicamento: 'Vitamina C (alta dose)',
        gravidade: 'leve',
        efeito: 'Pode reduzir absorcao de selenio',
        conduta: 'Separar administracao se doses altas de vitamina C',
      },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro em doses adequadas' },
    monitorizacao: [
      'Selenio serio se suspeita de deficiencia ou toxicidade',
      'Funcao tireoidiana em uso para Hashimoto',
    ],
    orientacoesPaciente: [
      'Nao exceder doses recomendadas',
      'Alimentos ricos: castanha-do-para (muito rica), frutos do mar, carnes',
      'Uma castanha-do-para pode conter 50-90mcg de selenio',
    ],
    doencasRelacionadas: ['doenca-keshan', 'tireoidite-hashimoto', 'deficiencia-selenio'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['selenio', 'selenito', 'tireoide', 'antioxidante', 'mineral'],
  },
];
