/**
 * MEDICAMENTOS NA GESTAÇÃO - DARWIN-MFC
 * ======================================
 *
 * Medicamentos seguros e contraindicados na gravidez
 * Classificação FDA/ANVISA para uso na APS
 *
 * Referências:
 * - Manual de Gestação de Alto Risco MS 2022
 * - Diretrizes SBD 2024-2025 (DMG)
 * - FEBRASGO Tireoide na Gestação 2024
 * - PCDT Transmissão Vertical HIV/Sífilis 2022
 * - ACOG Practice Bulletins
 */

import { Medicamento } from '../../types/medicamento';

// =============================================================================
// INSULINAS PARA DIABETES GESTACIONAL
// =============================================================================

const insulinasGestacao: Medicamento[] = [
  {
    id: 'insulina-nph-gestacao',
    nomeGenerico: 'Insulina NPH',
    nomesComerciais: ['Humulin N', 'Novolin N', 'Insunorm N'],
    atcCode: 'A10AC01',
    rxNormCui: '5856',
    drugBankId: 'DB00046',
    snomedCT: '67866001',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina_intermediaria',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '100 UI/mL (frasco 10mL)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '100 UI/mL (refil 3mL)', disponivelSUS: true }
    ],
    indicacoes: [
      'Diabetes Mellitus Gestacional (primeira linha)',
      'DM1 e DM2 prévios na gestação',
      'Controle basal da glicemia na gravidez'
    ],
    mecanismoAcao: 'Insulina de ação intermediária. Liga-se a receptores de insulina, promovendo captação celular de glicose e inibindo gliconeogênese hepática.',
    posologias: [
      {
        indicacao: 'DMG - início',
        adultos: {
          dose: '0,1-0,2 UI/kg/dia, divididas em 1-2 aplicações',
          frequencia: '1-2x/dia',
          observacoes: 'Iniciar 10 UI bedtime ou dividir 2/3 manhã + 1/3 noite'
        }
      },
      {
        indicacao: 'DMG - manutenção',
        adultos: {
          dose: 'Ajustar conforme glicemia capilar',
          frequencia: '2x/dia',
          doseMaxima: 'Sem dose máxima definida (individualizado)',
          observacoes: 'Meta: jejum <95, 1h pós <140, 2h pós <120 mg/dL'
        }
      }
    ],
    contraindicacoes: ['Hipoglicemia', 'Hipersensibilidade à insulina humana'],
    precaucoes: [
      'Monitorar glicemia capilar 4-7x/dia',
      'Ajustar dose semanalmente conforme perfil glicêmico',
      'Risco de hipoglicemia aumenta no 1º trimestre'
    ],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Ganho de peso', 'Lipodistrofia no local de aplicação'],
      graves: ['Hipoglicemia grave', 'Reação anafilática (raro)']
    },
    interacoes: [
      { medicamento: 'Corticoides', gravidade: 'moderada', efeito: 'Hiperglicemia - aumento da necessidade de insulina', conduta: 'Aumentar dose de insulina, monitorar glicemia' },
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Mascaram sintomas de hipoglicemia', conduta: 'Monitorar glicemia mais frequentemente' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível - insulina não passa para o leite materno em quantidades significativas' },
    monitorizacao: [
      'Glicemia capilar: jejum + 1-2h pós-prandial (4-7x/dia)',
      'HbA1c mensal (meta <6%)',
      'Crescimento fetal por USG 28-32 semanas'
    ],
    orientacoesPaciente: [
      'Aplicar SC em rodízio de locais (abdome, braço, coxa)',
      'Armazenar em geladeira (2-8°C), não congelar',
      'Homogeneizar suavemente antes de aplicar',
      'Reconhecer sintomas de hipoglicemia'
    ],
    doencasRelacionadas: ['diabetes-gestacional', 'diabetes-mellitus-2'],
    calculadoras: ['calculo-insulina-dmg'],
    citations: [
      { refId: 'sbd-dmg-2024' },
      { refId: 'ms-gestacao-alto-risco-2022' }
    ],
    lastUpdate: '2025-01',
    tags: ['insulina', 'diabetes gestacional', 'DMG', 'gravidez', 'primeira linha', 'categoria B']
  },
  {
    id: 'insulina-regular-gestacao',
    nomeGenerico: 'Insulina Regular',
    nomesComerciais: ['Humulin R', 'Novolin R', 'Insunorm R'],
    atcCode: 'A10AB01',
    rxNormCui: '6926',
    drugBankId: 'DB00030',
    snomedCT: '67866001',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina_rapida',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '100 UI/mL (frasco 10mL)', disponivelSUS: true }
    ],
    indicacoes: [
      'Controle pós-prandial no DMG',
      'DMG com hiperglicemia pós-prandial refratária',
      'Emergências hiperglicêmicas na gestação'
    ],
    mecanismoAcao: 'Insulina de ação rápida. Início em 30-60 min, pico em 2-4h, duração 5-8h.',
    posologias: [
      {
        indicacao: 'Controle pós-prandial DMG',
        adultos: {
          dose: '2-10 UI antes das refeições principais',
          frequencia: 'Antes das refeições',
          observacoes: 'Aplicar 30 min antes de comer'
        }
      }
    ],
    contraindicacoes: ['Hipoglicemia', 'Hipersensibilidade'],
    precaucoes: ['Aplicar 30 min antes das refeições', 'Não pular refeições após aplicação'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Ganho de peso'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [
      { medicamento: 'Corticoides', gravidade: 'moderada', efeito: 'Hiperglicemia', conduta: 'Ajustar dose' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação' },
    monitorizacao: ['Glicemia pós-prandial 1-2h após refeições'],
    orientacoesPaciente: ['Aplicar 30 min antes das refeições', 'Não pular refeições'],
    doencasRelacionadas: ['diabetes-gestacional'],
    calculadoras: [],
    citations: [{ refId: 'sbd-dmg-2024' }],
    lastUpdate: '2025-01',
    tags: ['insulina', 'DMG', 'pós-prandial', 'categoria B']
  },
  {
    id: 'insulina-lispro-gestacao',
    nomeGenerico: 'Insulina Lispro',
    nomesComerciais: ['Humalog'],
    atcCode: 'A10AB04',
    rxNormCui: '86009',
    drugBankId: 'DB00046',
    snomedCT: '412210000',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina_ultrarapida',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '100 UI/mL (refil 3mL)', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '100 UI/mL (caneta)', disponivelSUS: false }
    ],
    indicacoes: [
      'Controle pós-prandial no DMG (alternativa à regular)',
      'Preferível em gestantes com náuseas (pode aplicar após comer)'
    ],
    mecanismoAcao: 'Análogo ultrarrápido de insulina. Início 10-15 min, pico 1-2h, duração 3-5h.',
    posologias: [
      {
        indicacao: 'Controle pós-prandial',
        adultos: {
          dose: '2-10 UI às refeições',
          frequencia: 'Antes ou imediatamente após refeições',
          observacoes: 'Pode aplicar até 15 min após iniciar refeição'
        }
      }
    ],
    contraindicacoes: ['Hipoglicemia'],
    precaucoes: ['Não substituir 1:1 com insulina regular sem ajuste'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Reação no local da injeção'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Glicemia pós-prandial'],
    orientacoesPaciente: ['Pode aplicar imediatamente antes ou até 15 min após refeição'],
    doencasRelacionadas: ['diabetes-gestacional'],
    calculadoras: [],
    citations: [{ refId: 'sbd-dmg-2024' }],
    lastUpdate: '2025-01',
    tags: ['insulina', 'análogo', 'ultrarrápida', 'DMG', 'categoria B']
  },
  {
    id: 'insulina-detemir-gestacao',
    nomeGenerico: 'Insulina Detemir',
    nomesComerciais: ['Levemir'],
    atcCode: 'A10AE05',
    rxNormCui: '847239',
    drugBankId: 'DB01307',
    snomedCT: '411529005',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina_longa',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '100 UI/mL (caneta)', disponivelSUS: false }
    ],
    indicacoes: [
      'Controle basal no DMG (alternativa à NPH)',
      'DM prévio na gestação'
    ],
    mecanismoAcao: 'Análogo de insulina de ação longa (16-24h). Perfil mais estável que NPH.',
    posologias: [
      {
        indicacao: 'Controle basal',
        adultos: {
          dose: '0,1-0,2 UI/kg/dia',
          frequencia: '1-2x/dia',
          observacoes: 'Aplicar nos mesmos horários diariamente'
        }
      }
    ],
    contraindicacoes: ['Hipoglicemia'],
    precaucoes: ['Não diluir ou misturar com outras insulinas'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Ganho de peso'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Glicemia de jejum', 'HbA1c mensal'],
    orientacoesPaciente: ['Não misturar com outras insulinas', 'Manter horário fixo'],
    doencasRelacionadas: ['diabetes-gestacional'],
    calculadoras: [],
    citations: [{ refId: 'sbd-dmg-2024' }],
    lastUpdate: '2025-01',
    tags: ['insulina', 'análogo longo', 'DMG', 'categoria A']
  }
];

