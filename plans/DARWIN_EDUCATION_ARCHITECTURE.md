# Darwin Education - Arquitetura e Planejamento

**Versão:** 1.1.0
**Data:** 23 de Janeiro de 2026
**Status:** Planejamento

---

## 📋 Resumo Executivo

O **Darwin Education** é uma aplicação independente focada na preparação de estudantes de medicina para o Enam (Exame Nacional de Avaliação Médica) e provas de residência médica de todas as instituições brasileiras e especialidades.

### Diferenciais Competitivos

- Simulações de prova com timer e ambiente realista
- Análise de desempenho detalhada por área de conhecimento
- Banco de questões com comentários de especialistas
- Trilhas de estudo personalizadas baseadas em IA
- Ranking comparativo com outros usuários
- Casos clínicos interativos
- Flashcards com spaced repetition otimizado
- Vídeo-aulas explicativas

### Modelo de Negócio

- **Modelo Freemium**: Recursos básicos gratuitos + Premium com recursos avançados

### Stack Tecnológica

**Web:**
- **Frontend**: Next.js 15+ (App Router) + TypeScript
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **State Management**: Zustand
- **Styling**: Tailwind CSS + shadcn/ui
- **IA**: OpenAI API (ou alternativas open-source)
- **Deployment**: Vercel (frontend) + Supabase (backend)

**Mobile (iOS/Android):**
- **Framework**: React Native com Expo
- **Navigation**: React Navigation
- **State Management**: Zustand (compartilhado com web)
- **Styling**: NativeWind (Tailwind CSS para React Native)
- **Backend**: Supabase (compartilhado com web)
- **Push Notifications**: Expo Notifications
- **Deployment**: App Store (iOS) + Google Play Store (Android)

---

## 🏗️ Arquitetura do Sistema

### Estrutura de Monorepo

```
darwin-education/
├── apps/
│   ├── web/                    # Aplicação web principal (Next.js)
│   │   ├── app/                # Next.js App Router
│   │   ├── components/         # Componentes web específicos
│   │   └── public/            # Assets estáticos
│   └── mobile/                 # Aplicação mobile (React Native + Expo)
│       ├── src/
│       │   ├── components/      # Componentes mobile específicos
│       │   ├── screens/        # Telas do app
│       │   ├── navigation/      # Configuração de navegação
│       │   └── hooks/         # Hooks React Native específicos
│       ├── assets/              # Imagens, ícones, fontes
│       └── app.json            # Configuração Expo
├── packages/
│   ├── shared/                  # Código compartilhado entre web e mobile
│   │   ├── types/              # Tipos TypeScript compartilhados
│   │   ├── utils/              # Utilitários compartilhados
│   │   ├── constants/         # Constantes compartilhadas
│   │   ├── api/               # Cliente Supabase compartilhado
│   │   └── stores/            # Zustand stores compartilhados
│   ├── database/               # Migrations e seeds do banco
│   │   ├── migrations/         # SQL migrations
│   │   └── seeds/             # Dados iniciais
│   └── ui/                    # Componentes UI compartilhados
│       ├── web/                # Componentes para web
│       └── mobile/             # Componentes para mobile
├── services/
│   ├── ai/                     # Serviços de IA
│   ├── notifications/           # Serviço de notificações (push + email)
│   ├── payments/               # Serviço de pagamentos
│   └── analytics/              # Serviço de analytics
├── scripts/
│   ├── data-import/             # Scripts de importação do Darwin-MFC
│   └── deployment/            # Scripts de deployment
└── docs/                      # Documentação
    ├── architecture/           # Documentação de arquitetura
    ├── api/                   # Documentação de API
    └── mobile/                # Documentação específica mobile
```

### Arquitetura em Camadas

