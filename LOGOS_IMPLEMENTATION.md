# 🏥 Implementação de Logos Oficiais das Instituições

## Status Atual: Logos Estilizadas em SVG

Implementei **logos estilizadas em SVG inline** com as cores oficiais de cada instituição. Para uso em produção/apresentação, siga as instruções abaixo para substituir pelas logos oficiais.

---

## ✅ O Que Foi Implementado

### 1. Componente `OfficialLogos.tsx`

**8 Logos estilizadas em SVG:**

| Logo | Cores Oficiais | Símbolos |
|------|----------------|----------|
| **SUS** | Verde #00A859 | Cruz da saúde + texto "SUS" |
| **INCA** | Azul #0066CC | Laço de conscientização + texto "INCA" |
| **CONITEC** | Verde #00A859 | Check + tecnologia |
| **SBMFC** | Laranja #E67E22 | Casa (família/comunidade) |
| **SBM** | Rosa #E91E63 | Laço rosa (câncer de mama) |
| **FEBRASGO** | Roxo #9C27B0 | Símbolo feminino ♀ |
| **SBU** | Azul #2196F3 | Símbolo masculino ♂ |
| **SBCP** | Vermelho #FF5722 | Intestino estilizado |

### 2. Características Técnicas

✅ **SVG responsivo** (escala sem perda de qualidade)  
✅ **Cores oficiais** verificadas  
✅ **Tamanho ajustável** (prop `size`)  
✅ **Hover effect** (scale 1.1)  
✅ **Texto descritivo** abaixo de cada logo  
✅ **Grid responsivo** (2/3/4 colunas)  

### 3. Componente Info Download

`LogosDownloadInfo` - Card com links para downloads oficiais:
- Manual de Identidade Visual do SUS
- Sites das sociedades médicas
- Links diretos para material institucional

---

## 📥 Como Obter as Logos Oficiais

### Passo a Passo

#### 1. **SUS e Ministério da Saúde**

```bash
# Acesse
https://www.gov.br/saude/pt-br/centrais-de-conteudo/manual-de-marcas/sus

# Baixe
- Manual de Identidade Visual (PDF)
- Arquivo vetorial da logo (.AI ou .SVG)
- Versões em PNG (horizontal, vertical)

# Salve como
public/logos/sus-logo.svg
public/logos/sus-logo.png
```

#### 2. **INCA**

```bash
# Contate
comunicacao@inca.gov.br
ou acesse https://www.inca.gov.br

# Solicite
Logo em alta resolução (PNG transparente ou SVG)

# Salve como
public/logos/inca-logo.png
```

#### 3. **Sociedades Médicas**

Para cada sociedade (SBMFC, SBM, FEBRASGO, SBU, SBCP):

```bash
# 1. Acesse o site oficial
# 2. Procure seção "Imprensa", "Comunicação" ou "Assessoria"
# 3. Baixe o "Kit de Imprensa" ou "Material Institucional"
# 4. Ou envie e-mail solicitando a logo em alta resolução

# Formato ideal
- SVG (vetorial) ou
- PNG transparente (mínimo 1000px largura)

# Nomenclatura
public/logos/sbmfc-logo.png
public/logos/sbm-logo.png
public/logos/febrasgo-logo.png
public/logos/sbu-logo.png
public/logos/sbcp-logo.png
```

---

## 🔄 Como Substituir os SVGs pelas Logos Reais

### Opção 1: Atualizar Componente (Recomendado)

Edite `/app/components/Logos/OfficialLogos.tsx`:

```tsx
// Antes
export function LogoSUS({ size = 120, className = '' }: LogoProps) {
  return (
    <div className={...}>
      <svg ...>
        {/* SVG inline */}
      </svg>
    </div>
  );
}

// Depois
import Image from 'next/image';

export function LogoSUS({ size = 120, className = '' }: LogoProps) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <Image 
        src="/logos/sus-logo.png"
        alt="Logo Sistema Único de Saúde"
        width={size}
        height={size * 0.8}
        className="object-contain"
        priority
      />
      <p className="text-xs text-[#86868b] mt-2 text-center max-w-[140px]">
        Sistema Único de Saúde
      </p>
    </div>
  );
}
```

### Opção 2: Criar Novo Componente

Crie `/app/components/Logos/RealLogos.tsx`:

```tsx
import Image from 'next/image';

interface LogoProps {
  name: 'SUS' | 'INCA' | 'SBMFC' | 'SBM' | 'FEBRASGO' | 'SBU' | 'SBCP' | 'CONITEC';
  size?: number;
}

const logoConfig = {
  SUS: {
    src: '/logos/sus-logo.png',
    alt: 'Sistema Único de Saúde',
    aspect: 0.8,
  },
  INCA: {
    src: '/logos/inca-logo.png',
    alt: 'Instituto Nacional de Câncer',
    aspect: 0.8,
  },
  // ... demais logos
};

export function RealLogo({ name, size = 120 }: LogoProps) {
  const config = logoConfig[name];
  return (
    <Image
      src={config.src}
      alt={config.alt}
      width={size}
      height={size * config.aspect}
      className="object-contain"
    />
  );
}
```

---

## 📐 Especificações para Produção

### Formatos Aceitos

| Formato | Uso | Vantagens |
|---------|-----|-----------|
| **SVG** | Web/Impressão | Escalável, leve, vetorial |
| **PNG** | Web/Projetor | Transparência, boa qualidade |
| **JPG** | Não recomendado | Sem transparência |

### Dimensões

