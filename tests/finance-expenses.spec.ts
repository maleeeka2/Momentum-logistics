import { test, expect } from '@playwright/test';

test.describe('Fuel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/finance/fuel');
  });

  test('displays page, summary cards, and actions', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Fuel', exact: true })
    ).toBeVisible();

    await expect(page.getByText('Total Litres')).toBeVisible();
    await expect(page.getByText('Total Fuel Cost')).toBeVisible();
    await expect(page.getByText('Avg. Rate / Litre')).toBeVisible();
    await expect(page.getByText('Missing Receipts')).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Export' })
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'New Fuel Voucher' })
    ).toBeVisible();
  });

  test('displays fuel table and columns', async ({ page }) => {
    const table = page.getByRole('table');

    for (const header of [
      'Voucher #',
      'Vehicle',
      'Driver',
      'Fuel Station',
      'Date',
      'Odometer',
      'Litres',
      'Rate',
      'Total',
      'Receipt',
      'Trip',
    ]) {
      await expect(
        table.getByRole('columnheader', {
          name: header,
          exact: true,
        })
      ).toBeVisible();
    }

    await expect(table.getByText('FV-2026-5510')).toBeVisible();
    await expect(table.getByText('FV-2026-5511')).toBeVisible();
    await expect(table.getByText('FV-2026-5518')).toBeVisible();
  });

  test('search filters by voucher number', async ({ page }) => {
    const search = page.getByPlaceholder(
      'Search voucher #, vehicle, station...'
    );

    await search.fill('FV-2026-5510');

    await expect(page.getByText('FV-2026-5510')).toBeVisible();
    await expect(page.getByText('FV-2026-5511')).not.toBeVisible();
  });

  test('search filters by vehicle', async ({ page }) => {
    const search = page.getByPlaceholder(
      'Search voucher #, vehicle, station...'
    );

    await search.fill('MLX-106');

    await expect(page.getByText('FV-2026-5510')).toBeVisible();
    await expect(page.getByText('FV-2026-5511')).not.toBeVisible();
  });

  test('search filters by fuel station', async ({ page }) => {
    const search = page.getByPlaceholder(
      'Search voucher #, vehicle, station...'
    );

    await search.fill('Oman Oil');

    await expect(page.getByText('FV-2026-5525')).toBeVisible();
    await expect(page.getByText('FV-2026-5510')).not.toBeVisible();
  });

  test('new fuel voucher modal opens and can be saved', async ({ page }) => {
    await page.getByRole('button', { name: 'New Fuel Voucher' }).click();

    await expect(
      page.getByRole('heading', { name: 'New Fuel Voucher' })
    ).toBeVisible();

    await expect(
      page.getByText('Record a fuel purchase')
    ).toBeVisible();

    await expect(
      page.getByText('Vehicle', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText('Driver', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText('Fuel Station', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByLabel('Odometer (km)')
    ).toBeVisible();

    await expect(
      page.getByText('Litres', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByLabel('Rate / Litre (AED)')
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Save Voucher' })
    ).toBeVisible();

    await page.getByRole('button', { name: 'Save Voucher' }).click();

    await expect(
      page.getByText('Fuel voucher recorded')
    ).toBeVisible();
  });
});

