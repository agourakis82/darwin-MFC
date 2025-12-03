# 🔄 Sistema de Alternância de Conteúdo

## Visão Geral

Implementado um sistema completo de alternância entre **Modo Descritivo** e **Modo Análise Crítica**, permitindo ao usuário alternar a visualização do conteúdo com um clique no header.

---

## 🎯 Componentes Criados

### 1. **ContentModeWrapper.tsx**

Componente wrapper que gerencia a transição entre os dois modos de conteúdo.

**Localização:** `app/components/Content/ContentModeWrapper.tsx`

**Funcionalidades:**
- ✅ Lê o estado global do `contentMode` via Zustand
- ✅ Renderiza condicionalmente o conteúdo apropriado
- ✅ Animação suave de transição via Framer Motion
- ✅ Fade + translateY para efeito Apple

**Uso:**
```tsx
<ContentModeWrapper
  descriptiveContent={<ConteúdoDescritivo />}
  criticalAnalysisContent={<ConteúdoAnáliseCrítica />}
/>
```

---

### 2. **CriticalAnalysisView.tsx**

Componente especializado para exibir análise crítica sistêmica.

**Localização:** `app/components/Analysis/CriticalAnalysisView.tsx`

**Elementos:**

#### **Insights Sistêmicos**
- Classificados em 3 níveis:
  - **1ª Ordem:** Observações diretas
  - **2ª Ordem:** Implicações e consequências
  - **3ª Ordem:** Análise sistêmica profunda

```tsx
insights={[
  {
    id: 'unique-id',
    title: 'Título do Insight',
    content: 'Conteúdo detalhado...',
    type: 'second_order',  // ou 'first_order', 'third_order'
    citations: ['REF-1', 'REF-2']
  }
]}
```

#### **Controvérsias e Tensões**
- Conflitos entre stakeholders
- Divergências técnicas/políticas
- Disputas regulatórias

```tsx
controversies={[
  {
    id: 'controversy-id',
    title: 'Título da Controvérsia',
    description: 'Descrição detalhada...',
    stakeholders: ['Ministério da Saúde', 'Sociedades Médicas'],
    citations: ['REF-1']
  }
]}
```

#### **Desafios Operacionais**
- Lista numerada de desafios práticos
- Gargalos de implementação
- Problemas estruturais

```tsx
operationalChallenges={[
  'Desafio 1...',
  'Desafio 2...',
  'Desafio 3...'
]}
```

#### **Implicações Sistêmicas**
- Síntese final em destaque
- Visão de alto nível

```tsx
systemicImplications="Texto livre com análise de alto nível..."
```

---

## 🎨 Design Visual

### Cores por Tipo de Insight

| Tipo | Cor (Light) | Cor (Dark) | Border |
|------|-------------|------------|--------|
| **1ª Ordem** | `#34c759` Green | `#30d158` | Verde |
| **2ª Ordem** | `#007aff` Blue | `#5ac8fa` | Azul |
| **3ª Ordem** | `#af52de` Purple | `#bf5af2` | Roxo |

### Cores por Seção

| Seção | Ícone | Cor Principal |
|-------|-------|---------------|
| **Insights** | `Info` | Blue `#007aff` |
| **Controvérsias** | `AlertTriangle` | Orange `#ff9500` |
| **Desafios** | `AlertCircle` | Red `#ff3b30` |
| **Implicações** | 💡 | Blue border |

---

## 📄 Estrutura de Página Atualizada

### Exemplo: `app/cancer/page.tsx`

```tsx
'use client';

import ContentModeWrapper from '../components/Content/ContentModeWrapper';
import ComparisonSection from '../components/Comparison/ComparisonSection';
import CriticalAnalysisView from '../components/Analysis/CriticalAnalysisView';

export default function CancerPage() {
  // Conteúdo Descritivo (original)
  const descriptiveContent = (
    <>
      <Header />
      <Comparações />
      <Dados />
    </>
  );

  // Conteúdo Análise Crítica (novo)
  const criticalAnalysisContent = (
    <CriticalAnalysisView
      category="cancer"
      title="Rastreamento de Câncer"
      insights={[...]}
      controversies={[...]}
      operationalChallenges={[...]}
      systemicImplications="..."
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

---

## 🔄 Fluxo de Funcionamento

### 1. **Estado Global (Zustand)**

```typescript
// lib/store/appStore.ts
contentMode: 'descriptive' | 'critical_analysis'
toggleContentMode: () => void
```

### 2. **Botão no Header**

```tsx
// app/components/Layout/Header.tsx
<button onClick={toggleContentMode}>
  {contentMode === 'descriptive' ? 'Descritivo' : 'Análise'}