```
┌─────────────────────────────────────────────────────────────┐
│                  Presentation Layer                         │
│  ┌─────────────────────┐  ┌─────────────────────────┐   │
│  │     Web (Next.js)   │  │  Mobile (React Native) │   │
│  │  - App Router       │  │  - React Navigation    │   │
│  │  - React Components │  │  - Native Components   │   │
│  │  - Tailwind CSS     │  │  - NativeWind         │   │
│  └─────────────────────┘  └─────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  Business Logic Layer                      │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Shared (packages/shared)                          │  │
│  │  - Zustand Stores                                 │  │
│  │  - Custom Hooks                                   │  │
│  │  - Services (AI, Analytics, etc.)                  │  │
│  │  - Utils & Validators                              │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  Data Access Layer                         │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Supabase Client (packages/shared/api)            │  │
│  │  - Auth                                           │  │
│  │  - Database                                       │  │
│  │  - Realtime                                       │  │
│  │  - Storage                                        │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  External Services                          │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  - AI API (OpenAI)                               │  │
│  │  - Payment Gateway (Stripe)                        │  │
│  │  - Email Service (Supabase/Resend)                │  │
│  │  - Push Notifications (Expo)                       │  │
│  │  - Storage (Supabase Storage)                      │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Modelo de Dados

### Entidades Principais

#### 1. Usuário (User)

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'premium';
  planExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  settings: UserSettings;
  statistics: UserStatistics;
}
```

#### 2. Questão (Question)

```typescript
interface Question {
  id: string;
  type: 'single' | 'multiple' | 'true_false' | 'ordering' | 'fill_blank';
  content: string;
  options: QuestionOption[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  area: KnowledgeArea;
  tags: string[];
  source: ExamSource;
  year?: number;
  institution?: string;
  specialty?: string;
  createdAt: Date;
  updatedAt: Date;
  author?: ExpertComment;
}
```

#### 3. Prova (Exam)

```typescript
interface Exam {
  id: string;
  title: string;
  type: 'enam' | 'residencia' | 'simulado';
  year?: number;
  institution?: string;
  specialty?: string;
  duration: number; // em minutos
  questions: Question[];
  totalQuestions: number;
  passingScore?: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 4. Tentativa de Prova (ExamAttempt)

```typescript
interface ExamAttempt {
  id: string;
  userId: string;
  examId: string;
  startedAt: Date;
  completedAt?: Date;
  answers: ExamAnswer[];
  score: number;
  totalScore: number;
  percentage: number;
  passed: boolean;
  timeSpent: number; // em segundos
  isPractice: boolean;
  createdAt: Date;
}
```

#### 5. Trilha de Estudo (StudyPath)

```typescript
interface StudyPath {
  id: string;
  title: string;
  description: string;
  targetExam: 'enam' | 'residencia' | 'both';
  targetSpecialty?: string;
  targetInstitutions?: string[];
  duration: number; // em semanas
  modules: StudyModule[];
  isAIGenerated: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Date;
  updatedAt: Date;
}
```

#### 6. Flashcard

```typescript
interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  tags: string[];
  easeFactor: number; // SM-2
  interval: number; // SM-2
  repetitions: number; // SM-2
  nextReviewDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 7. Caso Clínico (ClinicalCase)

```typescript
interface ClinicalCase {
  id: string;
  title: string;
  presentation: string;
  patientInfo: PatientInfo;
  stages: ClinicalCaseStage[];
  learningObjectives: string[];
  relatedTopics: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
  updatedAt: Date;
}
```

#### 8. Ranking (Leaderboard)

```typescript
interface LeaderboardEntry {
  userId: string;
  userName: string;
  avatar?: string;
  score: number;
  rank: number;
  period: 'daily' | 'weekly' | 'monthly' | 'all_time';
  category?: string;
}
```

---

## 🗄️ Schema do Banco de Dados (Supabase)

### Tabelas Principais

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  plan TEXT DEFAULT 'free',
  plan_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Questions
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('single', 'multiple', 'true_false', 'ordering', 'fill_blank')),
  content TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer JSONB NOT NULL,
  explanation TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  area TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  source TEXT NOT NULL,
  year INTEGER,
  institution TEXT,
  specialty TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exams
CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('enam', 'residencia', 'simulado')),
  year INTEGER,
  institution TEXT,
  specialty TEXT,
  duration INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  passing_score INTEGER,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exam Questions (junction table)
