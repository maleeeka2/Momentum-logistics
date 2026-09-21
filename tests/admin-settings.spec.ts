import { test, expect } from '@playwright/test';

test.describe('Admin Settings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/settings');
  });

  test('displays Settings page and Company Profile', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Settings', exact: true })).toBeVisible();
    await expect(page.getByText('Company Profile', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Company Name')).toHaveValue('Momentum Logistics LLC');
  });

  test('switches to Branches section', async ({ page }) => {
    await page.getByRole('button', { name: 'Branches', exact: true }).click();
    await expect(page.getByText('Branches', { exact: true }).last()).toBeVisible();
    await expect(page.getByLabel('Dubai HQ')).toHaveValue('Active');
  });

  test('switches to Departments section', async ({ page }) => {
    await page.getByRole('button', { name: 'Departments', exact: true }).click();
    await expect(page.getByText('Departments', { exact: true }).last()).toBeVisible();
    await expect(page.getByLabel('Operations')).toHaveValue('Enabled');
    await expect(page.getByLabel('Finance')).toHaveValue('Enabled');
  });

  test('switches to Cost Centres section', async ({ page }) => {
    await page.getByRole('button', { name: 'Cost Centres', exact: true }).click();
    await expect(page.getByText('Cost Centres', { exact: true }).last()).toBeVisible();
    await expect(page.getByLabel(/Dubai Operations/)).toHaveValue('Active');
  });

  test('switches to Financial Periods section', async ({ page }) => {
    await page.getByRole('button', { name: 'Financial Periods', exact: true }).click();
    await expect(page.getByText('Financial Periods', { exact: true }).last()).toBeVisible();
    await expect(page.getByLabel('Fiscal Year Start')).toHaveValue('jan');
    await expect(page.getByLabel('Current Period')).toHaveValue('August 2026');
  });

  test('switches to Document Numbering section', async ({ page }) => {
    await page.getByRole('button', { name: 'Document Numbering', exact: true }).click();
    await expect(page.getByText('Document Numbering', { exact: true }).last()).toBeVisible();
    await expect(page.getByLabel('RRR Prefix')).toHaveValue('RRR-2026-####');
    await expect(page.getByLabel('Invoice Prefix')).toHaveValue('INV-2026-####');
  });

  test('switches to Currency & Tax section', async ({ page }) => {
    await page.getByRole('button', { name: 'Currency & Tax', exact: true }).click();
    await expect(page.getByText('Currency & Tax', { exact: true }).last()).toBeVisible();
    await expect(page.getByLabel('Base Currency')).toHaveValue('aed');
    await expect(page.getByLabel('VAT Rate')).toHaveValue('5%');
  });

  test('switches to System Parameters and saves settings', async ({ page }) => {
    await page.getByRole('button', { name: 'System Parameters', exact: true }).click();
    await expect(page.getByText('System Parameters', { exact: true }).last()).toBeVisible();
    await expect(page.getByLabel('Default Language')).toHaveValue('en');
    await expect(page.getByLabel('Session Timeout')).toHaveValue('30 minutes');

    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByText('Settings saved', { exact: true })).toBeVisible();
    await expect(page.getByText('Your changes have been applied.', { exact: true })).toBeVisible();
  });
});
