import { test as base } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { HelperBase } from '../page-objects/helperBase';
import { RandomPerson } from '../page-objects/randomPerson';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';

export type TestOptions = {
  globalsQaURL: string;
  formLayoutsPage: FormLayoutsPage;
  pageManager: PageManager;
  randomPerson: RandomPerson;
};

export const test = base.extend<TestOptions>({
  globalsQaURL: ['', { option: true }],

  formLayoutsPage: async ({ pageManager }, use) => {
    pageManager.navigateTo().formLayoutsPage();
    await use(pageManager.onFormLayoutsPage());
  },

  pageManager: async ({ page }, use) => {
    await use(new PageManager(page));
  },

  randomPerson: async ({}, use) => {
    await use(HelperBase.generateRandomPerson());
  },
});