// =============================================================================
// ANTI-HIPERTENSIVOS NA GESTAÇÃO
// =============================================================================

const antiHipertensivosGestacao: Medicamento[] = [
  {
    id: 'metildopa-gestacao',
    nomeGenerico: 'Metildopa',
    nomesComerciais: ['Aldomet', 'Dopamed'],
    atcCode: 'C02AB01',
    rxNormCui: '6876',
    drugBankId: 'DB00968',
    snomedCT: '387480009',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'agonista_alfa2',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipertensão crônica na gestação (primeira linha)',
      'Pré-eclâmpsia (controle crônico)',
      'Hipertensão gestacional'
    ],
    mecanismoAcao: 'Agonista alfa-2 central. Reduz tônus simpático central, diminuindo resistência vascular periférica.',
    posologias: [
      {
        indicacao: 'Hipertensão na gestação',
        adultos: {
          dose: '250mg 2-3x/dia (inicial)',
          frequencia: '2-4x/dia',
          doseMaxima: '3g/dia',
          observacoes: 'Aumentar gradualmente a cada 2-3 dias'
        }
      }
    ],
    contraindicacoes: [
      'Hepatopatia ativa',
      'História de hepatite por metildopa',
      'Feocromocitoma',
      'Depressão grave'
    ],
    precaucoes: [
      'Monitorar função hepática',
      'Pode causar sedação (iniciar com dose baixa)',
      'Teste de Coombs pode positivar'
    ],
    efeitosAdversos: {
      comuns: ['Sedação', 'Boca seca', 'Cefaleia', 'Hipotensão ortostática'],
      graves: ['Hepatotoxicidade', 'Anemia hemolítica', 'Síndrome lúpus-like']
    },
    interacoes: [
      { medicamento: 'Lítio', gravidade: 'moderada', efeito: 'Aumento dos níveis de lítio', conduta: 'Monitorar litemia' },
      { medicamento: 'Levodopa', gravidade: 'grave', efeito: 'Redução do efeito da levodopa', conduta: 'Evitar associação' }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Dose habitual a cada 8h' },
      { tfg: '10-50', ajuste: 'Dose habitual a cada 8-12h' },
      { tfg: '<10', ajuste: 'Dose habitual a cada 12-24h' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível - baixa excreção no leite' },
    monitorizacao: [
      'PA diária (domiciliar)',
      'TGO/TGP basal e periódico',
      'Hemograma (anemia hemolítica)',
      'Teste de Coombs direto se anemia'
    ],
    orientacoesPaciente: [
      'Pode causar sonolência (inicialmente)',
      'Levantar-se lentamente (hipotensão ortostática)',
      'Não suspender abruptamente'
    ],
    doencasRelacionadas: ['hipertensao-cronica-gestacao', 'pre-eclampsia-eclampsia'],
    calculadoras: [],
    citations: [
      { refId: 'ms-gestacao-alto-risco-2022' },
      { refId: 'acog-222-2020' }
    ],
    lastUpdate: '2025-01',
    tags: ['anti-hipertensivo', 'gravidez', 'primeira linha', 'categoria B', 'metildopa']
  },
  {
    id: 'nifedipina-gestacao',
    nomeGenerico: 'Nifedipina',
    nomesComerciais: ['Adalat', 'Adalat Oros', 'Oxcord'],
    atcCode: 'C08CA05',
    rxNormCui: '7417',
    drugBankId: 'DB01115',
    snomedCT: '387490003',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'bcc',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'comprimido_cr', concentracao: '20mg retard', disponivelSUS: true },
      { forma: 'comprimido_cr', concentracao: '30mg retard', disponivelSUS: false },
      { forma: 'comprimido_cr', concentracao: '60mg retard', disponivelSUS: false }
    ],
    indicacoes: [
      'Hipertensão na gestação (segunda linha)',
      'Emergência hipertensiva na gestação (VO)',
      'Crise hipertensiva na pré-eclâmpsia',
      'Tocólise de emergência (uso off-label)'
    ],
    mecanismoAcao: 'Bloqueador de canais de cálcio di-hidropiridínico. Vasodilatação arterial periférica.',
    posologias: [
      {
        indicacao: 'Crise hipertensiva (PA ≥160/110)',
        adultos: {
          dose: '10-20mg VO a cada 30 min',
          frequencia: 'Repetir até 3x',
          doseMaxima: '60mg em 1h',
          observacoes: 'Não usar sublingual (risco de hipotensão abrupta)'
        }
      },
      {
        indicacao: 'Controle crônico',
        adultos: {
          dose: '10-20mg 8/8h ou 30-60mg retard 1x/dia',
          frequencia: '1-3x/dia',
          doseMaxima: '120mg/dia'
        }
      }
    ],
    contraindicacoes: [
      'Hipotensão',
      'Estenose aórtica grave',
      'Uso de sulfato de magnésio (relativo - risco bloqueio NM)'
    ],
    precaucoes: [
      'NUNCA usar sublingual - risco de hipotensão grave',
      'Cuidado com associação a MgSO4 (potencialização)',
      'Monitorar PA frequentemente na emergência'
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Rubor facial', 'Edema de membros inferiores', 'Palpitações'],
      graves: ['Hipotensão grave', 'Taquicardia reflexa', 'Bloqueio neuromuscular (+ MgSO4)']
    },
    interacoes: [
      { medicamento: 'Sulfato de Magnésio', gravidade: 'grave', efeito: 'Hipotensão severa, bloqueio neuromuscular', conduta: 'Monitorar PA rigorosamente, evitar doses altas' },
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Bradicardia, hipotensão', conduta: 'Monitorar FC e PA' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível - baixa excreção no leite' },
    monitorizacao: [
      'PA a cada 30 min na emergência',
      'FC fetal durante tocólise',
      'Sinais de hipotensão'
    ],
    orientacoesPaciente: [
      'ENGOLIR comprimido - não mastigar ou colocar embaixo da língua',
      'Pode causar rubor facial e cefaleia'
    ],
    doencasRelacionadas: ['pre-eclampsia-eclampsia', 'hipertensao-cronica-gestacao'],
    calculadoras: [],
    citations: [
      { refId: 'ms-gestacao-alto-risco-2022' },
      { refId: 'acog-222-2020' }
    ],
    lastUpdate: '2025-01',
    tags: ['anti-hipertensivo', 'BCC', 'emergência', 'pré-eclâmpsia', 'categoria C']
  },
  {
    id: 'hidralazina-gestacao',
    nomeGenerico: 'Hidralazina',
    nomesComerciais: ['Apresolina', 'Nepresol'],
    atcCode: 'C02DB02',
    rxNormCui: '5470',
    drugBankId: 'DB01275',
    snomedCT: '387160004',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'vasodilatador',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '20mg/mL', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Emergência hipertensiva na gestação (IV)',
      'Crise hipertensiva na pré-eclâmpsia/eclâmpsia',
      'Hipertensão refratária na gestação'
    ],
    mecanismoAcao: 'Vasodilatador arterial direto. Relaxa músculo liso vascular por mecanismo relacionado ao NO.',
    posologias: [
      {
        indicacao: 'Emergência hipertensiva',
        adultos: {
          dose: '5mg IV em bolus, repetir 5-10mg a cada 20 min',
          frequencia: 'A cada 20-30 min',
          doseMaxima: '20mg total ou PA <160/110',
          observacoes: 'Diluir em 20mL SF, infundir lentamente'
        }
      }
    ],
    contraindicacoes: [
      'Lúpus eritematoso sistêmico',
      'Taquiarritmias',
      'Dissecção de aorta',
      'Cardiopatia isquêmica'
    ],
    precaucoes: [
      'Taquicardia reflexa (pode ser necessário betabloqueador)',
      'Retenção hídrica',
      'Síndrome lúpus-like em uso prolongado'
    ],
    efeitosAdversos: {
      comuns: ['Taquicardia', 'Cefaleia', 'Rubor', 'Palpitações'],
      graves: ['Hipotensão grave', 'Angina pectoris', 'Síndrome lúpus-like']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Potencialização do efeito hipotensor', conduta: 'Usar com cautela' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [
      'PA contínua durante infusão IV',
      'FC (taquicardia reflexa)',
      'CTG fetal'
    ],
    orientacoesPaciente: ['Uso hospitalar para emergências'],
    doencasRelacionadas: ['pre-eclampsia-eclampsia'],
    calculadoras: [],
    citations: [{ refId: 'acog-222-2020' }],
    lastUpdate: '2025-01',
    tags: ['anti-hipertensivo', 'vasodilatador', 'emergência', 'IV', 'categoria C']
  },
  {
    id: 'sulfato-magnesio-gestacao',
    nomeGenerico: 'Sulfato de Magnésio',
    nomesComerciais: ['Sulfato de Magnésio 50%'],
    atcCode: 'B05XA05',
    rxNormCui: '7052',
    drugBankId: 'DB00653',
    snomedCT: '387344003',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'eletrolito',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '500mg/mL (10mL - 5g)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '500mg/mL (20mL - 10g)', disponivelSUS: true }
    ],
    indicacoes: [
      'Prevenção de eclâmpsia na pré-eclâmpsia grave',
      'Tratamento da eclâmpsia (convulsões)',
      'Neuroproteção fetal (parto prematuro <32 sem)',
      'Tocólise de emergência (uso off-label)'
    ],
    mecanismoAcao: 'Bloqueia receptores NMDA e canais de cálcio. Reduz excitabilidade neuronal. Efeito vasodilatador leve.',
    posologias: [
      {
        indicacao: 'Esquema Zuspan (mais utilizado)',
        adultos: {
          dose: 'Ataque: 4g IV em 20 min. Manutenção: 1-2g/h IV contínuo',
          frequencia: 'Infusão contínua',
          observacoes: 'Manter por 24h após parto ou última convulsão'
        }
      },
      {
        indicacao: 'Esquema Pritchard (IM)',
        adultos: {
          dose: 'Ataque: 4g IV + 10g IM (5g cada nádega). Manutenção: 5g IM 4/4h',
          frequencia: '4/4h IM',
          observacoes: 'Alternativa onde não há bomba de infusão'
        }
      },
      {
        indicacao: 'Neuroproteção fetal',
        adultos: {
          dose: '4g IV em 20-30 min',
          frequencia: 'Dose única',
          observacoes: 'Parto iminente <32 semanas'
        }
      }
    ],
    contraindicacoes: [
      'Miastenia gravis',
      'Bloqueio cardíaco',
      'Insuficiência renal grave (relativo - ajustar dose)'
    ],
    precaucoes: [
      'MONITORAR: Reflexo patelar, FR ≥16, Diurese ≥25mL/h',
      'Ter antídoto à mão: Gluconato de Cálcio 10%',
      'Reduzir dose se oligúria',
      'Cuidado com associação a nifedipina'
    ],
    efeitosAdversos: {
      comuns: ['Rubor', 'Sudorese', 'Náusea', 'Sonolência', 'Hipotensão leve'],
      graves: ['Depressão respiratória', 'Parada cardiorrespiratória', 'Bloqueio neuromuscular']
    },
    interacoes: [
      { medicamento: 'Nifedipina', gravidade: 'grave', efeito: 'Hipotensão grave, bloqueio NM', conduta: 'Monitorar rigorosamente, cautela' },
      { medicamento: 'Bloqueadores neuromusculares', gravidade: 'grave', efeito: 'Bloqueio NM prolongado', conduta: 'Evitar ou reduzir dose' },
      { medicamento: 'Aminoglicosídeos', gravidade: 'grave', efeito: 'Bloqueio NM', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Dose habitual - monitorar magnesemia' },
      { tfg: '10-50', ajuste: 'Reduzir manutenção para 0,5-1g/h' },
      { tfg: '<10', ajuste: 'Usar com extrema cautela, monitorar Mg' }
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível - magnésio é constituinte normal do leite' },
    monitorizacao: [
      'Reflexo patelar presente (perda = magnesemia >10)',
      'FR ≥16 irpm (depressão = magnesemia >12)',
      'Diurese ≥25-30 mL/h (oligúria = acúmulo)',
      'Magnesemia (terapêutica: 4-7 mEq/L) se disponível'
    ],
    orientacoesPaciente: ['Uso hospitalar exclusivo'],
    doencasRelacionadas: ['pre-eclampsia-eclampsia'],
    calculadoras: ['magnesemia'],
    citations: [
      { refId: 'ms-gestacao-alto-risco-2022' },
      { refId: 'acog-222-2020' },
      { refId: 'rbehg-2023' }
    ],
    lastUpdate: '2025-01',
    tags: ['anticonvulsivante', 'pré-eclâmpsia', 'eclâmpsia', 'MgSO4', 'categoria A', 'neuroproteção']
  }
];