CREATE TABLE exam_questions (
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  PRIMARY KEY (exam_id, question_id)
);

-- Exam Attempts
CREATE TABLE exam_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  answers JSONB NOT NULL,
  score INTEGER NOT NULL,
  total_score INTEGER NOT NULL,
  percentage NUMERIC(5, 2) NOT NULL,
  passed BOOLEAN NOT NULL,
  time_spent INTEGER NOT NULL,
  is_practice BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Study Paths
CREATE TABLE study_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  target_exam TEXT NOT NULL CHECK (target_exam IN ('enam', 'residencia', 'both')),
  target_specialty TEXT,
  target_institutions TEXT[],
  duration INTEGER NOT NULL,
  modules JSONB NOT NULL,
  is_ai_generated BOOLEAN DEFAULT false,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Study Progress
CREATE TABLE user_study_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  study_path_id UUID REFERENCES study_paths(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  current_module_index INTEGER DEFAULT 0,
  progress_percentage INTEGER DEFAULT 0,
  UNIQUE(user_id, study_path_id)
);

-- Flashcards
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  ease_factor NUMERIC(3, 2) DEFAULT 2.5,
  interval INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0,
  next_review_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Flashcard Progress
CREATE TABLE user_flashcard_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  flashcard_id UUID REFERENCES flashcards(id) ON DELETE CASCADE,
  ease_factor NUMERIC(3, 2) DEFAULT 2.5,
  interval INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0,
  next_review_date TIMESTAMPTZ NOT NULL,
  last_reviewed_at TIMESTAMPTZ,
  UNIQUE(user_id, flashcard_id)
);

-- Clinical Cases
CREATE TABLE clinical_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  presentation TEXT NOT NULL,
  patient_info JSONB NOT NULL,
  stages JSONB NOT NULL,
  learning_objectives TEXT[] NOT NULL,
  related_topics TEXT[] DEFAULT '{}',
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leaderboard
CREATE TABLE leaderboard (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  period TEXT NOT NULL CHECK (period IN ('daily', 'weekly', 'monthly', 'all_time')),
  category TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, period, category)
);

-- Expert Comments
CREATE TABLE expert_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  expert_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Video Lessons
CREATE TABLE video_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  duration INTEGER NOT NULL,
  thumbnail_url TEXT,
  area TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Video Progress
CREATE TABLE user_video_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  video_id UUID REFERENCES video_lessons(id) ON DELETE CASCADE,
  watched_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  last_watched_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, video_id)
);
```

### Índices

```sql
-- Questions
CREATE INDEX idx_questions_area ON questions(area);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_tags ON questions USING GIN(tags);
CREATE INDEX idx_questions_source ON questions(source);
CREATE INDEX idx_questions_institution ON questions(institution);

-- Exam Attempts
CREATE INDEX idx_exam_attempts_user ON exam_attempts(user_id);
CREATE INDEX idx_exam_attempts_exam ON exam_attempts(exam_id);
CREATE INDEX idx_exam_attempts_completed ON exam_attempts(completed_at);

-- Flashcards
CREATE INDEX idx_flashcards_next_review ON flashcards(next_review_date);
CREATE INDEX idx_flashcards_category ON flashcards(category);

-- User Flashcard Progress
CREATE INDEX idx_user_flashcard_next_review ON user_flashcard_progress(next_review_date);
CREATE INDEX idx_user_flashcard_user ON user_flashcard_progress(user_id);

