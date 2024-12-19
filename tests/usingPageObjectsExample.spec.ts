import { test, expect } from '@playwright/test';
import { FormLayoutsPage } from './page-objects/formLayoutsPage';
import { NavigationPage } from './page-objects/navigationPage';

test.beforeEach( async ({ page }) => {
    await page.goto('http://localhost:4200');
});

test('Navigate to forms page', async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutsPage();
    await navigateTo.datePickerPage();
    await navigateTo.smartTablePage();
    await navigateTo.toastrPage();
    await navigateTo.tooltipPage();
});

test('Parametrized methods', async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    const onFormLayoutsPage = new FormLayoutsPage(page);

    await navigateTo.formLayoutsPage();
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'welcome1', 'Option 1');
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('John Smith', 'john@test.com', true);
});