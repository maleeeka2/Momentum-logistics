import { test, expect } from '@playwright/test';

test.describe('Reports', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/reports');
  });

  test('displays Reports Center and search', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Reports Center', exact: true })).toBeVisible();
    await expect(page.getByPlaceholder('Search reports...')).toBeVisible();
  });

  test('displays report categories and report cards', async ({ page }) => {
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('main button').first()).toBeVisible();
  });

  test('search filters reports', async ({ page }) => {
    const search = page.getByPlaceholder('Search reports...');

    await search.fill('fleet');

    const cards = page.locator('main button');
    await expect(cards.first()).toBeVisible();

    await search.fill('zzzz-no-report');
    await expect(page.getByText(/No reports match/)).toBeVisible();
  });

  test('clicking a report opens report preview drawer', async ({ page }) => {
    await page.locator('main button').first().click();

    await expect(page.getByText('Preview', { exact: true })).toBeVisible();
    await expect(page.getByText(/Showing sample data for Aug 1/)).toBeVisible();
    await expect(page.getByRole('button', { name: /Generate/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Print/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Export CSV/ })).toBeVisible();
  });

  test('report preview contains filters and RRR table', async ({ page }) => {
    await page.locator('main button').first().click();

    await expect(page.getByText('From', { exact: true })).toBeVisible();
    await expect(page.getByText('To', { exact: true })).toBeVisible();
    await expect(page.getByText('Branch', { exact: true })).toBeVisible();

    const table = page.getByRole('table');
    await expect(table).toBeVisible();

    for (const column of ['RRR #', 'Customer', 'Route', 'Date', 'Priority', 'Status']) {
      await expect(
        table.getByRole('columnheader', { name: column, exact: true })
      ).toBeVisible();
    }
  });
});

