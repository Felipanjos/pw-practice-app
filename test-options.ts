import { test as base } from '@playwright/test';
import { PageManager } from './page-objects/pageManager';
import { HelperBase, RandomPerson } from './page-objects/helperBase';

export type TestOptions = {
  globalsQaURL: string;
  formLayoutsPage: string;
  pageManager: PageManager;
  randomPerson: RandomPerson;
};

export const test = base.extend<TestOptions>({
  globalsQaURL: ['', { option: true }],

  formLayoutsPage: async ({ page }, use) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await use('');
  },

  pageManager: async ({ page, formLayoutsPage }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },

  randomPerson: async ({ page }, use) => {
    await use(HelperBase.generateRandomPerson());
  }
});
