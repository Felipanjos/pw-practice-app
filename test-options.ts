import { test as base } from '@playwright/test';
import { PageManager } from './page-objects/pageManager';
import { HelperBase } from './page-objects/helperBase';
import { RandomPerson } from './page-objects/randomPerson';

export type TestOptions = {
  globalsQaURL: string;
  formLayoutsPage: string;
  pageManager: PageManager;
  randomPerson: RandomPerson;
};

export const test = base.extend<TestOptions>({
  globalsQaURL: ['', { option: true }],

  formLayoutsPage: async ({ page, pageManager }, use) => {
    pageManager.navigateTo().formLayoutsPage();
    await use('');
  },

  pageManager: async ({ page }, use) => {
    await use(new PageManager(page));
  },

  randomPerson: async ({}, use) => {
    await use(HelperBase.generateRandomPerson());
  },
});
