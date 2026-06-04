/**
 * ANESTESIA E SEDACAO - DARWIN-MFC EXPANSAO 1000
 * ==============================================
 * Anestesicos gerais, sedativos, opioides e bloqueadores neuromusculares
 *
 * Referencias:
 * - Miller's Anesthesia 9th ed (2020)
 * - BRIDION (Sugamadex) trials
 * - MENDS2 trial (Dexmedetomidine)
 * - SPYRAL trial (Remifentanil PK/PD)
 * - Stoelting's Pharmacology & Physiology in Anesthetic Practice
 */

import { Medicamento } from '@/lib/types/medicamento';

export const anestesiaNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // ANESTESICOS INTRAVENOSOS
  // =============================================================================
  {
    id: 'propofol-anestesia',
    nomeGenerico: 'Propofol',
    nomesComerciais: ['Diprivan', 'Propovan', 'Fresofol'],
    atcCode: 'N01AX10',
    rxNormCui: '8782',
    drugBankId: 'DB00818',
    snomedCT: '387423006',
    casNumber: '2078-54-8',
    classeTerapeutica: 'outros',
    subclasse: 'anestesico_geral',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '10mg/ml (20ml)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '10mg/ml (50ml)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '20mg/ml (50ml)', disponivelSUS: false },
    ],
    indicacoes: [
      'Inducao e manutencao de anestesia geral',
      'Sedacao para procedimentos diagnosticos/cirurgicos',
      'Sedacao em pacientes ventilados em UTI',
      'Status epilepticus refratario',
    ],
    mecanismoAcao: 'Anestesico intravenoso de acao ultra-curta. Potencializa a neurotransmissao GABAergica por modulacao alosterica positiva do receptor GABA-A, aumentando a condutancia ao cloreto. Possui inicio de acao em 30-40 segundos e recuperacao rapida.',
    posologias: [
      {
        indicacao: 'Inducao anestesia',
        adultos: {
          dose: '1,5-2,5mg/kg IV',
          frequencia: 'Dose unica em bolus lento (20-40s)',
          doseMaxima: '2,5mg/kg',
          observacoes: 'Reduzir dose em idosos (1-1,5mg/kg) e pacientes debilitados',
        },
        pediatrico: {
          dose: '2,5-3,5mg/kg IV',
          frequencia: 'Dose unica',
          idadeMinima: '3 anos',
          observacoes: 'Criancas requerem doses maiores por kg',
        },
        idosos: {
          dose: '1-1,5mg/kg IV',
          observacoes: 'Titular lentamente; maior sensibilidade',
        },
      },
      {
        indicacao: 'Manutencao anestesia',
        adultos: {
          dose: '4-12mg/kg/h IV (66-200mcg/kg/min)',
          frequencia: 'Infusao continua',
          observacoes: 'Ajustar conforme resposta; reduzir com uso de opioides',
        },
      },
      {
        indicacao: 'Sedacao UTI',
        adultos: {
          dose: '0,3-4mg/kg/h IV (5-50mcg/kg/min)',
          frequencia: 'Infusao continua',
          doseMaxima: '4mg/kg/h por ate 48h',
          observacoes: 'Titulacao por escala de sedacao (RASS). Atencao a sindrome de infusao de propofol em uso prolongado',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao propofol ou componentes (oleo de soja, lecitina de ovo)',
      'Sedacao em criancas menores de 3 anos em UTI',
      'Anestesia obstetrica (nao indicado como unico agente)',
    ],
    precaucoes: [
      'Hipotensao na inducao - ter vasopressores disponiveis',
      'Sindrome de infusao de propofol (PRIS) em infusoes >48h ou >4mg/kg/h',
      'Hipertrigliceridemia - monitorar triglicerides em uso prolongado',
      'Emulsao lipidica contribui para carga calorica',
      'Dor no local da injecao - considerar lidocaina previa',
    ],
    efeitosAdversos: {
      comuns: ['Hipotensao', 'Apneia transitoria na inducao', 'Dor no local de injecao', 'Bradicardia'],
      graves: ['Sindrome de infusao de propofol (PRIS)', 'Pancreatite', 'Anafilaxia', 'Bradicardia grave/assistolia'],
    },
    interacoes: [
      {
        medicamento: 'Opioides (fentanil, remifentanil)',
        gravidade: 'moderada',
        efeito: 'Sinergismo - reducao da dose necessaria de propofol',
        mecanismo: 'Aditivo na depressao do SNC',
        conduta: 'Reduzir dose de propofol em 30-50%',
      },
      {
        medicamento: 'Midazolam',
        gravidade: 'moderada',
        efeito: 'Sinergismo na sedacao e depressao cardiovascular',
        conduta: 'Reduzir doses de ambos',
      },
      {
        medicamento: 'Succinilcolina',
        gravidade: 'leve',
        efeito: 'Propofol pode prolongar apneia da succinilcolina',
        conduta: 'Monitorar bloqueio neuromuscular',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Sem ajuste; cautela com carga lipidica' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Seguro para uso unico; excrecao minima no leite' },
    consideracoesEspeciais: {
      idosos: 'Reduzir dose de inducao em 30-50%; titulacao lenta',
      hepatopatas: 'Metabolismo hepatico; doses mais baixas em cirrose',
      pediatrico: 'Nao usar para sedacao em UTI em <16 anos por risco de PRIS',
    },
    monitorizacao: [
      'Pressao arterial continua',
      'Oximetria de pulso',
      'Capnografia se sedacao profunda',
      'Triglicerides em uso >48h',
      'Escala de sedacao (RASS) em UTI',
    ],
    doencasRelacionadas: ['anestesia', 'sedacao', 'status-epilepticus'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anestesia', 'sedacao', 'UTI', 'GABA', 'intravenoso'],
  },

  {
    id: 'etomidato',
    nomeGenerico: 'Etomidato',
    nomesComerciais: ['Amidate', 'Hypnomidate'],
    atcCode: 'N01AX07',
    rxNormCui: '4107',
    drugBankId: 'DB00292',
    snomedCT: '387246003',
    casNumber: '33125-97-2',
    classeTerapeutica: 'outros',
    subclasse: 'anestesico_geral',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '2mg/ml (10ml)', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '2mg/ml (20ml)', disponivelSUS: false },
    ],
    indicacoes: [
      'Inducao de anestesia geral',
      'Sequencia rapida de intubacao (SRI) em pacientes hemodinamicamente instaveis',
      'Cardioversao eletrica',
    ],
    mecanismoAcao: 'Anestesico imidazolico que potencializa a acao do GABA no receptor GABA-A, especificamente na subunidade beta-2/3. Caracteriza-se por estabilidade hemodinamica notavel, com minima liberacao de histamina e efeitos cardiovasculares.',
    posologias: [
      {
        indicacao: 'Inducao anestesia',
        adultos: {
          dose: '0,2-0,4mg/kg IV',
          frequencia: 'Dose unica em 30-60 segundos',
          doseMaxima: '0,4mg/kg',
          observacoes: 'Dose usual 0,3mg/kg; reduzir em idosos',
        },
        pediatrico: {
          dose: '0,3mg/kg IV',
          frequencia: 'Dose unica',
          idadeMinima: '10 anos',
        },
        idosos: {
          dose: '0,15-0,2mg/kg IV',
          observacoes: 'Maior sensibilidade; titular',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao etomidato',
      'Insuficiencia adrenal conhecida',
      'Uso como agente unico para sedacao prolongada (supressao adrenal)',
    ],
    precaucoes: [
      'Supressao adrenal transitoria (6-8h) mesmo com dose unica',
      'Mioclonias na inducao - pre-tratar com opioide ou benzodiazepnico',
      'Nausea/vomito pos-operatorio',
      'Nao usar infusao continua - supressao adrenal prolongada',
    ],
    efeitosAdversos: {
      comuns: ['Mioclonias', 'Nausea/vomito', 'Dor no local injecao', 'Apneia transitoria'],
      graves: ['Supressao adrenal', 'Laringoespasmo', 'Convulsoes (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Opioides',
        gravidade: 'moderada',
        efeito: 'Reduz mioclonias; sinergismo na depressao do SNC',
        conduta: 'Fentanil pre-inducao util para reduzir mioclonias',
      },
      {
        medicamento: 'Corticosteroides',
        gravidade: 'moderada',
        efeito: 'Pode ser necessario suplementacao em pacientes septicos',
        conduta: 'Considerar hidrocortisona de stress em sepse',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso unico aceitavel; meia-vida curta' },
    consideracoesEspeciais: {
      idosos: 'Reduzir dose; maior sensibilidade',
      hepatopatas: 'Metabolismo hepatico por esterases; ajuste nao necessario',
    },
    monitorizacao: ['Pressao arterial', 'Oximetria', 'Funcao adrenal se uso repetido'],
    doencasRelacionadas: ['anestesia', 'intubacao', 'cardioversao'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anestesia', 'SRI', 'estabilidade hemodinamica', 'GABA'],
  },

  {
    id: 'ketamina',
    nomeGenerico: 'Cetamina (Ketamina)',
    nomesComerciais: ['Ketalar', 'Ketamin', 'Vetanarcol'],
    atcCode: 'N01AX03',
    rxNormCui: '6130',
    drugBankId: 'DB01221',
    snomedCT: '373464007',
    casNumber: '6740-88-1',
    classeTerapeutica: 'outros',
    subclasse: 'anestesico_dissociativo',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '50mg/ml (10ml)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '10mg/ml (10ml)', disponivelSUS: true },
    ],
    indicacoes: [
      'Inducao e manutencao de anestesia',
      'Analgesia dissociativa para procedimentos',
      'Sedacao em emergencia (intubacao dificil, broncoespasmo)',
      'Analgesia adjuvante em dor aguda refrataria',
      'Depressao resistente ao tratamento (esketamina - off-label)',
    ],
    mecanismoAcao: 'Anestesico dissociativo que antagoniza receptores NMDA (N-metil-D-aspartato) de glutamato, produzindo estado cataleptico com analgesia, amnesia e sedacao com preservacao de reflexos protetores das vias aereas e drive respiratorio. Tambem interage com receptores opioides, monoaminergicos e colinergicos.',
    posologias: [
      {
        indicacao: 'Inducao anestesia',
        adultos: {
          dose: '1-2mg/kg IV ou 4-6mg/kg IM',
          frequencia: 'Dose unica',
          observacoes: 'IV em 60 segundos; acao em 1-2min IV, 3-5min IM',
        },
        pediatrico: {
          dose: '1-2mg/kg IV ou 4-5mg/kg IM',
          frequencia: 'Dose unica',
          idadeMinima: '3 meses',
        },
      },
      {
        indicacao: 'Analgesia procedimento (subdissociativa)',
        adultos: {
          dose: '0,1-0,3mg/kg IV',
          frequencia: 'Bolus lento ou infusao',
          observacoes: 'Dose baixa para analgesia sem dissociacao completa',
        },
      },
      {
        indicacao: 'Sedacao SRI em broncoespasmo',
        adultos: {
          dose: '1-2mg/kg IV',
          frequencia: 'Dose unica',
          observacoes: 'Propriedade broncodilatadora vantajosa',
        },
      },
    ],
    contraindicacoes: [
      'Hipertensao arterial grave nao controlada',
      'Doenca coronariana grave/IAM recente',
      'Aneurismas ou condicoes com risco de rotura vascular',
      'Psicose ativa',
      'Lesao ocular penetrante (aumenta PIO)',
      'Hipertensao intracraniana (controverso - avaliar risco-beneficio)',
    ],
    precaucoes: [
      'Fenomenos de emergencia (sonhos vividos, alucinacoes) - pre-tratar com benzodiazepnico',
      'Aumento de PA e FC - monitorar em cardiopatas',
      'Sialorreira - considerar atropina ou glicopirrolato',
      'Nao usar como agente unico em procedimentos que requerem relaxamento muscular',
    ],
    efeitosAdversos: {
      comuns: ['Nistagmo', 'Sialorreia', 'Aumento de PA/FC', 'Sonhos vividos/emergencia'],
      graves: ['Laringoespasmo', 'Depressao respiratoria (doses altas)', 'Hipertensao grave'],
    },
    interacoes: [
      {
        medicamento: 'Benzodiazepinicos',
        gravidade: 'leve',
        efeito: 'Reduce fenomenos de emergencia',
        conduta: 'Co-administracao util (midazolam 0,03mg/kg)',
      },
      {
        medicamento: 'Halotano',
        gravidade: 'grave',
        efeito: 'Prolonga acao da ketamina; arritmias',
        conduta: 'Evitar combinacao',
      },
      {
        medicamento: 'Teofilina',
        gravidade: 'moderada',
        efeito: 'Maior risco de convulsoes',
        conduta: 'Cautela; monitorar',
      },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Uso unico aceitavel' },
    consideracoesEspeciais: {
      idosos: 'Dose reduzida; recuperacao mais lenta',
      pediatrico: 'Bem tolerado; muito usado em sedacao pediatrica',
    },
    monitorizacao: ['Pressao arterial', 'Frequencia cardiaca', 'Oximetria', 'Nivel de consciencia na emergencia'],
    doencasRelacionadas: ['anestesia', 'dor', 'broncoespasmo', 'intubacao'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anestesia', 'dissociativo', 'NMDA', 'analgesia', 'broncoespasmo'],
  },

  {
    id: 'dexmedetomidina',
    nomeGenerico: 'Dexmedetomidina',
    nomesComerciais: ['Precedex', 'Dexdor'],
    atcCode: 'N05CM18',
    rxNormCui: '284397',
    drugBankId: 'DB00633',
    snomedCT: '442504007',
    casNumber: '113775-47-6',
    classeTerapeutica: 'ansiolitico',
    subclasse: 'agonista_alfa2',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '100mcg/ml (2ml)', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '4mcg/ml (50ml)', disponivelSUS: false },
    ],
    indicacoes: [
      'Sedacao em pacientes sob ventilacao mecanica em UTI',
      'Sedacao procedural em adultos nao intubados',
      'Adjuvante em anestesia geral',
      'Sedacao para intubacao acordada com fibroscopia',
    ],
    mecanismoAcao: 'Agonista alfa-2 adrenergico altamente seletivo (alfa2:alfa1 = 1620:1). Atua no locus coeruleus produzindo sedacao mimando sono natural (despertar cooperativo), analgesia moderada e reducao do drive simpatico. Permite sedacao com minima depressao respiratoria.',
    posologias: [
      {
        indicacao: 'Sedacao UTI',
        adultos: {
          dose: 'Dose de ataque: 0,5-1mcg/kg IV em 10min (opcional); Manutencao: 0,2-0,7mcg/kg/h',
          frequencia: 'Infusao continua',
          doseMaxima: '1,4mcg/kg/h (estudos off-label)',
          observacoes: 'Dose de ataque pode causar bradicardia/hipotensao; muitos omitem',
        },
      },
      {
        indicacao: 'Sedacao procedural',
        adultos: {
          dose: 'Ataque: 1mcg/kg IV em 10min; Manutencao: 0,2-1mcg/kg/h',
          frequencia: 'Infusao continua',
          observacoes: 'Ajustar para RASS desejado',
        },
      },
      {
        indicacao: 'Intubacao acordada',
        adultos: {
          dose: '1mcg/kg IV em 10min',
          frequencia: 'Dose unica com anestesia topica',
          observacoes: 'Sedacao cooperativa sem perda de reflexos',
        },
      },
    ],
    contraindicacoes: [
      'Bloqueio AV avancado (2o/3o grau) sem marca-passo',
      'Hipersensibilidade a dexmedetomidina',
    ],
    precaucoes: [
      'Bradicardia e hipotensao (especialmente com dose de ataque)',
      'Hipertensao transitoria inicial em doses altas',
      'Nao usar como unico sedativo em pacientes que necessitam sedacao profunda',
      'Sindrome de abstinencia com uso prolongado (>24h) e interrupcao abrupta',
    ],
    efeitosAdversos: {
      comuns: ['Bradicardia', 'Hipotensao', 'Boca seca', 'Nausea'],
      graves: ['Assistolia', 'Bloqueio AV', 'Hipertensao transitoria'],
    },
    interacoes: [
      {
        medicamento: 'Betabloqueadores',
        gravidade: 'moderada',
        efeito: 'Bradicardia aditiva',
        conduta: 'Monitorar FC; reduzir doses',
      },
      {
        medicamento: 'Bloqueadores de canal de calcio',
        gravidade: 'moderada',
        efeito: 'Hipotensao e bradicardia aditivas',
        conduta: 'Cautela; monitorar',
      },
      {
        medicamento: 'Opioides',
        gravidade: 'moderada',
        efeito: 'Sinergismo na sedacao e analgesia',
        conduta: 'Permite reducao de doses de opioides',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Considerar reducao de dose' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados limitados; evitar se possivel' },
    consideracoesEspeciais: {
      idosos: 'Maior sensibilidade a bradicardia; titular cuidadosamente',
      hepatopatas: 'Metabolismo hepatico; reducao de dose em cirrose grave',
    },
    monitorizacao: ['ECG continuo', 'Pressao arterial', 'Frequencia cardiaca', 'RASS ou escala de sedacao'],
    doencasRelacionadas: ['sedacao', 'ventilacao-mecanica', 'delirium'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['sedacao', 'UTI', 'alfa-2 agonista', 'delirium', 'analgesia'],
  },

  // =============================================================================
  // OPIOIDES ANESTESICOS
  // =============================================================================
  {
    id: 'remifentanil',
    nomeGenerico: 'Remifentanil',
    nomesComerciais: ['Ultiva'],
    atcCode: 'N01AH06',
    rxNormCui: '73032',
    drugBankId: 'DB00899',
    snomedCT: '386839002',
    casNumber: '132875-61-7',
    classeTerapeutica: 'analgesico',
    subclasse: 'opioide',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '1mg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '2mg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '5mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Analgesia durante inducao e manutencao de anestesia geral',
      'Analgesia em UTI para pacientes ventilados (curta duracao)',
      'Sedacao/analgesia procedural',
    ],
    mecanismoAcao: 'Opioide sintetico agonista mu de acao ultra-curta. Metabolizado por esterases plasmaticas nao especificas (nao dependente de funcao hepatica/renal), resultando em meia-vida contexto-sensitiva constante de 3-4 minutos independente da duracao da infusao.',
    posologias: [
      {
        indicacao: 'Inducao anestesia',
        adultos: {
          dose: '0,5-1mcg/kg IV em 60-90 segundos',
          frequencia: 'Dose unica ou iniciar infusao',
          observacoes: 'Administrar com hipnotico; nao usar como agente unico',
        },
      },
      {
        indicacao: 'Manutencao anestesia',
        adultos: {
          dose: '0,1-0,5mcg/kg/min (6-30mcg/kg/h)',
          frequencia: 'Infusao continua',
          observacoes: 'Titular conforme resposta; doses maiores em cirurgias de alto estimulo',
        },
        pediatrico: {
          dose: '0,25mcg/kg/min',
          frequencia: 'Infusao continua',
          idadeMinima: '1 ano',
        },
      },
      {
        indicacao: 'Analgesia pos-operatoria imediata',
        adultos: {
          dose: '0,025-0,1mcg/kg/min',
          frequencia: 'Infusao continua curta',
          observacoes: 'Transicionar para opioide de acao longa antes de suspender',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a derivados fentanil',
      'Uso como agente anestesico unico',
      'Administracao epidural ou intratecal (contem glicina)',
    ],
    precaucoes: [
      'Hiperalgesia opioide-induzida com infusoes prolongadas',
      'Rigidez muscular (especialmente torax/parede abdominal) com bolus rapido',
      'Transicionar para opioide de acao longa antes de suspender (analgesia zera em minutos)',
      'Bradicardia, especialmente com beta-bloqueadores',
    ],
    efeitosAdversos: {
      comuns: ['Rigidez muscular', 'Bradicardia', 'Hipotensao', 'Nausea/vomito'],
      graves: ['Apneia', 'Rigidez toracica', 'Bradicardia grave', 'Hiperalgesia'],
    },
    interacoes: [
      {
        medicamento: 'Propofol',
        gravidade: 'moderada',
        efeito: 'Sinergismo; permite reducao de doses de ambos',
        conduta: 'Reducao de 25-50% na dose de propofol',
      },
      {
        medicamento: 'Bloqueadores neuromusculares',
        gravidade: 'leve',
        efeito: 'Pode mascarar rigidez toracica',
        conduta: 'Monitorar ventilacao apos reversao',
      },
      {
        medicamento: 'Betabloqueadores',
        gravidade: 'moderada',
        efeito: 'Bradicardia aditiva',
        conduta: 'Ter atropina disponivel',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '<15', ajuste: 'Sem ajuste necessario - metabolizado por esterases plasmaticas' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Meia-vida ultra-curta; seguro apos procedimento' },
    consideracoesEspeciais: {
      idosos: 'Reduzir dose em 50%; maior sensibilidade',
      hepatopatas: 'Sem ajuste necessario - metabolismo extrahepatico',
    },
    monitorizacao: ['Frequencia respiratoria', 'Oximetria', 'Frequencia cardiaca', 'Rigidez muscular'],
    doencasRelacionadas: ['anestesia', 'analgesia', 'sedacao'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anestesia', 'opioide', 'acao ultra-curta', 'esterase'],
  },

  {
    id: 'sufentanil',
    nomeGenerico: 'Sufentanil',
    nomesComerciais: ['Sufenta', 'Fastfen'],
    atcCode: 'N01AH03',
    rxNormCui: '10035',
    drugBankId: 'DB00708',
    snomedCT: '387468001',
    casNumber: '56030-54-7',
    classeTerapeutica: 'analgesico',
    subclasse: 'opioide',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '5mcg/ml (2ml)', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '50mcg/ml (5ml)', disponivelSUS: false },
    ],
    indicacoes: [
      'Analgesia em anestesia geral',
      'Componente analgesico de anestesia neuroaxial (epidural/intratecal)',
      'Analgesia pos-operatoria epidural',
      'Analgesia em cirurgia cardiaca',
    ],
    mecanismoAcao: 'Opioide sintetico agonista mu altamente potente (5-10x mais potente que fentanil, 500-1000x mais que morfina). Alta lipofilicidade resulta em rapido inicio de acao e maior afinidade pelo receptor mu.',
    posologias: [
      {
        indicacao: 'Componente anestesia geral',
        adultos: {
          dose: 'Inducao: 0,5-2mcg/kg IV; Manutencao: 0,5-1mcg/kg/h ou bolus de 10-25mcg',
          frequencia: 'Bolus ou infusao continua',
          observacoes: 'Doses altas em cirurgia cardiaca (ate 25mcg/kg total)',
        },
      },
      {
        indicacao: 'Analgesia epidural',
        adultos: {
          dose: '10-15mcg em bolus epidural ou 10-20mcg/h em infusao',
          frequencia: 'Bolus ou infusao continua',
          observacoes: 'Geralmente associado a anestesico local',
        },
      },
      {
        indicacao: 'Analgesia intratecal',
        adultos: {
          dose: '2,5-10mcg',
          frequencia: 'Dose unica',
          observacoes: 'Associar a anestesico local hiperbarico',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a opioides',
      'Depressao respiratoria grave sem suporte ventilatorio',
    ],
    precaucoes: [
      'Depressao respiratoria - equipamento de ventilacao disponivel',
      'Rigidez muscular em bolus rapido',
      'Bradicardia',
      'Prurido intenso em uso neuroaxial',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Vomito', 'Prurido (neuroaxial)', 'Bradicardia'],
      graves: ['Depressao respiratoria', 'Rigidez toracica', 'Retencao urinaria'],
    },
    interacoes: [
      {
        medicamento: 'Benzodiazepinicos',
        gravidade: 'moderada',
        efeito: 'Depressao respiratoria aditiva',
        conduta: 'Reduzir doses; monitorar ventilacao',
      },
      {
        medicamento: 'IMAO',
        gravidade: 'grave',
        efeito: 'Sindrome serotoninergica; depressao respiratoria grave',
        conduta: 'Evitar ou usar com extrema cautela',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso unico cirurgico aceitavel' },
    consideracoesEspeciais: {
      idosos: 'Reducao de 25-50% na dose',
      hepatopatas: 'Metabolismo hepatico; reducao de dose em cirrose',
    },
    monitorizacao: ['Frequencia respiratoria', 'Oximetria', 'Sedacao', 'Prurido em uso neuroaxial'],
    doencasRelacionadas: ['anestesia', 'dor-pos-operatoria', 'cirurgia-cardiaca'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anestesia', 'opioide', 'neuroaxial', 'alta potencia'],
  },

  // =============================================================================
  // BLOQUEADORES NEUROMUSCULARES
  // =============================================================================
  {
    id: 'rocuronio',
    nomeGenerico: 'Rocuronio',
    nomesComerciais: ['Esmeron', 'Rocuron'],
    atcCode: 'M03AC09',
    rxNormCui: '68139',
    drugBankId: 'DB00728',
    snomedCT: '372839006',
    casNumber: '119302-91-9',
    classeTerapeutica: 'relaxante_muscular',
    subclasse: 'bloqueador_neuromuscular',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '10mg/ml (5ml)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '10mg/ml (10ml)', disponivelSUS: true },
    ],
    indicacoes: [
      'Facilitacao de intubacao traqueal',
      'Relaxamento muscular em anestesia geral',
      'Facilitacao de ventilacao mecanica em UTI',
      'Sequencia rapida de intubacao (SRI)',
    ],
    mecanismoAcao: 'Bloqueador neuromuscular nao-despolarizante aminoesteroide. Antagonista competitivo dos receptores nicotinicos de acetilcolina na juncao neuromuscular, impedindo a despolarizacao da placa motora.',
    posologias: [
      {
        indicacao: 'Intubacao traqueal rotineira',
        adultos: {
          dose: '0,6mg/kg IV',
          frequencia: 'Dose unica',
          observacoes: 'Condicoes de intubacao em 60-90 segundos',
        },
        pediatrico: {
          dose: '0,6mg/kg IV',
          frequencia: 'Dose unica',
          idadeMinima: 'Neonatos',
          observacoes: 'Inicio mais rapido em criancas',
        },
      },
      {
        indicacao: 'Sequencia rapida de intubacao',
        adultos: {
          dose: '1-1,2mg/kg IV',
          frequencia: 'Dose unica',
          observacoes: 'Condicoes de intubacao em 45-60 segundos; reversao completa com sugamadex 16mg/kg',
        },
      },
      {
        indicacao: 'Manutencao relaxamento',
        adultos: {
          dose: '0,1-0,2mg/kg IV bolus ou 10-12mcg/kg/min em infusao',
          frequencia: 'Conforme monitoracao TOF',
          observacoes: 'Guiar por TOF (trem de quatro); manter 1-2 respostas',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao rocuronio ou brometos',
    ],
    precaucoes: [
      'Miastenia gravis - sensibilidade extrema; evitar ou usar doses muito reduzidas',
      'Doenca hepatica - duracao prolongada',
      'Hipotermia prolonga duracao',
      'Monitorar com TOF para evitar paralisia residual',
      'Ter sugamadex ou neostigmina disponiveis para reversao',
    ],
    efeitosAdversos: {
      comuns: ['Paralisia residual', 'Taquicardia leve'],
      graves: ['Anafilaxia', 'Broncoespasmo', 'Paralisia prolongada'],
    },
    interacoes: [
      {
        medicamento: 'Aminoglicosideos',
        gravidade: 'moderada',
        efeito: 'Potencializacao e prolongamento do bloqueio',
        conduta: 'Monitorar TOF; pode necessitar menos dose de manutencao',
      },
      {
        medicamento: 'Anestesicos inalatorios',
        gravidade: 'moderada',
        efeito: 'Potencializacao do bloqueio (sevoflurano > isoflurano > N2O)',
        conduta: 'Reduzir dose de manutencao em 30-40%',
      },
      {
        medicamento: 'Sugamadex',
        gravidade: 'leve',
        efeito: 'Reversao rapida e completa do bloqueio',
        conduta: 'Uso intencional para reversao',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste significativo' },
      { tfg: '<30', ajuste: 'Duracao levemente prolongada; monitorar TOF' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Nao absorvido por via oral; seguro' },
    consideracoesEspeciais: {
      idosos: 'Duracao prolongada; monitorar TOF',
      hepatopatas: 'Eliminacao hepatica; duracao aumentada',
      pediatrico: 'Inicio mais rapido; duracao similar a adultos',
    },
    monitorizacao: ['TOF (trem de quatro)', 'Oximetria', 'Sinais de paralisia residual'],
    doencasRelacionadas: ['anestesia', 'intubacao', 'ventilacao-mecanica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['bloqueador neuromuscular', 'intubacao', 'SRI', 'aminoesteroide'],
  },

  {
    id: 'cisatracurio',
    nomeGenerico: 'Cisatracurio',
    nomesComerciais: ['Nimbex'],
    atcCode: 'M03AC11',
    rxNormCui: '1806881',
    drugBankId: 'DB00565',
    snomedCT: '108450002',
    casNumber: '96946-42-8',
    classeTerapeutica: 'relaxante_muscular',
    subclasse: 'bloqueador_neuromuscular',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '2mg/ml (5ml)', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '2mg/ml (10ml)', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '5mg/ml (30ml)', disponivelSUS: false },
    ],
    indicacoes: [
      'Relaxamento muscular em anestesia geral',
      'Facilitacao de intubacao traqueal',
      'Facilitacao de ventilacao mecanica em UTI (SDRA)',
    ],
    mecanismoAcao: 'Isomero cis-cis do atracurio. Bloqueador neuromuscular nao-despolarizante benzilisoquinolinico. Antagonista competitivo de receptores nicotinicos de acetilcolina. Sofre degradacao de Hofmann (quebra espontanea pH e temperatura dependente) independente de funcao hepatica ou renal.',
    posologias: [
      {
        indicacao: 'Intubacao traqueal',
        adultos: {
          dose: '0,15-0,2mg/kg IV',
          frequencia: 'Dose unica',
          observacoes: 'Condicoes de intubacao em 2-3 minutos',
        },
        pediatrico: {
          dose: '0,1-0,15mg/kg IV',
          frequencia: 'Dose unica',
          idadeMinima: '2 anos',
        },
      },
      {
        indicacao: 'Manutencao relaxamento',
        adultos: {
          dose: '0,03mg/kg IV bolus ou 1-3mcg/kg/min em infusao',
          frequencia: 'Conforme TOF',
        },
      },
      {
        indicacao: 'SDRA - bloqueio profundo UTI',
        adultos: {
          dose: '37,5mg/h (aproximadamente)',
          frequencia: 'Infusao continua por ate 48h',
          observacoes: 'Indicacao controversa; dados do estudo ACURASYS',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao cisatracurio ou benzilisoquinolinas',
    ],
    precaucoes: [
      'Inicio de acao mais lento que rocuronio - nao ideal para SRI',
      'Metabolito laudanosina pode acumular em uso prolongado (baixo risco clinico)',
      'Miastenia gravis - extrema sensibilidade',
      'Sem liberacao de histamina nas doses clinicas',
    ],
    efeitosAdversos: {
      comuns: ['Flush cutaneo (raro nas doses usuais)', 'Paralisia residual'],
      graves: ['Anafilaxia (rara)', 'Paralisia prolongada em miopatia'],
    },
    interacoes: [
      {
        medicamento: 'Aminoglicosideos',
        gravidade: 'moderada',
        efeito: 'Potencializacao do bloqueio',
        conduta: 'Monitorar TOF; ajustar dose',
      },
      {
        medicamento: 'Neostigmina',
        gravidade: 'leve',
        efeito: 'Reversao do bloqueio',
        conduta: 'Uso intencional quando TOF >= 2',
      },
      {
        medicamento: 'Corticosteroides (uso prolongado)',
        gravidade: 'moderada',
        efeito: 'Miopatia do paciente critico em uso prolongado concomitante',
        conduta: 'Limitar duracao; interromper quando possivel',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '<10', ajuste: 'Sem ajuste necessario - degradacao de Hofmann' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Nao absorvido; seguro' },
    consideracoesEspeciais: {
      idosos: 'Sem ajuste; monitorar TOF',
      hepatopatas: 'Sem ajuste - metabolismo independente do figado',
    },
    monitorizacao: ['TOF', 'Oximetria', 'Sinais de recuperacao'],
    doencasRelacionadas: ['anestesia', 'SDRA', 'ventilacao-mecanica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['bloqueador neuromuscular', 'Hofmann', 'SDRA', 'benzilisoquinolina'],
  },

  // =============================================================================
  // REVERSORES DE BLOQUEIO NEUROMUSCULAR
  // =============================================================================
  {
    id: 'sugamadex',
    nomeGenerico: 'Sugamadex',
    nomesComerciais: ['Bridion'],
    atcCode: 'V03AB35',
    rxNormCui: '905399',
    drugBankId: 'DB06268',
    snomedCT: '442409001',
    casNumber: '343306-79-6',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '100mg/ml (2ml)', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '100mg/ml (5ml)', disponivelSUS: false },
    ],
    indicacoes: [
      'Reversao do bloqueio neuromuscular induzido por rocuronio ou vecuronio',
      'Reversao imediata de bloqueio profundo (can\'t intubate, can\'t ventilate)',
      'Reversao rotineira ao final de anestesia',
    ],
    mecanismoAcao: 'Ciclodextrina modificada que encapsula seletivamente o rocuronio e vecuronio (aminoesteroides) formando um complexo estavel no plasma. Remove o bloqueador da juncao neuromuscular por gradiente de concentracao, sem necessidade de inibicao da acetilcolinesterase.',
    posologias: [
      {
        indicacao: 'Reversao de bloqueio moderado (TOF >= 2)',
        adultos: {
          dose: '2mg/kg IV',
          frequencia: 'Dose unica',
          observacoes: 'Reversao em 2-3 minutos',
        },
        pediatrico: {
          dose: '2mg/kg IV',
          frequencia: 'Dose unica',
          idadeMinima: '2 anos',
        },
      },
      {
        indicacao: 'Reversao de bloqueio profundo (PTC 1-2)',
        adultos: {
          dose: '4mg/kg IV',
          frequencia: 'Dose unica',
          observacoes: 'Reversao em 3-5 minutos',
        },
      },
      {
        indicacao: 'Reversao imediata (3 min apos rocuronio 1,2mg/kg)',
        adultos: {
          dose: '16mg/kg IV',
          frequencia: 'Dose unica',
          observacoes: 'Para emergencia tipo can\'t intubate, can\'t ventilate',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao sugamadex',
    ],
    precaucoes: [
      'Nao reverte bloqueio por benzilisoquinolinas (atracurio, cisatracurio)',
      'Nao reverte bloqueio por succinilcolina',
      'Pacientes com DRC grave - eliminacao prolongada; funciona mas lentamente',
      'Pode interferir com contraceptivos hormonais (considerar metodo adicional)',
      'Reacoes de hipersensibilidade relatadas',
    ],
    efeitosAdversos: {
      comuns: ['Disgeusia', 'Nausea'],
      graves: ['Anafilaxia', 'Bradicardia grave/assistolia (rara)', 'Broncoespasmo'],
    },
    interacoes: [
      {
        medicamento: 'Contraceptivos hormonais',
        gravidade: 'moderada',
        efeito: 'Pode reduzir eficacia contraceptiva',
        mecanismo: 'Encapsulamento de progestogenios esteroides',
        conduta: 'Usar metodo de barreira adicional por 7 dias',
      },
      {
        medicamento: 'Toremifeno',
        gravidade: 'moderada',
        efeito: 'Pode competir pela ligacao ao sugamadex',
        conduta: 'Monitorar recuperacao neuromuscular',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Eficaz mas eliminacao prolongada; nao recomendado rotineiramente em TFG <30 (sem dados suficientes)' },
    ],
    gestacao: 'N',
    amamentacao: { compativel: true, observacao: 'Dose unica aceitavel' },
    consideracoesEspeciais: {
      idosos: 'Sem ajuste; monitorar recuperacao',
      pediatrico: 'Aprovado para >= 2 anos; eficacia similar a adultos',
    },
    monitorizacao: ['TOF', 'Sinais de recuperacao neuromuscular', 'Reacoes alergicas'],
    doencasRelacionadas: ['anestesia', 'reversao-bloqueio'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['reversao', 'bloqueador neuromuscular', 'ciclodextrina', 'rocuronio'],
  },

  {
    id: 'neostigmina',
    nomeGenerico: 'Neostigmina',
    nomesComerciais: ['Prostigmin', 'Normastig'],
    atcCode: 'N07AA01',
    rxNormCui: '7446',
    drugBankId: 'DB01400',
    snomedCT: '373346001',
    casNumber: '59-99-4',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '0,5mg/ml (1ml)', disponivelSUS: true },
    ],
    indicacoes: [
      'Reversao de bloqueio neuromuscular nao-despolarizante',
      'Miastenia gravis (diagnostico e tratamento)',
      'Atonia vesical e intestinal pos-operatoria',
      'Pseudo-obstrucao colonica aguda (sindrome de Ogilvie)',
    ],
    mecanismoAcao: 'Inibidor reversivel da acetilcolinesterase. Aumenta a concentracao de acetilcolina na juncao neuromuscular, competindo com o bloqueador neuromuscular pelos receptores nicotinicos. Requer co-administracao de anticolinergico (atropina/glicopirrolato) para bloquear efeitos muscarinicos.',
    posologias: [
      {
        indicacao: 'Reversao de bloqueio neuromuscular',
        adultos: {
          dose: '0,04-0,07mg/kg IV (maximo 5mg)',
          frequencia: 'Dose unica',
          observacoes: 'SEMPRE administrar com atropina 0,01-0,02mg/kg ou glicopirrolato 0,01mg/kg ANTES ou junto',
        },
        pediatrico: {
          dose: '0,04mg/kg IV',
          frequencia: 'Dose unica',
          observacoes: 'Com atropina 0,02mg/kg',
        },
      },
      {
        indicacao: 'Sindrome de Ogilvie',
        adultos: {
          dose: '2mg IV lento em 3-5min',
          frequencia: 'Pode repetir em 3h se necessario',
          observacoes: 'Monitorar ECG; ter atropina disponivel',
        },
      },
    ],
    contraindicacoes: [
      'Obstrucao mecanica intestinal ou urinaria',
      'Peritonite',
      'Bradicardia grave ou BAV sem atropina',
      'Uso de succinilcolina (prolonga fase II de bloqueio despolarizante)',
    ],
    precaucoes: [
      'SEMPRE usar com anticolinergico para prevenir bradicardia/hipersecrecao',
      'Nao usar para reverter bloqueio por succinilcolina',
      'Aguardar recuperacao espontanea parcial (TOF >= 2) antes de administrar',
      'Asma - pode precipitar broncoespasmo',
    ],
    efeitosAdversos: {
      comuns: ['Bradicardia (sem anticolinergico)', 'Sialorreia', 'Nausea'],
      graves: ['Bradicardia grave/assistolia', 'Broncoespasmo', 'Convulsoes (overdose)'],
    },
    interacoes: [
      {
        medicamento: 'Atropina/Glicopirrolato',
        gravidade: 'leve',
        efeito: 'Antagoniza efeitos muscarinicos',
        conduta: 'Co-administracao obrigatoria',
      },
      {
        medicamento: 'Aminoglicosideos',
        gravidade: 'moderada',
        efeito: 'Podem antagonizar efeito da neostigmina',
        conduta: 'Pode necessitar doses maiores ou aguardar mais',
      },
      {
        medicamento: 'Corticosteroides',
        gravidade: 'moderada',
        efeito: 'Podem antagonizar efeito na miastenia gravis',
        conduta: 'Ajustar dose de neostigmina',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '30-50', ajuste: 'Reducao de 50% na dose' },
      { tfg: '<30', ajuste: 'Reducao de 75% na dose; eliminacao prolongada' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso unico aceitavel' },
    consideracoesEspeciais: {
      idosos: 'Maior sensibilidade a efeitos muscarinicos; usar anticolinergico adequado',
    },
    monitorizacao: ['ECG', 'Frequencia cardiaca', 'TOF', 'Secrecoes'],
    doencasRelacionadas: ['anestesia', 'miastenia-gravis', 'ileo-paralitico'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['reversao', 'anticolinesterasico', 'miastenia', 'bloqueador neuromuscular'],
  },

  // =============================================================================
  // ANESTESICOS LOCAIS
  // =============================================================================
  {
    id: 'bupivacaina',
    nomeGenerico: 'Bupivacaina',
    nomesComerciais: ['Marcaina', 'Neocaina', 'Sensorcaine'],
    atcCode: 'N01BB01',
    rxNormCui: '1818',
    drugBankId: 'DB00297',
    snomedCT: '387150009',
    casNumber: '2180-92-9',
    classeTerapeutica: 'analgesico',
    subclasse: 'anestesico_local',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '0,25% (20ml)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '0,5% (20ml)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '0,5% com epinefrina (20ml)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '0,5% hiperbarica (4ml)', disponivelSUS: true },
    ],
    indicacoes: [
      'Anestesia epidural',
      'Anestesia subaracnoidea (raquianestesia)',
      'Bloqueios de nervos perifericos',
      'Anestesia infiltrativa',
      'Analgesia pos-operatoria (cateter epidural)',
    ],
    mecanismoAcao: 'Anestesico local do tipo amida de longa duracao. Bloqueia canais de sodio voltagem-dependentes, impedindo a despolarizacao e conducao do impulso nervoso. Alta afinidade proteica resulta em duracao prolongada (3-10 horas dependendo da tecnica).',
    posologias: [
      {
        indicacao: 'Raquianestesia',
        adultos: {
          dose: '7,5-15mg (1,5-3ml de solucao hiperbarica 0,5%)',
          frequencia: 'Dose unica',
          observacoes: 'Ajustar conforme nivel desejado e altura do paciente',
        },
      },
      {
        indicacao: 'Epidural',
        adultos: {
          dose: '50-100mg (10-20ml de 0,5% ou 20-40ml de 0,25%)',
          frequencia: 'Fracionado em bolus de 5ml',
          doseMaxima: '2mg/kg em dose unica',
        },
      },
      {
        indicacao: 'Bloqueio de nervo periferico',
        adultos: {
          dose: '75-150mg (15-30ml de 0,5%)',
          frequencia: 'Dose unica',
          doseMaxima: '2mg/kg; 3mg/kg com epinefrina',
        },
      },
      {
        indicacao: 'Infiltracao local',
        adultos: {
          dose: '25-100mg (10-40ml de 0,25%)',
          frequencia: 'Conforme necessario',
          doseMaxima: '2mg/kg',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a anestesicos locais tipo amida',
      'Anestesia IV regional (bloqueio de Bier) - cardiotoxicidade',
      'Bloqueio paracervical em obstetricia (bradicardia fetal)',
    ],
    precaucoes: [
      'Cardiotoxicidade maior que outros anestesicos locais (resistente a ressuscitacao)',
      'Intralipid 20% deve estar disponivel para tratamento de LAST',
      'Aspirar antes de injetar para evitar injecao intravascular',
      'Dosar meticulosamente - janela terapeutica estreita',
    ],
    efeitosAdversos: {
      comuns: ['Hipotensao (neuroaxial)', 'Bradicardia', 'Retencao urinaria', 'Bloqueio motor'],
      graves: ['Toxicidade sistemica (LAST)', 'Convulsoes', 'Colapso cardiovascular', 'Assistolia'],
    },
    interacoes: [
      {
        medicamento: 'Epinefrina',
        gravidade: 'leve',
        efeito: 'Prolonga duracao e reduz absorcao sistemica',
        conduta: 'Co-administracao frequente',
      },
      {
        medicamento: 'Outros anestesicos locais',
        gravidade: 'moderada',
        efeito: 'Toxicidade aditiva',
        conduta: 'Calcular dose total combinada',
      },
      {
        medicamento: 'Betabloqueadores',
        gravidade: 'moderada',
        efeito: 'Pode aumentar toxicidade cardiaca',
        conduta: 'Cautela; monitorar',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Excrecao minima; compativel' },
    consideracoesEspeciais: {
      idosos: 'Reduzir dose em 20-30%; maior sensibilidade',
      hepatopatas: 'Metabolismo hepatico; reducao de dose em cirrose',
      pediatrico: 'Dose maxima 2,5mg/kg',
    },
    monitorizacao: ['ECG em bloqueios maiores', 'PA', 'Nivel sensitivo', 'Sinais de LAST'],
    doencasRelacionadas: ['anestesia', 'analgesia', 'bloqueio-nervoso'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anestesico local', 'amida', 'neuroaxial', 'bloqueio nervoso'],
  },

  {
    id: 'ropivacaina',
    nomeGenerico: 'Ropivacaina',
    nomesComerciais: ['Naropin', 'Ropi'],
    atcCode: 'N01BB09',
    rxNormCui: '35780',
    drugBankId: 'DB00296',
    snomedCT: '387279002',
    casNumber: '84057-95-4',
    classeTerapeutica: 'analgesico',
    subclasse: 'anestesico_local',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '2mg/ml (0,2%) (20ml)', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '7,5mg/ml (0,75%) (20ml)', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '10mg/ml (1%) (20ml)', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '2mg/ml (100ml) - infusao', disponivelSUS: false },
    ],
    indicacoes: [
      'Anestesia epidural (cirurgica e parto)',
      'Bloqueios de nervos perifericos',
      'Analgesia epidural pos-operatoria',
      'Anestesia infiltrativa',
    ],
    mecanismoAcao: 'Anestesico local do tipo amida, enantiomero S(-) puro. Bloqueia canais de sodio voltagem-dependentes com menor cardiotoxicidade que bupivacaina (menor afinidade por canais cardiacos). Produz bloqueio diferencial com maior componente sensitivo que motor em concentracoes baixas.',
    posologias: [
      {
        indicacao: 'Epidural para parto',
        adultos: {
          dose: '20-40mg (10-20ml de 0,2%)',
          frequencia: 'Bolus fracionado',
          observacoes: 'Manutencao: 6-14ml/h de 0,2% +/- opioide',
        },
      },
      {
        indicacao: 'Epidural cirurgica',
        adultos: {
          dose: '75-150mg (15-20ml de 0,75%)',
          frequencia: 'Bolus fracionado em 5ml',
          doseMaxima: '3mg/kg',
        },
      },
      {
        indicacao: 'Bloqueio de nervo periferico',
        adultos: {
          dose: '75-300mg dependendo do bloqueio',
          frequencia: 'Dose unica',
          doseMaxima: '3mg/kg',
          observacoes: '0,5% para bloqueio sensitivo+motor; 0,2% para analgesia',
        },
      },
      {
        indicacao: 'Infiltracao',
        adultos: {
          dose: 'Ate 200mg (0,2-0,5%)',
          frequencia: 'Conforme necessario',
          doseMaxima: '3mg/kg',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a anestesicos locais tipo amida',
      'Anestesia IV regional (bloqueio de Bier)',
    ],
    precaucoes: [
      'Menor cardiotoxicidade que bupivacaina, mas LAST ainda possivel',
      'Intralipid deve estar disponivel',
      'Bloqueio motor menor - vantagem em analgesia de parto',
      'Aspirar antes de injetar',
    ],
    efeitosAdversos: {
      comuns: ['Hipotensao', 'Bradicardia', 'Nausea', 'Parestesias'],
      graves: ['LAST', 'Convulsoes', 'Arritmias (menos que bupivacaina)'],
    },
    interacoes: [
      {
        medicamento: 'Outros anestesicos locais',
        gravidade: 'moderada',
        efeito: 'Toxicidade aditiva',
        conduta: 'Calcular dose total combinada',
      },
      {
        medicamento: 'Inibidores CYP1A2 (fluvoxamina)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de ropivacaina',
        conduta: 'Evitar infusoes prolongadas com esses farmacos',
      },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Excrecao minima; seguro' },
    consideracoesEspeciais: {
      idosos: 'Reducao de dose; bloqueio mais prolongado',
      hepatopatas: 'Metabolismo hepatico CYP1A2; reduzir dose em cirrose',
      pediatrico: 'Dose maxima 3mg/kg',
    },
    monitorizacao: ['PA', 'FC', 'Nivel de bloqueio', 'Sinais de LAST'],
    doencasRelacionadas: ['anestesia', 'analgesia-parto', 'bloqueio-nervoso'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anestesico local', 'amida', 'epidural', 'menor cardiotoxicidade'],
  },
];
