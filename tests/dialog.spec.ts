import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByTitle('Tables & Data').click();
  await page.getByTitle('Smart Table').click();
  await expect(page).toHaveURL('/pages/tables/smart-table');
});

test.describe('Dialog', () => {
  test('Delete row and confirm dialog', async ({ page }) => {
    const targetMail = 'mdo@gmail.com';
    const targetRow = page.getByRole('table').locator('tr', { hasText: targetMail });

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toEqual('Are you sure you want to delete?');
      await dialog.accept();
    });

    await targetRow.locator('.nb-trash').click();

    await expect(targetRow).toHaveCount(0);
  });
});