</button>
```

### 3. **Wrapper Detecta Mudança**

```tsx
// ContentModeWrapper
const contentMode = useAppStore((state) => state.contentMode);

{contentMode === 'descriptive' 
  ? descriptiveContent 
  : criticalAnalysisContent}
```

### 4. **Animação de Transição**

```tsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.3 }}
/>
```

---

## ✅ Páginas Atualizadas

| Página | Status | Análise Crítica |
|--------|--------|-----------------|
| `/cancer` | ✅ Completo | 4 insights, 2 controvérsias, 6 desafios |
| `/gestacao` | ✅ Completo | Implicações sistêmicas |
| `/neonatal` | ⏳ Pendente | - |
| `/infantil` | ⏳ Pendente | - |
| `/adultos` | ⏳ Pendente | - |

---

## 📝 Como Adicionar Análise Crítica em Nova Página

### Passo 1: Tornar a página Client Component

```tsx
'use client';  // Adicionar no topo
```

### Passo 2: Importar componentes

```tsx
import ContentModeWrapper from '../components/Content/ContentModeWrapper';
import CriticalAnalysisView from '../components/Analysis/CriticalAnalysisView';
```

### Passo 3: Separar conteúdos

```tsx
const descriptiveContent = (
  // Conteúdo original da página
);

const criticalAnalysisContent = (
  <CriticalAnalysisView
    category="nome-categoria"
    title="Título da Categoria"
    insights={[...]}
    controversies={[...]}
    operationalChallenges={[...]}
    systemicImplications="..."
  />
);
```

### Passo 4: Envolver no Wrapper

```tsx
return (
  <div className="container">
    <ContentModeWrapper
      descriptiveContent={descriptiveContent}
      criticalAnalysisContent={criticalAnalysisContent}
    />
  </div>
);
```

---

## 🎭 Animações

### Transição Apple-Style

```typescript
transition: {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1]  // Apple cubic-bezier
}
```

### Estados

- **Initial:** `opacity: 0, y: 10` (levemente abaixo)
- **Animate:** `opacity: 1, y: 0` (posição normal)
- **Exit:** `opacity: 0, y: -10` (levemente acima)

---

## 💡 Exemplo de Análise Crítica - Câncer

### Insights (4)

1. **Fragmentação vs. Integração** (2ª ordem)
2. **Paradoxo da Ampliação Etária** (3ª ordem)
3. **Teste de HPV: Tecnologia vs. APS** (2ª ordem)
4. **Próstata: Evidência vs. Pressão Social** (3ª ordem)

### Controvérsias (2)

1. **Conflito Regulatório: Lei Preta Gil**
   - Stakeholders: Congresso, MS, CONITEC, Judiciário
2. **Mamografia 40-49: Benefício Marginal**
   - Stakeholders: MS, FEBRASGO, SBM, INCA

### Desafios Operacionais (6)

- Insuficiência de mamógrafos
- Ausência de sistemas de recall
- Fragmentação dos sistemas de informação
- Capacitação insuficiente da APS
- Tempo de espera para colonoscopia
- Falta de integração rastreamento-tratamento

### Implicação Sistêmica

> "Rastreamento oncológico no Brasil ilustra a tensão entre ambição programática e capacidade operacional..."

---

## 🔧 Manutenção

### Atualizar Store

Se precisar adicionar novos modos:

```typescript
// lib/store/appStore.ts
export type ContentMode = 
  | 'descriptive' 
  | 'critical_analysis' 
  | 'comparative'  // Novo modo
```

### Adicionar Novo Tipo de Seção

Editar `CriticalAnalysisView.tsx` e adicionar nova prop + renderização.

---

## 📊 Métricas de UX

- **Tempo de transição:** 300ms
- **Persistência:** Estado salvo no localStorage
- **Responsividade:** Funciona em mobile/tablet/desktop
- **Acessibilidade:** Focus states preservados

---

**Implementado com rigor Q1 • Dezembro 2025**

