/**
 * TRANSTORNOS DE PERSONALIDADE - DSM-5
 * =====================================
 * Cluster A (Excentricos), B (Dramaticos) e C (Ansiosos) conforme DSM-5
 *
 * Referencias principais:
 * - DSM-5 (APA, 2013)
 * - CID-10 (OMS) e CID-11
 * - Diretrizes APA Practice Guidelines for Personality Disorders
 * - NICE Guidelines: Borderline Personality Disorder (2009, atualizado 2018)
 * - Linehan MM. Cognitive-Behavioral Treatment of Borderline Personality Disorder (1993)
 */

import type { DoencaMental } from '@/lib/types/doenca-mental';
import { DSM5_CATEGORIES } from '@/lib/types/dsm5';

/**
 * Transtornos de Personalidade - DSM-5
 *
 * Caracteristicas gerais dos transtornos de personalidade:
 * - Padrao persistente de experiencia interna e comportamento que se desvia
 *   marcadamente das expectativas da cultura do individuo
 * - O padrao e inflexivel e abrange uma ampla faixa de situacoes pessoais e sociais
 * - O padrao leva a sofrimento clinicamente significativo ou prejuizo funcional
 * - O padrao e estavel e de longa duracao, com inicio na adolescencia ou adulto jovem
 * - O padrao nao e melhor explicado por outro transtorno mental
 * - O padrao nao e atribuivel a efeitos de substancia ou outra condicao medica
 */
