# Darwin Design System - Troubleshooting Guide

**Version 1.0.0** | **Complete Problem Resolution Database**

This guide provides solutions to common issues, error messages, and debugging strategies for the Darwin Design System.

---

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [Build & Compilation Errors](#build--compilation-errors)
3. [Component Issues](#component-issues)
4. [Animation Problems](#animation-problems)
5. [PWA Issues](#pwa-issues)
6. [Performance Problems](#performance-problems)
7. [Accessibility Issues](#accessibility-issues)
8. [TypeScript Errors](#typescript-errors)
9. [Testing Issues](#testing-issues)
10. [Mobile-Specific Problems](#mobile-specific-problems)

---

## Installation Issues

### Error: Cannot find module 'framer-motion'

**Problem**: Import error when using animation components.

```
Module not found: Can't resolve 'framer-motion'
```

**Solution**:
```bash
npm install framer-motion@12.23.26
```

**Root Cause**: Framer Motion is a peer dependency required by the animation system.

**Prevention**: Always install dependencies from package.json before building.

---

### Error: class-variance-authority not found

**Problem**: CVA utilities not available.

```
Error: Cannot find module 'class-variance-authority'
```

**Solution**:
```bash
npm install class-variance-authority
npm install clsx tailwind-merge
```

**Why it happens**: CVA is used for component variants and must be installed separately.

---

### Peer Dependency Conflicts

**Problem**: npm install shows peer dependency warnings.

```
npm WARN ERESOLVE overriding peer dependency
```

**Solution**:
```bash
# Option 1: Use --legacy-peer-deps
npm install --legacy-peer-deps

# Option 2: Use --force (not recommended)
npm install --force

# Option 3: Upgrade to npm 7+
npm install -g npm@latest
```

**Best Practice**: Use --legacy-peer-deps for now, update dependencies in next major version.

---

## Build & Compilation Errors

### Error: TypeScript cannot find module '@/lib/design-system'

**Problem**: Path alias not configured.

```
Cannot find module '@/lib/design-system' or its corresponding type declarations
```

**Solution**: Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Verification**: Restart TypeScript server in your IDE.

---

### Error: CSS not loading in production

**Problem**: Tailwind classes not applied after build.

```
Elements render but have no styling
```

**Solution**: Update `tailwind.config.ts`:

```typescript
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of config
}
```

**Why it happens**: Tailwind needs to scan all files containing class names.

**Verification**: Run `npm run build` and check output CSS size.

---

### Error: Module build failed (Turbopack)

**Problem**: Turbopack compilation errors in development.

```
Error: Module build failed: unexpected token
```

**Solution**:
```bash
# Option 1: Disable Turbopack temporarily
npm run dev -- --no-turbo

# Option 2: Clear cache
rm -rf .next
npm run dev
```

**Root Cause**: Turbopack may not support some experimental features.

---

### Error: Hydration mismatch

**Problem**: Client/server render mismatch.

```
Warning: Text content did not match. Server: "..." Client: "..."
```

**Solution**: Ensure components are client-only if using browser APIs:

```tsx
'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    // Component JSX
  );
}
```

**Why it happens**: Server and client render different content initially.

---

## Component Issues

### Dialog not closing on Escape key

**Problem**: Dialog remains open when pressing Esc.

**Solution**: Ensure `onOpenChange` is properly connected:

```tsx
const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  {/* Dialog content */}
</Dialog>
```

**Common Mistake**: Forgetting to pass `onOpenChange` handler.

---

### Button onClick not firing

**Problem**: Button click events not working.

**Checklist**:
1. Check if button is disabled: `<Button disabled>`
2. Verify onClick handler exists: `<Button onClick={handleClick}>`
3. Check for event.preventDefault() in parent
4. Ensure button is not covered by overlay

**Solution Example**:
```tsx
<Button
  variant="primary"
  onClick={handleClick}
  disabled={loading}
>
  Submit
</Button>
```

---

### Input not updating value

**Problem**: Controlled input not responding to typing.

**Wrong**:
```tsx
<Input value={value} /> // Missing onChange
```

**Correct**:
```tsx
const [value, setValue] = useState('');

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

**Why**: Controlled inputs require both value and onChange.

---

### Select dropdown not opening

**Problem**: Select component not showing options.

**Solution**: Ensure proper component structure:

```tsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

**Common Issues**:
- Missing SelectContent
- Missing SelectTrigger
- Z-index conflicts (check parent overflow)

---

### DataTable not sorting

**Problem**: Clicking column headers doesn't sort.

**Solution**: Enable sorting prop and provide sortable columns:

```tsx
<DataTable
  data={data}
  columns={columns}
  sorting={true} // Enable sorting
/>

// Column definition
const columns = [
  {
    key: 'name',
    label: 'Name',
    sortable: true, // Enable for this column
  },
];
```

---

### Card not showing elevation

**Problem**: Card appears flat without shadow.

**Solution**: Use elevated variant:

```tsx
<Card variant="elevated" className="p-6">
  Content
</Card>
```

**Alternative**: Add custom shadow via className:
```tsx
<Card className="shadow-lg p-6">
  Content
</Card>
```

---

## Animation Problems

### Animations not running

**Problem**: Framer Motion animations not visible.

**Checklist**:
1. Verify framer-motion is installed
2. Check `motion` components are used: `<motion.div>`
3. Ensure animations aren't disabled by reduced motion

**Solution**:
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

**Reduced Motion Check**:
```tsx
import { useReducedMotion } from '@/lib/design-system/animations/config';

const prefersReducedMotion = useReducedMotion();
const duration = prefersReducedMotion ? 0 : 0.3;
```

---

### Gesture conflicts with scroll

**Problem**: Swipe gestures interfere with scrolling.

**Solution**: Configure gesture detection properly:

```tsx
import { useSwipeGesture } from '@/lib/design-system/animations/gestures';

const bind = useSwipeGesture({
  onSwipeLeft: handleSwipe,
  threshold: 100, // Require 100px movement
  velocity: 0.5,  // Adjust velocity threshold
});

<div {...bind()}>Swipeable content</div>
```

**Alternative**: Disable scroll during gesture:
```tsx
onSwipeStart: () => {
  document.body.style.overflow = 'hidden';
},
onSwipeEnd: () => {
  document.body.style.overflow = '';
},
```

---

### Animation performance issues

**Problem**: Janky animations, low FPS.

**Solutions**:

1. **Use GPU-accelerated properties**:
```tsx
// Good (GPU accelerated)
<motion.div animate={{ x: 100, opacity: 0.5 }} />

// Bad (forces layout recalculation)
<motion.div animate={{ width: '100%', top: 100 }} />
```

2. **Use will-change sparingly**:
```tsx
<motion.div
  style={{ willChange: 'transform' }}
  animate={{ x: 100 }}
/>
```

3. **Reduce animation complexity**:
```tsx
// Reduce number of animated elements
// Use transform instead of position
// Limit stagger delays
```

---

### Page transitions causing flicker

**Problem**: Flash of unstyled content during transitions.

**Solution**: Preload next page:

```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## PWA Issues

### Service Worker not registering

**Problem**: PWA features not working.

**Error**:
```
ServiceWorker registration failed
```

**Solution**:

1. **Check HTTPS**: Service workers require HTTPS (except localhost)
2. **Verify file location**: `public/sw.js` must be at root
3. **Check registration code**:

```typescript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((reg) => console.log('SW registered', reg))
    .catch((err) => console.error('SW registration failed', err));
}
```

**Common Issues**:
- Service worker in wrong directory
- MIME type not JavaScript
- Syntax errors in sw.js

---

### Install prompt not showing

**Problem**: PWA install banner doesn't appear.

**Requirements**:
- HTTPS enabled
- Valid manifest.json
- Service worker registered
- User hasn't dismissed prompt recently

**Solution**: Manually trigger prompt:

```typescript
let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

// Show install button
const handleInstall = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('Install outcome:', outcome);
    deferredPrompt = null;
  }
};
```

---

### Offline mode not working

**Problem**: App doesn't work without internet.

**Debug Steps**:

1. **Check service worker cache**:
```javascript
// In sw.js
self.addEventListener('fetch', (event) => {
  console.log('Fetch:', event.request.url);
  // Cache logic
});
```

2. **Verify offline page exists**:
```javascript
const OFFLINE_PAGE = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('offline').then((cache) => {
      return cache.add(OFFLINE_PAGE);
    })
  );
});
```

3. **Test offline**: DevTools → Application → Service Workers → Offline checkbox

---

### Push notifications not working on iOS

**Problem**: Notifications don't appear on iPhone/iPad.

**Why**: iOS Safari has limited push notification support.

**Requirements** (iOS 16.4+):
- PWA must be installed (Add to Home Screen)
- User must grant permission
- Proper VAPID keys configured

**Solution**:
```typescript
const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // Subscribe to push
    }
  }
};
```

**Alternative**: Use in-app notifications for iOS < 16.4.

---

## Performance Problems

### Slow initial page load

**Problem**: First Contentful Paint (FCP) > 3s.

**Solutions**:

1. **Code splitting**:
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
});
```

