# Darwin Education - Arquitetura e Especificação (Corrigida)

**Versão:** 1.0.1  
**Data:** 23 de Janeiro de 2026  
**Status:** Planejamento

---

## 📋 Resumo Executivo

O **Darwin Education** é um módulo independente do Darwin-MFC voltado para preparação de estudantes de medicina para o **ENAMED (Exame Nacional de Avaliação da Formação Médica)** e provas de residência médica.

O objetivo é criar uma plataforma superior aos concorrentes existentes, oferecendo:
- Integração direta com dados médicos validados do Darwin-MFC
- IA avançada para personalização de trilhas de estudo
- Experiência de usuário moderna e acessível
- Modelo freemium mais generoso que os concorrentes

---

## 🎯 Foco Principal

- **ENAMED**: Exame Nacional de Avaliação da Formação Médica (modalidade do ENADE para medicina)
- **ENARE**: Exame Nacional de Residência Médica (usado para acesso direto às residências)
- **Provas de Residência**: Todas as instituições brasileiras e especialidades
- **Público-Alvo**: Estudantes de medicina, principalmente concluintes e residentes

**Observação Importante:** O ENAMED é uma avaliação geral da formação médica que pode ser utilizada como nota de corte para residência médica através do ENARE. É focado na avaliação das competências e habilidades adquiridas durante a graduação em medicina, não sendo específico para família e comunidade.

**Características do ENAMED:**
- 100 questões objetivas de múltipla escolha (4 alternativas)
- Aplicação anual
- Usa Teoria de Resposta ao Item (TRI)
- Nota final de 0 a 100 (nota >= 60 = Proficiente, nota < 60 = Não Proficiente)
- Unifica avaliação do ENADE e prova objetiva do ENARE
- 5 áreas de avaliação conforme matriz comum

---

## 🏗️ Arquitetura do Sistema

### Estrutura Monorepo

```
darwin-education/
├── packages/
│   ├── shared/          # Tipos e utilitários comuns
│   ├── ui/              # Componentes de interface
│   ├── data/            # Dados médicos e questões
│   └── services/         # Serviços de IA e APIs
├── apps/
│   ├── web/             # Aplicação web (Next.js 15+)
│   └── mobile/          # App mobile (React Native + Expo)
├── infrastructure/
│   ├── database/        # Schema Supabase
│   └── deployment/      # Configurações de deploy
└── docs/               # Documentação
```

### Stack Tecnológica

**Web:**
- **Next.js 15+** com App Router
- **TypeScript** para tipagem
- **Tailwind CSS** + **shadcn/ui** para styling
- **Zustand** para state management
- **Supabase** para backend

**Mobile:**
- **React Native** + **Expo** 
- **TypeScript** para tipagem
- **NativeWind** para styling (Tailwind para React Native)
- **Zustand** para state management
- **Expo Router** para navegação

**Backend:**
- **Supabase** (PostgreSQL + Auth + Realtime + Storage)
- **Stripe** para pagamentos
- **OpenAI API** ou **Claude 3.5** para IA

---

## 📚 Principais Funcionalidades

### 1. Banco de Questões (ENAMED + ENARE + Residência)

- Questões reais e simuladas do ENAMED (100 questões, 5 áreas)
- Questões do ENARE (nota de corte para residência)
- Questões de provas de residência médica por especialidade
- Questões organizadas por área de conhecimento da matriz comum
- Níveis de dificuldade (fácil, médio, difícil)
- Tags e filtros avançados
- Questões com explicações detalhadas
- Comentários de especialistas
- Estatísticas de acerto/erro por questão
- Matriz de Referência Comum para Avaliação da Formação Médica

### 2. Simulador de Provas

- Simulação idêntica ao ENAMED (100 questões, TRI)
- Timer sincronizado com tempo real da prova
- Ambiente similar ao dia da prova
- Modo de treino sem tempo
- Modo simulado com tempo (Teoria de Resposta ao Item)
- Marcação de questões para revisão posterior
- Análise de tempo por questão
- Simulação de pausas e interrupções
- Interface idêntica ao ENAMED real
- Feedback imediato após cada resposta
- Sistema de pontuação TRI (nota de 0 a 100)

### 3. Análise de Desempenho

