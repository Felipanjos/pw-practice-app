import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/pages/iot-dashboard');
  await expect(page.getByText('PW-test')).toBeVisible();
});

test.describe('Theme selector dropdown', () => {
  test('Assert one theme on the list', async ({ page }) => {
    // USE GET BY ROLE LIST(UL) & LISTITEM(LI) IS RECOMMENDED WHEN POSSIBLE
    const themeSelectorDropdown = page.locator('ngx-header nb-select');
    await themeSelectorDropdown.click();

    const optionList = page.locator('nb-option-list nb-option');
    await expect(optionList).toContainText(['Light', 'Dark', 'Cosmic', 'Corporate']);

    await optionList.filter({ hasText: 'Cosmic' }).click();

    const header = page.locator('nb-layout-header');
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

    await expect(page.locator('body')).toHaveClass(/nb-theme-cosmic/);
  });

  test('Assert multiple themes', async ({ page }) => {
    const themeSelectorDropdown = page.locator('ngx-header nb-select');
    await themeSelectorDropdown.click();
    const optionList = page.locator('nb-option-list nb-option');
    const header = page.locator('nb-layout-header');

    const colors = {
      Light: 'rgb(255, 255, 255)',
      Dark: 'rgb(34, 43, 69)',
      Cosmic: 'rgb(50, 50, 89)',
      Corporate: 'rgb(255, 255, 255)',
    };

    for (const color in colors) {
      await optionList.filter({ hasText: color }).click();
      await expect(header).toHaveCSS('background-color', colors[color]);
      const pattern = new RegExp(`nb-theme-${color === 'Light' ? 'default' : color.toLocaleLowerCase()}`);

      await expect(page.locator('body')).toHaveClass(pattern);
      if (color != 'Corporate') await themeSelectorDropdown.click();
    }
  });
});
