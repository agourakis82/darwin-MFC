# Darwin Education - Enhanced Architecture Design

> **Architecture Pattern:** Modular Monolith with Progressive Enhancement

---

## 🏗️ Architecture Overview

### **Design Philosophy**

Darwin Education follows a **modular monolith** architecture that:
1. **Maintains integration** with Darwin-MFC reference platform
2. **Shares data layer** for diseases, medications, protocols
3. **Enables independent evolution** of education features
4. **Supports progressive enhancement** from static to dynamic
5. **Preserves academic rigor** across all features

### **Key Principles**

- ✅ **Static-First:** Core content remains static for performance and SEO
- ✅ **Progressive Enhancement:** Add dynamic features without breaking static functionality
- ✅ **Shared Data:** Single source of truth for medical knowledge
- ✅ **Offline-First:** PWA architecture with service worker
- ✅ **Type-Safe:** End-to-end TypeScript with strict mode
- ✅ **Accessible:** WCAG 2.1 AA compliance
- ✅ **Multilingual:** 9+ languages with RTL support

---

## 📁 Directory Structure

### **Current Structure (Enhanced)**

```
darwin-MFC/
├── app/                                    # Next.js App Router
│   ├── [locale]/                          # Internationalized routes
│   │   ├── (reference)/                   # Reference content group
│   │   │   ├── doencas/                   # Diseases
│   │   │   ├── medicamentos/              # Medications
│   │   │   ├── protocolos/                # Protocols
│   │   │   └── calculadoras/              # Calculators
│   │   │
│   │   ├── (education)/                   # Education content group (NEW)
│   │   │   ├── learn/                     # Learning paths ✅ EXISTS
│   │   │   │   ├── page.tsx               # Learning hub
│   │   │   │   ├── paths/[pathId]/        # Path viewer
│   │   │   │   ├── certificates/          # Certificates
│   │   │   │   └── progress/              # Progress dashboard
│   │   │   │
│   │   │   ├── estudo/                    # Study mode ✅ EXISTS
│   │   │   │   ├── page.tsx               # Study hub
│   │   │   │   ├── flashcards/            # Flashcard interface
│   │   │   │   ├── quiz/                  # Quiz player
│   │   │   │   └── review/                # Spaced repetition review
│   │   │   │
│   │   │   ├── practice/                  # Clinical practice (NEW)
│   │   │   │   ├── page.tsx               # Practice hub
│   │   │   │   ├── scenarios/             # Clinical scenarios
│   │   │   │   ├── simulations/           # Virtual patients
│   │   │   │   └── osce/                  # OSCE stations
│   │   │   │
│   │   │   ├── assess/                    # Assessment (NEW)
│   │   │   │   ├── page.tsx               # Assessment hub
│   │   │   │   ├── exams/                 # Mock exams
│   │   │   │   ├── questions/             # Question bank
│   │   │   │   └── analytics/             # Performance analytics
│   │   │   │
│   │   │   └── community/                 # Social learning (NEW)
│   │   │       ├── page.tsx               # Community hub
│   │   │       ├── discussions/           # Forums
│   │   │       ├── groups/                # Study groups
│   │   │       └── qa/                    # Q&A platform
│   │   │
│   │   └── (tools)/                       # Clinical tools group
│   │       ├── ferramentas-familia/       # Family tools
│   │       ├── prontuario/                # SOAP notes
│   │       └── consulta-rapida/           # Quick reference
│   │
│   └── components/                        # Shared components
│       ├── Layout/                        # Layout components
│       ├── Education/                     # Education-specific (NEW)
│       │   ├── LearningPathCard.tsx
│       │   ├── ModulePlayer.tsx
│       │   ├── ProgressTracker.tsx
│       │   ├── CompetencyBadge.tsx
│       │   └── CertificateGenerator.tsx
│       ├── Study/                         # Study components ✅ EXISTS
│       │   ├── Flashcard.tsx
│       │   ├── FlashcardDeck.tsx
│       │   ├── QuizPlayer.tsx
│       │   └── SpacedRepetitionScheduler.tsx
│       └── Assessment/                    # Assessment components (NEW)
│           ├── QuestionRenderer.tsx
│           ├── ExamTimer.tsx
│           ├── PerformanceChart.tsx
│           └── AdaptiveTestEngine.tsx
│
├── lib/                                   # Core library
│   ├── data/                              # Data layer
│   │   ├── doencas/                       # Disease data (shared)
│   │   ├── medicamentos/                  # Medication data (shared)
│   │   ├── learning-paths/                # Learning content ✅ EXISTS
│   │   ├── multimedia/                    # Videos, images ✅ EXISTS
│   │   ├── question-bank/                 # Question bank (NEW)
│   │   └── competencies/                  # Competency framework (NEW)
│   │
│   ├── education/                         # Education module (NEW)
│   │   ├── curriculum/                    # Curriculum management
│   │   │   ├── builder.ts                 # Curriculum builder
│   │   │   ├── mapper.ts                  # Content → Competency mapping
│   │   │   └── validator.ts               # Curriculum validation
│   │   │
│   │   ├── assessment/                    # Assessment engine
│   │   │   ├── irt.ts                     # Item Response Theory
│   │   │   ├── adaptive.ts                # Adaptive testing
│   │   │   ├── scoring.ts                 # Scoring algorithms
│   │   │   └── analytics.ts               # Performance analytics
│   │   │
│   │   ├── learning-science/              # Learning algorithms
│   │   │   ├── spaced-repetition.ts       # SM-2 algorithm ✅ EXISTS
│   │   │   ├── mastery.ts                 # Mastery learning
│   │   │   ├── personalization.ts         # Personalized paths
│   │   │   └── recommendations.ts         # Content recommendations
│   │   │
│   │   └── social/                        # Social learning
│   │       ├── discussions.ts             # Discussion management
│   │       ├── groups.ts                  # Study group logic
│   │       └── peer-review.ts             # Peer review system
│   │
│   ├── study/                             # Study tools ✅ EXISTS
│   │   ├── spaced-repetition.ts
│   │   ├── quiz-generator.ts
│   │   └── flashcard-generator.ts
│   │
│   ├── store/                             # State management
│   │   ├── appStore.ts                    # Global app state
│   │   ├── studyStore.ts                  # Study state ✅ EXISTS
│   │   ├── learningStore.ts               # Learning state ✅ EXISTS
│   │   ├── assessmentStore.ts             # Assessment state (NEW)
│   │   └── communityStore.ts              # Community state (NEW)
│   │
│   ├── types/                             # TypeScript types
│   │   ├── learning.ts                    # Learning types ✅ EXISTS
│   │   ├── study-mode.ts                  # Study types ✅ EXISTS
│   │   ├── assessment.ts                  # Assessment types (NEW)
│   │   ├── competency.ts                  # Competency types (NEW)
│   │   └── community.ts                   # Community types (NEW)
│   │
│   └── api/                               # API layer (NEW - for Supabase)
## 🎯 Module Architecture

### **Education Module Structure**

Each education feature is designed as a **self-contained module** with clear interfaces:

```typescript
// lib/education/types.ts
export interface EducationModule {
  id: string;
  name: string;
  version: string;
  dependencies: string[];
  exports: ModuleExports;
}