// =============================================================================
// MEDICAMENTOS PARA TIREOIDE NA GESTAÇÃO
// =============================================================================

const tireoideGestacao: Medicamento[] = [
  {
    id: 'levotiroxina-gestacao',
    nomeGenerico: 'Levotiroxina',
    nomesComerciais: ['Puran T4', 'Euthyrox', 'Synthroid'],
    atcCode: 'H03AA01',
    rxNormCui: '10582',
    drugBankId: 'DB00451',
    snomedCT: '710809001',
    classeTerapeutica: 'hormonio_tireoide',
    subclasse: 'tireoidiano',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '75mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '125mcg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '150mcg', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipotireoidismo na gestação',
      'Hipotireoidismo subclínico na gestação (TSH >4 mUI/L)',
      'Tireoidite de Hashimoto na gestação'
    ],
    mecanismoAcao: 'Hormônio tireoidiano sintético (T4). Convertido perifericamente em T3. Essencial para desenvolvimento neurológico fetal.',
    posologias: [
      {
        indicacao: 'Hipotireoidismo na gestação',
        adultos: {
          dose: 'Aumentar 25-30% da dose pré-gestacional ao confirmar gravidez',
          frequencia: '1x/dia em jejum',
          observacoes: 'Meta TSH: <2,5 (1º tri) ou <3,0 (2º-3º tri)'
        }
      },
      {
        indicacao: 'Hipotireoidismo subclínico + Anti-TPO+',
        adultos: {
          dose: '1-2 mcg/kg/dia (50-100mcg habitual)',
          frequencia: '1x/dia em jejum',
          observacoes: 'Iniciar se TSH >4 e anti-TPO positivo'
        }
      }
    ],
    contraindicacoes: [
      'Hipertireoidismo não tratado',
      'Insuficiência adrenal não tratada'
    ],
    precaucoes: [
      'Aumentar dose imediatamente ao confirmar gestação',
      'Não suspender - risco de cretinismo fetal',
      'Vitaminas pré-natais com ferro: tomar com 4h de intervalo'
    ],
    efeitosAdversos: {
      comuns: ['Palpitações (superdosagem)', 'Tremor', 'Insônia'],
      graves: ['Arritmias (superdosagem)', 'Crise tireotóxica (superdosagem)']
    },
    interacoes: [
      { medicamento: 'Sulfato ferroso', gravidade: 'moderada', efeito: 'Redução da absorção de levotiroxina', conduta: 'Tomar com 4h de intervalo' },
      { medicamento: 'Carbonato de cálcio', gravidade: 'moderada', efeito: 'Redução da absorção', conduta: 'Tomar com 4h de intervalo' },
      { medicamento: 'Omeprazol/IBPs', gravidade: 'leve', efeito: 'Redução da absorção', conduta: 'Monitorar TSH' }
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível - essencial manter tratamento' },
    monitorizacao: [
      'TSH a cada 4 semanas até 20 semanas',
      'TSH a cada 6-8 semanas após 20 semanas',
      'T4L se TSH alterado'
    ],
    orientacoesPaciente: [
      'Tomar em jejum, 30-60 min antes do café',
      'Não interromper durante gestação',
      'Levar sulfato ferroso separado (4h de intervalo)'
    ],
    doencasRelacionadas: ['hipotireoidismo-gestacional'],
    calculadoras: [],
    citations: [
      { refId: 'febrasgo-tireoide-2024' },
      { refId: 'ms-gestacao-alto-risco-2022' }
    ],
    lastUpdate: '2025-01',
    tags: ['tireoide', 'levotiroxina', 'hipotireoidismo', 'categoria A', 'gestação']
  },
  {
    id: 'propiltiouracil-gestacao',
    nomeGenerico: 'Propiltiouracil (PTU)',
    nomesComerciais: ['Propiltiouracil', 'PTU'],
    atcCode: 'H03BA02',
    rxNormCui: '8794',
    drugBankId: 'DB00550',
    snomedCT: '387270003',
    classeTerapeutica: 'antitireoidiano',
    subclasse: 'tionamida',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipertireoidismo na gestação - PREFERIDO até 16 semanas',
      'Doença de Graves na gestação (1º trimestre)',
      'Crise tireotóxica na gestação'
    ],
    mecanismoAcao: 'Tionamida. Inibe a peroxidase tireoidiana, bloqueando síntese de T3/T4. Também inibe conversão periférica de T4 em T3.',
    posologias: [
      {
        indicacao: 'Hipertireoidismo gestacional',
        adultos: {
          dose: '100-200mg 8/8h',
          frequencia: '3x/dia',
          doseMaxima: '600mg/dia',
          observacoes: 'Usar até 16 semanas, depois trocar para metimazol'
        }
      }
    ],
    contraindicacoes: [
      'Hepatopatia grave',
      'Agranulocitose prévia por tionamidas'
    ],
    precaucoes: [
      'PREFERIR até 16 semanas (metimazol é teratogênico no 1º tri)',
      'Trocar para metimazol após 16 semanas (PTU = hepatotoxicidade)',
      'Monitorar função hepática',
      'Menor dose possível para T4L no limite superior do normal'
    ],
    efeitosAdversos: {
      comuns: ['Rash', 'Artralgia', 'Febre', 'Náusea'],
      graves: ['Hepatotoxicidade (GRAVE)', 'Agranulocitose', 'Vasculite ANCA+']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Alteração do efeito anticoagulante', conduta: 'Monitorar INR' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível em doses baixas (<200mg/dia)' },
    monitorizacao: [
      'TGO/TGP basal e periódico',
      'Hemograma (agranulocitose)',
      'TSH/T4L a cada 2-4 semanas',
      'Função tireoidiana fetal (USG: bócio)'
    ],
    orientacoesPaciente: [
      'Sintomas de hepatite: icterícia, urina escura - procurar emergência',
      'Febre/dor de garganta: hemograma urgente (agranulocitose)'
    ],
    doencasRelacionadas: ['hipertireoidismo-gestacional'],
    calculadoras: [],
    citations: [
      { refId: 'febrasgo-tireoide-2024' },
      { refId: 'ms-gestacao-alto-risco-2022' }
    ],
    lastUpdate: '2025-01',
    tags: ['antitireoidiano', 'PTU', 'hipertireoidismo', 'categoria D', 'primeiro trimestre']
  },
  {
    id: 'metimazol-gestacao',
    nomeGenerico: 'Metimazol',
    nomesComerciais: ['Tapazol', 'Tiamazol'],
    atcCode: 'H03BB02',
    rxNormCui: '6835',
    drugBankId: 'DB00763',
    snomedCT: '387450009',
    classeTerapeutica: 'antitireoidiano',
    subclasse: 'tionamida',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Hipertireoidismo na gestação - PREFERIDO após 16 semanas',
      'Doença de Graves na gestação (2º-3º trimestre)'
    ],
    mecanismoAcao: 'Tionamida. Inibe síntese de hormônios tireoidianos por bloqueio da peroxidase.',
    posologias: [
      {
        indicacao: 'Hipertireoidismo gestacional',
        adultos: {
          dose: '5-20mg/dia',
          frequencia: '1-2x/dia',
          doseMaxima: '40mg/dia',
          observacoes: 'Preferido após 16 semanas (menor hepatotoxicidade vs PTU)'
        }
      }
    ],
    contraindicacoes: [
      'Primeiro trimestre gestacional (teratogênico)',
      'Agranulocitose prévia por tionamidas'
    ],
    precaucoes: [
      'NÃO USAR no 1º trimestre - risco de aplasia cutis e embriopatia',
      'Preferir após 16 semanas',
      'Menor dose eficaz'
    ],
    efeitosAdversos: {
      comuns: ['Rash', 'Artralgia', 'Náusea'],
      graves: ['Agranulocitose', 'Aplasia cutis (fetal)', 'Embriopatia metimazol']
    },
    interacoes: [],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível em doses baixas' },
    monitorizacao: [
      'TSH/T4L a cada 2-4 semanas',
      'Hemograma periódico',
      'USG fetal (bócio)'
    ],
    orientacoesPaciente: ['Não usar no início da gravidez - teratogênico'],
    doencasRelacionadas: ['hipertireoidismo-gestacional'],
    calculadoras: [],
    citations: [{ refId: 'febrasgo-tireoide-2024' }],
    lastUpdate: '2025-01',
    tags: ['antitireoidiano', 'metimazol', 'categoria D', 'segundo trimestre', 'terceiro trimestre']
  }
];

