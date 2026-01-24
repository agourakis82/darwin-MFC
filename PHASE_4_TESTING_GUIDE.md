# Phase 4: Testing & Quality Assurance Guide

## 🧪 Testing Strategy

### 1. Accessibility Testing

**Tools**
- Axe DevTools (Chrome extension)
- WAVE (web.accessibility.com)
- NVDA (screen reader - free)
- Manual keyboard navigation

**Checklist**
- [ ] Tab through entire app
- [ ] All buttons keyboard accessible
- [ ] Focus indicators visible
- [ ] Screen reader announces content
- [ ] Color contrast verified (7:1)
- [ ] Forms labeled properly

**Command**
```bash
npm run test:a11y
```

### 2. Performance Testing

**Lighthouse**
```bash
# Run Lighthouse audit
npm run lighthouse

# Target scores:
# Performance: 95+
# Accessibility: 100
# Best Practices: 95+
# SEO: 100
```

**Core Web Vitals**
- FCP: < 1.5s
- LCP: < 2.5s
- CLS: < 0.1
- TTI: < 3.5s

**Tools**
- Chrome DevTools Performance tab
- Lighthouse CI
- WebPageTest.org

### 3. PWA Testing

**Desktop Testing**
- [ ] Service worker registers
- [ ] Install prompt appears
- [ ] App works offline
- [ ] Cache strategy functions

**Mobile Testing**
```bash
# Test on real device
# Open app on mobile
# Install to home screen
# Test offline functionality
```

**Commands**
```bash
# Build PWA
npm run build

# Test locally
npm run dev

# Test service worker
# Open DevTools > Application tab
# Check Service Workers section
```

### 4. Cross-browser Testing

**Browsers to Test**
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (iOS & macOS)
- [ ] Mobile browsers

**Test Cases**
- [ ] Page loads correctly
- [ ] Responsive design works
- [ ] Interactive elements function
- [ ] No console errors

### 5. Mobile Testing

**Devices**
- [ ] iOS 14+ (iPhone/iPad)
- [ ] Android 11+ (various devices)
- [ ] Tablets (iPad/Samsung)

**Aspects**
- [ ] Touch targets (44x44px minimum)
- [ ] Text readability
- [ ] Landscape/portrait
- [ ] Notch support
- [ ] PWA installation

---

## ✅ Pre-Deployment Checklist

### Code Quality
- [ ] TypeScript no errors
- [ ] Linting passed
- [ ] Tests passing
- [ ] Build successful

### Performance
- [ ] Lighthouse 95+
- [ ] Bundle < 100KB gzip
- [ ] No critical resources blocking
- [ ] Images optimized

### Accessibility
- [ ] WCAG 2.2 AAA
- [ ] Keyboard navigation
- [ ] Screen reader tested
- [ ] Color contrast verified

### Security
- [ ] Security headers set
- [ ] No sensitive data exposed
- [ ] HTTPS configured
- [ ] Input validation working

### PWA
- [ ] Service worker active
- [ ] Manifest valid
- [ ] Offline fallback working
- [ ] Install prompt functional

### Cross-browser
- [ ] Chrome/Edge working
- [ ] Firefox working
- [ ] Safari working
- [ ] Mobile browsers working

---

## 🔍 Common Issues & Fixes

### Service Worker Not Registering
```javascript
// Check browser console
// Ensure /service-worker.js exists
// Clear cache: DevTools > Application > Clear storage
```

### Offline Page Not Showing
```javascript
// Verify offline.tsx exists
// Check SW fetch event logic
// Test with DevTools > Network > Offline
```

### Performance Score Low
```bash
# Run: npm run lighthouse
# Check for:
# - Large JavaScript bundles
# - Unoptimized images
# - Render-blocking resources
# - Unused CSS
```

### Accessibility Issues
```bash
# Run: npm run test:a11y
# Common issues:
# - Missing alt text
# - Low color contrast
# - Missing labels
# - Keyboard traps
```

---

## 📊 Test Results Template

```markdown
# Phase 4 Test Results

## Date: [Date]
## Tester: [Name]

### Accessibility
- Score: 100/100 ✅
- Issues: None

### Performance
- Lighthouse: 95+ ✅
- FCP: 1.2s ✅
- LCP: 2.0s ✅
- CLS: 0.08 ✅

### PWA
- SW Registered: ✅
- Offline Working: ✅
- Install Prompt: ✅

### Cross-browser
- Chrome: ✅
- Firefox: ✅
- Safari: ✅
- Mobile: ✅

### Overall: ✅ PASS
```

---

**Created**: 2026-01-19  
**Status**: Phase 4 Active
