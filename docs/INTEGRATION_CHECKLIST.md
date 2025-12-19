# Checklist de Integração - Darwin MFC

Este documento fornece um checklist manual para verificar a integração de todas as partes do sistema.

## Pré-requisitos

Execute primeiro o script automático:
```bash
npm run verify
```

## Checklist Manual

### ✅ Ontologias

#### LOINC
- [ ] Exames laboratoriais têm códigos LOINC
- [ ] Busca por código LOINC funciona
- [ ] Integração nos tipos `Doenca` e `Medicamento`

#### ORDO
- [ ] Doenças raras têm códigos ORDO
- [ ] Busca por código ORDO funciona
- [ ] Integração no tipo `Doenca`

#### HPO
- [ ] Doenças com fenótipos têm códigos HPO
- [ ] Busca por código HPO funciona
- [ ] Integração no tipo `Doenca`

#### PharmGKB
- [ ] Medicamentos têm dados PharmGKB
- [ ] Alertas farmacogenéticos funcionando
- [ ] Integração no tipo `Medicamento`

### ✅ Sistema de Citações

#### Níveis de Evidência
- [ ] Componente `EvidenceBadge` renderizando
- [ ] Citações têm nível de evidência
- [ ] Classificação automática funcionando

#### GRADE
- [ ] Sistema GRADE implementado
- [ ] Cálculo de scores funcionando
- [ ] Visualização GRADE renderizando
- [ ] Componente `GRADEGrade` funcionando

#### Citações Inline
- [ ] Componente `InlineCitation` funcionando
- [ ] Tooltips exibindo referências completas
- [ ] Formatos de exportação funcionando (Vancouver, ABNT, etc.)

### ✅ Grafo de Conhecimento

#### Construção
- [ ] Grafo construído corretamente
- [ ] Nós criados (doenças, sintomas, medicamentos)
- [ ] Arestas criadas (relações)

#### Queries
- [ ] `findRelatedNodes` funcionando
- [ ] `findPaths` funcionando
- [ ] `findComorbidityClusters` funcionando

#### Visualização
- [ ] Componente `KnowledgeGraphViewer` renderizando
- [ ] Filtros funcionando
- [ ] Interatividade funcionando
- [ ] Export funcionando

### ✅ Busca Semântica

#### Sinônimos
- [ ] Dicionário de sinônimos expandido
- [ ] Sinônimos em português (1000+)
- [ ] Sinônimos em outros idiomas

#### Busca Fuzzy
- [ ] Busca com erros de digitação funcionando
- [ ] Pesos por campo configurados
- [ ] Thresholds ajustáveis
- [ ] Resultados relevantes

#### Faceted Search
- [ ] Filtros por categoria funcionando
- [ ] Filtros por ontologia funcionando
- [ ] Filtros por tipo funcionando
- [ ] Combinação de filtros funcionando

### ✅ Multilíngue

#### Configuração
- [ ] 8 idiomas configurados (pt, en, es, fr, ru, ar, zh, el)
- [ ] Rotas com locale funcionando
- [ ] Middleware funcionando
- [ ] Detecção automática de idioma

#### Traduções UI
- [ ] Header traduzido
- [ ] Sidebar traduzido
- [ ] Footer traduzido
- [ ] Formulários traduzidos
- [ ] Mensagens de erro/sucesso traduzidas
- [ ] Tooltips traduzidos

#### Conteúdo Médico
- [ ] Doenças traduzidas (base)
- [ ] Medicamentos traduzidos (base)
- [ ] Protocolos traduzidos (base)
- [ ] Casos clínicos traduzidos (base)

#### RTL (Árabe)
- [ ] Estilos CSS RTL aplicados
- [ ] Direção do texto correta
- [ ] Sidebar posicionada corretamente
- [ ] Margens e paddings invertidos
- [ ] Dropdowns posicionados corretamente
- [ ] Flexbox funcionando em RTL
- [ ] Bordas e espaçamentos corretos

