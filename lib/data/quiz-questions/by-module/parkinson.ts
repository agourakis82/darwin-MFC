import type { QuizQuestion } from '@/lib/types/learning';

export const parkinsonQuestions: QuizQuestion[] = [
  {
    id: 'quiz-parkinson-001',
    questionKey: 'Pergunta 1 sobre parkinson?',
    type: 'single',
    difficulty: 'beginner',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre parkinson', isCorrect: false },
        { id: 'b', textKey: 'Opção B sobre parkinson', isCorrect: true },
        { id: 'c', textKey: 'Opção C sobre parkinson', isCorrect: false },
        { id: 'd', textKey: 'Opção D sobre parkinson', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['parkinson', 'medicina', 'clinica']
  },
  {
    id: 'quiz-parkinson-002',
    questionKey: 'Pergunta 2 sobre parkinson?',
    type: 'multiple',
    difficulty: 'beginner',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre parkinson', isCorrect: false },
        { id: 'b', textKey: 'Opção B sobre parkinson', isCorrect: false },
        { id: 'c', textKey: 'Opção C sobre parkinson', isCorrect: true },
        { id: 'd', textKey: 'Opção D sobre parkinson', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['parkinson', 'medicina', 'clinica']
  },
  {
    id: 'quiz-parkinson-003',
    questionKey: 'Pergunta 3 sobre parkinson?',
    type: 'true_false',
    difficulty: 'beginner',
    points: 10,
    options: [
        { id: 'true', textKey: 'Verdadeiro', isCorrect: true },
        { id: 'false', textKey: 'Falso', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['parkinson', 'medicina', 'clinica']
  },
  {
    id: 'quiz-parkinson-004',
    questionKey: 'Pergunta 4 sobre parkinson?',
    type: 'matching',
    difficulty: 'intermediate',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre parkinson', isCorrect: true },
        { id: 'b', textKey: 'Opção B sobre parkinson', isCorrect: false },
        { id: 'c', textKey: 'Opção C sobre parkinson', isCorrect: false },
        { id: 'd', textKey: 'Opção D sobre parkinson', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['parkinson', 'medicina', 'clinica']
  },
  {
    id: 'quiz-parkinson-005',
    questionKey: 'Pergunta 5 sobre parkinson?',
    type: 'single',
    difficulty: 'intermediate',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre parkinson', isCorrect: false },
        { id: 'b', textKey: 'Opção B sobre parkinson', isCorrect: true },
        { id: 'c', textKey: 'Opção C sobre parkinson', isCorrect: false },
        { id: 'd', textKey: 'Opção D sobre parkinson', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['parkinson', 'medicina', 'clinica']
  },
  {
    id: 'quiz-parkinson-006',
    questionKey: 'Pergunta 6 sobre parkinson?',
    type: 'multiple',
    difficulty: 'intermediate',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre parkinson', isCorrect: false },
        { id: 'b', textKey: 'Opção B sobre parkinson', isCorrect: false },
        { id: 'c', textKey: 'Opção C sobre parkinson', isCorrect: true },
        { id: 'd', textKey: 'Opção D sobre parkinson', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['parkinson', 'medicina', 'clinica']
  },
  {
    id: 'quiz-parkinson-007',
    questionKey: 'Pergunta 7 sobre parkinson?',
    type: 'true_false',
    difficulty: 'intermediate',
    points: 10,
    options: [
        { id: 'true', textKey: 'Verdadeiro', isCorrect: true },
        { id: 'false', textKey: 'Falso', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['parkinson', 'medicina', 'clinica']
  },
  {
    id: 'quiz-parkinson-008',
    questionKey: 'Pergunta 8 sobre parkinson?',
    type: 'single',
    difficulty: 'advanced',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre parkinson', isCorrect: true },
        { id: 'b', textKey: 'Opção B sobre parkinson', isCorrect: false },
        { id: 'c', textKey: 'Opção C sobre parkinson', isCorrect: false },
        { id: 'd', textKey: 'Opção D sobre parkinson', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['parkinson', 'medicina', 'clinica']
  },
  {
    id: 'quiz-parkinson-009',
    questionKey: 'Pergunta 9 sobre parkinson?',
    type: 'multiple',
    difficulty: 'advanced',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre parkinson', isCorrect: false },
        { id: 'b', textKey: 'Opção B sobre parkinson', isCorrect: true },
        { id: 'c', textKey: 'Opção C sobre parkinson', isCorrect: false },
        { id: 'd', textKey: 'Opção D sobre parkinson', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['parkinson', 'medicina', 'clinica']
  },
  {
    id: 'quiz-parkinson-010',
    questionKey: 'Pergunta 10 sobre parkinson?',
    type: 'true_false',
    difficulty: 'advanced',
    points: 10,
    options: [
        { id: 'true', textKey: 'Verdadeiro', isCorrect: false },
        { id: 'false', textKey: 'Falso', isCorrect: true }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['parkinson', 'medicina', 'clinica']
  }
];
