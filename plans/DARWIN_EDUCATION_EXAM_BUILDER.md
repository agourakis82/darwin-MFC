# Darwin Education - Construtor de Provas Personalizadas com Ontologia

**Versão:** 1.0.0  
**Data:** 23 de Janeiro de 2026  
**Status:** Planejamento

---

## 📋 Resumo Executivo

O **Construtor de Provas Personalizadas** é um módulo exclusivo do Darwin Education que permite aos estudantes criar suas próprias provas baseadas em critérios personalizados, com o auxílio de uma ontologia médica hierárquica e IA para geração inteligente de questões.

### Diferencial Competitivo Único

Nenhum concorrente no mercado brasileiro oferece um construtor de provas personalizado com:
- Seleção de múltiplas bancas de provas
- Filtro por ontologia médica hierárquica
- Geração inteligente de questões por IA
- Simulação realista com timer
- Histórico e compartilhamento de provas

---

## 🎯 Objetivos

1. Permitir que estudantes simulem provas baseadas nas bancas que desejam prestar
2. Oferecer uma experiência de estudo mais personalizada e eficiente
3. Aumentar o engajamento através da possibilidade de criar provas customizadas
4. Diferenciar o Darwin Education dos concorrentes

---

## 🏗️ Arquitetura do Módulo

### Estrutura de Componentes

```
app/[locale]/
├── (dashboard)/
│   ├── exam-builder/
│   │   ├── page.tsx
│   │   ├── ExamBuilderClient.tsx
│   │   ├── components/
│   │   │   ├── BankSelector.tsx
│   │   │   ├── OntologyFilter.tsx
│   │   │   ├── DifficultySelector.tsx
│   │   │   ├── QuestionCountSelector.tsx
│   │   │   ├── DurationSelector.tsx
│   │   │   ├── ExamPreview.tsx
│   │   │   └── ExamHistory.tsx
│   │   └── [examId]/
│   │       └── page.tsx
│   └── community/
│       └── shared-exams/
│           └── [examId]/
│               └── page.tsx
└── api/
    └── custom-exams/
        ├── route.ts
        └── actions.ts

packages/shared/
├── types/
│   └── custom-exam.ts
├── services/
│   ├── ai/
│   │   ├── custom-exam-generator.ts
│   │   └── ontology-filter.ts
└── store/
    └── customExamStore.ts
```

---

## 📊 Modelo de Dados

### Entidades Principais

#### 1. Prova Personalizada (CustomExam)

```typescript
interface CustomExam {
  id: string;
  userId: string;
  title: string;
  description: string;
  targetExam: 'enamed' | 'residencia' | 'both';
  targetBanks: string[];
  selectedAreas: string[];
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  questionCount: number;
  duration: number; // em minutos
  questions: Question[];
  totalQuestions: number;
  isPublic: boolean; // se pode ser compartilhado
  createdAt: Date;
  updatedAt: Date;
  metadata: {
    difficulty: string;
    areas: string[];
    bankRepresentation: string[];
  };
}
```

#### 2. Tentativa de Prova Personalizada (CustomExamAttempt)

```typescript
interface CustomExamAttempt {
  id: string;
  userId: string;
  customExamId: string;
  startedAt: Date;
  completedAt?: Date;
  answers: ExamAnswer[];
  score: number;
  totalScore: number;
  percentage: number;
  passed: boolean;
  timeSpent: number; // em segundos
  createdAt: Date;
}
```

#### 3. Banco de Provas (ExamBank)

```typescript
interface ExamBank {
  id: string;
  name: string;
  type: 'enamed' | 'residencia' | 'other';
  year?: number;
  institution?: string;
  specialty?: string;
  icon: string;
  color: string;
  isActive: boolean;
  description: string;
  areas: string[]; // áreas de conhecimento disponíveis
  estimatedQuestions: number;
}
```

#### 4. Área de Conhecimento (OntologyArea)