// =============================================================================
// ANTICOAGULANTES NA GESTAÇÃO
// =============================================================================

const anticoagulantesGestacao: Medicamento[] = [
  {
    id: 'enoxaparina-gestacao',
    nomeGenerico: 'Enoxaparina',
    nomesComerciais: ['Clexane', 'Enoxlow', 'Cutenox'],
    atcCode: 'B01AB05',
    rxNormCui: '67108',
    drugBankId: 'DB01225',
    snomedCT: '372562003',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'hbpm',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '20mg/0,2mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '40mg/0,4mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '60mg/0,6mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '80mg/0,8mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Trombofilia na gestação (profilaxia)',
      'TEV prévio na gestação (profilaxia/tratamento)',
      'Síndrome antifosfolípide na gestação',
      'Trombose venosa aguda na gestação'
    ],
    mecanismoAcao: 'Heparina de baixo peso molecular. Inibe fator Xa (e em menor grau trombina). Não atravessa placenta.',
    posologias: [
      {
        indicacao: 'Profilaxia - risco moderado',
        adultos: {
          dose: '40mg SC 1x/dia',
          frequencia: '1x/dia',
          observacoes: 'Ajustar conforme peso: <50kg: 20mg, 50-90kg: 40mg, >90kg: 60mg'
        }
      },
      {
        indicacao: 'Profilaxia - alto risco (SAF, TEV prévio)',
        adultos: {
          dose: '40mg SC 12/12h ou 1mg/kg 1x/dia',
          frequencia: '2x/dia',
          observacoes: 'Dose intermediária'
        }
      },
      {
        indicacao: 'Tratamento - TEV agudo',
        adultos: {
          dose: '1mg/kg SC 12/12h',
          frequencia: '2x/dia',
          observacoes: 'Dose terapêutica plena'
        }
      }
    ],
    contraindicacoes: [
      'Sangramento ativo',
      'Trombocitopenia induzida por heparina (HIT)',
      'Endocardite bacteriana'
    ],
    precaucoes: [
      'Suspender 12h antes do parto (profilática) ou 24h (terapêutica)',
      'Reiniciar 6-12h após parto/cesárea',
      'Anestesia neuroaxial: 12h após última dose',
      'Ajustar dose no 3º trimestre (aumento do peso)'
    ],
    efeitosAdversos: {
      comuns: ['Equimose no local da injeção', 'Hematoma'],
      graves: ['Hemorragia', 'Trombocitopenia (HIT)', 'Osteoporose (uso prolongado)']
    },
    interacoes: [
      { medicamento: 'AINEs', gravidade: 'grave', efeito: 'Aumento do risco de sangramento', conduta: 'Evitar' },
      { medicamento: 'AAS', gravidade: 'moderada', efeito: 'Aumento do sangramento', conduta: 'Usar com cautela' }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Dose habitual' },
      { tfg: '<30', ajuste: 'Reduzir para 1mg/kg 1x/dia (terapêutica) ou evitar se disponível HNF' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível - não excretada no leite' },
    monitorizacao: [
      'Plaquetas a cada 1-2 semanas (1º mês)',
      'Anti-Xa se dose plena: manter 0,5-1,0 U/mL',
      'Clearance de creatinina'
    ],
    orientacoesPaciente: [
      'Aplicar SC na região abdominal',
      'Alternar lados da aplicação',
      'Avisar equipe antes de qualquer procedimento'
    ],
    doencasRelacionadas: ['trombofilia-gestacao'],
    calculadoras: ['ckdepi'],
    citations: [
      { refId: 'pcdt-trombofilia-2021' },
      { refId: 'ms-gestacao-alto-risco-2022' }
    ],
    lastUpdate: '2025-01',
    tags: ['anticoagulante', 'HBPM', 'trombofilia', 'categoria B', 'enoxaparina']
  },
  {
    id: 'aas-baixa-dose-gestacao',
    nomeGenerico: 'Ácido Acetilsalicílico (AAS)',
    nomesComerciais: ['Aspirina Prevent', 'AAS', 'Somalgin'],
    atcCode: 'B01AC06',
    rxNormCui: '1191',
    drugBankId: 'DB00945',
    snomedCT: '387458008',
    classeTerapeutica: 'antiagregante',
    subclasse: 'inibidor_cox',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '81mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Prevenção de pré-eclâmpsia em gestantes de alto risco',
      'Síndrome antifosfolípide na gestação',
      'História prévia de pré-eclâmpsia'
    ],
    mecanismoAcao: 'Inibidor irreversível da COX-1 plaquetária. Em baixa dose, inibe tromboxano A2 sem afetar prostaciclina.',
    posologias: [
      {
        indicacao: 'Prevenção de pré-eclâmpsia',
        adultos: {
          dose: '100-150mg 1x/dia',
          frequencia: '1x/dia à noite',
          observacoes: 'Iniciar 12-16 semanas até 36 semanas (ou parto)'
        }
      }
    ],
    contraindicacoes: [
      'Úlcera péptica ativa',
      'Alergia a AAS/AINEs',
      'Sangramento ativo'
    ],
    precaucoes: [
      'Iniciar entre 12-16 semanas (antes de 16 para maior benefício)',
      'Suspender 7-10 dias antes do parto (se cesárea programada)',
      'Pode continuar até próximo ao parto se parto vaginal'
    ],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Náusea'],
      graves: ['Hemorragia', 'Úlcera gástrica']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'moderada', efeito: 'Aumento do sangramento', conduta: 'Monitorar' },
      { medicamento: 'Ibuprofeno', gravidade: 'moderada', efeito: 'Interferência no efeito antiagregante', conduta: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível em baixa dose' },
    monitorizacao: ['Sinais de sangramento', 'Sintomas GI'],
    orientacoesPaciente: [
      'Tomar à noite (melhor efeito)',
      'Não usar junto com ibuprofeno',
      'Avisar equipe obstétrica'
    ],
    doencasRelacionadas: ['pre-eclampsia-eclampsia', 'trombofilia-gestacao'],
    calculadoras: [],
    citations: [
      { refId: 'acog-222-2020' },
      { refId: 'ms-gestacao-alto-risco-2022' }
    ],
    lastUpdate: '2025-01',
    tags: ['AAS', 'aspirina', 'pré-eclâmpsia', 'prevenção', 'categoria C']
  }
];

