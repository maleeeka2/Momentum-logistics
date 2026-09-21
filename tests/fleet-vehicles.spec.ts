import { test, expect } from '@playwright/test';

test.describe('Fleet Vehicles Functional Tests', () => {

  test('should display Vehicles page and fleet summary', async ({ page }) => {
    await page.goto('/fleet/vehicles');

    await expect(
      page.getByRole('heading', { name: 'Vehicles' })
    ).toBeVisible();

    await expect(page.getByText('Total Fleet')).toBeVisible();
    await expect(page.getByText('Currently Moving')).toBeVisible();
    await expect(page.getByText('In Maintenance')).toBeVisible();
    await expect(page.getByText('Avg. Utilization')).toBeVisible();

    await expect(
      page.getByPlaceholder('Search unit, registration, model...')
    ).toBeVisible();
  });

  test('should filter vehicles by search text', async ({ page }) => {
    await page.goto('/fleet/vehicles');

    const search = page.getByPlaceholder(
      'Search unit, registration, model...'
    );

    await search.fill('VH');

    await expect(search).toHaveValue('VH');
    await expect(page.getByText('Clear filters')).toBeVisible();
  });

  test('should filter vehicles by status and clear filters', async ({ page }) => {
    await page.goto('/fleet/vehicles');

    const statusSelect = page.locator('select').nth(0);

    await statusSelect.selectOption({ label: 'Moving' });

    await expect(page.getByText('Clear filters')).toBeVisible();

    await page.getByText('Clear filters', { exact: true }).click();

    await expect(statusSelect).toHaveValue('');
    await expect(
      page.getByPlaceholder('Search unit, registration, model...')
    ).toHaveValue('');
  });

  test('should filter vehicles by type', async ({ page }) => {
    await page.goto('/fleet/vehicles');

    const typeSelect = page.locator('select').nth(1);

    const options = await typeSelect.locator('option').allTextContents();

    expect(options.length).toBeGreaterThan(1);

    await typeSelect.selectOption({ index: 1 });

    await expect(page.getByText('Clear filters')).toBeVisible();
  });

  test('should navigate to vehicle details when a vehicle is clicked', async ({ page }) => {
    await page.goto('/fleet/vehicles');

    const firstRow = page.locator('tbody tr').first();

    await expect(firstRow).toBeVisible();

    await firstRow.click();

    await expect(page).toHaveURL(/\/fleet\/vehicles\/.+/);
  });

});
