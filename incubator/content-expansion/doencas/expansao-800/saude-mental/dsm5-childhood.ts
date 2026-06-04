/**
 * TRANSTORNOS DO NEURODESENVOLVIMENTO E INFANCIA - DSM-5
 * =======================================================
 * Transtornos do neurodesenvolvimento conforme DSM-5
 *
 * Referencias principais:
 * - DSM-5 (APA, 2013) e DSM-5-TR (APA, 2022)
 * - CID-10 (OMS) e CID-11 (OMS, 2022)
 * - NICE Guidelines: ADHD (NG87), Autism (CG142)
 * - AAP Clinical Practice Guidelines
 * - Brazilian Guidelines: ABP (Associacao Brasileira de Psiquiatria)
 */

import type { DoencaMental } from '@/lib/types/doenca-mental';
import { DSM5_CATEGORIES } from '@/lib/types/dsm5';

/**
 * Transtornos do Neurodesenvolvimento e Infancia - DSM-5
 *
 * Esta colecao inclui transtornos que tipicamente se manifestam
 * cedo no desenvolvimento, frequentemente antes da crianca ingressar
 * na escola, e sao caracterizados por deficits no desenvolvimento
 * que produzem prejuizos no funcionamento pessoal, social, academico
 * ou ocupacional.
 */
