import { test, expect } from '@playwright/test';

test.beforeEach( async ({ page }) => {
    await page.goto('http://localhost:4200');
    await page.getByTitle('Forms').click();
    await page.getByTitle('Datepicker').click();
    await expect(page).toHaveURL('http://localhost:4200/pages/forms/datepicker');
});

test.describe('Common Datepicker Component', () => {
  test('Navigate and select a future date', async ({ page }) => {
    // Selectors
    const calendarMonthYearSelector = page.locator('nb-calendar-view-mode');
    const nextMonthButtonSelector = page.locator('button [data-name="chevron-right"]');
    const dayCellSelector = page.locator('nb-calendar-day-cell.day-cell.ng-star-inserted');

    // Utility function: Get the formatted date details
    const getTargetDateDetails = (daysInFuture: number) => {
      const date = new Date();
      const getMonth = (length: 'short' | 'long'): string => { return date.toLocaleString('en-US', { month: length}) };
      date.setDate(date.getDate() + daysInFuture);

      return {
        day: date.getDate().toString(),
        monthShort: getMonth('short'),
        monthLong: getMonth('long'),
        year: date.getFullYear(),
      };
    };

    // Utility function: Navigate to the target month and year
    const navigateToTargetMonth = async (targetMonthYear: string) => {
      let currentMonthYear = await calendarMonthYearSelector.textContent();

      while (!currentMonthYear.includes(targetMonthYear)) {
        await nextMonthButtonSelector.click();
        currentMonthYear = await calendarMonthYearSelector.textContent();
      }
    };

    // Step 1: Open the calendar input
    const calendarInputField = page.getByPlaceholder('Form Picker');
    await calendarInputField.click();

    // Step 2: Calculate target date
    const DAYS_IN_FUTURE = 300;
    const { day, monthShort, monthLong, year } = getTargetDateDetails(DAYS_IN_FUTURE);
    const expectedDate = `${monthShort} ${day}, ${year}`;
    const targetMonthYear = `${monthLong} ${year}`;

    // Step 3: Navigate to the target month and year
    await navigateToTargetMonth(targetMonthYear);

    // Step 4: Select the day cell
    await dayCellSelector.getByText(day, { exact: true }).click();

    // Step 5: Assert the value in the calendar input
    await expect(calendarInputField).toHaveValue(expectedDate);
  });
});
