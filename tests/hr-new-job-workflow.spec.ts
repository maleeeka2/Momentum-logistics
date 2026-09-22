import { test, expect } from '@playwright/test';

test('HR workflow: submitted RRR does not create a Job', async ({ page }) => {
  await page.goto('/jobs');

  await page.getByRole('button', { name: /New Job from RRR/i }).click();
  await expect(page).toHaveURL(/\/rrr$/);

  await page.getByRole('button', { name: /New RRR/i }).click();
  await expect(page).toHaveURL(/\/rrr\/new$/);

  await page.getByLabel('Request Date').fill('2026-09-22');
  await page.locator('select[required]').nth(0).selectOption({ index: 1 });
  await page.locator('select[required]').nth(1).selectOption({ index: 1 });
  await page.locator('select[required]').nth(2).selectOption({ index: 1 });
  await page.getByLabel('Pickup Location').fill('QA Test Pickup');
  await page.getByLabel('Destination').fill('QA Test Destination');
  await page.getByLabel('Required Date & Time').fill('2026-09-23T10:00');

  await page.getByRole('button', { name: 'Submit for Approval' }).click();

  await page.goto('/jobs');

  await expect(page.getByText('QA Test Pickup')).not.toBeVisible();
});
