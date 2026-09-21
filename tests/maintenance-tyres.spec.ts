import { test, expect } from '@playwright/test';

test.describe('Tyre Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/maintenance/tyres');
  });

  test('displays page, summary cards, and actions', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Tyre Management', exact: true })).toBeVisible();

    await expect(page.getByRole('paragraph').filter({ hasText: 'In Service' }).first()).toBeVisible();
    await expect(page.getByRole('paragraph').filter({ hasText: 'In Stock' }).first()).toBeVisible();
    await expect(page.getByRole('paragraph').filter({ hasText: 'Avg. Tread Depth' }).first()).toBeVisible();
    await expect(page.getByRole('paragraph').filter({ hasText: 'Low Tread (<4mm)' }).first()).toBeVisible();

    await expect(page.getByRole('button', { name: 'Export' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Record Tyre Change' })).toBeVisible();
  });

  test('displays tyre table and columns', async ({ page }) => {
    const table = page.getByRole('table');

    for (const header of [
      'Tyre',
      'Vehicle',
      'Position',
      'Tread Depth',
      'Install KM',
      'Removal KM',
      'Cost',
      'Cost / KM',
      'Status',
    ]) {
      await expect(
        table.getByRole('columnheader', { name: header, exact: true })
      ).toBeVisible();
    }

    await expect(table.getByText('Michelin X Multi').first()).toBeVisible();
    await expect(table.getByText('MX-77201')).toBeVisible();
    await expect(table.getByText('Bridgestone M-Drive').first()).toBeVisible();
    await expect(table.getByText('BS-40911')).toBeVisible();
  });

  test('search filters by brand, serial, and vehicle', async ({ page }) => {
    const search = page.getByPlaceholder('Search brand, serial, vehicle...');

    await search.fill('Michelin X Multi');

    await expect(page.getByText('Michelin X Multi').first()).toBeVisible();
    await expect(page.getByText('Bridgestone M-Drive')).not.toBeVisible();

    await search.fill('MX-77201');

    await expect(page.getByText('MX-77201')).toBeVisible();
    await expect(page.getByText('BS-40911')).not.toBeVisible();

    await search.fill('MLX-101');

    await expect(page.getByText('MX-77201')).toBeVisible();
    await expect(page.getByText('MX-77202')).toBeVisible();
  });

  test('status filter works and can be cleared', async ({ page }) => {
    const status = page.getByRole('combobox');

    await status.selectOption({ label: 'In Stock' });

    await expect(page.getByText('CT-60218')).toBeVisible();
    await expect(page.getByText('CT-60219')).toBeVisible();
    await expect(page.getByText('MX-77201')).not.toBeVisible();

    await expect(page.getByText('Clear filters')).toBeVisible();

    await page.getByText('Clear filters').click();

    await expect(page.getByText('MX-77201')).toBeVisible();
  });

  test('retreaded and scrapped tyre statuses are available', async ({ page }) => {
    const status = page.getByRole('combobox');

    await status.selectOption({ label: 'Retreaded' });
    await expect(page.getByText('MX-65590')).toBeVisible();

    await status.selectOption({ label: 'Scrapped' });
    await expect(page.getByText('MX-71145')).toBeVisible();
  });

  test('low tread tyres are represented in the table', async ({ page }) => {
    await expect(page.getByText('3.1 mm')).toBeVisible();
    await expect(page.getByText('2.8 mm')).toBeVisible();
    await expect(page.getByText('Continental HDR2').first()).toBeVisible();
  });
});
