import { test, expect } from '@playwright/test';

test.describe('Jobs Functional Tests', () => {

  test('should display Jobs dashboard and summary', async ({ page }) => {
    await page.goto('/jobs');

    await expect(
      page.getByRole('heading', { name: 'Jobs' })
    ).toBeVisible();

    await expect(page.getByText('Total Jobs')).toBeVisible();
    await expect(page.getByText('Unassigned')).toBeVisible();
    await expect(page.getByText('Active')).toBeVisible();
    await expect(page.getByText('Total Value')).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'New Job from RRR' })
    ).toBeVisible();
  });

  test('should switch between Job Board and Job List', async ({ page }) => {
    await page.goto('/jobs');

    await page.getByRole('button', { name: 'Job List', exact: true }).click();

    await expect(
      page.getByRole('columnheader', { name: 'Job #' })
    ).toBeVisible();

    await expect(
      page.getByRole('columnheader', { name: 'Customer' })
    ).toBeVisible();

    await page.getByRole('button', { name: 'Job Board', exact: true }).click();

    await expect(
      page.getByText('Job Board')
    ).toBeVisible();
  });

  test('should navigate to RRR when New Job from RRR is clicked', async ({ page }) => {
    await page.goto('/jobs');

    await page.getByRole('button', { name: 'New Job from RRR' }).click();

    await expect(page).toHaveURL(/\/rrr$/);
  });

});
