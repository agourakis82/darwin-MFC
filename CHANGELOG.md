# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [0.7.0] - 2025-12-25

### 🎉 Release: Hindi Global Edition / Edição Global Hindi

Esta versão eleva o Darwin-MFC a um produto open-source global de referência em Medicina de Família e Comunidade, com suporte completo ao Hindi e integração de diretrizes indianas NP-NCD.

### ✨ Novos Recursos

#### Suporte Completo ao Hindi (Locale 'hi')
- **5 arquivos de tradução completos** em Hindi:
  - `messages/hi/common.json` - Interface global (UI, navegação, footer)
  - `messages/hi/diseases.json` - ~145 doenças com terminologia médica precisa
  - `messages/hi/medications.json` - 50+ medicamentos com indicações/contraindicações
  - `messages/hi/protocols.json` - Protocolos clínicos
  - `messages/hi/clinical-cases.json` - Casos clínicos
- **Fontes Devanagari** adicionadas ao `globals.css` (Noto Sans Devanagari, Mukta)
- **LanguageSelector** atualizado para suportar Hindi
- **Middleware** configurado para roteamento Hindi (`/hi/*`)

#### Integração de Diretrizes Indianas (NP-NCD 2023-2030)
- **Novo campo `india`** no tipo `Recommendations` para acomodar diretrizes NP-NCD
- **3 rastreamentos com diretrizes indianas completas**:
  - **Câncer de Mama**: CBE (Exame Clínico das Mamas) a partir de 30 anos, anual
  - **Câncer de Colo do Útero**: VIA (Visual Inspection with Acetic Acid) 30-65 anos, a cada 3-5 anos
  - **Câncer Oral**: OVI (Oral Visual Inspection) a partir de 30 anos, anual/bienal (novo rastreamento)
- **4 referências acadêmicas indianas** adicionadas:
  - NP-NCD Operational Guidelines 2023-2030
  - MoHFW Cancer Operational Framework 2023
  - ICMR Cancer Guidelines 2023
  - WHO India NCD Report 2023
- **Página de comparação** atualizada com coluna "India (NP-NCD)"

#### Análise Crítica Adaptada ao Contexto Indiano
- **4 novos insights** comparando Brasil vs Índia vs USA:
  - Perspetiva Global: Índia e o Modelo de Baixo Custo
  - Comparação Internacional: Brasil vs Índia vs USA
  - VIA na Índia: Tecnologia Adaptada ao Contexto
  - Comparação Global: VIA vs HPV-DNA vs Citologia
- **Desafios operacionais, financeiros e de equidade** do contexto indiano documentados
- Ênfase em métodos de baixo custo (VIA, CBE, OVI) e desafios de acesso rural

#### Documentação Acadêmica
- **CITATION.cff FORCE11-compliant** (versão 1.2.0) criado:
  - Metadata completo para citação acadêmica
  - Message bilíngue EN-PT
  - Placeholder para DOI Zenodo
  - Keywords incluindo hindi, np-ncd, india
- **README.md bilíngue EN-PT** completamente reescrito:
  - Badges profissionais
  - Visão e funcionalidades principais
  - Links para graphical abstracts
  - Instruções de instalação
  - Guia de citação
  - Seção "About the Author"
- **LICENSE (MIT)** e **CONTENT_LICENSE (CC-BY-4.0)** com comentários bilíngues

#### Graphical Abstracts
- **6 abstracts gráficos SVG** criados (1200x675, 16:9):
  1. Breast Cancer Screening Global Comparison
  2. Cervical Cancer Screening (VIA vs HPV-DNA vs Cytology)
  3. Oral Cancer Screening - India Priority
  4. Hypertension Management in Primary Care
  5. Interactive Genogram/Ecomap
  6. Platform Overview
- Estilo científico limpo, cores institucionais, ícones Lucide-react
- Títulos bilíngues (EN/PT + HI para foco indiano)

