# Rastreamentos Populacionais no SUS (2025) - Aplicação Acadêmica Q1

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss)

Aplicação web interativa de rigor acadêmico Q1 (padrão Nature/Cell) para análise comparativa entre as **Diretrizes do SUS** e **Recomendações de Sociedades Médicas** sobre rastreamentos populacionais no Brasil.

---

## 🎯 Objetivos

1. **Conteúdo Descritivo Completo**: Protocolos, populações-alvo, periodicidade, métodos diagnósticos
2. **Análise Crítica Sistêmica**: Insights de segunda e terceira ordem, controvérsias, desafios operacionais
3. **Sistema de Referências Acadêmico**: Citações inline Vancouver, tooltips, validação de completude
4. **Comparações Interativas**: SUS vs Sociedades lado a lado com status de convergência
5. **Visualizações Analíticas**: Gráficos de cobertura, convergência, evolução temporal
6. **Busca Avançada**: Fuzzy search + filtros por categoria, convergência, ano

---

## 🚀 Tecnologias

- **Next.js 15** + **React 19** + **TypeScript 5**
- **Tailwind CSS 4** - Design system acadêmico responsivo
- **Zustand** - Gerenciamento de estado global
- **Recharts** - Gráficos e visualizações de dados
- **Fuse.js** - Busca fuzzy inteligente
- **Lucide Icons** - Iconografia moderna

---

## 📂 Estrutura do Projeto

```
Darwin-MFC/
├── app/
│   ├── layout.tsx              # Layout raiz com ThemeProvider
│   ├── page.tsx                # Homepage (redirect)
│   ├── globals.css             # Estilos globais + temas + print
│   │
│   ├── cancer/                 # Rastreamentos oncológicos
│   ├── infantil/               # Saúde da criança
│   ├── adultos/                # DCNTs (HAS, DM2, dislipidemia)
│   ├── neonatal/               # Triagem neonatal
│   ├── gestacao/               # Pré-natal
│   ├── comparacao/             # Visão comparativa + gráficos
│   ├── busca/                  # Busca avançada
│   ├── analise/                # Análise crítica sistêmica
│   ├── bibliografia/           # Referências completas
│   └── timeline/               # Linha do tempo 2025
│   │
│   └── components/
│       ├── Layout/             # Header, Sidebar, ThemeProvider
│       ├── Bibliography/       # InlineCitation, ReferenceList, Tooltip
│       ├── Comparison/         # ComparisonCard, ComparisonSection
│       ├── Charts/             # CoverageChart, ConvergenceChart, TimelineChart
│       ├── Search/             # AdvancedSearch (Fuse.js)
│       ├── Calculators/        # RiskCalculator, BMICalculator
│       └── Export/             # ExportTools (PDF, CSV, JSON)
│
├── lib/
│   ├── data/
│   │   ├── rastreamentos.ts    # Dados descritivos estruturados
│   │   ├── analise-critica.ts  # Análises sistêmicas
│   │   ├── references.ts       # Bibliografia completa
│   │   └── timeline.ts         # Eventos 2025+
│   │
│   ├── types/
│   │   ├── rastreamentos.ts    # Interfaces Rastreamento
│   │   ├── references.ts       # Interfaces Reference
│   │   ├── analysis.ts         # AnalysisContent, Controversies, Insights
│   │   └── index.ts            # Re-exports
│   │
│   └── store/
│       └── appStore.ts         # Zustand store (theme, contentMode)
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

---

## ⚡ Instalação e Execução

### Pré-requisitos

- **Node.js 18+** (recomendado 20+)
- **npm**, **yarn** ou **pnpm**

### Passos

```bash
# 1. Clone o repositório (se aplicável)
git clone <repo-url>
cd Darwin-MFC

# 2. Instale as dependências
npm install

# 3. Execute em modo de desenvolvimento
npm run dev

