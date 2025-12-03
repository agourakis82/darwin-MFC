# Sistema de Design Apple - Rastreamentos SUS

## 🎨 Visão Geral

Este projeto implementa um sistema de design premium inspirado nas Human Interface Guidelines da Apple, com foco em:

- **Glassmorphism autêntico** com blur e saturação
- **Paleta de cores oficial da Apple**
- **Tipografia San Francisco** (-apple-system)
- **Animações suaves** com easing curves da Apple
- **Dark mode sem flash** com persistência
- **Backgrounds gradientes animados**

---

## 📐 Cores do Sistema

### Cores Apple (Light Mode)

```css
--color-apple-gray-1: #f5f5f7    /* Background principal */
--color-apple-gray-2: #e8e8ed    /* Background secundário */
--color-apple-gray-3: #d2d2d7    /* Borders, dividers */
--color-apple-gray-4: #b0b0b5    /* Borders hover */
--color-apple-gray-5: #86868b    /* Texto secundário */
--color-apple-gray-6: #6e6e73    /* Texto terciário */
```

### Cores Apple (Dark Mode)

```css
--color-apple-dark-1: #000000    /* Background principal */
--color-apple-dark-2: #0a0a0a    /* Background com gradiente */
--color-apple-dark-3: #161616    /* Background cards */
--color-apple-dark-4: #1d1d1f    /* Cards principais */
--color-apple-dark-5: #2c2c2e    /* Cards hover */
--color-apple-dark-6: #3a3a3c    /* Borders */
```

### Cores de Sistema

```css
--color-apple-blue: #007aff      /* Links, CTAs principais */
--color-apple-green: #34c759     /* Sucesso, convergência */
--color-apple-indigo: #5856d6    /* Variação roxa */
--color-apple-orange: #ff9500    /* Alertas importantes */
--color-apple-pink: #ff2d55      /* Destaque especial */
--color-apple-purple: #af52de    /* Análise crítica */
--color-apple-red: #ff3b30       /* Erros, divergências */
--color-apple-teal: #5ac8fa      /* Blue dark mode */
--color-apple-yellow: #ffcc00    /* Avisos */
```

---

## 🪟 Efeitos Glassmorphism

### Glass Padrão (`.glass`)

```css
background: rgba(255, 255, 255, 0.72);
backdrop-filter: saturate(180%) blur(20px);
border: 0.5px solid rgba(255, 255, 255, 0.6);
```

**Uso:** Cards, painéis, modais

### Glass Forte (`.glass-strong`)

```css
background: rgba(255, 255, 255, 0.85);
backdrop-filter: saturate(200%) blur(30px);
border: 0.5px solid rgba(255, 255, 255, 0.8);
```

**Uso:** Cabeçalhos, navegação, áreas críticas

### Glass Sutil (`.glass-subtle`)

```css
background: rgba(255, 255, 255, 0.5);
backdrop-filter: saturate(150%) blur(10px);
border: 0.5px solid rgba(255, 255, 255, 0.4);
```

**Uso:** Overlays, tooltips, elementos flutuantes

### Navbar Glass (`.navbar-glass`)

```css
background: rgba(255, 255, 255, 0.8);
backdrop-filter: saturate(180%) blur(20px);
border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
```

**Uso:** Header fixo, navegação

---

## 🎭 Animações

### Fade In Up

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Classe:** `.animate-fade-in-up`  
**Uso:** Hero sections, títulos principais

### Scale In

```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

**Classe:** `.animate-scale-in`  
**Uso:** Cards, modais, popups

### Transições Apple

```css
.apple-transition {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.apple-transition-fast {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Easing curve:** `cubic-bezier(0.4, 0, 0.2, 1)` (Apple standard)

---

## 🌈 Gradientes

### Gradientes Apple Premium

```css
/* Blue Gradient */
.gradient-apple-blue {
  background: linear-gradient(135deg, #007aff 0%, #5ac8fa 100%);
}

/* Purple Gradient */
.gradient-apple-purple {
  background: linear-gradient(135deg, #af52de 0%, #5856d6 100%);
}

/* Green Gradient */
.gradient-apple-green {
  background: linear-gradient(135deg, #34c759 0%, #30d158 100%);
}

/* Mesh Gradient (Background) */
.gradient-apple-mesh {
  background: 
    radial-gradient(at 0% 0%, rgba(0, 122, 255, 0.15) 0%, transparent 50%),
    radial-gradient(at 100% 0%, rgba(175, 82, 222, 0.15) 0%, transparent 50%),
    radial-gradient(at 100% 100%, rgba(52, 199, 89, 0.15) 0%, transparent 50%),
    radial-gradient(at 0% 100%, rgba(255, 149, 0, 0.15) 0%, transparent 50%);
}
```

---

## 📱 Tipografia

### Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, 
  "SF Pro Display", "SF Pro Text", 
  "Helvetica Neue", "Helvetica", "Arial", sans-serif;
```

### Heading Sizes

```css
h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; }
h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; }
h3 { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 600; }
```

### Body Text

```css
p {
  font-size: 1.0625rem;      /* 17px */
  line-height: 1.625;
  letter-spacing: -0.003em;  /* Apple tracking */
}
```

### Text Large (Hero)

```css
.text-large {
  font-size: 1.25rem;        /* 20px */
  line-height: 1.5;
  letter-spacing: -0.01em;
}
```

---

## 🔘 Botões

### Botão Principal (`.btn-apple`)

```css
padding: 0.625rem 1.25rem;
font-size: 1.0625rem;
font-weight: 500;
border-radius: 0.75rem;     /* 12px */
background: #007aff;
color: white;
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
```

**Hover:**
```css
background: #0051d5;
transform: scale(1.02);
box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
```

### Botão Secundário (`.btn-apple-secondary`)

```css
background: rgba(0, 122, 255, 0.1);
color: #007aff;
```

**Dark mode:**
```css
background: rgba(0, 122, 255, 0.15);
color: #5ac8fa;
```

---

## 🌓 Dark Mode

### Implementação

1. **Script inline no `<head>`** para evitar flash branco:

```javascript
(function() {
  var theme = localStorage.getItem('app-theme');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
})();
```

2. **ThemeProvider** com persistência no localStorage

3. **Background animado** com gradientes sutis

### Dark Mode - Body Background

```css
/* Light Mode */
body {
  background: #f5f5f7;
  color: #1d1d1f;
}

