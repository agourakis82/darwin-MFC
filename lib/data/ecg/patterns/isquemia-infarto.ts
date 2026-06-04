/**
 * PADROES DE ISQUEMIA E INFARTO - ECG MODULE - DARWIN-MFC
 * ========================================================
 *
 * Padroes eletrocardiograficos de isquemia miocardica e infarto agudo do miocardio
 * com dados clinicos completos para uso em APS e emergencia.
 *
 * Rigor academico Q1 (Nature/Cell level)
 *
 * Referencias principais:
 * - AHA/ACC 2023 STEMI Guidelines
 * - ESC 2023 Acute Coronary Syndrome Guidelines
 * - Fourth Universal Definition of Myocardial Infarction (2018)
 * - Braunwald's Heart Disease
 *
 * @module lib/data/ecg/patterns/isquemia-infarto
 * @version 1.0.0
 * @lastUpdate 2025-01
 */

import type { Citation } from '../../../types/references';

// =============================================================================
// TIPOS E INTERFACES
// =============================================================================

/**
 * Nivel de urgencia para padrao ECG
 * 1 = Emergencia (acao imediata - minutos)
 * 2 = Urgente (acao em horas)
 * 3 = Alerta (acao em dias)
 * 4 = Rotina (acao eletiva)
 */
export type NivelUrgencia = 1 | 2 | 3 | 4;

/**
 * Territorio miocardico afetado
 */
export type TerritorioMiocardico =
  | 'anterior'
  | 'anterosseptal'
  | 'anterolateral'
  | 'lateral'
  | 'lateral_alto'
  | 'inferior'
  | 'inferolateral'
  | 'posterior'
  | 'ventriculo_direito'
  | 'difuso'
  | 'variavel';

/**
 * Arteria coronaria relacionada
 */
export type ArteriaCoronariaRelacionada =
  | 'DA proximal'
  | 'DA media'
  | 'DA distal'
  | 'Diagonal'
  | 'Cx proximal'
  | 'Cx distal'
  | 'Marginal obtusa'
  | 'CD proximal'
  | 'CD media'
  | 'CD distal'
  | 'Descendente posterior'
  | 'Ventricular posterior'
  | 'Tronco de coronaria esquerda'
  | 'Multiplas'
  | 'Variavel';

/**
 * Categoria do padrao ECG
 */
export type CategoriaECG =
  | 'isquemia_infarto'
  | 'arritmia'
  | 'disturbio_conducao'
  | 'sobrecarga'
  | 'outros';

/**
 * Caracteristicas clinicas do padrao
 */
export interface CaracteristicasClinicas {
  apresentacaoTipica: string;
  sintomasAssociados: string[];
  fatoresDeRisco: string[];
  populacaoAfetada?: string;
  prognostico: string;
}

/**
 * Criterios diagnosticos do ECG
 */
export interface CriteriosECG {
  criteriosPrincipais: string[];
  criteriosSecundarios?: string[];
  derivacoesAfetadas: string[];
  alteracoesReciprocas?: string[];
  evolucaoTemporal?: string[];
}

/**
 * Tratamento agudo baseado em guidelines
 */
export interface TratamentoAgudo {
  medicamentoso: string[];
  procedimentos: string[];
  monitoracao: string[];
  contraindicacoes?: string[];
  tempoPortaBalao?: string;
}

/**
 * Criterios de encaminhamento
 */
export interface CriteriosEncaminhamento {
  imediato: string[];
  urgente?: string[];
  eletivo?: string[];
}

/**
 * Interface principal para padrao de isquemia/infarto
 */
export interface ECGPattern {
  /** Identificador unico */
  id: string;

  /** Nome em portugues */
  nome: string;

  /** Nome em ingles */
  nomeEN: string;

  /** Categoria do padrao */
  categoria: CategoriaECG;

  /** Territorio miocardico afetado */
  territorio: TerritorioMiocardico;

  /** Arteria coronaria relacionada */
  arteriaRelacionada: ArteriaCoronariaRelacionada;

  /** Descricao completa do padrao */
  descricao: string;

  /** Criterios diagnosticos ECG */
  criteriosECG: CriteriosECG;

  /** Caracteristicas clinicas */
  caracteristicasClinicas: CaracteristicasClinicas;

  /** Causas e fatores de risco */
  causasEFatoresRisco: string[];

  /** Nivel de urgencia (1-4) */
  urgencia: NivelUrgencia;

  /** Tratamento agudo */
  tratamentoAgudo: TratamentoAgudo;

  /** Criterios de encaminhamento */
  criteriosEncaminhamento: CriteriosEncaminhamento;

  /** Dicas para nao-especialistas */
  dicasParaNaoEspecialista: string[];

  /** Red flags - sinais de alerta */
  redFlags: string[];

  /** Diagnostico diferencial */
  diagnosticoDiferencial: string[];

  /** Tags para busca */
  tags: string[];

  /** Citacoes academicas */
  citations: Citation[];

  /** Ultima atualizacao */
  lastUpdate: string;
}

// =============================================================================
// DADOS DOS PADROES DE ISQUEMIA E INFARTO
// =============================================================================

