# Production Deployment Guide

**Darwin-MFC Design System v1.0.0**

Complete guide for deploying Darwin-MFC to production with the new design system.

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Setup](#environment-setup)
3. [Build Configuration](#build-configuration)
4. [Deployment Platforms](#deployment-platforms)
5. [PWA Configuration](#pwa-configuration)
6. [Performance Optimization](#performance-optimization)
7. [Monitoring & Analytics](#monitoring--analytics)
8. [Security](#security)
9. [Rollback Strategy](#rollback-strategy)
10. [Post-Deployment](#post-deployment)

---

## Pre-Deployment Checklist

### Code Quality

- [ ] All tests passing (`npm test`)
- [ ] Lint errors resolved (`npm run lint`)
- [ ] TypeScript errors resolved (`npm run type-check`)
- [ ] Build successful (`npm run build`)
- [ ] No console errors in production build

### Performance

- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Bundle size analyzed and optimized

### Accessibility

- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigation working
- [ ] Screen reader tested
- [ ] Color contrast validated
- [ ] Focus indicators visible

### Security

- [ ] Dependencies updated
- [ ] Security audit passed (`npm audit`)
- [ ] Environment variables secured
- [ ] HTTPS configured
- [ ] CSP headers configured

### Documentation

- [ ] README updated
- [ ] CHANGELOG updated
- [ ] API documentation current
- [ ] Migration guide reviewed

---

## Environment Setup

### Required Environment Variables

Create `.env.production`:

```bash
# App Configuration
NEXT_PUBLIC_APP_URL=https://mfc.agourakis.med.br
NEXT_PUBLIC_APP_NAME=Darwin-MFC
NEXT_PUBLIC_APP_VERSION=1.0.0

# PWA Configuration
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key

# Sentry (Optional)
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_sentry_token

# Feature Flags
NEXT_PUBLIC_ENABLE_PWA=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

### Environment Variable Security

**Never commit sensitive variables to Git**

```bash
# .gitignore
.env.local
.env.production.local
.env*.local
```

---

## Build Configuration

### Next.js Configuration

**next.config.ts**:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: 'export',

  // Image optimization
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // PWA configuration
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
```

### Build Scripts

**package.json**:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:e2e": "playwright test",
    "analyze": "ANALYZE=true npm run build",
    "deploy": "npm run build && npm run export",
    "export": "next export"
  }
}
```

### Build Process

```bash
# 1. Clean previous builds
rm -rf .next out

# 2. Install dependencies
npm ci

# 3. Run type check
npm run type-check

# 4. Run linter
npm run lint

# 5. Run tests
npm test

# 6. Build for production
npm run build

# 7. Analyze bundle (optional)
npm run analyze
```

---

## Deployment Platforms

### GitHub Pages (Recommended)

**Setup**:

1. **Configure repository settings**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/(root)`

2. **Add deployment workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_APP_URL: https://mfc.agourakis.med.br

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './out'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. **Configure base path (if needed)**

```typescript
// next.config.ts
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/repo-name' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/repo-name' : '',
};
```

### Vercel

**Setup**:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Link project**
   ```bash
   vercel link
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

**vercel.json**:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ],
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

### Netlify

**Setup**:

1. **Create netlify.toml**:

```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

2. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

---

## PWA Configuration

### Service Worker

**public/sw.js**:

```javascript
const CACHE_NAME = 'darwin-mfc-v1.0.0';
const STATIC_CACHE = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;
const PAGES_CACHE = `${CACHE_NAME}-pages`;

// Static assets to cache
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('darwin-mfc-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Cache-first for static assets
  if (request.url.match(/\.(png|jpg|jpeg|svg|gif|webp|ico|woff|woff2|ttf|eot|css|js)$/)) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((fetchResponse) => {
          return caches.open(STATIC_CACHE).then((cache) => {
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
    return;
  }

  // Network-first for pages
  event.respondWith(
    fetch(request)
      .then((response) => {
        return caches.open(PAGES_CACHE).then((cache) => {
          cache.put(request, response.clone());
          return response;
        });
      })
      .catch(() => {
        return caches.match(request).then((response) => {
          return response || caches.match('/offline.html');
        });
      })
  );
});
```

### Manifest Configuration

**public/manifest.json**:

```json
{
  "name": "Darwin-MFC - Medical Reference Platform",
  "short_name": "Darwin-MFC",
  "description": "Academic Q1-standard interactive web application for comparative analysis of population-based screening programs",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "any",
  "theme_color": "#3B82F6",
  "background_color": "#FFFFFF",
  "categories": ["medical", "health", "education", "reference"],
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-maskable-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icons/icon-maskable-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "shortcuts": [
    {
      "name": "Clinical Calculators",
      "short_name": "Calculators",
      "url": "/calculadoras",
      "icons": [{ "src": "/icons/calculator-96x96.png", "sizes": "96x96" }]
    },
    {
      "name": "Drug Interactions",
      "short_name": "Interactions",
      "url": "/medicamentos/interacoes",
      "icons": [{ "src": "/icons/drug-96x96.png", "sizes": "96x96" }]
    }
  ]
}
```

---

## Performance Optimization

### Bundle Analysis

```bash
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Run analysis
ANALYZE=true npm run build
```

### Code Splitting

```tsx
// Lazy load heavy components
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>
```

### Image Optimization

```tsx
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
  loading="eager"
/>
```

### Font Optimization

```tsx
// Use next/font
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

<html className={inter.className}>
```

---

## Monitoring & Analytics

### Performance Monitoring

**Sentry Integration**:

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### Analytics

**Google Analytics**:

```tsx
// lib/analytics.ts
export const pageview = (url: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: any) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
```

---

## Security

### Content Security Policy

```typescript
// next.config.ts
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://www.google-analytics.com;
  frame-ancestors 'none';
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
];
```

---

## Rollback Strategy

### Version Tagging

```bash
# Tag release
git tag -a v1.0.0 -m "Design System v1.0.0"
git push origin v1.0.0

# Rollback to previous version
git checkout v0.9.0
npm run build
npm run deploy
```

### Emergency Rollback

1. Identify issue
2. Checkout previous stable version
3. Deploy immediately
4. Investigate and fix
5. Redeploy when fixed

---

## Post-Deployment

### Verification Checklist

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] PWA installable
- [ ] Offline mode works
- [ ] Notifications working
- [ ] Analytics tracking
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] Cross-browser compatible

### Monitoring

- Monitor error rates (Sentry)
- Check performance metrics (Lighthouse CI)
- Verify analytics data
- Monitor uptime
- Check user feedback

---

## Troubleshooting

### Common Issues

**Service Worker not updating**:
```javascript
// Force update
navigator.serviceWorker.getRegistrations().then((registrations) => {
  registrations.forEach((registration) => registration.unregister());
});
```

**Caching issues**:
```bash
# Clear build cache
rm -rf .next
npm run build
```

**Environment variables not working**:
- Ensure `NEXT_PUBLIC_` prefix for client-side variables
- Rebuild after changing environment variables
- Check `.env.production` file exists

---

**Darwin-MFC Production Deployment Guide v1.0.0**

For support: support@darwin-mfc.org