export interface ModuleExports {
  components: Record<string, React.ComponentType>;
  hooks: Record<string, Function>;
  utils: Record<string, Function>;
  types: Record<string, any>;
}
```

### **Module Registry**

```typescript
// lib/education/registry.ts
import { curriculumModule } from './curriculum';
import { assessmentModule } from './assessment';
import { learningScience Module } from './learning-science';
import { socialModule } from './social';

export const educationModules = {
  curriculum: curriculumModule,
  assessment: assessmentModule,
  learningScience: learningScienceModule,
  social: socialModule,
};

export function getModule(id: string): EducationModule {
  return educationModules[id];
}
```

---

## 🔌 Integration Points

### **1. Data Integration**

**Shared Medical Data:**
```typescript
// lib/data/doencas/cardiovasculares.ts
export const hipertensao: Doenca = {
  id: 'hipertensao',
  // ... disease data

  // Education metadata (NEW)
  education: {
    learningObjectives: [
      'Diagnose hypertension using JNC-8 criteria',
      'Initiate first-line antihypertensive therapy',
    ],
    competencies: ['medical-expert', 'communicator'],
    difficulty: 'intermediate',
    estimatedStudyTime: 120, // minutes
  },
};
```

**Content Generation:**
```typescript
// lib/education/curriculum/generator.ts
export function generateFlashcardsFromDisease(doenca: Doenca): Flashcard[] {
  return [
    {
      front: `What are the diagnostic criteria for ${doenca.nome}?`,
      back: doenca.diagnostico.criterios.join('\n'),
      tags: [doenca.categoria, 'diagnosis'],
      difficulty: doenca.education?.difficulty || 'intermediate',
    },
    // ... more flashcards
  ];
}
```

### **2. Component Integration**

**Shared Component Library:**
```typescript
// app/components/shared/Card.tsx
export function Card({ children, variant = 'default' }) {
  // Used by both reference and education features
}

