# Responsive Testing Guide - Darwin-MFC Container System

**Date**: 2026-01-23
**Purpose**: Validate new PageContainer and ContentContainer system works correctly at all breakpoints
**Duration**: 15-20 minutes per page
**Pages to Test**: All 7 migrated pages (Batch 1)

---

## 🎯 Testing Objectives

Verify that pages:
1. **Display correctly** at 4 responsive breakpoints (mobile/tablet/desktop/ultrawide)
2. **Respect max-width constraints** (PageContainer: max-w-7xl, ContentContainer: max-w-5xl)
3. **Have correct padding** (px-4 mobile → px-6 tablet → px-8 desktop → px-12 ultrawide)
4. **Have no horizontal scrolling** at any breakpoint
5. **Maintain content alignment** (centered, not stretched to edges)
6. **Preserve Framer Motion animations** (fade-in, scroll triggers)
7. **Handle dark mode** correctly at all breakpoints

---

## 📱 Breakpoint Reference

| Device | Width | Padding | Max-Width | Sidebar |
|--------|-------|---------|-----------|---------|
| **Mobile** | 375px | px-4 (16px) | Full - 32px | Hidden |
| **Tablet** | 768px | px-6 (24px) | Full - 48px | Hidden |
| **Desktop** | 1024px | px-8 (32px) | 896px (max-w-7xl) | Visible |
| **Ultrawide** | 1536px | px-12 (48px) | 896px (max-w-7xl, centered) | Visible |

---

## 🚀 Quick Start

### 1. Start Development Server
```bash
npm run dev
```
Wait for "ready - started server on localhost:3000"

### 2. Test Each Page
Use the following URL pattern:
```
http://localhost:3000/pt/{page-path}
```

Example pages:
- http://localhost:3000/pt/doencas
- http://localhost:3000/pt/medicamentos
- http://localhost:3000/pt/cancer
- http://localhost:3000/pt/protocolos
- http://localhost:3000/pt/calculadoras
- http://localhost:3000/pt/learn
- http://localhost:3000/pt/about

### 3. Open DevTools
- Press `F12` or `Cmd+Option+I` (Mac)
- Go to **Device Emulation** tab
- Or: Right-click → "Inspect Element"

---

## 🔍 Testing Procedure

### For Each Breakpoint:

#### **MOBILE (375px)**
```
DevTools: Toggle device toolbar (Cmd+Shift+M)
Or: Dimension: 375×667 (iPhone SE)
```

**Checklist**:
- [ ] No horizontal scroll (even when zoomed)
- [ ] Hero section text readable (20px+ for headings)
- [ ] Stats cards stack vertically (1 column)
- [ ] Quick access buttons stack vertically
- [ ] Sidebar completely hidden
- [ ] Menu hamburger visible (if exists)
- [ ] Padding is even on left/right (px-4 = 16px)
- [ ] Images scale down properly (no overflow)
- [ ] Buttons have min-height 44px (touch-friendly)
- [ ] Text is readable (min 12px font)

**Actions to Test**:
1. Scroll down entire page - should be smooth, no jumps
2. Click all interactive elements (buttons, links)
3. Check dark mode toggle works
4. Toggle content mode (if applicable)

---

#### **TABLET (768px)**
```
DevTools: Dimension: 768×1024 (iPad)
```

**Checklist**:
- [ ] No horizontal scroll
- [ ] Content respects max-width (centered on wider tablets)
- [ ] Stats grid shows 2 columns
- [ ] Cards show 2 per row
- [ ] Padding is px-6 (24px on sides)
- [ ] Sidebar still hidden (breakpoint is md, visible at lg)
- [ ] Breadcrumbs visible (if applicable)
- [ ] Text increases slightly (more breathing room)
- [ ] Buttons larger and easier to tap
- [ ] All images properly scaled

**Actions to Test**:
1. Scroll through all sections
2. Check that content doesn't stretch to edges
3. Verify spacing between elements increased
4. Test responsive images (should be sharp, not blurry)

---

#### **DESKTOP (1024px+)**
```
DevTools: Dimension: 1024×768 (or responsive + 1024)
Or: Full browser window on desktop
```

**Checklist**:
- [ ] No horizontal scroll
- [ ] Content respects max-w-7xl constraint (896px)
- [ ] Content centered with equal margins on sides
- [ ] Sidebar visible on left (240px, collapsible)
- [ ] Header visible and functional
- [ ] Cards show 3+ per row
- [ ] Padding is px-8 (32px on sides)
- [ ] Focus ring visible on keyboard navigation
- [ ] Hover states working (shadow, color change)
- [ ] Animations trigger on scroll (Framer Motion)

