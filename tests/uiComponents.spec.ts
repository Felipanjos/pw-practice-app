import { test, expect, Locator } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Form Layouts page', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
  });

  test.describe('Input fields', () => {
    test('Using the Grid - Assert input fields', async ({ page }) => {
      const usingTheGridEmailInput = page
        .locator('nb-card', { hasText: 'Using the Grid' })
        .getByRole('textbox', { name: 'Email' });

      await usingTheGridEmailInput.fill('test@test.com');
      await usingTheGridEmailInput.clear();
      await usingTheGridEmailInput.pressSequentially('test2@test.com', { delay: 500 });

      // Generic assertion
      const emailInputValue = await usingTheGridEmailInput.inputValue();
      expect(emailInputValue).toEqual('test2@test.com');

      // Locator assertion
      await expect(usingTheGridEmailInput).toHaveValue('test2@test.com');
    });
  });

  test.describe('Radio buttons', () => {
    test('Checking w/ getByLabel - NOT RECOMMENDED', async ({ page }) => {
      const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' });
      const radioOne = usingTheGridForm.getByLabel('Option 1');
      const radioTwo = usingTheGridForm.getByLabel('Option 2');

      // The radio button has class "visually-hidden", so PW check would wait for the visibility then fail because element isn't visible. That's why we use  {force: true}
      await radioOne.check({ force: true });

      // Generic assertion - NOT RECOMMENDED
      expect(await radioOne.isChecked()).toBeTruthy();
      expect(await radioTwo.isChecked()).toBeFalsy();
    });

    test('Checking w/ getByRole - PREFERRED', async ({ page }) => {
      const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' });
      const radioOne = usingTheGridForm.getByRole('radio', { name: 'Option 1' });
      const radioTwo = usingTheGridForm.getByRole('radio', { name: 'Option 2' });

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
});

test.describe('Smart table', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByTitle('Tables & Data').click();
    await page.getByTitle('Smart Table').click();
    await expect(page).toHaveURL('/pages/tables/smart-table');
  });

  test('Find row and field through text', async ({ page }) => {
    // Get row by text in this row
    const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' });
    const ageInput = page.locator('input-editor').getByPlaceholder('Age');

    // Open edition and change the value in there
    await targetRow.locator('.nb-edit').click();
    await ageInput.clear();
    await ageInput.fill('35');
    await targetRow.locator('.nb-checkmark').click();
  });

  test('Find row + column combination', async ({ page }) => {
    const tableNavigation = page.getByRole('navigation').getByRole('list');
    const secondPage = tableNavigation.getByText('2');

    await secondPage.click();
    await expect(secondPage).toContainText('current');

    // const targetRowById = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText('11')});
    // const targetRowById = page.locator('tr', { has: page.locator('td').nth(2).getByText('11')});
    const targetRowById = page.getByRole('row').filter({ has: page.locator('td').nth(1).getByText('11') });
    await targetRowById.locator('.nb-edit').click();

    const emailField = page.locator('input-editor').getByPlaceholder('E-mail');
    await emailField.clear();
    await emailField.fill('test@test.com');
    await page.locator('.nb-checkmark').click();
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com');
  });

  test("Table's filter functionality", async ({ page }) => {
    const ages = ['20', '30', '40', '200'];
    const ageInputField = page.getByPlaceholder('Age');

    for (const age of ages) {
      await ageInputField.fill(age);
      const rowsFilteredByAge = page.locator('tbody').getByRole('row');
      await page.waitForTimeout(500);

      if (age === '200') await expect(page.getByRole('table')).toContainText('No data found');
      else
        for (const row of await rowsFilteredByAge.all()) {
          const lastCell = row.getByRole('cell').last();
          await expect(lastCell).toHaveText(age);
        }
    }
  });
});

