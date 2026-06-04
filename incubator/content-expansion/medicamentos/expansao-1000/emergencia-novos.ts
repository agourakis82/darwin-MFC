/**
 * EMERGENCIA E CUIDADOS CRITICOS - DARWIN-MFC EXPANSAO 1000
 * =========================================================
 * Medicamentos de emergencia com abordagem ontology-first
 *
 * Ontologias incluidas:
 * - ATC (Anatomical Therapeutic Chemical) - OMS
 * - RxNorm CUI - NIH
 * - DrugBank ID
 * - SNOMED-CT
 *
 * Referencias:
 * - ACLS/PALS Guidelines 2020-2025
 * - Surviving Sepsis Campaign 2021
 * - MHSA Guidelines
 * - UpToDate Drug Information
 */

import { Medicamento } from '@/lib/types/medicamento';

export const emergenciaNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // CATECOLAMINAS E VASOPRESSORES
  // =============================================================================
  {
    id: 'adrenalina-emergencia',
    nomeGenerico: 'Adrenalina (Epinefrina)',
    nomesComerciais: ['Adrenalina', 'EpiPen', 'Anapen'],
    atcCode: 'C01CA24',
    rxNormCui: '3992',
    drugBankId: 'DB00668',
    snomedCT: '387362001',
    casNumber: '51-43-4',
    classeTerapeutica: 'cardiotonico',
    subclasse: 'vasopressor',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '1mg/mL (1:1000)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '0,1mg/mL (1:10000)', disponivelSUS: true },
    ],
    indicacoes: [
      'Parada cardiorrespiratoria (PCR)',
      'Anafilaxia',
      'Choque anafilatico',
      'Broncoespasmo grave refratario',
      'Choque cardiogenico refratario',
    ],
    mecanismoAcao: 'Agonista alfa-1, beta-1 e beta-2 adrenergico. Efeitos alfa: vasoconstriccao periferica, aumento RVS, aumento PAD e perfusao coronariana na PCR. Efeitos beta-1: cronotropismo e inotropismo positivos. Efeitos beta-2: broncodilatacao, vasodilatacao muscular.',
    posologias: [
      {
        indicacao: 'PCR (ACLS)',
        adultos: {
          dose: '1mg IV/IO',
          frequencia: 'A cada 3-5 minutos',
          observacoes: 'Ritmos nao chocaveis: administrar assim que acesso obtido. Ritmos chocaveis: apos 2o choque.',
        },
        pediatrico: {
          dose: '0,01mg/kg (0,1mL/kg da 1:10000)',
          frequencia: 'A cada 3-5 minutos',
          doseMaxima: '1mg/dose',
        },
      },
      {
        indicacao: 'Anafilaxia',
        adultos: {
          dose: '0,3-0,5mg IM (face anterolateral da coxa)',
          frequencia: 'Repetir a cada 5-15 minutos se necessario',
          observacoes: 'Via IM preferencial. IV reservada para choque refratario.',
        },
        pediatrico: {
          dose: '0,01mg/kg IM',
          frequencia: 'Repetir a cada 5-15 minutos',
          doseMaxima: '0,3mg se <30kg; 0,5mg se >30kg',
        },
      },
      {
        indicacao: 'Infusao continua (choque)',
        adultos: {
          dose: '0,1-1 mcg/kg/min IV',
          frequencia: 'Titulacao por PAM',
          observacoes: 'Acesso central preferencial. Associar a noradrenalina se necessario.',
        },
      },
    ],
    contraindicacoes: [
      'Nenhuma contraindicacao absoluta em emergencia',
    ],
    precaucoes: [
      'Via IM para anafilaxia (nao SC)',
      'Extravasamento pode causar necrose - preferir acesso central',
      'Cuidado em coronariopatas (isquemia miocardica)',
      'Pode agravar arritmias',
      'Hipertireoidismo - usar com cautela',
    ],
    efeitosAdversos: {
      comuns: ['Taquicardia', 'Palpitacoes', 'Tremor', 'Ansiedade', 'Cefaleia'],
      graves: ['Arritmias ventriculares', 'Isquemia miocardica', 'Hemorragia cerebral', 'Edema pulmonar'],
    },
    interacoes: [
      {
        medicamento: 'Beta-bloqueadores',
        gravidade: 'moderada',
        efeito: 'Hipertensao paradoxal e bradicardia reflexa',
        conduta: 'Considerar glucagon em choque anafilatico refratario',
      },
      {
        medicamento: 'IMAO',
        gravidade: 'grave',
        efeito: 'Crise hipertensiva',
        mecanismo: 'Inibicao do metabolismo de catecolaminas',
        conduta: 'Reduzir dose se possivel',
      },
      {
        medicamento: 'Antidepressivos triciclicos',
        gravidade: 'moderada',
        efeito: 'Potencializacao dos efeitos cardiovasculares',
        conduta: 'Usar doses menores de adrenalina',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso em emergencia justificado' },
    monitorizacao: [
      'ECG continuo',
      'Pressao arterial invasiva se disponivel',
      'Frequencia cardiaca',
      'Perfusao periferica',
      'Debito urinario',
    ],
    orientacoesPaciente: [
      'Medicamento de emergencia',
      'Canetas auto-injetoras devem ser carregadas por pacientes com historico de anafilaxia',
      'Aplicar na face lateral da coxa',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de eventos cardiovasculares; usar doses mais baixas quando possivel',
      pediatrico: 'Dose baseada em peso; nao exceder dose de adulto',
    },
    doencasRelacionadas: ['pcr', 'anafilaxia', 'choque', 'broncoespasmo'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['epinefrina', 'adrenalina', 'ACLS', 'anafilaxia', 'PCR', 'vasopressor', 'emergencia'],
  },

  {
    id: 'noradrenalina-emergencia',
    nomeGenerico: 'Noradrenalina (Norepinefrina)',
    nomesComerciais: ['Levophed', 'Hyponor', 'Noradren'],
    atcCode: 'C01CA03',
    rxNormCui: '7512',
    drugBankId: 'DB00368',
    snomedCT: '387483007',
    casNumber: '51-41-2',
    classeTerapeutica: 'cardiotonico',
    subclasse: 'vasopressor',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '1mg/mL (4mL)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '2mg/mL (4mL)', disponivelSUS: true },
    ],
    indicacoes: [
      'Choque septico (1a escolha - SSC 2021)',
      'Choque distributivo',
      'Hipotensao refrataria pos-RCE',
      'Choque cardiogenico (associado a dobutamina)',
    ],
    mecanismoAcao: 'Agonista alfa-1 predominante com atividade beta-1. Potente vasoconstriccao periferica com aumento de RVS e PAM. Efeito inotropico positivo menor que adrenalina. Minimo efeito beta-2.',
    posologias: [
      {
        indicacao: 'Choque septico/distributivo',
        adultos: {
          dose: 'Iniciar 0,1-0,2 mcg/kg/min',
          frequencia: 'Infusao continua',
          doseMaxima: '3 mcg/kg/min (doses mais altas associadas a pior prognostico)',
          observacoes: 'Titular para PAM alvo (geralmente 65mmHg). Preferir acesso central.',
        },
      },
    ],
    contraindicacoes: [
      'Hipovolemia nao corrigida (relativa)',
      'Trombose mesenterica/periferica (relativa)',
    ],
    precaucoes: [
      'Obrigatorio acesso central para infusao prolongada',
      'Extravasamento causa necrose grave - fentolamina como antidoto local',
      'Corrigir hipovolemia antes ou concomitantemente',
      'Monitorizar perfusao periferica (risco de isquemia digital)',
    ],
    efeitosAdversos: {
      comuns: ['Hipertensao', 'Bradicardia reflexa', 'Isquemia periferica'],
      graves: ['Necrose por extravasamento', 'Isquemia mesenterica', 'Isquemia miocardica', 'Arritmias'],
    },
    interacoes: [
      {
        medicamento: 'IMAO',
        gravidade: 'grave',
        efeito: 'Crise hipertensiva grave',
        conduta: 'Reduzir dose para 1/10 se IMAO nas ultimas 2 semanas',
      },
      {
        medicamento: 'Beta-bloqueadores',
        gravidade: 'moderada',
        efeito: 'Hipertensao exacerbada',
        conduta: 'Monitorar PA rigorosamente',
      },
      {
        medicamento: 'Anestesicos halogenados',
        gravidade: 'moderada',
        efeito: 'Risco de arritmias',
        conduta: 'Monitorar ECG',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>15', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso em emergencia' },
    monitorizacao: [
      'PAM invasiva (preferencial)',
      'ECG continuo',
      'Debito urinario',
      'Lactato serico',
      'Perfusao periferica e extremidades',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior sensibilidade; iniciar com doses mais baixas',
    },
    doencasRelacionadas: ['choque-septico', 'choque-distributivo', 'hipotensao-refrataria'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['noradrenalina', 'norepinefrina', 'vasopressor', 'choque-septico', 'SSC', 'sepse'],
  },

  {
    id: 'vasopressina-emergencia',
    nomeGenerico: 'Vasopressina (Arginina vasopressina)',
    nomesComerciais: ['Pitressin', 'Vasostrict'],
    atcCode: 'H01BA01',
    rxNormCui: '11149',
    drugBankId: 'DB00067',
    snomedCT: '77671006',
    casNumber: '113-79-1',
    classeTerapeutica: 'hormonio',
    subclasse: 'vasopressor',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '20 UI/mL', disponivelSUS: true },
    ],
    indicacoes: [
      'Choque septico refratario a noradrenalina (adjuvante)',
      'Choque vasoplegico pos-cirurgia cardiaca',
      'PCR (alternativa ou adjunto a adrenalina)',
      'Diabetes insipidus central',
      'Sangramento varicoso esofagico',
    ],
    mecanismoAcao: 'Agonista receptores V1 (vasculares) e V2 (renais). Causa vasoconstriccao independente de catecolaminas. No choque septico, niveis endogenos estao reduzidos - reposicao fisiologica.',
    posologias: [
      {
        indicacao: 'Choque septico (adjuvante)',
        adultos: {
          dose: '0,03-0,04 UI/min IV',
          frequencia: 'Infusao continua - dose fixa',
          observacoes: 'NAO titular. Adicionar quando noradrenalina >0,25-0,5 mcg/kg/min para poupar catecolaminas.',
        },
      },
      {
        indicacao: 'PCR (ACLS)',
        adultos: {
          dose: '40 UI IV bolus',
          frequencia: 'Dose unica (pode substituir 1a ou 2a dose de adrenalina)',
        },
      },
    ],
    contraindicacoes: [
      'Uso como vasopressor unico (sempre adjunto)',
      'Doenca arterial coronariana grave (relativa)',
    ],
    precaucoes: [
      'Nao usar como vasopressor primario',
      'Risco de isquemia esplacnica e digital',
      'Pode causar hiponatremia (efeito V2)',
      'Evitar doses altas (>0,04 UI/min) - associadas a isquemia',
    ],
    efeitosAdversos: {
      comuns: ['Palidez', 'Nausea', 'Colica abdominal'],
      graves: ['Isquemia digital', 'Isquemia mesenterica', 'Isquemia coronariana', 'Hiponatremia grave'],
    },
    interacoes: [
      {
        medicamento: 'Noradrenalina',
        gravidade: 'leve',
        efeito: 'Sinergismo desejado',
        conduta: 'Combinacao terapeutica usual',
      },
      {
        medicamento: 'Carbamazepina',
        gravidade: 'moderada',
        efeito: 'Aumento do efeito antidiuretico',
        conduta: 'Monitorar sodio',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso em emergencia justificado' },
    monitorizacao: [
      'PAM',
      'Sodio serico',
      'Perfusao periferica',
      'Debito urinario',
      'Sinais de isquemia intestinal',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de isquemia; monitorar perfusao',
    },
    doencasRelacionadas: ['choque-septico', 'choque-vasoplegico', 'pcr'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['vasopressina', 'ADH', 'choque-septico', 'vasopressor', 'VASST'],
  },

  {
    id: 'dobutamina-emergencia',
    nomeGenerico: 'Dobutamina',
    nomesComerciais: ['Dobutrex', 'Dobutamina'],
    atcCode: 'C01CA07',
    rxNormCui: '3616',
    drugBankId: 'DB00841',
    snomedCT: '387145002',
    casNumber: '34368-04-2',
    classeTerapeutica: 'cardiotonico',
    subclasse: 'inotropico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '12,5mg/mL (20mL)', disponivelSUS: true },
    ],
    indicacoes: [
      'Choque cardiogenico',
      'Insuficiencia cardiaca aguda descompensada',
      'Baixo debito cardiaco pos-cirurgia cardiaca',
      'Teste de estresse farmacologico (ecocardiograma)',
    ],
    mecanismoAcao: 'Agonista beta-1 seletivo com efeito inotropico positivo predominante. Aumenta contratilidade miocardica e debito cardiaco. Efeito beta-2 leve causa vasodilatacao periferica - pode reduzir pos-carga.',
    posologias: [
      {
        indicacao: 'Suporte inotropico',
        adultos: {
          dose: 'Iniciar 2,5 mcg/kg/min',
          frequencia: 'Infusao continua',
          doseMaxima: '20 mcg/kg/min',
          observacoes: 'Titular a cada 10-15 minutos ate resposta clinica ou dose maxima.',
        },
      },
      {
        indicacao: 'Eco de estresse',
        adultos: {
          dose: 'Iniciar 5 mcg/kg/min, aumentar a cada 3min (10, 20, 30, 40 mcg/kg/min)',
          frequencia: 'Protocolo escalonado',
        },
      },
    ],
    contraindicacoes: [
      'Estenose aortica grave',
      'Cardiomiopatia hipertrofica obstrutiva',
      'Tamponamento cardiaco',
    ],
    precaucoes: [
      'Pode causar hipotensao inicial (efeito beta-2)',
      'Associar vasopressor se PA baixa',
      'Aumenta consumo miocardico de O2',
      'Fibrilacao atrial com RVR - controlar FC antes',
    ],
    efeitosAdversos: {
      comuns: ['Taquicardia', 'Palpitacoes', 'Cefaleia', 'Hipotensao'],
      graves: ['Arritmias ventriculares', 'Isquemia miocardica', 'Taquicardia ventricular'],
    },
    interacoes: [
      {
        medicamento: 'Beta-bloqueadores',
        gravidade: 'moderada',
        efeito: 'Antagonismo - reduz eficacia da dobutamina',
        conduta: 'Pode necessitar doses maiores de dobutamina',
      },
      {
        medicamento: 'Entacapone/Tolcapone',
        gravidade: 'moderada',
        efeito: 'Potencializacao dos efeitos',
        conduta: 'Iniciar com doses mais baixas',
      },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Uso em emergencia' },
    monitorizacao: [
      'ECG continuo',
      'Pressao arterial',
      'Debito cardiaco (se cateter de Swan-Ganz)',
      'Saturacao venosa mista',
      'Lactato',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior sensibilidade a arritmias; iniciar com doses baixas',
    },
    doencasRelacionadas: ['choque-cardiogenico', 'insuficiencia-cardiaca-aguda', 'baixo-debito'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['dobutamina', 'inotropico', 'choque-cardiogenico', 'IC-aguda'],
  },

  // =============================================================================
  // ANTIARRITMICOS DE EMERGENCIA
  // =============================================================================
  {
    id: 'atropina-emergencia',
    nomeGenerico: 'Atropina (Sulfato)',
    nomesComerciais: ['Atropina'],
    atcCode: 'A03BA01',
    rxNormCui: '1223',
    drugBankId: 'DB00572',
    snomedCT: '372832002',
    casNumber: '51-55-8',
    classeTerapeutica: 'outros',
    subclasse: 'anticolinergico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '0,25mg/mL (1mL)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '0,5mg/mL (1mL)', disponivelSUS: true },
    ],
    indicacoes: [
      'Bradicardia sintomatica',
      'Intoxicacao por organofosforados/carbamatos',
      'Intoxicacao por colinergicos',
      'Pre-medicacao anestesica (reducao secrecoes)',
    ],
    mecanismoAcao: 'Antagonista competitivo dos receptores muscarinicos (M1-M5). Bloqueia acao do parassimpatico no coracao (aumento FC), glandulas (reducao secrecoes), musculo liso (relaxamento) e SNC.',
    posologias: [
      {
        indicacao: 'Bradicardia sintomatica (ACLS)',
        adultos: {
          dose: '1mg IV',
          frequencia: 'Repetir a cada 3-5 minutos',
          doseMaxima: '3mg (dose vagolitica total)',
          observacoes: 'Doses <0,5mg podem causar bradicardia paradoxal.',
        },
        pediatrico: {
          dose: '0,02mg/kg IV',
          frequencia: 'Repetir uma vez se necessario',
          doseMaxima: '0,5mg (crianca); 1mg (adolescente)',
          idadeMinima: 'Neonatos',
        },
      },
      {
        indicacao: 'Intoxicacao organofosforado',
        adultos: {
          dose: '2-4mg IV, repetir a cada 5-10min',
          frequencia: 'Titular ate secrecoes secas',
          observacoes: 'Podem ser necessarios gramas de atropina. Objetivo: secrecoes secas, FC >80, ausencia de broncoespasmo.',
        },
      },
    ],
    contraindicacoes: [
      'Glaucoma de angulo fechado',
      'Taquiarritmias',
      'Obstrucao intestinal',
      'Miastenia gravis (relativa)',
    ],
    precaucoes: [
      'Doses <0,5mg podem causar bradicardia paradoxal',
      'Ineficaz em bradicardia por bloqueio infranodal (BAV 2o Mobitz II, BAVT)',
      'Cuidado em coronariopatas (aumenta demanda O2)',
      'Pode precipitar retencao urinaria em HPB',
    ],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Taquicardia', 'Midriase', 'Visao turva', 'Retencao urinaria'],
      graves: ['Delirium anticolinergico', 'Taquiarritmias', 'Hipertermia'],
    },
    interacoes: [
      {
        medicamento: 'Outros anticolinergicos',
        gravidade: 'moderada',
        efeito: 'Toxicidade anticolinergica aditiva',
        conduta: 'Monitorar sinais de toxicidade',
      },
      {
        medicamento: 'Pralidoxima',
        gravidade: 'leve',
        efeito: 'Sinergismo em intoxicacao por organofosforado',
        conduta: 'Usar em conjunto',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Pequena quantidade excretada no leite' },
    monitorizacao: [
      'Frequencia cardiaca',
      'ECG',
      'Debito urinario',
      'Nivel de consciencia',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de delirium e retencao urinaria',
      pediatrico: 'Dose minima 0,1mg (evitar bradicardia paradoxal)',
    },
    doencasRelacionadas: ['bradicardia', 'intoxicacao-organofosforado', 'intoxicacao-colinergica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['atropina', 'anticolinergico', 'bradicardia', 'ACLS', 'organofosforado'],
  },

  {
    id: 'amiodarona-iv-emergencia',
    nomeGenerico: 'Amiodarona Injetavel',
    nomesComerciais: ['Ancoron', 'Atlansil', 'Cordarone'],
    atcCode: 'C01BD01',
    rxNormCui: '703',
    drugBankId: 'DB01118',
    snomedCT: '372821002',
    casNumber: '1951-25-3',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'antiarritmico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '50mg/mL (3mL)', disponivelSUS: true },
    ],
    indicacoes: [
      'FV/TV sem pulso refrataria a desfibrilacao (ACLS)',
      'TV com pulso (estavel ou instavel)',
      'FA com resposta ventricular rapida',
      'Taquicardias de QRS largo',
    ],
    mecanismoAcao: 'Antiarritmico classe III (bloqueio canais K+) com propriedades de todas as classes (I-IV). Prolonga duracao do potencial de acao e periodo refratario em todos os tecidos cardiacos. Tambem bloqueia canais Na+, Ca++ e receptores alfa/beta adrenergicos.',
    posologias: [
      {
        indicacao: 'PCR - FV/TV refrataria',
        adultos: {
          dose: '300mg IV/IO bolus',
          frequencia: 'Apos 3o choque; dose adicional 150mg apos 5o choque se necessario',
          observacoes: 'Administrar em bolus. Se RCE, iniciar infusao de manutencao.',
        },
        pediatrico: {
          dose: '5mg/kg IV/IO bolus',
          frequencia: 'Repetir ate 15mg/kg',
          doseMaxima: '300mg/dose',
        },
      },
      {
        indicacao: 'Taquiarritmia estavel',
        adultos: {
          dose: '150mg IV em 10min, seguido de 1mg/min por 6h, depois 0,5mg/min por 18h',
          frequencia: 'Protocolo 24h',
          doseMaxima: '2,2g/24h',
          observacoes: 'Diluir em SG5%. Usar acesso central se possivel (flebite).',
        },
      },
    ],
    contraindicacoes: [
      'Bradicardia sinusal grave ou BAV sem marcapasso',
      'Disfuncao do no sinusal',
      'Prolongamento QT basal significativo',
      'Choque cardiogenico',
      'Hipersensibilidade ao iodo',
    ],
    precaucoes: [
      'Flebite frequente - preferir acesso central',
      'Hipotensao durante infusao - reduzir velocidade',
      'Interage com multiplos medicamentos',
      'Toxicidade pulmonar e hepatica (uso prolongado)',
      'Disfuncao tireoidiana (contem iodo)',
    ],
    efeitosAdversos: {
      comuns: ['Hipotensao', 'Bradicardia', 'Flebite', 'Nausea'],
      graves: ['Torsades de pointes', 'Bloqueio AV completo', 'Hepatotoxicidade', 'Fibrose pulmonar'],
    },
    interacoes: [
      {
        medicamento: 'Farmacos que prolongam QT',
        gravidade: 'grave',
        efeito: 'Torsades de pointes',
        conduta: 'Evitar combinacao',
      },
      {
        medicamento: 'Varfarina',
        gravidade: 'grave',
        efeito: 'Aumenta INR 2-3x',
        mecanismo: 'Inibicao CYP2C9',
        conduta: 'Reduzir dose de varfarina em 50%',
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'grave',
        efeito: 'Aumenta niveis de digoxina',
        conduta: 'Reduzir dose de digoxina em 50%',
      },
      {
        medicamento: 'Beta-bloqueadores',
        gravidade: 'moderada',
        efeito: 'Bradicardia e bloqueio AV',
        conduta: 'Monitorar ECG',
      },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Excretado no leite; pode causar hipotireoidismo neonatal' },
    monitorizacao: [
      'ECG continuo (QTc)',
      'Pressao arterial',
      'Funcao hepatica',
      'Funcao tireoidiana',
      'Rx torax (uso prolongado)',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de bradicardia e interacoes',
      hepatopatas: 'Cautela; ajustar dose se necessario',
    },
    doencasRelacionadas: ['fibrilacao-ventricular', 'taquicardia-ventricular', 'fibrilacao-atrial'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['amiodarona', 'antiarritmico', 'ACLS', 'FV', 'TV', 'FA'],
  },

  {
    id: 'adenosina-emergencia',
    nomeGenerico: 'Adenosina',
    nomesComerciais: ['Adenocard', 'Adenosina'],
    atcCode: 'C01EB10',
    rxNormCui: '313',
    drugBankId: 'DB00640',
    snomedCT: '387139007',
    casNumber: '58-61-7',
    classeTerapeutica: 'outros',
    subclasse: 'antiarritmico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '3mg/mL (2mL)', disponivelSUS: true },
    ],
    indicacoes: [
      'Taquicardia supraventricular paroxistica (TSVP)',
      'Diagnostico diferencial de taquicardia de QRS estreito',
      'Taquicardia de QRS largo de origem incerta (diagnostica)',
    ],
    mecanismoAcao: 'Agonista do receptor A1 de adenosina. Causa depressao transiente do no AV (bloqueio), interrompendo circuitos de reentrada que utilizam o no AV. Meia-vida ultracurta (<10 segundos).',
    posologias: [
      {
        indicacao: 'TSVP',
        adultos: {
          dose: '6mg IV bolus rapido, seguido de 12mg se sem resposta, repetir 12mg uma vez',
          frequencia: 'Intervalos de 1-2 minutos',
          observacoes: 'Administrar em veia proximal (antecubital ou central) seguido de flush rapido de 20mL SF. ECG durante administracao.',
        },
        pediatrico: {
          dose: '0,1mg/kg IV (max 6mg), depois 0,2mg/kg (max 12mg)',
          frequencia: 'Repetir uma vez se necessario',
        },
      },
    ],
    contraindicacoes: [
      'Asma/DPOC grave (broncoespasmo)',
      'BAV 2o ou 3o grau sem marcapasso',
      'Doenca do no sinusal sem marcapasso',
      'FA pre-excitada (WPW com FA)',
      'Transplante cardiaco (hipersensibilidade)',
    ],
    precaucoes: [
      'Manter desfibrilador proximo',
      'Pode causar assistolia transitoria (segundos)',
      'Pacientes em uso de dipiridamol - reduzir dose',
      'Usuarios de cafeina/teofilina - pode necessitar dose maior',
      'Nao eficaz em flutter atrial, FA ou TV',
    ],
    efeitosAdversos: {
      comuns: ['Flushing', 'Dispneia transitoria', 'Desconforto toracico', 'Sensacao de morte iminente'],
      graves: ['Broncoespasmo grave', 'Assistolia prolongada', 'Inducao de FA', 'Torsades (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Dipiridamol',
        gravidade: 'grave',
        efeito: 'Potencializa efeito da adenosina (bloqueia recaptacao)',
        conduta: 'Reduzir dose de adenosina para 3mg inicial',
      },
      {
        medicamento: 'Cafeina/Teofilina',
        gravidade: 'moderada',
        efeito: 'Antagonizam adenosina',
        conduta: 'Pode necessitar doses maiores',
      },
      {
        medicamento: 'Carbamazepina',
        gravidade: 'moderada',
        efeito: 'Potencializa bloqueio AV',
        conduta: 'Usar com cautela',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Meia-vida ultracurta; seguro' },
    monitorizacao: [
      'ECG continuo durante e apos administracao',
      'Frequencia cardiaca',
      'Pressao arterial',
    ],
    orientacoesPaciente: [
      'Sintomas de desconforto (flushing, dispneia) sao esperados e muito breves',
      'Medicamento tem duracao de segundos',
    ],
    consideracoesEspeciais: {
      pediatrico: 'Mesma tecnica de administracao; dose por peso',
    },
    doencasRelacionadas: ['tsvp', 'taquicardia-supraventricular', 'sindrome-wolff-parkinson-white'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['adenosina', 'TSVP', 'antiarritmico', 'ACLS', 'taquicardia-supraventricular'],
  },

  // =============================================================================
  // ELETROLITOS E ESTABILIZADORES
  // =============================================================================
  {
    id: 'gluconato-calcio-emergencia',
    nomeGenerico: 'Gluconato de Calcio',
    nomesComerciais: ['Gluconato de Calcio 10%'],
    atcCode: 'A12AA03',
    rxNormCui: '4448',
    drugBankId: 'DB00326',
    snomedCT: '387368005',
    casNumber: '299-28-5',
    classeTerapeutica: 'suplemento',
    subclasse: 'eletrolito',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '10% (100mg/mL - 10mL)', disponivelSUS: true },
    ],
    indicacoes: [
      'Hipercalemia com alteracoes no ECG (cardioprotetor)',
      'Hipocalcemia sintomatica',
      'Intoxicacao por bloqueador de canal de calcio',
      'Intoxicacao por fluoreto',
      'Hipermagnesemia grave',
      'Transfusao macica (quelacao por citrato)',
    ],
    mecanismoAcao: 'Fornece calcio ionizado. Na hipercalemia, estabiliza a membrana miocardica antagonizando os efeitos do potassio na conducao cardiaca. Na intoxicacao por BCC, restaura calcio intracelular para contracao.',
    posologias: [
      {
        indicacao: 'Hipercalemia (estabilizacao cardiaca)',
        adultos: {
          dose: '1-2g (10-20mL de solucao 10%) IV em 2-3 minutos',
          frequencia: 'Repetir em 5 minutos se alteracoes ECG persistirem',
          observacoes: 'Efeito imediato mas transitorio (30-60min). Nao reduz K+ serico - usar outras medidas.',
        },
        pediatrico: {
          dose: '0,5mL/kg (50mg/kg) IV lento',
          frequencia: 'Repetir em 5 minutos se alteracoes ECG persistirem',
          doseMaxima: '20mL',
        },
      },
      {
        indicacao: 'Hipocalcemia sintomatica',
        adultos: {
          dose: '1-2g IV em 10-20 minutos, seguido de infusao se necessario',
          frequencia: 'Titular por calcio ionico',
        },
      },
      {
        indicacao: 'Intoxicacao por BCC',
        adultos: {
          dose: '3-6g IV bolus, seguido de 0,3-0,6g/h em infusao',
          frequencia: 'Titular por resposta clinica',
          observacoes: 'Doses altas podem ser necessarias. Monitorar calcio ionico.',
        },
      },
    ],
    contraindicacoes: [
      'Hipercalcemia',
      'Intoxicacao digitalica (potencializa toxicidade)',
      'Fibrilacao ventricular',
    ],
    precaucoes: [
      'Infusao IV lenta (bradicardia se rapido)',
      'Nao misturar com bicarbonato (precipitacao)',
      'Extravasamento causa necrose tecidual',
      'Usar linha exclusiva',
    ],
    efeitosAdversos: {
      comuns: ['Flushing', 'Gosto metalico', 'Sensacao de calor'],
      graves: ['Bradicardia/parada cardiaca se infusao rapida', 'Necrose tecidual por extravasamento', 'Hipercalcemia'],
    },
    interacoes: [
      {
        medicamento: 'Digoxina',
        gravidade: 'grave',
        efeito: 'Potencializa toxicidade digitalica',
        conduta: 'Usar com extrema cautela em pacientes digitalizados',
      },
      {
        medicamento: 'Bicarbonato de sodio',
        gravidade: 'grave',
        efeito: 'Precipitacao',
        conduta: 'NUNCA administrar na mesma via',
      },
      {
        medicamento: 'Ceftriaxona',
        gravidade: 'grave',
        efeito: 'Precipitacao - pode ser fatal em neonatos',
        conduta: 'Nao administrar pela mesma via, especialmente em neonatos',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Seguro' },
    monitorizacao: [
      'ECG durante infusao',
      'Calcio ionico serico',
      'Frequencia cardiaca',
      'Local de infusao (extravasamento)',
    ],
    consideracoesEspeciais: {
      pediatrico: 'Diluir e infundir lentamente; risco de bradicardia',
      idosos: 'Cuidado com comorbidades cardiacas',
    },
    doencasRelacionadas: ['hipercalemia', 'hipocalcemia', 'intoxicacao-bcc'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['gluconato-calcio', 'calcio', 'hipercalemia', 'hipocalcemia', 'cardioprotetor'],
  },

  {
    id: 'bicarbonato-sodio-emergencia',
    nomeGenerico: 'Bicarbonato de Sodio',
    nomesComerciais: ['Bicarbonato de Sodio 8,4%'],
    atcCode: 'B05XA02',
    rxNormCui: '1547',
    drugBankId: 'DB01390',
    snomedCT: '387319002',
    casNumber: '144-55-8',
    classeTerapeutica: 'suplemento',
    subclasse: 'eletrolito',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '8,4% (1mEq/mL - 10mL)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '8,4% (1mEq/mL - 250mL)', disponivelSUS: true },
    ],
    indicacoes: [
      'Acidose metabolica grave (pH <7,1)',
      'Hipercalemia grave (adjuvante)',
      'Intoxicacao por antidepressivos triciclicos',
      'Intoxicacao por salicilatos (alcalinizacao urinaria)',
      'PCR prolongada (controverso)',
    ],
    mecanismoAcao: 'Agente tamponante que neutraliza acidos (H+) formando acido carbonico que se dissocia em CO2 e H2O. Aumenta pH sanguineo. Na hipercalemia, promove shift de K+ para o intracelular. Na intoxicacao por triciclicos, alcalinizacao reduz toxicidade cardiaca.',
    posologias: [
      {
        indicacao: 'Acidose metabolica grave',
        adultos: {
          dose: 'Deficit HCO3 = 0,3 x peso x (24 - HCO3 atual); repor 50% em 4-8h',
          frequencia: 'Titular por gasometria',
          observacoes: 'Alvo: pH >7,2. Evitar correcao rapida ou excessiva.',
        },
      },
      {
        indicacao: 'Hipercalemia (adjuvante)',
        adultos: {
          dose: '50mEq (50mL de 8,4%) IV em 5 minutos',
          frequencia: 'Pode repetir conforme K+ e gasometria',
          observacoes: 'Mais eficaz se acidose associada. Efeito em 15-30min.',
        },
      },
      {
        indicacao: 'Intoxicacao por triciclicos',
        adultos: {
          dose: '1-2mEq/kg IV em bolus',
          frequencia: 'Repetir ate pH 7,5 ou QRS <100ms',
          observacoes: 'Alvo: pH arterial 7,45-7,55. Manter alcalose.',
        },
      },
    ],
    contraindicacoes: [
      'Alcalose metabolica',
      'Hipocalcemia (pode agravar)',
      'Hipocalemia (pode agravar)',
      'Hipernatremia grave',
    ],
    precaucoes: [
      'Gera CO2 - ventilacao adequada necessaria',
      'Pode piorar acidose intracelular paradoxalmente',
      'Sobrecarga de sodio e volume',
      'Precipita com calcio - usar vias separadas',
      'Nao recomendado rotineiramente em PCR',
    ],
    efeitosAdversos: {
      comuns: ['Alcalose metabolica', 'Hipernatremia', 'Hipocalemia'],
      graves: ['Hipocalcemia', 'Convulsoes (alcalose severa)', 'Edema cerebral', 'Arritmias'],
    },
    interacoes: [
      {
        medicamento: 'Gluconato de calcio',
        gravidade: 'grave',
        efeito: 'Precipitacao',
        conduta: 'NUNCA misturar na mesma linha',
      },
      {
        medicamento: 'Catecolaminas',
        gravidade: 'moderada',
        efeito: 'Inativacao',
        conduta: 'Nao misturar na mesma solucao',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Seguro em uso de emergencia' },
    monitorizacao: [
      'Gasometria arterial (pH, HCO3, pCO2)',
      'Eletrolitos (K+, Na+, Ca++)',
      'ECG',
    ],
    consideracoesEspeciais: {
      pediatrico: '1mEq/kg por dose; diluir antes de administrar',
    },
    doencasRelacionadas: ['acidose-metabolica', 'hipercalemia', 'intoxicacao-triciclicos'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['bicarbonato', 'acidose', 'hipercalemia', 'triciclicos', 'alcalinizacao'],
  },

  {
    id: 'manitol-emergencia',
    nomeGenerico: 'Manitol',
    nomesComerciais: ['Manitol 20%', 'Osmitrol'],
    atcCode: 'B05BC01',
    rxNormCui: '6693',
    drugBankId: 'DB00742',
    snomedCT: '387168006',
    casNumber: '69-65-8',
    classeTerapeutica: 'diuretico',
    subclasse: 'osmotico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '20% (200mg/mL - 250mL)', disponivelSUS: true },
    ],
    indicacoes: [
      'Hipertensao intracraniana (HIC)',
      'Edema cerebral',
      'Glaucoma agudo de angulo fechado',
      'Protecao renal em cirurgias vasculares (controverso)',
      'Rabdomiolise (controverso)',
    ],
    mecanismoAcao: 'Diuretico osmotico que cria gradiente osmotico atraves da barreira hematoencefalica, promovendo movimento de agua do parenquima cerebral para o intravascular. Aumenta osmolaridade plasmatica. Tambem aumenta fluxo sanguineo cerebral e pode melhorar reologia sanguinea.',
    posologias: [
      {
        indicacao: 'Hipertensao intracraniana',
        adultos: {
          dose: '0,5-1g/kg IV em bolus',
          frequencia: 'A cada 4-6 horas conforme PIC',
          doseMaxima: '2g/kg/dia',
          observacoes: 'Administrar em 15-30 minutos. Manter osmolaridade <320 mOsm/L. Gap osmolar <20.',
        },
        pediatrico: {
          dose: '0,25-1g/kg IV',
          frequencia: 'A cada 4-6 horas',
        },
      },
      {
        indicacao: 'Glaucoma agudo',
        adultos: {
          dose: '1-2g/kg IV em 30-60 minutos',
          frequencia: 'Dose unica',
        },
      },
    ],
    contraindicacoes: [
      'Anuria estabelecida',
      'Insuficiencia cardiaca grave',
      'Edema pulmonar',
      'Desidratacao grave',
      'Hemorragia intracraniana ativa (relativa)',
    ],
    precaucoes: [
      'Monitorar osmolaridade serica (evitar >320)',
      'Monitorar gap osmolar',
      'Pode causar rebote de HIC se suspenso abruptamente',
      'Cristaliza em baixas temperaturas - aquecer antes de usar',
      'Risco de IRA se usado em excesso',
    ],
    efeitosAdversos: {
      comuns: ['Poliuria', 'Desequilibrio hidroeletrolitico', 'Sede', 'Cefaleia'],
      graves: ['Insuficiencia renal aguda', 'Edema pulmonar', 'Hipernatremia grave', 'Acidose metabolica', 'Rebote de HIC'],
    },
    interacoes: [
      {
        medicamento: 'Diureticos de alca',
        gravidade: 'moderada',
        efeito: 'Efeito aditivo na diurese e deplecao eletrolitica',
        conduta: 'Monitorar rigorosamente eletrolitos',
      },
      {
        medicamento: 'Litio',
        gravidade: 'moderada',
        efeito: 'Aumento da excrecao de litio',
        conduta: 'Monitorar niveis de litio',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Contraindicado se anuria; usar com extrema cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso de emergencia justificado' },
    monitorizacao: [
      'Osmolaridade serica (a cada 4-6h)',
      'Gap osmolar',
      'Eletrolitos (Na+, K+)',
      'Funcao renal',
      'Debito urinario',
      'PIC (se cateter instalado)',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de IRA e disturbios eletroliticos',
    },
    doencasRelacionadas: ['hipertensao-intracraniana', 'edema-cerebral', 'tce', 'glaucoma-agudo'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['manitol', 'diuretico-osmotico', 'HIC', 'edema-cerebral', 'neurointensivismo'],
  },

  {
    id: 'acido-tranexamico-emergencia',
    nomeGenerico: 'Acido Tranexamico',
    nomesComerciais: ['Transamin', 'Hemoblock', 'Lysteda'],
    atcCode: 'B02AA02',
    rxNormCui: '10568',
    drugBankId: 'DB00302',
    snomedCT: '386960009',
    casNumber: '1197-18-8',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'antifibrinolitico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '50mg/mL (5mL)', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
    ],
    indicacoes: [
      'Hemorragia traumatica (CRASH-2)',
      'Hemorragia pos-parto',
      'Hemorragia gastrointestinal (HALT-IT)',
      'Hemorragia em cirurgias de grande porte',
      'Menorragia',
      'Epistaxe refrataria',
    ],
    mecanismoAcao: 'Antifibrinolitico. Analogo de lisina que bloqueia competitivamente os sitios de ligacao da lisina no plasminogenio, impedindo sua conversao em plasmina. Estabiliza coagulos formados prevenindo fibrinolise.',
    posologias: [
      {
        indicacao: 'Trauma com sangramento significativo (CRASH-2)',
        adultos: {
          dose: '1g IV em 10 minutos (bolus), seguido de 1g IV em 8 horas',
          frequencia: 'Protocolo de 2 doses',
          observacoes: 'Administrar nas primeiras 3 horas do trauma. Apos 3h, pode aumentar mortalidade.',
        },
        pediatrico: {
          dose: '15mg/kg IV (max 1g), seguido de 2mg/kg/h por 8h',
          frequencia: 'Bolus + infusao',
        },
      },
      {
        indicacao: 'Hemorragia pos-parto (WOMAN trial)',
        adultos: {
          dose: '1g IV em 10 minutos; repetir 1g se sangramento persistir apos 30min',
          frequencia: 'Maximo 2 doses',
        },
      },
      {
        indicacao: 'Menorragia',
        adultos: {
          dose: '1g VO 8/8h',
          frequencia: 'Durante periodo menstrual (max 5 dias)',
        },
      },
    ],
    contraindicacoes: [
      'Doenca tromboembolica ativa',
      'Historia de convulsoes',
      'Coagulacao intravascular disseminada (CID) com fibrinolise predominante',
      'Hemorragia subaracnoidea (risco vasoespasmo)',
    ],
    precaucoes: [
      'Administrar nas primeiras 3h do trauma (CRASH-2)',
      'Risco de convulsoes em doses altas (especialmente em cirurgia cardiaca)',
      'Cautela em DRC (ajustar dose)',
      'Nao usar se sangramento intracraniano traumatico isolado',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Diarreia', 'Cefaleia'],
      graves: ['Trombose venosa/arterial', 'Convulsoes', 'Disturbios visuais'],
    },
    interacoes: [
      {
        medicamento: 'Contraceptivos hormonais',
        gravidade: 'moderada',
        efeito: 'Aumento do risco tromboembolico',
        conduta: 'Usar com cautela; avaliar risco-beneficio',
      },
      {
        medicamento: 'Complexo protrombinico ativado',
        gravidade: 'moderada',
        efeito: 'Risco tromboembolico aumentado',
        conduta: 'Monitorar',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '50-80', ajuste: '10mg/kg 12/12h' },
      { tfg: '10-50', ajuste: '10mg/kg 24/24h' },
      { tfg: '<10', ajuste: '5mg/kg 24/24h' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Pequena quantidade no leite; seguro' },
    monitorizacao: [
      'Sinais de sangramento',
      'Sinais de trombose',
      'Funcao renal',
    ],
    consideracoesEspeciais: {
      idosos: 'Ajustar dose conforme funcao renal',
    },
    doencasRelacionadas: ['hemorragia-traumatica', 'hemorragia-pos-parto', 'menorragia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['acido-tranexamico', 'antifibrinolitico', 'CRASH-2', 'WOMAN', 'hemorragia', 'trauma'],
  },

  // =============================================================================
  // ANTIDOTOS E REVERSORES
  // =============================================================================
  {
    id: 'flumazenil-emergencia',
    nomeGenerico: 'Flumazenil',
    nomesComerciais: ['Lanexat', 'Flumazenil'],
    atcCode: 'V03AB25',
    rxNormCui: '4168',
    drugBankId: 'DB01205',
    snomedCT: '387078003',
    casNumber: '78755-81-4',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '0,1mg/mL (5mL)', disponivelSUS: true },
    ],
    indicacoes: [
      'Reversao de sedacao por benzodiazepinicos',
      'Diagnostico de intoxicacao por benzodiazepinicos',
      'Reversao de anestesia com benzodiazepinicos',
    ],
    mecanismoAcao: 'Antagonista competitivo no receptor GABA-A benzodiazepinico. Desloca benzodiazepinicos do receptor, revertendo sedacao, amnesia e depressao respiratoria causadas por estes.',
    posologias: [
      {
        indicacao: 'Reversao de sedacao consciente',
        adultos: {
          dose: '0,2mg IV em 15 segundos; repetir 0,1mg a cada minuto',
          frequencia: 'Ate acordar ou maximo 1mg',
          observacoes: 'Se ressedacao, pode ser repetido a cada 20min. Maximo 3mg/hora.',
        },
      },
      {
        indicacao: 'Intoxicacao por BZD (diagnostico/tratamento)',
        adultos: {
          dose: '0,2mg IV, depois 0,3mg, depois 0,5mg a cada minuto',
          frequencia: 'Ate resposta ou maximo 3-5mg',
          observacoes: 'Nao usar rotineiramente em intoxicacoes mistas ou pacientes em uso cronico de BZD.',
        },
        pediatrico: {
          dose: '0,01mg/kg IV (max 0,2mg/dose)',
          frequencia: 'Repetir a cada minuto, max 1mg total',
        },
      },
    ],
    contraindicacoes: [
      'Uso cronico de benzodiazepinicos (precipita sindrome de abstinencia)',
      'Controle de convulsoes com benzodiazepinicos',
      'Intoxicacao mista com triciclicos ou drogas convulsivantes',
      'Pressao intracraniana elevada',
    ],
    precaucoes: [
      'Risco de convulsoes em usuarios cronicos de BZD',
      'Meia-vida curta - risco de ressedacao (BZD de longa duracao)',
      'Nao reverte depressao por outros sedativos (opioides, barbituricos)',
      'Pode desmascarar efeitos de co-ingestantes',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Vomito', 'Agitacao', 'Ansiedade'],
      graves: ['Convulsoes', 'Arritmias cardiacas', 'Sindrome de abstinencia aguda'],
    },
    interacoes: [
      {
        medicamento: 'Benzodiazepinicos',
        gravidade: 'moderada',
        efeito: 'Reverte efeitos',
        conduta: 'Uso terapeutico',
      },
      {
        medicamento: 'Zolpidem, zopiclona',
        gravidade: 'leve',
        efeito: 'Pode reverter parcialmente',
        conduta: 'Menor eficacia que para BZD',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso unico; meia-vida curta' },
    monitorizacao: [
      'Nivel de consciencia',
      'Frequencia respiratoria',
      'Sinais de convulsao',
      'Sinais de ressedacao',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de ressedacao por metabolismo mais lento',
      hepatopatas: 'Ajustar dose; clearance reduzido',
    },
    doencasRelacionadas: ['intoxicacao-benzodiazepinicos', 'sedacao-procedimentos'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['flumazenil', 'antidoto', 'benzodiazepinicos', 'reversao-sedacao'],
  },

  {
    id: 'naloxona-emergencia',
    nomeGenerico: 'Naloxona (Cloridrato)',
    nomesComerciais: ['Narcan', 'Naloxona'],
    atcCode: 'V03AB15',
    rxNormCui: '7242',
    drugBankId: 'DB01183',
    snomedCT: '372890007',
    casNumber: '465-65-6',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '0,4mg/mL (1mL)', disponivelSUS: true },
      { forma: 'spray_nasal', concentracao: '4mg/0,1mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Intoxicacao por opioides',
      'Reversao de depressao respiratoria por opioides',
      'Diagnostico de intoxicacao por opioides',
      'Coma de etiologia desconhecida (teste terapeutico)',
    ],
    mecanismoAcao: 'Antagonista competitivo puro dos receptores opioides (mu, kappa, delta). Desloca opioides dos receptores, revertendo depressao respiratoria, sedacao e miose. Nao possui atividade agonista intrinseca.',
    posologias: [
      {
        indicacao: 'Intoxicacao por opioide',
        adultos: {
          dose: '0,4-2mg IV/IM/SC/IN',
          frequencia: 'Repetir a cada 2-3 minutos ate resposta',
          doseMaxima: '10mg (se sem resposta, reconsiderar diagnostico)',
          observacoes: 'Titular para manter respiracao sem reverter completamente analgesia. Meia-vida curta (30-90min) - monitorar ressedacao.',
        },
        pediatrico: {
          dose: '0,1mg/kg IV/IM (max 2mg)',
          frequencia: 'Repetir a cada 2-3 minutos',
        },
      },
      {
        indicacao: 'Reversao pos-operatoria',
        adultos: {
          dose: '0,04-0,1mg IV',
          frequencia: 'Titular a cada 2-3 minutos',
          observacoes: 'Doses menores para manter analgesia e reverter apenas depressao respiratoria.',
        },
      },
      {
        indicacao: 'Intoxicacao por opioides de longa acao (metadona, fentanil deposito)',
        adultos: {
          dose: 'Apos bolus inicial, infusao 0,4-0,8mg/h',
          frequencia: 'Titular por 24-72h',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'Sem contraindicacoes absolutas em emergencia',
    ],
    precaucoes: [
      'Precipita sindrome de abstinencia aguda em dependentes',
      'Meia-vida curta - monitorar ressedacao (especialmente com opioides de longa acao)',
      'Pode causar edema pulmonar nao-cardiogenico',
      'Pode precipitar dor aguda e hipertensao',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Vomito', 'Diaforese', 'Taquicardia'],
      graves: ['Sindrome de abstinencia aguda', 'Edema pulmonar', 'Convulsoes', 'Arritmias ventriculares'],
    },
    interacoes: [
      {
        medicamento: 'Opioides',
        gravidade: 'moderada',
        efeito: 'Reverte efeitos',
        conduta: 'Uso terapeutico; monitorar abstinencia',
      },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Uso de emergencia; meia-vida curta' },
    monitorizacao: [
      'Frequencia respiratoria',
      'Nivel de consciencia',
      'Saturacao de O2',
      'Sinais de abstinencia',
      'Monitorar por 4-6h (risco ressedacao)',
    ],
    orientacoesPaciente: [
      'Naloxona intranasal disponivel para uso comunitario',
      'Familiares de usuarios de opioides devem ter acesso',
    ],
    consideracoesEspeciais: {
      pediatrico: 'Dose por peso; tecnica intranasal pode ser usada',
    },
    doencasRelacionadas: ['intoxicacao-opioides', 'overdose', 'depressao-respiratoria'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['naloxona', 'narcan', 'antidoto', 'opioide', 'reversao', 'overdose'],
  },

  {
    id: 'fisostigmina-emergencia',
    nomeGenerico: 'Fisostigmina (Salicilato)',
    nomesComerciais: ['Antilirium'],
    atcCode: 'N07AA01',
    rxNormCui: '4018',
    drugBankId: 'DB00981',
    snomedCT: '373344008',
    casNumber: '57-47-6',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '1mg/mL (2mL)', disponivelSUS: false },
    ],
    indicacoes: [
      'Sindrome anticolinergica central (delirium anticolinergico)',
      'Intoxicacao por anticolinergicos (anti-histaminicos, antidepressivos triciclicos - controverso)',
      'Reversao de sedacao por escopolamina',
    ],
    mecanismoAcao: 'Inibidor reversivel da acetilcolinesterase. Atravessa a barreira hematoencefalica (diferente de neostigmina). Aumenta niveis de acetilcolina no SNC e SNP, revertendo efeitos anticolinergicos centrais e perifericos.',
    posologias: [
      {
        indicacao: 'Sindrome anticolinergica central',
        adultos: {
          dose: '0,5-2mg IV lento (max 1mg/min)',
          frequencia: 'Repetir a cada 20-30 minutos se necessario',
          doseMaxima: '4mg em 30 minutos',
          observacoes: 'Administrar lentamente. Ter atropina disponivel. Resposta esperada em 5-10min.',
        },
        pediatrico: {
          dose: '0,02mg/kg IV lento',
          frequencia: 'Repetir a cada 5-10 minutos',
          doseMaxima: '0,5mg/dose; 2mg total',
        },
      },
    ],
    contraindicacoes: [
      'Intoxicacao por triciclicos com disturbio de conducao (QRS >100ms)',
      'Asma grave',
      'Bradicardia',
      'Bloqueio AV',
      'Obstrucao intestinal/urinaria mecanica',
      'Gangrena',
    ],
    precaucoes: [
      'NUNCA usar se intoxicacao por triciclico com ECG anormal',
      'Pode causar convulsoes, bradicardia, broncoespasmo',
      'Meia-vida curta - pode necessitar doses repetidas',
      'Ter atropina disponivel como antidoto',
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Vomito', 'Bradicardia leve', 'Salivacao'],
      graves: ['Convulsoes', 'Bradicardia grave', 'Assistolia', 'Broncoespasmo grave', 'Colapso cardiovascular'],
    },
    interacoes: [
      {
        medicamento: 'Succinilcolina',
        gravidade: 'moderada',
        efeito: 'Prolonga bloqueio neuromuscular',
        conduta: 'Evitar uso proximo',
      },
      {
        medicamento: 'Beta-bloqueadores',
        gravidade: 'moderada',
        efeito: 'Bradicardia excessiva',
        conduta: 'Monitorar FC',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'ECG continuo',
      'Frequencia cardiaca',
      'Nivel de consciencia',
      'Sinais de toxicidade colinergica (SLUDGE)',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de bradicardia; usar com cautela',
    },
    doencasRelacionadas: ['sindrome-anticolinergica', 'delirium-anticolinergico', 'intoxicacao-anti-histamico'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['fisostigmina', 'antidoto', 'anticolinergico', 'delirium', 'sindrome-anticolinergica'],
  },

  {
    id: 'dantrolene-emergencia',
    nomeGenerico: 'Dantrolene Sodico',
    nomesComerciais: ['Dantrium', 'Revonto', 'Ryanodex'],
    atcCode: 'M03CA01',
    rxNormCui: '3105',
    drugBankId: 'DB01219',
    snomedCT: '372819003',
    casNumber: '7261-97-4',
    classeTerapeutica: 'relaxante_muscular',
    subclasse: 'antidoto',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '20mg (frasco)', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '250mg (frasco - Ryanodex)', disponivelSUS: false },
    ],
    indicacoes: [
      'Hipertermia maligna (HM)',
      'Sindrome neuroleptica maligna (SNM)',
      'Sindrome serotoninergica grave (off-label)',
      'Hipertermia por ecstasy/anfetaminas',
    ],
    mecanismoAcao: 'Relaxante muscular de acao direta. Bloqueia a liberacao de calcio do reticulo sarcoplasmatico pelo receptor de rianodina. Interrompe a contracao muscular sustentada e a producao de calor na HM.',
    posologias: [
      {
        indicacao: 'Hipertermia maligna',
        adultos: {
          dose: '2,5mg/kg IV bolus',
          frequencia: 'Repetir a cada 5-10min ate controle (total 10mg/kg ou mais se necessario)',
          observacoes: 'Continuar ate queda de temperatura, rigidez e normalizacao de CO2. Apos crise: 1mg/kg IV 6/6h por 24-48h.',
        },
        pediatrico: {
          dose: '2,5mg/kg IV bolus',
          frequencia: 'Mesma que adultos',
        },
      },
      {
        indicacao: 'Sindrome neuroleptica maligna',
        adultos: {
          dose: '1-2,5mg/kg IV',
          frequencia: 'Repetir ate 10mg/kg/dia',
          observacoes: 'Menos eficaz que na HM. Associar resfriamento ativo e suspensao do agente.',
        },
      },
    ],
    contraindicacoes: [
      'Uso VO para profilaxia esta obsoleto',
      'Doenca hepatica ativa (para uso cronico)',
    ],
    precaucoes: [
      'Reconstituicao trabalhosa (varios frascos necessarios para dose)',
      'Ryanodex permite reconstituicao mais rapida',
      'Hepatotoxicidade com uso prolongado',
      'Solucao alcalina - irritante vascular',
      'Pode causar fraqueza muscular grave',
    ],
    efeitosAdversos: {
      comuns: ['Fraqueza muscular', 'Nausea', 'Tontura', 'Sonolencia'],
      graves: ['Hepatotoxicidade', 'Insuficiencia respiratoria (fraqueza diafragma)', 'Flebite'],
    },
    interacoes: [
      {
        medicamento: 'Bloqueadores de canal de calcio',
        gravidade: 'grave',
        efeito: 'Colapso cardiovascular',
        conduta: 'Evitar verapamil e diltiazem',
      },
      {
        medicamento: 'Vecuronio',
        gravidade: 'moderada',
        efeito: 'Fraqueza muscular prolongada',
        conduta: 'Monitorar forca muscular',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; evitar' },
    monitorizacao: [
      'Temperatura corporal',
      'EtCO2',
      'Gasometria',
      'CPK',
      'Mioglobinuria',
      'Funcao hepatica (uso prolongado)',
      'Potassio',
    ],
    orientacoesPaciente: [
      'Pacientes com historia de HM devem portar identificacao medica',
      'Familiares devem ser investigados (doenca genetica)',
    ],
    consideracoesEspeciais: {
      pediatrico: 'Mesmas doses por kg que adultos',
    },
    doencasRelacionadas: ['hipertermia-maligna', 'sindrome-neuroleptica-maligna'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['dantrolene', 'hipertermia-maligna', 'SNM', 'antidoto', 'rianodina'],
  },
];