export const isquemiaInfarto: ECGPattern[] = [
  // =========================================================================
  // 1. IAMCSST ANTERIOR (DA PROXIMAL)
  // =========================================================================
  {
    id: 'iamcsst-anterior',
    nome: 'IAMCSST Anterior',
    nomeEN: 'Anterior STEMI',
    categoria: 'isquemia_infarto',
    territorio: 'anterior',
    arteriaRelacionada: 'DA proximal',

    descricao: `O infarto agudo do miocardio com supradesnivelamento do segmento ST (IAMCSST) anterior
    representa a forma mais grave de sindrome coronariana aguda, causado pela oclusao aguda da arteria
    descendente anterior (DA) proximal. Esta arteria irriga a maior parte do ventriculo esquerdo,
    incluindo a parede anterior, septo interventricular e apice cardiaco. A oclusao proximal da DA
    compromete uma grande massa miocardica, resultando em extensa area de infarto, elevado risco de
    disfuncao ventricular severa, choque cardiogenico e morte. O ECG mostra supradesnivelamento de
    ST nas derivacoes precordiais anteriores (V1-V4) e frequentemente em V5-V6 e DI/aVL. A presenca
    de alteracoes em V1-V2 associadas a aVL sugere oclusao muito proximal (antes do primeiro ramo
    septal e diagonal), conhecida como "widow maker" ou "assassino de viuvas" pelo alto risco de
    mortalidade. A reperfusao precoce (ICP primaria em <90 minutos ou fibrinolitico em <30 minutos)
    e mandatoria para salvamento miocardico.`,

    criteriosECG: {
      criteriosPrincipais: [
        'Supradesnivelamento de ST >= 1mm em >= 2 derivacoes contiguas precordiais (V1-V6)',
        'Supradesnivelamento de ST >= 2mm em derivacoes V2-V3 (homens >= 40 anos)',
        'Supradesnivelamento de ST >= 2,5mm em derivacoes V2-V3 (homens < 40 anos)',
        'Supradesnivelamento de ST >= 1,5mm em derivacoes V2-V3 (mulheres)',
        'Ondas Q patologicas (> 40ms ou > 25% da amplitude R) podem surgir em horas',
        'Progressao tipica: hiperagudo (T amplas) -> ST elevado -> Q patologica -> T invertida',
      ],
      criteriosSecundarios: [
        'Perda de progressao da onda R em V1-V4',
        'Complexos QS em derivacoes anteriores (infarto transmural estabelecido)',
        'Ondas T hiperagudas (largas, simetricas, apiculadas) - fase inicial',
        'Fragmentacao do QRS (indicador de fibrose/cicatriz)',
      ],
      derivacoesAfetadas: ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'DI', 'aVL'],
      alteracoesReciprocas: [
        'Infradesnivel de ST em derivacoes inferiores (DII, DIII, aVF)',
        'Infradesnivel em aVR menos proeminente que no infarto de TCE',
      ],
      evolucaoTemporal: [
        'Minutos: Ondas T hiperagudas (altas, simetricas, base alargada)',
        '30min-horas: Supradesnivelamento de ST convexo ("tombstone")',
        '6-12h: Inicio de ondas Q patologicas',
        '24-48h: Inversao de ondas T com ST retornando a linha de base',
        'Dias-semanas: Persistencia de ondas Q, normalizacao de ST-T',
        'Aneurisma de VE: Persistencia de ST elevado apos 2 semanas',
      ],
    },

    caracteristicasClinicas: {
      apresentacaoTipica: `Dor toracica retroesternal intensa, em aperto/opressao, duracao > 20 minutos,
      irradiacao para membro superior esquerdo, mandibula ou dorso, associada a sudorese fria, nauseas
      e sensacao de morte iminente. Pode apresentar dispneia por disfuncao de VE aguda.`,
      sintomasAssociados: [
        'Sudorese profusa (diaforese)',
        'Nauseas e vomitos',
        'Dispneia (edema pulmonar incipiente)',
        'Palidez cutanea',
        'Ansiedade e sensacao de morte iminente',
        'Sintomas neurovegetativos (bradicardia ou taquicardia)',
        'Sincope (especialmente se arritmia associada)',
      ],
      fatoresDeRisco: [
        'Hipertensao arterial sistemica',
        'Diabetes mellitus',
        'Dislipidemia (LDL elevado)',
        'Tabagismo',
        'Historia familiar de DAC precoce',
        'Obesidade',
        'Sedentarismo',
        'Estresse psicossocial',
        'Idade (homens > 45a, mulheres > 55a)',
        'Uso de cocaina (vasoespasmo)',
      ],
      populacaoAfetada: 'Predomina em homens de meia-idade (45-65 anos), porem mulheres pos-menopausa tem risco equiparavel. Pacientes mais jovens frequentemente tem uso de cocaina ou estado hipercoagulavel.',
      prognostico: `Mortalidade intra-hospitalar de 6-10% se tratado com ICP primaria em tempo adequado.
      Sem reperfusao, mortalidade pode chegar a 25-30%. Risco de disfuncao ventricular severa (FEVE <35%)
      em 20-30% dos casos. Complicacoes mecanicas (CIV, rotura de parede livre) mais comuns em IAM anterior extenso.`,
    },

    causasEFatoresRisco: [
      'Rotura de placa ateromatosa instavel com trombose oclusiva',
      'Erosao de placa aterosclerotica',
      'Vasoespasmo coronariano (cocaina, Prinzmetal)',
      'Embolia coronariana (FA, endocardite, tumores)',
      'Disseccao espontanea de coronaria (SCAD - mais comum em mulheres jovens)',
      'Arterite coronariana (Kawasaki, Takayasu)',
      'Trauma toracico fechado',
      'Iatrogenia (ICP complicada, cirurgia cardiaca)',
      'MINOCA (infarto sem obstrucao coronariana - descartar miocardite, Takotsubo)',
    ],

    urgencia: 1,

    tratamentoAgudo: {
      medicamentoso: [
        'AAS 300mg mastigado (se nao houver contraindicacao absoluta)',
        'Inibidor de P2Y12: Ticagrelor 180mg OU Prasugrel 60mg (se ICP) OU Clopidogrel 600mg',
        'Anticoagulacao: Heparina nao fracionada 60-70 UI/kg (max 5000 UI) bolus + infusao',
        'Morfina 2-4mg IV se dor refrataria (evitar uso rotineiro - pode retardar absorcao de antiplaquetarios)',
        'Oxigenio se SatO2 < 90% (evitar hiperóxia)',
        'Nitroglicerina SL ou IV se dor persistente (CONTRAINDICADA se PAS < 90, IAM de VD, sildenafil < 24h)',
        'Betabloqueador VO nas primeiras 24h se estavel (Metoprolol 25-50mg)',
        'IECA/BRA precoce se disfuncao de VE (Captopril 6,25-12,5mg)',
        'Estatina de alta potencia (Atorvastatina 80mg ou Rosuvastatina 40mg)',
      ],
      procedimentos: [
        'ICP PRIMARIA: Estrategia de primeira escolha - tempo porta-balao < 90 min',
        'Se ICP nao disponivel em 120 min: Fibrinolitico (Tenecteplase ajustado ao peso)',
        'Estrategia farmaco-invasiva: Fibrinolitico + transferencia para ICP em 3-24h',
        'CABG de urgencia: Anatomia desfavoravel para ICP, complicacao mecanica, choque refratario',
        'Suporte mecanico (BIA, ECMO, Impella) se choque cardiogenico',
        'Marca-passo provisorio se bradicardia sintomatica ou BAV de alto grau',
      ],
      monitoracao: [
        'Monitoracao cardiaca continua por minimo 24-48h (risco de arritmias malignas)',
        'Troponina de alta sensibilidade seriada (0h, 1-3h)',
        'ECG seriado a cada 15-30 min ate estabilizacao',
        'Controle de PA e FC (alvo: PAS > 90, FC 60-100)',
        'Balanco hidrico rigoroso',
        'Ecocardiograma nas primeiras 24h para avaliacao de FEVE e complicacoes',
        'BNP/NT-proBNP para estratificacao',
      ],
      contraindicacoes: [
        'Nitratos: PAS < 90mmHg, uso de inibidores de PDE5 nas ultimas 24-48h, IAM de VD',
        'Betabloqueadores: IC descompensada, bradicardia, hipotensao, BAV 2o/3o grau, asma grave',
        'Fibrinoliticos: AVC hemorragico previo, AVC isquemico < 3 meses, neoplasia intracraniana, sangramento ativo, disseccao de aorta, trauma craniano recente',
      ],
      tempoPortaBalao: 'Ideal < 60 minutos; Aceitavel < 90 minutos; Maximo 120 minutos se transferencia',
    },

    criteriosEncaminhamento: {
      imediato: [
        'TODOS os pacientes com IAMCSST anterior devem ir para hospital com ICP 24/7',
        'Acionar SAMU/servico de emergencia para transporte com suporte avancado',
        'ECG pre-hospitalar com transmissao para hospital receptor',
        'Contato previo com equipe de hemodinamica para ativar sala de cateterismo',
        'Se instabilidade hemodinamica: UTI coronariana com suporte de circulacao',
      ],
    },

    dicasParaNaoEspecialista: [
      'Supradesnivel de ST em V1-V4 com infradesnivel reciproco inferior = IAM anterior ate prova em contrario',
      'NAO espere troponina para diagnosticar IAMCSST - o ECG e SUFICIENTE para indicar reperfusao',
      'Tempo e musculo: cada minuto de atraso = mais miocardio perdido',
      'Evite morfina rotineiramente - pode retardar absorcao de antiplaquetarios orais',
      'AAS mastigado (nao engolido inteiro) garante absorcao mais rapida',
      'Nitroglicerina alivia dor mas NAO reduz mortalidade - nao atrasar reperfusao para administrar nitrato',
      'Se nao ha sala de cateterismo disponivel em 120 min, o fibrinolitico esta indicado',
      'IAM anterior extenso com choque = mortalidade > 50% - considere suporte mecanico',
      'Paciente "estavel" com IAM anterior extenso pode deteriorar rapidamente - vigilancia maxima',
      'Ondas T hiperagudas podem ser o unico sinal inicial - nao ignore!',
    ],

    redFlags: [
      'Hipotensao (PAS < 90 mmHg) ou sinais de choque cardiogenico',
      'Edema agudo de pulmao (crepitantes bilaterais, ortopneia)',
      'Arritmias ventriculares (TV/FV) - ter desfibrilador disponivel',
      'BAV de alto grau (2o Mobitz II ou BAVT) - preparar marca-passo',
      'Supradesnivel extenso (V1-V6 + DI + aVL) sugere oclusao muito proximal da DA',
      'Supradesnivel em aVR > 1mm com infradesnivel difuso = obstrucao de TCE ou trivascular',
      'Dor persistente apos fibrinolitico = reperfusao falhou - ICP de resgate urgente',
      'Sopro sistolico novo = CIV ou insuficiencia mitral aguda',
      'Atrito pericardico precoce = possivel sindrome de Dressler ou rotura contida',
      'Turgencia jugular sem crepitantes = considerar IAM de VD associado',
    ],

    diagnosticoDiferencial: [
      'Pericardite aguda (supradesnivel concavo difuso, sem alteracoes reciprocas, infradesnivel de PR)',
      'Sindrome de Takotsubo (disfuncao apical sem obstrucao coronaria, pos-estresse emocional)',
      'Miocardite aguda (historia de prodromo viral, troponina elevada sem padrao de territorio)',
      'Repolarizacao precoce benigna (supradesnivel com entalhe no ponto J, jovens saudaveis)',
      'Hipercalemia grave (ondas T apiculadas, alargamento de QRS, achatamento de P)',
      'Embolia pulmonar (S1Q3T3, sobrecarga de VD, D-dimero elevado)',
      'Disseccao de aorta (dor toracica lancinante, PA assimetrica, mediastino alargado)',
      'Angina de Prinzmetal (supradesnivel transitorio, vasoespasmo, sem necrose)',
    ],

    tags: [
      'IAMCSST',
      'infarto anterior',
      'DA proximal',
      'supradesnivel ST',
      'emergencia',
      'ICP primaria',
      'widow maker',
      'troponina',
      'SCA',
    ],

    citations: [
      {
        refId: 'ibanez-stemi-esc-2017',
        authors: ['Ibanez B', 'James S', 'Agewall S', 'et al.'],
        title: '2017 ESC Guidelines for the management of acute myocardial infarction in patients presenting with ST-segment elevation',
        journal: 'European Heart Journal',
        year: 2018,
        volume: '39',
        pages: '119-177',
        doi: '10.1093/eurheartj/ehx393',
        pmid: '28886621',
      },
      {
        refId: 'oGara-stemi-aha-2013',
        authors: ['O\'Gara PT', 'Kushner FG', 'Ascheim DD', 'et al.'],
        title: '2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction',
        journal: 'Circulation',
        year: 2013,
        volume: '127',
        pages: 'e362-e425',
        doi: '10.1161/CIR.0b013e3182742cf6',
        pmid: '23247304',
      },
      {
        refId: 'thygesen-mi-definition-2018',
        authors: ['Thygesen K', 'Alpert JS', 'Jaffe AS', 'et al.'],
        title: 'Fourth Universal Definition of Myocardial Infarction (2018)',
        journal: 'Circulation',
        year: 2018,
        volume: '138',
        pages: 'e618-e651',
        doi: '10.1161/CIR.0000000000000617',
        pmid: '30571511',
      },
      {
        refId: 'de-winter-jama-2008',
        authors: ['de Winter RJ', 'Verouden NJ', 'Wellens HJ', 'Wilde AA'],
        title: 'A New ECG Sign of Proximal LAD Occlusion',
        journal: 'New England Journal of Medicine',
        year: 2008,
        volume: '359',
        pages: '2071-2073',
        doi: '10.1056/NEJMc0804737',
        pmid: '18987380',
      },
    ],

    lastUpdate: '2025-01',
  },

  // =========================================================================
  // 2. IAMCSST INFERIOR (CD/Cx)
  // =========================================================================
  {
    id: 'iamcsst-inferior',
    nome: 'IAMCSST Inferior',
    nomeEN: 'Inferior STEMI',
    categoria: 'isquemia_infarto',
    territorio: 'inferior',
    arteriaRelacionada: 'CD proximal',

    descricao: `O infarto agudo do miocardio com supradesnivelamento do segmento ST (IAMCSST) inferior
    e causado pela oclusao aguda da arteria coronaria direita (CD) em 80-90% dos casos, ou da arteria
    circunflexa (Cx) em 10-20% (especialmente em pacientes com dominancia esquerda). A parede inferior
    do ventriculo esquerdo e irrigada pela arteria descendente posterior, que na maioria dos individuos
    (85%) origina-se da CD (dominancia direita). O ECG mostra supradesnivelamento de ST nas derivacoes
    inferiores (DII, DIII e aVF), frequentemente com alteracoes reciprocas em aVL e derivacoes anteriores.
    O IAM inferior pode estar associado a acometimento do ventriculo direito (40% dos casos de oclusao
    proximal da CD) e/ou parede posterior, o que modifica significativamente o prognostico e manejo.
    Disturbios de conducao (bradicardia sinusal, BAV) sao comuns devido a irrigacao do no sinusal e no AV
    pela CD. Reflexos vagais (hipotensao e bradicardia - reflexo de Bezold-Jarisch) sao frequentes.`,

    criteriosECG: {
      criteriosPrincipais: [
        'Supradesnivelamento de ST >= 1mm em DII, DIII e aVF',
        'Supradesnivelamento em DIII > DII sugere oclusao de CD (vs. Cx)',
        'Ondas Q patologicas em derivacoes inferiores (podem surgir em horas)',
        'Evolucao temporal similar ao IAM anterior: T hiperagudo -> ST elevado -> Q -> T invertida',
      ],
      criteriosSecundarios: [
        'Infradesnivel em aVL e DI (alteracao reciproca - importante para confirmar IAM)',
        'Depressao de ST em V1-V3: pode indicar extensao posterior - fazer V7-V9',
        'Elevacao de ST em V1 com relacao ST V1/ST V2 > 1: sugere envolvimento de VD - fazer V3R-V4R',
        'Desvio do eixo eletrico para direita durante fase aguda',
      ],
      derivacoesAfetadas: ['DII', 'DIII', 'aVF', 'V5', 'V6'],
      alteracoesReciprocas: [
        'Infradesnivel de ST em aVL (mais sensivel - presente em >90%)',
        'Infradesnivel de ST em DI',
        'Infradesnivel de ST em V1-V3 (pode indicar parede posterior)',
      ],
      evolucaoTemporal: [
        'Minutos iniciais: Ondas T apiculadas, simetricas (fase hiperaguda)',
        '30-60 minutos: Supradesnivelamento de ST convexo',
        '2-6 horas: Inicio de ondas Q em derivacoes inferiores',
        '12-24 horas: Inversao de ondas T, normalizacao gradual de ST',
        '1-2 semanas: Ondas Q podem persistir ou diminuir',
      ],
    },

    caracteristicasClinicas: {
      apresentacaoTipica: `Dor toracica inferior ou epigastrica, frequentemente confundida com quadro
      gastrointestinal. Pode irradiar para dorso. Sintomas vagais sao proeminentes: nauseas, vomitos,
      sudorese, bradicardia e hipotensao. Sincope pode ser manifestacao inicial.`,
      sintomasAssociados: [
        'Nauseas e vomitos (muito frequentes no IAM inferior)',
        'Dor epigastrica (confundida com dispepsia)',
        'Sudorese fria',
        'Bradicardia sinusal',
        'Hipotensao (especialmente se IAM de VD associado)',
        'Sincope ou pre-sincope',
        'Turgencia jugular (se IAM de VD)',
      ],
      fatoresDeRisco: [
        'Hipertensao arterial',
        'Diabetes mellitus',
        'Dislipidemia',
        'Tabagismo',
        'Historia familiar de DAC precoce',
        'Obesidade',
        'Sexo masculino',
      ],
      populacaoAfetada: 'Similar a outros tipos de IAM. IAM inferior representa 40-50% de todos os IAMCSST.',
      prognostico: `Geralmente melhor que IAM anterior isolado (mortalidade hospitalar 5-6% vs. 8-10%).
      Porem, se associado a IAM de VD, mortalidade aumenta para 25-30%. Disturbios de conducao sao
      frequentes mas geralmente transitorios. Choque cardiogenico e menos comum que no IAM anterior.`,
    },

    causasEFatoresRisco: [
      'Aterosclerose coronariana com rotura de placa instavel na CD ou Cx',
      'Dominancia direita (85%): oclusao de CD causa IAM inferior',
      'Dominancia esquerda (15%): oclusao de Cx causa IAM inferior',
      'Vasoespasmo coronariano',
      'Embolia coronariana',
      'Disseccao coronariana',
    ],

    urgencia: 1,

    tratamentoAgudo: {
      medicamentoso: [
        'AAS 300mg mastigado',
        'Inibidor de P2Y12: Ticagrelor 180mg ou Prasugrel 60mg ou Clopidogrel 600mg',
        'Anticoagulacao: Heparina nao fracionada ou Enoxaparina',
        'Atropina 0,5-1mg IV se bradicardia sinusal sintomatica (comum no IAM inferior)',
        'Evitar nitroglicerina se suspeita de IAM de VD (pode causar hipotensao grave)',
        'Se hipotensao por IAM de VD: reposicao volemica cautelosa (250-500mL SF)',
        'Evitar betabloqueadores na fase aguda se bradicardia ou hipotensao',
        'Morfina com cautela (pode acentuar bradicardia/hipotensao)',
      ],
      procedimentos: [
        'ICP primaria: Estrategia preferencial - tempo porta-balao < 90 min',
        'Fazer derivacoes V3R-V4R se suspeita de IAM de VD',
        'Fazer derivacoes V7-V9 se infradesnivel em V1-V3 (parede posterior)',
        'Marca-passo provisorio se BAV de alto grau (comum no IAM inferior)',
        'Fibrinolitico se ICP nao disponivel em 120 min',
      ],
      monitoracao: [
        'Monitoracao continua por 24-48h (risco de BAV e arritmias)',
        'Observar sinais de IAM de VD: hipotensao + turgencia jugular + pulmoes limpos',
        'ECG seriado incluindo V3R-V4R e V7-V9',
        'Ecocardiograma para avaliacao de funcao de VD e VE',
        'Atencao a disturbios de conducao: BAV 1o, 2o (Mobitz I mais comum), 3o grau',
      ],
      contraindicacoes: [
        'Nitratos: IAM de VD (pode precipitar hipotensao grave e choque)',
        'Betabloqueadores: bradicardia sintomatica, BAV, hipotensao',
        'Diureticos: se IAM de VD (reduzem pre-carga e pioram debito de VD)',
      ],
      tempoPortaBalao: 'Ideal < 60 min; Aceitavel < 90 min',
    },

    criteriosEncaminhamento: {
      imediato: [
        'Todo IAMCSST inferior deve ir para hospital com ICP',
        'Se IAM de VD associado: centro com experiencia em suporte hemodinamico',
        'BAV de alto grau: centro com marca-passo provisorio/definitivo',
        'Choque cardiogenico: UTI coronariana com suporte mecanico',
      ],
    },

    dicasParaNaoEspecialista: [
      'Supradesnivel em DII, DIII, aVF com infradesnivel em aVL = IAM inferior classico',
      'SEMPRE faca V3R e V4R para avaliar VD - muda completamente o manejo!',
      'SEMPRE faca V7-V9 se infradesnivel em V1-V3 - pode ser IAM posterior',
      'NUNCA de nitrato se IAM de VD - pode causar colapso hemodinamico',
      'Bradicardia e vomitos sao MUITO comuns no IAM inferior - nao confunda com quadro vagal benigno',
      'Hipotensao + turgencia jugular + pulmoes limpos = IAM de VD',
      'Atropina e util para bradicardia vagal, mas nao resolve BAV de alto grau',
      'BAV no IAM inferior geralmente e transitorio (dias) e pode nao requerer marca-passo definitivo',
      'DIII > DII sugere CD; DII > DIII sugere Cx',
    ],

    redFlags: [
      'Hipotensao refrataria a volume (choque cardiogenico)',
      'BAV completo (BAVT) com escape ventricular lento',
      'Extensao para VD (elevacao V3R/V4R) - alto risco',
      'Extensao posterior (depressao V1-V3 com elevacao V7-V9)',
      'Arritmias ventriculares sustentadas (TV/FV)',
      'Sopro sistolico novo (rotura de musculo papilar - IM aguda)',
      'Hipotensao paradoxal apos nitroglicerina (indica IAM de VD)',
      'Bloqueio de ramo agudo (indica extensa area de infarto)',
    ],

    diagnosticoDiferencial: [
      'Pericardite aguda (supradesnivel difuso concavo, infradesnivel de PR)',
      'Embolia pulmonar (S1Q3T3, sobrecarga de VD)',
      'Repolarizacao precoce benigna',
      'Miocardiopatia de Takotsubo (disfuncao sem obstrucao coronaria)',
      'Disseccao de aorta com envolvimento de ostio de CD',
    ],

    tags: [
      'IAMCSST',
      'infarto inferior',
      'coronaria direita',
      'circunflexa',
      'IAM de VD',
      'bradicardia',
      'BAV',
      'reflexo vagal',
    ],

    citations: [
      {
        refId: 'ibanez-stemi-esc-2017',
        authors: ['Ibanez B', 'James S', 'Agewall S', 'et al.'],
        title: '2017 ESC Guidelines for the management of acute myocardial infarction in patients presenting with ST-segment elevation',
        journal: 'European Heart Journal',
        year: 2018,
        volume: '39',
        pages: '119-177',
        doi: '10.1093/eurheartj/ehx393',
        pmid: '28886621',
      },
      {
        refId: 'zimetbaum-inferior-mi-2003',
        authors: ['Zimetbaum PJ', 'Josephson ME'],
        title: 'Use of the electrocardiogram in acute myocardial infarction',
        journal: 'New England Journal of Medicine',
        year: 2003,
        volume: '348',
        pages: '933-940',
        doi: '10.1056/NEJMra022700',
        pmid: '12621138',
      },
      {
        refId: 'braat-rv-infarction-1983',
        authors: ['Braat SH', 'Brugada P', 'de Zwaan C', 'et al.'],
        title: 'Value of electrocardiogram in diagnosing right ventricular involvement in patients with an acute inferior wall myocardial infarction',
        journal: 'British Heart Journal',
        year: 1983,
        volume: '49',
        pages: '368-372',
        doi: '10.1136/hrt.49.4.368',
        pmid: '6830671',
      },
    ],

    lastUpdate: '2025-01',
  },

  // =========================================================================
  // 3. IAMCSST LATERAL (Cx/MARGINAIS)
  // =========================================================================
  {
    id: 'iamcsst-lateral',
    nome: 'IAMCSST Lateral',
    nomeEN: 'Lateral STEMI',
    categoria: 'isquemia_infarto',
    territorio: 'lateral',
    arteriaRelacionada: 'Cx proximal',

    descricao: `O infarto agudo do miocardio com supradesnivelamento do segmento ST (IAMCSST) lateral
    resulta da oclusao da arteria circunflexa (Cx) ou de seus ramos marginais. A parede lateral do
    ventriculo esquerdo e uma regiao eletricamente "silenciosa" nas derivacoes convencionais do ECG
    de 12 derivacoes, o que torna o diagnostico mais desafiador. O ECG mostra supradesnivelamento
    de ST em DI, aVL, V5 e V6. Quando a elevacao e mais proeminente em DI e aVL (parede lateral alta),
    frequentemente ha alteracoes reciprocas nas derivacoes inferiores. O IAM lateral isolado e menos
    comum; mais frequentemente ocorre como extensao de IAM anterior (anterolateral) ou inferior
    (inferolateral). A circunflexa e a arteria coronaria mais subdiagnosticada em sindromes coronarianas
    agudas, pois suas alteracoes podem ser sutis ou ausentes no ECG convencional.`,

    criteriosECG: {
      criteriosPrincipais: [
        'Supradesnivelamento de ST >= 1mm em DI e aVL (parede lateral alta)',
        'Supradesnivelamento de ST >= 1mm em V5 e V6 (parede lateral baixa)',
        'Pode haver elevacao combinada em DI, aVL, V5, V6',
        'Ondas Q patologicas em derivacoes laterais',
      ],
      criteriosSecundarios: [
        'IAM lateral alto isolado: elevacao em DI/aVL com infradesnivel em DIII (reciproca)',
        'IAM lateral pode ter ECG de 12 derivacoes normal ou minimamente alterado',
        'Ondas R amplas em V1-V2 (podem representar "Q posterior" em espelho)',
        'Considerar derivacoes posteriores (V7-V9) se suspeita clinica sem alteracao classica',
      ],
      derivacoesAfetadas: ['DI', 'aVL', 'V5', 'V6'],
      alteracoesReciprocas: [
        'Infradesnivel em DIII e aVF (quando elevacao em DI/aVL)',
        'Pode haver infradesnivel sutil em derivacoes inferiores',
      ],
      evolucaoTemporal: [
        'Similar a outros territorios: T hiperagudo -> ST elevado -> Q -> T invertida',
        'Ondas Q em derivacoes laterais indicam necrose transmural',
      ],
    },

    caracteristicasClinicas: {
      apresentacaoTipica: `Dor toracica tipica com irradiacao para membro superior esquerdo, ombro
      ou mandibula. Pode apresentar dispneia se houver disfuncao significativa do VE. Manifestacoes
      atipicas sao mais comuns no territorio da Cx.`,
      sintomasAssociados: [
        'Dor toracica em aperto/opressao',
        'Irradiacao para MSE, ombro, mandibula',
        'Dispneia',
        'Sudorese',
        'Nauseas',
        'Ansiedade',
      ],
      fatoresDeRisco: [
        'Hipertensao arterial',
        'Diabetes mellitus',
        'Dislipidemia',
        'Tabagismo',
        'Historia familiar de DAC',
        'Obesidade',
      ],
      populacaoAfetada: 'Ocorre em toda populacao de risco para DAC. A oclusao de Cx e frequentemente subdiagnosticada, especialmente em mulheres e diabeticos com apresentacao atipica.',
      prognostico: `Prognostico intermediario. IAM lateral isolado geralmente tem menor massa miocardica
      comprometida que IAM anterior extenso. Porem, oclusao de Cx proximal pode comprometer area
      significativa. Mortalidade hospitalar de 4-6%.`,
    },

    causasEFatoresRisco: [
      'Aterosclerose coronariana com rotura de placa na Cx ou ramos marginais',
      'Dominancia esquerda aumenta o territorio da Cx',
      'Vasoespasmo coronariano',
      'Embolia coronariana',
      'Disseccao coronariana',
    ],

    urgencia: 1,

    tratamentoAgudo: {
      medicamentoso: [
        'AAS 300mg mastigado',
        'Inibidor de P2Y12 (Ticagrelor 180mg, Prasugrel 60mg ou Clopidogrel 600mg)',
        'Anticoagulacao com Heparina',
        'Nitroglicerina SL/IV se dor (se PA permitir)',
        'Morfina se dor refrataria',
        'Betabloqueador nas primeiras 24h se estavel',
        'IECA/BRA se disfuncao de VE',
        'Estatina de alta potencia',
      ],
      procedimentos: [
        'ICP primaria: Estrategia de primeira escolha',
        'Derivacoes posteriores (V7-V9) se suspeita clinica com ECG nao diagnostico',
        'Fibrinolitico se ICP nao disponivel em tempo adequado',
      ],
      monitoracao: [
        'Monitoracao cardiaca continua',
        'ECG seriado',
        'Troponina seriada',
        'Ecocardiograma para funcao de VE',
      ],
      tempoPortaBalao: 'Ideal < 60 min; Aceitavel < 90 min',
    },

    criteriosEncaminhamento: {
      imediato: [
        'Todo IAMCSST lateral deve ir para centro com ICP',
        'Alta suspeita clinica com ECG inconclusivo tambem requer avaliacao urgente',
      ],
    },

    dicasParaNaoEspecialista: [
      'IAM lateral pode ter ECG quase normal - nao descartar IAM so pelo ECG!',
      'Elevacao em DI/aVL com depressao em DIII = IAM lateral alto classico',
      'A circunflexa e a arteria mais "escondida" no ECG - tenha alto indice de suspeita',
      'Se sintomas tipicos e ECG normal, considere derivacoes V7-V9',
      'IAM lateral puro e raro - frequentemente acompanha IAM anterior ou inferior',
      'Troponina elevada com ECG "normal" pode ser IAM de Cx - cate urgente',
    ],

    redFlags: [
      'ECG normal ou quase normal com sintomas tipicos - pode ser IAM de Cx',
      'Troponina elevada sem alteracao de ECG - pensar em Cx',
      'Hipotensao ou sinais de IC aguda',
      'Arritmias ventriculares',
      'Sopro novo de insuficiencia mitral',
    ],

    diagnosticoDiferencial: [
      'Pericardite (supradesnivel difuso, infradesnivel de PR)',
      'Miocardite',
      'Takotsubo',
      'Repolarizacao precoce',
      'Hipertrofia de VE (alteracoes de repolarizacao)',
    ],

    tags: [
      'IAMCSST',
      'infarto lateral',
      'circunflexa',
      'marginal',
      'lateral alto',
      'ECG oculto',
    ],

    citations: [
      {
        refId: 'ibanez-stemi-esc-2017',
        authors: ['Ibanez B', 'James S', 'Agewall S', 'et al.'],
        title: '2017 ESC Guidelines for the management of acute myocardial infarction in patients presenting with ST-segment elevation',
        journal: 'European Heart Journal',
        year: 2018,
        volume: '39',
        pages: '119-177',
        doi: '10.1093/eurheartj/ehx393',
        pmid: '28886621',
      },
      {
        refId: 'khan-lateral-mi-2019',
        authors: ['Khan JN', 'Chauhan A', 'Mozdiak E', 'et al.'],
        title: 'Posterior myocardial infarction: are we failing to diagnose this?',
        journal: 'Emergency Medicine Journal',
        year: 2019,
        volume: '36',
        pages: '369-374',
        doi: '10.1136/emermed-2018-207893',
        pmid: '31003999',
      },
    ],

    lastUpdate: '2025-01',
  },

  // =========================================================================
  // 4. IAMCSST POSTERIOR (VERDADEIRO)
  // =========================================================================
  {
    id: 'iamcsst-posterior',
    nome: 'IAMCSST Posterior (Verdadeiro)',
    nomeEN: 'True Posterior STEMI',
    categoria: 'isquemia_infarto',
    territorio: 'posterior',
    arteriaRelacionada: 'CD distal',

    descricao: `O infarto agudo do miocardio com supradesnivelamento do segmento ST (IAMCSST) posterior
    isolado ou "verdadeiro" e causado pela oclusao de ramos posteriores da coronaria direita (arteria
    descendente posterior) ou da circunflexa. A parede posterior do ventriculo esquerdo nao e
    diretamente visualizada pelas derivacoes convencionais do ECG de 12 derivacoes, tornando este
    diagnostico um dos mais desafiadores em cardiologia de emergencia. As alteracoes no ECG padrao
    aparecem como "imagem em espelho" nas derivacoes V1-V3: ao inves de supradesnivelamento de ST,
    observa-se INFRAdesnivelamento de ST; ao inves de ondas Q, observam-se ondas R amplas. O
    diagnostico definitivo requer derivacoes posteriores (V7, V8, V9), onde o supradesnivelamento
    de ST >= 0,5mm confirma o infarto posterior. Este padrao e frequentemente associado a IAM inferior
    (infero-posterior) e sua identificacao e crucial pois indica maior area de infarto e pior prognostico.`,

    criteriosECG: {
      criteriosPrincipais: [
        'Infradesnivel de ST >= 0,5mm em V1-V3 (imagem em espelho do supra posterior)',
        'Relacao R/S > 1 em V1 ou V2 (equivalente a onda Q posterior)',
        'Onda R ampla em V1 (> 40ms e amplitude aumentada)',
        'Onda T positiva, simetrica e ampla em V1-V3',
        'CONFIRMAR com derivacoes posteriores (V7-V9): supradesnivelamento >= 0,5mm',
      ],
      criteriosSecundarios: [
        'Frequentemente associado a IAM inferior (elevacao em DII, DIII, aVF)',
        'Ratio R/S progressivamente maior de V1 para V2',
        'Infradesnivel horizontal ou descendente em V1-V3',
        'Pode haver elevacao em V5-V6 (extensao lateral)',
      ],
      derivacoesAfetadas: ['V7', 'V8', 'V9', 'V1-V3 (imagem em espelho)'],
      alteracoesReciprocas: [
        'Alteracoes em V1-V3 sao a "imagem reciproca" do infarto posterior',
        'Infradesnivel V1-V3 e o equivalente do supradesnivelamento posterior',
        'Onda R alta em V1-V2 e o equivalente da onda Q posterior',
      ],
      evolucaoTemporal: [
        'Fase aguda: infradesnivel em V1-V3 com T positivas amplas',
        'Horas: desenvolvimento de ondas R amplas em V1-V2',
        'Cronico: ratio R/S > 1 em V1, pode normalizar ou persistir',
      ],
    },

    caracteristicasClinicas: {
      apresentacaoTipica: `Dor toracica tipica, frequentemente associada a sintomas de IAM inferior
      (nauseas, vomitos, sudorese). Pode apresentar dor mais posterior/dorsal. Quando isolado,
      o diagnostico e frequentemente perdido.`,
      sintomasAssociados: [
        'Dor toracica retroesternal',
        'Dor dorsal ou interescapular',
        'Nauseas e vomitos (se inferior associado)',
        'Bradicardia (se inferior/VD associado)',
        'Hipotensao',
        'Sudorese',
      ],
      fatoresDeRisco: [
        'Mesmos fatores de risco para DAC',
        'Hipertensao',
        'Diabetes',
        'Tabagismo',
        'Dislipidemia',
      ],
      populacaoAfetada: 'IAM posterior isolado e raro (3-11% dos IAM); mais frequentemente ocorre como extensao de IAM inferior.',
      prognostico: `IAM infero-posterior tem pior prognostico que IAM inferior isolado, indicando
      maior massa miocardica em risco. Quando nao diagnosticado, o paciente perde janela de reperfusao.`,
    },

    causasEFatoresRisco: [
      'Oclusao da arteria descendente posterior (ramo da CD na maioria)',
      'Oclusao de Cx em pacientes com dominancia esquerda',
      'Oclusao de ramos posterolaterais',
      'Frequentemente associado a oclusao proximal de CD',
    ],

    urgencia: 1,

    tratamentoAgudo: {
      medicamentoso: [
        'AAS 300mg mastigado',
        'Inibidor de P2Y12 (Ticagrelor, Prasugrel ou Clopidogrel)',
        'Anticoagulacao',
        'Tratamento padrao de IAM',
        'Cuidado com nitratos se IAM de VD associado',
      ],
      procedimentos: [
        'ICP primaria: Estrategia preferencial',
        'OBRIGATORIO fazer derivacoes posteriores (V7-V9) se suspeita',
        'OBRIGATORIO fazer derivacoes V3R-V4R (IAM de VD frequentemente associado)',
        'Fibrinolitico se ICP indisponivel',
      ],
      monitoracao: [
        'Monitoracao continua',
        'ECG seriado incluindo derivacoes posteriores',
        'Troponina seriada',
        'Ecocardiograma para funcao segmentar',
      ],
      tempoPortaBalao: 'Ideal < 60 min',
    },

    criteriosEncaminhamento: {
      imediato: [
        'Todo IAM posterior confirmado deve ir para ICP de emergencia',
        'Mesmo com suspeita clinica alta e derivacoes posteriores nao disponiveis, encaminhar',
      ],
    },

    dicasParaNaoEspecialista: [
      'Infradesnivel de ST em V1-V3 pode ser IAM POSTERIOR - nao e apenas "alteracao reciproca"!',
      'SEMPRE faca V7-V9 quando houver depressao de ST em V1-V3',
      'SEMPRE associe com V3R-V4R para avaliar VD',
      'Onda R alta em V1 + infradesnivel V1-V3 = IAM posterior ate prova em contrario',
      'O IAM posterior e um dos mais subdiagnosticados - tenha alto indice de suspeita',
      'Se IAM inferior, SEMPRE procure extensao posterior e de VD',
      'Nao confunda infradesnivel V1-V3 no IAM posterior com IAMSST (sao entidades diferentes)',
    ],

    redFlags: [
      'Infradesnivel proeminente em V1-V3 sem outra explicacao = IAM posterior',
      'IAM inferior com depressao de ST em V1-V3 = extensao posterior provavel',
      'Troponina elevada com infradesnivel em V1-V3 sem supra = PODE SER IAM POSTERIOR',
      'Nao fazer derivacoes posteriores = perder o diagnostico',
      'Hipotensao + IAM posterior = pode haver IAM de VD associado',
    ],

    diagnosticoDiferencial: [
      'IAMSST anterior (infradesnivel pode ser reciproco ou isquemia subendocardica)',
      'Hipertrofia de VD (ratio R/S > 1 em V1, mas sem contexto agudo)',
      'BRD (rSR\' em V1, nao onda R ampla)',
      'WPW tipo A (delta wave positiva em V1)',
      'Dextrocardia (ondas R amplas em V1, progressao invertida)',
      'Miocardiopatia hipertrofica septal',
    ],

    tags: [
      'IAMCSST',
      'infarto posterior',
      'derivacoes posteriores',
      'V7 V8 V9',
      'imagem em espelho',
      'infradesnivel V1-V3',
      'subdiagnosticado',
    ],

    citations: [
      {
        refId: 'ibanez-stemi-esc-2017',
        authors: ['Ibanez B', 'James S', 'Agewall S', 'et al.'],
        title: '2017 ESC Guidelines for the management of acute myocardial infarction in patients presenting with ST-segment elevation',
        journal: 'European Heart Journal',
        year: 2018,
        volume: '39',
        pages: '119-177',
        doi: '10.1093/eurheartj/ehx393',
        pmid: '28886621',
      },
      {
        refId: 'somers-posterior-mi-2016',
        authors: ['Somers MP', 'Brady WJ', 'Perron AD', 'Mattu A'],
        title: 'The prominent T wave: electrocardiographic differential diagnosis',
        journal: 'American Journal of Emergency Medicine',
        year: 2002,
        volume: '20',
        pages: '243-251',
        doi: '10.1053/ajem.2002.32630',
        pmid: '12025660',
      },
      {
        refId: 'wung-posterior-leads-2001',
        authors: ['Wung SF', 'Drew BJ'],
        title: 'New electrocardiographic criteria for posterior wall acute myocardial ischemia validated by a percutaneous transluminal coronary angioplasty model of acute myocardial infarction',
        journal: 'American Journal of Cardiology',
        year: 2001,
        volume: '87',
        pages: '970-974',
        doi: '10.1016/S0002-9149(01)01431-X',
        pmid: '11305990',
      },
    ],

    lastUpdate: '2025-01',
  },

  // =========================================================================
  // 5. IAMCSST DE VD (VENTRICULO DIREITO)
  // =========================================================================
  {
    id: 'iamcsst-ventriculo-direito',
    nome: 'IAMCSST de Ventriculo Direito',
    nomeEN: 'Right Ventricular STEMI',
    categoria: 'isquemia_infarto',
    territorio: 'ventriculo_direito',
    arteriaRelacionada: 'CD proximal',

    descricao: `O infarto agudo do miocardio com supradesnivelamento do segmento ST (IAMCSST) do
    ventriculo direito (VD) ocorre tipicamente como extensao do IAM inferior, resultante da oclusao
    proximal da arteria coronaria direita (CD) antes da emergencia dos ramos ventriculares direitos.
    O VD depende criticamente da pre-carga para manter seu debito, e o infarto de VD resulta em
    disfuncao diast olica grave com reducao do enchimento do ventriculo esquerdo. Clinicamente,
    apresenta-se com a triade classica: hipotensao, turgencia jugular e pulmoes limpos. O diagnostico
    requer derivacoes precordiais direitas (V3R, V4R), sendo a elevacao de ST >= 1mm em V4R o
    criterio mais sensivel e especifico. O manejo difere significativamente do IAM de VE: nitratos
    e diureticos sao CONTRAINDICADOS (reduzem pre-carga), e a ressuscitacao volemica cautelosa e
    a base do tratamento. A mortalidade do IAM inferior com extensao para VD e 3-4 vezes maior
    que IAM inferior isolado.`,

    criteriosECG: {
      criteriosPrincipais: [
        'Supradesnivelamento de ST >= 1mm em V4R (criterio mais especifico - >90%)',
        'Supradesnivelamento de ST >= 0,5mm em V3R',
        'Elevacao de ST em V1 (pode ser o unico indicio nas derivacoes padrao)',
        'Relacao ST V1/ST V2 > 1 ou ST V4R > ST V3R',
        'Geralmente associado a supradesnivelamento em DII, DIII, aVF (IAM inferior)',
      ],
      criteriosSecundarios: [
        'Elevacao de ST em V1 enquanto V2 tem infradesnivel (padrao caracteristico)',
        'Elevacao de ST maior em DIII do que em DII (sugere CD proximal)',
        'Bloqueio AV de alto grau (frequente por isquemia do no AV)',
        'Bradicardia sinusal (por isquemia do no sinusal)',
        'Fibrilacao atrial (isquemia atrial direita)',
      ],
      derivacoesAfetadas: ['V3R', 'V4R', 'V5R', 'V6R', 'V1', 'DII', 'DIII', 'aVF'],
      alteracoesReciprocas: [
        'Infradesnivel em aVL e DI (reciproco ao IAM inferior)',
        'Infradesnivel em V2 enquanto V1 esta elevado',
      ],
      evolucaoTemporal: [
        'Elevacao de ST em V4R e TRANSITORIA - pode normalizar em 12-24h!',
        'Fazer derivacoes direitas PRECOCEMENTE - nao deixar para depois',
        'Ondas Q em derivacoes direitas podem surgir',
      ],
    },

    caracteristicasClinicas: {
      apresentacaoTipica: `Triade classica de INFARTO DE VD: hipotensao + turgencia jugular +
      pulmoes limpos (ausencia de crepitantes). Pode apresentar sinal de Kussmaul (aumento da
      turgencia jugular na inspiracao). Choque cardiogenico com perfil "seco-frio".`,
      sintomasAssociados: [
        'Hipotensao arterial',
        'Turgencia jugular patologica',
        'Pulmoes limpos (SEM crepitantes - diferencial com IC esquerda)',
        'Hepatomegalia dolorosa',
        'Edema periferico',
        'Sincope',
        'Nauseas e vomitos (sintomas vagais)',
        'Bradicardia ou arritmias',
      ],
      fatoresDeRisco: [
        'Oclusao proximal de CD (principal fator)',
        'Dominancia direita do sistema coronariano',
        'Mesmos fatores de risco para aterosclerose coronariana',
      ],
      populacaoAfetada: 'IAM de VD ocorre em 30-50% dos IAM inferiores causados por oclusao proximal de CD. IAM de VD isolado e muito raro.',
      prognostico: `Mortalidade hospitalar de 25-30% (vs. 5-6% do IAM inferior isolado).
      Complicacoes incluem choque cardiogenico, BAV completo, arritmias atriais e ventriculares.
      Se sobreviver a fase aguda, recuperacao da funcao de VD geralmente ocorre em semanas.`,
    },

    causasEFatoresRisco: [
      'Oclusao proximal da CD (antes dos ramos ventriculares direitos)',
      'Raramente: oclusao de ramos marginais direitos isolados',
      'Dominancia direita (85% da populacao) aumenta area irrigada pela CD',
    ],

    urgencia: 1,

    tratamentoAgudo: {
      medicamentoso: [
        'AAS 300mg mastigado',
        'Inibidor de P2Y12',
        'Anticoagulacao',
        'CONTRAINDICADOS: Nitroglicerina, morfina em doses altas, diureticos',
        'Reposicao volemica: SF 0,9% 250-500mL em bolus, repetir conforme resposta',
        'Se hipotensao refrataria a volume: Dobutamina (inotrópico de VD)',
        'Atropina para bradicardia sintomatica',
      ],
      procedimentos: [
        'ICP PRIMARIA URGENTE: Unica intervencao que reduz mortalidade',
        'OBRIGATORIO: Derivacoes V3R e V4R em TODO IAM inferior',
        'Marca-passo provisorio se BAV de alto grau',
        'Suporte mecanico (BIA) se choque refratario',
        'Considerar ECMO em casos extremos',
        'Evitar ventilacao com pressao positiva (reduz retorno venoso)',
      ],
      monitoracao: [
        'Monitoracao hemodinamica invasiva (PVC, Swan-Ganz) se choque',
        'Monitoracao cardiaca continua (risco de BAV e arritmias)',
        'Balanco hidrico rigoroso (evitar sobrecarga mas manter pre-carga)',
        'Ecocardiograma para funcao de VD e excluir tamponamento',
        'Troponina e BNP seriados',
      ],
      contraindicacoes: [
        'NITRATOS: Reduzem pre-carga e podem causar colapso hemodinamico',
        'DIURETICOS: Reduzem pre-carga - contraindicados',
        'MORFINA: Cautela - pode causar hipotensao e bradicardia',
        'VENTILACAO COM PRESSAO POSITIVA: Reduz retorno venoso',
        'BETABLOQUEADORES: Cautela se bradicardia ou hipotensao',
      ],
      tempoPortaBalao: 'URGENTE < 60 minutos - mortalidade muito elevada',
    },

    criteriosEncaminhamento: {
      imediato: [
        'TODO IAM de VD deve ir para centro com ICP e UTI coronariana',
        'Necessidade de suporte hemodinamico avancado',
        'Disponibilidade de marca-passo provisorio',
        'Possibilidade de suporte mecanico (BIA, ECMO)',
      ],
    },

    dicasParaNaoEspecialista: [
      'Em TODO IAM inferior, faca V3R e V4R - a sobrevida do paciente depende disso!',
      'Hipotensao + turgencia jugular + pulmoes limpos = IAM de VD',
      'NUNCA de nitrato em IAM de VD - pode matar o paciente!',
      'NUNCA de diuretico em IAM de VD - piora a hipotensao!',
      'O tratamento e VOLUME, VOLUME, VOLUME (com cuidado)',
      'Se o paciente piora apos nitrato = provavelmente e IAM de VD',
      'A elevacao em V4R pode desaparecer em 12-24h - faca precocemente!',
      'Choque em IAM inferior = suspeitar fortemente de VD',
      'BAV completo e comum - tenha marca-passo disponivel',
      'Dobutamina e o inotropico de escolha se refratario a volume',
    ],

    redFlags: [
      'Hipotensao refrataria a volume - risco de PCR',
      'BAV completo com escape lento',
      'Choque cardiogenico',
      'Piora apos nitrato ou diuretico',
      'Arritmias ventriculares malignas',
      'FA de alta resposta (pode precipitar choque)',
      'Necessidade de ventilacao mecanica (agrava hemodinamica)',
    ],

    diagnosticoDiferencial: [
      'Tamponamento cardiaco (triade de Beck, pulso paradoxal)',
      'Embolia pulmonar macica (sobrecarga de VD, D-dimero)',
      'IAM inferior sem envolvimento de VD',
      'Pericardite constritiva (cronico)',
      'Infarto de VE com choque cardiogenico (pulmoes congestos)',
    ],

    tags: [
      'IAMCSST',
      'infarto de VD',
      'ventriculo direito',
      'V4R',
      'derivacoes direitas',
      'hipotensao',
      'contraindicacao nitrato',
      'pre-carga',
      'choque',
    ],

    citations: [
      {
        refId: 'ibanez-stemi-esc-2017',
        authors: ['Ibanez B', 'James S', 'Agewall S', 'et al.'],
        title: '2017 ESC Guidelines for the management of acute myocardial infarction in patients presenting with ST-segment elevation',
        journal: 'European Heart Journal',
        year: 2018,
        volume: '39',
        pages: '119-177',
        doi: '10.1093/eurheartj/ehx393',
        pmid: '28886621',
      },
      {
        refId: 'goldstein-rv-infarction-2002',
        authors: ['Goldstein JA'],
        title: 'Pathophysiology and management of right heart ischemia',
        journal: 'Journal of the American College of Cardiology',
        year: 2002,
        volume: '40',
        pages: '841-853',
        doi: '10.1016/S0735-1097(02)02048-X',
        pmid: '12225705',
      },
      {
        refId: 'zehender-rv-infarction-1993',
        authors: ['Zehender M', 'Kasper W', 'Kauder E', 'et al.'],
        title: 'Right ventricular infarction as an independent predictor of prognosis after acute inferior myocardial infarction',
        journal: 'New England Journal of Medicine',
        year: 1993,
        volume: '328',
        pages: '981-988',
        doi: '10.1056/NEJM199304083281401',
        pmid: '8450875',
      },
    ],

    lastUpdate: '2025-01',
  },

  // =========================================================================
  // 6. IAMSST (NSTEMI) - ALTO RISCO
  // =========================================================================
  {
    id: 'iamsst-alto-risco',
    nome: 'IAMSST (NSTEMI) - Alto Risco',
    nomeEN: 'High-Risk NSTEMI',
    categoria: 'isquemia_infarto',
    territorio: 'variavel',
    arteriaRelacionada: 'Variavel',

    descricao: `O infarto agudo do miocardio sem supradesnivelamento do segmento ST (IAMSST ou NSTEMI)
    representa um espectro de sindromes coronarianas agudas caracterizado por necrose miocardica
    (troponina elevada) na ausencia de supradesnivelamento persistente de ST. O mecanismo geralmente
    envolve oclusao parcial ou intermitente de arteria coronaria, ou oclusao de vasos menores com
    circulacao colateral. O ECG pode mostrar infradesnivel de ST, inversao de onda T, ou ser normal.
    A estratificacao de risco e fundamental: pacientes de alto risco (instabilidade hemodinamica,
    arritmias, isquemia recorrente, escores GRACE/TIMI elevados) devem ir para catecolorismo precoce
    (< 24h). O NSTEMI e mais comum que o STEMI e tem mortalidade a longo prazo similar ou maior.
    A terapia antitrombotica agressiva e a estrategia invasiva precoce sao os pilares do tratamento.`,

    criteriosECG: {
      criteriosPrincipais: [
        'Infradesnivel de ST >= 0,5mm em >= 2 derivacoes contiguas',
        'Infradesnivel horizontal ou descendente (maior especificidade)',
        'Inversao de onda T >= 1mm em >= 2 derivacoes com R predominante',
        'Inversao de T dinamica (variacao com os sintomas)',
        'ECG pode ser normal ou inespecifico (nao exclui NSTEMI)',
        'Troponina elevada e OBRIGATORIA para diagnostico de NSTEMI (vs. angina instavel)',
      ],
      criteriosSecundarios: [
        'Infradesnivel difuso com supra em aVR sugere obstrucao de TCE ou trivascular',
        'Ondas T invertidas simetricas e profundas = Sindrome de Wellens (ver padrao especifico)',
        'Achatamento ou pseudo-normalizacao de T previamente invertida',
        'Alteracoes dinamicas do ECG sao mais especificas que alteracoes estaticas',
      ],
      derivacoesAfetadas: ['Variavel conforme territorio isquemico'],
      alteracoesReciprocas: [
        'Podem ocorrer dependendo do territorio',
        'Infradesnivel difuso com supra em aVR = obstrucao proximal grave',
      ],
      evolucaoTemporal: [
        'Alteracoes podem ser dinamicas (variam com sintomas)',
        'ECG pode normalizar entre episodios de dor',
        'Persistencia de alteracoes indica isquemia em curso',
      ],
    },

    caracteristicasClinicas: {
      apresentacaoTipica: `Dor toracica em repouso ou aos minimos esforcos, frequentemente prolongada
      (> 20 min), podendo ter carater crescendo (aumentando em frequencia/intensidade). Diferente
      da angina estavel, ocorre em repouso ou com limiares baixos de esforco.`,
      sintomasAssociados: [
        'Dor toracica tipica ou atipica',
        'Dispneia',
        'Sudorese',
        'Nauseas',
        'Sintomas equivalentes em idosos e diabeticos (dispneia, confusao)',
        'Fadiga',
      ],
      fatoresDeRisco: [
        'DAC previa conhecida (aumenta probabilidade)',
        'Diabetes mellitus',
        'Doenca renal cronica',
        'Hipertensao',
        'Dislipidemia',
        'Tabagismo',
        'Idade avancada',
        'Sexo masculino',
      ],
      populacaoAfetada: 'NSTEMI e mais comum que STEMI. Idade media maior. Mulheres e idosos tem apresentacoes mais atipicas.',
      prognostico: `Mortalidade a curto prazo menor que STEMI, mas mortalidade a longo prazo similar
      ou maior. Estratificacao de risco (GRACE, TIMI) orienta timing da estrategia invasiva.
      Alto risco: mortalidade intra-hospitalar 3-8%.`,
    },

    causasEFatoresRisco: [
      'Rotura/erosao de placa com trombose suboclusiva',
      'Espasmo coronariano sobreposto a estenose',
      'Embolizacao distal de material trombotico',
      'Aumento da demanda miocardica (taquicardia, anemia, febre)',
      'Doenca multivascular com circulacao colateral',
      'Obstrucao dinamica (espasmo, disfuncao endotelial)',
    ],

    urgencia: 2,

    tratamentoAgudo: {
      medicamentoso: [
        'AAS 300mg (se nao em uso) + manutencao 100mg/dia',
        'Inibidor de P2Y12: Ticagrelor 180mg + 90mg 12/12h OU Clopidogrel 300-600mg + 75mg/dia',
        'Anticoagulacao: Enoxaparina 1mg/kg 12/12h SC OU Fondaparinux 2,5mg/dia SC (menor sangramento)',
        'Nitroglicerina SL ou IV para alivio de sintomas',
        'Betabloqueador VO se estavel (Metoprolol 25-50mg)',
        'Morfina se dor refrataria (evitar uso rotineiro)',
        'Estatina de alta potencia',
        'IECA/BRA se disfuncao de VE ou diabetes',
        'Inibidores GP IIb/IIIa se alto risco e estrategia invasiva',
      ],
      procedimentos: [
        'CATECOLORISMO: Timing baseado em estratificacao de risco',
        '  - Muito alto risco (choque, arritmias, IC aguda): < 2 horas',
        '  - Alto risco (GRACE > 140, troponina elevada, alteracoes de ECG): < 24 horas',
        '  - Risco intermediario: < 72 horas',
        'ICP ou CABG conforme anatomia coronariana',
        'Monitoracao em unidade coronariana',
      ],
      monitoracao: [
        'Monitoracao continua por 24-48h',
        'ECG seriado (a cada 6-12h ou se mudanca de sintomas)',
        'Troponina seriada (0h, 3h, 6h)',
        'Ecocardiograma para funcao de VE',
        'Estratificacao de risco: GRACE score, TIMI risk score',
      ],
      tempoPortaBalao: 'Estrategia invasiva em < 24h para alto risco; < 72h para risco intermediario',
    },

    criteriosEncaminhamento: {
      imediato: [
        'Instabilidade hemodinamica',
        'Arritmias com repercussao',
        'Dor toracica refrataria',
        'IC aguda',
        'Alteracoes de ECG dinamicas',
      ],
      urgente: [
        'NSTEMI confirmado (troponina elevada)',
        'GRACE score > 140',
        'Alteracoes de ECG em repouso',
        'Diabetes com SCA',
        'Disfuncao renal',
      ],
      eletivo: [
        'Angina instavel com troponina normal e baixo risco',
        'Estratificacao invasiva eletiva se teste provocativo positivo',
      ],
    },

    dicasParaNaoEspecialista: [
      'Troponina elevada com sintomas = NSTEMI ate prova em contrario',
      'ECG normal NAO exclui NSTEMI - confie na troponina',
      'Infradesnivel difuso com supra em aVR = doenca grave (TCE/trivascular) - muito alto risco',
      'Use escores de risco (GRACE, TIMI) para decidir timing do cateterismo',
      'Nao atrase o cateterismo em alto risco - mortalidade aumenta com o tempo',
      'Fondaparinux tem menor risco de sangramento que Enoxaparina',
      'Ticagrelor e Prasugrel sao mais potentes que Clopidogrel',
      'NSTEMI nao e "infarto menor" - mortalidade a longo prazo e alta',
      'Pacientes de muito alto risco devem ser tratados como STEMI (cate imediato)',
    ],

    redFlags: [
      'Instabilidade hemodinamica (hipotensao, choque)',
      'Dor toracica refrataria a tratamento clinico',
      'Arritmias ventriculares (TV/FV)',
      'IC aguda (EAP)',
      'Infradesnivel difuso com supra em aVR (obstrucao proximal grave)',
      'Alteracoes dinamicas do ECG',
      'Troponina muito elevada (> 10x limite superior)',
      'GRACE score > 140',
      'Diabetes, DRC, idade avancada (maior risco)',
    ],

    diagnosticoDiferencial: [
      'Angina instavel (mesma apresentacao, troponina normal)',
      'STEMI (supradesnivelamento persistente de ST)',
      'Miocardite aguda (troponina elevada, sem obstrucao coronaria)',
      'Takotsubo (disfuncao apical, pos-estresse)',
      'Embolia pulmonar (D-dimero, angiotomografia)',
      'Disseccao de aorta (dor lancinante, PA assimetrica)',
      'Pericardite (infradesnivel de PR, supra difuso)',
      'Demanda-oferta (troponina por taquicardia, anemia, sepse)',
    ],

    tags: [
      'NSTEMI',
      'IAMSST',
      'infradesnivel ST',
      'troponina',
      'alto risco',
      'estrategia invasiva',
      'SCA',
      'GRACE',
      'TIMI',
    ],

    citations: [
      {
        refId: 'collet-nsteacs-esc-2020',
        authors: ['Collet JP', 'Thiele H', 'Barbato E', 'et al.'],
        title: '2020 ESC Guidelines for the management of acute coronary syndromes in patients presenting without persistent ST-segment elevation',
        journal: 'European Heart Journal',
        year: 2021,
        volume: '42',
        pages: '1289-1367',
        doi: '10.1093/eurheartj/ehaa575',
        pmid: '32860058',
      },
      {
        refId: 'amsterdam-nstemi-aha-2014',
        authors: ['Amsterdam EA', 'Wenger NK', 'Brindis RG', 'et al.'],
        title: '2014 AHA/ACC Guideline for the Management of Patients With Non-ST-Elevation Acute Coronary Syndromes',
        journal: 'Circulation',
        year: 2014,
        volume: '130',
        pages: 'e344-e426',
        doi: '10.1161/CIR.0000000000000134',
        pmid: '25249585',
      },
      {
        refId: 'roffi-nstemi-esc-2015',
        authors: ['Roffi M', 'Patrono C', 'Collet JP', 'et al.'],
        title: '2015 ESC Guidelines for the management of acute coronary syndromes in patients presenting without persistent ST-segment elevation',
        journal: 'European Heart Journal',
        year: 2016,
        volume: '37',
        pages: '267-315',
        doi: '10.1093/eurheartj/ehv320',
        pmid: '26320110',
      },
    ],

    lastUpdate: '2025-01',
  },

  // =========================================================================
  // 7. ANGINA INSTAVEL (PADRAO DE WELLENS)
  // =========================================================================
  {
    id: 'padrao-wellens',
    nome: 'Angina Instavel - Sindrome de Wellens',
    nomeEN: 'Wellens Syndrome',
    categoria: 'isquemia_infarto',
    territorio: 'anterior',
    arteriaRelacionada: 'DA proximal',

    descricao: `A Sindrome de Wellens e um padrao eletrocardiografico especifico que indica estenose
    critica (> 90%) da arteria descendente anterior (DA) proximal. E considerada um "equivalente
    de STEMI" pois, sem tratamento, evolui para IAM anterior extenso em dias a semanas. O padrao
    e caracterizado por alteracoes de onda T nas derivacoes precordiais (V2-V3, podendo estender
    a V1-V6), tipicamente ENTRE episodios de dor (quando o paciente esta assintomatico). Ha dois
    tipos: Tipo A (mais comum, 75%) com ondas T invertidas profundas e simetricas, e Tipo B (25%)
    com ondas T bifasicas (positiva-negativa). O padrao foi descrito por Wellens em 1982 e sua
    identificacao e crucial pois o teste ergometrico e CONTRAINDICADO (pode precipitar IAM) e
    o tratamento e cateterismo precoce. E classicamente considerado uma forma de angina instavel
    com troponina normal ou minimamente elevada.`,

    criteriosECG: {
      criteriosPrincipais: [
        'Tipo A (75%): Ondas T invertidas profundas e simetricas em V2-V3 (podem estender V1-V6)',
        'Tipo B (25%): Ondas T bifasicas em V2-V3 (positiva-negativa, parecendo check-mark)',
        'Alteracoes presentes com paciente ASSINTOMATICO (entre episodios de dor)',
        'Ausencia de ondas Q patologicas (nao houve necrose significativa)',
        'Ausencia de supradesnivelamento de ST significativo',
        'Progressao normal da onda R preservada',
      ],
      criteriosSecundarios: [
        'Historia de dor toracica tipica recente',
        'Troponina normal ou minimamente elevada',
        'Durante a dor: pode haver elevacao ou nivelamento de ST',
        'Alteracoes de T podem ser dinamicas (variam com episodios de dor)',
      ],
      derivacoesAfetadas: ['V2', 'V3', 'V4', 'V1 (variavel)', 'V5-V6 (variavel)'],
      alteracoesReciprocas: ['Geralmente ausentes ou minimas'],
      evolucaoTemporal: [
        'O padrao aparece APOS episodio de dor (nao durante)',
        'Sem tratamento: evolui para IAM anterior em dias a semanas',
        'Com tratamento (ICP): normalizacao do ECG esperada',
      ],
    },

    caracteristicasClinicas: {
      apresentacaoTipica: `Paciente com historia de dor toracica tipica em repouso, que no momento
      do ECG esta ASSINTOMATICO. A dor foi recente (horas a dias antes). O ECG mostra as alteracoes
      de Wellens no intervalo livre de dor.`,
      sintomasAssociados: [
        'Dor toracica tipica de angina (recente)',
        'Episodios podem ser de curta duracao (minutos)',
        'Dor pode ter aliviado espontaneamente ou com nitrato',
        'Pode haver dispneia associada',
        'No momento do ECG: assintomatico',
      ],
      fatoresDeRisco: [
        'Fatores de risco para DAC',
        'Frequentemente sem historia previa de DAC conhecida',
        'Pode ser a primeira manifestacao de doenca coronariana',
      ],
      populacaoAfetada: 'Pacientes com DAC nao diagnosticada e estenose critica de DA proximal. Mais comum em meia-idade.',
      prognostico: `Sem tratamento: 75% evolui para IAM anterior nas proximas semanas. Com
      cateterismo e ICP precoce: excelente prognostico. O reconhecimento do padrao salva vidas.`,
    },

    causasEFatoresRisco: [
      'Estenose critica (> 90%) da DA proximal',
      'Placa instavel com episodios de suboclusao transitoria',
      'Reperfusao espontanea apos isquemia transitoria',
      'O padrao de Wellens representa "isquemia reperfundida"',
    ],

    urgencia: 2,

    tratamentoAgudo: {
      medicamentoso: [
        'AAS 300mg + manutencao',
        'Inibidor de P2Y12',
        'Anticoagulacao',
        'Betabloqueador',
        'Estatina de alta potencia',
        'Nitroglicerina SL se dor recorrente',
        'IECA/BRA considerados',
      ],
      procedimentos: [
        'CATETERISMO CARDIACO PRECOCE: Indicacao absoluta',
        'ICP da lesao de DA (tratamento definitivo)',
        'CONTRAINDICADO: Teste ergometrico (pode precipitar IAM!)',
        'CONTRAINDICADO: Alta hospitalar sem cateterismo',
        'Monitoracao em unidade coronariana',
      ],
      monitoracao: [
        'Monitoracao continua ate cateterismo',
        'ECG seriado',
        'Troponina seriada (pode elevar se evolucao para IAM)',
        'Vigilancia para sintomas recorrentes',
      ],
      contraindicacoes: [
        'TESTE ERGOMETRICO: Absolutamente contraindicado - pode precipitar IAM/morte',
        'ALTA HOSPITALAR sem cateterismo: Contraindicado',
      ],
      tempoPortaBalao: 'Cateterismo precoce (< 24-72h); mais urgente se sintomas recorrentes',
    },

    criteriosEncaminhamento: {
      imediato: [
        'Dor toracica recorrente ou refrataria',
        'Instabilidade hemodinamica',
        'Elevacao de troponina (evolucao para IAM)',
        'Arritmias',
      ],
      urgente: [
        'Todos os pacientes com padrao de Wellens devem ser internados',
        'Cateterismo em < 24-72h',
        'Centro com capacidade de ICP',
      ],
    },

    dicasParaNaoEspecialista: [
      'Ondas T invertidas profundas e simetricas em V2-V3 = pensar em Wellens',
      'O paciente esta ASSINTOMATICO quando voce ve o padrao (e ENTRE episodios de dor)',
      'NUNCA faca teste ergometrico em suspeita de Wellens - pode precipitar IAM!',
      'NUNCA de alta sem cateterismo - o paciente pode infarta em dias',
      'Tipo A (T invertidas) e mais comum que Tipo B (T bifasicas)',
      'Troponina normal nao exclui Wellens - pode ser pre-infarto',
      'Se houver ondas Q ou supra de ST, nao e Wellens - e IAM em evolucao',
      'Wellens e um "aviso" de que a DA vai ocluir - trate urgentemente',
    ],

    redFlags: [
      'Dor toracica recorrente (isquemia em curso)',
      'Elevacao de troponina (evolucao para IAM)',
      'Aparecimento de ondas Q (necrose)',
      'Aparecimento de supradesnivel de ST (oclusao)',
      'Arritmias ventriculares',
      'Instabilidade hemodinamica',
      'Nao reconhecer o padrao e liberar paciente',
    ],

    diagnosticoDiferencial: [
      'IAM anterior (ondas Q, supra de ST, troponina francamente elevada)',
      'Cardiomiopatia hipertrofica apical (Yamaguchi - T invertidas profundas, mas difusas)',
      'Sindrome de QT longo (T invertidas com QTc prolongado)',
      'Hemorragia intracraniana (T cerebrais - invertidas e profundas)',
      'Embolia pulmonar (S1Q3T3, T invertidas em V1-V3 podem ocorrer)',
      'Miocardite (alteracoes de T, troponina elevada, sem obstrucao)',
      'Memoria cardiaca pos-taquicardia ou pos-pace',
    ],

    tags: [
      'Wellens',
      'angina instavel',
      'DA proximal',
      'onda T invertida',
      'T bifasica',
      'pre-infarto',
      'contraindicacao ergometria',
      'LAD widow maker',
    ],

    citations: [
      {
        refId: 'wellens-original-1982',
        authors: ['de Zwaan C', 'Bar FW', 'Wellens HJ'],
        title: 'Characteristic electrocardiographic pattern indicating a critical stenosis high in left anterior descending coronary artery in patients admitted because of impending myocardial infarction',
        journal: 'American Heart Journal',
        year: 1982,
        volume: '103',
        pages: '730-736',
        doi: '10.1016/0002-8703(82)90480-X',
        pmid: '6121481',
      },
      {
        refId: 'rhinehardt-wellens-2002',
        authors: ['Rhinehardt J', 'Brady WJ', 'Perron AD', 'Mattu A'],
        title: 'Electrocardiographic manifestations of Wellens\' syndrome',
        journal: 'American Journal of Emergency Medicine',
        year: 2002,
        volume: '20',
        pages: '638-643',
        doi: '10.1053/ajem.2002.34800',
        pmid: '12442245',
      },
      {
        refId: 'tandy-wellens-1999',
        authors: ['Tandy TK', 'Bottomy DP', 'Lewis JG'],
        title: 'Wellens\' syndrome',
        journal: 'Annals of Emergency Medicine',
        year: 1999,
        volume: '33',
        pages: '347-351',
        doi: '10.1016/S0196-0644(99)70373-5',
        pmid: '10036351',
      },
    ],

    lastUpdate: '2025-01',
  },

  // =========================================================================
  // 8. ALTERACOES ISQUEMICAS CRONICAS
  // =========================================================================
  {
    id: 'alteracoes-isquemicas-cronicas',
    nome: 'Alteracoes Isquemicas Cronicas',
    nomeEN: 'Chronic Ischemic Changes',
    categoria: 'isquemia_infarto',
    territorio: 'variavel',
    arteriaRelacionada: 'Variavel',

    descricao: `As alteracoes isquemicas cronicas no ECG representam o espectro de achados
    eletrocardiograficos encontrados em pacientes com doenca arterial coronariana (DAC) estabelecida,
    infartos previos ou isquemia miocardica cronica. Incluem ondas Q patologicas (indicando areas
    de necrose/fibrose), alteracoes de ST-T persistentes, baixa voltagem em areas infartadas, e
    disturbios de conducao secundarios a isquemia. O reconhecimento destes padroes e importante
    para: (1) identificar pacientes com DAC conhecida/previa, (2) distinguir alteracoes antigas
    de novas em pacientes com suspeita de SCA, (3) estimar a extensao de doenca previa, e (4)
    estratificar risco para eventos futuros. A comparacao com ECGs previos e fundamental para
    determinar se alteracoes sao novas ou cronicas.`,

    criteriosECG: {
      criteriosPrincipais: [
        'Ondas Q patologicas: duracao > 40ms ou amplitude > 25% da onda R seguinte',
        'Complexos QS (ausencia de onda R) em territorio infartado',
        'Perda de progressao de R em derivacoes precordiais',
        'Inversao de T cronica (persistente por semanas/meses pos-IAM)',
        'Infradesnivel de ST cronico (pode indicar isquemia subendocardica)',
        'Fragmentacao do QRS (indicador de cicatriz)',
      ],
      criteriosSecundarios: [
        'Baixa voltagem nas derivacoes correspondentes a area infartada',
        'Disturbios de conducao: BRE, BRD, HBAE (podem ser secundarios a isquemia)',
        'Alteracoes de repolarizacao secundarias',
        'Arritmias ventriculares originadas de areas cicatriciais',
        'Aneurisma de VE: persistencia de supradesnivel de ST semanas apos IAM',
      ],
      derivacoesAfetadas: ['Variavel conforme territorio(s) infartado(s)'],
      alteracoesReciprocas: ['Geralmente ausentes em alteracoes cronicas estabelecidas'],
      evolucaoTemporal: [
        'Ondas Q: surgem em 6-12h pos-IAM, podem persistir indefinidamente ou regredir',
        'Inversao de T: comum na fase subaguda, pode normalizar em meses',
        'Supradesnivel persistente: sugere aneurisma ou discinesia de VE',
        'Estabilidade das alteracoes ao longo de semanas/meses caracteriza cronicidade',
      ],
    },

    caracteristicasClinicas: {
      apresentacaoTipica: `Paciente com historia de DAC ou IAM previo, frequentemente assintomatico
      no momento. O ECG mostra alteracoes estabelecidas que refletem eventos isquemicos anteriores.
      Pode apresentar angina estavel ao esforco se houver doenca residual.`,
      sintomasAssociados: [
        'Pode ser assintomatico (achado incidental)',
        'Angina estavel (dor ao esforco, alivia com repouso)',
        'Dispneia aos esforcos (se disfuncao de VE)',
        'Palpitacoes (arritmias de area cicatricial)',
        'Fadiga',
        'Reduzida tolerancia ao exercicio',
      ],
      fatoresDeRisco: [
        'IAM previo (principal determinante)',
        'DAC documentada',
        'Intervencao coronaria previa (ICP ou CABG)',
        'Fatores de risco convencionais',
        'Disfuncao de VE estabelecida',
      ],
      populacaoAfetada: 'Pacientes com DAC previa, IAM antigo, ou doenca coronariana cronica. Prevalencia aumenta com idade.',
      prognostico: `Depende da extensao da doenca e funcao ventricular residual. Pacientes com
      ondas Q extensas e FEVE reduzida tem maior risco de eventos. Prevencao secundaria agressiva
      melhora o prognostico.`,
    },

    causasEFatoresRisco: [
      'IAM previo (ondas Q, alteracoes de repolarizacao)',
      'DAC multivascular cronica',
      'Cardiomiopatia isquemica',
      'Isquemia subendocardica cronica (infradesnivel de ST)',
      'Aneurisma de VE pos-IAM',
      'Fibrose miocardica',
    ],

    urgencia: 4,

    tratamentoAgudo: {
      medicamentoso: [
        'Prevencao secundaria padrao para DAC:',
        'AAS 100mg/dia (ou clopidogrel se intolerancia)',
        'Estatina de alta potencia (Atorvastatina 40-80mg ou Rosuvastatina 20-40mg)',
        'Betabloqueador se FEVE reduzida ou angina',
        'IECA/BRA se FEVE reduzida, diabetes ou hipertensao',
        'Controle de fatores de risco (PA < 130/80, LDL < 55, HbA1c < 7%)',
        'Antianginosos se angina estavel (nitratos, BCC)',
      ],
      procedimentos: [
        'Nao ha urgencia se alteracoes cronicas estaveis',
        'Estratificacao de risco: teste de isquemia se indicado',
        'Cateterismo se angina refrataria ou teste de alto risco',
        'Revascularizacao (ICP ou CABG) conforme indicacao clinica',
        'CDI se FEVE <= 35% e classe funcional NYHA II-III',
      ],
      monitoracao: [
        'Ecocardiograma periodico se disfuncao de VE',
        'Teste de isquemia se sintomas novos ou piora',
        'ECG comparativo para detectar novas alteracoes',
        'Controle de fatores de risco laboratorial',
      ],
      tempoPortaBalao: 'Nao aplicavel para alteracoes cronicas estaveis',
    },

    criteriosEncaminhamento: {
      imediato: [
        'Alteracoes NOVAS no ECG (comparar com previos)',
        'Sintomas sugestivos de SCA (dor em repouso, angina instavel)',
        'Piora da classe funcional',
        'Arritmias sintomaticas',
      ],
      urgente: [
        'Angina progressiva (angina instavel)',
        'Nova disfuncao de VE',
        'Arritmias ventriculares complexas',
        'Sincope em paciente com DAC',
      ],
      eletivo: [
        'Angina estavel para avaliacao de revascularizacao',
        'Estratificacao de risco periodica',
        'Ajuste de terapia antianginosa',
        'Avaliacao para CDI se FEVE reduzida',
      ],
    },

    dicasParaNaoEspecialista: [
      'SEMPRE compare com ECGs previos para distinguir novo de antigo',
      'Ondas Q antigas nao requerem tratamento de emergencia se paciente estavel',
      'Novo sintoma + ECG "igual ao de sempre" ainda pode ser SCA - observe com troponina',
      'Ondas Q sem historia de IAM: perguntar sobre infarto silencioso (comum em diabeticos)',
      'Aneurisma de VE: supra persistente semanas apos IAM - nao e IAM agudo',
      'Fragmentacao de QRS indica cicatriz e maior risco arritmico',
      'Prevencao secundaria agressiva e fundamental - LDL < 55 mg/dL',
      'Pacientes com DAC previa tem alto risco - estratifique regularmente',
    ],

    redFlags: [
      'NOVA alteracao de ECG (vs. ECG previo)',
      'Sintomas sugestivos de SCA sobrepostos a alteracoes cronicas',
      'Troponina elevada (mesmo com ECG "igual ao previo")',
      'Instabilidade hemodinamica',
      'Arritmias ventriculares sustentadas',
      'Piora subita da funcao de VE',
      'Angina em repouso ou progressiva',
      'Dispneia nova ou piorando',
    ],

    diagnosticoDiferencial: [
      'IAM agudo (troponina elevada, sintomas agudos, alteracoes novas)',
      'Cardiomiopatia dilatada (pode ter ondas Q sem IAM)',
      'Cardiomiopatia hipertrofica (ondas Q "de septal")',
      'WPW (pseudo-Q por delta wave negativa)',
      'BRE (pode mimetizar infarto)',
      'Sarcoidose cardiaca (pode ter ondas Q)',
      'Amiloidose cardiaca (baixa voltagem)',
    ],

    tags: [
      'DAC cronica',
      'IAM previo',
      'onda Q',
      'cicatriz miocardica',
      'prevencao secundaria',
      'aneurisma',
      'isquemia cronica',
      'comparacao ECG',
    ],

    citations: [
      {
        refId: 'thygesen-mi-definition-2018',
        authors: ['Thygesen K', 'Alpert JS', 'Jaffe AS', 'et al.'],
        title: 'Fourth Universal Definition of Myocardial Infarction (2018)',
        journal: 'Circulation',
        year: 2018,
        volume: '138',
        pages: 'e618-e651',
        doi: '10.1161/CIR.0000000000000617',
        pmid: '30571511',
      },
      {
        refId: 'knuuti-cad-esc-2019',
        authors: ['Knuuti J', 'Wijns W', 'Saraste A', 'et al.'],
        title: '2019 ESC Guidelines for the diagnosis and management of chronic coronary syndromes',
        journal: 'European Heart Journal',
        year: 2020,
        volume: '41',
        pages: '407-477',
        doi: '10.1093/eurheartj/ehz425',
        pmid: '31504439',
      },
      {
        refId: 'mach-lipids-esc-2019',
        authors: ['Mach F', 'Baigent C', 'Catapano AL', 'et al.'],
        title: '2019 ESC/EAS Guidelines for the management of dyslipidaemias: lipid modification to reduce cardiovascular risk',
        journal: 'European Heart Journal',
        year: 2020,
        volume: '41',
        pages: '111-188',
        doi: '10.1093/eurheartj/ehz455',
        pmid: '31504418',
      },
      {
        refId: 'das-fragmented-qrs-2006',
        authors: ['Das MK', 'Khan B', 'Jacob S', 'et al.'],
        title: 'Significance of a fragmented QRS complex versus a Q wave in patients with coronary artery disease',
        journal: 'Circulation',
        year: 2006,
        volume: '113',
        pages: '2495-2501',
        doi: '10.1161/CIRCULATIONAHA.105.595892',
        pmid: '16717150',
      },
    ],

    lastUpdate: '2025-01',
  },
];