#### Seletor de Idioma
- [ ] Componente `LanguageSelector` funcionando
- [ ] Dropdown funcionando
- [ ] Botões funcionando
- [ ] Persistência no localStorage
- [ ] Integração com Zustand

### ✅ Integração de Componentes

#### Layout
- [ ] Header renderizando em todos os idiomas
- [ ] Sidebar renderizando em todos os idiomas
- [ ] Footer renderizando em todos os idiomas
- [ ] ThemeProvider funcionando

#### Navegação
- [ ] Links internos funcionando
- [ ] Links com locale funcionando
- [ ] Navegação móvel funcionando
- [ ] Breadcrumbs funcionando (se aplicável)

#### Formulários
- [ ] SOAPExport funcionando
- [ ] Campos traduzidos
- [ ] Validação funcionando
- [ ] Submit funcionando

#### Busca
- [ ] AdvancedSearch funcionando
- [ ] Resultados exibindo corretamente
- [ ] Filtros funcionando
- [ ] Ordenação funcionando

### ✅ Dados Médicos

#### Quantidade
- [ ] 100+ doenças disponíveis
- [ ] 100+ medicamentos disponíveis
- [ ] Protocolos disponíveis
- [ ] Casos clínicos disponíveis

#### Qualidade
- [ ] Todas as doenças têm CID-10 ou CIAP-2
- [ ] Medicamentos têm dados completos
- [ ] Referências bibliográficas presentes
- [ ] Ontologias mapeadas

### ✅ Build e Deploy

#### Build
- [ ] Build de produção completa sem erros
- [ ] Todas as rotas geradas
- [ ] Arquivos estáticos gerados
- [ ] Locales gerados corretamente
- [ ] Sem warnings críticos

#### Export Estático
- [ ] Export estático funcionando
- [ ] Links corrigidos para custom domain
- [ ] Assets carregando corretamente
- [ ] Service Worker funcionando

### ✅ Performance

#### Métricas
- [ ] Tempo de build < 60s
- [ ] First Load JS < 200KB
- [ ] Páginas carregando < 3s
- [ ] Busca respondendo < 200ms

#### Otimizações
- [ ] Code splitting funcionando
- [ ] Lazy loading implementado
- [ ] Imagens otimizadas
- [ ] CSS otimizado

### ✅ Acessibilidade

#### Navegação
- [ ] Navegação por teclado funcionando
- [ ] Skip links funcionando
- [ ] Focus visible
- [ ] Tab order correto

#### Screen Readers
- [ ] ARIA labels presentes
- [ ] Alt text em imagens
- [ ] Landmarks corretos
- [ ] Headings hierárquicos

#### Visual
- [ ] Contraste de cores adequado
- [ ] RTL acessível
- [ ] Fontes legíveis
- [ ] Tamanhos de texto adequados

## Como Executar os Testes

### 1. Teste Automatizado

```bash
npm run verify
```

### 2. Teste Manual por Componente

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Navegue por todas as páginas
3. Teste todos os idiomas
4. Teste RTL (árabe)
5. Verifique busca e filtros
6. Teste formulários e interações

### 3. Teste de Build

```bash
npm run build
```

Verifique:
- Sem erros
- Todas as rotas geradas
- Tamanhos de bundle adequados

## Resultados Esperados

- ✅ Todos os componentes principais funcionando
- ✅ Todas as traduções presentes
- ✅ RTL funcionando corretamente
- ✅ Busca retornando resultados relevantes
- ✅ Grafo construído e visualizável
- ✅ Build completa sem erros
- ✅ Performance adequada

## Problemas Conhecidos

- LOINC e ORDO podem não estar totalmente mapeados (aviso, não erro)
- PharmGKB pode não estar totalmente implementado (aviso, não erro)

Esses são opcionais e podem ser expandidos gradualmente.