#### Seção "About the Author"
- **Nova página `/about`** com informações do autor
- **Componente `AboutAuthor.tsx`** reutilizável
- **Seção `about`** adicionada a todos os 9 idiomas
- Link no Footer para acesso fácil
- Design profissional alinhado ao design system

### 🔧 Melhorias Técnicas

#### Correções de Build
- Corrigidos múltiplos erros de sintaxe em `expansao-nova-fase.ts`:
  - Comentários mal formatados (`# Nota` → `// Nota`)
  - `criteriosEncaminhamento` → `redFlags` (conforme tipo)
  - Linhas soltas removidas
  - Duplicatas de `redFlags` removidas
- Corrigido erro em `doencas/index.ts` (comentadas linhas com arquivos não encontrados)
- Corrigido tipo de subclasse em `medicamentos/expansao-nova-fase-corrigida.ts`
- Corrigido campo `note` em `references.ts` (removido - não existe no tipo)

#### Estrutura de Dados
- Tipo `Recommendations` estendido com campo opcional `india`
- Novo rastreamento `cancer-oral` adicionado
- Campo `india` adicionado para HAS e diabetes-tipo2

### 📁 Novos Arquivos

```
messages/hi/
├── common.json
├── diseases.json
├── medications.json
├── protocols.json
└── clinical-cases.json

app/
├── about/
│   └── page.tsx
└── components/
    └── About/
        └── AboutAuthor.tsx

public/graphical-abstracts/
├── breast-cancer-global-comparison.svg
├── cervical-cancer-screening.svg
├── oral-cancer-screening-india.svg
├── hypertension-primary-care.svg
├── genogram-ecomap-interactive.svg
├── platform-overview.svg
└── README.md

CITATION.cff
LICENSE
CONTENT_LICENSE
```

### 📊 Estatísticas

- **9 idiomas** suportados (PT, EN, ES, FR, RU, AR, ZH, EL, HI)
- **25 rastreamentos** (incluindo novo cancer-oral)
- **4 países/sistemas** comparados (Brasil/SUS, USA/USPSTF, UK/NHS, India/NP-NCD)
- **6 graphical abstracts** criados
- **FORCE11-compliant** citation metadata

### 🔗 Links

- **Live Demo**: https://mfc.agourakis.med.br
- **Repository**: https://github.com/agourakis82/darwin-mfc
- **Zenodo DOI**: (será adicionado após upload)

### 🙏 Agradecimentos

Agradecimentos especiais à comunidade médica indiana e aos desenvolvedores do NP-NCD por disponibilizar diretrizes abertas que permitiram esta integração.

---

## [2.0.0] - 2024-12-14

### 🎉 Major Release: Guia Completo de MFC

Esta versão transforma o Darwin-MFC em um **Guia Completo de Medicina de Família e Comunidade**, expandindo significativamente o escopo original de rastreamentos para incluir doenças, medicamentos, protocolos clínicos e sistema de cross-references integrado.

### ✨ Novos Recursos

#### Sistema de Doenças (`/doencas`)
- **6 Doenças da APS** com conteúdo estruturado:
  - Hipertensão Arterial Sistêmica
  - Diabetes Mellitus tipo 2
  - Depressão
  - Ansiedade
  - Asma
  - Infecção Urinária
- **Dual-mode view**: QuickView (1 tela) e Versão Completa
- Códigos CIAP-2 e CID-10 integrados
- Critérios diagnósticos, tratamento 1ª linha, red flags
- Seção de cross-references com medicamentos, protocolos e calculadoras

#### Sistema de Medicamentos (`/medicamentos`)
- **9 Medicamentos da RENAME** completamente documentados
- **30+ Medicamentos adicionais** em arquivo expandido
- Classes terapêuticas:
  - Anti-hipertensivos (Losartana, Enalapril, Anlodipino, HCTZ, Atenolol, Propranolol)
  - Antidiabéticos (Metformina, Gliclazida, Insulina NPH)
  - Hipolipemiantes (Sinvastatina, Atorvastatina)
  - Antibióticos (Amoxicilina, Azitromicina, Cefalexina, SMZ/TMP, Nitrofurantoína)
  - Antidepressivos (Fluoxetina, Sertralina, Amitriptilina)
  - Analgésicos/AINEs (Paracetamol, Dipirona, Ibuprofeno)
  - Broncodilatadores (Salbutamol, Beclometasona)
  - IBPs (Omeprazol)
  - Hormônios (Levotiroxina)
  - Anti-histamínicos (Loratadina)
