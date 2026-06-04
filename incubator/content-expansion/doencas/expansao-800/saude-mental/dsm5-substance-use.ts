/**
 * TRANSTORNOS POR USO DE SUBSTANCIAS - DSM-5
 * ==========================================
 * Classificacao e manejo conforme DSM-5 e protocolos brasileiros
 *
 * Referencias principais:
 * - DSM-5 (APA, 2013)
 * - Portaria MS 3.088/2011 - RAPS (Rede de Atencao Psicossocial)
 * - Protocolo CAPS-AD (Ministerio da Saude)
 * - Diretrizes ABEAD (Associacao Brasileira de Estudos do Alcool e outras Drogas)
 */

import type { DoencaMental } from '@/lib/types/doenca-mental';
import { DSM5_CATEGORIES } from '@/lib/types/dsm5';

/**
 * Transtornos por Uso de Substancias - DSM-5
 *
 * DSM-5 unificou "abuso" e "dependencia" em "Transtorno por Uso de Substancia"
 * com especificadores de gravidade baseados no numero de criterios atendidos:
 * - Leve: 2-3 criterios
 * - Moderado: 4-5 criterios
 * - Grave: 6+ criterios
 */
export const transtornosSubstancia: Array<Partial<DoencaMental> & {
  id: string;
  titulo: string;
  categoria: 'saude_mental';
  cid10: string[];
  ciap2: string[]
}> = [
  // ============================================================================
  // 1. TRANSTORNO POR USO DE ALCOOL
  // ============================================================================
  {
    id: 'transtorno-uso-alcool',
    titulo: 'Transtorno por Uso de Alcool',
    categoria: 'saude_mental',
    cid10: ['F10.1', 'F10.2'],
    cid11: ['6C40.0', '6C40.1', '6C40.2'],
    ciap2: ['P15', 'P16'],
    snomedCT: '7200002', // Alcoholism (disorder)
    doid: 'DOID:0050741',
    meshId: 'D000437',
    umlsCui: 'C0001973',
    dsm5: {
      code: '303.90', // Alcohol Use Disorder, Severe
      codeAlternative: 'F10.20',
      category: DSM5_CATEGORIES.SUBSTANCE,
      diagnosticCriteria: {
        code: '303.90',
        name: 'Alcohol Use Disorder',
        category: DSM5_CATEGORIES.SUBSTANCE,
        criteria: [
          {
            letter: 'A',
            text: 'Padrao problematico de uso de alcool, levando a comprometimento ou sofrimento clinicamente significativo, manifestado por pelo menos 2 dos seguintes criterios em um periodo de 12 meses:',
          },
          {
            letter: '1',
            text: 'Alcool frequentemente consumido em quantidades maiores ou por periodo mais longo do que o pretendido',
          },
          {
            letter: '2',
            text: 'Desejo persistente ou esforcos malsucedidos para reduzir ou controlar o uso de alcool',
          },
          {
            letter: '3',
            text: 'Muito tempo gasto em atividades necessarias para obter alcool, usa-lo ou recuperar-se de seus efeitos',
          },
          {
            letter: '4',
            text: 'Fissura ou forte desejo de usar alcool',
          },
          {
            letter: '5',
            text: 'Uso recorrente de alcool resultando em fracasso em cumprir obrigacoes importantes no trabalho, escola ou em casa',
          },
          {
            letter: '6',
            text: 'Uso continuado de alcool apesar de problemas sociais ou interpessoais persistentes ou recorrentes',
          },
          {
            letter: '7',
            text: 'Importantes atividades sociais, ocupacionais ou recreativas sao abandonadas ou reduzidas devido ao uso de alcool',
          },
          {
            letter: '8',
            text: 'Uso recorrente de alcool em situacoes nas quais isso representa perigo para a integridade fisica',
          },
          {
            letter: '9',
            text: 'O uso de alcool e mantido apesar da consciencia de ter um problema fisico ou psicologico persistente ou recorrente',
          },
          {
            letter: '10',
            text: 'Tolerancia, definida por: (a) necessidade de quantidades progressivamente maiores para obter intoxicacao ou efeito desejado; ou (b) efeito acentuadamente menor com o uso continuado da mesma quantidade',
          },
          {
            letter: '11',
            text: 'Abstinencia, manifestada por: (a) sindrome de abstinencia caracteristica; ou (b) alcool e consumido para aliviar ou evitar sintomas de abstinencia',
          },
        ],
        specifiers: {
          severity: ['Leve (2-3 criterios)', 'Moderado (4-5 criterios)', 'Grave (6+ criterios)'],
          remission: ['Em remissao inicial (3-12 meses)', 'Em remissao sustentada (12+ meses)'],
        },
        notes: 'A gravidade e determinada pelo numero de criterios atendidos. O especificador "Em ambiente controlado" pode ser adicionado quando aplicavel.',
      },
      specifiers: {
        severity: ['Mild', 'Moderate', 'Severe'],
        remission: ['Early Remission', 'Sustained Remission'],
      },
    },
    quickView: {
      definicao: 'Padrao problematico de uso de alcool levando a comprometimento ou sofrimento clinicamente significativo, com tolerancia, abstinencia e perda de controle sobre o consumo.',
      criteriosDiagnosticos: [
        'Pelo menos 2 de 11 criterios em 12 meses',
        'Criterios incluem: perda de controle, fissura, tolerancia, abstinencia',
        'Prejuizo em areas importantes da vida (trabalho, social, saude)',
        'Gravidade: Leve (2-3), Moderado (4-5), Grave (6+)',
      ],
      classificacaoRisco: [
        {
          nivel: 'baixo',
          criterios: ['AUDIT 8-15', 'Uso de risco sem dependencia'],
          conduta: 'Intervencao breve, aconselhamento na APS',
        },
        {
          nivel: 'moderado',
          criterios: ['AUDIT 16-19', 'Uso nocivo com prejuizos'],
          conduta: 'CAPS-AD, psicoterapia, considerar farmacoterapia',
        },
        {
          nivel: 'alto',
          criterios: ['AUDIT 20-40', 'Dependencia grave', 'Historia de delirium tremens'],
          conduta: 'CAPS-AD III, desintoxicacao supervisionada, internacao se necessario',
        },
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Intervencao Breve (IB) - 5 As: Avalie, Aconselhe, Acorde, Auxilie, Acompanhe',
          'Terapia Cognitivo-Comportamental (TCC)',
          'Entrevista Motivacional',
          'Grupos de Mutua Ajuda: AA (Alcoolicos Anonimos)',
          'Matriciamento com CAPS-AD',
        ],
        farmacologico: [
          'Dissulfiram 250-500mg/dia (aversivo - efeito antabuse)',
          'Naltrexona 50mg/dia (anti-craving, reduz recompensa)',
          'Acamprosato 666mg 3x/dia (estabiliza neurotransmissao)',
          'Topiramato 100-300mg/dia (off-label, reduz consumo)',
          'Tiamina (Vit B1) 300mg/dia (prevencao de Wernicke-Korsakoff)',
        ],
      },
      redFlags: [
        'Historia de convulsoes por abstinencia',
        'Historia de delirium tremens',
        'Comorbidades clinicas graves (cirrose, pancreatite)',
        'Ideacao suicida',
        'Sindrome de Wernicke-Korsakoff',
        'Abstinencia grave (tremores, sudorese, taquicardia)',
      ],
      examesIniciais: [
        'AUDIT (Alcohol Use Disorders Identification Test)',
        'GGT, AST, ALT, VCM (marcadores de consumo)',
        'Hemograma completo',
        'Funcao hepatica completa',
        'Glicemia de jejum',
        'Coagulograma',
      ],
      metasTerapeuticas: [
        'Abstinencia ou reducao de danos',
        'Prevencao de recaidas',
        'Melhora da qualidade de vida',
        'Tratamento de comorbidades',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'AUDIT',
        description: 'Alcohol Use Disorders Identification Test: 10 itens, pontuacao 0-40. Desenvolvido pela OMS para rastreamento de uso problematico de alcool.',
        cutoff: '8-15: uso de risco; 16-19: uso nocivo; 20-40: provavel dependencia',
        reference: 'Babor et al., 2001 - WHO',
      },
      {
        name: 'CAGE',
        description: 'Questionario de 4 perguntas para triagem rapida: Cut down, Annoyed, Guilty, Eye-opener.',
        cutoff: '2 ou mais respostas positivas: suspeita de dependencia',
        reference: 'Ewing, 1984',
      },
      {
        name: 'ASSIST',
        description: 'Alcohol, Smoking and Substance Involvement Screening Test: Desenvolvido pela OMS, avalia multiplas substancias.',
        cutoff: 'Alcool: 0-10 baixo risco; 11-26 risco moderado; 27+ alto risco',
        reference: 'WHO ASSIST Working Group, 2002',
      },
      {
        name: 'CIWA-Ar',
        description: 'Clinical Institute Withdrawal Assessment for Alcohol - Revised: Avalia gravidade da sindrome de abstinencia alcolica.',
        cutoff: '0-9: leve; 10-15: moderada; 16-20: moderada-grave; >20: grave',
        reference: 'Sullivan et al., 1989',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TCC + Entrevista Motivacional',
        frequencia: 'Semanal a quinzenal',
        duracao: '12-24 sessoes',
      },
      farmacoterapia: {
        classe: 'Medicamentos anti-craving e aversivos',
        medicamentos: ['naltrexona', 'acamprosato', 'dissulfiram', 'topiramato'],
        doseInicial: 'Naltrexona 25mg/dia, aumentar para 50mg/dia',
        titulacao: 'Avaliar tolerabilidade nas primeiras 2 semanas',
        duracao: 'Minimo 12 meses, idealmente longo prazo',
      },
      outros: [
        'Tiamina 300mg/dia (prevencao de encefalopatia)',
        'Suplementacao vitaminica (B12, acido folico)',
        'Grupos de mutua ajuda (AA)',
      ],
    },
    criteriosEncaminhamento: [
      'Dependencia grave (AUDIT >= 20)',
      'Historia de delirium tremens ou convulsoes',
      'Comorbidades psiquiatricas (depressao, ansiedade, psicose)',
      'Comorbidades clinicas graves (hepatopatia, pancreatite)',
      'Falha no tratamento ambulatorial',
      'Necessidade de desintoxicacao supervisionada',
      'Ideacao suicida',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: true,
      riscoAutolesao: true,
      criterios: [
        'Sindrome de abstinencia grave (CIWA-Ar > 20)',
        'Delirium tremens (confusao, alucinacoes, febre, instabilidade autonomica)',
        'Convulsoes',
        'Intoxicacao aguda grave',
        'Ideacao suicida ou homicida',
      ],
    },
    comorbidadesComuns: [
      'transtorno-depressivo-maior',
      'transtorno-ansiedade-generalizada',
      'transtorno-bipolar-i',
      'transtorno-personalidade-antisocial',
      'transtorno-uso-tabaco',
    ],
    tags: ['alcool', 'alcoolismo', 'dependencia', 'audit', 'abstinencia', 'caps-ad', 'dsm5', 'substancias'],
  },

  // ============================================================================
  // 2. TRANSTORNO POR USO DE TABACO
  // ============================================================================
  {
    id: 'transtorno-uso-tabaco',
    titulo: 'Transtorno por Uso de Tabaco',
    categoria: 'saude_mental',
    cid10: ['F17.2'],
    cid11: ['6C4A.2'],
    ciap2: ['P17'],
    snomedCT: '56294008', // Nicotine dependence (disorder)
    doid: 'DOID:0050742',
    meshId: 'D014029',
    umlsCui: 'C0028043',
    dsm5: {
      code: '305.1',
      codeAlternative: 'F17.200',
      category: DSM5_CATEGORIES.SUBSTANCE,
      diagnosticCriteria: {
        code: '305.1',
        name: 'Tobacco Use Disorder',
        category: DSM5_CATEGORIES.SUBSTANCE,
        criteria: [
          {
            letter: 'A',
            text: 'Padrao problematico de uso de tabaco, levando a comprometimento ou sofrimento clinicamente significativo, manifestado por pelo menos 2 dos seguintes criterios em um periodo de 12 meses:',
          },
          {
            letter: '1',
            text: 'Tabaco frequentemente consumido em quantidades maiores ou por periodo mais longo do que o pretendido',
          },
          {
            letter: '2',
            text: 'Desejo persistente ou esforcos malsucedidos para reduzir ou controlar o uso de tabaco',
          },
          {
            letter: '3',
            text: 'Muito tempo gasto em atividades necessarias para obter ou usar tabaco',
          },
          {
            letter: '4',
            text: 'Fissura ou forte desejo de usar tabaco',
          },
          {
            letter: '5',
            text: 'Uso recorrente de tabaco resultando em fracasso em cumprir obrigacoes importantes',
          },
          {
            letter: '6',
            text: 'Uso continuado de tabaco apesar de problemas sociais ou interpessoais persistentes',
          },
          {
            letter: '7',
            text: 'Atividades sociais, ocupacionais ou recreativas importantes sao abandonadas ou reduzidas',
          },
          {
            letter: '8',
            text: 'Uso recorrente de tabaco em situacoes nas quais e fisicamente perigoso',
          },
          {
            letter: '9',
            text: 'Uso mantido apesar da consciencia de ter problema fisico ou psicologico persistente',
          },
          {
            letter: '10',
            text: 'Tolerancia: necessidade de quantidades maiores ou efeito diminuido com mesma quantidade',
          },
          {
            letter: '11',
            text: 'Abstinencia: sindrome caracteristica ou uso para aliviar/evitar sintomas',
          },
        ],
        specifiers: {
          severity: ['Leve (2-3 criterios)', 'Moderado (4-5 criterios)', 'Grave (6+ criterios)'],
          remission: ['Em remissao inicial', 'Em remissao sustentada'],
        },
      },
      specifiers: {
        severity: ['Mild', 'Moderate', 'Severe'],
        remission: ['Early Remission', 'Sustained Remission'],
      },
    },
    quickView: {
      definicao: 'Padrao problematico de uso de tabaco levando a dependencia de nicotina, com tolerancia, abstinencia e dificuldade persistente em parar de fumar apesar dos danos a saude.',
      criteriosDiagnosticos: [
        'Pelo menos 2 de 11 criterios em 12 meses',
        'Tolerancia (necessidade de fumar mais)',
        'Abstinencia (irritabilidade, ansiedade, fissura ao parar)',
        'Tentativas repetidas e malsucedidas de parar',
        'Uso continuado apesar de doencas relacionadas',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Aconselhamento breve (metodo dos 5 As)',
          'Terapia Cognitivo-Comportamental',
          'Entrevista Motivacional',
          'Linha telefonica Disque Saude 136 - opcao tabagismo',
          'Programa Nacional de Controle do Tabagismo (PNCT)',
        ],
        farmacologico: [
          'Terapia de Reposicao de Nicotina (TRN): adesivo 21/14/7mg, goma 2/4mg, pastilha',
          'Bupropiona 150mg 2x/dia (iniciar 1-2 semanas antes da data de parar)',
          'Vareniclina 0,5mg 1x/dia, aumentar para 1mg 2x/dia (iniciar 1 semana antes)',
          'Nortriptilina 75-100mg/dia (segunda linha)',
          'Clonidina 0,1-0,2mg/dia (segunda linha)',
        ],
      },
      redFlags: [
        'DPOC grave ou em exacerbacao',
        'Doenca cardiovascular ativa',
        'Cancer em tratamento',
        'Gestacao (priorizar TRN)',
        'Comorbidade psiquiatrica grave',
        'Historico de convulsoes (evitar bupropiona)',
      ],
      examesIniciais: [
        'Teste de Fagerstrom (avalia dependencia)',
        'Espirometria (se sintomas respiratorios)',
        'Cotinina urinaria (confirmacao de abstinencia)',
        'Monoximetria (CO expirado)',
      ],
      metasTerapeuticas: [
        'Cessacao completa do tabagismo',
        'Reducao de danos se cessacao nao for possivel',
        'Prevencao de recaidas',
        'Tratamento de comorbidades relacionadas ao tabaco',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'Teste de Fagerstrom',
        description: 'Fagerstrom Test for Nicotine Dependence (FTND): 6 itens, pontuacao 0-10. Avalia nivel de dependencia de nicotina.',
        cutoff: '0-2: muito baixa; 3-4: baixa; 5: media; 6-7: alta; 8-10: muito alta',
        reference: 'Heatherton et al., 1991',
      },
      {
        name: 'Questionario de Tolerancia de Fagerstrom (QTF)',
        description: 'Versao simplificada com 2 questoes: tempo ate primeiro cigarro e quantidade diaria.',
        cutoff: 'Primeiro cigarro em ate 5 min + >20 cigarros/dia = alta dependencia',
        reference: 'Fagerstrom, 1978',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TCC + Entrevista Motivacional',
        frequencia: 'Semanal por 4-8 semanas, depois quinzenal',
        duracao: '4-6 meses de acompanhamento',
      },
      farmacoterapia: {
        classe: 'Terapia de Reposicao de Nicotina e medicamentos de apoio',
        medicamentos: ['nicotina-adesivo', 'nicotina-goma', 'bupropiona', 'vareniclina'],
        doseInicial: 'Adesivo 21mg/dia (>10 cig/dia); Bupropiona 150mg/dia; Vareniclina 0,5mg/dia',
        titulacao: 'Adesivo: 21mg 4sem, 14mg 2sem, 7mg 2sem; Vareniclina: aumentar em 1 semana',
        duracao: '8-12 semanas (TRN/Vareniclina), 7-12 semanas (Bupropiona)',
      },
    },
    criteriosEncaminhamento: [
      'Dependencia muito alta (Fagerstrom >= 8)',
      'Falha em multiplas tentativas de cessacao',
      'Comorbidade psiquiatrica (depressao, ansiedade)',
      'Gestacao (acompanhamento especializado)',
      'Doencas graves relacionadas ao tabaco',
      'Uso concomitante de outras substancias',
    ],
    urgencia: {
      riscosuicida: false,
      riscoAgressao: false,
      riscoAutolesao: false,
      criterios: [
        'Abstinencia grave com ansiedade intensa',
        'Exacerbacao de comorbidade psiquiatrica',
        'Ideacao suicida (rara, mais comum com vareniclina)',
      ],
    },
    comorbidadesComuns: [
      'dpoc',
      'doenca-coronariana',
      'transtorno-depressivo-maior',
      'transtorno-ansiedade-generalizada',
      'transtorno-uso-alcool',
    ],
    tags: ['tabaco', 'tabagismo', 'nicotina', 'fagerstrom', 'trn', 'bupropiona', 'vareniclina', 'dsm5'],
  },

  // ============================================================================
  // 3. TRANSTORNO POR USO DE OPIOIDES
  // ============================================================================
  {
    id: 'transtorno-uso-opioides',
    titulo: 'Transtorno por Uso de Opioides',
    categoria: 'saude_mental',
    cid10: ['F11.1', 'F11.2'],
    cid11: ['6C43.0', '6C43.1', '6C43.2'],
    ciap2: ['P19'],
    snomedCT: '75544000', // Opioid dependence (disorder)
    doid: 'DOID:0050744',
    meshId: 'D009293',
    umlsCui: 'C0029095',
    dsm5: {
      code: '304.00',
      codeAlternative: 'F11.20',
      category: DSM5_CATEGORIES.SUBSTANCE,
      diagnosticCriteria: {
        code: '304.00',
        name: 'Opioid Use Disorder',
        category: DSM5_CATEGORIES.SUBSTANCE,
        criteria: [
          {
            letter: 'A',
            text: 'Padrao problematico de uso de opioides, levando a comprometimento ou sofrimento clinicamente significativo, manifestado por pelo menos 2 dos seguintes criterios em 12 meses:',
          },
          {
            letter: '1',
            text: 'Opioides frequentemente consumidos em quantidades maiores ou por periodo mais longo do que o pretendido',
          },
          {
            letter: '2',
            text: 'Desejo persistente ou esforcos malsucedidos para reduzir ou controlar o uso',
          },
          {
            letter: '3',
            text: 'Muito tempo gasto em atividades para obter, usar ou recuperar-se dos efeitos',
          },
          {
            letter: '4',
            text: 'Fissura ou forte desejo de usar opioides',
          },
          {
            letter: '5',
            text: 'Uso recorrente resultando em fracasso em cumprir obrigacoes',
          },
          {
            letter: '6',
            text: 'Uso continuado apesar de problemas sociais ou interpessoais',
          },
          {
            letter: '7',
            text: 'Atividades importantes abandonadas ou reduzidas',
          },
          {
            letter: '8',
            text: 'Uso recorrente em situacoes fisicamente perigosas',
          },
          {
            letter: '9',
            text: 'Uso mantido apesar de problema fisico ou psicologico persistente',
          },
          {
            letter: '10',
            text: 'Tolerancia (necessidade de doses maiores ou efeito diminuido)',
          },
          {
            letter: '11',
            text: 'Abstinencia (sindrome caracteristica ou uso para aliviar sintomas)',
          },
        ],
        specifiers: {
          severity: ['Leve (2-3 criterios)', 'Moderado (4-5 criterios)', 'Grave (6+ criterios)'],
          remission: ['Em remissao inicial', 'Em remissao sustentada', 'Em terapia de manutencao'],
        },
        notes: 'Criterios de tolerancia e abstinencia nao sao considerados se opioides forem usados sob supervisao medica adequada.',
      },
    },
    quickView: {
      definicao: 'Padrao problematico de uso de opioides (heroina, morfina, codeina, fentanil, oxicodona, tramadol) com tolerancia, abstinencia e comportamento compulsivo de busca da substancia.',
      criteriosDiagnosticos: [
        'Pelo menos 2 de 11 criterios em 12 meses',
        'Tolerancia marcante (necessidade de doses crescentes)',
        'Sindrome de abstinencia intensa (dor, diarreia, nausea, insonia)',
        'Fissura intensa e comportamento de busca',
        'Gravidade: Leve (2-3), Moderado (4-5), Grave (6+)',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Terapia Cognitivo-Comportamental',
          'Manejo de contingencias',
          'Grupos de mutua ajuda (NA - Narcoticos Anonimos)',
          'CAPS-AD para acompanhamento ambulatorial',
        ],
        farmacologico: [
          'Terapia de Substituicao Opioide (TSO): Metadona 20-120mg/dia (programa supervisionado)',
          'Buprenorfina/Naloxona (Suboxone) 8-24mg/dia sublingual',
          'Naltrexona 50mg/dia oral ou 380mg IM mensal (apos desintoxicacao)',
          'Clonidina 0,1-0,3mg 3x/dia (manejo de abstinencia)',
          'Loperamida, ondansetrona, AINEs (sintomaticos para abstinencia)',
        ],
      },
      redFlags: [
        'Overdose (depressao respiratoria, miose, coma)',
        'Uso intravenoso (risco de HIV, hepatite C)',
        'Sindrome de abstinencia grave',
        'Gravidez (risco de abstinencia neonatal)',
        'Comorbidades infecciosas (endocardite, abscesso)',
        'Ideacao suicida',
      ],
      examesIniciais: [
        'Toxicologico de urina (opioides)',
        'Sorologias: HIV, Hepatite B, Hepatite C',
        'Funcao hepatica e renal',
        'ECG (intervalo QT - metadona)',
        'Hemograma',
      ],
      metasTerapeuticas: [
        'Estabilizacao com terapia de substituicao opioide',
        'Reducao de danos (prevencao de overdose e infeccoes)',
        'Prevencao de recaidas',
        'Reabilitacao social e ocupacional',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'ASSIST - Opioides',
        description: 'Modulo especifico para opioides do ASSIST-OMS. Avalia frequencia de uso, problemas e sintomas de abstinencia.',
        cutoff: '0-3: baixo risco; 4-26: risco moderado; 27+: alto risco',
        reference: 'WHO ASSIST Working Group, 2002',
      },
      {
        name: 'COWS',
        description: 'Clinical Opiate Withdrawal Scale: 11 itens para avaliar gravidade da sindrome de abstinencia de opioides.',
        cutoff: '5-12: leve; 13-24: moderada; 25-36: moderada-grave; >36: grave',
        reference: 'Wesson & Ling, 2003',
      },
      {
        name: 'SOWS',
        description: 'Subjective Opiate Withdrawal Scale: 16 sintomas autoavaliados pelo paciente.',
        cutoff: 'Pontuacao crescente indica maior gravidade subjetiva',
        reference: 'Handelsman et al., 1987',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TCC + Manejo de Contingencias',
        frequencia: 'Semanal durante fase intensiva, quinzenal na manutencao',
        duracao: 'Minimo 6 meses, idealmente anos com TSO',
      },
      farmacoterapia: {
        classe: 'Agonistas opioides parciais e antagonistas',
        medicamentos: ['metadona', 'buprenorfina', 'naltrexona'],
        doseInicial: 'Metadona 20-30mg/dia; Buprenorfina 4mg/dia',
        titulacao: 'Metadona: aumentos de 5-10mg a cada 3-7 dias; Buprenorfina: aumentos de 2-4mg',
        duracao: 'Tratamento de longa duracao (anos), reducao gradual se estabilidade',
      },
    },
    criteriosEncaminhamento: [
      'Primeiro episodio de uso de opioides',
      'Dependencia grave (uso IV, fentanil)',
      'Necessidade de programa de metadona',
      'Comorbidades infecciosas (HIV, HCV)',
      'Gestacao',
      'Overdose previa',
      'Falha em tratamento ambulatorial',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: false,
      riscoAutolesao: true,
      criterios: [
        'Overdose aguda (emergencia - naloxona 0,4mg IV/IM)',
        'Depressao respiratoria',
        'Abstinencia grave com desidratacao',
        'Ideacao suicida',
        'Complicacoes infecciosas graves',
      ],
    },
    comorbidadesComuns: [
      'transtorno-depressivo-maior',
      'transtorno-personalidade-borderline',
      'hepatite-c',
      'hiv-aids',
      'transtorno-uso-benzodiazepinicos',
    ],
    tags: ['opioides', 'heroina', 'morfina', 'metadona', 'buprenorfina', 'naloxona', 'overdose', 'dsm5'],
  },

  // ============================================================================
  // 4. TRANSTORNO POR USO DE CANNABIS
  // ============================================================================
  {
    id: 'transtorno-uso-cannabis',
    titulo: 'Transtorno por Uso de Cannabis',
    categoria: 'saude_mental',
    cid10: ['F12.1', 'F12.2'],
    cid11: ['6C41.0', '6C41.1', '6C41.2'],
    ciap2: ['P19'],
    snomedCT: '37344009', // Cannabis dependence (disorder)
    doid: 'DOID:0050740',
    meshId: 'D002189',
    umlsCui: 'C0006868',
    dsm5: {
      code: '304.30',
      codeAlternative: 'F12.20',
      category: DSM5_CATEGORIES.SUBSTANCE,
      diagnosticCriteria: {
        code: '304.30',
        name: 'Cannabis Use Disorder',
        category: DSM5_CATEGORIES.SUBSTANCE,
        criteria: [
          {
            letter: 'A',
            text: 'Padrao problematico de uso de cannabis, levando a comprometimento ou sofrimento clinicamente significativo, manifestado por pelo menos 2 dos seguintes criterios em 12 meses:',
          },
          {
            letter: '1',
            text: 'Cannabis frequentemente consumida em quantidades maiores ou por periodo mais longo do que o pretendido',
          },
          {
            letter: '2',
            text: 'Desejo persistente ou esforcos malsucedidos para reduzir ou controlar o uso',
          },
          {
            letter: '3',
            text: 'Muito tempo gasto para obter, usar ou recuperar-se dos efeitos',
          },
          {
            letter: '4',
            text: 'Fissura ou forte desejo de usar cannabis',
          },
          {
            letter: '5',
            text: 'Uso recorrente resultando em fracasso em cumprir obrigacoes',
          },
          {
            letter: '6',
            text: 'Uso continuado apesar de problemas sociais ou interpessoais',
          },
          {
            letter: '7',
            text: 'Atividades importantes abandonadas ou reduzidas',
          },
          {
            letter: '8',
            text: 'Uso recorrente em situacoes fisicamente perigosas',
          },
          {
            letter: '9',
            text: 'Uso mantido apesar de problema fisico ou psicologico persistente',
          },
          {
            letter: '10',
            text: 'Tolerancia',
          },
          {
            letter: '11',
            text: 'Abstinencia',
          },
        ],
        specifiers: {
          severity: ['Leve (2-3 criterios)', 'Moderado (4-5 criterios)', 'Grave (6+ criterios)'],
          remission: ['Em remissao inicial', 'Em remissao sustentada'],
        },
      },
    },
    quickView: {
      definicao: 'Padrao problematico de uso de cannabis (maconha, haxixe, THC) com desenvolvimento de tolerancia, sintomas de abstinencia e prejuizo funcional. Associado a sindrome amotivacional em uso cronico.',
      criteriosDiagnosticos: [
        'Pelo menos 2 de 11 criterios em 12 meses',
        'Tolerancia (necessidade de quantidades maiores)',
        'Sindrome de abstinencia (irritabilidade, insonia, ansiedade, anorexia)',
        'Prejuizo academico, ocupacional ou social',
        'Uso continuado apesar de problemas de memoria e concentracao',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Terapia Cognitivo-Comportamental (TCC)',
          'Entrevista Motivacional',
          'Terapia de Melhora Motivacional (MET)',
          'Manejo de Contingencias',
          'CAPS-AD para casos moderados/graves',
        ],
        farmacologico: [
          'Nao ha medicamentos aprovados especificamente',
          'N-acetilcisteina 1200mg 2x/dia (estudos promissores em adolescentes)',
          'Gabapentina 300-1200mg/dia (reduz sintomas de abstinencia)',
          'Tratamento de comorbidades (ISRS para ansiedade/depressao)',
        ],
      },
      redFlags: [
        'Psicose induzida por cannabis',
        'Primeiro episodio psicotico em usuario',
        'Sindrome da hiperemese canibinoide',
        'Inicio precoce (antes dos 15 anos)',
        'Uso diario intenso',
        'Comorbidade com esquizofrenia',
      ],
      examesIniciais: [
        'Toxicologico de urina (THC)',
        'Avaliacao cognitiva (se uso prolongado)',
        'Rastreamento para psicose',
        'Escala CAST ou CUDIT para gravidade',
      ],
      metasTerapeuticas: [
        'Cessacao ou reducao do uso',
        'Melhora do funcionamento cognitivo',
        'Retomada de atividades sociais e ocupacionais',
        'Prevencao de psicose em grupos de risco',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'CAST',
        description: 'Cannabis Abuse Screening Test: 6 itens para rastreamento de uso problematico de cannabis.',
        cutoff: '>=3: uso problematico',
        reference: 'Legleye et al., 2007',
      },
      {
        name: 'CUDIT-R',
        description: 'Cannabis Use Disorder Identification Test - Revised: 8 itens baseados nos criterios DSM.',
        cutoff: '>=8: provavel transtorno por uso de cannabis',
        reference: 'Adamson et al., 2010',
      },
      {
        name: 'ASSIST - Cannabis',
        description: 'Modulo cannabis do ASSIST-OMS.',
        cutoff: '0-3: baixo risco; 4-26: moderado; 27+: alto risco',
        reference: 'WHO, 2002',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TCC + MET (Motivational Enhancement Therapy)',
        frequencia: 'Semanal por 8-12 sessoes',
        duracao: '3-6 meses',
      },
      farmacoterapia: {
        classe: 'Tratamento sintomatico e de comorbidades',
        medicamentos: ['n-acetilcisteina', 'gabapentina'],
        doseInicial: 'NAC 600mg 2x/dia; Gabapentina 300mg/dia',
        titulacao: 'Aumentar conforme tolerancia e resposta',
        duracao: 'Variavel, conforme necessidade clinica',
      },
    },
    criteriosEncaminhamento: [
      'Uso grave com prejuizo funcional importante',
      'Psicose induzida por cannabis',
      'Comorbidade psiquiatrica grave',
      'Sindrome da hiperemese canibinoide',
      'Adolescentes com uso precoce',
      'Falha em intervencoes breves',
    ],
    urgencia: {
      riscosuicida: false,
      riscoAgressao: false,
      riscoAutolesao: false,
      criterios: [
        'Psicose aguda induzida por cannabis',
        'Sindrome da hiperemese canibinoide (vomitos intratables)',
        'Ataque de panico grave',
        'Intoxicacao com agitacao psicomotora',
      ],
    },
    comorbidadesComuns: [
      'transtorno-ansiedade-generalizada',
      'transtorno-depressivo-maior',
      'esquizofrenia',
      'transtorno-deficit-atencao-hiperatividade',
      'transtorno-uso-tabaco',
    ],
    tags: ['cannabis', 'maconha', 'thc', 'haxixe', 'amotivacional', 'psicose', 'dsm5', 'substancias'],
  },

  // ============================================================================
  // 5. TRANSTORNO POR USO DE COCAINA/CRACK
  // ============================================================================
  {
    id: 'transtorno-uso-cocaina',
    titulo: 'Transtorno por Uso de Cocaina/Crack',
    categoria: 'saude_mental',
    cid10: ['F14.1', 'F14.2'],
    cid11: ['6C45.0', '6C45.1', '6C45.2'],
    ciap2: ['P19'],
    snomedCT: '66214007', // Cocaine dependence (disorder)
    doid: 'DOID:0050743',
    meshId: 'D019970',
    umlsCui: 'C0009175',
    dsm5: {
      code: '304.20',
      codeAlternative: 'F14.20',
      category: DSM5_CATEGORIES.SUBSTANCE,
      diagnosticCriteria: {
        code: '304.20',
        name: 'Cocaine Use Disorder',
        category: DSM5_CATEGORIES.SUBSTANCE,
        criteria: [
          {
            letter: 'A',
            text: 'Padrao problematico de uso de cocaina, levando a comprometimento ou sofrimento clinicamente significativo, manifestado por pelo menos 2 criterios em 12 meses:',
          },
          {
            letter: '1',
            text: 'Cocaina frequentemente consumida em quantidades maiores ou por periodo mais longo do que o pretendido',
          },
          {
            letter: '2',
            text: 'Desejo persistente ou esforcos malsucedidos para reduzir ou controlar o uso',
          },
          {
            letter: '3',
            text: 'Muito tempo gasto para obter, usar ou recuperar-se dos efeitos',
          },
          {
            letter: '4',
            text: 'Fissura intensa ou desejo de usar cocaina',
          },
          {
            letter: '5',
            text: 'Uso recorrente resultando em fracasso em cumprir obrigacoes',
          },
          {
            letter: '6',
            text: 'Uso continuado apesar de problemas sociais ou interpessoais',
          },
          {
            letter: '7',
            text: 'Atividades importantes abandonadas ou reduzidas',
          },
          {
            letter: '8',
            text: 'Uso recorrente em situacoes fisicamente perigosas',
          },
          {
            letter: '9',
            text: 'Uso mantido apesar de problema fisico ou psicologico persistente',
          },
          {
            letter: '10',
            text: 'Tolerancia',
          },
          {
            letter: '11',
            text: 'Abstinencia',
          },
        ],
        specifiers: {
          severity: ['Leve (2-3 criterios)', 'Moderado (4-5 criterios)', 'Grave (6+ criterios)'],
          remission: ['Em remissao inicial', 'Em remissao sustentada'],
        },
      },
    },
    quickView: {
      definicao: 'Padrao problematico de uso de cocaina (po, crack, merla) com fissura intensa, tolerancia, abstinencia e comportamento compulsivo de busca. Crack tem inicio de acao mais rapido e maior potencial de dependencia.',
      criteriosDiagnosticos: [
        'Pelo menos 2 de 11 criterios em 12 meses',
        'Fissura intensa (craving)',
        'Uso em padroes "binge" (uso continuo por horas/dias)',
        'Tolerancia (necessidade de doses maiores)',
        'Abstinencia (disforia, fadiga, hipersonia, aumento do apetite)',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Manejo de Contingencias (evidencia mais forte)',
          'Terapia Cognitivo-Comportamental',
          'Comunidade Terapeutica (casos graves)',
          'Grupos de mutua ajuda (NA, CoDA)',
          'CAPS-AD III para acompanhamento intensivo',
        ],
        farmacologico: [
          'Nao ha medicamentos aprovados especificamente para dependencia de cocaina',
          'Topiramato 200-400mg/dia (reduz uso e fissura)',
          'Dissulfiram 250mg/dia (inibe dopamina-beta-hidroxilase)',
          'Modafinil 200-400mg/dia (melhora funcao executiva)',
          'N-acetilcisteina 1200-2400mg/dia (modula glutamato)',
          'Tratamento de comorbidades (ISRS, estabilizadores)',
        ],
      },
      redFlags: [
        'Intoxicacao aguda (taquicardia, hipertensao, hipertermia)',
        'Sindrome coronariana aguda',
        'AVC',
        'Convulsoes',
        'Psicose paranoide',
        'Agitacao psicomotora grave',
        'Ideacao suicida/homicida',
      ],
      examesIniciais: [
        'Toxicologico de urina (cocaina)',
        'ECG (arritmias, isquemia)',
        'Troponina (se dor toracica)',
        'Sorologias: HIV, HBV, HCV (se uso IV)',
        'Funcao renal e hepatica',
      ],
      metasTerapeuticas: [
        'Abstinencia sustentada',
        'Reducao de episodios de binge',
        'Prevencao de complicacoes cardiovasculares',
        'Reinsercao social e ocupacional',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'CCQ-Brief',
        description: 'Cocaine Craving Questionnaire - Brief: 10 itens para avaliar fissura por cocaina.',
        cutoff: 'Pontuacao mais alta = fissura mais intensa',
        reference: 'Sussner et al., 2006',
      },
      {
        name: 'ASSIST - Cocaina',
        description: 'Modulo cocaina do ASSIST-OMS.',
        cutoff: '0-3: baixo risco; 4-26: moderado; 27+: alto risco',
        reference: 'WHO, 2002',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'Manejo de Contingencias + TCC',
        frequencia: '2-3 vezes por semana (fase intensiva)',
        duracao: '12-24 semanas',
      },
      farmacoterapia: {
        classe: 'Tratamento off-label e de comorbidades',
        medicamentos: ['topiramato', 'dissulfiram', 'modafinil', 'n-acetilcisteina'],
        doseInicial: 'Topiramato 25mg/dia; NAC 600mg 2x/dia',
        titulacao: 'Topiramato: aumentar 25-50mg/semana ate 200-400mg/dia',
        duracao: 'Minimo 3-6 meses',
      },
    },
    criteriosEncaminhamento: [
      'Uso de crack (maior gravidade)',
      'Complicacoes cardiovasculares',
      'Psicose induzida',
      'Comorbidade psiquiatrica grave',
      'Gestacao',
      'Falha em tratamento ambulatorial',
      'Situacao social de extrema vulnerabilidade',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: true,
      riscoAutolesao: true,
      criterios: [
        'Intoxicacao aguda grave (hipertermia >40C, convulsoes)',
        'Dor toracica (sindrome coronariana)',
        'Psicose paranoide aguda',
        'Agitacao grave com heteroagressividade',
        'Ideacao suicida',
        'Rabdomiolise',
      ],
    },
    comorbidadesComuns: [
      'transtorno-bipolar-i',
      'transtorno-personalidade-antisocial',
      'transtorno-deficit-atencao-hiperatividade',
      'transtorno-uso-alcool',
      'hiv-aids',
    ],
    tags: ['cocaina', 'crack', 'estimulante', 'fissura', 'cardiovascular', 'psicose', 'dsm5', 'substancias'],
  },

  // ============================================================================
  // 6. TRANSTORNO POR USO DE ANFETAMINAS
  // ============================================================================
  {
    id: 'transtorno-uso-anfetaminas',
    titulo: 'Transtorno por Uso de Anfetaminas',
    categoria: 'saude_mental',
    cid10: ['F15.1', 'F15.2'],
    cid11: ['6C46.0', '6C46.1', '6C46.2'],
    ciap2: ['P19'],
    snomedCT: '288281000119103', // Amphetamine dependence (disorder)
    doid: 'DOID:0050745',
    meshId: 'D019969',
    umlsCui: 'C0236071',
    dsm5: {
      code: '304.40',
      codeAlternative: 'F15.20',
      category: DSM5_CATEGORIES.SUBSTANCE,
      diagnosticCriteria: {
        code: '304.40',
        name: 'Stimulant Use Disorder (Amphetamine-Type)',
        category: DSM5_CATEGORIES.SUBSTANCE,
        criteria: [
          {
            letter: 'A',
            text: 'Padrao problematico de uso de estimulantes tipo anfetamina, levando a comprometimento ou sofrimento clinicamente significativo, manifestado por pelo menos 2 criterios em 12 meses',
          },
        ],
        specifiers: {
          severity: ['Leve (2-3 criterios)', 'Moderado (4-5 criterios)', 'Grave (6+ criterios)'],
          remission: ['Em remissao inicial', 'Em remissao sustentada'],
        },
        notes: 'Inclui anfetaminas, metanfetamina (crystal meth), MDMA (ecstasy) e anfetaminas de uso medico (metilfenidato, lisdexanfetamina)',
      },
    },
    quickView: {
      definicao: 'Padrao problematico de uso de estimulantes tipo anfetamina (anfetaminas, metanfetamina/crystal meth, MDMA/ecstasy) com fissura, tolerancia, abstinencia e prejuizo funcional significativo.',
      criteriosDiagnosticos: [
        'Pelo menos 2 de 11 criterios em 12 meses',
        'Tolerancia marcante',
        'Abstinencia (fadiga, hipersonia, disforia, aumento do apetite)',
        'Uso em padroes binge',
        'Comportamento paranoide ou psicose em uso intenso',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Manejo de Contingencias (evidencia mais forte)',
          'Terapia Cognitivo-Comportamental',
          'Matrix Model (12 semanas intensivas)',
          'CAPS-AD para acompanhamento',
        ],
        farmacologico: [
          'Nao ha medicamentos aprovados especificamente',
          'Bupropiona 300mg/dia (reduz fissura)',
          'Naltrexona 50mg/dia (estudos em metanfetamina)',
          'Mirtazapina 30mg/noite (melhora sono e humor)',
          'Modafinil 200-400mg/dia (melhora funcao cognitiva)',
          'Tratamento de psicose se presente (antipsicoticos)',
        ],
      },
      redFlags: [
        'Psicose paranoide persistente',
        'Hipertermia maligna',
        'Sindrome serotoninergica (MDMA)',
        'Rabdomiolise',
        'Arritmias cardiacas',
        'AVC',
        'Comportamento agressivo/violento',
      ],
      examesIniciais: [
        'Toxicologico de urina (anfetaminas)',
        'ECG',
        'CPK (rabdomiolise)',
        'Funcao renal e hepatica',
        'Avaliacao cognitiva',
      ],
      metasTerapeuticas: [
        'Abstinencia sustentada',
        'Recuperacao cognitiva',
        'Tratamento de sequelas psiquiatricas',
        'Reabilitacao social',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'ASSIST - Anfetaminas',
        description: 'Modulo anfetaminas do ASSIST-OMS.',
        cutoff: '0-3: baixo risco; 4-26: moderado; 27+: alto risco',
        reference: 'WHO, 2002',
      },
      {
        name: 'BSCS',
        description: 'Brief Substance Craving Scale: Avalia fissura geral para substancias.',
        cutoff: 'Pontuacao crescente = fissura mais intensa',
        reference: 'Somoza et al., 1995',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'Manejo de Contingencias + Matrix Model',
        frequencia: '3 vezes/semana (fase intensiva)',
        duracao: '12-16 semanas',
      },
      farmacoterapia: {
        classe: 'Tratamento off-label e sintomatico',
        medicamentos: ['bupropiona', 'naltrexona', 'mirtazapina', 'modafinil'],
        doseInicial: 'Bupropiona 150mg/dia; Mirtazapina 15mg/noite',
        titulacao: 'Aumentar conforme resposta e tolerancia',
        duracao: '6-12 meses',
      },
    },
    criteriosEncaminhamento: [
      'Uso de metanfetamina (crystal meth)',
      'Psicose persistente',
      'Danos cognitivos significativos',
      'Complicacoes cardiovasculares',
      'Comorbidade psiquiatrica grave',
      'Falha em tratamento ambulatorial',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: true,
      riscoAutolesao: true,
      criterios: [
        'Psicose aguda com agitacao',
        'Hipertermia maligna',
        'Sindrome serotoninergica (MDMA)',
        'Convulsoes',
        'Arritmias graves',
        'Comportamento violento',
      ],
    },
    comorbidadesComuns: [
      'transtorno-bipolar-i',
      'transtorno-deficit-atencao-hiperatividade',
      'transtorno-personalidade-antisocial',
      'transtorno-depressivo-maior',
    ],
    tags: ['anfetaminas', 'metanfetamina', 'crystal', 'mdma', 'ecstasy', 'estimulante', 'psicose', 'dsm5'],
  },

  // ============================================================================
  // 7. TRANSTORNO POR USO DE BENZODIAZEPINICOS
  // ============================================================================
  {
    id: 'transtorno-uso-benzodiazepinicos',
    titulo: 'Transtorno por Uso de Benzodiazepinicos',
    categoria: 'saude_mental',
    cid10: ['F13.1', 'F13.2'],
    cid11: ['6C42.0', '6C42.1', '6C42.2'],
    ciap2: ['P19'],
    snomedCT: '231476007', // Benzodiazepine dependence (disorder)
    meshId: 'D019966',
    umlsCui: 'C0236070',
    dsm5: {
      code: '304.10',
      codeAlternative: 'F13.20',
      category: DSM5_CATEGORIES.SUBSTANCE,
      diagnosticCriteria: {
        code: '304.10',
        name: 'Sedative, Hypnotic, or Anxiolytic Use Disorder',
        category: DSM5_CATEGORIES.SUBSTANCE,
        criteria: [
          {
            letter: 'A',
            text: 'Padrao problematico de uso de sedativos, hipnoticos ou ansioliticos, levando a comprometimento ou sofrimento clinicamente significativo, manifestado por pelo menos 2 criterios em 12 meses',
          },
        ],
        specifiers: {
          severity: ['Leve (2-3 criterios)', 'Moderado (4-5 criterios)', 'Grave (6+ criterios)'],
          remission: ['Em remissao inicial', 'Em remissao sustentada'],
        },
        notes: 'Criterios de tolerancia e abstinencia nao sao considerados se uso sob supervisao medica adequada. Abstinencia de benzodiazepinicos pode ser fatal.',
      },
    },
    quickView: {
      definicao: 'Padrao problematico de uso de benzodiazepinicos (diazepam, clonazepam, alprazolam, lorazepam) com tolerancia, abstinencia potencialmente grave e dificuldade em descontinuar apesar de prescricao medica.',
      criteriosDiagnosticos: [
        'Pelo menos 2 de 11 criterios em 12 meses',
        'Tolerancia (necessidade de doses crescentes)',
        'Sindrome de abstinencia (ansiedade, tremores, insonia, convulsoes)',
        'Uso por periodo maior que o prescrito',
        'Busca de multiplas prescricoes (doctor shopping)',
      ],
      classificacaoRisco: [
        {
          nivel: 'baixo',
          criterios: ['Uso < 4 semanas', 'Dose baixa', 'Sem sinais de dependencia'],
          conduta: 'Orientacao para suspensao gradual',
        },
        {
          nivel: 'moderado',
          criterios: ['Uso 1-6 meses', 'Dose moderada', 'Tolerancia presente'],
          conduta: 'Desmame gradual ambulatorial (10-25%/semana)',
        },
        {
          nivel: 'alto',
          criterios: ['Uso > 6 meses', 'Dose alta', 'Historia de convulsoes'],
          conduta: 'Desmame supervisionado, conversao para agente de meia-vida longa',
        },
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoeducacao sobre riscos do uso prolongado',
          'TCC para insonia (TCC-I) ou ansiedade',
          'Tecnicas de relaxamento e mindfulness',
          'Higiene do sono',
        ],
        farmacologico: [
          'DESMAME GRADUAL e obrigatorio (reducao de 10-25% por semana)',
          'Conversao para BZD de meia-vida longa: Diazepam (equivalencias)',
          'Carbamazepina 200-400mg/dia (protecao contra convulsoes)',
          'Gabapentina 300-1800mg/dia (ansiedade, insonia)',
          'Pregabalina 150-600mg/dia (alternativa para ansiedade)',
          'Trazodona 50-150mg/noite (insonia)',
        ],
      },
      redFlags: [
        'Convulsoes previas por abstinencia',
        'Uso de doses muito altas (>40mg diazepam-equivalente)',
        'Uso concomitante de alcool ou opioides',
        'Idosos (maior risco de quedas e delirium)',
        'Gestacao (risco teratogenico e sindrome de abstinencia neonatal)',
        'Tentativa de retirada abrupta',
      ],
      examesIniciais: [
        'Toxicologico de urina',
        'Funcao hepatica e renal',
        'EEG (se historia de convulsoes)',
        'Avaliacao cognitiva (idosos)',
      ],
      metasTerapeuticas: [
        'Reducao gradual e segura da dose',
        'Abstinencia completa quando possivel',
        'Tratamento da condicao subjacente (ansiedade, insonia)',
        'Prevencao de recaidas',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'Severity of Dependence Scale (SDS)',
        description: 'Escala de 5 itens para avaliar gravidade da dependencia.',
        cutoff: '>=5: dependencia provavel',
        reference: 'Gossop et al., 1995',
      },
      {
        name: 'Benzodiazepine Dependence Questionnaire',
        description: 'Questionario especifico para dependencia de BZD.',
        cutoff: 'Pontuacao mais alta = maior dependencia',
        reference: 'Baillie & Mattick, 1996',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TCC + TCC-I (para insonia)',
        frequencia: 'Semanal durante desmame',
        duracao: '8-12 semanas',
      },
      farmacoterapia: {
        classe: 'Desmame gradual + medicamentos de suporte',
        medicamentos: ['diazepam', 'carbamazepina', 'gabapentina', 'pregabalina', 'trazodona'],
        doseInicial: 'Converter para diazepam-equivalente, depois reduzir 10-25%/semana',
        titulacao: 'Reducoes menores (5-10%) no final do desmame',
        duracao: '4-16 semanas (dependendo da dose inicial)',
      },
    },
    criteriosEncaminhamento: [
      'Uso de doses muito altas',
      'Historia de convulsoes por abstinencia',
      'Uso concomitante de outras substancias',
      'Comorbidade psiquiatrica grave',
      'Falha em tentativas previas de desmame',
      'Gestacao',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: false,
      riscoAutolesao: true,
      criterios: [
        'Convulsoes por abstinencia',
        'Delirium de abstinencia',
        'Intoxicacao grave com depressao respiratoria',
        'Tentativa de suicidio (overdose)',
        'Retirada abrupta de doses altas',
      ],
    },
    comorbidadesComuns: [
      'transtorno-ansiedade-generalizada',
      'transtorno-panico',
      'insonia',
      'transtorno-uso-alcool',
      'transtorno-uso-opioides',
    ],
    tags: ['benzodiazepinicos', 'bzd', 'diazepam', 'clonazepam', 'alprazolam', 'desmame', 'convulsoes', 'dsm5'],
  },

  // ============================================================================
  // 8. TRANSTORNO POR USO DE INALANTES
  // ============================================================================
  {
    id: 'transtorno-uso-inalantes',
    titulo: 'Transtorno por Uso de Inalantes',
    categoria: 'saude_mental',
    cid10: ['F18.1', 'F18.2'],
    cid11: ['6C4E.0', '6C4E.1', '6C4E.2'],
    ciap2: ['P19'],
    snomedCT: '191816009', // Inhalant dependence (disorder)
    meshId: 'D019966',
    umlsCui: 'C0557349',
    dsm5: {
      code: '304.60',
      codeAlternative: 'F18.20',
      category: DSM5_CATEGORIES.SUBSTANCE,
      diagnosticCriteria: {
        code: '304.60',
        name: 'Inhalant Use Disorder',
        category: DSM5_CATEGORIES.SUBSTANCE,
        criteria: [
          {
            letter: 'A',
            text: 'Padrao problematico de uso de uma substancia hidrocarboneto inalante, levando a comprometimento ou sofrimento clinicamente significativo, manifestado por pelo menos 2 criterios em 12 meses',
          },
        ],
        specifiers: {
          severity: ['Leve (2-3 criterios)', 'Moderado (4-5 criterios)', 'Grave (6+ criterios)'],
          remission: ['Em remissao inicial', 'Em remissao sustentada'],
        },
        notes: 'Substancias incluem: tolueno (cola de sapateiro), tintas, solventes, gasolina, nitritos ("poppers"), oxido nitroso. Nao inclui gases anestesicos sob supervisao medica.',
      },
    },
    quickView: {
      definicao: 'Padrao problematico de uso de substancias volateis por inalacao (cola de sapateiro, tintas, solventes, lanca-perfume, loló) com euforia rapida, tolerancia e danos neurologicos e sistemicos graves.',
      criteriosDiagnosticos: [
        'Pelo menos 2 de 11 criterios em 12 meses (exceto abstinencia)',
        'Uso repetido apesar de danos evidentes',
        'Tolerancia',
        'Nota: DSM-5 nao inclui sindrome de abstinencia para inalantes',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Afastamento imediato da substancia',
          'TCC adaptada para adolescentes',
          'Intervencoes familiares',
          'Programa de atividades alternativas',
          'CAPS-AD / CAPSi (adolescentes)',
        ],
        farmacologico: [
          'Nao ha medicamentos especificos',
          'Tratamento de comorbidades (ISRS, antipsicoticos)',
          'Suplementacao vitaminica (B1, B12)',
          'Tratamento de sequelas (anticonvulsivantes se neuropatia)',
        ],
      },
      redFlags: [
        'Morte subita por arritmia (sudden sniffing death)',
        'Encefalopatia grave',
        'Neuropatia periferica',
        'Hepatotoxicidade',
        'Insuficiencia renal',
        'Anemia aplastica (benzeno)',
        'Lesoes peribucais (rash de solvente)',
      ],
      examesIniciais: [
        'Hemograma completo (anemia, leucopenia)',
        'Funcao hepatica e renal',
        'Eletrolitos',
        'ECG',
        'RNM de encefalo (se sintomas neurologicos)',
        'Eletroneuromiografia (neuropatia)',
      ],
      metasTerapeuticas: [
        'Abstinencia imediata e completa',
        'Monitoramento de danos organicos',
        'Reabilitacao cognitiva',
        'Reinsercao social e escolar',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'ASSIST - Inalantes',
        description: 'Modulo inalantes do ASSIST-OMS.',
        cutoff: '0-3: baixo risco; 4-26: moderado; 27+: alto risco',
        reference: 'WHO, 2002',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TCC + Intervencao Familiar',
        frequencia: 'Semanal a bissemanal',
        duracao: '6-12 meses',
      },
      farmacoterapia: {
        classe: 'Tratamento sintomatico e de comorbidades',
        medicamentos: [],
        doseInicial: 'Nao ha farmacos especificos',
        duracao: 'Conforme necessidade clinica',
      },
    },
    criteriosEncaminhamento: [
      'Qualquer uso de inalantes (alta gravidade)',
      'Sinais de dano neurologico',
      'Disfuncao hepatica ou renal',
      'Adolescentes em situacao de rua',
      'Comorbidades psiquiatricas',
    ],
    urgencia: {
      riscosuicida: false,
      riscoAgressao: false,
      riscoAutolesao: true,
      criterios: [
        'Intoxicacao aguda com arritmias',
        'Convulsoes',
        'Perda de consciencia',
        'Asfixia (saco plastico)',
        'Queimaduras (substancias inflamaveis)',
      ],
    },
    comorbidadesComuns: [
      'transtorno-conduta',
      'transtorno-deficit-atencao-hiperatividade',
      'transtorno-depressivo-maior',
      'transtorno-uso-alcool',
    ],
    tags: ['inalantes', 'solventes', 'cola', 'tolueno', 'lanca-perfume', 'neuropatia', 'adolescentes', 'dsm5'],
  },

  // ============================================================================
  // 9. INTOXICACAO AGUDA POR ALCOOL
  // ============================================================================
  {
    id: 'intoxicacao-aguda-alcool',
    titulo: 'Intoxicacao Aguda por Alcool',
    categoria: 'saude_mental',
    cid10: ['F10.0'],
    cid11: ['6C40.10'],
    ciap2: ['P15'],
    snomedCT: '25702006', // Acute alcoholic intoxication (disorder)
    meshId: 'D000435',
    umlsCui: 'C0001969',
    dsm5: {
      code: '303.00',
      codeAlternative: 'F10.129',
      category: DSM5_CATEGORIES.SUBSTANCE,
      diagnosticCriteria: {
        code: '303.00',
        name: 'Alcohol Intoxication',
        category: DSM5_CATEGORIES.SUBSTANCE,
        criteria: [
          {
            letter: 'A',
            text: 'Ingestao recente de alcool',
          },
          {
            letter: 'B',
            text: 'Alteracoes comportamentais ou psicologicas problematicas clinicamente significativas que se desenvolveram durante ou logo apos a ingestao de alcool',
          },
          {
            letter: 'C',
            text: 'Um (ou mais) dos seguintes sinais ou sintomas, desenvolvendo-se durante ou logo apos o uso de alcool:',
            subCriteria: [
              { text: '1. Fala arrastada' },
              { text: '2. Incoordenacao' },
              { text: '3. Marcha instavel' },
              { text: '4. Nistagmo' },
              { text: '5. Comprometimento da atencao ou memoria' },
              { text: '6. Estupor ou coma' },
            ],
          },
          {
            letter: 'D',
            text: 'Os sinais ou sintomas nao sao atribuiveis a outra condicao medica nem sao mais bem explicados por outro transtorno mental',
          },
        ],
      },
    },
    quickView: {
      definicao: 'Sindrome clinica aguda resultante da ingestao recente de alcool, com alteracoes comportamentais, cognitivas e motoras proporcionais ao nivel de alcoolemia. Pode evoluir para coma e morte em casos graves.',
      criteriosDiagnosticos: [
        'Ingestao recente de alcool',
        'Alteracoes comportamentais clinicamente significativas',
        'Sinais: fala arrastada, incoordenacao, marcha instavel, nistagmo',
        'Comprometimento da atencao/memoria ou estupor/coma',
        'Exclusao de outras causas',
      ],
      classificacaoRisco: [
        {
          nivel: 'baixo',
          criterios: ['Alcoolemia 50-100mg/dL', 'Euforia, loquacidade, incoordenacao leve'],
          conduta: 'Observacao, hidratacao oral, ambiente seguro',
        },
        {
          nivel: 'moderado',
          criterios: ['Alcoolemia 100-200mg/dL', 'Disartria, ataxia, alteracao de julgamento'],
          conduta: 'Observacao em emergencia, hidratacao IV, tiamina',
        },
        {
          nivel: 'alto',
          criterios: ['Alcoolemia 200-300mg/dL', 'Confusao, vomitos, risco de aspiracao'],
          conduta: 'Monitoramento continuo, protecao de via aerea, tiamina IV',
        },
        {
          nivel: 'muito_alto',
          criterios: ['Alcoolemia >300mg/dL', 'Estupor, coma, depressao respiratoria'],
          conduta: 'UTI, intubacao se necessario, suporte avancado',
        },
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Ambiente seguro e calmo',
          'Decubito lateral (prevencao de aspiracao)',
          'Monitoramento de sinais vitais',
          'Contenção verbal (evitar agitacao)',
        ],
        farmacologico: [
          'Tiamina (Vit B1) 100-300mg IV (ANTES de glicose)',
          'Glicose 50% IV se hipoglicemia confirmada',
          'Hidratacao com SF 0,9% ou Ringer Lactato',
          'Haloperidol 5mg IM se agitacao grave (evitar BZD)',
          'Ondansetrona 4-8mg IV se nauseas/vomitos',
        ],
      },
      redFlags: [
        'Rebaixamento de consciencia (Glasgow <13)',
        'Vomitos com risco de aspiracao',
        'Hipoglicemia',
        'Hipotermia',
        'Trauma cranioencefalico associado',
        'Suspeita de intoxicacao por metanol/etilenoglicol',
        'Convulsoes',
      ],
      examesIniciais: [
        'Glicemia capilar (imediata)',
        'Alcoolemia (se disponivel)',
        'Gasometria arterial',
        'Eletrólitos, ureia, creatinina',
        'Hemograma',
        'TC de cranio se trauma ou alteracao neurologica focal',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'Escala de Glasgow',
        description: 'Avalia nivel de consciencia. Componentes: abertura ocular (1-4), resposta verbal (1-5), resposta motora (1-6).',
        cutoff: '13-15: leve; 9-12: moderado; 3-8: grave',
        reference: 'Teasdale & Jennett, 1974',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'Intervencao breve apos recuperacao',
        frequencia: 'Sessao unica na alta ou consulta de seguimento',
        duracao: '15-30 minutos',
      },
      farmacoterapia: {
        classe: 'Suporte clinico',
        medicamentos: ['tiamina', 'glicose', 'haloperidol', 'ondansetrona'],
        doseInicial: 'Tiamina 100-300mg IV; Glicose 50% 50mL IV',
        duracao: 'Durante periodo de observacao',
      },
    },
    criteriosEncaminhamento: [
      'Apos alta: encaminhamento para avaliacao de transtorno por uso de alcool',
      'CAPS-AD se uso problematico identificado',
      'Avaliacao psiquiatrica se risco suicida ou comorbidades',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: true,
      riscoAutolesao: true,
      criterios: [
        'Coma (Glasgow <=8)',
        'Depressao respiratoria',
        'Hipoglicemia grave',
        'Aspiração pulmonar',
        'Trauma cranioencefalico',
        'Hipertermia ou hipotermia',
        'Tentativa de suicidio',
      ],
    },
    comorbidadesComuns: [
      'transtorno-uso-alcool',
      'trauma-cranioencefalico',
      'hipoglicemia',
    ],
    tags: ['alcool', 'intoxicacao', 'emergencia', 'coma', 'alcoolemia', 'tiamina', 'dsm5'],
  },

  // ============================================================================
  // 10. SINDROME DE ABSTINENCIA ALCOOLICA
  // ============================================================================
  {
    id: 'sindrome-abstinencia-alcoolica',
    titulo: 'Sindrome de Abstinencia Alcoolica',
    categoria: 'saude_mental',
    cid10: ['F10.3', 'F10.4'],
    cid11: ['6C40.3'],
    ciap2: ['P15'],
    snomedCT: '8635005', // Alcohol withdrawal syndrome (disorder)
    doid: 'DOID:0050741',
    meshId: 'D000430',
    umlsCui: 'C0001962',
    dsm5: {
      code: '291.81',
      codeAlternative: 'F10.239',
      category: DSM5_CATEGORIES.SUBSTANCE,
      diagnosticCriteria: {
        code: '291.81',
        name: 'Alcohol Withdrawal',
        category: DSM5_CATEGORIES.SUBSTANCE,
        criteria: [
          {
            letter: 'A',
            text: 'Cessacao (ou reducao) do uso pesado e prolongado de alcool',
          },
          {
            letter: 'B',
            text: 'Dois (ou mais) dos seguintes sintomas, desenvolvendo-se dentro de horas a alguns dias apos a cessacao:',
            subCriteria: [
              { text: '1. Hiperatividade autonomica (sudorese, taquicardia >100bpm)' },
              { text: '2. Tremor aumentado das maos' },
              { text: '3. Insonia' },
              { text: '4. Nausea ou vomitos' },
              { text: '5. Alucinacoes ou ilusoes visuais, tateis ou auditivas transitórias' },
              { text: '6. Agitacao psicomotora' },
              { text: '7. Ansiedade' },
              { text: '8. Convulsoes tonico-clonicas generalizadas' },
            ],
          },
          {
            letter: 'C',
            text: 'Os sintomas causam sofrimento clinicamente significativo ou prejuizo no funcionamento',
          },
          {
            letter: 'D',
            text: 'Os sintomas nao sao atribuiveis a outra condicao medica nem sao mais bem explicados por outro transtorno mental',
          },
        ],
        specifiers: {
          severity: ['Com perturbacoes da percepcao (alucinacoes com teste de realidade intacto)'],
        },
        notes: 'Delirium tremens e uma forma grave com delirium, alucinacoes, agitacao intensa e instabilidade autonomica.',
      },
    },
    quickView: {
      definicao: 'Sindrome clinica que ocorre apos cessacao ou reducao do uso cronico de alcool, caracterizada por hiperatividade autonomica, tremores, ansiedade e, em casos graves, convulsoes e delirium tremens.',
      criteriosDiagnosticos: [
        'Cessacao ou reducao de uso cronico de alcool',
        'Inicio 6-24h apos ultima ingesta',
        'Pelo menos 2 sintomas: tremores, sudorese, taquicardia, nausea, alucinacoes, agitacao, ansiedade, convulsoes',
        'Pico de sintomas em 24-72h',
        'Delirium tremens: 48-96h apos cessacao',
      ],
      classificacaoRisco: [
        {
          nivel: 'baixo',
          criterios: ['CIWA-Ar <10', 'Sem historia de DT ou convulsoes', 'Tremores leves'],
          conduta: 'Tratamento ambulatorial, tiamina, observacao',
        },
        {
          nivel: 'moderado',
          criterios: ['CIWA-Ar 10-15', 'Taquicardia, sudorese, tremores moderados'],
          conduta: 'Observacao em emergencia/enfermaria, diazepam conforme protocolo',
        },
        {
          nivel: 'alto',
          criterios: ['CIWA-Ar 16-20', 'Historia de convulsoes', 'Comorbidades clinicas'],
          conduta: 'Internacao, diazepam IV, monitoramento continuo',
        },
        {
          nivel: 'muito_alto',
          criterios: ['CIWA-Ar >20', 'Delirium tremens', 'Convulsoes', 'Febre >38.3C'],
          conduta: 'UTI, diazepam IV em doses altas, fenobarbital se refratario',
        },
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Ambiente calmo, iluminado, com reducao de estimulos',
          'Reorientacao frequente',
          'Prevencao de quedas',
          'Hidratacao adequada',
          'Correcao de disturbios eletroliticos',
        ],
        farmacologico: [
          'PROTOCOLO CIWA-Ar (symptom-triggered):',
          'Diazepam 10-20mg VO/IV a cada hora se CIWA-Ar >=10',
          'Lorazepam 2-4mg VO/IV (preferir em hepatopatas)',
          'Tiamina 300-500mg IV 3x/dia por 3 dias (prevencao de Wernicke)',
          'Correcao de hipomagnesemia: MgSO4 2g IV',
          'Correcao de hipocalemia',
          'Fenobarbital 130-260mg IV se refratario a BZD',
          'Propofol em casos extremos (UTI)',
        ],
      },
      redFlags: [
        'Delirium tremens (mortalidade 5-15% se nao tratado)',
        'Convulsoes',
        'Febre >38.3C',
        'Taquicardia >120bpm',
        'Alucinacoes intensas',
        'Agitacao grave',
        'Comorbidades: cirrose, ICC, pneumonia',
      ],
      examesIniciais: [
        'CIWA-Ar a cada 1-2 horas',
        'Glicemia capilar',
        'Eletrolitos (Na, K, Mg, Ca, P)',
        'Funcao hepatica e renal',
        'Hemograma',
        'Coagulograma',
        'RX torax (pneumonia por aspiracao)',
        'TC cranio se primeiro episodio ou focal',
      ],
      metasTerapeuticas: [
        'Controle dos sintomas de abstinencia',
        'Prevencao de convulsoes e delirium tremens',
        'Prevencao de encefalopatia de Wernicke',
        'Transicao para tratamento do transtorno por uso de alcool',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'CIWA-Ar',
        description: 'Clinical Institute Withdrawal Assessment for Alcohol - Revised: 10 itens que avaliam nausea, tremores, sudorese, ansiedade, agitacao, disturbios tateis, auditivos e visuais, cefaleia, orientacao.',
        cutoff: '0-9: leve; 10-15: moderada; 16-20: grave; >20: muito grave',
        reference: 'Sullivan et al., 1989',
      },
      {
        name: 'PAWSS',
        description: 'Prediction of Alcohol Withdrawal Severity Scale: Prediz risco de abstinencia complicada.',
        cutoff: '>=4: alto risco de abstinencia complicada',
        reference: 'Maldonado et al., 2014',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'Nao aplicavel na fase aguda',
        frequencia: 'Apos estabilizacao: planejamento de tratamento ambulatorial',
        duracao: 'Intervencao breve antes da alta',
      },
      farmacoterapia: {
        classe: 'Benzodiazepinicos + tiamina',
        medicamentos: ['diazepam', 'lorazepam', 'tiamina', 'sulfato-magnesio', 'fenobarbital'],
        doseInicial: 'Diazepam 10-20mg VO/IV conforme CIWA-Ar; Tiamina 300mg IV',
        titulacao: 'CIWA-Ar a cada 1h, BZD se >=10, dose dobrada se >=20',
        duracao: 'Ate resolucao dos sintomas (geralmente 3-7 dias)',
      },
    },
    criteriosEncaminhamento: [
      'Todos os pacientes devem ser encaminhados para avaliacao de transtorno por uso de alcool',
      'CAPS-AD para acompanhamento ambulatorial',
      'Internacao psiquiatrica se comorbidades graves',
      'Comunidade terapeutica em casos selecionados',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: true,
      riscoAutolesao: true,
      criterios: [
        'Delirium tremens',
        'Convulsoes',
        'CIWA-Ar >20',
        'Febre >38.3C com instabilidade autonomica',
        'Refratariedade a benzodiazepinicos',
        'Comorbidades descompensadas',
      ],
    },
    comorbidadesComuns: [
      'transtorno-uso-alcool',
      'cirrose-hepatica',
      'pancreatite',
      'encefalopatia-wernicke',
      'transtorno-depressivo-maior',
    ],
    tags: ['abstinencia', 'alcool', 'delirium-tremens', 'ciwa-ar', 'convulsoes', 'diazepam', 'tiamina', 'emergencia', 'dsm5'],
  },
];

