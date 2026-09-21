import { test, expect } from '@playwright/test';

test.describe('Vehicle P&L', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/finance/vehicle-pnl');
  });

  test('displays page and KPI cards', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Vehicle P&L', exact: true })).toBeVisible();

    for (const label of [
      'Fleet Revenue',
      'Fleet Gross Profit',
      'Gross Margin',
      'Revenue / Cost per KM',
    ]) {
      await expect(page.getByText(label, { exact: true })).toBeVisible();
    }

    await expect(page.getByRole('combobox')).toBeVisible();
  });

  test('displays profitability charts and breakdown', async ({ page }) => {
  await expect(page.getByText('Most Profitable Vehicles', { exact: true })).toBeVisible();
  await expect(page.getByText('Top 10 by gross profit', { exact: true })).toBeVisible();
  await expect(page.getByText('Fleet Cost Breakdown', { exact: true })).toBeVisible();

  await expect(page.locator('svg').count()).resolves.toBeGreaterThan(0);
});

  test('fleet filter shows selected vehicle', async ({ page }) => {
    const select = page.getByRole('combobox');

    await select.selectOption({ label: 'MLX-101' });

    const table = page.getByRole('table');
    await expect(table.getByText('MLX-101', { exact: true })).toBeVisible();
    await expect(table.getByText('MLX-102', { exact: true })).not.toBeVisible();
  });

  test('vehicle row navigates to vehicle details', async ({ page }) => {
    await page.getByRole('row').filter({ hasText: 'MLX-101' }).click();

    await expect(page).toHaveURL(/\/fleet\/vehicles\/VEH-101$/);
  });

  test('fleet filter can reset to all fleet', async ({ page }) => {
    const select = page.getByRole('combobox');

    await select.selectOption({ label: 'MLX-101' });
    await expect(page.getByRole('table').getByText('MLX-101', { exact: true })).toBeVisible();

    await select.selectOption('');

    await expect(page.getByRole('table').getByText('MLX-102', { exact: true })).toBeVisible();
  });
});


