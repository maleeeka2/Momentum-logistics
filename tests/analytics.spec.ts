import { test, expect } from '@playwright/test';

test.describe('Analytics', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/analytics');
  });

  test('displays Analytics page and KPI cards', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Analytics', exact: true })).toBeVisible();

    for (const label of [
      'Avg. Trip Margin',
      'Top Customer',
      'Most Profitable Route',
      'Fleet Fuel Efficiency',
    ]) {
      await expect(page.getByText(label, { exact: true })).toBeVisible();
    }
  });

  test('displays all analytics charts', async ({ page }) => {
    for (const title of [
      'Revenue by Customer',
      'Profit by Route',
      'Revenue vs Cost by Vehicle Type',
      'Driver Performance',
    ]) {
      await expect(page.getByText(title, { exact: true })).toBeVisible();
    }

    await expect(page.locator('svg')).not.toHaveCount(0);
  });

  test('displays customer profitability section', async ({ page }) => {
    await expect(
      page.getByText('Customer Profitability', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText('Ranked by contract value and outstanding balance', { exact: true })
    ).toBeVisible();
  });

  test('displays customer profitability records', async ({ page }) => {
  await expect(page.getByText('Credit Limit', { exact: true }).last()).toBeVisible();
  await expect(page.getByText('Outstanding', { exact: true }).last()).toBeVisible();
});

  test('analytics page renders chart containers', async ({ page }) => {
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('svg').first()).toBeVisible();
  });
});

