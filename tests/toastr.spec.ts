import { test, expect } from '@playwright/test';

test.beforeEach( async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByTitle('Modal & Overlays').click();
    await page.getByTitle('Toastr').click();
    await expect(page).toHaveURL('http://localhost:4200/pages/modal-overlays/toastr');
});

test.describe('Checkboxes', () => {
    test('Click on first checkbox', async ({ page }) => {
        const firstCheckbox = page.getByRole('checkbox', { name: "Hide on click"} );
        await expect(firstCheckbox).toBeChecked();
    });
});