- Análise por área de conhecimento (5 áreas do ENAMED)
- Gráficos de evolução temporal
- Comparação com usuários de perfil similar
- Identificação de pontos fortes e fracos
- Recomendações de estudo baseadas no desempenho
- Análise preditiva de aprovação (nota >= 60 = Proficiente)
- Estatísticas detalhadas de progresso
- Ranking entre usuários
- Simulação de nota final TRI

### 4. Trilhas de Estudo Personalizadas com IA

- Trilhas geradas por IA (GPT-4/Claude 3.5)
- Baseadas no desempenho atual e áreas fracas
- Adaptadas ao ritmo de cada estudante
- Incluem vídeo-aulas, questões e casos clínicos
- Recomendações automáticas de estudo
- Ajuste de dificuldade em tempo real
- Estudo adaptativo baseado no histórico
- Plano de estudos personalizado por especialidade

### 5. Ranking e Gamificação

- Ranking por especialidade de residência
- Sistema de pontos (XP)
- Conquistas e badges
- Progresso visual
- Competições entre usuários
- Leaderboards por tema
- Metas diárias/semanais/mensais
- Sistema de recompensas

### 6. Flashcards com Spaced Repetition

- Algoritmo SM-2 otimizado (Anki)
- Flashcards gerados automaticamente do conteúdo Darwin-MFC
- Criação manual de flashcards
- Importação/exportação de decks
- Estatísticas de revisão
- Sincronização entre web e mobile
- Flashcards baseados em questões do ENAMED
- Sistema de tags e filtros por especialidade

### 7. Casos Clínicos Interativos

- Casos progressivos com múltiplas decisões
- Cada decisão leva a um caminho diferente
- Feedback imediato e explicação contextual
- Pontuação baseada nas decisões tomadas
- Relacionamento com conteúdo do Darwin-MFC
- Casos por especialidade médica
- Dificuldade progressiva
- Comentários de especialistas

### 8. Comentários de Especialistas

- Comentários detalhados por questão
- Baseados em evidência científica
- Referências bibliográficas atualizadas
- Comentários validados por especialistas
- Discussões aprofundadas
- Sistema de rating dos comentários
- Conexão com diretrizes do Darwin-MFC
- Atualização constante do conteúdo

### 9. Construtor de Provas Personalizadas com Ontologia ⭐

- **Diferencial Único**: Criar provas personalizadas baseadas em critérios
- **Seleção de Bancas**: Escolher quais bancas deseja prestar
- **Filtro por Ontologia**: Selecionar áreas de conhecimento via ontologia médica
- **Geração Inteligente**: IA gera questões baseadas nas áreas selecionadas
- **Simulação Realista**: Timer e ambiente idêntico ao dia da prova
- **Histórico de Provas**: Salvar e recriar provas personalizadas
- **Compartilhamento**: Compartilhar provas com outros usuários
- **Análise de Desempenho**: Comparativo com outros usuários das mesmas bancas

### 10. Vídeo-Aulas

- Vídeos organizados por área de conhecimento
- Progresso de visualização
- Anotações
- Comentários
- Lista de reprodução por especialidade

### 11. Modelo Freemium

**Gratuito:**
- 50 questões por dia
- 5 simulados por mês
- Flashcards básicos
- Análise básica de desempenho
- Acesso à comunidade
- Trilhas de estudo genéricas

**Premium:**
- Acesso ilimitado a questões (ENAMED + ENARE + Residência)
- Simulados avançados (TRI + nota final)
- Análise detalhada de desempenho
- Trilhas de estudo com IA
- Ranking completo
- Flashcards ilimitados
- Casos clínicos
- Vídeo-aulas
- **Construtor de Provas Personalizadas** ⭐
- Suporte prioritário

---

## 🏗️ Design System

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
};
```

---

## 📱 Estrutura de Rotas (Next.js App Router)

```
app/[locale]/
├── (marketing)/
│   ├── page.tsx
│   ├── pricing/
│   └── about/
├── (dashboard)/
│   ├── dashboard/
│   ├── questions/
│   ├── exams/
│   ├── study-paths/
│   ├── flashcards/
│   ├── cases/
│   ├── videos/
│   ├── community/
│   ├── exam-builder/
│   └── profile/
└── auth/
    ├── login/
    └── register/