**Actions to Test**:
1. Tab through all focusable elements
2. Hover over interactive elements (check hover state)
3. Click links and buttons
4. Scroll to trigger animations
5. Resize window gradually - no jump at breakpoint

---

#### **ULTRAWIDE (1536px+)**
```
DevTools: Dimension: 1920×1080 (4K monitor)
Or: Full browser on ultrawide monitor
```

**Checklist**:
- [ ] No horizontal scroll
- [ ] Content respects max-w-7xl (896px max)
- [ ] Content properly centered with large equal margins
- [ ] Not stretched across screen
- [ ] Padding is px-12 (48px on sides)
- [ ] Sidebar visible and functional
- [ ] All elements readable from distance
- [ ] No awkward spacing gaps
- [ ] Images maintain aspect ratio

**Actions to Test**:
1. Check that content stays centered
2. Verify sidebars not excessively wide
3. Confirm padding scaled appropriately
4. Test that no content extends edge-to-edge

---

## 📐 Container System Validation

For each page, validate:

### PageContainer (max-w-7xl)
Used on: Doencas, Medicamentos, Cancer, Protocolos, Learn, Calculadoras

**Validation**:
```
At desktop (1024px):
- Container width should be ~896px (100% - 2×32px padding)
- Left/right margins ~64px from viewport edge

At ultrawide (1536px):
- Container width should still be ~896px max
- Left/right margins ~320px from viewport edge (centered)
```

### ContentContainer (max-w-5xl)
Used on: Cancer (critical analysis section)

**Validation**:
```
At desktop (1024px):
- Container width should be ~640px (100% - 2×32px padding)
- Left/right margins ~192px from viewport edge

At ultrawide (1536px):
- Container width should still be ~640px max
- Left/right margins ~448px from viewport edge (centered)
```

---

## 🎨 Dark Mode Testing

For each page, test in both light and dark modes:

**Light Mode**:
- [ ] Text readable (not too dark on bright background)
- [ ] Cards have proper shadow
- [ ] Images visible and sharp
- [ ] Icons properly colored

**Dark Mode**:
- [ ] Background is true dark (dark:bg-carbon-900 or similar)
- [ ] Text readable (white/light gray on dark)
- [ ] Cards visible (border or subtle shadow)
- [ ] Images visible (not too dark)
- [ ] Icons properly colored for dark mode

**Toggle**: Click theme toggle in Header (top-right)

---

## ✨ Animation Testing

Verify Framer Motion animations work:

**Fade-in Animations**:
- [ ] Page title fades in on load
- [ ] Stats cards fade in sequentially
- [ ] Content sections fade in on scroll
- [ ] No jarring jumps or flashing

**Scroll Triggers**:
- [ ] Cards animate when scrolled into view
- [ ] Section headings animate smoothly
- [ ] Stagger timing correct (not all at once)
- [ ] Smooth easing (ease-out preferred)

**Test Action**:
1. Reload page (Cmd+R or Ctrl+Shift+R for hard refresh)
2. Watch for fade-in animations
3. Scroll down slowly, observe card animations
4. Fast scroll - animations should still look smooth

---

## 🖱️ Interaction Testing

For each page, test:

**Keyboard Navigation**:
- [ ] Tab moves through elements logically (top→bottom, left→right)
- [ ] Shift+Tab moves backward
- [ ] Enter/Space activates buttons
- [ ] Escape closes any modals
- [ ] Focus ring visible on all focusable elements

**Mouse Interactions**:
- [ ] All links work (navigate to correct page)
- [ ] Buttons have click feedback (visual change)
- [ ] Hover states visible (color/shadow change)
- [ ] Buttons clickable on touch (44px+ height)

**Mobile Gestures**:
- [ ] Swipe to scroll works smoothly
- [ ] Tap buttons without accidental scrolls
- [ ] Pinch-to-zoom works (if needed for readability)

---

## 🐛 Common Issues to Check

