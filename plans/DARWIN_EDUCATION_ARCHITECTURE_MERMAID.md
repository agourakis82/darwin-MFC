# Darwin Education - Arquitetura Visual (Mermaid)

**Versão:** 1.0.0  
**Data:** 23 de Janeiro de 2026

---

## 📊 Visão Geral do Sistema

```mermaid
graph TB
    subgraph Clients
        WEB[Web App - Next.js]
        MOBILE[Mobile App - React Native]
    end

    subgraph PresentationLayer
        WEB --> UI_WEB[UI Components - shadcn/ui]
        MOBILE --> UI_MOBILE[UI Components - NativeWind]
    end

    subgraph BusinessLogic
        UI_WEB --> STORES[Zustand Stores]
        UI_MOBILE --> STORES
        STORES --> HOOKS[Custom Hooks]
        STORES --> SERVICES[Services]
    end

    subgraph DataLayer
        SERVICES --> SUPABASE[Supabase Client]
    end

    subgraph ExternalServices
        SUPABASE --> AUTH[Supabase Auth]
        SUPABASE --> DB[(PostgreSQL Database)]
        SUPABASE --> REALTIME[Realtime Subscriptions]
        SUPABASE --> STORAGE[Supabase Storage]
        SERVICES --> AI[OpenAI API]
        SERVICES --> PAYMENTS[Stripe]
        SERVICES --> EMAIL[Email Service]
        SERVICES --> PUSH[Expo Push]
    end

    style WEB fill:#e0f2fe
    style MOBILE fill:#f0fdf4
    style SUPABASE fill:#dcfce7
    style DB fill:#fef3c7
```

---

## 🏗️ Estrutura de Monorepo

```mermaid
graph TB
    ROOT[Darwin Education]

    subgraph Apps
        ROOT --> WEB_APP[apps/web]
        ROOT --> MOBILE_APP[apps/mobile]
    end

    subgraph Packages
        ROOT --> SHARED[packages/shared]
        ROOT --> DATABASE[packages/database]
        ROOT --> UI[packages/ui]
    end

    subgraph Services
        ROOT --> AI_SRV[services/ai]
        ROOT --> NOTIF_SRV[services/notifications]
        ROOT --> PAY_SRV[services/payments]
        ROOT --> ANALYTICS_SRV[services/analytics]
    end

    subgraph Scripts
        ROOT --> DATA_IMPORT[scripts/data-import]
        ROOT --> DEPLOY[scripts/deployment]
    end

    subgraph Docs
        ROOT --> ARCH_DOCS[docs/architecture]
        ROOT --> API_DOCS[docs/api]
        ROOT --> MOBILE_DOCS[docs/mobile]
    end

    style WEB_APP fill:#e0f2fe
    style MOBILE_APP fill:#f0fdf4
    style SHARED fill:#dcfce7
```

---

## 🔄 Fluxo de Dados

### Fluxo de Autenticação

```mermaid
sequenceDiagram
    participant User
    participant Web
    participant Mobile
    participant Supabase
    participant Stripe

    User->>Web: Login com email/senha
    Web->>Supabase: auth.signInWithPassword()
    Supabase-->>Web: Session + User Data
    Web-->>User: Dashboard

    User->>Mobile: Login com Google
    Mobile->>Supabase: auth.signInWithOAuth()
    Supabase-->>Mobile: Session + User Data
    Mobile-->>User: Dashboard

    User->>Web: Assinar Premium
    Web->>Stripe: Criar Checkout Session
    Stripe-->>Web: Checkout URL
    Web-->>User: Redirecionar para pagamento
    User->>Stripe: Pagamento
    Stripe->>Supabase: Webhook: plano atualizado
    Supabase-->>Mobile: Push: plano atualizado
```

### Fluxo de Simulado

```mermaid
sequenceDiagram
    participant User
    participant App
    participant Supabase
    participant AI

    User->>App: Iniciar simulado
    App->>Supabase: Buscar questões do exame
    Supabase-->>App: Lista de questões
    App->>User: Exibir questão 1
    User->>App: Responder questão
    App->>Supabase: Salvar resposta parcial

    loop Questões restantes
        App->>User: Exibir próxima questão
        User->>App: Responder
        App->>Supabase: Salvar resposta
    end

    App->>Supabase: Finalizar tentativa
    App->>AI: Gerar análise de desempenho
    AI-->>App: Análise detalhada
    App->>User: Exibir resultados
```

