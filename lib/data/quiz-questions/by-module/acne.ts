import type { QuizQuestion } from '@/lib/types/learning';

export const acneQuestions: QuizQuestion[] = [
  {
    id: 'quiz-acne-001',
    questionKey: 'Pergunta 1 sobre acne?',
    type: 'single',
    difficulty: 'beginner',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre acne', isCorrect: false },
        { id: 'b', textKey: 'Opção B sobre acne', isCorrect: true },
        { id: 'c', textKey: 'Opção C sobre acne', isCorrect: false },
        { id: 'd', textKey: 'Opção D sobre acne', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['acne', 'medicina', 'clinica']
  },
  {
    id: 'quiz-acne-002',
    questionKey: 'Pergunta 2 sobre acne?',
    type: 'multiple',
    difficulty: 'beginner',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre acne', isCorrect: false },
        { id: 'b', textKey: 'Opção B sobre acne', isCorrect: false },
        { id: 'c', textKey: 'Opção C sobre acne', isCorrect: true },
        { id: 'd', textKey: 'Opção D sobre acne', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['acne', 'medicina', 'clinica']
  },
  {
    id: 'quiz-acne-003',
    questionKey: 'Pergunta 3 sobre acne?',
    type: 'true_false',
    difficulty: 'beginner',
    points: 10,
    options: [
        { id: 'true', textKey: 'Verdadeiro', isCorrect: true },
        { id: 'false', textKey: 'Falso', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['acne', 'medicina', 'clinica']
  },
  {
    id: 'quiz-acne-004',
    questionKey: 'Pergunta 4 sobre acne?',
    type: 'matching',
    difficulty: 'intermediate',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre acne', isCorrect: true },
        { id: 'b', textKey: 'Opção B sobre acne', isCorrect: false },
        { id: 'c', textKey: 'Opção C sobre acne', isCorrect: false },
        { id: 'd', textKey: 'Opção D sobre acne', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['acne', 'medicina', 'clinica']
  },
  {
    id: 'quiz-acne-005',
    questionKey: 'Pergunta 5 sobre acne?',
    type: 'single',
    difficulty: 'intermediate',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre acne', isCorrect: false },
        { id: 'b', textKey: 'Opção B sobre acne', isCorrect: true },
        { id: 'c', textKey: 'Opção C sobre acne', isCorrect: false },
        { id: 'd', textKey: 'Opção D sobre acne', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['acne', 'medicina', 'clinica']
  },
  {
    id: 'quiz-acne-006',
    questionKey: 'Pergunta 6 sobre acne?',
    type: 'multiple',
    difficulty: 'intermediate',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre acne', isCorrect: false },
        { id: 'b', textKey: 'Opção B sobre acne', isCorrect: false },
        { id: 'c', textKey: 'Opção C sobre acne', isCorrect: true },
        { id: 'd', textKey: 'Opção D sobre acne', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['acne', 'medicina', 'clinica']
  },
  {
    id: 'quiz-acne-007',
    questionKey: 'Pergunta 7 sobre acne?',
    type: 'true_false',
    difficulty: 'intermediate',
    points: 10,
    options: [
        { id: 'true', textKey: 'Verdadeiro', isCorrect: true },
        { id: 'false', textKey: 'Falso', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['acne', 'medicina', 'clinica']
  },
  {
    id: 'quiz-acne-008',
    questionKey: 'Pergunta 8 sobre acne?',
    type: 'single',
    difficulty: 'advanced',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre acne', isCorrect: true },
        { id: 'b', textKey: 'Opção B sobre acne', isCorrect: false },
        { id: 'c', textKey: 'Opção C sobre acne', isCorrect: false },
        { id: 'd', textKey: 'Opção D sobre acne', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['acne', 'medicina', 'clinica']
  },
  {
    id: 'quiz-acne-009',
    questionKey: 'Pergunta 9 sobre acne?',
    type: 'multiple',
    difficulty: 'advanced',
    points: 10,
    options: [
        { id: 'a', textKey: 'Opção A sobre acne', isCorrect: false },
        { id: 'b', textKey: 'Opção B sobre acne', isCorrect: true },
        { id: 'c', textKey: 'Opção C sobre acne', isCorrect: false },
        { id: 'd', textKey: 'Opção D sobre acne', isCorrect: false }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['acne', 'medicina', 'clinica']
  },
  {
    id: 'quiz-acne-010',
    questionKey: 'Pergunta 10 sobre acne?',
    type: 'true_false',
    difficulty: 'advanced',
    points: 10,
    options: [
        { id: 'true', textKey: 'Verdadeiro', isCorrect: false },
        { id: 'false', textKey: 'Falso', isCorrect: true }
      ],
    explanationKey: 'Explicação baseada em evidências e diretrizes clínicas.',
    tags: ['acne', 'medicina', 'clinica']
  }
];
