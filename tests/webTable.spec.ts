import { test, expect } from '@playwright/test'; 
import { table } from 'console';

test.beforeEach( async ({ page }) => {
    await page.goto('http://localhost:4200');
    await page.getByTitle('Tables & Data').click();
    await page.getByTitle('Smart Table').click();
    await expect(page).toHaveURL('http://localhost:4200/pages/tables/smart-table');
});

test.describe('Smart table', () => {
    test('Find row and field through text', async ({ page }) => {
        // Get row by text in this row
        const targetRow = page.getByRole('row', { name: "twitter@outlook.com"} );
        const ageInput = page.locator('input-editor').getByPlaceholder('Age');

        // Open edition and change the value in there 
        await targetRow.locator('.nb-edit').click();
        await ageInput.clear();
        await ageInput.fill('35');
        await targetRow.locator('.nb-checkmark').click();
    });

    test('Find row + column combination', async ({ page }) => {
        const tableNavigation = page.getByRole('navigation').getByRole('list');
        const secondPage = tableNavigation.getByText('2');

        await secondPage.click();
        await expect(secondPage).toContainText("current");
    });
}); 