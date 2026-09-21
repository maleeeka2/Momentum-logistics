import { test, expect } from '@playwright/test';

test.describe('Parts & Inventory', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/maintenance/parts');
  });

  test('displays page, summary cards, and actions', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Parts & Inventory', exact: true })).toBeVisible();
    await expect(page.getByText('Total SKUs')).toBeVisible();
    await expect(page.getByText('Low Stock')).toBeVisible();
    await expect(page.getByText('Critical / Out of Stock')).toBeVisible();
    await expect(page.getByText('Inventory Value')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Export' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'New Requisition' })).toBeVisible();
  });

  test('displays parts and table columns', async ({ page }) => {
    const table = page.getByRole('table');

    for (const header of ['Part', 'Category', 'Supplier', 'Stock Level', 'Unit Cost', 'Stock Value', 'Status']) {
      await expect(table.getByRole('columnheader', { name: header })).toBeVisible();
    }

    await expect(page.getByText('Engine Oil 15W-40 (20L Drum)')).toBeVisible();
    await expect(page.getByText('Oil Filter')).toBeVisible();
    await expect(page.getByText('Fuel Filter')).toBeVisible();
  });

  test('search filters by part name, SKU, and supplier', async ({ page }) => {
    const search = page.getByPlaceholder('Search part, SKU, supplier...');

    await search.fill('Fuel Filter');
    await expect(page.getByText('Fuel Filter')).toBeVisible();
    await expect(page.getByText('Oil Filter')).not.toBeVisible();

    await search.fill('FLT-OIL-HD');
    await expect(page.getByText('Oil Filter')).toBeVisible();
    await expect(page.getByText('Fuel Filter')).not.toBeVisible();

    await search.fill('Bosch Fleet Parts');
    await expect(page.getByText('Turbocharger Assembly')).toBeVisible();
    await expect(page.getByText('Alternator')).toBeVisible();
    await expect(page.getByText('Fuel Filter')).not.toBeVisible();
  });

  test('status filter works and can be cleared', async ({ page }) => {
    const status = page.getByRole('combobox').nth(1);

    await status.selectOption({ label: 'Critical' });

    await expect(page.getByText('Fuel Filter')).toBeVisible();
    await expect(page.getByText('Compressor Clutch Assembly')).toBeVisible();
    await expect(page.getByText('Oil Filter')).not.toBeVisible();

    await page.getByText('Clear filters').click();

    await expect(page.getByText('Oil Filter')).toBeVisible();
    await expect(page.getByText('Fuel Filter')).toBeVisible();
  });

  test('category filter works', async ({ page }) => {
    const category = page.getByRole('combobox').nth(0);

    await category.selectOption({ label: 'Filters' });

    await expect(page.getByText('Oil Filter')).toBeVisible();
    await expect(page.getByText('Air Filter')).toBeVisible();
    await expect(page.getByText('Fuel Filter')).toBeVisible();
    await expect(page.getByText('Brake Pad Set')).not.toBeVisible();
  });

  test('combined search and status filters work', async ({ page }) => {
    const search = page.getByPlaceholder('Search part, SKU, supplier...');
    const status = page.getByRole('combobox').nth(1);

    await status.selectOption({ label: 'Low' });
    await search.fill('Brake');

    await expect(page.getByText('Brake Pad Set')).toBeVisible();
    await expect(page.getByText('Oil Filter')).not.toBeVisible();
  });
});
