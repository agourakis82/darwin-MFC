# Darwin Design System - Monitoring & Analytics Guide

**Version 1.0.0** | **Production Observability & Analytics**

Complete guide for monitoring, analytics, error tracking, and performance observability in production.

---

## Table of Contents

1. [Overview](#overview)
2. [Error Tracking (Sentry)](#error-tracking-sentry)
3. [Performance Monitoring](#performance-monitoring)
4. [User Analytics](#user-analytics)
5. [Real User Monitoring (RUM)](#real-user-monitoring-rum)
6. [Logging Strategy](#logging-strategy)
7. [Alerting & Notifications](#alerting--notifications)
8. [Dashboard Setup](#dashboard-setup)
9. [Metrics & KPIs](#metrics--kpis)
10. [Privacy & Compliance](#privacy--compliance)

---

## Overview

### Monitoring Stack

**Recommended Tools:**

| Category | Tool | Purpose |
|----------|------|---------|
| Error Tracking | Sentry | Runtime errors, crashes |
| Analytics | Google Analytics 4 | User behavior, conversions |
| RUM | Sentry Performance | Core Web Vitals, performance |
| Uptime | Uptime Robot | Service availability |
| Logs | CloudWatch / Datadog | Application logs |
| APM | New Relic / Datadog | Application performance |

### Monitoring Principles

1. **Privacy First** - No PII tracking, GDPR compliant
2. **Performance Budget** - Monitor impact of monitoring code
3. **Actionable Alerts** - Only alert on actionable issues
4. **Real User Data** - Track real user experiences
5. **Continuous Improvement** - Iterate based on metrics

---

## Error Tracking (Sentry)

### Installation

```bash
npm install @sentry/nextjs
```

### Configuration

**sentry.client.config.ts**:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,

  // Performance Monitoring
  tracesSampleRate: 1.0, // 100% in development

  // Session Replay (optional)
  replaysSessionSampleRate: 0.1, // 10% of sessions
  replaysOnErrorSampleRate: 1.0, // 100% of errors

  // Release tracking
  release: process.env.NEXT_PUBLIC_APP_VERSION,

  // Filter sensitive data
  beforeSend(event, hint) {
    // Remove PII
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
    }

    // Filter specific errors
    if (event.exception?.values?.[0]?.value?.includes('ResizeObserver')) {
      return null; // Ignore ResizeObserver errors
    }

    return event;
  },

  // Ignore specific errors
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
    'cancelled', // Network requests
  ],

  // Debug in development
  debug: process.env.NODE_ENV === 'development',
});
```

**sentry.server.config.ts**:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,

  // Server-specific config
  attachStacktrace: true,

  beforeSend(event) {
    // Server-side filtering
    return event;
  },
});
```

### Usage in Components

**Error Boundaries**:

```tsx
'use client';

import * as Sentry from '@sentry/nextjs';
import { Component } from 'react';

export class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: any) {
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }

  render() {
    return this.props.children;
  }
}
```

**Manual Error Reporting**:

```typescript
import * as Sentry from '@sentry/nextjs';

try {
  await riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    level: 'error',
    tags: {
      component: 'DrugInteractionChecker',
      operation: 'checkInteractions',
    },
    extra: {
      drugCount: selectedDrugs.length,
      userId: user?.id,
    },
  });
}
```

**Custom Events**:

```typescript
Sentry.captureMessage('User exported data', {
  level: 'info',
  tags: {
    feature: 'export',
    format: 'pdf',
  },
});
```

### Sentry Best Practices

1. **Tag everything**: Add context to errors
2. **Set user context**: Track affected users (without PII)
3. **Use breadcrumbs**: Track user actions before error
4. **Release tracking**: Tag errors with versions
5. **Source maps**: Upload source maps for production

**Example Setup**:

```typescript
// Set user context (no PII)
Sentry.setUser({
  id: user.id,
  role: user.role,
  subscription: user.subscription,
});

// Add breadcrumbs
Sentry.addBreadcrumb({
  category: 'ui.click',
  message: 'User clicked export button',
  level: 'info',
});

// Set tags
Sentry.setTag('page', '/medicamentos');
Sentry.setTag('feature', 'drug-interactions');
```

---

## Performance Monitoring

### Core Web Vitals Tracking

**lib/monitoring/web-vitals.ts**:

```typescript
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';
import * as Sentry from '@sentry/nextjs';

function sendToAnalytics(metric: any) {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Send to Sentry
  Sentry.captureMessage(`${metric.name}: ${metric.value}`, {
    level: 'info',
    tags: {
      metric: metric.name,
    },
    extra: {
      value: metric.value,
      rating: metric.rating,
    },
  });
}

export function initWebVitals() {
  onCLS(sendToAnalytics);
  onFID(sendToAnalytics);
  onLCP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
```

**Usage in app layout**:

```tsx
'use client';

import { useEffect } from 'react';
import { initWebVitals } from '@/lib/monitoring/web-vitals';

export function WebVitalsReporter() {
  useEffect(() => {
    initWebVitals();
  }, []);

  return null;
}
```

### Performance API Monitoring

```typescript
// lib/monitoring/performance.ts

export function trackPageLoadTime() {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

    // Send to analytics
    gtag('event', 'page_load_time', {
      value: pageLoadTime,
      event_category: 'Performance',
    });

    // Log slow pages
    if (pageLoadTime > 3000) {
      Sentry.captureMessage('Slow page load', {
        level: 'warning',
        extra: {
          loadTime: pageLoadTime,
          url: window.location.href,
        },
      });
    }
  });
}

export function trackAPICall(url: string, duration: number, status: number) {
  gtag('event', 'api_call', {
    event_category: 'API',
    event_label: url,
    value: duration,
  });

  // Alert on slow API calls
  if (duration > 2000) {
    Sentry.captureMessage('Slow API call', {
      level: 'warning',
      tags: {
        endpoint: url,
        status: status.toString(),
      },
      extra: {
        duration,
      },
    });
  }
}
```

### Component Performance Tracking

```tsx
import { useEffect, useRef } from 'react';
import * as Sentry from '@sentry/nextjs';

export function useComponentPerformance(componentName: string) {
  const startTime = useRef(performance.now());

  useEffect(() => {
    const renderTime = performance.now() - startTime.current;

    if (renderTime > 100) {
      Sentry.captureMessage('Slow component render', {
        level: 'warning',
        tags: {
          component: componentName,
        },
        extra: {
          renderTime,
        },
      });
    }

    return () => {
      // Cleanup tracking
    };
  }, [componentName]);
}

// Usage
function MyComponent() {
  useComponentPerformance('DataTable');
  return <div>...</div>;
}
```

---

## User Analytics

### Google Analytics 4 Setup

**lib/analytics/gtag.ts**:

```typescript
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Page view
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Event tracking
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

**Track page views**:

```tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '@/lib/analytics/gtag';

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    pageview(url);
  }, [pathname, searchParams]);

  return null;
}
```

**Track custom events**:

```tsx
import { event } from '@/lib/analytics/gtag';

// Track button clicks
const handleExport = () => {
  event({
    action: 'click',
    category: 'Export',
    label: 'PDF Export',
  });

  // Export logic
};

// Track form submissions
const handleSubmit = () => {
  event({
    action: 'submit',
    category: 'Form',
    label: 'Patient Registration',
  });
};

// Track feature usage
const handleCalculate = () => {
  event({
    action: 'calculate',
    category: 'Calculator',
    label: 'BMI',
    value: bmi,
  });
};
```

### Privacy-Friendly Analytics

**Anonymize IP addresses**:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}', {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });
  `}
</Script>
```

---

## Real User Monitoring (RUM)

### Custom RUM Implementation

```typescript
// lib/monitoring/rum.ts

interface RUMMetrics {
  url: string;
  loadTime: number;
  fcp: number;
  lcp: number;
  cls: number;
  fid: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  connection: string;
  timestamp: number;
}

export function collectRUMData(): RUMMetrics {
  const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

  return {
    url: window.location.href,
    loadTime: perfData.loadEventEnd - perfData.fetchStart,
    fcp: 0, // Set by web-vitals
    lcp: 0, // Set by web-vitals
    cls: 0, // Set by web-vitals
    fid: 0, // Set by web-vitals
    deviceType: getDeviceType(),
    connection: getConnectionType(),
    timestamp: Date.now(),
  };
}

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

function getConnectionType(): string {
  const connection = (navigator as any).connection;
  return connection?.effectiveType || 'unknown';
}

export function sendRUMData(metrics: RUMMetrics) {
  // Send to analytics endpoint
  fetch('/api/analytics/rum', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metrics),
  }).catch(() => {
    // Silently fail
  });
}
```

### Network Performance Tracking

```typescript
export function trackNetworkRequests() {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'resource') {
        const resource = entry as PerformanceResourceTiming;

        // Track slow resources
        if (resource.duration > 1000) {
          Sentry.captureMessage('Slow resource load', {
            level: 'warning',
            extra: {
              url: resource.name,
              duration: resource.duration,
              size: resource.transferSize,
            },
          });
        }
      }
    }
  });

  observer.observe({ entryTypes: ['resource'] });
}
```

---

## Logging Strategy

### Structured Logging

```typescript
// lib/monitoring/logger.ts

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

