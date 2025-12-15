# Guia de Contribuição - Darwin-MFC

Obrigado por considerar contribuir para o Darwin-MFC! Este documento fornece orientações para contribuidores.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Padrões de Código](#padrões-de-código)
- [Adicionando Conteúdo](#adicionando-conteúdo)
- [Testes](#testes)
- [Pull Requests](#pull-requests)

---

## 📜 Código de Conduta

Este projeto segue um código de conduta que promove um ambiente respeitoso e colaborativo. Espera-se que todos os contribuidores:

- Sejam respeitosos e construtivos nas discussões
- Aceitem críticas construtivas graciosamente
- Foquem no que é melhor para a comunidade
- Mostrem empatia com outros membros

---

## 🤝 Como Contribuir

### Tipos de Contribuição

1. **Conteúdo Médico**
   - Adicionar novas doenças com ontologias completas
   - Criar casos clínicos interativos
   - Expandir protocolos flowchart
   - Atualizar medicamentos RENAME

2. **Desenvolvimento**
   - Corrigir bugs
   - Implementar novas features
   - Melhorar performance
   - Otimizar responsividade

3. **Documentação**
   - Melhorar README
   - Documentar APIs
   - Criar tutoriais

4. **Revisão**
   - Revisar Pull Requests
   - Validar conteúdo médico
   - Testar funcionalidades

---

## ⚙️ Configuração do Ambiente

### Pré-requisitos

- Node.js 18+ (recomendado: 20 LTS)
- npm 9+
- Git

### Instalação

```bash
# Clone o repositório
git clone https://github.com/agourakis82/darwin-MFC.git
cd darwin-MFC

# Instale dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

### Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servir build de produção
npm run lint         # Verificar linting
```

---

## 📁 Estrutura do Projeto

```
Darwin-MFC/
├── app/                      # App Router (Next.js 15)
│   ├── components/           # Componentes React
│   │   ├── Layout/           # Header, Sidebar, Footer
│   │   ├── Export/           # SOAPExport, ExportTools
│   │   ├── Charts/           # Gráficos Recharts
│   │   └── ...
│   ├── doencas/              # Páginas de doenças
│   ├── medicamentos/         # Páginas de medicamentos
│   ├── protocolos/           # Páginas de protocolos
│   ├── casos-clinicos/       # Casos clínicos interativos
│   ├── ferramentas/          # Genograma, Ecomapa
│   └── ...
├── lib/                      # Lógica e dados
│   ├── data/                 # Dados estruturados
│   │   ├── doencas/          # Doenças por categoria
│   │   ├── medicamentos/     # Medicamentos RENAME
│   │   ├── casos-clinicos.ts # Casos clínicos
│   │   └── protocolos-flowchart.ts
│   ├── types/                # Tipos TypeScript
│   ├── hooks/                # Custom hooks
│   └── store/                # Zustand store
├── public/                   # Assets estáticos
└── ...
```

---

## 📝 Padrões de Código

### TypeScript

- Use tipos explícitos sempre que possível
- Evite `any` - use `unknown` quando necessário
- Documente interfaces complexas

```typescript
// ✅ Bom
interface Doenca {
  id: string;
  titulo: string;
  categoria: CategoriaDoenca;
  quickView: QuickViewContent;
}

// ❌ Evitar
const doenca: any = { ... };
```

### React/Next.js

- Use componentes funcionais
- Prefira Server Components quando possível
- Marque Client Components explicitamente

```tsx
// Client Component
'use client';

import { useState } from 'react';

export default function MeuComponente() {
  const [state, setState] = useState(false);
  // ...
}
```

### Tailwind CSS

- Use classes utilitárias do Tailwind
- Mantenha consistência com o design system
- Use variáveis CSS para temas

```tsx
// ✅ Bom
<div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">

// ❌ Evitar
<div style={{ padding: '16px', backgroundColor: 'white' }}>
```

---

## 📚 Adicionando Conteúdo

### Adicionar Nova Doença

1. **Escolha a categoria** apropriada em `lib/data/doencas/`
2. **Siga a estrutura** `Partial<Doenca>`
3. **Inclua ontologias** (DOID, SNOMED-CT, MeSH, UMLS CUI)

```typescript
// lib/data/doencas/[categoria].ts

{
  id: 'minha-doenca',
  titulo: 'Nome da Doença',
  ciap2: ['X00'],
  cid10: ['Y00'],
  categoria: 'categoria',
  
  // Ontologias (obrigatório para novas doenças)
  doid: 'DOID:xxxxx',
  snomedCT: 'xxxxxxx',
  meshId: 'Dxxxxxx',
  umlsCui: 'Cxxxxxxx',
  
  quickView: {
    definicao: 'Descrição breve da doença...',
    criteriosDiagnosticos: ['Critério 1', 'Critério 2'],
    tratamentoPrimeiraLinha: {
      naoFarmacologico: ['Medida 1'],
      farmacologico: ['Medicamento 1']
    },
    redFlags: ['Sinal de alarme 1']
  },
  
  medicamentos: ['medicamento-id'],
  protocolos: [],
  calculadoras: []
}
```

### Adicionar Caso Clínico

1. **Crie no arquivo** `lib/data/casos-clinicos.ts`
2. **Siga a estrutura** `CasoClinico`
3. **Inclua 4-6 etapas** progressivas

```typescript
export const meuCaso: CasoClinico = {
  id: 'caso-xxx-001',
  titulo: 'Título do Caso',
  subtitulo: 'Subtítulo descritivo',
  categoria: 'categoria',
  dificuldade: 'iniciante' | 'intermediario' | 'avancado',
  tempoEstimado: 15, // minutos
  
  apresentacao: {
    paciente: { nome: 'João', idade: 45, sexo: 'M' },
    queixaPrincipal: 'Queixa...',
    historiaDoencaAtual: 'HDA detalhada...'
  },
  
  etapas: [
    {
      id: 'etapa-1',
      titulo: 'Anamnese',
      tipo: 'anamnese',
      conteudo: { texto: '...', dicas: [] },
      pergunta: {
        enunciado: 'Pergunta?',
        tipo: 'multipla_escolha',
        opcoes: [
          { id: 'a', texto: 'Opção A', correta: false },
          { id: 'b', texto: 'Opção B', correta: true },
        ],
        respostaCorreta: 'b',
        explicacao: 'Explicação...',
        pontos: 10
      }
    },
    // ... mais etapas
  ],
  
  desfecho: {
    resumo: '...',
    diagnosticoFinal: '...',
    tratamentoRealizado: '...',
    evolucao: '...',
    licoesPrincipais: ['Lição 1'],
    errosComuns: ['Erro 1']
  },
  
  objetivosAprendizagem: ['Objetivo 1'],
  competencias: ['Competência 1'],
  doencasRelacionadas: ['doenca-id'],
  medicamentosRelacionados: ['med-id'],
  calculadorasRelacionadas: [],
  referencias: ['Referência 1'],
  tags: ['tag1', 'tag2']
};

// Adicione ao array
export const todosCasosClinicos: CasoClinico[] = [
  // ... casos existentes
  meuCaso,
];
```

### Adicionar Protocolo Flowchart

1. **Crie nodes e edges** seguindo React Flow
2. **Use nodeTypes** corretos: `start`, `decision`, `action`, `treatment`, `referral`, `end`

```typescript
const meusNodes: ProtocolNode[] = [
  {
    id: 'start',
    type: 'custom',
    position: { x: 400, y: 0 },
    data: {
      label: 'Início',
      nodeType: 'start',
      ciap2: 'X00',
      cid10: 'Y00'
    }
  },
  // ... mais nodes
];
```

---

## 🧪 Testes

### Antes de Submeter

1. **Build sem erros**
   ```bash
   npm run build
   ```

2. **Lint sem warnings**
   ```bash
   npm run lint
   ```

3. **Teste manual**
   - Navegue pelas páginas afetadas
   - Teste em modo mobile (DevTools)
   - Verifique tema dark/light

---

## 🔄 Pull Requests

### Processo

1. **Fork** o repositório
2. **Crie branch** descritiva
   ```bash
   git checkout -b feat/nova-doenca-sinusite
   git checkout -b fix/corrigir-typo-medicamento
   ```

3. **Faça commits** semânticos
   ```bash
   git commit -m "feat: add sinusitis disease with ontology"
   git commit -m "fix: correct dosage for amoxicillin"
   git commit -m "docs: update contributing guide"
   ```

4. **Abra PR** com descrição clara

### Template de PR

```markdown
## Descrição
Breve descrição das mudanças.

## Tipo de Mudança
- [ ] Nova feature
- [ ] Correção de bug
- [ ] Conteúdo médico
- [ ] Documentação

## Checklist
- [ ] Build passa sem erros
- [ ] Lint passa sem warnings
- [ ] Testei manualmente
- [ ] Atualizei documentação se necessário

## Screenshots (se aplicável)
```

---

## 📖 Recursos Úteis

### Ontologias Médicas

- [Disease Ontology](https://disease-ontology.org/) - DOID
- [SNOMED-CT Browser](https://browser.ihtsdotools.org/)
- [MeSH Browser](https://meshb.nlm.nih.gov/)
- [UMLS Metathesaurus](https://www.nlm.nih.gov/research/umls/)

### Diretrizes Clínicas

- [NICE Guidelines](https://www.nice.org.uk/guidance)
- [UpToDate](https://www.uptodate.com/)
- [Dynamed](https://www.dynamed.com/)

### React/Next.js

- [Next.js Docs](https://nextjs.org/docs)
- [React Flow](https://reactflow.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://docs.pmnd.rs/zustand)

---

## 📞 Contato

- **Issues**: Para bugs e sugestões
- **Discussions**: Para dúvidas e ideias
- **Email**: [contato do projeto]

---

**Obrigado por contribuir! 🎉**

