import { defineConfig, devices } from '@playwright/test';
import { TestOptions } from './test-options';

require('dotenv').config();
export default defineConfig<TestOptions>({
  timeout: 40000,
  globalTimeout: 60000,

  retries: 1,
  reporter: [
    ['allure-playwright'],
    ['json', { outputFile: 'test-results/jsonReport.json' }],
    ['junit', { outputFile: 'test-results/junitReport.xml' }],
  ],

  use: {
    trace: 'on-first-retry',
    baseURL: 'http://localhost:4200',
  },

  projects: [{ name: 'chromium' }, { name: 'firefox', use: { browserName: 'firefox' } }],
});
