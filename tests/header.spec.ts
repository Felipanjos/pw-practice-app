import { test, expect } from '@playwright/test';

test.beforeEach( async ({page}) => {
    await page.goto('http://localhost:4200');
    await expect(page).toHaveURL('http://localhost:4200/pages/iot-dashboard');
    await expect(page.getByText('PW-test')).toBeVisible();
});

test.describe('Theme selector dropdown', () => {
    test('Assert theme list', async ({ page }) => {
        const themeSelectorDropdown = page.locator('ngx-header nb-select');
        await themeSelectorDropdown.click();

        // ul tag - page.getByRole('list');
        // li tag - page.getByRole('listItem');

        const optionList = page.locator('nb-option-list nb-option');
        await expect(optionList).toContainText(["Light", "Dark", "Cosmic", "Corporate"]);

        await optionList.filter({ hasText: "Cosmic"} ).click();
        
        const header = page.locator('nb-layout-header');
        await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

        const bodyClassList = await page.locator('body').getAttribute('class');
        expect(bodyClassList).toContain('nb-theme-cosmic');
    });
});