```typescript
interface OntologyArea {
  id: string;
  name: string;
  parentId?: string;
  level: number; // 1-5, sendo 1 o mais básico
  description: string;
  icon: string;
  color: string;
  estimatedQuestions: number;
  weight: number; // peso para distribuição
  tags: string[];
}
```

#### 5. Filtro de Prova (ExamFilter)

```typescript
interface ExamFilter {
  targetExam: 'enamed' | 'residencia' | 'both';
  targetBanks: string[];
  selectedAreas: string[];
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  questionCount: number;
  duration: number;
  year?: number;
  institution?: string;
  tags?: string[];
}
```

---

## 🗄️ Schema do Banco de Dados (Supabase)

### Tabelas Principais

```sql
-- Exam Banks (Bancas de Provas)
CREATE TABLE exam_banks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('enamed', 'residencia', 'other')),
  year INTEGER,
  institution TEXT,
  specialty TEXT,
  icon TEXT,
  color TEXT,
  is_active BOOLEAN DEFAULT true,
  description TEXT,
  areas TEXT[] NOT NULL,
  estimated_questions INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ontology Areas (Áreas de Conhecimento)
CREATE TABLE ontology_areas (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id TEXT REFERENCES ontology_areas(id),
  level INTEGER NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  estimated_questions INTEGER,
  weight NUMERIC(5, 2) DEFAULT 1,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Custom Exams (Provas Personalizadas)
CREATE TABLE custom_exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  target_exam TEXT NOT NULL CHECK (target_exam IN ('enamed', 'residencia', 'both')),
  target_banks TEXT[] NOT NULL,
  selected_areas TEXT[] NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard', 'mixed')),
  question_count INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Custom Exam Questions (Questões das Provas Personalizadas)
CREATE TABLE custom_exam_questions (
  custom_exam_id UUID REFERENCES custom_exams(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  PRIMARY KEY (custom_exam_id, question_id)
);

-- Custom Exam Attempts (Tentativas das Provas Personalizadas)
CREATE TABLE custom_exam_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  custom_exam_id UUID REFERENCES custom_exams(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  answers JSONB NOT NULL,
  score INTEGER NOT NULL,
  total_score INTEGER NOT NULL,
  percentage NUMERIC(5, 2) NOT NULL,
  passed BOOLEAN NOT NULL,
  time_spent INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shared Exams (Provas Compartilhadas)
CREATE TABLE shared_exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_exam_id UUID REFERENCES custom_exams(id) ON DELETE CASCADE,
  shared_by UUID REFERENCES users(id) ON DELETE CASCADE,
  shared_at TIMESTAMPTZ DEFAULT NOW(),
  access_count INTEGER DEFAULT 0,
  rating_avg NUMERIC(3, 2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(original_exam_id, shared_by)
);
```

### Índices

```sql
-- Exam Banks
CREATE INDEX idx_exam_banks_type ON exam_banks(type);
CREATE INDEX idx_exam_banks_institution ON exam_banks(institution);
CREATE INDEX idx_exam_banks_specialty ON exam_banks(specialty);

-- Custom Exams
CREATE INDEX idx_custom_exams_user ON custom_exams(user_id);
CREATE INDEX idx_custom_exams_target_exam ON custom_exams(target_exam);
CREATE INDEX idx_custom_exams_is_public ON custom_exams(is_public);

-- Custom Exam Attempts
CREATE INDEX idx_custom_exam_attempts_user ON custom_exam_attempts(user_id);
CREATE INDEX idx_custom_exam_attempts_exam ON custom_exam_attempts(custom_exam_id);
CREATE INDEX idx_custom_exam_attempts_completed ON custom_exam_attempts(completed_at);

-- Shared Exams
CREATE INDEX idx_shared_exams_original ON shared_exams(original_exam_id);
CREATE INDEX idx_shared_exams_shared_by ON shared_exams(shared_by);
CREATE INDEX idx_shared_exams_rating ON shared_exams(rating_avg);
```

---

## 🎯 Funcionalidades Principais

### 1. Seleção de Bancas

