import type { QuizQuestion } from '@/lib/types/learning';

export const choqueQuestions: QuizQuestion[] = [
  {
    id: 'quiz-choque-001',
    questionKey: 'Pergunta 1 sobre choque?',
    type: 'single',
    difficulty: 'beginner',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre choque', isCorrect: false },
        { id: 'b', textKey: 'Opção B sobre choque', isCorrect: true },
        { id: 'c', textKey: 'Opção C sobre choque', isCorrect: false },
        { id: 'd', textKey: 'Opção D sobre choque', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['choque', 'medicina', 'clinica']
  },
  {
    id: 'quiz-choque-002',
    questionKey: 'Pergunta 2 sobre choque?',
    type: 'multiple',
    difficulty: 'beginner',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre choque', isCorrect: false },
        { id: 'b', textKey: 'Opção B sobre choque', isCorrect: false },
        { id: 'c', textKey: 'Opção C sobre choque', isCorrect: true },
        { id: 'd', textKey: 'Opção D sobre choque', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['choque', 'medicina', 'clinica']
  },
  {
    id: 'quiz-choque-003',
    questionKey: 'Pergunta 3 sobre choque?',
    type: 'true_false',
    difficulty: 'beginner',
    points: 10,
    options: [
        { id: 'true', textKey: 'Verdadeiro', isCorrect: true },
        { id: 'false', textKey: 'Falso', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['choque', 'medicina', 'clinica']
  },
  {
    id: 'quiz-choque-004',
    questionKey: 'Pergunta 4 sobre choque?',
    type: 'matching',
    difficulty: 'intermediate',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre choque', isCorrect: true },
        { id: 'b', textKey: 'Opção B sobre choque', isCorrect: false },
        { id: 'c', textKey: 'Opção C sobre choque', isCorrect: false },
        { id: 'd', textKey: 'Opção D sobre choque', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['choque', 'medicina', 'clinica']
  },
  {
    id: 'quiz-choque-005',
    questionKey: 'Pergunta 5 sobre choque?',
    type: 'single',
    difficulty: 'intermediate',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre choque', isCorrect: false },
        { id: 'b', textKey: 'Opção B sobre choque', isCorrect: true },
        { id: 'c', textKey: 'Opção C sobre choque', isCorrect: false },
        { id: 'd', textKey: 'Opção D sobre choque', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['choque', 'medicina', 'clinica']
  },
  {
    id: 'quiz-choque-006',
    questionKey: 'Pergunta 6 sobre choque?',
    type: 'multiple',
    difficulty: 'intermediate',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre choque', isCorrect: false },
        { id: 'b', textKey: 'Opção B sobre choque', isCorrect: false },
        { id: 'c', textKey: 'Opção C sobre choque', isCorrect: true },
        { id: 'd', textKey: 'Opção D sobre choque', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['choque', 'medicina', 'clinica']
  },
  {
    id: 'quiz-choque-007',
    questionKey: 'Pergunta 7 sobre choque?',
    type: 'true_false',
    difficulty: 'intermediate',
    points: 10,
    options: [
        { id: 'true', textKey: 'Verdadeiro', isCorrect: true },
        { id: 'false', textKey: 'Falso', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['choque', 'medicina', 'clinica']
  },
  {
    id: 'quiz-choque-008',
    questionKey: 'Pergunta 8 sobre choque?',
    type: 'single',
    difficulty: 'advanced',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre choque', isCorrect: true },
        { id: 'b', textKey: 'Opção B sobre choque', isCorrect: false },
        { id: 'c', textKey: 'Opção C sobre choque', isCorrect: false },
        { id: 'd', textKey: 'Opção D sobre choque', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['choque', 'medicina', 'clinica']
  },
  {
    id: 'quiz-choque-009',
    questionKey: 'Pergunta 9 sobre choque?',
    type: 'multiple',
    difficulty: 'advanced',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre choque', isCorrect: false },
        { id: 'b', textKey: 'Opção B sobre choque', isCorrect: true },
        { id: 'c', textKey: 'Opção C sobre choque', isCorrect: false },
        { id: 'd', textKey: 'Opção D sobre choque', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['choque', 'medicina', 'clinica']
  },
  {
    id: 'quiz-choque-010',
    questionKey: 'Pergunta 10 sobre choque?',
    type: 'true_false',
    difficulty: 'advanced',
    points: 10,
    options: [
        { id: 'true', textKey: 'Verdadeiro', isCorrect: false },
        { id: 'false', textKey: 'Falso', isCorrect: true }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['choque', 'medicina', 'clinica']
  }
];
