/**
 * Lighthouse CI Configuration
 * State of the Art Performance Testing
 */

module.exports = {
  ci: {
    collect: {
      staticDistDir: './.next',
      url: [
        'http://localhost:3000',
        'http://localhost:3000/doencas/hipertensao',
        'http://localhost:3000/doencas/diabetes',
        'http://localhost:3000/doencas/asma',
        'http://localhost:3000/calculadoras',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
        screenEmulation: {
          mobile: false,
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1,
          disabled: false,
        },
        emulatedUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        onlyAudits: [
          'first-contentful-paint',
          'largest-contentful-paint',
          'cumulative-layout-shift',
          'total-blocking-time',
          'speed-index',
          'interactive',
          'first-meaningful-paint',
          'first-cpu-idle',
          'first-input-delay',
          'uses-responsive-images',
          'uses-text-compression',
          'uses-rel-preconnect',
          'uses-rel-preload',
          'efficient-animated-content',
          'mainthread-work-breakdown',
          'bootup-time',
          'network-rtt',
          'network-server-latency',
          'metrics',
        ],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['error', { maxNumericValue: 3400 }],
        'interactive': ['error', { maxNumericValue: 3500 }],
      },
    },
    server: {
      command: 'npm run dev',
      port: 3000,
      waitForReady: true,
    },
  },
};
