import { defineConfig, devices } from '@playwright/test'

// Allow overriding the base URL via environment variable for testing deployed versions
const baseURL = process.env.TEST_BASE_URL ?? 'http://localhost:5173'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 60000,
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: process.env.CI
    ? [
        // In CI, only start the web dev server (backend is started separately in workflow)
        {
          command: 'pnpm dev',
          url: 'http://localhost:5173',
          cwd: '..',
          reuseExistingServer: false,
          timeout: 120000,
        },
      ]
    : [
        // Locally, start both backend and frontend
        {
          command: 'pnpm db:migrate && pnpm dev',
          url: 'http://localhost:8787',
          cwd: '../../server',
          reuseExistingServer: true,
          timeout: 120000,
        },
        {
          command: 'pnpm dev',
          url: 'http://localhost:5173',
          cwd: '..',
          reuseExistingServer: true,
          timeout: 120000,
        },
      ],
})