interface LogContext {
  component?: string;
  userId?: string;
  action?: string;
  [key: string]: any;
}

class Logger {
  private level: LogLevel = LogLevel.INFO;

  setLevel(level: LogLevel) {
    this.level = level;
  }

  private log(level: LogLevel, message: string, context?: LogContext) {
    if (this.shouldLog(level)) {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...context,
      };

      // Console output in development
      if (process.env.NODE_ENV === 'development') {
        console[level](logEntry);
      }

      // Send to logging service in production
      if (process.env.NODE_ENV === 'production') {
        this.sendToLogService(logEntry);
      }
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    return levels.indexOf(level) >= levels.indexOf(this.level);
  }

  private sendToLogService(logEntry: any) {
    // Send to CloudWatch, Datadog, etc.
    fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logEntry),
    }).catch(() => {
      // Silently fail
    });
  }

  debug(message: string, context?: LogContext) {
    this.log(LogLevel.DEBUG, message, context);
  }

  info(message: string, context?: LogContext) {
    this.log(LogLevel.INFO, message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log(LogLevel.WARN, message, context);
  }

  error(message: string, context?: LogContext) {
    this.log(LogLevel.ERROR, message, context);

    // Also send to Sentry
    Sentry.captureMessage(message, {
      level: 'error',
      extra: context,
    });
  }
}

