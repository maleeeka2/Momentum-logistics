import { test, expect } from '@playwright/test';

test.describe('Fleet Drivers Functional Tests', () => {

  test('should display Drivers page and summary', async ({ page }) => {
    await page.goto('/fleet/drivers');

    await expect(
      page.getByRole('heading', { name: 'Drivers' })
    ).toBeVisible();

    await expect(page.getByText('Total Drivers')).toBeVisible();
    await expect(page.getByText('Currently On Trip')).toBeVisible();
    await expect(page.getByText('Avg. Rating')).toBeVisible();
    await expect(page.getByText('Licenses Expiring Soon')).toBeVisible();

    await expect(
      page.getByPlaceholder('Search name, license, phone...')
    ).toBeVisible();
  });

  test('should filter drivers by search text', async ({ page }) => {
    await page.goto('/fleet/drivers');

    const search = page.getByPlaceholder(
      'Search name, license, phone...'
    );

    await search.fill('DR');

    await expect(search).toHaveValue('DR');
    await expect(page.getByText('Clear filters')).toBeVisible();
  });

  test('should filter drivers by status and clear filters', async ({ page }) => {
    await page.goto('/fleet/drivers');

    const statusSelect = page.locator('select').first();

    await statusSelect.selectOption({ label: 'Active' });

    await expect(page.getByText('Clear filters')).toBeVisible();

    await page.getByText('Clear filters', { exact: true }).click();

    await expect(statusSelect).toHaveValue('');
    await expect(
      page.getByPlaceholder('Search name, license, phone...')
    ).toHaveValue('');
  });

  test('should navigate to driver details when a driver is clicked', async ({ page }) => {
    await page.goto('/fleet/drivers');

    const firstRow = page.locator('tbody tr').first();

    await expect(firstRow).toBeVisible();

    await firstRow.click();

    await expect(page).toHaveURL(/\/fleet\/drivers\/.+/);
  });

  test('should display driver table information', async ({ page }) => {
    await page.goto('/fleet/drivers');

    await expect(page.getByText('Driver', { exact: true })).toBeVisible();
    await expect(page.getByText('Contact', { exact: true })).toBeVisible();
    await expect(page.getByText('License #', { exact: true })).toBeVisible();
    await expect(page.getByText('License Expiry', { exact: true })).toBeVisible();
    await expect(page.getByText('Assigned Vehicle', { exact: true })).toBeVisible();
    await expect(page.getByText('Status', { exact: true })).toBeVisible();
    await expect(page.getByRole('table').getByText('Trips', { exact: true })).toBeVisible();
    await expect(page.getByRole('table').getByText('Rating', { exact: true })).toBeVisible();
    await expect(page.getByRole('table').getByText('Incidents', { exact: true })).toBeVisible();
  });

});
