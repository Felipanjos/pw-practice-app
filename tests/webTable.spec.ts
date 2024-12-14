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
        const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' });
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
        await expect(secondPage).toContainText('current');
        
        // const targetRowById = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText('11')}); 
        // const targetRowById = page.locator('tr', { has: page.locator('td').nth(2).getByText('11')}); 
        const targetRowById = page.getByRole('row').filter({ has: page.locator('td').nth(1).getByText('11') }); 
        await targetRowById.locator('.nb-edit').click(); 
        
        const emailField = page.locator('input-editor').getByPlaceholder('E-mail');
        await emailField.clear();
        await emailField.fill('test@test.com');
        await page.locator('.nb-checkmark').click();
        await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com');
    });

    test('Table\'s filter functionality', async ({ page }) => {   
        const ages = ['20', '30', '40', '200'];
        const ageInputField = page.getByPlaceholder('Age');

        for(const age of ages){
            await ageInputField.fill(age);
            const rowsFilteredByAge = page.locator('tbody').getByRole('row');
            await page.waitForTimeout(500);

            if (age === '200')
                await expect(page.getByRole('table')).toContainText('No data found');
            else 
                for (const row of await rowsFilteredByAge.all()){
                    const lastCell = row.getByRole('cell').last();
                    await expect(lastCell).toHaveText(age);
                }
            
        };
    });
}); 