export const transtornosPersonalidade: Array<Partial<DoencaMental> & {
  id: string;
  titulo: string;
  categoria: 'saude_mental';
  cid10: string[];
  ciap2: string[]
}> = [
  // ============================================================================
  // CLUSTER A - EXCÊNTRICOS/ESTRANHOS
  // Caracterizado por comportamentos estranhos ou excentricos
  // ============================================================================

  // ============================================================================
  // 1. TRANSTORNO DE PERSONALIDADE PARANOIDE
  // ============================================================================
  {
    id: 'transtorno-personalidade-paranoide',
    titulo: 'Transtorno de Personalidade Paranoide',
    categoria: 'saude_mental',
    cid10: ['F60.0'],
    cid11: ['6D10.0'],
    ciap2: ['P80'],
    snomedCT: '37091000', // Paranoid personality disorder (disorder)
    doid: 'DOID:10939',
    meshId: 'D010259',
    umlsCui: 'C0030477',
    dsm5: {
      code: '301.0',
      codeAlternative: 'F60.0',
      category: DSM5_CATEGORIES.PERSONALITY,
      diagnosticCriteria: {
        code: '301.0',
        name: 'Paranoid Personality Disorder',
        category: DSM5_CATEGORIES.PERSONALITY,
        criteria: [
          {
            letter: 'A',
            text: 'Desconfianca e suspeita difusas em relacao aos outros, de modo que seus motivos sao interpretados como maldosos, comecando no inicio da vida adulta e presente em diversos contextos, conforme indicado por quatro (ou mais) dos seguintes:',
            subCriteria: [
              { text: '1. Suspeita, sem base suficiente, de estar sendo explorado, maltratado ou enganado pelos outros' },
              { text: '2. Preocupacao com duvidas injustificadas acerca da lealdade ou confiabilidade de amigos ou colegas' },
              { text: '3. Relutancia em confiar nos outros por medo infundado de que as informacoes serao usadas maldosamente contra si' },
              { text: '4. Percepcao de significados ocultos humilhantes ou ameacadores em observacoes ou eventos benignos' },
              { text: '5. Persistencia de rancores (nao perdoa insultos, ofensas ou desprezo)' },
              { text: '6. Percepcao de ataques a seu carater ou reputacao que nao sao aparentes para os outros e reacao rapida com raiva ou contra-ataque' },
              { text: '7. Suspeitas recorrentes, sem justificativa, quanto a fidelidade do conjuge ou parceiro sexual' },
            ],
          },
          {
            letter: 'B',
            text: 'Nao ocorre exclusivamente durante o curso de esquizofrenia, transtorno bipolar ou transtorno depressivo com caracteristicas psicoticas, ou outro transtorno psicotico, nem e atribuivel aos efeitos fisiologicos de outra condicao medica',
          },
        ],
        notes: 'Se os criterios sao atendidos antes do inicio da esquizofrenia, acrescentar "pre-morbido".',
      },
    },
    quickView: {
      definicao: 'Padrao difuso de desconfianca e suspeita em relacao aos outros, de modo que os motivos deles sao interpretados como maldosos. Os individuos apresentam hipervigilancia, sensibilidade a ofensas e tendencia a interpretar acoes neutras como hostis.',
      criteriosDiagnosticos: [
        'Desconfianca difusa presente desde o inicio da vida adulta',
        '4 ou mais: suspeita de exploracao, duvidas de lealdade, relutancia em confiar',
        'Percepcao de significados ocultos ameacadores',
        'Rancores persistentes, percepcao de ataques, ciume patologico',
        'Nao ocorre exclusivamente durante transtorno psicotico',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoterapia individual (abordagem cautelosa, construcao lenta de confianca)',
          'Terapia cognitivo-comportamental (TCC) - reestruturacao de crencas paranoides',
          'Terapia baseada em mentalizacao (MBT) - melhora da teoria da mente',
          'Psicoeducacao sobre o transtorno',
          'Alianca terapeutica e essencial (pode levar meses para estabelecer)',
        ],
        farmacologico: [
          'Farmacoterapia tem papel limitado no transtorno de personalidade em si',
          'ISRS: Fluoxetina, Sertralina (se ansiedade ou depressao comorbida)',
          'Antipsicoticos em baixas doses: Risperidona 0,5-2mg (se ideacao paranoide intensa)',
          'Benzodiazepinicos: evitar (risco de dependencia e desinibicao)',
        ],
      },
      redFlags: [
        'Ideacao suicida',
        'Risco de agressao (se sentir perseguido)',
        'Isolamento social extremo',
        'Transicao para transtorno psicotico (esquizofrenia)',
        'Litigiosidade excessiva',
        'Abandono de tratamento (comum)',
      ],
      examesIniciais: [
        'Avaliacao psiquiatrica completa',
        'Exclusao de causas organicas (exames de rotina)',
        'Avaliacao de comorbidades (depressao, ansiedade)',
        'Avaliar risco de violencia',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'PDQ-4+ (Personality Diagnostic Questionnaire)',
        description: 'Questionario de auto-relato para triagem de transtornos de personalidade baseado no DSM-IV.',
        cutoff: 'Pontuacao elevada sugere possivel transtorno de personalidade; requer confirmacao clinica',
        reference: 'Hyler, 1994',
      },
      {
        name: 'SCID-5-PD',
        description: 'Entrevista Clinica Estruturada para Transtornos de Personalidade do DSM-5.',
        reference: 'First et al., 2016',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TCC + MBT (Terapia Baseada em Mentalizacao)',
        frequencia: 'Semanal',
        duracao: 'Longo prazo (1-3 anos ou mais)',
      },
      farmacoterapia: {
        classe: 'Tratamento de comorbidades; papel limitado para o transtorno em si',
        medicamentos: ['fluoxetina', 'sertralina', 'risperidona'],
        doseInicial: 'Risperidona 0,5mg/dia se ideacao paranoide intensa',
        titulacao: 'Aumento gradual conforme tolerancia',
        duracao: 'Variavel, conforme sintomas-alvo',
      },
    },
    criteriosEncaminhamento: [
      'Confirmacao diagnostica por psiquiatra ou psicologo especializado',
      'Comorbidades psiquiatricas (depressao, ansiedade, uso de substancias)',
      'Risco de agressao ou litigiosidade',
      'Prejuizo funcional significativo',
      'Refratariedade a intervencoes iniciais',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: true,
      riscoAutolesao: false,
      criterios: [
        'Ideacao suicida ativa',
        'Risco iminente de violencia (se sentir perseguido)',
        'Psicose franca (transicao para esquizofrenia)',
        'Isolamento extremo com deterioracao funcional',
      ],
    },
    comorbidadesComuns: [
      'transtorno-depressivo-maior',
      'transtorno-ansiedade-generalizada',
      'transtorno-uso-alcool',
      'agorafobia',
      'transtorno-personalidade-esquizotipica',
    ],
    tags: ['personalidade', 'cluster-a', 'paranoide', 'desconfianca', 'psicoterapia', 'dsm5'],
  },

  // ============================================================================
  // 2. TRANSTORNO DE PERSONALIDADE ESQUIZOIDE
  // ============================================================================
  {
    id: 'transtorno-personalidade-esquizoide',
    titulo: 'Transtorno de Personalidade Esquizoide',
    categoria: 'saude_mental',
    cid10: ['F60.1'],
    cid11: ['6D10.1'],
    ciap2: ['P80'],
    snomedCT: '37215003', // Schizoid personality disorder (disorder)
    doid: 'DOID:10937',
    meshId: 'D012557',
    umlsCui: 'C0036360',
    dsm5: {
      code: '301.20',
      codeAlternative: 'F60.1',
      category: DSM5_CATEGORIES.PERSONALITY,
      diagnosticCriteria: {
        code: '301.20',
        name: 'Schizoid Personality Disorder',
        category: DSM5_CATEGORIES.PERSONALITY,
        criteria: [
          {
            letter: 'A',
            text: 'Padrao difuso de distanciamento das relacoes sociais e uma faixa restrita de expressao de emocoes em contextos interpessoais, comecando no inicio da vida adulta e presente em diversos contextos, conforme indicado por quatro (ou mais) dos seguintes:',
            subCriteria: [
              { text: '1. Nao deseja nem desfruta de relacoes intimas, inclusive ser parte de uma familia' },
              { text: '2. Quase sempre escolhe atividades solitarias' },
              { text: '3. Manifesta pouco, se algum, interesse em ter experiencias sexuais com outra pessoa' },
              { text: '4. Tem prazer em poucas atividades, se alguma' },
              { text: '5. Nao tem amigos intimos ou confidentes que nao sejam parentes de primeiro grau' },
              { text: '6. Mostra-se indiferente a elogios ou criticas de outros' },
              { text: '7. Demonstra frieza emocional, distanciamento ou afeto embotado' },
            ],
          },
          {
            letter: 'B',
            text: 'Nao ocorre exclusivamente durante o curso de esquizofrenia, transtorno bipolar ou transtorno depressivo com caracteristicas psicoticas, outro transtorno psicotico ou transtorno do espectro autista, nem e atribuivel aos efeitos fisiologicos de outra condicao medica',
          },
        ],
        notes: 'Se os criterios sao atendidos antes do inicio da esquizofrenia, acrescentar "pre-morbido".',
      },
    },
    quickView: {
      definicao: 'Padrao difuso de distanciamento das relacoes sociais e faixa restrita de expressao emocional. Os individuos preferem atividades solitarias, parecem indiferentes a elogios ou criticas, e demonstram afeto embotado ou frieza emocional.',
      criteriosDiagnosticos: [
        'Distanciamento das relacoes sociais desde o inicio da vida adulta',
        '4 ou mais: nao deseja relacoes intimas, atividades solitarias, pouco interesse sexual',
        'Prazer em poucas atividades, sem amigos intimos',
        'Indiferenca a elogios/criticas, frieza emocional',
        'Exclusao de TEA, esquizofrenia, depressao com psicose',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoterapia individual (respeitar necessidade de distancia)',
          'TCC: trabalhar metas concretas e habilidades sociais',
          'Terapia de apoio (sem pressao para intimidade)',
          'Terapia de grupo (exposicao gradual a interacoes)',
          'Foco em qualidade de vida, nao necessariamente em relacionamentos',
        ],
        farmacologico: [
          'Farmacoterapia tem papel muito limitado',
          'ISRS: se anedonia ou depressao comorbida',
          'Bupropiona: pode ajudar com apatia',
          'Nao ha medicamentos especificos para o transtorno',
        ],
      },
      redFlags: [
        'Deterioracao funcional progressiva',
        'Transicao para esquizofrenia',
        'Depressao grave comorbida',
        'Isolamento extremo com autonegligencia',
        'Ideacao suicida (rara, mas possivel)',
      ],
      examesIniciais: [
        'Avaliacao psiquiatrica',
        'Exclusao de TEA (transtorno do espectro autista)',
        'Exclusao de hipotireoidismo',
        'Avaliacao de depressao comorbida',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'SCID-5-PD',
        description: 'Entrevista Clinica Estruturada para Transtornos de Personalidade do DSM-5.',
        reference: 'First et al., 2016',
      },
      {
        name: 'PDQ-4+',
        description: 'Questionario de triagem para transtornos de personalidade.',
        reference: 'Hyler, 1994',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'Terapia de apoio + TCC (foco em metas concretas)',
        frequencia: 'Quinzenal ou mensal (respeitar necessidade de distancia)',
        duracao: 'Longo prazo, se paciente aceitar',
      },
      farmacoterapia: {
        classe: 'Tratamento de comorbidades apenas',
        medicamentos: ['fluoxetina', 'bupropiona'],
        doseInicial: 'Conforme indicacao clinica',
        duracao: 'Variavel',
      },
    },
    criteriosEncaminhamento: [
      'Diagnostico diferencial com TEA',
      'Comorbidade psiquiatrica significativa',
      'Deterioracao funcional',
      'Exclusao de prodromo de esquizofrenia',
    ],
    urgencia: {
      riscosuicida: false,
      riscoAgressao: false,
      riscoAutolesao: false,
      criterios: [
        'Autonegligencia grave',
        'Ideacao suicida (rara)',
        'Psicose franca',
      ],
    },
    comorbidadesComuns: [
      'transtorno-depressivo-maior',
      'transtorno-ansiedade-social',
      'transtorno-personalidade-esquizotipica',
      'transtorno-espectro-autista',
    ],
    tags: ['personalidade', 'cluster-a', 'esquizoide', 'distanciamento', 'anedonia', 'dsm5'],
  },

  // ============================================================================
  // 3. TRANSTORNO DE PERSONALIDADE ESQUIZOTIPICA
  // ============================================================================
  {
    id: 'transtorno-personalidade-esquizotipica',
    titulo: 'Transtorno de Personalidade Esquizotipica',
    categoria: 'saude_mental',
    cid10: ['F21'],
    cid11: ['6D10.2'],
    ciap2: ['P80'],
    snomedCT: '31027006', // Schizotypal personality disorder (disorder)
    doid: 'DOID:10938',
    meshId: 'D012569',
    umlsCui: 'C0036374',
    dsm5: {
      code: '301.22',
      codeAlternative: 'F21',
      category: DSM5_CATEGORIES.PERSONALITY,
      diagnosticCriteria: {
        code: '301.22',
        name: 'Schizotypal Personality Disorder',
        category: DSM5_CATEGORIES.PERSONALITY,
        criteria: [
          {
            letter: 'A',
            text: 'Padrao difuso de deficits sociais e interpessoais marcado por desconforto agudo e capacidade reduzida para relacoes intimas, bem como por distorcoes cognitivas ou perceptivas e excentricidades do comportamento, comecando no inicio da vida adulta e presente em diversos contextos, conforme indicado por cinco (ou mais) dos seguintes:',
            subCriteria: [
              { text: '1. Ideias de referencia (excluindo delirios de referencia)' },
              { text: '2. Crencas estranhas ou pensamento magico que influenciam o comportamento e sao inconsistentes com normas subculturais (supersticao, clarividencia, telepatia, "sexto sentido")' },
              { text: '3. Experiencias perceptivas incomuns, incluindo ilusoes corporais' },
              { text: '4. Pensamento e discurso estranhos (vago, circunstancial, metaforico, superelaborado ou estereotipado)' },
              { text: '5. Desconfianca ou ideacao paranoide' },
              { text: '6. Afeto inadequado ou constrito' },
              { text: '7. Comportamento ou aparencia estranha, excentrica ou peculiar' },
              { text: '8. Ausencia de amigos intimos ou confidentes que nao sejam parentes de primeiro grau' },
              { text: '9. Ansiedade social excessiva que nao diminui com a familiaridade e tende a estar associada a medos paranoides' },
            ],
          },
          {
            letter: 'B',
            text: 'Nao ocorre exclusivamente durante o curso de esquizofrenia, transtorno bipolar ou transtorno depressivo com caracteristicas psicoticas, outro transtorno psicotico ou transtorno do espectro autista',
          },
        ],
        notes: 'Se os criterios sao atendidos antes do inicio da esquizofrenia, acrescentar "pre-morbido". Considerado parte do "espectro da esquizofrenia" no DSM-5.',
      },
    },
    quickView: {
      definicao: 'Padrao difuso de deficits sociais e interpessoais com desconforto em relacoes intimas, distorcoes cognitivas ou perceptivas (ideias de referencia, pensamento magico) e comportamentos excentricos. Considerado no espectro da esquizofrenia.',
      criteriosDiagnosticos: [
        'Deficits sociais e interpessoais desde o inicio da vida adulta',
        '5 ou mais: ideias de referencia, pensamento magico, experiencias perceptivas incomuns',
        'Pensamento/discurso estranhos, desconfianca/paranoia',
        'Afeto inadequado, comportamento excentrico, sem amigos intimos',
        'Ansiedade social persistente relacionada a medos paranoides',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoterapia individual (construcao de alianca, validacao)',
          'TCC: reestruturacao de crencas distorcidas e ideias de referencia',
          'Treino de habilidades sociais',
          'Terapia de apoio focada em funcionamento',
          'Psicoeducacao sobre o transtorno',
        ],
        farmacologico: [
          'Antipsicoticos em baixas doses (sintomas quasi-psicoticos):',
          'Risperidona 0,5-2mg/dia',
          'Aripiprazol 2-10mg/dia',
          'ISRS: se ansiedade social ou depressao comorbida',
          'Monitorar atentamente para conversao a esquizofrenia',
        ],
      },
      redFlags: [
        'Transicao para esquizofrenia (psicose franca)',
        'Ideias de referencia se tornando delirantes',
        'Experiencias perceptivas evoluindo para alucinacoes',
        'Deterioracao funcional progressiva',
        'Ideacao suicida',
        'Uso de substancias (pode precipitar psicose)',
      ],
      examesIniciais: [
        'Avaliacao psiquiatrica completa',
        'Exclusao de uso de substancias',
        'Avaliacao de prodromo de esquizofrenia',
        'Exames de rotina (excluir causas organicas)',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'SPQ (Schizotypal Personality Questionnaire)',
        description: 'Questionario de 74 itens para avaliar tracos esquizotipicos.',
        cutoff: 'Pontuacoes elevadas sugerem tracos esquizotipicos significativos',
        reference: 'Raine, 1991',
      },
      {
        name: 'SCID-5-PD',
        description: 'Entrevista Clinica Estruturada para Transtornos de Personalidade.',
        reference: 'First et al., 2016',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TCC + Treino de Habilidades Sociais',
        frequencia: 'Semanal',
        duracao: 'Longo prazo (anos)',
      },
      farmacoterapia: {
        classe: 'Antipsicoticos em baixas doses + tratamento de comorbidades',
        medicamentos: ['risperidona', 'aripiprazol', 'fluoxetina', 'sertralina'],
        doseInicial: 'Risperidona 0,5mg/dia; Aripiprazol 2mg/dia',
        titulacao: 'Aumento gradual conforme resposta',
        duracao: 'Variavel; monitorar para conversao a psicose',
      },
    },
    criteriosEncaminhamento: [
      'Confirmacao diagnostica por especialista',
      'Monitoramento de risco de conversao a esquizofrenia',
      'Sintomas quasi-psicoticos intensificados',
      'Comorbidades psiquiatricas',
      'Prejuizo funcional significativo',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: false,
      riscoAutolesao: false,
      criterios: [
        'Conversao para psicose franca',
        'Ideacao suicida',
        'Deterioracao funcional aguda',
        'Delirios ou alucinacoes',
      ],
    },
    comorbidadesComuns: [
      'transtorno-depressivo-maior',
      'transtorno-ansiedade-social',
      'transtorno-personalidade-paranoide',
      'transtorno-personalidade-esquizoide',
      'esquizofrenia',
    ],
    tags: ['personalidade', 'cluster-a', 'esquizotipica', 'pensamento-magico', 'espectro-esquizofrenia', 'dsm5'],
  },

  // ============================================================================
  // CLUSTER B - DRAMÁTICOS/EMOCIONAIS/ERRÁTICOS
  // Caracterizado por comportamentos dramaticos, emocionais ou erraticos
  // ============================================================================

  // ============================================================================
  // 4. TRANSTORNO DE PERSONALIDADE ANTISSOCIAL
  // ============================================================================
  {
    id: 'transtorno-personalidade-antissocial',
    titulo: 'Transtorno de Personalidade Antissocial',
    categoria: 'saude_mental',
    cid10: ['F60.2'],
    cid11: ['6D10.3'],
    ciap2: ['P80'],
    snomedCT: '33449004', // Antisocial personality disorder (disorder)
    doid: 'DOID:10935',
    meshId: 'D000987',
    umlsCui: 'C0003993',
    dsm5: {
      code: '301.7',
      codeAlternative: 'F60.2',
      category: DSM5_CATEGORIES.PERSONALITY,
      diagnosticCriteria: {
        code: '301.7',
        name: 'Antisocial Personality Disorder',
        category: DSM5_CATEGORIES.PERSONALITY,
        criteria: [
          {
            letter: 'A',
            text: 'Padrao difuso de desconsideracao e violacao dos direitos dos outros, que ocorre desde os 15 anos de idade, conforme indicado por tres (ou mais) dos seguintes:',
            subCriteria: [
              { text: '1. Fracasso em ajustar-se as normas sociais relativas a comportamentos legais, conforme indicado pela realizacao repetida de atos que constituem motivos de detencao' },
              { text: '2. Tendencia a falsidade, conforme indicado por mentiras repetidas, uso de nomes falsos ou de trapeaca para ganho ou prazer pessoal' },
              { text: '3. Impulsividade ou fracasso em fazer planos para o futuro' },
              { text: '4. Irritabilidade e agressividade, conforme indicado por brigas corporais ou agressoes fisicas repetidas' },
              { text: '5. Desconsideracao temeraria pela seguranca de si ou de outros' },
              { text: '6. Irresponsabilidade reiterada, conforme indicado por falha repetida em manter comportamento laboral consistente ou honrar obrigacoes financeiras' },
              { text: '7. Ausencia de remorso, conforme indicado pela indiferenca ou racionalizacao em relacao a ter ferido, maltratado ou roubado outras pessoas' },
            ],
          },
          {
            letter: 'B',
            text: 'O individuo tem no minimo 18 anos de idade',
          },
          {
            letter: 'C',
            text: 'Ha evidencias de transtorno da conduta com inicio antes dos 15 anos de idade',
          },
          {
            letter: 'D',
            text: 'A ocorrencia de comportamento antissocial nao se da exclusivamente durante o curso de esquizofrenia ou transtorno bipolar',
          },
        ],
        notes: 'Este diagnostico requer evidencia de transtorno da conduta na infancia. Termos anteriores: psicopatia, sociopatia, transtorno de personalidade dissocial.',
      },
    },
    quickView: {
      definicao: 'Padrao difuso de desconsideracao e violacao dos direitos dos outros desde os 15 anos. Caracterizado por atos ilegais, falsidade, impulsividade, agressividade, irresponsabilidade e ausencia de remorso. Requer historia de transtorno de conduta na infancia.',
      criteriosDiagnosticos: [
        'Idade minima de 18 anos para diagnostico',
        'Historia de transtorno de conduta antes dos 15 anos (OBRIGATORIO)',
        '3 ou mais: atos ilegais repetidos, falsidade/mentiras, impulsividade',
        'Agressividade, desconsideracao pela seguranca, irresponsabilidade',
        'Ausencia de remorso por danos causados a outros',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Tratamento e desafiador; baixa motivacao para mudanca',
          'TCC: manejo da raiva, resolucao de problemas',
          'Terapia focada em esquemas',
          'Programas de tratamento forensico estruturado',
          'Manejo de contingencias (recompensas e consequencias)',
          'Comunidades terapeuticas (alguns casos)',
        ],
        farmacologico: [
          'Nao ha tratamento farmacologico especifico para o transtorno',
          'ISRS: se depressao ou ansiedade comorbida',
          'Estabilizadores de humor: Litio, Valproato (se agressividade/impulsividade)',
          'Antipsicoticos: Risperidona (se agressividade refrataria)',
          'Evitar benzodiazepinicos (risco de desinibicao e abuso)',
        ],
      },
      redFlags: [
        'Risco elevado de violencia e homicidio',
        'Abuso de substancias (muito comum)',
        'Risco suicida (especialmente em custodia)',
        'Envolvimento criminal repetido',
        'Violencia domestica',
        'Manipulacao do sistema de saude',
      ],
      examesIniciais: [
        'Avaliacao psiquiatrica forense',
        'Historia detalhada desde a infancia (transtorno de conduta)',
        'Rastreamento de uso de substancias',
        'Avaliacao de risco de violencia',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'PCL-R (Psychopathy Checklist - Revised)',
        description: 'Escala de 20 itens para avaliar tracos psicopaticos. Aplicada por profissional treinado.',
        cutoff: '>=30 (de 40): psicopatia; 25-29: tracos significativos',
        reference: 'Hare, 2003',
      },
      {
        name: 'HCR-20 (Historical Clinical Risk Management)',
        description: 'Instrumento de avaliacao de risco de violencia.',
        reference: 'Webster et al., 1997',
      },
      {
        name: 'SCID-5-PD',
        description: 'Entrevista Clinica Estruturada para Transtornos de Personalidade.',
        reference: 'First et al., 2016',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TCC + Manejo de Contingencias + Intervencoes forenses',
        frequencia: 'Semanal a bissemanal (se disponivel)',
        duracao: 'Longo prazo; prognostico reservado',
      },
      farmacoterapia: {
        classe: 'Tratamento de comorbidades e controle de agressividade',
        medicamentos: ['litio', 'valproato', 'risperidona', 'fluoxetina'],
        doseInicial: 'Litio 300mg 2x/dia; Valproato 250mg 2x/dia',
        titulacao: 'Titulacao padrao; monitorar niveis sericos',
        duracao: 'Longo prazo se eficaz',
      },
    },
    criteriosEncaminhamento: [
      'Avaliacao por psiquiatra forense',
      'Sistema de justica criminal (se crimes cometidos)',
      'Programa de tratamento especializado',
      'Tratamento de uso de substancias comorbido',
      'Avaliacao de risco de violencia',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: true,
      riscoAutolesao: true,
      criterios: [
        'Risco iminente de violencia',
        'Ameacas de homicidio',
        'Violencia domestica ativa',
        'Ideacao suicida (especialmente em custodia)',
        'Intoxicacao por substancias com agressividade',
      ],
    },
    comorbidadesComuns: [
      'transtorno-uso-alcool',
      'transtorno-uso-substancias',
      'transtorno-deficit-atencao-hiperatividade',
      'transtorno-depressivo-maior',
      'transtorno-personalidade-narcisista',
      'transtorno-personalidade-borderline',
    ],
    tags: ['personalidade', 'cluster-b', 'antissocial', 'psicopatia', 'sociopatia', 'forense', 'agressividade', 'dsm5'],
  },

  // ============================================================================
  // 5. TRANSTORNO DE PERSONALIDADE BORDERLINE
  // ============================================================================
  {
    id: 'transtorno-personalidade-borderline',
    titulo: 'Transtorno de Personalidade Borderline',
    categoria: 'saude_mental',
    cid10: ['F60.3'],
    cid11: ['6D10.4'],
    ciap2: ['P80'],
    snomedCT: '20010003', // Borderline personality disorder (disorder)
    doid: 'DOID:10930',
    meshId: 'D001883',
    umlsCui: 'C0006012',
    dsm5: {
      code: '301.83',
      codeAlternative: 'F60.3',
      category: DSM5_CATEGORIES.PERSONALITY,
      diagnosticCriteria: {
        code: '301.83',
        name: 'Borderline Personality Disorder',
        category: DSM5_CATEGORIES.PERSONALITY,
        criteria: [
          {
            letter: 'A',
            text: 'Padrao difuso de instabilidade das relacoes interpessoais, da autoimagem e dos afetos e de impulsividade acentuada que comeca no inicio da vida adulta e esta presente em diversos contextos, conforme indicado por cinco (ou mais) dos seguintes:',
            subCriteria: [
              { text: '1. Esforcos freneticos para evitar abandono real ou imaginario (Nota: Nao incluir comportamento suicida ou de automutilacao coberto pelo Criterio 5)' },
              { text: '2. Padrao de relacoes interpessoais instaveis e intensas caracterizado pela alternancia entre extremos de idealizacao e desvalorizacao' },
              { text: '3. Perturbacao da identidade: instabilidade acentuada e persistente da autoimagem ou da percepcao de si mesmo' },
              { text: '4. Impulsividade em pelo menos duas areas potencialmente autodestrutivas (gastos, sexo, abuso de substancia, direcao imprudente, compulsao alimentar) (Nota: Nao incluir comportamento suicida ou de automutilacao coberto pelo Criterio 5)' },
              { text: '5. Recorrencia de comportamento, gestos ou ameacas suicidas ou de comportamento automutilante' },
              { text: '6. Instabilidade afetiva devida a uma acentuada reatividade de humor (disforia episodica intensa, irritabilidade ou ansiedade geralmente durando algumas horas e apenas raramente mais de alguns dias)' },
              { text: '7. Sentimentos cronicos de vazio' },
              { text: '8. Raiva intensa e inapropriada ou dificuldade em controlar a raiva (demonstracoes frequentes de irritacao, raiva constante, brigas fisicas recorrentes)' },
              { text: '9. Ideacao paranoide transitoria associada a estresse ou sintomas dissociativos graves' },
            ],
          },
        ],
        notes: 'E o transtorno de personalidade mais estudado e com mais evidencia para tratamento. A DBT (Terapia Comportamental Dialetica) e o tratamento de escolha.',
      },
    },
    quickView: {
      definicao: 'Padrao difuso de instabilidade nas relacoes interpessoais, autoimagem e afetos, com impulsividade acentuada. Caracterizado por medo de abandono, relacoes intensas com idealizacao/desvalorizacao, perturbacao da identidade, automutilacao e instabilidade emocional intensa.',
      criteriosDiagnosticos: [
        'Instabilidade em multiplas areas desde o inicio da vida adulta',
        '5 ou mais: esforcos para evitar abandono, relacoes instaveis com idealizacao/desvalorizacao',
        'Perturbacao da identidade, impulsividade autodestrutiva',
        'Comportamento suicida ou automutilante recorrente',
        'Instabilidade afetiva, sentimentos de vazio, raiva intensa',
        'Ideacao paranoide ou dissociacao transitoria',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'DBT (Terapia Comportamental Dialetica) - PADRAO-OURO (Linehan)',
          'Componentes: terapia individual, treino de habilidades em grupo, coaching telefonico',
          'MBT (Terapia Baseada em Mentalizacao) - alternativa com boa evidencia',
          'TFP (Psicoterapia Focada na Transferencia)',
          'Schema Therapy (Terapia de Esquemas)',
          'STEPPS (Systems Training for Emotional Predictability and Problem Solving)',
          'Psicoeducacao para paciente e familia',
        ],
        farmacologico: [
          'Farmacoterapia e adjuvante, nao tratamento primario',
          'ISRS: Fluoxetina 20-80mg/dia (impulsividade, raiva)',
          'Estabilizadores de humor: Lamotrigina 100-200mg, Valproato, Topiramato',
          'Antipsicoticos atipicos em baixas doses: Quetiapina, Aripiprazol, Olanzapina',
          'Evitar benzodiazepinicos (risco de dependencia e desinibicao)',
          'Naltrexona 50mg/dia (automutilacao refrataria - off-label)',
        ],
      },
      redFlags: [
        'Comportamento suicida ativo (ideacao, plano, meios)',
        'Automutilacao grave (cortes profundos, queimaduras)',
        'Overdose intencional',
        'Comportamentos de risco extremo (direcao perigosa, sexo de risco)',
        'Psicose transitoria prolongada',
        'Abandono de tratamento',
      ],
      examesIniciais: [
        'Avaliacao psiquiatrica completa',
        'Avaliacao de risco suicida (detalhada, recorrente)',
        'Historia de trauma (comum)',
        'Rastreamento de uso de substancias',
        'Avaliacao de comorbidades (TEPT, depressao, ansiedade)',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'ZAN-BPD (Zanarini Rating Scale for BPD)',
        description: 'Escala de 9 itens para avaliar gravidade de sintomas borderline.',
        cutoff: 'Pontuacao mais alta = maior gravidade',
        reference: 'Zanarini et al., 2003',
      },
      {
        name: 'BSL-23 (Borderline Symptom List)',
        description: 'Escala de auto-relato de 23 itens para sintomas borderline.',
        cutoff: 'Pontuacao elevada indica sintomas significativos',
        reference: 'Bohus et al., 2007',
      },
      {
        name: 'DIB-R (Diagnostic Interview for Borderlines - Revised)',
        description: 'Entrevista estruturada especifica para TPB.',
        reference: 'Zanarini et al., 1989',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'DBT (Terapia Comportamental Dialetica) - PADRAO-OURO',
        frequencia: 'Terapia individual semanal + grupo de habilidades semanal',
        duracao: '1-2 anos (programa completo de DBT)',
      },
      farmacoterapia: {
        classe: 'Adjuvante; foco em sintomas-alvo especificos',
        medicamentos: ['fluoxetina', 'lamotrigina', 'quetiapina', 'aripiprazol', 'valproato'],
        doseInicial: 'Fluoxetina 20mg/dia; Lamotrigina 25mg/dia (titulacao lenta)',
        titulacao: 'Lamotrigina: aumentar 25mg a cada 2 semanas (risco de SJS)',
        duracao: 'Variavel; avaliar periodicamente necessidade',
      },
    },
    criteriosEncaminhamento: [
      'Todos os casos confirmados devem ser encaminhados para psicoterapia especializada',
      'Programa de DBT quando disponivel',
      'Risco suicida recorrente',
      'Automutilacao grave ou refrataria',
      'Comorbidades graves (TEPT, uso de substancias)',
      'Hospitalizacao psiquiatrica se risco iminente',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: true,
      riscoAutolesao: true,
      criterios: [
        'Ideacao suicida ativa com plano',
        'Tentativa de suicidio',
        'Automutilacao grave (cortes profundos, queimaduras graves)',
        'Overdose intencional',
        'Psicose transitoria com agitacao',
        'Comportamento violento',
      ],
    },
    comorbidadesComuns: [
      'transtorno-depressivo-maior',
      'transtorno-estresse-pos-traumatico',
      'transtorno-uso-substancias',
      'transtornos-alimentares',
      'transtorno-ansiedade-generalizada',
      'transtorno-deficit-atencao-hiperatividade',
      'transtorno-personalidade-narcisista',
    ],
    tags: ['personalidade', 'cluster-b', 'borderline', 'dbt', 'automutilacao', 'instabilidade', 'linehan', 'dsm5'],
  },

  // ============================================================================
  // 6. TRANSTORNO DE PERSONALIDADE HISTRIONICA
  // ============================================================================
  {
    id: 'transtorno-personalidade-histrionica',
    titulo: 'Transtorno de Personalidade Histrionica',
    categoria: 'saude_mental',
    cid10: ['F60.4'],
    cid11: ['6D10.5'],
    ciap2: ['P80'],
    snomedCT: '80384001', // Histrionic personality disorder (disorder)
    doid: 'DOID:10936',
    meshId: 'D006677',
    umlsCui: 'C0020188',
    dsm5: {
      code: '301.50',
      codeAlternative: 'F60.4',
      category: DSM5_CATEGORIES.PERSONALITY,
      diagnosticCriteria: {
        code: '301.50',
        name: 'Histrionic Personality Disorder',
        category: DSM5_CATEGORIES.PERSONALITY,
        criteria: [
          {
            letter: 'A',
            text: 'Padrao difuso de emocionalidade e busca de atencao em excesso que comeca no inicio da vida adulta e esta presente em diversos contextos, conforme indicado por cinco (ou mais) dos seguintes:',
            subCriteria: [
              { text: '1. Desconforto em situacoes em que nao e o centro das atencoes' },
              { text: '2. A interacao com os outros frequentemente se caracteriza por comportamento sexualmente sedutor inadequado ou provocativo' },
              { text: '3. Exibe mudanca rapida e expressao superficial das emocoes' },
              { text: '4. Usa reiteradamente a aparencia fisica para chamar atencao para si' },
              { text: '5. Tem um estilo de discurso excessivamente impressionista e carente de detalhes' },
              { text: '6. Mostra autodramatizacao, teatralidade e expressao emocional exagerada' },
              { text: '7. E sugestionavel (facilmente influenciado pelos outros ou pelas circunstancias)' },
              { text: '8. Considera as relacoes mais intimas do que na realidade sao' },
            ],
          },
        ],
        notes: 'Historicamente mais diagnosticado em mulheres, mas pode refletir vies diagnostico. O termo "histeria" foi abandonado.',
      },
    },
    quickView: {
      definicao: 'Padrao difuso de emocionalidade excessiva e busca de atencao. Caracterizado por desconforto quando nao e o centro das atencoes, comportamento sedutor, mudancas rapidas de humor, autodramatizacao e sugestionabilidade.',
      criteriosDiagnosticos: [
        'Emocionalidade e busca de atencao excessivas desde o inicio da vida adulta',
        '5 ou mais: desconforto se nao e centro das atencoes, comportamento sedutor',
        'Mudanca rapida de emocoes, uso da aparencia para chamar atencao',
        'Discurso impressionista sem detalhes, autodramatizacao exagerada',
        'Sugestionabilidade, considera relacoes mais intimas do que sao',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoterapia individual (foco em padroes relacionais)',
          'TCC: identificar crencas sobre necessidade de atencao',
          'Terapia psicodinamica (insight sobre padroes)',
          'Terapia de grupo (feedback interpessoal)',
          'Foco em relacionamentos autenticos vs. dramatizacao',
        ],
        farmacologico: [
          'Farmacoterapia e para comorbidades, nao para o transtorno em si',
          'ISRS: se depressao ou ansiedade comorbida',
          'Estabilizadores de humor: se labilidade afetiva intensa',
          'Evitar benzodiazepinicos (risco de dependencia)',
        ],
      },
      redFlags: [
        'Comportamento suicida (pode ser manipulativo, mas risco real existe)',
        'Uso de substancias',
        'Comportamentos de risco (sexual, financeiro)',
        'Conflitos interpessoais graves',
        'Depressao comorbida',
      ],
      examesIniciais: [
        'Avaliacao psiquiatrica',
        'Avaliacao de comorbidades',
        'Diagnostico diferencial com TPB e narcisista',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'SCID-5-PD',
        description: 'Entrevista Clinica Estruturada para Transtornos de Personalidade.',
        reference: 'First et al., 2016',
      },
      {
        name: 'PDQ-4+',
        description: 'Questionario de triagem para transtornos de personalidade.',
        reference: 'Hyler, 1994',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TCC + Terapia Psicodinamica',
        frequencia: 'Semanal',
        duracao: 'Longo prazo (1-2 anos)',
      },
      farmacoterapia: {
        classe: 'Tratamento de comorbidades apenas',
        medicamentos: ['fluoxetina', 'sertralina', 'lamotrigina'],
        doseInicial: 'Conforme indicacao clinica',
        duracao: 'Variavel',
      },
    },
    criteriosEncaminhamento: [
      'Confirmacao diagnostica',
      'Comorbidades psiquiatricas',
      'Comportamentos de risco',
      'Prejuizo funcional significativo',
      'Dificuldades interpessoais graves',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: false,
      riscoAutolesao: true,
      criterios: [
        'Comportamento suicida (pode ser manipulativo, mas avaliar risco real)',
        'Comportamentos de risco extremo',
        'Depressao grave comorbida',
      ],
    },
    comorbidadesComuns: [
      'transtorno-depressivo-maior',
      'transtorno-ansiedade-generalizada',
      'transtorno-somatizacao',
      'transtorno-personalidade-borderline',
      'transtorno-personalidade-narcisista',
      'transtorno-uso-substancias',
    ],
    tags: ['personalidade', 'cluster-b', 'histrionica', 'emocionalidade', 'atencao', 'dsm5'],
  },

  // ============================================================================
  // 7. TRANSTORNO DE PERSONALIDADE NARCISISTA
  // ============================================================================
  {
    id: 'transtorno-personalidade-narcisista',
    titulo: 'Transtorno de Personalidade Narcisista',
    categoria: 'saude_mental',
    cid10: ['F60.81'],
    cid11: ['6D10.6'],
    ciap2: ['P80'],
    snomedCT: '55341008', // Narcissistic personality disorder (disorder)
    doid: 'DOID:10931',
    meshId: 'D010554',
    umlsCui: 'C0027438',
    dsm5: {
      code: '301.81',
      codeAlternative: 'F60.81',
      category: DSM5_CATEGORIES.PERSONALITY,
      diagnosticCriteria: {
        code: '301.81',
        name: 'Narcissistic Personality Disorder',
        category: DSM5_CATEGORIES.PERSONALITY,
        criteria: [
          {
            letter: 'A',
            text: 'Padrao difuso de grandiosidade (em fantasia ou comportamento), necessidade de admiracao e falta de empatia que comeca no inicio da vida adulta e esta presente em diversos contextos, conforme indicado por cinco (ou mais) dos seguintes:',
            subCriteria: [
              { text: '1. Tem senso grandioso da propria importancia (exagera conquistas e talentos, espera ser reconhecido como superior sem realizacoes proporcionais)' },
              { text: '2. E preocupado com fantasias de sucesso ilimitado, poder, brilho, beleza ou amor ideal' },
              { text: '3. Acredita ser "especial" e unico e que somente pode ser compreendido ou deve se associar a outras pessoas (ou instituicoes) especiais ou de condicao elevada' },
              { text: '4. Demanda admiracao excessiva' },
              { text: '5. Tem expectativas de tratamento especialmente favoravel ou obediencia automatica as suas expectativas' },
              { text: '6. E explorador em relacoes interpessoais (tira vantagem de outros para atingir seus proprios fins)' },
              { text: '7. Carece de empatia: reluta em reconhecer ou identificar-se com os sentimentos e as necessidades dos outros' },
              { text: '8. E frequentemente invejoso dos outros ou acredita que os outros tem inveja dele' },
              { text: '9. Demonstra comportamentos ou atitudes arrogantes e insolentes' },
            ],
          },
        ],
        notes: 'A fragilidade da autoestima torna o individuo vulneravel a "feridas narcisicas" de criticas ou derrotas. Subtipos: narcisismo grandioso vs. vulneravel.',
      },
    },
    quickView: {
      definicao: 'Padrao difuso de grandiosidade (em fantasia ou comportamento), necessidade de admiracao e falta de empatia. Caracterizado por senso exagerado de importancia, fantasias de sucesso/poder, crenca de ser especial, demanda de admiracao e exploracao dos outros.',
      criteriosDiagnosticos: [
        'Grandiosidade, necessidade de admiracao e falta de empatia desde inicio da vida adulta',
        '5 ou mais: senso grandioso de importancia, fantasias de sucesso/poder',
        'Crenca de ser "especial", demanda de admiracao excessiva',
        'Expectativa de tratamento favoravel, exploracao interpessoal',
        'Falta de empatia, inveja, comportamento arrogante',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoterapia individual (abordagem cautelosa com a grandiosidade)',
          'TFP (Psicoterapia Focada na Transferencia) - trabalha relacoes objetais',
          'Terapia de esquemas',
          'TCC: trabalhar crencas de superioridade e entitlement',
          'Foco em desenvolver empatia e relacionamentos autenticos',
          'Pacientes frequentemente buscam ajuda por depressao ou problemas interpessoais',
        ],
        farmacologico: [
          'Farmacoterapia e para comorbidades, nao para o transtorno em si',
          'ISRS: se depressao comorbida (comum apos "feridas narcisicas")',
          'Estabilizadores de humor: se raiva ou irritabilidade intensas',
          'Nao ha medicamentos especificos para narcisismo',
        ],
      },
      redFlags: [
        'Depressao grave apos fracasso ou rejeicao ("ferida narcisica")',
        'Ideacao suicida (especialmente apos humilhacao)',
        'Raiva intensa e potencial para agressao',
        'Uso de substancias',
        'Comportamentos de risco para manter imagem',
        'Abandono de tratamento (comum)',
      ],
      examesIniciais: [
        'Avaliacao psiquiatrica',
        'Avaliacao de comorbidades (depressao, uso de substancias)',
        'Diagnostico diferencial com transtorno bipolar (mania)',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'NPI (Narcissistic Personality Inventory)',
        description: 'Questionario de 40 itens para tracos narcisistas. Mais usado em pesquisa.',
        cutoff: 'Pontuacao mais alta = mais tracos narcisistas',
        reference: 'Raskin & Hall, 1979',
      },
      {
        name: 'PNI (Pathological Narcissism Inventory)',
        description: 'Avalia narcisismo grandioso e vulneravel.',
        reference: 'Pincus et al., 2009',
      },
      {
        name: 'SCID-5-PD',
        description: 'Entrevista Clinica Estruturada para Transtornos de Personalidade.',
        reference: 'First et al., 2016',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TFP ou Terapia de Esquemas',
        frequencia: 'Semanal a bissemanal',
        duracao: 'Longo prazo (2-4 anos)',
      },
      farmacoterapia: {
        classe: 'Tratamento de comorbidades apenas',
        medicamentos: ['fluoxetina', 'sertralina', 'lamotrigina'],
        doseInicial: 'Conforme indicacao clinica',
        duracao: 'Variavel',
      },
    },
    criteriosEncaminhamento: [
      'Confirmacao diagnostica',
      'Depressao ou ideacao suicida',
      'Comorbidades psiquiatricas',
      'Dificuldades interpessoais graves',
      'Prejuizo funcional significativo',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: true,
      riscoAutolesao: false,
      criterios: [
        'Depressao grave apos humilhacao/fracasso',
        'Ideacao suicida',
        'Raiva intensa com risco de agressao',
        'Uso de substancias com descontrole',
      ],
    },
    comorbidadesComuns: [
      'transtorno-depressivo-maior',
      'transtorno-uso-substancias',
      'transtorno-ansiedade-generalizada',
      'transtorno-personalidade-histrionica',
      'transtorno-personalidade-antisocial',
    ],
    tags: ['personalidade', 'cluster-b', 'narcisista', 'grandiosidade', 'empatia', 'dsm5'],
  },

  // ============================================================================
  // CLUSTER C - ANSIOSOS/TEMEROSOS
  // Caracterizado por comportamentos ansiosos ou temerosos
  // ============================================================================

  // ============================================================================
  // 8. TRANSTORNO DE PERSONALIDADE EVITATIVA
  // ============================================================================
  {
    id: 'transtorno-personalidade-evitativa',
    titulo: 'Transtorno de Personalidade Evitativa',
    categoria: 'saude_mental',
    cid10: ['F60.6'],
    cid11: ['6D10.7'],
    ciap2: ['P80'],
    snomedCT: '23350003', // Avoidant personality disorder (disorder)
    doid: 'DOID:10932',
    meshId: 'D010554',
    umlsCui: 'C0009181',
    dsm5: {
      code: '301.82',
      codeAlternative: 'F60.6',
      category: DSM5_CATEGORIES.PERSONALITY,
      diagnosticCriteria: {
        code: '301.82',
        name: 'Avoidant Personality Disorder',
        category: DSM5_CATEGORIES.PERSONALITY,
        criteria: [
          {
            letter: 'A',
            text: 'Padrao difuso de inibicao social, sentimentos de inadequacao e hipersensibilidade a avaliacao negativa que comeca no inicio da vida adulta e esta presente em diversos contextos, conforme indicado por quatro (ou mais) dos seguintes:',
            subCriteria: [
              { text: '1. Evita atividades profissionais que envolvam contato interpessoal significativo por medo de criticas, desaprovacao ou rejeicao' },
              { text: '2. Nao se dispoe a envolver-se com pessoas, a nao ser que tenha certeza de que sera bem recebido' },
              { text: '3. Mostra-se reservado em relacionamentos intimos por medo de passar vergonha ou de ser ridicularizado' },
              { text: '4. Preocupa-se com criticas ou rejeicao em situacoes sociais' },
              { text: '5. Inibe-se em situacoes interpessoais novas em razao de sentimentos de inadequacao' },
              { text: '6. Ve a si mesmo como socialmente incapaz, sem atrativos pessoais ou inferior aos outros' },
              { text: '7. E extraordinariamente reticente em assumir riscos pessoais ou envolver-se em quaisquer novas atividades, pois estas podem ser embaracosas' },
            ],
          },
        ],
        notes: 'Diferencia-se do transtorno de ansiedade social pela pervasividade e pelo senso de inadequacao pessoal. Frequentemente ha sobreposicao com TAS.',
      },
    },
    quickView: {
      definicao: 'Padrao difuso de inibicao social, sentimentos de inadequacao e hipersensibilidade a avaliacao negativa. Caracterizado por evitacao de atividades sociais por medo de critica, reserva em relacionamentos e visao de si como inadequado ou inferior.',
      criteriosDiagnosticos: [
        'Inibicao social, sentimentos de inadequacao e hipersensibilidade desde inicio da vida adulta',
        '4 ou mais: evita atividades por medo de critica, nao se envolve sem certeza de aceitacao',
        'Reservado em relacionamentos por medo de vergonha',
        'Preocupacao com criticas, inibicao em situacoes novas',
        'Ve-se como inadequado/inferior, reticente a assumir riscos',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'TCC: exposicao gradual a situacoes sociais evitadas',
          'Reestruturacao cognitiva (crencas de inadequacao)',
          'Treino de habilidades sociais',
          'Terapia de grupo (exposicao em ambiente seguro)',
          'Terapia de aceitacao e compromisso (ACT)',
          'Boa resposta ao tratamento, prognostico favoravel',
        ],
        farmacologico: [
          'ISRS: Sertralina, Paroxetina, Escitalopram (como no TAS)',
          'IRSN: Venlafaxina XR',
          'MAOIs: Fenelzina (eficaz, mas pouco usado por efeitos colaterais)',
          'Pregabalina (alternativa)',
          'Benzodiazepinicos: uso cauteloso, curto prazo',
        ],
      },
      redFlags: [
        'Depressao grave por isolamento',
        'Ideacao suicida',
        'Uso de substancias (automedicacao)',
        'Prejuizo funcional extremo (incapacidade para trabalho)',
        'Agorafobia grave',
      ],
      examesIniciais: [
        'Avaliacao psiquiatrica',
        'Avaliacao de TAS comorbido',
        'Rastreamento de depressao',
        'Avaliacao de uso de substancias',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'LSAS (Liebowitz Social Anxiety Scale)',
        description: 'Escala de 24 itens para ansiedade social. Util tambem para TP evitativa.',
        cutoff: 'Pontuacao elevada indica ansiedade social significativa',
        reference: 'Liebowitz, 1987',
      },
      {
        name: 'SCID-5-PD',
        description: 'Entrevista Clinica Estruturada para Transtornos de Personalidade.',
        reference: 'First et al., 2016',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TCC com exposicao + Treino de Habilidades Sociais',
        frequencia: 'Semanal',
        duracao: '6-12 meses (boa resposta ao tratamento)',
      },
      farmacoterapia: {
        classe: 'ISRS/IRSN (como no TAS)',
        medicamentos: ['sertralina', 'paroxetina', 'escitalopram', 'venlafaxina'],
        doseInicial: 'Sertralina 50mg/dia; Escitalopram 10mg/dia',
        titulacao: 'Aumentar conforme resposta e tolerancia',
        duracao: '12-24 meses apos resposta',
      },
    },
    criteriosEncaminhamento: [
      'Confirmacao diagnostica',
      'TCC especializada em ansiedade social',
      'Depressao comorbida grave',
      'Prejuizo funcional significativo',
      'Refratariedade a tratamento inicial',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: false,
      riscoAutolesao: false,
      criterios: [
        'Depressao grave com ideacao suicida',
        'Isolamento extremo com deterioracao',
        'Uso problematico de substancias',
      ],
    },
    comorbidadesComuns: [
      'transtorno-ansiedade-social',
      'transtorno-depressivo-maior',
      'transtorno-ansiedade-generalizada',
      'agorafobia',
      'transtorno-personalidade-dependente',
    ],
    tags: ['personalidade', 'cluster-c', 'evitativa', 'inibicao-social', 'hipersensibilidade', 'dsm5'],
  },

  // ============================================================================
  // 9. TRANSTORNO DE PERSONALIDADE DEPENDENTE
  // ============================================================================
  {
    id: 'transtorno-personalidade-dependente',
    titulo: 'Transtorno de Personalidade Dependente',
    categoria: 'saude_mental',
    cid10: ['F60.7'],
    cid11: ['6D10.8'],
    ciap2: ['P80'],
    snomedCT: '52867009', // Dependent personality disorder (disorder)
    doid: 'DOID:10934',
    meshId: 'D003859',
    umlsCui: 'C0011560',
    dsm5: {
      code: '301.6',
      codeAlternative: 'F60.7',
      category: DSM5_CATEGORIES.PERSONALITY,
      diagnosticCriteria: {
        code: '301.6',
        name: 'Dependent Personality Disorder',
        category: DSM5_CATEGORIES.PERSONALITY,
        criteria: [
          {
            letter: 'A',
            text: 'Necessidade difusa e excessiva de ser cuidado, que leva a comportamento submisso e de apego e medo de separacao, comecando no inicio da vida adulta e presente em diversos contextos, conforme indicado por cinco (ou mais) dos seguintes:',
            subCriteria: [
              { text: '1. Tem dificuldade em tomar decisoes cotidianas sem quantidade excessiva de conselhos e reasseguramentos de outros' },
              { text: '2. Precisa que os outros assumam responsabilidade pela maioria das principais areas de sua vida' },
              { text: '3. Tem dificuldade em expressar desacordo com outros devido a medo de perder apoio ou aprovacao (Nota: Nao inclui medos realistas de retaliacao)' },
              { text: '4. Tem dificuldade em iniciar projetos ou fazer coisas por conta propria (devido a falta de autoconfianca em seu julgamento ou capacidades, em vez de falta de motivacao ou energia)' },
              { text: '5. Vai a extremos para obter carinho e apoio de outros, a ponto de voluntariar-se para fazer coisas desagradaveis' },
              { text: '6. Sente-se desconfortavel ou desamparado quando sozinho devido a medos exagerados de ser incapaz de cuidar de si mesmo' },
              { text: '7. Busca urgentemente outro relacionamento como fonte de cuidado e amparo quando um relacionamento intimo termina' },
              { text: '8. Tem preocupacao irrealista com medos de ser abandonado a propria sorte' },
            ],
          },
        ],
        notes: 'Diferente da dependencia normal em certas culturas ou fases da vida. Vulnerabilidade a relacionamentos abusivos.',
      },
    },
    quickView: {
      definicao: 'Necessidade difusa e excessiva de ser cuidado, levando a comportamento submisso, de apego e medo de separacao. Caracterizado por dificuldade em tomar decisoes, necessidade de que outros assumam responsabilidades, dificuldade de expressar desacordo e medo de ficar sozinho.',
      criteriosDiagnosticos: [
        'Necessidade excessiva de ser cuidado desde inicio da vida adulta',
        '5 ou mais: dificuldade em decisoes cotidianas, precisa que outros assumam responsabilidades',
        'Dificuldade em expressar desacordo, dificuldade em iniciar projetos sozinho',
        'Vai a extremos para obter apoio, desconfortavel quando sozinho',
        'Busca urgente de novo relacionamento apos termino, medo de abandono',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'TCC: desenvolver autonomia e autoeficacia',
          'Treino de assertividade',
          'Reestruturacao de crencas de incapacidade',
          'Terapia psicodinamica (padroes de dependencia)',
          'Terapia de grupo (apoio social saudavel)',
          'Atencao ao risco de dependencia do terapeuta',
        ],
        farmacologico: [
          'Farmacoterapia e para comorbidades',
          'ISRS: se depressao ou ansiedade comorbida',
          'Benzodiazepinicos: evitar (risco de dependencia)',
        ],
      },
      redFlags: [
        'Relacionamentos abusivos (vulnerabilidade alta)',
        'Depressao grave apos separacao',
        'Ideacao suicida (especialmente apos termino)',
        'Comportamento de risco para manter relacionamento',
        'Dependencia do terapeuta',
      ],
      examesIniciais: [
        'Avaliacao psiquiatrica',
        'Avaliacao de relacionamentos abusivos',
        'Rastreamento de depressao e ansiedade',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'SCID-5-PD',
        description: 'Entrevista Clinica Estruturada para Transtornos de Personalidade.',
        reference: 'First et al., 2016',
      },
      {
        name: 'PDQ-4+',
        description: 'Questionario de triagem para transtornos de personalidade.',
        reference: 'Hyler, 1994',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TCC focada em autonomia + Treino de Assertividade',
        frequencia: 'Semanal',
        duracao: '1-2 anos',
      },
      farmacoterapia: {
        classe: 'Tratamento de comorbidades apenas',
        medicamentos: ['fluoxetina', 'sertralina', 'escitalopram'],
        doseInicial: 'Conforme indicacao clinica',
        duracao: 'Variavel',
      },
    },
    criteriosEncaminhamento: [
      'Confirmacao diagnostica',
      'Relacionamento abusivo (encaminhamento para assistencia social)',
      'Depressao ou ansiedade comorbida',
      'Prejuizo funcional significativo',
    ],
    urgencia: {
      riscosuicida: true,
      riscoAgressao: false,
      riscoAutolesao: false,
      criterios: [
        'Depressao grave apos separacao',
        'Ideacao suicida',
        'Situacao de abuso domestico',
      ],
    },
    comorbidadesComuns: [
      'transtorno-depressivo-maior',
      'transtorno-ansiedade-generalizada',
      'transtorno-panico',
      'agorafobia',
      'transtorno-personalidade-evitativa',
      'transtorno-personalidade-borderline',
    ],
    tags: ['personalidade', 'cluster-c', 'dependente', 'submissao', 'medo-separacao', 'dsm5'],
  },

  // ============================================================================
  // 10. TRANSTORNO DE PERSONALIDADE OBSESSIVO-COMPULSIVA (TPOC)
  // ============================================================================
  {
    id: 'transtorno-personalidade-obsessivo-compulsiva',
    titulo: 'Transtorno de Personalidade Obsessivo-Compulsiva',
    categoria: 'saude_mental',
    cid10: ['F60.5'],
    cid11: ['6D10.9'],
    ciap2: ['P80'],
    snomedCT: '268624000', // Obsessive-compulsive personality disorder (disorder)
    doid: 'DOID:10933',
    meshId: 'D003192',
    umlsCui: 'C0028769',
    dsm5: {
      code: '301.4',
      codeAlternative: 'F60.5',
      category: DSM5_CATEGORIES.PERSONALITY,
      diagnosticCriteria: {
        code: '301.4',
        name: 'Obsessive-Compulsive Personality Disorder',
        category: DSM5_CATEGORIES.PERSONALITY,
        criteria: [
          {
            letter: 'A',
            text: 'Padrao difuso de preocupacao com ordem, perfeccionismo e controle mental e interpessoal, a custa de flexibilidade, abertura e eficiencia, comecando no inicio da vida adulta e presente em diversos contextos, conforme indicado por quatro (ou mais) dos seguintes:',
            subCriteria: [
              { text: '1. Preocupacao com detalhes, regras, listas, ordem, organizacao ou horarios a ponto de o objetivo principal da atividade ser perdido' },
              { text: '2. Perfeccionismo que interfere na conclusao de tarefas (p. ex., incapaz de completar um projeto porque seus padroes demasiadamente rigidos nao sao atendidos)' },
              { text: '3. Devocao excessiva ao trabalho e a produtividade em detrimento de atividades de lazer e amizades (nao explicada por necessidade economica evidente)' },
              { text: '4. Escrupulosidade, meticulosidade e inflexibilidade excessivas em questoes de moralidade, etica ou valores (nao explicadas por identificacao cultural ou religiosa)' },
              { text: '5. Incapacidade de descartar objetos usados ou sem valor mesmo quando nao tem valor sentimental' },
              { text: '6. Relutancia em delegar tarefas ou trabalhar com outros a menos que se submetam a sua forma exata de fazer as coisas' },
              { text: '7. Adota estilo miseravel de gastos consigo e com outros; dinheiro e visto como algo a ser acumulado para catastrofes futuras' },
              { text: '8. Exibe rigidez e teimosia' },
            ],
          },
        ],
        notes: 'TPOC e DIFERENTE de TOC (Transtorno Obsessivo-Compulsivo). No TPOC, os tracos sao egosintonicos (vistos como parte de si). No TOC, obsessoes e compulsoes sao egodistonicas (causam sofrimento).',
      },
    },
    quickView: {
      definicao: 'Padrao difuso de preocupacao com ordem, perfeccionismo e controle mental e interpessoal, a custa de flexibilidade e eficiencia. DIFERENTE de TOC: no TPOC os tracos sao egosintonicos (vistos como valores positivos), nao ha obsessoes ou compulsoes tipicas.',
      criteriosDiagnosticos: [
        'Preocupacao com ordem, perfeccionismo e controle desde inicio da vida adulta',
        '4 ou mais: preocupacao excessiva com detalhes/regras, perfeccionismo que impede conclusao',
        'Devocao excessiva ao trabalho, escrupulosidade/inflexibilidade moral',
        'Dificuldade em descartar objetos, relutancia em delegar',
        'Estilo miseravel de gastos, rigidez e teimosia',
        'DIFERENTE de TOC: sem obsessoes/compulsoes egodistonicas',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'TCC: flexibilizar padroes rigidos, reestruturacao cognitiva',
          'Foco em custo-beneficio do perfeccionismo',
          'Trabalhar delegacao e aceitacao de imperfeicao',
          'Terapia psicodinamica (insight sobre origens)',
          'Pacientes frequentemente buscam ajuda por estresse, conflitos interpessoais',
          'Alianca terapeutica pode ser desafiadora (tentativa de controlar terapia)',
        ],
        farmacologico: [
          'Farmacoterapia e para comorbidades, nao para o transtorno em si',
          'ISRS: se ansiedade ou depressao comorbida',
          'ISRS em altas doses se TOC comorbido',
        ],
      },
      redFlags: [
        'Burnout por workoholism',
        'Depressao grave',
        'Conflitos interpessoais graves (familia, trabalho)',
        'TOC comorbido nao tratado',
        'Transtorno de acumulacao grave',
      ],
      examesIniciais: [
        'Avaliacao psiquiatrica',
        'Diagnostico diferencial com TOC',
        'Avaliacao de comorbidades',
        'Avaliacao de funcionamento no trabalho e relacoes',
      ],
    },
    escalasAvaliacao: [
      {
        name: 'SCID-5-PD',
        description: 'Entrevista Clinica Estruturada para Transtornos de Personalidade.',
        reference: 'First et al., 2016',
      },
      {
        name: 'PDQ-4+',
        description: 'Questionario de triagem para transtornos de personalidade.',
        reference: 'Hyler, 1994',
      },
      {
        name: 'Y-BOCS (para diferenciar de TOC)',
        description: 'Yale-Brown Obsessive Compulsive Scale - para avaliar se ha TOC comorbido.',
        reference: 'Goodman et al., 1989',
      },
    ],
    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TCC focada em flexibilidade + Terapia Psicodinamica',
        frequencia: 'Semanal',
        duracao: '1-2 anos',
      },
      farmacoterapia: {
        classe: 'Tratamento de comorbidades apenas',
        medicamentos: ['fluoxetina', 'sertralina', 'escitalopram'],
        doseInicial: 'Conforme indicacao clinica',
        duracao: 'Variavel',
      },
    },
    criteriosEncaminhamento: [
      'Confirmacao diagnostica e diferenciacao de TOC',
      'Depressao ou ansiedade comorbida',
      'Burnout ou estresse ocupacional grave',
      'Conflitos familiares significativos',
      'Acumulacao grave',
    ],
    urgencia: {
      riscosuicida: false,
      riscoAgressao: false,
      riscoAutolesao: false,
      criterios: [
        'Depressao grave',
        'Burnout com ideacao suicida',
        'TOC grave comorbido nao tratado',
      ],
    },
    comorbidadesComuns: [
      'transtorno-obsessivo-compulsivo',
      'transtorno-depressivo-maior',
      'transtorno-ansiedade-generalizada',
      'transtorno-acumulacao',
    ],
    tags: ['personalidade', 'cluster-c', 'obsessivo-compulsiva', 'tpoc', 'perfeccionismo', 'controle', 'diferente-toc', 'dsm5'],
  },
];