export const logger = new Logger();
```

**Usage**:

```tsx
import { logger } from '@/lib/monitoring/logger';

function DrugChecker() {
  const handleCheck = async () => {
    logger.info('Checking drug interactions', {
      component: 'DrugChecker',
      drugCount: selectedDrugs.length,
    });

    try {
      const result = await checkInteractions(selectedDrugs);
      logger.info('Interaction check complete', {
        component: 'DrugChecker',
        interactionCount: result.length,
      });
    } catch (error) {
      logger.error('Failed to check interactions', {
        component: 'DrugChecker',
        error: error.message,
      });
    }
  };

  return <div>...</div>;
}
```

---

## Alerting & Notifications

### Alert Configuration

```typescript
// lib/monitoring/alerts.ts

interface AlertRule {
  name: string;
  condition: (metric: any) => boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  channels: ('email' | 'slack' | 'pagerduty')[];
}

const alertRules: AlertRule[] = [
  {
    name: 'High Error Rate',
    condition: (metric) => metric.errorRate > 0.05, // 5%
    severity: 'critical',
    channels: ['email', 'slack', 'pagerduty'],
  },
  {
    name: 'Slow Page Load',
    condition: (metric) => metric.loadTime > 5000, // 5s
    severity: 'high',
    channels: ['email', 'slack'],
  },
  {
    name: 'Low API Success Rate',
    condition: (metric) => metric.apiSuccessRate < 0.95, // 95%
    severity: 'high',
    channels: ['email', 'slack'],
  },
  {
    name: 'High Memory Usage',
    condition: (metric) => metric.memoryUsage > 0.9, // 90%
    severity: 'medium',
    channels: ['slack'],
  },
];