/* Dark Mode */
.dark body {
  background: #000000;
  color: #f5f5f7;
}
```

### Background Gradientes Animados

**Light Mode:**
```css
radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.3), transparent),
radial-gradient(ellipse 60% 50% at 0% 100%, rgba(255, 139, 139, 0.2), transparent),
radial-gradient(ellipse 60% 50% at 100% 100%, rgba(135, 206, 250, 0.2), transparent),
linear-gradient(to bottom, #f5f5f7 0%, #e8e8ed 100%);
```

**Dark Mode:**
```css
radial-gradient(ellipse 80% 50% at 50% -20%, rgba(48, 47, 163, 0.15), transparent),
radial-gradient(ellipse 60% 50% at 0% 100%, rgba(88, 86, 214, 0.1), transparent),
radial-gradient(ellipse 60% 50% at 100% 100%, rgba(52, 199, 89, 0.08), transparent),
linear-gradient(to bottom, #000000 0%, #0a0a0a 100%);
```

---

## 🎯 Cards Interativos

### Card Base (`.card-base`)

```css
background: rgba(255, 255, 255, 0.72);
backdrop-filter: saturate(180%) blur(20px);
border-radius: 1.25rem;      /* 20px */
border: 0.5px solid rgba(255, 255, 255, 0.6);
box-shadow: 
  0 1px 2px rgba(0, 0, 0, 0.04),
  0 2px 12px rgba(0, 0, 0, 0.06);
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
```

**Hover:**
```css
background: rgba(255, 255, 255, 0.85);
transform: translateY(-2px) scale(1.005);
box-shadow: 
  0 2px 4px rgba(0, 0, 0, 0.06),
  0 4px 20px rgba(0, 0, 0, 0.1);
```

---

## 📜 Scrollbar Apple

```css
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}
```

---

## ✨ Selection

```css
::selection {
  background: rgba(0, 122, 255, 0.3);
  color: inherit;
}

.dark ::selection {
  background: rgba(90, 200, 250, 0.3);
}
```

---

## 🔧 Uso Prático

### Exemplo: Card com Glass Effect

```tsx
<div className="card-base p-6">
  <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
    Título
  </h3>
  <p className="text-sm text-[#86868b] leading-relaxed">
    Descrição do card
  </p>
</div>
```

### Exemplo: Botão Apple

```tsx
<button className="btn-apple">
  Ação Principal
</button>

<button className="btn-apple-secondary">
  Ação Secundária
</button>
```

### Exemplo: Link de Navegação

```tsx
<Link
  href="/rota"
  className="px-3 py-1.5 text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] 
             hover:bg-black/5 dark:hover:bg-white/10 rounded-lg apple-transition-fast"
>
  Item Menu
</Link>
```

---

## 🎨 Referências

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [SF Pro Typography](https://developer.apple.com/fonts/)
- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [iOS Color System](https://developer.apple.com/design/human-interface-guidelines/color)

---

## 📝 Notas de Implementação

1. **Anti-aliasing:** `-webkit-font-smoothing: antialiased` ativo globalmente
2. **Borders:** Sempre 0.5px para efeito sutil da Apple
3. **Corners:** Border-radius entre 0.75rem (12px) e 1.25rem (20px)
4. **Shadows:** Múltiplas camadas sutis ao invés de uma sombra forte
5. **Hover states:** Scale sutil (1.02 - 1.005) + translateY mínimo
6. **Transitions:** Sempre com cubic-bezier(0.4, 0, 0.2, 1)
7. **Dark mode:** Background #000 puro, não cinza escuro
8. **Glassmorphism:** Saturação obrigatória (saturate(180%)) + blur

---

**Desenvolvido com rigor técnico Q1 • Dezembro 2025**