---

## 📱 Arquitetura Mobile

```mermaid
graph TB
    subgraph MobileApp
        SCREENS[Screens]
        NAVIGATION[Navigation]
        COMPONENTS[Components]
        HOOKS[Hooks]
    end

    subgraph Shared
        STORES[Zustand Stores]
        API[Supabase Client]
        TYPES[Types]
        UTILS[Utils]
    end

    subgraph Native
        NAVIGATION --> NAV[React Navigation]
        COMPONENTS --> NATIVE[Native Components]
        HOOKS --> NATIVE_HOOKS[React Native Hooks]
    end

    SCREENS --> STORES
    SCREENS --> COMPONENTS
    SCREENS --> HOOKS
    NAVIGATION --> NAV
    COMPONENTS --> NATIVE
    HOOKS --> NATIVE_HOOKS

    STORES --> API
    STORES --> TYPES
    STORES --> UTILS

    style SCREENS fill:#e0f2fe
    style STORES fill:#dcfce7
    style NAV fill:#f0fdf4
```

---

## 🗄️ Modelo de Dados

```mermaid
erDiagram
    USER ||--o{ EXAM_ATTEMPT : realiza
    USER ||--o{ STUDY_PROGRESS : acompanha
    USER ||--o{ FLASHCARD_PROGRESS : revisa
    USER ||--o{ LEADERBOARD : participa
    USER ||--o{ EXPERT_COMMENT : escreve

    EXAM ||--o{ EXAM_QUESTION : contém
    EXAM ||--o{ EXAM_ATTEMPT : é usada em
    EXAM_QUESTION }|--|| QUESTION : referencia

    QUESTION ||--o{ EXPERT_COMMENT : tem
    QUESTION ||--o{ FLASHCARD : pode gerar

    STUDY_PATH ||--o{ STUDY_PROGRESS : é seguida
    STUDY_PATH ||--o{ STUDY_MODULE : contém

    FLASHCARD ||--o{ FLASHCARD_PROGRESS : é revisado por

    VIDEO_LESSON ||--o{ VIDEO_PROGRESS : é assistido por
    VIDEO_PROGRESS }|--|| USER : pertence a

    CLINICAL_CASE ||--o{ CASE_STAGE : contém

    USER {
        uuid id
        string email
        string name
        string plan
        timestamp plan_expires_at
        timestamp created_at
        timestamp updated_at
    }

    QUESTION {
        uuid id
        string type
        text content
        jsonb options
        jsonb correct_answer
        text explanation
        string difficulty
        string area
        text[] tags
        string source
        integer year
        string institution
        string specialty
        timestamp created_at
        timestamp updated_at
    }

    EXAM {
        uuid id
        string title
        string type
        integer year
        string institution
        string specialty
        integer duration
        integer total_questions
        integer passing_score
        boolean is_published
        timestamp created_at
        timestamp updated_at
    }

    EXAM_ATTEMPT {
        uuid id
        uuid user_id
        uuid exam_id
        timestamp started_at
        timestamp completed_at
        jsonb answers
        integer score
        integer total_score
        numeric percentage
        boolean passed
        integer time_spent
        boolean is_practice
        timestamp created_at
    }

    STUDY_PATH {
        uuid id
        string title
        text description
        string target_exam
        string target_specialty
        text[] target_institutions
        integer duration
        jsonb modules
        boolean is_ai_generated
        string difficulty
        timestamp created_at
        timestamp updated_at
    }

    FLASHCARD {
        uuid id
        text front
        text back
        string category
        text[] tags
        numeric ease_factor
        integer interval
        integer repetitions
        timestamp next_review_date
        timestamp created_at
        timestamp updated_at
    }

    LEADERBOARD {
        uuid user_id
        integer score
        string period
        string category
        timestamp updated_at
    }

    CLINICAL_CASE {
        uuid id
        string title
        text presentation
        jsonb patient_info
        jsonb stages
        text[] learning_objectives
        text[] related_topics
        string difficulty
        timestamp created_at
        timestamp updated_at
    }

    VIDEO_LESSON {
        uuid id
        string title
        text description
        text video_url
        integer duration
        text thumbnail_url
        string area
        text[] tags
        string difficulty
        timestamp created_at
        timestamp updated_at
    }
```