export const transtornosInfancia: Array<Partial<DoencaMental> & {
  id: string;
  titulo: string;
  categoria: 'saude_mental';
  cid10: string[];
  ciap2: string[]
}> = [
  // ============================================================================
  // TRANSTORNO DE DEFICIT DE ATENCAO/HIPERATIVIDADE (TDAH)
  // ============================================================================

  // ============================================================================
  // 1. TDAH - APRESENTACAO COMBINADA
  // ============================================================================
  {
    id: 'tdah-combinado',
    titulo: 'TDAH - Apresentacao Combinada',
    sinonimos: ['ADHD Combined Type', 'Transtorno Hipercinético', 'DDA', 'TDAH tipo misto'],
    categoria: 'saude_mental',
    subcategoria: 'neurodesenvolvimento',

    // Ontologias
    doid: 'DOID:1094',
    snomedCT: '406506008', // Attention deficit hyperactivity disorder, combined type (disorder)
    meshId: 'D001289',
    umlsCui: 'C1263846',

    // Classificacoes
    cid10: ['F90.2'],
    cid11: ['6A05.2'],
    ciap2: ['P81'],

    dsm5: {
      code: '314.01',
      codeAlternative: 'F90.2',
      category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
      diagnosticCriteria: {
        code: '314.01',
        name: 'Attention-Deficit/Hyperactivity Disorder, Combined Presentation',
        category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
        criteria: [
          {
            letter: 'A',
            text: 'Um padrao persistente de desatencao e/ou hiperatividade-impulsividade que interfere no funcionamento ou desenvolvimento, conforme caracterizado por (1) e/ou (2):',
            subCriteria: [
              { text: '1. Desatencao: Seis ou mais sintomas (5 para adolescentes/adultos >=17 anos) por pelo menos 6 meses, em grau inconsistente com o nivel de desenvolvimento' },
              { text: '2. Hiperatividade-Impulsividade: Seis ou mais sintomas (5 para adolescentes/adultos >=17 anos) por pelo menos 6 meses, em grau inconsistente com o nivel de desenvolvimento' },
            ],
          },
          {
            letter: 'B',
            text: 'Varios sintomas de desatencao ou hiperatividade-impulsividade estavam presentes antes dos 12 anos de idade',
          },
          {
            letter: 'C',
            text: 'Varios sintomas de desatencao ou hiperatividade-impulsividade estao presentes em dois ou mais ambientes (casa, escola, trabalho, com amigos)',
          },
          {
            letter: 'D',
            text: 'Ha evidencias claras de que os sintomas interferem ou reduzem a qualidade do funcionamento social, academico ou ocupacional',
          },
          {
            letter: 'E',
            text: 'Os sintomas nao ocorrem exclusivamente durante o curso de esquizofrenia ou outro transtorno psicotico e nao sao melhor explicados por outro transtorno mental',
          },
        ],
        specifiers: {
          severity: ['Leve', 'Moderada', 'Grave'],
          remission: ['Em remissao parcial'],
        },
        notes: 'Apresentacao Combinada: Se ambos Criterio A1 (desatencao) e Criterio A2 (hiperatividade-impulsividade) sao preenchidos nos ultimos 6 meses.',
      },
    },

    quickView: {
      definicao: 'Transtorno do neurodesenvolvimento caracterizado por padrao persistente de desatencao E hiperatividade-impulsividade que interfere no funcionamento ou desenvolvimento. Inicio antes dos 12 anos, presente em multiplos ambientes.',
      criteriosDiagnosticos: [
        'Criterios de desatencao E hiperatividade-impulsividade preenchidos',
        '6+ sintomas de cada dominio (5+ em >=17 anos) por 6+ meses',
        'Varios sintomas presentes antes dos 12 anos',
        'Sintomas em 2+ ambientes (casa, escola, trabalho)',
        'Prejuizo funcional evidente (social, academico, ocupacional)',
        'Nao melhor explicado por outro transtorno mental',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoeducacao para pais e crianca sobre TDAH',
          'Treinamento de pais (Parent Training) - intervencao comportamental',
          'Intervencoes escolares (adaptacoes curriculares, assento preferencial)',
          'Terapia comportamental para a crianca',
          'TCC para adolescentes e adultos',
          'Coaching e organizacao de rotinas',
        ],
        farmacologico: [
          'ESTIMULANTES (primeira linha):',
          'Metilfenidato LI 5-60mg/dia em doses divididas (2-3x/dia)',
          'Metilfenidato LA 10-60mg/dia (dose unica matinal)',
          'Lisdexanfetamina 30-70mg/dia (dose unica)',
          'NAO-ESTIMULANTES (segunda linha ou contraindicacao):',
          'Atomoxetina 0,5-1,4mg/kg/dia (max 100mg/dia)',
          'Viloxazina, Bupropiona, Clonidina, Guanfacina (off-label no Brasil)',
        ],
      },
      metasTerapeuticas: [
        'Reducao de sintomas de desatencao e hiperatividade',
        'Melhora do funcionamento academico/ocupacional',
        'Melhora das relacoes interpessoais',
        'Desenvolvimento de estrategias compensatorias',
        'Reducao de comportamentos de risco',
      ],
      examesIniciais: [
        'Avaliacao clinica estruturada (historia detalhada)',
        'Escalas de avaliacao (SNAP-IV, Conners, ASRS para adultos)',
        'Avaliacao escolar (questionarios para professores)',
        'Avaliacao neuropsicologica (se duvida diagnostica)',
        'Exclusao de causas organicas (tireoide, anemia, deficit sensorial)',
        'ECG antes de estimulantes (se historia cardiaca)',
      ],
      redFlags: [
        'Sintomas de transtorno de humor (episodios de humor)',
        'Sintomas psicoticos',
        'Uso de substancias (comum em TDAH nao tratado)',
        'Risco suicida (especialmente adolescentes)',
        'Agressividade significativa',
        'Baixo peso/anorexia com uso de estimulantes',
        'Tiques ou Sindrome de Tourette',
      ],
    },

    escalasAvaliacao: [
      {
        name: 'SNAP-IV',
        description: 'Questionario de 26 itens baseado em criterios DSM-IV/5 para pais e professores.',
        cutoff: 'Media >=1,5 em desatencao e/ou hiperatividade sugere TDAH',
        reference: 'Swanson, 1992',
      },
      {
        name: 'Escala de Conners (CPRS/CTRS)',
        description: 'Escalas para pais (CPRS) e professores (CTRS) com versoes curta e longa.',
        cutoff: 'T-score >=65 indica significancia clinica',
        reference: 'Conners, 2008',
      },
      {
        name: 'ASRS (Adult ADHD Self-Report Scale)',
        description: 'Escala de auto-relato para triagem de TDAH em adultos, versao 1.1 com 6 ou 18 itens.',
        cutoff: '4+ itens positivos na Parte A sugere TDAH',
        reference: 'Kessler et al., 2005',
      },
    ],

    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'Treinamento de Pais + TCC (para crianca/adolescente)',
        frequencia: 'Semanal a quinzenal',
        duracao: '12-20 sessoes iniciais; manutencao conforme necessidade',
      },
      farmacoterapia: {
        classe: 'Psicoestimulantes (primeira linha)',
        medicamentos: ['metilfenidato', 'lisdexanfetamina', 'atomoxetina'],
        doseInicial: 'Metilfenidato LI 5mg 2x/dia ou LA 10mg/manha',
        titulacao: 'Aumentar 5-10mg/semana ate resposta ou dose maxima',
        duracao: 'Continuo; reavaliar anualmente necessidade',
      },
    },

    criteriosEncaminhamento: [
      'Duvida diagnostica (comorbidades complexas)',
      'Refratariedade a tratamento inicial',
      'Comorbidade com transtorno de humor ou ansiedade grave',
      'Uso de substancias concomitante',
      'Necessidade de avaliacao neuropsicologica',
      'Adultos com TDAH (avaliacao especializada)',
    ],

    urgencia: {
      riscosuicida: true,
      riscoAgressao: true,
      riscoAutolesao: false,
      criterios: [
        'Ideacao suicida (especialmente em adolescentes com TDAH e depressao)',
        'Agressividade com risco a terceiros',
        'Comportamentos de risco impulsivos graves',
        'Psicose induzida por estimulantes (rara)',
      ],
    },

    comorbidadesComuns: [
      'transtorno-opositor-desafiador',
      'transtorno-conduta',
      'transtorno-ansiedade-generalizada',
      'transtorno-depressivo-maior',
      'transtorno-aprendizagem-leitura',
      'transtorno-espectro-autista',
      'transtorno-uso-substancias',
    ],

    tags: ['tdah', 'adhd', 'hiperatividade', 'desatencao', 'neurodesenvolvimento', 'crianca', 'estimulante', 'metilfenidato', 'dsm5'],
  },

  // ============================================================================
  // 2. TDAH - APRESENTACAO PREDOMINANTEMENTE DESATENTA
  // ============================================================================
  {
    id: 'tdah-desatento',
    titulo: 'TDAH - Apresentacao Predominantemente Desatenta',
    sinonimos: ['ADHD Predominantly Inattentive', 'TDA', 'TDAH tipo desatento', 'DDA'],
    categoria: 'saude_mental',
    subcategoria: 'neurodesenvolvimento',

    // Ontologias
    doid: 'DOID:1094',
    snomedCT: '7140009', // Attention deficit disorder without hyperactivity
    meshId: 'D001289',
    umlsCui: 'C0041671',

    // Classificacoes
    cid10: ['F90.0'],
    cid11: ['6A05.0'],
    ciap2: ['P81'],

    dsm5: {
      code: '314.00',
      codeAlternative: 'F90.0',
      category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
      diagnosticCriteria: {
        code: '314.00',
        name: 'Attention-Deficit/Hyperactivity Disorder, Predominantly Inattentive Presentation',
        category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
        criteria: [
          {
            letter: 'A1',
            text: 'Desatencao: Seis ou mais dos seguintes sintomas persistem por pelo menos 6 meses em grau inconsistente com o nivel de desenvolvimento e impactam negativamente atividades sociais/academicas/ocupacionais:',
            subCriteria: [
              { text: 'a) Frequentemente nao presta atencao a detalhes ou comete erros por descuido' },
              { text: 'b) Frequentemente tem dificuldade de manter atencao em tarefas ou atividades ludicas' },
              { text: 'c) Frequentemente parece nao escutar quando lhe dirigem a palavra' },
              { text: 'd) Frequentemente nao segue instrucoes e nao termina tarefas' },
              { text: 'e) Frequentemente tem dificuldade para organizar tarefas e atividades' },
              { text: 'f) Frequentemente evita ou reluta em se envolver em tarefas que exijam esforco mental prolongado' },
              { text: 'g) Frequentemente perde coisas necessarias para tarefas ou atividades' },
              { text: 'h) Com frequencia e facilmente distraido por estimulos externos' },
              { text: 'i) Frequentemente esquece atividades cotidianas' },
            ],
          },
          {
            letter: 'A2',
            text: 'Criterio de hiperatividade-impulsividade NAO e preenchido (menos de 6 sintomas)',
          },
        ],
        notes: 'Apresentacao Predominantemente Desatenta: Se Criterio A1 (desatencao) e preenchido, mas Criterio A2 (hiperatividade-impulsividade) nao e preenchido nos ultimos 6 meses.',
      },
    },

    quickView: {
      definicao: 'Subtipo de TDAH em que predominam sintomas de desatencao, sem hiperatividade-impulsividade significativa. Mais comum em meninas, frequentemente subdiagnosticado por nao apresentar comportamento disruptivo.',
      criteriosDiagnosticos: [
        '6+ sintomas de desatencao (5+ em >=17 anos) por 6+ meses',
        'Menos de 6 sintomas de hiperatividade-impulsividade',
        'Varios sintomas presentes antes dos 12 anos',
        'Sintomas em 2+ ambientes',
        'Prejuizo funcional evidente',
        'Nao melhor explicado por outro transtorno',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoeducacao para pais e escola',
          'Intervencoes escolares (adaptacoes, tempo extra, assento preferencial)',
          'Treinamento de habilidades organizacionais',
          'TCC focada em organizacao e planejamento',
          'Uso de lembretes, listas, agendas (estrategias externas)',
          'Coaching para TDAH (adolescentes/adultos)',
        ],
        farmacologico: [
          'ESTIMULANTES (primeira linha):',
          'Metilfenidato LI ou LA 10-60mg/dia',
          'Lisdexanfetamina 30-70mg/dia',
          'NAO-ESTIMULANTES:',
          'Atomoxetina 0,5-1,4mg/kg/dia (boa opcao para tipo desatento)',
          'Viloxazina (aprovada nos EUA)',
        ],
      },
      metasTerapeuticas: [
        'Melhora da atencao sustentada',
        'Melhora do desempenho academico/ocupacional',
        'Desenvolvimento de estrategias organizacionais',
        'Reducao de esquecimentos e perdas',
      ],
      examesIniciais: [
        'Historia clinica detalhada',
        'Escalas de avaliacao (SNAP-IV, Conners)',
        'Avaliacao escolar',
        'Avaliacao neuropsicologica (util para diferenciar de TA)',
        'Exclusao de causas organicas',
      ],
      redFlags: [
        'Sintomas de ansiedade significativa (diferencial)',
        'Depressao concomitante',
        'Transtorno de aprendizagem especifico (comorbidade comum)',
        'Altas habilidades nao reconhecidas (mascarando TDAH)',
        'Trauma ou negligencia (sintomas semelhantes)',
      ],
    },

    escalasAvaliacao: [
      {
        name: 'SNAP-IV - Subescala Desatencao',
        description: 'Itens 1-9 avaliam especificamente sintomas de desatencao.',
        cutoff: 'Media >=1,5 nos itens de desatencao',
        reference: 'Swanson, 1992',
      },
      {
        name: 'BRIEF (Behavior Rating Inventory of Executive Function)',
        description: 'Avalia funcoes executivas em criancas/adolescentes - util no tipo desatento.',
        reference: 'Gioia et al., 2000',
      },
    ],

    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TCC + Treinamento de Habilidades Organizacionais',
        frequencia: 'Semanal',
        duracao: '12-16 sessoes iniciais',
      },
      farmacoterapia: {
        classe: 'Psicoestimulantes ou Atomoxetina',
        medicamentos: ['metilfenidato', 'lisdexanfetamina', 'atomoxetina'],
        doseInicial: 'Metilfenidato 10mg/manha ou Atomoxetina 0,5mg/kg',
        titulacao: 'Aumentar gradualmente a cada 1-2 semanas',
        duracao: 'Continuo; reavaliar periodicamente',
      },
    },

    criteriosEncaminhamento: [
      'Duvida diagnostica com ansiedade ou depressao',
      'Suspeita de transtorno de aprendizagem concomitante',
      'Baixa resposta a tratamento inicial',
      'Necessidade de avaliacao neuropsicologica formal',
    ],

    urgencia: {
      riscosuicida: true,
      riscoAgressao: false,
      riscoAutolesao: false,
      criterios: [
        'Depressao grave comorbida',
        'Ideacao suicida (menos comum que no tipo combinado)',
      ],
    },

    comorbidadesComuns: [
      'transtorno-ansiedade-generalizada',
      'transtorno-depressivo-maior',
      'transtorno-aprendizagem-leitura',
      'transtorno-aprendizagem-matematica',
      'tdah-combinado',
    ],

    tags: ['tdah', 'adhd', 'desatencao', 'tda', 'neurodesenvolvimento', 'atencao', 'executivo', 'dsm5'],
  },

  // ============================================================================
  // 3. TRANSTORNO DO ESPECTRO AUTISTA (TEA)
  // ============================================================================
  {
    id: 'transtorno-espectro-autista',
    titulo: 'Transtorno do Espectro Autista',
    sinonimos: ['TEA', 'Autismo', 'ASD', 'Sindrome de Asperger', 'Autismo infantil', 'Autismo de alto funcionamento'],
    categoria: 'saude_mental',
    subcategoria: 'neurodesenvolvimento',

    // Ontologias
    doid: 'DOID:0060041',
    snomedCT: '35919005', // Autistic disorder (disorder)
    meshId: 'D000067877',
    umlsCui: 'C1510586',

    // Classificacoes
    cid10: ['F84.0'],
    cid11: ['6A02'],
    ciap2: ['P22'],

    // HPO (fenotipos associados)
    hpo: ['HP:0000729', 'HP:0000717', 'HP:0000708', 'HP:0002360'],

    dsm5: {
      code: '299.00',
      codeAlternative: 'F84.0',
      category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
      diagnosticCriteria: {
        code: '299.00',
        name: 'Autism Spectrum Disorder',
        category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
        criteria: [
          {
            letter: 'A',
            text: 'Deficits persistentes na comunicacao social e interacao social em multiplos contextos, conforme manifestado pelo seguinte, atualmente ou historicamente:',
            subCriteria: [
              { text: '1. Deficits na reciprocidade socioemocional (abordagem social anormal, falha na conversacao, compartilhamento reduzido de interesses/emocoes)' },
              { text: '2. Deficits nos comportamentos comunicativos nao verbais (contato visual e linguagem corporal anormais, deficits na compreensao e uso de gestos)' },
              { text: '3. Deficits no desenvolvimento, manutencao e compreensao de relacionamentos (dificuldade de ajustar comportamento, fazer amigos, ausencia de interesse em pares)' },
            ],
          },
          {
            letter: 'B',
            text: 'Padroes restritos e repetitivos de comportamento, interesses ou atividades, manifestados por pelo menos dois dos seguintes:',
            subCriteria: [
              { text: '1. Movimentos motores, uso de objetos ou fala estereotipados ou repetitivos (estereotipias motoras, ecolalia, frases idiossincraticas)' },
              { text: '2. Insistencia em mesmice, adesao inflexivel a rotinas ou padroes ritualizados (sofrimento extremo com pequenas mudancas)' },
              { text: '3. Interesses fixos e altamente restritos anormais em intensidade ou foco' },
              { text: '4. Hiper ou hiporreatividade a estimulos sensoriais ou interesse incomum em aspectos sensoriais do ambiente' },
            ],
          },
          {
            letter: 'C',
            text: 'Os sintomas devem estar presentes no periodo inicial do desenvolvimento (podem nao se manifestar plenamente ate que demandas sociais excedam capacidades)',
          },
          {
            letter: 'D',
            text: 'Os sintomas causam prejuizo clinicamente significativo no funcionamento social, ocupacional ou em outras areas importantes',
          },
          {
            letter: 'E',
            text: 'Essas perturbacoes nao sao melhor explicadas por deficiencia intelectual ou atraso global do desenvolvimento',
          },
        ],
        specifiers: {
          severity: ['Nivel 1 (Requer suporte)', 'Nivel 2 (Requer suporte substancial)', 'Nivel 3 (Requer suporte muito substancial)'],
        },
        notes: 'Especificar: Com ou sem deficiencia intelectual; Com ou sem comprometimento da linguagem; Associado a condicao medica ou genetica conhecida; Associado a outro transtorno do neurodesenvolvimento, mental ou comportamental; Com catatonia.',
      },
    },

    quickView: {
      definicao: 'Transtorno do neurodesenvolvimento caracterizado por deficits persistentes na comunicacao e interacao social, e padroes restritos e repetitivos de comportamento, interesses ou atividades. Apresentacao em espectro com ampla variacao de gravidade.',
      criteriosDiagnosticos: [
        'Deficits em comunicacao social (todos os 3 subdominios)',
        'Padroes restritos/repetitivos (>=2 de 4 subdominios)',
        'Sintomas presentes no desenvolvimento inicial',
        'Prejuizo funcional significativo',
        'Nao explicado por DI isolada',
        'Especificar nivel de suporte (1, 2 ou 3)',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Intervencao comportamental intensiva precoce (ABA, ESDM, TEACCH)',
          'Terapia fonoaudiologica (comunicacao)',
          'Terapia ocupacional (integracao sensorial, AVDs)',
          'Treino de habilidades sociais',
          'Psicoeducacao para familia',
          'Intervencoes escolares (educacao especial, adaptacoes)',
          'Apoio estruturado e previsibilidade no ambiente',
        ],
        farmacologico: [
          'NAO ha medicamentos para sintomas nucleares do TEA',
          'IRRITABILIDADE/AGRESSIVIDADE:',
          'Risperidona 0,25-3mg/dia (aprovado FDA para irritabilidade em TEA)',
          'Aripiprazol 2-15mg/dia (aprovado FDA para irritabilidade em TEA)',
          'COMORBIDADES:',
          'ISRS para ansiedade/comportamentos repetitivos',
          'Metilfenidato para TDAH comorbido',
          'Melatonina para insonia',
        ],
      },
      metasTerapeuticas: [
        'Maximizar desenvolvimento de comunicacao e linguagem',
        'Melhorar habilidades sociais e adaptativas',
        'Reduzir comportamentos maladaptativos',
        'Promover independencia e qualidade de vida',
        'Apoiar familia e cuidadores',
      ],
      examesIniciais: [
        'Avaliacao diagnostica estruturada (ADOS-2, ADI-R)',
        'Avaliacao cognitiva (Escalas Wechsler, Leiter)',
        'Avaliacao da linguagem',
        'Avaliacao auditiva (excluir surdez)',
        'Cariótipo/microarray (se dismorfismos ou DI)',
        'Pesquisa de X-fragil',
        'RM cerebral (se regressao ou sinais neurologicos)',
      ],
      redFlags: [
        'Regressao do desenvolvimento (investigar epilepsia, Rett)',
        'Macrocefalia/microcefalia significativa',
        'Convulsoes (comum em TEA, especialmente com DI)',
        'Autolesao grave',
        'Agressividade com risco a terceiros',
        'Catatonia (adolescentes/adultos)',
      ],
    },

    escalasAvaliacao: [
      {
        name: 'ADOS-2 (Autism Diagnostic Observation Schedule)',
        description: 'Padrao-ouro para observacao e classificacao diagnostica de TEA. 5 modulos conforme idade e linguagem.',
        reference: 'Lord et al., 2012',
      },
      {
        name: 'ADI-R (Autism Diagnostic Interview-Revised)',
        description: 'Entrevista estruturada com cuidadores. Complementa ADOS-2.',
        reference: 'Rutter et al., 2003',
      },
      {
        name: 'M-CHAT-R/F (Modified Checklist for Autism in Toddlers)',
        description: 'Triagem para TEA em criancas de 16-30 meses. 20 itens.',
        cutoff: 'Score >=3 indica risco',
        reference: 'Robins et al., 2014',
      },
      {
        name: 'CARS-2 (Childhood Autism Rating Scale)',
        description: 'Escala de 15 itens para avaliar gravidade. Versoes Standard e High-Functioning.',
        reference: 'Schopler et al., 2010',
      },
    ],

    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'Intervencao Comportamental Intensiva (ABA, ESDM)',
        frequencia: 'Diaria ou varias vezes por semana (20-40 horas/semana ideal precoce)',
        duracao: 'Anos; continua conforme necessidade',
      },
      farmacoterapia: {
        classe: 'Antipsicoticos atipicos (para irritabilidade)',
        medicamentos: ['risperidona', 'aripiprazol'],
        doseInicial: 'Risperidona 0,25mg/dia ou Aripiprazol 2mg/dia',
        titulacao: 'Aumentar lentamente a cada 1-2 semanas',
        duracao: 'Conforme sintomas-alvo; tentativas periodicas de reducao',
      },
    },

    criteriosEncaminhamento: [
      'Suspeita de TEA: encaminhar para avaliacao especializada',
      'Todos os casos confirmados: equipe multidisciplinar',
      'Psiquiatria se comorbidades ou farmacoterapia',
      'Genetica se dismorfismos, DI ou historia familiar',
      'Neurologia se regressao ou epilepsia',
    ],

    urgencia: {
      riscosuicida: true,
      riscoAgressao: true,
      riscoAutolesao: true,
      criterios: [
        'Autolesao grave (head-banging, mordidas)',
        'Agressividade com risco a cuidadores',
        'Regressao aguda (investigar epilepsia)',
        'Catatonia',
        'Ideacao suicida (adolescentes/adultos com TEA nivel 1)',
      ],
    },

    comorbidadesComuns: [
      'tdah-combinado',
      'transtorno-ansiedade-generalizada',
      'fobia-especifica',
      'transtorno-obsessivo-compulsivo',
      'deficiencia-intelectual',
      'epilepsia',
      'disturbios-sono',
      'transtornos-gastrointestinais',
    ],

    tags: ['autismo', 'tea', 'asd', 'asperger', 'neurodesenvolvimento', 'comunicacao', 'social', 'estereotipia', 'dsm5'],
  },

  // ============================================================================
  // 4. TRANSTORNO ESPECIFICO DE APRENDIZAGEM - LEITURA (DISLEXIA)
  // ============================================================================
  {
    id: 'transtorno-aprendizagem-leitura',
    titulo: 'Transtorno Especifico de Aprendizagem - Leitura',
    sinonimos: ['Dislexia', 'Dyslexia', 'Transtorno de leitura', 'TA leitura', 'Dificuldade de leitura'],
    categoria: 'saude_mental',
    subcategoria: 'neurodesenvolvimento',

    // Ontologias
    doid: 'DOID:10917',
    snomedCT: '59770006', // Developmental reading disorder
    meshId: 'D004410',
    umlsCui: 'C0476254',

    // Classificacoes
    cid10: ['F81.0'],
    cid11: ['6A03.0'],
    ciap2: ['P24'],

    dsm5: {
      code: '315.00',
      codeAlternative: 'F81.0',
      category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
      diagnosticCriteria: {
        code: '315.00',
        name: 'Specific Learning Disorder with Impairment in Reading',
        category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
        criteria: [
          {
            letter: 'A',
            text: 'Dificuldades na aprendizagem e no uso de habilidades academicas, conforme indicado pela presenca de pelo menos um dos sintomas a seguir, que tenham persistido por pelo menos 6 meses, apesar de intervencoes dirigidas:',
            subCriteria: [
              { text: '1. Leitura de palavras imprecisa ou lenta e com esforco' },
              { text: '2. Dificuldade para compreender o significado do que e lido' },
            ],
          },
          {
            letter: 'B',
            text: 'As habilidades academicas afetadas estao substancial e quantificavelmente abaixo do esperado para a idade cronologica e causam interferencia significativa no desempenho academico ou ocupacional',
          },
          {
            letter: 'C',
            text: 'As dificuldades de aprendizagem comecam durante os anos escolares, mas podem nao se manifestar plenamente ate que as demandas excedam as capacidades',
          },
          {
            letter: 'D',
            text: 'As dificuldades de aprendizagem nao sao melhor explicadas por deficiencias intelectuais, acuidade visual ou auditiva nao corrigida, outros transtornos mentais ou neurologicos, adversidade psicossocial, falta de proficiencia na lingua de instrucao academica ou instrucao inadequada',
          },
        ],
        specifiers: {
          severity: ['Leve', 'Moderada', 'Grave'],
        },
        notes: 'Especificar todas as areas academicas e subhabilidades afetadas. Para leitura: precisao, velocidade/fluencia, compreensao.',
      },
    },

    quickView: {
      definicao: 'Dificuldade persistente na aquisicao de habilidades de leitura (precisao, velocidade, compreensao) que esta substancialmente abaixo do esperado para idade, apesar de instrucao adequada. Base neurobiologica com forte componente genetico.',
      criteriosDiagnosticos: [
        'Leitura imprecisa, lenta ou com esforco; e/ou dificuldade de compreensao',
        'Persistencia por >=6 meses apesar de intervencao',
        'Desempenho substancialmente abaixo do esperado para idade',
        'Interferencia significativa no desempenho academico',
        'Inicio nos anos escolares',
        'Exclusao de DI, deficit sensorial, instrucao inadequada',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Intervencao fonemica estruturada (Metodo Orton-Gillingham, multissensorial)',
          'Intervencao de leitura intensiva e sistematica',
          'Apoio psicopedagogico especializado',
          'Adaptacoes escolares (tempo extra, avaliacao oral)',
          'Tecnologia assistiva (leitores de texto, audiolivros)',
          'Terapia fonoaudiologica (consciencia fonologica)',
          'Psicoeducacao e apoio emocional',
        ],
        farmacologico: [
          'NAO ha tratamento farmacologico para dislexia',
          'Tratar comorbidades:',
          'TDAH (muito comum): Metilfenidato, Atomoxetina',
          'Ansiedade: ISRS se significativa',
        ],
      },
      metasTerapeuticas: [
        'Melhora da precisao e fluencia de leitura',
        'Desenvolvimento de estrategias compensatorias',
        'Melhora da compreensao leitora',
        'Manutencao da autoestima e motivacao',
        'Sucesso academico com adaptacoes',
      ],
      examesIniciais: [
        'Avaliacao neuropsicologica (inteligencia, funcoes executivas)',
        'Avaliacao de leitura padronizada',
        'Avaliacao da consciencia fonologica',
        'Avaliacao auditiva (exclusao)',
        'Avaliacao visual (exclusao)',
        'Avaliacao psicopedagogica',
      ],
      redFlags: [
        'Deficit intelectual (requer investigacao separada)',
        'Deficit sensorial nao corrigido',
        'Problemas emocionais secundarios significativos',
        'Fobia escolar',
        'Suspeita de TDAH comorbido',
      ],
    },

    escalasAvaliacao: [
      {
        name: 'TDE-II (Teste de Desempenho Escolar)',
        description: 'Avalia leitura, escrita e aritmetica. Versao brasileira validada.',
        reference: 'Stein, 2019',
      },
      {
        name: 'PROLEC (Bateria de Avaliacao dos Processos de Leitura)',
        description: 'Avalia processos de identificacao de letras, lexical, sintático e semantico.',
        reference: 'Capellini et al., 2012',
      },
      {
        name: 'CONFIAS (Consciencia Fonologica)',
        description: 'Instrumento brasileiro para avaliar consciencia fonologica.',
        reference: 'Moojen et al., 2003',
      },
    ],

    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'Intervencao Fonemica Estruturada + Psicopedagogia',
        frequencia: '2-5 vezes/semana',
        duracao: 'Longo prazo (anos); intensidade conforme resposta',
      },
      farmacoterapia: {
        classe: 'Apenas para comorbidades',
        medicamentos: ['metilfenidato', 'atomoxetina'],
        doseInicial: 'Conforme comorbidade tratada',
        duracao: 'Conforme comorbidade',
      },
    },

    criteriosEncaminhamento: [
      'Avaliacao neuropsicologica formal',
      'Fonoaudiologia especializada',
      'Psicopedagogia para intervencao',
      'Psiquiatria se TDAH ou ansiedade significativa',
      'Neuropediatra se sinais neurologicos',
    ],

    urgencia: {
      riscosuicida: false,
      riscoAgressao: false,
      riscoAutolesao: false,
      criterios: [
        'Fobia escolar grave',
        'Depressao ou ansiedade secundaria intensa',
        'Recusa escolar persistente',
      ],
    },

    comorbidadesComuns: [
      'tdah-combinado',
      'tdah-desatento',
      'transtorno-aprendizagem-matematica',
      'transtorno-aprendizagem-escrita',
      'transtorno-ansiedade-generalizada',
      'depressao-infancia',
    ],

    tags: ['dislexia', 'leitura', 'aprendizagem', 'fonologica', 'neurodesenvolvimento', 'escola', 'dsm5'],
  },

  // ============================================================================
  // 5. TRANSTORNO ESPECIFICO DE APRENDIZAGEM - MATEMATICA (DISCALCULIA)
  // ============================================================================
  {
    id: 'transtorno-aprendizagem-matematica',
    titulo: 'Transtorno Especifico de Aprendizagem - Matematica',
    sinonimos: ['Discalculia', 'Dyscalculia', 'Transtorno de matematica', 'TA matematica', 'Dificuldade de calculo'],
    categoria: 'saude_mental',
    subcategoria: 'neurodesenvolvimento',

    // Ontologias
    doid: 'DOID:10923',
    snomedCT: '71714005', // Developmental dyscalculia
    meshId: 'D060705',
    umlsCui: 'C0751330',

    // Classificacoes
    cid10: ['F81.2'],
    cid11: ['6A03.1'],
    ciap2: ['P24'],

    dsm5: {
      code: '315.1',
      codeAlternative: 'F81.2',
      category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
      diagnosticCriteria: {
        code: '315.1',
        name: 'Specific Learning Disorder with Impairment in Mathematics',
        category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
        criteria: [
          {
            letter: 'A',
            text: 'Dificuldades na aprendizagem e no uso de habilidades academicas, conforme indicado pela presenca de pelo menos um dos sintomas a seguir, que tenham persistido por pelo menos 6 meses:',
            subCriteria: [
              { text: '1. Dificuldades para dominar o senso numerico, fatos numericos ou calculo' },
              { text: '2. Dificuldades com raciocinio matematico' },
            ],
          },
          {
            letter: 'B',
            text: 'As habilidades academicas afetadas estao substancialmente abaixo do esperado para a idade cronologica e causam interferencia significativa no desempenho academico ou ocupacional',
          },
          {
            letter: 'C',
            text: 'As dificuldades de aprendizagem comecam durante os anos escolares',
          },
          {
            letter: 'D',
            text: 'As dificuldades de aprendizagem nao sao melhor explicadas por deficiencias intelectuais, acuidade visual ou auditiva nao corrigida, outros transtornos mentais ou neurologicos, adversidade psicossocial ou instrucao inadequada',
          },
        ],
        specifiers: {
          severity: ['Leve', 'Moderada', 'Grave'],
        },
        notes: 'Subhabilidades afetadas incluem: senso numerico, memorizacao de fatos aritmeticos, calculo preciso ou fluente, raciocinio matematico.',
      },
    },

    quickView: {
      definicao: 'Dificuldade persistente na aquisicao de habilidades matematicas (senso numerico, fatos aritmeticos, calculo, raciocinio matematico) substancialmente abaixo do esperado para idade, apesar de instrucao adequada.',
      criteriosDiagnosticos: [
        'Dificuldade com senso numerico, fatos numericos, calculo; e/ou raciocinio matematico',
        'Persistencia por >=6 meses apesar de intervencao',
        'Desempenho substancialmente abaixo do esperado',
        'Interferencia significativa no desempenho academico',
        'Inicio nos anos escolares',
        'Exclusao de DI, deficit sensorial, instrucao inadequada',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Intervencao matematica estruturada e intensiva',
          'Uso de materiais concretos e manipulativos',
          'Abordagem multissensorial para conceitos numericos',
          'Psicopedagogia especializada em matematica',
          'Adaptacoes escolares (calculadora, tempo extra)',
          'Softwares educacionais de matematica',
          'Trabalho de memoria de trabalho e funcoes executivas',
        ],
        farmacologico: [
          'NAO ha tratamento farmacologico para discalculia',
          'Tratar comorbidades:',
          'TDAH: Metilfenidato (pode melhorar atencao para tarefas matematicas)',
          'Ansiedade matematica: suporte psicologico',
        ],
      },
      metasTerapeuticas: [
        'Desenvolvimento do senso numerico',
        'Automatizacao de fatos aritmeticos basicos',
        'Melhora do raciocinio matematico',
        'Estrategias compensatorias funcionais',
        'Reducao da ansiedade matematica',
      ],
      examesIniciais: [
        'Avaliacao neuropsicologica (inteligencia, funcoes executivas)',
        'Avaliacao padronizada de matematica',
        'Avaliacao de senso numerico',
        'Avaliacao psicopedagogica',
        'Exclusao de deficits sensoriais',
      ],
      redFlags: [
        'Deficit intelectual (investigacao separada)',
        'TDAH comorbido (muito frequente)',
        'Ansiedade matematica intensa',
        'Fobia escolar',
        'Baixa autoestima academica',
      ],
    },

    escalasAvaliacao: [
      {
        name: 'TDE-II - Subescala Aritmetica',
        description: 'Avalia desempenho em aritmetica. Validado para populacao brasileira.',
        reference: 'Stein, 2019',
      },
      {
        name: 'Zareki-R (Bateria Neuropsicologica para Numeros)',
        description: 'Avalia processamento numerico e calculo. Versao brasileira.',
        reference: 'von Aster & Shalev, 2007',
      },
      {
        name: 'Prova de Aritmetica (PA)',
        description: 'Avaliacao de habilidades aritmeticas basicas.',
        reference: 'Seabra et al., 2014',
      },
    ],

    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'Intervencao Matematica Estruturada + Psicopedagogia',
        frequencia: '2-4 vezes/semana',
        duracao: 'Longo prazo; intensidade conforme resposta',
      },
      farmacoterapia: {
        classe: 'Apenas para comorbidades',
        medicamentos: ['metilfenidato'],
        doseInicial: 'Conforme comorbidade tratada',
        duracao: 'Conforme comorbidade',
      },
    },

    criteriosEncaminhamento: [
      'Avaliacao neuropsicologica formal',
      'Psicopedagogia especializada',
      'Psiquiatria se TDAH ou ansiedade',
      'Neuropsicologia para avaliacao de funcoes executivas',
    ],

    urgencia: {
      riscosuicida: false,
      riscoAgressao: false,
      riscoAutolesao: false,
      criterios: [
        'Fobia escolar grave',
        'Ansiedade matematica incapacitante',
        'Depressao secundaria',
      ],
    },

    comorbidadesComuns: [
      'tdah-combinado',
      'tdah-desatento',
      'transtorno-aprendizagem-leitura',
      'transtorno-aprendizagem-escrita',
      'transtorno-ansiedade-generalizada',
    ],

    tags: ['discalculia', 'matematica', 'aprendizagem', 'calculo', 'numerico', 'neurodesenvolvimento', 'dsm5'],
  },

  // ============================================================================
  // 6. DEFICIENCIA INTELECTUAL - LEVE
  // ============================================================================
  {
    id: 'deficiencia-intelectual-leve',
    titulo: 'Deficiencia Intelectual - Leve',
    sinonimos: ['DI leve', 'Retardo mental leve', 'Intellectual Disability Mild', 'ID mild', 'QI 50-70'],
    categoria: 'saude_mental',
    subcategoria: 'neurodesenvolvimento',

    // Ontologias
    doid: 'DOID:1059',
    snomedCT: '86765009', // Mild intellectual disability
    meshId: 'D008607',
    umlsCui: 'C0423903',

    // Classificacoes
    cid10: ['F70'],
    cid11: ['6A00.0'],
    ciap2: ['P85'],

    dsm5: {
      code: '317',
      codeAlternative: 'F70',
      category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
      diagnosticCriteria: {
        code: '317',
        name: 'Intellectual Disability (Mild)',
        category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
        criteria: [
          {
            letter: 'A',
            text: 'Deficits em funcoes intelectuais, como raciocinio, resolucao de problemas, planejamento, pensamento abstrato, julgamento, aprendizagem academica e aprendizagem pela experiencia, confirmados tanto por avaliacao clinica quanto por testes de inteligencia padronizados e individualizados.',
          },
          {
            letter: 'B',
            text: 'Deficits em funcoes adaptativas que resultam em fracasso para atingir padroes de desenvolvimento e socioculturais de independencia pessoal e responsabilidade social. Sem apoio continuo, os deficits adaptativos limitam o funcionamento em uma ou mais atividades da vida diaria.',
          },
          {
            letter: 'C',
            text: 'Inicio dos deficits intelectuais e adaptativos durante o periodo de desenvolvimento.',
          },
        ],
        notes: 'DI LEVE: Dominio conceitual - dificuldade na aprendizagem academica; pode atingir nivel de ensino fundamental com apoio. Dominio social - imaturidade social; dificuldade com sinais sociais sutis; risco de manipulacao. Dominio pratico - autocuidado adequado; requer apoio para tarefas complexas; pode trabalhar em empregos sem enfase em habilidades conceituais.',
      },
    },

    quickView: {
      definicao: 'Transtorno do neurodesenvolvimento com deficits nas funcoes intelectuais e adaptativas, com inicio no periodo de desenvolvimento. Na forma leve (QI 50-70), individuos podem alcancar habilidades academicas ate ensino fundamental e independencia em AVDs com apoio minimo.',
      criteriosDiagnosticos: [
        'Deficits em funcoes intelectuais (QI 50-70 aprox.)',
        'Deficits em funcoes adaptativas (conceitual, social, pratico)',
        'Limitacao em 1+ areas da vida diaria sem apoio',
        'Inicio durante o periodo de desenvolvimento',
        'Diagnostico baseado em avaliacao clinica E testes padronizados',
        'Gravidade baseada no funcionamento adaptativo',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Estimulacao precoce (quanto antes, melhor prognostico)',
          'Educacao especial ou inclusiva com suporte',
          'Treinamento de habilidades adaptativas',
          'Terapia ocupacional',
          'Fonoaudiologia (se necessario)',
          'Treinamento vocacional na adolescencia/adulto',
          'Orientacao e apoio familiar',
          'Planejamento de transicao para vida adulta',
        ],
        farmacologico: [
          'NAO ha tratamento farmacologico para DI em si',
          'Tratar comorbidades psiquiatricas:',
          'TDAH: Metilfenidato (comum; resposta pode ser menor)',
          'Epilepsia: Anticonvulsivantes',
          'Comportamentos disruptivos: Risperidona',
          'Transtornos de humor: ISRS, estabilizadores',
        ],
      },
      metasTerapeuticas: [
        'Maximizar potencial de desenvolvimento',
        'Promover autonomia nas AVDs',
        'Integracao social e comunitaria',
        'Preparacao para vida adulta (trabalho, moradia)',
        'Qualidade de vida',
      ],
      examesIniciais: [
        'Avaliacao cognitiva padronizada (WISC-IV/V, Stanford-Binet)',
        'Avaliacao de comportamento adaptativo (Vineland)',
        'Investigacao etiologica (cariótipo, microarray, exoma)',
        'Pesquisa de X-fragil, FISH',
        'RM cranio (se dismorfismos ou sinais neurologicos)',
        'Avaliacao auditiva e visual',
        'Funcao tireoidiana',
        'Aminoacidos urinarios/sericos (se suspeita metabolica)',
      ],
      redFlags: [
        'Regressao de habilidades (investigar causa)',
        'Epilepsia (comum; requer tratamento)',
        'Comportamentos autolesivos',
        'Psicose ou mania (comorbidade)',
        'Sindromes geneticas nao diagnosticadas',
        'Negligencia ou abuso (maior vulnerabilidade)',
      ],
    },

    escalasAvaliacao: [
      {
        name: 'WISC-V (Wechsler Intelligence Scale for Children)',
        description: 'Avaliacao de inteligencia para criancas 6-16 anos. QI global e indices.',
        reference: 'Wechsler, 2014',
      },
      {
        name: 'Stanford-Binet 5',
        description: 'Avaliacao de inteligencia de 2 anos ate adulto.',
        reference: 'Roid, 2003',
      },
      {
        name: 'Vineland-3 (Vineland Adaptive Behavior Scales)',
        description: 'Avalia comportamento adaptativo em dominios de comunicacao, vida diaria, socializacao e motor.',
        reference: 'Sparrow et al., 2016',
      },
      {
        name: 'ABAS-3 (Adaptive Behavior Assessment System)',
        description: 'Avaliacao de comportamento adaptativo.',
        reference: 'Harrison & Oakland, 2015',
      },
    ],

    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'Estimulacao Precoce + Educacao Especial + Terapias de reabilitacao',
        frequencia: 'Diaria ou varias vezes/semana',
        duracao: 'Ao longo da vida conforme necessidade',
      },
      farmacoterapia: {
        classe: 'Apenas para comorbidades',
        medicamentos: ['metilfenidato', 'risperidona', 'valproato'],
        doseInicial: 'Iniciar baixo; titular com cautela',
        duracao: 'Conforme comorbidade',
      },
    },

    criteriosEncaminhamento: [
      'Todos os casos: equipe multidisciplinar',
      'Genetica clinica para investigacao etiologica',
      'Neuropediatra se epilepsia ou sinais neurologicos',
      'Psiquiatria para comorbidades',
      'Servicos de educacao especial',
      'Reabilitacao (TO, fono)',
    ],

    urgencia: {
      riscosuicida: false,
      riscoAgressao: true,
      riscoAutolesao: true,
      criterios: [
        'Autolesao significativa',
        'Agressividade com risco a terceiros',
        'Psicose ou mania aguda',
        'Epilepsia mal controlada',
        'Abuso ou negligencia',
      ],
    },

    comorbidadesComuns: [
      'tdah-combinado',
      'transtorno-espectro-autista',
      'epilepsia',
      'transtornos-ansiedade',
      'transtornos-humor',
      'transtorno-conduta',
      'transtornos-movimento',
    ],

    tags: ['deficiencia-intelectual', 'di', 'retardo', 'qi', 'adaptativo', 'neurodesenvolvimento', 'dsm5'],
  },

  // ============================================================================
  // 7. TRANSTORNO DO DESENVOLVIMENTO DA COORDENACAO
  // ============================================================================
  {
    id: 'transtorno-desenvolvimento-coordenacao',
    titulo: 'Transtorno do Desenvolvimento da Coordenacao',
    sinonimos: ['TDC', 'Dispraxia', 'DCD', 'Developmental Coordination Disorder', 'Dificuldade motora'],
    categoria: 'saude_mental',
    subcategoria: 'neurodesenvolvimento',

    // Ontologias
    doid: 'DOID:10940',
    snomedCT: '1855002', // Developmental motor coordination disorder
    meshId: 'D019957',
    umlsCui: 'C0011757',

    // Classificacoes
    cid10: ['F82'],
    cid11: ['6A04'],
    ciap2: ['N81'],

    dsm5: {
      code: '315.4',
      codeAlternative: 'F82',
      category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
      diagnosticCriteria: {
        code: '315.4',
        name: 'Developmental Coordination Disorder',
        category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
        criteria: [
          {
            letter: 'A',
            text: 'A aquisicao e a execucao de habilidades motoras coordenadas estao substancialmente abaixo do esperado para a idade cronologica e a oportunidade de aprendizagem e uso de habilidades.',
            subCriteria: [
              { text: 'Dificuldades se manifestam como falta de jeito (deixar cair ou esbarrar em objetos)' },
              { text: 'Lentidao e imprecisao no desempenho de habilidades motoras (pegar objetos, usar tesoura, escrever, andar de bicicleta, participar de esportes)' },
            ],
          },
          {
            letter: 'B',
            text: 'O deficit de habilidades motoras do Criterio A interfere significativa e persistentemente nas atividades de vida diaria apropriadas para a idade cronologica (autocuidado, autoconsevacao) e afeta a produtividade academica/escolar, atividades prevocacionais e vocacionais, lazer e brincadeiras',
          },
          {
            letter: 'C',
            text: 'O inicio dos sintomas ocorre no periodo do desenvolvimento inicial',
          },
          {
            letter: 'D',
            text: 'Os deficits de habilidades motoras nao sao mais bem explicados por deficiencia intelectual ou deficiencia visual, nem sao atribuiveis a condicao neurologica que afete o movimento (paralisia cerebral, distrofia muscular, transtorno degenerativo)',
          },
        ],
        notes: 'Dificuldades motoras podem variar de "lento/desajeitado" ate graves deficits motores. Frequentemente coocorre com TDAH, TEA e transtornos de aprendizagem.',
      },
    },

    quickView: {
      definicao: 'Transtorno do neurodesenvolvimento caracterizado por marcante dificuldade na aquisicao e execucao de habilidades motoras coordenadas. Impacta AVDs, desempenho escolar e participacao em atividades fisicas. Inicio na infancia.',
      criteriosDiagnosticos: [
        'Habilidades motoras substancialmente abaixo do esperado para idade',
        'Manifestacoes: falta de jeito, lentidao, imprecisao motora',
        'Interferencia significativa em AVDs, escola, lazer',
        'Inicio no periodo de desenvolvimento',
        'Nao explicado por DI, deficit visual ou condicao neurologica',
        'Exclusao de paralisia cerebral, distrofia muscular',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Terapia Ocupacional focada em habilidades motoras',
          'Abordagens orientadas a tarefa (CO-OP: Cognitive Orientation to Occupational Performance)',
          'Treinamento de habilidades especificas (escrita, vestir)',
          'Educacao fisica adaptada',
          'Adaptacoes escolares (uso de computador, tempo extra)',
          'Psicoeducacao para pais e escola',
          'Atividades para desenvolver coordenacao (natacao, artes marciais)',
        ],
        farmacologico: [
          'NAO ha tratamento farmacologico para TDC',
          'Tratar comorbidades:',
          'TDAH: Metilfenidato (comorbidade muito comum)',
          'Ansiedade: apoio psicologico, ISRS se necessario',
        ],
      },
      metasTerapeuticas: [
        'Melhora da coordenacao motora fina e grossa',
        'Independencia em AVDs (vestir, alimentar, higiene)',
        'Melhora da escrita (ou adaptacao com digitacao)',
        'Participacao em atividades fisicas e sociais',
        'Autoestima e confianca',
      ],
      examesIniciais: [
        'Avaliacao clinica do desenvolvimento motor',
        'MABC-2 (Movement Assessment Battery for Children)',
        'DCDQ (Developmental Coordination Disorder Questionnaire)',
        'Avaliacao neuropsicologica (excluir DI)',
        'Avaliacao visual',
        'Avaliacao neurologica (excluir PC, doenca muscular)',
      ],
      redFlags: [
        'Regressao motora (investigar doenca neuromuscular)',
        'Fraqueza muscular progressiva',
        'Sinais de paralisia cerebral',
        'Sinais neurologicos focais',
        'Baixa autoestima e isolamento social',
      ],
    },

    escalasAvaliacao: [
      {
        name: 'MABC-2 (Movement Assessment Battery for Children)',
        description: 'Avaliacao padrao-ouro para funcao motora em criancas 3-16 anos.',
        cutoff: 'Percentil <=5 indica TDC; 5-15 indica risco',
        reference: 'Henderson et al., 2007',
      },
      {
        name: 'DCDQ (Developmental Coordination Disorder Questionnaire)',
        description: 'Questionario de triagem para pais. Versao DCDQ-Brasil validada.',
        reference: 'Wilson et al., 2009',
      },
      {
        name: 'BOT-2 (Bruininks-Oseretsky Test of Motor Proficiency)',
        description: 'Avaliacao detalhada de proficiencia motora.',
        reference: 'Bruininks & Bruininks, 2005',
      },
    ],

    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'Terapia Ocupacional (CO-OP ou NTT)',
        frequencia: 'Semanal ou 2x/semana',
        duracao: '3-6 meses iniciais; manutencao conforme necessidade',
      },
      farmacoterapia: {
        classe: 'Apenas para comorbidades',
        medicamentos: ['metilfenidato'],
        doseInicial: 'Conforme comorbidade',
        duracao: 'Conforme comorbidade',
      },
    },

    criteriosEncaminhamento: [
      'Terapia Ocupacional especializada',
      'Fisioterapia (se dificuldades motoras grossas significativas)',
      'Neuropediatra (para exclusao de causas neurologicas)',
      'Psiquiatria se TDAH ou ansiedade comorbida',
      'Avaliacao neuropsicologica completa',
    ],

    urgencia: {
      riscosuicida: false,
      riscoAgressao: false,
      riscoAutolesao: false,
      criterios: [
        'Depressao ou ansiedade grave secundaria',
        'Recusa escolar por bullying',
        'Isolamento social extremo',
      ],
    },

    comorbidadesComuns: [
      'tdah-combinado',
      'transtorno-aprendizagem-leitura',
      'transtorno-aprendizagem-escrita',
      'transtorno-espectro-autista',
      'transtorno-ansiedade-generalizada',
    ],

    tags: ['coordenacao', 'motor', 'dispraxia', 'tdc', 'dcd', 'neurodesenvolvimento', 'dsm5'],
  },

  // ============================================================================
  // 8. TRANSTORNO DE TIQUE / SINDROME DE TOURETTE
  // ============================================================================
  {
    id: 'sindrome-tourette',
    titulo: 'Transtorno de Tique - Sindrome de Tourette',
    sinonimos: ['Sindrome de Gilles de la Tourette', 'Tourette Syndrome', 'TS', 'Transtorno de tiques multiplos'],
    categoria: 'saude_mental',
    subcategoria: 'neurodesenvolvimento',

    // Ontologias
    doid: 'DOID:11119',
    snomedCT: '1097711000119103', // Gilles de la Tourette syndrome
    meshId: 'D005879',
    umlsCui: 'C0040517',

    // Classificacoes
    cid10: ['F95.2'],
    cid11: ['8A05.00'],
    ciap2: ['P81'],

    dsm5: {
      code: '307.23',
      codeAlternative: 'F95.2',
      category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
      diagnosticCriteria: {
        code: '307.23',
        name: 'Tourette\'s Disorder',
        category: DSM5_CATEGORIES.NEURODEVELOPMENTAL,
        criteria: [
          {
            letter: 'A',
            text: 'Multiplos tiques motores e um ou mais tiques vocais estiveram presentes em algum momento durante a doenca, embora nao necessariamente de forma concorrente',
          },
          {
            letter: 'B',
            text: 'Os tiques podem aumentar e diminuir em frequencia, mas persistiram por mais de 1 ano desde o inicio do primeiro tique',
          },
          {
            letter: 'C',
            text: 'O inicio ocorre antes dos 18 anos de idade',
          },
          {
            letter: 'D',
            text: 'A perturbacao nao e atribuivel aos efeitos fisiologicos de uma substancia (p. ex., cocaina) ou outra condicao medica (p. ex., doenca de Huntington, encefalite pos-viral)',
          },
        ],
        notes: 'Diferenciar de Transtorno de Tique Motor ou Vocal Persistente (apenas motor OU vocal) e Transtorno de Tique Provisorio (<1 ano).',
      },
    },

    quickView: {
      definicao: 'Transtorno do neurodesenvolvimento caracterizado pela presenca de multiplos tiques motores E pelo menos um tique vocal, com duracao >1 ano. Inicio antes dos 18 anos. Curso flutuante (waxing and waning). Frequentemente associado a TDAH e TOC.',
      criteriosDiagnosticos: [
        'Multiplos tiques motores E >=1 tique vocal',
        'Tiques presentes (nao necessariamente simultaneos) em algum momento',
        'Duracao >1 ano desde inicio do primeiro tique',
        'Inicio antes dos 18 anos',
        'Nao atribuivel a substancias ou condicao medica',
        'Curso flutuante e caracteristico',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Psicoeducacao (familia, escola, paciente)',
          'CBIT (Comprehensive Behavioral Intervention for Tics) - primeira linha',
          'Terapia de Reversao de Habito (HRT)',
          'Exposicao e Prevencao de Resposta (ERP) para urgencia premonitoria',
          'Manejo do estresse e ansiedade',
          'Acomodacoes escolares se necessario',
        ],
        farmacologico: [
          'ALFA-AGONISTAS (primeira linha farmacologica):',
          'Clonidina 0,05-0,3mg/dia (dividido em 2-4 doses)',
          'Guanfacina 0,5-4mg/dia (nao disponivel no Brasil)',
          'ANTIPSICOTICOS (segunda linha, mais eficazes para tiques graves):',
          'Aripiprazol 2-15mg/dia (menor perfil de efeitos adversos)',
          'Risperidona 0,5-3mg/dia',
          'Haloperidol 0,5-4mg/dia (eficaz, mas mais efeitos adversos)',
          'Topiramato (alternativa)',
        ],
      },
      metasTerapeuticas: [
        'Reducao da frequencia e intensidade dos tiques',
        'Melhora da qualidade de vida',
        'Tratamento de comorbidades (TDAH, TOC)',
        'Funcionamento social e academico adequado',
        'Manejo do estigma',
      ],
      examesIniciais: [
        'Historia clinica detalhada (fenomenologia, idade de inicio, curso)',
        'Exame neurologico (excluir causas secundarias)',
        'Avaliacao de comorbidades (TDAH, TOC, ansiedade)',
        'Escalas de avaliacao de tiques (YGTSS)',
        'Exames complementares apenas se suspeita de causa secundaria',
      ],
      redFlags: [
        'Inicio apos 18 anos (investigar causas secundarias)',
        'Tiques que nao flutuam',
        'Sinais neurologicos associados',
        'Autolesao por tiques (raro mas possivel)',
        'TOC grave comorbido',
        'Depressao ou ideacao suicida',
      ],
    },

    escalasAvaliacao: [
      {
        name: 'YGTSS (Yale Global Tic Severity Scale)',
        description: 'Padrao-ouro para avaliacao de gravidade de tiques. Avalia numero, frequencia, intensidade, complexidade e interferencia.',
        reference: 'Leckman et al., 1989',
      },
      {
        name: 'PUT (Premonitory Urge for Tics Scale)',
        description: 'Avalia urgencias premonitorias que precedem os tiques.',
        reference: 'Woods et al., 2005',
      },
      {
        name: 'PUTS (Premonitory Urge for Tics Scale - criancas)',
        description: 'Versao para criancas da avaliacao de urgencia premonitoria.',
        reference: 'Woods et al., 2005',
      },
    ],

    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'CBIT (Comprehensive Behavioral Intervention for Tics)',
        frequencia: 'Semanal',
        duracao: '8-12 sessoes',
      },
      farmacoterapia: {
        classe: 'Alfa-agonistas ou antipsicoticos',
        medicamentos: ['clonidina', 'aripiprazol', 'risperidona'],
        doseInicial: 'Clonidina 0,05mg/noite ou Aripiprazol 2mg/dia',
        titulacao: 'Aumentar lentamente a cada 1-2 semanas',
        duracao: 'Minimo 6-12 meses; tentativas de reducao apos melhora sustentada',
      },
    },

    criteriosEncaminhamento: [
      'Confirmacao diagnostica por neurologista ou psiquiatra',
      'Tiques moderados a graves',
      'CBIT indisponivel localmente',
      'Comorbidades complexas (TOC grave, TDAH)',
      'Refratariedade a tratamento inicial',
      'Considerar DBS em casos refratarios graves (adultos)',
    ],

    urgencia: {
      riscosuicida: true,
      riscoAgressao: false,
      riscoAutolesao: true,
      criterios: [
        'Autolesao por tiques (morder, bater cabeca)',
        'Depressao grave comorbida com ideacao suicida',
        'Bullying grave com consequencias emocionais',
      ],
    },

    comorbidadesComuns: [
      'tdah-combinado',
      'transtorno-obsessivo-compulsivo',
      'transtorno-ansiedade-generalizada',
      'transtorno-opositor-desafiador',
      'transtorno-aprendizagem-leitura',
      'depressao-infancia',
    ],

    tags: ['tourette', 'tique', 'tic', 'motor', 'vocal', 'neurodesenvolvimento', 'cbit', 'dsm5'],
  },

  // ============================================================================
  // 9. MUTISMO SELETIVO
  // ============================================================================
  {
    id: 'mutismo-seletivo',
    titulo: 'Mutismo Seletivo',
    sinonimos: ['Selective Mutism', 'SM', 'Mutismo eletivo'],
    categoria: 'saude_mental',
    subcategoria: 'ansiedade',

    // Ontologias
    doid: 'DOID:0060831',
    snomedCT: '42130000', // Elective mutism
    meshId: 'D009155',
    umlsCui: 'C0302259',

    // Classificacoes
    cid10: ['F94.0'],
    cid11: ['6B06'],
    ciap2: ['P22'],

    dsm5: {
      code: '312.23',
      codeAlternative: 'F94.0',
      category: DSM5_CATEGORIES.ANXIETY,
      diagnosticCriteria: {
        code: '312.23',
        name: 'Selective Mutism',
        category: DSM5_CATEGORIES.ANXIETY,
        criteria: [
          {
            letter: 'A',
            text: 'Fracasso persistente em falar em situacoes sociais especificas nas quais existe expectativa de fala (p. ex., na escola), apesar de falar em outras situacoes',
          },
          {
            letter: 'B',
            text: 'A perturbacao interfere na realizacao educacional ou ocupacional ou na comunicacao social',
          },
          {
            letter: 'C',
            text: 'A duracao minima e de 1 mes (nao limitada ao primeiro mes de escola)',
          },
          {
            letter: 'D',
            text: 'O fracasso em falar nao e atribuivel a falta de conhecimento ou desconforto com a lingua falada exigida na situacao social',
          },
          {
            letter: 'E',
            text: 'A perturbacao nao e mais bem explicada por transtorno da comunicacao (p. ex., transtorno da fluencia com inicio na infancia) e nao ocorre exclusivamente durante o curso de transtorno do espectro autista, esquizofrenia ou outro transtorno psicotico',
          },
        ],
        notes: 'Frequentemente associado a ansiedade social intensa. Criancas podem comunicar-se por meios nao verbais. Mais comum em criancas bilingues ou imigrantes, mas nao explicado apenas por barreiras linguisticas.',
      },
    },

    quickView: {
      definicao: 'Transtorno de ansiedade caracterizado por incapacidade persistente de falar em situacoes sociais especificas (escola, publico) apesar de falar normalmente em outras situacoes (casa). Duracao >1 mes. Base ansiosa.',
      criteriosDiagnosticos: [
        'Fracasso persistente em falar em situacoes sociais especificas',
        'Fala normalmente em outras situacoes (ex: em casa)',
        'Interferencia educacional, ocupacional ou social',
        'Duracao >=1 mes (nao apenas primeiro mes de escola)',
        'Nao explicado por desconhecimento da lingua',
        'Exclusao de transtorno de comunicacao, TEA, psicose',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'TCC com exposicao gradual (padrao-ouro)',
          'Tecnica de Fading (dessensibilizacao gradual)',
          'Reforco positivo por comunicacao verbal',
          'Intervencao escolar (adaptacoes, reducao de pressao)',
          'Psicoeducacao para pais e professores',
          'Treino de pais para facilitar comunicacao',
          'Evitar acomodacao excessiva que reforce o mutismo',
        ],
        farmacologico: [
          'ISRS (se ansiedade grave ou TCC insuficiente):',
          'Fluoxetina 5-20mg/dia (iniciar baixo, aumentar devagar)',
          'Sertralina 25-100mg/dia',
          'Medicacao como adjuvante a TCC, nao isoladamente',
          'Considerar se mutismo grave ou refratario',
        ],
      },
      metasTerapeuticas: [
        'Inicio e aumento gradual da fala em situacoes-alvo',
        'Reducao da ansiedade social',
        'Comunicacao verbal adequada na escola',
        'Participacao em atividades sociais',
        'Generalizacao para novos contextos',
      ],
      examesIniciais: [
        'Historia clinica detalhada (inicio, contextos, gatilhos)',
        'Avaliacao de linguagem (excluir transtorno de comunicacao)',
        'Avaliacao de ansiedade social',
        'Exclusao de TEA (pode haver sobreposicao)',
        'Avaliacao auditiva (exclusao)',
        'Entrevista com escola',
      ],
      redFlags: [
        'Ausencia total de fala em todas as situacoes (nao e mutismo seletivo)',
        'Regressao de linguagem',
        'Sinais de TEA',
        'Traumatismo ou abuso',
        'Mutismo de inicio subito (investigar trauma ou psicose)',
      ],
    },

    escalasAvaliacao: [
      {
        name: 'SMQ (Selective Mutism Questionnaire)',
        description: 'Questionario para pais sobre comportamento de fala em diferentes contextos.',
        reference: 'Bergman et al., 2008',
      },
      {
        name: 'SSQ (School Speech Questionnaire)',
        description: 'Questionario para professores sobre comunicacao escolar.',
        reference: 'Bergman et al., 2002',
      },
      {
        name: 'SPAI-C (Social Phobia and Anxiety Inventory for Children)',
        description: 'Avalia ansiedade social em criancas.',
        reference: 'Beidel et al., 1995',
      },
    ],

    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TCC com exposicao gradual (Fading)',
        frequencia: 'Semanal',
        duracao: '12-24 sessoes; pode requerer intervencao mais longa',
      },
      farmacoterapia: {
        classe: 'ISRS (adjuvante)',
        medicamentos: ['fluoxetina', 'sertralina'],
        doseInicial: 'Fluoxetina 5mg/dia ou Sertralina 25mg/dia',
        titulacao: 'Aumentar lentamente a cada 2-4 semanas',
        duracao: 'Minimo 6-12 meses apos resposta; descontinuacao gradual',
      },
    },

    criteriosEncaminhamento: [
      'Psicologia especializada em ansiedade infantil',
      'Psiquiatria se ISRS necessario',
      'Fonoaudiologia para avaliacao de linguagem',
      'Escola para intervencoes integradas',
      'Mutismo refratario a intervencoes iniciais',
    ],

    urgencia: {
      riscosuicida: false,
      riscoAgressao: false,
      riscoAutolesao: false,
      criterios: [
        'Recusa escolar prolongada',
        'Isolamento social extremo',
        'Depressao secundaria',
      ],
    },

    comorbidadesComuns: [
      'fobia-social',
      'transtorno-ansiedade-generalizada',
      'fobia-especifica',
      'transtorno-ansiedade-separacao',
      'transtorno-espectro-autista',
      'transtorno-opositor-desafiador',
    ],

    tags: ['mutismo', 'seletivo', 'ansiedade', 'fala', 'escola', 'crianca', 'exposicao', 'dsm5'],
  },

  // ============================================================================
  // 10. TRANSTORNO DE ANSIEDADE DE SEPARACAO
  // ============================================================================
  {
    id: 'transtorno-ansiedade-separacao',
    titulo: 'Transtorno de Ansiedade de Separacao',
    sinonimos: ['TAS', 'Separation Anxiety Disorder', 'SAD', 'Ansiedade de separacao'],
    categoria: 'saude_mental',
    subcategoria: 'ansiedade',

    // Ontologias
    doid: 'DOID:0090043',
    snomedCT: '109888004', // Separation anxiety disorder of childhood
    meshId: 'D001010',
    umlsCui: 'C0003477',

    // Classificacoes
    cid10: ['F93.0'],
    cid11: ['6B05'],
    ciap2: ['P74'],

    dsm5: {
      code: '309.21',
      codeAlternative: 'F93.0',
      category: DSM5_CATEGORIES.ANXIETY,
      diagnosticCriteria: {
        code: '309.21',
        name: 'Separation Anxiety Disorder',
        category: DSM5_CATEGORIES.ANXIETY,
        criteria: [
          {
            letter: 'A',
            text: 'Medo ou ansiedade impróprios e excessivos em relacao ao nivel de desenvolvimento concernente a separacao daqueles a quem o individuo esta apegado, conforme evidenciado por tres (ou mais) dos seguintes:',
            subCriteria: [
              { text: '1. Sofrimento excessivo e recorrente ante a ocorrencia ou previsao de afastamento de casa ou de figuras importantes de apego' },
              { text: '2. Preocupacao persistente e excessiva acerca da perda de figuras importantes de apego ou de possiveis danos a elas (doenca, ferimentos, desastres, morte)' },
              { text: '3. Preocupacao persistente e excessiva de que um evento indesejado leve a separacao de uma figura importante de apego (perder-se, ser sequestrado, ter acidente, ficar doente)' },
              { text: '4. Relutancia ou recusa persistente em sair de casa para escola, trabalho ou outro lugar por causa do medo da separacao' },
              { text: '5. Medo ou relutancia persistente e excessivo em ficar sozinho ou sem figuras importantes de apego em casa ou em outros ambientes' },
              { text: '6. Relutancia ou recusa persistente em dormir fora de casa ou em dormir sem estar perto de uma figura importante de apego' },
              { text: '7. Pesadelos repetidos envolvendo o tema da separacao' },
              { text: '8. Queixas repetidas de sintomas somaticos (dores de cabeca, dores de estomago, nauseas, vomitos) quando a separacao de figuras importantes de apego ocorre ou e prevista' },
            ],
          },
          {
            letter: 'B',
            text: 'O medo, a ansiedade ou a esquiva e persistente, durando pelo menos 4 semanas em criancas e adolescentes e tipicamente 6 meses ou mais em adultos',
          },
          {
            letter: 'C',
            text: 'A perturbacao causa sofrimento clinicamente significativo ou prejuizo no funcionamento social, academico, ocupacional ou em outras areas importantes da vida do individuo',
          },
          {
            letter: 'D',
            text: 'A perturbacao nao e mais bem explicada por outro transtorno mental',
          },
        ],
        notes: 'Pode ocorrer em adultos tambem. Frequentemente precursor de outros transtornos de ansiedade. Diferenciar de recusa escolar por outras causas.',
      },
    },

    quickView: {
      definicao: 'Medo ou ansiedade excessivos e inapropriados para o nivel de desenvolvimento em relacao a separacao de figuras de apego. Manifesta-se por sofrimento ante separacao, preocupacao com perda/dano, recusa escolar, sintomas somaticos. Duracao >=4 semanas.',
      criteriosDiagnosticos: [
        '3 ou mais sintomas de ansiedade de separacao',
        'Sofrimento excessivo ante separacao real ou prevista',
        'Preocupacao com perda ou dano a figuras de apego',
        'Recusa em sair de casa, escola, dormir separado',
        'Sintomas somaticos (cefaleia, dor abdominal)',
        'Duracao >=4 semanas (>=6 meses em adultos)',
        'Prejuizo funcional significativo',
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'TCC (padrao-ouro): exposicao gradual a separacao',
          'Psicoeducacao para crianca e pais',
          'Treino de pais (manejo de comportamentos de evitacao)',
          'Reestruturacao cognitiva (pensamentos catastroficos)',
          'Tecnicas de relaxamento e enfrentamento',
          'Evitar acomodacao excessiva dos pais',
          'Intervencao escolar para recusa escolar',
        ],
        farmacologico: [
          'ISRS (se TCC insuficiente ou ansiedade grave):',
          'Fluoxetina 5-20mg/dia',
          'Sertralina 25-100mg/dia',
          'Fluvoxamina 25-200mg/dia',
          'Iniciar baixo, aumentar gradualmente',
          'Associar a TCC (nao usar isoladamente)',
        ],
      },
      metasTerapeuticas: [
        'Tolerancia a separacoes apropriadas para idade',
        'Retorno a escola se recusa escolar',
        'Reducao de sintomas somaticos',
        'Melhora do funcionamento social e academico',
        'Independencia progressiva adequada a idade',
      ],
      examesIniciais: [
        'Historia clinica detalhada',
        'Avaliacao de ansiedade (SCARED, SCAS)',
        'Avaliacao de depressao comorbida',
        'Exclusao de causas medicas de sintomas somaticos',
        'Avaliacao familiar (dinamica de apego)',
        'Informacoes escolares',
      ],
      redFlags: [
        'Recusa escolar prolongada (emergencia)',
        'Sintomas somaticos graves nao explicados',
        'Depressao comorbida significativa',
        'Eventos traumaticos recentes',
        'Ideacao suicida (rara, mas possivel em adolescentes)',
        'Disfuncao familiar grave',
      ],
    },

    escalasAvaliacao: [
      {
        name: 'SCARED (Screen for Child Anxiety Related Disorders)',
        description: 'Triagem de transtornos de ansiedade em criancas/adolescentes. Versao para crianca e pais.',
        cutoff: 'Score total >=25 indica ansiedade; subescala separacao >=5',
        reference: 'Birmaher et al., 1997',
      },
      {
        name: 'SCAS (Spence Children\'s Anxiety Scale)',
        description: 'Avalia ansiedade em criancas 8-15 anos. Subescala de ansiedade de separacao.',
        reference: 'Spence, 1998',
      },
      {
        name: 'SAI-P (Separation Anxiety Inventory - Parent)',
        description: 'Inventario especifico para ansiedade de separacao.',
        reference: 'Schneider et al., 2005',
      },
    ],

    tratamentoPrimeiraLinha: {
      psicoterapia: {
        tipo: 'TCC com exposicao gradual',
        frequencia: 'Semanal',
        duracao: '12-16 sessoes',
      },
      farmacoterapia: {
        classe: 'ISRS (adjuvante)',
        medicamentos: ['fluoxetina', 'sertralina', 'fluvoxamina'],
        doseInicial: 'Fluoxetina 5mg/dia ou Sertralina 25mg/dia',
        titulacao: 'Aumentar a cada 2-4 semanas ate dose terapeutica',
        duracao: 'Minimo 6-12 meses apos resposta',
      },
    },

    criteriosEncaminhamento: [
      'Psicologia especializada em ansiedade infantil',
      'Psiquiatria se ISRS necessario',
      'Recusa escolar prolongada',
      'Comorbidades (depressao, outros transtornos de ansiedade)',
      'Refratariedade a intervencoes iniciais',
    ],

    urgencia: {
      riscosuicida: true,
      riscoAgressao: false,
      riscoAutolesao: false,
      criterios: [
        'Recusa escolar completa prolongada (>2 semanas)',
        'Ideacao suicida (rara, especialmente em adolescentes)',
        'Depressao grave comorbida',
        'Sintomas somaticos graves (ex: vomitos persistentes)',
      ],
    },

    comorbidadesComuns: [
      'transtorno-ansiedade-generalizada',
      'fobia-especifica',
      'fobia-social',
      'mutismo-seletivo',
      'transtorno-panico',
      'depressao-infancia',
      'tdah-combinado',
    ],

    tags: ['separacao', 'ansiedade', 'apego', 'recusa-escolar', 'crianca', 'tcc', 'dsm5'],
  },
];

// ============================================================================
// EXPORTS E UTILITARIOS
// ============================================================================

/**
 * Total de transtornos da infancia neste modulo
 */
export const totalTranstornosInfancia = transtornosInfancia.length;

/**
 * Estatisticas do modulo
 */
export const transtornosInfanciaStats = {
  total: transtornosInfancia.length,
  porCategoria: {
    neurodesenvolvimento: transtornosInfancia.filter(t => t.subcategoria === 'neurodesenvolvimento').length,
    ansiedade: transtornosInfancia.filter(t => t.subcategoria === 'ansiedade').length,
  },
  ontologias: {
    comDOID: transtornosInfancia.filter(t => t.doid).length,
    comSNOMED: transtornosInfancia.filter(t => t.snomedCT).length,
    comMeSH: transtornosInfancia.filter(t => t.meshId).length,
    comUMLS: transtornosInfancia.filter(t => t.umlsCui).length,
    comCID11: transtornosInfancia.filter(t => t.cid11).length,
  },
  versao: '1.0.0',
  dataAtualizacao: '2026-01',
};