| Issue | Location | How to Test |
|-------|----------|------------|
| Horizontal scrolling | All pages at mobile | Scroll right - should not scroll |
| Text overflow | Mobile cards | Long titles should wrap, not overflow |
| Image stretching | All pages | Images should maintain aspect ratio |
| Padding inconsistency | Between breakpoints | Measure padding (DevTools Inspect) |
| Dark mode text | Dark mode on dark backgrounds | Toggle dark mode, ensure readable |
| Animation jank | Scroll animations | Scroll and watch for stuttering |
| Focus ring missing | Keyboard navigation | Tab through - focus should be visible |
| Button sizes | Mobile | Should be 44px+ for touch |
| Modal overlay | If applicable | Should be full viewport, centered |

---

## 📋 Testing Checklist - All 7 Pages

### Page 1: Doencas (Diseases)
**URL**: http://localhost:3000/pt/doencas

- [ ] Mobile (375px): No scroll, readable text, cards stack
- [ ] Tablet (768px): 2 columns visible, proper padding
- [ ] Desktop (1024px): 3 columns, content centered
- [ ] Ultrawide (1536px): Content still centered, not stretched
- [ ] Dark mode: All text readable
- [ ] Animations: Cards fade in on scroll
- [ ] Interactions: Search works, filtering works

**Notes**:
- Check disease registry table responsive
- Verify filtering pills reflow at mobile
- Test search field on small screens

---

### Page 2: Medicamentos (Medications)
**URL**: http://localhost:3000/pt/medicamentos

- [ ] Mobile (375px): List view works, scrollable vertically
- [ ] Tablet (768px): 2 columns, therapeutic class filtering visible
- [ ] Desktop (1024px): 3 columns, RENAME badges visible
- [ ] Ultrawide (1536px): Cards stay max-w, centered
- [ ] Dark mode: All readable, RENAME badges stand out
- [ ] Animations: Cards animate on scroll
- [ ] Interactions: Category filter works, search works

**Notes**:
- Check therapeutic class pills reflow
- Verify RENAME badge visibility on small screens
- Test medication count display

---

### Page 3: Cancer (Cancer Screening)
**URL**: http://localhost:3000/pt/cancer