2. **Optimize images**:
```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

3. **Reduce bundle size**:
```bash
# Analyze bundle
ANALYZE=true npm run build

# Remove unused dependencies
npm uninstall unused-package
```

---

### DataTable rendering slowly

**Problem**: Table with 1000+ rows lags.

**Solution**: Implement virtual scrolling:

```tsx
import { useVirtual } from '@tanstack/react-virtual';

function VirtualTable({ data }) {
  const parentRef = useRef();
  const rowVirtualizer = useVirtual({
    size: data.length,
    parentRef,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: `${rowVirtualizer.totalSize}px` }}>
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <div key={virtualRow.index}>
            {data[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Alternative**: Use pagination instead of rendering all rows.

---

### Chart animation causing jank

**Problem**: Recharts animations drop FPS.

**Solution**: Disable animations for better performance:

```tsx
<LineChart
  data={data}
  isAnimationActive={false} // Disable animation
>
  <Line
    type="monotone"
    dataKey="value"
    animationDuration={0} // No animation
  />
</LineChart>
```

---

### Memory leak in animations

**Problem**: Memory usage increases over time.

**Solution**: Clean up animations on unmount:

```tsx
useEffect(() => {
  const animation = controls.start({ x: 100 });

  return () => {
    animation.stop(); // Clean up
  };
}, [controls]);
```

**Common Causes**:
- Interval/timeout not cleared
- Event listeners not removed
- Animations not stopped on unmount

---

## Accessibility Issues

### Screen reader not announcing changes

**Problem**: ARIA live region updates not announced.

**Solution**: Add proper ARIA attributes:

```tsx
<div role="status" aria-live="polite" aria-atomic="true">
  {message}
</div>

// For urgent updates
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

---

### Focus trap not working in Dialog

**Problem**: Tab key leaves dialog.

**Solution**: Ensure dialog has proper focus management:

```tsx
import { Dialog } from '@/lib/design-system';

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    {/* Focus automatically trapped */}
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <Input autoFocus /> {/* Auto-focus first input */}
  </DialogContent>
</Dialog>
```

**Manual Implementation**:
```tsx
useEffect(() => {
  if (open) {
    const firstFocusable = dialogRef.current?.querySelector('button, input');
    firstFocusable?.focus();
  }
}, [open]);
```

---

### Keyboard navigation not working

**Problem**: Cannot navigate with Tab/Arrow keys.

**Solution**: Ensure proper tabIndex and handlers:

```tsx
<div
  tabIndex={0}
  role="button"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Clickable Div
</div>
```

**Best Practice**: Use semantic HTML (`<button>`) instead of divs.

---

### Color contrast failing WCAG AA

**Problem**: Text fails 4.5:1 contrast ratio.

**Solution**: Use design tokens with proper contrast:

```tsx
// Good
className="text-gray-900 dark:text-gray-100"

// Bad - low contrast
className="text-gray-400"
```

**Tools**:
- Chrome DevTools → Contrast Ratio
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## TypeScript Errors

### Type error: Property does not exist

**Problem**: TypeScript can't find component props.

```
Property 'variant' does not exist on type 'IntrinsicAttributes'
```

**Solution**: Import types properly:

```tsx
import { Button, type ButtonProps } from '@/lib/design-system';

// Or extend component props
interface CustomButtonProps extends ButtonProps {
  customProp: string;
}
```

---

### Generic type error in DataTable

**Problem**: DataTable type inference failing.

**Solution**: Explicitly type your data:

```tsx
interface ScreeningData {
  id: number;
  name: string;
  coverage: number;
}

const data: ScreeningData[] = [...];

<DataTable<ScreeningData>
  data={data}
  columns={columns}
/>
```

---

### Cannot find namespace 'JSX'

**Problem**: JSX types not recognized.

**Solution**: Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "lib": ["dom", "dom.iterable", "esnext"]
  }
}
```

---

## Testing Issues

### Jest tests timing out

**Problem**: Tests exceed default timeout.

**Solution**: Increase timeout for async operations:

```tsx
test('loads data', async () => {
  // For this test only
  jest.setTimeout(10000);

  await waitFor(() => {
    expect(screen.getByText('Data')).toBeInTheDocument();
  }, { timeout: 5000 });
});
```

**Global config** (`jest.config.js`):
```javascript
module.exports = {
  testTimeout: 10000,
};
```

---

### Framer Motion tests failing

**Problem**: Animation tests throw errors.

**Solution**: Mock Framer Motion in tests:

```tsx
// __mocks__/framer-motion.tsx
module.exports = {
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
};
```

**Add to jest.config.js**:
```javascript
moduleNameMapper: {
  'framer-motion': '<rootDir>/__mocks__/framer-motion.tsx',
},
```

---

### axe accessibility violations

**Problem**: Components failing axe tests.

**Solution**: Fix specific violations:

```tsx
// Missing form label
<label htmlFor="email">Email</label>
<Input id="email" type="email" />

// Missing alt text
<img src="/image.jpg" alt="Description" />

// Incorrect heading hierarchy
<h1>Title</h1>
<h2>Subtitle</h2> {/* Not h3 */}
```

---

## Mobile-Specific Problems

### Touch gestures not working on iOS

**Problem**: Swipe/drag gestures not registering.

**Solution**: Prevent default touch behavior:

```tsx
import { useSwipeGesture } from '@/lib/design-system/animations/gestures';

const bind = useSwipeGesture({
  onSwipeLeft: handleSwipe,
  preventDefault: true, // Prevent default touch
});

<div {...bind()} style={{ touchAction: 'pan-y' }}>
  Swipeable content
</div>
```

---

### Bottom navigation hidden by iOS Safari bar

**Problem**: Bottom nav obscured by Safari UI.

**Solution**: Use safe area insets:

```tsx
<div
  className="fixed bottom-0 left-0 right-0"
  style={{
    paddingBottom: 'env(safe-area-inset-bottom)',
  }}
>
  Bottom Navigation
</div>
```

**CSS Alternative**:
```css
.bottom-nav {
  padding-bottom: env(safe-area-inset-bottom);
}
```

---

### Pull-to-refresh triggering browser refresh

**Problem**: Custom pull-to-refresh conflicts with browser.

**Solution**: Prevent default pull-to-refresh:

```tsx
useEffect(() => {
  const preventPull = (e: TouchEvent) => {
    if (window.scrollY === 0) {
      e.preventDefault();
    }
  };

  document.addEventListener('touchmove', preventPull, { passive: false });

  return () => {
    document.removeEventListener('touchmove', preventPull);
  };
}, []);
```

---

### Viewport height issues on mobile

**Problem**: 100vh includes browser UI bars.

**Solution**: Use custom CSS variable:

```typescript
// Set true viewport height
useEffect(() => {
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setVH();
  window.addEventListener('resize', setVH);

  return () => window.removeEventListener('resize', setVH);
}, []);
```

```css
.full-height {
  height: 100vh; /* Fallback */
  height: calc(var(--vh, 1vh) * 100);
}
```

---

## Common Error Messages

### Error: Hydration failed because the initial UI does not match

**Cause**: Server and client render different content.

**Solutions**:
1. Use `useEffect` for client-only code
2. Return `null` until mounted
3. Avoid `Math.random()` or `Date.now()` in render
4. Ensure proper SSR configuration

```tsx
'use client';

export function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted ? children : null;
}
```

---

### Error: Cannot read property of undefined

**Cause**: Accessing property before data loads.

**Solution**: Use optional chaining and nullish coalescing:

```tsx
// Bad
const name = user.profile.name;

// Good
const name = user?.profile?.name ?? 'Unknown';
```

---

### Error: Maximum update depth exceeded

**Cause**: setState in render causing infinite loop.

**Wrong**:
```tsx
function Component() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // DON'T DO THIS
  return <div>{count}</div>;
}
```

**Correct**:
```tsx
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, []); // Or in event handler

  return <div>{count}</div>;
}
```

---

## Getting Help

### Debug Checklist

Before asking for help, try:

1. ✅ **Check browser console** for errors
2. ✅ **Verify dependencies** are installed
3. ✅ **Clear cache** (`.next`, `node_modules`)
4. ✅ **Check TypeScript errors** (`npm run type-check`)
5. ✅ **Run linter** (`npm run lint`)
6. ✅ **Search this troubleshooting guide**
7. ✅ **Check GitHub issues** for similar problems

### Reporting Issues

When reporting bugs, include:

1. **Error message** (full stack trace)
2. **Steps to reproduce**
3. **Expected vs actual behavior**
4. **Environment**:
   - Node version: `node -v`
   - npm version: `npm -v`
   - OS: macOS/Windows/Linux
   - Browser: Chrome/Firefox/Safari
5. **Code sample** (minimal reproduction)

**Template**:
```markdown
## Bug Description
[Clear description]

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Error Message
```
[Error stack trace]
```

## Environment
- Node: v20.x
- npm: 10.x
- Browser: Chrome 120
- OS: macOS 14
```

---

## Support Resources

- **Documentation**: [README.md](./README.md)
- **Migration Guide**: [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- **Integration Examples**: [INTEGRATION_EXAMPLES.md](./INTEGRATION_EXAMPLES.md)
- **GitHub Issues**: [Report a bug](https://github.com/darwin-mfc/issues)
- **Discussions**: [Ask a question](https://github.com/darwin-mfc/discussions)
- **Email**: support@darwin-mfc.org

---

**Darwin Design System v1.0.0**
*Building accessible, performant healthcare applications*