- Lista de todas as bancas disponíveis
- Filtro por tipo (ENAMED, Residência)
- Informações sobre cada banco (ano, instituição, especialidade)
- Seleção múltipla de bancos simultâneamente
- Preview de quantas questões disponíveis por área

### 2. Filtro por Ontologia

- Visualização hierárquica de áreas de conhecimento
- Seleção de áreas por nível (1-5)
- Preview de quantas questões por área
- Tags e filtros adicionais
- Busca por texto em áreas e tags

### 3. Configuração de Prova

- Título e descrição personalizados
- Número de questões (10, 20, 30, 50, 100)
- Dificuldade (fácil, médio, difícil, misto)
- Duração da prova (30, 60, 90, 120, 180 minutos)
- Distribuição de questões por área

### 4. Geração Inteligente de Questões

- IA gera questões baseadas nas áreas selecionadas
- Balanceamento de dificuldade
- Distribuição proporcional entre áreas
- Explicações geradas por IA
- Validação de qualidade das questões

### 5. Simulação de Prova

- Timer realista com pausas
- Ambiente similar ao dia da prova
- Navegação entre questões
- Marcação de questões para revisão
- Feedback imediato após cada resposta

### 6. Histórico de Provas

- Lista de provas criadas pelo usuário
- Recriar prova a partir do histórico
- Estatísticas de desempenho por prova
- Comparação com outros usuários

### 7. Compartilhamento de Provas

- Tornar provas públicas para a comunidade
- Biblioteca de provas compartilhadas
- Rating e comentários nas provas compartilhadas
- Download de provas da comunidade

### 8. Análise de Desempenho

- Comparativo com usuários das mesmas bancas
- Ranking por prova personalizada
- Identificação de pontos fortes e fracos
- Recomendações de estudo baseadas no desempenho

---

## 🤖 Integração com IA

### Serviços de IA

```typescript
// services/ai/custom-exam-generator.ts

interface CustomExamGenerator {
  generateCustomExam(params: {
    userId: string;
    targetBanks: string[];
    selectedAreas: string[];
    difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
    questionCount: number;
    duration: number; // em minutos
  }): Promise<CustomExam>;
}

// services/ai/ontology-filter.ts

interface OntologyFilter {
  getAreasByBank(bank: string): Promise<OntologyArea[]>;
  getQuestionsByArea(area: string, difficulty: string): Promise<Question[]>;
  filterQuestionsByCriteria(criteria: ExamFilter): Promise<Question[]>;
}

interface ExamFilter {
  banks: string[];
  areas: string[];
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  questionCount: number;
  duration: number;
  year?: number;
  institution?: string;
  tags?: string[];
}
```

### Prompt Templates

```typescript
const CUSTOM_EXAM_PROMPT = `
Você é um especialista em preparação para ENAMED (Exame Nacional de Avaliação Médica para Estágio em Saúde da Família e Comunidade) e provas de residência médica.

Crie uma prova personalizada para um estudante com as seguintes critérios:
- Bancas de provas: {targetBanks}
- Áreas de conhecimento selecionadas: {selectedAreas}
- Dificuldade: {difficulty}
- Número de questões: {questionCount}
- Duração da prova: {duration} minutos

A prova deve incluir:
1. Questões equilibradas por dificuldade
2. Distribuição balanceada entre as áreas selecionadas
3. Questões que representem o nível real das provas dessas bancas
4. Explicações claras e baseadas em evidência
5. Alternativas plausíveis para as questões de múltipla escolha

Para cada questão, inclua:
- Enunciado claro e objetivo
- 4 ou 5 alternativas (A, B, C, D, E)
- Uma alternativa correta bem definida
- Explicação detalhada do por que a alternativa está correta
- Referência bibliográfica quando aplicável

Distribuição de dificuldade:
- 30% fáceis
- 40% médias
- 30% difíceis