- [ ] Mobile (375px): Hero section readable, no horizontal scroll
- [ ] Tablet (768px): Hero with stats visible, cards stack
- [ ] Desktop (1024px): Full layout, ContentContainer (max-w-5xl) enforced
- [ ] Ultrawide (1536px): Content centered, max-w-5xl maintained
- [ ] Dark mode: Cancer red (#EF4444) visible on dark background
- [ ] Content mode: Toggle between Descriptive/Critical Analysis works
- [ ] Animations: Infographics fade in on scroll

**Notes**:
- Cancer page uses ContentContainer (narrower: max-w-5xl)
- Check that dual-mode content switch is smooth
- Verify infographics responsive
- Test comparison cards layout

---

### Page 4: Protocolos (Protocols/Flowcharts)
**URL**: http://localhost:3000/pt/protocolos

- [ ] Mobile (375px): Search field full width, category pills reflow
- [ ] Tablet (768px): 2 protocol cards per row, filters visible
- [ ] Desktop (1024px): 3 cards per row, sidebar visible
- [ ] Ultrawide (1536px): Cards stay 3 per row, centered
- [ ] Dark mode: Category badges visible and colored
- [ ] Interactions: Category filter works, search works
- [ ] Navigation: Links to flowchart pages work

**Notes**:
- Check category pill (color) visibility in dark mode
- Verify protocol card grid responsive
- Test search with multiple categories

---

### Page 5: Calculadoras (Calculators)
**URL**: http://localhost:3000/pt/calculadoras

- [ ] Mobile (375px): Calculator list scrollable, readable titles
- [ ] Tablet (768px): 2 columns visible, cards stacked properly
- [ ] Desktop (1024px): 3+ columns, calculator categories visible
- [ ] Ultrawide (1536px): Cards distributed evenly, centered
- [ ] Dark mode: All calculator icons visible and colored
- [ ] Animations: Cards fade in on scroll
- [ ] Navigation: Links to individual calculators work

**Notes**:
- Check calculator card sizes responsive
- Verify category badges visible
- Test calculator count display

---

### Page 6: Learn (Learning Paths)
**URL**: http://localhost:3000/pt/learn

- [ ] Mobile (375px): Hero gradient visible, stats stack, content readable
- [ ] Tablet (768px): Hero with 4 stat boxes, learning path cards 2-column
- [ ] Desktop (1024px): Full layout with sidebar, 3-column path cards
- [ ] Ultrawide (1536px): Path cards distributed, content centered
- [ ] Dark mode: Hero gradient visible, text readable
- [ ] Animations: Stats fade in on load, cards animate on scroll
- [ ] Interactions: "Continue Learning" section visible if in progress

**Notes**:
- Check that hero section background gradient works at all sizes
- Verify stat boxes responsive (4 at desktop, 2 at mobile)
- Test path card layout at different breakpoints
- Check that learning progress section doesn't overflow

---

### Page 7: About (About Page)
**URL**: http://localhost:3000/pt/about

- [ ] Mobile (375px): Content readable, author bio centered
- [ ] Tablet (768px): Author section properly spaced, contribute section visible
- [ ] Desktop (1024px): Content respects PageContainer max-w-7xl
- [ ] Ultrawide (1536px): Content centered, not stretched
- [ ] Dark mode: All text readable on dark background
- [ ] Interactions: Links in author section work
- [ ] Animations: Sections fade in smoothly

**Notes**:
- Check that about author component responsive
- Verify contribute section cards layout
- Test all links work correctly

---

## 📊 Results Template

For each page tested, use this template:

```markdown
## Page Name
**Date Tested**: [DATE]
**Tested By**: [NAME]

| Breakpoint | Status | Issues |
|-----------|--------|--------|
| Mobile (375px) | ✅ PASS / ⚠️ ISSUES | [List any issues] |
| Tablet (768px) | ✅ PASS / ⚠️ ISSUES | [List any issues] |
| Desktop (1024px) | ✅ PASS / ⚠️ ISSUES | [List any issues] |
| Ultrawide (1536px) | ✅ PASS / ⚠️ ISSUES | [List any issues] |
| Dark Mode | ✅ PASS / ⚠️ ISSUES | [List any issues] |
| Animations | ✅ PASS / ⚠️ ISSUES | [List any issues] |

**Overall Status**: ✅ READY / 🟡 MINOR ISSUES / ❌ BLOCKING ISSUES

**Notes**:
- [Any observations, improvements, or concerns]
```

---

## 🔧 DevTools Tips

### Measure Padding/Margins
1. Inspect element (right-click → Inspect)
2. Look at "Box Model" in Elements panel
3. Compare padding values to expected (px-4, px-6, px-8, px-12)

### Check Container Width
1. Inspect page container div
2. Look at computed `max-width` in Styles panel
3. Expected: PageContainer should show `max-width: 896px` (max-w-7xl)
4. Expected: ContentContainer should show `max-width: 640px` (max-w-5xl)

### Test Touch Simulation
1. In DevTools, click "Toggle Device Toolbar"
2. Click "Sensor" tab
3. Simulate different touch gestures

### Performance Check
1. Open DevTools → "Lighthouse" tab
2. Run audit for each breakpoint
3. Should maintain 90+ scores for Performance/Accessibility

---

## ✅ Success Criteria

All 7 pages pass when:

- ✅ **No horizontal scrolling** at any breakpoint
- ✅ **Padding correct** at each breakpoint (px-4 → px-6 → px-8 → px-12)
- ✅ **Content centered** with proper max-width (not stretched)
- ✅ **Dark mode readable** (text and icons visible)
- ✅ **Animations smooth** (no jank or jumping)
- ✅ **Touch-friendly buttons** (44px+ on mobile)
- ✅ **Keyboard navigation** working (Tab/Shift+Tab)
- ✅ **Images responsive** (proper aspect ratio, not stretched)
- ✅ **All interactive elements** functional (links, buttons, filters)

---

## 🚀 Next Steps After Testing

If all checks pass:
1. Mark page as ✅ TESTED
2. Run type check: `npm run type-check`
3. Run build: `npm run build`
4. Commit changes: `git add . && git commit -m "test: responsive testing completed for Batch 1"`

If issues found:
1. Document issue location and description
2. Create GitHub issue or comment in PR
3. Fix issue
4. Re-test affected pages
5. Repeat until all checks pass

---

## 📞 Quick Reference

**Start dev server**: `npm run dev`
**Type check**: `npm run type-check`
**Build**: `npm run build`
**DevTools shortcut**: `F12` or `Cmd+Option+I` (Mac)
**Device emulation**: `Cmd+Shift+M` or toggle in DevTools
**Hard refresh**: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
**Inspect element**: Right-click → "Inspect" or `Cmd+Option+U` (Mac)

---

**Happy testing! 🎉**

If you encounter any issues, check the CLAUDE.md file for component documentation or create a GitHub issue.