test.describe('Tooltips', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByTitle('Modal & Overlays').click();
    await page.getByTitle('Tooltip').click();
    await expect(page).toHaveURL('/pages/modal-overlays/tooltip');
  });

  test('Assert lifecycle', async ({ page }) => {
    const tooltip = page.locator('nb-tooltip', {
      hasText: 'This is a tooltip',
    });

    await expect(tooltip).toBeHidden();

    await page.getByRole('button', { name: 'Top' }).hover();

    await expect(tooltip).toBeVisible();

    await page.mouse.move(0, 0);

    await expect(tooltip).toBeHidden();
  });

  test('Assert text content', async ({ page }) => {
    const tooltip = page.locator('nb-tooltip');
    await page.getByRole('button', { name: 'Top' }).hover();
    await expect(tooltip).toHaveText('This is a tooltip');
  });

  test('Positioning above button', async ({ page }) => {
    const tooltip = page.locator('nb-tooltip', {
      hasText: 'This is a tooltip',
    });
    const buttonBox = await page.getByRole('button', { name: 'Top' }).boundingBox();
    await page.getByRole('button', { name: 'Top' }).hover();
    const tooltipBox = await tooltip.boundingBox();

    await page.screenshot({ path: 'test-results/screenshots/tooltip-test.png' });

    expect(tooltipBox).not.toBeNull(); // Ensure it exists
    expect(tooltipBox!.y + tooltipBox!.height).toBeLessThan(buttonBox!.y); // Example for horizontal positioning
  });
});

test.describe('Dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByTitle('Tables & Data').click();
    await page.getByTitle('Smart Table').click();
    await expect(page).toHaveURL('/pages/tables/smart-table');
  });

  test('Delete row and confirm dialog', async ({ page }) => {
    const targetMail = 'mdo@gmail.com';
    const targetRow = page.getByRole('table').locator('tr', { hasText: targetMail });

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toEqual('Are you sure you want to delete?');
      await dialog.accept();
    });

    await targetRow.locator('.nb-trash').click();

    await expect(targetRow).toHaveCount(0);
  });
});

test.describe('Checkboxes', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByTitle('Modal & Overlays').click();
    await page.getByTitle('Toastr').click();
    await expect(page).toHaveURL('/pages/modal-overlays/toastr');
  });

  test('Click on first checkbox', async ({ page }) => {
    const firstCheckbox = page.getByRole('checkbox', { name: 'Hide on click' });
    await expect(firstCheckbox).toBeChecked();

    // Recommended method of handling checkboxes is setCheck() instead of click() or check()/uncheck()
    await firstCheckbox.setChecked(false, { force: true });
    await expect(firstCheckbox).not.toBeChecked();

    await firstCheckbox.setChecked(true, { force: true });
    await expect(firstCheckbox).toBeChecked();

    const secondCheckbox = page.getByRole('checkbox', {
      name: 'Prevent arising of duplicate toast',
    });
    await expect(secondCheckbox).not.toBeChecked();

    await secondCheckbox.setChecked(true, { force: true });
    await expect(secondCheckbox).toBeChecked();

    // Unselect all cheeckboxes
    const allCheckBoxes = page.getByRole('checkbox');

    // all() will create an array from those locators
    for (let box of await allCheckBoxes.all()) {
      await box.setChecked(true, { force: true });
      await expect(box).toBeChecked();
      await box.setChecked(false, { force: true });
      await expect(box).not.toBeChecked();
    }
  });
});

