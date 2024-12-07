import { test, expect } from '@playwright/test';
import { first } from 'rxjs-compat/operator/first';

test.beforeEach( async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test.describe('Input fields', () => {
    test('Using the Grid - Assert input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', { name: "Email"} );
        
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

test.describe('Radio buttons', () => {
    test('Checking w/ getByLabel - NOT RECOMMENDED', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" });
        const radioOne = usingTheGridForm.getByLabel('Option 1');
        const radioTwo = usingTheGridForm.getByLabel('Option 2');

        // The radio button has class "visually-hidden", so PW check would wait for the visibility then fail because element isn't visible. That's why we use  {force: true}
        await radioOne.check({ force: true });

        // Generic assertion - NOT RECOMMENDED
        expect(await radioOne.isChecked()).toBeTruthy();
        expect(await radioTwo.isChecked()).toBeFalsy();
    });

    test('Checking w/ getByRole - PREFERRED', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" });
        const radioOne = usingTheGridForm.getByRole('radio', { name: "Option 1"});
        const radioTwo = usingTheGridForm.getByRole('radio', { name: "Option 2" });

        // The radio button has class "visually-hidden", so PW check would wait for the visibility then fail because element isn't visible. That's why we use  {force: true}
        await radioOne.check({ force: true });

        // Locator assertion
        await expect(radioOne).toBeChecked();
        await expect(radioTwo).not.toBeChecked();

        await radioTwo.check({ force: true });
        
        await expect(radioOne).not.toBeChecked();
        await expect(radioTwo).toBeChecked();
    });
});


