# Darwin MFC - Performance Optimization Guide (Phase 4)

## 🚀 Performance Targets (Core Web Vitals)

| Metric | Target | Status |
|--------|--------|--------|
| **First Contentful Paint (FCP)** | < 1.5s | 🎯 |
| **Largest Contentful Paint (LCP)** | < 2.5s | 🎯 |
| **Cumulative Layout Shift (CLS)** | < 0.1 | 🎯 |
| **Time to Interactive (TTI)** | < 3.5s | 🎯 |
| **Bundle Size** | < 100KB gzip | 🎯 |
| **Lighthouse Score** | 95+ | 🎯 |

---

## 📋 Core Web Vitals Explained

### 1. First Contentful Paint (FCP)
- When first content appears on screen
- **Target**: < 1.5s
- **How to improve**:
  - Minimize critical CSS
  - Defer non-critical JavaScript
  - Optimize font loading

### 2. Largest Contentful Paint (LCP)
- When largest element finishes rendering
- **Target**: < 2.5s
- **How to improve**:
  - Optimize images
  - Remove render-blocking resources
  - Use lazy loading
  - Enable resource hints (preload, prefetch)

### 3. Cumulative Layout Shift (CLS)
- Measure of visual stability
- **Target**: < 0.1
- **How to improve**:
  - Size media with aspect ratios
  - Avoid inserting content above existing content
  - Use transform animations instead of position changes

---

## 🔧 Implementation Checklist

### Asset Optimization
- [ ] All images compressed (WebP format)
- [ ] Lazy loading on off-screen images
- [ ] Responsive images with srcset
- [ ] Icons as inline SVG or sprite sheet

### JavaScript Optimization
- [ ] Code splitting by route
- [ ] Dynamic imports for heavy components
- [ ] Remove development-only code
- [ ] Tree-shaking enabled

### CSS Optimization
- [ ] Tailwind CSS purging configured
- [ ] Critical CSS inlined
- [ ] Font subsetting
- [ ] CSS-in-JS optimized

### Service Worker
- [ ] SW registered and functional
- [ ] Caching strategies implemented
- [ ] Offline fallback page working

---

**Implementation Status**: Phase 4 Active  
**Last Updated**: 2026-01-19
