import { defineConfig, devices } from '@playwright/test';
import { TestOptions } from './fixtures/test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout: 40000,
  globalTimeout: 60000,

  retries: 0,
  reporter: [
    ['allure-playwright', {resultsDir: 'support/allure-results'}],
    ['json', { outputFile: 'test-results/jsonReport.json' }],
    ['junit', { outputFile: 'test-results/junitReport.xml' }],
  ],

  use: {
    trace: 'on-first-retry',
    baseURL: 'http://localhost:4200',
  },

  projects: [{ name: 'chromium' }, { name: 'firefox', use: { browserName: 'firefox' } }],
});
