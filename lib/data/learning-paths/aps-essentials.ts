/**
 * LEARNING PATH: APS ESSENTIALS
 * ==============================
 *
 * Fundamentos da Atenção Primária à Saúde
 * Core primary care knowledge for family medicine practitioners.
 */

import type { LearningPath } from '@/lib/types/learning';

export const apsEssentialsPath: LearningPath = {
  id: 'aps-essentials',
  titleKey: 'learning.paths.aps_essentials.title',
  descriptionKey: 'learning.paths.aps_essentials.description',
  icon: 'Heart',
  color: 'bg-blue-500',
  category: 'primary_care',
  difficulty: 'beginner',
  estimatedHours: 20,
  tags: ['aps', 'primary_care', 'family_medicine', 'fundamentals'],
  isPublished: true,
  version: '1.0.0',
  createdAt: '2024-12-21',
  updatedAt: '2024-12-21',

  certification: {
    enabled: true,
    titleKey: 'learning.certs.aps_essentials.title',
    descriptionKey: 'learning.certs.aps_essentials.description',
    minimumScore: 70,
    validityMonths: 24,
    accreditation: {
      organization: 'Darwin MFC',
      disclaimer: 'Este certificado é emitido pela plataforma Darwin MFC para fins educacionais. Não possui acreditação externa por conselhos profissionais.',
    },
  },

  modules: [
    // ==========================================================================
    // MÓDULO 1: Introdução à APS
    // ==========================================================================
    {
      id: 'aps-intro',
      titleKey: 'learning.modules.aps_intro.title',
      descriptionKey: 'learning.modules.aps_intro.description',
      type: 'content',
      order: 1,
      estimatedMinutes: 30,
      content: {
        type: 'content',
        contentType: 'custom',
        customContent: `
# Introdução à Atenção Primária à Saúde

## O que é APS?

A Atenção Primária à Saúde (APS) é o primeiro nível de atenção em saúde e se caracteriza por um conjunto de ações, no âmbito individual e coletivo, que abrange:

- **Promoção da saúde**
- **Prevenção de agravos**
- **Diagnóstico e tratamento**
- **Reabilitação**
- **Manutenção da saúde**

## Atributos Essenciais (Starfield)

1. **Acesso de primeiro contato**: A APS é a porta de entrada preferencial do sistema de saúde
2. **Longitudinalidade**: Acompanhamento ao longo do tempo, não apenas episódico
3. **Integralidade**: Reconhecimento de todas as necessidades de saúde
4. **Coordenação**: Integração de cuidados quando há múltiplos prestadores

## Atributos Derivados

- **Orientação familiar**: A família como unidade de cuidado
- **Orientação comunitária**: Reconhecimento do contexto social
- **Competência cultural**: Adaptação às características culturais

## Por que a APS é importante?

Sistemas de saúde com APS forte apresentam:
- Menor mortalidade
- Maior equidade
- Menor custo
- Maior satisfação dos usuários
        `,
      },
    },

    // ==========================================================================
    // MÓDULO 2: Hipertensão Arterial
    // ==========================================================================
    {
      id: 'aps-hipertensao',
      titleKey: 'learning.modules.hipertensao.title',
      descriptionKey: 'learning.modules.hipertensao.description',
      type: 'content',
      order: 2,
      estimatedMinutes: 45,
      prerequisites: ['aps-intro'],
      content: {
        type: 'content',
        contentType: 'disease',
        contentRef: 'hipertensao-arterial',
        sections: ['quickView', 'tratamento', 'acompanhamento'],
      },
    },

    {
      id: 'aps-hipertensao-quiz',
      titleKey: 'learning.modules.hipertensao_quiz.title',
      descriptionKey: 'learning.modules.hipertensao_quiz.description',
      type: 'quiz',
      order: 3,
      estimatedMinutes: 15,
      prerequisites: ['aps-hipertensao'],
      passingScore: 70,
      content: {
        type: 'quiz',
        shuffleQuestions: true,
        shuffleOptions: true,
        showFeedback: true,
        allowRetry: true,
        maxAttempts: 3,
        questions: [
          {
            id: 'has-q1',
            questionKey: 'Qual o valor de PA para diagnóstico de hipertensão arterial sistêmica em adultos?',
            type: 'single',
            difficulty: 'beginner',
            points: 10,
            options: [
              { id: 'a', textKey: '≥ 120/80 mmHg', isCorrect: false },
              { id: 'b', textKey: '≥ 130/80 mmHg', isCorrect: false },
              { id: 'c', textKey: '≥ 140/90 mmHg', isCorrect: true, feedbackKey: 'Correto! O diagnóstico de HAS é feito com PA ≥ 140/90 mmHg em duas ou mais aferições.' },
              { id: 'd', textKey: '≥ 160/100 mmHg', isCorrect: false },
            ],
            explanationKey: 'Segundo as diretrizes brasileiras (DBHA 2020), o diagnóstico de HAS é PA ≥ 140/90 mmHg.',
          },
          {
            id: 'has-q2',
            questionKey: 'Qual a primeira linha de tratamento para HAS não complicada?',
            type: 'multiple',
            difficulty: 'intermediate',
            points: 15,
            options: [
              { id: 'a', textKey: 'IECA (ex: enalapril)', isCorrect: true },
              { id: 'b', textKey: 'BRA (ex: losartana)', isCorrect: true },
              { id: 'c', textKey: 'Diuréticos tiazídicos', isCorrect: true },
              { id: 'd', textKey: 'Bloqueadores de canal de cálcio', isCorrect: true },
              { id: 'e', textKey: 'Betabloqueadores', isCorrect: false, feedbackKey: 'Betabloqueadores não são primeira linha para HAS não complicada.' },
            ],
            explanationKey: 'IECA, BRA, tiazídicos e BCC são opções de primeira linha. Betabloqueadores são reservados para indicações específicas.',
          },
          {
            id: 'has-q3',
            questionKey: 'Paciente com HAS e diabetes mellitus tipo 2. Qual classe é preferencial?',
            type: 'single',
            difficulty: 'intermediate',
            points: 15,
            options: [
              { id: 'a', textKey: 'Betabloqueador', isCorrect: false },
              { id: 'b', textKey: 'Diurético tiazídico', isCorrect: false },
              { id: 'c', textKey: 'IECA ou BRA', isCorrect: true, feedbackKey: 'Correto! IECA/BRA têm efeito nefroprotetor importante em diabéticos.' },
              { id: 'd', textKey: 'Alfa-bloqueador', isCorrect: false },
            ],
            explanationKey: 'Em diabéticos, IECA ou BRA são preferidos pelo efeito nefroprotetor.',
          },
          {
            id: 'has-q4',
            questionKey: 'Qual é a meta pressórica para a maioria dos hipertensos?',
            type: 'single',
            difficulty: 'beginner',
            points: 10,
            options: [
              { id: 'a', textKey: '< 120/80 mmHg', isCorrect: false },
              { id: 'b', textKey: '< 130/80 mmHg', isCorrect: true, feedbackKey: 'Correto! A meta atual é < 130/80 mmHg para a maioria.' },
              { id: 'c', textKey: '< 140/90 mmHg', isCorrect: false },
              { id: 'd', textKey: '< 150/90 mmHg', isCorrect: false },
            ],
            explanationKey: 'A meta de < 130/80 mmHg é recomendada para a maioria dos hipertensos.',
          },
        ],
      },
    },

    // ==========================================================================
    // MÓDULO 3: Diabetes Mellitus
    // ==========================================================================
    {
      id: 'aps-diabetes',
      titleKey: 'learning.modules.diabetes.title',
      descriptionKey: 'learning.modules.diabetes.description',
      type: 'content',
      order: 4,
      estimatedMinutes: 45,
      prerequisites: ['aps-intro'],
      content: {
        type: 'content',
        contentType: 'disease',
        contentRef: 'diabetes-mellitus-2',
        sections: ['quickView', 'tratamento', 'acompanhamento'],
      },
    },

    {
      id: 'aps-diabetes-case',
      titleKey: 'learning.modules.diabetes_case.title',
      descriptionKey: 'learning.modules.diabetes_case.description',
      type: 'case_study',
      order: 5,
      estimatedMinutes: 30,
      prerequisites: ['aps-diabetes'],
      content: {
        type: 'case_study',
        case: {
          id: 'dm2-case-001',
          presentationKey: 'Mulher de 52 anos, obesa (IMC 32), procura UBS para check-up. Refere poliúria e polidipsia há 3 meses. HF+ para DM2 (mãe e irmão).',
          patientInfo: {
            ageRange: '50-59',
            sex: 'F',
            occupation: 'Professora',
          },
          learningObjectives: [
            'Reconhecer apresentação clássica de DM2',
            'Solicitar exames diagnósticos adequados',
            'Iniciar tratamento de primeira linha',
          ],
          relatedDiseases: ['diabetes-mellitus-2', 'obesidade'],
          stages: [
            {
              id: 'stage-1',
              titleKey: 'Avaliação Inicial',
              contentKey: 'A paciente apresenta sintomas clássicos (poliúria, polidipsia) e fatores de risco (obesidade, HF+). Qual sua conduta inicial?',
              decision: {
                questionKey: 'Quais exames você solicita?',
                options: [
                  {
                    id: 'opt-1a',
                    textKey: 'Apenas glicemia de jejum',
                    isOptimal: false,
                    consequenceKey: 'Glicemia de jejum isolada pode ser insuficiente. Considere HbA1c e TOTG.',
                    nextStage: 'stage-2-partial',
                  },
                  {
                    id: 'opt-1b',
                    textKey: 'Glicemia de jejum + HbA1c',
                    isOptimal: true,
                    consequenceKey: 'Excelente escolha! GJ e HbA1c permitem diagnóstico e avaliação do controle recente.',
                    nextStage: 'stage-2',
                  },
                  {
                    id: 'opt-1c',
                    textKey: 'Apenas HbA1c',
                    isOptimal: false,
                    consequenceKey: 'HbA1c é útil mas idealmente combinada com GJ.',
                    nextStage: 'stage-2-partial',
                  },
                ],
              },
            },
            {
              id: 'stage-2',
              titleKey: 'Resultados dos Exames',
              contentKey: 'Resultados: GJ = 156 mg/dL, HbA1c = 7.8%. O diagnóstico de DM2 está confirmado.',
              decision: {
                questionKey: 'Qual sua conduta terapêutica inicial?',
                options: [
                  {
                    id: 'opt-2a',
                    textKey: 'Apenas mudanças de estilo de vida',
                    isOptimal: false,
                    consequenceKey: 'Com HbA1c de 7.8%, MEV isolada pode ser insuficiente. Medicação é recomendada.',
                    nextStage: 'stage-3',
                  },
                  {
                    id: 'opt-2b',
                    textKey: 'Metformina + MEV',
                    isOptimal: true,
                    consequenceKey: 'Correto! Metformina é primeira linha, combinada com MEV.',
                    nextStage: 'stage-3',
                  },
                  {
                    id: 'opt-2c',
                    textKey: 'Insulina NPH',
                    isOptimal: false,
                    consequenceKey: 'Insulina não é necessária neste momento. Reserve para HbA1c > 9% ou sintomas graves.',
                    nextStage: 'stage-3',
                  },
                ],
              },
            },
            {
              id: 'stage-3',
              titleKey: 'Seguimento',
              contentKey: 'Paciente retorna em 3 meses. Aderiu ao tratamento, perdeu 3kg. HbA1c agora é 6.9%. Qual o próximo passo?',
              feedback: 'Excelente evolução! A meta de HbA1c < 7% foi atingida. Manter tratamento e acompanhamento trimestral/semestral.',
            },
          ],
        },
      },
    },

    // ==========================================================================
    // MÓDULO 4: Depressão
    // ==========================================================================
    {
      id: 'aps-depressao',
      titleKey: 'learning.modules.depressao.title',
      descriptionKey: 'learning.modules.depressao.description',
      type: 'content',
      order: 6,
      estimatedMinutes: 40,
      prerequisites: ['aps-intro'],
      content: {
        type: 'content',
        contentType: 'disease',
        contentRef: 'depressao',
        sections: ['quickView', 'tratamento'],
      },
    },

    {
      id: 'aps-depressao-quiz',
      titleKey: 'learning.modules.depressao_quiz.title',
      descriptionKey: 'learning.modules.depressao_quiz.description',
      type: 'quiz',
      order: 7,
      estimatedMinutes: 15,
      prerequisites: ['aps-depressao'],
      passingScore: 70,
      content: {
        type: 'quiz',
        shuffleQuestions: true,
        shuffleOptions: true,
        showFeedback: true,
        allowRetry: true,
        questions: [
          {
            id: 'dep-q1',
            questionKey: 'Qual é a ferramenta de rastreamento mais usada para depressão na APS?',
            type: 'single',
            difficulty: 'beginner',
            points: 10,
            options: [
              { id: 'a', textKey: 'PHQ-2/PHQ-9', isCorrect: true, feedbackKey: 'Correto! PHQ-2 para triagem, PHQ-9 para diagnóstico e acompanhamento.' },
              { id: 'b', textKey: 'Hamilton', isCorrect: false },
              { id: 'c', textKey: 'Beck', isCorrect: false },
              { id: 'd', textKey: 'GDS', isCorrect: false },
            ],
            explanationKey: 'PHQ-2/PHQ-9 são validados, rápidos e gratuitos.',
          },
          {
            id: 'dep-q2',
            questionKey: 'Qual ISRS é geralmente primeira escolha na APS?',
            type: 'single',
            difficulty: 'intermediate',
            points: 15,
            options: [
              { id: 'a', textKey: 'Fluoxetina', isCorrect: false },
              { id: 'b', textKey: 'Sertralina', isCorrect: true, feedbackKey: 'Sertralina tem bom perfil de segurança e é disponível no SUS.' },
              { id: 'c', textKey: 'Paroxetina', isCorrect: false },
              { id: 'd', textKey: 'Citalopram', isCorrect: false },
            ],
            explanationKey: 'Sertralina é preferida pela segurança cardiovascular e disponibilidade no SUS.',
          },
        ],
      },
    },

    // ==========================================================================
    // MÓDULO 5: Rastreamento de Câncer
    // ==========================================================================
    {
      id: 'aps-rastreamento',
      titleKey: 'learning.modules.rastreamento.title',
      descriptionKey: 'learning.modules.rastreamento.description',
      type: 'content',
      order: 8,
      estimatedMinutes: 45,
      prerequisites: ['aps-intro'],
      content: {
        type: 'content',
        contentType: 'custom',
        customContent: `
# Rastreamento de Câncer na APS

## Princípios do Rastreamento

O rastreamento oncológico deve seguir os critérios de Wilson & Jungner:
- Doença importante
- Teste aceitável
- Tratamento eficaz disponível
- Fase latente detectável
- Benefício > risco

## Câncer de Mama

| Recomendação | Idade | Intervalo |
|--------------|-------|-----------|
| Mamografia | 50-69 anos | Bienal |
| Exame clínico | ≥40 anos | Anual |

**Fatores de alto risco**: HF+ 1º grau, mutação BRCA, irradiação torácica prévia.

## Câncer de Colo Uterino

- **Papanicolaou**: 25-64 anos, trienal (após 2 anuais normais)
- **Teste HPV**: Alternativa a partir dos 30 anos

## Câncer Colorretal

- **Pesquisa de sangue oculto**: 50-75 anos, anual
- **Colonoscopia**: A cada 10 anos (se PSOF negativo)

## Câncer de Próstata

- **Decisão compartilhada** é fundamental
- Não há recomendação universal de rastreamento
- Discutir riscos e benefícios individualizados
        `,
      },
    },

    // ==========================================================================
    // MÓDULO FINAL: Avaliação Integradora
    // ==========================================================================
    {
      id: 'aps-avaliacao-final',
      titleKey: 'learning.modules.final_assessment.title',
      descriptionKey: 'learning.modules.final_assessment.description',
      type: 'quiz',
      order: 9,
      estimatedMinutes: 30,
      prerequisites: [
        'aps-hipertensao-quiz',
        'aps-diabetes-case',
        'aps-depressao-quiz',
        'aps-rastreamento',
      ],
      passingScore: 70,
      content: {
        type: 'quiz',
        shuffleQuestions: true,
        shuffleOptions: true,
        showFeedback: true,
        allowRetry: true,
        maxAttempts: 2,
        questions: [
          {
            id: 'final-q1',
            questionKey: 'Qual atributo da APS se refere ao acompanhamento contínuo ao longo do tempo?',
            type: 'single',
            difficulty: 'beginner',
            points: 10,
            options: [
              { id: 'a', textKey: 'Acesso de primeiro contato', isCorrect: false },
              { id: 'b', textKey: 'Longitudinalidade', isCorrect: true },
              { id: 'c', textKey: 'Integralidade', isCorrect: false },
              { id: 'd', textKey: 'Coordenação', isCorrect: false },
            ],
            explanationKey: 'Longitudinalidade é o acompanhamento ao longo do tempo, não apenas episódico.',
          },
          {
            id: 'final-q2',
            questionKey: 'Paciente de 55 anos, assintomático. Qual rastreamento é indicado?',
            type: 'multiple',
            difficulty: 'intermediate',
            points: 20,
            options: [
              { id: 'a', textKey: 'Pesquisa de sangue oculto nas fezes', isCorrect: true },
              { id: 'b', textKey: 'Papanicolaou (se mulher)', isCorrect: true },
              { id: 'c', textKey: 'Mamografia (se mulher)', isCorrect: true },
              { id: 'd', textKey: 'Colonoscopia de rotina', isCorrect: false },
              { id: 'e', textKey: 'PSA universal', isCorrect: false },
            ],
            explanationKey: 'PSOF, Papanicolaou e mamografia são recomendados nessa faixa etária.',
          },
          {
            id: 'final-q3',
            questionKey: 'Qual medicação requer monitoramento de função renal e eletrólitos?',
            type: 'multiple',
            difficulty: 'intermediate',
            points: 15,
            options: [
              { id: 'a', textKey: 'IECA', isCorrect: true },
              { id: 'b', textKey: 'Metformina', isCorrect: true },
              { id: 'c', textKey: 'Sertralina', isCorrect: false },
              { id: 'd', textKey: 'Diuréticos tiazídicos', isCorrect: true },
            ],
            explanationKey: 'IECA, metformina e tiazídicos requerem monitoramento de função renal.',
          },
        ],
      },
    },
  ],
};