-- Leaderboard
CREATE INDEX idx_leaderboard_period ON leaderboard(period);
CREATE INDEX idx_leaderboard_category ON leaderboard(category);
CREATE INDEX idx_leaderboard_score ON leaderboard(score DESC);
```

---

## 🎯 Funcionalidades Principais

### 1. Sistema de Autenticação

- Autenticação via email/senha
- Login social (Google, GitHub)
- Recuperação de senha
- Verificação de email
- Gerenciamento de perfil

### 2. Banco de Questões

- Questões de Enam (todas as edições)
- Questões de residência (todas as instituições)
- Filtros avançados (área, dificuldade, ano, instituição)
- Busca por texto
- Favoritos
- Comentários de especialistas
- Estatísticas de cada questão

### 3. Simulador de Provas

- Timer realista
- Ambiente similar ao dia da prova
- Modo prática (sem tempo)
- Modo simulado (com tempo)
- Revisão de respostas
- Comentários explicativos
- Estatísticas de desempenho

### 4. Análise de Desempenho

- Gráficos de evolução
- Desempenho por área de conhecimento
- Identificação de pontos fracos
- Comparação com a média
- Histórico de tentativas
- Tempo médio por questão

### 5. Trilhas de Estudo com IA

- Geração personalizada baseada em desempenho
- Adaptação dinâmica
- Módulos sequenciais
- Metas diárias/semanais
- Lembretes de estudo

### 6. Ranking e Gamificação

- Ranking diário, semanal, mensal e geral
- Ranking por área de conhecimento
- Pontos por atividade
- Conquistas e badges
- Streak de estudos
- Desafios diários

### 7. Flashcards com Spaced Repetition

- Algoritmo SM-2 otimizado
- Categorias personalizadas
- Criação de flashcards
- Importação/exportação
- Estatísticas de revisão

### 8. Casos Clínicos Interativos

- Casos clínicos progressivos
- Tomada de decisão
- Feedback imediato
- Discussão de alternativas
- Relacionamento com temas

### 9. Vídeo-Aulas

- Vídeos organizados por área
- Progresso de visualização
- Anotações
- Comentários
- Lista de reprodução

### 10. Modelo Freemium

**Gratuito:**
- Acesso limitado a questões por dia
- Simulados básicos
- Análise de desempenho básica
- Flashcards limitados

**Premium:**
- Acesso ilimitado a questões
- Simulados avançados
- Análise detalhada de desempenho
- Trilhas de estudo com IA
- Ranking completo
- Flashcards ilimitados
- Casos clínicos
- Vídeo-aulas
- Suporte prioritário

---

## 🔗 Integração com Darwin-MFC

### Compartilhamento de Dados Médicos

```typescript
// Pacote compartilhado para importação de dados
// packages/shared/data-importer/

interface MedicalDataImporter {
  importDiseases(): Promise<Disease[]>;
  importMedications(): Promise<Medication[]>;
  importProtocols(): Promise<Protocol[]>;
  importClinicalCases(): Promise<ClinicalCase[]>;
}

// Mapeamento de áreas de conhecimento
const KNOWLEDGE_AREAS = {
  'cardiovascular': 'Cardiologia',
  'respiratorio': 'Pneumologia',
  'gastrointestinais': 'Gastroenterologia',
  'neurologicas': 'Neurologia',
  'endocrinas': 'Endocrinologia',
  'infecciosas': 'Doenças Infecciosas',
  'musculoesqueleticas': 'Reumatologia/Ortopedia',
  'saude_mental': 'Psiquiatria',
  'pediatricas': 'Pediatria',
  'gineco-obstetricas': 'Ginecologia e Obstetrícia',
  // ... mais áreas
};
```

### Estratégia de Importação

1. **Importação Seletiva**: Apenas conteúdo relevante para Enam/Residência
2. **Transformação**: Adaptar estrutura de dados para o novo modelo
3. **Enriquecimento**: Adicionar metadados específicos (área, dificuldade, tags)
4. **Validação**: Verificar integridade e consistência dos dados

---

## 🎨 Design System

### Componentes Principais

- **Button**: Variants (primary, secondary, ghost, outline)
- **Card**: Para questões, flashcards, casos clínicos
- **Modal**: Para feedback e detalhes
- **Tabs**: Para navegação entre seções
- **Progress**: Para indicar progresso de estudo
- **Timer**: Para simulados
- **Chart**: Para análise de desempenho
- **Leaderboard**: Para ranking
- **Badge**: Para conquistas e tags

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
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
  },
};
```

---

## 📱 Estrutura de Rotas (Next.js App Router)