# 4. Acesse no navegador
# http://localhost:3000
```

### Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento (porta 3000)
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Análise estática (ESLint)

---

## 📊 Funcionalidades Principais

### 1. Sistema de Referências Q1

- **Citações Inline**: `<InlineCitation citation="[1], [2]" />` 
- **Tooltips**: Hover sobre citação exibe referência completa
- **Validação**: Componente `ReferenceValidator` alerta sobre afirmações sem referência
- **Formatos**: ABNT, Vancouver, BibTeX, EndNote, RIS

### 2. Dual Content View

- **Modo Descritivo**: Diretrizes, protocolos, epidemiologia
- **Modo Análise Crítica**: Insights de 2ª/3ª ordem, controvérsias, desafios
- Toggle global no Header (Zustand state)

### 3. Comparações Interativas

- **ComparisonCard**: SUS vs Sociedades lado a lado
- **Status Visual**:
  - 🟢 Convergência Total
  - 🟡 Convergência Parcial
  - 🔴 Divergência
  - 🟣 Em Disputa

### 4. Visualizações de Dados

- **CoverageChart**: Cobertura atual vs Meta (barras com cores semafóricas)
- **ConvergenceChart**: Pizza de status de convergência
- **TimelineChart**: Evolução histórica 2015-2025

### 5. Busca Avançada (Fuse.js)

- Busca fuzzy inteligente (tolera erros de digitação)
- Filtros combinados: categoria + convergência + ano
- Resultados ranqueados por relevância

### 6. Calculadoras Clínicas

- **SCORE Cardiovascular** (risco 10 anos)
- **Framingham**
- **Gail Model** (risco câncer de mama)
- **IMC** com classificação OMS

### 7. Exportação

- **PDF**: Impressão acadêmica otimizada
- **CSV**: Dados tabulares para análise
- **JSON**: Dados estruturados para integração
- **Referências**: EndNote, BibTeX, RIS, ABNT, Vancouver

---

## 🎨 Design System

### Temas

- **Claro**: Background branco, texto cinza-900
- **Escuro**: Background cinza-950, texto cinza-100
- Transições suaves, alto contraste para acessibilidade

### Tipografia

- **Títulos**: Font Inter, peso 700-900
- **Corpo**: Font Inter, peso 400-500
- **Monospace**: Para código/dados técnicos

### Cores

- **Primary**: Blue 600 (ações principais)
- **Success**: Emerald 600 (convergência)
- **Warning**: Amber 600 (parcial)
- **Danger**: Red 600 (divergência)
- **Info**: Purple 600 (em disputa)

### Responsividade

- **Mobile-first**: Layout adaptativo para telas 320px+
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Print**: Estilos otimizados para impressão acadêmica

---

## 📚 Rastreamentos Mapeados

### ✅ Implementados

1. **Câncer de Mama** - Mamografia (40+ anos, decisão compartilhada)
2. **Câncer de Colo do Útero** - DNA-HPV (30-64 anos, quinquenal)
3. **Câncer de Próstata** - Não recomendado (decisão compartilhada)
4. **TEA (Autismo)** - M-CHAT-R (16-30 meses)

### 🚧 Em Desenvolvimento

5. Câncer Colorretal
6. Hipertensão Arterial
7. Diabetes Tipo 2
8. Dislipidemia
9. Teste do Pezinho (6-7 → 50 doenças)
10. Sífilis Pré-natal
11. HIV Pré-natal
12. Hepatites B/C Gestacionais
13. GBS (Streptococcus Grupo B)
14. Teste da Orelhinha
15. Teste do Olhinho
16. Teste do Coraçãozinho

---

## 🔬 Metodologia Acadêmica

### Critérios de Rigor Q1

1. **Toda afirmação factual possui referência inline**
2. **Dados estatísticos vinculados à fonte primária**
3. **Portarias e leis citadas com número oficial e link**
4. **Diferenciação visual entre fontes primárias e secundárias**
5. **Análise crítica baseada em insights de 2ª e 3ª ordem**
6. **Controvérsias apresentadas com múltiplas perspectivas**
7. **Desafios operacionais documentados com evidências**

### Fontes Primárias

- Portarias MS (Diário Oficial da União)
- Notas Técnicas INCA/CONITEC
- Posicionamentos de Sociedades (SBM, FEBRASGO, SBP, SBU, etc.)
- Ensaios clínicos e meta-análises
- Dados DATASUS/SIM/SINAN

---

## 🌟 Diferenciais da Aplicação

1. **Rigor Acadêmico Máximo**: Padrão Q1 (Nature, Cell, JAMA)
2. **Dual Content View**: Descritivo ↔ Análise Crítica
3. **Sistema de Referências Completo**: Validação + múltiplos formatos
4. **Análise Sistêmica**: Insights de 2ª/3ª ordem, não apenas descrição
5. **Interatividade Avançada**: Busca fuzzy, filtros, gráficos, calculadoras
6. **Responsividade Total**: Mobile, tablet, desktop, impressão
7. **Acessibilidade**: WCAG 2.1 AA, alto contraste, navegação por teclado
8. **Performance**: Next.js 15, SSR, otimização de imagens

---

## 📈 Roadmap

### Versão 1.0 (Atual)

- [x] Sistema de referências Q1
- [x] Layout responsivo + tema dark/light
- [x] 4 rastreamentos completos
- [x] Busca avançada
- [x] Gráficos básicos
- [x] Análise crítica inicial

### Versão 1.1 (Próximo)

- [ ] Completar todos os 16 rastreamentos
- [ ] Expandir análises críticas
- [ ] Implementar exportação PDF completa (jspdf)
- [ ] Adicionar calculadoras clínicas funcionais
- [ ] Sistema de favoritos com localStorage

### Versão 2.0 (Futuro)

- [ ] Backend API (Next.js API routes)
- [ ] Autenticação de usuários
- [ ] Notas colaborativas
- [ ] Integração com Zotero/Mendeley
- [ ] PWA (Progressive Web App)
- [ ] Modo offline

---

## 🤝 Contribuições

Este projeto faz parte da plataforma **Darwin Medical Foundation Cluster (Darwin-MFC)** e está sob desenvolvimento ativo. Contribuições são bem-vindas:

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é de natureza acadêmica e científica. Todos os dados, análises e referências são de domínio público ou citados conforme normas acadêmicas. Para uso comercial, consulte os autores.

---

## 👨‍⚕️ Autoria

**Dr. Demétrios Agourakis**  
Pesquisador interdisciplinar - Medicina, Farmacologia, Neurociência, Direito Médico  
Plataforma Darwin-MFC

---

## 📧 Contato

Para dúvidas, sugestões ou colaborações:  
📧 [email do projeto]  
🌐 [site da plataforma Darwin]

---

**Última Atualização**: Dezembro 2025  
**Versão**: 1.0.0
# darwin-MFC
