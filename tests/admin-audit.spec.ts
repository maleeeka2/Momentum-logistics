import { test, expect } from '@playwright/test';

test.describe('Admin Audit Trail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/audit');
  });

  test('displays Audit Trail page and audit table', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Audit Trail', exact: true })).toBeVisible();
    await expect(page.getByPlaceholder('Search user, action, entity...')).toBeVisible();
    await expect(page.getByText(/entries logged$/)).toBeVisible();

    for (const column of [
      'Date/Time',
      'User',
      'Action',
      'Entity',
      'Previous Value',
      'New Value',
    ]) {
      await expect(page.getByRole('columnheader', { name: column, exact: true })).toBeVisible();
    }
  });

  test('search filters audit entries', async ({ page }) => {
    const search = page.getByPlaceholder('Search user, action, entity...');
    const initialRows = await page.locator('tbody tr').count();

    await search.fill('created');

    const filteredRows = await page.locator('tbody tr').count();
    expect(filteredRows).toBeLessThan(initialRows);
  });

  test('search can filter by user or entity', async ({ page }) => {
    const search = page.getByPlaceholder('Search user, action, entity...');
    const initialRows = await page.locator('tbody tr').count();

    await search.fill('admin');

    const filteredRows = await page.locator('tbody tr').count();
    expect(filteredRows).toBeLessThan(initialRows);
  });

  test('clearing search restores audit entries', async ({ page }) => {
    const search = page.getByPlaceholder('Search user, action, entity...');
    const initialRows = await page.locator('tbody tr').count();

    await search.fill('created');
    await search.fill('');

    await expect.poll(async () => page.locator('tbody tr').count()).toBe(initialRows);
    await expect(page.getByText(/entries logged$/)).toBeVisible();
  });
});
