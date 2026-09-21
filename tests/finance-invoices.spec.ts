import { test, expect } from '@playwright/test';

test.describe('Invoices', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/finance/invoices');
  });

  test('displays invoices page and actions', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Invoices', exact: true })).toBeVisible();
    await expect(page.getByText('Customer invoices generated from completed jobs and trips.')).toBeVisible();
    await expect(page.getByRole('button', { name: /Export/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /New Invoice/ })).toBeVisible();
  });

  test('displays invoice table and columns', async ({ page }) => {
    const table = page.getByRole('table');

    for (const column of [
      'Invoice #',
      'Customer',
      'Contract Ref',
      'Issue Date',
      'Due Date',
      'Total',
      'Status',
    ]) {
      await expect(table.getByRole('columnheader', { name: column, exact: true })).toBeVisible();
    }

    await expect(page.getByText('INV-2026-1201', { exact: true })).toBeVisible();
  });

  test('search filters invoices', async ({ page }) => {
    const search = page.getByPlaceholder('Search invoice #, customer, contract...');

    await search.fill('INV-2026-1201');

    await expect(page.getByText('INV-2026-1201', { exact: true })).toBeVisible();
    await expect(page.getByText('INV-2026-1202', { exact: true })).not.toBeVisible();
  });

  test('status filter filters invoices', async ({ page }) => {
    await page.getByRole('combobox').selectOption({ label: 'Paid' });

    await expect(page.getByText('INV-2026-1201', { exact: true })).toBeVisible();
    await expect(page.getByText('INV-2026-1178', { exact: true })).toBeVisible();
    await expect(page.getByText('INV-2026-1165', { exact: true })).toBeVisible();

    await expect(page.getByText('INV-2026-1202', { exact: true })).not.toBeVisible();
  });

  test('clear filters resets invoice list', async ({ page }) => {
    const search = page.getByPlaceholder('Search invoice #, customer, contract...');

    await search.fill('INV-2026-1201');
    await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();

    await page.getByRole('button', { name: 'Clear filters' }).click();

    await expect(page.getByText('INV-2026-1201', { exact: true })).toBeVisible();
    await expect(page.getByText('INV-2026-1202', { exact: true })).toBeVisible();
  });

  test('clicking invoice opens preview drawer', async ({ page }) => {
    await page.getByText('INV-2026-1201', { exact: true }).click();

    await expect(page.getByText('Invoice preview', { exact: true })).toBeVisible();
    await expect(page.getByText('INVOICE', { exact: true })).toBeVisible();
    await expect(page.getByText('Bill To', { exact: true })).toBeVisible();
    await expect(page.getByText('Subtotal', { exact: true })).toBeVisible();
    await expect(page.getByText('Total Due', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /Download PDF/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Print/ })).toBeVisible();
  });
});