// =============================================================================
// ANTIBIÓTICOS/ANTIVIRAIS NA GESTAÇÃO (IST)
// =============================================================================

const antiinfecciososGestacao: Medicamento[] = [
  {
    id: 'penicilina-benzatina-gestacao',
    nomeGenerico: 'Penicilina G Benzatina',
    nomesComerciais: ['Benzetacil', 'Penicilina Benzatina'],
    atcCode: 'J01CE08',
    rxNormCui: '7980',
    drugBankId: 'DB00994',
    snomedCT: '323389000',
    classeTerapeutica: 'antibiotico',
    subclasse: 'penicilina',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '600.000 UI', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '1.200.000 UI', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '2.400.000 UI', disponivelSUS: true }
    ],
    indicacoes: [
      'Sífilis na gestação (tratamento e prevenção transmissão vertical)',
      'Sífilis primária, secundária e latente recente',
      'Sífilis latente tardia e terciária'
    ],
    mecanismoAcao: 'Betalactâmico bactericida. Único tratamento eficaz para prevenção da sífilis congênita.',
    posologias: [
      {
        indicacao: 'Sífilis primária/secundária/latente recente (<1 ano)',
        adultos: {
          dose: '2.400.000 UI IM dose única',
          frequencia: 'DU',
          observacoes: 'Repetir em 7 dias se gestante (garantir tratamento)'
        }
      },
      {
        indicacao: 'Sífilis latente tardia/terciária/duração indeterminada',
        adultos: {
          dose: '2.400.000 UI IM semanal por 3 semanas',
          frequencia: '1x/semana',
          observacoes: 'Total de 7.200.000 UI'
        }
      }
    ],
    contraindicacoes: ['Alergia grave a penicilinas (anafilaxia prévia)'],
    precaucoes: [
      'Reação de Jarisch-Herxheimer possível (febre, mialgia)',
      'Em alérgicas: dessensibilização (não há alternativa eficaz na gestação)',
      'Tratar parceiro simultaneamente'
    ],
    efeitosAdversos: {
      comuns: ['Dor no local da injeção', 'Reação de Jarisch-Herxheimer'],
      graves: ['Anafilaxia', 'Embolia por cristais (aplicação EV acidental)']
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Aumento da toxicidade', conduta: 'Evitar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [
      'VDRL mensal na gestante até o parto',
      'Título deve cair 4x em 6 meses (resposta adequada)',
      'Se título subir ou não cair: retratamento'
    ],
    orientacoesPaciente: [
      'Pode ter febre/mal-estar após injeção (Jarisch-Herxheimer)',
      'Completar todo esquema é essencial',
      'Parceiro deve ser tratado'
    ],
    doencasRelacionadas: ['sifilis-gestacao'],
    calculadoras: [],
    citations: [
      { refId: 'pcdt-tv-2022' },
      { refId: 'ms-gestacao-alto-risco-2022' }
    ],
    lastUpdate: '2025-01',
    tags: ['antibiótico', 'penicilina', 'sífilis', 'IST', 'categoria B', 'gestação']
  },
  {
    id: 'dolutegravir-gestacao',
    nomeGenerico: 'Dolutegravir',
    nomesComerciais: ['Tivicay'],
    atcCode: 'J05AJ03',
    rxNormCui: '1433868',
    drugBankId: 'DB09101',
    snomedCT: '713464000',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true }
    ],
    indicacoes: [
      'HIV na gestação - esquema preferencial',
      'Prevenção da transmissão vertical do HIV',
      'TARV inicial na gestação'
    ],
    mecanismoAcao: 'Inibidor de integrase (INI). Impede integração do DNA viral ao genoma do hospedeiro.',
    posologias: [
      {
        indicacao: 'TARV na gestação',
        adultos: {
          dose: '50mg 1x/dia (com TDF/3TC)',
          frequencia: '1x/dia',
          observacoes: 'Esquema: TDF + 3TC + DTG (preferencial)'
        }
      }
    ],
    contraindicacoes: ['Hipersensibilidade ao dolutegravir'],
    precaucoes: [
      'Estudos iniciais sugeriram risco de DTN - dados atuais consideram seguro',
      'Não associar com antiácidos ou suplementos com cátions (separar 6h)',
      'Monitorar função hepática'
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Insônia', 'Náusea'],
      graves: ['Hipersensibilidade (raro)', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Antiácidos (Al, Mg, Ca)', gravidade: 'grave', efeito: 'Redução drástica da absorção', conduta: 'Tomar 2h antes ou 6h após' },
      { medicamento: 'Sulfato ferroso', gravidade: 'moderada', efeito: 'Redução da absorção', conduta: 'Tomar separado' },
      { medicamento: 'Metformina', gravidade: 'moderada', efeito: 'Aumento dos níveis de metformina', conduta: 'Dose máx metformina 1g/dia' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Amamentação contraindicada em HIV+ (Brasil)' },
    monitorizacao: [
      'Carga viral a cada 3 meses',
      'CD4 a cada 6 meses',
      'Carga viral na 34ª semana (decisão via de parto)',
      'Função hepática'
    ],
    orientacoesPaciente: [
      'Tomar todos os dias no mesmo horário',
      'Não tomar com antiácidos ou vitaminas',
      'Essencial para proteger o bebê'
    ],
    doencasRelacionadas: ['hiv-gestacao'],
    calculadoras: [],
    citations: [
      { refId: 'pcdt-tv-2022' },
      { refId: 'ms-gestacao-alto-risco-2022' }
    ],
    lastUpdate: '2025-01',
    tags: ['antirretroviral', 'HIV', 'dolutegravir', 'categoria B', 'gestação', 'INI']
  },
  {
    id: 'tenofovir-lamivudina-gestacao',
    nomeGenerico: 'Tenofovir + Lamivudina',
    nomesComerciais: ['TDF/3TC'],
    atcCode: 'J05AR03',
    rxNormCui: '905223',
    drugBankId: 'DB00300',
    snomedCT: '784399002',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '300mg + 300mg', disponivelSUS: true }
    ],
    indicacoes: [
      'HIV na gestação - backbone nucleosídico preferencial',
      'Hepatite B crônica na gestação'
    ],
    mecanismoAcao: 'Inibidores nucleosídeos/nucleotídeos da transcriptase reversa (ITRN/ITRNt).',
    posologias: [
      {
        indicacao: 'TARV na gestação',
        adultos: {
          dose: '1 comprimido (300/300mg) 1x/dia',
          frequencia: '1x/dia',
          observacoes: 'Associar a inibidor de integrase (DTG)'
        }
      },
      {
        indicacao: 'Hepatite B crônica (com HIV)',
        adultos: {
          dose: 'Tenofovir 300mg 1x/dia',
          frequencia: '1x/dia',
          observacoes: 'Tenofovir ativo contra HBV'
        }
      }
    ],
    contraindicacoes: ['TFG <50 mL/min para tenofovir (ajuste necessário)'],
    precaucoes: [
      'Monitorar função renal (tenofovir = nefrotóxico)',
      'Avaliar necessidade de TDF para HBV se coinfecção',
      'Não suspender em coinfectadas HBV (risco de flare)'
    ],
    efeitosAdversos: {
      comuns: ['Náusea', 'Cefaleia', 'Fadiga'],
      graves: ['Nefrotoxicidade (TDF)', 'Acidose láctica (raro)', 'Desmineralização óssea']
    },
    interacoes: [
      { medicamento: 'Aminoglicosídeos', gravidade: 'grave', efeito: 'Potencialização da nefrotoxicidade', conduta: 'Evitar ou monitorar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Dose habitual' },
      { tfg: '30-50', ajuste: 'TDF 300mg a cada 48h' },
      { tfg: '<30', ajuste: 'Substituir TDF' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Amamentação contraindicada em HIV+' },
    monitorizacao: [
      'Creatinina e clearance a cada 3 meses',
      'Fósforo sérico se uso prolongado',
      'Carga viral HIV e HBV'
    ],
    orientacoesPaciente: ['Pode tomar com ou sem alimentos'],
    doencasRelacionadas: ['hiv-gestacao', 'hepatite-b-gestacao'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'pcdt-tv-2022' }],
    lastUpdate: '2025-01',
    tags: ['antirretroviral', 'HIV', 'hepatite B', 'ITRN', 'categoria B']
  }
];

