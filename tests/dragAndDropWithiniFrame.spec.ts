import { test, expect } from '@playwright/test';

test.describe('Drag and drop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/');
  });

  test('Traditional approach', async ({ page }) => {
    const iframe = page.frameLocator('[rel-title="Photo Manager"] iframe');

    await iframe.getByRole('listitem').filter({ hasText: 'High Tatras 2' }).dragTo(iframe.locator('#trash'));
    await expect(iframe.locator('#trash li h5')).toHaveText('High Tatras 2');
  });

  test('More precise control', async ({ page }) => {
    const iframe = page.frameLocator('[rel-title="Photo Manager"] iframe');

    await iframe.getByRole('listitem').filter({ hasText: 'High Tatras 4' }).hover();
    await page.mouse.down();
    await iframe.locator('#trash').hover();
    await page.mouse.up();

    await expect(iframe.locator('#trash li h5')).toHaveText('High Tatras 4');
  });
});