// =============================================================================
// FUNCOES AUXILIARES
// =============================================================================

/**
 * Busca padrao por ID
 */
export function getPatternById(id: string): ECGPattern | undefined {
  return isquemiaInfarto.find((p) => p.id === id);
}

/**
 * Busca padroes por territorio
 */
export function getPatternsByTerritorio(territorio: TerritorioMiocardico): ECGPattern[] {
  return isquemiaInfarto.filter((p) => p.territorio === territorio);
}

/**
 * Busca padroes por nivel de urgencia
 */
export function getPatternsByUrgencia(urgencia: NivelUrgencia): ECGPattern[] {
  return isquemiaInfarto.filter((p) => p.urgencia === urgencia);
}

/**
 * Busca padroes por arteria relacionada
 */
export function getPatternsByArteria(arteria: ArteriaCoronariaRelacionada): ECGPattern[] {
  return isquemiaInfarto.filter((p) => p.arteriaRelacionada === arteria);
}

/**
 * Retorna padroes de emergencia (urgencia = 1)
 */
export function getPadroesEmergencia(): ECGPattern[] {
  return isquemiaInfarto.filter((p) => p.urgencia === 1);
}

/**
 * Busca padroes por tag
 */
export function getPatternsByTag(tag: string): ECGPattern[] {
  const lowerTag = tag.toLowerCase();
  return isquemiaInfarto.filter((p) => p.tags.some((t) => t.toLowerCase().includes(lowerTag)));
}

/**
 * Busca de texto livre
 */
export function searchPatterns(query: string): ECGPattern[] {
  const lowerQuery = query.toLowerCase();
  return isquemiaInfarto.filter(
    (p) =>
      p.nome.toLowerCase().includes(lowerQuery) ||
      p.nomeEN.toLowerCase().includes(lowerQuery) ||
      p.descricao.toLowerCase().includes(lowerQuery) ||
      p.tags.some((t) => t.toLowerCase().includes(lowerQuery))
  );
}

export default isquemiaInfarto;