---

## 🚀 Fluxo de Deployment

```mermaid
graph LR
    DEV[Developer] --> GIT[GitHub]
    GIT --> CI[GitHub Actions]
    CI --> TEST[Testes]
    TEST --> BUILD_WEB[Build Web]
    TEST --> BUILD_MOBILE[Build Mobile]
    BUILD_WEB --> VERCEL[Vercel]
    BUILD_MOBILE --> EXPO[Expo EAS]
    VERCEL --> PROD_WEB[Web Production]
    EXPO --> APPSTORE[App Store]
    EXPO --> PLAYSTORE[Google Play]
    APPSTORE --> PROD_IOS[iOS Production]
    PLAYSTORE --> PROD_ANDROID[Android Production]

    style DEV fill:#e0f2fe
    style CI fill:#dcfce7
    style VERCEL fill:#f0fdf4
    style EXPO fill:#fef3c7
```

---

## 🎯 Funcionalidades por Plataforma

```mermaid
graph TB
    subgraph Features
        AUTH[Autenticação]
        QUESTIONS[Banco de Questões]
        SIMULATOR[Simulador de Provas]
        ANALYTICS[Análise de Desempenho]
        STUDY_PATHS[Trilhas de Estudo IA]
        RANKING[Ranking e Gamificação]
        FLASHCARDS[Flashcards SM-2]
        CASES[Casos Clínicos]
        VIDEOS[Vídeo-Aulas]
        PAYMENTS[Pagamentos]
    end

    subgraph Web
        AUTH --> WEB_AUTH[✓]
        QUESTIONS --> WEB_QUESTIONS[✓]
        SIMULATOR --> WEB_SIM[✓]
        ANALYTICS --> WEB_ANAL[✓]
        STUDY_PATHS --> WEB_PATHS[✓]
        RANKING --> WEB_RANK[✓]
        FLASHCARDS --> WEB_FLASH[✓]
        CASES --> WEB_CASES[✓]
        VIDEOS --> WEB_VIDEOS[✓]
        PAYMENTS --> WEB_PAY[✓]
    end

    subgraph Mobile
        AUTH --> MOB_AUTH[✓]
        QUESTIONS --> MOB_QUESTIONS[✓]
        SIMULATOR --> MOB_SIM[✓]
        ANALYTICS --> MOB_ANAL[✓]
        STUDY_PATHS --> MOB_PATHS[✓]
        RANKING --> MOB_RANK[✓]
        FLASHCARDS --> MOB_FLASH[✓]
        CASES --> MOB_CASES[✓]
        VIDEOS --> MOB_VIDEOS[✓]
        PAYMENTS --> MOB_PAY[✓]
        PUSH[Push Notifications]
    end

    style Web fill:#e0f2fe
    style Mobile fill:#f0fdf4
```

---

## 📊 Integração Darwin-MFC

```mermaid
graph TB
    subgraph DarwinMFC
        DOENCAS[Dados de Doenças]
        MEDS[Dados de Medicamentos]
        PROTOCOLS[Protocolos Clínicos]
        CASES[Casos Clínicos]
    end

    subgraph Importer
        IMPORT[Data Importer]
        MAPPER[Knowledge Area Mapper]
        ENRICHER[Content Enricher]
        VALIDATOR[Data Validator]
    end

    subgraph DarwinEducation
        QUESTIONS_DB[Questions Database]
        FLASHCARDS_DB[Flashcards Database]
        CASES_DB[Clinical Cases DB]
    end

    DOENCAS --> IMPORT
    MEDS --> IMPORT
    PROTOCOLS --> IMPORT
    CASES --> IMPORT

    IMPORT --> MAPPER
    MAPPER --> ENRICHER
    ENRICHER --> VALIDATOR
    VALIDATOR --> QUESTIONS_DB
    VALIDATOR --> FLASHCARDS_DB
    VALIDATOR --> CASES_DB

    style DarwinMFC fill:#e0f2fe
    style DarwinEducation fill:#f0fdf4
```

---

**Documento criado por:** Roo (Architect Mode)  
**Última atualização:** 23 de Janeiro de 2026