```
app/
├── (auth)/
│   ├── login/
│   ├── register/
│   └── forgot-password/
├── (dashboard)/
│   ├── dashboard/
│   ├── questions/
│   │   ├── [id]/
│   │   └── filters/
│   ├── exams/
│   │   ├── [id]/
│   │   ├── simulate/
│   │   └── results/
│   ├── study-paths/
│   │   ├── [id]/
│   │   └── create/
│   ├── flashcards/
│   │   ├── review/
│   │   └── decks/
│   ├── clinical-cases/
│   │   └── [id]/
│   ├── videos/
│   │   └── [id]/
│   ├── leaderboard/
│   ├── analytics/
│   └── settings/
├── (premium)/
│   ├── pricing/
│   ├── checkout/
│   └── success/
└── api/
    ├── auth/
    ├── questions/
    ├── exams/
    ├── study-paths/
    ├── flashcards/
    ├── analytics/
    └── payments/
```

---

## 🤖 Integração com IA

### Serviços de IA

```typescript
// services/ai/study-path-generator.ts

interface StudyPathGenerator {
  generatePersonalizedPath(params: {
    targetExam: 'enam' | 'residencia';
    targetSpecialty?: string;
    currentLevel: 'beginner' | 'intermediate' | 'advanced';
    weakAreas: string[];
    availableTime: number; // horas por semana
    examDate?: Date;
  }): Promise<StudyPath>;
}

// services/ai/question-recommender.ts

interface QuestionRecommender {
  recommendQuestions(params: {
    userId: string;
    area?: string;
    difficulty?: string;
    count: number;
  }): Promise<Question[]>;
}

// services/ai/explanation-generator.ts

interface ExplanationGenerator {
  generateExplanation(question: Question): Promise<string>;
}
```

### Prompt Templates

```typescript
const STUDY_PATH_PROMPT = `
Você é um especialista em preparação para Enam e provas de residência médica.

Crie uma trilha de estudo personalizada para um estudante com as seguintes características:
- Exame alvo: {targetExam}
- Especialidade alvo: {targetSpecialty}
- Nível atual: {currentLevel}
- Áreas de dificuldade: {weakAreas}
- Tempo disponível: {availableTime} horas/semana
- Data do exame: {examDate}

A trilha deve incluir:
1. Módulos organizados por área de conhecimento
2. Estimativa de tempo por módulo
3. Questões recomendadas por módulo
4. Metas semanais
5. Pontos de revisão

Responda em formato JSON.
`;
```

---

## 📊 Analytics e Monitoramento

### Métricas Principais

- **Engajamento**: Usuários ativos diários, semanais, mensais
- **Retenção**: Taxa de retenção por período
- **Conversão**: Free para Premium
- **Desempenho**: Média de acertos por área
- **Tempo de Estudo**: Média de minutos por usuário
- **Completude**: Taxa de conclusão de trilhas

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

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
```

### Ambientes

- **Development**: localhost + Supabase dev
- **Staging**: Vercel preview + Supabase staging
- **Production**: Vercel production + Supabase production

---

## 📝 Próximos Passos

1. **Setup do Monorepo**: Configurar Turborepo ou Nx
2. **Configuração do Supabase**: Criar projeto e configurar migrations
3. **Implementação da Autenticação**: Integrar Supabase Auth
4. **Desenvolvimento do Banco de Questões**: CRUD básico
5. **Implementação do Simulador**: Timer e ambiente de prova
6. **Desenvolvimento da Análise de Desempenho**: Gráficos e estatísticas
7. **Integração com IA**: Implementar OpenAI API
8. **Implementação do Ranking**: Leaderboard em tempo real
9. **Desenvolvimento de Flashcards**: SM-2 algorithm
10. **Implementação do Modelo Freemium**: Stripe integration

---

## 📚 Referências

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [SM-2 Algorithm](https://www.supermemo.com/en/archives1990-2015/english/ol/sm2)

---

**Documento criado por:** Roo (Architect Mode)  
**Última atualização:** 23 de Janeiro de 2026
