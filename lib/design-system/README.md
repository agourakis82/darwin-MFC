# Darwin Design System (DDS)

**Version 1.0.0** | **Darwin-MFC Medical Reference Platform**

A comprehensive, production-ready design system for building accessible, performant, and beautiful healthcare applications.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Components](#components)
- [Features](#features)
- [Testing](#testing)
- [Migration](#migration)
- [Performance](#performance)
- [Accessibility](#accessibility)
- [Contributing](#contributing)

---

## Overview

The Darwin Design System is a complete UI/UX framework built for the Darwin-MFC medical reference platform. It provides:

- **40+ Production-ready Components**
- **Comprehensive Animation System**
- **PWA & Mobile-First Design**
- **Clinical Decision Support Tools**
- **WCAG 2.1 AA Compliant**
- **Full TypeScript Support**
- **Dark Mode by Default**

### Design Principles

1. **Accessibility First** - WCAG 2.1 AA compliance in every component
2. **Mobile First** - Touch-friendly, responsive design
3. **Performance** - Optimized for speed and efficiency
4. **Privacy** - 100% local storage, no tracking
5. **Consistency** - Unified API across all components

---

## Installation

### Prerequisites

- Node.js 18+
- React 19.2.3+
- Next.js 16.1.1+

### Install Dependencies

```bash
npm install framer-motion@12.23.26
npm install @use-gesture/react
npm install class-variance-authority
npm install zustand
npm install react-hook-form zod @hookform/resolvers
npm install recharts@3.6.0
npm install cmdk
npm install lucide-react
```

### Configure TypeScript

Ensure path aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## Quick Start

### Basic Usage

```tsx
import { Button, Card, Input } from '@/lib/design-system';

function MyComponent() {
  return (
    <Card>
      <h2>Welcome</h2>
      <Input placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

### With Animations

```tsx
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/design-system/animations/presets';

<motion.div {...fadeInUp}>
  <Card>Animated content</Card>
</motion.div>
```

### PWA Features

```tsx
import { initializePWA, BottomNavBar, MobileHeader } from '@/lib/pwa';

// Initialize PWA
await initializePWA({
  enableNotifications: true,
  enableOfflineMode: true,
});

// Use mobile components
<MobileLayout
  header={<MobileHeader title="Darwin-MFC" />}
  bottomNav={<BottomNavBar />}
>
  {children}
</MobileLayout>
```

---

## Architecture

### Project Structure

```
lib/design-system/
├── primitives/          # Base components (Button, Input, Card, etc.)
├── components/          # Composed components (Dialog, Tabs, etc.)
├── animations/          # Animation system (11 modules)
├── __tests__/          # Comprehensive test suite
├── tokens/             # Design tokens
├── index.ts            # Main exports
├── README.md           # This file
└── MIGRATION_GUIDE.md  # Migration documentation

lib/pwa/                # Progressive Web App features
├── components/         # PWA-specific components
├── manifest-generator.ts
├── service-worker.ts
├── notifications.ts
├── performance.ts
└── index.ts

lib/clinical-decision-support/  # Clinical tools
├── calculators/
├── drug-interactions/
├── evidence/
└── decision-trees/
```

### Module System

**Layer 1: Primitives** (Foundation)
- Button, Card, Input, Select
- Checkbox, Radio, Switch
- Avatar, Badge, Progress

**Layer 2: Components** (Composition)
- Dialog, Tooltip, Popover
- Tabs, Accordion, Command
- Alert, Toast

**Layer 3: Data Components**
- DataTable (sorting, filtering, pagination)
- Charts (Line, Bar, Pie, Area, Radar)
- Forms with validation

**Layer 4: Features**
- Animations (Framer Motion)
- PWA (offline, notifications)
- Clinical Decision Support

---

## Components

### Primitives

#### Button
```tsx
<Button variant="primary" size="lg" disabled>
  Submit
</Button>

// Variants: primary, secondary, outline, ghost, danger
// Sizes: sm, md, lg
```

#### Input
```tsx
<Input
  type="email"
  placeholder="Enter email"
  hasError
  errorMessage="Invalid email"
/>
```

#### Card
```tsx
<Card variant="elevated" className="p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

### Components

#### Dialog
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content</p>
  </DialogContent>
</Dialog>
```

#### Tabs
```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

#### DataTable
```tsx
<DataTable
  data={data}
  columns={columns}
  sorting
  filtering
  pagination={{ pageSize: 10 }}
/>
```

### Charts

```tsx
import { LineChart, BarChart, PieChart } from '@/lib/design-system/components/charts';

<LineChart
  data={data}
  xKey="date"
  yKeys={['value1', 'value2']}
  height={400}
/>
```

---

## Features

### 🎨 Animation System

11 comprehensive animation modules:

- **Presets** - Pre-built animation variants
- **Gestures** - Swipe, drag, pinch, long press
- **Feedback** - Ripple, shake, pulse, confetti
- **Loading** - Spinners and skeletons
- **Scroll** - Parallax, reveal, progress
- **Transitions** - Page transitions
- **Haptics** - Touch feedback
- **Numbers** - Animated counters
- **Config** - Reduced motion support

```tsx
import {
  fadeInUp,
  useSwipeGesture,
  RippleButton,
  Spinner,
  ScrollReveal,
  PageTransition,
} from '@/lib/design-system/animations';
```

### 📱 PWA Features

- **Offline Support** - Service worker with caching strategies
- **Install Prompts** - Smart PWA installation
- **Push Notifications** - Clinical alerts, drug interactions
- **Mobile Navigation** - Bottom nav, hamburger menu
- **Touch Gestures** - Pull-to-refresh, swipe actions
- **Performance** - Network-aware, battery-aware

```tsx
import {
  InstallPrompt,
  OfflineBanner,
  PullToRefresh,
  showClinicalAlert,
} from '@/lib/pwa';
```

### 🏥 Clinical Decision Support

- **Calculators** - BMI, CrCl, CHADS₂-VASc, Wells
- **Drug Interactions** - Multi-drug analysis
- **Evidence Indicators** - GRADE, USPSTF, Oxford
- **Decision Trees** - Interactive clinical pathways

```tsx
import {
  BMICalculator,
  DrugInteractionChecker,
  GRADEIndicator,
  DecisionTree,
} from '@/lib/clinical-decision-support';
```

---

## Testing

### Test Suite Coverage

- ✅ **Integration Tests** - Component interactions
- ✅ **Accessibility Tests** - WCAG 2.1 AA compliance
- ✅ **Performance Tests** - Render time, memory usage
- ✅ **Visual Regression** - Screenshot comparison
- ✅ **Unit Tests** - Individual component logic

### Run Tests

```bash
# All tests
npm test

# Integration tests
npm test integration

# Accessibility tests
npm test accessibility

# Performance benchmarks
npm test performance

# Watch mode
npm test -- --watch
```

### Example Test

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/lib/design-system';

test('Button renders correctly', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

---

## Migration

### From Old Components

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed migration instructions.

### Quick Migration

```tsx
// Old
import { Button } from '@/components/ui/button';
<button className="btn btn-primary">Click</button>

// New
import { Button } from '@/lib/design-system';
<Button variant="primary">Click</Button>
```

### Migration Utilities

```tsx
import {
  analyzeFile,
  autoFixFile,
  generateMigrationReport,
} from '@/lib/design-system/migration-utils';

// Analyze file
const analysis = analyzeFile(fileContent, filePath);

// Auto-fix
const { content, fixed } = autoFixFile(fileContent);

// Generate report
const report = generateMigrationReport(analyses);
console.log(printMigrationReport(report));
```

---

## Performance

### Benchmarks

Component performance targets:

| Component | Render Time | Update Time | Memory |
|-----------|-------------|-------------|--------|
| Button | < 16ms | < 8ms | Low |
| Input | < 16ms | < 8ms | Low |
| Card | < 16ms | < 8ms | Low |
| DataTable (100 rows) | < 100ms | < 50ms | Medium |
| Dialog | < 33ms | < 16ms | Low |

### Optimization Tips

1. **Use React.memo** for expensive components
2. **Lazy load** heavy components
3. **Virtualize** long lists
4. **Debounce** user input
5. **Code split** by route

```tsx
// Lazy loading
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Spinner />}>
  <HeavyComponent />
</Suspense>
```

---

## Accessibility

### WCAG 2.1 AA Compliance

All components meet WCAG 2.1 AA standards:

- ✅ **Keyboard Navigation** - Full keyboard support
- ✅ **Screen Reader** - ARIA labels and descriptions
- ✅ **Color Contrast** - 4.5:1 minimum ratio
- ✅ **Focus Indicators** - Visible focus states
- ✅ **Semantic HTML** - Proper element usage

### Testing Accessibility

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

test('has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Accessibility Features

- **Focus Management** - Automatic focus trapping in modals
- **Keyboard Shortcuts** - Command palette with ⌘K
- **Reduced Motion** - Respects user preferences
- **Screen Reader** - Comprehensive ARIA support
- **High Contrast** - Works with system themes

---

## Contributing

### Development Setup

```bash
# Clone repository
git clone https://github.com/darwin-mfc/darwin-mfc.git
cd darwin-mfc

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Code Standards

- **TypeScript** - Strict mode enabled
- **ESLint** - Airbnb config
- **Prettier** - Code formatting
- **Conventional Commits** - Commit message format

### Pull Request Process

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## Documentation

### Additional Resources

- [Migration Guide](./MIGRATION_GUIDE.md) - Migrate from old components
- [API Reference](./API.md) - Detailed component APIs
- [Animation Guide](./animations/README.md) - Animation system docs
- [PWA Guide](../pwa/README.md) - PWA features
- [Storybook](http://localhost:6006) - Interactive component explorer

### Support

- **GitHub Issues**: [Report bugs](https://github.com/darwin-mfc/issues)
- **Discussions**: [Ask questions](https://github.com/darwin-mfc/discussions)
- **Email**: support@darwin-mfc.org

---

## License

**MIT License** - See [LICENSE](../../LICENSE) for details

---

## Acknowledgments

Built with:
- [React 19](https://react.dev)
- [Next.js 16](https://nextjs.org)
- [Framer Motion 12](https://www.framer.com/motion/)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Recharts 3](https://recharts.org)

---

**Darwin-MFC Design System v1.0.0**
*Building accessible, performant healthcare applications*

🏥 [Website](https://mfc.agourakis.med.br) | 📚 [Docs](./README.md) | 🐛 [Issues](https://github.com/darwin-mfc/issues)