// app/components/Education/LearningPathCard.tsx
import { Card } from '../shared/Card';

export function LearningPathCard({ path }) {
  return (
    <Card variant="education">
      {/* Education-specific content */}
    </Card>
  );
}
```

### **3. State Integration**

**Unified State Management:**
```typescript
// lib/store/index.ts
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Global state
      theme: 'dark',
      contentMode: 'descriptive',

      // Reference state
      favorites: [],
      notes: {},

      // Education state (delegated to sub-stores)
      study: useStudyStore.getState(),
      learning: useLearningStore.getState(),
      assessment: useAssessmentStore.getState(),
    }),
    { name: 'darwin-mfc-storage' }
  )
);
```

### **4. Navigation Integration**

**Unified Navigation:**
```typescript
// app/components/Layout/Header.tsx
export function Header() {
  return (
    <nav>
      <NavSection title="Reference">
        <NavLink href="/doencas">Diseases</NavLink>
        <NavLink href="/medicamentos">Medications</NavLink>
      </NavSection>

      <NavSection title="Education">
        <NavLink href="/learn">Learning Paths</NavLink>
        <NavLink href="/estudo">Study Mode</NavLink>
        <NavLink href="/practice">Practice</NavLink>
        <NavLink href="/assess">Assessments</NavLink>
      </NavSection>
    </nav>
  );
}
```

---

## 🗄️ Database Schema (Supabase)

### **Core Tables**

```sql
-- Users (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student', -- student, educator, admin
  institution TEXT,
  specialty TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Learning Progress
CREATE TABLE public.learning_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles NOT NULL,
  path_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  status TEXT DEFAULT 'not_started', -- not_started, in_progress, completed
  progress_percent INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0, -- seconds
  last_accessed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, path_id, module_id)
);

-- Study Progress (Flashcards)
CREATE TABLE public.flashcard_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles NOT NULL,
  flashcard_id TEXT NOT NULL,
  ease_factor DECIMAL DEFAULT 2.5,
  interval INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0,
  next_review_at TIMESTAMPTZ,
  last_reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, flashcard_id)
);

-- Quiz Attempts
CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles NOT NULL,
  quiz_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  time_taken INTEGER, -- seconds
  answers JSONB NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certificates
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles NOT NULL,
  path_id TEXT NOT NULL,
  certificate_number TEXT UNIQUE NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  blockchain_hash TEXT, -- For NFT certificates
  metadata JSONB
);

-- Competencies
CREATE TABLE public.user_competencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles NOT NULL,
  competency_id TEXT NOT NULL,
  level TEXT DEFAULT 'novice', -- novice, advanced_beginner, competent, proficient, expert
  evidence JSONB[], -- Array of evidence (quiz scores, case completions, etc.)
  last_assessed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, competency_id)
);

-- Discussions
CREATE TABLE public.discussions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  path_id TEXT NOT NULL,
  module_id TEXT,
  author_id UUID REFERENCES public.profiles NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Discussion Replies
CREATE TABLE public.discussion_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  discussion_id UUID REFERENCES public.discussions NOT NULL,
  author_id UUID REFERENCES public.profiles NOT NULL,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  is_accepted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Study Groups