// =============================================================================
// SUPLEMENTOS E VITAMINAS NA GESTAÇÃO
// =============================================================================

const suplementosGestacao: Medicamento[] = [
  {
    id: 'acido-folico-gestacao',
    nomeGenerico: 'Ácido Fólico',
    nomesComerciais: ['Endofolin', 'Folacin', 'Acfol'],
    atcCode: 'B03BB01',
    rxNormCui: '4511',
    drugBankId: 'DB00158',
    snomedCT: '63718003',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,4mg (400mcg)', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Prevenção de defeitos do tubo neural',
      'Suplementação pré-concepcional e gestacional',
      'Dose alta para alto risco de DTN'
    ],
    mecanismoAcao: 'Vitamina B9 essencial para síntese de DNA e divisão celular. Previne defeitos do tubo neural.',
    posologias: [
      {
        indicacao: 'Suplementação rotina',
        adultos: {
          dose: '400mcg (0,4mg)/dia',
          frequencia: '1x/dia',
          observacoes: 'Iniciar 3 meses antes da concepção até 12 semanas'
        }
      },
      {
        indicacao: 'Alto risco de DTN (história prévia, uso anticonvulsivantes, DM)',
        adultos: {
          dose: '4-5mg/dia',
          frequencia: '1x/dia',
          observacoes: 'Iniciar 3 meses antes até 12 semanas gestação'
        }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Não mascarar deficiência de B12 em anemia megaloblástica'],
    efeitosAdversos: {
      comuns: ['Bem tolerado'],
      graves: ['Reações alérgicas (raríssimo)']
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'moderada', efeito: 'Antagonismo', conduta: 'Usado intencionalmente para reduzir toxicidade' },
      { medicamento: 'Anticonvulsivantes', gravidade: 'moderada', efeito: 'Redução dos níveis de folato', conduta: 'Suplementar dose alta' }
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível - essencial' },
    monitorizacao: [],
    orientacoesPaciente: [
      'Começar antes de engravidar',
      'Manter até 12 semanas de gestação',
      'Pode continuar durante toda gravidez'
    ],
    doencasRelacionadas: ['classificacao-risco-gestacional'],
    calculadoras: [],
    citations: [{ refId: 'ms-gestacao-alto-risco-2022' }],
    lastUpdate: '2025-01',
    tags: ['vitamina', 'ácido fólico', 'prevenção', 'DTN', 'categoria A']
  },
  {
    id: 'sulfato-ferroso-gestacao',
    nomeGenerico: 'Sulfato Ferroso',
    nomesComerciais: ['Combiron', 'Neutrofer', 'Noripurum Oral'],
    atcCode: 'B03AA07',
    rxNormCui: '8410',
    drugBankId: 'DB14491',
    snomedCT: '63004006',
    classeTerapeutica: 'antianemico',
    subclasse: 'ferro_oral',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg Fe elementar', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '125mg/mL (25mg Fe/mL)', disponivelSUS: true }
    ],
    indicacoes: [
      'Profilaxia de anemia ferropriva na gestação',
      'Tratamento de anemia ferropriva na gestação'
    ],
    mecanismoAcao: 'Reposição de ferro para síntese de hemoglobina.',
    posologias: [
      {
        indicacao: 'Profilaxia (a partir de 20 sem)',
        adultos: {
          dose: '40mg Fe elementar/dia',
          frequencia: '1x/dia',
          observacoes: 'Tomar com vitamina C, longe das refeições'
        }
      },
      {
        indicacao: 'Tratamento de anemia',
        adultos: {
          dose: '120-200mg Fe elementar/dia dividido em 2-3 doses',
          frequencia: '2-3x/dia',
          observacoes: 'Por 3-6 meses ou até normalização'
        }
      }
    ],
    contraindicacoes: ['Hemocromatose', 'Hemossiderose', 'Anemias não ferroprivas'],
    precaucoes: [
      'Tomar longe de levotiroxina (4h)',
      'Tomar longe de antiácidos e cálcio',
      'Constipação comum'
    ],
    efeitosAdversos: {
      comuns: ['Constipação', 'Náusea', 'Fezes escuras', 'Epigastralgia'],
      graves: ['Intoxicação por ferro (superdosagem)']
    },
    interacoes: [
      { medicamento: 'Levotiroxina', gravidade: 'moderada', efeito: 'Reduz absorção de T4', conduta: 'Separar 4h' },
      { medicamento: 'Antiácidos', gravidade: 'moderada', efeito: 'Reduz absorção de ferro', conduta: 'Separar 2h' },
      { medicamento: 'Dolutegravir', gravidade: 'moderada', efeito: 'Reduz absorção de DTG', conduta: 'Separar 2h' }
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: [
      'Hemograma no início, 4 semanas e 8 semanas',
      'Ferritina se disponível'
    ],
    orientacoesPaciente: [
      'Tomar com suco de laranja (melhora absorção)',
      'Evitar tomar com leite, chá ou café',
      'Fezes escuras são normais',
      'Se muita náusea, tomar com comida'
    ],
    doencasRelacionadas: ['anemia-gestacao'],
    calculadoras: [],
    citations: [{ refId: 'ms-gestacao-alto-risco-2022' }],
    lastUpdate: '2025-01',
    tags: ['ferro', 'anemia', 'suplemento', 'categoria A', 'gestação']
  }
];

// =============================================================================
// MEDICAMENTOS CONTRAINDICADOS NA GESTAÇÃO (para referência)
// =============================================================================

const contraindicadosGestacao: Medicamento[] = [
  {
    id: 'varfarina-contraindicado',
    nomeGenerico: 'Varfarina',
    nomesComerciais: ['Marevan', 'Coumadin'],
    atcCode: 'B01AA03',
    rxNormCui: '11289',
    drugBankId: 'DB00682',
    snomedCT: '372756006',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'antagonista_vitamina_k',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true }
    ],
    indicacoes: ['CONTRAINDICADO NA GESTAÇÃO - apenas válvulas mecânicas (situação especial)'],
    mecanismoAcao: 'Antagonista da vitamina K. Teratogênico no 1º trimestre.',
    posologias: [
      {
        indicacao: 'Contraindicado na gestação',
        adultos: {
          dose: 'NÃO USAR',
          frequencia: 'Substituir por HBPM',
          observacoes: 'Embriopatia varfarínica (6-12 semanas): hipoplasia nasal, condrodisplasia'
        }
      }
    ],
    contraindicacoes: [
      'GESTAÇÃO (especialmente 6-12 semanas)',
      'Risco de hemorragia fetal',
      'Anormalidades do SNC fetal'
    ],
    precaucoes: ['Substituir por enoxaparina ao planejar gestação'],
    efeitosAdversos: {
      comuns: ['Sangramento'],
      graves: ['Embriopatia varfarínica', 'Hemorragia fetal', 'Morte fetal']
    },
    interacoes: [],
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Compatível com amamentação (pós-parto)' },
    monitorizacao: [],
    orientacoesPaciente: ['NÃO USAR NA GESTAÇÃO - procurar médico imediatamente se engravidar'],
    doencasRelacionadas: [],
    calculadoras: [],
    citations: [{ refId: 'ms-gestacao-alto-risco-2022' }],
    lastUpdate: '2025-01',
    tags: ['CONTRAINDICADO', 'categoria X', 'teratogênico', 'varfarina', 'anticoagulante']
  },
  {
    id: 'enalapril-contraindicado',
    nomeGenerico: 'Enalapril',
    nomesComerciais: ['Renitec', 'Vasopril'],
    atcCode: 'C09AA02',
    rxNormCui: '3827',
    drugBankId: 'DB00584',
    snomedCT: '372658000',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'ieca',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true }
    ],
    indicacoes: ['CONTRAINDICADO NA GESTAÇÃO'],
    mecanismoAcao: 'IECA. Fetotóxico e teratogênico em todos os trimestres.',
    posologias: [
      {
        indicacao: 'Contraindicado na gestação',
        adultos: {
          dose: 'NÃO USAR',
          frequencia: 'Substituir por metildopa ou nifedipina',
          observacoes: 'Oligoidrâmnio, anúria fetal, hipoplasia pulmonar'
        }
      }
    ],
    contraindicacoes: [
      'GESTAÇÃO - todos os trimestres',
      'Causa oligoidrâmnio e insuficiência renal fetal'
    ],
    precaucoes: ['Suspender ANTES de engravidar', 'Trocar para medicamento seguro'],
    efeitosAdversos: {
      comuns: [],
      graves: ['Oligoidrâmnio', 'Hipoplasia pulmonar', 'Insuficiência renal fetal', 'Morte fetal']
    },
    interacoes: [],
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Compatível no pós-parto' },
    monitorizacao: [],
    orientacoesPaciente: ['NÃO USAR SE ESTIVER GRÁVIDA OU PLANEJANDO ENGRAVIDAR'],
    doencasRelacionadas: ['hipertensao-cronica-gestacao'],
    calculadoras: [],
    citations: [{ refId: 'ms-gestacao-alto-risco-2022' }],
    lastUpdate: '2025-01',
    tags: ['CONTRAINDICADO', 'categoria X', 'IECA', 'enalapril', 'teratogênico']
  },
  {
    id: 'losartana-contraindicado',
    nomeGenerico: 'Losartana',
    nomesComerciais: ['Losartan', 'Cozaar'],
    atcCode: 'C09CA01',
    rxNormCui: '52175',
    drugBankId: 'DB00678',
    snomedCT: '373567002',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'bra',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true }
    ],
    indicacoes: ['CONTRAINDICADO NA GESTAÇÃO'],
    mecanismoAcao: 'BRA. Mesmo mecanismo de toxicidade fetal que IECA.',
    posologias: [
      {
        indicacao: 'Contraindicado na gestação',
        adultos: {
          dose: 'NÃO USAR',
          frequencia: 'Substituir por metildopa ou nifedipina',
          observacoes: 'Mesmo risco de toxicidade renal fetal que IECA'
        }
      }
    ],
    contraindicacoes: ['GESTAÇÃO'],
    precaucoes: ['Substituir antes da gestação'],
    efeitosAdversos: {
      comuns: [],
      graves: ['Oligoidrâmnio', 'Insuficiência renal fetal', 'Morte fetal']
    },
    interacoes: [],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - preferir outros' },
    monitorizacao: [],
    orientacoesPaciente: ['NÃO USAR NA GESTAÇÃO'],
    doencasRelacionadas: ['hipertensao-cronica-gestacao'],
    calculadoras: [],
    citations: [{ refId: 'ms-gestacao-alto-risco-2022' }],
    lastUpdate: '2025-01',
    tags: ['CONTRAINDICADO', 'categoria X', 'BRA', 'losartana', 'teratogênico']
  },
  {
    id: 'atorvastatina-contraindicado',
    nomeGenerico: 'Atorvastatina',
    nomesComerciais: ['Lipitor', 'Citalor'],
    atcCode: 'C10AA05',
    rxNormCui: '83367',
    drugBankId: 'DB01076',
    snomedCT: '373444002',
    classeTerapeutica: 'hipolipemiante',
    subclasse: 'estatina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true }
    ],
    indicacoes: ['CONTRAINDICADO NA GESTAÇÃO'],
    mecanismoAcao: 'Estatina. Inibe síntese de colesterol necessário para desenvolvimento fetal.',
    posologias: [
      {
        indicacao: 'Contraindicado na gestação',
        adultos: {
          dose: 'SUSPENDER antes de engravidar',
          frequencia: 'Não usar',
          observacoes: 'Colesterol é essencial para síntese hormonal fetal'
        }
      }
    ],
    contraindicacoes: ['GESTAÇÃO', 'AMAMENTAÇÃO'],
    precaucoes: ['Suspender 3 meses antes de tentar engravidar'],
    efeitosAdversos: {
      comuns: [],
      graves: ['Malformações fetais', 'Aborto espontâneo']
    },
    interacoes: [],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado na amamentação' },
    monitorizacao: [],
    orientacoesPaciente: ['SUSPENDER SE PLANEJAR GESTAÇÃO'],
    doencasRelacionadas: [],
    calculadoras: [],
    citations: [{ refId: 'ms-gestacao-alto-risco-2022' }],
    lastUpdate: '2025-01',
    tags: ['CONTRAINDICADO', 'categoria X', 'estatina', 'atorvastatina']
  }
];