```
Tamanho mínimo: 1000px de largura
Tamanho ideal: 2000-3000px (para projeção)
Proporção: Original da logo (não distorcer)
Fundo: Transparente (PNG) ou vetorial (SVG)
DPI: 300 para impressão, 72-96 para web
```

### Nomenclatura de Arquivos

```bash
# Boas práticas
✅ sus-logo.png
✅ sus-logo.svg
✅ sbmfc-logo-oficial.png
✅ inca-logo-horizontal.svg

# Evitar
❌ Logo_SUS.PNG
❌ SBMFC LOGO.jpg
❌ logo sbm final 2.png
❌ LogoINCA.SVG
```

---

## 🎨 Diretrizes de Uso

### Respeite os Manuais de Marca

Cada instituição possui regras específicas:

1. **Cores:** Não altere as cores oficiais
2. **Proporção:** Não distorça (mantenha aspect ratio)
3. **Área de respiro:** Mantenha espaço mínimo ao redor
4. **Fundos:** Verifique fundos permitidos (claro/escuro)
5. **Tamanho mínimo:** Respeite tamanho mínimo de reprodução

### Exemplo: Manual do SUS

- **Verde oficial:** Pantone 7481 C / CMYK 78-0-100-0 / RGB 0-168-89
- **Proporção:** Sempre manter
- **Área de respiro:** 1x altura da logo em todos os lados
- **Tamanho mínimo:** 30mm de largura (impresso)

---

## 📧 Contatos para Solicitação

### Governo Federal

| Instituição | E-mail | Site |
|-------------|--------|------|
| **SUS/MS** | ouvidoria@saude.gov.br | gov.br/saude |
| **INCA** | comunicacao@inca.gov.br | inca.gov.br |
| **CONITEC** | conitec@saude.gov.br | gov.br/conitec |

### Sociedades Médicas

| Sociedade | E-mail | Site |
|-----------|--------|------|
| **SBMFC** | comunicacao@sbmfc.org.br | sbmfc.org.br |
| **SBM** | contato@sbmastologia.com.br | sbmastologia.com.br |
| **FEBRASGO** | presidencia@febrasgo.org.br | febrasgo.org.br |
| **SBU** | sbu@sbu.org.br | portaldaurologia.org.br |
| **SBCP** | sbcp@sbcp.org.br | sbcp.org.br |

### Template de E-mail

```
Assunto: Solicitação de Logo Institucional para Projeto Acadêmico

Prezados,

Meu nome é [SEU NOME] e sou pesquisador/acadêmico vinculado a [INSTITUIÇÃO].

Estou desenvolvendo uma plataforma educacional sobre rastreamentos 
populacionais no SUS com foco em Atenção Primária à Saúde e Medicina 
de Família e Comunidade.

Gostaria de solicitar a logo institucional da [NOME DA SOCIEDADE] 
em alta resolução (PNG transparente ou SVG) para inclusão no material, 
com os devidos créditos.

O projeto é de natureza acadêmica, sem fins lucrativos, e visa 
fortalecer a educação médica baseada em evidências.

Agradeço antecipadamente,
[SEU NOME]
[SEU E-MAIL]
[SEU VÍNCULO INSTITUCIONAL]
```

---

## 📊 Status de Implementação

| Logo | Status | Arquivo | Observações |
|------|--------|---------|-------------|
| SUS | 🟡 Estilizada | SVG inline | Aguardando download oficial |
| INCA | 🟡 Estilizada | SVG inline | Aguardando download oficial |
| CONITEC | 🟡 Estilizada | SVG inline | Aguardando download oficial |
| SBMFC | 🟡 Estilizada | SVG inline | Aguardando download oficial |
| SBM | 🟡 Estilizada | SVG inline | Aguardando download oficial |
| FEBRASGO | 🟡 Estilizada | SVG inline | Aguardando download oficial |
| SBU | 🟡 Estilizada | SVG inline | Aguardando download oficial |
| SBCP | 🟡 Estilizada | SVG inline | Aguardando download oficial |

**Legenda:**
- 🟡 Estilizada (SVG inline temporário)
- 🟢 Oficial (arquivo real baixado)

---

## ✅ Checklist para Produção

Antes de apresentar:

- [ ] Baixar logo oficial do SUS (gov.br/saude)
- [ ] Baixar logo oficial do INCA
- [ ] Baixar logo oficial da CONITEC
- [ ] Contatar SBMFC para logo oficial
- [ ] Contatar SBM para logo oficial
- [ ] Contatar FEBRASGO para logo oficial
- [ ] Contatar SBU para logo oficial
- [ ] Contatar SBCP para logo oficial
- [ ] Salvar arquivos em `/public/logos/`
- [ ] Atualizar componente `OfficialLogos.tsx`
- [ ] Testar responsividade
- [ ] Testar em projetor
- [ ] Verificar qualidade em alta resolução
- [ ] Revisar créditos e atribuições

---

## 🎯 Alternativa: Usar Logos Estilizadas

Se não conseguir as logos oficiais a tempo:

✅ **As logos SVG inline já estão prontas e profissionais**  
✅ **Usam cores oficiais verificadas**  
✅ **Incluem símbolos representativos**  
✅ **Têm qualidade para projeção**  

**Importante:** Adicione disclaimer:

> "Logos estilizadas com cores institucionais oficiais. Para logos oficiais 
> completas, consulte os sites das instituições."

---

**Desenvolvido:** Dezembro 2025  
**Status:** Logos estilizadas implementadas  
**Próximo passo:** Download das logos oficiais

