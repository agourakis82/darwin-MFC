/**
 * Playwright Configuration
 * State of the Art E2E Testing Setup
 */

import { defineConfig, devices } from '@playwright/test';

const chromiumExecutablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const playwrightPort = Number(process.env.PLAYWRIGHT_PORT || 3200);
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${playwrightPort}`;
const fullMatrix = !!process.env.CI || process.env.PLAYWRIGHT_FULL_MATRIX === '1';
const useDevServer = process.env.PLAYWRIGHT_USE_DEV_SERVER === '1';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // Video requires Playwright's bundled ffmpeg. Keep it for CI, disable locally to
    // allow running on environments where Playwright can't download its deps.
    video: process.env.CI ? 'retain-on-failure' : 'off',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  projects: fullMatrix
    ? [
        {
          name: 'chromium',
          use: {
            ...devices['Desktop Chrome'],
            launchOptions: chromiumExecutablePath ? { executablePath: chromiumExecutablePath } : undefined,
          },
        },
        {
          name: 'firefox',
          use: { ...devices['Desktop Firefox'] },
        },
        {
          name: 'webkit',
          use: { ...devices['Desktop Safari'] },
        },
        {
          name: 'Mobile Chrome',
          use: {
            ...devices['Pixel 5'],
            launchOptions: chromiumExecutablePath ? { executablePath: chromiumExecutablePath } : undefined,
          },
        },
        {
          name: 'Mobile Safari',
          use: { ...devices['iPhone 12'] },
        },
      ]
    : [
        // Local default: keep the suite runnable on environments where Playwright
        // can't download its bundled browsers (e.g. Ubuntu 26.04).
        {
          name: 'chromium',
          use: {
            ...devices['Desktop Chrome'],
            launchOptions: chromiumExecutablePath ? { executablePath: chromiumExecutablePath } : undefined,
          },
        },
        {
          name: 'Mobile Chrome',
          use: {
            ...devices['Pixel 5'],
            launchOptions: chromiumExecutablePath ? { executablePath: chromiumExecutablePath } : undefined,
          },
        },
      ],

  webServer: {
    // Dev servers (Turbopack/HMR) are faster but can be flaky under heavy parallel E2E load.
    // Default to a production build/server for determinism; opt into dev with PLAYWRIGHT_USE_DEV_SERVER=1.
    command: useDevServer
      ? `npm run dev -- -p ${playwrightPort}`
      : `npm run build:vercel && VERCEL=1 npm run start -- -p ${playwrightPort}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 300000,
  },
});
