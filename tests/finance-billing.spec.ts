import { test, expect } from '@playwright/test';

test.describe('Billing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/finance/billing');
  });

  test('displays page and KPI cards', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Billing', exact: true })).toBeVisible();
    await expect(page.getByText('Total Billed', { exact: true })).toBeVisible();
    await expect(page.getByText('Collected', { exact: true })).toBeVisible();
    await expect(page.getByText('Overdue', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Collection Rate', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /View All Invoices/ })).toBeVisible();
  });

  test('displays billing pipeline with all invoice statuses', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Billing Pipeline', exact: true })).toBeVisible();
    await expect(page.getByText('Invoices by status', { exact: true })).toBeVisible();

    for (const status of ['Draft', 'Pending Approval', 'Approved', 'Sent', 'Paid', 'Overdue', 'Disputed']) {
      await expect(page.getByText(status, { exact: true }).first()).toBeVisible();
    }
  });

  test('displays top outstanding balances section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Top Outstanding Balances', exact: true })).toBeVisible();
  });

  test('displays recent invoices', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Recent Invoices', exact: true })).toBeVisible();

    for (const invoice of [
      'INV-2026-1201',
      'INV-2026-1202',
      'INV-2026-1188',
      'INV-2026-1195',
      'INV-2026-1178',
      'INV-2026-1180',
    ]) {
      await expect(page.getByText(invoice, { exact: true })).toBeVisible();
    }
  });

  test('recent invoices display their statuses', async ({ page }) => {
    await expect(page.getByText('Paid', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Pending Approval', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Overdue', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Sent', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Disputed', { exact: true }).first()).toBeVisible();
  });

  test('View All Invoices navigates to invoices page', async ({ page }) => {
    await page.getByRole('button', { name: /View All Invoices/ }).click();
    await expect(page).toHaveURL(/\/finance\/invoices$/);
  });
});
