/**
 * ARRITMIAS VENTRICULARES - PADROES ECG
 * =====================================
 * Darwin-MFC - Academic Q1 Standard Data
 *
 * Padroes eletrocardiograficos de arritmias ventriculares
 * com dados clinicos completos para uso em APS e emergencia.
 *
 * Referencias:
 * - AHA/ACC/HRS 2017 Guidelines for Ventricular Arrhythmias
 * - ESC 2022 Guidelines for Ventricular Arrhythmias
 * - ACLS 2020 Guidelines
 * - Sociedade Brasileira de Cardiologia
 */

import { Citation } from '../../../types/references';

export type NivelUrgencia = 1 | 2 | 3 | 4; // 1=emergencia, 2=urgente, 3=alerta, 4=rotina

export interface CaracteristicasECGVentricular {
  frequencia: string;
  ritmo: string;
  ondaP: string;
  complexoQRS: string;
  morfologiaQRS: string;
  eixoQRS?: string;
  outrasCaracteristicas?: string[];
}

export interface PadraoArritmiaVentricular {
  id: string;
  nome: string;
  nomeEN: string;
  categoria: 'arritmia_ventricular';
  descricao: string;
  criteriosECG: string[];
  caracteristicas: CaracteristicasECGVentricular;
  causas: string[];
  fatoresRisco: string[];
  significadoClinico: string;
  nivelUrgencia: NivelUrgencia;
  condutaGeral: string;
  tratamentoAgudo: string[];
  criteriosEncaminhamento: string[];
  redFlags: string[];
  dicasParaNaoEspecialista: string[];
  citations: Citation[];
}

