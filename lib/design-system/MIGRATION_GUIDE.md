# Design System Migration Guide

**Darwin-MFC Design System v1.0**

This guide helps you migrate existing components to the new Darwin Design System (DDS). The system provides a comprehensive set of primitives, components, animations, and PWA features.

## Table of Contents

1. [Overview](#overview)
2. [Breaking Changes](#breaking-changes)
3. [Migration Steps](#migration-steps)
4. [Component Mapping](#component-mapping)
5. [Styling Migration](#styling-migration)
6. [Animation Migration](#animation-migration)
7. [PWA Migration](#pwa-migration)
8. [Testing Strategy](#testing-strategy)
9. [Troubleshooting](#troubleshooting)

---

## Overview

### What's New

**Design System Primitives** (Phase 1-2)
- Button, Card, Input, Select, Checkbox, Radio, Switch
- Avatar, Badge, Tooltip, Progress, Tabs, Accordion
- Alert, Dialog, Popover, Command Palette
- Consistent API with CVA variants

**Advanced Components** (Phase 3-4)
- Data Table with sorting, filtering, pagination
- Charts (Line, Bar, Pie, Area, Radar)
- Forms with validation (React Hook Form + Zod)
- Family tools (Genograma, Ecomapa)

**Animations** (Phase 5)
- 11 animation modules (~4,500 lines)
- Framer Motion presets, gestures, feedback
- Accessibility-first (reduced motion support)

**Clinical Decision Support** (Phase 6)
- Calculators framework
- Drug interaction checker
- Evidence indicators (GRADE, USPSTF, Oxford)
- Decision trees

**PWA & Mobile** (Phase 7)
- Service worker with caching
- Offline support
- Push notifications
- Mobile-optimized navigation
- Touch gestures

### Design Principles

1. **Accessibility First**: WCAG 2.1 AA compliance
2. **Mobile First**: Responsive, touch-friendly
3. **Performance**: Lazy loading, code splitting
4. **Privacy**: 100% local storage, no tracking
5. **Consistency**: Unified API across components

---

## Breaking Changes

### Component API Changes

#### Before (Old Buttons)
```tsx
// Old custom button
<button className="btn btn-primary">Click me</button>
```

#### After (New Button)
```tsx
import { Button } from '@/lib/design-system/primitives/button';

<Button variant="primary" size="md">Click me</Button>
```

### Styling Changes

#### Before (Custom Tailwind)
```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  Content
</div>
```

#### After (Card Primitive)
```tsx
import { Card } from '@/lib/design-system/primitives/card';

<Card className="bg-brand-primary-500 text-white">
  Content
</Card>
```

### Animation Changes

#### Before (Custom CSS animations)
```tsx
<div className="fade-in slide-up">
  Animated content
</div>
```

#### After (Framer Motion presets)
```tsx
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/design-system/animations/presets';

<motion.div {...fadeInUp}>
  Animated content
</motion.div>
```

---

## Migration Steps

### Step 1: Install Dependencies

Ensure all required dependencies are installed:

```bash
npm install framer-motion@12.23.26
npm install @use-gesture/react
npm install class-variance-authority
npm install zustand
npm install react-hook-form zod @hookform/resolvers
npm install recharts@3.6.0
npm install cmdk
```

### Step 2: Update Imports

#### Old Imports
```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

#### New Imports
```tsx
import { Button } from '@/lib/design-system/primitives/button';
import { Card } from '@/lib/design-system/primitives/card';
```

Or use the main export:
```tsx
import { Button, Card, Input } from '@/lib/design-system';
```

### Step 3: Update Component Props

Many components now use CVA for variants:

#### Old
```tsx
<Button primary large disabled>
  Submit
</Button>
```

#### New
```tsx
<Button variant="primary" size="lg" disabled>
  Submit
</Button>
```

### Step 4: Update Styling

Replace custom Tailwind classes with design tokens:

#### Old
```tsx
className="text-blue-600 bg-blue-100 hover:bg-blue-200"
```

#### New
```tsx
className="text-brand-primary-600 bg-brand-primary-100 hover:bg-brand-primary-200"
```

### Step 5: Update Animations

Replace custom animations with the animation system:

#### Old
```tsx
const [isOpen, setIsOpen] = useState(false);

<div className={`transition-all ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
  Content
</div>
```

#### New
```tsx
import { motion, AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

---

## Component Mapping

### Primitives

| Old Component | New Component | Import Path |
|--------------|---------------|-------------|
| `CustomButton` | `Button` | `@/lib/design-system/primitives/button` |
| `CustomCard` | `Card` | `@/lib/design-system/primitives/card` |
| `CustomInput` | `Input` | `@/lib/design-system/primitives/input` |
| `CustomSelect` | `Select` | `@/lib/design-system/primitives/select` |
| `CustomCheckbox` | `Checkbox` | `@/lib/design-system/primitives/checkbox` |
| `CustomRadio` | `Radio` | `@/lib/design-system/primitives/radio` |
| `CustomSwitch` | `Switch` | `@/lib/design-system/primitives/switch` |

### Components

| Old Component | New Component | Import Path |
|--------------|---------------|-------------|
| `CustomModal` | `Dialog` | `@/lib/design-system/components/dialog` |
| `CustomTooltip` | `Tooltip` | `@/lib/design-system/components/tooltip` |
| `CustomTabs` | `Tabs` | `@/lib/design-system/components/tabs` |
| `CustomAccordion` | `Accordion` | `@/lib/design-system/components/accordion` |
| `CustomAlert` | `Alert` | `@/lib/design-system/components/alert` |

### Data Components

| Old Component | New Component | Import Path |
|--------------|---------------|-------------|
| `CustomTable` | `DataTable` | `@/lib/design-system/components/data-table` |
| Custom charts | `LineChart`, `BarChart`, etc. | `@/lib/design-system/components/charts` |

---

## Styling Migration

### Color Tokens

Replace hardcoded colors with design tokens:

#### Old
```tsx
className="text-blue-600 bg-blue-100 border-blue-300"
```

#### New
```tsx
className="text-brand-primary-600 bg-brand-primary-100 border-brand-primary-300"
```

### Design Tokens Reference

```css
/* Primary Brand Colors */
--brand-primary-50: #eff6ff;
--brand-primary-100: #dbeafe;
--brand-primary-600: #2563eb;
--brand-primary-900: #1e3a8a;

/* Semantic Colors */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;

/* Neutral Colors */
--neutral-50: #f9fafb;
--neutral-900: #111827;
```

### Spacing

Use consistent spacing scale:

```tsx
// Old
className="p-3 m-4"

// New - follows 4px grid
className="p-3 m-4" // Same, but now part of design system
```

### Typography

Use typography tokens:

```tsx
// Old
className="text-2xl font-bold"

// New
className="text-heading-lg font-bold"
```

---

## Animation Migration

### Simple Animations

#### Old (CSS transitions)
```css
.fade-in {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fade-in.active {
  opacity: 1;
}
```

#### New (Framer Motion)
```tsx
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/design-system/animations/presets';

<motion.div {...fadeIn}>
  Content
</motion.div>
```

### Complex Animations

#### Old (Manual implementation)
```tsx
const [position, setPosition] = useState({ x: 0, y: 0 });

// Manual drag handling...
```

#### New (Gesture system)
```tsx
import { useDragGesture } from '@/lib/design-system/animations/gestures';

const bind = useDragGesture({
  onDrag: (offset) => console.log(offset),
});

<div {...bind()}>Draggable</div>
```

### Animation Presets

Available presets:

```tsx
import {
  fadeIn,
  fadeOut,
  fadeInUp,
  fadeInDown,
  scaleIn,
  scaleOut,
  slideInLeft,
  slideInRight,
  rotateIn,
  bounceIn,
} from '@/lib/design-system/animations/presets';
```

### Reduced Motion

The system automatically respects user preferences:

```tsx
import { useReducedMotion } from '@/lib/design-system/animations/config';

const reducedMotion = useReducedMotion();

<motion.div
  animate={{ opacity: 1 }}
  transition={{ duration: reducedMotion ? 0 : 0.3 }}
>
  Content
</motion.div>
```

---

## PWA Migration

### Service Worker Setup

#### Old (Manual service worker)
```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

#### New (Integrated PWA system)
```tsx
import { initializePWA } from '@/lib/pwa';

await initializePWA({
  enableNotifications: true,
  enableOfflineMode: true,
  showInstallPrompt: true,
});
```

### Offline Support

#### Old (Custom offline detection)
```tsx
const [isOffline, setIsOffline] = useState(!navigator.onLine);

useEffect(() => {
  const handleOnline = () => setIsOffline(false);
  const handleOffline = () => setIsOffline(true);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
}, []);
```

#### New (Built-in offline system)
```tsx
import { OfflineBanner, useNetworkStatus } from '@/lib/pwa';

const { isOnline, networkType } = useNetworkStatus();

<OfflineBanner />
```

### Mobile Navigation

#### Old (Custom bottom nav)
```tsx
const BottomNav = () => (
  <nav className="fixed bottom-0...">
    {/* Custom implementation */}
  </nav>
);
```

#### New (Built-in mobile nav)
```tsx
import { BottomNavBar, MobileHeader } from '@/lib/pwa';

<MobileLayout
  header={<MobileHeader title="Darwin-MFC" />}
  bottomNav={<BottomNavBar />}
>
  {children}
</MobileLayout>
```

---

## Testing Strategy

### Unit Testing

Test individual components:

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/lib/design-system/primitives/button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Testing

Test component interactions:

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from '@/lib/design-system/components/dialog';

describe('Dialog', () => {
  it('opens and closes', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>Content</DialogContent>
      </Dialog>
    );

    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Content')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close/i }));
    await waitFor(() => {
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });
  });
});
```

### Accessibility Testing

```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Button accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Performance Testing

```tsx
import { render } from '@testing-library/react';
import { DataTable } from '@/lib/design-system/components/data-table';

describe('DataTable performance', () => {
  it('renders large dataset efficiently', () => {
    const data = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
    }));

    const start = performance.now();
    render(<DataTable data={data} columns={columns} />);
    const end = performance.now();

    expect(end - start).toBeLessThan(100); // Should render in < 100ms
  });
});
```

---

## Troubleshooting

### Common Issues

#### Issue: "Module not found" errors

**Solution**: Ensure path aliases are configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

#### Issue: Animations not working

**Solution**: Check Framer Motion is installed and imported:

```bash
npm install framer-motion@12.23.26
```

#### Issue: Dark mode not applying

**Solution**: Ensure theme provider wraps your app:

```tsx
import { ThemeProvider } from '@/lib/design-system/components/theme-provider';

<ThemeProvider>
  <App />
</ThemeProvider>
```

#### Issue: Touch gestures not responding

**Solution**: Ensure touch-action CSS is set:

```css
.draggable {
  touch-action: none;
}
```

#### Issue: Service worker not registering

**Solution**: Check HTTPS requirement and scope:

```tsx
// Service workers require HTTPS (except localhost)
// Ensure scope is correct
await registerServiceWorker(); // Defaults to '/'
```

### Getting Help

- Check component documentation in Storybook
- Review examples in `lib/design-system/examples/`
- File issues on GitHub with reproduction steps

---

## Migration Checklist

Use this checklist to track your migration progress:

- [ ] Install all required dependencies
- [ ] Update tsconfig.json path aliases
- [ ] Migrate Button components
- [ ] Migrate Card components
- [ ] Migrate Form components (Input, Select, Checkbox, etc.)
- [ ] Migrate Dialog/Modal components
- [ ] Migrate Tooltip components
- [ ] Migrate Tabs/Accordion components
- [ ] Migrate Alert/Toast components
- [ ] Migrate Table components
- [ ] Migrate Chart components
- [ ] Update color tokens
- [ ] Update typography tokens
- [ ] Migrate CSS animations to Framer Motion
- [ ] Set up PWA infrastructure
- [ ] Implement offline support
- [ ] Add push notifications
- [ ] Implement mobile navigation
- [ ] Add touch gestures
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Run accessibility audit
- [ ] Run performance tests
- [ ] Update documentation
- [ ] Deploy and monitor

---

## Next Steps

After migration:

1. **Review**: Conduct code review of migrated components
2. **Test**: Run full test suite (unit, integration, e2e)
3. **Audit**: Perform accessibility and performance audits
4. **Document**: Update component documentation
5. **Monitor**: Track performance metrics post-deployment
6. **Iterate**: Gather feedback and refine

---

## Resources

- [Design System Documentation](./README.md)
- [Component API Reference](./API.md)
- [Animation Guide](./animations/README.md)
- [PWA Guide](../pwa/README.md)
- [Storybook](http://localhost:6006) (when running)
- [GitHub Issues](https://github.com/darwin-mfc/issues)

---

**Version**: 1.0.0
**Last Updated**: 2024-12-24
**Maintainer**: Darwin-MFC Team