/**
 * Tabela de equivalencia de benzodiazepinicos
 * Util para conversao no desmame
 */
export const equivalenciaBenzodiazepinicos = {
  diazepam: { dose: 10, meiaVida: '20-100h', comentario: 'Referencia para conversao' },
  alprazolam: { dose: 0.5, meiaVida: '6-12h', comentario: 'Alta potencia, meia-vida curta' },
  clonazepam: { dose: 0.5, meiaVida: '18-50h', comentario: 'Alta potencia, meia-vida longa' },
  lorazepam: { dose: 1, meiaVida: '10-20h', comentario: 'Preferido em hepatopatas' },
  bromazepam: { dose: 6, meiaVida: '10-20h', comentario: 'Comum no Brasil' },
  midazolam: { dose: 7.5, meiaVida: '1-4h', comentario: 'Meia-vida muito curta' },
  nitrazepam: { dose: 5, meiaVida: '15-38h', comentario: 'Uso hipnotico' },
  flunitrazepam: { dose: 1, meiaVida: '18-26h', comentario: 'Controlado especial' },
};

/**
 * Protocolo CIWA-Ar para abstinencia alcoolica
 * Tratamento symptom-triggered
 */
export const protocoloCIWAAr = {
  descricao: 'Clinical Institute Withdrawal Assessment for Alcohol - Revised',
  itens: [
    'Nausea e vomitos (0-7)',
    'Tremores (0-7)',
    'Sudorese paroxistica (0-7)',
    'Ansiedade (0-7)',
    'Agitacao (0-7)',
    'Disturbios tateis (0-7)',
    'Disturbios auditivos (0-7)',
    'Disturbios visuais (0-7)',
    'Cefaleia (0-7)',
    'Orientacao/turvacao do sensorio (0-4)',
  ],
  pontuacaoMaxima: 67,
  interpretacao: {
    leve: { range: '0-9', conduta: 'Observacao, tiamina, hidratacao' },
    moderada: { range: '10-15', conduta: 'Diazepam 10mg VO/IV, reavaliar em 1h' },
    grave: { range: '16-20', conduta: 'Diazepam 20mg IV, monitoramento continuo' },
    muitoGrave: { range: '>20', conduta: 'Diazepam 20mg IV a cada hora, considerar UTI' },
  },
  frequenciaAvaliacao: 'A cada 1-2 horas enquanto CIWA-Ar >=10',
};