/**
 * Caracteristicas gerais dos clusters de transtornos de personalidade
 */
export const clustersPesonalidade = {
  clusterA: {
    nome: 'Cluster A - Excentricos/Estranhos',
    descricao: 'Caracterizado por comportamentos estranhos ou excentricos',
    transtornos: ['Paranoide', 'Esquizoide', 'Esquizotipica'],
    caracteristicasComuns: [
      'Distanciamento ou desconfianca em relacoes',
      'Pensamento ou comportamento peculiar',
      'Dificuldade de intimidade',
      'Possivel relacao genetica com esquizofrenia (especialmente esquizotipica)',
    ],
  },
  clusterB: {
    nome: 'Cluster B - Dramaticos/Emocionais/Erraticos',
    descricao: 'Caracterizado por comportamentos dramaticos, emocionais ou erraticos',
    transtornos: ['Antissocial', 'Borderline', 'Histrionica', 'Narcisista'],
    caracteristicasComuns: [
      'Instabilidade emocional ou impulsividade',
      'Dificuldades interpessoais intensas',
      'Comportamentos de alto risco',
      'Maior busca por atendimento de emergencia',
    ],
  },
  clusterC: {
    nome: 'Cluster C - Ansiosos/Temerosos',
    descricao: 'Caracterizado por comportamentos ansiosos ou temerosos',
    transtornos: ['Evitativa', 'Dependente', 'Obsessivo-Compulsiva'],
    caracteristicasComuns: [
      'Ansiedade ou medo proeminentes',
      'Inibicao ou dependencia',
      'Melhor prognostico com tratamento',
      'Frequente sobreposicao com transtornos de ansiedade',
    ],
  },
};

