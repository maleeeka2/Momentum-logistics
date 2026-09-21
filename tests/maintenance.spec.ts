import { test, expect } from '@playwright/test';

test.describe('Maintenance Functional Tests', () => {

  test('should display Maintenance page and summary cards', async ({ page }) => {
    await page.goto('/maintenance');

    await expect(
      page.getByRole('heading', { name: 'Maintenance', exact: true })
    ).toBeVisible();

    await expect(page.getByText('Active Work Orders', { exact: true })).toBeVisible();
    await expect(page.getByText('Maintenance Cost (MTD)', { exact: true })).toBeVisible();
    await expect(page.locator('p').filter({ hasText: 'Awaiting Parts' }).first()).toBeVisible();
    await expect(page.getByText('PM Due (14 days)', { exact: true })).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'New Work Order' })
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Export' })
    ).toBeVisible();
  });

  test('should display maintenance work orders and table columns', async ({ page }) => {
    await page.goto('/maintenance');

    const main = page.getByRole('main');

    await expect(main.getByText('WO-2026-3301', { exact: true })).toBeVisible();
    await expect(main.getByText('WO-2026-3298', { exact: true })).toBeVisible();
    await expect(main.getByText('WO-2026-3295', { exact: true })).toBeVisible();
    await expect(main.getByText('WO-2026-3288', { exact: true })).toBeVisible();
    await expect(main.getByText('WO-2026-3271', { exact: true })).toBeVisible();
    await expect(main.getByText('WO-2026-3260', { exact: true })).toBeVisible();
    await expect(main.getByText('WO-2026-3245', { exact: true })).toBeVisible();

    const table = main.getByRole('table');

    await expect(table.getByText('WO #', { exact: true })).toBeVisible();
    await expect(table.getByText('Vehicle', { exact: true })).toBeVisible();
    await expect(table.getByText('Category', { exact: true })).toBeVisible();
    await expect(table.getByText('Problem', { exact: true })).toBeVisible();
    await expect(table.getByText('Workshop', { exact: true })).toBeVisible();
    await expect(table.getByText('Start Date', { exact: true })).toBeVisible();
    await expect(table.getByText('Cost', { exact: true })).toBeVisible();
    await expect(table.getByText('Warranty', { exact: true })).toBeVisible();
    await expect(table.getByText('Status', { exact: true })).toBeVisible();
  });

  test('should filter work orders by search', async ({ page }) => {
    await page.goto('/maintenance');

    const search = page.getByPlaceholder('Search WO #, vehicle, problem...');

    await search.fill('WO-2026-3301');

    await expect(page.getByText('WO-2026-3301', { exact: true })).toBeVisible();
    await expect(page.getByText('WO-2026-3298', { exact: true })).not.toBeVisible();

    await search.fill('GPS');

    await expect(page.getByText('WO-2026-3295', { exact: true })).toBeVisible();
    await expect(page.getByText('WO-2026-3301', { exact: true })).not.toBeVisible();
  });

  test('should filter work orders by status and clear filters', async ({ page }) => {
    await page.goto('/maintenance');

    const status = page.locator('select').first();

    await status.selectOption({ label: 'Completed' });

    await expect(page.getByText('WO-2026-3288', { exact: true })).toBeVisible();
    await expect(page.getByText('WO-2026-3271', { exact: true })).toBeVisible();
    await expect(page.getByText('WO-2026-3260', { exact: true })).toBeVisible();
    await expect(page.getByText('WO-2026-3245', { exact: true })).toBeVisible();

    await expect(page.getByText('WO-2026-3301', { exact: true })).not.toBeVisible();
    await expect(page.getByText('WO-2026-3298', { exact: true })).not.toBeVisible();

    await page.getByRole('button', { name: 'Clear filters' }).click();

    await expect(page.getByText('WO-2026-3301', { exact: true })).toBeVisible();
    await expect(page.getByText('WO-2026-3298', { exact: true })).toBeVisible();
  });

  test('should display preventive maintenance due vehicles', async ({ page }) => {
    await page.goto('/maintenance');

    await expect(
      page.getByText('Preventive Maintenance Due', { exact: true })
    ).toBeVisible();

    const main = page.getByRole('main');

    await expect(main.getByText('MLX-104', { exact: true })).toBeVisible();
    await expect(main.getByRole('button', { name: /MLX-107/ })).toBeVisible();
    await expect(main.getByRole('button', { name: /MLX-112/ })).toBeVisible();
  });

  test('should navigate to vehicle details from PM due section', async ({ page }) => {
    await page.goto('/maintenance');

    const vehicleButton = page.getByRole('button', { name: /MLX-104/ }).first();

    await expect(vehicleButton).toBeVisible();
    await vehicleButton.click();

    await expect(page).toHaveURL(/\/fleet\/vehicles\/VEH-104/);
  });

});