export function checkAlerts(metrics: any) {
  alertRules.forEach((rule) => {
    if (rule.condition(metrics)) {
      sendAlert(rule, metrics);
    }
  });
}

function sendAlert(rule: AlertRule, metrics: any) {
  rule.channels.forEach((channel) => {
    switch (channel) {
      case 'email':
        sendEmailAlert(rule, metrics);
        break;
      case 'slack':
        sendSlackAlert(rule, metrics);
        break;
      case 'pagerduty':
        sendPagerDutyAlert(rule, metrics);
        break;
    }
  });
}
```

### Slack Notifications

```typescript
async function sendSlackAlert(rule: AlertRule, metrics: any) {
  const webhook = process.env.SLACK_WEBHOOK_URL;

  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `🚨 ${rule.name}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${rule.name}*\nSeverity: ${rule.severity}`,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Metric Value:*\n${JSON.stringify(metrics, null, 2)}`,
            },
          ],
        },
      ],
    }),
  });
}
```

---

## Dashboard Setup

### Metrics Dashboard

```tsx
// app/admin/metrics/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/lib/design-system';
import { LineChart } from '@/lib/design-system/components/charts';

export default function MetricsDashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchMetrics = async () => {
    const response = await fetch('/api/metrics');
    const data = await response.json();
    setMetrics(data);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">System Metrics</h1>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Error Rate</h3>
          <p className="text-3xl font-bold">{metrics?.errorRate}%</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Avg Load Time</h3>
          <p className="text-3xl font-bold">{metrics?.avgLoadTime}ms</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
          <p className="text-3xl font-bold">{metrics?.activeUsers}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Uptime</h3>
          <p className="text-3xl font-bold">{metrics?.uptime}%</p>
        </Card>
      </div>

      {/* Charts */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
        <LineChart
          data={metrics?.trends || []}
          xKey="time"
          yKeys={['loadTime', 'errorRate']}
          height={400}
        />
      </Card>
    </div>
  );
}
```

---

## Metrics & KPIs

### Key Performance Indicators

**Technical Metrics:**
- Error rate < 1%
- Average load time < 2s
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- API success rate > 99%
- Uptime > 99.9%

**User Metrics:**
- Active users (daily/monthly)
- Session duration > 2min
- Pages per session > 3
- Bounce rate < 40%
- Conversion rate (if applicable)

**Business Metrics:**
- Feature adoption rate
- User retention rate
- Screening completion rate
- Export usage

---

## Privacy & Compliance

### GDPR Compliance

1. **Anonymize IPs**: Always anonymize user IP addresses
2. **No PII**: Never track personally identifiable information
3. **Cookie Consent**: Implement cookie consent banner
4. **Data Deletion**: Provide mechanism to delete user data
5. **Privacy Policy**: Document data collection practices

**Cookie Consent Implementation**:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { Button, Card } from '@/lib/design-system';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
    // Initialize analytics
    initAnalytics();
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <Card className="fixed bottom-4 left-4 right-4 p-6 z-50">
      <p className="mb-4">
        We use cookies to improve your experience. No personal data is collected.
      </p>
      <div className="flex space-x-2">
        <Button variant="primary" onClick={acceptCookies}>
          Accept
        </Button>
        <Button variant="outline" onClick={declineCookies}>
          Decline
        </Button>
      </div>
    </Card>
  );
}
```

---

## Summary

This monitoring setup provides:

- ✅ **Comprehensive error tracking** with Sentry
- ✅ **Performance monitoring** for Core Web Vitals
- ✅ **User analytics** with privacy-first approach
- ✅ **Real-time alerting** for critical issues
- ✅ **Structured logging** for debugging
- ✅ **GDPR compliance** built-in
- ✅ **Production dashboards** for observability

---

**Darwin Design System v1.0.0**
*Building accessible, performant healthcare applications*