test.describe('Sliders', () => {
  test.beforeEach(async ({ page }) => {
    await expect(page).toHaveURL('/pages/iot-dashboard');
  });
  test('Slide with JS shortcut ', async ({ page }) => {
    const temperatureGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
    await temperatureGauge.evaluate((node) => {
      node.setAttribute('cx', '232.630');
      node.setAttribute('cy', '232.630');
    });
    await temperatureGauge.click();
  });

  test('Slide to max temperature', async ({ page }) => {
    // Constants
    const MAX_TEMPERATURE = '30';
    const temperatureLocator = '[tabtitle="Temperature"] ngx-temperature-dragger';

    // Select the temperature component
    const temperatureComponent = page.locator(temperatureLocator);
    await temperatureComponent.scrollIntoViewIfNeeded();

    // Function to drag the slider
    async function dragSliderToMax(slider: Locator) {
      const boundingBox = await slider.boundingBox();
      if (!boundingBox) throw new Error('Bounding box not found');

      const { x, y, width, height } = boundingBox;
      const startX = x + width / 2;
      const startY = y + height / 2;
      const dragDistance = 100; // Adjust this distance based on UI behavior

      // Drag slider horizontally to the right
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX + dragDistance, startY);
      await page.mouse.move(startX + dragDistance, startY + dragDistance);
      await page.mouse.up();
    }

    // Drag the temperature slider
    await dragSliderToMax(temperatureComponent);

    // Assertion
    await expect(temperatureComponent).toContainText(MAX_TEMPERATURE);
  });

  test('Slide to minimum temperature', async ({ page }) => {
    // Constants
    const MINIMUM_TEMPERATURE = '12';
    const temperatureLocator = '[tabtitle="Temperature"] ngx-temperature-dragger';

    // Select the temperature component
    const temperatureComponent = page.locator(temperatureLocator);
    await temperatureComponent.scrollIntoViewIfNeeded();

    // Function to drag the slider
    async function dragSliderToMinimum(slider: Locator) {
      const boundingBox = await slider.boundingBox();
      if (!boundingBox) throw new Error('Bounding box not found');

      const { x, y, width, height } = boundingBox;
      const startX = x + width / 2;
      const startY = y + height / 2;
      const dragDistance = 100; // Adjust this distance based on UI behavior

      // Drag slider horizontally to the right
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX - dragDistance, startY);
      await page.mouse.move(startX - dragDistance, startY + dragDistance + 20);
      await page.mouse.up();
    }

    // Drag the temperature slider
    await dragSliderToMinimum(temperatureComponent);

    // Assertion
    await expect(temperatureComponent).toContainText(MINIMUM_TEMPERATURE);
  });
});

test.describe('Theme selector dropdown', () => {
  test.beforeEach(async ({ page }) => {
    await expect(page).toHaveURL('/pages/iot-dashboard');
    await expect(page.getByText('PW-test')).toBeVisible();
  });
  test('Assert one theme on the list', async ({ page }) => {
    // USE GET BY ROLE LIST(UL) & LISTITEM(LI) IS RECOMMENDED WHEN POSSIBLE
    const themeSelectorDropdown = page.locator('ngx-header nb-select');

    await themeSelectorDropdown.click();

    const optionList = page.locator('nb-option-list nb-option');

    await expect(optionList).toContainText(['Light', 'Dark', 'Cosmic', 'Corporate']);
    await optionList.filter({ hasText: 'Cosmic' }).click();

    const header = page.locator('nb-layout-header');

    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');
    await expect(page.locator('body')).toHaveClass(/nb-theme-cosmic/);
  });

  test('Assert multiple themes', async ({ page }) => {
    const themeSelectorDropdown = page.locator('ngx-header nb-select');

    await themeSelectorDropdown.click();

    const optionList = page.locator('nb-option-list nb-option');
    const header = page.locator('nb-layout-header');
    const colors = {
      Light: 'rgb(255, 255, 255)',
      Dark: 'rgb(34, 43, 69)',
      Cosmic: 'rgb(50, 50, 89)',
      Corporate: 'rgb(255, 255, 255)',
    };

    for (const color in colors) {
      await optionList.filter({ hasText: color }).click();
      await expect(header).toHaveCSS('background-color', colors[color]);

      const pattern = new RegExp(`nb-theme-${color === 'Light' ? 'default' : color.toLocaleLowerCase()}`);

      await expect(page.locator('body')).toHaveClass(pattern);

      if (color != 'Corporate') await themeSelectorDropdown.click();
    }
  });
});

test.describe('Common Datepicker Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByTitle('Forms').click();
    await page.getByTitle('Datepicker').click();
    await expect(page).toHaveURL('/pages/forms/datepicker');
  });

  // todo put utility functions into POM
  // todo put locators into POM
  test('Navigate and select a future date', async ({ page }) => {
    // Selectors
    const calendarMonthYearSelector = page.locator('nb-calendar-view-mode');
    const nextMonthButtonSelector = page.locator('button [data-name="chevron-right"]');
    const dayCellSelector = page.locator('nb-calendar-day-cell.day-cell.ng-star-inserted');

    // Utility function: Get the formatted date details
    const getTargetDateDetails = (daysInFuture: number) => {
      const date = new Date();
      const getMonth = (length: 'short' | 'long'): string => {
        return date.toLocaleString('en-US', { month: length });
      };
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
