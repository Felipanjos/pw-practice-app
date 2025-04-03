import { test, expect, Locator } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/pages/iot-dashboard');
});

test.describe('Sliders', () => {
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
