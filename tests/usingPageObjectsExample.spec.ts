import { test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { HelperBase } from '../page-objects/helperBase';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
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
  const person = HelperBase.generateRandomPerson();

  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(person.email, person.password, person.option);
  await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(person.fullName, person.email, true);
});

test('Datepicker E2E', async ({ page }) => {
  const pm = new PageManager(page);
  const numberOfDaysFromToday = faker.number.int(1500);
  const lowerRangeNumberOfDays = faker.number.int({ min: 1, max: 1500 });
  const higherRangeNumberOfDays = faker.number.int({ min: lowerRangeNumberOfDays, max: 1500 });

  await pm.navigateTo().datePickerPage();
  await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(numberOfDaysFromToday);
  await pm.onDatepickerPage().selectRangeDatepickerDateFromToday(lowerRangeNumberOfDays, higherRangeNumberOfDays);
});
