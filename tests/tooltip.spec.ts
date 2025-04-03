import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByTitle('Modal & Overlays').click();
  await page.getByTitle('Tooltip').click();
  await expect(page).toHaveURL('/pages/modal-overlays/tooltip');
});

test.describe('Tooltips', () => {
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

    await page.screenshot({ path: 'tooltip-test.png' });

    expect(tooltipBox).not.toBeNull(); // Ensure it exists
    expect(tooltipBox!.y + tooltipBox!.height).toBeLessThan(buttonBox!.y); // Example for horizontal positioning
  });
});
