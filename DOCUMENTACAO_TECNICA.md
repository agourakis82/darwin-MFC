# Documentação Técnica Completa - Darwin-MFC

## Índice

1. [Visão Geral](#visão-geral)
2. [Stack Tecnológica](#stack-tecnológica)
3. [Arquitetura do Sistema](#arquitetura-do-sistema)
4. [Gerenciamento de Estado](#gerenciamento-de-estado)
5. [Sistema de Tipos](#sistema-de-tipos)
6. [Camada de Dados](#camada-de-dados)
7. [Componentes](#componentes)
8. [Páginas e Rotas](#páginas-e-rotas)
9. [Sistema de Temas](#sistema-de-temas)
10. [Sistema de Citações Bibliográficas](#sistema-de-citações-bibliográficas)
11. [Guia de Desenvolvimento](#guia-de-desenvolvimento)
12. [Estrutura de Arquivos](#estrutura-de-arquivos)

---

## Visão Geral

**Darwin-MFC** é uma aplicação web acadêmica de padrão Q1 (nível Nature/Cell) para análise comparativa de programas de rastreamento populacional no Brasil. Compara diretrizes do **SUS (Sistema Único de Saúde)** com recomendações de **Sociedades Médicas** em 16 diferentes programas de rastreamento.

### Características Principais

| Característica | Descrição |
|----------------|-----------|
| **Rigor Acadêmico** | Citações inline no estilo Vancouver |
| **Modo Dual de Conteúdo** | Descritivo ↔ Análise Crítica |
| **Geração Estática** | SSG para deploy no GitHub Pages |
| **Tema Padrão** | Dark mode como default |
| **Idioma** | Português brasileiro (pt-BR) |

---

## Stack Tecnológica

### Dependências de Produção

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "next": "^15.1.0",
  "framer-motion": "^11.11.17",
  "zustand": "^4.4.7",
  "recharts": "^2.15.0",
  "lucide-react": "^0.468.0",
  "fuse.js": "^7.0.0",
  "date-fns": "^3.0.6",
  "jspdf": "^2.5.1",
  "html2canvas": "^1.4.1",
  "papaparse": "^5.4.1",
  "react-to-print": "^3.0.2"
}
```

### Dependências de Desenvolvimento

```json
{
  "typescript": "^5",
  "tailwindcss": "^4.0.0",
  "@tailwindcss/postcss": "^4.0.0",
  "postcss": "^8.4.49"
}
```

### Propósito de Cada Biblioteca

| Biblioteca | Propósito |
|------------|-----------|
| **Next.js 15** | Framework React com App Router e SSG |
| **React 19** | Biblioteca de UI com novas features |
| **Zustand** | Gerenciamento de estado leve |
| **Framer Motion** | Animações fluidas entre modos de conteúdo |
| **Recharts** | Gráficos e visualizações de dados |
| **Fuse.js** | Busca fuzzy inteligente |
| **Lucide React** | Ícones SVG modernos |
| **jsPDF + html2canvas** | Exportação para PDF |
| **PapaParse** | Exportação para CSV |
| **date-fns** | Manipulação de datas |

---

## Arquitetura do Sistema

### Diagrama de Alto Nível

```
┌─────────────────────────────────────────────────────────────────┐
│                         CAMADA DE APRESENTAÇÃO                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Header    │  │   Sidebar   │  │   ContentModeWrapper    │  │
│  │ (navegação) │  │ (categorias)│  │ (switch descr/análise)  │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                         CAMADA DE PÁGINAS                        │
│  ┌──────┐ ┌────────┐ ┌─────────┐ ┌──────────┐ ┌────────────┐    │
│  │ Home │ │ Cancer │ │ Infantil│ │ Gestação │ │ ...outros  │    │
│  └──────┘ └────────┘ └─────────┘ └──────────┘ └────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│                       CAMADA DE COMPONENTES                      │
│  ┌────────────────┐  ┌───────────────┐  ┌──────────────────┐    │
│  │ ComparisonCard │  │ InlineCitation│  │ CoverageChart    │    │
│  │ ComparisonSect │  │ CitationTooltip│ │ ConvergenceChart │    │
│  └────────────────┘  └───────────────┘  └──────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│                         CAMADA DE ESTADO                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Zustand Store (appStore)                │  │
│  │  • theme: 'light' | 'dark'                                 │  │
│  │  • contentMode: 'descriptive' | 'critical_analysis'       │  │
│  │  • favorites: string[]                                     │  │
│  │  • notes: Record<string, string>                          │  │
│  │  → Persistência: localStorage ('rastreamentos-sus-storage')│  │
│  └───────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                         CAMADA DE DADOS                          │
│  ┌─────────────────┐  ┌──────────────────┐  ┌───────────────┐   │
│  │ rastreamentos.ts│  │ analise-critica.ts│  │ references.ts │   │
│  │ (protocolos SUS)│  │ (insights/debates)│  │ (bibliografia)│   │
│  └─────────────────┘  └──────────────────┘  └───────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Padrão de Arquitetura: Modo Dual de Conteúdo

O recurso central da aplicação é o **sistema de modo dual de conteúdo**:

1. **Modo Descritivo** (azul): Protocolos, epidemiologia, dados SUS vs Sociedades
2. **Modo Análise Crítica** (roxo): Insights, controvérsias, desafios sistêmicos

Este toggle afeta **todas as páginas globalmente** através do estado Zustand.

---

## Gerenciamento de Estado

### Arquivo: `lib/store/appStore.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppStore extends AppState {
  // Estado
  theme: 'light' | 'dark';
  contentMode: 'descriptive' | 'critical_analysis';
  favorites: string[];
  notes: Record<string, string>;

  // Actions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setContentMode: (mode: ContentMode) => void;
  toggleContentMode: () => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setNote: (id: string, note: string) => void;
  removeNote: (id: string) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Estado inicial - Dark mode como padrão
      theme: 'dark',
      contentMode: 'descriptive',
      favorites: [],
      notes: {},
      // ... actions
    }),
    {
      name: 'rastreamentos-sus-storage', // Chave no localStorage
      partialize: (state) => ({
        theme: state.theme,
        contentMode: state.contentMode,
        favorites: state.favorites,
        notes: state.notes,
      }),
    }
  )
);
```

### Uso nos Componentes

```typescript
// Ler estado
const theme = useAppStore((state) => state.theme);
const contentMode = useAppStore((state) => state.contentMode);

// Executar actions
const toggleTheme = useAppStore((state) => state.toggleTheme);
const toggleContentMode = useAppStore((state) => state.toggleContentMode);
```

### Fluxo de Persistência

```
┌─────────────┐    ┌─────────────┐    ┌─────────────────────────┐
│  Componente │───▶│ Zustand     │───▶│ localStorage            │
│  (toggle)   │    │ Store       │    │ 'rastreamentos-sus-     │
│             │◀───│             │◀───│  storage'               │
└─────────────┘    └─────────────┘    └─────────────────────────┘
```

---

## Sistema de Tipos

### Tipos Principais de Rastreamento

**Arquivo:** `lib/types/rastreamentos.ts`

```typescript
// Status de convergência entre SUS e Sociedades
export type ConvergenciaStatus =
  | 'convergencia'   // 🟢 Acordo total
  | 'parcial'        // 🟡 Acordo parcial
  | 'divergencia'    // 🔴 Desacordo
  | 'em_disputa';    // 🟣 Debate ativo

// Estrutura de recomendações
export interface Recommendations {
  sus: {
    population: string;      // Ex: "Mulheres 50-74 anos"
    method: string;          // Ex: "Mamografia bilateral"
    periodicity: string;     // Ex: "Bienal"
    justification: string;   // Justificativa técnica
    coverage?: string;       // Cobertura atual
    citations: Citation[];   // Referências
  };
  societies: {
    organization: string[];  // Ex: ["SBM", "FEBRASGO"]
    population: string;
    method: string;
    periodicity: string;
    recommendation: string;
    citations: Citation[];
  };
  convergence: {
    status: ConvergenciaStatus;
    description: string;
    citations: Citation[];
  };
}

// Rastreamento completo
export interface Rastreamento {
  id: string;                    // Identificador único
  title: string;                 // Título do rastreamento
  category: 'neonatal' | 'infantil' | 'adultos' | 'cancer' | 'gestacao' | 'infecciosas' | 'saude_mental' | 'outros';
  description: string;           // Descrição/resumo
  recommendations: Recommendations;
  epidemiology: {
    incidence?: string;
    mortality?: string;
    prevalence?: string;
    citations: Citation[];
  };
  lastUpdate: string;            // Ex: "2025-11"
}
```

### Tipos de Análise Crítica

**Arquivo:** `lib/types/analysis.ts`

```typescript
// Insight de segunda ou terceira ordem
export interface Insight {
  id: string;
  type: 'segunda_ordem' | 'terceira_ordem';
  title: string;
  description: string;
  implication: string;  // Implicação prática/sistêmica
  citations: Citation[];
}

// Controvérsia com posições A vs B
export interface Controversy {
  id: string;
  topic: string;
  positionA: {
    entity: string;      // Ex: "SBM/CBR"
    argument: string;
    citations: Citation[];
  };
  positionB: {
    entity: string;      // Ex: "INCA/MS"
    argument: string;
    citations: Citation[];
  };
  synthesis: string;     // Síntese ou status atual
}

// Análise crítica completa
export interface CriticalAnalysis {
  rastreamentoId: string;  // Vínculo com rastreamento
  context: string;         // Contexto histórico/político
  paradigmShift: boolean;  // Se houve mudança de paradigma
  insights: Insight[];
  controversies: Controversy[];
  challenges: {
    operational: string;   // Desafio logístico
    financial: string;     // Desafio financeiro
    equity: string;        // Desafio de equidade
    citations: Citation[];
  }[];
  conclusion: string;
}
```

### Tipos de Referências

**Arquivo:** `lib/types/references.ts`

```typescript
export type ReferenceType =
  | 'artigo'
  | 'portaria'
  | 'lei'
  | 'nota_tecnica'
  | 'site'
  | 'livro'
  | 'diretriz';

export interface Reference {
  id: string;
  type: ReferenceType;
  authors?: string[];
  title: string;
  journal?: string;       // Para artigos
  year: number;
  volume?: string;
  pages?: string;
  doi?: string;
  url?: string;
  accessDate?: string;
  legalNumber?: string;   // Para portarias/leis
  publisher?: string;     // Para livros
  edition?: string;
}

// Citação inline
export interface Citation {
  refId: string;          // ID da referência
  page?: string;          // Página específica
  note?: string;          // Nota contextual
}
```

---

## Camada de Dados

### Estrutura de Dados

Todos os dados são armazenados como constantes TypeScript (sem backend):

```
lib/data/
├── rastreamentos.ts      # Protocolos de rastreamento (modo descritivo)
├── analise-critica.ts    # Análises críticas (modo análise)
└── references.ts         # Base de referências bibliográficas
```

### Exemplo: Rastreamento de Câncer de Mama

**Arquivo:** `lib/data/rastreamentos.ts`

```typescript
export const rastreamentos: Record<string, Rastreamento> = {
  'cancer-mama': {
    id: 'cancer-mama',
    title: 'Rastreamento do Câncer de Mama',
    category: 'cancer',
    description: 'O câncer de mama é o tipo mais comum...',
    recommendations: {
      sus: {
        population: 'Mulheres de 50 a 74 anos...',
        method: 'Mamografia bilateral bienal',
        periodicity: 'A cada 2 anos',
        justification: 'A expansão para 40-49 anos...',
        coverage: '~24-40%',
        citations: [
          { refId: 'ms-mamografia-2025' },
          { refId: 'inca-estimativa-2023' }
        ]
      },
      societies: {
        organization: ['SBM', 'FEBRASGO', 'CBR'],
        population: 'Mulheres a partir de 40 anos',
        method: 'Mamografia digital anual',
        periodicity: 'Anual',
        recommendation: 'Início aos 40 anos...',
        citations: [{ refId: 'sbm-mamografia-2025' }]
      },
      convergence: {
        status: 'parcial',
        description: 'Alta convergência na idade...',
        citations: [...]
      }
    },
    epidemiology: {
      incidence: '~66.000 casos/ano',
      mortality: '~18.000 óbitos/ano',
      prevalence: '50-60% diagnosticados em estádios avançados',
      citations: [{ refId: 'inca-estimativa-2023' }]
    },
    lastUpdate: '2025-09'
  },
  // ... outros rastreamentos
};
```

### Exemplo: Análise Crítica

**Arquivo:** `lib/data/analise-critica.ts`

```typescript
const analiseCancerMama: CriticalAnalysis = {
  rastreamentoId: 'cancer-mama',
  context: 'A mamografia foi o tema mais disputado...',
  paradigmShift: true,
  insights: [
    {
      id: 'insight-mama-1',
      type: 'segunda_ordem',
      title: 'Decisão Compartilhada como Estratégia',
      description: 'A expressão "decisão compartilhada"...',
      implication: 'Mulheres de 40-49 anos podem solicitar...',
      citations: [{ refId: 'ms-mamografia-2025' }]
    }
  ],
  controversies: [
    {
      id: 'contro-mama-1',
      topic: 'Periodicidade: Anual vs Bienal',
      positionA: {
        entity: 'SBM/CBR',
        argument: 'Recomendam anual aos 40 anos...',
        citations: [...]
      },
      positionB: {
        entity: 'INCA/MS',
        argument: 'Mantêm bienal...',
        citations: [...]
      },
      synthesis: 'Diferença de 2-5% na detecção...'
    }
  ],
  challenges: [...],
  conclusion: 'A política de 2025 é um avanço discursivo...'
};
```

### Funções de Acesso a Dados

```typescript
// Obter rastreamentos por categoria
export function getRastreamentosByCategory(category: string): Rastreamento[] {
  return Object.values(rastreamentos)
    .filter(r => r.category === category);
}

// Obter referência por ID
export function getReference(refId: string): Reference | undefined {
  return references[refId];
}
```

---

## Componentes

### Componentes de Layout

#### Header (`app/components/Layout/Header.tsx`)

Responsabilidades:
- Navegação global
- Toggle de tema (claro/escuro)
- Toggle de modo de conteúdo (descritivo/análise)
- Menu mobile responsivo
- Barra de busca

```typescript
export default function Header() {
  const { theme, toggleTheme, contentMode, toggleContentMode } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 navbar-glass">
      {/* Logo, navegação, controles */}
      <button onClick={toggleContentMode}>
        {contentMode === 'descriptive' ? 'Descritivo' : 'Análise'}
      </button>
    </header>
  );
}
```

#### Sidebar (`app/components/Layout/Sidebar.tsx`)

Responsabilidades:
- Navegação por categorias
- Subseções dinâmicas (geradas dos dados)
- Seções expansíveis
- Indicador de status (atualizado)

```typescript
// Gera subseções dinamicamente dos dados
function getSubsectionsForCategory(category: string, path: string) {
  const rastreamentos = getRastreamentosByCategory(category);
  return rastreamentos.map(r => ({
    title: r.title.replace('Rastreamento de ', ''),
    path: `${path}#${r.id}`
  }));
}
```

#### ThemeProvider (`app/components/Layout/ThemeProvider.tsx`)

Responsabilidades:
- Inicialização do tema client-side
- Prevenção de flash de tema incorreto
- Sincronização com classe CSS do `<html>`

### Componente ContentModeWrapper

**Arquivo:** `app/components/Content/ContentModeWrapper.tsx`

Este é o componente central para a arquitetura de modo dual:

```typescript
'use client';

import { useAppStore } from '@/lib/store/appStore';
import { motion, AnimatePresence } from 'framer-motion';

interface ContentModeWrapperProps {
  descriptiveContent: React.ReactNode;
  criticalAnalysisContent: React.ReactNode;
}

export default function ContentModeWrapper({
  descriptiveContent,
  criticalAnalysisContent
}: ContentModeWrapperProps) {
  const contentMode = useAppStore((state) => state.contentMode);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={contentMode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {contentMode === 'descriptive'
          ? descriptiveContent
          : criticalAnalysisContent}
      </motion.div>
    </AnimatePresence>
  );
}
```

### Componentes de Comparação

#### ComparisonCard (`app/components/Comparison/ComparisonCard.tsx`)

Exibe comparação lado a lado entre SUS e Sociedades:

```typescript
interface ComparisonCardProps {
  title: string;
  recommendations: Recommendations;
}

export default function ComparisonCard({ title, recommendations }) {
  const { sus, societies, convergence } = recommendations;

  // Configuração visual baseada no status
  const getStatusConfig = (status: ConvergenciaStatus) => {
    switch (status) {
      case 'convergencia':
        return { color: 'emerald', icon: CheckCircle2, label: 'Convergência Total' };
      case 'parcial':
        return { color: 'amber', icon: HelpCircle, label: 'Convergência Parcial' };
      case 'divergencia':
        return { color: 'red', icon: XCircle, label: 'Divergência' };
      case 'em_disputa':
        return { color: 'purple', icon: AlertTriangle, label: 'Em Disputa' };
    }
  };

  return (
    <div className="grid lg:grid-cols-2">
      {/* Coluna SUS */}
      <div>...</div>
      {/* Coluna Sociedades */}
      <div>...</div>
      {/* Rodapé de Convergência */}
      <div>...</div>
    </div>
  );
}
```

### Componentes de Bibliografia

#### InlineCitation (`app/components/Bibliography/InlineCitation.tsx`)

Renderiza citações no formato Vancouver com tooltip:

```typescript
interface InlineCitationProps {
  citation: Citation | Citation[];
  format?: 'vancouver' | 'abnt';
}

export default function InlineCitation({ citation, format = 'vancouver' }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const citations = Array.isArray(citation) ? citation : [citation];
  const displayText = formatVancouver(citations.map(c => c.refId));
  // Exibe: [1], [2,3], [1-3]

  return (
    <span
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button className="text-blue-600">{displayText}</button>
      {showTooltip && <CitationTooltip citations={citations} />}
    </span>
  );
}
```

### Componentes de Gráficos

| Componente | Arquivo | Descrição |
|------------|---------|-----------|
| **CoverageChart** | `Charts/CoverageChart.tsx` | Gráfico de barras: cobertura vs meta |
| **ConvergenceChart** | `Charts/ConvergenceChart.tsx` | Gráfico de pizza: status de convergência |
| **TimelineChart** | `Charts/TimelineChart.tsx` | Linha do tempo: evolução 2015-2025 |

Todos usam **Recharts** para visualização.

---

## Páginas e Rotas

### Estrutura de Rotas (App Router)

```
app/
├── page.tsx              → /           (Homepage)
├── layout.tsx            → Layout raiz (Header, Sidebar, ThemeProvider)
├── globals.css           → Estilos globais
│
├── cancer/page.tsx       → /cancer     (Rastreamentos oncológicos)
├── gestacao/page.tsx     → /gestacao   (Pré-natal)
├── infantil/page.tsx     → /infantil   (Saúde infantil)
├── neonatal/page.tsx     → /neonatal   (Triagem neonatal)
├── adultos/page.tsx      → /adultos    (DCNTs)
├── outros/page.tsx       → /outros     (Outros programas)
│
├── analise/page.tsx      → /analise    (Visão de análise crítica)
├── comparacao/page.tsx   → /comparacao (Comparações interativas)
├── busca/page.tsx        → /busca      (Busca avançada)
├── calculadoras/page.tsx → /calculadoras (Calculadoras clínicas)
├── bibliografia/page.tsx → /bibliografia (Referências completas)
└── timeline/page.tsx     → /timeline   (Linha do tempo 2025)
```

### Padrão de Página com Modo Dual

```typescript
// Exemplo: app/cancer/page.tsx
'use client';

import ContentModeWrapper from '../components/Content/ContentModeWrapper';
import ComparisonSection from '../components/Comparison/ComparisonSection';
import CriticalAnalysisView from '../components/Analysis/CriticalAnalysisView';

export default function CancerPage() {
  const rastreamentos = getRastreamentosByCategory('cancer');

  // Conteúdo Descritivo
  const descriptiveContent = (
    <>
      <h1>Rastreamento de Câncer</h1>
      {rastreamentos.map((r) => (
        <ComparisonSection key={r.id} rastreamento={r} />
      ))}
    </>
  );

  // Conteúdo de Análise Crítica
  const criticalAnalysisContent = (
    <CriticalAnalysisView
      category="cancer"
      title="Rastreamento de Câncer"
      insights={[...]}
      controversies={[...]}
      operationalChallenges={[...]}
    />
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <ContentModeWrapper
        descriptiveContent={descriptiveContent}
        criticalAnalysisContent={criticalAnalysisContent}
      />
    </div>
  );
}
```

### Layout Raiz

**Arquivo:** `app/layout.tsx`

```typescript
import ThemeProvider from "./components/Layout/ThemeProvider";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";

export const metadata: Metadata = {
  title: "Rastreamentos Populacionais no SUS (2025)",
  description: "Análise comparativa...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        {/* Script inline para evitar flash de tema */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var theme = localStorage.getItem('app-theme');
              if (theme === 'light') {
                document.documentElement.classList.remove('dark');
              } else {
                document.documentElement.classList.add('dark');
              }
            })();
          `
        }} />
      </head>
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
              <div className="hidden lg:block">
                <Sidebar />
              </div>
              <main className="flex-1 overflow-x-hidden">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## Sistema de Temas

### Variáveis CSS

**Arquivo:** `app/globals.css`

```css
@layer base {
  :root {
    --foreground: #1d1d1f;
    --background: #ffffff;
    --primary: #007aff;
    --secondary: #5856d6;
    /* ... outras variáveis */
  }

  .dark {
    --foreground: #f5f5f7;
    --background: #1d1d1f;
    --primary: #5ac8fa;
    --secondary: #bf5af2;
    /* ... variáveis dark */
  }
}
```

### Inicialização do Tema

O tema é inicializado em 3 níveis para evitar flash:

1. **Script inline no `<head>`** - Lê localStorage antes do React
2. **Classe `dark` no `<html>`** - Aplica tema via Tailwind
3. **Zustand store** - Gerencia estado reativo

### Classes Tailwind

```html
<!-- Exemplo de uso dual -->
<div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
  Conteúdo
</div>
```

---

## Sistema de Citações Bibliográficas

### Fluxo de Citação

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  InlineCitation │───▶│ formatVancouver()│───▶│ [1], [2-4]      │
│  citation={...} │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │
         ▼ (hover)
┌─────────────────┐    ┌──────────────────┐
│ CitationTooltip │◀───│ getReference()   │
│ (referência     │    │ (busca na base)  │
│  completa)      │    │                  │
└─────────────────┘    └──────────────────┘
```

### Formatos Suportados

| Formato | Exemplo |
|---------|---------|
| **Vancouver** | [1], [2,3], [1-3] |
| **ABNT** | (AUTOR, 2025) |

### Base de Referências

```typescript
// lib/data/references.ts
export const references: Record<string, Reference> = {
  'portaria-saes-13-2025': {
    id: 'portaria-saes-13-2025',
    type: 'portaria',
    title: 'Diretrizes para Rastreamento do Câncer de Colo do Útero',
    legalNumber: 'Portaria SAES/SECTICS Nº 13',
    year: 2025,
    url: 'https://www.gov.br/inca/pt-br',
    accessDate: '2025-11-30',
    authors: ['Ministério da Saúde', 'INCA']
  },
  // ... mais referências
};
```

---

## Guia de Desenvolvimento

### Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de dev (localhost:3000)

# Produção
npm run build        # Build estático
npm run start        # Servir build local

# Instalação
npm install          # Instalar dependências
```

### Adicionando Novo Rastreamento

1. **Definir dados descritivos** em `lib/data/rastreamentos.ts`:

```typescript
'novo-rastreamento': {
  id: 'novo-rastreamento',
  title: 'Nome do Rastreamento',
  category: 'cancer', // ou outra categoria
  description: '...',
  recommendations: { sus: {...}, societies: {...}, convergence: {...} },
  epidemiology: {...},
  lastUpdate: '2025-12'
}
```

2. **Criar análise crítica** em `lib/data/analise-critica.ts`:

```typescript
const analiseNovoRastreamento: CriticalAnalysis = {
  rastreamentoId: 'novo-rastreamento',
  context: '...',
  paradigmShift: false,
  insights: [...],
  controversies: [...],
  challenges: [...],
  conclusion: '...'
};
```

3. **Adicionar referências** em `lib/data/references.ts`

4. **Atualizar navegação** no Sidebar (se nova categoria)

### Trabalhando com Citações

```tsx
// Toda afirmação factual deve ter citação
<p>
  O câncer de mama é o mais incidente em mulheres brasileiras
  <InlineCitation citation={[{ refId: 'inca-estimativa-2023' }]} />
</p>
```

### Considerações de Modo de Conteúdo

- **Sempre forneça AMBOS os conteúdos** (descritivo e análise crítica)
- Use `ContentModeWrapper` para envolver ambas as versões
- **Nunca misture** conteúdo descritivo e crítico na mesma view

---

## Estrutura de Arquivos

```
Darwin-MFC/
├── app/
│   ├── layout.tsx                    # Layout raiz
│   ├── page.tsx                      # Homepage
│   ├── globals.css                   # Estilos globais
│   │
│   ├── [categoria]/page.tsx          # Páginas por categoria
│   │
│   └── components/
│       ├── Layout/
│       │   ├── Header.tsx            # Navegação global
│       │   ├── Sidebar.tsx           # Menu lateral
│       │   └── ThemeProvider.tsx     # Gerenciador de tema
│       │
│       ├── Bibliography/
│       │   ├── InlineCitation.tsx    # Citações [1]
│       │   ├── CitationTooltip.tsx   # Tooltip de referência
│       │   ├── ReferenceList.tsx     # Lista de referências
│       │   ├── FootnoteSystem.tsx    # Sistema de notas
│       │   └── ReferenceValidator.tsx # Validador (dev)
│       │
│       ├── Comparison/
│       │   ├── ComparisonCard.tsx    # Card SUS vs Sociedades
│       │   └── ComparisonSection.tsx # Seção de comparação
│       │
│       ├── Charts/
│       │   ├── CoverageChart.tsx     # Gráfico de cobertura
│       │   ├── ConvergenceChart.tsx  # Gráfico de convergência
│       │   └── TimelineChart.tsx     # Linha do tempo
│       │
│       ├── Content/
│       │   └── ContentModeWrapper.tsx # Switch descritivo/análise
│       │
│       ├── Analysis/
│       │   └── CriticalAnalysisView.tsx # View de análise crítica
│       │
│       ├── Hero/
│       │   └── HeroSection.tsx       # Seção hero
│       │
│       ├── Search/
│       │   └── AdvancedSearch.tsx    # Busca com Fuse.js
│       │
│       ├── Export/
│       │   └── ExportTools.tsx       # PDF/CSV/JSON
│       │
│       ├── Logos/
│       │   ├── OfficialLogos.tsx     # Logos SUS/INCA
│       │   └── InstitutionLogos.tsx  # Logos institucionais
│       │
│       └── Infographics/
│           ├── OfficialInfographics.tsx  # Infográficos oficiais
│           └── RealDataInfographics.tsx  # Dados reais
│
├── lib/
│   ├── data/
│   │   ├── rastreamentos.ts          # Dados descritivos
│   │   ├── analise-critica.ts        # Análises críticas
│   │   └── references.ts             # Bibliografia
│   │
│   ├── types/
│   │   ├── rastreamentos.ts          # Tipos de rastreamento
│   │   ├── analysis.ts               # Tipos de análise
│   │   ├── references.ts             # Tipos de referência
│   │   └── index.ts                  # Barrel exports
│   │
│   ├── store/
│   │   └── appStore.ts               # Zustand store
│   │
│   └── utils/
│       └── calculators.ts            # Funções utilitárias
│
├── public/
│   ├── logos/                        # Logos SVG
│   └── infographics/                 # Imagens infográficos
│
├── package.json
├── tsconfig.json
├── next.config.ts                    # output: "export"
├── postcss.config.js
├── CLAUDE.md                         # Instruções para Claude
└── README.md
```

---

## Decisões Técnicas Importantes

| Decisão | Justificativa |
|---------|---------------|
| **Exportação Estática** | Deploy simples no GitHub Pages, sem servidor |
| **Sem Backend** | Dados TypeScript, sem API/banco de dados |
| **Estado Client-Side** | Zustand + localStorage, sem estado servidor |
| **Português (pt-BR)** | Público-alvo brasileiro |
| **Rigor Acadêmico** | Toda afirmação com citação Vancouver |
| **Modo Dual** | Decisão arquitetural central da aplicação |

---

## Atualizações e Manutenção

### Checklist de Nova Feature

- [ ] Tipos definidos em `lib/types/`
- [ ] Dados em `lib/data/`
- [ ] Referências adicionadas
- [ ] Componentes criados
- [ ] Testes visuais em ambos os modos (descritivo/análise)
- [ ] Responsividade verificada (mobile/desktop)
- [ ] Dark mode verificado

### Versionamento

- **v1.0** - Sistema de referências, layout, 4 rastreamentos
- **v1.1** (em progresso) - 16 rastreamentos, exportação PDF
- **v2.0** (futuro) - Backend, autenticação, PWA

---

**Última atualização:** Dezembro 2025
**Autor:** Dr. Demétrios Agourakis
**Plataforma:** Darwin-MFC