// =============================================================================
// METFORMINA NA GESTAÇÃO (uso especial - não primeira linha)
// =============================================================================

const metforminaGestacao: Medicamento[] = [
  {
    id: 'metformina-gestacao',
    nomeGenerico: 'Metformina',
    nomesComerciais: ['Glifage', 'Glucoformin', 'Diaformin'],
    atcCode: 'A10BA02',
    rxNormCui: '6809',
    drugBankId: 'DB00331',
    snomedCT: '372567009',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'biguanida',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '850mg', disponivelSUS: true },
      { forma: 'comprimido_xr', concentracao: '500mg XR', disponivelSUS: false }
    ],
    indicacoes: [
      'DMG - alternativa quando insulina não disponível',
      'DM2 prévio em uso de metformina (pode continuar)',
      'SOP com resistência insulínica na gestação'
    ],
    mecanismoAcao: 'Biguanida. Reduz gliconeogênese hepática e aumenta sensibilidade à insulina.',
    posologias: [
      {
        indicacao: 'DMG (segunda linha)',
        adultos: {
          dose: '500mg 2-3x/dia, titular até 2000-2550mg/dia',
          frequencia: '2-3x/dia',
          doseMaxima: '2550mg/dia',
          observacoes: 'Atravessa placenta - preferir insulina quando possível'
        }
      }
    ],
    contraindicacoes: [
      'DRC (TFG <30)',
      'Acidose metabólica',
      'Hipóxia tecidual',
      'Insuficiência hepática'
    ],
    precaucoes: [
      'Atravessa a placenta - dados de segurança a longo prazo limitados',
      'Insulina permanece primeira linha no DMG',
      'Suspender 24-48h antes de cesárea/parto programado'
    ],
    efeitosAdversos: {
      comuns: ['Náusea', 'Diarreia', 'Meteorismo', 'Gosto metálico'],
      graves: ['Acidose láctica (raro)', 'Deficiência de B12']
    },
    interacoes: [
      { medicamento: 'Contraste iodado', gravidade: 'grave', efeito: 'Risco de acidose láctica', conduta: 'Suspender 48h antes e após' },
      { medicamento: 'Dolutegravir', gravidade: 'moderada', efeito: 'Aumento da metformina', conduta: 'Dose máxima 1g/dia' }
    ],
    ajusteDoseRenal: [
      { tfg: '>45', ajuste: 'Dose habitual' },
      { tfg: '30-45', ajuste: 'Máximo 1000mg/dia' },
      { tfg: '<30', ajuste: 'Contraindicado' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível - baixa excreção no leite' },
    monitorizacao: [
      'Glicemia capilar',
      'Função renal',
      'B12 se uso prolongado'
    ],
    orientacoesPaciente: [
      'Tomar com as refeições (reduz efeitos GI)',
      'Iniciar com dose baixa e aumentar gradualmente'
    ],
    doencasRelacionadas: ['diabetes-gestacional'],
    calculadoras: ['ckdepi'],
    citations: [
      { refId: 'sbd-dmg-2024' },
      { refId: 'ms-gestacao-alto-risco-2022' }
    ],
    lastUpdate: '2025-01',
    tags: ['antidiabético', 'metformina', 'DMG', 'segunda linha', 'categoria B']
  }
];