/**
 * Diferencas entre TPOC e TOC
 * (Pergunta frequente em clinica e prova)
 */
export const diferencaTPOCvsTOC = {
  tpoc: {
    nome: 'Transtorno de Personalidade Obsessivo-Compulsiva (TPOC)',
    codigo: 'F60.5 / 301.4',
    caracteristicas: [
      'Tracos egosintonicos (vistos como valores positivos)',
      'Perfeccionismo, rigidez, controle',
      'Nao ha obsessoes ou compulsoes classicas',
      'Padrao persistente de personalidade',
      'Foco em ordem, trabalho, moral',
      'Tratamento: TCC para flexibilidade',
    ],
  },
  toc: {
    nome: 'Transtorno Obsessivo-Compulsivo (TOC)',
    codigo: 'F42 / 300.3',
    caracteristicas: [
      'Obsessoes e compulsoes egodistonicas (causam sofrimento)',
      'Obsessoes: pensamentos intrusivos indesejados',
      'Compulsoes: comportamentos repetitivos para aliviar ansiedade',
      'Reconhece que e excessivo/irracional',
      'Temas: contaminacao, simetria, duvida, agressao',
      'Tratamento: TCC com ERP (exposicao e prevencao de resposta) + ISRS',
    ],
  },
  comorbidade: 'Podem coexistir, mas sao diagnosticos distintos. Nem todos com TOC tem TPOC e vice-versa.',
};

/**
 * Modelo alternativo de transtornos de personalidade do DSM-5 (Secao III)
 * Abordagem dimensional vs. categorica
 */
export const modeloAlternativoDSM5 = {
  descricao: 'Modelo dimensional na Secao III do DSM-5 (para estudo)',
  criterioA: {
    nome: 'Prejuizo no funcionamento da personalidade',
    dominios: ['Self (identidade, autodirecao)', 'Interpessoal (empatia, intimidade)'],
  },
  criterioB: {
    nome: 'Tracos de personalidade patologicos',
    dominios: [
      'Afetividade negativa (vs. Estabilidade emocional)',
      'Distanciamento (vs. Extroversao)',
      'Antagonismo (vs. Agradabilidade)',
      'Desinibicao (vs. Conscienciosidade)',
      'Psicoticismo (vs. Lucidez)',
    ],
  },
  transtornosRetidos: [
    'Antissocial',
    'Evitativa',
    'Borderline',
    'Narcisista',
    'Obsessivo-Compulsiva',
    'Esquizotipica',
  ],
  nota: 'O modelo categorico tradicional permanece como padrao no DSM-5. O modelo alternativo esta na Secao III para pesquisa.',
};