```

---

## 🔗 Integração com Darwin-MFC

### Compartilhamento de Dados Médicos

```typescript
// packages/shared/data-importer/

interface MedicalDataImporter {
  importDiseases(): Promise<Disease[]>;
  importMedications(): Promise<Medication[]>;
  importProtocols(): Promise<Protocol[]>;
  importGuidelines(): Promise<Guideline[]>;
  importCases(): Promise<ClinicalCase[]>;
}

// Utilização no Darwin Education
const QuestionGenerator = {
  generateQuestion(area: string, difficulty: string): Promise<Question> => {
    // Utiliza dados médicos do Darwin-MFC para gerar questões baseadas em evidência
    const disease = await MedicalDataImporter.getRandomDisease(area);
    const protocol = await MedicalDataImporter.getProtocol(disease.id);
    
    return {
      question: `Qual o protocolo recomendado para ${disease.name}?`,
      options: protocol.treatmentOptions,
      correctAnswer: protocol.recommendedTreatment,
      explanation: protocol.explanation,
      medicalSource: 'Darwin-MFC',
      evidenceLevel: 'A',
    };
  },
};
```

---

## 🤖 Integração com IA

### Serviços de IA

```typescript
// services/ai/study-path-generator.ts

interface StudyPathGenerator {
  generatePersonalizedPath(params: {
    targetExam: 'enamed' | 'enare' | 'residencia';
    targetSpecialty?: string;
    currentLevel: 'beginner' | 'intermediate' | 'advanced';
    weakAreas: string[];
    availableTime: number; // horas por semana
    examDate?: Date;
  }): Promise<StudyPath>;
}

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
const CUSTOM_EXAM_PROMPT = `
Você é um especialista em preparação para ENAMED (Exame Nacional de Avaliação da Formação Médica) e provas de residência médica.

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

Responda em formato JSON com a estrutura:
{
  "title": "Título da prova",
  "description": "Descrição",
  "questions": [...],
  "metadata": {
    "difficulty": "distribuição",
    "areas": ["área1", "área2"],
    "bankRepresentation": ["bancas incluídas"]
  }
}
`;
```

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

## 📋 Roadmap de Implementação

### Fase 1: Setup e Infraestrutura (Semanas 1-4)
1. Setup do monorepo
2. Configuração do Supabase
3. Setup do Expo
4. Configuração de CI/CD
5. Estrutura básica de pastas

### Fase 2: Banco de Dados (Semanas 5-6)
6. Criar tabelas principais
7. Configurar autenticação
8. Setup de RLS (Row Level Security)

### Fase 3: UI Base (Semanas 7-10)
9. Setup do Design System
10. Componentes base
11. Layout principal
12. Navegação

### Fase 4: Banco de Questões (Semanas 11-14)
13. Importar questões ENAMED
14. Sistema de filtros
15. Visualização de questões

### Fase 5: Simulador (Semanas 15-18)
16. Interface de prova
17. Timer e navegação
18. Sistema de respostas

### Fase 6: IA e Personalização (Semanas 19-22)
19. Integração com OpenAI/Claude
20. Geração de trilhas personalizadas
21. Recomendações de questões

### Fase 7: Construtor de Provas (Semanas 23-26)
22. Seletor de bancos
23. Filtro por ontologia
24. Geração de provas personalizadas

### Fase 8: Recursos Avançados (Semanas 27-32)
25. Flashcards
26. Casos clínicos
27. Vídeo-aulas
28. Gamificação

### Fase 9: Mobile e Otimização (Semanas 33-40)
29. App React Native
30. Sincronização offline
31. Performance
32. Testes E2E

### Fase 10: Lançamento (Semanas 41-48)
33. Beta testing
34. Correções finais
35. Documentação
36. Lançamento

---

## 📚 Referências

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Expo Documentation](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Nota Técnica ENAMED 42/2025 - INEP](https://sei.inep.gov.br/sei/controlador_externo.php?acao=documento_conferir&id_orgao_acesso_externo=0&codigo_verificador=1849798)

---

**Documento criado por:** Roo (Architect Mode)  
**Última atualização:** 23 de Janeiro de 2026  
**Versão:** 1.0.1