export const arritmiasVentriculares: PadraoArritmiaVentricular[] = [
  // ============================================================================
  // 1. EXTRASSISTOLE VENTRICULAR (EV/PVC)
  // ============================================================================
  {
    id: 'ev-pvc',
    nome: 'Extrassistole Ventricular',
    nomeEN: 'Premature Ventricular Contraction (PVC)',
    categoria: 'arritmia_ventricular',
    descricao: 'Batimento ventricular prematuro originado de foco ectopico ventricular abaixo do feixe de His. Extremamente comum na populacao geral, presente em ate 75% dos adultos saudaveis em Holter de 24 horas. A maioria e benigna, mas carga elevada (>10-15% dos batimentos) pode causar taquicardiomiopatia. Em pacientes com cardiopatia estrutural, EVs podem ter implicacoes prognosticas.',
    criteriosECG: [
      'Complexo QRS prematuro (ocorre antes do esperado)',
      'QRS largo (>120 ms, tipicamente >140 ms)',
      'Morfologia do QRS diferente do ritmo de base',
      'Ausencia de onda P precedendo a EV (ou P dissociada)',
      'Onda T com polaridade oposta ao QRS (discordancia normal)',
      'Pausa compensatoria geralmente completa (soma do intervalo pre e pos-EV = 2x RR basal)',
      'Morfologia BRDE (QRS positivo em V1): origem no VE',
      'Morfologia BRDE (QRS negativo em V1): origem no VD',
      'EV interpolada: sem pausa (encaixa entre dois batimentos sinusais)'
    ],
    caracteristicas: {
      frequencia: 'Variavel - isoladas ou frequentes; carga significativa se >10% em 24h',
      ritmo: 'Ritmo de base interrompido por batimentos prematuros largos',
      ondaP: 'Ausente antes da EV ou dissociada (P sinusal pode estar oculta no QRS ou T)',
      complexoQRS: 'Largo (>120 ms, geralmente 140-200 ms), bizarro',
      morfologiaQRS: 'Depende da origem: padrão BRE se origem VD, padrão BRD se origem VE; transicao precoce (V2-V3) sugere VSVD',
      eixoQRS: 'Desviado da normalidade; inferior se origem VSVD, superior se origem VE inferior',
      outrasCaracteristicas: [
        'Bigeminismo: alternancia sinusal-EV',
        'Trigeminismo: 2 sinusais + 1 EV',
        'Pareada/Copla: 2 EVs consecutivas',
        'Salva: 3 ou mais EVs consecutivas (=TVNS)',
        'EV R em T (fenomeno R-on-T): EV no periodo vulneravel - risco de TV/FV',
        'EV monomorficas: mesma morfologia (foco unico)',
        'EV polimorficas: morfologias diferentes (multiplos focos ou instabilidade)'
      ]
    },
    causas: [
      'Variante normal (achado incidental em pessoa saudavel)',
      'Estimulantes: cafeina, alcool, tabaco, drogas ilicitas (cocaina, anfetaminas)',
      'Estresse e ansiedade',
      'Disturbios eletroliticos (hipocalemia, hipomagnesemia, hipercalcemia)',
      'Hipoxemia',
      'Cardiopatia isquemica (IAM, isquemia cronica)',
      'Insuficiencia cardiaca',
      'Cardiomiopatias (dilatada, hipertrofica, arritmogenica do VD)',
      'Miocardite',
      'Prolapso de valva mitral',
      'Hipertireoidismo',
      'Intoxicacao digitalica',
      'Medicamentos (antiarritmicos, simpaticomiméticos, anestesicos)',
      'Pos-exercicio (EVs de VSVD benignas)',
      'Displasia arritmogenica do ventriculo direito (DAVD)'
    ],
    fatoresRisco: [
      'Cardiopatia estrutural previa',
      'FEVE reduzida (<40%)',
      'Historia de IAM',
      'Historia familiar de morte subita',
      'QTc prolongado',
      'Sindrome de Brugada',
      'Carga de EVs >10-15% em Holter 24h',
      'EVs polimorficas',
      'Fenomeno R-on-T',
      'EVs induzidas por exercicio em paciente com cardiopatia',
      'Sincope associada'
    ],
    significadoClinico: 'EVs isoladas em coracao estruturalmente normal sao benignas. Carga elevada (>10-15%/24h ou >20.000 EVs) pode causar taquicardiomiopatia reversivel. Em pacientes pos-IAM ou com IC, EVs frequentes indicam pior prognostico. Morfologia de BRE com eixo inferior (origem VSVD) geralmente benigna. EVs polimorficas ou R-on-T sao mais preocupantes.',
    nivelUrgencia: 4,
    condutaGeral: 'EVs assintomaticas em coracao normal: tranquilizacao e modificacao de estilo de vida. EVs sintomaticas: betabloqueadores. Carga elevada: investigar cardiomiopatia e considerar ablacao. EVs em cardiopatia: otimizar tratamento de base e considerar CDI se criterios.',
    tratamentoAgudo: [
      '1. EVs isoladas assintomaticas: nenhum tratamento necessario',
      '2. Tranquilizar o paciente sobre benignidade na maioria dos casos',
      '3. Orientar modificacao de estilo de vida:',
      '   - Reduzir/eliminar cafeina',
      '   - Moderar consumo de alcool',
      '   - Cessar tabagismo',
      '   - Controle do estresse',
      '4. Corrigir disturbios eletroliticos (K+ >4,0 mEq/L, Mg2+ >2,0 mg/dL)',
      '5. Se sintomaticas: Betabloqueador (Metoprolol 25-50mg 2x/dia, Propranolol 10-40mg 3x/dia)',
      '6. Se refratarias a betabloqueador: Bloqueador de canal de calcio (Diltiazem, Verapamil)',
      '7. Antiarritmicos classe IC (Propafenona, Flecainida) APENAS se coracao estruturalmente normal',
      '8. Amiodarona: reservar para cardiopatia estrutural com EVs ameacadoras',
      '9. Carga >15% ou taquicardiomiopatia: considerar ablacao por cateter',
      '10. Se cardiopatia + criterios: avaliar CDI (prevenção primaria de morte subita)'
    ],
    criteriosEncaminhamento: [
      'Carga de EVs >10% em Holter 24h',
      'EVs sintomaticas refratarias a betabloqueadores',
      'Suspeita de taquicardiomiopatia (FEVE reduzida)',
      'EVs em paciente com cardiopatia estrutural conhecida',
      'Historia de sincope ou pre-sincope',
      'Historia familiar de morte subita ou cardiomiopatia',
      'EVs polimorficas ou em salvas frequentes',
      'Fenomeno R-on-T documentado',
      'EVs induzidas por exercicio em contexto de cardiopatia',
      'Considerar ablacao se: origem mapeavel (VSVD), carga >15%, taquicardiomiopatia, sintomas refratarios'
    ],
    redFlags: [
      'EVs em salvas frequentes ou TVNS associada',
      'EVs polimorficas - sugere instabilidade eletrica ou cardiopatia',
      'Fenomeno R-on-T - risco de TV/FV polimorficas',
      'Sincope ou pre-sincope associada',
      'FEVE <35% com carga elevada de EVs',
      'EVs pos-IAM recente - indicam risco aumentado',
      'Aumento progressivo da carga de EVs',
      'EVs em paciente com Brugada, QT longo ou outras canalopatias',
      'Historia familiar de morte subita em <40 anos'
    ],
    dicasParaNaoEspecialista: [
      'EV = QRS largo, prematuro, sem onda P antes, pausa compensatoria',
      'A maioria das EVs isoladas em coracao normal e benigna - tranquilize o paciente',
      'Betabloqueadores sao o tratamento de primeira linha quando necessario',
      'Padrão de BRE + eixo inferior (QRS positivo em DII) = origem VSVD, geralmente benigno',
      'Se EV iguais (monomorficas) = foco unico = mais benigno que polimorficas',
      'Carga >10-15% merece avaliacao com ecocardiograma (descartar cardiomiopatia)',
      'NUNCA use antiarritmico classe IC (propafenona, flecainida) se cardiopatia estrutural',
      'Se paciente pos-IAM com EVs frequentes, o cardiologista deve avaliar CDI',
      'Cafeina e o desencadeante mais comum - sempre pergunte!'
    ],
    citations: [
      {
        refId: 'al-khatib-va-2018',
        authors: ['Al-Khatib SM', 'Stevenson WG', 'Ackerman MJ', 'et al.'],
        title: '2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias and the Prevention of Sudden Cardiac Death',
        journal: 'Circulation',
        year: 2018,
        volume: '138',
        pages: 'e272-e391',
        doi: '10.1161/CIR.0000000000000549',
        pmid: '29084731'
      },
      {
        refId: 'latchamsetty-pvc-2019',
        authors: ['Latchamsetty R', 'Bogun F'],
        title: 'Premature Ventricular Complexes and Premature Ventricular Complex Induced Cardiomyopathy',
        journal: 'Current Problems in Cardiology',
        year: 2019,
        volume: '44',
        pages: '100389',
        doi: '10.1016/j.cpcardiol.2018.07.005',
        pmid: '30545485'
      },
      {
        refId: 'baman-pvc-2010',
        authors: ['Baman TS', 'Lange DC', 'Ilg KJ', 'et al.'],
        title: 'Relationship between burden of premature ventricular complexes and left ventricular function',
        journal: 'Heart Rhythm',
        year: 2010,
        volume: '7',
        pages: '865-869',
        doi: '10.1016/j.hrthm.2010.03.036',
        pmid: '20348027'
      }
    ]
  },

  // ============================================================================
  // 2. TAQUICARDIA VENTRICULAR MONOMORFICA SUSTENTADA
  // ============================================================================
  {
    id: 'tv-monomorfica-sustentada',
    nome: 'Taquicardia Ventricular Monomorfica Sustentada',
    nomeEN: 'Sustained Monomorphic Ventricular Tachycardia (SMVT)',
    categoria: 'arritmia_ventricular',
    descricao: 'Taquicardia de complexo largo (>120 ms) com origem ventricular, frequencia >=100 bpm, morfologia constante do QRS e duracao >=30 segundos ou que requer intervencao por instabilidade hemodinamica. Mecanismo mais comum e reentrada em torno de cicatriz de IAM previo. Emergencia cardiovascular que pode deteriorar para FV.',
    criteriosECG: [
      'QRS largo (>120 ms, geralmente >140 ms)',
      'Frequencia >=100 bpm (tipicamente 150-200 bpm)',
      'Morfologia do QRS uniforme (monomorfica)',
      'Duracao >=30 segundos ou instabilidade hemodinamica',
      'Dissociacao AV (ondas P independentes dos QRS) - altamente especifica',
      'Batimentos de captura: QRS estreito isolado em meio a TV (conduzido do sinusal)',
      'Batimentos de fusao: QRS intermediario (parcialmente sinusal + ventricular)',
      'Concordancia de QRS nas precordiais: todos positivos ou todos negativos = TV',
      'Eixo extremo ("no mans land": -90 a -180 graus)',
      'Criterios de Brugada para diferenciar TV de TSV com aberrancia'
    ],
    caracteristicas: {
      frequencia: '100-250 bpm (mais comumente 150-200 bpm)',
      ritmo: 'Regular (pode haver leve variabilidade)',
      ondaP: 'Dissociadas (frequencia menor que QRS) ou nao visiveis; capturas e fusoes sao diagnosticas',
      complexoQRS: '>120 ms (geralmente 140-200 ms); morfologia constante',
      morfologiaQRS: 'Padrao BRD ou BRE atipicos; morfologia depende do sitio de origem',
      eixoQRS: 'Frequentemente anormal; desvio extremo para esquerda ou direita; eixo "no mans land" e altamente sugestivo',
      outrasCaracteristicas: [
        'RS >100 ms em qualquer derivacao precordial (criterio de Brugada)',
        'Tempo ao nadir da onda S >70 ms em V1-V2 (se padrao BRD)',
        'Indentacao na onda S descendente em V1-V2 (sinal de Josephson)',
        'qR em V6 (em vez de RS ou qRs normal)',
        'Relacao R/S <1 em V6',
        'Entalhe no ramo descendente do QRS'
      ]
    },
    causas: [
      'Cardiopatia isquemica com cicatriz de IAM previo (causa mais comum, ~80%)',
      'Cardiomiopatia dilatada nao isquemica',
      'Cardiomiopatia hipertrofica',
      'Displasia arritmogenica do VD (DAVD/CAVD)',
      'Cardiomiopatia chagasica',
      'Miocardite aguda ou cronica',
      'Sarcoidose cardiaca',
      'Cardiopatias congenitas corrigidas',
      'Valvopatias avancadas',
      'Canalopatias com TV monomorfica (raro): TV catecolaminergica polimórfica em sua forma atipica',
      'TV fascicular (Belhassen) - em coracao estruturalmente normal',
      'TV de via de saida (VSVD/VSVE) - geralmente benigna'
    ],
    fatoresRisco: [
      'IAM previo (especialmente extenso, anterior)',
      'FEVE reduzida (<35%)',
      'Insuficiencia cardiaca NYHA II-IV',
      'Historia previa de TV ou FV',
      'Inducao de TV em estudo eletrofisiologico',
      'Presenca de potenciais tardios no ECG de alta resolucao',
      'QRS >120 ms no ECG de base',
      'Cardiomiopatia conhecida',
      'Historia familiar de morte subita'
    ],
    significadoClinico: 'Emergencia cardiovascular. Alto risco de deterioracao para FV e morte subita. Mortalidade sem tratamento e elevada. Indica necessidade de CDI para prevencao secundaria na maioria dos casos. A presenca de TV sustentada pos-IAM indica prognostico reservado.',
    nivelUrgencia: 1,
    condutaGeral: 'Se instavel: cardioversao eletrica imediata. Se estavel: pode tentar farmacoterapia (amiodarona, procainamida). Apos reversao: otimizar tratamento da cardiopatia de base, implantar CDI, considerar ablacao por cateter. Identificar e tratar causas reversiveis.',
    tratamentoAgudo: [
      '1. AVALIAR ESTABILIDADE HEMODINAMICA - DECISAO CRITICA',
      '',
      '** TV INSTAVEL (hipotensao, dor toracica, dispneia grave, confusao, sinais de choque): **',
      '   - Cardioversao eletrica sincronizada IMEDIATA: 100-200J bifasico',
      '   - Se sem pulso: desfibrilacao 200J bifasico (protocolo de PCR)',
      '   - Acesso venoso e amiodarona 300mg IV apos o choque se necessario',
      '',
      '** TV ESTAVEL (PA normal, consciente, sem sinais de ma perfusao): **',
      '   - Amiodarona 150mg IV em 10 minutos (primeira escolha)',
      '   - Se falhar: Amiodarona adicional 150mg ou procainamida 20-50mg/min ate 17mg/kg',
      '   - Lidocaina 1-1,5mg/kg IV (alternativa, especialmente se isquemia aguda)',
      '   - Se refrataria: cardioversao eletrica sincronizada 100-200J',
      '',
      '** POS-REVERSAO: **',
      '   - Manter amiodarona em infusao continua: 1mg/min por 6h, depois 0,5mg/min por 18h',
      '   - Correacao de eletrólitos: K+ >4,0 mEq/L, Mg2+ >2,0 mg/dL',
      '   - Investigar isquemia: ECG seriados, troponina, ecocardiograma',
      '   - Se causa isquemica aguda: cateterismo de urgencia',
      '   - Avaliar indicacao de CDI (prevencao secundaria)'
    ],
    criteriosEncaminhamento: [
      'TODOS os pacientes com TV sustentada devem ser avaliados por cardiologista/eletrofisiologista',
      'Indicacoes de CDI (prevencao secundaria):',
      '   - TV sustentada com instabilidade hemodinamica',
      '   - TV sustentada em paciente com cardiopatia estrutural',
      '   - FV ou TV degenerada para FV',
      'Ablacao por cateter indicada se:',
      '   - TV recorrente apesar de CDI (tempestade eletrica)',
      '   - TV incessante',
      '   - TV refrataria a antiarritmicos',
      '   - TV de via de saída ou fascicular (pode ser curativa)',
      'Investigacao complementar: ressonancia cardiaca (fibrose/cicatriz), coronariografia'
    ],
    redFlags: [
      'Instabilidade hemodinamica (hipotensao, choque)',
      'Dor toracica sugestiva de IAM concomitante',
      'TV muito rapida (>200 bpm) - alto risco de degeneracao para FV',
      'TV com QRS muito largo (>200 ms) - pior prognostico',
      'TV recorrente ou incessante',
      'Tempestade eletrica: >=3 episodios de TV/FV em 24h',
      'Sincope durante episodio',
      'TV em paciente com FEVE <30%',
      'TV apos IAM recente (<48h)',
      'Falha de cardioversao'
    ],
    dicasParaNaoEspecialista: [
      'Taquicardia de QRS largo e REGULAR = TV ate prova em contrario',
      'Se em duvida entre TV e TSV com aberrancia, TRATE COMO TV - e mais seguro',
      'Instabilidade = cardioversao imediata, nao perca tempo com medicamentos',
      'NUNCA use verapamil ou adenosina em taquicardia de QRS largo - podem causar colapso',
      'Dissociacao AV (P e QRS independentes) e patognomonica de TV',
      'Batimento de captura ou fusao fecha o diagnostico de TV',
      'Concordancia de QRS positivos ou negativos em precordiais = TV',
      'Amiodarona e a droga mais segura se ha duvida sobre funcao VE',
      'Paciente pos-IAM com TV sustentada = CDI indicado na maioria dos casos'
    ],
    citations: [
      {
        refId: 'al-khatib-va-2018-2',
        authors: ['Al-Khatib SM', 'Stevenson WG', 'Ackerman MJ', 'et al.'],
        title: '2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias and the Prevention of Sudden Cardiac Death',
        journal: 'Circulation',
        year: 2018,
        volume: '138',
        pages: 'e272-e391',
        doi: '10.1161/CIR.0000000000000549',
        pmid: '29084731'
      },
      {
        refId: 'brugada-criteria-1991',
        authors: ['Brugada P', 'Brugada J', 'Mont L', 'et al.'],
        title: 'A new approach to the differential diagnosis of a regular tachycardia with a wide QRS complex',
        journal: 'Circulation',
        year: 1991,
        volume: '83',
        pages: '1649-1659',
        doi: '10.1161/01.CIR.83.5.1649',
        pmid: '2022022'
      },
      {
        refId: 'esc-va-2022',
        authors: ['Zeppenfeld K', 'Tfelt-Hansen J', 'de Riva M', 'et al.'],
        title: '2022 ESC Guidelines for the management of patients with ventricular arrhythmias and the prevention of sudden cardiac death',
        journal: 'European Heart Journal',
        year: 2022,
        volume: '43',
        pages: '3997-4126',
        doi: '10.1093/eurheartj/ehac262',
        pmid: '36017572'
      }
    ]
  },

  // ============================================================================
  // 3. TAQUICARDIA VENTRICULAR MONOMORFICA NAO-SUSTENTADA (TVNS)
  // ============================================================================
  {
    id: 'tvns',
    nome: 'Taquicardia Ventricular Monomorfica Nao-Sustentada',
    nomeEN: 'Non-Sustained Ventricular Tachycardia (NSVT)',
    categoria: 'arritmia_ventricular',
    descricao: 'Sequencia de 3 ou mais batimentos ventriculares consecutivos com frequencia >=100 bpm e duracao <30 segundos, com terminacao espontanea. Comum em Holters (ate 3% em individuos normais, ate 80% em pacientes com IC). O significado clinico depende do contexto: benigna em coracoes normais, marcador de risco em cardiopatias estruturais.',
    criteriosECG: [
      '>=3 batimentos ventriculares consecutivos (QRS largo >120 ms)',
      'Frequencia >=100 bpm (geralmente 120-200 bpm)',
      'Duracao <30 segundos',
      'Termina espontaneamente (nao requer intervencao)',
      'Morfologia constante do QRS durante a salva (monomorfica)',
      'Dissociacao AV durante os batimentos (se identificavel)',
      'Retorno ao ritmo de base (geralmente sinusal) apos termino'
    ],
    caracteristicas: {
      frequencia: '100-200 bpm durante os episodios',
      ritmo: 'Regular durante a salva; ritmo de base usualmente sinusal',
      ondaP: 'Dissociadas durante TVNS ou nao visiveis; P sinusal retorna apos episodio',
      complexoQRS: 'Largo (>120 ms) durante TVNS; morfologia constante (monomorfica)',
      morfologiaQRS: 'Depende da origem; VSVD (padrao BRE + eixo inferior) mais benigno; BRD sugere origem VE',
      outrasCaracteristicas: [
        'Salvas curtas (3-10 batimentos) vs longas (>10 batimentos)',
        'Podem ser isoladas ou repetitivas',
        'Podem ocorrer em repouso ou relacionadas ao exercicio',
        'Tolerancia hemodinamica geralmente preservada (duracao curta)',
        'Sintomas: palpitacoes breves, "batedeira", mais comumente assintomatica'
      ]
    },
    causas: [
      'Variante normal (ate 3% dos individuos em Holter 24h)',
      'Cardiopatia isquemica (pos-IAM, isquemia cronica)',
      'Insuficiencia cardiaca/cardiomiopatia dilatada',
      'Cardiomiopatia hipertrofica',
      'Displasia arritmogenica do VD',
      'Miocardite',
      'Prolapso de valva mitral',
      'Valvopatias',
      'Hipertrofia ventricular esquerda (HAS)',
      'Disturbios eletroliticos',
      'Hipertireoidismo',
      'Estimulantes (cafeina, drogas)',
      'TV fascicular (origem no sistema de conducao)',
      'TV de via de saida (geralmente benigna em coracao normal)'
    ],
    fatoresRisco: [
      'Cardiopatia estrutural de base',
      'FEVE reduzida (<35%)',
      'Historia de IAM (especialmente extenso)',
      'Episodios frequentes ou prolongados de TVNS',
      'TVNS induzida por exercicio em cardiopata',
      'TVNS com morfologia polimorfica',
      'TVNS sintomatica (sincope, pre-sincope)',
      'Historia familiar de morte subita',
      'Potenciais tardios no ECG de alta resolucao',
      'TVNS associada a isquemia documentada'
    ],
    significadoClinico: 'Varia enormemente com contexto clinico. Em coracoes normais: geralmente benigna. Pos-IAM ou IC com FEVE reduzida: marcador de risco de morte subita - pode indicar estudo eletrofisiologico para estratificacao. TVNS de VSVD em coracao normal: excelente prognostico. TVNS com sincope ou cardiopatia: exige investigacao completa.',
    nivelUrgencia: 3,
    condutaGeral: 'Depende do contexto clinico. Coracao normal + TVNS assintomatica: tranquilizacao. Cardiopatia estrutural: investigacao completa (ECO, RNM, Holter). FEVE <35% pos-IAM: considerar estudo eletrofisiologico. TVNS sintomatica: betabloqueador, ablacao se refrataria. CDI se alto risco.',
    tratamentoAgudo: [
      '1. TVNS geralmente termina espontaneamente - nao requer tratamento de emergencia',
      '',
      '2. Se sintomatica durante o episodio:',
      '   - Monitorizar e aguardar terminacao espontanea',
      '   - Se prolongada ou mal tolerada: tratar como TV sustentada',
      '',
      '3. Avaliacao pos-episodio:',
      '   - ECG de 12 derivacoes',
      '   - Ecocardiograma para avaliacao de funcao VE e cardiopatia estrutural',
      '   - Holter 24-48h para quantificar carga e caracterizar episodios',
      '   - Eletrolitos (K+, Mg2+)',
      '   - TSH',
      '',
      '4. Tratamento cronico se indicado:',
      '   - Betabloqueadores: primeira linha se sintomatica',
      '   - Antiarritmicos: reservar para casos selecionados',
      '   - Ablacao: se origem mapeavel (VSVD) e sintomatica refrataria',
      '',
      '5. Estratificacao de risco em cardiopatas:',
      '   - FEVE <35% pos-IAM: considerar EEF para inducao de TV',
      '   - Se TV sustentada induivel: CDI indicado',
      '   - Se nao induivel: otimizar terapia farmacologica'
    ],
    criteriosEncaminhamento: [
      'TVNS em paciente com cardiopatia estrutural conhecida',
      'TVNS sintomatica (sincope, pre-sincope)',
      'FEVE <35% com TVNS',
      'TVNS frequente (>10 episodios/24h ou >100 batimentos ventriculares totais)',
      'TVNS prolongada (>10 batimentos) ou rapida (>180 bpm)',
      'TVNS induzida por exercicio em paciente com fatores de risco',
      'Historia familiar de morte subita cardiaca',
      'Coracao aparentemente normal, mas TVNS polimorficas ou com sincope',
      'Necessidade de estudo eletrofisiologico (estratificacao pos-IAM)',
      'Considerar ablacao em TVNS de VSVD frequente e sintomatica'
    ],
    redFlags: [
      'TVNS com sincope ou pre-sincope - exige investigacao urgente',
      'TVNS em paciente com FEVE <35% - risco de morte subita',
      'TVNS muito frequente ou degenerando para TV sustentada',
      'TVNS polimorficas - instabilidade eletrica',
      'TVNS com fenomeno R-on-T',
      'TVNS induzida por exercicio com sintomas',
      'Historia familiar de morte subita em <40 anos',
      'TVNS em paciente com canalopatia conhecida (QT longo, Brugada)',
      'TVNS em cardiomiopatia hipertrofica - alto risco'
    ],
    dicasParaNaoEspecialista: [
      'TVNS = 3 ou mais batimentos ventriculares rapidos que terminam sozinhos em <30s',
      'Em coracao normal, TVNS assintomatica geralmente e benigna - tranquilize',
      'Sempre solicite ecocardiograma para avaliar funcao VE e excluir cardiopatia',
      'TVNS pos-IAM com FEVE <35% = alto risco - encaminhe ao eletrofisiologista',
      'Betabloqueadores sao a primeira linha se sintomatico',
      'TVNS com padrao de VSVD (BRE + eixo inferior) e geralmente benigna em coracao normal',
      'TVNS com sincope = bandeira vermelha - nao e benigna',
      'Holter 24h e essencial para quantificar a carga e caracterizar os episodios',
      'Se duvida sobre risco, encaminhe - morte subita e prevenivel com CDI'
    ],
    citations: [
      {
        refId: 'esc-va-2022-2',
        authors: ['Zeppenfeld K', 'Tfelt-Hansen J', 'de Riva M', 'et al.'],
        title: '2022 ESC Guidelines for the management of patients with ventricular arrhythmias and the prevention of sudden cardiac death',
        journal: 'European Heart Journal',
        year: 2022,
        volume: '43',
        pages: '3997-4126',
        doi: '10.1093/eurheartj/ehac262',
        pmid: '36017572'
      },
      {
        refId: 'buxton-nsvt-1999',
        authors: ['Buxton AE', 'Lee KL', 'DiCarlo L', 'et al.'],
        title: 'Electrophysiologic testing to identify patients with coronary artery disease who are at risk for sudden death',
        journal: 'New England Journal of Medicine',
        year: 1999,
        volume: '342',
        pages: '1937-1945',
        doi: '10.1056/NEJM200006293422602',
        pmid: '10874061'
      },
      {
        refId: 'sbc-arritmias-2016',
        authors: ['Sociedade Brasileira de Cardiologia'],
        title: 'Diretriz de Arritmias Cardiacas em Criancas e Cardiopatias Congenitas SOBRAC e DCC - CP',
        journal: 'Arquivos Brasileiros de Cardiologia',
        year: 2016,
        volume: '107',
        pages: '1-58',
        doi: '10.5935/abc.20160081'
      }
    ]
  },

  // ============================================================================
  // 4. TAQUICARDIA VENTRICULAR POLIMORFICA
  // ============================================================================
  {
    id: 'tv-polimorfica',
    nome: 'Taquicardia Ventricular Polimorfica',
    nomeEN: 'Polymorphic Ventricular Tachycardia',
    categoria: 'arritmia_ventricular',
    descricao: 'Taquicardia ventricular com morfologia variavel do QRS, batimento a batimento, indicando multiplos focos de ativacao ou circuito instavel. Duas formas principais: (1) sem QT prolongado de base (geralmente isquemica) e (2) com QT prolongado (Torsades de Pointes). Emergencia cardiovascular com alto risco de degeneracao para FV.',
    criteriosECG: [
      'Taquicardia de QRS largo (>120 ms)',
      'Morfologia continuamente variavel do QRS (polimorfica)',
      'Frequencia geralmente 150-300 bpm',
      'Amplitude do QRS variavel',
      'Eixo eletrico instavel (muda de batimento a batimento)',
      'Pode ter padrao de rotacao ao redor da linha de base (se TdP)',
      'Intervalo QT de BASE normal (TV polimorfica nao-TdP) vs prolongado (TdP)',
      'Dissociacao AV geralmente presente mas dificil de identificar'
    ],
    caracteristicas: {
      frequencia: '150-300 bpm (tipicamente 200-250 bpm)',
      ritmo: 'Irregularmente irregular (morfologia e ciclo variaveis)',
      ondaP: 'Geralmente nao identificavel pela frequencia elevada e variabilidade do QRS',
      complexoQRS: 'Largo e de morfologia variavel batimento a batimento',
      morfologiaQRS: 'Polimorfica: muda continuamente; nao existe padrao fixo de BRD ou BRE',
      eixoQRS: 'Instavel, variando continuamente',
      outrasCaracteristicas: [
        'Pode degenerar rapidamente para FV',
        'Pode terminar espontaneamente (especialmente se episodios curtos)',
        'QTc de base prolongado sugere Torsades de Pointes',
        'QTc de base normal em contexto de isquemia sugere TV polimorfica isquemica',
        'Padrao de "torcao" em torno da linha isoeletrica = TdP'
      ]
    },
    causas: [
      '** TV Polimorfica com QT NORMAL (nao-TdP): **',
      '  - Isquemia miocardica aguda / IAM em evolucao (causa mais comum)',
      '  - Sindrome de Brugada',
      '  - TV catecolaminergica polimorfica (CPVT)',
      '  - Reperfusao apos IAM tratado',
      '  - Sindrome do QT curto',
      '  - Espasmo coronariano',
      '  - Cardiomiopatia hipertrofica',
      '',
      '** TV Polimorfica com QT PROLONGADO (Torsades de Pointes): **',
      '  - Sindrome do QT longo congenito',
      '  - QT longo adquirido por medicamentos',
      '  - Disturbios eletroliticos (hipoK, hipoMg, hipoCa)',
      '  - Bradicardia grave',
      '  - Ver item especifico de Torsades de Pointes'
    ],
    fatoresRisco: [
      'Isquemia miocardica aguda / IAM',
      'Sindrome do QT longo (congenita ou adquirida)',
      'Medicamentos que prolongam QT (antiarritmicos IA e III, antibioticos, psicofarmacos)',
      'Hipocalemia (<3,5 mEq/L)',
      'Hipomagnesemia (<1,5 mg/dL)',
      'Hipocalcemia',
      'Bradicardia (<50 bpm)',
      'Insuficiencia cardiaca',
      'Sexo feminino (maior susceptibilidade a drogas que prolongam QT)',
      'Sindrome de Brugada',
      'Canalopatias geneticas',
      'Historia familiar de morte subita'
    ],
    significadoClinico: 'EMERGENCIA CARDIOVASCULAR. Alto risco de deterioracao para FV e morte subita. Deve ser tratada imediatamente. TV polimorfica isquemica indica necessidade de revascularizacao urgente. TV polimorfica com QT longo (TdP) exige correcao da causa. Mortalidade muito elevada sem tratamento.',
    nivelUrgencia: 1,
    condutaGeral: 'EMERGENCIA. Se sem pulso: desfibrilacao 200J e protocolo de PCR. Se com pulso: desfibrilacao nao-sincronizada (nao consegue sincronizar com ritmo caótico). Identificar e tratar causa de base (isquemia, disturbios eletroliticos, medicamentos). Se QT prolongado de base: magnesio IV, marcapasso para overdrive.',
    tratamentoAgudo: [
      '1. SE SEM PULSO: Protocolo de PCR - Desfibrilacao 200J bifasico imediata',
      '',
      '2. SE COM PULSO mas instavel: Desfibrilacao NAO sincronizada 200J (ritmo muito irregular para sincronizar)',
      '',
      '3. IDENTIFICAR CAUSA - tratamento especifico:',
      '',
      '** A) TV Polimorfica com QT NORMAL (provavel isquemia): **',
      '   - ECG de 12 derivacoes: buscar supra de ST, infra, alteracoes dinamicas',
      '   - Se isquemia: nitroglicerina, heparina, cateterismo de emergencia',
      '   - Betabloqueador (se nao contraindicado): Metoprolol 5mg IV',
      '   - Amiodarona 150mg IV',
      '   - Lidocaina 1-1,5mg/kg se isquemia aguda',
      '   - Evitar drogas que prolongam QT',
      '',
      '** B) TV Polimorfica com QT PROLONGADO (Torsades de Pointes): **',
      '   - Magnesio 2g IV em 2-5 minutos (primeira linha, mesmo sem hipoMg)',
      '   - Corrigir hipocalemia (alvo K+ >4,0 mEq/L)',
      '   - Suspender TODOS os medicamentos que prolongam QT',
      '   - Aumentar frequencia cardiaca (encurta QT):',
      '     * Isoproterenol 2-10 mcg/min (se bradicardia)',
      '     * Marcapasso transvenoso ou transcutâneo com overdrive (alvo FC 90-110 bpm)',
      '   - NUNCA usar amiodarona ou outros antiarritmicos que prolongam QT',
      '',
      '4. Monitorar em UTI coronariana',
      '',
      '5. Pos-estabilizacao: investigar causa de base (coronariografia, canalopatias, etc.)'
    ],
    criteriosEncaminhamento: [
      'TODOS os sobreviventes de TV polimorfica devem ser avaliados por eletrofisiologista',
      'Cateterismo de emergencia se suspeita de isquemia',
      'Avaliar CDI para prevencao secundaria',
      'Screening genetico se suspeita de canalopatia (QT longo, Brugada, CPVT)',
      'Avaliar familiares de primeiro grau se canalopatia confirmada',
      'Se QT longo congenito: betabloqueador cronico + considerar CDI',
      'Se Brugada: CDI se sintomatico; ablacao em tempestade eletrica',
      'Se isquemica: revascularizacao + CDI se FEVE reduzida'
    ],
    redFlags: [
      'Qualquer TV polimorfica e emergencia',
      'Deterioracao para FV - PCR',
      'Episodios recorrentes (tempestade eletrica)',
      'QTc muito prolongado (>550 ms) - alto risco',
      'TV polimorfica apos uso de novo medicamento - suspender imediatamente',
      'Hipocalemia grave (<3,0 mEq/L) associada',
      'TV polimorfica em paciente jovem sem cardiopatia - suspeitar canalopatia',
      'Historia familiar de morte subita - aumenta probabilidade de doenca genetica'
    ],
    dicasParaNaoEspecialista: [
      'TV polimorfica = QRS largos com morfologia que muda a cada batimento = EMERGENCIA',
      'Diferencie do ritmo: QT de base NORMAL = provavel isquemia; QT PROLONGADO = TdP',
      'Se sem pulso: desfibrilação imediata, nao perca tempo',
      'Se com pulso: desfibrilação NAO sincronizada (ritmo muito caótico para sincronizar)',
      'MAGNESIO 2g IV e tratamento de primeira linha para TdP (QT longo)',
      'NUNCA use amiodarona em TdP - prolonga QT e piora!',
      'Na TV polimorfica isquemica, a revascularizacao e o tratamento definitivo',
      'Revise TODOS os medicamentos do paciente - muitos prolongam QT',
      'Corrija eletrólitos agressivamente: K+ >4,0, Mg2+ >2,0'
    ],
    citations: [
      {
        refId: 'al-khatib-va-2018-3',
        authors: ['Al-Khatib SM', 'Stevenson WG', 'Ackerman MJ', 'et al.'],
        title: '2017 AHA/ACC/HRS Guideline for Management of Patients With Ventricular Arrhythmias and the Prevention of Sudden Cardiac Death',
        journal: 'Circulation',
        year: 2018,
        volume: '138',
        pages: 'e272-e391',
        doi: '10.1161/CIR.0000000000000549',
        pmid: '29084731'
      },
      {
        refId: 'acls-2020',
        authors: ['Panchal AR', 'Bartos JA', 'Cabanas JG', 'et al.'],
        title: 'Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care',
        journal: 'Circulation',
        year: 2020,
        volume: '142',
        pages: 'S366-S468',
        doi: '10.1161/CIR.0000000000000916',
        pmid: '33081529'
      },
      {
        refId: 'priori-genetics-2013',
        authors: ['Priori SG', 'Wilde AA', 'Horie M', 'et al.'],
        title: 'HRS/EHRA/APHRS Expert Consensus Statement on the Diagnosis and Management of Patients with Inherited Primary Arrhythmia Syndromes',
        journal: 'Heart Rhythm',
        year: 2013,
        volume: '10',
        pages: '1932-1963',
        doi: '10.1016/j.hrthm.2013.05.014',
        pmid: '24011539'
      }
    ]
  },

  // ============================================================================
  // 5. TORSADES DE POINTES (TdP)
  // ============================================================================
  {
    id: 'torsades-de-pointes',
    nome: 'Torsades de Pointes',
    nomeEN: 'Torsades de Pointes (TdP)',
    categoria: 'arritmia_ventricular',
    descricao: 'Forma especifica de TV polimorfica que ocorre no contexto de intervalo QT prolongado (congenito ou adquirido). Nome frances significa "torcao das pontas" pela aparencia de rotacao dos complexos QRS ao redor da linha isoeletrica. Pode ser autolimitada ou degenerar para FV. Tratamento difere da TV polimorfica comum.',
    criteriosECG: [
      '** NO ECG DE BASE (antes do episodio): **',
      '  - Intervalo QTc prolongado (>470 ms em homens, >480 ms em mulheres)',
      '  - Ondas T anormais (largas, bifidas, bifasicas)',
      '  - Ondas U proeminentes',
      '  - Alternancia de onda T (variacao beat-to-beat)',
      '  - Bradicardia frequente',
      '',
      '** DURANTE O EPISODIO: **',
      '  - TV polimorfica com aparencia de "torcao" em torno da linha de base',
      '  - Amplitude dos QRS cresce e decresce em padrao sinusoidal',
      '  - Eixo eletrico "gira" progressivamente',
      '  - Frequencia 150-300 bpm (tipicamente 200-250 bpm)',
      '  - Inicio tipico: EV caindo no periodo vulnerável (R-on-T) apos pausa',
      '  - Padrao "curto-longo-curto" tipico: intervalo curto, pausa longa, EV iniciando TdP'
    ],
    caracteristicas: {
      frequencia: '150-300 bpm (usualmente 200-250 bpm)',
      ritmo: 'Irregular com padrao sinusoidal de amplitude',
      ondaP: 'Nao identificavel durante arritmia',
      complexoQRS: 'Largo, polimorfico, com amplitude que oscila',
      morfologiaQRS: 'Rotacao aparente em torno da linha isoeletrica ("twisting")',
      eixoQRS: 'Instavel, com mudanca gradual e ciclica',
      outrasCaracteristicas: [
        'Padrao "curto-longo-curto" iniciador: batimento prematuro, pausa, outro prematuro -> TdP',
        'Episodios frequentemente autolimitados (segundos a minutos)',
        'Pode recorrer repetidamente (multiplos episodios)',
        'Pode degenerar para FV sustentada',
        'Sincope ou "colapso" subito tipico',
        'Retorno a ritmo sinusal geralmente abrupto'
      ]
    },
    causas: [
      '** SINDROME DO QT LONGO CONGENITO: **',
      '  - LQT1 (mutacao KCNQ1): gatilho exercicio/emocao, onda T larga',
      '  - LQT2 (mutacao KCNH2): gatilho alarme/susto sonoro, onda T bipartida',
      '  - LQT3 (mutacao SCN5A): gatilho repouso/sono, T de inicio tardio',
      '  - Outras variantes mais raras (LQT4-15)',
      '',
      '** QT LONGO ADQUIRIDO: **',
      '  Medicamentos (causa mais comum):',
      '  - Antiarritmicos: sotalol, dofetilida, quinidina, procainamida, amiodarona',
      '  - Antibioticos: macrolídeos, fluoroquinolonas, azitromicina',
      '  - Antifungicos: fluconazol, itraconazol',
      '  - Antihistaminicos: terfenadina (retirada), astemizol',
      '  - Psicofarmacos: haloperidol, droperidol, ziprasidona, clorpromazina, citalopram',
      '  - Antidepressivos triciclicos',
      '  - Metadona',
      '  - Ondansetrona',
      '',
      '  Disturbios eletroliticos:',
      '  - Hipocalemia (<3,5 mEq/L)',
      '  - Hipomagnesemia (<1,5 mg/dL)',
      '  - Hipocalcemia',
      '',
      '  Outras causas:',
      '  - Bradicardia grave',
      '  - Hipotireoidismo grave',
      '  - Anorexia nervosa (por disturbios eletroliticos)',
      '  - Dietas liquidas protéicas',
      '  - AVC hemorragico',
      '  - Bloqueio AV completo com escape lento'
    ],
    fatoresRisco: [
      'QTc de base prolongado (>500 ms = alto risco)',
      'Sexo feminino (2-3x maior risco por farmacos)',
      'Idade avancada',
      'Doenca cardiaca de base (IC, IAM, HVE)',
      'Bradicardia (<50 bpm)',
      'Hipocalemia ou hipomagnesemia',
      'Conversao recente de FA (acao de antiarritmicos)',
      'Uso de multiplas drogas que prolongam QT',
      'Insuficiencia hepatica ou renal (altera metabolismo de drogas)',
      'Historia previa de TdP',
      'Historia familiar de QT longo ou morte subita',
      'Polimorfismos geneticos que afetam canais ionicos'
    ],
    significadoClinico: 'EMERGENCIA com risco iminente de morte subita. Difere da TV polimorfica isquemica no tratamento: magnesio e a droga de escolha, e deve-se EVITAR antiarritmicos que prolongam QT. A identificacao da causa e essencial para prevencao de recorrencia. QT longo congenito tem implicacoes geneticas para familiares.',
    nivelUrgencia: 1,
    condutaGeral: 'Se sem pulso: desfibrilacao imediata. Se com pulso: magnesio IV e urgencia, correcao de eletrólitos, suspensao de drogas que prolongam QT, aumento da frequencia cardiaca (isoproterenol ou marcapasso). NUNCA use amiodarona, sotalol ou outros que prolongam QT.',
    tratamentoAgudo: [
      '1. SE SEM PULSO: Desfibrilacao 200J bifasico + protocolo ACLS',
      '',
      '2. SE COM PULSO:',
      '',
      '** MAGNESIO - PRIMEIRA LINHA: **',
      '   - Sulfato de magnesio 2g IV em bolus (2-5 minutos)',
      '   - Pode repetir 2g se TdP persistir',
      '   - Manter infusao: 0,5-1g/hora por 24-48 horas',
      '   - Eficaz mesmo sem hipomagnesemia documentada',
      '',
      '** CORRECAO DE ELETRÓLITOS: **',
      '   - Potassio: alvo >4,0-4,5 mEq/L (reposicao IV agressiva)',
      '   - Magnesio: alvo >2,0 mg/dL',
      '   - Calcio: corrigir se hipocalcemia presente',
      '',
      '** AUMENTAR FREQUENCIA CARDIACA (encurta QT): **',
      '   - Isoproterenol 2-10 mcg/min IV (primeira escolha se bradicardia)',
      '   - Marcapasso transvenoso ou transcutaneo: overdrive pacing 90-110 bpm',
      '   - Alvo: FC >90 bpm',
      '   - Atropina pode ser tentada, mas geralmente ineficaz',
      '',
      '** SUSPENDER AGENTES PRECIPITANTES: **',
      '   - Revisar TODOS os medicamentos do paciente',
      '   - Suspender qualquer droga que prolongue QT',
      '   - Lista completa em www.crediblemeds.org',
      '',
      '** O QUE NAO FAZER: **',
      '   - NUNCA use amiodarona - prolonga QT',
      '   - NUNCA use sotalol, procainamida, quinidina',
      '   - NUNCA use outros antiarritmicos classe III ou IA',
      '   - Nao demore para desfibrilar se instabilidade',
      '',
      '3. POS-ESTABILIZACAO:',
      '   - Monitoracao em UTI por 24-48h',
      '   - Manter infusao de magnesio',
      '   - Investigar causa: revisar medicamentos, dosar eletrólitos, considerar canalopatia',
      '   - Se QT longo congenito suspeito: genetica e avaliação familiar'
    ],
    criteriosEncaminhamento: [
      'TODOS os sobreviventes de TdP devem ser avaliados por eletrofisiologista',
      'Screening genetico se suspeita de QT longo congenito',
      'Avaliacao de familiares de primeiro grau se canalopatia confirmada',
      'CDI indicado se:',
      '   - QT longo congenito com sincope ou TdP apesar de betabloqueador',
      '   - Sobrevivente de PCR por TdP',
      '   - QT longo tipo 3 (LQT3) - maior risco',
      'Considerar denervacao simpatica cardiaca esquerda se TdP recorrente apesar de CDI',
      'Farmacologista clinico se multiplas drogas necessarias em paciente de risco'
    ],
    redFlags: [
      'QTc >500 ms - risco muito elevado de TdP',
      'TdP recorrente (multiplos episodios)',
      'Sincope previa nao explicada em paciente com QT longo',
      'Historia familiar de morte subita em jovem (<40 anos)',
      'TdP em paciente jovem sem fator precipitante obvio - suspeitar congenito',
      'Uso de multiplas drogas que prolongam QT simultaneamente',
      'Bradicardia grave (<40 bpm) com QT prolongado',
      'Hipocalemia grave (<3,0 mEq/L)',
      'TdP degenerando para FV'
    ],
    dicasParaNaoEspecialista: [
      'TdP = TV polimorfica + QT longo de base = tratamento DIFERENTE',
      'Padrao classico: QRS "girando" em torno da linha de base, amplitude oscilante',
      'MAGNESIO 2g IV e o tratamento de primeira linha - dê imediatamente!',
      'NUNCA use amiodarona na TdP - prolonga QT e piora a situacao',
      'Revise TODA a lista de medicamentos - muitos prolongam QT',
      'Site crediblemeds.org lista medicamentos que prolongam QT',
      'Corrija potassio para >4,0 e magnesio para >2,0',
      'Se bradicardia: isoproterenol ou marcapasso para acelerar - encurta QT',
      'TdP em jovem sem medicamento causal = pensar em QT longo congenito = genetica + triagem familiar'
    ],
    citations: [
      {
        refId: 'drew-tdp-2010',
        authors: ['Drew BJ', 'Ackerman MJ', 'Funk M', 'et al.'],
        title: 'Prevention of Torsade de Pointes in Hospital Settings: A Scientific Statement From the American Heart Association',
        journal: 'Circulation',
        year: 2010,
        volume: '121',
        pages: '1047-1060',
        doi: '10.1161/CIRCULATIONAHA.109.192704',
        pmid: '20185054'
      },
      {
        refId: 'schwartz-lqts-2012',
        authors: ['Schwartz PJ', 'Crotti L', 'Insolia R'],
        title: 'Long-QT Syndrome: From Genetics to Management',
        journal: 'Circulation: Arrhythmia and Electrophysiology',
        year: 2012,
        volume: '5',
        pages: '868-877',
        doi: '10.1161/CIRCEP.111.962019',
        pmid: '22895603'
      },
      {
        refId: 'priori-lqts-2015',
        authors: ['Priori SG', 'Blomstrom-Lundqvist C', 'Mazzanti A', 'et al.'],
        title: '2015 ESC Guidelines for the management of patients with ventricular arrhythmias and the prevention of sudden cardiac death',
        journal: 'European Heart Journal',
        year: 2015,
        volume: '36',
        pages: '2793-2867',
        doi: '10.1093/eurheartj/ehv316',
        pmid: '26320108'
      }
    ]
  },

  // ============================================================================
  // 6. FIBRILACAO VENTRICULAR (FV)
  // ============================================================================
  {
    id: 'fibrilacao-ventricular',
    nome: 'Fibrilacao Ventricular',
    nomeEN: 'Ventricular Fibrillation (VF)',
    categoria: 'arritmia_ventricular',
    descricao: 'Ritmo cardiaco terminal caracterizado por atividade eletrica ventricular completamente desorganizada e caotica, sem contração mecanica efetiva. Resulta em ausencia de debito cardiaco (parada cardiaca) e morte em minutos se nao tratada. E a arritmia mais comum em morte subita cardiaca extra-hospitalar. Unico tratamento eficaz e desfibrilacao eletrica imediata.',
    criteriosECG: [
      'Ausencia completa de complexos QRS organizados',
      'Ondas irregulares, caoticas, de amplitude e frequencia variaveis',
      'Sem linha isoeletrica identificavel',
      'Frequencia das ondulacoes: 150-500/min',
      'FV grosseira: ondulacoes de maior amplitude (inicio recente, mais responsiva ao choque)',
      'FV fina: ondulacoes de menor amplitude (<2-3mm) (mais prolongada, pior prognostico)',
      'Pode evoluir de FV grosseira para fina sem tratamento',
      'Diferenciar de artefato: checar eletrodos e paciente',
      'Diferenciar de assistolia: aumentar ganho do monitor'
    ],
    caracteristicas: {
      frequencia: 'Nao mensuravel (150-500 ondulacoes/min)',
      ritmo: 'Completamente caótico, sem organizacao',
      ondaP: 'Ausente',
      complexoQRS: 'Ausente - ondulacoes irregulares substituem o QRS',
      morfologiaQRS: 'Nao se aplica - nao ha QRS',
      outrasCaracteristicas: [
        'FV grosseira: ondas >5mm, responde melhor a desfibrilacao',
        'FV fina: ondas <2-3mm, considerar epinefrina antes de novo choque',
        'Pode ter breve periodo de TV antes de degenerar para FV',
        'Pode transiconar para assistolia se prolongada (piora prognostico)',
        'Padrões de ondas podem ajudar a predizer sucesso de choque'
      ]
    },
    causas: [
      '** CAUSAS CARDIACAS: **',
      '  - Doença arterial coronariana / IAM (causa mais comum, ~80%)',
      '  - Cardiomiopatias (dilatada, hipertrofica, DAVD)',
      '  - Insuficiencia cardiaca avancada',
      '  - Valvopatias',
      '  - Miocardite',
      '  - Cardiopatias congenitas',
      '  - Degeneracao de TV sustentada',
      '  - TV polimorfica/Torsades de Pointes',
      '',
      '** CAUSAS GENETICAS/CANALOPATIAS: **',
      '  - Sindrome do QT longo',
      '  - Sindrome de Brugada',
      '  - Sindrome do QT curto',
      '  - TV catecolaminergica polimorfica (CPVT)',
      '  - FV idiopatica',
      '',
      '** CAUSAS REVERSIVEIS (5Hs e 5Ts): **',
      '  - Hipoxia',
      '  - Hipovolemia',
      '  - Hipotermia',
      '  - Hipo/Hipercalemia',
      '  - H+ (acidose)',
      '  - Tensao no torax (pneumotorax)',
      '  - Tamponamento cardiaco',
      '  - Toxinas/medicamentos',
      '  - Trombose coronariana',
      '  - Tromboembolismo pulmonar',
      '',
      '** OUTRAS: **',
      '  - Eletrocucao/descarga eletrica',
      '  - Commotio cordis (trauma toracico)',
      '  - Cocaina e outras drogas simpaticomiméticas',
      '  - Hipertireoidismo grave',
      '  - Disturbios eletroliticos'
    ],
    fatoresRisco: [
      'Historia de doenca arterial coronariana',
      'IAM previo, especialmente com FEVE reduzida (<35%)',
      'Historia de TV sustentada ou FV previa',
      'Insuficiencia cardiaca (FEVE <35%)',
      'Cardiomiopatia de qualquer etiologia',
      'Historia familiar de morte subita (<40 anos)',
      'Sindrome do QT longo, Brugada ou outras canalopatias',
      'Uso de drogas ilicitas (cocaina)',
      'Disturbios eletroliticos',
      'Cardiopatia hipertrofica'
    ],
    significadoClinico: 'E PARADA CARDIACA. Sem debito cardiaco efetivo. Morte cerebral irreversivel em 4-6 minutos sem RCP. Sobrevida depende de desfibrilacao precoce: cada minuto de atraso reduz chance de sobrevida em 7-10%. FV e ritmo "chocavel" - desfibrilacao e o unico tratamento efetivo.',
    nivelUrgencia: 1,
    condutaGeral: 'PROTOCOLO DE PCR (ACLS). Confirmar ausencia de pulso. Iniciar RCP imediatamente. Desfibrilar assim que desfibrilador disponivel (200J bifasico). RCP de alta qualidade entre choques. Epinefrina e amiodarona conforme protocolo. Identificar e tratar causas reversiveis.',
    tratamentoAgudo: [
      '** PROTOCOLO ACLS PARA FV/TV SEM PULSO: **',
      '',
      '1. VERIFICAR RESPOSTA E PULSO',
      '   - Se nao responde e sem pulso: INICIAR PCR',
      '   - Chamar ajuda e pedir desfibrilador',
      '',
      '2. INICIAR RCP DE ALTA QUALIDADE IMEDIATAMENTE',
      '   - Compressoes 100-120/min, profundidade 5-6 cm',
      '   - Permitir retorno completo do torax',
      '   - Minimizar interrupcoes (<10 segundos)',
      '   - Alternar compressores a cada 2 minutos',
      '   - Relacao 30:2 se via aerea nao avancada',
      '',
      '3. DESFIBRILAÇÃO ASSIM QUE DISPONIVEL',
      '   - Bifasico: 200J (primeiro choque)',
      '   - Monofasico: 360J',
      '   - Aplicar choque e retomar RCP imediatamente',
      '   - Checar ritmo a cada 2 minutos',
      '',
      '4. ACESSO VENOSO/INTRAOSSEO',
      '',
      '5. EPINEFRINA 1mg IV/IO',
      '   - Primeira dose: apos segundo choque',
      '   - Repetir a cada 3-5 minutos',
      '',
      '6. AMIODARONA',
      '   - 300mg IV/IO em bolus (primeira dose, apos 3o choque)',
      '   - 150mg IV/IO (segunda dose, se necessario)',
      '   - Alternativa: Lidocaina 1-1,5 mg/kg',
      '',
      '7. IDENTIFICAR CAUSAS REVERSIVEIS (5Hs e 5Ts)',
      '   - Hipoxia: via aerea, O2',
      '   - Hipovolemia: volume',
      '   - Hipotermia: aquecimento',
      '   - Hipo/Hipercalemia: verificar K+',
      '   - Acidose: bicarbonato se indicado',
      '   - Pneumotorax: descompressao',
      '   - Tamponamento: pericardiocentese',
      '   - Toxinas: antidotos especificos',
      '   - Trombose coronariana: considerar ECMO/PCI',
      '   - TEP: trombolítico se confirmado',
      '',
      '8. CONSIDERAR VIA AEREA AVANCADA',
      '   - Intubação ou via aerea supraglotica',
      '   - Ventilacao continua sem pausas para compressao',
      '',
      '** POS-PCR: **',
      '   - Controle direcionado de temperatura (32-36°C por 24h)',
      '   - Coronariografia de emergencia se suspeita de IAM',
      '   - Neuroprotetores: evitar hipertermia, hipoglicemia, hiperglicemia',
      '   - Monitoração em UTI',
      '   - Avaliar funcao neurologica apos reaquecimento'
    ],
    criteriosEncaminhamento: [
      '** DURANTE PCR: **',
      '   - ECMO se disponivel e causa potencialmente reversivel',
      '   - Cateterismo de emergencia se suspeita de IAM',
      '',
      '** SOBREVIVENTES DE FV: **',
      '   - TODOS devem ser avaliados por eletrofisiologista',
      '   - CDI indicado para prevencao secundaria na maioria',
      '   - Coronariografia para avaliar DAC',
      '   - Ressonancia cardiaca se cardiopatia estrutural',
      '   - Avaliacao genetica se suspeita de canalopatia',
      '   - Avaliacao de familiares de primeiro grau se canalopatia',
      '   - Ablacao se TV documentada antes de FV',
      '',
      '** EXCECOES A CDI: **',
      '   - FV nas primeiras 48h de IAM (pode ser evento isolado)',
      '   - Causa completamente reversível identificada e corrigida',
      '   - Expectativa de vida limitada por outras comorbidades'
    ],
    redFlags: [
      'FV E SEMPRE EMERGENCIA MAXIMA',
      'FV fina pode ser confundida com assistolia - aumentar ganho',
      'FV persistente apos multiplos choques - considerar causas reversiveis',
      'FV recorrente (tempestade eletrica) - amiodarona, sedacao, considerar ablacao urgente',
      'FV sem causa identificavel em jovem - investigar canalopatia',
      'FV em ambiente nao monitorado - prognostico pior',
      'FV por mais de 10 minutos sem RCP - dano neurologico provavel'
    ],
    dicasParaNaoEspecialista: [
      'FV = ondas completamente caóticas = PARADA CARDIACA = DESFIBRILAR IMEDIATAMENTE',
      'RCP de alta qualidade salva vidas - comprima forte, rapido, sem parar',
      'Cada minuto sem desfibrilacao reduz a chance de sobrevida em 7-10%',
      'A droga mais importante na FV nao e um farmaco - é o CHOQUE',
      'Epinefrina e amiodarona sao coadjuvantes, nao substituem o choque',
      'FV fina: ondas pequenas, pode parecer assistolia - aumente o ganho',
      'FV grosseira: ondas grandes, melhor resposta ao choque',
      'Pense nos 5Hs e 5Ts durante a RCP - corrija causas reversiveis',
      'Sobrevivente de FV = CDI na maioria dos casos (prevencao secundaria)',
      'DEA/DAE podem ser usados por leigos - cada segundo conta'
    ],
    citations: [
      {
        refId: 'panchal-acls-2020',
        authors: ['Panchal AR', 'Bartos JA', 'Cabanas JG', 'et al.'],
        title: 'Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care',
        journal: 'Circulation',
        year: 2020,
        volume: '142',
        pages: 'S366-S468',
        doi: '10.1161/CIR.0000000000000916',
        pmid: '33081529'
      },
      {
        refId: 'myerburg-scd-2001',
        authors: ['Myerburg RJ', 'Castellanos A'],
        title: 'Cardiac arrest and sudden cardiac death',
        journal: 'Braunwald\'s Heart Disease: A Textbook of Cardiovascular Medicine',
        year: 2001,
        volume: '6th ed',
        pages: '890-931'
      },
      {
        refId: 'esc-va-2022-3',
        authors: ['Zeppenfeld K', 'Tfelt-Hansen J', 'de Riva M', 'et al.'],
        title: '2022 ESC Guidelines for the management of patients with ventricular arrhythmias and the prevention of sudden cardiac death',
        journal: 'European Heart Journal',
        year: 2022,
        volume: '43',
        pages: '3997-4126',
        doi: '10.1093/eurheartj/ehac262',
        pmid: '36017572'
      }
    ]
  },

  // ============================================================================
  // 7. RITMO IDIOVENTRICULAR ACELERADO (RIVA)
  // ============================================================================
  {
    id: 'riva',
    nome: 'Ritmo Idioventricular Acelerado',
    nomeEN: 'Accelerated Idioventricular Rhythm (AIVR)',
    categoria: 'arritmia_ventricular',
    descricao: 'Ritmo ventricular com frequencia entre 50-110 bpm, mais rapido que o ritmo de escape ventricular normal (30-40 bpm), mas mais lento que a taquicardia ventricular (>100-120 bpm). Classicamente associado a reperfusao apos tratamento de IAM (arritmia de reperfusao). Geralmente benigno e autolimitado, nao requer tratamento na maioria dos casos.',
    criteriosECG: [
      'QRS largo (>120 ms) de morfologia ventricular',
      'Frequencia 50-110 bpm (definição classica: 60-100 bpm)',
      'Ritmo geralmente regular',
      'Inicio e termino graduais ("warm-up" e "cool-down")',
      'Dissociacao AV frequente (ondas P dissociadas)',
      'Batimentos de fusao comuns (QRS intermediario entre sinusal e ventricular)',
      'Batimentos de captura possiveis (QRS estreito isolado)',
      'Competição com ritmo sinusal: ora um, ora outro predomina',
      'Geralmente monomorfico (mesma morfologia)'
    ],
    caracteristicas: {
      frequencia: '50-110 bpm (tipicamente 60-100 bpm)',
      ritmo: 'Regular ou quase regular',
      ondaP: 'Geralmente dissociadas (frequencia diferente do QRS) ou retrogradas',
      complexoQRS: 'Largo (>120 ms), morfologia ventricular constante',
      morfologiaQRS: 'Depende do foco: BRE se origem VD, BRD se origem VE; geralmente monomorfico',
      outrasCaracteristicas: [
        'Início gradual (warm-up): aceleracao progressiva até frequencia de pico',
        'Término gradual (cool-down): desaceleracao até ritmo sinusal reassumir',
        'Competição com ritmo sinusal: alternam no controle do ritmo',
        'Fusões frequentes quando frequencias sao similares',
        'Geralmente hemodinamicamente bem tolerado',
        'Duracao tipica: segundos a minutos, autolimitado'
      ]
    },
    causas: [
      '** REPERFUSAO POS-IAM (causa classica): **',
      '  - Arritmia de reperfusão apos trombólise ou angioplastia primaria',
      '  - Considerado marcador de reperfusao bem-sucedida',
      '  - Ocorre tipicamente 30min a 2h após reperfusao',
      '',
      '** OUTRAS CAUSAS CARDIACAS: **',
      '  - IAM em fase aguda (mesmo sem reperfusao)',
      '  - Miocardite',
      '  - Cardiomiopatias',
      '  - Pos-cirurgia cardiaca',
      '',
      '** DISTURBIOS METABOLICOS: **',
      '  - Intoxicacao digitalica (classico)',
      '  - Hipercalemia',
      '  - Intoxicacao por cocaina',
      '  - Anestesia (halotano, ciclopropano)',
      '',
      '** OUTRAS: **',
      '  - Atletas de alta performance (variante normal)',
      '  - Hipertensao intracraniana',
      '  - Disfuncao do nó sinusal (RIVA como escape)',
      '  - Neonatos (pode ser variante normal)',
      '  - Idiopatico'
    ],
    fatoresRisco: [
      'IAM em tratamento de reperfusao (marcador de sucesso)',
      'Uso de digitalicos (especialmente em níveis toxicos)',
      'Procedimentos de cateterismo cardiaco',
      'Cirurgia cardiaca',
      'Disturbios eletroliticos',
      'Doença do nó sinusal'
    ],
    significadoClinico: 'Geralmente BENIGNO e AUTOLIMITADO. No contexto de reperfusao apos IAM, e considerado marcador de reperfusao bem-sucedida (sinal favoravel). Raramente causa instabilidade hemodinamica. Geralmente nao requer tratamento especifico. A supressao com antiarritmicos pode ser deleteria (remove ritmo de escape). Diferenciar de TV (FC mais alta, nao autolimitada).',
    nivelUrgencia: 4,
    condutaGeral: 'Observacao na maioria dos casos. RIVA no contexto de reperfusao e benigno e autolimitado. Evitar suprimir com antiarritmicos (pode ser ritmo de escape). Se instabilidade hemodinamica (raro): atropina para acelerar ritmo sinusal ou marcapasso. Tratar intoxicacao digitalica se for a causa.',
    tratamentoAgudo: [
      '1. NA MAIORIA DOS CASOS: OBSERVAÇÃO E MONITORIZAÇÃO',
      '   - RIVA e geralmente benigno e autolimitado',
      '   - Raramente causa instabilidade hemodinâmica',
      '   - Nao tratar apenas pelo achado de ECG',
      '',
      '2. NÃO USAR ANTIARRITIMICOS DE ROTINA:',
      '   - Lidocaina e outros antiarritmicos podem ser deletérios',
      '   - Podem suprimir ritmo de escape necessário',
      '   - Podem causar assistolia se nó sinusal também deprimido',
      '',
      '3. SE INSTABILIDADE HEMODINÂMICA (raro):',
      '   - Atropina 0,5-1mg IV (acelera ritmo sinusal para "assumir")',
      '   - Marcapasso transcutaneo se bradicardia sinusal de base',
      '   - Isoproterenol raramente necessario',
      '',
      '4. SE INTOXICAÇÃO DIGITALICA:',
      '   - Suspender digitalico',
      '   - Corrigir hipocalemia',
      '   - Fab anti-digoxina (Digibind) se intoxicacao grave',
      '',
      '5. NO CONTEXTO DE IAM EM REPERFUSÃO:',
      '   - Reconhecer como marcador de reperfusao (bom sinal!)',
      '   - Manter monitoracao',
      '   - Geralmente resolve espontaneamente em minutos a horas',
      '',
      '6. DIFERENCIAR DE TV:',
      '   - RIVA: 50-110 bpm, warm-up/cool-down, autolimitado, benigno',
      '   - TV: >100-120 bpm, inicio/termino abruptos, pode ser maligna'
    ],
    criteriosEncaminhamento: [
      'RIVA isolado em contexto de reperfusao: nao requer encaminhamento especifico',
      'Encaminhar se:',
      '   - RIVA persistente (>24-48h) sem causa identificavel',
      '   - RIVA recorrente fora do contexto de reperfusao',
      '   - RIVA sintomatico com palpitacoes frequentes',
      '   - RIVA associado a bradicardia sinusal importante',
      '   - Suspeita de intoxicacao digitalica grave',
      '   - Suspeita de doenca do nó sinusal de base',
      'Investigar com Holter se episodios recorrentes'
    ],
    redFlags: [
      'RIVA prolongado (>24h) - investigar causa',
      'RIVA com frequencia >110 bpm - pode ser TV lenta, monitorar',
      'RIVA causando sintomas significativos (sincope, baixo debito)',
      'RIVA no contexto de intoxicacao digitalica grave',
      'RIVA associado a outros sinais de instabilidade (hipotensao, angina)',
      'RIVA polimorfico - mais preocupante que monomorfico',
      'Confusao diagnostica com TV - se duvida, tratar como TV'
    ],
    dicasParaNaoEspecialista: [
      'RIVA = QRS largo com FC 50-110 bpm = "TV lenta" mas geralmente BENIGNA',
      'No pos-IAM com reperfusao, RIVA e sinal de BOA noticia (reperfusao funcionou)',
      'NÃO trate RIVA com lidocaina ou amiodarona de rotina - pode piorar',
      'Diferencie de TV pela frequencia: RIVA <110, TV geralmente >120-150',
      'RIVA tem inicio e termino graduais; TV e abrupta',
      'Fusoes e capturas sao comuns e ajudam no diagnostico',
      'Se o paciente esta estavel e RIVA, apenas observe',
      'Se instabilidade: atropina para acelerar o sinusal, nao para suprimir RIVA',
      'Em intoxicacao digitalica, suspender a droga e o principal'
    ],
    citations: [
      {
        refId: 'riera-riva-2010',
        authors: ['Riera ARP', 'Barros RB', 'de Sousa FD', 'et al.'],
        title: 'Accelerated idioventricular rhythm: history and chronology of the main discoveries',
        journal: 'Indian Pacing and Electrophysiology Journal',
        year: 2010,
        volume: '10',
        pages: '40-48',
        pmid: '20084194'
      },
      {
        refId: 'gorgels-riva-1988',
        authors: ['Gorgels APM', 'Vos MA', 'Letsch IS', 'et al.'],
        title: 'Usefulness of the accelerated idioventricular rhythm as a marker for myocardial necrosis and reperfusion during thrombolytic therapy in acute myocardial infarction',
        journal: 'American Journal of Cardiology',
        year: 1988,
        volume: '61',
        pages: '231-235',
        doi: '10.1016/0002-9149(88)90920-5',
        pmid: '3124587'
      },
      {
        refId: 'bonnemeier-aivr-2003',
        authors: ['Bonnemeier H', 'Ortak J', 'Wiegand UK', 'et al.'],
        title: 'Accelerated idioventricular rhythm in the post-thrombolytic era: incidence, prognostic implications, and modulating mechanisms after direct percutaneous coronary intervention',
        journal: 'Annals of Noninvasive Electrocardiology',
        year: 2005,
        volume: '10',
        pages: '179-187',
        doi: '10.1111/j.1542-474X.2005.05624.x',
        pmid: '15842430'
      }
    ]
  }
];

export default arritmiasVentriculares;
