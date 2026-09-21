import { test, expect } from '@playwright/test';

test.describe('Trips Functional Tests', () => {

  test('should display Trips page and summary', async ({ page }) => {
    await page.goto('/trips');

    await expect(
      page.getByRole('heading', { name: 'Trips' })
    ).toBeVisible();

    await expect(page.getByText('Active Trips')).toBeVisible();
    await expect(page.getByText('Total Revenue')).toBeVisible();
    await expect(page.getByText('Net Profit')).toBeVisible();

    await expect(
      page.getByPlaceholder('Search trip #, job #, customer, route...')
    ).toBeVisible();
  });

  test('should filter trips by search text', async ({ page }) => {
    await page.goto('/trips');

    const search = page.getByPlaceholder(
      'Search trip #, job #, customer, route...'
    );

    await search.fill('TRP');

    await expect(search).toHaveValue('TRP');
    await expect(page.getByText('Clear filters')).toBeVisible();
  });

  test('should filter trips by status and clear filters', async ({ page }) => {
    await page.goto('/trips');

    const statusSelect = page.locator('select').first();

    await statusSelect.selectOption({ label: 'In Transit' });

    await expect(page.getByText('Clear filters')).toBeVisible();

    await page.getByText('Clear filters', { exact: true }).click();

    await expect(page.getByPlaceholder('Search trip #, job #, customer, route...')).toHaveValue('');
  });

  test('should navigate to Dispatch when New Trip is clicked', async ({ page }) => {
    await page.goto('/trips');

    await page.getByRole('button', { name: 'New Trip', exact: true }).click();

    await expect(page).toHaveURL(/\/dispatch$/);
  });

});

async function searchValue(page: import('@playwright/test').Page) {
  return page.getByPlaceholder(
    'Search trip #, job #, customer, route...'
  );
}
