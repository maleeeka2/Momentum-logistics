import { test, expect } from '@playwright/test';

test.describe('RRR Functional Tests', () => {

  test('should validate required fields before submission', async ({ page }) => {
    await page.goto('/rrr/new');

    await expect(
      page.getByRole('heading', { name: 'New Requisition Request' })
    ).toBeVisible();

    await page.getByRole('button', { name: 'Submit for Approval' }).click();

    await expect(page).toHaveURL(/\/rrr\/new$/);
  });

  test('should create and submit an RRR with valid data', async ({ page }) => {
    await page.goto('/rrr/new');

    await page.locator('input[type="date"]').fill('2026-09-21');

    await page.getByRole('combobox', { name: 'Customer *', exact: true }).selectOption({ index: 1 });
    await page.getByLabel('Requesting Department').selectOption({ label: 'Retail Distribution' });
    await page.getByLabel('Vehicle Type').selectOption({ label: 'Flatbed Trailer' });

    await page.getByLabel('Pickup Location').fill('Dubai Investment Park');
    await page.getByLabel('Destination').fill('Riyadh');

    await page.locator('input[type="datetime-local"]').fill('2026-09-25T10:00');

    await page.getByRole('button', { name: 'Submit for Approval' }).click();

    await expect(page).toHaveURL(/\/rrr$/);

    await expect(
      page.getByText('RRR submitted for approval')
    ).toBeVisible();
  });

  test('should save an RRR as draft', async ({ page }) => {
    await page.goto('/rrr/new');

    await page.getByRole('button', { name: 'Save as Draft' }).click();

    await expect(page).toHaveURL(/\/rrr$/);

    await expect(
      page.getByText('Saved as draft')
    ).toBeVisible();
  });

});
