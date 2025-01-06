import { test, expect } from '@playwright/test';
import { FormLayoutsPage } from './page-objects/formLayoutsPage';
import { NavigationPage } from './page-objects/navigationPage';
import { DatepickerPage } from './page-objects/datepickerPage';

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

test('Form Layouts E2E', async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    const onFormLayoutsPage = new FormLayoutsPage(page);

    await navigateTo.formLayoutsPage();
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'welcome1', 'Option 1');
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('John Smith', 'john@test.com', true);
});

test('Datepicker E2E', async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    const onDatepickerPage = new DatepickerPage(page);
    
    await navigateTo.datePickerPage();
    await onDatepickerPage.selectCommonDatepickerDateFromToday(300);
    await onDatepickerPage.selectRangeDatepickerDateFromToday(6, 15);
});