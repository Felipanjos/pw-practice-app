import { test } from '@playwright/test';
import { PageManager } from './page-objects/pageManager';

test.beforeEach( async ({ page }) => {
    await page.goto('http://localhost:4200');
});

test('Navigate to forms page', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datePickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().tooltipPage();
});

test('Form Layouts E2E', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.navigateTo().formLayoutsPage();
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'welcome1', 'Option 1');
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('John Smith', 'john@test.com', true);
});

test('Datepicker E2E', async ({ page }) => {
    const pm = new PageManager(page);
    
    await pm.navigateTo().datePickerPage();
    await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(300);
    await pm.onDatepickerPage().selectRangeDatepickerDateFromToday(6, 15);
});