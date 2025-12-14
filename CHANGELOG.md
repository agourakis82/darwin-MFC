# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

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