// =============================================================================
// EXPORTAÇÃO CONSOLIDADA
// =============================================================================

export const medicamentosGestacao: Medicamento[] = [
  ...insulinasGestacao,
  ...antiHipertensivosGestacao,
  ...tireoideGestacao,
  ...anticoagulantesGestacao,
  ...antiinfecciososGestacao,
  ...suplementosGestacao,
  ...contraindicadosGestacao,
  ...metforminaGestacao,
];

// Funções utilitárias específicas para gestação
export function getMedicamentosSegurosGestacao(): Medicamento[] {
  return medicamentosGestacao.filter(m =>
    m.gestacao === 'A' || m.gestacao === 'B'
  );
}

export function getMedicamentosContraindicadosGestacao(): Medicamento[] {
  return medicamentosGestacao.filter(m => m.gestacao === 'X');
}

export function getMedicamentosPorCategoriaFDA(categoria: 'A' | 'B' | 'C' | 'D' | 'X'): Medicamento[] {
  return medicamentosGestacao.filter(m => m.gestacao === categoria);
}

export function getMedicamentosGestacaoPorIndicacao(indicacao: string): Medicamento[] {
  const termo = indicacao.toLowerCase();
  return medicamentosGestacao.filter(m =>
    m.indicacoes.some(i => i.toLowerCase().includes(termo)) ||
    m.doencasRelacionadas.some(d => d.includes(termo)) ||
    m.tags?.some(t => t.toLowerCase().includes(termo))
  );
}
