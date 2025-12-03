# 📥 Logos Oficiais das Instituições

## Diretório para Logos em Alta Resolução

Coloque neste diretório as logos oficiais das instituições de saúde brasileiras em formato PNG ou SVG.

---

## 🏥 Onde Baixar as Logos Oficiais

### 1. Sistema Único de Saúde (SUS)

**Fonte Oficial:** Ministério da Saúde  
**Link:** https://www.gov.br/saude/pt-br/centrais-de-conteudo/manual-de-marcas/sus  
**Arquivo recomendado:** `sus-logo.png` ou `sus-logo.svg`  
**Formato:** PNG (transparente) ou SVG  
**Resolução mínima:** 1000px de largura

**Manual de Identidade Visual:** Inclui cores, tipografia e aplicações permitidas

---

### 2. Instituto Nacional de Câncer (INCA)

**Fonte Oficial:** INCA/Ministério da Saúde  
**Site:** https://www.inca.gov.br  
**Arquivo recomendado:** `inca-logo.png`  
**Contato:** Assessoria de Comunicação do INCA

---

### 3. CONITEC

**Fonte Oficial:** Ministério da Saúde  
**Link:** https://www.gov.br/conitec  
**Arquivo recomendado:** `conitec-logo.png`  
**Formato:** PNG ou SVG

---

### 4. Sociedade Brasileira de Medicina de Família e Comunidade (SBMFC)

**Site Oficial:** https://www.sbmfc.org.br  
**Contato:** comunicacao@sbmfc.org.br  
**Arquivo recomendado:** `sbmfc-logo.png`  
**Cores oficiais:** Laranja #E67E22 (verificar no site)

---

### 5. Sociedade Brasileira de Mastologia (SBM)

**Site Oficial:** https://sbmastologia.com.br  
**Arquivo recomendado:** `sbm-logo.png`  
**Cores oficiais:** Rosa/Pink #E91E63 (verificar no site)

---

### 6. FEBRASGO

**Site Oficial:** https://www.febrasgo.org.br  
**Arquivo recomendado:** `febrasgo-logo.png`  
**Seção:** Geralmente em "Imprensa" ou "Comunicação"

---

### 7. Sociedade Brasileira de Urologia (SBU)

**Site Oficial:** https://portaldaurologia.org.br  
**Arquivo recomendado:** `sbu-logo.png`  
**Cores oficiais:** Azul #2196F3 (verificar no site)

---

### 8. Sociedade Brasileira de Coloproctologia (SBCP)

**Site Oficial:** https://sbcp.org.br  
**Arquivo recomendado:** `sbcp-logo.png`  
**Seção:** Assessoria de imprensa ou materiais institucionais

---

## 📂 Estrutura de Arquivos Recomendada

```
public/logos/
├── README.md (este arquivo)
├── sus-logo.png
├── sus-logo.svg
├── inca-logo.png
├── conitec-logo.png
├── sbmfc-logo.png
├── sbm-logo.png
├── febrasgo-logo.png
├── sbu-logo.png
└── sbcp-logo.png
```

---

## 🎨 Especificações Técnicas

### Formato Preferencial
- **SVG:** Vetorial, escalável, ideal para web
- **PNG:** Fundo transparente, mínimo 1000px largura

### Resolução
- **Tela normal:** 2x (Retina)
- **Projetor:** Alta resolução (>1000px)
- **Impressão:** 300 DPI mínimo

### Nomes de Arquivos
Use kebab-case (minúsculas com hífen):
- ✅ `sus-logo.png`
- ✅ `sbmfc-logo-oficial.svg`
- ❌ `SUS_LOGO.png`
- ❌ `Logo SBMFC.png`

---

## ⚖️ Diretrizes de Uso

### Respeite as Identidades Visuais

1. **Não modifique** as cores oficiais
2. **Não distorça** as proporções
3. **Mantenha** área de respiro mínima
4. **Consulte** os manuais de marca quando disponíveis

### Permissões

- **SUS/MS/INCA/CONITEC:** Uso permitido em contexto educacional/acadêmico
- **Sociedades Médicas:** Verificar política de uso no site
- **Em caso de dúvida:** Contatar assessoria de comunicação

---

## 🔄 Como Atualizar no Código

Após baixar as logos, substitua os SVGs inline no componente:

### Exemplo:

```tsx
// Antes (SVG inline)
<LogoSUS size={120} />

// Depois (imagem real)
<Image 
  src="/logos/sus-logo.png" 
  alt="Logo SUS" 
  width={120} 
  height={96}
  className="object-contain"
/>
```

Ou atualize o componente `OfficialLogos.tsx` para usar as imagens reais.

---

## 📞 Contatos para Solicitação

| Instituição | Contato | E-mail/Site |
|-------------|---------|-------------|
| **SUS/MS** | Assessoria de Comunicação | https://www.gov.br/saude |
| **INCA** | Comunicação INCA | comunicacao@inca.gov.br |
| **SBMFC** | Comunicação SBMFC | comunicacao@sbmfc.org.br |
| **SBM** | Assessoria SBM | Site oficial |
| **FEBRASGO** | Imprensa FEBRASGO | Site oficial |
| **SBU** | Comunicação SBU | Site oficial |
| **SBCP** | Assessoria SBCP | Site oficial |

---

## 📝 Observações Importantes

1. **Logos estilizadas temporárias:** Atualmente o sistema usa SVGs inline estilizados
2. **Para produção:** Substitua pelas logos oficiais em alta resolução
3. **Créditos:** Sempre credite as instituições quando usar as logos
4. **Atualização:** Verifique periodicamente se as logos foram atualizadas

---

**Última atualização:** Dezembro 2025  
**Responsável:** Equipe Darwin-MFC

