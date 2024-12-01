import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:4200/');
	await page.getByText('Forms').click();
	await page.getByText('Form Layout').click();
});

test.describe('Interaction with web elements', () => {
    test('Locator syntax rules', async ({ page }) => {
		// by Tag name - Will find a lot of elements 
		page.locator('input');

		// by ID
		page.locator('#inputEmail');

		// by Class value
		page.locator('.shape-rectangle');

		// by attribute
		page.locator('[placeholder="Email"]');

		// by Class value (full)
		page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

		// combine different selectors
		page.locator('input[placeholder="email"][nbinput]');

		// by XPath - NOT A GOOD PRACTICE. PW docs recommends user-visible locators 
		page.locator('//*[@id="inputEmail1"]');

		// by partial text match
		page.locator(':text("Using")');

		// by exact text match
		page.locator(':text-is("Using the Grid")');
  	});

	test('User facing locators', async ({ page }) => {
		// main method to use fist. Role is type of element to interact 
		await page.getByRole('textbox', {name: "Email"}).first().click();
		await page.getByRole('button', {name: "Sign in"}).first().click();

		await page.getByLabel('Email').first().click();

		await page.getByPlaceholder('Jane Doe').click();

		await page.getByText('Using the Grid').click();

		// await page.getByTitle('IoT Dashboard').click();

		// pretty good practice, but not a user-facing interaction
		await page.getByTestId('sign-in-button').click();
	});

	test('Child elements', async ({ page }) => {
		// compact form factor 
		await page.locator('nb-card nb-radio :text-is("Option 1")').click();
		// chaining locators, full length
		await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();

		// if you need to find nested elements, mixing normal and user-facing locators
		// AVOID USING POSITION
		await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click();

		// LEAST PREFERABLE APPROACH, AVOID
		await page.locator('nb-card').nth(3).getByRole('button').click();
	});
});