Responda em formato JSON com a estrutura:
{
  "title": "Título da prova",
  "description": "Descrição",
  "questions": [
    {
      "id": "q1",
      "type": "single",
      "question": "Enunciado da questão",
      "options": [
        {"id": "a", "text": "Alternativa A"},
        {"id": "b", "text": "Alternativa B"},
        {"id": "c", "text": "Alternativa C"},
        {"id": "d", "text": "Alternativa D"},
        {"id": "e", "text": "Explicação"}
      ],
      "correctAnswer": "a",
      "explanation": "Explicação detalhada",
      "area": "Área de conhecimento",
      "difficulty": "easy|medium|hard",
      "tags": ["tag1", "tag2"],
      "source": "Banco X",
      "year": 2024,
      "institution": "Instituição X"
    }
  ],
  "metadata": {
    "difficulty": "distribuição balanceada",
    "areas": ["área1", "área2"],
    "bankRepresentation": ["Banco X", "Banco Y"]
  }
}
`;
```

---

## 🎨 Design System

### Componentes Principais

- **BankSelector**: Cards para seleção de bancos
- **OntologyFilter**: Visualização hierárquica de áreas
- **DifficultySelector**: Slider ou botões para dificuldade
- **QuestionCountSelector**: Input para número de questões
- **DurationSelector**: Slider para duração da prova
- **ExamPreview**: Preview da prova antes de iniciar
- **ExamHistory**: Lista de provas anteriores
- **SharedExams**: Biblioteca de provas da comunidade

### Paleta de Cores

```typescript
const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
  },
  examBuilder: {
    50: '#8b5cf6',
    100: '#a78bfa',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b91c0c',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
  },
};
```

---

## 📱 Estrutura de Rotas (Next.js App Router)

```
app/[locale]/
├── (dashboard)/
│   ├── exam-builder/
│   │   ├── page.tsx
│   │   ├── ExamBuilderClient.tsx
│   │   ├── components/
│   │   │   ├── BankSelector.tsx
│   │   │   ├── OntologyFilter.tsx
│   │   │   ├── DifficultySelector.tsx
│   │   │   ├── QuestionCountSelector.tsx
│   │   │   ├── DurationSelector.tsx
│   │   │   ├── ExamPreview.tsx
│   │   │   └── ExamHistory.tsx
│   │   └── [examId]/
│   │       └── page.tsx
│   └── community/
│       └── shared-exams/
│           └── [examId]/
│               └── page.tsx
└── api/
    └── custom-exams/
        ├── route.ts
        └── actions.ts
```

---

## 🔗 Integração com Darwin-MFC

### Compartilhamento de Dados Médicos

```typescript
// packages/shared/data-importer/

interface CustomExamDataImporter {
  importQuestionsByArea(area: string, count: number): Promise<Question[]>;
  importQuestionsByDifficulty(area: string, difficulty: string, count: number): Promise<Question[]>;
  importQuestionsByBank(bank: string, count: number): Promise<Question[]>;
}

// Mapeamento de áreas de conhecimento para ontologia
const ONTOLOGY_AREAS = {
  // ENAMED
  'saude_coleitiva': {
    name: 'Saúde Coletiva',
    level: 1,
    areas: ['saude_da_familia', 'saude_da_crianca', 'saude_do_idoso', 'saude_do_adolescente', 'saude_da_mulher'],
    estimatedQuestions: 500,
  },
  'saude_da_familia': {
    name: 'Saúde da Família',
    level: 2,
    areas: ['saude_coleitiva', 'saude_da_crianca', 'saude_do_idoso', 'saude_do_adolescente'],
    estimatedQuestions: 800,
  },
  'saude_da_crianca': {
    name: 'Saúde da Criança e Adolescente',
    level: 3,
    areas: ['pediatria', 'puericultura', 'pneumologia', 'dermatologia'],
    estimatedQuestions: 600,
  },
  'saude_do_idoso': {
    name: 'Saúde do Idoso',
    level: 4,
    areas: ['geriatria', 'oncologia', 'paliativo', 'cuidados paliativos'],
    estimatedQuestions: 400,
  },
  'saude_do_adolescente': {
    name: 'Saúde do Adolescente',
    level: 5,
    areas: ['ginecologia_obstetricia', 'saude_sexual', 'psicologia_jovem', 'toxicologia'],
    estimatedQuestions: 300,
  },
  // Residência - Especialidades
  'clinica_medica': {
    name: 'Clínica Médica',
    areas: ['cardiologia', 'pneumologia', 'gastroenterologia', 'nefrologia'],
    estimatedQuestions: 500,
  },
  'cirurgia_geral': {
    name: 'Cirurgia Geral',
    areas: ['cirurgia_geral', 'anestesiologia', 'trauma', 'ortopedia'],
    estimatedQuestions: 400,
  },
  'pediatria': {
    name: 'Pediatria',
    areas: ['neonatologia', 'puericultura', 'dermatologia', 'nutricao'],
    estimatedQuestions: 600,
  },
  'ginecologia_obstetricia': {
    name: 'Ginecologia e Obstetrícia',
    areas: ['ginecologia', 'obstetricia', 'pré-natal', 'puericultura'],
    estimatedQuestions: 500,
  },
  // ... mais especialidades
};
```