- Posologias detalhadas por indicação
- Ajustes de dose renal (TFG)
- Interações medicamentosas
- Classificação na gestação e amamentação

#### Sistema de Protocolos Clínicos (`/protocolos`)
- **8 Protocolos Interativos** com fluxogramas:
  - Diagnóstico de HAS
  - Tratamento de HAS
  - Tratamento do DM2
  - Manejo da Dor Lombar
  - ITU não complicada em mulheres
  - Classificação e Tratamento da Asma (GINA)
  - Cefaleia - Sinais de Alarme (SNOOP)
- Nodes com tipos: start, decision, action, prescribe, warning, info, refer, end
- Quick Actions integradas para prescrições
- Cross-references para doenças e medicamentos

#### Sistema de Cross-References
- **Engine de referências cruzadas bidirecional** (`lib/data/cross-references.ts`)
- Funções de acesso:
  - `getMedicamentosForDoenca()`
  - `getProtocolosForDoenca()`
  - `getCalculadorasForDoenca()`
  - `getRastreamentosForDoenca()`
  - `getQuickActionsForDoenca()`
  - `getContextualSuggestions()`
- Referências inversas: `getDoencasForMedicamento()`, `getDoencasForProtocolo()`

#### Página de Contexto Clínico (`/contexto/[doencaId]`)
- **Visão unificada** de cada condição clínica
- 4 tabs: Resumo, Medicamentos, Protocolos, Ferramentas
- **Quick Actions** com copy-to-clipboard:
  - Prescrições formatadas
  - Orientações ao paciente
  - Solicitações de exames
- Sugestões contextuais inteligentes
- Link direto para conteúdo completo da doença

#### SmartLink Component
- Links inteligentes com preview popup em hover
- Identificação visual por tipo (doença, medicamento, protocolo, calculadora)
- QuickLinks e ContextualSuggestionCard
- InlineLinks para uso em textos

### 🔧 Melhorias Técnicas

#### Arquitetura
- Sistema de tipos expandido (`lib/types/cross-references.ts`)
- Separação client/server components para SSG
- `generateStaticParams()` para todas as rotas dinâmicas

#### Novos Tipos TypeScript
- `QuickAction` e `QuickActionTipo`
- `MedicamentoReference`, `ProtocoloReference`, `CalculadoraReference`
- `RastreamentoReference`, `ContextualSuggestion`
- `CrossReferenceBundle`

### 📁 Novos Arquivos

```
lib/data/
├── cross-references.ts          # Motor de cross-references
├── medicamentos-expanded.ts     # 30+ medicamentos adicionais

lib/types/
├── cross-references.ts          # Tipos para cross-references

app/contexto/[doencaId]/
├── page.tsx                     # Server component com generateStaticParams
├── ContextoClient.tsx           # Client component interativo

app/components/CrossReference/
├── SmartLink.tsx                # Links inteligentes com preview
```

### 🐛 Correções

- Corrigido conflito de tipos em `lib/types/index.ts`
- Corrigido erro de sintaxe em `protocolos.ts`
- Adicionado null-check em `useParams()`
- Expandido `QuickActionTipo` para incluir 'diagnostico', 'exames', 'encaminhamento'

---

## [1.0.0] - 2024-11-XX

### Lançamento Inicial

- Sistema de Rastreamentos SUS vs Sociedades
- 16 programas de rastreamento
- Dual-mode: Descritivo vs Análise Crítica
- Calculadoras Clínicas
- Bibliografia com citações Vancouver
- PWA com suporte offline
- Dark mode como padrão

