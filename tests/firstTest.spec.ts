import { test, expect } from '@playwright/test';
import { first } from 'rxjs-compat/operator/first';

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

	test('Parent elements', async ({ page }) => {
		// Q: How to find a parent nb-card from a child which has text "Using the Grid"?
		// A: Provide a second locator and filter the output of first locator 
		// #1 - By text
		await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: "Email"}).click();
		
		// #2 - By another locator
		await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click();

		// #3 - dedicated PW filter method
		await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click();
		await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click();

		// Q: Why use filter if we can use built-in?
		// A:If you want to use user-facing locators, they can't use built-in, only the dedicated method. You can also chain multiple filters.

		// #4 - Chaining multiple filters to create an unique output
		await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click();

		// #5 - NOT RECOMMENDED - XPath, go one level up on DOM
		await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click();
	});

	test.describe('Reusing locators', () => {
		test.skip('Performing multiple actions with copy pasting', async ({ page }) => {
			await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).fill('test@test.com');
			await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Password"}).fill('welcome123');
			await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('button').click();
		});

		test('Simplifying', async ({ page }) =>{
			// assign locators to constants to create abstraction and less copy-pasted code
			const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
			const emailField = basicForm.getByRole('textbox', {name: "Email"});
			const passwordField = basicForm.getByRole('textbox', {name: "Password"});

			await emailField.fill('test@test.com');
			await passwordField.fill('welcome123');
			await basicForm.locator('nb-checkbox').click();
			await basicForm.getByRole('button').click();

			await expect(emailField).toHaveValue('test@test.com');
		});
	});

	test.describe('Extracting values', () => {
		test('Single value', async ({ page }) => {
			const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
			const buttonText = await basicForm.locator('button').textContent();
			// Then assert if matches the expected
			expect(buttonText).toEqual('Submit');
		});

		test('Multiple values', async ({ page }) => {
			const radioLocator = page.locator('nb-radio');
			const allRadioButtonsLabels = await radioLocator.allTextContents();
			expect(allRadioButtonsLabels).toContain("Option 1");
			
			// for this one I'd get the field like Option 1 and compare with Option 1, which doesn't really make sense...
			// Another strategy would be to get first element of list and expect to be Option 1, then would be good 
			const firstRadioButtonLabel = await radioLocator.first().textContent();
			expect(firstRadioButtonLabel).toEqual("Option 1");
			// worked!!
		});

		test('Input value', async ({ page }) => {
			const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
			const emailField = basicForm.getByRole('textbox', {name: "Email"});
			await emailField.fill('test@test.com');
			const emailValue = await emailField.inputValue();
			expect(emailValue).toEqual('test@test.com');
		});

		test('Attribute value', async ({ page }) => {
			const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
			const emailField = basicForm.getByRole('textbox', {name: "Email"});

			const placeholderValue = await emailField.getAttribute('placeholder');
			expect(placeholderValue).toEqual('Email');
		});
	});

	test.describe('Assertions', () => {
		test('General assertions', async ({ page }) => {
			const value = 5;
			expect(value).toEqual(5)
			// compare left value with right value

			const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button');

			const basicFormButtonText = await basicFormButton.textContent();
			expect(basicFormButtonText).toEqual('Submit');
			// general assertions don't wait
		});

		test('Locator assertions', async ({ page }) => {
			const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button');
			// instead of providing exact value, we give the locator
			await expect(basicFormButton).toHaveText('Submit');
			// this needs await, can wait for 5 seconds
		});
	})
});