---

## 📊 Analytics e Monitoramento

### Métricas Principais

- **Engajamento**: Usuários ativos no construtor
- **Criação de Provas**: Número de provas criadas
- **Uso de Bancas**: Bancas mais populares
- **Áreas Selecionadas**: Áreas mais escolhidas
- **Tempo Médio de Estudo**: Tempo médio por prova
- **Taxa de Aprovação**: Aprovação nas provas simuladas

### Ferramentas

- **Analytics**: Google Analytics 4 / PostHog
- **Error Tracking**: Sentry
- **Performance**: Vercel Analytics
- **Database Monitoring**: Supabase Dashboard

---

## 🚀 Deployment

### Estratégia de CI/CD

```yaml
# .github/workflows/ci.yml

name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run type-check

  build-web:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build:web

  build-mobile:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: npm ci
      - run: eas build --platform all
```

### Ambientes

**Web:**
- **Development**: localhost + Supabase dev
- **Staging**: Vercel preview + Supabase staging
- **Production**: Vercel production + Supabase production

**Mobile:**
- **Development**: Expo Go + Supabase dev
- **Staging**: TestFlight (iOS) + Internal Testing (Android) + Supabase staging
- **Production**: App Store (iOS) + Google Play Store (Android) + Supabase production

---

## 📝 Próximos Passos

### Fase 1: Setup e Infraestrutura (Semanas 1-2)
1. Setup do monorepo
2. Configuração do Supabase
3. Setup do Expo
4. Configuração de CI/CD

### Fase 2: Banco de Dados (Semanas 3-4)
5. Criar tabelas de bancos de provas
6. Criar estrutura de ontologia hierárquica
7. Importar dados de bancos de provas conhecidos
8. Criar seeds iniciais

### Fase 3: Serviços de IA (Semanas 5-6)
9. Implementar gerador de provas personalizadas
10. Implementar filtro por ontologia
11. Criar prompts otimizados

### Fase 4: UI do Construtor (Semanas 7-10)
12. Criar seletor de bancos
13. Criar filtro de ontologia visual
14. Criar seletor de dificuldade
15. Criar preview de prova

### Fase 5: Funcionalidades Core (Semanas 11-14)
16. Implementar geração de provas
17. Implementar simulação de prova
18. Implementar histórico de provas
19. Implementar compartilhamento

### Fase 6: Análise e Analytics (Semanas 15-16)
20. Implementar analytics do construtor
21. Criar relatórios de uso

### Fase 7: Testes e Documentação (Semanas 17-18)
22. Implementar testes unitários
23. Implementar testes E2E
24. Criar documentação do módulo

---

## 📚 Referências

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Expo Documentation](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org/docs/getting-started)

---

**Documento criado por:** Roo (Architect Mode)  
**Última atualização:** 23 de Janeiro de 2026  
**Versão:** 1.0.0