/**
 * Rede de Atencao Psicossocial (RAPS) - Brasil
 * Pontos de atencao para transtornos por uso de substancias
 */
export const redeRAPSSubstancias = {
  atencaoBasica: {
    descricao: 'UBS, ESF, NASF-AB',
    funcoes: [
      'Rastreamento com AUDIT/ASSIST',
      'Intervencao breve',
      'Acompanhamento de casos leves',
      'Matriciamento com CAPS-AD',
      'Reducao de danos',
    ],
  },
  capsAD: {
    tipos: {
      capsAD: 'Funcionamento diurno, municípios >70.000 hab',
      capsADIII: 'Funcionamento 24h, acolhimento noturno, urgencia',
    },
    funcoes: [
      'Atendimento intensivo',
      'Desintoxicacao ambulatorial',
      'Grupos terapeuticos',
      'Oficinas',
      'Acompanhamento familiar',
    ],
  },
  urgenciaEmergencia: {
    descricao: 'UPA, SAMU, Emergencias hospitalares',
    funcoes: [
      'Intoxicacao aguda',
      'Abstinencia grave/delirium tremens',
      'Crises psicoticas',
      'Tentativas de suicidio',
    ],
  },
  hospitalares: {
    descricao: 'Enfermarias especializadas, UTI',
    funcoes: [
      'Desintoxicacao complexa',
      'Comorbidades clinicas graves',
      'Delirium tremens refratario',
    ],
  },
  residenciaisTerapeuticas: {
    descricao: 'Servicos Residenciais Terapeuticos',
    funcoes: [
      'Moradia para egressos de internacoes prolongadas',
      'Reinsercao social',
    ],
  },
  comunidadesTerapeuticas: {
    descricao: 'Entidades conveniadas ao SUS',
    funcoes: [
      'Acolhimento de longa duracao',
      'Trabalho, espiritualidade, convivencia',
      'Casos selecionados com vulnerabilidade social',
    ],
  },
};
