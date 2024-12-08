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

        // Recommended method of handling checkboxes is setCheck() instead of click() or check()/uncheck()
        await firstCheckbox.setChecked(false, { force:true });
        await expect(firstCheckbox).not.toBeChecked();

        await firstCheckbox.setChecked(true, { force:true });
        await expect(firstCheckbox).toBeChecked();

        const secondCheckbox = page.getByRole('checkbox', { name: "Prevent arising of duplicate toast" });
        await expect(secondCheckbox).not.toBeChecked();

        await secondCheckbox.setChecked(true, { force:true });
        await expect(secondCheckbox).toBeChecked();

        // Unselect all cheeckboxes
        const allCheckBoxes = page.getByRole('checkbox');
        
        // all() will create an array from those locators
        for (let box of await allCheckBoxes.all()){
            await box.setChecked(true, { force:true });
            await expect(box).toBeChecked();
            await box.setChecked(false, { force:true });
            await expect(box).not.toBeChecked();
        }
    });
});