CREATE TABLE public.study_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES public.profiles NOT NULL,
  is_private BOOLEAN DEFAULT FALSE,
  max_members INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Study Group Members
CREATE TABLE public.study_group_members (
  group_id UUID REFERENCES public.study_groups NOT NULL,
  user_id UUID REFERENCES public.profiles NOT NULL,
  role TEXT DEFAULT 'member', -- member, moderator, owner
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (group_id, user_id)
);

-- User-Generated Content
CREATE TABLE public.user_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES public.profiles NOT NULL,
  content_type TEXT NOT NULL, -- flashcard, quiz, case, video
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  status TEXT DEFAULT 'draft', -- draft, submitted, approved, rejected
  upvotes INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **Row Level Security (RLS)**

```sql
-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_progress ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can view own progress"
  ON public.learning_progress FOR ALL
  USING (auth.uid() = user_id);

-- Public read for discussions
CREATE POLICY "Anyone can view discussions"
  ON public.discussions FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create discussions"
  ON public.discussions FOR INSERT
  WITH CHECK (auth.uid() = author_id);
```

---

## 🔐 Authentication Flow

### **Hybrid Auth Strategy**

```typescript
// lib/api/auth.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Sync localStorage to Supabase
  await syncLocalProgressToCloud(data.user.id);

  return data;
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) throw error;
  return data;
}

// Offline-first: Allow usage without auth
export function isOfflineMode() {
  return !supabase.auth.getUser();
}
```

### **Progressive Enhancement**

```typescript
// app/[locale]/learn/page.tsx
export default function LearnPage() {
  const { user } = useAuth();

  if (user) {
    // Authenticated: Show cloud-synced progress
    return <AuthenticatedLearningHub />;
  } else {
    // Guest: Show localStorage-based progress with upgrade prompt
    return (
      <>
        <GuestLearningHub />
        <UpgradePrompt message="Sign in to sync progress across devices" />
      </>
    );
  }
}
```

---

## 📊 Analytics Architecture

### **Event Tracking**

```typescript
// lib/analytics/events.ts
export const EducationEvents = {
  // Learning events
  MODULE_STARTED: 'module_started',
  MODULE_COMPLETED: 'module_completed',
  PATH_ENROLLED: 'path_enrolled',
  PATH_COMPLETED: 'path_completed',

  // Study events
  FLASHCARD_REVIEWED: 'flashcard_reviewed',
  QUIZ_STARTED: 'quiz_started',
  QUIZ_COMPLETED: 'quiz_completed',

  // Assessment events
  EXAM_STARTED: 'exam_started',
  EXAM_COMPLETED: 'exam_completed',
  QUESTION_ANSWERED: 'question_answered',

  // Social events
  DISCUSSION_CREATED: 'discussion_created',
  REPLY_POSTED: 'reply_posted',
  GROUP_JOINED: 'group_joined',
};

export function trackEvent(event: string, properties: Record<string, any>) {
  // Send to PostHog/Mixpanel
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(event, properties);
  }

  // Also store in Supabase for custom analytics
  supabase.from('analytics_events').insert({
    event,
    properties,
    user_id: supabase.auth.getUser()?.id,
    timestamp: new Date().toISOString(),
  });
}
```

---

## 🚀 Deployment Strategy

### **Multi-Environment Setup**

```
Production:  mfc.agourakis.med.br (GitHub Pages + Supabase Production)
Staging:     staging.mfc.agourakis.med.br (Vercel + Supabase Staging)
Development: localhost:3000 (Local + Supabase Local)
```

### **Environment Variables**

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_OPENAI_API_KEY=sk-xxx
NEXT_PUBLIC_APP_URL=https://mfc.agourakis.med.br
```

### **Build Pipeline**

```yaml
# .github/workflows/deploy-education.yml
name: Deploy Education Features

on:
  push:
    branches: [main]
    paths:
      - 'app/**/learn/**'
      - 'app/**/estudo/**'
      - 'lib/education/**'
      - 'lib/study/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run education tests
        run: npm run test:education

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

---

**Last Updated:** January 2025
**Next Review:** March 2025


