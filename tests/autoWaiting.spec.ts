import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://uitestingplayground.com/ajax');
  await page.getByText('Button Triggering AJAX Request').click();
  testInfo.setTimeout(testInfo.timeout);
});

test.describe('Auto waiting', () => {
  test('Method with built-in visibility auto wait', async ({ page }) => {
    const successButton = page.locator('.bg-success');

    await successButton.click();

    const successButtonText = await successButton.textContent();
    expect(successButtonText).toEqual('Data loaded with AJAX get request.');
  });

  test('waitFor state attached', async ({ page }) => {
    const successButton = page.locator('.bg-success');
    await successButton.waitFor({ state: 'attached' });

    const successButtonText = await successButton.allTextContents();
    expect(successButtonText).toContain('Data loaded with AJAX get request.');
  });

  test('Overwriting timeouts', async ({ page }) => {
    const successButton = page.locator('.bg-success');
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 });
  });

  test('waitForSelector', async ({ page }) => {
    const successButton = page.locator('.bg-success');

    // wait for element
    await page.waitForSelector('.bg-success');

    const successButtonText = await successButton.allTextContents();
    expect(successButtonText).toContain('Data loaded with AJAX get request.');
  });

  test('waitForResponse', async ({ page }) => {
    const successButton = page.locator('.bg-success');

    // wait for response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata');

    const successButtonText = await successButton.allTextContents();
    expect(successButtonText).toContain('Data loaded with AJAX get request.');
  });

  test('waitFor network calls to be completed - NOT RECOMMENDED', async ({ page }) => {
    const successButton = page.locator('.bg-success');

    // wait for response
    await page.waitForLoadState('networkidle');

    const successButtonText = await successButton.allTextContents();
    expect(successButtonText).toContain('Data loaded with AJAX get request.');
  });

  test('Timeouts', async ({ page }) => {
    // test.setTimeout(10000); - Hardcoded change test case timeout
    // test.slow() - multiply test time by 3x
    const successButton = page.locator('.bg-success');
    await successButton.click();
  });
});
