import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByText('Forms').click();
  await page.getByText('Form Layout').click();
});

test('Locator syntax rules', async ({ page }) => {
    // by Tag name - Will find a lot of elements 
    page.locator('input');

    // by ID
    page.locator('#inputEmail');

    // by Class value
    page.locator('.shape-rectangle');

    // by attribute
    page.locator('[placeholder="Email"]');

    // by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

    // combine different selectors
    page.locator('input[placeholder="email"][nbinput]');

    // by XPath - NOT A GOOD PRACTICE. PW docs recommends user-visible locators 
    page.locator('//*[@id="inputEmail1"]');

    // by partial text match
    page.locator(':text("Using")');

    // by exact text match
    page.locator(':text-is("Using the Grid")');
});

