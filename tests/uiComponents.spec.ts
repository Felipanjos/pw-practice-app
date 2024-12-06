import { test, expect } from '@playwright/test';

test.beforeEach( async ({ page }) => {
    await page.goto('http://localhost:4200/');
});

test.describe('Form Layouts page', () => {
    test.beforeEach( async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('Input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"});
        
        await usingTheGridEmailInput.fill('test@test.com');
        await usingTheGridEmailInput.clear();
        await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500});

        // Generic assertion
        const emailInputValue = await usingTheGridEmailInput.inputValue();
        expect(emailInputValue).toEqual('test2@test.com');

        // Locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com');
    });
});